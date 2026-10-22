<!-- ARCHIVE, agent-only. Section 8 as it was before the plain-language rewrite (2026-10-09). Old §8.x numbers and pass history resolve here. Current Section 8 is section_8_interaction_model.md. -->

# Section 8 — Tend Interaction Model

## Status

**Working — first tranche (2026-09-18); CASE-3/CASE-4 second tranche (2026-09-25)**

Cross-boundary behaviour, wake rules, and interaction contracts for CASE-1/CASE-2-validated boundaries plus the T-A / T-B release gates, **CASE-3 stakeholder diligence**, and **CASE-4 unreliable carrier API**. Built from [`section_6_responsibility_model.md`](section_6_responsibility_model.md), [`section_7_boundary_model.md`](section_7_boundary_model.md), Level 2 KB, and harness study Parts 11–14.

**Output type:** Cooperation behaviour across established boundaries — not new boxes.

| Zone | In this document |
|------|------------------|
| **Established** | Wake routing; per-wake contract; CASE-1 to CASE-5 walkthroughs; **§8.10.3 situation-delta egress**; **§8.12.4 fetch-time approval**; **memory serve** in [`how_tend_finds_the_right_situation.md`](how_tend_finds_the_right_situation.md) (2026-10-03) |
| **Provisional** | B-Visibility derive (IA-8); ingress MEANING artifact shape (HC-2); human work item field enum. Learn-path promotion beyond the must-not rules in the memory file |
| **Unconstructed** | Section 10 reconciliation/gap discovery and Section 11 stabilization. Section 9 stress results are in [`section_9_architectural_dimensions.md`](section_9_architectural_dimensions.md). Formal Adjacent-Config §7.12 record also remains open. |

**Prerequisite:** Section 7 first tranche complete. IB-1…IB-14 numbering is **stable** — this document **specifies behaviour**; §7 owns boundary records.

---

## 8.1 Purpose

Section 7 answered: *which responsibilities share a boundary, and who owns state.*

Section 8 answers: *when something happens, which boundary acts, what crosses each edge, and what must be true before and after.*

Interactions are **behaviour**, not deployment:

- A timer does not "send email" — it **wakes B-Story**, which re-reads the situation model and may **propose** communication that B-Membrane **delivers** after gates pass.
- Authorization does not live in one box — **TenantContext** is minted at ingress; **Policy.decide** runs at VALIDATE, Adjacent-Tool, and egress.
- Harness control does not live in one box — **per-wake contract**, atomic commits, and idempotency are **distributed gates**.

Method reference: [`three_level_framework/architecture_contruction.md`](../three_level_framework/architecture_contruction.md) §8.

---

## 8.2 Architectural invariants (interaction layer)

These constrain every contract below. Violating any one is a design defect, not an edge case.

| # | Invariant | Interaction consequence |
|---|-----------|---------------------------|
| INV-1 | **Operational truth** lives in the situation model; B-Story is sole writer of truth commits | No boundary other than B-Story writes initiation, outcome, wait supersede, or closure |
| INV-2 | **Fork B communication** — worker writes intent; membrane sends (I7) | EXECUTE `communicate` / `ask` appends intent to SM; B-Membrane reacts to version change |
| INV-3 | **Timer → story only** (IB-1) | No predetermined outbound send on timer wake at membrane |
| INV-4 | **Write-and-announce together** (HC-1) | SM version commit and change-event emission are one unit of work |
| INV-5 | **Cache never decides** (AC-4, T5) | Enforcement reads authoritative grant/policy store; cache is speed-only for context |
| INV-6 | **VALIDATE is joint** — structural (S) and permission (T) share a step name, **different diagnostics** | See §8.4 |
| INV-7 | **Capability-absent ≠ failure** (D8, O10) | Honest "no source" declaration is outside Failure triage |
| INV-8 | **Book of waits = subscription registry** (HC-3) | No situation-level polling; check-in is the only periodic wake for a situation. **Provisional:** bounded status checks run inside a tool, with a bound and backoff |

---

## 8.3 Per-wake contract (B-Story)

Every B-Story wake runs the same contract. One wake = one advancement attempt from event to honest rest.

**Status:** Established (Groups S/T; harness §11.3; §7.12.9).

```text
WAKE     event delivered to B-Story (see §8.5 routing table)
DEDUP    (S12) a duplicate wake exits before PROPOSE.
RECOVER  interrupted run? rebuild and resume; single-flight per situation
PROPOSE  LLM: next-behaviour proposal (structured; trace-only reasoning)
VALIDATE joint gate — §8.4 (S2 structural + T2 authorization subset)
EXECUTE  fixed path per behaviour enum — §8.3.1
UPDATE   SM version commit (+ HC-1 announce) when operational truth moves
REST     evidence-state predicate (S6) — not LLM self-assessment
```

**Honest rest:** named wait with resume trigger, declared outcome, blocked/safe-hold with visible reason, or running with no further work this wake. Nothing silent.

### 8.3.1 EXECUTE behaviour dispatch (Fork A / B / C)

| Behaviour | Owner path | Cross-boundary touchpoints |
|-----------|------------|----------------------------|
| **gather** | B-Story — one bounded pass over required-information set; returns to PROPOSE; sufficiency **never** inside gather (Fork A) | Adjacent-Tool reads; B-Memory serve (N1) |
| **ask** (clarification only) | B-Story appends clarification intent → HC-1 → B-Membrane delivers | AC-2 on send; L1–L3 |
| **invoke** | B-Story proposes → Adjacent-Tool (S7–S9, T2/T4) → structured evidence → B-Story UPDATE | IB-7, IB-8; §8.8 |
| **communicate** | B-Story appends communication intent → HC-1 → B-Membrane | IB-5, AC-2 |
| **human_work** / **escalate** | B-Story creates/updates human work item on SM (§8.11) | human-work pattern (§8.11); J* |
| **arrange meeting** | B-Story records a meeting wait with partner intent and availability | Meeting rules (Level 2) |
| **wait** | LLM proposes; **code** creates wait record + book-of-waits entry (HC-3) | Time scheduler |
| **resolve** | Declared outcome + optional final communication | A6, A9 |
| **stop_safe** | Blocked with visible reason and deadline | M* |

**Fork B (communicate / ask / tool confirmation):** B-Story never calls channel APIs. Membrane observes SM version change (or explicit send job) and performs egress.

