# Section 9 scratch — Dimension 12: Observability and Traceability

**Status:** Section 9 discovery record only. This does not amend canonical architecture, Level 2 answers, or the harness study. Where sources disagree, the disagreement is recorded for parent audit rather than silently normalized.

## 1. Construction question

How can Tend preserve enough trustworthy, privacy-safe evidence to reconstruct a business situation and explain consequential behaviour to an entitled person, while separately detecting system-level degradation—without making every person read raw traces, treating model reasoning as truth, or allowing derived views and observers to become authorities over operational state?

## 2. Force

Tend carries operational responsibility across actors, systems, channels, and time. No one continuously watches every situation, and a business cannot reconstruct its work from a wall of agent chats. A correct outcome therefore needs more than a final answer: the system must retain what changed, what evidence was available, which behaviour was proposed, what deterministic controls allowed or refused, what happened, what remains unknown, and who or what owns the next step.

The force is **accountable reconstructability**, not maximal logging or maximal explanation. A durable trace supports audit, replay, an on-demand explanation, system observation, and—under separate eligibility rules—product improvement. Those are different consumers of evidence, not permission to expose the same data to everyone.

## 3. Evidence-derived model

### 3.1 Trace always; explain on demand

- Preserve an audit trail as work occurs. The harness study says every step records audit evidence; Level 2 Explainability defines the complete reason record for consequential actions, recommendations, and failures. These statements have different scope: the audit is the broad execution record; the fuller reason record attaches where the shared Failure declaration rules classify an action as consequential. Do not turn “trace always” into “proactively narrate every step to every audience.”
- Explanation is a view over preserved evidence, delivered only when useful and only to an entitled audience. The model's emitted business reason/reason-key and referenced claims support an explanation; hidden chain-of-thought is not required for the architecture to explain or audit an action.
- A retry, timeout declaration, circuit-breaker trip, wait, permission denial, communication, and deterministic control decision are system actions too. Observability is not limited to LLM proposals or tool calls.

### 3.2 Reconstruct the story, not just the last answer

Reconstruction must follow the versioned situation story, its immutable reasons and evidence references, actions and outcomes, wait history, and graph links to related situations. It must preserve partial progress and unfinished asks, not manufacture a single “resolved” result from a successful subtask. Reconstruct from contemporaneous records; do not rewrite history at read time.

Level 2 establishes viewer-dependent renderings of the same record: a readable timeline for non-technical viewers and a graph view for builders. The entitlement rules are the same as for live viewing. A question-driven causal explanation is a possible derived view, not yet designed.

### 3.3 Preserve provenance, version, and authority context

The record must make it possible to recover the evidence/claim references used, source and currentness/conflict state where relevant, applicable rule or policy, the model proposal, structural and authorization verdicts as distinct outcomes, the authority under which an effect was attempted, the emitted reason, and the observed result or declared unknown. Run identity joins the action to its reasoning context; situation-model versions place it in the story; situation identity connects it to the wider journey.

This is a **semantic completeness requirement**, not a settled event schema. Exact field names and encodings for claim provenance, business-policy version, live grant/approver context, model/provider alias, prompt/harness version, and tool-catalogue hash are not all fixed by Level 2. Historical reconstruction must not misstate a past authorization by substituting today's grant or policy for what was checked at action time. Any stored identifiers or snapshots must remain tenant-scoped and privacy-safe.

### 3.4 Separate business, administrator, customer, and builder views

- **Business / owner:** always-visible situation work—state, asks and endings, waits and deadlines, declarations, changes, evidence, decisions, next responsibility, and attention. Business-value outcomes may sit above this baseline. Operational metrics such as uptime, raw message counts, and loop internals are not business-value reporting.
- **Customer / external stakeholder:** the situation-level outcome, truthful change, limitation, or next step they need. Do not expose internal tools, retry narration, another person's information, or hidden reasoning just because those events exist in the trace.
- **Administrator / configurator:** configuration, grants and approval history, audit trail, and declarations; minimal masked traces on demand. Level 2 permits reasoning summaries, not internal chain-of-thought. Distinct roles narrow visibility as the business grows.
- **Product builder / operator:** a separate technical view for execution evidence and system health, including provider/harness behaviour and product-improvement signals. Builder access is still subject to tenant isolation, data minimization, and secret redaction. A nullable reasoning “gift” is never guaranteed, never load-bearing, and never an authorization or correctness source.

### 3.5 Observer and derived views are not truth owners

B-Visibility derives artifacts and reconstructions read-only from B-Story and trace evidence. Asynchronous projection lag may be acceptable; it does not make a stale projection authoritative for a consequential action. The health observer emits observation events onto the same event fabric as other events and must itself remain traceable. It observes the provider hull and harness hull; the observer's response, thresholds, and infrastructure remain separate from the detection obligation.

