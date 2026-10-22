# Kind 4: One instruction fans out to many people

This file answers one question: how does Tend behave when one instruction from the business means work with many people?

In plain words: one instruction from the business means work with many people.

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

In the common case, one message touches one situation. Here one instruction creates many situations at once. <!-- B6 -->

One instruction does not become one problem. Each person is their own situation. A list of thirty people creates thirty situations, and one board that shows them all. <!-- B6 -->

Two parts behave differently:
- **The conversation manager** creates one situation per person at its intake step. <!-- B6 -->
- **The owner view** shows the whole assignment on one board, built from the thirty situations. <!-- B6; O2 -->

Each situation then runs on its own. One person's reply never changes another person's situation. <!-- Level 1: more situations -->

## Example walk: thirty people to contact

For example, the business owner gives Tend thirty people to contact about a new product, and says: "follow up once after three days if there is no reply." Priya is one of them. <!-- Level 2 authority: thirty addresses; Level 2 journey: how a nurture moves -->

```text
1.  business owner       -> conversation manager : a list of thirty people, and the follow-up rule
2.  conversation manager -> situation record     : thirty first versions, one per person
3.  situation record     -> situation worker     : thirty notices, one per situation
4.  situation worker     -> situation record     : for each: the first message to send, and a wait of three days
5.  situation record     -> conversation manager : thirty notices
6.  conversation manager -> communication layer  : each first message is worth sending
7.  communication layer  -> communication layer  : send check, including each person's consent for a message the business starts
8.  communication layer  -> each person          : the first message, on a channel the rules allow for a first contact — sent through the tool layer
9.  owner view           -> business owner       : one screen: thirty situations, each with its state
```

<!-- B6; IB-6; Level 2 journey: how a nurture moves; L3 -->

From here, each of the thirty runs its own path. Priya replies on the morning her follow-up is due, just before it goes out (see [kind 6](kind_06_timer_and_reply.md)). Others do not reply, and their follow-up goes out after three days. <!-- Level 2 journey: how a nurture moves -->

## The walk, step by step

- **Starts with:** the business owner's instruction. <!-- B1 -->
- **Started by:** the business owner.
- **The responsibility:** routing, and keeping each problem as one record. <!-- B6; A1 -->
- **Part in charge:** the conversation manager creates the situations; the situation worker runs each one. <!-- B6; IB-6 -->
- **The information:** the list of people, and the follow-up rule the business owner gave.
- **The current state:** thirty new situations, each running, then waiting three days.
- **What is uncertain:** who will reply.
- **Who may decide:** the business owner set the follow-up rule. Each person decides whether to reply. <!-- Level 2 journey: nurture cadence -->
- **The decision:** one situation per person, each with its own wait. <!-- B6 -->
- **The change of state:** each situation, running to waiting. <!-- Section 8: the states table -->
- **The success path:** replies come in; each is placed on its own situation. <!-- IB-2 -->
- **The failure paths:**
  - A channel may not let Tend start a conversation with one person. Then that person's first message does not go. The person the business names for this decides how to reach them, or Tend waits. <!-- Level 2 channels: a routing outcome -->
  - One person has not agreed to be contacted, and no other legal ground applies. The send check stops that first message; nothing is sent to them. <!-- L2 -->
  - One person writes "STOP" on WhatsApp. The communication layer's consent code records the withdrawal, with its evidence. Their follow-up is stopped at the send check, and their situation closes as withdrawn. The other twenty-nine go on. <!-- decided 2026-10-22: consent records; consent withdrawal -->
  - A situation was created wrongly, such as a duplicate person. It is corrected later: split, linked, or moved. Two situations later found to be one problem are merged, and the merge is recorded with its reason. <!-- B4 -->
- **A person stepping in:** the business owner reads the screen.
- **The outside system:** the channels used to send.
- **What it changes next:** thirty waits in the book of waits; each person's reply or the three-day date wakes their situation. <!-- HC-3 -->
- **The final state:** each situation goes on, and ends, on its own; the conversation manager sets each one completed.
- **How it is checked:** the send check on each first message, under the channel's rules for a first contact and the person's consent; one situation per person. <!-- Section 8: the send check; B6 -->
- **Rebuilt afterwards from:** the instruction, the thirty first versions, each wait, and each sent record. <!-- O7 -->

## Other walks beneath this kind

- **A supplier price change touches many open orders.** Each order is its own situation. Linked situations stay separate records. Each keeps its own decisions. What Tend knows about one is available when it works on another. <!-- A5 -->
- **A vague instruction.** "Contact everyone about the sale" leaves out who, and how often. Tend asks for what it needs to send safely; it does not turn a vague instruction into a broad, permanent campaign. <!-- Level 2 authority: thirty addresses -->
- **One change touches several linked situations.** Each situation saves its own version; no single save spans them all. The change itself is saved once first, as one arrival or one rule update. The part that writes for those situations — the conversation manager for an arrival or a platform rule change — then writes one version into each affected situation, each carrying the change's reference. If it stops part-way, it starts again from the saved change, and skips every situation that already holds a version with that reference. Each situation stays whole on its own; linked situations may differ for a moment, and each reads the others' newest versions when it next runs. <!-- closed item: fan-out recovery -->

## Open questions, and what is set later

Nothing in this kind is open.
