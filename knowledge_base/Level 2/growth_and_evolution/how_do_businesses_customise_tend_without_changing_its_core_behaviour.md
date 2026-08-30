# How do businesses customise Tend without changing its core behaviour?

## Where this question came from

Level 1 says the same core serves every business and "the difference is how much is configured". Every earlier category kept saying "that's a knob" and moving on. This question finally says what a knob *is*, and how we tell a knob from the core.

## The core/config boundary test

The test is one sentence: **if adding or changing a knob requires changing core logic, the knob was mis-categorised.**

- **Core** = the responsibilities that are the same for every business: understand the situation, gather, verify, decide the next behaviour, coordinate, communicate, trace. These never change.
- **Config** = everything that differs between businesses and markets: which connectors are enabled, which channels, which policy values, which workflow templates, which people hold which grants.

## What a configuration item is

A configuration item is a typed, versioned record in a registry. It has a schema the product pre-writes, values the business fills, validation before it is used (schema + invariants + conflict checks), and it is assembled into the situation's rule context at the moment a situation opens. This is what makes "knobs" real: they are not free text or free code, they are structured records the product has already bounded.

## Who decides what

The product pre-writes: the schemas, the capability catalogue, the legal room (the white-list, from the Channels visibility decision), and the invariant line. The business decides: which capabilities to enable, the values inside the structures (thresholds, times, fallbacks), and assignment — who holds which seat and which grant. Both sides are needed, and neither can do the other's part. This is the same Path 2 split the Channels category chose for visibility, generalised to configuration.

## The walkthrough (a solopreneur vs a team)

- One-person business: one seat, the owner. Everything runs on the default range. There is no configuration screen to care about — already decided by Authority's default range, reused here.
- A 12-person team: the owner adds roles, narrows grants, enables the connectors each person needs, fills policy values. Same core, more configuration.
- A business asks to configure something the registry cannot express, for example "if a delivery is delayed, silently tell the customer it is on time". This is refused. It is not a configuration gap — it would violate never-guess and traceability. The invariants are a hard line no configuration crosses.

## The invitation and the gap

Customisation happens inside a governed zone. Businesses that want more than the zone get a visible answer: either a product request (we build the capability or expansion into the catalogue) or, when it would change the core, a refusal surfaced with reasoning. Customisation never means "write your own logic".

## The boundary

- What policies and workflows look like inside the registry: Q3 and Q4 of this category.
- Legal bounds on the white-list: Compliance & Security.
- The storage and mechanism of the registry: Level 3.

## Working decision

Customisation is choosing values and assignment inside product-pre-written, validated structures — never writing logic. The core/config test is: if a knob needs core change, it was mis-categorised. The invariants are a hard line no configuration crosses; beyond the governed zone, requests become visible gaps or product requests, never silent grants.

## Related

- The registry and its four planes: [`understanding_all_growth_and_evolution_questions.md`](understanding_all_growth_and_evolution_questions.md)
- Path 2 visibility precedent: [`../channels_and_permissions/how_should_tend_decide_what_information_each_employee_customer_or_external_partner_may_see.md`](../channels_and_permissions/how_should_tend_decide_what_information_each_employee_customer_or_external_partner_may_see.md)
- Default range: [`../authority_and_ownership/who_may_grant_authority_and_what_comes_by_default.md`](../authority_and_ownership/who_may_grant_authority_and_what_comes_by_default.md)