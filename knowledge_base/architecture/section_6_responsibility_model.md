# Section 6 — Tend Responsibility Model

## Status

**Working — full Level 2 category remediation pass (2026-09-18)**

Expanded after: Memory observe/learn/serve; Groups Q–R; **Groups S/T/U** (harness control, authorization control, compliance enforcement); category-specific additions §6.4.1. Consolidated from 2026-09-18 Level 2 category pass (P0 merged into §6–§8).

**Scope:** All major situation classes — outreach, inquiry, order, logistics, refund, stakeholder, unreliable external APIs.

**Output type:** Responsibilities and clusters — **not** final subsystem boundaries (Section 7).

---

## 6.1 Purpose

Section 6 answers:

> **What must Tend reliably own across operational problems — stated as outcomes, not as services or technologies?**

Components (Situation Worker, Conversation Manager, etc.) are conclusions from Section 7. They appear here only as provisional cluster hints.

**Method reference:** [`three_level_framework/architecture_contruction.md`](../three_level_framework/architecture_contruction.md) §6.

---

## 6.2 The sentence everything decomposes from

From Level 1:

> When a relevant event changes a business situation, Tend must understand the change, choose the correct next behaviour within granted limits, and keep the work moving until a safe outcome or a visible handoff is reached — even when no person is watching.

---

## 6.3 Situation graph, identity anchor, and derived journey

**Read A3, A5, and A10 together.** Alone, any one line is easy to misread.

### 6.3.1 Three layers (not one)

| Layer | What it is | Example |
|-------|------------|---------|
| **Situation graph** | Nodes = operational problems (situation models). Edges = **operational context** (same order, same incident, same campaign outcome, causal follow-on). | Order #8821 delivery delay **linked to** wrong-item situation on same order — separate nodes, shared order edge. |
| **Identity anchor** | Stable person/organisation beside the graph. Actor on situations; not a CRM master record. | Priya participates in outreach S1, order S2, refund S5. |
| **Derived journey** | On-demand **projection** over situations a person touches + time + journey edges. Not stored as separate truth. | "Priya's journey" = outreach → engaged → ordered → delivery issue → refund — computed from graph + identity. |

### 6.3.2 What "links by operational context, not identity alone" means

**Means:** Do not create a situation-to-situation link **only** because the same person is involved.

**Does not mean:** Ignore identity. Identity is essential for:

- routing inbound messages to the right person's open situations;
- owner query: "What is Priya's journey?";
- memory: prior closed situations inform new ones **through explicit links**, not silent merge.

**Anti-pattern (CRM thinking):** One link connecting all of Priya's situations "because Priya."

**Correct pattern:**

```text
S_outreach (campaign 4) ──led_to──► S_order (#9912)
        │                                    │
        │         same_person: Priya         │
        └────────────────────────────────────┘
              (identity anchor, not a merge)

S_order ──same_order──► S_delivery_delay (#9912)
S_order ──same_order──► S_wrong_item (#9912)
        (operational edges — owner finds both via order #9912)
```

### 6.3.3 Split, link, do not merge (A2 + A5)

- **Same operational problem** → one situation (attach across channels).
- **Different operational problems** → separate situations, **link** for context.
- **New problem after closure** → new situation card, link to closed card (Kanban rule).

Examples:

| Case | Action |
|------|--------|
| Priya outreach declined; owner starts new value-prop outreach months later | **New S2**, link to closed S1 |
| Priya replies on same unresolved outreach | **Same S1**, attach event |
| Delivery delay + wrong item, same order | **S_a + S_b**, link via order |
| Campaign 4 led to order #9912 | **Typed link** `converted_from_campaign_4` or journey edge |

### 6.3.4 Closure and outcome

- **Operational liveness** (Coordination): running | waiting | blocked | completed.
- **Artifact visibility** (Product Vision): preparing, message sent, waiting for reply, engaged, needs employee, meeting requested, ready for owner, paused, closed, unable to proceed.
- **Outcome tag on closure:** declined, exhausted_no_response, handed_to_owner, stopped_by_owner, converted (with link to new situation), etc. — refine with product; not a fixed enum yet.

Tend **records** how the story went. Tend does **not** own whether Priya buys or keeps a refund.

**Sources:** Journey conversation record; Understanding (route/split/link); Coordination (Kanban closure); Product Vision §thirty-leads scenario.

---

## 6.4 Responsibility catalog

Format: **ID — Tend must… — So that… — KB source**

### Group A — Situation representation and graph

| ID | Responsibility | So that | Source |
|----|----------------|---------|--------|
| A1 | Represent each operational problem as one versioned situation model | One problem has one honest story | Understanding; Coordination |
| A2 | Treat one situation as one operational problem with one resolution path | Delivery delay ≠ wrong item on same order | Understanding (split early) |
| A3 | Link situations by operational context, causal follow-on, and typed business references — not by shared identity alone | Order search returns both stories; graph is not one blob per person | Understanding; Journey §graph |
| A4 | Split one message into multiple situations when it contains distinct asks | Two orders in one message → two paths | Understanding |
| A5 | Link related situations without merging models | Context travels; decisions stay separate | Understanding |
| A6 | Close a situation permanently when its operational problem is done | Kanban card is final | Coordination |
| A7 | Create a new situation for a genuinely new problem; link to prior closed situations | Second outreach is S2 → S1, not reopen | Coordination; `how_do_we_recover_interrupted_work.md` |
| A8 | Reopen closed situation only for wrongful closure or same problem regressed | "Refund said done but wasn't" may reopen | Understanding; Coordination |
| A9 | Record closure outcome on the situation | History is auditable | Product Vision; Coordination |
| A10 | Derive person-level journey as projection over identity anchor + situations + time | "Priya's journey" without flattening separate problems | Journey; `how_is_the_person_level_journey_derived_from_the_situation_graph.md` |
| A11 | Start new contacts as relationship unknown; refine with evidence | Investor vs prospect not guessed at first byte | Journey conversation record |
| A12 | Record **stated ask** separately from **inferred operational problem** | Delivery question vs billing root cause both visible | Understanding stated-vs-real problem |

