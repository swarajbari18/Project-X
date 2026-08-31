# Research: what a business owner feels and wants, and the stakeholder journeys

Working research document. Purpose: capture the *felt* picture (breadth) and the *numbers* (depth) behind what a business owner wants from an event-driven communication + operational-coordination system, and the journeys of non-customer stakeholder personas. This document is split into two clearly-marked halves so you can tell where each conclusion came from.

Status legend: [Breadth = social signal] [Depth = published figures] [Inference] [Guess].

---

## Part A — Breadth: what owners feel (run via Grok, social mining)

Method: this pass was run with **Grok** in the open Chrome tab (grok.com) on the 2026 session, mining X/Twitter, Reddit (r/smallbusiness, r/Entrepreneur, r/sweatystartup, and similar), Facebook small-business groups, Meta Business, and owner forums. Grok reported mining **128 sources** for the owner pass and **63 sources** for the stakeholder pass. Source types are marked inside each finding. The owner pass and the stakeholder pass are two separate searches in the same Grok conversation.

### A1. The owner's felt picture (four strongest themes)

1. **"Nothing is silently stuck or missing."**
   - (a) Social signal: owners say "lose sleep," "dropped the ball," "customer went to someone else / booked elsewhere," "quietly left," "a customer who never complains but disappears." Chargebacks and friendly fraud produce explicit "lose sleep" language (e.g. a boutique retailer who lost ~$20k: "We still think about it and lose sleep over it...").
   - (a) Social signal: missed calls/messages and the "quietly left" customer. Owners track the lost revenue ("I sat down and actually tracked it... conservatively I lost over 10,000 dollars in jobs").
   - (a) Social signal: overnight 1-star reviews or "scam" accusations even after the owner tried to make it right; owners say these "can DESTROY a small business."
   - (b) Inference: the deepest fear is the *unknown* miss — the unread message, the stalled order nobody noticed, the chargeback window that closed while the owner was offline.
   - (c) Guess: the view that reduces this surfaces at-risk/stuck items with enough context to act or safely ignore overnight.

2. **Being the one-person bottleneck.**
   - (a) Social signal: trades/service owners come off a job at 6 pm, check the phone, and know most of the day's inquiries are gone. Virtual receptionist experiments fail because customers want real answers, not "someone will call you back."
   - (a) Social signal (and coaching echo): "Work stops when you're away," "Every decision, every approval, every customer conversation goes through one person."
   - (b) Inference: they want the routine coordination (gather truth, decide next step, communicate,
     route back, and wait for events) to keep moving without their presence, with escalation only
     for what truly needs them.

3. **No single truthful view.**
   - (a) Social signal: "tab roulette," "front-counter chaos," switching between email, texts, Facebook/Instagram DMs, Shopify, QuickBooks, carrier tracking. "Nobody has the full picture." WISMO ("where is my order") dominates support volume because status is not visible.
   - (b) Inference: the absence of a single coherent view creates constant low-grade anxiety; the tools feel like more work.

4. **Early, calm risk flags vs overnight surprises.**
   - (a) Social signal: anxiety = constant checking and "communication debt"; trust = routine work handled and risks surfaced early enough to act.
   - (b) Inference: the emotional payoff is the shift from "I have to be always on" to "I can step back and important things are still handled."
### A2. The words owners use (happy vs worst)

- Worst-fear: "lose sleep," "dropped the ball," "customer went to someone else / booked elsewhere," "quietly left," "destroy a small business," "everything falls apart when I'm gone," "I know in my gut most of those people were already gone."
- Happy (rarer, understated by contrast): "did not drop the ball," able to take a day off without the business stopping, "made it right," things "kept moving."

### A3. Stakeholder journeys (the non-customer personas) — breadth

Stakeholder relationships are **lower-volume, higher-stakes, document- and deadline-driven**. Owners experience them as intermittent "must-not-drop" obligations that interrupt ops. The other party usually holds leverage (capital, lease, compliance power, supply continuity) rather than buying something. Signals are thinner than for customers, so labeling is explicit.

- **Regulator / tax authority / inspector / site authority** — asks for: response to a notice, supporting documents, access, corrective-action confirmation. Good = on-time, complete, professional reply with the exact artifacts. Bad = missed deadline → penalties, liens, escalated visits. Owner preference: auto-acknowledge receipt, surface the deadline + required docs; escalate almost everything substantive to the owner or the owner's accountant.
- **Landlord / property manager** — asks for: certificate of insurance (COI), lease-aware docs, status on issues, rent confirmation. Slow paperwork "quietly kills deals" because platforms flag red and move on. Good = fast, accurate document drop without chasing. Owner preference: auto-generate/pull standard docs (COI, certificates) and send; escalate lease negotiations, disputes, unusual requests.
- **Supplier / vendor / partner** — asks for: PO/order status, payment confirmation, forecast, compliance certificates, onboarding docs. Good = quick reliable info. Bad = silence that forces them to hold shipments or choose another partner. Owner preference: auto-handle routine status and standard certificates; escalate payment disputes, contract changes, volume talks.
- **Media / journalist / community / chamber** — asks for a quote, interview, or data point. Bad = no reply or off-topic noise. Owner preference: auto-log and draft light responses; escalate anything shaping the public narrative.
- **Spouse / family / non-ops admin helper** — asks for visibility into status, and to pull routine numbers or documents without becoming the bottleneck. Good = clear hand-offs. Owner preference = give controlled visibility while keeping decision authority with the owner.
- **Investor / prospective investor** — "just wants to know how the business is doing": a health and growth snapshot. Lower frequency for most SMBs; handle as an escalation rather than a first-class journey in v1.

