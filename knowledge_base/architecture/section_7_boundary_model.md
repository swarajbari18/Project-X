# Which parts of Tend do the work, and who writes what?

<!-- Plain-language layer. Every rule code sits in a hidden comment, for agents to link and trace. Meanings and sources are in code_index_section_7.md. The earlier version is in archive_section_7_before_plain_rewrite.md. -->

## Status

Working. Rewritten in plain language on 2026-10-09. It replaces the 2026-10-08 version, which used different names for the parts.

**Decided:** the rules below, except where marked **Open** or **Provisional**.

**Open:** items that Level 2 does not settle, or where sources disagree. Each open item states my recommendation. A recommendation is not a decision.

**Provisional:** in use, but may change.

## The standard for this section

Level 2 is the standard. Where Level 2 disagrees with another source, Level 2 wins. The Product Vision, the research folder, and the agent harness study apply where Level 2 is silent. Where the Product Vision disagrees with Level 2, Level 2 governs, and the Product Vision wording is flagged for Swaraj to change.

## What this section decides

This section says which part does each job, and which part writes each kind of change to a situation's record. Section 6 lists what Tend must do.

A part is a group of work that:

- does one job;
- writes one kind of change, or a small set of kinds;
- can be changed, run, and fixed together.

A part is not justified by a name, a database, a queue, or a server.

## Terms used in this section

- **Situation record:** the one record of one operational problem. It is a list of versions. Each change is a new version. It is the shared place where the parts write, and it is not a part that acts.
- **Version:** one saved state of a situation record.
- **Change:** a short signal that a version was written. It starts the other part.
- **Situation worker:** the running part that reasons about one situation. It gathers, decides the next step, and writes what Tend concludes.
- **Conversation manager:** the whole system that reacts when something happens (a new message, a change in a situation, or a time signal) and sends messages to people. Its parts are the intake step, the situation worker, and the communication layer. Tools are a different context, and they are not part of it. A time signal goes straight to the situation worker. It never goes to the intake step or the communication layer.
- **Communication layer:** the part that shapes, checks, and sends messages. It records what it sent.
- **Decision Making:** the step where Tend decides what to do next. Level 2 calls it Decision Making. In this architecture it is a step inside the situation worker's run. It is not a separate part.
- **The AI:** the language model that suggests the next step. It never decides alone.
- **Fixed code:** code that always makes the same check. It is not an AI's judgment.
- **A grant:** the range of actions the business allows Tend to take without asking.
- **StepUp:** a check result meaning a person must approve before the action runs.
- **Short status check:** a status check repeated over a short interval.
- **Promised settle window:** the time an outside party promises for an outcome to settle. Level 2 uses this term. **Internal settle window:** Tend's own bound for a wait. It is the business's service level for that wait, with a default the configurator can change.
- **Tenant:** one business that uses Tend. Its data is kept apart from every other business's data.
- **Harness:** the fixed code around the AI. It runs the steps, checks each proposal, and saves each version.
- **Registry:** the list of a business's settings: its sources, channels, and values.
- **Change channel:** the internal route that carries changes between parts. A **messaging channel** is WhatsApp, email, or another route to a person.

## The parts

| Part | What it does, in plain words | Section 6 rules it carries |
|------|------------------------------|----------------------------|
| **Situation record** | The record of one situation, as a list of versions. | <!-- A1, A6, A9 --> The record of each situation. |
| **Situation worker** | Gathers, decides the next step, and writes what Tend concludes: facts, conflicts, waits, outcomes, human work, closure. | <!-- C, D, E, F, G, H, J, K, M, O10, P1–P3 --> |
| **Conversation manager** | The whole system that reacts to a new message, a change, or a time signal, and sends messages to people. It contains the intake step, the situation worker, and the communication layer. Tools are outside it. | <!-- B, parts of I and L --> Routing, intake, and sending. |
| **Communication layer** | Shapes, checks, and sends messages. Records what it sent. | <!-- I, L --> Expression, consent, and channel rules. |
| **Memory** | Observes work, learns, keeps business knowledge, and proposes links and candidates. Writes no truth. | <!-- N --> |
| **Owner view** | Views for the owner, the admin, and the builder, worked out from the records. | <!-- O, T11 --> |
| **Tool layer** | Every call to an outside capability. Checks permission first, retries transient failures, records intent before an irreversible effect. | <!-- S, T, M4 --> |
| **Status-check service** | Runs status checks for outside systems. Sends results back to the situation. | **Decided** (see the status-check section below) |
| **Configuration** | The only writer of grants and of the business's registry values, through fixed tools. | <!-- G7, T8, Q1–Q5 --> |
| **Improvement** | Improves how Tend behaves, from verified traces. Never changes business rules. | <!-- R1–R3 --> |

