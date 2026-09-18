# Architecture Construction Record

## Status

Working record — captures how Level 2 architecture construction proceeded in conversation before and during the first externalized artifacts.

This is a **conversation and reasoning record**, not a formal specification. It preserves corrections, challenges, and gray areas so later work does not depend on chat memory.

---

## 1. Purpose of this record

The Architecture Construction Method requires **externalized architectural memory**. LLMs and humans both lose attention across long contexts. This file exists so that:

- reasoning that happened in conversation is not lost;
- challenges and reversals are visible (not only conclusions);
- the construction frontier (established / provisional / unconstructed) stays explicit;
- future agents do not re-ask settled questions or silently contradict them.

---

## 2. Method sections touched so far

| Section | Topic | Status in conversation |
|---------|--------|------------------------|
| **1–2** | Purpose; construction vs extraction | Understood and applied — architecture is built, not grep'd from KB |
| **3** | Inputs | KB treated as input set; not formalized as evidence pipeline |
| **4** | Architectural evidence model | Skipped as formal step; reasoning went directly from KB |
| **5** | Incremental construction protocol | Applied via **construction unit** (Priya outreach, then multi-scenario expansion) |
| **6** | Responsibility construction | **Completed (working)** → [`section_6_responsibility_model.md`](section_6_responsibility_model.md) |
| **7** | Boundary construction | **First tranche complete** → [`section_7_boundary_model.md`](section_7_boundary_model.md); B-Memory expanded after gap review |
| **8** | Interaction construction | **First tranche complete** → [`section_8_interaction_model.md`](section_8_interaction_model.md) |
| **9–12** | Dimensions, reconciliation, stabilization, completion | Not started as formal artifacts |

---

## 3. Conversation arc (chronological)

### 3.1 Starting question — Tend's hardest responsibility

**Assistant asked:** What is Tend's single hardest responsibility, in Swaraj's words?

**Swaraj's first answer:** Communication to solve operational chaos; virtual assistant with agency (Philippines VA model, not ChatGPT).

**Assistant challenge — partially correct:**

- Moving from "communication" to "agency" was right.
- "Communication" alone is too narrow — Product Vision says Tend is not simply replying to messages.
- "Does almost everything across the business" is too broad — Tend acts within grants; external systems still own canonical records.
- "Task" is wrong unit — **situation** (storyline across events) is the unit.

**Sharpened formulation:**

> Tend's hardest job is keeping business situations moving when nobody is watching — notice change, choose next safe behaviour within granted limits, make inaction visible.

**Swaraj accepted** the situation-over-task framing through later messages.

---

### 3.2 Own vs not-own (Priya, no email)

**Assistant asked:** What does Tend own vs not own?

**Swaraj's answer:** Coordination path — situation model, gap recognition, Apollo/capability or ask owner, outreach when possible, nurture, worker/CM loop. Referenced harness study components.

**Assistant challenges:**

- Slipped back to "Tend owns communication" — corrected: communication is one behaviour.
- Jumped to Level 3 (A2A, tools as LLM interfaces) — redirected to Level 2 responsibilities first.
- "Store messages vs own communication" — reframed as **authoritative source** vs **Tend's coordination record**.

**What Swaraj got right:** Gap before send; worker/CM via situation model; artifacts for owner; nurture after send; memory injected per phase.

---

### 3.3 Procedure vs responsibility

**Assistant asked:** Four responsibilities in "Tend must X so that Y" form.

**Swaraj gave:** Full procedural narrative (good understanding, wrong packaging).

**Assistant point:** Procedures describe happy paths; responsibilities describe **what must never fail**. Valid pedagogical friction — Swaraj noted difficulty with formal English phrasing.

**Resolution:** Reframed to **problems** (what goes wrong if we ignore this?) instead of stiff templates. Swaraj can think in conversational/problem form; formal wording can be added in documents (this folder).

---

### 3.4 Worker / Conversation Manager loop

**Swaraj's design:**

- Situation model = shared story; worker and CM read/write it.
- SM update → worker runs (unless situation resolved).
- Worker update → CM checks significance; may or may not message owner.
- Waiting → worker owns timers; inbound → CM routes.
- Concurrency handled in DO; updates absorbed into running instance.

**Assistant's "unhappy paths":**

| Path | Swaraj pushback | Outcome |
|------|-----------------|---------|
| Priya replies before nurture | Not unhappy — expected | **Swaraj correct** |
| Bad email | Resolvable with clarification | **Agreed** |
| Owner never responds | Waiting on owner; not Tend's job to invent data | **Mostly agreed** — must stay visible in artifacts |
| Worker/CM loop runaway | Closed story stops worker; significance filter | Real issue is **write ownership** and **reason tags**, not infinite ping-pong |

