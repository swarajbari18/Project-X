# Handoff — Complete the Engineering Study (items 1–11, one stint)

> Paste this at the start of a fresh chat AFTER the standard opening order: `base_prompt_for_research.md` first (end to end), then `conversation with swaraj.md`, then establish the status quo per `status_quo.md`. This file is the task prompt on top of that base. It was written at my request at the end of the memory/situation-worker session.

## We just completed

The engineering study stands at eleven parts in `knowledge_base/agent_harness_study.md`. The last two parts settled memory and knowledge: memory is an independent component with its own loop (a software engineering problem, not an AI engineering problem); no model-generated numbers in any control path — states and structured matches decide, event counts are the only admissible numbers; graph-shaped data, not graph structure; situation models are dynamic and link later as discovered, by operational context, never identity; memory attaches to BOTH loops as observer (async, trace-fed, separate process) and loader (synchronous per-stage context slices — verified against TeleChat's per-step slices); state writes are synchronous, learning writes are async; the loop decides to loop — code first, LLM second. The situation-worker loop is drafted (per-wake contract, honesty guarantee, four scenarios walked). The X/Y/Z defense exists for why we did not adopt supermemory/utopia: a memory system's control decisions are the product's decisions.

## Now I want to finish the engineering study — items 1 to 11, in this order

Work them in conversation first, exactly like the previous sessions. Do not write files without my explicit OK at the natural checkpoints — when I say "write it", the part lands in the study file with a changelog entry. Do not drift into the two untouched pillars (product design; software factory) — they are separate chats.

### 1. The three open forks (study file Part 11 §11.6) — RULE THESE WITH ME FIRST

These are product decisions, not research: present each fork with the arguments and your lean, and get my ruling before anything downstream. (a) Where gathering's iteration lives — my lean was: gather is just a behaviour, every round returns to PROPOSE, only memory's retrieval is an internal sub-loop. (b) Whether the worker ever communicates directly or always through the communication layer — my lean: always through the layer. (c) What counts as "progress" for the bounded-rounds limit — my lean: structured evidence-state change, never LLM self-assessment. After my rulings, propagate them into Parts 6 and 11 of the study file.

### 2. GEPA verification

The headline numbers (35× fewer rollouts, +14% over MIPROv2, 9.2× shorter prompts) come from secondary summaries. Read arXiv 2507.19457 and confirm or correct what Part 9 records. Use the TinyFish CLI for fetching (built-in web tools are broken; the /tmp helper recipe is in the base prompt §13 — /tmp is ephemeral, recreate it).

### 3. AutoSaddler status

Check whether Microsoft's AutoSaddler is released/usable as a tool or paper-only. One paragraph of truth, recorded in the study file's AutoSaddler section.

### 4. The internet products column

Fin, Sierra, Decagon (commercial agents' intent→routing→handoff); Temporal, Inngest, Trigger.dev (durable wait/resume/wake); Mem0/Letta (memory breadth — judge against Part 10's rulings, not adopt); Linear/GitHub notification discipline (who gets told what, when). For each: what it does, what aligns, what is invalid for us — same align/invalid discipline as every other source. Inspiration only; our Level 2 decisions outrank everything.

### 5. The conversation-manager open questions (now unblocked by fork rulings)

Which steps produce training traces vs audit-only traces; how the MEANING artifact relates to the Understanding category's situation model. These depend on the fork rulings from item 1 — do them after.

### 6. Golden scenarios + the memory evaluation measures

Produce the situation-level scenario set structure grounded in the Level 1 failure classes and the Agent Seer spec (`Things to look at/agent_seer_tool_specification_scenario_synthesis.md`), including expected-refusal cases (e.g. package question with no shipping source → honest declaration). Fold in the memory evaluation measures from the category (repeated-mistake rate, stale-memory use, policy conflicts, replay regressions). This becomes the seed of the replay harness — structure only, no tooling choices.

### 7. Prompt-optimization practical setup

Concretely how DSPy+GEPA wires against our trace format: which bounded artifacts become predictors, how the deterministic validator stack supplies the (score, feedback) contract, where the optimizer service sits relative to the harness (Part 8's separate-service shape). Conceptual wiring; vendor/hosting choices stay Level 3.

### 8. Fine-tuning deep dive

Our purpose is different from generic fine-tuning: the small model must internalize Tend's product dynamics and thought process, never the business (business learning lives in skills and memory at runtime). Research and compare: SFT, preference optimization (DPO/KTO), verifier-based RL, distillation, rejection sampling, LoRA/QLoRA, adapter composition and routing, continual learning, rollback/versioning — judged against that purpose and against the SKILL.state error taxonomy (adherence-class failures). Produce the methods comparison and what data each would need from our traces.

### 9. Data & feedback deep dive

The trustworthy-signal taxonomy: production traces, human corrections, tool results, validation failures, customer outcomes, replay, synthetic trajectories, hard negatives, near-misses, paired successful/failed runs. Key question stays: "the tool call completed" does NOT prove the ask was answered. Produce the signal classification and which signals feed fine-tuning vs harness repair vs memory learning vs evaluation — this connects item 8 to Part 10's learning pipeline.

### 10. Evaluation & attribution — apply the baseline ladder

Base model → +prompt → +tools → +harness → +memory → +fine-tuning → +routing. Apply it to our actual loops: what the rungs mean concretely for Tend, what gets measured at each rung (model response, tool call, interaction, trajectory, situation completion, business outcome, safety, cost/latency), and how a gain is attributed to a rung rather than guessed. Connect to the two hulls (Part 7).

### 11. The historical lineage map

One map: for every source studied (5+1 repos, 8 papers, the internet products) — earlier problem → method → measured result → criticism/failure → follow-up → current practice → where Tend takes or rejects it. This is the "journey of research" I asked for in session one; it closes the scope.

## Ritual and rules (non-negotiable)

- Start every item from the problem, Level 2 first. Technology choices stay Level 3 unless the item is explicitly about them.
- Ground in the knowledge base before proposing anything — re-read the relevant category files IN FULL. Our first-principles answers outrank any external system.
- Reverse-engineer code, not READMEs, for anything with a repo.
- No model-generated numbers in control paths; states and structured matches decide.
- Web work goes through TinyFish (base prompt §13).
- At the end of the stint: update the study file changelog and the base prompt sections (11/12/18 sync) so the next chat starts correct — with my OK.
