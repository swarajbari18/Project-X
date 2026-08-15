# Business Journeys Map — Everything that flows through Tend

Working document. Goal: enumerate EVERY journey that touches Tend and find the gaps/ambiguities
the Product Vision + Level-1 framing do not yet cover. Hypothesis-first; verify during research.

Status legend: [Covered] = vision/level1 already handle it · [Partial] · [Gap] = missing.

---

## 0. Orientation — what Tend actually is

Tend is a **communication & operational-decision layer** for inbound customer interaction.
It is NOT sales/marketing/outbound prospecting. But inbound inquiries that *lead* to a sale are in scope.
It is NOT an ERP/CRM/accounting system — it works alongside them.

Design principle (from user): **composition over enumeration.** Group responsibilities by business logic
(the things that change together), NOT by computer-science module. No ad-hoc "agent runs raw SQL" CRUD.

---

## 1. Prospect journey  [Partial]

The user's core point: a person does NOT start as a "customer." They start as a **prospect**.
Level-1 only has one actor "Customers." This is the biggest framing gap.

Stages:
1. Inbound inquiry via any channel (WhatsApp / Telegram / email / web chat).
2. Tend answers from Knowledge Base if answer exists.
   - KB was created (from past Q&A, docs, FAQ).
   - If answer does NOT exist → Tend contacts the right employee, gets info, relays to prospect.
3. Multi-turn: prospect keeps asking questions; same flow repeats (gather → decide → reply).
4. Tend nurtures based on **prospect stage** (cold / engaged / considering / hot).
5. Prospect wants human assurance → requests a 1-on-1 call.
6. Tend schedules a meeting (see Meeting journey).
7. Prospect either: (a) buys now, or (b) wants time to think.
   → both require Tend to capture meeting content and compute next follow-up action.

GAPS:
- What defines "prospect stage"? Who/which rule set? Per-business config?
- What triggers nurture (time-based? event-based? business rule)?
- How is "prospect → customer" conversion recorded? Who owns that transition?
- Opt-in / consent / data-privacy for reaching out (esp. WhatsApp outbound — Meta compliance).

---

## 2. Sales / conversion journey  [Partial — under-defined]

- Inbound inquiry turns into intent to buy.
- Payment method matters: UPI prepaid / COD / card / invoice. Changes downstream (logistics, refunds).
- Post-decision: follow-up with next steps (invoice, order placement, onboarding).
- This is NOT outbound prospecting. It is inbound-turned-sale.

GAPS:
- Where does the "order/invoice" live? Tend coordinates, does not own.
- What happens on abandoned purchase / re-engagement? Business rule window?

---

## 3. Order / delivery / logistics journey  [Gap — largely missing]

The user's detailed scenario:
1. Customer buys; expects delivery in N days.
2. Customer asks "where is my order?"
3. Tend should answer DIRECTLY from live tracking (not "here's a tracking number, go to courier site").
4. Tend detects an **in-transit problem** (e.g., stuck in warehouse 7 days, not moving).
   - Signal must come from somewhere: customer complaint, stale tracking, delay threshold.
5. Tend raises an internal escalation with a **chronological, auditable trail** (not a bare summary).
6. Two resolution paths:
   a. Employee resolves internally.
   b. Tend directly contacts the logistics partner's named rep (registered in Tend contact book)
      — if employee is not responding / via escalation.
