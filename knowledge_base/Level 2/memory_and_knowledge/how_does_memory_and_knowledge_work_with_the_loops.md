# Level 2 – System Design: Memory and Knowledge

## Status

Answered — working decision. Written 28 October 2026, on Swaraj's instruction to write it into the knowledge base. His answers of 27 and 28 October are applied, marked [Swaraj, 28 October]. Items marked [Working] are the Level 2 folder's answers, which he pointed to as the answers that day. Items marked [Proposed] are this design's own answers.

**Corrected 29 October 2026.** Swaraj: "You just disregarded understanding in itself… The first thing should have been understanding where it would understand what the Diwali sale was about, and so in routing, when there is the retrieval thing, the retrieval would have been much simpler this time." He asked for the whole conversation to be audited. The audit found two roots:
- understanding had no place in either loop;
- a person's visibility was applied to Tend's own reasoning.

The design now has:
- the conversation manager understanding first, and saving its **reading** (A2, A4, F2);
- the worker understanding new content before the business's strategy is presented (F1);
- using knowledge kept separate from showing records (E1);
- routing candidates found from the reading by exact filters (C2);
- memory and knowledge revisiting its own advice (B2);
- a failure rule for understanding (E4);
- alternatives, trade-offs, evaluation criteria and limits (Part H).

**Changed later on 29 October 2026: the loops are now the product loop.** Swaraj: "the loops do not look natural to me… I am first and foremost a product engineer", and "Routing, I don't think would be much of a LLM thing." Tend's loops are now described in [how Tend's product loop works](../the_product_loop/how_does_the_product_loop_work.md), built from the product's stages. In this design:
- the conversation manager's **reading** is now the **understanding artifact**, written by its one AI stage, **understanding the arrival**; deciding where an arrival fits is part of understanding, and routing is fixed code (A4, B1, C2);
- the points are named by the stage they precede, and the codes R1 to R3, W0 to W3 and C1 are gone (A2);
- the costs are counted again (E5);
- Part F keeps only memory and knowledge's role in the loops.

An earlier line here said Swaraj had answered the previous draft's questions with "everything else is okay". That phrase came inside his answer about where skill files live, so it is removed.

## How to read this document

**Tend** is the product: an AI that works for one business, on WhatsApp, email and other channels, and keeps that business's operational problems moving until each is resolved or handed to a person.

The project designs Tend in three levels. **Level 1** says what the problem is. **Level 2** decides how it is solved, in concepts, without technology. **Level 3** chooses technology.

This document is Level 2 for **memory and knowledge**: in Swaraj's words, "an agency within the agency". Its job, in his words: "create a subset of the vast knowledge sea and create a subject and present that in that context. Its main purpose is context engineering, not decision making." Its Level 1 is [the Level 1 framing](memory_and_knowledge_level_1_framing.md). Its tests are [the tests](memory_and_knowledge_design_tests.md).

**What this replaces.** It replaces a different, earlier page: the proposal of 26 and 27 October ("how memory meets the conversation manager and the situation worker"), which Swaraj rejected on 28 October. Nothing here waits for his decision now. What remains is measured or chosen at Level 3, and is listed under "What Level 3 decides".

**Labels**, used before a statement:

- **[Swaraj]** or **[Swaraj, 28 October]**: Swaraj's direction. It governs everything else.
- **[Decided]**: decided before this document and accepted by Swaraj.
- **[Working]**: a working decision in Level 2, not yet reviewed by Swaraj.
- **[Fact of Tend]**: how the rest of Tend is already designed.
- **[Proposed]**: new in this document.
- **[Change]**: something here that changes an earlier decision. It names what it changes.
- **[Level 3]**: left to the technology stage.
- **[Open]**: not yet settled; the text says what would settle it.

---

## Words used

**Tend's parts**

- **Situation**: one operational problem, with its own saved record. Each change saves a new **version**. A situation has a **kind**, such as "late delivery".
- **Arrival**: anything new that reaches Tend: a message, a reply, an answer from a business system, a document, an approver's answer, or a change sent from another situation.
- **Intake**: the conversation manager's fixed code that saves each arrival. [Decided] Only intake saves arrivals.
- **Conversation manager**: the part that takes each arrival. Its one AI stage, **understanding the arrival**, works out what the arrival means and where each ask fits; **routing**, fixed code, carries that out. [Level 2, understanding the situation] Understanding comes before routing; routing is the result of understanding.
- **Understanding artifact**: what understanding the arrival writes: each ask and whether it is about the business, what each refers to with time words turned into dates, the sender's claims, what is unknown, what Tend already holds that answers it, and where it fits (see part A4). It is an interpretation, never a fact. It is saved with the arrival. Until later on 29 October 2026 it was called the **reading**.
- **Situation worker**: the part that works one situation. A **run** is one time it works on a situation, from waking to resting. A run has **rounds**: each round is one decision, and the action it chooses. [Decided] One run per situation at a time.
- **Loop**: one of Tend's four loops (the arrival loop, the situation loop, the update loop, the message loop), each made of **stages**: see [the product loop](../the_product_loop/how_does_the_product_loop_work.md). Understanding comes first in each.
- **Harness**: the fixed code that runs each loop. It calls the AI, checks what the AI wrote, runs tools, saves results, and decides whether to go round again.
- **Fixed code**: ordinary code that always does the same thing in the same case. It can compare exact values. It cannot understand meaning.
- **Tool**: one path for one kind of call to an outside system. A tool's **form** is the list of what it needs, which the AI fills in. Tend's code runs it. Tools are never bound to the AI model. A **capability** is a tool, or a group of tools with one purpose, that a business has switched on, including tools from MCP servers the business connects.
- **Tool layer**: the only way Tend calls outside. It checks permission before each call.
- **Communication layer**: writes messages to people and sends them. Its **send check** tests every message before it goes.
- **Clarification** and **confirmation**: [Decided] a clarification is the loop asking someone for missing information. A confirmation belongs to a tool: a tool that needs a yes or no runs its own pre-configured approval flow, through the communication layer, to the right person, and completes only after the answer. The AI never runs a confirmation itself.
- **Wait**: a saved note that a situation cannot go on until something named happens. [Decided] Only the situation's own worker ends its wait. The **book of waits** lists every open wait.
- **Trace**: the saved record of one run. [Decided] It holds no personal data.
- **Configurator**: the person who sets the business up in Tend.

**Memory and knowledge**

