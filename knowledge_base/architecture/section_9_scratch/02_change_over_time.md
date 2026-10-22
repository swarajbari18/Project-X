# Section 9 Scratch — Dimension 2: Change Over Time

**Assigned dimension:** Dimension 2 — Change Over Time  
**Specific focus:** Changed facts; changed policy, configuration, and authority; historical decisions versus current truth; re-evaluation; in-flight situations.  
**Construction units exercised:** U1, U2, U3, U4, U5, with U4 as the primary stress case.  
**Status:** Provisional dimension record. The underlying change semantics are strongly established in Level 2; several cross-boundary interaction details remain open and must be reconciled in Sections 9–10.

This file is working analysis only. It does not change the canonical Sections 6–8 files.

## 1. Dimension question

When a situation is still in flight and the world, the evidence, a business rule, a configuration value, an authority grant, a human assignment, a connected capability, or Tend's own behaviour changes, how does Tend preserve the distinction between:

- what was true or believed at an earlier point;
- what is currently known and permitted;
- what decision was made under the earlier conditions; and
- what must now be reconsidered before the next safe behaviour?

The dimension must answer more than “keep versions.” It must explain which changes are live, which are pinned, which wake an in-flight situation, which invalidate pending work, which require deliberate migration, and which must never rewrite history.

## 2. Force

The forces acting on Tend are not one kind of change:

1. **Facts and evidence change.** A carrier sends a newer status, a payment provider reports settlement or failure, a customer contradicts a system record, an employee adds information, or a source corrects an earlier record.
2. **Currentness changes without a new value.** A claim becomes too old for the decision, expected progress stops, a promise is breached, or the underlying process has likely moved on even though the source still shows the same status.
3. **Business policy or workflow changes.** A refund threshold changes, an escalation ladder changes, a workflow step changes, a policy expires, or a new version becomes active while existing situations are running.
4. **Authority changes.** A grant is revoked, a role holder changes, an approver leaves, a person becomes unavailable, a substitute is delegated, or the effective permission at the next action boundary changes.
5. **External and platform constraints change.** A channel window changes, consent changes, a provider deprecates a capability, an external system becomes unavailable, a compliance rule changes, or a kill switch is activated.
6. **Human responsibility changes.** A handoff is requested or accepted, an owner becomes unavailable, an escalation advances, or an assigned person does not act before a configured deadline.
7. **Memory and product behaviour change.** A learned item becomes stale or is superseded; a new business vocabulary item is proposed; a product behaviour or assembly template is improved; a capability catalogue version changes.
8. **Concurrent events expose staleness.** A message, timer, human answer, external result, configuration change, or approval arrives after a worker has proposed a next behaviour but before that behaviour takes effect.

The force is therefore not “time passes.” Time is a related dimension. This dimension asks what changes in the thing being coordinated and how the architecture remains honest when the previous plan is no longer valid.

## 2A. Dimension record mapping

### Affected responsibilities

- **Situation representation and graph:** A1–A10, especially versioned situation models, links versus new situations, closure/regression, and derived journey.
- **Event reception and routing:** B1–B9, especially routing changed facts, configuration notices, authority changes, and correction events to the affected situation.
- **Comprehension and gathering:** C1–C6 and D1–D8, especially changed claims, currentness, gradual information, source selection, and targeted re-gathering.
- **Trust and evidence:** E1–E9, especially provenance, claim relationships, stale/degraded state, conflict, action-specific blocking, and structured progress.
- **Decision and authority:** F1–F6 and G1–G9, especially rule-context use, live permission, StepUp, role/grant lifecycle, and accountability at the time of action.
- **Coordination and time:** H1–H10, especially durable versions, waits, check-ins, latest-version reads, supersession, and long-running work.
- **Communication and human collaboration:** I1–I7, J1–J9, and K1–K4, especially correction/update communication, ownership transfer, non-response, unavailable actors, and partner escalation.
- **Failure and resilience:** M1–M6, especially stale paths, unknown outcomes, bounded waits, declared failure, and no duplicate irreversible action.
- **Memory, knowledge, visibility, configuration, and improvement:** N1–N17, O1–O10, Q1–Q5, and R1–R3, especially stale-memory lifecycle, current/history views, rule/configuration versioning, and trace separation.

### Affected boundaries

- **B-Story:** Owns current and historical situation versions, rule-context references, dependency-aware re-evaluation, supersession, and the candidate change-fence obligations that may be assigned to existing consequential-branch gates.
- **B-Membrane:** Routes changed events and delivers only current-authorized situation deltas, corrections, asks, and human-work requests.
- **B-Memory:** Maintains versioned advisory knowledge and filters stale or superseded material before serving context.
- **B-Visibility:** Derives current and historical views without writing truth or authorizing actions; must expose temporal position/freshness.
- **Adjacent-Tool:** Re-checks live authority and capability constraints, preserves structured evidence/currentness, and protects idempotency/unknown-outcome paths.
- **Adjacent-Config:** Applies versioned grants, policy/workflow/configuration/capability records and must expose impact/notice semantics without mutating stories directly.
- **Adjacent-Improvement:** Consumes immutable traces for behaviour improvement without rewriting business knowledge or historical decisions.
- **Cross-cutting S/T/U:** Enforce current authority, live platform/compliance/security constraints, and traceability at each relevant edge; the stress test proposes extending these existing gates to reject stale plans.

### Affected interactions

- **Wake and route:** IB-1, IB-2, IB-4, IB-9, HC-1, HC-2, HC-3, and the missing/under-specified change-notice path for policy, authority, platform, compliance, and capability changes.
- **Commit and supersede:** IB-3, IB-6, IB-10, IB-11, and atomic version commits for changed claims, wait cancellation, migration, ownership transfer, correction intent, and outcome.
- **Egress:** IB-5, situation-delta egress, delivery acknowledgement, and stale pending-send suppression.
- **Capability invocation:** IB-7, IB-8, current authority/tool checks, structured results, provider retirement/availability changes, and unknown outcomes.
- **Memory/configuration/improvement:** IB-12, IB-13, IB-14, plus currentness/version/allowed-influence metadata on served memory and configuration-change notice.
- **Human work:** work-item open/update/transfer/acceptance/escalation/closure and re-evaluation when the situation changes during handoff.

### Relevant invariants

- Operational truth lives in the situation model; B-Story is the sole truth writer.
- Historical observations, reasons, decisions, waits, actions, and communications are not rewritten.
- A material change creates a new complete version and re-enters the decision loop.
- Timer or delayed work wakes B-Story; it does not directly send or execute.
- A pending effect requires an explicit current send/invoke decision and current authorization.
- Cache, memory, LLM output, old rule context, or a stale projection never authorizes a current effect.
- Authority is live at the action boundary; business policy/workflow context is pinned unless deliberately migrated.
- Facts are claims with provenance/currentness, not universal truth merely because they are newer or authoritative for one field.
- Capability absence, uncertainty, failure, conflict, denial, and unknown outcome remain distinguishable.
- Every active wait, human work item, and escalation remains visible and has a valid next trigger or explicit blocked/safe-stop outcome.
- Tenant isolation, field allowlists, live compliance/kill-switch rules, and catalogue integrity apply to current and historical access paths.

### Relevant failure and uncertainty classes

- Stale, corrected, incomplete, or contradictory external information.
- A provider returns successfully but the result is not current enough for the decision.
- An external path becomes unavailable, deprecated, or capability-absent while work is in flight.
- A grant, role, approver, owner, channel permission, compliance rule, or kill switch changes before effect.
- A policy/workflow/configuration version changes without affected situations being noticed.
- An old proposal, wait, human assignment, send intent, or approval races with a newer situation version.
- An irreversible action returns an unknown outcome and later evidence changes the situation.
- A human handoff is requested but not accepted, or the assigned actor becomes unavailable.
- A derived view is stale and an actor tries to act from it.
- Memory is stale, conflicting, out of scope, or superseded; product improvement changes proposal behaviour without adequate trace context.
- Duplicate, delayed, or out-of-order change events cause repeated or regressive re-evaluation.

## 3. Core change classification

The Level 2 evidence supports four primary change planes. The planes must not be collapsed into one global “latest configuration” rule.

