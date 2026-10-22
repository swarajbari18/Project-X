# Section 9 scratch — Dimension 3: Failure

**Assigned dimension:** Failure
**Specific focus:** missing, conflicting, or incorrect information; unavailable actors; authentication and authorization failure; communication failure; integration failure; safest next step; and no pretending success.
**Scope rule:** This scratch record tests Failure only. Time, security, observability, human behaviour, scaling, consistency, and evolution are recorded only where Failure depends on them or exposes a revisit trigger.
**Status:** **Provisional overall** — the failure posture and most boundary consequences are established by Product Vision, Level 1, Level 2, and Sections 6–8. Several boundary contracts still need parent-agent correction or a later construction pass.

## 1. Construction question

> When an intended interaction cannot complete, or when the result cannot be used safely, how does Tend preserve what is true, refuse to invent what is not known, choose the safest permitted next step, and keep responsibility visible until the situation reaches a safe rest?

Failure is not a generic technical-error concern. It is a cross-cutting test of the business promise:

> Tend notices the change, chooses the next safe behaviour, makes waiting or inaction visible, and keeps the situation moving until someone safe takes responsibility.

The Level 2 failure category establishes a critical distinction:

> **Failure is a declared event, not a fourth situation state.**

The situation remains `running`, `waiting`, `blocked`, or `completed`. A failure declaration says that a previous path is no longer usable, records why, and causes a new safe path to be selected.

## 2. Force

The force is the normal business world in which:

- required information is absent, late, stale, or incorrect;
- sources disagree;
- an employee, partner, system, channel, or external service is unavailable;
- identity cannot be proved or an action is not authorised;
- a message is rejected, undelivered, or has an unknown delivery outcome;
- a capability call fails, times out, returns partial information, or leaves an external effect unknown;
- a person does not acknowledge or complete assigned work;
- a situation does not match a known workflow;
- the business promise or internal deadline is at risk; and
- the system itself is interrupted while work is in flight.

The architecture must not make the happy path appear complete merely because a proposal was generated, a tool was called, a send intent was written, or a person was notified.

## 3. A failure vocabulary that preserves distinctions

The following vocabulary is required before failure behaviour can be reasoned about. These are not all `M*` failures.

| Observed condition | Architectural meaning | What it must not be confused with | Safe consequence |
|---|---|---|---|
| Required claim is absent | Missing information; the next decision lacks a required input | Capability absence, failure, or success | Ask the actor who owns it, gather from an available source, create human work, or wait with a named trigger |
| No system and no person can serve the ask | **Capability-absent** declaration | Integration failure or system outage | Record the honest limitation and finish the ask with a capability-absent ending; this is outside Failure triage |
| Source result is incomplete or stale but the source path still works | Uncertainty or degraded evidence | Terminal failure | Mark the evidence and its reason; continue only where the action is safe, otherwise gather, wait, investigate, or involve a person |
| Claims are materially incompatible under deterministic comparison rules | Conflict in the situation model | Proof that an actor lied, or automatic failure of the whole situation | Preserve both claims; block only affected actions; apply configured resolution, gather more, investigate, or ask an authorised person |
| A claim is later shown to be incorrect | Correctable evidence/history problem | Permission to rewrite history | Preserve the earlier claim, record the correction as a new version, re-evaluate affected decisions and communications |
| Wait bound is still open and no contradiction exists | Uncertainty; current path remains usable | Failure | Keep a visible wait with subject, reason, resume trigger, release policy, escalation path, and visibility |
| Wait bound is crossed without resolution and the path is no longer usable | Declared failure | Mere silence inside an honest bound | Record the failure with evidence and choose retry, wait, human work, escalation, re-evaluation, or safe stop |
| Principal cannot be verified | Authentication failure | Authorization denial | Do not mint an authenticated context or perform the requested action; reject or hold the event according to the actor/channel contract |
| Verified principal is outside the grant, or the invariant forbids the effect | Authorization `Deny` | Connector outage or transient failure | No effect and no blind retry; communicate the refusal and offer the authorised escalation path when one exists |
| Approval is required by the grant | Authorization `StepUp` | Denial or ordinary human information work | Create the deterministic approval/human-work path; re-check authority before the effect |
| Connector credential/session is invalid or provider authentication fails | Integration/authentication failure at the capability boundary | Runtime actor authorization | Return structured evidence; hold the dependent path, request reauthorization/configuration, or use only a permitted safe alternative |
| Message is bounced, rejected, rate-limited, or not delivered | Communication/transport failure | Successful communication | Record delivery evidence; let B-Story classify the business consequence and choose bounded retry, alternate permitted channel, wait, human work, escalation, or safe stop |
| Send request has an ambiguous outcome | Unknown communication outcome | Confirmed delivery or confirmed failure | Do not resend blindly; use channel-supported status/idempotency evidence if available, otherwise wait or hand to a person |
| External operation returns a clear failure | Known integration failure | Unknown outcome | Bounded tool-layer recovery, then a declared failure and next safe path |
| External operation may have happened but its outcome is not known | Unknown outcome | Clear failure | Preserve initiation identity; recheck or use the other side's idempotency contract; never auto-redo an irreversible effect after the settle bound |
| Human request was not delivered, acknowledged, progressed, or accepted | Distinct human-work failure modes | Completion | Keep ownership and responsibility visible; classify the silence, then remind, reroute, transfer, escalate, wait, or stop safely |
| Derived view or improvement consumer is unavailable | Consumer-side operational degradation | Loss of story truth | Preserve the authoritative story/trace and retry or rebuild the derived consumer; it must not change business truth or authorise an action |

