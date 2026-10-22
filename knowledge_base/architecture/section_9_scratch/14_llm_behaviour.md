# Section 9 scratch — Dimension 14: Automated Reasoning / LLM Behaviour

**Status:** Working cross-cutting stress record, written 2026-10-06. Scratch only; it does not amend Sections 6–8 or Level 2.

**Scope:** How Tend uses probabilistic reasoning without giving the model ownership of situation truth, evidence evaluation, business policy, capability execution, authority, or operational state. This record makes no model/provider, schema, or technology choice.

**Verdict:** The reasoning model is a bounded proposal-maker inside the established interaction model, not an autonomous authority or a new Level 2 boundary. Its safe operating envelope depends on scoped context, declared capability, independently checked authority, deterministic evidence and action gates, version-current state, and an honest rest/failure path. The envelope is distributed across B-Story, B-Membrane, B-Memory, Adjacent-Tool/Config/Improvement, and Groups S/T/U.

## 1. Force

Product Vision and Level 1 make reasoning useful when a situation cannot be handled by a known fixed procedure, while explicitly keeping predictable decisions in the system. The model is statistical and probabilistic: it can interpret open language and propose how Tend should proceed, but its proposal is not guaranteed, is not the source of Tend's agency, and does not own business decisions or permission.

The architectural pressure is not simply that a model can be wrong. A model proposal is formed from a selected, possibly incomplete and changing view of a multi-tenant business situation. Its inputs may include ambiguous human language, stale or conflicting claims, untrusted connected-system content, retrieved memory, and capability descriptions. Its output may imply a fact, a tool, a destination, a commitment, or a next step. No one model-side judgment can safely settle all of those different questions.

Accordingly, this dimension tests the seams between interpretation and truth, proposal and execution, identity and authority, historic context and current evidence, and provider behavior and harness control. It is cross-cutting: the sources support no new reasoning-model boundary beyond the model/worker already inside B-Story and the stage-specific reasoning paths at ingress and other boundaries.

## 2. Affected responsibilities, boundaries, and interactions

### 2.1 Responsibilities

- **Comprehension (C):** interpret the event, maintain ambiguity and uncertainty, bound relevance to the current problem, and keep observations, source claims, interpretations, evidence evaluations, and decisions distinct. A model can propose an interpretation or attachment; it cannot silently turn a plausible interpretation into accepted business fact.
- **Gathering (D):** define what could change the next safe step, use domain/source responsibility rather than model priors to identify where to gather, and keep the ask-to-source match distinct from retrieval. A missing capable source is a capability-absent declaration, not permission to guess or a tool failure.
- **Trust and Evidence (E):** deterministically evaluate provenance, claim scope, source authority, currentness, conflicts, business rules, and permission-relevant evidence. The reasoning model receives the resulting evidence context; it does not vote on which source is true or resolve a conflict by plausibility, recency, or its own confidence.
- **Decision Making and Authority (F/G):** the model may propose Tend's next behaviour and explain its support/uncertainty. System control decides operational state and runs the selected fixed path. Authority is independently checked before each effect; model reasoning, a prior approval, or a memory item is not an Allow.
- **Memory and Knowledge (N):** provide phase-specific, scoped context and observe traces asynchronously. Learned knowledge may guide interpretation, retrieval, planning, or communication; it may not become policy, authority, ownership, source-of-truth, approval, or accountability.
- **Explainability and observation (O):** preserve the situation version, emitted reason, evidence references, proposal, separate structural and authorization outcomes, actions, waits, and declared outcome. Explainability is not a claim that the model's internal reasoning is proof.
- **Harness (S), authorization (T), and security/compliance (U):** own the deterministic checks, state/loop control, identity-bound context, action permission, isolation, input/output handling, limits, audit, and containment that a model cannot enforce on itself.

### 2.2 Boundaries

- **B-Story (established):** owns the versioned operational story and worker contract. The reasoning model proposes within this loop; B-Story remains the sole writer of operational truth commits.
- **B-Membrane (established):** owns message ingress/egress. Interpretation at ingress is not an authorization to disclose or send; outbound expression is driven by a committed situation delta and its independent gates.
- **B-Memory (serve established; further learn-path promotion provisional):** observes the loop and loads purpose-specific slices. It is not a one-time transcript dump, a permission service, or an alternate story writer.
- **Adjacent-Tool (established contract):** performs registered capability calls, checks authorization before effects, applies the separate idempotency discipline, and returns structured evidence. The model does not create a capability or turn a tool result into universal truth.
- **Adjacent-Config (application path provisional):** only the authorized configurator path may apply configuration/grant changes. A model proposal or learned lesson is only a candidate, never a grant write.
- **Adjacent-Improvement (established separation):** may improve model adherence from eligible evidence; it is distinct from business-memory activation and may not learn business-specific rules into model behavior.
- **B-Visibility (derive provisional):** derives audience-scoped views. A view or a model-readable context slice cannot broaden the underlying reader's access.

