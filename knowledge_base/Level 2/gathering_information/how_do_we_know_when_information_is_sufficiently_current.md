# How do we know when information is sufficiently current?

## Where this document comes from

This document records our conversation about the sixth Gathering Information question.

Information can exist in a reliable source and still be too old for the decision Tend is considering.

The conversation used delivery tracking to make this concrete. A carrier’s API may report that a parcel is in transit. That answer may be useful if the parcel is continuing to move. It becomes less sufficient if the parcel has remained at one city for many days, especially after the business’s promised delivery date has passed.

## Currentness is not just the age of a record

The first possible interpretation was that a claim is current if it was observed recently.

We refined this because age alone is not enough.

A claim’s currentness depends on:

- when it was observed;
- how quickly the underlying situation normally changes;
- whether the relevant state has changed since observation;
- whether the source reports events continuously or only at milestones;
- whether the information is still sufficient for the current decision;
- whether an expected dwell time has been exceeded;
- and whether a customer promise, deadline or service commitment has been missed.

The same observation can be current enough for one decision and too old for another.

For example, yesterday’s dispatch confirmation may be sufficient to confirm that an order was dispatched. It may not be sufficient to answer where the order is now.

## The logistics example

Suppose the API says that a parcel is in transit.

If its location is changing from City A to City B to City C, the tracking information may be current enough to tell the customer the latest reported location.

If the parcel has been shown at City B for seven or ten days without meaningful movement, Tend cannot safely conclude that everything is fine merely because the status still says “in transit.” The record may be stale, the parcel may be delayed, the status may have a different meaning, or the carrier may need to investigate.

The business’s customer promise also matters. If the business promised delivery within ten days and the customer asks on day twelve, the fact that the parcel moved yesterday does not make the delivery on time.

Movement can show that the tracking information is being updated. It does not prove that the business has met its commitment.

In this situation, Tend may need to:

- tell the customer the latest reported state accurately;
- acknowledge that the promised time has been exceeded;
- prioritise an investigation or human action;
- and avoid pretending to know when delivery will occur if the available information does not support that claim.

## A provisional currentness rule

We did not decide a universal mathematical formula or one fixed number of days.

We did identify a useful conceptual rule:

> Information is insufficiently current when it is too old for the decision, when expected progress has stopped beyond the relevant dwell time, when the underlying state is likely to have changed, or when a deadline or commitment has been breached.

In shorthand, a gathering pass may need more information when any of these conditions is present:

- the source is stale for the decision;
- the expected progress has stopped;
- the claim’s meaning has changed;
- a promised deadline has passed;
- or another claim suggests that the current record is incomplete.

The exact thresholds depend on the business process and product. A parcel, payment, employee assignment and policy document do not become stale at the same rate.

## Source responsibility does not remove uncertainty

The carrier owns its official tracking record and is responsible for publishing and correcting it. That does not mean the record is an instantaneous guarantee of physical reality.

Likewise, a payment provider may own the transaction record while settlement is still delayed or while the customer’s account has not yet received the money.

The source’s responsibility tells Tend where to go for the latest official state and who may need to investigate a problem. It does not remove the need to check whether the state is current enough for the customer’s question or the business’s next action.

## Currentness and customer communication

When the information is current enough, Tend may give a bounded status answer:

> The latest carrier update places the parcel in City B.

When the information is current but shows that a commitment has been missed, the answer should not imply that the situation is acceptable merely because there was recent movement.

When the information is not current enough, Tend should communicate the limitation rather than fill the gap with an assumption. It may say that the latest known status has not changed and that the business is investigating.

The customer-facing message should be generated from the structured claim and its currentness state. It should not turn an old claim into a present-tense fact without qualification.

## Currentness is decision-relative

The same source state may support one action and block another.

For example:

- “The carrier last reported City B” may be enough to explain the latest known location.
- It may not be enough to promise a delivery date.
- It may not be enough to decide that no investigation is needed.
- It may not be enough to issue compensation or another corrective action.

This returns us to Question 1. Information is required when its absence, staleness or conflict could change the safe next step.

## What this question does not settle

This question does not fully settle:

- the exact freshness threshold for each business process;
- how businesses define expected dwell time;
- how customer promises and partner service agreements interact;
- which human or partner should investigate a stale state;
- or how time-based monitoring is implemented.

Those matters connect to Time, Coordination, Human Collaboration, Decision Making and later business-specific configuration.

## Our working decision

Information is sufficiently current when it still supports the decision being considered in light of its observation time, expected rate of change, source behaviour, progress, deadlines and commitments.

Currentness is not a universal time-to-live and is not guaranteed merely because the source is authoritative. A recent movement may show that a tracking record is active while the delivery is still late. A reliable record may still be too old to answer a current question.

When information is too old, stuck beyond the expected interval, contradicted or insufficient for the consequence of the decision, Gathering should make that limitation visible and prioritise the next appropriate source or investigation.

This is the current working answer for Question 6.
