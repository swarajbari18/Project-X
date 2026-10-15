# Section 10: checking the architecture against its sources

This section checks the architecture against the sources it came from.

It finds where the sources disagree, where something is missing, and where a statement has no source.

Then it records what is decided, what is open, and what each open item needs.

---

## Result in brief

- The first check is complete. The concluding audit of 2026-10-12 found more items. Each one has a status.
- Section 11 is closed. The verdict is Stabilized, as of 2026-10-12. The two Level 2 sentences that conflicted were changed that day, with your approval.
- The audit retention period is not in the research folder. Level 2 says the per-market legal values are enumerated when a market is entered, so the period is set for each market at entry. I did not invent a number.
- Your Level 2 edits of 2026-10-09 are confirmed. They are now part of the communication rules in Section 8.
- Some Level 2 lines still say the opposite of decisions made here. You change those lines. The list is near the end.
- Sections 6 to 9 were edited to match the decided items, the settled naming, and the concluding audit of 2026-10-12.

---

## Words used in this section

- **Conversation manager.** The whole system that reacts when something happens, such as a new message, a change in a situation, or a time signal. It then sends messages to people. It contains the parts named below. Tools are not part of it.
- **Situation worker.** The part that works out the next step for one situation. It writes its conclusions to the situation record. It never sends a message.
- **Intake step.** The part that receives a new message and decides which situation it belongs to. Level 2 calls this routing.
- **Communication layer.** The part that sends each message and records what it sent.
- **Tool layer.** The separate part that calls outside systems. A tool runs in its own context. Its results come back to the conversation manager.
- **Situation record.** The saved state of one situation. Level 2 calls it the situation model.
- **Update decision.** The conversation manager's choice to tell a person about a change, or to stay quiet. It asks one question: is this worth telling the person?
- **Status-check service.** A separate service that repeats a status check when a tool's own checks have not returned an answer. It sends each result back to the situation as a message.
- **Owner view.** The screen the owner reads. It shows what Tend derived from the situation records. It changes nothing.
- **Level 2.** The rules folder. Level 2 is the standard.

---

## How to read the statuses

- **Decided by you.** You approved it. The reply is named.
- **Settled by Level 2.** Level 2 says it. The Level 2 file is named.
- **Recorded earlier.** The construction record says you decided it in an earlier session. I could not find the message in this session. Please confirm these.
- **Architecture rule.** No source states it. The architecture adds it, and the reason is given.
- **Open.** No answer exists yet. The recommendation applies until you change it.

---

## Source order

Level 2 is the standard. Where Level 2 says nothing, the Product Vision, the research folder and the agent harness study apply.

Where two sources disagree, both are written down. The one that governs is named. Nothing is chosen silently.

*Decided by you, in your reply to the plan.*

---

## Decisions in force

Each decision gives what was decided, its source, and its status.

### Decided by you

1. **Source order.** As above.
   *Decided by you, in your reply to the plan.*

2. **Evidence record.** Each item keeps a short record. The record holds the statement, its source, who said it, its status, and the section it changes. The full evidence structure from the method is not built.
   *Decided by you, in your reply to the plan.*

3. **Refund setting.** Each business has one amount, called the refund setting. The configurator can change it. A refund at or below the setting goes through with no person. A refund above it needs a person to approve it. The default is zero, so every refund needs a person until the business changes the setting. The setting is read when a refund is attempted.
   *Decided by you, in your message about refunds.*

4. **Closing and reopening.** A closed situation stays closed.
   It is reopened only when its closure was wrong. That means the same operational problem was resolved too early, or it has come back. The original situation is reopened, and the reason is recorded.
   Any other new problem is a new situation, linked to the closed one.
   A closed situation is looked at only when a message refers to it.
   There is no time limit. Level 2 gives a return after six months as an example of a wrong closure.
   *Decided by you, in your reply approving this wording. Source: Level 2, coordination folder, the file "how do we recover interrupted work", section "Reopen versus new situation". Level 2, understanding folder, the file on telling whether messages belong to the same situation, the section on reopening.*

5. **"Reopened" is a mark on the same record.** It is not a new record.
   *Decided by you, in your reply to the plan.*

6. **Customer stages.** A new contact starts as unknown.
   It becomes a prospect when the business opens a sales situation for it, or when the evidence shows a possible buying relationship.
   It becomes a customer after a paid order. It becomes a returning customer after a later purchase.
   A lead is an entry point, not a stage.
   Investors, suppliers, landlords and regulators are situations with a label that says how they relate to the business. They are not stages.
   *Decided by you, in your explanation of customers and in your reply approving the recommendation. Source: Level 2, journey and lifecycle folder, the file on prospects, customers and returning customers.*

7. **Status checks.** Inside one tool, a bounded number of status checks is allowed.
   Repeated checks run in the separate status-check service.
   Level 2 forbids outside checks on a fixed interval. Whether other recurring checks exist is open (see the open list).
   The working bound is five. A discussion note gave five as an example. The exact number is open, and it does not block the design.
   *Decided by you, in your reply approving the Section 8 approach, and in your reply to the plan. Source: Level 2, time folder, the time conversation notes, line 106. Level 2, failure folder: the bound is an open question, with five as the example.*

8. **Platform rule changes.** A change to a platform rule re-checks the open situations. A change to the business's own settings does not.
   *Decided by you, in your reply approving the recommendations. Source: Level 2, growth folder, the file on evolving Tend without breaking existing businesses, item 2: platform rules are live and interrupt.*

9. **Conflicts.** A conflict stops only the action it affects. It does not stop other work. When it can, Tend takes a safe bounded step.
   *Decided by you, in your reply approving the recommendations. Source: Level 2, trust and evidence folder, the file on when conflicts stop the workflow, sections "A conflict does not stop everything automatically" and "Stopping is action-specific".*

10. **A message with two problems.** It creates two situations at once. It is not held.
    *Decided by you, in your reply approving the recommendations. Source: Level 2, journey and lifecycle folder, the file on splitting a conversation: one message with two distinct asks creates two situations straight away.*

11. **A request with no source.** Only that request stops. Other requests in the same run continue.
    *Decided by you, in your reply approving the recommendations. Level 2 does not say this. Your approval settles it.*

12. **Default permissions for a new business.**
    - Reading connected systems is allowed. Reading never sends anything outside on its own.
    - Replies inside an open conversation are allowed.
    - A person approves each time these actions happen: changing a record that a business system owns; starting a conversation outside an existing grant; making a promise or a commitment; spending money; showing protected information to someone outside the business.
    *Decided by you, in your reply approving the recommendations. The reply adds Level 2's rule that replies inside an open conversation are allowed. Source: Level 2, permissions folder, the file on what Tend comes with by default. Level 2 calls this a configuration default, not a product rule.*

13. **Configurator's power.** The configurator may not hand its power to anyone until Level 2 settles it.
    *Decided by you, in your reply to the plan. Level 2 leaves it open.*

14. **Update decision name.** The conversation manager's choice to tell or stay quiet is called the update decision.
    *Decided by you, in your reply to the plan.*

15. **Proposal limits.** The limits on how many steps, calls and how much cost one run may use are set by the business, with product defaults. The numbers come later.
    *Decided by you, in your reply to the plan.*