This vocabulary is the minimum guard against the two worst errors: treating every unknown as a failure, and treating every failed path as if it had succeeded.

## 4. A failure path, expressed as architecture

For every important interaction, Failure overlays this sequence onto the existing Section 6–8 model:

```text
Normal intended interaction
        ↓
Observed result or missing result
        ↓
Deterministic classification
  (known failure / unknown / conflict / degraded / deny / capability-absent)
        ↓
Preserve evidence, provenance, bound, and latest known state
        ↓
Determine business consequence and promise impact
        ↓
Choose the safest permitted next behaviour
  continue | gather | wait | retry | ask | human_work
  escalate | re-evaluate | stop_safe
        ↓
Commit the operational consequence on the situation model
        ↓
Announce the committed change to the relevant consumers
        ↓
Communicate only what the committed evidence supports
        ↓
Wake and re-evaluate when the named trigger occurs
```

The LLM may propose a next behaviour and explain a consequence. It does not declare authority, decide source truth, run retry timers, or certify progress. Deterministic rules and the control gates decide those matters.

Failure triage follows the established order:

1. Tend is the responsible agent for the situation.
2. Assess the concrete consequence of this particular broken path.
3. Apply the configured severity tier.
4. Assess the response promise, resolution promise, or internal deadline.

The model may make the consequence legible in an explanation. The deterministic decision path selects immediate attention versus a safe, recorded wait, and both the reasoning trace and decision outcome remain auditable.

## 5. Minimum semantic content of a failure declaration

The exact Level 3 schema is open, but no declared failure is complete unless it preserves the following meaning. Fields such as authority, attempt history, or a resume condition are present when applicable; they must not be invented when the failure was an immediate denial or an evidence conflict.

1. **Subject:** the situation, ask, claim, wait, action, actor, capability, channel, or external operation involved.
2. **Observed condition:** what was returned, rejected, absent, contradictory, delayed, or left unknown.
3. **Evidence and provenance:** source, observation time, operation/reference identity, relevant prior claim, and trace linkage.
4. **Classification:** the specific failure or non-failure category, not a generic error string.
5. **Bound or contract:** the deadline, expected settle time, channel promise, tool contract, or check-in that was crossed where applicable.
6. **Latest known state:** what the business can honestly say now, including what remains unknown or conflicting.
7. **Business consequence:** which ask, promise, responsibility, or irreversible effect is affected.
8. **Authority result:** the relevant principal, grant/policy result, approval requirement, or connector-authority condition.
9. **Attempt history:** what was attempted, how many bounded attempts or checks remain/ran, and whether an external effect may have occurred.
10. **Chosen next step:** the safe behaviour and why it is permitted.
11. **Responsibility:** performer, accountable owner, approver if any, current human-work owner, and escalation path.
12. **Resume/release condition:** what event, state change, date, response, reauthorization, or human decision can move the situation again.
13. **Communication consequence:** who must hear the material change, at what level of detail, and what must not be claimed.

This is a conceptual record obligation, not a technology or storage prescription.

## 6. Affected responsibilities

### Directly affected

- **A1–A9:** preserve one versioned story, split/link correctly, retain closure and outcome history, and reopen only for wrongful closure or regression.
- **B1–B4, B7–B9:** route failure events to the right situation, avoid wrong attachment, and retain ingest/delivery references without letting routing uncertainty become operational truth.
- **C1–C6:** distinguish observations, claims, interpretations, decisions, missing information, ambiguity, and communication completion from operational completion.
- **D1–D8:** identify the claim that would change the next safe step, choose its owner/source, handle gradual or changed information, and distinguish capability-absent from unavailable capability.
- **E1–E9:** preserve provenance; compare sources; represent unknown, stale, provisional, degraded, and conflicting evidence; block actions by consequence; and define progress structurally.
- **F1–F6:** select the safest next behaviour and stop safely when no safe path exists; do not let the model self-authorise or self-certify progress.
- **G1–G9:** distinguish identity, grant, approval, owner, and invariant; enforce before effect; refuse honestly; and preserve accountability.
- **H1–H10:** keep durable liveness, waits, check-ins, latest-state re-read, deduplication, write-and-announce, and interrupted-work recovery.
- **I1–I7:** express material changes, uncertainty, conflict, refusal, delay, and correction without receipt-only noise or tool-trace narration.
- **J1–J9 and K3–K4:** create the right human work, distinguish unavailable from non-responsive, transfer responsibility without transferring authority implicitly, and contact partners with scoped context.
- **L1–L4:** enforce channel, consent, visibility, and alternate-channel rules during failure recovery.
- **M1–M6:** declare, triage, retry, protect unknown irreversible effects, and hand off exhausted paths.
- **O1–O10:** retain traceability and surface attention while keeping derived views separate from story truth; preserve capability-absent as an honest product signal rather than an incident.

### Indirectly affected or dependency responsibilities

- **P1–P3:** capability ownership, structured invoke results, and no pretending that a missing integration supplied an answer.
- **Q1–Q5:** configuration, connector reauthorization, policy/authority changes, and visible unsupported configuration gaps.
- **R1–R3:** learn from externally observed failure without allowing improvement or memory to alter current business truth or authority.
- **S1–S12:** enforce the wake contract, bounded execution, intent-before-effect, structured evidence, idempotency, timer routing, model-as-data, and deduplication.
- **T1–T9:** verified principal, live enforcement reads, pre-effect decisions, step-up, and append-only accountability.
- **U1–U6:** tenant isolation, untrusted-input handling, compliance gates, kill switches, catalogue integrity, and release validation.

