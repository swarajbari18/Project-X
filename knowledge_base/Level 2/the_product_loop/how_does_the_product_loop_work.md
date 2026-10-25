# Level 2 – System Design: How Tend's product loop works

## Status

Answered — working decision, written 29 October 2026 from Swaraj's words of that day, the Level 1 and Level 2 answers, the Product Vision, and the harness study read in full with the research folder's two records on harness quality.

Swaraj asked for it in these words:
- "the loops do not look natural to me. The natural would be the way we have designed it, understanding, routing, gathering information, etc., etc. The way the loops were done, they were mostly more of a technical solution a software engineer would come with, not a solution a product engineer would come with. I am first and foremost a product engineer."
- "It would always go with the level of effort that has been coded or programmed into the harness that we did not want. We did not want it to be controlled with the prompt, but with the harness should be flexible enough that the effort auto adjusts."

How this page was made: the decided records it touches were listed first, the work was walked as a capable employee would do it, a first design was attacked with simple, harder and very hard cases, and the design was rebuilt twice from what the cases showed. That working is in `memory_and_knowledge_drafts/48` to `52`. The tests are in [the product loop's tests](the_product_loop_design_tests.md). Swaraj's words and what the work found are in [the conversation and discoveries](the_product_loop_conversation_and_discoveries.md).

Items marked **[Call]** are this design's own choices where neither Swaraj's words nor Level 2 settle the point. They are listed at the end.

## Why this page exists

Tend's loops were first drafted in the harness study, as two loops of one technical shape: code step, the AI proposes, code checks, act, go round. Sections 7 to 12 and the memory and knowledge design were built on that shape. Swaraj rejected it as the shape of Tend's loop. The study's purpose, in his words, was to "discover what all kind of LLM loops are there, so we can create a harness and we can create a custom product loop that basically orchestrates the LLM call in such a way that it basically performs as a product all the time."

So this page builds the loop from the product's own stages, the ones Level 1 names ("re-enter the normal process of understanding, gathering, deciding and acting"), and uses the study's kinds of LLM interaction only inside each stage.

## The design on one page

1. **Tend's product loop is four loops, each made of stages a capable person would recognise.**
   - **The arrival loop** (the conversation manager, for each arrival): intake, understanding the arrival, routing.
   - **The situation loop** (the situation worker, for one situation): understanding the situation, gathering, weighing evidence, deciding, acting.
   - **The update loop** (the conversation manager, for each new version of a situation): the update decision.
   - **The message loop** (the communication layer, for each message): writing, the send check, sending.
2. **Every stage is its own component, and any stage may end the loop.** Swaraj: "Each step had a option to whether go to the next step of the loop or whether to exit right there and there."
3. **The harness fixes what may happen and what counts as done; the effort follows what the message needs.** Stages with nothing to do are passed. Inside a stage, the AI reasons for as many turns as its job needs, within a code limit. The prompt never tells the model how hard to try.
4. **Code chooses every pass, skip and ending, from facts the stages wrote.** The AI never decides to continue, and no score made by a model steers anything.
5. **Understanding the arrival is the conversation manager's only AI stage.** It works out what each ask means (with memory and knowledge's help: "the Diwali sale" becomes 20 to 24 October), whether it is about the business, whether Tend already holds the answer, and where it fits. It writes an **understanding artifact**. Routing is code that carries it out. Swaraj: "Routing, I don't think would be much of a LLM thing."
6. **A message that is not about the business never becomes a situation.** "hi", "what's the capital of India?", a sum: understood, answered, and kept out of Tend's knowledge. Swaraj: "This message will only be a noise in our knowledge framework."
7. **A question Tend can already answer is answered at once** from a current claim in the person's own situation or a fact the business configured. This restores Swaraj's ruling of 5 September, which never reached the architecture; extending it to configured facts is a **[Call]**.
8. **The situation loop runs only the stages the situation needs**: understanding only when there is something new to place, gathering only when something that matters is unknown, weighing only when new claims came in. Deciding runs every round.
9. **Memory and knowledge hands a package before each stage that reasons**, and observes the stages that are code.
10. **The cost now follows the message.** "hi" costs 2 AI calls and 2 short looks by memory and knowledge. Arjun's Diwali message costs 4 and 4 before his first reply. The design of 29 October morning took 10 to 23 for every business message.