**Gray area:** Exact rule for which SM updates are `human_significant` vs artifact-only — still provisional.

---

### 3.5 Situation scope, closure, second outreach

**Assistant asked:** When is Priya outreach "done"?

**Swaraj:**

- Meeting scheduled ≠ done; outcome of relationship matters.
- Priya says no → story complete (outcome recorded).
- Owner stop / nurture exhausted → complete with **different outcome tags** (not one generic "complete").
- Tend records how story went; does not own business consequences.
- **Second outreach** after closed S1 → **new situation S2**, link to S1 — not reopen.

**Assistant:** Agreed — matches Coordination Kanban rule and Journey/Understanding KB.

**Swaraj challenge — correct:** Assistant was re-asking KB-settled questions instead of synthesizing. Mode shifted to **grunt work + synthesis** from KB.

---

### 3.6 Section 6 draft review (Swaraj's corrections)

| Topic | Issue in draft | Correction |
|-------|----------------|------------|
| **A3 + A5 + A10** | Read as contradictory (graph not by identity vs derived person journey) | **Not contradictory.** Links between situations = operational context. Person = identity anchor beside graph. Journey = projection over person's situations. Must be documented together. |
| **Campaign → order** | Missing explicit causal link type | Add typed links / journey edges (e.g. `converted_from_campaign_4`) |
| **B4 routing correction** | Implied CM owns all routing | **Route on ingress (CM); correct after gather (worker discovers)** — Understanding owns routing responsibility |
| **D1** | Too abstract | Add decision-relative examples |
| **D4** | One-liner undersold gathering priority | **Three steps:** (1) understand ask in domain context, (2) establish where knowledge lives (source map), (3) retrieve in priority order — see Section 6 expanded D4 |
| **E2** | No walkthrough | Add carrier vs customer conflict example |
| **E3 confidence** | Could be read as LLM confidence scores | **Qualitative** uncertainty via evidence states/reasons; **no LLM numeric scores** on control paths; quantitative option selection (e.g. JEV-class models) is separate Layer-3 concern if adopted |

---

## 4. Where assistant was right

- Agency over communication as the core framing.
- Situation vs task vs chat thread.
- Waiting ≠ completed; "message sent" ≠ resolved.
- Second outreach = new situation + link (validated against KB Swaraj wrote).
- Procedure vs responsibility distinction (for learning architecture thinking).
- D4 and A3/A10 needed richer exposition in written form.
- Re-asking settled KB questions slowed progress — synthesis mode is appropriate now.

---

## 5. Where Swaraj was right

- Harness-study Worker/CM/SM loop is coherent for outreach slice.
- Priya reply before nurture is happy path, not edge case.
- Owner silence after escalation is boundary of Tend's agency (visibility, not invention).
- Graph must support **order ID search** (two situations) and **Priya journey view** (derived) — not either/or.
- Outreach and refund are **linked, not merged** — campaign causality matters.
- Communication clarity in docs prevents implementer "black box" fill-in.
- KB already contains ~95% of answers — architecture work is synthesis + construction, not re-interview.

---

## 6. Gray areas (explicitly open)

| # | Topic | Notes |
|---|--------|-------|
| G1 | Outcome tag enum for closure | Product Vision hints; refine when building artifacts |
| G2 | Significance filter for CM notifying owner | Artifact-only default; chat when owner asks or urgent |
| G3 | Who writes which SM update types | Discipline needed: reason tags per writer |
| G4 | JEV / quantitative option models | Possible Level 3; not LLM confidence on safety paths |
| G5 | Derived person-view join shape | Journey KB says still open for Business View |
| G6 | Prospect → customer rule | Business configuration ("paid order exists") |

---

## 7. Construction units used

| Unit | Scenarios covered |
|------|-------------------|
| **U1 — Business-directed outreach** | Priya lead list, missing contact, Apollo, nurture, reply, decline, second outreach |
| **U2 — Commercial lifecycle chain** | Inquiry → order → delivery delay (stale API) → complaint → refund (unknown gateway) |
| **U3 — Stakeholder information** | Investor asking for company information |
| **U4 — Unreliable external API** | Carrier tracking unchanged for days → escalate to partner contact |

Section 6 responsibilities are validated against all four units in [`section_6_responsibility_model.md`](section_6_responsibility_model.md).

---

## 8. Provisional runtime mapping (Section 7 input — not established)

From harness study + conversation — **hypothesis only:**

| Logical role | Provisional home |
|--------------|------------------|
| Situation model (story, graph) | D1 shared record |
| Ingress routing, outbound channels | Conversation Manager |
| Gather, decide, nurture, escalate (background) | Situation Worker |
| Phase-specific context **and** async learning | Memory — observer + loader + learning pipeline (B-Memory) |
| Configuration registry + configurator apply | Group Q (adjacent to B-Memory via IB-13) |
| Product behaviour improvement | Adjacent-Improvement (not B-Memory) |