## 7. Affected boundaries

| Boundary | Failure responsibility under this dimension | What remains outside it |
|---|---|---|
| **B-Story** | Owns the operational interpretation and durable consequence: failure declaration, evidence state, waits, human work, escalation state, communication intent, re-evaluation, and safe rest | It does not own external canonical records, channel transport, grants, or memory learning |
| **B-Membrane** | Receives/routs events and records transport facts; delivers only permitted committed intent; returns delivery failure/ack/unknown evidence to B-Story | It does not declare the business outcome, resolve source truth, or silently mark an intent as delivered |
| **B-Memory** | Supplies scoped, currentness-aware context when available; observes failure traces asynchronously; must not turn a failed/stale observation into authority | It does not write story truth, grants, policies, or failure outcomes |
| **B-Visibility** | Derives owner/builder views and attention artifacts from committed truth; exposes failure reason and current responsibility | It does not become a second truth writer or be required for the next safe story decision |
| **Adjacent-Tool** | Owns capability-boundary execution discipline: pre-effect authority gate, bounded retry/check, idempotency/unknown-outcome handling, structured evidence, and provider-health suppression | It does not write situation claims, declare business failure, or decide the next behaviour |
| **Adjacent-Config** | Applies authorised configuration/registry/credential changes deterministically; keeps failed or denied changes from becoming active | It does not let a runtime worker widen authority or silently rewrite in-flight business truth |
| **Adjacent-Improvement** | Receives redacted training-grade traces and failure signals for product behaviour improvement | It does not affect the current situation, business memory activation, policy, or grants |
| **Cross-cutting S/T/U** | S enforces loop/commit/repetition discipline; T enforces identity and authority; U enforces tenant, input, compliance, and containment controls | None of these is a generic central failure subsystem |

## 8. Affected interactions and contracts

The failure dimension directly stress-tests:

- **IB-1 / IB-4 / IB-9 / IB-10:** timer, recheck, latest-state, and unknown-outcome liveness.
- **IB-7 / IB-8 / IB-11:** structured capability results, idempotency read, and atomic initiation + unknown + wait.
- **HC-1 / HC-2 / HC-3:** write-and-announce, ingress meaning versus story truth, and durable wait/check-in discipline.
- **AC-1 / AC-2 / AC-3 / AC-4:** verified principal, egress authorization, step-up return, and authoritative enforcement reads.
- **Human-work protocol:** request delivery, acknowledgement, acceptance, completion, handoff, and escalation are distinct events.
- **Situation-delta egress:** only a committed material story change produces external expression; a draft, tool trace, or send intent alone is not a successful communication.
- **Trace fan-out:** failure and outcome evidence may feed B-Memory, B-Visibility, the observer, and Adjacent-Improvement only after the appropriate redaction and scope controls.

## 9. Relevant invariants

These Level 1 and Section 8 invariants are the failure test's hard lines:

1. Tend never guesses or pretends to know.
2. Every decision uses the information available at that moment and may be revised when new evidence arrives.
3. Important decisions and actions are explainable and traceable.
4. Tend does not become the canonical owner of another system's information.
5. Human responsibility remains with humans; an automated action retains an accountable grantor or responsible owner.
6. Waiting work always has a reason and a future condition.
7. Tend works from the latest known state.
8. Every interaction must move the situation toward a safe next step; repeated identical work is not progress.
9. The business remains in control; the model never authorises its own proposal.
10. Tend does not share more information than the actor needs.
11. Capability-absent is not failure; a registered but unavailable capability is not capability absence.
12. An irreversible action never runs on an unconfirmed fact.
13. Cache and memory never substitute for authoritative enforcement or current operational evidence.
14. Model output is data, never instructions.

## 10. Stress scenarios

### 10.1 U4 — carrier unavailable inside the configured bound

1. Customer message is routed to the delivery situation.
2. B-Story proposes the carrier lookup; T2 and the tool boundary validate it.
3. Adjacent-Tool performs bounded recovery according to the capability contract.
4. No usable current result exists yet, but the recorded bound is open.
5. B-Story commits an honest situation-level wait: subject, reason, resume trigger, release policy, escalation path, and visibility.
6. If the response promise is approaching, B-Story commits communication intent; B-Membrane sends only the latest supported status.
7. The situation remains waiting, not failed. A timer, result, partner response, or check-in wakes B-Story.

**Verdict:** survives. This is uncertainty with a usable path, not a failure declaration. The wait record and the customer/internal two-clock distinction are required.

### 10.2 U4 — carrier bound crossed without resolution

1. The recheck or partner wait crosses its configured bound without the required result.
2. B-Story records a declared failure with the bound, evidence, latest known state, and reason that the prior path is no longer usable.
3. B-Story triages consequence, severity, and promise impact using business configuration.
4. It selects the configured recovery: bounded retry/check if still appropriate, degraded-but-honest alternative, internal human work, partner contact, escalation, or safe hold.
5. Any new wait is a new explicit wait after the declaration; it is not an unlabelled continuation of the expired wait.
6. If the configured escalation framework is exhausted, the situation becomes blocked and is surfaced; it does not silently remain waiting forever.