## Words used here

- **Product loop**: Tend's four loops together.
- **Stage**: one component of a loop: a job a capable person would recognise, with a fixed input, a fixed output, and fixed ways to end.
- **Pass** (a stage is passed): code skips a stage that has nothing to do.
- **Ending**: a stage's finding ends the loop.
- **Reasoning artifact**: the structured record an AI stage writes, which code reads and checks. Swaraj's words: "a reasoning artifact that we can use as a JSON to route". Each AI stage has its own: the understanding artifact, the information plan, the decision, the message.
- **Understanding artifact**: the reasoning artifact of understanding the arrival (part C2).
- **Wider look**: understanding's second pass, over a small set of the person's own situations that memory and knowledge narrowed by what the first pass resolved.
- **About the business**: an ask that concerns the business's work, products, people or records. A greeting, small talk, a general-knowledge question or a sum is not.
- **Something that counts as evidence**: a claim from a source other than the AI, kept with its source and time; or a fact the business configured.
- **Current**: younger than the business's currentness rule for that kind of claim.
- **Package**: what memory and knowledge hands a stage before it runs: knowledge to use, or an explicit empty answer.
- **Clear match**: an ask fits one situation for a reason code can check: the sender wrote a number only that situation holds; the sender is answering a question that situation asked; or it is the sender's only open situation of the ask's kind holding the values understanding resolved (dates, a store, an item).
- **Situation, version, arrival, held note, claim, wait, the worker, the update decision**: as in the architecture.

## Part A. The principle

**A1. The problem.** The harness study's sources, and Swaraj's own Kirana TeleChat, run one fixed pipeline for every message: plan, check the plan, execute, check results, decide, respond, in bounded rounds. "hi" and an intricate question get the same machinery. The 14 September research found a second problem: a harness can execute perfectly and still answer badly, because a fixed corridor suppresses what the model could reason from the evidence in front of it. Its resolution: "the harness owns what may happen and what counts as done, the loop owns how to get there."

**A2. The principle.** The product loop is built from the product's stages. The harness fixes, for each stage, what it may do, what its output must look like, and its ways to end. Inside a stage, the AI reasons from that stage's own live context, for as many turns as its job needs, within a code limit. Which stages run, and when the loop ends, follows facts the stages wrote. "The LLM never decides to continue" (harness study 11.2.4); no model-made number steers control (study 10.2.3).

**A3. Effort follows facts.** The work a message gets is set by:
- whether each ask is about the business;
- whether Tend already holds something that answers it;
- whether its fit is settled, or needs the wider look;
- whether what came in is free text or typed;
- whether an unknown that matters is open;
- whether new claims touch fields that already hold claims.

None of these is a rating of difficulty. A stage with nothing to do is passed by code. When in doubt, the stage runs.

**A4. Quality inside a stage.** Each stage gets its own lean context, knows the shape of its output before it starts, and opens on the person, not on the system. Each stage has its own short stage constitution (harness study, Part 14: universal core, stage constitution, injected preferences, assembly templates).

**A5. What the harness never gives up.** Permission checks, the business's rules, claims kept as claims, the version check before an effect, honest endings, and the completion check do not vary with effort.

## Part B. How the AI is used inside a stage

The harness study's purpose was to find these. Each stage below uses one or two of them.

| Kind | What happens | The study's class | Sources |
|---|---|---|---|
| **Fixed code** | No AI | — | Product Vision: "If a decision can be made using clear rules, Tend should make that decision using the system itself."; TeleChat's checks and execution in code |
| **One structured answer** | One AI call writes a reasoning artifact of a fixed shape. Code checks it. A failed check goes back once, with its reasons; a second failure goes to a person. | bounded artifact; one-shot | SKILL.state's step contract; TeleChat's plan checked in code; Pi's argument checks, errors returned as data |
| **Choosing among what was shown** | The AI chooses among items it was given. Code checks that the choice was among them. "Cannot tell" asks someone who can say. | bounded artifact | TeleChat's draft resolver: classify, verify, resolve, clarify |
| **Plan, do and check, in rounds** | The AI writes steps with what each depends on. Code checks the plan and runs what can run. Results return as claims. Rounds continue only while progress is made, within a limit. | strategic | TeleChat's orchestrator; Hermes' guards against repeats and no progress; the progress rule of 4 September |
| **Explore step** (inside a plan) | The AI reads one source, sees the result, chooses the next read, until the step's target is met, its read limit is reached, or the progress rule stops it. This is the ReAct shape, used only for reads. | (the study's "minimal loop") | Pi; Hermes; the 14 September research: simple loops reach quality because they reason from execution evidence at the moment of deciding |
| **Watching from outside** | No reasoning. A named wait is kept alive, and the work wakes when something answers. | supervision | Herdr; Prime Agent. Used by the book of waits and the status-check service, not by a stage |

