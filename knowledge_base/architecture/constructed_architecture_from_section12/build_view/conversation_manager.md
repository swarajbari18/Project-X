# The conversation manager

This file is for whoever builds the conversation manager's own work:
- the **arrival loop**: intake, understanding the arrival, routing, and the reply decision;
- the **update loop**: the update decision;
- setting a situation to completed.

The conversation manager also contains the situation worker and the communication layer; each of those has its own file. This file can be built from itself alone. It says what the part must do, not what technology builds it. <!-- decided by the owner, 2026-10-10: what the conversation manager contains; PL-1 -->

**Statuses.** A rule is **Decided** unless one of these words sits beside it:
- **Provisional**: a working choice with a condition for reopening it;
- **deferred to configuration**, **deferred to Level 3**, or **deferred to implementation**: a value or a detail left, on purpose, to each business or market, to the stage that chooses the technology, or to whoever builds it. The rule around it is Decided.
- **Call**: a choice this design made where neither the project owner's words nor Level 2 settle the point, not yet confirmed by the project owner.

The project owner is the person designing Tend. On 2026-10-22 the project owner accepted every recommendation this design had made, and asked for the smaller questions inside them to be settled in the way that best fits; those points are Decided. A rule marked as "the design's reading" was worked out from its sources rather than found written down; it is Decided too. "The business owner" means the person who runs the business Tend serves. <!-- decided by the owner, 2026-10-22 -->

**Words used here.**
- A **situation** is one operational problem, such as Meera's late parcel. Its record is a list of **versions**; a new version sends a short internal **notice**.
- An **arrival** is anything that comes in from outside: a message, a person's answer, an outside system's answer such as the status-check service's.
- The **intake step** is the fixed first step that saves each arrival.
- **Understanding the arrival** is the conversation manager's one AI step. It works out what each ask in an arrival means, whether it is about the business, whether Tend already holds the answer, and where it fits. It writes an **understanding artifact**: a structured record that fixed code reads. Until later on 2026-10-29 this was called the "reading".
- The **wider look** is understanding's second pass, only when needed, over a small set of the sender's own situations that memory and knowledge narrowed by what the first pass resolved.
- **Routing** is fixed code that checks the understanding artifact and carries it out.
- The **reply decision** is fixed code that decides whether, and how, to answer an arrival that ended at understanding.
- The **update decision** is the choice: is this change worth telling this person now?
- A **held note** records that a message may belong to a situation; it changes nothing there.
- The **book of waits** is the list of every wait that may outlast its run, kept with the situation records. A **wait** is a pause until one named thing happens.
- A **channel** is one way of reaching a person: WhatsApp, email, Telegram, or the website chat.
- A **checked sender** is one whose identity Tend has confirmed from something it can check: a sign-in proves a person; a channel bound to a member proves only the channel, and names the member. A **member** is a person who works for the business, proved by the sign-in provider the business uses.
- A **clear match** joins an ask to one situation for a reason code can check: the sender wrote a number only that situation holds; the sender is answering a question that situation asked; or it is the sender's only open situation of the ask's kind holding the values understanding resolved (dates, a store, an item).
- **About the business**: an ask that concerns the business's work, products, people or records. A greeting, small talk, a general-knowledge question or a sum is not.
- A **package** is what memory and knowledge hands a step before it runs: knowledge to use, or an explicit empty answer.
- A **closed situation** is one set to completed. "The worker" means the situation worker.

<!-- A1; HC-1; decided 2026-10-22: the status-check answer; decided 2026-10-22: the book of waits; B9; decided: the update decision; L1; AC-1; decided 2026-10-22: identity and permission; PL-3; PL-4; PL-6; PL-8 -->

<!-- Every rule below carries its code in a hidden note. Its meaning, source, and status sit in code_index.md in this folder. -->

**Rebuilt 2026-10-29: the product loop.**
- **What the project owner said.**
  - "the loops do not look natural to me … I am first and foremost a product engineer".
  - "Routing, I don't think would be much of a LLM thing."
