# How a situation moves over time

This file answers one question: how does Tend behave over time, in each kind of situation?

It does three things:
- it shows the one path every change takes through Tend's parts;
- it shows the life of a situation, from the first message to its close;
- it lists the fifteen kinds of situation. Each kind has its own file, with its stories.

Tend is the software that keeps a business's operational problems moving. Each problem is one **situation**: one late parcel, one refund, one message to a possible customer. The parts named here are described in [the parts file](../boundary_view/the_parts.md). <!-- A1 -->

Each rule here has one of these statuses:
- **Decided:** the project owner — the person designing Tend, not the business owner — said yes. On 2026-10-22 the project owner accepted every recommendation this design had made, and asked for the smaller questions inside them to be settled in the way that best fits; those points are Decided, and points settled that day say so. A rule marked as "the design's reading" was worked out from its sources rather than found written down; it is Decided too. <!-- decided by the owner, 2026-10-22 -->
- **Provisional:** a working choice that carries a condition for reopening it.
- **Rejected:** turned down on purpose, with the reason kept.
- **Deferred:** a value or a detail left, on purpose, to a later stage — **deferred to configuration** (each business or market sets it), **deferred to Level 3** (the stage that chooses the technology), or **deferred to implementation** (whoever builds it). The rule around it is Decided.

Two earlier status words, **To confirm** (written down, but not yet agreed by the project owner) and **Open** (no answer yet), are no longer used: since 2026-10-22, no rule here carries either.

A rule with no status word next to it is **Decided**: it has a source the project owner accepted. Every rule that is not Decided carries its word where it appears. In this file, "the business owner" means the person who runs the business Tend serves.

<!-- Every rule below carries its code in a hidden note. Its meaning, source, and status sit in code_index.md in this folder. -->

## How the diagrams are drawn

Each diagram here is a numbered list of hand-offs. One line is one hand-off: who passes what to whom. For example:

```text
1. Meera                 -> conversation manager : "Where is my parcel?"
```

This means Meera sends the conversation manager her message. Read each diagram top to bottom; the number is the order. A line in brackets with no arrow is a note about time or an event. When a part appears on both sides, it is checking or acting by itself. The diagrams are plain text, so they read the same everywhere. <!-- decided: diagram format -->

Who is who in the diagrams:
- The **conversation manager** takes in each arrival — a message, or an outside system's answer — puts it on its situation, decides whether a person should hear an update, and alone sets a situation to completed. <!-- Section 7: the parts table -->
- The **situation worker** reasons about one situation and writes what Tend concludes. <!-- Section 7: the parts table -->
- The **communication layer** checks and sends each message, through the tool layer, and keeps the **sent record**. <!-- Section 7: the parts table; M4 -->
- The **tool layer** is the only way Tend calls an outside system. <!-- Section 7: tool layer -->
- The **status-check service** waits on a slow outside system, asking it for news through the tool layer, while the work goes on. <!-- decided by the owner, 2026-10-17; decided 2026-10-22: the service calls through the tool layer -->
- **Memory** keeps what Tend learned, and hands each step what it needs. <!-- Section 7: memory -->

Words used in the diagrams:
- A **version** is one saved state of a situation, after a change. An old version is never changed. <!-- HC-1 -->
- A **notice** is a short internal signal that a new version exists. People never see it. <!-- Section 7: the change channel -->
- A **wait** is a pause on a situation until one named thing happens. The **book of waits** lists every wait that may outlast its run, and what will end it; it is data kept with the situation records. A **time signal** is the alarm the worker sets for one wait's due time. <!-- HC-3; decided 2026-10-22: the book of waits -->
- A **wake** is a signal that sends the situation worker back to one situation: a saved version's notice, a time signal, or the check-in. A **check-in** is the one regular wake each waiting situation gets, in case an earlier wake was lost. <!-- Level 2 time: the only regular wake -->
- **The AI** suggests the next step. **Fixed code** checks it. The AI never decides alone. <!-- Level 2 security: the spine -->
- The **permission check** answers Allow, Deny, or "a person must approve first". <!-- T2 -->
- An **arrival** is anything that comes in from outside — a person's message, or an outside system's answer — saved as a new version. A tool **declares** a wait when its result states, in a fixed form, what is awaited, from whom, and what ends it. <!-- decided 2026-10-22: the status-check answer; decided 2026-10-22: the wait a tool declares -->
- The **refund setting** is the largest refund that goes through without a person. It starts at zero, so at first every refund needs a person. <!-- decided by the owner, 2026-10-12: refund setting -->

## The path every change takes

