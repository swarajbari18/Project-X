# Code index for Section 7 (agent-only)

This file is for agents. It is not meant to be read in the rendered view. Every code used in `section_7_boundary_model.md` appears here, with its plain meaning and its source. Section 6 codes are indexed in `code_index_section_6.md`.

**Status values:** Decided (the knowledge base settles it), Provisional (in use, may change), Open (not settled; the visible text states the recommendation), Architecture-only (the rule was written during construction, and no Level 2 source has been found).

Level 2 governs. Where Level 2 disagrees with another source, Level 2 wins. The agent harness study is absolute unless Level 2 disagrees with it. The Product Vision applies where Level 2 is silent. Disagreements that remain are written down and sent to Swaraj.

---

> **Names updated 2026-10-09.** B-Story = the situation worker (it writes conclusions to the situation model). B-Membrane = the conversation manager (intake) and the communication layer (expression and sending). The situation model is the shared record both write to. Where older rows below say B-Story or B-Membrane, read them with these names. Writer rules are in section_7_boundary_model.md ("Who writes what to the situation model").

## Parts

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| B-Story | The situation story: keeps each situation's record, decides the next step, commits every truth change. | Harness: situation worker (lines 1119–1121); Section 6 rules A, C–F, H, J, K, M, O10, P | Decided (the concept); the name is architecture-only |
| B-Membrane | The door for messages, in and out. Routes events, applies the communication rules, sends what the story decided. | Harness: conversation manager and communication layer (lines 518–534); Communication files | Decided (concept); name architecture-only |
| B-Memory | Memory and knowledge: runs beside the loops on its own thread; hands a package before each part of each loop; finds knowledge (retrieval capability); creates and maintains links; keeps skills, procedures and learned knowledge; learns. Decides nothing; writes no situation record except a confirmed erasure. | Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops; Swaraj 2026-10-28; Harness observer and loader (lines 1085–1090) | Decided (Swaraj, 2026-10-28); name "memory and knowledge" by Swaraj |
| B-Visibility | Derived views for owner, admin, and builder. Writes no story truth. | Explainability D3, D4, D5 | Decided (concept); name architecture-only |
| Adjacent-Tool | The tool layer: permission before each call, bounded retry, intent before an irreversible effect, structured evidence back. | Harness: deterministic tool layer (line 1270); Compliance file (lines 55–57) | Decided (concept); name architecture-only |
| Adjacent-Poll | The polling service: runs polling jobs for outside systems and returns results as events. | Swaraj's direction (recorded in Section 7 on 2026-10-09); Section 6 H8 and M5 | Decided (its own part); Open (number of status calls inside a tool) |
| Adjacent-Config | The only writer of grants and registry values, through fixed tools. | Configuration capability file (lines 7, 13, 40); Growth files | Decided (the role); the name is architecture-only |
| Adjacent-Improvement | Improves behaviour from verified traces; never changes business rules. | Memory file (can_tend_learn_automatically, line 8); prompt constitution (lines 22, 41) | Decided (concept) |
| The observer | A function alongside the parts: emits observation events. Not a part of its own. | Explainability D6; health file (line 5) | Decided (the function); Open (who checks completion-rule breaches is raised by the observer, but no checker for record writes is named) |

## Rules, by part

