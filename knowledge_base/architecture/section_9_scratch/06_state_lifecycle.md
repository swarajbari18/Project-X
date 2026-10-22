# Section 9 — Dimension 6: State and Lifecycle

## Dimension record

| Field | Record |
|---|---|
| **Dimension ID** | D6 |
| **Dimension** | State and Lifecycle |
| **Force** | Tend must carry an operational situation across messages, actors, systems, time, waits, interruptions, partial progress, human handoffs, closure, later related work, and concurrent change. Important state must survive beyond one interaction without being confused with a conversation, a transient run, a business-system record, or a derived view. |
| **Why it matters** | Tend's product promise is to keep a situation moving when nobody is watching, while preserving an honest account of what is known, waiting, blocked, resolved, transferred, or safely stopped. If lifecycle state is lost, overloaded, or owned by the wrong boundary, Tend can send stale follow-ups, duplicate work, close unfinished problems, reopen unrelated work, or claim success without evidence. |
| **Affected responsibilities** | A — situation representation and graph; B — event reception/routing; C — comprehension; D — gathering; E — trust/evidence; F/G — decision and authority; H — coordination/time; I/L — communication and channel rules; J/K — human work, meetings and partner work; M — failure/resilience; N — memory; O — visibility/explainability; P/Q — capabilities and configuration; S/T/U — harness, authorization, compliance/security. |
| **Affected boundaries** | B-Story; B-Membrane; B-Memory; B-Visibility; Adjacent-Tool; Adjacent-Config; Adjacent-Improvement; external business systems, platforms, people, partners and Time. |
| **Affected interactions** | Ingress attach/create/hold/split/re-route; versioned story commits; timer and watcher wakes; wait creation and supersession; capability initiation and unknown outcome; human work open/acknowledge/transfer/escalate/complete; communication intent and egress; failure declaration and recovery; closure; later routing to open or explicitly referenced historical situations; derived views and reconstruction. |
| **Relevant invariants** | One situation is one operational problem; the situation model is Tend's operational truth; B-Story is the sole writer of operational-truth commits; a version is durable, complete and reasoned; the latest state must be re-read before acting; waiting is named and wakeable; blocked is not waiting; failure is recorded and is not silently treated as success; answered is not resolved; no guessing; no premature closure; related situations remain separate; canonical external facts remain owned by their sources; authorization and security gates remain active at every relevant action. |
| **Relevant failure / uncertainty** | Missing, stale, conflicting or provisional information; an actor or source becoming unavailable; human silence, rejection or non-acceptance; interrupted worker execution; duplicate delivery or duplicate wake; an action with unknown outcome; a timer racing an inbound event; an authority or role change mid-lifecycle; a wrong route, split, merge or link; a closed situation being referenced later; a capability absent versus temporarily unavailable; a derived view lagging behind story truth. |
| **Observed tensions** | (1) Some records describe closure as permanent while the authoritative routing answer allows reopening when a situation was marked resolved too early or later regressed. (2) Coordination's four liveness states, Understanding's open/waiting/resolved statuses, and Product Vision's artifact stages are all valid but are not one enum. (3) `stop_safe`, `blocked`, and terminal closure are related but not identical. (4) One event can touch more than one situation, but the cross-situation atomicity contract is not established. (5) B-Membrane may create a shell, while B-Story owns the first operational-truth version. (6) Multiple open asks and multiple human work items coexist inside one situation, so “the situation is waiting” cannot mean every local activity is identical. |
| **Architectural consequence** | Preserve a durable, versioned situation record and graph, with explicit lifecycle transitions and separate local state for asks, waits, human work, evidence, actions and closure outcomes. Do not use chat history, model context, a customer record, a single artifact label, a memory note, or an LLM proposal as the lifecycle source of truth. Treat reopen as an exceptional, evidence-backed correction of a wrongful closure or regression, not as routine reuse of a completed card. |
| **Decisions or constraints** | See the decisions below. The model is sufficiently coherent for a first D6 record, but exact field/enum shape and the closure-correction contract remain provisional. |
| **Rejected alternatives** | A chat thread as the lifecycle record; one global customer lifecycle; `answered` as completion; one status enum combining liveness, evidence, work, communication and business stage; closed cards reopened for every later message; related situations merged by identity or shared object; LLM-owned state; process-local waits; failure as a permanent primary card state; derived views writing back to story truth. |
| **Trade-offs** | Durable complete versions cost storage and write work but make interruption recovery and reconstruction honest. Separate situation nodes and typed links add routing and graph work but prevent one problem from poisoning another. Orthogonal state is more explicit than one simple status label but prevents false closure and misleading artifacts. Exceptional correction/reopen preserves the business meaning of closure while allowing wrongful closure to be repaired, at the cost of a more careful transition rule. |
| **Evaluation signals** | Every active situation has a durable current version and either active work, a named wait/resume trigger, or a visible blocked/safe-hold reason. No timer or stale proposal causes an obsolete action. Every resolved/closed situation has an outcome and no unresolved ask or required human work. One event cannot silently create a twin situation or duplicate wait/work item. Multiple situations for one person remain independently operable. Interrupted work re-enters from the latest version. Reopen is explainable and only follows an explicit same-problem/regression signal. Derived views may lag but never become the source of truth. |
| **Revisit conditions** | A new construction unit requires cross-situation atomicity; a business needs several linked situations to close together; a validly completed problem routinely returns as the same operational problem; partial asks need independent terminal semantics; human-work ownership needs stronger multi-owner or group-approval semantics; the first-version create-shell rule changes; Section 10 finds a contradiction with time, failure, authority, concurrency, observability or evolution; or Level 2 defines a more precise outcome/closure enum. |
| **Evidence paths** | `knowledge_base/Product_Vision.md`; `knowledge_base/Level1_Problem_Framing_or_Expansion.md`; `knowledge_base/three_level_framework/3_level_framework.md`; `knowledge_base/three_level_framework/architecture_contruction.md` §§9.3, 9.4, 9.10, 9.27–9.28; `knowledge_base/architecture/what_is_already_settled.md`; `knowledge_base/architecture/section_6_responsibility_model.md` §§6.3, 6.6, 6.9; `knowledge_base/architecture/section_7_boundary_model.md` §§7.7–7.8, 7.12.1–7.12.7; `knowledge_base/architecture/section_8_interaction_model.md` §§8.2–8.3, 8.5–8.6, 8.9, 8.11.2, 8.13, 8.15.4, 8.16; `knowledge_base/architecture/how_tend_finds_the_right_situation.md`; relevant Level 2 files listed in the evidence index below. |
| **Status** | **Provisional** — the core durability, ownership, graph, wait and interruption model is established by existing evidence; exact lifecycle field shape and the closure/reopen correction rule need parent-level reconciliation. |

