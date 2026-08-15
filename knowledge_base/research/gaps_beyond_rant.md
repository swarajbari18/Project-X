# Gaps & Ambiguities BEYOND the user's rant — researcher-added (hypotheses)

The user asked: "even my rant has gaps of realities that I don't know right now — that's when your
thought process and reasoning and research comes in." These are the gaps I found beyond their list.

## A. Gaps in the jestrict itself (things the rant did not mention)

1. **Single-owner businesses have a past-life on multiple apps despite one owner.** The worst pain is
    "who responds first wins" + "owner is bottleneck". Tend's value propo must be "never miss a lead /
    never lose a customer because you slept" — not just "organize conversations."
2. **Prospect qualification happens in-chat, before nurture.** The sale may be won/lost in the FIRST
     interaction (speed). Nurture matters less for high-intent inbound; it's for non-urgent future-ready.
    → Tend's nurture engine must NOT cadence-spam an inbound with "are you still interested?" —
    it must re-qualify + respond when it adds value.
3. **Meeting scheduling has a second dimension missing:** not only WHO is available, but WHO is
   ALLOWED/allowed to represent the business (sales authority), AND whether the meeting is even
   approvable (e.g., small business owner only takes calls before 10am for new customers).
   → availability + policy + preference + role-ladder (sales vs support vs onboarding).
4. **The "customer" is not one person.** In B2B/B2C: the buyer, the user, the gatekeeper, the payer
   can be different people (esp. for high-ticket services). Knowledge of WHO is on the other side
   matters for language, tone, and follow-up.
5. **Refund/returns are HIGH-STAKES and highly-scoped by policy.** Tend must not auto-refund ever by
   default; it must surface the policy, the authority and the audit trail. Payment provider signals
   (chargebacks) matter.
6. **Compliance beyond WhatsApp:** DPDP (India), GDPR, CAN-SPAM, PCI for payments chat,
   and the fact that PII (customer names/phone/addresses) cannot be freely shared with LOGISTICS
   PARTNERS unless the activation is contractual (this is why "give limited data" needs to be
   implemented as an explicit data-sharing contract, not spoken ad-hoc).
7. **Audit trail is not just for disputes** — it is for REPUTATION and FORENSICS: if a business is
   sued (negligent response), the platform records must protect the business. Every important action
   needs timestamp + actor + source evidence.
8. **Order-status semantics differ**: "delivered" (courier dropped) vs "received" (customer got it)
   vs "verified" (customer confirmed) vs "in-returned" — these create different social actions.
   If Tend says "delivered" to customer when courier says "delivered" that's possibly wrong (theft/false
   delivery is a huge complaint class).
9. **Customer "tone" matters for threat detection.** Some interactions are a: complaint about
   product+slow resolution → risk of fraud/chargeback/negative review/legal. Tend should detect the
   **risk grade** of a situation (escalate complaints early).
10. **"Reminder about a silent good customer"** — WAG (fully-silent high-value customer) pre-term
    (e.g., a plumber client who stopped calling for services, a subscriber who stopped coming) — the
    lost-opportunity signal: a loyal silent customer is a stored asset Tend should flag (with consent/
    rules).

## B. Systemic/structural gaps in the model itself
11. **One model vs multiple situations per customer:** Tend must support that a customer can have
   MULTIPLE open matters at the same time (an inquiry + an order + a support ticket) on different
   journeys, and that a single conversation can contain MULTIPLE situations (the Level-2 split).
12. **Ownership of "nurture state"** — nurture isn't just a prospect a stage; it's a callback
   (who owns the lead: the rep who scheduled the call). Ownership handoff between sales and support
   must be modeled (RACI-like) to avoid "someone else'll handle it."
13. **Modeling of the WINDOW/state** (prospect in 2-week wait for feedback; order in transit; a
   repair being fixed) — the system must represent "waiting" as a state with an alarm, not just
   "conversation open." This is a Level-2 concept #Coordination + #Time + #Memory that the Level-2
   docs have only partially explored.

## Whatever else that research returned (validated)
14. Speed-to-lead: verified conversions drop 8x after 5 minutes; only ~0.1% respond within 5 min.
    → Strong, metric-backed "buy" for Tend's value prop.
15. Most companies NEVER respond to an inbound lead (28% in 2011 HBR audit; 47% in XANT's larger
    2021 sample) — proving the "missing messages" pain is structural, not edge-case.

## These are the seeds to TEST with real users. Each becomes a Level-1 question or a binding
constraint for the design.
