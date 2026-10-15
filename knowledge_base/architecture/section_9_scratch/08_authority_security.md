# Section 9 scratch — Dimension 8: Authority and Security

**Assigned dimension:** Dimension 8 — Authority and Security  
**Scope:** identity, delegated authority, action and data permissions, accountability, approval, tenant/field isolation, memory and model boundaries, and enforcement at each effect boundary  
**Status:** Provisional — the delegated-range model and deterministic enforcement pattern are established; the identity-to-authority runtime join is explicitly still open. Field-scope implementation, some grant/role transitions, and the Section 6–8 T-contract mapping also need reconciliation.

This is a Section 9 working record. It does not amend canonical responsibility, boundary, interaction, or Level 2 files. It records cross-cutting constraints and stress-test findings only.

## 1. Construction question

How can Tend continue delegated work across people, channels, tools, memory, and time without confusing a verified identity with permission, permission with authority, or execution with responsibility—and without exposing another tenant's or an actor's out-of-scope information?

The test is not merely whether a user can sign in or a tool call can be denied. It is whether every read, reveal, approval, configuration change, send, and external write is evaluated for the right tenant, verified principal, action, resource, current grant, owning-system limits, and product invariants before it has an effect. The model, a message, a remembered note, a cached grant, a role label, or a past approval must not silently become authority.

## 2. Force and distinctions

Tend is expected to notice events and continue a situation without a fresh human prompt for every step. It reads data owned by businesses and platforms, reasons over untrusted text, routes human work, and can invoke tools or send messages. The business configures the goal and permitted range, while distinct employees, customers, prospects, partners, providers, and product operators have different roles, responsibilities, and data scopes. This creates both a cross-tenant security boundary and finer-grained within-tenant boundaries.

Keep these concepts separate:

- **Identity:** evidence of which human, channel, or internal worker is speaking. An identity provider verifies a human; a proved channel binding or signed internal job can identify a non-human source. Verification does not grant the actor a capability.
- **Permission:** whether a given principal may read or reveal a resource or perform a particular action under the applicable grant, owning-system/connector limit, visibility rule, and product invariant. Read permission is not automatically permission to disclose.
- **Authority:** the business-delegated range within which Tend or a human may cause an action. Tend is not an authority-bearing principal and cannot expand the range. Approval may be attached to the grant or requested for a specific action.
- **Responsibility/accountability:** who is expected to perform, approve/authorize, own ongoing human work, or answer for the outcome. These roles can belong to different actors. A verified actor, a work-item owner, an approver, and the person accountable after automation are not interchangeable.

The architectural responsibilities use “ownership” separately again: B-Story owns operational situation truth; business systems own their canonical facts; platforms own canonical messages; business configuration owns grants; B-Memory owns advisory knowledge; B-Visibility derives views. None of those data/record ownership labels, by themselves, grants a person access or authority to act.

## 3. Evidence-derived control path

The current cross-boundary control shape is:

```text
verified source identity + business binding
  → immutable TenantContext for this ingress/wake
  → scoped situation/context lookup
  → model proposes a typed next behaviour (proposal is data, not authority)
  → structural validation and authorization are evaluated separately
  → authoritative grant/policy read for this principal, action, resource, args, now
  → Allow: execute only after the gate; Deny: no effect; StepUp: deterministic human path
  → re-evaluate at the next action boundary; commit/audit the resulting state
```

The `TenantContext` tenant comes from verified identity/binding, not a request body, URL, header, tool argument, or model-extracted value. It is immutable for the wake and propagated across boundaries. Its grant reference is for audit/correlation; enforcement still reads the authoritative grant/policy store. The current architecture gives a conceptual minimal context, not a settled implementation schema.

`VALIDATE` is one per-wake step with separate structural and authorization diagnostics. A well-formed proposal can still be denied. Authorization is checked before an external effect at proposal/validation and again at the invoke/send boundary; configuration writes use the configurator capability. The named action outcomes are `Allow`, `Deny`, and `StepUp`. They are not the same as malformed input, idempotency block, unavailable tool, capability-absent, or unknown outcome.

## 4. Affected responsibilities, boundaries, and interactions

