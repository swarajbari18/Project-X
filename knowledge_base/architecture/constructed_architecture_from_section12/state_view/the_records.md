# What Tend remembers, and who may change it

This file answers one question: what does Tend remember, who writes it, and how does it change?

Most of Tend's most important rules say who may change what. For example, only one part may mark a situation as completed. This file is the one place where all those rules are written together. <!-- method: the state view -->

Tend is the software that keeps a business's operational problems moving. Each problem is one **situation**. Meera's late parcel is one situation. The refund on order 9912 is another. Priya's outreach, a message to a possible customer, is a third. <!-- A1 -->

Each rule here has one of these statuses:
- **Decided:** the project owner — the person designing Tend, not the business owner — said yes. On 2026-10-22 the project owner accepted every recommendation this design had made, and asked for the smaller questions inside them to be settled in the way that best fits; those points are Decided, and points settled that day say so. A rule marked as "the design's reading" was worked out from its sources rather than found written down; it is Decided too. <!-- decided by the owner, 2026-10-22 -->
- **Provisional:** a working choice that carries a condition for reopening it.
- **Rejected:** turned down on purpose, with the reason kept.
- **Deferred:** a value or a detail left, on purpose, to a later stage — **deferred to configuration** (each business or market sets it), **deferred to Level 3** (the stage that chooses the technology), or **deferred to implementation** (whoever builds it). The rule around it is Decided.

Two earlier status words, **To confirm** (written down, but not yet agreed by the project owner) and **Open** (no answer yet), are no longer used: since 2026-10-22, no rule here carries either.

A rule with no status word next to it is **Decided**: it has a source the project owner accepted. Every rule that is not Decided carries its word where it appears. In this file, "the business owner" means the person who runs the business Tend serves.

<!-- Every rule below carries its code in a hidden note. Its meaning, source, and status sit in code_index.md in this folder. -->

## Words used in this file

- A **record** is something Tend keeps and can read back later.
- A **version** is one saved state of a situation, after a change. <!-- HC-1 -->
- A **notice** is a short internal signal that a new version exists. People never see it. <!-- Section 7: the change channel -->
- An **arrival** is anything that comes into Tend from outside: a customer's message, an outside system's answer, a platform's news. <!-- decided 2026-10-22: the status-check answer -->
- A **wake** is a signal that makes the situation worker look at one situation again: a person's answer, a changed state, a due date, the status-check service's answer, a platform rule change on a channel where the situation has a step pending, a delivery receipt while a send is still pending, or a check-in. A **check-in** is the one regular wake each waiting situation gets. <!-- HC-3; decided 2026-10-22: platform rule wake -->
- A **time signal** is the alarm the situation worker sets for one wait's due time. When it fires, it wakes only that worker. <!-- decided 2026-10-22: the book of waits -->
- A **run** is one pass of the situation worker over one situation.
- A **claim** is one fact Tend has been told, with its source and time. <!-- E1 -->
- A **wait** is a pause until one named thing happens. A **work item** is a task for one named person. The **escalation path** is the business's own list of who to turn to next. <!-- HC-3; IA-14; J5 -->
- The parts, one line each: <!-- Section 7: the parts table -->
  - the **conversation manager** takes in each arrival, decides whether a person should hear an update, and sets a situation to completed. It contains the situation worker and the communication layer, listed separately below.
  - the **situation worker** reasons about one situation and writes what Tend concludes;
  - the **communication layer** sends messages, through the tool layer, and keeps the consent records;
  - the **tool layer** makes every call to an outside system;
  - the **status-check service** waits on an outside system while the work goes on;
  - **memory** keeps what Tend learned;
  - **configuration** holds the business's settings, permissions, and members;
  - the **owner view** builds the screens the business owner opens;
  - **improvement** is how the product team makes Tend better for every business.
