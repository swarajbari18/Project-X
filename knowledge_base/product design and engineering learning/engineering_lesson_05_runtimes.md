# Engineering lesson 5: Python and JavaScript runtimes

**Taught on:** 4 November 2026. Swaraj asked for this as a deviation: "I don't want to follow fashion blindly. Can you do some proper research whether I am even correct in my assumptions at this point or not? And explain both these runtimes to me in proper detail."

**How to read the labels.**
- **Measured:** I ran it on this laptop (12th Gen Intel i5, Python 3.12, Node 24), at least twice. Scripts are in `experiments/`. Treat results as a sense of scale.
- **Fact:** a source says it, and it is named at the end.
- **From memory:** general knowledge I did not re-check today.
- **My read:** my reasoning. Challenge it.

**Weak spots in this research.**
- The paper by JavaScript's creator on its history would not open, so the history rests on secondary articles of mixed quality.
- Survey sites gave no year-on-year figures for experienced developers.
- The TIOBE index measures search-engine results, not code.

---

## 1. Each assumption, checked

| Your assumption | Verdict | Evidence |
|---|---|---|
| TypeScript is only TypeScript at build time | **True, on purpose** | Its design goals: "Impose no runtime overhead", and a non-goal: "Add or rely on run-time type information" |
| Pydantic makes Python better than TypeScript at run time | **False comparison** | Pydantic is a library, and TypeScript has the same kind. See section 2 |
| Python's own types are enforced at run time | **False** | Python's docs: "The Python runtime does not enforce function and variable type annotations" |
| JavaScript hides bugs | **True** | `"five" + 1` gives `five1`. Python raises an error |
| Node simulates the browser | **Partly** | Node uses the browser's engine, but adds files and networking, and has no web page |
| Python is going down | **Not overall** | See section 5 |
| Experienced developers are leaving Python | **No evidence found** | 53.2% of developers with 16+ years use it. I found no trend over time |
| Web applications do not work well on Python | **False** | Instagram runs on Django. The browser is the only true limit |
| A smart person chose JavaScript for the web on purpose | **Mostly false** | It was a rushed decision, then lock-in. See section 6 |
| Cloudflare treats Python second because Python is weak at web | **False** | Cloudflare's design runs only JavaScript and WebAssembly. See section 7 |
| Node is faster | **True for computing** | 10 to 30 times, measured. Not for parsing or waiting. See section 4 |

---

## 2. Pydantic and TypeScript are not the same kind of thing

There are **three** separate things, and they get mixed up:

| Job | Python | TypeScript |
|---|---|---|
| The language's own run-time behaviour | Refuses `"five" + 1` | Allows it, and gives `five1` |
| Checking all your code before it runs | mypy or pyright (optional add-ons) | `tsc` |
| Checking data from outside, at run time | **Pydantic** | **Zod**, or similar |

So the fair comparison is Python + mypy + Pydantic against TypeScript + `tsc` + Zod. **Measured,** with the same mistakes:

| The mistake | Plain Python | Pydantic | Plain TS at run time | Zod |
|---|---|---|---|---|
| A word where a number should be | Accepted: `built on version five` | Refused | Accepted | Refused |
| The text "5" where a number should be | Accepted | **Quietly turned into 5** (default mode) | Accepted | **Refused** |
| Changing the value after the check | — | **Accepted** | — | **Accepted** |
| A function given a wrong object | **Accepted:** `saved not a save request at all` | **Not checked** | Refused at build | Not checked |

**Three things this shows:**
1. Pydantic does not enforce types "in Python". It checks one moment: when a model is created. After that, or at a function call, nothing stops a wrong value.
2. So Pydantic needs a checker too, just as Zod does. The last row is what `tsc` catches and Pydantic does not.
3. Zod is stricter by default, and Pydantic has a strict mode.

**The two are different in one real way.** Python keeps its annotations at run time, so Pydantic can read your normal type hints. TypeScript deletes them, so with Zod you write the check first, and the type is worked out from it:

```typescript
const SaveRequest = z.object({ situationId: z.string(), builtOnVersion: z.number() });
type SaveRequest = z.infer<typeof SaveRequest>;
```

Either way, you define it once.

**So what is the point of TypeScript?** It checks **every line** before the code runs. A shape check covers only the borders. It catches wrong calls, missing fields and bad values in code that agents write, across the whole project, without running anything.

---

## 3. How each runtime actually works

A **runtime** is the program that runs your program.

### Python (the standard one is called CPython)

1. Your code is turned into **bytecode**: simple instructions for an imaginary machine.
2. A loop written in C reads one instruction at a time, and does what it says.
3. Every value is a full object in memory, with its type attached. Even the number 5.
4. **Python checks what each value is on every single step.** That is what makes it flexible, and it is the main reason it is slow.
5. A lock called the **GIL** lets only one thread run Python code at a time, in the default build.

