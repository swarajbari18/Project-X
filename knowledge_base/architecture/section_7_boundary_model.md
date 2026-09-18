# Section 7 — Tend Boundary Model

## Status

**Working — Pass 6 + Memory gap remediation + Level 2 category pass (2026-09-18)**

Section 7 first tranche complete for U1/U2. **B-Memory** expanded beyond injection. **§7.12.9** adds harness vs authorization gate table. Interaction behaviour: [`section_8_interaction_model.md`](section_8_interaction_model.md) (IB-1…14 stable; **HC-*** / **AC-*** families).

**Depends on:** [`section_6_responsibility_model.md`](section_6_responsibility_model.md) (Section 6 complete, working).

**Method reference:** [`three_level_framework/architecture_contruction.md`](../three_level_framework/architecture_contruction.md) §7.

**Conversation record:** [`construction_record.md`](construction_record.md) — Priya nurture/reply and refund gateway-silent reasoning; Pass 5 merge BH-1+BH-2 → **B-Story**.

---

## 7.1 Purpose

Section 6 answered **what Tend must reliably own** — responsibilities A–P, clusters, state ownership, scenario validation.

Section 7 answers **which responsibilities share one logical ownership boundary** — and **why that boundary is justified or rejected**.

A boundary is a **logical ownership domain**, not a deployment unit, database, or harness folder name.

Central principle (method §7.32):

> A subsystem boundary is justified when a coherent responsibility can be owned, changed, operated, failed, reasoned about, and evolved independently without breaking the correctness of the surrounding system.

**Output type:** Boundary hypotheses → boundary tests → architectural boundaries (established / provisional / rejected) → boundary graph sketch → Section 8 handoff.

Components named here (Situation Worker, Conversation Manager, etc.) are **hypotheses under test**, not settled Level 3 implementation names, until marked **established** in this document.

---

## 7.2 Construction sequence (this document)

```text
Section 6 responsibilities + clusters (§6.4, §6.8, §6.9)
        ↓
Boundary hypotheses (BH-1 … BH-5)          ← Pass 2 ✅
        ↓
Boundary tests on construction units       ← Pass 3 (U1) ✅; Pass 4 (U2) ✅
        ↓
Boundary decision records (method §7.24)   ← Pass 5 ✅
        ↓
Boundary graph + Section 8 handoff         ← Pass 6 ✅
```

We do **not** apply all eleven boundary tests to all twelve clusters in one pass. We test **hypotheses** against **construction units** first — the same incremental loop as Section 6.

---

## 7.3 Load-bearing decision — operational truth in the situation model

Recovered in architecture construction conversation (before this file was written):

The **situation model** is the **versioned story** of one operational problem. Each version records **operational truth** — durable facts the next wake must treat as ground to act safely:

- what already happened (inbound recorded, refund initiated with ID)
- what is in flight or unknown (outcome pending, nurture evaluation due)
- what must block unsafe next action (no second refund; no nurture after reply)
- active waits with subject, reason, resume trigger (H2)

**Not authoritative in the situation model (linked, not substituted):**

- LLM chain-of-thought and reasoning scratch
- raw tool I/O logs (audit/trace; worker interprets into claims and waits)
- proposed outbound drafts not yet sent (decision intention — F2)

Worker runs link to situation model versions for explain-on-demand (O4, O5). The product explains by interaction; the story spine stays inspectable without reading every trace.

This decision constrains every boundary hypothesis below: **one authoritative writer of operational story truth**; other boundaries read it or request expression through explicit contracts (Section 8).

---

## 7.4 Construction units for boundary tests

| Unit | Scenarios | Pass |
|------|-----------|------|
| **U1** — Business-directed outreach | Priya list, missing email, nurture, reply before timer, decline, second outreach | Pass 3 ✅ |
| **U2** — Commercial lifecycle chain | Inquiry → order → delay → refund; gateway silent after refund post | Pass 4 ✅ |
| **U3** — Stakeholder information | Investor ask | Noted; tests deferred |
| **U4** — Unreliable external API | Stale carrier tracking | Noted; tests deferred |

Primary stress tests for first boundary tranche: **U1** (temporal + egress authority) and **U2** (irreversible unknown + idempotency + tool vs story ownership).

---

## 7.5 Boundary tests (reference)

Each hypothesis in Pass 2+ is scored against method §7.6–7.17:

| # | Test |
|---|------|
| 1 | Conceptual cohesion |
| 2 | Ownership |
| 3 | State ownership |
| 4 | Consistency / atomicity |
| 5 | Lifecycle |
| 6 | Change coupling |
| 7 | Failure coupling |
| 8 | Temporal coupling |
| 9 | Scaling independence |
| 10 | Security / authority |
| 11 | Interaction cost |
| + | Negative test (boundary exists only for tech/deploy convenience?) |

---

## 7.6 Construction frontier (Section 7)

| Zone | As of Pass 6 |
|------|----------------|
| **Established** | **B-Story**, **B-Membrane**; §7.3 operational truth; boundary graph §7.13; IB-1…IB-14 index; Adjacent-Tool, Adjacent-Improvement contracts |
| **Provisional** | **B-Memory**, **B-Visibility**; IB-6 create stamp |
| **Unconstructed** | U3/U4 re-test; Sections 9–11 dimension stress |

---

Components named here are **logical boundaries** once marked **established** in §7.12. Level 3 names (Durable Object, Workers service, etc.) remain hints only.

---

## 7.7 Architectural boundaries (accepted)

Pass 5 merges Pass 2 hypotheses **BH-1 + BH-2** into one boundary. BH-3 … BH-5 become **B-Membrane**, **B-Memory**, **B-Visibility**.

| ID | Name | Pass 2 origin | Status |
|----|------|---------------|--------|
| **B-Story** | Story execution (model + worker) | BH-1 + BH-2 merged | **Established** (U1, U2) |
| **B-Membrane** | Conversation manager (ingress / egress) | BH-3 | **Established** (U1, U2) |
| **B-Memory** | Memory — observe, learn, maintain, serve | BH-4 | **Provisional** (U1/U2 neutral on serve path; learn path untested) |
| **B-Visibility** | Visibility & audit (derived views) | BH-5 | **Provisional** (U1/U2 neutral) |

**Adjacent (not Level 2 boundaries):** Capability tool harness (§7.12.5, IB-7, IB-8); Product improvement flywheel (§7.12.6, IB-14); Configuration registry apply path (Group Q — deterministic tools, IB-13).

**Deferred:** §7.8.1 first-version create stamp — **provisional** rule IB-6; U3/U4 or Section 8 may refine.

---

## 7.7.1 Hypothesis index (Pass 2 — superseded by §7.7)

| ID | Working name | Disposition |
|----|--------------|-------------|
| BH-1 | Situation Model | Merged → **B-Story** |
| BH-2 | Situation Worker | Merged → **B-Story** |
| BH-3 | Conversation Manager | Renamed → **B-Membrane** |
| BH-4 | Memory | Renamed → **B-Memory** |
| BH-5 | Visibility & audit | Renamed → **B-Visibility** |

---

## 7.8 Boundary hypotheses (Pass 2)

Each hypothesis follows method §7.5: problem owned, responsibilities in/out, state authority, explicit exclusions. **Tests not scored yet** — Passes 3–4.

### BH-1 — Situation Model (story substrate)

