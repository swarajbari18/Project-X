# Engineering lesson 6: how a Cloudflare project is laid out

**Taught on:** 4 November 2026, before plan 1 of the Situation Registrar.

**Why this is on the list now.** Plan 1 sets up the real project. You cannot plan a layout you have never seen.

**This lesson is a real project.** I built a tiny Situation Registrar, and ran it. Everything marked **Measured** happened on this laptop. It lives in `experiments/lesson_06_tiny_cloudflare_project/`, and you can run it yourself:

```text
npm install
npm run check      # type checks everything
npm test           # runs the tests inside Cloudflare's runtime
npm run dev        # starts it at localhost:8787
```

It is a lesson, and it is not Tend's real code. No Cloudflare account is needed for any of this.

**Labels:** **Measured**, **Fact** (the source is named at the end), and **Proposal** (nobody has approved it yet).

---

## 1. The whole project

```text
lesson_06_tiny_cloudflare_project/
├── wrangler.jsonc              what Cloudflare must know about this project
├── src/
│   ├── front_door.ts           the Worker: takes each request
│   ├── situation_registrar.ts  the Durable Object: saves versions in SQLite
│   └── save_request.ts         the shape of a save, and its run-time check
├── test/
│   └── situation_registrar.test.ts
├── vitest.config.ts            how tests run
├── tsconfig.json               how strict the checker is
├── package.json                the tools this project needs
├── package-lock.json           their exact versions
│
│   made by tools, and never committed:
├── node_modules/               the tools themselves
├── worker-configuration.d.ts   types generated from wrangler.jsonc
└── .wrangler/                  local data, as real SQLite files
```

**Measured: tools versus what ships.**

| | Size |
|---|---|
| `node_modules`, the tools on your machine | 321 MB |
| What actually goes to Cloudflare | **2.5 KB** |

The tools help you build, and they never ship. Your Python habit of thinking of installed packages as part of the running app does not carry over here: a tool called a **bundler** gathers only the code that runs, into one small file.

---

## 2. `wrangler.jsonc`: the one file to understand

**Wrangler** is Cloudflare's command-line tool. This file tells it everything about your project.

```jsonc
{
  "name": "tiny-situation-registrar",
  "main": "src/front_door.ts",
  "compatibility_date": "2026-11-04",
  "durable_objects": {
    "bindings": [{ "name": "SITUATION_REGISTRAR", "class_name": "SituationRegistrar" }]
  },
  "exports": {
    "SituationRegistrar": { "type": "durable-object", "storage": "sqlite" }
  }
}
```

| Line | What it means |
|---|---|
| `name` | What this Worker is called on Cloudflare |
| `main` | The file Cloudflare starts with |
| `compatibility_date` | "Run my code with the runtime's behaviour as of this date." Cloudflare keeps changing its runtime, and this stops those changes surprising you |
| `bindings` | **The key idea.** See below |
| `exports` | Says this class is a Durable Object, with its own SQLite database |

### A binding is the most important idea here

In Python you would write a connection string: a database address and password. Here you never do. You declare a **binding**: a name your code uses to reach something Cloudflare provides.

```typescript
const registrar = env.SITUATION_REGISTRAR.getByName("meera");
```

Your code has no address and no password. **If a thing is not in this file, your code has no way to reach it.** So this file is also a security boundary. It is why your research said "Bindings are the authorization model", and why one Worker per business can hold only that business's database.

**Fact.** Cloudflare changed how classes are declared. `exports` replaces an older `migrations` list. Much advice online still shows the old way. This is what "learn the technology's behaviour" means in practice.

### A stage is a block in the same file

```jsonc
"env": {
  "simulation": {
    "durable_objects": { "bindings": [ ... ] },
    "exports": { ... }
  }
}
```

**Fact.** Each environment deploys as a separate Worker, named `<name>-<environment>`. Bindings are not inherited, so each stage must list its own. That matches your ruling that each stage has its own data.

