# Architecture Construction Method

## 1. Purpose and Status

### 1.1 Purpose

This document defines the method used to construct Tend's **Level 2 Logical Architecture**.

The three-level framework defines what each level is responsible for:

- **Level 1** defines and expands the problem.
- **Level 2** transforms that understanding into a logical architecture.
- **Level 3** determines how that logical architecture is implemented technically.

The three-level framework therefore defines the **purpose and boundaries of Level 2**, but it does not fully define the reasoning procedure by which a complete logical architecture is constructed from the accumulated knowledge produced before it.

This document defines that construction procedure.

The purpose of the method is to ensure that the resulting architecture is:

- grounded in the actual problem Tend exists to solve;
- derived from the responsibilities discovered during Level 1;
- informed by the decisions and discoveries made during Level 2;
- constrained by relevant product, engineering, operational, security, compliance, scaling, and reliability requirements;
- informed by research without mechanically turning research findings into architectural components;
- internally coherent;
- explicit about ownership, authority, state, relationships, failure, and temporal behaviour;
- traceable back to the knowledge and decisions that justify it;
- resistant to omissions caused by limited human or model attention;
- and sufficiently stable to serve as the foundation for Level 3.

The method is therefore not a documentation exercise. It is a **controlled reasoning process for constructing a new architectural model from accumulated design intelligence**.

---



### 1.2 Relationship to the Three-Level Framework

This method does not modify or replace the three-level framework.

It operates **within Level 2**.

The three-level framework establishes that Level 2 should transform the business problem into a logical architecture and that the architecture should emerge from responsibilities rather than from arbitrary subsystem invention.

In particular, Level 2 establishes the principle that the goal is not to invent subsystems but to discover the responsibilities that naturally belong together and draw boundaries around independently ownable complete problems.

This document defines how that principle is applied systematically across the entire Tend system.

The relationship is therefore:

```text
Three-Level Framework
        │
        ├── Level 1: Problem Framing
        │
        ├── Level 2: Logical Architecture
        │        │
        │        └── Architecture Construction Method
        │
        └── Level 3: Technical Design
```

The framework defines **what Level 2 must produce**.

This method defines **how we construct it**.

---



### 1.3 What This Method Constructs

The output of this method is a **logical architecture**.

The logical architecture is a technology-independent model of how the system is organised to fulfil its responsibilities.

It describes, at minimum:

- what responsibilities exist;
- which responsibilities belong together;
- where boundaries exist;
- who owns important state and information;
- where authority resides;
- how responsibilities interact;
- what information moves between them;
- how state changes;
- how decisions are made;
- how humans participate;
- how the system behaves over time;
- how failures propagate or are contained;
- what invariants must hold;
- what constraints shape the design;
- and how the parts collectively satisfy the original problem.

The logical architecture is therefore more than a list of components and more than a diagram.

A component is only meaningful when its responsibility, ownership, boundary, behaviour, and relationships are understood.

Likewise, an interaction is only meaningful when the reason for the interaction and the semantics of what crosses the boundary are understood.

The architecture must represent the system as a coherent model rather than as a collection of named subsystems.

---



### 1.4 The Architecture Does Not Already Exist in the Knowledge Base

The knowledge base contains the intelligence required to construct the architecture, but it does not contain the finished architecture waiting to be extracted.

It contains different forms of evidence and prior reasoning, including:

- product intent;
- problem framing;
- responsibilities;
- constraints;
- Level 2 questions and decisions;
- research findings;
- discovered failure modes;
- engineering principles;
- product principles;
- ownership rules;
- invariants;
- operational requirements;
- and other design discoveries.

These materials describe different aspects of the problem and possible solution space.

The logical architecture is a **new model constructed from their relationships**.

This distinction is fundamental to the method.

We therefore do not assume:

> "The architecture is already present; we only need to find and document it."

We instead assume:

> "The knowledge base contains architectural evidence and design intelligence from which the architecture must be constructed."

This means that architecture construction necessarily involves synthesis, comparison, reconciliation, boundary formation, and architectural judgement.

---



### 1.5 Construction Is Not Extraction

**Extraction** attempts to recover an existing structure from existing material.

**Construction** creates a new structure by reasoning about the relationships between existing knowledge.

The difference is important.

An extraction-oriented process tends to ask:

> What components, concepts, or structures are already mentioned in the knowledge?

A construction-oriented process asks:

> Given everything we know about the problem, its responsibilities, constraints, state, actors, failures, relationships, and requirements, what organisation of responsibilities best satisfies the system?

The first can produce an organised summary of the knowledge base.

The second produces an architecture.

The distinction also prevents a common architectural failure: treating every important concept as a subsystem.

A research finding may become:

- a responsibility;
- a constraint;
- an invariant;
- an ownership rule;
- an interaction requirement;
- a cross-cutting concern;
- a technical consideration for Level 3;
- or have no direct architectural consequence.

Likewise, a Level 2 decision may influence several boundaries without itself becoming a component.

Architecture therefore cannot be produced by simply collecting the nouns that appear throughout the knowledge base.

It must be constructed by determining the **relationships and consequences** between the knowledge contained within it.

---



### 1.6 Why the Method Must Explicitly Control the Reasoning Process

The construction problem becomes more difficult when an LLM or other reasoning agent is involved.

An LLM can process a large amount of information, but providing a large amount of information does not mean that all of it will remain equally active during every subsequent reasoning step.

Important details may be:

- present in the context but not attended to;
- separated from the decision where they become relevant;
- represented in different documents;
- expressed using different terminology;
- implicit in an earlier decision;
- or overshadowed by more familiar architectural patterns.

An LLM also does not reason from the knowledge base alone.

Its training creates strong priors about common architectures, common subsystem names, common decomposition patterns, and common engineering solutions.

As a result, even when an agent is instructed to "use the knowledge base" or "derive the architecture from the existing research," it can naturally converge toward a familiar architecture rather than construct the architecture that the accumulated Tend-specific evidence requires.

Simply adding more instructions is not a sufficient solution.

The **method itself must constrain the reasoning process**.

The architecture construction method therefore exists partly to externalise architectural reasoning so that correctness does not depend on one human or model maintaining the entire knowledge base in active memory at once.

---



### 1.7 Externalised Architectural Memory

The knowledge base exists partly because important reasoning should not depend on human memory.

The same principle must apply during architecture construction.

Intermediate architectural models, evidence mappings, boundary decisions, relationship models, contradictions, and validation results become **externalised working memory** for the construction process.

Instead of repeatedly asking a human or agent to remember everything that has previously been discovered, the method progressively creates explicit architectural artefacts that subsequent reasoning can inspect and build upon.

This creates an important distinction:

```text
Knowledge Base
    ↓
Architectural Evidence
    ↓
Constructed Architectural Model
    ↓
Validated Architectural Model
```

Each stage exists because the previous stage answers a different question.

The final architecture is therefore not a compressed replacement for the knowledge base.

It is a new, more structured model that preserves the architectural consequences of the knowledge base.

---



### 1.8 Construction Must Preserve the Whole While Reasoning About Parts

Architecture cannot be constructed by independently solving isolated pieces and merging them at the end.

A decision about one responsibility can affect:

- another responsibility's boundary;
- ownership of state;
- interaction semantics;
- failure behaviour;
- temporal behaviour;
- authority;
- scaling;
- observability;
- human involvement;
- or another previously constructed decision.

Therefore the method must allow reasoning to move in both directions:

```text
Whole
  ↕
Part
  ↕
Part
  ↕
Relationship
  ↕
Whole
```

A construction step may begin with one responsibility, but the resulting decision must be evaluated against the architecture constructed so far.

Likewise, a later discovery may require an earlier architectural decision to be reconsidered.

The architecture is consequently treated as a connected model whose parts constrain one another rather than as a sequence of permanently


## 2. Why Architecture Must Be Constructed

### 2.1 The Problem

By the time Level 2 architecture construction begins, Tend's knowledge base may contain a substantial amount of prior reasoning.

That knowledge may include:

- the product vision and intended product behaviour;
- the problem expansion from Level 1;
- actors and their responsibilities;
- business rules and invariants;
- Level 2 engineering questions and their answers;
- research findings;
- operational and scaling considerations;
- security and compliance requirements;
- observations from previous experiments or implementations;
- decisions made during earlier design work;
- discovered failure modes;
- constraints imposed by external systems;
- requirements around humans and human collaboration;
- requirements around LLM interaction and the agent harness;
- observability and traceability requirements;
- and principles governing how Tend should behave.

It is tempting to treat this body of knowledge as an architecture that merely needs to be organised.

That is the wrong model.

The knowledge base is the **accumulated evidence and reasoning from which an architecture must be constructed**.

The architecture itself is a new model.

The central problem is therefore not:

> "How do we find the architecture that is already in the documents?"

It is:

> "How do we construct a coherent architectural model from a large body of distributed knowledge without losing the relationships, constraints, decisions, and discoveries that give that knowledge its meaning?"

That is the problem this method solves.

---

### 2.2 The Knowledge Base Is Distributed Architectural Intelligence

The architectural information required to make a decision rarely exists in one place.

A single architectural boundary may depend simultaneously on:

- a responsibility identified in Level 1;
- an answer to a Level 2 question;
- a product principle;
- a research finding;
- an ownership rule;
- a failure mode;
- a scaling constraint;
- and an observation about how an LLM interacts with the system.

The individual documents may therefore be internally complete while still not explicitly stating the final architectural relationship between them.

For example, one document may establish that Tend must understand a customer's operational situation.

Another may establish that ambiguity must remain explicit.

Another may establish that the source system remains authoritative for the underlying business record.

Another may establish that the same operational problem should have one situation model and one resolution path.

Another may establish requirements for observing how the system reached a decision.

None of those statements is necessarily a subsystem.

Together, however, they constrain what a valid architecture can look like.

The architectural task is to determine those relationships.

Therefore:

> **The unit of architectural reasoning is not the document. It is the relationship between the knowledge contained across documents.**

---

### 2.3 Why a Direct Extraction Process Fails

A direct extraction process typically looks like:

```text
Knowledge Base
      ↓
Read Documents
      ↓
Identify Concepts
      ↓
Group Concepts
      ↓
Name Components
      ↓
Draw Architecture
```

This can produce a plausible architecture quickly.

It can also produce an architecture that is fundamentally wrong.

The problem is that the process encourages the agent to identify visible concepts and map them to familiar architectural structures.

A document containing "knowledge management" may become a `Knowledge Management` component.

A document discussing "observability" may become an `Observability Service`.

A document discussing "human escalation" may become a `Human Collaboration Service`.

A document discussing "decision making" may become a `Decision Engine`.

The resulting architecture can look comprehensive while merely reflecting the vocabulary of the knowledge base.

It has not necessarily demonstrated:

- why those responsibilities belong together;
- what state each owns;
- which decisions each is authoritative for;
- how responsibilities interact;
- which relationships are necessary;
- which concepts are merely cross-cutting;
- where boundaries should actually exist;
- or whether the resulting decomposition preserves the business invariants.

This is the difference between **organising information** and **constructing architecture**.

---

### 2.4 Why "Just Tell the Agent to Synthesize" Is Not Enough

A natural response to the extraction problem is to instruct the agent:

> "Do not extract components. Synthesize the architecture."

That instruction is useful, but insufficient.

The agent still has to perform the synthesis somehow.

If the process remains:

```text
Read everything
      ↓
Reason about everything
      ↓
Produce architecture
```

then the fundamental problem remains.

The instruction changes the desired output, but it does not change the reasoning process that produces the output.

The agent may still:

- overweight easily retrieved information;
- overlook a constraint buried in another document;
- fail to connect two separately documented decisions;
- preserve familiar architectural patterns from its training;
- confuse an important concept with an independently owned responsibility;
- miss a relationship because neither document explicitly names it;
- or produce a coherent local interpretation that conflicts with a decision elsewhere.

Therefore the method cannot rely on the agent simply "being careful."

**The construction process itself must create the conditions under which those relationships are surfaced and checked.**

---

### 2.5 The Attention Problem

The problem is not unique to LLMs.

Human architects have the same fundamental limitation.

A sufficiently large system contains more relevant information than a person can continuously hold in active working memory.

An architect may have read:

- the product vision;
- dozens of research findings;
- hundreds of pages of problem analysis;
- many Level 2 decisions;
- operational requirements;
- security constraints;
- previous design discussions;
- and implementation discoveries.

Knowing that information exists is not equivalent to having it actively available when making every architectural decision.

The same is true for an LLM.

A large context window allows more information to be supplied, but it does not guarantee that every piece of information will receive equal attention during every reasoning step.

This creates a dangerous failure mode:

> **The system can have the information without effectively using the information.**

That is particularly problematic for architecture because many important constraints are relational.

A statement can appear irrelevant when read alone and become decisive when combined with another statement.

---

### 2.6 The Relational Nature of Architectural Knowledge

Architectural knowledge is often valuable because of relationships rather than because of isolated facts.

Consider the difference between:

```text
A responsibility exists.
```

and:

```text
A responsibility exists
+
it owns a particular state
+
another responsibility needs to observe that state
+
the state must remain consistent with another invariant
+
the external system remains authoritative
+
the information may arrive asynchronously
+
failures must be recoverable
```

The architecture emerges from the relationship between those facts.

No individual statement necessarily says:

> "Create subsystem X."

The architecture has to be constructed by reasoning across them.

This is why architecture construction cannot be reduced to summarisation, classification, or extraction.

---

### 2.7 LLM Priors Make the Problem More Important

An LLM brings another source of information into the process: its learned prior knowledge.

This is useful because it allows the agent to recognise patterns, identify alternatives, and reason about established engineering approaches.

It is dangerous when those priors silently substitute for Tend-specific reasoning.

Given a set of responsibilities such as:

- conversations;
- knowledge;
- decisions;
- policies;
- workflows;
- memory;
- integrations;
- human collaboration;
- observability;

an LLM can very easily produce a familiar architecture containing:

```text
Conversation Service
Knowledge Service
Decision Engine
Policy Engine
Workflow Engine
Memory Service
Integration Service
Human Service
Observability Service
```

The result may sound architecturally sophisticated.

But the component names alone do not establish that the boundaries are correct.

The model has recognised familiar architectural nouns.

It has not necessarily constructed Tend's architecture.

The method must therefore use the LLM's pattern-recognition ability while preventing those priors from becoming the source of architectural structure.

---

### 2.8 Architecture Must Be Constructed From Constraints, Not Merely From Concepts

A useful architectural model is not determined only by what the system does.

It is also determined by what the system **must not violate**.

For example:

- which system owns a piece of information;
- which state must remain consistent;
- which decisions require human authority;
- which information may be provisional;
- which external systems remain authoritative;
- what must be observable;
- what must be auditable;
- what may happen asynchronously;
- what failures must be recoverable;
- what may be eventually consistent;
- what must be deterministic;
- what may rely on probabilistic behaviour;
- what information the LLM can access;
- what actions the LLM is permitted to take.

These constraints may cut across several responsibilities.

Therefore architecture construction must work in both directions:

```text
Responsibilities
       ↕
Constraints
       ↕
Boundaries
       ↕
Interactions
       ↕
State
       ↕
Behaviour
```

A boundary that appears correct when viewed only through responsibilities may become invalid when consistency, authority, failure, or temporal constraints are applied.

That is not an exception to the method.

It is part of the method.

---

### 2.9 Construction Must Preserve Context Across Decisions

Architecture is not constructed through unrelated decisions.

Suppose the first architectural decision establishes:

```text
A owns state X.
```

A later decision about responsibility B must therefore consider that existing ownership.

If B needs information derived from X, the question is no longer simply:

> "What does B need?"

It becomes:

> "How should B interact with the already established ownership of X?"

Likewise, if a later decision establishes a new invariant involving X, an earlier boundary may need to change.

Therefore each construction step operates on:

```text
Current Architecture
        +
Relevant Evidence
        +
Current Question
        ↓
New Architectural Decision
        ↓
Updated Architecture
```

The architecture constructed so far is part of the input to every subsequent construction step.

This is the foundation of incremental architectural construction.

---

### 2.10 Construction Is Incremental, but the Architecture Is Global

Incremental construction does not mean that the system is designed one isolated component at a time.

The **reasoning unit** may be local.

The **architecture being constructed** remains global.

If we begin with responsibility A:

```text
A
```

then construct B:

```text
A + B
```

then C:

```text
A + B + C
```

then D:

```text
A + B + C + D
```

each new decision must be evaluated against what has already been constructed.

The process is therefore:

```text
Construct locally
       ↓
Integrate globally
       ↓
Check for contradiction
       ↓
Revise if necessary
       ↓
Continue
```

This prevents two opposite failure modes:

### Failure mode 1 — Global overload

Attempting to reason about the entire knowledge base and entire architecture simultaneously.

### Failure mode 2 — Local fragmentation

Solving each responsibility independently and attempting to merge the resulting components at the end.

The method must avoid both.

---

### 2.11 The Architecture Becomes External Memory

The constructed architecture is not only the final deliverable.

During construction, it becomes a new form of working memory.

Instead of requiring the next reasoning step to reconstruct everything that came before, the existing architectural model records:

- established responsibilities;
- boundaries;
- ownership;
- state;
- authority;
- relationships;
- decisions;
- constraints;
- and unresolved issues.

The next construction step can therefore reason against the **current architectural model** rather than against the entire historical conversation or knowledge base.

This is a critical property for both human and agent-assisted architecture work.

The process becomes:

```text
Historical Knowledge
        ↓
Relevant Evidence
        ↓
Architectural Model
        ↓
New Reasoning
        ↓
Updated Architectural Model
```

The model progressively becomes a structured representation of what has already been established.

This reduces the amount of historical information that must remain actively remembered while preserving its architectural consequences.

---

### 2.12 The Method Must Permit Backward Movement

Incremental construction does not mean that decisions become permanently frozen immediately after they are made.

Architecture contains dependencies.

A later discovery may invalidate an earlier decision.

For example:

```text
Responsibility A
    ↓
Boundary A chosen
    ↓
Responsibility C analysed
    ↓
New consistency requirement discovered
    ↓
Boundary A no longer coherent
```

The correct response is not to preserve Boundary A merely because it was decided earlier.

The correct response is to revisit the earlier decision.

Therefore the construction process must allow:

```text
Current Architecture
       ↓
New Evidence
       ↓
Contradiction
       ↓
Earlier Decision Revisited
       ↓
Architecture Revised
```

This is not architectural indecision.

It is controlled architectural correction.

The goal is not to minimise the number of times a decision changes.

The goal is to produce the strongest coherent architecture before Level 3 begins.

---

### 2.13 Research Must Be Converted Into Architectural Consequences

Research should not be treated as an additional list of components to incorporate.

Research provides evidence.

The construction process must determine what that evidence means architecturally.

A research finding may result in:

```text
Research Finding
      ↓
Architectural Interpretation
      ↓
One of:
  - Responsibility
  - Constraint
  - Invariant
  - Boundary implication
  - Interaction requirement
  - Cross-cutting concern
  - Level 3 consideration
  - No architectural consequence
```

For example, research about observability may establish that complete execution history must be reconstructable.

That does not automatically imply that Tend should have an independently owned "Observability Service."

Instead, the finding may impose requirements across execution responsibilities:

- executions produce structured events;
- decisions are observable;
- capability execution is recorded;
- verification outcomes are recorded;
- terminal states are recorded;
- business state changes have corresponding observable history.

The architectural consequence is therefore potentially **cross-cutting** rather than a single subsystem.

This distinction is essential because otherwise the architecture becomes a catalogue of research topics rather than a model of the system.

---

### 2.14 The Architecture Must Be Able to Expose Missing Knowledge

Architecture construction is also a diagnostic process.

While attempting to construct a boundary, we may discover that we cannot answer:

- who owns a state;
- who has authority to change it;
- what happens when information conflicts;
- whether two situations are the same;
- whether an operation must be atomic;
- what happens when an external system is unavailable;
- whether a decision can be reversed;
- or whether a human must intervene.

If the answer is genuinely unknown, the architecture should not silently invent one.

Instead, the construction process must identify the gap and return to the appropriate source of reasoning.

That may mean:

```text
Architecture
    ↓
Unresolved Question
    ↓
Level 2 Question
    ↓
Research / Reasoning
    ↓
New Decision
    ↓
Architecture
```

Architecture construction therefore provides feedback into the broader design process.

It does not merely consume the knowledge base.

It can reveal where the knowledge base itself is incomplete.

---

### 2.15 The Result Must Be Traceable

Because the architecture is constructed from distributed evidence, important architectural decisions must remain traceable.

For a significant architectural decision, it should be possible to determine:

```text
Architectural Decision
        ↓
Why was this decision necessary?
        ↓
Which responsibility required it?
        ↓
Which constraints shaped it?
        ↓
Which Level 2 decisions informed it?
        ↓
Which research or discoveries affected it?
        ↓
Which alternatives were considered?
        ↓
Why was this boundary or relationship selected?
```

Traceability prevents the architecture from becoming an unexplained collection of conclusions.

It also makes later revision possible.

If a requirement changes, we should be able to determine which architectural decisions depend on that requirement.

If an architectural decision changes, we should be able to determine what other decisions may need to be reconsidered.

---

### 2.16 Construction Is Therefore a Controlled Synthesis Process

The architecture construction problem can now be stated precisely.

We begin with distributed knowledge:

```text
Product
Level 1
Level 2
Research
Principles
Constraints
Discoveries
Failures
Operational requirements
```

We do not directly convert that knowledge into components.

Instead, we progressively construct an architectural model:

```text
Distributed Knowledge
        ↓
Architectural Evidence
        ↓
Responsibility Models
        ↓
Candidate Boundaries
        ↓
Relationships
        ↓
State / Authority / Behaviour
        ↓
Cross-Cutting Constraints
        ↓
Contradiction and Gap Analysis
        ↓
Revised Architecture
        ↓
Stable Logical Architecture
```

At every stage, the constructed model becomes part of the context for the next stage.

This makes the process neither pure top-down decomposition nor pure bottom-up extraction.

It is an iterative synthesis process in which:

- responsibilities provide the starting structure;
- constraints restrict valid structures;
- relationships connect the structures;
- architectural decisions establish ownership and behaviour;
- contradictions force reconsideration;
- and the growing architecture becomes externalised memory for subsequent reasoning.

---

### 2.17 The Core Principle

The central implication of this section is:

> **The architecture cannot be safely obtained by asking an agent to read the knowledge base and produce a final architecture. The architecture must be constructed through a sequence of controlled reasoning steps in which relevant knowledge is retrieved, responsibilities are modelled, boundaries are tested, relationships are established, constraints are applied, contradictions are exposed, and the resulting architectural model is continuously carried forward as externalised context.**

This is the fundamental reason for the Architecture Construction Method.

## 3. Inputs to Architecture Construction

### 3.1 Purpose

Architecture construction does not begin from an empty system model.

By the time Level 2 architecture construction begins, Tend has accumulated substantial knowledge through product definition, problem framing, engineering reasoning, research, experimentation, and previous design decisions.

The purpose of this section is to define the sources from which architecture may be constructed and the role each source plays.

The sources are not interchangeable.

Some establish **what Tend exists to do**.

Some establish **what problems must be solved**.

Some establish **how particular problems have been reasoned about**.

Some provide **external evidence**.

Some establish **constraints or principles**.

Some record **discoveries from previous work**.

Architecture construction must preserve these distinctions rather than treating the entire knowledge base as one undifferentiated body of information.

The constructor therefore works from a set of architectural inputs with different meanings and levels of authority.

---

### 3.2 The Input Set

The complete input set may include:

```text
Product Intent
Level 1 Problem Framing
Level 2 Engineering Questions and Decisions
Research
Product Principles
Engineering Principles
Constraints
Invariants
Existing Decisions
Discovered Failure Modes
Operational Requirements
External System Characteristics
Human Interaction Requirements
LLM / Agent Interaction Requirements
Observability and Traceability Requirements
Open Questions
```

Not every input will affect every architectural decision.

The construction process must therefore determine:

1. which inputs are relevant to the current construction problem;
2. what type of architectural information each input provides;
3. what authority that information has;
4. what architectural consequence, if any, follows from it;
5. and whether the consequence belongs in Level 2 or should remain for Level 3.

---

### 3.3 Product Intent

Product intent establishes the purpose and direction of the system.

It answers questions such as:

- What problem is Tend intended to solve?
- For whom?
- What outcome is Tend intended to produce?
- What behaviour is fundamental to the product?
- What does Tend intentionally not attempt to solve?
- What principles should remain true as the product evolves?

Product intent constrains architecture at the highest level.

An architecture that technically satisfies individual responsibilities but violates the product's intended purpose is not a valid architecture.

Product intent therefore acts primarily as a **scope and direction constraint**.

It does not normally define components directly.

For example, a product principle concerning how Tend should interact with people does not automatically imply a `Human Interaction Service`.

Instead, it constrains how responsibilities involving human interaction may be organised and how the system should behave across those responsibilities.

---

### 3.4 Level 1 Problem Framing

Level 1 is the primary source for understanding **what the system must solve**.

It establishes:

- the problem domain;
- actors;
- responsibilities;
- interactions;
- system boundaries;
- invariants;
- constraints;
- failure modes;
- scaling dimensions;
- and open engineering questions.

Level 1 therefore provides the initial responsibility space from which architecture is constructed.

The Level 2 construction process must preserve the distinction between:

> **what the problem requires**

and:

> **how the system will organise itself to satisfy that requirement.**

Level 1 does not prescribe the final subsystem boundaries.

It provides the responsibilities and conditions from which those boundaries are constructed.

A Level 1 responsibility is therefore an architectural input, not automatically an architectural component.

---

### 3.5 Level 2 Engineering Questions and Decisions

Level 2 engineering questions exist because important aspects of the solution cannot be determined merely by understanding the business problem.

They address questions such as:

- how the system determines whether enough information exists;
- how uncertainty and ambiguity are represented;
- how business policy is represented;
- when humans become involved;
- how knowledge evolves;
- how independent responsibilities coordinate;
- how trust is represented;
- how decisions are explained;
- and how the system recovers from uncertainty.

The answers to these questions are **architectural evidence**.

They are not automatically components.

A Level 2 answer may establish:

- a responsibility;
- a constraint;
- an invariant;
- an ownership rule;
- a state model;
- a relationship;
- a decision authority;
- a boundary implication;
- a temporal requirement;
- or a cross-cutting requirement.

The construction process must therefore determine the architectural consequence of each answer rather than mapping its subject directly to a subsystem.

---

### 3.6 Research

Research provides external evidence that may affect the architecture.

Relevant research may cover:

- customer and business journeys;
- operational workflows;
- channel behaviour;
- compliance;
- escalation and service expectations;
- market differences;
- scaling characteristics;
- public signals;
- external system behaviour;
- engineering practices;
- agent and harness design;
- observability;
- reliability;
- security;
- or other relevant domains.

Research does not have a single architectural role.

A research finding may:

```text
Research Finding
       ↓
Architectural Interpretation
       ↓
┌─────────────────────────────────┐
│ Responsibility                  │
│ Constraint                      │
│ Invariant                       │
│ Ownership rule                  │
│ Boundary implication            │
│ Interaction requirement         │
│ Cross-cutting concern           │
│ Level 3 consideration           │
│ No architectural consequence    │
└─────────────────────────────────┘
```

The construction process must make that interpretation explicitly.

A finding should not become architectural structure merely because it is important, detailed, or frequently mentioned.

---

### 3.7 Product and Engineering Principles

Principles establish qualities or rules that architecture should preserve across decisions.

Examples may include:

- source systems remain authoritative for their own records;
- business responsibilities should have clear ownership;
- ambiguity should not be silently collapsed;
- important execution history must remain reconstructable;
- humans retain authority where the product requires human judgement;
- technology should implement responsibilities rather than invent them;
- and architectural decisions should remain explainable and traceable.

Principles generally do not define a subsystem.

Instead, they act as **constraints on the construction process**.

A principle may apply to many responsibilities simultaneously.

For example, an observability principle may require every important execution path to produce reconstructable history.

That requirement can affect many responsibilities without implying that all observability behaviour belongs to a single independently owned subsystem.

---

### 3.8 Constraints

Constraints define conditions that the architecture must satisfy.

They may arise from:

- the business;
- product requirements;
- external systems;
- operational requirements;
- regulatory requirements;
- security requirements;
- performance expectations;
- reliability requirements;
- scaling expectations;
- human workflows;
- or known limitations of the environment.

Constraints may be local or global.

A local constraint may affect one responsibility.

A global constraint may affect multiple boundaries and interactions.

The construction process must therefore record where each significant constraint has architectural consequences.

A constraint that has not affected any architectural decision should be examined rather than silently forgotten.

Possible explanations include:

1. the constraint is not relevant to Level 2;
2. it is already satisfied by an existing decision;
3. it should affect multiple responsibilities as a cross-cutting requirement;
4. it belongs in Level 3;
5. or the architecture has failed to account for it.

---

### 3.9 Invariants

Invariants describe conditions that must remain true for the system to remain correct.

Examples include requirements around:

- ownership;
- state consistency;
- authority;
- identity;
- situation integrity;
- source-of-truth boundaries;
- auditability;
- or other business and system correctness conditions.

Invariants are particularly important during boundary construction.

A boundary that appears reasonable in isolation may be invalid if maintaining an invariant requires uncontrolled coordination across that boundary.

Therefore invariants must be considered not only after components have been created, but while the boundaries themselves are being constructed.

The question is not merely:

> "Can these responsibilities be separated?"

It is:

> "Can these responsibilities be separated while preserving the invariants that define correctness?"

---

### 3.10 Existing Decisions

Previous architectural or product decisions are inputs to construction, but they must be classified correctly.

A previous decision may be:

- a deliberate architectural commitment;
- a product decision;
- an established invariant;
- an implementation-specific decision;
- an experiment;
- a temporary assumption;
- or an unresolved interpretation that was never formally accepted.

The construction process must not treat all historical statements as equally authoritative.

For each significant prior decision, the constructor should determine:

```text
What was decided?
Why was it decided?
What problem did it solve?
What assumptions did it depend on?
Is it still valid?
What parts of the architecture depend on it?
```

A historical decision that is no longer valid must not constrain the new architecture merely because it appears earlier in the knowledge base.

Conversely, a decision that remains valid must not be lost simply because it is stored in an older document.

---

### 3.11 Discovered Failure Modes

Previous failures and unexpected behaviour are architectural inputs because they reveal properties of the real system or problem that may not have been visible during initial reasoning.

A failure may reveal:

- a missing responsibility;
- an incorrect boundary;
- an incorrect interaction;
- an ownership problem;
- an insufficient state model;
- a missing feedback path;
- an incorrect assumption;
- an observability gap;
- or a requirement that was previously implicit.

Failure evidence must therefore be interpreted architecturally.

The goal is not to create a component whose name resembles the failure.

The goal is to determine what the failure teaches us about the logical organisation of the system.

---

### 3.12 Operational Requirements

Architecture must account for the fact that Tend is intended to become a production system rather than remain a conceptual model.

Operational requirements may therefore influence:

- failure isolation;
- recovery;
- state durability;
- observability;
- traceability;
- human intervention;
- temporal behaviour;
- concurrency;
- scaling;
- security;
- and system evolution.

These requirements are architectural inputs even when their concrete implementation belongs to Level 3.

For example, the requirement that a complete execution history be reconstructable is a Level 2 architectural requirement.

The choice of storage mechanism, event transport, indexing strategy, or tracing technology belongs to Level 3.

The construction process must preserve that distinction.

---

### 3.13 External System Characteristics

Tend interacts with systems that it does not own.

Those systems may provide:

- messages;
- business records;
- payments;
- delivery information;
- employee information;
- communication channels;
- authentication;
- or other external capabilities.

Their characteristics can impose architectural constraints.

The architecture must therefore distinguish:

```text
Tend responsibility
        vs
External system responsibility
```

In particular, Tend should not silently become the source of truth for information whose canonical ownership belongs elsewhere.

Tend may maintain:

- references;
- claims;
- derived information;
- situation-specific interpretations;
- execution history;
- or other information necessary for its own responsibilities.

But the existence of that information inside Tend does not automatically transfer ownership of the original business record to Tend.

External system characteristics therefore influence boundaries, authority, synchronization, failure behaviour, and information flow.

---

### 3.14 Human Interaction Requirements

Humans are system actors, not merely recipients of final outputs.

Human involvement may include:

- providing information;
- resolving ambiguity;
- approving actions;
- correcting interpretations;
- handling exceptions;
- making decisions;
- supervising execution;
- or reviewing system behaviour.

These interactions can influence logical architecture.

However, "human interaction" does not automatically constitute one subsystem.

Instead, the construction process must determine:

- which responsibility requires human participation;
- why human authority is required;
- what information the human needs;
- what state is changed by human action;
- what responsibility owns that state;
- and how the system resumes or changes behaviour afterward.

Human interaction may therefore appear as a relationship, authority boundary, state transition, or responsibility depending on the situation.

---

### 3.15 LLM and Agent Interaction Requirements

Tend may itself interact with LLMs or agents as part of its operation.

The LLM should therefore be treated as an **interactor with the system**, not merely as an invisible implementation detail.

Architectural questions may include:

- what information the model can access;
- what information must be explicitly provided;
- what capabilities it can invoke;
- what authority those capabilities provide;
- how uncertainty is represented;
- how state is exposed;
- how previous execution context is retrieved;
- how errors are communicated;
- how the model receives feedback;
- and how the system constrains or verifies model behaviour.

These requirements may influence several responsibilities simultaneously.

They should therefore not automatically produce a single "LLM Service" boundary.

The construction process must determine which existing responsibilities are affected and whether a genuinely independent responsibility exists.

---

### 3.16 Observability and Traceability Requirements

Observability and traceability are architectural inputs when the system must explain or reconstruct its own execution.

Requirements may include the ability to determine:

- what happened;
- when it happened;
- which responsibility performed it;
- what decision was made;
- what information was available;
- what action was taken;
- what verification occurred;
- what failed;
- and how the system reached its terminal state.

Such requirements may span the entire execution model.

Therefore they should be treated as architectural constraints and cross-cutting behaviour where appropriate rather than automatically isolated into a standalone subsystem.

The construction process must determine which responsibilities produce, consume, or depend upon observable execution history.

---

### 3.17 Open Questions

Open questions are inputs of a different kind.

They do not establish architectural truth.

They establish **uncertainty that may affect architectural truth**.

An open question should therefore be tracked when it could change:

- a responsibility;
- a boundary;
- ownership;
- authority;
- state;
- interaction;
- failure behaviour;
- temporal behaviour;
- or another significant architectural decision.

An unresolved question that cannot affect the architecture does not necessarily need to block construction.

An unresolved question that could invalidate a major boundary must remain visible until resolved.

This creates a distinction between:

```text
Known architectural fact
        vs
Architectural assumption
        vs
Open architectural question
```

The construction process must never silently convert the third into the first.

---

### 3.18 Input Authority and Conflict Resolution

Different sources may disagree.

For example:

- an older document may conflict with a newer decision;
- research may challenge an earlier assumption;
- an implementation discovery may expose an architectural weakness;
- a product requirement may conflict with an engineering preference;
- or two Level 2 decisions may impose incompatible constraints.

The construction process must therefore preserve the fact that **not all statements have equal authority**.

When conflicting inputs are encountered, the conflict must be made explicit and resolved according to the appropriate source of authority.

The correct response is not to silently select whichever statement is easiest to use.

The process should identify:

```text
Conflict
   ↓
Statements in conflict
   ↓
Source and authority of each
   ↓
Underlying assumption
   ↓
Required decision
   ↓
Architectural consequence
```

If the conflict cannot yet be resolved, the affected architectural decision remains provisional.

---

### 3.19 Relevance Is Determined by Architectural Consequence

The constructor does not need to treat every piece of knowledge as equally relevant to every decision.

Instead, relevance should be determined by potential architectural consequence.

An input is relevant to a construction step when changing or ignoring that input could change the resulting:

- responsibility;
- boundary;
- ownership;
- authority;
- state;
- interaction;
- invariant;
- failure behaviour;
- temporal behaviour;
- or other architectural property.

This gives a practical retrieval principle:

> **Retrieve knowledge based on the architectural decision being constructed, not merely based on document topic.**

For example, when evaluating whether two responsibilities can share a boundary, relevant evidence should include information about their ownership, state, consistency requirements, lifecycle, failure behaviour, scaling, and authority—not simply every document mentioning either responsibility.

---

### 3.20 The Input Set Is Not a Flat Context

The construction process should therefore not treat the knowledge base as:

```text
Document 1
Document 2
Document 3
...
Document N
```

Instead, it should reason over an interpreted set of architectural inputs:

```text
                         Product Intent
                              │
                              ▼
                         Level 1
                              │
                  Responsibilities / Constraints
                              │
                              ▼
                         Level 2
                              │
              Decisions / State / Authority / Rules
                              │
                              ▼
Research ───────► Architectural Evidence ◄────── Principles
                              ▲
                              │
        Failures / Operations / External Systems
                              │
                              ▼
                    Construction Process
```

The documents remain the source material.

The architectural evidence extracted and interpreted from them becomes the working material for construction.

This distinction is important:

> **The method retrieves documents, but it reasons over architectural evidence.**

---

### 3.21 Inputs Must Be Preserved at Their Original Meaning

During construction, information should not be transformed prematurely.

A statement about uncertainty should not immediately become a component.

A statement about ownership should not immediately become a database boundary.

A research finding about operational behaviour should not immediately become a service.

A requirement about observability should not immediately become a logging subsystem.

A statement should first be understood according to what it actually establishes.

Only then should its architectural consequence be constructed.

This protects the architecture from premature categorisation.

---

### 3.22 The Construction Input Pipeline

The complete input process can therefore be represented as:

```text
Knowledge Sources
        ↓
Retrieve Relevant Material
        ↓
Understand Original Meaning
        ↓
Identify Architectural Evidence
        ↓
Classify Evidence
        ↓
Determine Architectural Consequence
        ↓
Provide Evidence to Construction
```

The constructor does not skip directly from:

```text
Document → Component
```

The intended path is:

```text
Document
   ↓
Meaning
   ↓
Evidence
   ↓
Architectural consequence
   ↓
Construction
```

This is the first major control against extraction-oriented reasoning.

---

### 3.23 What Counts as a Valid Input

A piece of information is a valid architectural input when it can materially affect the logical organisation or behaviour of the system.

It may be:

- an explicit requirement;
- a discovered responsibility;
- a constraint;
- an invariant;
- a decision;
- a validated external fact;
- a failure observation;
- an ownership rule;
- a temporal requirement;
- or another piece of evidence with architectural consequence.

The constructor should not require every architectural input to already be phrased in architectural language.

A business observation may become an architectural constraint.

A research finding may expose a missing responsibility.

A failure may reveal an incorrect boundary.

A Level 2 answer may establish a state relationship.

The purpose of the construction method is precisely to perform these transformations deliberately rather than implicitly.

---

### 3.24 Output of the Input Stage

The output of this stage is not an architecture.

It is a **relevant, classified body of architectural evidence** that can be used by the construction process.

Conceptually:

```text
Product + Level 1 + Level 2 + Research + Principles
                         ↓
               Architectural Evidence
                         ↓
            Architecture Construction
```

The evidence must retain enough provenance that later architectural decisions can be traced back to the knowledge that produced them.

The next section defines the structure of that evidence and the intermediate representations used to prevent important relationships from being lost during construction.

## 4. Architectural Evidence Model

### 4.1 Purpose

Architecture construction must not operate directly on the raw contents of the knowledge base.

The knowledge base contains information expressed in many different forms:

- business requirements;
- product principles;
- responsibilities;
- decisions;
- research findings;
- constraints;
- examples;
- failures;
- assumptions;
- observations;
- and unresolved questions.

These forms of information do not have the same architectural meaning.

Before they can be used reliably during construction, the relevant information must be interpreted as **architectural evidence**.

The Architectural Evidence Model provides the intermediate representation between the knowledge base and the logical architecture.

```text id="yq3p1a"
Knowledge Sources
        ↓
Relevant Knowledge
        ↓
Architectural Evidence Model
        ↓
Architecture Construction
        ↓
Logical Architecture
```

The purpose of this model is not to create another version of the knowledge base.

Its purpose is to make the information that can affect architecture explicit in forms that can be reasoned about, compared, connected, and traced.

The evidence model is therefore a **working representation for architectural construction**.

---

### 4.2 Why an Intermediate Evidence Model Is Necessary

Without an intermediate model, the construction process risks jumping directly from statements in documents to architectural structures.

That creates an implicit transformation:

```text id="t9jv4r"
Document statement
      ↓
Agent interpretation
      ↓
Component
```

The transformation is too large.

There is no explicit record of:

- what the original statement established;
- what interpretation was made;
- what architectural consequence was inferred;
- what other evidence supported that consequence;
- or why the resulting boundary was considered valid.

The evidence model introduces an explicit intermediate step:

```text id="c9db9q"
Document statement
      ↓
Meaning
      ↓
Architectural evidence
      ↓
Architectural consequence
      ↓
Architectural decision
```

This separation is important because the same piece of knowledge can have different architectural consequences depending on its relationship to other evidence.

For example:

> "Ambiguity must remain explicit."

does not directly imply a component.

It may imply:

- a state representation;
- a responsibility boundary;
- an invariant;
- an interaction requirement;
- or a constraint on downstream responsibilities.

The evidence model allows that distinction to remain visible until the architecture is actually constructed.

---

### 4.3 Evidence Is Not Architecture

Architectural evidence must not be confused with architectural structure.

The evidence model may contain:

```text id="4f5x6s"
Responsibility
Constraint
Invariant
State
Ownership
Authority
Relationship
Failure
Temporal behaviour
Decision
Assumption
Open question
Cross-cutting concern
```

None of these automatically becomes a component.

For example:

- an invariant may constrain several components;
- an ownership rule may determine a boundary;
- a failure mode may reveal that two responsibilities should be separated;
- a temporal requirement may affect an interaction;
- an observability requirement may span the entire execution path;
- a research finding may have no direct Level 2 architectural consequence.

The evidence model therefore describes **what the architecture must account for**, not **what the architecture must contain**.

---

### 4.4 Evidence Must Preserve Provenance

Every significant piece of architectural evidence should retain its source.

At minimum, the construction process should be able to answer:

```text id="t7v0mg"
What is the evidence?
Where did it come from?
What did the original source actually establish?
When was it established?
What interpretation was made?
What architectural consequence does it have?
```

This is necessary because architectural reasoning is cumulative.

If an architectural decision is later questioned, the system should be able to trace it back through the reasoning that produced it.

Conceptually:

```text id="8x8c8y"
Architectural Decision
        ↓
Architectural Consequence
        ↓
Evidence
        ↓
Source
```

Provenance also prevents an interpretation from silently becoming indistinguishable from an original fact.

This is especially important when the evidence concerns uncertainty, provisional interpretations, external claims, or research findings.

---

### 4.5 Evidence Types

The following evidence types form the core vocabulary of the construction process.

They are not necessarily the final vocabulary of the architecture.

They are the vocabulary used to reason about the architecture before and during its construction.

---

## 4.6 Responsibility

A **responsibility** describes something the system, an actor, or an architectural part must be responsible for doing or maintaining.

A responsibility should answer:

> What problem must be solved or what outcome must be maintained?

Examples may include:

- understanding a customer's situation;
- determining relevant information;
- deciding what action is appropriate;
- coordinating work;
- communicating with a customer;
- verifying an outcome;
- maintaining a particular operational state.

A responsibility should not initially be phrased as a component.

For example:

```text id="v1r7lm"
"Situation Understanding"
```

is useful as a responsibility.

```text id="f0b5kj"
"Situation Understanding Service"
```

already assumes an architectural boundary.

The evidence model intentionally keeps the first form separate from the second.

---

## 4.7 Constraint

A **constraint** describes something the architecture must satisfy or cannot violate.

Constraints may come from:

- product requirements;
- business requirements;
- external systems;
- security;
- compliance;
- operations;
- reliability;
- scaling;
- human workflows;
- or engineering requirements.

Examples include:

```text id="q7u0z2"
A source system remains authoritative for its own business record.

A wrong interpretation must not silently become an established fact.

Important execution history must remain reconstructable.

A responsibility must not exceed the authority granted to it.

A system must remain useful while non-critical information is unknown.
```

A constraint does not define a component.

It restricts the set of architectures that can be considered valid.

---

## 4.8 Invariant

An **invariant** describes a condition that must remain true for the system to remain correct.

The difference between a constraint and an invariant is useful:

- a constraint describes a requirement imposed on the design;
- an invariant describes a condition that must hold within the resulting system or its state.

Examples include:

```text id="l6g5a9"
An external business record remains owned by its source system.

A provisional interpretation is never represented as an established fact.

A business state change has corresponding execution history.

A situation cannot silently absorb an unrelated operational problem.
```

Invariants are particularly important when constructing boundaries because they expose cases where seemingly independent responsibilities actually require coordinated correctness.

---

## 4.9 State

**State** describes information whose current value affects future system behaviour.

State may include:

- operational situation state;
- known information;
- unknown information;
- conflicting claims;
- provisional interpretations;
- workflow state;
- execution state;
- human assignment;
- verification state;
- or other durable or transient conditions.

For each important state, construction should establish:

```text id="hj1tq5"
What does the state represent?
Who owns it?
Who may change it?
Who may observe it?
What transitions are valid?
What causes those transitions?
What invariants constrain it?
How does it behave over time?
```

State is especially important because state ownership is often a stronger boundary signal than conceptual naming.

Two responsibilities that appear conceptually separate may need to share a boundary if correctness depends on their state changing together.

Conversely, two responsibilities that discuss the same domain concept may still require separate boundaries if their state has different ownership, lifecycle, or authority.

---

## 4.10 Ownership

**Ownership** identifies which responsibility or external system is authoritative for a piece of information, state, or capability.

Ownership is different from access.

A responsibility may use information without owning it.

For example:

```text id="p5v7wh"
External System
    owns order record
        ↓
Tend
    reads order information
        ↓
Tend
    creates situation-specific interpretation
```

Tend may therefore hold references, claims, derived information, or contextual interpretations without becoming the canonical owner of the original business record.

Ownership is a fundamental input to boundary construction.

A boundary that creates unclear or competing ownership should be treated as suspect.

---

## 4.11 Authority

**Authority** describes who or what is permitted to make a decision or perform an action.

Authority should be distinguished from responsibility.

A responsibility may determine that something needs to happen while another responsibility, human actor, or external system retains authority to approve or perform it.

For significant decisions or actions, the construction process should determine:

```text id="y8ukzf"
Who may decide?
Who may execute?
Who may approve?
Who may override?
Who may observe?
```

Authority boundaries often become architectural boundaries.

They may also create interactions between otherwise independent responsibilities.

---

## 4.12 Relationship

A **relationship** describes a meaningful dependency or interaction between two responsibilities, actors, states, or systems.

Relationships must describe more than the fact that two things communicate.

The construction process should determine the semantics of the relationship.

Examples include:

```text id="2n3s8w"
Request / response
Event notification
State observation
State mutation
Information provision
Decision request
Authority delegation
Coordination
Verification
Feedback
Correction
Human intervention
```

A relationship is architectural evidence before it becomes a concrete interaction.

For example:

> "Responsibility B needs to know when state X changes."

is evidence.

The eventual architecture may implement that relationship through an event, query, shared state, or another mechanism at Level 3.

---

## 4.13 Failure

A **failure** describes a condition in which a responsibility, dependency, assumption, or interaction does not behave as expected.

Failures are architectural evidence because they reveal how the system must behave when normal execution does not occur.

For each significant failure, construction should ask:

```text id="4r7qj9"
What failed?
Who detects it?
Who owns the resulting state?
Can the failure be retried?
Can it be corrected?
Does it affect another responsibility?
What information must be preserved?
Does authority change?
Does a human become involved?
What happens if the failure persists?
```

A failure may reveal:

- a missing responsibility;
- an incorrect boundary;
- an incorrect ownership model;
- an interaction that is too tightly coupled;
- a missing recovery path;
- or a missing state transition.

Failures therefore participate directly in architectural construction.

---

## 4.14 Temporal Behaviour

**Temporal behaviour** describes how a responsibility or relationship behaves over time.

This includes:

- synchronous behaviour;
- asynchronous behaviour;
- delayed information;
- stale information;
- retries;
- expiration;
- deadlines;
- ordering;
- duplication;
- eventual completion;
- human waiting periods;
- and changes that occur after an earlier decision.

Time is architectural information because two responsibilities may appear independent when viewed statically but become tightly coupled when their timing requirements are considered.

For important temporal behaviour, construction should establish:

```text id="xk4z6p"
When does the behaviour begin?
What must happen immediately?
What may happen later?
What state persists while waiting?
What can change while waiting?
What happens if events arrive out of order?
What happens if the expected event never arrives?
```

---

## 4.15 Decision

A **decision** records a conclusion that constrains subsequent architectural reasoning.

A decision should preserve:

- what was decided;
- why;
- what alternatives were considered;
- what assumptions it depends upon;
- what it constrains;
- and whether it remains authoritative.

Decisions are different from responsibilities.

For example:

> "Ambiguity should be represented explicitly."

is a decision.

The architectural responsibility that owns that behaviour must still be constructed.

Similarly:

> "The source system remains authoritative for the original order."

is an ownership decision.

It does not automatically define the complete boundary of the responsibility that consumes that order information.

---

## 4.16 Assumption

An **assumption** is a statement being relied upon that has not yet been established as architectural truth.

Assumptions must remain distinguishable from decisions and invariants.

For each important assumption, construction should record:

```text id="v7b5k2"
What is assumed?
Why is it being assumed?
What depends on it?
What evidence would validate it?
What happens if it is false?
```

This prevents assumptions from becoming invisible architecture.

If an assumption could invalidate a major boundary or responsibility, it must remain visible during construction.

---

## 4.17 Open Question

An **open question** represents unresolved knowledge that may affect the architecture.

An open question should identify:

- what remains unknown;
- why it matters;
- which architectural decisions depend on it;
- and what would change if different answers were obtained.

An open question is not a defect in the architecture.

It is a controlled representation of uncertainty in the construction process.

However, an unresolved question that can materially alter a major architectural decision should prevent that decision from being treated as final.

---

## 4.18 Cross-Cutting Concern

A **cross-cutting concern** is a requirement or behaviour that affects multiple responsibilities without necessarily constituting an independently owned responsibility.

Examples may include:

- observability;
- traceability;
- auditability;
- security controls;
- compliance requirements;
- correlation;
- provenance;
- or certain reliability requirements.

The existence of a cross-cutting concern does not imply a subsystem.

This distinction is essential.

For example, if every important execution must produce reconstructable history, the resulting requirement may affect:

- request handling;
- orchestration;
- capability execution;
- verification;
- and terminal state recording.

The architectural consequence may therefore be distributed across those responsibilities rather than concentrated into an `Observability` component.

---

## 4.19 Architectural Evidence Is Typed

The same statement may contribute more than one type of evidence.

For example:

> "Tend must not become the source of truth for an external order."

may establish:

```text
Constraint
Ownership rule
Invariant
Boundary implication
```

The construction process should therefore not force every statement into exactly one category.

The categories describe **architectural meaning**, not mutually exclusive document labels.

Likewise, one responsibility may generate several evidence types:

```text id="v5j9q4"
Responsibility
    ├── State
    ├── Invariants
    ├── Authority
    ├── Relationships
    ├── Failure behaviour
    └── Temporal behaviour
```

This allows the model to preserve the relationships that are often lost when information is flattened into a component list.

---

## 4.20 Evidence Relationships

The evidence model must represent relationships between evidence items themselves.

For example:

```text id="p4o6kz"
Responsibility A
      │
      ├── owns → State X
      │
      ├── constrained by → Invariant Y
      │
      ├── depends on → Responsibility B
      │
      ├── affected by → Failure F
      │
      └── requires → Authority Z
```

Similarly:

```text id="k2e5x8"
Research Finding
      ↓
supports
      ↓
Constraint
      ↓
affects
      ↓
Boundary Decision
```

And:

```text id="g5s7r1"
Open Question
      ↓
could invalidate
      ↓
Boundary Decision
```

These relationships are important because architecture emerges from them.

The evidence model is therefore not merely a table of classified statements.

It is a **connected model of architectural evidence**.

---

## 4.21 Evidence Should Be Constructed at the Smallest Useful Unit

A large paragraph may contain several distinct architectural facts.

The construction process should separate them when necessary.

For example:

> "The customer may have several open problems. Messages may therefore be ambiguous. Tend should preserve alternative interpretations and should not merge unrelated situations."

This may contain:

```text id="e9f0u7"
Fact:
Customers may have multiple open problems.

Condition:
A message may therefore have multiple plausible targets.

Decision:
Alternative interpretations must remain explicit.

Invariant:
Unrelated situations must not be silently merged.

Architectural implication:
Situation state must be able to represent unresolved relationships.
```

Keeping these distinct makes later reasoning much more precise.

It also allows one architectural consequence to be traced to the exact evidence that supports it.

---

## 4.22 Evidence Should Preserve Uncertainty

Architectural evidence can itself be uncertain.

The model must therefore distinguish:

```text id="d9t2qn"
Established
Provisional
Assumed
Conflicting
Unknown
Rejected
Superseded
```

This distinction matters because construction should not treat an uncertain input as equivalent to an established constraint.

For example:

```text id="8v0kq3"
Research suggests X.
```

is not equivalent to:

```text id="w5b4p6"
Tend must satisfy X.
```

The first is evidence.

The second is an architectural decision or constraint.

The transformation between them must be explicit.

---

## 4.23 Evidence Should Preserve Scope

Evidence must also preserve where it applies.

A requirement may apply to:

- one responsibility;
- one interaction;
- one class of situations;
- all executions;
- one external system;
- or the entire product.

For example:

```text id="s7n1m2"
"Every execution must be reconstructable"
```

has system-wide scope.

Whereas:

```text id="q4f8y6"
"Candidate interpretations must remain provisional"
```

may apply specifically to situation understanding.

Incorrect scope is another form of architectural error.

A local requirement incorrectly treated as global can produce unnecessary boundaries and complexity.

A global requirement incorrectly treated as local can leave large portions of the architecture inconsistent.

---

## 4.24 Evidence Should Preserve Temporal Context

Some evidence changes meaning over time.

A decision may have been valid under an earlier product assumption.

A research finding may have been based on an earlier market condition.

An implementation discovery may have superseded an earlier assumption.

A source claim may have been true at one point but stale later.

The evidence model should therefore preserve temporal context when it affects interpretation.

At minimum:

```text id="7g2k1v"
When was this established?
What state of the system or product did it describe?
Is it still current?
What later evidence changed it?
```

This is particularly important for architecture because stale assumptions can otherwise become permanent boundaries.

---

## 4.25 Evidence Must Support Architectural Traceability

The evidence model should allow traceability in both directions.

### Forward traceability

```text id="0g6w2s"
Source
  ↓
Evidence
  ↓
Architectural Decision
  ↓
Boundary / Responsibility / Relationship
```

### Backward traceability

```text id="3v9d7x"
Architectural Decision
  ↓
Evidence
  ↓
Source
```

Both directions matter.

Forward traceability answers:

> "What architectural consequences did this discovery have?"

Backward traceability answers:

> "Why does this architectural decision exist?"

Together they prevent architectural decisions from becoming disconnected from the reasoning that produced them.

---

## 4.26 Evidence Does Not Need to Become Permanent Documentation

The evidence model is a construction mechanism.

Not every intermediate evidence item needs to appear verbatim in the final logical architecture document.

Some evidence will:

- combine into a larger architectural decision;
- become an explicit constraint;
- be represented by a relationship;
- be superseded;
- be rejected;
- or remain only as traceability.

The final architecture is therefore a **derived model of the evidence**, not a transcription of it.

This is another reason construction differs from extraction.

---

## 4.27 The Evidence Model as External Working Memory

The evidence model serves a second purpose beyond classification.

It prevents important reasoning from being dependent on active memory.

Instead of requiring the architect or agent to remember:

> "There was some earlier research that said this boundary might be problematic because of ownership and temporal behaviour..."

the evidence model records the relationship explicitly.

The next construction step can retrieve:

```text id="9m3q8b"
Boundary Candidate
      ↓
Ownership Evidence
      ↓
Temporal Evidence
      ↓
Consistency Evidence
      ↓
Failure Evidence
```

The reasoning can therefore operate over structured, relevant evidence rather than reconstructing historical context from memory.

This is one of the principal mechanisms by which the Architecture Construction Method addresses the attention problem established earlier.

---

## 4.28 Evidence Is Not a One-Time Extraction Step

The evidence model should not be treated as something that is built once at the beginning and then frozen.

Architecture construction can reveal that:

- an earlier statement was misunderstood;
- an important relationship was missing;
- a responsibility was incorrectly defined;
- a research finding has a different architectural consequence than originally assumed;
- or a new architectural question requires additional evidence.

The evidence model must therefore evolve alongside the architecture.

The process is:

```text id="v5m8q2"
Source Knowledge
      ↓
Evidence
      ↓
Architecture
      ↓
New Discovery
      ↓
New / Revised Evidence
      ↓
Architecture Revision
```

This keeps the architecture and its supporting reasoning aligned.

---

## 4.29 Minimum Evidence Record

For significant evidence, the construction process should preserve at least:

```text id="n8k3c6"
Evidence ID
Type
Statement / Meaning
Source
Provenance
Scope
Confidence / Status
Related Evidence
Architectural Consequence
Affected Responsibilities
Affected Decisions
```

Not every field must be exposed identically in the final document.

The purpose is to ensure that important architectural reasoning remains recoverable.

---

## 4.30 Evidence Quality Rules

Architectural evidence should satisfy the following rules:

### 1. Preserve original meaning

Do not convert a statement into an architectural conclusion before understanding what it actually establishes.

### 2. Separate fact from interpretation

Record what the source says separately from what the constructor infers.

### 3. Preserve uncertainty

Do not silently turn assumptions, provisional interpretations, or conflicting claims into facts.

### 4. Preserve provenance

Important evidence must remain traceable to its source.

### 5. Preserve relationships

Evidence should be connected to related evidence rather than treated as isolated statements.

### 6. Preserve scope

Record whether an item applies locally or globally.

### 7. Preserve authority

Distinguish product decisions, engineering decisions, research evidence, assumptions, and unresolved questions.

### 8. Preserve temporal context

Do not allow stale information to silently remain architectural truth.

### 9. Do not force architectural structure prematurely

Evidence informs architecture; it does not automatically define components.

### 10. Allow revision

New evidence may change the architectural consequence of earlier evidence.

---

## 4.31 From Evidence to Architecture

The Architectural Evidence Model establishes the material from which architecture can be constructed.

The next transformation is therefore:

```text id="7b4wq1"
Architectural Evidence
        ↓
Responsibility Models
        ↓
Candidate Relationships
        ↓
Candidate Boundaries
        ↓
Architectural Decisions
        ↓
Logical Architecture
```

The evidence model does not decide the architecture by itself.

It makes the reasoning required to construct the architecture explicit and recoverable.

The next section defines how the construction process progressively reasons over this evidence while carrying the architecture already constructed into each subsequent decision.

---

### 4.32 Core Principle

> **Before architectural structure is constructed, relevant knowledge must be represented as explicit architectural evidence with preserved meaning, provenance, scope, uncertainty, and relationships. Evidence informs architecture; it does not automatically become architecture.**

This principle establishes the intermediate layer required to prevent the construction process from collapsing back into extraction.

# 5. Incremental Construction Protocol

## 5.1 Purpose

Architecture construction must be incremental.

The system cannot reliably construct Tend's logical architecture by loading the entire knowledge base into context, reasoning over everything simultaneously, and producing a final architecture in one pass.

That approach recreates the problem this method is intended to solve.

The architecture must instead be constructed through a sequence of controlled reasoning steps. Each step adds architectural understanding to an already-existing model while selectively retrieving the evidence required for the next decision.

The construction therefore follows the pattern:

```text
A
↓
A + B
↓
A + B + C
↓
A + B + C + D
↓
...
```

Where each letter represents a newly constructed architectural understanding, not simply a newly read document.

At every stage:

```text
Current Architecture
        +
Relevant Architectural Evidence
        +
New Construction Question
        ↓
Architectural Reasoning
        ↓
Updated Architecture
```

The important property is that the previous architecture remains part of the working context.

The process does not repeatedly start from the knowledge base and regenerate the architecture.

It continuously transforms an evolving architectural model.

---

## 5.2 Principle: Construct With Accumulated Context, Not Total Context

The construction process must preserve the distinction between **total available knowledge** and **active reasoning context**.

Tend's knowledge base may contain a large amount of highly distilled information. Not all of that information is relevant to every architectural decision.

Trying to keep everything active simultaneously creates two opposing problems:

1. the reasoning context becomes too large to maintain precise attention;
2. important relationships become less visible because unrelated information competes for attention.

Therefore, the construction process must not attempt to maximize the amount of information supplied to each reasoning step.

It must maximize the amount of **relevant architectural context** available to that step.

This leads to the rule:

> **Retrieve broadly enough to protect against missing important evidence, but reason locally enough to preserve attention and precision.**

The architecture itself becomes the mechanism that reconnects local reasoning to the global system.

---

## 5.3 The Construction Context

Every construction step operates on a defined **Construction Context**.

The Construction Context is the smallest externalized package that allows the current architectural question to be answered without losing its relationship to the architecture already constructed.

At minimum, it contains:

```text
Construction Context
│
├── Current Architecture
│
├── Current Architectural Evidence
│
├── Construction Question
│
├── Relevant Source Evidence
│
├── Existing Decisions
│
├── Known Constraints / Invariants
│
├── Relevant Open Questions
│
└── Current Unresolved Tensions
```

These elements have different purposes.

### Current Architecture

This is the architecture constructed so far.

It includes the responsibilities, candidate boundaries, relationships, decisions, and unresolved areas already established.

It is not merely a summary.

It is the current working model against which new architectural reasoning must be performed.

### Current Architectural Evidence

This contains the evidence directly supporting the portions of the architecture currently being examined.

It allows the constructor to distinguish:

```text
What the architecture currently says
```

from:

```text
Why the architecture currently says it
```

### Construction Question

Every step must have an explicit architectural question.

Examples include:

- What responsibility must exist to solve this problem?
- Which responsibilities naturally belong together?
- Should these responsibilities share a boundary?
- Who owns this state?
- Where does this decision have authority?
- What happens when this interaction fails?
- Does this constraint invalidate the current boundary?
- Does this new responsibility belong inside an existing subsystem?
- Does the current architecture preserve this invariant?

The question determines what evidence should be retrieved and what reasoning should be performed.

### Relevant Source Evidence

This is the subset of the knowledge base required to answer the current construction question.

It may come from multiple documents and multiple knowledge categories.

The retrieval unit is therefore not necessarily a document.

It is an **architecturally relevant body of evidence**.

### Existing Decisions

Previously established decisions must be included when they constrain the current construction.

This prevents the system from independently rediscovering or contradicting decisions already made elsewhere in the architecture.

### Known Constraints and Invariants

Constraints and invariants that apply to the current decision must remain visible.

A locally sensible boundary is not valid if it violates a global invariant.

### Relevant Open Questions

Unresolved questions must remain visible when they could affect the current decision.

The constructor must not silently replace uncertainty with an assumption merely because the architecture needs to continue moving.

### Current Unresolved Tensions

When the existing architecture contains competing interpretations, provisional boundaries, or unresolved trade-offs, those tensions must be carried forward.

They are part of the construction state.

---

## 5.4 Construction Is State-Preserving

Each construction step produces an updated architectural state.

The process is therefore better represented as:

```text
Architecture₀
    +
Evidence₁
    +
Question₁
    ↓
Architecture₁

Architecture₁
    +
Evidence₂
    +
Question₂
    ↓
Architecture₂

Architecture₂
    +
Evidence₃
    +
Question₃
    ↓
Architecture₃
```

rather than:

```text
Knowledge Base
    ↓
Subsystem A

Knowledge Base
    ↓
Subsystem B

Knowledge Base
    ↓
Subsystem C
```

The second pattern is dangerous because every subsystem is constructed independently.

Independent construction encourages:

- overlapping responsibilities;
- inconsistent ownership;
- duplicated state;
- contradictory assumptions;
- incompatible boundaries;
- missing interactions;
- inconsistent terminology;
- locally correct but globally incompatible decisions.

The incremental protocol prevents this by making the current architecture an explicit input to every subsequent construction step.

---

## 5.5 Externalized Architectural Memory

The architecture must function as **externalized working memory**.

This is especially important when construction is performed with an LLM or agent.

An LLM can reason effectively over a bounded context, but the method must not assume that information placed somewhere in a large context remains equally available throughout the reasoning process.

The architecture therefore records the conclusions of previous reasoning so that later reasoning does not depend on the model remembering the entire chain internally.

For example:

```text
Initial Evidence
      ↓
Responsibility discovered
      ↓
Boundary hypothesis formed
      ↓
Ownership established
      ↓
State identified
      ↓
Interaction established
      ↓
Failure consequence discovered
      ↓
Boundary revised
```

The important discoveries at each stage are written into the architectural model.

The next stage therefore does not need to remember the entire reasoning history.

It needs to retrieve the relevant portion of the accumulated model.

This produces a critical property:

> **The architecture is not only the output of reasoning. It is also the memory substrate that enables subsequent reasoning.**

---

## 5.6 Principle: Retrieval Must Be Driven by the Construction Question

The knowledge base must not be reread indiscriminately at every stage.

Instead, retrieval should be driven by the question currently being constructed.

For example, if the question is:

> “Should responsibility A and responsibility B share a subsystem boundary?”

the relevant evidence is likely to include:

- their responsibilities;
- state they manipulate;
- lifecycle relationships;
- consistency requirements;
- ownership;
- failure behavior;
- scaling characteristics;
- temporal coupling;
- security or authority constraints;
- relevant end-to-end scenarios;
- prior architectural decisions involving either responsibility.

It is unlikely that every product research document is equally relevant.

Likewise, if the question is:

> “Who should own this operational state?”

the retrieval should prioritize:

- state definitions;
- source ownership;
- authority;
- lifecycle;
- correction mechanisms;
- external system semantics;
- relevant responsibilities;
- existing decisions.

The retrieval strategy must therefore be:

```text
Construction Question
        ↓
Identify affected architectural concepts
        ↓
Identify evidence required to reason about them
        ↓
Retrieve evidence
        ↓
Construct
```

not:

```text
Load all documents
        ↓
Ask the model to figure out what matters
```

The latter leaves relevance determination entirely to the model's attention allocation.

The former makes relevance an explicit part of the method.

---

## 5.7 Construction Units

Architecture must be constructed in **construction units**.

A construction unit is a bounded architectural problem that can be reasoned about meaningfully while remaining connected to the architecture as a whole.

A construction unit is not necessarily:

- a component;
- a subsystem;
- a module;
- a document;
- a feature;
- a user journey.

It is a reasoning unit.

Examples include:

```text
Understanding operational situations

Determining ownership of operational state

Handling conflicting information

Coordinating a multi-step resolution

Representing human intervention

Executing an external capability

Recording execution history

Maintaining a particular invariant

Managing a lifecycle transition
```

A construction unit is chosen because resolving it will clarify some part of the architecture.

The unit should be neither so small that it loses system meaning nor so large that it recreates the total-context problem.

---

## 5.8 Construction Units Must Overlap

Construction units are not required to be disjoint.

This is a critical property of the method.

A responsibility may participate in several construction units.

A boundary may be influenced by several questions.

A constraint may affect many responsibilities.

A single discovery may force revisions in multiple previously constructed areas.

Therefore, the construction process should be thought of as a network of overlapping reasoning areas rather than a linear decomposition.

Conceptually:

```text
                ┌───────────────┐
                │ Situation     │
                │ Understanding │
                └───────┬───────┘
                        │
              ┌─────────┼─────────┐
              │         │         │
              ▼         ▼         ▼
        Decision     Human      Memory
        Authority    Action
              │         │         │
              └────┬────┴────┬────┘
                   │         │
                   ▼         ▼
              Workflow    Integration
                   │         │
                   └────┬────┘
                        ▼
                  Observability
```

This does not imply that these boxes are the final architecture.

It illustrates that architectural reasoning naturally creates many-to-many relationships.

A decision about situation understanding may affect workflow.

A workflow discovery may change state ownership.

A state ownership decision may change observability requirements.

An observability requirement may expose a missing execution boundary.

The construction method must therefore allow the reasoning path to loop backward.

---

## 5.9 The Construction Frontier

At any point, the architecture will contain three kinds of areas:

```text
┌──────────────────────────────┐
│ Established Architecture     │
├──────────────────────────────┤
│ Provisional Architecture     │
├──────────────────────────────┤
│ Unconstructed / Unknown      │
└──────────────────────────────┘
```

