# Time, people, and meetings — what Tend is responsible for

This file answers one question: what must Tend be responsible for when work stretches over time, and when it depends on people?

Three duties sit here. First, keep each situation alive while it waits, and wake it at the right moment. Second, bring the right person in, and keep that person's part moving. Third, arrange meetings inside what each person has agreed to.

Tend is the software that keeps a business's operational problems moving. Each problem is one **situation**: one late parcel, one refund, one outreach. <!-- A1 -->

Two stories run through this file.

**Meera's parcel.** Meera asks where her parcel is. The business ships through a carrier, an outside company that delivers its parcels. The carrier's tracking has not changed for two days. Kabir, an employee, handles deliveries. <!-- written for this file: Meera's parcel -->

**Priya's meeting.** The owner gave Tend thirty people to contact about a product. Priya is one of them. She asks to speak to a person before she buys. <!-- Level 2 authority: thirty addresses; Product Vision: the meeting -->

Who is who here:
- The **situation worker** is the part that reasons about one situation. It decides the next step and writes what Tend concludes, including every wait.
- The **conversation manager** is the part that reacts when something happens. It records each incoming message, and decides whether an update is worth telling a person.
- The **communication layer** checks, sends, and records each message.
- **Fixed code** is code that always makes the same check. It is not the AI's judgment.
- The **status-check service** is the part that waits on an outside system while other work goes on. Its asks go out through the tool layer.
- A **wait** is a recorded decision to pause a situation until something named happens.
- A **human work item** is a piece of work for a person.
- To **escalate** is to hand the work to the next person who can act on it, or to raise how urgent it is. The **escalation path** is the business's own list of steps for when work is not done: who is reminded, who is told next, and how long each step waits.
- **Cover** means another person does the work for a while, when the responsible person is away.
- A **partner** is an outside business with its own job in the situation, such as the carrier.
- **The decision** is the situation worker choosing the next step. A **run** is one pass of the situation worker over one situation.
- **Authority** is the right to let a step happen, such as approving a refund.
- The **trail** is the record of what happened in a situation, in order.

Each rule here has one of these statuses:
- **Decided:** the project owner — the person designing Tend, not the business owner — said yes. On 2026-10-22 the project owner accepted every recommendation this design had made, and asked for the smaller questions inside them to be settled in the way that best fits; those points are Decided, and points settled that day say so. A rule marked as "the design's reading" was worked out from its sources rather than found written down; it is Decided too. <!-- decided by the owner, 2026-10-22 -->
- **Provisional:** a working choice that carries a condition for reopening it.
- **Rejected:** turned down on purpose, with the reason kept.
- **Deferred:** a value or a detail left, on purpose, to a later stage — **deferred to configuration** (each business or market sets it), **deferred to Level 3** (the stage that chooses the technology), or **deferred to implementation** (whoever builds it). The rule around it is Decided.

Two earlier status words, **To confirm** (written down, but not yet agreed by the project owner) and **Open** (no answer yet), are no longer used: since 2026-10-22, no rule here carries either.

A rule with no status word next to it is **Decided**: it has a source the project owner accepted. Every rule that is not Decided carries its word where it appears. In the rest of this file, "the owner" means the business owner.

<!-- Every rule below carries its code in a hidden note. Its meaning, source, and status sit in code_index.md in this folder. -->

## A situation lives on its record

Tend keeps each situation alive through its record. The record is saved, and every change is a new version. <!-- H1 -->

A restart loses nothing. If the computer running Tend stops, Meera's situation is still there when it starts again. <!-- H1 -->

Long work is not one long-running program. It is one situation that comes back to the decision again and again. <!-- Level 2 coordination: long-running work -->

Between two wake-ups, nothing runs. The record simply waits. If the carrier takes two days to investigate, no program stays open for those two days. <!-- Level 2 coordination: long-running work -->

A situation is running, waiting, blocked, or completed. Who moves it between these four is written in [the situation file](the_situation.md). <!-- states: liveness -->

## What a wait is

A wait is a decision to pause a situation, because the next safe step needs something Tend does not have yet. <!-- Level 2 coordination: wait definition -->

A wait is not "nothing happening". Tend has decided that the situation cannot move safely until one named thing happens. It writes down exactly what that thing is. <!-- Level 2 coordination: wait definition -->

"Wait" is a choice. "Waiting" is the state recorded once the wait is written down. [The deciding file](deciding_and_permission.md) explains this split. <!-- Level 2 decision: intention is not state -->

Every call to an outside system involves a wait, even a quick one. What matters is whether the wait may outlast the run of the situation worker that started it. The business's time answers put the line at the current conversation with the person; the design puts it at the run, which is stricter. <!-- Level 2 time: every call waits -->

A wait that begins and ends inside one run of the situation worker needs no record of its own. Any wait that may outlast the run is written in the book of waits, with its time signal. <!-- closed item: short waits in the book; settled 2026-10-22: short waits -->

The same tool can need either. The carrier answers a tracking lookup at once. "Find out why this parcel has not moved for seven days" may take three days, or never end. So whether a wait is recorded is decided for each call, from what the tool promises and from the situation. <!-- Level 2 time: per call -->

Two questions describe a wait. The first is where the wait sits. There are three places: <!-- Level 2 coordination: three levels -->
- **One call.** Tend asked one system or one person something, and the answer has not come back.
- **The situation.** The situation itself is paused, because its calls have not returned enough.
- **A set date.** The situation is parked until a date, such as a delivery due date.

A situation wait lets the current conversation end. Tend may have sent Meera an update, or handed work to Kabir. The situation stays open behind the scenes. <!-- Level 2 coordination: three levels -->

The second question is what the wait is for. There are three answers: <!-- Level 2 coordination: three subjects -->
- **An answer:** from a customer, an employee, a partner, or a tool.
- **A change Tend is watching for:** the parcel moves, or a payment settles.
- **A moment:** a date, a deadline, or the end of a waiting period.

Nothing else to wait for has been found. <!-- Level 2 coordination: three subjects -->

Watching for a change is kept as a wait in the book of waits, described below. It has no record of its own. <!-- closed item: watch record -->

## What every wait records

Each wait records eight things: <!-- H2 -->
1. **What it waits on:** a tool call, a person's answer, a state Tend watches, or a moment.
2. **Why:** what becomes possible when it ends.
3. **How long it may take:** a known limit, nobody knows, or a set date.
4. **What wakes it:** the exact event or time that brings the situation back to the decision.
5. **What happens if the person cannot wait:** an update, a note of where things stand, or a handoff.
6. **What happens if it never ends:** remind, change who is responsible, escalate, tell the owner, or block.
7. **Who can see it.**
8. **Who declared it:** the situation worker, or the tool that handed it to the status-check service. <!-- decided 2026-10-22: the wait a tool declares -->

