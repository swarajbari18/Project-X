# The decisions register

This register lists each decision Tend's design rests on, its reason in one line, and what would make us look at it again. It is for checking. The full reasoning lives in [the decisions file](../decision_view/the_decisions.md); this register points there and does not retell it. <!-- method: the decisions register -->

It has four parts:
- the twenty-five decisions;
- the calls the design made earlier, accepted by the project owner on 2026-10-22;
- the calls made while writing this folder, accepted the same day;
- the points settled on 2026-10-22, under the project owner's instruction to settle the smaller questions in the way that best fits.

Status words are the folder's status words, explained in [the map](../map.md): **Decided**, **Provisional**, **Rejected**, and the three deferral labels. The earlier words **To confirm** and **Open** are no longer used. The project owner is the person designing Tend; the business owner runs the business Tend serves.

**What happened on 2026-10-22.** The project owner answered the seven questions that had blocked completion, by accepting the recommended answer to each. In the same message, they accepted every other recommendation this design had made, and asked for the smaller questions inside them to be settled in the way that best fits. So every call in parts 2 and 3 is now **Decided**, and part 4 lists every point settled that day. Each can still be changed: say which, and the design is changed first, then every file that repeats it. <!-- decided by the owner, 2026-10-22 -->

## 1. The twenty-five decisions

| # | Decision | Its reason, in one line | Reopen if | Status |
|---|---|---|---|---|
| 1 | The AI suggests; fixed code decides | An instruction to the AI cannot stop text hidden in the business's own data from acting as an instruction | A step the business needs cannot be given a fixed check (written down 2026-10-22) | Decided |
| 2 | One container, three parts inside | Routing, deciding, and sending share one history | A part needs its own scaling or owner | Decided |
| 3 | Only the worker decides the next step; time wakes only the worker; the worker never sends | Time decides nothing; one decision to speak, not two | A timer must send with no record to read | Decided |
| 4 | The conversation manager decides whether to tell | The part that talks to people knows best whether a change is worth telling; the worker never sends | People are told too often, or too rarely (written down 2026-10-22) | Decided |
| 5 | Only the conversation manager sets completed | Completed means the customer has heard the end. A blocked situation the business stops is completed with the reason shown | A business needs some other end with no message | Decided |
| 6 | Every change is a new version, announced in the same run | Nothing rewritten keeps the history explainable | Storage becomes a measured problem | Decided |
| 7 | Steps outside Tend run through the tool layer, in a fixed order | A rule in fixed code cannot be talked around | An outside system gives a clear result for sends (this changes the detail, not the decision) | Decided |
| 8 | Permissions belong to checked people; only the configurator writes grants | A name or number is not proof; a stored copy can be stale | Approvals become unworkable | Decided |
| 9 | The refund setting starts at zero and is read at each refund | The business sets its own limit | The business's security answers are changed back to their earlier wording: every refund needs a person | Decided |
| 10 | Business policies fixed per situation; platform rules apply to open work | A promise is not changed silently; platform rules must apply now | The deadline default proves unsafe | Decided; its platform-rule point narrowed by decision 24 |
| 11 | Memory suggests; it never decides | A lesson can be wrong | A way to promote lessons is decided | Decided (how lessons are promoted: **Provisional**) |
| 12 | One situation per problem; linked, never merged | A customer has many problems, each with its own history | Linked situations contradict each other, or a journey can no longer be worked out (written down 2026-10-22) | Decided |
| 13 | A closed situation reopens only when its closure was wrong | Keeps the history; catches wrong closures | Wrong closures turn up often | Decided |
| 14 | A reply goes on the channel the person used; a new message on the first allowed channel; consent is per channel; a withdrawal stops what was withdrawn | Each platform has its own rules, and a person may agree to one channel but not another | A platform changes its rules | Decided |
| 15 | Each business has its own storage | One forgotten filter in a shared store leaks a business's data | Tend offers a free plan | Decided |
| 16 | The status-check service waits on outside systems | Unlimited checks waste calls and hide failures | A delivery company cannot answer within five calls | Decided |
| 17 | The owner view is built from the records, and writes nothing | One truth; a second copy drifts | The view is found out of date | Decided |
| 18 | A yearly outside security test now; a SOC 2 or ISO 27001 report only when a larger business asks, then certification if they keep requiring it | No law in the markets checked requires one | A new market's law requires one | Decided |
| 19 | A tool declares the wait it hands off; the worker's fixed code saves it, before the AI is told | The tool knows what is awaited; one saver per run | A part outside any worker run must create a wait | Decided (project owner, 2026-10-22) |
| 20 | The status-check service's answer is saved as an arrival by the intake step; the worker, using the declaring tool's code, concludes | No new writer; the answer is in the history before anything acts | One service's answers come so fast that the hop delays the work | Decided (project owner, 2026-10-22) |
| 21 | The status-check service calls out only through the tool layer; it decides when, the tool layer makes the ask | Only the tool layer holds the passwords and connection codes for outside systems; every ask passes the same permission check and is recorded in one place | An outside system can only be reached in a way the tool layer cannot carry | Decided (project owner, 2026-10-22) |
| 22 | The book of waits is data kept with the situation records; the worker writes each wait and sets its time signal | Kept with the situations, it cannot drift from them; it is a list that people and parts read, and it does nothing by itself | A rebuilt book disagrees with the live one | Decided (project owner, 2026-10-22) |
| 23 | The communication layer's fixed consent code is the only writer of consent records | It already holds each channel's rules and checks consent at every send | Tend connects to a registered consent manager, or a market's law asks for a different record | Decided (project owner, 2026-10-22) |
| 24 | After a platform rule change, the conversation manager wakes only the situations with a step pending on that channel | Meera hears before the new rule would stop her message; situations with nothing pending on that channel are not woken for no reason | A send is refused that could have been woken in time, or too many wake per change | Decided (project owner, 2026-10-22) |
| 25 | A checked person is matched to permissions through membership (their place in one business, with their roles) and channel bindings (their WhatsApp, Telegram, or email tied to that place); a fresh sign-in, within 15 minutes, for every step needing a person's permission | A channel proves the channel, not the person; leavers stop at once | Staff cannot use any sign-in provider, or a platform changes how it identifies users | Decided (project owner, 2026-10-22) |

