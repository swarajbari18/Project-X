# The question backlog

This file gives every question the design had to answer one label. The questions come from two places: the problem statement written before the design began, which lists the first questions; and the gaps found while this folder was written. <!-- method: the question backlog -->

The labels: <!-- method: the question backlog -->

| Label | Meaning |
|---|---|
| Resolved | The design contains a justified answer |
| Deferred to Level 3 | The logical answer is known; the technical way to build it is open |
| Deferred to implementation | The logical and technical answers are known; a detail is left to whoever writes the code |
| Deferred to configuration | The structure is known; the value is set per business or per market |
| Non-blocking unknown | The design holds whatever the answer turns out to be |
| Rejected | The question no longer applies, and the reason is recorded |
| Blocking | Level 2 — this logical design — cannot be completed until it is answered |

"Level 3" is the next stage, where technology is chosen part by part. A technical choice there must never silently answer an open question here. <!-- method: the question backlog -->

The AI that wrote this folder chose each label below, under the project owner (the person designing Tend, not the business owner)'s instruction of 2026-10-21 to finish without stopping to ask. On 2026-10-22 the project owner answered the seven questions labelled Blocking, and accepted the other labels with every other recommendation of this design. No question is Blocking now. <!-- construction record, entry 21: full agency; decided by the owner, 2026-10-22 -->

Some answers rest on the business's memory answers, which are still marked "pending review". Their label is Resolved, but their status is **Provisional**. <!-- Level 2 memory: pending review -->

## 1. The questions about the design itself

These are the questions the problem statement asks about the architecture. They are easy to miss, because they have no folder of their own. <!-- method: the question backlog -->

| Question | Label | Where it is answered |
|---|---|---|
| What are the major responsibilities that naturally belong together? | Resolved | [the parts file](../boundary_view/the_parts.md) |
| Where should the boundaries between subsystems exist? | Resolved | [the parts file](../boundary_view/the_parts.md) |
| Which responsibilities require independent lifecycles? | Resolved | [the parts file](../boundary_view/the_parts.md), "why it stays separate" |
| Which responsibilities require strong consistency? | Resolved | [the records file](../state_view/the_records.md): one writer per change; saved together |
| Which responsibilities can operate independently? | Resolved | [the interactions file](../interaction_view/the_interactions.md): parts never call each other |
| Which responsibilities coordinate other responsibilities? | Resolved | [the interactions file](../interaction_view/the_interactions.md) |
| Which responsibilities are event-driven? | Resolved | [how a situation moves](../behaviour_view/how_a_situation_moves.md) |
| Which responsibilities are request-driven? | Resolved | [the interactions file](../interaction_view/the_interactions.md): the owner view, built when asked |
| How should event-driven agency and request-driven work meet at the situation boundary? | Resolved | [how a situation moves](../behaviour_view/how_a_situation_moves.md): every change becomes a new version |
| Where should state exist? | Resolved | [the records file](../state_view/the_records.md); the book of waits is data kept with the situation records ([decision 22](../decision_view/the_decisions.md)) |
| Where should decisions be made? | Resolved | [the decisions file](../decision_view/the_decisions.md), decisions 1, 3, 4 |
| Where should coordination happen? | Resolved | [the interactions file](../interaction_view/the_interactions.md): through the situation record |
| What should be stateless — keeping nothing of its own between runs? | Deferred to Level 3 | The logical answer: every part reads its state from the saved records. How each part is built is the next stage's |
| What should be stateful? | Resolved | [the records file](../state_view/the_records.md) |
| What should be synchronous? | Deferred to Level 3 | The logical answer: a write and its notice happen in the same run; parts never call each other. The technical form is the next stage's |
| What should be asynchronous — going on while a reply is pending? | Deferred to Level 3 | The logical answer: every wake is a notice; the status-check service waits while the work goes on |
| What should be durable? | Resolved | [the records file](../state_view/the_records.md): versions, waits, the audit |
| What should be ephemeral? | Deferred to Level 3 | The logical answer: nothing a later run needs; a run's working state is rebuilt from the newest version |
| What should be observable? | Resolved | [the rules that always hold](../constraint_view/the_rules_that_always_hold.md); [the business view file](../responsibility_view/business_view_and_capabilities.md) |
| What is the best architecture to implement these responsibilities? | Resolved | This folder, as a logical design; its completion is in [the completion record](completion_record.md) |
| What technologies best implement that architecture? | Deferred to Level 3 | The next stage, starting from [the build view](../build_view/overview.md) |

