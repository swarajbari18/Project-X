# Business Journeys Map — Everything that flows through Tend

Working document. Goal: enumerate EVERY journey that touches Tend and find the gaps/ambiguities
the Product Vision + Level-1 framing do not yet cover. Hypothesis-first; verify during research.

Status legend: [Covered] = vision/level1 already handle it · [Partial] · [Gap] = missing.

---

## 0. Orientation — what Tend actually is

Tend is the **agency layer for a business's communication and operational coordination**.
It receives events and instructions, builds or updates situation models, gathers what is needed,
decides within authority, communicates with the relevant actors and systems, waits for the next
event, and continues until the situation reaches an honest outcome or a person must take over.

This includes customer support and commercial journeys, but is not limited to inbound customer
interaction. If the owner gives Tend a product, a purpose, and a permitted list of people to
contact, Tend can coordinate bounded outreach, follow-up, nurture, meeting-setting, and the
next operational steps. Tend does not need to own lead discovery, marketing strategy, pricing,
or the business systems that provide the underlying facts. An external lead-finding agent may
provide candidates; Tend can evaluate the supplied information and own the resulting
communication and coordination when the business has granted that responsibility.

Tend is NOT an ERP/CRM/accounting system — it works alongside them. It is also not a collection
of chat threads: one situation is one operational storyline, and one instruction can create many
individual situation models plus an aggregate business artifact.

Design principle (from user): **composition over enumeration.** Group responsibilities by business logic
(the things that change together), NOT by computer-science module. No ad-hoc "agent runs raw SQL" CRUD.

---

## 1. Commercial relationship journey  [Partial]

The user's core point: a person does NOT start as a "customer." They may start as an
unknown actor or a **lead/prospect**, and the source can be an inbound message, a business
instruction, a CRM event, a partner, or an external lead-finding agent.

Stages:
1. A person or organisation enters a business situation through an event, an inbound inquiry,
   or an owner/employee instruction. Tend records the source and the intended purpose.
2. Tend builds one situation model for that relationship and gathers the relevant business
   knowledge, employee input, system facts, or agent-provided claims.
3. Tend communicates through an allowed channel when the purpose, authority, source, privacy,
   and channel rules permit it. This may be an answer to an inbound question or a business-
   directed introduction.
4. The relationship and situation evolve through replies, time, meetings, payments, purchase
   events, or explicit decisions. Nurture is a bounded continuation of a real business purpose,
   not an unbounded campaign.
5. The person may ask for human assurance, request a meeting, buy, ask for time, or stop.
6. Tend schedules and coordinates the meeting or next operational step, captures the outcome,
   and continues the individual situation when a permitted follow-up is due.
7. The owner sees an assignment artifact and individual situation artifacts: current state,
   latest event, next responsibility, waiting reason, evidence, and attention needed. They do
   not need thirty separate chats to understand thirty paths.

GAPS:
- What defines "prospect stage"? Who/which rule set? Per-business config?
- What triggers nurture (time-based, event-based, or business rule), and what ends it?
- How is "prospect → customer" conversion recorded? Who owns that transition?
- How do channel permission, consent, privacy, and business authority constrain an initiated
  message, especially on WhatsApp and email?
- Which events and capabilities are available in the first version?

---

## 2. Sales / conversion journey  [Partial — under-defined]

- A person supplied by the business, an external agent, or an inbound inquiry turns into intent
  to buy.
- Payment method matters: UPI prepaid / COD / card / invoice. Changes downstream (logistics, refunds).
- Post-decision: follow-up with next steps (invoice, order placement, onboarding).
- Tend owns the permitted communication and coordination around the sale; the payment/order
  system remains the system of record.

GAPS:
- Where does the "order/invoice" live? Tend coordinates, does not own.
- What happens on abandoned purchase / re-engagement? Business rule window and channel permission?

### Owner-directed outreach walkthrough

The owner says: “Here is our product, here are thirty people, and here is the purpose. Introduce
the product, answer reasonable questions from our approved knowledge, follow up within these
limits, and set up a meeting with me when someone is ready.”

