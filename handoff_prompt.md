# Handoff Prompt — constitution for writing handoff prompts

This is a **constitution file**.

It defines how the assistant writes a handoff prompt at the end of a chat with Swaraj. A batch handoff is not a report of files; it is a **prompt** that Swaraj will paste at the start of a new chat. It carries the thread forward so the new chat continues exactly where the last one stopped, without Swaraj needing to remember or re-explain anything.

The constitution says: make the assistant behave so that when Swaraj opens a new chat and tags this handoff, the new chat starts correct.

## The two files a new chat needs

A handoff prompt by itself is not enough. It points to the two companions that the *new chat* must actually follow:

1. `conversation with swaraj.md` — the base constitution that establishes the gravity of how the conversation is done. This is a basic necessity, always referenced first.
2. `status_quo.md` — the constitution that tells the new chat how to establish the status quo: read the file, understand what it says, and then read the actual knowledge base that shapes the status quo, so it is truly in the status quo and not just repeating a summary.

The new chat's proper order of operations is:

- First read `conversation with swaraj.md` (how we talk).
- Then read `status_quo.md` and establish the status quo — reading the knowledge base files that the status quo points at (Level 1, Level 2 folders, research) until the assistant is actually standing in the current state.
- Then (when the work is a Level 2 category) apply the Level 2 framework and the Level 2 method on the questions. Status quo first; framework second; writing last.

## What a handoff prompt must contain

It is written as a short prompt that Swaraj would say, with the shape:

1. **"We just completed..."** — the last batch, in plain words, with a short summary of what we decided. Keep it a paragraph, not a spec.
2. **"Now I want to continue with..."** — the next batch/category the work is about.
3. **The ritual instructions for the new chat** — explicit steps, in the imperative:
   - first use `conversation with swaraj.md` — it is a basic necessity that establishes the gravity of the conversation;
   - then use `status_quo.md` to establish the status quo — read it, understand what the status quo is about, then read the knowledge base files relevant to that status quo;
   - then apply the Level 2 framework and method on the questions;
   - do not write knowledge base files yet — establish the status quo and reason together first.
4. **The starting pointers** for the next batch — the files and prior-category connections that are already useful (e.g. which earlier category left a strand pointing at this batch).
5. **Method reminders** — which method/instruction files apply (`level2_method.md`, `file_writing_instruction.md`).

## Rules of thumb

- Fresh-read: the new chat reading only this prompt plus the two constitutions can start sensibly.
- Written in Swaraj's voice — first person, plain, demanding the correct behavior. It must feel like the opening message of the conversation about to happen.
- Reuse, don't relearn: settled decisions are named and pointed to, not re-derived.
- The decision summary should be short in the prompt; the searchable depth stays in the knowledge base.

## The relationship home

This constitution is an add-on on top of `conversation with swaraj.md`, like a roof liner. `status_quo.md` covers how to establish where we are; this file covers what to write so the next chat does it.

## Update this constitution

- Only when the way handoffs are written changes. Not for each batch.