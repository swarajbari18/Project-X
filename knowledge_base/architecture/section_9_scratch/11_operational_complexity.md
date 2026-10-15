# Section 9 scratch — Dimension 11: Operational Complexity

**Assigned dimension:** Dimension 11 — Operational Complexity | **Scope:** Coordination burden across independent situations, responsibilities, boundaries, actors, waits, partial failures, recovery and diagnosis. This is logical-operational stress, not a proposal about services, deployment, infrastructure, or premature reduction of the architecture.
**Status:** **Provisional — the core ownership, independence, wait, failure and interaction rules are substantially established and exercised in U1–U5; end-to-end operating cost, default thresholds, several protocols and the Section 6/8 U5 label conflict remain open.**

This is a Section 9 working record. It does not amend canonical Sections 6–8 or Level 2 method files.

## 1. Construction question

How much coordination does Tend need to preserve one honest, safe operational storyline when independent people, systems, channels and processes produce asynchronous or partial results—and how can that coordination remain inspectable without making unrelated work wait, making failures indistinguishable, or turning every handoff into hidden coupling?

The dimension is not “how many components can be removed.” It asks whether each real interaction has an owner, a bounded contract, a recoverable state transition and an explainable consequence. It is related to, but distinct from, Dimension 10 — Scaling: D10 tests increasing quantity and diversity; D11 tests the coordination and diagnosis burden of a path, including at small scale.

## 2. Force and U1–U5 stress

Tend is responsible for work that crosses system, actor, channel and time boundaries, often without a continuously attending human. Each actor owns only part of the work; source facts, permissions, delivery status and human availability can change independently. Tend must join those partial views into a situation, keep each ask and wait alive, choose safe next steps, and explain what happened. The complexity is inherent in preserving responsibility across asynchronous boundaries—not evidence that every business process needs a separate coordinator.

| Unit | Operational complexity exposed | What must remain independent / coordinated |
|---|---|---|
| **U1 — Priya outreach** | A list instruction fans out into separate person-level situations, with an assignment aggregate. Replies can race nurture timers; different people need different next steps. | Each person’s story and wait advances independently. The aggregate summarizes but does not replace the child situations. Inbound and wait supersession commit together; a stale timer is a no-op, not a second send. |
| **U2 — commercial lifecycle / silent refund gateway** | Inquiry, order, delivery issue and refund are related but not one undifferentiated record. A carrier may be stale while a refund effect has an unknown outcome; the latter can be irreversible. | Link related operational problems without merging their truth. Keep stale/slow, declared failure and unknown effect distinct. Block a second new refund post, preserve the existing wait, and do not auto-redo an unconfirmed irreversible action. |
| **U3 — investor request** | A request contains parallel asks with different evidence, permissions and completion times. One cleared answer may be useful while another remains open. | Partial fulfilment is allowed when the committed story says so. External communication follows material situation changes, not tool traces; visibility remains audience-scoped. |
| **U4 — unreliable carrier API** | A registered source can be stale, unavailable or past its bound; partner investigation and customer updates can add more waits and handoffs. | A slow/down path is not “no capability.” Keep source evidence, declared failure, partner work, customer-facing state and internal trail distinct; follow configured escalation rather than a hard-coded recipient order. |
| **U5 — package status with no shipping source** | A registry match alone is insufficient: a person may still be able to answer. | Ask whether an appropriate person can serve the ask before declaring capability-absent. If neither a system nor a person can answer, end the ask honestly; do not substitute payment data or label absence as a failure. |

These units exercise different forms of coordination: fan-out and concurrency (U1), linked lifecycle and unknown external effect (U2), partial completion and audience-specific egress (U3), bounded failure and partner escalation (U4), and source/person matching with honest capability absence (U5). They do **not** establish a fixed maximum number of handoffs, active waits, open asks or actors per situation.

