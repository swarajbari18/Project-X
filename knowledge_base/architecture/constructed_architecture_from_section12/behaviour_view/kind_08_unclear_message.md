# Kind 8: A message cannot be pinned to one situation

This file answers one question: how does Tend behave when it cannot tell which situation a message belongs to?

In plain words: Tend cannot tell which situation a message belongs to.

## Words in this file

- **Tend** is the software that keeps a business's operational problems moving. Each problem is one **situation**, such as Meera's late parcel. <!-- A1 -->
- The **conversation manager** takes in each arrival (a person's message, or an outside system's answer) through its **arrival loop**:
  - its **intake step** saves it, and finds who sent it;
  - **understanding the arrival**, its one AI stage, works out what the arrival means and where it fits;
  - **routing**, fixed code, puts it on the right situation, or the conversation manager answers it at once when no situation is needed.

  It decides whether a person should hear an update, and alone sets a situation to completed. (The arrival loop, since 2026-10-29: [how Tend's product loop works](../../../Level%202/the_product_loop/how_does_the_product_loop_work.md).) <!-- Section 7: the parts table; decided 2026-10-22: the status-check answer; PL-3; PL-5; PL-6 -->
- The **understanding artifact** (until later on 2026-10-29, the **reading**) is what understanding the arrival, the conversation manager's one AI stage, writes before anything acts on an arrival: each ask and whether it is about the business; what each refers to, with time words turned into dates; the sender's claims; what is unknown; what Tend already holds that answers it; and where each ask fits. It is an interpretation, saved with the arrival, never a conclusion. (The status label "the design's reading" is a different thing: a rule worked out from its sources.) (Added 2026-10-29.)
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

In the common case, understanding the arrival finds one clear match. Here it finds several situations the message could fit, and cannot tell which. Understanding comes first: what the message asks and refers to, with the business's meanings of its words in front of it, and the sender's open situations presented by memory and knowledge. <!-- Section 8: routing outcomes; C7; C8; N37; PL-3 -->

Tend never guesses. A weak match means Tend asks the sender. <!-- B3 -->

One part behaves differently:
- **The arrival loop** asks instead of attaching. Its ending is "hold and ask": routing, which is fixed code, records a **held note** (a note that the message may belong to a situation), and the conversation manager's reply decision asks the sender which one. The note changes nothing in that situation. <!-- B3; B9; PL-5; PL-8 -->

## Example walk: "Any update?" from a customer with three open orders

Meera has three open orders: 9910, 9911, and 9912. She writes "Any update?". <!-- B3 -->

```text
1.  Meera                -> conversation manager : "Any update?"
2.  memory and knowledge -> conversation manager : the package before understanding: her three open situations, as typed summaries; the time
2a. conversation manager -> conversation manager : understanding the arrival: asks for news; about the business; no order named; fits: cannot tell between 9910, 9911 and 9912
3.  conversation manager -> held notes           : routing (fixed code): a held note: "may belong to 9910, 9911, or 9912"
4.  conversation manager -> communication layer  : the reply decision: ask Meera which order she means
5.  communication layer  -> communication layer  : send check
6.  communication layer  -> Meera                : "Happy to help — is this about order 9910, 9911, or 9912?" — sent through the tool layer
7.  Meera                -> conversation manager : "9912"
8.  conversation manager -> situation record     : her first message and her answer attached to order 9912's situation
9.  situation record     -> situation worker     : notice
10. (from here, the common path)
```

<!-- B3; B9; IB-2; PL-5; PL-6 -->

The option of answering all three at once, when each holds a current claim, was surfaced on 2026-10-29 and not applied: it would change decided rule B3. It is listed for the project owner in the Level 2 page on the product loop.

## The walk, step by step

- **Starts with:** Meera's message. <!-- B1 -->
- **Started by:** Meera, writing from the WhatsApp number on her contact record, the channel identifier kept for her own situations. A customer's channel identifies the contact for her own situations; it grants no permission. Who sent the message is fixed once, at intake. <!-- Section 11: who may see what walk; AC-1; decided 2026-10-22: identity and permission -->
- **The responsibility:** routing each change to the right problem. <!-- B2 -->
- **Part in charge:** the conversation manager: understanding the arrival finds it cannot tell; routing keeps the held note; the reply decision asks. <!-- B4; PL-5 -->
- **The information:** short summaries of Meera's open situations, never their full records. <!-- B5 -->
- **The current state:** the three situations are unchanged.
- **What is uncertain:** which order she means.
- **Who may decide:** Meera, by answering. <!-- B3 -->
- **The decision:** ask, not guess. <!-- B3 -->
- **The change of state:** none until she answers. The held note changes nothing. <!-- B9 -->
- **The success path:** Meera answers; the message joins order 9912's situation.
- **The failure paths:**
  - The message clearly belongs to more than one situation, such as one message asking about two problems. Tend creates a situation for each at once; the message is not held, and it is never attached silently. <!-- Section 8: routing outcomes -->
  - No match. A new situation starts, or the message is held until it can be placed. <!-- Section 8: routing outcomes -->
  - A message placed wrongly. Later evidence corrects it: the situations are split or linked, or the message is moved. Two situations later found to be one problem are merged, and the merge is recorded with its reason. <!-- B4 -->
- **A person stepping in:** none.
- **The outside system:** the channel Meera used.
- **What it changes next:** Meera's answer arrives as a new message; understanding finds it answers Tend's question, a clear match, and routing places both. If she never answers, the held message stays held and changes nothing. Her next message is understood afresh. A held note still unplaced when the business's wait limit passes goes to a person to place. <!-- IB-2; closed item: unanswered routing question -->
- **The final state:** the message sits on its situation.
- **How it is checked:** the understanding artifact's "cannot tell" and routing's check of it; the held note, which changes nothing in any situation; the send check before the question goes out. <!-- B3; B9; Section 8: the send check; PL-6 -->
- **Rebuilt afterwards from:** the incoming record, the held note, the question sent, and her answer. <!-- B7 -->

When it is unclear whether two messages belong together, Tend creates a separate situation and links it, rather than merging them silently. <!-- B8 -->

## Other walks beneath this kind

- **One message with two asks.** "Where is my parcel, and can I change my address for next time?" becomes two situations. <!-- A4 -->
- **A reply on an old thread about a new problem.** A customer answers a closed refund thread to ask about a different order. A new situation is created, and linked to the old one. <!-- A7 -->
- **A message that refers to a closed situation.** If the same problem has come back, the closed situation is reopened ([kind 14](kind_14_blocked_or_reopened.md)). <!-- A8 -->

## Open questions, and what is set later

Nothing in this kind is open. The exact form of the "reopened" mark is left to whoever builds the record — deferred to implementation (see [kind 14](kind_14_blocked_or_reopened.md)). <!-- A8 -->
