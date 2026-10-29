# Building Tend — the overview

This file answers one question: what do I build, part by part, and how do I know each part is right?

It is the starting point for whoever builds Tend. It gives the problem, the path every change takes, the parts, the kinds of situation each part must handle, who writes what, the order to build in, and how to read a part file. Each part then has its own file, which can be built from that file alone.

Each rule here has one of these statuses:
- **Decided:** the project owner — the person designing Tend, not the business owner — said yes. On 2026-10-22 the project owner accepted every recommendation this design had made, and asked for the smaller questions inside them to be settled in the way that best fits; those points are Decided, and points settled that day say so. A rule marked as "the design's reading" was worked out from its sources rather than found written down; it is Decided too. <!-- decided by the owner, 2026-10-22 -->
- **Provisional:** a working choice that carries a condition for reopening it.
- **Rejected:** turned down on purpose, with the reason kept.
- **Deferred:** a value or a detail left, on purpose, to a later stage — **deferred to configuration** (each business or market sets it), **deferred to Level 3** (the stage that chooses the technology), or **deferred to implementation** (whoever builds it). The rule around it is Decided.

Two earlier status words, **To confirm** (written down, but not yet agreed by the project owner) and **Open** (no answer yet), are no longer used: since 2026-10-22, no rule here carries either.

**Updated 2026-10-28.** The project owner replaced the earlier picture of memory with **memory and knowledge**: it runs beside every loop, each loop waits for its package before each part, it creates and maintains links, it keeps skills and procedures, and an outreach has a central situation instead of a board. Its file is [memory and knowledge](memory_and_knowledge.md). Those points are Decided. <!-- decided by the owner, 2026-10-28: memory and knowledge -->

A rule with no status word next to it is **Decided**: it has a source the project owner accepted. Every rule that is not Decided carries its word where it appears. In this file, "the business owner" means the person who runs the business Tend serves.

<!-- Every rule below carries its code in a hidden note. Its meaning, source, and status sit in code_index.md in this folder. -->

**Words used here.** **Tend** is the software this design describes. A **situation** is one operational problem, such as Meera's late parcel. **The AI** suggests a step; **fixed code** — code that always makes the same check — decides whether that step may run. A **version** is one saved state of a situation; a new version sends a short internal **notice**. A **wait** is a pause until one named thing happens; the **book of waits** lists every wait that may outlast its run, and is kept with the situation records. An **arrival** is anything that comes in from outside, saved as a new version. The **trusted permission store** is the one saved list of what the business allows. The **configurator** is the person who sets the business up: the business owner, or someone the business owner names. The **escalation path** is the business's own list of who to turn to next. A **walk** is one worked example of a kind of situation. <!-- A1; Level 2 security: the spine; HC-1; HC-3; decided 2026-10-22: the book of waits; AC-4; G7; J5 -->

**Words added 2026-10-29.**
- Tend's **product loop** is four loops, each made of **stages** a capable person would recognise:
  - the **arrival loop** (the conversation manager: intake, understanding the arrival, routing);
  - the **situation loop** (the situation worker: understanding the situation, gathering, weighing evidence, deciding, acting);
  - the **update loop** (the conversation manager: the update decision);
  - the **message loop** (the communication layer: writing, the send check, sending).
- A stage with nothing to do is **passed**, and a stage's finding may end the loop. Fixed code chooses, from what the stages wrote.
- **Understanding the arrival** writes an **understanding artifact** (until later on 2026-10-29, the "reading"): each ask and whether it is about the business; what each refers to, with time words turned into dates; the sender's claims; what is unknown; what Tend already holds that answers it; and where each ask fits. It is an interpretation, saved with the arrival, never a conclusion.
- **Routing** is fixed code that carries the understanding artifact out.

