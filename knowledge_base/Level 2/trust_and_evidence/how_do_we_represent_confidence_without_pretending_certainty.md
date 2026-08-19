# How do we represent confidence without pretending certainty?

## Status

Answered — working decision, pending review.

## Where this question comes from

Earlier Understanding work used confidence as supporting metadata beside claims, interpretations and situation-model reasons.

That was useful for distinguishing strong and weak interpretations, but it created a risk: Project X could start treating confidence as a number or as a hidden trust score.

We corrected that direction.

Project X should not create numeric confidence, probability estimates, weighted evidence scores or action-specific confidence levels.

## The problem this responsibility solves

The reasoning model needs enough context to understand:

- what Project X observed;
- what sources claimed;
- which claims were accepted by deterministic rules;
- what remains unknown;
- what conflicts;
- what is stale;
- what changed over time;
- and why each state exists.

A single confidence value would hide those distinctions.

For example, “confidence: 0.61” does not explain whether the weakness came from:

- two possible orders;
- a missing source response;
- a stale record;
- a conflict between the customer and a business system;
- or an unusual situation.

## Possible designs considered

### Numeric confidence

Rejected.

Project X cannot reliably calibrate a universal numeric value across different businesses, sources, decisions and domains. The number would create false precision and would not explain the evidence.

### Qualitative confidence levels

Rejected as a Project X evidence field.

Labels such as low, medium and high would still hide the reason for uncertainty and could become an informal score.

### Multiple confidence dimensions

Rejected as a Project X evaluation design.

Representing source confidence, interpretation confidence, currentness confidence and decision confidence would create a complex evaluation model that Project X does not need.

### Evidence states, reasons and history

This is the working decision.

Project X exposes:

- the situation state;
- the reason for that state;
- the claims and sources behind it;
- observation times and revisions;
- conflicts and unknowns;
- and the changes across situation-model versions.

This gives the reasoning model the material it needs without pretending that Project X has quantified certainty.

## What the reasoning model does

The reasoning model receives the evidence context and reasons about the next step.

It may express that the information appears sufficient, insufficient, conflicting or uncertain in its explanation.

That is part of the reasoning trace for that run.

It is not a numeric Project X confidence value.

It is also not allowed to bypass deterministic rules, permissions, business policy or human approval requirements.

For example, the model may explain:

> The carrier record is authoritative for its tracking state, but the customer’s non-receipt report creates an unresolved delivery conflict. I recommend investigation rather than compensation.

The useful material is the explanation and the evidence references, not a percentage.

## Evidence changes are part of the context

The reasoning model should see how the evidence changed:

- a claim was first unknown;
- a provider later reported an intermediate state;
- a new claim contradicted or updated that state;
- a conflict was resolved by a configured rule or human decision;
- a new situation-model version was created;
- and a previous communication may now require correction.

The earlier state remains available. The newest version becomes the current working state.

This follows the existing versioning decision: reasons are immutable and corrections happen forward rather than by rewriting history.

## What Project X should explain

The evidence context should allow a person or reasoning run to understand:

- which claims were used;
- which claims were not used;
- why a claim had its current state;
- what evidence was missing;
- what evidence conflicted;
- what source and time supported each claim;
- and what changed since the previous version.

Project X should not explain confidence as a hidden mathematical value because it does not create one.

## Working decision

Project X does not quantify confidence.

It represents evidence through situation state, reasons, provenance, source metadata, claims, conflicts, unknowns and version history.

The reasoning model receives that context and forms its own judgement about the next step. Its reasoning trace may explain uncertainty, but its self-assessed confidence does not replace deterministic Project X rules or business approval requirements.

## What this question does not settle

This question does not settle:

- the exact schema of the evidence context;
- how the reasoning trace is stored;
- which business actions require approval;
- or how a human reviews the evidence.

Those concerns belong to the relevant later responsibilities and implementation levels.
