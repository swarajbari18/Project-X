# How should deadlines influence decisions?

## The short answer

A deadline is a time fact that enters the decision loop as time-context. It affects two different clocks: the response promise (we will contact the customer by T) and the resolution promise (we will finish by U). If a deadline will breach, the release policy converts the breach into behaviour: interim message, escalation, or both.

## Our answer

Deadlines are not "urgent" in the abstract. They are concrete facts:

- the response deadline — how soon the customer gets a meaningful communication;
- the resolution deadline — how soon the situation is fully resolved;
- internal milestones — escalation SLAs, check-in windows, partner deadlines.

These come from the business configuration (SLA policies) and from the situation (delivery dates, feedback windows, meeting times). The decision loop considers them exactly like any other context: enough information, allowed behaviour, safe next step. The release policy is what makes a deadline a decision:

> If the next safe step cannot complete before a deadline, send the interim message, and keep the internal clock running so escalation isn't excused.

## Response promise versus resolution promise

We adopted the Zendesk distinction. A response promise says "we will communicate something useful by T." A resolution promise says "we will fully finish by U." They can hold different values.

- The customer-facing 5-minute cutoff in Swaraj's example is a response promise. When it fires and we are still waiting, we send the interim message and the customer clock goes silent.
- The internal clock keeps going. Our own [escalation_sla.md](../../research/escalation_sla.md) research gives the pattern teams reply at ~50% SLA (warn) and escalate at 100%.

## An example

Customer: "Where is my order?" Partner investigation is open. The response deadline (by the business rule: 5 min later) fires. The release policy produces: interim message to the customer, internal wait continues with a deadline of "partner answers, or partner SLA 48h breaches → escalate to another contact."

If the partner never answers, the deadline fires, the escalation changes who the situation targets, and the loop re-runs. The deadline itself does not resolve the situation; it only changes what the next safe step is.

## Related

- [When should waiting end automatically?](when_should_waiting_end_automatically.md)
- [escalation_sla.md](../../research/escalation_sla.md)
- [how_do_we_represent_work_that_is_waiting.md](../coordination/how_do_we_represent_work_that_is_waiting.md) — release policy field.