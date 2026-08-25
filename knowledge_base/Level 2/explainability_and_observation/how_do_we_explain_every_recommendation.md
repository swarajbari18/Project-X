# How do we explain every recommendation?

## The short answer

Every recommendation preserves a full reason record; humans receive explanations only when they need them. "Every" applies to preservation, not delivery.

## Our answer

A recommendation is an LLM proposal carrying a reasoned consequence. Decision Making already records both sides of it: the model's proposal with its argued consequence, and the deterministic system's decision. What this category adds is the guarantee that the reason survives:

- The reason record holds: what information was used (claim references), which rule or policy applied, what the deterministic decision was, and the emitted reason-key — the structured summary of why.
- It is preserved for every recommendation that matters — where "matters" means consequential enough to enter the audit under Failure's declaration rules. One classification system, shared with Failure; we did not invent a second definition of "important."
- Delivery is Communication's job, unchanged: minimum sufficient explanation to the audience that needs it.

The apparent contradiction between "every" (Level 1) and "minimum explanation" (Communication) dissolves once preserved-trace and delivered-explanation are separated. A low-consequence read may never be explained to anyone and still be fully explainable — the record exists.

The customer-facing case is worth stating plainly: when a capability does not exist for a request, the customer receives an honest answer saying so, with the reason. That is an explanation too — of a conclusion, not a failure.

## Boundary

- What goes into a message and when (Communication).
- Whether the recommended action was allowed (Authority and Ownership / deterministic control layer).
- Trace format and retention mechanics (Level 3).

## Related

- [How do we explain every action?](how_do_we_explain_every_action.md) — the same rule one level wider.
- [How do we explain every failure?](how_do_we_explain_every_failure.md)
- [understanding_all_explainability_and_observation_questions.md](understanding_all_explainability_and_observation_questions.md)
