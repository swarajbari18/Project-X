# How Understanding and Gathering Information work together

## Why we have this document

The first question about Gathering cannot be understood by itself.

Understanding creates the situation model. Gathering works on that model. Gathering may then discover that the earlier understanding was incomplete or wrong.

We created this document so that relationship remains visible instead of being buried inside either question’s answer.

This is a working explanation, not a separate formal system design.

## The short version

Understanding asks:

> What is happening here, based on what we currently have?

Gathering asks:

> What should we check, find or refresh before the next decision can be considered safely?

Understanding does not wait until every fact is known.

Gathering does not silently rewrite what Understanding previously said.

The relationship is iterative:

```text
Message or other event
        ↓
Understand and route
        ↓
Current situation model
        ↓
Gather relevant information
        ↓
Update the situation model
        ↓
Decide and act
```

If Gathering exposes a mistake, the situation model moves forward through a new version. The earlier version stays available so we can see what was understood at that time.

## What Understanding gives Gathering

Understanding gives Gathering an explicit model instead of a pile of messages.

That model tells Gathering:

- What the actor is asking
- What the actor says happened
- What the actor believes happened
- What the business already knows
- What the business has already communicated
- What is known
- What is unknown
- What conflicts
- What remains ambiguous
- Which messages and previous situation versions are relevant

This matters because Gathering should not begin by trying to understand the entire business conversation again from scratch.

The model can be incomplete and still be useful.

For example, a customer may clearly be asking about a refund while the refund status, settlement state and receipt are still unknown.

Understanding has already identified the problem. Gathering now has a focused information problem.

## What Understanding does not do

Understanding does not:

- Fetch fresh information from a business system
- Ask an employee for information
- Ask the customer for clarification as part of resolving the unknowns
- Decide which source should be trusted
- Decide whether the business may take an action

Understanding records the gap or conflict.

Gathering works on it.

## What Gathering gives back

Gathering does not give back an unquestionable truth.

It gives back new claims and observations with their context:

- Where the information came from
- Who produced or owns the relevant record or operation
- When the information was observed
- Which source version or revision was available
- What request produced the result
- Which situation the result affects

The operational result should be represented as a structured claim rather than only as a natural-language sentence. A later message may be written in natural language, but the situation model needs to preserve the claim, its source and its observation context so later Gathering work can match, compare and refresh it.

The claim’s source may also be confidential. Tend may use it internally while applying the business’s rules about what source details each actor is allowed to see.

The result may confirm an unknown, reveal a conflict, show that information is stale or prove that the message was routed incorrectly.

Understanding then incorporates that result into a new complete situation-model version.

The result may also be partial. In that case, Understanding incorporates what arrived while the missing claim, expected source and reason for waiting remain visible.

## Partial information and waiting

Gathering and Understanding do not need to wait for a complete answer before making useful progress.

When only part of the required information arrives:

- the arrived claim is recorded;
- the remaining unknown is kept visible;
- the expected actor or source is identified;
- the situation remains open or waiting;
- and the customer or another affected actor may receive a limited response when permitted.

The missing information becomes an active follow-up or monitoring responsibility. When it arrives, the situation moves forward through a new complete version.

This responsibility may eventually expire, escalate or require a human decision. A long wait must remain visible, but notification is still subject to channel, consent, confidentiality and business-policy rules.

## Conversation state and situation state

We need to keep two things separate.

### Conversation state

Conversation state contains communications between Tend and other actors.

Those actors may be:

- A prospect
- A customer
- An employee
- A business owner or administrator
- An external business partner

The conversation has its own participants, channel, thread and timing.

The original communication remains owned by its communication platform or channel. Tend keeps the references and working information needed to coordinate the business situation.

We should not create one universal conversation containing everything that happened anywhere in the business.

An employee conversation, a customer conversation and a partner conversation may all concern the same situation, but they should remain distinguishable.

### Situation-model state

A situation model is Tend’s coordination record for one operational problem.

It references the relevant parts of one or more conversations.

One conversation may touch several situations.

Several conversations may contribute to one situation.

The situation model holds the current complete understanding of that problem, not the entire canonical history of every communication.

## How the references work

A message ID is a reference to a communication in conversation state.

A situation model may reference that message because the message:

- Directly changes the situation’s facts
- Adds a customer, employee or partner claim
- Provides context without changing the facts
- Shows what Tend previously communicated
- Helps explain why a decision was made

The same message may be relevant to more than one situation.

The situation model does not copy the message into reality. It records what operational problem the message informs and why.

This is how we preserve the difference between:

- What someone said
- What Tend interpreted
- What a business system recorded
- What Tend decided
- What Tend communicated

## When Gathering changes Understanding

Gathering may reveal that:

- An unknown was already available in another source
- A known claim was stale
- Two status words referred to different stages
- A source state changed
- A previous interpretation was wrong
- A message belonged to another situation
- One message contained two operational problems
- Two situations should be linked
- Two situations should be merged because they were actually one problem

