# Kind 10: A person does not act, or is unavailable

This file answers one question: how does Tend behave when the person who should act does not, or cannot be reached?

In plain words: the person who should act does not, or cannot be reached.

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

In the common case, the person given the work answers. Here they do not. <!-- J5 -->

Silence never counts as done. Before the next step, Tend names the reason behind it, one of seven reasons: <!-- J5 -->
1. the request was not delivered;
2. it was delivered, but not acknowledged;
3. it was acknowledged, but nothing has moved;
4. the person turned the work down;
5. the person is away;
6. the person did the work, but did not record it;
7. the work is no longer needed, because the situation changed.

A person who is away is not the same as a person who does not answer. Before escalating, Tend arranges **cover**: another person who may do the work while the named person is away. <!-- J7 -->

Two parts behave differently:
- **The situation worker** names the reason for the silence, then uses the business's cover rules or its escalation path. <!-- J5; J7 -->
- **The communication layer** carries reminders and escalations, on the channels the rules allow. <!-- Level 2 people: what escalation can change -->

## Example walk: the finance person never answers

An investor asked for last quarter's revenue ([kind 3](kind_03_partial_answer.md)). Tend gave the revenue question to the finance person, with a deadline of Wednesday. <!-- Section 8 CASE-3 -->

```text
1.  situation worker     -> situation record     : new version: work item — confirm revenue, finance person, due Wednesday
2.  situation record     -> conversation manager : notice
3.  conversation manager -> communication layer  : worth telling the finance person now (the update decision)
4.  communication layer  -> communication layer  : send check
5.  communication layer  -> finance person       : the request, with the evidence so far — sent through the tool layer
6.  communication layer  -> sent record          : delivered
7.  (Wednesday passes; no answer)
8.  time signal          -> situation worker     : the work item's deadline has passed
9.  situation worker     -> situation worker     : names the reason for the silence: delivered, but not acknowledged
10. situation worker     -> situation record     : new version: the next step on the business's escalation path — remind the finance person
11. situation record     -> conversation manager : notice
12. conversation manager -> communication layer  : worth sending the reminder now (the update decision)
13. communication layer  -> communication layer  : send check
14. communication layer  -> finance person       : a reminder — sent through the tool layer
15. (still no answer, by the path's next limit)
16. situation worker     -> situation record     : new version: the next step — tell the finance person's manager
17. situation record     -> conversation manager : notice
18. conversation manager -> communication layer  : worth telling the manager now (the update decision)
19. communication layer  -> communication layer  : send check
20. communication layer  -> manager              : the escalation, with the whole trail — sent through the tool layer
```

<!-- IA-14; J5; Section 8 additions: escalation set by the business; Level 2 people: what travels -->

## The walk, step by step

- **Starts with:** the work item's deadline passing with no answer. <!-- J5 -->
- **Started by:** the time signal the worker set for the work item's deadline. <!-- decided 2026-10-22: the book of waits -->
- **The responsibility:** bringing people in. <!-- J1 -->
- **Part in charge:** the situation worker. <!-- Section 7 writer table: who writes what -->
- **The information:** the work item, its delivery record, and the business's escalation path. <!-- IA-14 -->
- **The current state:** waiting, then running.
- **What is uncertain:** why the finance person has not answered.
- **Who may decide:** the business's escalation path sets the order of steps, and how long each waits. The design sets no default order. <!-- Section 8 additions: escalation set by the business -->
- **The decision:** name the silence, then take the next step on the path. <!-- J5 -->
- **The change of state:** waiting to running, and back to waiting on the next step.
- **The success path:** the finance person answers. The answer arrives as an incoming message; the conversation manager records it, and the situation worker then records the outcome. <!-- J6; Section 7 writer table: who writes what -->
- **The failure paths:**
  - The finance person is away. Cover comes first, as the business's rules say: the person on call now; a team or a queue; a person allowed to act for them; a named backup; waiting until they are back; the partner's fallback contact; telling the business owner; or stopping safely, when no permitted substitute exists. <!-- J7; Level 2 people: the cover options -->
  - The path runs out, with no one left. The situation is blocked, with its reason, and the business owner decides. <!-- Section 8 states -->
  - An escalation that has gone past everyone assigned reaches the business owner. <!-- Section 8: owner classes -->
- **A person stepping in:** the finance person; their manager; at the end, the business owner.
- **The outside system:** the channels used to reach them.
- **What it changes next:** each step on the path is a wait; its limit, or the person's answer, wakes the situation. <!-- HC-3 -->
- **The final state:** the revenue question answered, or blocked with the business owner.
- **How it is checked:** the work item's deadline; naming the reason for the silence before any next step; each step's limit on the escalation path; the update decision and the send check before each request, reminder, and escalation goes out. <!-- IA-14; J5; decided: the update decision; Section 8: the send check -->
- **Rebuilt afterwards from:** the work item, each request and reminder in the sent record, the kind of silence named, and each escalation step. <!-- O7 -->

The escalation carries the trail the next person needs: the problem as it stands, what was asked and when, what answer came, what is missing, and how much time is left. <!-- Level 2 people: what travels -->

Each reason for the silence leads to its own next step: <!-- closed item: handling per kind of silence -->
1. not delivered: send again on another allowed channel, or correct the address; this is not yet an escalation;
2. delivered, not acknowledged: a reminder, then the escalation path;
3. acknowledged, nothing moved: ask where it stands, then the escalation path;
4. turned down: the next person on the escalation path, at once;
5. away: cover, as above;
6. done, not recorded: ask the person to record it; no escalation;
7. no longer needed: the work item is cancelled.

How many reminders come before the next step is set by each business, with a product default. <!-- closed item: reminders -->

The customer hears only what affects them: if a promise made to them will be missed, they get an honest word before it, under the update decision. They are never told who inside the business has not acted. <!-- Level 2 people: telling the customer; settled page: update before the promised time -->

Acknowledging a request is not finishing it. When the finance person replies "on it", the escalation clock may stop, if the business's policy says so. The work stays open. <!-- J6 -->

## Other walks beneath this kind

- **The employee handling Meera's delivery is on leave.** Where the business has recorded that she is away, its cover rule applies first: her named backup does the work. Tend learns that someone is away only from a source: the person marking themselves away, the business's own calendar or staff system through a tool, or an automatic out-of-office reply. Silence alone never counts as away. A backup may do the work, but may not approve what she alone could approve. A grant does not end because its holder is away, but Tend does not treat them as the active holder meanwhile: cover and the escalation path apply, and the business may narrow or revoke the grant at any time. <!-- J7; Level 2 people: detecting absence; J9; Level 2 authority: grant end open -->
- **The work became unnecessary.** The customer found the parcel. Tend names the reason — the work is no longer needed — and the work item is cancelled. <!-- J5; IA-14 -->

## Open questions, and what is set later

Nothing in this kind is open. The number of reminders is a value each business sets. <!-- closed item: reminders -->