### The situation worker (was B-Story)

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| A1 | A situation is one versioned record. | Product Vision; Coordination | Decided |
| A2 | One situation is one operational problem. | Understanding (split early) | Decided |
| A3 | Links come from operational context, not the person alone. | Understanding; Journey | Decided |
| A5 | Related situations link without merging models. | Understanding | Decided |
| A6 | Closure is final for the card. | Coordination | Decided |
| A7 | A new problem after closing is a new situation, linked to the old one. | Coordination; interrupted-work file | Decided |
| A8 | Reopen only when the same problem is not actually finished. | Level 2 reopen rule (understanding, lines 1019–1046, 1090–1094) | Decided (rule); Open (form of the flag) |
| A9 | The outcome is recorded. Tend does not decide whether the customer buys. | Product Vision; Coordination | Decided |
| A10 | The person's journey is worked out from situations when asked, never stored. | Journey file | Decided |
| A11 | A new contact starts with unknown relationship. | Journey conversation record | Decided |
| A12 | The stated ask is kept apart from the inferred problem. | Understanding (stated versus real problem) | Decided |
| A13 | Lead, prospect, customer kept apart. | Journey file (lines 9–14) | Decided (stages); Open (configuration) |
| C1 | Update the situation with what the event adds, before deciding. | Understanding | Decided |
| C3 | Select only the relevant information. | Understanding (relevance) | Decided |
| C4 | Keep observations, claims, inferences, decisions apart. | Trust and Evidence | Decided |
| D1 | Identify what could change the next safe step. | Gathering Q1 | Decided |
| F1 | Select the next behaviour. | Decision Making map | Decided |
| F2 | The model proposes; the system owns timers and state. | Decision Making | Decided |
| F3 | Continue within the granted range. | Decision Making; Product Vision | Decided |
| F4 | Stop safely when there is no safe path. | Failure; Decision Making | Decided |
| G-(granted range) | Acts only inside the grant. | Authority | Decided |
| H1 | Situations stay alive through durable records. | Coordination | Decided |
| H2 | A wait records seven things: subject, reason, timing class, resume trigger, release policy, escalation path, visibility. | Coordination, how do we represent work that is waiting (lines 46–54) | Decided |
| H3 | Waiting and blocked are different. Past the bound, failure is declared. | Coordination; Failure (lines 5, 11–12) | Decided |
| H4 | Wakes come from events and time. | Coordination; Time | Decided |
| H8 | The book of waits is the subscription list for events. | Coordination (lines 161–163) | Decided |
| H9 | Version and announcement are one unit. | Harness Part 14; time file (line 108) | Decided |
| H10 | On a timer wake, re-read the latest version. | Time; IB-1, IB-4 | Decided |
| J1–J6 | Human involvement: explicit need, kind, routing, one responsible party, silence, recording. | Human collaboration files | Decided |
| J7–J9 | Unavailable is not non-responsive; transfers carry context; substitute permission checked. | Human collaboration files | Decided |
| K1–K4 | Meetings and partner contact. | Meetings files | Decided |
| M1 | A failure is an audited event, never a card state. | Failure | Decided |
| M2 | Failure is declared when a wait's bound is reached and the wait has not fired. | Failure (lines 11, 13) | Decided |
| M3 | Failures are triaged by consequence, severity, and the response and resolution promises. | Failure; Coordination (lines 66–71) | Decided |
| O7 | Each consequential action leaves one complete record. The performer writes it. Joined by run ID, version, situation ID. Storage is Level 3. | Explainability, how do we explain every action (lines 5–21) | Decided (record and join); Open (who checks) |
| O10 | Capability-absent is recorded on the situation, outside failure handling. | Explainability D2 | Decided |
| P1–P3 | Business capabilities used through the story; references, not owned external records. | Level 1; Product Vision | Decided |
| S1 | Per-wake contract: WAKE, RECOVER, PROPOSE, VALIDATE, EXECUTE, UPDATE, REST. | Harness (lines 1136–1179); Section 8 wake table | Decided (principle); architecture-only (labels) |
| S2 | VALIDATE: fixed code checks shape, permitted behaviour, completion rules. | Harness (lines 636–638, 564, 1146) | Architecture-only (use in VALIDATE) |
| S3 | EXECUTE runs one fixed path per kind of step. | Harness (lines 1150–1175, 1236–1244) | Decided (principle) |
| S4 | UPDATE commits the next version atomically. | Harness (lines 1913–1917, compare-and-swap on version) | Architecture-only (the atomic-commit wording) |
| S5 | A situation change and its event are saved together. | Harness Part 14, Decision 1 | Decided |
| S6 | REST or another round is decided only by the five progress reasons. | Harness (lines 1256–1266) | Decided |
| S10 | Timer wakes go to the situation worker only. | Time (lines 80–85, 106); harness (line 2028) | Decided |
| S12 | Duplicate events dropped before PROPOSE. | Harness (line 1927); Section 6 | Architecture-only |
| IB-1 | A timer wakes the story only. | Section 8 IB rows; time file | Decided (principle); architecture-only (numbering) |
| IB-2 | Route before gathering. | Understanding (route before gather) | Decided (principle) |
| IB-3 | A reply and the cancelling of its wait are one version. | Architecture-only | Architecture-only |
| IB-4 | Timer re-reads the latest version; a superseded wait sends nothing. | Time; Section 6 H10 | Decided (principle) |
| IB-5 | An outgoing message needs a committed send decision, an Allow, and content rules. | Architecture-only (Allow: compliance file) | Architecture-only (the combination) |
| IB-6 | Creating a situation may save an empty shell; the first real commit is separate. | Architecture-only | Open (who writes the first version) |
| IB-7 | Tools return evidence, never claims. | Architecture-only (principle: harness line 1270) | Architecture-only |
| IB-8 | Before an irreversible action, check for an earlier attempt. Not an approval check. | Architecture-only (principle: Failure recovery, line 15) | Architecture-only |
| IB-9 | Unknown-outcome recheck timer wakes the worker. | Architecture-only | Architecture-only |
| IB-10 | An unknown outcome keeps the situation waiting until the settle window is spent. | Failure (recovery, line 19) | Decided (principle) |
| IB-11 | Starting an action, recording it unknown, and waiting are one version. | Architecture-only | Architecture-only |

