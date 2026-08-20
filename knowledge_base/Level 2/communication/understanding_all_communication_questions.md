# Understanding all the Communication questions

## Status

Working decisions recorded. The conceptual boundary is clear enough to continue. Channel-specific rules, transport behaviour, and implementation details are intentionally left for Level 3.

This document is the map for the Communication category. The individual question documents preserve the reasoning behind each question.

## Why this category exists

Tend is visible to the world through communication, but communication is not the whole product.

Before Tend communicates, other responsibilities may have:

```text
Situation Understanding creates the situation model.
Gathering obtains and refreshes relevant information.
Trust and Evidence evaluates claims and conflicts.
Decision Making selects Tend's next behaviour.
Human Collaboration manages human responsibility.
Communication expresses the selected interaction.
```

Communication therefore does not decide what is true, what the business wants, who has authority, or whether a capability may be performed.

Its responsibility is:

> To express a permitted and useful interaction to the appropriate actor, using the current situation state and only the information that actor should receive.

The interaction may be a reply, question, update, acknowledgement, explanation, correction, notification, escalation, or request for human participation.

## A correction to the earlier reasoning

The first discussion treated channel rules, consent rules, transport behaviour, and channel delivery mechanics as part of Communication.

That was too low-level for this stage.

The current boundary is:

- Level 2 decides the conceptual responsibility of communicating.
- Level 2 decides what information and explanation an actor should receive.
- Level 2 decides when communication is useful, premature, misleading, or unnecessary.
- Level 3 decides channel-specific rules, transport implementation, delivery mechanics, and the technical enforcement of those constraints.

Business authority and accountability remain conceptual concerns. Their technical enforcement belongs later.

## What came before Communication

Communication receives a projection of the current situation, not an unrestricted view of the business.

That projection may contain:

- the actor's request or message;
- the current situation and its purpose;
- claims and their sources;
- known, unknown, stale, provisional, and conflicting states;
- what has already been communicated;
- what Tend has decided to do next;
- what the recipient needs to know or do;
- and what information the recipient is allowed to receive.

The reasoning model may help interpret or express this material. It cannot turn an unknown into a fact, resolve a source conflict by itself, or bypass a permission or policy boundary.

## The eight questions in plain language

### 1. When should Tend communicate?

When does communication create safe and meaningful progress for an actor?

### 2. When should Tend wait?

When would communicating now be premature, misleading, prohibited, or unnecessary?

### 3. When should Tend ask a question instead of performing an action?

When could an unanswered question change the situation, policy, responsibility, authorization, or consequence of the next action?

### 4. When should Tend explain its reasoning?

When does a recipient need to understand why Tend paused, acted, refused, escalated, or reached a conclusion?

### 5. How much explanation should different users receive?

How should explanation depth vary with the recipient's role, responsibility, authority, sensitivity, and need to act?

### 6. How should communication differ between customers and employees?

How should communication differ between actors with different relationships to the situation, rather than only differing in wording or tone?

### 7. How should Tend communicate uncertainty?

How should Tend communicate unknown, stale, provisional, incomplete, or weakly supported information without pretending certainty?

### 8. How should Tend communicate conflicting information?

How should Tend communicate disagreement between claims without silently choosing a source, exposing unnecessary information, or blaming an actor?

## Working decisions

- Tend communicates when a permitted, useful, and explainable interaction can safely move the situation forward.
- Tend waits when communicating would be premature, misleading, prohibited, or unnecessary.
- Waiting must remain visible as a responsibility in the situation; it must not become forgotten silence.
- Tend asks when an unresolved answer could change the safe next step.
- Decision Making chooses whether to communicate, ask, or wait. Communication expresses that chosen intent.
- Communication uses the latest usable situation version and does not communicate an older state as though it were current.
- Communication does not expose more information than the recipient needs and is allowed to receive.
- Explanations contain useful reasons and evidence references, not hidden internal reasoning.
- Uncertainty is expressed through meaningful states and reasons, not a universal confidence score.
- Conflicts remain visible and are communicated neutrally when they affect the recipient's understanding or next action.
- Acknowledgement is not completion. Delivery is not understanding. A response is not necessarily completed work.
- Proactive communication is in scope when it belongs to an existing business situation, configured journey, commitment, or time-based responsibility.
- Cold outbound marketing is not part of Tend's core communication responsibility.

## What this category does not decide

Communication does not:

- determine universal truth;
- decide which source is authoritative;
- define business policy;
- grant authority or permission;
- decide the business outcome;
- choose who owns human work;
- control waiting timers or escalation state;
- define channel-specific rules;
- implement transport or delivery mechanisms;
- or choose technologies.

Those responsibilities belong to Trust and Evidence, Decision Making, Human Collaboration, Authority and Ownership, Coordination and Time, later Level 3 work, or the business itself.

## The LLM boundary

The LLM may assist with language and interpretation:

- propose interpretations of what an actor means;
- propose a clarification question;
- draft a reply, update, question, or explanation;
- summarize relevant evidence for a recipient;
- translate or simplify language;
- and adapt expression to the recipient's role.

The LLM must not be the final authority for:

- whether a message is permitted;
- whether a recipient may see information;
- whether consent or authorization exists;
- whether a source is authoritative;
- whether claims conflict under a defined rule;
- whether a policy applies;
- whether an action requires approval;
- whether a message was sent or delivered;
- whether a person accepted responsibility;
- or whether requested work was completed.

The LLM receives only the context that the surrounding responsibilities have already bounded. It may propose. Deterministic rules, business policy, authority, and human responsibility control what actually happens.

## What remains provisional

The following require later research or later design:

- market-specific communication expectations;
- business-specific timing and escalation expectations;
- the exact information each actor may see;
- the exact channel and transport behaviour;
- the meaning of delivery and acknowledgement in each channel;
- localization and language requirements; and
- how communication performance should be evaluated.

These are not reasons to leave the conceptual boundary undefined. They are inputs to later work.
