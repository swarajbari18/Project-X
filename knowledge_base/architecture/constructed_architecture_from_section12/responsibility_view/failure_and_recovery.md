# Failure and recovery — what Tend is responsible for

This file answers one question: what must Tend be responsible for when something it depends on breaks?

Three duties sit here. First, say out loud, and on the record, the moment a path stops working. Second, sort what broke: does a person need to know now, or can it be held? Third, move on to the next safe step without guessing, and without repeating a step that must not happen twice.

Tend is the software that keeps a business's operational problems moving. Each problem is one **situation**: one late parcel, one refund, one outreach. <!-- A1 -->

Two stories run through this file.

**Meera's parcel.** Meera asks where her parcel is. The carrier — the outside company that delivers the business's parcels — is the only source of tracking. Its tracking system stops answering. <!-- Level 2 failure: the shared example -->

**The refund on order 9912.** A customer is owed a refund of 1,500. Tend sends it to the payment provider. The provider never answers. Nobody knows whether the money moved. <!-- Level 2 failure: the shared example; Section 11: refund example -->

Who is who here:
- The **situation worker** is the part that reasons about one situation. It decides the next step, and writes what Tend concludes, including every wait and every failure.
- The **tool layer** is the part through which Tend calls every outside system, such as the payment provider or the carrier. It checks permission before every call.
- The **status-check service** is the part that waits on an outside system while other work goes on. Its asks go out through the tool layer.
- **Fixed code** is code that always makes the same check. It is not the AI's judgment.
- **The AI** is the language model that suggests the next step. It never decides alone.
- A **wait** is Tend's recorded pause on a situation until one named thing happens.
- A wait's **bound** is its limit: the time after which waiting is no longer honest.
- A step is **irreversible** when it cannot be undone: money moved, a promise sent, data changed for good.
- An **outcome** is what came of a step: it worked, it failed (for good, or for now), or nobody knows yet.
- The **audit** is the record of every important step, its evidence, and its reason. Nothing in it is ever rewritten.
- To **escalate** is to hand the work to the next person who can act on it, or to raise how urgent it is. The **escalation path** is the business's own list of steps for when work is not done: who is reminded, who is told next, and how long each step waits.
- The **check-in** is a set time when a waiting situation wakes, even if nothing else has happened.
- **The decision** is the situation worker choosing the next step.
- The **trail** is the record of what happened in a situation, in order.
- A **fallback** is a backup used when the usual source, route, or rule fails, is missing, or is unclear: one the business allows, or, where the business has none, a safe default the product sets.

Each rule here has one of these statuses:
- **Decided:** the project owner — the person designing Tend, not the business owner — said yes. On 2026-10-22 the project owner accepted every recommendation this design had made, and asked for the smaller questions inside them to be settled in the way that best fits; those points are Decided, and points settled that day say so. A rule marked as "the design's reading" was worked out from its sources rather than found written down; it is Decided too. <!-- decided by the owner, 2026-10-22 -->
- **Provisional:** a working choice that carries a condition for reopening it.
- **Rejected:** turned down on purpose, with the reason kept.
- **Deferred:** a value or a detail left, on purpose, to a later stage — **deferred to configuration** (each business or market sets it), **deferred to Level 3** (the stage that chooses the technology), or **deferred to implementation** (whoever builds it). The rule around it is Decided.

Two earlier status words, **To confirm** (written down, but not yet agreed by the project owner) and **Open** (no answer yet), are no longer used: since 2026-10-22, no rule here carries either.

A rule with no status word next to it is **Decided**: it has a source the project owner accepted. Every rule that is not Decided carries its word where it appears. In the rest of this file, "the owner" means the business owner.

<!-- Every rule below carries its code in a hidden note. Its meaning, source, and status sit in code_index.md in this folder. -->

## A failure is a record, not a state

A situation is always running, waiting, blocked, or completed. There is no fifth state called "failed". <!-- M1 -->

A failure is an event. It is written to the record and to the audit. The situation itself stays in one of its four states. <!-- M1 -->

A failure records one thing: the step the situation was depending on is dead. Then the situation takes its next safe step. <!-- Level 2 failure: failure is an event -->

