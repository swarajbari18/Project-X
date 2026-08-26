# How should Tend decide which person is suitable for a meeting?

## Where this question came from

The Level 1 backlog asks how Tend chooses the right person for a meeting. Human Collaboration already answered the general version: the "correct person" is really the "correct responsibility target", determined by role, authority, expertise, relationship, availability, workload, urgency, language, business rules — never just the person nearest the message. This question is that general answer, with a meeting-type filter added.

Product Vision is explicit: "An employee may have a free calendar yet still be genuinely busy. Different employees take different kinds of calls. One person takes sales calls, another takes support calls, another takes onboarding calls. One prefers mornings, another will not take a call on a weekend."

## Our current answer

Tend decides who is suitable for a meeting as two separate questions, both must pass:

**Eligibility — who may take this meeting at all.** This is a business-rules filter over the person's role, skill and permitted meeting types. A support employee is not offered to someone who wants to make a purchase decision. It is answered deterministically by configuration (rules first), not by the reasoning model guessing.

**Availability-and-intent — who is genuinely open and willing.** The employee must be within their expressed intent window for this meeting type (a stored, expiring preference, see the availability question). "Free on the calendar" is necessary but not sufficient; the person must have declared they will take it.

Where the reasoning model can help: when several eligible people exist, it can weigh relevance. But it never decides eligibility or invents intent — those are deterministic configuration and the person's own words.

## The two things that must both be true

```text
eligible person   ∩   calendar says possible   ∩   person declared intent
```

If only one employee is eligible and available, there is no choice to reason about — book it (inside their intent, with the inform/override rule). If several are eligible, the meeting type and business rules pick, and the reasoning model may rank the softer fit (who the customer relates to most).

## Multi-person meetings

When a meeting needs people from more than one department, eligibility is run per participant, and the booking must fit **every** participant's expressed intent. There is no single "right person" — there is a set of right people whose intent windows overlap.

## What this question does not settle

- The exact meeting-type names and their business-configured eligibility (that taxonomy is configuration and later research).
- Channel/transport details of how the invite is sent (Channels, Level 3).
- The exact booking algorithm (Level 3).

## Working decision

Suitability = a deterministic eligibility filter (role + skill + meeting type) that may be refined by the reasoning model, intersected with the person's calendared availability and expressed intent. The goal is the person who can safely take this kind of call and has agreed to be there — not the nearest or most famous person.