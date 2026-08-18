# How do we know which actor owns each piece of information?

## Where this document comes from

This document records our conversation about the second Gathering Information question.

The question became concrete through a logistics example. A customer had bought something from the business and wanted to know where the parcel was. We used that example to ask who owns the parcel’s location and tracking information.

The first answer was that the shipping company owns it because the shipping company is responsible for delivering the parcel and maintaining the tracking state. We then had to separate several ideas that initially sounded like one thing:

- ownership;
- source;
- truth;
- the customer’s experience;
- Tend’s operational record;
- and permission to disclose information.

Those distinctions are important because an actor can be responsible for a record without guaranteeing that the record perfectly describes reality at every moment.

## The initial reasoning

The rough reasoning was:

> We have sent the order to a logistics company. The logistics company is responsible for delivering it, tracking it, updating the tracking state and correcting the record when necessary. Therefore, the logistics company owns the tracking information.

This was not meant as a final formal definition. It was an attempt to reason aloud.

The reasoning also noticed that ownership may not belong to one individual. Inside the logistics company, different employees and systems may update, confirm or correct different parts of the delivery record. The actor that owns the information can therefore be an organisation or a system, even though many people perform the work.

The same pattern applies to other connectors. A payment provider, a communication platform or another business system may be responsible for the records and operations that belong to its own part of the business environment.

## Our current understanding of ownership

Ownership means responsibility for the underlying information, record or operation across its useful lifecycle.

That may include responsibility for:

- maintaining the record;
- updating it as the underlying operation changes;
- confirming what the actor’s system currently records;
- correcting the record when the actor discovers a mistake;
- and responding when another actor needs clarification about that information.

This does not mean that one person must perform every part of the work. An organisation, business system or external partner may own the responsibility while its employees and systems perform separate parts of it.

Ownership is also not necessarily shared merely because several actors participate. A responsibility may require cooperation while each actor still owns its own part.

For example:

- The logistics provider owns the delivery operation and its tracking record.
- The business owns the customer relationship, order and business promise to the customer.
- The customer is authoritative about their own experience, such as whether the parcel was received.
- Tend owns the coordination of the situation and the record of what Tend gathered, understood and communicated.

No one of these actors owns the entire meaning of “where is the parcel?”

## Ownership is not the same as source or truth

This was the most important correction in the conversation.

- The **source** is where a particular claim came from.
- The **owner** is responsible for the information, record or operation.
- The **claim** is what the source reports.
- The **experience** is what an actor directly observed or experienced.
- The **situation model** is Tend’s current operational understanding of the claims.
- **Truth** is not created merely by naming an owner. It remains something the available evidence may support, weaken or leave uncertain.

The logistics provider may own the tracking record. Its API may be the source of the claim that the parcel is in City A. That claim may still be stale if the parcel has moved but the latest scan has not been recorded.

Likewise, a customer may be authoritative about not receiving the parcel without being the owner of the carrier’s delivery record.

The phrase “source of truth” is therefore dangerous when used without saying what claim or domain it refers to. The carrier may be the authoritative source for its official tracking record. It is not automatically proof of the parcel’s exact physical location at every instant.

## A logistics example

Suppose the customer asks where the order is.

The business may query the logistics provider’s API. If the API reports City A, Tend should not store only the natural-language sentence “the parcel is in City A.” The operational state should preserve a structured claim with its provenance.

Conceptually, the result is closer to:

> The logistics provider’s system reported that this parcel was in City A at the observed time.

The customer-facing message may be written naturally, but the underlying claim must retain:

- the claim subject, such as the parcel or shipment;
- the reported state, such as City A;
- the source actor or system;
- the observation time;
- the source revision or event when one exists;
- and whether the claim has been checked, remains unverified or conflicts with another claim.

If the API is unavailable and an employee of the logistics provider gives a recent direct update, that employee’s report may be a higher-priority operational source than an old copy in the business’s order system. But the employee’s report is still a claim with provenance. It should not automatically be promoted to unquestionable truth merely because the employee is close to the operation.

## The business’s responsibility remains present

The logistics provider may own delivery and tracking, but the business remains responsible for its relationship with the customer and for the promises it makes.

If the carrier reports that a parcel was delivered but the customer says it was not received, there are at least two important claims:

- the carrier’s record says delivered;
- the customer reports non-receipt.

The carrier owns its delivery record. The customer owns the report of their own experience. The business owns the customer-facing responsibility to understand the conflict and decide what should happen next. Tend coordinates the information and communication; it does not silently choose which actor is correct.

## Ownership may be distributed across an actor

The owner does not have to be one employee.

An external partner may have:

- a tracking system that records scans;
- employees who investigate exceptions;
- a support team that confirms the operational state;
- and a process that corrects or replaces an incorrect record.

Those are different participants in one partner-owned operation.

Similarly, inside the business, different employees may know, maintain, approve or correct different information. The business can delegate operational responsibilities without transferring final responsibility for the business relationship or policy.

So the question is not always “Which individual owns this field?” It may be:

> Which actor is responsible for this domain information or operation, and which people or systems act on that actor’s behalf?

## Permission to see information is a separate question

We also identified that ownership does not automatically determine who may see or disclose the information.

A source may be confidential. Tend may still need to use the source internally while omitting its identity from a customer-facing message.

The business may decide that a customer should receive:

> Our latest records show that the parcel is in City A.

while the internal structured claim still records which partner system or employee supplied the information.

The owner of information, the source of information and the actor authorised to disclose information may be different actors.

This also means that necessary information can be unauthorised at a particular point. The information remains a visible requirement, but Tend must request permission from the appropriate authority or wait rather than retrieving it silently.

## How Gathering uses ownership

After Question 1 identifies a required claim, Gathering should use ownership to determine:

- who is responsible for knowing or maintaining the information;
- which actor can confirm or correct it;
- whether the source is a business system, person, partner or previous observation;
- what should happen if that actor is unavailable;
- and who is allowed to receive the result.

Ownership helps Tend decide who to approach. It does not by itself decide that the claim is current, sufficient or true for every possible decision.

## What this question does not settle

This question does not fully settle:

- how authority is compared between two conflicting sources;
- which source should be retrieved first;
- how freshness is measured;
- how access and disclosure policy is implemented;
- or when a source’s claim is sufficient for a specific business action.

Those questions connect to Trust and Evidence, retrieval priority, currentness, access control and Decision Making.

## Our working decision

An actor owns information when that actor is responsible for the underlying information, record or operation across its lifecycle: maintaining it, updating it, confirming it and correcting it when necessary.

Ownership may belong to an organisation or system and may be performed by several people. It is not the same as being the source of a claim, experiencing an event, guaranteeing reality, storing a copy or having permission to disclose the information.

Gathering uses ownership to find the responsible actor, but it preserves the source, provenance, uncertainty and access rules of each claim.

This is the current working answer for Question 2.