**Correction required in the current U4 walkthrough:** Section 8 step 5a currently says “after bound” and then immediately writes a wait. The failure declaration must be explicit before or atomically with the recovery/hold move. “Path held” is not enough by itself to satisfy M1/M2 and the explainability requirement.

### 10.3 U4 — carrier returns a stale or conflicting result

- A stale or unchanged result is degraded/stale evidence, not automatically integration failure.
- A carrier `delivered` claim and customer `not received` claim are preserved as distinct claims and may create a material delivery conflict.
- A status update may be communicated neutrally if it is useful and permitted.
- A claim that the customer received the parcel, compensation, or another consequential result is blocked when the conflict affects that action.
- Investigation, source correction, additional evidence, or an authorised person can resolve the conflict.
- Resolution creates a new situation-model version; earlier claims and the conflict remain historical.

**Correction required:** Section 8 step 5b groups “status unchanged / not current enough” into the same wait and escalation path as an API outage. The architecture must preserve the distinction between a working but stale path, a conflicting path, and a dead path. A currentness bound may later declare a failure, but stale evidence is not itself a transport failure.

### 10.4 U4 — partner or responsible employee is unavailable

- Known leave, outside hours, expired role, unavailable channel, unavailable system, overload, and unknown availability are distinct conditions.
- B-Story checks configured coverage, delegation, fallback owner, queue, or partner contact.
- Transferring work does not transfer authority. A substitute must be authorised for the required action, especially an irreversible one.
- A notification is not acceptance. Until acceptance or an explicit queue auto-accept rule, the handoff remains pending and the previous owner/fallback remains visible.
- If no substitute exists, Tend waits only with a named reason and deadline, escalates to the appropriate authority, or stops safely.

**Verdict:** survives. J7–J9 and the human-work protocol preserve responsibility without guessing a replacement.

### 10.5 U4 — nobody responds after a valid request

The system first distinguishes:

1. not delivered;
2. delivered but not acknowledged;
3. acknowledged but no progress;
4. rejection;
5. known unavailability;
6. work completed but not recorded; or
7. the work becoming unnecessary because the situation changed.

Silence never closes the work. The configured path may remind, increase urgency, notify another permitted channel, escalate, reassign, contact a partner, update the customer, wait, or stop safely. The escalation clock and completion state remain separate.

### 10.6 U2 — refund gateway has an unknown outcome

- The tool records the initiation identity before the irreversible effect.
- If the provider supports idempotency, a same-key resend may be attempted within bounded policy.
- If a status API exists, bounded polling may occur; after that, a wait record takes over.
- While the settle bound remains open, the situation is waiting and the customer receives only an honest interim status when needed.
- A second new refund initiation is blocked by the story/tool idempotency contract, not misreported as an authorization denial.
- After the settle bound, an unresolved irreversible outcome becomes human work with the full timeline. Tend does not auto-redo.

**Verdict:** survives and is the strongest existing Failure proof. The unknown outcome remains distinct from clear failure and from authorization.

### 10.7 Authentication and authorization failures

There are three different paths:

1. **Unverified identity:** the identity provider does not establish who is speaking. No verified principal and no authoritative tenant context are created for the requested action.
2. **Verified but unauthorised action:** T2 returns `Deny`. No connector or channel effect occurs. The refusal may offer escalation to the person/role that can grant the action.
3. **Approval-required action:** T2 returns `StepUp`; deterministic approval work is created, and authority is checked again before effect.

A provider credential or connector authentication failure after T2 has allowed the action is a different integration failure. It returns structured evidence and may require configuration/reauthorization work. It must not be “fixed” by widening the runtime grant or by repeatedly calling the provider.

If the authoritative grant/policy store itself is unavailable, AC-4 means a cache cannot allow the effect. The safe result is deny/hold with an explicit control-path reason until authoritative enforcement can resume.

### 10.8 Communication failure

The architecture must distinguish:

- communication intent recorded on the story;
- send attempt accepted by the membrane/transport;
- provider delivery acknowledgement;
- bounce/rejection/rate limit;
- recipient response or acknowledgement; and
- unknown delivery outcome.

Only the situation-model commit and permitted egress intent are established in Section 8. They do not prove delivery or recipient comprehension.

For a clear failure, B-Membrane records transport evidence and wakes B-Story. B-Story classifies the business effect and may use bounded retry, a permitted alternate channel, wait for a channel window, human work, escalation, or safe stop. It must not claim that a customer, employee, or partner was informed merely because a send job existed.

For an ambiguous send outcome, the same no-pretend rule as U2 applies: use a channel-supported status or deduplication contract if one exists; otherwise preserve the unknown and avoid an unsafe duplicate. The exact cross-channel semantic is **open** and needs a later parent decision.

### 10.9 Partial system/integration unavailability

If one source or capability is down:

- independent safe work may continue using current claims, other available sources, or bounded communication;
- work intrinsically dependent on the unavailable source waits or is escalated;
- any fallback source is marked degraded/stale and its reason travels with the evidence;
- no irreversible action, promise, or consequential data change runs on an unconfirmed/degraded fact;
- repeated calls are bounded and subject to service-level suppression/probing; exact numbers remain Level 3/configuration;
- the situation is not declared complete because an unrelated ask succeeded.

This is the architecture’s partial-failure rule: isolate dependent paths, do not ground the whole situation, and do not quietly turn a broken dependency into a guess.

### 10.10 Interrupted B-Story execution or late result

