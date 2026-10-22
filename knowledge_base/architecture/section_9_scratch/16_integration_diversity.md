# Section 9 scratch — Dimension 16: Integration Diversity

**Status:** Working Section 9 scratch; not a canonical architecture change. This note derives constraints from the current Level 1, Level 2, and Sections 6–8 evidence. It does not select a deployment topology or prescribe an integration framework.

## 1. Construction question

How can Tend coordinate work across systems, channels, people, and external agents whose source authority, latency, availability, schemas, capabilities, permissions, lifecycles, and failure behavior differ—while keeping situation behavior understandable and safe?

The question is not whether integrations share one implementation. It is which logical responsibilities and contracts must remain stable when provider-specific behavior differs or changes.

## 2. Force

Tend exists because business information and work are distributed. A business system may own a record, a carrier may own its tracking record, a payment provider may own settlement status, a customer may own a report of their experience, and a communication platform may constrain what can be sent. No one source owns the whole situation. Those sources also differ in freshness, timing, access rules, response shape, available operations, and the certainty of an action's outcome.

Integration count therefore does not imply interchangeable sources. Treating providers as equivalent risks selecting the wrong authority, over-reading stale or partial data, crossing a permission boundary, duplicating an irreversible effect, or hiding the difference between “not connected,” “not built,” “temporarily unavailable,” and “unknown outcome.” Treating every provider as a bespoke path inside situation reasoning creates the opposite risk: provider changes leak into business behavior and safety checks become inconsistent.

The architectural force is to preserve a stable, situation-facing meaning for an ask or action while retaining each source's authority, provenance, currentness, limits, permission, and failure semantics. A shared logical contract is useful; one shared provider behavior is not assumed.

## 3. Evidence-derived model

### 3.1 Source authority is claim- and domain-specific

- A source map associates a kind of ask with systems, people, capabilities, or other useful sources. Retrieval order depends on authority, currentness, consequence, cost, and what unblocks the next safe decision—not a universal source ranking.
- Ownership, source, claim, truth, and permission to disclose are distinct. An integration returning a claim does not make it globally authoritative, current, or safe to disclose.
- Comparable claims preserve subject and identifier, claim type, value/state, source actor or system, source record, observation time, revision/event when available, process stage, scope, situation reference, and a pointer to the original payload or message. Normalisation makes claims comparable; it does not erase their source semantics or make them true.
- Deterministic identifiers, field mappings, domain rules, and comparison classifications are the normal comparison path. An unresolved comparison stays unresolved or goes to a person; it is not decided by which API answered last.

### 3.2 Stable logical contract, provider-specific meaning

The product-shaped integration unit is a purposeful capability—such as “look up delivery status” or “post a payment update”—not every raw provider operation. The situation asks for a claim or proposes an action through that capability; the capability contract says what it can answer or do, what it may access, its time bound, cost/limits, reversibility, and timeout/failure behavior. The interaction returns structured evidence or a structured action outcome, with provenance sufficient for the situation to decide what follows.

The stable part should be the logical ask/action and evidence/outcome semantics, including subject, scope, source, observation or execution time, and known/unknown state. A provider's field names, event sequence, pagination, rate limits, and response peculiarities remain specific to its capability contract. Preserve a reference to provider evidence when mapping it into a canonical claim; do not force every provider payload into a lossy universal schema.

Section 8's structured tool-result contract and the Trust & Evidence canonical-claim fields support this direction. The exact schema/versioning and compatibility policy for capability contracts are not yet settled.

### 3.3 Latency and availability are per capability and per decision

- Each capability has a bound and failure behavior; a call that cannot safely finish within that bound should not block unrelated work indefinitely.
- Currentness is decision-relative, not a universal time-to-live. A recent carrier scan may support a qualified location update but not a delivery promise, compensation, or closure.
- Partial availability permits progress only on claims and steps that do not depend on the unavailable source. A weaker or stale substitute is explicitly marked degraded; an irreversible action does not run on degraded or unconfirmed evidence.
- A wait keeps the expected claim/source, reason, bound, resume trigger, and escalation visible. After the bound is crossed without resolution, the path is declared unusable and work follows its configured fallback or human path.
- “No source/capability exists,” “source exists but is down,” “source replied with stale or insufficient evidence,” and “write may have succeeded but is unconfirmed” are separate states with separate next actions.

