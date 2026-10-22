# Kind 2: An outside system is down, slow, or too stale

This file answers one question: how does Tend behave when an outside system it needs is down, too slow, or gives an answer that is out of date?

In plain words: a system Tend needs does not answer, or its answer is too old to use.

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

In the common case, the carrier answers at once. Here it does not answer, or its answer is too old to use. <!-- Section 8 anti-patterns: stale tracking -->

A down carrier is a wait, then a declared failure. It is not "Tend cannot know this here", because a carrier is connected. <!-- Section 8 anti-patterns: stale tracking -->

Four parts behave differently:
- **The tool layer** retries a call that fails briefly, up to a set number of tries. When the carrier still gives no usable answer, it asks for news up to five times for this wait, then its result declares the wait. <!-- M4; M5; decided 2026-10-22: the wait a tool declares -->
- **The situation worker** saves that declared wait, with the started step, in one version, before the AI is told, and records a failure once the limit has passed. <!-- H3; M2; decided 2026-10-22: the wait a tool declares -->
- **The status-check service** then asks within its limits. Its asking wakes nothing. When the limits run out, the wait's time signal wakes the worker. <!-- decided by the owner, 2026-10-17; closed item: recheck timer -->
- **The conversation manager** tells the customer something useful before the time the business promised, even while the wait goes on. <!-- H11; settled page: update before the promised time -->

## Example walk: Meera's carrier goes quiet

The business promised Meera an update by 17:00. The carrier is the only tracking source, and it is down. <!-- H11 -->

```text
1.  Meera                -> conversation manager : "Where is my parcel?"
2.  conversation manager -> situation record     : new version, on her delivery situation
3.  situation record     -> situation worker     : notice
4.  situation worker     -> tool layer           : ask the carrier
5.  tool layer           -> carrier              : one call
6.  carrier              -> (error)
7.  tool layer           -> carrier              : retries a brief failure, within its limit
8.  tool layer           -> carrier              : asks for news, up to five times for this wait
9.  tool layer           -> situation worker     : evidence: no usable answer, and a declared wait on the carrier
10. situation worker     -> situation record     : the started step and the declared wait, in one version, before the AI is told; the wait's entry in the book of waits, with its time signal
11. situation record     -> status-check service : the saved wait's notice; the service reads the wait from the book and asks within its limits
12. time signal          -> situation worker     : the promised update is due (16:30, before the 17:00 promise)
13. situation worker     -> situation record     : what should be said: an interim update
14. situation record     -> conversation manager : notice
15. conversation manager -> communication layer  : worth telling Meera now
16. communication layer  -> communication layer  : send check
17. communication layer  -> Meera                : "We are still waiting on the carrier. We will come back to you." — sent through the tool layer
18. (the service's limits run out, still no answer; the wait's limit passes)
19. time signal          -> situation worker     : the wait is due
20. situation worker     -> situation record     : a declared failure: the carrier, the limit crossed, when, the latest state
21. situation worker     -> situation record     : a work item for the employee who handles deliveries, the first name on the escalation path
22. situation record     -> conversation manager : notice
23. conversation manager -> communication layer  : tell the employee now (the update decision)
24. communication layer  -> employee             : the work item, after the send check — sent through the tool layer
```

<!-- IB-2; M4; H2; decided 2026-10-22: the book of waits; H11; settled page: update before the promised time; M2; Section 8 additions: a declared failure -->

## The walk, step by step

