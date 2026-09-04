# Status Quo — constitution for establishing the status quo

This is a **constitution file**, not a running-status file.

It defines the *method* for establishing the status quo at the start of a chat. It does not itself carry "where the project currently is." The actual current state is captured by whoever performs this method at the start of a chat, applied to the current knowledge base and files.

Use this file whenever the work is "continue Project X" — tag it at the start of the chat together with `conversation with swaraj.md` and with the handoff constitution (`handoff_prompt.md`).

## What establishing the status quo means

At the start of a new chat, the assistant must reconstruct the standing state of the thinking by reading the actual files — not from memory of any previous chat, and not from the user's head.

The point: Swaraj has already forgotten what lives in the knowledge base; the files carry the truth. The assistant reads them and brings back, plain, the minimal set of facts needed for the chat to continue.

## The three ingredients

1. `conversation with swaraj.md` — how we talk (the base).
2. `status_quo.md` — how we establish where things stand (this file).
3. `handoff_prompt.md` — how we write handoffs (the handoff constitution).

Depending on what the chat is for, use these in the combination that matches. They are add-ons on top of the base.

## The method (the steps to run)

### Start of a chat

- Read `conversation with swaraj.md`.
- Read the framework and method files: `knowledge_base/three_level_framework/3_level_framework.md` and `knowledge_base/three_level_framework/level2_method.md`.
- Read `knowledge_base/STRUCTURE.md` to see the shape of the knowledge base.
- Read the actual knowledge base files that define what is done and what is open:
  - `knowledge_base/Level1_Problem_Framing_or_Expansion.md` — the Level 1 framing, including the 19 Engineering Question categories.
  - `knowledge_base/Level 2/` — the folders for each category; open the `understanding_all_*.md` files to see what's decided.
  - any handoff files from the last chat (written by applying the `handoff_prompt.md` constitution).
- Reconstruct the current state: what is done, what is open, what is the agreed next batch.
- Bring the state back, plain, into the message. Do not point Swaraj at a file to recall it; he does not read the files, the assistant does.

### The next-batch logic

- When a chat is about working on Level 2, the assistant takes the user's intent and matches it against the open categories, established from the actual knowledge-base folders.

### End-of-chat

- See `handoff_prompt.md` for how to finish.

## What this file is not

- It is not a running status of "which categories are done."
- It is not a snapshot of "where we are today."
- It is not a summary of any particular batch.

## Current status snapshot (2026-09-05, after the pre-architecture stint)

- **Engineering study (agent_harness_study.md): Parts 1–14.** Parts 1–11 covered the repos, papers, memory capability, the two loops, and the three fork rulings (§11.6). Part 12 completed the remaining engineering-study handoff items. **Part 13 (2026-09-05) closed §4A items 10 + 12** (data architecture + compute). **Part 14 (2026-09-05) closed §4A item 13 (pre-architecture)**: event-driven decisions (wait book = subscription registry; write-and-announce-together; the cache never guards a decision; rule changes need no event, reads go fresh; duplicates harmless, lost events heal via check-in) and the prompt constitution (four text layers with owners — universal core + stage constitutions human-authored and release-versioned, runtime preferences injected by the memory loader, assembly templates owned by memory & knowledge; deterministic rules never enter text; writing discipline; optimizer edits memory-owned assembly text only, deferred until traces).
- **New Level 2 folder:** `prompt_constitution/` (conversation record + understanding map). Notes added to `coordination/` and `time/` discoveries; Level 1 "Research needed before Architecture" marked done.
- **Still open (separate dedicated research chats):** product design & user interaction pillar; software factory with coding agents pillar. **The Architecture category is unblocked** and is the natural next Level 2 work.
- **Level 2 folders:** 18 categories, all with working decisions. Notes added (2026-09-04) linking to the study's golden scenarios, evaluation ladder, trace-split, and MEANING/situation-model clarification.

Those go into per-chat handoff files (written by applying the `handoff_prompt.md` constitution) and into the knowledge base itself.

## Update this constitution

- Only when the *method* for establishing the status quo changes — for example, new files to read, a new order of steps, or a new start ritual.
- Not for every chat's status change.