The observer is a function that runs alongside all of these. It emits observation changes. It is not a part of its own.

## Who writes what to the situation record

**The principle.** What comes in from outside is written by the conversation manager. What Tend concludes is written by the situation worker. What is sent is recorded by the communication layer. Memory proposes and writes no truth.

**Every write is a new version, and every write sends a change.** The change tells the other part that something changed. A write and its change happen in the same run. A write without its change is incomplete and is retried. <!-- Level 2 coordination: write and announce together -->

| Update | Written by | Level 2 category | Notes |
|--------|------------|------------------|-------|
| Create the situation (first version) | Conversation manager (writes what came in as the first version) | Understanding (routing) | At intake, from the first message or change. |
| Record an incoming message: attach it to a situation, create one, or keep it until it can be routed | Conversation manager | Understanding (routing) | Routed before anything is gathered. |
| Gathered facts and claims | Situation worker | Gathering | Each with its source and time. |
| Conflict recorded | Situation worker | Understanding | Conflicts are kept visible, not resolved by guessing. |
| Correction | Situation worker | Understanding | If the correction arrives as a message, the conversation manager records the message, and the worker writes the correction. |
| The decision about the next step | Situation worker, inside its run | Decision Making | Not a separate part. |
| Communication intent (what should be said) | Situation worker | Communication | The worker never sends. |
| Whether an update is worth telling the person | Conversation manager | Communication | It reads each update and decides. |
| Record of what was sent | Communication layer | Communication (Level 2 states the need) | Each message sent is recorded in the communication layer's own record of what was sent. A delivery acknowledgement is recorded there too, not as a situation version. |
| Wait written, refreshed, or finished; timer or check-in result; outcome declared; closure | Situation worker, which records the work as resolved. The conversation manager sets completed, only after no wait is open and the last message has gone out. | Time, Coordination, Failure | Time produces changes only. |
| Human work item created | Situation worker | Human Collaboration | The behaviour creates the responsibility. |
| Human answer recorded | Conversation manager | Human Collaboration | It arrives as an incoming message. |
| Link proposed | Memory, or the conversation manager | Memory; Understanding | See the links section. |
| Link accepted or denied | Situation worker | Understanding | On evidence only. Denial is allowed. |
| Lesson or configuration candidate | Memory | Memory and knowledge | A candidate, not truth. A configurator validates a configuration candidate. |

**Recorded as decided on 2026-10-09, and Level 2's communication file says the same:** the conversation manager decides whether an update is worth telling the person. Decision Making chooses the next behaviour. The name of this choice is the update decision, which you decided.

## How the two parts work together

Take a customer who writes "Where is my order?"

1. The conversation manager records the message on the order's situation record, as a new version. That version emits a change.
2. The change starts the situation worker. It reads the situation record, decides the next step, and checks the carrier. It writes the result as a new version. That version emits a change.
3. The change starts the conversation manager. It reads the update, and decides whether the customer should hear it now. If yes, it passes the message to the communication layer. The communication layer checks the channel and consent rules, sends the message, and records what it sent.

The two parts never call each other directly. The situation record and its changes are the only connection between them.

## Links between situations

**What a link is.** A link is a Tend record that connects two situations. It holds the two situations, the reason they are connected, the type of connection, and when it was created. It is a saved record, not memory. A link is not a merge. Each situation keeps its own record. <!-- Level 2 understanding: a link is a Tend artifact -->

**When a link exists.** Only when there is a real shared reason, such as the same order, the same incident, or one situation's outcome affecting the other. Identity alone is never a reason. When unsure, there is no link until evidence appears. <!-- Level 2 understanding -->

**Who proposes.** Memory proposes links. It proposes them when asked for related situations, and from the trace of finished work. The conversation manager may also propose a link when it creates a situation, for example a second outreach linked to a closed one.

**Who decides.** The situation worker accepts or denies each proposal, on evidence. It may deny. A proposal with no evidence is never accepted.

