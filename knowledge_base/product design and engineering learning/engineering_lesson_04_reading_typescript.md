# Engineering lesson 4: reading TypeScript, from Python

**Taught on:** 4 November 2026, before plan 1 of the Situation Registrar.

**Why this is on the list now.** You will read every line the agent writes. You said in an interview you must be able to answer "what does this code do?", and you warned on 1 November: "if I come from a Python mindset and I am trying to understand async and TypeScript, I will definitely make a very bad software." This lesson shows you were right, with real output.

**How to read the labels.**
- **Measured:** I ran it. The scripts are in `experiments/`, beside this file, and you can run them yourself.
- **Fact:** a source says it, and the source is named at the end.
- **Proposal:** a suggestion nobody has approved yet.

---

## 1. What is just different spelling

Most of it is the Python you know.

| Python | TypeScript |
|---|---|
| `def save(x):` | `function save(x) {` |
| Indentation marks a block | `{ }` marks a block |
| `None` | `null`, and also `undefined` |
| `True`, `False` | `true`, `false` |
| `{"a": 1}` (a dict) | `{ a: 1 }` (an object) |
| `[1, 2]` (a list) | `[1, 2]` (an array) |
| `f"version {n}"` | `` `version ${n}` `` |
| `x == 5` | `x === 5`. Always three. Two equals signs convert types first, so `5 == "5"` is true |
| `snake_case` | `camelCase`, by habit |

Two words for making a name:
- `const x = 5` means x can never be pointed at something else. This is the normal choice.
- `let x = 5` means it can be changed later.

---

## 2. Types: a promise about shape

Python lets you pass anything anywhere, and you find out when it breaks. TypeScript lets you write down what a thing must look like, and checks your code against that **before it runs**.

```typescript
type WhoMayWrite = "conversation manager" | "situation worker";

type SaveRequest = {
  situationId: string;
  builtOnVersion: number;
  writtenBy: WhoMayWrite;
};
```

Read it out loud:
- `WhoMayWrite` is one of exactly these two words. The `|` means "or".
- `SaveRequest` is an object that must have these three fields, of these types.

A function says what it takes and what it gives:

```typescript
async function saveNewVersion(request: SaveRequest): Promise<number> {
```

That reads: "`saveNewVersion` takes a `SaveRequest`, and eventually gives back a number." `Promise` gets its own section below.

**Measured:** I made two mistakes on purpose. TypeScript refused both, without running anything:

```text
error TS2322: Type '"owner view"' is not assignable to type 'WhoMayWrite'.
error TS2345: Property 'builtOnVersion' is missing in type ... but required in type 'SaveRequest'.
```

**Look at what the first error means for Tend.** "The owner view writes nothing" is a rule of the design. Here it is a rule the code **cannot be built without obeying**. This is the factory's idea of a storage call that "will not even build" when it forgets something. The names you asked for matter here too: `WhoMayWrite` says what it is.

---

## 3. Types disappear when the code runs

This is the most important thing to remember about TypeScript.

Before running, TypeScript is turned into JavaScript, and **every type is deleted**. So the checks exist only while the code is being built. Nothing checks anything at run time.

So what happens when data comes from outside: from a message, a network call, an AI?

```typescript
const fromOutside = JSON.parse(
  '{"situationId":"s-42","builtOnVersion":"five","writtenBy":"someone unknown"}'
) as SaveRequest;

const result = await saveNewVersion(fromOutside);
```

**Measured:**

```text
TypeScript raised no complaint. The result is: five1
```

`"five"` is not a number, and "someone unknown" may not write. Nothing stopped either. It added 1 to a word, and got `five1`. In a real save, that would be a corrupt version, kept forever.

The word `as` means "trust me, this is a `SaveRequest`". It checks nothing. **This is the reason the Registrar checks the shape of every write, at run time.** Types protect you from your own code. Shape checks protect you from the outside.

### Two words to watch for when you read

| Word | What it tells the checker | Why it is dangerous |
|---|---|---|
| `as` | "Trust me, it is this type" | Nothing is checked |
| `any` | "Stop checking this completely" | Every error around it goes silent |

