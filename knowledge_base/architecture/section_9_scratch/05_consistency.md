# Section 9 Scratch — Dimension 5: Consistency

## Status

**Working — established core with provisional external-effect and projection details.**

This is a Dimension 5 working record only. It does not change the canonical Sections 6–8 files.

## Dimension

**Dimension 5 — Consistency**

### Force

Tend coordinates one operational story across events, people, systems, channels, memory, time and external effects. Those things do not change at the same speed, do not share one owner, and cannot all be committed in one unit of work.

The consistency question is therefore not “is Tend strongly consistent?” It is:

> Which state relationships must agree, at what boundary, at what point in time, and which states are intentionally independent?

The relevant answers are:

| Relationship | Required agreement | Why |
|---|---|---|
| Coupled fields in one B-Story operational move | **Immediately, in one situation-model version** | A partial commit can permit unsafe work: stale nurture after a reply, or a second refund after an unknown first attempt. |
| B-Story version and its change announcement | **Same commit unit** | Consumers must not miss a committed wake. |
| B-Story read and next decision | **Before the decision/effect** | A worker or timer must not act from a superseded situation version. |
| B-Story and external canonical system | **Never as one shared truth; re-read when the decision requires currentness** | Tend coordinates; the external system owns its record. |
| Situation claim and external observation | **Agreement only as a provenance-bearing claim at observation time** | “Carrier reports delivered” is not unqualified physical truth. |
| B-Story and B-Membrane egress | **Intent/version/gate before send; delivery outcome may be later or unknown** | The external platform cannot be committed atomically with the situation model. |
| B-Story and B-Visibility | **Eventually, with version lineage** | A board is a derived view and must not block story correctness. |
| B-Story and B-Memory | **Current scoped serve result at phase need; learning may lag** | Memory is advisory and must not replace current evidence or policy. |
| B-Story and Adjacent-Improvement | **Intentionally independent** | Product-behaviour improvement is not live business truth or business memory. |
| B-Story and grants/policy | **Live for grants/platform rules; pinned rule context for policies/workflows** | Safety and audit require different change semantics. |

## Why it matters

Product Vision requires one honest storyline, no guessing, traceable decisions, safe failure, and no silent loss of responsibility. Level 1 additionally requires the latest known state, preservation of source ownership, explicit conflicts, and independent situations. Consistency failures would therefore appear as:

- sending a stale follow-up after a reply;
- making a new irreversible post after the first post has an unknown outcome;
- treating a stale carrier record as current truth;
- showing an owner a projection that looks current but is not;
- allowing memory, cache, an LLM proposal, or a configuration candidate to become authority;
- applying a new business policy silently to an in-flight situation; or
- recording a story change without waking the consumers that must react to it.

## Affected responsibilities

The force crosses these responsibilities, but does not create a generic “Consistency Service”:

- **A1–A12:** versioned situation model, graph links, claims, split/link semantics, closure and outcome history.
- **B1–B9:** ingress deduplication, routing, held attachment, create shell versus first truth commit.
- **C1–C6:** observations, claims, interpretations, ambiguity and communication-versus-operational resolution.
- **D1–D8:** decision-relative currentness, source selection, gradual information, capability matching.
- **E1–E9:** provenance, authority, currentness, conflict, evidence state and structured progress.
- **F1–F6:** next-behaviour selection from the latest evidence state.
- **G1–G9:** grant validity, approval, identity-to-authority binding and accountability.
- **H1–H10:** durable versioned records, waits, re-entry, write-and-announce, latest-version timer reads.
- **I1–I7/L1–L4:** communication intent, recipient visibility, channel validity and external expression.
- **J1–J9/K1–K4:** one human owner, transfer, acceptance, substitute authority and partner responsibility.
- **M1–M6:** failure declaration, bounded retries, unknown outcomes and escalation.
- **N1–N17:** scoped memory retrieval, lifecycle, supersession, reconciliation and advisory influence.
- **O1–O10:** derived owner/builder views, explainability, reconstruction and capability-absent visibility.
- **P1–P3/Q1–Q5/R1–R3:** external capability coordination, registry application and independent product improvement.
- **S1–S12/T1–T9/U1–U6:** distributed commit, authorization, isolation, redaction and containment gates.

## Affected boundaries

### B-Story — strong consistency island for Tend-owned operational truth