These should not be treated as equivalent.

### Established

The current evidence and architectural reasoning are sufficient for the decision to be considered stable.

### Provisional

A useful architectural model exists, but unresolved evidence, dependencies, or contradictions may still change it.

### Unconstructed

The architecture has not yet been sufficiently reasoned about.

This distinction is essential.

An incomplete architecture should not be made to appear complete simply because every section of a document has been filled.

The boundary between what has been constructed and what has not is the **construction frontier**.

The frontier moves as construction proceeds.

---

## 5.10 A Construction Step

Each construction step should follow a controlled sequence.

### Step 1 — State the Question

Define the architectural problem being resolved.

```text
What are we trying to understand or decide?
```

The question must be architectural rather than implementation-oriented.

---

### Step 2 — Locate the Affected Architecture

Identify which existing responsibilities, boundaries, states, relationships, or decisions may be affected.

```text
Current Architecture
        ↓
Affected Area
```

This ensures the step begins from the existing model rather than from the source documents alone.

---

### Step 3 — Retrieve Relevant Evidence

Retrieve evidence based on the affected area and construction question.

The evidence model defined in Section 4 is used here to preserve:

- provenance;
- uncertainty;
- relationships;
- scope;
- authority;
- temporal context.

---

### Step 4 — Construct the Local Model

Reason over the construction question using:

```text
Existing Architecture
+
Relevant Evidence
+
Constraints
+
Invariants
+
Open Questions
```

The goal is to produce an architectural understanding, not merely a conclusion.

That understanding may contain:

- a responsibility;
- a responsibility relationship;
- a boundary hypothesis;
- an ownership decision;
- a state model;
- an interaction;
- a failure behavior;
- a temporal relationship;
- a contradiction;
- an architectural constraint;
- an unresolved question.

---

### Step 5 — Reconcile With Existing Architecture

The new understanding must be compared against the architecture already constructed.

Ask:

- Does this duplicate an existing responsibility?
- Does this conflict with an existing boundary?
- Does this change ownership?
- Does this introduce a new state owner?
- Does this violate an invariant?
- Does this create an interaction that was previously missing?
- Does it invalidate a previous decision?
- Does it reveal that two responsibilities should be together?
- Does it reveal that an existing responsibility is too broad?
- Does it expose an unresolved architectural question?

This is where local construction becomes global architecture.

---

### Step 6 — Update the Architectural Model

The architecture is then updated.

The update must preserve both:

```text
What we currently believe
```

and, where relevant:

```text
Why we believe it
```

New architectural elements should therefore be connected to their supporting evidence and affected decisions.

---

### Step 7 — Record What Changed

The construction step should explicitly record:

```text
New understanding
Changed understanding
Invalidated understanding
New relationship
New constraint
New open question
New contradiction
```

This prevents architectural evolution from becoming invisible.

---

### Step 8 — Define the Next Construction Frontier

After the update, determine what remains unclear.

The next construction unit may be:

- adjacent to the current one;
- dependent on it;
- exposed by it;
- a contradiction elsewhere;
- a cross-cutting concern;
- a newly discovered missing responsibility.

The next step is therefore determined by the architecture's current state, not merely by the order of files in the knowledge base.

---

## 5.11 The Architecture Must Be Carried Forward

The most important operational rule is:

> **Every subsequent construction step receives the accumulated architectural model as its starting point.**

If:

```text
A = current architecture
B = new construction
```

then the next step does not receive merely `B`.

It receives:

```text
A + B
```

If the next construction produces `C`, the following step receives:

```text
A + B + C
```

and so on.

The architecture therefore accumulates.

This is the mechanism that allows the method to scale reasoning without requiring the entire original knowledge base to remain in active context.

The knowledge base remains available for retrieval.

The architecture remains available as the accumulated model.

Together they form:

```text
Knowledge Base
     │
     │ targeted retrieval
     ▼
Architectural Evidence
     │
     │ construction
     ▼
Current Architecture
     │
     ├───────────────┐
     │               │
     ▼               ▼
next question   contradiction
     │               │
     └───────┬───────┘
             ▼
      targeted retrieval
             │
             ▼
      updated architecture
```

---

## 5.12 Principle: Local Reasoning Must Be Globally Anchored

Incremental construction creates a potential danger of its own.

If every construction unit is reasoned about independently, the process simply recreates the decomposition problem in a different form.

Therefore, every local reasoning step must be anchored to the current global model.

The constructor must always know:

1. where this problem exists in the system;
2. which existing responsibilities it touches;
3. which boundaries it may affect;
4. which invariants constrain it;
5. which interactions depend on it;
6. which existing decisions may be changed;
7. what remains unresolved around it.

The local question may be narrow.

The architectural context around the question must not be forgotten.

This produces the desired balance:

```text
Reason locally
        +
Maintain global coherence
```

rather than either extreme:

```text
Reason about everything simultaneously
```

or:

```text
Reason about isolated pieces independently
```

---

## 5.13 Freeze Carefully

Not every architectural decision should immediately become permanent.

Construction must distinguish between:

```text
Accepted
Provisional
Rejected
Superseded
Unresolved
```

An area may be considered stable enough to use as context without being declared permanently immutable.

This matters because later construction can expose consequences that were invisible earlier.

For example:

```text
Initial boundary
      ↓
New lifecycle requirement discovered
      ↓
Boundary becomes questionable
      ↓
Ownership relationship re-examined
      ↓
Boundary revised
```

The method must allow this.

A previous decision is evidence of the current architecture, not a prohibition against architectural correction.

---

## 5.14 Backward Movement Is Part of Construction

The construction process is not a one-way progression.

A later discovery may require returning to an earlier architectural decision.

This is expected.

For example:

```text
A responsibility is constructed
        ↓
A boundary is constructed
        ↓
An interaction is constructed
        ↓
Failure behavior is examined
        ↓
Failure reveals shared state
        ↓
Boundary must be reconsidered
        ↓
Responsibility model revised
```

The method must therefore treat architectural revision as a normal operation.

It must not interpret backward movement as process failure.

In fact, discovering that a previous abstraction is wrong is often evidence that the construction process is working.

The dangerous outcome is not revision.

The dangerous outcome is preserving an incorrect abstraction because the process discourages going backward.

---

## 5.15 Avoid False Completion

The incremental process must not confuse:

```text
Every topic has been mentioned
```

with:

```text
The architecture has been constructed.
```

Architecture is complete only when the relevant relationships have been reasoned through sufficiently.

A document can contain hundreds of pages and still fail to establish:

- responsibility ownership;
- subsystem boundaries;
- state ownership;
- authority;
- interaction semantics;
- failure behavior;
- temporal behavior;
- cross-cutting constraints;
- end-to-end coherence.

Therefore, construction completion cannot be measured primarily by document length or source coverage.

It must be measured by architectural coherence and resolution of the relevant construction questions.

---

## 5.16 Agent Behaviour Controls

Because the method is intended to be usable by LLMs and agents, the protocol must actively constrain common failure modes.

The constructor should not:

### Treat source documents as an architecture

A document describing a capability does not automatically imply a subsystem.

### Treat every responsibility as a component

Responsibilities must be related, grouped, and boundary-tested before becoming architectural units.

### Reconstruct independently from scratch

The current architecture must be part of the construction context.

### Ignore previous decisions

Existing architectural decisions must be checked before introducing a conflicting interpretation.

### Collapse uncertainty

Unknown, conflicting, provisional, and assumed information must remain distinguishable.

### Optimize for document structure

The order of source files must not determine the architecture.

### Optimize for implementation convenience

Technology, framework boundaries, deployment topology, database choices, and code organization must not silently determine Level 2 logical boundaries.

### Preserve an incorrect abstraction merely for consistency

If new evidence invalidates an earlier construction, the earlier construction must be revisited.

### Declare completion because all evidence was read

Reading evidence is not construction.

### Declare completion because all subsystems have names

Naming subsystems is not construction.

---

## 5.17 The Construction Ledger

The incremental process should maintain a lightweight **Construction Ledger**.

The ledger records the state of the construction process itself.

At minimum:

| Field | Purpose |
|---|---|
| Construction ID | Identifies the reasoning step |
| Question | Architectural question being resolved |
| Affected Area | Existing architecture affected |
| Evidence Used | Relevant architectural evidence |
| Decision / Understanding | What was constructed |
| Architectural Change | What changed in the model |
| Confidence / Status | Established, provisional, conflicting, etc. |
| Dependencies | Decisions or evidence required |
| New Questions | Questions exposed by the step |
| Invalidated Decisions | Earlier conclusions affected |
| Next Frontier | What should be examined next |

The ledger is not intended to become another large documentation system.

Its purpose is to preserve the construction history and make the evolving model auditable.

---

## 5.18 The Construction Protocol as a Loop

The complete protocol can therefore be represented as:

```text
┌─────────────────────────────┐
│ Current Architecture        │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ Select Construction Question│
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ Identify Affected Concepts  │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ Retrieve Relevant Evidence  │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ Construct Local Understanding│
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ Reconcile With Architecture │
└──────────────┬──────────────┘
               │
        ┌──────┴──────┐
        │             │
        ▼             ▼
   Consistent     Conflict /
        │         New discovery
        │             │
        └──────┬──────┘
               ▼
┌─────────────────────────────┐
│ Update Architectural Model  │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ Record Construction Change  │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ Identify Next Frontier      │
└──────────────┬──────────────┘
               │
               └───────────────► repeat
```

This loop is the core operating mechanism of architecture construction.

---

## 5.19 What This Protocol Solves

The protocol exists to solve several problems simultaneously.

### The attention problem

Only relevant evidence needs to be actively reasoned about at each step.

### The memory problem

Previous architectural conclusions are externalized into the current model.

### The synthesis problem

Architecture is created through relationships between evidence rather than extracted from individual documents.

### The consistency problem

Every new construction is reconciled against the existing architecture.

### The traceability problem

Architectural decisions remain connected to their evidence and construction history.

### The revision problem

Later discoveries can invalidate earlier decisions without destroying the entire model.

### The scaling problem

The construction process can grow without requiring every reasoning step to contain the entire knowledge base.

### The agent problem

The method constrains an LLM's natural tendency to summarize, classify, or extract rather than construct.

---

## 5.20 Control / Gate

Before accepting a construction step, verify:

### Context
- Is the current architecture explicitly present?
- Is the construction question explicit?
- Is the relevant evidence available?
- Are applicable constraints and invariants visible?
- Are relevant open questions visible?

### Construction
- Did the step produce new architectural understanding?
- Was the understanding constructed rather than merely copied from a source?
- Were relationships between responsibilities, constraints, state, ownership, and behaviour considered where relevant?

### Reconciliation
- Was the new understanding compared against existing architecture?
- Were conflicts and overlaps identified?
- Were affected boundaries and decisions reconsidered?

### Memory
- Was the resulting understanding externalized?
- Can the next construction step recover why the current architecture looks this way?
- Are provisional and established decisions distinguishable?

### Progress
- Is the next construction frontier identifiable?
- Did the step expose any new architectural question?
- Is there a reason to revisit an earlier decision?

If these conditions are not satisfied, the step is not complete merely because a written conclusion exists.

---

## 5.21 Central Principle

> **Architecture must be constructed incrementally from an accumulating architectural model. Each construction step reasons over a bounded, question-driven set of evidence while carrying forward the architecture already constructed. The architecture itself serves as externalized working memory, allowing local reasoning without sacrificing global coherence.**

The resulting process is neither:

```text
Read everything → extract architecture
```

nor:

```text
Split everything → construct independent pieces
```

It is:

```text
Construct
    ↓
Externalize
    ↓
Retrieve what the next decision requires
    ↓
Construct against the accumulated model
    ↓
Reconcile
    ↓
Externalize again
    ↓
Repeat
```

This is what allows Tend's architecture to grow as a coherent model rather than as a collection of independently generated subsystem descriptions.

---

## 5.22 Relationship to the Next Construction Stages

This protocol defines **how construction proceeds**.

It does not yet define the specific architectural questions that must be answered while constructing:

- responsibilities;
- boundaries;
- interactions;
- system behaviour;
- architectural dimensions;
- reconciliation;
- stabilization.

Those are the subjects of the following sections.

The important distinction is:

```text
Section 5
─────────
How do we construct?

Sections 6–11
─────────────
What do we construct, and how do we reason about each part?

Section 12
──────────
How do we know the resulting Level 2 architecture is sufficiently
constructed and how do we represent it?
```

The protocol therefore becomes the execution mechanism for the remainder of this method.

# 6. Responsibility Construction

## 6.1 Purpose

The first architectural structure that must be constructed is the system's **responsibility model**.

Level 1 identifies responsibilities that exist in the problem domain. Level 2 must determine how those responsibilities should be organised within Tend.

The distinction is important.

Level 1 asks:

> **What responsibilities exist?**

Level 2 asks:

> **How should those responsibilities be organised into a coherent system?**

The result is not immediately a set of subsystems.

It is first a constructed model of:

- what responsibilities exist;
- what each responsibility is responsible for;
- what information or state it requires;
- what decisions it makes;
- what authority it has;
- what other responsibilities it depends upon;
- what responsibilities naturally change with it;
- what responsibilities must remain separate;
- what responsibilities appear to form a coherent problem.

Only after this model exists can boundaries be constructed with confidence.

This follows the core Level 2 principle:

> **The goal is not to invent subsystems. The goal is to discover them from responsibilities and their relationships.**

---

## 6.2 Principle: Responsibilities Come Before Components

A component name is an architectural conclusion.

A responsibility is an architectural observation.

Therefore, the construction process must begin with responsibilities rather than components.

For example:

```text
Bad starting point:

Conversation Service
Knowledge Service
Decision Service
Workflow Service
```

These are names for proposed structures.

They do not explain why those structures should exist.

The construction process instead begins with questions such as:

```text
What must the system understand?

What must it remember?

What must it determine?

What must it decide?

What must it coordinate?

What must it communicate?

What must it execute?

What must it verify?

What must it expose to humans?

What must it observe?
```

The resulting responsibilities are then related to one another.

Only when their relationships are understood should a boundary be considered.

This prevents the common architectural failure of deciding the boxes first and then attempting to justify them afterwards.

---

## 6.3 The Responsibility Is the Unit of Reasoning

A responsibility is a meaningful problem that some part of the system must reliably own.

It should describe **what must be accomplished**, not how it is implemented.

A useful responsibility statement has the form:

```text
[Actor/System responsibility]
must [perform meaningful responsibility]
so that [required outcome remains possible].
```

For example:

```text
Recognise and represent unresolved ambiguity in a situation
so that Tend does not silently convert an uncertain interpretation
into an established fact.
```

This is a responsibility.

It does not specify:

- a database;
- a class;
- an API;
- a queue;
- an LLM;
- a deployment unit.

Those belong to later levels.

The existing Level 2 work on ambiguity illustrates this distinction directly: the responsibility being designed is recognition and representation; gathering information, resolving trust, asking for clarification, and deciding whether an action is safe are separate responsibilities.

That distinction is essential to responsibility construction.

---

## 6.4 Responsibility Construction Starts From Level 1

The initial responsibility set must be derived from Level 1 rather than invented independently.

Level 1 provides:

```text
Business problem
Actors
Actor responsibilities
Interactions
System boundary
Invariants
Failure classes
Scaling dimensions
Open engineering questions
```

These provide the raw material from which system responsibilities can be constructed.

Level 1 responsibilities should therefore be mapped into three categories:

```text
┌──────────────────────────────────────┐
│ Directly owned by Tend               │
├──────────────────────────────────────┤
│ Performed by external actors/systems │
├──────────────────────────────────────┤
│ Shared / coordinated responsibilities│
└──────────────────────────────────────┘
```

The purpose is not to force every Level 1 responsibility into Tend.

Some responsibilities remain outside Tend.

For example, an external business system may remain the authoritative owner of an order or payment record.

Tend may have responsibilities around:

- retrieving it;
- interpreting it;
- coordinating action around it;
- recording what was observed;
- deciding what to do next.

It does not therefore become the owner of the external business record merely because Tend interacts with it.

Responsibility construction must preserve this distinction.

---

## 6.5 Separate Responsibility From Ownership

The words **responsibility** and **ownership** must not be treated as interchangeable.

A responsibility describes what must be done.

Ownership describes who or what is accountable for maintaining the correctness of some concern.

For example:

```text
Responsibility:
Determine whether an order is eligible for cancellation.

Authority / ownership:
The business policy may remain authoritative for the rule.

External ownership:
The business order system may remain authoritative for the order state.

Tend responsibility:
Coordinate the decision and, where authorised, execute the appropriate action.
```

Multiple actors can therefore participate in a responsibility without sharing ownership of the same state.

This becomes particularly important for external systems.

Tend should not accidentally absorb responsibilities merely because it coordinates them.

The Level 1 invariant that Tend coordinates rather than replaces business systems must survive this construction.

---

## 6.6 Construct Responsibilities at the Smallest Useful Level

Responsibilities should be decomposed only far enough to make their architectural relationships understandable.

If a responsibility is too broad:

```text
Handle customer problems
```

it provides almost no useful architectural information.

If it is decomposed too far:

```text
Parse character 1
Parse character 2
Store timestamp
Create identifier
...
```

the resulting structure describes implementation mechanics rather than architectural responsibility.

The target is the **smallest meaningful responsibility that represents a complete problem**.

A useful test is:

> **Could another architectural responsibility depend on this responsibility without needing to understand its internal reasoning?**

If yes, the responsibility may be at a useful level.

---

## 6.7 Responsibility Boundaries Are Discovered Through Change

One of the strongest signals for grouping responsibilities is how they change.

For each responsibility, ask:

> **What causes this responsibility to change?**

Then compare it with neighbouring responsibilities.

Suppose:

```text
Responsibility A changes when:
- business policy changes
- regulatory rules change

Responsibility B changes when:
- business policy changes
- regulatory rules change

Responsibility C changes when:
- communication channels change
- message formats change
```

A and B have a strong change relationship.

C does not.

This does not automatically prove a boundary.

It creates evidence that A and B may belong to the same architectural unit while C may be independently changeable.

This follows the original Level 2 method:

> Start with a responsibility, identify responsibilities that naturally change with it, group those responsibilities together, and draw the boundary around the smallest complete problem that can be owned independently.

Change coupling is therefore evidence for construction, not a mechanical algorithm.

---

## 6.8 Responsibility Relationships Must Be Explicit

A responsibility model must not be a list.

Lists hide relationships.

Architecture depends on relationships.

For each important pair of responsibilities, determine whether the relationship is:

```text
Depends on
Provides information to
Requests a decision from
Delegates to
Coordinates
Constrains
Authorises
Verifies
Observes
Triggers
Updates
Consumes
Produces
Shares context with
Must remain independent from
```

The exact vocabulary can evolve.

The important rule is that relationships must be explicit enough that a later architectural decision does not require the reader to reconstruct them mentally.

This follows the Level 1 principle that interactions should be explicit rather than inferred.

---

## 6.9 Construct Responsibility Clusters

Once responsibilities and relationships are visible, identify **responsibility clusters**.

A cluster is a set of responsibilities that appear to form a coherent problem because they share meaningful properties.

Possible signals include:

### Shared purpose

The responsibilities collectively solve one coherent business problem.

### Shared state

They operate on state whose correctness is strongly coupled.

### Shared lifecycle

They participate in the same lifecycle and naturally evolve together.

### Shared authority

They depend on the same decision authority.

### Shared failure handling

Their failures cannot meaningfully be handled independently.

### Shared temporal behaviour

They must coordinate within the same temporal constraints.

### Shared change drivers

They tend to change for the same reasons.

### Shared conceptual model

They require the same domain understanding to perform their work.

### Strong internal interaction

They communicate frequently enough that separating them would create unnecessary coordination.

None of these is sufficient on its own.

A cluster is a **candidate architectural grouping**.

It must still survive boundary construction and later architectural dimensions.

---

## 6.10 Do Not Cluster Merely Because Responsibilities Are Related

Relationship does not mean co-location.

Two responsibilities can be strongly related while still belonging to different architectural units.

For example:

```text
Situation Understanding
        ↓
Decision Making
```

The decision depends on the situation model.

That does not imply that understanding and decision making are the same responsibility.

Likewise:

```text
Decision
        ↓
Execution
        ↓
Verification
```

These responsibilities form a critical chain.

They may still require different ownership, lifecycle, failure semantics, or scaling characteristics.

The construction process must therefore distinguish:

```text
Related
```

from:

```text
Should be grouped
```

This distinction prevents the architecture from becoming one large subsystem simply because everything is connected.

---

## 6.11 Construct Negative Relationships

Responsibility construction must also record where responsibilities **must not** be combined.

This is often more valuable than recording only positive relationships.

Examples:

```text
Recognition ≠ trust resolution

Recognition ≠ information gathering

Information ownership ≠ information interpretation

Decision ≠ execution

Clarification ≠ confirmation

Coordination ≠ source-of-truth ownership

Observability ≠ business responsibility
```

These separations can be architectural invariants.

For example, the existing ambiguity work explicitly distinguishes recognition and representation from gathering, trust resolution, clarification, and action safety.

A responsibility model that records only “what belongs together” but not “what must remain separate” is incomplete.

---

## 6.12 Responsibility Identity

Each constructed responsibility should have a stable identity independent of whatever subsystem name may eventually contain it.

A responsibility record should minimally capture:

| Attribute | Meaning |
|---|---|
| Responsibility ID | Stable identifier |
| Name | Human-readable name |
| Purpose | Problem it solves |
| Outcome | What must be true after it performs its responsibility |
| Inputs | Information required |
| Outputs | Information or decisions produced |
| State | State it needs or maintains |
| Authority | Decisions it is allowed to make |
| Ownership | What it is accountable for |
| Dependencies | Responsibilities it depends on |
| Dependants | Responsibilities that depend on it |
| Change Drivers | What causes it to evolve |
| Failure Modes | How the responsibility can fail |
| Invariants | Rules it must preserve |
| Evidence | Supporting architectural evidence |
| Status | Established / provisional / conflicting / unresolved |

The goal is not bureaucracy.

The goal is to prevent the responsibility from collapsing into a vague label.

---

## 6.13 Responsibility Construction Is Iterative

The first responsibility model will be incomplete.

That is expected.

The process should therefore begin with:

```text
R₀ = initial responsibility model
```

and evolve:

```text
R₀
 ↓
R₁
 ↓
R₂
 ↓
R₃
 ...
```

Each revision is performed using the Section 5 protocol:

```text
Current Responsibility Model
+
Relevant Evidence
+
Construction Question
        ↓
Reasoning
        ↓
Updated Responsibility Model
```

A new responsibility may:

- split an existing responsibility;
- merge with an existing responsibility;
- become a dependency;
- expose a missing responsibility;
- invalidate an assumed responsibility;
- reveal that an apparent responsibility belongs outside Tend.

The model must remain revisable until boundary construction and architectural dimensions provide sufficient evidence for stabilization.

---

## 6.14 The Responsibility Construction Loop

The detailed construction loop is:

```text
┌───────────────────────────────┐
│ Start with Level 1 responsibility │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│ Define the actual problem     │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│ Identify required outcome     │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│ Identify state and authority  │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│ Identify dependencies         │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│ Identify change drivers       │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│ Identify failure behaviour   │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│ Find related responsibilities │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│ Find responsibilities that    │
│ must remain separate          │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│ Construct candidate clusters  │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│ Reconcile with current model  │
└───────────────┬───────────────┘
                │
                ▼
       Responsibility Model
```

This produces the raw architectural structure from which boundaries can later be constructed.

---

## 6.15 Responsibility Clusters Are Hypotheses, Not Subsystems

A major control must be applied here.

The output of responsibility construction should **not** immediately be written as:

```text
Subsystem A
Subsystem B
Subsystem C
```

Instead:

```text
Responsibility Cluster A
Responsibility Cluster B
Responsibility Cluster C
```

These clusters are hypotheses about natural ownership.

Section 7 will test whether those hypotheses justify actual boundaries.

This distinction prevents the construction method from prematurely freezing architecture.

The sequence is:

```text
Responsibility
      ↓
Relationships
      ↓
Responsibility Cluster
      ↓
Boundary Tests
      ↓
Subsystem
```

not:

```text
Responsibility
      ↓
Subsystem
```

---

## 6.16 The Role of State

State is one of the strongest signals that two responsibilities may or may not belong together.

For each responsibility ask:

> What state must this responsibility understand, create, modify, or rely upon?

Then ask:

> Who is authoritative for that state?

And:

> What must remain consistent?

Consider:

```text
Responsibility A
      │
      ▼
State X
      ▲
      │
Responsibility B
```

This creates an important architectural question.

Does A and B require shared ownership of X?

Or can one responsibility own X while the other interacts with it through an explicit relationship?

The answer should not be assumed.

State ownership must be constructed explicitly because state often determines:

- consistency boundaries;
- failure boundaries;
- authority;
- lifecycle;
- concurrency behaviour;
- correction mechanisms.

The architecture should therefore never group responsibilities merely because they both touch the same information.

It must understand **how** they relate to that information.

---

## 6.17 The Role of Authority

Responsibilities differ in what they are allowed to decide.

For every responsibility that produces a decision, ask:

```text
What is it allowed to decide?

What is it not allowed to decide?

What information gives it authority?

Can another actor override it?

Is the decision advisory or authoritative?

Does the responsibility own the rule,
or merely apply a rule owned elsewhere?
```

This prevents a common architectural error:

```text
System performs decision
        ↓
System therefore owns the policy
```

Those are not equivalent.

A responsibility can execute or coordinate a decision while policy remains owned by the business.

This distinction becomes especially important in Tend because the system operates between humans, business systems, external actors, and automated reasoning.

---

## 6.18 The Role of Failure

Failure behaviour is part of responsibility identity.

For every responsibility ask:

> What happens when this responsibility cannot complete its work?

Possible outcomes include:

```text
Retry
Wait
Escalate
Ask for clarification
Return an unresolved state
Use another source
Require human intervention
Continue with reduced scope
Stop the workflow
Record a conflict
```

The correct answer depends on the responsibility.

This matters because two responsibilities that appear similar during successful execution may have fundamentally different failure semantics.

If they must fail together, that is evidence for grouping.

If they can fail independently, that is evidence for separation.

Therefore:

> **Failure coupling is architectural evidence.**

The Level 1 failure classes—missing, conflicting, or incorrect information; unavailable actors; communication failure; business-rule violation; authentication failure; and unexpected situations—must be considered when constructing responsibility relationships.

---

## 6.19 The Role of Change

Responsibilities should also be evaluated against future change.

Ask:

```text
What is likely to change?

What is likely to remain stable?

Who causes the change?

How frequently might it change?

Would changing this responsibility require understanding another responsibility's internal concerns?
```

The goal is not to predict the future perfectly.

The goal is to identify **different axes of change**.

If two responsibilities are likely to evolve independently, that is evidence for separation.

If they must evolve together to preserve correctness, that is evidence for grouping.

This becomes particularly important for Tend because the Level 1 scaling dimensions include changes in customers, employees, conversations, business systems, channels, locations, knowledge, and integrations.

These are not merely scaling concerns.

They are potential sources of architectural change.

---

## 6.20 Responsibility Construction and the Spider's Web

The responsibility model should not be expected to become a clean tree.

Real systems contain feedback relationships.

For example:

```text
Situation Understanding
        │
        ▼
Decision
        │
        ▼
Action
        │
        ▼
Verification
        │
        ▼
Updated Situation
        │
        └──────────────► Situation Understanding
```

Another path may be:

```text
Human Review
      │
      ▼
Decision
      │
      ▼
Execution
      │
      ▼
Observability
      │
      ▼
Human Review
```

Another may be:

```text
External Information
       ↓
Situation Understanding
       ↓
Knowledge / Memory
       ↓
Decision
       ↓
External Action
       ↓
New External Information
```

These loops are not evidence that the architecture is wrong.

They are evidence that the system is a dynamic network of responsibilities.

The responsibility model must preserve those relationships instead of flattening them into a one-directional pipeline merely because a pipeline is easier to draw.

---

## 6.21 Responsibility Construction Must Remain Technology-Neutral

No responsibility should be created because a technology exists.

For example:

```text
"We need an event bus."
```

is not a Level 2 responsibility.

The correct question is:

```text
"What responsibility requires asynchronous coordination,
durable communication, or independent progression?"
```

Similarly:

```text
"We need an LLM service."
```

is not a logical responsibility.

The question is:

```text
"What reasoning responsibility exists,
and what role does automated reasoning play within it?"
```

Technology must implement the responsibility model rather than create it.

This preserves the direction established by the three-level framework:

```text
Business Problem
      ↓
Logical Responsibilities
      ↓
Technology
```

Technology must never move upward and redefine the logical architecture.

---

## 6.22 Agent Construction Procedure

When an LLM or agent performs responsibility construction, it should follow a controlled procedure.

### Input

```text
Current Architecture
Relevant Level 1 responsibilities
Relevant Level 2 decisions
Relevant Architectural Evidence
Applicable constraints
Applicable invariants
Relevant failures
Relevant scaling dimensions
Relevant open questions
```

### Task

For the selected construction unit:

1. identify the responsibility being examined;
2. define its actual problem;
3. define its required outcome;
4. identify state and authority;
5. identify dependencies and dependants;
6. identify change drivers;
7. identify failure behaviour;
8. retrieve neighbouring responsibilities that may interact with it;
9. identify candidate relationships;
10. identify candidate responsibility clusters;
11. identify responsibilities that should remain separate;
12. reconcile against the current architecture;
13. record new and changed understanding;
14. expose unresolved questions.

### Prohibited shortcut

The agent must not jump directly from:

```text
Evidence
```

to:

```text
Subsystem name
```

without constructing the responsibility relationship that justifies the grouping.

---

## 6.23 Control / Gate

A responsibility should not be considered sufficiently constructed until the following questions can be answered.

### Responsibility identity

- What exact problem does it solve?
- What outcome does it own?
- Why must this responsibility exist?

### State

- What state does it require?
- What state does it create or modify?
- Who owns that state?
- What consistency requirements apply?

### Authority

- What decisions can it make?
- What decisions can it not make?
- Where does its authority come from?

### Relationships

- What does it depend on?
- Who depends on it?
- What does it coordinate?
- What must remain independent?

### Change

- What causes it to change?
- Which responsibilities naturally change with it?
- Which responsibilities evolve independently?

### Failure

- How can it fail?
- Can it fail independently?
- What must happen when it fails?
- Which other responsibilities are affected?

### Scope

- Is this actually a responsibility?
- Is it too broad?
- Is it too implementation-specific?
- Does it belong inside Tend at all?

### Evidence

- What architectural evidence supports it?
- Are important assumptions being mistaken for facts?
- Are contradictions visible?
- Is the responsibility traceable to the problem being solved?

### Architecture

- Does it duplicate an existing responsibility?
- Does it expose a missing responsibility?
- Does it invalidate an existing responsibility?
- Does it create a candidate grouping with other responsibilities?

If these questions cannot be answered, the responsibility remains provisional.

---

## 6.24 Output of Responsibility Construction

The output of this section is **not yet the final subsystem architecture**.

It is a structured responsibility model containing:

```text
Responsibilities
      +
Relationships
      +
State
      +
Ownership
      +
Authority
      +
Change Drivers
      +
Failure Behaviour
      +
Candidate Clusters
      +
Negative Relationships
      +
Open Questions
```

This model becomes the primary input to boundary construction.

Conceptually:

```text
Level 1
  │
  ▼
Problem Responsibilities
  │
  ▼
Responsibility Construction
  │
  ├── responsibility
  ├── relationship
  ├── state
  ├── ownership
  ├── authority
  ├── failure
  └── change
  │
  ▼
Candidate Responsibility Clusters
  │
  ▼
Boundary Construction
```

---

## 6.25 Central Principle

> **Do not draw subsystem boundaries until the responsibilities and their relationships have been constructed. A subsystem is not justified because a responsibility has been named. It is justified only when a coherent set of responsibilities forms a complete problem that can be independently owned without creating unacceptable coupling elsewhere.**

Responsibility construction therefore answers:

> **What does the system need to be responsible for, and which responsibilities naturally belong together?**

It does not yet answer:

> **Where exactly should the subsystem boundary be?**

That is the next construction problem.

Section 7 will take these responsibility clusters and test them against ownership, state, consistency, lifecycle, failure, change, scaling, authority, temporal behaviour, and coordination cost to determine whether they constitute legitimate architectural boundaries.


# 7. Boundary Construction

## 7.1 Purpose

Responsibility construction identifies what the system must be responsible for and which responsibilities appear related.

Boundary construction determines **where those responsibilities should be separated or grouped into independently owned architectural units**.

This is one of the most consequential steps in architecture construction.

A boundary determines:

- who owns a responsibility;
- who owns its state;
- where decisions are made;
- where consistency is required;
- how responsibilities interact;
- how failures propagate;
- how changes propagate;
- how scaling occurs;
- where authority begins and ends;
- what must be coordinated across the boundary.

A poor boundary does not merely produce an untidy diagram.

It creates structural problems that later appear as:

- excessive coordination;
- duplicated state;
- unclear ownership;
- distributed consistency problems;
- hidden coupling;
- difficult failure recovery;
- unnecessary communication;
- architectural workarounds;
- technology-driven compromises.

Therefore, a boundary must be **constructed and justified**, not merely drawn.

The central question is:

> **Which responsibilities form the smallest complete problem that can be owned, changed, operated, failed, reasoned about, and evolved independently without breaking correctness of the surrounding system?**

---

## 7.2 Principle: A Boundary Is a Consequence, Not a Starting Point

A subsystem boundary must never be selected before understanding the responsibilities inside and around it.

The construction sequence is:

```text
Responsibilities
      ↓
Relationships
      ↓
Responsibility Clusters
      ↓
Boundary Hypotheses
      ↓
Boundary Tests
      ↓
Architectural Boundary
```

Not:

```text
Subsystems
      ↓
Assign responsibilities to them
```

The second approach reverses the reasoning.

It starts with an imagined architecture and then attempts to make the problem fit it.

The first approach allows the architecture to emerge from the problem.

This is consistent with the Level 2 framework's core rule: begin with a responsibility, identify responsibilities that naturally change with it, group those responsibilities, and draw the boundary around the smallest complete problem that can be owned independently.

---

## 7.3 What a Boundary Actually Means

A boundary is not merely a line on a diagram.

It defines an **ownership and reasoning domain**.

Within the boundary, responsibilities can share an internal model without requiring the surrounding architecture to understand their internal structure.

