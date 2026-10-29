# How should memory be retrieved?

## Status

Answered — working decision, pending review.

## Retrieval is not “search everything similar”

The current situation and the decision Tend is trying to make determine what memory is relevant.

The retrieval process should begin with a structured context need:

- business and scope;
- situation;
- current phase;
- operational objective;
- missing information;
- entities and capabilities involved;
- authority and permission;
- risk and consequence; and

time requirements.

## Retrieval stages

### First, apply hard filters

Exclude memory that has the wrong:

- business;
- role;
- process;
- capability;
- validity period;
- permission scope;
- status; or

version.

### Then find candidates

Candidate retrieval may use:

- exact references;
- structured fields;
- lexical terms;
- semantic similarity;
- related entities;
- prior situations; and

known failure patterns.

No one retrieval method is sufficient for every memory type.

### Then resolve conflicts and rank

Candidates should be checked for:

- supersession;
- conflicting claims;
- currentness;
- evidence state;
- applicability; and

relevance to the current decision.

### Finally, create a context projection

The selected memory should be transformed into a small, understandable context for the current Tend process.

The projection should preserve its source and reason.

## Retrieval and authority

Retrieval does not make a memory authoritative.

The most similar memory does not automatically override current source information or business policy.

The retrieval result is context for reasoning. The evidence and control responsibilities still apply.

## Working decision

Memory retrieval is a multi-stage, scope-first, context-aware process.

Semantic similarity is one candidate-generation signal, not the source of truth and not the versioning mechanism.

How memory and knowledge finds things is decided in [how memory and knowledge works with the loops](how_does_memory_and_knowledge_work_with_the_loops.md), part C. It follows Swaraj's retrieval pattern from his earlier projects: the step says what it needs; a retrieval capability decides how; exact filters run first; exact, keyword, meaning and link searches run in parallel; their orderings are fused by rank and reranked; a governance gate in fixed code runs last. The stages on this page still hold inside that pattern.

Note added 2026-10-29: the structured context need starts from what the step understood. For an arrival, understanding the arrival turns the message's words into exact values (dates, numbers, kinds), and the situations it may fit are found by those values first, in its wider look (renamed later on 29 October; see [the product loop](../the_product_loop/how_does_the_product_loop_work.md)). A person's own past is looked at only when the understanding artifact says the message refers to a past purchase or earlier work, and description is matched only inside what the exact values leave. Swaraj: "We would just know the dates of the sales and we could just make a filter about that."
