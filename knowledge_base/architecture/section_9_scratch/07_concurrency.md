# Section 9 — Dimension 7: Concurrency

## Status

**Working scratch record — established local constraints; cross-boundary ordering and external-effect details remain open.**

This record stress-tests existing decisions. It does not amend canonical Sections 6–8 or promote a proposed Level 3 mechanism into a Level 2 decision.

## Dimension record

| Field | Record |
|---|---|
| **Force** | Messages, timers, tool results, human work, source changes and configuration changes can overlap while Tend is carrying one or more situations. Events may be repeated, delayed or delivered in an order different from the order in which the underlying facts occurred. |
| **Why it matters** | A stale proposal, duplicate side effect, lost result, superseded wait or misapplied policy can make the business act on an obsolete story. The product must remain safe without pretending that separate systems or situations share one transaction or one global clock. |
| **Affected responsibilities** | A — situation/version/graph; B — event ingress and routing; C/D/E — comprehension, gathering, trust and evidence; F/G — behaviour and authority; H — coordination and time; I/L — communication and channel rules; J/K — human/partner work; M — failure/recovery; N/Q — memory and configuration; O — visibility/audit; S/T/U — harness, authorization and security. |
| **Affected boundaries** | B-Story; B-Membrane; B-Memory; B-Visibility; Adjacent-Tool; Adjacent-Config; external platforms, business systems, people, partners and Time. |
| **Affected interactions** | Ingress routing and deduplication; per-situation wake/validation/commit; timer versus message; tool initiation/result/recheck; human response/approval; configuration application/revocation; external send/acknowledgement; single-event fan-out to multiple situations. |
| **Relevant invariants** | B-Story alone commits operational truth; coupled story changes commit together; a proposal must match the current story version at validation; timer wakes re-read the story and cannot send directly; claims retain source and time context; arrival order alone never chooses truth; grants are checked at effect boundaries; distinct situations remain distinct. |
| **Failure / uncertainty** | Duplicate or delayed delivery; reordered observations; stale evidence; proposal/version mismatch; overlapping approval or grant change; interrupted/unknown external effect; human work that becomes unnecessary; one event affecting several situations; unresolved source conflict. |
| **Tensions** | Freshness versus latency; single-situation coherence versus cross-situation atomicity; duplicate suppression versus preserving distinct observations; autonomous continuation versus changing human authority; traceable history versus a compact current view; internal atomic commits versus non-transactional external effects. |
| **Architectural consequence** | Treat concurrency as a set of scoped ordering and freshness obligations, not as a universal serialization guarantee. Maintain one current Tend story per operational problem, re-evaluate from the latest committed version, and keep external claims/effects and linked situations separately owned. Where ordering, atomicity or effect outcome is not specified, surface it for parent audit rather than infer a protocol. |

## 1. Meaning of “latest”

“Latest” has more than one scope. It must not be shortened to “last event received wins.”

| Scope | Current meaning supported by the sources | Not implied |
|---|---|---|
| **Tend operational truth** | The latest committed B-Story version for the situation is the current Tend-owned story. Earlier versions and claims remain historical evidence. A proposal is structurally checked against the situation version before execution. | A universal ordering of all events, or an atomic transaction spanning B-Story and another system. |
| **External fact** | A source claim has provenance and observation time. Whether it is current enough depends on claim type, authority, decision and consequence. Trust and Evidence—not delivery order or wall-clock recency alone—governs comparison. | “Newest arrival is true,” or that Tend has become the canonical source for a business system’s data. |
| **Time event** | A timer wakes B-Story; the loop reads the latest known situation/evidence and decides whether the scheduled behaviour still applies. | A timer directly performing its planned send, or time itself deciding which claim is true. |
| **Authority** | The authoritative grant/policy is read at the action boundary; authorization is checked before the effect and rechecked at each action boundary. | An earlier approval, cached context or historical grant snapshot authorizing a later effect after revocation. |
| **Business policy / workflow** | Level 2 evolution guidance distinguishes live facts, live platform rules, live grants and policies/workflows pinned at situation start with deliberate, attributed migration. | Applying every configuration change retroactively to an in-flight situation, or silently keeping a revoked grant active. |