- The **intake step** is the conversation manager's first step, which reads each new arrival. A **channel** is one way of reaching a person, such as WhatsApp or email. <!-- B2; L1 -->
- The **book of waits** lists every wait that may outlast its run, and what will end it. <!-- HC-3 -->
- A **trace** is the saved record of one run of work, with no personal data. The **audit** is the record of every important step; it is only ever added to. <!-- O7; settled page: no personal data in a trace -->
- The **configurator** is the person who sets the business up: the business owner, or someone the business owner names. <!-- G7 -->
- A **member** is a person who works for the business, proved by the sign-in provider the business uses (the outside service that checks who a person is when they sign in). Customers and partners are not members. <!-- decided 2026-10-22: identity and permission -->
- A **grant** is a range of steps a business allows Tend to take without asking. For example, the business may let Tend send Meera a delivery update without asking first. <!-- T3 -->
- The **product team** is Tend's own builders.

## The rules that hold for every record

- **Nothing is rewritten.** A change is a new version; the old one stays as history. <!-- HC-1 --> The one exception is a deletion the law requires: a customer's data is removed from every place it lives — records, logs, copies kept for speed, traces, and backups. <!-- Level 2 compliance: deletion everywhere; Section 6: backups --> Whether such a deletion also reaches the audit, which is only ever added to, is set for each market by its law, when Tend enters that market. Where a law requires it, the deletion reaches the audit too. <!-- closed item: deletion and the audit -->
- **One writer for each kind of change.** Each kind of change has one part allowed to write it. <!-- Section 7 writer table: who writes what -->
- **Every write sends its notice.** A write and its notice happen in the same run. If a write is saved without its notice, it is unfinished, and is tried again. No separate part checks this. <!-- HC-1; recorded earlier: no separate checker -->
- **An arrival is saved before anything acts on it.** It is saved as it came, by the conversation manager, and the conclusion is the situation worker's. <!-- decided 2026-10-22: the status-check answer; Section 7: HC-2 -->
- **Memory cannot settle a fact.** It can only propose. For example, it may propose linking two situations about the same order; only the situation worker accepts or denies that link. <!-- Section 7 writer table: who writes what; Section 7: links -->
- **The owner view writes nothing.** It builds its screens from the records. <!-- Section 8: the save protocol -->
- **Tend does not own other systems' facts.** A carrier's tracking stays with the carrier. Tend keeps what it was told, with its source and time. <!-- Level 1: does not own other systems' facts; E1 -->

## The records

