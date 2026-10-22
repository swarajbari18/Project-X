# Where each part of the design came from

This file answers one question: where did each piece of Tend's design come from?

Tend is the software that keeps a business's operational problems moving. Each problem is one **situation**, such as Meera's late parcel.

Every piece of the design traces back along one chain:

source → evidence → responsibility → part → interaction → decision

- A **source** is where the need was first written down: the problem statement written for Tend before the design began; the business's own written answers to the engineering questions about how Tend should work; the research; or a decision the project owner made.
- The **evidence** is what that source actually says, quoted or summed up in the decision that rests on it.
- A **responsibility** is a job Tend must do. There are 22, listed in [the summary of responsibilities](../responsibility_view/responsibilities_at_a_glance.md).
- A **part** is a piece of Tend that does some of those jobs. There are ten, described in [the parts file](../boundary_view/the_parts.md).
- An **interaction** is one way the parts work together. There are 23, in [the interactions file](../interaction_view/the_interactions.md).
- A **decision** is a choice the design rests on. There are 25, in [the decisions file](../decision_view/the_decisions.md). Decisions 19 to 25 answered the seven questions that had blocked completion, on 2026-10-22.

The chain runs both ways. Read forward, it shows what a source led to. Read backward, it shows what justifies a part or a rule. Each piece of the design must trace both ways. <!-- method: the two-way chain -->

Each rule here has one of these statuses:
- **Decided:** the project owner — the person designing Tend, not the business owner — said yes. On 2026-10-22 the project owner accepted every recommendation this design had made, and asked for the smaller questions inside them to be settled in the way that best fits; those points are Decided, and points settled that day say so. A rule marked as "the design's reading" was worked out from its sources rather than found written down; it is Decided too. <!-- decided by the owner, 2026-10-22 -->
- **Provisional:** a working choice that carries a condition for reopening it.
- **Rejected:** turned down on purpose, with the reason kept.
- **Deferred:** a value or a detail left, on purpose, to a later stage — **deferred to configuration** (each business or market sets it), **deferred to Level 3** (the stage that chooses the technology), or **deferred to implementation** (whoever builds it). The rule around it is Decided.

Two earlier status words, **To confirm** (written down, but not yet agreed by the project owner) and **Open** (no answer yet), are no longer used: since 2026-10-22, no rule here carries either.

A rule with no status word next to it is **Decided**.

## Words used in this file

The ten parts, one line each: <!-- Section 7: the parts table -->
- the **situation record** keeps each problem's history, as a list of saved versions;
- the **conversation manager** takes in each arrival — a message, or an outside system's answer — decides whether a person should hear an update, and alone sets a situation to completed; its **intake step** reads each new arrival first;
- the **situation worker** reasons about one situation and decides its next step;
- the **communication layer** sends messages to people, and keeps the consent records;
- the **tool layer** makes every call to an outside system, such as a payment provider;
- the **status-check service** waits on a slow outside system while the work goes on;
- **memory** keeps what Tend learned;
- **configuration** holds the business's settings, permissions, and members;
- the **owner view** builds the screens the business owner opens;
- **improvement** is how the product team makes Tend better for every business.

**The AI** suggests the next step; **fixed code** is code that always makes the same check. The **observer** is a regular check that runs alongside the parts, watches Tend itself, and reports only. <!-- Level 2 security: the spine; IA-19; closed item: where the observer sits -->

<!-- Every rule below carries its code in a hidden note. Its meaning, source, and status sit in code_index.md in this folder. -->

## One rule, traced end to end

**Only the conversation manager sets a situation to completed.** <!-- decided by the owner, 2026-10-12: completed -->

- **Source:** the project owner's decision of 2026-10-12.
- **Evidence:** "completed" should mean the customer has heard the end.
- **Responsibility:** 1, keeping each problem as one record.
- **Part:** the conversation manager, which lists "sets completed" among its own jobs.
- **Interaction:** 14, "a situation is completed":
  - the worker records the work as resolved;
  - the conversation manager finds that no wait is still running and the last message has gone out;
  - then it sets completed. The completion check runs inside the worker's check, before the situation is resolved.
- **Decision:** 5, "only the conversation manager sets completed".
- **What it looks like:** Meera's parcel situation is completed only when the worker has recorded the work as resolved, no wait is still running, and the last message has gone out.

Read backward, the same chain answers "why can't the worker close a situation?": because the project owner decided on 2026-10-12 that completed means the customer has heard the end.

## Forward: from each responsibility to its part, interactions, and decisions

The names come first; the numbers point to the sections of the interactions file and the decisions file.