| Field | Content |
|-------|---------|
| **Problem owned** | Maintain the **versioned operational story** for each situation: one honest record per operational problem, graph links, closure discipline, ingest pointers on the story — the durable substrate every wake reads. |
| **Responsibilities included** | **A1–A11**, **B7** (Group A + ingest records on story); enforces graph/split/link/closure rules as **record semantics** |
| **Responsibilities excluded** | **B1–B6** routing; **C–G** comprehension/decision/grants execution; **H** timer scheduling implementation; **I/L** expression; **D/P** gather/invoke; **J/K** human routing; **M** failure triage logic; **N** memory assembly; **O** derived views |
| **State owned (authoritative)** | Situation model document per problem (version chain); situation graph edges and typed links; closure/outcome tags on the record; wait records **as stored on the story**; ingest record references attached to the situation (§6.9) |
| **State referenced, not owned** | Canonical business facts (ERP); canonical channel messages (platforms); grants/rules (business config); identity anchor fields derived from participation |
| **Authority** | Defines **what is true** in the story; does not authorize business actions alone — grants enforced in BH-2 + harness |
| **Relationship to BH-2** | BH-1 is the **substrate**; BH-2 is the **sole writer of new operational-truth versions** under normal operation (see open question §7.8.1). Other boundaries **read** BH-1; they do not co-own authoritative fields. |
| **Provisional runtime hint** | Durable Object / record store per situation (Level 3 — not normative here) |
| **Status** | Provisional — U1 pass (with BH-2 write contract) |

### BH-2 — Situation Worker (advance story)

| Field | Content |
|-------|---------|
| **Problem owned** | **Advance one situation** through comprehend → gather → trust → decide → coordinate time → human/partner triggers → failure handling — and **commit operational truth** to BH-1. |
| **Responsibilities included** | **C1–C4**; **D1–D7**, **P1–P3** (coordinate capabilities, do not own canonical data); **E1–E6**; **F1–F6**, **G1–G6** (propose behaviour; grants enforced deterministically after proposal); **H1–H7**; **J1–J6**, **K1–K4** (trigger human/partner work); **M1–M6** (declare failure, unknown outcome, escalation — story-level); **B4 correction phase** (split/merge/re-route after evidence); partial **B6** (fan-out from list instruction — may split with BH-3 on ingress stamp) |
| **Responsibilities excluded** | **A** graph rules as passive record (owned by BH-1 semantics, written by BH-2); **B1–B2**, **B5** ingress routing; **I1–I6**, **L1–L4** channel expression; **O1–O6** owner/builder views; **N** serve/loader (BH-4 sync); **N6–N10** learning pipeline (BH-4 async — off worker hot path) |
| **State owned (authoritative)** | **Writer** of situation model versions (operational truth commits); worker run references linked to SM versions; decision intention artifacts (draft outbound, approval requests) **linked to** SM, not substituted for story truth (F2) |
| **State referenced, not owned** | Ingest events from BH-3; loader slices from BH-4 (sync); capability results from tool harness; grants from business config (authoritative — not memory-written) |
| **Authority** | Selects next behaviour inside grant; stops safely when no safe path (F4, M5); never expands permissions (G3) |
| **Cross-boundary rules (from conversation — to test)** | Timer wake → read **latest** SM → decide (no predetermined send); refund unknown → write initiation + unknown outcome + wait; idempotency enforced with tool harness + SM state |
| **Provisional runtime hint** | Background worker loop per open situation (Level 3) |
| **Status** | Provisional — U1 pass |

### BH-3 — Conversation Manager (ingress / egress membrane)

| Field | Content |
|-------|---------|
| **Problem owned** | **Membrane** between the outside world and Tend's stories: classify and route inbound events; deliver **permitted** outbound expression on channels; enforce channel visibility gates — without owning the business story or advancement decisions. |
| **Responsibilities included** | **B1** receive events; **B2** ingress route (attach/create/hold before gather); **B5** assemble incoming-event context once for router; **B6** (ingress side: list instruction → create N situations + aggregate artifact); **I1–I6**, **L1–L4** expression and channel rules |
| **Responsibilities excluded** | **C–G** comprehend/decide/grant logic; **D/E** gather and trust; **H** nurture/refund/wait decisions; **A** closure and graph semantics (except **possible** first-version stamp on create — §7.8.1); **M** failure declaration; **O** business view; authoritative **wait cancel / outcome unknown** writes |
| **State owned (authoritative)** | In-flight channel delivery state; routing session context for ingress; outbound send jobs tied to SM version + grant check |
| **State referenced, not owned** | Situation model (read for egress; read for route matching); ingest records (**B7** stored on story — write path via BH-1/BH-2 per §7.8.1) |
| **Authority** | May send only what SM + grants permit; may route ingress; may **not** authorize refunds, overrides, or story changes |
| **Cross-boundary rules (from conversation — to test)** | No outbound to Priya/customer without BH-2 story update + explicit send decision; ingress classifies event kind (message vs timer wake is **not** CM — timer → BH-2 directly) |
| **Provisional runtime hint** | Ingress/egress service + channel adapters (Level 3) |
| **Status** | Provisional — U1 pass |

### BH-4 — Memory (observe · learn · maintain · serve)

| Field | Content |
|-------|---------|
| **Problem owned** | **Business memory for one tenant** — observe operational activity, learn and maintain business knowledge and configuration artifacts, **serve** scoped context to worker and membrane — without replacing comprehension, gathering, decision, or authoritative grant/registry writes. |
| **Responsibilities included** | **N1–N16** (see §6.4 Group N). Three internal loops (harness study §11.2): **Observe** (N6 — async trace consumption); **Learn/maintain** (N7–N10, N12–N14 — reconcile, lifecycle, vocabulary, config candidates); **Serve** (N1, N11 — sync loader on context need). |
| **Responsibilities excluded** | **C, D, F** core loops; **A** situation graph writes; **G** grants; **O** aggregate views; **Q** authoritative registry apply (memory **proposes** via N13; configurator tools **apply**); **R** product behaviour improvement (Adjacent-Improvement) |
| **State owned (authoritative)** | Business knowledge records; episodic experience; learning items with lifecycle; vocabulary/aliases; **structured config artifacts** (schema-bound JSON for tools/registry); **prose preference artifacts** (runtime-injected behaviour text); assembly templates (memory-owned layer per prompt constitution); retrieval indexes |
| **State referenced, not owned** | Situation model (scope + links); closed situations via graph links (N2, N5); worker and configurator traces (input, not owned); configuration registry authoritative values (Q1 — read for serve; write via IB-13 apply path only) |
| **Authority** | Returns context slices and config **candidates**; **never** decides next behaviour, writes operational truth to BH-1, or silently changes grants/policy (N3, N16) |
| **Two learning axes (§6.4 N3/N15)** | **Business content** → B-Memory (this boundary). **Product behaviour** (fine-tuning, prompt optimizer on assembly templates) → Adjacent-Improvement — same trace stream, different consumer |
| **Configurator observation** | Owner talks to **configurator agent** (not runtime employee Tend). B-Memory observes those sessions (N6, N13), maintains vocabulary and preference text, proposes structured values — applied only through deterministic configuration capability (IB-13) |
| **Relationship** | **Serve:** BH-2 (and BH-3 routing slice at scale) call with **context need** — not free-form query. **Observe:** async off worker/configurator trace — must not block IB-3 atomic commits |
| **Status** | Provisional — U1/U2 neutral on serve path; learn/observe path needs dedicated construction unit |

### BH-5 — Visibility & audit (derived views)