**U5 numbering discrepancy to preserve:** Section 8 §8.16.3 and §8.18 use U5 for package-status capability absence, and §8.18 says the U1–U5 walkthroughs are complete. Section 6 §6.6 still labels U5 “Security validation (T-A / T-B)”; Section 6 §6.4 calls tool-catalogue integrity U5 and T-A/T-B release gates U6 “(U5 scenario),” while Section 8’s status also refers to “U5 security mapping.” Treat T-A/T-B as important separate security stress evidence, but do not silently relabel either scenario. Parent reconciliation is needed before a canonical test index relies on U5 by name.

## 3. Affected responsibilities, boundaries and interactions

### Responsibilities

Operational complexity touches the responsibility catalog as a connected system, not as a new responsibility owner:

- **A–B, C–E:** represent and link one problem, route events, understand the ask, gather source-owned claims, preserve provenance and compare conflicts.
- **F–G and T–U:** choose a next behaviour within current authority; keep decision, permission, tenant and security checks separate and enforced at the relevant gate.
- **H–I and L:** maintain waits and liveness, prevent duplicate work, recover from interruption, decide when a situation delta should be communicated, and respect channel rules.
- **J–K:** create and route human work, retain one responsible owner per item, distinguish acknowledgement from completion and unavailability from silence, transfer context/authority safely, and treat meetings and partners as specialized waits/escalations.
- **M:** classify the failed path and consequence, preserve the declared outcome, and coordinate safe recovery without conflating failure with uncertainty or capability absence.
- **N–O and R:** serve scoped knowledge, derive business artifacts, explain actions/outcomes and observe system behavior without making a projection or learning trace operational truth.
- **P–Q and S:** represent available capabilities/configuration and apply deterministic per-wake, validation, idempotency and completion controls.

The responsibility catalogue is intentionally more fine-grained than the major boundaries. That creates a coordination-accountability requirement: responsibility IDs must compose through explicit interactions rather than imply independent runtimes or a new owner for each category.

### Boundaries and adjacent concerns

Section 7 accepts four logical boundaries, with materially different maturity:

| Boundary / adjacent concern | Coordination responsibility and operational cost |
|---|---|
| **B-Story — established** | Owns the versioned situation and its advancement; brings comprehension, gathering, decision, waits, human/partner work and story-level failure into one truth-writing domain. It receives routed events, timers and human/tool results, then emits committed versions. This is the central coordination point, not a global coordinator across all situations. |
| **B-Membrane — established** | Routes ingress and expresses permitted egress. It depends on B-Story for selected situation and committed send intent, and on channel/authorization rules at send time. It must not create business truth, send from a timer alone, or narrate tool traces. |
| **B-Memory — serve established; learn path provisional** | Supplies scoped context on a wake; observes traces asynchronously. Serve affects the story’s available context; observation/learning must not block a truth commit or rewrite facts, grants, policy or story truth. |
| **B-Visibility — provisional** | Derives read-only situation, owner and work views from committed evidence. It adds a useful operational surface but creates lag/freshness, role-scoping and projection correctness questions. It is not another truth writer or authorization source. |
| **Adjacent-Tool / capability harness** | Performs bounded invoke/retry and side-effect controls; returns structured evidence to B-Story. Story semantics, durable wait and external effect cannot be collapsed into “tool succeeded.” |
| **Adjacent-Config / Adjacent-Improvement** | Deterministic configuration apply and product-learning fan-out remain adjacent concerns, not established Section 7 boundaries. Improvement traces are not business memory or live policy. |

### Interaction paths

The standard B-Story wake is WAKE → RECOVER → PROPOSE → joint VALIDATE → fixed EXECUTE path → UPDATE (with write-and-announce) → REST. This is an established logical discipline, not a claim that every wake crosses every boundary. The interaction cost varies by behaviour:

1. An external event enters through the membrane, is routed and wakes B-Story with tenant context; a timer wakes B-Story directly and cannot itself send.
2. A gather/invoke may cross to memory and/or the adjacent tool harness. Tool output is evidence returned to B-Story, not a competing write to situation truth. Authorization is checked at enforcement points, including the tool/effect or egress gate.
3. A wait is recorded on the situation and in the book of waits; Time supplies its trigger/check-in and wakes the affected situation. A human or partner response re-enters through ingress and the situation loop.
4. Communication intent is committed to the story; B-Membrane sends it after latest-version and policy/channel checks. B-Visibility and asynchronous observers consume versions/events without becoming story writers.

