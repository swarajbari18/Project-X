# Understanding all the Channels and Permissions questions

## Status

Working decisions recorded. The conceptual spine is settled. The exact per-channel window values, consent durations, and the legal "minimum" scope per market are business configuration and deliberately left to research, the later Compliance & Security category, and Level 3, as every earlier category left its knobs.

This document is the map for the Channels and Permissions category. The conversation record is [`channels_and_permissions_conversation_and_discoveries.md`](channels_and_permissions_conversation_and_discoveries.md).

## Why this category exists

Two earlier categories kept pointing here. **Communication** said channel transport, initiate/reply mechanics and legal consent are not its job. **Meetings and Human Work** used messaging without pulling in channel rules, and said this category owns the channel.

Channels and Permissions answers two different questions that Level 1 lumped together:

- **Channels:** what is a business allowed to send, on which channel, and when?
- **Permissions:** what is each employee, customer, or external partner allowed to see?

These are not the same responsibility. Channels is about transport-and-consent. Permissions is about access control. This category holds both, but with different spines.

## The spine, in plain words

> **The core never treats a channel as the business situation. A communication-manager layer carries each permitted interaction on whatever the business already uses. A reply stays where the conversation is. Starting a new message is a separate gated case, whether it is a customer update, employee request, partner communication or business-directed prospect contact. What any person sees is governed by a pre-written, narrow default that the law requires, which the business may only widen inside a legal white-list it does not control.**
## The four Level 1 questions and where each answer lives

1. **How does Tend represent what each channel allows a business to send?** — A per-channel rule record (can we initiate? reply? which window? which template category?) held by the communication-manager adapter layer. The core is channel-agnostic; channel is a configurable adapter, not business logic. A channel window is a wait on the shared spine. See [`how_should_tend_represent_what_each_communication_channel_allows_a_business_to_send.md`](how_should_tend_represent_what_each_communication_channel_allows_a_business_to_send.md).

2. **How does Tend record consent and the external actor's preferred channel?** — Consent and permission are split by actor, direction and message purpose. An active conversation is different from a new business-initiated contact. The preferred channel becomes meaningful when Tend must initiate. See [`how_should_tend_record_consent_and_the_customers_preferred_channel.md`](how_should_tend_record_consent_and_the_customers_preferred_channel.md).

3. **How does Tend choose between replying in the current channel and starting a message in another?** — Reply stays in the current channel. Starting a message follows an ordered, gated sequence (preferred → template+consent → email → human/wait). A blocked initiate is a routing decision, not a refusal. See [`how_should_tend_choose_between_replying_in_the_current_channel_and_starting_a_message_in_another_channel.md`](how_should_tend_choose_between_replying_in_the_current_channel_and_starting_a_message_in_another_channel.md).

4. **How does Tend decide what each employee, customer, or external partner may see?** — Path 2: pre-written role and partner scopes (default narrow, by law) + a narrow, governed "widen within legal limits" white-list zone + business assignment of which person sits in which role and which partner is engaged. See [`how_should_tend_decide_what_information_each_employee_customer_or_external_partner_may_see.md`](how_should_tend_decide_what_information_each_employee_customer_or_external_partner_may_see.md).

## What the earlier categories contributed

- **Communication** — decided the LLM is not the authority for whether a message is permitted, whether a recipient sees information, or whether consent exists; and that channel-specific rules were left for this category.
- **Meetings and Human Work** — the stored-expiring-overrideable shape for employee intent, reused for employee reachability.

## What this category does not decide

Channels and Permissions does not:

- transport messages or build concrete adapters (Level 3);
- define legal consent or the per-market minimal scope (Compliance & Security);
- decide whether to communicate, wait, or escalate (Decision Making / Failure);
- choose the wording of any message (Communication);
- or define the LLM's role in drafting language (Communication).

## Remaining open

- The exact per-channel window values and initiate defaults (business config / research / Level 3).
- The exact consent duration and how "obtained how / when / on which channel" is recorded for each market (Compliance & Security).
- The exact legal "minimum" and the white-list ceiling per market (Compliance & Security).
- The concrete adapter catalog and its build-priority order (Growth and Evolution / Level 3).

## Related

- Conversation record: [`channels_and_permissions_conversation_and_discoveries.md`](channels_and_permissions_conversation_and_discoveries.md)
- Channel facts: [`../../research/wa_compliance.md`](../../research/wa_compliance.md), [`../../research/channel_compliance_matrix.md`](../../research/channel_compliance_matrix.md)
- Market/channel adapters: [`../../research/global_market_readiness.md`](../../research/global_market_readiness.md)
- Wait spine: [`../coordination/how_do_we_represent_work_that_is_waiting.md`](../coordination/how_do_we_represent_work_that_is_waiting.md)
- Authority default range: [`../authority_and_ownership/understanding_all_authority_and_ownership_questions.md`](../authority_and_ownership/understanding_all_authority_and_ownership_questions.md)
- **Journey and Lifecycle** — bounded follow-up, nurture and business-directed communication are in scope; unbounded targeting strategy is not. This category formalised the concept of a channel *window* onto the wait spine.
- **Authority and Ownership** — effective permission = grant ∩ owning-system permission; Tend only reduces access, never expands; the default-range shape for the small business.
- **Coordination / Time** — the wait spine, onto which a channel initiate-window is a wait.
- **Explainability and Observation** — the visibility baseline this category builds into per-actor scoping.
