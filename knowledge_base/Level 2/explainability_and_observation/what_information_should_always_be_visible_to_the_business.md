# What information should always be visible to the business?

## The short answer

The situation-level baseline: every open situation of the business — its state, its asks and their endings, its waits with deadlines, its declarations — always visible, drillable one story at a time. On top of that sits a business-value view. Operational metrics never appear in a business viewer.

## Our answer

The Product Vision already fixed the spirit: the owner does not care that Tend handled a thousand messages or stayed online. The owner cares about the state of the journey — who is waiting, which orders are stuck, which customers are at risk — and wants to step into any single situation, see exactly what happened from the start, decide, and let Tend continue.

So the always-visible baseline is:

1. **Every open situation** — running / waiting / blocked, with its named reason.
2. **Ask status inside each** — what was asked, what was answered, what waits (with deadline), what was concluded honestly (including capability-absent).
3. **Declarations** — failures declared, capability-absent conclusions, escalations.
4. **Alerts on top** — things needing attention surface themselves; nothing waits to be discovered.

On top of the baseline sits the **business-value view**: situations resolved, impact, time or money saved for the business. Swaraj drew this line firmly during the walkthrough — businesses see business value ("how many stories did we solve, what did it do for your business"), never operational value ("look how efficient Project X is"). Uptime, message counts, loop internals: builder-view only.

Two inherited rules complete the answer:

- **Per-role narrowing** comes from Authority and Ownership: a solo owner sees all of it; the moment distinct roles exist, each role's default visibility narrows. Same rule Authority set for actions, applied to observation.
- **Drill-down respects live-viewing rules.** Seeing a situation always means seeing it under the same entitlements as working it.

## Boundary

- The owner's cross-business journey snapshot (Business View and Observation — later batch). This document sets the per-situation baseline only.
- Channel-level access control and masking mechanics (Level 3).
- Which alerts fire at which thresholds (business configuration).

## Related

- [What information should only be visible to administrators?](what_information_should_only_be_visible_to_administrators.md)
- [`../../research/business_journeys_map.md`](../../research/business_journeys_map.md) — journey 9: what owners actually want to see.
