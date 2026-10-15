# Section 9 scratch — Dimension 4: Uncertainty

**Assigned dimension:** Dimension 4 — Uncertainty  
**Scope:** Known, unknown, conflicting, provisional and related evidence states; progress without certainty; evidence and confidence semantics; distinction from failure.  
**Construction units used:** U1–U5, with U2/U3/U4 as the primary stress cases.  
**Status:** **Provisional — the logical distinctions are evidence-aligned, but this record does not mandate a Level 2 field schema or enumeration. Field shapes, encoding, co-occurrence rules and implementation choices remain Level 3/open.**

This is working analysis only. It does not change the canonical architecture files.

## 1. Force

Tend must act on business situations while the world is incomplete, changing, contradictory or only partly observed.

The force is not simply “bad data.” It includes at least these cases:

- the intended situation or ask is ambiguous;
- a relevant fact has no value yet;
- a source has returned a claim that is incomplete or too old for the decision;
- two claims disagree;
- a claim is usable only as a provisional interpretation;
- an external path is unavailable, so the business outcome is unknown;
- a previous claim or memory item is no longer current;
- the future result of an action is unknown even though the action itself is known;
- the actor may not be authorised to see information that exists;
- the next safe behaviour is available even though the preferred business outcome is not.

Product Vision and Level 1 require Tend to understand before acting, never guess, use facts before opinions, fail safely, remain explainable, and continue work without requiring a new prompt. The Level 2 answers refine this into a requirement to make progress relative to the next safe behaviour rather than waiting for complete knowledge.

The architectural question is therefore:

> How does Tend preserve the exact kind of uncertainty, continue safely where possible, stop only the affected unsafe behaviour, and distinguish an unknown business state from a failed path to obtain it?

## 2. Evidence authority and already-settled constraints

| Evidence | Constraint for this dimension |
|---|---|
| `Product_Vision.md`, “Understand before acting”, “Never guess”, “Use facts before opinions”, “Fail safely” | Missing or conflicting information remains visible; Tend does not manufacture certainty. |
| `Product_Vision.md`, delivery example | A carrier record can be useful but not sufficient to claim the real-world delivery outcome; a conflict must remain a conflict. |
| Level 1 assumptions | Information is distributed, no source is complete, knowledge changes, information may be incomplete or conflicting, and some situations require human judgement. |
| Level 1 invariants | Every decision is based on information available at that moment; the latest known state is used; important actions are explainable and traceable; waiting has a reason; communication does not expose more than needed. |
| Level 1 failure classes | Missing, conflicting and incorrect information; unavailable actors; communication failure; business inaction; and unexpected situations are normal cases to model. |
| `how_do_we_recognise_ambiguity_and_uncertainty.md` | Ambiguity means multiple plausible interpretations. Uncertainty means a possible interpretation or claim lacks enough support. They remain explicit and local to the smallest unresolved part of the model. |
| Trust and Evidence answers | Claims retain provenance, time, source, scope and reason. Evidence is evaluated deterministically; numeric and qualitative confidence scores are rejected as the primary representation. |
| Decision Making answers | “Enough information” is relative to a particular Tend behaviour and its consequence. A safe gather, ask, wait, human-work, bounded-communication or stop decision may be possible before the business outcome is known. |
| Failure answers | Uncertainty is honest while the current path remains usable and inside its bound. Failure is declared when the bound is crossed and the path is no longer usable. |
| Memory answers | Historical knowledge is not deleted when reality changes; stale, superseded, conflicting and unresolved items are filtered before retrieval and cannot override policy, grants or authoritative current sources. |
| `what_is_already_settled.md` | Do not merge a down carrier with a missing capability. Inside the configured carrier wait, the situation waits; past the bound it records a failure. No source and no person is capability-absent, not a carrier failure. |
| Section 6 | C2–C6, D1–D8, E1–E9, F1–F6, H2–H10, I1–I7, J1–J9, M1–M6, N1/N8/N9/N16, O1/O4/O7/O10 and S/T/U are already the responsibility owners relevant to uncertainty. |
| Sections 7–8 | B-Story is the sole operational-truth writer; tools return structured evidence; B-Membrane expresses committed situation deltas; timers wake B-Story; B-Memory is advisory; B-Visibility is derived and provisional. |

## 3. Section 9 dimension record

### 3.1 Force

Uncertainty cuts across the entire comprehend → gather → trust → decide → coordinate → communicate loop. It is not a new generic “uncertainty service.” It tests whether the current responsibilities and boundaries preserve distinctions that change safe behaviour.

The most important force is that the same observed event can have different meanings at different layers:

```text
Tool request timed out
        ↓
External business outcome: unknown
        ↓
Situation liveness: waiting while the settle bound remains open
        ↓
After the bound: retrieval path failure is declared
        ↓
Business outcome may still remain unknown
```

The tool path, the evidence state, the situation liveness and the business outcome must not be collapsed into one label.

### 3.2 Affected responsibilities