- **Decision/authority — F1–F6 and G1–G9:** choose Tend's next behaviour; keep intention distinct from truth; continue only inside delegated range; stop safely; invoke authorization after the model proposes; ask, refuse, preserve the invariant floor, keep accountability, apply grants only through configurator tools, intersect grant/system/invariant permissions, and bind the wake to a verified principal. These are cross-cutting responsibilities, not a new monolithic security boundary.
- **Harness and authorization — S1–S12 / T1–T9:** S validates structure, controls loop/commit/idempotency, and treats model output as data. T supplies tenant context, policy decisions, live enforcement reads, per-action checks, StepUp routing, configuration-write control, and secret-free append-only audit. Structural and authorization outcomes stay distinguishable.
- **Compliance/security — Group U1–U6:** mechanical tenant isolation across stores, caches, keys, indexes, logs, and model calls; untrusted connected fields and prompt allowlists; configured compliance checkpoints; kill switches; fixed/versioned tool-catalogue integrity; and T-A/T-B release gates.
- **B-Story:** owns and commits operational truth, selects a proposed behaviour inside the grant, and re-reads current state before advancing. It does not itself make a proposal authoritative or call channel APIs.
- **B-Membrane:** fixes ingress business context, routes events, and delivers only permitted egress. It checks the story-version send intent, actor visibility, channel rules, and authorization; it cannot write story truth or authorize a refund.
- **Adjacent-Tool:** gates an invoke before the connector/effect, uses the current authorization result, persists intent, enforces idempotency independently, and returns structured evidence. Fetch-time object approval occurs inside the fetch path before bytes/handles are returned.
- **Adjacent-Config:** grant and registry changes are made only through the configurator's deterministic capability; ordinary runtime reasoning and memory cannot write them.
- **B-Memory:** serves scoped, per-tenant advisory context and learns asynchronously. It does not commit stories, apply configuration, grant access, authorize actions, or silently change policy. Its content is untrusted/advisory input, not a permission source.
- **B-Visibility:** derives read-only projections. A derived view is not permission to view every underlying field and has no authority over business actions.
- **Humans and partners:** an information owner, work owner, approver, executor, contributor, and accountable party can differ. Routing a work item to a person does not itself give them broad data visibility or action authority; notification is not acceptance of transferred responsibility.

## 5. Invariants that survive the stress test

1. **Identity is necessary, not sufficient.** A verified employee is not thereby an approver, configurator, or reader of every business record. Authority must resolve through the business's current grants and role/visibility rules.
2. **Tenant identity is authoritative and immutable within a wake.** It comes from a verified binding; user/model-supplied tenant hints cannot switch the business. Cross-tenant reads, writes, retrieval, prompt context, or sends are defects.
3. **Tenant and actor/field isolation are distinct layers.** First enforce the business boundary mechanically; within a tenant, expose only the role/task-scoped information permitted for the human, partner, customer, or model context. Information that may be read is not automatically safe to reveal externally.
4. **The model proposes; deterministic control decides.** Model output and connected-system text are untrusted data. Neither can change grants, policy, tenant identity, approval state, tool catalogue, or the invariants.
5. **Permission is evaluated for the effect, not inferred from intent.** A proposal, owner instruction, customer request, tool name, identity claim, read result, or old conversation is not itself an Allow. Effective permission is bounded by the grant, owning-system/connector permission, and product invariants; applicable recipient/field/channel rules also constrain disclosure.
6. **Enforce before effect and re-check each action boundary.** No tool call, external write, spend, file-byte return, or message send occurs first and asks authorization later. A grant or role change must affect the next relevant gate; a cache is not an enforcement source.
7. **Approval is controlled, scoped participation—not a bypass.** StepUp uses a deterministic approval/human-work path and returns an artifact through ingress; authorization is re-run before effect. Tool-local fetch approval is a distinct check. A changed situation may invalidate an earlier approval; approval timeouts and exact binding remain policy/configuration questions.
8. **Idempotency, availability, and permission remain separate.** A duplicate/unknown refund block is not a denial; a down registered carrier is not absent capability; missing authorization is not an infrastructure failure. One status cannot stand in for another.
9. **Memory cannot become authority.** Learning may improve later context but must not change identity, permission, authority, ownership, accountability, required approval, policy, or irreversible-action boundaries.
10. **Accountability remains human/business-grounded.** Tend may perform an authorized action; the grantor is the accountable anchor for an in-range automated action, a specific approver/target is recorded where applicable, and the institution remains accountable for root cause and improvement.

