# The constructed architecture

This folder holds Tend's written design. Tend is the product this project designs: software that runs a business's operational work — outreach, orders, deliveries, refunds — with a person in charge of every important decision.

The design here is built from the whole knowledge base during the earlier design sections, numbered 6 to 11, with Level 2 governing. Level 1 is the first and broadest layer: the problem framing and the product's promises. Level 2 is the folder of engineering answers the owner wrote. Where sources disagree, Level 2 wins. Level 3 is the next stage, where technology is chosen part by part. This folder is the reference Level 3 builds from. It earned that role on 2026-10-22, when [the completion record](checking/completion_record.md) said the design is complete.

The earlier design sections (6 to 11) sit in the parent folder. While this folder was written, they were the foundation it was checked against. Now that it is done, they are the history it links to. Nothing here is copied from them. Where a later decision replaced one of their lines, the line is listed in the conflict register, so it can be corrected where it sits.

**Updated later on 2026-10-29: the product loop.** The project owner asked for loops built from the product's own stages: "the loops do not look natural to me … I am first and foremost a product engineer", and "Routing, I don't think would be much of a LLM thing". Every view was reworked that day to the Level 2 page [how Tend's product loop works](../../Level%202/the_product_loop/how_does_the_product_loop_work.md). In brief:
- Tend's loops are four (arrival, situation, update, message), each made of stages.
- **The arrival loop.**
  - The conversation manager's one AI stage is understanding the arrival.
  - Routing is fixed code.
  - An arrival that is not about the business is answered, and starts no situation.
  - An arrival Tend can already answer is answered at once.
- **The situation loop** is understanding the situation, gathering, weighing evidence, deciding, acting, each run only when it has something to do.
- **Memory and knowledge** serves the stages that reason.
- **The effort a message gets** follows what it needs.

The decisions are 34 to 37 in [the decisions file](decision_view/the_decisions.md); the codes are the PL codes in each view's code index. The harness study (`knowledge_base/agent_harness_study.md`) was rewritten the same day as the catalogue of kinds of LLM interaction each stage may use inside it. Sections 6 to 11 were not changed. <!-- PL-1 -->

**Updated 2026-10-29: understanding comes first.** The project owner found that routing decided before "the Diwali sale" was understood. The conversation manager now writes a reading of each arrival before it routes, and routing's candidates come from it; the worker understands new content before it plans or decides; memory and knowledge uses the business's own knowledge to help any step understand, and shows each step only the records inside its boundary; the routing queue is per person. New decisions 32 and 33; every view is updated; the audit's working is in `memory_and_knowledge_drafts/` (files 40 to 46).

**Updated 2026-10-28.** The project owner replaced the earlier picture of memory with **memory and knowledge**, designed in the Level 2 page "how memory and knowledge works with the loops". Every view was updated that day; the build view's memory file is now [memory_and_knowledge.md](build_view/memory_and_knowledge.md); decisions 26 to 31 were added. An outreach now has a central situation instead of a board.

## The folders

Each folder holds one or more files. This map lists every folder and every file. Each new file is added here when it is written.