This keeps independent situations from sharing a global process lock, while making each situation’s interactions explicit. The number of per-wake steps is named; the number of boundary/actor handoffs per complete operational path is not fixed in the reviewed evidence. **No evidence-backed coordination budget or acceptable maximum is established.**

## 4. Invariants that bound the complexity

1. **One operational problem, one versioned situation truth.** Link related situations explicitly; identity or a common channel alone does not merge them. A derived aggregate never replaces its child stories.
2. **B-Story is sole writer of operational truth.** Story changes and their announcements are atomic; tools, membrane, memory and derived views cannot silently co-write truth.
3. **Actors and situations remain independent.** Results land on the relevant situation; unrelated situations do not wait for an all-actors/global completion barrier.
4. **Every active wait has a subject, reason, timing class, resume trigger, release policy, escalation path and visibility.** Situation-level check-in is the periodic liveness backstop; ordinary progress is event-driven, not polling.
5. **A timer is a wake, not a business decision.** Re-read the latest situation version before an action; superseded work is a no-op.
6. **Truth, authority, policy and capability are distinct.** A claim does not authorize an action; facts and grants are read according to their currentness rules; business rules/workflows use explicit version semantics; no capability is not the same as a failed path.
7. **Failure and uncertainty are declared from evidence and bounds.** Do not infer failure from model unease, call every unknown a failure, or keep a dead path as a valid wait after its bound.
8. **Irreversible unknown outcomes are not auto-redone.** Idempotency/status-check behavior depends on the external contract; absent confirmation at the configured bound hands off rather than guesses.
9. **Human responsibility is explicit.** One owner per human work item; acknowledgement is not completion; handoff remains pending until accepted/allowed auto-accept; authority is not transferred merely because work is.
10. **Completion is checked across asks and work.** No open ask, required human work, unsupported customer claim or capability-absent-as-success is hidden by a convenient partial answer.
11. **Every important action, recommendation and failure remains explainable and reconstructable at permitted audience depth.** Preserve evidence/decision reasons unconditionally; expose only need-to-know detail and never make hidden chain-of-thought a control dependency.

## 5. Failure and uncertainty model

Complexity becomes unsafe when multiple distinct states are collapsed into one generic “error,” “pending,” or “done.” The current evidence requires at least these logical distinctions (without fixing a Level 3 field schema):

| Distinction | Safe interpretation |
|---|---|
| **Unknown / conflicting / ambiguous / stale / inaccessible** | Knowledge/evidence state; it does not itself say the source path failed. The next safe behaviour may differ by ask and consequence. |
| **Wait inside its bound / failure after bound** | Same unresolved path at different points in its recorded contract. Crossing the bound declares failure and makes the path unusable; time does not establish the business fact. |
| **Transient failure / terminal failure / unknown effect** | Retry only a known transient under a bounded deterministic policy; route terminal failure; investigate an unconfirmed side effect without repeating it unsafely. |
| **Capability absent / capability unavailable** | Absence means no system **and** no suitable person can serve the ask. A registered but stale/down system is an operating/failure path; a capable person means human work, not an absence declaration. |
| **Waiting / blocked / completed** | Waiting has a resume trigger; blocked has exhausted safe routes and must surface; completed is closed only after ask/work/evidence checks. A later event is not silent resurrection. |
| **Human unavailable / human non-responsive / acknowledged / completed** | These are different delivery, availability and work states. Coverage/authority is checked before reassignment; silence never counts as completion. |

**Recovery burden:** The system must preserve enough chronology to reconstruct what was requested, what source/path was used, what bound was crossed, what is known/unknown, what side effect may have happened, who owned the work, and why the next path was selected. That record must support retry safety, human escalation and audience-appropriate explanation without leaking restricted details. The design places retry/backoff and operation-specific outcomes in the deterministic tool layer, while situation-level failure triage and responsibility remain in the story/Failure machinery. The distinction is necessary but creates a diagnosis handoff that must itself stay traceable.

## 6. Tensions and consequences

