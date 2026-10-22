# When should Tend communicate?
## Ruling added 2026-09-04 — who expresses, and how (Fork B)

This document already holds the two load-bearing statements: "The boundary is not inbound versus outbound" and "The conversation manager decides whether an update is worth telling the person; Communication determines what useful interaction that intent requires and expresses it."

The situation-worker loop raised a fork: does the worker ever communicate directly? Swaraj ruled it: never — always through the communication layer. His description of the mechanism:

- The worker only updates the situation model. That update is the trigger. The communication manager (multi-threaded) reacts to it, reads the change, and communicates the update to the right person or system. Like a Kanban ticket: the worker updates the ticket with its work (done / waiting / etc.); the communication manager is watching the ticket, gets the notification that the issue changed, reads it, and tells the human.
- **Inbound recording is internal; it is not a customer-facing “message received” email.** When a message arrives, Tend records it, routes it, and creates or attaches a situation on the situation model. That is acknowledgement **for the business using Tend** — active situation, linked identity, asks captured. It does **not** by default send the external party a receipt-only reply (“we got your message”). Channel-native signals (for example a read tick on chat) are not Tend-authored communication. Outbound uses the same communication layer when a situation-model commit carries express intent — there is no second sending path.
- Tools that need a specific confirmation (a yes/no approval button, Cursor-style) use the law: the tool — the deterministic side, not the agent loop — runs the pre-configured confirmation flow through the communication layer to the right approver, and only then completes. **Approval is not a separate tool the LLM invokes for its own sake** — see ruling 2026-09-25 in this file and [`../../architecture/section_8_interaction_model.md`](../../architecture/section_8_interaction_model.md) §8.12.4.

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

**Receipt-only or empty acknowledgement to an external party is out of scope by default.** When Tend replies to a customer, investor, or other external interactor, the reply should carry **content or an honest commitment tied to the situation** — not filler that only confirms delivery of their inbound message. Email in particular: responding within a reasonable window with substance is normal; an instant “message received” often adds noise.

**Communicate the situation, not the worker’s tool trace.** Each interactor who should see progress is updated when the **situation** (the operational storyline on the situation model) changes in a way that matters to them — partial answers, material waits, corrections, attachments. They do **not** receive logs of which tools ran (“used tool A, used tool B”). Internal employees may see work items and operational detail; external parties receive situation-level expression appropriate to their role and channel.

Communication should be deferred when it would be unsupported, duplicative, unnecessary, misleading, outside the recipient's responsibility, or outside the business's authority.

## Communication that starts a situation

Communication may be the first behaviour in a situation, not only a response to an existing conversation.

For example, an owner may give Tend a list of people and ask it to introduce a product. Tend creates an individual situation for each person, checks the business's purpose, source, knowledge, authority and communication rules, and then communicates when the interaction is permitted and useful.

The same pattern applies to a delivery-delay update, a feedback request after a completed purchase, a reminder about a scheduled meeting or an employee handoff.

The boundary is not inbound versus outbound. The boundary is whether the business has supplied a clear purpose and target and whether the communication is supported by current information, authority, privacy and channel rules. Unrelated, unbounded or prohibited communication remains outside Tend's permitted behaviour.

## Boundary with Decision Making

The conversation manager decides whether an update is worth telling the person. Decision Making selects Tend's next behaviour; it does not decide whether to tell.

Communication determines what useful interaction that intent requires and expresses it to the appropriate actor.

## Working decision

Tend communicates when a permitted, useful and explainable interaction can safely move the situation forward. A user prompt may start the situation, but a later event may trigger the communication without a new prompt.

## Ruling added 2026-09-25 — situation-delta egress (investor diligence and all external interactors)

Swaraj ruled in architecture construction (U3):

1. **First inbound on a new situation:** record on the situation model; **no** default outbound receipt to the external party.
2. **While the situation worker is running with no new situation-model commit:** no new external line from that pass (no tool-trace spam).
3. **When the worker commits a material situation change:** the communication layer expresses that **delta** to each interactor who must see it — for example deck attached while revenue is still in progress; honest wait on internal approval or finance; regather after denial. Wording and timing follow what the commit records; the LLM does not bypass harness or tool gates.
4. **Partial fulfilment is allowed:** if the commit records a cleared deck ask and revenue still open, the investor may receive the deck and a situation-true line on revenue without waiting for every ask to close.

This is the same Fork B pattern as the 2026-09-04 ruling: the worker updates the story; the communication layer reads the committed version and expresses permitted intent. It is not a generic chat agent surfacing internal execution.

## What this question does not settle

It does not define channel rules, transport, technical delivery, market-specific timing, or business-specific communication policy.