## 1. Scope of this stress test

This record tests only the state and lifecycle force. It does not redesign time, failure, authority, memory, visibility or concurrency as separate dimensions. Where those dimensions affect lifecycle, they are recorded as dependencies or revisit triggers.

The D6 question is:

> **What must survive beyond one interaction, who owns it, which transitions are valid, how can several situations coexist, and what happens when the lifecycle is interrupted, corrected, closed or referenced later?**

The evidence answers the question at the conceptual level. It does not authorize choosing a database, queue, process model, deployment shape, or implementation-specific enum.

## 2. Evidence synthesis before projecting the force

### 2.1 What is durable

The durable unit is a **situation model for one operational problem**. It is not a chat, a customer, an order, a campaign, a worker run, or a complete person journey.

The situation graph contains nodes and typed relationships:

```text
Situation node = one operational problem + one resolution path
        │
        ├── context link: shared order / incident / operational context
        └── journey link: one situation followed from another
```

The model is versioned. Each version contains the complete accumulated state at that point, not only a delta. The version keeps its reason and run identifier. Older versions are retained; corrections are made forward rather than by rewriting history.

Tend is authoritative for coordination state: situation models, lifecycle, graph links, routing decisions, waits, decisions, explanations, and work coordination. Tend is not authoritative for canonical orders, payments, delivery facts, or channel messages. It records claims, snapshots, references and evidence needed to coordinate the situation, while the external source remains authoritative for the external fact.

### 2.2 State is not one thing

The evidence uses several kinds of state. They must remain distinct:

| State layer | Meaning | Typical owner |
|---|---|---|
| **Situation liveness** | Whether the operational problem is currently advancing, suspended on a live condition, blocked with no safe path, or complete | B-Story / situation model |
| **Situation outcome / closure** | What happened to the operational problem when it ended: converted, declined, exhausted, handed over, stopped, resolved, etc. Exact enum remains open | B-Story / situation model |
| **Evidence / claim state** | Known, unknown, conflicting, provisional, stale, degraded, currentness and provenance | Situation model with Trust and Evidence responsibilities |
| **Wait state** | What the situation is waiting on, why, the timing class, resume trigger, release policy, escalation path and visibility | B-Story stored on the situation; Time fires events |
| **Human work state** | Open, pending handoff, waiting for response, completed, cancelled, with acknowledgement separate from completion | B-Story stored on the situation; Human Collaboration owns the responsibility semantics |
| **Ask / subproblem state** | Whether a particular ask has an ending such as answered, capability-absent, waived or superseded | B-Story / completion discipline |
| **Action state** | Proposed, validated, initiated, outcome known, outcome unknown, blocked by idempotency, failed or completed for a particular action | B-Story plus Adjacent-Tool contracts |
| **Artifact / business stage** | Preparing, message sent, engaged, meeting requested, ready for owner, paused, closed, unable to proceed, and similar product-facing labels | Derived/visible artifact over the story; not the sole lifecycle truth |
| **Relationship projection** | Prospect, customer, returning customer, stakeholder and related journey views | Derived from identity plus situation graph; not a second lifecycle source |

The key D6 finding is therefore:

> **The architecture must not force all of these into one `status` field. A situation can be waiting on one path, have another ask partially fulfilled, hold an open human work item, contain conflicting evidence, and still remain one open operational problem.**

These are **logical semantics for architectural reasoning and traceability, not a mandated enum, table shape, object model, or storage schema**. The eventual representation may use fields, versioned events, related records, projections, or another Level 3 form. D6 only requires that the meanings remain distinguishable and that their ownership/transition rules are preserved. It does not require one field per row above or prescribe which layers must be physically co-located.

### 2.3 Established primary liveness model

The Coordination and Failure answers provide the strongest common model:

```text
running   — the situation is actively doing work in the current wake
waiting   — active but suspended with a named reason and resume trigger
blocked   — active but no safe escalation/resume path remains; must surface or stop safely
completed — the operational problem has an honest declared outcome and no further required work
```

The term **failure** is not another primary situation state. Failure is a recorded declaration that a path is no longer usable, followed by a safe move to running, waiting, blocked, human work, or closure as appropriate. An **unknown outcome** is likewise a claim/action condition and can leave the situation waiting; it is not permission to mark the situation failed or completed.

The term **wait** is a decision intention when proposed and a durable operational state only after deterministic system behaviour creates the wait record. A timer or external event ends a wait; ending the wait does not itself close the situation.

### 2.4 Product-facing lifecycle is a projection, not a competing truth

Product Vision names useful artifact states such as not started, preparing, message sent, waiting for reply, engaged, needs employee information, meeting requested, ready for owner, paused, closed and unable to proceed. These labels are valuable for business visibility, but they do not replace the durable liveness/outcome model.

Similarly, the Understanding answer uses Open, Waiting on customer/employee/external and Resolved. These are compatible semantic projections of the primary liveness and wait/outcome layers, not evidence that the system needs one giant enum.

`Answered` belongs to a communication or decision record. It does not mean that the operational problem is resolved. A message saying “we are looking into it” leaves the situation open.

## 3. Valid lifecycle transitions

The following is the logical transition discipline supported by the evidence. It is intentionally expressed as business state transitions rather than technical commands.

### 3.1 Creation and first truth

```text
event / instruction
      ↓ route: attach | create | hold | ask | split
optional empty create shell / lineage stamp
      ↓ B-Story first operational-truth commit
running situation with explicit reason, claims and initial unknowns
```

The create shell is not the first operational truth. Section 7 and Section 8 allow B-Membrane to create/fan out an empty shell or lineage stamp, while B-Story owns the first truth commit and every later operational-truth version. This remains a provisional field-level boundary, but the invariant is clear: ingress must not become a second writer of story truth.

Creation must not be inferred from a name appearing in a message. A list instruction becomes one situation per person only after the instruction is understood, with an aggregate assignment artifact that does not replace the child situations.

### 3.2 Running

`running` is the current state while a situation is in a decision/gather/execute cycle. A run may end without completion. The only honest rest outcomes are:

- another bounded advancement is needed in the same wake;
- a named wait exists;
- a human work item or handoff is pending;
- the situation is blocked/safely held with a visible reason;
- or an outcome is declared and completion checks pass.

The LLM can propose a behaviour. It cannot directly create or mutate lifecycle state.

### 3.3 Running → waiting

This transition is valid only when the next safe step needs something not yet available and the durable wait record names:

- subject;
- reason and what decision it enables;
- timing class (bounded, open or date-based);
- resume trigger;
- release policy / response promise;
- escalation path / resolution promise;
- visibility and responsibility.

The situation remains active. The customer may be released by an interim message while the internal clock and escalation path continue. A situation-level check-in prevents a lost event from becoming silent abandonment.

