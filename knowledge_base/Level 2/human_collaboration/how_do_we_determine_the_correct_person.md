# How do we determine the correct person?

## Where this question came from

The earlier Gathering work asked who owns each piece of information.

That is related, but it is not the same as deciding who should receive human work.

The actor responsible for maintaining information may be different from the person who is available, authorised or appropriate to handle the current situation.

## Our current answer

Tend should determine the correct responsibility target using the role, authority, expertise, relationship, availability, workload, urgency, information access and business rules that apply to the current work.

The target does not have to be one named person.

It may be:

- a named employee;
- a role;
- a team;
- a queue;
- an on-call schedule;
- an approval group;
- a business owner;
- a partner representative; or
- another interested party.

## Information owner and work owner are different

The information owner is responsible for maintaining or correcting a claim, record or operation.

The work owner is responsible for the next human action in the current situation.

For example, a payment provider may own the transaction record. An employee in the accounts team may own the work of investigating a refund. The business owner may hold approval authority for compensation.

These can be three different actors.

## What routing should consider

The correct target may depend on:

- the type of work;
- the actor’s role;
- required knowledge or skill;
- authority to access the information;
- authority to approve or represent the business;
- the customer or partner relationship;
- current availability and working hours;
- workload or existing responsibility;
- urgency and consequence;
- location or market;
- language or channel;
- data-sharing limits;
- and the fallback or escalation policy.

The goal is not to find the person who is merely closest to the message.

The goal is to find the actor who can safely take responsibility for this work.

## One owner does not mean one contributor

A work item may have one accountable owner and several contributors or consulted people.

If the business uses a group or queue, the group’s response rule must be explicit. One qualified person may be enough for some work. Every required person or group may need to respond for other work.

Approval systems commonly distinguish these two patterns.

## What happens when no target is obvious?

Tend should not choose a person using an unsupported guess.

It should make the unassigned responsibility visible and use the configured fallback, owner, administrator or escalation path.

An unassigned work item is itself a coordination problem.

## What this question does not settle

It does not define the complete routing algorithm.

It does not decide whether a business should use named people, roles, queues or schedules.

It does not decide who may delegate authority or change a routing rule.

## Working decision

The “correct person” question is really the “correct responsibility target” question.

Tend should route work using the current role and business context, not just the actor’s identity or the information they happen to own.

