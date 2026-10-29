# The completion record

This record answers one question: is the logical design complete, so the technology stage can start from it? It has two parts: the completion matrix, which checks every area of the design, and the completion record itself. <!-- method: the completion matrix; method: the completion record -->

The matrix is a gate, not a score. One blocking issue stops completion, even if every other row is strong. <!-- method: the completion matrix -->

"The next stage" is Level 3: the stage where technology is chosen, part by part, starting from [the build view](../build_view/overview.md). "The project owner" is the person designing Tend.

**What changed on 2026-10-22.** On 2026-10-21 this record said NOT COMPLETE: seven questions blocked it. On 2026-10-22 the project owner answered all seven by accepting the recommended answers, accepted every other recommendation of the design, and asked for the smaller questions to be settled in the way that best fits. The answers are decisions 19 to 25 in [the decisions file](../decision_view/the_decisions.md); every other point settled that day is listed in [the decisions register](decisions_register.md), part 4. Every file was changed to match, then audited in full, then read again in a verification round. The findings that held were fixed. The audit record names each rejection and its reason. <!-- decided by the owner, 2026-10-22 -->

## 1. The completion matrix

| Area | The question | Answer | Where to check |
|---|---|---|---|
| Problem | Does the design still solve the problem it was made for? | Yes | [the chain](../traceability_view/the_chain.md) |
| Responsibilities | Is every important responsibility represented? | Yes: twenty-two | [the summary of responsibilities](../responsibility_view/responsibilities_at_a_glance.md) |
| Ownership | Is it clear who owns each thing? | Yes. Every record has one writer, including the four settled on 2026-10-22: a wait a tool hands to the status-check service, that service's answer, the consent records, and the book of waits | [the records file](../state_view/the_records.md) |
| Parts | Is every major part justified? | Yes: ten parts, each with its reason, and what would make each change | [the parts file](../boundary_view/the_parts.md) |
| State | Is it clear what is remembered, who writes it, and how it changes? | Yes | [the records file](../state_view/the_records.md) |
| Authority | Is it clear who decides, who acts, and who approves? | Yes, including how a checked person is matched to their permissions: membership, channel bindings, and a fresh sign-in for every step that needs a person's permission | [the decisions file](../decision_view/the_decisions.md), decision 25 |
| Information | Is it clear where information came from and who owns it? | Yes | [the gathering file](../responsibility_view/gathering_and_trust.md) |
| Interactions | Are the important interactions represented? | Yes: twenty-three, including who wakes open situations after a platform rule changes | [the interactions file](../interaction_view/the_interactions.md) |
| Behaviour | Can every important kind of situation be walked through? | Yes: all fifteen kinds, each with its walks, walked again after 2026-10-22 | [how a situation moves](../behaviour_view/how_a_situation_moves.md) |
| Failure | Can every important kind of failure be explained? | Yes, including what the other parts do while a part is down | [the failure file](../responsibility_view/failure_and_recovery.md) |
| Time | Are waits, deadlines, and timers represented? | Yes. Each business's numbers are deferred to configuration | [the time and people file](../responsibility_view/time_people_and_meetings.md) |
| People | Is it clear when and how people take part? | Yes, including what starts a handoff, and each kind of silence with its next step | [kind 10](../behaviour_view/kind_10_person_silent.md); [kind 15](../behaviour_view/kind_15_human_commitment.md) |
| External systems | Is it clear what outside systems own, and how Tend works with them? | Yes. Every call, the status-check service's asks included, goes through the tool layer | [the tool layer](../build_view/tool_layer.md); decision 21 |
| Constraints | Are the important constraints represented? | Yes | [the rules that always hold](../constraint_view/the_rules_that_always_hold.md) |
| Invariants | Can the rules that must always hold actually be kept? | Yes, each with the place that keeps it true. How the completion check is built is **Provisional** until the technology stage | [the rules that always hold](../constraint_view/the_rules_that_always_hold.md) |
| Scaling | Has relevant growth been considered? | Yes. No growth needed a new part | [the parts file](../boundary_view/the_parts.md) |
| Concurrency | Is it clear what happens when two things happen at once? | Yes: one run per situation at a time; a reply and a timer are walked through | [kind 6](../behaviour_view/kind_06_timer_and_reply.md) |
| Security | Is it clear who may see and do what? | Yes | [the harness and compliance file](../responsibility_view/harness_and_compliance.md) |
| Observability | Can what happened be rebuilt afterwards? | Yes; and the observer's checks are listed once, each mapped to the kinds of unexpected behaviour it catches | [the business view file](../responsibility_view/business_view_and_capabilities.md); [the rules that always hold](../constraint_view/the_rules_that_always_hold.md) |
| AI behaviour | Is it clear what the AI may suggest, what it may never decide, and what is checked? | Yes | [the decisions file](../decision_view/the_decisions.md), decision 1 |
| Evolution | Is it clear which part absorbs each likely change? | Yes: each part file says what would make it change, accepted on 2026-10-22 | every part file, question 7 |
| Evidence | Can each major claim be traced? | Yes: every rule carries its source in its view's index | [the chain](../traceability_view/the_chain.md) |
| Decisions | Is each significant choice justified? | Yes: twenty-five decisions, each with its reason, its options, and what would reopen it | [the decisions register](decisions_register.md) |
| Alternatives | Were real alternatives considered? | Yes. For decisions 5 and 6 the options were written down at completion, and say so | [the decisions file](../decision_view/the_decisions.md) |
| Unknowns | Is every remaining unknown visible and labelled? | Yes, including the problem statement's thirteen unknowns | [the question backlog](question_backlog.md) |
| Reopening | Is it clear what would reopen each decision? | Yes, for all twenty-five | [the decisions register](decisions_register.md) |
| Level boundary | Has technology stayed out of this design? | Yes: no storage, framework, or vendor is chosen. WhatsApp, email, Telegram, and the website chat are named because they are the problem's own channels. Each file's technical audit looked for technology leaking in | every view |
| Build clarity | Can each part be built from its part file alone, and does it cover every kind of situation? | Yes: each of the ten part files answers the seventeen questions and has a row for every kind | [the build view](../build_view/overview.md) |
| Audits | Has every file passed both audits? | Yes, including the full audit of 2026-10-22 | [the audit record](audit_record.md) |