### The conversation manager and the communication layer (was B-Membrane)

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| B2 | Route each event to its situation before gathering. | Understanding (routing) | Decided |
| B3 | Tiered routing: clear match attaches; weak match asks. | Understanding (routing) | Decided |
| B4 | Routing is corrected when evidence shows it was wrong. | Understanding (routing) | Decided |
| B5 | Assemble incoming context once. | Understanding | Decided |
| B6 | One list creates one situation per person and one central situation linked to all of them; no board. | Swaraj 2026-10-28; Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops D4; Product Vision (lines 99–105, 337–347) | Decided (Swaraj, 2026-10-28) |
| B8 | Unclear: prefer separate situations with a link. | Understanding (routing) | Decided |
| B9 | Weak match records a held attachment without changing the situation. | Understanding (routing) | Decided |
| I1 | Express a material change; no default receipt message. | Communication (when should Tend communicate, lines 4–10, 37, 63–67) | Decided |
| I2 | Send only what the recipient may see. | Communication; Channels | Decided |
| I3 | Do not send when it would be premature, misleading, unnecessary, or unsafe. | Communication (wait file, line 5) | Decided (core); the harness lists more reasons (line 1355) |
| I4 | Ask when reference or information is missing. | Communication; Understanding | Decided |
| I5 | Explanation depth fits the role. | Explainability | Decided |
| I6 | Uncertainty and conflict said honestly. | Uncertainty and conflict comms docs | Decided |
| I7 | The worker records communication intent; the communication layer shapes, checks, sends. | Communication (lines 4–10); harness (line 1165) | Decided |
| L1 | Per-channel rules. | Channels Q1 | Decided |
| L2 | Consent and preferred channel apart from the active thread. | Channels Q2 | Decided |
| L3 | Reply in the current channel; the channel rule is carried by the membrane. | Channels (lines 20, 30–31) | Decided (rule); Decided: the conversation manager decides whether an update is worth telling (Level 2 changed to match, 2026-10-09). |
| L4 | Visibility narrow by default. | Channels Q4 | Decided |
| T1 | Identity set once, from verified identity. | Compliance (lines 49–53, 51–53) | Decided |
| S2 (ingress) | Fixed-code ingress check. | Harness (lines 564–572) | Architecture-only |
| S12 (ingress) | Duplicates dropped at ingress. | Harness (line 1927) | Decided (principle) |
| T2 (egress) | Policy check before an outgoing message: Allow, Deny, StepUp. | Compliance (lines 55–57) | Decided |
| T11 | Field-level visibility. | Level 2 who-may-grant (lines 72–78); channels Q4; compliance (line 84) | Decided (rule); Open (exact role configuration format) |

