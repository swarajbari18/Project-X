# The conversation manager

This file is for whoever builds the conversation manager's own work: the intake step, the update decision, and setting a situation to completed. The conversation manager also contains the situation worker and the communication layer; each of those has its own file. This file can be built from itself alone. It says what the part must do, not what technology builds it. <!-- decided by the owner, 2026-10-10: what the conversation manager contains -->

**Statuses.** A rule is **Decided** unless one of these words sits beside it: **Provisional** (a working choice with a condition for reopening it), or **deferred to configuration**, **deferred to Level 3**, or **deferred to implementation** (a value or a detail left, on purpose, to each business or market, to the stage that chooses the technology, or to whoever builds it; the rule around it is Decided). The project owner is the person designing Tend. On 2026-10-22 the project owner accepted every recommendation this design had made, and asked for the smaller questions inside them to be settled in the way that best fits; those points are Decided. A rule marked as "the design's reading" was worked out from its sources rather than found written down; it is Decided too. The earlier words **To confirm** and **Open** are no longer used. "The business owner" means the person who runs the business Tend serves. <!-- decided by the owner, 2026-10-22 -->

**Words used here.** A **situation** is one operational problem, such as Meera's late parcel. Its record is a list of **versions**; a new version sends a short internal **notice**. The **intake step** is the fixed first step that reads each new arrival. An **arrival** is anything that comes in from outside: a message, a person's answer, an outside system's answer such as the status-check service's. The **book of waits** is the list of every wait that may outlast its run, kept with the situation records. A **held note** records that a message may belong to a situation; it changes nothing there. The **update decision** is the choice: is this change worth telling this person now? A **wait** is a pause until one named thing happens. A **channel** is one way of reaching a person: WhatsApp, email, Telegram, or the website chat. A **checked sender** is one whose identity Tend has confirmed from something it can check: a sign-in proves a person; a channel bound to a member proves only the channel, and names the member. A **clear match** joins a message to one situation; a **weak match** could fit a situation but may not, so Tend asks instead of guessing. A **closed situation** is one set to completed. "The worker" means the situation worker. <!-- A1; HC-1; decided 2026-10-22: the status-check answer; decided 2026-10-22: the book of waits; B9; decided: the update decision; L1; AC-1; decided 2026-10-22: identity and permission; Section 8: routing outcomes -->

**More words.** A **member** is a person who works for the business, proved by the sign-in provider the business uses (the outside service that checks who a person is when they sign in). A channel **bound** to a member shows only which channel a message came through, and names that member. <!-- decided 2026-10-22: identity and permission -->

<!-- Every rule below carries its code in a hidden note. Its meaning, source, and status sit in code_index.md in this folder. -->

**1. What is this part for?**

It reacts when a message arrives, or when the worker writes a new version, and decides whether people should hear an update. It puts each message on the right situation. It records what came in. It alone sets a situation to completed. A timer never reaches it; a timer wakes only the worker. <!-- Section 7: the parts table; IB-1 -->

**2. Why is it a separate part?**

Every message in and every message out passes through it. It only records and routes, and leaves the reasoning to the worker, so that path stays simple. That reason comes from an earlier form of the design. The boundary decision is in [the parts file](../boundary_view/the_parts.md). <!-- Section 7 archive: conversation manager record -->

**3. What does it do?**
- **Routes each change** to the right situation, at its intake step, before anything is gathered. <!-- B2; IB-2 -->
- **Records what came in:** each message, with the channel's reference to the original; each person's answer, an approver's included; each outside system's answer, saved on the wait it answers, with the outside system's reference. It draws no conclusion from any of them. <!-- B7; Section 7 writer table: who writes what; decided 2026-10-22: the status-check answer; closed item: approval answer route -->
- **Fixes which business a message belongs to, and who sent it**, once, from what it can check — never from the message's text. A sign-in proves a person. A channel bound to a member proves only the channel, so routine words from it are recorded as claims, "person not verified". <!-- AC-1; decided 2026-10-22: identity and permission -->
- **Wakes the affected situations after a platform rule changes.** It reacts to the channel rule record's update, reads the book of waits, and writes one version into each situation with a step pending on that channel. Many wakes are released at a steady pace. <!-- decided 2026-10-22: platform rule wake; settled 2026-10-22: steady pace -->
- **Makes the update decision** for each new version the worker writes. <!-- decided: the update decision -->
- **Sets a situation to completed.** <!-- decided by the owner, 2026-10-12: completed -->
- **Decides at intake whether a message reopens a closed situation.** <!-- A8 -->
- **Files a document nobody asked for** on the matching situation, or on the sender's contact record, the channel identifier kept for that sender. <!-- decided by the owner, 2026-10-10 -->