**Measured:** I took the same `"owner view"` mistake from section 2, and added `as any`. The error disappeared, and the bug stayed. An agent may do this to make an error go away. So when you read code, treat these two words as a place to stop and look.

---

## 4. Async: the trap you predicted

`await` means: "this will take a while. Wait here for it. Other work may run in the meantime." Python and TypeScript both have it, and it looks identical. **It does not behave identically.**

A function marked `async` does not hand back its answer directly. In TypeScript it hands back a **Promise**: a ticket for an answer that will arrive later. Python hands back something similar, called a coroutine.

Here is the mistake: forgetting `await`. **Measured,** the same mistake in both languages:

```text
TypeScript:
  result: Promise { <pending> } | newest version is still: 5
  a moment later, nobody having asked, newest version is: 6

Python:
  RuntimeWarning: coroutine 'save_new_version' was never awaited
  result: <coroutine object save_new_version ...> | newest version is still: 5
  a moment later, newest version is: 5
```

| | Python | TypeScript |
|---|---|---|
| When does the work start? | Only when you `await` it | **Immediately, when you call it** |
| If you forget `await` | **The work never happens** | **The work happens, but nobody is watching** |
| What warns you | A warning at run time | Nothing at all |

**Why the TypeScript version is worse for Tend.** A Python programmer expects a forgotten `await` to do nothing. In TypeScript, the save runs, but your code has already moved on:
- it may tell Meera something before it is saved;
- if the save is refused, nobody hears it.

**Fact.** Cloudflare's rule: "When calling methods on a Durable Object stub, always use `await`. Unawaited calls create dangling promises, causing errors to be swallowed and return values to be lost."

**A check for this (Proposal).** A linter can refuse any Promise nobody awaited. The rule is called `no-floating-promises`, in a tool called typescript-eslint. I have not run it here. It would join the factory's gate in plan 1. So a machine would catch this, and you would still learn to see it.

---

## 5. Reading a real function

```typescript
async function saveNewVersion(request: SaveRequest): Promise<number> {
  await pretendSavingTakesTime();
  newestVersion = request.builtOnVersion + 1;
  return newestVersion;
}
```

**Reading it line by line is what a beginner does:** "It's async. It waits. It sets a variable to the input plus one. It returns it."

**Reading it for its purpose is what a senior does:** "This saves the next version number, built on the one the caller read."

Research on people learning to code found this exact difference. Asked to explain code in plain English, experts say what it is for, while beginners list what each line does. That is your interview question, and it is how we will measure your reading.

**And then a senior asks what is missing.** This function never checks that `builtOnVersion` is still the newest. That is the bug from lesson 3. You read for what is there, and also for what the rule says should be there.

---

## 6. What a senior would remember

1. Most of TypeScript is Python with different spelling.
2. A type is a promise about shape, checked before the code runs.
3. Types are deleted when the code runs, so check the shape of anything from outside.
4. `as` and `any` tell the checker to look away. Stop and read them.
5. In TypeScript, an `async` call starts immediately, and a forgotten `await` is silent.
6. Explain what code is for, and then ask what it should have done but does not.

---

## Learning work

**Read this as a senior would.** First, say in one plain sentence what this function is for. Then find what is wrong. There are two problems, and both are from this lesson.

```typescript
async function recordTheCarriersAnswer(situation: SituationRegistrar, answer: unknown) {
  const newest = await situation.newestVersion();
  situation.saveNewVersion({
    builtOnVersion: newest,
    writtenBy: "situation worker",
    claim: answer as CarrierClaim,
  });
  return "saved";
}
```

---

## Sources

- Rules of Durable Objects, "Always await RPC calls": https://developers.cloudflare.com/durable-objects/best-practices/rules-of-durable-objects/
- The research on reading and explaining code: the factory file, Stage 1, "What understood means".
- The experiments: `experiments/lesson_04_reading_typescript.ts`, `lesson_04_the_compiler_refuses.ts`, `lesson_04_the_same_mistake_in_python.py`.
