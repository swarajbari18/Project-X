# Understanding all the Coordination questions

## Status

The conceptual model is decided. Coordination and Time were worked as one batch because they share the waiting spine. The remaining items are configuration defaults (check-in lengths, tool timeouts) and Level 3 mechanics, not conceptual gaps.

This document is the map for the Coordination category. The individual question documents preserve the reasoning.

## Why this category exists

Coordination answers one question:

> How does a situation that involves several actors, systems and pieces of work stay coherent and alive over time, without drifting, duplicating or dying silently?

It is the bookkeeping side of the shared waiting spine. Time (the sibling category) is the firing side.

## What we decided together

The central model:

> One situation is one operational problem, one story, one card. It is Tend's coordination record. The situation model holds the current complete understanding of that problem, not the entire conversation history. Everything that happens to that problem lands on that record.

The situation sits in a graph of situation models. Context edges (undirected) say "work one of these and you should see the other." Journey edges (directed) say which situation followed which. Routes, understand, gather and decide all operate on records inside this graph.

Coordination connects independent actors by the waits between them. Each wait is a named record with a subject, reason, resume trigger, release policy and escalation. The canonical spine is in [how_do_we_represent_work_that_is_waiting.md](how_do_we_represent_work_that_is_waiting.md).

A situation is alive because it is running, or because it is waiting/blocked with a named reason and a resume trigger, or because its situation-level check-in will wake it. Once resolved and closed it is never reopened; new work on top of it becomes a new card that references it.

## The four states

- Running: the situation is working now (reasoning, deciding, gathering).
- Waiting: active but suspended, with a reason and a resume trigger.
- Blocked: active, but every escalation path is spent; no safe next step; must surface.
- Completed: resolved and closed; final communication delivered.

The explicit states are defined in [how_do_we_know_a_piece_of_work_is_still_active.md](how_do_we_know_a_piece_of_work_is_still_active.md).

## The questions and where the answers live

- [How do independent actors work together?](how_do_independent_actors_work_together.md)
- [How do we coordinate long-running work?](how_do_we_coordinate_long_running_work.md)
- [How do we know that a piece of work is still active?](how_do_we_know_a_piece_of_work_is_still_active.md)
- [How do we represent work that is waiting?](how_do_we_represent_work_that_is_waiting.md)
- [How do we represent work that is blocked?](how_do_we_represent_work_that_is_blocked.md)
- [How do multiple business processes interact?](how_do_multiple_business_processes_interact.md)
- [How do we prevent duplicated work?](how_do_we_prevent_duplicated_work.md)
- [How do we recover interrupted work?](how_do_we_recover_interrupted_work.md)

## What the earlier categories contributed

- **Understanding the Situation**: one situation = one operational problem; nodes and edges in the graph ([how_do_we_determine_which_information_is_relevant_to_the_current_situation_and_which_information_should_be_ignored.md](../understanding_the_situation/how_do_we_determine_which_information_is_relevant_to_the_current_situation_and_which_information_should_be_ignored.md)).
- **Gathering**: the situation model is the coordination record; references and versions keep history ([relationship_between_understanding_and_gathering_information.md](../gathering_information/relationship_between_understanding_and_gathering_information.md)).
- **Decision Making**: "wait" is a decision intention; "waiting" is an operational state; the deterministic system owns timers, watchers and timeouts ([understanding_all_decision_making_questions.md](../decision_making/understanding_all_decision_making_questions.md)).
- **Human Collaboration**: one responsible owner per human work item; escalation may change urgency, visibility, notification, ownership or routing ([understanding_all_human_collaboration_questions.md](../human_collaboration/understanding_all_human_collaboration_questions.md)).
- **Trust and Evidence**: source authority decides which source to ask first ([understanding_all_trust_and_evidence_questions.md](../trust_and_evidence/understanding_all_trust_and_evidence_questions.md)).
- **Memory**: graph-shaped references, not a graph database; versioned situation history ([understanding_all_memory_and_knowledge_questions.md](../memory_and_knowledge/understanding_all_memory_and_knowledge_questions.md)).

## What this category does not decide

Coordination does not:

- create situation models or decide which problem a message belongs to (that is Understanding and the router);
- split a conversation that contains several problems into situations (that is Understanding's routing decision);
- decide whether an action is allowed (that is Authority and Ownership);
- perform communication (that is Communication);
- own the recovery rules for a single failed operation (that is Failure — Coordination makes the situation alive again, Failure decides what to do about the failed operation itself);
- or define the customer's long path across situations (that is the Journey/Lifecycle view).

## Boundary with the sibling category Time

- Coordination keeps the book of waits consistent: which waits exist, what they wait on, whether they are alive.
- Time computes when a wait fires: deadlines, scheduled starts, automatic ends, and the loop that rediscovers forgotten work.

The shared spine and its representation are written once in [how_do_we_represent_work_that_is_waiting.md](how_do_we_represent_work_that_is_waiting.md) and referenced from the Time overview: [../time/understanding_all_time_questions.md](../time/understanding_all_time_questions.md).

## Remaining open

- Default check-in length and default tool timeouts (business configuration / Level 3 research).
- Whether "watch" gets its own durable record or reuses the wait record.
- Release-policy defaults per business class (response promise versus resolution promise).