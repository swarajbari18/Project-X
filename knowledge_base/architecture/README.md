# Architecture Folder — How to Use This Material

## What this folder is

This folder holds the **constructed Level 2 logical architecture** for Tend (Project X).

It is not a duplicate of the knowledge base. The knowledge base contains distributed design intelligence — product intent, Level 1 framing, Level 2 category answers, research, and discoveries. This folder contains the **architecture being built from that intelligence**, using the method in [`three_level_framework/architecture_contruction.md`](../three_level_framework/architecture_contruction.md).

The architecture does not already exist in the knowledge base waiting to be extracted. It is **constructed** through controlled reasoning, externalized as documents here, and revised when contradictions or new evidence appear.

---

## Files in this folder

| File | Purpose |
|------|---------|
| [`README.md`](README.md) | How to read and use this folder (this file) |
| [`what_is_already_settled.md`](what_is_already_settled.md) | Short list to read before the longer section files: what is settled, what stays open |
| [`construction_record.md`](construction_record.md) | Conversation record: what we covered, challenges, corrections, gray areas, construction frontier |
| [`section_6_responsibility_model.md`](section_6_responsibility_model.md) | Section 6, in plain language: what Tend must reliably do, with the rules, examples, walkthroughs, and open questions. Rule codes are in hidden comments. |
| [`code_index_section_6.md`](code_index_section_6.md) | Agent-only. For every Section 6 code: its plain meaning, its source in the knowledge base, and its status. |
| [`section_7_boundary_model.md`](section_7_boundary_model.md) | Section 7 in plain language: the parts (situation worker, conversation manager, communication layer, memory, owner view, tool layer, status-check service, configuration, improvement) and who writes what |
| [`section_8_interaction_model.md`](section_8_interaction_model.md) | Section 8, in plain language: how the parts act together, step by step. Covers waking, checking, writing, sending, waits, permissions, the fetch-file example, and walkthroughs CASE-1 to CASE-5. Rule codes are in hidden comments. |
| [`section_9_architectural_dimensions.md`](section_9_architectural_dimensions.md) | Integrated Section 9 dimension-stress result, 17-record matrix, cross-dimension interactions, and Section 10 reconciliation frontier |
| [`how_tend_finds_the_right_situation.md`](how_tend_finds_the_right_situation.md) | Agreed memory and interaction picture (2026-10-03): who is speaking, which summaries are shown, one full situation record after the choice, what may be sent, what learning must not change |
| [`section_11_stabilization.md`](section_11_stabilization.md) | Section 11 record (2026-10-12): the checks, the results, the verdict (Stabilized), and what is left |
| [`section_11_decision_records.md`](section_11_decision_records.md) | The decisions the design rests on (14), the rules that must always hold, how the 16 Level 1 rules are kept, what could force a change, and when to reopen each decision |

Future files (not yet written):
- `logical_architecture.md` — stabilized canonical model, written in Section 12 after a Stabilized declaration

---

## How to read this folder (philosophical order, not numerical order)

The Architecture Construction Method has twelve numbered sections. **Do not treat them as a checklist to finish 1 → 2 → 3 → … → 12 for the whole system.**

The method is an **iterative synthesis loop** over **construction units** (bounded problems such as Priya outreach, order delivery delay, refund with unknown gateway outcome, investor information request).

```text
Pick one construction unit (one operational problem class)
        ↓
Pull relevant knowledge from the knowledge base (not the entire KB)
        ↓
Section 6 — What must Tend own? (responsibilities)
        ↓
Section 7 — Which responsibilities share a boundary? (boxes are conclusions)
        ↓
Section 8 — How do boundaries cooperate? (interactions, wake rules)
        ↓
Sections 9–10 — Stress dimensions; reconcile gaps and contradictions
        ↓
Section 11 — Stabilize when the slice survives stress
        ↓
Externalize here (this folder) — architecture becomes memory for the next unit
        ↓
Next construction unit
```

The numbered sections describe **kinds of reasoning**, not a waterfall schedule.

The actual architecture is a **network**:

```text
Responsibilities ↔ Boundaries
       ↕                 ↕
Interactions ↔ State ↔ Authority
       ↕                 ↕
Failures ↔ Constraints ↔ Dimensions
       ↕                 ↕
Evidence ↔ Decisions ↔ Assumptions
```

Any part can force revision elsewhere. That is why [`construction_record.md`](construction_record.md) preserves **where reasoning changed**, not only final answers.

---

## Construction frontier (current status)