Every wait also says whether the customer is told about it, or whether it stays silent. <!-- Section 8 additions: silent or told -->

Meera's wait, written out: <!-- Section 8 CASE-4: wait fields -->
1. It waits on the carrier's tracking.
2. The carrier's own tracking would let Tend tell Meera where her parcel is.
3. The carrier's answer has a known limit.
4. A tool result, a reply from the carrier, or a timer wakes it.
5. If the reply time promised to Meera comes first, she gets a short update. The two promises are explained below.
6. If the limit passes, the business's escalation path applies.
7. Meera sees a message. The business sees the wait, its deadline, and who is responsible.

Waits live in fixed code's own records, never in the AI's working memory. <!-- Level 2 coordination: waits outside the AI -->

A wait held only by the AI would vanish when that run ends. Nothing could wake it. It would not survive a crash. The owner could never see it. <!-- Level 2 coordination: waits outside the AI -->

## The book of waits

The **book of waits** lists every wait that may outlast its run, and the change that will wake it. <!-- H8 -->

It is the only list of who waits for what. No second list is kept. The status-check service keeps only a record of its own asks for each wait it serves, rebuilt from the book after a restart; it is never used to find who waits for what. <!-- Level 2 coordination: book of waits; settled 2026-10-22: the service's own list -->

The book is data kept with the situation records: one shared table of every open wait that may outlast its run. Nothing in the book acts by itself; parts read it. <!-- decided 2026-10-22: the book of waits -->
- The situation worker adds a wait to the book in the same save that writes the wait, and removes it in the save that ends it. So the book and the situations cannot disagree.
- The worker also sets each wait's **time signal**, the alarm for its due time. When it fires, it comes straight back to the worker for that situation.
- After a crash, every time signal is set again from the book.
- Nothing in the book acts.

When a change arrives, the conversation manager finds its situation, reading the book to see what that situation was waiting for. The owner view reads it too, to show what each situation is waiting for; and the status-check service reads it, to find each wait it must serve. <!-- Level 2 coordination: book of waits; decided 2026-10-22: the book of waits -->

Before writing a wait, Tend checks the book for an identical open wait: the same subject, the same kind, and the same purpose. If one exists, the situation uses it, and Tend never opens a second. Each wait still belongs to one situation. <!-- H5; Section 8 additions: identical wait -->

## What wakes a situation

A situation wakes on a message, a change in a system, a person's answer, the result from another software agent, or time. <!-- H4 -->

A timer wakes the situation worker, and nothing else. A timer never sends a message by itself. <!-- IB-1 -->

When a timer fires, the situation worker reads the newest version first. If a newer version has replaced the wait, nothing is sent. A late timer does nothing, and that is not an error. <!-- H10; IB-4 -->

When a timer and a message arrive together, the newer version decides. The timer finds its wait replaced, and does nothing. <!-- IB-4 -->

Every save goes out together with a signal: a short notice that a new version exists. A save without its signal is incomplete, and it is tried again. <!-- H9 -->

If a signal is lost anyway, the check-in (explained below) still wakes the situation. It wakes late. It never goes silent. <!-- Level 2 coordination: a lost signal heals -->

A wait ends when enough has come back. It does not need every call to come back. <!-- Level 2 time: enough, not all -->

For Meera's parcel, the carrier keeps the tracking record itself. So, to find where the parcel is, Tend asks the carrier first, and turns to the business's order system only if the carrier fails. When the carrier answers, Tend may stop waiting, even while other calls are still open. <!-- Level 2 time: enough, not all -->

When a wait ends, the situation worker decides what follows: wait again, send an update, block, or record the work as resolved. Only the conversation manager then sets the situation to completed, once no wait is open and the last message has gone out. <!-- Level 2 time: when a wait ends; decided by the owner, 2026-10-12 -->

The end of a wait is not the end of the situation. <!-- Level 2 time: when a wait ends -->

Every step Tend takes on its own has a cause it can show: the event that woke the situation, the step it was allowed to take, and what came of it. The owner can see what woke a situation. <!-- Level 2 coordination: visible agency; Section 8 additions: what woke it -->

## The check-in

Each waiting situation has one **check-in**: a set time when it wakes, even if nothing else has happened. <!-- Level 2 time: check-in -->

The check-in is the backstop. A lost signal, or a partner who never answers, cannot leave a situation forgotten. <!-- Level 2 time: check-in -->

The check-in belongs to the situation, not to each call. A call that answers at once does not get one. <!-- Level 2 time: check-in -->

The check-in comes later than the waits inside it. If the carrier promises an answer in two days, the check-in falls a little after two days. <!-- Level 2 time: check-in -->

When the check-in fires, the situation worker reads the newest version. It decides: keep waiting, remind a person or the partner, escalate, or bring the situation to the owner. If the situation keeps waiting, the worker sets the next check-in. <!-- Level 2 time: check-in -->

When the situation completes, its check-in is removed. It never fires again. <!-- Level 2 time: check-in removed -->

A blocked situation has no check-in. It wakes only when its cause goes away, or when a person acts. <!-- Section 8 additions: blocked has no check-in -->

The check-in is the only timer that wakes a situation on a regular schedule. A repeated job the business sets is its own situation, described further down. <!-- Level 2 time: the only regular wake; closed item: repeated jobs -->

Every timer has a wait behind it. A timer with no wait behind it is not allowed. <!-- Section 11: rule 21, a timer needs a wait -->

Each business sets its own check-in interval. The design fixes none. <!-- decided: check-in interval -->

## Waiting on an outside system

The status-check service waits on an outside system while the rest of the work goes on. It listens for the system's own news. It can also ask for news: a limited number of times, with a set gap between asks, for a set total time. Each ask goes out through the tool layer. <!-- decided by the owner, 2026-10-17; decided 2026-10-22: the service calls through the tool layer -->

This replaces an older rule: "no part of Tend checks on a fixed interval". <!-- construction record, entry 21: polling rule changes -->

Before the service takes over, the tool asks the outside system itself, up to five times for one wait, and only where it knows how fast that system usually answers; a business may set its own number. The service's own limits are set for each outside system when its tool is added, within that system's published limits; a business may tighten them. <!-- settled 2026-10-22: the five per wait; settled 2026-10-22: the service's limits -->

When a tool hands the waiting to the service, the tool's result declares the wait, and the worker's fixed code saves it, before the AI is told. <!-- construction record, entry 21: writer question; decided 2026-10-22: the wait a tool declares -->

The service's answer comes back as an event addressed to its wait. The intake step saves it as an arrival — anything that comes in from outside, saved as a new version — and that version wakes the situation worker. The worker gives the answer to the fixed code of the tool that declared the wait, which returns it as evidence; the worker then writes what it means. A repeated answer is caught by the intake step, which matches it by the wait and the outside system's reference. The service's asking never wakes a situation; only its answer does. <!-- decided by the owner, 2026-10-17; construction record, entry 21: return path; decided 2026-10-22: the status-check answer; construction record, entry 21: asking does not wake -->