This allows one situation to wait on a slow source while another safe ask is completed, without implying that all integrations are synchronous or that all failures can be retried.

### 3.4 Capability authority and data permission are separate gates

- Capability existence or business enablement does not itself authorize a call. Effective permission is evaluated at action time from the current grant, the external system's own permission, and invariants. A revoked grant must not be used by an in-flight situation.
- Authorization and structural validation happen before provider invocation. Cross-tenant and untrusted connected-system content must be denied before it can cause an external effect; audit evidence must remain secret-free.
- Permission to retrieve or use a claim is distinct from permission to disclose it to a customer, employee, investor, or partner. Channel consent/window and actor visibility remain separate checks on egress.
- Capability outputs—including outputs from an external agent—are evidence/data, not Tend instructions, authority, or business policy.

### 3.5 Capability lifecycle is governed, not discovered at runtime

The Level 2 join lifecycle is: request → evaluate → author → contract → validate → test → enable → monitor → retire. Product authors define a purposeful capability and its limits; simulation tests normal and unusual cases; the business explicitly enables an eligible capability and sets its grant scope. Runtime model output cannot register arbitrary tools or widen grants.

Change timing depends on the thing that changed:

- Facts/evidence are live and should be re-read for the decision.
- Platform/external rules and connector availability are live and interrupt; the situation wakes, re-checks, and uses a permitted fallback.
- Grants are live and must be valid at the point of use.
- Business policies/workflows are pinned in the situation's rule context at open and change only through noticed, deliberate migration.

Retired versions drain while in-flight situations resolve or until deliberate cutover. Provider deprecation is not a reason to pretend the old capability still works: it produces a live failure/fallback and visible gap. Exact retirement, rollout, and rollback mechanics remain implementation/product-operations concerns.

### 3.6 Communication channels are related but not identical integrations

Channels transport messages and have their own rule records: initiation/reply permission, windows, message categories/templates, consent, and cost. Core situation reasoning remains channel-agnostic; channel rules are checked where messages are carried. A window is a wait on the shared time/coordination spine, and a missing channel adapter is a visible gap with a permitted fallback—not proof that the business situation or capability is absent.

This channel-specific placement does not establish one integration-wide adapter layer or require all business systems to use the same mechanism. Concrete provider/transport mechanics remain a Level 3 choice.

## 4. Dimension record

- **ID:** D16.
- **Dimension:** Integration diversity—authority, time, availability, schemas, operation surface, permission, lifecycle, and failure differ across connected sources and channels.
- **Architectural force:** Tend needs dependable logical asks/actions across heterogeneous sources without conflating their records, rules, permissions, or outcomes.
- **Consequence:** Keep situation decisions and evidence contracts stable at the logical level; keep provider-specific semantics, evidence references, bounds, and operational behavior explicit at the capability boundary. Reuse existing responsibility and interaction contracts; do not infer a new Level 2 boundary or deployment shape from integration count.

## 5. Affected responsibilities

- **A/B — situation and routing:** preserve one situation's operational truth and route events to the right situation; an integration's own record is not the Tend situation model.
- **D — Gathering:** D4 establishes the ask in domain context, maps it to sources, then retrieves in contextual priority order. D6 uses a business capability when it is the right source; D7 retains pointer and timestamp; D8 distinguishes no usable system/person from a source that exists but is unusable.
- **E — Trust and evidence:** E1–E6 preserve structured, claim-specific provenance and conflict; E7 marks degraded evidence; E8 blocks actions according to evidence state and consequence.
- **P/Q — capabilities and evolution:** P1 coordinates without owning external canonical data; P2 surfaces missing capability; P3 checks grant/rules. Q1 maintains typed configuration, Q2 governs the join lifecycle, Q3 applies the four change planes, and Q4 makes gaps visible.
- **L/I — channels and communication:** L1–L4 preserve channel rules, consent, initiation/reply rules, and narrow visibility; communication emits only through an authorized channel path.
- **M/H/J/K — resilience and human/partner work:** M2–M6 bound and declare failures, retry safely, and escalate; waits and partner tasks remain situation-specific and scoped.
- **S/T/U — execution and safety:** S2/S3 validate and dispatch; S7 persists intent before irreversible effects; S8 returns structured evidence; S9 prevents duplicate posts; T2–T6 authorize before each effect against current policy; U1/U2/U5 protect tenant isolation, untrusted inputs, and catalogue integrity.