| Record | What it holds | Who writes it | How it may change |
|---|---|---|---|
| **The situation record** | The versions of one situation: what came in, what Tend found, its conflicts, its decisions, its waits, its state | The conversation manager and the situation worker, each for its own kinds of change (see the next section) | Only by a new version |
| **The incoming record** | Each arrival as it came, with the channel's or the outside system's reference to the original; the channel keeps the message itself | The conversation manager | Only added to |
| **Held notes** | A note that a message may belong to a situation, written when the match is weak. It changes nothing in that situation. | The conversation manager, at its intake step | Kept as history |
| **Filed documents** | A document nobody asked for, filed on the matching situation or the sender's record, with its date and sender, or shown to a person. Nothing is done on the document alone | The conversation manager, at its intake step; the situation worker records it as a claim | Only added to |
| **The book of waits** | One shared table of every open wait, across all situations, kept with the situation records: what each waits on, what ends it, its due time, and who declared it. A wait that begins and ends inside one run is not written here; any wait that may outlast the run is. | The situation worker, in the same save that writes or ends the wait — including a wait a tool declares, which the worker's fixed code saves | A wait is written, refreshed, or ended, always together with its situation's version. Read by the conversation manager (at intake, and after a platform rule change), the status-check service, the owner view, and — after a restart, to set every time signal again — the worker. |
| **The status-check service's record of asks** | For each wait it serves, how many asks it has made, and when it may ask next — like the tool layer's record of its tries. It is not a list of what situations wait for: it is never used to match an arrival, and it is rebuilt from the book of waits after a restart | The status-check service | Updated at each ask; an entry ends when its answer is sent or its limits run out |
| **Links between situations** | Two situations, the reason they are connected, and the kind of connection | The situation worker, after memory or the conversation manager proposes one | Accepted, denied, or removed; a removal is recorded |
| **Work items for people** | Kind; who is answerable; the deadline; when it was acknowledged, which is not when it was done; its place on the escalation path; the evidence so far | The situation worker; a person's answer is recorded by the conversation manager | A new version of the item |
| **The sent record** | Each message sent: the message, the reason, the evidence used, the next responsibility, the wait, and the result; delivery receipts. It is not a version of the situation; its save is announced, naming the situation, so the situation's history can be read with it. | The communication layer | Only added to |
| **The tool layer's records** | The state of each call's tries; the note of what is about to happen, before a step that cannot be undone; the record of each important call, including the status-check service's asks; each business's connection codes, in a locked store | The tool layer | Tries: updated at each try. Notes and call records: only added to |
| **The audit** | Every important step: what was done, the evidence, the grant, the reason, the outcome. An approval also records who approved, their sign-in identity, when they signed in, and exactly what they approved. | The part that takes the step | Only added to |
| **The trace of each run** | What happened in one run, and why — with no personal data | Fixed code, for each run | Never rewritten |
| **Memory's items** | Business knowledge kept ready, lessons, candidates for settings, its own record of experience | Memory | Each item moves through its own life (below) |
| **Configuration** | Grants; the business's settings; the checks for each setting; its compliance settings — the legal and platform rules for each country it works in | Only fixed tools the configurator uses. A second person approves each change to compliance settings | A new version, after its check passes |
| **Membership** | Which sign-in identities are members of this business, with which roles. One membership per business a person works for. | Configuration's fixed tools, when the configurator invites or removes someone | A new version; a removal takes effect at the very next step |
| **Channel bindings** | A member's WhatsApp, Telegram, or email, tied to their membership, with its evidence and a date to review it | Configuration's fixed tools, only while the member is signed in, through a one-time link sent to that handle | Made, suspended when a bound WhatsApp identifier changes, proved again, moved by the configurator, or ended |
| **Consent records** | One list per business. Each entry: one contact point, one kind of message, and whether consent was given, withdrawn, expired, or refreshed — with what the person did, what they were shown and its version, when, and through which channel | Only the communication layer's fixed consent code; never the AI | Only added to: a withdrawal or a renewal is a new entry |
| **The channel rule records** | Each channel's rules, such as how long a business may reply | The product team, through a fixed tool; the communication layer holds them | A new version, when a platform changes its rules; the update announces itself |
| **The list of tools** | Every tool, with its version | The product team | Checked against the approved copy; never added to while Tend runs |

<!-- Section 7 writer table: who writes what; B7; B9; decided by the owner, 2026-10-10; HC-3; Level 2 time: every call waits; decided 2026-10-22: the book of waits; settled 2026-10-22: short waits; decided 2026-10-22: the wait a tool declares; settled 2026-10-22: the service's own list; Section 7: links; Level 2 understanding: unlink; IA-14; Section 7: the sent record, two readings; Section 7: tool layer writes; Section 7 additions: connection codes; decided 2026-10-22: the service calls through the tool layer; O7; T9; Section 8: the trace; settled page: no personal data in a trace; Section 7: memory owns; Section 7: configuration; Section 7 additions: compliance settings; accepted call: compliance settings; decided 2026-10-22: identity and permission; settled 2026-10-22: changed bindings; Level 2 channels: the consent record; decided 2026-10-22: consent records; settled 2026-10-22: consent fields; Level 2 growth: a platform rule changes; U5 -->

A withdrawal of consent stops what the person withdrew, from the very next send. "STOP" on WhatsApp stops every message the business starts on WhatsApp. "Stop contacting me", on any channel, stops every message the business starts, on every channel. An unclear sentence that may be a withdrawal is recorded as one until the person says otherwise. <!-- consent withdrawal; settled 2026-10-22: unclear withdrawal -->

The audit can be checked for tampering: a separate account writes it, and each entry carries the system's own clock time. <!-- Section 6 additions: tamper-evident audit -->

## Who writes each change to a situation

