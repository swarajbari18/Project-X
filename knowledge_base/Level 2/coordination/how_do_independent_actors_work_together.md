# How do independent actors work together?

## The short answer

Actors never interact directly. They interact through the situation model, which is the shared coordination record for one operational problem. Actors land their results on that record, waits connect the actors that are far apart in time, and the decision loop is the point where the actors' results are actually combined.

## Our answer

Each actor owns its work. An employee answers, a business system returns a claim, a partner investigates, Tend gathers and decides. None of them talks to another directly through some separate pipe. Everything lands on the situation model as a new version of the situation state.

The actors are connected by two things:

1. The situation model, which holds the current complete understanding of the problem (see [relationship_between_understanding_and_gathering_information.md](../gathering_information/relationship_between_understanding_and_gathering_information.md)).
2. The waits that exist between an ask and an answer. When an actor is slow, the record makes that wait visible and gives it a reason and a resume trigger.

## How the interaction actually flows

```text
Situation model (current version)
        ↓
Decision Making selects next behaviour (ask partner, ask employee, wait, communicate…)
        ↓
An actor is reached, the ask is recorded, a wait is opened
        ↓
The actor acts at their own pace
        ↓
The result lands on the situation record as a new claim
        ↓
The loop re-runs with the latest state
```

Nothing waits on a global clock for "everyone to finish." A result is used when it arrives, if it is relevant and authoritative. The hierarchy of the truth decides which ask matters most: ask the source closest to authority first, and fall back to a lower authority only if that fails. This is the source-authority idea from [Trust and Evidence](../trust_and_evidence/understanding_all_trust_and_evidence_questions.md).

## Two things that keep actors safe together

- **Independence**: work on one situation does not block work on another. Two situations sitting side by side in the graph do not share a process lock.
- **Traceability**: every result shows which actor produced it and when. This is what makes conflict resolution and "always work with the latest known state" possible (see [Trust and Evidence's conflict handling](../trust_and_evidence/how_do_we_identify_conflicting_information.md)).

## Related questions

- [How do multiple business processes interact?](how_do_multiple_business_processes_interact.md) — the interaction across processes, not just across actors.
- [How do we represent work that is waiting?](how_do_we_represent_work_that_is_waiting.md) — the record that connects an actor who asked to the actor who is answering later.