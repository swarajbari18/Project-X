# How does a grant end, and how does role change affect authority?

## Why this question exists

This question came from the "Business View and Authority" section that we merged into this category. It asks how authority changes when an employee leaves, becomes unavailable or changes role — and more broadly, how a grant comes to an end.

## Our answer

When someone leaves, becomes unavailable, or changes role, Tend does not silently keep treating them as the owner or approver.

- When a grant names a **person**, and that person leaves or becomes unavailable, the grant must be re-evaluated. Tend must not keep treating them as the active holder.
- When authority is tied to a **role**, the identity holding the role may change, and the grant follows the role. The person who steps into the role then holds the authority — and is accountable for what they do with it.
- When an employee changes role, their previous grants do not silently persist. The authority and fallback rules determine what happens next.

## Grant lifecycle

A grant has a lifecycle: created, active, changed, and ended. Each change must remain traceable.

- **Created** — by the configurator.
- **Active** — while the holder is available and the grant is in force.
- **Changed / revoked** — by the configurator.
- **Ended** — when revoked, expired, or the holder leaves / becomes unavailable.

The trace of when a grant was in force is what lets accountability resolve correctly: for an action taken at time T, the relevant question is who held the authority **at time T**, not who holds it now.

## Role vs person

A grant may name a person or a role. This matters for survivability:

- Person-grant: precise, but breaks when the person leaves.
- Role-grant: survives turnover, but then someone must be accountable when the holder of the role acts.

The business can choose either, and may use a mix. The important rule is that a grant always resolves to a verified, currently-valid holder — not to a name that no longer has that authority.

## What remains open

- Whether every grant should prefer roles or persons (business choice, not a default we invent).
- How unavailable-but-not-left is handled (coverage / delegation), which connects to Human Collaboration and Coordination.
- How a role change mid-action is handled (the traceability question).

This is business-specific and role-specific configuration, but the underlying rule — never keep an expired or invalid holder active — is a product invariant.
