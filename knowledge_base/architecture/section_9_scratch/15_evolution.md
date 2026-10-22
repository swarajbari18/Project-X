# Section 9 scratch — Dimension 15: Evolution

**Status:** Provisional synthesis; working analysis only, not a canonical architecture change.

**Scope:** How Tend, a business's bounded configuration, its active rules, connected capabilities, and learned knowledge evolve without changing who owns truth or authority, silently changing an in-flight promise, or breaking businesses that have not opted into a change. This dimension reuses the change classification in D2 — Change Over Time — and does not replace its temporal/change-event questions.

**Non-goal:** No universal plugin/component boundary, runtime topology, storage design, rollout mechanism, or technology is inferred. The catalogue and join lifecycle are Level 2 concepts; their implementation remains later work.

## 1. Construction question

How can Tend accommodate business variation and product improvement while keeping its common responsibilities stable, each business's choices bounded and attributable, each in-flight situation explainable under the rules it actually used, and every consequential effect subject to current authority and external constraints?

Evolution is not one mutable “configuration” plane. It includes at least four different owners and lifecycles: product-authored core/capability contracts; business-authored values, assignments, policies and workflows; live grants and external constraints; and advisory business learning separated from product-behaviour improvement.

## 2. Force

- Businesses differ and grow: team and approval structure, systems, channels, local policies, workflows, locations, languages and compliance needs vary. The product promise is one core with bounded differences, not a per-business fork.
- Business policies and workflows change while situations are active. A refund threshold, approval path, escalation ladder, or procedure may be changed while work still depends on an earlier version.
- The external world changes independently: facts, channel terms, consent, laws, provider availability and connected-system behavior cannot be made current by pinning an old situation context.
- Authority changes: grants are created, narrowed, revoked, expired, or affected by a person's role or availability. An old policy version must not preserve a revoked ability to act.
- Product capabilities and communication channels are requested, authored, enabled, changed, monitored and retired. A newly available capability must not silently become enabled business behavior.
- Experience accumulates. Useful business-specific vocabulary and procedural lessons can improve future work, while product behaviour can improve from traces; neither learning path may silently rewrite formal business rules or leak business-specific content into general product behaviour.
- Existing businesses need change containment: additive capability, policy, workflow or product improvements should not force unrelated reconfiguration; changes that do affect active work need an explicit, traceable path.

## 3. Dimension record

### Affected responsibilities

- **A/B — Situation representation and event routing:** retain situation identity and history, record the policy/workflow rule context, route relevant changes to affected work, and wake/re-evaluate rather than silently replacing operational truth.
- **D/E — Gathering and trust:** use current facts and source status; preserve provenance, currentness, conflicts and prior claims. A stale response, failed provider, absent capability and changed business rule are distinct conditions.
- **F/G and T/U — Decisions, authority, security and compliance:** select behaviour under the situation's applicable policy context, but enforce the currently valid grant, identity, resource permission, legal/platform constraints, tenant boundary and kill-switch state before every effect.
- **H/I/J/L — Waits, communication, people and channels:** surface notices and migration decisions through the wait/work model; re-check the current channel contract and consent before egress; route newly blocked work to an accountable person without hiding inaction.
- **N — Memory and knowledge:** keep business content scoped, versioned, traceable and advisory; treat setup observations as candidates, not writes to authoritative configuration.
- **P/Q — Capabilities and configuration:** maintain bounded, typed configuration; surface unsupported requests as visible gaps; join purpose-specific capabilities through the product-owned lifecycle and business enablement.
- **O/R — Views and product improvement:** let business-facing views expose current work, change and owner decisions; keep product-behaviour improvement separate from business memory and business authority.

### Affected boundaries and relationships

- **B-Story** owns the situation's operational truth, rule-context references, waits and committed next behaviour. It does not own external canonical facts or grants.
- **B-Membrane** carries permitted communications. It consumes committed situation intent and applies current authorization, visibility, consent and channel checks; it is not where business rules or situation truth are authored.
- **B-Memory** serves scoped context and maintains business knowledge; it may propose configuration candidates but does not apply authoritative registry values, write grants, or own product-behaviour improvement.
- **B-Visibility** is a read-only, provisional projection for business/builder views; it does not decide migration or authorize effects.
- **Adjacent-Tool** has an established invocation contract; **Adjacent-Config** is explicitly only a proposed adjacent relationship; **Adjacent-Improvement** is an established contract, not a B-* boundary. These labels do not imply a universal component or plugin design.