B-Story survives and is reinforced. It owns the versioned situation model and is the sole writer of operational-truth commits. The situation model is authoritative for Tend’s coordination state: what Tend recorded, what it currently understands, what is waiting, what intent was committed, and what outcome/unknown state is active.

This must not be read as “the situation model is the canonical owner of every external fact.” The model stores external facts as claims with source, observation time, revision and evidence state. Canonical orders, payment records, carrier records and channel messages remain owned by their respective systems.

The following must be one B-Story version:

- inbound record plus superseded wait;
- irreversible initiation plus unknown outcome plus recheck wait;
- evidence change plus affected wait/work update;
- human-work ownership/transfer state that prevents duplicate responsibility;
- closure outcome plus completion-discipline evidence;
- communication intent plus the situation change that makes it sendable.

### B-Membrane — intentionally separate, but version-gated

B-Membrane remains separate because channel transport, ingress routing, visibility and delivery have different change and failure drivers from situation advancement. It must not write operational truth.

Its consistency contract is not shared state. It is a reference to a B-Story version, explicit send intent, live permission decision and channel rules. Ingress routing is allowed to use short cards and routing slices, but attachment must be revalidated against the latest story before the first truth commit. A stale card must not attach a message to a closed, changed or wrong situation.

### B-Memory — intentionally independent and advisory

B-Memory survives as one memory domain with three different temporal behaviours:

- serve is synchronous to a context need but advisory;
- observe/learn is asynchronous and may lag the worker;
- configuration candidates are non-authoritative until deterministic registry application.

Memory retrieval must hard-filter scope, validity, lifecycle, version and permission before relevance ranking. A memory item never outranks current authoritative evidence, live grants, policy, or the current situation model merely because it is similar or recent.

### B-Visibility — intentionally eventually consistent

B-Visibility remains a derived read boundary. Its board, snapshot, timeline and attention feed may lag B-Story, but the logical model must let a reader understand which story state the view reflects and when it was derived. The representation is open. A user action based on a derived view must re-read the authoritative story and live authority before changing anything.

“Stale board lag acceptable” is safe only if the view makes its reflected story state and derivation point understandable and cannot silently become an action authority. A projection that is stale but presented as current is not an acceptable form of eventual consistency.

### Adjacent-Tool — separate transient execution state from story truth

Adjacent-Tool owns bounded retry/poll state, connector interaction and structured evidence return. It must not write situation claims, waits, outcomes or closure. Before an irreversible effect it reads B-Story for initiation/idempotency and reads live authorization through T2/T5.

The tool and B-Story cannot atomically commit an external effect and a situation version. The **U2 refund/tool path has an established protocol** for intent before effect, initiation identity, result/unknown evidence, deduplicated retry or status check, and handoff after the configured unknown window. Section 9 discovers that outbound communication may need a comparable logical treatment, but that communication protocol is **not established here** and remains a provisional/open gap.

### Adjacent-Config — authoritative apply is separate from memory proposal

The configuration registry/apply path remains distinct from B-Memory. Memory may propose a candidate; only the deterministic configuration capability may apply a validated registry or grant change. A stale candidate must not silently overwrite a newer configuration version.

The consistency semantics follow the four change planes from Level 2:

1. **Facts/evidence:** live; re-read current known information.
2. **Platform/external rules:** live and interrupt; wake and re-evaluate.
3. **Grants/authority:** live; check at the action boundary, never rely on a stale snapshot.
4. **Business policies/workflows:** pinned in the situation rule context at open; migration is deliberate, prospective and recorded.

### Adjacent-Improvement — intentionally independent

The improvement path may consume redacted training-grade traces, but its output must not alter a live story, grant, policy, source-of-truth mapping, required approval or irreversible-action boundary. Behaviour improvement needs explicit validation/release gates before becoming active. It is not a consistency dependency of a current wake.

## Affected interactions and commit semantics

### 1. B-Story version commit

`WAKE → RECOVER → PROPOSE → VALIDATE → EXECUTE → UPDATE → REST` reads one current version and commits an updated version only when an enumerated state/evidence transition occurred. Structural state checks include version match; T gates re-check permission at the action boundary.

`HC-1` is the core commit contract: the situation-model version and `event:sm_version` announcement are one unit. An unannounced write is incomplete and must be retried or repaired. Consumers react to the committed version; they do not write truth back.

