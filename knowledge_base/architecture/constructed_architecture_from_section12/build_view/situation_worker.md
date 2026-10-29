# The situation worker

This file is for whoever builds the situation worker. It can be built from this file alone. It says what the part must do, not what technology builds it.

**Statuses.** A rule is **Decided** unless one of these words sits beside it:
- **Provisional**: a working choice with a condition for reopening it;
- **deferred to configuration**, **deferred to Level 3**, or **deferred to implementation**: a value or a detail left, on purpose, to each business or market, to the stage that chooses the technology, or to whoever builds it. The rule around it is Decided.
- **Call**: a choice this design made, not yet confirmed by the project owner.

The project owner is the person designing Tend. On 2026-10-22 the project owner accepted every recommendation this design had made, and asked for the smaller questions inside them to be settled in the way that best fits; those points are Decided. A rule marked as "the design's reading" was worked out from its sources rather than found written down; it is Decided too. "The business owner" means the person who runs the business Tend serves. <!-- decided by the owner, 2026-10-22 -->

**Words used here.**
- A **situation** is one operational problem, such as Meera's late parcel. Its record is a list of **versions**; a new version sends a short internal **notice**.
- A **run** is one pass of the worker over one situation, from waking to resting. A run has **rounds**.
- The worker's run is the **situation loop**, made of **stages**: understanding the situation, gathering, weighing evidence, deciding, acting. A stage with nothing to do is **passed** by fixed code.
- **The AI** writes a **reasoning artifact** (a structured record) in the stages that reason; **fixed code**, code that always makes the same check, checks it. The decision's artifact is called a **proposal**.
- The **information plan** is gathering's artifact: what information could change the next safe step, which source holds it, and in what order.
- An **explore step** is a plan step that reads one source at a time, each result fed back, until its target is met, its read limit is reached, or the progress rule stops it.
- The **permission check** answers Allow, Deny, or "a person must approve first".
- A **wait** is a pause until one named thing happens; the **book of waits** lists every wait. A tool **declares** a wait when its result states, in a fixed form, what is awaited, from whom, and what ends it. A wait's **time signal** is the alarm the worker sets for its due time; it wakes only the worker.
- A **claim** is one statement from one source, with a time.
- A **work item** is a task for one named person. The **escalation path** is the business's own list of who to turn to next.
- The **completion check** runs before the work is recorded as resolved.
- The **tool layer** is the only way Tend calls an outside system; the **communication layer** shapes and sends messages to people.
- A **trace** is the saved record of one run.
- The **check for an earlier attempt** looks in the situation for a step already started.
- An **outcome** is what came of a step: it worked, it failed (for good, or for now), or nobody knows yet.
- An **arrival** is anything that comes in from outside, saved as a new version. Each arrival with words carries the conversation manager's **understanding artifact**: what each ask means and where it fits (until later on 2026-10-29, the "reading").
- A **package** is what memory and knowledge hands a stage before it runs: knowledge to use, or an explicit empty answer.
- The **refund setting** is the largest refund that goes through without a person; it starts at zero.
- The **settle window** is the time an outside party promises for a result to become final.

<!-- A1; HC-1; S1; Level 2 security: the spine; T2; HC-3; E1; IA-14; J5; IA-23; Section 7: tool layer; IB-8; decided 2026-10-22: the wait a tool declares; decided 2026-10-22: the status-check answer; decided by the owner, 2026-10-12: refund setting; Level 2 failure: the numbers; decided 2026-10-22: the book of waits; PL-1; PL-12 -->

<!-- Every rule below carries its code in a hidden note. Its meaning, source, and status sit in code_index.md in this folder. -->

**Rebuilt 2026-10-29: the situation loop.** The project owner: "the loops do not look natural to me. The natural would be the way we have designed it, understanding, routing, gathering information, etc., etc." The worker's run is now the situation loop of [how Tend's product loop works](../../../Level%202/the_product_loop/how_does_the_product_loop_work.md). It follows Level 1's order, "understanding, gathering, deciding and acting", and each stage is its own component:
- understanding the situation runs only when there is something new to place;
- gathering is a stage with its own information plan; it reads, and asks people only for information;
- weighing evidence is fixed code;
- deciding runs every round;
- acting is fixed code.

What changed from the design of 28 and 29 October morning:
- The earlier run of wake, understand, plan, suggest, check, do (with a package before every part) is replaced.
- The plan is now gathering's information plan.
- The package before acting is removed, because acting is fixed code.

