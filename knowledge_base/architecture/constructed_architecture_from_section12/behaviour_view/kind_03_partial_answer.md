# Kind 3: A partial answer arrives

This file answers one question: how does Tend behave when it can answer part of what was asked now, and the rest only later?

In plain words: part of what was asked can be answered now, the rest only later.

## Words in this file

- **Tend** is the software that keeps a business's operational problems moving. Each problem is one **situation**, such as Meera's late parcel. <!-- A1 -->
- The **conversation manager** takes in each arrival — a person's message, or an outside system's answer — puts it on the right situation, decides whether a person should hear an update, and alone sets a situation to completed. Its **intake step** reads each new arrival first, and saves it as a new version. <!-- Section 7: the parts table; decided 2026-10-22: the status-check answer -->
- The **situation worker** reasons about one situation: it gathers, decides the next step, and writes what Tend concludes. <!-- Section 7: the parts table -->
- The **communication layer** checks and sends each message, through the tool layer, and keeps the **sent record** of what went out. <!-- Section 7: the parts table; M4 -->
- The **tool layer** is the only way Tend calls an outside system: a payment provider, a carrier, or a messaging channel. <!-- Section 7: tool layer -->
- The **status-check service** waits on an outside system while the work goes on; its asks go out through the tool layer. **Memory** keeps what Tend learned. **Configuration** holds the business's settings, permissions, and members. <!-- Section 7: the parts table; decided 2026-10-22: the service calls through the tool layer -->
- A **version** is one saved state of a situation. A **notice** is the short internal signal a new version sends; people never see it. A **wake** is a signal that sends the worker back to a situation: a saved version's notice, a time signal, or the check-in. <!-- HC-1 -->
- A **wait** is a pause until one named thing happens. <!-- HC-3 -->
- The **book of waits** lists every wait that may outlast its run, and what will end it; it is data kept with the situation records. A timer in a diagram is the **time signal** the worker set for one of its waits; it wakes only the worker. <!-- HC-3; decided 2026-10-22: the book of waits -->
- A **check-in** is the one regular wake each waiting situation gets.
- A **held note** records that a message may belong to a situation. It changes nothing there. <!-- B9 -->
- **Evidence** is what a source said, with its time. A **claim** is one such statement. <!-- E1 -->
- **The AI** suggests a step; **fixed code** — code that always makes the same check — checks it. The **permission check** answers Allow, Deny, or "a person must approve first". <!-- Level 2 security: the spine; T2 -->
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

In the common case, one question gets one answer. Here one message holds two questions. One can be answered now; the other needs a person. <!-- Section 8 CASE-3 -->

Two parts behave differently:
- **The situation worker** keeps each question apart. One question moves on; the other stays open, and becomes work for a person. <!-- IB-7; J1 -->
- **The conversation manager** decides the partial answer is worth sending now, said plainly as partial. <!-- Level 2 communication: the investor ruling -->

A partial answer is allowed. It is said plainly, as a partial answer. <!-- Level 2 communication: the investor ruling -->

## Example walk: an investor asks for the deck and the revenue

An investor writes: "Please send last quarter's revenue and your latest deck." No situation about this is open. <!-- Section 8 CASE-3 -->

```text
1.  investor             -> conversation manager : "Revenue and the latest deck, please."
2.  conversation manager -> situation record     : first version of a new situation, with two questions
3.  situation record     -> situation worker     : notice
4.  situation worker     -> tool layer           : fetch the deck
5.  tool layer           -> tool layer           : permission check: a named person must approve each disclosure to an investor
6a. tool layer           -> communication layer  : the request, with the exact deck
6b. communication layer  -> approver             : the request, with a link to sign in, after the send check
7.  approver             -> sign-in provider     : signs in (a fresh sign-in, within the last 15 minutes)
8.  approver             -> conversation manager : "yes", with the proof of sign-in
9.  conversation manager -> situation record     : new version: the approver's answer, saved as an arrival
10. situation record     -> situation worker     : notice
11. situation worker     -> tool layer           : the answer, as the waiting step's result
12. tool layer           -> tool layer           : permission check again, then fetches the deck
13. tool layer           -> situation worker     : the deck
14. situation worker     -> situation record     : new version: deck question answered; revenue question open; work for the finance person
15. situation record     -> conversation manager : notice
16. conversation manager -> communication layer  : worth telling the investor now, and worth sending the finance person the work item (the update decision)
17. communication layer  -> communication layer  : send check, for each message
18. communication layer  -> investor             : the deck, and "the revenue figure is still being checked" — sent through the tool layer
19. communication layer  -> finance person       : work item: confirm last quarter's revenue — sent through the tool layer
20. (later) finance person -> conversation manager : the confirmed figure
21. conversation manager -> situation record     : new version, with the finance person's answer
22. situation record     -> situation worker     : notice
23. situation worker     -> situation record     : new version: revenue question answered
24. situation record     -> conversation manager : notice
25. conversation manager -> communication layer  : worth telling the investor (the update decision)
26. communication layer  -> communication layer  : send check
27. communication layer  -> investor             : the revenue figure — sent through the tool layer
```