### A4. Grok's recommended priority for a first version
---

## Part B — Depth: the numbers behind the felt picture (run via my own web/fetch tools)

Method: this pass was run with the assistant's own web search and page-fetch tools, not Grok. Sources are mixed publisher/vendor figures; treat them as illustrative ranges, not audited truth, and re-verify before quoting as product claims.

### B1. Missed inbound and missed business events (the "bottleneck / anxiety" fear)

- Small businesses miss an average of **62% of inbound calls** (BIA); home-services higher at 62–70% (Invoca); after-hours often 85%+. (CallJolt 2026)
- Average revenue lost to missed calls: **~$75,000/yr** (industry figure per CallJolt); for a service business doing 30 calls/week at $500 avg ticket and missing 62%, ~$156,000/yr.
- 86% of callers reaching a service voicemail hang up without leaving a message (Invoca); 71% immediately call another business (BrightLocal); ~14% leave a voicemail and about half of those have booked elsewhere by callback.
- Response-time conversion: MIT found conversion odds drop **~21×** going from 5-minute to 30-minute response (a landmark ~1M-lead study). Live answer converts ~30–40%; next-day callback ~1–4%.
- (Note: "78% buy from first responder" is folklore/no primary source — our channel matrix already flags this as debunked.)

### B2. WISMO / order-status (the "no single truth" fear)

- Gorgias all-store average: **200–500 support tickets per 1,000 orders**; well-automated DTC brands run **40–100** (Eightx 2026).
- Expected vs actual response: email expected <1 hr, actual **8–12 hrs**; chat expected <1 min, actual ~3 min (Zendesk, Crisp via Eightx).
- Realistic AI deflection of live-agent tickets: **40–60%**, mostly WISMO/returns-initiation/top-3 product questions; upper bound 60–82% (Gorgias case), but CSAT drops above ~60% (Eightx).
- Proactive order notifications / self-ware reduce WISMO; ShippyPro claims WISMO reduction "up to ~65%."

### B3. Chargeback / loss-risk (the "quietly left" and reputation fear)

- 2026: every **$1 lost to fraud costs US merchants ~$5.13** (+~52.6% vs 2020).
- ~74% of merchants reported an increase in friendly-fraud chargebacks in 2024; average ~5.1 chargebacks per cardholder in 2025, each ~$84.
- Representment wins on average **44.6%** of disputed chargebacks, but net recovery is only **10.7%**.

### B4. The translation rule that follows

All the numbers above are **operational** — they describe how efficient the machine is. They are the levers that produce owner value, but they are not what the owner sees. The owner-facing snapshot (Business View) shows the **business value** those levers create: revenue-at-risk, stuck orders, at-risk customers, deadlines, and the specific items that need the owner. This is why Business View is a translation of these figures, not a dashboard of them.

### B5. Grok vs own-tools split (so we can be honest about it)

- **Breadth (Part A)** = Grok (social mining, 128 + 63 sources), direction set in the Chrome tab. Strong for the felt/intuitive picture; the source-by-source citations are thin because Grok returned themes + names + counts, not full permalinks.
- **Depth (Part B)** = the assistant's web search + fetch (published figures). Strong for concrete numbers.
- **Where they converge**: the felt "lose sleep, dropped the ball" themes are consistent with the depth numbers (missed calls/Loss, WISMO, chargebacks). So owner-value modeling can be grounded in the operational numbers without showing them.

## Related

- Business View: [`../Level 2/business_view_and_observation/understanding_all_business_view_and_observation_questions.md`](../Level 2/business_view_and_observation/understanding_all_business_view_and_observation_questions.md)
- Journey and Lifecycle: [journey_and_lifecycle docs]
- Channel matrix (CSW/FEP, where nurture may happen): [`wa_compliance.md`](wa_compliance.md), [`channel_compliance_matrix.md`](channel_compliance_matrix.md)
- Business journeys map (owner journey gaps): [`business_journeys_map.md`](business_journeys_map.md)

Supplier / vendor / partner; landlord / property; tax / compliance / regulator notices; and the internal spouse/family/admin helper. Investors and media are real but rarer; they can be handled as escalations once the core machinery exists. The shared thread: these parties want **reliable, low-effort access to truth or artifacts the business already possesses** — exactly what a coordination layer sitting in front of the business handles. This matches the decision to hold stakeholders as **situations** (with an obligation/ask ribbon) rather than as a fourth lifecycle.
