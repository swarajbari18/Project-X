# How should new learning be reconciled and versioned?

## Status

Answered — working decision, pending review.

## The problem

Two learning instances may describe the same meaning with different words.

Two similar-looking learning instances may actually describe different meanings.

Versioning cannot depend on exact text matching or one generic confidence value.

## The LLM proposes; the system reconciles

The LLM may propose:

- a possible entity match;
- a possible claim family;
- a possible relation;
- a possible update operation; and
- the reason it believes the new item is related.

The system then applies structured identity, scope, relation type, qualifiers, evidence and update rules.

The LLM’s wording is not authoritative metadata.

## Claim-family identity

A claim family is identified by structured components such as:

- business scope;
- subject identity;
- relation type;
- object or value type;
- process or capability;
- applicable conditions; and
- relevant qualifiers.

Natural-language aliases can help find a possible match, but the match is not accepted only because two embeddings are similar.

## Update operations

A new learning item may be:

- added;
- merged;
- refined;
- superseded;
- narrowed;
- appended as an exception;
- kept as a conflict;
- rejected;
- marked stale; or
- treated as a no-op.

The allowed operations depend on the memory type.

An event should normally be appended.

A current procedural lesson may receive a new version.

An exception may coexist with a general lesson.

An uncertain identity should remain unresolved rather than silently overwriting an existing item.

## Evidence and currentness remain separate

The reconciliation process should not answer every question with one confidence number.

It should separately consider:

- whether the identity matches;
- whether the new observation supports the claim;
- whether the claim is current;
- whether it applies to the current scope; and
- whether it is safe to activate.

## Working decision

New learning is reconciled through structured claim families and finite update operations.

Semantic similarity generates candidates. It does not directly establish identity, supersession or truth.

When reconciliation is uncertain, the safe result is a separate or unresolved item with preserved references.
