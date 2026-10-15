# Section 9 scratch — Dimension 1: Time

**Assigned dimension:** Dimension 1 — Time  
**Scope:** waiting, deadlines, expiry, stale information, scheduled work, escalation, and nobody acting  
**Status:** Provisional — the core temporal model is established in Level 2 and exercised in Section 8, but several cross-boundary consequences still need Section 10 reconciliation.

This is a Section 9 working record. It does not amend the canonical responsibility, boundary, or interaction files.

## 1. Construction question

When time passes, or when a time-bound expectation is crossed, how does Tend change one situation honestly and keep it moving without making time itself a business decision-maker, sending stale work, inventing current facts, or silently abandoning a person or partner?

The test is not whether Tend can schedule a callback. The test is whether the complete situation remains correct when:

- a wait is still healthy;
- a response promise expires before the resolution promise;
- a source becomes stale without returning an error;
- a scheduled moment arrives after the situation has changed;
- a person or partner does not act;
- a policy or external rule expires;
- a tool result is late, duplicated, or unknown;
- or all ordinary escalation paths are exhausted.

## 2. Evidence-derived temporal model

The Level 2 material describes one repeated movement:

```text
Time changes the world or a promise
        ↓
An explicit temporal event fires
        ↓
The affected situation wakes B-Story
        ↓
B-Story reads the latest durable situation version
        ↓
The normal decision loop re-runs
        ↓
The situation commits an honest next state / intent / wait / escalation / outcome
```

Time does not decide the next business behaviour. It supplies time-context to the normal decision loop. A timer does not mean “send”; it means “re-evaluate.”

### 2.1 What counts as a temporal event

Only a relevant, represented condition should create a wake. The current evidence supports these classes:

| Temporal event | Meaning | Required result |
|---|---|---|
| Actor result | A tool, employee, partner, or agent returns | Re-enter the situation loop with the result and its observation time |
| State-change/watch event | An external state changes or is observed to have changed | Re-evaluate the affected situation; do not treat wall-clock passage as the state itself |
| Date or scheduled moment | A due date, follow-up date, feedback window, appointment, or scheduled start arrives | Re-evaluate the latest state and decide whether the scheduled behaviour is still needed |
| Response deadline | Tend's promised meaningful communication is due | Apply the release policy; communicate if appropriate while the situation remains alive |
| Resolution/internal milestone | A partner, employee, or internal resolution promise reaches its boundary | Advance the configured escalation or other safe behaviour; do not silently close |
| Check-in | The situation-level periodic liveness backstop fires when needed | Re-discover forgotten work, re-evaluate, and either keep waiting with an appropriate liveness mechanism or move the situation |
| Rule expiry/change | A time-bound policy, workflow, or external rule changes according to its change plane | Re-read the applicable rule semantics and wake or notice the situation according to the rule's ownership |

There is no requirement to create a wake for every passing second. “Every relevant moment” means every moment represented by a wait, deadline, watch, policy expiry, or other explicit temporal condition that can change the safe next step.

### 2.2 The one wait shape, used at three levels

The canonical coordination definition gives one conceptual wait record with:

- subject;
- reason;
- timing class: bounded, open, or date-based;
- resume trigger;
- release policy;
- escalation path;
- visibility.

The same model is used at three scopes:

1. **Tool/operation wait:** one call has not returned. A bounded call can time out at its contract bound; an open call needs governing behaviour.
2. **Situation-level wait:** the situation cannot take its next safe step because one or more results, people, or state changes are missing. The current interaction may be released while the operational situation remains active.
3. **Time/scheduled wait:** the situation is parked until a calendar moment, deadline, or window end.

These scopes must not be confused. A fast tool call does not automatically become a durable business wait. A timed-out operation may produce a situation-level wait on a recheck or human investigation. The operation failure does not itself complete or block the entire situation.

The semantics above are established. The exact representation remains open: field names, enum values, whether a watch has a distinct record from a wait, how promise clocks are encoded, and where the situation-level check-in reference appears are not settled by this scratch record. The lists here describe information the architecture must preserve, not a canonical schema.

### 2.3 Waiting is not completion, failure, or blocked

- **Waiting:** a safe resume trigger still exists. The situation remains active and visible.
- **Failure:** a particular path crossed its usable bound or became unusable. Failure is recorded as an audited event and changes the next path; it is not a fifth situation card state.
- **Blocked:** no safe escalation or fallback path remains. A blocked situation must be surfaced or stopped safely; it must not be kept alive forever by a check-in loop.
- **Completed:** the operational problem has an honest outcome and all asks have an ending. Completion removes the situation's active check-in.

A failed carrier call may therefore produce a new situation-level wait on a partner or recheck. A deadline may produce escalation without failure. A wait ending is a transition into the decision loop, not automatic completion.

### 2.4 Two clocks, not one timer

The evidence distinguishes:

- **Response promise:** when the customer or external interactor must receive a meaningful update.
- **Resolution promise:** when the situation should actually be finished.

When a response deadline fires while the situation still waits, the release policy may create an interim, situation-true communication. That satisfies or pauses the customer-facing clock; it does not stop the internal resolution and escalation clock. The responsible employee or partner remains accountable for the unresolved work.

The architecture therefore needs temporal context that can distinguish a response milestone from a resolution milestone and from intermediate escalation/check-in milestones. One undifferentiated `deadline` concept is insufficient for correctness. This is an established semantic requirement; the exact fields or schema that represent it remain open.

## 3. Dimension record

### Dimension ID

`D1`

### Dimension

Time: passage, due moments, expiry, freshness, waiting, and time-bound responsibility.

### Force

Time can change the business situation without a new human message or a new business-system write:

- a deadline passes;
- a scheduled follow-up becomes due;
- a delivery remains unmoved beyond a meaningful dwell time;
- a source's observation becomes insufficiently current for the decision;
- a response promise is about to be breached;
- a tool or partner response bound is crossed;
- a person has not acknowledged or completed a work item;
- a business policy or workflow version reaches an end date;
- an external platform rule or channel window changes;
- a check-in is needed to prevent silent abandonment.

### Why it matters

Tend's product purpose is to carry communication and operational responsibility across time when no one is continuously watching everything. If time is not represented explicitly, Tend can:

- send an obsolete nurture message after a reply;
- call an old tracking claim current;
- tell a customer that a wait is still healthy after its bound has passed;
- treat acknowledgement as completion;
- let a partner or employee wait forever without escalation;
- silently lose scheduled work;
- apply a new business policy to an in-flight situation without a deliberate migration;
- retry an irreversible action after an unknown outcome;
- or mark a situation complete while a primary ask is still unresolved.

## 4. Affected responsibilities

### Directly affected

