# The business view and capabilities — what Tend is responsible for

This file answers one question: what must Tend be responsible for so that the people around a business can see, check, and trust its work?

Three duties sit here. First, show each person the state of the work they need to see, as things they can open and search, not as a wall of chats. Second, keep a record of every important step, so it can be explained and rebuilt later. Third, watch Tend itself, so that a fault is noticed before a customer complains.

A fourth duty, narrower in scope, closes the file: Tend works through the business's own systems, and never owns their records.

Tend is the software that keeps a business's operational problems moving. Each problem is one **situation**: one late parcel, one refund, one outreach. <!-- A1 -->

Three stories run through this file.

**The owner comes back.** The owner gave Tend thirty people to contact about a product, then went offline for the afternoon. Now the owner wants to know how it went. <!-- Level 2 business view: the thirty-contacts example -->

**Why Priya was escalated.** Priya, one of the thirty, asked for a discount Tend may not give. Tend escalated her to the owner. The owner asks: "Why did Tend escalate Priya?" <!-- O4: the escalation question; written for this file: Priya's discount -->

**A question nobody can answer.** A customer asks where a package is. The business has no shipping system connected, and no employee can say. <!-- Level 2 explainability: the package example -->

Who is who here:
- The **owner** is the person who runs the business and signed up for Tend.
- The **configurator** is the person who sets the business up: the owner, or a person the owner names. In a small business, one person is often both. When this file describes what that person may see, it calls them the **administrator**.
- The **product team** is Tend's own builders.
- The **situation worker** is the part that reasons about one situation and writes what Tend concludes.
- The **owner view** is the part that builds, from the saved records, the screens the owner, the administrator, and the product team open. "Screen" in this file means one of those.
- The **observer** is what watches Tend itself: a regular check that runs alongside the parts, not a part of its own.
- A **grant** is a range of steps the business allows Tend to take, such as replying to customers inside a conversation they started.
- To **escalate** is to hand the work to the next person who can act on it, or to raise how urgent it is.
- The **tool layer** is the part through which Tend calls every outside system, such as a payment provider. The **communication layer** is the part that sends every message Tend sends, and records what it sent.
- **Fixed code** is code that always makes the same check. It is not the AI's judgment.
- **The AI** is the language model that suggests steps and words. It never decides alone. <!-- Section 11: the AI never decides alone -->
- A **trace** is the saved record of one run of work: what the AI suggested, what fixed code checked, which tools were called, and what came of it. <!-- Section 8: the trace; Level 2 explainability: fixed-code steps -->
- The **audit** is the record of every important step, its evidence, and its reason. Nothing in it is ever rewritten.
- A **capability** is one purposeful action the business has switched on, such as checking where a delivery is.
- "**Tend cannot know this here**" means that no system and no person can answer a question. Tend records that. Its short label is **capability-absent**.
- **The AI's private reasoning** is the AI's own working behind a suggestion. Only the product team sees it. A **summary of the reasoning** is a short, plain account of the main reasons, which administrators and the product team may see. <!-- Section 8: the trace -->

Each rule here has one of these statuses:
- **Decided:** the project owner — the person designing Tend, not the business owner — said yes. On 2026-10-22 the project owner accepted every recommendation this design had made, and asked for the smaller questions inside them to be settled in the way that best fits; those points are Decided, and points settled that day say so. A rule marked as "the design's reading" was worked out from its sources rather than found written down; it is Decided too. <!-- decided by the owner, 2026-10-22 -->
- **Provisional:** a working choice that carries a condition for reopening it.
- **Rejected:** turned down on purpose, with the reason kept.
- **Deferred:** a value or a detail left, on purpose, to a later stage — **deferred to configuration** (each business or market sets it), **deferred to Level 3** (the stage that chooses the technology), or **deferred to implementation** (whoever builds it). The rule around it is Decided.

Two earlier status words, **To confirm** (written down, but not yet agreed by the project owner) and **Open** (no answer yet), are no longer used: since 2026-10-22, no rule here carries either.

A rule with no status word next to it is **Decided**: it has a source the project owner accepted. Every rule that is not Decided carries its word where it appears. In the rest of this file, "the owner" means the business owner.

<!-- Every rule below carries its code in a hidden note. Its meaning, source, and status sit in code_index.md in this folder. -->

