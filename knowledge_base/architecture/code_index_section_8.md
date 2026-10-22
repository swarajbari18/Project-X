# Code index for Section 8 (agent-only)

This file is for agents. It is not meant to be read in the rendered view. Every code used in `section_8_interaction_model.md` appears here, with its plain meaning, its source, and its status. Section 6 codes are in `code_index_section_6.md`. Section 7 part names are in `code_index_section_7.md`.

**Status values:** Decided (the knowledge base settles it), Provisional (in use, may change), Open (not settled), Architecture-only (written during construction, no Level 2 source found).

Level 2 governs. Where Level 2 disagrees with another source, Level 2 wins. The agent harness study is absolute unless Level 2 disagrees with it. The Product Vision applies where Level 2 is silent. Disagreements that remain are written down and sent to Swaraj; they are not chosen silently.

## Run steps and invariants

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| S1 | One run: WAKE, RECOVER, PROPOSE, VALIDATE, EXECUTE, UPDATE, REST. | Harness, run pipeline (lines 1133–1183) | Decided (principle); architecture-only (labels) |
| S2 | VALIDATE checks shape, completion rules, and bounds with fixed code. | Harness (lines 636–638, 1133–1183); Section 6 | Architecture-only (the split) |
| S3 | EXECUTE runs one fixed path per kind of step. | Harness (lines 1150–1175, 1236–1244) | Decided (principle) |
| S4 | UPDATE writes the next version. Corrections go forward. Unknowns stay visible. | Harness (line 1176); version-forward write (lines 1935–1939) | Decided |
| S6 | REST and the honest rest states; the five progress reasons. | Harness (lines 1185–1186, 1256–1266) | Decided |
| S7 | Intent is recorded before an irreversible effect. | Harness, invoke branch (around lines 1159–1161) | Decided (principle); architecture-only (wording) |
| S8 | Tools return structured evidence only. | Architecture-only; the harness citation covers retries, not evidence-only returns | Architecture-only |
| S9 | Duplicate check before an irreversible effect, against the situation model. | Failure (key reuse, line 52); architecture-only (the record read) | Architecture-only (the record read) |
| S11 | Model output is data, checked against a schema. | Security (line 97) | Decided |
| S12 | Repeated events are dropped by situation and event ID before PROPOSE. | Harness (lines 1923–1927, 2052) | Decided (principle) |
| INV-1 | Only the situation worker commits operational truth. | Section 7 writer rules; Level 2 Understanding files name the conversation manager's routing writes | Decided (rule, as restated in Section 7) |
| INV-2 | The situation worker writes intent. Only the communication layer sends. | Communication (when should Tend communicate, line 8) | Decided |
| INV-3 | A timer wakes the situation worker only. It never sends. | Time (when waiting ends, line 16); harness (line 2028) | Decided |
| INV-6 | VALIDATE is one step with two separate checks: shape and permission. | Architecture-only (the split); Section 6 | Architecture-only |
| INV-7 | Capability-absent is not a failure. | Explainability (how do we explain every failure, line 18) | Decided |
| INV-8 | The book of waits is the subscription list. No polling in the harness. Check-in is the only periodic wake. | Coordination (line 161); harness (lines 2025–2028); Time (line 106) | Decided (no harness polling); Provisional (tool-level status call) |

## Routing and events (IA-1, IA-10, IA-19, IA-20)

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| IA-1 | Each event has one primary consumer. Others react to committed versions. | Architecture-only | Architecture-only |
| IA-10 | Undeliverable messages are reported back to the situation worker as evidence. | Architecture-only | Architecture-only |
| IA-19 | The observer emits observation events on the same channel. | Explainability (health file, lines 5, 11); harness (lines 654–662) | Decided |
| IA-20 | Two watch lines: provider and harness. | Harness (lines 654–662); explainability (health file) | Decided (concept); architecture-only (labels) |