**Fork C (REST vs next round):** Progress = enumerated evidence-state transition (claim-state change, new-source claim, wait/watch record, declared outcome, permission change). Identical repeats and LLM self-assessment do **not** count as progress.

### 8.3.2 Per-wake contract map (Section 6 ↔ harness)

| Step | Group S | Group T | Primary boundary |
|------|---------|---------|------------------|
| WAKE | S1 | T1 mint TenantContext | B-Membrane → B-Story; Time → B-Story |
| RECOVER | S1 | — | B-Story |
| PROPOSE | — (inside the S1 loop, no code of its own) | — | B-Story |
| VALIDATE | S2 | T2, T3, T6 | B-Story; ingress S2 on membrane |
| EXECUTE gather | S3–S4 | T11 reads; P invoke | B-Story |
| EXECUTE invoke | S7–S9 | T2, T4, T6 | Adjacent-Tool |
| EXECUTE communicate | S4–S5 | T2 on send | B-Story write → B-Membrane |
| EXECUTE wait | S4 | — | B-Story + Time |
| UPDATE | S4–S5 | — | B-Story |
| REST | S6 | — | B-Story |

---

## 8.4 VALIDATE — joint gate, split diagnostics

**Status:** Established.

VALIDATE is **one step name** with **two diagnostic channels**. Implementers must not collapse them — a well-formed proposal can still be **denied**.

### 8.4.1 Structural channel (Harness S2)

**Question:** Is this proposal well-typed, bounded, and consistent with durable story state?

| Check class | Examples | On failure |
|-------------|----------|------------|
| Schema | Tool args shape, behaviour enum, required fields | Repair loop with structural diagnostic; re-PROPOSE |
| Behaviour bounds | Rate/hop/cost caps; ask-coverage non-empty for gather | Same |
| State consistency | Idempotency pre-read (S9); wait still active; SM version match | Same |
| Invariants | Class 1–2 product invariants; completion discipline (§8.15) | Same |
| Untrusted ingest hygiene | Field allowlist into model context (U2, S11) | Reject or redact before PROPOSE consumes |

**Not structural:** "Is this actor allowed?" — that is authorization.

### 8.4.2 Authorization channel (T2)

**Question:** Is this principal allowed to cause this effect on this object, now?

```text
Policy.decide(ctx, action, resourceRef, args) → Allow | Deny | StepUp
```

| Checkpoint | Typical actions | Boundary |
|------------|-----------------|----------|
| VALIDATE (proposal) | propose_invoke, propose_send, propose_export | B-Story |
| EXECUTE invoke (pre-connector) | invoke_tool, spend, write_external | Adjacent-Tool (T4 before effect) |
| EXECUTE communicate (egress) | send_message, reveal_field | B-Membrane (AC-2) |
| Config/registry write | grant_change, capability_enable | Adjacent-Config (T8) |

**Enforcement read (AC-4):** Grant/policy lookup for allow/deny uses **authoritative store**. Cache may serve **context reads** for LLM assembly (advisory, N16) — never enforcement.

### 8.4.3 Failure shapes (must be distinguishable in traces)

| Outcome | Channel | User-visible pattern | Example |
|---------|---------|----------------------|---------|
| **Structural reject** | S2 | Repair diagnostic; no permission language | Malformed tool args |
| **Deny** | T2 | Refusal with policy reason; no retry without change | Employee reads another tenant's contact (T-A release gate) |
| **StepUp** | T2 → T7 | Approval request via human work + Fork B tool flow | Refund over grant threshold (CASE-2, G2) |
| **Idempotency block** | S9 (IB-8) | Structured "already initiated / outcome unknown" — **not** Deny | Second refund post while first unknown |
| **Capability-absent** | D8 (gather match) | Honest limitation record; **outside** Failure triage | No shipping source for package ask (§8.17) |

**Anti-pattern:** Treating IB-8 idempotency as authorization. CASE-2 requires **T2 Allow** and **S9 block** as independent gates.

---

## 8.5 Wake routing table (IA-1)

**Status:** Established for CASE-1/CASE-2 kinds; provisional for `timer:release_policy`, `timer:check_in` field detail.

**Rule:** Route to **one primary consumer**. Secondary effects are ** reactions** to SM commits (HC-1), not parallel writers.

| Event kind | Source | Primary target | Contracts | Follow-up |
|------------|--------|----------------|-----------|-----------|
| `ingress:message` | Platform | B-Membrane → **B-Story** wake | IB-2, HC-2, T1 | Membrane: MEANING + ingress VALIDATE; story: C1 commit |
| `ingress:delivery_ack` | Platform | B-Membrane | S12 dedup | Update delivery evidence; may wake B-Story if pending send |
| `ingress:human_response` | Employee/owner | B-Membrane → **B-Story** | IB-2, human-response pattern (§8.11) | J6 record outcome before next decide |
| `ingress:approval` | Human (Fork B tool) | Adjacent-Tool → **B-Membrane** → **B-Story** | T7, AC-3 | Approval artifact on SM; resume invoke |
| `timer:nurture` | Time | **B-Story only** | IB-1, IB-4 | Re-read SM; superseded wait → no-op |
| `timer:recheck` | Time | **B-Story only** | IB-1, IB-9 | Unknown-outcome poll path |
| `timer:scheduled` | Time | **B-Story only** | IB-1 | H4 human-deadline wakes |
| `timer:release_policy` (a field on the wait record, read when the timer wakes) | Time | **B-Story only** | IB-1, IB-4 | Partner wait release; same race rules as nurture |
| `timer:check_in` | Time | **B-Story only** | HC-3 | Situation-level backstop; refresh wait or move |
| `timer:escalation` | Time | **B-Story only** | IB-1, J5 | Human non-response ladder |
| `event:sm_version` | HC-1 fabric | B-Membrane (egress), B-Visibility (derive), B-Memory (observe async) | HC-1, IB-12, IA-8 | Consumers read version; do not write truth |
| `event:capability_result` | Adjacent-Tool | **B-Story** | IB-7 | Structured evidence only |
| `event:config_applied` | Adjacent-Config | **B-Story** (optional wake) | IB-13, T8 | Rule change — no dedicated wake required (Part 14 D3) |
| `event:observation` | Health observer | B-Visibility derive | IA-19 | Builder hull; may route anomaly (§8.14) |
| `internal:trace_fanout` | B-Story post-UPDATE | B-Memory, Adjacent-Improvement, observer | IB-12, IB-14, §8.14.6 | After redaction gate |

