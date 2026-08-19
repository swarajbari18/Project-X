# How do we resolve conflicts?

## Status

Answered — working decision, pending review.

## Where this question comes from

Identifying a conflict is only the first step.

Level 1 explicitly says Project X must not silently choose an answer unless the business has defined how conflicts should be resolved.

The source-ownership work also established that ownership, source, experience, currentness and truth are different things.

Conflict resolution therefore means deciding how the business should proceed with incompatible claims. It does not mean proving universal truth.

## Possible resolution paths

### 1. Apply an explicit business rule

The business may define a resolution rule for a known conflict.

Examples:

- a particular provider is authoritative for settlement state;
- a customer report of non-receipt always opens an investigation;
- compensation requires owner approval when the carrier record says delivered;
- a newer source revision supersedes an earlier revision for a particular record.

When such a rule exists, Project X applies it deterministically and records the rule and reason.

### 2. Apply a domain process rule

Some apparent conflicts are process transitions.

For example:

- refund initiated;
- refund accepted by the provider;
- refund settled;
- refund reversed.

The domain model may explain the relationship without choosing one claim as the universal winner.

### 3. Request a correction from the source owner

The actor responsible for the record may be asked to confirm or correct it.

The request and response become new claims. Earlier claims remain historical.

### 4. Gather additional information

Project X may retrieve a newer record, a missing event, a related source or a relevant previous communication.

Additional information may:

- resolve the conflict;
- show that the claims refer to different objects;
- show that one claim is stale;
- or reveal that the situation was structured incorrectly.

### 5. Ask an authorised person

If no deterministic rule resolves the conflict, Project X creates human work for the responsible employee, business owner, administrator or approver.

The human may select a claim, provide a correction, approve an action, define a temporary interpretation or request further investigation.

### 6. Preserve the conflict and take a safe limited step

A conflict does not always block every action.

Project X may communicate the bounded current state, start an investigation, create a watch responsibility or wait for a response without pretending that the conflict is resolved.

## Resolution order

The working order is:

1. Apply deterministic domain and business rules.
2. Check whether a newer valid claim or source correction resolves the conflict.
3. Gather additional relevant evidence when it may change the next step.
4. Create human work when no rule or evidence resolves a material conflict.
5. Continue with a bounded action only when the affected business policy permits it.

The reasoning model does not resolve source authority or decide which claim is trusted. It receives the conflict state and may propose the next operational step.

## Conflicting authoritative sources

If two sources are both authoritative for overlapping claims, Project X must not silently choose one.

Possible business-configured responses are:

- define precedence for that claim type;
- define that both claims must be reconciled by a named actor;
- require a human approval;
- require additional corroborating evidence;
- or keep the conflict open and take only a bounded action.

The business remains responsible for choosing the policy.

## Versioning and correction

Conflict resolution changes the situation model.

Project X should:

- preserve the earlier situation version;
- preserve all original claims;
- record the new claim, rule, source correction or human decision;
- create a new complete situation-model version;
- explain what changed;
- update pending work;
- and re-evaluate affected actions and communications.

The old conflict is not erased. The current version can say that it has been resolved, superseded or made irrelevant.

## Example

The carrier says the parcel was delivered.

The customer says it was not received.

No universal truth decision is required.

The business may configure the following rule:

> A delivery conflict creates an investigation. Compensation cannot be issued automatically.

Project X applies that rule, preserves both claims, creates the investigation and gives the reasoning model the resulting evidence context.

The investigation or an authorised employee may later resolve the conflict.

## Working decision

Project X resolves conflicts through explicit domain rules, business configuration, source correction, additional evidence or an authorised human decision.

It never silently chooses a claim merely because it arrived last, came from a system or appears more plausible.

If a conflict cannot be resolved, Project X preserves it and either blocks the affected action or takes a bounded step permitted by business policy.

## What this question does not settle

This question does not define:

- the complete authority configuration;
- every conflict type;
- which conflicts block each action;
- the exact human-review payload;
- or the escalation policy when a person does not act.
