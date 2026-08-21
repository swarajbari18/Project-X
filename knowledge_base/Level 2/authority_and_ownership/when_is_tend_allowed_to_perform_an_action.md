# When is Tend allowed to perform an action?

## The short answer

Tend is allowed to perform an action when the action is inside its granted range — either the default range or a configured grant — and the action does not cross the invariant line.

## Our answer

Tend may act freely when the action is inside a granted range. It is not allowed to act when the action is outside every grant, or when acting would cross an invariant.

The check is not made by the LLM. When Tend proposes an action, the control layer evaluates it against the business configuration (the grants) and the invariant boundary, before the action has any effect.

There are three cases:

1. **Inside the default range** → allowed (the default grant is the approval).
2. **Inside a configured grant** → allowed, possibly routed to the named approver if the grant says so.
3. **Outside every grant, or crossing an invariant** → not allowed; the tool returns the constraint, Tend tells the requester, and offers to escalate to a person who holds the needed authority.

## The key precision: the check happens before the effect

We corrected a subtle but dangerous phrasing during the conversation. It is not "the agent does not care about authorization, just starts the tool, then discovers it needs authorization." That would put the gate after the thing being gated.

The correct model: "start the tool" can only mean *prepare, don't execute*. The deterministic authorization config and the invariant check run in the control layer **between the proposed action and any real effect.** Only if the action is in-range does the effect happen.

## Relationship to the other questions

- Whether an action is *allowed* (this question) is set by the grant.
- Whether it *must be approved by a person* (next question) is a property of the grant type.
- Whether a person overrides (a later question in the category) does not exist as a concept, because Tend never holds authority.

## Read-only is not silently allowed

Being allowed to act is not decided by the read/write distinction. A read that reveals confidential data can be a disclosure. The default range and configured grants decide what reads and writes are allowed, not "read vs write."
