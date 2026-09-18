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
| [`construction_record.md`](construction_record.md) | Conversation record: what we covered, challenges, corrections, gray areas, construction frontier |
| [`section_6_responsibility_model.md`](section_6_responsibility_model.md) | Section 6 output: full responsibility catalog, graph/identity model, scenarios, clusters |
| [`section_7_boundary_model.md`](section_7_boundary_model.md) | Section 7: B-Story, B-Membrane established; B-Memory lifecycle; §7.12.9 gate table; IB-1…IB-14; HC-/AC- Section 8 handoff |
| [`section_8_interaction_model.md`](section_8_interaction_model.md) | Section 8 first tranche: wake routing, per-wake contract, HC-/AC- families, VALIDATE split, U1/U2/U5 walkthroughs |

Future files (not yet written):
- `logical_architecture.md` — stabilized canonical model when Sections 6–11 converge

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
| **Established** | **B-Story**, **B-Membrane**; §7.12.9 gate table; IB-1…IB-14; §6 Groups **S/T/U** |
| **Established** | **Section 8 first tranche** — wake routing, per-wake contract, HC-1…3, AC-1…4, VALIDATE split, U1/U2/U5 walkthroughs |
| **Provisional** | **B-Memory** learn path (S8-11); **B-Visibility** derive (S8-8); HC-2 MEANING schema; human work field enum |
| **Unconstructed** | U3/U4 walkthroughs; §9–10 dimension stress; `logical_architecture.md` stabilization |

**Completed in this folder:** Section 6 (Groups S/T/U + category pass). Section 7 first tranche + §7.12.9. Section 8 first tranche.  
**Next:** §9–10 dimension stress; U3/U4 boundary re-test; §6 P1 patches (human work state, grant table); B-Memory learn construction unit.

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
