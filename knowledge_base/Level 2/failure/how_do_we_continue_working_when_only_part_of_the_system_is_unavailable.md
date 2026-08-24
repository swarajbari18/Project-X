# How do we continue working when only part of the system is unavailable?

## Where this question comes from

Two product rules look as if they pull in opposite directions. Tend should fail safely — stop, explain, ask for help. And Tend should keep the business moving. The resolution is not "pick one." It is that a part of the system being down does not have to ground the whole situation. Some work is honest to continue; some must hold. This question draws that line.

## Our answer

We distinguish what we can proceed on from what we must hold, and we never disguise the difference.

### What we can continue on
Claims that do not depend on the unavailable source are still usable. Earlier evidence, recorded claims, other sources that do work, and safe bounded replies to the customer are all honest. We continue those, marked in the situation record as using what we actually have.

### What we hold
Anything whose next safe step is intrinsically tied to the unavailable source. The classic case from our shared example: the carrier API is the only source for a delivery update and it is down. We cannot produce the next answer honestly, and we will not guess or use an unmarked substitute as if it were the truth. So that path is held: a wait, with the reason, a bound, and an escalation.

### The degraded-but-honest rule
When we fall back to a source that is not the most authoritative one, we fall back to it and mark what we found as degraded — stale, or from a weaker source. We may proceed on it when the action is safe and bounded. We do not proceed on it when the action depends on a truth we do not actually hold. This follows the hierarchy of truth from the earlier trust work: ask the strongest source first, fall back only when it fails, and carry the mark.

### The one thing that never runs on the fallback
An irreversible action never runs on a degraded or unconfirmed fact. If the cost of being wrong is that money moves or a promise is sent or data is changed and cannot be undone, we stop rather than fall back. We surface to a person instead.

## What this protects
It keeps the business moving where it safely can, holds what must be held, and never lets a broken part quietly turn into a guess. It is both fail-safe and keep-going, because it knows which parts are which.

## What is decided, what is open

Decided: continue on what is safe, hold what depends on the dead source, mark degraded substitutes, never run irreversible actions on an unconfirmed basis.

Open: which source substitutions a particular business permits and how a "degraded" flag is expressed. Business configuration and Level 3.

## Related
- Source authority: [what_makes_one_source_more_authoritative_than_another.md](../trust_and_evidence/what_makes_one_source_more_authoritative_than_another.md)
- The shared example: [understanding_all_failure_questions.md](understanding_all_failure_questions.md)