| Tension | Evidence-backed trade-off | Consequence if mishandled |
|---|---|---|
| **Boundary independence vs interaction cost** | Membrane, memory, views, tools and providers have separate ownership because their change, authority and lifecycle rules differ. The resulting handoffs must be explicit, versioned and observable. | Over-coupling lets a channel/tool write story truth or block unrelated work; under-specified handoffs create lost events, duplicate effects, stale sends and unowned waits. |
| **B-Story breadth vs atomic correctness** | Situation substrate and worker are merged because U1/U2 atomic moves (e.g. inbound + wait supersession; initiation + unknown outcome + wait) need one ownership domain. This lowers cross-boundary consistency coordination, while concentrating many responsibilities/change concerns in B-Story. | Prematurely splitting the writer/worker or moving a partial truth write outward risks double writers and fractured commits. Ignoring the breadth may hide maintainability or operational burden; evidence does not yet show that this accepted boundary is failing. |
| **Independent progress vs coherent aggregation** | U1 needs independently advancing person-level stories and an assignment aggregate; U2 needs related but distinct operational problems; U3 permits partial fulfilment. | Flattening creates cross-topic truth/authority leakage or holds unrelated work hostage. Excessive linking/aggregation can produce confusing duplicate state and explanation burden. |
| **Durable diagnosis vs cognitive/visibility load** | Trace, reason, evidence and declared outcomes are preserved, while explanation and view depth are recipient-specific and artifact-first. | Too little record prevents recovery and accountability; exposing raw tool traces, secrets or internal reasoning burdens recipients and violates need-to-know boundaries. |
| **Liveness vs interruption/noise** | Waits, check-ins, deadlines and escalations prevent silent abandonment; significance filters and communication rules prevent every internal transition becoming a message. | Missing/poorly configured bounds allow forgotten work; aggressive defaults create unnecessary human interruptions, repeat notifications and false urgency. |
| **Business variation vs predictable safe behavior** | Typed, versioned configuration and constrained workflows permit variation without free-form executable policy; active situations pin policy/workflow context while facts and grants remain live. | Unbounded customization makes behavior hard to validate and attribute. In-flight change semantics and migration notices add version/review work. |
| **Partial progress vs closure discipline** | U3 permits a cleared deck to be sent while revenue remains open; each ask still needs an honest ending and closure is checked. | “All-or-nothing” delays useful answers; premature closure hides missing asks, pending human work or unresolved high-consequence conflict. |

Overall consequence: operational complexity is intentionally paid at explicit seams so work can remain independent, recoverable and accountable. Removing a seam without preserving its owner, contract and failure path is not an evidence-backed simplification. Conversely, the existence of a responsibility ID or interaction contract alone is not evidence that it needs a separate runtime or independent process.

## 7. Status ledger

### Established by current evidence

- A situation model is the coordination record for one operational problem; independent actors/processes contribute results there and the decision loop combines relevant results. There is no separate process coordinator or “wait for everyone” barrier.
- Four major logical boundaries are accepted: B-Story and B-Membrane established; B-Memory serve established; B-Visibility provisional. Capability tools, configuration apply and product improvement are adjacent concerns, not additional Section 7 boundaries by default.
- B-Story sole-writer/atomic-commit behavior, per-wake lifecycle, timer re-read, wait registry and event/check-in liveness are established interaction constraints.
- Failure recognition is deterministic bound-crossing; uncertainty is not failure; failure is recorded with evidence/reason; retry is bounded and deterministic; unknown irreversible effects are not automatically repeated.
- Human work uses one responsible owner, explicit lifecycle and scoped context; meeting is a specialized wait, not a competing lifecycle model; escalation/availability/acknowledgement distinctions are established conceptually.
- The U1–U5 walkthroughs in Section 8 cover fan-out/races, unknown refund result, capability absence, partial investor fulfillment and unreliable carrier/partner escalation. This statement is subject to the U5 numbering discrepancy in §2 above.

### Provisional

