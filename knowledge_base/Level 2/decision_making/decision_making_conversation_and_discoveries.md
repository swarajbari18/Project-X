# Conversation with Swaraj about Decision Making

## Why this document exists

This is a conversation record, not a formal specification.

The purpose is to preserve how we arrived at the Decision Making boundary, including the questions, corrections and challenges that would otherwise disappear when the individual question documents are written.

This follows the writing instruction for the Knowledge Base: the shared walkthrough is part of the knowledge.

## Where we started

The Level 1 backlog called the category “Decision Making” and asked questions such as:

- What does enough information mean?
- Which decisions can be automated?
- Which decisions must involve a person?
- How should business policies and approval rules work?

At first, the category could be read as if Project X would decide the business outcome.

That would have been the wrong interpretation.

The Product Vision says that Project X helps businesses make correct operational decisions, but it also says that the business owns its policies, decisions and accountability.

The earlier Understanding, Gathering, and Trust and Evidence work already showed that Project X prepares the situation and evidence context before the next step.

## Swaraj’s clarification

Swaraj clarified that “decision” means the decision Project X takes about its own next behaviour.

Project X may decide to:

- gather more information;
- wait;
- watch for a change;
- ask an actor for something;
- escalate;
- communicate;
- perform an action through a capability;
- or end the loop.

The business actors decide their own business outcomes. Project X helps them reach those decisions by reducing confusion and coordinating the work around the situation.

This distinction is now the category premise.

## The authorization boundary

Swaraj also clarified that Decision Making is not authorization.

Decision Making selects an intended Project X behaviour.

The system handles:

- capability rules;
- authorization;
- approvals;
- timeouts;
- execution;
- failure;
- and operational state.

The LLM may say that Project X should invoke a capability. The system then decides whether that invocation is authorized and technically possible.

If authorization is required, the system reports that result back into the loop. Decision Making can then choose to wait, ask for approval, create human work, escalate or communicate.

The important boundary is not that Decision Making knows nothing about authorization. It does not enforce authorization. It must still react to authorization outcomes because those outcomes change Project X’s next behaviour.

## The challenge about wait, blocked, human work and escalation

Swaraj proposed treating wait, blocked, human work and escalation as separate behaviours.

The conclusion is slightly more precise:

> They should remain separate domain meanings, but they are not all the same kind of output.

Waiting is usually a decision intention.

Waiting is also an operational state after the system registers what is being waited for.

Blocked is primarily a state: Project X cannot progress because a prerequisite is unavailable, unresolved or forbidden.

Human work is a decision intention that creates a responsibility for a person.

Escalation changes the urgency, owner, authority or routing of existing work. It may create human work, but it is not identical to ordinary human work.

This distinction will help the conceptual design stay clear even if the eventual code represents these things through related state structures.

## The challenge about “common sense” policy resolution

Swaraj proposed using the most logical or common-sense behaviour when business policy is contradictory or unclear.

The challenge is that a business policy conflict is not the same as a conflict between observed claims.

Project X must not quietly invent the business’s preference.

The working position is:

1. Use an active business policy when one applies.
2. Use an explicit business fallback when the business has configured one.
3. Use a product capability default only when it is safe, bounded and already defined.
4. Otherwise create human work, escalate or stop safely.

The fallback itself is a policy-like decision. It must be visible, versioned, tested and explainable.

If Project X uses a fallback because a policy was unclear, contradictory or expired, it should tell the business what happened and why.

Later research must determine safe defaults for individual capabilities and tools.

## The challenge about confidence

The word “confidence” originally meant the context sent to the LLM: the gathered evidence, uncertainty, conflicts and other information that the LLM uses to reason.

The LLM then proposes a next behaviour and explains its reasoning.

We decided not to make “confidence” a primary Decision Making concept.

Project X should preserve evidence state and reasons. The LLM may describe why its proposal is supported and what uncertainty remains, but its self-assessed confidence must not become a safety gate or authorization mechanism.

The conceptual question should therefore talk about uncertainty, evidence state and reasoning rather than a confidence score.

## What became clear

The category is not a final business-decision engine.

It is a next-behaviour selector for Project X.

The LLM proposes.

The system controls.

The business remains accountable.

The other actors perform their own responsibilities.

The next decision is made from the latest situation version, evidence state, applicable policy, available capabilities, time context and consequence of the possible behaviours.

## Research discovered for later

This conversation revealed later research areas that belong in the relevant Level 1, research and implementation work:

- capability-specific default behaviour;
- capability-specific timeouts and waiting rules;
- retry and failure handling;
- escalation conditions and service expectations;
- consequence and reversibility of actions;
- business approval and delegation patterns;
- policy expiry and contradiction handling;
- communication, consent and channel constraints;
- configuration needs of business owners;
- and consistency measurement.

The existence of these research items does not prevent us from answering the conceptual Decision Making questions. It means the answers must clearly distinguish shared product principles from defaults that require later evidence.

