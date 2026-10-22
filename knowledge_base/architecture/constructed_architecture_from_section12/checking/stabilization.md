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

- **The memory rules that rest only on the business's memory answers**, which are still marked "pending review". Each holds until the project owner reviews those answers, and each reopens alone; none changes a part, a writer, or a rule outside memory. <!-- Level 2 memory: pending review -->
- **How lessons are promoted** beyond advice. This is **Provisional**: lessons stay advice until a way to promote them is decided. <!-- decision record 9 -->

## What would make it unstable

New evidence that changes a part, the part that writes a record, or a rule; any answer from the project owner that changes a decision; or an earlier line outside this folder that turns out to apply. Each would change the design first, then every file that repeats the point, then be audited again. <!-- method: change after completion -->

Some earlier lines outside this folder still say what a later decision replaced. They are listed in [the conflict register](conflict_register.md), section 2. They do not change this folder; anyone reading those earlier files would meet them, so correcting them where they sit is worth doing.
