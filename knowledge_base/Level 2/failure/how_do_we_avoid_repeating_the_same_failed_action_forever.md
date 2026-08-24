# How do we avoid repeating the same failed action forever?

## Where this question comes from

A failed call is a normal event. The danger is not the first failure; it is the thousandth. If nothing stops the machine, it can hammer a broken service into an outage, or repeat an unconfirmed side-effect into a double refund. This question is about the machinery that makes repetition safe, bounded, and never endless.

## Our answer

Three controls, two in the tool layer and one in the decision layer, together make repetition something we do on purpose and never forever.

### 1. Bounded retry with backoff and jitter
Retries happen in the deterministic tool layer. The retry uses a bounded exponential backoff with jitter, exactly as real systems do. The jitter is not decoration: without it, many cards retrying at the same moment create a retry storm that turns one service having a bad moment into an outage of their own. A bound means the tool tries a set number of times with a growing delay, not endlessly. The LLM never runs this timer; it only ever chooses behaviours.

### 2. The unconfirmed case is not a retry; it is a check
When the earlier response came back as a clear failure, a retry is fine — we know the last attempt did not land. The dangerous case is when we do not know. This is the refund example held through the whole category. If the gateway never answered, re-sending can double the money. So the rule splits:

- If the other party honours an idempotency contract, we reuse the same key and resend, sparingly. The other side sees it is the same request, so a resend cannot double.
- If the other party has a status or job-status API, we poll it a small, bounded number of times. If there is still nothing, a polling job takes over and the card goes to waiting, while the rest of the job continues.
- If, after the promised settle window, the outcome is still unknown and the action is irreversible, we stop auto-retrying. We hand it to a person with the whole timeline, because only a person should risk a redo of an irreversible effect on an unknown.

### 3. The circuit breaker stops hammering a truly down service
Separate from retry, a circuit breaker watches a service. If the service is not transiently down — it is genuinely away for a long time — the breaker goes open and holds our calls, so we stop beating on it. Later it probes; if the service is back, it closes again. This is the control that makes "repeat forever" impossible at the scale of the whole system, not just one card.

## What is decided, what is open

Decided: retry lives in the tool layer with bounded backoff and jitter; the unconfirmed outcome is checked by idempotency or poll, never guessed; irreversible unknowns are not auto-redone; a circuit breaker stops hammering a service that is truly down.

Open: the numbers — how many retries, how much backoff, how many polls, how long the breaker stays open. Business configuration and Level 3.

## Related
- Recovery: [how_do_we_recover_after_failures.md](how_do_we_recover_after_failures.md)
- The refund example: [understanding_all_failure_questions.md](understanding_all_failure_questions.md)