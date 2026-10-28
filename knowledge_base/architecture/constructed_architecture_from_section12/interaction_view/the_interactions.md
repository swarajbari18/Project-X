# How Tend's parts work together

This file answers one question: how do Tend's parts cooperate?

Tend is built from ten parts, described in [the parts file](../boundary_view/the_parts.md). This file lists each way the parts work together. For each one, it says:
- **Starts it:** what starts it, and who.
- **Goes to:** which part receives it.
- **Carries:** what information crosses.
- **Decides:** what is decided, and by whom.
- **Changes:** what is written, and by whom.
- **If it fails:** what happens instead.
- **Comes back:** what returns, and to whom.

Each rule here has one of these statuses:
- **Decided:** the project owner — the person designing Tend, not the business owner — said yes. On 2026-10-22 the project owner accepted every recommendation this design had made, and asked for the smaller questions inside them to be settled in the way that best fits; those points are Decided, and points settled that day say so. A rule marked as "the design's reading" was worked out from its sources rather than found written down; it is Decided too. <!-- decided by the owner, 2026-10-22 -->
- **Provisional:** a working choice that carries a condition for reopening it.
- **Rejected:** turned down on purpose, with the reason kept.
- **Deferred:** a value or a detail left, on purpose, to a later stage — **deferred to configuration** (each business or market sets it), **deferred to Level 3** (the stage that chooses the technology), or **deferred to implementation** (whoever builds it). The rule around it is Decided.

Two earlier status words, **To confirm** (written down, but not yet agreed by the project owner) and **Open** (no answer yet), are no longer used: since 2026-10-22, no rule here carries either.

A rule with no status word next to it is **Decided**: it has a source the project owner accepted. Every rule that is not Decided carries its word where it appears. In this file, "the business owner" means the person who runs the business Tend serves.

<!-- Every rule below carries its code in a hidden note. Its meaning, source, and status sit in code_index.md in this folder. -->

## Words used here

The parts:
- The **situation record** is the saved list of versions for one situation. <!-- Section 7: the parts table -->
- The **conversation manager** does four things: it takes in each arrival; it puts the arrival on the right situation; it decides whether a person should hear an update; and it alone sets a situation to completed. Its **intake step** is the fixed first step that reads each new arrival. An **arrival** is anything that comes in from outside: a person's message, an outside system's answer, a platform's news. <!-- Section 7: the parts table; decided 2026-10-22: the status-check answer -->
- The **situation worker** works one situation through the **situation loop**: understanding what is new, gathering, weighing evidence, deciding, acting; and it writes what Tend concludes. <!-- Section 7: the parts table; PL-1 -->
- The **communication layer** checks, sends, and records each message, and keeps the consent records. <!-- Section 7: the parts table; decided 2026-10-22: consent records -->
- The **tool layer** is the only way Tend calls an outside system: a payment provider, a carrier (the delivery company), or a messaging channel. <!-- Section 7: tool layer -->
- The **status-check service** waits on an outside system while the work goes on. <!-- decided by the owner, 2026-10-17 -->
- **Memory and knowledge** runs beside every loop. Before each stage that reasons, it hands that stage a **package**: knowledge to use, or an explicit empty answer. It keeps the links between situations, and what Tend learned. <!-- Section 7: memory and knowledge -->
- **Configuration** holds the business's settings, permissions, and members. The **configurator** — the business owner, or someone the business owner names — changes them, through fixed tools. <!-- Section 7: configuration; decided 2026-10-22: identity and permission -->
- The **owner view** builds the screens people open. <!-- Section 7: the parts table -->
- **Improvement** is how the product team makes Tend behave better for every business, from records of past runs. <!-- Section 7: improvement -->

Not a part: the **observer**, a regular check that runs alongside the parts and watches Tend itself. <!-- Section 7: the observer -->

The other words:
- A **situation** is one problem, such as Meera's late parcel. Each change to it is a new **version**. A new version sends a short internal **signal**, called a notice; people never see it. <!-- A1; HC-1 -->
- A **wake** is a signal that sends the situation worker back to one situation: a saved version's notice, a time signal, or the check-in.
- A **run** is one pass of the situation worker over one situation.
- **The AI** writes a **reasoning artifact** in the stages that reason; in deciding, it proposes a next step, called a **proposal**. **Fixed code** (code that always makes the same check) checks it. The AI never decides alone, and never decides to continue. <!-- Level 2 security: the spine; PL-1 -->
- Tend's **product loop** is four loops made of **stages** (added 2026-10-29): the **arrival loop** (the conversation manager: intake, understanding the arrival, routing), the **situation loop** (the worker), the **update loop** (the update decision), and the **message loop** (the communication layer). A stage with nothing to do is passed; a stage's finding may end the loop. <!-- PL-1 -->
- **Understanding the arrival** is the conversation manager's one AI stage. It writes an **understanding artifact** before anything acts on an arrival: each ask and whether it is about the business, what each refers to, what Tend already holds that answers it, and where each ask fits. **Routing** is the fixed code that carries it out. <!-- PL-3; PL-6 -->
- A **wait** is a pause on a situation until one named thing happens. The **book of waits** lists every wait that may outlast its run, and what will end it; it is data kept with the situation records. A **time signal** is the alarm the worker sets for one wait's due time; it wakes only the worker. A **check-in** is the one regular wake each waiting situation gets, in case an earlier wake was lost. A **follow-up** is a message Tend has planned to send later, held as a wait. <!-- HC-3; decided 2026-10-22: the book of waits -->
- A **channel** is one way of reaching a person: WhatsApp, email, Telegram, or the website chat. <!-- L1 -->
- **Evidence** is what an outside system said, with its source and time. <!-- IB-7 -->
- "**Tend cannot know this here**" means no system and no person can answer a question. <!-- O10 -->
- The **permission check** is the fixed check before every step that changes anything outside Tend, or reveals information. It answers Allow, Deny, or "a person must approve first". <!-- T2 -->
- A **grant** is a range of steps a business allows Tend to take without asking. <!-- T3 -->
- The **update decision** is the conversation manager's choice: is this change worth telling this person now? <!-- decided: the update decision -->
- A **work item** is a task for one named person: what is needed, who answers for it, the deadline, and the evidence so far. <!-- IA-14 -->
- The **completion check** is a fixed check before a situation is resolved: <!-- IA-23 -->
  - each question has one of six endings: answered; waiting, with a reason; passed to a person; "Tend cannot know this here", with the customer still answered; waived; or replaced by a newer question;
  - no person's task is pending, an approval request included;
  - a "Tend cannot know this here" answer is not shown as a success;
  - every claim told to a customer has evidence behind it.
- The **escalation path** is the business's own list of who to turn to next when work is not done. <!-- J5 -->
- A **trace** is the saved record of what happened during one run.

The people in the examples: Meera, Priya and Arjun are customers. Kabir is the business's employee who handles deliveries.

