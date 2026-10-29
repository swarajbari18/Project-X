# The situation record

This file is for whoever builds the situation record. It can be built from this file alone. It says what the part must do, not what technology builds it.

**Statuses.** A rule is **Decided** unless one of these words sits beside it: **Provisional** (a working choice with a condition for reopening it), or **deferred to configuration**, **deferred to Level 3**, or **deferred to implementation** (a value or a detail left, on purpose, to each business or market, to the stage that chooses the technology, or to whoever builds it; the rule around it is Decided). The project owner is the person designing Tend. On 2026-10-22 the project owner accepted every recommendation this design had made, and asked for the smaller questions inside them to be settled in the way that best fits; those points are Decided. A rule marked as "the design's reading" was worked out from its sources rather than found written down; it is Decided too. The earlier words **To confirm** and **Open** are no longer used. "The business owner" means the person who runs the business Tend serves. <!-- decided by the owner, 2026-10-22 -->

**Words used here.** A **situation** is one operational problem, such as Meera's late parcel or the refund on order 9912. A **version** is one saved state of a situation, after a change. A **notice** is the short internal signal a new version sends; people never see it. The **conversation manager** takes in each message and alone sets a situation to completed; the **situation worker** reasons about one situation and writes what Tend concludes. A **run** is one pass of the worker over one situation. A **wait** is a pause until one named thing happens. The **book of waits** is one shared table of every open wait that may outlast its run, across all situations. An **arrival** is anything that comes in from outside: a message, an outside system's answer. A **claim** is one statement from one source, with a time. A **link** is a recorded connection between two situations. A **work item** is a task for one named person. A **held note** records that a message may belong to a situation; it changes nothing there. A **handoff** passes work from one person to another. The **reopened mark** shows that a closed situation was closed wrongly. <!-- A1; HC-1; Section 7: the parts table; S1; HC-3; decided 2026-10-22: the book of waits; decided 2026-10-22: the status-check answer; E1; A3; IA-14; B9; J8; A8 -->

**Words added 2026-10-29.** The **understanding artifact** (until later on 2026-10-29, the **reading**) is what understanding the arrival, the conversation manager's one AI stage, writes before anything acts on an arrival: each ask and whether it is about the business; what each refers to, with time words turned into dates; the sender's claims; what is unknown; what Tend already holds that answers it; and where each ask fits. It is an interpretation, saved with the arrival, never a conclusion. (The status label "the design's reading" is a different thing: a rule worked out from its sources.)

**More words.** A tool **declares** a wait when its result states, in a fixed form, what is awaited, from whom, and what ends it. A wait's **time signal** is the alarm the situation worker sets for the wait's due time; it wakes only the worker. The **technology stage** is Level 3, where the technology is chosen part by part. <!-- decided 2026-10-22: the wait a tool declares; decided 2026-10-22: the book of waits; method: the build order -->

<!-- Every rule below carries its code in a hidden note. Its meaning, source, and status sit in code_index.md in this folder. -->

**1. What is this part for?**

It keeps each operational problem as one record, with its whole history, as a list of versions. <!-- A1 -->

Every other part reads the newest version of a situation from here. Only the conversation manager and the situation worker write versions of a situation. It is the one shared place through which those two learn of each other's changes. <!-- Section 7: the parts never call each other -->

**2. Why is it a separate part?**

Two parts write to it: the conversation manager writes what comes in, and the situation worker writes what Tend concludes. Each part's news reaches the other through it. So it belongs to neither writer alone. The boundary decision is in [the parts file](../boundary_view/the_parts.md). <!-- Section 8: two writers, one record -->

**3. What does it do?**
- It holds the versions of each situation. Each version can be read on its own, without the ones before it. <!-- A1 -->
- It holds each situation's outcome when it closes, and its state: running, waiting, blocked, or completed. <!-- states: liveness -->
- It does not hold the links between situations. Since 2026-10-28 those are memory and knowledge's own records, kept beside the situations; a link never changes a situation's record. <!-- A3; A15 -->
- Each new version carries its notice. The part that saves the version sends the notice, in the same run; the record itself sends nothing and acts on nothing. <!-- HC-1; Section 7: the record does not act -->
- Beside the situations, it keeps the **book of waits**: one shared table of every open wait that may outlast its run. A wait enters the book in the same save that writes it, and leaves in the save that ends it, so the book and the situations cannot disagree. A wait that begins and ends inside one run is not written there. <!-- decided 2026-10-22: the book of waits; settled 2026-10-22: short waits -->

**4. What does it never do?**
- It never rewrites an old version. A correction is a new version; the old one stays as history. The one exception is a deletion the law requires, and it happens only through the erasure tool's confirmation flow, carried out by memory and knowledge's cleaner, with a record kept that an erasure happened, without the erased data. <!-- HC-1; Level 2 compliance: deletion everywhere; U7; IB-19 -->
- It never decides anything, and never sets an alarm or wakes anyone. The situation worker sets each wait's time signal. <!-- Section 8: two writers, one record; Section 7: the record does not act; decided 2026-10-22: the book of waits -->
- It never becomes the record of another system's facts. A carrier's tracking stays with the carrier; the record keeps what Tend was told, with its source and time. <!-- Level 1: does not own other systems' facts; E1 -->

