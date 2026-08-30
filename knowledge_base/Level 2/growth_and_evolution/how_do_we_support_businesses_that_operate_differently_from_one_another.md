# How do we support businesses that operate differently from one another?

## Where this question came from

Level 1 and Product Vision both promise the same core for every business, with the differences as configuration. This question makes that promise concrete and names the boundary of what is allowed to differ.

## The way businesses differ

The research (`smb_vs_corporate_scaling.md`) already identifies the axes of variation. A business differs from another on:
- the number of actors and roles (one owner → teams with named owners);
- the depth of the approval / authority hierarchy (owner approves → multi-level gates);
- SLA / severity / tier granularity (informal → formal multi-tier);
- which software it couples to (spreadsheets → ERP/CRM/helpdesk);
- routing and escalation topology (owner → pooled queue → senior → on-call);
- audit and compliance weight (basic → regulatory);
- meeting and availability complexity (one calendar → many people with preferences).

Markets add more axes: which channels are popular, what the rules allow a business to send, which systems are standard, plus language, currency and timezone (`global_market_readiness.md`).

## What they all share

Every one of those axes is configuration. The core that understands the customer, decides the next behaviour and traces the work is the same everywhere. This is the Level 1 promise — "a business can grow from one person to a large team without Tend changing shape" — and it holds across countries too.

## The walkthrough

A service workshop, a D2C brand and a 40-person logistics firm all run the same core.
- The workshop enables a WhatsApp capability and one owner seat.
- The D2C brand enables WhatsApp + email + Shiprocket, a support role and a refund policy.
- The corporate enables a helpdesk connector + CRM + ERP, formal SLA tiers, approval ladders and audit weight.
- The difference between them is the values in the registry, the enabled capabilities and the assignments. The machinery is the same.

## What cannot differ

A business's "way of operating" cannot override the invariants. No business may configure Tend to hide inaction, fake a reply, pretend a conflict is resolved, decide without enough information, or share more than an actor needs beyond the legal floor. The mechanism is already decided: the configurator cannot cross the invariant line. This category states it out loud because this is exactly the question where someone will ask for one of these configurations.

## The boundary

- The concrete values of these axes per market: Compliance & Security and Level 3.
- What a "way of operating" means inside workflows and policies: Q3 and Q4 of this category.

## Working decision

Businesses that operate differently are supported by different configuration — enabled capabilities, policy values, roles and assignments — over one universal core. The variation axes are known, and none of them changes the core. The invariants are non-negotiable: any "way of operating" that would cross them is refused and surfaced, not configured.

## Related

- Variation axes research: [`../../research/smb_vs_corporate_scaling.md`](../../research/smb_vs_corporate_scaling.md)
- Market axes: [`../../research/global_market_readiness.md`](../../research/global_market_readiness.md)
- Invariants as a line: [`../authority_and_ownership/understanding_all_authority_and_ownership_questions.md`](../authority_and_ownership/understanding_all_authority_and_ownership_questions.md)
- What a knob is: [`how_do_businesses_customise_tend_without_changing_its_core_behaviour.md`](how_do_businesses_customise_tend_without_changing_its_core_behaviour.md)