No independent “LLM authority” or “AI safety” boundary is justified here. If a later construction unit demonstrates an independently owned lifecycle or failure contract, reconsider the boundary at that time rather than promoting a model label into a box now.

### 2.3 Interaction contract

The grounded interaction is:

```text
verified event / timer
  → scoped routing and phase-specific context load
  → PROPOSE a bounded next behaviour or interpretation
  → structural validation and deterministic product invariants
  → authorization/visibility/capability checks at the relevant effect boundary
  → fixed execution path, or ask / wait / human work / safe stop
  → structured evidence and current outcome
  → B-Story version + stated reason + announce, when operational truth changes
  → honest REST; next wake reads current state again
```

The proposal can select among available behaviours/capabilities and supply candidate arguments, but validators and capability gates decide whether those arguments are acceptable and whether an effect may run. “Validate” is not one model self-check: structural rejection, authorization denial, idempotency block, capability absence, provider failure, and unresolved evidence are distinct outcomes with different next behaviour.

Context is purpose-built for the step. It should carry the current situation version and objective, relevant claims with source/currentness/evidence state and reasons, the remaining gaps, allowed business context, available capabilities under consideration, and relevant time/risk/authority constraints. Memory assembly is phase-specific; the whole business memory, unrelated situations, raw database rows, and raw tool output do not become default prompt context. The settled card rule remains: show short eligible situation cards before the model chooses; open one full story only after a situation is selected. Memory is advisory and its scope, provenance, validity, version, and allowed influence remain visible to the assembler.

Ingress and connected-system text are data, not standing instructions. The same applies to model output when passed to a later stage, rendered to a person, stored as a claim, or used to form tool arguments. Each consumer must apply its existing data, scope, structural, permission, and encoding checks. No content may grant authority, change policy, register tools, or bypass a gate.

## 3. Invariants under this dimension

1. **Model proposes; the product controls.** The model is not Tend's agency, a principal, a business decision-maker, a policy evaluator, or an authorization source.
2. **Fixed rule before probabilistic reasoning.** If a predictable decision is defined by a rule, the system applies that rule; model judgment is for unresolved runtime interpretation, not a substitute for a rule.
3. **Output is data at every boundary.** Validate before effect, encode before rendering, and treat output re-entering another step as untrusted input. Output cannot alter prompts/constitution, policy, grants, capability catalogue, or system control.
4. **Context is scoped and minimized but decision-sufficient.** Candidate situations are bounded by the permitted actor/status/reference/link context, not by a business-wide similarity search. Ambiguity or an empty candidate set leads to ask/hold/create according to the existing rules, not an unbounded retrieval expansion.
5. **Identity, tenant, visibility, and authority are distinct.** Tenant/principal context comes from verified identity or a signed internal binding, not the model, message body, header, URL, or tool argument. Verified identity alone does not settle the still-open identity-to-authority join. No cross-tenant or unauthorized field enters model context, traces, memory, or derived views.
6. **Capability presence is not capability permission or success.** Only registered/enabled capabilities are candidates. Per-effect policy, object/tenant scope, destination, approval, and other controls are checked before effects. Tool results are structured claims, not a declaration that the business outcome is complete.
7. **Evidence and uncertainty are explicit.** Claims retain provenance and observation time. Known, unknown, ambiguous, conflicting, provisional, stale, and degraded states carry reasons. No universal numeric confidence or model self-confidence threshold controls a workflow.
8. **Sufficiency is behaviour-relative.** Evidence may be enough to ask, gather, wait, or send a limited status while insufficient to refund, disclose, promise, resolve, or close. A conflict blocks the affected unsafe action, not automatically the whole situation.
9. **Currentness and authority are checked at use.** Re-read the latest situation version on timer/recheck; use current source evidence where the proposed action needs it; check authoritative grants/policy at each action boundary. Historical memory, trace, old approval, or cached context cannot stand in for current truth or current Allow.
10. **Failure is explicit and correctly attributed.** Provider failure, harness/validation defect, denial, unknown side-effect outcome, capability absence, uncertainty, and ordinary waiting are not interchangeable. Unknown irreversible outcomes are not re-issued merely because the model proposes retry.
11. **Reason and internal reasoning are not interchangeable.** The situation stores an immutable stated reason and evidence references; a run trace may be linked for authorized reconstruction. Hidden/internal reasoning is neither operational truth nor the customer-facing explanation.
12. **Learning cannot move the safety floor.** Traces do not become reusable business guidance without the relevant eligibility/reconciliation rules; memory cannot alter policy, authority, permission, source ownership, or required human approval.