- **Memory and knowledge** (always both words): the part described here. Swaraj: memory is "of the knowledge that we have created". Situations alone are only situations. When situations, skill files and business rules are linked together, and reasoned over, they make **knowledge**. [Working] The kinds it holds: conversation history; situation memory; experience (what Tend tried, and what followed); business meanings; procedures and skills; lessons from mistakes. Policy and authority are represented, but never learned.
- **Point**: a fixed place in a loop where memory and knowledge's answer is awaited. A point is named by the stage it comes before: "the package before deciding".
- **Package**: what memory and knowledge hands a part: knowledge to use, or an explicit empty answer.
- **Fixed part**: memory and knowledge's fixed code. It fetches by exact keys only. There is one for routing and one for the worker.
- **AI part**: an AI inside memory and knowledge. It decides what to look for, and how to arrange what comes back. It never decides what a step does.
- **Retrieval capability**: the part of memory and knowledge that finds things (see part C2).
- **Claim**: one statement from one source at one time, with its type. [Decided] Claims are typed. A **typed field** is a value saved in a named place in a record.
- **Person**: [Working] one record for one human being, kept beside the situations (Level 2 calls it an identity-bearing anchor). Each person has one unique ID. Their WhatsApp number, email addresses and other channel addresses point to that ID.
- **View**: the set of records one person may see. It decides what that person may be told, and which **records** a step working for them may be shown to act on. It does not limit the business's own **knowledge** that helps a step understand (see part E1). (Corrected 29 October 2026: this said every search for a step is limited to the view of the person it works for.)
- **Boundary**: the records one step may be shown to act on, set by fixed code before any search. Routing's boundary is the sender's own records. A worker's boundary is its own situation in full, plus other situations' typed fields under the worker view rule (part E1).
- **Candidate**: a record a step may have to choose between: a situation, an order, a person.
- **Routing**: the conversation manager's fixed code that checks the understanding artifact and then attaches, creates, holds or asks.
- **Turn**: one AI call inside a stage that may take several. Understanding the arrival has at most two: its first pass, and the wider look.
- **Wider look**: understanding's second pass, over a small set of the sender's own situations that memory and knowledge narrowed by what the first pass resolved.
- **Resolve**: to turn a word into a concrete value, citing the item that gave it. "The Diwali sale" resolves to 20 to 24 October 2026; "my parcel" resolves to order 8830.
- **Clear match** (Level 2 calls it a hard signal): a fit code can check: the sender wrote a number only that situation holds; the sender is answering a question that situation asked; or it is the sender's only open situation of the ask's kind holding the values understanding resolved.
- **Twin situation**: a second situation for a problem that already has one.
- **Strategy**: Swaraj's word for how the business wants a kind of work done: its procedure and its skills for that work (part D6).
- **Business knowledge** and **person records**: business knowledge is what the business knows that is no one person's record. That covers its events and periods, its words and their aliases, its products, procedures, skills, rules, preferences, lessons, learned subjects, and incidents at business level. Person records are situations, messages, orders read into situations, and documents: anything tied to one person.
- **Object storage**: cloud file storage where each saved file keeps its versions. Skills live there.
- **MCP server**: a server that offers tools through the Model Context Protocol, a standard way for outside software to offer tools to an AI system.

**Who may see what** [Working, Channels and Permissions] The product writes roles and partner scopes with a narrow default: nobody sees more than the task needs. The business may give people more access, but only from a fixed allowed list, and never more than the law allows (the legal floor). Anything outside the list is refused. A solo owner sees the whole business.

---

## The design on one page

**[Proposed]**

1. **Memory and knowledge runs in parallel with the loops, on its own thread.** It observes every part of every loop. Slow jobs, such as making links and learning, run in the background and never block a loop. [Swaraj, 28 October]
2. **Before each part of a loop runs, the loop waits for memory and knowledge's answer**: knowledge to use, or an explicit empty answer. [Swaraj, 28 October] The one exception: when a decision ends the run, nothing follows, so nothing is awaited.
3. **Memory and knowledge's AI part runs at every point**, to add knowledge, or at least to observe what came before and after, and learn. [Swaraj, 28 October]
4. **Its fixed parts fetch by exact keys only.** One serves routing, one serves the worker.
5. **Finding knowledge follows Tend's retrieval pattern**: a step states what it needs; memory and knowledge's retrieval capability decides how to find it, with exact filters, several kinds of search, rank fusion, reranking, and a fixed governance gate (see part C2).
6. **Memory and knowledge presents; the step decides.**
7. **Memory and knowledge creates and maintains links.** [Swaraj, 28 October]
8. **Skills, product and business alike, live in versioned object storage.** Businesses may write skills and connect MCP servers; memory and knowledge gives each part the right subset of tools. [Swaraj, 28 October]
9. **The worker decides on the newest version before every action**, and checks again just before any action that cannot be undone.
10. **Understanding comes first.** Understanding the arrival works out what it means, with memory and knowledge's package, and where each ask fits; routing is code that carries out its understanding artifact. The worker understands new content, when there is something to place, before gathering and deciding. [Swaraj, 29 October] [Level 2, understanding the situation; Product Vision] The loops themselves: [the product loop](../the_product_loop/how_does_the_product_loop_work.md).
11. **Using is not showing.** Memory and knowledge uses the whole business's knowledge to help any step understand. It shows a step, as records to act on, only those inside the step's boundary. It marks every item with who may be told it. [Swaraj, 27 October] [Level 2, authority and ownership]

---

## Part A. How memory and knowledge works with the loops

### A1. Two threads, working in tandem

**The problem.** Swaraj, 28 October: "What is the signal it is getting? What is the parameter it is observing… What is the event like? How is the event structure? Is it even possible in software?" Earlier in October he had said that memory and knowledge is not a tool the loops call; "it's a part of the harness itself that runs parallel to the loop".

**The design.** [Swaraj, 28 October] "We want the memory and knowledge layer and the loops to be slightly loosely coupled so that the execution is fast. It should be in two different threads that both of these are running in parallel. So once something is on, once it observes, it will shoot its lagging job working. And before running the next part of the loop… it will wait for the memory and knowledge layer's response, whether it says this is some knowledge you should have, or whether it says none, or an empty event."

In concepts:

- **What memory and knowledge observes.** At each point, the harness hands memory and knowledge what it already holds: who the arrival is from, which situation and version, and the written reasoning or decision the AI has just produced. There is no signal to detect. The harness holds this data at that moment, so passing it on is an ordinary hand-over.
- **What runs at once.** The fixed part's lookups and the AI part's work for the next part of the loop.
- **What runs behind.** Lagging jobs: making links, updating indexes, learning. They never block the loop.
- **What the loop waits for.** The package for the next part: knowledge, or an explicit empty answer. The loop does not run the next part without it.
- **Asking still works.** [Swaraj] The loops "can itself choose to use a tool to interact with the memory and knowledge layer". A step may write a question for memory and knowledge in its written reasoning. The answer comes in the package before the next part.

**Why it is possible in software.** The loop already stops between its parts: it waits for the AI, checks what the AI wrote, waits for the tool layer. Waiting for memory and knowledge's package is one more wait of the same kind. [Level 3] How the two threads are built, and how long a loop may wait, is decided at the technology stage.

### A2. The points

**[Proposed]** [Swaraj, 28 October] "When you say after a component, it is basically before a component."

A point comes before each stage that reasons. (Changed later on 29 October 2026: the points are named by the stage they precede, in [the product loop](../the_product_loop/how_does_the_product_loop_work.md).)

| The package before… | Loop | Runs |
|---|---|---|
| **understanding the arrival** | arrival loop | for every arrival with words |
| **the wider look** | arrival loop | when understanding's first pass needs it, and memory and knowledge's narrowed set is not empty |
| **understanding the situation** | situation loop | when the version holds something not yet placed in the full record |
| **gathering** | situation loop | when an unknown that matters is open, or deciding sent gathering back for a named need |
| **deciding** | situation loop | in every round that reaches deciding |
| **writing** | message loop | for every message |

The AI part runs at every point. When a decision ends the run, there is no next stage and no point.

**Stages that are fixed code are observed, not served**: intake, routing, the reply and update decisions, weighing evidence, acting, the send check. Memory and knowledge watches them on its own thread, and learns from them; a package nothing can use would be, in Swaraj's words about a loop that has ended, "a wasteful run". **When a stage is passed and the version did not change**, its package carries to the next stage.

The old codes, for reading older pages: R1 is now the package before understanding the arrival; R2, the package before the wider look; R3 is removed (routing is code); W0, the package before understanding the situation; W1, before gathering; W2 is removed (acting is code); W3, before deciding; C1, before writing.

[Swaraj, 27 October] Memory and knowledge acts "even before the first component of that situation worker wakes up". On a new situation, the understanding artifact saved in its first version is the worker's first understanding, and the package before gathering comes before the worker's first gathering.

[Swaraj, 29 October] "The first thing should have been understanding…" The packages before understanding the arrival and understanding the situation serve understanding. Gathering, deciding and writing come after it.

### A3. What a package contains

**[Proposed]** Field names are Level 3.

