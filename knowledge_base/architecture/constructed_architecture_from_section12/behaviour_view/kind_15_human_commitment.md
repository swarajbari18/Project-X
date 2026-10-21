# Kind 15: A human commitment changes shape

This file answers one question: how does Tend behave when a person's promise — a meeting, a piece of work, a handoff — is missed, moved, or passed to someone else?

In plain words: a person's promise — a meeting, a piece of work, a handoff — is missed, moved, or passed on.

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

In the common case, a person does what they agreed. Here the agreement itself changes: a meeting is missed or moved, or work passes to another person. <!-- K3; J8 -->

A meeting is a wait on people and a date. A meeting that is cancelled, missed, or moved is a wait that ended without the meeting. Tend records it as a **meeting event**: why, in the person's words; when; and whether someone's **reserved time** — the time a person set aside for the meeting, such as Ravi's Tuesday 10:00 — was used up. <!-- K1; K3; Level 2 meetings: the meeting event -->

A missed meeting has a next step. <!-- K3 -->

Two parts behave differently:
- **The situation worker** books again only inside what each person agreed to. It writes each meeting event, because a meeting event is a wait that ended. <!-- K2; our reading: meeting event writer -->
- **The owner view** shows the count of a person's missed meetings, worked out from the events, never stored on its own. <!-- Level 2 meetings: two counts -->

## Example walk: Priya misses her meeting, then moves it

Priya, about to buy, asked to speak to a person. Ravi, a salesperson, takes sales calls on weekday mornings. Tend checked with Priya, and booked Tuesday at 10:00. <!-- Level 2 meetings: how Tend books -->

```text
1.  (Tuesday 10:00) time signal -> situation worker : the meeting time arrives
2.  Ravi                 -> conversation manager : "Priya didn't join."
3.  conversation manager -> situation record     : new version, with Ravi's report
4.  situation record     -> situation worker     : notice
5.  situation worker     -> situation record     : new version: a meeting event — missed; Ravi's time used up; the next step: ask Priya
6.  situation record     -> conversation manager : notice
7.  conversation manager -> communication layer  : worth telling Priya (the update decision)
8.  communication layer  -> communication layer  : send check
9.  communication layer  -> Priya                : "We missed you today. Would another morning suit you?" — sent through the tool layer
10. Priya                -> conversation manager : "Sorry — Thursday?"
11. conversation manager -> situation record     : new version, with Priya's answer
12. situation record     -> situation worker     : notice
13. situation worker     -> tool layer           : book Thursday 10:00 in the calendar, through the meeting capability
14. situation worker     -> situation record     : new version: a new wait — Thursday 10:00, inside Ravi's weekday mornings
15. situation record     -> conversation manager : notice
16. conversation manager -> communication layer  : worth telling Priya and Ravi (the update decision)
17. communication layer  -> communication layer  : send check
18. communication layer  -> Priya, Ravi          : the new time — sent through the tool layer
```

<!-- K1; K3; K2; Level 2 meetings: intent asked once -->

## The walk, step by step

- **Starts with:** the meeting time passing without the meeting. <!-- K3 -->
- **Started by:** the meeting wait's time signal; Ravi's report.
- **The responsibility:** arranging meetings. <!-- K1 -->
- **Part in charge:** the situation worker. <!-- Section 7: the parts table, worker rules -->
- **The information:** the meeting, Ravi's standing intent, and Priya's answer. <!-- Level 2 meetings: intent asked once -->
- **The current state:** waiting on the meeting, then running.
- **What is uncertain:** whether Priya will come.
- **Who may decide:** the business's rules decide who may take the meeting; each person decides when. <!-- Level 2 meetings: who is suitable -->
- **The decision:** record the miss; ask Priya; book again inside Ravi's agreed times. <!-- K3 -->
- **The change of state:** waiting, to running, to waiting on the new time.
- **The success path:** the Thursday meeting happens; its outcome creates the next work item, with a named owner. <!-- Section 8 additions: meeting outcome -->
- **The failure paths:**
  - Priya's meetings keep being missed. Past the limit the business sets for this situation, she must state her willingness again before the next booking. <!-- Level 2 meetings: two counts -->
  - A person's misses pass the limit across all their situations. Routine booking stops for them, and they are told the limit is used up. One escalation goes to a senior person, with the full history. Then the chain ends: the senior alone decides whether to reach out. <!-- Level 2 meetings: two counts; Level 2 meetings: the chain ends -->
  - The senior does nothing. The business owner is alerted, as to any escalation that has gone past everyone assigned. No new meeting chain starts. <!-- Level 2 meetings: the senior's silence -->