**4. What does it never do?**
- It never decides the next step for a problem; the situation worker does. <!-- Section 11 §5: the parts table -->
- It never sets waiting or blocked. <!-- Section 8: the states table -->
- It never writes what Tend concludes about a situation. <!-- Section 8 anti-patterns -->
- It never guesses which situation a message belongs to. <!-- B3 -->
- It never treats a bound channel as proof of the person. <!-- decided 2026-10-22: identity and permission -->

**5. What does it own and write?** <!-- Section 7 writer table: who writes what -->
- the first version of each new situation, written at intake, with what came in; there is no empty record; <!-- IB-6 -->
- each incoming message: attached, new, or held; <!-- Section 8: routing outcomes -->
- held notes; <!-- B9 -->
- each person's answer;
- each outside system's answer, as an arrival on the wait it answers; <!-- decided 2026-10-22: the status-check answer -->
- after a platform rule change, one version in each situation with a step pending on that channel; <!-- decided 2026-10-22: platform rule wake -->
- whether an update is worth telling;
- completed.

It may also propose a link when it creates a situation. For example, a second outreach to Priya is linked to her first, closed one. <!-- Section 7: links -->

**6. What does it decide, and what may it not decide?**

| Decision | Who decides | Who acts | Who approves |
|---|---|---|---|
| Which situation a message belongs to | The intake step: a clear match joins; no match starts a new situation or holds the message; a message that clearly belongs to two situations creates two; a weak match asks the sender | The conversation manager | — |
| Where an outside system's answer belongs | The intake step, from the wait it names, read from the book of waits; a repeat, keyed by the wait and the outside system's reference, is dropped | The conversation manager | — |
| Which situations to wake after a platform rule change | The conversation manager, from the book of waits: those with a step pending on that channel | The conversation manager | — |
| Whether a closure was wrong | The intake step, when a message refers to a closed situation | The situation worker reopens the record | — |
| Whether a change is worth telling | The conversation manager | The communication layer sends | — |
| That a situation is completed | The conversation manager, in one of two cases: the worker has recorded the work as resolved, no wait is still running, and the last message has gone out; or the business has stopped a blocked situation | The conversation manager | — |

<!-- Section 8: routing outcomes; decided 2026-10-22: the status-check answer; decided 2026-10-22: platform rule wake; A8; decided: the update decision; decided by the owner, 2026-10-12: completed; Section 8: the states table -->

**7. What makes it change, and what makes it grow?**

It changes when a new channel appears, when a message can arrive in a new way, or when the business changes when a person should hear an update. This is the design's reading. <!-- change drivers: conversation manager -->

It grows with the number of incoming messages, and with one instruction that creates many situations at once. <!-- B6 -->

**8. What starts it, what does it read, and what does it hand on?**
- **Starts it:** an incoming message; an outside system's answer, sent by the status-check service as an event; a notice of a version the worker wrote; the update of a channel's rule record. <!-- Section 8: which change starts which part; decided 2026-10-22: the status-check answer; decided 2026-10-22: platform rule wake -->
- **Reads:** short summaries of the sender's open situations, for matching; the full record only after a match; the book of waits, to match an outside answer to its wait and to find the situations a rule change affects; membership and channel bindings, to fix who sent a message. <!-- B5; decided 2026-10-22: the book of waits; decided 2026-10-22: identity and permission -->
- **Hands on:** a new version, whose notice wakes the worker; a "worth telling" to the communication layer. <!-- IB-2; IB-5 -->