What still holds:
- deciding is checking the work;
- the newest version is checked before every action;
- claims go to another situation only through intake;
- links are memory and knowledge's (decided 2026-10-28).

<!-- PL-1; PL-11; PL-12; PL-13; PL-14; PL-15; decided by the owner, 2026-10-28: memory and knowledge -->

**1. What is this part for?**

It works one situation at a time:
- it understands what is new;
- it gathers what the next step needs;
- it weighs the evidence;
- it decides the next step;
- it acts, and writes what Tend concludes.

A stage that has nothing to do is passed, so a simple situation costs little and a hard one as much as it needs. <!-- Section 7: the parts table; PL-2 -->

The AI reasons only in understanding the situation, gathering's plan, and deciding. Fixed code checks every artifact, weighs evidence, acts, and chooses the next stage. The worker never sends a message. It never sets a situation to completed. <!-- Section 7 additions: run steps; Section 10: the worker never sends; decided by the owner, 2026-10-12: completed; PL-18 -->

**2. Why is it a separate part?**

Taking arrivals and working a situation change for different reasons. A new channel changes the arrival loop; a change in how the business works changes the worker. Deciding and sending are separate jobs, so the part that decides never sends. The boundary decision is in [the parts file](../boundary_view/the_parts.md). <!-- Section 7 archive: rejected alternatives; method: decide and send are separate -->

**3. What does it do?**
- **Understands the situation** when a wake brings something not yet placed in the full record:
  - an arrival that brings claims, new asks, a correction or a document, as its understanding artifact says;
  - a free-text result;
  - a document.

  It starts from each arrival's understanding artifact, and never works out an arrival's meaning again from scratch. It keeps what was observed, claimed, inferred and decided apart. <!-- C1; C4; C10; IB-21; PL-11 -->
- **Gathers** only what could change the next safe step, from the source that holds it.
  - Its information plan is saved in the situation.
  - Each entry runs one bounded pass, of the steps that can run now; a step that waits on an earlier result runs at a later entry.
  - Explore steps serve open research.
  - Gathering reads business systems through the tool layer's read tools, memory and knowledge's retrieval, and outside reads the business switched on. It may also ask a person for information (an employee, as a work item; a partner; or the customer), as a question the communication layer sends, with a wait for the answer. Level 2: "Gathering may ask an employee or partner for information."
  - It never judges whether the information is enough. <!-- D1; D2; PL-12 -->
- **Weighs the evidence**, in fixed code: each claim is known, unknown, conflicting, ambiguous, provisional or stale, with its reason, and the business's order of sources is applied. <!-- E3; E5; Level 2 trust: evidence states; PL-13 -->
- **Decides by checking the work.** Each decision has in front of it the work as first asked (word for word), the procedure, the information plan, every result with its source, each claim's state, and new arrivals. It says, for each thing asked: answered, partly, or not yet, with a pointer to saved evidence. Then it names the next step:
  - gather more, for a named need;
  - ask a person for information;
  - tell (the claims to send);
  - act on an outside system;
  - wait, or watch for a change;
  - create work for a person, or escalate;
  - arrange a meeting;
  - record the work as resolved;
  - stop safely. <!-- F8; Level 2 decision: behaviours; PL-14 -->
- **Writes its reasoning** with sections fixed code can check: what it is considering, what it still needs to know, its questions for memory and knowledge, and its references, each quoted exactly. <!-- N21 -->
- **Acts**, in fixed code, on the one path for each kind of step. <!-- PL-15 -->
- **Sends a claim to another situation**, when another situation waits for what this one holds. The worker's fixed code hands the claim to the conversation manager's intake, as an arrival for that situation. <!-- IB-16 -->
- **Establishes subjects Tend does not know**, with explore steps using the web tools and the deep-research skill, when the business switched them on. <!-- N28; PL-12 -->
- **Keeps work alive over time.** It writes each wait, with what will wake it, and its entry in the book of waits, in the same save. A wait that begins and ends inside one run is not written in the book. It sets each wait's time signal, which comes straight back to it. <!-- H2; closed item: short waits in the book; settled 2026-10-22: short waits; decided 2026-10-22: the book of waits -->
- **Brings people in, and arranges meetings.** <!-- J1; K1 -->
- **Contacts a partner** (an outside business the business works with, such as its carrier) only after escalation, and only when the business's policy allows. <!-- K4 -->
- **Handles failure.** Past a wait's limit, it declares the outcome and moves to the next safe step. For a step that cannot be undone, the outcome is unknown; for a status no source answered, it is a failure. <!-- M1; M2; IB-10; Section 8: past the bound -->

