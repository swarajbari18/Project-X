# When should conflicts automatically stop the workflow?

## Status

Answered — working decision, pending review.

## Where this question comes from

Project Vision says that Tend should fail safely. If it cannot make a confident decision, it should stop, explain why and ask for help rather than take unnecessary risks.

Level 1 also says that some actions require approval and that the business decides what Tend may do automatically.

The current engineering interpretation cannot use a model-generated confidence score as the stopping mechanism.

Stopping must be determined by fixed rules and business configuration using the evidence state, the situation and the action being considered.

## A conflict does not stop everything automatically

Project X should not block an entire situation merely because any disagreement exists.

It may continue when:

- the conflict belongs to another situation;
- the conflict cannot affect the current next step;
- a deterministic business rule resolves it;
- the claims describe different process stages;
- the action is a safe bounded response;
- or the business has explicitly permitted continuation.

This follows the existing distinction between relevant and unnecessary information and the requirement that every interaction move the situation forward.

## A conflict should block an affected action when

Fixed rules may block automatic action when the conflict:

- affects which situation or object is being handled;
- affects the identity of a customer, order, payment or shipment;
- affects the customer-facing answer;
- affects a business promise or deadline;
- affects money, compensation, refund or payment state;
- affects privacy, authorisation or data sharing;
- affects an approval requirement;
- affects legal, regulatory or compliance obligations;
- affects an irreversible or difficult-to-reverse action;
- or has no configured resolution rule and no safe fallback.

The business may add other blocking conditions through configuration.

## Stopping is action-specific

The same conflict may block one action and permit another.

For example, a carrier delivery record and customer non-receipt report may:

- permit Project X to state that the carrier record says delivered;
- block Project X from claiming that the parcel was received;
- block automatic compensation;
- and permit Project X to open an investigation.

Project X does not need to stop the entire situation. It needs to stop the unsafe action.

## What Project X does after a stop

A deterministic stop may produce one of these next states:

- wait for more information;
- request a source correction;
- request customer clarification;
- create human review;
- require business approval;
- start an investigation;
- send a limited response;
- or pause safely with a visible reason and deadline.

The reason for stopping remains visible in the situation model.

## Working decision

Project X automatically stops an action when a deterministic evidence or business rule says that the current conflict makes that action unsafe or unauthorised.

Conflicts do not automatically stop all work. The stop applies to the affected action or decision path.

When possible, Project X continues with a safe bounded action, further gathering, monitoring or human collaboration.

## What this question does not settle

This question does not define:

- the complete list of high-consequence actions;
- the exact business configuration format;
- the human-review workflow;
- or the escalation behaviour after a stop.
