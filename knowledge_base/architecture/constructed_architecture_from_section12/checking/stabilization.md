# The stabilization record

This record answers one question: is the design stable enough to rely on? It is stable when two things are true. First, the sources agree on everything the design depends on, or every disagreement is settled and written down. Second, no known evidence would change a part, the part that writes a record, or a rule. <!-- method: stabilization -->

## The answer, on 2026-10-22

**Yes.** On 2026-10-21 this record said "not yet". The design still depended on seven questions that blocked completion, on fifteen conflicts between sources, and on calls nobody had reviewed. On 2026-10-22 the project owner — the person designing Tend — answered the seven questions, and accepted every other recommendation. They asked for the smaller questions to be settled in the way that best fits. Every file was then changed to match, and audited. <!-- decided by the owner, 2026-10-22 -->

## What is stable

- **The ten parts**, and why each stands apart. No question about time, failure, growth, or security needed a new part. The seven answers added none either: the book of waits (the shared list of every wait that may outlast its run) is data kept with the situation records, and the consent records (each business's list of consents, by contact point and kind of message) are kept by the communication layer. <!-- Section 9: no new boundary for dimensions; decided 2026-10-22: the book of waits; decided 2026-10-22: consent records -->
- **The path every change takes.** Every kind of situation was walked, step by step, through the same common path, and walked again after 2026-10-22. Where a kind leaves the common path, its file says how, and it returns to the same path. <!-- method: the path every change takes -->
- **Who writes what**, for every record and every change to a situation, in [the records file](../state_view/the_records.md). Each kind of change has one writer. <!-- Section 7 writer table: who writes what -->
- **The sixteen promises** in [the rules that always hold](../constraint_view/the_rules_that_always_hold.md), each with the place that keeps it true. <!-- Level 1: the invariants preface -->
- **The twenty-five decisions**, each with its reason, its options, and what would reopen it. <!-- decision view: decisions 1–25 -->
- **Every conflict between sources**, settled in [the conflict register](conflict_register.md), section 1.

## What is still provisional, by design

- (Until 2026-10-28, the memory rules that rested on answers marked "pending review" were listed here. Since 2026-10-28 they are Decided; see "The answer, re-checked on 2026-10-28" below.) <!-- Level 2 memory: pending review -->
- **How lessons are promoted** beyond advice. This is **Provisional**: lessons stay advice until a way to promote them is decided. <!-- decision record 9 -->

## What would make it unstable

New evidence that changes a part, the part that writes a record, or a rule; any answer from the project owner that changes a decision; or an earlier line outside this folder that turns out to apply. Each would change the design first, then every file that repeats the point, then be audited again. <!-- method: change after completion -->

Some earlier lines outside this folder still say what a later decision replaced. They are listed in [the conflict register](conflict_register.md), section 2. They do not change this folder; anyone reading those earlier files would meet them, so correcting them where they sit is worth doing.

## The answer, re-checked on 2026-10-28

On 2026-10-28 the project owner replaced the earlier picture of memory with **memory and knowledge**, and pointed to the business's written answers on memory and knowledge as the answers. The design is the Level 2 page "how memory and knowledge works with the loops"; decisions 26 to 31 carry it.

- **Still stable.** No part was added; memory and knowledge stays one part. Who writes what to a situation record changed in three small ways: two new kinds of arrival (a claim sent from another situation, and a person's update for an outreach's central situation), both saved by the conversation manager as before; links moved from the worker to memory and knowledge's own records; and one new write, an erasure the erasure tool has confirmed. Every rule that always holds still holds; new ones were added (memory and knowledge decides nothing; every search starts with the step's view; only presented tools are used; a worker never writes into another situation; decisions are made on the newest version).
- **Tested.** Thirty-five stories walked through the design in the Level 2 tests; all pass, with two known limits that are covered.
- **No longer provisional.** The memory rules that rested on answers marked "pending review" are Decided, because the project owner pointed to those answers on 2026-10-28.
- **Still provisional.** How a lesson could ever become more than advice.
- **Accepted cost.** Ten to twenty AI calls before a first reply, because memory and knowledge's AI part runs at every point. The technology stage measures it.

## The answer, reopened and re-checked on 2026-10-29

**Reopened.** The 2026-10-28 answer rested on stories that "all pass" by their results. The project owner then found that routing decided before "the Diwali sale" was understood: "You just disregarded understanding in itself." An audit of the whole conversation followed. Its registers of the owner's words and of Level 2, its trace, and its 24 defects are in `memory_and_knowledge_drafts/` (files 40 to 46).

