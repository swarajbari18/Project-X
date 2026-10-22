# How do the parts act together, step by step?

<!-- Plain-language layer. Rule codes sit in hidden comments, for agents to link and trace. Meanings and sources are in code_index_section_8.md. The earlier version is in archive_section_8_before_plain_rewrite.md. -->

## Status

Working. Rewritten in plain language on 2026-10-09, from Section 7 (the writer rules) and from the source surveys.

**Standard.** Level 2 is the standard. Where Level 2 disagrees with another source, Level 2 wins. The Product Vision, the research folder, and the agent harness study apply where Level 2 is silent. A disagreement that remains is written down and sent to Swaraj. It is not chosen silently.

**Decided:** the rules below, except where marked **Open** or **Provisional**.

**Open:** items the knowledge base does not settle. Each one states a recommendation. A recommendation is not a decision.

**Provisional:** in use, but may change.

**Provisional items in this section:** promotion of learned lessons to the registry, the configurator's path, the trace field names, and how long the owner view may lag when a system is down. The earlier zone table is in the archive.

## What this section decides

The parts are: the conversation manager, the situation worker, the communication layer, memory, the owner view, the tool layer, the status-check service, configuration, and improvement. Section 7 says who writes what. This section says what happens, in order, when something changes: which part starts, what it checks, what it may write, what it may send, and what happens when a step cannot be finished.

Section 8 does not add parts. It describes how the parts from Section 7 cooperate.

## Terms used in this section

The terms used in this section:

- **Tend:** the system this architecture describes.
- **Duplicate check:** the check for an earlier attempt at the same effect, using its idempotency key. It is one step, not two.
- **Run:** one pass of the situation worker on one situation, from the moment it starts until it rests.
- **Start:** the moment a part is started by a change or a timer.
- **Proposal:** the AI's suggestion for the next step. A proposal is data. It does not run by itself.
- **Check:** a fixed-code test that a proposal must pass before it runs.
- **Effect:** anything that changes the outside world: a message sent, a payment made, a file released.
- **Irreversible:** an effect that cannot be undone, such as a payment or a sent email.
- **Capability:** an outside system the business has connected to Tend, such as a carrier's tracking service or a payment provider.
- **Idempotency key:** a unique tag sent with an effect, so the other side can tell a repeat from a new request.
- **Promised settle window:** the time an outside party promises for an outcome to settle. Level 2 uses this term. **Internal settle window:** Tend's own bound for a wait. It is the business's service level for that wait, with a default the configurator can change.
- **Bound:** the limit on a wait, given by a contract, an expected settle time, a deadline, or a check-in. Past the bound, the wait is no longer honest.
- **Declared outcome:** the final label for a wait or an action: success, terminal failure, transient failure, or unknown outcome.
- **Capability-absent:** no system and no person can answer the request. This is recorded honestly. It is not a failure.
- **Human work item:** a piece of work for a person, with one responsible party at a time.
- **Tenant:** one business that uses Tend. Its data is kept apart from every other business's data.
- **Harness:** the fixed code around the AI. It runs the steps, checks each proposal, and saves each version.
- **Registry:** the list of a business's settings: its sources, channels, and values.

## One run, step by step

Each run has the same steps, in the same order: TRIGGER, a repeat check, RECOVER, PROPOSE, VALIDATE, EXECUTE, UPDATE, and REST. <!-- S1 -->

1. **TRIGGER.** A change or a timer starts the run. The change goes to the part named in the routing table below. Incoming messages go to the conversation manager first, which then starts the situation worker. Timers go to the situation worker. <!-- S1 -->
2. **Repeat check.** If the change is a repeat of one already processed, the run ends here. <!-- S12 -->
3. **RECOVER.** If an earlier run on this situation was cut short, the run resumes it. Only one run per situation runs at a time. <!-- S1 -->
4. **PROPOSE.** The AI suggests the next step as a structured proposal. Its reasoning is kept in the trace. It is not a decision. Call (not yet confirmed): yes. The AI runs only where fixed rules leave the step open. <!-- S1 -->
5. **VALIDATE.** Fixed code checks the proposal. It checks the shape and the permission. Details are in the next section. <!-- S2 -->
6. **EXECUTE.** Fixed code runs one path for the kind of step proposed. There is no free-form tool loop. <!-- S3 -->
7. **UPDATE.** The situation worker writes the next version of the situation record, if the step changed anything. Corrections go forward as new versions. Unknowns stay visible. <!-- S4 -->
8. **REST.** The situation worker decides, by fixed rules, whether the run has made enough progress to stop, or whether another round is needed. The AI does not decide to continue. <!-- S6 -->

**A run ends in one of these honest states:** a named wait, a declared outcome, a visible blocked state with a reason, or running with work still in progress. A run never ends silently. <!-- S6 -->

**Progress.** A round counts as progress only when the recorded state of the situation changed in one of five ways:
- a claim's evidence changed;
- a needed claim came from a source not yet asked in this run;
- a wait was written, refreshed, or finished;
- an outcome was declared;
- a permission changed.

The AI's own report of progress never counts. <!-- E9 -->

**One run per situation.** Two runs never change the same situation at the same time. <!-- IB-1 -->

**Who runs what.** The AI proposes. Fixed code checks, runs the path, and writes the version. The situation worker writes conclusions. The conversation manager writes what comes in. Section 7 has the full table.

## What each behaviour does (EXECUTE)

After the checks pass, EXECUTE runs one fixed path for the behaviour the proposal names. <!-- S3 -->

- **Gather:** one bounded pass over the information the step needs. It returns to PROPOSE. It does not decide whether the information is enough; that is the situation worker's job. The proposal must ask for at least one source. <!-- S3, F5 -->
- **Ask:** the situation worker writes the clarification intent. The communication layer sends it, after the permission check on the send. <!-- S3, AC-2 -->
- **Invoke:** the tool layer runs the call. Its evidence comes back to the situation worker. <!-- S7, S8 -->
- **Communicate:** the situation worker writes the intent. The conversation manager decides whether it is worth telling. The communication layer sends. <!-- S3, IB-5 -->
- **Human work or escalate:** the situation worker writes or updates the human work item. <!-- S3, IA-14 -->
- **Arrange a meeting:** the situation worker records a meeting wait with the partner's intent and availability, under the meeting rules. <!-- S3, K2 -->
- **Wait:** the situation worker writes the wait record and the book-of-waits entry. The AI proposes the wait; fixed code creates it. <!-- HC-3 -->
- **Resolve:** the situation worker records the declared outcome. It never sends. The conversation manager decides whether to tell the person, and the communication layer sends the message. <!-- A6, A9 -->
- **Stop safely:** the situation is shown as blocked, with a visible reason. <!-- M1 -->

**Progress.** Identical repeats do not count as progress, and neither does the AI's own assessment. <!-- E9 -->

## Checking a proposal (VALIDATE)

VALIDATE is one step with two separate checks. They must stay separate, because they give different messages when they fail. <!-- INV-6 -->

**The shape check.** Is the proposal well-formed, bounded, and consistent with the current record?
- The tool arguments and the behaviour name match the schema. A bad shape is sent back for repair, and the AI proposes again. <!-- S2 -->
- The proposal stays inside its limits: how many calls, how many steps, and how much cost. The number of asks for a gather must be at least one. The numbers are set per business in configuration, with the Level 2 example values as defaults. <!-- S2 -->
- The proposal matches the record it was made from. The version is still current, and the wait it refers to is still active. <!-- S9 -->
- The completion rules hold. A situation cannot close with an open question. A wait cannot end without its release rule being honoured. <!-- S2 -->
- Fields from connected systems are untrusted. Only the allowed fields enter the AI's prompt. <!-- U2, S11 -->

