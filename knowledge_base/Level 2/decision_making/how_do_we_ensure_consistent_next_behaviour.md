# How do we ensure consistent next behaviour?

## Where this question comes from

The Product Vision says that employees should reach consistent conclusions when looking at the same situation.

Under the clarified Decision Making boundary, consistency means more specifically:

> The same situation, evidence, active policy and authority should produce the same Project X behaviour and the same relevant context for a human.

## Our current answer

Project X should make consistency possible by ensuring that:

- the current situation version is explicit;
- relevant evidence and uncertainty are visible;
- active policy and fallback policy are identified;
- the available capabilities are known;
- authorization and execution outcomes are recorded;
- the reasoning model’s proposal is checked;
- and important decisions have a traceable reason.

Consistency does not mean that every human must make the same business decision in every unusual case.

If the business gives an employee discretion, the employee may choose differently. Project X should preserve that human decision and make the reason and authority visible.

## The LLM and consistency

The LLM is probabilistic. It may propose different wording or reasoning for equivalent situations.

At Level 2, the important decision is that the proposal must be constrained by the same situation context, policy, capabilities and system rules.

The control layer must reject proposals that are invalid, unauthorized, unsupported or outside the available behaviours.

Implementation techniques for controlling model variation belong later.

## Working decision

Project X should provide consistent behaviour through explicit state, policy, defaults, capability constraints, deterministic validation and traceability.

Human discretion remains possible where the business has intentionally reserved it.

Consistency means repeatable Project X behaviour and visible exceptions, not forced uniformity of every human outcome.

## Later research

We need to define how to measure:

- repeated behaviour for equivalent situations;
- policy drift;
- unjustified human variation;
- fallback usage;
- and whether employees receive enough common context to make comparable decisions.