## 4. U1–U5 stress tests

The U labels are inconsistent across the parent documents (see §11). The tests below use the scenario substance, not a proposed canonical renumbering.

### U1 — Business-directed outreach; reply before nurture timer

The owner’s list yields one operational situation per person. Context for each person is separately scoped; the aggregate does not replace child stories. For Priya, the model may interpret the reply and propose a reply-state update, but it does not infer rejection/interest from silence or initiate follow-up just because a timer fired. B-Story commits the inbound plus wait supersession; a timer wake then rereads the newest situation version and cannot send stale nurture. A second outreach after closure is a new linked problem, not a resurrection inferred by model memory.

**Pass conditions:** no cross-person context or action leakage; the candidate story is visible/eligible before attachment; unresolved reference ambiguity is asked rather than silently attached; a late reply prevents the old follow-up; only a committed send intent reaches B-Membrane and current channel/consent/authority gates pass.

### U2 — Refund gateway silent after initiation

The model may propose the refund invoke only from the current authorized situation and evidence. T2/other effect gates must Allow before the call; the invoke path records intent, and the unknown outcome plus wait are committed together. A model suggestion to try again is not evidence that the gateway did nothing and does not defeat idempotency. During the configured settle window, keep waiting; after its bound, declare the appropriate outcome and route human work rather than automatically issuing another irreversible refund. Tell the customer only what the current situation/evidence supports.

**Pass conditions:** unknown is not rewritten as success/failure; no duplicate new post; retry/idempotency is not mistaken for permission; current grant is checked on each effect; no claim of completed refund without confirming evidence; gateway and harness failures are distinguishable.

### U3 — Investor diligence: deck and revenue

The model can help interpret the two asks and propose retrieval/communication, but cannot decide which revenue fields this investor may see or treat one approved ask as approval for another. A fetch-time object approval is enforced inside the fetch before file bytes/handles return. The committed deck may be sent while revenue remains open; the investor gets only the approved, situation-true update, not tool traces or an invented complete answer. Completion requires an honest ending for each ask.

**Pass conditions:** ask-level progress is preserved; disclosure is scoped to actor and object at current use; file approval and send authorization are independent; no raw tool trace or restricted claim is included in the context/output; partial completion is not reported as full completion.

### U4 — Registered carrier source is stale or unavailable

The model may propose a bounded gather, wait, customer status, or configured escalation. It cannot turn a stale carrier record into current location, invent a tracking number, resolve a customer/carrier conflict by plausibility, or treat an unavailable registered source as proof that no source exists. B-Story records currentness/unknown/conflict and a bounded wait; time/recheck wakes read the latest situation and the source again. Customer communication is based on the latest honest situation delta, not the retry trace.

**Pass conditions:** current, stale/degraded, conflict, unavailable-after-bound, and no-capability states remain distinguishable; source evidence supports every factual outbound claim; waits/escalation follow business configuration; unresolved high-consequence conflict blocks the unsafe claim/action but allows a safe bounded update where permitted.

### U5 — Both documented U5 meanings, tested separately

**Capability-absent meaning (Section 8 §8.16.3):** no shipping source and no person can answer. Ask-to-source matching happens before retrieval. Tend records capability-absent and tells the truth; it does not fabricate location or substitute payment data. If a person can answer, create human work rather than declaring capability absent. This is not provider failure.

**Security-validation meaning (Section 6 §6.6 U5 / Section 8 status / Section 9 Dimension 2):** a cross-tenant identifier or poisoned CRM/email/PDF/tool result proposes an export or action. Untrusted content may inform the ask only within its permitted scope; it cannot change the system rules or authority. Tenant/field allowlists and T-A/T-B controls must prevent the other tenant's content from reaching the model or connector; Policy.decide must deny before effect; a revoked grant, changed compliance constraint, disabled capability, or invalidated catalogue cannot be overcome by an earlier situation or proposal.