- B-Visibility derive path, freshness/acceptable lag, owner significance and final artifact layout.
- Human-work item field enum and ingress MEANING artifact schema (HC-2); learning/promotion beyond B-Memory’s serve and must-not rules; configuration apply flow.
- Trace field names, observer-loop implementation, canary/sampling/alert thresholds and completion-checker implementation. Preservation and completion invariants are stronger than these proposed mechanics.
- Exact operational effect of composing the established controls across many simultaneous waits, human escalations, partial asks and multi-boundary failures has not been demonstrated as a quantified end-to-end burden.

### Open questions supported by the evidence

- What happens when the business has not configured a wait bound, response promise, resolution promise or check-in period? What defaults are safe by business/context without silently promising too much?
- What are the business-specific retry, poll, settle, reminder, escalation and meeting-intent expiry values? How do configured paths handle unavailable, non-responsive, rejected, reassigned and exhausted owners without duplicating policy across Coordination, Failure, Human Collaboration and Meetings?
- What is the usable join between verified identity and authority, and which names/roles/queues/schedules/availability sources make human routing reliable? The settled page explicitly leaves identity-to-authority joining and fallback routing open.
- What owner/business and builder/admin views make the durable record diagnosable without exposing internal details? Exact projection fields, freshness and anomaly thresholds remain provisional/open.
- How will combined operation be assessed for “too many” boundary/actor handoffs, open waits, parallel asks, retries or unresolved ownership? No coordination budget, metric target or acceptance threshold is present in the reviewed evidence; inventing one here would turn a candidate evaluation signal into a policy.
- Which interaction/schema changes need compatibility or migration treatment when a capability, channel, policy or workflow changes during long-running work? Growth establishes the four change planes, but migration-notice defaults and catalog contents remain open.
- Resolve the U5 scenario/security label collision before treating a numbered U1–U5 suite as an unambiguous regression index.

## 8. Rejected alternatives and evidence-backed simplifications

### Rejected in the architecture or Level 2 material

- **A process-level coordinator for every business workflow / a global barrier waiting for all actors:** processes and actors interact through the situation record and independent waits; no global “everyone finished” state is required.
- **Separate situation truth substrate from the writer, or let the membrane/tool co-write story truth:** rejected for split atomicity/double-writer risk (Section 7 boundary decisions and Section 8 invariants).
- **A single control owner for story loop and grants, or a timer that directly sends:** rejected; story advancement, enforcement and egress have distinct owners/gates.
- **Keep waits only in the model’s transient context, poll for ordinary situation progress, or infer timer means send:** rejected because it breaks liveness, traceability or latest-state safety. Check-in is a backstop, not a reason to poll every dependency.
- **Treat a person/customer identity, list, payment record or conversation as one undifferentiated story:** rejected in favor of independent operational situations and explicit graph/assignment links.
- **Treat missing capability as failure, stale/down source as capability absence, or payment evidence as a package-status answer:** explicitly rejected by D8/O10 and U5/U4 contrast.
- **Automatically repeat irreversible unknown actions, let the LLM run retries/authorization, or count acknowledgement as completion:** rejected in Failure and Section 8.
- **Stream tool traces or receipt filler externally, or force all asks to finish before any useful partial answer:** rejected by the situation-delta egress ruling and U3.
- **Free-form business-authored executable rules or LLM-led automatic connector authoring:** rejected in Growth and Evolution; typed/product-bounded configuration and product-owned capability authoring protect invariants.

### Simplifications already supported (do not reopen as unresolved design choices)

- Use **one shared situation coordination record and decision loop** for independent actor/process results; do not create a separate “process coordinator” concept without new evidence.
- Use **one conceptual wait spine** across actor, state-change/watch and time/meeting waits. Meetings specialize its subject/outcome; Coordination and Time do not need competing wait models.
- Keep **four states** (running, waiting, blocked, completed) and distinguish state from decision intent; do not create a new state for each actor, timer or error category.
- Keep **one responsible owner per human work item**; additional contributors, approvers, informed people and handoff events do not mean multiple accountable owners.
- Keep the **derived person/assignment/business view read-only**; it is an aggregation, not a second source of operational truth.
- Keep memory observation asynchronous to story commit; a learning/visibility consumer must not block B-Story’s operational-truth write.
- Keep B-Story’s situation substrate and writer together on current evidence: the boundary is deliberately broad to preserve atomic situation transitions. Do not split it just to make the responsibility list look smaller.