**So why is Python so strong in AI?** The slow loop is only the glue. NumPy, PyTorch and Pydantic's core are written in C, C++ or Rust. Python calls them, and they do the heavy work at full speed.

**Fact.** Python 3.14 officially supports a build without the GIL, which you opt into. It runs single-threaded code somewhat slower. Its JIT (next section) stays off by default, and results are mixed.

### JavaScript (V8, the engine inside Chrome)

1. Your code becomes bytecode too, and starts in an interpreter, like Python.
2. **V8 watches it run.** It notices which functions are busy, and what types they actually receive.
3. It compiles those busy functions to **real machine code**, assuming those types continue. This is a **JIT**: just-in-time compiler.
4. If the assumption breaks, it throws that machine code away, and goes back.

(From memory, on V8's internals.)

**Why was so much effort spent on this?** Browsers competed on speed, so Google and others spent years making JavaScript fast. Node inherited all of that for free.

### The three hosts of one engine

| Host | What it adds to V8 | What it lacks |
|---|---|---|
| A browser | The web page, clicks, network calls | Your files |
| Node | Files, network, operating system (through a C library called libuv) | No web page |
| Cloudflare Workers | Web-standard calls, Durable Objects, D1 | No processes, and no general file system |

**So Node does not simulate the browser.** It takes the same engine, and gives it different powers.

### Doing many things at once

**Here is the surprise: they are nearly the same model.** Both run your code on one thread, with an **event loop**: when a task waits on something slow, the loop runs another.

| | Python | Node |
|---|---|---|
| Your code runs on | One thread | One thread |
| Event loop | `asyncio`, added years later, opt in | Built in from day one |
| Libraries | Many older ones block the whole loop | Written to not block |
| Using all CPU cores | Separate processes | Worker threads, or separate processes |

**The real difference is history.** Node's whole ecosystem grew up non-blocking. Python's grew up blocking, and `async` was added later, so a single old library can stall everything. Dahl on Node: it "doesn't allow the user to lock up the program, ever".

---

## 4. Measured

| Test | Python | Node | Who wins |
|---|---|---|---|
| Recursive calculation, fib(35) | 680–990 ms | 65–130 ms | **Node, about 10x** |
| A loop of 50 million steps | about 2,000 ms | 60–130 ms | **Node, 15–35x** |
| Parse 40 MB of JSON | about 200 ms | about 170 ms | Even: both use compiled code |
| Check 500,000 objects, one at a time | about 900 ms | 180–340 ms | Node |
| Parse and check all at once | about 490 ms (Pydantic's Rust) | about 380 ms (Zod) | Close |
| 100,000 waits of 1 second, at once | about 1,800 ms | about 1,020 ms | Node, but both handle it |
| Start an empty program | 26 ms | 14 ms | Node, slightly |
| Memory when idle | **9 MB** | 41 MB | **Python** |

**Threads and cores:**

| | One thread | Same work × 4 threads | Same work × 4 processes |
|---|---|---|---|
| Python (30M steps) | about 1,200 ms | **5,800–7,500 ms: no gain** | 1,700–2,000 ms: real gain |
| Node (500M steps, worker threads) | 576 ms | 690 ms: real gain | — |

**What this means for Tend.** Most of Tend's time is spent waiting: an AI call takes seconds, and a database read takes milliseconds. So a 10x gap in computing speed is small inside one message. **Speed is not why Tend uses TypeScript.** It does count a little, because Cloudflare bills CPU time.

---

## 5. Is Python going down?

| Source | What it says | What it measures |
|---|---|---|
| GitHub Octoverse 2026 | TypeScript first, Python second, JavaScript third. TypeScript added 3.62 million monthly contributors in a year, and Python 3.23 million | Who contributes to public code |
| Stack Overflow 2026 | JavaScript 62.0%, Python 58.0%, TypeScript 43.8%. With 16+ years of experience: JavaScript 62%, Python 53.2% | Who answers its survey |
| TIOBE | Python peaked at 26.98% in July 2025, fell to 17.76% in September 2026, and was 19.23% in October, still first | Search-engine results; its method changed too |

**My read.** Python is growing fast in absolute numbers. It lost first place on GitHub to TypeScript, and TIOBE shows a real slide from a record peak. That is not a language in decline. The claim that experienced developers are leaving has no evidence I could find.

**The most interesting finding for you.** GitHub: "developers who work with agents gravitate toward languages where agent output is easier to check." TypeScript was the primary language in 35% of projects showing agent use, against 24% of others. So one reason TypeScript is rising may be the very factory you are building: a checker catches an agent's mistakes before anything runs.

---

## 6. Did someone intelligent choose this?

**Mostly it was haste, and then lock-in.**

1. **1995.** Netscape wanted a scripting language in its browser. Brendan Eich was brought in to put Scheme in it. Management wanted something that looked like Java, because of a deal with Sun. He wrote the first version in about ten days. I found no evidence Python was considered. (Secondary sources.)
2. **Then lock-in.** Every browser had to run the same language, or websites would break. So nobody could replace it. **JavaScript is on the web because it was there first,** and not because anyone found it best.
3. **2008.** Chrome's V8 made it fast, driven by browser competition.
4. **2009.** Ryan Dahl built Node, for servers handling many connections without blocking. He said "a lot of people like to program in JavaScript". He has also said (from memory, not verified) that JavaScript suited this because it had no existing blocking libraries to inherit.
5. **2012.** Microsoft built TypeScript. It had to run wherever JavaScript runs, on browsers nobody could change. So it could only add a checker, and then disappear. **Types vanishing is not an oversight. It is the price of being able to run everywhere.**

The intelligence came later, in making the best of an accident.

---

## 7. Why Cloudflare puts JavaScript first

This has nothing to do with Python's quality as a web language. It comes from how Cloudflare runs code.

**Fact.** Cloudflare needed to run thousands of customers' code safely on one machine. A process per customer is too heavy, so it uses V8's own isolation. Isolates "start in 5 milliseconds", use about 3 MB, and "a single process can run hundreds or thousands" of them.

**The cost.** "An Isolate-based system can't run arbitrary compiled code." Only JavaScript, or something compiled to WebAssembly.

**So Python must bring its whole interpreter, compiled to WebAssembly.** Cloudflare says: "A cold start is far more expensive in Python than in JavaScript." About 10 seconds with common packages, and about 1 second with its snapshot trick.

**On AWS or Google Cloud, Python runs natively,** and Instagram runs Django at huge scale. So Python is fine for web servers. It is second only on this one platform.

---

## 8. What this means for Tend

**TypeScript stays, and here is the honest reason.**
- Not fashion: GitHub's ranking did not decide this.
- Not speed: Tend mostly waits.
- **Cloudflare.** Durable Objects and the Workers runtime, which your design rests on, are built around JavaScript. Tests in the real runtime and Chrome's debugger come with it. Those were the reasons recorded on 1 November.

**On a different platform, Python with FastAPI and Pydantic would be a perfectly reasonable backend.**

**The cost you accept.** JavaScript's weak spots stay: `five1`. So Tend needs both protections: the checker in the gate, and a shape check at every border. Which library does that is chosen at implementation.

---

## 9. What a senior would remember

1. A language, its checker and a validation library are three different things. Compare like with like.
2. Python's type hints are not enforced either.
3. Python is slow in its loop and fast in its libraries. That is why it rules AI.
4. Node's speed came from browser competition, and its place on the web came from history.
5. Most web applications spend their time waiting, so raw speed rarely decides this.
6. Choose a language by where it must run, and what must check it.

---

## Sources

**Primary:**
- TypeScript design goals: https://github.com/microsoft/TypeScript/wiki/TypeScript-Design-Goals
- Python's typing docs: https://docs.python.org/3/library/typing.html
- Pydantic, why use it: https://pydantic.dev/docs/validation/latest/get-started/why/
- GitHub Octoverse 2026: https://github.blog/news-insights/octoverse/octoverse-commits-pushes-reach-new-highs-in-2026-as-developers-build-with-agents/
- Stack Overflow 2026: https://survey.stackoverflow.co/2026/technology
- Cloudflare on isolates: https://blog.cloudflare.com/cloud-computing-without-containers/
- Cloudflare on Python Workers: https://blog.cloudflare.com/python-workers-advancements/
- Ryan Dahl, interview: https://www.infoworld.com/article/2078518/node-js-inventor-extends-javascript-programming-beyond-browsers.html

**Secondary, so weaker:**
- TIOBE, through TechRepublic: https://www.techrepublic.com/article/news-tiobe-october-2026-java-closes-cpp-gap/
- Eich on JavaScript's creation: https://thenewstack.io/brendan-eich-on-creating-javascript-in-10-days-and-what-hed-do-differently-today/
- The ten days, questioned: https://thehistoryoftheweb.com/the-10-day-programming-language-is-a-myth/
- Instagram's Django scale, a conference abstract: https://atscaleconference.com/?p=1022
- Python 3.14, performance: https://blog.miguelgrinberg.com/post/python-3-14-is-here-how-fast-is-it

**The experiments:** `experiments/lesson_05_python_types_at_runtime.py`, `lesson_05_typescript_types_at_runtime.ts`, `lesson_05_speed.py`, `lesson_05_speed.ts`.
