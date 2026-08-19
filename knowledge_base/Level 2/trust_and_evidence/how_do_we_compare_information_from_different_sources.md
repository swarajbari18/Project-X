# How do we compare information from different sources?

## Status

Answered — working decision, pending review.

## Where this question comes from

Gathering already established that information may exist in many systems, conversations, people, documents and situation versions.

Different sources often represent the same business state differently.

The carrier may use one status vocabulary. The business order system may store a copied status. An employee may provide a natural-language update. The customer may report a different experience.

Project X cannot compare those raw formats directly.

## The problem this responsibility solves

Project X needs to determine whether two source results are:

- about the same object;
- about the same property or operational state;
- from compatible time periods;
- describing the same process stage;
- confirming each other;
- updating each other;
- or materially conflicting.

Comparison is not a universal semantic judgement. It is a deterministic responsibility based on a shared conceptual model and domain-specific rules.

## Canonical claims

Each source result should be normalised into a canonical claim containing, where available:

- subject;
- subject identifier;
- claim type;
- value or state;
- source actor or system;
- source record identifier;
- observation time;
- source revision or event;
- process stage;
- scope;
- situation reference;
- and the original source payload or message reference.

The canonical model does not make the claim true. It makes the claim comparable and traceable.

## Comparison order

The working comparison order is:

1. Apply deterministic identifier and field matching.
2. Apply domain-specific mappings and comparison rules.
3. Classify the relationship between the claims.
4. If the relationship remains unresolved, allow the reasoning engine to review the unresolved comparison case.
5. If it remains unresolved or has business consequences requiring a person, request human confirmation.

The reasoning engine is not the normal comparison mechanism. It is a fallback for cases that deterministic rules cannot classify.

Generic semantic comparison is not required for ordinary source comparison.

## Possible comparison results

### Confirmed

Two sources report compatible claims about the same subject and state.

### Newer observation

The claims describe the same property, but one is a later valid observation.

The earlier claim remains historical.

### Process transition

The claims describe different stages of one operation.

For example, a refund may be initiated and later settled. These are not automatically conflicting claims.

### Refinement

One claim provides more detail without contradicting the other.

### Partial overlap

The claims describe related but different aspects of the situation.

For example, a carrier reports delivery while the customer reports non-receipt. The claims concern different observations of one delivery problem.

### Conflict

The claims apply to the same relevant subject, property, scope and time relationship, and domain rules say their states are incompatible.

### Unresolved comparison

Project X cannot determine the relationship through deterministic rules.

This is the case that may be passed to the reasoning engine and, if necessary, a person.

## Example

The business order system says:

> Shipment 8821 is in transit.

The carrier system says:

> Shipment 8821 was delivered at 14:05.

The canonical comparison checks:

- whether both records identify shipment 8821;
- which observation is newer;
- whether `in transit` is a copied or current status;
- whether the carrier’s delivered state is authoritative for that claim;
- and whether the business system has a defined meaning for its status.

The result may be a newer observation rather than a conflict.

If the customer also says the parcel was not received, that creates a separate customer-experience claim that may make the delivery situation operationally conflicting.

## What comparison does not do

Comparison does not:

- decide universal truth;
- decide which action the business should take;
- silently prefer the newest claim in every domain;
- discard the older claim;
- decide that an actor is lying;
- or use a reasoning model to replace deterministic domain rules.

Comparison produces a relationship and reason that Trust and Evidence can use.

## Working decision

Project X compares source information by normalising it into a shared canonical claim model and applying deterministic matching and domain-specific comparison rules.

The comparison result preserves the relationship between the claims: confirmation, update, process transition, refinement, partial overlap, conflict or unresolved comparison.

The reasoning engine is used only as a fallback for unresolved comparison cases. Human confirmation is the final fallback when the relationship remains unresolved or the business requires a person.

## What this question does not settle

This question does not define:

- every canonical claim field;
- every domain status mapping;
- which source is authoritative for each claim type;
- which conflicts block actions;
- or the human-review workflow.

Those are handled by the other Trust and Evidence questions and by later conceptual design.
