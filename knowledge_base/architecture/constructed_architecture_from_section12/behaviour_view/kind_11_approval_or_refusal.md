# Kind 11: An action needs approval, or must be refused

This file answers one question: how does Tend behave when a step needs a person's approval first, or is not allowed at all?

In plain words: a step needs a person's approval first, or is not allowed at all.

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

In the common case, the permission check says Allow. Here it says "a person must approve first", or Deny. <!-- T2 -->

Choosing a step and being allowed to run it are separate. Tend may choose a step; the permission check may still refuse it, or ask for approval. <!-- Level 2 decision: automation -->

Two parts behave differently:
- **The tool layer** runs the approval step inside the tool. The AI never calls it, and is not told that approval was needed. <!-- T7; Section 8: fetching a file -->
- **The situation worker** turns a refusal into an honest message, and offers the way to go further. <!-- G4 -->

The refund setting starts at zero. Until the business raises it, every refund needs a person to approve it. <!-- decided by the owner, 2026-10-12: refund setting -->

## Example walk: a refund above the business's refund setting

Meera's refund on order 9912 is 1,500. The business's refund setting is 500. <!-- decided by the owner, 2026-10-12: refund setting -->

```text
1.  situation worker     -> tool layer           : refund 1,500 on order 9912
2.  tool layer           -> tool layer           : permission check: above the refund setting, a person must approve first
3.  tool layer           -> approval step        : the exact refund: order 9912, 1,500, to Meera
4.  approval step        -> communication layer  : the request, to the named approver, Kabir
5.  communication layer  -> communication layer  : send check
6.  communication layer  -> Kabir                : "Approve a refund of 1,500 on order 9912?", with a link to sign in — sent through the tool layer to his bound WhatsApp
7.  Kabir                -> sign-in provider     : signs in (a fresh sign-in, within the last 15 minutes)
8.  Kabir                -> conversation manager : "yes", with the proof of sign-in
9.  conversation manager -> situation record     : new version: Kabir's answer, saved as an arrival
10. situation record     -> situation worker     : notice
11. situation worker     -> tool layer           : the answer, as the waiting approval step's result
12. tool layer           -> tool layer           : reads Kabir's live membership, roles, and grants; permission checked again, just before acting
13. tool layer           -> audit                : the approval: Kabir, his sign-in identity, when he signed in, and the exact refund approved
14. (the refund then runs, as any approved refund does; if the payment provider never answers, see kind 1)
```

<!-- T2; T7; Section 8: the approval step; decided 2026-10-22: identity and permission; settled 2026-10-22: fresh sign-in; closed item: approval answer route; AC-3 -->

If Kabir had only typed "approve the refund" on his bound WhatsApp, without signing in, his words would be recorded as a claim — "came through the WhatsApp bound to Kabir; person not verified" — and nothing would be approved. <!-- decided 2026-10-22: identity and permission -->

## The walk, step by step

- **Starts with:** the worker's decision to refund. <!-- F1 -->
- **Started by:** the situation worker.
- **The responsibility:** making sure each step is allowed. <!-- T2 -->
- **Part in charge:** the tool layer, with its approval step. <!-- T7 -->
- **The information:** the refund amount, the business's refund setting, and the grant. <!-- T3 -->
- **The current state:** running, then waiting on the approver.
- **What is uncertain:** whether the approver will say yes.
- **Who may decide:** the named approver, a member of the business freshly signed in, for this exact request. <!-- G2; decided 2026-10-22: identity and permission -->
- **The decision:** wait for the approver; check again before acting. <!-- AC-3 -->
- **The change of state:** running to waiting, and back.
- **The success path:** the approver says yes; the refund runs.
- **The failure paths:**
  - The approver says no. Only this request ends; the situation goes on. The worker then chooses one of three steps: escalate, ask another approver, or write an honest answer for Meera, within what she may be told. <!-- AC-3; G4; Section 8: the approval step -->
  - The approval times out. The tool returns "the approval request failed", and the situation goes to the escalation path. <!-- Section 8: the approval step -->
  - No approver can be found under the grant. The work waits, and the situation escalates. The wait is shown, not hidden. <!-- Section 6 additions: no approver -->
  - The situation changes while the approval is pending. The approval is not used; it is asked again. <!-- Section 11 decision 6: approval asked again -->
