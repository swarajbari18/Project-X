# How should forgotten work be rediscovered?

## The short answer

By construction, forgotten work does not exist. Every waiting situation carries a situation-level check-in: a time wait that fires even if nothing else happens. When it fires, the loop wakes and re-decides. The check-in is removed the moment the situation completes, so completed work is never woken again.

## Our answer

The problem "work silently forgotten in a corner" is solved with one rule:

> Every situation, while it is in a waiting state, records a next check-in time. That check-in is longer than the event-based waits inside it. When it fires, the situation re-enters the loop whether or not any actor responded.

This is a Snooze / follow-up pattern (Gmail snooze, Linear reminders, ops SLA). We adopted it after the conversation pointed out it must be situation-level, not per-tool. A tool wait that resolves in 200ms does not earn a check-in; the situation's waiting state does.

## Why a situation-level check-in is the right shape

- **Longer than the events.** A partner wait of "2 days" built a situation check of "2 days + a breathing room". Four of five tools return; the situation keeps waiting; the check-in is there when the fifth one is slow.
- **Removable on completion.** Once resolved and closed, the check-in is removed from the book. The loop never revisits a closed card (the Kanban closure rule from [how_do_we_recover_interrupted_work.md](../coordination/how_do_we_recover_interrupted_work.md)).
- **Independent of "every tool has a timer".** Not per-tool — per-situation. One check-in per waiting situation keeps the timer book small and explainable.

## What happens when the check-in fires

The loop:

1. sees the latest state (which tools are still open, what the customer last heard);
2. re-decides with the release policy and escalation rules: keep waiting, remind a person, remind the partner, escalate, or surface to the owner;
3. if it preserves waiting, it schedules the next check-in.

So "forgot work" cannot appear, because there is always a future moment to wake it. "Lost work" also cannot appear, because the situation record, not a temporary process, holds the truth.

## Example

A stuck delivery wait with a partner escalation: the customer was released with an interim note at the 5-minute mark. The check-in (say +12h) forces the loop to re-evaluate the partner's still-open wait, and where, in its policy, escalates to another contact or to the owner. Without the check-in, the situation could sit for the partner to never answer.

## Related

- [when_should_waiting_end_automatically.md](when_should_waiting_end_automatically.md)
- [how_do_we_coordinate_long_running_work.md](../coordination/how_do_we_coordinate_long_running_work.md)
- Escalation SLA behaviour this relies on: [escalation_sla.md](../../research/escalation_sla.md)