## Harness contracts (HC) and writes (IA-2)

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| HC-1 | Write and announce together. An unannounced write is retried. | Coordination (write and announce together, line 168); time (line 108); harness Part 14 | Decided |
| HC-2 | The conversation manager works out what a message means and routes it. Only the situation worker commits conclusions. | Section 7 writer rules; Level 2 Understanding (routing); harness (lines 1250–1254) | Decided (writer split); Provisional (artifact shape) |
| HC-3 | Every wait goes in the book of waits. One check-in per situation. No harness polling. | Time (line 106); coordination (lines 161–163); harness (lines 2025–2028, 2053) | Decided |
| IA-2 | The write table: which part writes which kind of update. | Section 7 | Decided |
| IA-2a | A partial gather is saved as one version with its open question. | Architecture-only | Architecture-only |

## Authorisation (AC) and identity

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| AC-1 | Tenant context is set once, from verified identity, and travels unchanged. | Compliance (lines 48–54, 57–59) | Decided |
| AC-2 | Before an outgoing message: a policy check that returns Allow, Deny, or StepUp. | Compliance (lines 55–57, 92–95) | Decided |
| AC-3 | Approval returns through the tool flow. A denial is final. The tool checks again before it acts. | Authority (when must Tend ask for approval, lines 4–8); harness (line 1244) | Decided (approval through tool flow); Provisional (the re-check wording) |
| AC-4 | The authoritative permission store is read at enforcement. A cache never decides. | Harness (lines 2038–2042); coordination (line 170) | Decided |
| T1 | Identity is set at intake, from verified identity. | Compliance (lines 49–53) | Decided |
| T2 | The policy check: Allow, Deny, StepUp. A disclosing read is checked the same way. | Compliance (lines 55–57); Authority (a read can be a disclosure) | Decided |
| T4 | A tool never starts before its permission is confirmed. | Compliance (line 38) | Decided |
| T5 | The permission store is read at check time; a cache never decides. | Harness (line 2038) | Decided |
| T6 | Permission is checked again at each action within a run. | Compliance | Decided |
| T7 | StepUp goes through the approval tool and the communication layer. | Compliance (line 57); harness (lines 1244, 1252) | Decided |
| T8 | Grants and registry writes only through the configurator's tools. | Configuration capability (lines 7, 13) | Decided |

## Contracts (IB)

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| IB-1 | A timer wakes the situation worker only. | Time (line 80); harness (line 2028) | Decided |
| IB-2 | An incoming message is routed to its situation before anything is gathered. | Journey (split file, line 14); understanding (routing) | Decided |
| IB-3 | A reply and the cancelling of the wait it answers are saved together. | Architecture-only (atomicity); time (line 16) for the wait | Architecture-only (atomicity) |
| IB-4 | A timer re-reads the latest version before any outgoing decision. A superseded wait is a no-op. | Time (understanding, line 40; when waiting ends, line 16); harness (lines 1935–1940) | Decided |
| IB-5 | An outgoing message needs a committed intent, an Allow, and the channel rules. | Harness (lines 1244–1254); channel rules (consent file, lines 19–24) | Decided (principle); architecture-only (the combination) |
| IB-6 | Creating a situation may save an empty placeholder. The first real version is separate. | Architecture-only | Open (who writes the first real version) |
| IB-7 | Tools return structured evidence to the situation worker. They never write claims. | Harness (lines 1162–1170, 1248) | Decided (principle) |
| IB-8 | Before an irreversible effect, the record is checked for an earlier attempt. Not an approval check. | Failure (line 52); architecture-only (the record check) | Architecture-only (the record check) |
| IB-9 | An unknown-outcome recheck timer wakes the situation worker and uses the same status path. | Time (how should Tend react, line 18) does not name a recheck timer | Architecture-only |
| IB-10 | An unknown outcome on an irreversible action keeps the situation waiting until the settle window ends. | Failure (line 44); failure recovery (line 19) | Decided |
| IB-11 | Starting an action, recording it unknown, and waiting are saved in one version. | Architecture-only | Architecture-only |
| IB-12 | Traces go to memory asynchronously and never block a commit. | Harness (lines 1104–1110) | Decided |
| IB-13 | Memory proposes configuration. Only the configurator's tools apply it, after validation. | Configuration capability (lines 13, 24); Section 6 N13 | Decided (apply path); Open (memory observes setup sessions) |
| IB-14 | Training-grade traces go to the improvement path, apart from business memory. | Harness (lines 1322–1343) | Decided |