Every change goes round the same loop. The kinds of situation below are not built from stories; they are tests run against this one loop. <!-- method: the path every change takes -->

Meera writes "Where is my parcel?". This is the common case: <!-- Section 7: how the two parts work together -->

```text
1. Meera                 -> conversation manager : "Where is my parcel?"
2. conversation manager  -> situation record     : new version, with her message on her parcel's situation
3. situation record      -> situation worker     : notice (wake)
4. situation worker      -> memory               : asks for what this step needs
5. memory                -> situation worker     : a small, relevant set
6. the AI                -> fixed code           : suggests "ask the carrier"
7. fixed code            -> situation worker     : the suggestion passes its shape check
8. situation worker      -> tool layer           : ask the carrier
9. tool layer            -> tool layer           : permission check says Allow
10. tool layer           -> carrier              : one call
11. carrier              -> tool layer           : "out for delivery, due Tuesday"
12. tool layer           -> situation worker     : evidence, with its time
13. situation worker     -> situation record     : new version: the claim, and what should be said
14. situation record     -> conversation manager : notice
15. conversation manager -> communication layer  : worth telling Meera now
16. communication layer  -> communication layer  : send check: decision saved, Allow, channel rules, allowed fields
17. communication layer  -> tool layer           : the send
18. tool layer           -> Meera                : "Your parcel is out for delivery, due Tuesday."
19. communication layer  -> sent record          : what was sent, and why
```

<!-- IB-2; IB-6; N1; S2; T2; IB-7; IB-5; Section 8: the send check -->

The same loop in words:
1. A change arrives: a message, a timer, a person's answer, or an outside system's news. <!-- B1 -->
2. If it is an arrival — a message, or an outside system's answer that the status-check service was waiting for — the conversation manager places it on its situation and saves it as a new version, drawing no conclusion. A time signal goes straight to the situation worker. <!-- IB-1; IB-2; decided 2026-10-22: the status-check answer -->
3. The new version's notice wakes the situation worker. It reads the newest version first. <!-- IB-4 -->
4. The AI suggests one step. Fixed code checks its shape, then its permission. <!-- S1; S2 -->
5. The step runs on its own fixed path. Each step is one of these: <!-- S3; Level 2 decision: behaviours -->
   - gather; ask; wait, or watch for a change; tell;
   - create work for a person, or escalate; arrange a meeting;
   - call an outside system; record the work as resolved; or stop safely.
6. The worker writes the result as a new version. <!-- Section 7 writer table: who writes what -->
7. That version wakes the conversation manager. It decides whether anyone should hear about it now. If so, the communication layer checks and sends. <!-- decided: the update decision -->
8. The run ends in one of four ways: it waits for one named thing; it records an outcome; it is blocked, with its reason shown; or it stops with work still in progress, for the next run. When the work is resolved, the conversation manager sets the situation completed. <!-- S6; decided by the owner, 2026-10-12: completed -->

Every step is recorded, and the business owner's screens are built from those records. <!-- O7; O2 -->

A change to a situation never reaches another part by a direct call. It is saved as a new version, and that version's notice wakes the next part. A part may still ask another for a read or a step: the worker asks memory for what Tend learned, or asks the tool layer to make a call. Nothing changes the situation until it is saved. The conversation manager asking the communication layer to send is such a step: what to say is already saved by the worker, and the update decision is recorded. <!-- Section 7: the parts never call each other -->

## The life of a situation

A situation is always in one of four states: <!-- states: liveness; Section 8: the states table -->
- **running:** the situation worker is working on it now;
- **waiting:** paused until a named thing wakes it;
- **blocked:** no safe step is left, and no one is left to escalate to. It does not move on its own;
- **completed:** finished and closed.

| From | To | Who makes the change | When |
|---|---|---|---|
| (new) | Running | The conversation manager writes the first version | A message arrives, or the intake step starts a situation |
| Running | Waiting | The situation worker | It writes a wait, including one a tool declares |
| Waiting | Running | The situation worker, on a wake | An answer, a time signal, a platform rule change on a channel it is about to use, or the check-in |
| Running or waiting | Blocked | The situation worker | No safe step is left, and no one is left to escalate to |
| Blocked | Running or waiting | The situation worker | What blocked it has gone, or a person acts |
| Running or waiting | Completed | The conversation manager only | The work is resolved, no wait is still running, and the last message has gone out |
| Blocked | Completed | The conversation manager | The business stops the situation, with the reason shown |
| Completed | Running | The situation worker, after the intake step decides | The closure was wrong: the same problem came back |

<!-- Section 8: the states table; decided by the owner, 2026-10-12: completed; A8; decided 2026-10-22: the wait a tool declares; decided 2026-10-22: platform rule wake -->