## Part 1: What the owner sees

## The work, not the machine

The owner does not care how efficient Tend is. The owner cares about the work: what changed, what is moving, what is stuck, what is at risk, and what needs them. <!-- Level 2 business view: the spine -->

In short: a business owner does not care about Tend's operational excellence. They care about the value Tend gives their business, inside the work Tend handles. <!-- Level 2 business view: the owner's frame -->

So the owner never sees uptime or message counts. Those belong to the product team. <!-- O9 -->

"Tend handled a thousand messages" tells an owner almost nothing. <!-- Level 2 explainability: the business-value line -->

By contrast, "three orders are stuck, and one customer may leave" tells them what to do. <!-- written for this file: the stuck-orders line -->

## Things to open, not chats to read

Tend shows the work on screens the owner can open, search, and filter. There are six: <!-- O1; Level 2 business view: the six views -->
- **an assignment screen** for a list of people or a batch of work, such as the thirty people, each with where they stand;
- **a situation card** showing where one situation stands, who acts next, and what changed, such as Priya's, waiting for the owner's decision;
- **a waiting screen** showing what Tend is waiting for, and when Tend will next act on it;
- **an attention feed** showing decisions, risks, and escalations, such as Priya's discount;
- **an evidence screen** showing why a step was chosen;
- **a finished screen** showing what was resolved, and what followed, such as a refund paid out.

How these look on a screen is decided later, in product design. What must be visible is decided here. <!-- Level 2 business view: layout is later -->

The owner does not need to keep a chat open for these to stay current. Each change updates them. <!-- Level 2 business view: artifacts stay current -->

Chat is still useful. The owner can ask Tend to find situations, explain a decision, or change something. But the business's state lives on these screens, not in the chat. <!-- Level 2 business view: chat is a search surface -->

Back to the owner who gave Tend thirty people and went offline. When they come back, they do not ask what Tend said in each chat. The assignment screen answers what they need: <!-- Level 2 business view: the thirty-contacts example -->
- how many people were contacted;
- how many replied;
- who needs an employee's answer;
- who asked for a meeting;
- who is ready to buy;
- who cannot be reached under the rules of the channels the business uses, such as WhatsApp or email;
- who has not replied, and is close to the next follow-up;
- which situations need the owner.

Opening one person shows that person's own story: the evidence, the messages, the waits, who acts next, and the next step. It is not a log of every message sent in the outreach. <!-- Level 2 business view: one person's story -->

Search can bring up every situation with a pricing question, or every situation waiting for a meeting. <!-- Level 2 business view: the thirty-contacts example -->

## The state of each situation

For every open situation, the owner can always see: <!-- Level 2 explainability: the baseline -->
1. whether it is running, waiting, or blocked, and why;
2. each question asked in it, and how each one ended: answered; waiting, with its reason; passed to a person; "Tend cannot know this here", with the customer still answered; waived; or replaced by a newer question;
3. any failure Tend formally recorded, any "Tend cannot know this here" answer, and any escalation;
4. the items that need attention, shown first: nothing waits to be found;
5. what made the situation act again (a reply, a deadline, or a scheduled time to look again), what Tend changed or tried, what it waits for, who acts next, and what will make it act again.

This is a short account of the work. It never asks the owner to read raw messages or the AI's private reasoning. <!-- Level 2 explainability: agency context -->

The owner can open any one situation, one story at a time, and see exactly what happened from the start. These items show on the situation itself. They are not the audit trail, which an owner who does not set the business up cannot open by default. <!-- Level 2 explainability: the baseline; settled page: audit access --> <!-- Level 2 explainability: the baseline -->

## The snapshot of the whole business

Across all situations, the owner sees a snapshot in business terms: <!-- O9; Level 2 business view: the snapshot -->
- **prospects:** how many are waiting, how many are actively engaged, and how many are close to buying;
- **customers:** how many there are, and how many are new this period;
- **orders and deliveries:** which orders are stuck, and which deliveries are late;
- **risk:** which customers are at risk;
- **deadlines:** which situations or obligations are near or past a deadline, such as a tax notice or a payment confirmation;
- **attention:** what needs the owner, as set out under "What reaches the owner" below.