Every failure ends in the same question: what is the safest correct next step? The answer is a wait, a question, a person, or a stop. It is never a pretence that nothing happened. <!-- Level 2 failure: the one question; Section 11: what goes wrong -->

There is no silent failure. A failure that is not in the audit does not count as handled. <!-- Level 2 failure: no silent state -->

**Rejected:** a quiet restart that drops the failure without a record. Nobody could check it, nobody could find the fault afterwards, and it would break the promise that every important step can be explained. <!-- Level 2 failure: the silent reboot -->

## What counts as a failure

Real failures come in three forms: <!-- Level 2 failure: three forms -->
- **A wait that will not come back.** The carrier was asked for tracking, and its answer is past its limit.
- **A source that went away.** The carrier's tracking system is down, it is the only source, and nothing is moving.
- **An outcome nobody knows.** The refund was sent, the payment provider never answered, and nobody knows whether the money moved.

Much of what goes wrong is not a failure in this strict sense: <!-- Level 2 failure: not every mess is a failure -->
- **A disagreement** between sources. The carrier says "delivered", and Meera says it never came. The path still works: Tend keeps comparing and looking into it. The rules for that are in [the gathering file](gathering_and_trust.md).
- **Information that is out of date.** That is a reason to ask again, not a failure.
- **No source at all.** When no system and no person can answer a question, Tend records that it cannot know this here. That is not a failure either, because nothing broke. The full rule is in [the gathering file](gathering_and_trust.md). <!-- INV-7 -->
- **A person who does not answer.** Tend first names the kind of silence, and the business's escalation path runs. The full rule is in [the time and people file](time_people_and_meetings.md). <!-- J5 -->

The list of what can go wrong is long: missing, conflicting, or wrong information; a person who is away; a sign-in that fails; a broken business rule; a message that is not delivered (see [the communicating file](communicating.md)); nobody acting; a situation the business has never seen. Each one has its own rule, in the file for that area. Only a dead path is a failure. <!-- Level 1: the failure list; Level 2 failure: not every mess is a failure -->

## Waiting or failed: the bound decides

Waiting and failure are not two kinds of mess. They are two moments of the same wait. <!-- Level 2 failure: two moments of one wait -->

While a wait is inside its bound, and nothing shows the path is broken, waiting is honest. That is uncertainty, not failure. <!-- M2; Level 2 failure: the bound is the line -->

When the bound is reached and the wait has not ended, the path is no longer usable. Waiting any longer would be pretending. That is a failure. <!-- M2 -->

The same facts can sit on either side of the line. The carrier has been silent for twelve hours. If the carrier promised an answer within a day, Tend still waits. Silent past what the carrier promised: that is a failure. The day is an example, not a setting. <!-- Level 2 failure: the twelve-hour example -->

A bound comes from one of four places. The examples are illustrations, not settings: <!-- Level 2 failure: where a bound comes from -->
- **what the outside party promised:** the carrier promised an answer within a day;
- **the time a result takes to become final:** the payment provider says a refund is final after a set number of days;
- **a deadline:** the delivery was promised for Friday;
- **the situation's own check-in:** the set time when a waiting situation wakes anyway.

Crossing the bound is a fixed check by fixed code. It is not a guess by the AI. <!-- Level 2 failure: deterministic crossing -->

How long each bound is, is set by each business. No number of days is fixed in the design. <!-- M2 -->

If the business never set a bound, the capability's default applies, or the check-in serves as the bound. The full rule for bounds is in [the time and people file](time_people_and_meetings.md). <!-- closed item: unset bound -->

## Declaring a failure

When the bound is crossed, the wait is recorded as a **declared outcome**. (One exception: a result that can never be checked is declared unknown at once; see below.) There are four kinds: <!-- Level 2 failure: four declared outcomes -->
- **success:** the step worked. For example, the refund reached the customer's account.
- **terminal failure:** the step failed, and trying again will not help. For example, the account details were rejected.
- **transient failure:** the step failed, but it may work if tried again. For example, the provider was briefly busy.
- **unknown outcome:** nobody can say yet whether the step worked. For example, the provider never answered, as with the refund on order 9912.