- **What changed.**
  - The conversation manager's work is now two loops built from the product's stages, set out in the Level 2 page [how Tend's product loop works](../../../Level%202/the_product_loop/how_does_the_product_loop_work.md).
  - Its one AI step is understanding the arrival. Routing, the reply decision and the update decision are fixed code.
  - An arrival that is not about the business starts no situation and gets a reply.
  - An arrival Tend can already answer is answered at once, restoring the project owner's ruling of 5 September.
- **What it replaces.** The design of 28 and 29 October morning: a reading, then candidates, then a choice by code or by a second AI turn, then a check, with memory and knowledge's package before each. <!-- PL-1; PL-3; PL-5; PL-6 -->

**1. What is this part for?**

It reacts when an arrival comes in, or when the worker writes a new version, and decides whether people should hear an update.
- **Each arrival:** it understands it before anything acts on it, then places it on the right situation; or it answers it; or it keeps it, when there is nothing to do.
- **Records:** it records what came in, with its understanding artifact.
- **Completion:** it alone sets a situation to completed.
- **Timers** never reach it; a timer wakes only the worker. <!-- Section 7: the parts table; IB-1; PL-5 -->

**2. Why is it a separate part?**

Every message in and every message out passes through it. It understands each arrival and places it, and leaves the reasoning about a situation to the worker. So its path stays short, and its effort follows the arrival:
- a greeting ends at understanding;
- a question Tend already holds the answer to is answered at once;
- only work goes on to a situation.

It writes what an arrival means, never what Tend concludes about a situation. The boundary decision is in [the parts file](../boundary_view/the_parts.md). <!-- Section 7 archive: conversation manager record; PL-2 -->

**3. What does it do?**
- **Intake.**
  - It saves each arrival, with the channel's reference to the original, and drops a repeat.
  - It fixes the business and the sender from what it can check, never from the message's text. The channel address points to a person ID; an unknown address gets a new person, marked unknown, made once per address.
  - It runs one arrival loop per person at a time.
  - A **typed arrival with an exact reference** is placed by code where its reference points, and skips understanding and routing: an outside system's answer to a wait, a claim sent from another situation, an update for a central situation, an incident event. One whose reference points to a completed situation goes through the arrival loop like any arrival. <!-- B7; AC-1; A14; B10; IB-22; decided 2026-10-22: the status-check answer; IB-16; IB-17; PL-19 -->
- **Understanding the arrival** (one AI call writes a structured answer; the wider look, when needed, chooses among what was shown). Before it, memory and knowledge's package holds:
  - the sender's recent messages;
  - the sender's open situations, as summaries of typed fields, with the waits and questions each holds on this person;
  - the business's events, words, places and products whose name or alias is in the arrival, with their dates, sources and who may be told them;
  - facts the business configured that the arrival's words point to, read from the configuration's own store;
  - any situation of the sender's that a number in the arrival points to;
  - earlier understanding artifacts of this sender's;
  - the time.

  It uses only what Tend holds. It never calls a business system, and never asks a person. The understanding artifact has fixed sections:
  1. each ask, quoted, and whether it is about the business;
  2. what each business ask refers to, with time words turned into dates, each resolved value naming the item that resolved it;
  3. the sender's claims;
  4. what is unknown;
  5. whether it answers a question Tend asked;
  6. whether it refers to earlier work or a past purchase;
  7. the item Tend holds that answers each business ask, if one does;
  8. where each business ask fits: a presented open situation; a new situation of a named kind; "needs the wider look"; or "cannot tell between" named situations. <!-- PL-3; C7; C8; N21; N29 -->
- **The wider look.** Memory and knowledge narrows the sender's own situations, open and finished, by the values understanding resolved: exact values first, description only inside them (agreed on 2026-10-03). It returns a small set and the total. An empty set needs no second pass: the ask is new work. Otherwise understanding chooses among the set. <!-- PL-4; N37 -->
- **Chooses the ending, by fixed code, from the artifact:**
  - **reply** (no ask is about the business);
  - **nothing to do** (about the business, but nothing asked, nothing answered, no claim);
  - **answered from what Tend holds**;
  - **hold and ask**;
  - **routed**.

  An arrival may have more than one: a general question gets the reply while its business ask is routed. <!-- PL-5 -->
- **Routing** (fixed code). It checks the artifact, then attaches each ask to the situation it fits, starts one situation per distinct new fit, keeps a held note, or marks an "answered from what Tend holds" placement. It saves the arrival and its artifact in each routed situation's new version, and announces it. <!-- PL-6; B3; B9; IB-2 -->
- **Makes the reply decision** for an arrival that ended at understanding, for an "answered from what Tend holds" placement, and for "hold and ask". <!-- PL-8; PL-10 -->
- **Keeps an arrival that is not about the business, or has nothing to do,** in the person's message history with its understanding artifact. Memory and knowledge never learns from one that is not about the business, and never presents it to a situation. <!-- PL-7; C9 -->
- **Makes the update decision** for each new version the worker writes. <!-- decided: the update decision; PL-16 -->
- **Sets a situation to completed.** <!-- decided by the owner, 2026-10-12: completed -->
- **Decides, when understanding an arrival, whether it reopens a closed situation.** <!-- A8 -->
- **Wakes the affected situations after a platform rule changes.** It reacts to the channel rule record's update, reads the book of waits, and writes one version into each situation with a step pending on that channel, released at a steady pace. <!-- decided 2026-10-22: platform rule wake; settled 2026-10-22: steady pace -->
- **Saves claims sent between situations, and a person's updates for their central situation,** as typed arrivals. <!-- IB-16; IB-17 -->
- **Keeps an outreach's central situation.** One instruction to contact many people creates one situation per person and one central situation; the update decision on the central situation tells the business owner only what is material. <!-- B6; IB-17 -->
- **Files a document nobody asked for** on the matching situation, or on the sender's contact record. <!-- decided by the owner, 2026-10-10 -->

**4. What does it never do?**
- It never decides the next step for a situation; the worker does. <!-- Section 11 §5: the parts table -->
- It never sets waiting or blocked. <!-- Section 8: the states table -->
- It never writes what Tend concludes about a situation. <!-- Section 8 anti-patterns -->
- It never guesses which situation an arrival belongs to. <!-- B3 -->
- It never routes an arrival it has not understood. <!-- C7; PL-3 -->
- Routing never interprets: it carries out the understanding artifact, and nothing else. <!-- PL-6 -->
- It never places an ask on a situation memory and knowledge did not present. <!-- N20 -->
- It never starts a situation for an arrival that is not about the business. <!-- PL-7 -->
- A reply to an arrival that is not about the business never says anything about the business. <!-- PL-9 -->
- It never answers from learned knowledge, a stale claim, a claim in conflict, a cache, or another person's situation. <!-- PL-10 -->
- It never treats a bound channel as proof of the person, or a channel address as the person. <!-- decided 2026-10-22: identity and permission; A14 -->
- It never searches a person's past on the message's raw words. <!-- N37 -->
- Understanding never calls a business system. <!-- PL-3 -->

**5. What does it own and write?** <!-- Section 7 writer table: who writes what -->
- the first version of each new situation, written by routing, with the arrival and its understanding artifact; there is no empty record; <!-- IB-6; C8 -->
- the understanding artifact of each arrival that carries words, saved with it, as an interpretation; <!-- PL-3; IB-21 -->
- each incoming arrival: attached, new, held, answered from what Tend holds (attached or new, marked), or kept in the person's message history (not about the business, or nothing to do); <!-- PL-5; C9 -->
- held notes; <!-- B9 -->
- each reply decision, saved with its arrival; <!-- PL-8 -->
- each person's answer, and each outside system's answer, as arrivals; <!-- decided 2026-10-22: the status-check answer -->
- each claim a worker sends to another situation, as an arrival there; <!-- IB-16 -->
- in an outreach, each person's update, as an arrival on the central situation; <!-- IB-17 -->
- after a platform rule change, one version in each situation with a step pending on that channel; <!-- decided 2026-10-22: platform rule wake -->
- whether an update is worth telling;
- completed.

It writes no links. When routing starts a new situation for new work after a closed one, memory and knowledge's link keeper links the two. <!-- A15; A7 -->

**6. What does it decide, and what may it not decide?**

| Decision | Who decides | Who acts | Who approves |
|---|---|---|---|
| What an arrival means: each ask, what it refers to, whether it is about the business, what Tend holds that answers it | Understanding the arrival (its AI), with memory and knowledge's package in front of it; an interpretation, never a fact | The conversation manager | — |
| Where each ask fits | Understanding the arrival, among the situations presented to it; fixed code confirms a clear match; "cannot tell" asks the sender | Routing | — |
| Which ending the arrival takes | Fixed code, from the artifact's sections | Routing; the reply decision | — |
| Whether to reply to an arrival that ended at understanding, and what kind of reply | The reply decision (fixed code), by the business's when-to-communicate rules | The communication layer | — |
| Where an outside system's answer belongs | Intake, from the wait it names, read from the book of waits | The conversation manager | — |
| Which situations to wake after a platform rule change | The conversation manager, from the book of waits | The conversation manager | — |
| Whether a closure was wrong | Understanding the arrival, when an arrival refers to a closed situation | The situation worker reopens the record | — |
| Whether a change is worth telling | The update decision (fixed code) | The communication layer sends | — |
| That a situation is completed | The conversation manager: the worker has recorded the work as resolved, no wait is still running, and the last message has gone out; or the business has stopped a blocked situation | The conversation manager | — |

<!-- PL-3; PL-4; PL-5; PL-8; PL-16; decided 2026-10-22: the status-check answer; decided 2026-10-22: platform rule wake; A8; decided: the update decision; decided by the owner, 2026-10-12: completed; Section 8: the states table -->

**7. What makes it change, and what makes it grow?**

**Changes:**
- a new channel appears;
- an arrival can come in a new way;
- the business changes when a person should hear an update, or how it answers questions that are not about it.

This is the design's reading. <!-- change drivers: conversation manager -->

**Grows:**
- with the number of arrivals;
- with one instruction that creates many situations at once (an outreach's central situation receives one arrival for each person's update).

Its effort grows only with arrivals that are work. A greeting costs one AI call, and one more to write the reply. <!-- B6; IB-17; PL-2 -->

**8. What starts it, what does it read, and what does it hand on?**
- **Starts it:**
  - an incoming message;
  - an outside system's answer;
  - a claim a worker sends to another situation;
  - a person's update for its central situation;
  - a notice of a version the worker wrote;
  - the update of a channel's rule record.

  <!-- Section 8: which change starts which part; decided 2026-10-22: the status-check answer; decided 2026-10-22: platform rule wake -->
- **Reads:**
  - memory and knowledge's package before understanding, and before the wider look when it runs;
  - the configuration's own store, for a configured fact that answers an ask;
  - the full record only after a match;
  - the book of waits, to match an outside answer to its wait and to find the situations a rule change affects;
  - membership and channel bindings, to fix who sent a message.

  <!-- PL-17; PL-10; decided 2026-10-22: the book of waits; decided 2026-10-22: identity and permission -->
- **Hands on:**
  - to memory and knowledge, what it holds at each package and each stage it observes;
  - a new version, whose notice wakes the worker;
  - a reply or "worth telling" to the communication layer.

  <!-- N19; IB-2; IB-5; PL-17 -->

**9. How does it work inside?**

**The arrival loop.**
1. **Intake** (fixed code).
   - An arrival already handled is dropped.
   - The sender is checked, and the business fixed.
   - The arrival waits its turn in the person's queue.
   - A typed arrival with an exact reference is placed where it points, and the loop ends.

   <!-- S12; AC-1; B10; PL-19 -->
2. **Memory and knowledge's package arrives.** <!-- PL-17 -->
3. **Understanding the arrival** (AI, one structured answer). It writes the understanding artifact; fixed code checks its shape. If an ask needs the wider look:
   - memory and knowledge narrows the sender's own situations;
   - an empty set means new work;
   - otherwise, after its package, the wider look chooses among the set.

   At most two passes, each with one repair. <!-- PL-3; PL-4 -->
4. **The ending** (fixed code), from the artifact:
   - **reply:** no situation; the arrival is kept in the person's message history, marked "not about the business"; the reply decision;
   - **nothing to do:** no situation; kept in the person's message history, naming the situation it refers to; the reply decision;
   - **answered from what Tend holds:** routing places the arrival, marked; the reply decision tells the person;
   - **hold and ask:** routing keeps a held note; the reply decision asks the sender;
   - **routed:** routing.

   <!-- PL-5; PL-7; PL-10 -->
5. **Routing** (fixed code).
   - **Checks:** every quote is in the arrival; every situation named was presented; every resolved value names a presented item; the ending's condition holds.
   - **A failed check** goes back to understanding once, with its reasons. A second failure goes to the person the business named for arrivals Tend could not place.
   - **Then:** attach, create, split, hold, or mark. It writes each result, with the artifact, as a new version.

   <!-- PL-6; N20; settled 2026-10-22: memory unreachable -->
6. **The reply decision** (fixed code), when an ending calls for it:

   | Case | Decision |
   |---|---|
   | A greeting | Reply, unless a newer arrival from this person is queued, or a greeting was already answered since their last business message (Call) |
   | A general question or a sum | A short answer, unless the business switched this off for customers; then the business's polite line (Call) |
   | A thank-you, an "ok" or a 👍 that answers nothing | No reply, unless the business set a courtesy reply (Call) |
   | Answered from what Tend holds | Tell those items |
   | Hold and ask | Ask which situation |
   | General and business asks together | Answer the general asks now, with one true line that the rest of the message is being worked on |

   The decision is saved with the arrival, and handed to the communication layer. <!-- PL-8; PL-9 -->

**The update loop.**
7. For each version the worker writes, **the update decision** (fixed code) reads the version:
   - the communication intent the worker wrote;
   - a central situation's rules for what is material;
   - a response promise falling due.

   It hands what should be said to the communication layer. <!-- decided: the update decision; PL-16 -->

**Completion and wakes.**
8. When the worker has recorded the work as resolved, no wait is still running, and the last message has gone out, it sets completed. It also sets completed when the business stops a blocked situation. <!-- decided by the owner, 2026-10-12: completed; Section 8: the states table -->
9. When a channel's rule record is updated, it reads the book of waits, and writes one version into each situation with a step pending on that channel, at a steady pace. <!-- decided 2026-10-22: platform rule wake; settled 2026-10-22: steady pace -->

```text
arrival ─▶ intake: drop repeats, check sender, one per person ─┬─ typed, exact reference ─▶ placed where it points ─▶ notice ─▶ worker
                                                                │
                                                                ▼
                                        [package] understanding the arrival ──(needs the wider look)──▶ narrowed set ─▶ [package] wider look
                                                                │                                                         │
                                                                ▼◀────────────────────────────────────────────────────────┘
                                                      ending, chosen by fixed code
        ┌──────────────────┬───────────────────┬────────────────┴───────────────┬───────────────────────┐
     reply           nothing to do     answered from what Tend holds        hold and ask                routed
  (not about the       (kept in the      routing places it, marked     routing: held note      routing: attach, create, split
    business)         message history)            │                            │                         │
       │                    │                     ▼                            ▼                         ▼
       └──▶ reply decision ◀┘            reply decision: tell           reply decision: ask      new version ─▶ notice ─▶ worker
                  │                               │                            │
                  └──────────────────────────────▶ communication layer ◀──────┘

worker's new version ─▶ update decision ─▶ worth telling? ─▶ communication layer
resolved, no wait running, last message out ─▶ completed
a channel's rule record updated ─▶ read the book of waits ─▶ one version in each affected situation ─▶ notice ─▶ worker
```

In the drawing, **[package]** marks a point where the loop waits for memory and knowledge's package. Every other step is fixed code. <!-- PL-17 -->

**10. How does it behave in each kind of situation?**

| Kind of situation | What the conversation manager does |
|---|---|
| [1. An irreversible action's outcome stays unknown](../behaviour_view/kind_01_unknown_result.md) | Saves the payment provider's answer, when it comes, as a typed arrival on the refund's wait; the update decision tells the customer the business is waiting |
| [2. An outside system is down, slow, or too stale](../behaviour_view/kind_02_outside_system_down.md) | The update decision tells the interim update before the promised time |
| [3. A partial answer arrives](../behaviour_view/kind_03_partial_answer.md) | The update decision sends the partial answer now |
| [4. One instruction fans out to many people](../behaviour_view/kind_04_one_to_many.md) | Understanding finds one fit per person and one central situation; routing creates them; each person's update is saved on the central situation; the business owner hears only what is material |
| [5. No source and no person can answer](../behaviour_view/kind_05_no_source.md) | The update decision tells the honest answer |
| [6. A timer and a reply race](../behaviour_view/kind_06_timer_and_reply.md) | Understands and routes the reply first, as its own version |
| [7. An unrequested document or unknown event arrives](../behaviour_view/kind_07_unrequested_arrival.md) | Understanding says what the document is and what it refers to; routing files it; a person sees it if nothing matches |
| [8. A message cannot be pinned to one situation](../behaviour_view/kind_08_unclear_message.md) | Understanding finds it cannot tell between situations; routing keeps a held note; the reply decision asks the sender |
| [9. Two sources disagree](../behaviour_view/kind_09_sources_disagree.md) | The update decision tells the honest interim message; a claim in conflict is never answered from what Tend holds |
| [10. A person does not act, or is unavailable](../behaviour_view/kind_10_person_silent.md) | Understands and routes the person's answer when it comes |
| [11. An action needs approval, or must be refused](../behaviour_view/kind_11_approval_or_refusal.md) | Saves the approver's answer as an arrival; the worker hands it to the waiting tool step. The update decision tells the person about a refusal |
| [12. The world changes while work is open](../behaviour_view/kind_12_world_changes.md) | After a platform rule change, wakes the situations with a step pending on that channel |
| [13. Who is speaking is unknown or unverified](../behaviour_view/kind_13_unknown_speaker.md) | Fixes the business and sender from what can be checked; understanding sees only the sender's own records; reveals nothing |
| [14. Work is blocked, interrupted, or wrongly closed](../behaviour_view/kind_14_blocked_or_reopened.md) | Understanding decides whether a closure was wrong; completes a blocked situation the business stops |
| [15. A human commitment changes shape](../behaviour_view/kind_15_human_commitment.md) | Understands and routes each person's answer |
| An arrival that is not about the business ("hi", "what's the capital of India?") | Ends at understanding; no situation; the reply decision answers |

The walks are in [how a situation moves](../behaviour_view/how_a_situation_moves.md). <!-- decided: the fifteen kinds; AC-3; closed item: approval answer route; PL-5 -->

**11. What are its key moments?**
- "hi" from a number Tend has never seen: understood, answered, no situation, nothing learned.
- Arjun's "the one I ordered in the Diwali sale still hasn't come": the sale's dates resolved before anything is placed; the wider look is one date filter.
- "Any update?" from Meera with three open orders (kind 8).
- A stranger typing Meera's order number (kind 13).
- Meera's refund marked done that never arrived (kind 14).

**12. What happens when things go wrong?**
- **It is down:** incoming arrivals are held, and nothing is sent. <!-- Section 7: failure and unavailability -->
- **Understanding cannot run** (its AI is down): the arrival goes to the person the business named for arrivals Tend could not place. <!-- settled 2026-10-22: memory unreachable; PL-3 -->
- **Memory and knowledge's AI part does not answer:** the package carries the fixed items. Understanding marks what it cannot resolve as unknown. If where an ask fits depends on that, the ending is hold and ask. <!-- N31 -->
- **Routing's check fails twice:** the arrival goes to that person. <!-- PL-6 -->
- **An arrival placed on the wrong situation** is corrected later: split, linked, or moved. Two situations later found to be one problem are merged, and the merge is recorded with its reason. <!-- B4 -->
- **The sender never answers its question:** the held message stays held and changes nothing; the sender's next message is understood afresh; a held note still unplaced when the business's wait limit passes goes to a person. <!-- closed item: unanswered routing question -->
- **A platform rule change affects many situations:** their wakes are released at a steady pace; if it stops part-way, it starts again from the rule record's update, and skips situations that already hold the version. <!-- settled 2026-10-22: steady pace; closed item: fan-out recovery -->

**13. Which rules must always hold here?**

| Rule | How a break would show |
|---|---|
| An arrival is understood, and saved with its understanding artifact, before anything acts on it; the artifact is an interpretation | A situation started before the message was understood |
| Routing uses no AI; it carries out the artifact | A routing step that interprets words, or calls a model |
| An arrival that is not about the business starts no situation, and is never learned from | A situation opened for "hi"; a lesson learned from a customer's maths question |
| A reply to an arrival that is not about the business says nothing about the business | "Hi! Your order 8840 is delayed" sent in answer to "hi", without a decision to send it |
| "Answered from what Tend holds" uses only a current claim with no open conflict in the sender's own situation, or a configured fact read from its own store | Old opening hours from a cache; a refund told "completed" while its receipt is in dispute |
| It never guesses which situation an arrival belongs to | "Any update?" attached to one of three orders without asking |
| Only it sets completed: after the work is resolved, with no wait still running and the last message gone out; or when the business stops a blocked situation | A situation completed while Meera's refund wait is running |
| The business is fixed from a checked sender, never from the message's text | A message saying "this is the other shop" changes which business a run belongs to |
| A bound channel never proves the person | An approval recorded from a WhatsApp message with no sign-in behind it |
| A closed situation is never used as a bucket for "this customer wrote again" | A new problem added to an old, closed situation |
| One arrival loop per person at a time | Two messages a second apart, on one channel or two, creating two situations for one problem |
| A claim from another situation is saved only as an arrival | A version in one situation that names another situation's worker as its writer |

<!-- PL-3; PL-6; PL-7; PL-9; PL-10; B3; decided by the owner, 2026-10-12: completed; AC-1; A8; Section 7: HC-2; decided 2026-10-22: identity and permission; B10; IB-16 -->

**14. What must be visible afterwards?**

Each arrival, with its channel's or outside system's reference, and its understanding artifact. Each ending, with the packages it was given (as references), and each routing result. Each reply decision and update decision. Each version written after a platform rule change. Each completion, with its reason. <!-- B7; O7; decided 2026-10-22: platform rule wake; PL-5 -->

**15. How do we know it is built correctly?**

| Test | A failure looks like |
|---|---|
| "hi" from a new number is answered, and no situation exists afterwards | a situation for "hi"; or no reply |
| "what's the capital of India?" gets a short answer that says nothing about the business | a situation; or a reply that mentions an order |
| "thanks!" the day after a refund closed gets no reply, and reopens nothing | a reopened situation; or a reply nobody needed |
| "what time do you close today?" is answered from the configured hours at once, and a situation records it | the worker woken before the prospect hears anything |
| A status question whose claim is stale goes to the worker | an old status told as current |
| "Any update?" from Meera, with three open orders, produces a question to her and a held note, and changes no situation | the message attached to one of the orders |
| Arjun's "the one I ordered in the Diwali sale still hasn't come" has its sale resolved to 20 to 24 October before anything is placed; the wider look is one date filter | his history searched for the word "Diwali" |
| "hi", then a second later "where is my parcel?" from one person, gets one reply | two replies |
| The same arrival delivered twice is acted on once | two replies to one message |
| A situation with a wait still running cannot be set to completed | Meera's situation completed while her refund wait runs |
| A message whose text claims another business is still placed under the business of its checked sender | a run started under the business the text names |
| After WhatsApp changes a rule, only the situations with a step pending on WhatsApp get a version saying so | every open situation woken |
| Two messages from one new number, a second apart, end on one situation | two new situations |
| Arjun writes on WhatsApp and on email in the same second | two runs at once, and two situations |
| An instruction to contact thirty people creates thirty situations and one central situation; a person asking for a meeting reaches the business owner, and a routine reply does not | the business owner told of every reply |

<!-- PL-5; PL-7; PL-9; PL-10; B3; B9; S12; decided by the owner, 2026-10-12: completed; AC-1; B10; B6; IB-17; C7; N37; IB-22 -->

The cases are walked in the Level 2 [product loop tests](../../../Level%202/the_product_loop/the_product_loop_design_tests.md).

**16. What is still open?**
- The exact form of the "reopened" mark is left to whoever builds the record (deferred to implementation). <!-- A8 -->
- The currentness rule for each kind of claim is deferred to configuration. <!-- PL-10 -->
- The limits (passes, repairs) are deferred to Level 3. <!-- PL-10 -->
- Four calls await the project owner's confirmation: three in the reply decision, and answering at once from a fact the business configured (the 5 September ruling covered a situation's own facts). <!-- PL-8; PL-10 -->

**17. Where did this come from?**
- **Section 12:**
  - [the parts file](../boundary_view/the_parts.md) (the boundary decision);
  - [the interactions file](../interaction_view/the_interactions.md) (interactions 1, an arrival; 8, telling a person; 14, completed; 15, reopened; 16, an unrequested document; 17, one instruction for many; 27, an arrival not about the business);
  - [the records file](../state_view/the_records.md);
  - [the decisions file](../decision_view/the_decisions.md): decisions 2, 4, 5, 13, 20, 24, 25, and 34 to 37 (the product loop);
  - the responsibility view's [routing](../responsibility_view/understanding_and_routing.md) and [situation](../responsibility_view/the_situation.md) files.
- **Level 2:** [the product loop](../../../Level%202/the_product_loop/how_does_the_product_loop_work.md); the understanding pages; the communication page "When should Tend communicate?".
- **The harness study:** Part 5, the 5 September ruling.
