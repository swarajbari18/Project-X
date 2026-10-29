# Level 2 – System Design: Memory and Knowledge

Draft 5, 28 October 2026. Not yet reviewed by Swaraj.

## How to read this document

**Tend** is the product: an AI that works for one business, on WhatsApp, email and other channels, and keeps that business's operational problems moving until each is resolved or handed to a person.

The project designs Tend in three levels. **Level 1** says what the problem is. **Level 2** decides how it is solved, in concepts, without technology. **Level 3** chooses technology.

This document is Level 2 for **memory and knowledge**: in Swaraj's words, "an agency within the agency". Its job, in his words: "create a subset of the vast knowledge sea and create a subject and present that in that context. Its main purpose is context engineering, not decision making." Its Level 1 is `10_level1_memory_agency.md`. Its tests are `30_level2_tests.md`.

**What changed in draft 5.** Swaraj answered the open questions on 28 October 2026, and the Level 2 folder answered the rest. Those answers are applied here and marked **[Swaraj, 28 October]**. Nothing is left for him to decide except what Level 3 decides anyway.

**Labels**, used before a statement:

- **[Swaraj]** or **[Swaraj, 28 October]**: Swaraj's direction. It governs everything else.
- **[Decided]**: decided before this document and accepted by Swaraj.
- **[Working]**: a working decision in Level 2, not yet reviewed by Swaraj.
- **[Fact of Tend]**: how the rest of Tend is already designed.
- **[Proposed]**: new in this document.
- **[Change]**: something here that changes an earlier decision. It names what it changes.
- **[Level 3]**: left to the technology stage.

---

## Words used

**Tend's parts**

- **Situation**: one operational problem, with its own saved record. Each change saves a new **version**. A situation has a **kind**, such as "late delivery".
- **Arrival**: anything new that reaches Tend: a message, a reply, an answer from a business system, a document, an approver's answer, or a change sent from another situation.
- **Intake**: the conversation manager's fixed code that saves each arrival. [Decided] Only intake saves arrivals.
- **Conversation manager**: the part that takes each arrival and decides which situation it belongs to. That decision is **routing**.
- **Situation worker**: the part that works one situation. A **run** is one time it works on a situation, from waking to resting. A run has **rounds**: each round is one decision, and the action it chooses. [Decided] One run per situation at a time.
- **Loop**: the repeated cycle a part works in. Its **parts** are reasoning, acting and deciding.
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
- **Point**: a fixed place in a loop where memory and knowledge's answer is awaited.
- **Package**: what memory and knowledge hands a part: knowledge to use, or an explicit empty answer.
- **Fixed part**: memory and knowledge's fixed code. It fetches by exact keys only. There is one for routing and one for the worker.
- **AI part**: an AI inside memory and knowledge. It decides what to look for, and how to arrange what comes back. It never decides what a step does.
- **Retrieval capability**: the part of memory and knowledge that finds things (C2).
- **Claim**: one statement from one source at one time, with its type. [Decided] Claims are typed. A **typed field** is a value saved in a named place in a record.
- **Person**: [Working] an identity-bearing anchor beside the situations. Each person has an ID; their channels point to it.

**Who may see what** [Working, Channels and Permissions] The product writes roles and partner scopes with a narrow default: nobody sees more than the task needs. The business may widen within a fixed allowed list, never past the legal floor. Anything outside the list is refused. A solo owner sees the whole business.

---

## The design on one page

**[Proposed]**

1. **Memory and knowledge runs in parallel with the loops, on its own thread.** It observes every part of every loop. Slow jobs, such as making links and learning, run in the background and never block a loop. [Swaraj, 28 October]
2. **Before each part of a loop runs, the loop waits for memory and knowledge's answer**: knowledge to use, or an explicit empty answer. [Swaraj, 28 October] The one exception: when a decision ends the run, nothing follows, so nothing is awaited.
3. **Memory and knowledge's AI part runs at every point**, to add knowledge, or at least to observe what came before and after, and learn. [Swaraj, 28 October]
4. **Its fixed parts fetch by exact keys only.** One serves routing, one serves the worker.
5. **Finding knowledge follows Tend's retrieval pattern**: a step states what it needs; memory and knowledge's retrieval capability decides how to find it, with exact filters, several kinds of search, rank fusion, reranking, and a fixed governance gate (C2).
6. **Memory and knowledge presents; the step decides.**
7. **Memory and knowledge creates and maintains links.** [Swaraj, 28 October]
8. **Skills, product and business alike, live in versioned object storage.** Businesses may write skills and connect MCP servers; memory and knowledge gives each part the right subset of tools. [Swaraj, 28 October]
9. **The worker decides on the newest version before every action**, and checks again just before any action that cannot be undone.

