# The status-check service

This file is for whoever builds the status-check service. It can be built from this file alone. It says what the part must do, not what technology builds it.

**Statuses.** A rule is **Decided** unless one of these words sits beside it: **Provisional** (a working choice with a condition for reopening it), or **deferred to configuration**, **deferred to Level 3**, or **deferred to implementation** (a value or a detail left, on purpose, to each business or market, to the stage that chooses the technology, or to whoever builds it; the rule around it is Decided). The project owner is the person designing Tend. On 2026-10-22 the project owner accepted every recommendation this design had made, and asked for the smaller questions inside them to be settled in the way that best fits; those points are Decided. A rule marked as "the design's reading" was worked out from its sources rather than found written down; it is Decided too. The earlier words **To confirm** and **Open** are no longer used. "The business owner" means the person who runs the business Tend serves. <!-- decided by the owner, 2026-10-22 -->

**Words used here.** An **outside system** is any system Tend does not own, such as a payment provider or a carrier. A **wait** is a pause until one named thing happens. The **book of waits** is the list of every wait that may outlast its run, kept with the situation records. A **version** is one saved state of a situation; a new version sends a short internal **notice**. An **arrival** is anything that comes into Tend from outside, which the conversation manager's **intake step** saves as a new version. The **situation worker** reasons about one situation and decides its next step. The **tool layer** is the only way Tend calls an outside system. The **escalation path** is the business's own list of who to turn to next. **Asking** is the service asking an outside system for news. Its **limits** are three numbers that bound the asking: how many asks, the gap between them, and the total time. To **wake** a situation is to start the worker's next run on it. <!-- Section 7: tool layer; HC-3; decided 2026-10-22: the book of waits; HC-1; decided 2026-10-22: the status-check answer; J5; decided by the owner, 2026-10-17 -->

**More words.** A tool **declares** a wait when its result states, in a fixed form, what is awaited, from whom, and what ends it. A wait's **time signal** is the alarm the situation worker sets for the wait's due time; it wakes only the worker. The **technology stage** is Level 3, where the technology is chosen part by part. <!-- decided 2026-10-22: the wait a tool declares; decided 2026-10-22: the book of waits; method: the build order -->

<!-- Every rule below carries its code in a hidden note. Its meaning, source, and status sit in code_index.md in this folder. -->

**1. What is this part for?**

It is the one place that waits on an outside system while the work goes on. <!-- decided by the owner, 2026-10-17 -->

It is the product loop's one use of **watching from outside** (the harness study, Part 1): it keeps a named wait alive and does no reasoning; when the outside system answers, or the wait's time is up, the work wakes. <!-- PL-18 -->

**2. Why is it a separate part?**

It serves many situations at once, so the situation worker never has to stop and wait. The boundary decision is in [the parts file](../boundary_view/the_parts.md). <!-- decided 2026-10-09: the status-check service; decided by the owner, 2026-10-17 -->

**3. What does it do?** <!-- decided by the owner, 2026-10-17 -->
- It listens for the news an outside system sends on its own.
- It also asks for news itself, within its three limits. It decides only **when** to ask; the tool layer makes each ask. <!-- decided 2026-10-22: the service calls through the tool layer -->
- When an answer comes, it sends it as an event, addressed to the wait it answers, with the outside system's own reference. The intake step saves it as an arrival, and that version's notice wakes the situation worker. <!-- decided 2026-10-22: the status-check answer -->
- When its asking runs out with no answer, the wait's own time signal wakes the worker, and the work is escalated as the business has set. <!-- closed item: recheck timer -->

**4. What does it never do?**
- It never decides what a result means; the situation worker does, using the fixed code of the tool that declared the wait. <!-- decided by the owner, 2026-10-17; decided 2026-10-22: the status-check answer -->
- It never writes anything into a situation, and never creates a wait. The tool declares a wait; the worker saves it. <!-- decided 2026-10-22: the wait a tool declares -->
- It never calls an outside system itself. Every ask goes out through the tool layer, which holds the connection codes, runs the permission check, and records the call. <!-- decided 2026-10-22: the service calls through the tool layer -->
- Its asking never wakes a situation; only its answer does. <!-- construction record, entry 21: asking does not wake -->
- It decides nothing about the business's work. <!-- Section 11 §5: the parts table -->

**5. What does it own and write?**

Nothing in any situation. It owns its own **record of asks**: for each wait it serves, how many asks it has made and when it may ask next — like the tool layer's record of its tries. It is not a list of what situations wait for: it is never used to match an arrival, it is rebuilt from the book of waits after a restart, and it decides nothing about any situation. <!-- settled 2026-10-22: the service's own list -->

**6. What does it decide, and what may it not decide?**

