# How do we identify conflicting information?

## Status

Answered — working decision, pending review.

## Where this question comes from

Level 1 treats conflicting information as a normal business failure.

Different systems, employees, customers and external partners may provide different answers.

Project X must identify the disagreement instead of hiding it.

The comparison question determines how claims are aligned. This question determines when aligned claims count as a material conflict.

## The problem this responsibility solves

Not every difference between two claims is a conflict.

These may be different without conflicting:

- an earlier and later state;
- two stages of the same process;
- two different objects;
- two different properties;
- a source record and a customer experience;
- a complete claim and a partial claim;
- or a current claim and a historical claim.

Project X needs deterministic domain rules so that ordinary changes and different perspectives do not become false conflicts.

## Working definition

Two claims are conflicting when:

1. they refer to the same relevant subject or operational object;
2. they concern the same property, state or decision-relevant question;
3. their time and scope are compatible for comparison; and
4. domain rules say their values cannot both describe the current situation.

The conflict belongs to the situation model. It is not a judgement that either actor is dishonest.

## Deterministic conflict rules

Conflict detection uses:

- canonical subject identifiers;
- claim type and property mappings;
- source status mappings;
- process-stage rules;
- time and revision rules;
- domain-specific allowed state transitions;
- and business rules where the business defines a contradiction.

There is no generic semantic conflict detector for ordinary cases.

For example, a payment provider’s `refund_initiated` state and `refund_settled` state are not conflicting if the domain defines settlement as a later stage.

The carrier’s `delivered` record and the customer’s `not_received` report are different claim types, but they may create a material delivery conflict because they lead to different operational next steps.

## Types of conflict

### Direct state conflict

Two systems report incompatible states for the same object and stage.

Example:

> One authorised system says a payment was completed. Another authoritative record says it failed.

### Record and experience conflict

An official record conflicts with the direct experience reported by an actor.

Example:

> The carrier says delivered. The customer says the parcel was not received.

### Policy or promise conflict

The current operational state conflicts with what the business promised or what its policy requires.

Example:

> The parcel is still moving, but the promised delivery date has passed.

Movement does not remove the missed commitment.

### Authority conflict

Two sources configured as authoritative for overlapping claims provide incompatible results.

This cannot be resolved by silently choosing one unless the business has explicitly defined a precedence rule.

### Identity or scope conflict

Claims that appear to conflict may refer to different orders, refunds, people, time periods or process stages.

Deterministic comparison should resolve identity and scope before creating this type of conflict.

## Conflict state and reason

The situation model should preserve:

- every involved claim;
- each source and observation time;
- the canonical comparison result;
- the domain rule that identified the conflict;
- the conflict’s affected situation and claim type;
- the reason the conflict is material;
- and the current workflow consequence.

The situation state may remain `conflicting`, with a reason such as:

> Carrier delivery record and customer non-receipt report refer to shipment 8821 and require different operational responses.

The earlier claims are not deleted when a later source resolves the conflict. A new situation-model version explains the resolution.

## What does not count as a conflict

Project X should not mark a conflict when:

- the claims refer to different objects;
- one claim is historical and the other is a later state;
- one claim is a broader summary and the other adds detail;
- the process allows both states at different stages;
- the difference cannot change the current situation or decision;
- or the relationship cannot yet be established.

An unresolved comparison is not automatically a conflict. It may remain an unresolved comparison until more evidence or a fallback review classifies it.

## Working decision

Project X identifies conflicts through deterministic canonical matching and domain-specific comparison rules.

It marks a conflict only when claims about the same relevant subject, property, scope and time relationship are incompatible under those rules.

It preserves all involved claims, the comparison result, the reason and the current workflow consequence.

It does not use a reasoning model to decide ordinary conflict existence and does not decide which actor is truthful.

## What this question does not settle

This question does not decide:

- how a conflict is resolved;
- whether a particular conflict blocks an action;
- which person receives a conflict;
- or which source is authoritative for every claim type.

Those decisions belong to the next Trust and Evidence questions and business configuration.