None of these should be silently corrected.

The new state becomes a new complete version.

The reason for the correction stays visible.

A new claim does not automatically create a new situation. The existing situation receives a new version when the underlying operational problem and resolution path remain the same. A linked situation is appropriate when the new event creates a different problem, owner, policy or resolution path.

The new version must be used to re-evaluate affected conclusions, required information, pending monitoring, approvals, actions and communications. Re-evaluation does not mean starting from the entire business history again; it means examining which parts of the current understanding depend on what changed.

## Versioning in this relationship

Versioning means that a situation has a complete state at each meaningful point in time.

Version two contains the whole story as understood after the new information arrived.

It does not require someone to reconstruct the current state by reading version one, version two and a list of small changes.

Version one still matters because it shows what was known and believed earlier.

A later state does not automatically prove that an earlier state was wrong.

The earlier state may have been correct at that time and simply become outdated.

Versioning also preserves what Tend communicated. If a new claim makes an earlier message incomplete or misleading, Communication should determine whether an update or correction is required. The update should be directed to the affected actor and should respect source confidentiality and channel rules.

## Tend’s own messages

Tend’s message is part of the conversation state.

It tells us what Tend communicated and what the actor was told.

It does not become the source of truth for the business fact it described.

If Tend previously told a customer that a refund was completed, a later gathering pass should be able to follow that statement to:

- The source claim used at that time
- The source observation time
- The source version, if available
- The situation version that contained the claim

If the source has changed, the new source state becomes part of the new situation version.

The old outgoing message remains important because it tells us what the customer was led to believe.

Tend should maintain an active but targeted communication loop when a changed claim affects the customer, an employee, a business owner or an external partner. Each actor receives the information needed for its responsibility, not the complete internal situation by default.

## Actors beyond customers

The existing Understanding material naturally started from customer conversations. The wider product vision is broader.

### Prospects

A prospect can ask product questions, refer to a previous promise or ask to speak to a person. The situation model follows the prospect’s journey without treating the person as an existing customer.

### Employees

An employee can provide missing information, approve an action, ask what happened in a customer situation or raise an internal operational question.

An employee’s question may update the existing situation, or it may create a separate internal situation if it has a separate purpose and resolution path.

### Business owners and administrators

An owner may review a situation, question a decision, provide a policy interpretation or take responsibility for an approval.

Their message must remain distinguishable from a customer claim or a business-system observation.

### External partners

An external partner may provide a status or perform work that the business depends on.

Tend records the partner’s communication and the limited information the partner is permitted to provide.

The partner remains responsible for its own operation.

## The refund example

The customer asks for a refund.

The business later records that the refund was completed.

The customer later says that the money has not arrived.

Understanding receives the customer’s new message and updates the refund situation with:

- The customer’s report of non-receipt
- The reference to the earlier refund communication
- The earlier business-record claim that the refund was completed
- The current conflict or unresolved difference between completion and receipt

Understanding does not decide which claim is correct.

Gathering follows the references and checks:

- What “completed” means in the business record
- Whether that record is still current
- Whether the payment provider has a newer state
- Whether the settlement period has passed
- Whether this is the same refund the customer is referring to

The result becomes a new complete version.

Decision Making then decides whether Tend can give a status, tell the customer that investigation is still in progress, ask an employee or partner to act, or require approval for a corrective action.

The default remains one refund situation. A separate linked situation is only needed if the business treats post-refund non-receipt as a genuinely different operational problem.

## The boundaries we are trying to preserve

Understanding is not Gathering.

Understanding identifies the model.

Gathering fills, checks and refreshes relevant parts of the model.

Gathering is not Trust and Evidence.

Gathering obtains and records claims. Trust and Evidence evaluates their authority and reliability.

Gathering is not Decision Making.

Gathering makes the current information state visible. Decision Making determines whether it is sufficient for a particular action.

Gathering is not Human Collaboration.

Gathering may ask an employee or partner for information. Human Collaboration decides ownership, routing, handoff and escalation.

Gathering also distinguishes relevant information from authorised information. A required claim may be unavailable because the current actor is not permitted to access it. That is a permission or approval state, not a reason to retrieve it silently.

Gathering is not Communication.

Gathering provides the claims and uncertainty state. Communication expresses the decision that follows.

## Our working relationship

The current shared understanding is:

```text
Understanding creates the model.
Gathering works on the model.
Gathering may expose a correction.
Understanding records the correction in a new version.
Decision Making uses the updated model.
```

This is a loop, not a rigid one-way pipeline.

The responsibilities stay separate so that a model can be incomplete without being invalid, a gathered claim can remain a structured claim without being treated as unquestionable truth, a required claim can remain unauthorised without being exposed, and a correction can happen without erasing history.