Trace recording, audit viewing, observation, business projection, and learning are related but separate responsibilities. An audit trace is not automatically a training example, memory lesson, business fact, or permission to alter policy.

## 4. Dimension record

### Dimension ID

12

### Dimension

Observability and Traceability

### Architectural force

Retain trustworthy, joined evidence sufficient to explain and reconstruct accountable work, and to detect when the system departs from its intended behaviour, while enforcing audience, tenant, and purpose boundaries over every derived view and downstream use.

### Consequence

The architecture needs a durable evidence spine and explicit projection/observer consumers, but not one universal dashboard, transcript, trace format, storage service, or explanation policy. Operational truth remains the versioned situation model; traces support that truth and its history but do not supersede it.

## 5. Affected responsibilities

### Directly affected

- **O1–O3:** present work as artifacts, derive owner snapshots, and surface attention; business artifacts must not require chat archaeology.
- **O4–O5:** explain recommendations, actions, and failures on demand; reconstruct finished situations for audit/replay.
- **O6–O8:** observe system health separately from business artifacts; preserve trace always; emit observation events onto the shared fabric.
- **O9:** show business value to the business, not operational metrics for their own sake.
- **O10 / P2:** make capability-absent an evidence-backed, honest conclusion only after checking both systems and people; keep it outside Failure triage and retain it as a product signal.
- **A / D / E / F / G:** preserve situation identity and version, claims and provenance, evidence state, the proposed next behaviour, its reason, and the decision/authority context without conflating model proposal with system decision.
- **H / J / M:** preserve waits, deadlines, human ownership, interruption/recovery, declared failure, unknown outcome, and escalation history so unfinished work remains legible.
- **S / T / U:** record structural and authorization outcomes separately; retain tenant and consumer-class boundaries; preserve evidence that deterministic security controls held.
- **N / R:** consume only appropriately scoped traces for asynchronous learning or product improvement; never let those paths silently change business truth, grants, policy, legal constraints, or permissions.

### Indirectly affected

- Communication determines whether and how a reason is delivered; it does not own the underlying audit.
- Trust and Evidence determines what an evidence reference means, including provenance, authority, conflict, and currentness; a trace must not upgrade a claim into truth.
- Configuration and Authority determine the rule/grant used at action time; reconstruction needs the historic decision context but cannot reactivate a revoked grant.

## 6. Affected boundaries

### B-Story — operational truth and story spine

B-Story remains the sole writer of operational truth. It commits versioned situation changes, waits, asks, evidence state, actions/intents, and declared outcomes. It supplies links from a trace to the relevant story version; it does not become a log viewer or publish raw execution detail to external audiences.

### B-Visibility — derived business and builder views

B-Visibility reads the situation graph and trace evidence to derive owner artifacts, explain-on-demand reconstructions, and observer signals. It is read-only for correctness, may lag, and has no authority over business actions. Role-based filtering and same-entitlement reconstruction apply. Its boundary definition is currently marked provisional and its responsibility list may lag the later Group O additions; see parent audit.

### B-Membrane — communication ingress and egress

B-Membrane routes events and delivers an authorized communication intent after a story update. It communicates a situation delta, not the internal sequence of tools and retries. Delivery evidence can join to the relevant intent and version, but the membrane is not the general observability boundary.

### Adjacent-Tool / authorization controls

Tool invocation records the intent-before-effect, evidence/result, idempotency or unknown-outcome state, and separate permission decision. It must retain enough evidence to distinguish no call, denied call, failed call, completed call, and call with unknown external outcome. A cache is not authority.

### B-Memory and Adjacent-Improvement

B-Memory may observe sanitized traces asynchronously; Adjacent-Improvement may receive training-grade traces. Both are downstream consumers, not owners of operational truth or audit completeness. Eligibility for training requires an LLM proposal, code validation, and a matchable external outcome; audit-only events remain audit-only.

### Observer / event fabric

The observer is a conceptual responsibility, not a business-action controller. It emits observation events to the shared fabric. Its outputs may update builder health views or route situation-scoped/high-consequence anomalies, but they do not directly rewrite a situation or grant authority.

## 7. Affected interactions