| Change to the situation | Written by |
|---|---|
| The first version of a new situation, with what came in | The conversation manager, at intake |
| An arrival: an incoming message, attached, new, or held | The conversation manager |
| An outside system's answer, such as the status-check service's, saved as an arrival on the wait it answers | The conversation manager |
| A person's answer, including an approver's | The conversation manager |
| Whether an update is worth telling a person | The conversation manager |
| After a platform rule changes: one version in each situation with a step pending on that channel | The conversation manager |
| Gathered facts and claims, each with its source and time | The situation worker |
| A conflict between claims | The situation worker |
| A correction | The situation worker; if the correction came as a message, the conversation manager records the message first |
| The next step | The situation worker |
| What should be said | The situation worker |
| A wait written, refreshed, or ended — including a wait a tool declares; the result of a timer or a check-in; a declared outcome; the work recorded as resolved | The situation worker |
| What an outside system's answer means | The situation worker, using the fixed code of the tool that declared the wait |
| Work for a person | The situation worker |
| A link accepted or denied | The situation worker |
| Completed | The conversation manager only |

<!-- Section 7 writer table: who writes what; IB-6; decided 2026-10-22: the status-check answer; closed item: approval answer route; decided 2026-10-22: platform rule wake; decided 2026-10-22: the wait a tool declares -->

For example, the refund on order 9912. The refund tool declares the wait; the worker saves it. Two days later, the payment provider's "refund 9912 paid" comes back through the status-check service. The conversation manager saves it as an arrival on the refund's wait. The worker wakes, reads it through the refund tool's fixed code, and writes that the refund is paid and the wait has ended. <!-- decided 2026-10-22: the wait a tool declares; decided 2026-10-22: the status-check answer -->

Some changes must be saved together, in one version: <!-- S4 -->
- Tend's reply, and the cancelling of the wait it answers. The customer's message is recorded first, as its own version. <!-- IB-3 -->
- A step started, its unknown result, and the wait for it. For example, the refund on order 9912 is recorded as started, with its result unknown and the wait the refund tool declared, in one version, before the AI is told. <!-- IB-11; settled 2026-10-22: one version for a step and its wait -->
- A partial answer: the new claims, any wait, and the question still open. <!-- Section 8: atomic moves, a partial gather -->
- A new work item, with the person answerable for it. <!-- IA-14 -->
- A handoff, pending until the new person accepts it. <!-- IA-14 -->
- A "Tend cannot know this here" declaration, with its evidence. <!-- O10 -->
- A closure, with its outcome: one of the eight endings listed in [the situation file](../responsibility_view/the_situation.md). <!-- A6; A9 -->
- Any wait, with its entry in the book of waits. <!-- decided 2026-10-22: the book of waits -->

These are the cases found so far. Any further change that must not be seen half-done is added to this list. <!-- S4: the list -->

## The life of a situation

Meera's parcel shows the states in order. It runs while Tend asks the carrier. It waits when the carrier has not answered. It runs again when the carrier answers. It is completed only when the worker has recorded the work as resolved, no wait is still running, and the last message has gone out.

A situation is always in one of four states: running, waiting, blocked, or completed. <!-- states: liveness -->

| From | To | Who makes the change | What triggers it |
|---|---|---|---|
| Running | Waiting | The situation worker, including when a tool declares a wait | The situation must pause until one named thing happens. The wait records: what it waits on; why; how long it may take; what wakes it; what happens if the person cannot wait; what happens if it never ends; who can see it; and who declared it. |
| Waiting | Running | The situation worker, when a wake arrives | Someone answers; a state the situation is watching changes; a date arrives; the status-check service's answer comes in; a platform rule changes on a channel the situation is about to use; or the check-in comes round. An arrival reaches the worker through the conversation manager first. |
| Running or waiting | Blocked | The situation worker only | No safe step is left, and no one is left to escalate to, after the escalation path is used up. The reason is shown. A blocked situation has no check-in. |
| Blocked | Running or waiting | The situation worker only | What blocked it has gone, or a person acts |
| Blocked | Completed | The conversation manager | The business stops the situation. The reason is shown. |
| Running or waiting | Completed | The conversation manager only | The worker has recorded the work as resolved, no wait is still running, and the last message has gone out |
| Completed | Running | The situation worker, once the intake step has decided the closure was wrong | The same problem was resolved too early, or has come back. The situation is marked reopened. |

<!-- Section 8: the states table; H2; decided by the owner, 2026-10-17; decided 2026-10-22: the wait a tool declares; decided 2026-10-22: platform rule wake; decided by the owner, 2026-10-12: completed; Section 8 additions: blocked work; A8 -->

