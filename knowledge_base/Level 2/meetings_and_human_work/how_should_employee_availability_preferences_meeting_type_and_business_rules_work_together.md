# How should employee availability, preferences, meeting type, and business rules work together?

## Where this question came from

Level 1 asks how availability, employee preferences, meeting type, and business rules combine to schedule a meeting. The naive answer is "pick a free slot." Both Product Vision and the research reject that. Product Vision: an employee may have a free calendar yet still be genuinely busy; preferences and meeting type choose who. The research: free-on-calendar is a free slot, but genuine availability is a live computation over layered, conflicting rules (hours, recurring exceptions, one-off overrides, holidays, time zones, location).

## The correction that shaped the answer

My first framing called the booking step "propose one slot, get a yes/no." Swaraj corrected it, and the correction is the heart of this question. The primitive is **intent, gathered once, then booked inside** — not a rolling yes/no.

Each person declares a standing intent up front ("for sales calls I take weekday mornings"). A meeting that sits inside that intent needs no further confirmation — the person already agreed back when they stated it. Confirmation only returns when a proposed meeting falls outside the declared intent, and then we gather new intent rather than guess.

This is why a multi-person meeting is not hard because it needs a yes/no from ten people at once. It is hard because we must gather each person's intent once, then compute the intersection. A slot is real only if it fits every participant's declared window.

## A real slot is an intersection of three things

```text
eligibility  ∩  calendared availability  ∩  every participant's expressed intent
```

The first two merge here — "business rules" is eligibility, and "availability" is calendared. The third, expressed intent, is what the whole confirmation flow is for.

## The three inputs

- **Availability**: what the calendar and its rule stack say — hours, exceptions, holidays, time zones, days off. Deterministic. Only tells you a slot could exist.
- **Preferences**: the person's expressed intent window per meeting type, stored and expiring (default monthly), and their chosen mode for it.
- **Meeting type + business rules**: the meeting type sets the default posture; business rules are the business's authority (Product Vision: the business owns its policies).

## The posture: "absolute and inform" vs "check first"

Product Vision says Tend uses the meeting type and preferences. So the meeting type sets the default posture:

- **Routine** (e.g. a support call): book straight off the standing intent — "absolute" — and **inform**: "As per your weekday-morning instruction, I set up the meeting at X. Tell me if that does not work." Fast, predictable, still visible.
- **Decision-risking** (e.g. a prospect about to buy): default to **check first** — gather intent now, because the person's willingness genuinely matters and must not be assumed.

The employee's own preference can override the posture for specific preferences, and business rules can too. This matches the product principle: use the deterministic fast path when rules suffice; ask when real intent uncertainty means guessing would be unsafe.

## The preference is gather intent, not a guess

"Absolute" means *book by default without re-asking* — it is not an irreversible lock. The employee declared the intent, so booking inside it does not violate "never guess". The inform step keeps visibility + override; the monthly expiration and per-preference check-in stop a stale "available" from burning a real day.

## What this question does not settle

- The concrete rule engine / precedence order (Level 3).
- The exact preference expiration period and the waiver rules (configuration / research).
- Transport of the booking (Channels & Permissions).

## Working decision

Availability, preferences, meeting type, and business rules cooperate as: business rules define eligibility, meeting type and preferences set the intent posture (absolute-and-inform for routine, check-first for decision points), availability provides calendared reality, and the booking is the intersection — books inside declared intent, informs, and asks only when the meeting falls outside agreed intent.