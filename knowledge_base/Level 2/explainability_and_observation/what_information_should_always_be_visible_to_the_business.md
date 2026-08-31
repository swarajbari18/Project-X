# What information should always be visible to the business?

## The short answer

The situation-level baseline: every open situation of the business — its state, its asks and their endings, its waits with deadlines, its declarations, and the events that changed it — always visible, drillable one story at a time. On top of that sits a business-value view. Operational metrics never appear in a business viewer. The primary surface is the durable artifact: assignment, situation, waiting, attention, evidence, or completed-outcome views. Chat can search and control those artifacts; it is not the only way to understand what Tend is doing.

## Our answer

The Product Vision already fixed the spirit: the owner does not care that Tend handled a thousand messages or stayed online. The owner cares about the state of the business's work — who is waiting, which orders are stuck, which customers or prospects are at risk, what changed, and which commitments need attention — and wants to step into any single situation, see exactly what happened from the start, decide, and let Tend continue. An event may update that view without anyone opening a chat with Tend.

So the always-visible baseline is:

1. **Every open situation** — running / waiting / blocked, with its named reason.
2. **Ask status inside each** — what was asked, what was answered, what waits (with deadline), what was concluded honestly (including capability-absent).
3. **Declarations** — failures declared, capability-absent conclusions, escalations.
4. **Alerts on top** — things needing attention surface themselves; nothing waits to be discovered.

5. **Agency context** — what woke the situation, what Tend changed or attempted, what it is waiting for, who or what owns the next step, and what will cause the next wake-up. This is a compact explanation of the operational thread, not a demand that the business read raw messages or hidden reasoning.

On top of the baseline sits the **business-value view**: situations resolved, impact, time or money saved for the business. Swaraj drew this line firmly during the walkthrough — businesses see business value ("how many stories did we solve, what did it do for your business"), never operational value ("look how efficient Project X is"). Uptime, message counts, loop internals: builder-view only.

Two inherited rules complete the answer:

- **Per-role narrowing** comes from Authority and Ownership: a solo owner sees all of it; the moment distinct roles exist, each role's default visibility narrows. Same rule Authority set for actions, applied to observation.
- **Drill-down respects live-viewing rules.** Seeing a situation always means seeing it under the same entitlements as working it.
- **Artifacts are not transcripts.** Messages, tool results, approvals, waits, decisions, and outcomes are evidence in the story. The business view composes that evidence into searchable, scannable artifacts so the owner can understand the work without opening thirty separate chats.

## Boundary

- The owner's cross-business journey snapshot (Business View and Observation — later batch). This document sets the per-situation baseline only.
- Channel-level access control and masking mechanics (Level 3).
- Which alerts fire at which thresholds (business configuration).

## Related

- [What information should only be visible to administrators?](what_information_should_only_be_visible_to_administrators.md)
- [`../../research/business_journeys_map.md`](../../research/business_journeys_map.md) — journey 9: what owners actually want to see.