### Memory and knowledge (B-Memory)

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| N1 | Phase-specific context, not a full dump. | Memory file (assemble context) | Decided |
| N2 | Closed situations inform new ones only via links and relevance. | Memory file (previous conversations) | Decided |
| N3 | Learning never changes rules, authority, or approvals. | What kind of learning is acceptable (pending review in the file) | Decided (pending review) |
| N4 | Experience is kept for audit and learning. | Memory file (what should Tend remember) | Decided |
| N5 | Graph references between memories and situations. | Memory conversation | Decided |
| N6 | Traces recorded asynchronously; learning can be switched off or validated. | can_tend_learn_automatically (lines 16, 24); harness (line 1022) | Decided |
| N7 | Candidate lessons from external failure signals. | Memory file (learn from mistakes) | Decided |
| N8 | Match by claim family, then add, merge, refine, supersede, keep conflict, or no-op. | Memory file (lines 44–60); harness (line 1022) | Decided (six); Open (full set, depends on memory type) |
| N9 | Lifecycle of learned items. | Memory file (prevent outdated knowledge) | Decided |
| N10 | Replay and regression; reverse harmful lessons. | Memory file (evaluate automatic learning) | Decided |
| N11 | Memory served from a context need. | Memory file (retrieval); harness (line 1094) | Decided |
| N12 | Business vocabulary is business knowledge. | Memory file (long-term business knowledge) | Decided |
| N13 | Memory proposes configuration candidates; a configurator validates; tools apply. | Configuration capability (lines 7, 13) | Decided (the apply path); Decided by Swaraj, Level 2 silent (memory observes setup sessions) |
| N14 | Structured values are configuration; prose preferences are placed by memory; the business owns the text. | Prompt constitution; harness (lines 2092–2099) | Decided |
| N15 | Business content learning is separate from product behaviour. | Authority conversation; observability research | Decided |
| N16 | Provenance, scope, version, advisory only. | Memory map; Trust and Evidence | Decided |
| N17 | Never store credentials as business memory. | What should never become memory (line 26) | Decided |

### Owner view (B-Visibility)

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| O1 | Work as artifacts, not a chat wall. | Product Vision; Business View | Decided |
| O2 | Owner snapshot worked out from records, on demand. | Business View (snapshot, lines 5, 24) | Decided |
| O3 | Owner attention: decisions only the owner can make, compliance items, drifted escalations; plus any event that changes the next decision. | Business View (which events, lines 5, 11–15, 19); Business View (line 62) | Decided |
| O4 | Explain recommendations, actions, failures on demand. | Explainability | Decided |
| O5 | Reconstruct finished situations for audit and replay. | Explainability | Decided |
| O6 | System health shown apart from business work. | Explainability (health file, line 25) | Decided |
| O8 | Observation events on the same channel; the observer is cross-cutting. | Explainability D6 (line 39); health file (lines 5, 9, 15) | Decided (events); Provisional (checker for record writes) |
| O9 | Business value only; never uptime or message counts. | Explainability D3 (line 36); always-visible file (line 20); research B4 | Decided |
| T9 | The owner has no audit access by default. | Admin file (lines 5, 17–18, 22) | Decided |
| T8 | Grants written only by configuration tools. | Configuration capability | Decided |
| G7 | Grants and registry writes only by the configurator's fixed tools. | Configuration capability (lines 7, 13) | Decided |

### Tool layer (Adjacent-Tool)

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| T2 | Policy check before every effect: Allow, Deny, StepUp. | Compliance (lines 55–57) | Decided |
| T4 | Enforce before the effect; never start a tool and then discover a denial. | Compliance (line 38) | Decided |
| T5 | Read the authoritative permission store; a cache never decides. | Harness (line 2038) | Decided |
| T6 | Check permission at each action within a run. | Compliance | Decided |
| T7 | StepUp via the fixed approval tool and the communication layer. | Compliance (line 57); harness (lines 1244, 1252, 1270) | Decided |
| T9 | Append-only audit, secret-free. One logical record; storage is Level 3. | Accountability; Swaraj's answer | Decided |
| M4 | Transient failures retried at the tool layer, with bounded backoff. | Failure (line 52); avoid-repeating file (line 26) | Decided |
| S7 | Intent written before an irreversible effect. | Harness (lines 64, 1159) | Architecture-only (the harness draft); Section 6 S7 |
| S8 | Tools return structured evidence only. | Architecture-only (the harness citation is about retries, not evidence-only returns) | Architecture-only |
| S9 | Read the situation record for an earlier attempt before an irreversible action. | Failure (safe recovery, line 15) for the principle | Architecture-only (the record-read step) |
| S11 | Model output is data, schema-checked. | Security research | Decided |
| IB-7 | Tools return structured evidence to the worker. | Architecture-only | Architecture-only |
| IB-8 | Duplicate check before an irreversible action. | Architecture-only | Architecture-only |