### Affected interactions

- A typed configuration candidate is validated and applied through the deterministic configurator path (Q1 / IB-13), not by a runtime model or memory activation.
- A committed situation change is announced/versioned; timers and relevant events wake B-Story, which re-reads the current situation before continuing (IB-1, IB-3, IB-4, HC-1).
- Tool invocation and outbound send are gated at their effect boundaries; idempotency and authorization are separate controls (IB-5, IB-7, IB-8, AC-2/AC-4).
- Worker/configurator experience is observed asynchronously by Memory (IB-12); eligible product-improvement traces have a separate path (IB-14). Neither path blocks a situation commit.
- Growth requires a noticed policy/workflow change and an owner decision to keep or deliberately migrate affected in-flight work. Section 8 currently describes `config_applied` as an optional wake; the exact connection to notice discovery remains an open interaction mapping, not a reason to invent a new subsystem.

### Relevant invariants

- Tend never guesses; each decision uses the information available then, while current decisions use the latest known **facts**. Historical claims and decisions remain traceable rather than being overwritten.
- Business policy/workflow context is not equivalent to current truth or authority. Record which versions governed a decision; change that context only through deliberate, attributed migration.
- Current grants are checked at use. Revocation, role change, loss of availability or a narrower permission must stop the next unauthorized effect even if the situation retains an older policy/workflow version.
- External/platform/legal constraints are not frozen with a business workflow. A change can interrupt a wait or invalidate a pending action; channel consent and permissions remain independently enforced.
- The model proposes; deterministic validation and controls decide. Model output is data, not instructions. Configuration cannot cross product invariants or tenant/security boundaries.
- The business owns its goals, policies, information and accountability. Tend works only inside delegated authority; memory and product learning cannot grant authority or redefine policy.
- Unsupported configuration/capability remains visible. No source is not the same as a failed source, and a communication fallback is not a substitute for missing domain evidence.
- An outbound message follows a committed situation change and current checks; a draft, tool trace or stale pending send does not itself justify sending.

## 4. Scenario stress tests: U1–U5

### U1 — Business-directed outreach

The owner's list and instruction create one situation per person; they are task-specific intent, not automatically a standing campaign rule. A changed nurture workflow may affect new situations immediately, but existing ones need their recorded rule context and a deliberate migration/notice path. A reply before a nurture timer supersedes the wait; the stale timer must not resurrect an old follow-up. Current grant, recipient/consent and channel checks still govern any later send. **Pressure:** separate task input from durable configuration and keep per-person work independent.

### U2 — Commercial chain and refund with unknown gateway outcome

An in-flight refund may retain its original business-policy/workflow version, but a revoked auto-approval grant is live and blocks a later refund attempt. A timeout with unknown outcome remains an unknown outcome; policy migration or product evolution cannot turn it into permission to repeat an irreversible post. Preserve intent, idempotency and trace while new evidence updates current state. **Pressure:** backward compatibility never overrides live authority or safe side-effect handling.

### U3 — Investor diligence and partial fulfilment

A deck may be sent after its own fetch-time approval while the revenue ask remains open. A later policy, visibility or source change must be re-evaluated before a new outbound delta; it must not retract history or send an old draft. Product/config evolution does not make a pending answer true or expand who may see it. **Pressure:** evolve multi-ask work without collapsing partial completion, visibility and current egress authorization.

### U4 — Stale or unavailable carrier tracking

A registered carrier that is down or stale is not the U5 absent-capability case. Currentness is decision-relative; wait/re-check within the configured bound, then record failure and use the business's configured escalation path. A provider/API retirement is an external-live change: the path becomes unusable, the gap/fallback is visible, and replacement is a new capability with deliberate business enablement/migration. **Pressure:** do not hard-code one escalation topology or treat provider replacement as silent substitution.

### U5 — Package status with no shipping source