## 6. Affected boundaries

- **B-Story:** owns situation truth, evidence interpretation, wait/fallback decisions, and the next behavior. It coordinates with external systems but does not become the master for their canonical domain records.
- **B-Membrane:** routes external messages and carries outbound communication after story intent and channel/permission checks. It does not own business-system truth or decide business meaning from a provider schema.
- **Adjacent-Tool:** the established per-capability invocation contract handles pre-effect authorization, bounded retry/poll, idempotency checks, and structured result return. It is adjacent to the Level 2 boundaries, not evidence for a separate integration service or one tool boundary per provider.
- **Configuration (Q / configurator capability):** owns typed catalogue/configuration and controlled grants. Memory or runtime reasoning may propose; deterministic configuration tools validate/apply. External provider and business-system boundaries remain outside Tend.
- **B-Memory / improvement:** may serve scoped context or receive traces under existing contracts; neither learns permission nor converts provider output into authoritative business truth.

## 7. Affected interactions

1. **Match:** map each ask to an eligible source, person, or capability using domain and authority; establish whether the source exists and can serve the ask before retrieval. Exact pre-match procedure is provisional.
2. **Gather/invoke:** validate schema and scope, check current grant/system permission before effect, invoke within that capability's bound, and retain source/evidence references.
3. **Interpret:** compare the result as a claim at the relevant subject, time, stage, and scope. Preserve incomplete, stale, conflicting, or unmapped results as such; do not turn parse success into truth.
4. **Wait/fallback:** if the result is pending or the source is unavailable, continue independent safe work, or record a bounded wait and configured fallback. A human source is human work, not connector failure or absent capability.
5. **Commit/communicate:** B-Story commits operational truth; an unknown irreversible outcome blocks a new initiation. A message is a separate authorized effect, with current channel rules, consent, and audience scope rechecked.
6. **Change:** capability/provider or platform changes are observed and tested under their proper change plane; active situations are woken, drained, or deliberately migrated as appropriate, never silently pointed at a different source with a different meaning.

## 8. Scenario stress tests: U1–U5

### U1 — Business-directed outreach

An owner-supplied list fans out into individual situations. Profile/contact sources may differ in ownership, completeness, freshness, and schema. A capability result must remain a sourced claim for its person; a missing email is not permission to guess or merge recipients. Outreach still requires a valid channel, consent, audience scope, and grant. If a reply arrives before a nurture timer, the situation re-reads its latest version and suppresses stale intent; provider or timer completion cannot independently send. Integration diversity therefore must not collapse the list into a campaign-wide record or let an adapter bypass story and egress gates.

### U2 — Inquiry → order → delay → refund

The linked commercial journey uses distinct systems for order, carrier, payment/refund, and communication. Each remains authoritative only for its relevant record/stage. A refund initiation that times out after possible posting is an unknown outcome, not a definite failure: same-key resend may be allowed only under the provider's idempotency contract; a new initiation is blocked until outcome is known or a person decides. “Initiated” and “settled” are process stages, not necessarily conflicting schemas or claims. No integration result can write the refund situation's operational truth outside B-Story.

### U3 — Investor asks for deck and revenue

The deck and revenue asks may resolve through different sources, permission scopes, and latency. Tend can complete and disclose an approved deck while finance's revenue evidence remains unavailable or assigned to a human. Partial completion must remain explicit; the investor's entitlement does not inherit internal-source access. The file-fetch approval check stays inside the tool, before the bytes/handle return. One slow or denied source must not block a safe, separately authorized ask or be disguised by a shared integration result.