### 2. Timer versus message

For U1, the inbound reply commits with wait supersession in one version. The later timer re-reads that version and becomes a no-op. This is a pass for B-Story consistency, provided single-flight/version-match semantics remain enforced under simultaneous wakes.

### 3. Unknown irreversible outcome

For U2, initiation, unknown outcome and recheck wait are one version. The external gateway remains canonical for settlement. A later recheck produces a new claim/version; S9 prevents a second new post. This is not exactly-once external execution. It is a deliberately explicit unknown-outcome protocol.

### 4. U4 stale/unavailable carrier

The carrier owns the tracking record. Tend stores the observed carrier claim, its observation/currentness state and the customer’s experience separately. Inside the configured bound the situation waits; after the bound it records failure and follows the configured escalation path. A stale observation can support a bounded “latest reported state” message but cannot support a current delivery promise or irreversible compensation.

If a carrier update arrives while a human/partner escalation is pending, the new claim creates a new complete situation version. Pending work and outbound intent must be re-evaluated against that version; an old “carrier unavailable” intent must not send after the carrier has recovered unless policy says it remains relevant.

### 5. U3 partial fulfilment

The deck and revenue asks may progress independently within the same stakeholder situation. The deck send is tied to the version and intent that cleared it; the open revenue ask remains open. Later revenue evidence creates a later version and possibly a second situation-delta send. B-Membrane must not require all asks to agree before sending a committed partial result.

### 6. U5 capability absence

Capability-absent is a committed declaration based on the registry and people check at that time, not a permanent fact about the business. If configuration later enables a source, a **configuration-change event/notice** or another relevant event may cause re-evaluation. The previous honest limitation remains historical; it is not overwritten.

### 7. Routing card freshness

The agreed B-Memory routing picture intentionally returns a small card set, not full history. Those cards are a selection aid, not authority to attach. The chosen attachment must be checked against the latest B-Story state before the first truth commit. If the card set is stale, the correct result is hold, ask, create, or re-route—not silent attachment based on a cached card.

### 8. Derived owner snapshot

The owner may see a stale snapshot. The logical consequence is that the view must support knowing which story state it reflects and when it was derived, without prescribing fixed field names. Drill-down, approval, configuration, or other consequential action must re-read B-Story and live T state. B-Visibility can be independently refreshed or rebuilt without changing operational truth.

## Explicit consistency matrix

| State/artifact | Owner | Required semantics | Allowed lag/independence | Unsafe shortcut |
|---|---|---|---|---|
| Situation operational truth | B-Story | Versioned, single-writer, atomic moves | None within one move | Multiple boundaries co-write truth |
| SM change announcement | B-Story/HC fabric | Atomic with version commit | No unannounced committed version | Commit then publish later |
| External business fact | Owning business system/partner | Read current enough for this decision; preserve provenance | May change after read | Copy becomes Tend’s canonical truth |
| Canonical channel message | Communication platform | Platform owns delivery record; Tend stores refs/evidence | Ack may arrive later/unknown | Treat send intent as delivered |
| Grant/policy enforcement | Business configuration + authority | Live authoritative read at each effect | Cache only advisory context | Cache permits action after revocation |
| Situation rule context | B-Story at open + deliberate migration | Policy/workflow version pinned and traceable | No silent retroactive rewrite | In-flight work changes rule mid-step |
| Memory context | B-Memory serve | Scope/status/version/validity filtered; provenance retained | Learn path may lag | Similar memory overrides current fact |
| Owner snapshot | B-Visibility | Derived with an indication of the source story state and derivation time; exact representation remains open | Eventual consistency | Snapshot acts as current authority |
| Tool execution state | Adjacent-Tool | Bounded, structured, idempotency-aware | Transient until interpreted by B-Story | Tool writes story claims |
| Improvement trace/output | Adjacent-Improvement | Async, redacted, release-gated | Fully independent of current wake | Live model changes silently |

## Relevant invariants

- Tend never guesses.
- Every decision is based on information available at that moment.
- Tend always works with the latest known state, interpreted as the latest committed Tend version plus current-enough external evidence—not universal reality.
- Tend never owns information that belongs to another system.
- Conflicting information is identified, preserved and not silently collapsed.
- Every important action and decision is explainable and traceable.
- Waiting has a visible reason and resume condition.
- Operational truth lives in the situation model; B-Story is sole truth writer.
- Write-and-announce occurs together.
- Timer wakes re-read the latest situation version.
- Cache never decides authorization.
- Capability-absent is not failure.
- Learned memory cannot change rules, authority, permissions, ownership, approvals or irreversible-action boundaries.
- One business cannot see another business’s data.

