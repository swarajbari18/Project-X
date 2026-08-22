# How do we recover interrupted work?

## The short answer

Interrupted work is recovered because the situation record is durable and versioned, and because on restart the open situations are rebuilt from their records and put back into the decision loop. The situation exists again, and that is Coordination's boundary. What to do about the failed operation itself — retry, compensate, escalate — belongs to Failure.

## Our answer

Two things make recovery possible:

1. **Durability.** The situation record, its versions, its open waits and their triggers all live outside any one run of the system. A crash, a deploy, a dead worker — none of them destroys the record. This is the same reason wait bookkeeping lives in the durable layer and not in the model's context ([how_do_we_represent_work_that_is_waiting.md](how_do_we_represent_work_that_is_waiting.md)).
2. **Re-entry.** Recovery is not "restore the old state and pretend nothing happened." It is "rebuild the open situation, see its current state, and re-enter the decision loop with the latest known state." Latest state is the deciding rule: if, in the meantime, an actor answered or time changed something, we use that, not an old snapshot.

## The two boundaries

We drew the cut between Coordination and Failure during the conversation:

- **Coordination** owns: the situation exists again, its waits are still alive (or have expired), it is back in the decision loop.
- **Failure** owns: what the system does about the failed operation itself — retry with backoff, compensate an action, decide whether the failure is a "fail fast" or "wait and retry". The Failure category is the next Level 2 batch; its starting questions are the Level 1 Failure section, and the same theme is discussed in [understanding_all_decision_making_questions.md](../decision_making/understanding_all_decision_making_questions.md).

## Reopen versus new situation

Completion is closure, and closure is permanent (Swaraj's Kanban rule).

- The situation resolved and closed is final.
- If the customer comes back six months later with the same problem because it regressed, that is a **wrongful closure** — it is corrected by reopening the original story, recording why.
- If the customer comes back with a **new** problem, we open a new situation and link it to the old one for context.

This is exactly what the Level 2 Understanding routing already locked in: "new problem → new situation; same unfinished problem → reopen" ([how_do_we_determine_whether_multiple_messages_belong_to_the_same_situation_and_whether_two_seemingly_different_conversations_are_actually_related.md](../understanding_the_situation/how_do_we_determine_whether_multiple_messages_belong_to_the_same_situation_and_whether_two_seemingly_different_conversations_are_actually_related.md)).

## Related

- [How do we know that a piece of work is still active?](how_do_we_know_a_piece_of_work_is_still_active.md) — the state the situation returns to (running/waiting/blocked/completed).
- [How should forgotten work be rediscovered?](../time/how_should_forgotten_work_be_rediscovered.md) — the same recovery loop, from the Time side.