- **Still stable.** No part was added. The conversation manager now writes a reading of each arrival before it routes, an interpretation, never a conclusion. The Section 7 rule had always said it "works out what an incoming message means". The worker understands new content before it plans or decides. Who writes what is otherwise unchanged.
- **Rules added:**
  - an arrival is understood before Tend acts on it;
  - routing's candidates come from the reading by exact values;
  - records shown stay inside each step's boundary, while the business's knowledge may help any step understand.

  These are in [the rules that always hold](../constraint_view/the_rules_that_always_hold.md).
- **Tested against process.** A rubric, a fixed list of questions, asks for every step: what it knew and from where; whether it understood before acting; whether claims stayed claims; whether memory and knowledge decided anything; whether another person's record was shown or hinted; whether retrieval filtered by what was understood; whether anything was keyed by channel; whether quotes are exact.
  - Before the fix, 12 of the 35 stories passed it, and 13 of 15 new break tests failed.
  - After the fix, all 50 pass: the 35 earlier tests and 15 written to break the design. One known limit is recorded: when a customer mistypes an order number as another of his own orders, one message can be placed on the wrong situation until his next reply corrects it.
- **Also found and fixed:**
  - a board, left in the routing responsibility file;
  - "whether a link is accepted", left in the situation record file's writers table;
  - a routing queue keyed by channel address.

  The first two had been missed on 2026-10-28.
- **Accepted cost.** Ten to twenty-three AI calls before a first reply. Routing's retrieval is cheaper: a filter, not a search.

**The answer:** stable enough to build on, again, as of 2026-10-29.

## The answer, reopened and re-checked later on 2026-10-29: the product loop

**Reopened.** The project owner read the memory and knowledge tests and still saw no understanding section before routing in the stories. He then rejected the loops' shape itself: "the loops do not look natural to me … I am first and foremost a product engineer." The loops had been drawn on the harness study's first drafts, one technical shape for the conversation manager and the worker, and every view carried them.

- **Still stable: no part was added.** The ten parts stand. The product loop's stages are components of loops inside the existing parts. A stage owns no record, so Section 7's rejection of one part per group of responsibilities still holds.
- **Changed inside the parts:**
  - **The conversation manager's work is two loops,** the arrival loop and the update loop. Its one AI stage is understanding the arrival; routing, the reply decision and the update decision are fixed code.
  - **The worker's run is the situation loop:** understanding the situation, gathering, weighing evidence, deciding, acting, each run only when it has something to do.
  - **Memory and knowledge** serves the stages that reason, and observes the rest.
- **Rules added**, in [the rules that always hold](../constraint_view/the_rules_that_always_hold.md):
  - routing uses no AI;
  - fixed code chooses each pass and ending, and the AI never decides to continue;
  - an arrival that is not about the business never becomes a situation, and is never learned from;
  - a reply to such an arrival carries no claim about the business;
  - an answer from what Tend holds uses only a current claim with no open conflict, or a configured fact;
  - gathering reads, and asks people only for information.
- **A lost ruling restored.** The project owner's ruling of 2026-09-05, that the conversation manager answers when the situation already holds enough, had never reached Sections 6 to 12. It is now an ending of understanding the arrival, with strict conditions.
- **Tested.**
  - The Level 2 product loop tests walk 37 cases, simple to very hard (a greeting, a general question, a thank-you, a business question the configuration answers, Arjun's Diwali message, the project owner's airport-refund question, a research brief, the thirty-contact outreach), and 8 attacks on the endings. All pass.
  - The 52 memory and knowledge tests were walked again under the stages. All pass, with the one known limit of test 26.
- **Accepted cost.** It now follows the message: 2 + 2 AI calls before the reply to "hi"; 4 + 4 for Arjun's Diwali message; research grows with the work, within limits. The morning's design took 10 to 23 for every business message.
- **Left with the project owner:** three calls in the reply decision, the answer from a configured fact, and one option not applied (answering "any update?" for every open situation at once, which would change decided rule B3).
- **Not changed:** Sections 6 to 11, on the project owner's instruction. One line there still lists routing before understanding (Section 6, "How the parts relate"); this folder governs.

**The answer:** stable enough to build on, as of later on 2026-10-29.

