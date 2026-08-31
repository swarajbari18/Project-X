# How should one person or organisation have several open situations at the same time?

## The short answer

Easily, and mostly by an existing decision: a situation is one operational problem, and the same person or organisation can have many of them open at once. A situation may begin from a message, an owner instruction, a list, a system event or an external-agent result. The situation graph lets one event attach to several situations, split a conversation into several problems, and link related-but-separate situations. The person-view is derived; it does not flatten these.

## Reuse: understanding the situation already answered this

Understanding the Situation (in this same Level 2 folder) already decides:

- A situation is one operational problem — a decision workspace, not a chat thread, not a customer, not an order.
- One person, organisation or business contact can have several situations open at the same time.
- One message can mention more than one problem, and can belong to more than one situation.
- "Related" is not "same": two situations can share context (same customer, same order, same incident) and still need separate situation models and separate resolution paths. Tend links them without merging.
- Tend does not link everything about a customer "because it is the same person" — links connect operational context, not identity.

So this question is already answered by a prior category. We reuse it and do not re-derive it.

## What this category adds: the derived person-view

The new piece from Journey and Lifecycle is that the *person* (who has all these situations) is an identity-bearing anchor, and the person's relationship is derived from their situations. This is also what lets one list-level instruction create independent person-specific situations without collapsing them into one campaign chat.

That means:

- Tend can answer "what is this person's journey?" by projecting over their situations — prospect → customer → returning, or a stakeholder relationship.
- The projection never merges the situations into one. Each open situation keeps its own resolution path, waits, deadlines, and story.
- A customer who is "waiting on a delivery" and "at risk on a refund" at the same time shows up as two open situations under one person, with two different states and two different next steps.

## Why it matters

The owner's Business View is derived from this same graph. If the person-view conflated situations, the owner's view of "one customer at risk" would collapse two genuinely different problems into a single wrong story. Keeping the projection over the graph — without flattening it — preserves the correct per-problem resolution while still giving the one-person view the owner can act on.

## Related

- [how_should_tend_represent_the_difference_between_a_prospect_a_customer_and_a_returning_customer.md](how_should_tend_represent_the_difference_between_a_prospect_a_customer_and_a_returning_customer.md)
- The situation graph: [`../../understanding_the_situation/how_do_we_determine_which_information_is_relevant_to_the_current_situation_and_which_information_should_be_ignored.md`](../understanding_the_situation/how_do_we_determine_which_information_is_relevant_to_the_current_situation_and_which_information_should_be_ignored.md)
- [understanding_all_journey_and_lifecycle_questions.md](understanding_all_journey_and_lifecycle_questions.md)