Outside the boundary, interaction must occur through explicit architectural relationships.

Conceptually:

```text
┌──────────────────────────────────────┐
│          Architectural Unit          │
│                                      │
│  Responsibility A                    │
│        ↓                             │
│  Responsibility B                    │
│        ↓                             │
│  Responsibility C                    │
│                                      │
│  Shared internal state / reasoning   │
└──────────────────┬───────────────────┘
                   │
             Explicit boundary
                   │
                   ▼
┌──────────────────────────────────────┐
│       Other Architectural Unit       │
│                                      │
│  Responsibility D                    │
│        ↓                             │
│  Responsibility E                    │
└──────────────────────────────────────┘
```

The boundary determines what can be reasoned about locally and what must be coordinated externally.

Therefore:

> **A boundary is an architectural declaration of independent ownership and interaction.**

---

## 7.4 The Smallest Complete Problem

The boundary should be drawn around the **smallest complete problem** that can be independently owned.

Both parts of this definition matter.

### Smallest

The boundary should not absorb responsibilities merely because they are convenient to place together.

Unrelated concerns increase conceptual size and coupling.

### Complete

The boundary must contain enough responsibility to own a meaningful problem.

If separating a responsibility leaves it dependent on constant coordination with another responsibility for correctness, the proposed separation may be artificial.

The target is therefore not:

```text
Smallest possible box
```

but:

```text
Smallest independently coherent problem
```

---

## 7.5 Boundary Construction Begins With a Hypothesis

A responsibility cluster should initially produce a **boundary hypothesis**, not a final boundary.

For example:

```text
Hypothesis B1:

Responsibilities:
- A
- B
- C

appear to form one independently coherent problem.
```

The hypothesis must then be tested.

A useful boundary record contains:

```text id="q6p8e7"
Boundary Hypothesis
├── Included Responsibilities
├── Excluded Responsibilities
├── Problem Owned
├── State Owned
├── Authority
├── Internal Relationships
├── External Relationships
├── Change Drivers
├── Failure Behaviour
├── Consistency Requirements
├── Temporal Requirements
├── Scaling Characteristics
├── Security / Authority Constraints
└── Evidence Supporting the Boundary
```

Only after these dimensions have been examined should the boundary be accepted.

---

## 7.6 Boundary Test 1 — Conceptual Cohesion

The first question is:

> **Do these responsibilities actually form one coherent problem?**

Consider:

```text
A
B
C
```

Ask:

- Do they exist to achieve the same meaningful outcome?
- Do they require a shared conceptual model?
- Can the problem they collectively solve be stated clearly?
- Would someone owning this unit understand why all three responsibilities belong to it?

If the answer is no, the cluster is probably too broad.

Conceptual cohesion is stronger than simple interaction.

Two responsibilities may interact frequently while solving fundamentally different problems.

Frequent interaction alone does not justify grouping.

---

## 7.7 Boundary Test 2 — Ownership

Ask:

> **Can this complete problem be owned by one architectural unit?**

Ownership includes more than responsibility for execution.

It includes:

- maintaining relevant state;
- enforcing relevant invariants;
- making permitted decisions;
- handling failures;
- exposing a coherent interface to others;
- evolving the responsibility;
- explaining its behaviour.

A boundary becomes questionable when ownership must be split in a way that forces the units to continually negotiate who is responsible.

For example:

```text
Unit A owns the state
        +
Unit B owns the invariant
        +
Unit C owns the correction
```

may indicate that the original boundary has divided one coherent ownership problem.

Alternatively, it may be intentional if those forms of authority genuinely belong to different actors.

The point is not that ownership must always be singular.

The point is that ownership must be explicit.

---

## 7.8 Boundary Test 3 — State Ownership

For every candidate boundary ask:

> **What state belongs inside this boundary?**

Then:

> **Who is authoritative for that state?**

And:

> **Which responsibilities require direct access to it for correctness?**

This is one of the strongest boundary tests.

Suppose:

```text
Responsibility A ──┐
                   ├── State X
Responsibility B ──┘
```

If A and B both require atomic ownership of X to preserve correctness, separating them may introduce unnecessary distributed coordination.

But if:

```text
A owns X
B only needs information derived from X
```

then the responsibilities may be cleanly separated.

Therefore, shared information is not the same as shared state ownership.

The relevant question is:

> **What must be jointly controlled for correctness?**

---

## 7.9 Boundary Test 4 — Consistency and Atomicity

Consistency must be evaluated carefully.

The question is not:

> “Do these responsibilities ever update related information?”

Almost everything in a complex system is related to something else.

The useful question is:

> **Does correctness require these changes to occur as one indivisible operation?**

Atomicity means that from the perspective of the required correctness guarantee:

```text
Either all required changes occur
or none of them are considered to have occurred.
```

If correctness requires:

```text
A changes X
AND
B changes Y
```

to happen atomically, then separating A and B creates a cross-boundary consistency problem.

That does not automatically prove the boundary is wrong.

It creates two possibilities:

```text
Option 1
────────
The responsibilities belong together.

Option 2
────────
They remain separate, but the architecture explicitly
provides a valid cross-boundary consistency mechanism.
```

What must not happen is:

```text
Separate responsibilities
        +
Implicit atomicity assumption
```

That is an architectural contradiction.

“Usually happen together” is not equivalent to “must change atomically.”

This test therefore identifies genuine correctness coupling rather than ordinary interaction.

---

## 7.10 Boundary Test 5 — Lifecycle

Ask:

> **Do these responsibilities share the same lifecycle?**

Consider:

```text
Creation
→ Active
→ Suspended
→ Resolved
→ Archived
```

If two responsibilities must enter, leave, and transition through lifecycle states together, that is evidence for grouping.

If one responsibility has a fundamentally different lifecycle, separation may be more natural.

Lifecycle coupling can reveal hidden architectural structure that static responsibility lists cannot.

---

## 7.11 Boundary Test 6 — Change Coupling

Ask:

> **Do these responsibilities naturally change together?**

Consider:

```text
Policy changes
      ↓
A changes
      ↓
B changes
```

If A and B consistently evolve together because they are governed by the same conceptual rules, grouping them may reduce unnecessary coordination.

Conversely:

```text
Channel changes
      ↓
A changes

Business policy changes
      ↓
B changes
```

suggests independent change drivers.

Different change drivers are evidence for separation.

But again, this is evidence rather than an automatic rule.

Two responsibilities can have different change drivers and still need to share ownership for correctness.

---

## 7.12 Boundary Test 7 — Failure Coupling

Ask:

> **Can these responsibilities fail independently?**

Suppose:

```text
A fails
```

and the correct response is:

```text
B can continue normally.
```

That is evidence that A and B may be independently bounded.

But if:

```text
A fails
```

and correctness requires:

```text
B must also stop,
state must remain jointly unresolved,
and the entire problem must be recovered together
```

then the responsibilities are strongly failure-coupled.

Failure coupling is therefore architectural evidence.

The Level 1 model explicitly treats missing information, conflicting information, incorrect information, unavailable actors, communication failures, business-rule violations, authentication failures, and unexpected situations as business-level failure classes.

Boundary construction must determine where those failures are owned and how they propagate.

---

## 7.13 Boundary Test 8 — Temporal Coupling

Two responsibilities may be logically separate but temporally inseparable.

Ask:

> **Must these responsibilities act within the same temporal window for correctness?**

Examples include:

```text
A must happen immediately before B
A must happen before a deadline
A must wait for B
A and B must observe the same point-in-time state
A cannot proceed until B reaches a specific state
```

Strong temporal coupling can be evidence for grouping.

But it can also indicate a coordination relationship rather than shared ownership.

The distinction must be reasoned through.

Temporal coupling therefore becomes another test rather than a mechanical boundary rule.

---

## 7.14 Boundary Test 9 — Scaling Independence

Ask:

> **Can these responsibilities grow independently?**

Level 1 defines growth in business terms rather than server count: more customers, employees, conversations, business systems, communication channels, locations, knowledge, and integrations.

These dimensions can reveal architectural boundaries.

For example:

```text
Responsibility A
scales with:
number of conversations

Responsibility B
scales with:
number of business integrations
```

If those dimensions grow independently, forcing them into one ownership domain may create unnecessary coupling.

However, scaling independence alone does not justify separation.

Correctness and ownership always take precedence over operational convenience at this stage.

---

## 7.15 Boundary Test 10 — Security and Authority

Ask:

> **Should these responsibilities have the same authority?**

A boundary may be necessary because one responsibility is allowed to:

```text
read
write
approve
execute
override
```

while another is not.

Authority differences can create natural architectural boundaries.

For example:

```text
Interpret information
        ≠
Authorise business action
```

The first may produce an interpretation.

The second may require explicit business authority.

Combining them can make it difficult to reason about whether an automated interpretation has accidentally acquired authority to act.

Therefore, security and authority are not merely Level 3 implementation concerns.

The logical architecture must establish the responsibility and authority boundaries first.

---

## 7.16 Boundary Test 11 — Interaction Cost

Every boundary creates an interaction.

Therefore, after proposing a separation, ask:

> **What new coordination does this boundary create?**

A boundary may require:

```text
Requests
Responses
State exchange
Coordination
Retries
Ordering
Conflict handling
Failure propagation
Timeouts
Reconciliation
```

The more coordination required, the stronger the justification for the boundary must be.

This produces an important principle:

> **A boundary is not free.**

Separating responsibilities may improve independence while simultaneously creating coordination complexity.

The architecture must evaluate both sides.

---

## 7.17 The Negative Boundary Test

Boundary construction must test both directions.

### Separation test

> What would become difficult if these responsibilities were separated?

Look for:

- distributed state;
- cross-boundary atomicity;
- excessive coordination;
- duplicated reasoning;
- failure coupling;
- temporal coordination;
- ownership ambiguity.

### Combination test

> What would become difficult if these responsibilities were kept together?

Look for:

- unrelated change drivers;
- conceptual overload;
- different lifecycle;
- different authority;
- different scaling;
- independent failure handling;
- one responsibility needing to understand another's internal concerns.

A boundary is strong when neither alternative produces an obviously superior structure.

---

## 7.18 The Boundary Trade-off

Boundary construction is therefore an optimization problem over competing forms of coupling.

Conceptually:

```text
                Too Combined
                     │
                     ▼
        ┌────────────────────────┐
        │ Excessive internal     │
        │ conceptual coupling   │
        │                        │
        │ - unrelated concerns   │
        │ - large ownership      │
        │ - shared change burden  │
        └────────────┬───────────┘
                     │
                     ▼
             Coherent Boundary
                     │
                     ▼
        ┌────────────────────────┐
        │ Excessive separation   │
        │                        │
        │ - coordination         │
        │ - distributed state    │
        │ - failure coupling     │
        │ - consistency burden   │
        └────────────────────────┘
                     │
                     ▼
               Too Separated
```

The objective is not maximum separation.

Nor is it minimum number of subsystems.

The objective is to minimize **unnecessary coupling while preserving coherent ownership and correctness**.

---

## 7.19 Boundary Construction Is Relational

A boundary cannot be evaluated only from inside itself.

Every boundary has an outside.

Therefore, for each candidate boundary, examine:

```text
Inside
  ↓
Boundary
  ↓
Outside
```

Ask:

- What does the outside need from the boundary?
- What does the boundary need from the outside?
- Which information crosses?
- Which decisions cross?
- Which authority crosses?
- Which state crosses?
- What happens when the outside is unavailable?
- What happens when the boundary is unavailable?
- Which invariants cross the boundary?
- Which failures cross the boundary?

This produces the first meaningful **interaction contract** between candidate architectural units.

Section 8 will construct those interactions in detail.

---

## 7.20 Boundary Is Not Data Ownership by Default

A boundary does not automatically own every piece of information it consumes.

This is particularly important where Tend interacts with external systems.

For example:

```text
External Business System
        │
        │ authoritative order record
        ▼
      Tend
```

Tend may:

- retrieve the order;
- interpret its state;
- use it in a situation;
- coordinate an action;
- record what it observed.

That does not mean Tend becomes the authoritative owner of the order.

Therefore, boundary construction must distinguish:

```text
Uses information
```

from:

```text
Owns information
```

and:

```text
Coordinates an action
```

from:

```text
Owns the business process
```

Failing to preserve these distinctions causes the architecture to silently expand Tend's responsibility beyond its intended role.

---

## 7.21 Boundary Construction Is Not Technology Decomposition

A candidate boundary must not be justified by:

```text
Separate database
Separate worker
Separate service
Separate deployment
Separate process
Separate queue
```

Those are possible Level 3 consequences.

They are not reasons for a Level 2 boundary.

The Level 2 question is:

> **Is this a separately ownable logical problem?**

Only after that decision is established should technical architecture determine how the boundary is implemented.

The framework explicitly establishes that Level 3 chooses technologies to implement the architecture already defined in Level 2; technology must not create responsibilities.

---

## 7.22 Boundary Construction With the Incremental Protocol

Boundary construction follows the Section 5 loop.

```text
Current Responsibility Model
        +
Boundary Question
        ↓
Retrieve Relevant Evidence
        ↓
Construct Boundary Hypothesis
        ↓
Apply Boundary Tests
        ↓
Compare Alternatives
        ↓
Reconcile With Existing Architecture
        ↓
Accept / Reject / Keep Provisional
        ↓
Update Architecture
```

The architecture therefore evolves:

```text
Responsibilities
        ↓
Candidate Boundary A
        ↓
Candidate Boundary A + Boundary B
        ↓
A + B + C
        ↓
...
```

Every new boundary is evaluated against the boundaries already constructed.

This prevents a later boundary from accidentally recreating coupling that an earlier boundary was designed to eliminate.

---

## 7.23 Boundary Conflicts Are Valuable

Suppose the architecture currently contains:

```text
Boundary A
Boundary B
```

and new evidence suggests:

```text
A and B must share atomic state.
```

There are several possible interpretations:

```text
1. A and B should actually be one boundary.

2. The state should have a different owner.

3. The invariant has been misunderstood.

4. A cross-boundary consistency mechanism is required.

5. The new evidence is incorrect or scoped differently.

6. The architecture has discovered a previously unknown responsibility.
```

The correct response is not to force the new evidence into the existing architecture.

The contradiction is itself architectural information.

Therefore:

> **A boundary conflict is a discovery event.**

It should trigger reconciliation rather than silent accommodation.

---

## 7.24 Boundary Decision Record

Every accepted boundary should have a concise decision record.

At minimum:

```text
Boundary ID:
Name:

Problem Owned:

Responsibilities Included:

Responsibilities Explicitly Excluded:

State Owned:

External State Referenced:

Authority:

Why These Responsibilities Belong Together:

Why Nearby Responsibilities Do Not:

Change Coupling:

Lifecycle Coupling:

Consistency / Atomicity:

Failure Coupling:

Temporal Coupling:

Scaling Characteristics:

Security / Authority:

Interaction Cost:

Rejected Alternatives:

Known Limitations:

Supporting Evidence:

Status:
```

This record makes the boundary explainable.

It also allows later architectural reasoning to challenge it without reconstructing the entire original thought process.

---

## 7.25 Boundary Alternatives Must Be Explicit

At least the following alternatives should be considered where the boundary is consequential:

```text
Option A — Combine
```

All candidate responsibilities remain within one boundary.

```text
Option B — Separate
```

The responsibilities become independent boundaries.

```text
Option C — Hybrid
```

Some responsibilities are grouped while others remain separate.

The purpose is not to generate artificial alternatives.

The purpose is to ensure that the chosen boundary is a considered architectural decision rather than the first plausible grouping.

The alternatives should be evaluated against:

- correctness;
- ownership;
- consistency;
- change;
- failure;
- lifecycle;
- temporal behaviour;
- scaling;
- authority;
- coordination cost;
- conceptual simplicity.

This aligns with the Level 2 framework's requirement to explore alternatives and evaluate trade-offs before making an architectural decision.

---

## 7.26 When a Boundary Should Be Rejected

Reject a boundary hypothesis when:

### It exists only because of a technology

```text
"We can deploy this separately."
```

is not a logical reason.

### It splits one inseparable ownership problem

If correctness requires constant joint ownership, the split is suspect.

### It creates more coordination than independence

If two responsibilities must continuously synchronize, the boundary may be artificial.

### It duplicates state

If both sides need independently maintained copies of the same authoritative state without a strong reason, reconsider.

### It hides authority

If it becomes unclear who can decide or act, reconsider.

### It creates conceptual ambiguity

If nobody can clearly state what the boundary owns, it is not ready.

### It absorbs unrelated concerns

If responsibilities have fundamentally different problems and change drivers, the boundary may be too broad.

### It violates an invariant

No boundary is valid if it requires a product invariant to be broken.

---

## 7.27 When a Boundary Should Remain Provisional

Some boundaries cannot yet be confidently accepted.

Keep a boundary provisional when:

- relevant evidence is missing;
- ownership is unresolved;
- state authority is unclear;
- consistency requirements are unknown;
- failure behaviour is unresolved;
- important alternatives have not been examined;
- another unconstructed responsibility may affect it;
- a known contradiction remains;
- future architectural dimensions may materially change the decision.

A provisional boundary is not a failure.

It is an explicit representation of incomplete architectural knowledge.

The alternative—pretending certainty—creates false architectural stability.

---

## 7.28 The Boundary Graph

Once multiple boundaries have been constructed, the architecture should maintain a graph of their relationships.

For example:

```text
             ┌───────────────┐
             │ Boundary A    │
             └───────┬───────┘
                     │
              provides context
                     │
                     ▼
             ┌───────────────┐
             │ Boundary B    │
             └───────┬───────┘
                     │
                requests
                     │
                     ▼
             ┌───────────────┐
             │ Boundary C    │
             └───────┬───────┘
                     │
                triggers
                     ▼
             ┌───────────────┐
             │ Boundary D    │
             └───────────────┘
```

This graph is not yet an implementation topology.

It is a logical ownership and interaction structure.

As the architecture grows, new boundaries must be added to this graph rather than documented as isolated subsystem descriptions.

---

## 7.29 The Boundary Review Loop

Boundary construction should be reviewed at three levels.

### Local review

Does the boundary make sense internally?

```text
Are its responsibilities coherent?
Is ownership clear?
Is state clear?
```

### Relational review

Does the boundary interact cleanly with neighbouring boundaries?

```text
Is coordination explicit?
Is authority clear?
Are consistency requirements explicit?
```

### Global review

Does the boundary preserve the architecture as a whole?

```text
Does it preserve invariants?
Does it introduce duplicated responsibility?
Does it create systemic coordination problems?
Does it conflict with previously constructed boundaries?
```

All three are necessary.

A boundary can be locally elegant and globally wrong.

---

## 7.30 Control / Gate

A boundary must pass the following gate before being considered established.

### Problem

- Can the complete problem owned by the boundary be stated clearly?
- Is it a meaningful business/system responsibility rather than an implementation concern?

### Responsibility

- Are the included responsibilities coherent?
- Are excluded responsibilities explicitly understood?
- Is the boundary the smallest complete grouping?

### Ownership

- Is ownership clear?
- Is authority clear?
- Is state ownership clear?

### Correctness

- Are consistency requirements understood?
- Are atomicity requirements understood?
- Are invariants preserved?

### Change

- Do the included responsibilities naturally evolve together?
- Are independently changing responsibilities unnecessarily coupled?

### Lifecycle

- Do the included responsibilities share a meaningful lifecycle?

### Failure

- Can the responsibilities fail independently?
- If not, is the shared failure semantics intentional?

### Time

- Is temporal coupling understood?

### Scaling

- Can relevant business growth dimensions be handled without creating unnecessary coupling?

### Security and authority

- Does the boundary preserve the intended authority model?

### Coordination

- What interactions does the boundary create?
- Is the coordination cost justified by the independence gained?

### Alternatives

- Was combination considered?
- Was separation considered?
- Was a hybrid structure considered where relevant?
- Are rejected alternatives recorded?

### Traceability

- Is the boundary supported by architectural evidence?
- Can the reasoning behind the boundary be reconstructed?

### Stability

- Is the boundary established, provisional, or unresolved?
- What future discovery could cause it to change?

If these questions cannot be answered, the boundary should not be presented as settled architecture.

---

## 7.31 Output of Boundary Construction

The output is a set of **architectural boundaries with explicit ownership and justification**.

Conceptually:

```text
Responsibilities
       ↓
Responsibility Clusters
       ↓
Boundary Hypotheses
       ↓
Boundary Tests
       ↓
Architectural Boundaries
       │
       ├── ownership
       ├── state
       ├── authority
       ├── lifecycle
       ├── consistency
       ├── failure
       ├── temporal behaviour
       ├── scaling
       └── interaction contracts
```

At this point, the architecture has moved beyond a collection of responsibilities.

It now has independently meaningful logical ownership domains.

However, the relationships between those domains have not yet been fully constructed.

That is the next problem.

---

## 7.32 Central Principle

> **A subsystem boundary is justified when a coherent responsibility can be owned, changed, operated, failed, reasoned about, and evolved independently without breaking the correctness of the surrounding system.**

The boundary is therefore not:

- a technical deployment boundary;
- a database boundary;
- a code-module boundary;
- a fashionable microservice;
- a convenient diagram box.

It is a **logical ownership boundary** discovered from the structure of the problem.

The complete construction sequence is:

```text
Level 1 Responsibilities
        ↓
Responsibility Construction
        ↓
Responsibility Relationships
        ↓
Responsibility Clusters
        ↓
Boundary Hypotheses
        ↓
Boundary Tests
        ↓
Logical Architectural Boundaries
```

And because the architecture is constructed incrementally, every boundary remains subject to the accumulated architecture:

```text
A
 ↓
A + B
 ↓
A + B + C
 ↓
A + B + C + D
 ↓
...
```

A later discovery may therefore force an earlier boundary to change.

That is not an exception to the method.

It is a fundamental part of it.

Section 8 will construct what happens **across** these boundaries: the interactions, information flows, decisions, feedback loops, temporal relationships, and coordination behaviours that turn independently owned responsibilities into one coherent system.


# 8. Interaction and System Behaviour Construction

## 8.1 Purpose

Sections 6 and 7 construct the system's responsibilities and boundaries.

Section 8 constructs what happens **between and through those boundaries**.

A system is not defined only by what its subsystems own.

It is also defined by:

- how responsibilities invoke one another;
- what information moves between them;
- what decisions move between them;
- what authority is transferred or retained;
- how state changes as interactions occur;
- what happens when information is missing or conflicting;
- what happens when an actor is unavailable;
- what happens when an action fails;
- how humans enter and leave the process;
- how external systems participate;
- how time changes the situation;
- how one interaction causes another;
- how feedback changes subsequent behaviour.

Therefore, the architectural question becomes:

> **How do independently owned responsibilities cooperate to produce the complete behaviour required by the system?**

This is the point at which the architecture must begin to behave as a coherent system rather than merely exist as a set of boxes.

---

## 8.2 Principle: Interactions Describe Behaviour, Not Implementation

Level 1 already establishes that interactions describe how actors work together and should describe behaviour rather than implementation.

The same rule applies during Level 2 architecture construction.

An interaction such as:

```text
Situation Understanding
        ↓
Decision
```

does not mean:

```text
HTTP request
```

or:

```text
function call
```

or:

```text
message queue
```

Those are Level 3 implementation possibilities.

At Level 2, the interaction means:

> **The decision responsibility requires the situation model produced by the understanding responsibility.**

The architecture must first establish the logical relationship.

Only later should technology determine how that relationship is implemented.

---

## 8.3 An Interaction Is More Than a Connection

A simple architectural diagram often represents an interaction as:

```text
A ─────────→ B
```

That is insufficient for serious architecture.

The interaction must answer:

```text id="2p5p0c"
Who initiates?
What triggers it?
What is being requested?
What information crosses?
What authority crosses?
What state is read?
What state may change?
What does the receiver return?
What happens if the receiver cannot respond?
What happens if the information is incomplete?
What happens next?
```

A richer logical interaction is therefore:

```text id="8r1n3s"
Actor / Responsibility A
        │
        │ trigger
        │ request + context
        ▼
Responsibility B
        │
        │ decision / information / result
        ▼
Actor / Responsibility A
```

The interaction is the **behavioural contract** between the two responsibilities.

---

## 8.4 Construct Interactions From Responsibilities

Interactions should be constructed only after the responsibilities and candidate boundaries exist.

The sequence is:

```text id="q2t5j4"
Responsibility
      ↓
Boundary
      ↓
Interaction Need
      ↓
Interaction Contract
      ↓
System Behaviour
```

For each important relationship discovered in Sections 6 and 7, ask:

> **What must actually happen between these responsibilities?**

For example:

```text id="x9svm4"
Situation Understanding
        ↓
Decision
```

becomes something more precise:

```text id="x4j8h2"
Decision responsibility requests the current
situation model from Situation Understanding.

Situation Understanding provides:
- current interpretation;
- known information;
- unknown information;
- conflicting information;
- relevant context;
- provenance where required.

Decision responsibility uses that model
to determine whether it can safely proceed.
```

The interaction is now architecturally meaningful.

---

## 8.5 Construct Complete Business Interactions

The architecture should not be built from isolated interactions.

It should be tested against **complete end-to-end behaviours**.

Level 1 already provides examples of complete interactions such as:

```text id="tqkz71"
Customer sends message
        ↓
Tend receives message
        ↓
Tend understands situation
        ↓
Tend gathers information
        ↓
Tend determines whether enough information exists
        ↓
Tend decides next step
        ↓
Tend responds or acts
```

This is important because local interactions can appear correct while the complete business behaviour remains impossible.

The architecture must therefore repeatedly ask:

> **Can the system actually move from the initiating event to the required business outcome?**

---

## 8.6 The Interaction Construction Unit

An interaction construction unit should contain one meaningful behavioural path.

A useful structure is:

```text id="jzqjce"
Trigger
    ↓
Actor
    ↓
Responsibility
    ↓
Information / State
    ↓
Decision
    ↓
Next Responsibility
    ↓
Outcome
```

But this is only the normal path.

The interaction unit must also identify important branches:

```text id="y5ok0s"
                 ┌── enough information ──► continue
                 │
Trigger → Understand
                 │
                 ├── missing information ─► gather
                 │
                 ├── ambiguity ───────────► clarify
                 │
                 └── conflict ────────────► resolve / escalate
```

The architecture should be constructed around these behavioural possibilities rather than around a single idealized happy path.

---

## 8.7 Construct Triggers Explicitly

Every important interaction begins because something causes it.

Triggers may include:

```text id="h67x8p"
Customer message
Employee action
External system event
Scheduled time
Deadline
State transition
New information
Verification result
Failure
Human approval
System-generated condition
```

Time itself can be a meaningful actor.

The Level 1 model explicitly recognises that time can cause deadlines to pass, appointments to begin, scheduled work to start, and business information to become outdated. Tend observes these changes and determines whether action is required.

Therefore, interaction construction must not assume:

```text
Everything starts with a user request.
```

A system may need to act because the world changed.

---

## 8.8 Construct Information Flow

For every interaction ask:

> **What information crosses the boundary?**

Do not merely say:

```text
A sends data to B.
```

Identify the logical meaning.

For example:

```text id="84w3y5"
Situation Understanding
        ↓
Current situation model
        ↓
Decision
```

The model may contain:

```text
Customer intent
Known facts
Unknowns
Conflicts
Relevant context
Source information
Temporal context
Provisional interpretations
```

This matters because information is not interchangeable.

A boundary may need:

- the original observation;
- an interpreted claim;
- a decision;
- a permission;
- a reference to authoritative external state;
- a derived value;
- a request for action.

These have different semantics.

---

## 8.9 Preserve the Difference Between Observation and Interpretation

Interaction construction must preserve the distinction between:

```text id="3k3qkk"
What was observed
```

and:

```text id="7j08g4"
What the system currently believes the observation means
```

For example:

```text
Observation:
Customer says "Any update?"

Interpretation:
Customer may be asking about the open delivery situation.

Status:
Provisional.

Reason:
There are multiple open situations.
```

The existing situation-understanding design explicitly requires Tend to keep ambiguity and uncertainty visible rather than collapsing them into a single confidence value.

Therefore, an interaction should not silently transform:

```text
Input observation
```

into:

```text
Established fact
```

merely because another responsibility needs a value.

---

## 8.10 Construct Decision Flow Separately From Information Flow

Information flowing into a responsibility does not mean that the responsibility is authorised to act on it.

The architecture must therefore distinguish:

```text id="5u8d8y"
Information
```

from:

```text id="7p7w7d"
Decision
```

and:

```text id="r7f9hz"
Authority to execute
```

For example:

```text id="2apf0h"
Situation Understanding
        │
        │ interpretation
        ▼
Decision
        │
        │ authorised action
        ▼
Execution
```

The interpretation is not itself the decision.

The decision is not itself execution.

Execution is not itself proof that the action was correct.

Keeping these interactions distinct prevents responsibility collapse.

---

## 8.11 Construct State Transitions

Interactions frequently change state.

Therefore, for important interactions ask:

> **What is true before this interaction?**

and:

> **What becomes true after it?**

For example:

```text id="v17xkq"
Before:
Information required

Interaction:
Employee provides information

After:
Information available
```

Or:

```text id="d3n8d2"
Before:
Situation unresolved

Interaction:
Required evidence gathered

After:
Situation becomes sufficiently understood
```

Or:

```text id="x2qz7f"
Before:
Action requested

Interaction:
Execution occurs

After:
Execution result known
```

The architecture should represent these transitions explicitly where they matter to correctness.

This is particularly important when multiple responsibilities observe or influence the same lifecycle.

---

## 8.12 Construct Feedback Loops

Many real system interactions are not linear.

The output of one responsibility changes the input to another responsibility that has already participated in the process.

For example:

```text id="y3p6ck"
Situation
   ↓
Understand
   ↓
Gather
   ↓
Decide
   ↓
Act
   ↓
Verify
   ↓
Updated Situation
   │
   └──────────────► Understand
```

This is not an implementation detail.

It is the logical behaviour of the system.

The architecture must therefore represent feedback loops explicitly.

A verification result may cause:

- the situation to be updated;
- a decision to be reconsidered;
- additional information to be gathered;
- a human to be involved;
- an action to be retried;
- the process to terminate.

The architecture is therefore a dynamic graph rather than a static pipeline.

---

## 8.13 Construct Human Interactions as First-Class Behaviour

Humans must not be treated as exceptional error handlers.

If a human is part of the intended business process, human interaction is part of the architecture.

For example:

```text id="6j6p3m"
Tend identifies missing information
        ↓
Tend identifies appropriate employee
        ↓
Tend requests information
        ↓
Employee provides information
        ↓
Tend records information
        ↓
Tend re-evaluates situation
```

This behaviour already exists in the Level 1 interaction model.

The logical architecture therefore needs to represent:

- when human intervention occurs;
- what context the human receives;
- what the human is responsible for;
- what authority the human has;
- what the system records;
- what happens if the human does not respond;
- how the system resumes after human input.

Human intervention is not simply:

```text
if automation fails → human
```

It can be an intentional part of normal system behaviour.

---

## 8.14 Construct External-System Interactions

External systems are actors, not internal subsystems.

The architecture must therefore represent their interactions explicitly.

For example:

```text id="5fj2e8"
Tend
 │
 │ request authoritative information
 ▼
Business System
 │
 │ return information
 ▼
Tend
```

Or:

```text id="zq7s0c"
Tend
 │
 │ request authorised action
 ▼
Business System
 │
 │ result
 ▼
Tend
```

The important questions are:

- Who owns the external state?
- What does Tend know?
- What does Tend infer?
- What does the external system guarantee?
- What happens when the system is unavailable?
- What happens when its response conflicts with another source?
- Can Tend retry?
- Can the action be safely repeated?
- What proves that the requested action actually occurred?

The boundary and interaction must preserve the fact that Tend coordinates with business systems rather than automatically becoming their replacement.

---

## 8.15 Construct Communication Interactions

Communication platforms are also external actors.

The architecture should distinguish:

```text id="fjr6y2"
Business meaning
```

from:

```text id="2g5m89"
Communication delivery
```

For example:

```text
Decision
   ↓
Response content
   ↓
Communication responsibility
   ↓
Communication platform
   ↓
Customer
```

A communication failure is therefore different from a decision failure.

The system may know what it wants to communicate while being unable to deliver it.

This distinction affects:

- responsibility;
- failure handling;
- state;
- retries;
- observability;
- customer experience.

---

## 8.16 Construct Time-Based Behaviour

Time must be treated as an architectural participant where it affects behaviour.

Ask:

```text id="zq2t4m"
What happens when time passes?

What becomes stale?

What expires?

What deadline becomes active?

What scheduled activity begins?

What must happen if nobody acts before the deadline?
```

For example:

```text id="4o9v3e"
Situation awaiting employee response
        ↓
Deadline approaches
        ↓
Tend evaluates SLA state
        ↓
Escalation required
        ↓
Human escalation interaction
```

Time therefore creates interactions even when no human sends a message.

---

## 8.17 Construct Failure Paths Alongside Success Paths

A major architectural failure is constructing:

```text id="2m2q8v"
A → B → C → success
```

and only later asking:

```text
"What if B fails?"
```

Failure behaviour must be constructed alongside normal behaviour.

For every important interaction, ask:

```text id="3h4kmp"
What if the sender fails?

What if the receiver is unavailable?

What if the response is missing?

What if the response conflicts with existing information?

What if the response arrives late?

What if the action succeeds but confirmation is unavailable?

What if the action is performed twice?

What if a human does not respond?

What if the original situation changes while the interaction is in progress?
```

These questions often reveal missing responsibilities or incorrect boundaries.

---

## 8.18 Failure Is Behaviour, Not an Exception

A failure should be represented as a possible system state transition.

For example:

```text id="t4xv4n"
Information requested
       ↓
Source unavailable
       ↓
Information remains unknown
       ↓
Decision cannot safely proceed
       ↓
Wait / alternate source / human intervention
```

This is a legitimate system behaviour.

It should not be described merely as:

```text
API error
```

The Level 1 framework explicitly distinguishes business failures from technology failures.

The architecture therefore reasons first about:

```text
Business consequence
```

and only later about:

```text
Technical mechanism
```

---

## 8.19 Construct Interaction Preconditions

Before an interaction occurs, certain conditions may need to be true.

Examples:

```text id="r8g5q5"
Required information exists
Actor is authorised
Situation is sufficiently understood
Business rule permits action
Required approval exists
Previous lifecycle state is correct
External system is available
```

These should be made explicit.

For example:

```text
Execute cancellation
```