- **The stance**: propose (it has items) or neutral (nothing to add).
- **The items.** For each:
  - what it is: a **candidate** (a situation, an order, a person) or **context** (a lesson, a tool's form, a skill, a business event, a term's meaning, advice). Fixed code sets this from the kind of record;
  - its source and time;
  - its standing, copied from the record: established, someone's claim, two claims in conflict, a guess, advice, the business's instruction, or past;
  - **needed** (from the fixed part; the step must not run without it) or **help** (from the AI part);
  - who may be told it (a step may still use it to understand; part E1);
  - a flag if it holds text written outside the business. Such text is quoted, never an instruction;
  - for items the AI part chose, the record and field that support it.
- For candidates: how many matched in all, and how many are shown.
- What was looked for and not found.

**Memory and knowledge presents; the step decides.** When a step must choose between candidates, every candidate the retrieval returned is presented, with what tells them apart. Memory and knowledge may give advice, such as "this subject is unknown in this business". It never chooses between candidates, chooses the next action, or says a claim is true.

### A4. What written reasoning must contain

**[Proposed]** Besides its own content, each written reasoning or decision has fixed sections that code can check:

- **Considering**: IDs of the situations, orders, people or tools in mind; each must have been presented in this run.
- **Still need to know.**
- **Questions for memory and knowledge.** May be empty.
- **References**: numbers and phrases the reasoning relies on, each quoted exactly from the input.

