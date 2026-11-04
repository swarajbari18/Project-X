# How the lessons connect, and where the factory stands

**Written on:** 4 November 2026, after lesson 7. Swaraj asked for "the connections, interactions between all the lessons" and "a final status quo".

The status in part 4 is a snapshot of this date. The live records are the plan folders, the learning record and the factory file.

---

## The eight lessons

| Lesson | What it taught | File |
|---|---|---|
| 1 | Where Tend's data lives, and why everything queues | `engineering_lesson_01_how_tend_stores_data.md` |
| 2 | How a database finds one row: keys, indexes, the B-tree | `engineering_lesson_02_primary_keys_and_indexes.md` |
| 3 | What a test is, and how to tell a real one from an empty one | `engineering_lesson_03_what_a_test_is.md` |
| 4 | Reading TypeScript from Python: types, `as`, `await` | `engineering_lesson_04_reading_typescript.md` |
| 5 | How Python and JavaScript really run, and why TypeScript here | `engineering_lesson_05_runtimes.md` |
| 6 | How a Cloudflare project is laid out, and what a binding is | `engineering_lesson_06_a_cloudflare_project.md` |
| 7 | How a page gets live updates, and survives losing them | `engineering_lesson_07_live_updates.md` |
| 8 | What a WebSocket actually is, byte by byte | `engineering_lesson_08_websockets_from_the_bytes_up.md` |

---

## 1. One message, through the lessons

Meera writes about her late parcel. That is situation `s-42`. You have the whiteboard open. This is simplified: it leaves out the conversation manager's and the worker's own steps, which come in later components.

```text
Meera writes about her late parcel
   │
   ▼  Cloudflare calls fetch, because main exports it .............. Lesson 6
   │  It runs inside V8, which is why this is TypeScript ........... Lesson 5
   │
   ▼  It is only text. Parse it, then check its shape .............. Lessons 4, 5
   │  (types are gone by now, so only our own check protects us)
   │
   ▼  Tend's code picks the name s-42. The caller never does ....... Lesson 6
   │
   ▼  await env.SITUATION_REGISTRAR.getByName("s-42").saveNewVersion(...)
   │  a door, a stand-in, and a real call that must be awaited ..... Lessons 4, 6
   │
   ▼  The object wakes up. Its plain variables are gone ............ Lesson 7
   │
   ▼  It does one thing at a time, so everything else waits ........ Lesson 1
   │
   ▼  Its primary key finds the newest version in a few jumps ...... Lesson 2
   │
   ▼  Built on the newest version? If not, refused ................. Lessons 1, 3
   │
   ▼  The version and its notices save in one transaction .......... Lesson 1
   │  THE TRUTH. This save waits.
   │
   ├──▶ The registry's shared list updates a moment later .......... Lessons 1, 2
   │    DERIVED. Its index answers "Meera's waiting situations"
   │
   └──▶ The whiteboard gets a nudge, and asks for what it missed ... Lesson 7
        DERIVED. If it is lost, the next nudge or reconnect repairs it

Every step above is a rule. Every rule gets a test that can fail ... Lesson 3
Those tests run inside Cloudflare's real runtime ................... Lesson 6
```

---

## 2. Six ideas that run through every lesson

The lessons look like separate topics. They keep teaching the same six ideas.

| The idea | Where it shows up |
|---|---|
| **One truth. Everything else is derived.** | **1:** the rule itself. **2:** an index is a derived copy that speeds up the table. **4:** even our own rows are checked when read back. **7:** a page is derived, so it asks the truth |
| **One line: one thing at a time.** | **1:** the queueing arithmetic. **2:** a missing index costs everyone behind it. **5:** JavaScript runs your code on one thread. **6:** one object per name. **7:** telling 1,000 pages uses the same line |
| **Two moments: before running, and while running.** | **3:** tests check before release. **4:** `tsc` checks, and then the types vanish. **5:** Python keeps its hints, and never enforces them. **6:** the type check refuses, or the run fails. **7:** a page's script in a string is not checked |
| **Nothing is checked unless something checks it.** | **3:** a green test can check nothing. **4:** `as` checks nothing. **5:** Pydantic checks one moment. **6:** a wrong name gives an empty object, not an error. **7:** a socket lets anyone in, unless the front door checks |
| **Failure is normal, so a repeat must be harmless.** | **1:** a save names the version it was built on. **3:** the wrong-order test. **4:** nobody hears a refusal that was not awaited. **7:** reconnect, catch up, and a repeat does nothing |
| **Your laptop proves logic, not the real world.** | **1:** the numbers rest on two guesses. **3:** the gate and the simulation do different jobs. **5:** speed measured here is only a sense of scale. **6:** a plain variable looked shared. **7:** no real network, and no real deploy |

---

## 3. Which lesson each plan leans on