**4. What does it never do?**
- It never sends a message. The conversation manager decides whether to tell; the communication layer sends. <!-- Section 10: the worker never sends -->
- It never sets a situation to completed. <!-- decided by the owner, 2026-10-12: completed -->
- It never calls an outside system itself; the tool layer does. <!-- Section 7: tool layer -->
- Gathering never takes a step with an effect beyond asking a person for information, and never judges whether information is enough. <!-- PL-12 -->
- It never approves its own step; fixed code checks permission. <!-- Level 2 security: three invariants -->
- It never guesses: what it does not know, it records as not known. <!-- C2 -->
- It never repeats a step that cannot be undone on an unknown outcome. <!-- IB-10 -->
- It never writes into another situation's record. A claim for another situation travels only as an arrival through intake. <!-- IB-16 -->
- It never uses a tool that was not presented to it in this run. <!-- N27 -->
- It never acts on a decision made on an older version. <!-- F7; IB-20 -->
- It never reads the whole business. Memory and knowledge does that, and hands it what it needs. <!-- N18; N34 -->
- The AI never decides to continue: fixed code chooses each next stage, from what the stages wrote. <!-- PL-1; PL-15 -->

**5. What does it own and write?** <!-- Section 7 writer table: who writes what -->
- its understanding of what new content changes; <!-- C10 -->
- the information plan; <!-- PL-12 -->
- gathered facts and claims, each with its source and time; conflicts; corrections;
- the next step, and what should be said;
- waits that may outlast their run, each with its entry in the book of waits, including a wait a tool declares when it hands work to the status-check service. The worker's fixed code saves that wait at once, in the same version as the step that was started, before the AI is told, and records which tool declared it; <!-- construction record, entry 21: writer question; decided 2026-10-22: the wait a tool declares; settled 2026-10-22: one version for a step and its wait -->
- what an outside system's answer means, using the fixed code of the tool that declared the wait; <!-- decided 2026-10-22: the status-check answer -->
- outcomes, and the record that the work is resolved, including asks the conversation manager answered from what Tend holds; <!-- PL-10 -->
- work for a person;
- a claim it decides to send to another situation, which its fixed code hands to intake. <!-- IB-16 -->

It does not write links between situations; memory and knowledge creates and maintains them. <!-- A15 -->

It moves a situation between running, waiting, and blocked, and reopens a situation whose closure was wrong. <!-- Section 8: the states table -->

**6. What does it decide, and what may it not decide?**

| Decision | Who decides | Who acts | Who approves |
|---|---|---|---|
| What new content changes in the situation | The AI, in understanding the situation; fixed code checks its sections | The worker | — |
| What to read, from where, in what order | The AI, in gathering's information plan; fixed code checks it and runs its steps | The tool layer, for each read | — |
| What the evidence says | Fixed code, by the business's rules | The worker | A person, when nothing else settles a conflict |
| The next step | The AI proposes, in deciding; fixed code checks; the worker writes it | The worker's acting stage, or the tool layer for an outside call | A named person, where the permission check asks for one |
| Which stage runs next, and whether the run stops | Fixed code, from what the stages wrote and the progress rule | The worker | — |
| What a link means for this situation | The worker | The worker | — |
| Whether to send a claim to another situation | The AI proposes; fixed code checks that the shared number came from records, the receiver may see it, and the pair's send count is not spent | The worker's fixed code, through intake | — |
| Whether to tell anyone | Not the worker: the conversation manager | The communication layer | — |

<!-- Section 7 additions: run steps; A15; IB-16; Level 2 trust: fixed code treats conflicts; E5; decided: the update decision; PL-11; PL-12; PL-13; PL-14; PL-15 -->

**7. What makes it change, and what makes it grow?**

It changes when the business changes how its work is handled (the refund setting, how long Tend waits for a carrier, a new procedure), or when a new kind of situation appears. This is the design's reading. <!-- change drivers: situation worker -->

It grows with the number of open situations; each runs on its own. Within one situation, its effort grows with the work: more gathering passes, more explore reads, more rounds, each bounded. <!-- Level 1: more situations; PL-2 -->