**Pass conditions:** cap-absent versus unavailable is not collapsed; injected text cannot instruct a tool or become memory/policy; no cross-tenant data reaches the model or output; no effect occurs without current Allow; a failed structural, isolation, or injection gate is attributed to the correct control hull.

## 5. Observed tensions

1. **Open-language interpretation vs bounded behavior:** the model must handle unanticipated wording, but its output cannot be executable authority or free-form state mutation. More restriction can reduce useful interpretation; less restriction raises ambiguity and control risk.
2. **Minimal context vs sufficient context:** data minimization and tenant isolation oppose broad context, while a safe proposal needs relevant claims, constraints, and provenance. An incomplete slice can look deceptively complete to the model.
3. **Relevance proposal vs relevance authority:** natural-language understanding is needed to route/interpret; candidate-set, object, claim-authority, and access decisions require deterministic bounds or human clarification. Similar wording cannot itself establish a link or source truth.
4. **Useful autonomy vs unreconciled uncertainty:** stopping every time evidence is incomplete would defeat Tend's operating purpose; acting as if uncertainty disappeared would violate “never guess.” The permitted next behaviour must depend on the action and consequence.
5. **Historical learning vs current truth:** past outcomes can make future work more efficient, but may be stale, mis-scoped, poisoned, or mistaken. Memory should shape what to check, not replace current sources or permissions.
6. **Stable behavior vs probabilistic variation:** model/provider output may vary on materially equivalent contexts. Deterministic gates preserve safety invariants, but do not make interpretations, ranking, or prose repeatable by themselves.
7. **Human-readable explanation vs hidden reasoning:** a stated reason plus evidence refs is useful and auditable; raw internal reasoning is not proof and can contain sensitive or misleading content. The exact trace retention, audience, and learning eligibility need reconciliation.
8. **Provider outage vs harness defect:** a model may be unavailable or produce invalid output, while the harness may separately bypass or misapply a gate. A safe failure must preserve this attribution and avoid both silent continuation and unnecessary business claims.
9. **Prompt principles vs rules:** a short human-owned constitution can guide behavior, but it must not become the place where deterministic policy, authorization, capability, or verification checks are merely described in prose.

## 6. Architectural consequence

No new boundary or technology follows from this dimension. Sections 6–8 already place the model inside B-Story/related step paths and distribute deterministic control to Group S, T, U, evidence responsibilities, capability gates, B-Memory, and B-Membrane. D14 makes their composition explicit: model proposals are advisory inputs to the existing loop; validated state, evidence, current grants, enabled capabilities, and committed intents determine what the system actually does.

The architecture must preserve a semantic boundary as well as a box boundary: **the model may interpret and propose, but only the system's versioned record, authoritative sources, configured rules, current authorization, and deterministic execution controls can establish operational state or permit an effect.** Unresolved meaning, unsupported fact, missing evidence, stale source, permission uncertainty, failed verification, invalid proposal, and unknown side-effect outcome each have a truthful path to clarify, gather, wait, ask a person, safe-hold, or stop.

## 7. Status ledger

### Established constraints

- Model reasoning is used where a fixed procedure is insufficient; predictable decisions use system rules. The model is a part of the agentic product, not the source of agency or permission.
- The per-wake sequence, structural validation, deterministic dispatch, B-Story ownership of truth commits, current-version timer re-read, and honest REST are established at the interaction-contract level.
- Model output is data, never instructions; it cannot change policy, grants, system prompts/constitution, or capability inventory.
- Tenant isolation, untrusted-field treatment, effect-before-authorization prohibition, live authorization checks, independent idempotency, and append-only secret-free accountability are constraints.
- Evidence evaluation is deterministic; claims, interpretations, evidence states, proposals, and decisions stay separate; uncertainty is explicit and not controlled by a model-generated confidence number.
- Context loading is phase-specific and scoped; memory is advisory. The settled card/full-story interaction and learning must-not rules remain closed.
- Explainability preserves reason/evidence/action/outcome; business-facing explanations do not expose raw tool retries or treat internal reasoning as evidence.

### Provisional constraints