### Configuration (Adjacent-Config)

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| Q1 | Typed registry: schemas, values, validation. | Growth (how businesses customise Tend) | Decided |
| Q2 | Catalogue lifecycle for new capabilities. | Growth (new communication channels, line 9; systems) | Decided |
| Q3 | Pinned policies and workflows at situation open; facts, platform rules, grants live. | Growth (evolve Tend, lines 9–18, 59) | Decided |
| Q4 | Missing configuration is a visible gap, never silent. | Growth; Channels | Decided |
| Q5 | Core versus configuration test. | Growth | Decided |
| S2 (schema) | Structured configuration checked against its schema. | Harness (lines 564, 1146) | Architecture-only |

### Improvement (Adjacent-Improvement)

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| R1 | Training traces separate from business memory. | can_tend_learn_automatically (line 8); harness Part 12 | Decided |
| R2 | Prompt optimisation limited to memory-owned assembly templates. | Prompt constitution (lines 22, 41, 42, 55) | Decided |
| R3 | Behaviour from verified traces; business rules never in weights. | Authority and memory conversation files; research | Decided |

---

## Open items, with the recommendation in the visible text

| Item | Recommendation (visible text) | Level 2 or other source |
|------|-------------------------------|-------------------------|
| Builder visibility | Level 2 explainability kept as it is. The compliance overlay masks production; the simulation environment shows everything. Swaraj's decision, 2026-10-09. | Swaraj (conversation); Level 2 compliance file, line 226 (masking) |
| Who commits the situation record | Each part writes its own kinds of update; the situation worker writes conclusions (Section 7 writer rules) | Understanding files say the validated result becomes the next version; conversation manager patches on message entry |
| Memory observes setup sessions | Yes, candidates only | Section 6 N13; not in Level 2 |
| Polling service as its own part | Yes, reporting results as events | Swaraj's direction; Section 6 H8, M5 |
| Who writes links between situations | The situation worker writes accepted links; memory or the conversation manager proposes (Section 7) | Harness lines 1081–1087, 1216, 1346 (disagree) |
| Who checks record writes | Provisional: the situation worker's step | Level 2 names no checker; the observer raises completion-rule breaches |
| Tenant data for model training | Default no, without written permission | Compliance (lines 115–117: "never by default") |
| Whether the configurator may pass its power | Not until decided | Configuration capability (lines 38–40) |

## Harness contradictions this section does not follow

- The harness calls one situation per Durable Object the "natural concurrency boundary" (lines 1895–1899). That is a technology mapping, and Section 7 does not use it as a justification.
- The harness calls the optimizer "a separate service" (lines 785, 888). That is a deployment claim, and Section 7 does not use it as a justification.
- The harness treats memory as "its own component" (lines 927–931). Section 7 justifies memory by its responsibilities instead.

## Codes added 2026-10-09

