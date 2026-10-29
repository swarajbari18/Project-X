# How should Tend think about follow-up and nurture versus outreach?

## Note added 2026-10-28 — one central situation, not a list

Swaraj, 28 October 2026: "There is no such thing as a board." Outreach has one situation per person, and one central situation linked to all of them, which tracks the progress. Every update from a person's situation goes to the central situation. The conversation manager decides, by the decided rules for what reaches an owner, whether the owner hears it: "Only significant things will be communicated." Where this page says the owner sees "one list", read: the owner opens the central situation. See [how memory and knowledge works with the loops](../memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops.md), part D4.


## The short answer

**Follow-up, nurture and business-directed outreach can all be situations Tend coordinates.** The boundary is not who contacted whom first. The boundary has two tests. Did the business give a clear purpose, a target, and follow-up rules? Can Tend act within the business's permissions, source limits, privacy rules, and channel rules?

## The three things are not the same

- **Unbounded prospecting (not a Tend responsibility by default).** Choosing the market, inventing the ideal customer, buying lists, scraping the internet or deciding a campaign strategy are business or outside AI-agent responsibilities. Tend may coordinate a capability that performs one of these jobs when the business connects and authorises it. Tend does not take on that responsibility silently.
- **Business-directed outreach (in scope when bounded).** A business owner gives Tend a list of people, a product, a reason for contacting them and the permitted next steps. Tend creates one situation per person, prepares or sends communication when allowed, handles what people write back, waits for follow-up events, escalates and records the outcome.
- **Nurturing / follow-up (in scope).** A prospect or customer has an active situation and the business has a useful next interaction in mind. The interaction may answer something they asked, provide an agreed update, check whether they are ready, offer a meeting or continue a purchase. Tend follows up because the situation and the business's follow-up rules require it, not because a timer applies to every business.

## The rules we are setting

1. The trigger may be an incoming interaction, a business instruction, a system event, an external-agent result or time.
2. The situation must contain a clear purpose and target. Tend must not invent either.
3. The next interaction must be useful for the situation, not merely generated because a cadence exists. A cadence is how often messages go out.
4. The cadence and continuation rules come from business configuration or the explicit task instruction, not from a fixed timer that applies to every business.
5. Follow-up only happens if the business rules, permissions, source limits, and channel rules allow it. **If the channel rules forbid a message, Tend does not send it.** Example: a WhatsApp message sent more than 24 hours after the customer's last message needs an approved template and opt-in. Meta's pricing page says that after the first 24 hours only templates may be sent, even inside the 72-hour window. Inside the 72 hours, templates are free.
6. Each supplied person gets their own situation. A person can have several situations. A list view adds up the work but never replaces the separate storylines.

## Why this line matters

Tend carries out the communication and coordination of a business-directed situation. Whether the person wrote first does not decide whether Tend handles the situation. The source of the target may belong to the business, a CRM, a partner, or another agent. Strategy, unrestricted targeting, and unbounded scraping do not become Tend's responsibility automatically.

## Walkthrough: thirty supplied contacts

A business owner gives Tend a list of thirty contacts and says:

> "Introduce this product, use only the approved product information, answer questions, follow up once after three days if there is no reply, and bring me anyone who wants a meeting."

Tend creates thirty situations. One person writes back immediately. One asks a pricing question that needs an employee. One asks for a meeting. One is already a customer and must be routed to a customer situation instead of being pitched as a new prospect. One cannot be reached on any allowed channel. It becomes a visible wait, and the business contact is asked to decide.

The business owner sees one list with the current state of all thirty situations. Opening one person shows the full storyline, evidence, messages, wait, next responsibility, and reason for the next action. The business owner does not need to keep thirty chats.

## How a nurture moves

A nurture is a wait with a date.

- **If the person writes back before the date,** the conversation manager records their message and starts the situation worker. A customer message moves the situation to running. The worker writes Tend's reply and cancels the nurture wait in the same version, before the reply is sent. The cancel must come first, because the worker's run ends with the send. The nurture ends unless the business's rule sets a new date.
- **If the date arrives and the person has not written back,** the time trigger wakes the situation worker. The worker reads all earlier messages, then writes the next nurture message. The business sets how many nurture messages there are. When none is due, the worker records the work as resolved, and the conversation manager completes the situation after the last message has gone out. When one is due, the worker sets a new wait.

## What stays open

- Decided: the cadence (how often) and the nurture window (how long the nurture runs) are set per business. Examples only: every two or three days, or weekly.
- Resolved (2026-10-12). "Telegram-with-consent" means a chat the person started. Telegram's bots page says bots cannot start a conversation, so cold nurture on Telegram is not possible. Telegram's FAQ says bot messages cost nothing by default.
- After a reply, the nurture ends unless the business's rule sets a new date.
- The business sets the first nurture date in its instruction, for example: follow up once after three days if there is no reply.
- How feeding a follow-up interacts with channel compliance is a Channels-and-Permissions concern (later category).
- The first version includes business-directed outreach and nurture follow-up on the four channels. Unbounded prospecting stays outside Tend.

Decision: Tend carries a nurture when the business supplies the situation and Tend has the capability and permission to carry it.

## Related

- Communication boundary: [`../communication/when_should_tend_communicate.md`](../communication/when_should_tend_communicate.md) ("Unrelated, unbounded or prohibited communication remains outside Tend's permitted behaviour.")
- Channel rules (where nurture may happen): [`../../research/wa_compliance.md`](../../research/wa_compliance.md), [`../../research/channel_compliance_matrix.md`](../../research/channel_compliance_matrix.md)
