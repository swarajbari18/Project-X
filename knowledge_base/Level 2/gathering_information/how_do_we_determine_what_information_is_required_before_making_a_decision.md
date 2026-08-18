# How do we determine what information is required before making a decision?

## Where this document comes from

This document comes from our conversation rather than from a clean design exercise.

The question started with the Understanding model. That model already tells us that a situation can contain:

- Known information
- Unknown information
- Conflicting information
- References to messages and previous situation models

The first instinct was to say that Gathering means resolving the unknowns.

We then noticed that this was too small a definition.

Known information may still need to be checked. An unknown in Tend may already be known by a business system or an employee. A conflict may look unresolved only because the model has not yet seen a newer source state. A previous message may contain the context that tells us what the current situation actually is.

So Gathering is not simply “fetch the empty fields.”

It is the work of building the current, traceable context that a later decision can rely on.

This is our current working answer. We can change it later if another Gathering question or real business situation exposes a contradiction.

## Our current answer

Information is required when its absence, incorrectness, staleness or conflict could change the safe next step.

That makes required information relative to the decision being considered.

It is not every unknown in the situation model.

For a particular situation, Gathering asks:

- Which existing claims need to be checked?
- Which unknowns matter to the next possible decision?
- Which unknowns already exist somewhere else?
- Which conflicts are still current?
- Which previous messages or situation versions must be followed?
- What information is still missing after this gathering pass?

Gathering gives the resulting context to the decision responsibility. Gathering itself does not decide what the business should do.

## What “required” means here

The word “required” can easily become too broad.

It does not mean that Tend must know everything about the customer, order, employee or business before doing anything.

It means that Tend should identify the information whose state could change something important, such as:

- Which situation is being handled
- Which actor should be contacted
- Which business policy applies
- Whether a customer-facing statement would be accurate
- Whether an action is safe or needs approval
- Whether the situation should wait or escalate

The same information can be required for one decision and unnecessary for another.

For example, the payment method may matter when deciding whether a refund can be issued. It may not matter when answering whether an order has been dispatched.

This is why we should not define a universal list of fields that must always be gathered.

## The four things Understanding gives Gathering

### Known information

The model may contain a known claim.

Known means that Tend has a claim from some source and is treating it as established for now.

It does not automatically mean:

- The claim was independently verified
- The claim is still current
- The source is always authoritative
- The claim is sufficient for every possible action

Our first thought was that known information should be verified before anything is done.

The refinement we made was that verification should not mean blindly re-checking every known value every time. The need to check depends on the claim’s age, source, consequence and relevance to the current decision.

Verification also does not mean that Tend has proved reality in an absolute sense.

It means that Tend checked a claim against an appropriate source or process.

Trust and Evidence still has to deal with how much authority or reliability that source deserves.

### Unknown information

Unknown means that the current situation model does not contain the information.

It does not mean that the information does not exist anywhere.

An unknown may already be available:

- In a business system
- With an employee
- With the customer or prospect
- With an external business partner
- In a previous conversation
- In an earlier version of the situation model

It may also genuinely not exist yet, or the source may currently be unavailable.

So Gathering first asks what kind of unknown this is.

Only after that can it decide whether to ask someone, consult a source, wait, or stop looking for that piece of information.

An unknown that cannot affect the current decision is not a gathering failure. It is simply not part of the current requirement.

### Conflicting information

Understanding records a conflict when the material currently available does not agree.

Gathering then examines the conflict.

It may discover that:

- One claim is stale
- Two actors use the same status word differently
- A newer source state has resolved the earlier disagreement
- The earlier state was actually corrected
- The conflict is still real and needs a person or another actor

The important point is that Gathering must not overwrite the earlier claim.

If a source changes, we add a new observation and create a new complete situation-model version.

The old claim remains part of the history.

The current model can say that a conflict is resolved while still preserving the fact that the conflict existed and explaining how it was resolved.

### References and previous situation models

References are not decorative links.

They help Gathering recover the context that led to the current state.

A situation may reference:

- Message identifiers
- The conversation and channel where a message occurred
- Earlier customer, prospect or employee messages
- Communication with an external partner
- Previous messages sent by Tend
- Earlier versions of the same situation model
- Earlier gathering requests and source observations

Gathering follows a reference when it can affect the current interpretation or decision.

A previous situation model is a record of what Tend previously understood.

It is not automatically the source of truth for the outside world.

If a previous Tend message says that a refund was completed, Gathering should be able to follow that statement back to the source claim used at that time and check whether the source has changed.

## Source, owner and truth are not the same thing

One of the important corrections in our conversation was separating these ideas.

- The **source** is where a claim came from.
- The **owner** is responsible for the information, record or operation.
- The **claim** is what that source says.
- The **situation model** is Tend’s current operational understanding of those claims.

A customer message is authoritative about what the customer said and experienced.

It is not automatically proof of every external event.

A business system is authoritative about what that system records.

It is not automatically proof of the complete real-world outcome.

