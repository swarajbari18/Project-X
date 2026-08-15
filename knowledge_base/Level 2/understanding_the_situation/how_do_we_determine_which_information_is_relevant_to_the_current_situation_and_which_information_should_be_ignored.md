# How do we determine which information is relevant to the current situation, and which information should be ignored?



## Answer

Relevance is decided by the conversation, and it is decided by one component.

That component reads the conversation.

It understands the language in it.

Based on that understanding, it attaches what the user said to the situation models that already exist.

A piece of information is relevant when it is attached to a situation model.

It is relevant in one of two ways.

It is directly relevant when it is added to the model's facts and notes.

It is indirectly relevant when it is added only as a reference to the model.

If a piece of information is not relevant to any existing model, then we have not captured it anywhere.

If it describes a real new problem, we create a new situation model for it.

That model is independent.

If the new model is only slightly related to existing models, it stays independent but gets linked to them.

A situation model is a live thing, not a single snapshot.

It changes as the customer goes on.

Each time it changes, we save the complete new state as the next version.

Every version carries the reason we made that change.

The reason is the stated justification, not the internal thinking.

This answer is about all of that working together.


## Decisions already made

These are settled for Tend unless you reopen them later.

**Relevance is attachment to a model.**

A message is relevant to a situation model when it reaches that model, directly or by reference.

**Relevance is decided by the conversation.**

The understand-and-route component reads the conversation and attaches messages from it.

**Not relevant to any model means not captured.**

We have not put this information into any situation model.

**A real new problem becomes a new independent model.**

We create it when the information is not captured and it is a genuine new problem.

**Slightly relevant becomes a new model plus links.**

If the new information touches existing models but is not the same problem, we create a new model and link it to them.

**Ignored is not deleted.**

Ignored information is not attached to any model this turn. Its message pointer still exists. It is not made up and it is not shown as false.

**The journey is a graph.**

Situation models are the nodes. Edges connect them for shared context or for sequence.

**A situation model is versioned.**

Each edit appends a new complete version. The new version always contains the full story.

**Every version carries a reason.**

The reason is the stated justification for creating that version.

**A version carries claims and confidence alongside the reason.**

The reason says why. The claims say what it relied on. The confidence says how sure it was. Both facts and beliefs are recorded.

**A new problem is a new node, not a new version.**

Versioning is scoped to one model's accumulated state. A genuinely different problem starts a new model and links to the old one.

**The reason is immutable.**

A logged reason is never rewritten in place. If it was wrong, we correct it forward with a later note.

**Reason and reasoning are separate.**

The reason lives in the situation model. The full internal reasoning lives in the agent trace, connected by a run ID.


## What relevance means

The word relevance is used for one thing here.

It says whether a message reaches a situation model.

It is decided by reading the conversation in natural language.

It is not decided by a fixed list of rules applied to the model's data.

The same message can be relevant in different ways to different models.

To one model it can be directly relevant.

To another it can be indirectly relevant.

We record both.

We do not copy the message into the model.

We store a pointer to the message.

The message itself stays with the platform that owns it.

We store the pointer wherever we need it, because we will fetch the message again when we work with it.

### Relevant to a model — direct or reference

A message is directly relevant to a model when it belongs in that model's facts and notes.

This changes what the model knows.

An example.

A customer says the delivery for order 8821 has not arrived.

This is direct for the model that tracks order 8821.

We add it to that model's facts.

A message is indirectly relevant to a model when it only touches the model's context.

It does not change the model's facts.

It is captured as a reference.

An example.

A second message mentions the same order 8821 but asks about a different problem.

That message is a reference to the first model.

It is attached to that model as a pointer.

The distinction is important.

Direct changes what the model knows.

Indirect only adds context.

### Not relevant to any model — a new situation

When a message is not relevant to any existing model, we have not captured it.

If it is a real new problem, we create a new situation model.

The new model is independent at first.

It has its own facts, its own unknowns, its own conflicts.

### Slightly relevant — new situation, linked

Sometimes a message is not fully relevant to any existing model.

But it clearly belongs to the same customer journey.

This is slightly relevant.

We create a new situation model for it.

Then we link the new model to the models it touches.

The new model stays independent.

The link does not merge it.

The link makes the shared context visible.

### Ignored

Ignored has one specific meaning in this design.

