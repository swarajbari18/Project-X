# How do we discover where information lives?

## Where this document comes from

This document records our conversation about the third Gathering Information question.

Question 2 asked who owns a piece of information. This question asks where the information can actually be found or obtained.

The distinction matters because the owner and the location may be different. A logistics company may own a delivery operation, while the information may be available through its tracking system, one of its employees, the business’s copied order record or a previous situation version.

## The initial logistics reasoning

The starting example was a customer asking where an order was in transit.

The first thought was that there should be a hierarchy of possible locations:

1. The logistics provider’s API.
2. An employee or contact at the logistics provider.
3. The business’s own order system.
4. An employee inside the business.
5. A previous message or situation version.

The exact order was not meant to be a universal rule. It was an attempt to express that information may exist in several places, and that some locations are closer to the operation than others.

The reasoning also noticed that a previous Tend message should not be treated as a free-standing answer. The previous message should point back to the claims used at that time. Gathering can then follow those references and check the claims against newer source observations or later situation-model versions.

## What “where information lives” means

Information may live in several kinds of locations:

- a business system that maintains a record;
- an external partner’s system;
- a person’s current knowledge;
- a customer’s or prospect’s experience;
- a previous conversation;
- an earlier Tend message;
- an earlier situation-model version;
- a policy, document or business rule;
- or a new observation that has not yet been incorporated into the model.

“Lives” does not mean only “where a value is stored.” It includes where the claim can be obtained, confirmed or explained.

The source may be an API, a message, an employee or a document. The owner may be a different actor. The situation model may hold a structured observation and a reference to the source without becoming the owner of that information.

## A source map is more useful than one universal hierarchy

We initially described the possible locations as a hierarchy. We then noticed that one fixed hierarchy would be too simple.

The best location depends on the claim being gathered.

For parcel location:

- The logistics provider’s system is usually the primary location for the provider’s official tracking record.
- A logistics employee may provide a direct operational update when the system is unavailable or unclear.
- The business order system may contain the tracking identifier and a copied status, but it may not contain the latest carrier state.
- An employee inside the business may know what the business has been told or may be able to contact the partner.
- A previous message or situation version may contain useful historical context, but it is not automatically current.
- The customer may know whether the parcel was received, which is a different claim from the carrier’s current tracking location.

This is a source map with relationships between locations, not simply a ranking of all information from most truthful to least truthful.

Each source has a different profile:

- what claim it can answer;
- which actor owns or maintains the underlying information;
- how close it is to the operation;
- how current its observation may be;
- how reliably it can be accessed;
- whether a human must be involved;
- and whether Tend is permitted to use or disclose it.

## Location is different from retrieval priority

Finding possible locations is Question 3.

Choosing which one to query first is Question 4.

The logistics API may be the first location Tend should query because it is connected to the carrier’s operational record, is cheaper and faster than involving a person, and is the source the carrier is responsible for publishing.

That priority decision does not mean that the API is the only place the information lives. If the API is unavailable, a partner employee, a business record or a previous source observation may still provide useful information.

Likewise, discovering that an employee knows something does not mean Tend should immediately ask the employee. Human involvement has a cost and should usually be an exception when a suitable system or business record can answer the question.

## Previous messages and situation versions

A previous Tend message is a communication record. It tells us what Tend told an actor at a particular time.

It is not automatically a current source of truth for the business fact it described.

If Tend previously told a customer that a parcel was in City A, the situation model should be able to follow that message back to:

- the claim used to produce the message;
- the source of that claim;
- the time the claim was observed;
- the source version or revision when one exists;
- and the situation-model version that contained it.

This lets Gathering decide whether the old claim is still useful, needs refreshing or conflicts with a newer observation.

The earlier message remains important because it tells us what the customer was led to believe. It should not be erased merely because a newer source state exists.

## Structured claims and locations

The conversation also clarified that Tend should not store gathered results only as natural-language sentences.

The underlying state should be represented as structured claims that can be matched, compared and followed by later Gathering work. A human-readable message can be generated later from those claims.

For example, the internal result should preserve something conceptually like:

> The logistics provider reported the location of shipment X as City A at observation time T.

The source reference is part of the claim’s context. It allows Tend to distinguish:

- a current provider observation;
- an old business-system copy;
- a customer report of non-receipt;
- a previous Tend statement;
- and a later claim that changes the situation.

This is a conceptual requirement. The exact representation belongs to later design and Level 3 work.

## What happens when a preferred location is unavailable

The preferred source may be unavailable, incomplete or too old for the current decision.

The fallback should not silently transform a weaker claim into a stronger one. If a logistics employee gives a direct update while the provider system is unavailable, Tend should record that update with its source, identity, observation time and verification state.

The customer-facing message should reflect what is actually known, for example:

> Our latest update from the delivery partner places the parcel in City B as of ten minutes ago.

If the source is confidential, the internal claim can preserve the source while the external message uses an approved general description such as “our latest records.”

When the preferred source becomes available again, its new observation may confirm, update or conflict with the fallback claim. Gathering then creates a new situation-model version rather than silently deleting the earlier observation.

## What this question does not settle

This question does not fully decide:

- the exact ranking of sources;
- how authority is evaluated when two sources disagree;
- how stale a source may be before it must be refreshed;
- which information should be retrieved first;
- how much human involvement is acceptable;
- or how access and disclosure permissions are configured.

Those questions belong partly to Questions 2, 4, 5, 6, Trust and Evidence, Human Collaboration and later implementation work.

## Our working decision

Information may live in multiple systems, conversations, people, documents and situation versions. Gathering discovers these possible locations by following the current situation model, its references and the ownership of the relevant claim.

There is no universal hierarchy in which one location is always more truthful. Each location has a different relationship to the claim: authority, freshness, operational proximity, availability, cost and access permission all matter.

Question 3 identifies where information can be obtained. Question 4 decides what to pursue first. Previous claims and messages remain traceable history, not automatic current truth.

This is the current working answer for Question 3.
