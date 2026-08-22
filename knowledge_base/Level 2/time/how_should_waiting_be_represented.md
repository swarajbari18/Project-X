# How should waiting be represented?

## The short answer

Waiting is represented exactly the way Coordination represents it, and this document is the Time half of that shared spine. A wait is a decision to suspend a situation because the next safe step needs something we do not yet have.

## Our answer

The full definition and the three levels (tool/operation wait, situation wait, time/scheduled wait) live in the canonical document:

**[how_do_we_represent_work_that_is_waiting.md](../coordination/how_do_we_represent_work_that_is_waiting.md)**

Everything there applies here. The Time category adds the timing-class field prominently:

- **bounded** waits: there is a known bound on response time; a timeout is an error;
- **open** waits: nobody knows the answer time; needs governing via release policy and check-in;
- **date-based** waits: the resume trigger is a calendar moment, not an actor.

## What is different on the Time side

- A **time wait** has no actor to contact. It parks the situation until a moment, and that moment is its only resume trigger (besides the check-in).
- The **release policy** gets decided here more often: a time wait may be long (a feedback window), so the customer doesn't need an interim message for every one — the config decides when the release policy applies.
- The **check-in** is always longer than the open wait.

## One representation, two owners

Coordination keeps the book of waits consistent. Time computes when they fire. There is exactly one shape of wait — the record with subject, reason, timing class, resume trigger, release policy, escalation and visibility. We deliberately do not maintain two different "wait" models in two categories.

## Related

- [When should waiting end automatically?](when_should_waiting_end_automatically.md)
- [How should forgotten work be rediscovered?](how_should_forgotten_work_be_rediscovered.md)