| Responsibility | Temporal stress |
|---|---|
| **A — Situation representation and graph** | Store open waits, temporal milestones, versioned changes, closure, reopening, and links between a current situation and later follow-on work. Remove active liveness records on completion. |
| **B — Event reception and routing** | Receive time and state-change events; route timer wakes to the relevant situation; deduplicate late or repeated events. Timer events do not go through message ingress or the conversation membrane as primary consumers. |
| **C — Comprehension** | Interpret what the time event means for this situation; distinguish a response promise, a resolution promise, a scheduled date, a stale observation, and an expired path. |
| **D — Gathering** | Decide whether an observation is current enough for the present decision; re-gather from the authoritative source after a wake; handle gradual arrival and mid-wait changes. |
| **E — Trust and evidence** | Preserve observation time, source, currentness, degraded/stale status, conflict, and the consequence of acting on old information. |
| **F — Decision making** | Select the next behaviour after a time event: continue, gather, ask, communicate, human work, escalate, invoke, wait, resolve, or stop safely. Time does not select this behaviour. |
| **H — Coordination and time** | Keep the durable situation alive, represent waits, maintain the book of waits, emit/wake on triggers, re-read latest state, prevent duplicate work, recover interrupted work, and run check-ins. |
| **I/L — Communication and channels** | Shape a truthful interim or deadline message, obey channel windows and consent, and avoid sending a stale or premature message. A communication deadline creates intent; it does not grant send authority. |
| **J/K — Human, meeting, and partner work** | Attach a deadline and escalation clock to human/partner work; distinguish delivered, acknowledged, progressing, unavailable, rejected, completed, and no-response; preserve handoff and acceptance state. |
| **M — Failure and resilience** | Classify a crossed bound as path failure, triage its consequence, retry only at the tool layer where safe, preserve unknown outcomes, and escalate when the path is exhausted. |
| **O — Business view and explainability** | Show what is waiting, why, until when, who is responsible, what promise is at risk, which rung of escalation is active, and why the situation changed. |

### Indirectly affected

| Responsibility | Temporal dependency |
|---|---|
| **G — Authority and grants** | Authority is checked live at the moment of a consequential action. A wait or approval may outlive a grant; expiry/revocation must prevent stale authority from being exercised. |
| **N — Memory and knowledge** | Served context must carry provenance, version, scope, and temporal relevance. Learned memory is advisory and cannot turn an old business fact into current truth. Async observation must not delay story commits. |
| **P — Business capabilities** | Capability contracts provide operation bounds, result timestamps, availability, consequence, and fallback expectations. Tend coordinates the business outcome; the external system owns its canonical state. |
| **Q — Configuration and evolution** | Business SLAs, release policies, escalation paths, schedules, calendars, currentness rules, policy/workflow versions, and channel configuration are typed configuration. Their change semantics must be explicit. |
| **R — Product improvement** | Traces must preserve timing, waits, repeated no-progress, decision latency, and temporal failure classes for improvement; the improvement path cannot redefine a promise or time rule. |

### Cross-cutting controls

| Control | Temporal implication |
|---|---|
| **S — Harness** | WAKE→RECOVER→PROPOSE→VALIDATE→EXECUTE→UPDATE→REST; latest-version re-read; atomic wait/claim/intent commits; write-and-announce; dedup; only enumerated evidence-state progress permits another round. |
| **T — Authorization** | Tenant context and live policy decision at each action boundary. A timer, human deadline, or previously approved intent cannot bypass current permission. |
| **U — Compliance/security** | Time-bound consent, channel rules, data visibility, audit retention, kill switches, and untrusted fields must remain enforced when delayed work resumes. A long wait cannot broaden access. |

## 5. Affected boundaries

### B-Story — survives, but temporal state must be explicit

B-Story remains the correct boundary for the situation's temporal truth and next behaviour. It owns or commits:

- the versioned wait record on the situation;
- the reason and subject of the wait;
- timing class and resume trigger;
- response/resolution/relevant internal milestones;
- current escalation rung and work-item state;
- stale/degraded/unknown claims as interpreted by the worker;
- policy/workflow rule context for the situation;
- check-in creation, refresh, supersession, and removal;
- the reasoned next behaviour after a wake;
- and the atomic situation version that announces the resulting change.

The scheduler or event fabric can detect and deliver a time event, but it must not own what the event means for the situation. B-Story must re-read the latest situation version before deciding, including when an event was scheduled earlier against an older version.

**Stress result:** survives. The time dimension strengthens rather than replaces B-Story. The main consequence is that “temporal coordination” cannot remain an informal worker concern; its state and transition semantics must be first-class in the situation model.

### B-Membrane — survives as ingress/egress, not as timer owner

B-Membrane remains responsible for:

- receiving human/partner/channel responses;
- recording delivery outcomes and routing them to B-Story;
- delivering communication or human-work intent after a committed story version;
- enforcing channel windows, visibility, consent, and egress authorization;
- refusing or returning a send that is stale, expired, undeliverable, or no longer allowed.

It must not:

- receive timer events as the primary target;
- decide that a timer means “send”;
- cancel a wait or declare a business outcome;
- use an old send job after the situation has changed;
- or treat delivery/acknowledgement as operational completion.

An egress intent that sits in delivery delay needs a validity/version check. If the intent is no longer current, the membrane should return a structured result so B-Story can re-evaluate rather than silently sending historical work. An intentional historical resend remains a distinct, traceable case.

**Stress result:** survives, with a **provisional Section 9 consequence / interaction extension**: an SM version reference alone may not be enough when the send is delayed; the intent may also need temporal validity or a fresh B-Story decision. This is not yet an established Section 8 contract and must be reconciled there before becoming canonical.

### B-Memory — survives, but cannot be the clock or currentness authority

B-Memory may:

- serve relevant business context with provenance, version, scope, and allowed influence;
- observe timing and outcome traces asynchronously;
- retain lessons about recurring delays or tool behaviour only through the established learning rules.

B-Memory must not:

- own the book of waits;
- wake a situation as an alternative to the time/coordination spine;
- decide that a cached or learned claim is current enough;
- override a live source, policy, grant, or temporal promise;
- or keep an already completed situation alive.

When memory supplies a claim used in a time-sensitive decision, its age and validity must remain visible. For a consequential action, B-Story must revalidate against the authoritative source or configured evidence rule.

**Stress result:** survives as an advisory boundary. Time exposes a missing protocol detail: memory slices need temporal provenance/currentness metadata, and the worker must know when memory is insufficient for a current decision.

### B-Visibility — survives as a derived boundary, but its current record is too weak

B-Visibility should derive:

- active waits and their subjects/reasons;
- response and resolution promise state;
- due, overdue, stale, and at-risk indicators;
- current owner, acknowledgement, completion, handoff, and escalation rung;
- path failure versus uncertainty versus blocked state;
- last known source observation and currentness reason;
- policy/workflow version and any migration notice;
- and the applicable liveness mechanism (named resume trigger and, where needed, a situation-level check-in).

It may lag the authoritative story for ordinary display, but it must not make a time-critical wait or escalation invisible beyond its configured visibility bound. B-Visibility does not determine correctness or wake the story by inventing a timer; it consumes the committed event fabric and renders the result.

**Stress result:** boundary survives. The Section 7 decision record's `Temporal coupling: N/A` needs clarification, not a claim that B-Visibility has no temporal relationship. The relevant distinction is:

- **Synchronous temporal coupling:** B-Visibility does not need to coordinate synchronously with B-Story for story correctness; its derived view may lag.
- **Temporal dependency:** B-Visibility does depend asynchronously on B-Story commits and time-related events to derive waits, deadlines, overdue escalation, stale state, and attention.

The correction is therefore to record an asynchronous derived dependency while retaining no correctness-critical synchronous coupling. Evidence anchors: [`section_7_boundary_model.md` §7.12.4](../section_7_boundary_model.md) currently records `Temporal coupling: N/A`; [`section_8_interaction_model.md` §8.5](../section_8_interaction_model.md) routes `event:sm_version` to B-Visibility for derive; [`section_8_interaction_model.md` §8.14.1](../section_8_interaction_model.md) defines the provisional B-Visibility derive trigger; and [`section_8_interaction_model.md` §8.15.2](../section_8_interaction_model.md) places observation events on the same event fabric. This is a parent correction/reconciliation, not a canonical edit here.

### Adjacent-Tool — survives as operation-time control

Adjacent-Tool owns capability-call mechanics such as:

- the operation's bounded timeout and bounded retry/poll;
- idempotency/read-before-new-initiation;
- connector-level approval and live authorization gates;
- structured result, timeout, undeliverable, or unknown evidence;
- and result timestamps/availability needed by B-Story.

It does not own the situation wait, escalation ladder, customer promise, or story failure declaration. A connector's response-time contract is temporal evidence for B-Story, not a second wait model. If a call times out, the tool path may be failed while the situation remains waiting on a recheck, alternate source, employee, or partner.

**Stress result:** survives. The contract should expose timing and result provenance; the boundary must not grow a generic time service or an LLM-controlled retry loop.

### Adjacent-Config — survives as a configuration dependency, not a time owner

This adjacent path supplies typed, validated values for:

- response and resolution promises;
- operation/situation bounds where the business owns them;
- release policies;
- escalation paths, fallback targets, and business-hours/calendar rules;
- follow-up and scheduled dates;
- currentness/dwell expectations where the business process requires them;
- and versioned policies/workflows.

The change planes already established in Level 2 must be preserved:

- facts/evidence are live;
- external platform rules and availability are live and interrupt;
- grants/authority are live at enforcement;
- business policies/workflows are pinned at situation open, with a notice and deliberate migration for in-flight work.

Time therefore requires the situation to retain its applicable rule context and version, not merely read whichever business policy is current when a late wake arrives.

**Stress result:** survives. The important constraint is a temporal configuration/version contract, not a new scheduler boundary.

### Adjacent-Improvement — survives outside correctness

Product improvement may consume redacted traces of:

- repeated no-progress;
- crossed bounds;
- unnecessary reminders;
- stale-send prevention;
- timer/message races;
- escalation outcomes;
- and completion-discipline violations.

It may improve model adherence or assembly templates. It must not alter a live wait, deadline, grant, policy, or business fact, and it must not train business-specific timing rules into product behaviour.

**Stress result:** survives; no new time responsibility belongs here.

## 6. Affected interactions and temporal contracts

### 6.1 Timer/event wake

```text
Time or named state watcher
        → B-Story wake
        → latest SM read
        → normal PROPOSE / VALIDATE / EXECUTE / UPDATE / REST
```

The primary target is B-Story. B-Membrane, B-Visibility, B-Memory, and Adjacent-Improvement react only after B-Story's committed change event. A timer alone creates no outbound message.

### 6.2 Timer versus message race

The U1 rule survives:

```text
SM v10: nurture wait due later
        ↓
Inbound reply commits SM v11 and supersedes the wait
        ↓
Timer fires against old expectation
        ↓
B-Story reads v11, sees no active nurture wait, and no-ops
```

The same pattern applies to a release-policy deadline, partner escalation timer, recheck, policy notice, or meeting follow-up. Deduplication and version checks are both needed: dedup prevents repeated delivery of one event; latest-version re-read prevents a valid old event from causing an invalid current action.

### 6.3 Tool result and situation wait

```text
Bounded operation call
        → immediate result OR operation timeout/failure
        → B-Story interprets evidence
        → situation wait / recheck / human work / escalation if still needed
```

The operation wait is not the situation's truth. The worker records the claim, uncertainty, failure, or wait as an atomic story update. The story may continue safely on independent asks while holding only the ask that depends on the unavailable source.

### 6.4 Response-deadline release

```text
Situation waiting for source/person
        → response promise due
        → B-Story latest-state re-evaluation
        → communicate intent if release policy requires
        → B-Membrane gated delivery
        → same situation remains active on its resolution/internal clock
```

The customer-facing message is generated from structured story truth: latest known status, what remains unknown, who/what is being waited on, and what will happen next. It must not narrate tool retries or turn an old claim into a present-tense fact.

### 6.5 Human or partner non-response

Human silence is not one state. Before escalating, the story should classify the observable condition as far as evidence allows:

- request not delivered;
- delivered but not acknowledged;
- acknowledged but no progress;
- person unavailable;
- work rejected;
- work completed but not recorded;
- work superseded because the situation changed;
- or genuinely no response yet.

The time event triggers the decision. Human Collaboration supplies the configured effect: remind, change channel, raise urgency, transfer, reassign, add a contributor, notify an owner, contact a partner, wait safely, or block/surface. The target and authority do not come from Time alone.

Acknowledgement can stop one acknowledgement clock, but not the completion clock. A handoff remains pending until the applicable acceptance rule is met. If the escalation ladder is exhausted, the situation becomes blocked/surfaced rather than an indefinitely recurring wait.

### 6.6 Check-in and forgotten work

Level 2's liveness rule is broader and more precise: every active situation remains alive through at least one of:

- running work;
- a named resume trigger; or
- a situation-level check-in when a periodic backstop is needed to rediscover forgotten work.

The check-in belongs to the situation, not to each tool or individual wait. It is the periodic backstop in HC-3, not necessarily a second timer attached to every wait record. Where a waiting situation could otherwise become silently abandoned, the situation-level check-in:

1. reads the latest state;
2. sees what has arrived, changed, expired, or remained silent;
3. re-applies release and escalation policy;
4. either keeps waiting and records a new check-in, or moves the situation.

This is a liveness backstop, not generic polling. A completed situation has no active liveness obligation and removes any check-in. A blocked situation is surfaced/stopped and must not be endlessly woken as though it were waiting. A named external resume trigger may be sufficient to keep a situation alive without adding a separate periodic check-in; the exact placement/shape of that reference remains open.

### 6.7 Scheduled work

Scheduled work is a wait whose resume trigger is a calendar moment. Follow-up, feedback request, due-date review, meeting start, policy expiry, and recurring business review are all represented as explicit date-based waits. At the due moment, the worker re-evaluates the latest situation. It may:

- perform the scheduled behaviour;
- discover that the work is no longer needed and no-op;
- communicate;
- create human work;
- create a new wait;
- or close with a truthful outcome.

There is no background action that runs forever outside the situation spine. A recurring schedule is an explicit repeated wait, not permission to blindly repeat an action.

### 6.8 Stale information and currentness

Currentness is decision-relative. It depends on:

- observation time;
- normal rate of change;
- whether expected progress has stopped;
- source reporting behaviour;
- dwell time;
- customer/business deadline;
- the consequence of acting;
- and conflicting evidence.

Time alone does not make a claim false, and a recent timestamp does not make a claim sufficient. For example, a carrier's latest unchanged “in transit” claim may support “the latest reported status is City B” while not supporting “delivery will arrive tomorrow” or “no investigation is needed.”

When a claim is insufficiently current, the worker may:

- communicate the latest known state with qualification;
- gather from the authoritative source again;
- mark the evidence stale/degraded;
- create a human/partner investigation;
- or wait with a reason and bound.

It must not invent a location, convert staleness into delivery, or execute an irreversible action from the degraded claim.

### 6.9 Expiry and change planes

Expiry must be interpreted according to what expired:

- A **wait/deadline** fires and the situation decides what follows.
- A **business policy/workflow** reaches expiry or is superseded; in-flight situations retain their recorded rule context until deliberate migration, with a notice wait where required.
- A **grant** expires or is revoked; enforcement reads live authority and stops the action at the next action boundary.
- An **external platform rule/channel window** changes live and may interrupt the situation; the worker re-evaluates and uses the allowed/fallback path.
- A **business fact/source claim** becomes stale; the worker re-gathers or communicates qualified uncertainty.

Treating all expiry as either “use the old value” or “switch to the newest value” would violate the established change model.

## 7. Scenario stress tests

### U1 — Priya reply versus scheduled nurture

**Initial state:** the outreach situation has a committed nurture wait with a due date and a response/resolution context.

1. Priya replies before the nurture date.
2. B-Membrane routes the message; B-Story records the inbound and supersedes the nurture wait in one commit.
3. The later timer arrives. B-Story re-reads the newer version, sees the wait is absent/superseded, and no-ops.
4. If later communication is needed, B-Story creates a fresh send intent from the current story; B-Membrane applies current channel and authorization gates.

**Time result:** Pass. The architecture prevents a stale scheduled action. It also proves that the timer is not an egress trigger.

**Additional silence path:** if Priya never replies, the due time wakes B-Story. It may follow the business-configured next step or close with a visible reason; it may not silently forget or treat no reply as a positive outcome.

### U2 — Refund gateway silent

**Initial state:** refund capability is allowed, and the external gateway accepts or may have accepted an initiation but the outcome is unknown.

1. Adjacent-Tool records the initiation/idempotency key and returns timeout/unknown evidence.
2. B-Story atomically commits initiation, unknown outcome, and a bounded settle/recheck wait.
3. A customer asks before the bound. B-Story communicates only the structured unknown state; no second initiation is allowed merely because time passed.
4. Recheck wakes B-Story. It reads the latest state and may poll using the same key if safe.
5. If the configured settle bound is spent with no outcome, the operation path is declared failed/unknown and the unresolved irreversible matter is handed to a person. It is not auto-redone and is not marked complete.
6. If the human handoff is unanswered, the normal human escalation clock advances; the unknown refund remains visible.

**Time result:** Pass, with a boundary rule: operation bound, situation wait, response promise, and human escalation deadline must remain distinguishable. A “24h” value in older prose is not an architecture constant.

### U3 — Investor deck plus revenue from finance

**Initial state:** two asks; the deck can be fetched, revenue needs a person or source.

1. The deck is cleared and communicated while revenue remains open.
2. Finance receives human work with context, owner, acknowledgement, completion, and a response/resolution deadline.
3. If finance acknowledges but does not produce the number, acknowledgement does not stop completion tracking.
4. A response deadline may produce a situation-delta update to the investor; the revenue resolution clock continues.
5. If finance is unavailable, coverage/delegation is evaluated before treating it as non-response.
6. If the escalation path is spent, the remaining ask is blocked/surfaced, not silently resolved.

**Time result:** Pass for the current model. B-Visibility must show partial fulfilment and the outstanding timed responsibility; B-Membrane must not expose internal tool traces or unapproved private data.

### U4 — Stale or unavailable carrier tracking

**Initial state:** a tracking capability exists; the customer asks where the order is.

1. B-Story invokes the capability through Adjacent-Tool with bounded retry/poll and structured evidence.
2. If the API is down, the path remains uncertainty/wait inside its configured bound. The story records subject, reason, resume trigger, release policy, escalation path, and, where needed for liveness, a situation-level check-in.
3. If the API responds with an unchanged or too-old status, E7 marks the claim stale/degraded where applicable. Currentness is judged against this delivery decision, not timestamp age alone.
4. If the response promise fires first, B-Story commits a truthful customer communication intent. B-Membrane sends only the permitted situation delta.
5. The internal clock continues. A human or partner work item may be reminded, transferred, or escalated according to configuration. The partner receives only the scoped information it needs.
6. If the source/path bound is crossed, the carrier path is declared failed. The situation may still wait on a partner, alternative source, or human investigation; failure does not itself mean blocked or complete.
7. On every recheck or escalation timer, B-Story reads the latest version. If the customer replied, the partner answered, the order moved, the policy changed, or the situation closed, old work is superseded.
8. If the configured escalation framework is exhausted, B-Story records blocked/surfaced state and stops automatic churn. If a later external event or authorized owner decision restores a safe path, it can re-enter the loop.

**Time result:** Pass at the conceptual level. The strongest discovery is that “past the bound” is a typed transition of the current path, not a universal transition of the whole situation.

### U5 — No shipping source versus a slow source

**Initial state:** the customer asks for package status.