These are simplifications of *coordination semantics*, not claims that implementation will be simple or that each behavior is a single component.

## 9. Evaluation signals (proposed observations, not thresholds)

Use traces and completed-situation reconstruction to evaluate burden. Section 8 establishes the trace-preservation obligation, split VALIDATE diagnostics, and the completion-discipline invariant. The trace field schema and completion-checker implementation remain provisional, as does IA-20's two-hull attribution model. The following are candidate measurements, not new required fields or SLOs:

- **Coordination count:** boundary and actor handoffs per wake and per completed situation; waits, open asks, concurrent owners/participants and cross-situation links per journey. Segment by U1–U5-like path so fan-out, partial fulfillment and recovery are not averaged together. No target maximum is set here.
- **Independence:** unrelated situations continue despite another’s wait/failure; one inbound reply cancels only its superseded work; one tenant/person/problem cannot alter another’s state or visibility; assignment/person projections never become dependencies for child-story progress.
- **Wait/recovery integrity:** lost or duplicate wake rate; time from trigger/bound crossing to re-evaluation and recorded outcome; interrupted-run recovery from latest version; stale timer sends; duplicate irreversible effects; retries/polls after their bound; unknown outcomes left without a next owner.
- **Failure classification and diagnosis:** mistaken failure-vs-uncertainty and failure-vs-capability-absence classifications; ability to identify the failed path, latest known state, bound and cause; ability to attribute provider vs harness behavior; time/steps required for an authorized operator to reconstruct and choose the next safe action.
- **Human-work cost:** unowned items, acknowledgement-to-completion gap, unavailable vs non-responsive misroutes, duplicate assignments, transfer acceptance gaps, exhausted escalation paths, number of avoidable interruptions, and cases where a person lacks required authority/context.
- **Outcome integrity:** asks completed/ended honestly, partial answers emitted only from committed state, incomplete stories incorrectly closed, customer claims lacking evidence, and blocked/waiting work invisible to the right business role.
- **Explainability/access:** authorized users can explain why a decision/action/failure occurred and what will happen next; restricted information is not exposed to customers, partners, employees or admins without entitlement.
- **Evolution burden:** in-flight situations can identify the policy/workflow version governing each step; change notices and deliberate migrations are visible; new or retired capabilities do not silently alter unrelated live situations.

Observed coordination counts should be paired with consequence and outcome quality: a larger handoff count is not automatically a defect if it preserves authority, independent progress or safety; a smaller count is not automatically simpler if it hides coupling or erases accountability.

## 10. Revisit conditions

Revisit this record when one of these evidence conditions occurs:

- An end-to-end test or production reconstruction shows lost, duplicated, misrouted or unowned work across the committed U1–U5 paths, or reveals a routine case that the current explicit contracts cannot represent.
- Repeated failures show that a cross-boundary handoff has no single accountable owner, incompatible versions, incomplete recovery context, or no way to distinguish structural rejection from authorization denial or external-path failure.
- Measured handoff/recovery/diagnosis burden shows the established B-Story breadth, wait spine, membrane split or derived-view model is operationally unworkable **without** weakening single-writer truth, authority, liveness, audience scoping or situation independence.
- New human routing/meeting evidence shows that the conceptual one-owner / wait-spine model cannot represent real coverage, transfer, participant intent or authority safely.
- Business variation or capability evolution repeatedly requires unsupported free-form behavior, silent in-flight migration, or a new behavior owner; reassess the product/config boundary rather than adding unbounded exceptions.
- Trace reconstruction or observer findings cannot reliably distinguish provider, harness, source, story-state, authority and human-response causes, or the business-visible view hides material waiting/failure while builder traces are adequate.
- The Section 6/8 U5 numbering conflict is reconciled and the regression set is renamed/updated coherently.

Do not revisit merely because the responsibility catalog is long, because there are many actors/systems, or because an implementation could be drawn with fewer boxes. Require evidence of duplicated ownership, unsafe coupling, unbounded operational burden or failed evaluation.

