# How do we know that a piece of work is still active?

## Words used in this file

- **Situation:** one unit of work with its own stored record. For example, one customer's conversation.
- **Situation worker:** the part that decides a situation's next step and writes what Tend knows about it.
- **Conversation manager:** the whole system that reacts to a new message or a change. It contains the situation worker and the communication layer. Tools are outside it.
- **Check-in:** the one periodic check for each situation. It is the backstop when a change is lost.
- **Blocking condition:** the named thing that must clear before the work can move.

## The short answer

A situation is active if it is running, waiting, or blocked. Completed means it is no longer active. Nothing can be active silently. Every running situation is doing work now. Every waiting situation has a named event it waits for, or a check-in that will wake it. Every blocked situation has a named reason and stays visible.

## The four states

- **Running**: the situation is doing something now, such as reasoning, deciding, or gathering information.
- **Waiting**: active but suspended. It is waiting on tools, third parties, or an escalation. It has a reason and a resume trigger. Whether the customer is told is decided by relevance: the conversation manager decides whether the update is worth telling.
- **Blocked**: has a named reason. There is no one left to escalate to and no safe next step. It does not move on its own. It stays visible until its blocking condition goes. The business owner sees it as a decision only the owner can make. When the business stops it, the conversation manager sets completed, and the reason is shown.
- **Completed**: resolved and closed. Only the conversation manager sets it, after no wait is open and the last message has gone out. It is reopened only when the closure was wrong. A closure is wrong when the same problem was resolved too early, or the same problem came back. A different problem is a new situation. The same record is then marked reopened (see [how_do_we_recover_interrupted_work.md](how_do_we_recover_interrupted_work.md)).

## Who may change a state

| Change | Who makes it |
|---|---|
| Running to waiting | The situation worker. It writes the wait record. |
| Waiting to running | The situation worker, when a resume trigger fires. A time trigger wakes the situation worker. |
| Running or waiting to blocked | The situation worker, when no one is left to escalate to and no safe next step is left. |
| Blocked to running or waiting | The situation worker, when the blocking condition has gone, or a person answers. |
| Blocked to completed | The conversation manager, when the business stops the situation. The reason is shown. |
| Running to completed | The conversation manager, after no wait is open and the last message has gone out. The worker cannot set completed. |
| Waiting to completed | The conversation manager, after the worker records the work as resolved, no wait is open, and the last message has gone out. |
| Completed to running | The situation worker, and only when the closure was wrong. The same record is marked reopened. |

**Decision:** the conversation manager never sets waiting or blocked. It is the only part that sets completed.

## What "still active" means

The word "still" is the key. It asks: will this keep moving over time?

Storage keeps a situation findable. It does not make the situation active. A situation is active when it is running, waiting, or blocked. Work held only in the reasoning of one run is lost when that run ends. Work in the situation record and in the open waits can be re-entered, re-run, and re-decided at any moment.

So a situation can be found and resumed later, because:

- the situation record is durable and indexed;
- the open waits are recorded;
- the check-in is set up (see [how_do_we_represent_work_that_is_waiting.md](how_do_we_represent_work_that_is_waiting.md) for the timeline and [Time](../time/understanding_all_time_questions.md) for the looping). Each business sets its check-in interval in configuration. The design fixes no interval.

## Blocked is not waiting, and waiting is not resolved

Blocked situations are not waiting. They have no check-in and no resume trigger. They move only when their blocking condition goes, or a person answers. A running or waiting situation is not resolved until the worker decides it is resolved.

## Related

- [How do we represent work that is blocked?](how_do_we_represent_work_that_is_blocked.md) — the boundary where waiting ends and blocked begins.
- [When should waiting end automatically?](../time/when_should_waiting_end_automatically.md) — the triggers that wake a waiting situation, so its worker decides the next step.