On restart, the situation record, waits, and event references are recovered and re-enter the loop using the latest state. A late capability result, duplicate event, or human response must be checked against the active wait/operation reference and current situation version:

- if still relevant, B-Story commits it as new evidence;
- if superseded, it remains traceable as late evidence but does not overwrite current truth;
- if it could reveal an unknown external effect, it triggers re-evaluation through the existing unknown-outcome path;
- duplicate delivery exits before a second proposal.

**Open contract:** Section 8 explicitly defines the timer/message race but should generalise the same latest-state guard to late tool results, delivery acknowledgements, and human responses.

## 11. Boundary survival test

| Boundary or cross-cutting model | Stress result | Required constraint or discovered gap | Status |
|---|---|---|---|
| **B-Story** | Survives as the sole operational-truth writer and failure interpreter | Failure declaration must be a first-class story version/event; late results must not overwrite newer state; failure event and liveness state remain separate | Established core; late-result contract open |
| **B-Membrane** | Survives as ingress/egress membrane, not story owner | Transport evidence must be linked back to B-Story; intent, attempt, delivery, and unknown delivery are distinct; no claim of success from a send job | Established boundary; delivery-unknown semantics open |
| **B-Memory** | Survives as advisory/scoped context and async learner | Memory outage or stale retrieval cannot become current business truth; if required context is unavailable, B-Story must hold/gather/escalate rather than use stale memory; observe failure must not block story commit | Serve boundary established; failure fallback provisional |
| **B-Visibility** | Survives as derived, non-authoritative view | Story correctness cannot depend on the board, but high-consequence owner attention cannot disappear when derive is delayed; durable attention/communication path is required | Boundary provisional; critical-attention fallback open |
| **Adjacent-Tool** | Survives as effect and integration boundary | Pre-effect authorization, intent-before-effect, bounded repeat, idempotency, structured evidence, and unknown outcome are all required; tool never writes business truth | Established contract; exact provider/channel semantics open |
| **Adjacent-Config** | Survives as deterministic registry/credential/policy apply path | Failed/denied config is not active; no partial grant widening; current active configuration remains safe; live enforcement reads fail closed | Provisional adjacent boundary; exact reauthorization path open |
| **Adjacent-Improvement** | Survives as async consumer | Improvement outage cannot affect current behaviour, business memory, story truth, or authority; traces must remain available for later replay where required | Established separation |
| **S — Harness control** | Survives | REST/NEXT must be decided from structured state change; retries and waits cannot be hidden in model context; atomic writes and dedup protect recovery | Established |
| **T — Authorization control** | Survives | Deny, StepUp, connector-auth failure, and policy-store-unavailable must have separate diagnostics; enforce before effect and read authoritative policy | Established core; failure diagnostics/reauthorization details open |
| **U — Compliance/security** | Survives | Failure recovery cannot widen visibility, cross tenant boundaries, leak credentials, bypass catalogue integrity, or bypass kill switches | Established constraints |

## 12. Observed tensions and resolutions

### 12.1 Failure versus uncertainty

**Resolution:** the recorded bound and path usability are the line. Inside the bound, waiting is honest. After the bound with no resolution, B-Story records failure and changes course. Exact values remain business configuration/Level 3.

### 12.2 Failure versus capability absence

**Resolution:** a registered carrier that is down is a failed/unavailable path. No shipping source and no person who can answer is capability-absent. A person who can answer is human work. These outcomes must not share a generic “failure” statistic or customer message.

### 12.3 Failure versus conflict or incorrect information

**Resolution:** a conflict is a relation among claims; a stale/incorrect claim is evidence requiring correction or re-evaluation. The action may be blocked without the entire situation being stopped. Failure is declared only when the path that should produce usable information is no longer usable or its bound is crossed.

### 12.4 Continue operating versus fail safe

**Resolution:** decompose by ask and dependency. Continue independent safe work; hold dependent work. Mark degraded evidence. Never make an irreversible or consequential move on unconfirmed evidence.

### 12.5 B-Story sole truth versus B-Membrane delivery evidence

**Resolution:** B-Membrane may record transport facts/acknowledgements under the existing membrane contract, but only B-Story interprets their business meaning and commits operational outcome, failure, wait, or closure. The parent should make that distinction explicit in the write-ownership wording.

### 12.6 Human responsibility versus availability

**Resolution:** work transfer and authority transfer are separate. A replacement is not authorised merely because it is available; notification is not acceptance; acknowledgement is not completion.

### 12.7 Owner visibility versus derived-view independence

**Resolution so far:** B-Visibility must not be on the machine’s correctness path. **Unresolved:** how high-consequence attention reaches the accountable owner if the derived view is unavailable. The story must retain the need durably; a direct permitted communication/attention path may be required.

### 12.8 Memory advice versus current truth

**Resolution:** B-Memory can provide prior failure patterns and procedures, but current source claims, grants, policies, and invariants outrank memory. Retrieval failure or stale memory cannot be silently substituted as current evidence.

## 13. Architectural consequence

Failure does not justify a central `Failure Service` or `Error Handler`. It produces these cross-boundary rules:

1. **Failure declaration is owned by the situation execution path.** B-Story records the business consequence and next safe rest because it owns operational truth.
2. **Detection remains local to the interaction that can observe it.** Adjacent-Tool observes connector results; B-Membrane observes delivery; T observes authorization; human collaboration observes acceptance/non-response; Trust and Evidence observes claims. Each returns structured evidence to B-Story.
3. **Every external effect has four distinct semantic stages:** intention, attempt, observed result, and business interpretation. None can be silently substituted for another.
4. **Every wait is governed.** A wait has subject, reason, bound/timing class, resume trigger, release policy, escalation path, and visibility. A new wait after failure is explicit, not an invisible extension.
5. **Action blocking is narrower than situation blocking.** A conflict, denial, or missing claim blocks the unsafe action; it does not automatically destroy unrelated safe work.
6. **Safe recovery is path-specific and bounded.** Retries, polls, channel alternatives, partner contact, human work, and safe holds are selected by the normal decision loop and constrained by deterministic gates.
7. **No completion without honest ask endings.** An ask is answered, capability-absent, waived, or superseded only when the evidence and policy support that ending. A successful neighbouring ask cannot close an unanswered primary ask.
8. **Latest-state re-evaluation is general, not timer-only.** Any late result or duplicate response must be reconciled against the latest story and active wait before it can change truth.
9. **Critical attention must be durable independently of a derived board.** The exact expression path remains open, but the architecture cannot equate “view projection failed” with “business no longer needs to know.”

## 14. Decisions and constraints

### Established by the evidence

- Failure is an audited declaration/event, not a fifth situation state.
- The wait bound is the uncertainty/failure line when the current path becomes unusable.
- Failure declarations carry evidence, reason, latest state, and next step; silent failure is not handled failure.
- Retry is bounded and deterministic at the effect/capability boundary; the reasoning model does not run retry timers.
- Unknown outcomes use idempotency/status checking where available and never auto-redo an irreversible unknown after the settle bound.
- Partial unavailability permits safe independent work and holds dependent work; degraded evidence is marked; irreversible actions fail closed.
- Conflicts are deterministic claim relations and block only affected actions unless policy says otherwise.
- Auth denial, step-up, capability absence, connector failure, and unknown outcome are separate diagnostics and paths.
- Human silence never counts as completion; availability, acceptance, acknowledgement, and completion are distinct.
- External communication is based on committed situation intent and permitted visibility; send intent is not delivery success.
- B-Memory and Adjacent-Improvement cannot change current story truth, authority, or policy as a side effect of a failure trace.

### Provisional or open

- Exact failure declaration schema and outcome vocabulary beyond the conceptual categories.
- Exact bounds, retry counts, backoff/jitter ranges, poll counts, settle windows, and circuit/service suppression values.
- Exact connector reauthorization and credential-recovery workflow.
- Exact unknown-send semantics and channel-specific message idempotency/status contracts.
- Exact escalation ladder, reminder policy, coverage/queue semantics, and owner attention path.
- Exact behaviour when B-Memory serve is unavailable and the missing context is necessary for safe action.
- Exact B-Visibility fallback for urgent/high-consequence attention.
- Generalised latest-state handling for late tool results, delivery acknowledgements, and human responses.
- Detection and correction workflow for incorrect information when no source directly admits the error.

## 15. Rejected alternatives

- **One central failure subsystem:** rejected because failure is observed and acted upon at different boundaries, while B-Story owns the business consequence.
- **A fifth `failed` situation state:** rejected because it hides whether the situation is waiting, blocked, recoverable, or complete after the failure.
- **Treat every unknown as failure:** rejected because the current path may remain usable inside its bound.
- **Treat every failure as terminal:** rejected because bounded recovery, wait, degraded safe progress, and human escalation are valid next steps.
- **Retry forever:** rejected because it creates retry storms, repeated side effects, and hidden liveness failure.
- **Let the LLM decide truth, authority, confidence, or retry timing:** rejected by E2/E3/F6/S/T controls.
- **Silently choose the latest or most plausible source:** rejected by Trust and Evidence; source authority is claim-specific and does not erase conflict.
- **Stop the entire situation for any conflict:** rejected; blocking is action-specific.
- **Use stale/degraded evidence for an irreversible effect:** rejected by the recovery safety floor.
- **Treat capability absence as provider failure:** rejected; it produces the wrong customer explanation and corrupts product signals.
- **Treat request delivery, acknowledgement, or notification as completion:** rejected by Human Collaboration.
- **Allow cached policy to permit an action while the authoritative policy store is unavailable:** rejected by AC-4; fail closed/hold instead.
- **Rely only on B-Visibility’s derived board to preserve urgent accountability:** rejected as unsafe; the exact fallback remains open.
- **Let B-Memory convert failure traces directly into live policy or authority:** rejected by N16, IB-13, and T8.

## 16. Trade-offs

- **Honesty versus latency:** waiting, human review, and safe holds can be slower than guessing, but they preserve correctness and trust.
- **Fine-grained classification versus simplicity:** separate evidence, transport, authority, human, capability, and unknown outcomes require more state and trace semantics, but prevent unsafe conflation.
- **Partial progress versus coordination complexity:** continuing independent asks is useful, but each ask needs its own evidence and completion discipline.
- **Bounded recovery versus availability:** stopping retries protects external systems and irreversible effects, but some transient work will wait longer or need a human.
- **Durable trace versus storage/operational cost:** reconstructability requires preserving claims, attempts, waits, decisions, and corrections rather than only the final answer.
- **Configurable escalation versus predictable defaults:** businesses need different ladders, but every configured path must still preserve responsibility, authority, deadlines, and safe stop behaviour.
- **Derived-view independence versus immediate owner visibility:** correctness must not depend on a projection, but high-consequence attention still needs a reliable expression path.