**The permission check.** Is this principal allowed to cause this effect on this object, now?
- The policy check returns **Allow**, **Deny**, or **StepUp**. StepUp means a person must approve. <!-- T2 -->
- The check runs at each point where an effect can happen: the proposal, the tool call, the outgoing message, and any change to configuration. <!-- T2, T4 -->
- The permission store is read at the moment of the check. A cached copy can speed up reading context. It never decides allow or deny. <!-- AC-4, T5 -->

**Failure shapes must stay distinct in the trace.**
- **Structural rejection:** a repair message, with no permission language. For example, malformed tool arguments.
- **Deny:** a refusal with its policy reason. There is no retry without a change. For example, a cross-tenant read.
- **StepUp:** the approval tool sends the request to the approver through the communication layer, and the answer returns through the tool flow. For example, a refund above a threshold.
- **Idempotency block:** the same effect is already started, or its outcome is unknown. This is not a denial.
- **Capability-absent:** no source exists for the request. It is recorded honestly, outside failure handling. <!-- INV-7, D8 -->

Treating an idempotency block as an authorisation check is wrong. A refund needs both: a permission Allow and an idempotency pass. <!-- IB-8 -->

## Which change starts which part

Each change goes to one primary part. Other parts react to the version the primary part writes. They do not write in parallel. <!-- IA-1 -->

| Change | Goes to | Notes |
|-------|---------|-------|
| An incoming message | The conversation manager, which routes it, then starts the situation worker for that situation | Identity is set once, at intake. <!-- B2, T1 --> |
| A delivery acknowledgement | The communication layer, which records it | Updates the delivery evidence. Starts the situation worker only if a send is pending. <!-- S12 --> |
| A human's answer | The conversation manager, which records it as an incoming message | The situation worker records the outcome. <!-- J6 --> |
| An approval result | The tool layer, which returns it to the run | The approval does not come back through the conversation manager. <!-- AC-3 --> |
| A timer for a wait (nurture, recheck, scheduled work, release, check-in, escalation) | The situation worker only | The timer never sends a message by itself. <!-- IB-1, IB-4 --> |
| A situation version was written | The communication layer, the owner view, and memory, each reading the version | Each reads. None writes truth from it. <!-- HC-1 --> |
| A capability result | The situation worker | Structured evidence only. <!-- IB-7 --> |
| An observation change | The owner view, as a builder signal | The observer does not act on it. <!-- IA-19 --> |
| A saved trace | Memory, the improvement path, and the observer, asynchronously | Never blocks a save. <!-- IB-12, IB-14 --> |

**Never route to the communication layer as the primary consumer of a timer, a tool result, or an unknown-outcome recheck.** <!-- IB-1 -->

**Duplicates.** Inbound messages are first checked at intake, by message ID, sender, and content. The situation worker also checks the version it has already processed. Each processed change is recorded by its situation and its change ID. A repeat is dropped before PROPOSE. Duplicate delivery is harmless because of this check. <!-- S12 -->

## Writing and announcing

**Write and announce together.** Whoever writes a version of the situation record also announces its change, in the same run. A write without its change is incomplete. It is retried. <!-- HC-1 -->

**Versions move forward.** A version is written after the one it replaces. An old version is never rewritten. <!-- HC-1 -->

**Two writers, one situation record.** The situation worker and the conversation manager both write to the same situation record. Each writes only the kinds of update it owns. The communication layer keeps its own record of what it sent. Section 7 has the table. <!-- HC-2 -->

**A business document from outside.** A supplier's bill of materials, an invoice, or a balance sheet request can arrive without being asked for. The intake step matches it to the situation for that sender, or to the sender's record, and files it there. If nothing matches, a person sees it. No action is taken on the document alone.

**Intake creates the record.** The conversation manager writes the first version of a new situation at intake (agreed 2026-10-12). There is no empty record: the first version is written at intake, with what came in.

**Routing outcomes.** When an incoming message arrives, the conversation manager does one of these:
- **No match:** it creates a new situation, or keeps the message until it can be routed.
- **One clear match:** it attaches the message to that situation, and the situation worker is started with an attach intent.
- **Many clear matches:** it creates two situations at once, as decision 10 says. The message is not held. It never attaches silently.
- **Many soft matches:** it asks the sender a question. It does not split a message on a guess. <!-- HC-2 -->

## Waits

**Every wait is written down.** Each wait is written to the book of waits, with the change that will start it. The book of waits is the list of what each waiting situation is waiting for. <!-- HC-3 -->

**One check-in per situation.** A check-in is the only periodic trigger for a situation. It is the backstop when a change is lost. No part of Tend asks an outside system "is it done yet?" on a fixed schedule. Status checks are bounded, and they never run at a fixed interval (Section 6). <!-- HC-3 -->

**Status checks are outside the harness.** Level 2 allows a small, bounded number of status calls inside a tool. A discussion note gave five as an example. The working bound is five (decided 2026-10-10); the final number is configuration. Repeated checks belong to a separate status-check service, which runs each status check and sends back the result as a message to the situation. **Provisional:** short status checks, used only where the outside system's behaviour is known. <!-- INV-8 -->

**A wait's bound.** Waiting is honest while the bound has not passed. A wait is not a failure while it is inside its bound. Past the bound, the outcome is declared. Before a promised response time is missed, the customer gets an interim message. For an irreversible effect whose result is still unknown, the declared outcome is unknown. For a status wait that no source answered, the declared outcome is failure. The unknown and failure rules are settled by Level 2's failure files. A wait past its time limit is a recorded failure. An action that cannot be undone is never repeated automatically. Only the numbers are set by configuration. <!-- H3, M2 -->

**Timing.** A timer re-reads the latest version before any decision to send. A superseded wait does nothing. A late timer does nothing, and it is not an error. <!-- IB-4 -->

**Two changes at once.** When a timer and a message arrive together, the later version decides. The timer sees the superseded wait and does nothing. <!-- IB-4 -->

## Permissions and identity

**Identity is set once.** Each run has one tenant context. It is set once, from verified identity, when the run starts. It is never taken from message text, links, headers, or tool arguments. It travels unchanged with every call. <!-- AC-1 -->

**What the tenant context holds.** The tenant, the person or system acting and what kind it is, a pointer to the grant snapshot used for audit, and a request ID for tracing. A grant snapshot is for audit. Live checks still read the trusted store. <!-- AC-1, T5 -->

**Where identity comes from.** A person is verified only by the identity provider. Tend does not verify people itself (Level 2). A channel binding shows which channel a message came through, not who is typing. A hostname identifies the business's site. A signed job identifies the system that sent it. None of these proves a person's identity. Tenant isolation applies to every store, cache, key, index, log, and AI call. <!-- AC-1, U1; Level 2 identity -->

**Never authorise from:** AI-extracted tenant names, tool arguments alone, unverified headers, or the narrative fields of a situation record. <!-- AC-1 -->

**Approval results.** An approval returns through the tool flow. A denial ends that proposal, not the situation. The tool checks the permission again before it acts. <!-- AC-3 -->

## The save protocol: what each part may write

The full write table is in Section 7. These are the rules that affect a single save.

