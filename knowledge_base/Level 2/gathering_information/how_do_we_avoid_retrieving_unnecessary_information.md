# How do we avoid retrieving unnecessary information?

## Where this document comes from

This document records our conversation about the fifth Gathering Information question.

Question 1 asked which information is required before a decision. Question 5 asks for the opposite boundary:

> What should Tend deliberately leave uncollected for now?

The question initially felt difficult because it is easier to name information that might be useful than to prove that information is unnecessary.

## The initial reasoning

The first thought was:

> Anything that is not relevant will create noise. If Tend is following a business workflow, it should gather the information that belongs to that workflow. Information outside that workflow should not be there.

This was a useful starting point, but it raised another concern. If an LLM is involved in interpreting situations, how can Tend prevent it from accessing irrelevant information rather than merely hoping that it ignores it?

That concern showed that Question 5 contains both a relevance problem and an access problem. They are related, but they are not the same.

## Relevance and authorisation are different

The important correction in the conversation was:

> Necessary information can also be unauthorised at a particular point.

That means “unnecessary” and “unauthorised” cannot be treated as synonyms.

A piece of information can be:

| Relevance | Authorisation | What should happen |
| --- | --- | --- |
| Relevant | Authorised | Gather it when it is needed. |
| Relevant | Unauthorised | Keep it visible as a requirement, request permission or approval, and wait. |
| Irrelevant | Authorised | Do not gather it merely because it is available. |
| Irrelevant | Unauthorised | Do not gather it or expose it. |

The fact that information could help does not automatically permit Tend to retrieve or disclose it.

The actor who owns or maintains information is also not always the actor who can authorise access to it. The business, customer, employee or another policy authority may control different aspects of permission.

## Our current meaning of unnecessary

Information is unnecessary for the current Gathering pass when its absence, inaccuracy or delay cannot change the next decision being considered.

This is deliberately relative to the current situation and decision. The information may be useful later, or relevant to another situation, without being required now.

Information should be left uncollected when it:

- cannot change the safe next step;
- does not resolve a required claim;
- belongs to a different situation;
- adds background without affecting the decision;
- duplicates a claim that already answers the question sufficiently;
- delays a simpler and safer response;
- creates unnecessary exposure to private or confidential information;
- or would only be interesting rather than decision-relevant.

This is the practical boundary around Question 1. “Required information” must not quietly expand into “everything that might be useful someday.”

## The workflow and decision context

The business workflow gives Gathering a boundary for what the current task is trying to accomplish.

For example, a workflow for answering an order-status question may need:

- the identity of the order;
- the current delivery or fulfilment state;
- the relevant customer conversation;
- and any active delay or exception that changes the response.

It may not need:

- the customer’s unrelated past orders;
- the customer’s payment method;
- internal employee performance notes;
- unrelated financial history;
- or every message the customer has ever sent.

The precise boundary depends on the decision. Payment information may be unnecessary for a delivery-status answer but required before issuing a refund.

The workflow does not need to predict every possible future question. It needs to establish the current purpose and the information that can change the next safe step.

## The role of an LLM

An LLM may help interpret the situation and propose which claims could be relevant. It may help recognise that a customer’s request concerns delivery rather than payment, or that a new message changes the current problem.

But the LLM should not be the only barrier between a situation and all available business information.

The conceptual boundary should come from:

- the current situation model;
- the decision or workflow being considered;
- the claims already identified as required;
- the business’s permission and confidentiality rules;
- and the actor’s authority to see or use the information.

The reasoning component can work within that boundary and request specific information. The surrounding responsibility must prevent the request from turning into unrestricted access to every system, conversation or customer record.

The exact enforcement mechanism belongs to later design. At this level, the decision is that relevance and permission must be represented as separate constraints.

## Necessary but unauthorised information

A required claim may exist but be unavailable to the current actor.

For example, a decision may require a customer’s private information, but the current employee or external partner may not be permitted to see it. Tend should not silently retrieve it because it appears useful.

Instead, the model should make the state visible:

- the claim is required;
- the reason it is required is known;
- access is not currently authorised;
- the appropriate authority must be asked;
- and the next step is waiting, escalation or a safer alternative.

This prevents authorisation problems from being disguised as missing-information problems.

## Confidential sources

Source confidentiality is another reason not to equate retrieval with disclosure.

Tend may be allowed to use a confidential source internally while not showing the source identity to a customer or external partner. The source may remain attached to the structured claim, while the outgoing message uses an approved description such as “our latest records.”

The business decides what each actor may see. That decision is separate from whether the information is relevant.

## What we deliberately reject

We reject the idea that Tend should gather every unknown simply because it might become useful later.

We reject relying on an LLM to filter unrestricted information after retrieval.

We reject treating authorisation as proof that information is relevant.

We reject treating relevance as permission to access or disclose information.

We reject assuming that an information request belongs to the current situation merely because it concerns the same customer or business.

## What this question does not settle

This question does not fully settle:

- the exact permission model;
- who may authorise each type of information access;
- how workflows describe every required claim;
- how an LLM proposes information requests;
- or how legal and market-specific disclosure rules are represented.

Those matters connect to Trust and Evidence, Human Collaboration, Communication, business policy and later implementation work.

## Our working decision

Tend should deliberately leave information uncollected when it cannot change the current decision or resolve a required claim. Relevance is determined by the current situation and workflow, not by whether the information exists or could be interesting later.

Relevance and authorisation are separate. Necessary but unauthorised information remains a visible requirement and must follow an approval or permission flow. Unnecessary information is not gathered merely because it is authorised or available.

An LLM may help identify relevant claims, but it should operate within decision, workflow, confidentiality and access boundaries rather than receiving unrestricted information and being expected to filter it afterward.

This is the current working answer for Question 5.
