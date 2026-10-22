# Improvement

This file is for whoever builds improvement. It can be built from this file alone. It says what the part must do, not what technology builds it.

**Statuses.** A rule is **Decided** unless one of these words sits beside it: **Provisional** (a working choice with a condition for reopening it), or **deferred to configuration**, **deferred to Level 3**, or **deferred to implementation** (a value or a detail left, on purpose, to each business or market, to the stage that chooses the technology, or to whoever builds it; the rule around it is Decided). The project owner is the person designing Tend. On 2026-10-22 the project owner accepted every recommendation this design had made, and asked for the smaller questions inside them to be settled in the way that best fits; those points are Decided. A rule marked as "the design's reading" was worked out from its sources rather than found written down; it is Decided too. The earlier words **To confirm** and **Open** are no longer used. "The business owner" means the person who runs the business Tend serves. <!-- decided by the owner, 2026-10-22 -->

**Words used here.** A **trace** is the saved record of one run of work. The **product team** is the people who build Tend. **Instruction templates** are the fixed text that puts Tend's instructions together for one step; memory owns and versions them, and improvement may edit them within set limits. The **core rules** are the text, written by people, that holds at every step: never guess; end each run honestly; state doubt with its reason; the AI may suggest but never decide. A trace is **verified** when a person or a fixed check has confirmed what it recorded. A **reference case** is a fixed example with a known right answer, including cases where Tend should refuse. **Training** means using records to change an AI model. <!-- O7; Level 2 prompt constitution: four layers; R3; Level 2 prompt constitution: the optimiser gates -->

**More words.** An **arrival** is anything that comes in from outside — a person's message, or an outside system's answer — saved as a new version. A **capability** is one action Tend can take, such as checking where a delivery is; each business switches on the ones it wants. <!-- decided 2026-10-22: the status-check answer; accepted call: capabilities -->

<!-- Every rule below carries its code in a hidden note. Its meaning, source, and status sit in code_index.md in this folder. -->

**1. What is this part for?**

It is how the product team makes Tend behave better for every business, from checked records of past runs. <!-- Section 7: improvement -->

**2. Why is it a separate part?**

Memory and improvement read the same records of past runs, but produce different things. Memory keeps one business's knowledge. Improvement changes the product's behaviour for every business. A lesson from one business's refunds, applied to every business, would change how every business is treated. The boundary decision is in [the parts file](../boundary_view/the_parts.md). <!-- Section 7 archive: improvement record; N15 -->

**3. What does it do?**
- Learns only from traces that a person or a fixed check has verified. <!-- R3 -->
- Proposes changes to the step instructions memory owns, within the limits memory sets. <!-- Section 7: improvement; R2 -->
- Keeps the traces it learns from apart from business memory. <!-- R1 -->

**4. What does it never do?**
- It never writes one business's rule into the instructions used for every business. <!-- Section 7: improvement -->
- It never builds business rules into the AI itself. <!-- R3 -->
- It never changes a business rule. <!-- Section 7: improvement -->
- It never changes any of these; people change them, through the product team:
  - a tool's description;
  - the core rules;
  - the rules for each stage of a run;
  - what each step is shown;
  - the fixed checks. <!-- Section 7 additions: optimiser limits; Level 2 prompt constitution: the optimiser boundary -->
- By default, it never uses a business's data to train AI models. <!-- Level 2 compliance: no training by default -->

**5. What does it own and write?**

Proposed changes to the step instructions memory keeps. The traces it learns from are kept apart from business memory. <!-- Section 7: improvement; R1 -->

**6. What does it decide, and what may it not decide?**

Nothing about any one business's work. A proposed change is used only after three things: it passes the fixed checks; it passes the reference cases; and people review it. No change is used until real traces exist.

| Decision | Who decides | Who acts | Who approves |
|---|---|---|---|
| Whether a change to the step instructions is used | Fixed checks, reference cases, then people | The product team | The people who review it |
| Whether a business's data trains a model | The business, in writing | The product team | The business |

<!-- Section 7: improvement; Level 2 prompt constitution: the optimiser gates -->

A business's data is used for training only with that business's written permission. <!-- recorded earlier: training permission -->

**7. What makes it change, and what makes it grow?**

It changes when a pattern across many past runs shows Tend making the same mistake at one step, and the product team changes how it learns from that. This is the design's reading. <!-- change drivers: improvement -->

**8. What starts it, what does it read, and what does it hand on?**
- **Starts it:** a run's trace being saved, which it learns from later; the product team, which starts each change to the instructions.
- **Reads:** verified traces, kept apart from business memory. No personal data is in a trace. <!-- R1; R3; settled page: no personal data in a trace -->
- **Hands on:** proposed changes to the step instructions, through the checks and the review. A change to the text, a tool, or the list of capabilities re-runs the tests before it is released. <!-- Level 2 prompt constitution: the optimiser gates; Section 8 additions: tests before release -->

**9. How does it work inside?**

