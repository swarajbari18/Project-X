# Can Tend learn automatically?

## Status

Answered — working decision, pending review.

## The answer

Yes.

Automatic learning is enabled by default.

A business can configure learning off or require manual validation of learning instances.

## Three configuration modes

### Learning off

Tend does not create or retrieve durable learned memory for future behaviour.

Operational traces may still be retained for explainability, safety, audit and debugging. Trace recording and learning are separate responsibilities.

### Automatic learning

Tend may automatically extract, reconcile and use learned memory, subject to scope, provenance, authority, policy, privacy and integrity controls.

This is the default mode.

### Manual validation

Tend records learning instances as candidates.

They do not influence future behaviour until an authorised person or business process approves them.

## What automatic learning does not mean

It does not mean:

- the LLM changes its own weights;
- Tend changes business policy;
- Tend grants itself authority;
- Tend trusts its own reflection without evidence;
- or every conversation becomes durable knowledge.

Automatic learning means that the product may use an observed experience to create or update its own business-scoped operational guidance.

## System checks remain required

Even when manual validation is disabled, the system must still check:

- scope;
- identity and relation shape;
- provenance;
- policy conflict;
- privacy and retention;
- version and supersession rules;
- malformed or unsafe content; and
- whether the memory is allowed to influence the current process.

These checks protect the product. They are not a mandatory human approval workflow.

## Working decision

Tend learns automatically by default, while the business can disable learning or require manual validation.

The business remains able to inspect, correct, restrict, supersede or retire learned memory.