| Responsibility family | Effect of the uncertainty force |
|---|---|
| **C — Comprehension** | Preserve ambiguity, unknowns, candidate interpretations, observations, claims, interpretations and derived states separately. |
| **D — Gathering** | Identify only information that could change the next safe behaviour; distinguish unknown-but-obtainable, unavailable, stale and irrelevant unknowns; preserve gradual arrival and mid-analysis change. |
| **E — Trust and evidence** | Normalize claims, compare them, determine conflict, apply authority/currentness rules, record evidence state and reason, and apply action-specific blocks without pretending universal truth. |
| **F — Decision making** | Select a behaviour permitted by the current evidence and consequence. “Enough” is behaviour-relative; uncertainty constrains actions rather than stopping every situation. |
| **H — Coordination and time** | Store named waits, resume triggers, release policies, escalation paths and check-ins. A wait is not forgotten because the answer is unknown. |
| **I — Communication** | Express known, claimed, unknown, stale, conflicting and next-step information proportionately, without exposing internal tool traces or unsupported conclusions. |
| **J/K — Human and partner work** | Create focused human or partner work when ambiguity, conflict, missing information or an exhausted path requires a person; preserve responsibility and non-response. |
| **M — Failure and resilience** | Separate path failure from knowledge uncertainty; declare failure when the bound is crossed; do not turn an unknown irreversible outcome into a retry. |
| **N — Memory and knowledge** | Keep prior experience advisory, scoped, versioned and lifecycle-filtered; do not allow stale or provisional memory to become current business truth. |
| **O — Visibility and explainability** | Make evidence state, reason, provenance, current version, wait, blocked action and correction history visible to entitled viewers. |
| **S — Harness control** | Treat evidence transitions and honest waits/outcomes as progress; prevent the model from declaring its own progress or certainty. |
| **T — Authorization control** | Treat evidence as input to a permission decision, never as permission. A claim that exists is not necessarily visible or actionable by the current principal. |
| **U — Compliance and security** | Preserve tenant and field isolation while representing uncertainty; a restricted claim cannot be disclosed merely because it would reduce uncertainty. |

### 3.3 Affected boundaries

#### B-Story — survives and remains the owner

B-Story must remain the single logical owner of the versioned situation state and the only writer of operational-truth commits. It must commit the evidence state, reason, provenance references, active waits, human work, action block or bounded decision that the next wake must treat as ground.

The uncertainty dimension does not justify splitting the situation substrate from the worker. The U2 atomic move—initiation + unknown outcome + wait—still requires one operational-truth ownership domain.

Clarification: “operational truth” here means the committed, traceable state of what Tend currently knows, does not know, believes provisionally, or has found conflicting. It does **not** mean that Tend has proved universal real-world truth.

#### B-Membrane — survives; routing and expression must remain thin

B-Membrane can carry bounded candidate routing/meaning information, hold or ask when attachment is materially ambiguous, and express a committed situation delta. It must not resolve source authority, decide truth, or write outcome state.

HC-2 remains the correct boundary shape, but its provisional artifact schema must preserve alternatives and reasons rather than only a winner. A route can be `attach`, `create`, `hold`, `split`, `ask`, or `candidate` without pretending that the route is a confirmed business fact.

#### B-Memory — survives as advisory context

B-Memory remains one business-memory boundary. It must filter lifecycle and scope before ranking or serving knowledge. It can return a stale, provisional or unresolved memory item as a flagged advisory result when that is useful to explain why it cannot be used, but it cannot silently promote it into current evidence or alter a grant, policy, owner, source authority or irreversible-action line.

The uncertainty dimension does not justify a separate uncertainty-memory boundary. The existing serve/observe/learn separation is sufficient if the serve contract preserves state, provenance, version and allowed influence.

#### B-Visibility — survives but remains provisional

B-Visibility can derive owner and builder views from the story and traces. It must show enough of the evidence state to answer “what is unknown, why is this waiting, what source is conflicted, what changed, and what is the next safe step?”

Because the projection itself may lag, a derived view needs an as-of situation-model version or equivalent freshness indication. The view must not turn its own stale projection into a new business claim.

#### Adjacent-Tool — survives as evidence producer, not truth owner

Adjacent-Tool must return structured observations and transport/execution results, not a business-truth verdict. The result must allow B-Story to distinguish:

- no response or technical failure;
- valid response with no relevant value;
- valid but stale/degraded source claim;
- source claim that conflicts with another claim;
- and an outcome that remains unknown after an attempted irreversible action.

The tool’s bounded retry, poll, idempotency and authorization gates remain adjacent. The worker interprets the result into claims, evidence state, waits and failure declarations.

#### Adjacent-Config — survives as authority boundary

Configuration can define authority mappings, currentness rules, consequence/action blocks, wait bounds, release policy and escalation paths. Memory candidates and model proposals cannot apply those rules. Invalid, missing or contradictory configuration is itself a reason to choose human work or safe stop, not permission to guess.

#### Adjacent-Improvement — survives as a separate consumer

The improvement path may use verified traces of uncertainty, corrections, false certainty and safe endings to improve model adherence. It must not learn business-specific claims into product behaviour or treat model self-confidence as a target truth signal.

### 3.4 Affected interactions

| Interaction | Uncertainty stress and required behaviour |
|---|---|
| **Ingress route / HC-2** | Preserve hard, soft and candidate routing. Material ambiguity becomes hold/clarification/candidate state; it is not silently attached to one story or duplicated into all candidate stories. |
| **B-Story gather** | Use the decision-relative required-information set. A bounded gather pass may produce partial progress, a new claim, a stale/degraded marker or a wait; it does not need to resolve every fact or the final business outcome. “Enough information” remains relative to the next safe behaviour. |
| **Tool invoke / IB-7** | Return structured evidence with provenance and technical result. Successful transport does not imply a certain business claim. |
| **Irreversible invoke / IB-8, IB-11** | Initiation, unknown outcome and recheck wait are one story commit. A model proposal to retry is blocked by idempotency even if authorization allows the capability. |
| **Timer/recheck / IB-1, IB-4, IB-9, HC-3** | Wake B-Story, reread the latest situation version, and decide again. A timer is not evidence that the business state changed. |
| **Human work / J1–J8** | Present the relevant claims, unknowns, conflicts, reasons, deadline and choices. Acknowledgement is not completion; non-response remains visible. |
| **Partner escalation / K4** | Send only scoped evidence needed for the partner’s investigation; preserve internal claims and customer privacy separately. |
| **Egress / IB-5, §8.10.3** | Send from a committed situation-model version and explicit decision. Express bounded facts and uncertainty, not tool retries or unverified outcomes. |
| **Memory serve / IB-12** | Serve phase-specific, scope-filtered context with lifecycle state and allowed influence. Memory cannot make a stale claim current. |
| **Visibility derive / IA-8** | Derive evidence and wait views without writing story truth; expose version/as-of context and role-appropriate detail. |
| **Trace and improvement / IB-12, IB-14** | Preserve state transition, reason, source and outcome so false certainty and safe progress can be evaluated without activating business facts as product behaviour. |

