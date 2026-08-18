# How do we prioritise which information to retrieve first?

## Where this document comes from

This document records our conversation about the fourth Gathering Information question.

Question 1 identified which information could change the next safe decision. Question 2 identified who owns the relevant information. Question 3 identified where it may live.

Question 4 asks what should happen when more than one required claim or source could be pursued.

The discussion began with the logistics example, but the reasoning applies to payments, orders, scheduling, employee knowledge, external partners and other business processes.

## The initial reasoning

We first described the possible sources for a parcel location as a hierarchy. The logistics provider’s API would usually come first, followed by a contact at the logistics provider, the business order system, an employee inside the business and previous messages or situation versions.

The reason was not only that the API was technically convenient. The logistics provider owns the delivery operation and the API is its official operational record. A business copy of the tracking status may be further away from the current delivery state.

We then added an important operational constraint:

> Involving a human is expensive. If a suitable business process, system or API can answer the question, Tend should use that before asking an employee or partner contact.

This made the ordering question about more than truth. It also includes cost, delay, operational burden and the consequence of waiting.

## The primary-source preference

The working preference is:

> Start with the source or business process responsible for the relevant operational record, when that source is available and sufficient for the decision.

For parcel tracking, this will often be the logistics provider’s current system. For a refund, it may be the payment provider’s transaction state. For a meeting, it may be the actual calendar or scheduling record. For a business policy, it may be the policy or the authorised business owner.

The source should be chosen according to the claim being gathered. There is no single source that is first for every kind of information.

The fact that a source is official does not mean its result is automatically current or complete. Before using it, Gathering still considers whether the result answers the actual question and whether it is fresh enough for the decision.

## When a human should be involved

Human involvement is not the normal first step when a responsible system can answer the question.

An employee, partner contact or business owner may become necessary when:

- the responsible system is unavailable;
- the system does not contain the required claim;
- the result is too old for the decision;
- the result is incomplete or ambiguous;
- two important sources conflict;
- the business has missed a customer commitment;
- the consequence of acting on the available result is high;
- or a person must interpret, approve or perform work that the system cannot safely perform.

The human is not selected merely because humans are closer to “truth” in every situation. A person’s report is still a claim with a source, time and scope. Human involvement is justified when the system source is insufficient or when human responsibility is required.

## What should make information retrieval a priority

The conversation did not settle a numerical formula. We did identify the factors that should influence priority.

Information should generally move earlier in the retrieval order when:

- it can unblock the next safe decision;
- one result may resolve several unknowns;
- it is time-sensitive;
- a deadline or customer promise is approaching or has already been missed;
- the consequence of being wrong is high;
- the source is authoritative for that claim;
- the source result is likely to be current;
- or retrieving it is inexpensive and does not require a person to stop other work.

Information should generally move later when:

- it cannot change the next decision;
- it is expensive or slow to obtain;
- it requires human attention but a suitable system source remains available;
- it belongs to a different situation;
- or another result will determine whether it is relevant at all.

This is a prioritisation problem, not a permanent ranking of sources.

## The logistics example and delivery commitments

Suppose a customer asks where an order is.

Tend should query the logistics provider’s current record before asking a person. If the API says the parcel is moving between cities, that may be enough to answer a simple status question.

But if the parcel has not moved for several days, the customer-facing delivery promise has been missed, or the status is too old to support the answer, the same API result may no longer be sufficient. Tend may then prioritise partner investigation or an employee’s intervention.

This does not mean the API stopped being the carrier’s official source. It means that the current claim is no longer enough for the decision now being considered.

The business promise and the carrier’s operational expectation may both matter. A parcel can be moving and still be late. In that case, the priority may shift from simply reporting the latest location to investigating the delay and deciding how to communicate it.

## The refund example

Suppose a customer asks whether a refund has arrived.

The payment provider’s transaction record should usually be checked before asking an employee. If it shows that the refund was initiated but settlement is not complete, Tend can record the partial state and keep the remaining claim pending.

If the provider record is unavailable, stale or contradictory, the next priority may be an authorised business employee or a partner investigation. If issuing another refund would have financial consequences, approval may become more important than retrieving unrelated background information.

The order is determined by the decision context, not by a universal rule such as “always ask the employee after the API.”

## The relationship to currentness

Retrieval priority and currentness affect each other but are not the same question.

Question 4 asks:

> Which information should we pursue first?

Question 6 asks:

> Is the information we found current enough for the decision?

An API result may be retrieved first and still fail the currentness check. That failure may cause a different source or a human investigation to become the next priority.

## What this question does not settle

This question does not fully settle:

- how source authority is evaluated in every domain;
- the exact freshness threshold for every type of information;
- how business-specific customer promises are configured;
- when human approval is legally or operationally required;
- or how a watch or follow-up obligation is implemented.

Those concerns connect to Trust and Evidence, Time, Human Collaboration, Decision Making and Level 3.

## Our working decision

Gathering prioritises information by considering decision impact, authority for the claim, freshness, urgency, consequence, expected information gain, cost and human burden.

The normal preference is to query the responsible business process or system before involving a person. Human involvement becomes a priority when the system is unavailable, insufficient, stale, contradictory or unable to perform the responsibility safely.

Retrieval order is context-dependent. It is not a permanent hierarchy in which one source is always more truthful than every other source.

This is the current working answer for Question 4.