| Field | Content |
|-------|---------|
| **Problem owned** | Present **derived** owner and builder visibility — artifacts, snapshots, explain-on-demand, system health observation — without becoming a second source of story truth. |
| **Responsibilities included** | **O1–O6** |
| **Responsibilities excluded** | **A–N** authoritative situation advancement; **I/L** actor-facing expression (Communication owns delivery rules; O owns what appears on boards and reconstructions) |
| **State owned (authoritative)** | Derived projections (owner snapshot, filters, observation events); reconstruction **views** over existing records |
| **State referenced, not owned** | Entire situation graph and traces (read-only for render) |
| **Authority** | None over business actions; surfaces attention (O3) |
| **Relationship** | Reads BH-1; never required for BH-2 correctness on the next safe step |
| **Status** | Provisional — untested |

---

### 7.8.1 Open tension — first situation model version on create

Harness study and Section 6 **B2/B6** imply ingress may **create** a situation and stamp initial lineage/templates before the worker first runs.

Pass 2 records the split:

| Phase | Provisional owner |
|-------|-------------------|
| **Create + ingress attach** | BH-3 (or BH-3 + BH-1 empty record) |
| **All operational-truth versions thereafter** | BH-2 → BH-1 |

Pass 3 (U1 owner list → 30 situations) must test whether this split holds or BH-2 must own create as well.

---

### 7.8.2 Rejected alternatives (named before testing)

These are **not** boundary hypotheses. Listed so Passes 3–5 do not re-litigate them without new evidence.

| Alternative | Why rejected at Pass 2 |
|-------------|------------------------|
| **LLM conversation trace as authoritative truth** | Next wake cannot read it safely; not auditable as story; violates §7.3 |
| **Timer / nurture sends directly to contact** | Bypasses comprehend, grants, channel rules; fails temporal authority test (conversation) |
| **CM as sole situation model writer** | Collapses ingress with decision loop; wrong change drivers (channels vs business behaviour) |
| **Tool harness writes refund/outbound truth to SM** | Tool returns evidence; worker interprets into claims/waits (Failure category; §7.3) |
| **12 clusters = 12 boundaries** | Violates smallest complete problem; excessive coordination (method §7.4) |

---

### 7.8.3 Cluster → hypothesis mapping (§6.8 merge)

```text
Cluster 1  (Story & graph)     ──► BH-1 substrate + BH-2 writes
Cluster 2  (Ingress & routing) ──► BH-3 ingress; BH-2 B4 correction
Cluster 3  (Comprehension)     ──► BH-2
Cluster 4  (Information acq.)  ──► BH-2 (+ tool harness adjacent)
Cluster 5  (Evidence)          ──► BH-2
Cluster 6  (Behaviour/control) ──► BH-2 (+ deterministic grant gate in harness)
Cluster 7  (Temporal coord.)   ──► BH-2 schedules; BH-1 stores waits on story
Cluster 8  (Expression)        ──► BH-3 egress
Cluster 9  (Human/partner)     ──► BH-2 triggers; humans outside boundary
Cluster 10 (Failure)           ──► BH-2 story-level; tool-layer M4 adjacent
Cluster 11 (Memory & knowledge) ──► BH-4
Cluster 12 (Configuration)       ──► Group Q (registry + configurator apply) — IB-13 with BH-4
Cluster 13 (Product improvement) ──► Adjacent-Improvement (not BH-4)
Cluster 14 (Visibility)          ──► BH-5
```

---

| **Status** | Provisional — U1 neutral (derived only) |

---

## 7.10 Pass 3 — U1 boundary tests

### 7.10.1 Primary scene — Priya replies while nurture is scheduled

**Situation S1:** Owner-initiated outreach to Priya. First message sent. Active wait: nurture follow-up at T2 if no inbound before T2. **Event:** Priya inbound message at T3 (before T2).

**Story move required (§7.3):**

```text
BEFORE (SM vN):
- Outreach to Priya (campaign ref)
- Last outbound: message at T1
- Wait: nurture at T2 if no inbound from Priya
- Liveness: running

AFTER (SM vN+1 — one operational-truth commit):
- Inbound: Priya message M at T3 (referenced)
- Wait: nurture at T2 superseded (reason: contact replied)
- Liveness: running (engaged; not closed)
- Linked: draft outbound D (decision intention — separate artifact, F2)
```

**Responsibilities exercised (§6.6 U1):** B2, C1, F1, H7, I1 (later), A1 — not A6/A9 (reply does not close outreach).

**Event flow under test:**

```text
Priya message ──► BH-3 ingress (classify, route S1, wake BH-2)
                        │
                        ▼
                  BH-2 comprehend + commit SM vN+1
                  (inbound + wait supersede — atomic)
                        │
          ┌─────────────┴─────────────┐
          ▼                           ▼
   BH-4 context (optional)     decide next + draft D
          │                           │
          └─────────────┬─────────────┘
                        ▼
              BH-3 egress (only if send permitted)

Timer at T2 ──► wake BH-2 (NOT BH-3 send)
                        │
                        ▼
              read latest SM → nurture superseded → no outbound
```

---

### 7.10.2 Test scores — primary scene (tests 3, 4, 8, 10)

Legend: **Pass** | **Pass+contract** (needs Section 8 rule) | **Fail** | **N/A**

| Hypothesis | T3 State ownership | T4 Atomicity | T8 Temporal coupling | T10 Security / authority | U1 verdict |
|------------|-------------------|--------------|----------------------|--------------------------|------------|
| **BH-1** | **Pass** — authoritative record structure, waits on story, version chain | **Pass+contract** — substrate stores atomic version; writer is BH-2 | **Pass** — wait state lives on SM for timer re-read | **Pass** — does not authorize send | Substrate valid; **not independently sufficient** without BH-2 writer |
| **BH-2** | **Pass** — sole writer of operational-truth commits | **Pass** — inbound + wait supersede in **one** SM version | **Pass+contract** — timer path re-reads latest SM (IB-4) | **Pass** — decides inside grant; no direct channel send | **Pass** |
| **BH-3** | **Pass** — owns ingress/egress state only; **reads** SM for route/send | **Pass** — does **not** co-write nurture cancel or inbound truth | **Pass** — timer wake bypasses BH-3 egress (IB-1) | **Pass** — send gated on SM version + grants (IB-5) | **Pass** |
| **BH-4** | **N/A** — injects context; no SM authority | **N/A** | **N/A** | **N/A** | **Neutral** — optional on comprehend path |
| **BH-5** | **N/A** — derived read of SM | **N/A** | **N/A** | **N/A** | **Neutral** — board updates after SM commit |

**Split under test (BH-1 + BH-2):** U1 supports **substrate vs writer** split. BH-1 alone cannot advance the story; BH-2 without BH-1 has nowhere durable to commit. **Coupling is intentional** — documented as write contract, not merged into one hypothesis yet (Pass 5 may treat BH-1+BH-2 as one boundary or a tight pair).

---

### 7.10.3 Secondary scene — owner gives 30-lead list (§7.8.1)

**Event:** Owner instruction + CSV → **B6** fan-out to 30 situations + one aggregate board artifact.

| Question | U1 result |
|----------|-----------|
| Who creates empty S1…S30 records? | **BH-3 ingress (B6)** stamps create + lineage; **BH-2** runs per card after |
| Does this break BH-2 sole-writer rule? | **No** for operational truth — create is structural shell; first **truth** versions still BH-2 (profile, draft, send) |
| §7.8.1 status | **Still provisional** — acceptable split for fan-out; needs one explicit rule: **create stamp ≠ operational-truth commit** (IB-6) |

---

### 7.10.4 Tertiary scenes — U1 spot checks (abbreviated)