**Never route to B-Membrane as primary for:** timer kinds above, tool structured result, unknown-outcome recheck.

**Dedup (S12):** At-least-once delivery → processed-event id per `(situationId, eventId)`; duplicate wake exits before PROPOSE.

---

## 8.6 Contract families — Harness control (HC-*)

HC-* contracts specify **loop, commit, ingress validation, and wait discipline**. They complement IB-* story contracts.

| ID | Name | Rule | Boundaries | Status |
|----|------|------|------------|--------|
| **HC-1** | Write-and-announce | SM version commit and change-event emission are **one transactional unit**. Unannounced write = incomplete job → retry. | B-Story (write); all consumers | Established |
| **HC-2** | Ingress MEANING vs truth commit | B-Membrane: bounded MEANING artifact (candidate situations, attach/create/hold/split **intent**) + ingress VALIDATE (0/1/many, hard/soft). B-Story: **C1 operational-truth commit** only. Create shell (IB-6) ≠ C1. | B-Membrane → B-Story | Provisional (artifact schema) |
| **HC-3** | Book of waits + check-in | Every wait registers resume trigger in book-of-waits. Situation-level check-in is the **only** periodic backstop. Lost event heals via check-in. No situation-level polling. **Provisional:** bounded tool-level status checks are allowed. | B-Story + Time | Established |

### HC-1 consumer obligations

| Consumer | On `event:sm_version` | Must not |
|----------|----------------------|----------|
| B-Membrane | Evaluate pending send jobs against new version | Write SM truth |
| B-Visibility | Queue derive (IA-8) | Write SM truth |
| B-Memory | Enqueue observe (IB-12 async) | Block commit |
| Situation worker (same story) | Preempt/re-queue if newer version | Assume stale SM |

### HC-2 ingress outcomes

| VALIDATE outcome | Membrane action | B-Story action |
|------------------|-----------------|----------------|
| 0 matches | Hold or create per B6 | Optional shell (IB-6) |
| 1 match | Wake with attach intent | C1 commit + route correction if needed |
| Many (hard) | Hold; no silent attach | B9 soft-route hold + C5 candidates |
| Many (soft) | Wake with split intent | A12 split-early if policy permits |
| Create new | Stamp shell + wake | First truth commit separate |

---

## 8.7 Contract families — Authorization control (AC-*)

AC-* contracts specify **TenantContext, Policy.decide, and enforcement-read discipline**.

| ID | Name | Rule | Boundaries | Status |
|----|------|------|------------|--------|
| **AC-1** | TenantContext propagation | Mint once per wake/ingress from **verified identity only** (hostname, IdP, channel binding, signed job). Immutable for wake lifetime. Propagate on every cross-boundary call. | B-Membrane, B-Story, Adjacent-Tool | Established |
| **AC-2** | Egress Policy.decide | Before outbound send: SM version ref + send decision **and** `Policy.decide(send, …) → Allow`. StepUp → AC-3. | B-Membrane | Established |
| **AC-3** | StepUp approval return | Deny is final for that proposal. StepUp creates human work + Fork B deterministic approval tool path. Membrane delivers request; **approval artifact** returns through ingress; T2 re-run before effect. | B-Story, Adjacent-Tool, B-Membrane | Established (CASE-2, G2) |
| **AC-4** | Enforcement-read-no-cache | Any gate that allows/forbids action reads **authoritative** grant/policy store. Cache may accelerate **context** reads only. | All T gates | Established (Part 14 D2) |

### TenantContext (minimal shape — Level 2)

| Field | Role |
|-------|------|
| `tenantId` | Mechanical isolation (U1) |
| `principalId`, `principalType` | Actor for Policy.decide |
| `grantsSnapshotRef` | Pointer for audit — live read still authoritative at T5 |
| `requestId` | Correlation across trace |

**Never authorize from:** model-extracted tenant, SM narrative fields, tool args alone, unverified headers.

---

## 8.8 Story interaction contracts (IB-1 … IB-14)

Full index in §7.12.8. This section specifies **behaviour** each contract requires.

| ID | Behaviour specification | Established? |
|----|-------------------------|--------------|
| **IB-1** | Timer wakes route to B-Story only. Membrane never sends on timer alone. | ✅ CASE-1, CASE-2 |
| **IB-2** | Inbound event: membrane routes → wake B-Story before gather on wrong attachment. | ✅ CASE-1 |
| **IB-3** | Inbound reply path: one SM version = inbound record + wait supersede (atomic). | ✅ CASE-1 |
| **IB-4** | Timer path: read **latest** SM before outbound decision; superseded wait → no-op. | ✅ CASE-1 |
| **IB-5** | Egress: requires SM version + explicit send decision + AC-2 Allow + L1–L3. | ✅ CASE-1, CASE-2 |
| **IB-6** | Create/fan-out may stamp empty situation + lineage; truth commits = B-Story. | ✅ CASE-1 |
| **IB-7** | Tool returns structured evidence to B-Story only; never writes SM claims. | ✅ CASE-2 |
| **IB-8** | Before irreversible effect: read SM for initiation/idempotency key; block duplicate post. **S9 — not T2.** | ✅ CASE-2 |
| **IB-9** | Unknown-outcome recheck timer wakes B-Story; same capability status path. | ✅ CASE-2 |
| **IB-10** | Unknown outcome on irreversible action: liveness **waiting** on SM until bound spent. | ✅ CASE-2 |
| **IB-11** | Initiation + unknown + wait in **one** SM version (generalizes IB-3). | ✅ CASE-2 |
| **IB-12** | Worker trace → B-Memory **async** observe; never blocks SM commit. Serve half: sync context on request. | Provisional learn |
| **IB-13** | B-Memory config candidates → **deterministic configurator tools** only (T8). | Provisional |
| **IB-14** | Training-grade trace → Adjacent-Improvement; separate from business memory activation. | Established pattern |

### Human-work extensions (provisional naming — not renumbering IB-1…14)

Category audits proposed IB-15+ for human work. Section 8 absorbs these as **behaviour under IA-14** to avoid index collision:

| Pattern | Rule |
|---------|------|
| Human work commit | Create/update/close work item = SM version commit only |
| Human request egress | Extends IB-5: work-item version + L visibility + AC-2 |
| Human response ingress | Membrane routes; B-Story **J6 records outcome** before next decide |

---

## 8.9 Story commit protocol (IA-2)

