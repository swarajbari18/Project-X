# How do new business policies become part of Tend?

## Where this question came from

Level 1 asks how a business's own policy becomes part of Tend. Decision Making already defined what a policy must express: conditions, permitted behaviour, required evidence, authority, approval, timing, scope, exceptions, fallback. Memory said policy is not learned memory. Authority said the configurator writes grants and the invariants are a hard line. What Growth owns is the policy's lifecycle and its behaviour when it changes.

## First, separate three things that sound the same

- A **grant** decides *who may* do something (the owner may approve refunds above ₹2000). That is the Authority plane. Live.
- A **policy** decides *under what conditions* an action is permitted or required, and what proof and approval gate it. 
- A **workflow** decides *the ordered steps* that carry an action out.

"Refunds above ₹2000 require the owner" is a policy condition. Whether the owner holds the right to approve is a grant. The steps from request to refund are a workflow. Growth's documents define policies and workflows; the grant plane stays with Authority.

## The answer, in plain words

A policy is a typed, versioned record. The business fills in values inside structures the product pre-writes — it does not write free-form executable rules. A new policy joins through a lifecycle: draft → validate → activate → version → supersede or expire → retire. No version ever silently overwrites another (Memory's rule). A situation runs the policy versions it opened under; when the business changes a policy, the change is prospective and noticed; migrating in-flight situations is the owner's decision.

## Why not free-form rules?

The research counterexample is OPA — a powerful policy engine whose versioning, validation and trust are not built in. If a business could write arbitrary rules, we could not prove before production that those rules never guess, never hide a state, and never leak more than an actor needs. That proof is compulsory (the invariants). So the walls are: structured values only; product-defined schema; deterministic validation of schema, invariants and conflicts before activation; and anything outside the structures is a visible gap or a product request, never a scripting surface.

## The walkthrough (the refund threshold changes)

Monday: a refund situation opens. Policy v2 says "auto-approve under ₹5000", and the grant allows Tend to auto-approve that amount without a human.
Tuesday: the business activates policy v3 — "anything above ₹2000 needs the owner" — and separately revokes the auto-approve grant.
- New situations use v3 directly.
- In-flight situations under v2 are found by a notice/re-check wait on the spine: "you are running policy v2; the business activated v3. Keep or migrate?" — shown to the owner with a deadline.
- The grant is live: even if the owner says "keep v2", the auto-approve grant is gone, so an in-flight refund that needs ₹5000 cannot auto-approve. It escalates or waits. The harm the new policy was meant to stop is stopped.
- The owner can migrate the situation to v3 and approve it there. Everything is traceable: which version governed which step, and who decided the migration.

## Conflict and expiry

- When two policy versions would both claim to apply, version + activation time give a deterministic precedence. No runtime "common sense" decision-making.
- If a change is genuinely ambiguous about what it means for an in-flight situation, that becomes human work: the owner decides (Decision Making's fallback: create human work, escalate, or stop safely).
- A policy that expires (for example a promotion rule with an end date) is a Time event that wakes the situation on the spine.

## The boundary

- The shape a policy must have: Decision Making.
- Who may approve: Authority.
- Legal bounds on what a policy may allow: Compliance & Security.
- The policy lifecycle and its change semantics: this category.

## Working decision

Policies are typed, versioned records the business fills inside product-defined structures. They join through draft → validate → activate → version → supersede/expire → retire. In-flight situations run the versions they opened under; change is prospective and noticed (a wait on the spine); migration is a deliberate owner decision; execution-time authority stays live.

## Related

- Policy shape: [`../decision_making/how_do_we_represent_business_policies.md`](../decision_making/how_do_we_represent_business_policies.md)
- Change spine: [`how_do_we_evolve_tend_without_breaking_existing_businesses.md`](how_do_we_evolve_tend_without_breaking_existing_businesses.md)
- Grant plane: [`../authority_and_ownership/understanding_all_authority_and_ownership_questions.md`](../authority_and_ownership/understanding_all_authority_and_ownership_questions.md)