Ask whether a person can answer. If so, create scoped human work; if neither a system nor a person can answer, record capability-absent and communicate the limitation honestly. Payment capability does not substitute for tracking. A future tracking capability must be product-authored, validated, catalogued and business-enabled; its existence alone does not retrofit every active situation. **Pressure:** a gap is a product signal, not a failed connector, broad refusal, or authorization to guess.

## 5. Tensions and unresolved edges

- **Common core versus expressiveness:** typed schemas and pre-written workflows keep invariants testable, but cannot express every business process. Unsupported needs must stay visible as a product request, safe human work or refusal where an invariant would be crossed; they must not become free-form executable configuration.
- **Pinned promise versus live safety:** pinning business policy/workflow context supports consistent, explainable in-flight work; current grants, platform/legal constraints, facts and kill switches can still interrupt it. A pin is not an exception to current enforcement.
- **Workflow-level versus sub-procedure changes:** the workflow answer permits independently versioned sub-procedures to be deliberately live or pinned, while the overall change spine says workflows are pinned at situation open. The scope and recorded rule-context semantics for a live sub-procedure need explicit reconciliation; do not silently generalize either rule.
- **Expiry versus pinning:** policy expiry is said to wake a situation, but the resulting treatment of an already pinned policy context is not fully specified. Expiry must not be used as an undocumented migration or as a way to evade a live legal constraint.
- **Capability lifecycle versus runtime boundary:** all join types share a conceptual lifecycle, but contracts differ (system capability, channel rule record, policy structure, workflow procedure). This does not establish one universal plugin API or component boundary.
- **Fallback versus capability absence:** channel fallback can route a permitted message or human request; it cannot supply a missing business fact. The “fallback lane always exists” wording must not imply email is universally available, consented, or suitable.
- **Business learning versus product improvement:** both can consume traces, but have different scope, authority and output. Reuse of trace data does not authorize cross-business memory, automatic policy changes or customer-specific model weights.
- **Compatibility versus finite support:** retaining old versions while pinned work drains protects existing promises but creates support, testing and owner-notice burden. No indefinite version-retention commitment is established.

## 6. Architectural consequence

Evolution should be represented as governed changes to existing responsibilities, not a new “evolution engine.” Keep the core's situation, coordination, decision, communication, wait and trace responsibilities stable. Represent business variation as product-bounded, typed and validated values/assignments; represent policy/workflow versions in the situation's rule context; keep grants and external constraints current at each effect boundary; preserve historical decisions; and expose unsupported or changed conditions as visible work.

New capabilities and channels enter through the product-owned request → evaluate → author → contract → validate → test → enable → monitor → retire lifecycle. The business chooses whether and how to enable them within the legal/invariant bounds. Additive product evolution should leave businesses that have not enabled a new capability unaffected. Product rollout/rollback remains a product-operations concern outside this Level 2 record; do not encode it as tenant configuration or select a technology here.

## 7. Established, provisional, and open

### Established at the conceptual / working-decision level

- The core/config test: if a “knob” needs a core-logic change, it was misclassified. Configuration is typed, versioned, product-schema-bound and validated; it is not free-form code.
- Variation between businesses is expressed through bounded values, enabled capabilities, roles and assignments over the same core; invariants are not configurable.
- Capabilities are purposeful product-authored actions, not raw API surfaces or LLM-created integrations. The business enables and scopes them; absent capability is visible.
- The four change planes: facts live; platform/external constraints live and interrupt; grants are live; business policies/workflows are pinned at situation open with prospective notice and deliberate migration.
- A situation's policy/workflow rule context is traceable. A later policy version does not retroactively rewrite a completed decision; current authority remains independently enforced.
- Memory is scoped, versioned and advisory. Business-content learning cannot change policy, grants, legal/compliance constraints, ownership, approval, accountability or irreversible-action boundaries. Product-behaviour improvement is separate and must not bake business-specific content into weights.
- Multi-tenant isolation, deterministic authorization, model-output validation and the security release gates remain hard constraints on every evolution path.

### Provisional

