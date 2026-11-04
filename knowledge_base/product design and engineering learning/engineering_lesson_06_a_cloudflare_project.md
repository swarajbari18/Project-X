# Engineering lesson 6: how a Cloudflare project is laid out

**Taught on:** 4 November 2026, before plan 1 of the Situation Registrar.

**Corrected on 4 November 2026.** Swaraj: "You lost me at bindings." That was the lesson's fault. The first version got four things wrong:
- It labelled one file "the Worker" and another "the Durable Object". Cloudflare does not work by file.
- It named an object "meera". One object belongs to a situation, not to a person.
- It said `getByName` brings an object into being. That happens at the first method call.
- It said "If a thing is not in this file, your code has no way to reach it." That is only true of Cloudflare's resources. **Measured:** a Worker with no bindings still reached the public internet.

**Why this is on the list now.** Plan 1 sets up the real project. You cannot plan a layout you have never seen.

**This lesson came from a real project.** I built a tiny Situation Registrar, ran it, and broke one thing at a time. It was not Tend's real code. It was only for teaching, so it was deleted on 4 November 2026, at Swaraj's request. The output below is copied from those runs. Tend's real project starts in plan 1.

**Labels:** **Measured** (it ran on this laptop), **Fact** (the source is named at the end), **Proposal** (nobody has approved it yet).

---

## 1. The one idea: a Worker is the whole package

**A Worker is the whole package you upload.** All your code is inside it.

That code does two different jobs:

| Job | What it is | How many run | What it keeps |
|---|---|---|---|
| **The front door** | The `fetch` function | As many as the requests need | Nothing |
| **The objects** | Made from the class | Exactly one for each name | Its own SQLite database |

In Python, you would make an object yourself:

```python
registrar = SituationRegistrar("s-42")
```

Here, you never do. You give a name, and Cloudflare finds or makes the one object with that name.

**The word "Worker" is slippery.** Cloudflare's own docs call a Durable Object "a special kind of Cloudflare Worker". Tend also has a "situation worker", which is a different thing again. So in this lesson:
- **"the Worker"** means the whole package;
- **"the front door code"** means `fetch`;
- **"the class"** means the Durable Object class.

The project:

```text
lesson_06_tiny_cloudflare_project/
├── wrangler.jsonc              describes this Worker to Cloudflare
├── src/
│   ├── front_door.ts           holds the front door code, and exports the class
│   ├── situation_registrar.ts  holds the class
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

---

## 2. `wrangler.jsonc`, and bindings

**Wrangler** is Cloudflare's command-line tool. This file describes one Worker to it.

```jsonc
{
  "name": "tiny-situation-registrar",
  "main": "src/front_door.ts",
  "compatibility_date": "2026-11-04",

  "exports": {
    "SituationRegistrar": { "type": "durable-object", "storage": "sqlite" }
  },

  "durable_objects": {
    "bindings": [{ "name": "SITUATION_REGISTRAR", "class_name": "SituationRegistrar" }]
  }
}
```

| Line | What it means |
|---|---|
| `name` | This Worker's name on Cloudflare |
| `main` | The one file the bundler starts from |
| `compatibility_date` | "Run my code with the runtime's behaviour as of this date", so Cloudflare's changes do not surprise you |
| `exports` | What this Worker's code contains |
| `durable_objects.bindings` | What this Worker's code may reach |

### "Nothing in this file says worker"

**The whole file is about one Worker.** That is why no line needs to say so. `name` and `main` belong to it. One `wrangler.jsonc` describes one Worker.

### "Why is Durable Object in two places?"

They answer two different questions.

| Block | The question | Read it as | **Measured:** if you remove it |
|---|---|---|---|
| `exports` | What is in this code? | "The class called `SituationRegistrar` is a Durable Object class, and each object gets SQLite" | It starts. Then: `SQL is not enabled for this Durable Object class` |
| `durable_objects.bindings` | What may this code reach? | "Put a door at `env.SITUATION_REGISTRAR`, and make it lead to that class" | The type check refuses it. At run time: `Cannot read properties of undefined (reading 'getByName')` |

**`exports` builds the room. A binding hands your code a key to it.**

**Why keep them apart?** Because the Worker that contains a class, and a Worker that calls it, can be different. **Fact:** a binding can lead to a class in another Worker, using `script_name`.

```text
Worker A:   "exports":  SituationRegistrar                          contains the class
Worker B:   "bindings": SITUATION_REGISTRAR, "script_name": "A"     holds a key to it
```

In our tiny project, one Worker does both. That is why it looks like repetition.

One limit of this test: locally, with no `exports` block, the class still ran as an object without SQLite. **Fact:** on a real deploy, Cloudflare says "A class that appears only in your code is ignored until you declare it in `exports`". I cannot test a real deploy without an account.

### What a binding is

A **binding** is a named door that Cloudflare gives your code.

- In `durable_objects.bindings`, `durable_objects` says what kind of door. Other kinds are `d1_databases`, `r2_buckets` and `queues`.
- `"name"` is a label that I made up. **Measured:** I renamed it to `BANANA`, in the file and in the code, and everything still worked.
- `env` is an object that Cloudflare passes to your code, with one property for each binding. Think of a Python dict you did not build.

So this code holds no address and no password:

```typescript
env.SITUATION_REGISTRAR
```

**What this protects, exactly.** Without a binding, your code has no handle on that Cloudflare resource. That is why one business's Worker can hold only that business's databases, and it is what your research meant by "Bindings are the authorization model".

**What it does not protect.** A Worker can still call the public internet. **Measured:** with no bindings at all, `fetch("https://example.com")` answered 200. **Fact:** Workers for Platforms has "Outbound Workers" to control those calls. Plan 1 should look at them.

**Fact.** Cloudflare changed how classes are declared. `exports` replaces an older `migrations` list, and much advice online still shows the old way.

---

## 3. How does Cloudflare know which code is which?

**Not by the file.** **Measured:** I moved every line into one file, called it `any_name_at_all.ts`, and got exactly the same results. My first version's labels were wrong.

It looks at what the `main` file **exports**, and at your configuration.

| What tells it | Where | What it says | **Measured:** if you remove it |
|---|---|---|---|
| `export default { fetch }` | Exported from `main` | "Call this for each request" | Refuses to start |
| The name `fetch` | Inside that export | "This is the request handler" | `Handler does not export a fetch() function` |
| `export { SituationRegistrar }` | Exported from `main` | "Here is the class" | Refuses to start: `not exported in your entrypoint file: SituationRegistrar` |
| `extends DurableObject` | On the class | "Its methods can be called from outside" | `does not support RPC, because its class was not declared with extends DurableObject` |
| The `exports` block | `wrangler.jsonc` | "This class is a Durable Object, with SQLite" | `SQL is not enabled for this Durable Object class` |

(**RPC** means calling a method on something that runs elsewhere.)

This is why `front_door.ts` has that odd line:

```typescript
export { SituationRegistrar };
```

The class lives in another file, but Cloudflare only looks at what `main` exports. So `main` must hand it over.

---

## 4. Do the front door and the objects get different files?

**No. There is one upload.**

A tool called a **bundler** starts at `main`, follows every `import`, and joins the code into one file. **Measured:**

```text
code files that ship:          1  (front_door.js)
holds the fetch code:          True
holds the Durable Object class: True
holds the shape check:         True
holds a file nothing imports:  False
how the file ends:
   export { SituationRegistrar, front_door_default as default };