---

## Part A. How memory and knowledge works with the loops

### A1. Two threads, working in tandem

**The problem.** Swaraj, 28 October: "What is the signal it is getting? What is the parameter it is observing… What is the event like? How is the event structure? Is it even possible in software?" And: memory and knowledge is "not a tool"; it is "a part of the harness itself that runs parallel to the loop".

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

| Point | In | Before which part |
|---|---|---|
| R1 | conversation manager | routing reasoning |
| R2 | conversation manager | the routing check and its action, after routing reasoning |
| W1 | situation worker | planning (on a situation's first round, and when a decision asks for a new plan) |
| W2 | situation worker | acting, after a plan or a decision |
| W3 | situation worker | every decision |
| C1 | communication layer | writing a message |

The AI part runs at every point. When a decision ends the run, there is no next part and no point.

[Swaraj, 27 October] Memory and knowledge acts "even before the first component of that situation worker wakes up": W1 comes before the worker's first reasoning.

### A3. What a package contains

**[Proposed]** Field names are Level 3.

- **The stance**: propose (it has items) or neutral (nothing to add).
- **The items.** For each:
  - what it is: a **candidate** (a situation, an order, a person) or **context** (a lesson, a tool's form, a skill, a business event, a term's meaning, advice). Fixed code sets this from the kind of record;
  - its source and time;
  - its standing, copied from the record: established, someone's claim, two claims in conflict, a guess, advice, the business's instruction, or past;
  - **needed** (from the fixed part; the step must not run without it) or **help** (from the AI part);
  - who may see it;
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
- Routing only: **refers to something that already happened**, yes or no, with the exact words; and **possible situations**: none, one, or several.

Code checks that each section is there, that every ID was presented, and that every quote is in the input. [Swaraj, 27 October] These are the "JSON structures… which we can basically check the shape of, check the verification of, check the dependencies".

---

## Part B. Inside memory and knowledge

### B1. The two fixed parts

[Swaraj, 28 October] "The fixed code of memory and knowledge layer that works with conversation manager will not work with situation worker. Both of them will have different fixed code components, and which will do very limiting jobs. Rest has to be done with the AI part."

**[Proposed] The routing fixed part**, at R1 and R2:

| Looks up | By |
|---|---|
| the sender's open situations, as summaries built only from typed fields (kind, status, last movement, numbers, what each waits for) | person ID; status |
| situations carrying a number found in the arrival in the business's configured number form, if the sender may see them | the number |
| meanings of the business's listed words found in the arrival | exact word or listed spelling |
| situations whose typed number equals a number in the routing reasoning's references (R2), if the sender may see them | the number |
| the present time, in the business's time zone | the clock |

**[Proposed] The worker fixed part**, at W1, W2 and W3:

| Looks up | By |
|---|---|
| the work as first asked: the arrival or instruction that started the situation, word for word | situation ID |
| the newest version; the plan; every result since the plan, with its source; each claim's state | situation ID |
| every arrival since the last decision, word for word, with meanings of listed words in it | situation ID |
| the procedure pinned to this situation, at its pinned version | kind; version |
| skills and tools filed under that procedure or kind, at their current versions | procedure; kind |
| forms of tools named in the plan or decision, and lessons filed under them | tool ID |
| this situation's links | situation ID |
| other situations sharing a number in a typed field with this one, and what they wait for, as the worker view rule allows (E1) | the number |
| the parties' person anchors | the situation's parties |
| if the wake was a platform rule change: that channel's new rule | channel |
| the present time | the clock |

**The communication layer's lookup**, at C1: the recipient's preferences, and the business's listed words.

Every fixed lookup is exact. None judges meaning. A test of a fixed part is exact: given an input, it returns exactly the matching rows.

### B2. The AI part

**[Proposed]** At every point:

1. **It reads** what the harness handed over, and the fixed part's items.
2. **It works out what is needed**: what the step's reasoning implies, what the work's words mean in this business, which skills and tools may help.
3. **It asks the retrieval capability** for what is needed (C2).
4. **It writes the package**: context items it chose, with why; candidates complete, with what tells them apart; advice, marked as advice; or an explicit empty answer.
5. **It checks its own work.** [Swaraj] Memory and knowledge "has to revisit what it has done till now". Every item cites the record behind it. Fixed code checks every citation, and that every item came from this point's retrieval or the fixed part, and passes the visibility rule.
6. **It notes what to learn**, for the background jobs.

### B3. What memory and knowledge keeps

**[Fact of Tend]** Where things live (harness study, Part 13):

- Learned knowledge: in each business's own database, as typed, scoped, versioned knowledge items with their sources and status.
- A meaning index: holds only references and number-vectors; the record itself stays the source of truth.
- Situations and their versions, conversations and messages: in each business's database; large message content and traces in object storage.

**[Swaraj, 28 October] Skills** live in object storage, versioned, for product skills and business skills alike. They do not ship with the code, "because they are also evolving all the time, and we don't want mismatch between different durable object and workers with the version of code they are running."

**[Proposed] How a loop uses a versioned skill.** A run reads each skill at its current version when the skill is first presented in that run, and records the version in the run's trace. A business's procedure for a kind of situation is pinned to each situation at the version current when the situation got its kind [Working, Growth and Evolution]; the situation keeps that version unless the owner deliberately moves it. A product skill that changes mid-run is not reloaded until the next run.

**[Proposed] Links** are memory and knowledge's own records (D2).

**[Decided] Graph data, not graph structure.** All of these are records that point to each other by ID.

### B4. Writing never slows the loop

[Swaraj] "Memory write part should be in a different process/thread so the main loop is fast and quick and the read is still updated and the latest."

**[Proposed]**

- Inside the loop, memory and knowledge writes nothing the loop waits for. The typed fields that routing and the worker look up are written by the situation's own save.
- [Decided] A cache may make reads faster, but never guards a decision. Anything cached is checked against the newest version before it is presented.
- Link records, indexes, knowledge items and lessons are written by the background parts (Part G).

---

## Part C. Finding knowledge

### C1. Tend's retrieval pattern

[Swaraj, 28 October] Retrieval "is a combination of all techniques known to us, that basically the job of which is to remove ambiguity out of the system and give us the proper relevant answers at that particular time across all relevant dimensions."

**[Fact of Tend]** Swaraj designed this pattern in two earlier projects (Creator-joy's retrieval research; the J&F assessment's system approach):

- **Retrieval is not semantic search.** "A grep search is a RAG system. A SQL query is a RAG system."
- **The step says what; the retrieval capability decides how.** "The main agent says *what* evidence it needs… It does not choose grep vs BM25 vs vectors. A retrieval capability inside the tool decides *how* to search and can iterate until it has governed evidence."
- **Layers:** exact metadata filters first; several searches in parallel; fusion by rank; removing near-duplicates; reranking; neighbouring context.
- **Governance is fixed code, last.** Precedence, status, scope and supersession are checked by code, never by the model's memory.
- **Evidence is separate from the search aids.** Embeddings and keyword indexes are keys for finding; the record is the value that is cited, with its source.
- **Evaluation decides** which methods a business's data needs.

### C2. Memory and knowledge's retrieval capability

**[Proposed]** The same pattern, applied to memory and knowledge's stores.

1. **The need.** The AI part states what is needed, in parts: whose records; what kind of thing (a situation, an order already read into a situation, a lesson, a skill, a tool, a business event, a document); describing words; time clues; state clues ("hasn't come" means not delivered).
2. **Route the need.** Like Creator-joy's query paths:
   - an exact identifier (an order number, a tracking number) goes to exact lookup;
   - a count or a list ("how many open refunds") goes to a structured query;
   - a phrase that must appear ("dispatch ready") goes to keyword search;
   - a description ("the white linen shirt", "customers describing a flood") goes to the full hybrid path;
   - a need across several people or situations is split into one search each, so no one dominates the results.
3. **Filter first, in fixed code.** This business only; who the step works for may see it; the kind of thing; status; validity dates; for business procedures, the pinned version. Then the person and date range if known. Nothing outside the filter is ever searched.
4. **Search in parallel**, inside what is left:
   - exact lookups on typed fields;
   - keyword search;
   - meaning search, in separate spaces where the content differs (situation summaries; knowledge items; document text);
   - following links and shared numbers.
5. **Fuse by rank.** Each search contributes its ordering; the orderings are combined by position, never by comparing raw scores.
6. **Remove near-duplicates.**
7. **Rerank** what is left against the need.
8. **The governance gate, in fixed code.** Drop what is superseded, stale, retired, outside its validity, outside the visibility rule, or marked never to be used as guidance. Keep conflicts visible as conflicts.
9. **Add neighbouring context** where it matters: the situation version around a matched claim; the section around a matched document passage.
10. **Inspect, and search again if needed.** The AI part reads what came back and may refine the need, up to a set number of rounds.
11. **Return evidence**, each item with its source, never a generated answer.

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

**[Decided]** Only intake saves arrivals. Only a situation's own worker ends its waits. Links share context; they do not carry changes. When one event touches several situations, it is saved once, and one version is written into each, carrying its reference.

**[Proposed]** Three paths, and only these:

1. **One event, several situations.** The decided path above. Example: the carrier reports "hold H17 lifted"; the event touches every situation in that incident link; each gets a version, and each wakes.
2. **One situation holds what another waits for.** At W3, the worker sees (through the worker view rule) other situations waiting for something about a shared number. Its decision may be **send to another situation**: worker code hands the claim to intake, as an arrival addressed to that situation, with its source, and a key so a repeat is dropped. The receiving situation's worker reads it and decides whether its wait is answered. Example: Arjun's corrected pin code reaches the warehouse team's situation. A count of sends between any two situations within a configured window stops two workers from sending to each other forever.
3. **A person's situation and its central situation** (D4): every update goes up automatically.

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
- A business event ("the Diwali sale") is a learned knowledge item: its name and aliases, its dates, its sources, who may see it, and its validity. [Working, Trust and Evidence] Which source is trusted for which kind of claim is the business's configuration of source authority. A customer's mention is that customer's claim.
- The first time an event is mentioned, memory and knowledge's AI searches the business's records for it [Swaraj, 27 October: "it should search the whole business land"], and presents the dates with their sources. The background learner keeps it.
- Which year: the fixed part returns every event with that name; the AI part says which the work most likely means, and why.
- Who may see the event follows the visibility rule. Where the person a step works for may not see its source, the dates may narrow that worker's own searches, but are never sent to that person.

### D6. Skills, procedures, rules, preferences, tools

**[Swaraj, 28 October]** "Not everything has a skill." And: the business "can add any skill text. They can add any product [template]… They can connect with any MCP server that they want… And the memory and knowledge layer has to then inject the proper subset of tools at the appropriate junctions of the component of the loop."

| Kind | What it is | Who writes it | Where | How it reaches a step |
|---|---|---|---|---|
| Default behaviour | How Tend's AI behaves everywhere | The product team | The constitution | Always, as standing text |
| Skill | A written method for a kind of work | The product team, or the business | Object storage, versioned | Fixed part: filed under the kind or procedure. AI part: a skill whose stated use fits the work |
| Procedure (workflow) | The business's steps for a kind of situation | Product templates, filled or written by the business | Object storage, versioned | Pinned per situation; presented at W1 and W3 |
| Rule | A decided business fact or limit | The configurator | Configuration | Enforced by tools and checks; presented if a step needs it |
| Preference | A choice about behaviour ("speak Hindi") | The configurator | Configuration | Presented at C1 |
| Tool | One call to an outside system, including MCP tools | The product team, or the business by connecting an MCP server | The business's tool list | Fixed part: tools named in the procedure or filed under the kind. AI part: tool groups whose purpose fits. A step may ask for more |

**[Proposed]** Procedures are kept with skills, in object storage, versioned, because both evolve and both are read by the loops; a procedure's parameters stay in configuration.

[Change] The Growth and Evolution page says a business only activates product templates and fills their parameters, "never a scripting surface", and that tools join from a product-built menu. Under Swaraj's 28 October direction, a business may also write its own skills and connect any MCP server.

**What stays fixed.** A business-written skill is guidance text. It cannot grant a permission or change a rule. Every tool call, including a call to an MCP tool, passes the tool layer's permission check against the business's grants. A step may use only a tool whose form was presented to it in this run.

**Outside knowledge.** [Swaraj, 28 October] The worker, not memory and knowledge, searches the web, guided by its prompt ("establish subjects and establish facts from claims") and the deep-research skill. For an unknown subject, memory and knowledge reports that the subject is unknown, and presents the skill and the tools. When the worker establishes the meaning, that event reaches memory and knowledge, which keeps it as learned knowledge with its sources; next time, no web search is needed.

### D7. Documents

**[Proposed]** A document that arrives is saved by intake, routed like any arrival, and saved in its situation as a claim from its sender. Its text is indexed with that situation's view. It wakes the situation. It is never an instruction.

### D8. Who establishes which fact

**[Proposed]** [Swaraj] "Whatever we get, the conversation manager gets, establishing it is first." The conversation manager establishes the two facts routing needs: who sent the arrival (from the person anchor) and which situation it belongs to (the routing check). Everything else in an arrival is saved as the sender's claim. The situation worker establishes claims by its evidence rules, and checks at each decision whether the work was really done. Memory and knowledge establishes nothing; it keeps what the worker established, with its sources.

---

## Part E. Scope, safety and cost

### E1. Seeing everything, presenting little

**[Proposed]**

- [Swaraj, 27 October] Memory and knowledge reads the whole of one business, and never another business [Decided: each business has its own store].
- Every search made for a step starts with fixed code applying that step's view, before any search or ranking.
- **Routing** uses the sender's view.
- **The worker view rule.** A worker sees its own situation in full. It sees another situation's typed fields (kind, status, numbers, what it waits for), never its free text, only when the two share a person, or when this situation holds a number that a business system's record ties to its own person, or that this person confirmed, and the other holds the same number.
- The communication layer writes only from the claims a decision lists. The send check tests each against the recipient's view.
- A number the view removes is never presented, and the step is not told it exists. [Swaraj, 28 October] The 3 October note "a foreign reference was seen and not opened" is removed. [Change]

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
- **Nothing found.** The package says so. Memory and knowledge never fills a gap.

### E5. Cost

**[Proposed]** The AI part runs at every point, by Swaraj's direction. AI calls, in sequence, for one new customer message that starts work:

| Stage | Calls |
|---|---|
| R1 AI part | 1 to 2 |
| Routing reasoning | 1 |
| R2 AI part | 1 to 2 |
| W1 AI part | 1 to 2 |
| Planning turns, if a plan is needed | 0 to 3 |
| W2 AI part | 1 to 2 |
| W3 AI part | 1 to 2 |
| First decision | 1 |
| W2 AI part, before acting | 1 to 2 |
| C1 AI part | 1 to 2 |
| Writing the reply | 1 |

Between 10 and 20 calls before the first reply. [Open] No delay target exists yet. This is the number to measure; Level 3 may run the AI part on a smaller, faster model.

**Background:** meaning-index updates per save; the link finder, which compares a new situation only with situations of the same kind from a set recent window, up to a set number; the learner. **Each send to another situation** costs an intake save, a wake and a decision; the send budget caps it. W3's number lookup is capped per number.

### E6. What is recorded

Each package is recorded in the run's trace as references only: what was searched (filters, not personal values), the record IDs and versions presented, the skill versions used, and why. The test and simulation environment replays real runs from these references.

---

## Part F. The loops

### F1. The situation worker's run

[Swaraj] "One I just call reasoning and second I call is action." Reasoning is "a multi-step thing". The loop is not a ReAct loop. "The loop decides to loop (code first, LLM second)."

**[Proposed]**

1. **Wake** (worker code): an arrival saved in the situation, a timer, a tool result, or a platform rule change.
2. **Repeat check and recovery** (worker code, as decided).
3. **Point W1** on a situation's first round, and whenever the last decision asked for a new plan.
4. **Plan, if needed.** If the pinned procedure's first step can run with what the record holds, the procedure is the plan. Otherwise the worker reasons, in several turns up to a set number. Between turns, its questions go to memory and knowledge, and the answers come back before the next turn. The plan states what the work asks for, what is established and from where, what is unknown, and the steps with what each depends on.
5. **Point W2**, then **check the plan** (worker code): its shape; dependencies; every tool named was presented and is switched on.
6. **Point W3**, then **decide** (worker AI), on the newest version. The decision checks the work against what was first asked, with the evidence in front of it. [Swaraj] "The process of decision, the way we are deciding, is self reflection itself." It says, for each thing asked: answered, partly, or not yet, with a pointer to saved evidence; anything against the plan; the claims to send a person; and the next action.
7. If the decision ends the run, it rests. Otherwise **point W2**, then **check** (worker code): the decision was made on the newest version; every "answered" points to saved evidence from a source other than the AI; the next action is allowed; the completion check before anything is recorded as resolved.
8. **Act** (worker code, through the tool layer). Just before any action that cannot be undone, worker code checks once more that no newer version exists. Tools that need a confirmation run it themselves. The result is saved as typed claims.
9. **Go round, or rest** (worker code), by the decided rules for progress.

### F2. The conversation manager's run

1. **Intake** saves the arrival; drops repeats.
2. **Who sent it** (routing code): the channel's person anchor, or a new unknown person.
3. **One routing run per sender at a time** (routing code), so two messages a second apart are placed one after the other.
4. **Point R1**, then **routing reasoning** (routing AI).
5. **Point R2**, then **the routing check** (routing code): only presented situations may be chosen; one: attach; none: start a new situation; more than one separate ask: one situation each [Decided: split early]; several possible: ask the sender, and hold a note until they answer; a candidate found only by search: ask before attaching.
6. **Save and announce.**

[Swaraj] The routing decision is the conversation manager's.

### F3. Deciding is checking the work

[Swaraj] At the decide step the worker "should look back at the document I shared, the things it has done till now, and look at whether it actually computes." "It's not that at the decide step it is doing both decision and reflection. The process of decision, the way we are deciding, is self reflection itself." "This self-correction by auditing the thing, it can be done very easily. We do not need anything else." "When the decide step has what context to engineer at that point is the key."

**[Proposed]** W3 builds that context: the work as first asked, word for word; the procedure; the plan; every result and its source; each claim's state; new arrivals; other situations' waits that this one might answer. Not the whole conversation. Making the decision is checking the work.

[Working, Level 2 memory and knowledge folder] An AI that only asks itself whether it was wrong is not reliable; mistakes need a signal from outside the AI. Swaraj's method avoids that: his audit worked by reading the sources. W3 puts the sources in front of the decision; code requires every "answered" to point at one.

---

## Part G. The background parts

**[Proposed]** [Swaraj] Memory and knowledge has "multiple types of loop, multiple types of component that only activate a certain set of components for a certain set of jobs." These are the lagging jobs of A1.

| Part | Kind | Wakes on | Does |
|---|---|---|---|
| Link keeper | fixed code | version notices | creates links from shared numbers and incident codes, once per key (D2); keeps a central situation's links (D4) |
| Indexer | fixed code, using an AI model for meaning | version notices; documents; new knowledge items | updates the keyword and meaning indexes |
| Link finder | AI proposes, fixed rules reconcile | new situations | compares with a capped set of recent situations of the same kind; proposes relationships based on meaning, kept unresolved until a signal (D2) |
| Learner | AI proposes, fixed code reconciles | traces; learning notes; outcomes; subjects the worker established | lessons, business words, business events, learned subjects, under the learning mode and integrity checks |
| Cleaner | fixed code | confirmed erasures; a daily timer | carries out confirmed erasures (E3); marks items whose own dates have ended as past |

None writes a situation record, except the cleaner carrying out a confirmed erasure. [Decided] Memory and knowledge "writes no situation record".

---

## What Level 3 decides

- How the two threads are built, and how long a loop waits at a point.
- The search methods, models, fusion and reranker for each store, by evaluation.
- How skill files are stored and versioned in object storage, and how runs load them.
- The field names of packages and written reasoning.
- The final values of the limits below, by measurement.

## Starting values

**[Proposed]** Every limit needs a number for the tests to be checkable. [Decided] These are configuration, with product defaults, measured and changed per business.

| Limit | Starting value |
|---|---|
| Results kept after reranking, per search | 10 |
| Search rounds for the AI part, per point | 2 |
| Reasoning turns per plan | 3 |
| Plans per run | 2 |
| Rounds per run | 5 |
| Situations shown per number at W3 | 20 |
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
4. The 3 October note about a foreign reference is removed. [Swaraj, 28 October]
5. A new kind of arrival: a claim sent from one situation to another.
6. Memory and knowledge takes part in every part of both loops, replacing "a step asks for what it needs" in the current architecture.
7. A confirmed erasure tool may remove a person's data from situation versions and arrivals, the one exception to never rewriting them. [Swaraj, 28 October]