- The situation worker writes the situation's current record (what it gathered, understood, decided, and is waiting for), waits, claims, communication intent, and human work items. <!-- IA-2 -->
- The conversation manager writes what comes in: incoming messages, routing, and the creation of a situation at intake. <!-- IA-2 -->
- The conversation manager sets a situation to completed when it concludes the conversation is over, but only after no wait is open and the last message has gone out. The worker cannot set completed. <!-- agreed 2026-10-12 -->
- The communication layer writes what it sent, and its delivery evidence. Each record holds the message, the reason, the evidence used, the next responsibility, the wait, and the result. <!-- IA-2; Level 2 communication -->
- Memory writes nothing to the situation record. It proposes. <!-- IA-2 -->
- The owner view writes nothing to the situation record. It builds views from saved versions and writes nothing else. <!-- IA-2 -->
- The tool layer writes its own intent record and retry state, not situation versions. <!-- IA-2 -->

**Reason tags.** Every save to the situation record carries a reason, for audit. Examples: an inbound reply, a nurture timer, a tool result, or a human outcome. <!-- G3 -->

**Atomic moves.** Some changes must be saved together, in one version:
- Tend's reply and the cancelling of the wait it answers. The worker writes both in one version. The customer's message is recorded first, as its own version. <!-- IB-3 -->
- An initiated action, its unknown outcome, and the wait for it. <!-- IB-11 -->
- A partial gather: new claims, an optional wait, and the question that is still open. <!-- IA-2 -->
- A new human work item, with its owner. <!-- IA-14 -->
- A handoff that is pending until accepted. <!-- IA-14 -->
- A capability-absent declaration, with its evidence. <!-- O10 -->
- A closure, with its outcome. <!-- A6, A9 -->

## Sending messages (the communication layer)

**The communication layer sends and records each message. The conversation manager decides whether an update is worth telling the person, and passes that request to the layer.** The situation worker writes the intent to say something. It never sends. <!-- IB-5, INV-2 -->

**Deciding to speak.** The conversation manager reads each new version, and decides whether the update is worth telling the person now. If yes, it passes the update to the communication layer. Whether a message is worth sending is decided here, not by the situation worker. Level 2 gives the next behaviour to Decision Making. It gives the choice to tell the person to the conversation manager, as changed at Swaraj's direction on 2026-10-09. <!-- Level 2 communication; Product Vision -->

**The egress check.** The communication layer sends a message only when all of these hold:
- the intent is on a saved version of the situation record, or on a version that is intentionally historical (a resend);
- the conversation manager has decided the update is worth telling;
- the policy check returns Allow for the channel, the recipient, and the content class;
- the channel rules hold: the template, the window, and consent;
- the outbound fields pass the allowlist, so untrusted carry-over is stripped. <!-- IB-5, AC-2, L1–L3, U2 -->

**Replying and starting.** A reply stays on the channel the customer used for that message, while that window is open. A start uses the first option that is available and allowed:

1. **A channel where the customer is available now, with no template.**
   - WhatsApp inside the 24-hour customer window.
   - Telegram, only in a chat the customer began. A bot cannot start a chat. Telegram states no template rule. Bot messages cost nothing by default, so messages in a started chat are free. Business bots reply only to chats with an incoming message in the last 24 hours.
   - The open website chat session, for as long as the visitor's session stays open.
2. **Email**, when consent is in place and the message has an unsubscribe route. Other lawful bases are for Compliance & Security to check in each market.
3. **A WhatsApp template**, only outside the 24-hour window, and only for a message type that an approved template covers. Tend requires opt-in for every template. In the 72-hour window after a click-to-WhatsApp ad or page button, in the mobile app, all message types are free, templates included. Once the 24-hour window closes, only templates may be sent. Marketing templates are charged outside that window.

If no option is available and allowed, one of two things happens:

- the business contact decides. The business contact is the person the business names for this;
- Tend waits for the customer to write first.

Escalation follows the failure rules.

The same situation continues on whichever channel the customer uses next.

Reply example: Priya writes on WhatsApp at 09:00. Tend may reply on WhatsApp until 09:00 the next day. After that, the message is a start, and the list above applies. <!-- Level 2 channels; research: wa_compliance, channel_compliance_matrix -->

**Draft text is not sendable.** A draft, or the AI's reasoning, is never sent without a saved intent behind it. A fact in a sent message, such as an order number, a tracking number, or a price, must come from a tool result from this turn. <!-- F2 -->

**Retries.** Retries happen in the tool layer, as Level 2 sets. A send is a call through the tool layer. The tool layer retries it under the channel rules, with bounded backoff. If a send or an irreversible call has an unknown outcome, the tool layer checks the outcome first. It does not call again unless the other side honours the same key. A service that stays down is not called again at once. The tool layer stops calling it and checks again later. <!-- M4 -->

**When a channel keeps failing.** The situation worker waits, or proposes another channel that the rules allow. <!-- L1–L3 -->

**Undeliverable messages.** The communication layer records the failure as evidence. The situation worker starts, updates its claim, and classifies the case. It may escalate. <!-- IA-10 -->

**A policy block at the egress check.** The communication layer does not send. It returns a Deny diagnostic. The situation worker proposes again, or escalates. <!-- AC-2 -->

**What the layer does not do.** It does not declare a failure in the situation. It does not write the outcome. <!-- IA-10 -->

### What a message to a person looks like

- **No receipt-style message by default.** No "we received your message" email. Receiving a message is recorded internally. <!-- Level 2 communication -->
- **No tool trace.** Outside people see the situation, not the list of tools that ran. <!-- Level 2 communication -->
- **A pass that commits no change sends nothing outside.** Only a material change, committed by the situation worker, is expressed to each party who must see it. <!-- Level 2 communication ruling, 2026-09-25 -->
- **A stakeholder may have a configured update when something arrives.** For example, a tax notice can have its deadline sent as a substantive update, if the business configures it. A receipt-only reply is not the default. <!-- Level 2 stakeholder notes -->
- **Send on a material change only.** A person hears about a change that matters to them, including a partial answer and a wait that is true of the situation. A routine step that changes nothing material stays on the artifact. <!-- Level 2 communication -->
- **Express the situation, not internal work.** An outside person hears what the situation is, not the internal task steps. <!-- Level 2 communication -->
- **Send a partial answer only as the saved record describes it.** A partial answer is said plainly, as a partial answer. <!-- Level 2 communication -->

## Human work and the owner

### The business owner's view

The business owner hears about a change in three classes: a decision only the business owner can make; a deadline or notice that puts the business at risk; or an escalation that has drifted past everyone assigned. Level 2's note also lets a meaningful change reach the business owner at once when it changes the business's next decision. Routine progress stays on the business owner's board. <!-- Level 2 business view: which_events_should_require_the_owners_attention.md lines 11-19 and 23-30 --> <!-- O3 -->

A subscription to updates changes only the delivery channel. It does not change which changes reach the business owner. **Provisional.** <!-- O3 -->

The business owner may be pushed a chat message when the business owner asked for one. Routine progress is artifact-first: the chat is not the situation record. <!-- IA-7 -->

The owner view is a derived view. Its lag is set per business in configuration. The design sets no limit. <!-- O1, O2 -->

### Human work items

A human work item is written on the situation record. It has one responsible party at a time. That party can be a person, a role, or a queue. <!-- IA-14, J4 -->

**Fields.** Each item carries:
- a stable ID;
- its kind;
- its responsible party;
- its state: open, pending handoff, waiting for a response, completed, or cancelled;
- its acknowledgement time, which is not its completion;
- its position on the escalation ladder;
- its context: the chronological evidence for anyone who picks it up. <!-- IA-14 -->