If the service's limits run out with no answer, the wait's own time signal wakes the worker, which declares the outcome. <!-- closed item: recheck timer -->

## Waiting, blocked, and a declared failure

A wait comes back to the decision by itself: someone answers, a date arrives, a watched state changes, or the check-in fires. The situation worker then decides whether the wait has ended. <!-- H3; Level 2 coordination: a block does not end on its own -->

Blocked does not end on its own. No one is left to escalate to, and no safe step is left. <!-- H3; Section 8 states -->

The difference matters. A block treated as a wait would be woken forever, and the business would never see that it is stuck. A wait treated as a block would bring the owner a situation that would have settled by itself. <!-- Level 2 coordination: why the difference matters -->

Every wait has a limit, called its **bound**. The bound comes from a promise, an expected settle window (the time the outside party says the result will be final), a deadline, or the check-in. <!-- Section 8 terms: bound -->

Inside its bound, a wait is honest. A carrier that has not answered, inside the time the business set, is still a wait. <!-- H3 -->

Past its bound, Tend declares a failure. The failure is recorded with the bound that was crossed. <!-- H3; M2 -->

A failure is not a state of its own. It is recorded, and the situation stays running, waiting, or blocked. <!-- M1 -->

What follows a failure is written in [the failure file](failure_and_recovery.md). <!-- M2 -->

A wait is never without a bound. If the business never set one, the default in the capability's contract applies; if there is none, the check-in serves as the bound, and at each check-in the worker decides again whether waiting is still honest. <!-- closed item: unset bound -->

A blocked situation moves again when its cause goes away. <!-- Level 2 coordination: unblock -->
- the responsible person is back;
- a system comes back;
- the business changes a policy;
- the owner opens a safe path.

That is an unblock, not a completion. The situation goes back to the decision. <!-- Level 2 coordination: unblock -->

## Two promises and two clocks

A business makes two different promises to a customer: <!-- H11; Level 2 time: two promises -->
- a **response promise:** "we will tell you something useful by this time";
- a **resolution promise:** "we will have this sorted by this time".

Each promise has its own clock. <!-- H11 -->

The **customer clock** follows the response promise. Waiting does not stop it. <!-- Level 2 time: the customer clock -->

If Tend is still waiting when the promised time comes near, Meera gets an update before that time passes: "This is what we found. We are still waiting on the carrier. We will come back to you." <!-- Level 2 time: the customer clock; settled page: update before the promised time -->

Once the update has gone out, the customer clock pauses. Meera is **released**: she no longer waits on Tend for this. <!-- H11 -->

The **internal clock** follows the resolution promise. It keeps running after Meera is released, with its own reminders and escalation. <!-- H11 -->

So Meera is never left waiting because of a delay inside the business. And the carrier is never quietly excused because Tend is waiting on it. <!-- H11; Level 2 time: the caution -->

Many support tools pause everything while a ticket is on hold. Tend never pauses the internal clock. <!-- Level 2 time: the caution -->

The project owner gave an example. A business promises a reply within five minutes. Meera gets an update before those five minutes end. The carrier has its own deadline, say forty-eight hours. If the carrier misses it, the work goes to another contact. These numbers are examples, not settings. <!-- Level 2 time: example values -->

When a person cannot wait, the behaviour is the same everywhere: tell the person as soon as possible where things stand, and promise to come back when the wait ends. <!-- Level 2 time: release setting -->

The details are a setting for each business, such as how soon the update goes out. <!-- Level 2 time: release setting -->

The default values are set with the product's defaults and each business's settings. <!-- closed item: release defaults -->

Tend does not wait for a customer to complain about a delay. When a promised time is at risk, Tend tells the customer first. <!-- Product Vision: tell first; Section 8 additions: delay notice -->

A pause in tracking is not always a delay. A parcel may be moving between depots. Tend calls it a delay only when the pause has lasted long enough that a person would reasonably worry. <!-- Product Vision: a pause is not a delay -->

How long that is, the business sets, with a product default for each carrier. <!-- closed item: delay threshold -->

## Deadlines

A deadline is a fact, not a feeling of urgency. <!-- Level 2 time: deadlines -->

There are three kinds: <!-- Level 2 time: deadlines -->
- how soon the customer hears something useful;
- how soon the situation is fully resolved;
- internal steps, such as an escalation deadline or a partner's promised answer time.

Deadlines come from the business's settings, and from the situation itself, such as a delivery date or a meeting time. <!-- Level 2 time: deadlines -->

The decision reads a deadline like any other fact. <!-- Level 2 time: deadlines -->

A deadline does not resolve a situation. It changes what the next safe step is. <!-- Level 2 time: deadlines -->

When the carrier's deadline passes, Meera's situation stays open. The work moves to another contact, and the decision runs again. <!-- Level 2 time: deadlines -->

## Work that starts at a set time

Work that starts at a set time is a wait on a date. When the date comes, the situation wakes, and the decision runs. <!-- Level 2 time: scheduled work -->

Examples: <!-- Level 2 time: scheduled work -->
- the end of a feedback window;
- a delivery due on Friday;
- a follow-up date for a prospect who wants time to think;
- a follow-up three days after a message, when no reply has come, for each person on a list.

When the date comes, Tend reads the newest version first. If the parcel arrived early, or the person already replied, no reminder is sent. <!-- Level 2 time: scheduled work -->

Nothing runs in the background forever. Each piece of scheduled work is a wait with a due moment. <!-- Level 2 time: scheduled work -->

A repeated job the business sets, such as reviewing stuck orders every morning, is its own situation, with a wait that sets its next date each time it fires. It wakes only itself. The check-in stays the only regular wake of every other situation. <!-- closed item: repeated jobs -->

After the customer has the product, Tend waits the time the business chooses, then asks for feedback. Example values are seven to sixty days. They are not settings. There is no default: if the business sets no wait, Tend does not ask for feedback. <!-- H12; Section 8 additions: feedback wait -->

A low feedback rating goes back into support, as work for a named person: the staff member the business names, or, by default, the business owner. <!-- Section 11: low feedback rating -->

## Follow-up and nurture

A follow-up continues the same situation, when the business's rules allow it. <!-- H7 -->

A follow-up is useful contact, not repeated outreach. It answers something the person asked, gives an agreed update, checks whether they are ready, offers a meeting, or continues a purchase. <!-- H7; Level 2 journey: useful contact -->

A follow-up needs a clear purpose and a clear target. Tend invents neither. <!-- Level 2 journey: J7 -->

How often messages go out, and for how long, comes from the business's settings or from the owner's instruction. No single timer applies to every business. <!-- Level 2 journey: nurture cadence; Section 8 additions: nurture cadence -->