Thus the established freshness rule is **latest committed Tend version plus decision-appropriate, provenance-bearing evidence and the applicable current authority**. It is not a global last-write-wins rule.

## 2. Race catalogue using U1–U5

| Unit | Concurrent events stressed | Established response | Concurrency gap / audit note |
|---|---|---|---|
| **U1 — Priya outreach** | Inbound reply arrives before or around the nurture timer; a send proposal may already exist. | Inbound plus nurture-wait supersession is one B-Story version. Timer wakes B-Story only, re-reads the latest version and no-ops when the wait is superseded. Egress also requires a version and explicit send decision. | The documented case settles the committed-reply-before-timer path. It does not spell out the exact cut between a final version check and an external send if a new inbound commits in that interval, nor the remote send/acknowledgement duplicate case. |
| **U2 — refund gateway silent** | Tool timeout, possible remote success, status/recheck timer, customer follow-up, retry proposal and eventual provider result overlap. | Initiation, unknown outcome and recheck wait are committed together. Unknown irreversible outcome waits inside the configured bound; no second new post is allowed while unknown. Same-key resend is allowed only when the other party honours that idempotency contract; after the bound, hand off rather than auto-redo. Tool results return as structured evidence for B-Story to interpret. | The exact event sequence when a late provider result races with a human action or another situation update is not specified. External tool effect and B-Story commit cannot be one shared transaction. |
| **U3 — investor diligence** | File-fetch/approval result and finance human-work result arrive independently; one ask may finish while the other remains open. | The two asks share a situation but may progress independently. Deck evidence can be sent while revenue remains open; each ask needs an honest ending before resolution. Human work and tool results return through their defined paths and B-Story versions. | The walkthrough does not define a general merge/ordering contract for two simultaneous results against the same version, or how a specific human approval becomes stale if the facts it reviewed change before effect. |
| **U4 — carrier tracking** | Carrier response may be stale or unavailable while customer evidence, partner investigation, a response deadline or a recheck timer arrives. | Preserve claims, source and currentness; a timer wakes B-Story to re-read state. Apply configured policy and evidence rules; do not present stale status as current fact or treat arrival order as conflict resolution. | Freshness thresholds, source-sequence interpretation and the precise ordering of multiple source observations remain claim/domain decisions. The sequence of separate situation versions when several responses race is not prescribed. |
| **U5 — capability/security** | An untrusted connected-system field proposes an export while grant/configuration or approval state may change; separately, the package-status case may discover that no tracking capability exists. | Untrusted fields remain data, not instructions. T2 authorization and invariant checks occur before an effect; effective grants are read live at each effect boundary. Capability absence is not a tool failure. | Section 6 labels U5 as T-A/T-B security validation; Section 8 §8.16.3 labels U5 as package-status/capability-absent and places T-A/T-B in the same walkthrough. Parent audit should reconcile this overloaded U5 label. The existing U5 tests do not settle a config-revocation race or stale human-approval rule. |

## 3. Same situation versus separate situations

### Same operational problem

- One situation is one operational problem and resolution path. Multiple channels, actors and business processes may contribute to that story; identity alone does not merge different problems.
- B-Story is the sole writer of operational truth. Other boundaries route, contribute evidence, derive views or perform externally owned work through contracts. A situation version and its change announcement are one unit; coupled unsafe-to-separate moves (for example inbound plus wait supersession, or initiation plus unknown plus wait) commit together.
- Section 8 specifies a single-flight B-Story wake per situation, a structured proposal/validation/execution cycle, and a situation-version match check. A stale proposal must not pass that check as if it described current state; it must be rejected/repaired rather than overwrite newer truth.
- A later claim adds to the record; it does not erase the earlier claim or version. Affected conclusions and pending work are re-evaluated. Acknowledgement is not completion, and a changed situation can make an existing assignment or wait unnecessary.
- Coordination’s duplicate-work answer is scoped: one story per problem, one responsible owner per human work item, the most authoritative source first, identical open waits attached rather than duplicated, and retries owned by Failure. It is not a generic rule to suppress every repeated observation.

### Separate or linked situations