**Updated 2026-10-28.** Memory and knowledge now runs beside every loop: before each part of a loop, the loop waits for its package (interaction 3). It creates and maintains links (interaction 20). A claim can be sent from one situation to another (interaction 24). An outreach has a central situation (interactions 17 and 25). Erasure runs only through a confirmed tool (interaction 26). <!-- decided by the owner, 2026-10-28: memory and knowledge -->
- The **understanding artifact** (until later on 2026-10-29, the **reading**) is what understanding the arrival, the conversation manager's one AI stage, writes before anything acts on an arrival: each ask and whether it is about the business; what each refers to, with time words turned into dates; the sender's claims; what is unknown; what Tend already holds that answers it; and where each ask fits. It is an interpretation, saved with the arrival, never a conclusion. (The status label "the design's reading" is a different thing: a rule worked out from its sources.) (Added 2026-10-29.)
- A **package** is what memory and knowledge hands a stage before it runs: knowledge to use, or an explicit empty answer. Packages come before the stages that reason, and are named by the stage: "the package before deciding". (The codes R1 to R3, W0 to W3 and C1 used earlier on 2026-10-29 are replaced.) <!-- PL-17 -->
- A step's **boundary** is the set of records it may be shown to act on, set by fixed code: for understanding the arrival (and so routing), the sender's own records; for the worker, its own situation in full, and other situations' typed fields where the worker view rule allows. The business's own knowledge (events, words, procedures, lessons) is not limited by it. A person's **view** is what that person may see, and so what they may be told. (Added 2026-10-29.)

## At a glance

| # | Interaction | Starts when | Ends with |
|---|---|---|---|
| 1 | A message arrives | A person writes | Understood first; then it joins a situation, starts one, is held, or is answered at once from what Tend holds |
| 2 | A timer or check-in wakes a situation | A wait's time comes | The worker's next step, or nothing if the wait was replaced |
| 3 | Memory and knowledge hands a stage its package | A loop reaches a stage that reasons: understanding the arrival; the wider look; understanding the situation; gathering; deciding; writing a message | The package: knowledge to use, or an explicit empty answer. Records shown stay inside the step's boundary; every item says who may be told it |
| 4 | The worker reads from, or calls, an outside system | A step of gathering's information plan (a read), or a checked proposal (a step) | Evidence, never an instruction |
| 5 | A step that cannot be undone | A refund is proposed | Checked, noted, then sent; if the result is unknown, Tend waits |
| 6 | A long wait handed on | A tool's few checks have no answer | The tool declares the wait; the service's answer comes back as an arrival |
| 7 | A person must approve first | The permission check asks for approval | A named person says yes or no |
| 8 | Telling a person | The worker writes what should be said | A checked message, and the sent record |
| 9 | A delivery receipt | The channel reports delivery | Added to the sent record |
| 10 | Work for a person | A person is needed | Their answer, recorded |
| 11 | Contacting a partner | The escalation path reaches a partner | The partner's answer |
| 12 | Arranging a meeting | A meeting is needed | The meeting's outcome creates the next work |
| 13 | A correction | Something said is now misleading | A corrected message, with the old version kept |
| 14 | A situation is completed | The work is resolved | Only the conversation manager sets completed |
| 15 | A closed situation is reopened | A message says the same problem came back | The same record runs again |
| 16 | A document nobody asked for | A document arrives unasked | Filed, and nothing else done |
| 17 | One instruction for many people | A list of people | One situation per person, and one central situation linked to all of them |
| 18 | A person withdraws consent | "STOP", or "stop contacting me" | What was withdrawn stops, from the very next send |
| 19 | Traces go to memory and knowledge, improvement, and the observer | A run's trace is saved | Lessons learned later; no situation changed |
| 20 | Memory and knowledge creates a link, or proposes a setting | A shared number in two situations' records; a candidate setting in past work | A link, as memory and knowledge's own record; a setting checked by the configurator |
| 21 | A setting or a rule changes | A new setting or platform rule | Open situations affected only as the kind of change allows; after a platform rule change, the affected situations are woken at once |
| 22 | The business owner opens a screen | Someone asks to see the work | A screen built fresh from the records |
| 23 | The observer reports | Its own checks | The product team's screens |
| 24 | A claim is sent to another situation | A worker decides another situation waits for what this one holds | An arrival in the other situation, whose worker decides what it means |
| 25 | A person's update reaches the central situation | A new version of a person's situation in an outreach | An arrival on the central situation; the business owner hears only what is material |
| 26 | A person's data is erased | The law requires it, and the AI proposes it in the erasure tool | The owner's or configurator's yes, then the erasure everywhere the data lives |
| 27 | An arrival that is not about the business | "hi", a general question, a sum | A reply that says nothing about the business; no situation; nothing learned |

## The whole picture

Each row is one hand-off: who passes what to whom. This is the common route; the numbered sections cover the rest.

| From | To | What passes |
|---|---|---|
| A person or system | Conversation manager | An arrival |
| Conversation manager | Situation record | A new version, with what came in |
| Situation record | Situation worker | A notice |
| A time signal the worker set | Situation worker | A due time or a check-in |
| Conversation manager, situation worker, communication layer | Memory and knowledge | At each point, what the loop holds: the arrival, the situation and version, the reasoning artifact just produced; and what each stage that is fixed code did, for it to observe |
| Memory and knowledge | Conversation manager, situation worker, communication layer | A package before each stage that reasons |
| Situation record | Memory and knowledge | Each version's notice, for links, indexes and learning |
| Situation worker | Tool layer | A read from gathering's information plan, or a checked call from acting |
| Tool layer | Trusted permission store | A read at the moment of the check; only configuration writes this store |
| Tool layer | Outside system | One call |
| Tool layer | Situation worker | Evidence |
| Tool layer | Situation worker | A declared wait, when the tool hands off the waiting |
| Situation record | Status-check service | The saved wait's notice; the service reads the wait from the book of waits |
| Status-check service | Tool layer | An ask, when the service decides to ask |
| Status-check service | Conversation manager | Its answer, as an event addressed to its wait |
| Conversation manager | Situation record | The answer, saved as an arrival |
| Situation worker | Situation record | What Tend concludes, as a new version |
| Situation record | Conversation manager | A notice |
| Conversation manager | Communication layer | Worth telling: the update decision, recorded, asking it to send what the worker saved; or a reply decision, saved with an arrival |
| Communication layer | Tool layer | The send |
| Communication layer | A person | A checked message |
| A run's trace | Memory and knowledge, improvement, observer | Later, in the background |
| Memory and knowledge | Configurator | A proposed setting |
| Owner view | Situation record | A read, when someone asks |

<!-- IB-15; IB-18; Section 7: how the two parts work together; Section 8: which change starts which part; AC-4; M4; IB-12; decided 2026-10-22: the wait a tool declares; decided 2026-10-22: the service calls through the tool layer; decided 2026-10-22: the status-check answer -->

The intake step and the situation worker never call each other. One writes a version; its notice wakes the other. A part may still ask another for a read or a step — the loop waits for memory and knowledge's package, or the worker asks the tool layer — but nothing changes a situation until it is saved. The conversation manager asking the communication layer to send is such a step: what to say is already saved by the worker, and the update decision is recorded. <!-- Section 7: the parts never call each other -->

Every change goes to one part first. The other parts react to the version that part writes. They never write about the same change at the same time. <!-- IA-1 -->

## 1. A message arrives