A **nurture** is a wait with a date. <!-- Level 2 journey: how a nurture moves -->

Back to the thirty people. The owner said: "follow up once after three days if there is no reply." So each person's situation waits three days. <!-- Level 2 journey: how a nurture moves -->

**If the person writes back first.** The conversation manager records the message. The situation worker writes Tend's reply. In that same version, it cancels the nurture wait, before the reply is sent. The cancel must come first, because the worker does not run again after the send. <!-- decided by the owner, 2026-10-12: nurture wait -->

The nurture then ends, unless the business's rule sets a new date. <!-- settled page: the nurture ends -->

When the three days pass, the old timer finds its wait gone, and sends nothing. <!-- Section 8 CASE-1 -->

**If the date comes and the person has not written.** The timer wakes the situation worker. The worker reads all earlier messages, then writes the next nurture message. If another one is due, it sets a new wait. If none is due, it records the work as resolved. <!-- Level 2 journey: how a nurture moves -->

The business sets how many nurture messages there are. <!-- Level 2 journey: how a nurture moves -->

The channel's rules apply to every follow-up. If a channel forbids a message, Tend does not send it. The channel rules have their home in [the communicating file](communicating.md). <!-- Level 2 journey: channel rules apply -->

## Never twice, never lost

Tend prevents duplicated work by how it is built. <!-- H5 -->

Four rules do it: <!-- H5; Level 2 coordination: duplicated work -->
- One problem is one situation, so a repeated message joins the existing one.
- Each piece of work for a person has one responsible party, so two people do not both refund the same order.
- For each question, Tend asks first the source that holds the record, and turns to another only when that one fails.
- An identical open wait is joined, never opened twice.

Repeating a failed call is a different question, with its own rules, written in [the failure file](failure_and_recovery.md). <!-- Level 2 coordination: duplicated work -->

When work is interrupted — by a crash, a restart, or an update to Tend — it is rebuilt from the newest saved version. <!-- H6 -->

Recovery does not restore an old picture and carry on. It rebuilds the open situation and runs the decision again on the newest facts. If Kabir answered during the outage, Tend uses his answer. <!-- H6; Level 2 coordination: recovery -->

A worker that crashes mid-run continues the work. It does not start over. <!-- H6 -->

What to do about the call that failed — try again, undo it, or escalate — is written in [the failure file](failure_and_recovery.md). <!-- Level 2 coordination: recovery boundary -->

Forgotten work cannot exist, because every waiting situation has a check-in. <!-- Level 2 time: forgotten work -->

Lost work cannot exist either, because what Tend knows is kept in the record, not in a running program. <!-- Level 2 time: forgotten work -->

## Many people, one record

People and systems never need to share one conversation. Each one adds its result to the situation's record. <!-- Level 2 coordination: independent actors -->

Kabir answers. The carrier reports. Each result lands on the record as a new version, and the decision runs again. <!-- Level 2 coordination: independent actors -->

Nothing waits for everyone to finish. A result is used when it arrives, if it matters and comes from the right source. <!-- Level 2 coordination: independent actors -->

Work on one situation never holds up another. Meera's parcel and Priya's meeting do not wait for each other. <!-- Level 2 coordination: independent actors -->

Every result shows who produced it, and when. <!-- Level 2 coordination: independent actors -->

## When a person is needed

When the next safe step needs a person, Tend says so plainly, and creates work for that person. <!-- J1 -->

[The deciding file](deciding_and_permission.md) says when a person must take part. This file is about what happens next: who the person is, what they are asked, and how the work keeps moving. <!-- Level 2 decision: routing to a person -->

A person is needed for many reasons, not only when the AI is unsure: <!-- Level 2 people: why a person -->
- the information exists only with that person;
- the customer must confirm what they are asking for;
- a business rule needs a person's approval;
- the business keeps that kind of consequence for a person;
- the evidence still conflicts;
- the policy is missing, contradictory, or out of date;
- someone must make an exception;
- the business must be represented by an authorised person;
- a partner must investigate, or do its own part;
- a request from an investor or another interested party needs a special path for what may be disclosed;
- the person has asked to take part.

"Person" does not mean only an employee. It can be a customer, a prospect, an employee, the owner, an administrator, a partner's representative, an investor, a regulator, or another interested party. <!-- Level 2 people: who counts -->

The same person can play different roles in different situations. The role they play now matters more than who they are. <!-- Level 2 people: who counts -->

One situation can need several kinds of help at once. Suppose Meera says the parcel marked as delivered never reached her. <!-- Level 2 people: the delivery dispute -->
- Meera may need to confirm that she did not receive it.
- Kabir may need to look into the order.
- The carrier may need to investigate the delivery.
- The owner may need to approve compensation.

## Ways a person takes part

Tend records how a person takes part. "A person is involved" says too little. <!-- J2 -->

A person can: <!-- J2 -->
1. be the subject of the situation;
2. give information;
3. confirm or acknowledge something;
4. authorise access or an action;
5. approve a business decision;
6. do the work;
7. answer for the work;
8. be consulted;
9. only be told.

Two more ways also count: a person who handles an exception, and a person who speaks for the business. <!-- Level 2 people: two more parts -->

Confirming is not consenting under the law. A customer who says "yes, look up my order" has confirmed a request. Whether that counts as legal consent depends on the purpose, the relationship, the place, and the law. <!-- Level 2 people: confirmation is not consent -->

Four things stay apart: <!-- Level 2 people: confirmation is not consent -->
- Tend records what was asked, and what the person answered.
- The business's policy says when a confirmation is needed.
- The permission rules say whether this person may authorise the step.
- The law says whether the answer is legally enough.

By default, a customer is not asked to confirm before their record is shown to a person in the business. A business can add that step. <!-- accepted call: customer confirmation -->

## Asking only when it matters

Tend asks for a person's attention only when that person's part can change the next safe step. <!-- Level 2 people: interruption; Level 1: do not interrupt -->

The question is not "can a person help?" It is: is a person's attention needed now, and is this the right request to make? <!-- Level 2 people: interruption -->

Before asking, Tend weighs: <!-- Level 2 people: interruption -->
- whether the answer can change the next safe step;
- how urgent the situation is;
- what happens if Tend waits;
- what being wrong would cost;
- whether another source can answer safely;
- whether the work is already with someone;
- whether the request can be combined with another one;
- whether the person is available now;
- whether the channel fits;
- whether the person agreed to, or set up, this kind of notice.

Requests are not all the same size. A customer confirming a lookup is a small request. Kabir investigating a failed delivery is a larger one. The owner approving compensation is a large interruption. A meeting with a partner may need several people, planned ahead. <!-- Level 2 people: interruption -->

Tend may lighten the load: <!-- Level 2 people: interruption -->
- wait for an event it already expects;
- read an authorised system instead of asking a person;
- combine related questions into one;
- give a limited answer while a deeper check goes on;
- notify a queue instead of several people;
- use a low-priority notice the business set up.

