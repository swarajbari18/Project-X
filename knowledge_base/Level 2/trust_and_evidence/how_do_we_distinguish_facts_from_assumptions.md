# How do we distinguish facts from assumptions?

## Status

Answered — working decision, pending review.

## Where this question comes from

The Product Vision says that Tend should use facts before opinions and never guess.

The completed Understanding work already introduced a more precise distinction:

- what an actor said;
- what an actor believes;
- what a business system recorded;
- what Project X interpreted;
- and what Project X derived about the situation.

The Trust and Evidence responsibility must preserve those layers instead of flattening them into one list of facts.

## The layers of information

### Observation

What Project X received, observed or recorded.

Example:

> The communication platform delivered a carrier response at 14:05.

The observation establishes that Project X received the response. It does not establish that the response is correct.

### Source claim

What an actor or system asserted.

Example:

> The carrier’s system reports that shipment 8821 is delivered.

The claim carries source, time, scope and provenance.

### Actor experience or statement

What an actor says they experienced or were told.

Example:

> The customer says the parcel was not received.

The customer claim is authoritative about the customer’s report and experience. It is not automatically proof of the carrier’s record or the complete physical event.

### Interpretation

What Project X infers from the available message and context.

Example:

> The customer probably refers to shipment 8821.

An interpretation may remain provisional. It must not be presented as a source claim or verified fact.

### Derived situation state

What deterministic comparison and evidence rules establish about the current situation model.

Example:

> Delivery status is conflicting.

This is a Project X state, not a claim made by the carrier or customer.

### Reasoning-model proposal

What the reasoning model proposes after receiving the evaluated evidence context.

Example:

> Start a delivery investigation and tell the customer that the carrier record shows delivery while the business investigates the non-receipt report.

This is a proposal, not a source fact and not automatically an authorised action.

### Decision and action

What Project X or an authorised person decided and what action followed.

Example:

> The business approved an investigation and Project X sent the investigation request to the carrier.

The decision and action are traced separately from the claims that influenced them.

## Why the separation matters

Without these layers, Project X could make several unsafe transformations:

- treating a customer statement as a verified business fact;
- treating a system record as a complete explanation;
- treating Project X’s interpretation as though a source had stated it;
- treating a reasoning-model proposal as an approved action;
- or treating an earlier decision as current truth after the situation changed.

The Product Vision and Level 1 invariants require Project X to avoid those transformations.

## Known does not mean universal truth

The situation model may use `known` when a claim has been received and is being treated as established for the current model.

That does not mean:

- the claim is independently verified;
- the claim is current for every possible decision;
- the source is authoritative for every aspect of the situation;
- or the claim is permanent.

The state reason explains why the claim is currently present and usable within the model.

## Assumptions and provisional interpretations

An assumption is a working interpretation or condition that Project X has not established through an accepted claim.

Examples:

- assuming “my order” means the only open order;
- assuming a customer’s “they” refers to the last employee mentioned;
- assuming a status copied into a business system is still current;
- assuming two conversations refer to the same operational problem.

Project X may use a provisional interpretation when the alternatives do not change the operational situation or next decision path.

It must keep the interpretation marked as provisional when the alternatives could change:

- the situation assignment;
- the responsible actor;
- the required information;
- the business policy;
- or the customer-facing result.

## Corrections and versioning

Project X does not rewrite an earlier claim, interpretation or reason when later information changes the situation.

It preserves the earlier situation-model version and creates a new complete version containing:

- the new observation or claim;
- the changed evidence state;
- the reason for the change;
- affected conclusions;
- updated pending work;
- and any required communication or correction.

This preserves what Project X believed and communicated at the earlier time without treating it as the current state.

## Working decision

Project X distinguishes observations, source claims, actor experiences, interpretations, derived situation states, reasoning-model proposals, decisions and actions.

Each layer remains traceable to the layers before it.

Project X never converts an interpretation into a source fact, a customer claim into a verified business fact, or a reasoning-model proposal into an authorised action without the relevant deterministic rule, business policy or human decision.

## What this question does not settle

This question does not fully define:

- the complete data schema for each layer;
- which claims are accepted for every domain;
- how every business policy promotes or rejects a claim;
- or how customer-facing explanations are phrased for every channel.
