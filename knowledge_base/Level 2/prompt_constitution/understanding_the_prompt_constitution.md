# Understanding the prompt constitution

## Status

Decided (2026-09-05). This document is the map for the category; the reasoning and Swaraj's raw position are preserved in [prompt_constitution_conversation_and_discoveries.md](prompt_constitution_conversation_and_discoveries.md), and the full session record is study Part 14.

## Why this category exists

Everything deterministic in Tend is enforced by the harness. Everything the model must *behave* has to be carried as standing text. The question Level 1 reserved: where does the agent's constitution live, what is it allowed to do, and where does the deterministic system override it?

## The central model, in one sentence

> **The rules live in the harness; the constitution lives in short, layered, case-general text; and the two never bleed into each other.**

## The four text layers

| Layer | What it is | Owner | Lifetime |
|---|---|---|---|
| Universal core | the invariants, true at every step and case: never guess; honest rests; uncertainty as states + reasons; may-propose/never-decide | humans, release-versioned | fixed per release |
| Stage constitution | per loop stage: the behavior of THIS stage, stated with its positive alternatives | humans, release-versioned | fixed per release |
| Runtime-injected preferences | business behavior config (language, tone) | business configuration; the memory loader places it at the generating step | runtime |
| Assembly templates | per-step artifact instructions, skill text, slice scaffolding | memory & knowledge | versioned like skills |

The kind-separation behind the layers: a **rule** is a decided business fact and lives in configuration, enforced by code ("refund = 7 days"); a **preference** is a business choice about behavior, injected at the generating step ("speak Hindi"); an **instruction** is a case-specific direction inside one step's assembly; a **constitution** is a case-general principle that applies to cases it was never written for ("never guess").

## The rule about rules

> Deterministic rules never enter any text layer. If it can be checked by code, it is code.

Grounded in the Compliance & Security category's deterministic list. A rule written as prose implies the model could decide it — which the invariants forbid. The thousand-line "constitution" prompts seen in the industry are rule-dumps in prose: misplacement, not style.

## The writing discipline

1. Case-general principles only — the test: it applies to cases it was never written for.
2. Positive alternatives over prohibitions — a prohibition loads the prohibited pattern into the model's working context; state the right behavior instead.
3. Short per stage — long standing prompts degrade reliably (mid-context underweighting, instruction interference, per-call token tax).
4. Rules never enter text.

## The optimizer boundary

The prompt optimizer (DSPy/GEPA-class, wired in study Part 12.6) edits **memory-owned assembly text only**. It never touches the constitution, the context-slicing decisions, the validators, or the stage design. Its candidates are gated by deterministic validator verdicts, golden scenarios (including expected-refusal cases), and PR review. Adoption is per-predictor and deferred until production traces exist. The constitution is permanently human territory.

## Versioning and testing (what exists, what is parked)

- Exists: golden scenarios with expected-refusal cases (study Part 12.5) as the constitution's test suite; replay assertions as the regression check; release-versioning discipline shared with every other variant.
- Parked: the concrete release/rollback flow for constitution text (Level 3-adjacent).

## What remains provisional

- "Wake dependent situations on rule change" as a per-business configuration.
- Preference validator placement (language/tone checks at the communication layer).
- Assembly-template formats per stage.

## Related

- Conversation record: [prompt_constitution_conversation_and_discoveries.md](prompt_constitution_conversation_and_discoveries.md)
- Study record: `knowledge_base/agent_harness_study.md`, Part 14 (§14.3–14.5)
- Context assembly: [../memory_and_knowledge/how_do_we_assemble_context_for_each_situation_phase.md](../memory_and_knowledge/how_do_we_assemble_context_for_each_situation_phase.md)
- The deterministic list: [../compliance_and_security/how_do_we_make_a_software_product_secure.md](../compliance_and_security/how_do_we_make_a_software_product_secure.md)