# Section 9 scratch — Dimension 10: Scaling

**Status:** Working stress-test record; not a canonical architecture change.

**Scope:** Business growth and logical independence. This record does not select servers, shards, services, deployment shapes, throughput targets, or performance mechanisms. Those are not supported by this evidence and belong to a later technical decision where appropriate.

## 1. Construction question

Businesses do not grow along one axis. More customers, situations, employees, systems, channels, processes, locations, integrations, and accumulated knowledge can arrive independently or together. The question is not simply whether Tend handles “more.” It is:

> Which work, facts, permissions, and lifecycles must remain independent as each business-growth force increases, and where must they still coordinate?

Scaling is a lens on the responsibilities, boundaries, and interactions already constructed in Sections 6–8. A growth axis is not, by itself, a new boundary. The architecture must keep distinct situations and businesses from interfering while still connecting related work through explicit, scoped coordination.

## 2. Growth forces and logical pressure

| Growth force | Pressure on the logical model | Coordination that remains necessary |
|---|---|---|
| More businesses / customers / relationships | More tenant contexts, people, active problems, and independent histories; identity must not collapse separate problems. | Route messages and events to the right business and situation; permit an owner or employee to see the appropriately scoped aggregate. |
| More situations and interactions | More concurrent storylines, including many created by one list or event; each needs its own current state, waits, asks, and outcome. | Link situations by operational context and preserve a parent assignment or journey projection without replacing the child stories. |
| More employees and other actors | More distinct knowledge, authority, assignments, responses, and delays; multiple actors may touch one problem. | Keep one accountable owner for a human work item; land responses on the relevant situation; re-check authority at each action. |
| More business systems | More candidate sources of facts and more systems that can be replaced or unavailable. | Preserve source ownership and provenance; coordinate tool results through the situation rather than making Tend the external system of record. |
| More channels | More platform contracts, consent and visibility rules, windows, and delivery outcomes. | Keep channel rules at the membrane; the responsibility to understand and advance the situation stays stable. |
| More business processes and workflows | More procedures can touch the same problem; procedures and policies may evolve on different schedules. | Coordinate through the situation record and explicit links; pin business workflow/policy context for in-flight situations and migrate deliberately. |
| More locations / markets | Local hours, language, currency, policy, and legal requirements may differ. | Apply the right business/location scope and live external/legal constraints without changing the universal safety floor. Exact values and market coverage remain configuration/product questions. |
| More integrations and external agents | More capability contracts, permissions, failure modes, delayed results, and unsupported requests. | Use the capability lifecycle and structured results; distinguish absent capability from a failed, stale, or slow capability; keep waits attached to the affected situation. |
| More accumulated knowledge | More histories, vocabulary, exceptions, and candidate lessons; some knowledge applies only to one business, role, location, process, or time. | Retrieve by explicit scope, evidence, validity, and version; keep learning advisory and never let it rewrite policy, authority, or truth. |

The table describes logical pressures, not a proposed one-to-one mapping from growth axis to subsystem.

## 3. Dimension record

### Dimension ID

D10 — Scaling.

### Force

An independently increasing number and diversity of businesses, relationships, open situations, actors, processes, locations, systems, channels, capabilities, and knowledge items. A single event can also create many related but separately resolvable situations.

### Why it matters

The product promise is to carry business communication and operational responsibility across people, systems, channels, and time without requiring one person to watch everything. Growth makes mistaken attachment, accidental data sharing, hidden inaction, duplicate work, stale authority, wrong source selection, and misleading aggregate views more consequential. The needed property is **logical independence with explicit coordination**, not an unqualified promise to scale.

### Affected responsibilities

- **Situation representation and routing (A1–A12, B1–B9):** one versioned model per operational problem; split distinct asks/problems; link related stories; route or hold uncertain attachments; fan one list instruction out into independent situations plus an aggregate assignment artifact.
- **Comprehension, gathering, and evidence (C–E):** select information and source claims for the right situation, preserve provenance/currentness, and avoid using another customer’s, business’s, or scope’s context as if it applied here.
- **Decision, authority, coordination, and human work (F–H, J–K):** advance each situation independently; record waits and results; assign responsibility; coordinate employees, partners, and business processes without treating them as one shared conversational thread.
- **Communication, channels, and failure (I, L–M):** preserve the situation’s intent while applying channel-specific and live platform rules; distinguish unavailable/stale paths from capability absence and from an unsafe action.
- **Memory, visibility, capabilities, and evolution (N–Q):** scope reusable context; derive useful views without creating a second truth; join/retire capabilities; keep business variation within validated configuration and product invariants.
- **Cross-cutting controls (S–U):** preserve per-wake and commit discipline, deterministic authorization, tenant isolation, scoped disclosure, audit, and product/security constraints as volume and actor count grow.

