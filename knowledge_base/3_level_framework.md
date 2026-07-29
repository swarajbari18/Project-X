# Three-Level System Architecture Framework

The purpose of this framework is to design systems from first principles.

The goal is not to produce an architecture diagram or choose technologies.

The goal is to understand the problem so thoroughly that the architecture becomes an inevitable consequence of the problem rather than an arbitrary design choice.

Each level answers a different class of questions.

No level should skip ahead to the concerns of the next.

Every decision made in a lower level must be justified by decisions made in the level above it.

---

# Level 1 – Problem Framing

## Purpose

Understand the business problem completely before discussing architecture.

This level should answer:

> **"What problem exists, who is involved, what responsibilities exist, and what constraints define the problem?"**

Technology is intentionally ignored.

Infrastructure is intentionally ignored.

Implementation is intentionally ignored.

This level exists purely to understand the problem domain.

---

## Sections

### 1. Business Objective

Why does the product exist?

What business problem is it trying to solve?

How will we know the product is successful?

---

### 2. Assumptions

What assumptions are currently being made about the business?

These are beliefs that influence the design but may later prove false.

Technology assumptions do not belong here.

---

### 3. Unknowns

What important questions about the business are still unanswered?

These are uncertainties in the problem itself, not uncertainties in implementation.

---

### 4. Actors

Who participates in the system?

Actors include every entity that can influence or be influenced by the product.

Actors may include:

* Customers
* Employees
* Businesses
* External Systems
* Communication Platforms
* Identity Providers
* Time
* Product Builders
* Test & Simulation Environments
* Tend itself, when acting as the coordinator

---

### 5. Responsibilities

What is each actor responsible for?

Responsibilities should be concrete.

Avoid abstract ownership statements.

If multiple actors interact, describe the interaction explicitly.

The reader should never have to infer how work flows between actors.

---

### 6. Interactions

How do actors work together?

Describe complete business interactions.

For example:

* Customer starts a conversation
* Employee reviews information
* Tend gathers information
* Business systems provide data
* Approvals are requested
* Customers receive responses

Interactions describe behaviour, not implementation.

---

### 7. System Boundaries

Where does Tend begin?

Where does Tend end?

What belongs inside the product?

What remains the responsibility of external actors?

This protects the product from uncontrolled scope expansion.

---

### 8. Product Invariants

What rules can never be broken?

Examples include:

* Never guess.
* Explain important decisions.
* Business remains accountable.
* Tend coordinates rather than replaces business systems.
* Information ownership remains with the appropriate source.

These invariants should remain true regardless of future architectural changes.

---

### 9. Failure Classes

What kinds of business failures must always be expected?

Examples include:

* Missing information
* Conflicting information
* Incorrect information
* Unavailable actors
* Communication failures
* Business rule violations
* Authentication failures
* Unexpected situations

These are business failures—not technology failures.

---

### 10. Scaling Dimensions

How can the business grow independently?

Growth is not measured in servers.

Growth is measured in business complexity.

Examples include:

* More customers
* More employees
* More conversations
* More business systems
* More communication channels
* More locations
* More knowledge
* More integrations

These dimensions reveal where future architectural boundaries may naturally emerge.

---

### 11. Out of Scope

What problems does Tend intentionally not solve?

This section protects the product's purpose.

Every future feature proposal should first answer:

> "Does this belong within the problem Tend exists to solve?"

---

### 12. Engineering Questions (Level 2 Backlog)

What important design questions remain unanswered?

These are not implementation questions.

They are architectural questions that must be answered before any architecture can be designed.

Examples include:

* How do we determine enough information exists?
* How do we represent business policy?
* When should humans be involved?
* How should knowledge evolve?
* How do independent actors coordinate?
* How do we represent trust?
* How do we explain decisions?
* How do we recover from uncertainty?

This section becomes the agenda for Level 2.

---

# Output of Level 1

At the end of Level 1 we should understand:

* The business problem.
* The actors.
* Their responsibilities.
* Their interactions.
* The system boundaries.
* The rules that can never be broken.
* The expected failures.
* The ways the business can grow.
* The open design questions.

If we cannot clearly explain the problem without mentioning technology, Level 1 is incomplete.

---

# Level 2 – System Design

## Purpose

Transform the business problem into a logical architecture.

This level should answer:

> **"What responsibilities naturally belong together, and how should the system be organised?"**

Technology is still intentionally ignored.

The output is a logical architecture rather than a technical one.

Every subsystem should exist because it solves a specific responsibility discovered in Level 1.

The goal is not to invent subsystems.

The goal is to discover them.

Start with a single responsibility.

Identify the responsibilities that naturally change with it.

Group those responsibilities together.

Draw the boundary around the smallest complete problem that can be owned independently.

That boundary becomes a subsystem.

---

## Process

For every major responsibility identified during Level 1:

### 1. Define the Problem

What responsibility is this subsystem solving?

What business objective does it support?

---

### 2. Define Constraints

What limitations exist?

Business constraints.

Operational constraints.

Correctness requirements.

Performance expectations.

Regulatory requirements.

Failure expectations.

---

### 3. Explore Alternatives

What are the possible ways this responsibility could be organised?

Avoid discussing technologies.

Think purely in terms of responsibilities.

---

### 4. Evaluate Trade-offs

Every alternative introduces benefits and costs.

Evaluate:

* Simplicity
* Correctness
* Maintainability
* Scalability
* Flexibility
* Operational complexity
* Human impact

---

### 5. Make the Architectural Decision

Choose the design that best satisfies the business problem.

Explain why competing options were rejected.

---

### 6. Define Evaluation Criteria

How will we know this decision remains good as the product evolves?

What signals suggest the architecture should change?

---

### 7. Define When Not to Use This Design

Every architectural decision has limits.

Explicitly document those limits.

---

## Output of Level 2

The result is a logical system architecture.

Examples include:

* Conversation Management
* Knowledge Management
* Decision Engine
* Policy Engine
* Workflow Coordination
* Memory
* Integration Layer
* Human Collaboration
* Observability

These are responsibilities, not technologies.

---

# Level 3 – Technical Design

## Purpose

Choose the technologies that best implement the architecture defined in Level 2.

This level should answer:

> **"Given the responsibilities already defined, what technologies implement them most effectively?"**

Technology choices must never create responsibilities.

They only implement existing ones.

---

## Process

For every subsystem:

### 1. Identify Technical Requirements

Latency.

Consistency.

Availability.

Durability.

Scalability.

Security.

Cost.

Operational complexity.

---

### 2. Explore Technology Options

Possible databases.

Messaging systems.

Cloud providers.

Authentication systems.

LLM providers.

Deployment models.

Storage systems.

Monitoring tools.

Networking.

Infrastructure.

---

### 3. Evaluate Trade-offs

Evaluate technologies against the requirements established in Levels 1 and 2.

Avoid choosing technologies because they are popular.

Choose them because they best satisfy the architecture.

---

### 4. Make the Technical Decision

Explain why this technology is the best implementation.

Explain why alternatives were rejected.

---

### 5. Define Operational Considerations

Deployment.

Monitoring.

Failure recovery.

Scaling.

Security.

Maintenance.

Cost.

Migration.

---

## Output of Level 3

A complete implementation architecture.

Examples include:

* Cloud provider
* Databases
* Queues
* Event systems
* APIs
* Authentication
* Object storage
* LLM providers
* Infrastructure
* CI/CD
* Observability
* Deployment strategy

---

# Relationship Between the Levels

Every level depends on the one above it.

Business Problem

↓

Logical Responsibilities

↓

Technology

Never move upward.

Technology must never define architecture.

Architecture must never redefine the business problem.

The correct direction of influence is always:

Business → Architecture → Technology

If a decision cannot be justified by the level above it, that decision should be reconsidered.