The wait is not complete merely because an actor acknowledged the request. The underlying work may remain open.

### 3.4 Waiting → running

A wait ends only when its resume trigger fires: actor result, watched state change, date/deadline, or situation-level check-in. The situation then re-enters the decision loop using the latest version. It does not resume from an old snapshot.

After re-entry, the next state may be:

- `running`, if work can proceed;
- a new or refreshed `waiting`, if the trigger was insufficient;
- `blocked`, if the safe escalation path is exhausted;
- or `completed`, if the operational problem is now honestly finished and completion discipline passes.

An inbound event may supersede a wait. The established U1 rule is that inbound record plus wait cancellation/supersession is one B-Story version, so a stale timer sees the superseded wait and becomes a no-op.

### 3.5 Running / waiting → blocked

`blocked` means the normal machinery cannot continue and no safe escalation/resume path remains. It is not a fourth kind of wait. It has no natural resume trigger.

The blocked situation must be surfaced or stopped safely under policy. It is **not a wait with an automatic situation-level check-in**: the check-in is the liveness backstop for active waiting, while blocked work has no automatic resume condition and must not be repeatedly woken as though it were waiting. If later evidence, availability, authority, a restored system, or an explicit owner decision creates a new safe path, it may return to `running` or `waiting`. That is an unblock, not a completion. Without a new safe path or evidence, it remains blocked/surfaced or follows the permitted safe-stop outcome.

`stop_safe` is a decision intention. It should not be treated as automatic completion. A safe stop can lead to a terminal closure only when policy declares the operational responsibility ended, all required asks have an ending, no required human work remains, and a visible outcome is recorded. Otherwise it remains a visible blocked/safe-hold condition.

### 3.6 Running / waiting / blocked → completed

Completion is not “a message was sent,” “an actor acknowledged,” “one sub-ask was answered,” or “the model feels finished.” It requires:

- the operational problem is genuinely finished or an explicitly permitted terminal stop/hand-off outcome has been reached;
- every open ask has an ending (answered, capability-absent, waived, superseded, or equivalent accepted outcome);
- no pending human work requiring completion remains;
- no unresolved high-consequence conflict is being smuggled into success;
- customer-facing claims trace to evidence;
- a closure/outcome reason and run/version trace are recorded;
- open waits and situation check-ins are removed or superseded so the completed card is not woken as active work.

The exact outcome enum is still open. The completion discipline is established.

### 3.7 Completed → later event: new, related, or exceptional correction

The default is:

```text
genuinely new operational problem → new situation node
same problem not actually finished / regressed → explicit correction or reopen candidate
```

A new problem does not become a new version of the old situation merely because it concerns the same person, order or channel. It may receive a typed context or journey link to the old node.

The default router considers open situations. Closed situations are considered only when the later event explicitly points to a historical case or the evidence makes a same-problem correction/reopen necessary. Background learning, a generic new message, or a customer identity match must never reopen a closed card by itself.

The closure/reopen rule is the major reconciliation item in this dimension and is specified in Section 6 below.

## 4. Ownership of lifecycle state

### 4.1 B-Story is the lifecycle authority

B-Story survives the D6 test because its accepted boundary joins the durable situation substrate and the worker that advances it. This is necessary for atomic moves such as:

- inbound record + wait supersession;
- initiation + unknown outcome + recheck wait;
- partial gather + wait;
- human work open/update;
- handoff pending;
- capability-absent declaration;
- closure/outcome.

B-Story is the sole writer of operational-truth versions. Its conceptual ownership includes:

- situation liveness and lifecycle;
- graph edges and typed links;
- waits stored on the story;
- work items and handoffs stored on the story;
- claims and declared outcomes;
- decision-intention artifacts linked to story versions;
- correction, split, merge and re-route effects after evidence;
- closure discipline and version history.

This does not mean every conceptual responsibility moves into B-Story. It means the lifecycle commit has one authoritative writer.

### 4.2 Other boundaries do not own lifecycle truth

| Boundary / actor | May contribute | Must not do |
|---|---|---|
| **B-Membrane** | Ingress event, routing/meaning artifact, channel delivery evidence, route to/wake B-Story, optional create shell | Write operational claims, outcomes, wait cancellation, closure, or human-work truth; send without a committed send decision and gates |
| **B-Memory** | Serve phase-scoped context; observe traces; maintain advisory business knowledge with its own lifecycle | Reopen/close situations, write SM truth, alter authority, permissions, ownership, policy or canonical facts |
| **B-Visibility** | Derive cards, boards, snapshots, attention and reconstruction views | Write back to story truth or decide that a visible label means completion |
| **Adjacent-Tool** | Transient invocation state, bounded retry/poll, idempotency checks, structured result | Decide situation closure or write claims directly to SM |
| **Adjacent-Config** | Apply explicit configuration through deterministic, authorized capability | Turn memory candidates or chat text into lifecycle policy without the configuration path |
| **Adjacent-Improvement** | Consume training-grade traces to improve product behaviour | Change a business situation, business memory, authority, or closure policy |
| **Time** | Emit timer/date/check-in events | Decide next behaviour or close a situation directly |
| **External business system / partner** | Provide canonical facts or perform its own work | Become the owner of Tend's coordination lifecycle |
| **Human actor** | Provide facts, judgement, approval, work, acknowledgement, acceptance, transfer or outcome | Be silently treated as having accepted/completed work merely because a notification was sent |

### 4.3 Accountability is not the same as lifecycle ownership

Tend owns coordination state. The business remains accountable for its policies and business outcomes. A human work item distinguishes performer, accountable owner, approver, contributor, consulted and informed roles. An automated action traces to the grantor/authorizer and the business remains institutionally accountable.

An employee becoming unavailable or changing role does not transfer authority automatically. Work ownership and authority must be re-evaluated separately.

## 5. Coexistence of multiple situations and local work

### 5.1 One person can have many open situations

The identity anchor is not a global state container. A person may simultaneously have:

- an order situation;
- a delivery situation for that order;
- a refund situation for a different order;
- a meeting or feedback situation;
- an unrelated stakeholder or partner situation.

Each node has independent facts, unknowns, conflicts, waits, deadlines, owners, permissions and resolution path. The person-level journey is a derived projection over those nodes; it does not merge them.

There is no global “customer is waiting” state that can replace the node-level state. A board or person view may aggregate, but the aggregate cannot own closure or wake behaviour.

### 5.2 One event can affect several situations

One message may contain two distinct asks. Routing may attach the same ingest record to multiple models, split a wrongly combined model, or create a new model and link it to existing models. Each affected situation retains its own version, reason, claims and next step.

