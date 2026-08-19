# How do businesses define approval rules?

## Where this question comes from

The Product Vision says that some situations require approval. Level 1 says that the business decides which actions Project X may perform automatically.

We clarified that approval is not part of Decision Making itself.

Decision Making may select a behaviour that leads to approval. The system control layer enforces the approval requirement.

## Our current answer

An approval rule determines when a capability or Project X behaviour must pause for a person with the appropriate authority.

The rule may depend on:

- the capability being requested;
- the consequence of the action;
- the amount or scope involved;
- the evidence available;
- the role or authority of the person;
- whether delegation is allowed;
- the policy or exception being applied;
- and the time for which the approval remains valid.

## What happens conceptually

The flow is:

```text
Decision Making selects a behaviour.
        ↓
System control checks capability and authorization rules.
        ↓
Approval is required.
        ↓
The system creates approval work.
        ↓
The person approves, rejects, or does not respond.
        ↓
The result returns to Project X.
        ↓
Decision Making selects the next behaviour.
```

Decision Making does not approve the action and does not bypass the approval.

## Timeout and changing situations

Approval cannot remain valid forever by assumption.

The timeout may depend on the capability, business policy or system contract.

If the situation changes while approval is pending, the earlier approval may no longer apply. The system should return the changed state to Project X rather than silently executing an old decision.

## Working decision

Approval rules belong to business policy and system control.

Decision Making selects a behaviour. The system determines whether approval is required, enforces it, applies the relevant timeout, records the result and returns that result to Project X.

## What this question does not settle

It does not define:

- how authority is stored;
- which roles exist;
- how the approval interface works;
- exact timeout values;
- or how a particular business approves exceptions.

These require Authority, Human Collaboration, capability design and later research.