- The conceptual join lifecycle and four-plane model are working decisions, not a fully specified runtime. Notice discovery, wake coverage and migration handling still need interaction-level reconciliation.
- B-Memory serve and its must-not rules are established; the learn path's promotion beyond those rules is provisional. Configurator/apply interaction is provisional; B-Visibility is provisional; Adjacent-Config is proposed, not a settled boundary.
- Workflow sub-procedure live/pinned behavior, exact expiry handling, and model/assembly-template version context for in-flight reproducibility need clarification.
- Compatibility evaluation signals below are candidate tests, not established numeric SLOs or a promise of indefinite old-version support.

### Open

- First catalogue contents, capability-specific contracts/defaults, concrete adapters and provider mechanics.
- Per-market legal bounds, consent values, policy schemas/scopes and compliance configuration.
- Migration-notice timing, aggregation, owner non-response/defaults, exact authorized decision-maker and business-view presentation.
- How `config_applied`, grant/role changes, live platform/compliance changes, capability retirement and policy/workflow notices map to existing wake/event contracts.
- Version lifetime, retirement/drain criteria, migration rollback/safety and product release/rollback operations at the appropriate later level.
- Exact memory promotion controls and retention/reversal process; product behavior/assembly context retained for reproducibility across upgrades.
- How policy expiry interacts with an already pinned in-flight situation, and which workflow sub-procedures may be explicitly live.

## 8. Alternatives and trade-offs

### Explicitly rejected by the working decisions

- **Free-form business-authored rules or custom code:** rejected because invariants, conflicts and legal bounds could not be deterministically validated before use.
- **Fork Tend per business or hard-code each market into core logic:** rejected against the same-core/configuration promise and global variation.
- **LLM-led auto-integration or runtime tool registration:** rejected; capability authoring and validation are product-team responsibilities, and the catalogue is controlled.
- **Always-live business policy/workflow rules:** rejected because one in-flight situation could change outcome mid-step with no stable explanation.
- **Pin all rules, including grants and external constraints:** rejected because revoked authority or changed channel/legal rules could remain effective when they must not.

### Trade-offs to retain

- Bounded configuration improves validation, tenant separation and testability, at the cost of slower support for novel business needs and ongoing catalogue/schema maintenance.
- Pinning policy/workflow context preserves the promise and trace of active work, at the cost of old-version support, owner notices and migration decisions.
- Live grants and platform/legal constraints protect people and businesses, at the cost of interrupting or pausing work that previously appeared ready.
- Product-authored capabilities constrain unsafe surface area, at the cost of a visible gap while a requested integration is evaluated and built.
- Learning can reduce repeated errors and improve local fit, at the cost of stale or misapplied lessons; scoped provenance, lifecycle, evaluation and separation from authority are required.
- Additive, opt-in product evolution contains tenant impact, at the cost of maintaining release and regression discipline; release mechanics themselves remain open to later design.

## 9. Evaluation signals

Use these as candidate checks; do not imply that metric thresholds are already chosen.

- For each consequential action, reconstruct the situation version, policy/workflow versions, evidence/currentness, currently valid grant and applicable channel/compliance checks.
- A policy/workflow activation never silently changes an in-flight situation; impacted work is discoverable, notice/migration is attributable, and old versions remain available while legitimately pinned work depends on them.
- A revoked/expired grant, changed role, stricter platform rule, changed consent or kill switch blocks the next effect regardless of the pinned business rule context.
- Every configuration value validates against its product schema, invariant and applicable legal boundary before activation; invalid or unsupported requests produce a visible outcome, not a silent fallback.
- A newly shipped but not enabled capability causes no unrelated business reconfiguration or behavior change; a retired/replaced provider does not silently substitute a new source or channel.
- Tests distinguish U4 stale/down provider from U5 absent source, preserve U2 unknown-outcome/idempotency behavior, retain U3 partial completion, and prevent U1 stale timers from reviving superseded work.
- Memory candidates retain tenant scope, evidence, version and allowed influence; they cannot change grants/policy. Product-improvement traces are separately scoped/redacted and do not expose one business's content as another's memory.
- Simulation and T-A/T-B security tests continue to pass for configuration changes, capability additions, model/prompt changes and migration paths.

## 10. Revisit conditions

Revisit this dimension when a real business request cannot be represented without core changes; a configuration is being used to encode policy or executable logic; an active promise cannot be maintained under pinned versions; a live constraint conflicts with an in-flight workflow; or a migration notice cannot find or safely route affected work.