The shared event pointer is not permission to collapse the models. A link/reference is not a copied fact. If the event changes both problems, each model receives an explicit update appropriate to that problem. The exact cross-node atomicity guarantee is not established; until Section 10 proves otherwise, the parent architecture must not imply that a multi-situation fan-out is one indivisible operational-truth commit.

### 5.3 Links do not propagate lifecycle automatically

Context edges and journey edges make related state visible. They do not mean:

- the two nodes share one owner;
- one node's wait satisfies the other;
- one node's closure closes the other;
- one node's new message reopens the other;
- or one node's evidence becomes the other's claim without an explicit reference/update.

If an outcome in situation A changes what situation B should do, B-Story must record a new B version with the evidence/reference and reason. This preserves independent resolution paths.

### 5.4 Multiple work items inside one situation

Several human work items may coexist in one situation: internal investigation, customer confirmation, partner investigation, approval for compensation. Each item has distinct responsibility, authority, visibility and lifecycle.

The situation remains unresolved while any required ask/work item remains open. Acknowledgement is not completion. A handoff remains pending until acceptance or an explicit business auto-accept rule; the prior owner/fallback remains traceable while it is pending.

This means a situation-level `waiting` label is a projection over outstanding work, not a claim that all work items have the same state or owner.

## 6. Closure, reopen, split, merge and link semantics

### 6.1 Closure is a meaningful terminal event

The Kanban-style evidence is strong: one situation is one card/story; a genuinely completed story is not a generic bucket for future messages. A new problem after closure gets a new situation and may link to the old one. This protects outcome history and prevents unrelated later work from mutating a completed narrative.

Closure must be durable, versioned, outcome-tagged and explainable. It must stop ordinary automation and remove/supersede open waits. No background memory note, timer, identity match or generic customer message may reopen it.

### 6.2 Auditable reconciliation: permanent valid closure versus narrow correction/reopen

The repository contains a strong permanent-closure rule and a narrower correction exception. They must not be represented as two unrestricted alternatives.

#### Evidence for permanent valid closure

- [`coordination/how_do_we_know_a_piece_of_work_is_still_active.md`](../../Level%202/coordination/how_do_we_know_a_piece_of_work_is_still_active.md) — **“The four states”**, lines 7–12: `completed` means resolved and closed, and a closed situation is not reopened as the same card.
- [`coordination/coordination_conversation_and_discoveries.md`](../../Level%202/coordination/coordination_conversation_and_discoveries.md) — **“Correction 5: completion is closure, and closure is permanent”**, lines 95–101: one card/one story; a later item on a closed card is normally a new situation linked to the closed card.
- [`understanding_the_situation/how_do_we_determine_whether_multiple_messages_belong_to_the_same_situation_and_whether_two_seemingly_different_conversations_are_actually_related.md`](../../Level%202/understanding_the_situation/how_do_we_determine_whether_multiple_messages_belong_to_the_same_situation_and_whether_two_seemingly_different_conversations_are_actually_related.md) — **“How Tend decides: same vs related vs unrelated”**, lines 337–364: a prior resolved situation plus a genuinely new problem creates a new situation; when uncertain between same and related, separate + link is preferred.

These establish the default and the meaning of valid closure: a correctly completed operational problem is terminal for ordinary lifecycle purposes and is not a reusable bucket for future messages.

#### Evidence for the narrower correction/reopen rule

- [`coordination/how_do_we_recover_interrupted_work.md`](../../Level%202/coordination/how_do_we_recover_interrupted_work.md) — **“Reopen versus new situation”**, lines 21–29: closure is permanent; a same-problem regression is labelled **wrongful closure** and is corrected by reopening the original story with the reason recorded; a genuinely new problem creates a new situation linked to the old one.
- [`understanding_the_situation/how_do_we_determine_whether_multiple_messages_belong_to_the_same_situation_and_whether_two_seemingly_different_conversations_are_actually_related.md`](../../Level%202/understanding_the_situation/how_do_we_determine_whether_multiple_messages_belong_to_the_same_situation_and_whether_two_seemingly_different_conversations_are_actually_related.md) — **“Situation status — ‘answered’ is not enough”**, lines 991–1019: communication is not operational completion; a resolved record may be reopened when the same problem is not actually done, while the exact representation is still open.
- The same file — **“Reuse a resolved situation or create a new one?”**, lines 1023–1048: new problem → new situation; same problem not actually finished → reopen; explicit examples include an unresolved refund and a delivery still missing after it was marked resolved; a closed situation must not be reused as a generic customer-message bucket.
- The same file — **“Routing flow (full)”**, lines 1052–1083, and **“Decisions locked in this section”**, lines 1087–1094: default candidates are open situations; closed history is considered only on an explicit reference/reopen signal; no open situation plus no reopen signal creates a new situation.
- [`journey_and_lifecycle/how_should_a_conversation_that_contains_several_problems_be_split_into_separate_situations.md`](../../Level%202/journey_and_lifecycle/how_should_a_conversation_that_contains_several_problems_be_split_into_separate_situations.md) — **“The existing decision (reuse)”**, lines 5–15: same operational problem not actually finished may reopen; a genuinely new problem is a new situation, optionally linked.

These sources establish the semantic distinction but not one final representation. The reconciled rule is:

> **A valid closure is terminal for the operational problem as it was actually completed. Reopening is not routine reuse of a validly closed situation. It is an explicit, evidence-backed correction transition when the same operational problem was marked resolved too early or has regressed. The prior closed interval and outcome remain historical; the correction is appended forward with a reason. A genuinely new problem always creates a new node, even when it shares a person, order, channel or business object.**

Consequences:

- “Second outreach months later” remains a new situation linked to the first, not a reopen, because it is a new business-directed outreach problem.
- “You said the refund was done but I still do not have it” may reopen the same refund story if it is the same unresolved/regressed operational fact and the historical case is explicitly referenced.
- A later event cannot reopen merely because it is semantically similar.
- A corrected/reopened story must preserve its original closure outcome and the reason the closure was found wrongful or regressed.
- A corrected/reopened story must re-enter the normal loop and may later close again with a new outcome.

The exact logical representation remains **open**: it may be a `reopened` transition on the same node, a correction state plus a new active interval on that node, a linked corrective node, or another history-preserving form. The sources do **not** mandate same-node reopen, a new active interval, a new node, a particular flag, or a particular schema. What is established is only the semantic distinction between valid terminal closure and evidence-backed correction of wrongful closure/regression. The parent architecture must choose or defer the representation explicitly rather than silently choosing one.

### 6.3 Split and merge

