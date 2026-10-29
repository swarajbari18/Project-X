# The gap register

This register lists what the design did not yet say while this folder was written. A **gap** is a question a file needed answered, where no source answered it, or where the answer was only this design's reading. Each row names where the gap showed up, and how it was closed. <!-- method: the gap register -->

When a gap is closed, the design is changed first, any decision goes to the project owner (the person designing Tend, not the business owner), and only then is the part file rewritten. <!-- method: closing a gap -->

**What changed on 2026-10-22.** The project owner answered the seven blocking questions, and asked for the smaller questions to be settled in the way that best fits. Every gap below is now closed: answered by a decision, settled that day, or handed to the stage that sets its value. The answer to each is written in the file the row names, and listed in [the decisions register](decisions_register.md). <!-- decided by the owner, 2026-10-22 -->

Status words are the folder's four: Decided, Provisional, Rejected, and Deferred. Three deferral labels say who sets what is left: **deferred to configuration** (a value each business or market sets), **deferred to Level 3** (a technical choice for the next stage), and **deferred to implementation** (a detail for whoever builds it). "Q" numbers point to [the question backlog](question_backlog.md).

## The status-check service

| # | The gap | Where it showed up | How it was closed | Status | Backlog |
|---|---|---|---|---|---|
| 1 | Who writes a wait a tool hands to the status-check service | [status-check service](../build_view/status_check_service.md), question 8; [tool layer](../build_view/tool_layer.md), question 4 | The tool declares the wait; the worker's fixed code saves it, before the AI is told ([decision 19](../decision_view/the_decisions.md)) | Decided (project owner, 2026-10-22) | Q1 |
| 2 | Which code writes the service's answer into the situation | [status-check service](../build_view/status_check_service.md), question 3 | The intake step saves it as an arrival; the worker concludes, using the declaring tool's code ([decision 20](../decision_view/the_decisions.md)) | Decided (project owner, 2026-10-22) | Q2 |
| 3 | Whether the service calls outside systems through the tool layer | [status-check service](../build_view/status_check_service.md), question 9 | Through the tool layer, with no exception ([decision 21](../decision_view/the_decisions.md)) | Decided (project owner, 2026-10-22) | Q3 |
| 4 | The number of asks, the gap between them, and the total time | [status-check service](../build_view/status_check_service.md), question 9 | Set for each outside system when its tool is added, within its published limits; a business may tighten them | Deferred to configuration | Q4 |
| 5 | Whether a timer, or only the service's answer, wakes a situation to check an unknown result again | [situation worker](../build_view/situation_worker.md), question 16 | No timer asks again: the service's answer wakes the worker; when its limits run out, the wait's time signal wakes the worker to declare the outcome | Decided (settled 2026-10-22) | Q5 |

<!-- closed item: book of waits holder; construction record, entry 21: writer question; construction record, entry 21: return path; construction record, entry 21: parked call path; settled 2026-10-22: the service's limits; closed item: recheck timer -->

## Parts and records

| # | The gap | Where it showed up | How it was closed | Status | Backlog |
|---|---|---|---|---|---|
| 6 | Which part holds the book of waits | [the parts file](../boundary_view/the_parts.md) | Data kept with the situation records; the worker writes each wait and sets its time signal ([decision 22](../decision_view/the_decisions.md)) | Decided (project owner, 2026-10-22) | Q6 |
| 7 | What other parts do while the situation record, the situation worker, or the communication layer is down | [situation record](../build_view/situation_record.md), question 12; [communication layer](../build_view/communication_layer.md), question 12 | A rule for each, written in [the parts file](../boundary_view/the_parts.md) | Decided (settled 2026-10-22) | Q7 |
| 8 | What happens when memory and knowledge cannot be reached and its context is needed for a safe step | [memory and knowledge](../build_view/memory_and_knowledge.md), question 12 | The loop waits a set time for the package; then the step goes to a person (updated 2026-10-28) | Decided (settled 2026-10-22) | Q8 |
| 9 | Who writes consent records | [communication layer](../build_view/communication_layer.md), question 16 | The communication layer's fixed consent code ([decision 23](../decision_view/the_decisions.md)) | Decided (project owner, 2026-10-22) | Q9 |
| 10 | How each of the eleven labels the business owner sees is worked out | [the records file](../state_view/the_records.md) | A mapping table, in that file | Decided (settled 2026-10-22) | Q10 |
| 11 | Whether a legal deletion reaches the audit, which is only ever added to | [the records file](../state_view/the_records.md) | Each market's law decides; where it requires it, the audit gets the legal exception | Deferred to configuration | Q11 |
| 12 | The exact form of the "reopened" mark | [conversation manager](../build_view/conversation_manager.md), question 16 | A mark on the same record; its form is left to whoever builds it | Deferred to implementation | Q12 |

<!-- closed item: book of waits holder; settled 2026-10-22: part outages; settled 2026-10-22: memory unreachable; closed item: consent record writer; closed item: label mapping; closed item: deletion and the audit; A8 -->

## Behaviour