<!-- decision view: decisions 1–25 -->

Every decision now has its other options written down, and its reopen condition. For decisions 5 and 6, the options were written down at completion, on 2026-10-22; decision 18's were found in the business's compliance answers. <!-- settled 2026-10-22: options and reopen conditions -->

## 2. Calls made earlier, accepted on 2026-10-22

These sixteen calls were made before this folder was written. Each is listed in [the decisions file](../decision_view/the_decisions.md), under "Calls this design made, accepted on 2026-10-22". Fifteen were accepted as written; one was changed. <!-- Section 11 §13: the calls -->

1. The AI runs only where fixed code does not already decide the step.
2. Where the business's answers say nothing, the problem statement applies.
3. A newer valid claim counts only as a correction.
4. If two versions of one policy clash, the one switched on most recently applies, and the clash is shown.
5. A policy deadline with no answer keeps the old version, and the business owner is asked again.
6. An approval lapses if the situation changes, or when the business's deadline for that kind of approval passes; it passes on only where a grant allows; with no response, it goes to the escalation path.
7. Approvals still waiting go back to the business owner.
8. A second person approves each change to compliance settings.
9. Tend's staff act inside a business only with a ticket, a time limit, a second approver, and a notice.
10. A customer is not asked to confirm before a staff member sees their record, unless the business adds that step.
11. Each disclosure to an investor or a regulator needs a named person's approval.
12. The business owner may stop an action that has not yet taken effect.
13. Moving something learned in one business to another needs the business owner's approval.
14. The product team writes the capabilities; each business switches on the ones it wants.
15. **Changed:** the observer is part of the situation worker. It now runs alongside the parts, not inside the worker, because it must notice a situation whose worker never wakes. <!-- changed call: the observer's seat -->
16. Setting up a new business is inside Tend's work when a set-up capability exists.

## 3. Calls made while writing this folder, accepted on 2026-10-22

The project owner told the writer on 2026-10-21 to finish this folder without stopping to ask. Where a choice was needed and no source settled it, the writer made the call below. Each is recorded in the construction record, entry 21. All were accepted on 2026-10-22. <!-- construction record, entry 21: full agency; decided by the owner, 2026-10-22 -->

**How statuses were read**
1. The fourteen [earlier decision records](../../section_11_decision_records.md) count as Decided. The [earlier stabilization](../../section_11_stabilization.md)'s verdict, "Stabilized", is not used as a basis on its own.
2. Rules resting only on the business's memory answers, still marked "pending review", are Provisional. This stays so until the project owner reviews those answers.
3. Rules from the research that appear in the concluding-audit additions of 2026-10-12 are Decided.
4. Where the construction record had left a rule unconfirmed, the mark was kept, even where an older file said Decided — until 2026-10-22, when every such rule was settled.
5. Every status legend uses one definition of Provisional: "a working choice that carries a condition for reopening it".