## 1b. The unknowns the problem statement lists

The problem statement's section on unknowns asks thirteen questions about how businesses work. Each is answered by the design, or handed to each business's settings. <!-- Level 1: unknowns -->

| Question | Label | Where it is answered |
|---|---|---|
| How do businesses decide that they have enough information? | Resolved | [the deciding file](../responsibility_view/deciding_and_permission.md): "enough" is judged for each step, against what that step risks |
| Which business decisions can be standardised? | Resolved | [the deciding file](../responsibility_view/deciding_and_permission.md): which decisions can always be automated, and policies kept as fixed-shape records |
| How much variation exists between businesses? | Resolved | [the memory, configuration and improvement file](../responsibility_view/memory_configuration_and_improvement.md): each business fills its own values inside fixed shapes; the core stays the same |
| Which sources of information do businesses trust most? | Deferred to configuration | [the gathering file](../responsibility_view/gathering_and_trust.md): the source to rely on is chosen per kind of claim; each business sets its own order |
| How should conflicting information be resolved? | Resolved | [the gathering file](../responsibility_view/gathering_and_trust.md): a fixed order, then a person |
| When should a person become involved? | Resolved | [the deciding file](../responsibility_view/deciding_and_permission.md) and [the time and people file](../responsibility_view/time_people_and_meetings.md) |
| What information should be remembered? | Resolved | [the memory, configuration and improvement file](../responsibility_view/memory_configuration_and_improvement.md); its lists are Provisional |
| How do businesses explain their own decisions? | Resolved | [the business view file](../responsibility_view/business_view_and_capabilities.md): every step is recorded with its reason, and a person's choice is recorded with the authority they used |
| How should success be measured? | Resolved | Tend's own behaviour is measured by the observer's checks and by the learning measures, as counts, never a number the AI makes up; each situation records its outcome, so a business's results can be counted from the records ([the business view file](../responsibility_view/business_view_and_capabilities.md); [the memory file](../responsibility_view/memory_configuration_and_improvement.md)) |
| How will these needs change as businesses grow? | Resolved | [the parts file](../boundary_view/the_parts.md): no growth needed a new part; a larger business adds roles, narrows grants, and switches on more capabilities |
| How does a business decide when to follow up with a prospect? | Deferred to configuration | [the situation file](../responsibility_view/the_situation.md): each business sets the wait before a follow-up; Tend invents neither purpose nor target |
| Who is allowed to represent the business in a meeting with a customer? | Deferred to configuration | [the time and people file](../responsibility_view/time_people_and_meetings.md): the business's rules decide who may take each kind of meeting |
| When is the right time to ask a customer for feedback? | Deferred to configuration | [the time and people file](../responsibility_view/time_people_and_meetings.md): the business sets the wait after the customer has the product; with none set, Tend does not ask. A low rating goes to the staff member the business names, or by default to the business owner |

## 2. The questions by topic

Each topic's answers are gathered in one file of the responsibility view, named in the topic's heading. A row's note says where the answer comes from.


### Understanding the Situation

Answered in [the routing file](../responsibility_view/understanding_and_routing.md).

| Question | Label | Note |
|---|---|---|
| What does it mean to understand what an actor is asking or what an event changed, and how do we recognise when the stated problem is not the real problem? | Resolved |  |
| How do we determine whether multiple messages belong to the same situation, and whether two seemingly different conversations are actually related? | Resolved |  |
| How do we determine which information is relevant to the current situation, and which information should be ignored? | Resolved |  |
| How do we recognise ambiguity and uncertainty? | Resolved |  |

### Gathering Information

Answered in [the gathering file](../responsibility_view/gathering_and_trust.md).

| Question | Label | Note |
|---|---|---|
| How do we determine what information is required before making a decision? | Resolved |  |
| How do we know which actor owns each piece of information? | Resolved |  |
| How do we discover where information lives? | Resolved |  |
| How do we prioritise which information to retrieve first? | Resolved |  |
| How do we avoid retrieving unnecessary information? | Resolved |  |
| How do we know when information is sufficiently current? | Resolved |  |
| How do we handle information that arrives gradually? | Resolved |  |
| How do we handle information that changes while a situation is being analysed? | Resolved |  |

### Trust and Evidence