Tend’s outgoing message is authoritative about what Tend communicated.

It is not independent proof that the statement was correct.

That is why important claims need their source, observation time and source version when one exists.

## How the gathering pass works

This is the working flow we arrived at.

### 1. Start from the current situation model

Gathering starts from the latest complete version of the relevant situation model.

It does not begin by re-reading every message in the company’s history.

The situation model points to the messages, claims and earlier states that matter.

### 2. Understand what decision context is being considered

Gathering needs to know what possible next decision the current situation is moving toward.

It does not invent the business objective.

For example, the situation may be moving toward:

- Answering a status question
- Deciding whether a refund can be issued
- Asking an employee for missing information
- Asking a partner to investigate
- Deciding whether approval is required

The decision responsibility will later decide whether the context is sufficient. Gathering uses this context to know what information matters.

### 3. Classify the current information

For each relevant part of the model, Gathering identifies whether it is:

- Known but possibly stale or unverified
- Unknown but available from a known actor or source
- Unknown and currently unavailable
- Conflicting with another claim
- Ambiguous because the reference or meaning is unresolved
- Supported by an earlier message or situation version that may need to be refreshed

This prevents every incomplete piece of information from becoming the same kind of work.

### 4. Find the right actor or source

For each item that needs work, Gathering identifies:

- Who can provide or confirm it
- Where it can be obtained
- What exactly should be requested
- What should happen if the actor does not respond

Asking a customer, employee or partner is gathering.

Checking a business system is gathering.

Asking a partner to perform corrective work is no longer only gathering. It becomes coordination or action.

### 5. Record what came back

When information arrives, Tend records it as a claim or observation with its provenance.

That includes, where available:

- The source
- The actor or system that produced it
- When it was observed
- The source’s version or revision
- What request or event caused it to be gathered
- Which situation it relates to

The result is not inserted as an unexplained fact.

### 6. Create a new complete version when the situation changes

New information may fill an unknown, expose a conflict, make an earlier claim stale, correct an interpretation or show that the message was routed incorrectly.

The situation model receives a new complete version.

The earlier version is not edited.

Version two should tell the whole story without requiring someone to open version one. Comparing the two versions still shows what changed.

A new claim does not automatically mean a new situation.

A new situation is created only when there is a different operational problem with a different resolution path.

### 7. Make the remaining uncertainty visible

At the end of a gathering pass, the model should show:

- Which required claims are still missing
- Which sources or actors have not responded
- Which conflicts remain current
- Which information may now be stale
- What work is waiting and why
- Whether the gathering revealed a routing or situation-structure correction

The decision responsibility then decides whether those remaining gaps block the next action.

## The refund example

This is the example we used to test the model.

The customer requested a refund.

Later, the business record said the refund was completed.

Later still, the customer said the refund had not arrived.

This is realistic because “refund completed” may mean different things:

- The business approved it
- The refund instruction was sent
- The payment provider accepted it
- The provider settled it
- The customer’s account was actually credited

The first version may contain the customer’s refund request.

The next version may contain approval or processing information.

Another version may contain the business record saying completed.

The customer’s later message creates a new version containing both claims:

- The business record says completed
- The customer reports non-receipt

We do not silently choose one claim.

We do not create a new situation merely because a new conflict arrived.

By default, this remains one refund situation and the situation is reopened if it had been marked resolved.

Gathering then checks what “completed” means, whether the source is current, whether the payment provider has a newer state and whether the settlement period has passed.

Tend should not automatically issue another refund. That may have financial consequences and may require approval.

A separate linked situation is appropriate only if the business defines “refund not received after processing” as a different operational problem with a different resolution path.

## What we deliberately rejected

We rejected the idea that Tend should gather every unknown.

That would make every situation wait for information that may not matter.

We rejected trusting every known claim without considering freshness or consequence.

We rejected replacing an old claim with the newest claim.

We rejected using Tend’s own previous message as proof of the fact it described.

We also rejected creating a new situation for every contradictory observation.

The default is a new version of the existing situation. A new linked situation is for a genuinely different operational problem.

## Where this question stops

This question does not fully answer:

- How source authority is evaluated
- How information requests are prioritised in every business
- How unnecessary retrieval is prevented in detail
- How freshness is defined for every type of information
- How long partial information may remain pending
- When a person must take over
- Whether the available information is sufficient for a specific action

Those questions belong partly to Trust and Evidence, Human Collaboration, Time, Coordination and Decision Making.

This question gives those responsibilities a clear information context to work with.

## Our working decision

Required information is the decision-relevant set of claims, context and evidence whose absence, staleness, incorrectness or conflict could change the safe next step.

Gathering checks the relevant known claims, classifies the unknowns, examines the conflicts, follows the references and records new source observations without erasing history.

It creates a new complete situation-model version when the state changes.

It does not fill every unknown, decide business policy, treat its own message as truth or become the owner of another actor’s information.

This is the current understanding we will carry into the remaining Gathering questions.