On top of the snapshot, the owner also sees a **business-value summary**: situations resolved, the effect on the business, and time or money saved. <!-- O9; Level 2 explainability: the business-value view -->

Read each row as: when the owner has this need, Tend shows these things. A payment-dispute window, or chargeback window, is the time a customer has to dispute a card payment; its length is set by the card networks, not by Tend. <!-- Level 2 business view: the translation table -->

| What the owner needs | What Tend shows |
|---|---|
| "Nothing is silently stuck" | Stuck orders, at-risk customers, open replies, and payment-dispute windows still open, with the revenue at risk |
| "Things keep moving without me" | Work that moved on while the owner was away; only the escalations that need the owner |
| "One true picture" | One person's whole story, across all their situations |
| "Early, calm warnings" | A sorted list of risks, each with its context and a suggested next step |

Every figure opens down to the situations it came from. <!-- O9 -->

The snapshot is worked out from the situation records each time the owner asks. It is never a second store of the truth. **Decided.** <!-- O2; Section 11: the owner view -->

The owner view writes nothing. Each screen shows when it was last updated. <!-- O2; Section 11: the owner view -->

How far the owner view may lag when a system is down is set by each business. The design sets no limit. <!-- Section 8: owner view lag -->

### How risk is worked out

Risk is worked out by fixed rules first: tracking that has gone stale, a deadline passed, a payment-dispute window open, no answer past the promised time. These can always be computed and explained. <!-- Level 2 business view: risk -->

The AI may suggest softer warnings, such as a customer going quiet, or a bad review forming. A suggestion counts only when a fixed rule backs it. <!-- Level 2 business view: risk -->

For example: "this customer went quiet" reaches the owner only when a rule backs it, such as "no reply for a set number of days, with a promise still open". <!-- Level 2 business view: risk -->

The AI's confidence in itself never makes a warning official. <!-- Level 2 business view: risk -->

Which deadlines put the business at risk, the risk levels, and how often things are refreshed are set by each business, with product defaults. <!-- Level 2 business view: configuration -->

## What reaches the owner

Not everything reaches the owner. Three classes do, and two more cases. The three classes: <!-- O3 -->
1. **a decision only the owner can make:** an approval, an exception, or a preference outside anyone else's grant, such as Priya's discount;
2. **a deadline or a notice that puts the business at risk:** a tax deadline, a payment-dispute window about to close, a formal complaint, or a customer about to leave;
3. **an escalation that has gone past everyone assigned:** an employee was asked, reminded, and escalated, and the work is still stuck.

The first further case: a change that alters the business's next decision reaches the owner at once, such as a prospect accepting a meeting. <!-- O3; Level 2 business view: meaningful change -->

The second further case: a disagreement that needs a decision, such as a refund conflict, is shown to the owner, not hidden. <!-- Level 2 business view: conflicts surfaced -->

Everything else stays with the employee or the role that owns it, and stays visible in its own situation. Routine progress, healthy waits, normal replies Tend may send, handoffs that worked, and approvals inside someone's grant do not interrupt the owner. <!-- Level 2 business view: what does not reach the owner -->

The rule behind the three classes is simple: when work is stuck, and no one else can safely take it on, it comes to the owner. That stuck work reaches the owner, together with the two cases above. <!-- Level 2 business view: inaction that reaches the owner -->

Back to Priya, who asked for a discount. No grant lets Tend give one, so only the owner can decide. The decision reaches the owner's attention feed. <!-- written for this file: Priya's discount -->

Owner notices can be grouped, or sent at once, as the owner chooses. The owner sets how long a group lasts, and the quiet hours, in their own update settings; a decision with a deadline still reaches them in time. <!-- Section 8 additions: owner notices -->

The owner's update settings change only how the owner is told, not which changes reach the owner. <!-- Section 8: subscription -->

What the owner can do next — take over a situation, ask Tend a question, ask for more detail, then let it carry on — is clear in principle. The exact steps on the screen are drawn when the owner view is built; each one goes through the same checks as any other step. <!-- Level 2 business view: intervention -->

Which outside obligations, such as a tax notice or a certificate, show by default is set with each business's settings. <!-- Level 2 business view: configuration -->

## What each person may see