- **Starts it:** a person writes: a customer, an employee, a supplier, on any channel. <!-- B1 -->
- **Goes to:** the conversation manager's arrival loop, at its intake step. Messages from one person are handled one at a time, keyed by the person ID. A message Tend has already handled is dropped before anything else happens. <!-- Section 8: which change starts which part; B10; IB-22; S12 -->
- **Carries:** the message, the channel's reference to it, and the sender, as checked. A message from a channel bound to a member carries that member's name, but not proof of the person. <!-- B7; T1; decided 2026-10-22: identity and permission -->
- **Understands first** (the conversation manager's one AI stage). After memory and knowledge's package (interaction 3), understanding the arrival writes its understanding artifact. It records:
  - each ask, and whether it is about the business;
  - what each refers to, with time words turned into dates;
  - what is only the sender's claim, and what is unknown;
  - what Tend already holds that answers it;
  - where each ask fits.

  When an ask refers to a past purchase or earlier work, memory and knowledge narrows the sender's own situations by what understanding resolved, and the wider look chooses among them. It uses only what Tend holds; it never calls an outside system. <!-- C7; C8; N37; PL-3; PL-4 -->
- **Decides:** fixed code chooses the ending from the artifact. <!-- Section 8: routing outcomes; PL-5 -->
  - **Not about the business:** no situation. The conversation manager replies, saying nothing about the business (interaction 27).
  - **Nothing to do** (a thank-you that answers nothing): no situation; the message is kept in the person's message history. <!-- C9 -->
  - **Answered from what Tend holds** (a current claim in the sender's own situation, with no open conflict, or a fact the business configured): routing places it, marked, and the conversation manager tells the person at once. <!-- PL-10 -->
  - **Hold and ask** (it cannot tell which situation is meant): a held note, and a question to the sender. It never guesses. <!-- B3 -->
  - **Routed:** routing, which is fixed code, attaches the message to the situation it fits; starts a new situation; or starts one situation per separate problem at once, and never attaches silently. <!-- PL-6 -->
- **Changes:** routing writes the message, with its understanding artifact, as a new version. For a new situation, it writes the first version, with what came in and the artifact. <!-- IB-6; C8 -->
- **If it fails:**
  - if the conversation manager is down, the message is held, and nothing is sent; <!-- Section 7: failure and unavailability -->
  - if understanding cannot run, or routing's check fails twice, the message goes to the person the business named for arrivals Tend could not place. <!-- settled 2026-10-22: memory unreachable; PL-6 -->
- **Comes back:** a notice that wakes the situation worker for that situation, when a version was written. <!-- IB-2 -->

Which business the message belongs to, and who sent it, is fixed once, at intake, from what can be checked. It is never taken from the message's text. A sign-in proves a person; a channel bound to a member proves only the channel, so routine words from it are recorded as claims. <!-- AC-1; decided 2026-10-22: identity and permission -->

For example, Meera texts "any news?" while two of her orders are open. Understanding cannot tell which she means, so Tend asks her. <!-- B3 -->

## 2. A timer or a check-in wakes a situation

- **Starts it:** the time signal the worker set for a wait fires, or the situation's check-in comes round. <!-- HC-3; decided 2026-10-22: the book of waits -->
- **Goes to:** the situation worker only. A timer never reaches the communication layer. <!-- IB-1 -->
- **Carries:** which situation, and which wait. <!-- HC-3 -->
- **Decides:** the worker reads the newest version first. If the wait has been replaced — for example, the customer already replied — nothing happens. Otherwise the worker decides the next step. <!-- IB-4 -->
- **Changes:** whatever the worker's next step writes. A late timer changes nothing, and it is not an error. <!-- IB-4 -->
- **If it fails:** if a wake is lost, the check-in still wakes the situation, later than it should have. After a crash, every time signal is set again from the book of waits. <!-- Level 2 coordination: a lost signal heals; decided 2026-10-22: the book of waits -->
- **Comes back:** a new version, if anything changed. <!-- IB-4 -->

A blocked situation has no check-in. It wakes when what blocks it goes away, or when a person acts. <!-- Section 8 additions: blocked work -->

For example, Meera's carrier promised an answer by 17:00. At 17:00 the wait's timer wakes the worker, which finds no answer, and takes the next step on the business's escalation path.

## 3. Memory and knowledge hands a stage its package

- **Starts it:** a loop reaches a stage that reasons: <!-- N19; IB-15; PL-17 -->
  - understanding the arrival (every arrival with words);
  - the wider look, when it runs;
  - understanding the situation, gathering and deciding, when each runs;
  - writing a message.

  The stages that are fixed code (intake, routing, the reply and update decisions, weighing evidence, acting, the send check) get no package; memory and knowledge observes them.
- **Goes to:** memory and knowledge, which runs beside the loop on its own thread. <!-- N18 -->
- **Carries:** what the loop already holds at that point: the arrival and its sender, the situation and its version, and the reasoning artifact just produced, with any questions it wrote for memory and knowledge. <!-- N19; N21 -->
- **Chooses:** memory and knowledge chooses what to look for, and how to arrange what it found. It decides nothing about the work.
  - Its fixed part fetches by exact keys.
  - Its AI part works out what else the stage needs, and asks the retrieval capability. Retrieval limits the search for records to the step's boundary before it searches.
  - The business's own knowledge may help any stage understand, each item marked with who may be told it.
  - Every candidate is presented with what tells them apart; it never chooses.

  <!-- N20; N22; N23; N34 -->
- **Changes:** nothing in any situation. The package's references go to the trace. <!-- N32; N33 -->
- **If it fails:**
  - **No package arrives:** the loop waits a set time, then the step goes to a person.
  - **Only the AI part fails:** the fixed part's items still arrive.
  - Missing knowledge never blocks a decision. <!-- N31 -->
- **Comes back:** the package: knowledge to use, or an explicit empty answer. The stage runs only with it. When a stage is passed and the version did not change, its package carries to the next stage. When a decision ends the run, no stage follows, and nothing is awaited. <!-- N19; PL-17 -->

For example, before the worker decides on Meera's parcel, the package holds the work as she first asked it, the information plan, the tracking events so far with their sources, and the lesson filed under the carrier's tool. It does not hold Meera's whole history.

## 4. The worker reads from, or calls, an outside system

- **Starts it:** the situation worker, in one of two stages: <!-- S2; PL-12; PL-15 -->
  - **gathering**, running a read from its information plan; a read changes nothing outside Tend;
  - **acting**, after the AI's proposal passed its checks; this is a step, which may change something outside Tend.
- **Goes to:** the tool layer. <!-- Section 7: tool layer -->
- **Carries:** the checked call, and which business it runs for. <!-- AC-1 -->
- **Decides:**
  - First, which source can answer at all. If no system and no person can, only that question stops, as "Tend cannot know this here". <!-- Section 8: the match step -->
  - Then the permission check: Allow, Deny, or a person must approve first. Deny ends that proposal, not the situation. <!-- T2; T4; AC-3 -->
- **Changes:** the tool layer writes the state of its tries. The worker writes the result as a new version, with the evidence. <!-- Section 8: the full cycle -->
- **If it fails:** <!-- M4; Section 8 anti-patterns: stale tracking -->
  - a short error: the tool layer tries again, up to a set number of times;
  - a system that stays down: a wait, then a recorded failure past the wait's limit. <!-- Section 8: past the bound -->
  - while the wait lasts, the customer is not left in silence: the conversation manager's update decision gives them an honest word before any promised time. <!-- Level 2 time: the customer clock -->
- **Comes back:** evidence, never an instruction. The tool never writes conclusions into the situation; only the worker does. <!-- IB-7 -->

For example, gathering asks the carrier about Meera's parcel. The answer "out for delivery, 2 pm" comes back as evidence, with its time. (The times and amounts in this file's examples are illustrations.)

## 5. A step that cannot be undone

A refund cannot be taken back, so the outside call needs three protections beyond the permission check. Before the call, Tend checks for an earlier attempt at the same step. Before the money moves, the tool layer saves a note of the call. If the result is unknown, the situation waits. <!-- Section 8: the full cycle -->

- **Starts it:** the situation worker proposes the step.
- **Goes to:** the tool layer.
- **Carries:** the step, and a unique tag that lets the other side tell a repeat from a new request. <!-- Section 8: idempotency key -->
- **Decides:** before the call, Tend looks in the situation's saved starts, and in the tool layer's notes, for an earlier attempt at the same step. That is a second check, separate from permission: a refund must pass both. It reads the record before the new note is written, so it never finds its own note. <!-- IB-8; IB-8: the record check -->
- **Changes:** the tool layer saves its note of what it is about to do, in its own record, before the money moves. If no final answer comes, the tool's result declares the wait. The worker's fixed code then writes one version holding three things — started, result unknown, and the wait — before the AI is told. <!-- S7; IB-11; settled 2026-10-22: one version for a step and its wait; decided 2026-10-22: the wait a tool declares -->
- **If it fails:** an unknown result keeps the situation waiting, inside the time the other side promised. Past that time, the result is declared unknown and a person gets the full record. The step is never repeated automatically. <!-- IB-10; Section 8: past the bound -->
- **Comes back:** the evidence of what happened, when it is known. <!-- IB-7 -->

The result is always checked first. A resend with the same tag is allowed only when the result is still unknown after that check, and the other side recognises the tag. A new start while the result is unknown is refused. <!-- Section 8: resend or new start -->

The asking is done by the status-check service, not by a timer that wakes the worker. The service's answer wakes the worker. If the service's limits run out with no answer, the wait's own time signal wakes the worker, which declares the result unknown. <!-- closed item: recheck timer -->

If the outside system can neither be asked nor sends news of its own, there is nothing to wait on. The result is declared unknown at once, and a person gets the full record to check by their own means. The step is still never repeated automatically. <!-- Section 8 additions: no check path -->

For example, the refund for order 9912 carries its own tag. If the payment provider sees the same tag again, it knows it is a repeat, not a second refund.

## 6. A long wait handed to the status-check service

- **Starts it:** a tool's few asks have not brought a final answer, or the situation worker's own wait needs an answer from an outside system. <!-- Section 8: status checks outside the harness; construction record, entry 21: the service is wider -->
- **Goes to:** the situation worker first, then the status-check service. The tool's result **declares** the wait: what is awaited, from which outside system, and what ends it. The worker's fixed code **saves** it, in the same version as the step that was started, before the AI is told. The saved wait's notice reaches the status-check service, which reads the wait from the book of waits. <!-- decided 2026-10-22: the wait a tool declares; decided 2026-10-22: the book of waits -->
- **Carries:** the wait, the outside system's reference for what is awaited, and the limits set for that system.
- **Decides:** only when to ask. The service listens for the outside system's own news, and also asks for it: a limited number of times, with a gap between asks, for a limited total time. Each ask goes out through the tool layer, as the same tool's read-only status check. <!-- decided by the owner, 2026-10-17; decided 2026-10-22: the service calls through the tool layer -->
- **Changes:** the service writes nothing to the situation. It keeps only its own record of asks for each wait it serves, rebuilt from the book of waits after a restart. <!-- settled 2026-10-22: the service's own list -->
- **If it fails:** when its asking runs out with no answer, the wait's own time signal wakes the worker, and the business's escalation path runs. <!-- decided by the owner, 2026-10-17; closed item: recheck timer -->
- **Comes back:** the answer, as an event naming the wait it answers and the outside system's own reference. The intake step saves it as an arrival; the arrival's notice wakes the worker; the worker reads it through the declaring tool's fixed code, and writes what it means. A repeated answer is caught by the intake step's repeat check, keyed by the wait and the outside system's reference. The service's asking never wakes a situation; only its answer does. <!-- decided 2026-10-22: the status-check answer; construction record, entry 21: asking does not wake -->

A tool makes at most five short asks for one wait before the service takes over, and only where it knows how fast the outside system usually answers. A business may set its own number. <!-- M5; settled 2026-10-22: the five per wait -->

For example, the payment provider has not given a final answer about order 9912 after a few asks. The refund tool declares the wait; the worker saves it with "refund started, result unknown". The status-check service asks the provider through the tool layer, and listens for its news. Two days later, "refund 9912 paid" arrives. The intake step saves it on the refund's wait, the worker wakes, records the refund as paid, and ends the wait.

## 7. A person must approve first

- **Starts it:** the permission check answers "a person must approve first". <!-- T2 -->
- **Goes to:** the approval step inside the tool layer. The AI never calls it, and is not told that approval was needed. <!-- T7; Section 8: fetching a file -->
- **Carries:** the exact text or data that will be sent or released, so the approver sees exactly what they approve. <!-- Section 8: the approval step -->
- **Decides:** the approver the business names says yes or no. The approver must be a member of the business, freshly signed in through the sign-in provider (the outside service that checks who a person is) — within the last 15 minutes. A link sent to the approver's bound channel only opens the provider's own check. A no ends that proposal; the worker may escalate, ask another approver, or tell the customer honestly. <!-- G2; Section 8: the approval step; decided 2026-10-22: identity and permission; settled 2026-10-22: fresh sign-in -->
- **Changes:** a work item for the approver; the request reaches them through the communication layer. <!-- G2; J4; Section 8: failure shapes -->
- **If it fails:** <!-- Section 8: the approval step -->
  - a time-out returns "the approval failed";
  - the situation changes before the answer comes: the approval is not used; it is asked again. <!-- Section 11 decision 6: approval asked again -->
  - no approver answers in time: the business's escalation path runs, and the wait is shown, not hidden; <!-- Section 6 additions: no approver -->
  - a situation cannot close while an approval request is still open: the completion check refuses it. <!-- IA-23 -->
- **Comes back:** the approver's answer is an arrival. The conversation manager saves it, as it saves every person's answer; its notice wakes the worker, which hands it to the waiting tool step as that step's result. The tool checks the permission again before it acts. The approval records the member, their sign-in identity, when they signed in, and exactly what they approved. <!-- AC-3; closed item: approval answer route; decided 2026-10-22: identity and permission -->

An approval covers one request, and is used once. It lapses when the situation changes, or when the business's deadline for that kind of approval passes. It passes to another person only where a grant allows it. <!-- Section 11 decision 6: approval asked again; accepted call: one approval, one request -->

For example, the business sets a refund setting of 500. A refund of 1,500 on order 9912 is above it, so a named person must say yes to that exact amount before Tend pays. <!-- decided by the owner, 2026-10-12: refund setting -->

## 8. Telling a person

- **Starts it:** the situation worker's deciding stage names what should be said, and acting writes it into a new version. It never sends. Gathering's information plan may also ask a person a question for information, saved the same way. Or (since 2026-10-29) the conversation manager's reply decision decides to answer an arrival at once: a reply to one that is not about the business, or an answer from what Tend holds. <!-- IB-5; Section 10: the worker never sends; PL-8; PL-10 -->
- **Goes to:** the conversation manager, woken by the version's notice. <!-- Section 7: how the two parts work together -->
- **Carries:** the new version, with what changed and what should be said. <!-- IB-5 -->
- **Decides:** the conversation manager makes the update decision (fixed code), or has already made the reply decision. The communication layer writes the message, after memory and knowledge's package. Then it checks, before anything is sent: <!-- decided: the update decision; Section 8: the send check; PL-16 -->
  1. Tend has a saved decision to send this message: the worker's, with the update decision, or the conversation manager's reply decision, saved with its arrival;
  2. the permission check says Allow for this channel, this person, and this kind of message;
  3. the channel's own rules are met, read fresh, with the consent records;
  4. only the details this person may see stay in the message;
  5. a reply to an arrival that is not about the business carries no claim about the business. <!-- PL-9 -->

  A send that is refused returns its reason; the message is written again once, then the worker decides again or escalates. <!-- AC-2 -->
- **Changes:** the communication layer writes its own record of what was sent. It is not a version of the situation; its save is announced like any other, naming the situation. <!-- Section 7: the sent record, two readings -->
- **If it fails:** a message that cannot be delivered is recorded as evidence, and the worker wakes and decides. <!-- IA-10 -->
- **Comes back:** the sent record; later, any delivery receipt. <!-- Section 8: delivery acknowledgement -->

A run that changes nothing sends nothing. No "we received your message" reply is sent. A reply to "hi", or a short answer to a general question, is not such a receipt: it answers what the person asked (interaction 27). <!-- Section 8: what a message looks like; PL-8 -->

A reply stays on the channel the person used, while that channel still allows replies. A new message uses the first channel that is available and allowed. If no channel is allowed, the person the business names for this decides how to reach the customer, or Tend waits for the customer to write. <!-- L3; Level 2 channels: a routing outcome -->

For example, Meera wrote on WhatsApp, so Tend replies on WhatsApp, not by email. Tend tells her the carrier's tracking is down, and that she will hear again before the promised time.

## 9. A delivery receipt arrives

- **Starts it:** the channel reports that a message was delivered.
- **Goes to:** the communication layer. <!-- Section 8: delivery acknowledgement -->
- **Carries:** which message, and its delivery state.
- **Decides:** nothing.
- **Changes:** the communication layer adds it to its record of what was sent. <!-- Section 7 writer table: who writes what -->
- **If it fails:** a receipt that never comes leaves the delivery unknown. Tend checks before any resend, and never resends just to be sure. <!-- Section 8: resend or new start -->
- **Comes back:** a wake for the situation worker, only if a send is pending. <!-- receipt wake -->

For example, the channel reports at 10:02 that Meera's message reached her phone. The communication layer adds that to its record. Nothing else changes.

## 10. Work for a person

- **Starts it:** the situation worker decides a person is needed: to give information, approve, do work, or decide. <!-- J1; J2 -->
- **Goes to:** the person, through the communication layer. <!-- IA-14 -->
- **Carries:** the work item. <!-- IA-14 -->
- **Decides:** the business's own rules decide who gets the work, and who covers when that person is away. The person then does it. <!-- J3; J7 -->
- **Changes:** the worker writes the work item on the situation. One named person is answerable for it at a time. <!-- IA-14; J4 -->
- **If it fails:** silence is never treated as done. Tend first checks whether the person is away, and names what lies behind the silence. Then the next step for that reason runs: for example a reminder and then the escalation path, asking the person to record work already done, or cancelling work no longer needed. The time and people file lists all seven. <!-- J5; J7 -->
- **Comes back:** the person's answer, as an incoming message to the conversation manager. The worker records the outcome. <!-- J6 -->

Saying "got it" acknowledges a request; it does not finish it. A handoff stays pending until the other person accepts it. <!-- J6; J8 -->

For example, Kabir replies "got it" to the request to call the carrier's depot. The work item stays open until Kabir records what the depot said.

## 11. Contacting a partner

- **Starts it:** the escalation path reaches a partner, such as the carrier's own team. <!-- K4 -->
- **Goes to:** the partner, through the communication layer.
- **Carries:** only what the task needs, such as the tracking number and the problem. <!-- K4 -->
- **Decides:** the business's policy decides whether a partner may be contacted at all. <!-- K4 -->
- **Changes:** the contact is recorded on the situation's history. <!-- K4 -->
- **If it fails:** as with any message: recorded, and the worker decides the next step.
- **Comes back:** the partner's answer, as an incoming message.

For example, Meera's carrier is still silent after Kabir's call, and the business allows partner contact. Tend sends the carrier's team the tracking number and the problem, and nothing else.

## 12. Arranging a meeting

- **Starts it:** the situation worker decides a meeting is needed. <!-- K1 -->
- **Goes to:** the people invited, through the communication layer.
- **Carries:** the purpose, the people, and real slots — possible meeting times that fit the calendar, the business's rules, and what each person agreed to. <!-- K2 -->
- **Decides:** the business's rules decide who may take the meeting; each person decides when. <!-- Level 2 meetings: who is suitable -->
- **Changes:** Tend holds two waits for a meeting: first one for the people to confirm, then one for the meeting time. A booked slot is held until it is confirmed or released. <!-- K1; Section 8 additions: slot held -->
- **If it fails:** a missed meeting is recorded as a meeting event, and has a next step. A cancelled or moved meeting is recorded the same way. <!-- K3 -->
- **Comes back:** the meeting's outcome, which creates the next piece of work, for one named person to answer for. <!-- Section 8 additions: meeting outcome -->

For example, Priya asks to speak to a person before she buys. Tend offers times that fit Ravi's agreed weekday mornings. Priya picks Tuesday at 10:00, and the meeting waits for that time.

The steps of booking itself belong to the meeting capability, and are written when it is built (deferred to implementation). They sit inside the two waits above, and change no part or writer. <!-- Section 11: meeting booking open -->

## 13. A correction

- **Starts it:** a new claim shows that something Tend already said is now misleading, or a person sends a correction. <!-- Section 8 additions: correction -->
- **Goes to:** a correction that arrives as a message goes to the conversation manager, which records it; the situation worker writes the correction. <!-- Section 7 writer table: who writes what -->
- **Carries:** the new claim, and the reason for the change.
- **Decides:** the worker decides what the correction means for the situation, and what must be said. <!-- Level 2 trust: corrections go forward -->
- **Changes:** a new version carries the new claim, the reason, and the correction to be sent. The earlier version stays in the history, with what Tend believed and said at the time. <!-- Level 2 trust: corrections go forward -->
- **If it fails:** the correction is a message like any other, with the same checks.
- **Comes back:** the corrected message, through the update decision. <!-- decided: the update decision -->

For example, Tend told Meera her parcel was at the depot. The carrier then corrects its record: the parcel is still in transit. Tend writes the correction, keeps the earlier version, and tells Meera.

A newer claim counts only when it is a correction, not as a plain update. <!-- accepted call: correction only -->

## 14. A situation is completed

- **Starts it:** the situation worker records the work as resolved, after the completion check passes. <!-- Section 8: the states table; IA-23 -->
- **Goes to:** the conversation manager, woken by the version's notice.
- **Carries:** the resolved version.
- **Decides:** the conversation manager concludes the conversation is over: no wait is still running, and the last message has gone out. <!-- decided by the owner, 2026-10-12: completed --> The business can also stop a blocked situation; the conversation manager then completes it, and the reason is shown. <!-- Section 8: the states table -->
- **Changes:** the conversation manager alone sets the situation to completed. The full rule is in [the records file](../state_view/the_records.md). <!-- decided by the owner, 2026-10-12: completed -->
- **If it fails:** the completion check refuses while a question has no ending, a person's task is pending, or a claim told to the customer has no evidence. For example, Tend told Meera her parcel was at the depot, but no scan shows it. <!-- IA-23 -->
- **Comes back:** nothing. The check-in is removed and never fires again. <!-- Section 8 additions: check-in removed -->

The completion check runs during a situation, not only when it closes. It runs inside the worker's check, before a situation resolves. <!-- Section 8 additions: completion check runs during; Section 8: completion check placement -->

## 15. A closed situation is reopened

- **Starts it:** a message that refers to a closed situation explicitly. <!-- A8 -->
- **Goes to:** the conversation manager's arrival loop. <!-- A8 -->
- **Carries:** the message, and the closed situation it refers to.
- **Decides:** understanding the arrival decides whether the closure was wrong, and routing carries it out: the same problem was resolved too early, or it has come back. A closed situation is never used as a bucket for "this customer wrote again". <!-- A8 -->
- **Changes:** if the closure was wrong, the situation worker moves the same record back to running, with the reason recorded. "Reopened" is a mark on that same record, not a new record. If the closure was not wrong, a new situation is created and linked to the closed one. <!-- Section 8: the states table; A8; A7 -->
- **If it fails:** if the intake step cannot tell whether the closure was wrong, it treats the message as a new problem: a new situation, linked to the closed one. The design's reading.
- **Comes back:** the reopened situation, or the new linked one, wakes the worker.

For example, Meera writes that her refund was marked done but never arrived. The same refund situation is reopened.

The exact form of the "reopened" mark is left to whoever builds the record. A reopened run checks again every fact it relies on that may have changed, as any run does. The reopen does not, by itself, change the person's stage; that is set from evidence. <!-- A8; closed item: reopen check -->

## 16. A document nobody asked for

- **Starts it:** a business document arrives unasked: a supplier's bill of materials (a parts list), an invoice, a balance sheet request. <!-- decided by the owner, 2026-10-10 -->
- **Goes to:** the conversation manager's arrival loop.
- **Carries:** the document, with its date and sender.
- **Decides:** understanding the arrival matches it to the open situation for that sender, or to the sender's record; routing files it. <!-- decided by the owner, 2026-10-10 -->
- **Changes:** the document is filed there. The situation worker records it as a claim, with its source — not as an order. Memory and knowledge's indexer indexes its text with that situation's view, so retrieval can find it later. <!-- decided by the owner, 2026-10-10; Section 8 CASE-6; N33 -->
- **If it fails:** if nothing matches, a person sees it. <!-- decided by the owner, 2026-10-10 -->
- **Comes back:** nothing is sent, and nothing is done on the document alone. <!-- decided by the owner, 2026-10-10 -->

For example, a supplier emails its bill of materials for the next run. Tend files it on the supplier's open situation. No reply goes out, and nothing is ordered.

## 17. One instruction for many people

- **Starts it:** the business owner gives one instruction that covers many people, such as thirty people to contact. <!-- B6 -->
- **Goes to:** the conversation manager.
- **Carries:** the list, and the instruction.
- **Decides:** each person is their own situation, and the instruction itself is one central situation that tracks the progress of all of them. There is no board. <!-- B6 -->
- **Changes:** the conversation manager writes one first version per person, and the first version of the central situation. Memory and knowledge's link keeper links each person's situation to the central one. <!-- B6; IB-6; IB-18 -->
- **If it fails:** a wrongly created situation is corrected later: split, linked, or moved. Two situations later found to be one problem are merged, and the merge is recorded with its reason. <!-- B4 -->
- **Comes back:** thirty-one notices; each situation then runs on its own, and each person's update reaches the central situation (interaction 25).

For example, the business owner gives Tend thirty people to contact about a new product. Priya is one of them. Her reply never changes another person's situation; it reaches the central situation, which records "Priya replied".

## 18. A person withdraws consent

- **Starts it:** a person withdraws consent: "STOP" on WhatsApp, an unsubscribe click, "please stop messaging me", or a platform's own signal, such as a person blocking the business. <!-- consent withdrawal; decided 2026-10-22: consent records -->
- **Goes to:** the conversation manager's intake step, which saves it as an arrival. Its notice wakes the communication layer's fixed consent code.
- **Carries:** who withdrew, through which contact point, and the words or signal used.
- **Decides:** the consent code decides what was withdrawn, from the words used. "STOP" on WhatsApp withdraws every message the business starts on WhatsApp. "Stop contacting me", on any channel, withdraws every message the business starts, on every channel. A fixed keyword is read by fixed code. An unclear sentence, such as "please don't message me so much", is recorded as a withdrawal until the person says otherwise; the AI may notice it, and fixed code adds the entry. <!-- consent withdrawal; settled 2026-10-22: unclear withdrawal -->
- **Changes:** the consent code adds a withdrawal entry to the consent records, with its evidence. Only that code writes consent records. <!-- decided 2026-10-22: consent records; settled 2026-10-22: consent fields -->
- **If it fails:** the arrival is saved before anything acts on it, so the withdrawal is never lost. If the consent code cannot run at once, it adds the entry from the saved arrival as soon as it can. <!-- decided 2026-10-22: the status-check answer; settled 2026-10-22: part outages -->
- **Comes back:** nothing to the person. From the very next send, the send check refuses what was withdrawn. If the person writes in again later, that is a new conversation, and Tend may reply. <!-- Section 8: the send check -->

For example, Priya writes "please stop messaging me". Her pending follow-up does not go out.

## 19. Traces go to memory and knowledge, improvement, and the observer

- **Starts it:** a run's trace is saved. <!-- IB-12 -->
- **Goes to:** memory and knowledge, the improvement path, and the observer, in the background. <!-- Section 8: which change starts which part -->
- **Carries:** the trace, with secrets and anything that looks like a password stripped out first, and no personal data. <!-- trace redaction; settled page: no personal data in a trace -->
- **Decides:** memory and knowledge's learner decides what lesson to keep, under the business's learning mode. None of them acts on a situation. <!-- IB-12; N6 -->
- **Changes:** memory and knowledge's own learned items; the observer's reports. <!-- Section 7: memory and knowledge -->
- **If it fails:** sending a trace never blocks a save. <!-- IB-12 -->
- **Comes back:** nothing to the situation. <!-- IB-12 -->

For example, after Meera's refund run, memory and knowledge may later keep a lesson such as "this provider confirms refunds within a day". In automatic mode, the default, fixed code checks the lesson and Tend uses it as advice. A business can require a person's approval instead.

Traces for improving the product go only with the business's written permission. <!-- IB-14; recorded earlier: training permission -->

## 20. Memory and knowledge creates a link, or proposes a setting

- **Starts it:** a version notice shows the same order number, tracking number or incident code in typed fields of two situations, taken from an outside system's record or a person's confirmed answer; or memory and knowledge finds a candidate setting in past work. <!-- A15; IB-18; N13 -->
- **Goes to:** a link is created by memory and knowledge's link keeper. A setting goes to the configurator. <!-- A15; IB-13 -->
- **Carries:** the link's two situations, its reason and its type; or the candidate setting, with where it came from. <!-- A15; N5 -->
- **Decides:** fixed rules decide the link. A link is made on a signal: a shared number or incident code from records, an employee's word, or a finding while gathering. The link keeper (memory and knowledge's fixed background part for links) makes it once per key. A relationship based on meaning alone, proposed by the link finder (memory and knowledge's AI background part that notices situations that sound alike), stays unresolved until a signal appears. The configurator checks a setting. <!-- A15; IB-13 -->
- **Changes:** the link is memory and knowledge's own record; no situation changes. Only the configuration tools apply a setting. <!-- A15; IB-13 -->
- **If it fails:** a link whose signal turns out wrong is removed; an employee who may see both situations may remove any link; each removal is recorded with its author. A lesson never widens a grant. <!-- A15; Section 8 anti-patterns: a lesson widens a grant -->
- **Comes back:** the link appears in each situation's next package, as context. What it means for each situation is that situation's worker's judgment. A link never carries a change.

When the conversation manager starts a new situation for new work after a closed one, such as Priya's second outreach, the link keeper links the two. This replaces the 2026-10-09 rule that the worker accepted or denied each link. <!-- A7; A15 -->

## 21. A setting or a rule changes

- **Starts it:** the configurator changes a setting, or a platform changes its rules. <!-- Q3 -->
- **Goes to:** a business setting or policy goes to configuration, the only part allowed to change them. A platform rule change goes to the channel's rule record, which the communication layer holds and the product team updates. <!-- Section 7: configuration; L1 -->
- **Carries:** the new value.
- **Decides:** what reaches open situations depends on the kind of change: <!-- Q3; decided 2026-10-09: platform-rule split -->
  - a platform rule: the rule record's update announces itself. The conversation manager reads the book of waits, finds the situations with a step pending on that channel, and writes one version into each, such as "WhatsApp's rule changed to version 7". Each notice wakes its worker, which plans again. Every other situation meets the new rule at its next wake, and the send check stays the final gate. When many situations are affected, their wakes are released at a steady pace; <!-- closed item: who wakes situations after a platform change; decided 2026-10-22: platform rule wake; settled 2026-10-22: steady pace -->
  - the refund setting: read the next time a refund is tried; <!-- decided by the owner, 2026-10-10: refund setting read at attempt -->
  - a business setting: read the next time it is used; open situations are not checked again;
  - a business policy: each open situation keeps the version it started with; the business owner gets an alert and chooses to keep it or move to the new one. Moving applies to the same situation; no linked situation opens; <!-- my call: a policy change moves the same situation -->
  - a removed grant, or a removed member: stops the next step at once.
- **Changes:** the configuration record, as a new version; for a platform rule, the channel's rule record, and one version in each affected situation. The change is saved once first; each affected situation's version carries its reference; the wakes are released at a steady pace; and if the writing stops part-way, it starts again and skips the situations already written. <!-- decided 2026-10-22: platform rule wake -->
- **If it fails:** a setting that would break a rule no setting may break is refused, and the configurator is shown why. <!-- Level 2 growth: the hard line -->
- **Comes back:** for a business policy, the business owner's choice for each open situation. If the business owner does not answer, the situation stays on the old version, and the business owner is asked again. <!-- accepted call: policy deadline -->

For example, lowering the refund setting from 500 to 300 changes the next refund tried. It does not reopen a refund already decided. And when WhatsApp shortens its reply window, Meera's situation — with a reply planned on WhatsApp — is woken at once, so she hears before the new window closes.

## 22. The business owner opens a screen

- **Starts it:** the business owner, the administrator, or the product team asks to see the work. <!-- O1 -->
- **Goes to:** the owner view.
- **Carries:** who is asking, and what they may see. <!-- T11 -->
- **Decides:** each person's role decides what they see. <!-- T11 -->
- **Changes:** nothing. The owner view writes nothing. <!-- Section 7: the parts table -->
- **If it fails:** the records are not affected; the business owner's attention may be delayed. Each business sets the delay it accepts. <!-- Section 7: failure and unavailability; Section 7: owner view lag -->
- **Comes back:** the screen, built fresh from the records, showing when it was last updated. <!-- O2 -->

Four kinds of change reach the business owner without waiting to be found: <!-- O3 -->
- a decision only the business owner can make;
- a deadline or alert that puts the business at risk;
- an escalation that has gone past everyone assigned;
- a change that alters the business's next decision, which reaches them at once.

For example, the business owner opens the screen on Monday morning. It shows Meera's refund waiting for a named person's yes, and when the screen was last updated.

## 23. The observer reports

- **Starts it:** the observer's own checks: <!-- IA-19 -->
  - that the AI and channel providers are working;
  - one fixed reference case, run from start to finish, with no step drifted and no check skipped;
  - a sample of closed situations: none closed with a question that has no ending, and no claim told to a customer without evidence;
  - a count of "Tend cannot know this here" answers;
  - waits that passed their due time with no wake reaching their worker;
  - alerts on spikes in refusals, messages sent, or cost; on any access across businesses; and on outgoing traffic to any outside service not on the approved list.
- **Goes to:** the same route of notices as everything else. <!-- IA-19 -->
- **Carries:** what it found.
- **Decides:** nothing. The observer never acts on what it finds. <!-- Section 7: the observer -->
- **Changes:** the product team's screens. <!-- IA-19 -->
- **If it fails:** a fault in Tend's own checking can stop a new release from going live. <!-- IA-20 -->
- **Comes back:** nothing.

For example, the fixed test case of a late parcel shows a reply that took too long. The observer reports it. It changes nothing in Meera's situation.

## 24. A claim is sent to another situation

- **Starts it:** a worker's decision says another situation waits for what this one holds. Before the decision, memory and knowledge's package showed the other situation's typed fields and wait, as the worker view rule allows. <!-- IB-16; N34 -->
- **Goes to:** the conversation manager's intake step, handed over by the worker's fixed code. <!-- IB-16 -->
- **Carries:** the claim, its source, the receiving situation, and a key made of this situation, the claim and its version. <!-- IB-16 -->
- **Decides:** fixed code first checks the send:
  - the shared number came from an outside system's record, or a person's confirmed answer;
  - the receiving situation's people may see the claim;
  - fewer than the allowed number of sends have passed between these two situations within the configured window (by default, 3 in 24 hours).

  Then the receiving worker decides what the claim means for its own wait. <!-- IB-16 -->
- **Changes:** intake saves the claim as an arrival in the receiving situation. Neither worker writes into the other's record. <!-- IB-16 -->
- **If it fails:** a repeat with the same key is dropped. Past the send count, the decision must choose another step, such as giving the work to a person. <!-- IB-16 -->
- **Comes back:** a notice that wakes the receiving situation's worker.

For example, Arjun confirms his pin code. His worker sends it to the warehouse team's situation, which waits for a corrected address for the same order. That worker decides its wait is answered.

## 25. A person's update reaches the central situation

- **Starts it:** a new version of a person's situation in an outreach. <!-- IB-17 -->
- **Goes to:** the conversation manager's intake step, handed over by the person's situation's fixed code, with no AI choosing it. <!-- IB-17 -->
- **Carries:** a summary of the version, made of typed fields only. <!-- IB-17 -->
- **Decides:** the central situation's worker records the overall progress. The conversation manager's update decision on the central situation tells the business owner only what is material: a decision only they can make, a deadline or notice that puts the business at risk, an escalation that drifted past everyone, or what the owner's instruction asked to hear. <!-- IB-17; O3 -->
- **Changes:** an arrival on the central situation. Nothing goes back down to the person's situation automatically. <!-- IB-17 -->
- **If it fails:** the arrival is saved before anything acts on it, so no update is lost. <!-- decided 2026-10-22: the status-check answer -->
- **Comes back:** a notice that wakes the central situation's worker.

For example, Priya asks for a meeting. The central situation records it, and the business owner, who asked to hear of anyone who wants a meeting, is told.

## 26. A person's data is erased

- **Starts it:** a person asks for their data to be deleted, for example Priya writes "delete my data", or the law otherwise requires it. The worker proposes the erasure, by filling the erasure tool's form. <!-- U7 -->
- **Goes to:** the tool layer, which runs the erasure tool. <!-- IB-19 -->
- **Carries:** whose data, and the reason.
- **Decides:** the erasure tool's confirmation rule sends the request, through the communication layer, to the business owner or the configurator. Nothing is erased until their yes. <!-- U7; IB-19 -->
- **Changes:** after the yes, memory and knowledge's cleaner (its background part for erasures) erases the person's data everywhere it lives: <!-- U7; IB-19 -->
  - the person record and their channel addresses;
  - every index;
  - learned items whose only source is them;
  - cached copies;
  - their data in situation versions and arrivals.

  A record that an erasure happened is kept, without the erased data.
- **If it fails:** if the owner declines, nothing is erased, and the answer is recorded. Meeting the law's deadline is the business's duty. There is no other way to erase. <!-- U7 -->
- **Comes back:** the erasure's record, to the situation that asked.

## 27. An arrival that is not about the business

- **Starts it:** a person writes something that is not about the business: a greeting, small talk, a general-knowledge question, a sum. (Added 2026-10-29. The project owner: "If I just say hi to my agent, it should obviously first not create a situation"; "This message will only be a noise in our knowledge framework.") <!-- PL-7 -->
- **Goes to:** the conversation manager's arrival loop. <!-- PL-1 -->
- **Understands:** understanding the arrival finds that no ask in it is about the business. A greeting inside a business message ("hi, where is my parcel?") is not this case. A message that mixes a general question with a business ask takes both paths: the general ask is answered here, and the business ask is placed (interaction 1). <!-- PL-3; PL-5 -->
- **Decides:** the reply decision, in fixed code: <!-- PL-8 -->
  - a greeting gets a reply, unless a newer arrival from the same person is already queued, or a greeting from them was already answered since their last business message (a call, not yet confirmed);
  - a general question or a sum gets a short answer, unless the business switched this off for customers; then its polite line (a call);
  - a thank-you that answers nothing gets no reply, unless the business set a courtesy reply (a call).
- **Changes:** no situation. The arrival, its understanding artifact and the reply decision are kept in the person's message history, marked "not about the business". Memory and knowledge never learns from it, and never presents it to a situation. <!-- PL-7 -->
- **Then:** the communication layer writes the reply. It may repeat a question Tend already asked this person, and nothing else about the business. The send check stops any reply that carries a claim about the business. <!-- PL-9 -->
- **If it fails:** if understanding cannot run, the message goes to the person the business named for arrivals Tend could not place. <!-- settled 2026-10-22: memory unreachable -->
- **Comes back:** nothing to any situation.

For example, a new number writes "hi". Tend answers "Hi! How can I help you today?", and nothing else exists afterwards but the two messages in that person's history.

## When two things happen at once

A timer and a message can arrive together. The version written last is the one that counts. The timer reads the newest version, sees that its wait was replaced, and does nothing. <!-- IB-4 -->

Two runs never change the same situation at the same time. <!-- IB-1 -->

A new change that matches a running wait exactly — the same subject, kind, and purpose — joins that wait. It does not open a second one. <!-- Section 8 additions: identical wait --> For example, two messages to Priya about the same order, both asking her to confirm her address, make one wait, not two.

An approval given before the situation changed is not used; it is asked again. <!-- Section 11 decision 6: approval asked again -->

A package is built for one version. If a newer version is saved while the worker decides, the decision is thrown away and made again, with a new package. Just before a step that cannot be undone, the version is checked once more. <!-- F7; IB-20 -->

Two messages from one channel address a second apart are routed one after the other, so the second sees the situation the first created. <!-- B10 -->

For example, Priya's follow-up is due at 10:00 on Thursday. At 09:58 she replies by email. The conversation manager records her reply. The worker writes Tend's answer and cancels the follow-up wait, in one version. At 10:00 the timer wakes the worker, which reads the newest version, finds no wait, and sends nothing. <!-- IB-3; IB-4 -->

## What was considered and turned down

- **Rejected:** the timer sends the message. It would skip understanding, the permission check, and the channel rules. The timer wakes the worker only. <!-- Section 8 anti-patterns -->
- **Rejected:** one central service that runs both the loop and the permission checks. The checks sit at each place a step can happen. <!-- Section 8 anti-patterns -->
- **Rejected:** using a saved copy of the permissions, kept for speed, to decide a step. The trusted store is read at the moment of the check. <!-- Section 8 anti-patterns -->
- **Rejected:** a draft is sent. Only a saved decision to send is sent. <!-- Section 8 anti-patterns -->
- **Rejected:** the AI checks its own proposal. Fixed code does. <!-- Section 8 anti-patterns -->
- **Rejected:** the conversation manager writes what Tend concludes. The worker writes conclusions. <!-- Section 8 anti-patterns -->
- **Rejected:** the AI asks for approval before it looks something up. Approval happens inside the tool. <!-- Section 8 anti-patterns -->
- **Rejected:** answering a parcel question from a source that does not hold parcel facts, such as the payment provider. The honest answer is recorded instead. <!-- Section 8 anti-patterns -->
- **Rejected:** the status-check service saving its answer into the situation itself, or sending it straight to the worker. The answer is saved as an arrival. <!-- decided 2026-10-22: the status-check answer -->
- **Rejected:** the status-check service calling outside systems directly. Its asks go through the tool layer. <!-- decided 2026-10-22: the service calls through the tool layer -->
- **Rejected:** waking every open situation after a platform rule change, or none. Only the affected ones are woken at once. <!-- decided 2026-10-22: platform rule wake -->
- **Rejected:** a partial answer held until everything closes. It goes out plainly, as partial. <!-- Section 8 anti-patterns -->
- **Rejected (2026-10-28):** memory and knowledge only as a tool a step calls when it chooses to. Every loop waits for its package before each part. <!-- N19 -->
- **Rejected (2026-10-28):** the worker accepting or denying each link. Memory and knowledge creates and maintains links. <!-- A15 -->
- **Rejected (2026-10-28):** one board for an outreach. One central situation tracks it. <!-- B6 -->
- **Rejected:** a worker writing into another situation's record, or a link carrying a change. A claim travels only as an arrival through intake. <!-- IB-16; N25 -->
- **Rejected:** the AI erasing data. Only the erasure tool erases, after its confirmation. <!-- IB-19 -->

## Open questions, and what is set later

Nothing in these interactions is open. Each business's numbers — the status-check service's limits, wait limits, retry counts — are set with its settings; they are listed in [the gap register](../checking/gap_register.md). <!-- Level 2 failure: the numbers -->
