# The Situation Registrar: starting point

This is the planning file for the first component Tend builds. It says what the component is, what Swaraj has ruled, what is true and false in what was claimed, and how many plans it will take.

**The name (Decided, Swaraj, 4 November 2026).** The Situation Registrar, or the registrar for short. "Let's not Indianize this. This is a global product." The design's older files still call it the situation record, and they will until they are updated.

**Status words.**
- **Decided:** Swaraj said it, with the date.
- **On record:** the architecture says it, and he has not changed it.
- **Proposal:** the assistant's call. It waits for his yes.

Part 8 lists what changed in the architecture files.

**Tend's other parts, in one line each.**
- **Conversation manager:** takes in each message or outside answer, works out where it belongs, decides whether a person should hear an update, and sets a situation to completed.
- **Situation worker:** reasons about one situation, and decides its next step and what should be said. One pass of it is a **run**.
- **Intake:** the conversation manager's first step, which takes in each arrival from outside.
- **Memory and knowledge:** hands each AI step the context it needs, and decides whether two situations are linked, by fixed rules.
- **Tool layer:** the only way Tend calls an outside system.
- **Communication layer:** checks and sends each message. Its **send check** is the last check before anything goes out.
- **Status-check service:** waits on a slow outside system, such as a carrier.
- **Owner view:** the screens the business owner opens.
- **Configurator:** the person who sets the business up. **Cleaner:** the piece of memory and knowledge that carries out an erasure.

**Cloudflare words.**
- **D1** is Cloudflare's SQL database. It does one thing at a time.
- A **Durable Object** is a small Cloudflare program with its own private SQLite database. It also does one thing at a time.
- A **thread** is one line of work, so "one thread" means everything else waits in line.
- A **transaction** is a group of saves that all happen, or none do.
- **R2** is Cloudflare's file storage. **Basin** is its analytics product.

---

## 1. The component in one paragraph

Tend is the product. Meera's late parcel is one situation: one business problem Tend is handling. Tend keeps it as a numbered list of saved states, called versions. An old version never changes, and each version can be read on its own. When a new version is saved, the right parts of Tend are told; that message is a notice. Beside the versions sits the book of waits: the list of every open wait that may outlast the current run. This component is more than storage. It accepts every write, saves it, and sends out the notices. It holds a registry of all situations and who is in them. It writes links and corrections when another part asks it to. It decides nothing about the business. It only follows fixed conditions.

---

## 2. What Swaraj ruled on 4 November 2026 (Decided)

Quotes are his words; obvious dictation slips are fixed in square brackets.

1. **Each business has its own database, and there is no shop column.** "We will give each business a database. We do not need a shop column."
2. **This component sends every notice.** "Who sends the notice? It is always the situation record." It looks at where an update came from and which conditions are met, and sends the event to the right part: "in which condition which part gets that event has to be handled by this service that we are making right now."
3. **This component is responsible for lost notices.** "If a notice is lost, who tries again? This component is responsible for the events."
4. **It never judges.** "It is not responsible for deciding anything … There are just conditions that we will code … if those conditions will be defined by us." And: "The situation record does not question why he has to wait."
5. **The registry is its responsibility.** "one of the responsibilities of the situation record is to keep a registry or a version register of all the situations that there are."
6. **The link from a person to their situations must exist.** "this has to be there."
7. **It writes links and corrections.** "The worker will send an event that says that this two situation needs to be merged, right? The memory and knowledge layer might say that these two situations have to be linked, but who will write that in the database? It is this component."
8. **It must serve everyone who needs it.** "The situation has to basically cater to every demand and requirement, whether be it of conversation manager, whether be it of the situation worker, whether be it of the memory and knowledge layer."
9. **Each version is readable on its own.** "For a version physically, I think yes, it should be readable on its own."
10. **Build it completely.** "We will build everything." One component may take several plans.
11. **Load on the databases must be as small as possible.** "The main principle of a database is the less load we put on it."
12. **One Durable Object per situation.** "One durable object per situation, excellent idea." Part 6 has the detail.
13. **Separate databases for configuration and learned knowledge.** "one for configuration, one for learned knowledge. Yes, makes sense."
14. **Merges and erasures may visit several objects.** "It's fine if merges and erasures have to visit several objects. It's fine, we have given that responsibility to this, right?"
15. **The name is the Situation Registrar.**
16. **Plans live in `knowledge_base/plans/`,** with one folder per plan, each holding the plan and its final record.
18. **Stay lean: we write our own run-time shape checks.** "We will have to code in our type checking at runtime ourselves … We can probably also use some external libraries like Zod … let's just keep it as lean as possible. If we need it, then we'll have it."
17. **The front door is a Worker, and the conversation manager is a Durable Object.** "The worker is the front door, and the conversation manager would be a durable object." The assistant reads this as one per person. It is not yet settled where the update loop runs.