The step instructions and the stage rules are versioned separately, because they have different writers; each trace records the version of both. <!-- Q9 -->
1. Verified traces are gathered, apart from business memory.
2. A change to the step instructions is proposed.
3. It passes fixed checks, the reference cases, and a review by people.
4. Only then is it released, after the tests re-run.

```text
verified traces ─▶ a proposed change to the step instructions ─▶ fixed checks ─▶ reference cases ─▶ people review ─▶ tests re-run ─▶ released
                                                                  any "no" ─▶ not used
```

A trace may be considered for training only when all three hold: <!-- Level 2 learning: training traces -->
1. the AI proposed one bounded piece of work: one step with a clear end;
2. fixed code checked that step;
3. an outcome anyone can see followed, such as a refund being paid.

Even then, it is not training material until someone can say what the trace proves. This whole rule is **Provisional**. <!-- Level 2 learning: training traces -->

**10. How does it behave in each kind of situation?**

Improvement is never part of a running situation: it works later, in the background. For every kind, it is not involved while the situation runs; afterwards, a verified trace of the run may inform a product change for every business. <!-- IB-14 -->

| Kind of situation | What improvement does |
|---|---|
| [1. An irreversible action's outcome stays unknown](../behaviour_view/kind_01_unknown_result.md) | Not involved while it runs |
| [2. An outside system is down, slow, or too stale](../behaviour_view/kind_02_outside_system_down.md) | Not involved while it runs |
| [3. A partial answer arrives](../behaviour_view/kind_03_partial_answer.md) | Not involved while it runs |
| [4. One instruction fans out to many people](../behaviour_view/kind_04_one_to_many.md) | Not involved while it runs |
| [5. No source and no person can answer](../behaviour_view/kind_05_no_source.md) | Not involved while it runs; the product team sees how often each missing capability is asked for |
| [6. A timer and a reply race](../behaviour_view/kind_06_timer_and_reply.md) | Not involved while it runs |
| [7. An unrequested document or unknown event arrives](../behaviour_view/kind_07_unrequested_arrival.md) | Not involved while it runs |
| [8. A message cannot be pinned to one situation](../behaviour_view/kind_08_unclear_message.md) | Not involved while it runs |
| [9. Two sources disagree](../behaviour_view/kind_09_sources_disagree.md) | Not involved while it runs |
| [10. A person does not act, or is unavailable](../behaviour_view/kind_10_person_silent.md) | Not involved while it runs |
| [11. An action needs approval, or must be refused](../behaviour_view/kind_11_approval_or_refusal.md) | Not involved while it runs |
| [12. The world changes while work is open](../behaviour_view/kind_12_world_changes.md) | Not involved while it runs |
| [13. Who is speaking is unknown or unverified](../behaviour_view/kind_13_unknown_speaker.md) | Not involved while it runs |
| [14. Work is blocked, interrupted, or wrongly closed](../behaviour_view/kind_14_blocked_or_reopened.md) | Not involved while it runs |
| [15. A human commitment changes shape](../behaviour_view/kind_15_human_commitment.md) | Not involved while it runs |

<!-- decided: the fifteen kinds; Section 7: improvement; IA-19 -->

**11. What are its key moments?**

For example, a change to how Tend words the end of a message is proposed from many verified traces. It is used only after the reference cases — including ones where Tend should refuse — still pass, and people have reviewed it.

**12. What happens when things go wrong?**

If improvement is down, it cannot change how Tend behaves now, any business's memory, any situation, or any permission. The records of past runs stay available, so it can catch up later. <!-- scratch: improvement unavailable -->

**13. Which rules must always hold here?**

| Rule | How a break would show |
|---|---|
| One business's rule never reaches every business | Every business refunding without approval because one business allows it |
| It edits only the step instructions | A changed core rule with no product release behind it |
| No business data trains a model by default | A model trained on a business that never gave written permission |
| A change is used only after checks, reference cases, and review | A new wording live with no review record |

<!-- Section 7: improvement; R2; Level 2 compliance: no training by default; Level 2 prompt constitution: the optimiser gates -->

**14. What must be visible afterwards?**

Each proposed change, the traces behind it, the checks it passed, and who reviewed it.

**15. How do we know it is built correctly?**
- A proposed edit to anything but the step instructions is refused. A failure looks like: a changed core rule with no product release behind it.
- A change that fails a reference case is not released. A failure looks like: a released wording that fails a refusal case.
- No trace used for improvement contains personal data. A failure looks like: Meera's address inside a trace.

<!-- R2; Level 2 prompt constitution: the optimiser gates; settled page: no personal data in a trace -->

**16. What is still open?**

Nothing in this part is open. When a trace counts as training material stays **Provisional**, with the other learning rules, until the project owner reviews the business's memory answers. <!-- Level 2 learning: training traces; Level 2 memory: pending review -->

**17. Where did this come from?**

[The parts file](../boundary_view/the_parts.md) (the boundary decision), [the interactions file](../interaction_view/the_interactions.md) (interaction 19, traces), and [the memory, configuration and improvement file](../responsibility_view/memory_configuration_and_improvement.md).
