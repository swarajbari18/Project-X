# The Situation Registrar

This file is for whoever builds the Situation Registrar. Older files call it the situation record. It can be built from this file alone. It says what the part must do, not what technology builds it.

**Statuses.** A rule is **Decided** unless one of these words sits beside it: **Provisional** (a working choice with a condition for reopening it), or **deferred to configuration**, **deferred to Level 3**, or **deferred to implementation** (a value or a detail left, on purpose, to each business or market, to the stage that chooses the technology, or to whoever builds it; the rule around it is Decided). The project owner is the person designing Tend. On 2026-10-22 the project owner accepted every recommendation this design had made, and asked for the smaller questions inside them to be settled in the way that best fits; those points are Decided. A rule marked as "the design's reading" was worked out from its sources rather than found written down; it is Decided too. The earlier words **To confirm** and **Open** are no longer used. "The business owner" means the person who runs the business Tend serves. <!-- decided by the owner, 2026-10-22 -->

**Words used here.** A **situation** is one operational problem, such as Meera's late parcel or the refund on order 9912. The **registry** is the list of every situation and person in a business. A **version** is one saved state of a situation, after a change. A **notice** is the short internal signal a new version sends; people never see it. The **conversation manager** takes in each message and alone sets a situation to completed; the **situation worker** reasons about one situation and writes what Tend concludes. A **run** is one pass of the worker over one situation. A **wait** is a pause until one named thing happens. The **book of waits** is the list of every open wait that may outlast its run, across all of a business's situations. An **arrival** is anything that comes in from outside: a message, an outside system's answer. A **claim** is one statement from one source, with a time. A **link** is a recorded connection between two situations. A **work item** is a task for one named person. A **held note** records that a message may belong to a situation; it changes nothing there. A **handoff** passes work from one person to another. The **reopened mark** shows that a closed situation was closed wrongly. <!-- A1; HC-1; Section 7: the parts table; S1; HC-3; decided 2026-10-22: the book of waits; decided 2026-10-22: the status-check answer; E1; A3; IA-14; B9; J8; A8 -->

**Words added 2026-10-29.** The **understanding artifact** (until later on 2026-10-29, the **reading**) is what understanding the arrival, the conversation manager's one AI stage, writes before anything acts on an arrival: each ask and whether it is about the business; what each refers to, with time words turned into dates; the sender's claims; what is unknown; what Tend already holds that answers it; and where each ask fits. It is an interpretation, saved with the arrival, never a conclusion. (The status label "the design's reading" is a different thing: a rule worked out from its sources.)

**More words.** A tool **declares** a wait when its result states, in a fixed form, what is awaited, from whom, and what ends it. A wait's **time signal** is the alarm the situation worker sets for the wait's due time; it wakes only the worker. The **technology stage** is Level 3, where the technology is chosen part by part. <!-- decided 2026-10-22: the wait a tool declares; decided 2026-10-22: the book of waits; method: the build order -->

<!-- Every rule below carries its code in a hidden note. Its meaning, source, and status sit in code_index.md in this folder. -->

**1. What is this part for?**

It keeps each operational problem as one record, with its whole history, as a list of versions. It tells the right parts of Tend about each new version. It keeps the list of every situation and every person in them. <!-- A1; decided by the owner, 2026-11-04: the registrar -->

Every other part reads the newest version of a situation from here, and every write to a situation passes through it. It is the one shared place through which the conversation manager and the situation worker learn of each other's changes. <!-- Section 7: the parts never call each other; decided by the owner, 2026-11-04: the registrar -->

Think of a court's registrar. It keeps the official record, accepts filings, checks their form and never their merit, numbers each one, keeps the register of all cases, and serves notices on the parties. The judge decides. The registrar never does.

**2. Why is it a separate part?**

Many parts depend on it: the conversation manager and the situation worker write what they conclude through it, and memory and knowledge finds situations in it. So it belongs to none of them. It also gives one door for every write, so a version and its notices can be saved together. The boundary decision is in [the parts file](../boundary_view/the_parts.md). <!-- Section 8: two writers, one record; decided by the owner, 2026-11-04: the registrar -->