## Relevant failure and uncertainty

- **Stale external evidence:** record as stale/degraded with reason; continue only on safe bounded paths.
- **Conflicting claims:** preserve claims and comparison reason; block only the affected unsafe action, not the whole situation by default.
- **External unknown outcome:** keep waiting inside the configured bound; use idempotency/status checks; do not auto-redo an irreversible action after the bound.
- **Unannounced SM commit:** incomplete job; repair/retry before consumers are assumed to have reacted.
- **Stale worker/timer read:** version match or latest-version re-read rejects the action; re-enter the loop.
- **Stale owner projection:** allowed as a read if the reflected story state and derivation point are understandable; re-read before consequential action.
- **Stale memory/config candidate:** advisory or rejected until validity/scope/version checks and deterministic application succeed.
- **Revoked authority:** live T5/T6 read denies or steps up even if an earlier situation snapshot allowed the action.
- **Lost/delayed event:** book-of-waits check-in re-enters the situation; this is a consistency recovery path, not polling.
- **Duplicate ingress/event:** S12 dedup and situation/version checks must make repeated delivery harmless.

## Observed tensions

1. **“Latest known state” versus external canonical truth.** The invariant is sound only if “latest” means latest committed version known to Tend, while external facts remain claims whose currentness is decision-relative.
2. **Atomic story commit versus external effect.** HC-1 can atomically commit Tend state and its internal announcement, but not a payment, carrier update, or channel send. Unknown outcome and idempotency are therefore part of consistency, not merely tool reliability.
3. **B-Membrane send intent versus platform delivery.** Section 8 has version-gated send jobs and delivery acknowledgements, but it does not yet establish a complete channel-neutral duplicate-send/unknown-delivery protocol equivalent to the established U2 refund/tool protocol. This is a Section 9 discovery and provisional/open gap, not an existing rule.
4. **Eventual B-Visibility versus “one truthful picture.”** A derived view can be truthful relative to the story state it observed but misleading if it looks current or drives an action without revalidation. The logical consequence is lineage/as-of awareness; the representation is not fixed here.
5. **Routing cards versus current situation state.** Short cards must remain small and privacy-safe, but stale cards can create wrong attachment unless the selected route is revalidated before B-Story commits truth.
6. **Live grants versus pinned business rule context.** This distinction is correct, but every action must identify which plane changed; otherwise “configuration changed” is ambiguous and migration can become silent.
7. **Partial asks in one situation.** Independent ask progress is required for U3, but send jobs must be keyed to ask/intent/version so one completed ask does not incorrectly imply that the whole situation is complete.

## Architectural consequence

Consistency is a set of scoped contracts, not a global property. The architecture must preserve five explicit consistency classes:

1. **Strong local consistency inside B-Story:** one situation version is the atomic unit for operational truth and coupled safety transitions.
2. **Read-freshness consistency before action:** B-Story reads the latest committed version; external facts, grants and channel rules are re-read when the decision’s consequence requires it.
3. **Provenance consistency for external truth:** every external observation remains a claim with source, time, revision/currentness and conflict state; Tend never silently promotes it to canonical truth.
4. **Lineage-aware eventual consistency for derived/advisory consumers:** B-Membrane, B-Memory and B-Visibility may operate independently, but they must support enough lineage/scope information to detect stale context and must not write or authorize story truth. Exact field names remain open.
5. **Deliberate change-plane consistency:** facts, platform rules and grants remain live; business policies/workflows use a pinned rule context with explicit migration.

Section 9 discovers a need to reconcile an external-effect treatment at the logical level, without selecting technology: intent before effect, effect identity, acknowledgement/result/unknown state, deduplicated repetition semantics, and a bounded handoff path. The tool path has this pattern established for U2; the membrane path may need comparable treatment for outbound communication, but that is a provisional/open architectural gap rather than an established rule.

## Decisions / constraints

### Established from existing architecture and Level 2