It means the information is not attached to any situation model this turn.

It does not mean the information is false.

It does not mean the information is destroyed.

The message pointer still exists.

It can be used later if it becomes relevant.

What is ignored is kept out of this turn's reasoning.

The reason it is ignored is not hidden.

If Tend ignored something on purpose, that is recorded too.






## The journey is a graph

The journey is not one line the customer walks down.

The journey is a graph.

A customer can be in several situations at once.

The graph keeps all of them together and shows how they connect.

### Nodes are situation models

Each node is one situation model.

One node is one operational problem.

One node holds known facts, unknown facts, conflicting facts, message references, notes, reason, and versions.

When we talk about a node, we mean a situation model.

### Context edges

Some nodes touch the same thing but are separate problems.

Two nodes can share the same order.

Or the same incident.

Or the same customer context.

These are context edges.

A context edge says: when someone works one of these nodes, they should see the other.

It is not directional.

It does not say one came from the other.

### Journey edges

Some nodes follow from other nodes.

An order question can come after a sales call.

A delivery delay can come after an order is placed.

These are journey edges.

A journey edge is directional.

It says one node came after another.

This is what shows the customer's path over time.

### The graph, not a line

A line would force every situation to have an order.

A graph allows two open problems to sit side by side.

The graph also shows which situations followed which other situations.

That is how the links show the journey.

### New message enters the graph

When a message arrives, the understand-and-route component does this.

It reads the message against the conversation.

It decides which existing node this message reaches.

If it is the same problem, it attaches the message pointer to that node.

If it is a new problem, it creates a new node.

If the new node shares an object or incident with an old node, it adds a context edge.

If the new node clearly follows from an old node, it adds a journey edge.

If it is unrelated, it creates a new node with no edge.

That message still sits on the customer's timeline.

We do not force a link just because it is the same customer.







## Versioned situation model

A situation model is a live thing.

It starts when the situation starts.

It changes as the customer goes on.

Each change creates a new version.

A version holds the complete state of the model at that moment.

The newest version is the working model.

Older versions are kept so we can trace how the situation changed.

### A version holds the complete state

A version is not a delta.

It is not just the new detail added on top.

A version holds the full accumulated state.

It has all the known facts, all the unknown slots, all the conflicts, all the references, all the notes.

This is deliberate.

We never rebuild an old version from pieces.

The latest version always tells the whole story.

When a message is routed to an existing model, we append it.

Before we append, we save the current state as the previous version.

After we append, we save the new complete state as the next version.

When a decision closes the situation, we save the closed state as the final version.

### A reason accompanies every version

Every version carries a reason.

The reason is why this version was created.

It says what happened between the previous version and this one.

It is stated in language.

The reason is not the model's internal thinking.

It is the final stated justification.

For example, "attached message 12 to this model because it names order 8821."

The reason is stored in the situation model itself.

### Claims and confidence are part of the version

The reason says why.

The claims say what the decision relied on.

The confidence says how sure the decision was.

These are recorded next to the reason.

For example, a claim can be "explicit reference to order 8821."

Another claim can be "soft signal; customer did not name the order."

These two claims lead to different roads.

A confident, verifiable claim is one path.

A soft, uncertain claim is the road to asking the customer.

That is already a locked rule for routing.

Recording the claim type and confidence lets us audit the reason later.

We can ask whether the reason matched the evidence.

We can find the mismatches and improve the system.

That is why claims and confidence are part of the version.

### A new problem is a new node, not a new version

Versioning is scoped to one model.

Versioning tracks how one situation changes over time.

It does not turn a new problem into a version of an old one.

If a customer said on Monday that the delivery is late, that is one model.

If the same customer said on Wednesday that the item arrived broken, that is a new problem.

The broken item is a new model.

We link the new model to the delivery model.

We do not make it version three of the delivery model.

If a customer says "just reorder it instead," that is still a new problem too.

First we have to decide whether it is the same problem or a new one.

If it is new, it becomes a new node with a new link.

Versioning does not change that.

### The reason is immutable; corrections are forward

A logged reason is never rewritten.

Once a version exists, its reason stays as it was.

If the reason was wrong, we do not edit it.

We correct it forward.

We add a later version or an override note that says the prior reason was wrong because of something.

That keeps the audit trail honest.

