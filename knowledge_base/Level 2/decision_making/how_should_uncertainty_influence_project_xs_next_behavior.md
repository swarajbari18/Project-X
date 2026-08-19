# How should uncertainty influence Project X’s next behaviour?

## Why we changed the wording

The Level 1 question originally asked:

> Which decisions depend on confidence?

That wording is too vague and risks creating a universal confidence score.

The earlier Trust and Evidence work already rejected numeric confidence as the main representation of evidence. Project X uses claims, provenance, evidence states, reasons, conflicts, unknowns and history instead.

The more useful question is:

> How should Project X use uncertainty and evidence state when selecting its next behaviour?

## Our current answer

Uncertainty should constrain the available Project X behaviours.

It should not automatically stop all work.

For example:

- An unknown delivery status may require gathering.
- An ambiguous order reference may require clarification.
- A conflict between two records may require more evidence or human work.
- Stale information may require refresh.
- A low-consequence uncertainty may allow a limited communication.
- A high-consequence uncertainty may require approval or a safe stop.

The same uncertainty can allow one behaviour and prevent another.

## The LLM’s role

The reasoning model receives the available situation and evidence context.

It may propose:

- the next behaviour;
- the evidence it relied on;
- the unresolved uncertainty;
- what could make the proposal unsafe;
- and what alternative behaviour would be safer.

It may describe its own reasoning confidence internally, but that self-assessment is not an authorization or safety gate.

Project X should ask the model to explain support and uncertainty rather than treating a confidence number as evidence.

## Working decision

Decision Making does not use a universal confidence value.

It uses the explicit evidence and uncertainty state already produced by the earlier responsibilities, and it chooses a Project X behaviour whose consequence is appropriate to that state.

The control layer still enforces deterministic safety, policy, authorization and capability rules.

## What this question does not settle

It does not define:

- the internal format of the reasoning model’s response;
- model evaluation or calibration;
- the exact consequence categories;
- or which uncertainty states permit each capability.

Those require later research and Level 3 work.