| Zone | Meaning | As of this writing |
|------|---------|-------------------|
| **Established** | Stable enough to constrain later work | Situation = one operational problem; Kanban closure; route/split/link; artifacts over chat; granted-range agency; graph vs identity vs derived journey |
| **Established** | The situation worker, the conversation manager, and the communication layer; the writer rules; Section 6 rule groups **S, T, U** |
| **Rewritten** | **Section 8** — the step-by-step flow, in plain language (2026-10-09). Walkthroughs CASE-1 to CASE-6. The conflicts with Level 2 and the open questions are listed in Section 10 (concluding audit, 2026-10-12) |
| **Established** | **Memory picture, corrected against Level 2** — [`how_tend_finds_the_right_situation.md`](how_tend_finds_the_right_situation.md) and [`what_is_already_settled.md`](what_is_already_settled.md). Summaries, one full situation record after the choice, settings are not summaries. The learning ban is the Level 2 list. A list from the owner is one situation per person. A human is verified by an identity provider. The exact join of that person to what they may do stays open. |
| **Provisional** | **Owner view build** (on request); the field lists per consumer; the human-work field list. Learn-path promotion beyond the must-not rules (vocabulary drift, repeated tool error) is not a separate established protocol |
| **Complete (coverage)** | **Section 9** — all 17 dimensions stress-tested against CASE-1 to CASE-5 and the current model; this completes the dimension pass, not architectural stabilization. Integrated result in [`section_9_architectural_dimensions.md`](section_9_architectural_dimensions.md); identified conflicts/gaps remain for Section 10. |
| **Stabilized (2026-10-12)** | Section 11 is closed. The two Level 2 sentences that conflicted, on refunds and on the store, were changed on 2026-10-12, with the owner's approval. Details: [`section_11_stabilization.md`](section_11_stabilization.md) |
| **Unconstructed** | Section 12: final model, Level 2 completion, handoff to Level 3. Starts after a Stabilized declaration. `logical_architecture.md` is written there |

**Completed in this folder:** Section 6. Section 7. Section 8 through CASE-6. Section 9 dimension coverage (2026-10-06). Communication rulings (2026-09-25). Memory interaction (2026-10-03).
**Checked once:** Section 10 reconciliation (the concluding audit of 2026-10-12 reopened some points; see Section 10), which started from [`section_9_architectural_dimensions.md`](section_9_architectural_dimensions.md) and its R9 findings. Do not reopen settled memory/card rules. Level 2 remains the source of truth where an architecture sentence is thinner.

---

## Who this is for

- **Swaraj** — read [`construction_record.md`](construction_record.md) for the reasoning path; read [`section_6_responsibility_model.md`](section_6_responsibility_model.md) as the reference for what Tend must own.
- **Future agents** — do not re-derive Section 6 from the knowledge base alone. Start from this folder, then pull KB evidence for the **current construction question** only.
- **Level 3 implementers** — responsibilities here are technology-neutral. Do not treat harness-study component names as final boundaries until Section 7 marks them established.

---

## Rules when extending these documents

1. **Responsibilities before components.** Do not add subsystem names without a Section 7 boundary record.
2. **Preserve provenance.** When a responsibility changes, note why in `construction_record.md`.
3. **One construction unit at a time** when adding interaction or boundary detail.
4. **Separate established / provisional / unconstructed** — do not let provisional hypotheses read as finished architecture.
5. **Cross-link the knowledge base** — every responsibility should trace to a KB source; architecture docs are synthesis, not a replacement for category answers.

---

## Related

- Method: [`three_level_framework/architecture_contruction.md`](../three_level_framework/architecture_contruction.md)
- Framework: [`three_level_framework/3_level_framework.md`](../three_level_framework/3_level_framework.md)
- Conversation constitution: [`conversation with swaraj.md`](../../conversation%20with%20swaraj.md) (repo root)
- Harness study (Level 3 hints, not Level 2 truth): [`agent_harness_study.md`](../agent_harness_study.md)

## Added 2026-10-12

- [`section_10_audit_register.md`](section_10_audit_register.md): the concluding audit register. Every finding, its status, and its disposition, and the owner items list.
- [`walkthrough_sections_1_to_11.md`](walkthrough_sections_1_to_11.md): a plain walkthrough of Sections 1 to 11, and what Section 11 needs.

Section 11 is closed on 2026-10-12. Verdict: **Stabilized**. See [`section_11_stabilization.md`](section_11_stabilization.md).