| Folder | The question it answers | Files |
|---|---|---|
| `responsibility_view/` | What must the system be responsible for? | [the_situation.md](responsibility_view/the_situation.md), [understanding_and_routing.md](responsibility_view/understanding_and_routing.md), [gathering_and_trust.md](responsibility_view/gathering_and_trust.md), [deciding_and_permission.md](responsibility_view/deciding_and_permission.md), [time_people_and_meetings.md](responsibility_view/time_people_and_meetings.md), [communicating.md](responsibility_view/communicating.md), [failure_and_recovery.md](responsibility_view/failure_and_recovery.md), [memory_configuration_and_improvement.md](responsibility_view/memory_configuration_and_improvement.md), [business_view_and_capabilities.md](responsibility_view/business_view_and_capabilities.md), [harness_and_compliance.md](responsibility_view/harness_and_compliance.md), [responsibilities_at_a_glance.md](responsibility_view/responsibilities_at_a_glance.md), [code_index.md](responsibility_view/code_index.md) |
| `boundary_view/` | What belongs together, and what does not? | [the_parts.md](boundary_view/the_parts.md), [code_index.md](boundary_view/code_index.md) |
| `interaction_view/` | How do the parts cooperate? | [the_interactions.md](interaction_view/the_interactions.md), [code_index.md](interaction_view/code_index.md) |
| `behaviour_view/` | How does the system behave over time, in each kind of situation? | [how_a_situation_moves.md](behaviour_view/how_a_situation_moves.md), [kind_01_unknown_result.md](behaviour_view/kind_01_unknown_result.md) to [kind_15_human_commitment.md](behaviour_view/kind_15_human_commitment.md) (one file per kind of situation), [code_index.md](behaviour_view/code_index.md) |
| `state_view/` | What is remembered, who writes it, and how does it change? | [the_records.md](state_view/the_records.md), [code_index.md](state_view/code_index.md) |
| `constraint_view/` | What must the architecture always preserve? | [the_rules_that_always_hold.md](constraint_view/the_rules_that_always_hold.md), [code_index.md](constraint_view/code_index.md) |
| `decision_view/` | Why was it built this way? | [the_decisions.md](decision_view/the_decisions.md), [code_index.md](decision_view/code_index.md) |
| `traceability_view/` | Where did each structure come from? | [the_chain.md](traceability_view/the_chain.md), [code_index.md](traceability_view/code_index.md) |
| `build_view/` | What do I build, part by part, and how do I know each part is right? | [overview.md](build_view/overview.md), [situation_record.md](build_view/situation_record.md), [situation_worker.md](build_view/situation_worker.md), [conversation_manager.md](build_view/conversation_manager.md), [communication_layer.md](build_view/communication_layer.md), [tool_layer.md](build_view/tool_layer.md), [status_check_service.md](build_view/status_check_service.md), [memory_and_knowledge.md](build_view/memory_and_knowledge.md), [configuration.md](build_view/configuration.md), [owner_view.md](build_view/owner_view.md), [improvement.md](build_view/improvement.md), [code_index.md](build_view/code_index.md) |
| `checking/` | Is it complete, traceable, and justified? | [decisions_register.md](checking/decisions_register.md), [gap_register.md](checking/gap_register.md), [conflict_register.md](checking/conflict_register.md), [non_responsibilities_register.md](checking/non_responsibilities_register.md), [question_backlog.md](checking/question_backlog.md), [stabilization.md](checking/stabilization.md), [audit_record.md](checking/audit_record.md), [construction_history.md](checking/construction_history.md), [completion_record.md](checking/completion_record.md), [blocking_questions.md](checking/blocking_questions.md), [code_index.md](checking/code_index.md) |
| (root) | What is in this folder, and where does each thing live? | [map.md](map.md) |

In the table above, "the system" means Tend. "A kind of situation" means one class of case from a fixed list of fifteen, where at least one part behaves differently than in the common case.

Nine of the folders are views. Each answers exactly one question. All nine describe one design seen from different sides, so they must agree. When two views disagree, the disagreement goes to the checking folder as a finding and gets fixed. It is never settled by taste.

The build view holds the overview file and one file per part. A part is one of the ten big pieces the design is made of. The boundary view names them: the situation record, the situation worker, the conversation manager, the communication layer, memory and knowledge, the owner view, the tool layer, the status-check service, configuration, and improvement. Two of them, the situation worker and the communication layer, sit inside the conversation manager, yet each has its own file. The conversation manager's file covers the manager's own acts — intake, routing, the update decision, and setting completed — and names the parts it contains.

Every part file uses one heading, and beneath it the same seventeen questions and answers, in the same order. That shape is **Decided** (2026-10-17). The questions come from the method's part-file list: what the part is for, why it is separate, what it does, what it never does, what it owns and writes, what it decides, what makes it change, what starts it, how it works inside, how it behaves in each kind of situation, its key moments, when things go wrong, the rules that must hold, what must be visible afterwards, how we know it is built correctly, what is still open, and where it came from.

