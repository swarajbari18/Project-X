# When must Tend ask for approval?

## The short answer

Tend must ask for approval when an action is outside a pre-granted range and a person must grant the specific instance — or when the grant itself says an action requires an approver.

## Our answer

There are two distinct moments of approval, and asking "when must Tend ask" is only about the second one:

1. **Grant-time approval** — this is the approval of a *range* up front. It is not "asking" per action; it happened once, by the configurator. Autonomous in-range actions are approved by the grant.
2. **Execution-time approval** — this is asking about a *specific* action. Tend must ask when the action is outside the range and there is a person who can approve, or when the grant declares an approver for that capability.

So "when must Tend ask" means: **when the grant itself requires an approver, or when the action falls outside every grant and needs a one-off approval.**

## What happens when approval is needed

The action does not get performed and does not silently wait. Tend goes to the approver through the tool, because the approval path is part of the tool, not the LLM. If the approver does not respond, the shared escalation framework takes over — the same framework all capabilities use when a needed person does not act. This connects to Coordination and Time.

## The "no wait state" correction

We phrased it loosely as "there's no wait state at this point." The honest statement is: an action that needs approval does not pretend to progress; it immediately hands to the approval path. Once we're actually waiting on a person, that is a real wait with a reason, handled by the escalation framework, not hidden.

## What this resolves

This closes the autonomy/approval loop concretely: approval is either built into the grant (grant-time) or requested per instance (execution-time). Tend never guesses whether approval is needed; the tool reads the config.