## 6. U1–U5 authority/security stress test

Use the Section 8 interaction walkthroughs as the primary scenario set. Section 6 §6.6 separately calls its security validation “U5,” while Section 8 §8.16.3 calls capability-absence “U5.” Exercise both cases below and do not silently harmonize the numbering. Section 6 “Group U1/U2…” are security responsibilities, not scenario IDs.

### U1 — Priya replies before nurture timer

- **Authority path:** the owner's list instruction defines bounded work (one situation per person after the request is understood); the instruction is not a permanent grant for every later list. A customer reply may change/cancel that situation's nurture wait, but does not make the customer an authority for unrelated business actions.
- **Checks:** verified channel/principal and fixed business context on ingress; current story/read-write permission; timer wakes B-Story to re-read the latest version; any later reply/send must independently pass current grant, recipient/field visibility, consent, and channel rules at B-Membrane.
- **Pass condition:** an inbound reply supersedes the old wait; the timer does not send stale outreach. No receipt-only message or customer text is interpreted as elevated business authority.
- **Open edge:** the owner instruction may create a one-time grant or activate a configured capability, but the exact grant representation and identity-to-configurator join remain unresolved.

### U2 — Refund gateway silent

- **Authority path:** T2 may Allow the proposed refund only inside the current grant/policy; if a specific approval is required, StepUp waits for the deterministic approver path. The tool reads current grant/policy before the external effect. A StepUp approval does not bypass the current-state check.
- **Independent safety:** S9/IB-8 reads idempotency state. After an initiation with unknown outcome, a second *new* refund post is blocked even if T2 would otherwise Allow; same-key resend is only the documented deduplicated case. This is not a permission denial.
- **Pass condition:** no second irreversible initiation; the story records initiation + unknown + wait atomically; next wake re-checks live authority and situation state; after the configured settle window is spent unresolved, human work is created rather than an automatic redo.
- **Open edge:** exact approval lifetime/timeout and behavior for role/grant changes during an in-flight approval or connector action are not settled.

### U3 — Investor requests deck and revenue

- **Authority path:** investor identity/relationship does not itself authorize file access or disclosure. `fetch_file` is authorized at T2; the tool checks object metadata and performs any required fetch-time approval before returning bytes/handle. A denied/timed-out fetch returns no file bytes. Missing revenue is routed to the finance role as human work, not synthesized by the model.
- **Disclosure boundary:** deck and revenue are separate asks and may progress independently. Any partial send still needs a committed communication intent, current egress authorization, permitted audience/field scope, and channel compliance. No tool trace or internal evidence is disclosed merely because it helped reasoning.
- **Pass condition:** approved deck may be sent while revenue remains open; the external message is situation-true and only includes cleared information; a denial does not cause an alternate unapproved fetch or reveal.
- **Open edge:** exact object/resource scope and business-specific approval rules are not specified here. The “T11” visibility/reveal reference requires mapping before field-level tests can target a canonical responsibility ID.

### U4 — Stale or unavailable carrier tracking

- **Authority path:** an existing carrier tool is invoked only after current T2 authorization for the tenant/order/resource. Stale or unavailable evidence affects truth/failure/wait handling, not the grant. Customer communication and partner contact are distinct outbound effects and each require its own authorization and disclosure scope.
- **Data minimization:** the partner payload is task-scoped (for example, tracking number, problem, requested action), not the customer's whole private record. An internal employee can own investigation without gaining access beyond their role/task scope.
- **Pass condition:** the customer is not told an invented location; a stale/down source remains distinguishable from capability absence; partner escalation follows configured policy and sends only permitted fields; timer/recheck re-enters B-Story and cannot directly send.
- **Open edge:** exact role/partner scopes, market-specific legal floor/white-list, and implementation of field masking remain outside this architectural contract.

