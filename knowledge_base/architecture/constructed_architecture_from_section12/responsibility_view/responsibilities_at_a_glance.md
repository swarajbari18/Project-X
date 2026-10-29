# Tend's responsibilities, at a glance

This file answers one question: what is each of Tend's responsibilities, and how do they fit together?

A **responsibility** is a job Tend must do. Each one is told in full in the file linked under its heading. This file adds no rule. It gathers the rules from those files in one place, and the loop and the table at the end only arrange them.

Tend is the software that keeps a business's operational problems moving. Each problem is one **situation**: one late parcel, one refund, one message to a possible customer. <!-- A1 -->

Tend's job: when something changes a business situation, Tend works out what the change means and picks the correct next step. It keeps the work moving until the situation reaches a safe outcome, or until it hands the situation to a person and says why. <!-- Level 1: the job -->

Each rule here has one of these statuses:
- **Decided:** the project owner — the person designing Tend, not the business owner — said yes. On 2026-10-22 the project owner accepted every recommendation this design had made, and asked for the smaller questions inside them to be settled in the way that best fits; those points are Decided, and points settled that day say so. A rule marked as "the design's reading" was worked out from its sources rather than found written down; it is Decided too. <!-- decided by the owner, 2026-10-22 -->
- **Provisional:** a working choice that carries a condition for reopening it.
- **Rejected:** turned down on purpose, with the reason kept.
- **Deferred:** a value or a detail left, on purpose, to a later stage — **deferred to configuration** (each business or market sets it), **deferred to Level 3** (the stage that chooses the technology), or **deferred to implementation** (whoever builds it). The rule around it is Decided.

Two earlier status words, **To confirm** (written down, but not yet agreed by the project owner) and **Open** (no answer yet), are no longer used: since 2026-10-22, no rule here carries either.

A rule with no status word next to it is **Decided**: it has a source the project owner accepted. Every rule that is not Decided carries its word where it appears. Each responsibility below is Decided as a job Tend must do. Some details inside a responsibility are not decided yet; each carries its own word. In the rest of this file, "the owner" means the business owner.

<!-- Every rule below carries its code in a hidden note. Its meaning, source, and status sit in code_index.md in this folder. -->

## The parts that do the work

