# Failure — conversation and discoveries

## The start

When we opened this category, the honest state was this: the Level 1 framing already contained the failure world we expect daily. Missing information. Conflicting information. Incorrect information. Unavailable actors. Auth failures. Business-rule violations. Undeliverable messages. Business inaction. And situations the business has never seen before.

The product vision already gave us the safety posture for all of it:

- Tend never guesses.
- The business stays accountable.
- Every important action is explainable and traceable.
- When Tend cannot decide safely, it stops, explains why, and asks for help.
- A failure must never be hidden or treated as if it did not happen.
- Every failure ends in the same question: "what is the safest correct next step?"

So failure is not an exotic technical corner. It is the daily material of the product. The whole question of the category is: when an impossible state arrives, when do we call it a failure, and what do we do with the card that was waiting on it?

**Note on how this folder is written.** These are conversation records, not specifications. They preserve the walkthrough, including the moments I was corrected.

## Where we started

We reconstructed the status quo first. What the previous categories had already decided, and which we were told to reuse rather than re-derive:

- **One card, one situation.** A situation is one durable, versioned operational record living in one of four states: running, waiting, blocked, completed. Waiting is an honest, named state with a reason and a resume trigger. Waiting is not failure. Blocked is the closest we had: every escalation path spent, no safe next step, must surface. Completed is permanent closure; a wrongful closure is reopened only with a reason.
- **Interrupted work recovers by re-entry.** If the system itself crashes, the record survives; on restart the open situation is rebuilt and dropped back into the loop with the **latest known state**. That is recovery at the system level. What to do about the failed operation itself was deferred to Failure.
- **Claims keep their evidence.** Everything arrives as a claim with provenance — who said it, when, owner, source authority, and whether it is known, uncertain, provisional, stale or conflicting.
- **Conflict does not stop everything.** A stop applies to the endangered action, not the whole situation. After a stop, one of a set of moves: wait, ask for more info, ask for a correction, create a human review, require approval, start an investigation, send a bounded reply, or pause safely with a visible reason and deadline.
- **Silence is a failure state.** "Nobody responds" was dissected: not delivered / delivered but unacknowledged / acknowledged but no progress / rejected / person unavailable / work done but not recorded / work became unnecessary.
- **The two clocks.** Every wait has a customer clock (the response promise, satisfied temporarily by an interim message) and an internal clock (the resolution promise, still escalating). The situation-level check-in makes forgotten work impossible.
- **The hierarchy of truth.** Ask the most authoritative source first; fall back only when it fails, and mark what you found as degraded.
- **Tend remembers its own failures** — wrong tool, missing field, wrong message — as warnings for next time.
- **The SLA research** — the L1-to-L3 ladder, warnings near the line, escalation at the line, and what travels with an escalation.

## The three places the reasoning actually moved

When I first summarised this category, I made a mistake that this conversation corrected. Once by you, firmly.

**The "silent reboot" was never an option, and it is gone.** I offered it as a serious alternative when we were deciding how a wait becomes a declared failure. That was wrong of me. It is not a real choice. Our own vision already says every important action is traceable and explainable, and that a failure must not be hidden. A system that silently drops a failure cannot be audited, cannot be debugged, and cannot pass the compliance and security category this project will eventually face. So the decision is not "do we want bookkeeping on or off." The answer is: we want it all, every step, every framework step, and every optional step besides. That is what makes this a responsible system, and it is the load-bearing reason forever.

So, recorded plainly: **failure is recorded, explained, traced, with evidence, and lives in the audit. Always. There is no silent state for a failure.**

**The difference between "uncertainty" and "failure" needed plain words.** I had buried it in abstraction at first and you called it out. Said plainly: uncertainty is when the current path is still sound, so waiting, a question or investigating further is honest. Failure is when the current path is no longer sound, so continuing to wait would be pretending. Most of the Level 1 "failure classes" are not failures in the strict sense. Conflict is weather; we keep comparing and investigating. Staleness is a reason to refresh. Those do not loosen a card. A failure is the moment the intended path stops being usable and the card must pick a different course. The same facts can sit on either side of the line, depending on the bound the card carries: a carrier is silent for twelve hours, we wait; silent past its promise-limit, it is a failure.

**The "did it actually land" case was the hardest and worth the whole conversation.** A refund is authorised and posted. The gateway accepts, returns nothing, the response never comes. We do not guess. We watch the transaction until a confirmation arrives or the third party's promised settle time is spent. That watch is a wait: it has a subject (the transaction), a reason (outcome unknown), a resume trigger (confirmation or time-spent), a release policy, and an escalation. So the card sits in waiting, not failed. We do not prematurely re-issue. This is squarely the "avoid repeating forever" question because harmful repetition is born exactly where we do not know whether the first try landed.

## The three decided

The conversation drove to three decisions, each decided out loud together. They are preserved in full in the map document, and each is touched again in the question that needs it.

1. **Declaration.** A wait carries a bound. When the bound is reached and the wait has not resolved, the system records the wait as a declared outcome — success, terminal failure, transient failure, or unknown-outcome — with its evidence and its reason, into the audit. No silent state.
2. **Triage.** When a path is dead and the failure is declared, the system judges in a fixed order. First, *we are the responsible agent* taking agency for the business in this inbound moment; this is the starting position, and a consequence lands on a real person and a real business. Then, *consequence* — even if the severity tier says it is tolerable, if the concrete consequence is bad we do not do it casually. Then *severity tier*, the P1–P4 frame. Then *promise* — how close we are to breaking an outward promise decides when the thing goes loud. Where a bad consequence needs soft judgement to be seen, the LLM is the surface that argues it; the deterministic layer decides and blocks or surfaces; and both the reasoning and the decision are written into the evidence.
3. **Recovery and repeat-safety.** Retry is bounded exponential backoff with jitter, at the tool layer, never in the LLM. If the other party honours idempotency, reuse the same key, sparingly. If not, use their status or job-status API to poll; after a small bounded number of tries with nothing returned, create a polling job, set the card to waiting, tell the customer honestly, and keep the rest of the work moving. An irreversible outcome that stays unconfirmed is never auto-redone; it escalates to a person with the complete timeline. A circuit breaker stops hammering a service that is non-transiently down.

## What deliberately stays open

The numbers, not the concepts.

- Exact retry counts, backoff steps, jitter ranges.
- How many polls before a polling job takes over (we discussed a small bound, for example five).
- The settle or SLA bounds that each third party or partner actually promises.
- The check-in window lengths and release-policy values.

These are business configuration and Level 3 mechanics, exactly as Coordination and Time left theirs open. The conceptual spine above is decided; the knobs are not.

## Related files

- The map and shared spine: [understanding_all_failure_questions.md](understanding_all_failure_questions.md)
- The eight question documents live alongside this one, one per Level 1 Failure question.