### 3.5 Relevant invariants

The following existing invariants survive the dimension and become explicit tests:

1. **Never guess.** A provisional interpretation is never represented or communicated as an established fact.
2. **Operational truth is versioned and single-writer.** Claims, evidence state, waits, blocks and decisions are committed by B-Story; raw tool output and LLM reasoning are linked evidence, not story truth.
3. **Evidence is not authority.** A claim, even an authoritative source claim, does not grant permission or override policy.
4. **Enough information is behaviour-relative.** A situation may have enough information to ask, wait, investigate, communicate a bounded status, or create human work without enough information to resolve the business outcome.
5. **Uncertainty is action-specific.** A conflict or unknown blocks the affected unsafe action, not automatically the entire situation.
6. **Latest means latest known, source-owned state.** Wall-clock recency alone does not make a claim current.
7. **History is not rewritten.** Corrections and new evidence create a new complete situation-model version; earlier claims and communications remain reconstructable.
8. **Waiting is visible and bounded.** Unknown information has a subject, reason, resume trigger, release policy and escalation path when the situation waits.
9. **Failure is declared, not inferred from a model feeling.** Crossing the configured bound makes the path unusable and records a failure; it does not necessarily resolve the business unknown.
10. **Capability absence is not failure.** No system and no person able to serve an ask is a capability-absent conclusion, not a failed carrier path.
11. **Progress is structural.** An evidence/interpretation transition, new relevant source claim, honest wait/watch, declared outcome or permission change counts as progress; LLM self-confidence does not.
12. **Communication is a situation delta.** No receipt filler, no tool-log narration, and no unsupported certainty.
13. **Visibility is audience- and tenant-scoped.** Reducing uncertainty for one viewer cannot justify revealing restricted claims to that viewer.

### 3.6 Relevant failure and uncertainty semantics

The architecture needs separate but related **logical semantics**:

> The axes and labels below describe distinctions the logical architecture must be able to preserve. They are not a mandated Level 2 field schema, database shape or enum. Whether they become separate fields, tagged records, a constrained sum type, or another Level 3 representation remains open.

#### Knowledge/evidence axis

- `known` — a claim or interpretation is currently usable under the configured evidence rules for the relevant purpose; not universal truth;
- `unknown` — no usable value is currently present for a relevant claim or outcome;
- `conflicting` — compatible subject/property/time comparison found incompatible claims;
- `ambiguous` — multiple plausible interpretations or relationships remain;
- `provisional` — a working interpretation or claim is being used under a stated constraint and is not confirmed;
- `stale` / `degraded` — a claim remains available but is not current or is a fallback/substitute for the decision;
- `blocked` / inaccessible — the information may exist but the current actor or path cannot use it under permission or policy.

These are not one exclusive enum. They may co-occur. For example: “provisional target order + stale carrier claim + conflicting customer report.”

#### Path/operability axis

- current path usable;
- transiently unavailable and within bound;
- path failed after bound;
- no capability exists;
- human or partner unavailable/non-responsive.

#### Situation liveness axis

- running;
- waiting;
- blocked/safe-hold;
- completed.

#### Action disposition axis

- permitted;
- denied;
- requires StepUp/human approval;
- structurally blocked by idempotency or evidence consequence;
- safe bounded alternative available.

This decomposition is the current logical interpretation of the Level 2 answers and the U2/U4 walkthroughs. It prevents “unknown,” “failed,” “denied,” “capability-absent” and “waiting” from being used as interchangeable labels. It does **not** settle how those distinctions are encoded.

### 3.7 Observed tensions

1. **Progress versus certainty.** Waiting for every fact conflicts with Tend’s agency. Choosing a single best answer conflicts with “never guess.” The resolution is behaviour-relative progress with explicit unresolved state.
2. **Unknown versus failed path.** A carrier timeout can leave the delivery outcome unknown while the technical path is still within its bound; after the bound the path fails but the outcome may remain unknown.
3. **Conflict versus global stop.** A customer/carrier conflict may block compensation but permit a bounded status message or investigation.
4. **Source authority versus currentness.** A carrier is authoritative for its tracking record, but an old carrier record may be too stale for the current decision.
5. **Interpretation ambiguity versus fact uncertainty.** “Which order?” requires clarification/routing; “where is the order?” may require a source gather. Both must not be collapsed into a generic missing field.
6. **Partial external communication versus unfinished situation.** U3 proves that a cleared deck can be sent while revenue remains unknown; communication of one ask does not close the situation.
7. **Useful provisional context versus unsafe commitment.** A provisional route may organize a gather pass if alternatives do not change the path, but cannot drive an irreversible action or customer claim when alternatives matter.
8. **Memory usefulness versus memory poisoning.** Prior observations can help explain or retrieve, but stale or unresolved memory cannot override live source evidence, policy or authority.
9. **Visibility versus confidentiality.** A person may need the reason for uncertainty without seeing every restricted source or internal claim.
10. **Model explanation versus deterministic control.** The LLM may explain why it sees uncertainty; it cannot turn that explanation into a confidence gate, permission, conflict resolution or completion decision.
11. **Operational truth versus world truth.** B-Story must record what Tend is entitled to treat as current operational state without implying that Tend owns or has proved the external system’s underlying fact.
12. **Flat state vocabulary versus composability.** The existing words are useful, but a single status enum would make coexisting conditions unrepresentable and would force false transitions.
13. **Uncertainty progress versus Fork C.** Recording a candidate interpretation or corrected route may be real situation-model progress even when no business fact has arrived. Whether the existing “claim-state change” wording already covers this, or whether Fork C needs an explicit extension, is a reconciliation proposal—not an established Section 8 contract.

