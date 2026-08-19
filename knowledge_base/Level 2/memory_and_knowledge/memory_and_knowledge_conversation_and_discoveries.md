# Conversation with Swaraj about Memory and Knowledge

## Why this document exists

This is a conversation record, not a formal specification.

The purpose is to preserve how we reached the Memory and Knowledge boundary, including the places where the first interpretation was incomplete, the research that changed the shape of the problem, and the working decisions that now guide the individual question documents.

The shared walkthrough matters here because “memory,” “knowledge” and “learning” sound like one thing when they are actually several different responsibilities.

## Where we started

The Level 1 questions were:

- What should Tend remember?
- What should never become memory?
- What belongs in conversation history?
- What belongs in long-term business knowledge?
- How should previous conversations influence future decisions?
- How do we prevent outdated knowledge from influencing new decisions?
- How do we update knowledge when reality changes?
- Who owns business knowledge?
- Can Tend learn automatically?
- If so, what kind of learning is acceptable?

At first this looked like a normal long-term memory problem.

That reading was too small for Tend.

Tend does not only need to remember what a customer said. It needs to remember what happened while it was trying to help, what information it used, where it made a mistake, what a business’s employees mean when they use local language, and what Tend should do differently the next time a similar situation appears.

## Swaraj’s clarification about learning

Swaraj clarified the most important boundary:

> When I say Tend is learning, it is learning about its own mistakes. It is not changing business rules.

The examples were concrete:

- Tend used the wrong tool.
- Tend used a tool incorrectly even though rules existed for its use.
- Tend misunderstood something internally.
- Tend did not grasp what an employee or customer meant.
- Tend learned the words employees use and what those words mean in that business.

The learning is specific to the business.

What Tend learns in a logistics business should not automatically become useful knowledge for a service business.

This gave us the central definition:

> Tend learns how to perform better for a particular business. Tend does not learn to redefine what that business is allowed to do.

## The distinction between rules and learning

Business rules are normative.

They say what must happen, what may happen, what must not happen, who can approve something, and which source or actor owns a decision.

Learned memory is descriptive or procedural.

It says things such as:

> Employees in this business use “dispatch ready” to mean that a package is packed but has not yet been collected by the carrier.

Or:

> Tend previously omitted the warehouse identifier when calling this capability, and the capability rejected the request.

The second kind of knowledge may guide interpretation or planning.

It cannot grant permission, override a policy, change authority or turn an observed workaround into an official rule.

If learned memory conflicts with a formal rule or authoritative current information, the rule or authoritative source wins. The learned memory becomes a conflict, warning or candidate for correction.

## The first research pass

Research showed that there is no single settled meaning of agent memory.

The useful distinction is between several kinds of memory:

- working context for the current step;
- conversation and situation history;
- episodic experience of what happened;
- semantic business knowledge;
- procedural memory about how to act;
- reflective or error memory about what Tend did wrong; and
- policy and authority, which should not be treated as ordinary learned memory.

