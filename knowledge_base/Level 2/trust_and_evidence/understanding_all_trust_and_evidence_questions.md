# Understanding all the Trust and Evidence questions

## Status

Answered — working decisions recorded, pending review.

This document is the map for the Trust and Evidence category. The individual question documents contain the detailed reasoning and working decisions.

This category is not asking what trust means in philosophy, or whether an actor is telling the universal truth.

Project X does not adjudicate whether a customer, employee, business system or external partner is lying. Each actor remains responsible for the information and operation it owns.

The engineering responsibility is narrower and more concrete:

> Project X deterministically evaluates and structures evidence according to source authority, domain rules and business configuration, then exposes the resulting evidence context to the reasoning model and the decision responsibilities.

The reasoning model does not perform the evidence evaluation.

## What came before this category

Understanding creates the situation model from what is already available.

That model preserves:

- what an actor said;
- what an actor believes;
- what a business system recorded;
- what is known;
- what is unknown;
- what conflicts;
- what is ambiguous; and
- which messages, claims and earlier situation versions are relevant.

Gathering then finds, checks and refreshes the claims needed for the next possible decision.

Gathering records source, owner, location, observation time, revision, currentness and waiting state. It does not turn a gathered claim into unquestionable truth.

Trust and Evidence receives those structured claims and evaluates their operational usability.

Decision Making later determines what the business should do, using the evidence state, business policy, authority and consequence.

The relationship is therefore:

```text
Understanding creates the situation model.
Gathering obtains and refreshes claims.
Trust and Evidence evaluates and structures those claims.
Decision Making chooses the next permitted step.
Human Collaboration handles responsibility and approval when required.
```

## Decisions already established

The following decisions are carried into every question in this category.

### A claim is not an accepted fact

A claim is a structured proposition with provenance.

For example:

> The carrier’s system reported that shipment 8821 had status `delivered` at 14:05.

The claim preserves its subject, state, source, observation time, source revision and relationship to the situation.

It does not assert that the parcel was universally or physically received.

### Observations, claims, interpretations and decisions remain separate

Project X preserves:

1. what it observed;
2. what a source claimed;
3. what Project X inferred or interpreted;
4. what the evidence evaluator established through rules;
5. what the reasoning model proposed; and
6. what decision or action followed.

Project X must not present its interpretation as though it came directly from the source.

### Evaluation is deterministic

Evidence evaluation uses fixed rules and business-rule configuration.

The rules may consider:

- source authority;
- claim scope;
- object identity;
- provenance;
- observation time;
- currentness;
- domain comparison rules;
- conflicts;
- permissions;
- business policy; and
- whether an approval is required.

The reasoning model is not used to decide whether a source is trusted, whether a conflict exists under a defined domain rule, or whether an action is permitted.

### Evidence state is represented by situation state and reason

Project X does not create a numeric trust score or a weighted evidence score.

The situation model preserves states such as:

- known;
- unknown;
- conflicting;
- ambiguous;
- provisional; and
- stale.

The state is accompanied by a reason explaining why it has that state.

The reason can also identify conditions such as source unavailability, missing permission, an authority rule, a business-rule requirement or a source correction.

This follows the earlier decision that every situation-model version carries a stated reason, claims, sources and time.

### The reasoning model receives evidence context

The reasoning model receives the resulting evidence context, not the internal process by which the evaluator reached it.

Its context may include:

- accepted and unresolved claims;
- evidence states and reasons;
- source and observation metadata;
- conflicts;
- missing information;
- changes across situation-model versions;
- relevant business context; and
- the current interaction and possible next steps.

The reasoning model may explain what it believes can be done and why. Its own confidence is part of its reasoning trace, not a numeric trust value produced by Project X and not a replacement for fixed safety rules.

### Authority is claim-specific

The source or actor responsible for one part of the business is not automatically authoritative about every aspect of the situation.

For example:

- a carrier owns its tracking record;
- a customer is authoritative about their own experience;
- the business owns its customer promise and policy;
- a payment provider owns its transaction process;
- an identity provider owns its authentication result.

Authority does not remove the need to consider currentness, scope, conflicts or permission.

