# How do we prevent outdated knowledge from influencing new decisions?

## Status

Answered — working decision, pending review.

## Outdated memory is not deleted history

When reality changes, the earlier memory remains historically true as an observation of what Tend previously knew or what the business previously did.

It may no longer be valid guidance.

The item therefore needs a current lifecycle state such as:

- active;
- stale;
- superseded;
- conflicting;
- retired; or
- unresolved.

## Retrieval must filter before ranking

Tend should first exclude memory that fails hard conditions:

- wrong business;
- wrong role or process;
- wrong capability version;
- outside its validity period;
- superseded by a newer item;
- prohibited by permissions; or
- marked unavailable for future guidance.

Only then should semantic similarity, recency or usefulness influence ranking.

## Currentness is decision-relative

There is no universal expiry time for every memory.

A local vocabulary meaning may remain useful for a long time.

A tool precondition may become invalid after a capability changes.

A staffing convention may change when the business reorganises.

The memory therefore carries observation time, validity conditions, applicable process and related version information.

## Working decision

Outdated knowledge is prevented from influencing decisions through explicit scope, validity, version, supersession, conflict and retrieval eligibility—not through one generic freshness score.

When currentness cannot be established, Tend should treat the memory as provisional, stale or unresolved and gather current information when the decision requires it.