---

## 3. Each claim, checked

These claims are Swaraj's, from his message of 4 November 2026. He asked for them to be checked as a senior engineer would. The verdicts are the assistant's, checked against the design and Cloudflare's documentation. Swaraj may overrule any of them.

**The claim he asked about first: the status-check service owns or shares the book of waits, because it gives us time. Verdict: false.**
- The book holds waits on people, dates, meetings and approvals. The service handles only waits on outside systems.
- Time comes from the alarm the situation worker sets, and not from the service.
- Priya's follow-up at 10:00 involves no outside system at all.
- In the design's build order, the timer-race story uses the book before the service exists.
- The design already considered and rejected this (decision 22), because it would mix waits on people and dates with waits on outside systems.
- What is true: the service reads the book, to find the waits it must serve.

| Claim | Assistant's verdict | Why |
|---|---|---|
| One database per business | **Right** | Cloudflare says D1 is designed for this. The design chose it too, and rejected a shared store with a field naming the business (decision 15) |
| We can raise compute on one busy database | **False** | D1 and Durable Objects have no such dial. One is one thread, always. You scale by having more of them |
| A database per business removes the bottleneck | **Half** | It protects businesses from each other. It does not protect a busy business from itself |
| It gives us data sovereignty | **Half** | It makes the data one business's own unit. It does not fix where the data lives. Cloudflare offers the EU, FedRAMP and the US, and not India |
| Everyone must eventually shard | **Too strong** | True when writes are the load, and Tend is write-heavy on purpose. OpenAI reportedly runs ChatGPT on one Postgres writer and many read replicas |
| Product engineering is a new parallel to software engineering | **Too strong** | Starting from the product is a real strength, and it led to the right answer here. But keeping everything about one situation together is an old idea. Software engineers call it an aggregate, and Cloudflare calls it an atom. On 1 November Swaraj said a great product engineer needs "product thinking, business thinking, plus software engineering thinking both in hand". That is the better statement |
| This component should send every notice | **Right** | It fixes the lost-notice gap, because a notice can be saved in the same transaction as the version. Writers no longer need to know who listens. It overturns "the writer is the broadcaster" of 5 September, so it needs recording |
| A writer's update should not come back to the same writer | **Right** | The design's tables already route this way. A naive setup, where every listener gets every event, would not |
| Routing uses "heuristics" | **Wrong word** | It must be a fixed table, read from typed fields the writer set. The moment it reads a message's meaning, it has taken the conversation manager's update decision |
| It receives events from MCP servers and the book of waits | **False** | The book is a table, and it sends nothing. An outside event must go through intake or the tool layer first. Otherwise it skips understanding and the check of who sent it. Two rules forbid that |
| Corrupted data is a networking issue | **False** | The network already catches damaged bytes. Real causes are bugs, an old copy of the code during a deploy, and AI output. Also, versions are forever, so a bad save stays. So this component checks the shape of every write, always |
| It should not judge whether a step is wise | **Right** | It checks only what a table can answer: is this writer allowed this kind of change, is this move between states allowed, is the required partner present, is the shape right. It never asks why |
| Writes should be loosely coupled | **Half** | Saves of truth must finish before anything continues, because a started refund saved "eventually" could be paid twice. Everything derived can be loosely coupled |
| Durable Objects mean we need not write to a central database every time | **Right** | This is the core of the recommendation in part 6 |
| Too many Durable Objects would be a headache to track | **Right, and solved** | The registry tracks them. Cloudflare documents this exact pattern |
| Cloudflare has its own Postgres | **False** | Hyperdrive reaches a Postgres hosted elsewhere. Cloudflare does not host one |
| We can pay to raise Cloudflare's limits | **Half** | Some limits rise on request, such as total storage. D1's 10 GB "cannot be further increased", and the single thread is inherent |
| We may need a graph database | **No** | The memory and knowledge design says "Graph data, not graph structure". Links are rows, and one query can follow them |
| The person-to-situation link must exist | **Right** | See part 4 |

---

## 4. The person link: what was missed

Swaraj said that if this link is missing, earlier work was poor. He is right.

**It is in the design:**
- The responsibility view: "Each person is linked to every situation they take part in."
- Level 2: a person is "one record for one human being, kept beside the situations".
- Level 2's lookups use "person ID; status" and "the situation's parties".