### Affected boundaries

| Boundary / adjacent concern | Scaling effect and boundary test |
|---|---|
| **B-Story** | Open-situation count and decision depth grow. The established logical unit remains the operational problem: B-Story owns its versioned situation model and worker advancement, including atomic operational-truth commits. Independent situations must not share accidental story state; graph links carry context without merging resolution paths. Growth alone does not overturn the established merge of situation substrate and writer. |
| **B-Membrane** | Channel and event variety grows. It routes ingress and delivers permitted egress under channel rules, but does not own situation advancement or truth. Its boundary is justified by the changing channel/platform problem, not by a presumption that each channel needs its own architectural boundary. |
| **B-Memory** | Knowledge volume and scope variety grow on a lifecycle distinct from an individual situation. Business-specific memory is isolated by default and may be narrower than a business. Memory can serve scoped context and observe/maintain knowledge, but cannot write story truth, apply grants, or silently change policy. The established boundary does not imply separate serve and learn owners. |
| **B-Visibility** | More situations and asks make owner snapshots, assignment aggregates, and person-level journeys more useful. These remain derived/read-only views, not operational truth or authorization. The boundary and derive path are provisional; acceptable freshness and exact projections are not settled here. |
| **Adjacent-Tool** | More connected capabilities increase invocation diversity and correlated failure exposure. The tool harness remains an adjacent per-capability contract for authorization, bounded retry, idempotency, and structured results; present evidence does not establish a separate situation coordinator for integrations. |
| **Configuration / Adjacent-Config** | More business, location, role, policy, workflow, and capability variation increases the need for typed, validated configuration and explicit change planes. The logical responsibility exists, but the formal Adjacent-Config boundary record remains unconstructed. Configuration cannot cross product invariants or become an unbounded scripting surface. |

### Affected interactions

- Ingress routes or holds an event, then wakes the relevant B-Story situation(s); list fan-out creates separate situation models and a distinct aggregate artifact.
- Each B-Story wake reads current situation state, validates the proposed behavior, commits truth under the sole-writer/atomic-commit rule, and rests with an explicit outcome or wait. A timer wakes the story; it does not send directly.
- A consequential send or capability action uses the current committed situation state and the applicable deterministic permission/platform gates. An external result returns as scoped evidence to the affected story.
- Actors and business processes coordinate through the situation record and graph, not by mutating each other’s private work or by requiring a global “everyone finished” barrier.
- B-Memory serves scoped context and receives observation/learning inputs without becoming a story writer. B-Visibility derives owner-facing artifacts asynchronously and cannot authorize or update business truth.
- Business configuration and workflow/policy changes follow their distinct live, pinned, or deliberate-migration semantics; external facts and platform rules are not frozen to make growth easier.

### Relevant invariants

1. **Business isolation:** one business must never see another business’s data in any store, cache, index, log, trace, or model call. Tenant identity is derived from a verified binding, not trusted from model text or an unverified payload hint.
2. **Situation independence:** one situation is one operational problem and one resolution path. Same identity is not enough to merge stories; related work is explicitly linked. Multiple open situations for one person remain independently actionable.
3. **Scoped aggregation:** an aggregate assignment, person journey, or owner snapshot may connect or summarize situations but does not replace them, merge their state, or become a second source of truth.
4. **Single story authority:** B-Story alone commits operational truth. Commit and announcement are coupled; non-story boundaries do not co-write waits, outcomes, or closure.
5. **Current action gates:** model proposals do not authorize effects. Grants are read authoritatively and rechecked at action boundaries; channel, recipient, data-scope, and tenant rules still apply as the count of actors and destinations grows.
6. **Explicit liveness:** independent waits retain their subject, reason, resume trigger, and applicable release/escalation semantics; waiting is not silently treated as completion or failure.
7. **Change containment:** facts, grants, and external platform rules are live according to their planes; business policies/workflows are versioned and pinned at situation open, with deliberate, traceable migration.
8. **Knowledge scope and non-authority:** memory carries its business and narrower scope, evidence, validity, and version; learning cannot silently become policy, permission, source-of-truth authority, or an irreversible-action rule.
9. **Capability truthfulness:** no source is distinct from a slow, stale, unavailable, or denied source. If a person can answer, that is human work rather than a capability-absent declaration.