**Measured,** a dry run that sends nothing:

```text
npx wrangler deploy --dry-run --env simulation

Total Upload: 2.50 KiB / gzip: 1.04 KiB
env.SITUATION_REGISTRAR (SituationRegistrar)      Durable Object
```

---

## 3. Following one request through the files

```text
curl POST /situations/meera
        │
        ▼
src/front_door.ts            the Worker. Holds no data. Handles many requests at once.
        │  env.SITUATION_REGISTRAR.getByName("meera")
        ▼
src/situation_registrar.ts   one object, only for Meera. Does one thing at a time.
        │  isSaveRequest(...)  from src/save_request.ts
        │  is it built on the newest version?
        ▼
its own SQLite file          version saved
```

**`getByName("meera")` always reaches the same object, anywhere in the world.** You do not create it first. If it has never existed, it comes into being, and if it is asleep, it wakes. That is how a million situations stay simple.

The code that does the work:

```typescript
saveNewVersion(request: unknown): number {
  if (!isSaveRequest(request)) {
    throw new Error("the save request has the wrong shape");
  }
  const newest = this.newestVersion();
  if (request.builtOnVersion !== newest) {
    throw new Error(`a newer version exists: the newest is ${newest}`);
  }
  const newVersion = newest + 1;
  this.ctx.storage.sql.exec(
    "INSERT INTO versions_of_this_situation VALUES (?, ?, ?, ?)",
    newVersion, request.builtOnVersion, request.writtenBy, request.whatChanged,
  );
  return newVersion;
}
```

You can read this now. `request` is `unknown`, so it must pass the check. After that check, the checker knows its shape, so no `as` is needed.

**Measured,** running it live with `wrangler dev`:

```text
save built on 0:              {"savedAsVersion":1}
save built on 1:              {"savedAsVersion":2}
save built on an old version: {"refused":"a newer version exists: the newest is 2"}
wrong shape:                  {"refused":"the save request has the wrong shape"}
Priya, a different situation: {"newestVersion":0}
```

---

## 4. Your idea was already sitting there

You said local debugging could be "a SQLite file" shown on a screen. **Measured:** after that run, these files were on disk:

```text
.wrangler/state/v3/do/tiny-situation-registrar-SituationRegistrar/<id>.sqlite
.wrangler/state/v3/do/tiny-situation-registrar-SituationRegistrar/<id>.sqlite
.wrangler/state/v3/do/tiny-situation-registrar-SituationRegistrar/<id>.sqlite
```

**One file per situation.** I opened Meera's with ordinary SQLite:

```text
[(1, 0, 'conversation manager', 'Meera wrote'),
 (2, 1, 'situation worker', 'the carrier answered')]
```

Then I stopped the server, and started it again:

```text
{"newestVersion":2}
```

So what you pictured is how it already works locally. "One Durable Object per situation" is not an abstract idea. It is one small SQLite file per situation. The run store and the whiteboard can use exactly this.

---

## 5. Three commands

| Command | What it does | Where it runs |
|---|---|---|
| `npx wrangler dev` | Runs your Worker on your machine | Local, using `workerd`, Cloudflare's real runtime |
| `npx vitest run` | Runs the tests inside that same runtime | Local |
| `npx wrangler deploy --env simulation` | Sends it to Cloudflare | Cloudflare |

**Measured:** four tests passed in about 3 seconds, inside Cloudflare's runtime, on this laptop. That includes "one situation never sees another".

### What local can and cannot prove

| Local proves | Local cannot prove |
|---|---|
| The logic is right | How fast it is under real load |
| Saves, refusals, Durable Objects, SQLite | Real network behaviour |
| Types and tests | Whether Cloudflare's real limits are hit |

**Fact.** The local simulator is called Miniflare. Cloudflare warns it "is not a hardened sandbox", so never use it to run untrusted code.

