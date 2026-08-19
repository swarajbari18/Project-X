# Conversation with Swaraj about Human Collaboration

## Why this document exists

This is a conversation record, not a formal specification.

The purpose is to preserve how we understood the category, where the first interpretation was too narrow, what research changed, and which questions are still provisional.

## Where we started

The first reading of the Human Collaboration questions placed internal business work at the centre.

That reading was not completely wrong because employees, owners and administrators are important participants in Tend’s workflows.

But it made “person” sound as if it mostly meant “employee who receives a task.”

That was too narrow for the product we are defining.

## Swaraj’s correction

Swaraj pointed out that a customer may also need to participate actively.

For example, the customer may need to acknowledge that they are asking Tend to retrieve a particular type of information before a capability is used.

The customer may also need to provide information, confirm an identity, approve a disclosure, choose between options or confirm that a situation is resolved.

Partner coordination is also not a small edge case.

The partner may have its own people, responsibilities, meetings, approvals, deadlines and escalation path.

Tend must support the journey from prospect to customer to support, but that is only one journey.

There is also a partner journey, an employee journey, an owner journey, an investor or stakeholder journey, and other inbound journeys from people who want information or analysis without intending to buy anything.

The important correction was:

> Human Collaboration concerns human participation and responsibility across every relevant business journey.

## The stakeholder correction

The existing Level 1 framing names customers, prospects, employees, owners, partners and external systems.

It does not yet make stakeholders and other interested parties equally explicit.

This is a Level 1 framing gap that should be updated later.

The Human Collaboration category must still account for these actors now because their requests can require different authority, information, disclosure and routing rules.

An investor is not handled like a customer asking where an order is.

A regulator is not handled like a prospect.

A partner representative is not handled like an internal employee.

The same person can also have different roles in different situations.

## What the research showed

### Stakeholders are broader than customers

ISO guidance for management systems treats customers as one important interested party among many. It also identifies partners, suppliers, employees, regulators, owners and investors as possible interested parties whose needs and requirements may matter.

This supports keeping “interested party” broader than “customer.”

The relevant [ISO guidance](https://www.iso.org/cms/render/live/en/sites/isoorg/home.isoDocumentsDownload.do?t=2EVmNRpfMEK8NcTL_uoAJceDlxYmmqpQWNk3r1MeLNWCXk6i10vZ-R5FEjIK-UOe) was useful here because it explicitly treats customers as important, but not the only, interested party.

### Human work is routed through roles and groups

Operational products route work to named people, teams, queues, schedules and approval groups.

Some workflows require the first qualified person to respond.

Others require every required group or person to respond.

This supports treating the correct target as a responsibility target rather than always as one individual.

Examples include [Atlassian’s escalation policies](https://support.atlassian.com/jira-service-management-cloud/docs/what-are-escalation-policies/) and [Microsoft’s group approval patterns](https://learn.microsoft.com/en-us/power-automate/group-approvals).

### Escalation is not one action

Escalation can remind the current owner, increase priority, notify a manager, add responders, reassign work, move it to another queue or change the authority level.

The escalation path depends on the work’s urgency, business hours, severity, role structure and policy.

### Acknowledgement is not completion

Operational systems commonly stop or change a notification escalation after acknowledgement, even though the underlying work may remain open.

This gives us an important distinction:

> A person seeing or accepting responsibility for work is not the same as completing the work.

[PagerDuty’s escalation policy](https://support.pagerduty.com/main/docs/escalation-policies) and [Atlassian’s notification flow](https://support.atlassian.com/jira-service-management-cloud/docs/the-alert-notification-flow/) illustrate this distinction.

### Consent is not the same as every kind of confirmation

Privacy guidance says that consent is only one possible lawful basis and should not be requested when another basis is the real reason for processing.

Therefore Tend should not casually call every conversational confirmation “consent.”

This distinction is made directly in the [ICO guidance on when consent is appropriate](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/consent/when-is-consent-appropriate/).

The product needs a broader concept of acknowledgement or authorization, with the business and applicable law determining what meaning applies in each case.

### Meetings create work

Project and stakeholder-management practices treat meetings as coordination around an outcome. They identify participants, roles, dependencies, decision authority, communication cadence, action owners and follow-up.

A partner meeting therefore creates new work items and commitments. It is not simply another message channel.

The [Atlassian project kickoff guidance](https://www.atlassian.com/team-playbook/plays/it-project-kick-off) is a useful concrete example of this pattern.

### Investors may have special disclosure rules

Investor communication can have disclosure restrictions. In the United States, Regulation FD is an example of a rule that can require careful handling of material nonpublic information and authorized representatives.

This does not become a universal Tend rule. It demonstrates why stakeholder type and information sensitivity must influence routing and communication.

The example comes from the [SEC’s Regulation FD explanation](https://www.sec.gov/files/rules/final/33-7881.htm).

## What became clear

The category is about the complete lifecycle of human participation:

```text
Need for human participation
        ↓
Kind of participation
        ↓
Role, authority and responsibility target
        ↓
Request or coordination
        ↓
Acknowledgement or acceptance
        ↓
Work, consultation, approval or meeting
        ↓
Handoff, waiting, escalation or completion
        ↓
Traceable outcome
```

The correct person is determined by the role they play in the current work, not only by their identity.

The same situation may contain multiple human work items.

The same actor may participate in several roles.

Tend must preserve the distinction between responsibility, accountability, authority, contribution, consultation and information.

## The most important boundary

Decision Making selects that human work, acknowledgement, approval, escalation or coordination is the next behaviour for Tend.

Human Collaboration manages the human responsibility created by that behaviour.

Authority determines what the actor is allowed to access, approve or perform.

Communication transports the interaction.

The business remains responsible for its policies, decisions and accountability.

## Remaining provisional questions

The category is conceptually clear enough to write.

The remaining questions are configuration and research questions:

- Which customer actions require acknowledgement?
- When is acknowledgement merely a confirmation, and when is it authorization?
- When does a business need legal consent rather than another lawful basis?
- How are responsibilities assigned to roles, groups and queues?
- Must every human work item have exactly one accountable owner?
- When does a handoff become effective?
- How are parallel approvals combined?
- What are the escalation levels and time rules for each business?
- What does a partner need before a meeting can be arranged?
- Which stakeholder requests require an authorized representative?

These should remain visible rather than being invented as universal defaults.