### Group B — Event reception and routing

| ID | Responsibility | So that | Source |
|----|----------------|---------|--------|
| B1 | Receive events from messages, instructions, systems, agents, time | Situations wake without chat | Level 1; Product Vision |
| B2 | Route each event to correct situation(s) or create new, **before** business-system gather | Wrong ERP fetch does not run on wrong problem | Understanding (route before gather) |
| B3 | Use tiered routing: hard → attach/create; soft → ask, never guess | "Any update?" with 3 open orders does not attach randomly | Understanding |
| B4 | Correct routing via split, merge, or re-route when later evidence proves assignment wrong | Mis-routing is normal correction | Understanding |
| B5 | Assemble incoming-event context once; router uses summaries, understanding uses full routed models | Router and understanding do not drift | Understanding |
| B6 | Create separate situations from one list instruction plus aggregate assignment artifact | 30 leads = 30 stories + one board | Product Vision; Coordination |
| B7 | Record ingest records with platform references | Tend coordinates; platforms own canonical messages | Understanding (data categories) |
| B8 | When same vs related is unclear, **prefer separate situations + link** over silent merge | Wrong merge poisons gather and decide | Understanding routing |
| B9 | On soft routing, record **held attachment** without confident model update | "Any update?" does not corrupt wrong situation | Understanding routing |

#### B4 — Routing ownership (Level 2)

| Phase | Responsibility |
|-------|----------------|
| **Ingress route** | On event arrival: identify actor, match open situations, attach/create/hold. Provisional runtime: Conversation Manager. |
| **Correction route** | After gather or new evidence: split, merge, re-route. Triggered by gather discovering wrong attachment. Provisional runtime: Situation Worker writes routing-correction artifact to graph. |

Routing is an **Understanding** responsibility split across ingress and correction — not permanently owned by one component name.

### Group C — Comprehension

| ID | Responsibility | So that | Source |
|----|----------------|---------|--------|
| C1 | Update routed situations with what the event adds | Model reflects current understanding before acting | Understanding |
| C2 | Represent ambiguity and uncertainty explicitly | Guesses are not silent facts | Understanding (ambiguity) |
| C3 | Select information relevant to this situation; ignore the rest | Context stays bounded | Understanding (relevance) |
| C4 | Separate observations, claims, interpretations, decisions | Audit distinguishes customer words from Tend inference | Trust & Evidence; Understanding storage |
| C5 | Classify unresolved comprehension by ambiguity type (ask, reference, scope, situation-assignment, …) | Clarification targets smallest unresolved field | Understanding ambiguity doc |
| C6 | Separate **communication answered** from **operational resolved** on the record | Reply sent ≠ refund completed | Understanding routing |

### Group D — Gathering information

| ID | Responsibility | So that | Source |
|----|----------------|---------|--------|
| D1 | Identify what information could change the next safe step | Gathering is purposeful, not exhaustive | Gathering Q1 |
| D2 | Know which actor owns each piece of information | Tend asks the right source | Gathering Q2 |
| D3 | Discover where information lives (source map) | Tend does not assume one database has everything | `how_do_we_discover_where_information_lives.md` |
| D4 | Retrieve in context-dependent priority after domain understanding and source selection | Retrieval is not "search engine top result" | Gathering Q4; see §6.4.1 |
| D5 | Handle gradual arrival and mid-analysis change | Stale model updates | Gathering Q7–8 |
| D6 | Invoke business capabilities when they are the right source | Apollo, ERP, carrier API | Product Vision; harness |
| D7 | Record gather results with pointer and timestamp | Tend does not replace ERP as master | Understanding Category 3 |
| D8 | Run deterministic **ask→source match** before retrieval; if no capable source exists anywhere, record **capability-absent** — not failure, not guess | Package-status question cannot silently answer from payment data | Gathering map; Explainability D2 |

#### D1 — Example

Customer: "Where is my refund?"

| Could change next step | Does not matter yet |
|------------------------|---------------------|
| Refund initiated? Gateway status? Amount? Policy window? | Full order history from 2022; marketing prefs |

#### D4 — Three-step gathering discipline

Inspired by domain-aware research (see construction record §3.6). Maps to KB source map + priority docs.

```text
Step 1 — Understand the ask in domain context
        Do not let model priors guess subject meaning
        ("Apple" = fruit vs stock vs company — disambiguate in this business)

Step 2 — Establish where knowledge lives for this class of question
        Source map: which systems, people, capabilities, channels
        are authoritative or useful for THIS claim in THIS domain
        (not generic web SEO ranking)

Step 3 — Retrieve in priority order
        Context-dependent pass: authority, currentness, consequence,
        cost of human involvement, what unblocks the next safe decision
```

**Sources:** `how_do_we_discover_where_information_lives.md`; `how_do_we_prioritise_which_information_to_retrieve_first.md`; `understanding_all_gathering_information_questions.md`.

