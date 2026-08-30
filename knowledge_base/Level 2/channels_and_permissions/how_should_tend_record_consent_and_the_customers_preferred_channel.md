# How should Tend record consent and the customer's preferred channel?

## Where this question came from

Level 1 asks how Tend records consent and the customer's preferred channel. Product Vision says Tend reaches out on "the one the customer has agreed to." Both ideas sounded like one heavy record. This category corrected that: "consent" is not one thing.

## Consent depends on who is on the other side and which direction the message goes

| | Customer | Employee | External partner |
|---|---|---|---|
| **Replying** (the conversation is already there) | Implied. Stay on the current channel. No consent record needed. | Implied by the job. Use their chosen work lane. | Implied by the arrangement. |
| **Initiating** (reaching out) | Real gate: consent **and** channel window (WhatsApp template, email opt-in). | Not consent — the business's own authority over its people. | Business-controlled, scoped to what the task needs. |

Two simplifications fall out of this table:

- **An active conversation is not a consent problem.** The customer came to the business. If every reply required a recorded consent check we'd be adding machinery to something trivial. The reply simply stays on the current channel.
- **An employee is not a consent problem.** Someone the business employs and expects to use Tend is reachable because of the job, not because they opted in. The employee's channel question is a *logistics* question, not a permission one.

## But consent and the channel window are two separate gates

We did not blur consent away. For a *customer-initiated outbound* message, two gates both have to pass:

1. **Consent** — does the customer agree, for this kind of message, on this channel?
2. **Channel window** — does the channel even permit the initiate? (WhatsApp can say "template only" for a customer who would love to hear from us.)

Simplifying consent removes gate one, not gate two. Both must be represented, because a clean consent does not make WhatsApp allow a free initiate.

## The preferred channel is meaningful only for initiating

For a reply, there is no "preferred channel" decision — the reply stays where the conversation is. The preferred channel only matters when the business must *start* a message. Product Vision's "the one the customer has agreed to" is therefore not a general favourite; it is the customer's *consented initiating channel*. It behaves like the rest of our stored preferences: recorded, can be updated, and it only governs outbound starts.

## What a consent record actually is (when it exists)

Only initiating customer messages need a consent record, and even then the record is small and tied to the channel handle (the phone number or email), not to some heavy customer-master record. It records: the channel, the message category consented to, how and when consent was obtained, and withdrawal. This is deliberately light — closer to an opt-in/consent line than a legal dossier. The legal depth of what "consent" means in each market hands over to Compliance & Security.

## The boundary

- We own the channel/permission leg here: who needs consent, in which direction, and where the preferred channel matters.
- Consent-as-law — what counts as valid consent in each market, durations, withdrawal rights — carries to Compliance & Security.
- Transport and how the consent is stored technically is Level 3.

## Working decision

Consent is directional. Reply to an active conversation and reaching an employee are not consent problems. Consent genuinely exists only for customer-initiated outbound contact, where it must be combined with the channel window (two gates, one consent and one window). The preferred channel is meaningful only for initiating, not replying, and is the customer's consented initiating channel.

## Related

- What each channel allows: [`how_should_tend_represent_what_each_communication_channel_allows_a_business_to_send.md`](how_should_tend_represent_what_each_communication_channel_allows_a_business_to_send.md)
- Reply vs start elsewhere: [`how_should_tend_choose_between_replying_in_the_current_channel_and_starting_a_message_in_another_channel.md`](how_should_tend_choose_between_replying_in_the_current_channel_and_starting_a_message_in_another_channel.md)
- Employee reachability shape (Meetings intent): [`../meetings_and_human_work/how_should_employee_availability_preferences_meeting_type_and_business_rules_work_together.md`](../meetings_and_human_work/how_should_employee_availability_preferences_meeting_type_and_business_rules_work_together.md)