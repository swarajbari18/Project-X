# When should Tend communicate?
## Ruling added 2026-09-04 — who expresses, and how (Fork B)

This document already holds the two load-bearing statements: "The boundary is not inbound versus outbound" and "Decision Making selects 'communicate'; Communication determines what useful interaction that intent requires and expresses it."

The situation-worker loop raised a fork: does the worker ever communicate directly? Swaraj ruled it: never — always through the communication layer. His description of the mechanism:

- The worker only updates the situation model. That update is the trigger. The communication manager (multi-threaded) reacts to it, reads the change, and communicates the update to the right person or system. Like a Kanban ticket: the worker updates the ticket with its work (done / waiting / etc.); the communication manager is watching the ticket, gets the notification that the issue changed, reads it, and tells the human.
- The conversation manager's inbound-acknowledgment is requested through the same layer — there is no second sending path.
- Tools that need a specific confirmation (a yes/no approval button, Cursor-style) use the law: the tool — the deterministic side, not the agent loop — runs the pre-configured confirmation flow through the communication layer to the right approver, and only then completes.

What this means for this document: "a later event may trigger the communication without a new prompt" is now concrete — that event is a situation-model update, and the communication manager reads the situation, not a message handed to it. The ten purposes and the deferral conditions are unchanged.

## Where this question comes from

The Product Vision says communication is the visible result of understanding the situation and deciding what should happen next.

The question is not asking when Tend should send a technical message. It asks when communication creates useful and safe progress for an actor.

## Our current answer

Tend should communicate when the interaction does at least one of the following:

- answers a supported request;
- communicates a material change;
- identifies a required next step;
- requests missing information or human responsibility;
- prevents a harmful surprise;
- corrects an earlier communication;
- makes waiting or inaction visible;
- satisfies a configured business commitment;
- carries out a business instruction for a named or selected contact; or
- communicates a safe result of a decision.

Tend should not communicate merely because it can produce words.

Communication should be deferred when it would be unsupported, duplicative, unnecessary, misleading, outside the recipient's responsibility, or outside the business's authority.

## Communication that starts a situation

Communication may be the first behaviour in a situation, not only a response to an existing conversation.

For example, an owner may give Tend a list of people and ask it to introduce a product. Tend creates an individual situation for each person, checks the business's purpose, source, knowledge, authority and communication rules, and then communicates when the interaction is permitted and useful.

The same pattern applies to a delivery-delay update, a feedback request after a completed purchase, a reminder about a scheduled meeting or an employee handoff.

The boundary is not inbound versus outbound. The boundary is whether the business has supplied a clear purpose and target and whether the communication is supported by current information, authority, privacy and channel rules. Unrelated, unbounded or prohibited communication remains outside Tend's permitted behaviour.

## Boundary with Decision Making

Decision Making selects “communicate” as Tend's next behaviour.

Communication determines what useful interaction that intent requires and expresses it to the appropriate actor.

## Working decision

Tend communicates when a permitted, useful and explainable interaction can safely move the situation forward. A user prompt may start the situation, but a later event may trigger the communication without a new prompt.

## What this question does not settle

It does not define channel rules, transport, technical delivery, market-specific timing, or business-specific communication policy.