### Relevant failure and uncertainty classes

- Cross-tenant or cross-scope data leakage; wrong-tenant token, recipient, object, memory retrieval, or trace payload.
- Incorrect event-to-situation attachment, silent merge by customer identity, duplicate situation creation, or an aggregate that hides a still-open child ask.
- Competing or stale actions on one situation; a multi-actor/process update based on an older situation version; unannounced or interrupted work.
- Shared dependency degradation affecting many otherwise independent situations; repeated bounded retries or inconsistent stale/failure conclusions across that cohort.
- No integration/person available versus registered-but-stale, slow, unavailable, denied, or unknown-outcome integration; these must not collapse into one “failure” or “no capability” state.
- Authority or policy changes while work is open; permission from an earlier snapshot must not outlive a revoked grant, while a business workflow change must not silently rewrite an in-flight path.
- Memory that is outdated, mismatched in business/location/process scope, or unresolved in identity/meaning; semantic similarity alone must not activate it.
- A partial bulk assignment, partial fulfilment of a multi-ask situation, unavailable employee/partner, or exhausted escalation path. Existing evidence defines per-situation waits and partial asks, but not a complete bulk-operation failure contract.
- Absolute workload/capacity limits and technical saturation are outside the logical evidence in this record; no numerical or infrastructure answer is inferred.

## 4. Scenario stress tests: U1–U5

### U1 — Outreach, list fan-out, and independent nurture

The settled thirty-address instruction is one piece of assigned work, not a campaign-sized story that collapses all recipients. Tend creates one situation per person and may show one aggregate assignment. Section 8’s U1 tests the reply-before-nurture-timer race within a situation: a reply supersedes the wait; the timer later reads the new version and does not send the stale nurture.

**Scaling result:** the individual story/wait is the independence unit; the assignment is an aggregate coordination/view. One person’s reply must not cancel or advance another person’s nurture. An aggregate completion label cannot imply every child situation is complete.

**Limit exposed:** the logical fan-out result is established, but full bulk-ingress semantics for partial creation, replay/deduplication, per-recipient failure reporting, and aggregate freshness are not fully specified in this evidence. Do not solve that gap by merging the stories.

### U2 — Commercial chain and refund side effect

An inquiry, order, delivery delay, complaint, and refund may be causally related yet remain distinct operational problems linked by business context. In the refund-silent walkthrough, the initiation identity, unknown outcome, and wait are committed together; a duplicate new post is blocked while a same-key resend is governed by the external idempotency contract.

**Scaling result:** related customer activity does not imply one unbounded customer record or one global lifecycle. Each refund/order problem retains its own truth and wait; the external business system remains canonical for its data.

**Limit exposed:** the evidence does not define cross-situation reservation or serialization when separate actions draw on one business-wide scarce resource or aggregate limit (for example, concurrent refunds against a shared allowance). Per-situation atomicity and per-action permission checks do not by themselves answer that coordination question.

### U3 — Investor diligence and partial fulfilment

The investor’s deck and revenue asks share a situation but retain separate progress: the approved deck may be sent while revenue remains open for finance. Each ask must reach an honest ending before the situation resolves; information and approvals are scoped to the requesting actor.

**Scaling result:** a stakeholder relationship is not a single all-or-nothing transaction. Growing investor/partner/owner audiences do not justify flattening asks or broadening disclosure. Separate businesses’ diligence material remains tenant-isolated.

**Limit exposed:** exact aggregate reporting across many stakeholders and the full business-view join remain provisional/open; a projection must preserve the per-ask and per-situation state.

### U4 — Stale or unavailable carrier tracking

Here a tracking capability is registered, but the result may be stale or the path unavailable. Tend records currentness/unknown state, waits within configured bounds, and follows the business-configured escalation path. A partner receives shipment-scoped context, not unrelated customer history.

**Scaling result:** more integrations and more open delivery situations must preserve per-situation evidence, waiting, escalation, and scoped disclosure. The carrier’s rules and facts are not promoted to Tend-owned canonical truth.

**Limit exposed:** the walkthrough handles one delivery situation. It does not establish whether or how a shared carrier outage should be recognized and coordinated across many situations, nor does it authorize an integration-level architecture split. That is a revisit question only if current per-situation failure/wait semantics prove inadequate.