Tend creates thirty individual situation models, not one thirty-person conversation. Each model
has its own identity, evidence, messages, waits, channel constraints, replies, next behaviour,
and outcome. A separate assignment artifact shows the aggregate: not started, message sent,
waiting, replied, qualified, meeting requested, meeting booked, converted, stopped, or needs
the owner's decision. A reply from person 7 wakes situation 7; it does not make Tend re-run or
expose the other twenty-nine stories. The owner can search for a name, filter by state, inspect
the evidence behind a recommendation, or intervene in one situation. This is the operational
shape that the product UI must eventually make visible.

If the business later connects a lead-finding agent, that agent may supply the thirty candidates
or enrich them. Tend need not scrape the internet itself. It must treat the agent's output as
sourced information to evaluate, not as truth, consent, authority, or a message to send. Once
the business has granted the purpose and scope, Tend can own the communication and operational
thread that follows.

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

- After delivery, the business may want feedback — but with a **window** (e.g., default 2 weeks)
  so the customer has used the product. The same pattern can apply to a business-supplied
  prospect or an employee/customer situation when a clear purpose and permission exist.
- Channel choice is part of the situation's permission and channel rules; email may be suitable,
  while WhatsApp and other channels have business-initiated messaging constraints.
- Retention: the same customer returns → now a CUSTOMER, not a prospect. Only new people are
  prospects, but the situation may still be newly opened for the returning customer.
- Conversion rate prospect→customer is low → bounded nurture may matter.
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
  Owner wants the **business-work snapshot**: how many situations are active, waiting, progressing,
  converted, conflicted, at risk, or requiring an owner decision.
- Owner wants to **search and inspect artifacts**, give a preference or instruction, ask
  "elaborate on what happened here," intervene in one situation, and then let Tend resume.
- Owner may give Tend a bounded assignment — for example, a product and a list of thirty people
  to contact — and expect Tend to own the communication and operational follow-through while the
  owner sees the aggregate and exceptions.
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

- First real user = the founder. Goal: make the product available through the site/channels,
  let Tend handle the resulting customer or prospect situations, and demonstrate Tend by
  having it coordinate its own bounded commercial follow-through.
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

To research: whether corporates have fundamentally different communication and operational-coordination needs
(ticketing, SLA, multi-team routing) that a small-biz model must grow into without redesign.

---

## 13. Grouping pain points into "circles"

Principle: group the pain points that naturally occur and change TOGETHER into one solvable unit.
(Tind the natural seams — compose, don't enumerate.)

Candidate circles:
A. **Situation and relationship lifecycle** — unknown/lead/prospect→customer→support→repeat,
   with situations also beginning from business instructions, systems, agents, or time.
B. **Gather & verify** — know what's known/unknown/conflicting, from systems + people. (Level-2 core.)
C. **Agency: decision & action** — enough info, which next step, approval rules, and event-driven continuation.
D. **Human collaboration & escalation** — routing, escalation ladder, meeting scheduling.
E. **Memory & knowledge** — KB, situation history, business knowledge, feedback loop.
F. **Channel & compliance** — each channel's rules for in/outbound messaging.
G. **Privacy & trust boundaries** — data scoped per actor; audit trail.
H. **Owner/governance** — admin, authority, snapshot, intervention.
I. **Observability & explainability** — trace everything, explain decisions.

These circles map to modules that change together; they should become the seams for architecture (Level-2).

---

## Known unknowns to resolve via research
1. What does "nurture" mean concretely per business; what triggers it and what ends it?
2. Where exactly do order/tracking/payment signals come from (which systems, what cadence)?
3. Escalation ladder topology across industries.
4. Meeting-type + availability semantics.
5. Channel outbound-compliance matrix (WhatsApp, Telegram, email).
6. Owner dashboard: the real metrics owners care about, in their words.
7. SMB→corporate: which parts genuinely reform vs extend.
8. Privacy/data-scoping rules for external-partner contact.
9. How should assignment, situation, attention, evidence, and outcome artifacts support an owner
   who is supervising many autonomous situations without opening each chat?

(To be filled in as research returns evidence.)
