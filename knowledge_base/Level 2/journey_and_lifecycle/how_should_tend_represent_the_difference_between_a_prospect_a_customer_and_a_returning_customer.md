# How should Tend represent the difference between a prospect, a customer, and a returning customer?

## The short answer

A person's relationship with the business is **derived from the situation graph, not stored in a separate record.** Tend keeps a stable sense of who the person is (identity), but *whether they are currently a prospect, a customer, or a returning customer* is a projection over their situation history. When someone first appears, Tend does not know yet; relationship is discovered through the conversation, exactly like which problem they are raising.

## What "prospect, customer, returning" mean

Product Vision fixes the three stages. We keep them minimal:

- **Prospect** — a person who has contacted the business but has never done business with it.
- **Customer** — a person who has done business with the business (a paid order exists, per business rule).
- **Returning customer** — a customer who comes back after having bought before.

A person who has never done business with the company starts as a prospect. The moment the business can see from its sources that a paid order exists, the person becomes a customer. A later interaction makes them a returning customer.

## Why it is derived and not stored

The situation graph is the source of truth for the agent, the conversation, and the story. Storing a separate "relationship record" would create a second truth that can go stale and disagree with the situations. Instead:

- The **person** is a stable identity anchor next to the graph (the actor who interacts, who can be "identify customer or create identity").
- The **relationship** is computed on demand from that person's situations and the business-source events the situations record (order placed, paid, delivered, feedback given).

If the order was placed, the data is read from the business source; the situation model already records that event into the story, so the derivation has what it needs.

## The "unknown" default

When someone first contacts the business, Tend cannot yet say whether they are a prospect, a customer, a returning customer, or a stakeholder who just wants to know how the business is doing.

So the default relationship is **unknown**, and it becomes something through the conversation:

- Tend may **ask for a clarification** when it is genuinely needed;
- or Tend may **gradually deduce** from the conversation;
- and it **changes the identity of the concept** as evidence accumulates.

This mirrors Understanding's tiered assignment: hard signals attach or create with confidence; soft signals ask the customer. Discovering who someone is to the business is the same shape as discovering which problem they are raising.

## A customer is not the situation record

A situation is a decision workspace for one open problem. It is not a customer-master record. This is already decided in Understanding. Deriving the relationship does not change that: the relationship view is a projection over many situations, not a field on any one of them.

## What is configuration, not concept

- The exact rule for "a paid order exists" (the prospect→customer marker) is business configuration, and the source of truth for that event lives in the business system.
- We do not add finer stages (cold / engaged / considering / hot) now. Product Vision does not need them, and the research flags "what defines a prospect stage?" as an open question. If a business later needs them, that is a business-configuration extension, not a change to this model.

## Related

- [journey_and_lifecycle_conversation_and_discoveries.md](journey_and_lifecycle_conversation_and_discoveries.md)
- [how_should_one_customer_have_several_open_situations_at_the_same_time.md](how_should_one_customer_have_several_open_situations_at_the_same_time.md)
- [understanding_all_journey_and_lifecycle_questions.md](understanding_all_journey_and_lifecycle_questions.md)