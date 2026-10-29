# Gathering and trust — what Tend is responsible for

This file answers one question: when Tend gathers information for a decision, what must it be responsible for? That includes deciding how far it can rely on each piece it finds.

Tend is the software that keeps a business's operational problems moving. Each problem is one **situation**: one late order, one refund a customer is waiting for, one outreach. <!-- A1 -->

A customer writes: "My order never arrived." The carrier's record says: "Delivered at 14:05." The business promised delivery by Friday. <!-- Level 2 trust: shared example -->

Three sources say three things. Tend has to find what it needs, keep all three, and never quietly pick one. That is the work of this file.

This is the delivery story. It comes back below.

Who is who here:
- The **situation worker** is the part that reasons about one situation. It gathers, decides the next step, and writes what Tend concludes.
- The **tool layer** is the part through which Tend calls an outside source, such as the carrier or the payment provider.
- **Fixed code** is code that always makes the same check. It is not the AI's judgment.
- **The AI** suggests the next step. It never decides alone.

A **source** is anything that holds information: a system, a person, or a document. Earlier messages can be read too, but only as history. Where the source has a name, this file uses it: the carrier, the payment provider, the business's order system.

Each rule here has one of these statuses:
- **Decided:** the project owner — the person designing Tend, not the business owner — said yes. On 2026-10-22 the project owner accepted every recommendation this design had made, and asked for the smaller questions inside them to be settled in the way that best fits; those points are Decided, and points settled that day say so. A rule marked as "the design's reading" was worked out from its sources rather than found written down; it is Decided too. <!-- decided by the owner, 2026-10-22 -->
- **Provisional:** a working choice that carries a condition for reopening it.
- **Rejected:** turned down on purpose, with the reason kept.
- **Deferred:** a value or a detail left, on purpose, to a later stage — **deferred to configuration** (each business or market sets it), **deferred to Level 3** (the stage that chooses the technology), or **deferred to implementation** (whoever builds it). The rule around it is Decided.

Two earlier status words, **To confirm** (written down, but not yet agreed by the project owner) and **Open** (no answer yet), are no longer used: since 2026-10-22, no rule here carries either.

A rule with no status word next to it is **Decided**: it has a source the project owner accepted. Every rule that is not Decided carries its word where it appears. In the rest of this file, "the owner" means the business owner.

<!-- Every rule below carries its code in a hidden note. Its meaning, source, and status sit in code_index.md in this folder. -->

## A claim is not a fact

Every piece of information Tend gathers is a **claim**: one statement from one source, with a time. <!-- E1 -->

Take the carrier's record: "Shipment 8821 was delivered at 14:05." Shipment 8821 is what the claim is about. "Delivered" is what it says. 14:05 is the time it gives. The carrier's system is the source. Tend also keeps the time it read the record. <!-- Level 2 trust: claim fields -->

That claim does not say the parcel reached the customer. "The carrier says delivered" and "the customer received it" are two different things. <!-- E1 -->

Claims are written as fields — what it is about, what it says, the time, the source — not as free sentences. <!-- Level 2 gathering: structured claims -->

## Gather only what could change the next step

Tend first works out which information could change the next safe step. <!-- D1 --> Gathering has a purpose. It is not a sweep of everything available.

Information is needed when its absence, its age, an error in it, or a conflict about it could change what Tend does next. <!-- Level 2 gathering: required -->

The customer asks, "Where is my refund?" This is the refund story; it comes back below. Tend needs four things to answer. Was the refund started? What does the payment provider say? What is the amount? Is the request still inside the refund deadline in the business's policy? <!-- D1; Section 6 refund example -->

Tend does not need the order history from 2022. It does not need the customer's marketing preferences. <!-- D1; Section 6 refund example -->

Tend leaves information uncollected when it cannot change the decision. That holds even when the information is available. It also holds when Tend is allowed to read it. <!-- Level 2 gathering: leave uncollected -->

Being needed and being allowed are two separate questions. <!-- Level 2 gathering: relevance and permission -->

Suppose the refund needs a record that Tend may not read yet. Tend does not refuse, and it does not fetch the record quietly. It records a wait in plain words: "waiting for permission to read this record". The wait stays until the permission arrives. <!-- Level 2 gathering: relevance and permission -->

The AI may help name what is relevant. It is not given open access to everything and trusted to filter afterwards. <!-- Level 2 gathering: leave uncollected -->