Each person sees only what their role allows. The full rule is in [the deciding file](deciding_and_permission.md). <!-- T11 -->

A solo owner sees all of the business. Once the business has distinct roles, each role sees less by default. <!-- Level 2 explainability: per-role narrowing -->

Opening a situation never shows more than working on it would. <!-- Level 2 explainability: drill-down -->

### The administrator

The administrator is the configurator. By default, the administrator sees: <!-- Level 2 explainability: the administrator -->
1. the business's setup: its policies, rules, sources, and channels;
2. the grants, and the history of approvals: which capability is tied to which approver, who approved what, and when;
3. the audit trail: declared outcomes, escalations, and capability-absent answers;
4. on request, a short account of how one situation was resolved: the situation, the sources it used, and the answer given. Customer details are hidden. The main reasons appear in plain words; the AI's own working does not.

The administrator never sees the AI's private reasoning. That stays with the product team. <!-- Level 2 explainability: the administrator -->

The project owner's reason: showing the administrator how a situation was resolved, with data hidden, is openness. It lets them see how Tend works without handing over its internals. <!-- Level 2 explainability: the administrator -->

Once distinct roles exist, the administrator's own view narrows like any other. <!-- Level 2 explainability: the administrator -->

### Who sees the audit trail

An owner who also sets the business up sees the audit trail. In a small business, one person often does both. <!-- settled page: audit access -->

An owner who does not set the business up has no access to the audit trail by default. <!-- settled page: audit access -->

Access to the audit trail is a grant. The configurator decides it, and writes it through the configuration tools. <!-- Section 7: audit access grants -->

No one else gives that access: like every grant, it is written only through the configurator's fixed tools. The business owner holds the configurator role unless they name someone. <!-- closed item: who grants audit access -->

Every time the administrator reads the audit trail, that read is logged. <!-- recorded earlier: admin reads logged -->

### The product team

The product team sees the most: how the system behaved, in testing and in real use, including the AI's private reasoning, kept for improving Tend. The AI's private reasoning is kept when the AI provider exposes it; if the provider does not, nothing in the design needs it. <!-- Level 2 explainability: the builder's view -->

The product team's access to a live business is limited in time, tied to a logged request (a ticket), and audited. <!-- Level 2 compliance: builder access -->

In real use, the product team sees customer details hidden and some names replaced, not the full view it sees in testing. This departs from the business's explainability answers, which give the product team the full view in real use too; the earlier boundary design made the change, and it stands among the recommendations the project owner accepted on 2026-10-22. The conflict register lists it. <!-- Section 7: production -->

In the simulation environment, where Tend is tested, the product team sees everything, because the data there is made-up test data only. <!-- Section 7: the simulation environment; owner item 9: test data only -->

To look inside a real business, the product team needs the owner's permission, given from the owner's own account. <!-- Section 7: owner permission for the product team -->

In real use, prompts that hold personal data are masked. <!-- recorded earlier: masked prompts -->

The owner sees their own customers' data unmasked. Masking applies to the product team's and the administrator's screens. <!-- recorded earlier: the owner's own data -->

Looking inside a real business also needs a ticket, a time limit, a second approver, and a notice shown to the business; [the harness and compliance file](harness_and_compliance.md) sets out the rule. <!-- later files: staff access -->

## Part 2: The record of what happened

## Every important step is recorded

Every step important enough for the audit leaves one complete record. It says: <!-- O7 -->
- what was done;
- the evidence used;
- the grant it ran under;
- why it ran, as a short reason;
- what came of it.

"Important" has one meaning everywhere: important enough to enter the audit, by the same rule the failure handling uses. There is no second definition. <!-- Level 2 explainability: one meaning of important -->

"Step" includes what fixed code does, not only what the AI suggests. A retry, a time limit passing, a circuit breaker (a switch that stops calls to a service that is down): each is a step, recorded, and explainable. <!-- Level 2 explainability: fixed-code steps -->

The part that takes the step writes its record, in the same run as the step. For a sent message, that is the communication layer. For a call to an outside system, that is the tool layer. <!-- O7 -->

A step is not finished until its record is written. If the record is missing, the step counts as unfinished, and the record is written again. <!-- O7 -->

No separate part checks the records. <!-- recorded earlier: no separate checker -->