**The understanding artifact** (understanding the arrival; its full list of sections is in [the product loop](../the_product_loop/how_does_the_product_loop_work.md), part C2) has these sections [Level 2, understanding the situation: the ambiguity page's "What happens when a message arrives"; the 4 September note on MEANING]:

1. **Asks**: what the sender wants, each with the exact words, and whether each is **about the business**. One problem or several.
2. **Refers to**: each thing the arrival refers to (an order, an item, an event, a person, earlier work). For each:
   - the exact words;
   - what it resolves to, citing the presented item that resolved it (for example, "the Diwali sale" resolves to 20 to 24 October 2026, from the business event kept by the owner's word);
   - whatever is still unresolved, kept as a short list of possible values, at the smallest point that is unclear (Level 2's ambiguity page; for example, "the order: one placed 20–24 October 2026, or one placed 2–6 November 2025").
3. **Time**: the arrival's own time, and each time word ("yesterday", "last time", "Friday") turned into a date or a range, in the business's time zone, or kept as a small set.
4. **Claims**: what the sender states. These stay the sender's claims.
5. **Unknown**: what is not known yet.
6. **Earlier work**: whether the arrival refers explicitly to an earlier piece of work (a past situation), yes or no, with the exact words. Referring to a past purchase is not referring to earlier work.
7. **Kind and purpose**, when it is new work.
8. **Answered by**: for each business ask, the item Tend already holds that answers it (a current claim in the sender's own situation, or a fact the business configured), if one does.
9. **Fits**: for each business ask, a presented open situation, a new situation of a named kind, "needs the wider look", or "cannot tell between" named situations.

A greeting, small talk, a general question or a sum is not about the business; such an arrival ends at understanding, with a reply and no situation (the product loop, parts C2 and C4).

**The wider look** (understanding's second pass, only when its first pass needs it) chooses, among the small set memory and knowledge narrowed, the situation each ask belongs to, or none, with the reason.

**The worker's understanding** (understanding the situation) says, against the full record:
- what the new content adds;
- which asks it answers;
- what is now known, unknown, or in conflict;
- whether it shows that routing was wrong.

Code checks that each section is there, that every ID was presented, that every quote is in the input, and that every resolution cites an item presented in this run. [Swaraj, 27 October] These are the "JSON structures… which we can basically check the shape of, check the verification of, check the dependencies". The templates for these sections are step instructions: the product team writes them, and memory and knowledge keeps and owns them (part D6).

---

## Part B. Inside memory and knowledge

### B1. The two fixed parts

[Swaraj, 28 October] "The fixed code of memory and knowledge layer that works with conversation manager will not work with situation worker. Both of them will have different fixed code components, and which will do very limiting jobs. Rest has to be done with the AI part."

**[Proposed] The arrival loop's fixed part**, before understanding the arrival and before the wider look:

| Looks up | At | By |
|---|---|---|
| the sender's open situations, as summaries built only from typed fields (kind, status, last movement, numbers and dates, what each waits for, and the questions each has asked this person) | understanding | person ID; status |
| the sender's recent messages, both ways | understanding | person ID |
| situations carrying a number found in the arrival in the business's configured number form, if they are the sender's own | understanding | the number |
| meanings of the business's listed words found in the arrival | understanding | exact word or listed spelling |
| **business events and other named things (places, products) whose name or alias appears in the arrival**, with their dates, sources and who may be told them | understanding | exact name or alias |
| **facts the business configured** that the arrival's words point to (its hours, its return window, its stores), read from the configuration's own store | understanding | exact name or alias |
| **earlier understanding artifacts of this sender's arrivals**, and what memory and knowledge presented to this sender's recent arrivals | understanding | person ID |
| the present time, in the business's time zone, and the arrival's own time | understanding | the clock; the arrival |
| **the sender's situations that hold a value understanding resolved** (an ID it names; an order dated in a range it resolved; its kind), open and finished (agreed 3 October 2026), by those values first and by description only inside them, with the total | wider look | the resolved values; then description |

Every row is an exact match on a stored value. Matching a stored name or alias against the arrival's words is ordinary code. Telling which meaning applies is not, and is left to the AI part and to understanding.

**[Proposed] The situation loop's fixed part**, before understanding the situation, gathering and deciding:

| Looks up | By |
|---|---|
| the work as first asked: the arrival or instruction that started the situation, word for word, with its understanding artifact | situation ID |
| the new content since the last understanding, with each arrival's understanding artifact (before understanding the situation) | situation ID |
| business events and named things whose name or alias appears in the new content (before understanding the situation) | exact name or alias |
| what memory and knowledge presented earlier in this situation, and when | situation ID |
| the newest version; the plan; every result since the plan, with its source; each claim's state | situation ID |
| every arrival since the last decision, word for word, with meanings of listed words in it | situation ID |
| the procedure pinned to this situation, at its pinned version | kind; version |
| skills and tools filed under that procedure or kind, at their current versions | procedure; kind |
| forms of tools named in the plan or decision, and lessons filed under them | tool ID |
| this situation's links | situation ID |
| other situations sharing a number in a typed field with this one, and what they wait for, as the worker view rule allows (see part E1) | the number |
| the parties' person anchors | the situation's parties |
| if the wake was a platform rule change: that channel's new rule | channel |
| the present time | the clock |

**The communication layer's lookup**, before writing: the recipient's preferences; the business's listed words; the channel's conventions (its current rules); and lessons filed for communication with this kind of recipient. [Working, Level 2 context assembly: communication uses "business terminology, channel conventions and communication corrections relevant to the current audience".]

Every fixed lookup is exact. None judges meaning. A test of a fixed part is exact: given an input, it returns exactly the matching rows.

### B2. The AI part

**[Proposed]** At every point:

1. **It reads** what the harness handed over, and the fixed part's items.
2. **It revisits its own work.** It reads what memory and knowledge presented earlier in this situation (or, before understanding an arrival, to this sender's recent arrivals), and what has happened since. If earlier advice was contradicted by a source, or an item has gone stale, the package says so plainly, and a note goes to the learner (a background part; Part G). Example: "my advice before gathering, 'the 2026 sale', is contradicted by the order system's claim 'placed 4 November 2025'". [Swaraj, 27 October] "The memory has to revisit what it has done till now. It has to look itself, the work it has done, and audit, like the audit you just did."
3. **It works out what is needed**: what the arrival's or the work's words mean in this business (events, words, aliases, time words), using the whole business's knowledge; what the step's reasoning implies; which skills and tools may help. The first time a term is met, it searches the business's own records across the whole business for its meaning: the owner's and employees' situations, configuration, and business systems' records already read. A customer's words stay that customer's claim. [Swaraj, 27 October: "it should search the whole business land, not just the particular… graph related to that person itself."]
4. **It asks the retrieval capability** for what is needed (see part C2).
5. **It writes the package**: context items it chose, with why; candidates complete, with what tells them apart; advice, marked as advice; corrections of its earlier advice; or an explicit empty answer.
6. **Fixed code checks the package.** Every item cites the record behind it. Every item came from this point's retrieval or the fixed part. Every record shown as a candidate is inside the step's boundary. Every item says who may be told it.
7. **It notes what to learn**, for the background jobs.

### B3. What memory and knowledge keeps

**[Fact of Tend]** Where things live (from the agent harness study, Part 13, the data architecture):

- Learned knowledge: in each business's own database, as typed, scoped, versioned knowledge items with their sources and status.
- A meaning index: holds only references and number-vectors; the record itself stays the source of truth.
- Situations and their versions, conversations and messages: in each business's database; large message content and traces in object storage.

**[Swaraj, 28 October] Skills** live in object storage, versioned, for product skills and business skills alike. They do not ship with the code, "because they are also evolving all the time, and we don't want mismatch between different durable object and workers with the version of code they are running."

**[Proposed] How a loop uses a versioned skill.** A run reads each skill at its current version when the skill is first presented in that run, and records the version in the run's trace. A business's procedure for a kind of situation is pinned to each situation at the version current when the situation got its kind [Working, Growth and Evolution]; the situation keeps that version unless the owner deliberately moves it. A product skill that changes mid-run is not reloaded until the next run.

**[Proposed] Links** are memory and knowledge's own records (see part D2).

**[Decided] Graph data, not graph structure.** All of these are records that point to each other by ID.

### B4. Writing never slows the loop

[Swaraj] "Memory write part should be in a different process/thread so the main loop is fast and quick and the read is still updated and the latest."

**[Proposed]**

- Inside the loop, memory and knowledge writes nothing the loop waits for. The typed fields that routing and the worker look up are written by the situation's own save.
- [Decided] A cache may make reads faster, but never guards a decision. Anything cached is checked against the newest version before it is presented.
- Link records, indexes, knowledge items and lessons are written by the background parts (see Part G).

---

## Part C. Finding knowledge

### C1. Tend's retrieval pattern

[Swaraj, 28 October] Retrieval "is a combination of all techniques known to us, that basically the job of which is to remove ambiguity out of the system and give us the proper relevant answers at that particular time across all relevant dimensions."

**[Fact of Tend]** Swaraj's research in two earlier projects set this pattern: Creator-joy, whose retrieval research studied how to search a creator's content, and the J&F assessment, whose system approach describes how an agent gets governed evidence:

- **Retrieval is not semantic search.** "A grep search is a RAG system. A SQL query is a RAG system." (RAG means search first, then give the results to an AI. A grep is an exact text search. A SQL query is a question to a database.)
- **The step says what; the retrieval capability decides how.** "The main agent says *what* evidence it needs… It does not choose grep vs BM25 [a keyword ranking method] vs vectors [lists of numbers that stand for meaning]. A retrieval capability inside the tool decides *how* to search and can iterate until it has governed evidence."
- **Layers:** exact metadata filters first; several searches in parallel; fusion by rank; removing near-duplicates; reranking; neighbouring context.
- **Governance is fixed code, last.** Precedence, status, scope and supersession are checked by code, never by the model's memory.
- **Evidence is separate from the search aids.** Embeddings and keyword indexes are keys for finding; the record is the value that is cited, with its source.
- **Evaluation decides** which methods a business's data needs.

### C2. Memory and knowledge's retrieval capability

**[Proposed]** The same pattern, applied to memory and knowledge's stores.

1. **The need.** The AI part states what is needed, in parts:
   - whose records;
   - what kind of thing (a situation, an order already read into a situation, a lesson, a skill, a tool, a business event, a document);
   - **the values the understanding artifact or the step's understanding resolved**: IDs, date ranges, kinds, item details;
   - describing words, only for what the exact values do not pin down;
   - state clues ("hasn't come" means not delivered).

   [Working, Level 2 retrieval] Retrieval "should begin with a structured context need", including "entities… and time requirements". [Swaraj, 29 October] "We would just know the dates of the sales and we could just make a filter about that."
2. **Route the need.** Like Creator-joy's query paths:
   - an exact identifier (an order number, a tracking number) goes to exact lookup;
   - a count or a list ("how many open refunds") goes to a structured query;
   - a phrase that must appear ("dispatch ready") goes to keyword search;
   - a description ("the white linen shirt", "customers describing a flood") goes to the full hybrid path;
   - a need across several people or situations is split into one search each, so no one dominates the results.
3. **Filter first, in fixed code.**
   - This business only.
   - For **records**: only those inside the step's boundary (part E1).
   - For **business knowledge**: the business's own records, across the whole business.
   - The kind of thing; status; validity dates; for business procedures, the pinned version.
   - Then the resolved values from the need: the person, IDs, date ranges, kinds. These are exact filters.

   Nothing outside the filter is ever searched. When the resolved values leave few records, step 4 may need no meaning search at all.
4. **Search in parallel**, inside what is left:
   - exact lookups on typed fields;
   - keyword search;
   - meaning search, in separate spaces where the content differs (situation summaries; knowledge items; document text);
   - following links and shared numbers.
5. **Fuse by rank.** Each search contributes its ordering; the orderings are combined by position, never by comparing raw scores.
6. **Remove near-duplicates.**
7. **Rerank** what is left against the need.
8. **The governance gate, in fixed code.** Drop what is superseded, stale, retired, outside its validity, outside the step's boundary, or marked never to be used as guidance. Keep conflicts visible as conflicts.
9. **Add neighbouring context** where it matters: the situation version around a matched claim; the section around a matched document passage.
10. **Inspect, and search again if needed.** The AI part reads what came back and may refine the need, up to a set number of rounds.
11. **Return evidence**, each item with its source, never a generated answer.

**Understanding looks at a person's past only through what it resolved.** (Changed later on 29 October 2026: this search is now understanding's wider look, not routing's; routing is code.)
- [Decided, 3 October 2026; the agreed picture in `architecture/how_tend_finds_the_right_situation.md`] When a returning customer refers to a past purchase ("the jacket from last time has a hole"), routing is given "a small set of his own finished situations that could be that purchase", as short summaries: never anyone else's, and never a search of the business. That picture rejected loading none: "It is safe, and it is wrong for this product, because it makes him describe the purchase from scratch."
- [Swaraj, 28 October] "There should be some retrieval here at this point." [Swaraj, 29 October] With understanding first, "the retrieval would have been much simpler this time. We would just know the dates of the sales and we could just make a filter about that."
- [Working, Level 2 understanding the situation] Finished situations count when the message explicitly references one. [Working, Level 2 previous conversations] "Previous conversations should not be retrieved just because their words look similar." [Fact of Tend, harness 11.2.2] Candidates come from structured scope, "never by similarity search across the population".

So, in the wider look:
- The sender's open situations are candidates, filtered by what understanding resolved.
- When the understanding artifact says the arrival refers to a past purchase or to earlier work, a small set of the sender's own finished situations is looked at too. Exact values come first: an order number; a date range, such as the sale's dates; a kind; "last time" read as the most recent purchases first. Description ("a white linen shirt") is matched only inside what those values leave. The total is shown.
- A finished situation holding an object understanding resolved is Level 2's reopen case: "Same delivery still missing after marked resolved → Reopen".
- Never anyone else's situations; never a search across the business. An empty or unclear result means ask, not a wider search.

The full hybrid path of steps 4 to 10 serves the worker and the AI part's knowledge searches. For the wider look it runs only inside the small set that the exact values leave.

(Corrected twice on 29 October 2026. First: the 28 October version searched a sender's finished situations on the message's raw words, such as "Diwali" and "order", before the message was understood. Then: a first correction looked at finished situations only on an explicit reference to earlier work. That would have overturned the 3 October agreed rule, and was withdrawn the same day.)

**Numbers in retrieval.** [Swaraj] "I do not think thresholds and numbers work well enough in production." [Working, Level 2 memory and knowledge folder] "Semantic similarity generates candidates. It does not directly establish identity, supersession or truth." In this pattern, ranks only order candidates. No threshold accepts or rejects anything. Identity, permission, validity and truth are decided by fixed code or by a person.

**What memory and knowledge does not hold.** [Decided] Tend keeps no standing copy of a business's orders. An order no situation has read is not in memory and knowledge's stores. Then memory and knowledge presents the tool that reads the person's orders, and any date range it found; the worker reads them; what it read is saved in the situation, and can be searched from then on.

[Level 3] Which search methods, which models, which fusion settings and which reranker: chosen by evaluation on each kind of store, as in J&F.

---

## Part D. Kinds of knowledge

### D1. People

**[Working, Journey and Lifecycle; Authority and Ownership]**

- A person is an identity-bearing anchor beside the situations. Their journey is derived from their situations, never stored as a separate record.
- [Swaraj] "Some sort of a unique ID, not a WhatsApp number." The person's channels point to their ID.
- Every new contact is unknown first. Identity is deduced or asked as evidence gathers.
- Who someone is, for authority, is proved by the identity provider. What they may do comes from the business's configuration.
- [Decided] A name or number in a message is not proof. Nothing about a person is revealed to a sender until the sender is verified as that person.
- [Working] No AI decides that two records are one person. It may suggest it; fixed rules or a person decide.

### D2. Links between situations

**[Swaraj, 28 October]** Memory and knowledge creates and maintains links, not the worker, "because it is its responsibility to create and maintain knowledge". [Change] This replaces the decision of 9 October 2026 that the worker accepts or denies each link.

**[Working, Understanding the Situation]** What a link is: its own record, stating the two situations, why they are linked (same order, same incident, employee created, found while gathering), its type, and when. A link never copies one situation into another. When Tend is unsure whether two situations are related, there is no link until a signal appears.

**[Proposed]**

- **A shared number or shared incident code** in typed fields of both situations is a signal. Memory and knowledge creates the link, in its background work. The number must come from a business system's record, or from a person's confirmed answer.
- **A shared meaning only** ("these customers all describe the same flood") is not yet a signal. [Working, Level 2 memory and knowledge folder] The AI may propose the relationship; structured rules reconcile it; uncertain stays unresolved. It becomes a link when a signal appears: a shared number, an employee's word, or a finding while gathering.
- **What a link means for a situation** is that situation's worker's judgment.
- **Incident links** group situations sharing an incident code at the same place within a configured window. [Working] Fifty customers hit by a flood each keep their own situation, grouped under one incident.
- **Removing a link**: memory and knowledge removes a link whose signal turns out wrong; an employee who may see both situations may remove any link. Removals are recorded.

### D3. How a change reaches another situation

**[Decided]** Only intake saves arrivals. Only a situation's own worker ends its waits. Links share context; they do not carry changes (Understanding the Situation: a link is a pointer for coordination, and never copies one situation into another). When one event touches several situations, it is saved once, and one version is written into each, carrying its reference.

**[Proposed]** Three paths, and only these:

1. **One event, several situations.** The decided path above. Example: the carrier reports "hold H17 lifted"; the event touches every situation in that incident link; each gets a version, and each wakes.
2. **One situation holds what another waits for.** Before deciding, the worker sees (through the worker view rule) other situations waiting for something about a shared number. Its decision may be **send to another situation**: worker code hands the claim to intake, as an arrival addressed to that situation, with its source, and a key so a repeat is dropped. The receiving situation's worker reads it and decides whether its wait is answered. Example: Arjun's corrected pin code reaches the warehouse team's situation. A count of sends between any two situations within a configured window (the **send budget**) stops two workers from sending to each other forever.
3. **A person's situation and its central situation** (see part D4): every update goes up automatically.

[Change] Path 2 is a new kind of arrival: one that comes from another situation.

### D4. Outreach: one central situation, one situation per person

**[Swaraj, 28 October]** "There are one situation per person, and there is one central situation, not a board, one central situation that is linked to all of them, and that so that it tracks the progress of it all." "Every single update will go to the situation model, the central situation model, and there the conversation manager, based on that situation model, will decide whether to send that update across or not." "Only significant things will be communicated."

**[Proposed]**

- An owner's instruction to contact many people creates one **central situation** for the owner's task, and one situation per person [Decided: each person gets their own situation], each linked to the central one.
- Every new version of a person's situation is sent to the central situation by fixed code, automatically, with no AI deciding it: worker code hands a summary of the version, made of typed fields only, to intake, as an arrival addressed to the central situation. The send budget does not apply between a central situation and its own people. Nothing is sent back down automatically; the central situation's worker sends to a person's situation only by its own decision (path 2).
- The central situation's worker keeps the overall progress: who replied, who wants a meeting, who cannot be reached.
- The conversation manager's decision about telling the owner follows the decided rules for what reaches an owner: [Working, Business View] decisions only the owner can make, owner-risking deadlines or notices, and escalations that drifted past the delegated people. Material changes only.

[Change] This replaces the Journey page's "one list with the current state of all thirty situations", and the "board" in the current architecture, which Claude introduced in Section 12. The earliest design in the harness study had exactly this: one parent situation linked to thirty child situations.

### D5. Time and the business's events

**[Proposed]**

- The present time, in the business's time zone, is in every package. [Swaraj, 27 October] Memory and knowledge "has to figure out the aspect of time, which year currently it is in."
- A business event ("the Diwali sale") is a learned knowledge item: its name and aliases, its dates, its sources, who may be told it, and its validity. [Working, Trust and Evidence] Which source is trusted for which kind of claim is the business's configuration of source authority. A customer's mention is that customer's claim.
- An event is met **first in the package before understanding the arrival** that mentions it. The fixed part finds kept events by exact name or alias.
- The first time an event is mentioned and nothing is kept, memory and knowledge's AI searches the business's own records across the whole business for it [Swaraj, 27 October: "it should search the whole business land"], such as the owner's own situation where the sale was discussed. It presents the dates with a reference to their source, not the source situation's contents. The background learner then keeps the event.
- Which year: the fixed part returns every event with that name; the AI part says which the work most likely means, and why, as advice. The understanding artifact records the conversation manager's interpretation, with the other year kept as an alternative.
- **The dates may be used, but not always told.** The dates help any step understand and filter, before understanding the arrival, in the wider look and at every worker point, whoever the step works for. Who may be **told** them is set on the event: every item says who may be told it, and the send check stops a message that carries them to anyone else. (Corrected 29 October 2026: this said the dates may narrow only "that worker's own searches", which kept them away from routing.)

### D6. Skills, procedures, rules, preferences, tools

**[Swaraj, 28 October]** "Not everything has a skill." And: the business "can add any skill text. They can add any product [template]… They can connect with any MCP server that they want… And the memory and knowledge layer has to then inject the proper subset of tools at the appropriate junctions of the component of the loop."

| Kind | What it is | Who writes it | Where | How it reaches a step |
|---|---|---|---|---|
| Default behaviour | How Tend's AI behaves everywhere | The product team | The constitution | Always, as standing text |
| Step instruction | What one step must produce: its written sections (part A4) and the shape of its package | The product team; the improvement part may edit it only within the limits Section 6 sets | Object storage, versioned; memory and knowledge's own (its prompt assembly templates) | With every package, for that step. [Fact of Tend, harness 14.1.3] "step instructions are a responsibility of memory and knowledge not ecosystem constitution." |
| Skill | A written method for a kind of work | The product team, or the business | Object storage, versioned | Fixed part: filed under the kind or procedure. AI part: a skill whose stated use fits the work |
| Procedure (workflow) | The business's steps for a kind of situation | Product templates, filled or written by the business | Object storage, versioned | Pinned per situation; presented before gathering and before deciding |
| Rule | A decided business fact or limit | The configurator | Configuration | Enforced by tools and checks; presented if a step needs it |
| Preference | A choice about behaviour ("speak Hindi") | The configurator | Configuration | Presented before writing |
| Tool | One call to an outside system, including MCP tools | The product team, or the business by connecting an MCP server | The business's tool list | Fixed part: tools named in the procedure or filed under the kind. AI part: tool groups whose purpose fits. A step may ask for more |

**[Proposed]** Procedures are kept with skills, in object storage, versioned, because both evolve and both are read by the loops; a procedure's parameters stay in configuration.

[Change] The Growth and Evolution page says a business only activates product templates and fills their parameters, "never a scripting surface", and that tools join from a product-built menu. Under Swaraj's 28 October direction, a business may also write its own skills and connect any MCP server.

**[Proposed] Connecting an MCP server keeps catalogue integrity.** Compliance and Security decided that the tool catalogue is versioned and hashed, and that remote MCP servers cannot register tools at runtime. Both still hold. The configurator connects a server through a fixed configuration tool, never the AI. When it is connected, the server's tool list is captured, versioned and hashed, and becomes part of the business's tool list. If the server later changes its tool list, the change waits until the configurator approves the new version. What the server's tools return is outside text: a claim from that system, never an instruction.

**What stays fixed.** A business-written skill is guidance text. It cannot grant a permission or change a rule. Every tool call, including a call to an MCP tool, passes the tool layer's permission check against the business's grants. A step may use only a tool whose form was presented to it in this run.

**Outside knowledge.** [Swaraj, 28 October] The worker, not memory and knowledge, searches the web, guided by its prompt ("establish subjects and establish facts from claims") and the deep-research skill. For an unknown subject, memory and knowledge reports that the subject is unknown, and presents the skill and the tools. When the worker establishes the meaning, that event reaches memory and knowledge, which keeps it as learned knowledge with its sources; next time, no web search is needed.

### D7. Documents

**[Proposed]** A document that arrives is saved by intake, routed like any arrival, and saved in its situation as a claim from its sender. Its text is indexed with that situation's view. It wakes the situation. It is never an instruction.

### D8. Who establishes which fact

**[Proposed]** [Swaraj, 27 October] "So first establishing the fact has to be there. That's why I was very keen on the level 2 about understanding, establishing the fact… any thing that is being told to us, to the agent at any level, is a claim, is not a fact. We have to establish it… So whatever we get, the conversation manager gets, establishing it is first."

- **The conversation manager** establishes, first, what an arrival means.
  - Its understanding artifact says what is asked, what is referred to, which time is meant, what is only the sender's claim, what is unknown, and where each ask fits.
  - The artifact is an interpretation, never a business fact.
  - Code establishes who sent the arrival (the person ID).
  - Routing, fixed code, carries out where the artifact says each ask fits.
  - Everything the sender states stays the sender's claim.
- **The situation worker** understands what new content changes in its situation. It establishes claims by its evidence rules, and checks at each decision whether the work was really done.
- **Memory and knowledge** establishes nothing. It presents the business's meanings with their sources, and keeps what the worker established.

(Corrected 29 October 2026: this part said the conversation manager establishes only who sent an arrival and which situation it belongs to. That read Swaraj's sentence too narrowly.)

---

## Part E. Scope, safety and cost

### E1. Using knowledge, showing records

**[Proposed]**

[Swaraj, 27 October] "When the message comes, it comes to the conversation manager that is working on one singular interactor at that point of time… It cannot move out of its boundaries to see the whole business thing. So there needs to be some component that can see the whole thing and that can aid him. That is the memory and knowledge layer." [Working, Level 2 authority and ownership] "Permission = who may see or disclose it… Tend may use a confidential source internally while sending only a limited description externally."

- Memory and knowledge reads the whole of one business, and never another business [Decided: each business has its own store].
- **Using business knowledge.** To help any step understand, memory and knowledge may present business knowledge from anywhere in the business: events and their dates, words and aliases, products, procedures, lessons, learned subjects, business-level incidents. Each item says who may be told it.
  - This is Tend's own use. It narrows nothing a person is told.
  - Business knowledge comes from the business's side: the owner, employees, configuration, business systems. A customer's words stay that customer's claim and never become business knowledge.
- **Showing records.** As candidates (records a step may attach to, act on, or compare with), memory and knowledge presents only records inside the step's boundary. Every search for records starts with fixed code applying that boundary, before any search or ranking.
- **The arrival loop's boundary** (understanding the arrival, and so routing) is the sender's own records: their situations, and what has been read into them.
- **Another person's record** is never presented to a step outside its boundary, never used to shape that step's understanding, and never hinted at. When an investor types a customer's order number, it is not used to understand the investor's message, and understanding the investor's message is not told it matched anything.
- **The worker view rule.** A worker sees its own situation in full. It may see another situation's typed fields (kind, status, numbers, what it waits for), never its free text. It sees them in one of two cases:
  - the two situations share a person; or
  - a number in this situation is tied to this situation's own person by a business system's record, or was confirmed by that person, and the other situation holds the same number.
- The communication layer writes only from the claims a decision lists. The send check tests each against the recipient's view.
- A number the boundary removes is never presented, and the step is not told it exists. The 3 October note "a foreign reference was seen and not opened" is removed: Claude recommended it, and Swaraj allowed it on 28 October ("if you think it should be removed, then remove it"). [Change]

(Corrected 29 October 2026. This part was headed "Seeing everything, presenting little", but its rule applied the view of the person a step works for before every search, and said "Routing uses the sender's view". That kept the business's own knowledge, such as the sale's dates, away from the step that had to understand the message, and brought back the 26 October "point 5" Swaraj had rejected.)

### E2. Learning

- [Swaraj] At each point memory and knowledge "either choose to learn something… or choose to propose something or choose to stay neutral". Proposing is the package; learning is a note to the background jobs; neutral is the empty package.
- [Working] The business chooses: learning off, automatic (the default), or each lesson checked by a person. Integrity checks run in every mode. Learning never changes a rule, an authority, a permission or an ownership. Anything learned can be stopped, marked stale, or rolled back.
- [Working] Who may correct, approve or retire learned knowledge: the business, by its configuration and roles.

### E3. Erasure

**[Swaraj, 28 October]** "If the compliance requires it, then sure, we can erase it, but not the AI will erase it."

**[Proposed]**

- Erasure is a tool with a **confirmation** rule. The AI may propose it, inside the tool; the tool runs its pre-configured confirmation flow to the owner or the configurator; only after their yes does it erase.
- [Working, Compliance and Security] Deletion "is recursive across every place the data lives (stores, logs, caches, model traces)". Memory and knowledge's part: the person's anchor and channels; their entries in every index; knowledge items whose only source is them; learning notes; cached context. Traces hold no personal data.
- Outside compliance, nothing is erased: knowledge is retired, superseded or marked stale, never deleted [Working, Level 2 memory and knowledge folder].
- Lessons and business words hold no personal data, by the learning integrity checks, so they need no change. Link records and records of what was presented hold only references.
- [Change] The situation store keeps every version and arrival without rewriting them, by decided rule. The confirmed erasure tool is the one exception: it removes the person's data from situation versions and arrivals too, and records that an erasure happened, without the erased data. This closes the erasure gap the architecture lists as unresolved.

### E4. When memory and knowledge fails

**[Proposed]**

- **No answer at a point.** The loop waits for the package. [Decided, 22 October] A worker step that needs memory and knowledge waits with a due time, then goes to a person. Routing does the same: it waits a set time, then the arrival goes to the person the business named for arrivals Tend could not place.
- **The AI part fails.** The package carries the fixed part's items, and says the AI part did not answer. The step goes on: it loses help, not safety.
- **The AI part fails before understanding an arrival.** The fixed part still gives the open situations, numbers, listed words, events found by exact alias, and the time.
  - The understanding artifact marks any word it cannot resolve as **unknown**.
  - If where an ask fits could differ depending on that unknown meaning, the arrival is held with a held note, and the sender is asked. The meaning is never guessed.
  - If no fit depends on it, routing goes on, and the worker's later packages ask memory and knowledge again.
  - [Working, Level 2 failure] "continue on what is safe, hold what depends on the dead source." [Working, Level 2 ambiguity] When an ambiguity "could change routing… Tend will keep the ambiguity visible."
- **Nothing found.** The package says so. Memory and knowledge never fills a gap.

### E5. Cost

**[Proposed]** The AI part runs before each stage that reasons, by Swaraj's direction; the stages that run follow the message ([the product loop](../the_product_loop/how_does_the_product_loop_work.md), part G). AI calls before the first reply, the stages' first and memory and knowledge's AI part second:

| Arrival | Calls |
|---|---|
| "hi", or a general question | 2 + 2 |
| a thank-you that answers nothing (no reply) | 1 + 1 |
| a question Tend already holds the answer to | 2 + 2 |
| Swaraj's refund question, its payment claim stale | 4 + 4 |
| Arjun's "the one I ordered in the Diwali sale still hasn't come" (the wider look finds nothing, so it needs no second pass) | 4 + 4 |
| a research brief | grows with the work, within the limits below and the progress rule |

(Changed later on 29 October 2026. The design of that morning counted 10 to 23 calls before the first reply for every business message: a reading, candidates, a possible second turn and its check, a plan, and a package before every part, including the parts that are fixed code.)

- Memory and knowledge's AI part makes half the calls before a first reply. Level 3 may run it on a smaller, faster model.
- Retrieval gets cheaper where understanding resolves a value. In Arjun's case, one date filter replaces a hybrid search over 40 finished situations.

[Open] No delay target exists yet. The delay these calls cause is what Level 3 must measure.

**Background:** meaning-index updates per save; the link finder, which compares a new situation only with situations of the same kind from a set recent window, up to a set number; the learner. **Each send to another situation** costs an intake save, a wake and a decision; the send budget caps it. The number lookup before deciding is capped per number.

### E6. What is recorded

Each package is recorded in the run's trace as references only: what was searched (filters, not personal values), the record IDs and versions presented, the skill versions used, and why. The test and simulation environment replays real runs from these references.

---

## Part F. The loops

The loops are described in [how Tend's product loop works](../the_product_loop/how_does_the_product_loop_work.md). (Changed later on 29 October 2026. This part described the situation worker's run and the conversation manager's run on the harness study's first-draft shape: code step, the AI proposes, code checks, act. Swaraj rejected that shape: "the loops do not look natural to me… I am first and foremost a product engineer". The product loop builds them from the product's stages.)

What memory and knowledge does in each loop:

- **The arrival loop** (intake, understanding the arrival, routing):
  - before understanding, its package gives what the arrival's words mean in this business, the sender's open situations with their waits, recent messages, configured facts the words point to, earlier understanding artifacts, and the time;
  - for the wider look, it narrows the sender's own situations by what understanding resolved;
  - it observes intake and routing.
- **The situation loop** (understanding the situation, gathering, weighing evidence, deciding, acting):
  - packages before understanding the situation, gathering and deciding, when each runs;
  - before gathering, it maps each unknown to an item Tend already holds, where one counts as evidence, which lets code pass gathering;
  - it observes weighing and acting.
- **The update loop and the message loop:** a package before writing; it observes the rest.

[Swaraj] "One I just call reasoning and second I call is action." Reasoning is "a multi-step thing". The loop is not a ReAct loop. "The loop decides to loop (code first, LLM second)." In the product loop, the reasoning stages are understanding, gathering's information plan, deciding and writing; the action stages are code.

### F3. Deciding is checking the work

[Swaraj] At the decide step the worker "should look back at the document I shared, the things it has done till now, and look at whether it actually computes." "It's not that at the decide step it is doing both decision and reflection. The process of decision, the way we are deciding, is self reflection itself." "This self-correction by auditing the thing, it can be done very easily. We do not need anything else." "When the decide step has what context to engineer at that point is the key."

**[Proposed]** The package before deciding builds that context: the work as first asked, word for word; the procedure; the plan; every result and its source; each claim's state; new arrivals; other situations' waits that this one might answer. Not the whole conversation. Making the decision is checking the work.

[Working, Level 2 memory and knowledge folder] An AI that only asks itself whether it was wrong is not reliable; mistakes need a signal from outside the AI. This design's reading: Swaraj's own audit worked by reading the sources, which are outside the AI, so his method gives that outside signal. The package before deciding puts the sources in front of the decision; code requires every "answered" to point at one.

---

## Part G. The background parts

**[Proposed]** [Swaraj] Memory and knowledge has "multiple types of loop, multiple types of component that only activate a certain set of components for a certain set of jobs." These are the lagging jobs of A1.

| Part | Kind | Wakes on | Does |
|---|---|---|---|
| Link keeper | fixed code | version notices | creates links from shared numbers and incident codes, once per key (see part D2); keeps a central situation's links (see part D4) |
| Indexer | fixed code, using an AI model for meaning | version notices; documents; new knowledge items | updates the keyword and meaning indexes |
| Link finder | AI proposes, fixed rules reconcile | new situations | compares with a capped set of recent situations of the same kind; proposes relationships based on meaning, kept unresolved until a signal (see part D2) |
| Learner | AI proposes, fixed code reconciles | traces; learning notes; outcomes; subjects the worker established | lessons, business words, business events, learned subjects, under the learning mode and integrity checks |
| Cleaner | fixed code | confirmed erasures; a daily timer | carries out confirmed erasures (see part E3); marks items whose own dates have ended as past |

None writes a situation record, except the cleaner carrying out a confirmed erasure. [Decided] Memory and knowledge "writes no situation record".

---

## Part H. Alternatives, trade-offs, and limits

Added 29 October 2026. The three-level framework asks every Level 2 design to explore alternatives, weigh trade-offs, explain why the others lose, define evaluation criteria, and say when not to use it. Swaraj asked for "at least two credible hybrid protocols, including their latency and degradation behavior" to be compared. The full working is in `memory_and_knowledge_drafts/46_design_thinking.md`.

### H1. Where understanding sits in the conversation manager

| Option | For | Against | Outcome |
|---|---|---|---|
| A. One routing call writes the reading and the choice together | fewest calls | the candidates must be found before the reading exists, so memory and knowledge would settle the meaning itself; the reading can be bent to fit the candidates; Level 2 puts interpretation before routing | rejected |
| **B. The reading first; candidates from it; the choice by code when it can, by a second turn when not** | Level 2's order; the harness's MEANING then VALIDATE; Swaraj's "based on the thought, we can inject knowledge"; retrieval becomes a filter; code decides whenever it can | one more call when the AI must choose | **chosen** |
| C. Memory and knowledge writes the reading | — | it would decide what an arrival means; Swaraj: "whatever we get, the conversation manager gets, establishing it is first" | rejected |
| D. Route on hard signals only; the worker sorts out the rest | — | twin situations; acting before understanding | rejected |

(Changed later on 29 October 2026: in option B the "choice" is now part of understanding the arrival, as its wider look, and routing is fixed code. See [the product loop](../the_product_loop/how_does_the_product_loop_work.md), parts C2, C3 and H.)

### H2. The worker's understanding

| Option | For | Against | Outcome |
|---|---|---|---|
| **A separate stage (understanding the situation), only when there is new content to place** | Swaraj's worker "first… understand"; Level 2 keeps understanding and deciding apart; the strategy follows the understanding | 2 to 3 more calls when it runs | **chosen** |
| Folded into the decision | lean | memory and knowledge cannot act on the understanding before the decision; two jobs blended | rejected |
| The conversation manager's understanding artifact only | leanest | made against summaries; documents and free-text results never read | rejected |

### H3. Using knowledge versus showing records

| Option | For | Against | Outcome |
|---|---|---|---|
| One view filter before every search (the 28 October design) | simple | keeps the business's knowledge from the step that understands; Swaraj's rejected "point 5" (the 26 October proposal's limit of memory to the speaker's own records); Level 2's rule on who may see and disclose information | rejected |
| **Use the business's knowledge everywhere; show records only within the step's boundary; mark who may be told** | Swaraj's "can see the whole thing and… aid him"; Level 2's "use a confidential source internally"; every protection test still passes | the line between business knowledge and a person's record must be kept by the kind of record, in fixed code | **chosen** |
| No limit | — | the law and Level 2's visibility rules | rejected |

### H4. How a loop waits for memory and knowledge (two protocols)

| Protocol | Speed | When things go wrong | Outcome |
|---|---|---|---|
| **P1. Wait for the full package at every point, up to a time limit; then a person** | memory and knowledge's AI part makes half the calls before a first reply (part E5), all on the path to that reply; a small, fast model shortens each | predictable: a slow AI part makes Tend slow, not wrong; no step runs without knowledge it should have had | **chosen**: Swaraj's direction, 28 October |
| P2. Wait for the fixed part only; add the AI part's help if it arrives within a short budget | faster | silent: understanding can run without the business's meaning, the very failure test 1 showed before 29 October | rejected |

### H5. When links are written

The harness study said a link found by the loop is "written synchronously at discovery". This design writes links in the background, by the link keeper. [Swaraj, 28 October] "when the something in the worker is running, it does not block the memory and knowledge layer to make links, etc., etc." Nothing is lost by the delay: the fixed part before deciding finds other situations sharing a number whether or not the link is written yet. [Change]

### H6. Evaluation criteria

The design is working when all of these hold:
- routing errors traced to a misread arrival are rare, and each is diagnosed as "misunderstanding" or "vocabulary";
- the worker's understanding seldom contradicts the understanding artifact. When they often disagree, the package before understanding the arrival probably lacks something;
- most arrivals need no wider look;
- one person never has twin situations for one problem;
- no message carries knowledge its recipient may not be told;
- earlier advice found wrong at a later point is counted, and feeds learning.

### H7. When not to use this design

- **Typed arrivals with an exact reference**: placed by code; no understanding artifact.
- **Not as gathering**: understanding never calls a business system. If a meaning needs one, the worker gathers it.
- **Not as a trust judgment**: the understanding artifact records claims; weighing evidence weighs them.
- **A one-person business with no history**: the artifact is short; do not add steps.

---

## What Level 3 decides

- How the two threads are built, and how long a loop waits at a point.
- The search methods, models, fusion and reranker for each store, by evaluation.
- How skill files are stored and versioned in object storage, and how runs load them.
- The field names of packages, of the understanding artifact, and of reasoning artifacts.
- The final values of the limits below, by measurement.

## Starting values

**[Proposed]** Every limit needs a number for the tests to be checkable. [Decided] These are configuration, with product defaults, measured and changed per business.

| Limit | Starting value |
|---|---|
| Results kept after reranking, per search | 10 |
| Search rounds for the AI part, per point | 2 |
| AI passes of understanding the arrival (the first pass, then the wider look) | 2 |
| AI turns per gathering pass | 3 |
| Information plans written per run | 2 |
| Reads per explore step | 12 |
| Rounds per run | 5 |
| Situations shown per number, before deciding | 20 |
| Sends between one pair of situations | 3 per 24 hours |
| Link finder: recent situations compared | the last 30 days, at most 200 |
| Incident window | 7 days |
| Routing wait for memory and knowledge's package | 10 seconds |
| A tool call with no answer counts as failed after | 60 seconds |
| A held note goes to a person after | 24 hours |
| A worker step waiting for memory and knowledge goes to a person after | 5 minutes |

## Changes this design makes to earlier decisions

1. Links are created and maintained by memory and knowledge, not accepted by the worker (9 October 2026). [Swaraj, 28 October]
2. Outreach has a central situation linked to each person's situation, replacing the list view and the board. [Swaraj, 28 October]
3. A business may write skills and connect any MCP server; skills live in object storage. [Swaraj, 28 October]
4. The 3 October note about a foreign reference is removed. [Claude's recommendation; Swaraj, 28 October: "if you think it should be removed, then remove it".]
5. A new kind of arrival: a claim sent from one situation to another.
6. Memory and knowledge takes part in every part of both loops, replacing "a step asks for what it needs" in the current architecture.
7. A confirmed erasure tool may remove a person's data from situation versions and arrivals, the one exception to never rewriting them. [Swaraj, 28 October: erasure only through a confirmed tool. That it reaches situation versions comes from Compliance and Security: deletion reaches every place the data lives.]

Added 29 October 2026, from Swaraj's words of 27 and 29 October and the Level 2 answers they point to:

8. **The conversation manager understands each arrival first, and saves its reading** (later the same day renamed the understanding artifact; see item 15). This changes the architecture's conversation manager, which "only records and routes, and leaves the reasoning to the worker" and "draws no conclusion". It now writes an interpretation of each arrival. It still never writes what Tend concludes: facts, the next step, waits, outcomes. [Level 2: the 4 September note on MEANING; the ambiguity page's order] [Swaraj, 27 and 29 October]
9. **The worker understands new content** before the business's strategy is presented and before it decides. [Swaraj, Cursor transcript] [Level 2: gathering and understanding]
10. **Using knowledge is separate from showing records.** This replaces the 28 October rule "every search for a step is limited to the view of the person it works for" and "Routing uses the sender's view". [Swaraj, 27 October] [Level 2: authority and ownership]
11. **Routing looks at the sender's past only through the reading.** The 3 October agreed rule stands: when a message refers to a past purchase, routing gets a small set of the sender's own finished situations. That set is now found from the reading's exact values (dates, numbers, kinds), with description matched only inside them. The 28 October search on the message's raw words is withdrawn.
12. **An arrival that is not work creates no situation.** [Level 2: relevance; the harness's MEANING outcome "not work → no situation"]
13. **The routing queue is per person.** The Level 2 design already said "per sender"; when the design was carried into Sections 6 to 12 on 28 October, they used the channel address. [Swaraj, 28 October]
14. **Links are written in the background**, not at discovery as the harness study said (part H5). [Swaraj, 28 October]

Added later on 29 October 2026, from Swaraj's words that day ("the loops do not look natural to me… I am first and foremost a product engineer"; "Routing, I don't think would be much of a LLM thing"):

15. **The loops are the product loop**, described in [its own page](../the_product_loop/how_does_the_product_loop_work.md). The harness study's first-draft loops are replaced.
16. **Deciding where an arrival fits is part of understanding**; the reading is now the understanding artifact; routing is fixed code. The package before the routing check and the package before acting are removed, because both stages are code.
17. **Points are named by the stage they precede**; stages that are code are observed, not served; a passed stage's package carries to the next stage.
18. **A message that is not about the business starts no situation, gets a reply, and is not learned from.** [Swaraj, 29 October: "This message will only be a noise in our knowledge framework."]
19. **An arrival Tend can already answer is answered at once**, from a current claim in the sender's own situation or a fact the business configured. [Swaraj, 5 September, restored, for a situation's own claims; answering from a configured fact is this design's call]