- No tracking system and no person can answer: capability-absent; communicate the limitation and do not invent a wait merely to appear active.
- A person can answer: create human work with a wait, deadline, and escalation path.
- A tracking capability exists but is slow/stale: use U4's wait/failure/currentness path; do not classify it as capability-absent.

**Time result:** Pass. Absence of capability, waiting on a person, and failure of an existing capability remain distinct. A timer cannot manufacture a source.

## 8. Explicit boundary survival matrix

| Boundary / control | Survives? | Time-specific consequence or correction |
|---|---|---|
| **B-Story** | Yes | Must own durable temporal state, latest-version re-read, wake semantics, wait supersession, temporal policy context, and atomic time-driven commits. |
| **B-Membrane** | Yes | Timer is never primary; delayed sends need version plus validity/currentness handling; channel windows and delivery outcomes return to B-Story. |
| **B-Memory** | Yes | Advisory only; serves temporal provenance and age; cannot own waits or decide currentness for consequential actions. |
| **B-Visibility** | Yes, provisional | Must derive time-sensitive attention and overdue/escalation views. Its Section 7 “temporal coupling: N/A” claim needs correction. |
| **Adjacent-Tool** | Yes | Owns operation timeout/retry/idempotency and structured timing evidence; not situation-level waits or escalation. |
| **Adjacent-Config** | Yes, adjacent | Owns typed temporal values and rule versions; policies/workflows pinned with deliberate migration, grants/platform rules live. |
| **Adjacent-Improvement** | Yes | Consumes temporal traces only; cannot change live temporal commitments or business rules. |
| **S — Harness** | Yes | Enforces deterministic wake/commit/rest, dedup, version checks, no LLM timer authority, and liveness. |
| **T — Authorization** | Yes | Re-checks permission at the time of every delayed effect; approval never remains valid merely because it was once granted. |
| **U — Compliance/security** | Yes | Delayed work cannot broaden tenant, data, consent, channel, or audit permissions; expiry/kill switches must be honored. |

## 9. Relevant invariants

### Product and Level 1 invariants

- Tend does not wait for a person to reopen a chat before acting on a relevant event.
- Tend keeps responsibility visible until resolved, transferred, or safely stopped.
- Tend never guesses because time or a source is inconvenient.
- Tend coordinates; it does not become the canonical owner of an external system's fact.
- Human responsibility remains with humans; Tend does not silently treat inaction as completion.
- A business policy, grant, or channel rule is not invented by the reasoning model.
- External actors see only the information allowed for their role.

### Architecture and interaction invariants

- Operational truth lives in the versioned situation model; B-Story is the sole writer of truth commits.
- Every durable wait names a subject, reason, timing class, resume trigger, release policy, escalation path, and visibility.
- Time events wake B-Story only; they do not send, decide, or authorize.
- Every timer wake reads the latest situation version before any consequential behaviour.
- A wait ending is not automatically a situation ending.
- A path failure is not automatically a blocked or completed situation.
- A completed situation has no active check-in that can wake it again.
- A blocked situation is surfaced/stopped rather than repeatedly re-polled as if waiting.
- The customer response clock and internal resolution/escalation clock are distinct.
- Write-and-announce is atomic enough that a committed wait/change cannot be silently absent from downstream consumers.
- No fixed-interval polling replaces named events; the situation-level check-in is the explicit periodic liveness backstop when needed for the situation.
- Ack is not completion; send/delivery is not operational resolution.
- Stale/degraded evidence cannot drive an irreversible action.
- Current authority is checked at action time, even when the intent or wait began earlier.
- Memory and derived visibility never replace authoritative situation truth.

## 10. Relevant failure and uncertainty classes

| Class | Time-specific treatment |
|---|---|
| Source still usable but slow | Uncertainty / bounded or open wait; record bound, trigger, release, and escalation. |
| Source response bound crossed | Declare the source path failure; choose recheck, fallback, human work, partner, or safe stop. The situation may remain waiting on a new path. |
| Source answers with unchanged/stale claim | Currentness failure for this decision may be recorded as degraded evidence; do not automatically label the source unavailable. |
| Human request not delivered | Delivery failure; do not start a non-response ladder until delivery state is known. |
| Human delivered but not acknowledged | Acknowledgement clock and escalation policy apply. |
| Human acknowledged but no progress | Continue completion clock and escalate/transfer as configured. |
| Assignee unavailable | Apply availability/coverage/delegation rules before treating it as non-response. |
| Human or partner rejects work | Re-enter decision loop with refusal evidence and permitted escalation path. |
| Work completed but not recorded | Do not duplicate blindly; gather/verify the authoritative outcome. |
| Unknown irreversible outcome | Wait/recheck within settle bound; no new initiation; after bound, human handoff, not automatic redo. |
| Deadline crossed without safe action | Release policy or escalation; never silent closure. |
| Escalation ladder exhausted | Block/surface/stop safely; do not create an endless check-in loop. |
| Timer or event duplicated | Dedup by event identity/version; latest-state read still required. |
| Timer/event delayed | Re-evaluate current state; do not blindly perform an action whose valid window has passed. |
| Policy/workflow changed | Apply its change plane; pinned business rule needs notice/migration, live platform/grant change interrupts. |
| Completed situation receives old timer | No-op after latest-version/read and closed-state check. |
| No capability exists | Capability-absent, not failure or waiting; communicate honestly unless a person can serve the ask. |
| Check-in finds no change | Reapply policy and either preserve the appropriate liveness mechanism (including a new situation-level check-in when needed) or move/escalate; never infinite unrecorded silence. |

## 11. Observed tensions and required reconciliation

### T1 — Time is both an actor and a boundary-adjacent mechanism

Level 1 names Time as an actor. Level 2 assigns H responsibilities to B-Story and describes Time as computing when waits fire. Section 9 confirms that Time is an architectural force, not automatically a `Time Service` boundary. The logical model should preserve the distinction:

- B-Story owns business meaning, wait state, and transitions;
- a deterministic temporal mechanism detects due conditions and emits wake events;
- no separate Level 2 Time boundary is justified by the dimension alone.

### T2 — “Past the bound” is ambiguous unless the object is named

“Past the bound” may mean:

- a single operation timed out;
- the source path is no longer usable;
- a response promise was missed;
- a resolution promise was missed;
- a partner escalation rung expired;
- or all safe paths are exhausted.

These have different consequences. The architecture must name the subject and bound in the wait/failure event so a timeout does not accidentally close or block the whole story.

### T3 — One wait shape versus multiple lifecycle meanings

The one wait record is the right conceptual model, but tool wait, situation wait, and scheduled wait have different owners and transitions. The canonical model should keep one shape while explicitly recording scope and avoid letting a connector-specific timeout become a business-level wait by default.

### T4 — Customer release versus internal escalation