**Who writes an accepted link.** The situation worker writes it, as a new version that records both situations and the reason. <!-- Owner decision (Swaraj): memory proposes, the situation worker accepts or denies on evidence -->

## The owner view, admin, and builder

<!-- B-Visibility -->

**The base.** Level 2's explainability design is the base. Compliance requirements are added on top of it. They change what is shown where they require it, and nothing else. This is a change to a Level 2 rule: Level 2 gives the builder a complete view in both development and production. Compliance changes the production view, as decided below.

**What compliance adds.** Masking of personal data. Renaming where required. Time-limited access. Ticketed and audited access for the builder. Business and admin screens never show the AI's private reasoning. No secrets or personal data in traces. Subprocessor and processor controls.

**The simulation environment.** It runs on seeded test data only, never on real business data. The builder sees everything there, because none of it is real. It stands in for production, so it must show the same shape as production.

**Production.** The builder sees only the masked and renamed views of what it built. It does not see the whole business. To see a live business's internals, the builder needs the business owner's permission, given from the owner's account.

**The owner.** Sees the snapshot and the business-value view set out in Section 6. The owner never sees operational metrics such as uptime or message counts. The owner sees three classes of items: decisions only the owner can make, deadlines or notices that put the business at risk, and escalations that have drifted past everyone assigned. Level 2's note also lets a meaningful change reach the owner at once when it changes the business's next decision.

**The owner and the audit trail.** A non-admin owner has no access to the audit trail by default.

**The admin.** Level 2 treats the administrator as the configurator. The admin sees business configuration, grants, approval history, the audit trail, declarations, and masked traces on demand. Never sees the AI's private reasoning.

**A solo owner** is the owner and the admin in one person. The solo owner sees what the admin sees, as the product design decides.

**Who may grant audit access.** A person who holds the power to grant it: the owner, the admin (the configurator), or a person the owner has given that power. Grants are configuration, not a switch. The configurator's agent applies a grant when the configuration allows it, and denies the request when it does not.

**Recorded as decided on 2026-10-09 (to confirm).** In production, prompts with personal data are masked. In the simulation environment, everything is visible. Level 2 gives the builder a complete view and does not say how prompts are shown, so this rule conflicts with Level 2 on the production view. The owner decides (Section 10).

**Recorded as decided on 2026-10-09 (to confirm). Level 2 is silent on this point:** the owner sees their own customers' data unmasked. Masking applies to the builder and admin views.

**Recorded as decided on 2026-10-09 (to confirm). Level 2 is silent on this point:** every admin read of the audit trail is logged.

**Recorded as decided on 2026-10-09 (to confirm). Level 2 says only that tenant data is not used for training by default:** tenant data is not used for AI training without the owner's written permission. Level 2 does not mention written permission.

**Recorded as decided on 2026-10-09 (to confirm). Level 2 puts the audit trail in the administrator's set and does not state an owner default:** the owner may not see the audit trail by default.

**Set per business:** the owner view's lag when it is down, in configuration. The design sets no limit.

## The tool layer

<!-- Adjacent-Tool -->

**Job.** Every call to an outside capability goes through here. It checks permission first, retries transient failures, records intent before an irreversible effect, and returns structured evidence.

**Writes.** The retry state of each call, and the intent record before an irreversible effect. The situation worker records the outcome.

**Does not.** Decide the next step. Write the situation record. Check status. Status checks belong to the status-check service.

**Rules it carries.**

- Before any call, the policy check runs: Allow, Deny, or StepUp. <!-- T2, T4 -->
- A tool never starts before its permission is confirmed. <!-- T4 -->
- The permission store that holds the current permissions is read at the moment of the check. A cached copy never decides. <!-- T5 -->
- Permission is checked again at each action within a run. <!-- T6 -->
- A StepUp goes through the approval tool, which is part of the tool layer. The AI never calls the approval tool. <!-- T7 -->
- Transient failures are retried here, with bounded backoff. The AI never retries. <!-- M4 -->
- Before an irreversible effect, the intent is written. The audit record comes before money moves. <!-- S7 -->
- Tools return structured evidence only. The situation worker interprets it. <!-- S8 -->
- Before an irreversible action, the situation record is checked for an earlier attempt. This check does not replace the permission check. <!-- S9 -->
- AI output is data. It is checked against a schema and is never instructions. <!-- S11 -->
- Every decision and action is written to an append-only audit record, without secrets. <!-- T9 -->

