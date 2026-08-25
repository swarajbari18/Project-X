# What should the business owner see in a snapshot of the business journey?

## The short answer

The owner sees the **state of the business journey**, derived from the situation graph — what came in, what is stuck, what is at risk, what needs them. It is a business-value view, never an operational-excellence view.

## What the owner actually cares about

Product Vision sets the destination: the owner cares about the journey — how many prospects are waiting, how many are thinking about buying, how many became customers, which orders are stuck, which customers are at risk, whether anyone was missed. When something needs the owner, they step into that one situation, see what happened, decide, and let Tend continue.

The research (see [`../../research/research_owner_stakeholder_journeys.md`](../../research/research_owner_stakeholder_journeys.md)) confirms the four felt needs: nothing silently stuck, things keep moving without the owner being the bottleneck, one truthful picture instead of scattered tabs, and early calm risk flags instead of overnight surprises.

## The snapshot (aggregate view)

Derived on demand from the situation graph. It shows, in business terms:

- **Prospects** — how many are waiting, how many are actively engaged, how many are close to buying.
- **Customers** — how many there are, how many are new this period.
- **Order / delivery state** — which orders are stuck, which deliveries are late.
- **Risk** — which customers are at risk (layered: deterministic base + LLM suggestions that land on a deterministic rule).
- **Deadlines / obligations** — which situations or obligations are nearing or past a deadline (including stakeholder asks: tax notice, certificate, payment confirmation).
- **Owner's attention** — what specifically needs the owner, per the owner-attention filter.

It always drills down to the situation-level baseline (from Explainability D3), and from there to the full reconstruction. It is never a second source of truth — it is re-derived from the graph.

## The business-value view (translation, not operational metrics)

The owner gets the value, not the internal machine. The depth research surfaced operational numbers (tickets per 1,000 orders, cost per contact, response-time conversion, chargeback cost), but the owner-facing screen shows what those numbers *mean for the business*:

| Owner felt need | show the owner |
|---|---|
| "Nothing is silently stuck" | count of stuck orders, at-risk customers, open replies, chargeback-window opens, over a revenue-at-risk figure |
| "Things keep moving" | work that advanced while offline; only owner-required escalations surface |
| "One truthful journey" | drill into one person's whole journey across all their situations |
| "Early calm risk flags" | a classified risk feed with context and a suggested next step |

## Conflict resolution and escalation surfaced, not hidden

A snapshot that shows "a refund conflict needs a decision" is better than one that hides it. The owner sees the situation flagged for attention and can step in. This continues the invariant: every failure, conflict and inaction stays visible until a safe person takes responsibility.

## What remains configuration

- The exact "customer" rule (prospect→customer marker) — shared with Journey and Lifecycle.
- Alert thresholds, risk-tier bounds, cadence.
- Which stakeholder obligations are shown by default.

## Related

- [which_events_should_require_the_owners_attention.md](which_events_should_require_the_owners_attention.md)
- Per-situation baseline: [../explainability_and_observation/what_information_should_always_be_visible_to_the_business.md](../explainability_and_observation/what_information_should_always_be_visible_to_the_business.md)
- Research: [../../research/research_owner_stakeholder_journeys.md](../../research/research_owner_stakeholder_journeys.md)