**Status:** Established pattern; atomic move catalog grows with construction units.

### 8.9.1 Write ownership

| Writer | May commit on SM | Must not |
|--------|------------------|----------|
| **B-Story** | Operational truth, waits, human work items, send decisions, claims | — |
| **B-Membrane** | Ingress trace, routing metadata, delivery acks | Operational claims, outcomes, waits |
| **B-Memory** | Nothing on SM | Direct truth writes |
| **B-Visibility** | Nothing on SM | Derived projections only |
| **Adjacent-Tool** | Transient invoke state only | SM version commits |

**Reason tags (G3 — provisional):** Every B-Story commit carries `reason` enum for audit (e.g. `inbound_reply`, `timer_nurture`, `tool_result`, `human_outcome`).

### 8.9.2 Atomic move catalog

| Move | SM contents (one version) | Blocks unsafe action |
|------|---------------------------|----------------------|
| Inbound + supersede wait (IB-3) | Inbound record + wait cancelled | Stale nurture send |
| Initiation + unknown + wait (IB-11) | Tool initiation claim + outcome unknown + recheck wait | Duplicate refund post |
| Partial gather (IA-2a) | New claims + optional wait; ask not closed | Premature resolve |
| Human work open | Work item row + optional notify intent | Duplicate investigation (J4) |
| Handoff pending (IA-14) | Transfer state until accepted | False ownership transfer |
| Capability-absent (§8.17) | Declaration + evidence refs | Adjacent-topic answer |
| Closure (A6, A9) | Outcome tag + liveness complete | Further automation |

**Create shell vs first truth (§7.8.1):** IB-6 allows empty stamp; first operational-truth commit is a separate version with explicit reason.

---

## 8.10 Membrane interactions (IA-3, IA-10)

### 8.10.1 Egress gate (IA-3)

B-Membrane sends only when **all** hold:

1. Referenced **SM version** is current or intentionally historical (resend semantics).
2. **Send decision** artifact exists on that version (Fork B).
3. **AC-2** `Policy.decide → Allow` for channel, destination, content class.
4. **L1–L3** channel rules (template, window, consent).
5. **U2** field allowlist — outbound encoding strips untrusted carryover.

Draft text and LLM reasoning are **not** sendable without decision artifact (F2).

### 8.10.2 Failure propagation (IA-10)

| Failure class | Membrane action | B-Story action |
|---------------|-----------------|----------------|
| Undeliverable (bounce, block) | Record delivery failure evidence | Wake; update claim; J5 classify; may escalate |
| Rate limit / platform error | Transient retry per L rules | Wait or alternate channel proposal |
| Policy block at egress | Do not send; return Deny diagnostic | Re-propose or escalate |

Membrane **does not** declare story failure or write outcome truth.

### 8.10.3 Situation-delta egress (external interactors)

**Status:** Established (CASE-3 construction; KB [`when_should_tend_communicate.md`](../Level%202/communication/when_should_tend_communicate.md) 2026-09-25).

Tend is **not** a chat product that streams tool execution to customers or investors. Outbound to an external interactor follows **committed situation-model versions** (Fork B, HC-1, §8.10.1).

| Rule | Meaning |
|------|---------|
| **No default receipt** | Inbound recorded and situation created/attached **internally**. No default “we received your message” email or chat filler. |
| **No tool trace** | External parties do not see “used tool A / tool B.” They see **situation-level** updates: attachments, honest waits, partial answers, corrections. |
| **Commit triggers express** | B-Membrane sends when the referenced SM version includes **send decision** + permitted content class (AC-2, L*). While B-Story runs without UPDATE, membrane does not invent outbound text. |
| **Material situation change** | Any interactor who must see progress is updated when the **story** changes in a way that matters to them — including partial fulfilment (e.g. deck cleared, revenue ask still open) and situation-true waits (internal approval, finance producing a figure). |
| **Not “change of work”** | Employee boards may show work items; external egress expresses **the situation**, not internal task mechanics. |

**Anti-patterns:** receipt-only outbound; sending before SM commit; tool-log narration to investors/customers; holding a cleared partial answer until all asks close unless the committed story says so.

---

## 8.11 Human and owner interactions (IA-7, IA-14)

### 8.11.1 Owner significance filter (IA-7) — provisional

| Signal | Default surface | May push owner chat when |
|--------|-----------------|--------------------------|
| SM artifact update | Owner board / situation view (O1) | Owner asked, or a Level 2 class event (three classes). **Provisional:** a subscription changes only the delivery channel |
| Human work drift | Escalation column (O3) | Escalation clock fired |
| Routine progress | Artifact only | Urgent consequence configured |

**Established default:** artifact-first; chat is not the situation record.

### 8.11.2 Human work item protocol (IA-14)

**Status:** Provisional field enum; lifecycle rules established in KB.

Human work items live **on the situation model** (B-Story). One **responsible owner** per item (J4).

| Field (conceptual) | Purpose |
|--------------------|---------|
| `workItemId` | Stable id |
| `kind` | subject · provides information · confirms or acknowledges · authorises access or action · approves a business decision · performs work · is accountable for the work · is consulted · is only informed (Level 2, when_should_tend_involve_a_person.md) |
| `owner` | Responsibility target (person · role · queue) |
| `state` | open · pending_handoff · waiting_response · completed · cancelled |
| `acknowledgement` | Timestamp — **≠ completion** (J6) |
| `escalationClock` | J5 ladder position |
| `contextPackage` | Chronological evidence refs for escalate (J7) |

**Lifecycle:**

```text
B-Story PROPOSE human_work / escalate
  → VALIDATE (J9: before any irreversible action on transferred or covered work, check that a substitute has the authority)
  → UPDATE work item on SM + optional notify intent (HC-1)
  → B-Membrane delivers request (IB-5 + AC-2)
Ingress human_response
  → B-Membrane route (IB-2)
  → B-Story J6 record outcome (ack vs completion distinguished)
  → REST or PROPOSE next behaviour
```

| Distinction | Rule |
|-------------|------|
| Ack ≠ completion | The escalation clock may stop on acknowledgement; the work stays open. Business policy sets this |
| Unavailable ≠ no-response | J7 reroute to on-call vs J5 escalation ladder |
| Handoff pending | J8 — prior owner remains until acceptance or auto-accept rule |
| Approval (G2) vs work item (J4) | StepUp creates work item **and** records approval class; grant gate still T2 at invoke |

