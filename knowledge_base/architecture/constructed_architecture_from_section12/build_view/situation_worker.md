# The situation worker

This file is for whoever builds the situation worker. It can be built from this file alone. It says what the part must do, not what technology builds it.

**Statuses.** A rule is **Decided** unless one of these words sits beside it: **Provisional** (a working choice with a condition for reopening it), or **deferred to configuration**, **deferred to Level 3**, or **deferred to implementation** (a value or a detail left, on purpose, to each business or market, to the stage that chooses the technology, or to whoever builds it; the rule around it is Decided). The project owner is the person designing Tend. On 2026-10-22 the project owner accepted every recommendation this design had made, and asked for the smaller questions inside them to be settled in the way that best fits; those points are Decided. A rule marked as "the design's reading" was worked out from its sources rather than found written down; it is Decided too. The earlier words **To confirm** and **Open** are no longer used. "The business owner" means the person who runs the business Tend serves. <!-- decided by the owner, 2026-10-22 -->

**Words used here.** A **situation** is one operational problem, such as Meera's late parcel. Its record is a list of **versions**; a new version sends a short internal **notice**. A **run** is one pass of the worker over one situation. **The AI** suggests a step, called a **proposal**; **fixed code** — code that always makes the same check — checks it. The **permission check** answers Allow, Deny, or "a person must approve first". A **wait** is a pause until one named thing happens; the **book of waits** lists every wait. A **claim** is one statement from one source, with a time. A **work item** is a task for one named person. The **escalation path** is the business's own list of who to turn to next. The **completion check** runs before the work is recorded as resolved. The **tool layer** is the only way Tend calls an outside system; the **communication layer** shapes and sends messages to people. A **trace** is the saved record of one run. The **check for an earlier attempt** looks in the situation for a step already started. An **outcome** is what came of a step: it worked, it failed (for good, or for now), or nobody knows yet. <!-- A1; HC-1; S1; Level 2 security: the spine; T2; HC-3; E1; IA-14; J5; IA-23; Section 7: tool layer; IB-8 -->

**More words.** A tool **declares** a wait when its result states, in a fixed form, what is awaited, from whom, and what ends it. An **arrival** is anything that comes in from outside — a person's message, or an outside system's answer — saved as a new version. The **refund setting** is the largest refund that goes through without a person; it starts at zero. The **settle window** is the time an outside party promises for a result to become final. A wait's **time signal** is the alarm the situation worker sets for the wait's due time; it wakes only the worker. <!-- decided 2026-10-22: the wait a tool declares; decided 2026-10-22: the status-check answer; decided by the owner, 2026-10-12: refund setting; Level 2 failure: the numbers; decided 2026-10-22: the book of waits -->

<!-- Every rule below carries its code in a hidden note. Its meaning, source, and status sit in code_index.md in this folder. -->

**1. What is this part for?**

It reasons about one situation at a time. It gathers what the next step needs, weighs the evidence, decides the next step, and writes what Tend concludes. <!-- Section 7: the parts table -->

The AI suggests each step; fixed code checks it; the worker writes the result. The worker never sends a message. It never sets a situation to completed. <!-- Section 7 additions: run steps; Section 10: the worker never sends; decided by the owner, 2026-10-12: completed -->

**2. Why is it a separate part?**

Reading messages and deciding the next step change for different reasons. A new channel changes the intake step. A change in how the business works changes the worker. Deciding and sending are separate jobs, so the part that decides never sends. The boundary decision is in [the parts file](../boundary_view/the_parts.md). <!-- Section 7 archive: rejected alternatives; method: decide and send are separate -->

**3. What does it do?**
- Understands what a change adds, keeping what was observed, claimed, inferred, and decided apart. <!-- C1; C4 -->
- Gathers only what could change the next safe step, from the source that holds it. <!-- D1; D2 -->
- Weighs the evidence: each claim is known, unknown, conflicting, ambiguous, provisional, or stale, with its reason. <!-- E3; Level 2 trust: evidence states -->
- Decides the next step: gather; ask; wait, or watch for a change; tell; create work for a person, or escalate; arrange a meeting; call an outside system; record the work as resolved; or stop safely. <!-- Level 2 decision: behaviours -->
- Keeps work alive over time: writes each wait, with what will wake it, and its entry in the book of waits, in the same save. A wait that begins and ends inside one run is not written in the book. It sets each wait's time signal, which comes straight back to it. <!-- H2; closed item: short waits in the book; settled 2026-10-22: short waits; decided 2026-10-22: the book of waits -->
- Brings people in, and arranges meetings. <!-- J1; K1 -->
- Contacts a partner — an outside business the business works with, such as its carrier — only after escalation, and only when the business's policy allows. <!-- K4 -->
- Handles failure: past a wait's limit, it declares the outcome and moves to the next safe step. For a step that cannot be undone, the outcome is unknown; for a status no source answered, it is a failure. <!-- M1; M2; IB-10; Section 8: past the bound -->