### Group E — Trust and evidence

| ID | Responsibility | So that | Source |
|----|----------------|---------|--------|
| E1 | Treat claims as structured propositions with provenance | "Carrier says delivered" ≠ "customer received" | Trust & Evidence |
| E2 | Evaluate evidence deterministically by source authority and rules | LLM does not decide truth | Trust & Evidence |
| E3 | Represent uncertainty structurally — not as fake numeric LLM confidence | Weak evidence is explainable | `how_do_we_represent_confidence_without_pretending_certainty.md` |
| E4 | Identify conflicting information | API vs customer both visible | Trust & Evidence |
| E5 | Resolve or surface conflicts per policy | No silent pick-a-side on high consequence | Trust & Evidence; Failure |
| E6 | Distinguish facts from assumptions | Assumptions updatable when evidence arrives | Trust & Evidence |
| E7 | Mark evidence **degraded** when using fallback or stale substitute — with reason | Bounded progress stays honest; irreversible paths fail closed | Failure partial-unavailability doc |
| E8 | Apply **action-specific block** from evidence state + consequence matrix | Same conflict blocks refund but may allow status message | Trust stop-workflow doc |
| E9 | Advance loop on **evidence-state transitions** only (Fork C) — not LLM self-report | Worker cannot spin on fake progress | Confidence doc Fork C |

#### E2 — Walkthrough

Carrier API: `delivered 14:05`. Customer: "I don't have it."

- System records **two claims**, conflict, sources, times.
- Deterministic rules apply authority and consequence — not LLM vote.
- Next behaviour: investigate, ask carrier, escalate, interim message — per policy.
- Situation does **not** close as "delivered" while conflict stands on high-consequence path.

#### E3 — Confidence (qualitative vs quantitative)

| Mechanism | Role |
|-----------|------|
| **Evidence states, reasons, unknowns, conflicts** | Primary — what business and auditors see |
| **LLM qualitative explanation** | May describe uncertainty in language; **not** a control-path score |
| **LLM numeric self-confidence** | **Rejected** on safety and progress paths (harness 10.2.3; Trust overview) |
| **Quantitative option selection** (e.g. JEV-class models for discrete choices) | Possible **Level 3** convergence aid — separate from LLM token probabilities; never replaces grants/invariants |

Progress in worker loop = **evidence-state change**, not model claiming progress (Fork C ruling in confidence doc).

### Group F — Decision making and authority

| ID | Responsibility | So that | Source |
|----|----------------|---------|--------|
| F1 | Select Tend's next behaviour for current situation | Work advances stepwise | Decision Making map |
| F2 | Separate decision intention from operational state | LLM proposes; system owns timers | Decision Making |
| F3 | Continue loop within granted range without per-step user prompt | Owner not micromanaging 30 leads | Decision Making; Product Vision |
| F4 | Stop safely when no safe path | Unknown refund outcome does not double-post | Failure; Decision Making |
| F5 | Decide "enough information" relative to policy and consequence | Act when safe enough, not when perfect | `what_does_enough_information_mean.md` |
| F6 | Invoke **authorization control** (Group T, especially T2) after LLM proposal — not LLM judgment or story text alone | Model cannot authorize itself | Authority; Decision Making; Compliance |
| G1–G6 | (Authority group) Act in grant; ask approval; refuse honestly; keep accountability | Agency within delegation | Authority map |

*G1–G6 retained from authority category: grant range, approval, no permission expansion, honest refusal, accountability, invariants.*

### Group G — Authority and grants

| ID | Responsibility | So that | Source |
|----|----------------|---------|--------|
| G1 | Act only inside delegated grant range | Tend is agent, not principal | Authority |
| G2 | Ask approval when outside grant or grant requires approver | Large refund needs person | `when_must_tend_ask_for_approval.md` |
| G3 | Never expand permissions past delegator and owning systems | Tend only reduces access | Authority research |
| G4 | Refuse honestly with escalation path | Actor not left silent | Refusal doc |
| G5 | Keep grantor accountable after automated action | Responsibility visible | Authority |
| G6 | Enforce product invariants below configurator | Safety floor | Authority conversation |
| G7 | Apply grants and registry writes **only** via configurator deterministic tools | Runtime agents cannot widen delegation | `the_business_configuration_capability.md` |
| G8 | Resolve effective permission as **grant ∩ owning-system/connector permission ∩ invariants** | Tend never expands past delegator | Authority research; Compliance |
| G9 | Bind each wake/request to **verified principal** via identity↔authority join — not channel text or model extraction alone | Wrong person cannot act | `how_do_identity_and_authority_join.md` |

### Group H — Coordination and time

| ID | Responsibility | So that | Source |
|----|----------------|---------|--------|
| H1 | Keep situations alive via durable versioned records | Restart does not lose Priya's story | Coordination |
| H2 | Represent waits with subject, reason, resume trigger, escalation | "Waiting for carrier" is explicit | Wait spine |
| H3 | Distinguish waiting from blocked | Stale API → declared failure, not infinite wait | Coordination; Failure |
| H4 | Wake on message, system change, human answer, agent result, time | 3am delivery update continues story | Coordination; Time |
| H5 | Prevent duplicated work structurally | Two employees do not both refund | Coordination; Human Collaboration |
| H6 | Recover interrupted work from latest durable state | Worker crash continues, not restarts | `how_do_we_recover_interrupted_work.md` |
| H7 | Run nurture/follow-up as same-situation continuation when rules allow | Follow-up is useful, not spam cadence | Journey (followup vs outreach) |
| H8 | Treat **book of waits** as the subscription registry — resume triggers, not polling | Events wake the right situation | Coordination; harness Part 14 |
| H9 | **Write-and-announce** situation model change in one unit of work | Consumers never miss commits | harness Part 14 Decision 1 |
| H10 | On timer wake, **re-read latest** situation version before outbound decision | Superseded nurture/wait does not send stale action | Time; §7 IB-1, IB-4 |