**Corrections made during the work, now settled**
6. Consent withdrawal: settled by decision 23 and part 4 below.
7. "The status-check service's asking alone never wakes a situation": settled by decision 21.
8. The book of waits holds every wait that may outlast a run: settled in part 4 below.

**Readings where the sources were silent**
9. What would make each part change: each part's line is the design's reading.
10. "Delivered but not received" is one conflict inside the delivery situation, walked under kind 9.
11. When a business policy changes, the same situation moves to the new version; no linked situation opens.
12. A message that may belong to a situation, but matches it weakly, is recorded as a "held note". It changes nothing in that situation.
13. The observer is "a regular check that runs alongside the parts".
14. An approval's answer is saved as an arrival by the conversation manager, and handed to the waiting tool step as its result (settled in [the conflict register](conflict_register.md), row 8, and written in the decisions file, "Other decisions").
15. A blocked situation has no check-in.
16. The person who takes a question Tend has never met is named by the business's own rules.
17. The reasons kept from the archived design are these: keeping the conversation manager thin, keeping memory apart from the worker, and keeping the owner view apart.

**Choices of shape**
18. A summary file of all twenty-two responsibilities, with what each passes to which, was added to the responsibility view.
19. Diagrams are plain numbered text lines, not drawings.
20. The build order, the first thin slice, and the order of later slices (one kind of situation each) are this design's recommendation.
21. The one-sentence problem in the build overview is this design's wording.
22. A kind of situation where a part does nothing special is marked "not involved beyond the common path" in that part's file, and "—" in the build overview's table. Improvement, which works outside any one situation, says "not involved while it runs".
23. The checking folder holds eleven files: this register, the gaps, the conflicts, the non-responsibilities, the question backlog, the stabilization record, the audit record, the construction history, the completion record, the analysis of the seven blocking questions, and the code index.

## 4. Points settled on 2026-10-22

The project owner asked for "the smaller questions inside" to be settled "with the appropriate decisions". Each point below was settled that way, and is **Decided**. Each says where it is written in full. <!-- decided by the owner, 2026-10-22 -->

**Inside the seven decisions**
1. A started step and the wait a tool declares for it are saved in one version. ([decision 19](../decision_view/the_decisions.md)) <!-- settled 2026-10-22: one version for a step and its wait -->
2. The limit of five counts per wait; a tool asks only where it knows how fast the outside system usually answers; a business may set its own number. Five stays the working bound the project owner approved on 2026-10-10. ([decision 16](../decision_view/the_decisions.md)) <!-- settled 2026-10-22: the five per wait -->
3. The status-check service's limits are set for each outside system when its tool is added, within that system's published limits; a business may tighten them. ([decision 16](../decision_view/the_decisions.md)) <!-- settled 2026-10-22: the service's limits -->
4. A wait that begins and ends inside one run is not written in the book of waits; any wait that may outlast the run is. ([decision 22](../decision_view/the_decisions.md)) <!-- settled 2026-10-22: short waits -->
5. Consent entries say given, withdrawn, expired, or refreshed, and keep their evidence. ([decision 23](../decision_view/the_decisions.md)) <!-- settled 2026-10-22: consent fields -->
6. An unclear sentence that may be a withdrawal counts as one until the person says otherwise; fixed code adds the entry. ([decision 23](../decision_view/the_decisions.md)) <!-- settled 2026-10-22: unclear withdrawal -->
7. What a withdrawal stops, by the words used: "STOP" on WhatsApp stops what the business starts on WhatsApp; "stop contacting me" stops what it starts on every channel. ([decision 14](../decision_view/the_decisions.md)) <!-- consent withdrawal -->
8. After a large platform rule change, wakes are released at a steady pace. ([decision 24](../decision_view/the_decisions.md)) <!-- settled 2026-10-22: steady pace -->
9. A fresh sign-in is one made within the last 15 minutes, as the sign-in provider records it; a business may shorten it. ([decision 25](../decision_view/the_decisions.md)) <!-- settled 2026-10-22: fresh sign-in -->
10. A changed WhatsApp identifier suspends a channel binding until it is proved again; moving a binding to another person needs the configurator. ([decision 25](../decision_view/the_decisions.md)) <!-- settled 2026-10-22: changed bindings -->

**The fifteen conflicts that were open until 2026-10-22** — each settled in [the conflict register](conflict_register.md), section 1. <!-- settled 2026-10-22: the open conflicts -->