**The kinds of involvement.** The person is the subject of the situation. The person provides information. The person confirms or acknowledges. The person authorises access or an action. The person approves a business decision. The person performs work. The person is answerable for the work. The person is consulted. The person is only informed. <!-- J2 -->

**Lifecycle.** The situation worker proposes the human work or the escalation. Before any irreversible action on transferred or covered work, Tend checks that the substitute has the permission. The work item is written as a new version. The request reaches the person through the communication layer. The response arrives as an incoming message. The situation worker records the outcome. Then the run rests or proposes the next step. <!-- J9, IB-5, J6 -->

### Acknowledgement, completion, and handoff

- **Acknowledgement is not completion.** When someone acknowledges a request, the escalation clock may stop, and the work stays open. Business policy sets this. <!-- J6 -->
- **Unavailable is not non-responsive.** A person who is away is handled by coverage first. A person who does not respond is handled by the escalation ladder. <!-- J7 -->
- **A notice is not an acceptance.** A transfer stays pending until the other person accepts it. The previous owner stays responsible until then. <!-- J8 -->
- **An auto-accept rule** can apply only when the business sets one. The approval class is recorded on the work item. <!-- J8, G2 -->
- **Approval is different from work.** A permission request for an action is a StepUp. It creates a work item for the approver. The permission check stays at the moment of the action. <!-- G2, J4 -->

### Silence

When a person does not act, Tend names the kind of silence before the next step. Silence is never completion. There are seven kinds:
- the request was not delivered;
- it was delivered but not acknowledged;
- it was acknowledged but no work has moved;
- the person rejected the work;
- the person is unavailable;
- the person completed the work but did not record it;
- the work became unnecessary because the situation changed. <!-- J5 -->

### Partners

A partner is contacted only after escalation, and only when the business policy allows partner contact. The channel choice file states the same rule. The partner receives only the scoped information the task needs, such as a tracking number and the problem. The contact is recorded on the trail. <!-- K4 -->

## Capability calls

### The full cycle

1. **Match.** Before any call, the match step asks which source can answer the question. A source can be a system or a person. <!-- D8 -->
2. **No source.** If no system and no person can answer, that request is recorded as capability-absent, and only that request stops. The rest of the situation continues. It is not a failure. <!-- O10 -->
3. **Sources exist.** The run proposes the call, in the order of source priority. <!-- D4 -->
4. **Checks.** The shape check and the permission check run. The permission check runs before the connector is called. <!-- S2, T2, T4 -->
5. **Duplicate check.** Before an irreversible effect, the situation record is checked for an earlier attempt. This check runs first, so it does not find its own intent. <!-- S9 -->
6. **Intent is recorded.** After the duplicate check passes, the tool layer records the intent. <!-- S7 -->
7. **The call.** The connector is called once per attempt. The tool layer retries within its limits. A status check is a small, bounded number of calls. If the outcome is unknown, the tool layer checks it first and does not call again unless the other side honours the same key. Long-running checks belong to the status-check service. <!-- M4 -->
8. **Evidence returns.** The tool returns structured evidence to the situation worker. It never writes claims into the situation record itself. <!-- S8, IB-7 -->
9. **Update.** The situation worker writes the result as a new version. The write includes the evidence and any change to a wait. <!-- IB-7 -->

### Idempotency: resend or new start

- **Same key, retry after a timeout.** A resend with the same key is allowed only when the other side honours the key, so it can tell a repeat from a new request. The record already shows the start. <!-- Level 2 failure -->
- **New start while an outcome is unknown.** Blocked at the duplicate check. The unknown outcome stays on the record. <!-- IB-11 -->
- **New start after a final outcome.** Needs a new decision, with the permission check and the business rules. <!-- T2 -->

### The match step

- **Registry lookup.** Tend checks the connected capabilities and the business's source list. <!-- P1, Q1 -->
- **No source and no person.** The request is capability-absent, not a failure and not a structural error. <!-- O10 -->
- **A person can answer.** Tend opens human work with the order details. It does not say the business has no capability. <!-- J1 -->
- **Sources exist.** They are used in priority order, in one bounded gathering pass. <!-- D4 -->

### Fetching a file: the tool decides, the AI does not

**This is an example of how the tool and the AI have separate roles. It is not a separate approval feature.**

A business has a file that only some people may see, such as the current year's balance sheet. A customer asks for it in chat. The AI calls `fetch_file`, which is its only fetch tool. It has no separate approval tool.

Inside the tool, in fixed code:
1. The tool reads the file's details, and asks whether this requester needs approval.
2. If no approval is needed, it returns the file with a summary, and the file is attached to the message.
3. If approval is needed, the tool raises a request to the approver. The AI does not see this step.
4. If the approver allows it, the tool returns the file. The AI is not told that approval was needed.
5. If the approver denies it, the tool returns "behind authorisation; this person did not approve this request."
6. If the approval times out, the tool returns "the approval request failed; the file cannot be fetched."

In every case the AI gets a tool result, and decides what to say next. It never decides whether the file is released. <!-- T2, T4 -->

The approval step is a shared library that many tools reuse. The approver sees the exact text or data that will be sent or released. An approval is never used after the situation has changed; it is asked again. Timeouts, a missing approver, and escalation are coded in the tool, not in the prompt. A denial is structured: the situation worker may escalate, reroute to another approver, or save honest text for the customer. It never bypasses the policy check. This approval is the StepUp check: a read that discloses information is checked the same way as an effect, such as a refund. <!-- T4, T7; Section 6 policy check -->

**Why this shape.** A rule that must always hold belongs in the tool's code, not in the AI's prompt. If the rule were only in the prompt, a mistake or an injected instruction could break it. <!-- Level 2 security -->

**Tools are precision tools.** Each tool handles its own details: metadata, approvals, timeouts, retries, and what to return. The AI sees only the result. <!-- Level 2 security -->

## Timing and races

**A timer and a message at the same time.** The timer re-reads the latest version before any decision, as the rule requires. If a message has already written a newer version, the timer's wait is superseded, and nothing is sent. <!-- IB-4 -->

**A recheck timer.** An unknown-outcome recheck is a timer that starts the situation worker. It uses the same status path as any other check. It is not a separate tool or action. <!-- IB-9 -->

**An unknown outcome.** An effect whose outcome is unknown keeps its situation waiting. It is not declared failed while the wait is inside its bound. <!-- IB-10 -->

**The bound is spent.** For an irreversible unknown, Tend does not redo the action. It declares the outcome unknown, not failed, and hands the case to a person with the full record. <!-- IB-10 -->


## Derived views, memory, configuration, and improvement

### Derived views (the owner view)

- The owner view is worked out from saved versions. It is read-only for the situation record. <!-- O2 -->
- It is built when the owner asks for it. It shows when it was last updated. A wrong write to the record is not acceptable. <!-- O1, O2 -->
- The owner view is built on request. It is not refreshed in batches. The observer's changes refresh the builder views on each observer tick. The builder's capability-absent aggregate refreshes in a nightly batch. It is not part of the owner view. <!-- IA-8 -->
- The owner view shows the owner board, the timeline, and the human-work columns. The builder health views and the product signal for capability-absent answers are builder views, not owner views. The owner sees business value only. <!-- IA-8 -->
- **Set per business:** the owner view's lag when a system is down, in configuration. The design sets no figure. <!-- O2 -->

