# How do we coordinate long-running work?

## The short answer

Long-running work is one situation that keeps re-entering the decision loop over time. It does not run as one continuous process. It runs as a durable record whose waits, results and versions accumulate, and whose situation-level check-in keeps it alive between entries.

## Our answer

A long-running situation is the same object as any other situation. What makes it long-running is that the wait between the current interaction and the next one is long: the partner investigates for two days, the prospect thinks for a week, the delivery arrives on Friday.

It stays coordinated because:

1. **Every result lands on the situation record.** Nothing is held in a ephemeral thinking context that could disappear.
2. **Every open wait is a named record** with a reason, a resume trigger and an owner/excalation path (see [how_do_we_represent_work_that_is_waiting.md](how_do_we_represent_work_that_is_waiting.md)).
3. **The situation-level check-in** wakes the situation on a schedule even if nothing else happens. This is what prevents the long gap from becoming a forgotten gap. The check-in is explained in [how_do_we_recover_interrupted_work.md](how_do_we_recover_interrupted_work.md) and on the Time side in [how_should_forgotten_work_be_rediscovered.md](../time/how_should_forgotten_work_be_rediscovered.md).

## What actually happens between the entries

```text
Entry 1: situation is created, decision loop runs, asks partner, wait opened
        ↓
        (days pass — nothing runs, the record simply waits)
        ↓
        wake — partner's answer arrived, or check-in fired
        ↓
Entry 2: decision loop re-runs with the latest state
```

The system does not keep the conversation running during the gap. The system keeps the record durable and makes liveness proof of the check-in.

## The boundary convention with Time

Coordination explains how the wait record stays alive. Time explains when and why anything fires in the gap. Both are needed to describe a long-running situation:
[how_should_tend_react_when_time_changes_the_situation.md](../time/how_should_tend_react_when_time_changes_the_situation.md).