## 4. Scenario stress tests

### U1 — Business-directed outreach

**Stress:** A lead is contacted, no reply arrives, and the next follow-up is uncertain.

- Silence is not evidence of rejection, interest or completion.
- The situation can be waiting for a reply or a configured follow-up date without pretending to know the prospect’s intent.
- A follow-up decision must read the latest situation version; a late reply can supersede the wait before the timer path sends anything.
- The response/no-response and business-inaction paths are different from a carrier API failure, but both require visible responsibility and a next condition.

**Result:** B-Story, B-Membrane, H, J, I and S10 survive. Uncertainty is represented as an open wait or unknown response, not a guessed prospect state. U1 does not require a new uncertainty boundary.

### U2 — Refund gateway silent after initiation

**Stress:** The gateway may have processed the refund, but Tend has no confirmation.

Required committed move:

```text
refund initiation claim + outcome unknown + recheck wait
```

- The tool may have failed to respond, but the business outcome is still unknown.
- During the settle bound, liveness is waiting, not failure.
- A later recheck may confirm success or failure.
- After the bound, Tend records the path failure and hands the irreversible unknown to a person; it does not auto-redo.
- A second new initiation is blocked by idempotency, independently of authorization.

**Result:** The current U2 design is the strongest proof that uncertainty and failure are not one enum. B-Story + Adjacent-Tool + H + M survive unchanged in ownership; IB-11 and M5 are confirmed. The required correction is to state explicitly that the failure declaration and unknown outcome may coexist after the bound.

### U3 — Investor asks for deck and revenue

**Stress:** The deck is cleared; the revenue figure is still being gathered.

- The deck claim can be known and permitted for this recipient.
- Revenue remains unknown or incomplete.
- Tend may send the partial, committed situation delta if policy and visibility permit.
- The external recipient does not receive tool traces, internal conflict details or a falsely complete answer.
- The situation remains open for the revenue ask.

**Result:** Progress without certainty is a product behaviour, not an exception. B-Membrane’s Fork B and situation-delta egress survive. B-Visibility must represent partial completion without making the aggregate look complete.

### U4 — Stale or unavailable carrier tracking

**Stress:** The carrier exists in the registry, but the response is unavailable or not current enough.

Cases that must remain distinct:

1. **Carrier responds with a current claim.** Tend may communicate the bounded claim, not more than the source supports.
2. **Carrier responds with a stale or degraded claim.** The claim is retained with currentness limitation; Tend may communicate latest known state while acknowledging that investigation or a promise breach remains unresolved.
3. **Carrier path is unavailable within its bound.** The delivery outcome is unknown; the situation waits on the carrier/recheck path.
4. **Carrier path bound is crossed.** The carrier path failure is recorded; the delivery outcome can remain unknown; configured escalation begins.
5. **Customer says “not received” while carrier says “delivered.”** The situation has a material conflict. Investigation or a safe bounded message may proceed; “delivered” must not be presented as the complete customer outcome.
6. **No system and no person can answer.** This is capability-absent, not an API failure. If a person can answer, create human work instead.

**Result:** U4 confirms B-Story, B-Membrane, Adjacent-Tool, H, I, J, K, M and O responsibilities. It exposes the need for the evidence/path/liveness separation and a structured tool-result contract. No new Level 2 boundary is justified.

### U5 — Security validation / restricted evidence

**Stress:** A claim exists, but the current actor or tenant cannot access it.

- “Not available to this actor” is not the same as “unknown in the world.”
- Authorization denial is not a source conflict and not a technical failure.
- The worker may choose a safe alternative such as human work, a bounded explanation or stop-safe; it cannot disclose the restricted claim to reduce uncertainty.
- Tenant and field isolation apply to raw claims, evidence reasons, memory slices, traces and derived views.

**Result:** S/T/U survive, with the explicit rule that evidence state is never a permission source and uncertainty must be represented at the allowed disclosure level.

## 5. Architectural consequence

### 5.1 Represent uncertainty as typed, local evidence and interpretation semantics

The situation model must preserve, at the smallest useful unit:

- original observation;
- source claim;
- interpretation or candidate interpretations;
- derived comparison/evidence state;
- provenance, observation time, scope and source revision;
- reason for the current state;
- what remains unknown or conflicting;
- currentness/degradation;
- action-specific consequence;
- pending gather, human work, wait or escalation;
- and subsequent correction through a new complete **situation-model version**. “Complete version” means a complete record of Tend’s committed situation state at that point; it does not mean complete knowledge of the external world or final business outcome.

It must not branch the entire situation into every possible world, and it must not replace all of this with one confidence value. The logical distinctions are required; the final field and enumeration design remains Level 3/open.

### 5.2 Preserve orthogonal logical distinctions rather than forcing one status enum