may actually mean:

```text
IF
    situation is understood
AND
    cancellation is permitted
AND
    required authority exists
AND
    target order is identified
THEN
    request cancellation
ELSE
    do not execute
```

This is still logical architecture.

It does not yet specify how those conditions are implemented.

---

## 8.20 Construct Interaction Postconditions

Similarly, determine what must be true after an interaction.

For example:

```text id="13y6hh"
Interaction:
Employee provides missing information.

Postconditions:
- information is recorded;
- source is known;
- situation model can be updated;
- previous unknown may become known;
- decision process is reconsidered.
```

Postconditions are useful because they expose hidden responsibilities.

If the system must:

```text
record information
update situation
re-evaluate decision
notify another actor
```

then those responsibilities and their relationships must exist somewhere in the architecture.

---

## 8.21 Construct Interaction Ownership

Every interaction should have a clear owner for each side.

Ask:

```text id="eqf8gk"
Who initiates?

Who is responsible for producing the requested result?

Who is responsible for interpreting the result?

Who owns the resulting state?

Who decides what happens next?
```

This prevents an interaction from becoming a vague shared responsibility.

For example:

```text id="b7s9h3"
Business System
    owns order state

Tend
    owns coordination of the business interaction

Decision responsibility
    owns the decision to request an action

Execution responsibility
    owns execution of the authorised request

Verification responsibility
    owns determining whether execution produced the expected result
```

The exact final allocation is architectural work.

The method requires that the allocation be explicit.

---

## 8.22 Construct Idempotency and Repetition Semantics Logically

Some interactions can happen more than once.

This must be considered at Level 2 even though implementation mechanisms belong later.

Ask:

> **What does it mean if the same interaction happens again?**

Possible logical semantics include:

```text id="d44j2n"
Repeat safely
Ignore duplicate
Re-evaluate current state
Create a new attempt
Create a new business event
Require human review
Reject because the operation is no longer valid
```

For example, if Tend requests an external action and does not receive confirmation, the architecture must distinguish:

```text
Action may not have happened
```

from:

```text
Action definitely failed
```

Otherwise a retry could accidentally perform a business action twice.

This is a logical behavioural concern, not merely a technical retry policy.

---

## 8.23 Construct Concurrency and Interleaving

Multiple interactions can occur at the same time.

Therefore, architecture construction must ask:

> **What happens when two valid interactions affect the same situation concurrently?**

For example:

```text id="o6g3k4"
Customer message
        │
        ├────────► Interaction A
        │
        └────────► Interaction B

Employee update
        │
        └────────► Interaction C
```

The architecture must determine whether these can:

- proceed independently;
- be ordered;
- be merged;
- conflict;
- invalidate one another;
- require re-evaluation.

The question is not yet how concurrency is implemented.

The question is what the system must mean when concurrent events occur.

---

## 8.24 Construct Temporal Ordering

Some interactions require ordering.

Represent this explicitly:

```text id="4q7zqu"
A must happen before B
```

is different from:

```text
A usually happens before B
```

which is different from:

```text
A and B may happen independently
```

and different again from:

```text
A and B may happen concurrently but must be reconciled.
```

These distinctions become important when constructing lifecycle and state behaviour.

---

## 8.25 Construct Re-evaluation

Tend operates in an environment where information can change while work is in progress.

Therefore, architecture must include the possibility that a previously valid conclusion becomes invalid.

For example:

```text id="sv0gkc"
Situation understood
       ↓
Decision made
       ↓
New external information arrives
       ↓
Previous decision may no longer be valid
       ↓
Situation re-evaluated
       ↓
Decision confirmed / changed
```

This is particularly important for situations containing provisional interpretations or unknown information.

A decision should not automatically be treated as permanently valid simply because it was once reached.

---

## 8.26 Construct Observability as Part of Behaviour

Observability must be considered during interaction construction.

For every meaningful interaction ask:

> **What must be knowable afterwards about what happened?**

At minimum, important behaviour may need to preserve:

```text id="u0v1s6"
What happened
When it happened
Which situation it belonged to
Who/what initiated it
What information was used
What decision was made
What action occurred
What result occurred
Why the next step happened
```

This is not the same as deciding to build a separate “Observability subsystem.”

Observability is a cross-cutting architectural requirement.

It must be attached to the behaviours that need to be reconstructed.

This aligns with the broader principle that architecture should make important system reasoning and execution behaviour reconstructable rather than merely record arbitrary logs.

---

## 8.27 Construct LLM / Agent Interactions Explicitly

Where automated reasoning participates in an interaction, the architecture must treat the reasoning system as an actor with explicit boundaries.

The question is not:

```text
Where do we put the LLM?
```

The question is:

```text
What responsibility does automated reasoning perform?

What information does it receive?

What information does it not receive?

What decisions may it make?

What decisions may it recommend?

What actions is it authorised to initiate?

What must be verified?

What happens when it is uncertain?
```

This is particularly important because the product principles apply to automated reasoning as well as human interaction.

The LLM is therefore an interactor with the system, not an invisible implementation detail.

Its architectural interaction should preserve:

- context;
- authority;
- uncertainty;
- available capabilities;
- errors;
- verification;
- resulting decisions.

---

## 8.28 Interaction Contracts

After constructing an important interaction, record its logical contract.

A useful structure is:

```text id="0s5qz6"
Interaction ID:

Trigger:

Initiator:

Receiver:

Purpose:

Preconditions:

Information Provided:

Information Produced:

State Read:

State Changed:

Decision / Authority:

Expected Outcome:

Failure Outcomes:

Retry / Repetition Semantics:

Temporal Requirements:

Concurrency Considerations:

Postconditions:

Observability Requirements:

Next Possible Interactions:

Supporting Evidence:
```

This becomes the architectural representation of the relationship.

It allows later construction to reason about the interaction without reconstructing it from scattered source material.

---

## 8.29 Interaction Construction as a Graph

As interactions accumulate, construct an interaction graph.

For example:

```text id="oj9m8j"
                     ┌───────────────┐
                     │   Customer    │
                     └───────┬───────┘
                             │ message
                             ▼
                  ┌────────────────────┐
                  │ Situation          │
                  │ Understanding      │
                  └─────────┬──────────┘
                            │
                       situation
                            ▼
                  ┌────────────────────┐
                  │ Information        │
                  │ Gathering          │
                  └─────────┬──────────┘
                            │
                         evidence
                            ▼
                  ┌────────────────────┐
                  │ Decision           │
                  └──────┬───────┬─────┘
                         │       │
                      clarify   act
                         │       │
                         ▼       ▼
                     Human   Execution
                               │
                               ▼
                           Verification
                               │
                               ▼
                         Updated Situation
                               │
                               └──────────► Understanding
```

This graph should be allowed to contain:

- loops;
- branches;
- joins;
- asynchronous paths;
- human interventions;
- external actors;
- temporal triggers;
- failure paths.

A tree is not required.

A pipeline is not assumed.

---

## 8.30 Interaction Construction Must Be Scenario-Driven

The interaction graph should be tested through complete scenarios.

For each important business scenario, walk through:

```text id="6jjr3n"
Trigger
  ↓
Responsibility
  ↓
Interaction
  ↓
State
  ↓
Decision
  ↓
Interaction
  ↓
...
  ↓
Business Outcome
```

Then repeat with important variations:

```text
Normal case
Missing information
Conflicting information
Unavailable source
Human intervention
Late response
Incorrect information
Repeated interaction
Concurrent interaction
Unexpected situation
```

This is where the architecture is tested against actual behaviour rather than abstract relationships.

---

## 8.31 Interaction Construction Reveals Missing Responsibilities

One of the most valuable properties of interaction construction is that it can expose responsibilities that were invisible during Sections 6 and 7.

For example:

```text id="h6u5j1"
A needs information from B
        ↓
But B does not know how to obtain it
        ↓
New responsibility discovered:
Information Gathering
```

Or:

```text id="0u8r4j"
Action performed
        ↓
But nobody determines whether it succeeded
        ↓
New responsibility discovered:
Verification
```

Or:

```text id="y4x8s9"
Two sources disagree
        ↓
No existing responsibility owns conflict handling
        ↓
New responsibility discovered
```

This is exactly why construction cannot be a strictly linear process.

Interactions feed discoveries back into responsibility construction.

---

## 8.32 Interaction Construction Can Invalidate Boundaries

Similarly, an interaction may expose an incorrect boundary.

Suppose:

```text id="xq5n7e"
Boundary A
        │
        │ frequent coordination
        ▼
Boundary B
```

Further analysis reveals:

```text
A and B must jointly maintain the same invariant
and recover from failure together.
```

The boundary may need to be reconsidered.

Conversely, an apparently unified boundary may reveal:

```text
A → B
```

where B has a completely different authority, lifecycle, and failure model.

That may indicate that B should become independently bounded.

Therefore:

> **Interaction construction is also a boundary validation mechanism.**

---

## 8.33 Interaction Construction Is Bidirectional

An interaction is not fully understood by examining only:

```text
A → B
```

The architecture must also understand:

```text
B → A
```

and potentially:

```text
A → B → C → A
```

The return path may carry:

- information;
- decisions;
- errors;
- verification;
- state changes;
- requests for clarification;
- updated context.

Many architectural mistakes occur because the forward path is designed while the feedback path is left implicit.

---

## 8.34 Agent Construction Procedure

When an LLM or agent constructs interactions, it should follow this procedure.

### Input

```text
Current Architecture
Current Responsibility Model
Current Boundary Model
Relevant Architectural Evidence
Relevant End-to-End Scenarios
Known Constraints
Known Invariants
Known Failure Classes
Relevant Open Questions
```

### Task

For each selected interaction:

1. identify the trigger;
2. identify the initiator;
3. identify the receiving responsibility;
4. define the purpose;
5. define information crossing the boundary;
6. define relevant state;
7. define authority and decision semantics;
8. define preconditions;
9. define expected outcome;
10. define postconditions;
11. construct important failure paths;
12. construct temporal behaviour;
13. construct repetition semantics;
14. construct concurrency implications;
15. identify feedback loops;
16. identify human and external actors;
17. identify observability requirements;
18. reconcile with existing boundaries;
19. identify missing responsibilities;
20. update the architecture.

### Prohibited shortcut

The agent must not reduce the interaction to:

```text
A calls B
```

unless that statement genuinely captures all relevant architectural semantics.

---

## 8.35 Control / Gate

An interaction should not be considered sufficiently constructed until:

### Trigger
- Is it clear what causes the interaction?

### Ownership
- Is the initiator clear?
- Is the receiver clear?
- Is responsibility for the outcome clear?

### Information
- Is the logical information crossing the boundary explicit?
- Are observations, interpretations, and decisions distinguished where necessary?

### State
- What state is read?
- What state changes?
- Who owns the resulting state?

### Authority
- What decisions are being made?
- Who is authorised to make them?
- Does information accidentally become authority?

### Behaviour
- What happens normally?
- What happens next?
- What are the postconditions?

### Failure
- What happens when the interaction fails?
- What happens when information is missing or conflicting?
- What happens when an actor is unavailable?

### Time
- What temporal conditions apply?
- What happens if the interaction is delayed?

### Repetition
- What happens if it occurs twice?

### Concurrency
- What happens if another interaction occurs simultaneously?

### Feedback
- Can the interaction change the situation and trigger re-evaluation?

### Human / External Actors
- Are human and external-system responsibilities explicit?

### Observability
- Can the important behaviour be reconstructed afterwards?

### Architecture
- Does the interaction expose a missing responsibility?
- Does it invalidate a boundary?
- Does it introduce an unrecognised dependency?

If these cannot be answered, the interaction remains provisional.

---

## 8.36 Output of Interaction and System Behaviour Construction

The output of this section is a **behavioural architecture** connecting the responsibilities and boundaries constructed previously.

It contains:

```text id="xqwr03"
Triggers
   +
Interactions
   +
Information flows
   +
Decision flows
   +
State transitions
   +
Authority transitions
   +
Temporal behaviour
   +
Failure paths
   +
Human interactions
   +
External-system interactions
   +
Feedback loops
   +
Concurrency semantics
   +
Observability requirements
```

The architecture can now be represented as:

```text id="5o0l2v"
Responsibilities
       ↓
Boundaries
       ↓
Interactions
       ↓
System Behaviour
       ↓
Business Outcomes
```

But this is still not the complete architecture.

The behaviour must now be examined under the dimensions that can distort or break it:

- time;
- failure;
- scaling;
- security;
- observability;
- human behaviour;
- LLM behaviour;
- consistency;
- evolution;
- operational complexity.

Those concerns are not simply added as a checklist at the end.

They must be overlaid onto the constructed architecture and used to challenge it.

That is the purpose of the next section.

---

## 8.37 Central Principle

> **Architecture is not complete when responsibilities and boundaries have been named. It must explain how those responsibilities cooperate over time, exchange information, make decisions, change state, handle failure, involve humans and external systems, and feed results back into the system.**

The construction sequence is therefore now:

```text id="n9s8fz"
Problem
  ↓
Responsibilities
  ↓
Boundaries
  ↓
Interactions
  ↓
Behaviour
```

And because this remains construction rather than extraction, the process is still iterative:

```text id="zq1x7j"
Interaction discovery
       ↓
Missing responsibility
       ↓
Responsibility revision
       ↓
Boundary revision
       ↓
Interaction revision
       ↓
Updated behaviour
```

The resulting architecture is a connected behavioural model rather than a collection of subsystem descriptions.

The next construction problem is to ask whether that model remains correct when subjected to the forces that act on it: **time, failure, growth, concurrency, authority, observability, human behaviour, automated reasoning, evolution, and other cross-cutting architectural dimensions.**

# 9. Architectural Dimensions

## 9.1 Purpose

Sections 6–8 construct the **shape and behaviour** of the architecture:

```text
Responsibilities
        ↓
Boundaries
        ↓
Interactions
        ↓
System Behaviour
```

That model is necessary, but it is not sufficient.

A system can have apparently correct responsibilities, clean boundaries, and coherent happy-path interactions while still failing when exposed to:

- concurrent work;
- growing business complexity;
- delayed information;
- unavailable actors;
- changing authority;
- conflicting state;
- human inaction;
- security constraints;
- observability requirements;
- automated reasoning;
- changing business rules;
- operational failure.

These concerns are **architectural dimensions**.

An architectural dimension is a property or force that cuts across the existing architecture and asks:

> **Does this architecture remain correct when viewed through this particular dimension?**

This distinction is important.

A dimension is not automatically a subsystem.

For example:

```text
Security
Observability
Scalability
Time
Failure
```

do not automatically become:

```text
Security Service
Observability Service
Scaling Service
Time Service
Failure Service
```

They are lenses through which the existing architecture is tested.

Some dimensions may eventually justify dedicated responsibilities. Others may remain cross-cutting constraints implemented across many boundaries.

---

## 9.2 Principle: Dimensions Challenge the Architecture

The architecture should not be considered correct merely because each local responsibility appears reasonable.

It must survive the forces that act upon it.

Therefore:

> **After constructing responsibilities, boundaries, and interactions, systematically project important architectural dimensions onto the model and use them to challenge its assumptions.**

The purpose is not to decorate the architecture with quality attributes.

The purpose is to discover whether:

- a boundary is wrong;
- a responsibility is missing;
- state is owned incorrectly;
- authority is unclear;
- an interaction is too tightly coupled;
- a lifecycle is incomplete;
- a failure path is unsafe;
- a scaling dimension has been ignored;
- an invariant cannot actually be maintained.

Architectural dimensions are therefore **discovery mechanisms**, not merely review checklists.

---

# 9.3 The Dimension Model

For each architectural dimension, construct:

```text
Dimension
    ↓
Force / Requirement
    ↓
Affected Responsibilities
    ↓
Affected Boundaries
    ↓
Affected Interactions
    ↓
Architectural Consequence
    ↓
Decision / Constraint
    ↓
Evaluation Signal
```

For example:

```text
Scaling dimension:
More customers

        ↓

More simultaneous situations

        ↓

Situation Management,
Information Gathering,
Decision Making

        ↓

Can these situations remain independently operable?

        ↓

Boundary / state-isolation requirement

        ↓

Architecture must prevent one customer's work
from becoming coupled to another customer's situation.
```

The important point is that the dimension produces an architectural consequence.

Simply writing:

```text
"The system should scale."
```

is not architecture.

---

# 9.4 Dimension Construction Procedure

For each important dimension:

### 1. Identify the force

What changes?

```text
More users
More situations
More integrations
More time
Less availability
More concurrent actions
Less certainty
More employees
Changing policies
Changing authority
```

### 2. Identify what it affects

Which responsibilities, boundaries, states, and interactions experience that force?

### 3. Identify the failure or tension

What becomes difficult, unsafe, expensive, inconsistent, or ambiguous?

### 4. Determine the architectural consequence

Does the architecture need:

- separation;
- coordination;
- isolation;
- ordering;
- persistence;
- re-evaluation;
- explicit authority;
- verification;
- independent lifecycle;
- different interaction semantics;
- a new responsibility?

### 5. Test alternatives

Would a different boundary or interaction model handle the dimension better?

### 6. Record the decision

Capture the resulting architectural constraint or decision.

### 7. Define an evaluation signal

How will we know that the decision remains appropriate?

---

# 9.5 Dimension 1 — Time

Time is not merely a technical scheduling concern.

Time changes the business situation itself.

The Level 1 model explicitly recognises that time can cause:

- deadlines to pass;
- appointments to begin;
- scheduled work to start;
- information to become outdated.

Therefore ask:

```text
What changes merely because time passes?

What information becomes stale?

What expires?

What becomes urgent?

What deadline changes responsibility?

What should happen when a waiting period ends?

What happens if nobody acts before the deadline?
```

For Tend, this can produce behaviour such as:

```text
Situation waiting for employee
        ↓
Time passes
        ↓
Deadline reached
        ↓
Responsibility remains unfulfilled
        ↓
Escalation becomes necessary
        ↓
Situation changes
```

Time can therefore affect:

- state;
- priority;
- responsibility;
- escalation;
- validity;
- decision correctness;
- communication;
- lifecycle.

### Architectural consequence

Time-dependent behaviour must not be hidden inside individual interactions.

The architecture must represent:

```text
Temporal condition
→ resulting state/decision
→ resulting interaction
```

when that relationship is important to correctness.

---

# 9.6 Dimension 2 — Change Over Time

Time and change are related but different.

Time passing is not the same as the underlying world changing.

Tend assumes:

- customer information changes;
- business policies change;
- operational processes change;
- a decision that is correct today may not be correct tomorrow.

Therefore ask:

> **What happens when information or rules change after a decision has already been made?**

For example:

```text
Situation
    ↓
Decision
    ↓
New information
    ↓
Previous assumption invalidated
    ↓
Re-evaluate
```

This creates a requirement for the architecture to distinguish:

```text
Current truth
```

from:

```text
Historical decision
```

and:

```text
Previous understanding
```

from:

```text
Current understanding
```

### Architectural consequence

The system must be able to determine when previously constructed understanding or decisions require reconsideration.

---

# 9.7 Dimension 3 — Failure

Failure should be projected onto every important architectural interaction.

Level 1 identifies business failures such as:

- missing information;
- conflicting information;
- incorrect information;
- unavailable actors;
- authentication failures;
- business-rule violations;
- communication failures;
- unexpected situations.

The architectural question is:

> **What does the system do when the intended interaction cannot complete?**

For each responsibility:

```text
Normal outcome
        ↓
Failure
        ↓
Business consequence
        ↓
Safest correct next step
```

The next step may be:

```text
Continue
Wait
Gather more information
Retry
Ask a human
Escalate
Re-evaluate
Stop safely
```

It must never be:

```text
Pretend success
```

The Level 1 failure model explicitly establishes that failure should lead to the safest correct next step and that Tend must never hide the failure.

### Architectural consequence

Failure handling belongs in the behavioural model of the responsibility that encounters the failure.

It should not automatically be centralized into a generic “error handler.”

---

# 9.8 Dimension 4 — Uncertainty

Uncertainty is different from failure.

A system can be functioning correctly while the world remains unknown.

For example:

```text
External system responded successfully
        ↓
But returned incomplete information
```

The technical interaction succeeded.

The business problem remains uncertain.

Tend therefore needs to preserve:

```text
Known
Unknown
Conflicting
Provisional
```

rather than pretending every successful information retrieval produces certainty.

The existing situation model explicitly treats ambiguity and uncertainty as distinct and requires them to remain visible.

### Architectural consequence

Architecture must support progress under incomplete knowledge.

The system should be able to:

```text
Model → Gather → Re-evaluate
```

without requiring:

```text
Model → Complete certainty → Continue
```

This is a fundamental behavioural property of Tend.

---

# 9.9 Dimension 5 — Consistency

Ask:

> **Which things must agree, and for how long?**

Not everything in the system needs the same consistency semantics.

For each important state relationship:

```text
A changes
    ↓
Must B immediately agree?
```

Possible answers include:

```text
Immediately
Before next decision
Eventually
Only when re-read
Never — they are intentionally independent
```

For example, Tend may hold contextual information about a business system without becoming the canonical owner of that system's state.

The architecture therefore needs to distinguish:

```text
Tend's coordination state
```

from:

```text
External system's authoritative state
```

The existing architecture principles explicitly preserve source ownership rather than allowing Tend to silently become the system of record.

### Architectural consequence

Consistency requirements should be attached to specific states and relationships rather than declared globally.

---

# 9.10 Dimension 6 — State and Lifecycle

Ask:

> **What must survive beyond one interaction?**

Some information is temporary.

Some state defines the continuing existence of a business situation.

For example:

```text
Customer message
        ↓
Situation created
        ↓
Waiting for information
        ↓
Information received
        ↓
Decision made
        ↓
Action pending
        ↓
Verified
        ↓
Resolved
```

The architecture must determine:

- which states matter;
- who owns them;
- which transitions are valid;
- what causes transitions;
- what can interrupt a lifecycle;
- what happens when a situation is reopened;
- what happens when multiple situations coexist.

Tend explicitly needs to support customers having several open situations simultaneously and to distinguish related situations from the same situation.

### Architectural consequence

State ownership must follow the responsibility that owns the corresponding business concept, not simply whichever component happens to need the data.

---

# 9.11 Dimension 7 — Concurrency

A business does not stop while Tend is processing.

Multiple events may occur:

```text
Customer message
Employee update
External system update
Timer
Previous action completion
```

at overlapping times.

Ask:

```text
Can these happen simultaneously?

Can they modify the same situation?

Can one invalidate another?

Which ordering matters?

What happens when two decisions are made from different versions of the situation?
```

For example:

```text
Tend sees:
Order = delayed

        ↓

Employee manually updates:
Order = shipped

        ↓

Old automated decision completes
```

The architecture must define what should happen.

It cannot assume that the world remains unchanged between:

```text
Understand
```

and:

```text
Act
```

### Architectural consequence

Concurrency may require:

- re-evaluation;
- version awareness;
- ordering;
- conflict detection;
- ownership rules;
- verification.

The exact mechanism belongs to Level 3.

---

# 9.12 Dimension 8 — Authority and Security

Security is not simply an authentication feature.

At Level 2, the central question is:

> **Who is allowed to know, decide, request, approve, or perform each action?**

The Level 1 model establishes that employees, customers, and external partners should not necessarily receive the same information, and that business-controlled permissions apply to what external partners may see.

Therefore model authority explicitly:

```text
Who may read?
Who may provide?
Who may decide?
Who may approve?
Who may execute?
Who may override?
Who may configure?
Who may delegate?
```

Also distinguish:

```text
Identity
Permission
Authority
Responsibility
```

These are related but not identical.

### Architectural consequence

Every significant action should have an identifiable authority boundary.

The architecture must not allow:

```text
Information access
        =
Action authority
```

nor:

```text
LLM capability
        =
Business authority
```

Authority must be explicitly represented.

---

# 9.13 Dimension 9 — Information Ownership and Provenance

Information may cross many boundaries without changing ownership.

For every important piece of information ask:

```text
Where did it originate?

Who owns it?

Who may change it?

Who may interpret it?

Who may rely on it?

How do we know when it became stale?

What does Tend actually need to retain?
```

This is particularly important for Tend because its surrounding systems remain authoritative for their own domains.

The existing architecture explicitly distinguishes canonical external data from information Tend retains for its own responsibilities.

### Architectural consequence

The architecture should prefer:

```text
Reference / claim / derived context
```

where appropriate rather than accidentally creating:

```text
Second source of truth
```

This dimension often reveals hidden duplication of state.

---

# 9.14 Dimension 10 — Scaling

Scaling must be evaluated according to **business complexity**, not servers.

Level 1 identifies independent growth dimensions including:

- customers;
- employees;
- conversations;
- business systems;
- communication channels;
- locations;
- knowledge;
- integrations.

Each dimension can produce a different architectural pressure.

For example:

```text
More customers
        ↓
More independent situations
        ↓
Need isolation between customer work
```

while:

```text
More integrations
        ↓
More external behaviours and failure modes
        ↓
Need stronger integration boundary
```

and:

```text
More employees
        ↓
More responsibility assignment
        ↓
More authority and coordination complexity
```

Therefore ask:

> **Which part of the business can grow independently, and does the architecture allow it to do so?**

### Architectural consequence

Scaling may justify:

- isolation;
- independent lifecycle;
- separate coordination;
- different interaction semantics;
- boundary refinement.

But it does not automatically justify horizontal technical components.

Technical scaling mechanisms belong to Level 3.

---

# 9.15 Dimension 11 — Operational Complexity

An architecture can be logically elegant but operationally impossible.

Ask:

```text
How many things must cooperate for one business outcome?

How many states must be coordinated?

How many actors can become unavailable?

How difficult is recovery?

How difficult is diagnosis?

How much hidden coordination exists?
```

A design that requires five independently failing responsibilities to cooperate for every simple action may be logically decomposable but operationally fragile.

This dimension therefore tests:

```text
Architectural flexibility
```

against:

```text
Operational burden
```

### Architectural consequence

Avoid decomposition merely because responsibilities can theoretically be separated.

A boundary should exist because the independence it provides is worth the coordination cost.

This reinforces the Section 7 principle that boundaries are an optimization over competing forms of coupling.

---

# 9.16 Dimension 12 — Observability and Traceability

The question is:

> **Can we reconstruct why the system reached its current state?**

This is more demanding than asking whether logs exist.

For important behaviour, the architecture should preserve enough information to understand:

```text
What happened?
What situation was active?
What information was available?
What was unknown?
What decision was made?
Why was that decision made?
What action followed?
What result occurred?
What happened next?
```

This is particularly important for Tend because correctness is behavioural.

A request returning successfully does not prove that Tend made the correct business decision.

The architecture therefore needs traceability from:

```text
Intent
  ↓
Situation
  ↓
Information
  ↓
Decision
  ↓
Action
  ↓
Outcome
```

### Architectural consequence

Observability should be constructed into important interactions rather than added after the architecture is finished.

This does not imply that observability must be one standalone subsystem.

It is a cross-cutting requirement over the execution model.

---

# 9.17 Dimension 13 — Human Behaviour

Humans introduce dimensions that purely automated systems do not have.

A person may:

- delay;
- misunderstand;
- reject a request;
- provide incomplete information;
- become unavailable;
- change roles;
- delegate responsibility;
- override a previous decision.

For Tend, this is central rather than exceptional.

Level 1 identifies business inaction as one of the hardest problems Tend must solve: when the right next step requires a person and that person does not act, Tend must make the inaction visible and keep the situation moving until someone safe takes responsibility.

Therefore ask:

```text
What happens when the assigned person does nothing?

Who owns the responsibility?

When does it become overdue?

Who is the next responsible person?

What authority does that person have?

What happens if nobody accepts responsibility?
```

### Architectural consequence

Human inaction must produce an explicit state and next-step behaviour.

It cannot simply disappear into:

```text
waiting...
```

without ownership or visibility.

---

# 9.18 Dimension 14 — Automated Reasoning and LLM Behaviour

Automated reasoning introduces another dimension.

An LLM can:

- interpret ambiguous information;
- propose a decision;
- select a capability;
- produce incorrect reasoning;
- encounter insufficient context;
- behave differently under similar inputs;
- fail to recognise an edge case.

Therefore ask:

```text
What does automated reasoning know?

What does it not know?

What may it decide?

What may it recommend?

What actions require verification?

What happens when it is uncertain?

What happens when its interpretation conflicts with established information?
```

The architectural answer should not be:

```text
"Use a better model."
```

That belongs to Level 3.

The Level 2 question is:

> **Where does automated reasoning sit in the responsibility and authority structure?**

### Architectural consequence

Automated reasoning must operate within explicit:

```text
Context boundary
Capability boundary
Authority boundary
Verification boundary
Failure boundary
```

The model should not become an implicit owner of business truth simply because it generated an interpretation.

---

# 9.19 Dimension 15 — Evolution

Architecture must survive change.

Ask:

```text
What is likely to change?

What should remain stable?

Which boundaries absorb change?

Which assumptions are dangerous?

Which decisions have explicit replacement conditions?
```

Tend is expected to operate across:

- different businesses;
- different communication channels;
- different markets;
- different business systems;
- changing business policies.

Product Vision explicitly distinguishes stable core decision-making from configuration that differs between businesses and markets.

### Architectural consequence

Variation should be located deliberately.

The architecture should not spread business-specific differences through the core model when they can remain configuration or external responsibility.

But this must not become premature abstraction.

The rule is:

> **Separate variation when the variation is a real architectural force, not merely because future reuse is imaginable.**

---

# 9.20 Dimension 16 — Integration Diversity

External systems differ in:

- authority;
- availability;
- latency;
- information shape;
- capabilities;
- failure behaviour;
- permissions;
- lifecycle;
- consistency.

As integrations grow, the architecture must ask:

> **What remains stable despite external differences?**

For example:

```text
Business meaning
        ↓
Integration interaction
        ↓
External system
```

The logical interaction should preserve the business responsibility even when the external system differs.

This is especially important because Tend is intended to work with existing customer-management, inventory, scheduling, and communication systems rather than replace them.

### Architectural consequence

External variation should be absorbed at the appropriate boundary without allowing each integration's peculiarities to redefine the core business responsibility.

---

# 9.21 Dimension 17 — Communication and Channel Constraints

Communication is not merely output.

Different channels can have different rules.

For example:

```text
Can Tend initiate?
Can Tend reply?
What consent exists?
What information may be sent?
What happens if delivery fails?
What channel should be used?
```

The Product Vision explicitly notes that communication-channel capabilities and rules differ between markets and platforms.

Therefore the architecture must separate:

```text
Business decision:
"What should we communicate?"
```

from:

```text
Channel decision:
"How, where, and whether may we communicate it?"
```

### Architectural consequence

Channel-specific constraints should not contaminate the core business decision model.

---

# 9.22 Dimensions Interact

Architectural dimensions should never be evaluated only one at a time.

The real system exists at their intersections.

For example:

```text
Time
  +
Human inaction
  +
Authority
  +
Failure
```

produces:

```text
Employee has responsibility
        ↓
Deadline passes
        ↓
Employee has not acted
        ↓
Escalation required
        ↓
Next authorised person identified
        ↓
New interaction begins
```

Or:

```text
Uncertainty
  +
External system failure
  +
Customer communication
```

produces:

```text
Business system unavailable
        ↓
Delivery state remains unknown
        ↓
Tend cannot safely claim delivery status
        ↓
Customer receives truthful uncertainty
        ↓
Situation remains active
```

Or:

```text
Concurrency
  +
External state
  +
Decision
```

produces:

```text
Situation evaluated
        ↓
External state changes
        ↓
Previously valid decision may be stale
        ↓
Re-evaluate before consequential action
```

These intersections are often where the most important architectural discoveries occur.

---

# 9.23 Construct a Dimension Matrix

After evaluating individual dimensions, create a matrix showing where each dimension affects the architecture.

| Dimension | Responsibilities Affected | Boundaries Affected | Interactions Affected | Architectural Consequence |
|---|---|---|---|---|
| Time | Situation, Coordination, Escalation | Lifecycle boundaries | Waiting, escalation | Explicit temporal state |
| Failure | All execution responsibilities | Failure ownership | Every important interaction | Defined recovery paths |
| Uncertainty | Understanding, Gathering, Decision | Information boundaries | Evidence flow | Explicit unknown/conflict state |
| Consistency | State-owning responsibilities | State boundaries | Updates/read decisions | Explicit consistency semantics |
| Concurrency | Situation, Decision, Execution | Shared-state boundaries | Parallel events | Re-evaluation/conflict handling |
| Authority | Decision, Human Collaboration, Configuration | Permission boundaries | Approval/action | Explicit authority model |
| Scaling | Situation, Integration, Coordination | Isolation boundaries | High-volume paths | Independent growth |
| Observability | All important behaviours | Execution boundaries | Traceable interactions | Behaviour reconstructability |
| Human Behaviour | Human Collaboration, Coordination | Human ownership boundaries | Requests/escalation | Explicit responsibility lifecycle |
| LLM Behaviour | Understanding, Decision, Execution | Reasoning/authority boundaries | Reasoning/capability calls | Explicit reasoning constraints |
| Evolution | Core responsibilities | Variation boundaries | Configuration/integration | Change isolation |
| Integration Diversity | Integration-related responsibilities | External-system boundaries | Requests/results | Stable logical contracts |

This matrix is not the architecture itself.

It is a **challenge map**.

---

# 9.24 Dimension Conflicts

Dimensions will sometimes demand contradictory things.

For example:

```text
Strong consistency
        vs
Independent scaling
```

or:

```text
Maximum automation
        vs
Human approval
```

or:

```text
Centralised coordination
        vs
Independent ownership
```

or:

```text
Rich context
        vs
Minimum information exposure
```

These are architectural trade-offs.

Do not resolve them silently.

Record:

```text
Dimension A requires:
X

Dimension B requires:
Y

Conflict:
X and Y cannot both be maximised.

Decision:
Choose Z because...

Consequence:
...

When this decision should be revisited:
...
```

This is where architectural judgement becomes explicit.

---

# 9.25 Dimension Interaction Graph

A useful representation is:

```text
                         ┌─────────────┐
                         │    Time     │
                         └──────┬──────┘
                                │
                                ▼
┌──────────────┐          ┌──────────────┐          ┌──────────────┐
│ Uncertainty  │─────────►│  Behaviour   │◄─────────│   Failure    │
└──────────────┘          └──────┬───────┘          └──────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
              ▼                  ▼                  ▼
        ┌──────────┐      ┌────────────┐      ┌────────────┐
        │ Authority│      │ Concurrency│      │  Human     │
        └──────────┘      └────────────┘      │ Behaviour  │
                                               └────────────┘
              │                  │                  │
              └──────────────────┼──────────────────┘
                                 ▼
                         ┌──────────────┐
                         │   Outcome    │
                         └──────┬───────┘
                                │
                                ▼
                         ┌──────────────┐
                         │Observability │
                         └──────────────┘
```

