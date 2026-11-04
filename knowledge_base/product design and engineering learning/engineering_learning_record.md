# Engineering learning record

This is Swaraj's record of what he has been taught, where, and how it has been used since. He asked for it to be "so precisely towards my weaknesses and my strengths that it would be useless to everyone else in the world".

**Its shape is a Proposal.** It may change.

**The five rungs of understanding (Proposal).** Explain it; decide with it in a plan; read it in the code; find it where it is missing; teach it. An entry only moves up when Swaraj shows it. Being taught does not count.

---

## Concepts

| Concept | Taught in | Rung shown | Used in a plan | Met in code |
|---|---|---|---|---|
| Table, row, column, primary key | Lesson 1, section 2 | Not yet | — | — |
| Index, and a scan | Lesson 1, section 2 | Not yet | — | — |
| Transaction | Lesson 1, section 3 | Not yet | — | — |
| Thread, and queueing | Lesson 1, sections 1 and 4 | Not yet | — | — |
| Postgres connections and pooling | Lesson 1, section 4 | Not yet | — | — |
| One query at a time (D1 and Durable Objects) | Lesson 1, section 4 | Not yet | — | — |
| Worker as front door, Durable Object as line | Lesson 1, section 5 | **Explain:** he reasoned this himself on 4 November | — | — |
| Class and object | Lesson 1, section 6 | Not yet | — | — |
| Throughput from query time; why waits explode near full | Lesson 1, section 7 | Not yet | — | — |
| A save built on the version it read | Lesson 1, section 8 | Not yet | — | — |
| Truth, lookup, trace, analytics | Lesson 1, section 10 | Not yet | — | — |
| A tracking ID carried through everything | Lesson 1, section 11 | Not yet | — | — |
| Pages: a database reads whole blocks, not rows | Lesson 2, section 2 | Not yet | — | — |
| Primary key versus index | Lesson 2, section 4 | **Explain:** he predicted a primary-key lookup jumps, because the key has its own index | — | — |
| The B-tree, and why it stays shallow | Lesson 2, section 5 | Not yet | — | — |
| Column order in an index | Lesson 2, section 6 | Partly: he got person-first right, and missed that a second column cannot be jumped to alone | — | — |
| Partial index | Lesson 2, section 6 | Not yet | — | — |
| What an index costs | Lesson 2, section 7 | Not yet | — | — |
| `EXPLAIN QUERY PLAN`: SEARCH or SCAN | Lesson 2, sections 3 and 8 | Not yet | — | — |
| B-tree versus LSM tree; SQL versus NoSQL | Lesson 2, section 9 | Not yet | — | — |
| Given, when, then | Lesson 3, section 1 | Not yet | — | — |
| A green test can be worthless; the flip check | Lesson 3, section 3 | Not yet | — | — |
| A family of tests for one rule | Lesson 3, section 4 | Not yet | — | — |
| What makes a test trustworthy | Lesson 3, section 5 | Not yet | — | — |
| Testing something that uses an AI: frame, what must be true, quality | Lesson 3, section 6 | **Explain:** he raised this himself, with the capital of India | — | — |
| Unit, integration, end to end | Lesson 3, section 7 | Not yet | — | — |
| Who may choose expected values | Lesson 3, section 8 | Not yet | — | — |
| Types: a promise about shape, checked before running | Lesson 4, section 2 | Not yet | — | — |
| Types disappear at run time; shape checks | Lesson 4, section 3 | Not yet | — | — |
| `as` and `any` | Lesson 4, section 3 | Not yet | — | — |
| Async: a TypeScript call starts at once; a forgotten await is silent | Lesson 4, section 4 | Not yet | — | — |
| Reading code for its purpose | Lesson 4, section 5 | **Read:** he named the function's purpose, found the missing await, and questioned `unknown` against `as` | — | — |
| Building and running are two moments | Lesson 4, section 6 | Not yet | — | — |
| `unknown` versus `any` | Lesson 4, section 6 | Not yet | — | — |
| A language, its checker and a validation library are three things | Lesson 5, section 2 | Not yet | — | — |
| How CPython and V8 run code; the JIT; the GIL; the event loop | Lesson 5, section 3 | Not yet | — | — |
| Choosing a language by where it must run | Lesson 5, sections 7 and 8 | Not yet | — | — |