**9. How does it work inside?**
1. An arrival comes in. One already handled is dropped; for an outside system's answer, the repeat check is keyed by the wait and the outside system's reference. <!-- S12; decided 2026-10-22: the status-check answer -->
2. The sender is checked, and the business fixed, from what can be checked. <!-- AC-1; decided 2026-10-22: identity and permission -->
3. The intake step matches the message against short summaries of open situations. <!-- B5 -->
4. It attaches, creates, holds, or asks — and writes the result as a new version. <!-- Section 8: routing outcomes -->
5. Later, for each version the worker writes, it makes the update decision. <!-- decided: the update decision -->
6. When the worker has recorded the work as resolved, and no wait is still running and the last message has gone out, it sets completed. It also sets completed when the business stops a blocked situation. <!-- decided by the owner, 2026-10-12: completed; Section 8: the states table -->
7. When a channel's rule record is updated, it reads the book of waits and writes one version into each situation with a step pending on that channel, at a steady pace. <!-- decided 2026-10-22: platform rule wake; settled 2026-10-22: steady pace -->

```text
arrival ─▶ drop repeats ─▶ check sender, fix the business ─▶ match against summaries, or the wait it names
                                                                  │
                         ┌──────────────┬──────────────┬─────────┴───────┐
                       attach        new situation    held note       ask the sender
                         └──────┬───────┘              │                 │
                                ▼                      ▼                 ▼
          new version ─▶ notice ─▶ worker      record of held notes    communication layer
                                               (no version, no notice)

worker's new version ─▶ update decision ─▶ worth telling? ─▶ communication layer
resolved, no wait running, last message out ─▶ completed
the business stops a blocked situation ──────▶ completed, with the reason shown
a channel's rule record updated ─▶ read the book of waits ─▶ one version in each affected situation ─▶ notice ─▶ worker
```

**10. How does it behave in each kind of situation?**

