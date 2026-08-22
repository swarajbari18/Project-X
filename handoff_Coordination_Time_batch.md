# Handoff Prompt — continue with Failure

We just completed the Coordination and Time batch — categories 9 and 10 of 19. We worked them together because they share one spine: **what is a wait.**

Here is the short summary of what we decided:

- A wait is a decision to suspend a situation because the next safe step needs something we do not yet have.
- There are three levels of waiting: tool/operation, situation, and time/scheduled.
- There are three wait subjects: wait-for-actor, wait-for-state-change (watch), and wait-for-context/time. We did not find a fourth kind.
- A situation lives in one of four states: running, waiting, blocked, completed. Waiting ends only by a resume trigger or the situation-level check-in; blocked means the escalation framework is spent and it must surface, never sit silent.
- The check-in is situation-level, not per-tool. It is longer than the event waits inside it, and it is removed when the situation completes. It makes forgotten work structurally impossible.
- There is a response promise and a resolution promise. The interim message serves the response promise; the internal escalation clock keeps running even after the customer is released.
- We also settled: the hierarchy of truth (ask the most authoritative source first, fall back only if it fails); duplicated work mostly dissolves; and completion is closure and closure is permanent — a new problem on a closed card becomes a new card that references the old one.

The files are in `knowledge_base/Level 2/coordination/` and `knowledge_base/Level 2/time/`.

Now I want to continue with the next category: **Failure.**

Before we enter the questions, do these steps in this order:

1. First read `conversation with swaraj.md`. That is a basic necessity. It establishes the gravity of how our conversation should be done — follow it as a constitution.

2. Then read `status_quo.md` to establish the status quo. Read the file, understand what the status quo is about, and then read the knowledge base files that shape that status quo — the Level 1 document, the Level 2 folders, and relevant research — so that you are actually in the status quo, not just repeating the summary.

3. Then we will apply the Level 2 framework and the Level 2 method on the Failure questions (`knowledge_base/three_level_framework/3_level_framework.md` and `level2_method.md`). Stay in the status-quo step first: find the gaps, ambiguities and contradictions in what we already know about failure, and reuse what earlier categories already decided. Do not write any knowledge base files yet — we decide together first, and I will tell you when to write.

Starting pointers for Failure, already useful:

- The Level 1 Failure questions in `knowledge_base/Level1_Problem_Framing_or_Expansion.md` (section 12, "Failure" section).
- Where Coordination handed off to Failure: `knowledge_base/Level 2/coordination/how_do_we_recover_interrupted_work.md` — retry, backoff, compensate; the Coordination/Failure boundary.
- What Decision Making deferred to it: `knowledge_base/Level 2/decision_making/understanding_all_decision_making_questions.md` — safe defaults per capability, timeout/waiting/retry/escalation per external system, consequence and reversibility of actions, policy conflict/expiry.
- Research to reuse: `knowledge_base/research/escalation_sla.md`.

Follow `file_writing_instruction.md` when we finally write, and `level2_method.md` for how to run the category.