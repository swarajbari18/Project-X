# How should memory be stored conceptually?

## Status

Answered — working decision, pending review.

## This is not a Level 3 database decision

At Level 2 we should decide what the memory responsibilities are, not whether they eventually use relational tables, documents, a graph database, vector indexes, files or a combination.

## Memory should have a structured core

The conceptual core should contain typed records with:

- identity;
- memory type;
- business and process scope;
- content or claim;
- conditions of applicability;
- source and evidence references;
- observation time;
- validity time when known;
- lifecycle status;
- version relationships;
- allowed influence; and
- reason for creation or change.

## Experience and derived memory are separate

The experience record says what happened.

The learned memory says what Tend believes may be reusable from what happened.

The context projection says what part of that memory is being shown to Tend now.

These should not be collapsed into one object.

## References can form graph-shaped knowledge

Memory can reference:

- a situation;
- an experience;
- a message;
- a claim;
- a tool;
- a process;
- another memory;
- a correction; or

a version.

Those references create relationships.

Project X therefore has a graph-shaped conceptual model without requiring graph storage.

## Possible physical concepts considered

### No durable store

Useful only for temporary context or a prototype.

It cannot support durable learning, correction or continuity.

### Append-only experience history

Strong for traceability, replay and reconstruction.

It needs derived views for useful retrieval.

### Structured records

Strong for lifecycle, scope, ownership, versioning and explicit references.

This is the conceptual centre Project X needs.

### Semantic retrieval index

Useful for finding differently worded but related experiences.

It must not be the source of truth for identity, authority or versioning.

### Relationship index

Useful when retrieving connected entities, claims and experiences.

It is optional and should be justified by actual retrieval needs.

## Working decision

Project X uses a structured, typed, versioned and referenceable memory model conceptually.

Physical storage and indexing choices remain Level 3 decisions.

Project X does not require a dedicated graph-memory technology merely because memory has relationships.