| # | The gap | Where it showed up | How it was closed | Status | Backlog |
|---|---|---|---|---|---|
| 13 | What happens if the sender never answers "which order do you mean?" | [kind 8](../behaviour_view/kind_08_unclear_message.md) | The message stays held, changing nothing; after the business's wait limit, a person places it | Decided (settled 2026-10-22) | Q13 |
| 14 | What the customer is told while a person takes up a question Tend has never met | [kind 7](../behaviour_view/kind_07_unrequested_arrival.md) | The update decision applies; an honest word before any promised time | Decided (settled 2026-10-22) | Q14 |
| 15 | Who the named person is for a question Tend has never met | [kind 7](../behaviour_view/kind_07_unrequested_arrival.md) | The business's own rules name the person | Decided (accepted 2026-10-22); the person: deferred to configuration | Q15 |
| 16 | What starts a handoff | [kind 15](../behaviour_view/kind_15_human_commitment.md) | One of three: the person asks; the cover rule applies; the escalation path moves the work | Decided (settled 2026-10-22) | Q16 |
| 17 | Which part wakes the open situations after a platform rule changes | [kind 12](../behaviour_view/kind_12_world_changes.md); [the interactions file](../interaction_view/the_interactions.md), interaction 21 | The conversation manager, reading the book of waits, wakes only the affected situations ([decision 24](../decision_view/the_decisions.md)) | Decided (project owner, 2026-10-22) | Q17 |
| 18 | How a meeting is booked in detail | [kind 15](../behaviour_view/kind_15_human_commitment.md) | The meeting capability's own steps, inside the two meeting waits: the wait for the person to choose a time, and the wait for the meeting itself | Deferred to implementation | Q18 |
| 19 | Which rule each of the observer's checks covers | [the rules that always hold](../constraint_view/the_rules_that_always_hold.md) | A mapping table, in that file | Decided (settled 2026-10-22) | Q19 |

<!-- closed item: unanswered routing question; closed item: telling the customer about an unknown event; closed item: who takes an unknown question; closed item: what starts a handoff; closed item: who wakes situations after a platform change; Section 11: meeting booking open; Section 8: the five kinds not mapped -->

## Identity, permission, and configuration

| # | The gap | Where it showed up | How it was closed | Status | Backlog |
|---|---|---|---|---|---|
| 20 | How a verified person is matched to their permissions while Tend runs | [conversation manager](../build_view/conversation_manager.md), question 16 | Membership, channel bindings, and a fresh sign-in for every step needing a person's permission ([decision 25](../decision_view/the_decisions.md)) | Decided (project owner, 2026-10-22) | Q20 |
| 21 | The exact set of configuration tools, and how the configurator's identity is checked | [configuration](../build_view/configuration.md), question 16 | The identity check: [decision 25](../decision_view/the_decisions.md). The exact tools: designed when built, doing at least the listed jobs | Decided (the check); deferred to implementation (the exact tools) | Q21 |
| 22 | How access is restored after the trusted permission store was unreachable | [configuration](../build_view/configuration.md), question 12 | Each held step is checked again from the start, against the live store | Decided (settled 2026-10-22) | Q22 |
| 23 | How long the business owner has to answer a policy notice | [configuration](../build_view/configuration.md), question 16 | Each business's value | Deferred to configuration | Q23 |

<!-- Level 2 identity: runtime join; Level 2 authority: configuration open; settled 2026-10-22: access after the store returns; Level 2 growth: open -->

## The decisions themselves

| # | The gap | Where it showed up | How it was closed | Status | Backlog |
|---|---|---|---|---|---|
| 24 | No other option written down for decisions 5, 6, and 18 | [the decisions file](../decision_view/the_decisions.md) | [Decision 18](../decision_view/the_decisions.md)'s options found in the business's compliance answers; those for decisions 5 and 6 written down at completion | Decided (settled 2026-10-22) | Q24 |
| 25 | No reopen condition written down for decisions 1, 4, and 12 | [the decisions file](../decision_view/the_decisions.md) | Written down at completion | Decided (settled 2026-10-22) | Q25 |
| 26 | What would make each part change was never worked out | Every part file, question 7 | Each part's reading, accepted | Decided (accepted 2026-10-22) | Q26 |

<!-- finding: options not recorded; finding: reopen condition not recorded; change drivers: situation record -->

## Other items the views carried