Answered in [the gathering file](../responsibility_view/gathering_and_trust.md).

| Question | Label | Note |
|---|---|---|
| How do we determine whether information should be trusted? | Resolved |  |
| How do we represent confidence without pretending certainty? | Resolved |  |
| How do we compare information from different sources? | Resolved |  |
| How do we identify conflicting information? | Resolved |  |
| How do we resolve conflicts? | Resolved |  |
| When should conflicts automatically stop the workflow? | Resolved |  |
| When should conflicts simply be presented to a person? | Resolved |  |
| What makes one source more authoritative than another? | Resolved |  |
| How do we distinguish facts from assumptions? | Resolved |  |

### Decision Making

Answered in [the deciding file](../responsibility_view/deciding_and_permission.md).

| Question | Label | Note |
|---|---|---|
| What does "enough information" mean? | Resolved |  |
| How do we determine whether Tend can make the next decision? | Resolved |  |
| Which decisions can always be automated? | Resolved |  |
| Which decisions must always involve a person? | Resolved |  |
| Which decisions depend on business policy? | Resolved |  |
| Which decisions depend on confidence? | Resolved |  |
| How do we represent business policies? | Resolved |  |
| How do businesses define approval rules? | Resolved |  |
| How do we ensure different employees reach consistent decisions? | Resolved | Consistency is measured by the observer, comparing like situations |

### Human Collaboration

Answered in [the time and people file](../responsibility_view/time_people_and_meetings.md).

| Question | Label | Note |
|---|---|---|
| When should Tend involve a person? | Resolved |  |
| How do we determine the correct person? | Resolved |  |
| How do we handle multiple people working on the same situation? | Resolved |  |
| How do we avoid interrupting people unnecessarily? | Resolved |  |
| How do we transfer work between employees? | Resolved |  |
| How do we represent ownership of ongoing work? | Resolved |  |
| What happens when nobody responds? | Resolved |  |
| What happens when the responsible person is unavailable? | Resolved |  |

### Memory and Knowledge

Answered in [the memory file](../responsibility_view/memory_configuration_and_improvement.md).

| Question | Label | Note |
|---|---|---|
| What should Tend remember? | Resolved | Provisional: rests on answers marked "pending review" |
| What should never become memory? | Resolved | Provisional: rests on answers marked "pending review" |
| What belongs in conversation history? | Resolved | Provisional: rests on answers marked "pending review" |
| What belongs in long-term business knowledge? | Resolved | Provisional: rests on answers marked "pending review" |
| How should previous conversations influence future decisions? | Resolved | Provisional: rests on answers marked "pending review" |
| How do we prevent outdated knowledge from influencing new decisions? | Resolved | Provisional: rests on answers marked "pending review" |
| How do we update knowledge when reality changes? | Resolved | Provisional: rests on answers marked "pending review" |
| Who owns business knowledge? | Resolved | Provisional: rests on answers marked "pending review" |
| Can Tend learn automatically? | Resolved | Provisional: rests on answers marked "pending review" |
| If so, what kind of learning is acceptable? | Resolved | Provisional: rests on answers marked "pending review" |

### Communication

Answered in [the communicating file](../responsibility_view/communicating.md).

| Question | Label | Note |
|---|---|---|
| When should Tend communicate? | Resolved |  |
| When should Tend wait? | Resolved |  |
| When should Tend ask a question instead of performing an action? | Resolved |  |
| When should Tend explain its reasoning? | Resolved |  |
| How much explanation should different users receive? | Resolved |  |
| How should communication differ between customers and employees? | Resolved |  |
| How do we communicate uncertainty? | Resolved |  |
| How do we communicate conflicting information? | Resolved |  |

### Authority and Ownership

Answered in [the deciding file](../responsibility_view/deciding_and_permission.md).

| Question | Label | Note |
|---|---|---|
| Which actor owns each type of information? | Resolved |  |
| Which actor owns each decision? | Resolved |  |
| Which actor owns each action? | Resolved |  |
| When is Tend allowed to perform an action? | Resolved |  |
| When must Tend ask for approval? | Resolved |  |
| Who may grant authority, and what authority does Tend have by default? | Resolved |  |
| What is the business configuration capability, and who holds it? | Resolved |  |
| Who remains accountable after an automated action, and how do we prevent responsibility from becoming unclear? | Resolved |  |
| How does a grant end, and how does authority change when an employee leaves, becomes unavailable, or changes role? | Resolved |  |
| How do identity and authority join, so that a verified person is the person the grant names? | Resolved | [Decision 25](../decision_view/the_decisions.md), 2026-10-22: membership, channel bindings, and a fresh sign-in |
| How should Tend communicate a refusal and offer escalation? | Resolved |  |