16. **Owner view.** The owner view is built when the owner asks for it. It is not refreshed in batches. It shows when it was last updated. How long it may lag when a system is down has no number yet. Level 2 sets no limit.
    *Decided by you, in your reply to the plan.*

17. **Who sees what.** Each consumer of owner data gets only the fields on its own list. The default is nothing.
    *Decided by you, in your reply to the plan.*

18. **Payment replies.** If a payment reply answers an open tracking question, the completion check must catch it.
    *Decided by you, in your reply to the plan.*

19. **The owner hears in three cases.** A meaningful change that alters the business's next decision can also reach the owner at once.
    - A decision only the owner can make.
    - A deadline or notice that puts the business at risk.
    - An escalation that has passed the people the owner assigned.
    Routine progress stays on the owner's view.
    *Settled by Level 2, business view folder, the file on what should require the owner's attention. Its short answer names three classes. A later note in the same file adds the immediate route for a meaningful change.*

20. **Conversation manager.** It is the whole system that reacts to a pattern and sends messages. Its parts are the intake step, the situation worker, and the communication layer. Tools are a different context. They are not part of it.
    *Decided by you, in your message correcting my earlier definition. The naming of the parts is confirmed in the open decisions.*

### Settled by Level 2

21. **Facts in an outgoing message come from a tool result from the same turn.** A fact such as an order number, a tracking number, or a price is never written from the AI's own memory.
    *Level 2, compliance and security folder, the file on making a software product secure, item 11.*

22. **An unconfirmed outcome is checked, not guessed.** An irreversible action whose outcome is unknown is not repeated automatically. A send whose outcome is unknown is not sent again, unless the other side honours the same request key.
    *Level 2, failure folder, the file on avoiding repeated failed actions, line 26; the failure conversation notes, line 52.*

23. **A service that is down for a long time is not called again at once.** The tool stops calling it, and checks again later. This is a circuit breaker.
    *Level 2, failure folder, the file on avoiding repeated failed actions, section 3.*

24. **An interim message is sent when a promised response time will be missed.** The customer is told before the deadline passes.
    *Level 2, failure folder, the file on which failures can safely wait.*

25. **Email is the fallback lane.** When the preferred channel is not available, email is used to reach a person.
    *Level 2, channels and permissions folder, the channel description and the channel conversation notes.*

26. **A conversation is started by a template only with consent.** An approved template is used.
    *Level 2, compliance and security folder, the file on what each actor and tech stack must comply with, line 42.*

27. **A granted right must be valid when it is used.** A revoked grant stops at once. Tend never acts on a permission that is no longer valid.
    *Level 2, growth folder, the file on evolving Tend without breaking existing businesses, item 3.*

28. **Business policies are fixed when a situation opens.** A change to a policy is noticed, and the owner is shown the affected situations.
    *Level 2, growth folder, the same file, item 4.*

29. **A business policy has its own life.** It goes from draft, to validation, to activation, to a new version, to being replaced or expiring, to retirement.
    *Level 2, growth folder, the file on how new business policies become part of Tend.*

30. **Five kinds of unexpected behaviour are recognised.** Section 8 checks for them.
    *Level 2, explainability folder, the conversation notes, item 7.*

31. **The administrator's view includes the audit trail.** The administrator is the person the owner assigned to set up the business. The administrator also sees grants, approval history, business configuration, and masked traces on demand.
    *Level 2, explainability folder, the file on what information should only be visible to administrators.*

32. **Approval goes to the approver through the tool.** The request travels as a message through the communication layer.
    *Level 2, permissions folder, the file on when Tend must ask for approval, lines 1–8 and 25.*

33. **Approval is asked for only when the grant requires it, or when an action falls outside every grant.** Tend never guesses whether approval is needed. The tool reads the configuration.
    *Level 2, permissions folder, the same file, lines 12–21 and 33.*

34. **Commitments are not in the default range.** Each commitment needs approval.
    *Level 2, permissions folder, the file on what Tend comes with by default, line 35.*

35. **No business sees another business's data.** This is the principle. There is no free plan, so this question is closed.
    *Level 2, compliance and security folder, the file on making a software product secure, line 87.*

36. **Personal data never goes into traces.**
    *Level 2, compliance and security folder, the file on making a software product secure, line 238.*

37. **A skipped test counts as a failed test suite.** The two security test suites must pass on every release.
    *Level 2, compliance and security folder, the file on making a software product secure, lines 146–147.*

38. **Identity comes from an identity provider.** Tend relies on the provider to say who a person is.
    *Level 2, compliance and security folder, the notes on identity providers.*

39. **Outside people hear about the situation, not the tools.** No list of tools goes to a customer.
    *Recorded in Section 8. Level 2 communication supports it (line 39).*

40. **Business documents are not covered by Level 2 (open).** Level 2 has no rule for a document that arrives without being asked for. It is an open item below.

### Recorded earlier, to confirm

These are in the construction record as decided by you in an earlier session. I did not find the messages in this session. They are not confirmed in writing (construction record, entry 17, and the 2026-10-12 audit). They stay tagged to confirm.

41. Prompts with personal data are masked in production. The simulation environment shows everything.
42. The owner sees their own customers' data unmasked. Masking applies to the builder and admin views.
43. Every admin read of the audit trail is logged.
44. A non-admin owner has no access to the audit trail by default.
45. Tenant data is not used to train AI systems without the business owner's written permission. Level 2 sets the default as no.
46. Memory watches the configurator's setup sessions and suggests candidates. The configurator approves them.
47. A write that has no record is retried. No separate checker exists.
48. Withdrawing consent stops every future message to that person.

### Architecture rules

No source states these. Each one has a reason.

49. **The conversation manager sends. The communication layer is the part that sends and records.** Reason: your definition of the conversation manager. The naming is open below.
50. **The situation worker never sends.** It records its conclusions and the intent to say something. Reason: Level 2 states it. Swaraj ruled that the worker never communicates directly, and that all communication goes through the communication layer (Level 2, when should Tend communicate, opening lines). The harness study records the same ruling.
51. **The duplicate check runs before the intent is recorded.** Reason: a check that runs after the intent is written would find the intent it just wrote.
52. **The conversation manager writes the first version of a new situation from what came in.** Reason: the principle that what comes in is written by the conversation manager. The harness study gives the first version to the situation worker, owner item 26, agreed 2026-10-12: the conversation manager writes the first version.
53. **If the grant store cannot be read, the action is denied and the work is shown as held.** Reason: the Product Vision says that when Tend cannot act safely, it should create human work, wait, or stop visibly.
54. **An approval is never used after the situation has changed.** It must be asked again. Reason: decision 27.
55. **The owner view writes nothing.** It is derived from the situation records.
56. **A name or a phone number alone grants no permission.** Reason: the join between a verified person and what that person may do is open (gap 10).

---

### Approved in your reply of 2026-10-10

Your reply "yes" approved the recommendations in my last message. The rules below were the open ones.