1. **Story commit → trace/reference:** link consequential events to the committed situation version and reason; preserve append/history semantics rather than overwrite.
2. **Proposal → VALIDATE:** preserve the proposed behaviour and evidence context separately from structural validation and authorization verdicts.
3. **Tool intent → external effect → result:** preserve result, refusal, timeout, retry, or unknown outcome with the relevant operation identity; never infer external success from a local call completion.
4. **Wait / human work → re-entry:** preserve the wait subject, reason, deadline/bound, resume trigger, owner, and ending so a recovered situation can be reconstructed from its durable state rather than a prior run's memory.
5. **Situation-model event → B-Visibility:** derive a projection asynchronously, retain its derivation point sufficiently to understand freshness, and re-read authoritative state before consequential action.
6. **Trace → observer:** run deterministic checks continuously where Level 2 requires them; run sampled or scheduled judged/statistical checks under calibrated policies. Each resulting observation is itself attributable.
7. **Trace → explanation/reconstruction:** resolve a viewer-authorized path through claim references, reason, version history, linked situations, waits, and outcomes; render only the depth appropriate to that viewer.
8. **Trace → memory/product improvement:** redact and apply consumer-specific allowlists before asynchronous fan-out; audit retention does not imply learning eligibility.

## 8. Scenario stress tests: U1–U5

### U1 — Priya outreach, reply before nurture

The owner must see the thirty situations as work artifacts, inspect evidence behind a proposed message, understand why one is waiting, and ask why one was escalated. The trail must show the scheduled wait, inbound reply, wait supersession, timer wake reading the newer situation version and no-op, then any later committed communication intent and delivery. No one should infer a send from a draft or expose raw tool/retry traces in customer-facing copy.

### U2 — commercial lifecycle and silent refund gateway

Preserve the linked inquiry/order/delivery/refund story without flattening it into one conversation. For the refund, reconstruct the grant/approval check, initiation identity, gateway timeout/poll result, unknown outcome, configured wait, subsequent customer inquiry and honest status, and handoff when the bound is spent. Do not retry a new irreversible post merely because the result is unknown; distinguish same-key idempotent resend from a second initiation. The customer needs the status and next step, not the tool trace.

### U3 — investor asks for deck and revenue

Show ask-level partial completion: the deck may be cleared and sent while revenue remains with finance. The investor sees the situation change and remaining next step, not which tools ran or each retry. A business/admin reconstruction can show source evidence, approval, human work, and the separate ask endings, subject to the viewer's entitlements. Completion must not be inferred from the deck alone.

### U4 — carrier source exists, but data is stale or unavailable

Retain the carrier claim and its source/currentness, customer conflict if present, bound, wait/recheck, eventual declaration, configured escalation path, partner contact evidence, and truthful customer update. A down or stale registered source is not equivalent to a world with no capability. Do not invent location or send tool-retry narration to the customer. If a person can answer, represent human work instead of capability-absent.

### U5 — identifier collision; preserve both distinct test meanings

The source set uses **U5 for two different cases** and they must not be conflated:

- **Section 6 security U5:** T-A cross-tenant Bloom/Bob access or tool argument must be denied before provider invocation; T-B poisoned CRM content proposing exfiltration must be treated as untrusted and denied, with a secret-free audit. Observability should prove the guard and denial without copying the other tenant's data or secrets into the trace.
- **Section 8 capability-absent U5:** customer asks for package location; no tracking system and no person can serve the ask. Record the registry/people check and evidence-backed capability-absent conclusion, answer honestly, and keep it outside Failure triage. If a capable person or an existing-but-down source exists, this is a different path.

The current `U5` reuse is a traceability defect in the scenario index, not a reason to select one meaning silently. Use descriptive labels (“U5-T-A/T-B security” and “U5 package capability-absent”) in this scratch record until the parent architecture resolves the identifier.

## 9. Relevant invariants

1. Operational truth lives in the versioned situation model; B-Story is its sole writer. A trace, observer, dashboard, or derived view cannot write truth or authorize work.
2. Important decisions and actions are explainable/traceable. Preserve evidence used, applicable rule, authority, emitted reason, control verdict, and outcome at the semantic level established by Level 2.
3. Distinguish the model's proposal from deterministic structural validation, authorization, execution, and externally observed outcome. A denied or malformed proposal is not an executed action.
4. Unknown, stale, conflicting, failed, waiting, blocked, and capability-absent are distinct states. Capability-absent is not a failure; unknown external outcome is not success.
5. An active situation is not silent: work, wait, reason, trigger, next responsibility, or safe block is visible to the entitled business actor.
6. Business viewers see business work and value; builders see operational health separately. External recipients receive only the situation-level explanation they need.
7. Per-role and per-tenant visibility apply equally to live viewing, drill-down, historical reconstruction, observer events, and trace retrieval.
8. Tenant isolation applies to every store, cache, log, trace, model call, projection, and analytics path. Secrets/tokens/raw credential-shaped bytes do not enter prompts, logs, or traces.
9. Trace recording and learning are separate. A trace cannot become business knowledge, policy, authority, or training data merely because it exists.
10. Derived views may lag but must not pretend to be canonical/current; action-time checks read the authoritative current state and grant.
11. Observer findings are evidence/events, not autonomous permissions or corrections. High-consequence findings enter the appropriate failure/decision path.