| Scene | Boundary stress | Result |
|-------|-----------------|--------|
| Priya **declines** → A6/A9 closure | BH-2 writes closure + outcome tag; BH-3 may notify owner (G2 significance — open) | BH-2 pass; G2 deferred Section 8 |
| **Second outreach** after closed S1 | BH-2 creates S2 + link (A7); BH-3 may initiate new channel sequence | Graph rules in BH-1 semantics; writes by BH-2 — pass |
| **No email** — Apollo missing | BH-2 gather + wait; BH-3 I4 ask owner; BH-5 O1 artifact | No boundary conflict — pass |
| Priya reply **before** nurture (happy path) | Confirms timer must not send blindly | **Established** — rejects §7.8.2 timer-direct-send |

---

### 7.10.5 Cross-boundary interaction contracts (Section 8 input)

Discovered from U1; **not yet full Section 8 spec.**

| ID | Contract |
|----|----------|
| **IB-1** | Time wakes (nurture evaluation, H4) route to **BH-2** only — never to BH-3 egress as predetermined send |
| **IB-2** | Inbound message: BH-3 ingress routes to situation → **wake BH-2** before gather-heavy work on wrong attachment |
| **IB-3** | On inbound reply path: BH-2 commits **one SM version** containing inbound record **and** wait supersede (atomic operational-truth move) |
| **IB-4** | On timer path: BH-2 **must read latest SM version** before any outbound decision; superseded wait → skip send (no-op), not failure |
| **IB-5** | BH-3 egress: send requires reference to **SM version + explicit send decision** from BH-2; channel rules (L1–L3) applied at membrane |
| **IB-6** | BH-3 create/fan-out (B6): may stamp empty situation + lineage; **operational-truth commits** remain BH-2 |

---

### 7.10.6 U1 findings — hypothesis adjustments

| Finding | Action |
|---------|--------|
| BH-1 / BH-2 are failure-coupled for correctness but separable for **read vs write** | U2 **confirms tight pair** — initiation+unknown+wait atomic; Pass 5 → recommend **merged boundary "Story execution"** (BH-1 substrate + BH-2 writer) or document as inseparable pair |
| CM significance filter (G2) not stressed by Priya reply | Remains gray; Section 8 |
| Draft outbound separate from SM truth (F2) | **Confirmed** by U1 — do not merge draft into authoritative version block |
| Rejected alternative "timer sends directly" | **Reconfirmed dead** by U1 |

---

## 7.11 Pass 4 — U2 boundary tests

### 7.11.1 Primary scene — refund posted, gateway silent

**Situation S5:** Refund situation (linked to order/unhappy path per §6.6 U2). Refund **authorized** (G2 if required — already satisfied in this scene). Worker invokes refund capability. Gateway accepts or times out with **no confirmation**; bounded tool-layer poll also exhausts without status.

**Responsibilities exercised (§6.6 U2):** M5, H2, J1, G2 (prior), F4, F6, D6, P1, E3, I6 (later).

**Story move required (§7.3 + Failure category):**

```text
BEFORE (SM vN):
- Refund approved for order #9912
- Liveness: running

AFTER tool path exhausted (SM vN+1 — one operational-truth commit):
- Claim: refund initiation recorded — reference ID X, time T1
- Outcome claim: unknown (sources: gateway timeout; poll N exhausted)
- Wait: recheck status at T1+24h OR gateway webhook if earlier
- Liveness: waiting (NOT failed — path still honest; M5)
- Idempotency: initiation ID X blocks second post (SM + tool gate)

NOT in authoritative SM block:
- Raw gateway timeout payload (trace/tool log)
- LLM reasoning ("customer is pressing")
- Customer interim message text until send decision exists (F2)
```

**Event flow under test:**

```text
BH-2 proposes refund ──► tool harness (grant check, idempotency)
                              │
                    bounded poll inside tool (M4)
                              │
                    structured result → BH-2 (NOT raw timeout to LLM)
                              │
                              ▼
              BH-2 commit SM vN+1 (initiation + unknown + wait — atomic)
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
         BH-5 read      timer T+24h      customer message
         (artifact)     wake BH-2       BH-3 → BH-2
                              │
                              ▼
              same tool status poll; update claim or escalate (J1)

Customer pressure ──► BH-2 wake ──► proposes retry refund
                              │
                              ▼
              tool reads SM: initiation X exists, outcome unknown
                              │
                              ▼
              block second post → structured return → BH-2 honest path (M5)
```

---

### 7.11.2 Test scores — primary scene (tests 3, 4, 8, 10)

| Hypothesis | T3 State ownership | T4 Atomicity | T8 Temporal coupling | T10 Security / authority | U2 verdict |
|------------|-------------------|--------------|----------------------|--------------------------|------------|
| **BH-1** | **Pass** — stores initiation claim, unknown outcome, wait on version chain | **Pass+contract** — one version holds all three; writer BH-2 | **Pass** — wait on SM for 24h wake re-read | **Pass** — record does not authorize money movement | Pair with BH-2 — **not standalone** |
| **BH-2** | **Pass** — **sole writer** of initiation/unknown/wait; interprets tool evidence into claims | **Pass** — initiation + unknown + wait **one commit** (IB-11) | **Pass+contract** — 24h wake → BH-2 re-read SM + poll (IB-1, IB-9) | **Pass** — F6/G3; stops auto-retry (M5); G2 already enforced pre-post | **Pass** |
| **BH-3** | **Pass** — no refund truth writes; customer ingress routes to S5 | **Pass** — does not split initiation vs unknown across boundaries | **Pass** — recheck timer → BH-2 not CM | **Pass** — I6 honest message only after SM truth; no refund authorization | **Pass** |
| **BH-4** | **N/A** | **N/A** | **N/A** | **N/A** | **Neutral** — policy context injection optional |
| **BH-5** | **N/A** — reads SM for owner board | **N/A** | **N/A** | **N/A** | **Neutral** — "S5 waiting on gateway" derived |
| **Tool harness (adjacent)** | **Pass** — owns retry/poll **transient** state only; **not** SM truth | **Pass+contract** — poll completes **before** BH-2 commit; gate reads SM pre-side-effect (IB-8) | **Pass** — short tool wait ≠ situation wait | **Pass** — grant gate + idempotency block (F6, M5) | **Adjacent boundary confirmed** — not L2 box |

---

### 7.11.3 Secondary scenes — U2 spot checks

| Scene | Boundary stress | Result |
|-------|-----------------|--------|
| **G2** — refund over grant → approval before first post | BH-2 stops; J human; no tool side effect until approval recorded | BH-2 + harness pass; BH-3 may carry approval request message |
| Gateway **confirms success** at T+2h | BH-2 updates outcome claim; closes wait; may close S5 (A6, A9) | Single writer BH-2 — pass |
| 24h recheck **still unknown**; bound spent | BH-2 declares failure path (M1) or escalates (J1, M6) — still **no** auto second post | M5 + BH-2 pass |
| Customer asks **"where is my refund?"** while unknown | BH-3 ingress → S5 → BH-2; BH-3 I6 message from SM truth only | No CM write of outcome — pass |
| LLM insists **"retry refund"** | Tool + SM block; worker escalates or waits — not second post | Rejects §7.8.2 tool-writes-SM and LLM-as-truth — pass |
| **Wrong situation** routing (S4 vs S5) | Idempotency scoped to one storyline (A2) — routing error = wrong ID scope | Stresses B2/BH-3; no new boundary — IB-2 applies |

---