---

## Strengths seen

- **He starts from the product's unit.** Given "one Durable Object per situation", he said at once that a tracker was needed, before being told one existed.
- **He remembers why a design choice was made.** He explained why the front door is a Worker and the situation worker is a Durable Object, and the record agrees.
- **He notices what is missing.** He insisted the person-to-situation link "has to be there". It was missing from the views, and he was right.
- **He drops his own idea when the facts say so.** He worked through a large cross-business idea, then saw for himself that each business's own channel already answers it, and scrapped it.
- **He refuses to follow fashion.** He asked whether TypeScript's popularity had a real reason, and asked for evidence even on a decision already made.
- **He catches contradictions.** He saw that lesson 3 banned AI from tests, while naming a simulated story with real AI as a test.

---

## Misconceptions found and corrected

Each of these came up in his own words on 4 November 2026.

| What he thought | What is true | Where it was corrected |
|---|---|---|
| In Postgres, things do not queue up | They queue at the pool, at a row, and at the CPU | Lesson 1, section 4 |
| Debugging needs analytical data | Debugging one conversation is a lookup by one ID | Lesson 1, sections 10 and 11 |
| A database can be given more compute | D1 and Durable Objects have no such dial; you add more of them | Lesson 1, section 4 |
| A database per business removes the bottleneck | It protects businesses from each other, not a busy business from itself | Lesson 1, section 7 |
| The status-check service gives the book of waits its time | Time comes from the alarm the situation worker sets | First verdicts, 4 November |
| Corrupted data is a networking problem | The real causes are bugs, old code during a deploy, and AI output | First verdicts, 4 November |
| One Worker per contact | One front-door Worker per business, in the record | Lesson 1, section 5 |
| An index on a column lets you query by that column, whatever the column order. He said "every waiting situation" could read the index, when the index is sorted by person first | An index helps from its leftmost column onward; that query reads the whole index | Lesson 2, section 6; revisit |
| `CREATE INDEX` is rare because indexes are not needed much | Primary keys bring one automatically, and a scan on a small table is invisible | Lesson 2, section 4 |

| `as` is a typecast, as in Python | It converts nothing; it only tells the checker a story | Lesson 4, section 6 |
| Type checking might be switched on or off for an AI's output | No checker exists while running; only a shape check protects there | Lesson 4, section 6 |
| Reading the version number after saving proves the save worked | Another part could have raised it, and without await the save may not have finished. The save's own answer is the proof | Lesson 4 conversation, 4 November |
| A carrier's answer is handled inside the book of waits | The tool returns evidence, and the worker saves the claim through the registrar. The book is only a list | Lesson 4 conversation, 4 November |

| Pydantic makes Python enforce types at run time | It checks one moment, when a model is created. Python enforces no hints | Lesson 5, section 2 |
| Node simulates the browser | Same engine, different powers | Lesson 5, section 3 |
| Python is going down, and experienced developers are leaving | It is growing; the second claim has no evidence I could find | Lesson 5, section 5 |
| Cloudflare treats Python second because Python is weak at web | Its design runs only JavaScript and WebAssembly | Lesson 5, section 7 |

**Watch for:** the word "worker" means three things, and this causes confusion (lesson 1, section 1).

---

## Mistakes the teacher made

Recorded so they are not repeated.

- **An overstated conclusion.** The teacher said Meera's reply "waits in line" for about 8 minutes during a campaign. The arithmetic was right, but she would not wait that long. Corrected in lesson 1, section 7.
- **Technical names.** "state" meant nothing to him. He asked for product-minded names, even long ones, as long as they follow technical convention. From lesson 2 on, the examples use them.
- **Agreed too fast.** The teacher proposed a whole new part for people across businesses, and told Swaraj one chat per business was the wrong product. The facts were already in front of it: each business has its own channel. He saw it first. He had asked to be challenged, and he was not.
- **Overstated a rule.** It said a trustworthy test uses no AI, and also named a simulated story with real AI as a test. He caught it.
- **A careless example.** Lesson 1's query used "not equal", which an index cannot jump to. Corrected in lesson 2.
- **A jargon-heavy first explanation.** "One thread" and "transaction" were used before they were taught. Swaraj said so, and asked for a lesson from the ground up.