- B-Story is the sole writer of operational-truth versions.
- Atomic moves are required for inbound-plus-wait supersession and initiation-plus-unknown-plus-wait.
- SM version commit and `event:sm_version` announcement are one unit.
- Timer and worker paths re-read the latest SM before outbound or irreversible decisions.
- External systems remain canonical for the records/operations they own.
- Source comparison is deterministic and claim-specific; authority is not universal truth.
- Evidence uses explicit states/reasons/history, not numeric confidence.
- B-Visibility is a read-only derived projection and may lag.
- B-Memory serve is scoped/advisory; observe/learn is asynchronous; memory cannot change authority or policy.
- Enforcement reads authoritative grants/policy; cache is never a deciding source.
- Policies/workflows are pinned at situation open; facts, platform rules and grants are live.

### Provisional constraints requiring follow-up in the canonical Section 9 synthesis

- Every outbound send job needs a future explicit deduplication/resend/unknown-delivery treatment; Section 9 has not established that communication contract.
- Every derived projection must support a way to identify the story state and derivation point it reflects, and must revalidate before consequential action; exact field names/representation remain open.
- Every routing attachment based on short cards must be revalidated against current B-Story state before truth commit.
- Every external claim used for an action must carry a decision-relative currentness/evidence state and safe fallback.
- Every configuration candidate/apply path must reject stale writes or require deliberate merge/migration; it must not silently overwrite a newer registry state.

## Rejected alternatives

- **Global strong consistency across all boundaries:** rejected; it would wrongly make external systems, projections, memory and improvement share one owner and lifecycle.
- **Tend copies external canonical data and treats the copy as truth:** rejected; violates source ownership and currentness principles.
- **One universal freshness/TTL or confidence score:** rejected; currentness and consequence are claim/decision-relative.
- **Always-latest policy/workflow for every in-flight situation:** rejected; it makes the same situation’s trace unstable and can change a decision silently mid-flight.
- **Pin grants and platform rules with the situation:** rejected; revoked authority and external rule changes must take effect live.
- **B-Memory or B-Visibility as a second story writer:** rejected; creates competing truth and split atomicity.
- **Send before committing intent:** rejected; creates untraceable external effects.
- **Treat delivery acknowledgement as proof that the business outcome occurred:** rejected; ack proves transport state only, not the customer/business outcome.
- **Use a stale routing card as attachment authority:** rejected; cards are a privacy-safe selection aid, not the story’s current truth.
- **Make every consumer wait synchronously for B-Memory/B-Visibility/Improvement:** rejected; intentionally independent consumers would become a correctness bottleneck.

## Trade-offs

- Strong consistency is concentrated where unsafe story transitions are coupled, increasing B-Story coordination but preserving correctness.
- Eventual projections and async memory make commits fast and boundaries independent, at the cost of visible lag and the need for understandable story-lineage/derivation indications.
- Preserving all claims and versions improves auditability and re-evaluation, at the cost of more complex evidence interpretation and storage.
- Live grants/platform rules improve safety, but an in-flight situation can require re-evaluation or deliberate migration.
- Pinned policy/workflow context improves reproducibility, but situations can temporarily operate under an older business policy until migration.
- Version-gated external egress reduces stale sends, but cannot eliminate uncertainty after a remote side effect; a channel-neutral duplicate/unknown-delivery treatment is a Section 9 provisional gap, with channel-specific deduplication or human handling likely required.
- Partial fulfilment keeps work moving, but completion semantics must distinguish ask-level completion from situation-level completion.

## Evaluation signals

- No situation-model version exists without a matching `event:sm_version` announcement.
- No B-Story decision or effect uses a superseded SM version.
- U1 timer/message race never sends the superseded nurture.
- U2 never creates a second new refund post while the first outcome is unknown; after the bound, the case becomes human-owned rather than auto-redone.
- U4 never presents stale carrier data as a current delivery promise; stale/degraded state, wait/failure and escalation are visible.
- No external claim is used without provenance, observation time/currentness and evidence state appropriate to the action.
- B-Visibility can indicate the story state and derivation point its view reflects; consequential actions revalidate against current B-Story.
- B-Memory retrieval excludes wrong tenant, wrong scope, superseded/stale/prohibited items before ranking.
- A revoked grant is denied at the next effect boundary even when an older context snapshot allowed it.
- Policy/workflow changes do not silently alter in-flight situations; migration is attributed and visible.
- Repeated ingress, timer, result, ack or check-in events do not create duplicate waits, asks, human owners or story transitions.
- Partial U3 asks can complete independently without falsely closing the other ask.
- Cross-tenant IDs or untrusted fields cannot create a cross-tenant claim or projection.

