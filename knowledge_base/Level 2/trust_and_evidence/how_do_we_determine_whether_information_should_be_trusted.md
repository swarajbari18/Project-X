# How do we determine whether information should be trusted?

## Status

Answered — working decision, pending review.

## Where this question comes from

Level 1 asks which sources of information a business should trust when systems and people provide different answers.

The initial wording made this sound like Project X had to decide whether a person, business system or external partner was telling the truth.

That is not Project X’s responsibility.

Each actor owns the information and operation that belongs to it. Project X coordinates the claims that those actors provide and determines whether those claims can be used safely in the current business situation.

The question is therefore:

> What deterministic checks must pass before a claim can be exposed as usable evidence for the current situation?

## The problem this responsibility solves

Project X may receive:

- a customer report;
- an employee statement;
- a business-system record;
- an external partner update;
- a policy or business rule;
- or a previous observation that may now be stale.

These are not interchangeable.

Project X needs to preserve where each claim came from, what it says, what it applies to and when it was observed.

It also needs a deterministic way to decide whether the claim can be used as evidence in the current situation.

This evaluation is not a universal truth test.

It is a product rule that produces evidence state and an explanation.

## What Project X evaluates

The evaluator should use the structured claim and the available business configuration.

The relevant inputs include:

- the claim subject;
- the claim property and value;
- the situation to which it is attached;
- the source actor or system;
- the source’s authority for that claim type;
- the observation time;
- the source revision or event;
- currentness information;
- deterministic comparison results;
- active conflicts;
- permissions and disclosure constraints;
- business rules;
- and whether a human approval rule applies.

The evaluator does not need to know whether the claim describes universal reality.

It needs to know whether the claim meets the configured conditions for use in this situation.

## Possible evaluation designs considered

### A source-level trust score

Project X could assign a general score to each source.

This was rejected.

A source can be responsible for one record and still provide a claim that is stale, incomplete or outside its authority. A source-wide score would hide those differences.

### A weighted evidence score

Project X could combine source authority, freshness, corroboration and other factors into a score.

This was rejected.

The product does not need a probabilistic or weighted evaluation model. Such a score would be difficult to define, difficult to explain and unnecessary for the deterministic business rules already required by the product.

### A reasoning-model evaluation

The reasoning model could decide whether a claim should be trusted.

This was rejected.

The reasoning model can fail in exactly the situations where evidence evaluation must remain predictable and auditable. It must receive evaluated evidence rather than perform the evaluation.

### Deterministic rules and business configuration

Project X evaluates claims with fixed rules and business-specific configuration.

This is the working decision.

The rules may say:

- which actor or system is authoritative for a claim type;
- how source data is matched to a canonical claim;
- how currentness is determined;
- which conflicts are material;
- which business rules resolve a conflict;
- which actions require approval;
- and which evidence states block an action.

The eventual implementation will enforce these rules in code. The Level 2 responsibility is the deterministic evaluation itself, not a technology choice.

## Evidence state and reason

Project X should not produce a numeric trust score.

The situation state remains explicit:

- known;
- unknown;
- conflicting;
- ambiguous;
- provisional; or
- stale.

The state is accompanied by a reason.

Examples:

- “Known because the payment provider is configured as authoritative for settlement status and the current claim matches the transaction identifier.”
- “Unknown because the responsible provider has not returned settlement information.”
- “Conflicting because the carrier record says delivered while the customer reports non-receipt for the same shipment.”
- “Stale because the last observation is older than the configured currentness rule for this delivery process.”
- “Blocked because the required claim exists but the current actor is not authorised to access it.”

The reason is part of the evidence context. It is not a score.

## What the reasoning model receives

The reasoning model receives the result of this evaluation:

- relevant claims;
- evidence states;
- reasons;
- sources and observation times;
- source revisions;
- current conflicts;
- changes across situation-model versions;
- missing information;
- and business context that the model is allowed to use.

It does not receive a request to decide whether the source is trustworthy.

It uses the evaluated evidence to propose what should happen next.

Its own reasoning and uncertainty belong to the reasoning trace. They do not replace fixed rules for permissions, approvals, conflict handling or action safety.

## Example

The carrier says that a parcel was delivered.

The customer says that the parcel was not received.

The deterministic evaluator does not decide which actor is lying.

It evaluates the claims according to the configured claim types:

- carrier tracking record: authoritative for the carrier’s recorded delivery state;
- customer report: authoritative for the customer’s reported experience;
- delivery situation: conflicting because both claims affect the same operational problem.

The evidence context tells the reasoning model that the situation is conflicting and why.

Business rules then determine whether Project X may send a bounded status message, must begin an investigation or must require a person before compensation.

## Working decision

Project X determines whether information can be used as evidence through fixed deterministic rules and business configuration.

The evaluation uses source authority, claim scope, provenance, currentness, comparison results, conflicts, permissions and business rules.

It produces an explicit situation state and reason, not a universal truth judgement and not a numeric trust score.

The reasoning model receives the resulting evidence context and proposes the next step. It does not perform the trust evaluation.

## What this question does not settle

This question does not fully define:

- every business-specific authority mapping;
- every domain comparison rule;
- every conflict type;
- every action that requires human approval;
- or the complete human-review workflow.

Those are addressed by the other Trust and Evidence questions and by the related Authority, Decision Making and Human Collaboration responsibilities.
