# Why the situation model should hold both commercial and non-commercial relationships

## The short answer

A situation model cannot know at the start whether a new actor is a lead, prospect, customer, returning customer, or stakeholder who just wants to know how the business is doing. The situation may begin with a message, a business instruction, a system event, a partner, or an external agent rather than a first inbound message. So it must be able to hold **both** shapes from the first event. The person-view (commercial lifecycle or stakeholder relationship) is derived from that same situation graph, never stored separately.

## Why both from the start

When an actor first appears in a business situation, Tend is not yet able to classify them. The actor is **unknown**. As events, instructions, evidence, and communication accumulate, Tend either asks for a clarification or gradually deduces which relationship this is. So the situation model has to be written so that either outcome is possible:

- A **commercial** person is on a lifecycle (lead → prospect → customer → returning). They may buy. A lead can be supplied by the owner, employee, CRM, partner, or an external lead-finding agent; it does not have to have contacted the business yet.
- A **non-commercial** person (stakeholder) has a relationship type + obligations/asks (respond by deadline, provide a document, confirm payment). They will not buy — they want low-effort access to truth or artifacts the business already holds.

Both shapes arrive through the same situation machinery: understand → gather → decide → act/escalate → explain/trace. The difference is only in what the derived person-view shows.

## What the situation model must carry

- The person's **identity** (as an actor beside the situation graph; "identify actor or create identity").
- Their **relationship**, discovered and tagged later (commercial stage, or stakeholder type).
- The **asks** they bring (each with its own resolution path, waits, deadlines).
- The **obligations** that attach to them (for stakeholders: the certificate, the tax notice, the payment confirmation).
- The **business-source events** that mark a change of relationship (owner assignment, lead supplied, order placed, paid, delivered, feedback given) — recorded into the story by the situation model, even though the event itself lives in the business system.

## What the situation model must NOT become

It must not become the customer-master record, and it must not become a lifecycle database. The situation model is the source of truth for the agent, the conversation, and the story. The journey and the relationship are *derived* from it on demand. We keep them derived because a separate stored "relationship record" would be a second truth that can go stale and disagree with the situations.

## The two shapes side by side

| | Commercial (may buy) | Non-commercial (stakeholder) |
|---|---|---|
| Relationship | lead → prospect → customer → returning | type: supplier, landlord, regulator, investor, journalist, helper, partner ... |
| Their asks | product question, order, support, refund | document, status, certificate, compliance reply |
| Driver | lifecycle | obligations + deadlines |
| Shown in owner view as | journey (prospect/customer/returning) | obligation/ask ribbon with deadlines |
| Held as | situations (derived person-view) | situations (tagged) |

## Why this matters

If the situation model only understood "customer," stakeholders would be mis-modeled as prospects, and the owner's view would be wrong in both directions: a supplier asking for a COI would look like a lead, and a business-supplied prospect who needs a sales call would look like a generic stakeholder ask. Because every new actor or event starts **unknown**, the model has to let the relationship emerge from evidence and instruction — the same "hard signals vs soft signals → ask" approach Understanding already uses for routing an event to a situation.

## The owner-directed list case

Suppose the owner gives Tend a product and thirty contacts and says to introduce it, answer
approved questions, follow up within a defined window, and arrange a meeting when someone is
ready. Tend creates thirty situation models plus one assignment-level artifact. The models share
the assignment's purpose and authority, but each develops its own evidence, channel permission,
replies, waits, objections, and outcome. A reply from one person wakes only that person's
situation. The owner can inspect the aggregate, search for a person, or drill into the one story
that needs attention. This is why the situation model is the unit of agency and the artifact is
the unit of business observation; neither is equivalent to a chat thread.

## Related

- [journey_and_lifecycle_conversation_and_discoveries.md](../Level 2/journey_and_lifecycle/journey_and_lifecycle_conversation_and_discoveries.md)
- [understanding_all_journey_and_lifecycle_questions.md](../Level 2/journey_and_lifecycle/understanding_all_journey_and_lifecycle_questions.md)
- [research_owner_stakeholder_journeys.md](./research_owner_stakeholder_journeys.md)