- B-Memory's wider learn/promotion path remains provisional beyond the established serve path and explicit must-not rules. Vocabulary-drift/repeated-tool-error learning is not yet a complete protocol.
- B-Visibility derivation and some trace fields/flow are provisional. The conceptual two-hull attribution and evaluation ladder exist, but their exact production thresholds/sampling/wiring are not established here.
- The exact per-step context projection and proposal artifact shape are not promoted by this scratch record. Existing structural-validation obligations stand; this dimension does not design a schema.
- Prompt constitution layers and ownership are decided at Level 2; concrete release/rollback flow, assembly-template formats, preference-validator placement, and adoption timing remain provisional/parked.

### Open questions

- What minimum current context is sufficient for each behavior/capability, and which ambiguities require ask, hold, or human review?
- What are the authoritative freshness/currentness rules for each claim class and the exact information necessary to explain a proposal without exposing restricted data?
- How are a verified human, business membership, role, grant, and current actor scope joined at runtime? Identity verification does not answer this. What is the visible behavior when that join or the authoritative policy source is unavailable?
- How should invalid model output, no response, model/provider outage, repeated structural failure, or output that passes structure but fails grounding recover without an unsafe retry loop?
- What trace content is retained, visible to each audience, and eligible for learning? In particular, reconcile references to “full internal reasoning” with “masked traces without chain-of-thought” and the tuning-only gift-CoT entry.
- How are materially equivalent interpretations compared for consistency without treating model self-evaluation or one universal confidence score as a gate?
- What are the business-configured consequence classes and per-capability evidence requirements? Do not infer universal thresholds here.

## 8. Alternatives considered and rejected

- **Let the model decide truth, permission, or whether a policy applies:** rejected. It collapses proposal, evidence evaluation, and authority and violates Groups E/G/T and the security invariants.
- **Treat natural-language output or a self-check as sufficient validation:** rejected. Structural, grounding, currentness, authorization, visibility, capability, and effect checks have independent owners.
- **Use a universal confidence score/threshold as the safety gate:** rejected. It is not evidence and would hide action-relative uncertainty; explicit states and reasons remain the control input.
- **Put deterministic rules in the constitution or business-memory prose:** rejected. Rules that can be checked by the system remain in deterministic control/configuration; constitution text is short, case-general, and human-owned.
- **Pass full transcripts, raw rows, all stored situations, or all memory to the model:** rejected. Violates relevance, scope, data minimization, and settled routing/card rules; broad similarity cannot create authority or situation linkage.
- **Let tool output or model text directly execute or instruct another stage:** rejected. Output is untrusted data; it must pass the relevant consumer's checks.
- **Solve the boundary problem by choosing a “better” or larger model:** rejected as an architectural control. Model/provider selection cannot replace current evidence, authority, verification, or deterministic gates.
- **Move every ambiguous case to a person or stop the entire situation:** rejected as a universal response. Use the least consequential safe next behavior; block only the affected action where the rules permit safe progress.
- **Create a separate reasoning-model subsystem now:** rejected on present evidence. Sections 6–8 already place reasoning within the established responsibility and boundary contracts; revisit only if independent ownership/failure/evolution is demonstrated.

## 9. Trade-offs

- Bounded proposals and deterministic gates constrain some fluent or novel model behavior, but keep effect authority and safety explainable and testable.
- Scoped context improves privacy and reduces irrelevant influence, but may omit a necessary clue; source-matching, explicit unknowns, and clarification must remain available rather than silently widening context.
- Explicit uncertainty and waits can delay an answer, but avoid false claims and irreversible duplicate effects.
- Current evidence and live checks cost additional work and can fail closed during outages, but prevent stale memory, revoked grants, or old approvals from controlling present action.
- Reusing a shared trace supports reconstruction and evaluation, but raises privacy, access, retention, and chain-of-thought handling questions; trace existence does not imply broad visibility or training eligibility.
- Deterministic validators give machine-exact signals for bounded artifacts, but cannot prove every semantic interpretation or external business outcome. External confirmation and human review remain necessary where the evidence cannot decide.

## 10. Evaluation signals

Evaluate against golden and regression scenarios, including expected-refusal, ambiguity, stale/conflicting evidence, cross-tenant, poisoned-input, capability-absent, and unknown-outcome cases. Use deterministic validator outcomes and observable outcomes; never let model-generated numbers decide safety or whether a change worked.