- **Split** is valid when one model was holding multiple operational problems. Each resulting node gets its own state, facts, waits and resolution path; the correction remains traceable.
- **Merge** is valid only when evidence shows two models were actually the same operational problem and a single resolution path is correct. Merge must preserve the pre-merge histories and reason; it must not erase the fact that two records existed.
- When unsure between same and related, prefer separate nodes with a link over silent merge. Wrong merge poisons gather and decision; a link can be ignored or removed.

Split/merge/re-route are first-class corrections, not exceptional database cleanup.

### 6.4 Link and unlink

A link is a Tend artifact between separate situations. It stores endpoints, link type/reason and time. It does not copy one model's state into the other or make one lifecycle authoritative for both.

Unlink removes a relationship found to be wrong or no longer relevant; it does not rewrite the histories of the linked nodes.

## 7. Lifecycle interruption tests

### 7.1 Worker crash, deploy or lost process

The situation record, version chain, open waits, triggers and work items survive outside a single reasoning run. On restart, Tend rebuilds the open situation and re-enters the loop from the latest known version. It does not restore an old snapshot and pretend no event happened.

The failed operation itself belongs to Failure: retry, compensate, wait for unknown outcome, escalate, or stop safely. The lifecycle consequence belongs to B-Story: the record remains active, waiting, blocked or complete according to the latest evidence.

### 7.2 Timer versus inbound message

The timer wakes B-Story only. B-Story reads the latest version before deciding. If an inbound reply already superseded the wait, the timer performs no action. Inbound record plus wait supersession is atomic at the story level.

This protects the lifecycle against stale work, not just against duplicate messages.

### 7.3 New information while a decision or handoff is in flight

Earlier proposals and ownership changes remain historical. The next actor works from the latest version. The new information may:

- cancel or supersede a wait;
- make a human handoff unnecessary;
- change the target or authority required;
- cancel, change or transfer a work item;
- split or re-route the event;
- or move the situation to a different safe behaviour.

No old proposal may commit a lifecycle transition against a stale story version.

### 7.4 Human non-response, unavailability and handoff

Silence is not completion. Tend distinguishes undelivered, unacknowledged, acknowledged-but-not-progressing, rejected, unavailable, completed-but-unrecorded and no-longer-needed work.

Notification is not acceptance. Pending handoff is not completed transfer. A known unavailable owner is not silently retained. Escalation may alter urgency, visibility, notification, ownership or external routing, while the prior owner and history remain visible.

If no safe substitute exists, the situation waits with a reason and escalation path, becomes blocked/surfaced, or stops safely under policy. It never invents a substitute authority.

### 7.5 Source/system outage and partial failure

If only one part of the system is unavailable, Tend continues safe work that does not depend on that source, marks degraded fallback evidence, and holds the path that depends on the unavailable source. A registered carrier being down is not the same as capability absence. The situation remains open/waiting or moves through declared failure and escalation according to the configured bound.

An unknown outcome on an irreversible action stays waiting inside its settle window, with idempotency/recheck controls. It is not marked complete, and it is not automatically reissued after the bound is spent; it is handed to a person or safe stop path.

### 7.6 Authority or role changes

Authority grants have their own lifecycle and are valid at a point in time. If an employee leaves, becomes unavailable or changes role, the old grant must not silently remain active. A role-grant may resolve to a new verified holder; a person-grant may need re-evaluation. Work may transfer without authority transferring.

Lifecycle implication: any pending action or human work whose authority basis has changed must be re-evaluated before execution or completion. The prior version remains traceable. The exact wake/re-evaluation trigger is an Authority/Time dependency, not a new D6 subsystem.

### 7.7 Memory, configuration and product evolution

B-Memory can preserve observations, lessons and versions with their own lifecycle (active, stale, superseded, conflicting, retired, unresolved). It must not reopen a situation, alter a closure, change a policy, or change ownership merely because it found a related memory.

Business configuration changes are authoritative only through the configuration path. A rule read at the next wake may change the available behaviour, but it does not silently rewrite the historical situation versions or earlier decisions.

Product-improvement traces change how Tend behaves in future; they do not mutate business situation history.

## 8. Construction-unit replay

### U1 — Business-directed outreach

**Stimulus:** An owner gives a list; each person has an independent storyline.

**Lifecycle result:** Understanding creates one situation per person after the instruction is understood, plus an aggregate artifact. Each card can be preparing, waiting for reply, engaged, needing an employee, requesting a meeting, ready for the owner, paused, closed or unable to proceed without affecting the other cards.

**Interruption checks:**

- One person replies: only that person's wait is superseded.
- A nurture timer fires after the reply: latest-version re-read makes it a no-op.
- A person asks a question requiring an employee: one human work item opens; acknowledgement does not close it.
- A person declines: that situation closes with an outcome.
- A later second outreach: new situation linked to the closed outreach; not routine reopen.

**Finding:** The child situation, not the list aggregate, owns operational lifecycle. The aggregate is a derived/coordination artifact.

### U2 — Inquiry → order → delay → refund

**Stimulus:** One person moves through several business problems.

**Lifecycle result:** Inquiry, order, delivery, complaint and refund may be distinct situation nodes with journey/context links. One person-level journey projection does not collapse them.

**Interruption checks:**

- Refund gateway silent after an irreversible initiation: refund situation remains waiting with unknown outcome and a recheck wait.
- A duplicate model proposal to post again is blocked by the idempotency/state gate, not by authorization.
- Customer asks for an update while waiting: same situation wakes and communicates only from committed truth.
- Settle window spent with unknown result: human work opens; no auto-redo.
- Confirmed success/failure: only then can closure be considered, with an outcome and no pending asks.

**Finding:** Action state and situation lifecycle are related but not identical. Unknown action outcome must not force false terminal state.

### U3 — Investor diligence

**Stimulus:** One situation requests a deck and revenue; different pieces become ready at different times.

**Lifecycle result:** The deck ask may end while the revenue ask remains gathering/human work. The situation remains open. A committed situation delta may communicate the cleared deck without pretending the whole diligence problem is resolved.

**Finding:** Partial fulfilment is not closure. Ask-level endings and situation-level closure must be separate.

### U4 — Unreliable carrier tracking

**Stimulus:** A registered carrier is stale or unavailable; the partner may need to investigate.

**Lifecycle result:** Delivery situation records honest unknown/degraded state, opens a situation-level wait with recheck/tool/partner triggers, satisfies the response promise if needed, and keeps internal escalation alive. A bound crossing records failure and changes the path; it does not itself close the story.

**Interruption checks:**

- Carrier recovers: latest state re-enters the story.
- Partner is contacted: partner work is a separate responsibility/work item, not a second copy of the delivery situation.
- Partner does not respond: reminders/reassignment/escalation continue according to configuration.
- Escalation path is spent: blocked/surfaced or safe stop, not silent completion.
- Delivery is eventually verified: completion only after all relevant asks/conflicts have an honest ending.