It preserves ownership.

If we silently fixed reasons, the trail would lie, and we could not trust it.







## Who owns what

Two kinds of content are being recorded.

The reason and the reasoning are not the same thing.

They are owned by different places.

### Reason lives in the situation model

The reason is the stated justification.

It is stored inside the situation model, next to the version.

A person reading the situation model can see the reason without going anywhere else.

### Reasoning lives in the agent trace

The reasoning is the full internal trace.

It is the prompt, the context, the steps the agent took, the deliberation it performed.

This is not stored in the situation model.

It is owned by the agent that ran the change.

The agent trace is a whole chapter of its own.

We will design it carefully later.

### Run ID connects the two

Every change to a situation model is made by some run of an agent.

That run has a run ID.

A version needs the run ID as well as the reason.

When a decision is made or an action is taken, we record which run produced it.

If we ever need the full reasoning behind a reason, we look up the run ID.

That is how reason and reasoning stay connected.

That is how we obey the rule that every important decision can be explained.


## What we are not deciding here

This answer stays inside one boundary.

It decides what relevance means and how it is traced.

It does not decide trust.

It does not decide gathering.

It does not decide how the agent thinks.

It does not decide the architecture of the states.

Those topics belong to other chapters.

This section records them so nothing we discussed is lost.

### Trust and evidence

We record claims and confidence in each version.

That is the evidence side.

We do not decide here how a claim is judged or which source wins when two disagree.

Trust has its own cluster.

It will use our claims as its raw material.

### Gathering

Ignored does not mean never fetched.

We have not decided what to gather, how to prioritise it, or how to avoid unnecessary retrieval.

That is the gathering cluster.

It will read our model's unknowns and decide what to fetch.

### Ambiguity and uncertainty

We record soft signals and confidence.

We do not decide here what exactly counts as ambiguous.

That is the next question in this cluster.

It is still open.

### Agent tracing

The full reasoning trace belongs to an agent tracing chapter.

We only lock here that the trace exists and that a run ID connects it to versions.

### Architecture and the three states

We are using three states from a bigger idea.

Conversation state holds the message record.

Agent state holds the situation models and versions.

Context state is the subset each component uses to do its job.

This answer uses all three.

Designing those states as a whole belongs to the architecture chapter.


## Example

This example runs one message through the whole design.

A customer writes: "My order 8821 arrived broken. Also I am still waiting to hear about last week's refund."

We already have two situation models.

Model A tracks delivery delay on order 8821.

Model B tracks the refund question from last week.

The understand-and-route component reads the message.

"Arrived broken" is a new problem.

Neither model captures a damaged item.

So we create model C.

"Delivered on 8821" is a reference to model A.

So model C is linked to model A with a context edge.

The shared object is the same order.

The refund is a reference to model B.

So model C is linked to model B with a journey edge.

Model C came after model B.

Model C is a new node.

It is not a new version of model A or model B.

Model C starts at version 1.

Version 1 holds the full state of the new damage situation.

Version 1 carries a reason: "created because the customer reported a damaged item on order 8828."

Version 1 carries claims: "explicit reference to order 8828."

Version 1 carries confidence for the routing decision.

The run ID of the understand-and-route agent is stored with the version.

If we later need the full reasoning, we look up that run ID.

Model A receives a reference too.

The message names order 8821 once again.

That reference is appended as a new version of model A, with its own reason and claims.

Now the graph shows the journey.

The customer has an open delivery situation and an open damage situation.

They are linked by the same order.

The damage situation follows the refund conversation.

These links show the customer's path.


## Status

Answered — pending your review.

Decisions locked in this answer:

- Relevance is attachment to a situation model.
- Relevance is decided by reading the conversation.
- Directly relevant goes into the model's facts and notes.
- Indirectly relevant becomes a reference.
- Not relevant to any model and a real new problem becomes a new independent model.
- Slightly relevant becomes a new model linked to the models it touches.
- Ignored is not deleted.
- New problem is a new node, not a new version.
- Versioning is scoped to one model.
- Every version holds the complete accumulated state.
- Every version carries a reason.
- Every version carries claims and confidence.
- The reason is immutable.
- A run ID connects reason to reasoning.
- Reasons live in the situation model; full reasoning lives in the agent trace.
- Cross-chapter references are recorded.