### 7.11.4 Cross-boundary contracts — U2 additions (Section 8 input)

Extends §7.10.5 (IB-1 … IB-6):

| ID | Contract |
|----|----------|
| **IB-7** | Capability tool returns **structured evidence** to BH-2 only; **never** writes initiation/unknown/wait claims to SM |
| **IB-8** | Before irreversible side effect: tool harness **reads SM** for existing initiation / idempotency key; blocks duplicate post even if LLM proposes retry |
| **IB-9** | Unknown-outcome recheck timer (24h or config) wakes **BH-2**; uses **same** refund capability status path — not a separate tool or CM action |
| **IB-10** | Unknown outcome on irreversible action: SM liveness **waiting** (H2), not failed, until wait bound spent (Failure category) — BH-2 writes; not LLM label |
| **IB-11** | Refund initiation + outcome-unknown + recheck wait committed in **one SM version** (same atomicity pattern as IB-3) |

**U1 + U2 pattern (generalized):**

```text
Side-effect attempt → tool harness (bounded recovery) → structured result
        → BH-2 atomic SM commit → optional BH-3 egress / BH-5 derive
        → timer wake → BH-2 re-read latest SM → decide (never blind retry)
```

---

### 7.11.5 U2 findings — hypothesis adjustments

| Finding | Action |
|---------|--------|
| Tool harness is **not** a sixth L2 boundary | Stays **adjacent** with IB-7, IB-8; Level 3 implements inside capability invocation |
| BH-1 + BH-2 inseparable for **correctness** on irreversible paths | Pass 5: record as **Boundary B-Story** (merged) or formal **BH-1↔BH-2 pair** with single write contract |
| IB-1 (timer → BH-2) generalizes beyond nurture | **Established** — refund recheck uses same rule |
| IB-3 atomic commit pattern generalizes | **IB-11** — any operational-truth move that blocks unsafe next action |
| CM writing "refund processing" without SM | **Fail** — U2 reconfirms IB-5 |

---

## 7.12 Pass 5 — Boundary decision records

Method §7.24. Tested on **U1**, **U2** (§7.10, §7.11). Alternatives evaluated per §7.25 where noted.

---

### 7.12.1 B-Story — Story execution (Situation Model + Situation Worker)

| Field | Record |
|-------|--------|
| **Boundary ID** | B-Story |
| **Name** | Story execution — versioned situation model and worker loop |
| **Problem owned** | For each operational problem: maintain the **honest versioned story**, advance it through comprehend → gather → trust → decide → coordinate → human/partner/failure handling, and **commit operational truth** atomically. |
| **Responsibilities included** | **A1–A11**, **B7**; **B4** (correction phase); **C1–C4**; **D1–D7**, **P1–P3**; **E1–E6**; **F1–F6**, **G1–G6**; **H1–H7**; **J1–J6**, **K1–K4**; **M1–M6**; partial **B6** (per-situation advancement after create) |
| **Responsibilities excluded** | **B1–B2**, **B5** ingress routing; **I1–I6**, **L1–L4** expression; **N1–N16** memory domain (B-Memory serve sync + learn async); **O1–O6** derived views; channel send; tool-layer transient retry state |
| **State owned** | Versioned situation model per problem; graph edges/links; closure/outcome tags; waits on story; worker run refs; decision-intention artifacts **linked** to versions (F2); ingest refs on story (B7) |
| **External state referenced** | Business systems (canonical facts); platforms (messages); business config (grants); tool structured results; memory slices from B-Memory |
| **Authority** | Proposes and commits story updates; selects behaviour inside grant; enforces stop-safe (F4, M5); grants checked deterministically after proposal (F6) — not at CM |
| **Why together** | Substrate without writer cannot advance; writer without substrate has no durable truth. U1/U2 **atomic commits** (inbound+wait; initiation+unknown+wait) require **one ownership domain** for correctness (T4). |
| **Why nearby excluded** | **B-Membrane:** channels and routing change for different reasons; must not co-own story truth. **B-Memory:** retrieval, not advancement. **Tool harness:** side-effect safety at invoke, not story semantics. |
| **Change coupling** | Business behaviour, policy interpretation, wait/nurture/refund logic evolve together — one conceptual owner. |
| **Lifecycle coupling** | Situation running/waiting/blocked/completed tied to story versions — same lifecycle. |
| **Consistency / atomicity** | **Critical:** operational-truth moves are single version commits (IB-3, IB-11). |
| **Failure coupling** | Story-level failure (M1–M6) owned here; tool transient failure adjacent. |
| **Temporal coupling** | Timer wakes **this** boundary only (IB-1, IB-9); re-read latest version before outbound decision (IB-4). |
| **Scaling** | Scales with open situations and decision depth — not with channel count alone. |
| **Security / authority** | Irreversible actions gated via SM + tool read (IB-8); no LLM self-authorization. |
| **Interaction cost** | Accepts wakes from B-Membrane, timers, humans; emits SM versions for B-Membrane egress and B-Visibility derive. |
| **Alternatives (§7.25)** | **A Combine BH-1+BH-2 → accepted.** **B Separate substrate vs writer → rejected** (U2 double-writer / split atomicity risk). **C Hybrid CM co-writes waits → rejected** (U1/U2). |
| **Rejected alternatives** | LLM trace as truth; CM sole SM writer; timer direct send (§7.8.2) |
| **Known limitations** | §7.8.1: B-Membrane may stamp **empty** create shell (IB-6) — operational commits still B-Story. U3/U4 not re-tested. |
| **Supporting evidence** | §7.10, §7.11; §6.6 U1/U2; Failure category; [`construction_record.md`](construction_record.md) §3.4–3.6 |
| **Status** | **Established** |

**Level 3 hint (non-normative):** One durable record per situation + worker loop instance; not required to be two deployables.

---

### 7.12.2 B-Membrane — Conversation manager (ingress / egress)

| Field | Record |
|-------|--------|
| **Boundary ID** | B-Membrane |
| **Name** | Conversation manager — ingress and egress membrane |
| **Problem owned** | Move events and messages across the business boundary: **route ingress** to the right story; **deliver permitted egress** on channels — without owning story advancement or operational truth. |
| **Responsibilities included** | **B1**, **B2**, **B5**; **B6** (create/fan-out ingress); **I1–I6**, **L1–L4** |
| **Responsibilities excluded** | **C–G**, **D**, **E**, **H**, **J**, **K**, **M** story logic; **A** closure (except create stamp per IB-6); **O** views; authoritative wait/outcome writes |
| **State owned** | Ingress routing context; in-flight delivery jobs; channel adapter state |
| **External state referenced** | B-Story SM (read for route match and send gate); grants; platform message IDs |
| **Authority** | Route and send on channels inside visibility rules; **cannot** authorize refunds, change story, or cancel waits |
| **Why together** | Ingress and egress share **channel membrane** expertise and platform rules — one coherent transport problem. |
| **Why nearby excluded** | **B-Story:** business truth and decisions. **B-Visibility:** derived observation, not transport. |
| **Change coupling** | New channels and platform policy change membrane — not nurture/refund logic. |
| **Lifecycle coupling** | Delivery jobs shorter than situation lifecycle — separable. |
| **Consistency / atomicity** | Does **not** co-write operational-truth fields (U1 T4 pass). |
| **Failure coupling** | Undeliverable message (Failure class) surfaces via membrane; story response owned by B-Story. |
| **Temporal coupling** | Timer wakes → B-Story, not membrane send (IB-1). |
| **Scaling** | Scales with event rate and channel adapters. |
| **Security / authority** | IB-5: send requires SM version + B-Story send decision + L rules. |
| **Interaction cost** | Every inbound/outbound crosses this boundary — kept thin intentionally. |
| **Alternatives** | **Separate ingress service vs egress service → rejected** (duplicate channel expertise, §7.11 interaction cost). |
| **Rejected alternatives** | CM writes refund/outcome truth; timer → CM send |
| **Known limitations** | G2 owner significance filter open; IB-6 create stamp provisional |
| **Supporting evidence** | §7.10, §7.11; harness study Part 6 ingress/egress split |
| **Status** | **Established** |