## Human work, the owner, and communication (IA-7, IA-14, O, J, K)

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| IA-7 | The owner hears three classes of event. Routine progress stays on the board. Level 2 also lets an event that changes the business's next decision reach the owner at once. | Business view (which events, lines 5, 11–19) | Decided |
| IA-14 | Human work items: one responsible party; the fields; the lifecycle; the handoff. | Human collaboration files; Section 6 J4 | Decided (lifecycle); Provisional (field enum) |
| J1 | Make the need for a person explicit. | Human collaboration | Decided |
| J2 | Nine kinds of involvement. | Human collaboration (when should Tend involve a person, lines 44–54) | Decided |
| J3 | Route to the right person, role, queue, or partner. | Human collaboration; meetings | Decided |
| J4 | One responsible party per work item at a time. | Coordination (duplicated work, line 5); open in human collaboration (line 173) | Decided (rule); Open (the collaboration question) |
| J5 | Seven kinds of silence. Silence is never completion. | What happens when nobody responds (lines 15–23) | Decided |
| J6 | Acknowledgement is not completion. Record the outcome before the next decision. | Human collaboration (lines 85–87) | Decided |
| J7 | Unavailable is not non-responsive. Coverage first. | Human collaboration (unavailable, lines 15, 21) | Decided |
| J8 | A transfer is pending until accepted. | Transfer file (lines 29–33) | Decided |
| J9 | Check the substitute's permission before an irreversible action. | Human collaboration (unavailable, line 47) | Decided |
| K4 | Partner contact only after escalation, only when the business allows it, with the scoped payload. | External partner file (lines 13, 17–21) | Decided |
| O1 | Work is shown as artifacts. | Product Vision; business view | Decided |
| O2 | The owner's view is derived from committed records and read-only for the record. Lag Open. | Business view (snapshot, lines 5, 24); business view (discoveries, line 75) | Decided (derived); Open (lag) |
| O3 | Three owner classes; deadlines and compliance items; drifted escalations. | Business view (which events) | Decided |
| O4 | Explanation on demand, with depth set by the audience. | Explainability (how do we explain every action, line 13) | Decided |
| O10 | Capability-absent is recorded on the situation, outside failure handling. | Explainability (line 18) | Decided |
| I1 | A material change reaches the person who should hear it. No receipt-style message. | Communication (lines 9, 37, 67–70) | Decided |
| I5 | Explanation depth fits the person's role. | Communication (how much explanation, line 41) | Decided |
| I6 | Uncertainty and conflict are said honestly. | Communication (uncertainty files) | Decided |
| L1–L3 | Channel rules: template, window, consent; channel choice. | Channels (consent file, lines 19–24; channel choice, lines 20, 30–31) | Decided |

## Permission, capability calls, and gathering (D, P, Q, F, E)

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| D1 | Identify what could change the next safe step. | Gathering Q1 | Decided |
| D4 | Retrieval priority: meaning first, then source selection, then order of authority, currency, consequence, and cost. | Gathering Q4; failure (line 30) | Decided |
| D6 | Invoke a business capability when it is the right source. | Product Vision; harness | Decided |
| D8 | Match each ask to a source. If none, capability-absent. If a person can answer, human work. | Gathering map; explainability (line 28) | Decided |
| P1 | Coordinate through capabilities without owning external records. | Level 1; Product Vision | Decided |
| Q1 | Typed configuration registry. | Growth files | Decided |
| Q3 | Policies and workflows pinned at situation open; facts, platform rules, and grants live. A business-setting change does not wake the situation worker. A platform-rule change does (decided 2026-10-09). | Growth (evolve Tend, lines 9–18, 37, 59) | Decided |
| F2 | The model proposes intentions; the system owns timers and state. Draft text is not sent without a committed intent. | Decision making (lines 33, 85); harness (lines 1244–1254) | Decided |
| E7 | Evidence from fallback or stale substitute is marked stale or partial. | Failure (partial availability, line 21) | Decided |
| E9 | Five progress reasons. The model's own report never counts. | Confidence (Fork C); harness (lines 1256–1266) | Decided |