- **A person stepping in:** Ravi; a senior person, if the chain runs.
- **The outside system:** the calendar.
- **What it changes next:** the new meeting wait in the book of waits. <!-- HC-3 -->
- **The final state:** waiting on Thursday's meeting.
- **How it is checked:** the meeting event recorded for each miss; the counts worked out from those events; booking only inside each person's standing intent. <!-- K3; Level 2 meetings: two counts; Level 2 meetings: intent asked once -->
- **Rebuilt afterwards from:** the meeting events, the messages, and the new booking. <!-- O7 -->

Each meeting event is graded: **missed** (someone held the time, and the person never came), **cancelled in good time**, or **moved politely**. Only a miss used up someone's time. <!-- K3 -->

A documented emergency does not count against a person. That exception, the **waiver**, is recorded, so it can be checked later. <!-- Level 2 meetings: the limit is a hand-over -->

Each business sets the limits, the waivers, and the expiry rules. The design gives no values for them, except the working default that a standing intent lasts a month. <!-- Section 8 additions: meeting values; Level 2 meetings: intent expires -->

## Other walks beneath this kind

- **Work passes to another employee.** A handoff stays pending until the new person accepts it. Until then, the previous person stays responsible. The work moves with its full context. <!-- J8 --> A handoff is accepted automatically only where the business has set a rule for it. <!-- Section 8 additions: auto-accept --> For example, Arjun hands Meera's delivery case to Sana: <!-- J8 -->

```text
1.  Arjun                -> conversation manager : "Please hand Meera's case to Sana; I am moving to another team."
2.  conversation manager -> situation record     : new version: Arjun's request, saved as an arrival
3.  situation record     -> situation worker     : notice
4.  situation worker     -> situation record     : new version: a handoff — Meera's delivery case, from Arjun to Sana; pending, with the business's deadline for accepting
5.  situation record     -> conversation manager : notice
6.  conversation manager -> communication layer  : worth telling Sana (the update decision)
7.  communication layer  -> communication layer  : send check
8.  communication layer  -> Sana                 : the case, its deadline, and its history — sent through the tool layer
9.  (until Sana accepts, Arjun stays responsible)
10. Sana                 -> conversation manager : "I'll take it."
11. conversation manager -> situation record     : new version, with Sana's answer
12. situation record     -> situation worker     : notice
13. situation worker     -> situation record     : new version: the handoff accepted; Sana is now responsible
```

<!-- J8; IA-14 -->

A handoff starts in one of three ways: the answerable person asks to hand the work over; the business's cover rule applies, because they are away; or the escalation path moves the work on. In each, the first person stays responsible until the new person accepts. If Sana does not accept by the business's deadline, the escalation path runs. A manager may force a handoff only where the business's settings give that role the right; a forced handoff is recorded as forced. <!-- closed item: what starts a handoff; Level 2 people: handoff open -->

- **An employee acknowledges work, then does nothing.** Acknowledging is not finishing. The work stays open, and Tend names the silence ([kind 10](kind_10_person_silent.md)). <!-- J6; J5 -->
- **A standing intent expires.** "Free on weekday mornings", said a month ago, is not "free this Tuesday". The default is a month; each business sets its own. <!-- Level 2 meetings: intent expires -->

## Open questions, and what is set later

Nothing in this kind is open. The steps of booking itself belong to the meeting capability, written when it is built; they sit inside the two meeting waits: the wait for the person to choose a time, and the wait for the meeting itself. Each business sets its meeting limits, waivers, and expiry rules. <!-- Section 11: meeting booking open; Section 8 additions: meeting values -->
