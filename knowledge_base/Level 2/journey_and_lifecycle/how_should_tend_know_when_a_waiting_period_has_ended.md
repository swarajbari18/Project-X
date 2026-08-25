# How should Tend know when a waiting period has ended?

## The short answer

Reused from Time — not rewritten here. A wait ends only by a resume trigger, never silently.

## The existing decision (reuse)

Time already decides:

- Waiting ends automatically only by one of the resume triggers: an actor returns, a state change fires a watcher, a date arrives, or the situation-level check-in fires.
- Waiting ends when the situation re-enters the decision loop and the loop decides it no longer needs that wait.
- An end of waiting is a transition, not a death: the loop chooses complete, keep waiting, blocked, or release policy.
- Two rules make silent abandonment impossible: the wait cannot linger past its check-in, and the customer is never left hanging beyond the response promise.
- Blocked is not waiting: a blocked situation has no resume trigger.

## Why this category does not re-write it

Same boundary as the wait-representation question: Journey and Lifecycle cares about the person across situations; *when* a wait ends is Time's job. Reuse keeps one definition.

## Related

- [`when_should_waiting_end_automatically.md`](../time/when_should_waiting_end_automatically.md)
- [`how_should_waiting_be_represented.md`](../time/how_should_waiting_be_represented.md)
- [`how_should_forgotten_work_be_rediscovered.md`](../time/how_should_forgotten_work_be_rediscovered.md)