### Conflicts are not silently hidden

If sources disagree, Project X preserves the claims and identifies the conflict.

Project X may choose a result only when a business or domain rule explicitly defines how that conflict is resolved.

Otherwise, it gathers more information, keeps the conflict visible, asks an authorised person or takes a safe limited step.

## The evidence flow

```text
Source response
        ↓
Canonical claim
        ↓
Deterministic matching and comparison
        ↓
Domain-specific conflict rules
        ↓
Authority and business-rule evaluation
        ↓
Situation state plus reason
        ↓
Evidence context for the reasoning model
        ↓
Reasoning-model proposal
        ↓
Code, permissions, policy and approval checks
        ↓
Action, communication, waiting, further gathering or human work
```

Deterministic comparison comes first.

The reasoning engine may review an unresolved comparison case after deterministic rules cannot classify it. A human is the final fallback when the case remains unresolved or when business policy requires a person.

## The nine questions in plain language

### 1. How do we determine whether information should be trusted?

What deterministic checks must pass before a claim can be exposed as usable evidence for the current situation?

### 2. How do we represent confidence without pretending certainty?

How does Project X expose evidence, reasons and changes without producing a false numeric confidence value?

### 3. How do we compare information from different sources?

How do different source formats become comparable claims, and what relationships can comparison produce?

### 4. How do we identify conflicting information?

What deterministic domain conditions mean that two claims are materially incompatible?

### 5. How do we resolve conflicts?

What happens when a conflict is found, and who or what is allowed to resolve it?

### 6. When should conflicts automatically stop the workflow?

Which conflicts block a particular action, and which allow safe progress to continue?

### 7. When should conflicts simply be presented to a person?

When should Project X create human work, what should the person see, and what happens after the person acts or fails to act?

### 8. What makes one source more authoritative than another?

How does business configuration and ownership determine which source is responsible for which claim?

### 9. How do we distinguish facts from assumptions?

How does Project X preserve the difference between an observation, a source claim, an interpretation, an evaluated evidence state and a final decision?

## One shared example

The customer says:

> “My order never arrived.”

The carrier record says:

> “Delivered at 14:05.”

The business record says:

> “Delivery was promised by Friday.”

Project X should preserve all three claims.

The carrier is authoritative for its official tracking record.

The customer is authoritative about their experience.

The business is authoritative about the promise it made.

The claims together create a delivery conflict that may require investigation.

Project X may be able to tell the customer what the latest carrier record says. It must not claim that the customer is wrong, promise a new delivery date without evidence, or issue compensation unless the relevant business rules permit that action.

## What this category does not decide

Trust and Evidence does not:

- determine universal truth;
- replace the system that owns an external record;
- decide business policy;
- decide which employee owns ongoing work;
- use a reasoning model to evaluate source trust;
- create numeric confidence scores;
- silently choose between conflicting sources;
- or bypass permissions and approvals.

The output of this category is structured evidence context and deterministic evidence state. Other responsibilities use that context to decide what should happen next.

## Individual question documents

- [How do we determine whether information should be trusted?](how_do_we_determine_whether_information_should_be_trusted.md)
- [How do we represent confidence without pretending certainty?](how_do_we_represent_confidence_without_pretending_certainty.md)
- [How do we compare information from different sources?](how_do_we_compare_information_from_different_sources.md)
- [How do we identify conflicting information?](how_do_we_identify_conflicting_information.md)
- [How do we resolve conflicts?](how_do_we_resolve_conflicts.md)
- [When should conflicts automatically stop the workflow?](when_should_conflicts_automatically_stop_the_workflow.md)
- [When should conflicts simply be presented to a person?](when_should_conflicts_simply_be_presented_to_a_person.md)
- [What makes one source more authoritative than another?](what_makes_one_source_more_authoritative_than_another.md)
- [How do we distinguish facts from assumptions?](how_do_we_distinguish_facts_from_assumptions.md)

This is the current working map for Trust and Evidence. The individual decisions remain subject to review as the adjacent Decision Making, Human Collaboration and Authority and Ownership questions are developed.