**3. What does it do?**
- It holds the versions of each situation. Each version can be read on its own, without the ones before it. <!-- A1 -->
- It holds each situation's outcome when it closes, and its state: running, waiting, blocked, or completed. <!-- states: liveness -->
- **It sends every notice.** A fixed table says which parts hear about which kind of change. The notices are saved with the version, and it tries again until each is delivered. No writer has to know who is listening. <!-- decided by the owner, 2026-11-04: the registrar -->
- **It keeps the book of waits:** every open wait that may outlast its run. A wait is saved with its situation's version. The business-wide list is updated a moment later, and it can be rebuilt from the situations. A wait that begins and ends inside one run is not written there. <!-- decided 2026-10-22: the book of waits; settled 2026-10-22: short waits; decided by the owner, 2026-11-04: the registrar -->
- **It keeps the registry:** the list of every situation in the business, with its kind, its state, and its typed fields and numbers; the person records and their channel addresses; and which people are in which situations. This is how a situation is found without opening it. <!-- A3; A14; decided by the owner, 2026-11-04: the registrar -->
- **It writes what others decide about situations:** the links memory and knowledge makes; the splits, merges and reroutes the situation worker decides; the reopened mark. A link never changes a situation's versions. <!-- A15; B4; A8; decided by the owner, 2026-11-04: the registrar -->
- **It carries out a confirmed erasure** in the situations and the registry, when memory and knowledge's cleaner asks it to. <!-- U7; IB-19; decided by the owner, 2026-11-04: the registrar -->
- It checks the form of every write, and refuses what a fixed table rules out (question 6). <!-- S4; decided by the owner, 2026-11-04: the registrar -->

**4. What does it never do?**
- It never rewrites an old version. A correction is a new version; the old one stays as history. The one exception is a deletion the law requires, and it happens only through the erasure tool's confirmation flow, with a record kept that an erasure happened, without the erased data. <!-- HC-1; Level 2 compliance: deletion everywhere; U7; IB-19 -->
- It never decides or judges. It does not ask why a worker chose to wait, or whether a step is wise. It routes notices from typed fields the writer set, and never from what a message means, because that would take the conversation manager's update decision. <!-- Section 8: two writers, one record; decided by the owner, 2026-11-04: the registrar -->
- It never sets a wait's alarm. The situation worker sets each wait's time signal. <!-- decided 2026-10-22: the book of waits -->
- It never accepts a write from outside Tend. An outside system's or a person's words pass the intake step or the tool layer first, because understanding and the check of who sent them happen there. <!-- Section 7: HC-2; decided by the owner, 2026-11-04: the registrar -->
- It never sends a message to a person. That is the communication layer's job. <!-- Section 10: the worker never sends -->
- It never becomes the record of another system's facts. A carrier's tracking stays with the carrier; it keeps what Tend was told, with its source and time. <!-- Level 1: does not own other systems' facts; E1 -->

**5. What does it own and write?**

It owns the versions, the book of waits, the registry, the links and the record of notices. It chooses none of their content. Each kind of change has one author, and every write passes through this door. The author is recorded on every version: <!-- Section 7 writer table: who writes what; decided 2026-10-22: the book of waits; decided by the owner, 2026-11-04: the registrar -->

| Change | Its author |
|---|---|
| The first version of a new situation; each arrival — an incoming message, a person's answer, an outside system's answer such as the status-check service's — with the conversation manager's understanding artifact of each arrival that carries words (an interpretation, since 2026-10-29; first called the "reading"); the mark "answered by the conversation manager from" the items it told, when an arrival was answered from what Tend holds; whether an update is worth telling; one version in each situation affected by a platform rule change; completed | Conversation manager |
| Its understanding of new content (since 2026-10-29); the information plan, gathering's artifact (since 2026-10-29, later); facts and claims; conflicts; corrections; the next step; what should be said; waits, including a wait a tool declares; what an outside answer means; outcomes; the work recorded as resolved; work for a person; a split, merge or reroute; the reopened mark | Situation worker |
| A link between situations, and the removal of a wrong one | Memory and knowledge's link keeper; an employee who may see both situations may remove one |
| An erasure of a person's data, after its confirmation | Memory and knowledge's cleaner |

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
- Any wait that may outlast its run, with the version that writes it. <!-- decided 2026-10-22: the book of waits; decided by the owner, 2026-11-04: the registrar -->
- Every version, with the notices it must send. <!-- decided by the owner, 2026-11-04: the registrar -->

These are the cases found so far; any further change that must not be seen half-done is added to the list. <!-- S4: the list -->

**6. What does it decide, and what may it not decide?**

It decides nothing. It refuses only what a fixed table can answer. None of this is judgement: <!-- decided by the owner, 2026-11-04: the registrar -->