**5. What does it own and write?**

It owns the versions and the book of waits. It writes nothing of its own; each kind of change has one writer: <!-- Section 7 writer table: who writes what; decided 2026-10-22: the book of waits -->

| Change | Written by |
|---|---|
| The first version of a new situation; each arrival — an incoming message, a person's answer, an outside system's answer such as the status-check service's — with the conversation manager's understanding artifact of each arrival that carries words (an interpretation, since 2026-10-29; first called the "reading"); the mark "answered by the conversation manager from" the items it told, when an arrival was answered from what Tend holds; whether an update is worth telling; one version in each situation affected by a platform rule change; completed | Conversation manager |
| Its understanding of new content (since 2026-10-29); the information plan, gathering's artifact (since 2026-10-29, later); facts and claims; conflicts; corrections; the next step; what should be said; waits and their book entries, including a wait a tool declares; what an outside answer means; outcomes; the work recorded as resolved; work for a person | Situation worker |

An arrival that is not about the business, or that has nothing to do, is not a version of any situation: it is kept in the person's message history, with its understanding artifact and the conversation manager's reply decision. <!-- PL-5; PL-7; PL-8 -->

<!-- C8; C10; A15; PL-10; PL-12; construction record, entry 21: writer question; construction record, entry 21: return path; decided 2026-10-22: the wait a tool declares; decided 2026-10-22: the status-check answer; decided 2026-10-22: platform rule wake -->

These changes are saved together, in one version: <!-- S4 -->
- Tend's reply, with the cancelling of the wait it answers. <!-- IB-3 -->
- A new work item, with its owner. <!-- IA-14 -->
- A handoff, pending until the new person accepts it. <!-- IA-14 -->
- A "Tend cannot know this here" declaration, with its evidence. <!-- O10 -->
- A closure, with its outcome. <!-- S4 -->
- A partial answer, with its wait and the question still open. <!-- Section 8: atomic moves, a partial gather -->
- A step started, its unknown result, and the wait the tool declared. <!-- IB-11; settled 2026-10-22: one version for a step and its wait -->
- Any wait that may outlast its run, with its entry in the book of waits. <!-- decided 2026-10-22: the book of waits -->

These are the cases found so far; any further change that must not be seen half-done is added to the list. <!-- S4: the list -->

**6. What does it decide, and what may it not decide?**

It decides nothing.

| Change of state | Who decides | Who acts | Who approves |
|---|---|---|---|
| Running, waiting, or blocked | The situation worker | The situation worker | — |
| Completed | The conversation manager | The conversation manager | — |

The full state rules are in [the records file](../state_view/the_records.md). <!-- Section 8: the states table; decided by the owner, 2026-10-12: completed -->

**7. What makes it change, and what makes it grow?**

It changes when a situation must remember a kind of fact it has no place for today, such as a new kind of claim. This is the design's reading. <!-- change drivers: situation record -->

It grows with the number of open situations. Each business's situations, and its book of waits, are kept in that business's own storage. If reading the book becomes slow, the table can be split at the technology stage — by business, or by due time; the rule, one book kept with the situations, does not change. <!-- Level 1: more situations; decision record 12; decided 2026-10-22: the book of waits -->

**8. What starts it, what does it read, and what does it hand on?**

A write from the conversation manager or the situation worker starts it. The writer's notice reaches the other part. Any part that reads gets the newest version: the communication layer, memory and knowledge, and the owner view. The book of waits is read by the intake step, to match an arrival to the wait it ends; by the owner view, to show what each situation is waiting for; by the status-check service, to read a wait it must serve; and by the worker after a restart, to set every time signal again. <!-- Section 7: how the two parts work together; decided 2026-10-22: the book of waits -->

**9. How does it work inside?**
1. A writer saves a new version, built on the version it read.
2. If a newer version was saved in the meantime, the step is checked against the newest version first. Two runs never change the same situation at the same time. <!-- S2; S1 -->
3. The save and its notice happen together. A save without its notice is unfinished, and is tried again. <!-- HC-1 -->
4. When the version writes, refreshes, or ends a wait, the same save updates the book of waits. <!-- decided 2026-10-22: the book of waits -->

```text
writer ──▶ save new version (built on version N)
              │
              ├── a newer version exists?  yes ──▶ check the step against the newest version first
              │
              ▼
           version N+1 saved, with any change to the book of waits  ──▶  the writer's notice, in the same run
```

**10. How does it behave in each kind of situation?**