### U5 — two source labels; test both security and capability absence

- **Security validation (Section 6 §6.6 U5; also T-A/T-B):** under Bloom's tenant context, a Bob contact/file/vector/tool argument or destination must be denied before provider access; Bob's fields must not reach the prompt. Poisoned CRM text, tool results, or memory may not exfiltrate data, change grants, invoke disabled tools, or bypass refund approval. Tenant hints in a request cannot switch context. Unauthorized grant/config writes must not mutate configuration.
- **Capability-absent (Section 8 §8.16.3 U5):** if no shipping source and no person can answer, record the limitation honestly; do not label it authorization denial or technical failure. If a person can answer, create properly scoped human work instead of claiming the business has no capability.
- **Pass condition:** T-A isolation and T-B injection suites remain green, including prompt/context, cache/index/log/model-call and provider boundaries; the no-source branch stays distinct from denied access and from a registered-but-down U4 tool.
- **Open edge:** resolve the U5 naming collision in the parent/canonical scenario index. Do not change scenario meanings in this record.

## 7. Failure and uncertainty

- **Unverified, ambiguous, or unjoined principal:** identity proof without an authority mapping is insufficient. Do not infer a role from message text, a shared name, email string alone, or the model. The exact refusal/hold/escalation UX after a failed join is open.
- **Tenant hint mismatch:** use the verified binding; reject/no-op before data access or provider calls. Do not fall back to a tenant supplied by a payload.
- **Missing, expired, revoked, or role-invalid grant:** do not act on an old snapshot/cache. Return Deny or StepUp only where the policy result supports it; the user-facing path and unavailable-but-not-left coverage are not fully specified.
- **Authorization-store outage:** AC-4/T5 establish that enforcement reads the authoritative grant/policy store and that a cache never decides. Without an authoritative `Allow`, the effect cannot proceed; cached context or a stale grant snapshot cannot substitute. The exact diagnostic (Deny vs unavailable/hold) and recovery/retry behavior remain open.
- **Field scope or disclosure uncertainty:** retrieval does not imply reveal permission. If role, purpose, field, recipient, consent, channel window, or legal rule is unresolved, the send/fetch path cannot be justified by model confidence; exact partial/hold/refusal behavior depends on the applicable policy and remains to be reconciled.
- **Stale approval or role/grant change mid-flight:** a changed situation can invalidate an approval; grant lifecycle is traceable at action time. The boundary for an already-started external call and the exact role change race are open.
- **Model/memory/connected text injection:** preserve provenance and untrusted status; schema-check and reauthorize every effect. Filtering or prompting alone is not authorization.
- **Keep diagnostics distinct:** structural reject, Deny, StepUp, idempotency block, capability-absent, timeout/unknown result, source failure, and stale/conflicting evidence are different conditions with different next steps.

## 8. Tensions and unresolved seams