### U4 — Registered carrier, stale or unavailable tracking

The tracking capability exists, but the API may be down, stale, slow, or return an unmapped/incomplete update. Preserve the carrier claim and timestamp; apply decision-relative currentness; use bounded retry/poll and then a situation wait, configured escalation, or human/partner work. Continue safe independent work and communicate only the latest honest state through an allowed channel. Do not call this “no capability,” invent a location, or retry a side effect without its contract.

### U5 — Two distinct source meanings; do not conflate

The architecture reuses **U5** for two different tests:

- **U5-security (Section 6 T-A/T-B):** cross-tenant arguments are denied before provider invocation; poisoned connected-system text is untrusted data, not instructions; audit is secret-free. No provider call may be used to “check” a denied request.
- **U5-capability-absent (Section 8 package-status walkthrough):** no tracking source and no person can answer. Record the registry/people check and evidence-backed absence, then answer honestly. If a person can answer, create human work; if a registered source exists but is stale/down, use U4/failure semantics.

The number collision is a traceability defect, not a reason to choose one scenario silently. Use descriptive labels in this note pending parent correction.

## 9. Invariants

- A provider record or returned claim is authoritative only for its configured domain/claim/stage; authority does not guarantee freshness, completeness, identity match, or truth about the whole situation.
- A canonical claim preserves provenance, relevant time/revision/scope, and a route to original evidence. Unknown or incompatible fields remain unknown/unresolved rather than guessed.
- Ask-to-source matching precedes retrieval; irrelevant or unauthorized information is not fetched merely because an integration can return it.
- A capability is a reviewed, versioned, purposeful operation; no runtime model-driven registration, schema widening, or grant creation.
- Authorization is checked before every effect using current grants and system permission. Retrieval permission, business action authority, and audience/channel disclosure are distinct.
- Per-capability bounds and failure behavior are explicit. No endless retry; no new irreversible action on unknown outcome; no irreversible action on degraded/unconfirmed evidence.
- Capability absence, human-answerable need, stale source, hard unavailability, denial, schema mismatch, and unknown side-effect outcome remain distinguishable.
- External facts and platform rules are live; business policies/workflows remain pinned per situation until noticed, deliberate migration. A revoked grant is live and cannot be pinned.
- Existing story, membrane, tool, configuration, and authorization contracts continue to own their responsibilities. Integration variety alone creates no new architectural boundary.

## 10. Failure and uncertainty distinctions

- **Not built/not enabled:** visible capability gap; product/business choice, not a runtime outage.
- **No source and no human can serve the ask:** capability-absent; honest limitation outside Failure triage.
- **Source exists but request is denied:** permission outcome; no provider invocation, with safe escalation/configuration path as appropriate.
- **Source exists but is unavailable:** bounded retry/poll, circuit protection where applicable, then wait/fallback/escalation. Do not imply capability absence.
- **Source responds but stale, incomplete, unmapped, or conflicting:** preserve claim and evidence state; determine whether the next action can safely proceed, wait, or needs a person.
- **External write definitely failed:** bounded retry may be considered under its contract.
- **External write may have succeeded, no confirmation:** unknown outcome; check idempotency/status contract, wait within bound, then hand off for irreversible action. Do not start a new operation on guesswork.
- **Platform rule or connector deprecation changed:** live external change; re-evaluate, wake/fallback, and surface a visible gap. Do not treat old channel or provider rules as pinned business policy.

## 11. Tensions and parent corrections