### Memory

- Memory serves context on request, for a decision step or a routing step. It serves only the slice the step needs. <!-- N1, N11 -->
- Memory serves a one-line summary of each open situation first. It loads the full situation only after one is chosen. Settings are not situation summaries. <!-- N11 -->
- Context enters at three points: structured values at the validators and tool arguments; prose preferences at the step that writes a reply; routing summaries before the AI chooses to attach, ask, create, or hold. <!-- N14 -->
- Context comes in three classes. Structured values are tool schemas and registry rows. Prose preferences are text such as sign-off style, placed at the step that writes the reply. Routing summaries are the person's open situations, plus any reference number in the message. <!-- N14 -->
- Memory's serve output is checked against the field allowlist. The row is never sent whole. <!-- U2 -->
- Learning reads traces in the background. It may match new claims against existing claims, propose lessons, and propose promotions. It never widens a grant, and it never changes a rule. <!-- IB-12, N8, T8 -->
- A learned item cannot change policy, authority, ownership, permissions, who is the source of truth, required approvals, legal or compliance limits, who is accountable, or an irreversible-action boundary. <!-- Level 2 memory: understanding_all_memory_and_knowledge_questions.md lines 62-70 -->

### Configuration

- A configurator adds a configuration candidate, which memory has proposed, through the configuration tools. A configurator validates the candidate first. Only the configuration tools apply it, and only after validation. <!-- IB-13, T8 -->
- **Decided:** a change to a business setting does not re-check open situations. A platform-rule change does: it re-checks each open situation for what is allowed now. Decided on 2026-10-09 and applied on 2026-10-10. Level 2 does not say what wakes a situation after a rule change, so this is the design's answer. Reads take the current configuration. Open situations keep the policies they were pinned to. A change to a business policy reaches an open situation only through a notice and a re-check wait with a deadline, where the owner chooses to keep or migrate. A revoked grant stops the situation at once. <!-- Q3; Level 2 growth and policies -->

### Improvement

- Training-grade traces go to the improvement path, kept apart from business memory. They go there only with the business's written permission (recorded earlier). <!-- IB-14 -->
- Improvement never activates a business rule. <!-- R3 -->

### Redaction

- Before a trace goes to memory or to the improvement path, secrets, tokens, and credential-shaped content are stripped. <!-- U2 -->
- Each consumer gets only the fields on its own list. The default is nothing. The field lists are set at build time. <!-- U2 -->
- A builder's view of prompts is masked in production and fully visible in the simulation environment. This is a recorded decision. Level 2's explainability files stay as they are (decided 2026-10-09). The compliance rules sit on top of them, so personal data is masked in production. <!-- Level 2 explainability with compliance overlay -->

## The trace, the observer, and the completion check

### The trace

No personal data goes into a trace. The trace keeps references to records, not the personal data itself. Audit records keep those references. Level 2 says it: personal data never goes into traces (compliance and security file, line 238). The design follows that. Their retention period is one of the per-market values in Section 6, and a market is not entered until its values are set.

Every audit-classed run keeps these facts:
- identity: tenant, situation, the version it read, the trigger, the request, and the run ID;
- the grant the action ran under;
- the ask IDs and their endings;
- the execution evidence: calls, gathers, and timings;
- the proposal and the outcome of each check, with the shape and permission results kept separate;
- the reason, as a business reason, not internal reasoning;
- the reasoning summary, which admins and builders may see. Business and admin screens never show the AI's private reasoning;
- a private reasoning field, which may be empty, tagged for tuning only, and visible to the builder only;
- the outcome: the rest state, the wait reference, and any declared outcome;
- the flags that say whether the trace may be used for training. <!-- O4, D1 -->

Tend explains without being asked when the reason materially affects trust, responsibility, safety, or the recipient's next action. That covers a refusal or delay, uncertainty or conflict, a changed earlier answer, a recommendation of human involvement, an escalation, a fallback used because a policy was unavailable or unclear, and a consequential action. Otherwise an explanation is given when someone asks, and its depth depends on who asks. <!-- O4; Level 2 explanation -->

### The observer

The observer sends its observation changes onto the change channel, the same channel as everything else. It has no other way to send anything. It does not act on what it finds. <!-- IA-19 -->

These are health checks of the system. They are not status checks on situations. Probes run on the observer's schedule:
- a provider probe checks the AI and channel services;
- a golden scenario checks that the per-run steps have not drifted, and that no check was skipped;
- a completion sample checks that situations were not closed with an open question;
- an aggregate of capability-absent answers shows the product signal for missing sources. <!-- IA-19 -->

**Two watch lines.** Provider problems are watched on their own line. Harness problems are watched on another. A builder alert on the harness line can block a release. The provider line covers AI outages and channel error rates. The harness line covers drift in the steps and skipped checks. A package answer given for an unanswered tracking question is raised as a Class 2 alert. The operational alerts also cover spikes in tool denials, in outbound send volume, and in cost. They cover cross-business access errors, and outbound traffic outside the approved subprocessor list. <!-- IA-20; Level 2, security notes -->

### The completion check

Before a situation resolves or closes, the situation worker runs the completion check. It refuses to resolve while any of these holds:
- an open question has no ending: answered, waiting with a reason, escalated, capability absent (the customer still gets an answer), waived, or superseded;
- human work is still pending and needs completion;
- a capability-absent answer is presented as a success;
- a customer-facing claim has no evidence behind it.

The checks fall into classes. Class 2 is a harness defect: a situation closed with an open question. Class 3 is a grounding defect: a customer claim with no evidence behind it. <!-- IA-23 -->

Level 2 names five kinds of unexpected behaviour: invariant violations, completion-discipline violations, coherence failures over a threshold, drift signals, and operational anomalies. The probes above are not yet mapped to these five. That mapping is open.

**Decided:** the completion check must catch a payment reply that answers an open tracking question. <!-- IA-23, Level 2 explainability -->

## Walkthroughs

Each walkthrough is one real situation. The rules come from the sections above. Each walkthrough is named by its case.

## States of a situation, and who may change them

A situation is running, waiting, blocked, or completed.

- **Running:** the worker is working on it now.
- **Waiting:** parked until a named trigger wakes it.
- **Blocked:** no one is left to escalate to, and no safe next step is left. It does not move on its own. It stays visible until its blocking condition goes. The business owner sees it as a decision only the owner can make.
- **Completed:** resolved and closed. The situation is reopened only when the closure was wrong.

These are the same four names as in Level 2. Whether a wait is shown to the customer is decided by relevance: the conversation manager decides whether the update is worth telling.

| Change | Who makes it | When |
|---|---|---|
| Running to waiting | The situation worker only | It writes a wait record: subject, reason, timing class, resume trigger, release policy, escalation path. |
| Waiting to running | The situation worker, when a resume trigger fires. A time trigger wakes the situation worker directly. A message from a person goes to the conversation manager first, which records it and then starts the situation worker. | The resume trigger fires: someone answers, a watched state changes, a date arrives, or the check-in fires. |
| Running or waiting to blocked | The situation worker only | No one is left to escalate to, and no safe next step is left, after the escalation framework is spent. The reason is shown. |
| Blocked to running or waiting | The situation worker only | The blocking condition has gone, or a person answers. |
| Blocked to completed | The conversation manager, when the business stops the situation. | The reason is shown. |
| Running or waiting to completed | The conversation manager, after no wait is open and the last message has gone out. The worker cannot set completed. | The worker records the work as resolved, and the conversation manager concludes the conversation is over. |
| Completed to running | The situation worker only, and only when the closure was wrong | The same problem was resolved too early, or it came back. A new problem gets a new, linked situation. |