<!-- method: the completion matrix -->

## 2. The completion record

```text
LEVEL 2 COMPLETION RECORD

Architecture:              Tend, constructed architecture, version of 2026-10-22
Purpose:                   Keep many business problems moving at once, each over days, across
                           messages, outside systems, people, and time — every step safe and
                           explainable, nothing forgotten — while an AI suggests each step and
                           fixed code decides whether it may run.

Responsibilities:          complete
Parts:                     complete
Ownership:                 complete
Authority:                 complete
State:                     complete
Interactions:              complete
Behaviour:                 complete
Failure behaviour:         complete
Timing:                    complete
Constraints:               complete
Invariants:                complete; how the completion check is built is Provisional
Dimensions:                reviewed
People:                    complete
External systems:          complete
Information ownership:     complete
Non-responsibilities:      complete — thirteen entries, the problem statement's own list
Evidence traceability:     complete
Decision traceability:     complete — twenty-five decisions
Build view:                complete
Audits:                    all passed; see the audit record

Remaining Provisional:     how a lesson could become more than advice. (Until 2026-10-28 this
                           line also listed the memory rules resting on answers marked "pending
                           review"; since 2026-10-28 they are Decided. See part 3.)
Blocking Level 2 questions: none
Conditions for reopening:  each decision's own condition, in the decisions register; the project
                           owner's review of this design; new evidence that
                           changes a part, a writer, or a rule

Status:                    COMPLETE
Reason:                    Every responsibility has a part, every record has one writer, every
                           kind of situation is walked through, every decision has its reason,
                           options, and reopen condition, and every file has passed both audits.
                           Nothing left changes a part, a writer, or a rule: the one Provisional
                           rule (lesson promotion) reopens alone, and every deferred item
                           is a value or a detail, not a design choice.

Next frontier:             Level 3, technical architecture, starting from the build view and
                           its build order. Earlier lines outside this folder that a later
                           decision replaced are listed in the conflict register, section 2,
                           so they can be corrected where they sit.
Next level:                Level 3
```

