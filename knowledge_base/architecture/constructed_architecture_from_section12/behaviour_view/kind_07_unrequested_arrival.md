# Kind 7: An unrequested document or unknown event arrives

This file answers one question: how does Tend behave when something arrives that nobody asked for, or that does not match anything it knows how to handle?

In plain words: something arrives that nobody asked for, or that Tend has never met.

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

In the common case, a message asks for something. Here something arrives with no request behind it: a document, or an event Tend has never met. <!-- decided by the owner, 2026-10-10 -->

Two parts behave differently:
- **The arrival loop** files a document: understanding the arrival says what it is and what it refers to, and routing, which is fixed code, files it on the matching situation, or on the sender's record. If nothing matches, a person sees it. <!-- decided by the owner, 2026-10-10; PL-3; PL-6 -->
- **The communication layer** sends nothing. The document is not a request, and nothing is promised. <!-- decided by the owner, 2026-10-10 -->

No action is taken on the document alone. <!-- decided by the owner, 2026-10-10 -->

## Example walk: a supplier's bill of materials

A supplier emails the bill of materials for the next production run. Nobody asked for it. The supplier's relationship situation is open. <!-- Section 8 CASE-6 -->

```text
1.  supplier             -> conversation manager : an email with the bill of materials attached
2.  conversation manager -> conversation manager : understanding the arrival: an invoice from the supplier; it fits the supplier's open situation (a clear match); routing files it there
3.  conversation manager -> situation record     : new version: the document filed, with its date and sender
4.  situation record     -> situation worker     : notice
5.  situation worker     -> situation record     : the document recorded as a claim, with its source — not as an order
6.  (nothing is sent; nothing is ordered)
7.  (later) business owner -> conversation manager : "What's the supplier's latest bill of materials?"
8.  conversation manager -> situation record     : new version: the business owner's question, on the supplier's situation
9.  situation record     -> situation worker     : notice
10. situation worker     -> situation record     : reads the filed document on the supplier's situation
11. situation record     -> situation worker     : the document, with its source and date
12. situation worker     -> situation record     : new version: what should be said — the document's details
13. situation record     -> conversation manager : notice
14. conversation manager -> communication layer  : worth telling the business owner now (the update decision)
15. communication layer  -> communication layer  : send check
16. communication layer  -> business owner       : the document's details, with its source and date — sent through the tool layer
```

<!-- decided by the owner, 2026-10-10; Section 8 CASE-6; E1 -->

## The walk, step by step

- **Starts with:** the supplier's email. <!-- B1 -->
- **Started by:** the supplier.
- **The responsibility:** routing, and understanding what the change adds. <!-- B2; C1 -->
- **Part in charge:** the conversation manager's arrival loop files it; the situation worker's understanding stage reads it, and records it as a claim. <!-- Section 7 writer table: who writes what; PL-11 -->
- **The information:** the document, its date, and its sender.
- **The current state:** the supplier's situation stays as it was. <!-- states: liveness -->
- **What is uncertain:** the document's contents: they are the supplier's claim, not a fact Tend has checked. <!-- E1 -->
- **Who may decide:** understanding the arrival matches the document; routing carries the match out. <!-- decided by the owner, 2026-10-10; PL-6 -->
- **The decision:** file it; do nothing else.
- **The change of state:** none.
- **The success path:** the document is filed where it can be found later.
- **The failure paths:**
  - Nothing matches the sender. The document is filed to no situation, and a person sees it. <!-- decided by the owner, 2026-10-10 -->
- **A person stepping in:** only when nothing matches.
- **The outside system:** email.
- **What it changes next:** the worker records the document as a claim, with its source; nothing outside follows, and the document waits to be found. <!-- decided by the owner, 2026-10-10; Section 8 CASE-6 -->
- **The final state:** unchanged.
- **How it is checked:** the understanding artifact's match against the sender's open situations and records, and routing's check of it; no decision to send exists, so nothing passes the send check. <!-- decided by the owner, 2026-10-10; Section 8: the send check -->
- **Rebuilt afterwards from:** the incoming record and the filed document. <!-- B7 -->

## An event Tend has never seen