Two rules hold for every change:

- A time trigger wakes the situation worker only.
- The conversation manager never sets waiting or blocked.

The situation worker cannot set completed. Only the conversation manager sets it.

### The nurture loop

A nurture is a wait with a date.

- **A customer's message arrives before the date.** The conversation manager records the message as a new version, and the situation worker starts. The worker's next version writes Tend's reply and cancels the nurture wait, in the same version. The wait must be gone before the reply is sent, because the worker does not run again after the send. A timer that fires before that version wakes the worker. It reads the latest version, including the customer's message, so no nurture is sent. Then the conversation manager decides the reply is worth sending, and the communication layer sends it. The nurture ends unless the business's rule sets a new date. If it does, the worker sets a new wait for that date. If not, the worker records the work as resolved, and the conversation manager sets completed after the reply has gone out.
- **No customer message, and the date arrives.** The time trigger wakes the situation worker only. The worker reads all earlier messages from the customer and Tend's replies. It then writes the next nurture message as a new version. In that same version, it either records the work as resolved (no more nurture messages are due), or sets a new wait (one more is due). The conversation manager then concludes the conversation is over and sets completed, after the last message has gone out. The new version is a change for the conversation manager. It decides the message is worth sending. The communication layer checks the channel and consent rules, sends the message, and records it.

<!-- owner direction, agreed 2026-10-12 -->

### CASE-1: Priya's outreach, a customer message before the nurture timer

- The situation has a nurture wait scheduled for three days later. <!-- B2, A1 -->
- Priya writes back by email. The conversation manager records her message on the outreach situation as a new version. <!-- IB-2, T1 -->
- The situation worker cancels the nurture wait in the same version that carries its reply. The wait must be gone before the reply is sent, because the situation worker does not run again after the send. <!-- IB-3, T1; agreed 2026-10-12 -->
- The situation worker starts, reads the new version, and proposes a reply. Its new version cancels the nurture wait and carries Tend's reply. <!-- S1 -->
- The checks pass. The version is written, and its change is sent. <!-- S2, T2 -->
- The conversation manager reads the new version and decides the reply is worth telling. The communication layer checks it against the channel and consent rules, sends it, and records what it sent. <!-- IB-5 -->
- Three days later, the nurture timer would have fired. It starts the situation worker. The worker reads the latest version. The wait is gone, so nothing is sent. <!-- IB-1, IB-4 -->

**What this proves:** the timer never sends, the record is written in one version, and the sent reply is recorded.

### CASE-2: Inquiry, order, delay, and a refund with an unknown gateway outcome

- The refund is proposed. The permission check returns Allow for a refund within the threshold. A refund above the threshold returns StepUp, so a person must approve first. The approver's answer returns through the tool flow, and only then does the refund proceed. <!-- T2 -->
- The tool layer records its intent, calls the gateway, and gets a timeout. One status call is made, and it finds nothing. <!-- S7, M4 -->
- The tool layer's intent record stores the start, with its key. A second post is blocked while the outcome is unknown. <!-- S9 -->
- The version records the start, the unknown outcome, and a wait until the promised settle window ends. This is one version. <!-- IB-11 -->
- The wait is honest: it is not failed. The case stays waiting while the wait is inside its window. <!-- IB-10 -->
- The customer asks where the refund is. The reply comes from the situation record, not from a guess. <!-- I6 -->
- The AI proposes a second post. The duplicate check blocks it. The situation stays waiting. <!-- S9 -->
- When the window ends, the outcome is still unknown. Tend hands the case to a person with the full timeline. It does not redo the refund. <!-- IB-10, J1 -->

**What this proves:** the permission check and the duplicate check are separate. The unknown outcome stays on the record. On the next start, the permission store is read again, so a narrowed grant takes effect. <!-- AC-4 -->

### CASE-3: Investor diligence, deck and revenue

- An investor asks for quarterly revenue and the latest deck. No diligence situation is open. The conversation manager creates one at intake, and starts the situation worker. <!-- B2, T1 -->
- The situation worker records the request and its two asks. It writes the version. The conversation manager does not send a receipt. <!-- I1 -->
- The deck is listed in the file layer. Revenue is not. The run proposes to fetch the deck. <!-- D1, D6 -->
- The fetch passes the permission check. The approval step inside the tool runs, and the approver says yes. The file is returned. <!-- Section 8 fetch example -->
- The situation worker writes the version with the deck attached. The deck ask moves on. The revenue ask stays open. <!-- IB-7 -->
- The conversation manager decides the deck is worth telling. The communication layer sends the deck, with a line saying revenue is still being confirmed. <!-- I5 -->
- In parallel, the finance person gets human work for the revenue figure. If nobody acts, the escalation ladder runs. <!-- J2, J3, J5 -->
- If a later fetch is denied, the requester is told honestly that this item is not available to them, and why. The approval path is offered, and the escalation is opened. <!-- AC-3 -->
- When the revenue is confirmed, the situation worker writes it, and the conversation manager decides to tell the investor. <!-- IB-7 -->
- Before the situation resolves, the completion check confirms each ask has an ending. <!-- IA-23 -->

**What this proves:** a partial answer is sent plainly, no receipt is sent, and the fetch approval happens inside the tool.

### CASE-4: Stale or unavailable carrier tracking

- A customer asks where the order is. The delivery situation is open. The carrier's tracking tool is connected. <!-- D6 -->
- The conversation manager records the message on the delivery situation. The situation worker starts. It writes the new ask, and sends no receipt. <!-- I1, IB-2 -->
- The run proposes a status call. The tool retries within its limits, and the evidence comes back marked as stale or partial. <!-- E7, M4 -->
- If the carrier gives no usable answer within its bound, the situation worker writes a wait. The wait names its subject (the carrier tool), its reason (waiting for official tracking), its resume trigger (a timer, a tool result, or a partner reply), its release policy (an interim message if the response deadline passes), its escalation path, its timing class (bounded), and who can see it. <!-- H2 -->
- If the carrier answers but the status is not current enough, the situation worker records the claim with its currency. <!-- E3, E7 -->
- Before the promised response time is missed, the situation worker writes an interim update. The conversation manager decides it is worth telling the customer. The communication layer sends a plain update about the situation, not a tool log. <!-- I6, Level 2 communication -->
- The escalation path moves on, as the business configures it. A partner contact carries only the scoped payload. <!-- K4 -->
- If the next safe step needs a person or a partner, the wait carries the same escalation path. Past the bound, the path moves to the next step only if the business policy allows it. If the path is used up, the situation is shown as blocked, with its reason. <!-- H2, M6 -->
- If a customer's claim conflicts with the carrier's, the conflict is marked, and the evidence rules decide what can be said. <!-- E2, E3 -->
- When a timer fires, the situation worker re-reads the latest version. Inside the bound it makes one more status call or keeps waiting. Past the bound it records a declared failure. <!-- IB-1, IB-9, IB-10 -->
- The situation resolves only when its asks have endings. It does not say "delivered" while a high-consequence conflict stands. <!-- E2, IA-23 -->

**What this proves:** a down carrier is a wait, then a declared failure. It is not capability-absent, because a carrier source exists.

### CASE-5: Package status with no shipping source

