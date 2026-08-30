# How should Tend decide what information each employee, customer, or external partner may see?

## Where this question came from

Level 1 asks how Tend decides what each employee, customer, or external partner may see. Product Vision gives the concrete case: the employee working a delivery problem sees the whole picture; the delivery partner sees only the tracking number, never the customer's private details; who sees what is "a rule the business controls."

This was the one question in the category with no prior answer. It required real research on how corporate workflow scopes visibility, so it could be scaled down to SMBs and solopreneurs.

## What corporate practice and the law actually say

The research spine is clear:

- **Corporate practice separates "what a person may do" from "what a person may see."** RBAC and helpdesk scope are two knobs: an agent has a role (permissions — actions) and a visibility scope (which data). Both point at the person's job seat, not at a per-message rule.
- **Privacy law makes narrow default scope mandatory.** GDPR Article 25 (data protection by design and by default) requires that "by default personal data are not made accessible without the individual's intervention to an indefinite number of natural persons." A wide-open visibility default is not just a product choice — it is against the law in many markets.
- **India's DPDP makes the brand the Data Fiduciary.** The business carries the liability for how processors and partners handle customer data. So the *minimum* is a legal line, and the *assignment* of who is let in belongs to the business, not to the product.

## The two ideas inside "we configure the visibility"

Swaraj's raw thought was that the product builders should fix the visibility and not let businesses configure it, because open configurability is a compliance risk. That instinct is right, but it folds two different claims together, and separating them is the whole shape of the answer:

1. **Fixed inside Tend (the product builders): the scope model.** The roles, the partner scopes, and the default "nobody sees more than the task needs." This is what we write. The business never builds a visibility matrix from scratch.

## The decision: Path 2 — a narrow, governed white-list zone

We explicitly chose the middle option. The picture:

- **Roles and partner scopes are pre-written by the product.** By default nobody sees more than the task needs. This default is legally required to be narrow.
- **The business gets a narrow, governed "widen within legal limits" zone.** It may choose a scope inside a white-list we define. It can always go *narrower*. It cannot go *broader* than the legal floor.
- **Assignment is the business's call.** We define the range of what a seat may see; the business decides who holds the seat and which partner is engaged. The legal floor and the white-list ceiling are ours; the people-in-seats is theirs.
- **Anything outside the white-list is refused, and the need becomes a visible product signal** — never a silent grant, never a widening past the floor.

## The external partner leg

The partner is a separate organisation with its own responsibility, exactly as the Meetings category already established. The partner sees only what the engaged task needs — the tracking number, the problem, the requested action — never the customer's private record beyond the business's approved scope. "How much the partner may see is a rule the business controls" (Product Vision) means: the range is pre-written by us, the partner *engagement* is chosen by the business, and Tend enforces the intersection.

## The solopreneur is answered by a prior decision

A one-person business has one seat, and the owner occupies it. There is nothing to assign and no config screen. This is the same default-range shape Authority already decided: small business ships with a default range, roles narrow it as the team grows. So the solopreneur default is simply "the operator sees what the operator needs to run the business" — determined, not configured.

## The boundary

- We own the *permission leg*: the pre-written scopes, the white-list zone, and the business-assignment of seats and partners.
- The exact legal "minimum" and the white-list ceiling per market, plus DPDP/GDPR responses, carry to Compliance & Security.
- How masking is implemented and how the matrix is enforced technically is Level 3.

## Working decision

Actor visibility follows Path 2: the product pre-writes role and partner scopes with a narrow default (legally required); the business gets a narrow, governed "widen within legal limits" white-list zone and can always go narrower but never beyond the floor; assignment of which person sits in which role and which partner is engaged is the business's call because the law makes the business the fiduciary. Anything outside the zone is refused and surfaced, never silently granted.

## Related

- The visibility baseline (Explainability): [`../explainability_and_observation/understanding_all_explainability_and_observation_questions.md`](../explainability_and_observation/understanding_all_explainability_and_observation_questions.md)
- Effective permission = grant ∩ system permission (Authority): [`../authority_and_ownership/understanding_all_authority_and_ownership_questions.md`](../authority_and_ownership/understanding_all_authority_and_ownership_questions.md)
- External partner scoping (Meetings): [`../meetings_and_human_work/how_should_an_external_partner_be_contacted_when_the_business_has_not_acted.md`](../meetings_and_human_work/how_should_an_external_partner_be_contacted_when_the_business_has_not_acted.md)
- The default-range small-business shape: [`../authority_and_ownership/who_may_grant_authority_and_what_comes_by_default.md`](../authority_and_ownership/who_may_grant_authority_and_what_comes_by_default.md)
2. **Chosen by the business, only as assignment:** which employee sits in which role, and which partner is engaged for which purpose. This cannot be removed. The law puts it on the fiduciary/controller. If the product also picked the people and the partner engagements, it would be taking away the very responsibility the law assigns to the business.