| It refuses when | For example |
|---|---|
| The shape is wrong | A save with a missing field, or sent by an old copy of the code during a deploy |
| The save is built on an old version | The worker read version 5, and version 6 now exists |
| This author may not make this kind of change | The worker tries to write "completed" |
| This move between states is not allowed | The worker moves a blocked situation to completed |
| Something that must be saved together is missing | A closure with no outcome; a work item with no owner |

It cannot refuse a reply that fails to cancel the wait it answers. Knowing that a reply answers a wait takes reasoning, so the worker's fixed code must bundle them.

| Change of state | Who decides | Who acts | Who approves |
|---|---|---|---|
| Running, waiting, or blocked | The situation worker | The situation worker | — |
| Completed | The conversation manager | The conversation manager | — |

The full state rules are in [the records file](../state_view/the_records.md). <!-- Section 8: the states table; decided by the owner, 2026-10-12: completed -->

**7. What makes it change, and what makes it grow?**

It changes when a situation must remember a kind of fact it has no place for today, such as a new kind of claim, or when a new part needs to hear about a kind of change. This is the design's reading. <!-- change drivers: situation registrar; decided by the owner, 2026-11-04: the registrar -->

It grows with the number of situations. Each business's data is kept in that business's own storage. A busy business must not make its own customers wait in line, so no save in one situation waits for a save in another. <!-- Level 1: more situations; decision record 12; decided by the owner, 2026-11-04: the registrar -->

**8. What starts it, what does it read, and what does it hand on?**

A write starts it: from the conversation manager, the situation worker, or memory and knowledge's link keeper and cleaner. <!-- decided by the owner, 2026-11-04: the registrar -->

**Who reads what from it:**
- The newest version: the situation worker, the conversation manager, the communication layer, memory and knowledge, the owner view, and the tool layer (the saved starts, before a step that cannot be undone).
- The book of waits: the intake step, to match an arrival to the wait it ends; the owner view, to show what each situation is waiting for; the status-check service, to read a wait it must serve; the conversation manager after a platform rule change; and the situation worker after a restart, to set every time signal again.
- **Anything that must be exact asks the situation itself.** The intake step matching an outside system's answer to its wait, and the status-check service woken by a wait's notice, both go to the situation that the answer or the notice names. The business-wide list may be a moment behind, so it is for finding and showing, never for an exact check.
- The registry: memory and knowledge and the conversation manager, to find a person's situations, and a situation holding a number.

<!-- Section 7: how the two parts work together; decided 2026-10-22: the book of waits; IB-8: the record check; N22; decided by the owner, 2026-11-04: the registrar -->

**Who hears about what.** It sends these notices, from this table:

| When this is saved | Its author | The notice goes to |
|---|---|---|
| An arrival on a situation | Conversation manager | Situation worker; memory and knowledge |
| An arrival that is an opt-in or opt-out | Conversation manager | Also the communication layer's consent code |
| A version after a platform rule change | Conversation manager | Situation worker; memory and knowledge |
| Completed | Conversation manager | Situation worker, so it removes the check-in; memory and knowledge |
| What the worker concludes | Situation worker | The conversation manager's update decision; memory and knowledge |
| A wait on an outside system | Situation worker | Also the status-check service |
| A change that may be one of the four alerts | Situation worker | Also the owner view |
| A new version of a person's situation in an outreach | Situation worker | Also the intake step, as an arrival for the central situation |
| A link | Memory and knowledge | No part that acts: a link never carries a change |

A writer never hears about its own write. <!-- decided by the owner, 2026-11-04: the registrar -->

**9. How does it work inside?**
1. A part sends a write, naming the version it was built on, and who wrote it and why.
2. It checks the form (question 6). If a newer version exists, it refuses, and the writer checks its step against the newest version. Two runs never change the same situation at the same time. <!-- S2; S1; decided by the owner, 2026-11-04: the registrar -->
3. It saves the new version, any change to that situation's waits, and the notices the table names, all together. <!-- HC-1; decided by the owner, 2026-11-04: the registrar -->
4. It delivers each notice, and tries again until each is delivered. A second delivery changes nothing. <!-- decided by the owner, 2026-11-04: the registrar -->
5. A moment later, it updates the registry and the business-wide list of waits. Nothing decides on those copies alone; a decision reads the situation itself. A part woken by a notice reads from the situation it names, so it can never look too early. <!-- decided by the owner, 2026-11-04: the registrar -->

