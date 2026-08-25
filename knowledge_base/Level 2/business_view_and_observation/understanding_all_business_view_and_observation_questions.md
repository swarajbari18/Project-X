# Understanding all the Business View and Observation questions

## Status

Working decisions recorded. The conceptual spine is settled; alert thresholds, risk-tier bounds, and cadence are business configuration / later research, like every earlier category left its knobs.

This is the map for the Business View and Observation category. The conversation record is [`business_view_and_observation_conversation_and_discoveries.md`](business_view_and_observation_conversation_and_discoveries.md).

## The spine, in plain words

> **What the owner sees is the state of the business journey — what came in, what is stuck, what is at risk, what needs the owner — derived from the situation graph. Operational excellence is never shown to the owner.**

The per-situation baseline is already decided by Explainability and Observation (D3). This category owns the *aggregate* (cross-situation) owner view and the *owner-attention* filter.

## The two Level 1 questions and where their answers live

1. **What should the business owner see in a snapshot of the business journey?**
   A derived aggregate over the situation graph: prospects waiting / engaged, buyers close to a decision, customers and new customers, stuck orders and late deliveries, at-risk customers, situations nearing or past deadlines, and what needs the owner's attention. Always drillable to the situation-level baseline. See [`what_should_the_business_owner_see_in_a_snapshot_of_the_business_journey.md`](what_should_the_business_owner_see_in_a_snapshot_of_the_business_journey.md).

2. **Which events should require the owner's attention?**
   Three classes: decisions only the owner can make (their grant), owner-risking deadlines or notices (tax/compliance, chargeback window, complaint), and journey-level escalations that drifted past delegated people. See [`which_events_should_require_the_owners_attention.md`](which_events_should_require_the_owners_attention.md).

## What the earlier categories contributed

- **Explainability and Observation (D3)**: the per-situation baseline (state, ask-statuses, waits, deadlines, declarations) and the business-value view; it handed the cross-business owner snapshot to this category.
- **Product Vision**: the owner sees the journey — prospects waiting, buyers close to deciding, deliveries stuck, customers at risk — and steps in per situation.
- **Authority and Ownership**: which grants exist decide whether an event reaches the owner or a delegated person.
- **Failure**: declared outcomes into the audit; the "alerts on top" rule.
- **Coordination / Time**: waits, deadlines, check-ins that the view surfaces.
- **Journey and Lifecycle**: the derived person relationship (prospect / customer / returning / stakeholder) that the aggregate is built from.

## The risk computation

- **Base: deterministic rules** — stale tracking, deadline passed, open chargeback window, no response past SLA.
- **LLM suggestions** — "quietly at risk" flags for softer signals (customer going quiet, review risk).
- A suggestion only takes effect when it lands on a deterministic rule. LLM self-assessed confidence is never a safety authorization.

## What this category does not decide

- Per-situation visibility baseline and trace/explain (Explainability and Observation).
- Who holds each grant (Authority and Ownership).
- Failure triage and recovery (Failure).
- The situation graph and person derivation (Understanding the Situation, Journey and Lifecycle).
- Channel-level initiate/reply windows (Channels and Permissions).
- Alert thresholds, risk-tier bounds, cadence, and the exact customer-stage rule (business configuration / later research).

## Related

- Conversation record: [business_view_and_observation_conversation_and_discoveries.md](business_view_and_observation_conversation_and_discoveries.md)
- Per-situation baseline: [../explainability_and_observation/what_information_should_always_be_visible_to_the_business.md](../explainability_and_observation/what_information_should_always_be_visible_to_the_business.md)
- Journey and Lifecycle: [../journey_and_lifecycle/understanding_all_journey_and_lifecycle_questions.md](../journey_and_lifecycle/understanding_all_journey_and_lifecycle_questions.md)
- Research: [../../research/research_owner_stakeholder_journeys.md](../../research/research_owner_stakeholder_journeys.md)