The logical architecture should define the semantic separation even if Level 3 later chooses a compact representation. This is a semantic requirement, not a prescribed Level 2 schema. At minimum, the model must make it possible to answer independently:

1. What does Tend think the message or relationship means?
2. What claims are present and what is their evidence state?
3. Is the source/path usable, unavailable or failed?
4. Is the situation running, waiting, blocked or complete?
5. Is the proposed action permitted, denied, approval-gated or blocked by idempotency/evidence?

This is the central architectural consequence of the dimension. The specific field names, enum members, nesting and co-occurrence encoding remain provisional/open for Level 3.

### 5.3 Make progress a state transition, not a certainty claim

**Established Section 8 baseline:** the current Fork C contract in `section_8_interaction_model.md` §8.3.1 enumerates progress as a claim-state change, a new-source claim, a wait/watch record, a declared outcome or a permission change. The same five reasons are recorded in `how_do_we_represent_confidence_without_pretending_certainty.md` under the 2026-09-04 Fork C ruling.

Within that established baseline, the recorded progress reasons are exactly:

1. a claim subject’s evidence state transitions with a reason;
2. a required claim becomes available from a source not previously queried for it in that wake;
3. a wait or watch record is created, honestly refreshed or resolved;
4. a declared outcome is recorded; or
5. a permission/authority state changes.

Bounded communication, human work, escalation, failure and capability-absent handling can produce progress when their committed effect maps to one of those five reasons. Whether an interpretation or routing transition qualifies under reason 1 is not currently settled by Section 8.

The LLM’s statement that it is confident or that it made progress is never sufficient.

**Reconciliation proposal, not yet established:** a candidate interpretation, routing hold, split, attach or correction may be meaningful situation-model progress even when no new business claim has arrived. Section 9 should ask Section 10/11 to decide whether these transitions are already covered by “claim-state change” in the existing contract or require an explicit Fork C extension. This scratch record does not promote that extension to an established Section 8 rule.

### 5.4 Make action consequences explicit

Evidence state does not directly select one global system mode. It constrains the available next behaviours according to consequence and policy:

```text
current situation + evidence state + consequence + policy
        ↓
permitted next behaviour set
        ↓
S/T validation and execution gates
```

This preserves safe bounded actions while stopping unsafe actions.

### 5.5 Keep communication bounded and audience-specific

The customer, employee, partner, owner and builder may receive different projections of the same unresolved situation. Each communication should distinguish known, claimed, unknown, conflicting and next step at the appropriate level, without exposing raw traces or restricted source details.

### 5.6 Keep memory and improvement from creating false certainty

B-Memory may help retrieve a prior interpretation, source map or failure lesson, but current situation evidence and authoritative business configuration remain controlling. Adjacent-Improvement may learn from traces of uncertainty and correction, but business claims do not become product rules or model authority.

## 6. Decisions and constraints

1. **No universal numeric confidence field controls Tend.** Evidence states, reasons, provenance, currentness, conflicts and version history are the primary representation.
2. **Qualitative confidence labels are not a substitute.** If a future Level 3 model uses a quantitative option aid, it remains outside authorization, invariant enforcement, evidence truth, completion and stop gates.
3. **Ambiguity is local.** Preserve candidate meanings at the smallest unresolved field; do not duplicate whole situations.
4. **A provisional interpretation is allowed only when alternatives do not change the operational path or create an unsafe commitment.**
5. **Unknown is not failure.** Failure is about the usability of the current path after a bound; unknown is about the business/evidence state. Both may be present at once.
6. **Stale/degraded is not equivalent to absent.** A stale authoritative claim may support a bounded latest-known message but may block a promise, resolution or consequential action.
7. **Conflict is not automatically global.** Apply action-specific block rules; continue with safe gathering, investigation, bounded communication or human work when permitted.
8. **Capability-absent is not a failed integration.** It requires the D8/O10 honest limitation path and product signal, not Failure triage.
9. **B-Story commits uncertainty state with the operational move that depends on it.** For U2 this is initiation + unknown + wait; for partial gather it is claims + optional wait; for ambiguity it is candidate/hold/clarification state.
10. **Tool results remain structured evidence.** Adjacent-Tool must not write domain truth or infer that transport success equals business certainty.
11. **Timer wakes re-evaluate; they do not create evidence.** Every timer path reads the latest situation model before acting.
12. **All claims, reasons and derived states are subject to tenant, role, field and channel visibility rules.**
13. **The architecture remains technology-neutral.** Terms such as claim, wait, evidence state, source, reason, version and policy are logical semantics, not storage or implementation choices.

## 7. Rejected alternatives

| Alternative | Decision and reason |
|---|---|
| Single best interpretation | Rejected: hides material ambiguity, contaminates routing and violates “never guess.” |
| One interpretation plus numeric confidence | Rejected as the complete design: does not show alternatives, missing evidence, conflicts or currentness and creates false precision. |
| Qualitative low/medium/high confidence as the state | Rejected as a primary evidence field for the same reason; a reasoned state is more useful than a hidden score. |
| Branch the entire situation for every possible interpretation | Rejected: combinatorial growth, stale branches, confusing human view and a second workflow engine. |
| Store only raw messages and defer all interpretation | Rejected: no live model of what is unresolved, no clear routing/gathering/coordination state and repeated reinterpretation. |
| Treat any disagreement as a global situation stop | Rejected: conflicts are action-specific; bounded investigation or communication may remain safe. |
| Treat technical success as business certainty | Rejected: an API can respond with incomplete, stale or source-scoped information. |
| Treat all technical unavailability as capability absence | Rejected: a registered but down carrier is U4 failure/wait; capability absence requires no system and no person able to serve the ask. |
| Treat unknown outcome as permission to retry an irreversible action | Rejected: U2 idempotency and M5 require status checking, waiting and eventual human handoff. |
| Let the LLM decide truth, conflict resolution, permission or completion from self-confidence | Rejected by E2/E3/E5/E8/E9 and S/T controls. |
| Add a central Uncertainty boundary/service | Rejected: uncertainty is a cross-cutting lens over existing C/D/E/F/H/I/J/M/N/O/S/T/U responsibilities. The evidence and liveness ownership already fit B-Story, with Tool/Membrane/Memory/Visibility contracts. |