Each record carries three tags: the run it came from, the situation it belongs to, and the version of that situation. With them, any step can be traced to the reason behind it, to the situation's history, and to the person's full history with the business. <!-- O7; Level 2 explainability: the join -->

Where the audit is stored is decided later, with the technology. <!-- O7 -->

Every decision and every action goes to the audit. The audit is only ever added to, and holds no passwords or connection codes. The full rule is in [the deciding file](deciding_and_permission.md). The complete five-part record above is kept for each important step. <!-- T9 -->

## Explaining when it matters

Tend keeps the reason for every important decision. It tells a person the reason only when that person needs it. <!-- O4; Level 2 explainability: trace always, explain on demand -->

A record of a suggestion holds: the information used, the rule or policy that applied, what fixed code decided, and a short reason. <!-- Level 2 explainability: the reason record -->

Tend explains without being asked when the reason affects trust, responsibility, safety, or the person's next step. Otherwise it explains when someone asks. When and how much is written in [the communicating file](communicating.md). <!-- O4 -->

Back to Priya. The owner asks: "Why did Tend escalate Priya?" The record answers: Priya asked for a discount; no grant allows Tend to give one; so the decision went to the owner. The answer comes from the record, not from the AI's memory of the chat. <!-- O4: the escalation question; written for this file: Priya's discount -->

An explanation shows useful reasons and the evidence. It never shows the AI's private reasoning. <!-- Level 2 communication: what an explanation holds -->

## Rebuilding a finished situation

Tend can rebuild any finished situation, for checking and for replay. <!-- O5 -->

Nothing new is recorded at that time. Everything was recorded as it happened: <!-- Level 2 explainability: reconstruction -->
1. **the story:** each version of the situation, each complete, with its reason;
2. **the steps:** what ran, on what evidence, under which grant, and why;
3. **the waits and declarations:** every wait, how it ended, and every failure or capability-absent answer;
4. **the links:** to related situations, followed when the viewer opens them.

The same record is shown in two ways, depending on who looks. An owner reads it as a straight line: the message, what Tend found, what it did, what it told the customer. The product team sees it as a map of steps, waits, and branches. A switch moves between the two. Anyone who may see the record may use the switch: it changes only the shape, never what they may see. <!-- closed item: who uses the switch --> <!-- Level 2 explainability: two renderings -->

Rebuilding shows nothing that watching it live would not. The same permissions apply. <!-- Level 2 explainability: reconstruction -->

The record holds what is needed to answer one question by tracing its chain of causes, such as "why did Tend tell this customer this?". The way to ask it is a capability built later, on top of the record; the record already holds what it needs. <!-- Level 2 explainability: question-driven reconstruction -->

## Part 3: Watching Tend itself

## The observer

Watching Tend itself is a responsibility in its own right. **Decided.** <!-- O8 -->

That watching runs alongside the parts. It is not a part of its own, and it does not sit inside the situation worker: it must notice a situation whose worker never wakes, such as a forgotten wait. <!-- closed item: where the observer sits -->

The health of the system is shown apart from the business's work: the product team's screens and the owner's screens are different. <!-- O6 -->

The observer sends what it finds as changes, on the same internal route as every other change. It has no other way to send. It never acts on what it finds. <!-- O8 -->

It watches two things separately: <!-- Level 2 explainability: two hulls -->
- **The AI provider.** A small set of fixed test questions runs on a schedule, and the answers are compared with earlier answers. This notices when the AI model got worse or changed, before a customer does. For example, the AI starts giving a made-up delivery date where it used to say it cannot know.
- **Tend's own fixed code.** Reference cases re-run whenever Tend's instructions, its tools, or the policies change. Samples of real runs are re-run and compared. This notices drift: a slow change in behaviour over weeks. For example, reference cases give a different answer after a policy edit, before that edit goes live.

It also checks that situations ended honestly. A situation may not close while a question is still open. A wait must end the way its rule says, including what happens when the person cannot wait. <!-- Level 2 explainability: completion discipline -->

Beside these two, the observer counts "Tend cannot know this here" answers, looks for waits whose due time passed with no wake reaching their worker, and raises alerts on spikes in refusals, messages sent, or cost, on any access across businesses, and on outgoing traffic to any outside service not on the approved list. The full list, mapped to the five kinds of unexpected behaviour below, is in [the rules that always hold](../constraint_view/the_rules_that_always_hold.md). <!-- IA-19; IA-20 -->