Who may make each change of state is written once, in [the records file](../state_view/the_records.md). In short: the situation worker moves a situation between running, waiting, and blocked; only the conversation manager sets completed. <!-- Section 8: the states table; decided by the owner, 2026-10-12: completed -->

A failure is never a fifth state. It is a recorded event, and the situation stays in one of the four. <!-- M1 -->

A blocked situation has no check-in. It wakes when what blocks it goes away, or when a person acts. <!-- Section 8 additions: blocked work -->

The business owner sees each situation in one of eleven named states, worked out from the records each time the screen is built: not started, preparing, message sent, waiting for reply, engaged, needs employee information, meeting requested, ready for owner, paused, closed, or unable to proceed. [The records file](../state_view/the_records.md) gives how each is worked out. <!-- states: display; closed item: label mapping -->

## The fifteen kinds of situation

A **kind** is a class of case in which at least one part behaves differently than in the common case above. There are fifteen. Each has its own file, with its plain-text diagram and its stories, called **walks**. <!-- decided: the fifteen kinds -->

| # | Kind | One walk beneath it | File |
|---|---|---|---|
| 1 | An irreversible action's outcome stays unknown | The refund on order 9912 that the payment provider never confirms | [unknown result](kind_01_unknown_result.md) |
| 2 | An outside system is down, slow, or too stale | Meera's carrier tracking goes quiet | [outside system down](kind_02_outside_system_down.md) |
| 3 | A partial answer arrives | An investor gets the deck now, and the revenue later | [partial answer](kind_03_partial_answer.md) |
| 4 | One instruction fans out to many people | A list of thirty people to contact | [one to many](kind_04_one_to_many.md) |
| 5 | No source and no person can answer | A parcel question with no shipping system connected | [no source](kind_05_no_source.md) |
| 6 | A timer and a reply race | Priya replies just before her follow-up is due | [timer and reply](kind_06_timer_and_reply.md) |
| 7 | An unrequested document or unknown event arrives | A supplier's bill of materials | [unrequested arrival](kind_07_unrequested_arrival.md) |
| 8 | A message cannot be pinned to one situation | "Any update?" from a customer with three open orders | [unclear message](kind_08_unclear_message.md) |
| 9 | Two sources disagree | The carrier says delivered; the customer says not received | [sources disagree](kind_09_sources_disagree.md) |
| 10 | A person does not act, or is unavailable | The finance person never answers the revenue question | [person silent](kind_10_person_silent.md) |
| 11 | An action needs approval, or must be refused | A refund above the business's refund setting | [approval or refusal](kind_11_approval_or_refusal.md) |
| 12 | The world changes while work is open | A platform changes its rules mid-conversation | [world changes](kind_12_world_changes.md) |
| 13 | Who is speaking is unknown or unverified | A stranger types a customer's order number | [unknown speaker](kind_13_unknown_speaker.md) |
| 14 | Work is blocked, interrupted, or wrongly closed | A refund marked done that never arrived | [blocked or reopened](kind_14_blocked_or_reopened.md) |
| 15 | A human commitment changes shape | A meeting is missed, then moved | [human commitment](kind_15_human_commitment.md) |

<!-- decided: the fifteen kinds -->

A new kind enters this list when a walk shows a part behaving differently from the common path in a way no kind here covers. That walk is a finding: it reopens the part of the design it touches, and the project owner approves the new kind. <!-- closed item: new kinds -->

## How each walk is checked

Each walk is a test of the design, not a description of it. A walk runs these eighteen steps, in order: <!-- method: the replay steps -->
1. Start the situation.
2. Name the person or system that started it.
3. Name the responsibility involved.
4. Name the part that owns it.
5. Name the information, and where it came from.
6. Name the current state.
7. Name what is uncertain.
8. Name who may decide.
9. Run the interaction: the hand-offs between parts.
10. Apply the decision.
11. Change the state where needed, by the part allowed to change it.
12. Follow the success path.
13. Follow the important failure paths.
14. Include a person stepping in, where it matters.
15. Include an outside system's behaviour, where it matters.
16. Follow what the result changes: which record is updated, and what wakes the situation next.
17. Name the final or continuing state.
18. Check that what happened can be reconstructed afterwards from the records.

Each kind's file runs its main walk through these steps.

A walk that needs a part, a record, or a rule the design does not have is a finding. It reopens the part of the design it touches. <!-- method: a missing concept reopens construction -->

## Open questions, and what is set later

Nothing in this file is open. The exact form of the "reopened" mark is left to whoever builds the record (deferred to implementation). <!-- A8 -->