Two rules hold for every change of state: <!-- Section 8: the states table -->
- a timer wakes only the situation worker;
- the conversation manager never sets waiting or blocked.

**Only the conversation manager sets a situation to completed.** It does so only when no wait is still running and the last message has gone out, or when the business stops a blocked situation. The situation worker cannot set completed. <!-- decided by the owner, 2026-10-12: completed; Section 8: the states table -->

A failure is never a fifth state. It is a recorded event, and the situation stays in one of the four. For example, if the payment provider never answers about the refund on order 9912, Tend records the failure, and the situation stays waiting. <!-- M1 -->

"Reopened" is a mark on the same record, not a new record. Its exact form is left to whoever builds the record (deferred to implementation). <!-- A8 -->

## What the business owner sees

The business owner sees each situation under one of eleven labels. A label says, in plain words, where the work stands. It is worked out from the records each time the screen is built, and never stored; underneath, the situation is always in one of the four states above. <!-- states: display; closed item: label mapping -->

| Label | Worked out from | The state underneath |
|---|---|---|
| Unable to proceed | The situation is blocked | Blocked |
| Closed | The situation is completed | Completed |
| Ready for owner | An open work item that only the business owner can answer | Waiting |
| Needs employee information | An open work item for a member of the business | Waiting |
| Meeting requested | An open wait on a meeting | Waiting |
| Waiting for reply | An open wait on the person's reply | Waiting |
| Paused | An open wait on a set date | Waiting |
| Message sent | A message to the person is in the sent record, and no reply is awaited | Waiting or running |
| Engaged | The person has replied, and Tend is working on it | Running |
| Preparing | Tend is working, and nothing has been sent to the person yet | Running |
| Not started | The first version exists, and the worker has not yet run | Running |

When more than one label fits, the first one in this table is shown. <!-- closed item: display mapping -->

## The life of the other records

- **A work item** is in one of these states: open, pending handoff, waiting for a response, completed, or cancelled. <!-- IA-14 -->
- One named person is answerable for each work item at a time. A handoff stays pending until the new person accepts it. <!-- J4; J8 -->
- **A grant** is created, then active, then changed or revoked (taken back), and finally ended. Each change is recorded. A grant ends when it is revoked, when it expires, or when its holder leaves. <!-- Level 2 authority: grant lifecycle --> It does not end because its holder is away, but while they are away Tend does not treat them as the active holder. While they are away, a step that needs them follows the business's rule for who covers while a person is away, and its escalation path, and a substitute acts only within the substitute's own grants. The business may narrow or revoke the grant at any time. <!-- Level 2 authority: grant end open; J9 -->
- **A membership** ends the minute the configurator removes the person. Every grant and channel binding that rests on it fails at the person's very next step. <!-- decided 2026-10-22: identity and permission; Level 2 compliance: leavers -->
- **A business policy** is drafted, checked, switched on, versioned, replaced or expired, and retired. Each open situation keeps the version it started with. The refund setting is the one exception: it is read each time a refund is tried. <!-- Section 7: configuration; Q3; decided by the owner, 2026-10-10: refund setting read at attempt -->
- **A new capability** moves through these steps, in order: <!-- Section 7: configuration -->
  1. requested;
  2. evaluated;
  3. written;
  4. given its contract: its limits, how it fails, and whether it can be undone;
  5. checked;
  6. tested;
  7. switched on;
  8. watched;
  9. retired.
- **A memory item** is active, out of date, replaced, in conflict, retired, or unresolved. **Provisional.** <!-- N9 -->
- **A lesson** starts as a candidate, and does nothing until it is approved. It is checked against old cases before it is kept. One that makes things worse can be undone. **Provisional.** <!-- Level 2 learning -->
- **A wait** is written, refreshed, or ended, each time together with its entry in the book of waits. When the situation completes, the situation's check-in is removed, and it never fires again. <!-- HC-3; Section 8 additions: check-in removed; decided 2026-10-22: the book of waits -->

## What is still provisional

- The states of a memory item, and undoing a lesson that makes things worse. **Provisional**, until the project owner reviews the business's memory answers. <!-- N9; Level 2 learning -->