57. **A permission belongs to a verified person.** A name or a phone number alone grants no permission. Level 2 leaves this open. Level 2 needs the rule added (yours).
58. **Business documents from outside.** A document that arrives unasked is matched to the situation for that sender, or to the sender's record, and filed there. If nothing matches, a person sees it. No action is taken on it alone. Level 2 has no rule. Level 2 needs the rule added (yours).
59. **Every business gets its own store.** There is no free plan. Level 2 had accepted a shared store for free accounts. That sentence was changed on 2026-10-12.
60. **Working decisions.** The refund setting is read when a refund is attempted. The conversation manager's parts are the intake step, the situation worker, and the communication layer. Tools are outside it. The communication layer sends. An owner who also sets up the business sees the audit trail. Level 2's administrator file settles this. Five is the working bound for status checks.
61. **The other recommendations in this section.** The proposed rules in the gap register are approved as proposed. Rows marked "no source found" stay marked that way.
62. **Communication, from your Level 2 edits.** The conversation manager decides whether an update is worth telling the person. A receipt-only reply to an outside party is out of scope by default. The communication layer expresses each material change to each party who must see it. A pass that commits no change sends nothing outside. A stakeholder may have a configured update when something arrives, such as a tax notice with its deadline. That is configuration, not the default. Level 2 holds this rule, and the architecture follows it.

## Conflicts

Each row is a place where two statements cannot both be true.

| # | What conflicts | Working reading | Status | Severity |
|---|---|---|---|---|
| 1 | Level 2 says a refund never runs without a human step-up (security file, line 180). It also says moving money without a human is a failure (security audit file, line 136). Your refund setting lets a small refund go through with no person. | Your refund setting governs. The default keeps a person on every refund. | Decided by you. The Level 2 wording must change. Yours to change. | Critical |
| 2 | Four Level 2 summary lines, and one line in the agent harness study, say a closed situation is never reopened. The detailed Level 2 text allows one exception. | The approved rule in decision 4. | Decided by you. Those lines must change. Yours to change. | Moderate |
| 3 | Level 2 pins business policies when a situation opens. You described the refund setting as read when a refund is attempted. | Keep your description. Treat the refund setting as an exception to pinning. | Decided by you (reply of 2026-10-10). | Major |
| 4 | Section 8 gives sending to the communication layer and deciding to the conversation manager. Your definition gives sending to the conversation manager. | The conversation manager sends. The communication layer sends and records inside it. | Settled by Level 2's communication files, which you edited on 2026-10-09. | Major |
| 5 | Your definition puts the whole system, except tools, inside the conversation manager. Section 7 lists the situation worker as a separate part. | The worker, intake step and communication layer are parts inside the conversation manager. Tools are outside it. | Decided by you (reply of 2026-10-10). | Major |
| 6 | Section 8 says the worker never sends, and also says it may send a final message. | The worker never sends. The conversation manager decides whether to tell, and the communication layer sends. | Architecture rule 50. Section 8 edited. | Major |
| 7 | Section 8 retries a send inside the tool layer, with no check on an unknown outcome. Level 2 checks an unknown outcome first, and never repeats an irreversible unknown. | Level 2. | Settled by Level 2. Section 8 edited. | Critical |
| 8 | Section 6 limits all work to one bounded step while any conflict is open. | Stops are action-specific (decision 9). | Decided by you. Section 6 edited. | Major |
| 9 | Section 8 holds a message when several situations match. | Two situations (decision 10). | Decided by you. Section 8 edited. | Moderate |
| 10 | Section 6 says a platform rule change interrupts open situations. Section 8 says a configuration change does not re-check them. | Both, stated together (decision 8). | Decided by you. Wording aligned. | Moderate |
| 11 | Section 8 stops the whole run when one request has no source. | Only that request stops (decision 11). | Decided by you. Section 8 edited. | Moderate |
| 12 | Section 6 says Tend never checks status. Section 8 allows a bounded number of checks inside a tool. | Decision 7. The number stays open. | Decided by you. Section 6 edited. | Major |
| 13 | Section 6 lists lead, prospect and customer. Level 2 says three stages, plus an unknown start. | Decision 6. | Decided by you. Section 6 edited. The Level 2 journey wording must change. Yours to change. | Moderate |
| 14 | The Product Vision says a new person starts as a prospect (its text on returning customers, line 413). Level 2 says a new contact starts as unknown. | Level 2 governs. | Settled by source order. The Product Vision wording must change. Yours to change. | Moderate |
| 15 | Level 2's short answer names three classes. A later note in the same file also lets a meaningful change that alters the business's next decision reach the owner at once. | Both stand. The note adds the immediate route (decision 19). | Settled by Level 2's note. Level 2's short answer should say so. Yours to change. | Moderate |
| 16 | Section 7 lists revenue at risk, stuck orders, at-risk customers and deadlines for the owner. Level 2 lists situations solved, impact, and money saved. | Level 2's list. | Settled by Level 2. Section 7 edited. | Moderate |
| 17 | Section 8 refreshes the owner view after each saved change. | On request (decision 16). | Decided by you. Section 8 edited. | Moderate |
| 18 | Level 2 gives the audit trail to the administrator. A solo owner is often also the configurator. The recorded default says a non-admin owner has no access. | A configuring owner sees the audit trail as the administrator. A non-configuring owner does not. | Decided by you (reply of 2026-10-10). | Major |
| 19 | Section 8 records the intent first, and checks for a duplicate second. | Check first, then record (rule 51). | Architecture rule. Section 8 edited. | Moderate |
| 20 | Section 6 gives business policies the feature lifecycle. Level 2 gives business policies their own lifecycle. | Two lifecycles: one for product features (Section 6), one for business policies (Level 2). | Settled by Level 2. Section 6 edited. | Moderate |
| 21 | Level 2 accepts one shared store for free accounts. Its principle says no business sees another's data. | Separate stores, as you decided. Level 2's shared-store exception was changed on 2026-10-12. | Decided by you (reply of 2026-10-10). | Critical |
| 22 | Level 2 says history is never erased, and that deletion must be possible. Level 2 says the per-market legal values, including deletion windows, are enumerated when a market is entered. The agent harness study says audit records are kept seven years, with no source. The research folder has no audit retention period. | Deletion removes personal data. The audit keeps a reference. The period is set for each market when that market is entered, and a market is not entered until its values are set. | Settled as a process. The number is deferred to market entry. Not blocking. | Major |
| 23 | Level 2 says personal data never goes into traces. Section 8's trace design may record tool arguments. | Traces keep references, not personal data. | Settled by Level 2. A trace rule added to Section 8. | Major |
| 24 | The agent harness study keeps training data forever, aggregated across businesses. Level 2 says the builder never uses tenant data to train AI systems by default. | No shared training without the business's written permission (recorded earlier). | Settled by Level 2 and the recorded rule. Section 8 edited. | Major |
| 25 | Section 8 said Level 2 was changed at your direction on 2026-10-09 to match. I could not confirm that in the session. | You confirmed that you made the Level 2 changes. The sentence now says so. | Settled by your confirmation. | Minor |
| 26 | The construction record says the harness line was superseded "as Swaraj directed". It also lists a 50-hop cap. I found no such direction in your messages, and no Level 2 source for the cap. | Replaced with the source order. The cap is removed. | Settled. Corrected in a new entry in the construction record. | Minor |
| 27 | The construction record says a solo owner sees what the admin sees. | Superseded by conflict 18. | Settled. Corrected in a new entry in the construction record. | Minor |
| 28 | The end state is called "completed", "closed" and "resolved". The owner screen is called "owner view" and "business view". | "Completed" is the state name. "Resolved" is the reason a situation became completed. "Owner view" is the screen. "Business view" is Level 2's category name. | Settled. Naming applied. | Minor |
| 29 | "Settle window" was used for two things: the outside party's promise, and Tend's own bound. A report also named a broken index reference and a wrong owner-alert reference in Section 6. I did not find either reference in this session. | Settled: "promised settle window" is the outside party's promise, which is Level 2's term. "Internal settle window" is Tend's own bound. Applied in Sections 6, 7 and 8. | Settled. Naming applied. | Minor |