### U5 — No shipping source; capability absent versus human work

The U5 package-status case has no tracking source. Tend checks whether a person can answer. If so, it creates scoped human work; only if neither a system nor a person can serve the ask does it declare capability absence and give an honest limitation. U4 is different: the carrier exists but is stale, slow, or down.

**Scaling result:** the capability catalogue can grow through a controlled lifecycle and expose unsupported gaps without changing Tend’s core responsibility. A larger integration catalogue does not turn every missing connector into a failure, nor permit payment/refund data to stand in for shipping evidence.

**Limit exposed:** the full market-specific catalogue, adoption path, and owner-level view of repeated capability gaps are not settled by this walkthrough.

## 5. Observed tensions

1. **Independent situations versus shared context.** Separate stories prevent one problem from poisoning another; business owners still need useful assignment, person, order, and portfolio views. Links/projections must convey context without becoming shared mutable truth.
2. **Per-situation atomicity versus business-wide constraints.** B-Story’s local atomic commits are established. Concurrent stories may still contend for a shared budget, stock, or other business-level limit. The Level 2 model does not yet say which such limits exist or how they are reserved/reconciled. Do not assume a global lock or a new coordinator.
3. **Independent progress versus shared failures.** One carrier or CRM outage can affect many situations, but each situation has its own customer promise, evidence, and escalation. The record supports scoped waits and bounded tool behavior, not a new fleet-wide outage responsibility.
4. **Universal core versus real business/market variation.** Different roles, approval depth, SLA, tools, channels, locations, and compliance needs are intended to be represented through validated configuration and capability availability. If a variation crosses a product invariant or cannot be represented, the correct result is a visible gap/refusal or product change—not a silently divergent core.
5. **More employees versus authority and visibility.** Collaboration increases, but an employee’s participation does not itself grant configuration authority or access to every customer/partner field. Responsibility assignment, permissions, and information visibility remain distinct concerns.
6. **More history versus safe reuse.** A larger memory corpus may improve continuity while increasing stale, irrelevant, or cross-scope retrieval risk. Scope, provenance, validity, and version are part of the knowledge meaning, not an optional post-filter.
7. **More capability choices versus coherent failure meaning.** Channels and business systems join through contracts, but registered, absent, denied, stale, unavailable, and unknown-outcome paths are materially different. Growth cannot erase these distinctions.
8. **Useful derived views versus honest freshness.** A view may be asynchronous and still useful, but any stale projection that appears authoritative or hides active work can mislead. The logical freshness/lineage contract is not yet fully defined.

## 6. Architectural consequence

The consequence supported by current evidence is to preserve **logical independence at the business and situation levels, with explicit graph-, wait-, capability-, and configuration-mediated coordination**. The already-established B-Story, B-Membrane, and B-Memory boundaries remain the current logical model; Section 9 adds tests and unresolved conditions rather than redrawing them.

Growth currently gives **no evidence for a scaling-driven split** of:

- B-Story’s situation substrate from its worker/writer—the existing decision combines them because atomic truth commits and sole-writer ownership otherwise cross a correctness boundary.
- B-Membrane ingress from egress—the existing decision keeps shared channel expertise and platform rules together while keeping story truth out.
- B-Memory’s observe/learn/maintain path from serve—the existing decision avoids duplicate indexes and reconciliation ownership for one business knowledge domain.
- A new universal process coordinator, one boundary per channel/integration/location, or a separate situation for each employee/process. Coordination documents say processes interact through the situation record; the evidence identifies no independent ownership problem requiring such a boundary.

B-Visibility remains a **provisional** derived boundary because it owns a different read/observation concern, not because scale alone proves a component split. Configuration/evolution responsibilities are present, but the formal Adjacent-Config boundary is still unconstructed. Neither uncertainty is resolved by naming a technology.

## 7. Established, provisional, and open

### Established by current working decisions