### Group I — Communication

| ID | Responsibility | So that | Source |
|----|----------------|---------|--------|
| I1 | Express permitted useful interaction to appropriate actor | Communication is output, not policy engine | Communication map |
| I2 | Send only what recipient may see | Investor ≠ internal ops detail | Communication; Channels |
| I3 | Wait when communication would mislead or be premature | No hourly "still looking" noise | `when_should_tend_wait.md` |
| I4 | Ask when reference or information missing | Soft routing → question | Communication; Understanding |
| I5 | Explain at depth appropriate to role | Owner may see more than customer | Explainability |
| I6 | Communicate uncertainty and conflict honestly | Trust preserved | Uncertainty/conflict comms docs |
| I7 | Record **communication intent** on the story; **membrane** shapes, gates, and sends — worker does not transport | Fork B: expression separated from advancement | Communication map; harness §11.6 Fork B |

### Group J — Human collaboration

| ID | Responsibility | So that | Source |
|----|----------------|---------|--------|
| J1 | Make human involvement explicit when next safe step needs a person | Pricing exception → employee | Human Collaboration |
| J2 | Determine kind of involvement (inform, approve, investigate, perform, represent) | Investor ask ≠ carrier investigation | Human Collaboration |
| J3 | Route to correct person, role, queue, or partner | Stale tracking → carrier contact | Human Collaboration; Meetings Q6 |
| J4 | One responsible owner per human work item | No duplicate refund ownership | Human Collaboration |
| J5 | Escalate when human does not act | Stuck work surfaces | Escalation docs |
| J6 | Record human result and re-enter decision loop | Employee answer continues story | Human Collaboration lifecycle |
| J7 | Distinguish **unavailable** assignee from **non-responsive** assignee; apply coverage/delegation rules before blind escalation | Vacation ≠ ignored request | Human Collaboration map Q8 |
| J8 | **Transfer** human work with full context; treat notification as **pending** until acceptance | Handoff does not lose authority or deadlines | `how_do_we_transfer_work_between_employees.md` |
| J9 | Verify **substitute authority** before irreversible action on transferred or covered work | Coverage does not imply unlimited grant | Authority default range research |

### Group K — Meetings and external partners

| ID | Responsibility | So that | Source |
|----|----------------|---------|--------|
| K1 | Treat meeting as invite + wait on people and date | "Wants demo" → schedulable | Meetings spine |
| K2 | Book inside eligibility ∩ calendar ∩ expressed intent | Human time not wasted | Meetings Q2 |
| K3 | Record cancel/miss/reschedule as meeting events | No-show has next step | Meetings Q3 |
| K4 | Contact external partner when escalation requires | Carrier human when API dead | Meetings Q6 |

### Group L — Channels and permissions

| ID | Responsibility | So that | Source |
|----|----------------|---------|--------|
| L1 | Know per-channel rules (initiate, reply, window, template) | WhatsApp compliance | Channels Q1 |
| L2 | Record consent and preferred channel separately from active thread | New outreach ≠ reply thread | Channels Q2 |
| L3 | Reply in current channel; initiate through gated sequence | Channel compliance structural | Channels Q3 |
| L4 | Enforce narrow default visibility per role | Employee sees less than owner | Channels Q4 |

### Group M — Failure and resilience

| ID | Responsibility | So that | Source |
|----|----------------|---------|--------|
| M1 | Declare failure as audited event — not a fifth card state | Card stays running/waiting/blocked/completed | Failure spine |
| M2 | Declare failure when wait bound exceeded and path unusable | 4 days same tracking → next step | Failure decision 1 |
| M3 | Triage failures by consequence, severity, promise clock | Not every blip wakes owner | Failure decision 2 |
| M4 | Retry at tool layer with bounded backoff | No LLM retry storm | Failure decision 3 |
| M5 | Handle unknown outcome on irreversible actions without re-issuing | Gateway silent after refund post | Failure (refund example) |
| M6 | Escalate to human when automated path exhausted | Logistics contact when API dead | Failure + J3 + K4 |

### Group N — Memory and knowledge

**Read N1–N16 together with the N3/N15 table below.** Injection (N1, N11) is only the **serve** half of Memory.

