# How do we keep the business safe while recovering?

## Where this question comes from

Recovery is itself a risky time. The moment a path is dead and the card is trying something new, we are acting with the world in a messy state. The danger is that the recovery action makes things worse — a redo of an already-applied effect, a promise broken while we fix an internal problem, a guess dressed as a fact. This question is the safety floor underneath every recovery move.

## Our answer

Safety while recovering is not a separate posture. It is the invariants of the product held steady through the move. Four rules stay true the whole time:

### 1. Never guess
If the effect of an action is unknown, we do not invent the answer. If a source is degraded, we say it is degraded. The moment we guess, we lose the ability to explain the decision, which the product depends on.

### 2. Never run an irreversible action on an unconfirmed fact
This is the boundary you drew in the conversation, kept here. An irreversible action — money moved, a promise sent, data changed and cannot be undone — never runs because we assumed the earlier attempt failed. When the outcome is unknown, we check (idempotency or poll); when it is still unknown, we place it in front of a person. The cost of wrong is a doubled refund, and no autonomous retry takes that risk.

### 3. Keep both promises, even under pressure
The customer clock and the internal clock are not in competition. If the recovery is going to take time, the customer clock is satisfied with an honest interim message, and the internal clock keeps escalating. One repair must not silently break the other. Recovering by going quiet is not a repair; it is a hidden failure.

### 4. Every move is recorded
When the card recovers, it records what the path was, what broke, what it tried, and what it chose next. The audit is not an add-on to recovery; it is what makes recovery recoverable. If anything later goes wrong, a person can rebuild the situation from the record — not from memory or from a guess.

## The safe-hold

Where no safe next step exists — retries spent, alternatives blocked, no one reachable, consequence bad — the card does not fake progress. It rests at a safe-hold: a visible pause with the reason stated and a deadline set, into the audit, under the two clocks. That is not failure to recover; it is a deliberate, recorded stop that keeps everyone safe while a person takes over.

## What is decided, what is open

Decided: the four invariants above and the safe-hold as the resting state when nothing safe remains.

Open: what counts as "irreversible" for a particular business, and the window lengths. Business configuration and Level 3 research.

## Related
- The recovery menu: [how_do_we_recover_after_failures.md](how_do_we_recover_after_failures.md)
- The avoid-repeat-forever control: [how_do_we_avoid_repeating_the_same_failed_action_forever.md](how_do_we_avoid_repeating_the_same_failed_action_forever.md)
- The two clocks: [how_do_we_represent_work_that_is_waiting.md](../coordination/how_do_we_represent_work_that_is_waiting.md)