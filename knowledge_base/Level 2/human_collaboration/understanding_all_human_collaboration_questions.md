# Understanding all the Human Collaboration questions

## Status

The conceptual boundary is clear enough to continue.

The questions have working answers, but business-specific routing rules, approval ladders, escalation timers, legal requirements and availability rules still need to be configured or researched for particular businesses and markets.

This document is a map of the category. The individual question documents preserve the reasoning behind each question.

## Why this category exists

Tend exists to help a business move a situation towards the correct next step.

Sometimes Tend can continue automatically.

Sometimes the next safe step requires a human to provide information, acknowledge a request, approve something, make a judgement, perform work, represent the business or take responsibility.

Human Collaboration is the responsibility for making that human involvement explicit and keeping it moving.

It is not limited to employees.

A customer may need to confirm that Tend should retrieve specific information.

A prospect may want to speak to a person before buying.

An employee may need to investigate a problem.

An owner may need to approve an exception.

An external partner may need to investigate a delivery failure.

An investor, regulator or other interested party may ask for information that only an authorised representative may provide.

The common problem is not that all these actors communicate in the same way.

The common problem is that Tend must understand what role the actor is playing in the current work and what responsibility, authority or participation is required from them.

## The central question

The category asks:

> How does Tend create, route, maintain, transfer and close human responsibility around a changing situation?

The working lifecycle is:

```text
Human involvement becomes necessary
        ↓
Determine the kind of involvement
        ↓
Choose the appropriate person, role, group or partner
        ↓
Request, notify or arrange the interaction
        ↓
Record acknowledgement and responsibility
        ↓
Support work, collaboration or a meeting
        ↓
Transfer, escalate, wait or continue
        ↓
Record the result and re-evaluate the situation
```

This is a conceptual lifecycle, not a final state model.

## Human involvement has different meanings

The word “involve” is too broad if we do not separate the kinds of participation.

An actor may be involved as:

- a requester or subject of the situation;
- a source of information or lived experience;
- a person who confirms the scope of a request;
- a person who gives permission or authorisation;
- an approver;
- a person who exercises judgement or handles an exception;
- a person who performs an action;
- a person who owns the next work item;
- a consulted contributor;
- an informed stakeholder; or
- a representative who communicates on behalf of the business.

These meanings must not be collapsed into one “human involved” flag.

## Acknowledgement, consent and authorization are different

An actor may acknowledge that Tend is about to do something.

That acknowledgement may also be a business confirmation or an approval.

It is not automatically legal consent.

Whether a confirmation counts as consent depends on the purpose, jurisdiction, relationship and applicable law. Privacy guidance also warns that consent should not be requested when another lawful basis is the real reason for processing.

So the working boundary is:

- Human Collaboration records the interaction and the actor’s response.
- Business policy determines when a confirmation is required.
- Authority and permissions determine whether the actor is allowed to authorise the action.
- The applicable legal and communication rules determine whether the response is legally sufficient.

## How this relates to the earlier categories

```text
Understanding creates the situation model.
Gathering determines what information is needed and where it can be obtained.
Trust and Evidence evaluates claims and exposes unresolved conflicts.
Decision Making selects Tend’s next behaviour.
Human Collaboration manages the human responsibility created by that behaviour.
Communication transports messages and expresses the resulting decision.
Authority controls what an actor may access, approve or perform.
```

Gathering may ask an employee for information.

Human Collaboration determines who should receive that work, what responsibility they hold, what happens if they do not respond and whether the work must be transferred or escalated.

Decision Making may select “create human work.”

Human Collaboration determines the human work’s target, context, ownership and lifecycle.

Trust and Evidence may determine that a conflict should be presented to an authorised person.

Human Collaboration determines which person or group should investigate it and what they are being asked to decide or do.

Human Collaboration does not decide the business’s policy, universal truth or legal basis for processing information.

## The eight questions in plain language

### 1. When should Tend involve a person?

When information, judgement, approval, accountability, representation, customer confirmation or consequential action requires a human.

### 2. How should Tend determine the correct person?

By choosing the correct responsibility target. That may be a person, role, team, queue, schedule, approver group, owner or external partner.

### 3. How should Tend handle multiple people working on one situation?

By separating primary responsibility, accountability, contribution, consultation and information, while preventing duplicate or contradictory work.

