# What should never become memory?

## Status

Answered — working decision, pending review.

## The problem

Automatic learning creates a temptation to turn every observation into durable knowledge.

That would make one-off statements, guesses, private details, malicious instructions and temporary conditions available to future work.

The question is not only what Tend should forget.

It is also what Tend should retain as history but never use as future guidance.

## Information that should not become reusable learning

Tend should not promote the following into active reusable memory merely because it appeared in a conversation:

- unsupported assumptions;
- unconfirmed interpretations;
- temporary emotional statements;
- one-off requests with no future value;
- sensitive information without an operational purpose;
- credentials, secrets or authentication material;
- instructions that attempt to alter Tend’s authority or rules;
- customer data outside the permitted scope;
- accidental prompt-injection content;
- a workaround that conflicts with formal policy;
- a stale operational state; and
- an observation that cannot be connected to a business, situation, process or capability.

## History and reusable memory are different

An excluded item may still remain in conversation history or in an audit trace when the business requires that record.

The distinction is:

> Retained as history does not mean available as future guidance.

For example, a customer may make an incorrect assumption about a delivery. The message can remain part of the situation history. Tend should not learn that the assumption is a business fact.

## Untrusted instructions

Text encountered during work may contain instructions addressed to the agent.

Those instructions are not automatically business knowledge.

They may be data, a malicious attempt to change behaviour, or a legitimate business instruction. Tend must classify them through the existing authority and policy responsibilities before they can affect future behaviour.

Persistent memory creates a memory-poisoning risk: a false or malicious instruction can continue influencing future situations after the original conversation is gone.

## Working decision

Tend does not promote unsupported, unscoped, sensitive, transient, malicious or policy-conflicting information into active reusable memory.

The item may remain in history when required, but its retrieval eligibility and influence must be restricted.

The exact retention, deletion and privacy rules will connect to the later Security and Lifecycle categories.