Also revisit after a provider/channel deprecation, new market/legal regime, grant or role revocation failure, cross-tenant/memory leak, repeated stale-learning incident, product/model update that changes equivalent behavior, or evidence that the cost of old-version support outweighs the promise protected. Reconcile with D2 before adding a new change boundary or event subsystem.

## 11. Parent corrections and explicit reconciliation

- **Section 6 Q3 is incomplete shorthand:** it calls the four-plane model “facts/grants live; policies/workflows pinned” but omits the distinct platform/external plane, which is live **and interrupting**. Preserve the full four-plane classification in the parent responsibility wording.
- **Section 6 Q2 coverage:** its rationale lists new systems/channels/policies but not workflows, although Growth gives workflows the shared join lifecycle. Clarify the example/list without implying workflows are raw capabilities or a universal plugin contract.
- **Section 8 T5 / AC-4 wording:** “authoritative grant/policy store” can read as requiring every policy to be read live. Reconcile it with pinned business policy/workflow context and current live grants/platform/compliance constraints. D2 §24.1 already records this as a wording qualification, not a demonstrated contradiction.
- **Section 8 configuration notice mapping remains open:** Growth requires affected in-flight situations to be noticed for a migration decision; Section 8 §8.5/§8.14.4 marks `config_applied` wake optional. Verify whether existing wait/event behavior satisfies notice discovery or leave the mapping explicitly open; do not assert the optional event is already insufficient. D2 §24.2 covers this.
- **Workflow sub-procedure semantics need a parent note:** the live-or-pinned sub-procedure option must be represented in the rule context if retained; otherwise it conflicts in appearance with “workflow pinned at situation open.”
- **Product Vision's “Learn from every interaction” needs the later scope qualifier:** use the Memory distinction between business-content learning and product-behaviour improvement; neither may rewrite business policy, grants or the invariant line. This is a clarification, not a request to remove learning.
- **Fallback wording needs a capability qualifier:** the Channels record's “fallback lane always exists” means an allowed communication/human route, not that email is universally available or that a route supplies missing package/order facts. U5 remains capability-absent only after checking both system and person.
- **Terminology:** Level 1's “Product Builder” configures a business, while Growth assigns capability authoring/contract validation to the Tend product team and business-side enablement to the configurator. Keep these roles distinct in parent prose.
- **Carry forward the D2 label defect:** Section 7/8 references to `T11` do not match Section 6 Group T's T1–T9 list. Do not introduce or depend on a new T11 evolution gate; reconcile the label at the parent level as already flagged in D2 §24.3.

## 12. Exact evidence paths