---

### 8.11.1 Kinds of silence

When a person does not act, Tend names which kind of silence it is. Each kind has a different next step. Silence is not completion. The seven kinds come from Level 2 (`what_happens_when_nobody_responds.md`, lines 15–23).

| Kind | What it means |
|------|---------------|
| Not delivered | The request never reached the person. |
| Delivered, not acknowledged | The person received it, but did not confirm it. |
| Acknowledged, no progress | The person confirmed it, but no work has moved. |
| Rejected | The person refused the work. |
| Unavailable | The person cannot act now. |
| Completed, not recorded | The work is done, but nobody recorded it. |
| Unnecessary | The situation changed, so the work is no longer needed. |

## 8.12 Capability invoke cycle (IA-4)

**Status:** Established (CASE-2); gather pre-match provisional.

### 8.12.1 Full cycle

```text
match asks → sources (D8)
  ├─ capability-absent → atomic SM declaration (§8.17) — stop
  └─ ordered sources present
        → PROPOSE invoke
        → VALIDATE (S2 + T2)
        → Adjacent-Tool:
              T4 enforce before connector
              S7 persist intent
              connector call + bounded poll (M4)
              S9 idempotency read
              S8 structured evidence return (IB-7)
        → B-Story UPDATE (atomic move if needed)
        → optional communicate (Fork B)
```

### 8.12.2 Idempotency: resend vs new initiation (IA-F-3)

| Case | Tool layer | B-Story |
|------|------------|---------|
| Same idempotency key, retry after timeout | **Allowed** — safe resend | SM already has initiation |
| New initiation while unknown recorded | **Blocked** at S9 | IB-11 move already blocks |
| New initiation after terminal outcome | VALIDATE + T2 + business rules | New decision required |

### 8.12.3 Gather match phase (IA-4a — provisional)

Before invoke, **match** maps each ask to sources:

1. Registry lookup (P1, Q1).
2. If no system and no person can serve the ask → **capability-absent** path — not Failure M*. If a person can serve it → human work, not a “no capability” message.
3. If sources exist → priority order (D4) → bounded gather pass.

### 8.12.4 Fetch file: the tool decides, the model does not

**Status:** Example from Swaraj. It shows how the tool and the model have separate roles. It is not a separate approval feature. The rule it illustrates is that a rule the business sets must be enforced by deterministic code, not by a prompt. Source for that principle: Level 2 `how_do_we_make_a_software_product_secure.md`, lines 51–57 (the tenant context is set from verified identity, and a deterministic check returns Allow, Deny, or StepUp before any effect).

**The example.** A business has a file that only some people may see, such as the current year's balance sheet. A customer asks Tend about it in chat. The model calls `fetch_file`, which is the one fetch tool it has. There is no separate approval tool for the model to call.

Inside the tool, in code:
1. Read the file's metadata. Does this file need approval for this requester?
2. If no approval is needed, return the file, and give the model a summary. The file is attached to the message.
3. If approval is needed, the tool itself raises an approval request to the right approver. The model does not see this step.
4. If the approver allows it, the tool returns the file. The model is not told that approval was needed.
5. If the approver denies it, the tool returns "behind authorization; this person did not approve this request." The model then decides what to say next.
6. If the approval times out, the tool returns "approval request failed; the file cannot be fetched." The model then decides what to do next.

In every case, the model receives a tool result and decides the next step. It never decides whether the file may be released.

**Why this shape.** If the model were told "do not give this file unless approved," the model could ignore that instruction, through a mistake or a prompt injected by a customer. A rule that must always hold belongs in the tool's code, not in the model's prompt.

**Tools are precision tools.** Each tool handles many cases: metadata, approvals, timeouts, retries, and what to return. The model sees only the tool's result.

**There is no LLM-facing “approval tool.”** The happy path is a normal capability invoke (e.g. `fetch_file` with object id/name). **Approval is enforced inside the tool implementation** before bytes or handles return to the harness.

```text
B-Story PROPOSE invoke (fetch_file, …)
  → VALIDATE (S2 + T2)
  → Adjacent-Tool:
        read object metadata (object store / R2 / business file layer)
        if approval_required(metadata):
              approval_function(…)   ← shared library, reused by many tools
                → deterministic confirmation flow to approver (membrane + channel)
                → timeouts, missing approver, escalation — coded here, not in prompt
              on deny / timeout → structured denial to B-Story (no file bytes)
              on allow → return file / safe handle
        else → return file / safe handle
  → B-Story UPDATE with evidence refs on SM (HC-1)
```

| Principle | Detail |
|-----------|--------|
| LLM does not read approval metadata to “plan approval first” | Gather lists files and descriptions; model proposes **fetch**; gate runs **inside fetch**. |
| Deny is structured | Worker may escalate (J*), reroute approver, or commit honest external situation text — not bypass T4. |
| Distinct from AC-3 StepUp | StepUp covers grant/class approval for an **effect** (e.g. refund). **Fetch-time approval** is **tool-local** gating on object metadata — same membrane path for yes/no UI, different entry point. |

---

## 8.13 Temporal races (IA-5, IA-6)

### 8.13.1 Timer vs message race (IA-5)

**Established (CASE-1):** Any outbound path **re-reads latest SM version** after wake (IB-4).

```text
Timer nurture wake ──► read SM vN
Inbound reply committed SM vN+1 (IB-3) ──► timer sees superseded wait ──► no-op
```

Same rule applies to `timer:release_policy` vs inbound (IB-4 family).

### 8.13.2 Unknown outcome liveness (IA-6)

**Established (CASE-2, IB-10):**

| Phase | SM liveness | Customer message |
|-------|-------------|------------------|
| Initiation recorded, outcome unknown | **waiting** (H2) | Honest interim (I6) from SM truth only |
| Recheck exhausted, bound spent | Hand the irreversible unknown to a person. Do not auto-redo. Declare the outcome unknown, not failed, and record that declaration with the handoff. The "24h" label elsewhere is an illustration of the window, not the product's number. | Updated honest status |
| Confirmed success/fail | Closure per A6 | Per closure rules |

**Not failed** merely because gateway is silent within bound.

---

## 8.14 Derive, memory, config, improvement (IA-8 – IA-13)

### 8.14.1 B-Visibility derive (IA-8) — provisional