When the situation is serious or urgent, Tend never hides a request because it is inconvenient. <!-- Level 2 people: interruption -->

Working hours can differ by location. <!-- Level 1: working hours by location -->

Outside a person's working hours, a message waits for the next allowed time, or goes to someone else. <!-- Section 8 additions: working hours -->

A serious situation that cannot wait may use the escalation path, even outside normal hours. <!-- Level 2 people: interruption -->

## Finding the right person

The right person is the one who can safely take responsibility for this work. It is not the person closest to the message. <!-- J3; Level 2 people: the right target -->

Tend weighs: <!-- Level 2 people: the right target -->
- the kind of work;
- the person's role;
- the knowledge or skill it needs;
- whether the person may see the information;
- whether the person may approve, or speak for the business;
- their relationship with the customer or the partner;
- whether they are available, and their working hours;
- how much work they already hold;
- how urgent and how serious it is;
- the location or the market;
- the language or the channel;
- the limits on sharing data;
- the business's fallback and escalation rules.

Meera's parcel goes to Kabir, because he handles deliveries. <!-- J3; written for this file: Meera's parcel -->

The target need not be one named person. It can be an employee, a role, a team, a queue, an on-call rota, an approval group, the owner, a partner's representative, or another interested party. <!-- Level 2 people: the right target -->

Three different holders can each keep one piece. The payment provider keeps the record of the payment. An employee in accounts looks into the refund. The owner may approve compensation. <!-- Level 2 people: three holders -->

A person who speaks for the business is chosen by role and by that person's current preference, not by old records. <!-- Section 6 additions: representative -->

When no person is clearly right, Tend does not guess. It shows the work as unassigned. It uses the business's fallback, the owner, an administrator, or the escalation path. <!-- Level 2 people: no obvious target -->

The method for choosing a person, in order: the business's own routing rule for that kind of work — a name, a role, a queue, or a rota; then cover, if that person is away; then the business's fallback: the owner, an administrator, or the escalation path. <!-- closed item: routing method -->

Whether a business uses names, roles, queues, or rotas is the business's choice. <!-- Level 2 people: the right target -->

## One responsible party for each piece of work

Each piece of work for a person has one responsible party at a time. That party can be a person, a role, a team, or a queue. <!-- J4 -->

For each piece of work, Tend also keeps five roles apart: who does the work, who answers for it, who approves the next step, who contributes, and who is only told. <!-- Level 2 people: five roles -->

A work item shows: <!-- IA-14; Level 2 people: what a work item shows -->
- what the responsibility is;
- who is responsible now;
- who answers for the result;
- who may approve the next step;
- who contributes, or is consulted;
- who needs to be told;
- when the responsibility began;
- the deadline or wait that applies;
- what information the responsible party may see;
- each change of hands, in order;
- when it was acknowledged, which is not when it was completed;
- where it stands on the escalation path;
- the evidence, in order, for anyone who picks it up.

A work item is open, waiting for a handoff, waiting for a response, completed, or cancelled. <!-- IA-14 -->

One situation can hold several work items. In Meera's dispute there are four: Kabir's check, Meera's confirmation, the carrier's investigation, and the owner's approval. Each has its own responsible party, its own authority, and its own limit on what may be seen. <!-- Level 2 people: several work items -->

Tend does not force the work under one made-up owner. But a group is never shown as responsible without saying who answers for each piece. <!-- Level 2 people: five roles -->

When a group or a queue holds the work, its rule must be explicit: is one answer enough, or must everyone answer? <!-- Level 2 people: the group rule -->

For approvals, one answer from a group is enough, unless the business requires every member's (see [the deciding file](deciding_and_permission.md)). <!-- closed item: approval details -->

Tend coordinates the work and keeps its trail. It does not run the business's operation. The business still answers for its customer and its policy. The carrier still answers for its deliveries. <!-- Level 2 people: Tend coordinates -->

## When someone joins the work

When a new person joins, Tend shows what already exists: <!-- Level 2 people: joining -->
- what was already asked;
- who is responsible;
- what information has arrived;
- what is still unknown;
- what someone else is already doing;
- what this person is expected to do.

Tend never quietly sets two people to investigate the same question. <!-- Level 2 people: joining -->

If the business wants work done in parallel, Tend records why, and how the results will be combined. <!-- Level 2 people: joining -->

When new information changes the situation, Tend checks again every piece of work it affects. <!-- Level 2 people: when information changes -->

An old assignment does not stay active just because it came first. It may be cancelled, changed, handed on, or escalated. The earlier assignment stays in the history. <!-- Level 2 people: when information changes -->

## How a piece of work moves

The situation worker creates the work item, as a new version of the record. <!-- Section 7 writer table: human work; IA-14 -->

The request reaches the person as a message, through the communication layer. <!-- IA-14 -->

The answer comes back as an incoming message. The conversation manager records it. <!-- Section 7 writer table: human answer -->

The situation worker records what the answer means, and the decision runs again. <!-- J6 -->

A request for approval is a special case. It creates work for the approver, but the permission check still happens at the moment of the step. The rules for approvals live in [the deciding file](deciding_and_permission.md). <!-- Section 8: approval is not work -->

Acknowledging is not completing. When Kabir says "seen, on it", the work stays open until it is done. Whether his acknowledgement stops the escalation clock depends on the business's policy. <!-- Level 2 people: acknowledgement -->

## When nobody answers

Silence never counts as done. <!-- J5 -->

When a person does not act, Tend first names what lies behind the lack of action: <!-- J5 -->
1. the request was not delivered;
2. it was delivered, but not acknowledged;
3. it was acknowledged, but nothing has moved;
4. the person turned the work down;
5. the person is unavailable;
6. the person did the work, but did not record it;
7. the work is no longer needed, because the situation changed.

Tend names this before it chooses the next step. Each reason has its own next step: <!-- J5; closed item: handling per kind of silence -->
1. not delivered: send again on another allowed channel, or correct the address; this is not yet an escalation;
2. delivered, not acknowledged: a reminder, then the escalation path;
3. acknowledged, nothing moved: ask where it stands, then the escalation path;
4. turned down: the next person on the escalation path, at once;
5. unavailable: cover, as described below;
6. done, not recorded: ask the person to record it; no escalation;
7. no longer needed: the work item is cancelled.

Escalation can change different things. As the business's policy allows, Tend may: <!-- Level 2 people: what escalation can change -->
- remind the person;
- raise the urgency;
- notify them on another permitted channel;
- notify a supervisor or the owner;
- add a helper;
- reassign the work to another person, role, team, or queue;
- move it to someone with more authority;
- contact a partner;
- tell the customer about the delay;
- wait safely for a set event;
- stop safely, when no permitted path is left.