### 4. How should Tend avoid interrupting people unnecessarily?

By considering consequence, urgency, expected value, existing information, availability, communication rules and whether work can safely wait or be combined.

### 5. How should Tend transfer work between employees?

By transferring responsibility without losing context, history, authority, deadlines, customer commitments or the identity of the previous owner.

### 6. How should Tend represent ownership of ongoing work?

By representing responsibility at the level of a human work item, not merely at the level of the customer or situation.

### 7. What should happen when nobody responds?

By following an explicit escalation path that may change priority, visibility, notification, owner, authority or external routing.

### 8. What should happen when the responsible person is unavailable?

By using known coverage, delegation, schedules, queues, fallback owners or safe waiting instead of silently leaving the work assigned to someone who cannot act.

## Working decisions

- Human Collaboration covers human participation across all important business journeys.
- “Person” may mean a customer, prospect, employee, owner, administrator, partner representative, investor, regulator or another interested party.
- The same person may play different roles in different situations.
- The current role and responsibility matter more than the person’s identity alone.
- A human work item may target a person, role, group, queue, schedule or partner.
- Acknowledgement is different from completion.
- Acknowledgement, consent, authorization and approval remain distinct meanings.
- Human Collaboration does not decide the business’s policy or legal basis.
- Human Collaboration must preserve an accountable responsibility target even when several people contribute.
- Notification is not the same as acceptance of responsibility.
- Escalation may change urgency, visibility, notification, ownership, authority or external routing.
- A situation may contain several human work items.
- When work changes ownership, the history of the earlier owner remains visible.
- If no safe human path exists, Tend waits safely, escalates, communicates the limitation or stops safely.

## Research that changed the understanding

Operational systems commonly route work to users, teams, queues and on-call schedules. They also distinguish acknowledgement from completion and support ordered escalation when a responder does not acknowledge.

Examples include [Atlassian escalation policies](https://support.atlassian.com/jira-service-management-cloud/docs/what-are-escalation-policies/), [PagerDuty escalation policies](https://support.pagerduty.com/main/docs/escalation-policies) and [Salesforce escalation actions](https://help.salesforce.com/s/articleView?id=sf.rules_escalation_actions.htm&language=en_US&type=5).

Approval systems distinguish between one person responding, everyone responding, group approval, comments, cancellation and reassignment.

This is visible in [Microsoft’s group approval guidance](https://learn.microsoft.com/en-us/power-automate/group-approvals).

Role and responsibility practices distinguish the person doing the work from the person accountable for the result, the people consulted and the people merely informed.

See [Atlassian’s roles and responsibilities guidance](https://www.atlassian.com/team-playbook/plays/roles-and-responsibilities).

Stakeholder-management practices treat contributors and interested observers differently. The information and engagement each person receives depends on their involvement and interest.

The distinction is described in [Atlassian’s project kickoff guidance](https://www.atlassian.com/team-playbook/plays/it-project-kick-off), while [ISO’s interested-party guidance](https://www.iso.org/cms/render/live/en/sites/isoorg/home.isoDocumentsDownload.do?t=2EVmNRpfMEK8NcTL_uoAJceDlxYmmqpQWNk3r1MeLNWCXk6i10vZ-R5FEjIK-UOe) gives examples beyond customers.

These patterns support the conceptual boundaries in this category. They do not determine Tend’s universal defaults.

## What this category does not decide

Human Collaboration does not:

- define the business’s policies;
- determine whether a source is truthful;
- decide the business outcome;
- grant access or enforce authorization;
- determine the legal basis for processing personal information;
- replace the system that owns a business record;
- perform the work that belongs to an employee or partner;
- or guarantee that a person will respond.

## Later research and configuration

The following remain business-specific or market-specific:

- which actions require customer acknowledgement;
- which confirmations are legally meaningful consent;
- which roles may approve, disclose or represent the business;
- how responsibilities are assigned to roles, teams or queues;
- how many escalation levels exist;
- how priority and urgency affect notification;
- how business hours, shifts, leave and on-call coverage work;
- what happens when a person rejects or ignores a handoff;
- what partner meetings require before they can be arranged;
- how investor, regulator and other stakeholder requests are handled;
- and what information each actor may see.

These are not reasons to delay the conceptual category. They are explicit configuration and research inputs.
