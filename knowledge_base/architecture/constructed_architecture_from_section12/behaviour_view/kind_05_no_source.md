# Kind 5: No source and no person can answer

This file answers one question: how does Tend behave when no connected system and no person can answer a question?

In plain words: nothing connected and nobody in the business can answer a question.

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

In the common case, a source answers. Here no source for the question exists at all. <!-- D8 -->

Tend records that it **cannot know this here**. Its short label is **capability-absent**. It is not a failure: nothing broke, because no source for that question ever existed. <!-- O10 -->

Tend records "cannot know this here" only when no system and no person can answer. If a person can answer, the question becomes work for that person. <!-- O10 -->

One part behaves differently:
- **The situation worker** records the declaration, with its evidence, and stops only that question. The rest of the situation goes on. <!-- O10; Section 8: the match step -->

## Example walk: a parcel question with no shipping system

A customer asks where her package is. The business has connected payments and refunds, but no shipping system. <!-- Section 8 CASE-5 -->

```text
1.  customer             -> conversation manager : "Where is my package?"
2.  conversation manager -> situation record     : new version, on her order situation
3.  situation record     -> situation worker     : notice
4.  situation worker     -> situation worker     : which source can answer? no shipping system is connected
5.  situation worker     -> situation worker     : can a person answer? the business has no one who tracks parcels
6.  situation worker     -> situation record     : one version: "Tend cannot know this here", with its evidence
7.  situation record     -> conversation manager : notice
8.  conversation manager -> communication layer  : worth telling her now
9.  communication layer  -> communication layer  : send check
10. communication layer  -> customer             : "We cannot see where your package is from here. Here is what you can do." — sent through the tool layer
```

<!-- Section 8: the match step; O10; Level 2 explainability: capability-absent is an answer -->

The reply does not change the subject to her payment. <!-- O10 -->

## The walk, step by step

- **Starts with:** the customer's message. <!-- B1 -->
- **Started by:** the customer.
- **The responsibility:** gathering, and working through the business's own systems. <!-- D8; P2 -->
- **Part in charge:** the situation worker. <!-- Section 7: the parts table, worker rules -->
- **The information:** the business's list of connected capabilities, and its list of people who can answer. <!-- Section 8: the match step -->
- **The current state:** running.
- **What is uncertain:** where the package is — and nothing in Tend can find out.
- **Who may decide:** the situation worker records the declaration. <!-- O10 -->
- **The decision:** declare "Tend cannot know this here" for this question only. <!-- O10 -->
- **The change of state:** none for the situation as a whole; only this question ends. <!-- Section 8: only that request stops -->
- **The success path:** the customer gets an honest answer, with the reason. <!-- Level 2 explainability: capability-absent is an answer -->
- **The failure paths:**
  - Tend answers with the payment status instead. The completion check must catch that before the situation closes. <!-- IA-23: payment reply -->
  - A person can answer after all. The question becomes work for that person, with the order details. Tend does not say the business has no shipping capability. <!-- J1 -->
- **A person stepping in:** only if one can answer.
- **The outside system:** none exists for this question.
- **What it changes next:** the business owner's screens show capability-absent answers; the product team sees how often each missing capability is asked for. <!-- business view: capability-absent counts -->
- **The final state:** the situation goes on; the conversation manager sets it completed if nothing else is open.
- **How it is checked:** the check before any call for a source that can answer — a system first, then a person; the completion check, which catches an answer that does not fit the question. <!-- Section 8: the match step; IA-23 -->
- **Rebuilt afterwards from:** the declaration, a snapshot of the connected capabilities, and the record of the people check. <!-- O10 -->

## Other walks beneath this kind

- **A stale carrier answer.** This belongs to kind 2, not this one. A carrier is connected, so a down carrier is a wait, then a declared failure ([kind 2](kind_02_outside_system_down.md)). <!-- Section 8 anti-patterns: stale tracking -->
- **Missing knowledge.** This does not belong to this kind either. When memory and knowledge finds nothing that fits, its package says what was looked for and not found; that never blocks a decision. When its package does not arrive at all, the loop waits a set time, then the step goes to a person. If only its AI part fails, the fixed items still arrive. <!-- Section 7: memory and knowledge, missing knowledge; N31 -->

## Open questions, and what is set later

Nothing in this kind is open.