## 8. Trade-offs

- **Richer semantics versus model complexity:** Explicit states and provenance require more structure and more careful views, but a single clean label is unsafe for the product’s core problem.
- **Correctness versus speed:** Tend may take a slower gather, wait or human-work path; Level 1 explicitly values correct decisions over fast guesses.
- **Partial progress versus user expectations:** Bounded partial communication keeps the situation alive but requires careful channel, audience and promise policy.
- **Local uncertainty versus global context:** Keeping ambiguity at the smallest unresolved field avoids full branching, but downstream responsibilities must be able to consume candidates and reasons.
- **Source authority versus scepticism:** Authority identifies where to obtain or correct a claim; it does not eliminate stale, incomplete or conflicting evidence.
- **History versus current guidance:** Preserving old claims supports audit and correction; retrieval filters and allowed-influence rules prevent historical information from becoming current truth.
- **Centralized semantics versus distributed enforcement:** The evidence vocabulary is shared, while B-Story, Tool, Membrane, Memory and Visibility enforce their own contracts. This retains the existing S/T/U distributed-control model.

## 9. Evaluation signals

The dimension is behaving correctly when the following can be demonstrated through scenarios and traces:

1. A reviewer can distinguish an ambiguous reference, an unknown fact, a conflicting claim, a stale claim, a provisional interpretation, a path failure, a permission denial and capability absence.
2. Every customer-facing claim has evidence references and is qualified when currentness or uncertainty matters.
3. No situation is closed while a material ask is only unknown, conflicting, provisional or pending human work.
4. A situation can advance through gather, wait, bounded communication, human work or investigation without pretending the final business outcome is known.
5. U2 never produces a second irreversible initiation after an unknown result; the failure-after-bound path hands off rather than redoes.
6. U4 distinguishes current, stale/degraded, unavailable-within-bound, failed-after-bound, customer conflict and capability-absent cases.
7. U3 permits partial external fulfilment without disclosing internal evidence or claiming the unfinished ask is complete.
8. A timer wake never sends merely because time passed; it rereads current story state and evidence.
9. A memory item marked stale, superseded, conflicting or unresolved is not activated as current guidance without the required rule or correction.
10. Model self-confidence changes no permission, evidence state, completion result, failure declaration or progress decision.
11. Tenant/role/channel views do not leak restricted source claims while still explaining the permitted reason for a hold, denial or limited response.
12. The audit can reconstruct what was observed, what was claimed, what was inferred, what remained unknown, what changed, why the next behaviour was selected and who/what owned the next step.

## 10. Revisit conditions

Revisit this dimension and potentially Sections 6–8 if:

- a new scenario requires a kind of uncertainty that cannot be represented at the smallest relevant unit;
- a product decision proposes a universal confidence score or allows model self-confidence into the control path;
- the team cannot distinguish unknown business outcome from technical failure in traces or customer-visible state;
- a new capability has irreversible effects whose evidence/currentness/consequence rules are not expressible through the existing action-specific block model;
- configuration is missing, contradictory or expires in ways not covered by the safe human/escalation path;
- B-Membrane cannot carry materially ambiguous routing without silently attaching or duplicating a story;
- B-Visibility cannot show reason, provenance, version and as-of status without becoming a source of truth;
- B-Memory retrieval repeatedly promotes stale/provisional knowledge into current decisions;
- S/T/U controls disagree about whether a claim is evidence, permission or disclosure-authorized;
- Fork C treats interpretation/route corrections as “no progress” and loops or rests incorrectly;
- a scenario proves that a single B-Story commit cannot preserve the evidence, wait, action block and resulting communication atomically;
- the final Level 3 design needs a schema/serialization decision that changes the logical distinction between the axes above.

## 11. Evidence paths

