# Meetings and Human Work — conversation and discoveries

## Why this document exists

This is a conversation record, not a formal specification. It preserves how we understood Meetings and Human Work together: the raw thought that started it, the corrections we made, the research, and the working decisions. The map of the six Level 1 questions is in `understanding_all_meetings_and_human_work_questions.md`.

## What the earlier categories already decided (reuse)

Before this category, most of the machinery existed. We reuse it rather than re-derive it:

- **Human Collaboration** owns who is the correct responsibility target (role, authority, expertise, relationship, availability, workload, urgency, language, business rules — not the nearest person), and one responsible owner per human work item.
- **Human Collaboration** owns the escalation model: distinguish not-delivered from not-acknowledged from no-progress, and escalation may change urgency, visibility, notification, ownership or routing.
- **Coordination / Time** own the wait spine: a wait has a subject, a reason, a timing class, a resume trigger, a release policy, an escalation path, and visibility. Waiting ends only by a resume trigger, never silently.
- **Understanding the Situation** owns the situation model and graph: one situation is one operational problem, a story.
- **Authority and Ownership** owns permissions and grants; **Communication** owns how an interaction is expressed; **Business View and Observation** owns the owner-facing aggregate.

So this category has two genuinely new parts and four that mostly reuse a spine and add the meeting-specific content.

## The raw thought that started this

The category opened with the Product Vision and the research, which already said the meeting journey is not "pick a free calendar slot." An employee may have a free calendar yet still be genuinely busy. Different employees take different kinds of calls. Tend uses the employee's preferences and the type of call to choose who is right.

The research confirmed this is the real industry pain: free-on-calendar is a free slot, but "available" is a live computation over layered, conflicting rule sets — base hours, recurring exceptions, date-specific overrides, holidays, location, time zones, vacation.

## Discovery one — the meeting is a wait whose subject is people and a date, and whose failures are meeting events

We looked at a meeting on our own spine. A meeting is not a new shape; it is:

```text
a decision ("invite a person")
    ↓
a wait, whose subject is one or more people and a date
    ↓
the resume trigger covers confirmation and the date arriving
    ↓
on cancellation / miss / reschedule, the wait ends by a failed resume trigger
    ↓
the meeting happens → outcome → the next step is human work
```

This is the same wait spine Coordination and Time already carry, and Time explicitly left a strand: "How a scheduled meeting or appointment maps onto the wait model … connects to the future Meetings and Human Work category." This category provides that bridge, referencing the spine rather than inventing a parallel calendar model.

## Discovery two — intent is gathered once, then booked inside; it is not a per-slot yes/no

My first model called the confirmation step "propose one slot, get a yes/no." Swaraj corrected this, and the correction is important: the primitive is not a rolling yes/no against single slots. It is **intent, gathered once, then booked inside.**

Each human (employee or customer) states their standing intent up front: "for sales-call meetings, I will be available across weekday mornings; I am accepting meetings of this form." That written statement is the intent, settled in advance.

A proposed meeting that sits inside that stated intent needs no further confirmation — the person already confirmed when they stated the intent. Confirmation only returns when the proposed meeting falls **outside** the declared intent, which is when we must gather new intent rather than guess.

Why this matters for multi-person meetings: if we asked a rolling yes/no against single slots, a slot that fits nine of ten people but not the tenth would force us to re-ask all ten. Gathering each participant's intent once means the meetings are simply the schedule inside the intersection of their declared windows. This scales from one person to a large team, exactly as Product Vision expects.

## The three kinds of availability, separated

We separated three things that sound alike, because confusing them changes the outcome:

- **Calendared availability** — what rules and time zones say. Machine-readable, but only tells you a slot *could* exist.
- **Intent** — whether the specific person actually agrees to take it. Only the person can supply it, and the system must *ask*, because we never guess.
- **Eligibility** — the business-rules filter that decides who may take which meeting type at all.

A true meeting slot = eligibility ∩ calendared availability ∩ each participant's expressed intent.

## The two-counter guard (a raw thought, corrected into a safe shape)

Swaraj's spark: some people repeatedly reserve a meeting and then do not keep it — they miss, reschedule at the last minute, or cancel and immediately book again. He wanted a threshold.

Two things survived scrutiny and became decisions:

1. The scarce thing being wasted is **another human's reserved attention**. So the counter is an anti-waste guard on human attention, not a petty score.
2. Research showed the counter must live on the **person**, not on single appointments. A booking system that treats every appointment as a fresh event has no memory of a repeat booker. The research also warned: first misses are usually not repeat behaviour; consecutive counts are fairer; documented emergencies waive a count; the policy must be consistent and public, because bad reviews come from inconsistent enforcement, not from having a rule.

But we had something the CRM-style tools don't: the situation graph. And Swaraj's real-life case was *one story* being re-planned many times. So we kept **two counters, both derived from the same meeting events** — no new stored record:

- **Story counter:** the number of failed meeting events within one situation. Its response is quiet and local: it demands the person **still express intent again before the next booking** in that story, so a rut does not silently burn another slot. It does not block anyone.
- **Person counter:** the wasted-attention pattern gathered across that person's situations. This is the real guard against a repeated booker who never consumes. When it crosses the floor, routine booking is set aside: the person is told the limit is exhausted, and a senior person with the full history is given the report.

The floor is never a silent rejection. It is a **change of routing to a person**. And the count itself is derived from meeting events, never stored as a new person-master record.

## The escalation is terminal — and the inaction tail still must not be silent

Swaraj decided there is **no escalation ladder past the senior.** When the person-level floor hits, the customer/prospect cannot book on their own anymore, gets "you have exhausted the limits," the senior gets the full report, and that is the end of the meeting-complaint chain. No third rung, no cycling.

That is correct and it survives scrutiny. But we made sure it did not quietly collide with the product's central invariant:

> The hardest problem is when the right next step needs a person to act and the person does not act. Tend's job is to make the inaction visible and keep the situation moving until someone safe takes responsibility.

So the senior is the **last meeting authority**, but the senior's *own* inaction is not invisible. If the senior receives the report and does nothing, that is now business inaction at the senior level, and it is surfaced through the existing machinery — the owner-attention filter and Failure — not through a new meeting escalation ladder. There is no new booking chain. The owner is the last accountability authority.

## Two forks resolved by the Product Vision (not by guessing)

Two open questions remained at the ready gate, and the Product Vision answered them:

1. **The terminal escalation and the inaction tail** — kept both (above).
2. **"Treat as absolute and inform" vs "check me first"** — Product Vision says Tend uses the **meeting type and the employee's preferences**. So the meeting type sets the default posture (a routine support call books straight off a standing preference; a prospect deciding to buy defaults to check-in intent), and the employee's own preference can override the posture per preference. The default is the deterministic fast path; the check-in is where genuine intent uncertainty requires asking before assuming.

## The employee's standing intent is a stored, expiring preference

When an employee says "I am free weekday mornings," we treat it as an implicit standing preference. We record two rules:

- Tend **informs** when it books: "As per your weekday-morning instruction, I have set up the meeting at X." Even the absolute case is never silent.
- The preference **expires** (default monthly) and the employee chooses the mode: treat as absolute / book with an information-and-override, or check in before booking specific preferences. Business rules can also drive this.
- "Absolute" means *book by default without re-asking* — not an irreversible lock. The employee always keeps the visibility-and-override. Because a standing "available" is not the same as "willing on this particular day", the expiration/check-in/override is what stops a stale availability from burning a real day.

## What remains open (configuration and research, not conceptual gaps)

- The exact number for the floors (a product default of ~3, consecutive, first-miss-waived is a defensible signal from research; the real value is business configuration).
- The exact expiration period (month is a working concept, not a fixed value).
- The definitive list of emergency/exception rules that waive a count.
- Whether a meeting type taxonomy is universal or business-configured (the type names are not fixed here).
- The availability engine's exact rule precedence (that is Level 3).

## Boundaries with other categories

- **Coordination / Time** — the meeting-as-wait bridge references their wait spine, and does not copy it.
- **Human Collaboration** — who is the responsibility to target, tracking, escalation, one accountable owner per work item.
- **Communication** — how the booking and the "informed" messaging is expressed.
- **Authority and Ownership** — who may book, approvals, the grant under which Tend books inside declared intent.
- **Business View and Observation** — the owner-facing report of the senior's inaction is data, not a meeting ladder.
- **Channels & Permissions / Compliance & Security** — out of scope for this category (channel transport, initiate windows, consent-as-law live there, in Level 2 later / Level 3).
- **Level 3** — scheduling providers, calendar APIs, the concrete availability rule engine.
