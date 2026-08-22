# Understanding all the Time questions

## Status

The conceptual model is decided. Time and Coordination were worked as one batch because they share the waiting spine. The remaining items are configuration defaults (check-in lengths, release-policy values) and Level 3 mechanics, not conceptual gaps.

This document is the map for the Time category. The individual question documents preserve the reasoning.

## Why this category exists

Time is the actor that changes the business environment without anyone deciding anything.

Deadlines pass. Deliveries become due. Appointments begin. Policies expire. Waiting windows end. In Layer 1's language: "Time changes the state of the world. Tend observes those changes and responds when necessary."

The six questions of this category are all the same motion:

> Time produces events. Events wake situations. Situations re-enter the decision loop. The loop decides next behaviour with the latest state.

## The central model

**Every relevant moment in time is a trigger in the durable wait infrastructure.** Whether it is a deadline, a scheduled start, an automatic end of waiting, or the check-in that rediscovers forgotten work, they are all dates, fires, wakes the situation, and re-runs the loop.

The representation is the shared spine from Coordination: a wait has a subject, a reason, a timing class, a resume trigger, a release policy, an escalation path and visibility. The canonical definition lives in [../coordination/how_do_we_represent_work_that_is_waiting.md](../coordination/how_do_we_represent_work_that_is_waiting.md). Time is the side that computes when waits fire; Coordination is the bookkeeping side that keeps the book of waits consistent.

## The questions and where the answers live

- [How should Tend react when time changes the situation?](how_should_tend_react_when_time_changes_the_situation.md)
- [How should deadlines influence decisions?](how_should_deadlines_influence_decisions.md)
- [How should scheduled work begin?](how_should_scheduled_work_begin.md)
- [How should waiting be represented?](how_should_waiting_be_represented.md)
- [When should waiting end automatically?](when_should_waiting_end_automatically.md)
- [How should forgotten work be rediscovered?](how_should_forgotten_work_be_rediscovered.md)

## What the earlier categories contributed

- **Coordination**: the situation record, the book of waits, and the states running/waiting/blocked/completed ([understanding_all_coordination_questions.md](../coordination/understanding_all_coordination_questions.md)).
- **Decision Making**: "wait" is a decision intention; "waiting" is an operational state; deterministic system behaviour owns timers and watchers ([understanding_all_decision_making_questions.md](../decision_making/understanding_all_decision_making_questions.md)).
- **Human Collaboration**: deadlines feed the escalation path; escalation may change urgency, owner or routing ([understanding_all_human_collaboration_questions.md](../human_collaboration/understanding_all_human_collaboration_questions.md)).
- **Communication**: the interim message is a communication act; Time only decides the deadline the message is bound to ([understanding_all_communication_questions.md](../communication/understanding_all_communication_questions.md)).
- **Memory and Knowledge**: stale information and "latest known state" — a wait that fires must use current state, not the old one.

## What this category does not decide

Time does not:

- perform the communication (that is Communication);
- decide who is the right escalation target (that is Human Collaboration);
- decide whether an action is allowed (that is Authority and Ownership);
- decide what the business should ultimately do (that is the business's responsibility);
- or own retry/compensate rules for a failed action (that is Failure).

## The internal and customer clocks

Every wait that might outlive the conversation gets two clocks:

- **Customer clock**: about the response promise. If a moment arrives and the wait cannot complete, we satisfy the promise with an interim message and the customer clock pauses.
- **Internal clock**: about the resolution promise and escalation. It keeps running even while the customer is released. Our escalation model ([escalation_sla.md](../../research/escalation_sla.md)) shows real ops teams warn at ~50% SLA and escalate at 100%.

## Remaining open

- Default check-in length and default release-policy values (business configuration, Level 3 research).
- Whether "watch" needs its own durable watcher record.
- How a scheduled meeting or appointment maps onto the wait model (this connects to the future Meetings and Human Work category).

## Related documents

- The conversation record: [time_conversation_and_discoveries.md](time_conversation_and_discoveries.md)
- The canonical wait spine: [../coordination/how_do_we_represent_work_that_is_waiting.md](../coordination/how_do_we_represent_work_that_is_waiting.md)
- Business journeys map (the real waits worth representing): [business_journeys_map.md](../../research/business_journeys_map.md)