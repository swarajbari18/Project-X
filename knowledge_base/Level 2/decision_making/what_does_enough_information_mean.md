# What does “enough information” mean?

## Where this question comes from

The Product Vision says that Project X decides when enough information is available before it responds or performs an action.

The earlier Gathering work already established that required information is decision-relative. It is the information whose absence, staleness, incorrectness or conflict could change the safe next step.

Decision Making gives that idea a more specific meaning.

## Our current answer

Enough information means:

> Enough information to select a particular Project X behaviour safely.

It does not mean enough information to determine the business’s final outcome.

For example, Project X may not know whether a customer should receive compensation. It may still know enough to create human work for the business owner.

The information needed to send a limited status update may be different from the information needed to invoke a consequential capability.

## Why “enough” is relative

There is no one completeness threshold for every situation.

The required state depends on the behaviour being considered:

- Enough to ask a customer which order they mean
- Enough to retrieve a delivery status
- Enough to tell the customer that investigation is continuing
- Enough to create work for an employee
- Enough to monitor a deadline
- Enough to invoke a business capability
- Enough to resolve or close the situation

If the current information is not enough for the preferred behaviour, it may still be enough to choose a safer behaviour such as asking, waiting, gathering, escalating or stopping.

## Three meanings that must stay separate

We should not confuse these three questions:

1. Is the situation understood well enough to identify the problem?
2. Is the evidence sufficient to consider a particular next behaviour?
3. Does the control system have the execution and authorization prerequisites for that behaviour?

Understanding answers the first question.

Decision Making considers the second.

The system control and capability layers enforce the third.

## Example

The customer says that a refund has not arrived.

Project X may know:

- which refund the customer means;
- that the business record says completed;
- that the payment provider’s current state is unknown;
- and that the customer has reported non-receipt.

That may not be enough to tell the customer that the refund has definitely arrived.

It may be enough to ask the payment provider for the current settlement state, or to tell the customer that the business is investigating.

## Working decision

“Enough information” is not a property of the situation by itself.

It is a relationship between:

- the current situation model;
- the evidence state;
- the proposed Project X behaviour;
- the applicable policy;
- and the consequence of being wrong.

Project X should not collect every possible fact before acting. It should identify what is sufficient for the next safe behaviour.

## What this question does not settle

It does not define:

- the exact evidence required for every capability;
- universal risk or consequence thresholds;
- authorization rules;
- human approval routing;
- or capability-specific defaults.

Those require later research and the adjacent Level 2 responsibilities.

