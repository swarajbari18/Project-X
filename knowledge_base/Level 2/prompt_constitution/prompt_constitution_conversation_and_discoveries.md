# Prompt Constitution — conversation and discoveries

## Status

Worked 2026-09-05 as §4A pre-architecture item 13b (full reasoning in study Part 14, §14.3–14.5). The layered model, the ownership map, the writing discipline, and the prompt-optimizer boundary are decided. The release/rollback wiring for constitution text is parked (most of it already exists via the golden scenarios and the audit framework).

This is not one of the original 19 Engineering Question categories. It is a pre-architecture thread reserved in Level 1 ("Research needed before Architecture") because the constitution shapes how the agent surface is designed. It was worked after the Level 2 categories and the engineering study, exactly as Level 1 planned.

## Why this category exists

The model's standing text — the constitution — is where the product's behavioral expectations live. Everything deterministic is enforced by the harness; everything the model must *behave* has to be taught as case-general principle, not as a list of case rules. This category decides what that text is, who owns each layer of it, how it is written, and what may never enter it.

## Swaraj's raw position (kept, because it is the spine)

Swaraj opened from experience, and his opinion held through the evidence check:

- "I don't think the traditional way of making system messages with instructions and stuff will work. This is more about behavior and how we teach the LLM to behave as per our product."
- "Instructions are case specific... but principles or constitution is something that it can follow and apply to any number of cases."
- The thousand-line "constitution" prompts in the wild: "I just see it's just like thousand lines of prompt highly bloated system prompts with rules etc — we have to specifically rule that out." Rules live in the harness; the system prompt carries the constitution.
- The two-part example that fixes the boundary: "the refund period is around seven days" is business configuration in the database — the tool reads it, the harness enforces it, no LLM needed. "Talk to me in Hindi" is LLM-side behavior — the memory and knowledge layer must introduce it at the appropriate step. "That is the synergy of a harness plus a model."
- He was open to being wrong: "research and other people with evidence might say something else... maybe there is something in between."

## What the evidence said

- **Prohibitions backfire** (production finding, Apr 2026): every rule competes for the model's limited attention, and a prohibition is worse than neutral — "do NOT use X" loads X into the model's working context and makes it more salient. The fix is principle-shaped: state the right behavior so well the wrong one loses its place. "Output quality depends less on how many instructions you write and more on which concepts those instructions put into the model's context."
- **Long standing prompts degrade reliably**: mid-context information is underweighted ("lost in the middle"); instructions interfere with each other (the agent behaves inconsistently); every standing token is paid on every call.
- **The in-between that we adopted**: principles still need step-scoping. "Never guess" is universal; "reason only from the execution evidence in front of you" is a stage principle. Hence per-stage constitution slices, not one flat text.

## The correction in this session [HIGH ATTENTION]

The optimizer was first described as optimizing "step instructions" as if they stood beside the constitution. Swaraj corrected: "step instructions are a responsibility of memory and knowledge not ecosystem constitution. The system constitution does not have step instructions." The step's artifact instruction is part of the context assembly — memory & knowledge's responsibility ([how_do_we_assemble_context_for_each_situation_phase.md](../memory_and_knowledge/how_do_we_assemble_context_for_each_situation_phase.md)). This moved the optimizer's entire scope; see the boundary decision below.

## Working decisions

- **Four text layers, four owners** (full table in study Part 14):
  1. Universal core — the invariants, true at every step and case. Human-authored, release-versioned.
  2. Stage constitution — per loop stage, the behavior of THIS stage with positive alternatives. Human-authored, release-versioned.
  3. Runtime-injected preferences — business behavior config (language, tone), placed by the memory loader at the generating step.
  4. Assembly templates — per-step artifact instructions, skill text, slice scaffolding. Owned by memory & knowledge, versioned like skills.
- **Deterministic rules never enter text.** If it can be checked by code, it is code (grounded in Compliance & Security's deterministic list). The thousand-line prompt is a misplacement, not a style.
- **Writing discipline**: case-general principles only (the test: applies to cases it was never written for); positive alternatives over prohibitions; short per stage; rules never in text.
- **The prompt-optimizer boundary**: the optimizer (DSPy/GEPA-class) edits memory-owned assembly text only. The constitution is permanently human territory — a principle that needs rewriting means we misunderstood the behavior, not that the words need polishing. Gates: deterministic validator verdicts + golden scenarios (including expected refusals) + PR review. Adoption is per-predictor and deferred until production traces exist. Swaraj confirmed: "yes, it's fine" — optimizer as a someday-tool for the memory layer's text, constitution as permanently human territory.
- Even a behavior preference has a harness half: a validator can mechanically check the draft's language before it is sent. The model shapes behavior; the validator verifies it.

## What remains provisional

- The concrete release/rollback flow for constitution text (golden scenarios + replay already exist as the test; the release mechanics are Level 3-adjacent).
- "Wake dependent situations on rule change" as a per-business configuration (parked in the event-fabric session; see `coordination/` discoveries).
- Preference validator placement (language/tone checks at the communication layer) — Level 3.
- Assembly-template formats per stage — parked to Level 3 (study 10.2.4).

## Boundaries with other categories

- **Compliance and Security** owns the deterministic rules and the list of what can never be left to the LLM — the reason rules never enter text.
- **Memory and Knowledge** owns context assembly and the injection point for preferences; the optimizer's only territory is its assembly text.
- **Communication** owns the may-propose / must-not-decide lists, which are source material for the universal core.
- **Growth and Evolution** owns the typed business-configuration registry where rules and preferences live.
- **Authority and Ownership** owns grants and approvals — enforced by the control layer, never taught as prose the model could obey or reinterpret.