<!-- IB-6; Section 8: fetching a file; T7; accepted call: investor and regulator; decided 2026-10-22: identity and permission; settled 2026-10-22: fresh sign-in; closed item: approval answer route; AC-3; IA-14; Level 2 communication: the investor ruling; J6 -->

No "we received your message" reply goes out at step 2. <!-- Section 8: what a message looks like -->

## The walk, step by step

- **Starts with:** the investor's message. <!-- B1 -->
- **Started by:** the investor.
- **The responsibility:** understanding, gathering, bringing people in, and saying the right thing. <!-- C1; D1; J1; I1 -->
- **Part in charge:** the situation worker keeps the two questions; the conversation manager decides each message; the tool layer fetches the deck. <!-- Section 7 writer table: who writes what -->
- **The information:** the deck, held in the business's files; the revenue figure, which no connected system holds. <!-- D2 -->
- **The current state:** running; then waiting on the finance person. <!-- states: liveness -->
- **What is uncertain:** the revenue figure.
- **Who may decide:** a named person, a member of the business freshly signed in, approves each disclosure to an investor. The approval records who approved, their sign-in identity, when they signed in, and exactly what they approved. <!-- accepted call: investor and regulator; decided 2026-10-22: identity and permission -->
- **The decision:** send the deck now, with a plain line about the revenue; give the revenue question to a person. <!-- Level 2 communication: the investor ruling -->
- **The change of state:** running to waiting, on the finance person's answer. <!-- Section 8: the states table -->
- **The success path:** the finance person confirms; the investor gets the figure; the completion check finds every question answered. <!-- IA-23 -->
- **The failure paths:**
  - The approver says no. The investor is told honestly that the deck is not available to them, and why. The approval path is offered. <!-- AC-3 -->
  - The finance person does not act. Tend names what lies behind the silence, and the escalation path runs. <!-- J5 -->
- **A person stepping in:** the approver; the finance person.
- **The outside system:** the business's file store holds the deck.
- **What it changes next:** the work item for the finance person; their answer arrives as a message and wakes the situation. <!-- J6 -->
- **The final state:** the conversation manager sets completed, once both questions are answered and the last message has gone out. <!-- decided by the owner, 2026-10-12: completed -->
- **How it is checked:** the permission check, with the approval inside the tool; the send check; the completion check, which confirms each question has an ending. <!-- T2; T7; Section 8: the send check; IA-23 -->
- **Rebuilt afterwards from:** the two questions and how each ended, the approval with who approved and how they were proved, the work item, and the sent record. <!-- O7; decided 2026-10-22: identity and permission -->

## Other walks beneath this kind

- **Meera's tracking is partly known.** The carrier says the parcel left the depot, but not when it will arrive. Meera is told what is known (the parcel left the depot) and what is not (when it will arrive). <!-- Level 2 communication: tell the situation -->
- **A supplier confirms half of an order.** The confirmed half moves on; the rest waits, with its own question. <!-- Section 8: atomic moves, a partial gather -->

If only part of an answer arrives, the worker saves the new claims, any wait, and the open question together, in one version. <!-- Section 8: atomic moves, a partial gather -->

## Open questions, and what is set later

Nothing in this kind is open.