- A customer asks where a package is. Payment and refund tools exist. No shipping source is connected. <!-- D8 -->
- The match step finds no shipping source. It asks whether a person can answer. <!-- D8 -->
- If a person can answer, Tend opens human work with the order details. It does not say the business has no shipping capability. <!-- J1 -->
- If no system and no person can answer, the situation worker records the capability-absent declaration as one version, with its evidence. This is outside failure handling. <!-- O10 -->
- The declaration is not a structural failure. Its evidence is a snapshot of the registry, and a record of the people check. <!-- D8, O10 -->
- The customer is told honestly that the package status is not available. The reply does not change the subject to payment. <!-- O10 -->
- The completion check refuses to resolve until the open ask has its ending. <!-- IA-23 -->

**What this proves:** a missing source is recorded as capability-absent, not as failure, and it is not answered with a different topic.

### CASE-6: A supplier sends a bill of materials without being asked

- A supplier emails the bill of materials for the next production run. Nobody asked for it. The sender matches the supplier's relationship situation, which is open. <!-- documents rule -->
- The conversation manager receives the message. The intake step matches the attachment to that situation, and files the document there with its date and sender. The document is linked to the business memory, so it can be found later. <!-- documents rule -->
- The communication layer sends no reply. The document is not a request, and nothing is promised. <!-- documents rule -->
- The situation worker records the document as a claim with its source. It does not treat the document as an order. <!-- evidence rules -->
- Later, the owner asks for the supplier's latest bill of materials. Memory returns the filed document, with its source and date. <!-- memory rules -->
- If the sender cannot be matched to a situation or a record, nothing is filed to a situation. A person sees the document. No action is taken on it alone. <!-- documents rule -->

## Anti-patterns (reject)

These are wrong. Each one names what to do instead.

- **One control service that runs both the loop and the grant checks.** Correct: the checks sit at each place an effect can happen. <!-- S, T -->
- **The timer sends a message.** Correct: the timer starts the situation worker only. <!-- INV-3 -->
- **The idempotency check used as the only refund check.** Correct: the permission check and the duplicate check are both required. <!-- IB-8 -->
- **A cached permission decides.** Correct: the trusted store is read at the check. <!-- AC-4 -->
- **A draft is sent.** Correct: only a saved intent is sent. <!-- IB-5, F2 -->
- **The AI checks its own proposal.** Correct: fixed code does the check. <!-- S2 -->
- **A learned lesson widens a grant.** Correct: only the configuration tools change grants. <!-- T8, IB-13 -->
- **A payment answer is given for a tracking question.** Correct: the capability-absent declaration is recorded. <!-- O10 -->
- **The conversation manager writes operational truth.** Correct: the situation worker writes conclusions. <!-- INV-1 -->
- **Checks on a timer for progress.** Correct: the check-in and the change channel carry progress. <!-- HC-3 -->
- **A receipt-style reply.** Correct: a material change is sent, and nothing else. <!-- Level 2 communication -->
- **A tool trace is narrated to the customer.** Correct: the situation is described. <!-- Level 2 communication -->
- **An AI tool asks for approval before the fetch.** Correct: the approval happens inside the tool. <!-- Section 8 fetch example -->
- **A partial answer is held until everything closes.** Correct: the partial answer is sent plainly, as partial. <!-- Level 2 communication -->
- **A fixed partner order or a fixed number of days.** Correct: the escalation path and the wait come from business configuration. <!-- K4 -->
- **A stale tracking answer treated as capability-absent.** Correct: a down carrier is a wait, then a declared failure. <!-- H3 -->

## Release checks (what the test suites prove)

| Check | What it proves |
|------|----------------|
| T-A, cross-tenant invoke | Tenant identity is set from verified identity (AC-1). The policy check denies (T2). Tenant isolation holds (U1). No provider is called. |
| T-B, poisoned CRM note proposes an export | Untrusted fields are marked (U2). AI output is data (S11). The policy check denies (T2). The trace is redacted. |
| CASE-5, package with no shipping source | Capability-absent is declared with its evidence. The completion check blocks resolve (D8, O10). |

These checks are release tests. A skipped test counts as a failed suite. <!-- U6 -->

## Decisions and open questions

**Decided (2026-10-09):**
- The writer rules from Section 7. Every write is a new version and announces a change. A write and its change happen in one run.
- Memory writes no truth. It proposes.
- The situation worker decides the next step.
- Retries happen in the tool layer. A send is a call through it.
- An unknown outcome of an irreversible action is never redone automatically.
- The harness does not check outside systems on a fixed timer. Repeated checks are bounded, and they belong to the separate status-check service.
- A resend with the same key happens only when the other side honours the key.
- For Tend's own waits, the internal settle window is the business's service level for the wait, with a default the configurator can change. Level 2 uses the promised settle window for the outside party's promise.
- A change to a business setting does not start the situation worker. A platform-rule change does: it starts each open situation to re-check what is allowed now. Open situations keep their pinned policies.
- The conversation manager decides whether an update is worth telling the person. Level 2's communication file says the same. The owner made those edits on 2026-10-09, and they are confirmed.
- The approval result returns through the tool flow.

**Provisional:**
- Status checks are bounded: five is the working bound (decision 7), set in configuration.
- Short status checks only where the outside system's behaviour is known.
- The completion check runs in the situation worker's validation, before a situation resolves.
- The owner's subscription changes only the delivery channel.
- Past a wait's bound: unknown for an irreversible action, failure for a status wait that no source answered.

**Settled here:**
- The numbers for the proposal limits (hops, calls, and cost) are set per business in configuration, with the Level 2 example values as defaults.
- The owner view's lag when a system is down is set per business in configuration. The design sets no figure.
- The field lists per consumer, set at build time. The default is nothing.
- The unknown-outcome rule covers irreversible actions only, as Level 2 says.

## Related

- [`section_7_boundary_model.md`](section_7_boundary_model.md): the parts and the writer rules this section uses
- [`section_6_responsibility_model.md`](section_6_responsibility_model.md): the rules these steps carry
- [`code_index_section_8.md`](code_index_section_8.md): agent-only index of every code, its meaning, and its source
- [`archive_section_8_before_plain_rewrite.md`](archive_section_8_before_plain_rewrite.md): the earlier Section 8, with its pass history
- [`construction_record.md`](construction_record.md): how this section was reached

## Concluding audit additions (2026-10-12)

### Waits and blocked work

- A blocked situation does not wake on a check-in. It wakes when its unblock condition is met, or when a person acts. <!-- Level 2 coordination: represent_work_blocked -->
- A new event attaches to an identical open wait (same subject, kind, and purpose). It does not open a second one. <!-- Level 2 coordination: prevent_duplicated_work -->
- A watch is a wait for a change of state. A watch is kept as a wait in the book of waits, not as a separate record. <!-- Level 2 coordination: represent_work_waiting -->
- A promised response time and a promised resolution time are different promises. <!-- Level 2 time; Section 9 -->
- A check-in is the only periodic wake for a situation. No other recurring check exists. <!-- Level 2 time: when_should_waiting_end_automatically; Level 2 explainability -->
- Timeouts and check-in lengths are configuration. No default value is set. <!-- Level 2 time; Section 9 -->

### Handoffs and escalations