A customer may ask something the business has never met. A business process may change. A new outside system may behave differently. A situation may not match any existing way of working. <!-- Level 1: unexpected situations -->

Tend recognises that it does not know how to proceed. It gives the question to a named person, instead of making a decision it cannot support. <!-- Level 1: unexpected situations -->

For example, a customer asks whether the business will engrave a gift, and the business has no rule and no capability for engraving: <!-- J1; Level 1: unexpected situations -->

```text
1.  customer             -> conversation manager : "Can you engrave this?"
2.  conversation manager -> situation record     : new version, on her order
3.  situation record     -> situation worker     : notice
4.  situation worker     -> situation worker     : no rule and no capability covers this; it does not invent an answer
5.  situation worker     -> situation record     : new version: work for a named person — answer the engraving question — and a wait for that answer, in the book of waits
6.  situation record     -> conversation manager : notice
7.  conversation manager -> communication layer  : worth telling that person now (the update decision)
8.  communication layer  -> communication layer  : send check
9.  communication layer  -> that person          : the work item — sent through the tool layer
10. conversation manager -> communication layer  : whether to tell the customer now that a person will reply (the update decision)
11. that person          -> conversation manager : "Yes, we can engrave it."
12. conversation manager -> situation record     : new version: the person's answer, saved as an arrival
13. situation record     -> situation worker     : notice
14. situation worker     -> situation record     : new version: the wait ends; what should be said to the customer
15. situation record     -> conversation manager : notice
16. conversation manager -> communication layer  : worth telling the customer now (the update decision)
17. communication layer  -> communication layer  : send check
18. communication layer  -> customer             : the business's answer — sent through the tool layer
```

Who the named person is comes from the business's own rules for that kind of question. <!-- J1; closed item: who takes an unknown question -->

What the customer hears meanwhile follows the update decision. If the business promised her a reply by a set time, she gets an honest word before it: a person at the business will answer her question. Tend promises nothing the business has not allowed. <!-- closed item: telling the customer about an unknown event; settled page: update before the promised time -->

<!-- J1; decided: the update decision -->

- **Starts with:** the customer's question. <!-- B1 -->
- **Started by:** the customer.
- **The responsibility:** handling what the business has never met. <!-- J1 -->
- **Part in charge:** the situation worker.
- **The information:** the question, and the business's rules and capabilities, which cover nothing like it.
- **The current state:** running.
- **What is uncertain:** whether the business engraves at all.
- **Who may decide:** the named person the business's rules give this kind of question. <!-- J1 -->
- **The decision:** do not invent an answer; give the question to that person, and wait for them.
- **The change of state:** running, to waiting on the named person, to running when the answer arrives.
- **The success path:** the person answers; the customer hears the business's answer.
- **The failure paths:**
  - The person does not answer. Tend names the kind of silence, and the business's escalation path runs ([kind 10](kind_10_person_silent.md)). <!-- J5 -->
- **A person stepping in:** the named person, who decides.
- **The outside system:** none beyond the channels.
- **What it changes next:** the wait in the book of waits; the person's answer, saved as an arrival, wakes the situation. <!-- HC-3 -->
- **The final state:** the conversation manager sets completed once the customer has the answer and no wait is still running. <!-- states: liveness -->
- **How it is checked:** the completion check will not let the situation close while the engraving question has no ending. <!-- IA-23 -->
- **Rebuilt afterwards from:** the incoming record, the worker's version with the work item and the wait, the person's answer, and the sent record. <!-- O7 -->

## Other walks beneath this kind

- **An invoice arrives from a supplier.** It is filed on the supplier's record. No payment is made on the invoice alone. <!-- decided by the owner, 2026-10-10 -->
- **A balance sheet arrives with no request behind it.** It is filed like any other document, and no action is taken on it alone. <!-- decided by the owner, 2026-10-10 -->
- **Later, someone asks Tend to send that balance sheet.** The permission check decides. Where the file needs approval, it answers "a person must approve first". The approval then runs inside the tool. <!-- Section 8: fetching a file; T2 -->

## Open questions, and what is set later

Nothing in this kind is open.