Each business sets its own escalation path: the order of its steps, and how long each step waits. The design sets no default order. <!-- Section 8 additions: escalation set by the business -->

A small business may have one owner and one fallback. A larger one may have teams, queues, on-call rotas, managers, and partner contacts. The problem is the same. The path is longer. <!-- Level 2 people: path depth -->

How many reminders are sent is set by each business, with a product default. <!-- closed item: reminders -->

An escalation carries the trail the next person needs: <!-- Level 2 people: what travels -->
- the problem as it stands;
- what the customer, or another person, asked;
- the history that matters;
- what information was used;
- what is missing, or in conflict;
- who owned the work;
- what was asked, and when;
- what answer or acknowledgement came;
- how much time is left.

A partner receives only what it is allowed to see. <!-- Level 2 people: what travels -->

An escalation that has gone past everyone assigned reaches the owner. <!-- Section 8: owner classes -->

The customer hears only what affects them: if a promise made to them will be missed, they get an honest word before it. The conversation manager decides this, as its update decision: whether to tell the person now. They are never told who inside the business has not acted. <!-- Level 2 people: telling the customer -->

## When the person is away

A person who is away is not the same as a person who does not answer. Cover comes before escalation. <!-- J7 -->

When Tend knows the responsible person is away, it uses the business's rules for cover. The options are: <!-- J7; Level 2 people: the cover options -->
- the person on call now;
- a team or a queue;
- a person who has been allowed to act for them;
- a named backup;
- waiting until the person is back;
- the partner's fallback contact;
- telling the owner;
- stopping safely, when no permitted substitute exists.

A person can be out of reach for several reasons: <!-- Level 2 people: kinds of away -->
- on leave, or absent;
- outside working hours;
- the channel to reach them is down;
- the business system they need is down;
- too busy;
- changed role, or left;
- their authority has expired;
- not known.

A free calendar does not prove that a person is free. <!-- Level 2 people: kinds of away -->

Tend learns that someone is away only from a source: the person marking themselves away, the business's calendar or staff system through a tool, or an automatic out-of-office reply. Silence alone never counts as away. <!-- Level 2 people: detecting absence -->

Moving the work does not move the authority. <!-- J9 -->

A person covering for Kabir may be able to do his work, but not to approve what he could approve. <!-- J9; Level 2 people: authority stays -->

So before any step that cannot be undone, on work that was handed on or covered, Tend checks that the new person has the permission. <!-- J9 -->

If only one person can safely answer, Tend may need to wait. The wait stays visible, with its reason, the event it expects, its deadline, and its escalation path. <!-- Level 2 people: no substitute -->

If waiting would be too risky and no safe substitute exists, Tend escalates to the right person, or stops safely. <!-- Level 2 people: no substitute -->

Tend never invents an answer. It never quietly uses a person with less authority. <!-- Level 2 people: no substitute -->

When a person leaves or changes role, Tend does not keep that person as the responsible party. <!-- Level 2 people: a leaver -->

What happens to a leaver's grants, and to the approvals still waiting for them, is in [the deciding file](deciding_and_permission.md). <!-- Level 2 authority: grant lifecycle -->

## Handing work on

A handoff moves responsibility for a defined piece of work to another person. <!-- J8 -->

The work moves with its full context. A handoff says: <!-- J8; Level 2 people: what a handoff says -->
- why the work is moving;
- what the situation means now;
- what has already happened;
- what is known, missing, or in conflict;
- what is expected next;
- the deadline or wait that applies;
- the authority the work needs;
- what the new person may see;
- what the previous person already told others.

A message telling a person the work is theirs is not an acceptance. A handoff stays pending until the new person accepts it. Until then, the previous person stays responsible. <!-- J8; Section 8: a notice is not an acceptance -->

A handoff is accepted automatically only where the business has set a rule for it, for example for a queue. <!-- Section 8 additions: auto-accept -->

The work item then records which rule accepted it. <!-- J8: acceptance rule recorded -->

A handoff and an escalation are different events. A handoff moves the work. An escalation raises its urgency, or changes who must act. An escalation can include a handoff, but the two are recorded apart. <!-- Section 8 additions: handoff and escalation -->

If new information arrives during a handoff, the new person works from the newest version. The new information may make the handoff unneeded, or change what is needed. <!-- Level 2 people: handoff during change -->

Three more rules about handoffs: <!-- Level 2 people: handoff open -->
- acceptance is explicit for every kind of work, unless the business has set a rule that accepts that kind automatically;
- a handoff waits to be accepted until a deadline the business sets; then the escalation path runs;
- a manager may force a handoff only where the business's settings give that role the right. A forced handoff is recorded as forced.

A handoff starts in one of three ways: the answerable person asks to hand the work over; the business's cover rule applies; or the escalation path moves the work on. <!-- closed item: what starts a handoff -->

## A meeting is a wait on people and a date

A meeting is the decision to invite people, followed by a wait. The wait is on one or more people, and on a date. <!-- K1 -->

A meeting needs no new machinery. It fills in the same eight things as any wait, in the same order: <!-- Level 2 meetings: a meeting is a wait; decided 2026-10-22: the wait a tool declares -->
1. **What it waits on:** the people attending, and the date and time.
2. **Why:** the meeting's purpose, such as a sales call.
3. **How long it may take:** until the person answers, then until the set date and time.
4. **What wakes it:** the person's confirmation, and then the meeting time arriving.
5. **What happens if the person cannot wait:** if Priya is not ready, she may be released with an update.
6. **What happens if it never ends:** the meeting does not happen, and the two counts below decide what follows when that repeats.
7. **Who can see it:** the people attending and the business see the booked meeting and its date.
8. **Who declared it:** the situation worker, when it books the meeting.

After the meeting, its outcome creates the next piece of work. <!-- K1; Level 2 meetings: a meeting is a wait -->

## Who may take the meeting

Priya wants to talk before buying. Two questions decide who meets her, and both must pass. <!-- Level 2 meetings: who is suitable -->

**Who may take this meeting at all?** The business's rules decide this, from role, skill, and meeting type. The business's rules do not offer a support employee to someone about to buy. Fixed code answers this from the settings. The AI does not guess it. <!-- Level 2 meetings: who is suitable -->

**Who has agreed to take it?** The person must have said they take this kind of meeting at this time. A free slot on the calendar is needed, but it is not enough. <!-- Level 2 meetings: who is suitable; Product Vision: a free calendar -->

When several people may take the meeting, the meeting type and the business's rules choose. The AI may then rank who fits best, such as the person Priya will relate to most. <!-- Level 2 meetings: who is suitable -->

The AI never decides who may take a meeting. It never invents a person's willingness. <!-- Level 2 meetings: who is suitable -->

## A real slot

A slot is real only when three things hold together: <!-- K2 -->
- the person may take this kind of meeting;
- the calendar says the time is possible;
- every participant has said they will accept it.