**Example: the fetch file tool.** The AI calls one tool, `fetch_file`. It has no separate approval tool. Inside the tool, fixed code checks whether the file needs approval, and runs the approval if it does. The tool returns one of three results: the file, with a summary; a denial, saying the request is behind authorisation; or a failed approval, because the approval timed out. The AI then decides what to say next. It never decides whether the file is released. <!-- T2, T4 -->

## The status-check service

<!-- Adjacent-Poll -->

**Status: recorded as decided on 2026-10-09.** The harness never checks on a timer. Status checks run in a separate service. That service runs each status check, and sends the results back as messages to the situation. Short status checks are used only where the outside system's behaviour is known. <!-- S6 H8, M5 -->

**Recommendation:** the status-check service is its own part, because it serves many situations at once. Technical detail is for Level 3.

## Configuration

<!-- Adjacent-Config -->

**Job.** The only path that writes grants and the business's registry values. It runs through fixed tools only.

**Writes.** Grant records, the registry of business values, and the schemas that validate them. <!-- G7, T8 -->

**Does not.** Let an AI, a runtime agent, or memory change a grant. Memory proposes candidates; this part applies them after validation.

**Rules it carries.**

- Grants and registry writes are made only by the configurator's fixed tools. <!-- G7, T8 -->
- The configurator is a role, held by the signup owner or by a person the owner assigns. That person works through the configurator's agent, which holds the fixed tools. <!-- G7 -->
- Business settings are a typed registry: schemas, values, and validation. A setting is a record, not free text. <!-- Q1 -->
- A new capability, system, or channel enters through the catalogue lifecycle: request, evaluate, author, contract, validate, test, enable, monitor, retire. A business policy follows its own lifecycle: draft, validate, activate, version, replace or expire, retire. <!-- Q2 -->
- Business policies and workflows are fixed when a situation opens. Facts, platform rules, and grants are live. A platform-rule change starts each open situation to re-check what is allowed now. A business-setting change does not start it. Any other change reaches an open situation only by deliberate migration. <!-- Q3 -->
- Missing or unsupported configuration is shown as a visible gap, never silently refused. <!-- Q4 -->
- A setting that needs a core change was put in the wrong place. <!-- Q5 -->
- Structured configuration is checked against its schema before it is applied. <!-- S2 -->

**Decided:** the configurator may not hand its power to another person.

## Memory

<!-- B-Memory -->

**Job.** Observes what the work did, learns from it, keeps business knowledge, and supplies the context each step needs.

**Writes.** Memory items: the business knowledge it keeps ready for use, learned lessons, and candidates. It proposes links. It writes no situation record.

**Owns.** Its own experience record: what it proposed, what it used, and what it learned. It keeps the business's knowledge ready for use, but the business owns that knowledge (Level 2). It owns the configuration candidates it proposes and the retrieval indexes. It also owns the prompt assembly templates, which the improvement part may edit only as Section 6 allows.

**Does not.** Change a business rule, a grant, an approval, or a permission. Send a message. Write the truth of a situation. Apply a configuration change.

**Rules it carries.**

- Each decision step, and each routing step, gets only the memory it needs, not a full dump. <!-- N1, N11 -->
- Closed situations inform new ones only through links and relevance. <!-- N2 -->
- Memory keeps the experience of what happened. <!-- N4 -->
- Each memory item points to the situation, experience, claim, version, or correction it came from. <!-- N5 -->
- Traces are recorded for memory, asynchronously. Recording a trace does not switch learning on. <!-- N6 -->
- Learning is on by default. A configurator can switch it off, or require a person to validate each lesson. <!-- N6 -->
- Candidate lessons come from external failure signals, not from self-reflection alone. <!-- N7 -->
- A new lesson is matched against existing claims. An ambiguous match never overwrites silently. <!-- N8 -->
- Each learned item has a lifecycle: active, stale, superseded, conflicting, retired, or unresolved. <!-- N9 -->
- Before a lesson is kept, Tend re-runs old cases to check that it does no harm. Harmful lessons are reversed. <!-- N10 -->
- Business vocabulary and conventions are business knowledge. <!-- N12 -->
- Memory proposes configuration candidates. A configurator validates each one. Only the configuration tools apply it. <!-- N13 -->
- Structured values belong to the configuration part. Prose preferences are placed by memory at the step that writes a reply, and the business owns their text. <!-- N14 -->
- Business content learning is kept apart from product behaviour improvement. <!-- N15 -->
- Each memory item keeps its origin, scope, version, and how far it may influence decisions. Memory is advisory. <!-- N16 -->
- Credentials, secrets, and authentication material are never stored as business memory. <!-- N17 -->
- Memory's loader output is checked against its schema before it is used. <!-- S11 -->
- Missing memory never blocks a decision. The situation worker treats the gap as a gather step, or as capability-absent. <!-- D8, O10 -->
- Activating memory does not run its own permission check. The situation worker checks permission for each effect. <!-- T2 -->
- Before trace content goes to memory or to the improvement path, it is redacted. <!-- trace redaction gate -->