## Who holds the information

A source can be a system or a person. Tend knows which source holds each piece of information. <!-- D2 -->

Running a process is not the same as recording its result. The payment provider runs the refund. The business's order system may record the refund's status, and Tend may read it there. <!-- Level 2 gathering: holder -->

Who holds it is also separate from whether it is true. The carrier holds its scan records, and a scanner can still fail. Who may see the information is a third, separate question. <!-- Level 2 gathering: holder -->

The carrier stays responsible for its own deliveries. When Tend asks the carrier a question, the delivery is still the carrier's job. <!-- Level 2 gathering: partner -->

An employee can ask Tend a question too. A warehouse employee asks whether order 9912 was paid; that question may update the order situation. A question with its own purpose and its own path to an outcome may open a separate situation instead. <!-- Level 2 gathering: employee question -->

## Where the information lives

Tend never assumes one source holds everything. <!-- D3 -->

The business's settings hold the list of its sources. Only configuration — the part that writes a business's settings — changes that list. Here the design joins two written rules: the business's settings hold its list of sources, and only configuration changes its settings. <!-- our reading: source list in the settings -->

For each source, the list says what the source can answer, how current its answers tend to be, how far it can be relied on for each kind of claim, and whether Tend may use it. <!-- Level 2 gathering: source map --> The carrier's tracking system answers where a parcel is. It can be relied on for its scans. It cannot be relied on for whether the customer received the parcel. <!-- Level 2 gathering: source map -->

Earlier messages and earlier versions of the situation are history. They are not current truth. <!-- Level 2 trust: history --> Tend's own earlier message is never proof of the fact it described. <!-- Level 2 gathering: own message is not proof -->

Tend calls a business system when it is the right source, such as the carrier's tracking system or the business's order system. <!-- D6 -->

Every result is saved with a reference to its source and the time it was taken. Tend does not replace the business's own system as the final record. <!-- D7 -->

Each claim also records which version of the source's record it came from, and when it was current. It names who holds the information, which request asked for it, and which situation it affects. <!-- Level 2 trust and gathering: claim record -->

## What to ask first

When several things are missing, Tend works in an order. First it works out what the question means in this business. Then it picks the sources that matter for this kind of claim. Then it ranks them. <!-- D4 -->

The ranking asks five questions: <!-- D4 -->
1. How far can this source be relied on for this kind of claim?
2. How recent is its answer?
3. What is at stake if the answer is wrong?
4. What does a person's time cost?
5. Which answer lets Tend take the next safe step?

Three more things count: the deadline, what was promised to the customer, and how long each source takes to answer. <!-- Level 2 gathering: priority -->

Normally Tend asks the business's own system before it asks a person. <!-- Level 2 gathering: system before person -->

A person comes first when the system is down, out of date, incomplete, or contradictory; when the system does not hold the claim at all; when its answer is unclear; when the business has already missed a promise to the customer; or when a person must interpret or approve. A person also comes first when the system's answer is not enough for what is at stake. <!-- Level 2 gathering: system before person -->

In the refund story, Tend may first confirm which refund the customer means, and its current status. Asking anyone to fix anything may come after that. <!-- Level 2 gathering: refund example -->

The situation worker follows this order when it proposes each request to a source. <!-- Section 8: source priority -->

## Gathering is a stage of the situation loop

Since 2026-10-29, gathering is a stage of its own in the worker's situation loop, between understanding the situation and weighing evidence ([Tend's product loop](../../../Level%202/the_product_loop/how_does_the_product_loop_work.md), part D3). Level 1: "re-enter the normal process of understanding, gathering, deciding and acting". <!-- PL-12 -->
- **It runs** when an unknown that matters to an open ask is open, or when deciding sends it back for a named need.
- **It is passed** when memory and knowledge's package maps every such unknown to an item Tend already holds that counts as evidence: a current claim, or a fact the business configured.
- **Its information plan** says what information could change the next safe step, which source holds it, and in what order. The AI writes it; fixed code checks it, and runs the reads. The plan is saved in the situation. A step that waits on an earlier result runs at a later entry.
- **An explore step,** for open research, reads one source at a time, each result fed back, until its target is met, its read limit is reached, or the progress rule stops it.
- **It reads, and asks people only for information.** Level 2: "Gathering may ask an employee or partner for information." A question to a person is a step of the information plan: the communication layer sends it, with its send check, and a wait is written for the answer; a question to an employee is a work item. Gathering takes no other step with an effect.