## Revisit conditions

- A channel or partner cannot provide a reliable delivery/deduplication or idempotency contract for outbound effects.
- A new scenario requires an external effect whose outcome cannot be represented as success, failure or bounded unknown.
- B-Story needs multiple concurrent truth writers for one situation.
- A projection, routing card, memory slice or configuration candidate is observed to drive action without current-version revalidation.
- A business requires a policy/workflow to change immediately for in-flight situations, or requires a migration model not covered by the pinned rule context.
- A provider changes its status/revision semantics, freshness behaviour or canonical ownership.
- A new capability makes currentness or consequence action-specific in a way not expressible by existing evidence states/rules.
- A safety incident shows that “latest known state” was interpreted as external truth rather than Tend’s latest committed, provenance-bearing understanding.
- U3/U4 or later dimension/concurrency stress reveals that partial ask progress, partner escalation, or stale external results can create duplicate or stale expression.

## Cross-dimension dependencies and revisit triggers

These are dependencies only; they do not move this record into another dimension:

- **Time:** currentness thresholds, settle windows, wait bounds and policy-notice deadlines determine when consistency changes from usable to stale/failed.
- **Failure:** remote unknown outcomes, retries, circuit breaking and provider outages require the external-effect protocol.
- **Concurrency:** simultaneous wakes, version-match/optimistic conflict handling and single-flight semantics must preserve B-Story’s single-writer rule.
- **Authority/security:** live grants, tenant context, field visibility and kill switches can invalidate an otherwise consistent plan.
- **Observability:** every commit, read version, evidence state, send intent, remote outcome and projection derivation point must be reconstructable.
- **Human behaviour:** human acceptance, transfer, inaction and authority change alter who may complete the next consistency-sensitive step.
- **Evolution:** capability/schema/status changes may invalidate stored claims, memory, projections and rule contexts; deliberate migration and lifecycle states are required.
- **Scaling:** large numbers of independent situations and projections must not turn intended independence into cross-situation coupling or stale global snapshots.

## B-Story / B-Membrane / B-Memory / B-Visibility and adjacent-model survival

| Model element | Consistency verdict | Required clarification |
|---|---|---|
| **B-Story** | **Survives — strengthened** | Strong consistency island for Tend operational truth; “truth” means coordination truth, not external canonical reality. |
| **B-Membrane** | **Survives — constrained** | Version/intent/gate reference is the established contract; ingress cards require revalidation; outbound unknown/duplicate semantics are a Section 9 provisional/open gap, distinct from established U2 refund handling. |
| **B-Memory** | **Survives — intentionally independent** | Advisory, scoped, lifecycle/version filtered; async learning never blocks or writes story truth. |
| **B-Visibility** | **Survives — provisional** | Eventual derived views are acceptable only if they can indicate the story state/derivation point they reflect and are revalidated before consequential action; exact representation remains open. |
| **Adjacent-Tool** | **Survives — strengthened** | Tool transient state and external-effect identity remain separate from B-Story; unknown outcomes must be explicit. |
| **Adjacent-Config** | **Survives — provisional** | Deterministic apply is authoritative; stale candidates cannot overwrite; four-plane change semantics must be carried into synthesis. |
| **Adjacent-Improvement** | **Survives — independent** | No live decision dependency; redaction, evaluation and release gates precede influence on model behaviour. |
| **S/T/U** | **Survives — distributed gates** | S commits/announces/dedupes; T uses live authoritative enforcement; U isolates tenants and untrusted data. None becomes a monolithic control boundary. |

## Evidence paths

### Product and Level 1

- `knowledge_base/Product_Vision.md` — distributed information, source disagreement, communication as final step, traceability, fail safely, business remains owner, success as no dropped handoffs.
- `knowledge_base/Level1_Problem_Framing_or_Expansion.md` — assumptions on incomplete/conflicting/changing information; actors; invariants; failure classes; “latest known state”; no source-of-truth takeover; architecture questions on strong consistency and independent operation.
- `knowledge_base/three_level_framework/3_level_framework.md` — Level 2 must produce logical responsibilities and remain technology-neutral.
- `knowledge_base/three_level_framework/architecture_contruction.md` §9.3–§9.4, §9.9, §9.27–§9.30 — dimension model, consistency force, record schema and gate.