**8. What starts it, what does it read, and what does it hand on?**
- **Starts it:**
  - a notice of a new version: an arrival, an outside system's answer, or a platform rule change on a channel it is about to use;
  - a time signal it set for one of its waits, or the check-in.

  After a restart, it sets every time signal again from the book of waits. <!-- IB-1; IB-2; decided by the owner, 2026-10-17; decided 2026-10-22: the status-check answer; decided 2026-10-22: platform rule wake; decided 2026-10-22: the book of waits -->
- **Reads:**
  - the newest version of the situation;
  - memory and knowledge's package before understanding the situation, gathering and deciding, when each runs;
  - the trusted permission store, through the checks;
  - evidence from the tool layer, including a declared wait. <!-- IB-4; PL-17; AC-4; IB-7; decided 2026-10-22: the wait a tool declares -->
- **Hands on:**
  - what it holds at each package and each stage it reaches, to memory and knowledge;
  - claims for other situations, to intake;
  - new versions of the situation, whose notices wake the conversation manager's update decision. A work item for a person, too, is a new version;
  - calls to the tool layer, each a request for a step, never a change to the situation. <!-- Section 7: how the two parts work together -->

**9. How does it work inside?**

No timer asks an outside system again: the status-check service does the asking, and its answer, or the wait's time signal, wakes the worker. <!-- closed item: recheck timer -->

Every run passes through the same stages, in order. Fixed code decides, from what is in the record, whether each one runs or is passed. <!-- S1; PL-1 -->

1. **Waking** (fixed code).
   - It wakes on a change or a time signal.
   - A change already handled is dropped.
   - It runs one run per situation at a time, and finishes what was cut short, from the newest saved version.
