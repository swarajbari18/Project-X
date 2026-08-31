# How do we coordinate long-running work?

## The short answer

Long-running work is one situation that keeps re-entering the decision loop over time. It does not run as one continuous process. It runs as a durable record whose waits, results and versions accumulate, and whose situation-level check-in keeps it alive between entries. The situation can be woken by an external event without a person reopening a chat.

## Our answer

A long-running situation is the same object as any other situation. What makes it long-running is that the wait between the current interaction and the next one is long: the partner investigates for two days, the prospect thinks for a week, the delivery arrives on Friday or an external agent returns a lead-enrichment result tomorrow.

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

## Example: a lead list with independent waits

An employee gives Tend a list of thirty people and asks it to introduce a product. Tend creates thirty situations. One person replies immediately, one asks for a technical answer from an employee, one asks for a meeting, one is scheduled for a follow-up next week and one produces a result from an external enrichment agent.

Each situation has its own wait, owner, next event and next behaviour. The employee sees an aggregate assignment artifact and can open any individual storyline. They do not need to keep thirty chats open, and Tend does not wait for the whole list before continuing one person's situation.

## The boundary convention with Time

Coordination explains how the wait record stays alive. Time explains when and why anything fires in the gap. Both are needed to describe a long-running situation:
[how_should_tend_react_when_time_changes_the_situation.md](../time/how_should_tend_react_when_time_changes_the_situation.md).