Swaraj, 29 October: each component may run any loop inside it, even a ReAct loop; the components of the product loop are not that loop.

## Part C. The arrival loop (the conversation manager)

The conversation manager contains the intake step, the situation worker and the communication layer (decided 10 October). The arrival loop is its work on each arrival.

### C1. Intake — fixed code

- **Job:** save the arrival; drop a repeat; find who sent it; run one arrival loop per person at a time.
- **Who sent it:** the channel address points to a person ID; an unknown address gets a new person, marked unknown, made once per address. A sign-in proves a person; a channel bound to a member proves only the channel.
- **Ending:** a repeat is dropped. A **typed arrival with an exact reference** (an outside system's answer to a wait, a claim sent from another situation, an update for a central situation, an incident event) is placed by code where its reference points, and skips understanding and routing.

### C2. Understanding the arrival — one structured answer; choosing among what was shown for the wider look

**Job:** understand the arrival before anything acts on it. Product Vision: "Tend should never take an action before understanding the situation." Swaraj: "for understanding, the memory and knowledge layer will obviously find out the meaning of the message, what the Diwali sale is, in the conversation managers itself. Then based on that, it will then filter its situation model and the retrieval filters, and then give it a better subset."

**What it may use.** Only what Tend already holds. Level 2: "Understanding works with what is already available. It does not fetch new information." It never calls a business system, and never asks a person. A question that needs a search or a system is gathering's work.

**The package before it** (memory and knowledge):
- who the sender is, and their role;
- the sender's recent messages, both ways;
- the sender's open situations, as summaries of typed fields, each with the waits and questions it holds on this person;
- the business's events, words, places and products whose name or alias is in the arrival, with dates, sources and who may be told them;
- facts the business configured that the arrival's words point to (hours, return window, store addresses);
- any situation of the sender's that a number in the arrival points to;
- earlier understanding artifacts of this sender that bear on this arrival;
- the time now and the arrival's time, in the business's time zone;
- memory and knowledge's advice: what the words most likely mean, and what it found when it searched the whole business for a term it did not hold.

The sender's own records are the boundary for records shown. The business's own knowledge may be used to understand, each item marked with who may be told it ("Using is not showing", decided 29 October).

**The understanding artifact** has fixed sections:
1. each ask, quoted, and whether it is **about the business**;
2. for each business ask, what it refers to: time words turned into a date or range in the business's time zone (or kept as a small set), places, items, numbers; each resolved value names the item that resolved it;
3. the sender's claims;
4. what is unknown;
5. whether the arrival answers a question Tend asked, and which;
6. whether it refers to earlier work or a past purchase;
7. for each business ask, the item Tend holds that answers it, if one does;
8. for each business ask, **where it fits**: a presented open situation; a new situation of a named kind; "needs the wider look"; or "cannot tell between" named situations.

Asks of one problem share a fit; asks of different problems get different fits (split early, decided). A greeting inside a business message ("hi, where is my parcel?") is not an ask.

**The wider look.** When an ask's fit is "needs the wider look", memory and knowledge narrows the sender's own situations, open and finished, by the values the artifact resolved: exact values first, description only inside them (the 3 October agreed rule, now driven by understanding). It returns a small set and the total.
- An empty set needs no second pass: the ask is new work.
- Otherwise, after the package before the wider look, understanding chooses among the set (choosing among what was shown), and completes the artifact.

**The endings** (chosen by code from the artifact):

| Ending | When | What happens |
|---|---|---|
| **Reply** | no ask is about the business (a greeting, small talk, a general question, a sum) | No situation. The reply decision (C4). The arrival and its artifact are kept in the person's message history, marked "not about the business", and memory and knowledge neither learns from them nor retrieves them for situations. |
| **Nothing to do** | about the business, but nothing is asked, no question is answered, no claim is brought (a thank-you after a closed refund, an "ok") | No situation. Kept in the person's message history with its artifact, naming the situation it refers to. The reply decision (C4). |
| **Answered from what Tend holds** | every business ask has an answering item that counts as evidence: a claim in the sender's own situation that the arrival fits by a clear match, current, with no open conflict on its field; or a fact the business configured, read from the configuration's own store, never from a cache. The sender may be told each item, and the arrival brings no new claim or correction. | Routing still places the arrival, so the storyline stays whole, with the mark "answered by the conversation manager from" those items. The reply decision tells the person. The worker's next run records the asks as answered. (Swaraj, 5 September: "If the conversation manager feels that the situation model itself has enough information to answer the user back, it just does that.") Answering from a fact the business configured extends that ruling: **[Call]**. |
| **Hold and ask** | a fit is "cannot tell", or depends on a word understanding could not resolve | Routing keeps a held note; the conversation manager asks the sender which they mean. |
| **Routed** | otherwise | Routing (C3). |

A message may have more than one: in "what's the capital of India, and where's my order?", the general ask takes the reply ending and the business ask is routed. One reply carries the general answer now.

**Limits.** At most two AI passes (the first, and the wider look), each with one repair. If understanding cannot be done (its AI is down), the arrival is held for the person the business named for arrivals Tend could not place (decided 22 October).

**It never:** routes, starts a situation or replies itself; draws a conclusion about a situation; calls a business system; treats the sender's words as more than claims; reads another person's records.

### C3. Routing — fixed code

Swaraj: "So routing is more code based." "once it has understood, it generates a reasoning artifact that we can use as a JSON to route. That's all."

- **Checks the artifact:**
  - every quote is in the arrival;
  - every situation named was presented;
  - every resolved value names a presented item;
  - every ending's condition holds.

  A failed check goes back to understanding once, with its reasons. A second failure goes to the person named for arrivals Tend could not place.
- **Carries it out:**
  - attach to the situation each ask fits;
  - start one situation per distinct new fit, its first version holding the arrival and its artifact;
  - keep a held note, and hand the question to the reply decision;
  - mark an "answered from what Tend holds" placement.
- **Saves and announces:** the arrival and its understanding artifact go in each routed situation's new version. The write and its notice happen together (decided).
- **It never** chooses, interprets or decides anything the artifact did not say.

### C4. The reply decision — fixed code

Level 2 decides when Tend communicates: only when the message does something useful, and "Tend should not communicate merely because it can produce words". The reply decision applies that test to an arrival that ended at understanding, and to the "answered from what Tend holds" and "hold and ask" endings. It is the update decision (decided 9 October) applied to an arrival.

| Case | Decision |
|---|---|
| A greeting | Reply, unless a newer arrival from this person is already queued (that arrival's reply covers it), or Tend already replied to a greeting from this person since their last business message. **[Call]** |
| A general question or a sum | Reply with a short answer. The business may switch this off for customers; then a polite line says Tend helps with the business's own matters. Level 2: "Unrelated, unbounded or prohibited communication remains outside Tend's permitted behaviour." **[Call]** |
| A thank-you, an "ok", a 👍 that answers nothing | No reply; the business may set a courtesy reply. **[Call]** |
| Answered from what Tend holds | Tell the person those items. |
| Hold and ask | Ask which situation they mean. |
| A message with general and business asks | Reply to the general asks now, with one true line that the rest of the message is being worked on. |

**What a reply to a message that is not about the business may say.** Nothing about the business: no order, price, policy, promise or status. It may repeat a question Tend already asked this person. If an answer would need a business fact, the message is business work. The send check enforces this.

The decision is saved with the arrival, in the person's message history, or in the situation's version for "answered from what Tend holds". The send check's "a saved decision to send" includes it. Then the message loop (E2).

## Part D. The situation loop (the situation worker)

Level 1: "re-enter the normal process of understanding, gathering, deciding and acting." Level 2 keeps the stages apart: "Understanding is not Gathering"; "Gathering is not Decision Making."

### D1. Waking — fixed code

- Starts on a new version's notice, a timer or check-in, or a tool's result.
- Drops repeats; runs one at a time per situation; recovers from the newest saved version.

### D2. Understanding the situation — one structured answer

- **Runs** when the version holds something not yet placed in the full record:
  - an arrival that brings claims, new asks, a correction or a document, as its understanding artifact says;
  - a free-text result;
  - a document.
- **Is passed** for:
  - a new situation, whose arrival's understanding artifact is its first understanding;
  - typed results, which code saves as claims;
  - an arrival that brings nothing to place, such as a status question.
- **Package before it:** the new content, word for word, flagged as outside text, with its understanding artifact; the full record's asks and their states; the questions and waits it may answer.
- **Writes:**
  - what the new content adds;
  - which asks and waits it answers;
  - what is now known, unknown or in conflict;
  - whether routing looks wrong.
- **Endings:**
  - nothing new → rest;
  - routing looks wrong → the worker proposes a correction (the existing re-route, split or link), and the run goes on or rests.

### D3. Gathering — plan, do and check, in rounds, with explore steps

- **Runs** when an unknown that matters to an open ask is open, or when deciding sent it back for a named need.
- **Is passed** when memory and knowledge's package maps every such unknown to an item that counts as evidence.
- **Package before it:**
  - the business's procedure or skill for the kind of work, at the version pinned to this situation;
  - the tools that fit, as forms;
  - lessons filed under them;
  - what Tend already holds for each unknown;
  - other situations' typed fields, where the worker view rule allows.
- **The information plan.** It says what information could change the next safe step, which source holds it, and in what order (Level 2: decision-relative, priority-ordered). It is saved in the situation. Each entry runs one bounded pass, of the steps that can run now. A step that waits on an earlier result runs at a later entry.
- **Explore steps** read one source at a time, each result fed back, until the step's target is met or its read limit or the progress rule stops it. They are used for open research, where the next read depends on the last.
- **What gathering may do:**
  - read business systems, through the tool layer's read tools;
  - use memory and knowledge's retrieval;
  - make outside reads the business switched on;
  - ask a person for information: an employee, a partner, or the customer. Level 2: "Gathering may ask an employee or partner for information." The question is a step of the information plan, saved in the situation; the communication layer sends it, with its send check, and a wait is written for the answer. A question to an employee is a work item.

  Each result is saved as a claim, with its source and time.
- **It never:**
  - takes any other step with an effect: a refund, a change to a system, a message that is not a question for information;
  - judges whether the information is enough. That is deciding's (the 4 September ruling).

### D4. Weighing evidence — fixed code

- **Runs** when new claims came in, from this round or from typed arrivals.
- **What it does:**
  - compares claims field by field;
  - sets each one's evidence state (known, unknown, conflicting, stale, partial);
  - applies the business's order of sources;
  - marks the actions a conflict blocks.
- **It never** picks a side because a claim is newest, came from a system, or reads well.

### D5. Deciding — one structured answer

- **Runs** in every round that reaches it.
- **Package before it:**
  - the work as first asked, word for word;
  - the procedure and the information plan;
  - every result, with its source;
  - each claim's state;
  - new arrivals;
  - other situations' waits this one might answer;
  - lessons.
- **Deciding is checking the work** (decided 28 October). For each ask it says: answered, partly or not yet, with evidence. Then it names the next behaviour:
  - gather more, for a named need;
  - ask a person to confirm, choose or approve (asking for information is gathering's);
  - tell (the claims to send);
  - act on a system (a filled tool form);
  - wait (its subject, reason and resume trigger);
  - create work for a person; escalate;
  - resolve (the completion check runs);
  - stop safely.
- **Code checks:**
  - the decision was made on the newest version;
  - every "answered" points to saved evidence from a source other than the AI;
  - every tool named was presented;
  - the shape;
  - the permission check.

### D6. Acting — fixed code

- **Does the decision on its one fixed path:**
  - the tool layer;
  - the wait writer;
  - the communication intent, written into the version;
  - the work item.
- **Before an effect that cannot be undone:** the intent is saved first, and the version is checked again just before the effect.
- **Saves results as claims.**
- **Then code chooses:**
  - free text came back → understanding the situation;
  - typed claims came back → weighing evidence;
  - a named need → gathering;
  - a wait was written or the work resolved → rest.
- **The progress rule** (4 September) and the bound on rounds per wake decide whether another round runs.

**Waiting is not a stage.** It is how a run ends (a named wait) and how a later run starts (what the wait was for arrives).

## Part E. The update loop and the message loop

### E1. The update loop — fixed code

For each new version of a situation, the conversation manager makes the update decision (decided 9 October). Code reads the version:
- a communication intent the worker wrote, with its claims;
- an "answered from what Tend holds" mark;
- a material change for someone watching (a central situation's rules);
- a response promise falling due.

It applies the decided rules on when to communicate, and hands what should be said to the message loop. It has no AI stage: the reasoning about what to say happened in deciding, or in understanding the arrival.

### E2. The message loop — the communication layer

1. **Writing** (one structured answer), after the package before writing: preferences, listed words, channel conventions, communication lessons. It writes the message so that each business claim points to its source. For a reply to a message that is not about the business, it writes the reply itself, and says nothing about the business.
2. **The send check** (fixed code):
   - there is a saved decision to send: the worker's (its decision, or a question in its information plan), or the conversation manager's update or reply decision;
   - the permission check allows it;
   - the channel's rules are met, read fresh, with the consent records;
   - only what this person may be told stays in;
   - every business claim told to a customer has evidence;
   - a reply to a message that is not about the business carries no claim about the business.

   A refusal goes back to writing once, with its reasons, then to the worker or a person.
3. **Sending and recording** (fixed code): sent on the channel the person used while it allows replies; recorded in the communication layer's own record.

## Part F. Memory and knowledge in the product loop

- **A package before each stage that reasons:**
  - understanding the arrival (every arrival with words);
  - the wider look (when its set is not empty);
  - understanding the situation, gathering and deciding (when they run);
  - writing.

  Its AI part runs at each of these, as Swaraj ruled on 28 October ("Memory AI should run at every part of the loop").
- **The stages that are code are observed, not served:** intake, routing, the reply and update decisions, weighing, acting and the send check. Memory and knowledge watches them in its own thread and learns from them. A package nothing can use would be, in Swaraj's words about a loop that has ended, "a wasteful run".
- **When a stage is passed and the version did not change,** its package carries to the next stage. Memory and knowledge does not look twice at the same state.
- **What it changes in the loop:**
  - its package before understanding makes the arrival loop cheap and right;
  - its narrowing turns the wider look into a filter;
  - before gathering, it maps unknowns to items Tend already holds, which lets code pass gathering.
- **It never:**
  - picks the path;
  - answers a person;
  - says an ask is answered;
  - writes a situation record.

## Part G. How the effort adjusts

AI calls before the first reply: the stages', then memory and knowledge's AI part. Walks are in [the tests](the_product_loop_design_tests.md).

| Arrival | Path | AI calls |
|---|---|---|
| "hi" | intake → understanding → reply → writing | 2 + 2 |
| "what's the capital of India?" | the same | 2 + 2 |
| "thanks!" after a closed refund | intake → understanding → nothing to do | 1 + 1, no reply |
| "what time do you close today?" | understanding → answered from the configured hours → routing (a new situation) → writing | 2 + 2; afterwards the worker records it: 1 + 1 |
| "where is my parcel?", the carrier's claim current | answered from what Tend holds | 2 + 2 |
| Swaraj's "look bro, I want to know the status of my refund on that Diwali sale product at airport", the payment claim stale | understanding → routing → gathering → weighing → deciding → acting → writing | 4 + 4 |
| Arjun's "the one I ordered in the Diwali sale still hasn't come" | understanding (wider look, empty set) → routing (new) → gathering → weighing → deciding → acting → writing | 4 + 4 |
| Nisha's research brief on dark AMMs | gathering passes with explore steps, several decisions | grows with the work, within limits and the progress rule |

The design of 29 October morning took 10 to 23 for every business message; TeleChat ran the same pipeline for "hi" and for an intricate question.

## Part H. Alternatives, trade-offs, and limits

| Option | For | Against | Outcome |
|---|---|---|---|
| One fixed pipeline for every message (TeleChat; the harness study's drafted loops) | predictable | the same effort for "hi" and for intricate work; Swaraj rejected it | rejected |
| One ReAct loop that chooses its own path | quality on strong models; flexible | the model decides when to stop and what to do; no fixed place for permission, claims, honest endings; the small-model floor needs a tighter harness | rejected as the product loop; kept as the explore step inside gathering |
| A first AI call that rates difficulty and picks a path | simple to build | a model-made number steering control (study 10.2.3) | rejected |
| Each stage as a separate part with its own records | clean on paper | many small parts that must constantly coordinate (rejected in Section 7) | rejected; stages are components of a loop inside the existing parts |
| **Stages a person would recognise; code chooses passes and endings from facts; each stage's inside uses the kind of AI its job needs** | effort follows the message; every option testable; checks never vary | more design: each stage's artifact, conditions and limits must be specified | **chosen** |

**How to judge it:**
- every test's path is the shortest that keeps every rule;
- no situation is created for a message that is not about the business;
- every pass and ending has a condition code can test;
- the AI calls before the first reply fall as the message gets simpler;
- every walk passes the process rubric of the memory and knowledge tests (understood before acting; claims kept as claims; nothing invented).

**When not to use it:** for a single-question assistant that holds no business state, the stages cost more than they save.

## Part I. What this changes in earlier decisions

1. **The harness study's drafted loops** (its Part 6 and Part 11.3) are replaced. The study is rewritten as the catalogue of kinds of LLM interaction (Swaraj, 29 October).
2. **Decision 32 of 29 October:** the routing choice is now part of understanding, and routing has no AI. The "reading" is now the understanding artifact.
3. **Swaraj's 5 September ruling** (the conversation manager answers from what a situation holds) is restored as an ending of understanding the arrival.
4. **New: the reply ending and the reply decision**, for messages that are not about the business (Swaraj, 29 October). The send check's "saved decision" includes the reply decision.
5. **The 4 September gathering ruling:** gathering becomes a stage the loop passes through before deciding, and deciding may send it back for a named need. One bounded pass, and no judgement of "enough" inside it, stay. As Level 2 says, gathering may ask a person for information. (Corrected later the same day: a first version of this page said gathering only reads. That contradicted Level 2, and was not in the list of records checked first.)
6. **Memory and knowledge's points:**
   - they are named by the stage they precede;
   - the point before the routing check is removed, because routing is code;
   - the point before acting is removed, because acting is code;
   - the point after the reading becomes the package before the wider look, and runs only when its set is not empty.
7. **The 29 October test 46:** a thank-you's reply is decided by the reply decision, not by "no reply by default".
8. **Kept unchanged:**
   - the 25 September rule against "message received" replies;
   - the worker never sends;
   - the progress rule;
   - the 3 October rule on past purchases;
   - using is not showing;
   - what the conversation manager contains (10 October);
   - Section 7's rejection of one part per group of responsibilities.

## Calls not yet confirmed by Swaraj

1. A general question or a sum gets a short answer by default; the business may switch this off for customers.
2. A thank-you, an "ok" or a 👍 that answers nothing gets no reply by default; the business may set a courtesy reply.
3. A greeting is not answered when a newer arrival from the same person is queued, or when a greeting was already answered since their last business message.
4. Planning lives in gathering, as the information plan.
5. Memory and knowledge serves the stages that reason, and observes the stages that are code.
6. An arrival is answered at once from a fact the business configured, such as its opening hours. Swaraj's ruling of 5 September covered what a situation already holds; extending it to configured facts is this design's choice.

**One option the tests surfaced, not applied:** answering "any update?" for every open situation at once, when each holds a current claim. It would change decided rule B3 ("any update?" with three open orders gets a question).

## What Level 3 decides

- the currentness rule for each kind of claim (per business);
- the limits: turns per stage, reads per explore step, rounds per wake;
- which model serves each stage, and memory and knowledge's short looks;
- whether the writer may use a calculator for a sum;
- how intake's queue check for the reply decision is built.