The Level 2 page is [how Tend's product loop works](../../../Level%202/the_product_loop/how_does_the_product_loop_work.md). <!-- PL-1; PL-3; PL-6 -->

**More words.** A tool **declares** a wait when its result states, in a fixed form, what is awaited, from whom, and what ends it. A **member** is a person who works for the business, proved by the sign-in provider the business uses (the outside service that checks who a person is when they sign in). A channel **bound** to a member shows only which channel a message came through, and names that member. A **capability** is one action Tend can take, such as checking where a delivery is; each business switches on the ones it wants. The **refund setting** is the largest refund that goes through without a person; it starts at zero. The **settle window** is the time an outside party promises for a result to become final. A wait's **time signal** is the alarm the situation worker sets for the wait's due time; it wakes only the worker. The **technology stage** is Level 3, where the technology is chosen part by part. The **observer** is a regular check that watches Tend itself; it runs alongside the parts and reports only. The **consent records** are the communication layer's saved record of each person's consent, for each contact point and kind of message. <!-- decided 2026-10-22: the wait a tool declares; decided 2026-10-22: identity and permission; accepted call: capabilities; decided by the owner, 2026-10-12: refund setting; Level 2 failure: the numbers; decided 2026-10-22: the book of waits; method: the build order; closed item: where the observer sits; decided 2026-10-22: consent records -->

This file adds no rule of its own. Every rule here already appears in one of the views. The one exception is the build order, which is a recommendation worked out from the views. <!-- method: the build view adds no rule -->

**Updated 2026-10-29: understanding comes first, and the loops are built from the product's stages.**
- **Why.** The project owner found that routing decided before "the Diwali sale" was understood. Later the same day: "the loops do not look natural to me … I am first and foremost a product engineer", and "Routing, I don't think would be much of a LLM thing."
- **The arrival loop.**
  - The conversation manager's one AI stage is understanding the arrival.
  - Routing is fixed code.
  - An arrival that is not about the business starts no situation, and is answered.
  - An arrival Tend can already answer is answered at once.
- **The situation loop** is understanding the situation, gathering, weighing evidence, deciding and acting, each run only when it has something to do.
- **Memory and knowledge** hands a package before each stage that reasons. It uses the business's own knowledge to help any stage understand, and shows each stage only the records inside its boundary.
- **The queue for arrivals** is per person.

<!-- C7; C8; C10; N34; N37; B10; PL-1; PL-2; PL-5; PL-6; PL-17 -->

## 1. The problem every part exists to solve

Tend keeps many business problems moving at once. Each one may run for days, across messages, outside systems, people, and time. Every step must be safe, and must be explainable afterwards. Nothing may be forgotten. An AI suggests each step; fixed code decides whether it may run. <!-- Level 1: the job; Level 2 security: the spine -->

For example, Meera's late parcel runs for three days, across her messages, the carrier's system, and the delivery employee — and at the end, Meera has her answer, and every step can be shown.

That wording of the problem is this design's own. <!-- build view: the problem sentence -->

## 2. The path every change takes

Every change travels the same product loop. A message arriving, a timer firing, and an outside system answering all take it; each stage runs only when it has something to do. <!-- method: the path every change takes; PL-1 -->

1. **A change arrives.**
   - A message goes to the conversation manager's intake step, which saves it, finds the person, and runs one arrival at a time per person.
   - A typed arrival with an exact reference (an answer the status-check service was waiting for, a claim from another situation) is placed by code where it points.
   - A time signal goes straight to the situation worker.

   For example, Meera writes: "Where is my parcel?" <!-- IB-1; IB-2; decided by the owner, 2026-10-17; decided 2026-10-22: the status-check answer; B10; PL-19 -->
2. **It is understood.** Before anything acts on it, the conversation manager's one AI stage, understanding the arrival, writes its understanding artifact.
   - **Memory and knowledge's package comes first:**
     - the sender's open situations, with their waits;
     - recent messages;
     - the business's events, words, places and configured facts found in the message;
     - earlier understanding artifacts;
     - the time.
   - **A past purchase or earlier work:** memory and knowledge narrows the sender's own situations by what understanding resolved, and the wider look chooses among them.

   <!-- N19; B5; C7; C8; N37; PL-3; PL-4 -->
3. **It ends, or is placed.** Fixed code chooses the ending from the artifact:
   - **not about the business** ("hi", a general question): no situation; the conversation manager replies; the message is kept in the person's message history, and memory and knowledge never learns from it;
   - **nothing to do** (a thank-you that answers nothing): no situation; kept in the message history;
   - **answered from what Tend holds** (a current claim in the sender's own situation, or a fact the business configured): routing places it, marked, and the conversation manager tells the person at once;
   - **hold and ask** (it cannot tell which situation is meant): a held note, which changes no situation, and a question to the sender;
   - **routed:** routing, which is fixed code, attaches the message to the situation it fits, starts a new one, or starts one per separate problem. It writes the result, with the artifact, as a new version.

   <!-- Section 8: routing outcomes; IB-6; B9; PL-5; PL-6; PL-7; PL-8; PL-10 -->
4. **The worker wakes** on the new version's notice, and reads the newest version first. <!-- IB-4 -->
5. **It runs the situation loop.**
   - **Understanding the situation**, when something new must be placed.
   - **Gathering**, when something that matters is unknown: its information plan names what to read, from where, in what order. Fixed code runs each read through the tool layer, and saves each result as a claim. When only a person can answer, gathering asks them, through the communication layer.
   - **Weighing evidence**, in fixed code, when new claims came in.
   - **Deciding**: the AI proposes one next step by checking the work. Fixed code checks its shape, that it was made on the newest version, its evidence, its tools, then its permission.
   - **Acting**, in fixed code, on that step's one fixed path:
     - gather more;
     - ask;
     - wait, or watch for a change;
     - tell;
     - create work for a person, or escalate;
     - arrange a meeting;
     - call an outside system through the tool layer;
     - record the work as resolved;
     - stop safely.

   Before each stage that reasons, memory and knowledge hands over a package. <!-- S1; S2; S3; F7; N19; Level 2 decision: behaviours; PL-11; PL-12; PL-13; PL-14; PL-15; PL-17 -->
6. **The worker writes the result** as a new version. <!-- Section 7 writer table: who writes what -->
7. **The conversation manager decides whether to tell** anyone. If so, the communication layer writes the message, after memory and knowledge's package (the recipient's preferences, the business's words, the channel's conventions, and lessons about writing to this kind of person). It checks the message, and sends it through the tool layer. <!-- decided: the update decision; Section 8: the send check; PL-16 -->
8. **The run ends in one of four ways:**
   - it waits for one named thing;
   - it records an outcome;
   - it is blocked, with its reason shown;
   - it stops with work still in progress, for the next run.

   When the work is resolved, the conversation manager sets the situation completed. <!-- S6; decided by the owner, 2026-10-12: completed --> For example, once the carrier answers and Meera's last message has gone out, her situation is completed.

The effort each change gets follows what it needs:
- "hi" uses one AI stage, and one more to write the reply;
- a question Tend already holds the answer to, the same;
- a late parcel that needs the carrier, four, each with its package;
- a research brief, as many rounds as the work needs, within limits.

<!-- PL-2 -->

Every step is recorded. The business owner's screens are built from those records. <!-- O7; O2 -->

The fifteen kinds of situation in section 5 are not separate paths. They are tests run against this one loop. <!-- method: the path every change takes -->

## 3. All the parts, and what each hands to which

```text
               a message, or an outside answer                  worth telling
 a person ─────────────────────▶ CONVERSATION MANAGER ─────────▶ COMMUNICATION LAYER ──▶ (through the tool layer) ──▶ a person
 STATUS-CHECK SERVICE ─────────▶   │  ▲    (intake step;            │
   (its answer, as an event)       │  │     update decision)        └── reads ──▶ CONSENT RECORDS (it writes them)
                     new version   ▼  │ notice
                    SITUATION RECORD + BOOK OF WAITS ◀─────────────────────── OWNER VIEW (reads, when asked)
                                   │  ▲
                            notice │  │ new version; each wait with its book entry
                                   ▼  │
 time signal (set by the worker) ▶ SITUATION WORKER ◀── a package before each stage that reasons ── MEMORY AND KNOWLEDGE
                                   │  ▲
                     checked call  │  │ evidence; a declared wait
                                   ▼  │
                               TOOL LAYER ──── one call ────▶ an outside system
                                 ▲ │   │
          the service's asks ────┘ │   └── reads ──▶ TRUSTED PERMISSION STORE, MEMBERSHIP ◀── writes ── CONFIGURATION
                                   │
   the saved wait's notice (read from the book of waits) ──▶ STATUS-CHECK SERVICE

 MEMORY AND KNOWLEDGE runs beside every loop: it also hands the conversation manager a package before understanding
 an arrival, and the communication layer one before writing. Each version's notice reaches it too (links, indexes, learning).
 Later, in the background: each run's trace ──▶ MEMORY AND KNOWLEDGE, IMPROVEMENT; the observer runs alongside every part
```

The diagram's lines are the hand-offs in the table below. The situation worker and the communication layer sit inside the conversation manager; they are drawn apart to show their hand-offs. The book of waits is data kept with the situation records; the worker writes it. The conversation manager reads the book — at the intake step, to match an arrival to the wait it ends, and after a platform rule change, to find the situations it affects. The status-check service reads it, to find each wait it serves. The owner view reads it, to show what each situation is waiting for. After a restart, the worker reads it, to set every time signal again. <!-- decided by the owner, 2026-10-10: what the conversation manager contains; decided 2026-10-22: the book of waits -->

| From | To | What passes |
|---|---|---|
| A person or system | Conversation manager | A message, or another arrival |
| Conversation manager | Situation record | A new version, with what came in |
| Situation record | Situation worker | A notice |
| A time signal the worker set | Situation worker | A due time or a check-in |
| Conversation manager, situation worker, communication layer | Memory and knowledge | At each point, what the loop holds: the arrival, the situation and version, the reasoning artifact just produced, with any questions for memory and knowledge; and what each stage that is fixed code did, for it to observe |
| Situation worker | Tool layer | A checked call |
| Tool layer | Trusted permission store and membership | A read, at the moment of the check |
| Configuration | Trusted permission store and membership | Grants, settings, members, and channel bindings, written through the configurator's fixed tools |
| Tool layer | Outside system | One call |
| Memory and knowledge | Conversation manager, situation worker, communication layer | A package before each stage that reasons: knowledge to use, or an explicit empty answer |
| Situation record | Memory and knowledge | Each version's notice, for its link keeper, indexer and learner |
| Situation worker | Conversation manager | A claim the worker decided to send to another situation, handed to intake as an arrival for that situation |
| Situation worker's fixed code | Conversation manager | In an outreach, each new version of a person's situation, handed to intake as an arrival for the central situation |
| Configuration | Memory and knowledge | The business's tool list, with each connected MCP server's captured tool list |
| Tool layer (the erasure tool, after its confirmation) | Memory and knowledge | A confirmed erasure, for its cleaner |
| Tool layer | Situation worker | Evidence; and, when it hands off the waiting after up to five asks, a declared wait in its result |
| Situation worker | Situation record | The declared wait, saved with the started step in one version, before the AI is told |
| Situation record | Status-check service | The saved wait's notice; the service reads the wait from the book of waits |
| Status-check service | Tool layer | Each ask, when the service decides to ask |
| An outside system | Status-check service | News the outside system sends on its own; no call goes out |
| Status-check service | Conversation manager | Its answer, as an event addressed to its wait |
| Product team | Communication layer | A channel's rule record, updated through a fixed tool; the update announces itself |
| Conversation manager | Situation record | After a platform rule change, one version in each situation with a step pending on that channel, read from the book of waits, at a steady pace |
| Situation record | Communication layer | The notice of an arrival that is an opt-in or an opt-out, which wakes the consent code |
| Situation worker | Situation record | What Tend concludes, as a new version |
| Situation record | Conversation manager | A notice |
| Conversation manager | Communication layer | Worth telling |
| Communication layer | Tool layer | The send |
| Communication layer | A person | A checked message |
| Communication layer | Sent record and consent records | What was sent, and each consent entry; each save announced like any other |
| A run's trace | Memory and knowledge, improvement, observer | Later, in the background |
| Memory and knowledge | Configurator | A proposed setting |
| Owner view | Situation record and book of waits | A read, when someone asks |
| Situation record | Owner view | The notice of a change that may be one of the four kinds of alert |
| Owner view | The business owner | An alert, without waiting to be asked |

<!-- IB-15; IB-16; IB-17; IB-18; IB-19; N27; Section 7: how the two parts work together; Section 8: which change starts which part; AC-4; M4; M5; settled 2026-10-22: the five per wait; IB-12; decided 2026-10-22: the wait a tool declares; decided 2026-10-22: the service calls through the tool layer; decided 2026-10-22: the status-check answer; construction record, entry 21: the service serves several layers; decided 2026-10-22: identity and permission; decided 2026-10-22: platform rule wake; decided 2026-10-22: consent records; O3 -->

## 4. The parts, one line each

| Part | What it is | Its file |
|---|---|---|
| Situation record | The saved history of one problem, kept as a list of versions | [situation record](situation_record.md) |
| Situation worker | Decides the next step for one problem, and writes what Tend concludes | [situation worker](situation_worker.md) |
| Conversation manager | Takes each arrival, puts it on the right problem, decides whether a person should hear an update, and sets completed. It contains the intake step, the situation worker, and the communication layer. | [conversation manager](conversation_manager.md) |
| Communication layer | Shapes, checks, sends, and records each message; keeps the consent records | [communication layer](communication_layer.md) |
| Tool layer | The only way Tend calls an outside system | [tool layer](tool_layer.md) |
| Status-check service | Waits on an outside system while the work goes on | [status-check service](status_check_service.md) |
| Memory and knowledge | Runs beside every loop and hands each part the context it needs; finds knowledge; creates and maintains links; keeps skills, procedures and learned knowledge; learns. Decides nothing | [memory and knowledge](memory_and_knowledge.md) |
| Configuration | The business's settings, permissions, and members, written only by the configurator's fixed tools | [configuration](configuration.md) |
| Owner view | The screens people open, built from the records when asked | [owner view](owner_view.md) |
| Improvement | Learns from checked records of past runs, to improve the product | [improvement](improvement.md) |

<!-- Section 11 §5: the parts table; decided by the owner, 2026-10-10: what the conversation manager contains -->

The observer watches Tend itself and reports what it finds. It is not one of the ten parts: it is a regular check that runs alongside them. Its checks are described in [the rules that always hold](../constraint_view/the_rules_that_always_hold.md). <!-- Section 7: the observer; changed call: the observer's seat -->

## 5. What each part does in each kind of situation

A **kind of situation** is a class of case in which at least one part behaves differently than in the common case. Each kind has its walks in the behaviour view, linked from the kind's name. Each part file has the full row for its part. <!-- decided: the fifteen kinds -->

"—" means the part is not involved beyond the common path.

The table is split in two, so each half can be read on a narrow screen.

**The record, the conversation manager, the worker, the communication layer, and the tool layer**

| Kind | Situation record | Conversation manager | Situation worker | Communication layer | Tool layer |
|---|---|---|---|---|---|
| [1. An irreversible action's outcome stays unknown](../behaviour_view/kind_01_unknown_result.md) | Holds the step started, its unknown outcome, and the wait the tool declared, saved together in one version | Decides the customer should hear the business is waiting | Records the outcome unknown; waits; a person gets the timeline after the settle window | Sends the honest update | Checks for an earlier attempt; writes its note before the call; makes one call; asks up to five times for the wait; declares the wait in its result, which the worker saves; makes the status-check service's asks; never repeats |
| [2. An outside system is down, slow, or too stale](../behaviour_view/kind_02_outside_system_down.md) | Holds the wait, then the declared failure | Decides the interim update is worth telling | Waits inside the limit; writes an interim update before the promised time; records a failure past the limit | Sends the interim update | Retries a brief failure; does not keep calling a service that stays down |
| [3. A partial answer arrives](../behaviour_view/kind_03_partial_answer.md) | Holds each question apart | Decides the partial answer is worth sending | Keeps each question apart; answers one; gives the other to a person | Sends the known part, said as partial | Returns each source's answer as evidence; runs the approval for a disclosure |
| [4. One instruction fans out to many people](../behaviour_view/kind_04_one_to_many.md) | Holds one situation per person, and one central situation | Creates one situation per person and one central situation; saves each person's update as an arrival on the central situation; tells the business owner only what is material | Runs each situation on its own; the central situation's worker keeps the overall progress | Sends each first message under the first-contact rules | Makes each send as its own checked call |
| [5. No source and no person can answer](../behaviour_view/kind_05_no_source.md) | Holds the "cannot know this here" declaration | Decides the honest answer is worth telling | Records "Tend cannot know this here", for that question only | Sends the honest answer | Finds no connected source that can answer |
| [6. A timer and a reply race](../behaviour_view/kind_06_timer_and_reply.md) | Holds Priya's reply as its own version, then the answer and the cancelled wait in one version | Records the reply first | Answers and cancels the wait in one version; the late timer finds nothing | Sends the answer | — |
| [7. An unrequested document or unknown event arrives](../behaviour_view/kind_07_unrequested_arrival.md) | Holds the filed document, as a claim | Files the document; a person sees it if nothing matches | Records it as a claim, not an order; for an unknown event, creates work for a person | Sends nothing for the document | — |
| [8. A message cannot be pinned to one situation](../behaviour_view/kind_08_unclear_message.md) | Not involved: the held note sits in the conversation manager's record of held notes, and no situation changes | Writes a held note; asks the sender | — | Sends the question | — |
| [9. Two sources disagree](../behaviour_view/kind_09_sources_disagree.md) | Holds both claims and the conflict | Decides the honest interim message is worth telling | Keeps both claims; fixed code decides what the conflict blocks; a person settles it if nothing else does | Sends an honest interim message | Returns each source's answer as evidence; never decides which is right |
| [10. A person does not act, or is unavailable](../behaviour_view/kind_10_person_silent.md) | Holds the work item and each escalation step | Records the answer when it comes | Names the reason for the silence; cover first, then the escalation path | Sends reminders and escalations | Makes those sends |
| [11. An action needs approval, or must be refused](../behaviour_view/kind_11_approval_or_refusal.md) | Holds the refusal's reason, or the approved step | Saves the approver's answer as an arrival; decides whether to tell the person about a refusal | Waits for the approver; writes an honest refusal | Sends the request to the approver; sends the refusal | Runs the permission check and the approval step; checks again before acting; returns a refusal with its reason |
| [12. The world changes while work is open](../behaviour_view/kind_12_world_changes.md) | Holds the policy version each situation started with; after a platform rule change, the version the conversation manager wrote in each affected situation | Wakes the situations with a step pending on a channel whose platform rule changed, read from the book of waits | Once woken, re-plans under the new rule | Applies the new channel rule at the send | Reads the permission store at each call |
| [13. Who is speaking is unknown or unverified](../behaviour_view/kind_13_unknown_speaker.md) | Not involved: the held note sits in the conversation manager's record of held notes; the customer's situation does not change | Fixes the business and sender from what can be checked: a sign-in proves a person; a bound channel proves only the channel; reveals nothing | — | Sends a reply that reveals nothing | A read that would reveal information passes the permission check |
| [14. Work is blocked, interrupted, or wrongly closed](../behaviour_view/kind_14_blocked_or_reopened.md) | Holds the blocked state, the reopen mark, and the newest version for a restart | Decides at intake whether a closure was wrong; completes a blocked situation the business stops | Reopens the same record; continues from the newest version after a restart; marks blocked | — | Its note stops a step that cannot be undone from running twice |
| [15. A human commitment changes shape](../behaviour_view/kind_15_human_commitment.md) | Holds each meeting event and each handoff | Records each person's answer | Books again inside agreed times; handles a pending handoff | Sends the new time, and handoffs | Makes the calendar calls |

**The status-check service, memory and knowledge, configuration, the owner view, and improvement**

| Kind | Status-check service | Memory and knowledge | Configuration | Owner view | Improvement |
|---|---|---|---|---|---|
| 1. Outcome unknown | Waits on the provider's news; asks through the tool layer; sends its answer as an event | Before each decision, presents the intent record, the unknown outcome and the wait; a planted note grants nothing | Holds the refund setting the refund was checked against | Shows the refund waiting, with its timeline once a person must decide | Not involved while it runs |
| 2. Outside system down | Waits on the system; when its asking runs out, the wait's time signal wakes the worker, which declares the outcome, and the escalation path runs | Presents the source's last claim as stale, with its time; never as current | Holds the wait limits and the escalation path | Shows the wait; alerts when a deadline is at risk | Not involved while it runs |
| 3. Partial answer | — | Presents the work as first asked, so each question is marked answered, partly, or not yet | — | Shows what is answered and what is open | Not involved while it runs |
| 4. One to many | — | Links each person's situation to the central situation; gives each worker only what its situation needs | — | Shows the central situation, with each person's state one step away | Not involved while it runs |
| 5. No source | — | Says what was not found, and never fills a gap; if no package arrives, the step waits a set time, then goes to a person | Shows a missing capability as a gap | Shows the honest answer given | Not involved while it runs; the product team sees how often each missing capability is asked for |
| 6. Timer and reply | — | A package is for one version; a decision on an older version is made again | — | — | Not involved while it runs |
| 7. Unrequested arrival | — | Indexes the document with its situation's view; presents it quoted and flagged as outside text | — | Shows a document that matched nothing | Not involved while it runs |
| 8. Unclear message | — | Presents every situation that could fit, with the total and what tells them apart; never picks | — | — | Not involved while it runs |
| 9. Sources disagree | — | Presents both claims, standing "in conflict"; never settles one | Holds the business's own source order, where set | Shows both claims and the conflict | Not involved while it runs |
| 10. Person silent | — | Presents the work item, the escalation path, and lessons about handing work to people | Holds the cover rules and the escalation path | Alerts on work that has gone past everyone | Not involved while it runs |
| 11. Approval or refusal | — | Presents the tool's form with its confirmation rule; cannot grant anything; a skill's text cannot either | Holds the grants, the refund setting, and membership; refuses a clerk's change to what the business allows; the approver signs in fresh | Alerts on a decision only the business owner can make | Not involved while it runs |
| 12. World changes | — | Presents the channel's new rule; keeps the pinned procedure; marks ended events past; a run keeps its skill version | Records the change: a policy stays at each open situation's version; another setting is not re-checked; a removed grant stops at once | Alerts the business owner to each policy choice | Not involved while it runs |
| 13. Unknown speaker | — | Searches only the unknown sender's own view; a typed number opens nothing; never decides two records are one person | Holds membership and channel bindings, which the intake step reads to fix who sent a message | — | Not involved while it runs |
| 14. Blocked or reopened | Its waits stay in place across a restart | A closed situation informs a new one only through a link, or when understanding the arrival says the message refers to the past | — | Shows a blocked situation to the business owner, with its reason, as a decision only they can make | Not involved while it runs |
| 15. Human commitment | — | Presents the commitment as recorded, and who is responsible now | Holds the meeting limits, waivers, and expiry rules | Shows the counts of missed meetings | Not involved while it runs |

<!-- decided: the fifteen kinds; behaviour view kinds 1–15; N19; N20; N34; A15; IB-17; M5; Section 8: past the bound; closed item: who wakes situations after a platform change; decided 2026-10-22: platform rule wake; IB-11; decided 2026-10-22: identity and permission -->

## 6. Who writes what

| Record, or change to a situation | The one part allowed to write it |
|---|---|
| The first version of a new situation; the understanding artifact of each arrival that carries words, an interpretation; each reply decision, saved with its arrival in the person's message history; each arrival — an incoming message, a person's answer, an outside system's answer such as the status-check service's; whether an update is worth telling; one version in each situation affected by a platform rule change; completed | Conversation manager |
| Its understanding of new content; the information plan; gathered facts and claims; conflicts; corrections; the next step; what should be said; waits that may outlast their run, each with its entry in the book of waits — including a wait a tool declares; what an outside answer means; outcomes; the work recorded as resolved; work for a person; a claim to send to another situation | Situation worker |
| The sent record, and delivery receipts; consent records | Communication layer |
| The status-check service's record of asks for each wait it serves | Status-check service |
| The state of each call's tries; the note before a step that cannot be undone; connection codes | Tool layer |
| Links between situations; learned items (lessons, business words, business events, learned subjects, proposed settings); skills and procedures; its indexes; its record of what it presented; a confirmed erasure, carried out everywhere | Memory and knowledge |
| Grants, settings, compliance settings, membership, channel bindings, and each connected MCP server's captured tool list | Only fixed tools the configurator uses |
| The channel rule records, which the communication layer holds; the list of tools | The product team |
| Nothing | Owner view |

<!-- Section 7 writer table: who writes what; decided 2026-10-22: the wait a tool declares; decided 2026-10-22: the status-check answer; decided 2026-10-22: platform rule wake; decided 2026-10-22: consent records; settled 2026-10-22: the service's own list; decided 2026-10-22: identity and permission; L1 -->

The full table, with every record and every change of state, is in [the records file](../state_view/the_records.md). Only the conversation manager sets a situation to completed. <!-- decided by the owner, 2026-10-12: completed -->

## 7. The order to build in

This order is a recommendation. It is worked out from which part reads what another part writes. The technology stage may change it for technical reasons, and records why. <!-- method: the build order -->

1. **The situation record, with the book of waits kept beside it.** Most parts depend on it: the conversation manager and the situation worker write to it; the communication layer, memory and knowledge, and the owner view read from it. <!-- build order: 1; decided 2026-10-22: the book of waits -->
2. **Configuration, at its smallest:** the trusted permission store, membership, and a first set of grants and settings. The permission check reads it before any call or send. <!-- build order: 2 -->
3. **The conversation manager's arrival loop:** intake; understanding the arrival (its understanding artifact and its endings); routing, as fixed code; the reply decision. <!-- build order: 3; C8; PL-3; PL-5; PL-6; PL-8 -->
   **Memory and knowledge's two fixed parts, at their smallest.** Every stage that reasons waits for a package, so the first slice needs one. The fixed parts' exact lookups, with an explicit empty answer where nothing fits, are enough for the first slices:
   - the sender's open situations;
   - the business's listed words and events, found by exact name or alias;
   - its configured facts;
   - the situations holding a value understanding resolved;
   - the newest version, the information plan and the results;
   - the time.

   <!-- build order: memory and knowledge fixed parts; N19; N22 -->
4. **The situation worker's situation loop:** understanding the situation, gathering, weighing evidence, deciding and acting, with the fixed checks on each artifact. <!-- build order: 4; PL-11; PL-12; PL-13; PL-14; PL-15 -->
5. **The tool layer:** one connected system, the permission check, and the record of each call. <!-- build order: 5 -->
6. **The communication layer:** one channel, the send check, the sent record, and the consent records. <!-- build order: 6 -->
7. **The status-check service.** <!-- build order: 7 -->
8. **The owner view.** <!-- build order: 8 -->
9. **The rest of memory and knowledge:** its AI part, its retrieval capability, its link keeper, indexer, link finder, learner and cleaner, and skills in object storage. Until then, packages hold only the fixed parts' items. If no package arrives, the loop waits a set time, then the step goes to a person. <!-- build order: 9; N31 -->
10. **Improvement.** It only reads past records. <!-- build order: 10 -->

The book of waits is built with the situation record, in step 1; the third later slice is the first to use it. <!-- closed item: book of waits holder -->

**The first thin slice** is the smallest end-to-end path that does something real: a message arrives, it is understood and attached to a situation, the worker decides a reply, the reply is sent, and every step is recorded. Its first test is "hi": understood, answered, and no situation created. It touches the situation record, a minimal configuration, the intake step, memory and knowledge's fixed parts, the worker, the tool layer, and the communication layer — only the minimum of each. <!-- method: the first thin slice; build order: thin slice -->

Each later slice adds one kind of situation from section 5, and is checked against that kind's walk before the next one starts. A slice that needs a part not yet built brings that part in, in the order above. A suggested order, starting with the kinds that need only the thin slice's parts: <!-- method: the first thin slice; build order: later slices -->
1. kind 8, a message that cannot be pinned to one situation;
2. kind 5, no source and no person can answer;
3. kind 6, a timer and a reply race, the first to use the book of waits and its time signals;
4. kind 2, an outside system is down, which brings in the status-check service;
5. kind 1, an irreversible action's outcome stays unknown;
6. kind 11, an action needs approval, or must be refused;
7. kind 3, a partial answer;
8. kind 10, a person does not act;
9. kind 15, a human commitment changes shape;
10. kind 9, two sources disagree;
11. kind 13, who is speaking is unknown;
12. kind 4, one instruction fans out to many people, which brings in the central situation and memory and knowledge's link keeper;
13. kind 7, an unrequested document or unknown event, which brings in memory and knowledge's indexer and retrieval;
14. kind 12, the world changes while work is open;
15. kind 14, work is blocked, interrupted, or wrongly closed.

## 8. How to read a part file

Every part file has the same seventeen questions, in the same order. A builder who has read one part file knows where to find anything in any other. <!-- method: the part-file questions; decided: the part-file shape -->

1. **What is this part for?** One sentence, then a few plain lines.
2. **Why is it a separate part?** Why it was not merged with a neighbour, with a link to the boundary decision.
3. **What does it do?** Its responsibilities.
4. **What does it never do?** What it must refuse, even when it looks convenient.
5. **What does it own and write?** Its records, the changes it may write, and the life it controls.
6. **What does it decide, and what may it not decide?** Who decides, who acts, and who approves.
7. **What makes it change, and what makes it grow?**
8. **What starts it, what does it read, and what does it hand on?**
9. **How does it work inside?** Its steps, in order, with a small diagram.
10. **How does it behave in each kind of situation?** One row per kind, with a link to its walk.
11. **What are its key moments?** The hand-off sequences where it plays a central role.
12. **What happens when things go wrong?**
13. **Which rules must always hold here?** Each rule, and how a break would show.
14. **What must be visible afterwards?** What must be recorded so that what happened can be rebuilt.
15. **How do we know it is built correctly?** What a builder can watch happen, and what a failure would look like.
16. **What is still open?** Open questions, working choices, and values each business or market sets.
17. **Where did this come from?** Links to the views and the decisions.

A part file at this stage says what the part must do, not what technology builds it. The technology stage adds its own sections to the same file: how the part is built, where its records live, how it runs, its tests, and how it is checked once live. <!-- method: what Level 3 adds -->

## Open questions, and what is set later

Nothing in the design is open. The build order and the order of later slices are this design's recommendation; the technology stage may change them for technical reasons, and records why. Each part file lists, under question 16, the values its part needs from each business or market. <!-- method: the build order -->
