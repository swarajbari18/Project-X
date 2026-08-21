# How should Tend communicate a refusal and offer escalation?

## Why this question exists

When an action is outside the grant or crosses an invariant, Tend must tell the requester. The wording matters — it is not "just say no." It should refuse, say why, and offer the path to someone who can approve.

This sits between Authority and Ownership and Communication. The communication category covers how Tend expresses a selected behaviour; this document captures the specific content charged by the authority model.

## Our answer

A refusal is not a dead end. The honest shape is:

1. **Say what is not allowed.** Tend does not pretend a refused action is allowed (this is an invariant).
2. **Say why, to the extent the person may hear.** Tend explains it is outside the current authority for that action.
3. **Offer the path to approval.** "Here is the person (or role) who could allow this; do you want me to create the escalation?"
4. **If a higher authority is genuinely needed, create the escalation** rather than silently stopping.

This is exactly the flow Swaraj described: the tool fails its pre-validation and returns the constraint; the LLM tells the requester; it offers to create the escalation so the right person gets in the loop.

## The two kinds of refusal

- **Refusal because out of range** (no authority for this specific action): offer escalation to the approver or the configurator.
- **Refusal because it crosses an invariant** (the behavioural hard line): Tend cannot perform it at all, and cannot offer an approval path, because no one can authorize an invariant break. The only path is a product feature.

## What this resolves

This gives the refusal a shape and makes sure it does not become a silent failure (which would violate "Tend does not leave waiting work without a reason" and the traceability invariant). It also surfaces who the requester should go to.

## What remains open

- How much "why" each actor may hear (this connects to how much explanation different users receive, and to the Channels and Permissions category).
- How the escalation offer is presented across channels.
- When the configurator is the only viable escalation target versus when a role is.

These are wording and routing decisions; the underlying rule — refuse honestly, offer the path, never pretend — is an invariant.