The calendar alone says only that a slot could exist. It knows working hours, time zones, holidays, and days off. <!-- Level 2 meetings: three inputs -->

## Asked once, then booked inside

Each person states their willingness once, in advance. For example, a salesperson says: "for sales calls, I take weekday mornings." That statement is their **standing intent**. <!-- Level 2 meetings: intent asked once -->

A meeting inside the standing intent needs no new yes. The person already agreed when they stated it. <!-- Level 2 meetings: intent asked once -->

A meeting outside it needs the person's new word. Tend asks. It does not guess. <!-- Level 2 meetings: intent asked once -->

This is why a meeting of ten people is workable. Tend gathers each person's standing intent once, and books inside the overlap. It does not ask all ten again about every slot. <!-- Level 2 meetings: intent asked once -->

The meeting type sets how Tend books: <!-- Level 2 meetings: how Tend books -->
- **A routine meeting,** such as a support call. Tend books straight from the standing intent, then tells the person: "As per your weekday-morning instruction, I set up the meeting at 10:00. Tell me if that does not work."
- **A meeting at a decision point,** such as a prospect about to buy. Tend checks with the person first. Priya's meeting is this type.

A person's own preference can change this, and so can the business's rules. <!-- Level 2 meetings: how Tend books -->

Booking from a standing intent is a default, not a lock. The person can always say the time does not work. <!-- Level 2 meetings: how Tend books -->

A standing intent has an end date. "Free on weekday mornings" said a month ago is not "free this Tuesday". <!-- Level 2 meetings: intent expires; Section 6 additions: a preference ends -->

The working default for how long a standing intent lasts is a month. Each business sets its own. <!-- Level 2 meetings: intent expires; Section 8 additions: meeting values -->

A booked slot is held until it is confirmed or released. <!-- Section 8 additions: a slot is held -->

Meetings respect the working hours of each location. <!-- Section 8 additions: working hours -->

Priya's case, start to finish. Her meeting is a sales call, so only sales staff may take it. Ravi, a salesperson, has said: "for sales calls, I take weekday mornings." Priya is about to decide, so Tend checks with her first. She picks Tuesday at 10:00, which sits inside Ravi's mornings. The sales-call rule allows Ravi, the calendar shows Tuesday at 10:00 free, and Ravi's standing intent covers it, so the slot is real. Tend books it and tells Ravi. <!-- written for this file: Priya's booking -->

## When a meeting does not happen

A meeting that is cancelled, missed, or moved is a wait that ended without the meeting. Tend records it as a **meeting event**. <!-- K3 -->

The event records why it happened, in the person's words; when; and whether someone's reserved time was used up. <!-- Level 2 meetings: the meeting event -->

The three do not cost the same: <!-- Level 2 meetings: the meeting event -->
- **Missed.** Someone held the time, and the person never came. Real time was lost.
- **Cancelled in good time.** The slot was freed. Almost nothing was lost.
- **Moved politely.** The slot was freed and used again. Almost nothing was lost.

A missed meeting has a next step. <!-- K3 -->

## Two counts protect people's time

Two counts are worked out from the meeting events. Neither is stored as a separate record. <!-- Level 2 meetings: two counts; Section 8 additions: counts are worked out -->

**The count in one situation.** It counts the meeting events in one situation. Past a low limit, the person must state their willingness again before the next booking in that situation. No meeting is refused by this count; the person is asked first. <!-- Level 2 meetings: two counts -->

**The count for one person.** It counts the pattern across all of a person's situations. Past its limit, routine booking stops for that person. They are told the limit is used up. A senior person in the business gets the full history. <!-- Level 2 meetings: two counts -->

The limit is never a silent no. It hands the decision to a person who can judge. <!-- Level 2 meetings: the limit is a hand-over -->

A documented emergency does not count. That exception, the **waiver**, is recorded, so it can be checked later. <!-- Level 2 meetings: the limit is a hand-over -->

Each business sets the limits, the waivers, and the expiry rules. The design gives no values for them, except the working default that a standing intent lasts a month. <!-- Section 8 additions: meeting values; Level 2 meetings: intent expires -->

## The meeting chain ends at the senior

The **meeting chain** is what Tend does when one person's meetings keep being missed, cancelled, or moved. It has two steps, and no more: <!-- Level 2 meetings: the chain ends -->
1. The person count passes its limit.
2. One escalation goes to a senior person.

The person can no longer book meetings on their own. The senior gets the full report: the person's history across their situations, the repeated misses or moves, and why routine booking stopped. <!-- Level 2 meetings: the chain ends -->

Then the chain ends. The senior alone decides whether to reach out. <!-- Level 2 meetings: the chain ends -->

This is deliberate. A longer chain would bother the very people whose time it protects. <!-- Level 2 meetings: the chain ends -->

The senior's own silence is not hidden. If the senior gets the report and does nothing, the business has not acted. The owner is alerted to it, as to any escalation that has gone past everyone assigned. No new meeting chain starts. <!-- Level 2 meetings: the senior's silence -->

The owner is the last person who answers. <!-- Level 2 meetings: the senior's silence -->

## After the meeting

A meeting never ends blank. Its outcome creates the next step: work for a person, with one responsible party. <!-- Level 2 meetings: after the meeting; Section 8 additions: the meeting outcome -->

After Priya's call: <!-- Level 2 meetings: after the meeting; Product Vision: after the call -->
- **She buys.** The next step is her order. It belongs to the person who must carry it out.
- **She wants time.** The next step is a wait: give her time, do not pester her, do not forget her. A gentle follow-up is set for the agreed time.
- **She raises a new question.** It becomes its own next step, or its own situation, each with a responsible party.

The person responsible for the next step is chosen like any other, by role, authority, availability, and the business's rules. It may be the person who ran the meeting, or someone else. <!-- Level 2 meetings: after the meeting -->

Tend records the outcome, decides its own next step, and sends the work to a person. The business decides what actually happens next. <!-- Level 2 meetings: after the meeting -->

## Contacting a partner

A partner is contacted only when escalation calls for it, and only when the business's policy allows partner contact. <!-- K4; decided by the owner, 2026-10-12: partners after escalation -->

Back to Meera. Kabir owns the delivery work, and he has not acted within the business's time. The business's path may remind him, escalate, wait for a set event, or contact the carrier directly. <!-- Level 2 meetings: the partner trigger -->

Contacting the carrier is one option. It is never automatic. <!-- Level 2 meetings: the partner trigger -->

In Meera's case, the business's path first reminds Kabir. He still does not act, and the business allows partner contact, so Tend contacts the carrier. The carrier reports that the parcel is held at a depot, and gives a delivery date. Tend tells Meera what the carrier reported. When the parcel arrives, the worker records the work as resolved. The conversation manager completes the situation once no wait is open and the last message has gone out. <!-- written for this file: Meera's outcome -->

