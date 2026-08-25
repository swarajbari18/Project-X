# How do we explain every failure?

## The short answer

Reuse Failure's answer wholesale: a failure is a declared outcome written into the audit with its evidence, its reason and the next safe step — never silent. What this category adds is one careful neighbour: capability-absent is NOT a failure, and keeping the two apart protects both concepts.

## Our answer

Failure already decided the machinery this question asks for:

- Every wait carries a bound; past the bound, the system records a declared outcome — success, terminal failure, transient failure, or unknown-outcome — with evidence and reason.
- Both sides of any decision land in the audit: the LLM's argued consequence and the deterministic decision.
- Escalations carry the full chronological trail.
- A failure that is not in the audit does not count as handled.

So "explaining every failure" is already guaranteed upstream. This document exists to draw one line that the walkthrough sharpened:

> **Capability-absent is not a failure.** When no capable source exists for an ask, nothing broke. The deterministic conclusion "capability does not exist" is recorded with evidence, and the customer receives the honest answer — including why. It lives in the audit as a declaration, but outside Failure's triage entirely.

The distinction matters in practice: folding capability-absent into terminal-failure would pollute failure statistics with standing facts, drag bookkeeping through incident triage, and misstate the product ("the system failed" vs "the system honestly said it can't"). Failure keeps its four declared outcomes untouched.

One more explanation duty rides along: because capability-absent conclusions are recorded as first-class declarations, they are explainable on demand too — to the customer (why we can't), to the business (what customers keep asking for that we can't serve), and aggregated as the product-signal roadmap.

## Boundary

- Recognition of failure and recovery moves (Failure).
- Where the capability-absent conclusion is produced (Gathering's ask→source matching) and how ask-endings are represented (Understanding).
- Storage of the audit (Level 3).

## Related

- [`../failure/understanding_all_failure_questions.md`](../failure/understanding_all_failure_questions.md) — the declared-outcome machinery reused here.
- [How do we recognise that the system is behaving unexpectedly?](how_do_we_recognise_that_the_system_is_behaving_unexpectedly.md)