1. **U5 identifier collision — correction required.** `section_6_responsibility_model.md` §6.6 U5 is T-A/T-B security; `section_8_interaction_model.md` §8.16.3 is package-status capability absence. `section_8_interaction_model.md` status/§8.2 also describes U5 security mapping, while the walkthrough number is reused. Parent scenario index should assign distinct stable IDs or explicitly label U5-security and U5-capability-absent. Existing scratch notes that call only one case “U5” should be qualified.
2. **D8 versus gather-match status — clarify, not collapse.** Section 6 D8 states deterministic ask→source match as a responsibility; Section 8 §8.12.3 marks the pre-invoke match procedure provisional. Preserve D8's conceptual safety obligation while marking exact lookup, ordering, and execution protocol provisional.
3. **Enablement versus “no tenant reconfiguration” — wording correction.** Growth's evolution criteria say new capabilities need no tenant reconfiguration, while the join lifecycle explicitly requires a business to enable a capability and choose grant scope. Clarify the former as “no forced reconfiguration of existing tenants or core change”; do not remove explicit tenant opt-in/authorization.
4. **“Canonical data/facts” wording — qualify.** Section 7's external-system edge table calls business systems canonical facts/data. Read this as canonical records within their owned domain, not as a universal truth verdict. Section 6 P1, Trust & Evidence, and Gathering require claim-level authority, currentness, provenance, and conflict evaluation.
5. **Adapter-layer wording — constrain its scope.** The channel rule record is placed in a communication-manager adapter layer, while concrete transport/provider mechanics are Level 3. That does not establish an integration-wide adapter boundary or a one-size-fits-all integration layer. Preserve the logical contracts without committing to deployment topology.

Other tensions remain real design choices: normalization improves comparability but risks losing provider semantics; fallback increases continuity but can weaken authority; fresh reads reduce staleness but add latency/cost and may observe mid-analysis changes; broad capability scope reduces setup effort but increases permission blast radius; strict pinning aids repeatability but is unsafe for live platform rules and revoked grants.

## 12. Alternatives and trade-offs

- **Chosen working direction — stable logical capability contract with explicit source-specific mapping.** Keeps business reasoning stable and source authority/provenance explicit; costs product effort to author, validate, monitor, and maintain each capability's mapping and limits. It does not imply one implementation pattern for every provider.
- **Expose raw provider APIs directly to situation reasoning.** May reduce initial mapping work, but leaks provider schemas and failure rules into business behavior, broadens model/tool surface, and makes authorization, evidence, and upgrades inconsistent. Not supported as the default by the established tool/catalogue contracts.
- **Normalize every provider into one universal schema or integration layer.** Could make common fields convenient and centralize some controls, but may erase domain distinctions, create a false hierarchy, hide source-specific lifecycle/permissions, and concentrate latency or outage impact. No such universal schema, service, or boundary is established; do not select it from this dimension alone.
- **A separate service/adapter per provider.** Could isolate a provider's change surface, but adds deployment, coordination, and failure boundaries. It is a possible Level 3 implementation choice, not a Section 9 consequence or prescription.
- **Automatically expose/register a provider's entire API.** Rejected as a safe default: it bypasses product-authored purpose, test, capability catalogue integrity, scoped grants, and reviewed failure behavior.

## 13. Architectural consequence

Integration diversity stresses existing boundaries rather than justifying another box. Tend should make a situation-facing ask/action stable enough that B-Story can reason over it; retain source-specific claim and failure semantics in the capability contract; and use Adjacent-Tool, B-Membrane, Configuration, and T/S controls for the responsibilities they already own. A result is evidence for B-Story, not a truth or state write. A channel remains a constrained transport, not a business workflow selector.

At the logical boundary, contract compatibility means Tend can identify the ask/action, subject and scope, source, relevant time/revision, structured result or outcome, and uncertainty/failure class. It does **not** mean every provider shares one wire schema, authority ranking, latency budget, permission model, lifecycle, or deployment component.

## 14. Established, provisional, and open

### Established by current evidence

- Systems and external agents join as purposeful catalogue capabilities through request → evaluate → author → contract → validate → test → enable → monitor → retire; provider/API mechanics are Level 3.
- Capability results are structured evidence with provenance; Tend coordinates but does not own the provider's canonical record.
- Authority is claim-specific; currentness, conflict, permission, and disclosure are separately evaluated.
- Capability invoke is gated before effect; bounded retries/polls, idempotency, structured results, and unknown-outcome handling are existing contracts.
- Missing capability, unavailable source, stale evidence, and unconfirmed irreversible effect have different safe paths.
- External facts/platform rules and grants are live in their respective ways; business policy/workflow versions are pinned with deliberate migration.
- Channel rules are per-channel, channel windows are waits, and a permitted fallback/visible gap exists.

