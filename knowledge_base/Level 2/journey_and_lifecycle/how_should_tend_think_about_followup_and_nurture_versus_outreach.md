# How should Tend think about follow-up and nurture versus outreach?

## The short answer

**Follow-up, nurture and business-directed outreach can all be situations Tend coordinates.** The boundary is not whether the person contacted the business first. The boundary is whether the business has supplied a clear purpose, target, permitted behaviour and continuation rules, and whether Tend can act within the applicable authority, source, privacy and communication constraints.

## The three things are not the same

- **Unbounded prospecting (not a Tend responsibility by default).** Choosing the market, inventing the ideal customer, buying lists, scraping the internet or deciding a campaign strategy are business or external-agent responsibilities. Tend may coordinate a capability that performs one of these jobs when the business connects and authorises it, but it does not silently assume that responsibility.
- **Business-directed outreach (in scope when bounded).** An owner gives Tend a list of people, a product, a reason for contacting them and the permitted next steps. Tend creates one situation per person, prepares or sends communication when allowed, handles replies, waits for follow-up events, escalates and records the outcome.
- **Nurturing / follow-up (in scope).** A prospect or customer has an active situation and the business has a useful next interaction in mind. The interaction may answer something they asked, provide an agreed update, check whether they are ready, offer a meeting or continue a purchase. Tend follows up because the situation and its policy require it, not because a universal timer says to send another message.

## The rules we are setting

1. The trigger may be an incoming interaction, a business instruction, a system event, an external-agent result or time.
2. The situation must contain a clear purpose and target. Tend must not invent either.
3. The next interaction must be useful for the situation, not merely generated because a cadence exists.
4. The cadence and continuation rules come from business configuration or the explicit task instruction, not from a universal timer.
5. Follow-up only happens if the business rules, authority, source restrictions and communication rules allow it. **If Tend cannot communicate properly, it does not communicate.**
6. Every person gets an individual situation model. A list-level artifact aggregates the work but never replaces the separate storylines.

## Why this line matters

The knowledge base had an incorrect tension: Communication and this question treated "cold outbound" as a product boundary, while Authority, Coordination, Time, External Services and the business's direct instruction already supported bounded business-directed work. The corrected line is **responsibility-based**. Tend owns the communication and operational coordination of a business-directed situation. The source of the target may belong to the business, a CRM, a partner or another agent. Strategy, unrestricted targeting and unbounded scraping do not become Tend's responsibility automatically.

## Walkthrough: thirty supplied contacts

An owner gives Tend a list of thirty contacts and says:

> "Introduce this product, use only the approved product information, answer questions, follow up once after three days if there is no reply, and bring me anyone who wants a meeting."

Tend creates thirty situations. One person replies immediately. One asks a pricing question that needs an employee. One asks for a meeting. One is already a customer and must be routed to a customer situation instead of being pitched as a new prospect. One cannot be contacted through the chosen channel and becomes a visible wait or approval item.

The owner sees an assignment artifact with the current state of all thirty situations. Opening one person shows the complete storyline, evidence, messages, wait, next responsibility and reason for the next action. The owner does not need to maintain thirty chats.

## What stays open

- The exact cadence and window per business is configuration (this conversation used "two or three days" and "weekly" as examples, not constants).
- How feeding a follow-up interacts with channel compliance is a Channels-and-Permissions concern (later category).
- Whether particular outreach capabilities are available in the first version is a product decision. The conceptual responsibility remains in scope when the business supplies the situation and Tend has the capability and authority to carry it.

## Related

- Communication boundary: [`when_should_tend_communicate.md`](../communication/when_should_tend_communicate.md) ("cold outbound marketing and unrelated prospecting are outside Tend's core purpose")
- Channel windows (CSW/FEP, where nurture may happen): [`../../research/wa_compliance.md`](../../research/wa_compliance.md), [`../../research/channel_compliance_matrix.md`](../../research/channel_compliance_matrix.md)