## Failure, time, and recovery (M, H, A, G)

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| M2 | Failure is declared when the bound is reached and the wait has not fired. | Failure (recognise failure, lines 11, 13) | Decided |
| M4 | Transient failures retried at the tool layer, with bounded backoff. A channel send is a tool-layer call, so its retries are also in the tool layer. | Failure (line 12, the tool decides retries; line 52; avoid repeating, line 26) | Decided |
| H2 | A wait records seven things. | Coordination (waiting, lines 46–54) | Decided |
| H3 | Waiting and blocked are different. Past the bound, failure. | Coordination (blocked, lines 5, 11–12); failure (distinguish, line 13) | Decided |
| G2 | Approval for an action outside the grant. | Authority (when must Tend ask, lines 4–8) | Decided |
| A1 | One situation is one versioned record. | Product Vision; coordination | Decided |
| A6 | Closure is final. | Coordination | Decided |
| A8 | Reopen only when the same problem is not actually finished. | Level 2 split file (line 15); understanding (lines 1019–1046) | Decided (rule); Open (flag form) |
| A9 | The outcome is recorded on closure. | Product Vision; coordination | Decided |
| B2 | Route each event to its situation before gathering. | Understanding (routing) | Decided |
| B6 | One list creates separate situations. | Product Vision (lines 99–105) | Decided |
| C1 | Update the routed situation with what the event adds, before deciding. | Understanding | Decided |
| N1 | Each step gets only the memory it needs. | Memory (assemble context) | Decided |
| N8 | Matching and merging learned claims. Six operations; the full set is Open. | Memory (reconciled and versioned, lines 44–60) | Decided (six); Open (full set) |
| N11 | Memory is served from a context need. | Memory (retrieval) | Decided |
| N14 | Structured values are configuration; prose preferences are placed by memory. | Prompt constitution; harness (lines 2092–2099) | Decided |
| R3 | Improvement never activates a business rule. | Authority and memory conversation files; research | Decided |
| U2 | Fields from connected systems are untrusted. Allowlist. Outbound stripped. | Security (lines 123–124) | Decided |

## Scenario names

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| CASE-1 | Priya's outreach: a reply before the nurture timer. | Section 6 walkthrough 1; this file's CASE-1 | Decided (scenario); Open (who supersedes the nurture wait) |
| CASE-2 | Inquiry, order, delay, and a refund with an unknown gateway outcome. | Section 6 walkthrough 2; this file's CASE-2 | Decided (scenario) |
| CASE-3 | Investor diligence: deck and revenue. | Section 6 scenario | Decided (scenario) |
| CASE-4 | Stale or unavailable carrier tracking. | Section 6 scenario | Decided (scenario) |
| CASE-5 | Package status with no shipping source. | Section 6 scenario | Decided (scenario) |

## Items removed from the visible text

- The old walkthrough step numbers and the old per-step codes. Each step's codes are listed in the walkthrough comments.
- The old list of 442 rule items. Its inventory is in the archive.
- The old "IB-15 and higher" human-work range. It was never defined. The human-work rules sit under IA-14 instead.
- The old "membrane" and "story" names. Replaced by the conversation manager, the communication layer, and the situation worker.
- The old "settle window = business SLA" note. Replaced by the decided wording: the business's service level for the wait, with a default the configurator can change. Level 2 words this as the third party's promised settle time.

## Conflicts in the knowledge base, and how this section resolves them