Two reported conflicts did not hold up, so they are not on this list.
- A report said the research folder says Tend never commits within its range. I did not find that sentence. Level 2 keeps commitments outside the default range.
- A report said the Product Vision requires complete understanding before a decision. The Product Vision does not say that. It says a decision waits until there is enough information for the next safe step.

---

## Gaps

Each row is a rule the architecture does not state yet, or states without support.

| # | What is missing | What the sources say | Proposed rule | Status | Severity |
|---|---|---|---|---|---|
| 1 | A fact in an outgoing message has no required source. | Level 2: it must come from a tool result from the same turn (owner item 21). | Add to the send step in Section 8. | Settled by Level 2. Added. | Critical |
| 2 | A send or irreversible call with an unknown outcome has no check first. | Level 2: check first, never guess (decision 22). | Add to Section 8. | Settled by Level 2. Added. | Critical |
| 3 | A service that stays down has no stop rule. | Level 2: circuit breaker, then a later check (decision 23). | Add to Sections 6 and 8. | Settled by Level 2. Added. | Major |
| 4 | A promised response time that will be missed has no interim message. | Level 2: interim message (decision 24). | Add to Section 8. | Settled by Level 2. Added. | Major |
| 5 | An approval has no rule for showing its exact content, or for expiry. | Level 2 says a stale right is never used (decision 27). It does not state the exact-content rule. | Exact content is shown to the approver. Expiry follows rule 54. | Expiry settled by Level 2. Exact content is an architecture rule. | Major |
| 6 | A new business has no default permissions in Section 6. | Level 2 has a default set. Your reply approves it (decision 12). | Add to Section 6. | Decided by you. Added. | Major |
| 7 | An owner's one-time instruction has no rule for the permission it creates. | Level 2: a clear instruction from the owner can create a one-time grant. | Add to Section 6. The grant lasts for that instruction only. | Settled by Level 2. Added. | Major |
| 8 | Visibility has no rule for role or partner limits. | Level 2 channels: visibility follows role and partner scope, within the legal floor. Anything outside is refused. | Add to Section 6. | Settled by Level 2. Added. | Major |
| 9 | A permission has no start, end or history. | Level 2: a grant must be valid at use, and a revoked grant stops at once. | Add to Section 6: a permission has a start and an end. Any past holder can be traced. | Partly settled by Level 2. Added. | Major |
| 10 | The join between a verified person and what that person may do is not written in Level 2. | Level 2 leaves it open (the permissions folder, conversation notes, on joining identity, roles, and what a role may do). | A permission belongs to a verified person. A name or a phone number alone grants nothing. | Decided by you (reply of 2026-10-10). Written into Section 6 and the settled-items page. Level 2 needs the rule added (yours). | Critical |
| 11 | No rule covers business documents that arrive from outside, such as a supplier's bill of materials, an invoice, or a balance sheet request. | No rule in Level 2. Invoices appear only as data sources. | The document is matched to the situation for that sender, or to the sender's record, and filed there. If nothing matches, a person sees it. No action is taken on it alone. | Decided by you (reply of 2026-10-10). Written into Section 8 (new walkthrough CASE-6) and the settled-items page. Level 2 needs the rule added (yours). | Critical |
| 12 | Meeting rules are partly written. | Level 2 gives intent over confirmation, and counts failed meetings per situation and per person. The person-level count escalates to a senior person with the full report. | The routine and decision split is a proposal. | Settled by Level 2 for the parts it states. Written into Section 6. Your reply approved the proposal. | Moderate |
| 13 | Asking a person has no test. | Level 2 gathering notes: gather only what could change the next safe step. | Tend asks a person for information only when the answer could change that step. | Settled by Level 2. Written into Section 6. | Moderate |
| 14 | Learned items need a test before they are kept, and a way back. | Level 2 uses replay and regression as the test, and replay cases from experience. It does not state a reversal rule or a blocking test. | A lesson that blocks valid work is not an improvement. Harmful lessons are reversed. | Partly settled by Level 2. The reversal and blocking rules are architecture rules. Written into Section 6. | Moderate |
| 15 | Learned items: identity, and what learning may never change. | Level 2 says similarity only generates candidates, and never sets identity, supersession, or truth. Level 2 lists what learning may never change. | The similarity rule is written into Section 6. The full list of what learning may never change is still to write. | Partly settled by Level 2. | Major |
| 16 | Policy conflicts and fallbacks have no order. | Level 2 pins policies and requires a notice. It gives no order for conflicts or fallbacks. | The active policy; then the business's fallback; then the product's safe default; then a person or a stop. Any fallback use is shown to the business. | Architecture rule, approved in your reply. Written into Section 6. Level 2 does not state it. | Major |
| 17 | Failure triage has no order in Section 6. | Level 2 failure notes, triage item: first who is responsible, then the consequence, then the severity tier, then the promise at risk. | Written into Section 6 in that order. | Settled by Level 2. Written. | Moderate |
| 18 | Section 8's probes are not mapped to the five kinds of unexpected behaviour that Level 2 names. | Level 2 names five kinds. | Name the five in Section 8, and map each probe to one kind. | Five named in Section 8. The mapping is open. | Moderate |
| 19 | Starting a message has no order. | Level 2: approved template with consent, then the email fallback. | Add to Section 8. | Settled by Level 2. Added. | Moderate |
| 20 | Deletion and export have no rule for every copy of the data. | Level 2 security notes: after a tenant is deleted, no files, keys, vectors or prompt logs for it remain anywhere. Level 2's customer rights line says deletion and export must be possible (compliance file, line 57). | Deletion rule written into Section 6. | Settled by Level 2 for deletion. Export: Level 2 requires the right. The window and the form are open. | Major |
| 21 | Data residency by market, and partner data sharing, have no rule. | Level 2 lists residency as a privacy area. Its per-market values are still open. No Level 2 rule for partner data under a signed agreement was found. | Written into Section 6: data residency varies by market, and the values are not yet set. | Partly settled by Level 2. Partner sharing: no source found. | Moderate |
| 22 | The owner timeline and the builder's full graph have no rule. | No Level 2 text found for either. | Keep open. | Open. No source found. | Minor |
| 23 | Operational alerts have no full list in Section 8. | Level 2 security notes name them: spikes in tool denials, in outbound send volume, and in cost; cross-business access errors; outbound traffic outside the approved subprocessor list. | Written into Section 8. | Settled by Level 2. Written. | Moderate |
| 24 | Scope limits are not written in Section 6. | Level 1, out-of-scope section: pricing, hiring, financial decisions, and company policies remain outside Tend's scope. | Written into Section 6. | Settled by Level 1. Written. | Moderate |
| 25 | A subscription's effect on which updates reach the owner has no confirmed rule. | Level 2 uses subscription for the wait registry, and gives no rule for owner updates. | Keep provisional. | Provisional. No Level 2 source. | Minor |