- `knowledge_base/Product_Vision.md` — §§4, 6 (Agency; “Learn from every interaction”), 7–8.
- `knowledge_base/Level1_Problem_Framing_or_Expansion.md` — §§2–3 (assumptions and variation unknown), §4 Product Builder/Test & Simulation Environment, §5 responsibilities, §6 configuration/simulation interactions, §§7–10 boundaries/invariants/scaling, §§11–12 out of scope and Growth questions.
- `knowledge_base/architecture/section_6_responsibility_model.md` — §6.4 Groups N, P, Q, R, S, T, U; §6.6 U1–U5; §§6.9–6.10 state ownership/open questions.
- `knowledge_base/architecture/section_7_boundary_model.md` — §§7.12.3–7.12.6, §7.12.9, §§7.13.2–7.13.4.
- `knowledge_base/architecture/section_8_interaction_model.md` — §§8.2–8.7, §§8.10–8.14, §§8.16.1–8.16.5, §8.17.
- `knowledge_base/architecture/what_is_already_settled.md` — “What learning may change,” “Permission,” “What a sentence can do,” “A carrier that is down, and a business that cannot ship,” and “Leave these open.”
- `knowledge_base/architecture/section_9_scratch/02_change_over_time.md` — §§3–7, §§23–25; reuse its change-plane and parent-reconciliation findings rather than restating them as new architecture.
- `knowledge_base/Level 2/growth_and_evolution/understanding_all_growth_and_evolution_questions.md` — status, four change planes, seven question decisions, remaining open.
- `knowledge_base/Level 2/growth_and_evolution/how_do_businesses_customise_tend_without_changing_its_core_behaviour.md` — core/config boundary, typed registry, product/business split, invariant line.
- `knowledge_base/Level 2/growth_and_evolution/how_do_we_support_businesses_that_operate_differently_from_one_another.md` — variation axes and non-configurable invariants.
- `knowledge_base/Level 2/growth_and_evolution/how_do_new_business_systems_become_part_of_tend.md` — capability definition, authoring and join lifecycle.
- `knowledge_base/Level 2/growth_and_evolution/how_do_new_communication_channels_become_part_of_tend.md` — channel contract and live platform rules.
- `knowledge_base/Level 2/growth_and_evolution/how_do_new_business_policies_become_part_of_tend.md` — policy/grant/workflow distinction, lifecycle, expiry and migration.
- `knowledge_base/Level 2/growth_and_evolution/how_do_new_workflows_become_part_of_tend.md` — constrained workflows, versioning and sub-procedure option.
- `knowledge_base/Level 2/growth_and_evolution/how_do_we_evolve_tend_without_breaking_existing_businesses.md` — four planes, rule context, migration, capability retirement and evaluation criteria.
- `knowledge_base/Level 2/memory_and_knowledge/understanding_all_memory_and_knowledge_questions.md` — memory categories, working decisions and separation of learning from policy.
- `knowledge_base/Level 2/memory_and_knowledge/what_kind_of_learning_is_acceptable.md` — acceptable/unacceptable learning boundary.
- `knowledge_base/Level 2/memory_and_knowledge/how_should_new_learning_be_reconciled_and_versioned.md` — claim identity, finite update operations and safe unresolved outcome.
- `knowledge_base/Level 2/memory_and_knowledge/how_should_memory_be_scoped_between_businesses.md` — tenant and narrower memory scope.
- `knowledge_base/Level 2/memory_and_knowledge/how_do_we_evaluate_automatic_learning.md` — evaluation and reversal of harmful learning.
- `knowledge_base/Level 2/authority_and_ownership/understanding_all_authority_and_ownership_questions.md` — delegated range, effective permission, configurator and grant lifecycle.
- `knowledge_base/Level 2/authority_and_ownership/the_business_configuration_capability.md` — deterministic configurator writes and unresolved tool/identity details.
- `knowledge_base/Level 2/authority_and_ownership/how_does_a_grant_end_and_how_does_role_change_affect_authority.md` — grant lifecycle and role-change effect.
- `knowledge_base/Level 2/authority_and_ownership/when_is_tend_allowed_to_perform_an_action.md` — authorization before action.
- `knowledge_base/Level 2/channels_and_permissions/understanding_all_channels_and_permissions_questions.md` — channel/permission split, fallback sequence and open market values.
- `knowledge_base/Level 2/channels_and_permissions/how_should_tend_represent_what_each_communication_channel_allows_a_business_to_send.md` — per-channel contract.
- `knowledge_base/Level 2/channels_and_permissions/channels_and_permissions_conversation_and_discoveries.md` — fallback lane, visible gap and boundary between permission rules and transport.
- `knowledge_base/Level 2/compliance_and_security/understanding_all_compliance_and_security_questions.md` — conceptual spine and per-market open items.
- `knowledge_base/Level 2/compliance_and_security/how_do_we_make_a_software_product_secure.md` — deterministic control plane, tenant isolation, model-output handling and T-A/T-B tests.
- `knowledge_base/Level 2/compliance_and_security/compliance_and_security_conversation_and_discoveries.md` — approved invariants, change/security boundary and remaining open items.
- `knowledge_base/Level 2/decision_making/understanding_all_decision_making_questions.md` — decision/control/authority boundary and open capability defaults.
- `knowledge_base/Level 2/decision_making/how_do_we_represent_business_policies.md` — policy meaning and required conditions, evidence, scope, exceptions and fallback.
- `knowledge_base/Level 2/decision_making/how_do_we_ensure_consistent_next_behaviour.md` — consistency under explicit situation, evidence, policy and authority.
- `knowledge_base/Level 2/decision_making/how_do_businesses_define_approval_rules.md` — approval enforcement and invalidation when a situation changes.
