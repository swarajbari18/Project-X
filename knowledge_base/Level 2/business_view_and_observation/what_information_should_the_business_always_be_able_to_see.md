# What information should the business always be able to see? (pointer to the per-situation baseline)

## The short answer

The per-situation visibility baseline is already decided by Explainability and Observation (D3). Business View and Observation *reuses* that baseline and does not redefine it. This document only points to it.

## The existing decision (reuse)

Explainability and Observation (D3) already decides what is **always visible to the business**:

- every open situation with its state, ask-statuses, waits, deadlines, and declarations;
- drill into any one situation, one story at a time;
- a **business-value view** on top (stories solved, impact, money saved);
- never operational metrics (uptime, message counts) — those belong to the builder/admin;
- alerts on top: things needing attention surface themselves; nothing waits to be discovered.

See [`what_information_should_always_be_visible_to_the_business.md`](../explainability_and_observation/what_information_should_always_be_visible_to_the_business.md).

## What this category adds

Business View and Observation adds the **aggregate (cross-situation) owner snapshot** and the **owner-attention filter** — the "state of the business journey" — which is derived from the same situation graph. The aggregate always drills down to this per-situation baseline; it never replaces it.

## Why the seam matters

Two categories both touch "what the business owner sees." The rule we follow: Explainability owns the **per-situation baseline** (any situation, any time); Business View owns the **cross-situation aggregate** (the owner's snapshot of the whole journey, derived from the graph, drilling into per-situation baseline). Keeping them explicitly separated prevents two documents from double-owning the same screen.

## Related

- The baseline: [`what_information_should_always_be_visible_to_the_business.md`](../explainability_and_observation/what_information_should_always_be_visible_to_the_business.md)
- The aggregate: [`what_should_the_business_owner_see_in_a_snapshot_of_the_business_journey.md`](what_should_the_business_owner_see_in_a_snapshot_of_the_business_journey.md)
- Owner attention: [`which_events_should_require_the_owners_attention.md`](which_events_should_require_the_owners_attention.md)