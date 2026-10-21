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
| **9–12** | Dimensions, reconciliation, stabilization, completion | Sections 9 and 10 done as checks. Sections 11 and 12 not started. |

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
- **Second outreach** after the closed outreach situation → **a new situation**, linked to it — not reopen.

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
| **CASE-1 — Priya business-directed outreach** | Priya lead list, missing contact, Apollo, nurture, reply, decline, second outreach |
| **CASE-2 — Inquiry, order, delay, refund with an unknown gateway outcome** | Inquiry → order → delivery delay (stale API) → complaint → refund (unknown gateway) |
| **CASE-3 — Investor stakeholder diligence** | Investor asking for company information |
| **CASE-4 — Unreliable logistics or carrier tracking API** | Carrier tracking unchanged for days → escalate to partner contact |

Section 6 responsibilities are validated against all four units in [`section_6_responsibility_model.md`](section_6_responsibility_model.md).

---

## 8. Provisional runtime mapping (Section 7 input — not established)

Later note (2026-10-03): the table below was the hypothesis at that time. The serve picture and the learning must-not rules were agreed afterward in [`how_tend_finds_the_right_situation.md`](how_tend_finds_the_right_situation.md). Promotion of learning beyond those rules is still not a separate protocol. See [`what_is_already_settled.md`](what_is_already_settled.md).

From harness study + conversation — **hypothesis only:**

| Logical role | Provisional home |
|--------------|------------------|
| Situation model (story, graph) | D1 shared record |
| Ingress routing, outbound channels | Conversation Manager |
| Gather, decide, nurture, escalate (background) | Situation Worker |
| Phase-specific context **and** async learning | Memory — observer + loader + learning pipeline (B-Memory) |
| Configuration registry + configurator apply | Group Q (adjacent to B-Memory via IB-13) |
| Product behaviour improvement | Adjacent-Improvement (not B-Memory) |

Section 7 Pass 6 + gap remediation marks **B-Story**, **B-Membrane** established; **B-Memory** provisional (serve path neutral in CASE-1/CASE-2; learn path untested).

Superseded on 2026-10-03 for the serve picture and the must-not rules. See [`how_tend_finds_the_right_situation.md`](how_tend_finds_the_right_situation.md) and [`what_is_already_settled.md`](what_is_already_settled.md). Promotion beyond those rules remains open.

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

Later: Level 2 is the source of truth. The signup owner, or a person that owner assigns to configure the business, uses that capability. An employee who is not that person does not.

---

## 9. Earlier next steps (superseded)

This was the construction frontier before the Section 9 dimension-stress pass. See §15 for the current frontier.

1. ~~Review [`section_6_responsibility_model.md`](section_6_responsibility_model.md)~~ — Section 6 complete (incl. Groups S/T/U, full Level 2 remediation pass).
2. ~~Section 7 first tranche~~ → [`section_7_boundary_model.md`](section_7_boundary_model.md) + §7.12.9 harness/authorization gates.
3. ~~**Section 8 first tranche**~~ → [`section_8_interaction_model.md`](section_8_interaction_model.md) — wake routing, per-wake contract, IB-1…14 behaviour, HC-1…3, AC-1…4, VALIDATE split, CASE-1, CASE-2, and CASE-5 walkthroughs.
4. **Section 8 second tranche / §9–10:** ~~CASE-3 walkthrough~~ ✅ (2026-09-25); ~~CASE-4 walkthrough~~ ✅ (2026-09-25); B-Memory learn construction unit; B-Visibility derive stress; dimension reconciliation. Serve picture and must-not rules agreed 2026-10-03. Still open: promotion beyond those rules, how the owner view is arranged, and the stress of time, failure, and a person who does not answer.
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
- IB-1…IB-14 behaviour specs; human-work patterns absorbed as IA-14 (no IB renumbering).
- CASE-1 Priya reply + nurture, CASE-2 refund silent, CASE-5 package-vs-payment capability-absent walkthroughs.

**Left provisional:** B-Memory learn (IA-11), B-Visibility debounce (IA-8), owner significance G2 (IA-7), trace field names (IA-18), observer probes (IA-19/20), HC-2 MEANING artifact shape. The must-not rules were agreed on 2026-10-03. What stays provisional is promotion beyond those rules, not the serve picture.

**Construction frontier moved:** Section 8 from unconstructed → first tranche complete; §9–10 dimension stress is next method section.

## 12. CASE-3 walkthrough + communication rulings (2026-09-25)

**Trigger:** Architecture construction conversation — investor diligence (CASE-3). Corrected assistant errors on inbound ack and partial outbound.

**Swaraj rulings (now in KB + §8):**

| Topic | Decision |
|-------|----------|
| **Inbound “ack”** | **Internal only** — situation created/linked, message on SM. **No** default external “message received” email. Chat read/delivery ticks are channel-native, not Tend copy. |
| **When external parties hear from Tend** | On **situation-model commit** that includes express outbound intent — **situation delta**, not tool logs. Partial fulfilment OK (deck sent while revenue still open). |
| **While worker runs without commit** | No new external line from that pass. |
| **Fetch / approval** | No LLM-facing approval tool. `fetch_file` (etc.) calls shared **`approval_function`** inside the tool after metadata check; deny → structured result → worker may escalate. |
| **Revenue not in files** | Human work to finance + escalation (existing KB); not re-designed in this session. |

**Artifacts updated:**

- [`../Level 2/communication/when_should_tend_communicate.md`](../Level%202/communication/when_should_tend_communicate.md) — 2026-09-25 ruling; inbound vs outbound ack; situation-delta; receipt-only default off.
- [`section_8_interaction_model.md`](section_8_interaction_model.md) — §8.10.3, §8.12.4, §8.16.4 CASE-3; anti-patterns; checklist.
- Stakeholder journey + research — regulator “auto-ack” reframed as optional policy, not product default.

**Assistant failures noted:** Equated “gathering revenue, no wait row” with “do not send deck”; re-asked escalation paths already in KB; led with membrane/IB codes instead of situation language.

**Next at that time:** Memory construction unit (serve then observe/learn); §9 time / failure / human inaction. This was superseded by the Section 9 completion recorded in §15; Section 10 is now next.

Later (2026-10-03): the serve picture and the must-not rules are agreed. The next work is the section on waiting.

## 13. CASE-4 walkthrough (2026-09-25)

**Deliverable:** [`section_8_interaction_model.md`](section_8_interaction_model.md) §8.16.5.

**Synthesized from KB (not re-interviewed):** wait spine + **escalation path** (Coordination); SLA / release policy (Time, `research/escalation_sla.md`); tool retry/poll (Failure); partner contact as policy step (Meetings/Human Collaboration); logistics scenario (`research/business_journeys_map.md` §3); situation-delta customer egress (§8.10.3). Internal-before-partner order is **business configuration**, not architecture hard-code.

**Swaraj additions retained:** partner outreach with **internal visibility** (CC/notify); blocked when escalation framework spent.

**Assistant failure noted:** Asked A/B/C escalation order instead of reading KB first.

**Next at that time:** Memory construction unit; §9 dimensions on CASE-1 to CASE-4. This was superseded by the Section 9 completion recorded in §15; Section 10 is now next.

Later (2026-10-03): the serve picture and the must-not rules are agreed. The next work is the section on waiting.

## 10. Level 2 category remediation pass (2026-09-18)

Twenty parallel category audits (2026-09-18) compared every Level 2 category to §6/§7. P0 consolidated into:

- **Groups S/T** — harness control vs authorization control (distributed, not one component).
- **Group U** — compliance enforcement.
- **Expanded catalog** — D8, E7–E9, G7–G9, H8–H10, I7, J7–J9, O7–O10, N17, A12, B8–B9, C5–C6.
- **§7.12.9** gate table; IB-5 expanded with Policy.decide; IB-8 relabeled idempotency.

---

## 14. Memory interaction agreed (2026-10-03)

**Deliverable:** [`how_tend_finds_the_right_situation.md`](how_tend_finds_the_right_situation.md).

Swaraj agreed the choices in that file, including the recommendations that had been left as safer readings. Those are rules. The practice folder `memory_simulations/` was removed after a check that the file held the results. `memory_construction_from_here.md` was removed the same day. It was a working note, not architecture.

**Do not reopen:** who is speaking, which cards are shown, one full story after the choice, settings are not cards, what learning must not change, deck sent while revenue is still open, no default receipt, approval inside the action that needs it.

**Next at that time:** Section 9 dimension stress. The work was subsequently completed in this conversation; see §15.

---

## 15. Section 9 dimension stress completed (2026-10-06)

**Integrated result:** [`section_9_architectural_dimensions.md`](section_9_architectural_dimensions.md). **Detailed working records:** [`section_9_scratch/`](section_9_scratch/) — one audited record for each of the 17 method dimensions.

Each dimension was investigated with a focused subagent against Product Vision, Level 1, Sections 6–8, and relevant Level 2 evidence. The parent audited outputs, requested targeted corrections where a claim overstated what was settled, and preserved established, provisional, and open meanings separately. No Section 9 scratch pass changed the canonical method or silently selected technology.

**Result:** Section 9 dimension coverage is complete for CASE-1 to CASE-5 and the current working architecture. The existing logical boundaries survive this stress pass; no dimension alone justifies a new subsystem boundary. Section 9 identifies parent reconciliation items rather than resolving them by assumption, including the former U5 scenario-number collision (resolved 2026-10-08, see §16), S2/S3 and T11 catalog mismatches, unknown outbound-delivery behavior, policy-change notice/wake mapping, trace retention/deletion, and human-work/meeting contract seams.

**Current status:** Section 9 complete as a dimension-stress stage; Section 10 reconciliation/gap discovery remains unconstructed. This is not architecture stabilization or Level 2 completion. No separate handoff was created; the next construction stage is Section 10 in the current architecture record.

---

## 16. Naming and ownership resolutions (2026-10-08)

This pass changed names and owners. It also wrote some architecture rules, which are not owner decisions. Where a rewrite needed a decision the source does not settle, the item is listed under open questions.

**Scenario names (CASE codes).** The five construction scenarios are now CASE-1 to CASE-5. The compliance rules U1 to U6 in §6 Group U keep their codes.

| Old label | New label | Where it changed |
|-----------|-----------|------------------|
| U1 Business-directed outreach | CASE-1 Priya business-directed outreach | §6.6, §7.4, §7.10, §8.16.1, README, this record |
| U2 Commercial lifecycle chain | CASE-2 Inquiry, order, delay, refund with an unknown gateway outcome | §6.6, §7.4, §7.11, §8.16.2, §8.4.3, §8.8, README, this record |
| U3 Stakeholder information | CASE-3 Investor stakeholder diligence | §6.6, §7.4, §8.16.4, README, this record |
| U4 Unreliable external API | CASE-4 Unreliable logistics or carrier tracking API | §6.6, §7.4, §8.16.5, README, this record |
| U5 Package status, no shipping source (Section 8, §8.16.3) | CASE-5 Package status with no shipping source, capability-absent | §8.16.3, §8.16 links, README, this record |
| U5 Security validation (T-A / T-B) | Not a scenario. Now "T-A / T-B release gates" (§6.6) | §6.6, §8.16.3 mapping, §6 U6 row |