| # | The gap | Where it showed up | How it was closed | Status | Backlog |
|---|---|---|---|---|---|
| 32 | Who may throw the emergency switches | [the harness and compliance file](../responsibility_view/harness_and_compliance.md) | The business owner or the configurator, for one business; the product team with a second person, for all | Decided (settled 2026-10-22) | Q32 |
| 33 | How many questions Tend may ask in one situation | [the communicating file](../responsibility_view/communicating.md) | Each business's value, with a product default | Deferred to configuration | Q33 |
| 34 | Where the check that a draft is in the business's language sits | [the communicating file](../responsibility_view/communicating.md) | In the communication layer's send check | Decided (settled 2026-10-22) | Q34 |
| 35 | Which kind of Telegram connection Tend uses | [the communicating file](../responsibility_view/communicating.md) | A technical choice; either kind keeps the rules | Deferred to Level 3 | Q35 |
| 36 | Where a person's preferred channel fits in the order for a new message | [the communicating file](../responsibility_view/communicating.md) | Within one step of the order, it goes first; it never moves a channel ahead of the order | Decided (settled 2026-10-22) | Q36 |
| 37 | Which fallback sources a business allows, and how the "weaker" mark is shown | [kind 2](../behaviour_view/kind_02_outside_system_down.md) | Each business's sources; the mark's look is for whoever builds the screens | Deferred to configuration | Q37 |
| 38 | The full list of steps a conflict blocks | [kind 9](../behaviour_view/kind_09_sources_disagree.md) | The business's trust answers' list is the full list; a business may add more | Decided (settled 2026-10-22) | Q38 |
| 39 | What happens when a result is unknown and there is no way to check it | [the interactions file](../interaction_view/the_interactions.md) | Declared unknown at once; a person gets the full record; never repeated | Decided (settled 2026-10-22) | Q39 |
| 40 | Who counts as away, and whether their grant ends | [kind 12](../behaviour_view/kind_12_world_changes.md); [the records file](../state_view/the_records.md) | Away is known only from a source; a grant does not end because its holder is away | Decided (settled 2026-10-22) | Q40 |
| 41 | The full list of outcomes a situation can close with | [the situation file](../responsibility_view/the_situation.md) | Eight outcomes; a business may name finer ones | Decided (settled 2026-10-22) | Q41 |
| 42 | How a lead supplied from outside is treated | [the situation file](../responsibility_view/the_situation.md) | Each business's setting | Deferred to configuration | Q42 |
| 43 | Whether a reopen changes the person's relationship, and whether it re-checks the facts | [the situation file](../responsibility_view/the_situation.md); [kind 14](../behaviour_view/kind_14_blocked_or_reopened.md) | It re-checks the facts it relies on; it does not by itself change the relationship | Decided (settled 2026-10-22) | Q43 |
| 44 | Whether the step instructions and the stage rules are versioned separately | [improvement](../build_view/improvement.md) | Separately; each trace records both | Decided (settled 2026-10-22) | Q44 |
| 45 | The form of each reader's list of fields it may see | [communication layer](../build_view/communication_layer.md) | Left to whoever builds it; the rule does not depend on it | Deferred to implementation | Q45 |
| 46 | Whether "delivered but not received" is a situation of its own | [kind 9](../behaviour_view/kind_09_sources_disagree.md) | One conflict inside the delivery situation | Decided (accepted 2026-10-22) | Q46 |
| 47 | The full list of what Tend refuses to own, and who owns each instead | [the non-responsibilities register](non_responsibilities_register.md) | The problem statement's list is the full list; the register gives each one's owner | Decided (settled 2026-10-22) | Q47 |
| 48 | How Tend recovers when a change reaches only some of several linked situations | [kind 4](../behaviour_view/kind_04_one_to_many.md) | The change is saved once first; its writer resumes, skipping situations already done | Decided (settled 2026-10-22) | Q48 |
| 49 | How a new kind of situation enters the list | [how a situation moves](../behaviour_view/how_a_situation_moves.md) | When a walk shows a part behaving in a way no kind covers; the project owner approves it | Decided (settled 2026-10-22) | Q49 |

<!-- closed item: emergency switch holder; closed item: question limit; Level 2 prompt constitution: language check; closed item: Telegram bot kind; closed item: preferred channel in the order; Level 2 failure: partly down open; Level 2 trust: blocking triggers; Section 8 additions: no check path; Level 2 authority: grant end open; closed item: the closure outcomes list; A13; Level 2 journey: J9; closed item: reopen check; Q9; T11; construction record, entry 21: delivered-not-received; closed item: refusal register; closed item: fan-out recovery; closed item: new kinds -->

## Values each business or market sets (not gaps in the design)

These are not gaps in the design. The design holds whatever the values turn out to be. They are listed so none is forgotten. <!-- method: deferred to configuration -->

| # | The value | Where it is used | Status | Backlog |
|---|---|---|---|---|
| 27 | Each business's limits per run: steps, calls, and cost | [the decisions file](../decision_view/the_decisions.md), other decisions | Deferred to configuration | Q27 |
| 28 | Wait limits, check-in intervals, and each escalation path | [situation worker](../build_view/situation_worker.md), question 16 | Deferred to configuration | Q28 |
| 29 | How long the owner view may lag when a system is down | [owner view](../build_view/owner_view.md), question 16 | Deferred to configuration | Q29 |
| 30 | Each market's legal values, including how long the audit is kept | [the rules that always hold](../constraint_view/the_rules_that_always_hold.md), outside rules | Deferred to configuration | Q30 |
| 31 | Meeting limits, waivers, and expiry rules | [kind 15](../behaviour_view/kind_15_human_commitment.md) | Deferred to configuration | Q31 |

<!-- later files: proposal limits; Level 2 failure: the numbers; Section 7: owner view lag; Level 2 compliance: market values open; Section 8 additions: meeting values -->
