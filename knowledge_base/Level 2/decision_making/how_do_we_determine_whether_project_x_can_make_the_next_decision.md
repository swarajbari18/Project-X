# How do we determine whether Project X can make the next decision?

## Where this question comes from

The Level 1 backlog asks when Project X can make the next decision.

Under our clarified meaning, this does not ask whether Project X can decide the business outcome. It asks whether Project X can select one safe next behaviour.

## Our current answer

Project X can make the next decision when the current situation supports at least one permitted behaviour and the reason for choosing it can be explained.

The preferred business behaviour may still be unavailable.

For example, Project X may be unable to answer the customer but able to choose “ask the employee who owns this information.”

Not being able to choose the preferred behaviour does not mean that Decision Making has failed.

Choosing to gather, ask, wait, create human work, escalate or stop safely is also a decision.

## What Project X considers

The decision context may include:

- the latest situation-model version;
- what the customer, employee, system or partner said;
- known, unknown, conflicting, ambiguous, provisional and stale states;
- relevant source and evidence reasons;
- active business policy and fallback policy;
- available capabilities;
- time, deadlines and waiting conditions;
- actor availability;
- the consequence and reversibility of possible behaviours;
- and what Project X has already communicated or attempted.

Decision Making consumes these inputs. It does not own every input.

## The LLM and the control layer

The reasoning model may propose:

- a next behaviour;
- the situation facts it relied on;
- the unresolved uncertainty;
- and why the behaviour is appropriate.

The control layer then checks whether the proposal is structurally valid and can be carried out.

It handles capability availability, authorization, approval, timeouts, execution and failure.

If the control layer returns “rejected,” “pending,” “timed out,” or “failed,” that result becomes context for another Decision Making cycle.

## Working decision

Project X determines that it can make the next decision when it can select and explain one safe Project X behaviour from the current context.

The decision does not have to produce a final answer for the customer.

It may instead select a behaviour that moves the situation toward that answer.

## What this question does not settle

It does not define:

- the exact proposal format sent by the reasoning model;
- the control-layer implementation;
- capability authorization;
- timeout values;
- or how individual businesses define acceptable consequences.

