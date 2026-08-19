# Decision Making research agenda

## Why this agenda exists

The Decision Making conversation clarified the conceptual responsibility:

> Project X selects its next behaviour. The system control layer enforces authorization, capability rules, execution and operational state. The business owns its goals, policies and accountability.

That clarity lets us separate principles from defaults.

The principles can be carried into the Level 2 documents now. The defaults should be researched later rather than invented during implementation.

## Research tracks revealed by the conversation

### Capability defaults

For each capability, what is the safest useful default behaviour when business policy is missing, unclear, contradictory or expired?

We need to distinguish low-consequence, reversible behaviour from high-consequence behaviour that should stop or involve a person.

### Waiting and timeout behaviour

For each external system, actor and capability:

- what does waiting mean;
- what event ends waiting;
- how long should Project X wait before creating human work or escalating;
- what does a timeout mean;
- and what should happen when the situation changes while waiting?

The LLM should identify what it wants to wait for. The system or capability contract should provide the timer and state handling.

### Retry, failure and escalation

We need to understand when a failed action should be retried, when it should become blocked, when human work should be created, and when escalation should change the owner or urgency.

This should include business consequences, external service limits and the risk of repeating an action that may have partially succeeded.

### Consequence and reversibility

We need a useful way to distinguish behaviours by consequence:

- What happens if Project X is wrong?
- Can the behaviour be reversed?
- Does it create a customer commitment?
- Does it cost money?
- Does it affect legal, safety or compliance obligations?
- Does it require a person even when the evidence is otherwise sufficient?

This research should inform automation and fallback defaults without becoming a universal business-outcome decision engine.

### Approval and delegation patterns

We need to learn how businesses decide:

- which capabilities require approval;
- which roles may approve;
- whether authority can be delegated;
- how approval changes with amount, consequence or exception;
- how long approval remains valid;
- and what happens when nobody responds.

### Policy contradiction and expiry

We need to understand how real businesses change policies and handle conflicting or outdated rules.

The product should not resolve policy conflicts through runtime common sense. We need evidence for useful precedence, fallback, re-approval and owner-notification patterns.

### Communication, consent and channel constraints

The next Project X behaviour may be to communicate, but the available communication behaviour depends on channel, consent, timing and market rules.

This research belongs with the existing channel and compliance material. It should inform capability defaults and policy representation.

### Business-owner configuration

We need to learn what a business owner can realistically configure and understand:

- policies;
- fallbacks;
- approval rules;
- timeouts;
- escalation;
- and explanations of why a default was used.

### Consistency measurement

We need to define how to measure whether Project X behaves consistently for equivalent situations, including:

- policy drift;
- fallback usage;
- variation in LLM proposals;
- legitimate human exceptions;
- and repeated situations with the same effective context.

## How this agenda should be used

These are research inputs, not unresolved permission for the LLM to decide freely.

Research should produce:

- explicit product defaults where appropriate;
- business configuration options where variation is necessary;
- safe-stop or human-work behaviour where no universal default is safe;
- and new Level 1 assumptions or unknowns when the research changes our problem understanding.

The relevant research should be linked back to the Decision Making documents and to the Level 1 problem framing instead of remaining as isolated findings.