The observer's checks are health checks of the system. They are not checks on the state of situations. <!-- Section 8: health checks are not status checks -->

A fault in Tend's own steps can stop a new version of Tend from going live. <!-- Section 8: two watch lines -->

What the tests contain, the limits, how often samples are taken, and how the screens look are set when the observer is built. <!-- Level 2 explainability: health open -->

## Five kinds of unexpected behaviour

"Expected" means what is already settled: the hard rules, the discipline of the situation record, and how Tend has behaved before. Unexpected behaviour comes in five kinds: <!-- Level 2 explainability: five kinds -->
1. **A hard rule broken.** A guess was sent. A failure was hidden. A step ran outside its grant. A working reading, not yet confirmed, reached a customer as fact. These must never happen.
2. **A situation closed dishonestly.** It closed with a question that has no ending. It said "Tend cannot know this" when a source existed. A wait ended without following its rule for when the person cannot wait.
3. **An answer that does not fit the question,** more often than a rate the product sets. The answer is about something else, or not backed by a source.
4. **Drift.** The AI's or Tend's behaviour moving, week by week, beyond a set tolerance.
5. **Odd patterns.** Loops, repeated escalations on similar situations, or runs far from how successful runs look.

The first two are checked always, by fixed code. The third is checked on a sample of runs, as they happen. The last two are checked on samples, on a schedule. <!-- Level 2 explainability: five kinds -->

Where each finding goes: <!-- Level 2 explainability: where findings go -->
- one that concerns a situation is written on that situation, and shown to whoever owns it;
- a serious one enters the failure sorting, as written in [the failure file](failure_and_recovery.md);
- every one goes into the traces, where it helps the reference cases and, later, learning.

Back to the package. Suppose Tend answered "where is my package?" with the payment status instead, because it found nothing about shipping. That is the third kind: an answer that does not fit the question. Tend's checks must catch it before the situation closes. **Decided.** <!-- Section 8: the completion check catches it; Level 2 explainability: the package example -->

Which of the observer's checks covers which of the five kinds is mapped in [the rules that always hold](../constraint_view/the_rules_that_always_hold.md). <!-- Section 8: the five kinds not mapped -->

## When Tend cannot know

Capability-absent is not a failure. Nothing broke: no source for that question ever existed. <!-- O10; INV-7 -->

Tend reaches it only when no system and no person can answer. If a person can answer, the question becomes work for that person. <!-- O10 -->

The customer still gets an honest answer, with the reason. "We do not have the capability for this" is an answer. <!-- Level 2 explainability: capability-absent is an answer -->

Back to the package. No shipping system is connected, and no employee can say. Tend records that it cannot know this here, with its evidence, and tells the customer honestly. It does not change the subject to the payment. Only that question stops; the rest of the situation goes on. <!-- O10; Section 8 CASE-5; Section 8: only that request stops -->

How this is found is written in [the gathering file](gathering_and_trust.md). <!-- D8 -->

These answers are also a signal. The business can see what its customers keep asking for that it cannot serve yet. <!-- Level 2 explainability: the product signal -->

The product team also counts these answers, to decide what to build. That count is the product team's own screen, not part of the owner's. <!-- Section 8: builder views -->

## Part 4: Working through the business's own systems

## Tend keeps references, not the records

Tend works through the business's own systems. It never owns their records. <!-- P1 -->

For a contact, Tend keeps a reference: a pointer to the record in the business's system. The business owns its contact data. The outside service that holds the contact list keeps the copy it manages. <!-- P1 -->

The same holds for orders, payments, stock, and messages. They live in the business's systems and on the messaging platforms. Tend keeps references, and a working copy of what it needs to do its job. The business's system stays the owner. <!-- P1; Level 1: Tend does not own other systems' information -->

## A missing capability is said plainly

When a capability is missing, Tend says so honestly, and says what would fix it. For example: "connect the contact provider, or provide an email." <!-- P2 -->

A missing capability is shown as a gap. It is never refused silently. How a capability is added is written in [the memory and knowledge, configuration and improvement file](memory_configuration_and_improvement.md). <!-- Q4 -->