**Finding:** Waiting, declared failure, human/partner work and blocked are lifecycle transitions around one situation, not separate generic subsystems.

### U5 — Security validation / capability absence

**Stimulus:** A cross-tenant or untrusted request proposes an action, or no source/person can answer a package question.

**Lifecycle result:** A denied action does not mutate operational truth as if it ran. A capability-absent declaration ends the relevant ask honestly but is not a failure and does not by itself mean the whole situation is resolved. Completion discipline prevents unrelated asks from being marked complete.

**Finding:** S/T/U gates constrain lifecycle transitions. They do not own the lifecycle or replace B-Story's state record.

## 9. Boundary survival assessment

| Existing model | Does it survive D6? | Required clarification / dependency |
|---|---|---|
| **B-Story** | **Yes — load-bearing and established** | Must explicitly own the lifecycle transition record, open/closed intervals, wait/work-item state, correction history and completion discipline. The exact status/outcome schema remains provisional. |
| **B-Membrane** | **Yes** | It routes and transports. It may create a shell, but cannot own lifecycle truth. Multi-situation ingress fan-out and routing-correction semantics need explicit cross-node traceability. |
| **B-Memory** | **Yes** | Its own knowledge lifecycle must not be confused with situation lifecycle. It may serve context and observe traces; it cannot reopen/close stories, alter grants, or change ownership. |
| **B-Visibility** | **Yes, provisional** | Derived views need separate filters for liveness, wait subject, blocked reason, outcome, ask/work-item state and historical closure. Stale projections are acceptable; story truth is not derived from the projection. |
| **Adjacent-Tool** | **Yes** | Tool invocation/unknown-outcome/idempotency state is local to the action and feeds a B-Story version. It must not become a second story state machine. |
| **Adjacent-Config** | **Yes** | Configuration changes affect future decisions and re-evaluation but do not rewrite historical lifecycle. Applied configuration is authoritative; memory/chat candidates are not. |
| **Adjacent-Improvement** | **Yes** | Improvement consumes trace and changes future behaviour; it does not mutate business situation state or backfill authority. |
| **S — Harness control** | **Yes** | Per-wake contract, single-flight/recovery, version checks, atomic commits, write-and-announce, dedup and completion checks are exactly the lifecycle safety mechanisms. |
| **T — Authorization control** | **Yes** | T gates actions at proposal, capability and egress points. Authority changes can invalidate pending transitions, but T does not own the story state. |
| **U — Compliance/security** | **Yes** | Tenant isolation, untrusted-ingest hygiene, audit and redaction constrain what lifecycle state may be seen or committed. U must preserve traceability without leaking secrets. |

## 10. Architectural decisions and constraints

### D6-1 — Durable versioned situation is the lifecycle substrate

**Decision:** The situation model is a durable, versioned, complete record for one operational problem. Every operational-truth transition produces a new version with a reason and run reference. Corrections are forward; old versions remain inspectable.

**Why:** This is the only shape that survives long waits, process interruption, multi-actor work, explanation, historical reconstruction and latest-state re-entry without replaying raw chat or losing what Tend knew at the time.

**Status:** Established.

### D6-2 — Do not overload lifecycle into one status enum

**Decision:** Keep situation liveness/outcome, evidence, waits, asks, human work, action outcomes, artifact stages and relationship projections conceptually distinct.

**Why:** The evidence already requires states that can coexist: a partial answer, an open human work item, a stale claim, an external wait and a communication event may all describe one situation without meaning the same thing.

**Status:** Established constraint; exact representation provisional.

### D6-3 — Primary liveness is running / waiting / blocked / completed

**Decision:** Use the established four-state liveness model as the main coordination lens. Treat failure, uncertainty, pending authorization, timed-out operation, human work and action outcome as events/conditions that influence transitions, not as replacements for the situation lifecycle.

**Status:** Established at conceptual level.

### D6-4 — A wait is durable and wakeable; blocked is not waiting

**Decision:** Every active wait has a named subject, reason, resume trigger, release policy, escalation path and visibility. A blocked situation has no automatic resume trigger and must be surfaced or safely stopped. A check-in is the liveness backstop for active waiting, not a reason to keep blocked work spinning forever.

**Status:** Established.

### D6-5 — Valid closure is terminal; correction/reopen is exceptional

**Decision:** A genuinely completed situation is not a generic reusable card. New work is a new node with a link. The same operational problem may be reopened only through an explicit, evidence-backed correction when prior closure was wrongful or the problem regressed. The prior closure remains in history.

**Status:** Provisional pending parent reconciliation of the exact same-node/active-interval representation and outcome enum.

### D6-6 — Related nodes never share lifecycle implicitly

**Decision:** Links provide context or journey relation, not a shared state machine. A node's closure, wait, ownership, evidence or message does not silently close, satisfy, reopen or mutate a linked node.

**Status:** Established.

### D6-7 — Interruption recovers by latest-state re-entry

**Decision:** On crash, deploy, lost worker, delayed result or timer race, re-enter from the latest committed story version. Never restore a stale model snapshot and continue as if the world did not change.

**Status:** Established.

### D6-8 — B-Story sole writer; cross-boundary state is contribution, not ownership

**Decision:** Membrane, Memory, Visibility, Tool, Config and Improvement may contribute events, evidence, projections or candidates through their contracts, but only B-Story commits operational truth. S/T/U gates constrain and audit that commit/action path.

**Status:** Established.

### D6-9 — Closure is blocked by unfinished asks or required human work

**Decision:** Completion discipline must run before `resolve`/story-complete. A partial answer may be communicated, but the situation remains open while a required ask or human work item is unresolved.

**Status:** Established invariant; exact ask/outcome vocabulary provisional.

## 11. Rejected alternatives

### 11.1 Chat thread as lifecycle record

Rejected because one situation may span channels and several conversations, while one conversation may contain several situations. Platforms remain canonical for channel messages; Tend owns coordination state.

### 11.2 One status for everything

Rejected because `waiting`, `message sent`, `conflicting`, `human acknowledged`, `refund unknown`, `customer`, `resolved` and `closed` answer different questions and can coexist.

### 11.3 Customer/person as the lifecycle node

Rejected because one person can have multiple open problems, and the person-level journey is a derived graph projection. Identity is necessary for routing and context, not a replacement for situation state.

### 11.4 “Answered” means complete

Rejected by the Understanding and Product Vision evidence. Communication is one decision-cycle outcome; resolution is the operational problem's completion.

### 11.5 Reopen every later message on an old card

Rejected because it turns a closed story into a generic bucket, corrupts outcome history and hides genuinely new problems. Reopen requires a same-problem/regression signal and explicit historical reference where appropriate.

### 11.6 Merge all related situations

