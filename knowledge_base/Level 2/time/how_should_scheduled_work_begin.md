# How should scheduled work begin?

## The short answer

Scheduled work begins as a time wait: a date is recorded as the resume trigger of a wait, and when that date fires, the situation wakes and the loop runs the scheduled behaviour. Nothing runs "in the background forever"; everything is a wait with a due moment.

## Our answer

Scheduled work is not a different kind of work. It is work whose resume trigger is a calendar moment.

- A feedback window of two weeks ends → time wait fires → loop runs the feedback behaviour.
- A delivery is due Friday → due-date wait → loop checks the delivery state when Friday arrives and decides next behaviour.
- A prospect "wants time to think" with a follow-up date → the follow-up date is a time wait.
- A recurring internal check (e.g. "review stuck orders every morning") is the same record, repeating.

The business journeys that make this concrete are enumerated in [business_journeys_map.md](../../research/business_journeys_map.md).

## How scheduling is represented

The wait record carries the resume trigger "at time T". When T arrives, the wait fires, the situation re-enters the loop, and the loop:

1. reads the latest state (including the midpoint of the wait);
2. decides the scheduled behaviour (remind, escalate, close, or continue);
3. creates the next wait if the work still needs a further moment.

Scheduled starts are therefore never silently dropped, and never repeat blindly. If the state has changed (the delivery arrived early), the loop does not send the unneeded reminder — it decides with the latest state.

## Example

Research on feedback timing ([research/findings_scheduling_feedback.md](../../research/findings_scheduling_feedback.md)) gives real defaults: consumable/digital 7–14 days, apparel 30 days, premium/subscription 45–60 days. These are business-configured defaults. When the window ends, the loop enforces it.

## Related

- [How should Tend react when time changes the situation?](how_should_tend_react_when_time_changes_the_situation.md)
- [When should waiting end automatically?](when_should_waiting_end_automatically.md)