This reinforces the principle that dimensions are not independent checkboxes.

They interact with the same underlying behaviour.

---

# 9.26 Dimension Construction Can Discover New Architecture

The most important outcome of this section is not the matrix.

It is what the matrix exposes.

For example:

### Discovery 1

```text
Scaling
    ↓
Independent customer situations required
    ↓
Current boundary mixes customer situations
    ↓
Boundary must change
```

### Discovery 2

```text
Failure
    ↓
Action can succeed without confirmation
    ↓
No responsibility verifies outcome
    ↓
Verification responsibility discovered
```

### Discovery 3

```text
Human behaviour
    ↓
Employee may not act
    ↓
No owner for overdue work
    ↓
Escalation responsibility discovered
```

### Discovery 4

```text
Authority
    ↓
Decision and execution currently share authority
    ↓
Business approval requirement cannot be represented
    ↓
Decision/execution boundary must change
```

### Discovery 5

```text
Observability
    ↓
Decision cannot be reconstructed
    ↓
Important reasoning state is ephemeral
    ↓
Architectural state/interaction model incomplete
```

This is why Section 9 remains part of construction rather than a final architecture review.

---

# 9.27 Architectural Dimension Record

For important dimensions, maintain an explicit record.

```text
Dimension ID:

Dimension:

Force:

Why It Matters:

Affected Responsibilities:

Affected Boundaries:

Affected Interactions:

Relevant Invariants:

Relevant Failure Classes:

Observed Tensions:

Architectural Consequence:

Decision:

Rejected Alternatives:

Trade-offs:

Evaluation Criteria:

Revisit Conditions:

Supporting Evidence:

Status:
```

This allows future reasoning to build on the decision instead of reconstructing it.

---

# 9.28 Agent Construction Procedure

When an agent performs dimension analysis, it should not simply generate a standard list of:

```text
Security
Scalability
Performance
Reliability
```

Instead:

### Input

```text
Current Architecture
Responsibility Model
Boundary Model
Interaction Model
Behaviour Model
Known Constraints
Product Invariants
Failure Classes
Scaling Dimensions
Architectural Evidence
```

### Procedure

For each relevant dimension:

1. identify the actual force;
2. identify the affected business behaviour;
3. trace the force through responsibilities;
4. trace it through boundaries;
5. trace it through interactions;
6. identify state and authority implications;
7. identify failure implications;
8. identify dimension conflicts;
9. determine architectural consequences;
10. challenge existing boundaries;
11. challenge existing responsibilities;
12. record new responsibilities if necessary;
13. record revised boundaries if necessary;
14. record decisions and trade-offs;
15. define evaluation criteria;
16. record what remains unknown.

The agent must not:

- invent generic quality attributes without evidence;
- create components simply because a dimension exists;
- move to technology;
- treat standard industry patterns as mandatory architecture;
- silently resolve conflicts;
- ignore dimensions that contradict the current design;
- declare the architecture stable merely because every dimension has been checked.

---

# 9.29 Control / Gate

An architecture passes the architectural-dimensions gate only when:

### Coverage
- Important dimensions have been identified from the actual problem rather than from a generic checklist.

### Traceability
- Each dimension can be traced to the responsibilities, boundaries, or behaviours it affects.

### Behaviour
- Important dimensions have been tested against actual interactions and scenarios.

### Time
- Temporal effects are explicit where relevant.

### Failure
- Important business failures have defined consequences and recovery paths.

### Uncertainty
- Unknown and conflicting information remain representable.

### State
- Lifecycle and state ownership remain coherent under the dimension.

### Concurrency
- Important concurrent interactions have defined semantics.

### Authority
- Permission, responsibility, decision authority, and execution authority are not silently conflated.

### Scaling
- Business growth dimensions have been projected onto the architecture.

### Human Behaviour
- Human delay, refusal, absence, and changing responsibility are accounted for where relevant.

### Automated Reasoning
- LLM/agent capabilities, uncertainty, authority, and verification are explicitly bounded where relevant.

### Observability
- Important behaviour remains reconstructable.

### Evolution
- Important expected changes have an architectural home.

### Conflicts
- Dimension conflicts are explicitly identified and resolved through architectural trade-offs.

### Discovery
- Dimension analysis has been allowed to invalidate responsibilities, boundaries, and interactions where necessary.

### Provisionality
- Unknowns and unresolved trade-offs remain visible rather than being converted into false certainty.

If the gate fails, the process moves backward.

```text
Dimension
   ↓
Problem discovered
   ↓
Responsibility revision
   ↓
Boundary revision
   ↓
Interaction revision
   ↓
Dimension re-evaluation
```

---

# 9.30 Output of Architectural Dimension Construction

The output is not a new collection of components.

It is an architecture that has been **challenged from multiple directions**.

The resulting model contains:

```text
Responsibilities
+
Boundaries
+
Interactions
+
Behaviour
+
Temporal semantics
+
Failure semantics
+
Uncertainty semantics
+
State/lifecycle semantics
+
Consistency semantics
+
Concurrency semantics
+
Authority/security semantics
+
Scaling implications
+
Human behaviour
+
Automated reasoning constraints
+
Observability requirements
+
Evolution boundaries
+
Dimension trade-offs
```

At this point, the architecture should be much more than a decomposition.

It should explain:

```text
What exists
Who owns it
Where it belongs
How it interacts
What state changes
Who has authority
What happens when things fail
What happens when the world changes
What happens when many things happen at once
What happens as the business grows
How humans participate
How automated reasoning participates
How behaviour can be reconstructed
How the architecture can evolve
```

But one important problem remains.

The architecture constructed so far has been built by accumulating decisions.

That accumulation itself creates a risk:

> **Earlier architectural decisions may no longer be compatible with later discoveries.**

The next section therefore turns the construction process back onto the architecture itself.

Section 10 will construct the **reconciliation and gap-discovery process**: how to continuously compare the accumulated architecture against the evidence, constraints, invariants, behaviours, and decisions that produced it, and how to detect contradictions, omissions, duplicated responsibilities, unsupported assumptions, and architectural blind spots.

# 10. Reconciliation and Gap Discovery

## 10.1 Purpose

Sections 6–9 progressively construct the architecture:

```text
Responsibilities
        ↓
Boundaries
        ↓
Interactions
        ↓
Behaviour
        ↓
Architectural Dimensions
```

At every stage, however, the architecture is an interpretation of the available evidence.

That creates an unavoidable risk.

The architecture may become internally coherent while being externally wrong.

For example:

```text
Knowledge says:
    Business owns approval.

Architecture says:
    Tend can approve automatically.
```

Or:

```text
Responsibility model says:
    Source A owns the canonical state.

Later boundary says:
    Tend stores and updates its own copy as authoritative.
```

Or:

```text
Interaction model says:
    Employee approval is required.

Execution model says:
    Action can proceed without approval.
```

Or:

```text
Scaling analysis says:
    Customer situations must remain independent.

Boundary model says:
    Multiple customer situations share mutable state.
```

These are not merely documentation inconsistencies.

They are architectural contradictions.

Therefore architecture construction requires a dedicated reconciliation process:

> **Continuously compare the constructed architecture against the evidence, constraints, invariants, decisions, behaviours, and dimensions that justify it, and actively search for contradictions, omissions, unsupported assumptions, and newly exposed gaps.**

---

# 10.2 Principle: Coherence Is Not Correctness

An architecture can be internally consistent and still be wrong.

This distinction is fundamental.

### Internal coherence

The architecture agrees with itself.

```text
A depends on B
B provides what A expects
C uses A's output
```

Everything fits together.

### External correctness

The architecture also agrees with the problem it is supposed to solve.

```text
Architecture
      ↕
Responsibilities
      ↕
Constraints
      ↕
Invariants
      ↕
Evidence
      ↕
Business Behaviour
```

A design that is internally elegant but violates a product invariant is still wrong.

Therefore:

> **Architecture must be reconciled against its sources of authority, not merely reviewed for internal consistency.**

---

# 10.3 Reconciliation Is Continuous

Reconciliation is not a final review performed after the architecture is "finished."

Every meaningful architectural change can invalidate something that was constructed earlier.

The loop is:

```text
New Evidence
      ↓
New Understanding
      ↓
Architectural Change
      ↓
Reconciliation
      ↓
Affected Decisions
      ↓
Affected Boundaries
      ↓
Affected Interactions
      ↓
Affected Dimensions
      ↓
Updated Architecture
```

This means every construction step potentially has a backward effect.

That is not process failure.

It is an expected property of constructing architecture from incomplete knowledge.

---

# 10.4 What Must Be Reconciled

The constructed architecture should be compared against at least these sources:

```text
Product Intent
Level 1 Responsibilities
Level 1 Constraints
Product Invariants
Failure Classes
Scaling Dimensions
Out-of-Scope Decisions
Level 2 Evidence
Research Findings
Architectural Decisions
Open Questions
Existing Behavioural Scenarios
External System Constraints
Human Responsibilities
LLM / Agent Constraints
```

The goal is not to reread every document.

The goal is to test the architecture against the **architectural evidence model** constructed earlier.

The architecture should therefore be traceable back to the evidence without requiring reconstruction from the original knowledge base.

---

# 10.5 Reconciliation Is Bidirectional

Traceability must work in both directions.

### Forward

```text
Evidence
   ↓
Responsibility
   ↓
Boundary
   ↓
Interaction
   ↓
Behaviour
```

This answers:

> **Why does this architectural element exist?**

### Backward

```text
Architecture
   ↓
Decision
   ↓
Evidence
```

This answers:

> **What justifies this architectural element?**

Both are necessary.

Without forward traceability, architecture can become arbitrary.

Without backward traceability, architecture can become unsupported accumulation.

---

# 10.6 The Reconciliation Graph

The architecture should be thought of as a graph of justified relationships:

```text
                    ┌──────────────┐
                    │    Evidence  │
                    └──────┬───────┘
                           │ supports
                           ▼
                    ┌──────────────┐
                    │ Responsibility│
                    └──────┬───────┘
                           │ grouped by
                           ▼
                    ┌──────────────┐
                    │    Boundary  │
                    └──────┬───────┘
                           │ interacts
                           ▼
                    ┌──────────────┐
                    │  Behaviour   │
                    └──────┬───────┘
                           │ constrained by
                           ▼
                    ┌──────────────┐
                    │   Dimension  │
                    └──────┬───────┘
                           │ validated by
                           ▼
                    ┌──────────────┐
                    │   Outcome    │
                    └──────────────┘
```

A useful reconciliation question is therefore:

> **Can every important architectural statement be connected to something that justifies it?**

---

# 10.7 Gap Discovery

Reconciliation does not only detect contradictions.

It also discovers things that are missing.

There are several important classes of architectural gaps.

### Missing responsibility

A required behaviour exists, but no responsibility owns it.

```text
Need:
Verify external action

Architecture:
No responsibility verifies it

Gap:
Verification responsibility
```

### Missing interaction

Two responsibilities exist, but there is no valid way for them to cooperate.

```text
A requires information from B

A exists
B exists
No interaction contract exists

Gap:
Information exchange
```

### Missing state

A lifecycle requires information that nobody owns.

```text
Situation can become overdue

But:
No state represents overdue

Gap:
Temporal/lifecycle state
```

### Missing authority

An action exists, but nobody is clearly authorised to perform it.

```text
Action exists
Permission exists
Authority unclear

Gap:
Authority model
```

### Missing failure behaviour

Normal behaviour exists but failure has no valid next step.

```text
Request → Response

What if:
Response never arrives?

Gap:
Failure behaviour
```

### Missing evidence

An architectural decision exists without sufficient justification.

```text
Boundary chosen
        ↓
No evidence explains why

Gap:
Architectural justification
```

### Missing evaluation criterion

A decision exists but there is no way to know when it has stopped being appropriate.

```text
Decision
   ↓
No revisit condition

Gap:
Evaluation criterion
```

---

# 10.8 Contradiction Discovery

A contradiction occurs when two valid-looking statements cannot simultaneously remain true.

Examples:

```text
Invariant:
Never guess.

Behaviour:
Proceed using a likely interpretation.

Contradiction.
```

Or:

```text
Source ownership:
External system is authoritative.

State model:
Tend's local copy is authoritative.

Contradiction.
```

Or:

```text
Human authority:
Approval required.

Interaction:
Action executes before approval.

Contradiction.
```

Or:

```text
Boundary:
Customer situations are independent.

State:
All situations mutate one shared lifecycle.

Contradiction.
```

Contradictions must be surfaced explicitly.

They should never be resolved by silently choosing whichever statement appears most convenient.

---

# 10.9 Authority Conflicts

Not all contradictions are equally severe.

A particularly important class is an **authority conflict**.

Suppose:

```text
Product principle
      ↓
Business owns decisions
```

but:

```text
Architecture
      ↓
Tend automatically decides whether policy applies
```

The second statement may or may not be valid.

The question is:

> **Is Tend executing an explicitly delegated decision rule, or has it accidentally become the business authority?**

The architecture must distinguish:

```text
Business-defined policy
```

from:

```text
Tend's execution of that policy
```

and:

```text
Tend's independent judgement
```

This distinction is especially important for automated reasoning.

---

# 10.10 Invariant Reconciliation

Product invariants are stronger than ordinary preferences.

Examples from the product model include:

```text
Never guess.
Explain important decisions.
Business remains accountable.
Tend coordinates rather than replaces business systems.
Information ownership remains with the appropriate source.
```

These invariants are intended to remain true regardless of architectural evolution.

Therefore each invariant should be tested against the complete architecture.

For every invariant ask:

```text
Where is this invariant enforced?

Which responsibility preserves it?

Which interactions could violate it?

Which failure paths could violate it?

Which architectural dimensions could weaken it?

Can the architecture actually guarantee it?
```

If the answer is:

```text
"The documentation says it should."
```

the invariant is not architecturally grounded.

---

# 10.11 Constraint Reconciliation

Constraints differ from invariants.

An invariant says:

```text
This must always remain true.
```

A constraint says:

```text
The architecture must operate within this condition.
```

For each constraint:

```text
Constraint
    ↓
Affected architecture
    ↓
Decision made
    ↓
Evidence
    ↓
Evaluation
```

Ask:

> **Where does this constraint appear in the architecture?**

If nowhere, it may have been forgotten.

If everywhere, it may have been incorrectly elevated into a global constraint.

---

# 10.12 Behaviour Reconciliation

The architecture should be replayed against complete business scenarios.

For every important scenario:

```text
Scenario
   ↓
Trigger
   ↓
Responsibility
   ↓
Boundary
   ↓
Interaction
   ↓
State
   ↓
Decision
   ↓
Action
   ↓
Outcome
```

Then ask:

> **Can the architecture actually produce the required outcome?**

This is particularly important because an architecture can contain all the correct nouns:

```text
Conversation
Knowledge
Decision
Workflow
Human
Integration
Memory
```

while still lacking the relationships necessary to make the business work.

Architecture is not validated by component presence.

It is validated by behaviour.

---

# 10.13 Negative-Space Reconciliation

Reconciliation must examine not only what the architecture says, but also what it fails to say.

Ask:

```text
What should exist but does not?

What relationship should exist but does not?

What state should exist but does not?

Who should own this but nobody does?

What failure should be handled but has no path?

What decision should require authority but does not?

What assumption is being used without being recorded?
```

This is particularly important for LLM-assisted architecture construction.

An LLM is good at producing plausible structures.

Plausibility is not evidence of completeness.

Negative-space analysis forces the reasoning process to search for missing structure rather than merely validate existing structure.

---

# 10.14 Duplicate Responsibility Discovery

Reconciliation must also search for responsibilities that accidentally overlap.

For example:

```text
Responsibility A:
Determine whether information is sufficient.

Responsibility B:
Determine whether the situation is ready to proceed.

```

These may be distinct.

Or they may be the same responsibility expressed twice.

The test is:

> **Do these responsibilities own meaningfully different problems, or are we creating two names for the same work?**

Duplication is dangerous because it creates:

- competing decisions;
- duplicated state;
- unclear authority;
- inconsistent behaviour;
- unnecessary coordination.

---

# 10.15 Hidden Responsibility Discovery

The opposite problem is also common.

A responsibility may be hidden inside another responsibility.

For example:

```text
Decision
  ├── understands situation
  ├── gathers information
  ├── evaluates policy
  ├── requests approval
  └── executes action
```

This may appear convenient.

But if these activities have different:

- ownership;
- authority;
- state;
- lifecycle;
- failure;
- change drivers;

then the boundary may be wrong.

Reconciliation should therefore ask:

> **Is one responsibility secretly performing several independently meaningful responsibilities?**

This is how architectural boundaries become more precise.

---

# 10.16 Orphan Architecture

Every important architectural element should have a reason to exist.

An **orphan** is an element that cannot be traced to a meaningful requirement.

For example:

```text
Subsystem X
```

exists because:

```text
"It is a common architectural pattern."
```

That is insufficient.

The question should be:

```text
What responsibility does X own?
        ↓
What evidence establishes that responsibility?
        ↓
What problem requires it?
```

If there is no answer, X should not automatically survive.

This protects the architecture from technology-pattern leakage and premature abstraction.

---

# 10.17 Orphan Evidence

The inverse problem also exists.

Important evidence may have no architectural representation.

For example:

```text
Evidence:
Employees frequently fail to respond to requests.

Architecture:
No explicit responsibility or state for inaction.
```

The evidence is therefore orphaned.

This is a signal that the architecture may be incomplete.

The Level 1 model specifically identifies business inaction as a central failure mode.

Reconciliation should therefore search for evidence that has not produced an architectural consequence.

---

# 10.18 Assumption Reconciliation

Architecture inevitably contains assumptions.

The dangerous case is not having assumptions.

The dangerous case is forgetting that they are assumptions.

For each architectural assumption:

```text
Assumption
    ↓
What depends on it?
    ↓
What happens if it is false?
    ↓
Does the architecture remain valid?
```

Classify assumptions as:

```text
Established
Provisional
Critical
Low-impact
Invalidated
Superseded
```

A critical assumption should produce a visible architectural risk.

---

# 10.19 Research Reconciliation

Research should not be treated as a collection of facts that automatically become architecture.

The knowledge base explicitly separates research from problem framing and solution design; research informs decisions but does not replace those layers.

Therefore each relevant research finding should be classified:

```text
Research Finding
        ↓
Does it change:
    Responsibility?
    Constraint?
    Invariant?
    Boundary?
    Interaction?
    Dimension?
    Assumption?
    Evaluation criterion?
    Nothing?
```

Possible outcomes:

```text
Architecturally relevant
Architecturally irrelevant
Already represented
Contradicts current architecture
Creates new question
Changes an assumption
```

This prevents research volume from becoming architectural noise.

---

# 10.20 Decision Reconciliation

Every important architectural decision should be checked against later decisions.

For example:

```text
Decision A:
Situation owns X.

Later:

Decision B:
Decision owns X.

Conflict.
```

Do not preserve both merely because both were previously accepted.

Instead:

```text
Conflict detected
      ↓
Determine which decision has stronger/current authority
      ↓
Re-examine evidence
      ↓
Revise architecture
      ↓
Mark superseded decision
      ↓
Record why
```

The purpose of the decision history is not to preserve obsolete architecture.

It is to preserve **why the architecture changed**.

---

# 10.21 Reconciliation Across Construction Order

Because construction is incremental:

```text
A
↓
A + B
↓
A + B + C
```

later construction may reveal that A was incomplete.

Therefore reconciliation should explicitly ask:

```text
What did this new construction assume about the earlier architecture?

Is that assumption still valid?

Did the new evidence change an earlier responsibility?

Did the new boundary invalidate an earlier interaction?

Did the new dimension expose a missing state?

Did a later decision supersede an earlier one?
```

This creates controlled backward movement.

---

# 10.22 Reconciliation Matrix

Maintain an explicit matrix:

| Architectural Element | Supporting Evidence | Constraint / Invariant | Behaviour Tested | Dimensions Tested | Conflicts | Status |
|---|---|---|---|---|---|---|
| Responsibility | Evidence IDs | Invariant IDs | Scenario IDs | Dimension IDs | Conflict IDs | Established |
| Boundary | Evidence IDs | Constraint IDs | Scenario IDs | Dimension IDs | Conflict IDs | Provisional |
| Interaction | Evidence IDs | Invariant IDs | Scenario IDs | Dimension IDs | Conflict IDs | Established |
| State | Evidence IDs | Constraint IDs | Scenario IDs | Time/Concurrency | Conflict IDs | Provisional |
| Decision | Evidence IDs | Invariant IDs | Scenario IDs | Relevant dimensions | Conflict IDs | Established |

This does not need to become bureaucratic documentation.

Its purpose is to make architectural support visible.

---

# 10.23 Conflict Register

Maintain a separate conflict register for unresolved contradictions.

```text id="8n9r9b"
Conflict ID:

Conflicting Statements:

Source A:

Source B:

Affected Architecture:

Why They Conflict:

Potential Interpretations:

Current Working Interpretation:

Why:

What Remains Unknown:

Decision Required:

Impact If Wrong:

Status:
```

Possible statuses:

```text
Open
Under Investigation
Resolved
Accepted Trade-off
Superseded
False Conflict
```

A conflict should remain visible until it is genuinely resolved.

---

# 10.24 Gap Register

Similarly maintain a gap register.

```text id="2qf4n8"
Gap ID:

Missing Element:

Type:
- Responsibility
- Boundary
- Interaction
- State
- Authority
- Failure Behaviour
- Constraint
- Evidence
- Evaluation Criterion

Detected By:

Affected Architecture:

Business Consequence:

Evidence:

Proposed Resolution:

Dependencies:

Status:
```

This prevents the architecture from appearing complete simply because the known parts have been documented.

---

# 10.25 Reconciliation Severity

Not every mismatch deserves the same response.

Classify findings.

### Critical

Violates:

- product invariant;
- authority boundary;
- business correctness;
- data ownership;
- safety requirement.

Must block stabilization.

### Major

Causes:

- missing responsibility;
- broken lifecycle;
- incorrect failure behaviour;
- substantial boundary contradiction.

Requires architectural revision.

### Moderate

Causes:

- unnecessary coupling;
- incomplete interaction;
- weak traceability;
- unresolved scaling pressure.

May remain provisional while construction continues.

### Minor

Causes:

- terminology inconsistency;
- documentation ambiguity;
- non-critical traceability gap.

Can be resolved during cleanup.

The severity should reflect **business and architectural consequence**, not how easy the issue is to fix.

---

# 10.26 Reconciliation Is Not Consensus

An architecture is not correct because all previous statements can be made to coexist.

Sometimes one previous decision must be rejected.

For example:

```text
Old decision
      ↓
Supported by early evidence

New evidence
      ↓
Invalidates old assumption

Correct response:
Change architecture.
```

Do not optimize for historical consistency.

Optimize for current correctness with preserved reasoning history.

The architecture should be able to say:

```text
"We previously believed X.
New evidence showed Y.
Therefore X was superseded by Z."
```

That is stronger architecture, not weaker architecture.

---

# 10.27 The Reconciliation Loop

The complete process is:

```text
             ┌─────────────────────┐
             │ Construct Architecture│
             └──────────┬──────────┘
                        ↓
              ┌───────────────────┐
              │ Reconcile Against │
              │ Evidence & Rules  │
              └─────────┬─────────┘
                        ↓
                ┌───────────────┐
                │ Findings      │
                └───────┬───────┘
                        ↓
        ┌───────────────┼────────────────┐
        ↓               ↓                ↓
   Contradiction       Gap          Unsupported
        │               │             Decision
        └───────────────┼────────────────┘
                        ↓
                ┌───────────────┐
                │ Revise Model  │
                └───────┬───────┘
                        ↓
                ┌───────────────┐
                │ Re-test       │
                └───────┬───────┘
                        │
                        └──────────► Construction
```

This loop continues throughout architecture construction.

---

# 10.28 Agent Reconciliation Procedure

An agent performing reconciliation should not ask:

> "Does this architecture look good?"

That question is too unconstrained.

Instead, provide:

```text id="m9xjha"
Current Architecture
+
Architectural Evidence Model
+
Decision Ledger
+
Construction Ledger
+
Constraints
+
Invariants
+
Failure Classes
+
Scenarios
+
Architectural Dimensions
+
Open Questions
```

Then perform explicit passes.

### Pass 1 — Traceability

For every major architectural element:

```text
Why does this exist?
What supports it?
```

### Pass 2 — Coverage

For every important requirement/evidence item:

```text
Where is this represented?
```

### Pass 3 — Contradiction

Ask:

```text
Which statements cannot simultaneously be true?
```

### Pass 4 — Responsibility

Ask:

```text
What is owned twice?
What is owned by nobody?
What responsibility is hiding another responsibility?
```

### Pass 5 — Boundary

Ask:

```text
Which boundary violates ownership?
Which boundary creates excessive coordination?
Which boundary duplicates state?
```

### Pass 6 — Behaviour

Replay scenarios:

```text
Can the architecture actually perform the required work?
```

### Pass 7 — Failure

Replay failure classes:

```text
Does every important failure have a safe next step?
```

### Pass 8 — Dimensions

Replay architectural dimensions:

```text
Time
Failure
Uncertainty
Consistency
Concurrency
Authority
Scaling
Human behaviour
LLM behaviour
Observability
Evolution
```

### Pass 9 — Unknowns

Ask:

```text
What is the architecture currently assuming?
What remains genuinely unknown?
```

### Pass 10 — Revision

Update the architecture rather than merely recording the finding.

---

# 10.29 Control / Gate

Reconciliation passes only when:

### Evidence
- Major architectural decisions have supporting evidence.
- Important evidence has a known architectural consequence or an explicit reason for having none.

### Coverage
- Important responsibilities are represented.
- Important behaviours are represented.
- Important constraints and invariants have architectural consequences.

### Contradictions
- No unresolved critical contradiction is hidden.
- Conflicts are explicitly recorded.

### Responsibility
- No important responsibility is duplicated without justification.
- No required responsibility is ownerless.

### Boundaries
- Boundaries remain compatible with ownership, lifecycle, consistency, failure, authority, and change requirements.

### Interactions
- Required responsibilities can actually cooperate.
- Important failure and feedback paths exist.

### State
- Important lifecycle state has an owner.
- State does not silently duplicate authoritative external state.

### Authority
- Important decisions and actions have explicit authority.

### Dimensions
- Architecture has been challenged against relevant dimensions.

### Assumptions
- Critical assumptions are visible.
- Invalidated assumptions have been removed or revised.

### Traceability
- Architecture → decision → evidence works.
- Evidence → architectural consequence works.

### Revision
- Findings have produced actual architectural changes where necessary.

### Provisionality
- Remaining uncertainty is visible.
- "No known gap" is not incorrectly represented as "complete certainty."

---

# 10.30 Output of Reconciliation and Gap Discovery

The output of this section is not merely a cleaner architecture.

It is an architecture whose **justification structure is explicit**.

The resulting model contains:

```text
Architecture
+
Supporting Evidence
+
Decisions
+
Constraints
+
Invariants
+
Scenario Coverage
+
Conflict Register
+
Gap Register
+
Assumptions
+
Revisit Conditions
+
Traceability
```

More importantly, it establishes a controlled relationship:

```text
Evidence
   ↓
Understanding
   ↓
Architecture
   ↓
Behaviour
   ↓
Validation
   ↓
Discovery
   ↓
Revised Architecture
```

This turns architecture into an evolving model rather than a document produced once.

---

# 10.31 Reconciliation Does Not Mean Premature Stabilization

There is an important distinction between:

```text
Reconciled
```

and:

```text
Final
```

An architecture can currently be reconciled while still being provisional because important evidence is missing.

For example:

```text
No contradiction known
        ≠
No uncertainty exists
```

Similarly:

```text
All known scenarios work
        ≠
All possible scenarios are understood
```

Therefore reconciliation should produce confidence and known limitations, not artificial certainty.

---

# 10.32 Central Principle

> **Every architectural element must be explainable, every important piece of evidence must have a considered architectural consequence, and every contradiction or gap must remain visible until it is deliberately resolved.**

The construction process is therefore:

```text
Construct
   ↓
Challenge
   ↓
Reconcile
   ↓
Discover
   ↓
Revise
   ↓
Construct again
```

The architecture is not protected from change by pretending it is finished.

It becomes trustworthy by making change **traceable, justified, and controlled**.

At this point, the architecture has undergone construction, behavioural modelling, dimensional challenge, and reconciliation.

The remaining problem is not simply to find more things to add.

It is to determine **when the architecture is stable enough to stop constructing, what "complete" actually means, how the final model should be represented, and how to prevent future implementation or architectural work from silently violating it.**

That is the purpose of Section 11.


# 11. Architecture Iteration and Stabilization

## 11.1 Purpose

Architecture construction does not end when responsibilities, boundaries, interactions, and architectural dimensions have been modelled.

At that point, the system has an architectural model, but that model may still contain:

- provisional boundaries;
- unresolved contradictions;
- assumptions;
- incomplete interactions;
- weakly justified responsibilities;
- competing architectural alternatives;
- unresolved ownership or authority;
- behaviour that has not been sufficiently tested;
- dimensions that have exposed tensions but not yet produced decisions;
- areas where the available evidence is insufficient to determine the correct structure.

The purpose of this stage is therefore **not to produce a prettier architecture diagram or declare that the architecture is complete**.

Its purpose is to determine whether the constructed architecture has become sufficiently coherent, justified, stable, and bounded that it can serve as the authoritative logical model for Level 3 technical architecture and implementation.

The distinction is important:

> **Construction creates the architecture. Stabilization determines whether the architecture is mature enough to be relied upon.**

Stabilization is therefore a controlled transition from an architecture that is still being discovered into an architecture that can act as a stable design constraint.

It does not mean that the architecture will never change again.

It means that further change should now occur because **new evidence, changed requirements, discovered failure modes, or deliberate architectural decisions justify the change**, rather than because the original construction process was never completed.

---

## 11.2 Principle: Stability Is Not Finality

A logical architecture should never be considered permanently finished.

Tend will evolve.

Its product responsibilities may change. New channels may appear. External systems may change. New failure modes may be discovered. Business rules may evolve. Scaling characteristics may change. New forms of human or automated interaction may expose weaknesses in the existing model.

Therefore:

> **Architectural stability is a state of sufficient justification, not a claim of permanent correctness.**

The architecture is stable when its major structures are sufficiently understood and justified that further work can proceed without repeatedly rediscovering what the system fundamentally is.

This creates an important distinction:

| State | Meaning |
|---|---|
| **Unconstructed** | The architectural question has not yet been sufficiently reasoned about |
| **Provisional** | A useful architectural hypothesis exists but important uncertainty remains |
| **Constructed** | The structure has been explicitly modelled and justified |
| **Stabilized** | The structure has survived reconciliation, behavioural analysis, dimensional analysis, and alternative evaluation |
| **Superseded** | The structure was once valid but has been replaced by a later architectural understanding |

A stabilized architecture can therefore still contain explicitly documented assumptions and revisit conditions.

That is preferable to pretending uncertainty has disappeared.

---

## 11.3 Method: Maintain Architectural Provisionality

Every significant architectural element should carry an explicit status.

At minimum:

```text
Established
Provisional
Conflicting
Unknown
Superseded
```

The status must describe the state of the **architectural understanding**, not merely the confidence of the person or agent producing it.

For example:

```text
Responsibility:
Situation Interpretation

Status:
Established

Boundary:
Situation Management

Status:
Provisional

Reason:
Ownership is clear, but the interaction with
Knowledge Management under conflicting information
has not yet been sufficiently resolved.
```

This prevents an important failure mode:

> A provisional decision becoming permanent simply because later work assumes it exists.

Provisionality must therefore remain visible in the architecture itself.

### Control

For every provisional element, record:

- why it is provisional;
- what is currently unknown;
- what evidence would resolve it;
- which other architectural elements depend upon it;
- what alternative structures remain plausible;
- what condition would cause it to be revisited.

A provisional element without a revisit condition is effectively an undocumented assumption.

---

# 11.4 Principle: Stabilization Must Test the Architecture Against Change

An architecture that works only for the exact assumptions under which it was constructed is not stable.

The architecture must therefore be challenged by the conditions most likely to change it.

These include:

- new responsibilities;
- changed business rules;
- increased scale;
- new communication channels;
- additional external systems;
- different failure modes;
- changed authority;
- increased human involvement;
- changed LLM behaviour;
- new compliance or security requirements;
- changes in information ownership;
- changes in lifecycle;
- changes in temporal requirements.

The question is not:

> “Can the architecture handle every possible future?”

That is impossible.

The question is:

> **“When an important architectural dimension changes, do we know which part of the architecture should change, and can it change without unnecessarily destabilizing unrelated responsibilities?”**

This is one of the strongest indicators that a boundary is meaningful.

A good boundary does not prevent change.

It **contains change**.

---

## 11.5 Method: Identify Architectural Change Drivers

For each major architectural boundary and responsibility, identify its dominant change drivers.

Examples include:

```text
Business policy changes
Channel behaviour changes
Knowledge changes
External-system changes
Human operating-model changes
Scale changes
Security/authority changes
Failure-mode changes
LLM capability changes
Compliance changes
```

Then ask:

1. What causes this responsibility to change?
2. What causes the neighbouring responsibility to change?
3. Do they change together for the same reason?
4. If one changes, must the other change?
5. If they frequently change independently, why are they inside the same boundary?
6. If they almost always change together, why are they separated?
7. Is the current boundary containing the change driver or spreading it through the architecture?

This creates a practical test for architectural stability.

### Example

Suppose two responsibilities are grouped together because they currently operate on the same information.

Later, the information source changes frequently while the interpretation rules remain relatively stable.

If changing the source requires modifying the interpretation responsibility, the boundary may be wrong.

The issue was not visible when the architecture was initially constructed.

The change driver reveals it.

---

# 11.6 Principle: Stabilization Must Preserve the Ability to Move Backward

Architecture construction is intentionally non-linear.

A later interaction may reveal that two responsibilities cannot actually be separated.

A failure analysis may reveal that a boundary owns insufficient state.

A temporal constraint may show that two apparently independent responsibilities require coordinated lifecycle management.

A new research finding may invalidate an assumption.