7. Data-scoping: customer data given to logistics partner is LIMITED (tracking #, not full customer identity);
   internal employee gets full trail.
8. Note: Tend did NOT solve the logistics problem. The delivery partner did.
   Tend only **facilitated communication**. This is the "communication layer" thesis.

GAPS:
- Tracking data source: which field/frequency? Who pings courier APIs?
- Delay detection: who defines "too long"? Business rule per product/route.
- Escalation policy: how many attempts, how long before jumping to partner?
- Data-sharing contract with external partner: what's allowed, what's audited.

---

## 4. Support journey (pre/post delivery)  [Covered-ish at Level-1, but shallow]

- Returns, refunds, exchanges, damaged goods, "wrong item," usage/installation help.
- Support requires the same gather → decide → reply, plus possible human handoff.
- Support may need sales history + order + payment + delivery context combined.

GAPS:
- Which support issues auto-resolve vs need human? Business rule.
- Refund/return authority: who approves? Employee? Auto? Needs policy + audit.
- Multi-channel support continuity (WhatsApp then email then call) — the SAME situation.

---

## 5. Feedback & retention journey  [Gap]

- After delivery, business wants feedback — but with a **window** (e.g., default 2 weeks) so customer has used the product.
- Channel choice: email is safest (Meta/WhatsApp has rules about agents initiating outbound conversations).
- Retention: same customer returns → now a CUSTOMER, not a prospect. Only new people are prospects.
- Conversion rate prospect→customer is low → nurture matters.
- Repeat customer / referral / loyalty.

GAPS:
- Feedback window: business rule, default 2 weeks.
- Outbound-initiated messaging compliance per channel (WhatsApp business-initiated vs session).
- How feedback is stored → feeds KB / product improvement / testimonials / social proof.

---

## 6. Meeting scheduling journey  [Gap]

- Why: human assurance for prospect; support call for customer; sales rep availability.
- Scheduling is NOT just "calendar is free."
  - Available in calendar ≠ actually available (busy in general, focus time).
  - Per-employee **preferences**: business hours for meetings, meeting TYPES accepted
    (sales call vs support call vs onboarding), location/format (call, video, in-person).
  - Who is the right person for THIS meeting type + this customer.
- Meeting itself: multiple note-taking tools exist → Tend integrates them (do not build).
- Meeting outcomes: customer buys / wants time / asks follow-ups → drive next steps.

GAPS:
- Availability semantics: calendar-derived + preference + override. How merged?
- Meeting type taxonomy → routing rule.
- No-shows / reschedules / cancellations: who follows up, when?

---

## 7. Escalation / inaction journey  [Partial — mentioned but thin]

Level-1 notes "inaction within the business by ways of escalation" as a *challenge*,
but does NOT define the escalation model.

- If an employee does not act (per rule), Tend escalates: retry → remind → escalate up → replace actor.
- If a human can't resolve, Tend may contact an external actor DIRECTLY (logistics partner contact).
- Escalation needs a **governance model**: who can be escalated to, in what order, after how long,
  with what level of data visibility.

GAPS:
- Escalation ladder definition (steps, timeouts, order).
- What EXACTLY happens if nobody responds? (Ticket sits? Auto-close? Owner notified?)
- Audit: full chronological trail for internal; scoped subset for external.

---

## 8. Employee journey  [Gap — almost entirely missing]

- How employees connect: their contact info, what they consent Tend to access, permissions.
- Employee profile drives routing (meeting types, domain, availability, preferences).
- Employee receives info-requests, approval-requests, escalations — but may be busy / away / on leave.
- Forward-deployed / GTM engineers want to initiate customer interaction (e.g., outreach to feedback-givers).
- Employee-side story differs from customer-side. Under-modeled.

GAPS:
- Employee onboarding, role taxonomy, permission levels, consent to be contacted.
- Override: when is an employee's stated availability overridden by real load?
- Who is the fallback if the "right" employee is unavailable?

---

## 9. Business owner / administrator journey  [Gap — almost entirely missing]

- Owner may not have time to set things up → delegates to assistant / family (father → son).
- Authority & administration hierarchy: who can configure, approve, delegate, revoke.
- Owner does NOT want "you handled 500 messages" or "uptime 99.9%" dashboards.
  Owner wants the **lifecycle snapshot**: how many prospects, in nurture, conversions, conflicts, revenue at risk.
- Owner wants to **intervene** (chat back to Tend, give preference, ask "elaborate on what happened here"),
  then resume.
- Setup: assistant who knows the business sets up channels, KB, rules, integrations.

GAPS:
- Admin/authority model & delegation.
- Owner "snapshot" view: what business metrics, what drill-down, what intervention actions.
- Who configures what (owner vs assistant vs employee).

---

## 10. Compliance & security journey  [Gap — only touched at end of Level-1]

- Each channel has channel-specific compliance (WhatsApp Business-initiated messaging rules; Telegram; email SPAM/CAN-SPAM; regional DPDP/GDPR).
- Data privacy: what of the customer's data is shared with each actor (employee full, external partner limited).
- Identity, authentication, audit, retention, consent.

---

## 11. The Alpha case (dogfood)  [Gap — strategic]

- First real user = the founder. Goal: do marketing → people come to the site/channels →
  Tend interacts, nurtures, helps SELL Tend → demonstrate the product to prospects via the product itself.
- Tend selling Tend. One actual alpha/pre-product case.
- Then simulation environments for OTHER business types.

This is a real scenario the product must survive, and it will surface gaps first-hand.

---

## 12. SMB → Corporate scaling question  [Open]

Original question: does the model scale as-is from small business to corporate, or need major reform?

Working hypothesis (verify):
- The CORE (communication + situation understanding + decision + escalation) is **vertical/domain-agnostic**
  and scales up naturally.
- What changes with size: number of actors, permission/approval depth, audit/compliance requirements,
  system-of-record coupling, meeting/availability complexity, org structure for escalation.
- So the model likely needs **compositional extensions** (more roles, more systems, deeper escalation)
  rather than a different core. This favours a **compositional design** where the "business logic units"
  are independently extensible.
- Horizontal industries (construction, IT, etc.) are NOT targets; every industry shares the same
  communication/decision layer.

To research: whether corporates have fundamentally different inbound-communication needs
(ticketing, SLA, multi-team routing) that a small-biz model must grow into without redesign.

---

## 13. Grouping pain points into "circles"

Principle: group the pain points that naturally occur and change TOGETHER into one solvable unit.
(Tind the natural seams — compose, don't enumerate.)

Candidate circles:
A. **Situation lifecycle** — prospect→customer→support→repeat. The through-line that Level-1 lacks.
B. **Gather & verify** — know what's known/unknown/conflicting, from systems + people. (Level-2 core.)
C. **Decision & action** — enough info, which next step, approval rules.
D. **Human collaboration & escalation** — routing, escalation ladder, meeting scheduling.
E. **Memory & knowledge** — KB, situation history, business knowledge, feedback loop.
F. **Channel & compliance** — each channel's rules for in/outbound messaging.
G. **Privacy & trust boundaries** — data scoped per actor; audit trail.
H. **Owner/governance** — admin, authority, snapshot, intervention.
I. **Observability & explainability** — trace everything, explain decisions.

These circles map to modules that change together; they should become the seams for architecture (Level-2).

---

## Known unknowns to resolve via research
1. What does "nurture" mean concretely per business; what triggers it?
2. Where exactly do order/tracking/payment signals come from (which systems, what cadence)?
3. Escalation ladder topology across industries.
4. Meeting-type + availability semantics.
5. Channel outbound-compliance matrix (WhatsApp, Telegram, email).
6. Owner dashboard: the real metrics owners care about, in their words.
7. SMB→corporate: which parts genuinely reform vs extend.
8. Privacy/data-scoping rules for external-partner contact.

(To be filled in as research returns evidence.)