**It is missing from:**
- the state view's table of records. That file says it is "the one place where all those rules are written together", and it has no row for person records or a situation's parties;
- the situation record's own build file.

That is a defect in the views the assistant built in October, and it should be fixed. The assistant's first map of this component said the link had "no clear home". That was true of those two files, and it under-read the rest. The rule was always there.

**Where it goes now:** in this component's registry. That follows from ruling 5, and from "kept beside the situations".

---

## 5. What is inside this component now

**It holds or runs:**
- every version of every situation, with who wrote it, why, and when;
- each situation's state (running, waiting, blocked, completed), and its outcome when closed;
- the reopened mark;
- the book of waits;
- the notices: who gets each, and trying again until delivered;
- the registry: the list of situations, the people in them, and their typed fields and numbers;
- links between situations, and the writing of splits, merges and reroutes;
- carrying out a confirmed erasure across all of the above.

**Who decides each thing stays as the design says:**

| Decision | Who decides | Who writes it |
|---|---|---|
| The next step, waits, what should be said | Situation worker | This component |
| Where an arrival goes; completed | Conversation manager | This component |
| Whether a link exists | Memory and knowledge, by its fixed rules | This component |
| A split, merge or reroute | Situation worker | This component |
| Whether a person's data is erased | The owner or the configurator | This component, told by the cleaner |

**So the "one writer" rule changes meaning.** Each kind of change still has one author. There is now one door for all writes. The author is recorded on every row.

