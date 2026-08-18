# How do we handle information that arrives gradually?

## Where this document comes from

This document records our conversation about the seventh Gathering Information question.

The question asks what should happen when the required information does not arrive as one complete answer.

Examples include:

- a payment provider confirming that a refund was initiated but not yet settled;
- a customer answering only part of a clarification;
- an employee providing some context and needing to check the rest;
- a partner acknowledging an investigation without giving its final result;
- or a business system returning only part of a requested record.

## The initial either-or framing

The first framing was whether Tend should:

- wait until all required information arrives before responding; or
- respond with whatever information is already available.

We concluded that this is not actually an either-or decision.

Tend should make partial progress visible while continuing to gather the missing information.

## Partial progress and continued gathering happen together

When a partial claim arrives, Tend should:

1. Record the claim with its source, observation time and context.
2. Keep the remaining unknown visible.
3. Identify who or what is expected to provide the next information.
4. Explain why the situation is waiting.
5. Give the customer or other affected actor a limited, accurate response when communication is appropriate.
6. Create a follow-up or monitoring responsibility for the missing information.
7. Re-evaluate the situation when the next claim arrives.

The situation should not pretend to be complete. It should also not become useless merely because one part of the answer is still pending.

## The refund example

Suppose a customer asks whether their refund has arrived.

The payment provider confirms that the refund was initiated, but settlement is not yet known.

Tend should not tell the customer that the refund has arrived. It should also not remain silent until settlement is complete.

The customer may receive a limited response such as:

> The refund has been initiated. We are still waiting for confirmation that the payment provider has settled it. We will update you when that information arrives.

The exact wording depends on the available claim and the permitted communication channel. The important part is that the response distinguishes:

- what is known;
- what is still unknown;
- and what Tend is doing next.

The structured situation state should show that initiation is known, settlement remains unknown and a follow-up is waiting for the provider’s next state.

## Watching for the missing claim

The conversation described this as creating a watch job for the situation. At the conceptual level, this is a pending-information or monitoring responsibility.

The responsibility should say:

- which claim is expected;
- which source or actor is expected to provide it;
- what event or condition should cause the situation to be revisited;
- what should happen when the claim arrives;
- and what should happen if it does not arrive within the relevant time.

An event-based update is preferable when the source can provide one, because Tend should not repeatedly ask for information that can arrive as a meaningful event. The exact mechanism—event, notification, scheduled re-check or another implementation—belongs to Level 3.

The important Level 2 decision is that the missing claim remains an active responsibility instead of disappearing after the first partial response.

## The situation remains open

Partial information does not automatically resolve the situation.

The situation should remain visibly:

- waiting for a particular claim;
- owned by or dependent on a particular actor or source;
- connected to the customer or other affected party;
- and subject to a next event, follow-up or escalation.

If the required information eventually arrives, Gathering creates a new complete situation-model version and the decision responsibility re-evaluates what can happen next.

If it does not arrive, the waiting responsibility should not remain invisible forever. A deadline, escalation, expiry or human handoff may be needed depending on the business process.

## Communication is part of the waiting state

The customer should not be left to guess whether the business has noticed the missing information.

The limited response should acknowledge the current state and avoid promising a result that Tend cannot guarantee.

It may say that:

- the known part has been confirmed;
- another part is still being checked;
- the business is waiting for a named or described source;
- and Tend will provide another update when the required information arrives.

If an employee or partner is also involved, that actor may need a separate communication that explains the missing information or action required from them. The customer, employee and partner should not automatically receive the same message or the same internal source details.

## Communication windows and long waits

The initial reasoning suggested that Tend should notify the customer even if the information arrives after two, three or thirty days.

The underlying principle is correct: a long wait should not make Tend forget the customer or silently close the situation.

However, “notify no matter how long it takes” is too broad. Communication depends on:

- whether the business is permitted to start or continue a conversation on that channel;
- whether the customer has consented to the channel or message;
- whether the business still has a valid reason and policy basis to send the update;
- whether the information is still relevant;
- and whether the waiting responsibility has expired or escalated.

If the original reply window has expired, Tend may need to use another permitted channel, ask the customer to re-open the conversation, notify an employee instead, or wait for a customer message before continuing. The exact channel rules are part of Communication and the relevant research, not a reason to erase the pending information.

## What this question does not settle

This question does not fully settle:

- how monitoring responsibilities are implemented;
- how often a source may be checked if no event is available;
- how long each type of information may remain pending;
- when a person must take over;
- how channel-specific communication permissions are configured;
- or how duplicate and late notifications are prevented.

Those concerns connect to Coordination and Time, Human Collaboration, Communication, channel compliance and Level 3.

## Our working decision

Gradually arriving information should create partial progress, not false completeness and not total silence.

Tend records what has arrived, keeps the missing claims visible, communicates the limited current state when permitted, and maintains a bounded follow-up responsibility for the next information.

When the next claim arrives, the situation is updated through a new complete version and re-evaluated. Long waits remain visible, but notification still follows communication permissions, business policy and the validity of the waiting responsibility.

This is the current working answer for Question 7.