- **Context:** every supplied claim/card is in the permitted tenant/actor/process scope; no excluded situation or field leaks; needed ambiguity is retained; selected references resolve to actual candidates; irrelevant or restricted context does not appear in the proposal or trace consumer's view.
- **Capability:** proposed capability is registered/enabled and its arguments/resources/destination pass existing validation; a missing source is not guessed; no effect occurs before Allow; tool output grounds any factual claim; side-effect intent and unknown-outcome handling are preserved.
- **Authority and disclosure:** current policy decision is obtained for each effect; deny/StepUp and field/channel visibility remain distinct; expired/revoked grants or changed compliance constraints stop the next affected effect; identity is not mistaken for authority.
- **Verification and uncertainty:** source, observation time, currentness, claim/evidence state, and reason survive into the record; no model confidence number resolves a conflict; stale/unknown/conflicting/provisional remains so until the defined evidence/rule changes it; claim-level facts in outbound communication trace to allowed evidence.
- **Loop and failure:** structural rejection, authorization denial, idempotency block, capability absence, provider failure, harness defect, waiting, and unknown outcome produce their distinct diagnostics/rest paths; malformed output cannot execute; no retry repeats an irreversible action; completion requires honest endings for every ask.
- **U1–U5 assertions:** the pass conditions in §4 remain green, with U5 capability-absent and U5 security/injection cases separately named in the fixture/index until parent numbering is repaired.
- **Attribution:** change one evaluation rung at a time; replay golden/regression and held-out production slices; compare provider and harness hulls; count expected honest refusals, schema/grounding/permission failures, trace completeness, task endings, and externally confirmed outcomes. A structurally valid proposal is not, by itself, proof that the ask was answered.

## 11. Revisit conditions

- A U1–U5 run shows that unsafe behavior can reach an effect despite an existing validator, live authorization, tenant/field scope, or effect gate; fix the responsible parent contract before widening model duties.
- Real traces show context leakage, missing context that causes repeated wrong attachment, or currentness errors that cannot be handled by the existing bounded gather/ask/wait paths.
- A new capability, recipient class, irreversible action, source of authority, modality, or compliance obligation crosses the current model/data/effect assumptions.
- A model/provider or prompt/assembly change alters expected refusal, grounding, routing, evidence-state, completion, or failure behavior; rerun golden and regression tests and attribute change to the correct hull.
- Learning evidence shows repeated corrections, but only after the provenance, validation, scope, and no-policy/authority-change requirements can be met; otherwise retain it as trace/history, not active guidance.
- A trace/visibility decision is made for internal reasoning content, or new evidence makes trace storage/access/training retention materially different.
- A parent resolves the U5, S2/S3, T11, identity-to-authority, or reasoning-trace inconsistencies listed below.

## 12. Parent corrections required

These are inherited inconsistencies, not decisions made by this scratch record:

1. **U5 label collision:** Section 6 §6.6 calls cross-tenant and poisoned-input security validation “U5”; Section 8 §8.16.3 labels no-shipping-source/capability-absent “U5”; Section 8 status also calls U5 security mapping; Section 9 Dimension 2 uses U5 for security/compliance change. Keep both capability-absence and security/change cases in coverage, but give the construction-unit index one unambiguous mapping.
2. **Harness S2/S3 mismatch:** Section 6 Group S defines S2 as proposal validation and S3 as fixed-path dispatch. Section 7 §7.12.9 calls structural validation S2; Section 8 §8.3–§8.4.1 calls the structural channel S3 and describes VALIDATE as S2–S3. Reconcile the identifiers before downstream references depend on a numeric gate name; this scratch uses semantic names.
3. **T11 missing from the Section 6 catalog:** Section 6 Group T lists T1–T9; Section 7/8 references T11 for reveal/role-scoped reads and visibility. Define/reconcile the referenced control rather than assuming that prompt-context field filtering or role projection is fully specified.
4. **Reasoning-trace handling needs one explicit ruling:** Understanding says full internal reasoning is retrievable by run ID; Explainability says administrator traces are masked without chain-of-thought; Section 8 §8.15.1 marks gift-CoT nullable/tuning-only/builder-only. Reconcile storage, retention, access, and training eligibility. Do not treat chain-of-thought as operational truth or as a required business-facing explanation in the interim.

**Documentation cleanup only, not a Section 9 construction gap:** legacy references to a separate Section 9 handoff have been replaced by links to the integrated Section 9 record. No handoff artifact was created.

## 13. Evidence paths

### Product and Level 1