Gaps 17 and 20 to 25 came from the checks. In this pass I checked each one against the Level 2 text. Where no source exists, the row says so.

---

## Items from Section 9

Section 9 listed findings from its dimension tests. Each one now has a status.

| Finding | What it is about | Status |
|---|---|---|
| 1 to 4 | Names of rule groups and their references in Sections 6 to 8 | Resolved in Section 9. The names are resolved. Some codes still appear in tables. Clearing them is an open item. |
| 5 | Duplicate and unknown message delivery, and safe resending | Settled by Level 2 (gaps 2 and 4). The exact method for each outside service is open. |
| 6 | A refund with an unknown outcome, and a waiting customer | Settled by Level 2 (gaps 2 and 4). |
| 7 | Platform rule changes and business setting changes | Decided by you (decision 8). Pinned policies follow Level 2 (decision 28). |
| 8 | Wording of the rule context | Architecture wording. Sections 6 and 8 edited. |
| 9 | Traces, redaction, deletion and learning | Open. Conflicts 22 and 23 cover it. The retention period is open. |
| 10 | Stored claims that may be out of date | Partly settled. Level 2 says the latest information is always read. The age limit is open. |
| 11 | One change that touches several linked situations | Architectural unknown. Each situation saves on its own. It stays visible. |
| 12 | Substitute checks for transferred work before an irreversible action | Section 8 must use the scope set in Section 6. Edited. |
| 13 | Meeting counters and the senior route | Partly settled (gap 12). |
| 14 | Visibility limits from channel rules | Settled by Level 2 (gap 8). |
| 15 | The fallback lane | Level 2 says the email lane is never blocked. Consent and address rules still apply. An email to start contact needs consent and an unsubscribe route (Level 2 channel-choice file). |
| 16 | The configurator and the product team's capability authoring | Different roles. Open wording: Sections 7 and 8 still merge them. |
| 17 | The external recipient list, and how the owner view is derived | The derivation is decided (decision 16). The recipient list is open, and it does not block the design. |

## Open items from Sections 6 to 8

| Open item | Status |
|---|---|
| The full list of closing outcomes | Not blocking. The business may add outcomes. |
| How a prospect becomes a customer | Settled by Level 2: a paid order is the marker. The rule for supplied leads is business configuration. |
| Which updates reach the owner | Decided: three cases (decision 19). |
| Who writes each kind of record | Architecture rule (Section 7): the conversation manager writes what comes in, the situation worker writes conclusions, the communication layer records what it sent, and memory proposes and writes no fact. Not blocking. |
| Whether a number-based scoring of options is needed | Deferred to the technical design. |
| How a person's journey joins their situations | Settled by Level 2: the journey is derived from the situations, not stored separately. |
| The exact rule for merging learned items | Partly decided: similarity never sets identity. Not blocking. |
| Whether prompt templates and stage rules are versioned separately | Not blocking. Decide when the prompts are built. |
| The rules for the policy check, and the tenant context fields | Deferred to the technical design. |
| The index of rules that join waits and calls | Broken reference. Fixed (conflict 29). |
| When a lesson counts as a new kind of lesson | Not blocking. No Level 2 rule defines it. It is recorded as an open item. |
| Who checks that every record is complete | Decided: no separate checker. A write without its record is retried (rule 47, recorded earlier). |
| Owner alert set-up | Not blocking. The three cases are fixed. The business chooses how alerts are delivered. |
| Settle window numbers | Business configuration. The default is the business's service level. |
| How fresh a stored claim must be before a decision | Open. Not blocking for the design. |
| How short a status check may be | The working bound is five (decision 7). |
| The content of the owner's value view | Level 2's list is used (conflict 16). The detail is not blocking. |
| Whether the owner may see the audit trail | Decided for a non-admin owner: no (recorded earlier). A solo owner who configures: open (conflict 18). |
| Whether tenant data may train AI systems | Decided: not without written permission (recorded earlier). Level 2's default is no. |
| The format of each role's list of fields | Deferred to the technical design. The rule that each consumer gets only its own list is decided (decision 17). |
| Whether the configurator may hand its power to someone else | Not until Level 2 settles it (decision 13). |
| How a verified person maps to what they may do | Open in detail. The principle is decided (row 10). Each role and permission still needs the owner's table. |
| The exact form of "reopened" | Decided: a mark on the same record (decision 5). |
| How long the owner view may lag when a system is down | Open. Level 2 sets no limit (decision 16). |
| The number of status calls inside a tool | The working bound is five (decision 7). |
| The proposal limits | Decided: set by the business, with product defaults (decision 15). |
| Whether the completion check catches a payment reply to a tracking question | Decided (decision 18). |
| Learned lessons promoted to shared rules, the configurator's path, and trace field names | Not blocking. Deferred to the technical design. |
| The allowlist of fields per consumer | Decided: the default is nothing (decision 17). The field lists are deferred. |

## Level 2 questions with no answer

These are not in Level 2. Your decisions settle the architecture rules. Level 2 still needs the rules written, and you write them.

- **Business documents from outside.** Decision 58 and gap 11.
- **The permission join.** Decision 57 and gap 10.
- **Free accounts sharing one store.** Decision 59. Closed on 2026-10-12: there is no free plan.
- **The configurator passing its power.** Decision 13. Level 2 leaves it open.
- **The audit retention period.** Conflict 22. Level 2 says the per-market values are enumerated when a market is entered. The research folder has no number.

## Assumptions

Each assumption says what depends on it, and what changes if it is false.

- **Some Level 2 files are marked "working decision, pending review".** Thirty files carry a pending-review label, and 26 carry the exact marker. The architecture relies on some of them. *Critical until you accept them as working decisions.*
- **The Level 2 files changed on 2026-10-09 reflect your decisions.** Confirmed: you made those changes. *Settled.*
- **The refund setting is read when a refund is attempted.** Level 2 pins policies. If the setting must follow Level 2, the refund rules in Sections 6 and 8 change. *Provisional. Conflict 3.*
- **Five is a workable bound for status checks.** If the bound is higher, the time a situation waits changes. *Provisional. Decision 7.*
- **Tools run in a separate context.** If a tool ran inside the conversation manager, the failure rules would change. *Established by your message.*
- **The owner or the configurator sets the refund setting.** If someone else could set it, the approval rules change. *Established by your message.*
- **The recorded decisions in the construction record were made by you.** If they were not, rules 41 to 48 change. *Recorded earlier. To confirm (see the owner decisions).*

### Superseded or invalidated assumptions

- Section 6's rule that every conflict limits Tend to one step is superseded by decision 9.
- The Product Vision's rule that a new person starts as a prospect is superseded for this architecture by Level 2.
- A fixed-interval status check is invalidated by Level 2.
- Section 7's list of owner values is superseded by Level 2's list.
- The narrow definition of the conversation manager as routing only is superseded by your definition.

---

## Accepted trade-offs