## One pass, then the situation worker decides again

Each entry into gathering is one pass. The situation worker asks the sources once, in ranked order. It does not keep asking until it feels satisfied. <!-- Level 2 gathering: one pass (Fork A); S3 -->

It records what comes back, writes a new version of the situation, and shows what is still missing. Then weighing evidence runs, and the worker decides the next step again. <!-- Level 2 gathering: one pass (Fork A); PL-13 -->

Gathering never judges whether it has enough. The situation worker judges that when it decides the next step, against the business's policy and what is at stake. <!-- F5; Section 8 gather rule --> Each pass asks at least one source. <!-- Section 8 gather rule -->

Before it asks anything, Tend matches the question to a source, a system or a person. <!-- D8 -->

A customer asks where their package is. No shipping system is connected, and no person can answer. Tend does not answer from payment data. It records that it cannot know this here. The label for that is **capability-absent**. It is not a failure, and it is not a guess. <!-- D8; CASE-5 -->

If a person can answer, Tend creates a task for that person instead. <!-- D8 -->

Gathering can show that earlier understanding was wrong. A message may belong to another situation. One message may hold two problems. None of this is corrected silently. The correction is a new version, and its reason stays visible. <!-- Level 2 gathering: gathering corrects understanding -->

## When information arrives in pieces

Information can arrive in pieces. Tend updates the situation's record when it does. <!-- D5 -->

The carrier says, "We have your request, and we are still investigating." That is a piece, not the answer. <!-- Level 2 gathering: partial -->

A piece moves the situation forward a little. Tend never presents a piece as the whole answer. It never goes silent while it waits for the rest. <!-- Level 2 gathering: partial -->

While pieces are missing, Tend keeps five things visible: <!-- Level 2 gathering: partial -->
- what has arrived;
- what is still unknown;
- who is expected to answer;
- why the situation is waiting;
- what happens when the next piece arrives.

Tend may send a limited answer while it waits. It does so only when the rules of the channel (such as email or WhatsApp), the customer's consent, and the business's policy allow it. Then it keeps gathering the rest. <!-- Level 2 gathering: partial -->

When a source can send its news as an event, waiting for the event is preferred. Tend does not keep asking for news that will arrive on its own. <!-- Level 2 gathering: prefer events -->

## Waiting on an outside source

Some answers take hours. The payment provider may confirm a refund only much later.

The **status-check service** is the one place that waits on an outside source while the work continues. It waits in two ways. The outside source can send its answer when it is ready. The service can also ask for it: a limited number of times, with a set gap between asks, for a set total time. Each ask goes out through the tool layer, like every call out of Tend. Waiting for the event still comes first when the source can send one. <!-- decided by the owner, 2026-10-17; decided 2026-10-22: the service calls through the tool layer -->

Before the service takes over, the tool that started the step asks a few times itself — at most five for one wait, and only where it knows how fast the source usually answers. Then its result declares the wait, and the worker's fixed code saves it, before the AI is told. <!-- M5; settled 2026-10-22: the five per wait; decided 2026-10-22: the wait a tool declares -->

<!-- construction record, entry 21: polling rule changes -->

When the answer comes, the service sends it as an event, naming the wait it answers. The intake step saves it as an arrival — a new version — and draws no conclusion. That version's notice starts the situation worker again. The worker then reads the answer through the fixed code of the tool that declared the wait, and writes what it means. The service's asking never wakes a situation; only its answer does. <!-- construction record, entry 21: return path; decided 2026-10-22: the status-check answer; decided by the owner, 2026-10-17 -->

Two rules about the situation's state stand. The situation worker sets a situation to waiting or blocked. Only the conversation manager — the part that reacts when something happens and sends messages to people — sets it to completed. <!-- decided by the owner, 2026-10-12 -->

The service's own limits for each outside source are set when that source's tool is added, within the source's published limits. <!-- settled 2026-10-22: the service's limits -->

## When information changes

Information can change while Tend is still working. A refund moves from processing to paid out. <!-- D5; Level 2 gathering: change -->

The earlier state is not erased. Tend writes a new complete version, with the reason for the change. <!-- Level 2 gathering: change -->