| ID | Responsibility | So that | Source |
|----|----------------|---------|--------|
| N1 | Assemble phase-specific context — not full memory dump | Right slice per decision phase | `how_do_we_assemble_context_for_each_situation_phase.md`; Memory conversation record |
| N2 | Carry closed situations forward only via links and relevance | S1 decline informs S2 via link, not merge | `how_should_previous_conversations_influence_future_decisions.md` |
| N3 | Learn operational self-improvement per business — never change rules | Tool args yes; refund policy no | `what_kind_of_learning_is_acceptable.md`; Authority conversation (knowledge vs behaviour) |
| N4 | Preserve episodic experience for audit and learning | What happened is recoverable | `what_should_tend_remember.md` |
| N5 | Maintain graph-shaped references between memories and situations | Prior outreach visible in graph | Memory conversation record; `how_should_memory_be_stored_conceptually.md` |
| N6 | Consume operational traces from worker runs and configurator sessions; record experience asynchronously | Trace recording ≠ learning activation; loop stays fast | `can_tend_learn_automatically.md`; harness study §11.2.3 |
| N7 | Extract candidate lessons from experience using **external** failure signals | Self-reflection alone is not enough | `how_should_tend_learn_from_its_own_mistakes.md`; DeepMind self-correction research (Memory conversation) |
| N8 | Reconcile learning by structured claim-family identity — add, merge, refine, supersede, keep-conflict, no-op | Same meaning different words does not duplicate; ambiguous match does not silently overwrite | `how_should_new_learning_be_reconciled_and_versioned.md` |
| N9 | Maintain lifecycle on learned items — active, stale, superseded, conflicting, retired, unresolved | Outdated vocabulary does not poison new decisions | `how_do_we_prevent_outdated_knowledge_from_influencing_new_decisions.md`; `how_do_we_update_knowledge_when_reality_changes.md` |
| N10 | Evaluate automatic learning by replay/regression; reverse harmful lessons | Automatic ≠ unobserved | `how_do_we_evaluate_automatic_learning.md` |
| N11 | Serve loader slices from a **context need** — to worker phases **and** membrane routing at scale | Router never scans all situations; each stage gets its subset | `how_should_memory_be_retrieved.md`; harness study §11.2.1–11.2.2 |
| N12 | Maintain descriptive business knowledge — local vocabulary, aliases, conventions, procedural lessons | "Dispatch ready" means X **in this business** | `what_belongs_in_long_term_business_knowledge.md` |
| N13 | Observe configurator setup conversations; produce **configuration candidates** for deterministic application | Owner configures via helper; memory captures intent — **not** LLM grant authorization | `the_business_configuration_capability.md`; Growth registry; prompt constitution (preferences layer) |
| N14 | Maintain two configuration artifact classes — **structured** (schema-bound values, tool args, registry JSON) vs **prose preferences** (runtime-injected behaviour text) | Rules stay in code; preferences inject at generating step | `understanding_the_prompt_constitution.md`; Growth Q5 |
| N15 | Keep **business content learning** separate from **product behaviour improvement** | Business knowledge in memory at runtime; adherence in weights — not mixed | Authority conversation (knowledge vs behaviour); `observability_explainability_and_finetuning_research.md` |
| N16 | Preserve provenance, scope, version, and allowed-influence on every memory item; remain **advisory** | Learned memory never overrides policy, grants, or authoritative sources | Memory map §Working decisions; Trust & Evidence boundary |
| N17 | **Never** store credentials, secrets, or authentication material as business memory | Vault stays outside KB activation | `what_should_never_become_memory.md`; Compliance |

#### N3 / N15 — Two learning axes (do not conflate)

| Axis | What changes | Mechanism | Must not |
|------|--------------|-----------|----------|
| **Business content learning** (N3, N6–N12, N14) | What Tend **knows about this business** — vocabulary, sources, tool preconditions, conventions | Memory pipeline: experience → lesson → reconcile → retrieve | Change grants, policy, authority, or invariants |
| **Product behaviour improvement** (N15, Group R) | How Tend **comports** — artifact shapes, stop-and-ask, honest endings | Fine-tuning flywheel, prompt optimizer on **assembly templates only** | Bake business-specific content into weights; edit universal/stage constitution |

Configurator setup (owner helper / "jackbot"): runtime Tend for employees does **not** perform grant writes. The configurator agent uses **deterministic configuration tools** (Group Q). Memory **observes** those sessions (N6, N13) and maintains derived vocabulary, preferences, and candidate structured values — applied only through the configuration capability and registry validation.

### Group O — Business view and explainability

| ID | Responsibility | So that | Source |
|----|----------------|---------|--------|
| O1 | Present work as artifacts — not chat wall | 30-lead board filterable | Product Vision; Business View |
| O2 | Derive aggregate owner snapshot from situation graph | "What needs my attention?" | Business View |
| O3 | Surface owner attention for owner-only decisions, compliance, drifted escalations | Chargeback window visible | Business View Q2 |
| O4 | Explain recommendations, actions, failures on demand | "Why escalate Priya?" answerable | Explainability |
| O5 | Reconstruct finished situations for audit/replay | Post-mortem possible | Explainability |
| O6 | Observe system health separately from business artifacts | Builder vs owner views | Explainability |
| O7 | **Preserve trace always**; explain recommendations, actions, failures **on demand** | Audit complete without chat wall | Explainability D1 |
| O8 | Emit **observation events** on the same fabric (probes, drift, completion-discipline violations) | Observer is harness citizen, not polling | Explainability D6 |
| O9 | Show owner **business-value** views — never uptime/message counts for their own sake | Owner sees work state, not ops metrics | Business View + Explainability D3 |
| O10 | Route **capability-absent** to honest customer answer + product signal — **outside Failure triage** | Missing capability is not a failure card | Explainability D2; D8 |

### Group P — Business capabilities

| ID | Responsibility | So that | Source |
|----|----------------|---------|--------|
| P1 | Coordinate through capabilities without owning external canonical data | Apollo owns contacts | Level 1; Gathering |
| P2 | Recognize missing capability and surface honestly | "Connect Apollo or provide email" | Explainability capability-absent |
| P3 | Invoke capabilities only when grant and rules allow | No refund API without authority | Authority + F6 |

### Group Q — Configuration and evolution

Growth & Evolution category — previously **missing** from Section 6; added in gap remediation.