- **The refund setting defaults to zero.** Every refund needs a person until the business changes the setting. This is slower, and it is safer.
- **The owner view is built on request.** It can lag behind the records by an amount that has no number yet.
- **A closed situation is reopened only for a wrong closure.** A customer who returns with a new problem gets a new situation, linked to the old one. The customer's history is spread across two situations.
- **A status check that does not answer within the bound is declared, not waited on forever.** The situation then waits, or escalates.

---

## Unknowns

Each unknown is placed in one of four classes. The method calls them non-blocking, deferred to the technical design, architectural, or blocking.

**Non-blocking**
- The number of status checks. The working bound is five.
- The limits on proposals, calls and cost. The numbers come later.
- The owner view's lag. No number yet.
- The settle windows, per partner and per capability. Business configuration.
- Whether a reopen checks the facts before it happens. Level 2 is silent.
- Whether a reopen changes the customer's stage. Level 2 says this is not fully locked.
- Whether "never guess" joins the list of things learning may never change.
- The name for the end state: "completed" is used.

**Deferred to market entry**
- The per-market legal values: consent durations, deletion windows, the white-list ceilings, and the audit retention period. Level 2 says they are enumerated when a market is entered. The research folder has no audit retention period.

**Deferred to the technical design**
- Trace field names.
- The list of fields each consumer gets.
- How the status-check service is built.
- How approval expiry is timed.

**Architectural (it stays visible)**
- The naming of the parts inside the conversation manager. Decided, but Level 2 does not yet use these names.
- Whether the refund setting is an exception to pinned policies. Decided: it is read at attempt time.
- Whether a solo owner who also configures sees the audit trail. Open (conflict 18).
- The owner's alert classes. Level 2's short answer names three, and its note adds an immediate route. Level 2 should say so.

**Blocking**
- None.

## Passes

These are the ten passes from the method, run on the architecture as edited.

1. **Traceability.** Every major part has a source. Items with no source are labelled: recorded earlier, architecture rule, or not found in Level 2. *Pass, with those labels.*
2. **Coverage.** The Level 2 answers that matter are placed in Sections 6 to 8, and the approved rules are written in. *Pass.*
3. **Contradiction.** Twenty-nine conflicts are listed. Each is settled, decided by you, or open. None is hidden. *Pass.*
4. **Responsibility.** Sending has one owner, the conversation manager, with the communication layer as its sending part. The worker never sends. Business documents have one named path, the intake step. *Pass.*
5. **Boundary.** The tool layer is separate. The status-check service is separate. The conversation manager contains the situation worker. *Pass.*
6. **Behaviour.** The walkthroughs were replayed against the edited Sections 6 to 8, including the new supplier-document walkthrough (CASE-6). *Pass.*
7. **Failure.** Each failure path ends in a safe next step that a person can see, including an unmatched document. *Pass.*
8. **Dimensions.** I re-tested the items that changed. *Pass, with the open numbers.*
9. **Unknowns.** Listed above in four classes. *Pass.*
10. **Revision.** Sections 6 to 8, the settled-items page, and the construction record were changed to match. *Pass.*

## Final check

The method's thirteen checks.

| Check | Result | Reason |
|---|---|---|
| Evidence | Pass | Each decision names its source and status. |
| Coverage | Pass | The approved rules are written into Sections 6 to 8. |
| Contradictions | Pass | Open conflicts are recorded. None is hidden. |
| Responsibility | Pass | Sending has one owner. Documents have one path. |
| Boundaries | Pass | The tool layer and the status-check service are separate. |
| Interactions | Pass | Every failure and feedback path has a next step, including an unmatched document. |
| State | Pass | Each part writes only the kinds of update it owns. The situation record has two writers: the situation worker and the conversation manager. |
| Permissions | Pass | A permission belongs to a verified person. |
| Dimensions | Pass | Re-tested for the changed items. |
| Assumptions | Pass | Listed, with what depends on each. |
| Traceability | Pass | Unsupported statements are labelled. |
| Revision | Pass | Sections 6 to 8 and the construction record were changed. |
| Provisionality | Pass | Remaining uncertainty is visible. |

All thirteen checks pass. No blocking unknown remains.

## Output

The architecture now says the following. Each point traces to a decision or a source above.

- A refund goes through with no person only when it is at or below the setting. The default setting is zero.
- A closed situation stays closed, except for a wrong closure. That reopens the original and records why.
- A new contact starts as unknown, then becomes a prospect, a customer or a returning customer.
- A status check is bounded, runs inside a tool or in the status-check service, and never runs on a fixed interval.
- A conflict stops only the action it affects.
- A platform rule change re-checks open situations. A business setting change does not.
- The owner hears in three classes. A meaningful change that alters the business's next decision can also reach the owner at once.
- The owner view is built on request and shows when it was last updated.
- A fact in an outgoing message must come from a tool result from the same turn.
- An unknown outcome is checked, never guessed. An irreversible action is not repeated automatically.

- A permission belongs to a verified person. A name or a phone number alone grants nothing.
- A business document from outside is filed to the matching situation or sender's record. If nothing matches, a person sees it.
- Every business gets its own store. There is no free plan.

- Audit records keep references. Their retention period is set for each market when that market is entered.
- A stakeholder may receive a configured update on arrival. A receipt-only reply is never the default.

### When these rules should be revisited

- If a refund goes through that should have needed a person, the setting rule is revisited.
- If a closed situation is reopened when it should have been a new one, or the reverse, the reopen rule is revisited.
- If a status check is needed on a timer, the status-check rule is revisited.
- If a Level 2 file changes a rule above, this section is revisited.

---

## Changes made to earlier files