Then Tend checks again everything that depends on the change: <!-- Level 2 gathering: change -->
- its conclusions;
- what it still needs to find out;
- what it is waiting on, such as the payment provider's answer;
- approvals, actions, and messages already in motion.

The situation stays the same when the problem and its path to an outcome stay the same. A refund moving to paid out is the same problem.

A linked new situation is opened when the change brings a different problem, a different person responsible for it, a different policy, or a different path. After the refund is paid out, the customer reports a second parcel missing. That is a different problem, so it gets its own situation, linked to the refund. <!-- Level 2 gathering: change -->

## Is it still true now?

Information can come from a trusted source and still be out of date. Yesterday the tracking said "in transit". Today the parcel arrived. <!-- Level 2 gathering: currentness -->

Information is **current** enough only while it still fits the decision. Information that no longer fits is **stale**. That depends on when it was observed and on how fast this kind of information changes. It depends on whether anything has moved since. It depends on the deadline and on what was promised. <!-- Level 2 gathering: currentness -->

There is no single age limit for every kind of information. <!-- Level 2 gathering: currentness -->

A message to a customer never presents an old claim as true now. "Our latest update, from ten minutes ago, places the parcel in City B" — not "your parcel is in City B". <!-- Level 2 gathering: currentness; Level 2 gathering: fallback -->

Before each step, the worker compares every claim the step relies on with how long that kind of claim stays current. The business sets those limits for each kind of source. A claim past its limit is gathered again before the step runs. A fact in a message to a customer comes from a tool result of the same run — the same pass of the situation worker — whatever its age. A source that sends no events is read when a step needs it, never on a schedule. <!-- closed item: currency; Level 2 gathering: check frequency; Level 2 security: the fixed list -->

## Stand-in answers

When the main source is down, Tend may use a stand-in answer. Tend marks that answer as stale or partial, and writes the reason beside it. A step that cannot be undone does not go ahead on it. <!-- E7 -->

The carrier's system is down. A logistics employee gives a direct update instead. Tend records the update as the employee's claim, with who said it and when. Tend never treats it as a confirmed answer. <!-- Level 2 gathering: fallback -->

When the carrier's system is back, Tend asks it again. The new answer from the carrier may confirm the employee's claim, update it, or contradict it. Tend writes a new version in every case. <!-- Level 2 gathering: fallback -->

## Six kinds of entry, kept apart

Tend keeps six kinds of entry apart. The table shows each one in the delivery story; the entries are illustrations, not part of the story. <!-- Level 2 trust: six kept apart -->

| Kind | In the delivery story |
|---|---|
| What Tend observed | Tend received the carrier's reply. |
| What a source claimed | The carrier's record says "delivered at 14:05". |
| What Tend inferred | The customer probably means shipment 8821. |
| What fixed code established | The rule finds the two claims in conflict. |
| What the AI suggested | The AI suggests asking the carrier for proof of delivery. |
| What was decided and done | Tend sends the customer an honest interim message. |

Tend never presents its own reading as if a source had said it. <!-- Level 2 trust: six kept apart -->

Some places count four kinds: observed, claimed, inferred, and decided. The table counts six, because it separates what fixed code established from what the AI suggested. The rules are the same either way; this fit is the design's reading. <!-- C4 home: understanding_and_routing.md; Level 2 trust: six kept apart; our reading -->

An assumption is not one of the six kinds. It is kept apart from the observed and claimed entries it rests on. When evidence arrives, the assumption changes, and the change is recorded.

An inference may be used for now when its other possible readings would not change the next step. When they could change which situation it is, who is responsible, what is needed, which policy applies, or what the customer sees, it stays marked as provisional. <!-- Level 2 trust: provisional readings --> <!-- E6 -->

## Fixed code weighs the evidence, not the AI

Fixed code weighs the evidence, by its source and by rules. The AI does not decide what is true. <!-- E2 --> Weighing evidence is a stage of its own in the situation loop: it runs whenever new claims came in, before deciding, and has no AI. <!-- PL-13 -->

The rules look at three things. <!-- Level 2 trust: evaluator inputs -->
- The source: who it is, where its answer came from, and how recent it is.
- The claim: what it covers, which order or shipment it is about, and when it was observed.
- The business: its rules for comparing claims, its permissions, its policy, and whether this step needs an approval.