Each declaration records: <!-- Level 2 failure: what travels with a declaration -->
- which wait failed, and what it was about;
- the bound it crossed, and when;
- what the newest known facts are;
- why the path can no longer be used;
- which tool declared the wait, where a tool did.

The declaration goes into the audit. A failure counts as recognised when it is on the record, not when the timer fires. <!-- Level 2 failure: recognised when recorded -->

The situation worker writes the declaration. <!-- Section 7 writer table: waits; Section 7: failure and unavailability -->

For Meera's parcel: the carrier's tracking system is down past its bound. The worker declares the failure, with the bound it crossed and the last tracking it had. Then it decides the next step: wait for the carrier to come back, find another route (such as a fallback source the business allows), give Meera an honest update, or escalate. <!-- Level 2 failure: the shared example -->

**Meera, step by step.** The carrier's tracking stops answering. Inside its bound, Meera's situation simply waits. Then the bound passes.

The worker declares a failure. Nothing irreversible hangs on it, and no promise is broken yet. So the failure can be held, as explained below.

Before the time Meera was promised, she gets an honest update: the carrier's tracking is down, the business is following it up, and she will hear again. Inside the business, the escalation path runs: the employee who handles deliveries is reminded. When the carrier's tracking comes back, the wait ends, and Meera hears where her parcel is. <!-- written for this file: Meera, step by step -->

## Sorting a failure: now, or later

Once a failure is declared, Tend sorts it: does a person need to know now, or can it be held? <!-- M3 -->

The sorting follows a fixed order. Each step narrows the question: <!-- M3; Level 2 failure: the triage order -->
1. **Who is affected.** A consequence lands on a real person and a real business. Tend looks at that before it looks at any label.
2. **Then the consequence.** If what would happen is bad, Tend does not treat it lightly, even when the problem looks small. Examples: a client the business knows is sensitive, a step that cannot be undone, a large amount of money.
3. **Then the severity.** The problem is placed on a four-step scale borrowed from operations practice. For example: everything is down (no system answers); refunds cannot be sent (a core process broken); a monthly report is late (a side process broken); one label is wrong (a minor issue).
4. **Then the promise.** How close Tend is to breaking a promise to a customer, or an internal deadline, decides when the matter goes to a person.

Seeing that a consequence is bad sometimes needs judgement. Then the AI gives its reasons. Fixed code decides: it blocks the step, or it brings the matter to a person. Both the argument and the decision go into the audit. <!-- Level 2 failure: the AI argues, fixed code decides -->

### When a failure needs a person now

"Now" does not mean "drop everything". It means the failure does not join the items that can wait. It goes now to a person who can act, with the declaration and the trail behind it. <!-- Level 2 failure: what immediate means -->

What happens next — escalate, involve the owner, or plan a new path — follows the order above, and is recorded. <!-- Level 2 failure: what immediate means -->

### When a failure can be held

A failure can be held when all of these are true: <!-- Level 2 failure: what can wait -->
- what would happen from this broken step is not bad yet;
- no step that cannot be undone depends on a fact nobody has confirmed;
- no promise to a customer, and no internal deadline, is about to be broken;
- holding it is safe for the customer.

Held does not mean forgotten. A held failure is still an open, recorded wait, with a reason, a trigger that wakes it, what happens if the customer cannot wait — the rule for telling them where things stand — an escalation path, and a deadline the business can see. <!-- Level 2 failure: a held failure is a wait -->

While it is held, the customer is not left waiting. They get an honest update before the promised time, and no longer wait on Tend for it. The internal clock keeps running, with its reminders and its escalation. The customer's clock and the business's internal clock are explained in [the time and people file](time_people_and_meetings.md). <!-- Level 2 failure: the two clocks hold -->

The severity limits, and the kinds of consequence each business uses, are set with each business's settings. <!-- Level 2 failure: triage open -->

## Recovering the failed step

Two different things are called recovery. <!-- Level 2 failure: two recoveries -->