Sending an interim message releases the customer-facing response interaction, not the situation. The internal resolution clock must continue. A display or workflow that equates “customer informed” with “resolved” would violate the product vision.

### T5 — Currentness versus timestamp age

A timestamp is necessary but not sufficient. Currentness is decision-relative and consequence-relative. A uniform TTL would be simpler but contradicts the delivery and trust evidence. The logical model needs a currentness reason/state, not only `observedAt`.

### T6 — Check-in versus polling

The system rejects generic polling but uses a situation-level check-in as the periodic backstop when running work or named resume triggers alone would not guarantee liveness. The distinction must remain explicit: a check-in is situation-scoped and purpose-bearing, not an interval worker scanning all situations or a second timer attached to every individual wait.

### T7 — In-flight rule context versus live world changes

Business policy/workflow versions are pinned with deliberate migration. Facts, grants, external platform rules, and availability remain live. A time wake must know which plane changed before choosing old/new semantics.

### T8 — Visibility may be eventually derived but inaction must not be invisible

B-Visibility can lag ordinary story updates, but the product's core promise requires waiting, overdue responsibility, and escalation to remain visible. Section 10 should decide what visibility bound is logically required versus what remains a Level 3 delivery concern.

### T9 — Delayed egress can make a once-valid intent stale

The existing egress gate checks SM version and send decision. Time adds the case where a send job is delayed after the decision. The membrane must not silently send an intent after its channel window, promise, policy, or situation context has changed. The correct response may be a structured failure back to B-Story for fresh re-evaluation.

### T10 — “Only periodic wake” wording

The time notes call the situation check-in the only periodic wake, while scheduled business work can repeat on explicit dates. The intended distinction appears to be “only generic periodic liveness wake”; date-based business schedules are explicit waits. Section 10 should normalize the wording so recurring scheduled work is not mistaken for forbidden polling.

## 12. Architectural consequence

The time dimension produces these logical constraints:

1. **Temporal meaning is part of the situation model.** A situation cannot be correctly represented by only running/waiting/blocked/completed. Its active waits, due conditions, promise clocks, currentness, rule context, escalation rung, and applicable liveness mechanism must be inspectable and versioned. This is a semantic requirement; the exact record and field schema remain open.
2. **Time is an event source, not a decision owner.** A due condition only wakes B-Story; B-Story re-enters the ordinary decision loop.
3. **Temporal transitions are typed.** Fire/wake, supersede/cancel, expire, path-fail, escalate, reassign, block, and complete must not collapse into one `timeout` event.
4. **All delayed consequential effects require latest-state and live-authority checks.** A timer or previous approval is not permission to execute now.
5. **Liveness is explicit.** Each active situation is kept alive by running work, a named resume trigger, or a situation-level check-in as the periodic backstop; completed and blocked states are not churned as waiting.
6. **Failure changes the path, not necessarily the situation.** A failed tool/partner path can produce another wait or human work; only exhausted safe paths produce blocked/safe stop.
7. **Currentness is a business decision input.** Source timestamp, expected change, dwell, promise, conflict, and consequence matter; no universal TTL or “latest timestamp wins” rule is sufficient.
8. **Response and resolution promises are separate temporal contracts.** Interim communication does not close internal responsibility.
9. **Temporal policy is configurable and versioned.** Business-specific thresholds and escalation ladders are not hard-coded, while product invariants remain non-configurable.
10. **The architecture needs no new Level 2 Time boundary solely because Time exists.** A temporal wake mechanism is required, but business time semantics remain distributed across B-Story, B-Membrane, Adjacent-Tool, Adjacent-Config, and B-Visibility under the established ownership model.

## 13. Decisions / constraints

| ID | Decision / constraint | Status |
|---|---|---|
| D1-T-01 | A time event wakes the affected B-Story situation; it never directly sends or chooses business behaviour. | Established |
| D1-T-02 | The architecture has established wait semantics: a named wait has subject, reason, timing class, resume trigger, release policy, escalation path, and visibility. The exact field schema is open. | Established semantics; representation provisional |
| D1-T-03 | Wait ending re-enters the decision loop; it does not imply completion. | Established |
| D1-T-04 | Waiting inside a configured bound is not failure; crossing the bound declares a failure of the relevant path, after which the situation may wait on a new path. | Established at Level 2; wording needs Section 10 normalization |
| D1-T-05 | Response promise and resolution promise are separate clocks; releasing the customer does not stop internal escalation. | Established semantics; field encoding provisional |
| D1-T-06 | Every active situation remains alive through running work, a named resume trigger, or a situation-level check-in as the periodic backstop when needed; the check-in belongs to the situation, not each individual wait, and is not generic polling. | Established semantics; placement provisional |
| D1-T-07 | Scheduled work is represented as a date-based wait and re-evaluates latest state when due. | Established |
| D1-T-08 | Currentness is decision-relative and cannot be reduced to record age or source authority alone. | Established conceptually; field/contract shape provisional |
| D1-T-09 | Business policy/workflow context is recorded at situation open and changes only through deliberate migration; live facts, grants, and external rules are re-read according to their planes. | Established in Growth; time dependency confirmed |
| D1-T-10 | B-Membrane must not send a delayed intent if its temporal validity or current situation context has expired; it must return a structured result for re-evaluation. | Provisional; requires Section 10 reconciliation with the egress contract |
| D1-T-11 | B-Visibility must make waits, deadlines, escalation, and stale/blocked state visible within a meaningful configured bound, while remaining derived and non-authoritative. | Provisional |
| D1-T-12 | No standalone logical Time Service/boundary is introduced by this dimension. | Provisional pending whole-architecture reconciliation |
| D1-T-13 | Exact temporal representation — promise-clock fields, currentness fields, wait/check-in placement, watch record shape, and temporal-validity fields on send intent — remains open and must not be inferred from this scratch record. | Open representation question |

## 14. Rejected alternatives