How far Tend relies on a claim depends on the claim, not only on who said it. <!-- Level 2 trust: reliance per claim -->
- The carrier is the one to rely on for its tracking record.
- The customer is the one to rely on for what they experienced.
- The business is the one to rely on for what it promised.
- The payment provider is the one to rely on for its own transaction.

Even then, Tend still checks that the claim is current, that it covers this question, that nothing contradicts it, and that Tend may use it. The exact order of sources for each kind of claim is set by each business: deferred to configuration. <!-- Level 2 trust: reliance per claim -->

Uncertainty is shown as a state and a reason. <!-- E3 --> Each claim is in one of six states: <!-- Level 2 trust: evidence states -->
- **known** — received and used for now. Known does not mean checked, current for every decision, or permanent. <!-- Level 2 trust: known is not truth -->
- **unknown** — Tend does not have it yet.
- **conflicting** — the carrier says delivered, and the customer says not received.
- **ambiguous** — "at the depot" could mean either of two depots.
- **provisional** — a reading in use for now, not yet settled. Here the word describes a claim. It is a different use from the **Provisional** label on rules.
- **stale** — yesterday's "in transit" for a parcel that arrived today.

Each state carries its reason, such as "the source is down" or "permission is missing". <!-- Level 2 trust: evidence states -->

Tend produces no number for confidence or trust. There is no score, no probability, and no weighting. <!-- E3 --> No number from the AI is ever used to allow or block an action. <!-- Section 6 security: no AI numbers in control paths -->

The AI receives the result: the facts, the assumptions, the conflicts, and the unknowns. It does not receive the weighing that produced them. <!-- Level 2 trust: evidence context -->

## When sources disagree

Two claims conflict when four things are true: <!-- Level 2 trust: conflict test -->
1. they are about the same order, parcel, payment, or person;
2. they answer the same question;
3. their times, and what each one covers, can be compared;
4. the business's rules say both cannot be true now.

"In transit" yesterday and "delivered" today is not a conflict. It is a later state. "Refund started" and "refund paid out" is not automatically a conflict either. They can be two stages of one process, when the business's rules define those stages. A comparison Tend cannot settle yet is not automatically a conflict. <!-- Level 2 trust: not a conflict -->

Fixed code compares the claims first. The AI may point out a possible conflict, and it may review a comparison that the rules cannot settle. It does not decide that a conflict exists. A person is the last step. <!-- Level 2 trust: comparison order -->

Tend keeps every conflict visible. <!-- E4 -->

A conflict is settled in this order: <!-- E5 -->
1. a rule the business, or the line of work it is in, has written down;
2. a correction from the source that holds the record — a newer claim counts only when it corrects the older one;
3. more evidence, when it could change the next step;
4. a person, when no rule and no evidence settles a conflict that matters.

Tend never picks a side because a claim arrived last, came from a system, or sounds plausible. <!-- E5 -->

The business's own answers allow any newer valid claim at step 2. The design narrows it to a correction, as the project owner accepted on 2026-10-22. <!-- accepted call: correction only -->

The business can set its own order for each kind of claim. It can also require a named person, an approval, more evidence, or a limited action. Until it does, the order above is the product's default. <!-- Level 2 conflict resolution -->

Fixed code decides how each conflict is treated. <!-- Level 2 trust: fixed code treats conflicts -->

A conflict stops only the action it affects. Other work continues. Every conflict works this way, small ones included. <!-- E5 -->

What Tend may do depends on the state of the evidence and on what is at stake. The same conflict can block a refund and still allow a status message. <!-- E8 -->

A conflict blocks an action when the action touches any of these: <!-- Level 2 trust: blocking triggers -->
- the situation, customer, order, payment, or shipment the action is about;
- the answer the customer will see;
- a promise or a deadline;
- money, compensation, a refund, or a payment's state;
- privacy, permission, or what data is shared;
- an approval;
- a legal, regulatory, or compliance duty;
- a step that is hard or impossible to undo.

It also blocks when no rule settles it and no safe fallback exists. This is the full list; each business may add more conditions in its settings. <!-- Level 2 trust: blocking triggers -->

Back to the delivery story. Tend records the carrier's claim, the customer's claim, and the conflict between them. The business's promise of delivery by Friday stays on record as what the business said. <!-- E5; Section 6 delivery example -->

