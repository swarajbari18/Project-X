# Kind 1: An irreversible action's outcome stays unknown

This file answers one question: how does Tend behave when it has started a step that cannot be undone, such as a refund, and nobody knows whether it worked?

In plain words: a step that cannot be undone, such as a refund, has a result nobody knows.

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

In the common case, an outside system answers, and the worker records the answer. Here the outside system takes the request and never answers. <!-- Level 2 failure: the hardest case -->

Three parts behave differently:
- **The tool layer** checks that the step was not already started, writes a note before the money moves, and never sends it again on a guess. <!-- IB-8; S7; IB-10 -->
- **The status-check service** takes over the waiting. The tool declares the wait, and the worker's fixed code saves it. <!-- decided by the owner, 2026-10-17; decided 2026-10-22: the wait a tool declares -->
- **The situation worker** records the outcome as unknown, and keeps the situation waiting. <!-- IB-10 -->

## Example walk: the refund on order 9912

Meera's order 9912 arrived damaged. The business agreed a refund within its refund setting. <!-- decided by the owner, 2026-10-12: refund setting -->

```text
1.  situation worker     -> tool layer           : refund order 9912
2.  tool layer           -> tool layer           : a source can do refunds: the payment provider is connected
3.  tool layer           -> tool layer           : permission check says Allow
4.  tool layer           -> situation record     : reads the saved starts, and its own notes: no earlier refund was started
5.  tool layer           -> tool layer           : writes the note: "refund 9912 about to go", with its reference
6.  tool layer           -> payment provider     : one call
7.  payment provider     -> (no answer)
8.  tool layer           -> payment provider     : asks for the payment's status, up to five times for this wait, as the provider's usual answer time allows
9.  payment provider     -> (no answer)
10. tool layer           -> situation worker     : evidence: started, result unknown; declares the wait: "waiting on the payment provider for refund 9912"
11. situation worker     -> situation record     : one version, by fixed code, before the AI is told: refund started, result unknown, the wait (and its entry in the book of waits)
12. situation worker     -> situation worker     : sets the wait's time signal, for when the provider's limits run out
13. situation record     -> status-check service : the saved wait's notice; the service reads the wait from the book of waits
14. situation record     -> conversation manager : notice
15. conversation manager -> communication layer  : worth telling Meera (the update decision)
16. communication layer  -> communication layer  : send check
17. communication layer  -> Meera                : "We are waiting on the payment provider to confirm your refund." — sent through the tool layer
```

<!-- Section 11: the fixed order; IB-8; IB-8: the record check; S7; M5; settled 2026-10-22: the five per wait; decided 2026-10-22: the wait a tool declares; IB-11; settled 2026-10-22: one version for a step and its wait; decided 2026-10-22: the book of waits; Section 8 CASE-2: the reply from the record -->

Meanwhile the status-check service asks the provider for news, from time to time, through the tool layer, and listens for the provider's own message about the refund. Its asking wakes nothing. <!-- decided 2026-10-22: the service calls through the tool layer; construction record, entry 21: asking does not wake -->

Later, one of two things happens. The **settle window** is the time the payment provider promises for a payment to become final.

```text
18a. payment provider     -> status-check service : "refund 9912 paid"
19a. status-check service -> conversation manager : the answer, as an event for the refund's wait, with the provider's reference
20a. conversation manager -> situation record     : new version: the provider's answer, saved as an arrival
21a. situation record     -> situation worker     : notice
22a. situation worker     -> tool layer           : the answer, for the refund tool's fixed code to return as evidence
22b. tool layer           -> situation worker     : structured evidence
23a. situation worker     -> situation record     : new version: refund recorded as paid; the wait ends, and leaves the book
24a. situation record     -> conversation manager : notice
25a. conversation manager -> communication layer  : worth telling Meera (the update decision)
26a. communication layer  -> communication layer  : send check
27a. communication layer  -> Meera                : "Your refund for order 9912 has been paid." — sent through the tool layer

18b. (the settle window ends, still no answer; the service's limits run out)
19b. time signal          -> situation worker     : the wait is due
20b. situation worker     -> situation record     : new version: outcome unknown; work for a person, with the whole timeline
21b. situation record     -> conversation manager : notice
22b. conversation manager -> communication layer  : worth sending the work item (the update decision)
23b. communication layer  -> a person             : the work item, with the whole timeline — after the send check, sent through the tool layer
```

<!-- decided by the owner, 2026-10-17; decided 2026-10-22: the status-check answer; closed item: recheck timer; IB-10; M6 -->

## The walk, step by step