| Decision | Who decides | Who acts | Who approves |
|---|---|---|---|
| When to ask next, and when to stop asking | The service, within the limits set for that outside system | The tool layer makes each ask | — |
| Whether an ask may run | The tool layer's permission check | The tool layer | — |
| What the answer means | The situation worker, using the declaring tool's fixed code | The situation worker | — |
| What happens when the asking runs out | The wait's time signal wakes the worker, which declares the outcome | The situation worker | — |

<!-- Section 11 §5: the parts table; decided by the owner, 2026-10-17; decided 2026-10-22: the service calls through the tool layer; decided 2026-10-22: the status-check answer -->

**7. What makes it change, and what makes it grow?**

It changes when outside systems change how long they take to give a final answer, or how they report it. This is the design's reading. <!-- change drivers: status-check service -->

If one outside system's answers come so fast that the hop through the intake step delays the work, a faster lane is a choice for the technology stage; the rule stays. <!-- decided 2026-10-22: the status-check answer -->

**8. What starts it, what does it read, and what does it hand on?**
- **Starts it:** a saved wait on an outside system. Most often a tool asked for news up to five times for one wait, then its result declared the wait, and the worker's fixed code saved it with the started step. The saved wait's notice reaches the service, which reads the wait from the book of waits. Only a tool declares a wait on an outside system. <!-- M5; settled 2026-10-22: the five per wait; decided 2026-10-22: the wait a tool declares; construction record, entry 21: the service serves several layers; decided 2026-10-22: the book of waits -->
- **Reads:** the wait, from the book of waits; the news the outside system sends; and the answers to its own asks, through the tool layer.
- **Hands on:** its answer, as an event addressed to its wait, to the conversation manager's intake step. <!-- decided 2026-10-22: the status-check answer -->

**9. How does it work inside?** <!-- decided by the owner, 2026-10-17 -->
1. A saved wait on an outside system is announced. The service reads it from the book of waits, and starts its record of asks for that wait.
2. It listens for the outside system's news.
3. When the limits allow, it asks for news, through the tool layer, as the same tool's read-only status check.
4. When an answer comes, it sends it as an event: the wait it answers, the outside system's own reference, and the answer. Its record of asks for that wait ends.
5. When its limits run out with no answer, it stops asking. The wait's own time signal, set by the worker, wakes the worker, which declares the outcome; the business's escalation path runs.

```text
wait saved (notice) ─▶ read the wait from the book ─▶ listen ─┬─▶ news arrives ─▶ event to the intake step ─▶ arrival saved ─▶ notice ─▶ worker
                                                              │
                         ask, within limits, through the tool layer
                                                              └─▶ limits used up, no news ─▶ stop asking; the wait's time signal wakes the worker
```

<!-- decided 2026-10-22: the book of waits; decided 2026-10-22: the service calls through the tool layer; decided 2026-10-22: the status-check answer; closed item: recheck timer -->

The limits are set for each outside system when its tool is added, within that system's published limits. A business may tighten them. <!-- settled 2026-10-22: the service's limits -->

An outside system that offers no way to ask can only be listened to. Then the service only listens, and the wait's due time brings in the escalation path. An outside system that can neither be asked nor sends news gives the service nothing to wait on: the result is declared unknown at once, and a person gets the full record. <!-- Section 8 additions: no check path -->

**10. How does it behave in each kind of situation?**

