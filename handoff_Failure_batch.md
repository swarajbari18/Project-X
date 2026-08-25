# Handoff Prompt — continue with Explainability and Observation

We just completed the Failure category — category 11 of the 19 Engineering Question categories.

Here is the short summary of what we decided:

- Failure is an event, never a card state. A situation (card) still ends in running, waiting, blocked, or completed. Failure is the recorded fact that a path has gone dead, plus the move to the next safe step.
- Declaration: every wait carries a bound. Until the bound, with no contrary evidence, waiting is honest — that is uncertainty. Past the bound, the system declares the wait a recorded outcome — success, terminal failure, transient failure, or unknown-outcome — with its evidence and its reason, into the audit. There is no silent handling: the failure must be recorded, explainable, traceable, and audit-visible. We were explicit that this is a guarantee, in part because of the compliance and security floor, and for a developer trying to debug a black box.
- Triage is a fixed hierarchy, in this order: (1) we are the responsible agent taking agency for the business in this inbound moment; (2) consequence — if the concrete result is dangerous we do not do it casually, even when a severity tier says it is manageable; (3) severity tier (the P1–P4 frame); (4) how close we are to an outward promise or internal deadline decides when it goes loud to a person. The LLM can argue the consequence; the deterministic system decides; both land in the audit.
- Recovery and repeat-safety: retry is deterministic tool-layer bounded backoff with jitter, never the LLM. When we do not know whether an action landed: if the other side gives us idempotency, resend the same request sparingly; if it gives a status or job-status API, poll a small bounded number of times, then park a polling job, set the card to waiting, tell the customer honestly, and keep the rest of the work moving; if after the settle window the outcome is still unknown and the action is irreversible, escalate to a person with the whole timeline, and never auto-redo. A circuit breaker stops hammering a service that is genuinely down, so nothing repeats forever.
- Partial unavailability is handled by continuing honestly on what is safe, holding what depends on the dead source, marking degraded substitutes, and never running an irreversible action on an unconfirmed fact.
- The remaining knobs — retry counts, backoff ranges, poll counts, settle windows, check-in lengths — are business configuration and Level 3 research, the same way Coordination and Time left theirs open.

The files are in `knowledge_base/Level 2/failure/`.

Now I want to continue with the next batch: **Explainability and Observation.**

Before we enter the questions, do these steps in this order:

1. First read `conversation with swaraj.md`. That is a basic necessity. It establishes the gravity of how our conversation should be done — follow it as a constitution.
2. Then use `status_quo.md` to establish the status quo. Read the file, understand what the status quo is about, and then read the knowledge base files that shape it — Level 1, Level 2, and research — so you are actually in the status quo, not just repeating the summary.
3. Then we will apply the Level 2 framework and the Level 2 method (`knowledge_base/three_level_framework/3_level_framework.md` and `knowledge_base/three_level_framework/level2_method.md`) on the Explainability and Observation questions. Stay in the status-quo step first: find the gaps, ambiguities and contradictions in what we already know about explaining and observing, and reuse what the earlier categories already decided. Do not write any knowledge base files yet — we decide together first, and I will tell you when to write.

Starting pointers for Explainability and Observation, already useful:

- The Level 1 questions under "Explainability and Observation" in `knowledge_base/Level1_Problem_Framing_or_Expansion.md`.
- The Product Vision's obligations "every important action should be explainable and traceable," plus the owner's view section ("what the owner sees"), in `knowledge_base/Product_Vision.md`.
- Where Failure handed off to this category: the audit must actually explain a failure, state the next step, and pair the LLM's reasoned consequence with the deterministic decision — `knowledge_base/Level 2/failure/understanding_all_failure_questions.md`.
- Where Communication already decided how much explanation each role gets and when Tend should explain — `knowledge_base/Level 2/communication/`.
- The durable situation record, its graph, its waiting and blocked states, and its versioned history — `knowledge_base/Level 2/coordination/` and `knowledge_base/Level 2/time/`.
- Where Decision Making separated the LLM's proposal from the deterministic system's state — `knowledge_base/Level 2/decision_making/understanding_all_decision_making_questions.md`.
- Research that already carries audit/observation material: `knowledge_base/research/escalation_sla.md` (what travels with an escalation), and `knowledge_base/research/gaps_beyond_rant.md` (the audit trail is not just for disputes, it is for reputation and forensics).

Method reminders: apply `level2_method.md` for how to run the category, `conversation with swaraj.md` for how we talk, and `file_writing_instruction.md` when we finally write. Status quo first; framework second; writing last.