**Secrets.** Local secrets go in a `.dev.vars` file. **Your repo is public, so that file must always be ignored by git.** The tiny project's `.gitignore` already does that.

**Cloudflare Tunnel.** You named this earlier. You only need it when something outside must reach your laptop, such as WhatsApp sending a message to code you are running locally. You do not need it for anything in this lesson.

---

## 6. What this means for Tend (Proposal)

Plan 1 settles these. These are questions, and nothing is decided.

**One Worker, or one per part?**
- Together, they deploy together. That is simple, and lean.
- Apart, the registrar need not restart when the worker's logic changes. **Fact:** deploying a change restarts a Durable Object, after a delay.
- A Durable Object can live in another Worker, through `script_name`.

**My lean:** start with one, and split when the second component arrives and there is a reason. This matches your "if we need it, then we'll have it".

**One Worker per business.** The design says each business gets its own Worker, through Workers for Platforms. I have not tested how that behaves locally. Plan 1 must check this. The tiny project has none of it.

**Where the code lives.** The factory says each component keeps its own code, with its tests beside it. So perhaps a `tend/` folder at the root of the repository, with `components/situation_registrar/` inside it.

**Throw, or return a refusal?** The tests passed, but the runtime printed this for each refusal:

```text
uncaught exception; source = Uncaught (in promise); stack = Error: the save request has the wrong shape
```

A refusal is a normal outcome, and this logs it like a crash. So plan 2 should consider returning `{ saved: false, reason }` instead of throwing. The factory calls this "error meanings".

---

## 7. Staying lean: writing our own shape checks

Your ruling: "let's just keep it as lean as possible. If we need it, then we'll have it."

**Measured:** what ships.

| | Size to Cloudflare |
|---|---|
| Our own check, 17 lines | 2.5 KB (1 KB compressed) |
| With Zod | 121 KB (20 KB compressed) |

**One risk to watch.** This line is a promise, just like `as`:

```typescript
function isSaveRequest(value: unknown): value is SaveRequest {
```

`value is SaveRequest` means "if this returns true, trust me." **The checker does not verify that the function checks what the type says.** Add a field to `SaveRequest` and forget to add it here, and nothing complains. Zod avoids this, because the type comes from the check.

**So the rule:** write our own, and give each shape its own forbidden-case tests. If shapes multiply and start to drift, that is the signal we need a library. A version can carry about twenty kinds of content, so plan 2 is where this gets tested.

---

## 8. What a senior would remember

1. `wrangler.jsonc` says what this project may reach. If a thing is not there, the code cannot touch it.
2. A binding replaces connection strings and passwords.
3. `getByName` always reaches the same object, and creates it if needed.
4. Tools are huge, and what ships is tiny.
5. Locally, a Durable Object is a real SQLite file that you can open.
6. Local proves logic, not load.
7. Check Cloudflare's current docs. This changes fast.

---

## Learning work

**Predict, then check.** You add a second Durable Object class to `src/` called `SituationWorker`, and you do not change `wrangler.jsonc`. Then you call `env.SITUATION_WORKER` from `front_door.ts`. What goes wrong, and at which moment: the type check, or when the code runs?

**Spot it outside Tend.** A hotel key card opens only the doors programmed onto it. How is that like a binding? How is it unlike giving a guest the master password?

---

## Sources

- Get started: https://developers.cloudflare.com/workers/get-started/guide/
- Durable Objects, get started: https://developers.cloudflare.com/durable-objects/get-started/
- The `exports` field: https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/
- Environments: https://developers.cloudflare.com/workers/wrangler/environments/
- Compatibility dates: https://developers.cloudflare.com/workers/configuration/compatibility-dates/
- Local development: https://developers.cloudflare.com/workers/local-development/
- Writing your first test: https://developers.cloudflare.com/workers/testing/vitest-integration/write-your-first-test/
- Secrets: https://developers.cloudflare.com/workers/configuration/secrets/
- Storing state, and code updates: https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/