1. **Identity-to-authority join remains open (load-bearing).** Level 2 provisionally separates IdP authentication from business-config authorization and requires a verified identity on each authorized action. It explicitly leaves the runtime identity-to-role mapping and identity propagation to tools unresolved. Section 6 G9 and Section 8 AC-1 state the required binding pattern; they do not close the join itself. Keep this visible; do not treat `principalId` or a role label as a completed mapping design.
2. **Immutable context vs live grants.** Tenant/principal context is immutable for a wake, while T5/T6 require authoritative, current grant evaluation at each action boundary. Section 8's `grantsSnapshotRef` must not be mistaken for enforcement authority. How the audit reference captures the exact grant version used is not defined.
3. **Grant-time approval vs execution-time StepUp vs object approval.** Authority distinguishes an approved range from approval of a specific action; Section 8 also has effect-level StepUp and file-metadata approval inside fetch. These are compatible only if scope, approver, current situation, and exact effect remain bound; exact binding/expiry is not specified.
4. **Action authority vs information visibility.** The Authority model gives a capability/action range; Channels defines separate role/partner information scopes and a governed white-list. A correct action grant cannot be treated as permission to disclose every field read during that action.
5. **Human work ownership vs authority.** A role, queue, or employee may own work but lack authority to approve the next effect; a person may approve without being the information owner or work executor. Handoff request/notification is not acceptance, and authority transfer is not implied by work reassignment.
6. **Role survival vs personal accountability.** A role grant may survive turnover, but a named-person grant must be re-evaluated; the role holder at action time must be traceable. The exact mid-action role-change and unavailable-but-not-left rules remain open.
7. **T-contract mismatch:** Section 6 Group T enumerates T1–T9. Section 7 §7.12.9 and Section 8 §8.3.2 refer to `T11` for reveal/role-scoped reads. No T11 definition appears in the inspected Sections 6–8. Do not invent the missing control or silently relabel it; reconcile the catalog and the visibility interaction.
8. **U5 numbering mismatch:** Section 6 §6.6 names security validation as U5; Section 8 §8.16.3 names the no-shipping-source capability-absent walkthrough U5. Run both semantics, as above, and correct the canonical index separately.
9. **Default breadth vs least privilege:** the fresh-small-business default has a decided shape, but exact connector/domain defaults and corporate role mapping still need research. A small-business default must not become a universal permission across more roles, readers, fields, or tenants.

## 9. Consequence for the architecture

No new authority/security boundary is needed by this evidence. This is a cross-cutting invariant and gate discipline across B-Story, B-Membrane, Adjacent-Tool, Adjacent-Config, B-Memory, B-Visibility, and human/system actors. Preserve the existing separation: S controls loop/structure/commit; T controls authorization/context; U controls compliance/security enforcement; channel visibility and consent constrain disclosure; business configuration owns grants; the identity provider proves identity; and humans/business remain accountable.

When a gate cannot justify an effect, no effect proceeds without an authoritative Allow. A distinct Deny, StepUp/human work, wait/hold, or truthful capability limitation is used according to the actual condition; do not turn an unresolved condition into implicit Allow. For a policy-store outage, the exact diagnostic (Deny vs unavailable/hold) and recovery/retry behavior remain open—not the no-effect requirement. For an unresolved identity-to-authority join, verification alone does not establish an Allow; its exact diagnostic and recovery path remain open.

## 10. Established, provisional, and open

### Established by current evidence

- Tend acts only inside delegated authority and below non-overridable product invariants; it is not a principal and has no override power.
- Only the signup owner or explicitly assigned configurator may write grants through the configurator capability; an employee/customer/model cannot self-grant.
- Structural validation and authorization are separate; deterministic authorization runs before external effect; cache is not an enforcement source; authorization is re-checked per action boundary.
- The effective-permission intersection, mechanical tenant-isolation invariant, model-output-as-data rule, memory-not-authority rule, and T-A/T-B security tests are established at the responsibility/invariant level.
- StepUp uses a deterministic human path; fetch-time file approval occurs before file bytes/handles return; idempotency is independent from permission.
- Performer, approver/authorizer, accountable person, information owner, and work owner are distinct; grant/accountability history is required to explain an automated action.
- B-Memory serves scoped advisory context only and cannot apply grants or write business truth; B-Visibility is a read-only projection.

### Provisional or bounded by configuration / Level 3

- The identity/authorization split and four trusted tenant-binding source classes are conceptual control commitments; runtime role mapping and identity propagation remain open.
- Default authority has a fresh-SMB baseline and narrows by role as the business grows, but exact connector/domain grant contents and corporate mapping require further research/configuration.
- Product-prewritten role/partner scopes and a narrow governed business white-list are a working visibility decision; market-specific legal minima/ceilings and technical masking/matrix enforcement are not specified here.
- Human-work item field enum is provisional; role, business policy, channel rules, approval timeout, and fallback specifics are configuration-dependent.
- Exact TenantContext fields, action grammar, and technical enforcement implementation are not settled as a schema/deployment design.

### Open

