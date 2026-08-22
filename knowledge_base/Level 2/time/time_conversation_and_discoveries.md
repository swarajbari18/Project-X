# Conversation with Swaraj about Time

## Why this document exists

This is a conversation record, not a formal specification.

It preserves how we understood Time together with Coordination as one shared batch, the corrections that shaped the model, and the parts still open.

The shared spine with Coordination — the definition of a wait — lives in [how_do_we_represent_work_that_is_waiting.md](../coordination/how_do_we_represent_work_that_is_waiting.md). This file records how the Time half of that reasoning happened.

## What we were trying to understand

Time is the actor that changes the business environment without anyone deciding anything. Deadlines pass. Deliveries become due. Appointments begin. Policies expire. Scheduled work starts. Waiting windows end.

The Level 1 Time questions are:

- How should Tend react when time changes the situation?
- How should deadlines influence decisions?
- How should scheduled work begin?
- How should waiting be represented?
- When should waiting end automatically?
- How should forgotten work be rediscovered?

Our insight: all six are the same motion. Time creates events, events wake situations, situations re-enter the decision loop, and the loop decides the next behaviour using the latest state.

## The raw thought that shaped the model

The whole batch began with Swaraj's raw transcription. He described a partner agent taking an unknown time to answer, the customer not being able to wait beyond a five-minute cutoff, and the interim message:

> "Here is what we have done. We are still waiting for these people. Once they happen, we will reach out to you with the latest information."

Two things were correct and central:

1. The situation does **not** end when the interim message is sent. It stays active. The waits are still open and the loop must resume when they resolve.
2. The cut-off belongs to the response promise, not the resolution promise. We borrowed the terms from Zendesk: response SLA (first meaningful reply) versus resolution SLA (fully done).

## The corrections we made together

### Every call waits — the visible-wait boundary is the customer interaction

Swaraj at first distinguished "tools where the response time is a fixed integer — no waiting needed" from "tools where time is unknown — waiting needed." We corrected this: every call waits, even a fast one. The difference is whether the wait outlives the current interaction with the customer. If it does, it becomes visible state that needs representation and a wake-up.

### "Waits" are not a property of the tool

The same endpoint can return in 200ms for one request and take three days for another. Whether a recorded wait is needed is decided per call from the tool's contract plus the situation.

### The resume is "enough", not "all"

Swaraj corrected my example: we do not call partner and DB in parallel. There is a hierarchy of the truth. If the partner's API is closer to the source of authority, call it first and fall back to the DB only on failure. So a resumed loop may have plenty, in the authoritative result that arrived — not after every pending call returned.

### The release policy is configurable but has defaults

The five-minute cutoff is an example of a business-configurable release policy with product defaults. We decided the policy itself is a configuration setting per business; the default values are product defaults; the behaviour — "waters the customer as soon as possible, with a status, and promises a revert when the wait ends" — is universal.

### Check-in belongs to the situation, not to each tool

Swar said: "the check-in should be on the situation when it is in wait mode, not every tool." A tool wait that resolves in 200ms should not impose a check-in. The situation that is waiting should carry the check-in.

The check-in is usually longer than the event-based waits inside it. It can be removed when the situation completes. Once removed, it never fires again.

### Active/waiting/blocked/completed

Recorded in detail in the Coordination category: running means working now; waiting is active-with-reason; blocked is after-escalation-spent; completed is resolved-and-closed. Time's waiting is just waiting-with-a-date-or-a-state-change.

## What the product research showed

Three sources described the same pattern we were building:

- **Zendesk** (https://support.zendesk.com/hc/en-us/articles/4408832852122-Viewing-and-understanding-SLA-targets): SLA targets are active, paused, breached or closed; pending tickets pause requester-wait time; response SLA and resolution SLA are different promises.
- **Zoho Desk** (https://help.zoho.com/portal/en/kb/desk/ticket-management/ticket-status/articles/understanding-the-onhold-ticket-state): an On Hold state exists for "waiting on third party", pausing timers and escalations.
- **Raiseaticket** (https://help.raiseaticket.com/faq/how-do-i-pause-or-stop-the-sla-timer-on-a-ticket): the same pause-on-pending behaviour.

The distinction, and the caution:

- Zendesk's response-vs-resolution split became our release-policy; it is also used in [how_do_we_represent_work_that_is_waiting.md](../coordination/how_do_we_represent_work_that_is_waiting.md).
- Zoho's On Hold pauses the *whole* SLA machine. We decided not to copy that for internal waits: the customer-facing clock pauses (the customer is released), but the internal clock on the responsible party keeps running with its own escalation. Waiting for a partner must not excuse the partner. This is grounded in our own [escalation_sla.md](../../research/escalation_sla.md).

## The decision loop time is part of the same model

Time does not run a separate clock. Time produces change-events — a moment passes, a deadline fires, a check-in fires, an appointment begins — and every such event wakes its situation and re-enters the decision loop. This connects to the Deterministic system behaviour in [understanding_all_decision_making_questions.md](../decision_making/understanding_all_decision_making_questions.md): the deterministic layer owns the timers and watchers, the LLM proposes behaviour, and it is the time-event that yields it back into the loop for the next decision.

## Working decisions (detailed in the question documents)

- Time is an actor that changes the situation-state without any other actor acting.
- Time events wake situations; waking re-runs the decision loop with the latest known state.
- Deadlines influence decisions as time-context, feeding the release policy (response promise) and the internal resolution clock.
- Waiting is represented by the same spine as Coordination: subject, reason, timing class, resume trigger, release policy, escalation path, visibility. The canonical document is [how_do_we_represent_work_that_is_waiting.md](../coordination/how_do_we_represent_work_that_is_waiting.md).
- Waiting ends only through a resume trigger (actor replies, state changes, a date arrives, or the check-in fires). Never silently.
- Forgotten work is rediscovered by the situation-level check-in loop: longer than the event waits, removable on completion, effective forever against silent waiting.

## What remains provisional

- Default values for check-ins, timing class bounds, and release policy (business configuration; Level 3).
- The "watch" record — whether it reuses the wait record or needs a distinct watcher.

## Boundaries with other categories

- **Deadlines, and the response/release promise**: Time owns the deadline and the "will contact you by T" promise. Communication is the one that actually shapes the message.
- **Blocked**: the escalation-side of a situation is owned with Human Collaboration's escalation rules; blocked-and-stopped is sharing Failure and Coordination; Time's only role is when the block sits for a long time (re-open from the check-in).
- **Archive**: completed situations are not "alive" for the check-in; they are closed, per the Kanban closure rule recorded in [how_do_we_recover_interrupted_work.md](../coordination/how_do_we_recover_interrupted_work.md).