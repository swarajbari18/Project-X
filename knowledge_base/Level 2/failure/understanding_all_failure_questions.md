# Understanding all the Failure questions

## Status

The conceptual model is decided. The three central decisions — *declaration*, *triage hierarchy*, and *recovery and repeat-safety* — were walked together and are recorded here and in the question documents.

The remaining items are numbers from business and Level 3 research, not conceptual gaps:
- exact retry counts and backoff ranges;
- exact poll counts before a polling job takes over;
- the settle or SLA bounds each external party actually promises;
- the check-in window and release-policy values.

## Why this category exists

Tend exists because business reality is never clean. Things arrive missing, conflicting, wrong, silent. The product's behaviour was already set: when Tend cannot decide safely, it stops, explains why, and asks for help. But what actually happens to the card when a path breaks had no home yet. That is what this category owns.

The spine of the category, in plain words:

> **Failure is an event, never a card state.** Something on which the card's current step was depending has broken — a wait that will not return, an action whose outcome we cannot confirm, a source that went away. The card itself always ends in one of our four states: running, waiting, blocked, completed. Failure is the record of "the previous step is dead," plus the move to the next safe one.

Everything else in the category is how we declare that event, how we sort it (rush versus wait), and how we recover from it without repeating the same mistake forever and without bending the safety invariants.

## One shared example we kept returning to

A delivery is stuck. The carrier's API is the only source for the update. Several things can happen, and each shows the shape.

- The carrier API still answers, just says "delivered" while the customer says "not received." That is a conflict. We keep investigating and comparing. The path is still usable. Not a failure.
- The carrier API is down, it is our only source, and nothing is moving. Now the path "read the carrier" can never deliver. That is a failure. We declare it out loud and either wait for the API, find another route, put the customer into an interim state, or escalate.
- A refund was authorised and posted, the gateway returned nothing, and we do not know whether it landed. That is the hardest case — an unknown outcome on a side-effect. We do not guess, and we do not re-issue. We watch the transaction to its promised settle window, then escalate to a person.

These three forms — a wait that will not return, a source that went away, an outcome that is unknown — cover the real failures of this product. The rest of the category is the machinery around them.

## Decision one — Declaration: when a wait becomes a failure

We already have sensors everywhere. A claim turns stale. A wait stays silent. A delivery bounces. But there was no single moment where the card stops saying "waiting, honestly" and starts acting on "this path is no longer usable."

That moment is a bound.

> Every wait carries a bound — its contract, its expected settle time, its deadline, or its check-in. As long as the wait is inside the bound, and no evidence contradicts it, waiting is honest. That is **uncertainty**. The moment the bound is reached and the wait has not fired, the system records the wait as a declared outcome — *success, terminal failure, transient failure, or unknown-outcome* — together with its evidence and its reason, into the audit. That is **failure**. The card then leaves the wait and takes its next step.

There is no hidden state and no silent state. A failure that is not in the audit does not count as handled. This is not a bookkeeping preference; it is the guarantee this product makes to the business it acts for.

## Decision two — Triage: which failures need a person now, and which can hold

When a path breaks and is declared, the system sorts it into *immediate* or *can-wait*. The sorting is not one axis. It is a fixed hierarchy, in this order:

1. **We are the responsible agent first.** Tend is taking agency for the business in this inbound moment. The starting position is that a consequence lands on a real person and a real business.
2. **Then the consequence.** If the concrete consequence of this particular action is bad, we do not do it casually, even if a severity tier says it is "manageable." This is the step where soft, contextual reasoning is often needed — a known sensitive client, an irreversible effect, a large amount of money.
3. **Then the severity tier.** The consequence is judged inside the P1–P4 idea (outage, core broken, non-core, minor) borrowed from real operations practice.
4. **Then the promise.** How close we are to breaking an outward promise or an internal deadline decides *when* the matter actually goes loud to a person. This is the two-clock tension: the customer clock stays calm, while the internal clock keeps escalating.

So "immediate versus can-wait" is not a single question. It falls out of the hierarchy above, applied in order. And because "this consequence is bad" sometimes needs soft judgement to see, the LLM is the surface that reasons about it. The LLM argues, and the deterministic system decides — it blocks or it surfaces — and both the argument and the decision land in the audit.

## Decision three — Recovery and repeat-safety

Once a wait is dead and triaged, the card moves. The moves we chose:

### The tool layer does the retry, never the LLM
Retries happen at the tool, the deterministic layer, using bounded exponential backoff with jitter. This is not tidiness; un-jittered backoff causes a retry storm — many cards hammering a struggling service and turning a blip into an outage. The retry policy is deterministic and explainable, and the LLM is not asked to run it.

### Unknown outcome uses the other side's contract
When the effect of an action cannot be confirmed — the refund was posted, the gateway never answered — we do not guess:

- If the other party **honours an idempotency contract**, we reuse the same key and resend, sparingly, with backoff. The key lets the other side see it is the same request and deduplicate, so resending is safe.
- If the other party has a **status or job-status API**, we poll it. After a small, bounded number of polls with no result, we create a polling job. The card goes to **waiting**, with its subject, reason, resume trigger and visibility. The customer is told honestly that we are waiting on the third party. The rest of the job continues.
- If, after the promised settle window, the outcome is still unconfirmed and the action is **irreversible**, we never auto-redo. We pass the question to a person, with the complete timeline. They decide, because re-running an irreversible effect on a guess can double it.

This was the exact example from the conversation: **we do not know whether the refund landed.** You pressed it: if the first response had come back, we would know whether it was a success or a failure. The open question is only the unconfirmed case. And the answer is a fallback coded into the tool, not a guess by the model.

### The circuit breaker stops indefinite repetition
A service that is non-transiently down must stop being hammered. A circuit breaker trips, holds calls, and probes again later. This is the direct answer to "how do we avoid repeating the same failed action forever."

### The safety floor stays intact while all of this moves
- The response promise is kept with an interim message; the internal clock keeps escalating.
- No one guesses.
- No irreversible action runs on an unconfirmed fact.
- Where no safe path exists, we rest at a safe-hold with a visible reason and a deadline.

## The questions and where their decisions live

- [How do we recognise failure?](how_do_we_recognise_failure.md) — the declaration and the bound.
- [How do we distinguish failure from uncertainty?](how_do_we_distinguish_failure_from_uncertainty.md) — the bound as the line.
- [How do we recover after failures?](how_do_we_recover_after_failures.md) — the recovery menu.
- [Which failures require immediate attention?](which_failures_require_immediate_attention.md) — triage, part one.
- [Which failures can safely wait?](which_failures_can_safely_wait.md) — triage, part two.
- [How do we continue working when only part of the system is unavailable?](how_do_we_continue_working_when_only_part_of_the_system_is_unavailable.md) — degraded but honest.
- [How do we avoid repeating the same failed action forever?](how_do_we_avoid_repeating_the_same_failed_action_forever.md) — retry, idempotency, circuit breaker.
- [How do we keep the business safe while recovering?](how_do_we_keep_the_business_safe_while_recovering.md) — the safety floor.

## What this category does not own

- It does not perform the conversational or reasoning decisions of each capability (that is Decision Making).
- It does not route work to a person (that is Human Collaboration).
- It does not decide what the business should want (that is the business).
- It does not choose the technology that stores the audit (that is Level 3).
- It does not decompose a customer's long path across situations (that is Journey and Lifecycle).

## Research that informed the decisions

We grounded the recovery and repeat-safety in published patterns rather than inventing them:

- **Stripe idempotency** — a key that lets a client resend a timed-out request so the server deduplicates. This is the accepted answer to "did it land, and can I safely retry." It requires the other side to cooperate; it cannot be done alone.
- **AWS exponential backoff and jitter** — why naive retries are dangerous, and why jittered bounded retries remove most of the risk.
- **Microsoft circuit breaker** — the pattern for "stop calling a service that is genuinely down, then probe later," which is the direct answer to the never-repeat-forever question.
- **Microsoft partial failure** — that distributed systems treat "some of the chain is unavailable" as normal and degrade gracefully rather than drop everything.

These are evidence, not decisions. The decisions stayed with us; the research only made the trade-offs concrete.

## Related

- The conversation record: [failure_conversation_and_discoveries.md](failure_conversation_and_discoveries.md)
- The wait spine this assumes: [how_do_we_represent_work_that_is_waiting.md](../coordination/how_do_we_represent_work_that_is_waiting.md)
- Recovery at the system level: [how_do_we_recover_interrupted_work.md](../coordination/how_do_we_recover_interrupted_work.md)