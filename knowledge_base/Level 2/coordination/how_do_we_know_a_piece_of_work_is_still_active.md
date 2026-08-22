# How do we know that a piece of work is still active?

## The short answer

A situation is active if it is in one of four states: running, waiting, blocked, or completed. It is "alive" if it is running, or if it is waiting or blocked with a named reason and a stored resume trigger. Nothing can be active silently: every active situation has either work happening now, or an event it is waiting on, or a check-in that will wake it.

## The four states

- **Running**: the situation is doing something right now — reasoning, deciding, gathering. This is the state you called "constantly doing something: some decisions, reasoning, information gathering."
- **Waiting**: active but suspended. We told the customer we are waiting on tools, third parties, or an escalation. It has a reason and a resume trigger.
- **Blocked**: active, but the escalation framework is spent. There is no route to escalate, no way to solve, no safe next step. It must not sit silent; it surfaces, or the business stops safely.
- **Completed**: resolved and closed. Once closed, it is never reopened as the same card (see [how_do_we_recover_interrupted_work.md](how_do_we_recover_interrupted_work.md)).

## What "still active" means

The word "still" is the key. It asks for a guarantee across time.

Active is a durable structural fact, not a memory. The work that lives in a thinking episode dies with the thinking episode. The work that lives in the situation record and the wait registry is active because it can be re-entered, re-run and re-decided at any moment.

So liveness comes from:

- the situation record is durable and indexed;
- the open waits are recorded;
- the situation-level check is scheduled (see [how_do_we_represent_work_that_is_waiting.md](how_do_we_represent_work_that_is_waiting.md) for the timeline and [Time](../time/understanding_all_time_questions.md) for the looping).

## A situation that is waiting is still a situation

An "active" situation is not resolved. Waiting to complete, blocked waiting to be unblocked, and running are all "active" — they differ only in what is keeping them from finishing and what will move them.

## Related

- [How do we represent work that is blocked?](how_do_we_represent_work_that_is_blocked.md) — the boundary where waiting ends and blocked begins.
- [When should waiting end automatically?](../time/when_should_waiting_end_automatically.md) — the triggers that move a waiting situation toward completion.