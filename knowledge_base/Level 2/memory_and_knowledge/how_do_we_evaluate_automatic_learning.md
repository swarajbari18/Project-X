# How do we evaluate automatic learning?
## Note added 2026-09-04 — golden scenarios are the replay vehicle for these measures

The four measures below (repeated-mistake rate, stale-memory use, policy conflicts, replay regressions) are now wired to the golden-scenario set as replay assertions (study file Part 12 §12.5). Each measure is a structured count over a scenario replayed before and after a learning change — never a model-generated number. The scenario set (nine families from the Level 1 failure classes, instance template, expected-refusal cases) is the vehicle that makes these measures testable.

## Status

Answered — working decision, pending review.

## Automatic does not mean unobserved

The business does not need to approve every learning instance by default.

Tend still needs to observe whether automatic learning helped or harmed future work.

The question is not whether a memory sounds reasonable.

The question is:

> Did this learning improve the next behaviour without creating new failures?

## What should be evaluated

Evaluation should look for:

- fewer repeated tool errors;
- fewer repeated misunderstandings;
- fewer unnecessary questions;
- better source selection;
- fewer stale-memory uses;
- fewer policy or authority conflicts;
- correct use of current information;
- reduced human correction; and

no increase in unsafe or irreversible mistakes.

## Replay and regression

The experience history can provide replay cases.

Before and after a learning change, Tend can compare how it handles:

- the original failed situation;
- similar situations;
- situations where the lesson should not apply; and
- situations where a formal rule conflicts with the learned guidance.

The last comparison is important. A lesson that prevents one failure by blocking valid work is not automatically an improvement.

## Automatic mode and manual mode

In automatic mode, evaluation observes and reports the effect after activation.

In manual mode, evaluation may be part of the approval process before activation.

In learning-off mode, traces remain available for product evaluation, but learned memory does not affect future behaviour.

## Learning must be reversible

If a lesson causes regressions, Tend must be able to:

- stop retrieving it;
- mark it stale or rejected;
- restore the previous version;
- identify the situations it influenced; and

explain the change.

## Working decision

Automatic learning is evaluated through traceability, replay, regression, outcome monitoring and reversible activation.

Human approval is optional. Observability and the ability to correct learning are not optional.