- **Exact identity-to-authority join:** verified subject → business membership/role/grant resolution at runtime, and how that verified principal is carried to every tool/send boundary.
- Identity/role changes mid-action; coverage/delegation for unavailable-but-not-departed role holders; whether and how a configurator can further delegate configuration power.
- Grant-revision/audit binding, approval scope/expiry and stale-approval races, and the policy-store outage diagnostic (Deny vs unavailable/hold) plus recovery/retry behavior; no effect without authoritative Allow is established.
- Exact field-level policy/T11 responsibility and the link from field-level visibility to B-Membrane reveal decisions.
- Per-market visibility legal floor/white-list and concrete connector, cache/index/log/model-call isolation implementation.
- Canonical U5 label reconciliation and the missing T11 mapping between Sections 6–8.

## 11. Rejected alternatives

- **Let the model authorize or rely on “the prompt says not to.”** Rejected: connected data and model output are untrusted; permission must be deterministic and checked before effect.
- **Treat successful authentication, a channel name, request/header/payload tenant, or a model-extracted identity as sufficient authority.** Rejected: identity, tenant binding, and business grant are separate.
- **Use cache, story prose, memory, or a prior approval as the enforcement source.** Rejected: live authoritative grant/policy read; memory is advisory; changed state may make approval stale.
- **Treat read-only as automatically harmless or disclosable.** Rejected: a read may expose confidential information, and external reveal has a separate audience/field/channel gate.
- **Make one shared row-level tenant filter the only paid-tenant isolation control.** Rejected in Compliance/Security because one missed predicate can fail open; the invariant covers every data and model surface.
- **Let runtime agents or memory write grants, let an actor self-grant, or let a human/model “override” a product invariant.** Rejected: configurator-only deterministic writes, no-self-grant, invariant floor.
- **Perform first and discover permission later; route approval through an LLM side conversation; or treat idempotency as authorization.** Rejected: pre-effect gates, deterministic approval path, and separate S/T diagnostics.
- **Conflate work assignment with access/approval, or transfer responsibility merely by notifying a new owner.** Rejected: work, authority, data scope, and accepted ownership are separate.

## 12. Trade-offs

- **Current grant reads vs latency:** slower/more dependent on the authoritative policy store, but avoids stale cached authorization. Cache can improve context assembly, not decide access.
- **Least disclosure vs useful context:** field/role/partner scoping reduces exposure and injection surface, but may require an explicit human escalation or another narrowly authorized read.
- **Mechanical tenant walls vs operational simplicity:** enforcing every store/cache/index/log/model route is more demanding than convention or one query filter, but one leak invalidates the cross-tenant promise.
- **Human StepUp vs autonomous speed:** approval adds delay and availability dependencies, but preserves business control for reserved/high-consequence actions. Exact thresholds and timeout belong to policy, not model discretion.
- **Role grants vs named-person grants:** roles survive turnover but require action-time holder resolution and accountability trace; named grants are precise but must end/re-evaluate when the person leaves or changes role.
- **Useful memory vs authority drift:** learned context can improve retrieval and drafting, but banning it from policy/grant mutation sacrifices convenience to preserve explicit governance.

## 13. Evaluation signals

These are Section 9 stress-test signals, not new grant rules or schemas:

1. T-A denies every cross-tenant read/write/search/vector/file/tool/send path before data reaches a prompt or a provider; deleting a tenant leaves no indexed/logged/model-call residue where the security case requires deletion.
2. Within one tenant, a role/partner/customer receives only the permitted fields for the task; unauthorized fields are absent from the model context and outbound payload, not merely hidden in the UI.
3. Spoofed tenant hints, customer/employee claims, model-generated identities, and poisoned connected text never change the verified binding, principal, grant, or recipient.
4. T-B injection and malicious-memory fixtures cannot enable a tool, widen a grant, exfiltrate a field, bypass approval, or cause a forbidden send/write; schema-invalid proposals have structural diagnostics, not permission diagnostics.
5. A grant revoked/narrowed between proposal and a later invoke/send in the same wake is denied at that later boundary; the audit can identify the authoritative policy decision used without exposing secrets.
6. Unauthorized configuration writes produce no grant/registry mutation; assigned configurator identity is distinguishable from ordinary employee authority; no actor can elevate itself.
7. StepUp deny/timeout yields no gated effect or file bytes; approval followed by material situation/role/grant change returns to current policy evaluation instead of silently executing stale work.
8. U2 unknown refund outcome never produces a second new initiation; an idempotency block remains distinguishable from authorization Deny.
9. U1 timer wakes, U3 partial file/revenue work, and U4 stale carrier/partner branches each pass their own send/read gates; no timer, partial completion, or partner escalation bypasses B-Membrane policy.
10. Secret-free audit links principal/tenant context, grant/policy decision, action/resource, and outcome sufficiently to reconstruct accountability; model reasoning traces are not treated as business truth.
11. Capability-absent U5, denied access, unavailable registered tool, stale evidence, and unknown outcome produce distinct traces and user/business-facing consequences.