**Recorded as decided on 2026-10-09 (to confirm). Level 2 is silent on this point:** memory observes the configurator's setup sessions, but only proposes candidates, which a configurator validates.

## Improvement

<!-- Adjacent-Improvement -->

**Job.** Improves how Tend behaves, from verified traces. Keeps training traces apart from business memory.

**Rules it carries.**

- Traces kept for product improvement are separate from business memory. <!-- R1 -->
- Prompt optimisation is limited to the memory-owned assembly templates. The product constitution stays human-edited. <!-- R2 -->
- Behaviour improves from verified traces. Business rules are never placed in AI weights. <!-- R3 -->

## The observer

<!-- O8 -->

The observer is a function that runs alongside the parts above. It emits observation changes onto the change channel: probe results, drift signals, and breaches of the completion rules. It does not act on what it finds. The owner view shows the results. Anomalies inside a situation are recorded through the situation record.

## Records of consequential actions

<!-- O7 -->

**Rule.** Every consequential action leaves one complete record. The record says what was done, which evidence was used, which grant the action ran under, why it ran, and what the outcome was. An action is consequential when it is important enough to enter the audit, as the Failure declaration rules define it.

**Who writes it.** The part that performs the action writes its record, in the same run as the action. For a sent message, that is the communication layer. For a tool call, that is the tool layer. This section does not decide who may approve an action or who answers for it. Level 2's authority and ownership folder covers that.

**How the records connect.** Each record carries a run ID, a situation version, and a situation ID. Together they connect an action to its reasoning, its place in the situation's history, and the person's journey.

**Check.** A write without its record is incomplete and is retried. Level 2 names no checker for record writes. Decided 2026-10-09, recorded: no separate checker.

**Storage.** Where the audit is stored, and how it is indexed, is a later technical decision. The logical record is one rule. It is not one store.

## Failure and unavailability

- If a part cannot be reached, its waits stay honest inside their bounds. Past their bounds, the situation worker records a failure. <!-- M2, H3 -->
- If the owner view is down, the record is not affected. The owner's attention may be delayed. Level 2 sets no limit. <!-- O3 -->
- If the conversation manager is down, incoming messages wait. Nothing is sent. <!-- S12 -->
- If the tool layer is down, the situation worker does not save a change that depends on it. <!-- M4, S4 -->

## The rules that join the parts

These are the connections between the parts. Each one is a rule the parts must follow.

<!-- IB-1 to IB-14, IA-1 to IA-13, HC-1 to HC-3, AC-1 to AC-4 -->