**Parts and records** — in [the parts file](../boundary_view/the_parts.md) and [the records file](../state_view/the_records.md):
11. While the situation record, the situation worker, or the communication layer is down, each other part follows its own written rule for that case. <!-- settled 2026-10-22: part outages -->
12. When memory cannot be reached and a step is safe only with its context, that step is not taken: Tend waits for memory, or gives the step to a person. <!-- settled 2026-10-22: memory unreachable -->
13. When the trusted permission store is back after an outage, every held step is checked again from the start. <!-- settled 2026-10-22: access after the store returns -->
14. The status-check service keeps a record of its own asks for each wait it serves — how many, and when it may ask next — like the tool layer's record of tries. It learns of each wait from the wait's notice, reading the wait from the book of waits. The record is not a list of what situations wait for: it is never used to match an arrival, and it is rebuilt from the book after a restart; so the book stays the only such list. <!-- settled 2026-10-22: the service's own list -->
15. How each of the eleven labels the business owner sees is worked out from the records. <!-- closed item: label mapping -->
16. Whether a legal deletion reaches the audit is set by each market's law; where a law requires it, the audit gets the legal exception. <!-- closed item: deletion and the audit -->
17. The problem statement's list of what Tend does not own is the full list; [the non-responsibilities register](non_responsibilities_register.md) gives every entry, with its owner. <!-- settled 2026-10-22: the full refusal list -->

**Time, waiting, and failure** — in [the time and people file](../responsibility_view/time_people_and_meetings.md) and [the failure file](../responsibility_view/failure_and_recovery.md):
18. No timer asks an outside system again: the status-check service does the asking; if its limits run out, the wait's time signal wakes the worker, which declares the outcome. <!-- closed item: recheck timer -->
19. When a result is unknown and the outside system can neither be asked nor sends news, the outcome is declared unknown at once, and a person gets the full record. <!-- Section 8 additions: no check path -->
20. A wait is never without a bound: the capability's default applies, or the check-in serves as the bound. <!-- closed item: unset bound -->
21. A repeated job the business sets, such as a morning review of stuck orders, is its own situation with a repeating wait; the check-in stays the only regular wake of every other situation. <!-- closed item: repeated jobs -->
22. Before each step, every claim it relies on is checked against how long that kind of claim stays current; a source that sends no events is read when a step needs it. (written in [the gathering file](../responsibility_view/gathering_and_trust.md)) <!-- closed item: currency -->
23. A change that reaches several situations is saved once first, then written into each with the change's reference; a writer that stops part-way starts again and skips those already done. (written in [kind 4](../behaviour_view/kind_04_one_to_many.md) and [the conversation manager's build file](../build_view/conversation_manager.md)) <!-- closed item: fan-out recovery -->
24. Feedback is asked for only when the business sets a wait for it. <!-- H12 -->

**People** — in [the time and people file](../responsibility_view/time_people_and_meetings.md) and [kind 10](../behaviour_view/kind_10_person_silent.md):
25. The method for choosing a person: the business's routing rule, then cover, then its fallback. <!-- closed item: routing method -->
26. Tend learns a person is away only from a source, never from silence. <!-- Level 2 people: detecting absence -->
27. Each named reason for silence has its own next step. <!-- closed item: handling per kind of silence -->
28. The customer hears only what affects them when people inside the business have not acted. <!-- Level 2 people: telling the customer -->
29. A handoff starts in one of three ways; acceptance is explicit unless the business set an automatic rule; a handoff waits until a deadline the business sets; a manager may force one only where the business allows it; a forced handoff is recorded as forced. <!-- closed item: what starts a handoff; Level 2 people: handoff open -->
30. A confirmation counts as consent only when recorded as the consent records require; which steps need one is each business's setting. <!-- Level 2 people: confirmation open -->
31. The product gives base meeting types; a business may add its own; a meeting with a partner needs partner contact allowed, the escalation path reached, and the partner's contact and agreed times. <!-- Level 2 meetings: open -->

