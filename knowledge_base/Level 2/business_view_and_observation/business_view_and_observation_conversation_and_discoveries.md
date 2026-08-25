# Business View and Observation — conversation and discoveries

## Why this document exists

This is a conversation record, not a formal specification.

It preserves how we understood Business View and Observation: what a business owner actually cares about seeing, why that is the *value the business gets*, not operational excellence, and which parts come from research versus this conversation.

This is the first read of the category. The per-situation visibility baseline is already decided in Explainability and Observation (D3). What this category adds is the *aggregate, cross-situation owner view* and the *owner-attention* question.

## What the earlier categories already decided (reuse)

- **Explainability and Observation (D3)** set the per-situation baseline: every open situation with state, ask-statuses, waits, deadlines, and declarations is always visible, drillable one story at a time, plus a business-value view. It explicitly *handed off* the cross-business owner journey snapshot to this category.
- **Product Vision** fixed the spirit: the owner does not care about message counts or uptime; the owner cares about the state of the journey — prospects waiting, buyers close to a decision, deliveries stuck, customers at risk — and wants to step into one situation, see exactly what happened, decide, and let Tend continue.
- **Coordination / Time** own the wait spine and deadlines that the view surfaces.
- **Failure** owns declared outcomes into the audit; "alerts on top; nothing waits to be discovered" comes from Explainability D3.
- **Authority and Ownership** owns who holds each grant — which determines whether a particular event reaches the owner or a delegated person.

## The raw thought that started this

Swaraj's frame came from the research and the Product Vision together:

> A business owner does not care about our operational excellence. They care about the **value** we give to their business, and their own business metrics **within the domain of what we are handling**. So Project X is its own "agency" that handles inbound communication and the operational communication inside the business. That is what the owner sees.

So the owner-facing view is not "here is how efficient Project X is." It is "here is the state of your business journey: what came in, what is stuck, what is at risk, what needs you." That is the axis this category runs on.

## The research that shaped this

We ran a breadth-first research pass on what a business owner feels and wants from an inbound-communication + operations system (Grok, mining X / Reddit / Facebook / owner forums), then a depth-first pass for the concrete numbers behind those feelings. The full record is in [`../../research/research_owner_stakeholder_journeys.md`](../../research/research_owner_stakeholder_journeys.md).

The four felt themes that came out strongest:

1. **"Nothing is silently stuck or missing"** — surface open prospects, orders, at-risk customers, unanswered threads, chargeback/review risk in one view, so the owner can sleep without wondering what they missed. The fear is the *unknown* miss (an unread message, a stalled order, a closed chargeback window, a customer who "quietly left").
2. **"Things keep moving without me being the bottleneck"** — show progress and hand-offs that happened while the owner was offline, with clear ownership of next steps, and escalate only the things that truly need the owner.
3. **A single truthful picture of the customer journey instead of scattered tabs** — one place that stitches inbound communication + internal truth, so nobody reconstructs the story by hunting across systems.
4. **Early, calm risk flags rather than overnight surprises** — reputation, payment, and "customer going quiet" signals, each with enough context and a suggested next step so that anxiety drops instead of rising.
## The correction: this is not operational metrics

The depth research surfaced many concrete *operational* numbers (tickets per 1,000 orders, cost per contact, response-time conversion lifts, chargeback cost per dollar). These are the levers that produce business value, but the owner does not look at them directly. The owner-facing view must show the *business value* that those levers create — and must never show operational excellence for its own sake.

The design job is a translation layer, not a copy-paste of metrics:

| Owner felt need | the operational lever | the business-value thing to show the owner |
|---|---|---|
| "Nothing is silently stuck" | missed / quiet / stalled | count of stuck orders, at-risk customers, open replies, chargeback-window opens, over a revenue-at-risk figure |
| "Things keep moving" | hand-offs / escalations resolved without the owner | work that advanced while offline; only owner-required escalations surface |
| "One truthful journey" | stitching order/payment/inventory/prior chat | drill into one person's whole journey across all their situations |
| "Early calm risk flags" | proactive signals (stale tracking, quiet customer) | classified risk feed with context + a suggested next step |

## Decision: the aggregate (cross-situation) owner snapshot

The real new decision in this category is:

> The owner's aggregate snapshot is a **derived view over the situation graph** — the same graph Journey and Lifecycle treats as the source of truth. It is computed on demand, never a separate dashboard database.

It shows, in business terms:

- how many prospects are waiting / actively engaged;
- how many people are close to buying;
- how many customers there are, and new ones this period;
- which orders are stuck, which deliveries are late;
- which customers are at risk (risk is layered: deterministic base + LLM suggestions that land on a deterministic rule);
- which situations or obligations are nearing or past a deadline;
- what specifically needs the owner's attention (the owner-attention filter).

It always drills down to the situation level (the Explainability baseline) and from there to the full reconstruction. It is re-derived from the graph every time; it is never a second source of truth.

## Decision: which events require the owner's attention

"Business inaction" (Product Vision's hardest problem) plus the "early calm risk flags" research shape the filter. The owner sees:

1. decisions only the owner can make (their grant / authority, per Authority and Ownership);
2. owner-risking deadlines or notices (tax/compliance, chargeback window, complaint); and
3. journey-level escalations that drifted past the delegated people.

Everything else in the graph is surfaced to the delegated employee or role, not the owner. This is what "make inaction visible until a safe person takes responsibility" means at the owner-at-a-glance level — the inaction that reaches the owner is the inaction nobody else safely owns.

## The risk computation (layered)

From the research and the product's established pattern (LLM proposes, deterministic decides):

- **Base: deterministic rules.** Stale tracking, a deadline passed, an open chargeback window, no response past SLA. Explainable, auditable, always computable.
- **Suggestions: the LLM proposes "quietly at risk" flags** for the softer signals (a customer going quiet, a review risk, a dispute forming).
- A suggested flag only *takes effect* when it can land on a deterministic rule. An LLM's self-assessed confidence is never a safety authorization. This matches how Decision Making already separates the LLM proposal from the deterministic enforcement.

## Open / provisional

- The exact "customer" rule (prospect→customer marker) stays business configuration (shared with Journey and Lifecycle).
- Alert thresholds, risk-tier bounds, and cadence are business configuration / later research, as in every earlier category.
- The intervention actions (step in, chat to Tend, ask to elaborate, then resume) are conceptually clear from Product Vision and the research but their exact shape is a later design decision.

## Boundaries with other categories

- **Explainability and Observation** owns the per-situation baseline and the business-value view; this category owns the *aggregate* owner snapshot and the owner-attention filter.
- **Authority and Ownership** owns who holds each grant — which decides whether an event reaches the owner.
- **Failure** owns declared outcomes; "which failures require immediate attention" feeds the owner filter.
- **Journey and Lifecycle** owns the derived person relationship that the aggregate view is built from.
- **Channels / Compliance** (later categories) drive channel-specific visibility of when the business can initiate a message.

## Related

- Per-situation baseline: [`../explainability_and_observation/what_information_should_always_be_visible_to_the_business.md`](../explainability_and_observation/what_information_should_always_be_visible_to_the_business.md)
- The full research record: [`../../research/research_owner_stakeholder_journeys.md`](../../research/research_owner_stakeholder_journeys.md)
- Journey and Lifecycle: [`../journey_and_lifecycle/journey_and_lifecycle_conversation_and_discoveries.md`](../journey_and_lifecycle/journey_and_lifecycle_conversation_and_discoveries.md)