- Separate operational problems keep separate models, versions, waits, owners, permissions and outcomes, even for the same person, order or incident. Links expose context; they do not propagate lifecycle or truth automatically.
- Independent situations need not wait for a global “everyone finished” point. A result is used when relevant and authoritative to that situation.
- One event may affect multiple situations. Each affected situation needs its own explicit update and reason; the shared event reference does not merge their stories. The exact cross-situation atomicity guarantee is explicitly not established.
- Therefore same-situation single-flight does not imply cross-situation serialization or an atomic multi-node update. Do not claim either.

## 4. Duplicates, ordering and stale proposals

| Case | Established rule | Remaining limit |
|---|---|---|
| **Repeated delivery of the same event identity** | Section 8 S12 specifies at-least-once delivery with a processed-event identity scoped to `(situationId, eventId)`; an already processed duplicate wake exits before PROPOSE. | The sources do not define how every source creates/stabilizes an event identity, how long deduplication state is retained, or whether two IDs carrying the same semantic event are recognized as duplicates. |
| **Duplicate business action** | S9/IB-8 reads the situation for a prior initiation before an irreversible effect; a second new refund post while the first is unknown is blocked. A same-key resend depends on the remote party’s idempotency contract. | This tool/action rule is not a universal deduplication rule for messages, sends, approvals or arbitrary capabilities. |
| **Identical wait / human work** | Coordination says attach to an identical open wait for the same subject, kind and purpose; Human Collaboration gives each work item one responsible owner. | Similar-looking asks are not automatically identical; business intent and work ownership still matter. |
| **Distinct events delivered out of order** | Keep provenance, event/observation time and claims; interpret through claim-specific authority, domain transitions and explicit conflict rules. The newest-arriving claim alone never wins. | No general reorder buffer, source sequence protocol, clock-skew rule or cross-source total order is settled. An older observation can be a valid earlier process stage, a correction, stale evidence or a real conflict; the domain rules decide which. |
| **Proposal built from an older situation version** | Section 8 structural validation includes situation-version match; per-wake flow validates before executing. Timer/outbound paths re-read latest B-Story state. | The logical stale-proposal rejection is established; commit/effect interleaving and retry scheduling are not specified as a persistence or locking protocol. |
| **New information while work is in flight** | Preserve earlier work/history; create a new situation version and re-evaluate affected conclusions, waits, approvals, actions and communications. Pending work may be cancelled, changed, transferred or escalated. | Exactly which in-flight operation can be withdrawn, compensated or must complete is action- and external-contract-specific. |

## 5. Configuration, approvals and authority races

Configuration is not one concurrency plane:

1. **Grants and authority are live.** Read the authoritative store at enforcement, not a cache; check before every effect and recheck at each action boundary. A grant’s valid holder and status at action time governs accountability. A revoked grant blocks the next gated effect.
2. **Business policies and workflows are pinned at situation start.** A change is noticed and may lead to deliberate, attributed migration; it does not silently rewrite the in-flight situation’s rule context.
3. **Facts and platform rules are live.** New facts can change a claim; changed platform rules can interrupt and wake a situation for re-evaluation.
4. **Memory/config candidates are not active authority.** Memory may propose a structured candidate; deterministic configurator tools apply registry changes. Section 8 marks the config-applied wake optional, while Level 2 policy evolution describes a notice wait for in-flight situations. These descriptions need parent reconciliation for wake/notice ownership and timing.

An approval or decision is not an independent license to execute later: the current grant/invariant check still occurs at effect time. The sources establish that an action requiring approval waits for the configured approver and that approvals are recorded; they do not provide a universal expiry, content-binding or refresh rule for approvals after facts change. Grant role changes during an action are explicitly open in Level 2. No concurrency policy should be inferred for an external effect already accepted by a provider when revocation arrives.

## 6. Established, provisional and open record

### Established