Who is told first comes from the business's settings. It is not always the partner. <!-- settled page: who is told first -->

Contacting a partner is handled like a meeting. The partner has its own people, its own rules, and its own hours. Tend first gathers its representative's willingness, then sets a time. <!-- Level 2 meetings: the partner shape -->

Tend prepares the trail of what happened, in order. The employee working on the problem sees all of it. The partner sees only the part the business allows: the tracking number, the problem, and what it is asked to do. <!-- Level 2 meetings: the trail; K4; Level 2 channels: partner -->

The partner never sees Meera's private details beyond that. The note is about this one shipment, not about Meera's other problems. <!-- Level 2 channels: partner; settled page: this shipment only -->

The partner owns its part of the work. Tend never pretends to hold the partner's answers. <!-- Level 2 meetings: the partner owns its part -->

The communication layer sends the contact. The contact is recorded on the trail. <!-- Section 11: who decides, acts, and approves; Section 8: partners -->

Who may see which field — including each partner — has its home in [the deciding file](deciding_and_permission.md). <!-- T11 -->

Each disclosure to an investor or a regulator needs approval from a named person. <!-- accepted call: investor and regulator -->

## What this area writes

- The situation worker writes every wait: when it opens, when it is refreshed, and when it ends. It also writes the result of each timer and check-in, and any declared outcome. <!-- Section 7 writer table: waits -->
- This includes the wait a tool declares when it hands work to the status-check service: the worker's fixed code saves it, with its entry in the book of waits. <!-- construction record, entry 21: writer question; decided 2026-10-22: the wait a tool declares -->
- The situation worker writes each work item for a person, and each change to it. <!-- Section 7 writer table: human work -->
- The conversation manager records each answer from a person, because it arrives as an incoming message. <!-- Section 7 writer table: human answer -->
- The situation worker writes each meeting event, because a meeting event is a wait that ended. <!-- our reading: meeting event writer -->
- The communication layer sends each request to a person and each partner contact, and records what it sent. <!-- Section 7 parts: communication layer -->
- Time itself writes nothing. It only produces changes that wake a situation. <!-- Section 7 writer table: time produces changes -->

## What this responsibility refuses

Time decides nothing. It only produces changes. The decision does the deciding. <!-- Level 2 time: time does not decide -->

Tend never treats silence as completion, or a notice as an acceptance. <!-- J5; J8 -->

Tend never moves authority along with the work. <!-- J9 -->

Tend does not decide the business's policy, what is true, or the business's outcome. <!-- Level 2 people: what Tend does not decide -->

Tend does not grant access. It does not decide the legal basis for using personal data. <!-- Level 2 people: what Tend does not decide -->

Tend does not do the work that belongs to an employee or a partner. It cannot promise that a person will answer. <!-- Level 2 people: what Tend does not decide -->

Tend never invents a person's willingness to meet. <!-- Level 2 meetings: who is suitable -->

The full list of what Tend refuses to own, with who owns each thing instead, is in [the non-responsibilities register](../checking/non_responsibilities_register.md). <!-- closed item: refusal register -->

## At a glance

| What Tend is responsible for | Who decides | What happens instead, or when it goes wrong |
|---|---|---|
| Keeping each situation alive on its record <!-- H1 --> | Fixed code saves every version | A restart rebuilds the situation from the newest version <!-- H6 --> |
| Writing every wait down <!-- H2; H8 --> | The situation worker | An identical open wait is joined, never opened twice <!-- H5 --> |
| Waking at the right moment <!-- H4 --> | An answer, a change, or a timer. A timer wakes only the situation worker | A replaced wait sends nothing. A late timer does nothing <!-- IB-4 --> |
| The check-in <!-- Level 2 time: check-in --> | Each business sets the interval | A lost signal means a late wake, never silence <!-- Level 2 coordination: a lost signal heals --> |
| Keeping waiting, blocked, and a declared failure apart <!-- H3 --> | The situation worker, against the bound | Past the bound, a failure is declared <!-- H3; M2 --> |
| Two promises, two clocks <!-- H11 --> | The business's promised times | An update goes out before the response promise is missed <!-- settled page: update before the promised time --> |
| Follow-up and nurture <!-- H7 --> | The business's rules, or the instruction | A reply comes first: the nurture wait is cancelled in the same version <!-- decided by the owner, 2026-10-12: nurture wait --> |
| Bringing a person in <!-- J1; J2 --> | The situation worker creates the work | No clear person: the work is shown unassigned, and the fallback is used <!-- Level 2 people: no obvious target --> |
| One responsible party at a time <!-- J4 --> | The business's routing rules | A group never stands in for a named answerer <!-- Level 2 people: five roles --> |
| Acting on silence <!-- J5 --> | The business's escalation path | Silence never counts as done. The path runs <!-- J5 --> |
| Cover for a person who is away <!-- J7; J9 --> | The business's cover rules | No substitute: a visible wait, an escalation, or a safe stop. Authority never moves with the work <!-- Level 2 people: no substitute; J9 --> |
| Handing work on <!-- J8 --> | The new person accepts | Until then, the previous person stays responsible <!-- J8 --> |
| Booking a meeting <!-- K1; K2 --> | The rules decide who may. Each person's standing intent decides when | Outside the standing intent: Tend asks <!-- Level 2 meetings: intent asked once --> |
| A meeting that does not happen <!-- K3 --> | Recorded as a meeting event; the counts follow | Past the person's limit: one escalation to a senior, then the chain ends <!-- Level 2 meetings: the chain ends --> |
| Contacting a partner <!-- K4 --> | The business's policy, after escalation | Only the allowed information. The partner owns its part <!-- K4 --> |

## Open questions, and what is set later

Nothing in this area is open. Each tool's contract states its settle window, how many times it asks — at most five for one wait — and the wait it declares; that contract is the one place where the wait rules and the call rules meet (the design's reading). <!-- Q11; decided 2026-10-22: the wait a tool declares -->

**Values each business sets** — not open questions; the design holds whatever they are: <!-- method: deferred to configuration -->
- the check-in interval, tool time limits, and how soon a person who cannot wait is told; <!-- closed item: release defaults -->
- how long a pause in tracking lasts before it counts as a delay; <!-- closed item: delay threshold -->
- how many reminders come before the next step; <!-- closed item: reminders -->
- which customer steps need the customer's confirmation. A confirmation counts as consent only when it is recorded as the consent records require; <!-- Level 2 people: confirmation open; decided 2026-10-22: consent records -->
- which meeting types it uses, beyond the product's base list; and the limits on what each kind of partner may see. <!-- Level 2 meetings: open; closed item: field list format -->

A meeting with a partner can be arranged only when the business's policy allows partner contact, the business's escalation path has reached the step where the partner is contacted, and the partner's contact and agreed times are known. <!-- Level 2 meetings: open; K4 -->
