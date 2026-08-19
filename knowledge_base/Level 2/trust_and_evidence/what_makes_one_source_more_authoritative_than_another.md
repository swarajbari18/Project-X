# What makes one source more authoritative than another?

## Status

Answered — working decision, pending review.

## Where this question comes from

The ownership discussion began with a logistics example and separated several ideas that initially sounded similar:

- ownership;
- source;
- claim;
- experience;
- truth;
- Project X’s situation record; and
- permission to disclose.

Those distinctions remain the foundation for source authority.

## Working definition

A source is authoritative for a claim when the relevant business or external process has assigned that source responsibility for maintaining, updating, confirming or correcting that type of information.

Authority is claim-specific.

It is not a universal ranking of people or systems.

## Examples of claim-specific authority

- A carrier is authoritative for its official tracking record.
- A payment provider is authoritative for its transaction or settlement record.
- A business system may be authoritative for the business record it owns.
- The business is authoritative for its own policies and promises.
- A customer is authoritative about their own experience, such as whether they received an item.
- An employee may be authoritative about what they personally did or were told, but not necessarily about the system record.
- An identity provider is authoritative for the identity verification result it produces.
- A business owner or configured approver is authoritative for delegated business decisions.

No one source is authoritative about the entire customer situation.

## How authority is established

Possible inputs include:

- business configuration;
- ownership of the underlying operation;
- source responsibility across the record lifecycle;
- domain-specific source mappings;
- the actor’s role and delegated authority;
- source identity and authentication;
- the claim type;
- the process stage;
- and the source’s permitted scope.

The business may configure authority explicitly. A connector or external integration may provide a known claim mapping. The final authority used by Project X must remain subject to the business’s configuration and policy.

## Authority is not enough by itself

An authoritative source may still provide information that is:

- stale;
- incomplete;
- outside its scope;
- incorrectly linked to the situation;
- contradicted by a customer’s direct experience;
- or insufficient for a high-consequence action.

Authority tells Project X where responsibility for the claim lies. It does not prove that the claim describes every aspect of reality.

For example, the carrier owns its delivery record. If the carrier says delivered and the customer says not received, Project X preserves both claims and represents the operational conflict.

## When two authoritative sources disagree

Project X should not silently choose a winner.

Possible configured responses are:

- define precedence for the specific claim type;
- define that one source is authoritative for one stage and another for a different stage;
- require corroborating evidence;
- request correction from the responsible source owner;
- require an authorised human decision;
- or keep the conflict open and take a bounded action.

The chosen response becomes part of business configuration or a recorded human decision.

## Authority and permission are separate

An actor may own information without being allowed to disclose it to every other actor.

Project X may use a confidential source internally while communicating a limited description externally.

For example, a customer may receive:

> Our latest records show that the parcel is in City A.

The internal evidence claim may preserve the specific partner system or employee that supplied the information.

## Authority and source are separate

The source is where a particular claim came from.

The owner is responsible for the underlying information or operation.

The source and owner may differ.

An employee may report information from a system owned by the business. A business system may contain a copied record owned by an external partner. A customer may report an experience without owning the carrier’s operational record.

## Working decision

Project X determines source authority at the level of the claim type, underlying operation, process stage and business configuration.

Authority is used to decide which source should normally be consulted and how its claim should be evaluated. It does not create universal truth, remove currentness checks, override customer experience or bypass conflicts.

When authority is unclear or authoritative sources disagree, Project X follows an explicit business rule, requests correction or additional evidence, or presents the conflict to an authorised person.

## What this question does not settle

This question does not fully define:

- the configuration format for authority mappings;
- every claim type in every industry;
- how delegated authority changes over time;
- or which roles may approve a conflict resolution.