- `knowledge_base/Product_Vision.md` — §1 Tend's operating thread; §4 event/situation-driven agency and safe stop; §5 list, customer, stakeholder and carrier journeys; “Let the system make predictable decisions”; “Help people, do not replace them”; traceability/explainability.
- `knowledge_base/Level1_Problem_Framing_or_Expansion.md` — “AI is a part of an agentic system, not the source of agency”; “The Reasoning Model”; “What the model proposes is never authorised by the model”; “Model output is data, never instructions”; Decision Making clarification; security and failure invariants.

### Existing architecture

- `knowledge_base/architecture/README.md` — architecture is constructed iteratively; responsibilities → boundaries → interactions → stress/reconciliation; established/provisional/unconstructed status.
- `knowledge_base/architecture/section_6_responsibility_model.md` — §6.4 Groups C/D/E/F/G/N/O/P/R/S/T/U; §6.5 non-responsibilities; §6.6 U1–U5; §6.9 state ownership; §6.12–§6.13 learning and S/T separation.
- `knowledge_base/architecture/section_7_boundary_model.md` — §7.3 operational truth and excluded reasoning scratch; §7.4 units; §7.7 established boundaries; §7.12.1–§7.12.6 boundary contracts; §7.12.9 distributed S/T gates.
- `knowledge_base/architecture/section_8_interaction_model.md` — §8.2 invariants; §8.3 per-wake contract; §8.4 VALIDATE and failure distinctions; §8.5 wake routing; §8.12 capability invoke/fetch-time approval; §8.14 memory serve/learn; §8.15 trace/completion; §8.16 U1–U5; §8.17 rejected anti-patterns.
- `knowledge_base/architecture/what_is_already_settled.md` — current card/context, partial fulfilment, learning bans, permission, capability absence vs carrier failure, open vs settled decisions.
- `knowledge_base/architecture/how_tend_finds_the_right_situation.md` — 2026-10-03 settled speaker/card/full-story, memory serving, identity, visibility, and learning limits.

### Level 2 — Understanding and Decision Making

- `knowledge_base/Level 2/understanding_the_situation/how_do_we_determine_which_information_is_relevant_to_the_current_situation_and_which_information_should_be_ignored.md` — relevance, situation attachment, immutable reason, claims/confidence, run-ID trace distinction.
- `knowledge_base/Level 2/understanding_the_situation/how_do_we_recognise_ambiguity_and_uncertainty.md` — ambiguity classes and clarification limits.
- `knowledge_base/Level 2/understanding_the_situation/what_does_it_mean_to_understand_what_a_customer_is_actually_asking.md` — interpretation of the ask and its limits.
- `knowledge_base/Level 2/understanding_the_situation/how_do_we_determine_whether_multiple_messages_belong_to_the_same_situation_and_whether_two_seemingly_different_conversations_are_actually_related.md` — attach/link/split and identity-versus-problem separation.
- `knowledge_base/Level 2/decision_making/understanding_all_decision_making_questions.md` — decision intention vs operational state; LLM proposal and deterministic execution/state; consequence-relative sufficiency.
- `knowledge_base/Level 2/decision_making/how_do_we_determine_whether_project_x_can_make_the_next_decision.md` — when the next behavior is permitted by current evidence, policy, and controls.
- `knowledge_base/Level 2/decision_making/what_does_enough_information_mean.md` — sufficiency relative to behavior and consequence.
- `knowledge_base/Level 2/decision_making/how_should_uncertainty_influence_project_xs_next_behavior.md` — action-specific uncertainty and model confidence is not a gate.
- `knowledge_base/Level 2/decision_making/how_do_we_ensure_consistent_next_behaviour.md`, `knowledge_base/Level 2/decision_making/which_decisions_can_always_be_automated.md`, and `knowledge_base/Level 2/decision_making/which_decisions_must_always_involve_a_person.md` — consistency, bounded automation, and human participation.

### Level 2 — Evidence, memory, constitution, security, explainability

