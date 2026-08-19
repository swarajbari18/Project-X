# How should Tend learn from its own mistakes?

## Status

Answered — working decision, pending review.

## Learning begins with an experience

Tend records:

- the situation state at the time;
- the information it had;
- its interpretation;
- the next behaviour it selected;
- tools and arguments used;
- results and errors;
- human corrections; and

the eventual outcome.

This is not yet a lesson.

It is the experience from which a lesson may be formed.

## A mistake needs an external signal

Tend may propose that it made a mistake, but the proposal should be grounded in something such as:

- a tool rejection;
- a validation failure;
- an authoritative state mismatch;
- a human correction;
- a customer or employee correction;
- an unsuccessful outcome; or

a replay showing that the same approach fails.

The model’s private feeling that its reasoning “seems wrong” is not enough by itself.

## Error categories

The experience may be classified as:

- misunderstanding;
- vocabulary or entity resolution failure;
- missing information;
- wrong source selection;
- wrong tool selection;
- invalid tool arguments;
- policy interpretation failure;
- authority confusion;
- reasoning failure;
- communication failure; or

handoff or coordination failure.

The category matters because the corrective lesson should target the actual failure.

## From failure to learning

The learning loop is:

```text
Experience
    ↓
Observed outcome or correction
    ↓
Failure diagnosis
    ↓
Candidate lesson
    ↓
Automatic activation or manual validation, by configuration
    ↓
Future retrieval and monitoring
```

## Example

Tend calls a dispatch capability without a warehouse identifier.

The capability rejects the request.

Tend creates a lesson:

> Before using this capability in this business process, retrieve or confirm the warehouse identifier.

The lesson improves Tend’s planning.

It does not change the capability contract or create permission to obtain the identifier.

## Working decision

Tend learns from traceable experience and external outcomes.

It improves its own future behaviour without changing business rules, authority or control responsibilities.