**4. What does it never do?**
- It never sends a message. The conversation manager decides whether to tell; the communication layer sends. <!-- Section 10: the worker never sends -->
- It never sets a situation to completed. <!-- decided by the owner, 2026-10-12: completed -->
- It never calls an outside system itself; the tool layer does. <!-- Section 7: tool layer -->
- It never approves its own step; fixed code checks permission. <!-- Level 2 security: three invariants -->
- It never guesses: what it does not know, it records as not known. <!-- C2 -->
- It never repeats a step that cannot be undone on an unknown outcome. <!-- IB-10 -->

**5. What does it own and write?** <!-- Section 7 writer table: who writes what -->
- gathered facts and claims, each with its source and time; conflicts; corrections;
- the next step, and what should be said;
- waits that may outlast their run, each with its entry in the book of waits — including a wait a tool declares when it hands work to the status-check service. The worker's fixed code saves that wait at once, in the same version as the step that was started, before the AI is told, and records which tool declared it; <!-- construction record, entry 21: writer question; decided 2026-10-22: the wait a tool declares; settled 2026-10-22: one version for a step and its wait -->
- what an outside system's answer means, using the fixed code of the tool that declared the wait; <!-- decided 2026-10-22: the status-check answer -->
- outcomes, and the record that the work is resolved;
- work for a person;
- whether a proposed link between situations is accepted or denied.

It moves a situation between running, waiting, and blocked, and reopens a situation whose closure was wrong. <!-- Section 8: the states table -->

**6. What does it decide, and what may it not decide?**

| Decision | Who decides | Who acts | Who approves |
|---|---|---|---|
| The next step | The AI suggests; fixed code checks; the worker writes it | The worker, or the tool layer for an outside call | A named person, where the permission check asks for one |
| Whether a run has made enough progress to stop | Fixed rules | The worker | — |
| Whether to accept a proposed link | The worker, on evidence | The worker | — |
| How a conflict is treated | Fixed code, by the business's rules | The worker | A person, when nothing else settles it |
| Whether to tell anyone | Not the worker: the conversation manager | The communication layer | — |

<!-- Section 7 additions: run steps; Section 7: links; Level 2 trust: fixed code treats conflicts; E5; decided: the update decision -->

**7. What makes it change, and what makes it grow?**

It changes when the business changes how its work is handled, such as the refund setting or how long Tend waits for a carrier, or when a new kind of situation appears. This is the design's reading. <!-- change drivers: situation worker -->

It grows with the number of open situations; each runs on its own. <!-- Level 1: more situations -->

**8. What starts it, what does it read, and what does it hand on?**
- **Starts it:** a notice of a new version — a message, an outside system's answer saved as an arrival, or a platform rule change on a channel it is about to use; or a time signal it set for one of its waits, or the check-in. After a restart, it sets every time signal again from the book of waits. <!-- IB-1; IB-2; decided by the owner, 2026-10-17; decided 2026-10-22: the status-check answer; decided 2026-10-22: platform rule wake; decided 2026-10-22: the book of waits -->
- **Reads:** the newest version of the situation; the small set memory gives it; the trusted permission store, through the checks; evidence from the tool layer, including a declared wait. <!-- IB-4; N1; AC-4; IB-7; decided 2026-10-22: the wait a tool declares -->
- **Hands on:** new versions of the situation, whose notices wake the conversation manager — a work item for a person, too, is a new version, which the conversation manager decides to send; calls to the tool layer, each a request for a step, never a change to the situation. <!-- Section 7: how the two parts work together -->

**9. How does it work inside?**

No timer asks an outside system again: the status-check service does the asking, and its answer, or the wait's time signal, wakes the worker. <!-- closed item: recheck timer -->