- **Section 6.** Edited for the conflict rule, customer stages, status checks, reopening, default permissions, one-time grants, permission history, who may see what, the circuit breaker, the lifecycle of business policies, the permission rule, business documents, free accounts and deletion, the scope limits, the triage order, asking a person, meeting counts, learning checks, the policy conflict order, the settle windows, and the per-market values.
- **Section 7.** Edited for the conversation manager definition, the owner's value list, the owner's classes (with the immediate route from Level 2's note), the reopened mark, the first version at intake, the status-check name, and the settle windows.
- **Section 8.** Edited for who sends, the worker's role, retries and the unknown-outcome check, the order of the duplicate check, the approval content and expiry, the grounding rule, the owner view, the payment-reply check, the status checks, the five unexpected-behaviour classes (named, with the mapping open), the interim message, the channel start order, the trace and audit rule, business documents, the operational alerts, the supplier walkthrough (CASE-6), the communication rules from your Level 2 edits, and the settle windows.
- **Settled-items page.** The source-order line, the reopen rule, the approval wording, the permission rule, the business-documents section, the stakeholder line, the audit period line, and the situation wording were updated.
- **Section 9 and README.** One sentence in Section 9, and the status lines in the README, say Section 10 is complete as a check.
- **Construction record.** Dated entries record the approvals, the plain-language pass, and this settlement.

## Open decisions for you

Settled by your replies:

1. A permission belongs to a verified person.
2. Business documents from outside.
3. Every business has its own store. There is no free plan.
4. The refund setting is read when a refund is attempted.
5. The parts inside the conversation manager.
6. Settled by Level 2: an owner who also sets up the business sees the audit trail.
7. Five status checks as the working bound.
8. The recorded decisions (rules 41 to 48): recorded earlier, tagged to confirm.
9. Your Level 2 edits of 2026-10-09 are confirmed.

Deferred, not blocking:

10. **The audit retention period.** The research folder has no number. Level 2 says the per-market values are enumerated when a market is entered. The period is set for each market at entry, from that market's compliance source. A market is not entered until its values are set.

## Level 2 wording to change

These are your files. I did not edit Level 2. Your 2026-10-09 edits to the communication, decision-making and stakeholder wording are in, and the architecture follows them.

Still to change, yours:

- **Money.** Changed on 2026-10-12. Money above the refund setting needs a person, in the security files. The refund setting starts at zero.
- **Reopening.** Four Level 2 summary lines say a closed situation is never reopened or revisited. A fifth line in the harness study says the same. Each should state the exception in one sentence.
- **Stages.** The journey notes say the commercial lifecycle is three stages only (line 104). The unknown start should be added.
- **Free accounts.** Changed on 2026-10-12. There is no free plan. Each business has its own store.
- **The permission join.** Level 2 leaves the join between a verified person and what that person may do open (permissions notes, line 194). The rule decided here must be added.
- **Business documents.** Level 2 has no rule for documents that arrive without being asked for. The rule decided here must be added.
- **Owner alerts (optional).** The short answer lists three classes. The later note adds the immediate route. The short answer should say so.
- **Product Vision (not Level 2).** The Product Vision says a new person starts as a prospect (line 413). It should say unknown first.

## Still to finish

- The Level 2 lines listed above. Those files are yours.
- The per-market legal values, including the audit retention period. They are enumerated when each market is entered. The research folder does not state the audit retention period, so none is set here.
- The working decisions that Level 2 still marks as pending review. The architecture relies on some of them. This is an assumption, and it does not block the design.
- The numbers left to configuration: the status-check bound, the proposal limits, the owner view's lag, and the settle windows. They do not block the design.


## Concluding audit (2026-10-12)

This section records the concluding audit of the whole knowledge base. Every finding, its status, and what was done with it is in [section_10_audit_register.md](section_10_audit_register.md). The plain walkthrough of Sections 1 to 11 is in [walkthrough_sections_1_to_11.md](walkthrough_sections_1_to_11.md).

### What was read

- **Level 2:** all 19 folders, read to the last line by 11 auditors. Level 2 governs where it speaks.
- **Level 1 framing** (2,691 lines), the **research folder** (25 files), the **harness study** (2,134 lines), the **Product Vision**, STRUCTURE, README_FIRST, the three-level framework, the Level 2 method, the file-writing instruction, the handoff prompt, and the conversation constitution: read in full.
- **Product design folder** (11 files) and the **product design skill**: read in full.
- **Software factory file** (431 lines): read in full.
- **Construction method** (14,023 lines): read in full in 28 chunks, and every required output checked against the architecture folder.
- **Architecture Sections 6 to 10, the construction record, the README, and the settled-items page:** read in full by the internal audits. Edits made during the audit were checked again by line and by search.
- **"Things to look at"** (1.6 GB, 19 entries): inventoried only, not read in full.
- **Not read:** archive and code-index files (not current content, as the brief says). The Section 9 scratch files were checked by keyword only.

### What the audit found

- **Contradictions inside the architecture.** The Section 6 to 8 audit found 21, the Section 9 and 10 audit found 21, and the construction record audit found 16. Overlaps are merged in the register. Every contradiction that Level 2 or your decisions settle is fixed. The rest are on the owner decisions list.
- **Level 2 items the architecture lacked.** Well over 200 findings across the 19 folders. Most are now written in Sections 6 to 9, under the headings "Concluding audit additions" and "Further additions". The register gives the place for each.
- **Research and harness claims that conflict with Level 2.** These are not adopted, and the Level 2 reason is recorded. Examples: fresh rules on every wake (Level 2 pins policies), training data kept forever (Section 10 conflict 24), seven-year audit retention (Level 2 says per market), polling and a per-wait check-in (Level 2 uses one check-in per situation), a closed situation never reopened (the owner's reopen rule), numeric confidence (Level 2 forbids it), and optimiser changes to tool descriptions or to the policy text of the constitution.
- **Level 1 items where Level 2 is silent.** Applied. Examples: Tend invents no policy for an unclear case, buys no data and starts no campaign without the authority to do so, sends no indiscriminate bulk messages, and does not own every operational problem.
- **Technology in the logical layer.** Removed: a graph-database statement, a vendor name, and a hashing method. Level 3 items are listed in the register.
- **Conflicts inside Level 2 itself.** Listed for the owner below. Level 2 is the owner's files. On 2026-10-12 a few of them were edited, as described under "Agreed on 2026-10-12".

### Corrections made in this pass

- **Identity:** a person is verified only by the identity provider. A channel binding, a hostname, or a signed job identifies a channel, a site, or a system (Section 8).
- **Explanations:** given without being asked when the reason affects trust, responsibility, safety, or the next action (Sections 6 and 8).
- **Interim messages:** sent before a promised response time is missed (Sections 6 and 8).
- **Policy change:** a notice and a re-check wait with a deadline. A revoked grant stops every open situation at once (Sections 6 and 8).
- **Owner view:** the Level 2 snapshot and business-value view (Sections 6 and 7).
- **Understanding and asking:** understanding asks nobody. Gathering asks for the smallest unresolved part (Section 6).
- **Reasons to wait instead of messaging:** Level 2's six reasons, plus two architecture additions (Section 6).
- **Learning:** Level 2's modes, measures, reversal, never-memory list, and acceptable-learning list (Section 6).
- **Ending wording:** "unanswerable" is removed. The ending is "capability absent", and the customer still gets an answer (Section 8).
- **Email to start contact:** needs consent and an unsubscribe route (Section 8).
- **Status checks:** bounded, never on a fixed interval. The working bound is five (Sections 6 to 8).
- **Source order:** the Product Vision, the research folder, and the harness study apply where Level 2 is silent (Sections 7 and 8).
- **Section 10 rows corrected:** the worker-never-sends row now cites Level 2; the email row; the solo-owner audit row is open; the export row cites Level 2's customer rights line; the "recorded earlier" heading now says "to confirm"; the final check on writers now says two writers.

### Owner items: what happened to each one (2026-10-12)

In this section, "the owner" means Swaraj, who decides the design. The business owner is always called the business owner.

Recommendations are withdrawn. On 2026-10-12 Swaraj agreed to four items: 14 (channels), 15 (channels in scope), 26 (first version), and 46 (nurture wait). They are described under "Agreed on 2026-10-12" below. Each question below now has an answer, or is set aside for later. Some answers are calls, not yet confirmed. Some come from Level 1 or Level 2. Some are settings for each business. Nothing blocks the verdict now. The two Level 2 sentences were changed on 2026-10-12.

1. Where Level 1 sits in the source order.
2. Whether the AI is skipped when a fixed rule settles the next step.
3. Whether a solo owner who also configures sees the audit trail.
4. The owner snapshot (the Level 2 list in Section 6).
5. The conflict order when the business has set none.
6. Whether a later valid observation is an update or only a correction.
7. Whether platform-rule changes re-check open situations (recorded 2026-10-09).
8. What happens when the owner's keep-or-migrate deadline passes with no answer.
9. Whether the simulation environment uses seeded test data only.
10. The builder's view of production: masked for personal data, or complete (Level 2).
11. Who enables a capability, changes compliance settings, and authors capabilities.
12. Whether Tend staff may act as tenants, and under which rules.
13. Whether confidential records are readable by default.
16. Approval validity, passing approval to someone else, and what happens when no approver responds.
17. The escalation ladder: order, timeouts, and whether a third rung exists.
18. Group approvals: one response, or every response.
19. Small refunds without a person: the refund setting against the Level 2 security wording.
20. The Level 2 summary lines that say a closed situation is never reopened.
21. Recurring checks besides the check-in, and whether a watch is its own record.
22. The permission table, and the join from a verified person to what that person may do.
23. The authoritative source for each claim type, and which wins on disagreement.
24. The named list of invariants.
25. The tie-break for two versions of one policy.
27. The learning measures for automatic mode, and replay before keeping a lesson in manual mode.
28. Who approves cross-business generalisation, and which scope dimensions apply.
29. Whether training on business data needs written permission (recorded earlier).
30. Where channel rules live: the communication layer, or Level 3 transport.
31. Who may see a source's identity; helpers and family; who may correct learned items.
32. Whether the observer is a part of its own, or a function of the situation worker.
33. The Level 2 disagreements in the gathering and understanding files.
34. Whether an unexpected situation with no known workflow creates human work.
35. Whether the owner may stop a decided, unsent action before its effect.
36. Customer acknowledgement; investor and regulator disclosure; meeting and booking rules.

The other owner items (items 37 to 45 and 47 to 85 in the register) can wait for configuration, market entry, Level 3, or product design.

### Agreed on 2026-10-12

- **Nurture wait (item 46).** The situation worker cancels the nurture wait in the same version that carries its reply. The wait must be gone before the reply is sent, because the worker does not run again after the send. When the nurture date arrives, a time trigger wakes the situation worker only.
- **First version (item 26).** The conversation manager writes the first version of a new situation at intake.
- **States.** Only the situation worker sets waiting or blocked. Only the conversation manager sets completed, and only after no wait is open and the last message has gone out. The worker cannot set completed. Section 8 has the table.
- **Channels (items 14 and 15).** All four channels are in scope: WhatsApp, Telegram, email, and website chat. Use the first option that is available and allowed. A WhatsApp template is used only outside the windows, and only with opt-in. Slack has no research file yet.
- **Consent.** Swaraj's decision (2026-10-12): a person who writes to us on a channel has given consent for replies on that channel. A customer's message opens a window. It does not by itself allow a message the business starts. The channel's own rules decide that. Email needs consent and an unsubscribe route.
- **Multi-channel.** One situation continues across channels. A reply stays on the channel the person used last. A start uses the first option that is available and allowed.

The channel facts come from the research files (`research/wa_compliance.md` and `research/channel_compliance_matrix.md`). Level 2's channel files, consent file, state file, and nurture file were edited to match, in minimal wording. The two research conflicts are resolved in the represent file, from the Meta and Telegram pages.


### Level 2 wording to change (your files)

- **Money:** changed on 2026-10-12. Money above the refund setting needs a person, in the security files and the audit file.
- **Reopening:** four Level 2 summary lines, and one line in the harness study, say a closed situation is never reopened. Owner item 20.
- **Free accounts:** changed on 2026-10-12. There is no free plan. Each business has its own store.
- **Channel order:** updated on 2026-10-12. The channel-choice file and the channel rules file follow the agreed order. The two research conflicts are resolved from the platforms' own pages (2026-10-12).
- **Solo owner view:** the channels file (line 38) says "what the operator needs". The authority file (line 73) says the whole business. Owner item 3.
- **Recurring checks:** the time file (line 106) says the check-in is the only periodic wake. The explainability file (line 11) describes ticks. Owner item 21.
- **Rule changes:** the coordination file (line 171) says rule changes need no event. Owner item 7.
- **Gathering:** "fetch again" (lines 119–125) conflicts with the ingest copy (lines 548–560). "Not captured anywhere" (lines 23 and 163) conflicts with the ingest record (line 296). The example order numbers (lines 566, 582, and 602–604) do not match. Owner item 33.
- **Business documents:** no Level 2 rule for documents that arrive unasked. Open.
- **Product Vision line 413** (not Level 2): says a new person starts as a prospect. It should say unknown first. Owner item 59.

### Open items added in this pass

- Who checks record writes. Recorded earlier: no separate checker. Level 2 names none.
- Decided: the situation worker cannot set completed. Only the conversation manager sets it (Section 8).
- The status-check owner and count. Five is the working bound. Whether each business may change it is open.
- Whether a read that discloses information needs a StepUp approval. Section 6 says yes. Owner item 83.
- Recurring checks besides the check-in (owner item 21).
- Business documents from outside (open).
- Rule codes still shown in some tables. Clearing them is part of the style decision (owner item 58).
- An auto-accept rule for transfers: set by each business.
- A consent withdrawal stops every future message the consent covers (architecture rule).
- No personal data in a trace (architecture rule; you confirm it).
- Interim messages: one trigger, before a promised response time is missed.
- Research conflict: marketing templates are charged, but all message types are free inside the 72-hour window. Resolve before use.
- Research conflict: the channel matrix allows proactive Telegram "with consent" in one line and says bots cannot start chats in another. Resolve before use.
- No research file says whether Telegram needs a template. The owner's direction is that Telegram can be used freely once the chat is started.
- Telegram and email costs are not in the research files.
- After a reply cancels a nurture wait, does the nurture end or get a new date?
- Which market law applies beyond the channel's rules (Compliance & Security).
- Phone calls: not in scope yet.

### Readiness for Section 11: what happened (2026-10-12)

Section 11 has run, and it is closed. The verdict is Stabilized. Here is what happened to each readiness item:

1. **One current model that can be loaded.** Sections 6 to 10 are prose. The method's single source file (12.5) belongs to Section 12, not Section 11. For Section 11, the written rules are enough. Met.
2. **Evidence and decision records as records**, with IDs (4.29 and 11.11). Status: written, in the decision records file.
3. **A status for each element:** provisional, conflicting, or unknown (11.3). Status: written, in the stabilization file.
4. **Conflict and gap registers with IDs and fields** (10.23 and 10.24). The register file holds the findings, with IDs. Status: the list of contradictions is in the stabilization file.
5. **The Level 2 wording items above** resolved, or accepted as blockers (11.17, item 7). Status: resolved on 2026-10-12, when the two Level 2 sentences were changed.
6. **Invariant and constraint reconciliation** (10.10 and 10.11). Status: written, in the decision records file.
7. **A revisit condition for each decision** (11.11 and 11.17, item 11). Status: written, in the decision records file.

The checks ran again on 2026-10-12, after the Level 2 change. The verdict is Stabilized.

## Result

The 2026-10-12 audit found contradictions and gaps in Sections 6 to 9. The contradictions that Level 2 or your decisions settle are fixed. The rest are listed above and in the register.

Section 11 is closed. The verdict is Stabilized.

What is left is yours: the owner decisions, the Level 2 wording (your files), the recorded-earlier decisions to confirm, and the market values, which are set when each market is entered.
