# How do we recognise failure?

## Where this question comes from

Level 1 lists the failure world we live in: missing, conflicting and incorrect information; unavailable actors; authentication failures; rule violations; communication failures; business inaction; and unexpected situations. But just listing the mess does not tell us when the mess becomes a failure. This question decides the moment.

The product vision sets the posture: when Tend cannot decide safely it stops, explains why, and asks for help. But a stop is a strong move. If we stop on every blip we drag people in too soon. If we never stop we wait forever and our promise becomes a lie. So we need a clean rule for the moment a symptom turns into a decision.

## Our answer

A wait carries a bound. The bound is the thing that tells us whether waiting is still honest: a contract, an expected settle time, a deadline, or the situation's own check-in. Recognition is the crossing of that bound without resolution.

> A wait is recognised as a failure when its bound has been reached and it has not fired. The card records the wait as a declared outcome — success, terminal failure, transient failure, or unknown-outcome — with its evidence and its reason, into the audit.

Before the bound, a wait is uncertainty, not failure. The current path may still be usable; we keep waiting and investigating. The instant the bound is crossed with no resolution, the path is no longer usable, and the card must change course. That is the whole act of recognition: it is not a mood, and not a guess. It is a deterministic crossing of a recorded limit.

## What travels with the declaration

A recognised failure is never silent. It carries:

- which wait failed, and over what subject;
- the bound it crossed, and when;
- what the latest known state actually is; and
- the reason the path is no longer usable.

This survives in the audit. Recognition is not "done the moment the timer fires," it is "done the moment the fact is on the record." It does not count as handled if no one, or nothing, can see it later.

## What is decided, what is open

Decided: recognition is bound-crossing, deterministic, and recorded. There is no silent state.

Open: the actual bound lengths and check-in windows, which are business configuration and Level 3 research.

## Related

- Boundary with uncertainty: [how_do_we_distinguish_failure_from_uncertainty.md](how_do_we_distinguish_failure_from_uncertainty.md)
- The shared spine: [understanding_all_failure_questions.md](understanding_all_failure_questions.md)
- The waits this assumes: [how_do_we_represent_work_that_is_waiting.md](../coordination/how_do_we_represent_work_that_is_waiting.md)