```

Look at that last line. It is the two exports from section 3, and they are in the same file.

| | Size |
|---|---|
| `node_modules`, the tools on your machine | 321 MB |
| What goes to Cloudflare | **about 2.6 KB** |

Your tests do not ship either, because nothing in `main` imports them.

**So which part runs? It depends on how the call arrives.**
- A request from the internet runs `fetch`.
- A call through a door runs the class's method, on the object with that name.

**Measured,** in the order they ran:

```text
ran: the fetch code
ran: the class's whoAmI, for the object named s-42
```

The rest of the file just sits there unused. So "which files does each one use?" has no answer: they all have everything, and each runs the part it is called for.

### Three things follow from one package

**1. Everything holds the same keys.** **Measured:** the object reported `doorsIHold: ["SITUATION_REGISTRAR"]`, the same as the front door. Bindings belong to the Worker, and not to a file. So a part that must hold fewer keys has to be in its own Worker.

**2. Never share data through a plain variable.** **Measured,** and it surprised me: on my laptop, a plain variable was shared by the front door code and by two different objects.

```text
first call, to s-42:   fetch saw 1, the object saw 2
second call, to s-42:  fetch saw 3, the object saw 4
third call, to s-43:   fetch saw 5, the object saw 6
```

**Fact:** on Cloudflare, an object sits near where it was first requested, and a request can come from anywhere. So the two can be far apart, and I could not test this there. A plain variable would look fine locally, and could fail once deployed. **This is a case of local lying to you.** Keep data in SQLite.

**3. One upload does not update everywhere at the same moment.** **Fact:** "A request can reach the latest version of your Worker, which then calls a unique Durable Object running a previous version of your code." By default, an object can wait up to 5 minutes. So during a deploy, the front door may speak to an older object. Changes must work with both.

---

## 5. One request, line by line

```text
curl -X POST localhost:8787/situations/s-42 -d '{"builtOnVersion":0, ...}'
```

```typescript
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const situationId = new URL(request.url).pathname.split("/")[2];
    const registrar = env.SITUATION_REGISTRAR.getByName(situationId);
    const saved = await registrar.saveNewVersion(await request.json());
    return Response.json({ savedAsVersion: saved });
  },
};
```

(I removed the error handling here, to keep it readable.)

**Step 1: Cloudflare calls `fetch`.** You never call it yourself. Cloudflare passes in `request` and `env`.

**Step 2: The name comes from the URL.**

```text
"/situations/s-42".split("/")   gives   ["", "situations", "s-42"]
```

Position 2 is `"s-42"`.

**Step 3: `env.SITUATION_REGISTRAR` is the door** from `wrangler.jsonc`.

**Step 4: `getByName` is Cloudflare's, and I did not write it.** It is a method of the door, just as `.execute()` on a Python database connection is not something you wrote. **Measured:** `wrangler types` reads your config, and generates this:

```typescript
SITUATION_REGISTRAR: DurableObjectNamespace<SituationRegistrar>;   // from your binding
getByName(name: string): DurableObjectStub<T>;                     // from Cloudflare
```

(Shortened slightly.) A **namespace** means all the objects made from one class.

**Step 5: `getByName` fetches nothing.** It gives back a **stub**: a stand-in for an object that may be elsewhere. **Measured:**

```text
call getByName('s-99'), and nothing else     200
SQLite files for objects on disk now:        0
```

**Fact:** it "returns the stub immediately, often before a connection has been established".

**Step 6: `registrar.saveNewVersion(...)` is the real call.** It looks like a local function call. It travels to the object, and the object's code runs there:
- if the object has never existed, it is created;
- if it is asleep, it wakes;
- either way, the method runs, and the answer comes back.

This is the code that runs there:

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

**Measured,** running it live:

```text
s-42, save built on 0                 {"savedAsVersion":1}
s-42, save built on 1                 {"savedAsVersion":2}
s-42, save built on an old version    {"refused":"a newer version exists: the newest is 2"}
s-42, wrong shape                     {"refused":"the save request has the wrong shape"}
s-43, a different situation           {"newestVersion":0}
```

### How does a name become one object?

There is nothing special about the name. I typed it into the command. **Cloudflare turns the name into an ID, using a fixed calculation.** **Measured:**

```text
the ID worked out from 's-99':       92e642ecaa05b6215098d4d4...
worked out again from 's-99':        92e642ecaa05b6215098d4d4...   same: True
worked out from 'S-99', capital S:   7cdb557a833f513538fb1500...   same: False
```

That is how the same name always reaches the same object. No table of names is needed. The object can read its own name too: **Measured,** `this.ctx.id.name` gave `s-42`.

### The danger this creates

**`getByName` never fails on a wrong name.** It gives you a brand new, empty object. **Measured:** `s-43` was never saved to, and it answered `{"newestVersion":0}` instead of "not found". A typo looks like an empty situation.

The tiny project also takes the name straight from the URL, with no check. So anyone could create objects by typing addresses. **In Tend, the caller must never choose the name.** Your code decides which situation is meant, and the registry can say whether it exists. Plan 5 must settle this.

---

## 6. One situation is one SQLite file

You said local debugging could be "a SQLite file" shown on a screen. **Measured:** I saved twice to `s-42`, and only read `s-43`. Then I stopped the server, and opened the files with ordinary SQLite.

```text
file 6e06f341b62cac88...sqlite holds: []
file 7e7d8b04683d8cac...sqlite holds: [(1, 0, 'conversation manager', 'Meera wrote'),
                                       (2, 1, 'situation worker', 'the carrier answered')]
```

**The file's name is the ID.** **Measured:** `its name is exactly the ID: True`.

Then I started the server again:

```text
after stopping and restarting: s-42   {"newestVersion":2}
```

So what you pictured is how it already works locally. The run store and the whiteboard can use exactly this.

---

## 7. A stage is a block in the same file

```jsonc
"env": {
  "simulation": {
    "exports": { ... },
    "durable_objects": { "bindings": [ ... ] }
  }
}
```

**Fact.** Each stage deploys as a separate Worker, named `<name>-<stage>`. Bindings are not inherited, so each stage must list its own. That matches your ruling that each stage has its own data.

**Measured,** a dry run that sends nothing:

```text
npx wrangler deploy --dry-run --env simulation