<!-- method: the completion record; method: closing the backlog -->

## 3. Update of 2026-10-28: memory and knowledge

The project owner rejected the earlier picture of memory and set the design of **memory and knowledge** (the Level 2 page "how memory and knowledge works with the loops", with its Level 1 framing and tests). Sections 6 to 11 and every view in this folder were updated on 2026-10-28; the build view's memory file was replaced by [memory and knowledge](../build_view/memory_and_knowledge.md). Decisions 26 to 31 were added, and decision 11 rewritten.

The "Remaining Provisional" line above is narrowed: the memory rules that rested on answers marked "pending review" are Decided, because on 2026-10-28 the project owner pointed to those answers as the answers. How a lesson could become more than advice stays Provisional.

Status: COMPLETE, as of 2026-10-28.

## 4. Update of 2026-10-29: understanding comes first

The project owner found that routing decided before "the Diwali sale" was understood, and asked for the whole conversation to be audited. The audit's registers, trace and defects are in `memory_and_knowledge_drafts/` (files 40 to 47).

Every view in this folder was updated:
- **Build view:** the conversation manager understands first and writes its reading; the worker understands new content; memory and knowledge's points, lookups, retrieval and visibility rules; the overview, the situation record and the communication layer.
- **Other views:** the boundary, interaction, state and constraint views (three new rules that always hold); the decision view (decisions 32 and 33); the traceability, behaviour and responsibility views.
- **Checking folder:** decisions register part 6, conflicts 24 to 27, and the stabilization re-check.
- **Every code index** gained the new codes.

Two misses from 2026-10-28 were also fixed: a board left in the routing responsibility file, and "whether a link is accepted" left in the worker's writers row.

Status: COMPLETE, as of 2026-10-29, once the readability audits are applied (see the audit record).

## 5. Update of later on 2026-10-29: the product loop

The project owner asked for Tend's loops to be built from the product's stages ("the loops do not look natural to me … I am first and foremost a product engineer"), for routing to be code, and for the harness study to be rewritten as the catalogue of kinds of LLM interaction. The working is in `memory_and_knowledge_drafts/` (files 48 to 53); the Level 2 answer is [how Tend's product loop works](../../../Level%202/the_product_loop/how_does_the_product_loop_work.md), with its tests.

Every view in this folder was reworked:
- **Build view.**
  - The overview: the path every change takes is now the product loop, and so is the build order.
  - The conversation manager: the arrival loop and its endings, routing as code, and the reply decision.
  - The situation worker: the situation loop's stages, and the information plan.
  - Memory and knowledge: packages by stage.
  - The communication layer: the message loop and the reply rule.
  - The situation record, configuration (currentness rules and the reply settings), the tool layer, the status-check service and improvement.
- **Other views:**
  - the boundary view's parts and responsibilities table;
  - the interaction view (interactions 1, 3, 4 and 8 rewritten; interaction 27 added);
  - the behaviour view (the common walk, and the fifteen kinds' wording);
  - the state view (the understanding artifact, the person's message history, the information plan);
  - the constraint view (six rules added);
  - the decision view (decisions 34 to 37);
  - the traceability view;
  - the responsibility view (understanding and routing rewritten; gathering, deciding, communicating, harness, memory, failure, and the summary updated).
- **Checking folder:** decisions register part 7, conflicts 28 to 34, and the stabilization re-check.
- **Every code index** gained the PL codes.

Sections 6 to 11 were not changed, on the project owner's instruction.

Status: COMPLETE, as of later on 2026-10-29, once the readability audits are applied (see the audit record).