The first is recovering Tend itself, after a crash or a restart. The situation is rebuilt from its newest saved version, and goes back to the decision. That is written in [the time and people file](time_people_and_meetings.md). <!-- H6 -->

The second is what this file owns: what Tend does about the step that failed. <!-- Level 2 coordination: recovery boundary -->

Recovery never means restoring an earlier version and acting as if the failure did not happen. It means taking the declared failure, and moving from the newest facts Tend has to the next safe step. The record of the failure stays beside the new step. <!-- Level 2 failure: the goal of recovery -->

There are four moves: <!-- Level 2 failure: the recovery moves -->
1. try again, inside the tool layer;
2. for an outcome nobody knows, check it, never guess it;
3. when everything automatic is used up, hand the matter to a person, with the whole trail;
4. stop a service that is truly down from being called again and again.

### Trying again

Only the tool layer tries a step again. The AI never does. <!-- M4 -->

The tool tries a set number of times. It waits a little longer between each try, with a small random spread, so that many situations do not all try again at the same moment. <!-- M4; Level 2 failure: why the spread -->

Without that spread, many situations retrying together can turn one service's bad moment into a full outage. <!-- Level 2 failure: why the spread -->

When the outside system reported a failure, Tend knows the step did not go through, so trying again cannot do it twice. Whether trying again helps depends on the kind of failure: a transient failure may pass; a terminal one will not. This retry is never used for a step that cannot be undone, such as a refund: such a step is never repeated automatically, even after a clear failure, and a person decides. The one exception is the same request sent again with the same reference, after its status has been checked, when the outside system recognises a repeat; it is described below. <!-- Section 11: rule 18, never repeated --> <!-- Level 2 failure: a clear failure may be retried -->

How many tries, and how long the pauses are, are set with each capability and each business's settings. <!-- Level 2 failure: the numbers -->

### Stopping a service that is truly down

A service that is down for a long time is not called again and again. A **circuit breaker** — a switch in the tool layer — stops the calls. Later it tries once. If the service is back, calls start again. <!-- M4; Level 2 failure: the circuit breaker -->

This is what makes "repeat forever" impossible, for every situation at once, not just for one. <!-- Level 2 failure: the circuit breaker -->

How long the breaker stays open is set the same way. <!-- Level 2 failure: the numbers -->

### Handing the matter to a person

When trying again and checking are both used up, and the path is truly dead, Tend escalates to a person. <!-- M6 -->

The person gets the trail, in order: what was tried, against which bound, with what result, and what is still unknown. They decide. Their decision is recorded too. <!-- Level 2 failure: hand to a person -->

Who that person is, and how the escalation path runs, are written in [the time and people file](time_people_and_meetings.md). <!-- J3 -->

## When nobody knows whether a step worked

This is the hardest case, and the refund on order 9912 shows it. <!-- Level 2 failure: the hardest case -->

Tend sent the refund. The payment provider took the request, and then never answered. If an answer had come back, Tend would know: it worked, or it failed. The only hard case is the one with no answer. <!-- Level 2 failure: the hardest case -->

Sending the refund again could pay the customer twice. So Tend does not guess, and does not send it again on a guess. <!-- Level 2 failure: never on an assumed failure -->

Instead, it uses what the payment provider offers: <!-- M5 -->
- **First, the result is checked.** If the provider has a way to ask about a payment's status, the refund tool asks a small, set number of times.
- **Only if the result is still unknown, and the provider can recognise a repeat**, Tend may send the same request again, with the same reference, sparingly, with pauses between tries. The provider checks the reference — its common name is an **idempotency key** — and ignores a second request that carries the same one, so it does not pay twice.
- **If there is still no answer**, the refund tool's result declares the wait, the worker's fixed code saves it with the started refund in one version, and the status-check service takes over the waiting.
- **Either way, the situation waits.** The wait says what it is about (this refund), why (the outcome is unknown), what wakes it, and who can see it.
- **The customer is told honestly** that the business is waiting on the payment provider.
- **The rest of the work goes on.** Only the refund waits.

