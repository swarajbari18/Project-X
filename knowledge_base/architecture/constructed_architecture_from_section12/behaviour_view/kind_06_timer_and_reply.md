# Kind 6: A timer and a reply race

This file answers one question: how does Tend behave when a timer and a person's reply arrive at almost the same moment?

In plain words: a timer and a person's reply arrive at almost the same moment.

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

In the common case, one change arrives at a time. Here a timer was set for a follow-up, and the person replies just before it fires. <!-- Section 8 CASE-1 -->

The newest version decides. The timer reads it first, sees that its wait was cancelled, and does nothing. <!-- IB-4 -->

Two parts behave differently:
- **The situation worker** writes Tend's reply and cancels the follow-up wait in the same version, before the reply is sent. The cancel is saved in the same version as the reply, before the send, because the worker does not run again after the send. <!-- IB-3; decided by the owner, 2026-10-12: nurture wait -->
- **The timer** wakes only the worker, which reads the newest version, finds no wait, and sends nothing. <!-- IB-1; IB-4 -->

Two runs never change the same situation at the same time. <!-- S1 -->

## Example walk: Priya replies just before her follow-up

Priya is one of thirty people Tend contacted for the business. Her follow-up is due at 10:00 on Thursday. At 09:58 she replies by email. <!-- Section 8 CASE-1 -->

```text
1.  Priya                -> conversation manager : "Yes, I'm interested — can you tell me more?" (09:58)
2.  conversation manager -> situation record     : new version, with her reply
3.  situation record     -> situation worker     : notice
4.  situation worker     -> situation record     : one version: Tend's answer, and the follow-up wait cancelled
5.  situation record     -> conversation manager : notice
6.  conversation manager -> communication layer  : worth sending
7.  communication layer  -> communication layer  : send check
8.  communication layer  -> Priya                : Tend's answer, on email — sent through the tool layer
9.  (10:00) follow-up timer -> situation worker  : the timer for the follow-up wait goes off
10. situation record     -> situation worker     : the newest version: no follow-up wait is left
11. situation worker     -> (nothing)            : nothing is sent
```

<!-- IB-2; IB-3; IB-5; IB-1; IB-4 -->

Two other orders of events: <!-- Section 8: the nurture loop -->
- **The timer goes off after Priya's message is recorded (step 2), but before the worker writes its answer (step 4).** The timer wakes the worker. The worker reads the newest version, which already holds Priya's message, so no follow-up is sent. It then writes its answer as above.
- **No reply comes, and 10:00 arrives.**
  1. The timer wakes the worker.
  2. The worker reads every earlier message.
  3. It writes the follow-up as a new version.
  4. In that same version, it sets a new wait if another follow-up is due. If none is due, it records the work as resolved, and the conversation manager later sets the situation completed.
  5. The conversation manager decides the follow-up is worth sending; the communication layer checks and sends it.
  6. If Priya replies later, her reply is a new message. It ends the follow-ups, unless the business's rule sets a new date. <!-- Section 8: the nurture loop; settled page: the nurture ends -->

## The walk, step by step

- **Starts with:** Priya's reply, and the follow-up timer.
- **Started by:** Priya; the follow-up wait's time signal, which the worker set.
- **The responsibility:** keeping work alive over time, and saying the right thing. <!-- H2; I1 -->
- **Part in charge:** the situation worker writes the answer and cancels the wait; the conversation manager records Priya's reply first. <!-- Section 7 writer table: who writes what -->
- **The information:** Priya's reply; the follow-up wait.
- **The current state:** waiting, then running. <!-- states: liveness -->
- **What is uncertain:** nothing about order: the newest version decides. <!-- IB-4 -->
- **Who may decide:** the worker decides the reply; the conversation manager decides it is worth sending. <!-- decided: the update decision -->
- **The decision:** answer Priya, and cancel the follow-up.
- **The change of state:** waiting to running, then to waiting again if the business's rule sets a new date, or resolved if not. <!-- settled page: the nurture ends -->
- **The success path:** Priya gets her answer; no follow-up goes out.
- **The failure paths:**
  - The timer fires late. A late timer does nothing, and it is not an error. <!-- IB-4 -->
  - The reply cannot be sent. The failure is recorded, and the worker decides the next step. <!-- IA-10 -->
- **A person stepping in:** none.
- **The outside system:** email.
- **What it changes next:** the cancelled wait leaves the book of waits, in the same save; a new wait, if the business's rule sets one. <!-- HC-3; decided 2026-10-22: the book of waits -->
- **The final state:** waiting on Priya, or completed: the conversation manager sets completed once no wait is still running and the last message has gone out. <!-- decided by the owner, 2026-10-12: completed -->
- **How it is checked:** the worker reads the newest version before any decision; only one run per situation at a time; the decision's proposal passes its shape and permission checks; the send check before the answer goes out. <!-- IB-4; S1; S2; T2; Section 8: the send check -->
- **Rebuilt afterwards from:** Priya's message, the version that answered and cancelled, the sent record, and the timer's empty run. <!-- O7 -->

## Other walks beneath this kind

- **A status-check answer and a message arrive close together.** The intake step saves each as its own arrival, one version each, and the worker reads the newest version before it decides. <!-- IB-4; decided 2026-10-22: the status-check answer -->
- **A new change matches a running wait exactly** — the same subject, the same type of wait, and the same purpose. It joins that wait. It does not open a second one. <!-- Section 8 additions: identical wait -->

## Open questions, and what is set later

Nothing in this kind is open.