| Change plane | Default semantics for an in-flight situation | Why |
|---|---|---|
| Facts and evidence | **Live and versioned.** Preserve the previous claim and situation version; record the new observation and derive a new current version when it materially affects the situation. | Tend must work from the latest known state without erasing what was previously known or communicated. |
| Platform, external, and compliance constraints | **Live and interrupting.** Re-check at the next affected action boundary; wake or release affected work through the wait/event spine; use fallback, human work, or safe stop when the old path is no longer usable. | Pinning a channel rule, legal constraint, kill switch, or provider availability would make the system act on a world that no longer exists. |
| Grants and authority | **Live at the moment of use.** A revoked or expired grant cannot authorize a later action. Work and authority are transferred separately. | Historical authority explains an earlier action; current authority determines whether the next action may happen. |
| Business policies and workflows | **Pinned at situation open, with deliberate migration.** Record the rule context used by the situation. A new version is prospective and must be noticed; migration is an attributed business decision. | Always-live business rules would make one storyline change rules mid-step without a stable explanation. |

Memory lifecycle and product-behaviour improvement are related but are not additional business-authority planes:

- Memory items are versioned, scoped, and filtered for eligibility before retrieval. They are advisory and cannot change a policy, grant, owner, source-of-truth assignment, approval requirement, or irreversible-action boundary.
- Product improvement may change how future wakes propose behaviour, but it cannot rewrite past traces or make business-specific content authoritative through model weights. The exact treatment of model/assembly-template versions for in-flight situations remains provisional.

## 4. A change is not automatically a new situation

The current problem boundary remains the same:

- If a new observation concerns the same operational problem and resolution path, keep the same situation and create a new complete situation-model version.
- If the event creates a genuinely different operational problem or independently tracked resolution path, create a new situation and link it to the prior situation.
- A changed policy or workflow version alone does not automatically create a new situation. It creates a noticed rule-context change and a possible migration decision inside the existing situation.
- A changed owner, approver, or responsibility target does not automatically create a new situation. It changes work-item ownership or authority state and must remain traceable.
- A source correction, conflict, or stale claim does not justify overwriting the earlier claim or silently opening an unrelated card.

The following remains the useful decision test:

```text
Does the event change the same operational problem and resolution path?
        ├─ yes → same situation, new complete version, re-evaluate affected work
        └─ no  → new linked situation, separate owner/policy/path as required
```

The new situation test must not be reduced to identity, channel, or narrative similarity. It must use the operational problem, responsibility, resolution path, and the need for independent lifecycle tracking.

## 5. Historical decision versus current truth

“Current truth” must not mean universal truth. It means the latest complete situation model derived from the available claims, provenance, currentness, conflicts, rules, and decisions. An external claim remains a claim owned by its source; Tend's current state records how that claim is currently interpreted for this situation.

Every material change should preserve two views at once:

### Historical record

The historical record answers:

- What did Tend receive or observe?
- What claims and interpretations were available then?
- Which situation-model version was current?
- Which policy/workflow rule context was in force?
- Which grant and authority decision was valid then?
- What was proposed, approved, sent, invoked, assigned, or waited on?
- What did the recipient actually receive or acknowledge?

Historical records are append-only. A later correction does not make an earlier decision disappear, and a later policy does not retroactively change the explanation for an earlier action.

### Current working state

The current state answers:

- What is known now?
- Which prior claims are stale, corrected, confirmed, superseded, or in conflict?
- Which asks remain open?
- Which waits, human work items, ownership assignments, and escalations remain valid?
- Which decisions must be reconsidered?
- What can Tend safely do now under current authority and live external constraints?

The current state is a new complete situation-model version. It is not a patch that hides the earlier state.

### Consequence for communication

If a material new claim changes what an actor was told, B-Story must decide whether a correction, update, explanation, or acknowledgement is required. The prior message remains historical. A new communication intent is created only when the new current state and policy make it necessary and permitted. The membrane must not send an old pending draft merely because it was prepared before the change.

## 6. Re-evaluation model

Re-evaluation is a normal re-entry into the existing decision loop, not a replay from zero and not a model-only activity.

```text
Change event or noticed change
        ↓
Route to the affected situation
        ↓
Recover latest committed situation version
        ↓
Record the new observation / change / authority or rule event
        ↓
Create a new complete situation-model version when the operational state changes
        ↓
Identify affected claims, decisions, waits, human work, communications, and permissions
        ↓
Re-evaluate only what can be affected, while retaining the complete current model
        ↓
Invalidate, supersede, retain, migrate, or create work as appropriate
        ↓
Re-check live gates before any effect
        ↓
Commit a new honest rest state or the next permitted behaviour
```

Re-evaluation must preserve useful prior work. It should not gather the entire history again merely because one claim changed. It should also not assume that unrelated conclusions remain valid without checking their dependencies.

The architecture therefore needs a logical dependency relationship between at least:

- claims and currentness assessments;
- claims and interpretations;
- decisions and the evidence/rule context used;
- decisions and pending communication or external effects;
- waits and the condition they are waiting for;
- human work and the situation version that created it;
- policy/workflow references and the governed step;
- grant/authority checks and the effect they permitted;
- capability/tool contract versions and the invocation;
- memory items and their allowed influence.

The exact field schema is Level 3/open, but the logical dependency must exist or targeted re-evaluation cannot be distinguished from blind replay.

## 7. Provisional change-fence extension to existing gates

**Status: Provisional logical constraint; not a new component and not yet an independently established interaction contract.**

The existing architecture correctly requires timer wakes to re-read the latest situation model (IB-4), validates state consistency in S2, re-checks authorization at each action boundary in T6, and gates tool/egress effects through the existing tool and membrane contracts. The stress test suggests that these existing controls may need an explicit logical extension to cover all relevant change dependencies, but this scratch record does not declare a new gate family or settled implementation.

The reason for the proposed extension is that an in-flight proposal can become stale even when the situation-model version has not yet changed, because:

- an external system's canonical state changed without an event reaching Tend;
- the relevant claim became too old for the action;
- a grant was revoked or its holder changed;
- a channel, compliance rule, provider contract, or kill switch changed;
- a business policy/workflow version was activated and requires a notice/migration decision;
- a human work item was accepted, transferred, rejected, or became unnecessary;
- a memory item used in the proposal was superseded;
- or another worker won a race and committed a newer operational outcome.

Therefore, as a **provisional extension of IB-4, S2, T6, and the existing tool/egress gates**, the logical model should consider a change-fence check at consequential action boundaries:

1. Re-read the latest situation version.
2. Confirm that the proposal's referenced evidence and currentness remain adequate for this action.
3. Resolve the rule context: pinned business policy/workflow version, plus current platform/compliance/connector constraints.
4. Re-check current authority using the authoritative grant store.
5. Re-check channel and visibility rules for egress, or tool contract and external availability for invoke.
6. If any relevant input changed, reject or supersede the stale proposal and re-enter the decision loop.
7. If the effect already happened or its outcome is unknown, record that fact and use the existing idempotency/unknown-outcome path rather than pretending the old proposal can simply be retried.

This is a candidate logical freshness and re-evaluation constraint, not a technology choice. It does not require a new “change service.” Whether it is expressed as an explicit named rule or as clarified obligations inside S2, T6, IB-4, IB-5, IB-7/8, and the existing tool gates remains open for reconciliation.

## 8. Primary U4 stress test — carrier facts change while the situation is in flight

### Initial state

Customer asks where the order is. A carrier capability exists. The carrier reports “in transit at City B,” but the observation is stale relative to the delivery promise. The delivery situation records:

- the customer ask;
- the carrier claim and observation time;
- the currentness limitation;
- the delivery promise/deadline;
- a wait for tracking or investigation;
- the response/release policy;
- the configured escalation path;
- any customer communication intent already committed;
- and the rule context governing the situation.

### Change A — newer carrier state arrives before the next timer

The carrier reports City C or delivered.

Expected behaviour:

1. The event routes to B-Membrane for ingress handling and then wakes B-Story.
2. B-Story appends the observation with source, time, revision, and relationship to the earlier claim.
3. The same delivery situation receives a new complete version; the earlier City B claim and any previous customer message remain historical.
4. The wait and escalation are re-evaluated. A recheck may be superseded; an investigation may be cancelled, changed, or retained depending on the new claim and customer experience.
5. If the customer was told something materially changed, B-Story decides whether a new situation-delta communication is needed.
6. The timer wake later re-reads the new version and becomes a no-op if its old wait is superseded (IB-4).