- `knowledge_base/Product_Vision.md` — §5 delivery situation; §6 principles; §8 owner-visible outcomes.
- `knowledge_base/Level1_Problem_Framing_or_Expansion.md` — §2 assumptions; §6 interactions; §8 invariants; §9 failure classes; §12 Level 2 questions.
- `knowledge_base/three_level_framework/3_level_framework.md` — evidence, authority and Level 2/Level 3 separation.
- `knowledge_base/three_level_framework/architecture_contruction.md` — §4.21–4.22 evidence units and uncertainty; §8.30–8.37 scenario/interaction discipline; §9.1–9.4 dimension method; §9.8 uncertainty; §9.29–9.30 dimension gate/output.
- `knowledge_base/Level 2/understanding_the_situation/how_do_we_recognise_ambiguity_and_uncertainty.md` — ambiguity/uncertainty vocabulary, bounded candidate interpretations, provisional rule and evaluation criteria.
- `knowledge_base/Level 2/gathering_information/how_do_we_determine_what_information_is_required_before_making_a_decision.md` — decision-relative required information and partial gathering.
- `knowledge_base/Level 2/gathering_information/how_do_we_know_when_information_is_sufficiently_current.md` — currentness depends on decision, progress, dwell time and promise.
- `knowledge_base/Level 2/gathering_information/how_do_we_handle_information_that_changes_while_a_situation_is_being_analysed.md` — forward correction through complete situation-model versions.
- `knowledge_base/Level 2/trust_and_evidence/how_do_we_compare_information_from_different_sources.md` — canonical claims and deterministic comparison results.
- `knowledge_base/Level 2/trust_and_evidence/how_do_we_identify_conflicting_information.md` — material conflict definition and preserved claim families.
- `knowledge_base/Level 2/trust_and_evidence/how_do_we_distinguish_facts_from_assumptions.md` — observation, source claim, actor experience, interpretation, derived state, proposal, decision and action layers.
- `knowledge_base/Level 2/trust_and_evidence/how_do_we_represent_confidence_without_pretending_certainty.md` — rejection of numeric/qualitative confidence as primary state; Fork C progress ruling.
- `knowledge_base/Level 2/trust_and_evidence/how_do_we_determine_whether_information_should_be_trusted.md` — evidence state/reason, authority/currentness/conflict evaluation.
- `knowledge_base/Level 2/trust_and_evidence/how_do_we_resolve_conflicts.md` and `when_should_conflicts_automatically_stop_the_workflow.md` — rule-based resolution and action-specific stopping.
- `knowledge_base/Level 2/decision_making/what_does_enough_information_mean.md` — enough information for a safe Tend behaviour, not final business outcome.
- `knowledge_base/Level 2/decision_making/how_should_uncertainty_influence_project_xs_next_behavior.md` and `how_do_we_determine_whether_project_x_can_make_the_next_decision.md` — uncertainty constrains behaviours, not all work.
- `knowledge_base/Level 2/communication/how_should_tend_communicate_uncertainty.md`, `how_should_tend_communicate_conflicting_information.md`, `when_should_tend_wait.md` — bounded, audience-specific expression and visible waiting.
- `knowledge_base/Level 2/failure/how_do_we_distinguish_failure_from_uncertainty.md`, `how_do_we_recognise_failure.md`, `which_failures_can_safely_wait.md`, `how_do_we_avoid_repeating_the_same_failed_action_forever.md` — bound-crossing failure, safe waits, bounded retry and unknown irreversible outcomes.
- `knowledge_base/Level 2/time/how_should_tend_react_when_time_changes_the_situation.md`, `when_should_waiting_end_automatically.md`, `how_should_deadlines_influence_decisions.md`, `how_should_waiting_be_represented.md` — timer/recheck/release semantics and two clocks.
- `knowledge_base/Level 2/memory_and_knowledge/how_do_we_prevent_outdated_knowledge_from_influencing_new_decisions.md`, `how_do_we_update_knowledge_when_reality_changes.md`, `how_should_new_learning_be_reconciled_and_versioned.md` — memory lifecycle and forward correction.
- `knowledge_base/architecture/what_is_already_settled.md` — closed distinction between down carrier, missing capability, waiting, failure and configured escalation.
- `knowledge_base/architecture/section_6_responsibility_model.md` — Groups C/D/E/F/H/I/J/K/M/N/O/S/T/U and §6.9 state ownership.
- `knowledge_base/architecture/section_7_boundary_model.md` — §7.3 operational truth; §7.12 boundary records; IB-7/8/9/10/11/12/13/14; §7.12.9 gate table.
- `knowledge_base/architecture/section_8_interaction_model.md` — §8.3 per-wake and Fork C; §8.4 failure shapes; §8.8–8.15 contracts; §8.16.4 U3; §8.16.5 U4; §8.17 anti-patterns.

## 12. Strongest architectural discoveries

The discoveries are separated by architectural status so that evidence-aligned semantics are not mistaken for settled schema or contract decisions.

### Established by current evidence and Sections 6–8

1. **Uncertainty and failure are distinct logical concerns.** Failure describes the current path’s usability after a bound; uncertainty describes what is known about the business state. A failed carrier path or gateway path can leave the business outcome unknown.  
   Sources: `knowledge_base/Level 2/failure/how_do_we_distinguish_failure_from_uncertainty.md` (“Our answer”); `knowledge_base/Level 2/failure/how_do_we_recognise_failure.md` (“Our answer”); `knowledge_base/architecture/section_8_interaction_model.md` §8.13.2 “Unknown outcome liveness”; §8.16.5 U4 steps 5a/9.

2. **Enough information is behaviour-relative, not universal completeness.** Tend can have enough information to gather, ask, wait, communicate a bounded status, investigate or create human work without knowing the final business outcome.  
   Sources: `knowledge_base/Level 2/decision_making/what_does_enough_information_mean.md` “Our current answer” and “Working decision”; `knowledge_base/Level 2/decision_making/how_should_uncertainty_influence_project_xs_next_behavior.md` “Our current answer”; `knowledge_base/architecture/section_8_interaction_model.md` §8.3.1 Fork A/C.

3. **B-Story operational truth is scoped to Tend’s committed situation model.** It is the versioned, traceable record of what Tend currently records, does not know, provisionally interprets or finds conflicting for one situation. It is not external world truth and does not replace the source owner’s canonical record.  
   Sources: `knowledge_base/architecture/section_7_boundary_model.md` §7.3 “Load-bearing decision — operational truth in the situation model”; §7.12.1 B-Story “State owned” and “External state referenced”; `knowledge_base/architecture/section_6_responsibility_model.md` §6.9 “State ownership”; `knowledge_base/Level 2/trust_and_evidence/how_do_we_distinguish_facts_from_assumptions.md` “Known does not mean universal truth”.