Group letters (B, C, D, E, F, G, H, I, J, K, L, M, N, O, R, S, T, and P, Q, U) name the Section 6 groups. Each rule's own row is in `code_index_section_6.md`. The rows below cover codes that Section 7 uses but that had no row here.

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| AC-1 | Tenant context is set once, from verified identity, and travels unchanged. | Compliance (lines 48–54, 57–59) | Decided |
| AC-2 | Before an outgoing message: a policy check that returns Allow, Deny, or StepUp. | Compliance (lines 55–57, 92–95) | Decided |
| AC-3 | Approval returns through the tool flow. A denial is final. | Authority (lines 4–8); harness (line 1244) | Decided (approval through tool flow) |
| AC-4 | The authoritative permission store is read at enforcement. A cache never decides. | Harness (lines 2038–2042); coordination (line 170) | Decided |
| D8 | Match each ask to a source. If none can answer, record capability-absent. If a person can answer, open human work. | Gathering map; explainability (line 28) | Decided |
| HC-1 | Write and announce together. An unannounced write is retried. | Coordination (line 168); time (line 108) | Decided |
| HC-2 | The conversation manager works out what an incoming message means (its reading, an interpretation), then routes it. Only the situation worker commits conclusions. | Section 7 writer rules; Level 2 understanding (routing; ambiguity §9; 2026-09-04 MEANING note); Swaraj 2026-10-29; Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops A4, F2 | Decided (Swaraj, 2026-10-29: understanding first; working decision in Level 2) |
| HC-3 | Every wait goes in the book of waits. One check-in per situation. No polling inside the harness. | Time (line 106); coordination (lines 161–163) | Decided |
| IB-12 | Traces go to memory and knowledge in the background and never block a commit. | Harness (lines 1104–1110) | Decided |
| IB-13 | Memory and knowledge proposes configuration. Only the configurator's tools apply it, after validation. | Configuration capability (lines 13, 24) | Decided (apply path); Decided by Swaraj, Level 2 silent (memory and knowledge observes setup sessions) |
| IB-14 | Training-grade traces go to the improvement path, apart from memory and knowledge. | Harness (lines 1322–1343) | Decided |
| IB-15 | Before each part of each loop, the loop hands memory and knowledge what it holds and waits for its package. | Swaraj 2026-10-28 ("before running the next part of the loop… it will wait"); Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops A1, A2 | Decided (Swaraj, 2026-10-28) |
| IB-16 | A worker's send to another situation goes through intake as a keyed arrival, with a per-pair count. | Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops D3 | Decided (working decision in Level 2, written 2026-10-28 on Swaraj's instruction) |
| IB-17 | A person's situation in an outreach hands each new version to intake as an arrival for its central situation; nothing goes back down automatically. | Swaraj 2026-10-28 ("every single update will go to… the central situation model"); Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops D4 | Decided (Swaraj, 2026-10-28; mechanism Decided (working decision in Level 2, written 2026-10-28 on Swaraj's instruction)) |
| IB-18 | Memory and knowledge's link keeper creates links from shared numbers and incident codes; writes no situation record. | Swaraj 2026-10-28; Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops D2, Part G | Decided (Swaraj, 2026-10-28) |
| IB-19 | Only the erasure tool starts an erasure, after its confirmation flow; the cleaner carries it out everywhere. | Swaraj 2026-10-28; Compliance (deletion recursive); Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops E3 | Decided (Swaraj, 2026-10-28) |
| IB-20 | A decision is checked against the newest version before it acts; re-checked just before an irreversible action. | Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops F1 | Decided (working decision in Level 2, written 2026-10-28 on Swaraj's instruction) |
| IB-21 | The conversation manager understands an arrival before routing it and saves its reading with the arrival; the worker reads the reading and never re-derives the meaning. | Level 2 understanding (ambiguity §8.1: "Other responsibilities consume the explicit result"); harness 12.4; Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops F2 | Decided (Swaraj, 2026-10-29: understanding first; working decision in Level 2) |
| IB-22 | Routing runs one at a time per person, keyed by the person ID found from the channel address; two channels of one person share one queue. | Swaraj 2026-10-28 ("not a WhatsApp number"); Level 2 coordination (one situation, one story); Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops F2 | Decided (Swaraj, 2026-10-29: understanding first; working decision in Level 2) |
| IB-23 | The worker understands new content before it plans or decides; a new situation's reading is its first understanding. | Swaraj (Cursor transcript); Level 2 understanding and gathering; Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops F1 | Decided (Swaraj, 2026-10-29: understanding first; working decision in Level 2) |
| M5 | Unknown outcome on an irreversible action: the same key is reused only if the other side honours it; otherwise a bounded status check and a separate polling service; after the settle window, no automatic redo. | Failure (conversation file, line 52; recover file, lines 18–19) | Decided (rule); Decided (separate polling service); Open (number of status checks) |


## Changes of 2026-10-28

The memory part is now memory and knowledge (Swaraj, 2026-10-28), designed in `Level 2/memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops.md`. Links are created and maintained by memory and knowledge's link keeper; the 2026-10-09 rule (memory proposes, the situation worker accepts or denies) is superseded. Outreach has a central situation, not a board. Added IB-15 to IB-20. Section 6's new codes A14, A15, N18–N35 and U7 are carried by the memory and knowledge part.

## Changes of 2026-10-29 (understanding comes first)

The writers table now carries the conversation manager's reading of each arrival, which HC-2 had always implied ("works out what an incoming message means"). The memory and knowledge section's points, fixed parts, retrieval filter and visibility rule changed: R1 before the reading, R2 with candidates from it, R3 before the check after an AI choice, W0 before the worker understands new content; using the business's knowledge is separate from showing records. Added IB-21, IB-22, IB-23; changed HC-2. Source: the Level 2 design, corrected 29 October 2026, and the audit in `memory_and_knowledge_drafts/` (files 40 to 46).