- **Starts with:** Meera's message. <!-- B1 -->
- **Started by:** Meera.
- **The responsibility:** gathering, keeping work alive over time, and handling failure. <!-- D1; H2; M1 -->
- **Part in charge:** the tool layer declares the wait; the situation worker saves it and the failure; the status-check service asks within its limits. <!-- Section 7 writer table: who writes what; M4; decided 2026-10-22: the wait a tool declares -->
- **The information:** the carrier's tracking, which is missing; the time the business promised. <!-- H11 -->
- **The current state:** running, then waiting. <!-- states: liveness -->
- **What is uncertain:** where the parcel is.
- **Who may decide:** fixed code decides when the limit has passed. The business's escalation path decides who gets the work next; in this example, the business's delivery contact. <!-- M2; J3 -->
- **The decision:** wait honestly inside the limit; give Meera an update before the promised time; declare a failure past the limit. <!-- H3; H11 -->
- **The change of state:** running to waiting; waiting stays waiting after the failure is recorded, while a person takes over. A failure is never a state of its own. <!-- M1 -->
- **The success path:** the carrier's answer arrives, through the status-check service, as an arrival saved by the conversation manager; the worker records the tracking and the wait ends.
- **The failure paths:**
  - The carrier answers, but its answer is too old. The worker records the claim as stale, with its time, and does not present it as current. <!-- Level 2 trust: evidence states -->
  - Tend falls back to a weaker source. What it finds is marked weaker. Tend may use it for a safe, limited step, never for a step that cannot be undone. <!-- Level 2 failure: the degraded mark; Level 2 failure: never irreversible on a fallback -->
  - The carrier stays down past the limit. The failure is recorded, and the escalation path runs. <!-- M2; Section 8: past the bound -->
- **A person stepping in:** the employee who handles deliveries gets the trail: what was tried, against which limit, with what result. <!-- Level 2 failure: hand to a person -->
- **The outside system:** the tool layer stops calling a service that stays down. The status-check service decides when to ask again, within its limits. <!-- M4; decided 2026-10-22: the service calls through the tool layer -->
- **What it changes next:** the wait in the book of waits. The carrier's answer arrives as an event from the status-check service. The wait's time signal, or the check-in, wakes the worker. <!-- HC-3; decided 2026-10-22: the book of waits; decided 2026-10-22: the status-check answer -->
- **The final state:** waiting on a person; the conversation manager sets completed once Meera has her answer.
- **How it is checked:** the tool layer's retry limit; the wait's limit, which decides when waiting is no longer honest; the completion check. <!-- M4; H3; IA-23 -->
- **Rebuilt afterwards from:** the tool layer's tries, the wait with its limit, the interim message in the sent record, and the declared failure. <!-- O7 -->

Two promises apply. The **response promise** — "we will tell you something useful by 17:00" — is kept by the interim update. The **resolution promise** is to finish the case; it has its own clock and its own reminders. A slow carrier never excuses a missed promise. <!-- H11; Level 2 time: the caution -->

## Other walks beneath this kind

- **The escalation path is used up.** The delivery contact and their manager do not answer, and no one is left. The situation is blocked, with its reason, and the business owner decides ([kind 14](kind_14_blocked_or_reopened.md)). <!-- Section 8 states -->
- **The escalation path reaches the carrier's own team.** If the business's policy allows partner contact, Tend sends only the tracking number and the problem. <!-- K4 -->
- **The AI provider is down.** Situations wait, go to a person, or stop safely. Nothing is sent without a recorded decision. <!-- Section 6 additions: degraded service -->
- **A provider retires a connection Tend uses.** A backup connection takes the work, what it cannot do is shown, and the business decides whether to move to a new system. Open situations move over only on purpose. <!-- Section 6 additions: a retired connection -->
- **A part of Tend cannot be reached.** Its waits stay in place inside their limits. Past a limit, the situation worker records a failure. If the situation record itself cannot be reached, no step is taken that cannot be saved; arrivals are held until they can be saved, and every time signal is set again from the book of waits when it is back. <!-- Section 7: failure and unavailability; settled 2026-10-22: part outages -->

## Values each business sets

- Which fallback sources a business allows is a value each business sets; how the "weaker" mark looks is left to whoever builds the screens. The rule — a weaker source never moves money — holds whatever it allows. <!-- Level 2 failure: partly down open -->
- The numbers: retry counts, gaps, and limits, set with each business's settings. <!-- Level 2 failure: the numbers -->