### Provisional in architecture artifacts

- Exact gather pre-match execution procedure and source ordering; D8's conceptual match obligation remains.
- Common logical capability request/result contract beyond the structured-evidence obligation and canonical-claim fields.
- How adapter/channel rule records map to concrete transport/provider implementations; Level 3 owns mechanics.
- Runtime details for human fallback, retry values, circuit-breaker thresholds, and per-source availability monitoring.

### Open; do not fill by assumption

- Contract schema/versioning, compatibility tests, deprecation notices, and migration/drain protocol for active calls and situations.
- Provider-specific freshness criteria, timeout/latency bounds, rate-limit behavior, cost ceilings, and which fallbacks a business permits.
- Exact treatment of partial, malformed, duplicated, reordered, or late provider events and schema drift.
- How current grant, external-system permission, tenant identity, and source scope are bound through every provider call; the conceptual gates are settled, some exact identity/schema details remain open.
- Whether any particular integration merits a dedicated component, shared runtime, adapter, or other deployment topology; evidence here does not decide it.

## 15. Signals and revisit conditions

Watch for:

- schema drift, unmapped fields, identifier ambiguity, repeated unresolved comparisons, or loss of a source-payload reference;
- latency/bound breaches, stale results, retry storms, correlated provider outages, late or duplicate events, or a growing unknown-outcome queue;
- capability results being mistaken for authority, permissions, business instructions, or completed external effects;
- denials after provider invocation, stale grants used after revocation, excess data retrieval/disclosure, cross-tenant traces, or secrets appearing in audit;
- repeated manual work caused by a visible capability gap, unexpectedly different behavior between tenants, or a capability change requiring forced reconfiguration;
- retired/deprecated capabilities still referenced by active situations, or platform rule changes that fail to wake/re-evaluate work.

Revisit this dimension if an observed case cannot be represented by the current ask/source/capability result and failure classes; if a provider schema/lifecycle change repeatedly breaks active situations; if permission or provenance cannot be enforced at the existing call boundary; if partial availability creates unsafe cross-capability coupling; or if evidence shows that a new ownership boundary is needed for correctness. A higher integration count, by itself, is not a revisit trigger for new services or boundaries.

## 16. Exact evidence paths

