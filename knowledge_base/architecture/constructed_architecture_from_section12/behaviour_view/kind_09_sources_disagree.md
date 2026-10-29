# Kind 9: Two sources disagree

This file answers one question: how does Tend behave when two sources say different things about the same fact?

In plain words: two sources say different things about the same fact.

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

In the common case, one source answers and nothing contradicts it. Here two claims about the same thing disagree. <!-- E4 -->

Tend keeps every conflict visible. It never picks a side because a claim arrived last, came from a system, or sounds plausible. <!-- E4; E5 -->

A conflict is settled in this order: <!-- E5 -->
1. a fixed rule of the business, or of its line of work;
2. a correction from the source that holds the record: a newer claim counts only when it corrects the older one;
3. more evidence, when it could change the next step;
4. a person, when no rule and no evidence settles a conflict that matters.

The business can set its own order for each kind of claim. Until it does, this order is Tend's default. <!-- Level 2 conflict resolution; accepted call: correction only -->

A conflict stops only the step it affects. The same conflict can block a refund and still allow a status message. <!-- E5; E8 -->

One part behaves differently:
- **The situation worker** records both claims and the conflict, and fixed code decides how the conflict is treated. <!-- Level 2 trust: fixed code treats conflicts -->

## Example walk: the carrier says delivered, the customer says not received

Meera writes: "My order never arrived." The carrier's record says: "Delivered at 14:05." The business promised delivery by Friday. <!-- Level 2 trust: shared example -->

```text
1.  Meera                -> conversation manager : "My order never arrived."
2.  conversation manager -> situation record     : new version, on her delivery situation
3.  situation record     -> situation worker     : notice
4.  situation worker     -> tool layer           : ask the carrier
5.  carrier              -> tool layer           : "delivered at 14:05"
6.  tool layer           -> situation worker     : evidence, with its time
7.  situation worker     -> situation record     : new version: the carrier's claim, Meera's claim, and the conflict between them
8.  fixed code           -> situation worker     : the conflict blocks any step about money or a promise; a plain update about where the parcel is stays allowed
9.  situation worker     -> situation record     : what should be said: an honest interim message; work for the person who handles deliveries
10. situation record     -> conversation manager : notice
11. conversation manager -> communication layer  : worth telling Meera
12. communication layer  -> communication layer  : send check
13. communication layer  -> Meera                : "The carrier shows it as delivered at 14:05. We're checking with them and will come back to you." — sent through the tool layer
```

<!-- E1; E4; E5; Level 2 trust: blocking triggers; Section 6 delivery example -->

## The walk, step by step

- **Starts with:** Meera's message. <!-- B1 -->
- **Started by:** Meera.
- **The responsibility:** weighing evidence and disagreement. <!-- E2 -->
- **Part in charge:** the situation worker, with fixed code treating the conflict. <!-- Level 2 trust: fixed code treats conflicts -->
- **The information:** the carrier's claim, with its time; Meera's claim; the business's promise of delivery by Friday. <!-- Level 2 trust: shared example -->
- **The current state:** running, then waiting on a person. <!-- states: liveness -->
- **What is uncertain:** whether Meera received the parcel. "The carrier says delivered" is not "Meera received it". <!-- E1 -->
- **Who may decide:** fixed code decides what the conflict blocks; a person settles it if no rule or evidence does. <!-- E5 -->
- **The decision:** keep both claims; block money and promises; send an honest interim message; involve a person. <!-- Section 6 delivery example -->
- **The change of state:** running to waiting, on the person's answer.
- **The success path:** the carrier corrects its record, or the person finds the parcel; the conflict is settled and the record shows how.
- **The failure paths:**
  - No rule, no correction, and no further evidence settles it. A person decides. <!-- E5 -->
  - The situation tries to close as "delivered" while the conflict stands. It cannot: a conflict about money or a promise keeps it open. <!-- Section 6 delivery example -->
- **A person stepping in:** the person who handles deliveries.
- **The outside system:** the carrier's tracking.
- **What it changes next:** the work item for the person; their answer arrives as a message. <!-- J6 -->
- **The final state:** the conversation manager sets completed once the conflict is settled, no wait is still running, and the last message has gone out.
- **How it is checked:** fixed code's order for settling a conflict; the completion check, which refuses to close as "delivered" while the conflict stands. <!-- E5; Section 6 delivery example -->
- **Rebuilt afterwards from:** both claims with their sources and times, the conflict, the blocked steps, the interim message, and the person's decision. <!-- O7 -->

Tend does not tell Meera she is wrong. It does not promise a new date without evidence. It does not offer compensation unless the business's rules allow it. <!-- Level 2 trust: shared example -->

"In transit" yesterday and "delivered" today is not a conflict. It is a later state. <!-- Level 2 trust: not a conflict -->

"Delivered but not received" is one conflict inside the delivery situation, not a situation or a kind of its own. It is walked under this kind. <!-- construction record, entry 21: delivered-not-received; my call: delivered-not-received under kind 9 -->

## Other walks beneath this kind

- **The order system says paid; the payment provider says not paid.** Money is involved, so the conflict blocks any refund or promise until a rule, a correction, more evidence, or a person settles it. <!-- Level 2 trust: blocking triggers -->
- **A customer's claim conflicts with a written policy.** The business's written rule applies first. <!-- E5 -->

## When a conflict blocks a step

A conflict blocks a step when the step affects any of these: <!-- Level 2 trust: blocking triggers -->
- which situation or object is being handled;
- the identity of a customer, order, payment, or shipment;
- the answer the customer is given;
- a promise or a deadline;
- money, compensation, a refund, or a payment's state;
- privacy, permission, or what data is shared;
- whether approval is needed;
- a legal, regulatory, or compliance duty;
- a step that cannot be undone, or is hard to undo.

It also blocks a step when no rule settles it and no safe fallback exists. Each business may add more conditions in its settings. <!-- Level 2 trust: blocking triggers -->

## Open questions, and what is set later

Nothing in this kind is open.