```text
writer ──▶ write, built on version N
              │
              ├── wrong form, wrong author, or a newer version exists?  ──▶ refused, with the reason
              ▼
           saved together: version N+1, its waits, its notices
              │
              ├──▶ each notice delivered; tried again until it is
              └──▶ a moment later: the registry and the list of waits catch up
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
- A write that fails a check is refused, and the writer is told why. <!-- S4; decided by the owner, 2026-11-04: the registrar -->
- When a part dies right after a save, the notices are already saved, and they are delivered anyway. <!-- decided by the owner, 2026-11-04: the registrar -->
- A notice can arrive twice. The second does nothing. <!-- decided by the owner, 2026-11-04: the registrar -->
- When work is interrupted by a crash, a restart, or an update, each situation is rebuilt from its newest saved version and continues. It does not start over. <!-- H6 -->
- While a situation cannot be reached, no step is taken that cannot be saved. Arrivals are held where they came in until they can be saved; nothing is sent; no decision is made. When it is back, every time signal is set again from the book of waits. <!-- closed item: part outage not written; settled 2026-10-22: part outages -->
- If the registry falls behind, it catches up. If it is lost, it is rebuilt from the situations. People and links are its own truth, and do not rebuild this way, so they are protected like versions. <!-- decided by the owner, 2026-11-04: the registrar -->

**13. Which rules must always hold here?**

| Rule | How a break would show |
|---|---|
| An old version is never rewritten | Meera's address changed inside version 3, instead of in a new version 4 |
| Every version's notices are saved with it, and delivered | A change no other part ever reacts to |
| Each kind of change has one author, and every write passes this door | Two parts making the same kind of change; a part writing around this door |
| It never judges | A write refused because a step looked unwise; a notice routed by what a message means |
| A failure is never a fifth state | A situation marked "failed" instead of waiting, blocked, running, or completed |
| The book of waits always catches up with the situations | A wait in a situation's version that the list still does not show after it should have caught up |

<!-- HC-1; Section 7 writer table: who writes what; M1; decided 2026-10-22: the book of waits; decided by the owner, 2026-11-04: the registrar -->

**14. What must be visible afterwards?**

Every version, with who wrote it, why, and when. From the versions alone, a person can rebuild what Tend knew and decided at each step. <!-- O7; Section 8: reason tags -->

**15. How do we know it is built correctly?**
- A saved version stays as it was. A failure looks like: an earlier version reads differently today than when it was saved.
- Two changes arriving together for one situation are both kept, the second checked against the newest version. A failure looks like: one change lost, or two versions both built on the same earlier one.
- Every save's notices reach the parts the table names, even if the writer dies right after saving. A failure looks like: a saved version nobody heard about.
- A writer does not hear about its own write. A failure looks like: the conversation manager woken by its own save.
- A write the table rules out is refused, with its reason. A failure looks like: the worker managing to write "completed".
- After a restart, each situation continues from its newest version. A failure looks like: a situation back at its first version, or a step repeated.
- A registry and a list of waits rebuilt from the situations match the live ones. A failure looks like: a wait the list does not show, or a person's situation missing from a search.

<!-- HC-1; S1; H6; decided by the owner, 2026-11-04: the registrar -->

**16. What is still open?**

Nothing in its rules is open. Two details are left to the plans (deferred to implementation): the exact form of the reopened mark, and what one version physically contains, given each must be readable on its own. <!-- A8; decided by the owner, 2026-11-04: the registrar -->

**17. Where did this come from?**

[The parts file](../boundary_view/the_parts.md) (the boundary decision), [the records file](../state_view/the_records.md) (every record and its author), [the rules that always hold](../constraint_view/the_rules_that_always_hold.md), [the decisions file](../decision_view/the_decisions.md) (decisions 6, every change a new version; 12, one situation per problem; 22, the book of waits; and 38 to 41, this part as it now stands), and [the situation file](../responsibility_view/the_situation.md).

**How it is built (Level 3; Decided, 2026-11-04).** Each kind of data has its own home, so slow work on one never holds up another.

| Data | Home |
|---|---|
| Versions, state, outcome, reopened mark, a situation's waits, its notices not yet delivered | One Durable Object per situation, separate from the situation worker's |
| The registry, person records, links, the business-wide list of waits | One D1 database per business |

A Durable Object does one thing at a time, so one situation's writes form a line, and no situation waits for another. This object never calls an AI, so a slow AI call in the worker never holds up a save. Each business's configuration and learned knowledge have their own D1 databases, in their own parts. <!-- decided by the owner, 2026-11-04: the registrar -->