## 17. Evaluation signals

The architectural choice remains healthy when these signals hold:

- No customer, partner, or employee message claims a fact or completion unsupported by current evidence.
- No irreversible effect is automatically repeated after an unknown outcome without a valid idempotency/status basis.
- No open wait lacks subject, reason, bound/timing, resume trigger, release policy, escalation path, and visibility.
- Every declared failure has evidence, a reason, a latest-state description, and a recorded next safe step.
- No action blocked by a conflict is silently performed through a different path.
- No authorization denial results in a connector or channel effect; no connector-auth failure widens runtime authority.
- Capability-absent is not counted or communicated as an integration failure, and payment data never answers an unserved shipping ask.
- No human request becomes complete merely because it was sent, delivered, or acknowledged.
- Repeated failures stop within bounded policy; no retry storm or endless check loop is observed.
- Late results and duplicate events do not overwrite newer situation versions or emit stale outbound actions.
- B-Memory outage/staleness does not cause stale memory to become current truth or authority.
- Adjacent-Improvement outage does not change live behaviour or prevent story truth from being preserved.
- B-Visibility lag does not erase a committed failure, wait, owner, or escalation; urgent attention remains recoverable.
- A finished situation can reconstruct the trigger, evidence, decision, attempt, failure declaration, communication, responsibility, and outcome.
- Completion-discipline checks detect an answered-neighbour/unfinished-primary-ask defect before closure.

## 18. Revisit conditions

Reopen this dimension or the affected boundary when:

- a new capability can create an effect whose outcome is not observable or idempotent;
- a communication channel has ambiguous send/delivery semantics without a safe status or duplicate-control contract;
- a source can change or retract claims after the situation has closed;
- a new business policy introduces an irreversible action, new approval class, or new consequence tier;
- an integration/provider can fail partially in a way not represented by the current evidence vocabulary;
- the policy/grant store, identity provider, or configuration registry can be unavailable during a high-consequence action;
- B-Visibility outage testing shows that owner attention can be lost or delayed beyond a configured promise;
- B-Memory retrieval failure changes a decision that should have been independently safe;
- late tool/human/channel events can still overwrite a newer situation version;
- a failure is observed with no safe mapping to continue, gather, wait, retry, ask, human work, escalate, re-evaluate, or stop safely;
- a capability-absent rate rises because the catalogue/coverage model is incomplete rather than because the business truly lacks capability; or
- product invariants, tenant isolation, or compliance rules change.

## 19. Evidence paths

### Product and Level 1 authority

- `knowledge_base/Product_Vision.md` — §1/§4 agency and safe stop; §6 “Never guess,” human responsibility, explainability, traceability, and “Fail safely”; §7 boundaries; §8 success.
- `knowledge_base/Level1_Problem_Framing_or_Expansion.md` — §8 invariants; §9 failure classes and safest-correct-next-step rule; §6 interactions; §7 system boundaries.
- `knowledge_base/three_level_framework/3_level_framework.md` — Level 2 is logical, technology-neutral responsibility organisation; failure classes are business failures, not technology choices.
- `knowledge_base/three_level_framework/architecture_contruction.md` — §9.3–§9.4 dimension record and procedure; §9.7 Failure; §9.8 Uncertainty; §8 interaction failure controls.

### Settled architecture

- `knowledge_base/architecture/what_is_already_settled.md` — carrier down versus capability absent; failure after the configured wait; honest unknowns; open escalation ladder; no invented owner.
- `knowledge_base/architecture/section_6_responsibility_model.md` — E/F/G/H/I/J/K/L/M/O/P/Q/R/S/T/U responsibility groups and the U4/U5 distinctions.
- `knowledge_base/architecture/section_7_boundary_model.md` — B-Story, B-Membrane, B-Memory, B-Visibility, Adjacent-Tool/Config/Improvement, ownership and gate table.
- `knowledge_base/architecture/section_8_interaction_model.md` — per-wake contract; VALIDATE diagnostics; IB-1…IB-14; HC-1…HC-3; AC-1…AC-4; membrane failure propagation; U2/U4/U5 walkthroughs; completion discipline.

### Level 2 failure, evidence, coordination, authority, and communication

