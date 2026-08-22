# How do we prevent duplicated work?

## The short answer

We prevent it structurally. One situation is one story; one human work item has exactly one responsible owner; asks go to the most authoritative source first; and the wait registry refuses identical double-waits. In practice the majority of "duplication" was never a Coordination problem at all — it belongs to Human Collaboration (one owner), Failure (retries), or the authority hierarchy (which source to ask).

## The question that turned out to be a misunderstanding

The Level 1 question asked "How do we prevent duplicated work?" In the conversation Swaraj challenged this: situation models are already separate stories, connected in a graph, so why would two pieces of work duplicate while we coordinate?

The answer took research:

1. **Two employees both take the same work item.** Already solved: Human Collaboration gives each human work item one responsible owner, `handle multiple people working on the same situation` ([understanding_all_human_collaboration_questions.md](../human_collaboration/understanding_all_human_collaboration_questions.md)).
2. **A retry of the same call.** That is Failure's job: retry, backoff, dedupe, and "do not repeat the same failed action forever" ([escalation_sla.md research](../../research/escalation_sla.md) and the Failure category).
3. **Two sources for the same question.** That is the authority hierarchy, from Trust and Evidence's source authority: ask the most authoritative source first, fall back only if it fails.

Because each of these already has an owner, "duplicate work" disappears as a general Coordination problem.

## What Coordination actually owns: the wait registry

The one genuinely Coordination-owned bit is re-entry and identical waits.

- One situation = one story. A re-entered message attaches to the existing node; it does not create a twin record (see [Understanding's routing decisions](../understanding_the_situation/how_do_we_determine_whether_multiple_messages_belong_to_the_same_situation_and_whether_two_seemingly_different_conversations_are_actually_related.md)).
- Before creating a wait, check whether an identical wait (same subject + kind + purpose) is already open for this situation; attach to it instead of adding a second.
- A new situation that shares an order or an incident with an existing one gets a context edge — it is not a copy of the first situation.

These three rules keep the book of waits and the graph honest: no two identical asks, no two cards for the same story, no two owners for the same work item.

## Consequence

Duplication is therefore a consequence- limit of the structure, not a category-level condition we must constantly fight. When an edge case slips through — identical wait, same story reopened by two channels — it returns to the same node in the same graph before it can double.

## Related

- [How do multiple business processes interact?](how_do_multiple_business_processes_interact.md) — two processes touching one situation.
- [How do we coordinate long-running work?](how_do_we_coordinate_long_running_work.md) — the situation record keeps it alive.