| ID | Responsibility | So that | Source |
|----|----------------|---------|--------|
| Q1 | Maintain typed configuration registry — product schemas, business values, validation | "Knobs" are structured records, not free text | `how_do_businesses_customise_tend_without_changing_its_core_behaviour.md` |
| Q2 | Join capabilities through catalogue lifecycle (request → evaluate → author → contract → validate → test → enable → monitor → retire) | New systems/channels/policies enter safely | `understanding_all_growth_and_evolution_questions.md` |
| Q3 | Apply four-plane change semantics — facts/grants live; policies/workflows pinned at situation open | In-flight situations not silently rewritten | `how_do_we_evolve_tend_without_breaking_existing_businesses.md` |
| Q4 | Surface absent or unsupported configuration as visible gap — never silent refusal | Product signal for missing capability | Growth; Channels visible-gap rule |
| Q5 | Enforce core/config boundary test | If a knob needs core change, it was mis-categorised | Growth Q5 |

**Boundary note:** Authoritative **grants and registry writes** belong to the **configurator's deterministic configuration capability** (Authority). Memory (N13) may **propose** candidates; Q1/Q tools **apply** after validation.

### Group R — Product improvement signals

Prompt constitution + Explainability research — **not** business memory. Same trace stream as N6; different consumers.

| ID | Responsibility | So that | Source |
|----|----------------|---------|--------|
| R1 | Preserve training-grade traces for product improvement — separate from business memory activation | One trace stream; two consumers (AutoSaddler / flywheel vs memory lessons) | `can_tend_learn_automatically.md` §note; harness study Part 12 |
| R2 | Bound prompt optimization to memory-owned **assembly templates** only | Constitution stays human territory | `understanding_the_prompt_constitution.md` |
| R3 | Improve model **behaviour adherence** via verified traces — never business rules in weights | Invariants become behavioural default without baking customer content | Authority conversation; `observability_explainability_and_finetuning_research.md` |

### Group S — Harness control (cross-cutting discipline)

**Not a single component.** Obligations implemented at B-Story, B-Membrane, Adjacent-Tool, and validators. See [`section_8_interaction_model.md`](section_8_interaction_model.md) §8.3–§8.7.

| ID | Responsibility | So that | Gate locus |
|----|----------------|---------|------------|
| S1 | Run **per-wake contract** (WAKE→RECOVER→PROPOSE→VALIDATE→EXECUTE→UPDATE→REST) | Every wake ends in honest rest | B-Story |
| S2 | **VALIDATE** proposal structure (schema, behaviour enum, Class 1–2 invariants) | Invalid LLM output never executes | B-Story; B-Membrane ingress |
| S3 | **Dispatch** fixed EXECUTE paths per behaviour (Fork A/B) | No ad hoc tool loop inside gather | B-Story |
| S4 | **Commit operational truth atomically** (IB-3, IB-11 pattern) | Unsafe next action structurally blocked | B-Story |
| S5 | **Write-and-announce** SM change with event (H9) | Wake consumers never miss commits | B-Story |
| S6 | **REST vs NEXT ROUND** from evidence-state predicate only (Fork C) | LLM does not own loop continuation | B-Story |
| S7 | **Persist intent before** irreversible side effect | Audit before money moves | Adjacent-Tool |
| S8 | Return **structured evidence only** from tools (IB-7) | Worker interprets claims | Adjacent-Tool |
| S9 | **Read SM for idempotency** before duplicate post (IB-8) — complements authorization, does not replace | Double refund blocked | Adjacent-Tool |
| S10 | Route **timer wakes to story only** (IB-1, IB-4, IB-9) | Nurture/refund recheck re-reads latest SM | Wake router |
| S11 | Treat **model output as data** — schema-validated, never instructions | Injection cannot change rules | All LLM artifact consumers |
| S12 | **Dedup** processed events at version/event-id | At-least-once delivery harmless | B-Story; B-Membrane |

### Group T — Authorization control (cross-cutting discipline)

**Centralized pattern, distributed gates:** TenantContext + Policy.decide before effects. See Compliance KB; [`section_8_interaction_model.md`](section_8_interaction_model.md) §8.4, §8.7.

| ID | Responsibility | So that | Gate locus |
|----|----------------|---------|------------|
| T1 | **Mint TenantContext** once per wake/ingress from verified identity only | Tenant hint in payload never authorizes | B-Membrane; B-Story wake |
| T2 | **Policy.decide(ctx, action, resource, args) → Allow \| Deny \| StepUp** before every effect | Model never self-authorizes | VALIDATE auth; Tool; egress |
| T3 | Enforce **effective permission** (G8) at decide time | Grant ∩ system ∩ invariants | Policy implementation |
| T4 | **Enforce before effect** — never start tool then discover denial | KB anti-pattern rejected | Adjacent-Tool; IB-5 egress |
| T5 | Read **authoritative grant/policy store** at enforcement — **cache never decides** | Stale rulebook cannot allow | All T gates |
| T6 | Re-check authorization at **each action boundary** within a wake | Revoked grant stops at next send/invoke | Per EXECUTE branch |
| T7 | Route **StepUp** through deterministic approval tool + membrane (Fork B) | LLM does not hold approval state | Tool + B-Membrane |
| T8 | Apply **grant/registry writes** only via configurator tools (G7; IB-13) | Runtime cannot widen delegation | Adjacent-Config |
| T9 | **Append-only audit** of context, decision, action — secret-free | Accountability after automation | Post-Allow execute |

### Group U — Compliance & security enforcement