### Established architecture

- `knowledge_base/architecture/what_is_already_settled.md` — carrier-down wait/failure distinction, source ownership, no invented location, scoped partner communication, settings not memory, and external send only from committed situation change.
- `knowledge_base/architecture/section_6_responsibility_model.md` — E1–E9, H1–H10, I1–I7, M1–M6, N1–N17, Q1–Q5, R1–R3, S1–S12, T1–T9, U1–U6, §6.9 state ownership.
- `knowledge_base/architecture/section_7_boundary_model.md` — §7.3 operational truth distinction; §7.12 B-Story/B-Membrane/B-Memory/B-Visibility; §7.12.9 distributed gates; §7.13 edge catalog.
- `knowledge_base/architecture/section_8_interaction_model.md` — I1–I8; per-wake contract; HC-1–HC-3; AC-1–AC-4; IB-1–IB-14; atomic move catalog; U1–U5 walkthroughs; B-Visibility/B-Memory behaviour; anti-patterns.
- `knowledge_base/architecture/how_tend_finds_the_right_situation.md` — routing-card scope, full-story opening, canonical settings, memory must-not rules and U4/U5 distinctions.

### Level 2 evidence

- `knowledge_base/Level 2/trust_and_evidence/how_do_we_compare_information_from_different_sources.md`
- `knowledge_base/Level 2/trust_and_evidence/how_do_we_determine_whether_information_should_be_trusted.md`
- `knowledge_base/Level 2/trust_and_evidence/how_do_we_identify_conflicting_information.md`
- `knowledge_base/Level 2/trust_and_evidence/how_do_we_represent_confidence_without_pretending_certainty.md`
- `knowledge_base/Level 2/trust_and_evidence/how_do_we_resolve_conflicts.md`
- `knowledge_base/Level 2/trust_and_evidence/what_makes_one_source_more_authoritative_than_another.md`
- `knowledge_base/Level 2/trust_and_evidence/when_should_conflicts_automatically_stop_the_workflow.md`
- `knowledge_base/Level 2/trust_and_evidence/when_should_conflicts_simply_be_presented_to_a_person.md`
- `knowledge_base/Level 2/gathering_information/how_do_we_know_when_information_is_sufficiently_current.md`
- `knowledge_base/Level 2/gathering_information/how_do_we_handle_information_that_changes_while_a_situation_is_being_analysed.md`
- `knowledge_base/Level 2/gathering_information/how_do_we_handle_information_that_arrives_gradually.md`
- `knowledge_base/Level 2/decision_making/how_do_we_ensure_consistent_next_behaviour.md`
- `knowledge_base/Level 2/decision_making/how_should_uncertainty_influence_project_xs_next_behavior.md`
- `knowledge_base/Level 2/decision_making/what_does_enough_information_mean.md`
- `knowledge_base/Level 2/coordination/how_do_we_prevent_duplicated_work.md`
- `knowledge_base/Level 2/coordination/how_do_we_recover_interrupted_work.md`
- `knowledge_base/Level 2/coordination/how_do_we_represent_work_that_is_waiting.md`
- `knowledge_base/Level 2/failure/how_do_we_distinguish_failure_from_uncertainty.md`
- `knowledge_base/Level 2/failure/how_do_we_continue_working_when_only_part_of_the_system_is_unavailable.md`
- `knowledge_base/Level 2/failure/how_do_we_avoid_repeating_the_same_failed_action_forever.md`
- `knowledge_base/Level 2/time/how_should_waiting_be_represented.md`
- `knowledge_base/Level 2/time/when_should_waiting_end_automatically.md`
- `knowledge_base/Level 2/time/how_should_forgotten_work_be_rediscovered.md`
- `knowledge_base/Level 2/memory_and_knowledge/how_do_we_prevent_outdated_knowledge_from_influencing_new_decisions.md`
- `knowledge_base/Level 2/memory_and_knowledge/how_do_we_update_knowledge_when_reality_changes.md`
- `knowledge_base/Level 2/memory_and_knowledge/how_should_new_learning_be_reconciled_and_versioned.md`
- `knowledge_base/Level 2/memory_and_knowledge/how_should_memory_be_retrieved.md`
- `knowledge_base/Level 2/memory_and_knowledge/how_should_memory_be_scoped_between_businesses.md`
- `knowledge_base/Level 2/memory_and_knowledge/how_should_previous_conversations_influence_future_decisions.md`
- `knowledge_base/Level 2/memory_and_knowledge/what_kind_of_learning_is_acceptable.md`
- `knowledge_base/Level 2/growth_and_evolution/how_do_we_evolve_tend_without_breaking_existing_businesses.md`
- `knowledge_base/Level 2/growth_and_evolution/how_do_businesses_customise_tend_without_changing_its_core_behaviour.md`
- `knowledge_base/Level 2/business_view_and_observation/what_should_the_business_owner_see_in_a_snapshot_of_the_business_journey.md`
- `knowledge_base/Level 2/communication/how_should_tend_communicate_conflicting_information.md`
- `knowledge_base/Level 2/communication/how_should_tend_communicate_uncertainty.md`
- `knowledge_base/Level 2/communication/when_should_tend_wait.md`
- `knowledge_base/Level 2/authority_and_ownership/which_actor_owns_each_type_of_information.md`
- `knowledge_base/Level 2/authority_and_ownership/how_does_a_grant_end_and_how_does_role_change_affect_authority.md`