- **Single truth writer and local commits:** B-Story owns operational truth; atomic story moves keep safety-coupled fields together; write-and-announce is one unit.
- **Per-situation wake discipline:** Section 8’s wake contract includes recovery/single-flight per situation, version-match validation and one primary event consumer. This is a logical contract, not a specified implementation mechanism.
- **Timer freshness:** timers wake B-Story only. It re-reads latest situation state; a superseded nurture/release wait is a no-op, not a send or failure.
- **Known duplicate cases:** S12 deduplicates a processed event identity before proposal; S9/IB-8 protects the unknown irreversible refund initiation; identical waits and duplicate human ownership have their Coordination/Human Collaboration rules.
- **Evidence ordering:** source authority is claim-specific; record source and time; conflicts are preserved and resolved by explicit domain/business rules, further evidence or an authorized person, never merely by arrival order.
- **Local versus separate state:** separate problems remain independent, links do not propagate lifecycle, and all affected nodes need explicit updates.
- **Action authority:** authorization precedes the effect and is re-read at each effect boundary; business policies/workflows follow their pinned-and-deliberate-migration rule.

### Provisional or only partially specified

- The logical stale-proposal/version-match check is established, but exact interaction with interruption, commit conflict and effect start is not specified.
- Trace field names and some write-reason details remain provisional; the preservation/audit obligation is stronger than the schema.
- B-Visibility can lag; the exact freshness/lineage display is not a concurrency authority.
- Configuration application is deterministic in principle, but Section 8’s config event may optionally wake B-Story; exact affected-situation notice/re-evaluation path needs reconciliation with Level 2 policy evolution.
- Cross-boundary effect state is explicit for the U2 refund path; do not generalize that protocol to channel sends or all tools.

### Open

- Ordering among two or more distinct events/wakes for the same situation, including tie handling and source-observation time versus delivery time.
- The identity and retention contract for duplicates, and duplicate semantic events with different IDs.
- What a “current version” check guarantees if a new event commits after validation but before an external effect or send.
- Egress duplicate/unknown-delivery handling when a send may have succeeded but its acknowledgement is absent or delayed.
- Exact stale-approval behavior after facts, target, policy context, approver role or situation version changes.
- How an in-progress non-reversible effect is handled when a grant is revoked or relevant facts change after the last gate.
- Atomicity and recovery when one event affects several situation models.
- Which configured policy changes create immediate notices/wakes versus wait until the next event, and how that composes with optional `config_applied` wake.
- End-to-end event ordering/currentness thresholds for each external claim type; no universal source clock or freshness duration is set.

## 7. Rejected alternatives and trade-offs

### Rejected alternatives

- **Timer directly sends its scheduled message:** rejected; Time wakes B-Story, and B-Story decides from the latest state.
- **Multiple boundaries write operational truth:** rejected; ingress, tool, memory, visibility and configuration boundaries contribute through B-Story-owned contracts.
- **Last-arrival-wins for facts or conflicts:** rejected by Trust and Evidence; arrival time alone is not source authority or truth.
- **New retry initiation while an irreversible outcome is unknown:** rejected for U2; use the same idempotency key only under the external party’s contract, otherwise wait/recheck and hand off at the configured bound.
- **Merge all problems because they share a person/order, or propagate closure/waits through links:** rejected; separate operational problems have independent versions and lifecycle.
- **Pin all authority forever or apply every business policy retroactively:** rejected by Level 2’s distinct live-grant versus pinned-policy semantics.

### Trade-offs

- **Per-situation single-flight vs throughput:** protects a coherent story while allowing independent situations to proceed; exact queueing/coalescing behavior is not chosen here.
- **Preserve claims and versions vs compact state:** history and explanation survive corrections, at the cost of extra reconciliation and view complexity.
- **Freshness and live permission checks vs latency:** safer action decisions may require new reads or a human step; no stale-cache shortcut is permitted for authority.
- **Independent situations vs cross-node convenience:** prevents a linked problem from inheriting the wrong owner, permission or closure; a multi-node event may be partially applied until each node is updated, since atomicity is not settled.
- **Duplicate suppression vs evidence completeness:** repeat delivery of the same event identity can be harmlessly ignored after processing, while a new observation/correction must remain recordable even if its payload looks similar.
- **External atomicity limit:** Tend can atomically commit its own story move, but cannot assume that a provider or communication platform’s effect and acknowledgement commit with it.

## 8. Evaluation signals

