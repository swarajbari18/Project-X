# Which failures require immediate attention?

## Where this question comes from

Once a path is declared broken, the card has to decide whether a person is pulled in right now or whether the internal clock keeps working quietly. Pulling a person in too soon is expensive. Pulling them in too late can cost a customer, a promise, or money. This question and its sibling, "which failures can safely wait," are the two ends of the same triage decision.

## Our answer

Triage is not one axis. It is a fixed hierarchy, and the order is deliberate — each step narrows the question:

1. **We are the responsible agent first.** Tend is taking agency for the business in this situation. The starting position is that a consequence lands on a real person and a real business, so we care about consequences before we care about labels.
2. **Then the consequence.** If the concrete consequence of this particular action is bad, we do not do it casually, even if a severity tier says it is manageable. This is where reasoning matters: a known sensitive client, an irreversible effect, a large amount of money. Where this takes soft judgement to see, the LLM argues the consequence explicitly; the deterministic layer decides; and both the argument and the decision land in the audit.
3. **Then the severity tier.** The consequence is judged inside the P1–P4 idea (outage, core workflow broken, non-core, minor) borrowed from real operations practice. This gives the consequence a standard, comparable shape.
4. **Then the promise.** How close we are to breaking an outward promise or an internal deadline decides when the matter actually goes loud to a person. This is the two-clock tension: the customer clock stays calm while the internal clock escalates.

## What immediate actually means

"Immediate" does not mean "drop everything." It means the failure skips the quiet waiting lane: it surfaces now, to a person who can act, with the evidence from the declaration and the trail behind it. The move — escalate, involve the owner, re-plan the path — is chosen according to the hierarchy above, and it is recorded.

## What is decided, what is open

Decided: the hierarchy, in order: responsibility, then consequence, then severity tier, then promise. And that the LLM is the reasoning surface while the deterministic layer decides.

Open: the actual severity thresholds and the shapes of consequence classes a business configures. Business configuration and research.

## Related

- The other end of triage: [which_failures_can_safely_wait.md](which_failures_can_safely_wait.md)
- The two clocks: [how_do_we_represent_work_that_is_waiting.md](../coordination/how_do_we_represent_work_that_is_waiting.md)
- Severity practice this draws on: [escalation_sla.md](../../research/escalation_sla.md)
- The map: [understanding_all_failure_questions.md](understanding_all_failure_questions.md)