The status-check service listens for the provider's own news, and can also ask, through the tool layer: a limited number of times, with a set gap, for a set total time. Those limits are set for each provider when its tool is added. Its answer comes back as an arrival (an arrival is anything that comes in from outside — a message, an outside system's answer — saved as a new version) and wakes the situation; its asking alone never does. The full rule is in [the gathering file](gathering_and_trust.md). <!-- decided by the owner, 2026-10-17; decided 2026-10-22: the service calls through the tool layer; decided 2026-10-22: the status-check answer; settled 2026-10-22: the service's limits -->

The limit is five asks for one wait before the status-check service takes over; a business may set its own number. The tool asks these few times only where it knows how fast the outside system usually answers. <!-- M5; closed item: scope of the five; settled 2026-10-22: the five per wait -->

While the outcome is unknown, the situation stays waiting. It is not declared failed while the wait is inside its bound. <!-- IB-10 -->

The bound here is the **settle window**: the time the payment provider promises for a payment to become final. For Tend's own waits, the business sets its own window, with a default it can change. <!-- Section 8: the two settle windows -->

**When the settle window ends and nobody knows.** Tend does not send the refund again. It records the declared outcome as unknown, one of the four kinds above. It hands the case to a person, with the whole timeline. <!-- IB-10; M5 -->

Only a person should risk redoing a step that cannot be undone, on an outcome nobody knows. <!-- Level 2 failure: only a person redoes -->

The customer asks where the refund is. The reply comes from the record: the business is waiting on the payment provider. It is never a guess. <!-- Section 8 CASE-2: the reply from the record -->

If the outcome is unknown and the provider offers no way to ask: where it sends news of its own, the status-check service only listens, and the wait's time signal — the alarm for its due time — wakes the situation worker when the settle window ends; the worker declares the outcome unknown, and hands the case to a person with the whole timeline; where it does neither, the outcome is declared unknown at once, and a person gets the full record; the situation then waits for that person, under a recorded wait with its own bound. The step is never repeated automatically. <!-- Section 8 additions: no check path -->

Which steps count as irreversible is a value each business sets; the rule holds whatever the list. <!-- Level 2 failure: what is irreversible -->

## Before a step that cannot be undone

Every step that changes something outside Tend runs in a fixed order: <!-- Section 11: the fixed order -->
1. Check that some source — a system or a person — can answer this kind of question at all. For example, that a payment provider is connected.
2. Check permission.
3. Check that the same step was not already started.
4. Write down what is about to happen.
5. Make one call.

Step 3 stops a double payment. It is a different question from permission, in step 2. A refund goes ahead only when checks 2 and 3 both pass. The full rule for the permission check is in [the deciding file](deciding_and_permission.md). <!-- IB-8 -->

Step 3 reads the situation's saved starts, and the tool layer's notes, for an earlier attempt, before step 4 writes the new note into the tool layer's record. So it never finds its own note. <!-- IB-8: the record check -->

Step 4 comes before the money moves. If anything breaks during the call, the record already shows that the step was started. <!-- S7 -->

What a repeat may do depends on what the record shows: <!-- Section 8: resend or new start -->
- **The same request again, after no answer:** allowed only when the other side can recognise a repeat.
- **A new refund while the first one's outcome is unknown:** stopped at step 3. The unknown outcome stays on the record.
- **A new refund after the first one's outcome is known:** a new decision, with a new permission check and the business's rules.

The AI may propose a second refund while the first is unknown. Step 3 stops it, and the situation keeps waiting. <!-- Section 8 CASE-2: the second post is stopped -->

Starting the step, recording that its outcome is unknown, and writing the wait the tool declared are saved together, in one version, before the AI is told. <!-- IB-11; settled 2026-10-22: one version for a step and its wait -->

## When only part of Tend's world is down

A part being down does not have to stop the whole situation. Some work is honest to continue. Some must be held. Tend never hides which is which. <!-- Level 2 failure: partly down -->

**What continues.** Anything that does not depend on the missing source: earlier evidence, facts already recorded, other sources that still work, and safe, limited replies to the customer. The record marks that Tend is using what it actually has. <!-- Level 2 failure: what continues -->