**Still outside it:** held notes and message history (the conversation manager's), the sent record (the communication layer's), retry counts (the tool layer's), the alarm itself (the worker sets it), and the owner's eleven labels and a person's journey (worked out when asked, never stored). A carrier's real tracking stays with the carrier.

**Who may call it.** Only Tend's own parts. Anything from outside passes through intake or the tool layer first. Those are also where outside data is reshaped to fit Tend's shapes, before it reaches this door.

### What it may refuse

All of these are table lookups, not judgement:

| Refused when | Example |
|---|---|
| The shape is wrong | A save with a missing field, or from an old copy of the code |
| The save is built on an old version | The worker read version 5, and version 6 now exists |
| The base version does not exist | A save built on version 7, when the newest is 6 (**Proposal**) |
| This writer may not make this kind of change | The worker tries to write "completed" |
| This move between states is not allowed | Blocked to completed by the worker |
| A required partner is missing | A closure with no outcome; a work item with no owner |

**It cannot refuse this:** a reply that fails to cancel the wait it answers. Knowing that a reply answers a wait takes reasoning, so it is the worker's fixed code that must bundle them. A story test checks it.

**Why the version check stays, even with one thread per situation.** The worker can spend many seconds on an AI call while thinking about version 5. Meanwhile, Priya's reply is saved as version 6. One thread stops two saves from landing at the same instant. It does nothing about a decision made on old facts. So the save still names the version it was built on.

### Who gets each notice (first draft of the table)

The right column comes from the design's own tables of who hands what to whom. The table's shape is a **Proposal**.

| When this is saved | Written by | The notice goes to |
|---|---|---|
| An arrival on a situation | Conversation manager | Worker; memory and knowledge |
| An arrival that is an opt-in or opt-out | Conversation manager | Also the communication layer's consent code |
| A version after a platform rule change | Conversation manager | Worker; memory and knowledge |
| Completed | Conversation manager | Worker, to remove its check-in (my reading); memory and knowledge |
| What the worker concludes | Worker | Conversation manager's update decision; memory and knowledge |
| A wait on an outside system | Worker | Also the status-check service |
| A change that may be one of the four alerts | Worker | Also the owner view |
| A new version of a person's situation in an outreach | Worker | Also intake, as an arrival for the central situation |
| A link | Memory and knowledge | No part that acts: "a link never carries a change" |

---

## 6. Where the data lives (Decided, Swaraj, 4 November 2026)

The full reasoning, numbers and sources are in `research_insights.md`, at the root of the repository. Lesson 1 teaches this from the ground up.

**The fact underneath.** One D1 does one thing at a time, and it is built on one Durable Object. So the question is how much of Tend one thread should carry.

**The decision:**
- **One Durable Object per situation holds its truth,** meaning the saved record that counts: versions, state, its waits, and notices not yet sent, all saved in one transaction.
- **One D1 per business holds the registry:** situations, people, typed fields, the book's shared list, and links.
- **A separate D1 per business for configuration, and another for learned knowledge,** so neither can make the other queue.
- **R2 for large files, and Basin for reports across businesses.**

**The rule behind it:** one truth for each fact. The save to the truth waits. Everything derived from it does not.

**What this gains:**
- no save in one situation ever waits for a save in another, so an owner's campaign to 50,000 people runs in 50,000 separate lines. On one D1, by my arithmetic, that campaign takes about 8 minutes of the only thread, and customers would meet waits and "overloaded" errors unless it were slowed down;
- reading the newest version, Tend's most frequent read, is local;
- no 10 GB wall on a situation's history;
- lost notices are solved, because the version and its pending notices commit together, and the object's own alarm retries them.

**What this gives up:**
- the book's shared list is a moment behind, instead of saved in the same save. The design's decision 22 says the two are saved together, so this softens it. I went through every part that reads the book, and found no harm, for four reasons:
  - an outside system's answer names the wait it answers;
  - the owner's screen already shows when it was last updated;
  - the send check is still the last check before any message goes out;
  - a Durable Object's alarm survives a restart by itself.

  The stories must confirm this;
- a merge is no longer one transaction;
- an erasure and a business's export must visit every situation.

**Still to measure.** The numbers rest on two guesses (1 ms a read, 5 ms a save). **Proposal:** the first simulation runs measure them on real Cloudflare, with the campaign story, and replace the guesses.

---

## 7. The plans

The factory's rule: a plan describes one module, which is a piece of code small enough to plan in one conversation. Swaraj is taught before each plan, and reads the code after each one. **Bloom and Bob** are the two made-up shops in every test. Eight is an estimate (**Proposal**). It may grow when a plan turns out to be too big.

| # | Plan | What it builds | Confirmed by |
|---|---|---|---|
| 1 | The bench and the first whiteboard | The project, Cloudflare's local tools, tests inside the real runtime, Bloom and Bob, one clock, the run store, the whiteboard's first screen | It shows one scripted event, and you can step through it |
| 2 | Versions | Save, read, the version check, states, outcomes, the writer table, shape checks, things saved together | SR-01 to SR-05, Priya's race |
| 3 | Notices | Saved with the version; the routing table; delivery; trying again; duplicates do nothing | SR-06, the lost notice |
| 4 | The book of waits | Waits with their saves; the shared list; lookups; the rebuild check | The timer race, a restart |
| 5 | The registry and people | The list of situations; person to situations; typed fields; the lookups memory and knowledge needs | "hi" writes nothing; two messages a second apart |
| 6 | Corrections and links | Links, split, merge, reroute, reopen, one event across many situations | The flood, a wrong link, a merge with two waits |
| 7 | Erasure and ageing | A confirmed erasure through every version; the erasure's record; hot, warm and cold; a business's export | Priya's erasure |
| 8 | The full replay | Every story, scripted; the campaign under load; every failure injected; in the simulation environment | Every non-None row of the story registry |

**Each plan also adds its own piece of the simulation and the whiteboard,** as `environments_simulation_and_whiteboard.md` describes.

**Before plan 1 comes the factory's Learn stage,** where Swaraj is taught what each plan needs. The factory proposes "what a table is" as the first lesson, because everything rests on it.

---

## 8. What changed in the design

Swaraj asked for this on 4 November 2026, and it was done the same day. The design's views now use the new name and the new rules:
- the build file is now `build_view/situation_registrar.md`, with its seventeen questions rewritten;
- decisions 38 to 42 record the rulings, and decisions 6, 22, 27 and 31 say what changed;
- the boundary, interaction, state, constraint, responsibility and traceability views, and every walk, are updated;
- the harness study's parts 8 and 9 show the new storage;
- the conflict register's rows 36 to 43 list what the older records still say.

**Left as written, on purpose:** sections 6 to 11, the Level 1 and Level 2 pages, and the history files in `checking/`. They are records of what was said at the time.

**One question remains for Swaraj:** the factory's isolation audit is to be used exactly as written (he decided this on 13 September). It asks for the query condition that limits a query to one shop, and one database per business has no such condition. He must decide how to read it.

---

## 9. The name (Decided)

**The Situation Registrar.** A court's registrar keeps the official record, accepts filings, checks their form and never their merit, numbers each one, keeps the register of all cases, and serves notices on the parties. The judge decides, and the registrar never does.

**"Situation manager" was rejected** by the assistant's reasoning, and Swaraj agreed by choosing this name: a manager decides things, and this part must never decide.

**The book of waits keeps its name.** "The docket" was suggested and Swaraj did not take it up.