- A situation is one operational problem; multiple situations for one person can remain open independently. Related stories are linked by operational context, not merged by identity. A list instruction creates per-person situations plus an aggregate assignment artifact.
- B-Story owns situation truth and its atomic commits; its logical scaling driver is open situations/decision depth, not channel count alone.
- B-Membrane owns event/message ingress and permitted channel egress without writing operational truth. Channel count changes its work, while the responsibility of understanding the story does not change.
- Businesses may differ in roles, systems, channels, escalation, audit weight, location/market needs, and policy values through bounded configuration over a shared core; invariants are non-configurable.
- Business-specific memory is isolated by default, may be scoped more narrowly than a business, and is structured/versioned/provenanced conceptually. Cross-business transfer is deliberate, not automatic.
- Tenant isolation, deterministic authorization, live grant checks, scoped disclosure, and audit are required regardless of business or actor count.
- U1–U5 preserve independent situation state and distinctions between the timer race, unknown external outcome, partial stakeholder asks, stale/failed registered integration, and absent capability.

### Provisional

- B-Visibility derive and exact owner/person/assignment projection semantics; its asynchronous/read-only behavior is the current direction, but freshness bounds and detailed joins remain unsettled.
- B-Memory’s serve path and its must-not influence rules are established in the settled page; learning promotion/reconciliation beyond those limits remains provisional and must not block B-Story commits.
- Bulk assignment operational details (partial fan-out, retries, aggregate freshness) and complete visibility of high-volume open work are not fully specified.
- Exact configuration/runtime treatment of some market, location, role, and regulatory variation is not established by this scaling pass.

### Open

- Which shared business resources or aggregate policy limits require coordination across otherwise independent situation actions, and what authoritative rule decides that.
- Whether recurring shared-provider incidents require any additional logical responsibility beyond existing capability, failure, wait, and situation semantics.
- Bulk fan-out’s complete partial-failure and replay contract; exact derived-view freshness/lineage; and how an aggregate assignment reports mixed child outcomes.
- Role/queue/schedule routing where a business has not named a responsible person; exact geography- and jurisdiction-specific values; exact memory reconciliation fields.
- All numeric capacity, workload, rate, latency, physical isolation, and deployment questions. These are not logical conclusions from the present evidence.

## 8. Rejected alternatives and trade-offs

### Explicitly rejected by existing evidence

- **One situation per person, customer, or conversation:** rejected where it merges distinct operational problems; separate stories can share explicit identity/context links.
- **Split B-Story substrate from worker/writer:** rejected because sole-writer atomic operational commits would cross the boundary and invite split-brain/double-writer behavior.
- **Split B-Membrane ingress from egress:** rejected because both share channel/platform expertise; the membrane stays thin and does not own story truth.
- **Split B-Memory observe/learn from serve:** rejected because the same business knowledge domain would duplicate indexes and reconciliation ownership.
- **Turn business differences into unrestricted business-specific core behavior:** rejected by the core/config boundary and non-configurable product invariants; unsupported configuration must surface as a gap.
- **Treat an empty capability list as sufficient proof of capability absence:** rejected; the person path must also be checked.

### Not justified by this scaling evidence (not new formal rejection records)

- A separate logical boundary for each growth axis, location, channel, integration, process, or employee.
- A global lock, coordinator, or shared mutable customer/campaign story to make every action appear serialized.
- A scale-based B-Memory serve/learn split, or automatic cross-business transfer of knowledge.
- Any server, shard, microservice, queue, database, or performance prescription.

### Trade-offs

- Per-situation independence protects correct local decisions and lifecycle, but increases the importance of explicit links, aggregate views, and safe cross-situation handling for truly shared business constraints.
- One B-Story ownership domain supports atomic story correctness, but can concentrate conceptual responsibility; whether that becomes a technical limit is a later evidence-based Level 3 question, not a reason to split logical truth ownership now.
- A shared B-Membrane avoids duplicated channel rules, but every ingress/egress path must still carry the correct situation, tenant, recipient, and current policy context.
- Business-scoped knowledge reduces unsafe reuse and leakage, but requires deliberate generalization before a useful lesson can transfer.
- Async derived views avoid making an owner projection authoritative, but can lag; the acceptable logical freshness contract remains open.
- Configurable variation supports diverse businesses without core forks, but increases validation and setup burden and must make unsupported needs visible.

## 9. Evaluation signals

Evaluate these as scenario outcomes and invariant checks, not as invented performance targets:

- A list fan-out creates the expected independent situations; reply, wait cancellation, closure, or failure in one does not mutate another; the aggregate accurately represents mixed child states without replacing them.
- One person with several concurrent problems sees separate waits, deadlines, asks, permissions, and outcomes; links expose context without merging the stories.
- Cross-tenant tests keep data, credentials, memory, indexes, logs, traces, and model inputs isolated; a wrong-tenant read or invoke is denied before any external effect.
- Multiple employees or processes can contribute evidence to the right situation; each human work item has one responsible owner; a participant cannot expand grants or see fields outside scope.
- New channel/system/workflow/location variation either fits validated configuration/capability contracts without changing the core, or appears as a visible unsupported gap.
- A changed business policy/workflow does not silently rewrite in-flight work; a revoked grant or changed platform rule is honored at the next relevant action boundary.
- Capability-absent, human-answerable, stale, unavailable, denied, and unknown-outcome cases produce the distinct honest paths exercised by U2/U4/U5.
- Memory retrieval excludes wrong business/scope/version/validity; unresolved identity or stale knowledge remains unresolved/advisory and cannot alter policy or authorization.
- Derived owner/person/assignment views can be checked back to their source situations and do not silently report completion while child asks remain open. This is a provisional evaluation requirement pending exact view semantics.
- If separate situations can simultaneously violate a shared business limit while each passes its own local checks, record that as a concrete architecture gap rather than concealing it with a guessed global mechanism.

## 10. Revisit conditions

Reopen the smallest affected Level 2 decision if evidence shows any of the following:

- One business’s activity or knowledge is visible or applicable in another business, or current tenant/action gates cannot enforce isolation at all storage/retrieval/effect boundaries.
- One situation’s event, wait, policy version, or outcome incorrectly changes another independent situation; or a required shared-resource invariant cannot be represented by current responsibilities and situation interactions.
- Repeated correlated integration failure creates unsafe or materially inconsistent behavior that cannot be expressed through existing capability, bounded retry, wait, and escalation semantics.
- Bulk fan-out or aggregate observation loses child work, hides partial completion, or cannot recover/reconcile a repeated event without duplicating consequential actions.
- A new employee, channel, location, process, system, or market variation cannot be represented inside the validated configuration/capability model without changing the core, or asks to cross a product invariant.
- Memory growth leads to wrong-scope retrieval, silent overwrite, or unsafe influence despite the established scoping, provenance, and update operations.
- A derived view must write truth or authorize actions to remain useful, indicating its responsibility or boundary needs reconsideration.
- Concrete implementation evidence later shows a Level 3 capacity constraint. Revisit logical architecture only if that constraint breaks a stated logical invariant or requires a new responsibility; performance pressure alone does not establish a Level 2 split.

## 11. Supporting evidence: exact paths and sections

### Method and primary architecture

- `knowledge_base/three_level_framework/architecture_contruction.md` — §9.1–9.4 (dimensions challenge existing responsibilities/boundaries/interactions; method), §9.14 (Dimension 10 — Scaling), §9.27 (Architectural Dimension Record).
- `knowledge_base/Product_Vision.md` — §1 (Tend’s agency and a situation as one storyline, not one chat), §2 (why growth makes cross-person/system/channel work hard), §4 (what Tend does differently), §5 “An owner gives Tend a list of people to contact” and “The journey is not one conversation,” §6 (principles, including understand before acting, never guess, artifacts, human responsibility, predictable decisions, explanation and traceability).
- `knowledge_base/Level1_Problem_Framing_or_Expansion.md` — §10 “Scaling Dimensions”: “More situations and relationships,” “More employees,” “More interactions and situations,” “More business systems,” “More communication channels,” “More business processes,” “More locations,” “More integrations,” and “More knowledge.”
- `knowledge_base/architecture/section_6_responsibility_model.md` — §6.2 (core responsibility sentence); §6.3.1–6.3.4 (situation graph, identity anchor, derived journey, split/link/do-not-merge); §6.4 Groups A–U, especially A/B (separate situations and list fan-out), H/J/K (coordination and actors), N/O (memory and views), P/Q (capabilities/configuration), and S/T/U (harness, authorization, security); §6.6 U1–U5 scenario validation; §6.5 boundary to external systems/actors.
- `knowledge_base/architecture/section_7_boundary_model.md` — §7.12.1–7.12.3 (B-Story, B-Membrane, B-Memory); §7.12.4 (provisional B-Visibility); §7.12.5–7.12.7 (Adjacent-Tool, Adjacent-Improvement, and explicit B-Story merge decision); §7.13.2–7.13.4 (edge catalog, authority flow, what is outside Tend); §7.14.3–7.14.4 (open items and revisit triggers).
- `knowledge_base/architecture/section_8_interaction_model.md` — §8.2–8.3 (invariants and per-wake behavior); §8.5–8.9 (routing, contracts, truth ownership/atomic commits); §8.10–8.14 (egress, human work, tools, races, memory/config); §8.16.1–8.16.5 (U1, U2, U5, U3, U4); §8.17 (rejected anti-patterns).
- `knowledge_base/architecture/what_is_already_settled.md` — “What learning may change,” “When someone outside hears from Tend,” “Permission,” “What a sentence can do,” “A carrier that is down, and a business that cannot ship,” “Leave these closed,” and “Leave these open.”
- `knowledge_base/architecture/construction_record.md` — §7 (U1–U4 construction units) and §8 (provisional runtime mapping caveat).

