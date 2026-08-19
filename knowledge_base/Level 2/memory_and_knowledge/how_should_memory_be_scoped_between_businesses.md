# How should memory be scoped between businesses?

## Status

Answered — working decision, pending review.

## The default boundary

Business-derived semantic and procedural knowledge belongs to the business from which it was learned.

It should not transfer automatically to another business.

This includes:

- local vocabulary;
- workflow conventions;
- employee shorthand;
- exception patterns;
- tool-use procedures;
- source-selection habits;
- customer preferences; and

learned error corrections tied to a business process.

## What can transfer

Generic product mechanisms may transfer.

For example:

- recording tool errors;
- preserving provenance;
- using versioned memories;
- filtering by scope; or
- testing a procedure against replayed cases.

These are product capabilities, not business knowledge.

An abstract lesson may transfer only after it has been deliberately generalized and shown not to contain business-specific meaning.

## Scope can be narrower than a business

Memory may also be scoped by:

- business unit;
- location;
- process;
- role;
- capability;
- tool version;
- partner;
- customer;
- geography; or

time period.

The more specific the memory, the fewer situations should retrieve it.

## Working decision

Business-specific memory is isolated by default.

Cross-business transfer is not automatic and requires deliberate generalisation and governance.

The memory’s scope is part of its meaning, not merely a filter added later.