Every run follows the same steps, in order: <!-- S1 -->
1. **Wake** on a change or a time signal.
2. **Drop repeats.** A change already handled is dropped.
3. **Finish what was cut short.** One run per situation at a time.
4. **Suggest.** The AI suggests one step, as a proposal.
5. **Check.** Fixed code checks its shape — its fixed form, its limits, that it was made from the newest version — then its permission.
6. **Do.** One fixed path for that kind of step.
7. **Save.** The new version, if anything changed.
8. **Stop, or go round again.** A round counts as progress only if the record changed in one of five ways: new evidence arrived; a needed claim came from a source not yet asked in this wake; a wait was written, refreshed, or finished; an outcome was declared; or a permission changed. The AI's own report of progress never counts. A run ends in one of four ways: it waits for one named thing; it records an outcome; it is blocked, with its reason shown; or it stops with work still in progress, for the next run.

Before the work is recorded as resolved, the completion check runs: every question has one of its six endings (answered; waiting, with a reason; passed to a person; "Tend cannot know this here", with the customer still answered; waived; or replaced by a newer question), no person's task is pending, an approval request included, no "Tend cannot know this here" answer is shown as a success, and every claim told to a customer has evidence.

<!-- S2; E9; S6; IA-23 -->

```text
wake ─▶ drop repeats ─▶ one run at a time ─▶ AI suggests ─▶ fixed code checks shape, then permission
                                                                 │ badly formed: limited repair, then a new suggestion
                                                                 │ Deny: this proposal ends, its reason kept
                                                                 │ a person must approve first: wait for that person
                                                                 ▼ Allow
                                     save new version ◀── do it, on its one fixed path
                                            │
                       progress made? ──────┼── no ──▶ stop (wait, outcome, blocked, or work in progress)
                                            └── yes ─▶ go round again
```

**10. How does it behave in each kind of situation?**

| Kind of situation | What the worker does | Walk |
|---|---|---|
| A customer asks a question a tool can answer (the common case) | Asks through the tool layer; records the evidence; writes what should be said | [how a situation moves](../behaviour_view/how_a_situation_moves.md) |
| 1. An irreversible action's outcome stays unknown | Saves the started refund, its unknown outcome, and the wait the refund tool declared, in one version, before the AI is told; when the provider's answer arrives, reads it through the refund tool's code; a person gets the timeline once the settle window ends; never repeats the refund | [kind 1](../behaviour_view/kind_01_unknown_result.md) |
| 2. An outside system is down, slow, or too stale | Waits inside the limit; writes an interim update before the promised time; records a failure past the limit | [kind 2](../behaviour_view/kind_02_outside_system_down.md) |
| 3. A partial answer arrives | Keeps each question apart; answers one; gives the other to a person | [kind 3](../behaviour_view/kind_03_partial_answer.md) |
| 4. One instruction fans out to many people | Runs each person's situation on its own | [kind 4](../behaviour_view/kind_04_one_to_many.md) |
| 5. No source and no person can answer | Records that Tend cannot know this here — not a failure; only that question stops | [kind 5](../behaviour_view/kind_05_no_source.md) |
| 6. A timer and a reply race | Answers and cancels the wait in one version; a timer for a replaced wait does nothing | [kind 6](../behaviour_view/kind_06_timer_and_reply.md) |
| 7. An unrequested document or unknown event arrives | Records the document as a claim, not an order; for an unknown event, creates work for a person | [kind 7](../behaviour_view/kind_07_unrequested_arrival.md) |
| 8. A message cannot be pinned to one situation | Not involved until the message is placed | [kind 8](../behaviour_view/kind_08_unclear_message.md) |
| 9. Two sources disagree | Keeps both claims; fixed code decides what the conflict blocks; a person settles it if nothing else does | [kind 9](../behaviour_view/kind_09_sources_disagree.md) |
| 10. A person does not act, or is unavailable | Names the reason for the silence; cover first, then the escalation path | [kind 10](../behaviour_view/kind_10_person_silent.md) |
| 11. An action needs approval, or must be refused | Waits for the approver; writes an honest refusal | [kind 11](../behaviour_view/kind_11_approval_or_refusal.md) |
| 12. The world changes while work is open | Woken by the conversation manager when a platform rule changes on a channel it is about to use, it re-plans under the new rule; keeps the policy version a situation started with | [kind 12](../behaviour_view/kind_12_world_changes.md) |
| 13. Who is speaking is unknown or unverified | Not involved; nothing is revealed | [kind 13](../behaviour_view/kind_13_unknown_speaker.md) |
| 14. Work is blocked, interrupted, or wrongly closed | Marks blocked with its reason; continues from the newest version after a restart; reopens a wrongly closed situation | [kind 14](../behaviour_view/kind_14_blocked_or_reopened.md) |
| 15. A human commitment changes shape | Books again inside each person's agreed times; handles a pending handoff | [kind 15](../behaviour_view/kind_15_human_commitment.md) |