Rejected because shared identity, order, incident or journey context does not imply one resolution path. Link instead; merge only when evidence proves one operational problem.

### 11.7 LLM as state authority

Rejected because reasoning is probabilistic and transient. The model proposes behaviour; deterministic control creates waits, validates versions, enforces authority, writes state and performs completion checks.

### 11.8 Failure as a permanent situation state

Rejected by the Failure category. Failure is a declaration about a path, after which the situation waits, recovers, escalates, blocks, or completes safely.

## 12. Trade-offs and limits

### 12.1 Complete version snapshots versus compact history

Complete versions repeat accumulated state, but they make historical reconstruction and “what did Tend know then?” explicit and avoid reconstructing truth by replaying mutable external systems. Storage/compaction mechanics are Level 3; the logical version completeness is a D6 constraint.

### 12.2 Independent situations versus orchestration convenience

Independent nodes require graph routing and explicit links. That cost is accepted because collapsing multiple problems into one state machine causes wrong gathering, wrong permissions, wrong communication and wrong closure.

### 12.3 Terminal closure versus correction/reopen

Strict terminal closure protects outcome integrity. The exception for wrongful closure/regression protects correctness when a prior “resolved” claim was false. The cost is that the architecture must preserve closed intervals and the evidence for the correction; it must not hide the original closure.

### 12.4 Orthogonal state versus simple cards

Business users still need clear cards, but a simple card label cannot be the source of truth. B-Visibility may present a compact projection while preserving the underlying independent state dimensions and reasons.

### 12.5 One writer versus distributed participation

Keeping B-Story as sole operational-truth writer requires other boundaries to return events/results rather than co-writing. This adds contract discipline but protects atomic wait supersession, unknown-outcome liveness and closure safety.

## 13. Evaluation criteria and signals

The D6 model remains good if the following can be demonstrated without inventing state:

1. **Durability:** Kill/restart during running, waiting, handoff and unknown outcome; the same situation re-enters from its latest committed version.
2. **No silent active work:** Every running/waiting/blocked situation is visible with the reason and next condition; no orphaned active card exists without a wait, work, check-in or blocked reason.
3. **Wait correctness:** A wait ends only on a trigger; superseded timers do not send; completed situations are not woken by stale waits.
4. **Completion correctness:** A reply, acknowledgement, partial answer, or draft does not close an unfinished operational problem. A completion attempt with an unresolved required ask or work item is rejected.
5. **Reopen correctness:** A later new problem creates a new node; an explicit same-problem regression can create a correction/reopen transition; both histories remain explainable.
6. **Graph correctness:** Same operational problem attaches to one node; distinct problems split; related problems link without merging; unlinking does not erase history.
7. **Coexistence:** One person can have multiple open situations with independent waits, owners, permissions and outcomes; a wake for one does not accidentally advance another.
8. **Multi-work correctness:** Multiple human work items retain distinct owners, authorities and acknowledgements; notification is not acceptance and acceptance is not completion.
9. **Latest-state safety:** A stale worker proposal cannot commit against a newer version; authority changes are rechecked before consequential actions.
10. **Source ownership:** External facts remain attributed to their systems; Tend's claims preserve source/time/currentness and do not silently become master data.
11. **Projection safety:** B-Visibility can lag without changing B-Story; a board/card cannot cause closure merely because it displays a closed-looking label.
12. **Auditability:** For every lifecycle transition, a reader can identify prior version, new version, reason, triggering event, actor/run, relevant evidence, authority result and visible outcome.

## 14. Revisit conditions and dependencies

The following are deliberately not resolved inside D6:

- exact closure outcome enum;
- exact representation of valid closure versus wrongful-closure correction/reopen;
- exact rules for multi-situation atomicity when one event affects two nodes;
- group approval and multiple-required-responses semantics;
- default check-in, escalation and release-policy values;
- exact availability/coverage detection;
- derived person-view join and board layout;
- Level 3 persistence, locking, event delivery and compaction;
- whether some businesses require a new corrective node rather than same-node reopen;
- whether a linked incident should have a first-class aggregate lifecycle or remain a typed link only.

These remain revisit triggers, not reasons to reopen settled boundaries casually.

## 15. Cross-dimension dependencies only

This D6 record does not decide the sibling dimensions. It consumes their results as follows:

- **D1 — Time:** wait records, deadlines, response/resolution promises, check-ins and latest-version timer races determine when a lifecycle transition is eligible. Time wakes B-Story; it does not decide closure or next behaviour. Delayed egress and stale scheduled work are lifecycle validity dependencies.
- **D2 — Change over Time:** complete version history, forward corrections, rule/workflow context and deliberate migration determine whether an in-flight situation may continue, must re-evaluate, or needs a correction. D6 owns the lifecycle consequence, not the change-plane policy.
- **D4 — Uncertainty:** evidence states remain orthogonal to lifecycle. Unknown, stale, conflicting, provisional or degraded claims can keep a situation open or constrain behaviour; D6 does not collapse them into failure or completion.
- **D5 — Consistency:** B-Story is the strong local consistency island for Tend-owned operational truth; external systems remain canonical for their facts; B-Memory and B-Visibility may lag with lineage; tool/external effects have explicit unknown-outcome protocols. Cross-situation atomicity remains a D6/D5 revisit trigger, not an established guarantee.
- **D7 — Concurrency:** simultaneous wakes, version matching, single-flight behaviour and stale-proposal rejection must preserve the D6 single-writer and latest-state transitions. The exact concurrency mechanism is not decided here.

## 16. Evidence index — relevant Level 2 answers

### Situation identity, graph and routing

- `knowledge_base/Level 2/understanding_the_situation/how_do_we_determine_whether_multiple_messages_belong_to_the_same_situation_and_whether_two_seemingly_different_conversations_are_actually_related.md`
  - one operational problem per situation;
  - split, merge, link and re-route as first-class operations;
  - related is not same;
  - open situations are default routing candidates;
  - new problem creates a new situation;
  - same unfinished/regressed problem may reopen with a reason;
  - answered is not a situation status.
- `knowledge_base/Level 2/understanding_the_situation/how_do_we_determine_which_information_is_relevant_to_the_current_situation_and_which_information_should_be_ignored.md`
  - graph nodes, context edges, journey edges;
  - complete version snapshots and forward corrections;
  - new problem is a new node, not a new version;
  - links preserve context without merging.
- `knowledge_base/Level 2/journey_and_lifecycle/how_should_one_customer_have_several_open_situations_at_the_same_time.md`
  - multiple independent open situations and derived person view.
- `knowledge_base/Level 2/journey_and_lifecycle/how_should_a_conversation_that_contains_several_problems_be_split_into_separate_situations.md`
  - reuse of the routing/split/reopen/link decisions.
