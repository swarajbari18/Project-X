# When should waiting end automatically?

## The short answer

Waiting ends automatically only by a resume trigger: an actor answers, a state changes, a date arrives, or the situation-level check-in fires. It never ends silently. An end of waiting is not the same as an end of the situation.

## Our answer

The resume triggers are the same events we named in [how_do_we_represent_work_that_is_waiting.md](../coordination/how_do_we_represent_work_that_is_waiting.md):

1. **An actor returns** — the tool, the employee, the partner answers; a result lands on the situation record.
2. **A state change fires** — a watcher notices order moved, payment settled, tracking updated.
3. **A date arrives** — a due date, deadline, or scheduled moment.
4. **The check-in fires** — the situation-level loop wakes this situation even if none of the above happened.

The waiting ends when the situation re-enters the loop and the loop decides it no longer needs that wait.

## What "end" means here

An end of waiting is a transition, not a death. The loop then decides: has the wait actually resolved the situation (→ complete), does it need to keep waiting (→ new wait record), is it blocked (→ surface/stop), or is it time for the release policy (→ interim message)? Decision Making's separation of decision intention from operational state applies ([understanding_all_decision_making_questions.md](../decision_making/understanding_all_decision_making_questions.md)).

## Never silently

Two rules make this safe:

- The wait cannot linger past its check-in. If the check-in fires and the wait is still unresolved, the loop must decide (keep, remind, escalate, or surface). This is what makes silent abandonment impossible.
- The customer is never left hanging beyond the response promise. If the release policy deadline fires (5-minute example), the interim like "this is where we are, we are still waiting on X" goes out, and the customer clock pauses even though the internal clock continues.

## Blocked is not waiting

A blocked situation does not "end automatically." It has no resume trigger. It is surfaced or stopped by policy. The distinction is in [how_do_we_represent_work_that_is_blocked.md](../coordination/how_do_we_represent_work_that_is_blocked.md).

## Related

- [how_should_forgotten_work_be_rediscovered.md](how_should_forgotten_work_be_rediscovered.md) — the check-in that guarantees "eventually."
- [how_should_deadlines_influence_decisions.md](how_should_deadlines_influence_decisions.md)