---

### 7.12.3 B-Memory — Memory (observe · learn · maintain · serve)

| Field | Record |
|-------|--------|
| **Boundary ID** | B-Memory |
| **Name** | Memory — business knowledge lifecycle |
| **Problem owned** | One coherent **business memory domain**: observe worker and configurator activity; learn and maintain vocabulary, lessons, and configuration artifacts; **serve** scoped context (structured + prose) to B-Story and routing slices to B-Membrane — without owning story commits, grants, or product behaviour improvement. |
| **Responsibilities included** | **N1–N16** |
| **Responsibilities excluded** | **A–M** story writes; **O** aggregate views; **G** grant authorization; **Q** authoritative registry apply (propose only); **R** fine-tuning / prompt optimizer on constitution |
| **State owned** | Business knowledge; episodic experience; learning items (lifecycle); vocabulary; structured config artifacts (JSON/schema-bound); prose preferences; assembly templates; retrieval indexes |
| **External state referenced** | B-Story (scope, links); worker/configurator traces (read); configuration registry (Q1 — authoritative values when applied) |
| **Authority** | Advisory context and config **candidates** only (N16); never SM commits, sends, or silent grant change |
| **Why together** | Memory category spine: **same store** serves loader and learning pipeline; splitting observe/learn from serve would duplicate indexes and reconcile logic |
| **Why nearby excluded** | **B-Story:** operational truth per situation. **B-Visibility:** projection not retrieval/learning. **Adjacent-Improvement:** behaviour in weights, not business KB. **Configurator apply:** deterministic tools (Q), not LLM memory write |
| **Change coupling** | KB evolution, vocabulary drift, learning reconcile — independent from per-situation worker loop |
| **Lifecycle coupling** | Knowledge long-lived; situations and lessons linked via graph (N5) |
| **Consistency / atomicity** | **Serve path** sync on context need — may lag slightly on learn path (async). Learn writes must not block B-Story atomic commits (IB-12) |
| **Failure coupling** | Missing memory → B-Story handles gather/capability-absent (**D8/O10 — not Failure triage**). Bad lesson → N10 evaluate/reverse — not story-owned |
| **Temporal coupling** | Observe/learn async after worker pass; serve before/at phase start |
| **Scaling** | Scales with business knowledge size; routing slice (N11) prevents full-graph scan at membrane |
| **Security / authority** | Tenant isolation; IB-13: memory cannot apply grants — configurator capability only |
| **Interaction cost** | Serve: called per worker phase. Observe: one async fan-out per trace — off hot path |
| **Alternatives** | **Merge into B-Story → rejected** (different change drivers; learning would couple to every SM commit). **Split serve vs learn boundaries → rejected** (duplicate ownership of same KB; reconcile needs unified index) |
| **Known limitations** | U1/U2 did not stress learn path, configurator observation, or vocabulary drift; promotion needs dedicated unit |
| **Supporting evidence** | §6.4 N1–N16; memory category KB (19 files); harness study §11.2; Authority knowledge vs behaviour |
| **Status** | **Provisional** |

---

### 7.12.4 B-Visibility — Visibility & audit (derived views)

| Field | Record |
|-------|--------|
| **Boundary ID** | B-Visibility |
| **Name** | Visibility & audit — derived business and builder views |
| **Problem owned** | **Derive** owner snapshots, artifacts, explain-on-demand reconstructions, observer signals — **read-only** for correctness. |
| **Responsibilities included** | **O1–O6** |
| **Responsibilities excluded** | All authoritative story writes; **I/L** actor message delivery |
| **State owned** | Derived projections; observation events; reconstruction render configs |
| **External state referenced** | Full B-Story graph; traces (for explain-on-demand) |
| **Authority** | None over business actions |
| **Why together** | One problem: **who sees what view of truth** — explainability category. |
| **Why nearby excluded** | **B-Membrane** delivers messages; **B-Story** owns truth. |
| **Change coupling** | UI/observation product evolution — separate from story logic. |
| **Lifecycle coupling** | Projections refresh on SM change — async derive. |
| **Consistency / atomicity** | Stale board lag acceptable; incorrect story write is not. |
| **Failure coupling** | Observer anomalies route per Explainability category — not story owner. |
| **Temporal coupling** | N/A |
| **Scaling** | Scales with owner query patterns and situation count. |
| **Security / authority** | Role-based visibility; admin vs owner sets. |
| **Interaction cost** | Read-heavy; must not block B-Story writes. |
| **Alternatives** | **Merge into B-Membrane → rejected** (observation ≠ transport). |
| **Known limitations** | G2 significance overlaps O3 — Section 8; U1/U2 neutral test only. |
| **Supporting evidence** | §6.8 cluster 12; Business View category |
| **Status** | **Provisional** |

---

### 7.12.5 Adjacent — Capability tool harness (not a Level 2 boundary)

| Field | Record |
|-------|--------|
| **ID** | Adjacent-Tool (not B-*) |
| **Problem owned** | At capability invocation: **authorization (T2/T4)**, bounded retry/poll (M4), **idempotency read (S9/IB-8)**, structured result — **no story semantics** |
| **Level 2 contracts** | IB-7, IB-8 (**harness idempotency — not grant check**); T2 before execute |
| **Why not a boundary** | Exists per **capability call**, not per situation ownership; would duplicate across every P* invoke; correctness coupling is **contractual** to B-Story, not separate evolution domain |
| **Status** | **Established contract**; Level 3 implementation inside harness |

---

### 7.12.6 Adjacent — Product improvement (not a Level 2 boundary)

| Field | Record |
|-------|--------|
| **ID** | Adjacent-Improvement (not B-*) |
| **Problem owned** | Improve **how Tend behaves** — model adherence, assembly-template optimization — from verified traces; **never** store business-specific rules in weights |
| **Responsibilities included** | **R1–R3** (§6.4 Group R) |
| **Why not B-Memory** | Same trace stream as N6 (IB-12) but different output: adapters / flywheel corpus, not business KB activation. Conflating would violate Authority **knowledge vs behaviour** split (N15) |
| **Level 2 contracts** | IB-14: trace fan-out to improvement path; optimizer bounded to memory-owned assembly templates (R2) |
| **Status** | **Established contract**; product-team evolution domain |

---

### 7.12.7 Merge decision — BH-1 + BH-2 → B-Story

| Option | Description | Verdict |
|--------|-------------|---------|
| **A — Combine** | Single story execution boundary (substrate + worker loop) | **Accepted** → B-Story |
| **B — Separate** | BH-1 store vs BH-2 writer as independent boundaries | **Rejected** — atomic operational commits and sole-writer rule fail across boundary without heavy distributed protocol (U1 IB-3, U2 IB-11) |
| **C — Hybrid** | CM or tool co-writes selected SM fields | **Rejected** for operational truth — IB-6 allows create shell only |

---

### 7.12.8 Interaction contract index (Section 8 input)

