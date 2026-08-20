# Conversation with Swaraj about Communication

## Why this document exists

This is a conversation record, not a final technical specification.

It preserves the reasoning that led to the current Communication boundary, including the correction that channel rules and implementation details do not belong in Level 2.

## Where we started

The Level 1 Communication questions looked like message-writing questions:

- when to communicate;
- when to wait;
- when to ask;
- when to explain;
- how much to explain;
- how to communicate with customers and employees;
- how to communicate uncertainty; and
- how to communicate conflict.

The Product Vision showed that this was too small. A message is only the visible result of Tend's work to understand a situation, gather information, evaluate evidence, decide what should happen next, and coordinate the actors involved.

## The important separation

The previous categories established this boundary:

- Understanding creates the situation model.
- Gathering finds the information required for a possible next behaviour.
- Trust and Evidence evaluates claims and conflicts.
- Decision Making selects Tend's next behaviour.
- Human Collaboration manages responsibility and participation.
- Communication expresses the selected interaction.

Communication must not quietly take over the responsibilities of the other categories.

The question “When should Tend communicate?” can sound like a Decision Making question. The distinction is:

- Decision Making chooses whether Tend should communicate, ask, wait, or perform another behaviour.
- Communication determines how that selected interaction should be expressed to the intended actor.

The same separation applies to asking:

- Decision Making selects asking as the next behaviour.
- Gathering or Human Collaboration identifies what information or responsibility is needed and from whom.
- Communication expresses the question clearly.

## Correction: channel rules are not Level 2 Communication decisions

The first recommendation included channel eligibility, consent handling, transport behaviour, and delivery mechanics in the Communication responsibility.

Swaraj corrected this boundary:

> Channel rules and similar implementation concerns belong to Level 3.

The Level 2 Communication work therefore remains about conceptual communication behaviour:

- why communication is needed;
- what it should communicate;
- who needs to receive it;
- how much information is appropriate;
- how uncertainty and conflict should be expressed; and
- how communication relates to the current situation.

Level 3 will later decide how the chosen communication is implemented through particular channels and technical mechanisms.

## The “final step” clarification

The Product Vision describes communication as the final step because it is the visible result after understanding and decision-making.

That does not mean Tend communicates only once at the end of a situation.

A long-running situation may produce several decision cycles:

```text
Information changes
        ↓
Decision Making selects communication
        ↓
Tend communicates the current bounded state
        ↓
The actor responds or time changes the situation
        ↓
The next decision cycle begins
```

Communication is the final step of one cycle, but it may start the next part of the journey.

## Recommended communication principle

The working principle is:

> Tend communicates when a permitted, useful, and explainable interaction can safely move the situation forward. It waits when communication would be premature, misleading, prohibited, or unnecessary. It asks when unresolved information could change the safe next step. It explains enough for the recipient to understand their situation and responsibility, without exposing information they do not need.

## The LLM discussion

The LLM is useful where the problem is language or interpretation:

- understanding what an actor may mean;
- recognizing possible ambiguity;
- proposing a clarification question;
- drafting a response;
- adapting an explanation to a recipient;
- summarizing approved evidence; and
- translating or simplifying language.

The LLM is not the authority for:

- truth;
- source authority;
- policy;
- permission;
- consent;
- approval;
- communication eligibility;
- waiting state;
- delivery state;
- completion state; or
- business accountability.

The LLM proposes language or behaviour. The surrounding system and business responsibilities decide whether that proposal is valid and permitted.

## Alternatives considered

### Let the LLM own communication end to end

Rejected because it would allow the LLM to invent facts, expose restricted information, make unsupported promises, bypass policy, and treat generated text as completed communication.

### Use only fixed templates

Rejected because Tend must communicate in unfamiliar situations, explain uncertainty, handle conflicts, and speak differently to different actors.

### Use structured communication intent plus bounded language generation

Chosen as the current conceptual direction.

The communication intent, recipient responsibility, allowed information, evidence state, and business constraints are established outside the LLM. The LLM helps express them naturally.

## What remains open

These questions should not be silently solved in this category:

- exact market and channel behaviour;
- exact timing defaults;
- legal consent and communication obligations;
- exact delivery and acknowledgement semantics;
- exact information visibility rules;
- localization requirements; and
- technical implementation.

They remain visible for later research, Level 3 design, or business-specific configuration.
