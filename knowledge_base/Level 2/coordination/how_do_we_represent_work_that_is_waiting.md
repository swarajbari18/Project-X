# How do we represent work that is waiting?

## The short answer

Waiting is a decision to suspend a situation because the next safe step needs something we do not yet have. It is represented as a named wait record with a subject, a reason, a timing class, a resume trigger, a release policy and an escalation path. This document is the canonical definition of a wait for both the Coordination and Time categories.

## The definition we agreed on

> A wait is a decision to suspend a situation because the next safe step needs something we do not yet have.

A wait is not "nothing happening." It is the opposite: the system has decided that the situation cannot move safely until some named thing occurs, and it has recorded exactly what that thing is.

## The three levels of waiting

Every wait happens at one of three levels:

### 1. Tool / operation wait

A single pending call: Tend asked one actor, system, or service something and that one operation has not returned yet.

The operation may be bounded (we know it answers within N) or unbounded (nobody knows; it can be one second or two days). For bounded calls the timeout behaviour is "error after the bound." For unbounded calls, a governing mechanism is needed.

Whether a call is pending long enough to need a real recorded wait is decided per call, using the tool's contract and the current situation. The same tool can return instantly for one call and stay open for days on another.

### 2. Situation-level wait

The situation itself is suspended because one or more tool waits have not returned enough information yet.

Key property: the customer interaction can be released at this point. We sent the interim message, the customer knows what we are waiting on, and the situation stays active on the internal side. The wait is called by the situation because the subject of the wait is really the situation's own readiness.

### 3. Time / scheduled wait

The situation is parked until a moment on the calendar. No actor is being asked. We are waiting for a feedback window to close, a delivery due date, a deadline, or a scheduled check-in to start work.

This is the pure "Time" side of the batch.

## The timestamp and the resume trigger

Happy note: every wait must name **when** it can be woken. The exact set is:

- an actor replies (a tool returns a result, an employee answers, a partner responds);
- a state change fires a watcher;
- a date/time arrives (scheduled wait, deadline);
- the situation-level check-in fires.

## What a wait must record

1. **subject** — what or whom we are waiting on (a tool call, an actor's response, a state we watch, a calendar moment);
2. **reason** — what would change when it fires, what decision becomes possible;
3. **timing class** — bounded (with a known bound) versus open (nobody knows when), versus date-based;
4. **resume trigger** — the exact event or time that moves the situation back into the decision loop;
5. **release policy** — what we do if the customer cannot wait (interim message; the response promise/resolution promise split);
6. **escalation path** — what happens if it never fires (remind, change owner, escalate, notify the owner, block);
7. **visibility** — which actor sees it (customer sees the message; business sees a waiting badge with deadline).

## The kinds of wait subject

We checked whether there is a fourth kind of waiting that is not one of these. We concluded there is not.

- **Wait for an actor** — an agent, a human, a named person, a partner's tool, anyone we contacted. The wait ends when they answer (or their promise expires).
- **Wait for a state change** — this is "watch." We are not being contacted by anything; we are watching an external state and will notice when it changes (order moved, tracking updated, payment settled).
- **Wait for context / time** — a date, a deadline, a calendar moment, or the end of a waiting window.

"Wait" and "watch" are separate decision intentions in Decision Making. A wait for an actor is passive: somebody will contact us or we escalate. A watch is active in the sense that we are the ones noticing the change, not being notified by it.

## The response promise and the resolution promise

We borrowed this distinction from SLA practice (Zendesk's response SLA versus resolution SLA) and from Swaraj's five-minute-interim-message example.

- A **response promise** says: we will communicate something useful by this time, even if we are not done.
- A **resolution promise** says: we will actually finish by this time.

When a wait is opened:

- The customer-facing clock is about the response promise. If the wait might outlive the interaction, we satisfy the response promise with an interim message: "this is what we found, we are still waiting on X, we will revert."
- The internal clock is about the resolution promise. It keeps running, with its own deadlines, reminders and escalation, even after the customer has been released.

See the caution in [coordination_conversation_and_discoveries.md](coordination_conversation_and_discoveries.md): unlike typical consumer tools that pause all escalations while a ticket is on hold, Tend keeps the internal clock running. The customer is not left hanging on the fastest escalations; the responsible party is not silently excused.

## The tool layer versus the agent layer

The wait record lives in the durable system layer, not in the thinking context of the reasoning model. This is the deterministic system behaviour that Decision Making already assigned: "deterministic system behaviour creates and manages the state, timers, watchers, authorization checks, execution and timeout handling" ([understanding_all_decision_making_questions.md](../decision_making/understanding_all_decision_making_questions.md)).

Concretely: if a pending wait lived only in the model's context, it would die when that context ends. It could not be watched by timers, survive a crash, be shown to the owner, or be resumed by an event days later. So all waiting bookkeeping is system-owned and durable. Whether that is one dedicated service or a per-tool mini-service is a Level 3 decision; the Level 2 fact is that it lives outside the model's context.

## Related

- The Time category shares this definition: [how_should_waiting_be_represented.md](../time/how_should_waiting_be_represented.md).
- [When should waiting end automatically?](../time/when_should_waiting_end_automatically.md) — the trigger side.
- [How do we know a piece of work is still active?](how_do_we_know_a_piece_of_work_is_still_active.md) — where waiting sits in the state model.