- `knowledge_base/Level 2/failure/understanding_all_failure_questions.md`
- `knowledge_base/Level 2/failure/how_do_we_recognise_failure.md`
- `knowledge_base/Level 2/failure/how_do_we_distinguish_failure_from_uncertainty.md`
- `knowledge_base/Level 2/failure/how_do_we_recover_after_failures.md`
- `knowledge_base/Level 2/failure/which_failures_require_immediate_attention.md`
- `knowledge_base/Level 2/failure/which_failures_can_safely_wait.md`
- `knowledge_base/Level 2/failure/how_do_we_continue_working_when_only_part_of_the_system_is_unavailable.md`
- `knowledge_base/Level 2/failure/how_do_we_avoid_repeating_the_same_failed_action_forever.md`
- `knowledge_base/Level 2/failure/how_do_we_keep_the_business_safe_while_recovering.md`
- `knowledge_base/Level 2/trust_and_evidence/how_do_we_identify_conflicting_information.md`
- `knowledge_base/Level 2/trust_and_evidence/how_do_we_compare_information_from_different_sources.md`
- `knowledge_base/Level 2/trust_and_evidence/how_do_we_resolve_conflicts.md`
- `knowledge_base/Level 2/trust_and_evidence/when_should_conflicts_automatically_stop_the_workflow.md`
- `knowledge_base/Level 2/trust_and_evidence/when_should_conflicts_simply_be_presented_to_a_person.md`
- `knowledge_base/Level 2/trust_and_evidence/how_do_we_represent_confidence_without_pretending_certainty.md`
- `knowledge_base/Level 2/trust_and_evidence/what_makes_one_source_more_authoritative_than_another.md`
- `knowledge_base/Level 2/trust_and_evidence/how_do_we_determine_whether_information_should_be_trusted.md`
- `knowledge_base/Level 2/human_collaboration/what_happens_when_the_responsible_person_is_unavailable.md`
- `knowledge_base/Level 2/human_collaboration/what_happens_when_nobody_responds.md`
- `knowledge_base/Level 2/human_collaboration/how_do_we_transfer_work_between_employees.md`
- `knowledge_base/Level 2/human_collaboration/how_do_we_represent_ownership_of_ongoing_work.md`
- `knowledge_base/Level 2/coordination/how_do_we_represent_work_that_is_waiting.md`
- `knowledge_base/Level 2/coordination/how_do_we_represent_work_that_is_blocked.md`
- `knowledge_base/Level 2/coordination/how_do_we_recover_interrupted_work.md`
- `knowledge_base/Level 2/coordination/how_do_we_know_a_piece_of_work_is_still_active.md`
- `knowledge_base/Level 2/communication/how_should_tend_communicate_conflicting_information.md`
- `knowledge_base/Level 2/communication/how_should_tend_communicate_uncertainty.md`
- `knowledge_base/Level 2/communication/when_should_tend_communicate.md`
- `knowledge_base/Level 2/authority_and_ownership/when_is_tend_allowed_to_perform_an_action.md`
- `knowledge_base/Level 2/authority_and_ownership/how_should_tend_communicate_a_refusal_and_offer_escalation.md`
- `knowledge_base/Level 2/authority_and_ownership/how_do_identity_and_authority_join.md`
- `knowledge_base/Level 2/channels_and_permissions/how_should_tend_decide_what_information_each_employee_customer_or_external_partner_may_see.md`
- `knowledge_base/Level 2/channels_and_permissions/how_should_tend_represent_what_each_communication_channel_allows_a_business_to_send.md`
- `knowledge_base/Level 2/explainability_and_observation/how_do_we_explain_every_failure.md`
- `knowledge_base/Level 2/explainability_and_observation/how_do_we_reconstruct_an_entire_business_situation_after_it_has_finished.md`
- `knowledge_base/Level 2/memory_and_knowledge/how_should_memory_be_retrieved.md`
- `knowledge_base/Level 2/memory_and_knowledge/how_do_we_assemble_context_for_each_situation_phase.md`
- `knowledge_base/Level 2/memory_and_knowledge/how_do_we_prevent_outdated_knowledge_from_influencing_new_decisions.md`
- `knowledge_base/Level 2/memory_and_knowledge/how_should_tend_learn_from_its_own_mistakes.md`

## 20. Strongest discoveries and claims requiring parent correction

### Strongest discoveries

1. The architecture’s real unit of failure is not a subsystem; it is the **failed path through a situation**, with a typed declaration and a safe next step.
2. The central safety boundary is **intent → attempt → observed result → business interpretation**. This prevents a send intent, tool call, acknowledgement, or model explanation from becoming a false success.
3. “Failure” is not the same as “bad information.” Conflicts, stale evidence, capability absence, authorization denial, and unknown outcomes have different owners, evidence, and next steps.
4. Partial failure requires **ask/path isolation**, not global stop and not global continuation.
5. Human inaction is a liveness failure with responsibility semantics: notification, acceptance, acknowledgement, progress, and completion must remain separate.
6. B-Story remains the right operational-truth boundary under failure, but only if all boundary-local observers return structured evidence and late results are checked against the latest story.
7. B-Visibility and B-Memory are safely outside the core correctness path only if their failure cannot erase durable attention, current truth, or the ability to choose a safe hold.

### Claims requiring correction or explicit addition by the parent agent

- **Section 8 U4 step 5a:** add an explicit failure declaration when the carrier wait bound is crossed; do not move directly from “after bound” to a new wait without recording the failed path.
- **Section 8 U4 step 5b:** separate stale/degraded successful responses and customer/carrier conflicts from a dead carrier path. They may share a wait shape, but they must not share a failure classification automatically.
- **Section 8 write ownership / IA-10:** state explicitly that B-Membrane delivery evidence is transport evidence only; B-Story owns the business interpretation and failure/closure consequence.
- **Section 8 communication failure path:** add the distinction between send intent, send attempt, provider acknowledgement, delivery, and unknown delivery outcome; define a later channel-specific idempotency/status contract.
- **Section 8 latest-state rule:** generalise the timer/message race rule to late tool results, delivery acknowledgements, and human responses.
- **Section 8 B-Memory serve:** define the safe behaviour when required context cannot be retrieved. The fallback cannot be stale memory or an invented answer; it must be current gathering, wait, human work, or safe stop according to consequence.
- **Section 8 B-Visibility:** clarify how high-consequence owner attention remains visible/recoverable when derived views lag or are unavailable. “Not required for story correctness” is necessary but not sufficient for the product’s promise to make inaction visible.
- **AC-4:** make fail-closed behaviour explicit when authoritative grants/policy cannot be read; cached context must not permit an effect.