- `knowledge_base/Level 2/journey_and_lifecycle/how_is_the_person_level_journey_derived_from_the_situation_graph.md`
  - journey is a projection, not a second stored situation truth.

### Coordination, waiting and interruption

- `knowledge_base/Level 2/coordination/understanding_all_coordination_questions.md`
- `knowledge_base/Level 2/coordination/how_do_we_represent_work_that_is_waiting.md`
- `knowledge_base/Level 2/coordination/how_do_we_represent_work_that_is_blocked.md`
- `knowledge_base/Level 2/coordination/how_do_we_know_a_piece_of_work_is_still_active.md`
- `knowledge_base/Level 2/coordination/how_do_we_coordinate_long_running_work.md`
- `knowledge_base/Level 2/coordination/how_do_we_recover_interrupted_work.md`
- `knowledge_base/Level 2/coordination/how_do_we_prevent_duplicated_work.md`
- `knowledge_base/Level 2/coordination/how_do_multiple_business_processes_interact.md`

These establish the four liveness states, named waits, situation-level check-in, durable versioned re-entry, one owner per human work item, and the distinction between a situation and the processes/actors touching it.

### Time and failure

- `knowledge_base/Level 2/time/understanding_all_time_questions.md`
- `knowledge_base/Level 2/time/when_should_waiting_end_automatically.md`
- `knowledge_base/Level 2/time/how_should_forgotten_work_be_rediscovered.md`
- `knowledge_base/Level 2/time/how_should_deadlines_influence_decisions.md`
- `knowledge_base/Level 2/time/how_should_tend_react_when_time_changes_the_situation.md`
- `knowledge_base/Level 2/failure/understanding_all_failure_questions.md`
- `knowledge_base/Level 2/failure/how_do_we_distinguish_failure_from_uncertainty.md`
- `knowledge_base/Level 2/failure/how_do_we_recover_after_failures.md`
- `knowledge_base/Level 2/failure/how_do_we_keep_the_business_safe_while_recovering.md`
- `knowledge_base/Level 2/failure/how_do_we_continue_working_when_only_part_of_the_system_is_unavailable.md`

These establish that time wakes the story, failure is a recorded path declaration, unknown outcomes can remain waiting, and safe recovery does not pretend old state was never wrong.

### Human lifecycle and authority

- `knowledge_base/Level 2/human_collaboration/how_do_we_represent_ownership_of_ongoing_work.md`
- `knowledge_base/Level 2/human_collaboration/how_do_we_handle_multiple_people_working_on_the_same_situation.md`
- `knowledge_base/Level 2/human_collaboration/how_do_we_transfer_work_between_employees.md`
- `knowledge_base/Level 2/human_collaboration/what_happens_when_nobody_responds.md`
- `knowledge_base/Level 2/human_collaboration/what_happens_when_the_responsible_person_is_unavailable.md`
- `knowledge_base/Level 2/human_collaboration/understanding_all_human_collaboration_questions.md`
- `knowledge_base/Level 2/authority_and_ownership/how_does_a_grant_end_and_how_does_role_change_affect_authority.md`
- `knowledge_base/Level 2/authority_and_ownership/which_actor_owns_each_action.md`
- `knowledge_base/Level 2/authority_and_ownership/who_remains_accountable_after_an_automated_action.md`

These establish ownership/time-varying responsibility, acknowledgement versus completion, pending handoff, escalation, authority expiry and accountability trace.

### Memory and configuration dependency

- `knowledge_base/Level 2/memory_and_knowledge/how_should_memory_be_stored_conceptually.md`
- `knowledge_base/Level 2/memory_and_knowledge/how_do_we_update_knowledge_when_reality_changes.md`
- `knowledge_base/Level 2/memory_and_knowledge/how_do_we_prevent_outdated_knowledge_from_influencing_new_decisions.md`
- `knowledge_base/Level 2/memory_and_knowledge/what_should_never_become_memory.md`
- `knowledge_base/Level 2/memory_and_knowledge/how_do_we_assemble_context_for_each_situation_phase.md`

These establish that memory has its own typed/versioned lifecycle and must not silently change business policy, authority, ownership, source truth or situation closure.

## 17. Strongest architectural discoveries

1. **State and lifecycle are a stack, not a single label.** The most important D6 result is the separation of situation liveness/outcome from evidence, waits, human work, asks, action state, artifact stage and derived relationship.
2. **B-Story survives because substrate and writer must share one lifecycle ownership domain.** U1/U2 atomic moves are not merely storage conveniences; they prevent stale sends, duplicate irreversible effects and false closure.
3. **A link is not a lifecycle bridge.** Linked situations remain independently owned, independently versioned and independently closable. Context can cause a new version in the other node, but never a silent state propagation.
4. **Waiting and failure are lifecycle transitions around a situation, not generic services or terminal statuses.** A failure declaration changes the safe path; an unknown outcome can remain waiting; blocked has no automatic resume.
5. **Partial fulfilment makes ask-level completion necessary.** U3 proves that one part of a situation can be communicated while the situation remains open. This is the clearest reason not to use “message sent” or “answered” as closure.
6. **Closure needs an explicit correction boundary.** The repository's permanent-closure rule and its wrongful-closure/reopen rule are compatible only when reopen is exceptional, evidence-backed and history-preserving. This should be corrected in the parent architecture synthesis.
7. **Lifecycle is resilient only if recovery re-enters from the latest version.** A restart, timer, human reply, policy change or late external result must never continue an old snapshot without revalidation.

## 18. Claims requiring correction or explicit reconciliation by the parent agent

The parent agent should carry these corrections forward when synthesizing Section 9 and later the logical architecture:

1. Do not repeat “closed situations are never reopened” without the Level 2 exception. Replace it with: **valid closure is terminal; wrongful closure or same-problem regression may be explicitly corrected/reopened, while a new problem creates a new linked situation.**
2. Do not let “running / waiting / blocked / completed,” “open / waiting on / resolved,” and Product Vision's artifact states appear as competing canonical enums. State their relationship and keep them conceptually orthogonal.
3. Do not describe `stop_safe` as automatically equivalent to `completed`. It is a behaviour that may produce blocked/safe-hold or, if policy and completion checks permit, a terminal stop outcome.
4. Do not let B-Memory, B-Visibility, B-Membrane, Adjacent-Tool or configuration apply paths write lifecycle truth. They contribute through B-Story contracts.
5. Do not close a situation because one message was sent, one work item acknowledged, one ask answered, one source failed, or a timer fired.
6. Do not imply that linked situations share closure, waits, owners or lifecycle. Any cross-node effect needs an explicit new version in the affected node.
7. Preserve the open status of exact closure outcome enums, multi-situation atomicity, and create-shell ownership; do not fill these with technology choices during Section 9.
