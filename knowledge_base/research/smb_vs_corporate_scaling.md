# SMB vs Corporate — Does the Tend model scale as-is?

Open question from the user: "can we just scale the small-biz model as-is to corporate,
or do we need major reform? Does the corporate model work on a smaller scale?"

## Framing
We are NOT targeting horizontal industries (construction, IT, etc.).
We target the **communication/decision layer** that every domain wants, across the VERTICAL:
single founder → SMB → corporate. So the question is: is small-biz Tend the same core
that a corporate uses, just more instances? Or a structurally different system?

## What the research says (SMB support vs Enterprise support)

Evidence-based differences between SMB and enterprise customer communication:

### SMB / small business (today's stated market)
- One owner is often the bottleneck; personal WhatsApp used as business channel.
- Few/no dedicated support staff; the "team" is 1-5 people, often with overlapping roles.
- Low ticket volume but HIGH fragmentation across channels (WhatsApp, IG, email, web chat).
- Escalation is informal: owner just handles it or asks one person.
- No formal SLA; response is "whenever the owner gets to it."
- Context lives in an owner's head + personal WhatsApp + Excel.

### Corporate / enterprise
- "Customer" is MULTIPLE stakeholders (buyer, IT manager, exec sponsor).
- Structured **ticketing + SLAs** by account tier and severity:
  - P1 (critical) first-response 15-60 min; named/priority escalation; exec notification.
  - Multi-level SLA: warning at 50% elapsed, escalate to supervisor at 75%.
- **Structured routing**: pooled → priority queue → named support engineer → senior/on-call.
- **Severity tiers**, **account tiers** (ARR-based), **RACI ownership**, **cross-team handoffs**
  (support → ops → logistics → finance → CS).
- Single source of truth / audit trail required; every action traceable.
- Multi-stakeholder communication; avoids inconsistent answers across teams.
- Higher cost-per-escalation; escalation is "political" (CTO emails CEO).

## The key insight for Tend

The CORE problem is THE SAME and scales naturally:
  understand situation → gather → verify → decide → act/escalate → explain/trace.

What CHANGES with size is not the core — it is a set of **dimensional extensions**:
- # actors & roles (1 owner → teams, named engineers, RACI owners).
- Depth of approval/authority hierarchy (owner-approves → multi-level approval gates).
- SLA/severity/tier granularity (informal → formal multi-tier SLAs).
- System-of-record coupling (owned spreadsheets → ERP/CRM/helpdesk/ticketing).
- Routing & escalation topology (owner → pooled queue → priority route → senior/on-call).
- Audit/compliance weight (basic → contractual SLA, regulatory, board-level).
- Meeting/availability complexity (1 person's calendar → many with preferences).

## Verdict (hypothesis)
Tend's core = **vertical, domain-agnostic communication/decision layer that scales up by composition**,
not by redesign. Small-biz is a special (simplified) case of corporate — same engine, fewer knobs.
So build the core to support compositionally-more-advanced extensions (roles, SLAs, escalation ladders,
approval depth), then SMB config = most extensions defaulted to simple values.

This strongly reinforces: **composition over enumeration; group by business-logic seams that change
together** (SLA + routing + escalation change together; approval + authority change together; etc.).
If we over-index on enumeration (hard-coded small-biz flows), corporate will force a redesign.

## Research questions still open
- How formal does the SMB owner actually WANT SLA/routing? (They don't want "tickets" — they want
  "not to miss a message.") → validate via Reddit/FB SMB chatter.
- Where does the SMB→corporate boundary sit per industry? (e.g., a 50-person logistics firm vs a D2C).
- Do corporates need inbox/ticketing UI, or is Tend purely the AI communication layer on top of
  their existing Zendesk/Intercom? → likely the latter for corporate.

## Note on "not horizontal"
Because Tend is the communication/decision layer, a D2C brand, a logistics firm, a service business,
and a corporate all have the SAME communication core even though their domains differ.
That is exactly why we don't pick horizontal industries — the layer is universal, and the domain
differences are handled by the business systems Tend coordinates with (not by Tend itself).