| Topic | Conflict | Resolution |
|-------|----------|------------|
| Who writes the record (INV-1) | Harness says the conversation manager patches on message entry (line 1350). Swaraj's correction says it only updates the model (line 1652). | Section 7 writer rules: the conversation manager writes what comes in; the situation worker writes conclusions. |
| Polling (INV-8, M4) | Level 2 failure file lets the tool poll a status API a small number of times. Harness: no component polls. | One status call in a tool is allowed; repeated checks belong to the polling service (Swaraj's direction). Provisional. |
| Settle window (IB-10) | Level 2: the third party's promised settle time. Swaraj: the business's service level, with a default the configurator changes. | Swaraj's answer governs for Tend's waits. Recorded. |
| Configuration wake (IA-5) | Architecture had an optional wake on configuration apply. Harness: rule changes need no event. | No wake. Reads take the current configuration. Decided. |
| Approval return (AC-3) | Architecture had the approval result returning through the membrane. Section 7 sends it through the tool flow. | Through the tool flow. Decided. |
| Sending decisions (INV-2) | Architecture made the situation worker's send decision the gate. Level 2 gave this choice to Decision Making until 2026-10-09. | The conversation manager decides whether an update is worth telling; the communication layer sends. Level 2 changed at Swaraj's direction to match (2026-10-09). |

## Added 2026-10-09 (completeness audit)

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| IA-8 | The owner view is derived from committed records. Refresh on commit, grouped per situation; observer events per tick; capability-absent aggregate nightly. Timing figures Open. | Business view (discoveries, line 75); architecture-only (triggers) | Decided (derived); Open (timing) |
| IA-9 | Memory serves short cards first; the full situation only after a card is chosen; settings are not situation cards. | Memory (retrieval, lines 67–71); architecture-only (cards) | Architecture-only (cards) |
| IA-11 | Learning promotions. Learned lessons may be proposed for promotion; promotion to the registry is Provisional. | Memory (can tend learn automatically, line 16); architecture-only (promotion) | Provisional |
| IA-12 | Configurator path: the configurator's agent holds the fixed tools; memory proposes candidates. Provisional. | Configuration capability (lines 7, 13, 24) | Provisional |
| IA-13 | Improvement path: training-grade trace slices; never activates a business rule. | Harness (lines 1322–1343) | Decided |
| IA-18 | Trace field names. Provisional; the obligation to keep them is decided. | Explainability (how do we explain every action, line 11); architecture-only (field names) | Provisional (names) |
| IA-23 | Completion check before resolve: ask endings, human work pending, capability-absent not shown as success, customer claims with evidence. Class 2 and Class 3. | Recognise unexpected behaviour (line 10); explainability (line 18) | Decided (checks); Provisional (implementation) |
| E2 | Evidence is evaluated by fixed code, by source and rules. The model does not decide truth. | Trust and evidence | Decided |
| E3 | Uncertainty is shown as evidence states, reasons, and unknowns. Never a made-up number. | Confidence (structural uncertainty) | Decided |
| G3 | Reason tag on every commit to the situation model. | Architecture-only | Architecture-only |
| J8 | Auto-accept applies only when the business sets it; approval class recorded on the work item. | Transfer file (lines 29–35); architecture-only (approval class) | Decided (notice is not acceptance); architecture-only (approval class) |
| T-A, T-B | Release test suites: T-A proves tenant isolation and the policy deny; T-B proves injection resistance and redaction. A skipped test is a failed suite. | Security (lines 146–147, 149, 173) | Decided |

## Corrected 2026-10-09

- **O3 (owner classes):** the three classes are: a decision only the owner can make; compliance items and owner-risking deadlines; drifted escalations. Earlier row text omitted the first class.
- **Delivery acknowledgements:** recorded by the communication layer, which holds the delivery evidence. The situation worker wakes only if a send is pending.
- **Duplicate check and call order:** the duplicate check runs before the connector call.
- **Gather:** one bounded pass; the situation worker decides sufficiency; at least one source must be asked.
- **Polling:** one status call inside a tool is allowed. A status call is not a polling loop.

## Codes added 2026-10-09

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| F5 | Decide that there is enough information, relative to policy and consequence. The situation worker decides this, not the model. | What does enough information mean (Level 2 decision making) | Decided |
| K2 | A meeting is booked only inside eligibility, the calendar, and the intent that was expressed. | Meetings (Level 2, meeting question 2) | Decided |
| M6 | When the automated path is used up, escalate to a person. | Failure; section 6 J3 and K4 | Decided |
| U1 | Tenant isolation is mechanical on every store, cache, key, index, log, and model call. | Level 1 section 8; compliance (release gate T-A) | Decided |
| T | Group letter for the permission checks. The rows are T2, T4, T5, T7, T8. | Section 6 group T | See row for each code |