### Coordination

Answered in [the time and people file](../responsibility_view/time_people_and_meetings.md).

| Question | Label | Note |
|---|---|---|
| How do independent actors work together? | Resolved |  |
| How do events move work between independent actors and wake the correct situation? | Resolved |  |
| How do we coordinate long-running work? | Resolved |  |
| How do we know that a piece of work is still active? | Resolved |  |
| How do we represent work that is waiting? | Resolved |  |
| How do we represent work that is blocked? | Resolved |  |
| How do multiple business processes interact? | Resolved |  |
| How do we prevent duplicated work? | Resolved |  |
| How do we recover interrupted work? | Resolved |  |

### Time

Answered in [the time and people file](../responsibility_view/time_people_and_meetings.md).

| Question | Label | Note |
|---|---|---|
| How should Tend react when time changes the situation? | Resolved |  |
| How should deadlines influence decisions? | Resolved |  |
| How should scheduled work begin? | Resolved |  |
| How should waiting be represented? | Resolved |  |
| When should waiting end automatically? | Resolved |  |
| How should forgotten work be rediscovered? | Resolved |  |

### Failure

Answered in [the failure file](../responsibility_view/failure_and_recovery.md).

| Question | Label | Note |
|---|---|---|
| How do we recognise failure? | Resolved |  |
| How do we distinguish failure from uncertainty? | Resolved |  |
| How do we recover after failures? | Resolved |  |
| Which failures require immediate attention? | Resolved |  |
| Which failures can safely wait? | Resolved |  |
| How do we continue working when only part of the system is unavailable? | Resolved |  |
| How do we avoid repeating the same failed action forever? | Resolved |  |
| How do we keep the business safe while recovering? | Resolved |  |

### Explainability and Observation

Answered in [the business view file](../responsibility_view/business_view_and_capabilities.md).

| Question | Label | Note |
|---|---|---|
| How do we explain every recommendation? | Resolved |  |
| How do we explain every action? | Resolved |  |
| How do we explain every failure? | Resolved |  |
| What information should always be visible to the business? | Resolved |  |
| What information should only be visible to administrators? | Resolved |  |
| How do we reconstruct an entire business situation after it has finished? | Resolved |  |
| How do we observe the health of the overall system? | Resolved |  |
| How do we recognise that the system is behaving unexpectedly? | Resolved |  |
| How should the business observe active agency without reading every agent conversation? | Resolved |  |

### Growth and Evolution

Answered in [the memory, configuration and improvement file](../responsibility_view/memory_configuration_and_improvement.md).

| Question | Label | Note |
|---|---|---|
| How do new business systems become part of Tend? | Resolved |  |
| How do new communication channels become part of Tend? | Resolved |  |
| How do new business policies become part of Tend? | Resolved |  |
| How do new workflows become part of Tend? | Resolved |  |
| How do businesses customise Tend without changing its core behaviour? | Resolved |  |
| How do we support businesses that operate differently from one another? | Resolved |  |
| How do we evolve Tend without breaking existing businesses? | Resolved |  |

### Journey and Lifecycle

Answered in [the situation file](../responsibility_view/the_situation.md).

| Question | Label | Note |
|---|---|---|
| How should Tend represent the difference between a prospect, a customer, and a returning customer? | Resolved |  |
| How should one customer have several open situations at the same time? | Resolved |  |
| How should a conversation that contains several problems be split into separate situations? | Resolved |  |
| How should waiting for a meeting, a delivery, a payment, a repair, or a feedback date be represented? | Resolved |  |
| How should Tend know when a waiting period has ended? | Resolved |  |

### Meetings and Human Work

Answered in [the time and people file](../responsibility_view/time_people_and_meetings.md).

| Question | Label | Note |
|---|---|---|
| How should Tend decide which person is suitable for a meeting? | Resolved |  |
| How should employee availability, preferences, meeting type, and business rules work together? | Resolved |  |
| How should Tend handle a meeting that is cancelled, missed, or rescheduled? | Resolved |  |
| How should Tend represent who is responsible for the next step after a meeting? | Resolved |  |
| How should Tend escalate work when a person does not act? | Resolved |  |
| How should an external partner be contacted when the business has not acted? | Resolved |  |

