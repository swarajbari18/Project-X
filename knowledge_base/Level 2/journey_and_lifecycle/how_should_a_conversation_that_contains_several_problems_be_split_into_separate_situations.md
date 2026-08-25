# How should a conversation that contains several problems be split into separate situations?

## The short answer

Reused from Understanding the Situation — not rewritten here. The knowledge base already fully decides routing, splitting, merging, re-opening, and linking by operational context.

## The existing decision (reuse)

Understanding the Situation records:

- A situation is one operational problem — a decision workspace, not a chat thread.
- One message can contain two distinct asks → Tend creates two situation models immediately (split early).
- Hard signals attach to an existing situation or create a new one; soft signals ask the customer which problem they mean (asking is gathering, not a failure).
- Tend routes before gathering; gathering may correct assignment (re-route, split, merge).
- Re-open a resolved situation when the same operational problem is not actually finished; create a new situation for a genuinely new problem (optionally linked).
- Links connect operational context, not identity.

## Why this category does not re-write it

Journey and Lifecycle is about the person and their journey across situations. Splitting one conversation into several problems is a routing decision inside the situation layer. Reusing the existing answer keeps one definition of the situation model instead of creating a second one here.

## Related

- The source: the [`understanding the situation` documentation](../understanding_the_situation/how_do_we_determine_whether_multiple_messages_belong_to_the_same_situation_and_whether_two_seemingly_different_conversations_are_actually_related.md) and the split/merge/reopen detail in [`how_do_we_determine_whether_multiple_messages_belong_to_the_same_situation_and_whether_two_seemingly_different_conversations_are_actually_related.md`](../understanding_the_situation/how_do_we_determine_whether_multiple_messages_belong_to_the_same_situation_and_whether_two_seemingly_different_conversations_are_actually_related.md)