| Trigger | Debounce | Projections |
|---------|----------|-------------|
| `event:sm_version` | Coalesce per situation (e.g. 1–5s) | Owner board, situation timeline, human work columns |
| `event:observation` | Per observer tick | Builder health dashboards |
| Capability-absent aggregate | Batch nightly | Product signal (O10) |

Derive is **read-only**; lag acceptable (O1–O2).

### 8.14.2 B-Memory serve (IA-9) — established serve / provisional learn

The plain-language interaction for this serve path is [`how_tend_finds_the_right_situation.md`](how_tend_finds_the_right_situation.md). Short cards for the speaker before any model interprets the message. The full situation only after one is chosen. Settings are not situation cards. Learning must not change identity, visibility, or settings.

| Class | Example | Injection point |
|-------|---------|-----------------|
| Structured | Tool schemas, registry rows | Validators, tool args |
| Prose preferences | Sign-off style, language | Generating step (N14) |
| Routing cards | This speaker’s open situations, plus a real reference number if the message contains one | Before the model chooses attach, ask, create, or hold |

**U2 field allowlist (U2):** Serve path enforces prompt field allowlist — never "send the row."

### 8.14.3 B-Memory observe/learn (IA-11) — provisional

Async consume of IB-12 trace:

- Reconcile claim families (N8).
- Propose lessons — **never** widen grants (T8, N16).
- Promotion to registry via IB-13 only.

**Untested construction units:** vocabulary drift, repeated tool error → lesson, configurator session.

### 8.14.4 Configurator + IB-13 (IA-12) — provisional

```text
Signup owner or assigned configurator ↔ configurator agent
  → trace IB-12 async
  → B-Memory structured candidate
  → Adjacent-Config deterministic apply (T8)
  → optional B-Story wake on config_applied
```

### 8.14.5 Adjacent-Improvement (IA-13)

IB-14 fan-out: training-eligible trace slices. **Behaviour** flywheel (R) — not business rule activation.

### 8.14.6 Trace redaction gate (before IB-12 / IB-14)

**Status:** Established requirement; schema provisional.

Before async fan-out:

- Strip secrets, tokens, raw credential-shaped bytes (U2, T-B).
- Apply tenant-scoped allowlist per consumer class.
- Gift-CoT tagged `tuning_only` — builder hull only (O10).

---

## 8.15 Trace, observer, and completion discipline

### 8.15.1 Trace-always schema (IA-18)

**Status:** Provisional field names; preservation obligation established (O4, D1).

Every audit-classified wake/run preserves:

| Field class | Content | Consumer |
|-------------|---------|----------|
| Identity | `tenantId`, `situationId`, `smVersion`, `wakeId`, `requestId` | All |
| Asks served | Ask ids + endings | Completion checker |
| Execution evidence | Tool calls, gathers, timings | Explainability, builder |
| Decision pair | Proposal + VALIDATE outcome (S and T separately) | Explainability |
| Reason-key | Emitted business reason (not gift-CoT) | O4 on demand |
| Gift-CoT | Nullable; `tuning_only` | R1, builder only |
| Outcome | rest class, wait ref, declared move | Observer, audit |
| Training flags | Eligibility for IB-14 | Adjacent-Improvement |

**Explain on demand:** Delivery depth via Communication I5; preservation is unconditional.

### 8.15.2 Observer loop (IA-19) — provisional

Health observer emits `event:observation` on **same fabric** as business events (no side channel).

| Probe type | Target hull | Example signal |
|------------|-------------|----------------|
| Provider canary | Provider hull | Model outage, channel API error rate |
| Golden scenario | Harness hull | Per-wake contract drift, VALIDATE bypass |
| Completion sample | Harness hull | Package-vs-payment class (§8.15.3) |
| Aggregate capability-absent | Product hull | Rising honest-refusal rate |

### 8.15.3 Two-hull attribution (IA-20)

| Hull | What broke | Typical response |
|------|------------|------------------|
| **Provider** | External API, model, channel | O8 route; may surface owner message |
| **Harness** | Loop discipline, checker, gate ordering | Builder alert; release gate red |

Attribution ladder hooks to harness §12.9 — situation-scoped vs Failure triage per consequence (O8).

### 8.15.4 Completion-discipline checker (IA-23)

**Status:** Established invariant; checker implementation provisional.

Before `resolve` or story-complete:

| Check | Failure class |
|-------|---------------|
| Every open ask has ending (answered · capability-absent · waived · superseded) | Class 2 — harness defect |
| No pending human work requiring completion | Class 2 |
| Capability-absent not smuggled as success | Class 3 — grounding |
| Customer-facing claims trace to evidence refs | Class 3 |

**Package-vs-payment defect:** Story marked complete while primary ask (package status) unanswered but payment topic addressed — Class 2 invariant violation.

---

## 8.16 Scenario walkthroughs

### 8.16.1 CASE-1 — Priya business-directed outreach: reply before nurture timer

**Construction unit:** CASE-1 primary scene (§7.10.1).

```text
1. SM v10: nurture wait scheduled T+3d (illustrative)
2. Priya inbound email → B-Membrane (T1, HC-2) → wake B-Story
3. PROPOSE: record reply + cancel nurture
4. VALIDATE: S2 OK; T2 Allow for read/write scope
5. UPDATE SM v11 (IB-3): inbound + wait supersede — HC-1 fires
6. REST — no send required
7. Timer fires at T+3d → IB-1 → B-Story reads v11 → nurture absent → no-op (IB-4)
8. Later PROPOSE outreach reply → communicate intent on v12
9. B-Membrane: IB-5 + AC-2 + L rules → send
```

**Proves:** IB-1, IB-3, IB-4, HC-1, Fork B, timer≠send.

### 8.16.2 CASE-2 — Inquiry, order, delay, refund with an unknown gateway outcome: refund gateway silent

**Construction unit:** CASE-2 primary scene (§7.11.1).

```text
1. PROPOSE refund invoke — VALIDATE T2 Allow (G2 approval on SM if needed)
2. Adjacent-Tool: T4 → S7 intent → gateway timeout → poll exhaust
3. S9: store initiation id X — blocks a second new post. A same-key resend is allowed when the other side deduplicates.
4. UPDATE SM vN+1 (IB-11): initiation recorded, outcome unknown, wait until the settle window, which is the business SLA. A default is set, and the configurator can change it. A "24h" figure in older notes is an illustration of that window, not the product's number. HC-1
5. Liveness waiting (IB-10) — not failed. The card stays waiting inside the window.
6. Customer "where is refund?" → ingress → wake → honest I6 from SM only
7. LLM proposes a second post → S9 blocks that post. The situation stays waiting.
8. When the configured window is spent and the outcome is still unknown → hand to a person (J1). Do not auto-redo. Do not open that handoff while the window is still open.
```

