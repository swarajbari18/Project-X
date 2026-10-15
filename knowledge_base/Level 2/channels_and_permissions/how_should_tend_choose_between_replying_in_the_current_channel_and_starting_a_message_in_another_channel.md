# How should Tend choose between replying in the current channel and starting a message in another channel?

## Words used in this file

- **Actor:** the person or company Tend contacts: a customer, a prospect, an employee, or a partner.
- **Reply:** Tend's answer to the actor's latest message. It goes on the channel the actor used for that message, while that channel's window or chat is still open.
- **Start:** any other message from Tend to the actor. Only a start involves a channel choice.
- **Window:** the period after the actor's message in which Tend may send certain messages. For WhatsApp, 24 hours.
- **Available:** the channel can carry the message now. For WhatsApp, Telegram and the website, a window or chat is open. For email, the actor's address is on record.
- **Allowed:** all five checks below pass.
- **Template:** a message the platform has approved in advance.
- **Opt-in:** the actor's agreement to receive that kind of message.
- **Unsubscribe route:** a way for the actor to stop future messages.
- **Rule record:** the written list of what one channel allows: whether it can start a chat, whether it can reply, which window applies, what consent is needed, and what it costs.
- **Lawful basis:** a legal reason, other than consent, that allows a message. The law of each market sets these.
- **Business contact:** the person the business names to decide when no option is available and allowed.
- **Compliance & Security:** the function that confirms the legal rules for each market.

## Where this question came from

Level 1 is the problem statement. It asks how Tend chooses between replying where the actor is and starting a message somewhere else.

Example used in this file: a delivery delay needs an update the next morning. The WhatsApp window has closed.

## The answer has two parts

**A reply stays on its channel.** Tend answers on the channel the actor used for that message, while the channel's window is open. If the window has closed, any Tend message on that channel is a start, even an answer.

**A start chooses a channel.** Use the first option that is available and allowed:

1. **A window or chat that is open now, where no template is needed.**
   - WhatsApp inside its 24-hour window.
   - Telegram, only in a chat the actor began. A bot cannot start a chat, and a user must message the bot or add it to a group first. Telegram states no template rule. Bot messages cost nothing by default, so messages in a started chat are free (Telegram's FAQ). Business bots can reply only to chats with an incoming message in the last 24 hours.
   - The open website chat session, for as long as the visitor's session stays open.
2. **Email.** Use it when the actor's address is on record, consent is in place, and the message has an unsubscribe route. Other lawful bases are for Compliance & Security to check in each market.
3. **A WhatsApp template.** Use it only outside the 24-hour window, and only for a message type that an approved template covers. Tend requires opt-in for every template it sends. In the 72-hour window after a click-to-WhatsApp ad or a Facebook Page button, opened in the mobile app, all message types are free, templates included. Once the 24-hour window closes, only templates may be sent. Outside that window, marketing templates are charged. Utility templates are free inside an open 24-hour window.
4. **No option is available and allowed.** Then the business contact decides, or Tend waits for the actor to write first. Escalation follows the failure rules, not this file.

Email ranks second for two reasons. Swaraj's direction is to use email when Telegram is not connected. The research also recommends email first for proactive nurture and feedback messages. The order is decided (Swaraj, 2026-10-12). The research conflicts are resolved in the represent file.

Before any option is used, five checks must pass:

1. The channel's rule record allows it.
2. The purpose is allowed.
3. The actor's contact permission allows it.
4. Consent, or a lawful basis where required, is in place. For email, an unsubscribe route is also needed.
5. The channel allows this message now. For WhatsApp: an open window, or an approved template outside it. For Telegram: a chat the actor began. For email: an address on record.

A closed WhatsApp window does not block email. Each channel has its own rules.

The same order applies to customers and prospects. Employees are reached on the work channel they chose. Partners are contacted only after escalation, and only when the business policy allows it. The partner's arrangement with the business applies as well.

**Example.** The delivery delay needs an update the next morning, and the WhatsApp window has closed. This is a start. If the customer has an email address on record, with consent and an unsubscribe route, Tend sends the update by email. If not, the business contact decides, or Tend waits for the customer to write.

**One situation, many channels.** When the actor moves from one channel to another, it is still the same situation. For example: WhatsApp, then email.

## No available option is a routing outcome, not a refusal

The Level 1 wording can make this sound like "we cannot reach this actor." That is not the outcome. When no option works, the business contact decides, or Tend waits for the actor to write. Escalation is decided by the failure rules. A message never fails silently because of a channel.

## The channel window as a wait

A channel window is a wait. It opens when the actor writes first. For WhatsApp, it closes 24 hours after the actor's last message. So "start in another channel" often means "wait until the actor writes in that channel."

## The boundary

- This file sets the order for a start.
- The communication layer checks that the chosen channel can carry the message.
- The technology level (Level 3) decides how the message is sent.
- Whether an update is worth telling the person is the conversation manager's decision. Whether to wait or escalate is Decision Making or Failure. Neither is this file.

## Working decision

Decision (Swaraj, 2026-10-12). A reply stays on the channel the actor used for that message, while that window is open. A start uses the first option that is available and allowed, after the five checks pass. If no option is available and allowed, the business contact decides, or Tend waits for the actor to write. No available option is a routing outcome, never a silent refusal.

## Related

- What each channel allows: [`how_should_tend_represent_what_each_communication_channel_allows_a_business_to_send.md`](how_should_tend_represent_what_each_communication_channel_allows_a_business_to_send.md)
- Consent and preferred channel: [`how_should_tend_record_consent_and_the_customers_preferred_channel.md`](how_should_tend_record_consent_and_the_customers_preferred_channel.md)
- When to communicate vs wait: [`../communication/when_should_tend_communicate.md`](../communication/when_should_tend_communicate.md), [`../communication/when_should_tend_wait.md`](../communication/when_should_tend_wait.md)
- Wait spine: [`../coordination/how_do_we_represent_work_that_is_waiting.md`](../coordination/how_do_we_represent_work_that_is_waiting.md)