- **Starts with:** the worker's decision to send the refund. <!-- F1 -->
- **Started by:** the situation worker, after Meera's request was approved by the business's rules. <!-- F6 -->
- **The responsibility:** handling failure and recovery, with making sure each step is allowed. <!-- M1; T2 -->
- **Part in charge:** the tool layer makes the call; the situation worker records the result. <!-- Section 7: tool layer -->
- **The information:** the refund amount and order, from the order system; the provider's silence. <!-- D2 -->
- **The current state:** running, then waiting. <!-- states: liveness -->
- **What is uncertain:** whether the money moved. <!-- Level 2 failure: the hardest case -->
- **Who may decide:** fixed code decides whether the call may run. Only a person may decide to redo the refund. <!-- T2; Level 2 failure: only a person redoes -->
- **The decision:** wait, and do not send the refund again. <!-- IB-10 -->
- **The change of state:** the worker's fixed code writes the start, the unknown result, and the wait the tool declared together, in one version, before the AI is told. <!-- IB-11; settled 2026-10-22: one version for a step and its wait -->
- **The success path:** the provider's news arrives at the status-check service; the intake step saves it as an arrival; the worker records the refund as paid; the conversation manager decides Meera should hear it. <!-- decided by the owner, 2026-10-17; decided 2026-10-22: the status-check answer -->
- **The failure paths:**
  - The AI suggests a second refund while the first is unknown. The check for an earlier start stops it, and the situation keeps waiting. That check reads the saved starts, and the tool layer's notes, before the new note is written, so it never finds its own note. <!-- Section 8 CASE-2: the second post is stopped; IB-8: the record check -->
  - The settle window — the time the provider promises for a payment to become final — ends with no answer. Tend records the outcome as unknown, and hands the case to a person. <!-- IB-10; Section 8: past the bound -->
  - The provider offers no way to ask about status. If it sends news of its own, the status-check service only listens, and the wait's due time brings in a person. If it does neither, the outcome is declared unknown at once, and a person gets the full record. <!-- Section 8 additions: no check path -->
- **A person stepping in:** the person gets the timeline — what was tried, against which limit, with what result, and what is still unknown — and decides. Their decision is recorded. <!-- Level 2 failure: hand to a person -->
- **The outside system:** if the provider can recognise a repeat, the same request may be sent again with the same reference, but only after its status has been checked. Otherwise the refund is never repeated automatically; only a person may decide to redo it. <!-- Section 8: resend or new start; IB-10 -->
- **What it changes next:** the wait is in the book of waits. The provider's news, saved as an arrival, or the wait's own time signal when the limits run out, wakes the situation. No timer asks the provider; the status-check service does the asking. <!-- HC-3; decided by the owner, 2026-10-17; closed item: recheck timer -->
- **The final state:** the conversation manager sets completed once the refund is confirmed and Meera has been told; otherwise the situation waits on a person. <!-- decided by the owner, 2026-10-12: completed -->
- **How it is checked:** the permission check before the call; the check for an earlier start; the completion check before the situation is resolved. <!-- T2; IB-8; IA-23 -->
- **Rebuilt afterwards from:** the tool layer's note before the call and its record of tries, the status-check service's record of asks, the version with the unknown result and the wait the refund tool declared, the provider's answer saved as an arrival or the hand-off, and the sent record. <!-- O7; decided 2026-10-22: the service calls through the tool layer -->

Meera asks "where is my refund?" while it waits. The reply comes from the record: the business is waiting on the payment provider. It is never a guess. <!-- Section 8 CASE-2: the reply from the record -->

The rest of Meera's situation goes on. Only the refund waits. <!-- M5 -->

## Other walks beneath this kind

- **A payment sent to a supplier gets no answer.** The same checks run: the permission check, the check for an earlier start, then the status-check service takes over the waiting. The supplier payment waits, and a person decides after the settle window. <!-- Section 11: the fixed order -->
- **An email to a customer gets no delivery receipt.** Tend checks before any resend, and never assumes success. A message is resent only when a check still shows its delivery unknown, and the channel can recognise the repeat. <!-- Section 11 §10: a message does not arrive; Section 8: resend or new start -->
- **The provider recognises a repeat.** After a status check still shows the result unknown, the tool layer sends the same request again, with the same reference; the provider pays once. <!-- Section 8: resend or new start -->
- **A timer fires during the wait.** The timer wakes the worker only. It reads the newest version; if the wait was replaced, nothing happens. <!-- Section 11: timer during wait walk; IB-4 -->
- **The provider sends "refund 9912 paid" twice.** The intake step's repeat check, keyed by the wait and the provider's reference, drops the second; nothing happens twice. <!-- decided 2026-10-22: the status-check answer -->
- **The business narrows its refund grant while a refund is unknown.** On the next try, the permission store is read again, so the narrower grant applies. <!-- AC-4 -->

## Values each business sets

- Which steps count as irreversible for a particular business is a value each business sets. The rule — never repeat such a step on an unknown result — holds whatever the list. <!-- Level 2 failure: what is irreversible -->
- The status-check service's limits for each outside system, set when its tool is added. <!-- settled 2026-10-22: the service's limits -->