- **A person stepping in:** the approver.
- **The outside system:** the payment provider, once approved.
- **What it changes next:** the work item for the approver. The approver's answer is an arrival: the conversation manager saves it, as it saves every person's answer, and its notice wakes the worker. The worker hands it to the waiting approval step as that step's result, and the tool checks again before it acts. A time-out comes back to the tool as its result in the same way. <!-- AC-3; closed item: approval answer route -->
- **The final state:** the refund runs, or this request ends and the situation goes on.
- **How it is checked:** the permission check; the approval inside the tool; the permission checked again just before the step runs. The situation cannot close while an approval request is open. <!-- T2; T7; AC-3; IA-23 -->
- **Rebuilt afterwards from:** the permission check's answer, the exact request shown to the approver, the answer with who approved and how they were proved, and the second check. <!-- O7; decided 2026-10-22: identity and permission -->

When Tend refuses, it refuses honestly. It says what is not allowed, and why. Tend never offers a way around the rule. <!-- G4; Level 2 refusal: shape; Section 6 additions: no override offered -->

There are two kinds of refusal: <!-- Level 2 refusal: two kinds -->
- **Outside the grant**, for example a refund above the refund setting. Someone could allow it. Tend names who, and offers to raise it with them, or with the configurator.
- **Against a rule no setting can break.** Nobody can allow it, so there is no one to ask for approval. The only path is a change to the product.

A refusal travels like this: <!-- Level 2 refusal: two kinds; Section 8: communicate -->

```text
1.  tool layer           -> tool layer           : permission check says Deny
2.  tool layer           -> situation worker     : the refusal, with its reason
3.  situation worker     -> situation record     : new version: what should be said — what is not allowed, why, and, if someone could allow it, who
4.  situation record     -> conversation manager : notice
5.  conversation manager -> communication layer  : worth telling the person now (the update decision)
6.  communication layer  -> communication layer  : send check
7.  communication layer  -> the person           : the honest refusal — sent through the tool layer
```

- **How it is checked:** the permission check; the send check before the refusal goes out. <!-- T2; Section 8: the send check -->
- **Rebuilt afterwards from:** the permission check's answer and reason, the worker's version, and the sent record. <!-- O7 -->

An approval covers one request, and is used once. It lapses when the situation changes, or when the business's deadline for that kind of approval passes. It can pass to another person only where a grant allows it. <!-- Section 11 decision 6: approval asked again; accepted call: one approval, one request -->

## Other walks beneath this kind

- **A customer asks for this year's balance sheet.** The AI calls the one fetch tool. Inside the tool, fixed code sees that the file needs approval and asks the approver. If the approver says no, the tool returns "this person did not approve this request", and Tend tells the customer honestly. The AI never decides whether the file is released. <!-- Section 8: fetching a file -->
- **An employee asks Tend to send a confidential file to someone outside.** The tool's own check refuses first. Tend tells the employee it is not allowed, and offers to raise it with the person who holds that authority. <!-- Level 2 authority: confidential send -->
- **An investor asks for revenue and a deck.** Each disclosure to an investor needs a named person's approval ([kind 3](kind_03_partial_answer.md)). <!-- accepted call: investor and regulator -->
- **A read that would reveal protected information.** It passes the permission check like any step. Where no grant covers that disclosure, a person must approve first. <!-- owner item 83: disclosing read -->
- **Kabir has left the business.** The configurator removed his membership this morning. His approval this afternoon fails at the permission check, because his membership has ended; the request goes to the next approver only if a grant allows it; otherwise it goes to the escalation path. <!-- decided 2026-10-22: identity and permission; Level 2 compliance: leavers -->
- **A clerk tries to change what the business allows.** The step is refused; only the configurator's fixed tools write grants. <!-- G7 -->

## Open questions, and what is set later

Nothing in this kind is open.