The [CoALA research](https://arxiv.org/abs/2309.02427) gave us a useful conceptual vocabulary for modular memory in language agents.

[Reflexion](https://arxiv.org/abs/2303.11366), [ExpeL](https://arxiv.org/abs/2308.10144) and [Voyager](https://arxiv.org/abs/2305.16291) showed different ways an agent can improve through external experience, textual lessons or reusable skills without necessarily changing model weights.

The research also gave us an important warning. Tend cannot simply ask itself whether its own reasoning was wrong and trust the answer. The [DeepMind self-correction study](https://deepmind.google/research/publications/48252/) found that intrinsic self-correction is unreliable without external feedback. Tool results, validators, human corrections, later outcomes and replay tests are stronger signals.

## The correction about validation

The first recommendation was that every learning item should pass through validation before becoming active.

Swaraj corrected that.

Validation may exist, but it should not be mandatory by default.

The business should be able to configure learning:

- learning off;
- automatic learning, which is the default; or
- manual validation of learning instances.

This does not remove system safeguards.

Human approval is optional. Scope checks, permission checks, provenance, policy conflict checks, malformed-memory checks and security checks remain necessary.

The distinction is:

> Human validation is a business configuration. System integrity checks are product responsibilities.

## The real problem became context assembly

The next important correction was that memory cannot be treated as one large store that is dumped into every prompt.

The context needed during understanding is different from the context needed during information gathering.

The context needed for tool selection is different from the context needed during communication.

The context needed for a business decision is a subset of the complete Tend and situation state.

The mechanism therefore has to ask:

> What does Tend need to know for the decision it is trying to make at this exact point in this situation?

It should use the current situation model, phase, objective, missing information, relevant entities, tools, authority, risk and time context to assemble a small context projection.

This is the same direction described by [Anthropic’s just-in-time memory tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool) and its [context-engineering work](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents): persistent information exists outside the active context and is selected when needed.

## The graph-memory discussion

Swaraj then questioned whether Project X needs graph memory.

The current conclusion is that it probably does not need a dedicated graph-memory technology at Level 2.

However, it does need graph-shaped relationships.

Typed records can reference:

- the situation they came from;
- the experience that produced them;
- the business and process they apply to;
- the claim or memory they support;
- the memory they contradict;
- the version they supersede;
- the tool or capability they concern;
- and the human correction that changed them.

Those references form a graph of meaning even if the physical implementation later uses structured records and ordinary indexes.

The important distinction is:

- graph-shaped data is a conceptual relationship model;
- a graph database is a Level 3 storage and query choice.

Project X should not choose graph storage merely because memory has relationships.

## The identity and versioning problem

Swaraj identified a deeper ambiguity.

Suppose one learning instance says:

> Dispatch requires warehouse_id.

Another says:

> Before creating a dispatch, provide the warehouse identifier.

The wording is different but the meaning may be the same.

If versioning depends on matching natural-language metadata, the update may fail operationally.

The conclusion is that the language model must not directly decide memory identity or supersession.

It may propose that two things are related.

The system must reconcile them through structured identity, relation types, scope, qualifiers, evidence and update rules.

If a safe identity match cannot be established, the new item remains separate or unresolved. It must not silently supersede the old item.

This is consistent with research on [record linkage and entity resolution](https://openresearch-repository.anu.edu.au/server/api/core/bitstreams/ec3af575-ab72-4282-a1b2-e3b078f35a3c/content) and with recent work showing that knowledge supersession remains a difficult, separate capability for long-running agents. [Supersede](https://arxiv.org/abs/2606.27472)

## Working decisions

The following decisions now guide the documents:

1. Tend’s learning is business-scoped operational self-improvement.
2. Learning cannot change business rules, authority, permissions, ownership or source-of-truth data.
3. Automatic learning is enabled by default.
4. A business may turn learning off or require manual validation.
5. Operational trace recording and learned-memory use are separate concerns.
6. Experience records, learned memories and context projections are different objects.
7. Memory is typed, versioned, referenceable and traceable.
8. References may create graph-shaped relationships without requiring graph storage.
9. LLM-generated metadata is a proposal, not authoritative control metadata.
10. Versioning uses structured claim families and typed update semantics, not wording similarity alone.
11. Ambiguous matches do not silently supersede existing memory.
12. Retrieval is controlled by the current situation phase and decision need.
13. Hard scope, authority, validity and permission filters come before semantic similarity.
14. Learned memory is advisory and cannot override deterministic controls.
15. Physical storage and indexing belong to Level 3.

## What remains provisional

The conceptual direction is clear enough to write the Level 2 documents.

The following remain working decisions rather than implementation commitments:

- the exact memory-item fields;
- the exact claim-family identity rules;
- the exact set of update operations;
- the detailed context projection format for each phase;
- the evaluation measures for automatic learning;
- and the storage and indexing mechanisms.

These are intentionally left at the Level 2 concept level and will be expanded during Level 2 architecture and Level 3.
