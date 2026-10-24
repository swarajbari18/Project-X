# How do we assemble context for each situation phase?

## Status

Answered — working decision, pending review.

## The problem

The complete Tend state is larger than what should be placed into the model context for every step.

The context needed to understand a situation is different from the context needed to gather information or choose a tool.

The context must therefore be assembled for the current operational purpose.

## The context need

The current situation model should provide:

- current phase;
- current objective;
- possible next behaviour;
- known, unknown and conflicting information;
- relevant entities;
- tools and capabilities under consideration;
- source and authority requirements;
- risk and reversibility;
- deadlines or waiting state; and

the business scope.

This becomes the query for memory.

## Phase-specific memory

### Understanding

Use local vocabulary, entity aliases, previous interpretations, relevant related situations and known ambiguity patterns.

### Information gathering

Use source-selection lessons, tool preconditions, known missing fields and previous retrieval failures.

### Decision-making

Use relevant procedures, failure warnings, analogous outcomes, exceptions and escalation lessons.

### Communication

Use business terminology, channel conventions and communication corrections relevant to the current audience.

### Human collaboration

Use role, routing, handoff and responsibility lessons without changing authority or ownership rules.

## Context projection

The same memory may be projected differently in different phases.

For example, a prior tool failure may appear during information gathering as:

> Check the warehouse identifier before using the dispatch capability.

During explanation it may appear as:

> The dispatch request cannot proceed because the warehouse identifier is missing.

The underlying experience is the same. The usable context is different.

## Working decision

Tend assembles context just in time for the current situation phase and operational need.

It does not inject the complete memory store into every reasoning step.

When memory and knowledge places this phase-specific context is decided in [how memory and knowledge works with the loops](how_does_memory_and_knowledge_work_with_the_loops.md). Before each part of each loop, the loop waits for memory and knowledge's package: knowledge to use, or an explicit empty answer. Memory and knowledge's AI part runs at every one of those points. Note added 2026-10-29: understanding is the first phase of every loop. Before the conversation manager routes, and before the worker plans or decides on new content, the step that understands is given this page's understanding context: local vocabulary, entity aliases, previous interpretations, related situations and known ambiguity patterns, with the business's events and the present time. The business's own knowledge may help any step understand; only records are limited to the step's boundary.

The assembler must preserve scope, provenance, evidence state, version and allowed influence.