| Responsibility | Where it came from | Part that does it | Interactions | Decisions |
|---|---|---|---|---|
| 1. One record per problem | The problem statement (keep work moving on one situation); the business's answers on understanding the situation and on customer journeys; the project owner's 2026-10-12 decision | Situation record, written by the conversation manager and the situation worker; the book of waits kept beside it | A message arrives (1); one instruction for many (17); completed (14); reopened (15) | Every change is a new version (6); only the conversation manager sets completed (5); one situation per problem (12); reopen only when wrong (13); the book of waits (22) |
| 2. Routing each change | The business's answers on understanding the situation; the project owner's 2026-10-22 decisions | Conversation manager, at its intake step | A message arrives (1); a long wait's answer (6); reopened (15); an unrequested document (16); one instruction for many (17); a rule changes (21) | One situation per problem (12); the status-check answer as an arrival (20); waking after a platform rule change (24) |
| 3. Understanding what a change adds | The business's answers on understanding the situation | Conversation manager and situation worker | A message arrives (1); a correction (13) | One situation per problem (12) |
| 4. Gathering | The business's answers on gathering information | Situation worker, through the tool layer | The worker asks memory (3); calls an outside system (4) | Steps outside Tend through the tool layer (7) |
| 5. Weighing evidence | The business's answers on trust and evidence (accepted 2026-10-20) | Situation worker, with fixed code | Calls an outside system (4); a correction (13) | — |
| 6. Choosing the next step | The business's answers on decision making | Situation worker | A timer wakes (2); calls an outside system (4); work for a person (10); a meeting (12) | The AI suggests, fixed code decides (1); only the worker decides (3) |
| 7. Permission | The business's answers on who may approve what, on identity, and on security; the project owner's 2026-10-22 decision | Tool layer and communication layer; configuration writes the trusted store, membership, and channel bindings | Calls an outside system (4); a step that cannot be undone (5); approval first (7); telling a person (8) | The AI suggests, fixed code decides (1); through the tool layer (7); checked people, configurator's grants (8); the refund setting (9); membership and fresh sign-in (25) |
| 8. Keeping work alive over time | The business's answers on time and coordination; the project owner's 2026-10-17 status-check picture and 2026-10-22 decisions | Situation worker; status-check service; the book of waits | A timer wakes (2); a long wait (6); a meeting (12) | Time wakes only the worker (3); the status-check service (16); a tool declares its wait (19); the answer as an arrival (20); asks through the tool layer (21); the book of waits (22) |
| 9. Bringing people in | The business's answers on human collaboration | Situation worker creates the work; communication layer sends it; conversation manager records the answer | Work for a person (10) | — |
| 10. Meetings and partners | The business's answers on meetings and on human collaboration | Situation worker; communication layer | Contacting a partner (11); a meeting (12) | — |
| 11. Saying the right thing | The business's answers on communication | Conversation manager; communication layer | Telling a person (8); a delivery receipt (9) | The conversation manager decides whether to tell (4); the worker never sends (3) |
| 12. Following each channel's rules | The business's answers on channels; the channel research; the project owner's 2026-10-22 decisions | Communication layer; conversation manager, after a platform rule change | Telling a person (8); a delivery receipt (9); consent withdrawn (18); a rule changes (21) | Channels and consent (14); consent records (23); waking after a platform rule change (24) |
| 13. Failure and recovery | The business's answers on failure | Situation worker; tool layer | Calls an outside system (4); a step that cannot be undone (5); a long wait (6) | Through the tool layer (7); a tool declares its wait (19) |
| 14. Remembering and learning | The business's answers on memory and knowledge; the 2026-10-03 agreement | Memory | The worker asks memory (3); traces (19); memory proposes (20) | Memory suggests, never decides (11) |
| 15. Settings and change | The business's answers on growth and evolution | Configuration | Memory proposes (20); a setting or rule changes (21) | Configurator's grants (8); the refund setting (9); policies fixed per situation (10) |
| 16. Improving the product | The business's answers on the prompt rules and on learning; the compliance answers (no training by default) | Improvement | Traces (19) | Memory suggests, never decides (11) |
| 17. Showing the work | The business's answers on the business view | Owner view | The business owner opens a screen (22) | The owner view is built from the records (17) |
| 18. Recording and explaining each step | The business's answers on explainability | Each part, for its own steps; owner view | Traces (19); the business owner opens a screen (22) | Every change is a new version (6) |
| 19. Watching Tend | The business's answers on explainability and observation | The observer, which runs alongside the ten parts | The observer reports (23) | — |
| 20. The business's own systems | The problem statement (Tend never owns other systems' information); the business's answers on authority and growth | Tool layer | Calls an outside system (4); a step that cannot be undone (5) | Through the tool layer (7) |
| 21. The fixed code around the AI | The business's answers on security; the problem statement's three security rules | Every part's fixed code | Calls an outside system (4); a step that cannot be undone (5); approval first (7) | The AI suggests, fixed code decides (1) |
| 22. Keeping data apart, and the law | The business's answers on security and compliance; the security research | Every part's fixed code; configuration | A message arrives (1); calls an outside system (4); consent withdrawn (18); the business owner opens a screen (22) | Separate storage (15); certifications (18); consent records (23); membership and fresh sign-in (25) |

<!-- method: the two-way chain; Section 7: the parts table; closed item: where the observer sits -->

A dash means no decision in the decisions file rests mainly on that responsibility.