### Change B — carrier status stays “in transit” but the promise is breached

No new carrier value arrives. The delivery promise expires and the claim is now insufficient for the decision.

Expected behaviour:

1. Time wakes B-Story; the timer is not itself an outbound send.
2. B-Story treats the promise breach and currentness change as a meaningful state transition.
3. It creates a new situation-model version that preserves the unchanged carrier claim but changes its currentness/decision usability and deadline state.
4. The response promise may cause a customer update; the internal resolution promise keeps running.
5. The configured escalation path may advance, but no fixed internal-to-partner order or fixed day count is invented.
6. If the carrier path is unusable after its configured bound, the situation records declared failure and follows the configured fallback. It is not capability-absent because the source exists; it is not resolved merely because the API previously said “in transit.”

### Change C — customer says “carrier says delivered, but I did not receive it”

Expected behaviour:

1. The customer-experience claim and carrier claim are both preserved.
2. Deterministic comparison classifies the relationship as a delivery conflict or partial overlap, not as a reason to silently pick the latest claim.
3. The conflict blocks only the affected actions: Tend may communicate the bounded carrier state or open an investigation, but must not claim receipt or issue compensation automatically unless configured and authorised.
4. A new complete situation version records the conflict, affected actions, human/partner work, and any customer communication intent.
5. The prior “carrier reports delivered” message, if any, remains historical; the current situation may require a correction or investigation update.

### U4 result

The U4 walkthrough survives the change dimension if “currentness,” “failure,” “conflict,” and “capability absence” remain distinct, and if every timer/recheck/partner event returns through B-Story before egress or effect. The walkthrough does not survive if the architecture equates “latest SM version” with “latest external truth” or if it permits an old send/invoke proposal to execute after the carrier facts or grant changed.

## 9. U1 stress test — nurture and reply race, then a changed instruction

U1 already establishes:

```text
SM v10: nurture wait
reply arrives → SM v11 records reply and supersedes wait
timer later reads v11 → no-op
```

Change-over-time extensions:

- If the owner changes the campaign instruction while the situation is open, that instruction is not automatically a standing policy. The existing situation retains the applicable rule context and must receive an explicit change/migration instruction if the business means to change in-flight work.
- If the owner changes a channel permission or consent state, that is a live external/platform/permission constraint. The next send must re-check it even if the outreach workflow is pinned.
- If the prospect's relationship state changes from prospect to customer, the same outreach situation may close or transition according to the business path, while any order/onboarding problem becomes a new linked situation.
- A later outreach attempt is a new situation linked to the closed one, not a silent reopening, unless the original operational problem was never actually complete or regressed.

U1 therefore supports the distinction between a historical decision (the nurture wait was scheduled under version 10) and current truth (the reply made that wait irrelevant). It also exposes the need for a stale pending-send guard in B-Membrane.

## 10. U2 stress test — refund policy and authority change after initiation

### Facts change

The gateway accepted the refund initiation, but the outcome is unknown. The situation records initiation, unknown outcome, an idempotency key, and a recheck wait in one version. A later gateway result says success or failure.

Expected behaviour:

- Preserve initiation and unknown outcome as historical claims.
- Create a new version with the later result and its provenance.
- Supersede the recheck wait if the result resolves it.
- If the result is failure, open the appropriate corrective or human work; do not overwrite initiation as though it never happened.
- If the result remains unknown past the configured settle window, hand the irreversible unknown to a person; do not auto-redo the refund.

### Business policy changes

The refund situation records the policy/workflow version that governed the open situation. If a new refund policy activates, the situation is found by a notice/re-check wait and the owner is offered a deliberate keep-or-migrate decision. The migration, if chosen, is itself a new attributed situation-model version.

### Authority changes

If the auto-approve grant is revoked while the refund is in flight:

- a refund already executed under the valid grant remains historically attributable to that grant and time;
- a later refund effect or corrective action must use the currently valid grant/approver;
- a “keep the old policy” decision cannot resurrect a revoked authority;
- if the new authority requires StepUp, the tool/membrane approval path begins and the situation waits visibly for the approver;
- a role change or unavailability changes who may act only after current identity/authority and coverage rules are checked.

U2 survives only if the model does not treat the old policy snapshot as permission to use a currently revoked grant.

## 11. U3 stress test — partial fulfilment, policy change, and historical disclosure

The investor asks for a deck and revenue. The deck is cleared while revenue remains open. The deck may be sent as a partial fulfilment, while the revenue ask remains a live responsibility.

Change-over-time requirements:

- If the deck is replaced or its access permission changes before send, the pending send must be revalidated; the earlier catalog observation is historical, not a current authorization.
- If revenue becomes available later, the situation receives a new version and a new situation-delta communication, not a rewrite of the earlier partial response.
- If the investor's visibility entitlement changes, the current egress decision must use current authority and disclosure rules, even if the request began under an earlier rule context.
- If the external stakeholder's request changes into a different operational problem, create a linked situation rather than smuggling a second ask into the completed one.

The partial-fulfilment rule survives change only when each ask has its own ending and the send gate is evaluated against the current situation version and current visibility constraints.

## 12. U5 stress test — security and compliance change during an open situation

The cross-tenant and poisoned-input cases remain live constraints, not historical settings.

- A tenant isolation or field-allowlist check must apply to every current store, cache, index, log, model call, and tool invocation.
- A previously allowed read does not authorize a later disclosure after the recipient, scope, compliance rule, or channel changes.
- A kill switch or compliance rule change interrupts the affected tool or send path even when the business workflow is pinned.
- A tool catalogue hash/version change means the capability contract must be revalidated; no runtime registration or stale tool definition is trusted.
- Historical traces remain auditable but are not permission to replay the old action under the new environment.

U5 therefore confirms that security/compliance constraints belong to the live external-constraint plane and must be checked at current action boundaries.

## 13. Boundary stress test

### B-Story — versioned situation model and worker loop

**Survives, with a required strengthening.** B-Story is the correct owner for:

- the current complete situation-model version;
- immutable historical versions and reasons;
- claim relationships, currentness, conflicts, and affected conclusions;
- rule-context references and deliberate migration records;
- waits, human work, ownership changes, send decisions, and outcome tags;
- targeted re-evaluation after a change;
- and the candidate stale-plan/change-fence check before a consequential branch.

B-Story must not become the canonical owner of external facts, policy registry values, grants, or connector state. It holds references/claims and the coordination state needed to move the situation.

**Stress result:** The sole-writer rule remains correct. Re-evaluation must produce a new B-Story version rather than let B-Membrane, B-Memory, or Adjacent-Tool patch operational truth.

**Status: Open interaction-coverage question.** The current interaction model explicitly routes timer and result events, but it does not yet clearly specify how grant revocation, live platform/compliance change, capability retirement, or activation of a new pinned policy version identifies and wakes every affected in-flight situation. The responsibility exists conceptually in Group Q3/change semantics and the wait spine, but the interaction contract is not yet explicit. This is a traceability/coverage observation, not a conclusion that a new boundary is required.

### B-Membrane — ingress and egress membrane

**Survives.** B-Membrane remains responsible for:

- receiving changed external messages/events;
- routing them to B-Story;
- delivering a new situation-delta or human-work request after B-Story commits intent;
- checking current channel, visibility, consent, and live authorization rules;
- and recording delivery/acknowledgement status without becoming story truth.

It must not:

- mutate a situation because a message changed;
- decide whether a policy migration is required;
- send a stale draft merely because it was prepared earlier;
- or treat an old send decision as permission after current channel or recipient rules changed.

**Required constraint:** A pending delivery references a situation version and send decision. If a newer version supersedes that intent, the old delivery becomes a no-op unless the newer version explicitly preserves it as an intentional historical resend. “Historical resend” must not mean “send any old draft”; it must remain current-authorized and deliberately represented.

### B-Memory — business knowledge lifecycle

**Survives.** B-Memory correctly handles change through:

- active/stale/superseded/conflicting/retired/unresolved lifecycle states;
- observation time, validity conditions, scope, process/capability version, and allowed influence;
- retrieval eligibility filtering before ranking;
- forward additions/revisions rather than destructive replacement;
- and separation between business content learning and product behaviour improvement.

B-Memory must not:

- turn an observed policy change into an authoritative policy write;
- change a grant, owner, permission, approval requirement, source-of-truth assignment, or irreversible-action boundary;
- supply an old learned tool precondition when the capability version has changed;
- or let historical conversational similarity override current authoritative facts.

**Stress result:** The B-Memory serve path is compatible with change over time only when every served item carries enough scope/version/validity/allowed-influence information for the receiver to reject stale guidance. The exact memory schema remains open.

### B-Visibility — derived views and audit

**Survives provisionally.** The read-only boundary is correct, but change over time requires explicit temporal semantics in derived views:

- A current board must identify the latest applied situation-model version or an equivalent freshness marker.
- A lagging projection may be stale, but it must not present itself as the current operational truth.
- A historical reconstruction must be able to render the situation as-of an earlier version, including the claims, rule context, authority decision, action, and outcome available then.
- Owner attention should surface policy-change notices, overdue migrations, drifted escalations, and revoked/invalidated work without making B-Visibility the action owner.
- Any owner action initiated from a view must re-read current B-Story state and current authority; the projection cannot authorize by itself.

**Status: Provisional view constraint.** “Stale board lag acceptable” is safe for observation only if the view exposes its version/as-of nature and action entry points perform a current read. The exact projection freshness and stale-view presentation remain provisional.

### Adjacent-Tool — capability invocation

**Survives.** The tool harness remains adjacent because its responsibility is per invocation, not ownership of the situation. Change-over-time requires it to:

- use current tool/catalogue/connector contract information;
- run live authorization before effect;
- perform idempotency checks against the latest situation state;
- return structured evidence with source, observation time, revision, contract context, and outcome shape;
- distinguish provider unavailability, stale/incomplete result, denial, capability absence, and unknown outcome;
- and prevent a stale or duplicate irreversible effect.

The tool result does not directly change story truth. B-Story records the new claim/outcome as a new version.

**Status: Open interaction-coverage question.** The logical contract should make explicit whether a capability contract/version change is itself an event that wakes affected in-flight situations or is discovered only at the next invocation. For live provider/platform constraints, waiting until the next action boundary may be safe; for a retired capability that leaves a pending wait with no valid path, proactive notification/fallback may be required. The source material establishes the capability lifecycle and live external-change principle, but does not settle this exact wake contract.

### Adjacent-Config — authoritative configuration apply

**Survives provisionally.** It is the right logical home for deterministic writes to grants, registry records, policy versions, workflow versions, and capability lifecycle records.

Change-over-time constraints:

- configuration records are typed, versioned, validated, and traceable;
- activation/supersession/expiry/retirement never silently overwrites the prior version;
- the four change planes determine whether a change is live, interrupting, or pinned;
- grants and live constraints are enforced immediately at action boundaries;
- policies/workflows are captured in a situation's rule context and migrate only by deliberate decision;
- and a configuration change must produce enough notice/impact information for affected in-flight situations.

**Status: Open/provisional interaction question.** Section 8 explicitly describes `event:config_applied → B-Story` as an optional wake and says no dedicated wake is required for that event. Separately, the Growth evidence says that in-flight situations under an old business policy/workflow version are found by a notice wait and offered deliberate migration. The material therefore does not yet establish how those two descriptions compose. The exact impact-discovery and notice-routing contract remains open; this record does not assert that `config_applied` is already required to perform that work, nor that a new component is needed. It must not be implemented as silent mutation of every in-flight situation.

### Adjacent-Improvement — product behaviour improvement

**Survives as a separate consumer of traces.** Historical traces and business memory must not be rewritten by improvement activity. Product improvement may change future model adherence or assembly-template behaviour, but:

- it must not change business policy, grants, compliance rules, source ownership, or historical decisions;
- traces must identify the product behaviour/assembly version used for each run;
- replay or evaluation must distinguish “what happened under the old behaviour” from “what would happen under the improved behaviour”;
- a product rollout affecting in-flight situations must not silently claim that their prior decisions were made under the new behaviour;
- and improvement must not make old customer-specific content authoritative in weights.

Whether a situation pins product behaviour for a full lifecycle, a run, or only a governed workflow step is not settled at Level 2. The trace requirement is established; the pinning choice remains provisional/open.

## 14. Cross-cutting S/T/U stress test

### Harness control — Group S

The existing S model survives, with the following interpretations under change:

- **S1:** Every change wake re-enters WAKE→RECOVER→PROPOSE→VALIDATE→EXECUTE→UPDATE→REST. A change cannot be handled only in an observer, memory, or membrane side path if it affects operational truth.
- **S2:** Structural validation must reject a proposal based on an old situation version, superseded wait, invalidated human work item, incompatible rule context, or stale change dependency. The current “SM version match” is necessary but may need to include the proposal’s relevant dependency references.
- **S4/S5:** A changed claim, wait supersession, migration, ownership change, correction intent, or outcome is one atomic new situation-model version and announce event.
- **S6:** A re-evaluation counts as progress only if evidence state, a required source, a wait/watch, an outcome, or permission/authority changes. Repeating the same stale proposal must not keep the loop alive.
- **S7/S9:** Irreversible effects still require persisted intent and latest-state idempotency checks. If the world changed after initiation, use status/reconciliation and unknown-outcome semantics, not a new uncontrolled post.
- **S10:** Timer wakes still route to B-Story and re-read latest state. The rule generalizes to any delayed or retried wake.
- **S11:** Model output, memory items, configuration candidates, and external fields remain data, not instructions or authority.
- **S12:** Duplicate or late change events must be deduplicated and must not regress the situation to an older version. The event identity/version relationship must be observable.

**Candidate strengthening:** Add a logical stale-plan/change-fence check to the S family, or explicitly extend S2/T6/IB-4 so that “latest SM” includes all relevant live change dependencies, not only the situation record version. Whether this is needed as a named rule remains open.

### Authorization control — Group T

The current T model correctly treats authority as live:

- T2/T3/T4/T6 check current effective permission before each effect.
- T5 makes an authoritative enforcement read mandatory; cache cannot decide.
- T7 routes StepUp through the deterministic approval path.
- T8 keeps grant and registry writes inside the configurator path.
- T9 preserves the audit trail, which must include the grant/configuration version and decision time.

**Qualification required; not declared a contradiction.** T5 and AC-4 say “authoritative grant/policy store” at enforcement, while the Growth evidence says business policies/workflows are pinned at situation open and change only by deliberate migration. The sources can be reconciled if “policy” in the live enforcement phrase means the live enforcement planes—grants/permissions, platform/channel rules, compliance constraints, kill switches, invariants, and connector constraints—while the business policy/workflow rule context for a situation remains pinned or is deliberately migrated. The architecture should make that interpretation explicit:

```text
pinned business policy/workflow context for this situation
        +
live grant / authority / compliance / platform / channel / connector checks
```

If left implicit, implementers could misread T5 as always-live re-evaluation of every business policy, which would be inconsistent with the deliberate migration rule. This is a wording/traceability clarification, not an established contradiction in the underlying decisions.

### Compliance and security enforcement — Group U

U1–U6 survive as live constraints:

- U1 tenant isolation applies to current and historical data access, including reconstruction and replay.
- U2 field allowlists and untrusted-input handling apply every time context is assembled or data is sent; historical access does not grant current disclosure permission.
- U3 compliance rule records are evaluated at configured checkpoints and must interrupt or block affected actions when live rules change.
- U4 kill switches are live containment, not pinned business workflow values.
- U5 catalogue integrity is versioned/hashed; changed or retired tools cannot be trusted merely because a prior situation used them.
- U6 simulation/release gates must include change races and migration scenarios, not only static U5 cases.

### T11 reference check

**Status: Established traceability defect; not a new authority rule.** Section 7.12.9 and Section 8.3.2/8.7 refer to `T11` for reads or role projection, while the Group T responsibility table in Section 6 currently defines T1–T9. The available evidence does not establish what T11 means. Treat the reference as an undocumented label or typo until the canonical architecture reconciles it; do not infer a new T11 permission or authority responsibility from the reference.

## 15. Observed tensions

### Tension 1 — Live facts versus immutable history

If Tend only keeps the latest value, it cannot explain the earlier decision or correct a customer-facing message. If it treats every historical value as current, it cannot act safely.