Fixed code weighs the sources and what is at stake. Tend then checks its records again, asks the carrier, hands the matter to a person, or sends the customer an honest interim message, as the policy allows. <!-- Section 6 delivery example -->

While a high-stakes conflict stands, the situation does not close as "delivered". <!-- Section 6 delivery example --> Tend does not tell the customer they are wrong. It does not promise a new date without evidence. It does not offer compensation unless the business's rules allow it. <!-- Level 2 trust: shared example -->

"Delivered but not received" is one conflict inside the delivery situation, not a situation of its own. <!-- construction record, entry 21: delivered-not-received -->

## What counts as progress

A carrier is asked again and gives the same answer. That is not progress, whatever the AI says about it. <!-- E9; harness: no-progress list -->

A pass counts as progress only when the situation's record changed in one of five ways: <!-- E9 -->
- a claim's evidence changed;
- a needed claim came from a source not yet asked for it in this wake;
- a wait was written, refreshed, or finished — for example, "waiting on the payment provider" was written;
- an outcome was declared;
- a permission changed.

The AI's own report of progress never counts. <!-- E9 -->

## What this area writes

The situation worker writes the gathered claims, each with its source and time. It also writes the conflicts. <!-- Section 7 writer table: claims and conflicts -->

The tool layer only brings back structured evidence. It never writes a claim into the situation. <!-- S8; IB-7 -->

Fixed code weighs each claim. The situation worker records the result in the new version. <!-- E2; Section 7 writer table: claims and conflicts -->

Configuration writes the business's list of sources. <!-- our reading: source list in the settings -->

## What this responsibility refuses

Tend does not decide what is really true. It does not judge whether a customer, an employee, or any other source is lying. Each source stays responsible for the information it holds. <!-- Level 2 trust: what it does not decide -->

Tend does not replace the system that holds an outside record. It does not decide business policy. It does not skip a permission or an approval. <!-- Level 2 trust: what it does not decide -->

The full list of what Tend refuses to own, with who owns each thing instead, is in [the non-responsibilities register](../checking/non_responsibilities_register.md). <!-- closed item: refusal register -->

## At a glance

| What Tend is responsible for | Who decides | What happens when it goes wrong |
|---|---|---|
| Gathering only what could change the next step <!-- D1 --> | The situation worker | Needed but not allowed becomes a visible wait, never a quiet fetch <!-- Level 2 gathering: relevance and permission --> |
| Knowing who holds each piece, and where it lives <!-- D2; D3 --> | The situation worker, from the business's list of sources | No system and no person: capability-absent, recorded honestly <!-- D8 --> |
| Asking in a ranked order <!-- D4 --> | The situation worker | The system is down or out of date: a person comes first <!-- Level 2 gathering: system before person --> |
| One pass, then a fresh decision <!-- Level 2 gathering: one pass (Fork A) --> | The situation worker, at the decision | Gathering never keeps going on its own judgment of "enough" <!-- Level 2 gathering: one pass (Fork A) --> |
| Saving every result with its source and time <!-- D7 --> | The situation worker writes it | The business's own system stays the final record <!-- D7 --> |
| Updating when information arrives in pieces or changes <!-- D5 --> | The situation worker | The earlier state stays as history; everything that depends on it is checked again <!-- Level 2 gathering: change --> |
| Weighing evidence by fixed code <!-- E2; E3 --> | Fixed code, never the AI | No number from the AI allows or blocks anything <!-- Section 6 security: no AI numbers in control paths --> |
| Marking stand-in answers honestly <!-- E7 --> | Fixed code | A step that cannot be undone does not go ahead on them <!-- E7 --> |
| Keeping conflicts visible and settling them in order <!-- E4; E5 --> | A rule, then a correction, then more evidence, then a person | Only the affected action stops; other work continues <!-- E5 --> |
| Counting only real progress <!-- E9 --> | Fixed code, on the five kinds of change | The AI's own report never counts <!-- E9 --> |

## Values each business sets

These are not open questions. The design holds whatever the values are. <!-- method: deferred to configuration -->
- How long each kind of claim stays current, for each kind of source. <!-- closed item: currency -->
- The exact ranking of sources, and which source to rely on for each kind of claim. <!-- Level 2 gathering: source map; Level 2 trust: reliance per claim -->
- The status-check service's limits for each outside source, and the business's own number of short asks, if it sets one. <!-- settled 2026-10-22: the service's limits; M5 -->