| Kind of situation | What the status-check service does |
|---|---|
| [1. An irreversible action's outcome stays unknown](../behaviour_view/kind_01_unknown_result.md) | Serves the wait the refund tool declared; asks the payment provider through the tool layer; sends "refund 9912 paid" as an event for that wait |
| [2. An outside system is down, slow, or too stale](../behaviour_view/kind_02_outside_system_down.md) | Waits on the carrier within the limits; when its asking runs out, the wait's time signal wakes the worker, and the escalation path runs |
| [3. A partial answer arrives](../behaviour_view/kind_03_partial_answer.md) | Not involved beyond the common path |
| [4. One instruction fans out to many people](../behaviour_view/kind_04_one_to_many.md) | Not involved beyond the common path |
| [5. No source and no person can answer](../behaviour_view/kind_05_no_source.md) | Not involved: there is no source to wait on |
| [6. A timer and a reply race](../behaviour_view/kind_06_timer_and_reply.md) | Not involved beyond the common path |
| [7. An unrequested document or unknown event arrives](../behaviour_view/kind_07_unrequested_arrival.md) | Not involved beyond the common path |
| [8. A message cannot be pinned to one situation](../behaviour_view/kind_08_unclear_message.md) | Not involved beyond the common path |
| [9. Two sources disagree](../behaviour_view/kind_09_sources_disagree.md) | Not involved beyond the common path |
| [10. A person does not act, or is unavailable](../behaviour_view/kind_10_person_silent.md) | Not involved: people's silence is handled by the escalation path |
| [11. An action needs approval, or must be refused](../behaviour_view/kind_11_approval_or_refusal.md) | Not involved beyond the common path |
| [12. The world changes while work is open](../behaviour_view/kind_12_world_changes.md) | Not involved beyond the common path |
| [13. Who is speaking is unknown or unverified](../behaviour_view/kind_13_unknown_speaker.md) | Not involved beyond the common path |
| [14. Work is blocked, interrupted, or wrongly closed](../behaviour_view/kind_14_blocked_or_reopened.md) | Its waits stay in the book of waits across a restart; it rebuilds its record of asks from the book |
| [15. A human commitment changes shape](../behaviour_view/kind_15_human_commitment.md) | Not involved beyond the common path |

The walks are in [how a situation moves](../behaviour_view/how_a_situation_moves.md). <!-- decided: the fifteen kinds -->

**11. What are its key moments?**

- The refund on order 9912. The payment provider gives no final answer after the refund tool's asks. The tool declares the wait; the worker saves it with "refund started, result unknown". The service asks the provider through the tool layer, and listens. Two days later "refund 9912 paid" arrives. The service sends it as an event for the refund's wait; the intake step saves it as an arrival; the worker wakes, reads it through the refund tool's code, records the refund as paid, and ends the wait (kind 1).
- Meera's carrier does not answer. The service asks within its limits. When the asking runs out, the wait's time signal wakes the worker, and the business's escalation path runs (kind 2).

**12. What happens when things go wrong?**
- If the service is down, waits stay in the book of waits inside their limits. Past a wait's limit, its time signal wakes the situation worker, which declares the outcome. When the service is back, it rebuilds its record of asks from the book of waits. <!-- Section 7: failure and unavailability; Section 8: past the bound; decided 2026-10-22: the book of waits -->
- An outside system sends the same answer twice. The intake step's repeat check, keyed by the wait and the outside system's reference, drops the second. <!-- decided 2026-10-22: the status-check answer -->
- An ask is refused by the permission check. The refusal is recorded by the tool layer; the service does not ask another way. <!-- decided 2026-10-22: the service calls through the tool layer -->
- When its asking runs out, the wait's time signal wakes the worker, which declares the outcome; the escalation path then runs. <!-- decided by the owner, 2026-10-17; closed item: recheck timer -->

**13. Which rules must always hold here?**

| Rule | How a break would show |
|---|---|
| Its answer reaches the situation only as an arrival, saved before anything acts on it | "Refund paid" known to the service, while Meera's situation has no saved answer behind it |
| Its asking never wakes a situation | A situation woken with no new answer |
| Every ask goes out through the tool layer | A call to the payment provider with no record in the tool layer |
| Asking is limited in number, gap, and total time | A carrier asked for news every few seconds for days |
| It never decides what a result means | The service marking the refund case done |

<!-- decided by the owner, 2026-10-17; decided 2026-10-22: the status-check answer; construction record, entry 21: asking does not wake; decided 2026-10-22: the service calls through the tool layer -->

**14. What must be visible afterwards?**

Each wait it served, each ask (in the tool layer's record of calls), the answer as an arrival in the situation's history, and when its asking ran out. <!-- O7; decided 2026-10-22: the service calls through the tool layer -->

**15. How do we know it is built correctly?**
- An answer from the outside system appears in the situation's history as an arrival before any step that uses it, and the worker wakes on it. A failure looks like: the service knows "refund paid" while Meera's situation has no saved answer.
- Every ask appears in the tool layer's record of calls, and nowhere else. A failure looks like: a call with no tool-layer record, or connection codes held by the service.
- The asking stops at its limits; then the wait's time signal wakes the worker. A failure looks like: a carrier asked for news every few seconds for days.
- A repeated answer causes no second effect. A failure looks like: the refund recorded as paid twice.
- Many situations can wait at once without the worker stopping. A failure looks like: one slow carrier holding up every other situation.

<!-- decided by the owner, 2026-10-17; decided 2026-10-22: the status-check answer; decided 2026-10-22: the service calls through the tool layer -->

**16. What is still open?**

Nothing in this part is open. Each outside system's limits — how many asks, how far apart, for how long — are set when its tool is added (deferred to configuration). <!-- settled 2026-10-22: the service's limits; Level 2 failure: the numbers -->

**17. Where did this come from?**

[The parts file](../boundary_view/the_parts.md) (the boundary decision), [the interactions file](../interaction_view/the_interactions.md) (interaction 6, a long wait), [the decisions file](../decision_view/the_decisions.md) (decision 16, the status-check service; decisions 19 to 22, settled on 2026-10-22), [the seven blocking questions](../checking/blocking_questions.md) (questions 1 to 4, with every option compared), and [the time and people file](../responsibility_view/time_people_and_meetings.md).