**Resolution:** append-only observations and complete situation versions, with an explicit current projection and claim relationship/currentness state.

### Tension 2 — Pinned business rules versus live authority

An in-flight workflow may still be governed by an older business policy, while the grant that once allowed an action has been revoked.

**Resolution:** preserve the old rule context for explanation, but re-check live authority before the next effect. A “keep old policy” decision never resurrects old authority.

### Tension 3 — Pinned workflow versus live provider/platform capability

A workflow step may remain conceptually the same while the connector, channel window, compliance rule, or provider becomes unusable.

**Resolution:** keep the workflow context pinned, but interrupt the affected step and use current fallback, human work, migration, or safe stop. Do not pretend the old external condition still holds.

### Tension 4 — Latest situation version versus latest external truth

The SM can be current relative to Tend's records while the carrier, payment provider, or employee has changed without Tend yet receiving the event.

**Provisional resolution:** use currentness rules, watchers/check-ins, source re-fetch where decision-relevant, and the candidate change-fence extension before consequential action. “Latest SM” is not a substitute for “sufficiently current external evidence.”

### Tension 5 — Targeted re-evaluation versus complete replay

Full replay is conceptually simple but can redo irrelevant work or produce unsafe duplicate effects. No re-evaluation leaves stale decisions alive.

**Resolution:** preserve a complete current version, track dependencies, re-evaluate affected conclusions and pending work, and use idempotency/unknown-outcome handling for effects already attempted.

### Tension 6 — Eventual derived views versus owner need for current work state

B-Visibility can lag, but the owner must not be misled by an old projection or act from stale context.

**Resolution:** expose projection/version/as-of semantics and force action entry points to re-read B-Story and current authority. Visibility remains read-only.

### Tension 7 — Async memory learning versus current decision needs

Memory learning can lag, but current business decisions cannot wait for learning promotion; old memory can also be wrong.

**Resolution:** authoritative facts/policies/grants are gathered from their owners/current stores. Memory is advisory, versioned, filtered, and allowed to degrade to “not used” without becoming a decision blocker.

### Tension 8 — Product improvement versus reproducibility

An improved model may propose different behaviour when an old situation wakes again. Treating the new proposal as though it made the old decision is false history; pinning all product behaviour forever may prevent safe improvement.

**Resolution:** preserve product behaviour/assembly version in traces and evaluate rollout/replay separately. The lifecycle pinning rule remains open and must be decided before Level 3 execution design.

### Tension 9 — Policy-change notice versus the existing optional config wake

The Growth evidence describes affected in-flight situations being found and offered deliberate migration. Section 8 currently marks `event:config_applied → B-Story` as optional and says no dedicated wake is required for that event. These statements are not yet reconciled at the interaction-contract level.

**Status: Open.** Define or explicitly defer the logical impact-notice path in Section 9/10, without letting configuration directly mutate story truth. Exact ownership between Adjacent-Config, the wait registry, and B-Story is open.

### Tension 10 — Same situation versus linked situation when policy/approval path changes

The Gathering change document says a different policy or approval path may justify a linked situation, while Growth says a policy/workflow change is handled as deliberate migration of the existing in-flight situation.

**Provisional resolution:** a policy version change alone remains inside the same situation as a rule-context migration. A new linked situation is justified only when the operational problem or independently tracked resolution path changes. This wording should be reconciled in the Level 2 evidence to prevent agents from splitting every policy migration.

## 16. Architectural consequence

Change over time does not produce a generic “Change Manager” boundary. It produces a cross-cutting semantic contract over the existing model:

```text
Change classification
        ↓
Live / pinned / interrupting semantics
        ↓
Versioned observation and rule context
        ↓
Targeted re-evaluation
        ↓
Supersede / migrate / retain / reassign / correct
        ↓
Current action-boundary freshness checks
        ↓
New version + announce + honest rest
```

The logical architecture should therefore retain or explicitly resolve the following consequences. Items marked provisional/open are not new settled boundaries:

1. **Established:** A durable distinction between current working state and historical state.
2. **Established:** A versioned rule context on each situation for business policy/workflow semantics.
3. **Established:** Live enforcement for authority and external/platform/compliance constraints.
4. **Open:** A change-impact/notice path that can find affected in-flight situations when a pinned policy/workflow changes.
5. **Established responsibility; representation still open:** Dependency-aware re-evaluation within B-Story.
6. **Provisional:** A stale-plan/change-fence extension at consequential action boundaries.
7. **Established direction; detailed semantics open:** Explicit supersession of stale waits, human work, send intents, and proposals.
8. **Provisional:** Version/as-of semantics for B-Visibility and reconstruction.
9. **Established direction; exact schema open:** Version/scope/validity/allowed-influence semantics for B-Memory.
10. **Provisional:** Trace context sufficient to distinguish the rule, authority, evidence, capability, and product behaviour that produced each historical decision.

These are logical responsibilities and interaction constraints. They do not prescribe event brokers, database isolation, caches, locks, workflow engines, or model providers.

## 17. Decisions and constraints

### Established by current evidence

- A meaningful change to information creates a new complete version of the same situation when the operational problem and resolution path remain the same.
- Earlier claims, situation versions, decisions, actions, waits, ownership changes, and communications remain historical.
- Re-evaluation is forward and targeted; it does not rewrite history or restart from zero.
- Facts/evidence are live; platform/external rules are live and interrupting; grants/authority are live; business policy/workflow versions are pinned at situation open with deliberate migration.
- A current grant is checked at the action boundary; a historical grant explains an earlier action only.
- Memory is versioned and advisory; it cannot change policy, authority, ownership, permission, approval, source authority, or irreversible-action boundaries.
- B-Story remains the sole owner of operational-truth commits and is the place where re-evaluation changes the story.
- B-Membrane transports changed events and current-authorized communication but does not own story truth.
- B-Visibility is derived/read-only and must not authorize or write operational truth.
- Adjacent-Tool returns structured evidence and enforces live pre-effect constraints/idempotency without writing story truth.
- Adjacent-Config is the deterministic home for versioned configuration and grant/registry writes; runtime memory and workers cannot silently apply them.
- Adjacent-Improvement is separate from business memory and cannot rewrite customer/business history.
- No timer, stale draft, cache, memory item, or model proposal may by itself authorize a current effect.

### Provisional constraints from this stress test

- **[Provisional]** Every consequential branch should be evaluated against a candidate logical change fence that extends IB-4, S2, T6, and the existing tool/egress gates to relevant live external, authority, channel, compliance, capability, and human-work dependencies.
- **[Provisional]** A pending send or invoke should be invalidated when its referenced version or relevant dependency is superseded, unless a newer committed intent deliberately preserves it.
- **[Provisional]** Derived views should expose enough version/as-of information to distinguish a lagging projection from current truth.
- **[Provisional]** Change events should be deduplicated and must not move a situation backward to an older version.
- **[Provisional]** Rule-context version, authority decision, relevant evidence references, capability contract context, and product behaviour/assembly context should be traceable for every important decision.

### Open constraints

- Exact dependency schema between claims, decisions, waits, human work, communications, and effects.
- Exact impact-discovery ownership and wake contract for policy/workflow changes, connector retirement, platform/compliance changes, and grant revocation.
- Whether a policy/workflow configuration change is represented through the existing optional `config_applied` wake, a notice-wait path, or another existing interaction; the source material does not settle that composition.
- Exact semantics for a policy/workflow migration while a side effect is already in progress.
- Whether product behaviour/assembly versions are pinned per wake, per workflow step, or per situation.
- Exact historical-resend semantics when the old content is still intentionally needed but channel/visibility rules have changed.
- How to represent an external fact that changed but has not yet emitted an event, beyond currentness and check-in/re-fetch rules.

## 18. Rejected alternatives

