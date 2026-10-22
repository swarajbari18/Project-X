# When should waiting end automatically?

Words used here (situation worker, check-in) are defined in [how_do_we_know_a_piece_of_work_is_still_active.md](../coordination/how_do_we_know_a_piece_of_work_is_still_active.md).

## The short answer

A wait ends only when a resume trigger wakes the situation worker and the worker decides the wait is no longer needed. The triggers are: an actor answers, a state changes, a date arrives, or the check-in fires. A wait never ends silently. The end of a wait is not the end of the situation.

## Our answer

The resume triggers are the same events we named in [how_do_we_represent_work_that_is_waiting.md](../coordination/how_do_we_represent_work_that_is_waiting.md):

1. **An actor returns** — a customer writes back, the tool returns a result, the employee answers, or the partner responds. The message or result lands on the situation record.
2. **A state change fires** — the watched status changes: order moved, payment settled, tracking updated.
3. **A date arrives** — a due date, deadline, or scheduled moment.
4. **The check-in fires** — the check-in wakes this situation even if none of the above happened.

A date arriving, or the check-in firing, wakes the situation worker only.

## What "end" means here

When a wait ends, the situation changes state. It is not deleted. A trigger wakes the situation worker. The worker then decides: wait again, send an interim message, block, or record the work as resolved. The conversation manager then sets completed. The decision and the state change are separate. The state changes only when the worker writes a new version ([understanding_all_decision_making_questions.md](../decision_making/understanding_all_decision_making_questions.md)).

## Never silently

Two rules make this safe:

- The wait cannot linger past its check-in. If the check-in fires and the wait is still open, the situation worker decides: wait again, send an interim message, block, or record the work as resolved. Waiting again sets a new resume trigger. So no wait is forgotten.
- The customer hears something useful by the response promise: the time by which we promise to say something useful. If the wait is still open at that time, send an interim message such as: "We are still waiting on X." An interim message satisfies the response promise for now. The resolution promise, the time by which the matter should be resolved, keeps running. The response promise does not pause during a wait.

## Blocked is not waiting

A blocked situation does not "end automatically." It has no check-in and no resume trigger. It moves only when its blocking condition goes, or a person answers. The distinction is in [how_do_we_represent_work_that_is_blocked.md](../coordination/how_do_we_represent_work_that_is_blocked.md).

## Related

- [how_should_forgotten_work_be_rediscovered.md](how_should_forgotten_work_be_rediscovered.md) — the check-in that guarantees "eventually."
- [how_should_deadlines_influence_decisions.md](how_should_deadlines_influence_decisions.md) — deadlines and how they affect decisions.