The security validation was listed as a scenario only because of a code collision with the package-status scenario. Its test cases are unchanged. The U6 compliance rule already names the T-A / T-B release gates. Source: compliance rule U6 in §6 Group U (this file's existing text).

**Situation names (no S codes in visible text).** Situations are named in plain words: outreach situation, order situation, delivery situation, refund situation, inquiry situation, unhappy-customer situation. The S1 to S12 codes that name loop steps are unchanged. Source: naming decision of this pass; §6 Group S is the reference for the loop codes.

**Loop step codes in the per-wake contract (§8.3.2).**
- RECOVER: S1 (was S2). RECOVER is a step inside the per-wake contract (S1), not a separate code.
- VALIDATE: S2 only (was S2–S3). S3 is dispatch, not validation.
- UPDATE: S4–S5 (was S4–S6). S6 is the REST decision, not an update step.
- Every "VALIDATE … S3" in §8 (§8.3, §8.4.1, §8.4.3, §8.12.1, §8.12.4, §8.16.1, §8.16.3, §8.16.4, §8.17) now reads S2. Source: §6 Group S definitions (S2 = validate proposal structure; S3 = dispatch fixed EXECUTE paths).

**T11, field visibility (§6 Group T).** Added the row for who may see each field. Content: visibility follows the role and partner scopes Tend pre-writes; the default is narrow; the business may widen a scope only inside the legal white-list and may always narrow it; an employee who leaves loses access the same minute. Source: `Level 2/channels_and_permissions/understanding_all_channels_and_permissions_questions.md` question 4; `Level 2/channels_and_permissions/how_should_tend_decide_what_information_each_employee_customer_or_external_partner_may_see.md` (working decision); `Level 2/compliance_and_security/what_are_the_compliances_of_each_actor_and_tech_stack.md` lines 80 to 86. The gate-locus cell ("Policy implementation; Channels L4") is an assumption made to fit the table; see open questions.

**"T10" hypothesis labels (§7 boundary tables).** The two column headers that used "T10 Security / authority" now read "Security / authority". T10 was never defined in §6 Group T. Source: none (label rename).

**Observation and record owners (O codes).**
- O7, the completeness rule and join (§6 O7 row; new §7.12.10). Each consequential action records what was done, the evidence used, the grant it ran under, why, and the outcome. Each action's owner writes its own record. The join is by run ID, situation version, and situation ID. Ownership of each action type is decided in the Authority and Ownership folder. Storage of the audit trail is a Level 3 question. Source: `Level 2/explainability_and_observation/how_do_we_explain_every_action.md`; `explainability_and_observation_conversation_and_discoveries.md` decision D1.
- O8, the observer (new block under §7.12.9, and owner note in §6). The observer is a harness citizen. It emits probe results, drift signals, and completion-discipline violations on the same event channel. Source: discoveries D6.
- O9, the business-value view, owned by B-Visibility (§7.8 BH-5, §7.12.4). B-Visibility's responsibilities now read O1 to O6 and O9. Source: discoveries D3.
- O10, capability-absent, owned by B-Story (§7.12.1). Recorded on the situation and in the audit, outside failure triage. Source: discoveries D2.
- Two citations that said O9 for capability-absent were changed to O10: §8.16.3 step 6, and the capability-absent product signal in §8.14.1. Source: §6 O10 row and discoveries D2.

**Open questions left by this pass.**
- §8.14.6 cites O10 for "gift-CoT tagged tuning_only, builder hull only." O10 is capability-absent, so the citation looks wrong. The correct code is not decided. Left as written.
- The T11 gate-locus cell is an assumption (see above). Level 3 decides how the matrix is enforced.
- The §7 test-score tables still use T3, T4, and T8 as test labels. They are not Group T codes. Left as written; a later pass should rename them.
- The architecture still uses the older inline code style (codes in visible text). The rule that codes move into hidden comments is not applied in this pass; it belongs to the writing-style pass.

**Audit pass and fixes where the knowledge base already decides.** Six research reports checked §6, §7, §8, the T11 and O-group grounding, and the writing style against Level 2, the Product Vision and Level 1. Changes applied, each tied to its source:
- §6 T11 row: added the refusal rule. Anything outside the white-list is refused and shown as a product signal. Source: Level 2 channels file, question 4 (line 30).
- §6 E5: conflicts resolved in the order Level 2 sets, not "only by a business rule". Source: Level 2 `how_do_we_resolve_conflicts.md`, resolution order.
- §6 A8: reopen only when the same operational problem is not actually finished. Source: Level 2 `how_should_a_conversation_that_contains_several_problems_be_split_into_separate_situations.md` line 15.
- §6 delivery question: a delivered-but-not-received complaint gets its own situation, not an attachment. Source: Product Vision, the delivery section.
- §6 T-A/T-B gates: noted that the rows are examples of the full suites, and that a skipped test counts as a failed suite. Source: Level 2 `how_do_we_make_a_software_product_secure.md` lines 146–147.
- §8 wake table: PROPOSE no longer carries an S code. Section 6 defines S1 as the whole loop.
- §8 trace fan-out: cross-reference corrected from §8.13 to §8.14.6, the redaction gate.
- §8 routine progress: removed the "G2 default" citation. G2 is a different rule (approval outside grant).
- §8 J9: restored the full scope, "before any irreversible action on transferred or covered work", not only the approval class. Source: §6 J9.
- §8 refund at window exhaustion: the outcome is declared unknown, not failed. Source: Level 2 failure outcomes.
- §8 object-store row: "S3" (the cloud storage product) replaced with "object store", so the token no longer collides with loop step S3.
- §7 B-Visibility: "read-only for correctness" changed to "writes no story truth"; its state label is now "derived only, never story truth". Source: Level 2 owner-snapshot file, "never a second source of truth".
- §7 test-score tables: the hypothesis columns T3, T4, T8 renamed BT3, BT4, BT8, so T codes mean only permission rules.

**Still open, waiting on Swaraj's decisions** (defaults proposed in conversation, not applied):
- Refund settle window: whose promise sets it.
- Sole-source carrier down: wait inside the bound, or immediate failure. Level 2 gives both answers.
- Owner push: whether subscription can trigger a push.
- Escalation clock: whether acknowledgement stops it.
- Bounded status polling inside a tool, and whether the situation may poll.
- When Tend may contact a partner directly.
- Customer acknowledgement as consent.
- Customer identity: Tend keeps a link to the customer, not the customer record.
- Memory proposing configuration candidates from setup sessions.
- Whether the configurator's grant delegation is settled. It is marked provisional in Level 2.
- Whether "pending review" Level 2 files count as final (about 30 of 175).
- Owner of the completeness check for O7, and the writer of the O10 declaration. Level 2 leaves both open.
- The business-value view's owning category, and its one definition (O9).
- Whether the builder may see tenant data, and the training opt-in (Level 2 sets the builder default and the chain-of-thought rule differently).

**Still to apply after those decisions:** the S8 invariant IDs I1–I8 (renamed to avoid colliding with S6 Group I), the prospect/customer row, the two-clocks row, the feedback-wait row, the S8 approval return path (AC-3 versus T7), the S8 silence kinds, the S8 "IB-16/17" citation, and the writing-style rewrite with codes moved into hidden comments.

**Decision pass (Swaraj's answers and provisional defaults).** The knowledge base answered most open items; the search and sources are listed here.
- Settle window = the business SLA, with a default that the configurator can change. Source: `research/escalation_sla.md`; Level 2 recovery file ("promised settle window … business configuration"). Applied in §8 CASE-2.
- Escalation clock may stop on acknowledgement; the work stays open. Source: Level 2 `what_happens_when_nobody_responds.md` line 47. Applied in §8 "Ack ≠ completion". This corrects an earlier default in this record.
- Partner contact only after escalation, and only if business policy allows it. Source: Level 2 meetings file, "how_should_an_external_partner_be_contacted…", line 13. Applied in §8 partner rung.
- Acknowledgement is not consent. Source: Level 2 human-collaboration file, "Acknowledgement, consent and authorization are different". No edit needed beyond existing text.
- Customer identity: Tend keeps a reference to each contact; the business owns its contact data. Sources: Level 1 ("Tend never owns information that belongs to another system"); Product Vision ("The business still owns its customers"). Applied in §6 P1, replacing "Apollo owns contacts".
- Memory and configuration: memory records configuration candidates; a configurator validates each one; Q tools apply it only after validation. Source: Level 2 memory files (candidates, reviewed by a person; learned memory never overrides a formal rule). Applied in §6 N13.

**Provisional defaults (not settled; marked "Provisional" in the text):**
- Owner push: a subscription changes only the delivery channel. The three classes of event that reach the owner come from Level 2 `which_events_should_require_the_owners_attention.md`. The knowledge base does not say whether a subscription can add more. Applied in §8 owner-artifact row.
- Polling: bounded status checks inside a tool are allowed, with a bound and backoff. No situation-level polling; the check-in is the only periodic wake. Conflict in Level 2: the recovery file mentions a "polling job", and the time file says "no fixed-interval polling anywhere". Applied in §8 I8 and HC-3.
- Configurator delegation: the configurator may not delegate its own power until Level 2 settles it. Level 2 marks this as provisional. Applied in §6 Q7.
- "Pending review" Level 2 files (about 30): treated as provisional. Not yet marked in the files.

**Swaraj's answers on visibility (applied in §7 B-Visibility, section "Who sees what"):**
- Builder: in the test environment, the builder sees everything it builds. In production, the builder sees only what it made, not the whole business. Internals of a live business are visible only with the business owner's permission, given from the owner's account. Source: Swaraj; Level 2 compliance file on builder access.
- Audit trail: a non-admin owner has no access by default. Access is granted by a person with the power to grant it (the owner, the admin or configurator, or anyone the owner empowers). Grants are configuration. The agent applies a grant when the configuration allows it, and denies the request otherwise. Source: Swaraj.
- Solo owner: owner and admin in one person, so sees what the admin sees, as decided by the product design. Source: Swaraj; Level 2 administrator file.
- Owner metrics: never operational metrics (uptime, message counts). The owner sees business value only: revenue at risk, stuck orders, at-risk customers, deadlines, and items needing the owner. Source: Swaraj; Level 2 explainability D3 and business view; research `research_owner_stakeholder_journeys.md` (B4) and `RESEARCH_BRIEF.md` item 6.

**Who sets the range each role sees (applied in §6 T11).** The product sets the range each role may see, and the default is narrow. The business decides who holds each role. The business may narrow a range, or widen it only inside the legal white-list. Anything outside the white-list is refused and shown as a product signal. Source: Level 2 channels file, question 4; Level 2 compliance file. Swaraj confirmed this reading. The Product Vision line that says "a rule the business controls" (about how much a person receives) is not edited, because the vision is Swaraj's own document. Proposed wording for the vision: "The product sets the range each role may see. The business decides who holds each role, and may narrow the range, or widen it within the legal limit."

**Who checks the record of each action (applied in §7 §7.12.10).** The performer of an action writes its record. The story does not finish a step until that step's record is written, so the check is part of the step. Level 2 does not name a checker. Provisional until Level 2 names one. Source: Swaraj's decision.

**Still open from visibility:** whether tenant data may be used for model training. Level 2 says the builder never uses it "by default", and does not define the opt-in. Default until decided: no training use without the owner's written permission.

---

**Settle pass (defaults applied; names decided; stops before Section 10).**

Names:
- Section 8 sub-IDs S8-n are now IA-n in every architecture file. This removes the collision with harness step S8.
- Section 8 invariant table is now INV-1 to INV-8. References that meant the Section 6 Group I rules are marked as Section 6.
- Section 7 clock labels T1, T2, T3 are now day 1, day 3, day 2. The order of the walkthrough is kept: first message, then the inbound reply, then the nurture step.
- Group T note: T10 is not used. The group runs T1 to T9, then T11.
- CASE-5 (package status, capability-absent) is listed in Section 6.

Rules from Level 2 and the research:
- Silence kinds: seven kinds added as §8.11.1. Source: Level 2 `what_happens_when_nobody_responds.md`, lines 15–23.
- Human-work kinds: replaced with the Level 2 list. Source: Level 2 `when_should_tend_involve_a_person.md`.
- Approval returns through B-Membrane. Source: T7.
- RECOVER: "discard" removed; Level 2 has rebuild-and-resume only.
- Duplicate-escalation sentence removed from the refund case. It had no Level 2 source.
- The T+3d wait in CASE-1 is marked illustrative.
- A dedup step (S12) is added to the per-wake contract.
- Anti-pattern row: the violated code is T2, not T4.
- timer:release_policy is a field on the wait record, read when the timer wakes.
- Channel choice: owned by B-Membrane. Source: Level 2 channel file, line 30.
- B-Memory: learning is on by default, and a configurator can switch it off or require manual validation. Source: Level 2 `can_tend_learn_automatically.md`.
- B-Visibility: the owner snapshot is computed on demand. Attention alerts are pushed only for the three Level 2 classes.
- Configurator: a person, not an AI agent. Source: Level 2 compliance file.
- BH-1 to BH-5 hypotheses are historical; the §7.12 records are current.

Section 6 additions: A13 (lead, prospect, customer), H11 (two clocks), H12 (feedback wait after use), gate rows for planted memory and the 50-hop cap, I3 example corrected to Level 2 wording, state list completed (not started; needs employee information), duplicate G1–G6 footnote removed.

Section 9: R9-01 to R9-04 marked resolved; old U2 and U1–U5 references updated to CASE labels; scratch records keep old labels, with a mapping note in the integrated file.

**Still open after this pass:**
- The ask row names clarification only. Consent, authorization, and approval are not yet separate rows. Source: Level 2 `when_should_tend_ask_a_question_instead_of_performing_an_action.md`, lines 29–33.
- "Pending review" Level 2 files are not marked in their own files.
- Owner of the completeness check (O7): provisional, the story step.
- Owning category of the business-value view (O9): provisional, B-Visibility.
- Tenant data for model training: default no, unless the owner gives written permission.
- Style rewrite: not started.
- Section 10: not started.

**Section 6 plain-language rewrite (2026-10-08).**
- The old Section 6 is kept, unchanged, in `archive_section_6_before_plain_rewrite.md`. Old section numbers (§6.2 to §6.13) and old rule wording resolve there.
- The new `section_6_responsibility_model.md` is written in plain sentences. Every rule code sits in a hidden comment. `code_index_section_6.md` is the agent-only index: for every code, its plain meaning, its source, and its status.
- Four read-only audits checked the rewrite: completeness against the old text; conformance with Level 2, the research folder, the harness study, the Product Vision, and Level 1; plain-language style; and cross-references across the architecture folder.
- Applied from the audits: restored dropped named examples and facts ("Apple", the chargeback window, the investor example, the ForcedLeak and GDPR examples); removed code labels from the visible text; defined the terms the audits found unclear (the model, the owner, fixed code, card, story, coverage, delegation, wake, worker, the legal white-list); split a 51-word sentence; removed duplicate open items; repointed the old §6 references in Sections 7 and 8 and the README to the new section names.
- Corrected a wrong link found in the audit: the CASE-5 walkthrough cited the Section 8 invariant INV-7 (in Section 6 terms, I7, which means something else). It now cites D8 and O10, the Section 6 rules for capability-absent.
- Settled in this rewrite, from the sources: a solo owner sees the whole business, and each role narrows as roles are added (Level 2, who may grant authority); a resend uses the same key only when the other side honours it (Level 2 failure file); a closed situation reopens only when the same problem is not finished (Level 2, reopen rule; the harness line saying "never reopened" is superseded for Tend's behaviour, as Swaraj directed); business policies are pinned when a situation opens, with deliberate migration (Level 2, evolution file); one audit trail, with the security log as a filtered view (Swaraj's answer); the configurator is a role held by a person, working through the configurator's agent, which holds the fixed tools that write grants.
- Still open, listed in Section 6: the exact form of the reopened flag; the identity-to-permission join; whether a polling job is allowed after the bounded checks (provisional: yes); the business-value view's content; whether the owner may see the audit trail (default: no); tenant data for model training (default: no); the exact role field-list format.
- Still stale: the scratch records in `section_9_scratch/` keep the old §6 numbers and the old U1–U5 scenario labels. Both resolve through the archive and the mapping note in the Section 9 index.
- Not yet done: Sections 7 and 8 are not yet rewritten in plain language. Their structure and codes are unchanged.

**Section 7 plain-language rewrite (2026-10-08).**
- The old Section 7 is kept, unchanged, in `archive_section_7_before_plain_rewrite.md`, with its pass history and superseded hypotheses.
- The new `section_7_boundary_model.md` is written in plain sentences, with every rule code in a hidden comment. Each part has a job, what it owns, what it does not do, and its rules. `code_index_section_7.md` is the agent-only index.
- Surveys first: boundary definition and tests (from the method file); source map for each part; services and polling; coverage of Level 2 decisions; internal consistency and plain-language; conflicts against the absolute sources. Then a completeness audit against the archive, a conformance audit, and a plain-language audit of the new text.
- Corrections from the audits: the evidence, grant, gathering, and human-recovery rules are restored to the story part. Undefined terms are defined in a terms list (grant, worker, agent, StepUp, short poll, settle window, and others). Codes in the table are moved into comments. Contradictions are resolved, or marked Open with a recommendation. The membrane is the part that applies the channel rules; Decision Making selects whether to communicate, and that split is Open. Owner push includes owner-risking deadlines. The source for the patching claim is the harness, not Level 2.
- Still open, listed in Section 7: who commits the record (recommendation: the story); builder visibility (Swaraj's answer conflicts with Level 2 explainability and compliance); memory and setup sessions; the polling service as its own part; who writes the links between situations; who checks the records of actions; tenant data for training; owner audit access; configurator passing its power; the owner-view attention delay; the owner significance filter; memory proposing candidates (a Section 6 decision, not stated in Level 2).
- Level 2 and the research folder are absolute. Where Section 7 disagrees with them, the text says so.
- Not yet done: the Section 8 rewrite. The Section 8 contract codes (IB, HC, AC, IA) are still defined there, and Section 7 lists them as join rules.

**Decision pass (2026-10-09): writers, links, builder, Product Vision.**
- Writers: the conversation manager writes what comes in (messages, human answers, routing, creating a situation at intake). The situation worker writes what Tend concludes (facts, conflicts, the decision about the next step, waits, outcomes, human work, closure, accepted links). The communication layer records what it sent. Memory proposes and writes no truth. Source: Level 2 (Understanding, Gathering, Decision Making, Communication, Human Collaboration) and the Swaraj rulings in the harness study.
- Links: memory or the conversation manager proposes; the situation worker accepts or denies on evidence. Swaraj's decision.
- Builder: Level 2 explainability is the base and is not rewritten. Compliance is overlaid (masking, renaming, time-limited and ticketed access). Simulation shows everything; production shows masked views; internals need the owner's permission. Swaraj's decision.
- Product Vision: the communication-layer paragraph was changed. The communication layer expresses; Decision Making decides the next step; the conversation manager decides whether an update is worth telling the person. This matches Level 2, which is the standard.
- Section 7 rewritten on these rules, with recommendations accepted as decisions except the configurator's power, the name for the conversation manager's choice, and owner-view lag.
- Still to do: the Section 7 code index uses the old names (membrane, story) and must be updated; then Section 8.

**Section 8 plain-language rewrite (2026-10-09).**
- The old Section 8 is kept, unchanged, in `archive_section_8_before_plain_rewrite.md`, with its old numbering and pass history.
- The new `section_8_interaction_model.md` covers: the run steps, checking a proposal, which event wakes which part, writing and announcing, waits, permissions and identity, the commit protocol, sending, human work and the owner, capability calls, timing, derived views and memory, the trace and observer, the completion check, five walkthroughs, anti-patterns, and the release-gate mapping. Rule codes are in hidden comments. `code_index_section_8.md` is the agent-only index.
- Surveys: source support for each rule; conflicts with the Section 7 writer rules; plain-language problems; and a 442-item inventory of the old file, so nothing was dropped silently. Then three audits of the new text: completeness against the archive, conformance with Level 2, the harness and the research, and plain-language style.
- Decisions applied: the situation worker writes conclusions; the conversation manager writes what comes in, creates situations at intake, and decides whether an update is worth telling; the communication layer sends and records what was sent; the approval result returns through the tool flow; a configuration change wakes nothing; the settle window is the business's service level for the wait, with a default the configurator can change (Swaraj's answer; Level 2 words it as the third party's promised settle time).
- Level 2 settles these, and the text follows it: retries happen in the tool layer, and a send is a call through it (Level 2 failure files); a bounded number of status calls may be made inside a tool, with five as Level 2's example and the exact number open; a resend with the same key is allowed only when the other side honours the key.
- Recorded as differences, not overrides: the old text said the situation worker's send decision gates sending; the rewrite follows the ruling that the conversation manager decides whether an update is worth telling, and the communication layer sends. Level 2's communication file still has an older sentence on this; the ruling is the later statement.
- Still open: the numbers for proposal limits; the owner view's refresh timing and its lag; the allowlist of fields per consumer class; the exact form of "reopened"; whether the completion check also catches a payment answer given for an unanswered tracking question; the number of status calls; and whether the configurator may hand its power to someone else.
- Not yet done: the Section 8 code index's older rows need a final check against the new text, and Section 9 needs its references updated to the new names.

**Section 9 update (2026-10-09).**
- The integrated Section 9 record and the README now use the current part names: the situation worker, the conversation manager, and the communication layer. A name map is at the top of the Section 9 record.
- Section 9's references to Section 8 section numbers, which no longer exist, were replaced with plain names. The scratch records keep the old names and numbers; the name map and the archive resolve them.
- The Section 9 findings R9-01 to R9-04 remain resolved. Section 10 is next.

**Audit and correction pass (2026-10-09).** Four read-only audits checked Sections 6, 7, 8 and the cross-file names against the conversation constitution and this conversation's decisions. The main corrections:
- Sources now state Level 2's wording. The Level 1 quote in Section 6 is word for word. The settle window is attributed to Level 2 as the outside party's promised time, and to Swaraj's decision for Tend's own waits. The "still provisional" claim and the "three classes are in Section 7" pointer were removed.
- The owner sees three classes of event, as Level 2 says. Level 2 also lets one more kind of event reach the owner at once. Earlier text said four.
- Polling is decided: the harness never polls, and a separate polling service runs the polls. The number of status calls inside a tool is open. Earlier text marked the polling service Open or Provisional in different places.
- All retries happen in the tool layer, a channel send included. The earlier decisions block gave send retries to the communication layer.
- Source precedence is the same in every file: Level 2 governs, the harness study applies unless Level 2 disagrees, and the Product Vision applies where Level 2 is silent.
- Three conflicts with Level 2 were kept visible, not settled: (1) the choice to speak, which Level 2 gives to Decision Making and the recorded decision gives to the conversation manager; (2) whether a platform-rule change wakes open situations; (3) the builder's production view, which changes a Level 2 rule. Swaraj must rule on the first two.
- Several items Level 2 is silent on are marked as decided by Swaraj, not as Level 2 rules: the owner's own customer data unmasked, the audit-trail logging, the written-permission rule for training data, and memory observing setup sessions.
- Business-value content for the owner now uses Swaraj's answer: revenue at risk, stuck orders, at-risk customers, deadlines, and items that need the owner.
- New open items: who supersedes a nurture wait when a reply arrives; who writes the first real version at intake; which version records a delivery acknowledgement; who judges that a problem is "not actually finished" for reopening.
- Not yet done in this pass: a full plain-language sentence check of Sections 6 to 8 (many long sentences and some abstract words remain); the code index rows the audits named as missing (for example U1, F5, K2, M1, M6, and T-A/T-B in Section 6's index); the Product Vision sentence that gives the speaking choice to the conversation manager (needs Swaraj's ruling first); and the Level 2 explainability file, which is not changed by design.

**Round 2 (2026-10-09), at Swaraj's direction.**
- Swaraj ruled: the conversation manager decides whether an update is worth telling the person, not Decision Making. Level 2 was changed to match in six files: the communication understanding file (line 104), when_should_tend_communicate (the ruling at the top, and the boundary section), communication_conversation_and_discoveries (the decision list and the flow diagram), the channels understanding file, the channels how-file (boundary), and the decision-making discoveries file. Decision Making still chooses the next behaviour: ask, wait, or escalate.
- Swaraj accepted the platform-rule recommendation: a platform-rule change wakes each open situation to re-check what is allowed now. A business-setting change does not. Recorded in Sections 6, 7, 8 and in the indexes.
- The Product Vision paragraph already says this (Decision Making decides the next step; the conversation manager decides whether an update is worth telling). It was not changed.
- Level 2's when_should_tend_communicate line 8 still calls the reacting part the "communication manager" and says it "tells the human." The architecture calls the same job the conversation manager. This naming difference is not changed yet.
- Missing code rows added: the walkthrough codes CASE-1 to CASE-5 (Section 6 index), the codes AC-1 to AC-4, D8, HC-1 to HC-3, IB-12 to IB-14, and M5 (Section 7 index), and F5, K2, M6, U1, and the T group (Section 8 index). The one-letter codes are the Section 6 groups.
- Plain-language fixes: "commit" is replaced with "save" in the three section files. "Tenant," "harness," and "registry" are defined in each section's terms list. "Routing cards" became "routing summaries," and "card state" became "state of the situation."
- Still not done: the sentence-by-sentence plain-language pass; the Level 2 explainability builder conflict (Level 2 says the builder has a full view in production; the recorded decision masks production; Swaraj has not ruled on whether to change that Level 2 file); and the Level 2 naming difference above.

**Round 3 (2026-10-09), at Swaraj's direction.**
- Explainability: Level 2's explainability files are kept as they are. Nothing is changed in them. The compliance overlay is added on top: in production the builder sees masked and renamed views of what it built, and the simulation environment shows everything. Level 2's compliance file names masking as a compliance concern (line 226), and the explainability files leave the mechanics to a later technical level. The earlier wording that called this a change to a Level 2 rule has been removed from Sections 7 and 8 and from the index.
- Plain-language sentence pass: not needed. Swaraj's view is that the sentences are clear and their content is right.
- Naming difference (Level 2 "communication manager" against the architecture's "conversation manager"): accepted as it is.
- Open items: the open items in Sections 6, 7, and 8 are the complete list of what remains. Swaraj confirmed there is nothing else outside those lists.

## Related

- [`README.md`](README.md) — how to use this folder
- [`section_6_responsibility_model.md`](section_6_responsibility_model.md) — Section 6 deliverable
- [`three_level_framework/architecture_contruction.md`](../three_level_framework/architecture_contruction.md) — method

**Section 10, completed as a check (2026-10-10).**
- Section 10 now holds the decisions in force, the conflict and gap registers, the items from Sections 6 to 9, the assumptions, the accepted trade-offs, the unknowns, the ten passes, the thirteen-check result, the output, and the list of changes. Its result: complete as a check, not ready to stabilise.
- Decided by you and applied: the source order; the minimum evidence record; the refund setting (default zero, read when a refund is attempted); closing and reopening (approved wording on 2026-10-10); "reopened" as a mark on the same record; the customer stages; status checks in a bounded number inside a tool, run by a separate status-check service, with five as the working bound; platform rule changes re-check open situations and business setting changes do not; a conflict stops only the action it affects; one message with two problems creates two situations; a request with no source stops alone; default permissions for a new business; the configurator's power is not handed on; the update decision name; proposal limits set by the business; the owner view built on request; each consumer sees only its own fields; a payment reply to an open tracking question must be caught.
- Settled by Level 2 and applied: a fact in an outgoing message comes from a tool result from the same turn; an unknown outcome is checked, not guessed; a service that stays down is stopped and checked later; an interim message when a promised response time will be missed; email is the fallback lane; a conversation starts only with an approved template and consent; a granted right must be valid when used; business policies have their own lifecycle; five kinds of unexpected behaviour; the administrator's view includes the audit trail; the owner hears in three classes, and a meaningful change that alters the next business decision can also reach the owner at once (Level 2's note).
- Corrections to earlier statements in this record. The statement that the harness line was superseded "as Swaraj directed" has no source in the session; the source order rule is the reason. The 50-hop cap has no Level 2 source and is removed from the architecture. Whether a problem is "not actually finished" is partly settled: the intake step decides at intake, using Level 2's signals; whether the facts must be checked again before a reopen is open. The statements "Section 10: not started" and "Section 10 is next" are superseded by this entry. The statement that Level 2 was changed at Swaraj's direction on 2026-10-09 is not confirmed in this session; who changed the Level 2 files is open.
- Recorded earlier, to confirm: the masking rules, the audit-trail logging, the non-admin owner default, the training permission, the memory and setup-session rule, the retry without a separate checker, and consent withdrawal (rules 41 to 48 in Section 10).
- Blocking: the identity-to-permission join, and business documents from outside. Needs your decision: free accounts sharing one store; the audit retention period.
- Files changed in this pass: Section 6 (twenty edits), Section 7 (fourteen edits, and the owner's immediate route restored), Section 8 (twenty-nine edits), Section 9 (one sentence), the README status lines, the settled-items page (the source order line, the reopen rule, the question versus approval wording, and the situation wording in the first sections), and Section 10 itself.

**Section 10, approvals applied and plain-language pass (2026-10-10).**
- Your reply "yes" approved the recommendations in the last Section 10 message. The two blocking rules are written into Sections 6 and 8 and the settled-items page: a permission belongs to a verified person, and a business document from outside is filed to the matching situation or sender's record, or shown to a person if nothing matches. Free accounts get separate stores. The refund setting is read when a refund is attempted. The conversation manager's parts are the intake step, the situation worker, and the communication layer. A solo owner who configures the business sees the audit trail. Five is the working bound for status checks.
- The gap rows that had "not checked" status were checked against Level 2 in this pass. Triage order, the deletion rule, the operational alert classes, the meeting counters, the gathering rule, the similarity rule, and the scope limits have sources. The reversal rule, the partner-agreement rule, and the owner timeline and full-graph rules have no Level 2 source. Those rows say so.
- A walkthrough for a supplier's bill of materials was added to Section 8 (CASE-6).
- Plain-language pass: visible banned words were replaced in Sections 6 to 9, the settled-items page, and the how-tend file. Hidden comments and file names were not changed.
- Still open: the audit retention period (needed from you); who made the Level 2 files changed on 2026-10-09 (needed from you); the Level 2 wording changes (yours).

**Section 10, settlement (2026-10-10).**
- The audit retention period was searched for in all 25 research files and in the Level 2 compliance files. Neither states an audit retention period. Level 2 says the per-market legal values, including deletion windows, are enumerated when a market is entered, and that they are known by market research. The research folder's only per-market period is CAN-SPAM's opt-out window: honour opt-outs within 10 days, for email in the United States. The WhatsApp windows (24 hours and 72 hours) are messaging rules. The SOC 2 Type II observation window (about 9 to 12 months) is audit evidence, not a retention rule. The harness study's seven years has no source. No period was set. The period is set for each market when it is entered.
- The Level 2 changes dated 2026-10-09 were made by you. They cover the communication, decision-making and stakeholder wording. The architecture now follows them: the conversation manager decides whether an update is worth telling the person, no receipt-only reply goes out by default, a pass with no committed change sends nothing outside, and a stakeholder may have a configured update.
- The settle windows are named. The promised settle window is the outside party's promise, which is Level 2's term. The internal settle window is Tend's own bound.
- Level 2 lines still to change are yours, and they are listed in Section 10. No blocking unknown remains in Section 10.


## 17. Concluding audit (2026-10-12)

Twenty read-only audits covered the whole knowledge base: all 19 Level 2 folders, the Level 1 framing, the 25 research files, the harness study, the Product Vision and framework files, the product design folder and skill, the software factory file, the construction method, the "Things to look at" folder (inventory only), and the architecture (Sections 6 to 10, this record, the README, and the settled-items page). Every finding, its status, and its disposition is in section_10_audit_register.md.

**The owner's words in this session that bear on the record (quoted):**
- "Yes, approve, but before writing anything always audit your writing in the knowledge piece, search it and then start writing."
- "yes. also start with what is not finished yet"
- "audit retention period has to be taken from the research folder, there has to be a compliance thing. yes the changes in level 2 are done by me, the written meaning was creating confusion so I edited properly to concretely tell the thing. and now settle everything properly"
- "yes, do that and keep me up and ready to go to section 11 after this, I want everything up to section 10 done completely including multiple audits"

**Provenance settled here.** The 2026-10-09 Level 2 edits were made by the owner, in the owner's words above. Earlier lines that say "not confirmed" or "still open" about those edits are superseded by this entry and by the 2026-10-10 settlement entry.

**Still to confirm.** The "recorded earlier" decisions (Section 10, the group headed "Recorded earlier, to confirm") are not confirmed in writing. The owner decides them as owner item 64 in the register.

**Owner items.** The new owner items are numbered 1 to 85 in the register. They are different from the existing numbered decisions in Section 10, which keep their numbers.

**What changed in this pass.**
- Sections 6 to 9: corrections and additions under the headings "Concluding audit additions (2026-10-12)", "Further additions", "Traces", "Consent and transfers", and "Run steps and the observer".
- Section 10: a concluding audit section, corrected rows, a rewritten Result, and "Readiness for Section 11".
- Section 9: the source-tag wording and the variation axes, taken from the Level 2 growth file.
- This record: the Section 16 header, and this entry.
- README: stale rows corrected, and the two new files listed.
- New files: section_10_audit_register.md and walkthrough_sections_1_to_11.md.

**Note on order.** In this file, Section 10 (dated 2026-09-18) comes after Sections 12 and 13 (dated 2026-09-25). The dates are as written.

**Method declaration.** The method names no owner declaration. The agent makes the declaration "Stabilized" or "Not Stabilized" (11.22, step 23). No declaration has been made. Section 11 has not started.

## 18. Round 2: channels, consent, nurture and states (2026-10-12)

**The owner's words in this round that bear on the record (quoted):**
- "I agree with only these few points"
- "make it extremely simple"

**Points agreed in this round.**
- Channel behaviour comes from the research files. Template-first is not the default.
- All four channels are supported: WhatsApp, Telegram, email, and website chat.
- A reply goes on the channel the person used. A start uses the first option that is available and allowed.
- Email is used when Telegram is not connected.
- Telegram may be free once the chat has started. This is Swaraj's view, open to confirm.
- Consent is implied when a person engages. The channel's own rules decide how consent is taken for a message the business starts.
- The situation worker cancels the nurture wait in the same version as Tend's reply, before the reply is sent. A time trigger wakes the situation worker, never the conversation manager.
- The conversation manager never sets waiting or blocked. Later, the completed rule changed: only the conversation manager sets completed, when it concludes the conversation is over (see entry 18, concluded items).
- The conversation manager writes the first version of a new situation.

**What changed in the Level 2 files.**
- The channel choice, channel rules and consent files are rewritten in plain sentences. Each claim is labelled as a research fact, a position, a decision, or an open question.
- The 72-hour free entry window: all message types are free inside it, but after the first 24 hours only templates may be sent. The WhatsApp file says so. Marketing templates inside the window are a research conflict (see below).
- Templates usually need opt-in. The research says "in most cases", and the files now say the same.
- The five checks in the channel choice file are the only full list. Check 5 allows an approved template outside a window.
- The state, waiting, nurture and growth files are rewritten. Blocked has one definition in every file: no one is left to escalate to, and no safe next step is left. A blocked situation has no check-in and no resume trigger.
- Platform rule changes wake waiting situations. Tend never pins a platform rule.
- The sibling summary (item 3) matches the choice file.

**What changed in the architecture.**
- Section 6: the blocked wording matches Section 8. The run step START is renamed TRIGGER, so the word "start" means only a message.
- Section 7: the conversation manager keeps the containment decided on 2026-10-10. A time signal goes straight to the situation worker, and never to the intake step or the communication layer. The atomic rule now says Tend's reply and the cancel of the nurture wait are saved in one version by the worker. The customer's message is recorded first, as its own version. The channel bullet states the 72-hour rule.
- Section 8: the starting block is rewritten. The nurture rules say "customer's message" for what a person writes and "Tend's reply" for what Tend sends. The state table gives blocked one wording and adds "Blocked to completed: open". The consent bullet says "given consent for replies". "The owner" in the owner-view section means the business owner.
- Section 10: headings are dated 2026-10-12 instead of "this round". The channel bullet no longer says "No open item remains here". The "AI call" line is removed because open item 2 covers it. An open item is added on whether the worker may set completed before the last message is sent.

**Audits.** Third-round audits ran on the channel files (13 points), the state and nurture files (17 points), and the architecture passages (17 points). Points that were valid were applied. Points that need an owner decision are listed below as open.

**Concluded on 2026-10-12.**
- Only the conversation manager sets completed. It does so when it concludes the conversation is over, after no wait is open and the last message has gone out. The worker cannot set completed.
- Whether a wait is shown to the customer is decided by relevance. The conversation manager decides whether an update is worth telling.
- A blocked situation reaches the business owner as a decision only the owner can make. When the business stops it, the conversation manager sets completed, and the reason is shown.
- After a customer's message in a nurture, the nurture ends unless the business's rule sets a new date. The business sets the first nurture date in its instruction.
- There is no empty record. The first version is written at intake, with what came in.
- A delivery acknowledgement is recorded in the communication layer's record of what was sent, not as a situation version.
- The response promise does not pause during a wait. An interim message satisfies it for now, and the resolution promise keeps running.
- Each business sets its check-in interval in configuration. The design fixes none.
- The product team updates a channel's rule record when a platform changes its rules.
- Partners are contacted only after escalation, and only when the business policy allows it.
- The first version includes business-directed outreach and nurture follow-up on the four channels. Unbounded prospecting stays outside Tend.
- Tend requires opt-in for every template it sends.

**Final audits (2026-10-12).** The channel files had a fourth audit (15 points). Each valid point was applied, including the 72-hour window rule (after the first 24 hours only templates may be sent), the five checks (check 5 now allows an approved template outside a window), and the consent checks (all five checks apply to every start). The state, waiting, nurture and growth files and the Section 8 and 10 passages had a final audit (19 points). The valid points were applied. Open questions are stated once, each labelled "Open".

**Section 7 incident (2026-10-12).** A script opened the Section 7 file for writing before it had built the new text, and the build failed. That left the file empty. The file was rebuilt from the session transcript: the last recorded snapshot of the section, the exact Channels and Actors lines read during the session, and the later recorded edits. Several sections were checked against reads made during the session and matched. The rebuild is 402 lines. The file now has 402 lines and is not empty (checked 2026-10-12). The owner confirmed that it is written properly.

**Research questions, resolved (2026-10-12).** Checked against the platforms' own pages.
1. Marketing templates in the 72-hour window. Meta's pricing page: "All messages are free for 72 hours, including template messages, if sent within an open free entry point window." It also says "All marketing template messages are charged." Outside the window, marketing templates are charged. Inside it, they are free. (developers.facebook.com/docs/whatsapp/pricing)
2. After the customer service window closes, only templates may be sent, even while the 72-hour window is still open. (Meta's pricing page.)
3. Telegram proactive contact. Telegram's bots page: "Bots can't start conversations with users. A user must either add them to a group or send them a message first." (core.telegram.org/bots). The matrix's "proactive with consent" means a chat the person started. Cold contact is not possible.
4. Telegram rules. No template rule is stated. Bot messages cost nothing by default: "By default, bots are able to message their users at no cost." (core.telegram.org/bots/faq). Ordinary bots have no time window stated there. Business bots can reply only to chats with an incoming message in the last 24 hours (core.telegram.org/bots/features).
5. Meta's pricing page says some markets move to standalone rate cards on 1 October 2026. The new utility and authentication rates for those markets were not yet published when checked. The rules above do not depend on the rates.

## 19. Section 11: stabilization (2026-10-12)

**What the owner asked.** Audit the changes against the constitution, fix what the audit finds, re-run steps 20 to 23, and explain the two Level 2 items in plain words.

**How the audit was done.** The three audit subagents did not return a report. I stopped them and audited the changes myself, against the constitution. The record says so, so that it is accurate.

**What was changed.**
- The stabilization file and the decision records file were rewritten in plain words. They had too many codes, pointers, and technical terms.
- The "Section 11, step N" and "a call, Section 11" pointers were removed from the architecture files. Each call is now marked "Call (not yet confirmed)".
- One walk-through row in Section 6 said no refund runs without a person. It now says a refund runs through the refund rule, and above the refund setting a person approves it.
- The Level 2 sources were checked again. The refund sentence appears in four places: the secure-product file at lines 117 to 118, 180, and 268 to 269, and the security audit file at lines 135 to 136. Line 180 is a test case, not a rule.

**Verdict: Not Stabilized.** Two sentences in Level 2 do not match decisions already made:
1. The refund sentences. The design lets a refund run without a person up to the refund setting. The setting starts at zero.
2. The free-account store sentence, in the discovery notes at lines 221 to 224. The design gives every account its own store. Level 2 accepts one shared store for free accounts.

**Re-run (steps 20 to 23).** Re-checked after the wording fixes. No new contradictions appeared. The two Level 2 sentences still conflict. The verdict is unchanged.

**Calls not yet confirmed by the owner.** Listed in section 13 of the stabilization file.

**Not changed.** The Level 2 files, which belong to the owner. The decisions in Sections 6 to 10. The register. The agent-only code index files, which still carry older status words. They will be aligned in the next pass.

**Next.** The owner approves the two Level 2 wordings (sections 2 and 3 of the stabilization file). Then Level 2 is changed, and steps 20 to 23 run again. Section 12 starts after a Stabilized declaration.

## 20. Section 11 closed: Stabilized (2026-10-12)

**What the owner decided.** The owner approved the two Level 2 wordings. The owner said there is no free plan. Every customer pays, and the only trial is 14 days on the paid plan. Every business has its own store. The owner gave permission to make the final minor Level 2 edits. The owner asked to close Section 11, and to stop before Section 12.

**What changed in Level 2 (approved wording).**
- The secure-product file, line 117: money above the refund setting, export, and channel rebinding need a person. The setting starts at zero.
- The same file, lines 179 and 180: the refund test case. A refund runs only from a verified request, under the refund rule.
- The same file, line 267: money above the refund setting, export, and channel rebinding route to a person.
- The security audit file, line 135: a tool that moves money above the refund setting without a person fails. So does a tool that exports data without a person, or sends outside the fixed rules.
- The discovery notes, lines 221 to 223: each business has its own store. A shared store is not used. There is no free plan.

**What changed in the architecture files.** The free-account wording in Section 6 and Section 10. Decisions 7 and 12 in the decision records, and one row in the list of what could force a change. The README. The settled-items page. The stabilization file, rewritten with the new verdict.

**Steps 20 to 23, run again.**
- Step 20 (repeat the checks): each changed Level 2 sentence was checked. A search of Level 2 found no other sentence that treats money as always needing a person, and no shared store or free plan. The architecture's wording was updated to match. No contradiction is left.
- Step 21 (do the rounds get smaller?): this round changed wording only.
- Step 22 (record): the stabilization file, and this entry.
- Step 23 (verdict): Stabilized. Section 11 is closed.

**Left for later (not blocking).** Listed in section 11 of the stabilization file. These are: Level 2 wording points that the design already follows; numbers each business sets; market values; and the sending wording. The sending wording was applied as "sends outside the fixed rules." The owner may choose the strict version.

**Not done.** Section 12 has not started. Level 3 has not started. The owner will proofread first.

---

## 21. Section 12 started: method corrections and settlements (2026-10-16, 2026-10-17)

**What the owner asked.** Read Section 12 of the construction method in full. Remove every mention of the old project's architecture document from the method. Report the progress and the next step. Then settle the open points one at a time before any file of the package is written. The package is the written architecture that Section 12 produces: the views, the build view, and the registers.

**Method corrections (2026-10-16).** In `three_level_framework/architecture_contruction.md`:
- 12.1. The subsection that told the story of the old project's document is replaced by "Why the build view is shaped the way it is". The five things a builder must get and the two failures to avoid stay, written as requirements of this method. The name of the old project and the hidden path comment are gone. No mention of it remains in the file.
- 12.21, overview item 2. The path every change takes is the loop a change travels through the parts. It is not a storyline. It is not built from the kinds of situation. The kinds of situation are run against it as tests.
- From the method audit described below, fixed the same day:
  - Two sentences that referred to a previous revision are gone.
  - The gates are now four. The completion matrix — the table that says what must be true before the work counts as finished — is the fourth gate.
  - Each fact has one authoritative place. A repeat is allowed, with a link back to that place.
  - The list of what Level 3 adds to a part file now includes production checks.
  - The build-clarity check now reads the same in substance in the completion matrix and in the handoff gate.

**The method audit (2026-10-16).** An agent read the whole method, all 14,251 lines, and reported what is missing, contradictory, or misleading. The comparison text is fully gone; nothing in the file points at it. Three items are deep and belong to the owner: the method states status in eight different ways and needs one vocabulary; the method never says how the set of kinds of situation is chosen; and three artifacts it requires are undefined (the walkthrough, the rule-code format, and the fields of the audit record). One finding was rejected: listing end-to-end scenarios as boundary evidence in section 5.6 is sound, because testing a hypothesis is not building from tests.

**The comprehension correction (2026-10-16).** I had read it wrong until this day. I was letting stories and situations shape the architecture. The method's rule is the other way. They are only test cases run against the built architecture. The architecture is built from the whole knowledge base during Sections 6 to 11, with Level 2 governing. The method wording that invited my mistake is corrected under the owner's instruction.

**The folder layout (2026-10-16, owner).** A new folder inside `knowledge_base/architecture/` holds the package. One folder for each view, with multiple files in each folder. The build view folder holds the overview and one file per part. A `checking/` folder holds the registers — the lists of gaps, conflicts, non-responsibilities, and decisions — and the records. The sections 6 to 11 files stay where they are: the foundation while the package is written, and the history after. The build view gives each of the boundary model's ten parts one file. Two of those parts sit inside the conversation manager (the situation worker and the communication layer), so the manager's file covers its own acts — intake, routing, the update decision, and setting completed — and names the parts it contains. The owner named the folder on 2026-10-17: `constructed_architecture_from_section12/` (Decided). Its map file is written (Decided). It lists every folder and file with the question each one answers.

**One status vocabulary (2026-10-16, owner).** Five words. They are used in every file's hidden notes for agents — the agent layer, which a human reader does not see — and by the status check in the audits:
- **Decided** — the owner decided it; a decision record points at it.
- **To confirm** — recorded earlier; the owner has not said yes.
- **Provisional** — a working choice that carries a reopen condition.
- **Open** — no answer yet; it sits in the question backlog.
- **Rejected** — refused on purpose; the reason is kept.

One correction from the audit of this entry: "Architecture-only" in the code indexes is provenance, not status. It means no source has been found. Provenance stays in the source column of the index, and the status column uses the five words. A rule with no source found is written as To confirm, with its source cell saying "none found yet". The audit register keeps its own finding labels, because findings are not rules. Aligning the method's own status words to these five is a method edit awaiting the owner's approval.

**Rule codes (2026-10-16, owner).** The existing scheme is kept: one letter and one number per rule, like A1 or B4, with one agent-only code index per section file. In the new package there is one code index per view folder. Each rule carries its code in a hidden comment — a note inside the file that a human reader does not see. The code points to the row in the index that holds the rule's meaning, source, and status. The build order is the one exception: it is a recommendation and gets its own series. The audit register's finding codes stay separate, because findings are not rules.

**Fifteen kinds of situation (2026-10-16, owner).** A kind is a class of case in which at least one part behaves differently than in the common case. The overview table and every part file's heading 10 show kinds. The behaviour view — the view that shows how a case runs — shows the walks: the named stories beneath each kind. The fifteen kinds are:
1. An irreversible action's outcome stays unknown.
2. An outside system is down, slow, or too stale.
3. A partial answer arrives.
4. One instruction fans out to many people.
5. No source and no person can answer.
6. A timer and a reply race.
7. An unrequested document or unknown event arrives.
8. A message cannot be pinned to one situation.
9. Two sources disagree.
10. A person does not act, or is unavailable.
11. An action needs approval, or must be refused.
12. The world changes while work is open.
13. Who is speaking is unknown or unverified.
14. Work is blocked, interrupted, or wrongly closed.
15. A human commitment changes shape.

Dozens of named walks sit beneath them, drawn from the whole knowledge base. The exact list is written down with the behaviour view. Two conflicts stay open until we write the kind they belong to: whether delivered-but-not-received is its own kind or a walk of the conflict kind; and whether a policy change moves a situation or opens a linked one. The naming clash from the old days — two different things were both called U5 — was fixed in the naming pass of 2026-10-08 (entry 16).

**The two-audit rule (2026-10-17, owner).** Every completed write gets two audits, run by agents with fresh context.
- The technical audit checks three things. The reasoning is sound and matches the whole knowledge base. Every claim carries a reference; where a reference is missing the auditor reports it, and the writer adds it, because the auditor never edits the file. The insights drawn during the work are written down clearly, then checked for gaps, conflicts, missing pieces, and misunderstandings.
- The readability audit checks the writing against `conversation with swaraj.md`: it must be easy to read, the references must sit in the hidden notes and not in the visible sentences, and the cognitive load must come from the content, never from the style.

The agent that did the work reads every audit against its own writing, rejects the findings that are wrong, and records why. These audit duties extend the method's audit section, and that is a method edit awaiting the owner's approval.

**The status-check picture (2026-10-17, owner).** The owner re-told the design in his own words. The status-check service is the one place that deals with a third party while the work continues. It works in two ways. It listens for the events a third party sends. It also asks the third party for news itself: a bounded number of times, at a set interval, for a set duration. Its job is to wait on a third party, or to get an answer from a third party, without blocking the situation worker. Three things follow.
- Fixed code updates the situation model. When a tool launches a status check, the code writes the wait itself and tells the AI afterwards: "because this happened, I updated the situation model to waiting myself." The AI keeps gathering knowledge and decides at the decision step. The more the code does, the better.
- The service writes back by event. The answer updates the situation model; the update emits an event; the situation worker wakes and reads the newest version. No part calls another directly. This is the same wiring as the conversation manager and the situation worker.
- When the fallback fails, escalation follows the business's configuration.

**What this changes in the settled files.** The owner's picture differs from three decided texts. The later instruction wins where they conflict. The differences are recorded here rather than hidden.
- The writer rules. Today only the situation worker writes waits, and the tool layer does not write the situation record. The 2026-10-12 rule says only the situation worker sets waiting or blocked. The new picture has the code that launched the status check write the wait itself. One reading question stays open: whether the writer is the tool's own code, or the situation worker's fixed code acting on the tool's result. The second reading keeps one writer for each kind of change, which the method requires. Either way the situation worker still writes waits in every other case, and still sets blocked.
- The polling rule. Today the files say a status check never runs on a fixed interval, and Level 2 says no fixed-interval polling anywhere. The new picture runs a set interval for a set duration. This changes that rule and touches the Level 2 sentence. The old precondition for short status checks — use them only where the outside system's behaviour is known — is carried or dropped by the owner.
- The return path. Today the reconciliation file says the service sends each result back as a message. The new picture returns it as an event. The service is also wider than a fallback that repeats one tool's check: several layers use it, including the situation worker's own waits.

**Parked.** The question of where the status-check service's calls go — through the tool layer, or directly, with the tool layer's rule reworded — was asked before the service itself was explained. The owner withdrew the answer. Nothing is decided there. The tool layer's rule stands as written until this is settled: "the only way Tend calls an outside system".

**A communication rule adopted (2026-10-17, after the owner's correction).** No question goes to the owner without the full picture attached first: the concrete story, the rule, where it is written, and its status. The files are not the owner's memory. The owner never has to read a file, or remember an old call, to answer.

**Status of each item after this pass.**
- **Decided.** The folder layout and its checking folder. The folder's name (`constructed_architecture_from_section12/`) and its map file. The status vocabulary. The code-index home. The fifteen kinds. The two-audit rule. The status-check picture. The part-file shape (owner, 2026-10-17): one heading per part file, with the seventeen items written beneath it as questions and answers, in the same order.
- **To confirm.** The observer: the boundary model writes it as a function that runs alongside the parts, not a part of its own, but owner item 32 in the audit register keeps the question with the owner, and the files seat it three different ways. One wording is chosen when the boundary view is written.
- **Provisional.** The diagram format: plain text until the owner says otherwise.
- **Open.** Where the status-check service's calls go (parked above). The writer question in the status-check picture. How a new kind of situation enters the set. The walkthrough definition and the audit record's fields. Which file comes after the map file. The Level 2 question backlog and the calls not yet confirmed by the owner.
- **Method edits awaiting approval.** Aligning the method's status words to the five. Adding the two audit duties to the method's audit section. Changing the method's part-file section to the question-and-answer shape: its references to "heading 10" and "heading 15" become "question 10" and "question 15".

**Part-file shape decided (2026-10-17, owner).** One heading per part file. Beneath it, the seventeen items are written as questions with their answers, in the same order. The seventeen sub-headings are dropped.

**Two owner decisions (2026-10-20).**
- **The trust and evidence answers are accepted (Decided).** The owner reviewed Level 2's `trust_and_evidence/` folder earlier and accepts it. The files still carry the label "working decision, pending review"; the label was never updated, and the content stands as written. Where the architecture folder adapted one of these answers, the adaptation is written there explicitly and keeps its own status. Example: Section 11 lists "a newer valid claim counts only as a correction" among the calls the owner has not confirmed, so that one stays To confirm. Updating the labels in the Level 2 files themselves is a separate edit, not yet made.
- **Long files are allowed (Decided).** A file in the package is no longer stopped or split only because its visible text passes about 300 lines.

**Progress (2026-10-20).** The responsibility view has three of its ten files written and audited: `the_situation.md`, `understanding_and_routing.md`, and `gathering_and_trust.md`. The third went through two rounds of both audits.

**Progress (2026-10-20, later).** `deciding_and_permission.md` is written (Section 6 families F, G, and T, with the matching concluding additions). It went through three rounds of both audits. The third round was narrow, covering only the round-two changes. Its fixes were applied, and no fourth round was run. Four of the ten files in the responsibility view are now done.

What the audits changed:
- Section 8's narrower "blocked" (no one left to escalate to, and no safe step left) is used instead of Level 2's looser wording.
- The refund rows follow Section 11 §9.
- The status words are defined in the file.
- Source labels are kept out of the visible text.
- Six calls from Section 11 §13, and owner item 83, are marked To confirm.

Findings rejected, with reasons:
- Splitting the file: long files are allowed (2026-10-20).
- Mapping "held" onto "blocked": blocked has the narrow meaning above.
- A filled-in policy example: no source fills one in.
- Removing "the state of the work" from the kinds of rule: it is Level 2's own item.
- Downgrading the "approver sees the exact content" rule: Section 10 item 61 approved the gap-register proposals.
- Treating the settled page's line 165 as a conflict: it speaks of steps inside a grant. This reading is recorded in the index as To confirm.

Drifts found in the foundation are recorded in the code index notes for this file:
- G9's stale "Open" row;
- the one-time grant tagged G7;
- S2's harness citation;
- Section 10 gap 16;
- Section 6 line 703, the second-person rule, which comes from a research line about Tend's own team;
- Section 8's G3 tag;
- the solo-owner wording;
- the record-checker status, which Section 11 §13 and Section 10 disagree on;
- the configuring owner's audit access, which the settled page and Section 10's owner-items table disagree on.

**Progress (2026-10-20, third file of the day).** `time_people_and_meetings.md` is written. It covers Section 6 families H (time and waiting), J (people), and K (meetings and partners), with the matching concluding additions. It went through two rounds of both audits. The second round was narrow, covering only the round-one changes. Its fixes were applied as the auditors proposed them, and no third round was run. Five of the ten files in the responsibility view are now done.

Key choices:
- The owner's status-check picture (2026-10-17) is followed, not the older "no fixed interval" rule. The service's asking does not wake a situation; its answer does.
- Blocked has no check-in, following the Level 2 files rewritten on 2026-10-12.
- Source order is per claim. "Hierarchy of the truth" is not used as a universal ranking (technical audit, round 1).
- Two anchor stories carry the file: Meera's parcel and Priya's meeting. Both are worked through to an outcome.
- Marked To confirm:
  - the watch kept as a wait;
  - a repeated job beside the check-in;
  - a timer with no wait behind it is not allowed (Section 11 rule 21: the design's own rule);
  - the record of which rule accepted a handoff automatically;
  - the meeting-event writer;
  - two calls from Section 11 §13 (customer confirmation; investor and regulator).

Findings rejected, with reasons:
- Removing file names from the visible text. The map requires a link back to each home; plain file names were turned into links instead, and the names of files not yet written were dropped.
- A next step for each kind of silence. No source gives that mapping.
- "Completed" in place of "resolved". The worker records resolved; the conversation manager sets completed. These are two decided acts.
- Removing the visible note that the polling rule changed. The note is kept.
- Grouping or splitting Level 2's own long lists. Long files are allowed.

Drifts recorded in the code index notes for this file:
- the polling rule, still in the older files;
- Level 2's two statements on blocked and the check-in;
- the customer-clock wording;
- the repeated job against "the only periodic wake" (owner item 21);
- Section 11 §11 item 3's "ticks": no Level 2 file supports it; the only Level 2 tick is a chat read tick;
- the watch record;
- Section 6's J3 example against the partner rule;
- J7's "assignment";
- the J6 code collision between the Section 6 and Section 8 indexes;
- IA-14's Provisional status with no reopen event;
- the three Level 2 lists of how a person takes part;
- the partner-trail wording;
- the per-claim source order.

**Progress (2026-10-20, fourth file of the day).** `communicating.md` is written. It covers Section 6 families I (communication) and L (channels and visibility), with the matching concluding additions in Sections 6, 7, and 8. It went through two rounds of both audits. The second round was narrow, covering only the round-one changes. Its fixes were applied as the auditors proposed them, and no third round was run. Six of the ten files in the responsibility view are now done. The time file and the deciding file now link to it as the home of the channel rules.

Key choices:
- Three stories carry the file: Meera's parcel (a reply, then a start the next morning after her WhatsApp window closed), the investor (a partial answer), and Priya (a first message with no window).
- The three acts stay apart: the worker writes the intent, the conversation manager makes the update decision, the communication layer sends and records.
- The start order is the one decided on 2026-10-12, not the older order in the channels conversation record.
- Who decides a start follows Section 11 §9: the channel rules decide, the communication layer makes the choice (technical audit, round 1).
- Marked To confirm:
  - consent withdrawal, and its scope ("every future message to that person" or "the messages the consent covered"); the records disagree on whether the owner confirmed it;
  - an undeliverable message waking the worker as evidence (IA-10);
  - a delivery receipt waking the worker only when a send is pending;
  - the investor and regulator approval call (Section 11 §13).
- Marked Open:
  - where the preferred channel sits in the start order;
  - which part writes a consent record;
  - which kind of Telegram bot Tend uses;
  - the question limit;
  - where the language check sits;
  - the market values, channel costs, send caps, and abuse thresholds.

Findings rejected, with reasons:
- Rewriting the five start checks with new examples: the checks are Level 2's. The source's own gloss was added instead ("may the business message this person, for this purpose?").
- Regrouping the six kinds of waiting into two questions: Level 2 says they must not be collapsed.
- Moving "what Tend is doing next" out of the kinds of doubt: it is in Level 2's own list.
- A reason why email ranks above a WhatsApp template: no source gives one.
- Making "after 72 hours" Open: WhatsApp's ordinary rules then apply again.
- Merging the send check with the start checks: they are different lists from different sources. The text now says how they relate.

Drifts recorded in the code index notes for this file:
- I3: Section 6 says "premature" and "unsafe" are the architecture's additions; both are Level 2's. The other reasons are Level 2's too, not the harness's.
- I1's harness citation (line 1251 against 1355).
- Section 7's record of what was sent (line 84 against line 338).
- Section 10 gap 1's "owner item 21" citation for the grounding rule.
- The older start order in the channels conversation record.
- Owner item 30: Level 2 answers it, but the recommended wording is unconfirmed.
- Consent withdrawal's status and wording.
- The language check: "can check" in Level 2 against "is checked" in Section 8.

**Progress (2026-10-20, fifth file of the day).** `failure_and_recovery.md` is written. It covers Section 6 family M, with IB-8, IB-10, IB-11, S7, the matching Section 6 and Section 7 additions on degraded service, and the owner's status-check picture (2026-10-17). It went through two rounds of both audits. The second round was narrow, covering only the round-one changes. Its fixes were applied, and no third round was run. Seven of the ten files in the responsibility view are now done. The time, communicating, and deciding files now link to it as the home of the failure rules.

Key choices:
- Two stories carry the file. Meera's parcel: the carrier is down, a failure is declared, held, and walked to an end. The refund on order 9912: the payment provider never answers.
- A failure is a record, never a state. The bound decides between waiting and failure. The four declared outcomes, the fixed sorting order, and the four recovery moves are Level 2's.
- At the end of the settle window, the declared outcome is "unknown", in Level 2's words. Section 8's label "unknown, not failed" (Provisional there) is not used.
- The tool asks a few times, then the status-check service waits, following Level 2 and Section 8 (line 321). Section 7's "the tool layer does not check status" (line 158) is recorded as a difference.
- Marked To confirm:
  - the duplicate check reading the situation record before the intent is written (IB-8's mechanism);
  - the one-version save of start, unknown outcome, and wait (IB-11);
  - whether the limit of five counts inside one tool call or inside one wait;
  - the safe-hold read as the blocked state, and how the internal clock acts on it.
- Marked Open:
  - whether a timer (IB-9) or only the service's answer wakes a recheck;
  - the writer of a wait handed to the status-check service, and of its answer;
  - an unknown outcome with no way to check;
  - what counts as irreversible for a business;
  - the fallback sources a business allows;
  - severity limits and all the numbers.

Findings rejected, with reasons:
- Changing the shared status legend: every rule without a status word has an accepted source, and every unsourced rule carries To confirm where it appears.
- The disputed "state file, line 51" citation: it is correct; it points to the state file, not the blocked file.
- Moving the tool layer's record of a call elsewhere: Section 7 line 268 names the tool layer as its writer.
- Carrying three Level 2 points into this file: each belongs to another file of this view.
- Naming source files in visible text: they stay in the index notes.
- Narrowing step 1 of the fixed order to a live answer: it checks that a source exists at all.

Drifts recorded in the code index notes for this file:
- the polling rule, with its full list of older lines, and the dangling "decision 7";
- IB-9 against the owner's picture;
- Section 7 line 158 against the tool's few asks;
- the outcome-at-the-bound status;
- the safe-hold reading;
- the M3 index gaps in the Section 6 and Section 7 indexes;
- the "hierarchy of truth" wording;
- the scope of the five;
- the architecture-only mechanisms behind IB-8 and IB-11.

**Trust labels updated (2026-10-20, at the owner's request).** The ten status lines in Level 2's `trust_and_evidence/` folder (nine question files and the map) now read "reviewed and accepted by Swaraj (2026-10-20)" in place of "pending review". Only those lines changed. The adaptation noted above ("a newer valid claim counts only as a correction") keeps its To confirm status in the architecture folder.

**Started (2026-10-21): `memory_configuration_and_improvement.md`** (Section 6 families N, Q, R). Not written yet. The sources are read: Section 6 N, Q, and R with their index rows; and Level 2's memory folder, all 19 files. One status point governs the file. Level 2's `memory_and_knowledge/` folder carries "pending review" on 18 of its 19 files; the conversation record has no label. By this record's own rule (entry 16, line 429: "treated as provisional"), and Section 10's assumption (line 388), memory rules resting only on that folder are **Provisional**, reopening when the owner reviews the folder. Rules the owner already decided elsewhere stay Decided: the memory interaction choices of 2026-10-03 (entry 14), and Section 11's decision records 8 and 9. Correction (2026-10-21): memory observing setup sessions is not among them; line 564 of this record keeps it "recorded earlier, to confirm", so it is To confirm. Still to read: Level 2 `growth_and_evolution/` and `prompt_constitution/`, the configuration capability file, and the Section 7, 8, and 11 slices on memory, configuration, and improvement.

**Full agency granted (2026-10-21, owner).** The owner gave full agency to complete Section 12 without asking: every remaining file, every view, the checking folder, and every audit. Where a clarification seems needed, the writer chooses what best fits the product and the knowledge base, and records the call here, marked "my call, for the owner's review". The owner reviews the calls afterwards.

**My calls so far, for the owner's review.**
1. *Pending-review memory answers.* Level 2's memory folder carries "pending review" on 18 of 19 files. Rules resting only on those files are Provisional (entry 16, line 429). Rules resting on the memory conversation record's working decisions (unlabelled), the 2026-10-03 agreement, or Section 11's decision records are Decided.
2. *Research-sourced rules.* Rules from the research folder that appear in the "Concluding audit additions (2026-10-12)" of Sections 6–9 are Decided, on the owner's "Yes, approve" in the concluding-audit session (entry 17). Rules those additions flagged as calls, "recorded earlier", Open, or Provisional keep that status. Section 11's "Stabilized" verdict is not used as a basis, because the agent declares it (line 608). The technical auditor challenged an earlier version of this reasoning, which cited the verdict. It was corrected.
3. *The status legend.* Every topic file now says: "A rule with no status word next to it is Decided: it has a source the project owner accepted. Every rule that is not Decided carries its word where it appears." The To-confirm line says: "A rule with no source behind it is always marked To confirm." Four audits had read the earlier two lines as conflicting.
4. *A responsibility summary file.* The method asks the responsibility view to give, for each responsibility, its purpose, outcome, inputs, outputs, state, who may decide, and what happens when it fails, and the relationships between responsibilities (Section 12, lines 12688 and 13620–13621). The topic files cover these, but spread out. A summary file collects them. It is the eleventh file of the view.

**Progress (2026-10-21).** Two more topic files are written, each through two rounds of both audits, run by fresh agents.
- `memory_configuration_and_improvement.md` (families N, Q, and R). Home of Q3, the four kinds of change.
  - Key fix: the refund setting is the one policy read at the moment of a refund (owner decision, 2026-10-10). So the example of a policy fixed when a situation opens is now Level 2's late-delivery workflow change.
  - Key fix: the product team authors setting shapes; the configuration tools store them, check against them, and apply them.
  - Key fix: memory writes its items and owns the step instructions.
  - Rejected: removing Provisional marks from rules that rest only on pending-review files.
  - Rejected: cutting the returning-customer small set, which the owner agreed on 2026-10-03.
- `business_view_and_capabilities.md` (families O and P). Home of O3 and O7, and of audit access.
  - Corrected: the deciding file's audit-access row. Both points are Decided, per the settled page's "Closed in Section 11" list and Level 2's administrator answer.
  - To confirm: the product team's masked production view; seeded test data only; the owner's permission for the product team to look inside a live business. Two more 2026-10-09 items stay To confirm, as the record keeps them.
  - To confirm: who besides the configurator may grant audit access; where the observer sits.
  - Rejected: making "important" Open. It keeps Level 2's single definition.
- Drifts recorded in the index notes:
  - the platform-rule split, still tagged "(to confirm)" in Section 7 line 331;
  - the 50-hop test case against the line saying the cap was removed;
  - the settled page's citation for "no personal data in a trace";
  - the Section 7 and Level 2 split on who writes setting shapes;
  - the observer's seat.

**Progress (2026-10-21, the rest of the folder).** Every remaining view, the build view, and the checking folder are written. Each file went through both audits, run by fresh agents. A narrow second round followed wherever a fix changed meaning. No third round was run.
- Views completed: the interaction view (twenty-three interactions); the behaviour view (the common path, and one file for each of the fifteen kinds); the state view; the constraint view; the decision view (eighteen decisions); the traceability view.
- The build view: the overview, and one part file for each of the ten parts. Each part file answers the seventeen questions, has a row for every kind of situation, and adds no rule.
- The checking folder, nine files: the decisions register, the gap register, the conflict register, the non-responsibilities register, the question backlog, the stabilization record, the audit record, the construction history, and the completion record.
- The completion record says **NOT COMPLETE**. Seven questions block it: who writes a wait handed to the status-check service; which code writes that service's answer; whether that service calls through the tool layer; which part holds the book of waits; who writes consent records; which part wakes open situations after a platform rule changes; and how a checked person is matched to their permissions.

Corrections made during the audits, across every file that carried the point:
- Consent withdrawal was set to Decided on 2026-10-21, then set back to **To confirm**, both its scope and its status. Lines 564, 876, and 903 of this record still tag it, and the stabilization (line 267) keeps such tags.
- "The status-check service's asking alone never wakes a situation" is this record's own reading (line 834). It is **To confirm** everywhere.
- The book of waits holds every wait (HC-3). The narrower reading, that a wait ending inside the conversation needs no record, is **To confirm**.
- Every person's answer now reaches a situation through the conversation manager, and every send passes the update decision and the send check, in every walk.
- One definition of Provisional is used everywhere: "a working choice that carries a condition for reopening it" (line 741).

**More calls, for the owner's review** (continuing the list above; each is **To confirm**):
5. Section 11's fourteen decision records count as Decided; its "Stabilized" verdict is not used as a basis on its own.
6. Where this record tags a rule "to confirm", the tag stays, even where an older file says Decided. The record checker was judged this way. The platform-rule split stays Decided, because its decision record governs.
7. What would make each part change was never worked out. Each part's line is the design's reading.
8. "Delivered but not received" sits under kind 9, two sources disagree.
9. When a business policy changes, the same situation moves to the new version; no linked situation opens.
10. A message that may belong to a situation is recorded as a "held note".
11. The observer is described as "a regular check that runs alongside the parts"; its seat stays with the owner.
12. An approval's answer returns to the tool (AC-3); how that fits the conversation manager recording each person's answer is To confirm.
13. A blocked situation has no check-in, following the 2026-10-12 files; the older time line differs.
14. The person who takes a question Tend has never met is named by the business's own rules.
15. Archived reasons — keeping the conversation manager thin, memory apart from the worker, the owner view apart — are kept, To confirm.
16. Diagrams are plain numbered text (Provisional, line 791).
17. The build order, the first thin slice, and the order of later slices, one kind each, are a recommendation.
18. The one-sentence problem in the build overview is the design's wording.
19. The checking folder's nine-file layout.
20. The question backlog's labels, including which seven questions are Blocking.

Flagged for the owner, and listed in the checking folder:
- the older lines that still say no part checks on a fixed clock (the time answers' line 106; the decision records' rule 21, line 156; the reconciliation's status-check item);
- the record checker: decided in Section 7 line 272, tagged to confirm at line 328;
- Section 7 line 392, which states the observer's seat with no status;
- no options table exists, though the stabilization's check 8 says it passed;
- the five: per call or per wait (decision 13's heading and body differ), and decided or a working bound;
- the code M5 means different things in the Section 6 and 7 indexes and in this folder's indexes;
- the proposal limits' defaults (Section 8 lines 98 and 625) against the reconciliation's item 15.

**The seven blocking questions answered (2026-10-22, owner).** The analysis in `constructed_architecture_from_section12/checking/blocking_questions.md` went to the owner on 2026-10-21. On 2026-10-22 the owner wrote: "I'll go with all of your recommendations, and for the smaller questions inside, please go with the appropriate decisions. Audit everything, write the completion record, just complete this section 12 today." The owner then asked for a complete audit of every file in the folder against the knowledge base, with every gap, conflict, and error corrected.

How this message was read, so the owner can check it:
- "All of your recommendations" covers the seven recommendations in the analysis, and every other recommendation this design made: the sixteen earlier calls (Section 11 §13), the calls made under full agency (entry 21, calls 1–20, which the decisions register, part 3, lists again as items 1–23), and the design's readings marked To confirm. All are **Decided**. One earlier call was changed, not accepted as written: the observer runs alongside the parts, not inside the situation worker, because it must notice a situation whose worker never wakes.
- "The smaller questions inside, … the appropriate decisions" covers the smaller questions in each of the seven, the fifteen open conflicts, and the open items the views carried. Each was settled with the answer that best fits the product and the knowledge base. Every one is listed in the decisions register, part 4, and marked "settled 2026-10-22" in the code indexes.

**The seven decisions** (decisions 19–25 in the decisions file):
19. A tool that hands its waiting to the status-check service declares the wait in its result; the worker's fixed code saves it at once, in the same version as the started step, before the AI is told. Each wait records who declared it. The worker stays the one writer of waits.
20. The status-check service's answer is an event addressed to its wait, with the outside system's reference. The intake step saves it as an arrival and concludes nothing; its notice wakes the worker; the declaring tool's fixed code reads it as evidence; the worker concludes. Repeats are keyed by the wait and the reference.
21. The status-check service decides when to ask; the tool layer makes every ask. The tool layer stays the only way out, with no exception. News an outside system sends on its own arrives at the service directly. Its asking never wakes a situation.
22. The book of waits is data kept with the situation records: one shared table, written in the same save as each wait. The worker sets each wait's time signal, which comes straight back to it; after a crash, signals are set again from the book. The intake step, the owner view, and the status-check service read the book. No new part.
23. The communication layer's fixed consent code is the only writer of consent records: one list per business, by contact point and kind of message, each entry with its evidence. Entries come from arrivals, from opt-ins the business collected (through a tool), and from platform signals. The send check reads it at every send.
24. After a platform rule change, the conversation manager reads the book of waits and writes one version into each situation whose open wait ends with a step on that channel; everyone else meets the rule at their next wake; the send check stays the gate. This narrows decision record 8's "each open situation is checked again", and makes the coordination answers' parked "wake dependent situations" the default for platform rules only. New writer row: the conversation manager, one version per affected situation.
25. Three records: the sign-in identity (the provider keeps it); membership per business; channel bindings, made only while signed in. Both written by configuration's fixed tools. A sign-in proves the person; a bound channel proves only the channel and names the member. Every step needing a person's permission needs a fresh sign-in; each approval records who, how proved, and when.

**The smaller questions, settled.** The started step and its wait in one version (yes). The five count per wait; five stays the working bound approved on 2026-10-10; a business may set its own number. The service's limits are set per outside system when its tool is added. A wait inside one run is not written in the book. Consent entry types and evidence fields (yes). An unclear withdrawal counts as one (yes). What a withdrawal stops: both readings, by the words used. Steady pace for large rule changes (yes). Fresh sign-in: 15 minutes, a business may shorten it. A changed WhatsApp identifier suspends a binding; moving one needs the configurator (yes).

**The fifteen open conflicts, settled.** Each row of the conflict register's section 1 now says how. The main ones: the sent record is the communication layer's own record, not a version; an approver's answer is an arrival, handed to the waiting tool step; no separate checker; the check-in is the only regular wake; no recheck timer — the service asks, and the wait's time signal wakes the worker when the limits run out; the same situation moves on a policy change; delivered-but-not-received is one conflict, under kind 9.

**Open items closed.** About sixty, each in the decisions register, part 4: what other parts do while a part is down; memory unreachable; access after the permission store returns; the eleven labels mapping; legal deletion and the audit (per market, with the legal exception); grants while a holder is away; closure outcomes; reopen re-checks; how a new kind enters; fan-out recovery; the unanswered routing question; absence detection; the next step per kind of silence; handoff rules; routing method; unset bounds; freshness; preferred channel; the language check; receipt meaning; capability defaults; consistency; permission granularity; promises never in a grant; second person for grant changes; approval details; the emergency switch holders; compliance checkpoints; the observer checks mapped to the five kinds of unexpected behaviour; versioning of step instructions and stage rules; options for decisions 5 and 6, and reopen conditions for decisions 1, 4, and 12.

**What stays as it is.** The memory rules resting on Level 2 answers still marked "pending review" stay Provisional until the owner reviews that folder. How lessons are promoted stays Provisional. Values each business or market sets are deferred to configuration; a few technical choices to Level 3; a few details to implementation. Files outside the Section 12 folder were not edited: the earlier lines that a later decision replaced are listed in the conflict register, section 2, for correction where they sit.

**Applying them.** The design files first: the decisions, the parts, the records, the rules, the interactions. Then every file that repeats a point: the behaviour view (16 files), the responsibility view (11), the build view (11), the traceability view, and the checking folder. Hidden labels for items now settled were renamed: "call not yet confirmed:" became "accepted call:" (the observer's seat became "changed call:"), and settled "open item:" labels became "closed item:".