| Alternative | Rejection reason |
|---|---|
| Overwrite the current value in place | Destroys the explanation for earlier decisions and communications; prevents correction and audit. |
| Always trust the newest claim | “Newest” is not the same as authoritative, current enough, correctly scoped, or non-conflicting. |
| Make every change a new situation | Splits one operational problem, loses continuity, and creates duplicate work; change alone does not define a new problem. |
| Keep one situation forever regardless of operational change | Hides independent ownership, policy, approval, and resolution paths inside one unbounded story. |
| Re-run the entire situation from the beginning on every change | Repeats irrelevant work, risks duplicate effects, and ignores dependency locality. |
| Pin everything at situation open | Would use stale grants, channel rules, compliance constraints, provider availability, or kill-switch state. |
| Make all business policies always-live | Allows rules to change silently mid-situation and destroys stable explainability; conflicts with deliberate migration. |
| Let the old policy snapshot authorize later actions | Confuses business rule context with live authority and can execute after grant revocation. |
| Let B-Membrane, B-Memory, or Adjacent-Tool patch operational truth directly | Violates the sole-writer model and makes change ordering/reconciliation ambiguous. |
| Let cache or memory decide current enforcement permission or policy constraints | Stale context would become authority; contrary to the cache-never-decides rule in T5/AC-4 and the B-Memory must-not rules. This does not prevent a pinned business policy/workflow context from being used as the situation’s rule context. |
| Send every prepared draft even after the situation changes | Exposes stale or misleading information and can violate current channel/visibility rules. |
| Add a generic Change Service solely because change is a dimension | Section 9 dimensions are lenses; the responsibilities already belong across B-Story, configuration, tools, membrane, memory, visibility, and control gates. |
| Treat a stale carrier as capability-absent | U4 has a registered source; stale/unavailable path is a wait/failure/fallback problem, not absence of capability. |

## 19. Trade-offs

- **Version history versus storage and cognitive complexity:** Complete versions and immutable evidence improve correction and audit but require projections, dependency references, and clear current/history views.
- **Pinned policy/workflow versus migration burden:** Pinning gives stable explanation and process integrity but requires impact discovery, notice waits, and deliberate migration decisions.
- **Live authority versus in-flight continuity:** Live grants prevent stale authorization but can interrupt a workflow and leave it needing a new approver or fallback.
- **Targeted re-evaluation versus replay simplicity:** Targeted re-evaluation avoids duplicate work but requires dependencies between evidence, decisions, waits, and effects.
- **Currentness checks versus latency/cost:** Re-fetching or checking external state before consequential actions improves correctness but may add delay and external load; the business consequence determines when it is required.
- **Event-driven change notification versus lost-event recovery:** Immediate wakes reduce staleness but need durable delivery/deduplication; situation-level check-in remains the backstop.
- **Derived-view lag versus boundary independence:** Asynchronous visibility preserves story write correctness but requires version/as-of disclosure and current reads before actions.
- **Product improvement versus reproducibility:** Allowing improved behaviour on later wakes improves the product but makes behaviour-version traceability essential; pinning too broadly slows improvement.
- **Correction communication versus communication noise:** Material changes may require a correction, but not every internal claim change should produce an external message; the current policy, audience, and consequence decide.

## 20. Evaluation signals

The change dimension is healthy when the following scenario-level signals hold:

1. A completed reconstruction can answer what was known, which rule context applied, which authority was valid, what was decided, what was sent/invoked, and what later changed.
2. No historical situation-model version, claim, decision, wait, human-work item, or communication is overwritten to make the current state look cleaner.
3. A meaningful changed fact creates a new complete current version and re-evaluates affected waits, work, decisions, and communication.
4. U1 message/timer races never send a superseded nurture or stale outbound action.
5. U2 gateway uncertainty never causes a duplicate irreversible post, and a later success/failure changes the current state without erasing initiation history.
6. U4 stale tracking remains distinct from capability absence; a promise breach or new carrier claim produces the correct wait, failure, investigation, escalation, correction, or bounded answer.
7. U3 partial fulfilment preserves open asks and sends later updates only from new committed situation deltas under current visibility rules.
8. U5 cross-tenant, untrusted-input, catalogue, compliance, and kill-switch checks apply to current effects even when the situation began under earlier conditions.
9. Revoking a grant or changing a role prevents the next unauthorized effect while leaving prior valid actions attributable to the authority valid at their time.
10. New business policy/workflow versions are used by new situations; affected in-flight situations are noticed and do not change silently.
11. Deliberate migration records who chose it, when, from which rule context to which, and what work was affected.
12. A derived view can identify that it is lagging and cannot authorize an action without a current B-Story/authority read.
13. Superseded memory is filtered before ranking and cannot alter policy, authority, ownership, source responsibility, or approvals.
14. Duplicate, late, or out-of-order change events do not regress a situation or cause infinite re-evaluation loops.
15. A race inserted between PROPOSE and EXECUTE causes a stale proposal to be rejected/replanned, or the effect to follow the unknown-outcome/idempotency path when it already happened.
16. Every important action has enough change context to identify current/pinned rule planes separately; no audit record ambiguously says only “policy allowed.”

## 21. Revisit conditions

Revisit this dimension and potentially Sections 6–8 when:

- a new Level 2 answer changes the four-plane classification;
- a scenario reveals that a changed fact, policy, grant, role, capability, or platform rule does not reach an affected in-flight situation;
- a stale proposal executes after another situation version, authority, or external constraint has changed;
- historical reconstruction cannot reproduce the relevant evidence/rule/authority context;
- a policy/workflow migration cannot be represented without creating an accidental second situation;
- authority revocation or role turnover leaves work silently ownerless or still executable by the old holder;
- a connector is retired or its contract changes while a wait is open and no fallback is discoverable;
- B-Visibility’s lag causes an owner to act on an unmarked stale projection;
- memory learning or product improvement changes a business rule, grant, source owner, or historical interpretation;
- product behaviour changes make the same in-flight situation impossible to explain consistently;
- version/dependency storage or re-evaluation cost becomes operationally dominant;
- repeated change races show that SM version matching alone does not stop stale actions;
- or the final logical architecture cannot state whether a given value is live, pinned, historical, current, advisory, or authoritative.

## 22. Evidence paths

### Product and Level 1

- `knowledge_base/Product_Vision.md` — Tend acts when events change situations; business knowledge, policies, deadlines, and operational state change; owner sees changes and responsibility as artifacts; Time causes information to become outdated; the business may change an active situation by correcting information or changing a permitted rule.
- `knowledge_base/Level1_Problem_Framing_or_Expansion.md` — changing business knowledge; event-driven re-entry; current business state; owner-delegated authority; Time causes information to become outdated; Test & Simulation validates changes without breaking existing behaviour.
- `knowledge_base/three_level_framework/3_level_framework.md` — Level 2 must remain technology-neutral and must derive logical responsibilities from Level 1.
- `knowledge_base/three_level_framework/architecture_contruction.md` §9.6, §9.27–§9.30 — change-over-time force, dimension record, control gate, and backward movement when dimensions invalidate earlier construction.

### Existing architecture

- `knowledge_base/architecture/what_is_already_settled.md` — carrier stale/unavailable distinction; waiting within configured bound; failure after bound; live grant check; no learning override of policy/authority; versioned situation and communication truth.
- `knowledge_base/architecture/section_6_responsibility_model.md` — A1–A10 situation versions/links/closure; D5 changing information; E1–E9 provenance/currentness/conflict; F/G decision and authority; H1–H10 waits and latest-version timer reads; J5–J9 human responsibility changes; M1–M6 failure; N8–N16 memory lifecycle and must-not rules; O5 reconstruction; Q1–Q5 configuration/evolution; R1–R3 improvement; S1–S12 harness; T1–T9 authorization; U1–U6 enforcement.
- `knowledge_base/architecture/section_7_boundary_model.md` — B-Story sole operational-truth writer; B-Membrane transport boundary; B-Memory lifecycle and advisory authority; B-Visibility derived/read-only boundary; Adjacent-Tool and Adjacent-Config gate ownership; IB-1–IB-14 contracts.
- `knowledge_base/architecture/section_8_interaction_model.md` — per-wake contract; VALIDATE split; latest-version timer read; atomic commits; situation-delta egress; temporal races; U1–U5 walkthroughs; completion discipline; stale carrier versus capability-absent distinction.

### Relevant Level 2 evidence