| Plan | Leans on | Why |
|---|---|---|
| 1. The bench and the first whiteboard | 3, 4, 6 | Tests in the real runtime, reading the code, the project's layout. Lessons 7 and 8 only if you want a live run |
| 2. Versions | 1, 2, 3, 4 | The version check, primary keys, test tables, shape checks |
| 3. Notices | 1, 7 | One transaction; a repeat does nothing; a loss repairs itself |
| 4. The book of waits | 1, 2 | The shared list is derived, and it needs the right index |
| 5. The registry and people | 2, 6 | Indexes for each question; who may choose a name |
| 6. Corrections and links | 1, 3 | Several objects means no single transaction |
| 7. Erasure and ageing | 1, 3 | Visiting every object; proving nothing was missed |
| 8. The full replay | All | Everything, under load, with failures on purpose |

---

## 4. Where the factory stands

**The factory's loop:** learn, then plan, then translate, then review, then record, one component at a time.

**The Situation Registrar is component 1 of 10.**

| Stage | State | The evidence |
|---|---|---|
| **1. Learn** | Taught, and mostly not yet shown | 8 lessons, 54 concepts. Swaraj has shown a rung on 4 of them, and part of one more |
| **2. Plan** | Not started | 8 plan skeletons exist. None is written. No rule or test is locked |
| **3. Translate** | Not started | Tend has no code. The lessons' experiment code was deleted on 4 November |
| **4. Review** | Not started | Nothing to review. The gate's checks do not exist yet |
| **5. Record** | Started | The learning record is live. The 8 plan records are empty |

**So we have finished teaching for plan 1, and we have not built any of Tend.**

### What now exists

- **The factory itself,** rewritten around your learning on 1 November and updated on 4 November: `knowledge_base/software_factory_with_coding_agents.md`.
- **The road to customers, the simulation and the whiteboard,** as a written design: `environments_simulation_and_whiteboard.md`.
- **The story registry,** so stories can confirm the build: `story_registry.md`.
- **The research insights,** where you can see them: `research_insights.md`.
- **The design, updated** for the Situation Registrar: the build view, all the views, decisions 38 to 42, and conflict rows 36 to 43.
- **The starting point and the plan folders:** `knowledge_base/plans/situation_registrar/`.
- **Eight lessons,** and the learning record. The code behind them was deleted, and their results are written in the lessons.
- **The agent memory,** where you can read it: `agent_memory/`.
- **The prompt that starts plan 1:** `knowledge_base/plans/situation_registrar/handoff_prompt_start_plan_1.md`.
- **The language decision:** TypeScript, because of Cloudflare.

### What does not exist yet

- The bench: the real project, the controlled clock, the test shops Bloom and Bob.
- The gate: the flip check, the test-ID audit, the forbidden-call scan.
- The run store, the whiteboard and the simulation.
- Any plan, any locked test, and any line of Tend.

### The factory is still untested

The factory's own file lists "The first real cycle" as **Open**: "the experiment that tests everything above". Its method has never run on a real component. Plan 1 starts that test. Expect it to change the factory.

### What is waiting for you

**Your learning work.** You asked to skip the last question, which is fine. These are unanswered, and the first plans will depend on them:

| Lesson | The work |
|---|---|
| 1 | Does Meera's save wait for the registry's busy batch? |
| 2 | SEARCH or SCAN, for four questions |
| 3 | Lock a test: "a closure must be saved with its outcome" |
| 4 | Why `claim: answer` needs no `as` after the check |
| 6 | Add a second class: every line, and which file |
| 7 | The laptop that slept overnight |
| 8 | Read the bytes `81 05 68 65 6c 6c 6f` |

**Your decisions.**
1. **How to read the isolation audit's "tenant predicate".** It asks for a query condition naming the shop, and one database per business has none (conflict 43).
2. **The factory's 16 proposals** waiting for your yes, listed under "Decisions, proposals, and open points".
3. **Plan 1's questions.** They are in its `plan.md`.
4. **What creates a business, and how people join it.** Open, and deliberately later.

**Housekeeping.**
- **Your push.** The branch was rewritten, so it needs `git push --force-with-lease`. Until then, GitHub's two older commits show as incoming. Do not pull or sync them. Your SSH key may still fail. Check github.com/settings/keys.
- **The empty days in your commit graph.** Your call. I did not invent commits for days when no work happened.
- **A pointer at the repository's root,** so other agents find `agent_memory/`. Your call.
- **`backup/before-splitting-commits`** is a local branch you can delete.
- **The copy of Playwright inside the ChatGPT app,** in `/usr/lib/chatgpt/`, needs your admin rights to remove. Your Assignment project's `package.json` also still names Playwright.
- **`handoff_writing_instructions.md` names a `status_quo.md`** that does not exist anywhere in this repository.

**What the assistant still owes.** A fresh-reader audit of lessons 3 to 8, this file, and the root files. Plan 1's agents must also follow your rule that the AI never sees store IDs.

### The next step (Proposal)

**Start the plan 1 conversation.**

You should know the risk. Being taught is not understanding, and the record shows few concepts proven so far. My suggestion is to let plan 1 be the proof. Its questions make you use lessons 3, 4 and 6 to make real decisions, which is rung 2 on the ladder. Where you get stuck, we stop and go back to that lesson.
