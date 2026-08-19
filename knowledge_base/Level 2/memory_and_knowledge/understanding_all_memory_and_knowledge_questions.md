# Understanding all the Memory and Knowledge questions

## Status

Answered — working decisions recorded, pending review.

This document is the map for the Memory and Knowledge category. The individual question documents contain the detailed reasoning and working decisions.

This category is not asking whether Tend can store more conversation text.

It is asking what Tend should carry from experience into future situations, how that information should change its future behaviour, and how the business remains in control while Tend learns.

## What came before this category

Understanding creates the current situation model.

Gathering finds and refreshes the information needed for the next possible behaviour.

Trust and Evidence evaluates claims, authority, provenance, currentness and conflict.

Decision Making selects Tend’s next behaviour.

Human Collaboration manages the people who provide information, approve work, perform work or own responsibility.

Memory and Knowledge asks what can be carried from those completed and ongoing experiences into future situations.

The relationship is:

```text
Current situation and experience
        ↓
Claims, actions, outcomes and corrections
        ↓
Experience memory
        ↓
Candidate or active learned knowledge
        ↓
Phase-specific context selection
        ↓
Future understanding, gathering, decision-making or communication
```

## The most important distinction

Tend learns to improve itself for a business.

Tend does not learn to change the business’s rules.

Learning may improve:

- interpretation;
- local vocabulary;
- retrieval;
- planning;
- tool selection;
- tool arguments;
- error prevention;
- communication;
- escalation suggestions; and
- procedural guidance.

Learning may not change:

- policy;
- authority;
- ownership;
- permissions;
- source-of-truth responsibility;
- required approvals;
- legal or compliance constraints; or
- accountability.

## The memory categories

### Conversation history

What was communicated, by whom, when and through which channel.

Conversation history is evidence and accountability. It is not automatically reusable knowledge.

### Situation memory

The versioned operational state of one situation, including claims, unknowns, conflicts, references and pending work.

Situation memory is current coordination state. It is not the same as general business knowledge.

### Episodic experience

What Tend attempted, what information and tools it used, what happened, who corrected it and what outcome followed.

Experience memory is the source material for learning.

### Semantic business knowledge

Terms, entities, relationships, concepts and local meanings that can help Tend understand future situations.

### Procedural memory

Reusable guidance about how Tend should approach a class of task, including preconditions, successful patterns and known failure warnings.

### Reflective or error memory

Structured observations about where Tend misunderstood, selected the wrong tool, omitted a required field, failed to gather necessary information or communicated incorrectly.

### Policy and authority

Formal business constraints and responsibility definitions. These may be represented for use by Tend, but they are not ordinary learned memory and cannot be changed by automatic learning.

## The ten Level 1 questions in plain language

### 1. What should Tend remember?

Which experiences, facts, meanings, procedures and corrections have future operational value?

### 2. What should never become memory?

Which information must remain transient, historical-only, excluded, private, untrusted or unavailable for future retrieval?

### 3. What belongs in conversation history?

Which communication records must remain as history and evidence without being promoted into durable knowledge?

### 4. What belongs in long-term business knowledge?

Which validated or automatically learned patterns are reusable across future situations for the same business?

### 5. How should previous conversations influence future decisions?

When may previous situations, messages or lessons affect the current situation, and in what form?

### 6. How do we prevent outdated knowledge from influencing new decisions?

How do time, validity, supersession, conflict and current source information control retrieval?

### 7. How do we update knowledge when reality changes?

How do we add newer observations, create new versions, preserve history and avoid silently overwriting the past?

### 8. Who owns business knowledge?

Who owns the official knowledge, who owns the experience record, and who may correct or retire a learned item?

### 9. Can Tend learn automatically?

What can Tend record, extract and activate without asking a person every time?

### 10. If so, what kind of learning is acceptable?

Which parts of Tend’s behaviour may improve, and which responsibilities must remain fixed outside learning?

## Extra questions discovered during the walkthrough

The ten questions are necessary but not sufficient. The discussion added these conceptual questions:

- How should memory be stored conceptually?
- How should new learning be reconciled and versioned?
- How should memory be retrieved?
- How do we assemble context for each situation phase?
- How should memory be scoped between businesses?
- How should Tend learn from its own mistakes?
- How do we evaluate automatic learning?

These are not separate product categories. They explain the mechanisms required to answer the ten original questions coherently.

## Working decisions

Memory is not one undifferentiated store.

Every learned item is scoped, typed, traceable and time-aware.

Automatic learning is the default, but a business can turn learning off or require manual validation.

Retrieval is not merely similarity search. It is context assembly based on the current situation, phase, operational objective, authority, risk and time.

The physical storage mechanism is not decided at Level 2.

Project X does not require a dedicated graph-memory technology. Typed references can produce graph-shaped knowledge without choosing graph storage.

The LLM can propose a learning item or a relationship between items. It cannot directly establish authoritative identity, supersession, permission or policy.
