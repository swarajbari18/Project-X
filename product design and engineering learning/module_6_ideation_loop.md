# Module 6 — The design ideation loop (learning record)

> How the work gets done. Feeds handoff item 8 (the pillar's own output method). Same contract: Tend the example only — until Module 8 grounds, nothing is decided.

**The idea.** Good design doesn't come from good first tries — it comes from a loop that makes first tries *cheap*: **make → show → learn → change.** Quality per draft is nearly fixed; drafts per week move.

1. **Prototype cheap, early** — the cost ladder (Sharpie → greyscale wire → clickable → code); climb only when the cheaper rung stops answering. Sharpie/grayscale (RUI §1) were loop-rungs wearing design advice.
2. **Design-in-code (top rung, solo builder)** — ship the medium you design in; no translation loss. Tend ships as code: the artifact in the browser *is* the mock.
3. **Critique ritual** — present (silently first) → question → discuss → decide (written). Module 5's split inside it: flash alone, reason together. "I like it" banned until "it works because."
4. **AI review, first pass** — the mechanical half is checkable: hierarchy, contrast, labels, color-alone, spacing, signifier honesty, gates, exits. Machine holds rails; human holds judgment. (Tend's design-review skills, item 8 = this.)
5. **Lean research** — 5-user think-aloud (Krug's method: scan/satisfice/muddle live) + JTBD *why*s. 3–5 strangers beat zero. Canon predicts; testing confirms — or embarrasses.
6. **Feeling proxies** — blur (hierarchy?), drain color (color-alone?), time the glance (billboard?) — plus the machine side's billboard test for projections.

---

## The dual-surface ruling (2026-09-14) — Swaraj's words, standing rule

Swaraj's raw direction: "product design is not just the frontend and the ui ux — the fundamentals also apply to the llm. The llm is basically interacting with the sub components we make (tools, business capability, memory, knowledge). Treating the llm as a human: how do we make the product such that it follows the product design philosophy — for the frontend and product UI/UX for humans we follow this." Plus, on fake model "confirmations": forced confirm behavior is theater — it costs nothing to lie through; exit control lives in deterministic guards + the honest acknowledge, never in the promise.

**The doctrine.** Design governs TWO surfaces with the same fundamentals: the **human UI** (owner/employee/customer screens) and the **machine surface** (tool schemas, memory projections, artifact shapes, validation gates, stage text, traces). Laws are perceiver-agnostic: signal-to-noise, signifier honesty, consistency, feedback, constraint, exits.

- **Bounded-artifact-recognition pattern (H6 for the model):** project bounded context the model points at; never tax recall the harness can hold. Validators + typed versioned claims = deterministic backstops (residue tax → zero).
- **Tool names = signifiers on the model's doors.** Gates emit H9's three ingredients (what/why/how-to-recover). Commit points = the model's emergency exits (H3): cancel in the gap, honest-declare after.
- **Model-facing text is also a screen:** stage constitution + runtime preferences + assembly templates obey needless-words omission (Krug's third law), hierarchy, no internal vocabulary (H2). Discipline lives in `prompt_constitution/`; deterministic rules never enter text.
- **State words must survive both perceivers:** the word carries meaning for humans; the same words are gate values for the machine. One vocabulary, two perceivers.

**Runnable form:** `skills/product-design-loop/SKILL.md` (TEACH/PLAN modes; startup order; two-surface loop rungs; checklist-first critique; both-side proxies). Grounds Modules 7–8 dual-surface: every Module 8 item gets human-screen + model-interface treatment together.

**Echoes:** loop ↔ the Gap's fuel half, installed as process. Cheap-rungs ↔ RUI §1. Critique ↔ discrimination-vs-reason. AI-lint ↔ the checklist-half of the canon. Think-aloud ↔ Krug's three behaviors, closed into evidence. Proxies ↔ every end-of-unit instrument assigned so far.

---

## Status

Module 6 taught 2026-09-14 (with the dual-surface ruling recorded above). Next: Module 7 (a design language for Tend). Learning work from this unit still open in conversation.