A **part** is a piece of Tend that does some of these jobs. One part can hold several responsibilities. There are ten parts; the intake step, listed below with them, is a step inside the conversation manager, not a part of its own. The parts are described in full in [the parts file](../boundary_view/the_parts.md).
- The **situation record** is the saved history of one situation, kept as a list of versions. It acts on nothing itself. <!-- Section 7: the parts -->
- The **conversation manager** reacts when something happens. It records each incoming message, decides whether a change is worth telling a person, and alone sets a situation to completed. It holds three smaller parts: the intake step, the situation worker, and the communication layer. <!-- Section 7: the parts; decided by the owner, 2026-10-10: what the conversation manager contains -->
- The **intake step** is the fixed step inside the conversation manager that reads each new message as it arrives. <!-- Section 7: the parts -->
- The **situation worker** reasons about one situation: it gathers what is needed, decides the next step, and writes what Tend concludes. <!-- Section 7: the parts -->
- The **communication layer** checks, sends, and records each message. <!-- Section 7: the parts -->
- The **tool layer** is the only way Tend calls an outside system. It checks permission before every call. <!-- Section 7: the parts -->
- The **status-check service** waits on a slow outside system and asks it for news, through the tool layer. Its answer comes back as an arrival (an arrival is anything that comes in from outside — a message, an outside system's answer — saved as a new version) on the wait it answers. <!-- Section 7: the parts; decided 2026-10-22: the service calls through the tool layer; decided 2026-10-22: the status-check answer -->
- **Memory and knowledge** runs beside every loop: before each part of a loop, it hands that part a package of what it needs to know. It keeps the links between situations, skills and procedures, and what Tend learned. It decides nothing, and writes no situation record except an erasure the erasure tool has confirmed. <!-- Section 7: the parts; N19; A15; U7 -->
- **Configuration** holds the business's settings and grants. Only the configurator's fixed tools write to it. <!-- Section 7: the parts -->
- The **owner view** builds the screens people open, from the saved records. It writes nothing. <!-- Section 7: the parts -->
- **Improvement** is how the product team makes Tend behave better, for every business. It never changes a business rule. <!-- Section 7: the parts -->
- The **observer** watches Tend itself and reports what it finds. It runs alongside the parts and is not one of the ten, nor inside any of them. <!-- Section 7: the parts; closed item: where the observer sits -->

## Words used in this file

- **The AI** suggests the next step. **Fixed code** is code that always makes the same check. The AI never decides alone. <!-- Level 2 security: the spine -->
- A **claim** is one statement from one source, with a time, such as the carrier's record "Shipment 8821 was delivered at 14:05". <!-- E1 -->
- A **wait** is a pause on a situation until one named thing happens. Its **limit** is the longest the wait may honestly last. The **book of waits** lists every open wait that may outlast a run, and what will end it; it is data kept with the situation records. <!-- H2; H8; decided 2026-10-22: the book of waits -->
- A **wake** is a signal that sends the situation worker back to one situation: a saved version's notice, a time signal, or the check-in. A **check-in** is the one regular wake each waiting situation gets, in case an earlier wake was lost. <!-- Level 2 time: the only regular wake --> A repeated job the business sets, such as reviewing stuck orders every morning, is its own situation, with a repeating wait; it wakes only itself. <!-- closed item: repeated jobs -->
- A situation is **blocked** when no safe step is left and no one is left to escalate to. It then waits for a person. <!-- Section 8 states -->
- A **channel** is one way of reaching a person: WhatsApp, email, Telegram, or the website chat. <!-- L1 -->
- The **permission check** is the fixed check before every step that changes anything outside Tend, or reveals information. It answers Allow, Deny, or "a person must approve first". <!-- T2 -->
- A **grant** is a range of steps a business allows Tend to take without asking. <!-- T3 -->
- The **configurator** is the person who sets the business up: the owner, or someone the owner names. <!-- G7 -->
- A **capability** is one action the business has switched on, such as checking where a delivery is. <!-- P1 -->
- A **trace** is the saved record of what happened during one run of work. The **audit** is the record of every important step, its evidence, and its reason. <!-- O7; T9 -->
- The **escalation path** is the business's own list of who to turn to next when work is not done. <!-- J5 -->

## How to read each entry

Each responsibility below gives eight facts, in the same order:
- **For:** what it is for.
- **Outcome:** what is true when it is done well.
- **Takes in:** what it starts from.
- **Passes on:** what it produces, and for whom.
- **Keeps:** what it remembers.
- **Decides:** who may decide, and who approves where a person must.
- **Done by:** which part does it.
- **When it goes wrong:** what happens instead.

<!-- method: the responsibility view's questions -->

One example runs through the entries. **Meera** asks a shop where her parcel is.

## 1. Keeping each problem as one record

Told in full in [the situation file](the_situation.md).
- **For:** one operational problem kept as one record, with its whole history. <!-- A1 -->
- **Outcome:** every problem has exactly one record. Every change is a new version; nothing is rewritten. <!-- A1 -->
- **Takes in:** what arrives from any channel, any system, or time passing. <!-- B1 -->
- **Passes on:** the newest version, which every part reads from; only the conversation manager and the situation worker write to it. <!-- Section 7: the parts never call each other -->
- **Keeps:** the situation's versions, its links to other situations, and its state: running, waiting, blocked, or completed. <!-- A3; states: liveness -->
- **Decides:**
  - The situation worker sets waiting or blocked.
  - Only the conversation manager sets completed, and only when no wait is open and the last message has gone out. <!-- decided by the owner, 2026-10-12 -->
  - Understanding the arrival decides whether a message reopens a closed situation; routing carries it out. <!-- A8; PL-3 -->
- **Done by:** the conversation manager and the situation worker, each writing into the situation record. <!-- Section 7 writer table: who writes what -->
- **When it goes wrong:** a wrongly closed problem is reopened, with its reason. A new problem gets a new, linked record. <!-- A8; A7 -->

## 2. Routing each change to the right problem, once it is understood

Told in full in [the understanding and routing file](understanding_and_routing.md).
- **For:** getting each change to the right situation before anything is gathered, from what the change was understood to mean. Meera's message goes to her parcel's situation. <!-- B2; C7 -->
- **Outcome:** each change is attached to its situation, starts a new one, or is held; or it ends without a situation: answered (not about the business), kept (nothing to do), or answered at once from what Tend holds and placed, marked. <!-- B4; C9; PL-5 -->
- **Takes in:** a message, an instruction, a system report, an agent's result, or time; and, for an arrival with words, its understanding artifact. <!-- B1; C8; PL-3 -->
- **Passes on:** the attached, new, or held change. Its new version wakes the situation worker. <!-- B4; Section 7: how the two parts work together -->
- **Keeps:** the incoming record, with the platform's reference to the original message. <!-- B7 -->
- **Decides:** understanding the arrival says where each ask fits; fixed code chooses the ending; routing, fixed code, carries it out. <!-- B4; PL-5; PL-6 -->
- **Done by:** the conversation manager. <!-- Section 7 writer table: who writes what -->
- **When it goes wrong:** when understanding cannot tell, Tend asks the sender; it never guesses. A wrong routing is split, linked, or rerouted later. A merge joins two situations that are one problem, and is recorded. <!-- B3; B4 -->

## 3. Understanding the change first, and what it adds

Told in full in [the understanding and routing file](understanding_and_routing.md).
- **For:** understanding each change before anything acts on it, routing included: understanding the arrival first (the conversation manager's one AI stage, which writes the understanding artifact), then, when there is new content to place, understanding the situation (the worker's first stage). <!-- C7; C8; C1; PL-3; PL-11 -->
- **Outcome:** the situation shows what was observed, claimed, inferred, and decided, kept apart. "The carrier says delivered" is not "Meera received it". <!-- C4 -->
- **Takes in:** the arrival, with memory and knowledge's package of what its words mean in this business; then the routed change. <!-- C8; C1 -->
- **Passes on:** a new version of the situation, and what is still unresolved, sorted by what it blocks. <!-- C5 -->
- **Keeps:** uncertainty and ambiguity, recorded. A guess is never stored as a fact. <!-- C2 -->
- **Decides:** the situation worker decides what Tend concludes from new content. The understanding artifact is an interpretation, not a decision; it does decide which ending an arrival takes, through fixed code. <!-- Section 7 writer table: who writes what; C8; C10; PL-5 -->
- **Done by:** the conversation manager and the situation worker.
- **When it goes wrong:** an unresolved point stays visible. Nothing is assumed in its place. <!-- C2 -->

## 4. Gathering what the next step needs

Told in full in [the gathering file](gathering_and_trust.md).
- **For:** finding only the information that could change the next safe step. <!-- D1 -->
- **Outcome:** each needed fact comes from the source that holds it, with its source and time. Tend asks the carrier's tracking system where Meera's parcel is, and records the answer with its time. <!-- D4; D2; E1 -->
- **Takes in:** the open questions of the situation, and the business's list of sources. <!-- D2; D3 -->
- **Passes on:** claims, each with its source and time, to weighing evidence and then deciding. Its information plan stays in the situation for the next pass. <!-- E1; PL-12 -->
- **Keeps:** each claim. <!-- E1 -->
- **Decides:** the situation worker judges whether there is enough. Gathering never decides that. <!-- F5 -->
- **Done by:** the situation worker's gathering stage, through the tool layer and memory and knowledge's retrieval. It reads, and asks people only for information; it is passed when Tend already holds an answer that counts as evidence. <!-- Section 7: the parts; PL-12 -->
- **When it goes wrong:** if no system and no person can answer, Tend records that it cannot know this here. That is not a failure. Only that question stops; the rest of the situation goes on. <!-- D8; O10 -->

## 5. Weighing evidence and disagreement

Told in full in [the gathering file](gathering_and_trust.md).
- **For:** deciding how far each claim can be relied on, and keeping disagreements visible. <!-- E2 -->
- **Outcome:** Tend has no confidence score of its own. Each claim is known, unknown, conflicting, ambiguous, provisional, or stale, and each state carries its reason. <!-- E3; Level 2 trust: evidence states -->
- **Takes in:** claims from sources, people, and records. <!-- E1 -->
- **Passes on:** the picture of the evidence — facts, assumptions, conflicts, and unknowns — to the next step's decision. <!-- Level 2 trust: evidence context -->
- **Keeps:** both sides of a disagreement. The carrier says delivered; Meera says not received. <!-- E4 -->
- **Decides:** fixed code settles a conflict in a fixed order. The AI may only point it out. <!-- Level 2 trust: fixed code treats conflicts; E5 -->
- **Done by:** the situation worker.
- **When it goes wrong:** a conflict is settled first by a rule the business has written down; then by a correction from the source that holds the record; then by more evidence. Only when none of those settles a conflict that matters does it go to a person. <!-- E5 -->

## 6. Choosing the next step

Told in full in [the deciding file](deciding_and_permission.md).
- **For:** Tend choosing its own next step for the situation. <!-- F1 -->
- **Outcome:** one checked step: gather, ask, wait or watch for a change, tell, create work for a person or escalate, arrange a meeting, call an outside system, resolve, or stop safely. <!-- Level 2 decision: behaviours -->
- **Takes in:** the newest version of the situation, the evidence, the business's policy, deadlines, and who is available. <!-- Level 2 decision: decision context -->
- **Passes on:** the chosen step, written as a new version. <!-- Section 7 writer table: decision -->
- **Keeps:** the proposal, the facts it relied on, what is still uncertain, and why the step fits. <!-- Level 2 decision: what the AI proposes -->
- **Decides:** the AI suggests; fixed code checks; the situation worker writes the step. <!-- F2; Section 7 writer table: decision -->
- **Done by:** the situation worker.
- **When it goes wrong:** when no safe step is left and no one is left to escalate to, Tend stops safely, and the situation is shown as blocked with its reason. <!-- F4; Section 8: stop safely -->

## 7. Making sure each step is allowed

Told in full in [the deciding file](deciding_and_permission.md).
- **For:** checking, before anything happens outside Tend, that the step is allowed. A refund on Meera's order is checked before the payment provider is called. <!-- F6 -->
- **Outcome:** every step that changes anything outside Tend, or reveals information, has passed the permission check. <!-- T2 -->
- **Takes in:** the step, the person or part asking, the grant, the outside system's own permission, and the rules no setting can break. <!-- T3 -->
- **Passes on:** Allow, Deny, or "a person must approve first". <!-- T2 -->
- **Keeps:** every decision and action, in the audit, which is only ever added to. <!-- T9 -->
- **Decides:** fixed code, from the trusted permission store. The AI never approves its own suggestion. Above the business's refund setting, a named person approves. <!-- T5; F6; decided by the owner, 2026-10-12: refund setting -->
- **Done by:** the fixed check, run in the tool layer and the communication layer. <!-- Section 7: the parts -->
- **When it goes wrong:** Deny ends that proposal. Tend refuses honestly. It offers to raise the step with whoever can allow it; for a step against a hard rule, it says that nobody can. <!-- G4 -->

## 8. Keeping work alive over time

Told in full in [the time and people file](time_people_and_meetings.md).
- **For:** pausing a situation until one named thing happens, and waking it at the right moment. <!-- H2; H4 -->
- **Outcome:** no situation is forgotten or lost. <!-- Level 2 time: forgotten work -->
- **Takes in:** answers, changes, and time. <!-- H4 -->
- **Passes on:** a wake to the situation worker, never a message by itself. <!-- IB-1 -->
- **Keeps:** every wait that may outlast a run, in the book of waits, and one check-in per waiting situation. <!-- H8; Level 2 time: check-in; settled 2026-10-22: short waits -->
- **Decides:** the situation worker writes each wait, and sets its time signal — the alarm for the wait's due time. A wait a tool hands to the status-check service is declared by the tool and saved by the worker's fixed code. <!-- Section 7 writer table: waits; construction record, entry 21: writer question; decided 2026-10-22: the wait a tool declares; decided 2026-10-22: the book of waits --> Each business sets its own check-in interval. <!-- decided: check-in interval -->
- **Done by:** the situation worker, with the status-check service watching outside systems.
- **When it goes wrong:** past a wait's limit, a failure is recorded. In Meera's example, the carrier promised an answer within a day; after a day of silence, the wait is past its limit. If a wake is lost, the check-in still wakes the situation, just later. A waiting situation is never left with no one checking it. <!-- M2; H3; Level 2 coordination: a lost signal heals -->

## 9. Bringing people in

Told in full in [the time and people file](time_people_and_meetings.md).
- **For:** making the need for a person explicit, and keeping that person's part moving. <!-- J1 -->
- **Outcome:** each piece of work for a person has one responsible party at a time. <!-- J4 -->
- **Takes in:** the decision that a person is needed, and the business's rules for who gets the work and who covers for someone away. <!-- J3; J7 -->
- **Passes on:** a work item to the right person, through the communication layer. <!-- IA-14 -->
- **Keeps:** the work item: who is responsible, who approves, the deadline, and each change of hands. <!-- IA-14 -->
- **Decides:** the business's rules for who gets the work, its escalation path, and its cover rules. The method, in order: the business's routing rule, then cover, then its fallback. <!-- J3; closed item: routing method -->
- **Done by:** the situation worker creates the work; the conversation manager records the answer.
- **When it goes wrong:** silence is never treated as done. Tend first names what lies behind it, one of seven kinds: the request never arrived; it arrived but was not acknowledged; it was acknowledged but nothing moved; the person turned it down; the person is away; the person did the work but did not record it; or the work is no longer needed. Then the escalation path runs. <!-- J5 -->

## 10. Arranging meetings and contacting partners

Told in full in [the time and people file](time_people_and_meetings.md).
- **For:** booking meetings inside what each person agreed to. Contacting a partner, such as the carrier's own team, is separate: it happens only after escalation calls for it, and only when the business's policy allows it. <!-- K2; K4 -->
- **Outcome:** a meeting happens at a real slot, and its outcome creates the next piece of work. <!-- K1; K2 -->
- **Takes in:** each person's standing preference, the calendar, the business's rules, and the escalation path. <!-- K2 -->
- **Passes on:** a booked meeting; a partner contact carrying only what the partner may see, such as the tracking number and the problem. <!-- K1; K4 -->
- **Keeps:** each meeting as a wait, and each missed or moved meeting as an event. <!-- K1; K3 -->
- **Decides:** the business's rules decide who may take a meeting; each person decides when. <!-- Level 2 meetings: who is suitable -->
- **Done by:** the situation worker; the communication layer contacts the partner.
- **When it goes wrong:** a missed meeting has a next step. Repeated misses go once to a senior person; if the senior does nothing, the owner is told, and no new chain starts. <!-- K3; Level 2 meetings: the chain ends -->

## 11. Saying the right thing to the right person

Told in full in [the communicating file](communicating.md).
- **For:** telling a change that matters, honestly, to the person who should hear it, with only what they may see. <!-- I1; I2 -->
- **Outcome:** every message has a reason, fits the person's role, and says plainly what is uncertain or in dispute. Meera hears what was found and what happens next. <!-- I5; I6 -->
- **Takes in:** what the situation worker says should be said, and the conversation manager's choice to tell. <!-- I7; Section 8: update decision -->
- **Passes on:** a message, on a channel that allows it, to a person. <!-- L3 -->
- **Keeps:** a record of every message sent: the message, the reason, the evidence, the wait, and the result. <!-- Level 2 communication: the sent record -->
- **Decides:** the conversation manager decides whether to tell; the communication layer sends. <!-- Section 8: communicate -->
- **Done by:** the conversation manager and the communication layer.
- **When it goes wrong:** a message that would mislead or come too early waits. A failed send is retried only by the tool layer, with growing gaps between tries. A message that cannot be delivered is recorded, and the worker decides the next step. <!-- I3; M4; IA-10 -->

## 12. Following each channel's rules

Told in full in [the communicating file](communicating.md).
- **For:** sending only what each channel allows, with the consent it needs. <!-- L1; L2 -->
- **Outcome:** a reply stays on its channel. A new message uses the first channel that is available and allowed; where two are allowed at the same step of the order, the person's preferred channel goes first. <!-- L3; closed item: preferred channel in the order -->
- **Takes in:** each channel's rules, consent, and the person's preferred channel. <!-- L1; L2 -->
- **Passes on:** the chosen channel, to the communication layer. <!-- L3 -->
- **Keeps:** the consent records, apart from the conversation going on, written only by the communication layer's fixed consent code. <!-- L2; decided 2026-10-22: consent records -->
- **Decides:** the channel rules decide; the communication layer applies them. A withdrawal stops what the person withdrew, from the very next send. <!-- L3; consent withdrawal -->
- **Done by:** the communication layer.
- **When it goes wrong:** if no channel is available, Tend does not refuse. The person the business names for this chooses, or Tend waits for the customer to write. <!-- Level 2 channels: a routing outcome -->

## 13. Handling failure and recovery

Told in full in [the failure file](failure_and_recovery.md).
- **For:** saying, on the record, when a path stops working, and moving to the next safe step without guessing. <!-- M1 -->
- **Outcome:** no hidden failure, and no step that cannot be undone repeated on a guess. <!-- Level 2 failure: no silent state; IB-10 -->
- **Takes in:** a wait past its limit, a source that went away, or an outcome nobody knows. <!-- Level 2 failure: three forms -->
- **Passes on:** a declared outcome, a retry inside the tool layer, or a handoff to a person with the whole history. <!-- M2; M4; M6 -->
- **Keeps:** each failure as a recorded event. A failure never becomes a state of its own; the situation stays running, waiting, blocked, or completed. <!-- M1 -->
- **Decides:** fixed code sorts each failure in a fixed order. The AI may argue what a failure means for the business. <!-- M3; Level 2 failure: the AI argues, fixed code decides -->
- **Done by:** the situation worker declares it; the tool layer retries transient failures, never a step that cannot be undone.
- **When it goes wrong:** when no safe step is left and no one is left to escalate to, the situation is shown as blocked, with its reason. In Meera's example, the carrier's tracking is down past its limit: Tend records the failure, tells Meera honestly, and the business's escalation path runs. <!-- Section 8 states; M2 -->

## 14. Memory and knowledge: context, links, and learning

Told in full in [the memory and knowledge, configuration and improvement file](memory_configuration_and_improvement.md).
- **For:** handing each part of each loop the knowledge it needs before it runs, linking situations, and learning how to work better for one business. <!-- N1; N3; N19; A15 -->
- **Outcome:** Tend gets better at its own work. No rule, permission, or approval is ever changed by learning. <!-- N3; decided 2026-10-03: the learning ban -->
- **Takes in:** at each point, what the loop holds; each version's notice; traces of past work, read after each save. <!-- IB-12; IB-15; IB-18 -->
- **Passes on:** a package before each part of each loop; links; candidates for settings to the configurator. <!-- N1; N13; N19; A15 -->
- **Keeps:** links between situations; lessons, business words, business events and learned subjects; skills and procedures, versioned; its indexes; each with its origin and scope. <!-- N16; N26; A15; Level 2 memory: the kinds -->
- **Decides:** fixed code checks each lesson. Each business chooses whether learning is on, off, or checked by a person. <!-- N6 -->
- **Done by:** memory and knowledge.
- **When it goes wrong:** a lesson that makes things worse can be undone. Knowledge with nothing that fits never blocks a decision. If its package does not arrive, the loop waits a set time, then the step goes to a person; if only its AI part fails, the fixed items still arrive. <!-- Level 2 learning; N31 -->

## 15. Holding the business's settings, and handling change

Told in full in [the memory and knowledge, configuration and improvement file](memory_configuration_and_improvement.md).
- **For:** keeping the business's own decisions — settings, policies, workflows, and grants — as checked records. <!-- Q1 -->
- **Outcome:** each situation knows which version of each rule governs it. <!-- Level 2 growth: the rule context -->
- **Takes in:** the configurator's choices; the product team's capabilities and the fixed forms each setting must have. <!-- Level 2 growth: who decides what -->
- **Passes on:** the settings in force, each read at its own time. A business policy is fixed when a situation opens. The refund setting is the one exception: it is read each time a refund is tried. A grant is checked live, at the step. <!-- Q3; decided by the owner, 2026-10-10: refund setting read at attempt -->
- **Keeps:** each setting as a typed, versioned record. <!-- Q1 -->
- **Decides:** only the configurator, through fixed tools. A second person approves each change to compliance settings. Configuration also writes membership and channel bindings. <!-- G7; accepted call: compliance settings; decided 2026-10-22: identity and permission -->
- **Done by:** configuration.
- **When it goes wrong:** a missing setting or capability is shown as a gap, never refused silently. A setting that would cross a rule no setting can break is refused, and shown. <!-- Q4; Level 2 growth: the hard line -->

## 16. Improving the product

Told in full in [the memory and knowledge, configuration and improvement file](memory_configuration_and_improvement.md).
- **For:** making Tend behave better for every business, from checked traces. <!-- R3 -->
- **Outcome:** better behaviour, with no business rule ever built into the AI. <!-- R3 -->
- **Takes in:** traces, kept apart from memory and knowledge. <!-- R1 -->
- **Passes on:** changes to how Tend assembles its instructions for each step, after fixed checks, reference cases, and a review. <!-- R2; Level 2 prompt constitution: the optimiser gates -->
- **Keeps:** no business's data for training, by default. <!-- Level 2 compliance: no training by default -->
- **Decides:** the product team. People keep the core rules. <!-- R2 -->
- **Done by:** improvement.
- **When it goes wrong:** a change is not used until it passes the checks, and the tests are run again. <!-- Section 8 additions: tests before release -->

## 17. Showing the work to the people who need it

Told in full in [the business view file](business_view_and_capabilities.md).
- **For:** showing each person the state of the work as screens to open, not a wall of chats. <!-- O1 -->
- **Outcome:** the business owner sees what is stuck, at risk, or needs them. Nothing waits to be found. <!-- O3; O9 -->
- **Takes in:** the saved records. <!-- O2 -->
- **Passes on:** screens for the owner, the administrator, and the product team. <!-- O2 -->
- **Keeps:** nothing of its own. It writes nothing. <!-- O2 -->
- **Decides:** each person's role decides what they see. <!-- T11 -->
- **Done by:** the owner view.
- **When it goes wrong:** a screen shows when it was last updated. The records stay the truth. <!-- O2 -->

## 18. Recording and explaining every important step

Told in full in [the business view file](business_view_and_capabilities.md).
- **For:** a complete record of every important step, so it can be explained and rebuilt. <!-- O7 -->
- **Outcome:** "why did Tend do this?" always has an answer from the record. <!-- O4 -->
- **Takes in:** each step, as it happens. <!-- O7 -->
- **Passes on:** explanations at each person's depth; a rebuilt story of any finished situation. <!-- O4; O5 -->
- **Keeps:** what was done, the evidence, the grant, the reason, and the outcome. <!-- O7 -->
- **Decides:** the part that takes the step writes its record. <!-- O7 -->
- **Done by:** each part, for its own steps.
- **When it goes wrong:** a step without its record is unfinished, and the record is written again. <!-- O7; recorded earlier: no separate checker -->

## 19. Watching Tend itself

Told in full in [the business view file](business_view_and_capabilities.md).
- **For:** noticing a fault in Tend before a customer does. <!-- O8 -->
- **Outcome:** drift in the AI, or in Tend's own steps, is found early. <!-- Level 2 explainability: two hulls -->
- **Takes in:** test questions, reference cases, and samples of real runs. <!-- Level 2 explainability: two hulls -->
- **Passes on:** findings, as changes, to whoever owns them. <!-- O8 -->
- **Keeps:** its findings, in the traces. <!-- Level 2 explainability: where findings go -->
- **Decides:** the observer reports; others act. <!-- O8 -->
- **Done by:** the observer. It runs alongside the parts, not as a part of its own, and not inside the situation worker. <!-- Section 7: the parts; closed item: where the observer sits -->
- **When it goes wrong:** a serious finding enters failure sorting. <!-- Level 2 explainability: where findings go -->

## 20. Working through the business's own systems

Told in full in [the business view file](business_view_and_capabilities.md).
- **For:** using the business's systems through capabilities, without owning their records. <!-- P1 -->
- **Outcome:** Tend keeps references; the business's systems stay the truth. <!-- P1 -->
- **Takes in:** the capabilities the business switched on. <!-- Level 2 security: default deny -->
- **Passes on:** calls through the tool layer, only when the grant and the rules allow. <!-- P3 -->
- **Keeps:** references, and a working copy of what it needs. <!-- P1 -->
- **Decides:** the business switches capabilities on; the product team builds them. <!-- Level 2 security: default deny; Level 2 growth: no AI-built connections -->
- **Done by:** the tool layer.
- **When it goes wrong:** a missing capability is said plainly, with what would fix it. <!-- P2 -->

## 21. The fixed code around the AI

Told in full in [the harness and compliance file](harness_and_compliance.md).
- **For:** running every step in one fixed order, with every suggestion checked before anything happens. <!-- S1 -->
- **Outcome:** the AI suggests; fixed code decides; every run stops in a known way. <!-- Level 2 security: the spine; S6 -->
- **Takes in:** a change or a timer. <!-- S1 -->
- **Passes on:** a checked step, run on one fixed path, and a saved version. <!-- S3 -->
- **Keeps:** the trace of each run. <!-- Section 8: the trace -->
- **Decides:** fixed code. <!-- Level 2 security: the spine -->
- **Done by:** the fixed code inside every part.
- **When it goes wrong:** a badly formed suggestion is sent back; a refused step does not run; a repeated change is dropped. <!-- S2; T2; S12 -->

## 22. Keeping each business's data apart, and keeping the law

Told in full in [the harness and compliance file](harness_and_compliance.md).
- **For:** keeping each business's data walled off, and keeping the law, the platforms' rules, and the rules of the businesses that buy Tend. <!-- U1; Level 2 compliance: one folder -->
- **Outcome:** one business never sees another's data; each market's rules are kept. <!-- U1 -->
- **Takes in:** a checked sender, and each market's legal values. <!-- Level 2 security: the control plane -->
- **Passes on:** which business a run belongs to, fixed once per run; a refusal for anything across the wall. <!-- T1 -->
- **Keeps:** each business in its own storage. <!-- Section 11: separate stores -->
- **Decides:** fixed code, from a checked sender — never from a message. <!-- Level 2 security: four sources of the business -->
- **Done by:** the fixed code inside every part; configuration holds the compliance settings.
- **When it goes wrong:** a fault in the walls between businesses, in permission, or in sending stops an update from going live. <!-- Level 2 security: what blocks a release -->

## How the responsibilities fit together

Every change travels the same loop. Meera's question shows it. <!-- Section 7: how the two parts work together -->
1. Meera asks where her parcel is. Routing attaches her message to her parcel's situation, and understanding records what it adds.
2. The new version wakes the situation worker. Gathering asks the carrier; weighing the evidence notes what is known and what is not. Memory and knowledge's package, before each part, hands over what helps.
3. Choosing the next step picks one step. The permission check allows it, refuses it, or asks a person first.
4. The step runs: a wait, work for a person, a meeting or a partner contact, a call through a capability, a message, or a safe stop.
5. The new version wakes the conversation manager. It decides whether Meera should hear the news now. The communication layer sends it, on a channel the rules allow.
6. At every step: the step is recorded, and the owner's screens show the result.
7. Whenever a path breaks: failure handling records it and moves on safely.
8. When a wait's timer ends, the situation goes back to step 2. When a person answers, the answer is a new message: it goes back to step 1, and is routed and understood first.

Around the loop sit the rules that do not change from step to step: the business's settings, the fixed code around the AI, and the walls between businesses. Watching Tend and improving the product run alongside. They never change a situation themselves. <!-- Section 7: the parts -->

A change to a situation never reaches another part by a direct call. It is saved as a new version, and the short notice that announces it wakes the next part. A part may still ask another for a read or a step: the loop waits for memory and knowledge's package, or the worker asks the tool layer; but nothing changes a situation until it is saved. <!-- Section 7: the parts never call each other -->

| Responsibility | Passes on to |
|---|---|
| 1. One record per problem | Every part reads the newest version |
| 2. Routing | Understanding the situation, for the update after routing |
| 3. Understanding | Routing, or an answer with no situation, after understanding the arrival; gathering; choosing the next step |
| 4. Gathering | Weighing evidence; the business's systems, through the tool layer, to ask |
| 5. Weighing evidence | Choosing the next step |
| 6. Choosing the next step | Permission, if the step has an effect outside Tend. Then the step that runs: gathering, time and waiting, people, meetings and partners, communicating, the business's systems, or failure. A resolved situation goes to the conversation manager, which sets completed. |
| 7. Making sure each step is allowed | The step it allows: a call through the business's systems, or a message. A step that needs a person goes to people, as work for an approver. A refusal goes back to choosing the next step. |
| 8. Keeping work alive over time | Choosing the next step, by waking it; failure, past a wait's limit |
| 9. Bringing people in | Communicating, which sends the work item; routing, because answers arrive as messages |
| 10. Meetings and partners | Keeping work alive over time, because each meeting is a wait; bringing people in, because a meeting's outcome creates the next work item |
| 11. Saying the right thing | Following each channel's rules; the record of each step; choosing the next step, when a message cannot be delivered |
| 12. Following each channel's rules | The person who receives the message |
| 13. Failure and recovery | Choosing the next step; people, for a handoff; the business view, for a blocked situation |
| 14. Remembering and learning | Routing, gathering, choosing the next step, and communicating (as background). Settings (as suggested changes) |
| 15. Settings and change | Choosing the next step, permission, and channels (each reads the settings) |
| 16. Improving the product | How Tend assembles its instructions for each step |
| 17. Showing the work | The owner, the administrator, and the product team |
| 18. Recording and explaining each step | Remembering and learning, improving the product, showing the work, and watching Tend |
| 19. Watching Tend | Failure, for a serious finding; the product team |
| 20. The business's systems | Gathering, as evidence; failure, when a system is down |
| 21. The fixed code around the AI | Every run |
| 22. Keeping data apart, and the law | Making sure each step is allowed, and the fixed code around the AI |

<!-- method: relationships between responsibilities -->

The full list of what Tend refuses to own, with who is in charge of each thing instead, is in [the non-responsibilities register](../checking/non_responsibilities_register.md). <!-- closed item: refusal register -->
