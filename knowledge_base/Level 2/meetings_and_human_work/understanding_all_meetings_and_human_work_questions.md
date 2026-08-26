# Understanding all the Meetings and Human Work questions

## Status

Working decisions recorded. The conceptual spine is settled. The exact numbers (floor thresholds, expiration periods, exception rules) and the granular meeting-type taxonomy are business configuration and later research, as every earlier category left its knobs.

This is the map for the Meetings and Human Work category. The conversation record is [`meetings_and_human_work_conversation_and_discoveries.md`](meetings_and_human_work_conversation_and_discoveries.md).

## Why this category exists

Meetings are where a human's time is reserved for a specific person. Getting it wrong has two opposite costs: a person who wants to move forward is blocked, or a human's time is silently wasted by someone who never keeps the meeting.

The category cares about choosing who meets, gathering each person's real intent, booking inside that intent, and keeping the whole thing honest when a meeting is cancelled, missed, or rescheduled.

## The spine, in plain words

> **A meeting is the decision to invite a person, then a wait whose subject is one or more people and a date. It books inside each participant's expressed intent, it fails as recorded meeting events, and its outcome creates the next human work.**

A real meeting slot is:

```text
eligibility  ∩  calendared availability  ∩  every participant's expressed intent
```

- **eligibility** — who may take this meeting at all (business rules, role, skill, meeting type);
- **calendared availability** — what time zones, hours, overrides and exceptions say a slot could exist;
- **intent** — each person's own declaration that they will accept here. Never guessed; asked.

## The six Level 1 questions and where each answer lives

1. **Which person is suitable for a meeting?** — Reuse Human Collaboration's "right person", add a meeting-type filter: eligibility = role + skill + meeting type + business rules, and the booking must fit the person's expressed intent. See [`how_should_tend_decide_which_person_is_suitable_for_a_meeting.md`](how_should_tend_decide_which_person_is_suitable_for_a_meeting.md).

2. **Availability, preferences, meeting type, and business rules together?** — Intent over confirmation, as the intersection above. Stored, expiring, override-able preferences. Meeting type sets the default posture (absolute-and-inform for routine, check-in for decision points). Business rules stay in control. See [`how_should_employee_availability_preferences_meeting_type_and_business_rules_work_together.md`](how_should_employee_availability_preferences_meeting_type_and_business_rules_work_together.md).

3. **Cancelled, missed, or rescheduled?** — The wait ends by a failed resume trigger; each is recorded as a meeting event; the story counter and person counter react. See [`how_should_tend_handle_a_meeting_that_is_cancelled_missed_or_rescheduled.md`](how_should_tend_handle_a_meeting_that_is_cancelled_missed_or_rescheduled.md) and the bridge [`the_meeting_as_a_wait_spine_bridge.md`](the_meeting_as_a_wait_spine_bridge.md).

4. **Who owns the next step after a meeting?** — The meeting's outcome is human work with one responsible owner, same as Human Collaboration. Bought / wants time / follow-ups decide the next action. See [`how_does_tend_represent_who_is_responsible_for_the_next_step_after_a_meeting.md`](how_does_tend_represent_who_is_responsible_for_the_next_step_after_a_meeting.md).

5. **Escalate work when a person does not act?** — Reuse the escalation model plus the two counters. The person-level floor escalates to a senior with the full report; the meeting chain is terminal; the senior's own inaction still surfaces through the owner / Failure machinery. See [`how_should_tend_escalate_work_when_a_person_does_not_act.md`](how_should_tend_escalate_work_when_a_person_does_not_act.md).

6. **External partner contacted when the business has not acted?** — Reuse the "contact an external partner" escalation effect and its information-scoping; the partner case uses the same availability-and-intent shape as any meeting, and the trigger is the escalation. See [`how_should_an_external_partner_be_contacted_when_the_business_has_not_acted.md`](how_should_an_external_partner_be_contacted_when_the_business_has_not_acted.md).

## What the earlier categories contributed

- **Human Collaboration** — the correct responsibility person, one owner per human work item, escalation and its effects.
- **Coordination / Time** — the wait spine: subject, reason, timing class, resume trigger, release policy, escalation path, visibility; waiting ends only by a resume trigger.
- **Understanding the Situation** — one situation is one story; the person is derived from the situation graph, not a stored record.
- **Authority and Ownership / Communication / Business View and Observation** — who may do it, how it is expressed, what the owner sees.

## What this category does not decide

- Channel transport, initiate rules, consent (Channels and Permissions, Compliance & Security).
- Scheduling providers, calendar APIs, the concrete rule engine (Level 3).
- Who holds each approval, exact grant boundaries (Authority and Ownership).
- The per-situation owner snapshot (Business View and Observation).
- The exact floor numbers, expiration periods, and exception / waiver lists (business configuration and later research).

## Related

- The spine bridge: [`the_meeting_as_a_wait_spine_bridge.md`](the_meeting_as_a_wait_spine_bridge.md)
- The canonical wait spine (Coordination): [`../coordination/how_do_we_represent_work_that_is_waiting.md`](../coordination/how_do_we_represent_work_that_is_waiting.md)
- No-response and escalation (Human Collaboration): [`../human_collaboration/what_happens_when_nobody_responds.md`](../human_collaboration/what_happens_when_nobody_responds.md)
- The meeting scheduling / feedback research: [`../../research/findings_scheduling_feedback.md`](../../research/findings_scheduling_feedback.md)