**What is held.** Anything whose next safe step depends on the missing source. Meera's update depends on the carrier, the only tracking source, and it is down. Tend will not guess, and will not pass off another source as the answer. So that path waits, with its reason, its bound, and its escalation. <!-- Level 2 failure: what is held -->

**A weaker source is marked.** When Tend falls back to a source that is not the one holding the record, what it finds is marked as weaker or out of date. Tend may act on it when the step is safe and limited. It does not act on it when the step depends on a fact Tend has not confirmed. <!-- Level 2 failure: the degraded mark -->

For each question, Tend asks first the source that holds the record, and turns to another only when that one fails. The full rule is in [the gathering file](gathering_and_trust.md). <!-- Level 2 failure: per-claim source order -->

**Never on a weaker fact.** A step that cannot be undone never runs on a weaker or unconfirmed fact. If being wrong would move money, send a promise, or change data for good, Tend stops and brings it to a person. <!-- Level 2 failure: never irreversible on a fallback -->

Which fallback sources a business allows is set with its settings; how the "weaker" mark looks is left to whoever builds the screens. <!-- Level 2 failure: partly down open -->

### When a part of Tend itself is down

- **The AI, or the provider that runs it, is down.** Situations wait, go to a person, or stop safely. Nothing is sent without a recorded decision. <!-- Section 6 additions: degraded service -->
- **The conversation manager is down.** Incoming messages wait. Nothing is sent. <!-- Section 7: failure and unavailability -->
- **Understanding the arrival cannot run** (its AI is down), or routing's check fails twice: the arrival goes to the person the business named for arrivals Tend could not place. A message that is not about the business waits for that person too; nothing is guessed. (Added 2026-10-29.) <!-- settled 2026-10-22: memory unreachable; PL-3; PL-6 -->
- **The tool layer is down.** The situation worker does not save a change that depends on it. <!-- Section 7: failure and unavailability -->
- **The owner's view is down.** The record is not affected. The owner may hear later. <!-- Section 7: failure and unavailability -->
- **A part cannot be reached.** Its waits stay honest inside their bounds. Past their bounds, the situation worker records a failure. <!-- Section 7: failure and unavailability -->

### When an outside connection is retired

When a provider retires a connection Tend uses, that is an outside event. The fallback takes the work, the gap is shown, and the business decides whether to move to a new system. Open situations move over only on purpose, never silently. <!-- Section 6 additions: a retired connection -->

## The safety floor

Recovery is a risky time. The world is in a messy state while Tend tries something new. Four rules hold the whole time: <!-- Level 2 failure: the safety floor -->
1. **Never guess.** An unknown outcome is not filled in. A weaker source is called weaker.
2. **Never run an irreversible step on an unconfirmed fact.** It never runs because Tend assumed the earlier try failed.
3. **Keep the customer's promise, and keep the internal clock running.** The customer gets an honest update before the promised time, and the internal clock keeps running, with its reminders and escalation. Going quiet is not a repair; it is a hidden failure.
4. **Record every move.** What the path was, what broke, what was tried, and what came next. From that record, a person can rebuild the situation later, without memory or guesswork.

### When nothing safe is left

Sometimes no safe next step exists: tries are used up, other routes are closed, nobody can be reached, and what would happen is bad. Then Tend does not fake progress. It stops, visibly, with its reason stated. <!-- F4; Level 2 failure: the safe-hold -->

The situation is then **blocked**: no one is left to escalate to, and no safe step is left. It does not move on its own. The owner must decide what happens next; no one else can. The full rule is in [the deciding file](deciding_and_permission.md). <!-- Section 8 states -->

This stop is the **blocked** state above. It is also called a safe-hold: a visible pause with a reason and a deadline, while the business owner — the one person left — takes over. A blocked situation has no check-in, so its deadline is shown, but it does not wake the situation. When the deadline passes, the business owner is told without asking. <!-- our reading: safe-hold is blocked; O3 -->

An unexpected situation, with no known way of handling it, goes to a person. Tend says it does not know, and does not make a decision it cannot back with facts. <!-- settled page: unexpected situation -->

## Explaining a failure