| ID | Responsibility | So that | Source |
|----|----------------|---------|--------|
| U1 | Enforce **mechanical tenant isolation** on every store, cache, key, index, log, model call | One business never sees another's data | Level 1 §8; Compliance T-A |
| U2 | Treat **connected-system fields** as untrusted input; enforce prompt field allowlist | ForcedLeak pattern blocked | Compliance secure doc |
| U3 | Evaluate **compliance rule record** (law + platform + buyer) at configured checkpoints | GDPR/DPDP/residency traceable | Compliance actor map |
| U4 | Operate **kill switches** (per-shop tool/send/provider; global) | Containment without code deploy | Compliance deterministic list |
| U5 | Preserve **tool catalogue integrity** — versioned, hashed; no runtime tool registration | Supply-chain / MCP abuse blocked | Compliance; Growth Q2 |
| U6 | Run **T-A / T-B** release gates as architecture validation (U5 scenario) | Isolation and injection suites stay red | Compliance audit framework |

---

## 6.5 What Tend does not own

| Not Tend's job | Who owns it |
|----------------|-------------|
| Business goals, strategy, unbounded prospecting | Business / external agents |
| Canonical orders, payments, inventory | Business systems |
| Canonical messages on channels | Communication platforms |
| Whether customer buys, likes product, keeps refund | Customer / market |
| Refund policy thresholds | Business configuration |
| Carrier's internal investigation outcome | Partner |
| User authentication | Identity provider |
| Legal consent definitions per market | Compliance + law |
| Silent grant or policy change from memory observation alone | Configurator capability + Q1 registry |
| Business-specific rules baked into model weights | Product improvement path (R3) — business content stays in memory |
| Universal or stage prompt constitution edits by optimizer | Human + R2 — assembly templates only |
| Cache as permission source at enforcement | T5 — authoritative grant read only |
| Single "control module" owning loop and grants | Groups S + T distributed gates |

---

## 6.6 Scenario validation

### U1 — Priya business-directed outreach

| Phase | Responsibilities |
|-------|------------------|
| Owner gives list | B1, B6, A1, G1 |
| Profile + draft | D1–D6, C1, F1, N1 |
| No email | D6, P2, I4, H2, O1 |
| Send + nurture | I1, L1–L3, H2, H7 |
| Priya replies / declines | B2, C1, F1, H7, J1, A6, A9 |
| Second outreach later | A7, A3, N2, N5 |

### U2 — Inquiry → order → delay → refund

Many situations, one person, linked graph:

| Event | Situations | Key IDs |
|-------|------------|---------|
| Product inquiry | S1 | B2, A1, A10 |
| Places order | S2 + link S1 | A3, A5, A10, campaign link |
| Delivery question | S3 or attach S2 | D3, E4 |
| Stale carrier API | S3 | H3, M2, M6, K4, J3 |
| Unhappy + refund | S4, S5 | G2, M5, J4 |
| Refund gateway silent | S5 | M5, H2, J1 |

### U3 — Investor stakeholder

Stakeholder situation + obligations ribbon (not commercial lifecycle): B2, A11, D3, G2, J2, I2, L4, A6.

### U4 — Unreliable logistics API

D6 → H2 → M2 → M3 → J3/K4 → I1/I6 → B1/H4 → C1/F1.

### U5 — Security validation (T-A / T-B)

| Case | Responsibilities |
|------|------------------|
| Cross-tenant tool arg (Bloom reads Bob contact) | T1, T2, T3, U1 — Deny; store predicate; no provider call |
| Poisoned CRM note proposes export | U2, S11, T2 — untrusted label; Policy.decide Deny; audit secret-free (T9) |

---

## 6.7 Responsibility relationships

```text
B2 Route → C1 Understand → D Gather → E Trust → F Decide (behaviour selection)
                              ↓
              S Harness (loop, validate, commit) + T Authorize (before effect)
                              ↓
                    G Grant semantics + H Coordinate
                              ↓
              I7 intent → membrane express / J Human work
                              ↓
                         A Update situation
                              ↓
                         O Artifacts / explain
```

**S (Harness control)** and **T (Authorization control)** are cross-cutting — implemented at each boundary gate, not one box. **U (Compliance)** adds isolation, untrusted ingest, and release-test obligations.

N (Memory) **serves** into C, D, F, I (N1, N11) and **learns from** worker + configurator traces (N6–N10) — does not replace them.

Q (Configuration) owns registry and capability join; Memory **proposes**, Q **applies** structured values.

R (Product improvement) consumes traces in parallel with N6 — **behaviour** in weights, **content** in memory.

## 6.8 Candidate clusters (Section 7 input)

| Cluster | IDs (summary) | Owns the problem of… |
|---------|---------------|----------------------|
| 1 Story & graph | A1–A11, B7 | Honest record per problem; graph; closure |
| 2 Ingress & routing | B1–B6 | Which story does this event touch? |
| 3 Comprehension | C1–C4 | What does event mean? |
| 4 Information acquisition | D1–D7, P1–P3 | What from where, in what order |
| 5 Evidence structure | E1–E9 | What can we trust for next step? |
| 6 Behaviour selection | F1–F5 | What behaviour to propose next? |
| 6b Grant semantics | G1–G9 | What delegation means |
| 6c Harness control (cross-cutting) | S1–S12 | Loop, validate, commit, invoke mechanics |
| 6d Authorization control (cross-cutting) | T1–T9 | Permission before effect |
| 6e Compliance enforcement | U1–U6 | Isolation, untrusted data, release gates |
| 7 Temporal coordination | H1–H10 | Alive, wait, event fabric, nurture, recover |
| 8 Expression | I1–I6, L1–L4 | Say right thing to right actor |
| 9 Human & partner work | J1–J6, K1–K4 | People and partners act |
| 10 Failure & resilience | M1–M6 | Broken paths |
| 11 Memory & knowledge | N1–N16 | Observe, learn, maintain, serve business knowledge; config candidates |
| 12 Configuration & evolution | Q1–Q5 | Registry, capability join, four-plane change |
| 13 Product improvement | R1–R3 | Behaviour flywheel — not business memory |
| 14 Visibility & audit | O1–O6 | Business and builder see truth |

