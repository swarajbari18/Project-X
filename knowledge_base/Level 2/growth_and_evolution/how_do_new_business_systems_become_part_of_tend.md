# How do new business systems become part of Tend?

## Where this question came from

Level 1 asks how a new business system (a CRM, an ERP, a shipping platform, an inventory system) becomes part of Tend. Level 1 already defined what a system is *for* Tend: a source of information, an owner of records, something Tend may update with permission. This question is about the joining itself — the procedure that turns "the business uses HubSpot" into "Tend can work with HubSpot".

## The answer, in plain words

A business system joins Tend as a **capability** the business switches on from a **connectors menu**. A capability is one purposeful action — "look up a delivery status", "create a support case", "post a payment update" — that Tend's product team built on top of that system's own tools. It is a tool grouped with a purpose, not every raw API method the system exposes.

## The walkthrough (Shiprocket joins)

A D2C business uses Shiprocket for deliveries.
1. The business opens the connectors menu. There is no Shiprocket capability yet. The missing item is a **visible gap** in the menu — not "we don't support Shiprocket", but a first-class item that reads "not built yet".
2. Meanwhile, customer conversations that need delivery data use the fallback lane: Tend asks an employee or waits, and the gap stays visible as a build signal.
3. The business requests the connector. The product team evaluates it: what value would it bring (which customer situations it would resolve), what are its tradeoffs and constraints (what it cannot answer, its rate limits, its data, its windows, its cost).
4. The product team authors the capability. From Shiprocket's tool definitions (its documentation, its API or MCP-style catalogue), the team groups raw operations into purposeful actions that fit how Tend operates — a "delivery status" capability that returns a claim with a source, a timestamp and a confidence, so Trust and Evidence can use it. This is product-team work. No LLM-led auto-integration; the reasoning model may assist authoring and evaluation, never decides what the connector may do.
5. The team defines the capability's **contract**: what it can answer or do, its bound (how long a call may take), its timeout and failure behaviour, its consequence and reversibility, and its default grant scope.
6. The capability is validated and tested in the Test & Simulation Environment: does it honour the invariants (never guess, traceable, shares only what an actor needs, cannot be used beyond its scope), in normal and unusual cases?
7. It appears in the connectors menu. The business **enables** it: chooses the grant scope (what the capability may do, for whom) and accepts the fallback lane if the connector is ever unavailable.
8. Tend monitors it for drift and errors. If Shiprocket changes or deprecates its API, that is an external rule change — live, not pinned: the situation wakes, uses the fallback lane, and the gap becomes visible again if the capability needs rebuilding.

## What a capability attaches to

A new system enters as a new **source** in the source map (Gathering), a new **owner** of information with its own permission rules (Authority: effective permission = grant ∩ system permission), and a new **source of authority** for claims (Trust). The capability is the product-shaped handle that joins all three into something a situation can use.

## The join lifecycle (canonical for this category)

Request → evaluate → author → contract → validate → test → enable → monitor → retire. The *content* differs by type (a channel's contract is its rule record; a policy's is its structure; a workflow's is its procedure), but the lifecycle is the same shape for every kind of thing that joins Tend. This is why this document is the canonical home of joining.

## The boundary

- We own the conceptual join lifecycle and the capability catalogue.
- The concrete adapter, provider and API mechanics are Level 3.
- Legal bounds on what a connector may be scoped to see are Compliance & Security.

## Working decision

New business systems join Tend as capabilities in a pre-built catalogue, through one lifecycle: request → evaluate → author → contract → validate → test → enable → monitor → retire. Capability authoring is product-team work over the system's tool definitions; the business enables and scopes; an absent capability is a visible gap with a fallback, never a refusal.

## Related

- Change semantics for a connector that changes: [`how_do_we_evolve_tend_without_breaking_existing_businesses.md`](how_do_we_evolve_tend_without_breaking_existing_businesses.md)
- Source map: [`../gathering_information/how_do_we_discover_where_information_lives.md`](../gathering_information/how_do_we_discover_where_information_lives.md)
- Effective permission: [`../authority_and_ownership/understanding_all_authority_and_ownership_questions.md`](../authority_and_ownership/understanding_all_authority_and_ownership_questions.md)