## 10. Failure and uncertainty classes

- **Missing evidence or broken join:** cannot reconstruct the relevant action, source, model version, authority, or outcome. Treat as an audit/control gap; do not fill it with generated narrative.
- **Unknown external effect:** record initiation and unknown result; preserve the bounded wait and next safe action. Never label “request returned” as “business outcome completed.”
- **Stale or conflicting source:** retain source, time/currentness, conflict, and resulting behaviour; do not rewrite old claims as current facts.
- **Structural versus authorization denial:** keep S and T diagnostics distinct even though VALIDATE is one interaction step.
- **Capability absent versus provider failure:** no capable system/person is an honest declaration; a known source that is down/stale follows waiting/failure rules.
- **Completion-discipline violation:** unresolved ask at resolve, missing ending, improper wait release, capability-absent passed as success, or customer-facing claim without evidence. These are mechanically checkable harness-health signals.
- **Coherence failure:** answer does not match the ask, fails grounding, or substitutes an adjacent topic. Track as distinct from tool execution success.
- **Provider drift / harness drift / operational anomaly:** attribute the signal to the appropriate hull and route by scope and consequence; do not imply a universal threshold.
- **Observer or projection failure:** an observation event is lost, misattributed, cross-tenant, or acts on a stale derived view. The observer and view pipeline need independent traceability and security tests.

## 11. Observed tensions and required reconciliation

1. **Audit completeness vs privacy, minimization, and deletion.** Security requires that one business's data never appear in another tenant's logs/traces and that deleted-tenant prompt logs do not remain. The harness study describes append-only audit/traces and durable reconstruction. Retention, deletion, masking, re-keying, and training-data withdrawal semantics are not reconciled here.
2. **All-step audit vs consequential reason records.** The harness study says every step is audited; Level 2 Explainability scopes the complete “important action” reason record to the shared consequentiality/declaration rule. Preserve both layers and ask the parent to confirm their boundary; do not invent a second importance taxonomy.
3. **Business visibility vs audience restraint.** Businesses need the evidence and work state to act; customers/investors must not receive tool runs or retries; administrators see masked on-demand traces; builders need deeper technical diagnostics. The exact role/field projection must honor least privilege without reducing the owner view to status-only.
4. **Reconstructability vs derived-view staleness.** A stale board can be a legitimate read only if its derivation point is legible and it cannot drive a consequential action without a fresh authoritative read. The semantic rule is clear; the UI/metadata convention is open.
5. **Provenance vs data minimization.** Claim references and immutable reason links may be sufficient for many views; copying whole messages, tool payloads, or secrets into every consumer is not. Exact reference resolution, masking, retention, and deleted-source behaviour are not specified.
6. **Historical authority vs live authorization.** Explain why an old action was allowed without treating old grants as current permission. Record/refer to the then-effective authority check; always authorize new actions against the live source. Exact grant/policy revision identifiers are not fixed.
7. **Builder observability vs tenant/actor privacy.** Research grants builders a deeper technical view, while security requires tenant-scoped access and the Level 2 admin answer excludes internal CoT from administrators. Builder role, case access, redaction, and any temporary support elevation need a precise rule.
8. **Hidden reasoning vs explainability.** Older research discusses capturing hidden reasoning for tuning when exposed; later Level 2 says hidden CoT is a nullable “gift,” not guaranteed or relied upon, and admin receives summaries rather than CoT. Only the later semantic rule is safe to carry forward; no core invariant may depend on hidden reasoning.
9. **Two hulls vs “Product hull.”** Level 2 health answers and Section 8's attribution table define provider and harness hulls; the Section 8 probe table separately labels aggregate capability-absent as a “Product hull.” Clarify whether that is a signal family/product metric, not a third runtime hull, and specify its routing.
10. **Observer is first-class vs no new truth owner.** Observer emits on the same fabric and its own output is traceable, but Section 6/7/8 do not fully name the owner of observer-event lifecycle, deduplication, recursive observation, or retention. Keep it non-authoritative pending that boundary.
11. **Scenario index integrity.** `U5` means security validation in Section 6 and package capability-absent in Section 8 and some Section 9 drafts. Resolve the naming collision so evaluations, traces, and audit findings cannot be attached to the wrong scenario.
12. **Capability-absent wording drift.** The research record's “unanswerable” passage is superseded by the later Level 2 correction and Section 8's `capability-absent` term. Do not revive the older term as a distinct operational state; clean or annotate the historical wording in a parent audit.
13. **Harness-study storage vs Level 2 boundary.** Harness Study Part 13 marks Queue → R2 trace writes and a D1 trace index as resolved architecture, while Explainability answers place trace storage/indexing/rendering technology in Level 3. Align their authority/scope. This scratch does not promote the study's mechanism or its illustrative index fields into Section 9 invariants.
14. **B-Visibility responsibility coverage.** Section 7's B-Visibility card includes O1–O6, while Section 6 later adds O7–O10 and Section 8 adds trace-always, observer, and completion discipline. Confirm whether these responsibilities belong in B-Visibility, cross-cutting S/R, or a revised boundary record.