**Proves:** IB-7–IB-11, S9≠T2, AC-4 on next wake if grant narrowed.

### 8.16.3 CASE-5 — Package status with no shipping source (capability-absent)

**Construction unit:** Security + explainability (T-A/T-B adjacent; capability-absent D8/O10).

**Situation:** Customer asks "Where is my package?" Business has payment/refund tools but **no shipping/tracking source** connected.

```text
1. Ingress → HC-2 route → B-Story wake
2. PROPOSE gather on asks [package_location]
3. EXECUTE match (IA-4a): registry has no tracking tool. Ask whether a person in this business can answer where the package is.
4. If a person can: open human work with the order details. Do not tell the customer the business has no shipping capability.
5. If no system and no person can: VALIDATE capability-absent — not a failure, not a structural fail.
6. UPDATE atomic: capability_absent declaration + evidence (registry snapshot and the people check)
   — outside Failure M* triage (O10)
7. PROPOSE communicate: honest limitation — no payment-status deflection
8. VALIDATE S2: completion checker will block resolve until ask ending recorded
9. B-Membrane AC-2 + I2 (Section 6) customer depth → send
10. Observer: completion discipline pass; if model had answered payment → Class 2 alert
```

**Proves:** D8, O10, I7, completion checker, trace decision pair separates absent from deny.

**T-A/T-B mapping (release gates):**

| Suite | Proves in this architecture |
|-------|------------------------------|
| T-A cross-tenant invoke | AC-1, T2 Deny, U1 — no provider call |
| T-B poisoned CRM → exfil proposal | U2, S11, T2 Deny, trace redaction |

### 8.16.4 CASE-3 — Investor stakeholder diligence (deck + revenue)

**Construction unit:** CASE-3 stakeholder information (Section 6 walkthroughs CASE-3; §7.4 deferred boundary re-test partially satisfied).

**Situation:** Known investor emails: “Send Q3 revenue and latest pitch deck.” No open diligence situation.

```text
1. ingress:message → B-Membrane (T1, HC-2) → new situation attach intent → wake B-Story
2. PROPOSE record inbound + asks [revenue_q3, pitch_deck]
3. VALIDATE S2; UPDATE SM v1 — HC-1 (internal ack only: situation active, asks open)
4. REST — no outbound (no receipt email; §8.10.3)

5. PROPOSE gather — catalog lists pitch_deck_v3.pdf (+ descriptions); revenue not in file layer
6. PROPOSE invoke fetch_file(pitch_deck_v3) — VALIDATE T2
7. Adjacent-Tool §8.12.4: metadata approval_required → approval_function → approver yes
8. UPDATE SM v2: deck evidence attached; deck ask progressed; revenue ask open
9. HC-1 → B-Membrane: communicate intent on v2 — deck PDF + situation-true line on revenue (partial fulfilment OK)

10. Parallel path: human_work to finance role for Q3 revenue (J2/J3) on SM; escalation if no act (J5/J7 KB)
11. fetch deny on deck: structured denial → B-Story UPDATE → may escalate; external text only on later honest commit
12. Revenue obtained + approved via fetch or human artifact → UPDATE → second situation-delta outbound when commit includes intent
13. Completion checker (§8.15.4): each ask gets an ending before resolve
```

**Proves:** §8.10.3 situation-delta egress; §8.12.4 fetch-time approval; Fork B; no inbound receipt; partial send; human_work for missing revenue; I2 membrane send on SM version only.

**KB:** [`when_should_tend_communicate.md`](../Level%202/communication/when_should_tend_communicate.md) (2026-09-25); human work + escalation in Human Collaboration / Meetings categories.

### 8.16.5 CASE-4 — Stale or unavailable carrier tracking

**Construction unit:** CASE-4 unreliable logistics API (Section 6 walkthroughs CASE-4; §7.4). **Not CASE-5** — carrier source exists in registry; problem is freshness, path usability, or API availability.

**Situation:** Customer asks “Where is my order?” Open **delivery** situation (a new delivery situation, or attach to the order situation, per Section 6 walkthrough CASE-2). Carrier tracking tool is registered.

**Policy inputs (not hard-coded in architecture):** wait **escalation path** on the situation model ([`how_do_we_represent_work_that_is_waiting.md`](../Level%202/coordination/how_do_we_represent_work_that_is_waiting.md)); **SLA / release policy** ([`how_should_deadlines_influence_decisions.md`](../Level%202/time/how_should_deadlines_influence_decisions.md), [`escalation_sla.md`](../research/escalation_sla.md)); default topology often internal logistics → partner ([`business_journeys_map.md`](../research/business_journeys_map.md) §3) — **business configuration**.

```text
1. ingress:message → B-Membrane (HC-2) → wake B-Story (delivery situation)
2. UPDATE SM: inbound + ask [package_location / delivery_status]; no receipt-only outbound (§8.10.3)

3. PROPOSE invoke carrier_tracking(order_ref) — VALIDATE T2
4. Adjacent-Tool: bounded retry/poll per tool contract (Failure KB); structured evidence return (IB-7)

5a. Branch — API hard down / no usable response after bound:
    UPDATE SM: claim unknown or path held; situation-level WAIT (H2)
      subject=carrier tool or recheck job
      reason=awaiting official tracking
      resume trigger=timer:recheck | tool result | partner reply
      release policy=interim customer message per SLA if response deadline fires
      escalation path=configured ladder (remind → reassign → partner → …)
    — uncertainty vs failure labels per bound + contract (Failure: distinguish from uncertainty)

5b. Branch — API answers but status unchanged / not current enough for decision:
    E7 mark degraded/stale where applicable; E2 if customer conflicts with carrier
    UPDATE SM: honest claims + currentness note (Gathering: currentness rule)
    Same WAIT + escalation_path as 5a when next safe step needs human/partner

6. SLA: response-deadline fires while still waiting → B-Story UPDATE with communicate intent
   → B-Membrane: situation-delta to customer (latest honest carrier state, promise breach if true,
     “we’re chasing”) — not tool-trace narration (§8.10.3)

7. Escalation path advances per the business's configuration.
   One business may remind an internal logistics role, then contact the partner.
   That order is configuration. It is not an architecture constant.
   Partner contact (K4) carries a scoped payload (tracking number, problem, ask)
   and an internal note on the trail.

8. Partner wait: same wait spine; partner SLA breach → next rung on escalation_path, only if the business policy allows partner contact
   If escalation framework spent → blocked state surfaced (Coordination); owner/Failure machinery

9. Timer/recheck wakes (IB-1, IB-9, IB-10): B-Story re-reads latest SM (IB-4). Inside the bound, re-invoke or keep waiting. Past the bound, record the failure and follow the configured path.
   customer outbound only on commits with express intent

10. Completion: asks ended honestly; no fake “delivered” on unresolved high-consequence conflict (E2, §8.15.4)
```

