# How should Tend handle a meeting that is cancelled, missed, or rescheduled?

## Where this question came from

Level 1 asks how Tend handles a meeting that is cancelled, missed, or rescheduled. The research flagged this as a genuine gap: who follows up, when, and how supply and no-shows are handled.

## The correction that shaped the answer

Before solving, we put the meeting on our own spine. A meeting is not a separate thing with its own failure rules — it is a **wait whose subject is people and a date** (see the spine bridge). So a cancellation, a miss, or a reschedule is not three different phenomena. In each case the wait ends without the meeting happening, and each records a **meeting event**.

## The meeting event

Every time a booked meeting does not happen — cancelled, missed (no-show), or rescheduled — that is one recorded meeting event on the situation, carrying why (from the person), when, and whether a real slot of human attention would have been consumed.

The research separated the three honestly, and we kept that:

- **Missed (no-show)** — the employee held a reserved slot; the person never came. Human attention genuinely consumed. Highest cost.
- **Cancelled with reasonable notice** — the slot was released; no human's time was burned. Nearly zero cost.
- **Rescheduled politely** — released and reallocated. Nearly zero cost.

So we do **not** grade every event the same. The event is recorded the same way (so the counters can count), but its consequence differs, and the counters are about the *repeated* pattern, not a single unlucky day.

## The two counters (both derived, no new record)

The scarce thing being wasted is a human's reserved attention, so the counter is an anti-waste guard — but it must not be cruel to someone with a genuine run of bad luck. Research: first misses are usually not repeat behaviour; consecutive counts are fairer than total lifetime counts; documented emergencies waive a count; the policy must be consistent and public.

We keep two counters, both computed from the same meeting events:

- **Story counter** — meeting events within one situation. Response is quiet and local: when it passes a low floor, the person must express intent again before the next booking in that story. It stops a re-planning rut from silently burning slots. It blocks no one.
- **Person counter** — the wasted-attention pattern accumulated across the person's situations. This is the real guard. When it crosses its floor, routine booking is set aside: the person is told the limit is exhausted, and a senior with the full history gets the report. (See the escalation question.)

## The floor is a routing change, never a rejection

Neither floor is a silent "no". The person counter's floor is a change of routing to a person who can judge. It never abandons anyone; it ends the silent waste of a human's time. A documented emergency waives a counted event, and the waiver is recorded so it is auditable.

## Why we kept the story counter too

The research products put the counter on the person because they have no situation-stories. We do have the situation graph, and Swaraj's real-life case was a single story being re-planned many times. So the story counter catches the within-one-story rut (quiet, re-intent) and the person counter catches the across-stories pattern (escalate to a senior). Both derive from the same events; nothing new is stored.

## What this question does not settle

- The exact floor numbers (product default ~3, consecutive, first-miss-waived; real value is configuration).
- The exact list of emergency/exception waivers.
- The rescheduling mechanics (Level 3).

## Working decision

A cancelled, missed, or rescheduled meeting is a failed wait recorded as a meeting event. Two derived counters guard human attention: a story counter that quietly demands fresh intent before the next booking, and a person counter that, past its floor, routes to a senior with the full history. The floor is always a change of routing, never a silent rejection, and waivers keep it fair.