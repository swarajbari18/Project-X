# How do we explain every action?

## The short answer

Same rule as recommendations: trace always, explain on demand. Every important action leaves a durable record of what was done, on what evidence, by whose authority, and why — available to anyone entitled to ask, proactively explained only to those who need it.

## Our answer

Actions already leave records scattered across categories: capability invocations in traces, state transitions as situation-model versions, waits as named wait records, approvals in Authority's grant machinery, failures as declared outcomes. This category's contribution is the completeness rule and the join:

1. **Completeness** — every action consequential enough for the audit carries: what was done, the evidence used, the authority under which it ran, the emitted reason-key, and the outcome.
2. **The join** — run IDs connect an action's reason to the fuller reasoning that produced it; version numbers place it in the situation's story; situation IDs place the story in the customer's journey graph.
3. **Delivery stays audience-dependent** — an employee approving a refund sees the reason for that approval request; a customer sees the outcome and next step; nobody sees anything they don't need.

Because the harness is the whole system and the LLM is only one component inside it, "action" includes deterministic steps, not just model-driven ones. A retry, a timeout declaration, a circuit-breaker trip — all actions, all recorded, all explainable.

## Boundary

- Which actor owns each action type (Authority and Ownership).
- When an action must pause for approval (Authority and Ownership).
- Storage and indexing of the audit trail (Level 3).

## Related

- [How do we explain every recommendation?](how_do_we_explain_every_recommendation.md) — shares decision D1.
- [How do we reconstruct an entire business situation after it has finished?](how_do_we_reconstruct_an_entire_business_situation_after_it_has_finished.md) — reading these records back as a story.