Every failure can be explained, because of how it is recorded. The declaration carries its evidence and reason. The AI's argument and fixed code's decision are both in the audit. An escalation carries the whole trail. <!-- Level 2 explainability: explaining a failure -->

The person told about a failure hears what happened, why, and what happens next. How much they hear follows the list of fields they may see, as written in [the communicating file](communicating.md). <!-- Section 8 additions: gate messages -->

"Tend cannot know this here" is kept apart from "Tend failed". Mixing them would count ordinary gaps as failures, and would misdescribe what happened. <!-- INV-7; Level 2 explainability: why keep them apart -->

## What this area writes

- The situation worker writes every wait, every declared outcome, and every failure. <!-- Section 7 writer table: waits -->
- When a tool hands a wait to the status-check service, the tool declares it, and the worker's fixed code saves it. <!-- construction record, entry 21: writer question; decided 2026-10-22: the wait a tool declares -->
- The tool layer writes the state of its tries, and the note of what is about to happen before an irreversible step. It does not write the situation's record. <!-- Section 7: tool layer writes -->
- The tool layer returns what it found to the situation worker, which records the result. <!-- Section 7 tool layer: outcome -->
- The tool layer writes the audit entry for each important call it makes. <!-- O7 -->
- The status-check service's answer is saved as an arrival by the conversation manager; the worker writes what it means. <!-- construction record, entry 21: return path; decided 2026-10-22: the status-check answer -->

## What this responsibility refuses

Failure handling does not: <!-- Level 2 failure: what it does not own -->
- choose the next behaviour of each step — that is the decision;
- route work to a person — that is the people rules;
- decide what the business wants;
- choose how the audit is stored — that comes later, with the technology;
- follow a person's long path across many situations — that belongs to [the situation file](the_situation.md).

Tend never hides a failure, never guesses an outcome, and never repeats an irreversible step on its own. <!-- Level 2 failure: no silent state; IB-10 -->

The full list of what Tend refuses to own, with who owns each thing instead, is in [the non-responsibilities register](../checking/non_responsibilities_register.md). <!-- closed item: refusal register -->

## At a glance

| What Tend is responsible for | Who decides | What happens instead, or when it goes wrong |
|---|---|---|
| Recording a failure <!-- M1 --> | The situation worker | Never a fifth state, never silent <!-- Level 2 failure: no silent state --> |
| Telling waiting from failure <!-- M2 --> | Fixed code, against the bound the business set | No bound set: the capability's default, or the check-in, serves as the bound <!-- closed item: unset bound --> |
| Sorting a failure <!-- M3 --> | Fixed code, in the fixed order; the AI may give its reasons | Held failures stay recorded as waits, with a trigger and a deadline <!-- Level 2 failure: a held failure is a wait --> |
| Trying again <!-- M4 --> | The tool layer | A service truly down: the circuit breaker stops the calls <!-- Level 2 failure: the circuit breaker --> |
| An outcome nobody knows <!-- M5 --> | The tool asks a few times; then it declares the wait, and the status-check service waits | After the settle window: a person decides; never an automatic redo <!-- IB-10 --> |
| A step that cannot be undone <!-- IB-8 --> | Permission check, then the check for an earlier attempt | Already started: the new attempt is stopped <!-- Section 8: resend or new start --> |
| Working while part is down <!-- Level 2 failure: partly down --> | The situation worker | Never an irreversible step on a weaker fact <!-- Level 2 failure: never irreversible on a fallback --> |
| The automatic path used up <!-- M6 --> | The business's escalation path | Nothing safe left: blocked, with its reason <!-- Section 8 states --> |

## Open questions, and what is set later

Nothing in this area is open.

**Values set later** — not open questions; the design holds whatever they are: <!-- method: deferred to configuration -->
- the severity limits, and the kinds of consequence each business uses; <!-- Level 2 failure: triage open -->
- how many tries, how long the pauses, how long the circuit breaker stays open, and the status-check service's limits for each outside system; <!-- Level 2 failure: the numbers; settled 2026-10-22: the service's limits -->
- which steps count as irreversible, and which stand-in sources a business allows. <!-- Level 2 failure: what is irreversible; Level 2 failure: partly down open -->