- A timer starts the situation worker only. <!-- IB-1 -->
- An incoming message is routed to its situation before anything is gathered. <!-- IB-2 -->
- Tend's reply and the cancelling of the wait it answers are saved together, as one version, by the situation worker. The customer's message is recorded first, as its own version. <!-- IB-3 -->
- A timer re-reads the latest version before any outgoing decision. A superseded wait sends nothing. A late timer does nothing, and it is not an error. <!-- IB-4 -->
- An outgoing message needs a saved send decision, an Allow from the policy check, and the content rules. <!-- IB-5 -->
- The conversation manager writes the first version of a new situation at intake. There is no empty record. <!-- IB-6 -->
- Tools return structured evidence to the situation worker, and never write claims into the situation record. <!-- IB-7 -->
- Before an irreversible action, the situation record is checked for an earlier attempt, and duplicates are blocked. This is not an approval check. <!-- IB-8 -->
- An unknown-outcome recheck is a timer that starts the situation worker, and uses the same status path. It is not a separate tool or action. <!-- IB-9 -->
- An unknown outcome on an irreversible action keeps the situation waiting until the promised settle window is spent. <!-- IB-10 -->
- Starting an action, recording it as unknown, and waiting are saved in one version. <!-- IB-11 -->
- Worker traces go to memory asynchronously, and never block a save. <!-- IB-12 -->
- Memory may propose configuration. Only the configurator's fixed tools apply it. <!-- IB-13 -->
- Training-grade traces feed product improvement, kept apart from business memory. <!-- IB-14 -->
- A situation version is saved and announced as one unit. An unannounced save is retried. <!-- HC-1 -->
- The conversation manager works out what an incoming message means, and routes it. Only the situation worker writes conclusions. <!-- HC-2 -->
- Every wait is written to the book of waits, with its start trigger. One check-in per situation is the only periodic backstop. No part of Tend asks an outside system "is it done yet?" on a schedule. <!-- HC-3 -->
- The identity of a run is set once, from verified identity, and never from message text, links, or tool arguments. <!-- AC-1 -->
- Before any outgoing message, a fixed check returns Allow, Deny, or StepUp. <!-- AC-2 -->
- Approval returns through the tool flow. A denial ends that proposal, not the situation. The tool checks again before it acts. <!-- AC-3 -->
- Allow and deny decisions read the trusted permission store, never a cache. A cache only speeds up reads of context. The configuration part is the only writer of the trusted permission store. <!-- AC-4 -->

## Reopening a situation

A closed situation stays closed. It is reopened only when its closure was wrong: the same operational problem was resolved too early, or it has come back. Any other new problem is a new situation, linked to the closed one. A closed situation is looked at only when the message refers to it explicitly. The intake step applies this. <!-- A7, A8 -->

**Decided:** "reopened" is a mark on the same situation record. It is not a new record. <!-- A8 -->

## Decisions and open questions

**Decided (Swaraj accepted the recommendations, 2026-10-09):**

1. **Builder and prompts.** In production, prompts with personal data are masked. In the simulation environment, everything is visible.
2. **Owner and their own data.** The owner sees their own customers' data unmasked. Masking applies to the builder and admin views.
3. **Admin reads of the audit trail.** Every admin read is logged.
4. **Tenant data for training.** No, without the owner's written permission.
5. **Owner access to the audit trail.** No by default.
6. **Memory and setup sessions.** Memory observes setup sessions and proposes candidates only. A configurator validates them.
7. **The status-check service.** Its own part, with results returned as messages to the situation. Technical detail is for Level 3.
8. **Record checks.** Recorded earlier: no separate checker, to confirm. A write without its record is retried. Level 2 names no checker.
9. **Consent withdrawal.** Withdrawal stops every future message to that person. Level 2 records withdrawal in consent records but does not state this rule.
10. **Product Vision wording.** Changed in the architecture. The Product Vision itself is not yet changed. The communication layer expresses; Decision Making decides the next step; the conversation manager decides whether an update is worth telling the person. Level 2 was changed to match by the owner (2026-10-09).
11. **Platform-rule changes start open situations.** Business-setting changes do not. Recorded as decided on 2026-10-09 (to confirm).

**Settled here:**

- **The choice to speak.** It is named the update decision (decided 2026-10-10). It asks one question: is this change worth telling the person?
- **Who writes the first version at intake.** The conversation manager writes it (agreed 2026-10-12).
- **Who cancels a nurture wait when a reply arrives?** The situation worker does, in the same version as Tend's reply. This was agreed on 2026-10-12.
- **The record of what was sent.** Level 2 states the need: communication produces a record of each message, its reason, the evidence used, the next responsibility, the wait, and the result. The communication layer writes it as a version, with a change. How that record is laid out is a Level 3 matter.
- **Configurator passing its power.** It may not.
- **Owner-view lag when it is down.** No limit in Level 2. Not blocking: the owner view is built on request.
- **Who checks record writes?** Nobody separate. This was decided on 2026-10-09 and recorded. If a write fails, it is retried. Level 2 names no checker.
- **Status checks: how many inside one tool.** Level 2 allows a small number. The working limit is five (decided 2026-10-10). A business may set its own number.

## Related

- [`section_6_responsibility_model.md`](section_6_responsibility_model.md): the rules these parts carry
- [`code_index_section_7.md`](code_index_section_7.md): agent-only index of every code, its meaning, and its source
- [`archive_section_7_before_plain_rewrite.md`](archive_section_7_before_plain_rewrite.md): the earlier Section 7, with its pass history
- [`construction_record.md`](construction_record.md): how this section was reached