- `knowledge_base/Level 2/trust_and_evidence/understanding_all_trust_and_evidence_questions.md` — deterministic evidence evaluation, claim/provenance separation, explicit evidence states, no numeric trust score, reasoning model consumes evaluated context.
- `knowledge_base/Level 2/trust_and_evidence/how_do_we_represent_confidence_without_pretending_certainty.md`, `knowledge_base/Level 2/trust_and_evidence/how_do_we_distinguish_facts_from_assumptions.md`, `knowledge_base/Level 2/trust_and_evidence/how_do_we_determine_whether_information_should_be_trusted.md`, `knowledge_base/Level 2/trust_and_evidence/what_makes_one_source_more_authoritative_than_another.md`, and `knowledge_base/Level 2/trust_and_evidence/when_should_conflicts_automatically_stop_the_workflow.md` — confidence, claim state, source authority/currentness, and action-specific stop.
- `knowledge_base/Level 2/memory_and_knowledge/understanding_all_memory_and_knowledge_questions.md` — memory classes and learning cannot change policy/authority.
- `knowledge_base/Level 2/memory_and_knowledge/how_do_we_assemble_context_for_each_situation_phase.md`, `knowledge_base/Level 2/memory_and_knowledge/how_do_we_prevent_outdated_knowledge_from_influencing_new_decisions.md`, `knowledge_base/Level 2/memory_and_knowledge/how_should_previous_conversations_influence_future_decisions.md`, `knowledge_base/Level 2/memory_and_knowledge/can_tend_learn_automatically.md`, and `knowledge_base/Level 2/memory_and_knowledge/what_should_never_become_memory.md` — phase-specific context, retrieval eligibility/currentness, history vs guidance, async/automatic learning limits, prompt/memory poisoning.
- `knowledge_base/Level 2/prompt_constitution/understanding_the_prompt_constitution.md` and `knowledge_base/Level 2/prompt_constitution/prompt_constitution_conversation_and_discoveries.md` — four text layers, human-owned constitution, rules never in text, optimizer boundary.
- `knowledge_base/Level 2/compliance_and_security/understanding_all_compliance_and_security_questions.md`, `knowledge_base/Level 2/compliance_and_security/how_do_we_make_a_software_product_secure.md`, and `knowledge_base/Level 2/compliance_and_security/the_security_audit_framework.md` — model proposal/deterministic control, tenant and untrusted-input invariants, T-A/T-B, deterministic list, release/operation checks.
- `knowledge_base/Level 2/explainability_and_observation/understanding_all_explainability_and_observation_questions.md`, `knowledge_base/Level 2/explainability_and_observation/how_do_we_explain_every_action.md`, `knowledge_base/Level 2/explainability_and_observation/how_do_we_explain_every_recommendation.md`, `knowledge_base/Level 2/explainability_and_observation/how_do_we_explain_every_failure.md`, and `knowledge_base/Level 2/explainability_and_observation/how_do_we_reconstruct_an_entire_business_situation_after_it_has_finished.md` — reason/evidence/action/outcome, failure vs capability-absent, audience-specific reconstruction and trace limits.

### Harness study and related Section 9 scratch

- `knowledge_base/agent_harness_study.md` — Parts 3/5 loop-over-model principles; Part 7 failure attribution/two hulls; Part 8 improvement boundaries; Part 10 memory/no-threshold rulings; Part 11 worker/context slicing; Part 12.5 golden/refusal scenarios, §12.6 deterministic validators, §12.8 signal classes, §12.9 evaluation/attribution; Part 14 constitution ownership/optimizer boundary.
- `knowledge_base/architecture/section_9_scratch/04_uncertainty.md` — current U1–U5 uncertainty tests and distinction between capability absence, failure, conflict, and restricted evidence.
- `knowledge_base/architecture/section_9_scratch/08_authority_security.md` — identity/authority open join, live action gates, T11 and U5 parent corrections.
- `knowledge_base/architecture/section_9_scratch/09_information_provenance.md` — ownership, provenance, currentness, and claim-vs-fact tensions.
- `knowledge_base/architecture/section_9_scratch/02_change_over_time.md` — U5 security/compliance change during an open situation and live re-evaluation.

## 14. Dimension verdict

**Established:** the model's proposal-only role and the independent deterministic boundaries around context, evidence, capability, authority, verification, effect, currentness, and failure.

**Provisional:** exact context projections and artifact shape, B-Memory learn/promotion beyond the must-not rules, B-Visibility implementation, trace treatment, and selected evaluation wiring.

**Open:** precise sufficiency/freshness policies by action/source, identity-to-authority join, invalid-output/provider recovery, trace/CoT handling, and equivalent-case consistency measures.

**Parent action before synthesis:** reconcile the U5 index, S2/S3 numbering, missing T11 definition, and trace/chain-of-thought policy. No model upgrade, schema proposal, or technology choice resolves those architecture questions.