- Replaying an already processed event identity does not create a second proposal, wait, work item or side effect; two distinct observations remain distinguishable and auditable.
- Permuting delivery order for the same set of claims does not cause “last arrival wins”; authority, observation time, domain transition and conflict policy explain the current interpretation.
- U1: if the inbound reply is committed before the timer evaluates, the superseded nurture does not send; the trace points to the version and wait state used.
- A proposal validated against an older situation version does not commit a newer-state decision or perform an obsolete effect.
- U2: an unknown irreversible refund remains waiting inside its bound, blocks a new initiation, accepts only contract-safe resend, and hands off rather than blindly repeats after the bound.
- U3: deck completion and revenue work can progress independently without losing either update, sending the wrong answer, or closing while a required ask remains open.
- U4: stale/unavailable carrier status remains attributed/degraded; a concurrent customer or partner claim is not erased, and response-deadline communication reflects current supported evidence.
- U5: untrusted content cannot widen authority; denial occurs before provider effect even if the proposal was formed before a concurrent grant change.
- Separate situations for the same person/order retain independent waits and outcomes; an event affecting two nodes creates explicit, separately traceable updates and does not silently transfer lifecycle.
- A changed policy/workflow or grant has the expected plane-specific effect: pinned context is not silently rewritten, while a revoked grant cannot authorize the next action.
- Egress acknowledgement loss and concurrent send-trigger replay are measured as unresolved until a channel-neutral delivery/duplicate contract is defined; no pass criterion should assume exactly-once external delivery.

## 9. Revisit conditions and parent-audit questions

1. Specify the logical ordering contract for concurrent same-situation events beyond “single-flight” and version-match validation. What is the accepted order when two inputs race, and what evidence records that order?
2. Define source event identity and duplicate scope sufficiently to distinguish replay of one delivery from two separate but similar observations, without discarding corrections.
3. Reconcile **latest situation version** with external claim currentness: which claim types need source revision/observation-time comparison, what if clocks disagree, and when does a claim become too stale for a given action?
4. Define the safety boundary between final validation and an irreversible effect/send. What can be rechecked, and what remains an unknown external outcome after the effect may have landed?
5. Carry forward the D5 gap: Section 8’s egress gates prevent known stale sends but do not define duplicate/unknown-delivery behavior when a platform acknowledgement is lost.
6. Decide whether and how approvals are tied to the facts/action/version reviewed, and what happens when the situation or approver role changes before the effect. Do not conflate the approval artifact with the live grant check.
7. Reconcile policy-change notice waits with the optional `config_applied` B-Story wake. Distinguish policy/workflow migration from live grant revocation and live platform-rule changes.
8. Decide how one event that changes multiple linked situation nodes is recovered if one node commits and another does not. Do not imply cross-node atomicity until established.
9. Clarify the intended U5 naming in Sections 6 and 8: security validation vs capability-absent package-status walkthrough.
10. Keep Level 3 persistence, locking, event delivery, compaction and retry scheduling out of the current architecture decision unless a parent construction unit specifically requires them.

Revisit this record when simultaneous same-situation inputs, lost/delayed egress acknowledgements, source ordering/currentness, live authority changes during an action, policy migration, cross-situation fan-out or stale human approval is tested as a construction unit—or when any Section 6–8 contract changes.

## 10. Evidence paths and sections

### Product and Level 1

- `knowledge_base/Product_Vision.md` — §1 “What is Tend?”; §6 “The principles behind Tend” (understand before acting, never guess, predictable decisions, explainability, traceability, fail safely).
- `knowledge_base/Level1_Problem_Framing_or_Expansion.md` — §2 assumptions (business knowledge changes; messages/events/time wake situations; information can conflict); §4 “Time”; §6 interactions (event, system update, approval, time, configuration); §8 product invariants (decision uses information available at that moment; later information may change it; explainability, traceability, human approval).

### Established architecture and adjacent Section 9 records