## Concluding audit additions (2026-10-12)

- Connector tokens stay in the tool layer's secure store. They are fetched after the business allows the connection. The AI never sees them. <!-- research: security and compliance (connector tokens); Level 2 security -->
- Each tool has a list of destinations it may reach. A destination that is not on the list is refused. <!-- Level 2 security: the_security_audit_framework (line 110); research -->
- Queued and scheduled jobs check the business again when they run, not only when they were created. <!-- research: security and compliance (queued jobs) -->
- A tool's results come back to the situation worker as evidence. They are not instructions. <!-- Section 6 existing; Level 2 memory (untrusted text) -->

### Channels

- Each channel's rules come from the research files and the Level 2 channel files. The facts, one line per channel:
  - WhatsApp inside its 24-hour window: any message, no template. Outside it: an approved template, with opt-in (Tend's rule). Utility and marketing templates are separate categories.
  - WhatsApp, 72-hour free entry window (after a click-to-WhatsApp ad or page button, in the mobile app): all message types are free, templates included. After the first 24 hours, only templates may be sent. Marketing templates are charged outside this window.
  - Telegram: a bot cannot start a chat. A person begins one by messaging the bot or adding it to a group. Bot messages cost nothing by default, and Telegram states no template rule. Business bots reply only to chats with an incoming message in the last 24 hours. <!-- research: channel_compliance_matrix; Telegram bots and FAQ pages -->
  - Email: consent and an unsubscribe route. Other lawful bases are for Compliance & Security to confirm.
  - Website chat: inside the visitor's open session.
  - All four are in scope. Slack is not in scope, and no research file exists for it. <!-- research: wa_compliance, channel_compliance_matrix; Level 2 channel files -->
- For a start (a message that is not a reply), use the first option that is available and allowed (Section 8, starting a message). <!-- agreed 2026-10-12 -->
- The same situation continues across channels. For example: WhatsApp, then email. Phone calls are not in scope yet. <!-- research: business journeys map; Level 2 channels -->
- A channel binding proves the channel, not the person. <!-- Level 2 identity -->

### Actors

- The identity provider verifies people. The business's partner is an outside party with its own responsibilities. An external agent gives output only, never authority. <!-- Level 2 identity; Level 1 framing -->
- The names "Reasoning Model" and "Product Builder" used in Level 1 are the AI and the builder in this architecture. <!-- Level 1 framing -->

### Compliance settings

- Compliance settings are kept for each market and for each business. The first market's legal values are fixed when it is entered. Only the configurator may change the compliance settings. A second person approves each change. Call (not yet confirmed): this follows the rule for changing grants. <!-- architecture rule; no Level 2 text found -->

### Technology leakage check

- Storage products, queues, and provider names are Level 3 choices. The only names kept here are the channel names that Level 2 uses. <!-- method: technology leakage test -->

### Further additions: boundaries and structure

- A part is a boundary when it is the smallest complete problem that can be owned on its own. <!-- Product Vision; Section 7 test -->
- The first version of a new situation is written at intake by the conversation manager. <!-- harness study; Section 10 -->
- A channel that a business does not have is shown as a gap. The fallback is used, and the gap is recorded as a build signal. <!-- Level 2 channels; Section 10 -->
- The AI never decides consent, delivery, or completion. Fixed code does. <!-- Level 2 communication -->
- The optimiser never changes tool descriptions or the policy text of the constitution. People change them, through the product team. <!-- Level 2 growth: G1:25; Level 2 prompt constitution -->
- The product team authors each capability. The AI does not create or change an integration. <!-- Level 2 growth: G1:25; the business enables each capability (Section 11) -->
- The observer is a function of the situation worker, not a separate part. <!-- Product Vision; Section 7 -->

### Run steps and the observer

- The steps of a run have owners. The AI proposes (PROPOSE). Fixed code validates and executes (VALIDATE, EXECUTE). The situation worker writes the next version and decides whether the run stops (UPDATE, REST). <!-- Section 8; Level 2 decision making -->
- The observer reads saved traces and the change channel. It does not act on what it finds. <!-- Section 8: observer -->

### Decided on 2026-10-12

- **First version.** The conversation manager writes the first version of a new situation at intake (agreed 2026-10-12).
- **Nurture wait.** The situation worker cancels the nurture wait in its next version, which carries the reply (Section 8, CASE-1; agreed 2026-10-12).