## 14. Revisit conditions

Revisit this dimension and the affected Sections 6–8 contracts if:

- the identity provider, channel-binding scheme, signed-job source, tenant membership, role assignment, or configurator delegation model changes;
- a grant/approval can change during a wake, tool call, fetch, send, role handoff, or external operation, or a new approval/exception type is added;
- a new tenant-owned store, cache, search/vector index, log, model call, tool, channel, connected-system field, or partner data flow is introduced;
- business visibility rules, legal/compliance scope, the default authority range, or an owning system's permissions change;
- memory is proposed as a source of policy, authority, approval, identity, truth, or configuration rather than advisory context;
- a test discovers cross-tenant/field leakage, stale-grant Allow, post-effect checking, untraceable accountability, or model-controlled authority;
- the parent resolves the explicit identity-to-authority join, policy-store outage behavior, T11 catalog mismatch, or U5 naming collision.

## 15. Evidence paths and sections

- `knowledge_base/Product_Vision.md` — §§1–4 (delegated agency and business ownership); §6 (“Agency is the centre of Tend,” “Help people, do not replace them,” explainability, traceability, fail safely); §7 (Tend is not the owner of the business).
- `knowledge_base/Level1_Problem_Framing_or_Expansion.md` — §4 (Tend, reasoning model, business actors, identity providers); §6 (employee sign-in, approval, owner configuration interactions); §7 (system/shared boundaries); §8 (human responsibility, least disclosure, business control, cross-tenant isolation, model output invariants); §9 (authentication/authorization failures).
- `knowledge_base/architecture/section_6_responsibility_model.md` — §6.4 Groups F, G, S, T, U; §6.6 scenario U1–U5; §6.9 state ownership; §6.10 Q10 (Policy/action grammar and TenantContext schema); §6.13 S/T split.
- `knowledge_base/architecture/section_7_boundary_model.md` — §7.12.1 B-Story; §7.12.2 B-Membrane; §7.12.3 B-Memory; §7.12.4 B-Visibility; §7.12.5 Adjacent-Tool; §7.12.9 cross-cutting gate table; §§7.13.2–7.13.3 edge catalog and authority flow.
- `knowledge_base/architecture/section_8_interaction_model.md` — §8.2 invariants; §§8.3–8.4 wake/VALIDATE and split diagnostics; §8.7 AC-1–AC-4 and conceptual TenantContext; §8.11.2 human-work protocol; §8.12.4 fetch-time approval; §§8.16.1–8.16.5 U1–U5 scenarios; §8.17 anti-patterns.
- `knowledge_base/architecture/what_is_already_settled.md` — “When someone outside hears from Tend”; “Permission”; “What a sentence can do”; “Leave these closed”; “Leave these open.” In particular, identity-to-authority joining remains open.
- `knowledge_base/architecture/how_tend_finds_the_right_situation.md` — “Who is speaking, and which business”; “The situation is worked”; §9 (one business's text cannot open another); §10 (background notes do not become authority); “What memory and knowledge is.”
- `knowledge_base/Level 2/authority_and_ownership/understanding_all_authority_and_ownership_questions.md` — “Status,” delegated-range model, and Identity section.
- `knowledge_base/Level 2/authority_and_ownership/how_do_identity_and_authority_join.md` — “Our provisional answer” and “What remains open” (runtime verified-identity-to-role/grant join).
- `knowledge_base/Level 2/authority_and_ownership/who_may_grant_authority_and_what_comes_by_default.md` — “Only one person can grant authority”; default authorization range; configurator/approver; growth by role. See also `default_authorization_range_research.md` (“The default range, settled” and “still open” items) for scope caveats.
- `knowledge_base/Level 2/authority_and_ownership/when_is_tend_allowed_to_perform_an_action.md` and `when_must_tend_ask_for_approval.md` — grant range, pre-effect enforcement, read is not automatically harmless, grant-time vs execution-time approval.
- `knowledge_base/Level 2/authority_and_ownership/how_does_a_grant_end_and_how_does_role_change_affect_authority.md` — grant lifecycle, person vs role holder, action-time accountability, unavailable and mid-action open items.
- `knowledge_base/Level 2/authority_and_ownership/the_business_configuration_capability.md` — configurator-only deterministic grant writes and open delegation of configuration power.
- `knowledge_base/Level 2/authority_and_ownership/which_actor_owns_each_action.md`, `which_actor_owns_each_decision.md`, `which_actor_owns_each_type_of_information.md`, `who_remains_accountable_after_an_automated_action.md`, and `can_tend_override_a_human_decision.md` — performer/authorizer/accountability, outcome vs next-behaviour, information ownership vs permission, and no override.
- `knowledge_base/Level 2/channels_and_permissions/how_should_tend_decide_what_information_each_employee_customer_or_external_partner_may_see.md` — narrow product-defined role/partner scopes, governed business white-list, task/partner scope, and Level 3 masking boundary.
- `knowledge_base/Level 2/channels_and_permissions/how_should_tend_represent_what_each_communication_channel_allows_a_business_to_send.md`, `how_should_tend_record_consent_and_the_customers_preferred_channel.md`, and `how_should_tend_choose_between_replying_in_the_current_channel_and_starting_a_message_in_another_channel.md` — channel send permission, consent, channel windows, and gated initiate/route path.
- `knowledge_base/Level 2/compliance_and_security/how_do_we_make_a_software_product_secure.md` — control plane, tenant binding sources, deterministic list, model/data invariants, T-A isolation, T-B injection.
- `knowledge_base/Level 2/compliance_and_security/what_are_the_compliances_of_each_actor_and_tech_stack.md` — employee/partner/data-fiduciary scopes and owning-system limits; `the_security_audit_framework.md` — validation/release gates.
- `knowledge_base/Level 2/human_collaboration/how_do_we_determine_the_correct_person.md`, `how_do_we_handle_multiple_people_working_on_the_same_situation.md`, `how_do_we_represent_ownership_of_ongoing_work.md`, and `how_do_we_transfer_work_between_employees.md` — authority vs routing, information/work owner distinction, separate contributors/approvers, acceptance and handoff lifecycle.
- `knowledge_base/Level 2/decision_making/how_do_businesses_define_approval_rules.md`, `which_decisions_depend_on_business_policy.md`, `which_decisions_must_always_involve_a_person.md`, and `how_do_we_determine_whether_project_x_can_make_the_next_decision.md` — policy vs authorization, control-enforced approval, changed-state/timeout uncertainty, and human judgment boundary.

## 16. Corrections or clarifications for the parent

1. Keep the identity-to-authority join explicitly open even though G9/AC-1 prescribe verified identity and a TenantContext. A requirement to bind is not evidence that runtime role resolution/propagation is designed.
2. Reconcile Section 6 Group T (T1–T9) with Section 7/8 `T11` references for field/reveal/role projection; do not invent a T11 definition in this scratch record.
3. Reconcile the U5 scenario label collision: Section 6 U5 is security validation, while Section 8 U5 is capability-absent. Both cases remain necessary stress coverage.
4. Preserve the separate gates for authority/action, actor visibility/field disclosure, channel/consent, object-level file approval, and idempotency. One Allow must not be treated as universal access.
5. AC-4/T5 establish that a policy-store outage cannot authorize an effect: no effect proceeds without an authoritative Allow, and cache cannot substitute. The exact outage diagnostic (Deny vs unavailable/hold) and recovery/retry behavior remain open, as do exact audit/grant-version binding and mid-action role-change semantics.