Full spec deferred to `section_8_interaction_model.md`. Boundaries **depend** on:

| ID | Summary | Boundaries |
|----|---------|------------|
| IB-1 | Timer wake → B-Story only | B-Story, B-Membrane |
| IB-2 | Ingress route → wake B-Story | B-Membrane → B-Story |
| IB-3 | Atomic inbound + wait supersede | B-Story |
| IB-4 | Timer path re-read latest SM | B-Story |
| IB-5 | Egress requires SM version + send decision + **Policy.decide → Allow** (T2) + L1–L3 | B-Membrane ← B-Story |
| IB-6 | Create stamp ≠ operational-truth commit | B-Membrane → B-Story |
| IB-7 | Tool → structured evidence only | Adjacent-Tool → B-Story |
| IB-8 | **Idempotency gate (harness S9)** — SM read blocks duplicate post; **not** authorization | Adjacent-Tool ↔ B-Story |
| IB-9 | Unknown-outcome recheck → B-Story + same tool | B-Story |
| IB-10 | Unknown → waiting liveness on SM | B-Story |
| IB-11 | Atomic initiation + unknown + wait | B-Story |
| IB-12 | Worker/configurator trace → B-Memory **async** observe; never blocks SM commit | B-Story → B-Memory |
| IB-13 | B-Memory config **candidates** → configuration registry via **deterministic configurator tools** only | B-Memory → Q (Group Q); not LLM grant write |
| IB-14 | Training-grade trace fan-out → Adjacent-Improvement; separate from business memory activation | B-Story trace → Adjacent-Improvement |

**Artifact classes at serve time (S8-9):**

| Class | Example | Consumer |
|-------|---------|----------|
| **Structured** | Tool arg JSON, registry record, schema-bound config | Applied by capability/registry loader — deterministic |
| **Prose preferences** | "Always sign outreach with …" | Injected at generating step per prompt constitution N14 |

**Section 8 contract families (resolve IB-15+ collisions from category audits):**

| Family | Meaning | Examples |
|--------|---------|----------|
| **HC-*** | Harness control — loop, commits, ingress VALIDATE split, write-and-announce | HC-1 write-and-announce; HC-2 ingress MEANING vs SM commit |
| **AC-*** | Authorization control — TenantContext, Policy.decide, enforcement-read-no-cache | AC-1 principal propagation; AC-2 egress Policy.decide; AC-4 cache never decides |

Keep **IB-1…IB-14** stable. Full gate table: §7.12.9.

---

### 7.12.9 Cross-cutting gate table (Harness S vs Authorization T)

**Principle:** No boundary owns "the control layer." Each implements gates for its edge. VALIDATE is a **joint** step: **S2** structural + **T2** permission — different failure diagnostics.

#### B-Story — story execution

| Discipline | Gate | Contract |
|------------|------|----------|
| Harness | S1 per-wake contract | WAKE→RECOVER→PROPOSE→VALIDATE→EXECUTE→UPDATE→REST |
| Harness | S4–S7 | Atomic commits (IB-3, IB-11); write-and-announce (H9) |
| Harness | S10 | Timer → story only (IB-1, IB-4, IB-9) |
| Authorization | T2, T6 | Policy.decide on proposal and each invoke/send branch |
| Not here | Channel send, idempotency at connector | B-Membrane, Adjacent-Tool |

#### B-Membrane — ingress / egress

| Discipline | Gate | Contract |
|------------|------|----------|
| Harness | S2 ingress VALIDATE | Route 0/1/many; soft hold (B9) |
| Harness | S12 dedup | Platform at-least-once |
| Harness | IB-5, IB-6 | Send job refs SM version; create shell ≠ truth |
| Authorization | T1 | Mint TenantContext at ingress |
| Authorization | T2, IB-5 | Policy.decide before outbound send |
| Authorization | T11 + L1–L4 | Reveal, channel, visibility |

#### Adjacent-Tool — capability invoke

| Discipline | Gate | Contract |
|------------|------|----------|
| Harness | S7–S9, IB-7, IB-8 | Intent before effect; structured evidence; **idempotency read** |
| Authorization | T2, T4, T5 | Policy.decide **before** connector call; live grant read |
| Clarify | IB-8 | **S9 idempotency — complements T2, does not replace** |

#### Adjacent-Config — configuration apply (proposed adjacent)

| Discipline | Gate | Contract |
|------------|------|----------|
| Harness | S2 schema | Q1 registry shapes |
| Authorization | T8, G7 | Grant/registry writes — configurator tools only (IB-13) |

#### B-Memory

| Discipline | Rule |
|------------|------|
| Harness | S11 — loader output schema-bound; IB-12 async observe |
| Authorization | **No T2 on memory activation** — N16 advisory; T5 cache never decides grants |
| Compliance | U2 field allowlist at serve; trace redaction before IB-12/IB-14 fan-out |

#### B-Visibility

| Discipline | Rule |
|------------|------|
| Harness | Read-only derive — no S4 commits |
| Authorization | T11 partial — role projection (O3, L4) |

---

## 7.13 Pass 6 — Boundary graph

Logical ownership and interaction structure (method §7.28). **Not** a deployment diagram.

### 7.13.1 Graph — boundaries and adjacent contract

```text
                    ┌─────────────────────────────────────────┐
                    │  External: platforms, business systems, │
                    │  humans, partners, time scheduler       │
                    └───────────────┬─────────────────────────┘
                                    │
              events / messages     │     canonical data
                                    ▼
                    ┌───────────────────────────────┐
                    │       B-Membrane              │
                    │  ingress route · egress send  │
                    │  (+ owner → configurator agent)│
                    └───────┬───────────────┬───────┘
                            │               │
                   wake +   │               │  read SM +
                   ingest  │               │  send gate (IB-5)
                            ▼               │
        ┌───────────────────────────────────┴──────────────────────┐
        │                      B-Story                              │
        │   versioned SM · worker loop · operational truth commits   │
        └───┬───────────────┬──────────────────┬───────────┬────────┘
            │               │                  │           │
   context  │    trace      │  derive (async)  │           │ trace (IB-14)
   need     │  (IB-12 async)│                  │           │
            ▼               ▼                  ▼           ▼
    ┌───────────────┐ ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐
    │   B-Memory    │ │ Adjacent-   │  │ B-Visibility │  │ Adjacent-        │
    │ observe·learn │ │ Tool        │  │(provisional) │  │ Improvement      │
    │ ·maintain·    │ │ (invoke)    │  └──────────────┘  │ (behaviour flywheel)│
    │ serve         │ └──────┬──────┘                    └──────────────────┘
    └───────┬───────┘        │
            │                structured evidence (IB-7)
   config   │                reads SM pre-effect (IB-8)
   candidates (IB-13)        ▼
            ▼           external capabilities
    ┌───────────────┐  (refund, Apollo, carrier, …)
    │ Config registry│
    │ (Group Q apply)│
    └───────────────┘
```

### 7.13.2 Edge catalog