Section 7 Pass 6 + gap remediation marks **B-Story**, **B-Membrane** established; **B-Memory** provisional (serve path neutral in U1/U2; learn path untested).

---

## 8.1 Category gap remediation (Section 6 / 7)

**Swaraj challenge:** Section 6 treated Memory as injection-only; Section 7 B-Memory mirrored that — insufficient vs Memory category (19 KB files) and vs harness study observer/loader model.

**Gaps found beyond Memory:**

| Category | Gap | Remediation |
|----------|-----|-------------|
| Memory & Knowledge | N1–N5 only | N6–N16; B-Memory observe/learn/maintain/serve |
| Growth & Evolution | Absent from §6 | Group Q |
| Prompt constitution + fine-tuning | Folded into N3 hint | N14, N15, Group R; Adjacent-Improvement in §7 |
| Compliance & Security | G6 only | Still thin — deferred |

**Two learning axes (Authority conversation):**

1. **Business content** — vocabulary, tool preconditions, conventions → B-Memory at runtime.
2. **Product behaviour** — adherence, assembly templates, fine-tuning flywheel → Adjacent-Improvement; not business rules in weights.

**Configurator path:** Owner uses configurator agent (not employee-facing Tend). Memory observes; proposes structured JSON + prose preferences; deterministic configurator tools apply (IB-13).

---

## 9. Next steps (for following session)

1. ~~Review [`section_6_responsibility_model.md`](section_6_responsibility_model.md)~~ — Section 6 complete (incl. Groups S/T/U, full Level 2 remediation pass).
2. ~~Section 7 first tranche~~ → [`section_7_boundary_model.md`](section_7_boundary_model.md) + §7.12.9 harness/authorization gates.
3. ~~**Section 8 first tranche**~~ → [`section_8_interaction_model.md`](section_8_interaction_model.md) — wake routing, per-wake contract, IB-1…14 behaviour, HC-1…3, AC-1…4, VALIDATE split, U1/U2/U5 walkthroughs.
4. **Section 8 second tranche / §9–10:** B-Memory learn path promotion; B-Visibility derive stress; U3/U4 walkthroughs; dimension reconciliation.
5. **§6 P1 still open:** human work state rows, grant table, H11 atomic wait supersede, Meetings K5/K6, Journey enrichments, Trust E2′.
6. ~~Per-category audit trail (`remediation/`)~~ — P0 merged into §6–§8; scratch folder removed 2026-09-18.

## 11. Section 8 first tranche (2026-09-18)

**Deliverable:** [`section_8_interaction_model.md`](section_8_interaction_model.md).

**Established in Section 8:**

- Per-wake contract mapped to Groups S/T (§8.3).
- Wake routing table with timer taxonomy (§8.5).
- VALIDATE joint gate with split diagnostics — structural vs permission vs idempotency vs capability-absent (§8.4).
- HC-1 write-and-announce, HC-2 ingress MEANING vs truth (provisional schema), HC-3 book-of-waits.
- AC-1 TenantContext, AC-2 egress Policy.decide, AC-3 StepUp, AC-4 enforcement-read-no-cache.
- IB-1…IB-14 behaviour specs; human-work patterns absorbed as S8-14 (no IB renumbering).
- U1 Priya reply + nurture, U2 refund silent, U5 package-vs-payment capability-absent walkthroughs.

**Left provisional:** B-Memory learn (S8-11), B-Visibility debounce (S8-8), owner significance G2 (S8-7), trace field names (S8-18), observer probes (S8-19/20), HC-2 MEANING artifact shape.

**Construction frontier moved:** Section 8 from unconstructed → first tranche complete; §9–10 dimension stress is next method section.

## 10. Level 2 category remediation pass (2026-09-18)

Twenty parallel category audits (2026-09-18) compared every Level 2 category to §6/§7. P0 consolidated into:

- **Groups S/T** — harness control vs authorization control (distributed, not one component).
- **Group U** — compliance enforcement.
- **Expanded catalog** — D8, E7–E9, G7–G9, H8–H10, I7, J7–J9, O7–O10, N17, A12, B8–B9, C5–C6.
- **§7.12.9** gate table; IB-5 expanded with Policy.decide; IB-8 relabeled idempotency.

---

## Related

- [`README.md`](README.md) — how to use this folder
- [`section_6_responsibility_model.md`](section_6_responsibility_model.md) — Section 6 deliverable
- [`three_level_framework/architecture_contruction.md`](../three_level_framework/architecture_contruction.md) — method