Total Upload: 2.58 KiB / gzip: 1.09 KiB
env.SITUATION_REGISTRAR (SituationRegistrar)      Durable Object
```

---

## 8. Three commands

| Command | What it does | Where it runs |
|---|---|---|
| `npx wrangler dev` | Runs your Worker on your machine | Local, using `workerd`, Cloudflare's real runtime |
| `npx vitest run` | Runs the tests inside that same runtime | Local |
| `npx wrangler deploy --env simulation` | Sends it to Cloudflare | Cloudflare |

**Measured:** four tests passed in about 3 seconds, on this laptop. That includes "one situation never sees another".

### What local can and cannot prove

| Local proves | Local cannot prove |
|---|---|
| The logic is right | How fast it is under real load |
| Saves, refusals, objects, SQLite | Real network behaviour |
| Types and tests | Whether Cloudflare's real limits are hit |
| | That a plain variable is not shared (section 4) |

**Fact.** The local simulator is called Miniflare. Cloudflare warns it "is not a hardened sandbox", so never use it to run untrusted code.

**Secrets.** Local secrets go in a `.dev.vars` file. **Your repo is public, so that file must always be ignored by git.** Plan 1's `.gitignore` must do the same.

**Cloudflare Tunnel.** You named this earlier. You only need it when something outside must reach your laptop, such as WhatsApp sending a message to code you are running locally. You do not need it for anything in this lesson.

---

## 9. What this means for Tend (Proposal)

Plan 1 settles these. These are questions, and nothing is decided.

**One Worker, or one per part?**
- Together: one upload, simple, and lean. But every part holds the same keys (section 4).
- Apart: a part can hold fewer keys, and the registrar need not restart when other logic changes. **Fact:** a deploy restarts an object, after a delay.

**My lean:** start with one, and split when the second component arrives and there is a reason. This matches your "if we need it, then we'll have it".

**One Worker per business.** The design says each business gets its own Worker, through Workers for Platforms. I have not tested how that behaves locally, and plan 1 must check it. The tiny project has none of it.

**Where the code lives.** The factory says each component keeps its own code, with its tests beside it. So perhaps a `tend/` folder at the root of the repository, with `components/situation_registrar/` inside it.

**Throw, or return a refusal?** The tests passed, but the runtime logs each refusal like a crash:

```text
✘ [ERROR] Uncaught Error: a newer version exists: the newest is 2
```

A refusal is a normal outcome. So plan 2 should consider returning `{ saved: false, reason }` instead of throwing. The factory calls this "error meanings".

---

## 10. Staying lean: writing our own shape checks

Your ruling: "let's just keep it as lean as possible. If we need it, then we'll have it."

**Measured:** what ships.

| | Size to Cloudflare |
|---|---|
| Our own check, 17 lines | About 2.5 KB (1 KB compressed) |
| With Zod | About 121 KB (20 KB compressed) |

**One risk to watch.** This line is a promise, just like `as`:

```typescript
function isSaveRequest(value: unknown): value is SaveRequest {
```

`value is SaveRequest` means "if this returns true, trust me." **The checker does not verify that the function checks what the type says.** Add a field to `SaveRequest` and forget to add it here, and nothing complains. Zod avoids this, because the type comes from the check.

**So the rule:** write our own, and give each shape its own forbidden-case tests. If shapes multiply and start to drift, that is the signal we need a library. A version can carry about twenty kinds of content, so plan 2 is where this gets tested.

---

## 11. Swaraj's questions on reading the code

**"Can I read a binding as a simple secret? It's a key-value pair."** Half right. `env` is key-value. But a secret's value is text, and a binding's value is a live object with methods. **Measured:**

```text
keys in env:                  A_SECRET, SITUATION_REGISTRAR
A_SECRET is a:                string
A_SECRET printed:             not-a-real-secret
SITUATION_REGISTRAR is a:     object
SITUATION_REGISTRAR printed:  [object DurableObjectNamespace]
SITUATION_REGISTRAR as JSON:  {}
its getByName is a:           function
```

A binding holds no address or password that you could print. That is why `wrangler.jsonc` can sit in your public repo, and `.dev.vars` must never.

**"Could I write `SituationRegistrar.getByName(...)` instead?"** No. **Measured:**

```text
Type check:  Property 'getByName' does not exist on type 'typeof SituationRegistrar'.
At run time: TypeError: SituationRegistrar.getByName is not a function
```

| Thing | What it is | What it offers |
|---|---|---|
| `env.SITUATION_REGISTRAR` | The door to all the objects | `getByName` |
| `SituationRegistrar` | The blueprint for one object | `newestVersion`, `saveNewVersion` |

You cannot build an object yourself either. **Measured,** with `new SituationRegistrar({} as DurableObjectState, env)`:

```text
TypeError: Failed to construct 'DurableObjectBase': constructor parameter 1 is not of type 'DurableObjectState'.
```

The type check passed that line, because `as` told the checker a story (lesson 4). Only Cloudflare can supply that first input, which is what holds the object's SQLite.

**"What is `newestVersion() { }`? Why are there curly brackets after the close bracket?"** It is being defined, not called.

```python
class SituationRegistrar(DurableObject):
    def newest_version(self) -> int:
        ...
```

```typescript
class SituationRegistrar extends DurableObject {
  newestVersion(): number {
    ...
  }
}
```

- `extends DurableObject` is Python's `(DurableObject)`.
- There is no `def`. Inside a class, a name followed by `()` and `{` defines a method.
- `()` holds the inputs, and here there are none. `self` is not written, and `this` plays that part.
- `: number` is Python's `-> int`.
- `{ }` holds the body, in place of Python's indentation.

The real body:

```typescript
newestVersion(): number {
  const row = this.ctx.storage.sql
    .exec<{ newest: number | null }>("SELECT MAX(version_number) AS newest FROM versions_of_this_situation")
    .one();
  return row.newest ?? 0;
}
```

It asks this object's own SQLite for the highest version number, and answers 0 if nothing has been saved.
- `this.ctx.storage.sql` is this object's own SQLite.
- `.exec<...>(...)` runs the SQL. The `<...>` only tells the checker what the row looks like.
- `.one()` takes the single row.
- `row.newest ?? 0` means "if this is empty, use 0". `MAX` over no rows is empty.

**"Don't we have to import the class? Won't it throw 'not defined'?"** Your instinct is right. **Measured,** using the class with no import:

```text
Type check:  Cannot find name 'SituationRegistrar'.
At run time: ReferenceError: SituationRegistrar is not defined
```

But `fetch` never writes the class name. It only writes `env.SITUATION_REGISTRAR`, which Cloudflare passes in. So the real file's `import` is there only so that the file can hand the class to Cloudflare. **Measured:** I replaced the import and the export with this one line, and every result stayed the same:

```typescript
export { SituationRegistrar } from "./situation_registrar";
```

---

## 12. What a senior would remember

1. A Worker is the whole package. Front door code and classes are both inside it.
2. Cloudflare goes by what `main` exports, and not by file names.
3. `exports` says what the code contains. A binding says what the code may reach.
4. `getByName` fetches nothing and never fails on a wrong name. The method call is the real call.
5. The same name always gives the same ID, so it reaches the same object.
6. Bindings belong to the Worker, so everything inside it holds the same keys.
7. Keep data in SQLite. A plain variable can look shared locally.
8. Locally, one object is one SQLite file that you can open.
9. Local proves logic, not load.
10. Check Cloudflare's current docs. This changes fast.

---

## Learning work

**Explain it back.** Tend needs a second class, `ConversationManager`, and the front door must be able to call it. List every line you must add, and say which file each one goes in. Then say what you would see if you forgot each one.

**Spot it outside Tend.** A hotel key card opens only the doors programmed onto it. How is that like a binding? What can a guest with that card still do that the card does not control?

---

## Sources

- Get started: https://developers.cloudflare.com/workers/get-started/guide/
- The fetch handler: https://developers.cloudflare.com/workers/runtime-apis/handlers/fetch/
- Bindings and `env`: https://developers.cloudflare.com/workers/runtime-apis/bindings/
- What Durable Objects are: https://developers.cloudflare.com/durable-objects/concepts/what-are-durable-objects/
- Durable Objects, get started: https://developers.cloudflare.com/durable-objects/get-started/
- `getByName`, `idFromName` and the namespace: https://developers.cloudflare.com/durable-objects/api/namespace/
- The stub: https://developers.cloudflare.com/durable-objects/api/stub/
- The object's ID and name: https://developers.cloudflare.com/durable-objects/api/id/
- The `exports` field, and `script_name`: https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/
- Code updates: https://developers.cloudflare.com/durable-objects/deployments/durable-objects-code-updates/
- Known issues: https://developers.cloudflare.com/durable-objects/platform/known-issues/
- Outbound Workers: https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/outbound-workers/
- Environments: https://developers.cloudflare.com/workers/wrangler/environments/
- Compatibility dates: https://developers.cloudflare.com/workers/configuration/compatibility-dates/
- Local development: https://developers.cloudflare.com/workers/local-development/
- Writing your first test: https://developers.cloudflare.com/workers/testing/vitest-integration/write-your-first-test/
- Secrets: https://developers.cloudflare.com/workers/configuration/secrets/