- `knowledge_base/Product_Vision.md` — §§1, 4–6, 7; agency layer, distributed systems, principles (“Never guess,” facts before opinions, fail safely), and market-specific channels/integrations.
- `knowledge_base/Level1_Problem_Framing_or_Expansion.md` — §2 assumptions (distributed information, no single complete source, existing software, channel rules); §§4–6 actors/responsibilities/interactions; §10 scaling dimensions.
- `knowledge_base/architecture/section_6_responsibility_model.md` — §§6.4 D (Gathering), E (Trust & Evidence), L (Channels & Permissions), M (Failure), P (Capabilities), Q (Configuration & Evolution), S/T/U (harness/authorization/security); §6.5 (outside Tend); §6.6 U1–U5.
- `knowledge_base/architecture/section_7_boundary_model.md` — §§7.12.5–7.12.8 (Adjacent-Tool, non-boundary status, interaction contracts); §§7.13.2–7.13.4 (external-system edges and authority flow); §7.14 (Section 8 handoff).
- `knowledge_base/architecture/section_8_interaction_model.md` — §§8.2–8.4 and 8.7 (invariants, wake/gates, authorization); §8.12 (capability invoke, provisional gather match, fetch-time approval); §8.13 (timer/unknown outcome); §§8.16.1–8.16.5 (U1–U5-related scenarios); §8.17 (anti-patterns).
- `knowledge_base/architecture/what_is_already_settled.md` — “A carrier that is down, and a business that cannot ship”; “Leave these closed”; “Leave these open.”
- `knowledge_base/Level 2/growth_and_evolution/how_do_new_business_systems_become_part_of_tend.md` — purposeful capability, capability contract, product-authored validation, enablement, system/source/authority join, lifecycle, and external-agent claims.
- `knowledge_base/Level 2/growth_and_evolution/how_do_new_communication_channels_become_part_of_tend.md` — channel capability, shared join lifecycle, live platform rules, fallback, and Level 3 mechanics.
- `knowledge_base/Level 2/growth_and_evolution/how_do_we_evolve_tend_without_breaking_existing_businesses.md` — four change planes, rule context, capability rollout, retirement/drain, and provider deprecation.
- `knowledge_base/Level 2/growth_and_evolution/understanding_all_growth_and_evolution_questions.md` and `knowledge_base/Level 2/growth_and_evolution/how_do_businesses_customise_tend_without_changing_its_core_behaviour.md` — lifecycle and core/config boundary.
- `knowledge_base/Level 2/gathering_information/how_do_we_discover_where_information_lives.md` — source map, source locations, unavailable source path, and structured claims.
- `knowledge_base/Level 2/gathering_information/how_do_we_determine_what_information_is_required_before_making_a_decision.md`; `knowledge_base/Level 2/gathering_information/how_do_we_prioritise_which_information_to_retrieve_first.md`; `knowledge_base/Level 2/gathering_information/how_do_we_know_when_information_is_sufficiently_current.md`; `knowledge_base/Level 2/gathering_information/how_do_we_know_which_actor_owns_each_piece_of_information.md`; `knowledge_base/Level 2/gathering_information/how_do_we_handle_information_that_changes_while_a_situation_is_being_analysed.md` — retrieval need/order, currentness, ownership, and changing information.
- `knowledge_base/Level 2/trust_and_evidence/what_makes_one_source_more_authoritative_than_another.md`; `knowledge_base/Level 2/trust_and_evidence/how_do_we_compare_information_from_different_sources.md`; `knowledge_base/Level 2/trust_and_evidence/how_do_we_determine_whether_information_should_be_trusted.md`; `knowledge_base/Level 2/trust_and_evidence/how_do_we_identify_conflicting_information.md` — claim-specific authority, canonical claims, comparison, trust, and conflict.
- `knowledge_base/Level 2/failure/how_do_we_continue_working_when_only_part_of_the_system_is_unavailable.md`; `knowledge_base/Level 2/failure/how_do_we_recognise_failure.md`; `knowledge_base/Level 2/failure/how_do_we_distinguish_failure_from_uncertainty.md`; `knowledge_base/Level 2/failure/how_do_we_recover_after_failures.md`; `knowledge_base/Level 2/failure/how_do_we_avoid_repeating_the_same_failed_action_forever.md`; `knowledge_base/Level 2/failure/how_do_we_keep_the_business_safe_while_recovering.md` — partial availability, bounds, retries, idempotency, circuit breaker, safe recovery.
- `knowledge_base/Level 2/channels_and_permissions/how_should_tend_represent_what_each_communication_channel_allows_a_business_to_send.md`; `knowledge_base/Level 2/channels_and_permissions/how_should_tend_choose_between_replying_in_the_current_channel_and_starting_a_message_in_another_channel.md`; `knowledge_base/Level 2/channels_and_permissions/how_should_tend_record_consent_and_the_customers_preferred_channel.md`; `knowledge_base/Level 2/channels_and_permissions/how_should_tend_decide_what_information_each_employee_customer_or_external_partner_may_see.md` — per-channel contract, routing, consent, and audience permissions.
- `knowledge_base/Level 2/authority_and_ownership/the_business_configuration_capability.md`; `knowledge_base/Level 2/authority_and_ownership/when_is_tend_allowed_to_perform_an_action.md`; `knowledge_base/Level 2/authority_and_ownership/how_does_a_grant_end_and_how_does_role_change_affect_authority.md` — deterministic configuration, authorization at action time, and grant lifecycle.