### Channels and Permissions

Answered in [the communicating file](../responsibility_view/communicating.md).

| Question | Label | Note |
|---|---|---|
| How should Tend represent what each communication channel allows a business to send? | Resolved |  |
| How should Tend record consent and the customer's preferred channel? | Resolved | [Decision 23](../decision_view/the_decisions.md), 2026-10-22: the communication layer writes the consent records |
| How should Tend choose between replying in the current channel and starting a message in another channel? | Resolved |  |
| How should Tend decide what information each employee, customer, or external partner may see? | Resolved |  |

### Business View and Observation

Answered in [the business view file](../responsibility_view/business_view_and_capabilities.md).

| Question | Label | Note |
|---|---|---|
| What should the business owner see in a snapshot of the business journey? | Resolved |  |
| Which events should require the owner's attention? | Resolved |  |

### Compliance and Security

Answered in [the harness and compliance file](../responsibility_view/harness_and_compliance.md).

| Question | Label | Note |
|---|---|---|
| What are the compliances of each actor and each tech stack that we will be using? | Resolved | Each market's values are deferred to configuration (Q30) |
| How do we make a software product secure, and what are the best security practices? | Resolved | |
| How do we audit what has been built, at each point, with a security framework that finds gaps in compliance and security? | Resolved | The release tests and the certification steps, in [the rules that always hold](../constraint_view/the_rules_that_always_hold.md) and [decision 18](../decision_view/the_decisions.md) |

## 3. The questions found while writing this folder

These come from [the gap register](gap_register.md); the numbers match its rows. The seven that were **Blocking** — Q1, Q2, Q3, Q6, Q9, Q17, and Q20 — were answered by the project owner on 2026-10-22, as decisions 19 to 25. The rest were settled that day, or handed to the stage that sets them. <!-- decided by the owner, 2026-10-22 -->