- `knowledge_base/Level 2/gathering_information/how_do_we_handle_information_that_changes_while_a_situation_is_being_analysed.md`
- `knowledge_base/Level 2/gathering_information/how_do_we_know_when_information_is_sufficiently_current.md`
- `knowledge_base/Level 2/gathering_information/how_do_we_handle_information_that_arrives_gradually.md`
- `knowledge_base/Level 2/trust_and_evidence/how_do_we_compare_information_from_different_sources.md`
- `knowledge_base/Level 2/trust_and_evidence/how_do_we_distinguish_facts_from_assumptions.md`
- `knowledge_base/Level 2/trust_and_evidence/how_do_we_resolve_conflicts.md`
- `knowledge_base/Level 2/trust_and_evidence/how_do_we_represent_confidence_without_pretending_certainty.md`
- `knowledge_base/Level 2/trust_and_evidence/what_makes_one_source_more_authoritative_than_another.md`
- `knowledge_base/Level 2/trust_and_evidence/when_should_conflicts_automatically_stop_the_workflow.md`
- `knowledge_base/Level 2/time/how_should_tend_react_when_time_changes_the_situation.md`
- `knowledge_base/Level 2/time/when_should_waiting_end_automatically.md`
- `knowledge_base/Level 2/time/how_should_deadlines_influence_decisions.md`
- `knowledge_base/Level 2/time/how_should_waiting_be_represented.md`
- `knowledge_base/Level 2/time/how_should_forgotten_work_be_rediscovered.md`
- `knowledge_base/Level 2/coordination/how_do_we_coordinate_long_running_work.md`
- `knowledge_base/Level 2/coordination/how_do_we_know_a_piece_of_work_is_still_active.md`
- `knowledge_base/Level 2/coordination/how_do_we_recover_interrupted_work.md`
- `knowledge_base/Level 2/coordination/how_do_we_represent_work_that_is_waiting.md`
- `knowledge_base/Level 2/coordination/how_do_we_represent_work_that_is_blocked.md`
- `knowledge_base/Level 2/authority_and_ownership/how_does_a_grant_end_and_how_does_role_change_affect_authority.md`
- `knowledge_base/Level 2/authority_and_ownership/when_is_tend_allowed_to_perform_an_action.md`
- `knowledge_base/Level 2/authority_and_ownership/when_must_tend_ask_for_approval.md`
- `knowledge_base/Level 2/authority_and_ownership/the_business_configuration_capability.md`
- `knowledge_base/Level 2/authority_and_ownership/who_remains_accountable_after_an_automated_action.md`
- `knowledge_base/Level 2/growth_and_evolution/how_do_we_evolve_tend_without_breaking_existing_businesses.md`
- `knowledge_base/Level 2/growth_and_evolution/how_do_new_business_policies_become_part_of_tend.md`
- `knowledge_base/Level 2/growth_and_evolution/how_do_new_workflows_become_part_of_tend.md`
- `knowledge_base/Level 2/growth_and_evolution/how_do_new_business_systems_become_part_of_tend.md`
- `knowledge_base/Level 2/growth_and_evolution/how_do_businesses_customise_tend_without_changing_its_core_behaviour.md`
- `knowledge_base/Level 2/memory_and_knowledge/how_do_we_update_knowledge_when_reality_changes.md`
- `knowledge_base/Level 2/memory_and_knowledge/how_do_we_prevent_outdated_knowledge_from_influencing_new_decisions.md`
- `knowledge_base/Level 2/memory_and_knowledge/how_should_new_learning_be_reconciled_and_versioned.md`
- `knowledge_base/Level 2/memory_and_knowledge/how_should_previous_conversations_influence_future_decisions.md`
- `knowledge_base/Level 2/memory_and_knowledge/how_do_we_assemble_context_for_each_situation_phase.md`
- `knowledge_base/Level 2/human_collaboration/how_do_we_represent_ownership_of_ongoing_work.md`
- `knowledge_base/Level 2/human_collaboration/how_do_we_transfer_work_between_employees.md`
- `knowledge_base/Level 2/human_collaboration/what_happens_when_the_responsible_person_is_unavailable.md`
- `knowledge_base/Level 2/human_collaboration/what_happens_when_nobody_responds.md`
- `knowledge_base/Level 2/human_collaboration/how_do_we_handle_multiple_people_working_on_the_same_situation.md`
- `knowledge_base/Level 2/explainability_and_observation/how_do_we_reconstruct_an_entire_business_situation_after_it_has_finished.md`
- `knowledge_base/Level 2/business_view_and_observation/what_should_the_business_owner_see_in_a_snapshot_of_the_business_journey.md`
- `knowledge_base/Level 2/business_view_and_observation/which_events_should_require_the_owners_attention.md`

## 22A. Material finding traceability and status

The following table ties each material finding in this scratch analysis to exact source paths and sections. “Established” means the source directly states the semantic rule. “Provisional” means the stress test proposes a logical interpretation or extension that still needs reconciliation. “Open” means the sources identify a need but do not settle the interaction or representation.

| Finding | Classification | Exact supporting sources |
|---|---|---|
| F1 — Historical situation versions and external canonical claims must remain distinct from the current working situation model. A changed claim creates a new complete version; it does not rewrite the old claim. | **Established** | `knowledge_base/Level 2/gathering_information/how_do_we_handle_information_that_changes_while_a_situation_is_being_analysed.md` — “Same situation, new version”, “Re-evaluation does not mean starting from zero”, “Changes to source records and claims”, “Our working decision”; `knowledge_base/Level 2/trust_and_evidence/how_do_we_distinguish_facts_from_assumptions.md` — “The layers of information”, “Corrections and versioning”; `knowledge_base/architecture/section_6_responsibility_model.md` — §6.3 and A1–A10; `knowledge_base/architecture/section_8_interaction_model.md` — §8.9.2 atomic move catalog. |
| F2 — Facts/evidence, external/platform constraints, grants, and business policy/workflow versions have different change semantics. | **Established** | `knowledge_base/Level 2/growth_and_evolution/how_do_we_evolve_tend_without_breaking_existing_businesses.md` — “The decision, in plain words”, “The rule context”, “Working decision”; `knowledge_base/architecture/section_6_responsibility_model.md` — Q3; `knowledge_base/architecture/what_is_already_settled.md` — “Permission”, “A carrier that is down…”. |
| F3 — A change-fence check could make existing latest-version, structural, authorization, and tool gates explicit across all relevant live dependencies. | **Provisional** | Existing contracts: `knowledge_base/architecture/section_8_interaction_model.md` — §8.3.2 (S2/T6 map), §8.4 (state consistency and authorization), §8.10.1 (egress gate), §8.12 (capability invoke cycle), §8.13.1 (latest-version timer race); `knowledge_base/architecture/section_6_responsibility_model.md` — S2, S7–S9, T2, T4–T6; currentness evidence: `knowledge_base/Level 2/gathering_information/how_do_we_know_when_information_is_sufficiently_current.md` — “Currentness is decision-relative”. No source currently names a separate change-fence contract. |
| F4 — Policy/workflow change requires noticed, deliberate migration semantics for affected in-flight situations. | **Established semantic rule; open interaction representation** | `knowledge_base/Level 2/growth_and_evolution/how_do_we_evolve_tend_without_breaking_existing_businesses.md` — plane 4, “The rule context”, refund walkthrough, “Working decision”; `knowledge_base/Level 2/growth_and_evolution/how_do_new_workflows_become_part_of_tend.md` — workflow version-change walkthrough; interaction representation: `knowledge_base/architecture/section_8_interaction_model.md` — §8.5 `event:config_applied` row marked “optional wake”, §8.14.4 marked “optional B-Story wake”. |
| F5 — T5/AC-4 live enforcement can be interpreted as current grants/permissions and live platform/compliance/kill-switch/invariant/connector constraints, while business policy/workflow context may be pinned or deliberately migrated. | **Established semantic split; provisional wording clarification** | Live enforcement wording: `knowledge_base/architecture/section_6_responsibility_model.md` — Group T, T2–T6; `knowledge_base/architecture/section_8_interaction_model.md` — §8.4.2 and AC-4; pinned rule context: `knowledge_base/Level 2/growth_and_evolution/how_do_we_evolve_tend_without_breaking_existing_businesses.md` — plane 4 and “The rule context”. The sources support reconciliation; they do not establish a contradiction. |
| F6 — `event:config_applied` and its relation to notice waits/impact discovery are not fully specified. | **Open** | `knowledge_base/architecture/section_8_interaction_model.md` — §8.5 wake routing row and §8.14.4; `knowledge_base/Level 2/growth_and_evolution/how_do_we_evolve_tend_without_breaking_existing_businesses.md` — plane 4, “The rule context”, refund walkthrough, related wait-spine reference. The architecture does not currently state whether the optional wake is the notice mechanism. |
| F7 — `T11` is an undocumented/possibly mistyped label, not evidence of an additional authority rule. | **Established traceability defect** | `knowledge_base/architecture/section_6_responsibility_model.md` — Group T defines T1–T9; `knowledge_base/architecture/section_7_boundary_model.md` — §7.12.9 B-Membrane and B-Visibility rows reference T11; `knowledge_base/architecture/section_8_interaction_model.md` — §8.3.2 and §8.7 reference T11. |
| F8 — B-Visibility needs temporal/as-of semantics if its accepted projection lag is to remain safe for observation and action entry. | **Provisional** | `knowledge_base/architecture/section_7_boundary_model.md` — §7.12.4, especially “Consistency / atomicity” and “Status: Provisional”; `knowledge_base/architecture/section_8_interaction_model.md` — §8.14.1; `knowledge_base/Level 2/explainability_and_observation/how_do_we_reconstruct_an_entire_business_situation_after_it_has_finished.md` — “The raw material already exists” and viewer-dependent reconstruction; `knowledge_base/Level 2/business_view_and_observation/what_should_the_business_owner_see_in_a_snapshot_of_the_business_journey.md` — snapshot is derived and not a second source of truth. |
| F9 — U4 must treat stale currentness, source conflict, provider failure, and capability absence as different states while preserving the history of previous carrier claims and communications. | **Established** | `knowledge_base/architecture/section_8_interaction_model.md` — §8.16.5 U4 and §8.17 anti-patterns; `knowledge_base/Level 2/gathering_information/how_do_we_know_when_information_is_sufficiently_current.md` — “Currentness is decision-relative”; `knowledge_base/Level 2/trust_and_evidence/how_do_we_resolve_conflicts.md` — versioning and correction; `knowledge_base/architecture/what_is_already_settled.md` — “A carrier that is down…” and “Leave these open”. |
| F10 — Product-improvement behaviour must remain separate from business memory and historical business decisions; exact pinning of product behaviour for future wakes is not settled. | **Established separation; open lifecycle detail** | `knowledge_base/architecture/section_6_responsibility_model.md` — R1–R3 and N3/N15; `knowledge_base/architecture/section_7_boundary_model.md` — §7.12.3 B-Memory and §7.12.6 Adjacent-Improvement; `knowledge_base/Level 2/memory_and_knowledge/how_do_we_update_knowledge_when_reality_changes.md` — “Reality and Tend’s learning are different”; `knowledge_base/Level 2/memory_and_knowledge/how_should_new_learning_be_reconciled_and_versioned.md` — update operations and preserved references. |
| F11 — Change over time does not, by itself, justify a generic Change Manager boundary. | **Provisional architectural consequence** | `knowledge_base/three_level_framework/architecture_contruction.md` — §9.3 (dimensions are lenses, not automatically subsystems), §9.26 (dimension analysis may discover new architecture); `knowledge_base/architecture/section_7_boundary_model.md` — §7.12 boundary decision records and §7.13 boundary graph; this scratch record’s boundary stress test (§13). |