**Routing, communicating, and consent** — in the routing, communicating, and kind files:
32. A sender who never answers "which one do you mean?": the message stays held, changes nothing, and goes to a person after the business's wait limit. <!-- closed item: unanswered routing question -->
33. While a person takes a question Tend has never met, the customer hears what matters to them under the update decision, with an honest word before any promised time. <!-- closed item: telling the customer about an unknown event -->
34. A reopened run checks again every fact it relies on that may have changed; the reopen does not by itself change the person's stage. <!-- closed item: reopen check -->
35. A situation closes with one of eight outcomes; a business may name finer ones. (written in [the situation file](../responsibility_view/the_situation.md)) <!-- closed item: the closure outcomes list -->
36. The preferred channel never moves a channel ahead of the start order; within one step of the order, it is used first. <!-- closed item: preferred channel in the order -->
37. The language check sits in the communication layer's send check. <!-- Level 2 prompt constitution: language check -->
38. What a delivery receipt means on each channel is written in its rule record. A delivery receipt shows delivery only, and never proves that the person understood the message; where a channel reports that a message was read, that is recorded as its own state. A receipt that never comes leaves the delivery unknown. <!-- Level 2 communication: still to research -->
39. A conflict blocks a step under the conditions listed in the business's trust answers; a business may add more. <!-- Level 2 trust: blocking triggers -->

**Deciding and permission** — in [the deciding file](../responsibility_view/deciding_and_permission.md):
40. Each capability's safe default is part of its contract. <!-- closed item: capability defaults -->
41. Consistency is measured by the observer, comparing like situations. <!-- closed item: consistency measure -->
42. A grant names the kind of step, its target, and its limits. <!-- closed item: permission levels -->
43. A promise that obligates the business is never inside a grant. <!-- closed item: commitments in a grant -->
44. A grant change needs the configurator alone, unless the business requires a second person; compliance settings always need one. <!-- closed item: second person for grant changes -->
45. An approval stays usable until the situation changes or the business's deadline for that kind of approval passes. One answer from a group is enough, unless the business requires every member's. Past a number of approval requests each business sets, the business owner is told. <!-- closed item: approval details -->
46. How much of the "why" each person hears follows their field list. <!-- Level 2 refusal: open -->
47. A role change takes effect at the next permission check. <!-- Level 2 authority: grant end open -->
48. A grant does not end because its holder is away; while they are away, Tend does not treat them as the active holder, and cover and the escalation path apply. Level 2 had left this open. <!-- Level 2 authority: grant end open -->
49. Only the configurator's fixed tools write any grant, audit access included. (written in [the business view file](../responsibility_view/business_view_and_capabilities.md)) <!-- closed item: who grants audit access -->
50. Every read that discloses information passes the permission check; with no grant covering it, a person approves first. <!-- owner item 83: disclosing read -->

**Watching Tend, and the business view** — in [the business view file](../responsibility_view/business_view_and_capabilities.md), [the rules that always hold](../constraint_view/the_rules_that_always_hold.md), and [the harness and compliance file](../responsibility_view/harness_and_compliance.md):
51. The observer's checks are mapped to the five kinds of unexpected behaviour. <!-- Section 8: the five kinds not mapped -->
52. Anyone who may see a record may use the switch between its two renderings. <!-- closed item: who uses the switch -->
53. The business owner sets how owner notices are grouped, and the quiet hours. <!-- Section 8 additions: owner notices -->
54. The emergency switches: the business owner or the configurator for one business; the product team, with a second person, for all. <!-- closed item: emergency switch holder -->
55. The fixed points where rules from law, platforms, and buyers are checked. <!-- closed item: compliance checkpoints -->

**Memory, configuration, and improvement** — in [the memory, configuration and improvement file](../responsibility_view/memory_configuration_and_improvement.md):
56. The step instructions and the stage rules are versioned separately. <!-- Q9 -->
57. The business owner may answer a policy notice for one situation, or for all at once. <!-- Level 2 growth: open -->
58. The configurator's identity is checked like any member's, with a fresh sign-in for every configurator action. <!-- Level 2 authority: configuration open -->
59. What each kind of memory allows, and which learning measures apply in each mode, stay **Provisional**, like the other memory lists. <!-- Q8; owner item 27 -->

**The design's own records**
60. A new kind of situation enters the list when a walk shows a part behaving in a way no kind covers; the project owner approves it. <!-- closed item: new kinds -->
61. The options for decisions 5 and 6, and the reopen conditions for decisions 1, 4, and 12, are written down in the decisions file. <!-- settled 2026-10-22: options and reopen conditions -->

## Where each decision's reasoning lives

- The twenty-five decisions, in full: [the decisions file](../decision_view/the_decisions.md).
- The seven decided on 2026-10-22, with every option compared: [the seven blocking questions](blocking_questions.md).
- Where each came from: [the chain](../traceability_view/the_chain.md).
- What was missing, and how each gap was closed: [the gap register](gap_register.md).
- Where the sources disagreed, and how each was settled: [the conflict register](conflict_register.md).