| Kind of situation | What the record does |
|---|---|
| [1. An irreversible action's outcome stays unknown](../behaviour_view/kind_01_unknown_result.md) | Holds the step started, its unknown outcome, and the wait the tool declared, in one version; the wait enters the book of waits |
| [2. An outside system is down, slow, or too stale](../behaviour_view/kind_02_outside_system_down.md) | Holds the wait and its book entry, then the declared failure |
| [3. A partial answer arrives](../behaviour_view/kind_03_partial_answer.md) | Holds each question apart: one answered, one open |
| [4. One instruction fans out to many people](../behaviour_view/kind_04_one_to_many.md) | Holds one situation per person |
| [5. No source and no person can answer](../behaviour_view/kind_05_no_source.md) | Holds the "Tend cannot know this here" declaration, with its evidence |
| [6. A timer and a reply race](../behaviour_view/kind_06_timer_and_reply.md) | Holds the reply, then the answer and the cancelled wait in one version |
| [7. An unrequested document or unknown event arrives](../behaviour_view/kind_07_unrequested_arrival.md) | Holds the filed document, as a claim |
| [8. A message cannot be pinned to one situation](../behaviour_view/kind_08_unclear_message.md) | Not involved: the held note sits in the conversation manager's record of held notes, and no situation changes |
| [9. Two sources disagree](../behaviour_view/kind_09_sources_disagree.md) | Holds both claims and the conflict |
| [10. A person does not act, or is unavailable](../behaviour_view/kind_10_person_silent.md) | Holds the work item and each step of the escalation |
| [11. An action needs approval, or must be refused](../behaviour_view/kind_11_approval_or_refusal.md) | Holds the refusal's reason, or the approved step |
| [12. The world changes while work is open](../behaviour_view/kind_12_world_changes.md) | Holds the policy version each situation started with; after a platform rule change, the version the conversation manager wrote in each affected situation |
| [13. Who is speaking is unknown or unverified](../behaviour_view/kind_13_unknown_speaker.md) | Not involved: the held note sits in the conversation manager's record of held notes; the customer's situation does not change |
| [14. Work is blocked, interrupted, or wrongly closed](../behaviour_view/kind_14_blocked_or_reopened.md) | Holds the blocked state with its reason; the reopened mark; the newest version for a restart |
| [15. A human commitment changes shape](../behaviour_view/kind_15_human_commitment.md) | Holds each meeting event and each handoff |

<!-- decided: the fifteen kinds; IB-11 -->

**11. What are its key moments?**

Every walk passes through it. The clearest is Priya's reply. She replies two minutes before her follow-up is due. Her reply is saved as its own version. Then Tend's answer and the cancelled follow-up wait are saved together, so the late timer finds nothing to send (kind 6). <!-- IB-3; IB-4 -->

**12. What happens when things go wrong?**
- A save that would leave the situation unsafe is refused. <!-- S4 -->
- When work is interrupted by a crash, a restart, or an update, each situation is rebuilt from its newest saved version and continues. It does not start over. <!-- H6 -->
- While the record cannot be reached, no step is taken that cannot be saved. Arrivals are held where they came in until they can be saved; nothing is sent; no decision is made. When it is back, every time signal is set again from the book of waits. <!-- closed item: part outage not written; settled 2026-10-22: part outages -->

**13. Which rules must always hold here?**

| Rule | How a break would show |
|---|---|
| An old version is never rewritten | Meera's address changed inside version 3, instead of in a new version 4 |
| Every save sends its notice in the same run | A change no other part ever reacts to |
| Each kind of change has one writer | Two parts writing the same kind of change |
| A failure is never a fifth state | A situation marked "failed" instead of waiting, blocked, running, or completed |
| The book of waits never disagrees with the situations | A wait in a situation's version that the book does not list, or the reverse |

<!-- HC-1; Section 7 writer table: who writes what; M1; decided 2026-10-22: the book of waits -->

**14. What must be visible afterwards?**

Every version, with who wrote it, why, and when. From the versions alone, a person can rebuild what Tend knew and decided at each step. <!-- O7; Section 8: reason tags -->

**15. How do we know it is built correctly?**
- A saved version stays as it was. A failure looks like: an earlier version reads differently today than when it was saved.
- Two changes arriving together for one situation are both kept, the second checked against the newest version. A failure looks like: one change lost, or two versions both built on the same earlier one.
- Every save sends its notice in the same run. A failure looks like: a save with no notice.
- After a restart, each situation continues from its newest version. A failure looks like: a situation back at its first version, or a step repeated.
- A book of waits rebuilt from the situations' versions matches the live one. A failure looks like: a wait the book does not list, so its time never comes.

<!-- HC-1; S1; H6 -->

**16. What is still open?**

Nothing in this part is open. The exact form of the reopened mark is left to whoever builds the record (deferred to implementation); no rule depends on it. <!-- A8 -->

**17. Where did this come from?**

[The parts file](../boundary_view/the_parts.md) (the boundary decision), [the records file](../state_view/the_records.md) (every record and its writer), [the rules that always hold](../constraint_view/the_rules_that_always_hold.md), [the decisions file](../decision_view/the_decisions.md) (decisions 6, every change a new version; 12, one situation per problem; and 22, the book of waits), and [the situation file](../responsibility_view/the_situation.md).