**Proves:** D6, H2, H3, E7, M2/M3, J3, K4, I6, §8.10.3, §8.13.2 liveness family (distinct from CASE-2 gateway-silent), tool-layer retry vs story wait, configured escalation_path (not hard-coded internal→partner order), partner scoped egress + internal trail.

**Contrast CASE-5 (§8.16.3):** no tracking tool and no person who can answer → capability-absent. A person who can answer is human work, not this walkthrough, and not a “no capability” message.

**KB:** Failure (`understanding_all_failure_questions.md`, `failure_conversation_and_discoveries.md`); partner ([`how_should_an_external_partner_be_contacted_when_the_business_has_not_acted.md`](../Level%202/meetings_and_human_work/how_should_an_external_partner_be_contacted_when_the_business_has_not_acted.md)); gathering currentness ([`how_do_we_know_when_information_is_sufficiently_current.md`](../Level%202/gathering_information/how_do_we_know_when_information_is_sufficiently_current.md)).

---

## 8.17 Anti-patterns (reject)

| Anti-pattern | Violates | Correct pattern |
|--------------|----------|-----------------|
| Single `ControlService` for loop + grants | S/T distribution | §7.12.9 per-boundary gates |
| Timer → membrane send | IB-1, INV-3 | §8.5 routing table |
| IB-8 as sole refund gate | T2 + S9 | T2 Allow **and** S9 block |
| Cache hit skips Policy.decide | AC-4 | Enforcement read authoritative |
| Membrane send on draft text | IB-5, F2 | Send decision on SM version |
| LLM VALIDATE self-check | S2 | Code validators |
| Memory lesson widens grant | T8, IB-13 | Adjacent-Config only |
| Payment answer substitutes tracking absent | D8, O10, §8.15.3 | Capability-absent declaration |
| CM writes operational truth | INV-1 | B-Story sole truth writer |
| Polling for situation progress | HC-3, INV-8 | Event fabric + check-in backstop |
| Receipt-only “message received” to external party | §8.10.3; communication KB 2026-09-25 | Internal SM record; outbound on material situation commit only |
| Tool-trace narration to customer/investor | §8.10.3 | Situation-delta expression from SM intent |
| LLM invokes separate “approval tool” before fetch | §8.12.4 | approval_function inside fetch_file (and siblings) |
| Hold cleared deck until all asks close by default | §8.16.4 | Partial fulfilment when commit records it |
| Hard-coded “always partner before internal” or fixed day count | §8.16.5 | escalation_path + SLA from business configuration |
| Treat stale tracking same as CASE-5 capability-absent | §8.16.3 vs §8.16.5 | A registered carrier that is down is a wait inside the bound, then a declared failure. Capability-absent is only when no system and no person can answer |
| Stream tool A/B steps to customer | §8.10.3 | Situation-delta on SM commit only |

---

## 8.18 Section 8 completion checklist (first tranche)

| Deliverable (§7.14.1) | Section | Status |
|------------------------|---------|--------|
| IA-1 Wake routing table | §8.5 | ✅ |
| IA-2 SM write discipline | §8.9 | ✅ |
| IA-3 Egress gate | §8.10.1 | ✅ |
| IA-4 Capability invoke cycle | §8.12 | ✅ |
| IA-5 Timer/message race | §8.13.1 | ✅ |
| IA-6 Unknown liveness | §8.13.2 | ✅ |
| IA-7 Owner significance | §8.11.1 | Provisional |
| IA-8 B-Visibility derive | §8.14.1 | Provisional |
| IA-9 B-Memory serve | §8.14.2 | ✅ serve |
| IA-10 Membrane failure | §8.10.2 | ✅ |
| IA-11 B-Memory learn | §8.14.3 | Provisional |
| IA-12 IB-13 configurator | §8.14.4 | Provisional |
| IA-13 Improvement trace | §8.14.5 | ✅ pattern |
| IA-14 Human work protocol | §8.11.2 | Provisional |
| HC-1…HC-3 | §8.6 | ✅ / HC-2 provisional |
| AC-1…AC-4 | §8.7 | ✅ |
| VALIDATE split | §8.4 | ✅ |
| IA-18 Trace schema | §8.15.1 | Provisional |
| IA-19 Observer loop | §8.15.2 | Provisional |
| IA-20 Two hulls | §8.15.3 | Provisional |
| IA-23 Completion checker | §8.15.4 | ✅ invariant |
| CASE-5 walkthrough | §8.16.3 | ✅ |
| CASE-3 walkthrough | §8.16.4 | ✅ |
| CASE-4 walkthrough | §8.16.5 | ✅ |
| §8.10.3 situation-delta egress | §8.10.3 | ✅ |
| §8.12.4 fetch-time approval | §8.12.4 | ✅ |

**Scenario walkthroughs CASE-1 to CASE-5 complete.** Memory serve is [`how_tend_finds_the_right_situation.md`](how_tend_finds_the_right_situation.md). **Section 9 dimension coverage is complete; next is Section 10 reconciliation:** [`section_9_architectural_dimensions.md`](section_9_architectural_dimensions.md). Do not reopen the memory choices.

---

## Related

- [`section_6_responsibility_model.md`](section_6_responsibility_model.md) — Groups S, T, U
- [`section_7_boundary_model.md`](section_7_boundary_model.md) — §7.12.8 index, §7.12.9 gates, §7.14 handoff
- [`construction_record.md`](construction_record.md) — reasoning trail
- [`section_7_boundary_model.md`](section_7_boundary_model.md) — §7.12.8–§7.12.9 IB index and gate table
- [`agent_harness_study.md`](../agent_harness_study.md) — §11.3 per-wake, §14.2 cache, §14.3 four text layers