- A handoff moves the work to a person. An escalation raises the work's priority or who must act. The two are recorded as different events. <!-- Level 2 human collaboration -->
- A handoff carries the reason, the deadline, the authority, and the scope of the work. <!-- Level 2 human collaboration: transfer_work_between_employees -->
- The order and timeouts of the escalation ladder are set by each business. The design sets no default order. Each business sets it in configuration. <!-- Level 2 failure and human collaboration; Section 10 -->
- The outcome of a meeting creates the next work item, with a named owner. <!-- Level 2 meetings: represent_who_is_responsible_for_the_next_step_after_a_meeting -->
- Counts of cancelled and missed meetings are worked out from the record, not stored as separate counters. <!-- Level 2 meetings: handle_a_meeting_that_is_cancelled_missed_or_rescheduled -->
- The meeting floors, waivers, and expiry rules are set by each business, and their values are set in configuration. The design gives no values. <!-- Level 2 meetings -->

### Messages, hours, and timing

- Messages and bookings respect the business's hours for each location. Outside those hours, a message waits for the next allowed time, or goes to a person. <!-- Level 1 framing; research: logistics and scheduling -->
- A delay notice is due before the customer complains, when a promised time is at risk. <!-- research: logistics; Level 2 failure: the customer clock -->
- The wait before asking a customer for feedback is set by the business. The research values (7 to 60 days) are examples, not defaults. <!-- Section 6 existing; research: scheduling -->
- Nurture follows the business's cadence, not a universal timer. <!-- Level 2 journey: J7:18 -->

### Explanation, wording, and corrections

- Tend's messages say what happened, why, and what happens next. <!-- Level 2 explanation -->
- Messages do not blame the customer, and do not promise results or compensation that Tend cannot give. <!-- Section 8 existing (no-promise rule); Level 2 communication -->
- When a new claim makes a sent message misleading, a correction is sent. <!-- Level 2 trust: how_do_we_resolve_conflicts; research: trust -->
- By default, a customer is not asked to confirm before a record is shown to a person. A business can add that step. Call (not yet confirmed). <!-- research: human collaboration -->
- Investor and regulator disclosures need an authorised person. Each disclosure to an investor or a regulator needs approval from a named person. Call (not yet confirmed). <!-- research: human collaboration -->

### Approvals, testing, and release

- A change to a prompt, a tool, or the catalogue reruns the test suites before release. <!-- research: security and compliance (T-A and T-B tests); software factory -->
- Each authorisation branch has a two-shop test. Named test suites cover each test matrix. A golden run is required before release. The release gate checks the catalogue hash, and each release has a kill switch. These are builder obligations for the Level 3 handoff. <!-- software factory P-d, P-e, P-f, P-g -->
- Approval volume is bounded, and the bound is **Open**. <!-- research: security and compliance (approval fatigue) -->

### Improvement

- Changes to the optimiser are accepted only after the validator, the golden scenarios, and a review. <!-- Level 2 prompt constitution: PC:41 -->
- Golden scenarios include the expected refusals, not only the expected steps. <!-- Level 2 prompt constitution: P2:45 -->
- The four layers of prompt text each have an owner: the universal core, the stage constitution, the assembly templates, and the business's wording. <!-- Level 2 prompt constitution: P2:19-22 -->
- Product-owned strings are fixed. Business wording is configurable. <!-- Section 6 existing; software factory P-j -->

### Owner notices

- Owner notices can be batched. The batching window and the quiet hours are set by the business. Who sets them is **Open**. <!-- research: product design (notices) -->

### Further additions: communication, waits, and records

- A message to a person has three separate gates: its purpose and legal basis, the consent it needs, and the channel window it fits. Each gate is checked on its own. <!-- Level 2 channels -->
- A channel window is a wait. It opens on an event and closes at a set time. <!-- Level 2 channels -->
- **Swaraj's decision (2026-10-12):** a person who writes to us on a channel has given consent for replies on that channel. A customer's message opens a window. It does not by itself allow a message the business starts. The channel's own rules decide that. Email needs consent and an unsubscribe route. <!-- Level 2 channels: consent; research: channel_compliance_matrix -->
- Consent is recorded with who gave it, the contact, the purpose, the scope, and how it is withdrawn. <!-- Level 2 channels: record of consent -->
- Contacting an employee for their job does not need the consent a customer gives. <!-- Level 2 channels -->
- A message about a conflict is neutral. It makes no accusation. <!-- Level 2 communication -->
- Tend asks a person only for what a source cannot provide. <!-- Level 2 communication: asking -->
- Tend does not tell a customer they are wrong. It shows what the record says. <!-- Level 2 communication -->
- A customer's message keeps continuity: what was said before, what comes next, and no blame. An employee's message gives the deadline, the authority, and the attempts already made. <!-- Level 2 communication: how communication differs -->
- A provisional reading is never presented to the customer as confirmed. <!-- Level 2 communication: uncertainty -->
- A change that would surprise the person is told before it happens. <!-- Level 2 communication: when to communicate -->
- An explanation states the reason, the evidence, and the next step. <!-- Level 2 communication: explanation -->
- A wait is either silent or acknowledged to the customer, and the wait says which. <!-- Level 2 communication: waiting -->
- A check-in is removed when its situation completes, and it never fires again. <!-- Level 2 time -->
- A wait ends when there is enough of the result, not when every call has returned. <!-- Level 2 time -->
- Each wait records its level, its subject kind, and its reason. <!-- Level 2 time -->
- If the outcome of an action is unknown and no check path exists, the situation waits for a person. The rule for each such case is **Open**. <!-- Level 2 failure; Section 10 -->
- A declared failure states the bound that was crossed, when it was crossed, the latest state, and the reason. <!-- Level 2 failure -->
- A credential or sign-in failure is a named failure class. <!-- Level 2 failure -->
- Gate and refusal messages say what happened, why, and how to recover. <!-- Level 2 communication -->
- A summary keeps the decisive facts: the state, the deadline, and who acts. <!-- product design folder -->
- The completion check runs during a situation, not only when it closes. <!-- harness study -->
- Human work is created when continuing would need unsupported judgement, an unconfigured business choice, unresolved material evidence, or an accountability the business must hold. <!-- Level 2 decision making: which decisions must always involve a person -->
- Availability for a meeting comes from the calendar. A booked slot is held until it is confirmed or released. <!-- research: scheduling -->
- A product or model change is checked against the golden scenarios before it is used. <!-- harness study -->
- A draft in the business's voice is checked for language and tone before it is sent. <!-- Level 2 prompt constitution: P1:43 -->
- Each step records a reason from a fixed list. <!-- Level 2 explainability -->
- Alerts reach the business owner at once. Nothing waits to be found in a list. <!-- Level 2 explainability: always visible -->
- The owner can see what woke a situation. <!-- Level 2 explainability -->
- The owner can open six views: an assignment list, a situation card, a waiting view, an attention feed, an evidence view, and a completed-outcome view. They can be searched and filtered by topic. <!-- Level 2 business view: snapshot -->
- Drill-down follows the same permissions as the view it starts from. <!-- Level 2 explainability -->
- The AI's instructions carry no system details. Business knowledge comes from memory, not from the instructions. <!-- harness study -->
- The optimiser's changes are accepted only after the validator, the golden scenarios, and a review. <!-- Level 2 prompt constitution: PC:41 -->
- Owner notices are batched or sent at once, as the owner's configured rule says. The window and quiet hours are **Open**. <!-- research: product design -->

### Consent and transfers

- Withdrawing consent stops every future message that the consent covers. <!-- architecture rule; Level 2 records withdrawal but does not state the rule -->
- A transfer is accepted automatically only when the business has set an auto-accept rule. The approval class is recorded on the work item. <!-- Level 2 human collaboration -->