The kinds of situation are shown in the build view's overview table and in each part file. The walks — the named stories beneath each kind — live with the behaviour view.

The `checking/` folder holds the lists and logs that keep the work honest: what is missing (gaps), what contradicts (conflicts), what Tend must not do (non-responsibilities), what was decided and when (decisions), how this folder was built (construction history), whether the source material still contradicts itself (stabilization), the audit reports, and what is still unfinished (completion). It also holds the question backlog, which gives every question the design had to answer one label. It also holds the analysis of the seven questions that once blocked completion, with the project owner's answers of 2026-10-22. The completion record says, on 2026-10-22, that the design is complete.

## How to read a file here

Each file has two layers. The visible text is for people. Inside the file there are also hidden notes — comments a person never sees — for AI agents. Each rule in the visible text carries a short label in a hidden note, for example A1. The label points to a row in that folder's code index. The row gives the rule's plain meaning, where it came from, and its status.

There is one code index per view folder, and one for the checking folder. Two things work differently. The build order is a recommendation, so it carries its own small series of labels. The checking folder records findings, and findings use finding labels, not rule labels.

Each fact has one authoritative place — the one file that says it in full. Every other place links to it, or repeats it word for word with a link back. A repeated sentence carries the home file's code.

The writing follows [the conversation constitution](../../../conversation%20with%20swaraj.md), at the root of the repository. One sentence carries one idea. The reader never needs an earlier conversation.

## The status words

Every rule carries one of these words. A rule with no word beside it is **Decided**. Where a rule came from is a separate question. That lives in the source column of its index row.

| Word | Means |
|---|---|
| **Decided** | The owner of this project said yes, and the construction record names the decision. On 2026-10-22 the owner accepted every recommendation of this design, and asked for the smaller questions to be settled in the way that best fits; those points are Decided too, and are listed in [the decisions register](checking/decisions_register.md), part 4. A rule marked as "the design's reading" was worked out from its sources rather than found written down; it is Decided too. |
| **Provisional** | A working choice that carries a condition for reopening it. |
| **Rejected** | Turned down on purpose. The reason is written down. |
| **Deferred** | A value or a detail left, on purpose, to a later stage: **deferred to configuration** (each business or market sets it), **deferred to Level 3** (the stage that chooses the technology), or **deferred to implementation** (whoever builds it). The rule around it is Decided. |

Two earlier words are no longer used. **To confirm** meant written down, but not yet agreed by the owner; **Open** meant no answer yet. Since 2026-10-22 no rule in this folder carries either. They still appear in the record of how the folder was built, which describes the folder as it stood before that day.

## Every write gets two audits

A file is finished when it has passed two audits. Each audit is done by an AI agent that did not write the file and has not seen the work that produced it.

The technical audit checks the reasoning against the whole knowledge base. Every claim carries a reference. A missing reference is reported by the auditor and added by the writer, because the auditor never edits the file. The insights drawn during the work are written down clearly, then checked for gaps, conflicts, missing pieces, and misunderstandings.

The readability audit checks the writing against the conversation constitution. Understanding these files should be hard only when the subject is hard, never because the sentences are.

The agent that wrote the file checks every finding against its source. It fixes the findings that hold. For each finding it rejects, it writes down which one and why. It runs the audit again if a fix changed meaning, not only wording. It records the result in the audit record.

## What is settled and what is not

The decisions are recorded in [the construction record](../construction_record.md), entry 21. If the construction record marks a point as not yet agreed or not yet answered, this folder does not treat it as settled either. No file here presents an unsettled point as decided.

After 2026-10-22, no point in this folder is unsettled. What remains is labelled for the stage that sets it: a value each business or market sets (deferred to configuration), a technical choice (deferred to Level 3), or a detail for whoever builds it (deferred to implementation). Since 2026-10-28 the memory and knowledge rules are Decided: the project owner pointed to the business's answers as the answers. How a lesson could become more than advice stays **Provisional**.