## 12. Architectural consequence

Treat observability and traceability as a **cross-cutting evidence plane with read-only derived consumers**, not as another owner of business truth:

1. B-Story commits story versions and declared outcomes; the audit/traces preserve causal links to those versions and do not replace them.
2. Every consequential action's record must link what happened to evidence, policy/rule, authority check, reason, and outcome; include separate deterministic validation and authorization results. Run, model-version, and situation-graph links support replay.
3. Business, customer, administrator, and builder views are distinct renderings/access projections over the same authorized evidence. Reconstruction follows the same entitlements as live viewing.
4. B-Visibility is read-only and may be eventually derived. Freshness/derivation context must be understandable; a consequential action re-reads B-Story and live authority rather than acting on a projection.
5. Observer events use the common fabric, carry their own attribution, and route through existing decision/failure responsibilities. They are not an unbounded side channel or a second source of operational truth.
6. Redaction, tenant scoping, and consumer-class allowlists precede async fan-out to memory, product improvement, or external views. Audit eligibility, explanation eligibility, and training eligibility are separate decisions.
7. The architecture must preserve semantic information classes, but this dimension does not freeze field names, storage schemas, probe definitions, thresholds, sampling rates, dashboards, retention schedules, or masking mechanics.

## 13. Established, provisional, and open

### Established by Level 2 and the settled architecture

- Trace always; explain on demand. “Every” governs preservation, not universal proactive delivery.
- Every important action/recommendation/failure retains a reason record: evidence/claim references, applicable rule or policy, deterministic decision, emitted reason-key, authority, and outcome. The audit uses Failure's existing consequentiality rule.
- The harness study separates universal audit events from the narrower set eligible to become training traces; production traces alone are high-trust for machinery, not proof that the business ask was resolved.
- Reconstruct from versioned situation models/reasons, run-linked action traces, waits/declarations, and graph edges; same entitled data, viewer-dependent rendering.
- Business baseline, admin/configurator view, external recipient explanation, and builder health view are audience-dependent; business value is not uptime or raw message volume; admin trace data is masked and does not include internal chain-of-thought.
- The observer is a first-class responsibility; provider and harness health are distinct; deterministic invariants/completion checks precede sampled/judged or scheduled drift/anomaly checks; observations use the same fabric.
- Security invariants apply to logs/traces: tenant isolation, no secrets/tokens, per-consumer allowlists, least-privilege visibility. Trace fan-out is redacted.
- Capability-absent requires no capable system **and** no capable person; it is recorded, explainable, and outside Failure triage.
- B-Story alone owns operational truth; B-Visibility derives read-only views, and its lag does not authorize action.

### Provisional in architecture artifacts

- Section 8's trace-always **field names/schema** and precise per-run payload; only the preservation obligation and semantic content are established.
- Observer loop implementation, event payload, B-Visibility derivation details, completion-checker implementation, IA-19 probe suite construction, aggregation, and attribution mechanics.
- Section 7's B-Visibility boundary card is explicitly provisional; its responsibility inventory may be stale relative to Group O and Section 8.
- Harness-study Queue/R2/D1 placement is a study-level architecture decision that needs reconciliation with Level 2's explicit Level 3 boundary for storage/indexing/format details.

### Open; do not fill by assumption

- Exact trace-event schema, field names, required version identifiers, source snapshots/hashes, policy/grant revision representation, model/provider/prompt/harness/capability-catalogue version joins.
- Probe contents, canary/golden suite definitions, anomaly thresholds, drift windows, sampling rates, alert rates, and business-configurable trigger rules.
- Storage/indexing/retention/deletion and tamper-evidence details; how deleted tenant data is removed from append-only traces, archives, analytics, and training copies.
- Detailed access/masking model for business owner vs employee vs configurator/admin vs builder/support operator; builder cross-tenant diagnostics and any break-glass process.
- Projection freshness marker and as-of/derivation metadata; exact cross-situation reconstruction and question-driven explanation behaviour.
- Observer event ownership, deduplication, recursion handling, retention, and exact relationship between the provider/harness hulls and “Product hull” signals.
- A canonical U1–U5 index and the audit boundary between per-step trace events and consequential-action reason records.