**Provisional runtime hint (Section 7 — not established):**

| Cluster | Hint |
|---------|------|
| 1 | Situation Model (D1) |
| 2 ingress, 8 egress | Conversation Manager |
| 3–7, 10 (partial) | Situation Worker |
| 11 | Memory — observer + loader + learning pipeline (B-Memory) |
| 12 | Configuration registry + configurator capability (partially adjacent to B-Memory observe) |
| 13 | Adjacent-Improvement — fine-tuning / prompt optimizer (not B-Memory) |
| 14 | Derived artifacts (B-Visibility) |

---

## 6.9 State ownership

| State | Authoritative owner |
|-------|---------------------|
| Situation model per problem | Tend |
| Situation graph edges & links | Tend |
| Identity anchor | Tend (relationship derived) |
| Canonical business facts | Business systems |
| Canonical channel messages | Platforms |
| Grants & business rules | Business configuration |
| Wait records & timers | Tend (deterministic) |
| Failure declarations | Tend audit |
| Ingest records | Tend |
| Learned business knowledge (lessons, vocabulary, preferences) | Tend Memory (N8–N12, N14) — advisory |
| Structured configuration values (registry) | Business configuration via Q1 — authoritative when applied |
| Configuration candidates from observation | Memory (N13) — non-authoritative until Q applies |
| Training-grade trace corpus | Product improvement (R1) — not business memory activation |
| TenantContext (per wake/request) | Minted at ingress/wake — ephemeral, not SM |
| Human work items / handoffs | Tend — J4, J8 lifecycle |
| Security audit log | Append-only, tenant-scoped, secret-free (T9, U3) |

---

## 6.10 Open questions

| # | Topic |
|---|--------|
| Q1 | Exact closure outcome enum |
| Q2 | Prospect → customer rule (business config) |
| Q3 | SM update significance filter for CM → owner chat |
| Q4 | SM write-ownership discipline (reason tags per writer) |
| Q5 | JEV / quantitative option models at Level 3 |
| Q6 | Derived person-view join in Business View |
| Q7 | Configurator agent naming and membrane placement (owner-only channel) |
| Q8 | Exact reconcile claim-family schema for N8 |
| Q9 | Split: memory-owned assembly templates vs stage constitution versioning |
| Q10 | Policy.decide action grammar; TenantContext field schema |
| Q11 | HC-/AC- contract index — see [`section_8_interaction_model.md`](section_8_interaction_model.md) §8.6–§8.7 |

---

## 6.12 Category coverage (Level 2 pass — 2026-09-18)

All 19 Level 2 categories mapped to §6.4 rows. P0 gaps from the category pass were merged into §6, §7, and §8.

| Category | Status |
|----------|--------|
| Memory & Knowledge | ✅ N1–N17; B-Memory in §7 |
| Growth & Evolution | ✅ Group Q; IB-13 adjacent |
| Prompt constitution | ✅ N14, N15, Group R |
| Compliance & Security | ✅ Group U + Group T |
| Harness / Authorization | ✅ Groups S + T cross-cutting |
| All other Level 2 categories | ✅ P0 rows in §6.4 |

**Still provisional (tracked in §7 / §8, not open KB gaps):** B-Memory learn path; B-Visibility derive; U3/U4 walkthroughs; §9–10 dimension stress.

---

## 6.13 Cross-cutting control disciplines

> **Harness control (Group S)** owns loop mechanics, proposal validation, commits, and invoke discipline. **Authorization control (Group T)** owns TenantContext + Policy.decide before effects. They meet at the **VALIDATE** step — structural failures vs permission failures are different diagnostics. Neither is a deployable monolith. See [`section_8_interaction_model.md`](section_8_interaction_model.md) §8.4.

---

## 6.11 Section 6 completion checklist

| Output (method §6.24) | Status |
|-------------------------|--------|
| Responsibilities | ✅ Catalog §6.4 |
| Graph / identity / journey unified | ✅ §6.3 |
| Relationships | ✅ §6.7 |
| State ownership | ✅ §6.9 |
| Authority & failure | ✅ Groups G, M |
| Candidate clusters | ✅ §6.8 |
| Negative responsibilities | ✅ §6.5 |
| Scenario validation | ✅ §6.6 |
| Open questions | ✅ §6.10 |
| KB traceability | ✅ Per-row sources |
| Category gap remediation | ✅ §6.12 + Groups S/T/U (full Level 2 pass) |
| Harness vs authorization named | ✅ §6.13 |

**Section 6 is complete enough for Section 8 interaction contracts** — B-Visibility and learn-path still need construction units.

---

## Related

- [`construction_record.md`](construction_record.md) — how this model was reached
- [`README.md`](README.md) — how to use this folder
- [`three_level_framework/architecture_contruction.md`](../three_level_framework/architecture_contruction.md) — method §6–§7
