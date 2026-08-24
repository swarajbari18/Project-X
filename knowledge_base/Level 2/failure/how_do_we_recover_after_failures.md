# How do we recover after failures?

## Where this question comes from

Recovery is two different things, and we split them deliberately. One was already solved in Coordination: if the system itself crashes, the durable situation record survives and the card is rebuilt and re-enters the loop with the latest known state. That is recovery of the engine. What this question owns is recovery of the failed operation itself — what the card actually does with the attempt that broke.

## Our answer

Once a failure is declared and triaged, the card picks one of these moves.

### The retry lives in the deterministic layer
The tool, not the LLM, decides retries: bounded exponential backoff with jitter. If the failure is transient (a network blip, a service that is slow but alive), the tool backs off and retries. The LLM never runs the timer; it only ever chooses tools and behaviours.

### Unknown outcome uses the other side's contract
If the failure is that we do not know whether an action landed, we do not guess:

- If the other party honours an idempotency contract, resend the same request, sparingly, with the same key. The duplicate risk is gone, because the other side sees it is the same request.
- If the other party has a status or job-status API, poll it a small, bounded number of times. If there is still no result, create a polling job. The card goes to waiting — with its subject, reason, resume trigger and visibility — and the customer is told honestly that we are waiting on the third party, while the rest of the work continues.
- If, after the promised settle window, the outcome is still unconfirmed and the action is irreversible, never auto-redo. Hand it to a person, with the whole timeline. Redoing an irreversible effect on a guess can double the effect.

### Terminal failure hands off to a person
When retry and polling are spent and the path is truly dead, the card moves the matter to a human with the accumulated chronological trail. The human sees what was attempted, against what bound, with what result, and what remains unknown. They decide, and the decision is itself recorded.

### The goal of recovery
Recovery is not "restore the old state and pretend the failure never happened." It is "take the declared failure, and from the latest true state, reach the next safe step." The record of the failure is always kept alongside the new step.

## What is decided, what is open

Decided: the four-part recovery menu, the tool-layer retry, the idempotency-or-poll fallback, no auto-redo of irreversible unknowns, and handoff to a person with the trail.

Open: the numbers — retry counts, backoff ranges, poll counts, settle windows. Business configuration and Level 3.

## Related

- Engine-level recovery: [how_do_we_recover_interrupted_work.md](../coordination/how_do_we_recover_interrupted_work.md)
- Never repeating forever: [how_do_we_avoid_repeating_the_same_failed_action_forever.md](how_do_we_avoid_repeating_the_same_failed_action_forever.md)
- The map: [understanding_all_failure_questions.md](understanding_all_failure_questions.md)