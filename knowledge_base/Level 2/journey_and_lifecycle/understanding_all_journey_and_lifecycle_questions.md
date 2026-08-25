# Understanding all the Journey and Lifecycle questions

## Status

Working decisions recorded. The conceptual spine is settled. Business-specific knobs (the exact "customer" rule, follow-up cadence, channel windows) stay as configuration and research, like every earlier category left its knobs.

This is the map for the Journey and Lifecycle category. The conversation record is [`journey_and_lifecycle_conversation_and_discoveries.md`](journey_and_lifecycle_conversation_and_discoveries.md).

## The spine, in plain words

> **The situation graph is the source of truth for the agent, the conversation, and the story. A person's journey (prospect → customer → returning, or a stakeholder relationship) is derived from that graph, not stored anywhere separate.**

The Level 1 questions for this category are mostly already answered by the categories that came before. The one genuinely new decision is *where the person lives against the situation graph*. Answer: the person is an identity-bearing anchor; the *relationship* is a projection over their situations.

## The five Level 1 questions and where each answer lives

1. **How should Tend represent the difference between a prospect, a customer, and a returning customer?**
   As a derived relationship, computed from the person's situation history using the three Product-Vision stages (prospect → customer → returning). See [`how_should_tend_represent_the_difference_between_a_prospect_a_customer_and_a_returning_customer.md`](how_should_tend_represent_the_difference_between_a_prospect_a_customer_and_a_returning_customer.md).

2. **How should one customer have several open situations at the same time?**
   Already answered by Understanding the Situation: many situations per customer, one message attaching to several, split early, link by operational context. The person-view is derived; the many situations stay separate. See [`how_should_one_customer_have_several_open_situations_at_the_same_time.md`](how_should_one_customer_have_several_open_situations_at_the_same_time.md).

3. **How should a conversation that contains several problems be split into separate situations?**
   Reused from Understanding the Situation — route, split early, attach, merge, reopen, link. Not rewritten here. See [`understanding_all_questions.md`](../understanding_the_situation/how_do_we_determine_whether_multiple_messages_belong_to_the_same_situation_and_whether_two_seemingly_different_conversations_are_actually_related.md) (the map for that category).

4. **How should waiting for a meeting, a delivery, a payment, a repair, or a feedback date be represented?**
   Reused from Coordination and Time — the wait spine (subject, reason, timing class, resume trigger, release policy, escalation path, visibility) and the three wait levels. The examples here are the same examples the spine already uses. Not rewritten here. See [`how_do_we_represent_work_that_is_waiting.md`](../coordination/how_do_we_represent_work_that_is_waiting.md) and [`how_should_waiting_be_represented.md`](../time/how_should_waiting_be_represented.md).

5. **How should Tend know when a waiting period has ended?**
   Reused from Time — only by a resume trigger (actor returns, state changes, a date arrives, or the situation-level check-in), never silently. Not rewritten here. See [`when_should_waiting_end_automatically.md`](../time/when_should_waiting_end_automatically.md).

## What the earlier categories contributed

- **Understanding the Situation**: the situation model + graph (nodes are situations, edges are operational context), route-before-gather, "the situation is not the customer master record," "links by operational context not identity."
- **Coordination / Time**: the wait spine, deadlines, check-ins.
- **Memory and Knowledge**: what belongs in situation memory vs long-term knowledge; person identity facts are remembered but the relationship is derived.
- **Business View and Observation**: the aggregate owner snapshot is derived from the same situation graph (see that folder).

## What this category does not decide

- The definition of situation models, asks, routing, or linking (Understanding).
- Wait mechanics, timers, release policies (Coordination / Time).
- Which events specifically require the owner's attention (Business View).
- Channel-specific initiate/reply windows such as WhatsApp CSW and Free Entry Point (Channels and Permissions + research/wa_compliance.md).
- Meetings, availability, no-shows (Meetings and Human Work).
- Consent and compliance (Channels and Permissions, Compliance & Security).

## Related

- Conversation record: [journey_and_lifecycle_conversation_and_discoveries.md](journey_and_lifecycle_conversation_and_discoveries.md)
- Business View map: [`../business_view_and_observation/understanding_all_business_view_and_observation_questions.md`](../business_view_and_observation/understanding_all_business_view_and_observation_questions.md)
- Research: [`../../research/research_owner_stakeholder_journeys.md`](../../research/research_owner_stakeholder_journeys.md)