| # | Question | Label | Why this label |
|---|---|---|---|
| Q1 | Who writes a wait a tool hands to the status-check service? | Resolved | [Decision 19](../decision_view/the_decisions.md): the tool declares it; the worker's fixed code saves it |
| Q2 | Which code writes the status-check service's answer into the situation? | Resolved | [Decision 20](../decision_view/the_decisions.md): the intake step saves it as an arrival; the worker concludes |
| Q3 | Does the status-check service call outside systems through the tool layer? | Resolved | [Decision 21](../decision_view/the_decisions.md): yes, with no exception |
| Q4 | How many times should the status-check service ask, how long between asks, and how long in total? | Deferred to configuration | Set for each outside system when its tool is added |
| Q5 | Does a timer, or only the service's answer, wake a recheck? | Resolved | The answer wakes; the wait's time signal wakes when the limits run out |
| Q6 | Which part holds the book of waits? | Resolved | [Decision 22](../decision_view/the_decisions.md): data kept with the situation records |
| Q7 | What do other parts do while the record, the worker, or the communication layer is down? | Resolved | A rule for each, in the parts file |
| Q8 | What happens when memory cannot be reached and its context is needed? | Resolved | That step is not taken; Tend waits, or gives it to a person |
| Q9 | Who writes consent records? | Resolved | [Decision 23](../decision_view/the_decisions.md): the communication layer's fixed consent code |
| Q10 | Which of the four states gives each of the eleven labels the business owner sees? | Resolved | A mapping table, in the records file |
| Q11 | Does a legal deletion reach the audit? | Deferred to configuration | Each market's law decides. If a law requires it, the deletion reaches the audit too, as it already reaches every version |
| Q12 | What form does the "reopened" mark take? | Deferred to implementation | It is a mark on the same record |
| Q13 | What happens when a sender never answers "which order do you mean?" | Resolved | The message is held, and changes nothing. After the business's wait limit, it goes to a person to place |
| Q14 | What does the customer hear while a person takes a question Tend has never met? | Resolved | The conversation manager's update decision applies: an honest word goes out before any promised time |
| Q15 | Who takes a question Tend has never met? | Resolved (the rule); deferred to configuration (the person) | The business's own rules name the person |
| Q16 | What starts a handoff of work from one person to another? | Resolved | The person asks; the cover rule applies; or the escalation path moves it |
| Q17 | After a platform rule changes, which part starts work again on open situations? | Resolved | [Decision 24](../decision_view/the_decisions.md): the conversation manager wakes only the affected situations |
| Q18 | How is a meeting booked, step by step? | Deferred to implementation | The meeting capability's own steps, inside the two meeting waits: the wait for the person to choose a time, and the wait for the meeting itself |
| Q19 | Which rule does each of the observer's checks cover? | Resolved | A mapping table, in the rules that always hold |
| Q20 | How is a checked person matched to their permissions while Tend runs? | Resolved | [Decision 25](../decision_view/the_decisions.md): membership, channel bindings, a fresh sign-in |
| Q21 | What are the configuration tools, and how is the configurator's identity checked? | Resolved (the check); deferred to implementation (the exact tools) | The identity check is [decision 25](../decision_view/the_decisions.md); the exact tools are designed when built, doing at least the listed jobs |
| Q22 | How is access restored after the permission store was unreachable? | Resolved | Each held step is checked again from the start |
| Q23 | How long does the business owner have to answer a policy notice? | Deferred to configuration | Each business's value |
| Q24 | What other options were there for decisions 5, 6, and 18? | Resolved | Written down in the decisions file |
| Q25 | What would reopen decisions 1, 4, and 12? | Resolved | Written down in the decisions file |
| Q26 | What makes each part change? | Resolved | Each part's reading, accepted |
| Q27 | How many steps, calls, and how much cost may one run use, for each business? | Deferred to configuration | Each business sets it, with product defaults |
| Q28 | What are each business's wait limits, check-in intervals, and escalation paths? | Deferred to configuration | Each business sets them |
| Q29 | How long may the owner view lag while a system is down? | Deferred to configuration | Each business sets it |
| Q30 | What are each market's legal values, including how long the audit is kept? | Deferred to configuration | Each market's law sets them |
| Q31 | What are each business's meeting limits, waivers, and expiry rules? | Deferred to configuration | Each business sets them |
| Q32 | Who may throw the emergency switches? | Resolved | The business owner or the configurator, for one business; the product team with a second person, for all |
| Q33 | How many questions may Tend ask in one situation? | Deferred to configuration | A number |
| Q34 | Where does the language check on a draft sit? | Resolved | In the send check |
| Q35 | Which kind of Telegram connection does Tend use? | Deferred to Level 3 | A technical choice |
| Q36 | Where does a person's preferred channel fit in the order for a new message? | Resolved | First within one step of the order |
| Q37 | Which fallback sources does a business allow? | Deferred to configuration | Each business sets them |
| Q38 | Which steps does a conflict block? | Resolved | The business's trust answers' list; a business may add more |
| Q39 | What happens when a result is unknown and cannot be checked? | Resolved | Declared unknown at once; a person gets the record; never repeated |
| Q40 | Who counts as away, and does a grant end when its holder is away? | Resolved | Away only from a source; the grant does not end |
| Q41 | What outcomes can a situation close with? | Resolved | Eight outcomes; a business may name finer ones |
| Q42 | How is a lead supplied from outside treated? | Deferred to configuration | Each business sets it |
| Q43 | Does a reopen change the relationship, or re-check the facts? | Resolved | It re-checks facts; it does not change the relationship by itself |
| Q44 | Are the step instructions and the stage rules versioned separately? | Resolved | Separately; each trace records both |
| Q45 | What form does each reader's field list take? | Deferred to implementation | The rule — each reader sees only its list — is decided |
| Q46 | Is "delivered but not received" a situation of its own? | Resolved | One conflict inside the delivery situation |
| Q47 | What else does Tend refuse to own, and who owns each instead? | Resolved | The problem statement's list is the full list; the register gives each owner |
| Q48 | How does Tend recover when a change reaches only some of several linked situations? | Resolved | The change is saved first; its writer resumes, skipping situations already done |
| Q49 | How does a new kind of situation enter the list? | Resolved | When a walk shows a part behaving in a way no kind covers; the project owner approves |

## 4. The blocking questions

None. The seven that blocked completion — Q1, Q2, Q3, Q6, Q9, Q17, and Q20 — were answered on 2026-10-22. [The completion record](completion_record.md) says what complete means here.

The memory rules rest on the business's memory answers, still marked "pending review"; those rules stay **Provisional** until the project owner reviews them. That does not block the design: each such rule holds until then, and reopens only that rule. <!-- Level 2 memory: pending review -->