4. **Progress without final certainty is part of Tend’s behaviour.** U2 wait/recheck, U3 partial fulfilment and U4 bounded latest-known communication all preserve honest movement without falsely closing the situation.  
   Sources: `knowledge_base/architecture/section_8_interaction_model.md` §8.16.4 U3; §8.16.5 U4; §8.13.2; `knowledge_base/Level 2/gathering_information/how_do_we_handle_information_that_arrives_gradually.md` “Our working decision”.

5. **The current boundary ownership survives.** The uncertainty dimension strengthens contracts and logical semantics but does not reveal a missing Level 2 Uncertainty boundary.  
   Sources: `knowledge_base/architecture/section_7_boundary_model.md` §7.7 accepted boundaries; §7.12.1–§7.12.6 boundary records; `knowledge_base/architecture/section_6_responsibility_model.md` §6.4 Groups C/D/E/F/H/I/J/M/N/O/S/T/U.

### Provisional architectural interpretation

6. **The evidence model should preserve composable logical distinctions rather than force one status enum.** Provisional interpretation, stale claim, conflict, blocked access and waiting path may coexist. This is a logical consequence of the Level 2 distinctions, not a settled Level 2 field design.  
   Evidence: `knowledge_base/Level 2/understanding_the_situation/how_do_we_recognise_ambiguity_and_uncertainty.md` §2.4, §8.2–§8.6; `knowledge_base/Level 2/trust_and_evidence/how_do_we_determine_whether_information_should_be_trusted.md` “Evidence state and reason”; this scratch file §3.6 and §5.2.

7. **Adjacent-Tool should preserve technical result and domain evidence separately.** A successful response may still be stale or incomplete; a timeout may leave a business outcome unknown. The worker, not the tool, interprets this into story claims and waits.  
   Established contract: `knowledge_base/architecture/section_8_interaction_model.md` §8.8 IB-7 and §8.12.1. Proposed refinement: the exact result envelope and field representation remain open.

8. **B-Visibility needs an uncertainty-aware projection contract.** Its provisional status remains appropriate until version/as-of, evidence-state, reason and role-filtered views are tested.  
   Sources: `knowledge_base/architecture/section_7_boundary_model.md` §7.12.4 B-Visibility, especially “Status” and “Consistency / atomicity”; `knowledge_base/architecture/section_8_interaction_model.md` §8.14.1 IA-8 (provisional); §8.15.1 trace-always schema.

### Open or requiring Section 10/11 reconciliation

9. **Exact field/enumeration/co-occurrence representation is open.** The axes and labels in §3.6 and §5.2 are logical semantics only. They do not prescribe a Level 2 schema; field shapes, encoding, serialization and implementation belong to Level 3.  
   Sources: `knowledge_base/three_level_framework/architecture_contruction.md` §4.22 “Evidence Should Preserve Uncertainty”; §9.29 “Provisionality”; `knowledge_base/three_level_framework/3_level_framework.md` Level 2/Level 3 separation.

10. **Fork C interpretation/routing progress is a reconciliation proposal, not established.** Section 8 currently defines five progress reasons and does not explicitly name interpretation or routing transitions. Section 10/11 must decide whether those transitions fit “claim-state change” or require a contract amendment.  
    Sources: `knowledge_base/architecture/section_8_interaction_model.md` §8.3.1 Fork C; `knowledge_base/Level 2/trust_and_evidence/how_do_we_represent_confidence_without_pretending_certainty.md` “Ruling added 2026-09-04 — what counts as progress”; this scratch file §5.3 and §10.

11. **U4’s exact uncertainty reason vocabulary remains open.** The canonical walkthrough distinguishes current, stale/degraded, unavailable-within-bound, failed-after-bound, conflict and capability-absent, but does not yet settle the final logical record shape for those causes.  
    Source: `knowledge_base/architecture/section_8_interaction_model.md` §8.16.5 U4 steps 5a–10; `knowledge_base/architecture/what_is_already_settled.md` “A carrier that is down, and a business that cannot ship” and “Leave these open.”

## 13. Claims requiring correction or clarification by the parent agent

These are not changes to canonical files by this subagent; they are the hand-back items for the parent:

1. Clarify the Section 9.8 wording that uncertainty and failure are “two moments of the same wait.” It should explicitly state that they are not mutually exclusive: after a bound, the retrieval path can fail while the business outcome remains unknown.
2. Treat the axes and labels in §3.6/§5.2 as logical semantics only. Do not turn them into a mandated Level 2 field schema or enum; leave representation and Level 3 choices open.
3. Reconcile Product Vision wording such as “only after understanding the complete situation” with the Level 2 distinction that Tend needs enough information for the next safe behaviour, not complete knowledge of the final business outcome.
4. Keep the Fork C interpretation/routing extension explicitly marked as a reconciliation proposal. Section 8 currently establishes only the five enumerated progress reasons; do not present the extension as already settled.
5. Tighten U4’s “claim unknown or path held” branch so the story records whether the uncertainty is missing response, stale source claim, degraded fallback, permission-inaccessible information, or an unresolved customer/source conflict.
6. Keep the Section 8 distinction between `capability-absent`, provider/path failure, authorization denial, idempotency block and business unknown explicit in the final cross-cutting state vocabulary.
7. When stabilizing B-Visibility, require a version/as-of indicator and evidence/reason visibility appropriate to the viewer; otherwise a lagging derived projection can create a second, misleading uncertainty.
8. Preserve the current S/T/U split: uncertainty is data consumed by S/T/U, never an authorization source, never a permission expansion, and never a reason to bypass tenant/field/channel restrictions.
