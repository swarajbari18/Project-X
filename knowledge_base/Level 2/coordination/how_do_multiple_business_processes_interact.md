# How do multiple business processes interact?

## The short answer

They interact through the situation, not with each other. A business process is a set of steps the business runs against its own systems. Tend's job is to reflect, in one situation record, all the processes that touch that operational problem, and to keep the record consistent when several processes hit it at once.

## Our answer

A situation model is Tend's coordination record for one operational problem ([relationship_between_understanding_and_gathering_information.md](../gathering_information/relationship_between_understanding_and_gathering_information.md)).

Different processes — order management, payment, delivery, support, feedback — can all touch the same customer problem. They interact only by landing their results on the shared record. There is no separate "process coordinator" in the layered architecture; there is the situation record, the decision loop, and the underlying graph of situations.

The graph comes from Understanding: nodes are situation models, context edges (undirected) mean "work one of these and you should see the other", journey edges (directed) show which situation followed which ([how_do_we_determine_which_information_is_relevant_to_the_current_situation_and_which_information_should_be_ignored.md](../understanding_the_situation/how_do_we_determine_which_information_is_relevant_to_the_current_situation_and_which_information_should_be_ignored.md)). Multiple processes can thus exist side by side, and this is what keeps customer problems from being one long line.

## The boundary with Journey / Lifecycle

We corrected this boundary explicitly in the conversation: "splitting a problem into a situation" is not Journey/Lifecycle's job. That decide belongs to Understanding and the router. Journey/Lifecycle is the long arc of a customer, owner, or other actor across many situations — a different thing.

Coordination's role is: once situations exist, and they are touched by several processes, keep them coherent, visible, non-duplicating, and see that their waits are alive.

## What happens when two processes touch the same situation

- They never fight directly. Each lands an update on the record.
- The record versions each new state, so the history of what happened, from which process, at what time, stays traceable.
- If two processes produce conflicting results, Trust and Evidence detects the conflict and decides whether it blocks the workflow or is presented to a person ([how_do_we_identify_conflicting_information.md](../trust_and_evidence/how_do_we_identify_conflicting_information.md)).

## Related

- [How do independent actors work together?](how_do_independent_actors_work_together.md) — actors rather than processes.
- [How do we prevent duplicated work?](how_do_we_prevent_duplicated_work.md) — two processes asking the same thing twice.