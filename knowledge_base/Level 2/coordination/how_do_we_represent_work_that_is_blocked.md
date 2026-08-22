# How do we represent work that is blocked?

## The short answer

Blocked is a state a situation can be in, not a fourth kind of waiting. It means the situation cannot move forward and there is no safe escalation left: no path to escalate, no fallback owner, no way to solve. Because it cannot sit silently, the system must decide between blocking-and-surfacing and stopping safely within policy.

## Our answer

A wait and a block look similar from the outside — both sit still — but they are different on the inside.

- **Waiting** ends on its own. The resume trigger will eventually fire: somebody answers, a date arrives, a state changes, a check-in wakes it.
- **Blocked** does not end on its own. The things that would normally move it are gone. The escalation framework is spent; the responsible person is unreachable; the system is down and no alternative source exists; every safe path was tried.

Blocked is therefore a boundary statement: "the normal machinery of this situation cannot continue." From there the response is governed by what is safe:

1. **Surface it.** Show the owner or the business that this situation is blocked, what it was waiting for, and what the next decision is. It becomes visible work instead of silent work.
2. **Stop safely.** If no safe path exists, the situation creates human work, communicates the limitation, or stops within product and business fallback rules. This continues Decision Making's rule: if no safe fallback exists, create human work, escalate, or stop safely ([understanding_all_decision_making_questions.md](../decision_making/understanding_all_decision_making_questions.md)).

## The difference that matters

A wait ends by itself. A block does not. If we treat a block as a wait, a check-in loop will keep waking an unsettleable situation forever and the business will never see that it is truly stuck. If we treat a wait as a block, we surface a situation that was healthy and would have resolved on its own. So the state tells the machinery whether to keep waiting or whether to escalate-and-surface.

## What an unblock looks like

A blocked situation can become waiting or running again if the situation changes:

- the responsible person becomes available;
- a system comes back;
- the business overrides or re-scopes a policy;
- a new decision by the owner re-opens a safe path.

That is an unblock, not a completion. The situation returns to the loop and the decision cycle continues.

## Related

- [How do we know that a piece of work is still active?](how_do_we_know_a_piece_of_work_is_still_active.md) — active/waiting/blocked/completed as one state model.
- [When should waiting end automatically?](../time/when_should_waiting_end_automatically.md) — the difference from block: waiting ends by trigger; blocking never ends by itself.