- `knowledge_base/architecture/section_6_responsibility_model.md` — §6.3 situation graph/split-link rules; §6.4 Groups A/B/D/E/F/G/H/J/M/N/Q/S/T/U; §6.6 U1–U5; §6.9 state ownership; §6.10 open questions.
- `knowledge_base/architecture/section_7_boundary_model.md` — §7.3 versioned story and sole operational-truth writer; §7.10.1 and §7.10.5 U1 timer/reply contracts; §7.11.1–§7.11.5 U2 unknown refund, idempotency and atomic move; §7.12.1 B-Story; §7.12.9 cross-cutting gates; §7.13 boundary graph.
- `knowledge_base/architecture/section_8_interaction_model.md` — §8.2 invariants; §8.3 per-wake single-flight contract; §8.4 version-match validation; §8.5 routing and S12 dedup; §8.8 IB contracts; §8.9 sole writer/atomic move catalog; §8.10 egress gates; §8.11 human work; §8.12 tool idempotency and fetch-time approval; §8.13 timer/message and unknown-outcome races; §8.14 configuration apply; §8.15 trace/completion; §8.16.1–§8.16.5 U1–U5 walkthroughs.
- `knowledge_base/architecture/what_is_already_settled.md` — “When a message arrives”; “Permission”; “What a sentence can do”; “A carrier that is down, and a business that cannot ship”; “Leave these closed”; “Leave these open.”
- `knowledge_base/architecture/section_9_scratch/05_consistency.md` — consistency matrix; stale worker/timer, duplicate event, external effect/egress and configuration tensions; §“Claims requiring parent-agent correction or explicit carry-forward.”
- `knowledge_base/architecture/section_9_scratch/06_state_lifecycle.md` — §5 coexistence/fan-out and independent lifecycle; §7.1–§7.3 interruption, timer race and in-flight change; §10 D6-7/D6-8; §14–§18 explicit open cross-node atomicity and D7 dependency.

### Level 2 coordination, time, decisions, failure, evidence and authority

- `knowledge_base/Level 2/coordination/how_do_we_prevent_duplicated_work.md` — “The short answer”; “What Coordination actually owns: the wait registry.”
- `knowledge_base/Level 2/coordination/how_do_independent_actors_work_together.md` — “Our answer”; “How the interaction actually flows”; “Two things that keep actors safe together.”
- `knowledge_base/Level 2/coordination/how_do_multiple_business_processes_interact.md` — “What happens when two processes touch the same situation.”
- `knowledge_base/Level 2/coordination/how_do_we_coordinate_long_running_work.md` — “What actually happens between the entries”; independent waits and Time boundary.
- `knowledge_base/Level 2/human_collaboration/how_do_we_handle_multiple_people_working_on_the_same_situation.md` — “One situation can contain several work items”; “When information changes”; “What this question does not settle.”
- `knowledge_base/Level 2/gathering_information/how_do_we_handle_information_that_changes_while_a_situation_is_being_analysed.md` — “Same situation, new version”; “Changes to source records and claims”; “What this question does not settle”; “Our working decision.”
- `knowledge_base/Level 2/time/how_should_scheduled_work_begin.md` — “How scheduling is represented”; `knowledge_base/Level 2/time/how_should_tend_react_when_time_changes_the_situation.md` — “What ‘react’ does not mean”; `knowledge_base/Level 2/time/when_should_waiting_end_automatically.md` — “Our answer.”
- `knowledge_base/Level 2/decision_making/how_do_we_ensure_consistent_next_behaviour.md` — “Our current answer”; “Working decision.”
- `knowledge_base/Level 2/failure/how_do_we_recover_after_failures.md` — retry, unknown outcome and “What is decided, what is open.”
- `knowledge_base/Level 2/trust_and_evidence/how_do_we_resolve_conflicts.md` — “Resolution order”; “Conflicting authoritative sources”; “Versioning and correction”; “What this question does not settle.”
- `knowledge_base/Level 2/trust_and_evidence/what_makes_one_source_more_authoritative_than_another.md` — “Working decision”; currentness and authority limits.
- `knowledge_base/Level 2/authority_and_ownership/when_is_tend_allowed_to_perform_an_action.md` — “The key precision: the check happens before the effect.”
- `knowledge_base/Level 2/authority_and_ownership/when_must_tend_ask_for_approval.md` — execution-time approval and approval path.
- `knowledge_base/Level 2/authority_and_ownership/how_does_a_grant_end_and_how_does_role_change_affect_authority.md` — “Grant lifecycle”; “What remains open.”
- `knowledge_base/Level 2/growth_and_evolution/how_do_we_evolve_tend_without_breaking_existing_businesses.md` — “The rule context”; “Three walkthroughs”; “Why not the other two options”; “Working decision.”