| Kind of situation | What the conversation manager does |
|---|---|
| [1. An irreversible action's outcome stays unknown](../behaviour_view/kind_01_unknown_result.md) | Saves the payment provider's answer, when it comes, as an arrival on the refund's wait; decides the customer should hear that the business is waiting |
| [2. An outside system is down, slow, or too stale](../behaviour_view/kind_02_outside_system_down.md) | Decides the interim update is worth telling before the promised time |
| [3. A partial answer arrives](../behaviour_view/kind_03_partial_answer.md) | Decides the partial answer is worth sending now |
| [4. One instruction fans out to many people](../behaviour_view/kind_04_one_to_many.md) | Creates one situation per person |
| [5. No source and no person can answer](../behaviour_view/kind_05_no_source.md) | Decides the honest answer is worth telling |
| [6. A timer and a reply race](../behaviour_view/kind_06_timer_and_reply.md) | Records the reply first, as its own version |
| [7. An unrequested document or unknown event arrives](../behaviour_view/kind_07_unrequested_arrival.md) | Files the document; a person sees it if nothing matches |
| [8. A message cannot be pinned to one situation](../behaviour_view/kind_08_unclear_message.md) | Writes a held note, and asks the sender |
| [9. Two sources disagree](../behaviour_view/kind_09_sources_disagree.md) | Decides the honest interim message is worth telling |
| [10. A person does not act, or is unavailable](../behaviour_view/kind_10_person_silent.md) | Records the person's answer when it comes |
| [11. An action needs approval, or must be refused](../behaviour_view/kind_11_approval_or_refusal.md) | Saves the approver's answer as an arrival, as it saves every person's answer; the worker hands it to the waiting tool step as its result. Decides whether to tell the person about a refusal |
| [12. The world changes while work is open](../behaviour_view/kind_12_world_changes.md) | After a platform rule change, wakes the situations with a step pending on that channel, read from the book of waits |
| [13. Who is speaking is unknown or unverified](../behaviour_view/kind_13_unknown_speaker.md) | Fixes the business and sender from what can be checked: a sign-in proves a person, a bound channel only the channel; reveals nothing |
| [14. Work is blocked, interrupted, or wrongly closed](../behaviour_view/kind_14_blocked_or_reopened.md) | Decides at intake whether a closure was wrong; completes a blocked situation the business stops |
| [15. A human commitment changes shape](../behaviour_view/kind_15_human_commitment.md) | Records each person's answer |

The walks are in [how a situation moves](../behaviour_view/how_a_situation_moves.md). <!-- decided: the fifteen kinds; AC-3; closed item: approval answer route -->

**11. What are its key moments?**
- "Any update?" from Meera with three open orders (kind 8).
- A stranger typing Meera's order number (kind 13).
- Meera's refund marked done that never arrived (kind 14).

**12. What happens when things go wrong?**
- If it is down, incoming messages are held, and nothing is sent. <!-- Section 7: failure and unavailability -->
- A message placed on the wrong situation is corrected later: split, linked, or moved. Two situations later found to be one problem are merged, and the merge is recorded with its reason. <!-- B4 -->
- If the sender never answers its question, the held message stays held and changes nothing; the sender's next message runs the match again; a held note still unplaced when the business's wait limit passes goes to a person to place. <!-- closed item: unanswered routing question -->
- If a platform rule change affects many situations, their wakes are released at a steady pace; if it stops part-way, it starts again from the rule record's update, and skips situations that already hold the version. <!-- settled 2026-10-22: steady pace; closed item: fan-out recovery -->

**13. Which rules must always hold here?**

| Rule | How a break would show |
|---|---|
| It never guesses which situation a message belongs to | "Any update?" attached to one of three orders without asking |
| Only it sets completed: after the work is resolved, with no wait still running and the last message gone out; or when the business stops a blocked situation | A situation completed while Meera's refund wait is running |
| The business is fixed from a checked sender, never from the message's text | A message saying "this is the other shop" changes which business a run belongs to |
| An arrival is saved before anything acts on it, and it draws no conclusion | A refund marked paid by the conversation manager |
| A bound channel never proves the person | An approval recorded from a WhatsApp message with no sign-in behind it |
| A closed situation is never used as a bucket for "this customer wrote again" | A new problem added to an old, closed situation |

<!-- B3; decided by the owner, 2026-10-12: completed; AC-1; A8; decided 2026-10-22: the status-check answer; Section 7: HC-2; decided 2026-10-22: identity and permission -->

**14. What must be visible afterwards?**

Each arrival with its channel's or outside system's reference; each routing outcome; each update decision; each version written after a platform rule change; each completion, with its reason. <!-- B7; O7; decided 2026-10-22: platform rule wake -->

**15. How do we know it is built correctly?**
- "Any update?" from Meera, with three open orders, produces a question to her and a held note, and changes no situation. A failure looks like: the message attached to one of the orders.
- The same message delivered twice is acted on once. A failure looks like: two replies to one message.
- A situation with a wait still running cannot be set to completed. A failure looks like: Meera's situation completed while her refund wait runs.
- A message whose text claims another business is still placed under the business of its checked sender. A failure looks like: a run started under the business the text names.
- The payment provider's answer sent twice is saved once. A failure looks like: two arrivals for one answer, and the refund recorded as paid twice.
- After WhatsApp changes a rule, only the situations with a step pending on WhatsApp get a version saying so. A failure looks like: every open situation woken, or Meera's planned reply refused at the send check when she could have been woken in time.

<!-- B3; B9; S12; decided by the owner, 2026-10-12: completed; AC-1 -->

**16. What is still open?**

Nothing in this part is open. The exact form of the "reopened" mark is left to whoever builds the record (deferred to implementation). <!-- A8 -->

**17. Where did this come from?**

[The parts file](../boundary_view/the_parts.md) (the boundary decision), [the interactions file](../interaction_view/the_interactions.md) (interactions 1, a message arrives; 8, telling a person; 14, completed; 15, reopened; 16, an unrequested document; 17, one instruction for many), [the records file](../state_view/the_records.md), [the decisions file](../decision_view/the_decisions.md) (decisions 2, one container; 4, deciding whether to tell; 5, completed; 13, reopening; 20, an outside answer saved as an arrival; 24, waking situations after a platform rule change; 25, who sent a message), and the responsibility view's [routing](../responsibility_view/understanding_and_routing.md) and [situation](../responsibility_view/the_situation.md) files.
