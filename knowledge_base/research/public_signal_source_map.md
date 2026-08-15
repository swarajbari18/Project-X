# Public-Signal Source Map — Where the truth actually lives

Goal: build a repeatable map of HIGH-SIGNAL public (non-paywalled) sources per persona/journey,
so we can extract pain, gaps, and demand without paying for data or trusting low-signal platforms.

## Verified access matrix (browser-tested today)
| Platform | Access | Notes |
|---|---|---|
| Grok.com (X search) | ✅ logged in | Live X search w/ cited posts; primary X decoder |
| Reddit | ✅ logged in (u/CommunicationAny6417) | Search + threads work |
| Facebook | ✅ logged in (Swaraj Bari) | Groups/Marketplace/news feed visible |
| Instagram | ❌ blocked (login wall) | User confirmed account blocked; use FB/other instead |
| LinkedIn | ⚠️ not high-value (explicitly deprioritized) | User: "AR slop, 80% don't know what they're talking about" |
| Hacker News | ✅ public | builders/early adopters |
| Indie Hackers | ✅ public | founders/builders |
| Telegram (t.me) | ✅ partial public | public channels readable via t.me links + web |
| WhatsApp Business / Meta docs | ✅ public | compliance source of truth |
| Stack Overflow | ✅ public | integration pain/patterns |
| Quora | ✅ mostly public | India small-business segment |

## NON-web / guarded-but-valuable places (and their access)
- **Facebook Groups** (Indian SMB groups, local city business groups) — need login ✅ but ALGO-FED;
  "Facebook shows what it wants" (user's note). Use search + groups deliberately. Not reliable for
  comprehensive coverage; treat as opportunistic.
- **Instagram** — blocked. Alternative: use FB pages + web search cache + #hashtag pages (public viewing
  works on web for some profiles; DM-level and creator content requires login).
- **WhatsApp** — closed. Cannot browse; must come from user interviews / public screenshots / Reddit.
- **Discord servers** (SMB/founder/dev communities) — login-gated, invite-only; low return for SMB personas.
- **Private FB groups** — need membership; some visible without joining.

## High-signal PUBLIC sources (no login) for each journey
### Prospect / nurture / sales-inbound
- Reddit: r/smallbusiness, r/Entrepreneur, r/ecommerce, r/IndiaBusiness, r/StartupsIndia, r/AskIndia
- X via Grok: founders/SME ops chatter
- Indie Hackers: founder narratives on customer acquisition
- YouTube: Indian SMB marketing/WhatsApp guides, D2C seller vlogs (comments = voice of customer)
- Google Trends: verify "WhatsApp business" vs "email support" vs "chatbot" interest in India

### Support / escalation / SLA / logistics
- Reddit: r/logistics, r/supplychain, r/callcentres, r/customerservice, r/AskSupplyChain
- X: outage/complaint threads (bypass @customer support complaints)
- Meta docs + WhatsApp Business pricing pages
- Courier/player docs (DTDC, Delhivery, Blue Dart, Shiprocket, Delhivery) — public APIs/docs,
  developer portals → tracking-payload knowledge for "where is my order" direct answers

### Feedback / retention
- X: "I never got a feedback request" / brand complaint threads
- Reddit: rant patterns about no follow-ups, poor post-purchase experience
- Google Play / Apple App Store reviews of D2C shopping apps (loads of voice of customer:
  delivery delays, no response, refund friction) — PUBLIC, high-signal
- Trustpilot/Google reviews of SMBs (public)

### Owner / dashboard / ops
- X (via Grok): "founder dashboard" / "vanity metrics" threads (already validated: 56 sources)
- Indie Hackers/Reddit r/SaaS: "metrics that matter" threads
- Shopify community forums (public): merchant dashboard needs
- G2/Capterra reviews of Intercom, Zendesk, Freshchat, Tidio, Respond.io (public; pain points)

### Employee / internal operations
- Reddit: r/smallbusiness "drop tasks", r/consulting "escalation", r/ITSupport "tickets"
- X: "no one responds" threads
- Stack Overflow / n8n/Zapier forums: integration pain

### SMB → corporate scaling
- Gartner/Forrester free summaries on enterprise service management & SLA (paywall for full, but
  abstracts + public articles usable)
- Zendesk/Intercom/Freshdesk blog case studies (public; describe SMB vs enterprise patterns)
- ITIL/ITSM public docs (service desk + escalation model)

## How to run the "good social network observational loop" (the user's ask)
1. Pick a journey (e.g., prospect→customer).
2. For each relevant platform: 3–5 targeted searches (with/without India, with/without "small business")
3. Pull the actual VOICE-OF-CUSTOMER excerpts + source URLs into findings_<platform>.md
4. Tag themes → map to circles.
5. Often, "we don't get signal from FB" → switch to app-store reviews / review sites / Google Trends
   for that segment (user explicitly OK: "if not getting from FB, leave it, not compulsion").

## Social-listening free tiers (supplementary)
- Google Alerts: brand/topic mentions
- Mention/Brand24/Hootsuite free tiers: limited, noisy
- Talkwalker free: limited
- Not replacing manual sourced research above; only for ongoing monitoring later.

## User's guidance encoded
- Reddit = "addresses the left mindset" (SEA, engineering, discourse) — good for thinking/multiple
- X = "all kinds of people" → high-value signal (founders, operators, VCs)
- FB/IG = "customers are here" → real-world SMB owner psyche; FB shows what it shows; IG blocked.
- LinkedIn = "AR slop; 80% talking who don't know crap" → DEPRIORITIZE entirely.