| From | To | Relationship | Contracts | Correctness-critical? |
|------|-----|--------------|-----------|------------------------|
| External platforms | B-Membrane | inbound events, delivery acks | B1, B2, L* | Yes — ingress |
| B-Membrane | B-Story | route match → **wake**; optional create shell | IB-2, IB-6 | Yes |
| B-Story | B-Membrane | SM version + send decision → egress | IB-5 | Yes — no blind send |
| Time scheduler | B-Story | timer wake (nurture, recheck, H4) | IB-1, IB-4, IB-9 | Yes — not CM |
| B-Story | B-Memory | context need (sync serve) + worker trace (async observe) | N1, N11, IB-12 | Serve: no — degrades. Observe: no — async |
| B-Memory | B-Story | context slice (structured + prose) | inject only | No |
| B-Memory | B-Membrane | routing slice at scale (N11) | context need | No |
| B-Membrane | B-Memory | configurator session trace | IB-12, N13 | No |
| B-Memory | Config registry (Q) | structured config candidates | IB-13 | Yes — must not bypass deterministic apply |
| B-Story | Adjacent-Improvement | training-grade trace fan-out | IB-14, R1 | No |
| B-Story | Adjacent-Tool | capability invoke (inside grant) | IB-7, IB-8, P*, M4 | Yes — irreversible |
| Adjacent-Tool | B-Story | structured result | IB-7 | Yes |
| B-Story | B-Visibility | SM version changed (event) | O1–O2 derive | No — lag OK |
| B-Visibility | B-Membrane | none direct | — | — |
| Humans | B-Membrane / B-Story | messages, approvals, answers | J*, G2 | Yes — via route or SM |
| Business systems | B-Story (via tool) | canonical facts | D*, P* | Yes — not SM master for ERP |

### 7.13.3 Authority flow (summary)

```text
Ingress event     → B-Membrane routes → B-Story decides + commits SM
Timer             → B-Story directly (IB-1)
Side effect       → B-Story proposes → Adjacent-Tool gates → B-Story commits
Outbound          → B-Story authorizes content → B-Membrane delivers
Owner board       → B-Visibility reads SM (never writes truth)
Explain why       → B-Story trace link on demand (O4); not in SM spine
```

### 7.13.4 What is outside Tend boundaries (§6.5)

| Actor / system | Relationship to graph |
|----------------|----------------------|
| Business ERP, payment gateway | Canonical data; Adjacent-Tool + B-Story coordinate |
| Communication platforms | Canonical messages; B-Membrane membrane |
| Business owner / employees | Grant source; human collaboration via B-Story + B-Membrane |
| Customers / contacts (Priya) | External actors; ingress/egress only |

---

## 7.14 Section 8 handoff

Section 7 defines **boxes and ownership**. Section 8 ([`section_8_interaction_model.md`](section_8_interaction_model.md) — not yet written) must define **cooperation behaviour** across boxes (method §8.1).

### 7.14.1 Mandatory Section 8 deliverables (from U1/U2)

| # | Deliverable | Source | Priority |
|---|-------------|--------|----------|
| S8-1 | **Wake routing table** — event kind → target boundary → follow-up | IB-1, IB-2, IB-9 | P0 |
| S8-2 | **SM write discipline** — sole writer, version commit rules, create shell vs truth (IB-3, IB-6, IB-11) | §7.3, Pass 5 | P0 |
| S8-3 | **Egress gate** — B-Membrane send preconditions | IB-5 | P0 |
| S8-4 | **Capability invoke cycle** — B-Story ↔ Adjacent-Tool | IB-7, IB-8 | P0 |
| S8-5 | **Timer / message race** — re-read latest SM before outbound (IB-4) | U1 §7.10 | P0 |
| S8-6 | **Unknown outcome liveness** — waiting not failed until bound (IB-10) | U2, Failure KB | P0 |
| S8-7 | **Owner significance filter** (G2) — artifact vs owner chat | §6.10 Q2; gray G2 | P1 |
| S8-8 | **B-Visibility derive triggers** — on SM change, debounce rules | B-Visibility provisional | P1 |
| S8-9 | **B-Memory serve protocol** — context need schema; structured vs prose artifact injection (IB-12 serve half) | Memory KB; §7.12.8 artifact table | P1 |
| S8-11 | **B-Memory observe/learn protocol** — async trace consume, reconcile, lifecycle, evaluate (IB-12 learn half) | Memory KB; harness §11.2 | P1 |
| S8-12 | **Configurator observation + IB-13 apply** — memory candidates → deterministic registry write | `the_business_configuration_capability.md`; Group Q | P1 |
| S8-13 | **Adjacent-Improvement trace contract** — IB-14; knowledge vs behaviour gate | Authority conversation; Group R | P2 |
| S8-10 | **Failure propagation** — membrane undeliverable → B-Story | Failure + B-Membrane | P1 |

### 7.14.2 Suggested Section 8 structure (outline only)

```text
8.1 Purpose (link §7.14)
8.2 Wake routing table (S8-1)
8.3 Story commit protocol (S8-2) — atomic moves catalog
8.4 Membrane interactions (S8-3, S8-10)
8.5 Capability invoke cycle (S8-4)
8.6 Temporal races (S8-5, S8-6)
8.7 Human and owner interactions (S8-7)
8.8 Derive, memory serve, and async learn (S8-8, S8-9, S8-11, S8-12)
8.9 Product improvement adjacent (S8-13)
8.10 U1 walkthrough — Priya reply + nurture timer
8.11 U2 walkthrough — refund gateway silent
```

### 7.14.3 Open items carried to Section 8 / later units

| Item | Owner doc |
|------|-----------|
| §7.8.1 create stamp vs first truth commit | S8-2 + U1 list fan-out walkthrough |
| G2 significance filter | S8-7 |
| G3 SM update reason tags per writer | S8-2 |
| B-Memory learn/observe promotion to established | Dedicated unit: vocabulary drift, repeated tool error → lesson, configurator session |
| U4 stale API | Pass 9–10 dimension stress or dedicated Section 8 failure paths |

### 7.14.4 Re-test triggers (when Section 7 boundaries must be revisited)

- U3/U4 construction units complete
- New boundary hypothesis proposed (e.g. split B-Membrane ingress/egress)
- Product invariant change (Compliance §4A)
- Section 9–10 dimension stress finds contradiction

---

## 7.15 Section 7 completion checklist (first tranche)

| Output (method §7.31) | Status |
|------------------------|--------|
| Boundary hypotheses | ✅ Pass 2; merged Pass 5 |
| Boundary tests (U1, U2) | ✅ §7.10, §7.11 |
| Boundary decision records | ✅ §7.12 |
| Boundary graph | ✅ §7.13 |
| Established boundaries | ✅ B-Story, B-Membrane |
| Provisional boundaries | ✅ B-Memory, B-Visibility |
| Rejected alternatives | ✅ §7.8.2, §7.12.6 |
| Section 8 handoff | ✅ §7.14 |
| U3/U4 validation | ⏸ Deferred |
| Full 11-test matrix all boundaries | ⏸ B-Memory (serve neutral; learn untested), B-Visibility pending |

**Gap remediation (Memory):** B-Memory was previously documented as injection-only; expanded to full memory category per §6.12 and user review.

**Section 7 first tranche is complete enough to begin Section 8.**

---

## 7.16 What remains outside this document

- [`section_8_interaction_model.md`](section_8_interaction_model.md) — full IB-1…IB-14 behaviour spec (§7.14)
- U3/U4 boundary re-test; B-Memory learn-path + B-Visibility promotion to established
- Dedicated construction unit: configurator observes → structured JSON + prose preferences → loader inject
- Sections 9–11 dimension stress and `logical_architecture.md` stabilization

---

## Related

- [`section_6_responsibility_model.md`](section_6_responsibility_model.md) — responsibilities and clusters
- [`construction_record.md`](construction_record.md) — reasoning path
- [`README.md`](README.md) — how to use this folder
- [`three_level_framework/architecture_contruction.md`](../three_level_framework/architecture_contruction.md) — method §7–§8
