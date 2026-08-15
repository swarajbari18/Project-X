# WhatsApp Business Platform — Compliance & Pricing Model (verified, 2026)

Critical for Tend's Feedback/Retention + Nurture journeys: you CANNOT freely initiate
outbound messages to a customer/prospect on WhatsApp. This constrains where "nurture"
and "feedback" can happen by default.

## The 24-hour Customer Service Window (CSW)
- When a WhatsApp user sends ANY inbound message (text, image, button tap, list reply) to your
  WhatsApp Business API number, a **24-hour customer service window** opens.
- Within an open CSW you may send **free non-template messages** (any type: text, image, video, etc.).
- The window closes **exactly 24h after the last customer-initiated message**. If you reply after it
  closes, your message will FAIL (error 131047) unless you use an approved template.
- **Template messages** are the ONLY message type that can be sent OUTSIDE a CSW (i.e., to initiate
  a conversation). They require an **approved template** + an opt-in/consent in most cases.

## Free Entry Point (FEP) — the 72h free window
- When a user messages you from a **Click-to-WhatsApp ad** or a **Facebook/Instagram Page
  Call-to-Action button**, a **72-hour free window** opens (from Android/iOS app only).
- Within FEP, ALL message types (including templates) are free for 72h.
- FEP is separate from CSW: if CSW closes you can still only send templates.

## Pricing model (effective July 1, 2025 — per-message)
- Meta now charges **per message**.
- Non-template messages within an open CSW are FREE.
- Template categories: **Utility** (order updates, logistics, account) and **Marketing** (promos).
- Utility templates within an open CSW are free; **Marketing templates always charged**.
- Volume-based discounts exist for utility/authentication templates.

## What this means for Tend
1. **Prospect nurture / proactive outreach**: WhatsApp outbound is LIMITED. You generally need an
   approved template + opt-in (or a FEP from a CTWA/Page CTA, or the user must re-initiate).
   → Nurture/feedback by default should use **email** (or Telegram where rules allow), and only use
   WhatsApp within the 24h CSW or via templates when consent exists.
2. **Feedback/Retention journey**: matches the user's intuition — "email is the safest default"
   because WhatsApp outbound-initiation is restricted and paid; Telegram/email for async nurture.
3. **Order/logistics updates** = Utility templates (free within CSW; charged outside).
4. Design Tend's channel strategy around the **compliance matrix**, not around "just message them."