| Alternative | Why rejected |
|---|---|
| **Timer directly sends the message** | Bypasses latest story state, comprehension, grant, channel rules, and currentness; fails U1 timer/message race. |
| **Timer wakes B-Membrane first** | Makes the membrane a business decision-maker and can send stale or unauthorized work. Timer → B-Story is required. |
| **Create a generic Time Service as a Level 2 boundary** | Time is a force/actor and a deterministic mechanism; it does not own a complete business responsibility separate from story coordination. A new box would hide rather than solve wait ownership. |
| **Poll every tool or open situation on an interval** | Spends work to discover nothing, duplicates wait ownership, and weakens event-driven agency. Named waits plus a situation-level check-in when needed provide liveness. |
| **Give every tool its own durable business timer** | The same capability can be fast or slow per call; the situation, not the connector, owns whether the wait matters to the business. |
| **Treat every timeout as blocked or completed** | A failed path can be retried, rechecked, replaced, handed to a person, or held; blocked requires exhausted safe paths, and completion requires an honest outcome. |
| **Use one global fixed TTL, fixed reminder count, or always-partner-first ladder** | Timing, escalation, channel, and business process vary by configuration; product invariants constrain configuration but do not dictate one business ladder. |
| **Use timestamp age alone as currentness** | A recent unchanged claim may be insufficient; an older claim may still support a bounded historical statement. Currentness is decision- and consequence-relative. |
| **Treat the latest source answer as automatically current truth** | Authority identifies where to obtain the official claim, not whether it is sufficient for the current decision. |
| **Let B-Memory's cache or learned lesson decide freshness** | Memory is advisory and may be stale; B-Story must use source/evidence and live policy for consequential decisions. |
| **Treat acknowledgement as completion** | Human collaboration evidence explicitly separates acknowledgement, progress, transfer, and completion. |
| **Keep escalating after the escalation framework is exhausted** | Produces noise and hides the terminal blocked condition; surface/stop safely and preserve accountability. |
| **Apply every new business policy live to all in-flight work** | Breaks traceability and promised behaviour; business policy/workflow changes require notice and deliberate migration, unlike live grants/platform rules. |

## 15. Trade-offs

| Choice | Benefit | Cost / risk |
|---|---|---|
| Durable named waits | Survives restart, exposes responsibility, supports wake and audit | More explicit state and lifecycle rules; requires cleanup and dedup discipline |
| Situation-level check-in | Prevents silent abandonment without per-tool polling | Adds a periodic backstop and requires careful distinction from blocked state |
| Latest-state re-read on every timer wake | Prevents stale sends and duplicate work | Adds re-evaluation work and requires version/conflict handling |
| Separate response and resolution clocks | Honest customer communication while internal work continues | More policy and visibility complexity than one SLA timer |
| Configurable escalation paths | Fits one-person and large-team businesses and different partners | Bad or incomplete configuration can leave no safe target; missing fallback must be visible |
| Decision-relative currentness | Better safety than a universal TTL | Requires domain/process configuration and explicit evidence reasoning |
| Pinned business policy/workflow context | Traceable and stable in-flight behaviour | Migration notices and owner decisions add operational work |
| Live grants and external platform rules | Prevents stale permission and channel violations | A long-running situation can change course without changing its business workflow; each action needs a fresh gate |
| Eventually derived time visibility | Keeps B-Story correctness independent from views | Owner attention can lag; the acceptable lag must be explicit for overdue/inaction cases |
| One conceptual wait shape across scopes | Consistent mental model and traceability | Scope-specific semantics must be recorded so operation timeout is not mistaken for story failure |

## 16. Evaluation signals

The time decision remains appropriate if the following can be demonstrated in traces and scenario replays:

1. Every active situation remains alive through running work, a named resume trigger, or a situation-level check-in when the periodic backstop is needed. Where a wait is represented, it preserves the established wait semantics; the exact field schema remains provisional.
2. Every timer wake routes to B-Story and reads the latest situation version before a consequential action.
3. No timer or stale send job directly produces an outbound message without a committed send intent and current membrane gates.
4. U1's reply-before-timer race never sends the superseded nurture.
5. No completed situation receives further active check-ins; no blocked situation churns indefinitely as waiting.
6. Every crossed deadline produces a traceable choice: interim communication, continued wait, escalation, human work, blocked/safe stop, or honest resolution.
7. The response promise can be satisfied while the resolution promise remains visibly open, and internal escalation continues.
8. A source that is stale for a consequential decision is not presented as current fact and does not drive an irreversible action.
9. U4 distinguishes a slow/stale registered capability from capability-absent and from a failed path.
10. Tool retries are bounded and do not become an LLM retry storm; unknown irreversible outcomes never produce a new initiation automatically.
11. Human work distinguishes delivery, acknowledgement, progress, acceptance of handoff, completion, unavailability, and non-response.
12. When a person or partner does not act, escalation preserves the context, remaining time, authority needed, and permitted visibility.
13. Every wait/failure/expiry transition is attached to a situation version and reason; write-and-announce consumers do not miss a committed change.
14. Every action after a long wait re-checks current authority, policy, channel, and tenant/data constraints.
15. B-Memory cannot make an old claim appear current, and memory observation cannot delay story truth commits.
16. B-Visibility shows waiting, due/overdue, stale, escalation, and blocked state with a bounded and explainable lag.
17. A policy/workflow change answers which version governed each time-bound decision; no in-flight situation changes silently.
18. An owner can reconstruct why a situation kept waiting, what event woke it, why it escalated, and why it stopped or completed.

## 17. Revisit conditions

Return to this dimension and re-test the boundaries if any of these occur:

- a new use case needs a temporal condition not representable as a named wait, watch, deadline, or check-in;
- a timer-triggered action bypasses B-Story or sends without current-state re-evaluation;
- a delayed send, approval, or tool result causes a stale or unauthorized external effect;
- a situation can be forgotten despite having no actor response;
- completed or blocked situations continue to wake without an explicit reopening/unblock event;
- a failure of one path incorrectly closes or blocks the whole situation;
- the business requires retroactive changes to in-flight policy/workflow semantics;
- platform/channel rules change but the situation does not wake or use a permitted fallback;
- an authority/grant revocation is not enforced at the next delayed action;
- currentness cannot be represented without a universal TTL or source-last-write shortcut;
- B-Visibility's lag hides a breached promise or owner action beyond the accepted visibility bound;
- a human or partner handoff has no explicit acceptance/fallback semantics;
- the final escalation authority is undefined or no safe fallback owner exists;
- time zones, calendars, business hours, daylight changes, or date semantics create a business ambiguity that the current wait record cannot express;
- the “watch” record cannot be represented as a named wait/state-change trigger without polling;
- the volume of independent waits creates a new scaling or operational boundary that changes the logical ownership model;
- Section 10 finds a contradiction between the time model and failure, authority, concurrency, observability, or evolution dimensions.

## 18. Evidence paths

### Primary authority

- `knowledge_base/Product_Vision.md` — agency across time; event-driven situations; waiting, responsibility, business inaction, delivery freshness, customer communication, artifacts.
- `knowledge_base/Level1_Problem_Framing_or_Expansion.md` — Time actor/questions; failure classes; business inaction; unavailable actors; system boundaries; scaling and evolution constraints.
- `knowledge_base/three_level_framework/3_level_framework.md` — Level 2 must produce a logical architecture from responsibilities, constraints, alternatives, trade-offs, decisions, evaluation, and limits; no technology substitution.

### Established architecture