## 23. Strongest architectural discoveries

1. **Change semantics are a four-plane rule, not a global freshness rule.** Facts, external/platform/compliance constraints, grants, and business policies/workflows have different lifecycles. The distinction is essential to Tend's correctness.
2. **The current situation model is not enough by itself.** It must be paired with a rule context, historical version chain, and references to the authority/evidence/capability context of each important decision.
3. **“Re-read latest SM” is necessary but may be insufficient.** The stress test proposes a logical change-fence extension to IB-4, S2, T6, and existing tool/egress gates; this is provisional and does not introduce a new component or settled gate family. **See F3.**
4. **Policy migration has an established semantic requirement but an open interaction mapping.** The evidence requires affected in-flight situations to be found and offered deliberate migration. Section 8’s optional `config_applied` wake is not yet reconciled with that requirement; it is not established that the wake is insufficient or that a new path is required. **See F4 and F6.**
5. **B-Story remains the correct central owner of re-evaluation.** No new generic Change boundary is currently justified by the evidence; this is a provisional architectural interpretation of the Section 9 dimension principle, not a new canonical boundary. Change remains a cross-cutting contract over B-Story, configuration, tool invocation, membrane, memory, visibility, and S/T/U gates. **See F11.**
6. **Historical truth and current truth must be first-class different views.** A current view without immutable history cannot explain or correct; a history-only model cannot safely choose the next action.
7. **The main U4 risk is not only API failure.** A source can respond successfully yet be too stale for the decision. Currentness is decision-relative and must be part of re-evaluation, not merely a timestamp on a claim.
8. **Authority and business policy deliberately diverge in time.** A situation can retain an old policy context while losing the grant that once allowed an action. This is safe only when live authority is checked independently.
9. **The architecture needs explicit supersession semantics for all pending work.** Stale waits, send intents, human assignments, approvals, and proposals must become no-op, migrated, cancelled, or re-routed in a recorded way.
10. **Visibility must expose temporal position.** A derived board can lag, but users must be able to distinguish current/as-of/history, and an action from a stale view must re-read authoritative current state.

## 24. Claims requiring correction or explicit reconciliation by the parent agent

1. **T5/AC-4 qualification — established semantic split; wording clarification provisional:** “authoritative grant/policy store” should be read consistently with live grants/permissions and live platform/compliance/kill-switch/invariant/connector constraints, while business policy/workflow context may be pinned or deliberately migrated. The parent should make this scope explicit if needed. The sources do not establish a contradiction. **See F5.**
2. **`event:config_applied` — open interaction question:** Section 8 marks the wake optional, while Growth requires a noticed migration path for affected in-flight situations. The parent should verify and either connect the existing event/wait semantics or explicitly leave the interaction open. Do not state that the optional wake is already insufficient as a settled fact. **See F4 and F6.**
3. **`T11` — established traceability defect:** Section 8 and Section 7 refer to `T11`, while Group T in Section 6 defines T1–T9. Reconcile the label or document it; do not infer a new authority responsibility. **See F7.**
4. **Policy/approval-path split ambiguity — open Level 2 reconciliation:** The Gathering change answer says a different policy or approval path may justify a linked situation, while Growth describes policy/workflow changes as deliberate migration of the same in-flight situation. The parent should clarify that policy version change alone does not automatically create a new situation; a separate operational problem/resolution path may. **Sources:** `knowledge_base/Level 2/gathering_information/how_do_we_handle_information_that_changes_while_a_situation_is_being_analysed.md` — “The GitHub issue and Kanban analogy”; `knowledge_base/Level 2/growth_and_evolution/how_do_we_evolve_tend_without_breaking_existing_businesses.md` — plane 4 and “The rule context”.
5. **B-Visibility temporal qualification — provisional:** The canonical model accepts projection lag, but the parent should decide whether current/as-of version markers and current reads at action entry are required logical constraints. **See F8.**
6. **“Latest SM” versus “latest world state” — established distinction; change-fence extension provisional:** Preserve the currentness distinction, especially for U4, where an authoritative carrier response may be stale for the customer’s question. Any additional change-fence wording should remain an extension of existing gates, not a new settled subsystem. **See F3 and F9.**
7. **Change-event coverage — open interaction question:** The wake table names timers, messages, tool results, configuration application, and observations. The parent should verify whether grant revocation/role change, live platform/compliance change, capability retirement, and policy/workflow notices are represented by existing event classes or need clarified contracts. **See F4 and F6; exact architecture sources are Section 8 §8.5 and §8.14.4.**
8. **Product behaviour versioning — open lifecycle detail:** Adjacent-Improvement is correctly separate, but the parent should decide what product behaviour/assembly context must be retained for in-flight reproducibility. **See F10.**

## 25. Dimension verdict

**Verdict: provisional pass.** The existing B-Story, B-Membrane, B-Memory, B-Visibility, Adjacent-Tool, Adjacent-Config, Adjacent-Improvement, and S/T/U model survives Dimension 2 as a logical decomposition. The stress test identifies candidate change-fence and temporal-view constraints, plus an open policy-change notice mapping, that must be reconciled before the dimension is treated as established.

The dimension does not currently justify a generic change subsystem. It does justify clarifying the existing interaction model and reconciling the qualified wording/coverage points listed above. **See F3, F4, F6, F8, F10, and F11.**