## What a capability is

A capability is a purposeful action, not a raw connection to a system. It comes with written limits: what it can do, what happens when it fails, whether its effect can be undone, and how it is watched. <!-- Section 6 additions: what a capability is -->

## A capability runs only when allowed

Tend uses a capability only when the grant and the rules allow it. No refund call is made without a grant for it. <!-- P3 -->

The permission check runs before every call. The full rule is in [the deciding file](deciding_and_permission.md). <!-- T2 -->

## What this area writes

- The owner view writes nothing to a situation. It builds its screens from the saved records. <!-- O2; Section 11: the owner view -->
- The part that takes a step writes the record of that step. <!-- O7 -->
- The situation worker writes "Tend cannot know this here" answers and declared outcomes, on the situation. A wait a tool hands to the status-check service is declared in the tool's result; the worker's fixed code saves it, in the same version as the started step, before the AI is told. <!-- Section 7 writer table: waits; O10; construction record, entry 21: writer question; decided 2026-10-22: the wait a tool declares -->
- A finding that concerns one situation is recorded on that situation; as with every conclusion, the situation worker writes it. <!-- Level 2 explainability: where findings go; Section 7: the writer principle -->
- The observer writes only its own findings, as changes. It writes nothing on a situation by itself. <!-- O8 -->
- Grants of audit access are written by the configuration tools. <!-- Section 7: audit access grants -->

## What this responsibility refuses

The owner never sees uptime, message counts, or the AI's internal workings. <!-- O9 -->

No one but the product team sees the AI's private reasoning. <!-- Level 2 explainability: the administrator -->

The owner view never becomes a second source of truth. <!-- O2 -->

The observer never acts on what it finds. <!-- O8 -->

A capability-absent answer is never counted as a failure, and never presented as a success. <!-- O10; Section 8: completion check -->

Tend never owns the records of the business's own systems. <!-- P1 -->

The full list of what Tend refuses to own, with who owns each thing instead, is in [the non-responsibilities register](../checking/non_responsibilities_register.md). <!-- closed item: refusal register -->

## At a glance

| What Tend is responsible for | Who decides | What happens instead, or when it goes wrong |
|---|---|---|
| Showing the work as screens to open <!-- O1 --> | The owner view, from the records | The owner never needs to read the chats <!-- Level 2 business view: chat is a search surface --> |
| The snapshot of the business <!-- O9 --> | Worked out on request <!-- O2 --> | Every figure opens to its situations <!-- O9 --> |
| What reaches the owner <!-- O3 --> | The three classes | The rest stays with whoever owns it <!-- Level 2 business view: what does not reach the owner --> |
| Risk warnings <!-- Level 2 business view: risk --> | Fixed rules; the AI may suggest | A suggestion with no rule behind it does not count <!-- Level 2 business view: risk --> |
| What each person sees <!-- T11 --> | Their role | Opening a situation shows no more than working on it <!-- Level 2 explainability: drill-down --> |
| Recording each important step <!-- O7 --> | The part that takes the step | Not recorded: not finished, and tried again <!-- recorded earlier: no separate checker --> |
| Explaining <!-- O4 --> | The record, at the reader's depth | Never the AI's private reasoning <!-- Level 2 explainability: the administrator --> |
| Rebuilding a finished situation <!-- O5 --> | — | Shows nothing beyond what live viewing would <!-- Level 2 explainability: reconstruction --> |
| Watching Tend itself <!-- O8 --> | The observer reports; others act | A serious finding enters failure sorting <!-- Level 2 explainability: where findings go --> |
| Saying "Tend cannot know" <!-- O10 --> | Fixed code, when no system and no person can answer | Never a failure; the customer is told <!-- INV-7 --> |
| Working through the business's systems <!-- P1 --> | The grant and the rules <!-- P3 --> | Missing capability: said plainly, with a fix <!-- P2 --> |

## Open questions, and what is set later

Nothing in this area is open.

**Values set later** — not open questions: the default risk levels, owner-risking deadlines, and refresh timing; which outside obligations show by default; the observer's tests, limits, and sampling; and the rate at which an answer that does not fit counts as unexpected. <!-- Level 2 business view: configuration; Level 2 explainability: health open -->
