# Findings — Logistics / "Where is my order" (WISMO) + competitive landscape

## 1. WISMO is a professional category with established playbooks (validated)
- Industry term: **WISMO = "Where Is My Order"** tickets — the #1 ecommerce support cost-driver.
- **No-movement rule**: domestic tracking no movement 5 business days → review; international 10
  business days → review. (Casekit playbook) — this directly operationalizes the user's
  "stuck 7 days" signal (5-day threshold would've raised it earlier).
- **Never claim "stuck" from scan gaps**: tracking is event-scan based; no update ≠ no movement.
  Distinguish: normal scan gap (line-haul, customs, local carrier batch processing) vs true delay.
  → Tend must compute **"expected next scan window"** per carrier/route instead of naively flagging.
- **Proactive delay notice**: "If the package is delayed, the customer should hear it from the store
  FIRST. A proactive delay message protects trust." → Not just answering "where's my order" — Tend
  should *initiate* the update before the complaint. This is a different, higher-value behavior.
- **DNR (Delivered, Not Received) workflow**: if courier says "delivered" but customer says not
  received → separate checklist workflow (proof of delivery, GPS, photo, escalation), NOT generic
  WISMO reply. Validates "delivered ≠ received" gap from gaps_beyond_rant.md.
- Notifications tiers: order confirmation → dispatch → first movement → local handoff → delivery
  attempt → delivered → delayed-shipment review. Customers judge by these; "label created for
  several days" is a trust-damage classic.
- Premature refund/reship because of tracking confusion directly costs profit. ("sellers lead to
  premature refunds or reshipments — impacts profit") → Tend's verify-before-claim protects margin.

## 2. Competitive landscape (India WhatsApp-CRM / AI-assistant — RED OCE at the chat layer)
| Product | Price (₹) | Focus |
|---|---|---|
| ViveLead | ₹299/u/mo | WhatsApp CRM "replies first", AI, lead mgmt, follow-ups |
| ComPayable... noted: Pariq | ₹499(6 seats) | WhatsApp CRM + AI voice bots, auto follow-ups |
| Whalexy | ₹999–2,999 | team inbox for MSME, chatbots, drip nurture, broadcasts |
| FloCRM | ₹799–1,999/seat | WhatsApp-first inbox, AI reply drafts (Hindi/Tamil/English), forecasts |
| Tanvik | ₹1,999–4,999 | team inbox, AI reply drafts to approve, templates, AI Sales Agent |
| LeadsLoom | (Reddit mention) | natural-feeling WA automation for SMEs |
| Heep AI | (Reddit mention) | restaurant booking/chat automation |
| n8n DIY | free+ | free AI WhatsApp agent via community guides (no Meta API) |
| Respond.io / Intercom / Zendesk | global | mature unified inboxes, but Western-priced/oriented |

Common features across ALL: shared inbox, AI reply drafts/suggestions, follow-ups, lead pipeline,
broadcasts/templates, auto-assign, "no missed sales" messaging.

## 3. What this means for Tend's positioning
- **At the chat/inbox layer Tend is NOT new.** Indian SMBs already have 10+ cheap options.
- Tend's differentiators must be above the chat layer:
  1. **Situation/decision engine** — not drafts; understands what's happening across systems (orders,
     logistics, finance), not just chats.
  2. **Lifecycle + waiting + escalation** — prospect→customer→support→feedback; not lead list.
  3. **True multi-channel** (WA + Telegram + email + web) vs WA-first inboxes.
  4. **Meeting logistics + preference+availability** (nobody else in this list has calendar+availability).
  5. **Logistics intelligence (WISMO, DNR, scan-gap, proactive delay)** with a real audit trail.
  6. **Owner lifecycle-funnel view** (not message counts) + escalation/inaction governance.
  7. **Compositional SMB→corporate core** (SLAs, roles) — none of the ₹1–5k tools can serve corporates.
- Pricing signal: Indian SMB tools ₹499–2,999/mo. Tend's alpha (itself) canunderbid the inbox layer
  but must justify the decision-layer premium.

## Sources
Casekit WISMO playbook; LogisticsFF (7-day tracking delay, ecommerce tracking); WismoLabs (in transit,
scan-gap); RuntoDropship; ViveLead/Pariq/Whalexy/FloCRM/Tanvik pricing pages; Reddit LeadsLoom/Heep/n8n.
