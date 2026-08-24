# Which failures can safely wait?

## Where this question comes from

This is the other half of triage. Not every broken path needs a person right now. Some failures can be held: the current step is dead, but the damage is contained, the customer is not out of a promise yet, and the internal clock can keep the matter alive until either it resolves or it crosses a real deadline. Knowing which failures can wait is what keeps us from dragging people in for every blip.

## Our answer

A failure can wait when the hierarchy in the sibling question lands on a low enough urgency. In practice, that means:

- the consequence of this particular broken step is not yet bad;
- nothing irreversible or dangerous is hanging on an unconfirmed fact;
- we are not about to break an outward promise or an internal deadline; and
- the waiting lane itself is safe to the customer.

The word "wait" here is careful. It does not mean "silently park it in a corner." A waiting failure is still an open, recorded wait: it has a subject, a reason, a resume trigger, a release policy, and an escalation path. It is visible to the business with a deadline. The internal clock is running even while the customer clock is calm. So the failure is not ignored; it is simply not escalated to a person yet.

## The two working principles

- **The customer clock stays calm.** When the wait might outlive the interaction, we satisfy the response promise with an interim message, and the customer is released. That is not abandonment; it is honesty.
- **The internal clock keeps escalating.** Even while the customer is calm, the internal deadline, reminders and escalation ladder keep working. Silence in the waiting lane eventually becomes a louder event, not an excuse.

## What is decided, what is open

Decided: a failure may wait only inside a safe, recorded, escalating wait; never silently. Waiting means the path is held, not forgotten. The response promise is met with an interim message while the internal clock runs.

Open: how long the waits are, how many reminders, and where the escalation ladder steps sit. Business configuration and research.

## Related

- The other end of triage: [which_failures_require_immediate_attention.md](which_failures_require_immediate_attention.md)
- Forgotten work made impossible: [how_should_forgotten_work_be_rediscovered.md](../time/how_should_forgotten_work_be_rediscovered.md)
- The two clocks: [how_do_we_represent_work_that_is_waiting.md](../coordination/how_do_we_represent_work_that_is_waiting.md)
- The map: [understanding_all_failure_questions.md](understanding_all_failure_questions.md)