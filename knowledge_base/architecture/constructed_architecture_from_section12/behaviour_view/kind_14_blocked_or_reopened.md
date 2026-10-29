# Kind 14: Work is blocked, interrupted, or wrongly closed

This file answers one question: how does Tend behave when a situation can go no further, when its work is interrupted part-way, or when it was closed too early?

In plain words: a situation can go no further, its work is cut short, or it was closed too early.

## Words in this file

- **Tend** is the software that keeps a business's operational problems moving. Each problem is one **situation**, such as Meera's late parcel. <!-- A1 -->
- The **conversation manager** takes in each arrival (a person's message, or an outside system's answer) through its **arrival loop**:
  - its **intake step** saves it, and finds who sent it;
  - **understanding the arrival**, its one AI stage, works out what the arrival means and where it fits;
  - **routing**, fixed code, puts it on the right situation, or the conversation manager answers it at once when no situation is needed.

  It decides whether a person should hear an update, and alone sets a situation to completed. (The arrival loop, since 2026-10-29: [how Tend's product loop works](../../../Level%202/the_product_loop/how_does_the_product_loop_work.md).) <!-- Section 7: the parts table; decided 2026-10-22: the status-check answer; PL-3; PL-5; PL-6 -->
- The **situation worker** reasons about one situation: it gathers, decides the next step, and writes what Tend concludes. <!-- Section 7: the parts table -->
- The **communication layer** checks and sends each message, through the tool layer, and keeps the **sent record** of what went out. <!-- Section 7: the parts table; M4 -->
- The **tool layer** is the only way Tend calls an outside system: a payment provider, a carrier, or a messaging channel. <!-- Section 7: tool layer -->
- The **status-check service** waits on an outside system while the work goes on; its asks go out through the tool layer. **Memory and knowledge** runs beside every loop: before each part of a loop, it hands that part a **package** of what it needs to know, or an explicit empty answer. It also keeps the links between situations, and what Tend learned. **Configuration** holds the business's settings, permissions, and members. <!-- Section 7: the parts table; decided 2026-10-22: the service calls through the tool layer -->
- A **version** is one saved state of a situation. A **notice** is the short internal signal a new version sends; people never see it. A **wake** is a signal that sends the worker back to a situation: a saved version's notice, a time signal, or the check-in. <!-- HC-1 -->
- A **wait** is a pause until one named thing happens. <!-- HC-3 -->
- The **book of waits** lists every wait that may outlast its run, and what will end it; it is data kept with the situation records. A timer in a diagram is the **time signal** the worker set for one of its waits; it wakes only the worker. <!-- HC-3; decided 2026-10-22: the book of waits -->
- A **check-in** is the one regular wake each waiting situation gets.
- A **held note** records that a message may belong to a situation. It changes nothing there. <!-- B9 -->
- **Evidence** is what a source said, with its time. A **claim** is one such statement. <!-- E1 -->
- **The AI** writes a reasoning artifact in the stages that reason, and in the worker's deciding stage proposes a step; **fixed code** (code that always makes the same check) checks it, and chooses which stage runs next. The **permission check** answers Allow, Deny, or "a person must approve first". <!-- Level 2 security: the spine; T2; PL-1 -->
- A **grant** is a range of steps a business allows Tend to take without asking. The **configurator** is the person who sets the business up: the business owner, or someone the business owner names. Only the configurator's fixed tools write grants. <!-- T3; G7 -->
- A **member** is a person who works for the business, proved by the sign-in provider the business uses (the outside service that checks who a person is when they sign in); customers and partners are not members. A **fresh sign-in** is one made within the last 15 minutes. A channel **bound** to a member shows only which channel a message came through, and names that member; it does not prove who is typing. <!-- decided 2026-10-22: identity and permission -->
- An **arrival** is anything that comes in from outside — a person's message, or an outside system's answer — saved as a new version. A tool **declares** a wait when its result states, in a fixed form, what is awaited, from whom, and what ends it. <!-- decided 2026-10-22: the status-check answer; decided 2026-10-22: the wait a tool declares -->
- The **consent records** are the communication layer's saved record of each person's consent, for each contact point and kind of message. <!-- decided 2026-10-22: consent records -->
- The **update decision** is the conversation manager's choice: is this change worth telling this person now? The **send check** is the communication layer's check before any message goes out: a saved decision to send, an Allow, the channel's rules and the consent records met, and only allowed details in the message. <!-- decided: the update decision; Section 8: the send check -->
- The **owner view** builds the screens the business owner opens. The **product team** is the people who build Tend. <!-- Section 7: the parts table -->
- A **work item** is a task for one named person. The **escalation path** is the business's own list of who to turn to next. <!-- IA-14; J5 -->
- The **completion check** runs before a situation is resolved. Every question must have one of six endings: answered; waiting, with a reason; passed to a person; "Tend cannot know this here", with the customer still answered; waived; or replaced by a newer question. No person's task may be pending, an approval request included; a "Tend cannot know this here" answer may not be shown as a success; and every claim told to a customer must be backed by evidence. <!-- IA-23 -->
- **Resolved** means the worker has recorded the work as done. **Completed** is the state only the conversation manager sets: when the work is resolved, no wait is still running, and the last message has gone out. <!-- decided by the owner, 2026-10-12: completed -->
- A **walk** is one case traced step by step. The names, times, and amounts in it are illustrations, not rules.

**How to read the diagram.** Read it top to bottom; the number is the order. Each line says: the part on the left passes the thing after the colon to the part on the right. "(no answer)" means nothing came back. A line in brackets with no arrow is a note about time or an event. When a part appears on both sides, it is checking or acting by itself. Text after a dash says how the message travels, for example "sent through the tool layer". Lines marked "a" and "b" are two branches; only one happens.

**Statuses.** A rule is **Decided** unless one of these words sits beside it: **Provisional** (a working choice with a condition for reopening it), or **deferred to configuration**, **deferred to Level 3**, or **deferred to implementation** (a value or a detail left, on purpose, to each business or market, to the stage that chooses the technology, or to whoever builds it; the rule around it is Decided). The project owner is the person designing Tend. On 2026-10-22 the project owner accepted every recommendation this design had made, and asked for the smaller questions inside them to be settled in the way that best fits; those points are Decided. A rule marked as "the design's reading" was worked out from its sources rather than found written down; it is Decided too. The earlier words **To confirm** and **Open** are no longer used. <!-- decided by the owner, 2026-10-22 --> "The business owner" means the person who runs the business Tend serves. The full word list is in [how a situation moves](how_a_situation_moves.md).

<!-- Every rule below carries its code in a hidden note. Its meaning, source, and status sit in code_index.md in this folder. -->

## What is different here

This kind has three cases. In each, the situation leaves the common path:
- **Blocked:** no safe step is left, and no one is left to escalate to. <!-- Section 8 states -->
- **Cut short:** Tend itself is interrupted mid-run, by a crash, a restart, or an update. <!-- H6 -->
- **Wrongly closed:** the same problem was resolved too early, or has come back. <!-- A8 -->

## Example walk: a refund marked done that never arrived

Meera's refund situation was completed last month. She writes: "You said my refund was done, but it never arrived." <!-- A8 -->

```text
1.  Meera                -> conversation manager : "You said my refund was done, but it never arrived."
2.  conversation manager -> conversation manager : understanding the arrival: the message refers to the closed refund situation; the same problem has come back
3.  conversation manager -> situation record     : routing (fixed code): new version on the closed situation, with her message and the understanding artifact's finding: the closure was wrong
4.  situation record     -> situation worker     : notice
5.  situation worker     -> situation record     : the same situation reopened, back to running, with the reason
6.  situation worker     -> tool layer           : ask the payment provider about the refund
7.  (from here, the common path, or kind 1 if the result is unknown)
```

<!-- A8; Section 8: the states table -->

## The walk, step by step

- **Starts with:** Meera's message. <!-- B1 -->
- **Started by:** Meera.
- **The responsibility:** keeping each problem as one record. <!-- A1 -->
- **Part in charge:** understanding the arrival decides; the situation worker reopens the record and sets it back to running. <!-- A8; Section 8: the states table; PL-3 -->
- **The information:** her message, and the closed situation it refers to.
- **The current state:** completed.
- **What is uncertain:** where the money went.
- **Who may decide:** understanding the arrival decides whether the closure was wrong; routing, fixed code, carries that out. <!-- A8; PL-6 -->
- **The decision:** the closure was wrong; reopen the original. <!-- A8 -->
- **The change of state:** completed to running, on the same record, with the reason recorded. "Reopened" is a mark on the same record, not a new record; its exact form is left to whoever builds the record (deferred to implementation). <!-- Section 8: the states table; A8 -->
- **The success path:** the provider shows where the refund is; Meera is told.
- **The failure paths:**
  - The message is about a different problem. A new situation is created, and linked to the closed one. <!-- A7 -->
- **A person stepping in:** if the provider's answer needs one.
- **The outside system:** the payment provider.
- **What it changes next:** the reopened situation runs the common path again.
- **The final state:** the conversation manager sets completed again, once the refund is confirmed, no wait is still running, and the last message has gone out.
- **How it is checked:** the understanding artifact's finding that the closure was wrong, and routing's check of it; the worker reading the newest version; the completion check. <!-- A8; IB-4; IA-23 -->
- **Rebuilt afterwards from:** the closed version, Meera's message, the reopen with its reason, and what followed. <!-- O7 -->

Time alone does not stop a reopen. A customer can come back six months later because the same problem has returned; the test is still whether that problem was never finished. <!-- A8 -->

A closed situation is never used as a bucket for "this customer wrote again". <!-- A8 -->

A reopened run checks again every fact it relies on that may have changed, as any run does. The reopen does not, by itself, change the person's stage; that is set from evidence. <!-- A8; closed item: reopen check -->

## When a situation is blocked

When nothing safe is left — tries used up, other routes closed, nobody reachable — Tend does not fake progress. It stops, visibly, with its reason. <!-- F4; Level 2 failure: the safe-hold -->

The situation is then blocked. It has no check-in; it wakes only when what blocks it goes away, or when a person acts. The business owner sees it as a decision only they can make. <!-- Section 8 states; Section 8 additions: blocked work -->

When the business stops a blocked situation, the conversation manager completes it, with the reason shown. <!-- Section 8: the states table -->

For example, Meera's carrier stays down. The delivery employee and their manager do not answer. The escalation path is used up. So Meera's situation is blocked. The business owner is told, because it is a decision only they can make. <!-- Section 8 states; O3 -->

```text
1.  situation worker     -> situation record     : new version: blocked, with its reason — the carrier is down and no one on the escalation path has answered
2.  situation record     -> conversation manager : notice
3.  owner view           -> business owner       : the blocked situation, as a decision only they can make
4a. business owner       -> conversation manager : "Refund the shipping cost and close it."
5a. conversation manager -> situation record     : new version, with the business owner's decision
6a. situation record     -> situation worker     : notice
7a. situation worker     -> situation record     : new version: running again, to carry out the decision
4b. business owner       -> conversation manager : "Stop this one."
5b. conversation manager -> situation record     : completed, with the reason shown
```

<!-- Section 8: the states table; O3 -->

- **How it is checked:** a blocked situation has no check-in, so nothing wakes it by itself; it waits for what blocks it to go away, or for a person to act. <!-- Section 8 additions: blocked work -->
- **Rebuilt afterwards from:** the blocked version with its reason, the escalation steps before it, and the business owner's decision. <!-- O7 -->

A **safe-hold** is a visible pause, with a reason and a deadline, while a person takes over. A safe-hold is the blocked state: its deadline is shown to the people who must act, and it does not wake the situation. The deadline is not a wait in the book of waits. The owner view reads the block and its deadline and tells the business owner without being asked: a blocked situation is a decision only they can make, and a deadline that puts the business at risk is one of the four alerts in decision 17. <!-- our reading: safe-hold is blocked; O3; decided 2026-10-22: the book of waits -->

## When work is cut short

When Tend is interrupted — by a crash, a restart, or an update — the situation is rebuilt from its newest saved version. It continues; it does not start over. <!-- H6 -->

For example, the worker stopped after asking the carrier but before saving the answer. On restart, it reads the newest version, sees the question still open, and asks again. A step that cannot be undone is not repeated. Its saved note, written before the call, shows it was started ([kind 1](kind_01_unknown_result.md)). <!-- H6; S7; IB-8: the record check -->

```text
1.  (the worker's run stops part-way: Tend restarts)
2.  situation record     -> situation worker     : the newest saved version: the carrier question still has no answer
3.  situation worker     -> tool layer           : ask the carrier again
4.  (for the refund: the tool layer's note, written before the call, shows the refund was already started; it is not sent again)
```

<!-- H6; S7; IB-8 -->

- **How it is checked:** the worker always starts from the newest saved version; the check for an earlier start before any step that cannot be undone. <!-- H6; IB-8 -->
- **Rebuilt afterwards from:** the versions saved before the stop, the tool layer's notes, and what the worker did after the restart. <!-- O7 -->

## Other walks beneath this kind

- **The same delivery is still missing after it was completed.** The original delivery situation is reopened. <!-- A8 -->
- **A customer replies on an old thread about a new order.** A new situation, linked to the old one ([kind 8](kind_08_unclear_message.md)). <!-- A7 -->

## Open questions, and what is set later

Nothing in this kind is open. The exact form of the "reopened" mark is left to whoever builds the record (deferred to implementation). <!-- A8 -->
