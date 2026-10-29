# Kind 13: Who is speaking is unknown or unverified

This file answers one question: how does Tend behave when it cannot be sure who is sending a message?

In plain words: Tend cannot be sure who is sending a message.

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
- A **held note** records that a message may belong to a situation. It is kept in the conversation manager's own record of held notes, not in any situation, and changes nothing there. <!-- B9 -->
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

In the common case, the sender is a known customer, writing from a channel linked to them. Here the sender is unknown, or claims to be someone Tend cannot check. <!-- Level 2 identity: two layers -->

Tend does not check who a person is itself. A sign-in provider — an outside service that checks identities — does. <!-- Level 2 identity: two layers -->

A permission belongs to a verified person. A name or a phone number alone grants nothing. <!-- G9 -->

A WhatsApp number bound to a member proves which channel a message came through, and names that member. It does not prove who is typing. <!-- Level 2 identity: channel binding; decided 2026-10-22: identity and permission -->

So Tend keeps three records apart: <!-- decided 2026-10-22: identity and permission -->
- the **sign-in identity**, which the sign-in provider keeps, and which proves the person;
- **membership**: which signed-in people work for this business, with which roles;
- **channel bindings**: a member's WhatsApp, Telegram, or email, tied to their membership while they were signed in. A bound channel proves only the channel, and names the member it is bound to.

A customer is not a member. A customer's channel identifies the contact for their own situations, and grants no permission.

Two parts behave differently:
- **The intake step** fixes which business the message belongs to, and who sent it, from what can be checked — never from the message's text. <!-- AC-1 -->
- **The permission check** shows each sender only what that sender may see. The default is nothing. <!-- T11 -->

## Example walk: a stranger types a customer's order number

Someone writes from a phone number Tend does not know: "Where is order 9912?" Order 9912 is Meera's. <!-- Section 11: who may see what walk -->

```text
1.  unknown sender       -> conversation manager : "Where is order 9912?"
2.  conversation manager -> conversation manager : the intake step: the sender is not linked to any known person
3.  conversation manager -> held notes           : a held note: "order 9912 mentioned by an unknown sender"; Meera's situation is not changed
4.  conversation manager -> communication layer  : a reply that reveals nothing about the order (the update decision)
5.  communication layer  -> communication layer  : send check
6.  communication layer  -> unknown sender       : a holding reply that reveals nothing about the order (the wording is the business's choice) — sent through the tool layer
```

<!-- B9; AC-1; T11; Section 11: who may see what walk -->

Compare the common case. Meera writes "any update?" from the WhatsApp number on her contact record, the channel identifier kept for her own situations. That channel identifies her as the contact for her own situations, so Tend offers her own open situations, and nothing else. <!-- Section 11: who may see what walk; decided 2026-10-22: identity and permission -->

## The walk, step by step

- **Starts with:** a message from an unknown sender. <!-- B1 -->
- **Started by:** the unknown sender.
- **The responsibility:** routing, and keeping each business's data apart. <!-- B2; U1 -->
- **Part in charge:** the conversation manager's intake step; the permission check. <!-- AC-1; T2 -->
- **The information:** the sender's number; the order number in the text.
- **The current state:** Meera's situation is unchanged.
- **What is uncertain:** who is writing.
- **Who may decide:** fixed code, from what can be checked. <!-- AC-1 -->
- **The decision:** reveal nothing; record that the order was mentioned, in a held note. <!-- T11; B9 -->
- **The change of state:** none.
- **The success path:** the stranger learns nothing; Meera's data stays hers.
- **The failure paths:**
  - The sender insists, or the attempts repeat. A burst of refused attempts to reach data they may not see raises an alert. <!-- Level 2 security: the alerts -->
- **A person stepping in:** none, unless the business's rules send it to one.
- **The outside system:** the channel.
- **What it changes next:** nothing wakes Meera's situation.
- **How it is checked:** the checked sender at intake; the permission check on what each sender may see. <!-- AC-1; T11 -->
- **The final state:** Meera's situation is unchanged; the stranger's message stays held, with its note, and opens no situation unless the business's rules send it to a person.
- **Rebuilt afterwards from:** the incoming record, the held note, and the reply sent. <!-- B7 -->

Customers are not asked to confirm before a record is shown to a person, unless the business adds that step. <!-- accepted call: customer confirmation -->

## Other walks beneath this kind

- **An investor types a customer's phone number.** The investor sees nothing from that customer. <!-- Section 11: who may see what walk -->
- **A message claims to come from the other shop.** Which business a message belongs to comes only from one of these: the business's own web address, checked; a person signing in, matched against Tend's own list of members, never by email address alone; a channel both sides have confirmed; or a job Tend's own system created. Anything else is only a hint. <!-- Level 2 security: four sources of the business -->
- **An employee's sign-in is valid, but they have left.** Their membership ended the same minute, so the permission check refuses the step. <!-- T11; decided 2026-10-22: identity and permission -->
- **A message on WhatsApp claims to be from Kabir, the business's employee, from a number not bound to him.** It is treated as an unknown sender. Its words are a claim from an unknown sender, and nothing about the business is revealed. <!-- decided 2026-10-22: identity and permission -->
- **Kabir writes from his bound WhatsApp: "the parcel was handed to the courier at 11".** His words are recorded as a claim: "came through the WhatsApp bound to Kabir; person not verified". Routine information like this needs no sign-in. If he asks Tend to approve a refund, the approval needs a fresh sign-in ([kind 11](kind_11_approval_or_refusal.md)). <!-- decided 2026-10-22: identity and permission -->

## Open questions, and what is set later

Nothing in this kind is open.