- `knowledge_base/architecture/what_is_already_settled.md` — carrier-down distinction, configured wait, failure past bound, visible fallback/escalation, open timer/escalation details.
- `knowledge_base/architecture/section_6_responsibility_model.md` — A, B, C, D, E, F, G, H, I, J, K, M, N, O, Q, R, S, T, U responsibilities; state ownership; U1–U5 mapping.
- `knowledge_base/architecture/section_7_boundary_model.md` — B-Story, B-Membrane, B-Memory, B-Visibility, Adjacent-Tool, Adjacent-Improvement; wait and sole-writer ownership; boundary graph.
- `knowledge_base/architecture/section_8_interaction_model.md` — wake routing; per-wake contract; egress gate; human work; tool cycle; temporal races; unknown outcome liveness; U1–U5 walkthroughs.

### Level 2 time and coordination

- `knowledge_base/Level 2/time/understanding_all_time_questions.md`
- `knowledge_base/Level 2/time/time_conversation_and_discoveries.md`
- `knowledge_base/Level 2/time/how_should_tend_react_when_time_changes_the_situation.md`
- `knowledge_base/Level 2/time/how_should_deadlines_influence_decisions.md`
- `knowledge_base/Level 2/time/how_should_scheduled_work_begin.md`
- `knowledge_base/Level 2/time/how_should_waiting_be_represented.md`
- `knowledge_base/Level 2/time/when_should_waiting_end_automatically.md`
- `knowledge_base/Level 2/time/how_should_forgotten_work_be_rediscovered.md`
- `knowledge_base/Level 2/coordination/how_do_we_represent_work_that_is_waiting.md`
- `knowledge_base/Level 2/coordination/how_do_we_represent_work_that_is_blocked.md`
- `knowledge_base/Level 2/coordination/how_do_we_coordinate_long_running_work.md`
- `knowledge_base/Level 2/coordination/how_do_we_recover_interrupted_work.md`

### Level 2 human, partner, freshness, failure, and evolution evidence

- `knowledge_base/Level 2/human_collaboration/what_happens_when_nobody_responds.md`
- `knowledge_base/Level 2/human_collaboration/how_do_we_represent_ownership_of_ongoing_work.md`
- `knowledge_base/Level 2/human_collaboration/how_do_we_transfer_work_between_employees.md`
- `knowledge_base/Level 2/human_collaboration/how_do_we_handle_multiple_people_working_on_the_same_situation.md`
- `knowledge_base/Level 2/meetings_and_human_work/how_should_tend_escalate_work_when_a_person_does_not_act.md`
- `knowledge_base/Level 2/meetings_and_human_work/how_should_an_external_partner_be_contacted_when_the_business_has_not_acted.md`
- `knowledge_base/Level 2/gathering_information/how_do_we_know_when_information_is_sufficiently_current.md`
- `knowledge_base/Level 2/failure/how_do_we_distinguish_failure_from_uncertainty.md`
- `knowledge_base/Level 2/failure/which_failures_can_safely_wait.md`
- `knowledge_base/Level 2/failure/how_do_we_continue_working_when_only_part_of_the_system_is_unavailable.md`
- `knowledge_base/Level 2/growth_and_evolution/how_do_we_evolve_tend_without_breaking_existing_businesses.md`
- `knowledge_base/Level 2/growth_and_evolution/how_do_new_business_policies_become_part_of_tend.md`
- `knowledge_base/Level 2/growth_and_evolution/how_do_new_workflows_become_part_of_tend.md`
- `knowledge_base/research/escalation_sla.md`

## 19. Strongest discoveries for the parent agent

1. **Time does not justify a new logical Time boundary.** Time is an actor/force and a wake source. B-Story remains the owner of temporal business meaning; a scheduler is a deterministic mechanism at the edge.
2. **The central temporal invariant is “wake, then re-decide,” not “timer, then action.”** This is the reason Timer → B-Story and the latest-version read are load-bearing.
3. **“Past the bound” must be scoped.** It is a failure of the named path or promise, not automatically failure, blocked, or completion of the whole situation. This distinction is essential in U4 and U2.
4. **The wait record is the temporal spine.** Tool waits, situation waits, scheduled waits, response promises, escalation, and check-ins are related but must preserve scope and meaning in one inspectable record family.
5. **Response and resolution are separate clocks.** Customer release cannot stop internal accountability. This is the clearest answer to the “nobody acts” problem.
6. **Currentness is a decision-relative evidence state, not a timestamp TTL.** B-Story/Evidence must determine whether a claim is sufficient for this action; Memory cannot decide it.
7. **B-Visibility has an asynchronous temporal dependency, not correctness-critical synchronous temporal coupling.** The existing `N/A` in Section 7.12.4 should be clarified against Section 8.5, 8.14.1, and 8.15.2; it remains derived and non-authoritative.
8. **Delayed egress is a provisional Section 9 interaction extension.** A committed send intent can become stale while the membrane is trying to deliver it; temporal validity/revalidation is a consequence to reconcile with Section 8, not an established contract yet.
9. **Check-in is the generic periodic liveness backstop when needed, not a second timer on every wait and not a ban on explicit recurring business schedules.** This wording should be normalized in Section 10.

## 20. Claims requiring parent correction or explicit Section 10 reconciliation

- **Section 7.12.4 B-Visibility:** clarify `Temporal coupling: N/A` as “no correctness-critical synchronous temporal coupling; asynchronous temporal dependency exists.” The dependency is evidenced by `section_8_interaction_model.md` §8.5 (`event:sm_version` → B-Visibility derive), §8.14.1 (provisional derive trigger), and §8.15.2 (observation event fabric). This is a conceptual correction, not a claim that B-Visibility should become a synchronous owner of time.
- **Section 8.10.1 egress gate:** treat delayed-intent validity/revalidation as a provisional Section 9 interaction extension. Reconcile how an egress intent that is current by SM version but stale by time/channel/policy is rejected or returned for fresh B-Story re-evaluation before marking it established.
- **Section 8.5 / Section 8.13:** retain the difference between event deduplication and latest-version re-read; both are required for delayed and duplicate time events.
- **Section 8.16.5 U4:** make explicit that “past the bound” is failure of the carrier path, followed by a configured new wait/escalation path; it does not necessarily make the whole situation blocked.
- **Section 6.9 H state ownership:** make temporal state more explicit than “wait records & timers”; the logical record needs promise type, policy/rule version, escalation/check-in context, and currentness/freshness evidence where relevant.
- **Section 8 wake table:** normalize “only periodic wake” as “only generic periodic liveness backstop”; explicit date-based scheduled work remains valid.
- **Section 7 / Section 8 status language:** mark the field-level shape for currentness, temporal validity of send intents, visibility freshness bounds, and policy-notice waits as provisional rather than implying the time dimension is fully established.
