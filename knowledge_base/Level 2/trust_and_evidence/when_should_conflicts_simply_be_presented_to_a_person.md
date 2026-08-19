# When should conflicts simply be presented to a person?

## Status

Answered — working decision, pending review.

## Where this question comes from

Level 1 defines human responsibility as a permanent product invariant.

Employees provide information, approve or reject actions, correct information and resolve situations that require human judgement.

The business owner can step into one situation, see what happened, decide and let Tend continue.

The existing approval interaction provides the basic workflow for presenting unresolved conflicts.

## When human presentation is required

Project X should create human work when fixed rules determine that:

- no configured authority rule resolves the conflict;
- two authoritative claims conflict;
- the action has significant financial, legal, privacy or customer consequences;
- the conflict affects a business promise or exception;
- an approval is required by business policy;
- a source correction or operational investigation is needed;
- the situation is unexpected and does not match a known workflow;
- or the responsible actor has not acted within the configured deadline.

Human presentation is not a replacement for deterministic evaluation. The person sees the result of that evaluation.

## Which person receives the work

The recipient is selected through business configuration and authority:

- the employee responsible for the situation;
- the employee responsible for the relevant business process;
- the business owner or administrator;
- the configured approver;
- a subject-matter expert;
- or the external partner responsible for correcting its operation.

Project X should not assign work to a person merely because that person is available. Responsibility, authority and business rules matter.

## What the person should see

The review should contain enough information to make the required decision:

- the complete current situation model;
- the customer’s request and relevant messages;
- the claims involved in the conflict;
- source, observation time and revision metadata;
- the deterministic comparison result;
- the evidence state and reason;
- what remains unknown;
- the action that is blocked or waiting;
- the decision required from the person;
- available options;
- the deadline;
- and what Project X will do after each choice.

The person should not receive unrelated information. Source confidentiality and actor-specific permissions continue to apply.

## What the person may do

The person may:

- approve the proposed action;
- reject the proposed action;
- select or confirm a claim under business authority;
- provide a new claim;
- correct a business record;
- request further investigation;
- assign the work to another person;
- define how the business wants to handle the exception;
- or leave the situation waiting.

Every decision and reason becomes part of the situation history.

## Human inaction

Level 1 identifies business inaction as one of Tend’s hardest problems.

When a person does not respond, Project X should not behave as if the work was completed.

It should keep visible:

- who is responsible;
- what information or action is required;
- when it was requested;
- the deadline;
- the current waiting reason;
- and the configured escalation path.

Possible escalation actions include:

- reminder;
- reassignment;
- escalation to the owner;
- escalation to another responsible employee;
- notification to the business;
- or safe pause until someone accepts responsibility.

## Working decision

Project X presents a conflict to a person when deterministic rules cannot resolve a material conflict, when business policy requires human approval or when the consequence of continuing automatically is outside the permitted safety boundary.

The person receives the relevant evidence, the conflict reason, the blocked decision and the available choices. The human decision is recorded, and Project X continues according to that decision and business policy.

If the person does not act, Project X keeps the inaction visible and follows the configured escalation rules.

## What this question does not settle

This question does not define:

- the complete authority and role model;
- every approval rule;
- the exact interface for human review;
- or the implementation of reminders and escalation.