## 14. Rejected alternatives

### Explicitly rejected by the source set

- **Chat-wall observability:** requiring owners to reconstruct business operations from agent conversations.
- **Explain every step to everyone:** “every” means preserve the record; explanation depth/delivery depends on audience and need.
- **Business ops dashboards as value:** uptime, raw message counts, and loop internals are builder concerns, not the owner's business-value view.
- **B-Visibility merged into B-Membrane:** observation/projection is not transport or message delivery.
- **Observer as a side channel:** health events belong on the shared event fabric.
- **Hidden reasoning as the audit:** deterministic evidence and structured reason are the basis; hidden chain-of-thought may be absent and is not relied upon.
- **Capability-absent as system failure or “unanswerable”:** no system/person capability is an honest, evidence-backed declaration outside Failure triage; a capable human means human work.
- **Trace-based permission:** model proposals, memory, cache, and observation do not authorize business actions; authorization remains deterministic and live.
- **Trace == training data:** audit preservation and training eligibility are separate responsibilities and gates.
- **Raw sensitive trace fan-out:** secrets, tokens, and cross-tenant data cannot be passed into prompts/logs/traces or downstream consumer views.

### Not selected here; do not promote to rule

- One fixed trace schema or exact identity/version field set.
- One screen or narrative format for every role.
- Automatic explanations on every transition.
- Treating probe thresholds, sampling percentages, or specific debounce intervals as architecture invariants.
- Treating R2/Queue/D1 as the only acceptable mechanism until study-vs-Level-2 storage scope is reconciled.

## 15. Trade-offs

- **Completeness vs minimization:** more retained evidence improves reconstruction and debugging but expands privacy, security, retention, and deletion obligations. Prefer references and purpose-scoped projections over duplicating raw payloads.
- **Audit vs explanation:** a full internal audit can be preserved without sending every detail to business actors or customers. The split reduces noise and leakage but requires a reliable on-demand path.
- **Human readability vs diagnostic fidelity:** timeline and graph renderings serve different viewers; both must derive from the same traceable story and retain drill-down rights, not invent separate truths.
- **Always-on invariants vs sampled quality checks:** deterministic security/completion invariants can run continuously; judged or statistical signals need sampling/calibration to control cost and false alarms. Their thresholds remain open.
- **Async views vs freshness:** asynchronous derivation avoids blocking story writes and supports scale; stale views need legible derivation context and a fresh read before action.
- **Builder access vs least privilege:** deeper diagnosis supports reliability and product improvement; it must not create an unrestricted route to tenant content, secrets, or another business's records.
- **Trace utility vs model opacity:** structured reasons and evidence give stable explanations; optional hidden reasoning may assist research, but is provider-dependent, sensitive, and never load-bearing.

## 16. Evaluation signals

These are candidate acceptance signals, not fixed thresholds or production metrics:

- A sampled reconstruction can reproduce the ordered situation versions, asks/endings, evidence references, decision and authorization outcomes, waits, external-result state, communications, and final/unfinished state without invented transitions.
- Every consequential action in the audited sample joins to its evidence, applicable rule, authority result, emitted reason, situation version, run, and outcome; missing joins are surfaced rather than narrated around.
- U1 proves the stale nurture timer no-ops after the reply supersedes its wait; U2 proves unknown refund outcome is not represented as success or retried as a new effect; U3 proves one ask can be fulfilled while another remains open; U4 proves stale/down tracking differs from capability absence; both U5 interpretations prove their distinct expected path after the parent resolves naming.
- T-A/T-B suites demonstrate that denial is observable without provider invocation, cross-tenant payload exposure, prompt leakage, or secret-bearing traces.
- Role-based tests show business, customer, administrator/configurator, and builder views expose only their entitled evidence; historical reconstruction enforces the same access rules as live views.
- Redaction/allowlist tests cover async fan-out, logs, traces, memory, product-improvement datasets, and tenant-deletion paths.
- Observer tests distinguish deterministic invariant/completion violations from judged/statistical anomalies, identify provider vs harness cause when evidence supports it, and preserve attribution for the observer event itself.
- Derived-view tests display or otherwise make derivation/freshness understandable and prove that consequential actions re-read authoritative situation and grant state.
- Audit-vs-training tests show that audit-only deterministic steps are preserved but are not mislabeled as model training examples; training examples meet all three eligibility criteria.

## 17. Revisit conditions

Revisit this dimension when any of the following changes:

- The Section 7 boundary model promotes/redefines B-Visibility, or Group O/S/R/U ownership changes.
- A new event, action, external-effect type, provider, tool, channel, decision gate, or human handoff cannot be reconstructed with the current semantic evidence.
- A viewer role, support/debug workflow, sharing surface, or cross-business analytics path is added.
- Data-retention, erasure, residency, legal hold, incident-forensics, or training-data rules change or conflict with append-only trace retention.
- A redaction, tenant-isolation, authorization, or reconstruction test exposes a disclosure path or missing causal link.
- A provider/harness change creates drift, false positives, completion/coherence defects, a new anomaly class, or a different observer attribution model.
- A derived projection becomes an input to action, or its staleness can no longer be bounded/communicated.
- The U1–U5 scenario register changes; in particular, the U5 collision is resolved or scenario ids are renumbered.
- The parent resolves whether the study's trace storage placement is binding and clarifies audit-all-steps vs consequential-reason scope.

## 18. Evidence paths and sections

### Product and problem framing

- `knowledge_base/Product_Vision.md` — §§1–2 (agency, situation as storyline, useful artifacts, inaction visibility); §4 (inspectable artifacts and explanation surface); §5, “An owner gives Tend a list of people to contact” (U1 artifact/evidence view).
- `knowledge_base/Level1_Problem_Framing_or_Expansion.md` — §2 assumptions (distributed, incomplete, conflicting, changing information; human judgement); §3 unknowns (“How do businesses explain their own decisions?”); §7 system boundaries; §8 product invariants (decision/action traceability, least-information visibility, business control, tenant isolation); §9 failure classes.

### Architecture

- `knowledge_base/architecture/section_6_responsibility_model.md` — §6.4 Group O (O1–O10), Groups R/S/T/U; §6.6 U1–U5 scenario validation; §6.9 state ownership.
- `knowledge_base/architecture/section_7_boundary_model.md` — §7.12.4 B-Visibility; §7.12.9 Harness S vs Authorization T; §7.13.2 edge catalog; §7.13.3 authority flow; §7.14.4 re-test triggers.
- `knowledge_base/architecture/section_8_interaction_model.md` — §8.2 invariants; §8.4 joint VALIDATE and separate diagnostics; §8.10.3 situation-delta egress; §8.12 capability invoke/approval; §8.14.1 B-Visibility derive; §8.14.6 trace redaction; §8.15.1–8.15.4 trace-always/observer/attribution/completion; §8.16.1–8.16.5 U1, U2, package capability-absent U5, U3, U4; §8.17 anti-patterns.
- `knowledge_base/architecture/what_is_already_settled.md` — “The story and the message that leaves it” (owner-visible evidence and open screen layout); “When someone outside hears from Tend” (U3 partial fulfilment, no tool/retry narration); “A carrier that is down, and a business that cannot ship” (U4 vs no-capability distinction); “Leave these open” and “Leave these closed.”

### Level 2 — Explainability and Observation

- `knowledge_base/Level 2/explainability_and_observation/explainability_and_observation_conversation_and_discoveries.md` — D1–D7 and “What deliberately stays open”; source of the trace/explain split, role views, reconstruction, observer, anomaly classes, and capability-absent correction.
- `knowledge_base/Level 2/explainability_and_observation/how_do_we_explain_every_action.md` — completeness, reason record, run/version/situation joins, deterministic actions, delivery audiences.
- `knowledge_base/Level 2/explainability_and_observation/how_do_we_explain_every_recommendation.md` — claim references, applicable policy, deterministic decision, reason-key, shared consequentiality rule.
- `knowledge_base/Level 2/explainability_and_observation/how_do_we_explain_every_failure.md` — declared outcomes, evidence/reason/next step, failure audit, capability-absent distinction.
- `knowledge_base/Level 2/explainability_and_observation/how_do_we_reconstruct_an_entire_business_situation_after_it_has_finished.md` — story spine, action traces, waits/declarations, graph context, role entitlements, timeline/graph rendering.
- `knowledge_base/Level 2/explainability_and_observation/what_information_should_always_be_visible_to_the_business.md` — open situations, asks/endings, waits, declarations, alerts, owner/business-value view.
- `knowledge_base/Level 2/explainability_and_observation/what_information_should_only_be_visible_to_administrators.md` — configurator, grants/approval/audit, masked traces, summaries vs internal chain-of-thought.
- `knowledge_base/Level 2/explainability_and_observation/how_do_we_observe_the_health_of_the_overall_system.md` — provider/harness hulls, event-fabric observer, explicit open probes/thresholds/sampling/metrics.
- `knowledge_base/Level 2/explainability_and_observation/how_do_we_recognise_that_the_system_is_behaving_unexpectedly.md` — five anomaly classes, deterministic-first layering, routing by scope/consequence.
- `knowledge_base/Level 2/explainability_and_observation/understanding_all_explainability_and_observation_questions.md` — batch status and deliberate Level 3 boundary for thresholds, suites, sampling, formats.