Therefore:

> **Revising an earlier architectural decision is not architectural failure. Refusing to revise an invalidated decision is.**

The architecture must remain capable of moving backward.

```text
Responsibility
      ↓
Boundary
      ↓
Interaction
      ↓
Dimension
      ↓
Contradiction discovered
      ↓
Boundary reconsidered
      ↓
Responsibility reconsidered
      ↓
Architecture updated
```

This is why architectural history matters.

The current architecture tells us what we believe now.

The construction ledger tells us **why we believe it** and what changed along the way.

---

## 11.7 Method: Perform Architectural Reconsideration

When new evidence challenges an existing decision:

### Step 1 — Identify the affected decision

Do not immediately modify the architecture.

First identify exactly what has been challenged.

```text
Evidence
→ affected assumption
→ affected decision
→ affected architectural element
```

### Step 2 — Determine the scope of impact

Check:

- responsibility;
- boundary;
- state;
- authority;
- interactions;
- failure behaviour;
- temporal behaviour;
- architectural dimensions;
- dependent decisions.

### Step 3 — Reopen the smallest affected reasoning problem

Do not reconstruct the entire architecture unnecessarily.

Return to the smallest architectural question whose answer is no longer reliable.

### Step 4 — Reconcile with the existing architecture

Determine whether the new understanding:

- confirms the existing structure;
- modifies it;
- splits it;
- combines it;
- creates a new responsibility;
- removes a responsibility;
- changes ownership;
- changes interaction;
- changes authority;
- invalidates an invariant;
- exposes a previously hidden architectural dependency.

### Step 5 — Propagate the change

Any dependent architectural elements must be reconsidered.

### Step 6 — Record the revision

The architecture should record:

```text
Previous understanding
New evidence
Reason for reconsideration
Architectural change
Affected elements
Invalidated decisions
New trade-offs
New assumptions
New revisit conditions
```

This preserves architectural lineage.

---

# 11.8 Principle: Stabilization Is a Convergence Process

The goal is not to endlessly explore architecture.

At some point, continued exploration produces diminishing value.

Stabilization therefore requires a controlled convergence process.

The architecture is approaching stability when repeated passes through the major construction dimensions produce fewer meaningful changes.

Conceptually:

```text
Construction pass
      ↓
New understanding
      ↓
Reconciliation
      ↓
Architectural revision
      ↓
New construction pass
      ↓
Reconciliation
      ↓
Smaller revision
      ↓
...
      ↓
No material unresolved contradiction
      ↓
Architecture stabilizes
```

This is **not** the same as:

```text
Read all documents
      ↓
Generate architecture
      ↓
Done
```

The first process measures stability through repeated architectural challenge.

The second measures completion through document consumption.

Those are fundamentally different.

---

# 11.9 Method: Use Materiality to Determine When to Reopen Architecture

Not every new piece of information should reopen the entire architecture.

A useful classification is:

| Change | Response |
|---|---|
| Clarifies existing meaning | Update evidence |
| Adds detail without structural consequence | Update documentation |
| Adds a local interaction | Extend behaviour model |
| Changes a local constraint | Reconcile affected area |
| Changes responsibility ownership | Reconsider responsibility/boundary |
| Changes state authority | Reconsider state/boundary/interaction |
| Changes consistency requirements | Reconsider boundaries and interactions |
| Introduces new failure class | Reconsider behaviour and responsibility |
| Changes dominant scaling dimension | Reconsider affected architecture |
| Invalidates an invariant | Reopen relevant architecture immediately |
| Invalidates a major boundary | Reconstruct affected region |
| Changes fundamental product responsibility | Reopen Level 1 → Level 2 relationship |

The principle is:

> **Reopen architecture according to architectural consequence, not according to the amount of new information.**

A hundred pages of documentation may change nothing architecturally.

One sentence establishing a new authority relationship may change everything.

---

# 11.10 Principle: A Stable Architecture Must Be Explainable

A stabilized architecture should be explainable without relying on the intuition of the person who constructed it.

Every major architectural element should answer:

```text
Why does this exist?
Why is it separate?
Why does it own these responsibilities?
Why does it own this state?
Why does it have this authority?
Why does it interact with these other elements?
Why does it not own nearby responsibilities?
What constraints shape it?
What failures does it contain?
What changes independently?
What evidence supports it?
What alternatives were rejected?
What would cause us to reconsider it?
```

If these questions cannot be answered, the architecture may be coherent-looking but insufficiently justified.

This is especially important when the architecture is later consumed by another human or agent.

The architecture must communicate **reasoning**, not merely structure.

---

# 11.11 Method: Architectural Decision Closure

Before an architectural decision becomes stabilized, capture the decision explicitly.

A decision record should contain:

```text
Decision ID
Decision
Architectural element affected
Problem being solved
Relevant evidence
Constraints
Invariants
Alternatives considered
Chosen structure
Why it was chosen
Trade-offs
Consequences
Rejected alternatives
Dependencies
Assumptions
Revisit conditions
Status
```

The purpose is not bureaucratic documentation.

It is to prevent the architecture from becoming detached from the reasoning that produced it.

A diagram says:

```text
Situation Management → Decision Engine
```

A decision record explains:

```text
Why the Decision Engine is separate
Why Situation Management does not own decision policy
Why the interaction exists
What authority is transferred
What state remains owned by each
What happens when the decision cannot be made
What evidence established the separation
```

The second is architectural knowledge.

---

# 11.12 Principle: Stability Requires Alternative Structures to Have Been Considered

An architecture should not be considered stable merely because one design works.

The relevant question is whether the chosen structure is preferable given the known constraints and alternatives.

For significant boundaries, consider at least:

```text
Alternative A — Combine
Alternative B — Separate
Alternative C — Hybrid / coordinated
```

Then compare them against the relevant forces:

- ownership;
- state;
- consistency;
- lifecycle;
- change;
- failure;
- temporal coupling;
- scaling;
- authority;
- interaction cost;
- operational complexity;
- observability;
- future evolution.

Not every architectural question requires an exhaustive design-space search.

But significant structural decisions should not become “obvious” merely because the first plausible structure was convenient.

---

# 11.13 Principle: Stabilization Must Detect False Stability

One of the most dangerous states is an architecture that looks complete because all visible boxes have names.

This can happen when:

- responsibilities were never fully constructed;
- hidden responsibilities were absorbed into broad components;
- unresolved uncertainty was silently converted into assumptions;
- interactions were omitted;
- failure behaviour was ignored;
- state ownership remained implicit;
- authority was unclear;
- dimensions were considered individually but not at intersections;
- technology choices were allowed to determine structure;
- implementation constraints were mistaken for logical responsibilities.

Therefore:

> **A stable-looking architecture is not necessarily a stable architecture.**

False stability is detected by asking what the architecture cannot currently explain.

---

# 11.14 Method: Perform the Architectural Stress Pass

Before stabilization, perform a final deliberate stress pass.

Take representative situations and attempt to explain them entirely through the architecture.

For each scenario:

```text
Trigger
→ Responsibility
→ Boundary
→ Information
→ Decision
→ Authority
→ State transition
→ Interaction
→ Outcome
→ Failure branch
→ Feedback
→ Observability
```

Then ask:

- Is every responsibility accounted for?
- Is every state transition owned?
- Is every decision authority clear?
- Is every important interaction represented?
- Can failures be explained?
- Can human intervention be explained?
- Can external-system behaviour be explained?
- Can uncertainty be represented?
- Can the system re-evaluate when circumstances change?
- Can the architecture explain why the interaction occurs?
- Does the scenario reveal an architectural dependency that the model does not contain?

If a scenario cannot be explained, the architecture is not yet stable.

---

# 11.15 Method: Measure Stabilization Through Change, Not Confidence

Do not ask:

> “Do we feel confident about this architecture?”

Instead ask observable questions:

### Structural stability

- Are major responsibilities stable?
- Are major boundaries stable?
- Are ownership relationships stable?

### Behavioural stability

- Can representative scenarios be explained?
- Are success and failure paths represented?
- Are temporal and feedback behaviours represented?

### Constraint stability

- Are important constraints represented?
- Are invariants enforceable by the architecture?
- Are authority relationships explicit?

### Dimensional stability

- Have major architectural dimensions been projected onto the system?
- Have dimension intersections been examined?
- Are remaining tensions understood?

### Evidence stability

- Are major architectural decisions traceable to evidence?
- Are important evidence items accounted for?
- Are unresolved assumptions visible?

### Revision stability

- Do new construction passes produce only local refinements?
- Or do they repeatedly invalidate major architectural structures?

A useful qualitative signal is:

```text
Large structural changes
        ↓
Moderate structural changes
        ↓
Local changes
        ↓
Clarifications
        ↓
No material structural changes
```

When repeated relevant passes reach the latter stages, the architecture is approaching stabilization.

---

# 11.16 Principle: Stabilization Must Define Its Remaining Uncertainty

No architecture will have zero unknowns.

Therefore, completion cannot mean:

> “Nothing is unknown.”

Instead:

> **Every remaining unknown must either be shown to be non-blocking, deliberately deferred, or escalated as a blocker.**

Classify remaining unknowns:

### Non-blocking unknown

The architecture can safely proceed without knowing the answer.

### Deferred Level 3 question

The logical architecture is sufficient, but the technical implementation requires further investigation.

### Architectural uncertainty

The answer could materially change a responsibility, boundary, interaction, or constraint.

This must remain visible.

### Blocking uncertainty

The architecture cannot be responsibly stabilized until the uncertainty is resolved.

This prevents technical implementation from silently making unresolved Level 2 decisions.

---

# 11.17 Control/Gate: Architecture Stabilization Gate

The architecture may be considered **stabilized** only when the following conditions are satisfied.

### 1. Responsibility completeness

All important Level 1 responsibilities have a corresponding place in the logical architecture.

No major responsibility is silently absorbed into another responsibility without justification.

### 2. Boundary justification

Major boundaries have explicit:

- ownership;
- state;
- authority;
- change drivers;
- lifecycle;
- failure behaviour;
- consistency implications;
- temporal implications;
- scaling implications;
- interaction implications.

### 3. Behavioural completeness

Representative scenarios can be explained through the architecture.

Success, failure, feedback, human intervention, and external interaction are represented where relevant.

### 4. Constraint satisfaction

Important constraints and invariants have explicit architectural consequences.

### 5. Authority clarity

The architecture makes clear:

- who owns information;
- who interprets it;
- who decides;
- who authorizes;
- who executes;
- who verifies.

### 6. Evidence traceability

Major architectural decisions can be traced backward to supporting evidence.

Major evidence with architectural consequence has been considered.

### 7. Contradiction resolution

Known contradictions are either:

- resolved;
- explicitly accepted as a trade-off;
- or recorded as blockers.

They must not simply disappear from the model.

### 8. Alternative consideration

Significant structural decisions have had plausible alternatives considered.

### 9. Dimensional challenge

The architecture has been challenged against relevant dimensions and their intersections.

### 10. Provisionality visibility

All remaining provisional structures and assumptions are explicitly marked.

### 11. Revisit conditions

Important architectural decisions specify the conditions under which they must be reconsidered.

### 12. Level boundary preserved

The architecture remains technology-independent.

Technical implementation choices have not silently become logical architectural responsibilities.

### 13. Change containment

The architecture provides a reasonable explanation of which areas should change when important change drivers occur.

### 14. Scenario stress

Representative scenarios do not expose unexplained structural gaps.

### 15. Construction convergence

Repeated relevant reasoning passes are no longer producing unexplained major structural changes.

If these conditions are not satisfied, the architecture remains under construction.

---

# 11.18 The Stabilization Record

The stabilization decision itself should be recorded.

```text
Stabilization Record

Architecture Version:
Date:

Responsibilities:
Stable / Provisional / Blocking

Boundaries:
Stable / Provisional / Blocking

Interactions:
Stable / Provisional / Blocking

State:
Stable / Provisional / Blocking

Authority:
Stable / Provisional / Blocking

Failure Behaviour:
Stable / Provisional / Blocking

Architectural Dimensions:
Reviewed / Incomplete

Evidence:
Traceable / Incomplete

Known Contradictions:
None / Listed

Remaining Assumptions:
Listed

Deferred Questions:
Listed

Blocking Questions:
Listed

Revisit Conditions:
Listed

Rejected Alternatives:
Recorded

Stabilization Decision:
Stabilized / Not Stabilized

Reason:
...
```

This record creates an explicit transition point.

It prevents the architecture from becoming “stable” merely because someone started implementing it.

---

# 11.19 Architecture Versioning

Once stabilized, the logical architecture should become versioned.

The version does not represent software release versioning.

It represents a coherent architectural understanding.

For example:

```text
Logical Architecture v0.1
    Initial constructed model

Logical Architecture v0.2
    Situation boundary revised after interaction analysis

Logical Architecture v0.3
    Authority model revised after reconciliation

Logical Architecture v1.0
    Stabilized logical architecture
```

The exact numbering convention is less important than preserving architectural lineage.

Each version should identify:

- what changed;
- why it changed;
- what evidence caused the change;
- what previous decisions were superseded;
- what implementation assumptions may now be invalid.

This becomes particularly important once Level 3 and implementation work begin.

---

# 11.20 Principle: Stabilized Architecture Becomes a Constraint on Lower Levels

Once Level 2 is stabilized, Level 3 should not rediscover the logical architecture.

Level 3 asks:

> **“What technology and technical structure should implement this logical architecture?”**

It should therefore inherit:

- responsibilities;
- boundaries;
- ownership;
- authority;
- state semantics;
- interactions;
- failure behaviour;
- invariants;
- constraints;
- architectural principles.

Level 3 may discover technical constraints that expose weaknesses in Level 2.

That is legitimate.

In that case, the process moves backward:

```text
Level 3 discovery
      ↓
Level 2 architectural tension
      ↓
Reopen affected Level 2 reasoning
      ↓
Revise architecture if justified
      ↓
Re-stabilize
      ↓
Continue Level 3
```

What must not happen is:

```text
Level 2 says A
Level 3 silently implements B
```

That destroys the purpose of the framework.

---

# 11.21 Architectural Freeze Is Not the Goal

The word **freeze** should therefore be used carefully.

The architecture should not be frozen against legitimate discovery.

Instead, it should be **stabilized against arbitrary drift**.

After stabilization:

- implementation cannot silently redefine responsibilities;
- technical convenience cannot silently redefine boundaries;
- a coding agent cannot invent business authority;
- a library limitation cannot become a logical responsibility;
- an implementation shortcut cannot erase an invariant;
- a new requirement can still legitimately trigger architectural revision.

The distinction is:

```text
Frozen
= cannot change

Stabilized
= should not change without architectural justification
```

The second is the desired state.

---

# 11.22 Agent Construction Procedure

When an agent is asked to stabilize the architecture, it must not simply summarize the existing model.

It should execute the following procedure:

```text
1. Load the current architectural model.

2. Load its evidence, decisions, constraints,
   invariants, assumptions, and open questions.

3. Identify all provisional and conflicting elements.

4. Perform responsibility completeness analysis.

5. Perform boundary justification analysis.

6. Replay representative scenarios.

7. Check state ownership and authority.

8. Check success and failure behaviour.

9. Project relevant architectural dimensions.

10. Check dimension intersections.

11. Reconcile architecture against evidence.

12. Identify unsupported architectural claims.

13. Identify orphan evidence and orphan architecture.

14. Identify duplicated or hidden responsibilities.

15. Review significant alternatives.

16. Identify remaining architectural unknowns.

17. Determine whether each unknown is:
       non-blocking
       deferred
       architectural
       blocking

18. Identify decisions that should be revisited.

19. Reconstruct affected areas where necessary.

20. Repeat reconciliation after revision.

21. Evaluate whether subsequent passes are converging.

22. Produce a Stabilization Record.

23. Declare either:
       Stabilized
       or
       Not Stabilized

24. If Not Stabilized, explicitly define
    the next construction frontier.
```

The agent must never declare stabilization merely because:

- all source documents were read;
- a diagram exists;
- every responsibility has a name;
- every component has a description;
- the architecture is internally coherent;
- implementation appears straightforward.

Those are insufficient conditions.

---

# 11.23 Control/Gate: Agent Behaviour Rules

During stabilization, the agent must follow these rules:

```text
DO:
- challenge the current architecture;
- preserve traceability;
- expose uncertainty;
- reopen earlier decisions when evidence requires it;
- test representative behaviour;
- compare alternatives;
- check negative space;
- distinguish architectural blockers from technical questions;
- preserve provisionality;
- record superseded decisions.

DO NOT:
- optimize for visual simplicity;
- assume existing boundaries are correct;
- treat consistency as proof of correctness;
- hide unresolved contradictions;
- convert unknowns into assumptions silently;
- use technology to justify logical boundaries;
- declare completion because the model is comprehensive-looking;
- rewrite the whole architecture merely because one local issue was found;
- preserve an invalidated structure merely to avoid architectural churn.
```

The agent's responsibility is therefore not to make the architecture look finished.

Its responsibility is to determine whether the architecture has earned the right to be treated as stable.

---

# 11.24 The Result of Section 11

The output of this stage is not a new set of components.

It is a **stabilized architectural model and its justification**.

The output consists of:

```text
Stabilized Logical Architecture
        +
Architectural Decision Records
        +
Evidence Traceability
        +
Constraint / Invariant Mapping
        +
Scenario Coverage
        +
Known Assumptions
        +
Known Contradictions
        +
Deferred Questions
        +
Blocking Questions
        +
Revisit Conditions
        +
Architectural Version
        +
Stabilization Record
```

The model is now suitable to become the normative input to Level 3.

However, it remains a living architectural model rather than an immutable specification.

---

# 11.25 Central Principle

> **Architecture should be stabilized when its major responsibilities, boundaries, interactions, authority, state, failure behaviour, constraints, and architectural dimensions are sufficiently justified and mutually coherent that further work can proceed without repeatedly rediscovering the logical structure of the system. Stabilization does not mean the architecture can never change. It means future change must be driven by new evidence, changed constraints, discovered failure modes, or deliberate architectural decisions rather than accidental drift.**

This gives the architecture a useful role:

**During construction, the architecture is a hypothesis being progressively built.**

**During stabilization, it becomes a justified model that constrains subsequent engineering.**

And when future evidence invalidates it, the correct response is not to protect the model from change.

The correct response is to reopen the affected reasoning, update the model, and stabilize it again.

---

## Transition to Section 12

Two short reminders, so this section can be read on its own.

**The three levels.** Level 1 says what problem exists. Level 2 constructs the logical system that solves it: its parts, what each owns, and how they behave. Level 3 decides how technology builds that system.

**Tend.** Tend is the product this method was written for. It watches a business's work across messages, outside systems, people, and time, and keeps each situation moving until someone safe takes responsibility. Its examples appear throughout this section.

Sections 1–11 build the architecture.

```text
1.  Why the method exists
2.  Why architecture must be constructed, not extracted
3.  What the inputs are
4.  How knowledge becomes architectural evidence
5.  How to construct step by step
6.  Responsibilities: what the system must own
7.  Boundaries: which responsibilities belong together
8.  Interactions: how the parts act together over time
9.  Dimensions: the forces that try to break the model
10. Reconciliation: what is missing or contradictory
11. Stabilization: when the model is stable enough to rely on
```

At the end of Section 11, the architecture exists.

But it exists as a construction history.

It is spread across the files that recorded each kind of reasoning.

Nobody can build from that directly.

Section 12 answers three questions:

1. How is the stabilized architecture written down, so that one version is the truth?
2. How do we know Level 2 is actually complete?
3. How is it handed to Level 3, so that someone can build it without losing the reasoning?


# 12. Architecture Representation and Level 2 Completion

## 12.1 Purpose: the final architecture is used in three ways

### What Level 2 produces

The output of Level 2 is **a stable logical model of the system that does not depend on any technology**.

It explains:

- what responsibilities exist;
- how they are organised into parts;
- who owns what;
- what is remembered, and who owns each record;
- who decides, who acts, and who approves;
- how the parts interact;
- how information and decisions move;
- how the system behaves over time;
- how failures and recovery behave;
- how people and outside systems take part;
- which constraints and rules must always hold;
- which forces shaped the model;
- why the major structures exist;
- and what evidence supports them.

The output of Level 2 is **not**:

- a list of components;
- a box-and-arrow diagram;
- a pile of documents;
- a technology choice;
- a database design;
- an API specification;
- an implementation plan;
- a set of technical services.

Those belong to later levels.

### Three uses

The model is used in three ways.

**The first use is understanding.**

A person or an agent asks: what is this system, why is it shaped this way, and does it hold together?

For example: who decides whether a refund needs a person? What happens when the payment provider does not answer? Why is sending a message separate from deciding what to say?

**The second use is building.**

A person or an agent asks: what exactly do I build next, what does it take in, what does it hand on, and how do I know it works?

For example: I am building the part that sends messages. What starts it? What must it check before sending? What must it never do? How do I test that it is right?

**The third use is checking.**

A person or an agent asks: is it complete, can every claim be traced, and has every gate passed?

For example: does every refund rule trace back to a decision the owner made? Is anything that is still open written as if it were decided?

The final model has views organised by kind of concern: a responsibility view, a boundary view, an interaction view, a decision view, and so on.

Those views serve understanding and checking.

None of them is shaped for building.

To build one part from those views, a builder has to collect that part's description from many places: its responsibilities from one view, its state from another, its failures from a third, its rules from a fourth.

That is the same problem the method was created to solve.

The builder would have to hold the whole architecture in their head to build one piece of it.

### Why the build view is shaped the way it is

The build view must give a builder five things:

1. One sentence naming the engineering problem every part exists to solve. Every later choice points back to it.
2. The path every change takes through the parts.
3. One diagram of all the parts.
4. One file for each part, and every file uses the fixed headings of 12.22.
5. Acceptance criteria in each part file (12.22, heading 15), so each part can be built and finished on its own.

Two failures this method must avoid:

- Mixing logical and technical decisions. The hosting platform, the database, and the AI provider do not belong in a Level 2 architecture.
- Describing one storyline and calling the rest exceptions.

Tend has many storylines.

A refund whose result is unknown. A carrier that is down. An investor who wants a deck while the revenue figure is still being confirmed. A list of thirty people to contact, each with their own follow-up. A supplier who sends a document nobody asked for.

Tend must handle all of these with the same parts.

Sections 6–11 worked out how the same parts behave in each of these. For example, they settled that when the payment provider does not answer, the refund is never repeated automatically, and a person gets the full timeline once the wait runs out.

If the build plan described only one storyline, it would throw that work away.

### What Section 12 therefore produces

Section 12 keeps every view the method already asked for.

It adds one more view: **the build view**.

The build view is one overview file, plus one file for each part.

Each part file uses the same fixed headings, so a builder always knows where to look.

Each part file describes how that part behaves in every kind of situation, not only in one happy path.

The other views keep the history and the reasons.

The part files point to them for the "why".

A **register** is a short table kept for checking. For example, the register of decisions lists each decision, its reason, and when to reopen it. The registers point into the views and part files. They do not retell them.

So the final architecture serves all three uses:

```text
Understanding:  the views          → how the system works, and why
Building:       the build view     → what to build, part by part, and how to know it is right
Checking:       the registers      → whether it is complete, traceable, and justified
```

All three are written from the same model.

None of them may say something the others contradict.

---

# 12.2 Principle: The Architecture Is a Model, Not a Diagram

A diagram is one picture of an architecture.

It is not the architecture.

A diagram can show:

```text
A → B → C
```

while hiding:

- why A exists;
- what A owns;
- what A is allowed to decide;
- what B means;
- whether C decides or only executes;
- whether A and B actually share ownership;
- what happens when B fails;
- what happens when the same step runs twice;
- whether the arrow means "now" or "later";
- whether the arrow always happens or only sometimes.

Therefore:

> **The logical architecture is a structured model. Diagrams are pictures drawn from that model. Nothing important may live only in a diagram.**

The model contains four kinds of content:

```text
Structure      — the parts, what each owns, and how they connect
                 e.g. the tool layer is the only way Tend calls an outside system
Behaviour      — what happens over time, including failures
                 e.g. a refund with no answer waits, then goes to a person
Reasoning      — why each structure exists, and what was rejected
                 e.g. why sending is separate from deciding what to say
Traceability   — where each structure came from
                 e.g. which Level 2 answer and which owner decision set the refund rule
```

Diagrams are drawn from the model wherever they help a reader.

The model is the truth. Text, diagrams, and part files are all drawn from it.

When a diagram disagrees with the model, the diagram is fixed.

---

# 12.3 The Logical Architecture Model

The stabilized architecture is made of these related objects:

```text
Logical Architecture
│
├── Responsibilities
├── Relationships between responsibilities
├── Parts (the boundaries)
├── Ownership
├── State and lifecycle        (e.g. a situation is running, waiting, blocked, or completed)
├── Authority: who decides, who acts, who approves
│                              (e.g. a refund above the business's setting needs a named person)
├── Interactions
├── Behaviour over time
├── Failure behaviour          (e.g. a carrier that stays down becomes a recorded failure)
├── Timing: waits, deadlines, timers
├── Human interactions
├── External systems
├── Information ownership and where information came from
├── Constraints
├── Invariants: rules that must always hold
├── Architectural dimensions
├── Decisions
├── Assumptions
├── Evidence
├── Open questions
├── Conditions for reopening a decision
├── Kinds of situation the system must handle
└── Scenario coverage
```

These are not necessarily separate documents.

They are the contents of one model.

What matters is that they stay **linked**.

For example, a reader must be able to follow this chain in both directions:

```text
Responsibility
      ↓
Part that owns it
      ↓
Interaction it takes part in
      ↓
Decision that justified it
      ↓
Evidence behind the decision
```

---

# 12.4 Principle: Each View Answers One Question

No single view can explain the whole architecture.

The final architecture therefore has several views.

Each view answers one question.

Each view is drawn from the same model.

| View | The question it answers | What it shows |
|---|---|---|
| Responsibility view | What must the system be responsible for? | Each responsibility: purpose, outcome, inputs, outputs, state, who may decide, what happens when it fails |
| Boundary view | What belongs together, and what does not? | Each part: what it owns, what state it owns, what it may decide, what lies outside it, what makes it change |
| Interaction view | How do the parts cooperate? | Each interaction: what starts it, who starts it, who receives it, what information crosses, what is decided, what state changes, what happens on failure, what comes back |
| Behaviour view | How does the system behave over time, in each kind of situation? | For each kind of situation: what starts it → what happens → what state changes → what is decided → what action is taken → how it is checked → the outcome → when it is looked at again. Shown as walkthroughs, sequence diagrams, and the lifecycle of a situation |
| State view | What is remembered, who writes it, and how does it change? | Each record, its owner, its allowed changes, and who may make each change |
| Constraint view | What must the architecture always preserve? | Each rule, the parts it touches, where it is enforced, and how a break would show |
| Decision view | Why was it built this way? | Each decision: the problem, the evidence, the options, the trade-off, the choice, the cost, when to reopen it |
| Traceability view | Where did each structure come from? | Source → evidence → responsibility → part → interaction → decision |
| **Build view** | **What do I build, part by part, and how do I know each part is right?** | **One overview file and one file per part (12.21–12.24)** |

Three of these deserve a short note: the state view, the behaviour view, and the build view.

**The state view** gets its own row.

It is separate because in Tend most of the hard rules are about who may write what.

For example, only one part may mark a situation as completed. A reader needs one place where all such rules are visible together.

**The behaviour view** gets a stated form.

It holds one sequence diagram for each important kind of situation.

A sequence diagram shows, in order, which part does what, and which part hands what to which.

It is the clearest way to show that the same parts handle many different storylines.

**The build view** is explained in 12.21.

The views must not compete.

If two views disagree, that is a reconciliation finding (Section 10), not a matter of preference.

---

# 12.5 Method: Define One Source of Truth

The final Level 2 architecture has one authoritative version.

Every other representation is drawn from it.

```text
The architecture model
        │
        ├── the views
        ├── the build view: overview and part files
        ├── the diagrams
        ├── the walkthroughs
        ├── the decision records
        ├── the registers
        └── the Level 3 handoff
```

This prevents a known failure:

```text
The architecture file says A.
The diagram says B.
The implementation plan assumes C.
The agent remembers D.
```

The system then has four competing architectures.

### Where the truth lives

In practice, each fact has exactly one authoritative place.

Every other place that needs it links to that place, or repeats it word for word with a link back.

For example: the rule "only the conversation manager marks a situation completed" is written once, in the state view. The conversation manager's part file and the situation worker's part file each repeat it with a link to that one place.

When the rule changes, the one place changes first.

Every repeat is then updated, and the audit (12.26) checks that none was missed.

### The architecture and its sources

The architecture is built from the knowledge base. It is not a copy of it.

Two things are easy to confuse here.

The **Level 2 folder** in the knowledge base holds the answered engineering questions, such as "when must Tend ask for approval?".

The **Level 2 architecture** is the model this method constructs from those answers and everything else.

During construction, the Level 2 folder governs. When an architecture sentence disagreed with an answer in the Level 2 folder, the folder won, and the disagreement was written down and taken to the owner.

For example: the architecture said a refund at or below the business's setting may run without a person. Two Level 2 files said money always needs a person. That was taken to the owner. The owner decided, and the Level 2 files were changed to match on 2026-10-12.

At completion (12.30), the architecture becomes the model Level 3 must follow. Level 3 builds from the architecture, not from the knowledge base directly.

Neither side silently wins after that.

If a later reading of the knowledge base disagrees with the completed architecture, that is new evidence. The disagreement is written down. The affected part of the architecture is reopened (12.31). Then one side or the other is changed on purpose.

---

# 12.6 Principle: Every Architectural Element Must Be Justifiable

The final architecture contains no major structure that exists only because it felt right.

Every major element traces to at least one of:

- a Level 1 responsibility;
- a Level 1 constraint;
- a Level 1 invariant;
- a discovered failure;
- an interaction that requires it;
- an architectural dimension: a force that tests the model, such as time passing or two things happening at once (Section 9);
- an explicit decision;
- a fact about an external system;
- a requirement of how people work;
- a product principle;
- an engineering principle;
- a validated research finding.

An element does not need exactly one source.

Most structures come from several facts meeting.

For example:

```text
Deciding the next step and sending a message are separate responsibilities
      +
the decision to speak must be made once, not twice
      +
a timer must never send a message by itself
      ↓
The part that decides the next step never sends.
```

No single source says "the worker never sends".

The rule comes from the three facts together.

---

# 12.7 Control/Gate: Architectural Traceability

A **gate** is a check that must pass before the work moves on. This section has four: traceability (here), the completion matrix (12.10), technology leakage (12.14), and the Level 3 handoff (12.28).

For every major element, it must be possible to walk both ways.

### Backward: why does this exist?

```text
Architectural element
   ↓
Decision or reasoning
   ↓
Evidence
   ↓
Source in the knowledge base
```

### Forward: what did this fact lead to?

```text
Evidence
   ↓
Architectural consequence
   ↓
Responsibility
   ↓
Part
   ↓
Interaction
   ↓
Behaviour
```

If neither walk is possible, the element goes back to construction. Either its justification is found and written down, or the element is removed.

An element may rest on several pieces of evidence.

It must not rest on none.

The build view is included in this gate.

Every statement in a part file must trace back to the model, and through it to evidence.

A part file may not introduce a rule that the model does not contain.

---

# 12.8 Principle: Level 2 Is Complete When Its Questions Are Answered, Not When Its Documents Exist

Level 2 is not complete because:

- the knowledge base has been read;
- every file has been processed;
- a final architecture document exists;
- every part has a description;
- the diagram looks complete;
- all research has been summarised.

Those are document conditions.

They are not architecture conditions.

Level 2 is complete when the important logical questions have been answered well enough.

The central Level 2 question is short:

> **How should the system's responsibilities be organised so that it behaves correctly?**

"Behaves correctly" has to hold in every one of these conditions:

- it does what it is responsible for;
- it keeps its constraints, such as never letting one business see another business's data;
- its parts cooperate, such as the worker deciding and the communication layer sending;
- it handles failure, such as a payment provider that does not answer;
- the right person decides, such as a named person approving a large refund;
- it handles time, such as a follow-up that must not fire after the customer already replied;
- it survives expected change, such as a messaging platform changing its rules.

The architecture is judged against the questions raised during construction.

---

# 12.9 Method: Close the Level 2 Question Backlog

Level 1 produces the first list of Level 2 questions.

More questions appear during construction.

Every question in the final list gets exactly one of these labels:

| Label | Meaning |
|---|---|
| Resolved | The architecture contains a justified answer |
| Deferred to Level 3 | The logical answer is known; the technical way to realise it is open |
| Deferred to implementation | The logical and technical answers are known; a detail is left to whoever writes the code |
| Deferred to configuration | The structure is known; the value is set per business or per market |
| Non-blocking unknown | The architecture holds whatever the answer turns out to be |
| Rejected | The question no longer applies, and the reason is recorded |
| Blocking | Level 2 cannot be completed until it is answered |

The list must include the questions Level 1 asks about the architecture itself.

For example: where state lives, what must be durable, what is started by events and what is started by requests, and where decisions are made.

These are easy to miss, because they may have no category folder of their own.

A question is **deferred to Level 3** when the logical answer exists but the technical answer does not.

```text
Level 2 question: Does this responsibility need its own owner?
Level 2 answer:   Yes.

Level 3 question: Is it a service, a module, a worker, a library, or something else?
Level 3 answer:   Still open.
```

The reverse must never happen.

A technical choice must not silently answer an open logical question.

---

# 12.10 The Level 2 Completion Matrix

The final architecture is checked against every area of construction.

| Area | Completion question |
|---|---|
| Problem | Does the architecture still solve the Level 1 problem? |
| Responsibilities | Is every important responsibility represented? |
| Ownership | Is it clear who owns each thing? |
| Parts | Is every major part justified? |
| State | Is it clear what is remembered, who writes it, and how it changes? |
| Authority | Is it clear who decides, who acts, and who approves? |
| Information | Is it clear where information came from and who owns it? |
| Interactions | Are the important interactions represented? |
| Behaviour | Can every important kind of situation be walked through? |
| Failure | Can every important kind of failure be explained? |
| Time | Are waits, deadlines, and timers represented? |
| People | Is it clear when and how people take part? |
| External systems | Is it clear what outside systems own and how Tend works with them? |
| Constraints | Are the important constraints represented? |
| Invariants | Can the rules that must always hold actually be kept? |
| Scaling | Has relevant growth been considered? |
| Concurrency | Is it clear what happens when two things happen at once? For example, a timer and a customer's reply arrive together. |
| Security | Is it clear who may see and do what? |
| Observability | Can what happened be reconstructed afterwards? For example, why a refund went to a person, and who approved it. |
| AI behaviour | Is it clear what the AI may propose, what it may never decide, and what is checked? |
| Evolution | Is it clear which part absorbs each likely change? |
| Evidence | Can each major claim be traced? |
| Decisions | Is each significant choice justified? |
| Alternatives | Were real alternatives considered? |
| Unknowns | Is every remaining unknown visible and labelled? |
| Reopening | Is it clear what would cause each decision to be reopened? |
| Level boundary | Has technology stayed out of Level 2? |
| **Build clarity** | **Can each part be built from its part file alone, without reading the construction history, and does it cover every kind of situation in the overview?** |
| **Audits** | **Has every file passed both audits (12.26)?** |