### Level 2 growth, journey, memory, coordination, and security

- `knowledge_base/Level 2/growth_and_evolution/how_do_we_support_businesses_that_operate_differently_from_one_another.md` — “The way businesses differ,” “What they all share,” “What cannot differ,” “The boundary,” “Working decision.”
- `knowledge_base/Level 2/growth_and_evolution/how_do_new_workflows_become_part_of_tend.md` — “What a workflow is,” “How a workflow joins,” version-change walkthrough, “Working decision.”
- `knowledge_base/Level 2/growth_and_evolution/how_do_new_business_policies_become_part_of_tend.md` — grant/policy/workflow distinction, “Conflict and expiry,” “Working decision.”
- `knowledge_base/Level 2/growth_and_evolution/how_do_new_business_systems_become_part_of_tend.md` — capability lifecycle, systems/agent walkthroughs, “Boundary,” “Working decision.”
- `knowledge_base/Level 2/growth_and_evolution/how_do_businesses_customise_tend_without_changing_its_core_behaviour.md` — “The core/config boundary test,” “The invitation and the gap,” “Working decision.”
- `knowledge_base/Level 2/growth_and_evolution/how_do_we_evolve_tend_without_breaking_existing_businesses.md` — “The rule context,” three change-plane walkthroughs, capability retirement/replacement, evaluation criteria, “Working decision.”
- `knowledge_base/Level 2/growth_and_evolution/how_do_new_communication_channels_become_part_of_tend.md` — channel capability lifecycle, live external rules, fallback/visible-gap behavior.
- `knowledge_base/Level 2/journey_and_lifecycle/how_should_one_customer_have_several_open_situations_at_the_same_time.md` — short answer, situation independence, derived person-view, “Why it matters.”
- `knowledge_base/Level 2/journey_and_lifecycle/how_is_the_person_level_journey_derived_from_the_situation_graph.md` — “The short answer,” “The derivation,” and “Why a projection and not a record.”
- `knowledge_base/Level 2/memory_and_knowledge/how_should_memory_be_scoped_between_businesses.md` — “The default boundary,” “What can transfer,” “Scope can be narrower than a business,” “Working decision.”
- `knowledge_base/Level 2/memory_and_knowledge/how_should_memory_be_stored_conceptually.md` — structured core, experience versus derived memory, storage options and “Working decision.”
- `knowledge_base/Level 2/memory_and_knowledge/how_should_memory_be_retrieved.md` — structured context need, hard scope filters, candidate/conflict resolution, “Working decision.”
- `knowledge_base/Level 2/memory_and_knowledge/how_do_we_update_knowledge_when_reality_changes.md` and `how_should_new_learning_be_reconciled_and_versioned.md` — forward-preserving updates, structured claim identity, finite update operations, evidence/currentness/scope separation.
- `knowledge_base/Level 2/coordination/how_do_independent_actors_work_together.md` — shared situation record, waits, actor independence, traceability, visible agency.
- `knowledge_base/Level 2/coordination/how_do_multiple_business_processes_interact.md` — processes interact through the situation, no separate process coordinator, boundary with Journey/Lifecycle, versioned updates.
- `knowledge_base/Level 2/coordination/how_do_we_prevent_duplicated_work.md` and `how_do_we_coordinate_long_running_work.md` — duplication ownership, wait registry, independent waits; see also `how_do_we_represent_work_that_is_waiting.md` for wait semantics.
- `knowledge_base/Level 2/compliance_and_security/how_do_we_make_a_software_product_secure.md` — “The control plane,” “Where does the tenant come from?,” “Three new product invariants,” deterministic controls, and Suite T-A/T-B isolation tests.
- `knowledge_base/Level 2/compliance_and_security/understanding_all_compliance_and_security_questions.md` — “The spine,” “What this category does not decide,” and “Remaining open.”