### Level 2 — Coordination, Decision Making, Compliance/Security

- `knowledge_base/Level 2/coordination/how_do_multiple_business_processes_interact.md` — versioned shared situation record, source/process/time traceability, linked graph.
- `knowledge_base/Level 2/coordination/how_do_we_represent_work_that_is_waiting.md` — durable wait, reason, trigger, deadline, and visible state.
- `knowledge_base/Level 2/coordination/how_do_we_represent_work_that_is_blocked.md` and `how_do_we_know_a_piece_of_work_is_still_active.md` — blocked vs waiting and no-silent-work rule.
- `knowledge_base/Level 2/coordination/how_do_we_recover_interrupted_work.md` — durable versioned recovery, latest-state re-entry, reopen vs new linked situation.
- `knowledge_base/Level 2/coordination/coordination_conversation_and_discoveries.md` — wait spine and distinction between an invisible in-interaction call and a durable visible wait.
- `knowledge_base/Level 2/decision_making/how_do_we_determine_whether_project_x_can_make_the_next_decision.md` — decision context and proposal/control-layer separation.
- `knowledge_base/Level 2/decision_making/what_does_enough_information_mean.md` — behaviour-relative sufficiency and distinction among situation understanding, evidence, and execution/authorization.
- `knowledge_base/Level 2/decision_making/how_should_uncertainty_influence_project_xs_next_behavior.md` — explicit evidence states, no universal confidence score, uncertainty as behaviour constraint.
- `knowledge_base/Level 2/compliance_and_security/how_do_we_make_a_software_product_secure.md` — “Three new product invariants,” “What can never be left to the LLM,” T-A isolation, T-B injection, and “What the best security practices means now” (security taxonomy incl. observability/audit).
- `knowledge_base/Level 2/compliance_and_security/the_security_audit_framework.md` — audit moments, secrets excluded from prompts/logs/traces, T-A/T-B testing, failure/regression evidence.

### Harness and research

- `knowledge_base/agent_harness_study.md` — §4 TeleChat (append-only versioned trace; reasoning trace-only); Part 12 “Which steps produce training traces vs audit-only traces”; §12.8 signal classes; Part 13 “Trace storage pattern,” “The full data placement map,” and “What was resolved vs what remains open.”
- `knowledge_base/research/observability_explainability_and_finetuning_research.md` — §§21–46 correction record and later landing; Findings A–D; provisional conclusions/open items. Historical “unanswerable” or hidden-reasoning language must be read with the later Level 2 corrections, not treated as current state.

## 19. Strongest discoveries for the parent agent

1. Dimension 12 is not “logs and dashboards.” It is the preservation, joinability, authorized interpretation, and safe downstream use of evidence across a versioned business story.
2. Keep two levels explicit: universal audit/trace evidence, and complete reason records for consequential actions under Failure's shared classification. Both are necessary; neither means explaining every step to everyone.
3. The record must support reconstruction of the historical evidence, policy, authority check, structural/permission verdicts, and actual/unknown effect—not merely the final story state or a model-generated rationale.
4. Business artifacts, external explanations, admin traces, and builder observability are distinct access/rendering policies over shared evidence. The “same data” rule does not erase least privilege, privacy, or role entitlements.
5. Trace schemas, exact version joins, thresholds, probe contents, retention, deletion, and masking mechanics remain open or in conflict across sources. Do not silently freeze these at Section 9.

## 20. Claims requiring parent correction or explicit reconciliation

- Resolve duplicate **U5** usage before scenario-led audits or evaluation.
- Reconcile Section 7 B-Visibility's O1–O6 inventory with Section 6 O7–O10 and Section 8 IA-18/IA-19/IA-23.
- Clarify whether “Product hull” is a signal family or a third attribution hull beyond provider/harness.
- Reconcile the append-only trace/reconstruction design with the security deletion requirement and state retention/deletion policy.
- Align Harness Study Part 13's stated Queue/R2/D1 placement with Level 2's statement that storage/indexing/trace format are Level 3.
- Confirm universal per-step audit scope versus the consequential-action reason-record scope.
- Keep builder observability tenant-scoped and least-privilege; reconcile historical research language about hidden reasoning with later Level 2's nullable, non-load-bearing “gift-CoT” rule.
- Mark older “unanswerable” language as superseded by capability-absent and human-work distinctions.
- Settle provenance/version/authority joins semantically before choosing fields: claim/source lineage, relevant situation version, policy/grant checked at action time, and actual effect outcome must be explainable without disclosing raw private content.