## 11. Evidence register

Paths and sections below are the load-bearing evidence for this dimension. Where files have no formal numeric sections, the exact document heading is named.

### Product intent and Level 1 framing

- `knowledge_base/Product_Vision.md` — §1 “What is Tend?” (agency and operational coordination across actors/systems/time); §3 “Why existing software does not completely solve these problems”; §4 “What Tend does differently”; §6 “The principles behind Tend” (explain, trace, fail safely, predictable decisions); §8 “What success looks like” (owner-facing artifacts).
- `knowledge_base/Level1_Problem_Framing_or_Expansion.md` — §2 assumptions (“Information is distributed,” “No single source…,” “Some situations require human judgement,” “Tend must continue work without a new prompt,” “artifacts, not only conversations”); §6 interactions; §7 system boundaries; §8 product invariants; §9 failure classes including inaction and unexpected situations; §10 Scaling Dimensions.

### Canonical architecture evidence

- `knowledge_base/architecture/section_6_responsibility_model.md` — §6.3.2–6.3.4 (operational-context links, split/link, closure); §6.4 Groups H, I, J, K, M, N, O, P, Q, R, S, T and U; §6.6 U1–U5 validation; §6.7 responsibility relationships; §6.9 state ownership; §6.10 open questions.
- `knowledge_base/architecture/section_7_boundary_model.md` — §7.3 operational truth in the situation model; §7.7 accepted boundaries and maturity; §7.8.2 rejected alternatives; §7.10 U1 and §7.11 U2 boundary walkthroughs; §7.12.1–7.12.6 boundary decision records (B-Story, B-Membrane, B-Memory, B-Visibility and adjacent concerns); §7.12.9 distributed gates.
- `knowledge_base/architecture/section_8_interaction_model.md` — §8.2–8.5 invariants, per-wake contract, joint VALIDATE diagnostics and wake routing; §8.6–8.9 HC/AC/story contracts and atomic commits; §8.10–8.13 egress, human work, tool invocation and temporal races; §8.14–8.15 derive/memory/trace/observer/completion; §8.16.1–8.16.5 U1, U2, U5, U3, U4 walkthroughs; §8.17 anti-patterns; §8.18 completion/status checklist.
- `knowledge_base/architecture/what_is_already_settled.md` — “The job”; “The story and the message that leaves it”; “When a message arrives”; “What learning may change”; “When someone outside hears from Tend”; “Permission”; “A carrier that is down, and a business that cannot ship”; “Leave these closed”; “Leave these open.” Particularly load-bearing: one situation per person on a supplied list, partial investor fulfilment, fetch/refund permission checks, carrier failure vs capability absence, and open routing/bound defaults.

### Level 2 Coordination, Failure, people and evolution