<!-- decided: the fifteen kinds -->

**11. What are its key moments?**
- The refund on order 9912 that the payment provider never confirms (kind 1).
- Priya's reply two minutes before her follow-up (kind 6).
- Meera's carrier down past its limit (kind 2).

**12. What happens when things go wrong?**
- A proposal with a bad shape gets a limited repair; then the AI suggests again. <!-- S2 -->
- A refused step ends that proposal, not the situation. <!-- AC-3 -->
- Past a wait's limit, its time signal wakes the worker, which declares the outcome: unknown for a step that cannot be undone, failure for a status no source answered. <!-- M2; Section 8: past the bound; closed item: recheck timer -->
- If the tool layer is down, the worker saves no change that depends on it. <!-- Section 7: failure and unavailability -->
- When no safe step is left and no one is left to escalate to, the situation is blocked, with its reason. <!-- Section 8 states -->
- A worker that crashes mid-run continues from the newest saved version; it does not start over. <!-- H6 -->
- Memory with no item that fits never blocks a decision. Memory that cannot be reached blocks only a step that is safe only with its context; the worker then waits for memory, with a due time, or gives the step to a person. <!-- Section 7: memory, missing memory; settled 2026-10-22: memory unreachable -->

**13. Which rules must always hold here?**

| Rule | How a break would show |
|---|---|
| The worker never sends | A message with no decision to send behind it |
| A wait a tool declares is saved before the AI is told | The AI told "the refund is waiting" while no wait is saved |
| A timer wakes only the worker, which reads the newest version first | Priya gets her follow-up after she already replied |
| A step that cannot be undone is never repeated on an unknown outcome | The refund on order 9912 paid twice |
| A guess is never stored as a fact | A claim with no source in the record |
| The AI's own report of progress never counts | A run that loops with nothing new recorded |

<!-- Section 10: the worker never sends; decided 2026-10-22: the wait a tool declares; IB-1; IB-4; IB-10; C2; E9 -->

**14. What must be visible afterwards?**

Each run's trace: what woke it, the version it read, the proposal, each check's result, the grant used, what was done, the reason in business terms, the outcome, and where the run stopped. No personal data goes into a trace. <!-- Section 8: the trace; settled page: no personal data in a trace -->

**15. How do we know it is built correctly?**
- A timer for a cancelled wait produces no message and no error. A failure looks like: Priya gets her follow-up after she replied.
- A second refund proposed while the first is unknown is stopped by the check for an earlier attempt. A failure looks like: two refund calls for order 9912.
- A proposal that leaves out a required field is sent back as a shape failure, not as a refusal of permission. A failure looks like: a missing field reported as "not allowed".
- The worker never sets a situation to completed. A failure looks like: a completed version written by the worker.
- After a crash mid-run, the situation continues from its newest version, and no step that cannot be undone is repeated. A failure looks like: the run starting from the first version, or a refund sent again.

<!-- IB-4; IB-8; INV-6; decided by the owner, 2026-10-12: completed; H6 -->

**16. What is still open?**

Nothing in this part is open. The values each business sets — wait limits, check-in intervals, its escalation path — come with its settings, with product defaults: deferred to configuration. <!-- Level 2 failure: the numbers -->

**17. Where did this come from?**

[The parts file](../boundary_view/the_parts.md) (the boundary decision), [the interactions file](../interaction_view/the_interactions.md) (interactions 2, a timer wakes; 4, calling an outside system; 5, a step that cannot be undone; 10, work for a person; 12, a meeting; 14, completed), [the records file](../state_view/the_records.md), [the rules that always hold](../constraint_view/the_rules_that_always_hold.md), [the decisions file](../decision_view/the_decisions.md) (decisions 1, 3, 7, 11, and 19, 20, 22, settled on 2026-10-22), and the responsibility view's [gathering](../responsibility_view/gathering_and_trust.md), [deciding](../responsibility_view/deciding_and_permission.md), [time and people](../responsibility_view/time_people_and_meetings.md), and [failure](../responsibility_view/failure_and_recovery.md) files.