## Final subagent summary

### Strongest architectural discoveries

1. **B-Story is a strong consistency island, not a universal truth store.** This distinction lets Tend coordinate one honest story without stealing canonical ownership from carriers, payment providers, business systems or communication platforms.
2. **Consistency must be expressed as a matrix of relationships and time scopes.** “Strong,” “eventual,” and “independent” are useful only when tied to a named state and boundary.
3. **Currentness is decision-relative.** The latest committed story version is necessary but not sufficient; external claims must be fresh enough for the proposed behaviour and consequence.
4. **Atomicity stops at the external-effect boundary.** The logical architecture must model intent, effect identity, remote acknowledgement/result/unknown state and bounded recovery. U2 proves this for refunds; B-Membrane egress does not yet have an equally explicit contract.
5. **Intentional independence is valid and necessary.** B-Memory, B-Visibility and Adjacent-Improvement can lag or operate asynchronously without weakening correctness, provided they carry lineage and cannot write/authorize story truth.
6. **The four change planes are consistency semantics.** Live facts, platform rules and grants must interrupt/re-check; policies/workflows need pinned rule context and deliberate migration.
7. **Routing cards and owner snapshots are views, not authority.** Both need a logical way to indicate freshness/lineage and require revalidation before consequential action; no fixed field names are established here.

### Claims requiring parent-agent correction or explicit carry-forward

- Treat the phrase **“latest known state”** as qualified: latest committed Tend version plus decision-relative, provenance-bearing external evidence; never universal external truth.
- Carry forward the **Section 9 provisional/open discovery** that communication egress needs a duplicate/unknown-delivery treatment comparable to the established U2 refund/tool protocol. Current Section 8 gates stale sends but does not yet fully define what happens when a send may have succeeded and the acknowledgement is lost.
- Carry **routing-card freshness/revalidation** into the final interaction/architecture reconciliation: the card chooser may select; only current B-Story state can commit attachment. This is a logical consequence, not a fixed field schema.
- Reconcile how B-Visibility indicates the story state and derivation point behind a snapshot, and require revalidation before consequential action. This is a logical consequence, not a prescribed `as-of` or `source-version` field name.
- Preserve the **four-plane configuration semantics** as an architectural constraint, not merely a Level 2 note.
- Make the distinction **Tend operational truth versus external canonical truth** explicit wherever “truth” appears in the final logical architecture.

### Status by record field

| Field | Status |
|---|---|
| Force | Established |
| Affected responsibilities/boundaries/interactions | Established |
| Coupled B-Story commit semantics | Established |
| External canonical truth distinction | Established in Level 2; must be stated explicitly in final architecture |
| Read freshness/currentness | Provisional per claim/action; exact thresholds remain business configuration/Level 3 |
| B-Visibility freshness contract | Provisional |
| B-Memory intentional lag | Established as advisory/async; exact serve freshness contract provisional |
| External channel effect/dedup semantics | Open/provisional |
| Configuration candidate/apply consistency | Provisional |
| Cross-boundary concurrency details | Dependency on Dimension 7; revisit trigger |