- `knowledge_base/Level 2/coordination/understanding_all_coordination_questions.md` — four states, category boundaries, Coordination-vs-Time split and remaining open questions.
- `knowledge_base/Level 2/coordination/how_do_independent_actors_work_together.md` — situation model as shared coordination record, actor independence, traceability and visible agency.
- `knowledge_base/Level 2/coordination/how_do_multiple_business_processes_interact.md` — processes meet through the situation; no separate process coordinator.
- `knowledge_base/Level 2/coordination/how_do_we_coordinate_long_running_work.md` — durable per-situation waits/check-in and U1 thirty-person fan-out.
- `knowledge_base/Level 2/coordination/how_do_we_know_a_piece_of_work_is_still_active.md` — running/waiting/blocked/completed and structural liveness.
- `knowledge_base/Level 2/coordination/how_do_we_represent_work_that_is_waiting.md` — wait record, three wait subjects, resume/release/escalation/visibility fields, response vs resolution promise, system-owned durability.
- `knowledge_base/Level 2/coordination/how_do_we_prevent_duplicated_work.md`, `how_do_we_recover_interrupted_work.md`, and `how_do_we_represent_work_that_is_blocked.md` — single ownership/idempotency, restart/re-discovery and exhausted-path semantics.
- `knowledge_base/Level 2/failure/understanding_all_failure_questions.md` — category map, triage order, retry/idempotency/circuit-breaker safety floor and open values.
- `knowledge_base/Level 2/failure/how_do_we_recognise_failure.md` and `how_do_we_distinguish_failure_from_uncertainty.md` — deterministic bound crossing and path-usability distinction.
- `knowledge_base/Level 2/failure/how_do_we_recover_after_failures.md`, `how_do_we_avoid_repeating_the_same_failed_action_forever.md`, `how_do_we_continue_working_when_only_part_of_the_system_is_unavailable.md`, and `how_do_we_keep_the_business_safe_while_recovering.md` — recovery ownership, bounded retries, unknown irreversible effects, partial failure and safe hold.
- `knowledge_base/Level 2/human_collaboration/understanding_all_human_collaboration_questions.md` — lifecycle, roles and responsibility distinctions.
- `knowledge_base/Level 2/human_collaboration/how_do_we_handle_multiple_people_working_on_the_same_situation.md`, `how_do_we_represent_ownership_of_ongoing_work.md`, `how_do_we_transfer_work_between_employees.md`, `what_happens_when_the_responsible_person_is_unavailable.md`, and `what_happens_when_nobody_responds.md` — ownership, transfer, availability, escalation and open business-specific ladders.
- `knowledge_base/Level 2/meetings_and_human_work/understanding_all_meetings_and_human_work_questions.md` and `the_meeting_as_a_wait_spine_bridge.md` — meeting as specialized wait and conceptual lifecycle.
- `knowledge_base/Level 2/meetings_and_human_work/how_should_tend_decide_which_person_is_suitable_for_a_meeting.md`, `how_should_employee_availability_preferences_meeting_type_and_business_rules_work_together.md`, `how_does_tend_represent_who_is_responsible_for_the_next_step_after_a_meeting.md`, `how_should_tend_escalate_work_when_a_person_does_not_act.md`, `how_should_an_external_partner_be_contacted_when_the_business_has_not_acted.md`, and `how_should_tend_handle_a_meeting_that_is_cancelled_missed_or_rescheduled.md` — meeting fit/availability/intent, next owner, partner routing and event-derived escalation counters.
- `knowledge_base/Level 2/growth_and_evolution/understanding_all_growth_and_evolution_questions.md` — one capability/configuration/change lifecycle and four change planes.
- `knowledge_base/Level 2/growth_and_evolution/how_do_we_evolve_tend_without_breaking_existing_businesses.md` — live facts/platform rules/grants vs pinned policy/workflow context and deliberate migration.
- `knowledge_base/Level 2/growth_and_evolution/how_do_businesses_customise_tend_without_changing_its_core_behaviour.md`, `how_do_new_business_systems_become_part_of_tend.md`, `how_do_new_workflows_become_part_of_tend.md`, `how_do_new_business_policies_become_part_of_tend.md`, and `how_do_we_support_businesses_that_operate_differently_from_one_another.md` — typed bounded configuration, capability lifecycle and configuration/product boundary.

### Explainability and operational communication

- `knowledge_base/Level 2/explainability_and_observation/understanding_all_explainability_and_observation_questions.md` — durable record, audience-specific explanation vs builder observability, capability-absent product signal and remaining thresholds/trace mechanics.
- `knowledge_base/Level 2/explainability_and_observation/how_do_we_explain_every_action.md`, `how_do_we_explain_every_failure.md`, `how_do_we_explain_every_recommendation.md`, `how_do_we_observe_the_health_of_the_overall_system.md`, `how_do_we_recognise_that_the_system_is_behaving_unexpectedly.md`, `how_do_we_reconstruct_an_entire_business_situation_after_it_has_finished.md`, `what_information_should_always_be_visible_to_the_business.md`, and `what_information_should_only_be_visible_to_administrators.md` — trace preservation, anomaly/health attribution, reconstruction, role-scoped visibility and business-vs-builder views.
- `knowledge_base/Level 2/communication/when_should_tend_explain_its_reasoning.md` — explain when reason affects trust, responsibility, safety or next action; preserve evidence without exposing hidden reasoning.
