# How should waiting for a meeting, a delivery, a payment, a repair, or a feedback date be represented?

## The short answer

Reused from Coordination / Time — not rewritten here. The wait spine already models "waiting for a delivery, a payment, a repair, a meeting, a feedback date" as cases of the same three-level wait record.

## The existing decision (reuse)

Coordination and Time already decide:

- A wait is a decision to suspend a situation because the next safe step needs something we do not yet have.
- There are three levels: **tool/operation wait**, **situation-level wait**, and **time/scheduled wait**.
- There are three kinds of wait subject: **wait-for-actor** (a person/agent/partner answers), **wait-for-state-change / watch** (we notice an external change), **wait-for-context / time** (a date, deadline, or end of a window).
- A wait must record: subject, reason, timing class, resume trigger, release policy, escalation path, visibility.
- Waiting ends only by a resume trigger — never silently.

The Level 1 examples for this category are the same examples the spine already uses (a delivery due date, a payment settling, a feedback window, a scheduled meeting, a repair).

## Why this category does not re-write it

Journey and Lifecycle cares about the person and the journey across situations. *How a specific wait is represented* is Coordination's and Time's job. Reusing keeps one wait definition in the system rather than two copies.

## Related

- The canonical spine: [`how_do_we_represent_work_that_is_waiting.md`](../coordination/how_do_we_represent_work_that_is_waiting.md)
- The Time side: [`how_should_waiting_be_represented.md`](../time/how_should_waiting_be_represented.md) and [`when_should_waiting_end_automatically.md`](../time/when_should_waiting_end_automatically.md)