This matrix is a gate, not a score.

One blocking issue stops completion, even if every other row is strong.

---

# 12.11 Principle: The Architecture Must Be Able to Explain the System

The strongest test is not whether the architecture can be described.

It is whether the architecture can **explain what happens** in a real situation.

Take a real situation and ask:

```text
What happened?
Which part is responsible?
What information exists?
What is known, and what is unknown?
Who may decide?
What must be decided?
What state changes, and who writes it?
What interaction happens?
What can fail?
Who handles the failure?
What happens next?
When is the situation looked at again?
What record is left behind?
What happens if a person steps in?
What happens if an outside system is down?
```

If the architecture answers these without inventing anything new during the walkthrough, it represents the real logical system.

If the walkthrough keeps needing phrases like:

> "There would probably be another part here…"

then the architecture is not complete.

---

# 12.12 Method: Replay the Architecture Against Real Situations

The final architecture is replayed against a chosen set of situations.

The set must cover every kind of situation the product must handle, not just the common one.

For Tend, the set includes situations such as an outcome that stays unknown, an outside system that is down, a partial answer, a list of people contacted one by one, and an unrequested document.

The replay starts from the situation, not from the diagram.

For each situation:

```text
1.  Start the situation.
2.  Name the person or system that started it.
3.  Name the responsibility involved.
4.  Name the part that owns it.
5.  Name the information and where it came from.
6.  Name the current state.
7.  Name what is uncertain.
8.  Name who may decide.
9.  Run the interaction.
10. Apply the decision.
11. Change state where needed, by the part allowed to change it.
12. Follow the success path.
13. Follow the important failure paths.
14. Include a person stepping in, where relevant.
15. Include an outside system's behaviour, where relevant.
16. Follow what the result changes: which record is updated, and what wakes the situation next.
17. Name the final or continuing state.
18. Check that what happened can be reconstructed afterwards.
```

Each replay produces a sequence diagram.

That diagram goes into the behaviour view.

The part files point to the diagrams in which their part appears.

Any missing concept found during a replay reopens the affected construction area.

The replay is therefore a test of the architecture, not documentation.

---

# 12.13 Principle: Keep Logical and Technical Architecture Apart

The line between Level 2 and Level 3 must stay explicit.

Level 2 describes:

```text
Responsibilities
Parts and what they own
State
Who decides, who acts, who approves
Interactions
Behaviour over time
Failure
Constraints
Invariants
Timing
Forces on the architecture
```

Level 3 decides:

```text
Processes
Services
Modules
Databases
Queues
Protocols
Frameworks
Cloud infrastructure
Deployment
Storage technology
Programming languages
Runtime structure
Technical logging and tracing tools
```

One logical part can be built in many technical ways.

For example, "the part that remembers business knowledge" does not mean a database, a service, a vector index, a knowledge graph, or a repository.

Those are Level 3 choices.

Likewise, "the step that decides the next action" does not mean a Python service, a TypeScript module, a rules engine, an AI prompt, or a table.

The logical architecture must make sense whatever is chosen.

---

# 12.14 Control/Gate: Technology Leakage Test

Before Level 2 is declared complete, read every major element and ask:

> **Would this still make sense if the entire technology stack changed?**

If yes, it is probably logical.

If no, decide which of three things it is:

- it belongs in Level 3, and is moved there;
- it is a real constraint from an outside system, and is kept as that constraint;
- technology has wrongly shaped the architecture, and the element is reconstructed.

Technology may shape Level 2 only when it is an outside fact of the problem.

For example, a messaging platform may only allow a business to start a conversation with an approved template. That is a real rule of the outside world.

The architecture keeps the logical consequence of that rule: "a message the business starts must satisfy the channel's rules for starting a conversation."

It does not turn the platform into an internal part.

**Words to check.** Names like "service", "layer", "store", "queue", "registry", "schema", "cache", and fixed numbers deserve a second look. Each one either has a plain logical meaning, which is written down, or it is moved to Level 3.

The build view is included in this test.

A part file at Level 2 contains no technology choices. Level 3 adds them later, in sections of its own: the technology chosen, storage, runtime, tests, and production checks (12.22).

The part names themselves are checked too. A name like "tool layer" is only a label. Its logical meaning is written under the first heading of its part file: "the only way Tend calls an outside system".

---

# 12.15 Principle: Preserve What the System Refuses to Own

A complete architecture also says what it deliberately does **not** own.

This matters especially for Tend:

```text
Tend keeps a pointer to a record
≠
Tend owns that record

Tend notices that something is ambiguous
≠
Tend resolves it on its own

Tend interprets information
≠
Tend becomes the source of truth for it

Tend supports a decision
≠
Tend makes the business's decision

Tend coordinates an employee's work
≠
Tend owns that employee's responsibility

Tend observes an action
≠
Tend owns the business state behind it
```

These refusals are architecture.

Without them, later implementation quietly expands what Tend is responsible for.

> **What the architecture refuses to own is part of the architecture.**

---

# 12.16 Method: Record What Is Not Owned, for the System and for Each Part

The final architecture keeps a register of important non-responsibilities.

For each one:

```text
What is not owned
Why it is excluded
Who actually owns it
How Tend works with that owner
Who may say yes, and who may not (e.g. the business, not Tend, decides its refund policy)
The evidence
What future change could move the line
```

This has two levels.

**For the system:** what Tend as a whole does not own. For example, the business's policies, its strategy, and the records in its own systems.

**For each part:** what that part must never do, even though it might look convenient. For example, the part that decides the next step never sends a message. The part that sends never decides what to say.

The system list lives in the non-responsibilities register.

Each part's list lives in its part file, under "What it never does".

These lists matter most when a builder, or a coding agent, sees a convenient chance to absorb someone else's job. For example, it would be easy to let Tend keep its own copy of an order and update it. The architecture must be able to answer at that moment:

> "No. That is intentionally outside the system." (for the system list)

> "No. That is intentionally outside this part." (for a part's list)

---

# 12.17 Principle: The Architecture Keeps Its Own History

The final architecture does not erase how it was built.

It keeps links to:

```text
Evidence
Decisions
Revisions
Structures that were replaced
Options that were rejected
Assumptions
Contradictions
Construction steps
Conditions for reopening
```

The current architecture says what we believe now.

The history says how we came to believe it.

This matters when someone later asks:

> "Why is this part separate?"

The answer must not be:

> "Because that is how the diagram was drawn."

It must be something like:

> "Because these responsibilities change for different reasons, own different records, fail differently, and are allowed to decide different things. When they were together, a change to how messages are sent forced a change to how the next step is decided."

The history lives in two kinds of file:

- the section files from Sections 6–11, which keep the reasoning for each kind of question;
- the **construction record**, a dated log of what was discussed, what was corrected, and what was decided, step by step.

The final views and part files link to that history. They do not repeat it.

---

# 12.18 The Architecture as External Memory

This method exists partly because no person and no model can hold a whole architecture in mind during a long piece of reasoning.

The architecture is therefore external memory.

During construction:

```text
Knowledge base
    ↓
Evidence
    ↓
Current architecture
    ↓
New reasoning
    ↓
Updated architecture
```

During later work:

```text
Current architecture
    ↓
Find the affected part
    ↓
Reason about it
    ↓
Update the architecture if needed
```

This lets the work grow past what any single reasoning pass can hold.

The architecture becomes part of how the project thinks, not only a record of what it decided.

The part files make the second loop practical.

A builder or an agent working on one part opens one file, not the whole architecture.

---

# 12.19 Principle: Every File Has a Human Layer and an Agent Layer

The architecture has two kinds of reader:

1. people making product and architecture decisions;
2. agents that build, review, research, or extend the system.

They need different things from the same text.

A person needs plain sentences they can follow without remembering earlier conversations.

An agent needs exact codes, sources, and links it can follow mechanically.

So every architecture file has two layers.

**The human layer** is the visible text.

It follows the conversation constitution, the file `conversation with swaraj.md` at the root of the repository. Its rules that matter here:

- it can be read as if the reader has never seen any of this before;
- one sentence carries one idea;
- it uses the words people say: who decides, who acts, who answers for it;
- it grounds each rule in a concrete example, reusing the shared walkthroughs;
- it keeps facts, decisions, assumptions, open questions, and opinions visibly apart;
- it never points the reader at another file to remember something; it brings the needed piece into the text.

**The agent layer** is hidden from the rendered view.

It sits in HTML comments next to the sentence it supports, and in an agent-only index file for that file (for example, `code_index_section_6.md` does this for Section 6).

It carries:

- the rule codes;
- the source of each rule in the knowledge base;
- the status of each rule;
- links to the decisions and evidence behind it.

The two layers must say the same thing.

A rule that exists in only one layer is a defect.

The representation must also be:

- explicit;
- structured;
- precise enough that an agent can find and reason about one rule without reading everything;
- traceable;
- unambiguous;
- free of technology choices;
- retrievable one part at a time;
- coherent as a whole.

It must not depend on the reader having seen the conversations that produced it.

---

# 12.20 Principle: The Views Are Organised by Question, the Build View by Part

The architecture does not mirror the folders of the knowledge base.

The knowledge base is organised around what was learned:

```text
Knowledge base
├── Research
├── Product
├── Problem framing
├── Agent studies
├── Decisions
└── Principles
```

The architecture is organised around the system that was constructed.

It has two organising shapes, one for understanding and one for building (12.1):

```text
The views                       The build view
(organised by question)         (organised by part)

Responsibilities                Overview
Boundaries                      Part: situation record      — the saved history of one problem
Interactions                    Part: conversation manager  — takes each message, puts it on the right problem
Behaviour                       Part: situation worker      — decides the next step for one problem
State                           Part: communication layer   — checks, sends, and records each message
Constraints                     Part: tool layer            — the only way Tend calls an outside system
Decisions                       ...
Traceability
```

Both are drawn from the same model.

A reader who asks "how do refunds work across the whole system?" goes to the views.

A reader who asks "what exactly must the tool layer do?" goes to the build view.

Neither shape is a reorganisation of the knowledge base.

Both are new models constructed from it.

This is the same rule Section 2 starts from: the architecture is built by reasoning across what we know, not copied out of the documents that hold it.

---

# 12.21 The Build View

The build view answers one question:

> **What do I build, part by part, and how do I know each part is right?**

It has one overview file and one file per part.

### Why separate files

A separate file for each part means a builder opens only what they are building.

It also means a change to one part changes one file, and the audit can check exactly that file.

One large file would force a builder to search through every part to find the one they are building, and to keep the rest out of mind while doing it. That is the attention problem this method exists to avoid.

### The overview file

The overview file contains:

1. **The problem in one sentence.** The engineering problem every part exists to solve, written specifically for this product.
2. **The path every change takes.** What happens, part by part, when anything changes: a message arrives, a timer fires, an outside system reports back. This is the loop a change travels through the parts. It is not a storyline, and it is not built from the kinds of situation. The kinds of situation are run against it as tests (12.12, 12.24).
3. **One diagram of all the parts.** It shows which part hands what to which.
4. **The parts, one line each.** Each line links to that part's file.
5. **The kinds of situation the product handles.** A table with one row per kind of situation and one column per part. Each cell says what that part does in that kind of situation, or that it is not involved.
6. **Who writes what.** One table of every record and the one part allowed to write each kind of change.
7. **The build order.** Which part to build first, what each part depends on, and the first thin slice (12.23).
8. **How to read a part file.** What each heading means.

### The part files

Each part file uses the fixed headings in 12.22.

### The source of the build view

The build view introduces no new rule.

Every rule in it is already in the model, and it says where.

There is one exception: the build order (12.23). The order is new, but it is worked out only from facts already in the model, such as which part reads what another part writes. It is labelled as a recommendation.

Writing a part file sometimes shows that something is missing. For example, a heading cannot be filled because no decision says what the part does when a person never answers. When that happens:

1. The gap is written down in the gap register, with the part file and heading where it showed up.
2. The writer takes it back into construction, through the reconciliation steps of Section 10.
3. The model is changed first, and any decision it needs goes to the owner.
4. Only then is the part file written.

---

# 12.22 The Part File

Every part file uses the same headings, in the same order.

The sameness is deliberate.

A builder who has read one part file knows where to find anything in every other part file.

**Working choice:** the headings are fixed, and the language under them follows the constitution. The part files do not retell the construction history. They link to it. This choice can be revised if it turns out to hide reasoning a builder needs.

### The headings at Level 2

| # | Heading | What goes under it |
|---|---|---|
| 1 | What this part is for | One sentence, then a few plain lines |
| 2 | Why it is a separate part | Why it was not merged with a neighbour, in plain words, with a link to the boundary decision |
| 3 | What it does | Its responsibilities |
| 4 | What it never does | What this part must refuse, even when it looks convenient |
| 5 | What it owns and writes | The records it owns, the kinds of change it may write, and the lifecycle it controls |
| 6 | What it decides, and what it may not decide | Who decides, who acts, and who approves, for each decision this part touches |
| 7 | What makes it change, and what makes it grow | The kinds of change that land on this part, such as a platform changing its rules, and the kinds of growth it must absorb, such as more businesses or more situations |
| 8 | What starts it, what it reads, and what it hands on | Its triggers, its inputs, its outputs, and which part receives each output, in logical terms |
| 9 | How it works inside | Its internal steps, in order, with a small diagram |
| 10 | How it behaves in each kind of situation | One row per kind of situation from the overview, with a link to the walkthrough |
| 11 | Its key moments | The sequence diagrams in which this part plays a central role |
| 12 | When things go wrong | Each failure this part can meet, and what it does: wait, ask, hand to a person, record, or stop |
| 13 | Rules that must always hold here | Each rule, and how a break would show |
| 14 | What must be visible afterwards | What must be recorded so that what happened can be reconstructed |
| 15 | How we know it is built correctly | Acceptance criteria, as observable behaviour |
| 16 | What is still open | Open questions, assumptions, and values set per business or per market |
| 17 | Where this came from | Links to the views, the decisions, and the construction history |

### Behaviour across all situations, not one storyline

Heading 10 is what keeps the build view true to the product.

A part file that describes only the common path is incomplete.

For example, the situation worker's file must show what the worker does when:

- a customer asks a question that a tool can answer;
- the payment provider does not answer and the refund's outcome is unknown;
- the carrier is down past its time limit, so a failure is recorded;
- no system and no person can answer, so the worker records that the answer is not available. That is not a failure, and only that request stops;
- a timer fires for a wait that has already been replaced;
- a customer replies before a follow-up timer fires.

The same part handles all of these.

The file shows how.

### Acceptance criteria are behaviour, not technology

Heading 15 is what lets a part be built and finished on its own.

Each criterion is something that can be observed.

For example:

- "A timer never reaches the communication layer."
- "A refund above the business's setting never runs without a person's approval."
- "An action that cannot be undone is never repeated automatically."

Each criterion names what a failure would look like.

At Level 2, the criteria do not say how they are tested. That is Level 3.

### Level 3 extends the same file

Level 3 does not start a new document for each part.

It adds sections to the same part file:

| Added at Level 3 | What goes under it |
|---|---|
| Technical realisation | How this part is built: the chosen technology and why |
| Storage | Where its records live, and how |
| Runtime | How it runs, scales, and recovers |
| Tests | Unit, integration, and end-to-end tests for each acceptance criterion |
| Production checks | How it is checked once it is live |

The Level 2 sections stay unchanged unless Level 2 is reopened (12.31).

So one file carries a part from its logical definition to its technical design.

The level of each section is always visible.

---

# 12.23 Method: Set the Build Order and the First Thin Slice

The overview file says the order in which parts are built.

The order comes from dependencies already in the model: which part reads what another part writes.

The record that most parts depend on is built first.

For Tend, that is the situation record. The conversation manager and the situation worker write to it. The communication layer, memory, and the owner view read from it.

The overview also names the **first thin slice**.

The first thin slice is the smallest end-to-end path that does something real.

For example: a message arrives, it is attached to a situation, the worker decides a reply, the reply is sent, and every step is recorded.

The thin slice touches several parts, but only the minimum of each.

Each later slice adds one kind of situation from the overview table.

This keeps building close to the architecture.

Each slice is checked against the walkthrough of its kind of situation before the next one starts.

The build order is a Level 2 recommendation based on dependencies.

Level 3 may change it for technical reasons, and records why.

---

# 12.24 Principle: The Build View Must Respect the Product's Flexibility

A product like Tend is not one flow with exceptions.

It is a small number of parts that handle many kinds of situation.

The parts do not change shape for each situation.

They follow the same rules, and the rules produce different storylines.

For example, the rule "a timer wakes only the situation worker, and the worker re-reads the latest record before acting" produces all of these:

- the follow-up message is sent when nothing has happened;
- no follow-up is sent, because the customer already replied;
- the status-check service runs the carrier check again, because the carrier has not yet answered;
- a failure is recorded, because the wait's time limit has passed.

A build plan that described only the first storyline would lead a builder to write code that handles only the first storyline.

Therefore:

> **A part file describes the rules the part follows and shows them working in every kind of situation. It does not describe one path and call the rest exceptions.**

This is how the build view keeps the reasoning of Sections 6–11 instead of flattening it.

---

# 12.25 The Final Level 2 Architecture Package

A completed Level 2 architecture contains at least:

```text
01 — Architecture overview
02 — System boundary
03 — Responsibility model
04 — Relationships between responsibilities
05 — Boundary model: the parts
06 — Ownership model
07 — State and lifecycle model
08 — Authority model: who decides, acts, approves
09 — Interaction model
10 — Behaviour model, with sequence diagrams for each kind of situation
11 — Failure model
12 — Timing model
13 — Human interaction model
14 — External system model
15 — Information ownership and origin
16 — Architectural dimensions
17 — Constraints and invariants
18 — Architectural decisions
19 — Assumptions
20 — Open questions
21 — Non-responsibilities
22 — Scenario coverage
23 — Evidence traceability
24 — Construction and revision history
25 — Stabilization record
26 — Level 3 handoff
27 — Build view: overview file
28 — Build view: one file per part
29 — Audit record
```

These do not all need separate files.

They are the minimum coverage of the final model. All of them are needed before Level 2 is complete, but they are written in the order the work needs, not all at once.

Items 27 and 28 are separate files, for the reasons in 12.21.

Every file has its human layer and its agent layer (12.19).

The exact file layout can change as the project learns what is easiest to keep up to date.

---

# 12.26 Method: Audit Every File After It Is Written

A file is not finished when it is written.

It is finished when it has passed two independent audits.

**Independent** means the writer does not audit its own file. A separate checking agent does, with fresh context.

The writer is too close to the text to see what it assumes.

### Audit 1: the conversation constitution

The checking agent reads the new file against `conversation with swaraj.md`, at the root of the repository.

It looks for sentences where:

- the reader would need to remember something from earlier;
- the reader is pointed at another file instead of being given the needed piece;
- one sentence carries more than one idea;
- an abstract label is used with no concrete example of what it means;
- facts, decisions, assumptions, open questions, and opinions are mixed together;
- something is presented as decided when the owner has not decided it;
- the text sounds like a formal specification rather than plain explanation.

### Audit 2: the foundation

The checking agent reads the new file against the architecture folder.

The architecture folder is the foundation. It was constructed from the whole knowledge base during Sections 6–11.

The agent looks for:

- **Contradiction:** a statement that disagrees with the architecture folder;
- **Invention:** a rule or part that the architecture folder does not contain;
- **Loss:** something the architecture folder says about this subject that the new file dropped;
- **Status drift:** something open presented as decided, or something decided presented as open. For example, the number of reminders is still open in the record, but a part file says "three reminders";
- **Reopening:** something the record marks as settled being questioned again;
- **Broken traceability:** a statement with no code or source in the agent layer, or a code that points to the wrong place.

Where the architecture folder is thin or unclear, the agent checks the wider knowledge base, and says which source it used.

### What the checking agent returns

A list of findings.

Each finding quotes the sentence, gives its location, names the problem, and quotes the conflicting source with its location.

The checking agent does not rewrite the file.

### What the writer does with the findings

1. Check each finding against the source. A checking agent can be wrong.
2. Fix the findings that are real.
3. Record the findings that were rejected, and why.
4. Run the audit again if the fixes changed meaning, not only wording.
5. Record the audit result in the audit record.

### Who does what

Agents that gather and check do not write the architecture.

The writer carries the synthesis and the judgement.

The reason is the same one Section 2.4 gives: telling an agent to "synthesise" does not make it synthesise. Construction needs the accumulated model and the reasons behind it, which the writer carries. A check is different. It can be given as a narrow task with a clear test, such as "find every sentence that disagrees with this file", so it can safely be handed to another agent.

---

# 12.27 Level 3 Handoff

Level 2 exists to give Level 3 a logical architecture that is stable enough to build on.

The handoff says three things explicitly.

### What is fixed at the logical level

```text
Responsibilities
Parts and what each owns
Ownership
Who decides, who acts, who approves
What each record means
Critical interactions
Critical behaviour
What failure means
Constraints
Invariants
Architectural principles
```

### What remains open technically

```text
Technology choices
Runtime structure
Storage
Communication mechanisms
Deployment
Performance mechanisms
Infrastructure
Implementation patterns
```

### What must not change without reopening Level 2

```text
Business responsibilities
Who may decide and approve
Critical ownership lines
Important invariants
What core records mean
What core interactions mean
The major parts
```

### Where Level 3 starts

Level 3 starts from the build view.

The overview gives the order.

Each part file gives the logical contract that Level 3 must meet.

Level 3 adds its sections to the same part files (12.22).

```text
Level 2: what the logical system is
        ↓
Level 3: how technology realises it, part by part
```

### When Level 3 finds a problem in Level 2

Level 3 may find a technical fact that exposes a weakness in Level 2.

That is legitimate. The work then moves backward:

```text
Level 3 finds a problem
      ↓
The affected Level 2 reasoning is reopened
      ↓
The architecture is revised, if the problem is real
      ↓
It is stabilized and audited again
      ↓
Level 3 continues
```

What must never happen is this:

```text
Level 2 says A.
Level 3 quietly builds B.
```

---

# 12.28 Control/Gate: Level 3 Handoff Gate

Before Level 3 begins, confirm:

| Check | What must be true |
|---|---|
| Logical completeness | The important responsibilities are represented |
| Part completeness | Every major part is justified |
| Behavioural completeness | Every important kind of situation can be walked through |
| Constraint completeness | Important constraints and invariants are explicit |
| Authority completeness | It is clear who owns each piece of information, who interprets it, who decides, who approves, who acts, and who checks the result |
| Failure completeness | Every important kind of failure has defined behaviour |
| Traceability | Every major element has its reasoning |
| Uncertainty | Every remaining unknown is labelled |
| Technology neutrality | No technical choice has silently shaped Level 2 |
| Change conditions | The conditions for reopening each decision are recorded |
| **Build clarity** | **Every part file can be built from the file alone, without reading the construction history, and covers every kind of situation in the overview** |
| **Audits** | **Every file has passed both audits, and rejected findings are recorded** |

If all hold, Level 2 may be declared complete.

---

# 12.29 What "Complete" Means

Complete does **not** mean:

> Every possible architectural question has been answered.

It means three things together:

1. **The architecture has enough justified structure to build from.**
2. **Every question still open can be answered later**, either by Level 3 or by future evidence.
3. **Answering those questions will not force anyone to redesign the parts.** For example, choosing how long a business waits before a reminder is a setting. It does not change which part sends the reminder.

That is the threshold.

Level 2 is complete when Level 3 can begin without asking:

- What responsibilities does the system actually have?
- Who owns this record?
- Who is allowed to make this decision?
- Should these responsibilities be separate?
- What happens when this interaction fails?
- Is this actually Tend's job?
- What exactly must this part do, and how do I know it works?

Those are Level 2 questions.

If Level 3 keeps running into them, Level 2 was declared complete too early.

---

# 12.30 Principle: Completion Means the Architecture Has Earned Authority

Once the handoff gate is passed, the logical architecture becomes **normative**.

Normative means later engineering must follow it, unless a deliberate architectural change is made.

The architecture has passed through:

```text
Evidence
   ↓
Hypothesis
   ↓
Construction
   ↓
Challenge
   ↓
Reconciliation
   ↓
Stabilization
   ↓
Normative architecture
```

From here on it is no longer only a description.

It is a constraint on engineering.

---

# 12.31 Architectural Change After Completion

Completion does not stop change.

When new evidence arrives:

New evidence can come from anywhere: a new research finding, a new owner decision, a messaging platform changing its rules, or a problem found during Level 3.

```text
New evidence
      ↓
Does it change the architecture?
      ↓
No  → update the evidence only
Yes → which Level 2 element does it touch?
      ↓
Reopen that reasoning
      ↓
Revise the model
      ↓
Update every view and part file that repeats the changed fact
      ↓
Audit the changed files (12.26)
      ↓
Reconcile
      ↓
Stabilize again
      ↓
New architecture version
```

The architecture changes on purpose, never by drift.

---

# 12.32 Principle: The Architecture Is a Living Contract

In plain words: the final architecture is an agreement that several people and stages depend on, and that is allowed to change on purpose.

The product's intent depends on it being kept. The technical design and the code are built from it. Future changes go through it.

It says:

> This is what we currently understand the system to be.

> These are the responsibilities it must own.

> These are the parts through which those responsibilities are organised.

> This is what each part must do, and how we will know it does it.

> These are the behaviours and rules the parts must preserve.

> These are the decisions that justify the structure.

> These are the uncertainties that remain.

> These are the conditions under which we will reconsider it.

That makes the architecture durable without pretending it is fixed forever.

---

# 12.33 Agent Completion Procedure

When an agent is asked "Is Level 2 complete?", it must not answer from impression.

It runs this procedure:

```text
1.  Load the architecture model.
2.  Load Level 1.
3.  Load the relevant evidence.
4.  Load the decisions.
5.  Load the constraints and invariants.
6.  Load the assumptions and open questions.
7.  Check that every responsibility is covered.
8.  Check that every part is justified.
9.  Check ownership and who decides.
10. Check state and lifecycle.
11. Replay the chosen situations.
12. Check success and failure behaviour.
13. Check timing behaviour.
14. Check people and outside systems.
15. Check the relevant dimensions.
16. Check where information comes from and who owns it.
17. Check the non-responsibilities, for the system and for each part.
18. Check evidence traceability.
19. Check decision traceability.
20. Check the remaining unknowns.
21. Run the technology leakage test.
22. Check the Level 2 question backlog.
23. Check the build view: every part file covers every kind of situation, and every statement traces to the model.
24. Check the audit record: every file passed both audits.
25. Name any remaining Level 2 blockers.
26. Decide whether more construction would materially change the architecture.
27. If yes: Level 2 is not complete. Name the next construction frontier.
28. If no: write the completion record.
29. Only then declare Level 2 complete.
```

The agent must never infer completion from the existence of a polished document.

---

# 12.34 The Level 2 Completion Record

The final record is explicit:

```text
LEVEL 2 COMPLETION RECORD

Architecture:              [name and version]
Purpose:                   [the logical problem the architecture represents]

Responsibilities:          [complete / outstanding]
Parts:                     [complete / outstanding]
Ownership:                 [complete / outstanding]
Authority:                 [complete / outstanding]
State:                     [complete / outstanding]
Interactions:              [complete / outstanding]
Behaviour:                 [complete / outstanding]
Failure behaviour:         [complete / outstanding]
Timing:                    [complete / outstanding]
Constraints:               [complete / outstanding]
Invariants:                [complete / outstanding]
Dimensions:                [reviewed / outstanding]
People:                    [reviewed / outstanding]
External systems:          [reviewed / outstanding]
Information ownership:     [reviewed / outstanding]
Non-responsibilities:      [recorded / outstanding]
Evidence traceability:     [complete / outstanding]
Decision traceability:     [complete / outstanding]
Build view:                [complete / outstanding]
Audits:                    [all passed / outstanding]

Remaining assumptions:     [list]
Deferred to Level 3:       [list]
Deferred to configuration: [list]
Blocking Level 2 questions:[list]
Conditions for reopening:  [list]

Status:                    COMPLETE / NOT COMPLETE
Reason:                    [why the architecture has, or has not, earned normative status]

Next level:                Level 3, technical architecture, starting from the build view
```

This record is the line between constructing the architecture and designing the technology.

---

# 12.35 The Complete Architecture Construction Method

The whole method, as one loop:

```text
                         KNOWLEDGE BASE
                              │
                              ▼
                    ┌───────────────────┐
                    │     Evidence      │
                    └─────────┬─────────┘
                              ▼
                    ┌───────────────────┐
                    │   Construction    │
                    │     question      │
                    └─────────┬─────────┘
                              ▼
                    ┌───────────────────┐
                    │ Responsibilities  │
                    └─────────┬─────────┘
                              ▼
                    ┌───────────────────┐
                    │      Parts        │
                    └─────────┬─────────┘
                              ▼
                    ┌───────────────────┐
                    │  Interactions and │
                    │     behaviour     │
                    └─────────┬─────────┘
                              ▼
                    ┌───────────────────┐
                    │    Dimensions     │
                    └─────────┬─────────┘
                              ▼
                    ┌───────────────────┐
                    │  Reconciliation   │
                    └─────────┬─────────┘
                              │
                       contradictions?
                         /          \
                       yes           no
                       │              │
                       ▼              ▼
                 Reconstruct       Stabilize
                 that area            │
                       │              │
                       └──────┬───────┘
                              ▼
                    ┌───────────────────┐
                    │  Representation:  │
                    │  views, build     │
                    │  view, registers  │
                    └─────────┬─────────┘
                              ▼
                    ┌───────────────────┐
                    │  Audit each file  │
                    └─────────┬─────────┘
                              │
                       complete?
                         /          \
                       no            yes
                       │              │
                       ▼              ▼
                 Next frontier     LEVEL 2
                                   COMPLETE
                                      │
                                      ▼
                                   LEVEL 3,
                           starting from the build view
```

This is not a pipeline.

The real architecture is a network:

```text
Responsibilities ↔ Parts
       ↕               ↕
Interactions ↔ State ↔ Authority
       ↕               ↕
Failures ↔ Constraints ↔ Dimensions
       ↕               ↕
Evidence ↔ Decisions ↔ Assumptions
```

Each arrow means "a change here can force a change there". For example, a new failure (a payment provider that never answers) forced a new rule about state (the unknown result is saved in the same version as the wait).

Any part of it can expose a problem in another.

That is why the method contains loops back to earlier sections, not only steps forward.

Writing the build view is part of this network too. A part file that cannot be written cleanly is evidence that the model has a gap.

---

# 12.36 The Twelve Sections as One Method

| Section | The question it answers |
|---|---|
| **1. Purpose and status** | What is this method, and what does it produce? |
| **2. Why architecture must be constructed** | Why can't the architecture simply be extracted from what we know? |
| **3. Inputs** | What information may shape the architecture? |
| **4. Evidence model** | How does knowledge become usable evidence without becoming structure too early? |
| **5. Incremental construction** | How do we reason about one piece while keeping the whole in view? |
| **6. Responsibilities** | What must the system own? |
| **7. Boundaries** | Which responsibilities belong together in one part? |
| **8. Interactions and behaviour** | How do the parts act together over time? |
| **9. Dimensions** | What forces try to break the model? |
| **10. Reconciliation** | What is contradictory, missing, or unsupported? |
| **11. Stabilization** | When is the model stable enough to rely on? |
| **12. Representation and completion** | How is the final model written so it can be understood, checked, and built part by part, and when is Level 2 actually complete? |

This is the complete method.

---

# 12.37 Final Principle

> **The output of architecture construction is not a list of components.**

> **It is a logical model of the system, with the reasons behind every part of it.**

> **It is written three ways: views to understand it, registers to check it, and a build view to build it one part at a time.**

> **Level 2 is complete when nobody building Level 3 has to invent or redefine what the system is.**

The architecture is **constructed**: built by reasoning across what we know, not copied out of documents, prompts, folders, or technology.

The knowledge base holds what was learned.

The evidence model (Section 4) keeps each piece of it with its source and its status.

The construction protocol (Section 5) turns it into reasoning, one question at a time.

Responsibilities say what the system must own.

Parts say how those responsibilities are organised.

Interactions say how the system behaves.

Dimensions challenge the model.

Reconciliation finds what is missing or contradictory.

Iteration lets the model change.

Stabilization decides when it can be relied on.

Representation makes it readable by the people who decide and buildable by the people who build.

And the final model keeps not only **what was decided**, but **why, on what evidence, what is still uncertain, and what would cause it to change**.

That is what lets the architecture outlive the conversations that produced it.

It becomes the model the rest of engineering builds from.

---

# 12.38 Closing the Architecture Construction Method

The whole method, in order:

1. **Construct** the logical architecture from evidence: responsibilities, then parts, then interactions and behaviour, then the forces on them.
2. **Reconcile** it against its evidence and rules, all the time, not only at the end.
3. **Revise** it whenever a contradiction or new understanding requires it.
4. **Write** it so that it can be understood, checked, and built part by part.
5. **Audit** every file after it is written.
6. **Declare** Level 2 complete only when Level 3 can start without rediscovering what the system is.

This is the line between understanding the problem and engineering the solution.

Level 1 establishes what problem exists.

Level 2 constructs what the logical system must be.

Level 3 decides how technology realises it, part by part.

Implementation turns that into software.

```text
Problem
  ↓
Understanding
  ↓
Logical architecture
  ↓
Technical architecture
  ↓
Implementation design
  ↓
Code
```

Each level earns the right to constrain the next one.

Without that, the wrong things quietly decide the product.

For example, a database that makes it easy to overwrite a record could quietly decide that Tend rewrites old versions of a situation. The architecture says a version is never rewritten. Because Level 2 came first, the database must follow that rule, not the other way round.
