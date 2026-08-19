# Understanding all the Decision Making questions

## Status

Working decisions recorded. The category boundary is clear enough to continue. Capability-specific defaults, timeout values, approval patterns and other business-specific behaviour still require later research.

This document is the map for the Decision Making category. The individual question documents preserve the reasoning behind each question.

## Why this category exists

At first, “Decision Making” sounded as if Project X would decide what the business should ultimately do.

That is not what we mean.

The business owns its goals, policies, decisions and accountability. Project X helps the business reach those outcomes, but it does not decide what the business should want.

Decision Making means:

> Project X selects its next behaviour for the current situation.

That behaviour may be to gather more information, wait, monitor something, ask an actor for help, communicate, create human work, escalate, invoke a capability, resolve the situation or stop safely.

The decision is about Project X’s next step.

## What came before this category

The earlier categories produce the material that Decision Making uses:

```text
Understanding creates the situation model.
Gathering obtains and refreshes relevant information.
Trust and Evidence structures claims and evidence state.
Decision Making selects Project X’s next behaviour.
The control system enforces capability, permission and authorization rules.
Human Collaboration handles responsibility, handoff and approval work.
Communication and other capabilities perform what was selected.
```

Understanding may leave unknowns, ambiguity and conflicts visible.

Gathering may return partial, stale or changed information.

Trust and Evidence may say that claims are known, unknown, conflicting, provisional or stale.

Decision Making does not need a perfectly complete situation. It needs to determine what Project X can safely do next with the state that exists.

This continues the boundary already recorded in [`How Understanding and Gathering Information work together`](../gathering_information/relationship_between_understanding_and_gathering_information.md) and the [Trust and Evidence overview](../trust_and_evidence/understanding_all_trust_and_evidence_questions.md).

## Decision intention is not operational state

The conversation exposed an important distinction.

Some words describe what Project X chooses to do:

- gather;
- ask;
- communicate;
- monitor;
- create human work;
- escalate;
- invoke a capability;
- resolve; or
- stop safely.

Other words describe what happens after that choice:

- running;
- waiting;
- blocked;
- pending authorization;
- timed out;
- completed; or
- failed.

These are related but not identical.

“Wait” is a decision intention. “Waiting” is an operational state created by the system.

“Create human work” is a decision intention. “Blocked” may be the resulting state when Project X cannot progress until that work is completed.

“Escalate” is a change to ownership, urgency or routing. It may create human work, but it is not the same as ordinary human work.

“End the loop” also needs care. It may mean that the situation has been resolved and can be closed, that the current decision cycle has ended because Project X is waiting for an event, or that Project X has stopped safely because it has no safe path. These are different outcomes and should not be hidden behind one generic “terminate” state.

The LLM may propose the intention. Deterministic system behaviour creates and manages the state, timers, watchers, authorization checks, execution and timeout handling.

## The decision loop

The conceptual loop is:

```text
Current situation version
        ↓
Evidence, policy, available capabilities and time context
        ↓
Reasoning model proposes a Project X behaviour
        ↓
Deterministic validation and system control
        ↓
Execution, waiting, human work, communication or safe stop
        ↓
Result becomes new situation context
        ↓
Next decision
```

Decision Making does not enforce authorization. It does need to receive authorization and execution outcomes because a rejection, timeout or failure changes what Project X should do next.

The LLM should not invent capability timeouts, bypass controls, or directly mutate operational state. It should propose a behaviour and explain the context behind that proposal. The system remains responsible for enforcing what actually happens.

## The questions in plain language

### 1. What does “enough information” mean?

Enough information means enough to select a particular Project X behaviour safely.

It does not mean enough to determine the business’s final outcome.

The information needed to send a status update may be different from the information needed to invoke a consequential capability. A situation may be missing the information needed to answer a customer while still containing enough information to ask an employee for help.

### 2. How do we determine whether Project X can make the next decision?

This asks whether the current situation, evidence, policy, available capabilities and time context support one permitted next behaviour.

If they do not, choosing to gather, ask, wait, create human work or stop safely is itself a valid Project X decision.

### 3. Which decisions can always be automated?

This asks which Project X behaviours can be selected and executed by predictable rules when their conditions are satisfied.

“Always” is too absolute across all businesses. The useful question is which behaviours may be automated by default under explicit constraints.

### 4. Which decisions must always involve a person?

This asks which behaviours require human judgement, accountability, exception handling, unresolved conflict resolution or business approval.

Providing information, reviewing evidence, approving an action and taking ownership of ongoing work are different forms of human involvement.

### 5. Which decisions depend on business policy?

This asks which next behaviours cannot be selected from facts alone because the business must decide how it wants Project X to behave.

### 6. Which decisions depend on confidence?

We no longer use “confidence” as the primary concept here.

The better question is:

> How should Project X use uncertainty, evidence state and the reasoning model’s proposal when selecting its next behaviour?

Project X should use explicit claims, evidence states, reasons, conflicts and unknowns. The LLM may explain its reasoning, but its self-assessed confidence is not a safety authorization.

### 7. How do we represent business policies?

This asks what a business policy must express so Project X can apply it consistently: conditions, permitted behaviour, required evidence, authority, approval, timing, scope, exceptions and fallback.

### 8. How do businesses define approval rules?

This asks when the system control layer must pause a capability or action for an authorized person, what that person must see, how long the request remains valid and what happens after approval, rejection or inaction.

Decision Making does not perform the authorization.

### 9. How do we ensure different employees reach consistent decisions?

This means that the same situation, evidence, active policy and authority should produce the same Project X behaviour and the same relevant context for a human.

It does not mean removing legitimate human discretion.

## Working decisions

- Decision Making selects Project X’s next behaviour.
- It does not decide the business’s desired outcome.
- It does not enforce authorization or permission mechanics.
- It does consume the results of authorization, execution, timeout and failure handling.
- The LLM proposes a behaviour and explains its reasoning.
- Deterministic system behaviour validates the proposal and manages state.
- Decision intentions and operational states remain separate.
- “Common sense” is not a runtime policy conflict resolver.
- Product and business fallbacks must be explicit, versioned, traceable and safe.
- If no safe fallback exists, Project X creates human work, escalates or stops safely.
- “Confidence” is replaced by evidence and uncertainty state in the conceptual questions.
- Capability-specific timeout and default behaviour require later research.

## What this category does not decide

Decision Making does not:

- decide the business’s goals or policies;
- determine universal truth;
- decide whether a source is authoritative;
- perform authentication or authorization;
- replace Human Collaboration’s responsibility for routing and ownership;
- invent a business policy when configuration is unclear;
- let the LLM control timers, permissions or operational state;
- or treat a proposed behaviour as a completed action.

## Later research revealed by this conversation

The category is conceptually clear, but implementation-level defaults are not yet decided.

Later research should examine:

- safe defaults for each capability or tool;
- timeout and waiting behaviour for each external system;
- retry, failure and escalation behaviour;
- the consequence and reversibility of different actions;
- approval patterns used by different businesses;
- channel and consent rules;
- policy conflict and expiry handling;
- what business owners need to configure;
- and how consistency should be measured.

These are not reasons to delay the conceptual category. They are later research and implementation inputs that must be recorded in the relevant Level 1 unknowns, research documents and later Level 3 work.
