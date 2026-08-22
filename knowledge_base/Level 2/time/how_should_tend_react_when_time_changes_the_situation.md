# How should Tend react when time changes the situation?

## The short answer

Time changes the state of the world. Tend's reaction is the same every time:

1. a time event fires (a deadline, a date, a check-in, a scheduled start);
2. it wakes the situation it belongs to;
3. the situation re-enters the decision loop;
4. the loop decides next behaviour using the **latest known state**.

## Our answer

Time is not a background clock. It is an actor in the Level 1 sense: "Time does not make decisions. It changes the state of the world. Tend observes those changes and responds when necessary."

So Time only fires events. What Tend does about the event is decided by the normal loop: gather the latest state, check evidence and policy, decide the next behaviour (communicate, ask, wait, escalate, invoke, close).

The liveness guarantee is the same as Coordination's: every time change that matters is either a timer, a watcher, or the situation-level check-in. Nothing passes that silently affects a running situation.

## What "react" does not mean

- It does not mean "respond to everything." Many moments in time are irrelevant to the situation's next decision; the loop is free to continue waiting.
- It does not mean "assume the newest time means the newest truth." If time changes a state, the claim must come from the source that owns that state, with its own timestamp. We always work with the latest state, but "latest" comes from Trust and Evidence's claim handling, not from a wall clock ([understanding_all_trust_and_evidence_questions.md](../trust_and_evidence/understanding_all_trust_and_evidence_questions.md)).

## Example

A feedback window of two weeks ends. That is a time event. It wakes the feedback situation. The loop checks: was feedback collected? If not, route the reminder or close the loop silently. The customer does not code the reminder; the loop does, because the waiting window is a time wait that fired.

## Related

- [How should deadlines influence decisions?](how_should_deadlines_influence_decisions.md)
- [When should waiting end automatically?](when_should_waiting_end_automatically.md)