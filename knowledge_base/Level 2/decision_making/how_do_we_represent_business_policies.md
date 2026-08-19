# How do we represent business policies?

## Where this question comes from

Project X cannot behave consistently if every business policy remains an unstructured instruction that the reasoning model interprets differently each time.

At the same time, this is still a Level 2 question. We are not choosing a database, programming language or policy engine.

We are asking what a policy must mean.

## Our current answer

A business policy should describe when a business wants a particular Project X behaviour, what conditions must be true, what exceptions apply, and what happens when the policy cannot be applied.

A useful conceptual policy may need to express:

- the situation or event it applies to;
- the conditions that must be met;
- the evidence required;
- the behaviour Project X may select;
- the capability or actor involved;
- whether human work or approval is required;
- the scope of the policy;
- its effective period;
- exceptions;
- precedence when another policy also applies;
- and the fallback when it is missing, unclear, contradictory or expired.

This is a conceptual map, not a final schema.

## Policy is not the same as instruction to the LLM

The LLM may help reason about an open situation, but it should not be the only place where business policy exists.

The system must be able to apply important rules predictably, explain which policy applied, and know when a policy was not applicable.

The reasoning model may interpret the situation. It should not silently invent or rewrite policy.

## Defaults

Defaults are necessary, but they need ownership.

There may be:

- a business-configured policy;
- a business-configured fallback;
- a product default for a capability;
- or no safe default.

If a product default is used, Project X should make that visible to the business. A default is not “nothing”; it is an explicit product decision about safe behaviour.

## Working decision

Business policy is a structured source of constraints and permitted Project X behaviours.

Project X applies active policy and explicit fallback rules. It does not use common sense to resolve a business policy conflict.

## Later research

We need to learn:

- which policy concepts businesses understand;
- how owners delegate policy configuration;
- what policy explanations they need;
- how often policies change;
- and which fallbacks are safe across different capabilities.