2. **Understanding the situation** (AI, one structured answer).
   - **Runs** when the version holds something not yet placed.
   - **Passed** for a new situation (its arrival's understanding artifact is its first understanding), for typed results (code saves them as claims), and for an arrival with nothing to place (a status question).
   - **Package first:** the new content, word for word, flagged as outside text, with its understanding artifact; the business's events and words found in it; what memory and knowledge presented earlier in this situation.
   - **The AI writes:** what the content adds; which asks and waits it answers; what is now known, unknown or in conflict; whether routing looks wrong.
   - **Endings:** nothing new → the run rests. Routing looks wrong → the worker proposes a correction (re-route, split, link), and the run goes on or rests. <!-- C10; IB-23; PL-11 -->
3. **Gathering** (AI, plan, do and check; explore steps).
   - **Runs** when an unknown that matters to an open ask is open, or when deciding sent it back for a named need.
   - **Passed** when memory and knowledge's package maps every such unknown to an item that counts as evidence.
   - **Package first:**
     - the procedure pinned to this situation, and skills and tools filed under its kind;
     - the forms of tools that fit, with lessons filed under them;
     - what Tend already holds for each unknown;
     - other situations' typed fields, as the worker view rule allows.
   - **The AI writes or updates the information plan.** It reasons in a few turns at most; between turns, its questions go to memory and knowledge, and the answers come back before the next turn.
   - **Fixed code checks the plan:** its shape; its dependencies; that every tool it names was presented and is switched on.
   - **Then it runs the steps that can run now**, each a read through the tool layer or memory and knowledge's retrieval, or a question to a person, written into the version for the communication layer to send, with a wait for the answer. Each result is saved as a claim, with its source and time. An explore step reads until its target, its read limit, or the progress rule. <!-- D1; D2; D4; PL-12; N27 -->
4. **Weighing evidence** (fixed code).
   - **Runs** when new claims came in, from this round or from typed arrivals.
   - It compares claims field by field, sets each evidence state, applies the business's order of sources, and marks the actions a conflict blocks. <!-- E2; E5; PL-13 -->
5. **Deciding** (AI, one structured answer).
   - **Runs** in every round that reaches it.
   - **Package first:**
     - the work as first asked, word for word;
     - the procedure and the information plan;
     - every result, with its source;
     - each claim's state;
     - new arrivals;
     - other situations' waits this one might answer;
     - lessons.
   - **The AI proposes one next step**, by checking the work against what was first asked.
   - **Fixed code checks the proposal, in order:**
     1. its shape: its fixed form, and its limits;
     2. that it was made on the newest version. If not, it is thrown away, and the round starts again at understanding the situation;
     3. that every "answered" points to saved evidence from a source other than the AI;
     4. that every tool it names was presented in this run;
     5. then its permission. <!-- F7; F8; N27; IB-20; PL-14 -->
6. **Acting** (fixed code).
   - One fixed path for each kind of step: a call through the tool layer; a wait and its time signal; the communication intent written into the version; a work item; a claim handed to intake.
   - Before a step that cannot be undone, the intent is saved, and fixed code checks once more, just before it, that no newer version exists.
   - Results are saved as claims, and the new version is saved, if anything changed. <!-- S6; IB-8; IB-10; PL-15 -->
7. **Go round, or rest** (fixed code).
   - **Where the next round starts:** free text came back → understanding the situation; typed claims came back → weighing evidence; a named need → gathering.
   - **What counts as progress:** a round counts only if the record changed in one of five ways:
     - new evidence arrived;
     - a needed claim came from a source not yet asked in this wake;
     - a wait was written, refreshed, or finished;
     - an outcome was declared;
     - a permission changed.

     The AI's own report of progress never counts.
   - **A run ends in one of four ways:** it waits for one named thing; it records an outcome; it is blocked, with its reason shown; or it stops with work still in progress, for the next run. <!-- E9; PL-15 -->

**Before the work is recorded as resolved, the completion check runs:**
- every question has one of its six endings: answered; waiting, with a reason; passed to a person; "Tend cannot know this here", with the customer still answered; waived; or replaced by a newer question;
- no person's task is pending, an approval request included;
- no "Tend cannot know this here" answer is shown as a success;
- every claim told to a customer has evidence.

<!-- S2; E9; S6; IA-23; N21; F7; F8; N27; IB-20; PL-17 -->

```text
wake ─▶ drop repeats ─▶ one run at a time
   │
   ▼
[package] understanding the situation ── passed: new situation, typed result, nothing to place
   │  nothing new ─▶ rest
   ▼
[package] gathering: information plan; code runs the steps that can run now (reads; questions to people) ── passed: every unknown already answered
   │
   ▼
weighing evidence (fixed code) ── passed: no new claims
   │
   ▼
[package] deciding: the AI proposes ─▶ fixed code checks shape, newest version, evidence, tools, then permission
   │      badly formed: limited repair, then a new proposal
   │      Deny: this proposal ends, its reason kept
   │      a person must approve first: wait for that person
   ▼ Allow
acting (fixed code): one fixed path ─▶ save new version
   │
   ├── free text came back ─────▶ understanding the situation
   ├── typed claims came back ──▶ weighing evidence
   ├── a named need ────────────▶ gathering
   └── progress stopped, a wait written, or resolved ─▶ rest (wait, outcome, blocked, or work in progress)
```

In the drawing, **[package]** marks a point where the run waits for memory and knowledge's package. Weighing evidence and acting are fixed code; memory and knowledge observes them, and does not serve them. <!-- PL-17 -->

**10. How does it behave in each kind of situation?**

| Kind of situation | What the worker does | Walk |
|---|---|---|
| A customer asks a question a tool can answer (the common case) | Gathering reads it through the tool layer; weighing records the evidence; deciding writes what should be said | [how a situation moves](../behaviour_view/how_a_situation_moves.md) |
| 1. An irreversible action's outcome stays unknown | Acting saves the started refund, its unknown outcome, and the wait the refund tool declared, in one version, before the AI is told; when the provider's answer arrives, reads it through the refund tool's code; a person gets the timeline once the settle window ends; never repeats the refund | [kind 1](../behaviour_view/kind_01_unknown_result.md) |
| 2. An outside system is down, slow, or too stale | Waits inside the limit; writes an interim update before the promised time; records a failure past the limit | [kind 2](../behaviour_view/kind_02_outside_system_down.md) |
| 3. A partial answer arrives | Keeps each question apart; answers one; gives the other to a person | [kind 3](../behaviour_view/kind_03_partial_answer.md) |
| 4. One instruction fans out to many people | Runs each person's situation on its own | [kind 4](../behaviour_view/kind_04_one_to_many.md) |
| 5. No source and no person can answer | Gathering finds no source; deciding records that Tend cannot know this here (not a failure); only that question stops | [kind 5](../behaviour_view/kind_05_no_source.md) |
| 6. A timer and a reply race | Answers and cancels the wait in one version; a timer for a replaced wait does nothing | [kind 6](../behaviour_view/kind_06_timer_and_reply.md) |
| 7. An unrequested document or unknown event arrives | Understanding the situation reads the document as a claim, not an order; for an unknown event, creates work for a person | [kind 7](../behaviour_view/kind_07_unrequested_arrival.md) |
| 8. A message cannot be pinned to one situation | Not involved until the message is placed | [kind 8](../behaviour_view/kind_08_unclear_message.md) |
| 9. Two sources disagree | Weighing evidence keeps both claims, and fixed code decides what the conflict blocks; a person settles it if nothing else does | [kind 9](../behaviour_view/kind_09_sources_disagree.md) |
| 10. A person does not act, or is unavailable | Names the reason for the silence; cover first, then the escalation path | [kind 10](../behaviour_view/kind_10_person_silent.md) |
| 11. An action needs approval, or must be refused | Waits for the approver; writes an honest refusal | [kind 11](../behaviour_view/kind_11_approval_or_refusal.md) |
| 12. The world changes while work is open | Woken by the conversation manager when a platform rule changes on a channel it is about to use, it decides again under the new rule; keeps the policy version a situation started with | [kind 12](../behaviour_view/kind_12_world_changes.md) |
| 13. Who is speaking is unknown or unverified | Not involved; nothing is revealed | [kind 13](../behaviour_view/kind_13_unknown_speaker.md) |
| 14. Work is blocked, interrupted, or wrongly closed | Marks blocked with its reason; continues from the newest version after a restart; reopens a wrongly closed situation | [kind 14](../behaviour_view/kind_14_blocked_or_reopened.md) |
| 15. A human commitment changes shape | Books again inside each person's agreed times; handles a pending handoff | [kind 15](../behaviour_view/kind_15_human_commitment.md) |

<!-- decided: the fifteen kinds -->

**11. What are its key moments?**
- The refund on order 9912 that the payment provider never confirms (kind 1).
- Priya's reply two minutes before her follow-up (kind 6).
- Meera's carrier down past its limit (kind 2).
- Arjun's "the one I ordered in the Diwali sale": gathering reads his orders in the sale's date range; deciding asks him to confirm 8840.
- Nisha's research on "dark AMMs": explore steps establish the term before anything else.

**12. What happens when things go wrong?**
- A proposal with a bad shape gets a limited repair; then the AI proposes again. <!-- S2 -->
- A refused step ends that proposal, not the situation. <!-- AC-3 -->
- An information plan that names a tool not presented is refused by fixed code; gathering asks memory and knowledge instead, and the tool is presented in the next package if it fits. <!-- N27; PL-12 -->
- Past a wait's limit, its time signal wakes the worker, which declares the outcome: unknown for a step that cannot be undone, failure for a status no source answered. <!-- M2; Section 8: past the bound; closed item: recheck timer -->
- If the tool layer is down, the worker saves no change that depends on it. <!-- Section 7: failure and unavailability -->
- When no safe step is left and no one is left to escalate to, the situation is blocked, with its reason. <!-- Section 8 states -->
- A worker that crashes mid-run continues from the newest saved version; it does not start over. <!-- H6 -->
- Missing knowledge never blocks a decision: the worker treats the gap as something to gather, or as "Tend cannot know this here". If memory and knowledge's package does not arrive, the worker waits a set time, then gives the step to a person. If only its AI part fails, the package still carries the fixed items, and the worker goes on. <!-- Section 7: memory, missing memory; settled 2026-10-22: memory unreachable -->

**13. Which rules must always hold here?**

| Rule | How a break would show |
|---|---|
| The worker never sends | A message with no decision to send behind it |
| A wait a tool declares is saved before the AI is told | The AI told "the refund is waiting" while no wait is saved |
| A timer wakes only the worker, which reads the newest version first | Priya gets her follow-up after she already replied |
| A step that cannot be undone is never repeated on an unknown outcome | The refund on order 9912 paid twice |
| A guess is never stored as a fact | A claim with no source in the record |
| The AI's own report of progress never counts | A run that loops with nothing new recorded |
| Fixed code chooses which stage runs next; the AI never decides to continue | A run that goes round because the AI wrote "continue" |
| Every decision is made on the newest version | A refund whose decision named version 5 while version 6, with the customer's "cancel", was already saved |
| Every "answered" points to saved evidence from a source other than the AI | A situation resolved with an answer no tool, person, or record gave |
| Only presented tools are used | A call to a tool that was in no package of that run |
| Gathering reads, and asks people only for information; it takes no other step with an effect | A refund, or a message that is not a question, started from inside gathering |
| The worker never writes into another situation | A version in the warehouse team's situation written by Arjun's worker |
| New content is understood before the worker gathers or decides | A decision on Arjun's reply with no understanding of it saved first; research on "dark AMMs" that never established what the term means |

<!-- Section 10: the worker never sends; decided 2026-10-22: the wait a tool declares; IB-1; IB-4; IB-10; C2; E9; F7; F8; N27; IB-16; C10; IB-23; PL-1; PL-12; PL-15 -->

**14. What must be visible afterwards?**

Each run's trace:
- what woke it, and the version it read;
- which stages ran and which were passed, with why;
- each reasoning artifact and each check's result;
- the grant used, and what was done;
- the reason in business terms, and the outcome;
- where the run stopped.

No personal data goes into a trace. <!-- Section 8: the trace; settled page: no personal data in a trace; PL-1 -->

**15. How do we know it is built correctly?**

| Test | A failure looks like |
|---|---|
| A customer's "cancel" saved while the worker decides a refund stops the refund; the round starts again at understanding the situation | the refund paid after the cancel was saved |
| A claim for another situation arrives there only through intake, and a fourth send between the same pair within the configured window (24 hours by default) is refused | a version written straight into the other situation, or two workers sending to each other without end |
| A timer for a cancelled wait produces no message and no error | Priya gets her follow-up after she replied |
| A second refund proposed while the first is unknown is stopped by the check for an earlier attempt | two refund calls for order 9912 |
| A proposal that leaves out a required field is sent back as a shape failure, not as a refusal of permission | a missing field reported as "not allowed" |
| The worker never sets a situation to completed | a completed version written by the worker |
| After a crash mid-run, the situation continues from its newest version, and no step that cannot be undone is repeated | the run starting from the first version, or a refund sent again |
| Arjun's "yes that's it, pin is 411038" is understood before the next decision: his confirmation of 8840 and his pin-code claim are written first; weighing evidence then sets his pin against the order system's | a decision written straight from the raw message, or the conflict never seen |
| A document sent into an open situation is read against the full record before the next decision | a decision that ignores what the document contradicts |
| A status question with no new claim passes understanding the situation; gathering refreshes the stale claim | an AI call spent understanding a message that brought nothing new |
| A question the business's configured facts answer passes gathering | a tool called for what the business's own configuration already says |
| Gathering for Arjun's sale order reads his orders in 20 to 24 October, and leaves the carrier step waiting in the plan until the order is known | the carrier asked about both orders, or about none |

<!-- IB-4; IB-8; INV-6; decided by the owner, 2026-10-12: completed; H6; PL-11; PL-12; PL-13 -->

The cases are walked in the Level 2 [product loop tests](../../../Level%202/the_product_loop/the_product_loop_design_tests.md).

**16. What is still open?**

Nothing in this part is open.
- The values each business sets (wait limits, check-in intervals, its escalation path, currentness rules) come with its settings, with product defaults: deferred to configuration. <!-- Level 2 failure: the numbers -->
- The limits (turns per stage, reads per explore step, rounds per run) are deferred to Level 3, with starting values in the memory and knowledge design. <!-- PL-2 -->

**17. Where did this come from?**
- **Section 12:**
  - [the parts file](../boundary_view/the_parts.md) (the boundary decision);
  - [the interactions file](../interaction_view/the_interactions.md) (interactions 2, a timer wakes; 4, reading and calling an outside system; 5, a step that cannot be undone; 10, work for a person; 12, a meeting; 14, completed);
  - [the records file](../state_view/the_records.md);
  - [the rules that always hold](../constraint_view/the_rules_that_always_hold.md);
  - [the decisions file](../decision_view/the_decisions.md): decisions 1, 3, 7, 11, and 19, 20, 22, settled on 2026-10-22; 34 to 37, the product loop;
  - the responsibility view's [gathering](../responsibility_view/gathering_and_trust.md), [deciding](../responsibility_view/deciding_and_permission.md), [time and people](../responsibility_view/time_people_and_meetings.md), and [failure](../responsibility_view/failure_and_recovery.md) files.
- **Level 2:** [the product loop](../../../Level%202/the_product_loop/how_does_the_product_loop_work.md), part D.
