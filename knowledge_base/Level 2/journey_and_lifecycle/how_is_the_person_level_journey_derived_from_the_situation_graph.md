# How is the person-level journey derived from the situation graph?

## The short answer

The person is an identity anchor next to the situation graph. Their journey (commercial stage or stakeholder relationship) is a **projection** over their situations, computed on demand. The situation model is the source of truth for the agent, the conversation, and the story; nothing about the journey is stored as a separate truth.

## The derivation, step by step

1. **Anchor.** A stable identity for the person exists beside the graph (the actor who interacts; "identify customer or create identity"). This is not a relationship record — it is who the person is.
2. **Collect their situations.** These are situations the person is part of (they are the customer, the requester, the obligated party). The graph holds the story of each one.
3. **Read the business-source events those situations record.** Order placed, paid, delivered, feedback given — even though the event lives in a business system, the situation model captured it into the story.
4. **Classify the relationship.** If the person might buy: commercial lifecycle (prospect → customer → returning). If not: stakeholder type (supplier, landlord, regulator, ...). The classification is the tiered signal approach — hard signal → tag; soft signal → ask.
5. **Compute stage / obligations.** For commercial: the stage is the strongest claim the situations support (e.g. "a paid order exists" → customer). For stakeholder: the open asks and their deadlines (the obligations ribbon).

This projection is recomputed on demand. It is never a separate record that can drift from the situations.

## Why a projection and not a record

- **The situation model is the source of truth for execution.** A separate relationship record would be a second truth that can disagree with the situations and go stale.
- **The relationship can change.** A person who is a prospect today can become a customer the moment the business source shows a paid order. Stored state invites forgetting to update it; a projection is always current against the facts.
- **The situation is explicitly not the customer-master record** (already decided in Understanding), and Tend does not become a CRM. The projection gives the person-view without turning the situation model into a master record.

## What the situation model must guarantee for this to work

Because the journey is derived, the situations must be able to tell the whole story of the person:

- identity (who the person is);
- relationship discovery (the tags, and the evidence they came from);
- asks and their resolution paths (the "story" of each problem);
- business-source events that matter for the stage (order placed, paid, delivered, feedback).

If a situation forgets a key business event, the projection silently shows the wrong stage. So "the situation model should explain the story completely" is a requirement on the situation model, not a nice-to-have.

## Configuration, not concept

- The exact "a paid order exists" rule (prospect→customer marker) is business configuration.
- The source of truth for the event itself lives in the business system.
- The join between the identity anchor and the situation nodes is a conceptual shape here; the mechanism is a later (Architecture / Level 3) decision.

## Related

- [journey_and_lifecycle_conversation_and_discoveries.md](journey_and_lifecycle_conversation_and_discoveries.md)
- [how_should_tend_represent_the_difference_between_a_prospect_a_customer_and_a_returning_customer.md](how_should_tend_represent_the_difference_between_a_prospect_a_customer_and_a_returning_customer.md)
- [why_situation_model_holds_both_commercial_and_non_commercial_relationships.md](../../research/why_situation_model_holds_both_commercial_and_non_commercial_relationships.md)