# Handoff — Pre-architecture Research: Event-driven Agency & Prompt Constitution (remaining §4A item 13)

> Paste this at the start of a fresh chat AFTER the standard opening order: `base_prompt_for_research.md` first (end to end), then `conversation with swaraj.md`, then establish the status quo per `status_quo.md`. This file is the task prompt on top of that base. The engineering study (`agent_harness_study.md`, Parts 1–12) and the two major pillars (product design, software factory) are now COMPLETE — this is the final remaining research item from the original breadth-first scope (base prompt §4A item 13), a dedicated chat of its own.

## We just completed

The engineering study stands complete at twelve parts in `knowledge_base/agent_harness_study.md`, and handoffs exist for the two major pillars (product design & user interaction; software factory with coding agents) and for data architecture & concurrency. The base prompt §4A's original research scope is now fully handed off except for this item.

Item 13 is the "Level 1 reserved pre-architecture threads" — research that informs the architecture before it is built, split into two sub-items:
- **(a) Event-driven agency, memory, and agent-behaviour research** — external products and systems (Bodhi.ai and similar, event-driven systems that react without a user in chat, artifact-oriented products) that are precedents for Tend's event-driven, situation-based agency model.
- **(b) Prompt engineering / the agent's constitution** — where the agent's constitution lives, what it is allowed to do, where the deterministic system overrides it.

## Now I want to research the pre-architecture threads — in this order

Work them in conversation first, exactly like the engineering study sessions. Do not write files without my explicit OK at the natural checkpoints — when I say "write it", the decisions land in the knowledge base (new Level 2 category files, location TBD with my OK) with a changelog. Start every item from the problem, Level 2 first.

### 1. Event-driven agency & agent-behaviour product research (§4A item 13a)

Research external products and systems that are precedents for Tend's event-driven, situation-based agency. The scope names: Bodhi.ai and similar products; event-driven systems that react without a user in chat; artifact-oriented products. For each: what it does, what aligns with Tend's situation model, what is invalid — same align/invalid discipline as every engineering-study source.

The research questions:
- How do event-driven agents model "situations" (or their equivalent) without a chat trigger? What wakes them? How do they represent ongoing work that outlives a single interaction?
- How do artifact-oriented products surface state to users without chat-as-home? (Connects to the product-design pillar's artifact-first IA.)
- What memory/learning models do these systems use? How do they handle the "model proposes, deterministic system decides" boundary?
- What alignment do they have with Tend's loops, situation model, and honest-ending discipline?

### 2. The prompt constitution — where it lives, what it is allowed to do, where deterministic overrides it (§4A item 13b)

The agent's constitution is the set of rules the model lives inside. Decide:
- **Where it lives:** the constitution is text the model sees (system prompt / skill text / standing rules). How is it structured — layered (invariant rules → role rules → skill rules), or flat? Where does it sit relative to skills and memory (runtime) vs the constitution (fixed for a release)?
- **What it is allowed to do:** the boundary between what the model may propose and what it may never decide. Ground in Compliance & Security (model proposes, deterministic layer decides), Authority & Ownership (granted ranges), and Communication (honest acknowledgment, ask-vs-act, per-viewer depth).
- **Where the deterministic system overrides it:** the override points — where code, not the model, has final say. Ground in the engineering study's "loop decides to loop — code first, LLM second" and the no-model-generated-numbers rule. How are overrides enforced (validators, per-step contract, bounded-rounds limit)?
- **Versioning and reversibility:** the constitution is versioned like a release. How do changes get tested (golden scenarios, replay), reviewed, and rolled back? Connect to prompt-optimization (constitution text is what GEPA optimizes) and the software factory pillar (constitution is built/reviewed like code).

Ground in Compliance & Security, Authority & Ownership, Communication, the engineering study (Parts 6/8/9/11), and the Product Vision's "never guess / explain important decisions / business remains in control" principles.

## Ritual and rules (non-negotiable)

- Start every item from the problem, Level 2 first. Technology choices stay Level 3 unless the item is explicitly about them.
- Ground in the knowledge base before proposing anything — re-read the relevant category files IN FULL (Compliance & Security, Authority & Ownership, Communication, the engineering study Parts 6/8/9/10/11). Our first-principles answers outrank any external system.
- Research external event-driven products, agent constitutions, and prompt-engineering practice for *inspiration only* — same align/invalid discipline as every engineering-study source. Our Level 2 decisions outrank everything.
- Web work goes through TinyFish (base prompt §13) for current product research, event-driven agent docs, and prompt-engineering references.
- No model-generated numbers in control paths; states and structured matches decide (carries over from the engineering study).
- At the end of the stint: update the base prompt §4A progress status and §18 sync so the next chat starts correct — with my OK.
Ground in the engineering study (Parts 6, 10, 11), the situation-worker loop's event-wake model, and Business View & Observation. This is external research for *inspiration only* — our Level 2 decisions outrank everything. Produce a per-source map: problem → method → measured result → criticism → where Tend takes or rejects it.