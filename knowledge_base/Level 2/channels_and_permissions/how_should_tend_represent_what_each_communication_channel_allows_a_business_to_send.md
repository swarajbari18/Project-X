# How should Tend represent what each communication channel allows a business to send?

## Where this question came from

Level 1 asks how Tend represents what each channel allows a business to send. The Product Vision says the channels, the consent rules, and the integrations are configured per market. The research files give the facts:

- WhatsApp: a 24-hour window, and a 72-hour free entry window.
- Telegram: a bot cannot start a chat (one research line conflicts; see below).
- Email: consent and an unsubscribe route.

A channel is only a way to send and receive messages. It is not business logic. The core of Tend does not decide anything based on the channel. This file says where a channel's rules live and what shape they take.

## The answer: one rule record per channel

Each channel has one rule record: the written list of what the channel allows. It answers these questions before anything is sent:

- **Can we start a message?** WhatsApp: inside an open 24-hour window, yes, with no template. Outside it, only with an approved template, and with opt-in (Tend's rule). Telegram: a bot cannot start a chat, so the user must write first. Once the user has started the chat, Tend may message in it, at no cost by default. Email: yes, with consent and an unsubscribe route. Website chat: only inside a visitor's open session.
- **Can we reply, and for how long?** WhatsApp: free replies inside the 24-hour window. Telegram: a chat the person began can be answered. Telegram business bots reply only to chats with an incoming message in the last 24 hours. Ordinary bots have no time window. Telegram states no template rule. Website chat: inside the open session.
- **Which message types exist?** WhatsApp has utility templates (operational updates) and marketing templates (promotions). Utility templates are free inside the 24-hour window. Outside it they are charged, except inside the 72-hour window, where all message types are free. Marketing templates are charged, except inside the 72-hour window, where all message types are free.
- **What consent is needed?** WhatsApp template: usually opt-in. Email: consent and an unsubscribe route.
- **What does it cost?** WhatsApp is charged per message, and the category sets the rule. The research does not yet give costs for Telegram or email.

**The 72-hour free entry window.** A person who messages us from a click-to-WhatsApp ad, or from a Facebook Page call-to-action button (Meta's page does not mention Instagram), in the mobile app, opens this window. The WhatsApp file says all message types are free inside it, templates included. After the first 24 hours, only templates may be sent. Meta's pricing page confirms that all message types are free inside it, templates included, so the marketing-template rule has this exception.

**Resolved (2026-10-12).** Marketing templates are charged, except inside the 72-hour window, where all message types are free, templates included. Meta's pricing page confirms this. The research files' wording 'always charged' was too absolute.

**Resolved (2026-10-12).** The matrix's 'proactive Telegram with consent' means a chat the person started. Telegram's bots page says bots cannot start a conversation, so cold contact is not possible. The WhatsApp file's 'where rules allow' means the same thing.

**Who picks the channel.** The choice file sets the order. The communication layer checks that the chosen channel can carry the message. The core asks for "a message to this actor with this intent." It does not need to know whether the channel is WhatsApp or email.

## A channel window is a wait

A channel's "can we send now" is not a fixed setting. It opens and closes. A WhatsApp window opens when the actor writes. It closes 24 hours after the actor's last message. So a window is a wait: it starts when the actor writes, and it ends 24 hours later. When it closes, the waiting situation is checked again.

## Email as the usual route, and missing channels

"All channels" does not mean every channel is built on day one. Two rules apply.

- **Email is the usual route when no channel is available.** It is used only with consent and an unsubscribe route. The choice file gives the reason. Without them, the business contact decides, or Tend waits. Escalation follows the failure rules.
- **A channel with no connection yet is a gap, not a refusal.** The gap is a signal to build the channel. Until then, email is used. Tend never tells the business that a channel is "not supported."

## The boundary

- This file says what each channel permits. The choice file says which channel to use.
- Level 3 says how a message is sent: the provider, delivery, and technical steps.

## What this file does not settle

- Window lengths and consent durations per market. Compliance & Security holds these.
- The email law in each market. Compliance & Security checks it, as the research cites US and EU/Indian rules (CAN-SPAM, GDPR, DPDP).
- Build order. That is product planning, outside this design.
- The technical delivery steps (Level 3).

## Working decision

Decision (Swaraj, 2026-10-12). Each channel has one rule record. The core does not depend on which channel is used. A channel window is a wait. Email is the usual route when no channel is available, with consent and an unsubscribe route. A channel with no connection yet is a gap, never a refusal.

## Related

- Consent and preferred channel: [`how_should_tend_record_consent_and_the_customers_preferred_channel.md`](how_should_tend_record_consent_and_the_customers_preferred_channel.md)
- Reply vs start elsewhere: [`how_should_tend_choose_between_replying_in_the_current_channel_and_starting_a_message_in_another_channel.md`](how_should_tend_choose_between_replying_in_the_current_channel_and_starting_a_message_in_another_channel.md)
- Channel facts: [`../../research/wa_compliance.md`](../../research/wa_compliance.md), [`../../research/channel_compliance_matrix.md`](../../research/channel_compliance_matrix.md)
- Wait spine: [`../coordination/how_do_we_represent_work_that_is_waiting.md`](../coordination/how_do_we_represent_work_that_is_waiting.md)