Rules that rest only on the business's memory answers, which are still marked "pending review", are **Provisional**. <!-- Level 2 memory: pending review -->

## Backward: from each part to what justifies it

| Part | Responsibilities it holds | Its main sources |
|---|---|---|
| Situation record | 1, 8 (the book of waits) | The problem statement; the business's answers on understanding the situation and on journeys; the business's coordination answers (the book of waits is the only list of waits) |
| Situation worker | 3–6, 8–10, 13 | The business's answers on decision making, gathering, trust and evidence, time, human collaboration, meetings, and failure |
| Conversation manager | 1–3, 9, 11, 12 | The business's answers on understanding the situation and on communication; the project owner's decisions of 2026-10-10 (it contains the intake step, the worker, and the communication layer), 2026-10-12 (it alone sets completed), and 2026-10-22 (it saves outside answers as arrivals, and wakes situations after a platform rule change) |
| Communication layer | 7, 9–12 | The business's answers on communication and on channels; the project owner's 2026-10-22 decision (it writes the consent records) |
| Tool layer | 4, 7, 8 (the status-check service's asks), 13, 20 | The business's answers on authority, security, and failure |
| Status-check service | 8 | The project owner's decisions of 2026-10-09 (its own part, because it serves many situations at once), 2026-10-17 (the one place that waits on an outside system while work goes on), and 2026-10-22 (its asks go through the tool layer; its answer is saved as an arrival) |
| Memory | 14 | The business's answers on memory and knowledge; the 2026-10-03 agreement |
| Configuration | 7, 15, 22 | The business's answers on growth and evolution, on who may approve what, and on identity; the project owner's 2026-10-22 decision (membership and channel bindings) |
| Owner view | 17, 18 | The business's answers on the business view and on explainability |
| Improvement | 16 | The business's answers on the prompt rules and on learning |

<!-- Section 7: the parts table; decided by the owner, 2026-10-10: what the conversation manager contains; decided 2026-10-09: the status-check service; decided by the owner, 2026-10-17; decided by the owner, 2026-10-22 -->

Three responsibilities are not held by one part. Responsibility 18, recording each step, is done by every part for its own steps. Responsibility 21, the fixed code around the AI, is built into every part. Responsibility 19, watching Tend, is the observer's, which is not one of the ten parts.

Every part traces to something the business wrote or the project owner decided. None was added only to handle time, failure, growth, or security. <!-- Section 9: no new boundary for dimensions -->

## The kinds of situation test the chain

The fifteen kinds of situation are the tests of this chain. A kind is a type of case in which at least one part behaves differently from usual — for example, a person who never answers. Each kind's walks are in [how a situation moves](../behaviour_view/how_a_situation_moves.md). <!-- decided: the fifteen kinds -->

## Where the chain was weak, and how each was closed

Each weak point found while this folder was written is closed. <!-- decided by the owner, 2026-10-22 -->
- **Options not recorded** for decisions 5, 6, and 18. Decision 18's options were found in the business's compliance answers; those for decisions 5 and 6 were written down at completion, on 2026-10-22. <!-- settled 2026-10-22: options and reopen conditions; finding: options not recorded -->
- **Reopen conditions not recorded** for decisions 1, 4, and 12. Written down at completion, on 2026-10-22. <!-- finding: reopen condition not recorded -->
- **What would make each part change** was never worked out before this design. Each part's line is the design's reading, accepted by the project owner on 2026-10-22. <!-- change drivers: situation record -->
- **Two reasons come only from an earlier form of the design**: keeping the conversation manager thin, and keeping memory apart from the worker. Accepted on 2026-10-22. <!-- Section 7 archive: conversation manager record -->
- **The seven questions that blocked completion** — who writes a wait a tool hands off; which code writes the status-check answer; whether the service calls through the tool layer; which part holds the book of waits; who writes consent records; what wakes situations after a platform rule change; and how a checked person is matched to their permissions — were answered by the project owner on 2026-10-22, as decisions 19 to 25. <!-- decided by the owner, 2026-10-22 -->
- **Older lines still say nothing checks on a fixed clock**, which the project owner's 2026-10-17 picture replaced. They sit in earlier files outside this folder, and are listed in [the conflict register](../checking/conflict_register.md). <!-- construction record, entry 21: polling rule changes -->
- **The observer's seat**: it runs alongside the parts. <!-- closed item: where the observer sits -->
- **The calls made while writing these files** were accepted by the project owner on 2026-10-22. They are listed in [the decisions register](../checking/decisions_register.md). <!-- my calls: entry 21 -->

One kind of rule keeps a status other than Decided, by design: rules that rest only on answers still marked "pending review" are **Provisional**. The business's memory answers are the main case. <!-- Level 2 memory: pending review -->

A rule with no source found was once held back until the project owner agreed it. After 2026-10-22 none remains in this folder: every such rule was accepted. <!-- method: no source, to confirm -->

## Open questions, and what is set later

Nothing in the chain is open. The Provisional memory rules are listed above.
