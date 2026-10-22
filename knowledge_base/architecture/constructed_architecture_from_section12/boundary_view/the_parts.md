# The parts of Tend — what belongs together, and what does not

This file answers one question: what belongs together inside Tend, and what does not?

Tend is the software that keeps a business's operational problems moving. Each problem is one **situation**: one late parcel, one refund, one message to a possible customer. <!-- A1 -->

Tend is built from ten **parts**. For each part, this file says:
- **What it is:** its job, in one line.
- **What it does:** the responsibilities it carries.
- **What it owns:** the records it keeps, and the kinds of change it may write.
- **What it may decide.**
- **What lies outside it:** what it never does, and who does that instead.
- **What would make it change:** the kind of new need that would mean changing this part.
- **Why it stays separate:** why it is not merged with the part next to it.
- **When it is down:** what happens if it cannot be reached.

The full list of Tend's responsibilities is in [the summary of responsibilities](../responsibility_view/responsibilities_at_a_glance.md). Why each choice was made is in [the decisions file](../decision_view/the_decisions.md).

Each rule here has one of these statuses:
- **Decided:** the project owner — the person designing Tend, not the business owner — said yes. On 2026-10-22 the project owner accepted every recommendation this design had made, and asked for the smaller questions inside them to be settled in the way that best fits; those points are Decided, and points settled that day say so. A rule marked as "the design's reading" was worked out from its sources rather than found written down; it is Decided too. <!-- decided by the owner, 2026-10-22 -->
- **Provisional:** a working choice that carries a condition for reopening it.
- **Rejected:** turned down on purpose, with the reason kept.
- **Deferred:** a value or a detail left, on purpose, to a later stage — **deferred to configuration** (each business or market sets it), **deferred to Level 3** (the stage that chooses the technology), or **deferred to implementation** (whoever builds it). The rule around it is Decided.

Two earlier status words, **To confirm** (written down, but not yet agreed by the project owner) and **Open** (no answer yet), are no longer used: since 2026-10-22, no rule here carries either.

A rule with no status word next to it is **Decided**: it has a source the project owner accepted. Every rule that is not Decided carries its word where it appears. In this file, "the business owner" means the person who runs the business Tend serves.

<!-- Every rule below carries its code in a hidden note. Its meaning, source, and status sit in code_index.md in this folder. -->

## Words used in this file

- A **version** is one saved state of a situation, after a change. An old version is never changed. <!-- HC-1 -->
- A **notice** is a short internal signal that a new version exists. People never see it. A **message** is what a person sends or receives. <!-- Section 7: the change channel -->
- An **arrival** is anything that comes into Tend from outside: a customer's message, an outside system's answer, a platform's news. The intake step saves each one as a new version. <!-- decided 2026-10-22: the status-check answer -->
- A situation's **state** is running (Tend is working on it), waiting (paused until a named thing happens), blocked (no safe step is left, and no one is left to escalate to), or completed (closed). <!-- states: liveness; Section 8: the states table -->
- A **wait** is a pause on a situation until one named thing happens. The **book of waits** lists every wait that may outlast its run, and what will end it. A **time signal** is the alarm set for one wait's due time. <!-- HC-3; decided 2026-10-22: the book of waits -->
- A **claim** is one statement from one source, with a time. <!-- E1 -->
- **The AI** suggests the next step. **Fixed code** is code that always makes the same check. The AI never decides alone. <!-- Level 2 security: the spine -->
- The **permission check** is the fixed check before every step that changes anything outside Tend, or reveals information. It answers Allow, Deny, or "a person must approve first". It reads the **trusted permission store**, the one place where the business's permissions are kept. <!-- T2; AC-4 -->
- A **grant** is a range of steps a business allows Tend to take. <!-- T3 -->
- The **configurator** is the person who sets the business up: the business owner, or someone the business owner names. <!-- G7 -->
- A **member** is a person who works for the business, proved by the sign-in provider the business uses (the outside service that checks who a person is when they sign in). Customers and partners are not members. <!-- decided 2026-10-22: identity and permission -->
- A **capability** is one action the business has switched on, such as checking where a delivery is. <!-- P1 -->
- A **run** is one pass of the situation worker over one situation. <!-- S1 -->
- A **channel** is one way of reaching a person: WhatsApp, email, Telegram, or the website chat. <!-- L1 -->
- A **link** is a recorded connection between two situations, such as two problems on the same order. <!-- A3 -->
- To **escalate** is to pass work to the next person on the business's own list, when it is not done. <!-- J5 -->
- **Compliance settings** are the business's legal and platform rules for each country or region it works in. <!-- Section 7 additions: compliance settings -->
- A **reading** is something the design inferred where nobody had written a rule. The project owner accepted every reading in this file on 2026-10-22. <!-- change drivers: situation record -->

## What a part is

A part is a group of work that: <!-- Section 7: what a part is -->
- does one job;
- writes one kind of change, or a small set of kinds;
- can be changed, run, and fixed together.

A part is not justified by its name, its storage, or the servers it runs on. <!-- Section 7: what a part is -->

A group of work is its own part when it is a whole job that one part can carry from start to finish, and any smaller piece could not finish its job alone. <!-- Section 7 additions: smallest complete problem -->

A part's name is only a label. Its meaning is the line under "What it is". For example, "tool layer" means "the only way Tend calls an outside system". <!-- method: names are labels -->

This file says what each part does. It does not say what software builds it; that is chosen later. <!-- method: logical, not technical -->

## The ten parts at a glance

| Part | Its job | What it must never do |
|---|---|---|
| Situation record | The saved history of one problem, kept as a list of versions; the book of waits is kept with these records | Rewrite an old version |
| Situation worker | Decides the next step for one problem, and writes what Tend concludes | Send a message; set a situation to completed |
| Conversation manager | Takes each arrival, puts it on the right problem, decides whether a person should hear an update, and sets completed | Decide the next step for the problem |
| Communication layer | Shapes, checks, sends, and records each message; keeps the consent records | Decide what to say |
| Tool layer | The only way Tend calls an outside system, such as a payment provider, a shipping system, or a messaging channel | Repeat a step that cannot be undone when its result is unknown |
| Status-check service | Waits on an outside system while the work goes on | Decide anything about a situation |
| Memory | Remembers useful context, and suggests links or lessons | Change a rule, a permission, or a setting |
| Owner view | The screens people open, built from the records when asked | Write anything |
| Configuration | The business's settings, permissions, and members, written only by the configurator's fixed tools | Be written by anyone else |
| Improvement | Learns from saved records of past runs, to improve the product | Change a business rule |

<!-- Section 11 §5: the parts table; Section 7: the parts table; decided 2026-10-22: the book of waits; decided 2026-10-22: consent records; decided 2026-10-22: identity and permission -->

The last column is the short version of "What lies outside it" in each part below.

The conversation manager holds three things: the intake step, the situation worker, and the communication layer.
- The situation worker and the communication layer are parts of their own, with their own jobs and rules, so they are counted among the ten.
- The **intake step** is the fixed step inside the conversation manager that reads each new arrival first. It is not counted among the ten.

The tool layer is outside the conversation manager. <!-- decided by the owner, 2026-10-10: what the conversation manager contains -->

The situation record only holds the history. The other nine act. <!-- Section 11 §5: the parts table -->

The intake step and the situation worker never call each other directly. One writes a version of the situation; its notice wakes the other, which reads it. The situation record, and its notices, are the only connection between them. <!-- Section 7: the parts never call each other -->

The worker reaches outside systems only through the tool layer. The tool layer returns what it found to the worker as evidence. <!-- IB-7 -->

For example, Meera, a customer of the business, writes "Where is my parcel?":
1. The conversation manager matches her message to her open parcel situation, and saves it there as a new version. Saving that version sends a notice.
2. The notice wakes the situation worker. It decides to ask the carrier, the delivery company. The permission check says Allow, and the tool layer asks. The carrier answers "out for delivery, due Tuesday". The worker saves that answer as a new version.
3. That version's notice wakes the conversation manager. It decides Meera should hear this now, because she asked and the answer is in.
4. The communication layer runs its send check — its check before each message goes out — sends Meera "Your parcel is out for delivery, due Tuesday", and records what it sent.

<!-- Section 7: how the two parts work together -->

## 1. The situation record

**What it is.** The saved history of one problem, kept as a list of versions. <!-- Section 11 §5: the parts table -->

**What it does.** It keeps each problem as one record, with its whole history. Each version can be read on its own. <!-- A1 -->

**What it owns.** The versions of each situation, its links to other situations, its outcome when it closes — one of the eight endings listed in [the situation file](../responsibility_view/the_situation.md) — and its state. <!-- A1; A3; states: liveness -->

Kept with the situation records is the **book of waits**: one shared table of every open wait that may outlast its run, across all situations. A wait that begins and ends inside one run is not written there; any wait that may outlast the run is. A wait enters the book in the same save that writes it, and leaves in the save that ends it, so the book and the situations cannot disagree. The book is data; nothing in it acts. <!-- decided 2026-10-22: the book of waits -->

**What it may decide.** Nothing. The conversation manager and the situation worker write to the situation record, each only its own kinds of change; only the situation worker writes the book of waits. <!-- Section 8: two writers, one record -->

**What lies outside it.** It never rewrites an old version. A correction is a new version, and the old one stays as history. <!-- HC-1 -->

It never becomes the truth about another system's facts. The carrier's tracking data stays with the carrier; the record keeps what Tend was told, with its source and time. <!-- Level 1: does not own other systems' facts; E1 -->

It never sets an alarm or wakes anyone. The situation worker sets each time signal. <!-- Section 7: the record does not act; decided 2026-10-22: the book of waits -->

**What would make it change.** The business needs the record to remember a kind of fact about a problem that it has no place for today, such as a new kind of link. This is the design's reading. <!-- change drivers: situation record -->

**Why it stays separate.** Two parts write to it: the conversation manager writes what comes in, and the situation worker writes what Tend concludes. Each part's news reaches the other through it. So it belongs to neither writer alone. <!-- Section 8: two writers, one record; Section 7: the parts never call each other -->

**When it is down.** No step is taken that cannot be saved. Arrivals are held where they came in until they can be saved; nothing is sent; no decision is made. When work is interrupted — by a crash, a restart, or an update to Tend — each situation is rebuilt from its newest saved version and continues; it does not start over. Every time signal is set again from the book of waits. <!-- H6; settled 2026-10-22: part outages -->

## 2. The situation worker

**What it is.** The part that reasons about one situation: it gathers what is needed, decides the next step, and writes what Tend concludes. <!-- Section 7: the parts table -->

**What it does.** Understanding what a change adds, gathering, weighing evidence, choosing the next step, keeping work alive over time, bringing people in, arranging meetings and contacting partners, and handling failure. <!-- Section 7: the parts table, worker rules -->

**What it owns.** It writes: <!-- Section 7 writer table: who writes what -->
- gathered facts and claims, conflicts, and corrections;
- the next step, and what should be said;
- waits, each with its entry in the book of waits;
- the wait a tool declares — states in its result, in a fixed form: what is awaited, from whom, and what ends it — when it hands work to the status-check service. The worker's fixed code saves it at once, in the same version as the step that was started, before the AI is told. Each wait records who declared it; <!-- decided 2026-10-22: the wait a tool declares; settled 2026-10-22: one version for a step and its wait -->
- outcomes, and the record that the work is resolved;
- work for a person;
- whether a proposed link is accepted or denied. It moves a situation between running, waiting, and blocked. It reopens a situation only when its closure was wrong. <!-- Section 8: the states table -->

It also sets each wait's time signal. When the signal fires, it comes straight back to the worker for that situation. <!-- decided 2026-10-22: the book of waits; decision record 2 -->

**What it may decide.** <!-- Section 7 additions: run steps; Section 7: links -->
- The next step, inside the rules and grants the business sets.
- Whether a run has made enough progress to stop.
- Whether to accept a link that memory or the conversation manager proposes, on evidence.
- What an outside system's answer means, using the fixed code of the tool that declared the wait. <!-- decided 2026-10-22: the status-check answer -->

**What lies outside it.**
- It never sends a message. The conversation manager decides whether to tell; the communication layer sends. <!-- Section 10: the worker never sends -->
- It never sets a situation to completed. The conversation manager does. <!-- decided by the owner, 2026-10-12: completed -->
- It never calls an outside system itself. The tool layer does. <!-- Section 7: tool layer -->
- It never approves its own step. Fixed code checks permission. <!-- Level 2 security: three invariants -->

**What would make it change.** The business changes how its work is handled: a policy, such as the limit for refunds without a person, or how long Tend waits for a carrier. Or a new kind of situation appears. This is the design's reading. <!-- change drivers: situation worker -->

**Why it stays separate from the intake step.** The intake step reads each arrival first. The worker decides the next step. They change for different reasons: new channels change the intake step, and the business's way of working changes the worker. <!-- Section 7 archive: rejected alternatives -->

**Rejected:** the intake step as the only writer of a situation. <!-- Section 7 archive: rejected alternatives -->

Deciding the next step and sending a message are separate jobs. So the part that decides the next step never sends. <!-- method: decide and send are separate; Section 10: the worker never sends -->

**When it is down.** Its waits stay in the record and in the book. The conversation manager keeps saving arrivals; their notices wait. When the worker is back, it reads each situation's newest version, and every time signal is set again from the book; one whose due time passed while the worker was down wakes it at once. A worker that crashes mid-run continues the work from the newest saved version; it does not start over. <!-- H6; settled 2026-10-22: part outages -->

## 3. The conversation manager

**What it is.** The part that reacts when something happens — a new arrival, a change, or a timer — and decides whether people should hear an update. It contains the intake step, the situation worker, and the communication layer. <!-- Section 7: the parts table; decided by the owner, 2026-10-10: what the conversation manager contains -->

**What it does.** Routing each arrival to the right situation. Recording what came in. Deciding whether a change is worth telling a person. Setting a situation to completed. <!-- Section 7: the parts table; Section 7 writer table: who writes what -->

**What it owns.** <!-- Section 7 writer table: who writes what; Section 7: links -->
- The first version of each new situation, written at intake, with what came in.
- Each arrival: each incoming message, each person's answer, and each outside system's answer, such as the status-check service's. It saves each as a new version, and draws no conclusion from it. <!-- decided 2026-10-22: the status-check answer; Section 7: HC-2 -->
- Whether an update is worth telling.
- A proposed link, when it creates a situation.
- Completed.
- After a platform rule changes, one version in each situation with a step pending on that channel. <!-- decided 2026-10-22: platform rule wake -->

**What it may decide.** <!-- Section 8: routing outcomes; decided: the update decision; decided by the owner, 2026-10-12: completed; Section 8: the states table -->
- Which situation an arrival belongs to, at the intake step. A weak match asks the sender; it never guesses. An outside system's answer names the wait it answers, and the intake step reads the book of waits to find it. <!-- decided 2026-10-22: the status-check answer -->
- Whether an update is worth telling the person. This is the **update decision**.
- Which business an arrival belongs to, and who sent it: fixed once, at intake, from what can be checked. A sign-in proves a person; a channel bound to a member proves only the channel. <!-- AC-1; decided 2026-10-22: identity and permission -->
- That a situation is completed, once no wait is still running and the last message has gone out.
- That a blocked situation is completed, when the business stops it. The reason is shown.
- Which situations to wake after a platform rule changes: those with a step pending on that channel, read from the book of waits. Many wakes are released at a steady pace. <!-- decided 2026-10-22: platform rule wake; settled 2026-10-22: steady pace -->

**What lies outside it.** It never decides the next step for a problem; the situation worker does. It never sets waiting or blocked. It never writes a conclusion. <!-- Section 11 §5: the parts table; Section 8: the states table; Section 7: HC-2 -->

**What would make it change.** A new channel, a new way something can arrive, or a change in when a person should hear an update. This is the design's reading. <!-- change drivers: conversation manager -->

**Why it stays separate.** Every arrival and every message out passes through it. Keeping it thin — it records and routes, and leaves the reasoning to the worker — keeps that path simple. <!-- Section 7 archive: conversation manager record -->

**When it is down.** Incoming messages are held. Nothing is sent. <!-- Section 7: failure and unavailability -->

## 4. The communication layer

**What it is.** The part that shapes, checks, sends, and records each message. <!-- Section 7: the parts table -->

**What it does.** Saying the right thing to the right person, after the worker has written what should be said and the conversation manager has decided to tell. Following each channel's rules. Keeping each business's consent records. <!-- Section 7: the parts table; decided 2026-10-22: consent records -->

**What it owns.** <!-- Section 7 writer table: who writes what -->
- Its own record of what was sent: the message, the reason, the evidence used, the next responsibility, the wait, and the result. A delivery receipt is recorded there too. This record is not a version of the situation. Its save is announced like any other, naming the situation, so the situation's history can be read with it. <!-- Section 7: the sent record, two readings -->
- Each channel's rule record. The product team updates it, through a fixed tool. <!-- L1 -->
- The **consent records**, written only by its fixed consent code: one list per business, by contact point and kind of message, each entry with its evidence. Entries come from an opt-in or opt-out that arrives, from an opt-in the business collected in its own systems, and from a platform's own signal. <!-- decided 2026-10-22: consent records; settled 2026-10-22: consent fields -->

**What it may decide.** <!-- L3; Section 8: the send check -->
- Which channel to use, by the channel rules. A reply stays on its channel while that channel's window is open: an email is answered by email. A new message uses the first channel that is available and allowed.
- Whether a message may be sent. This is the **send check**:
  1. the decision to send is saved;
  2. the permission check says Allow;
  3. the channel's rules are met, read fresh, with the consent records;
  4. the message holds only the details the person may see.

**What lies outside it.** It never decides what to say; the situation worker writes that. It never decides whether to tell; the conversation manager does. It sends through the tool layer, which makes every outside call and retries a failed send. <!-- Section 11 §5: the parts table; M4 -->

**What would make it change.** A new channel, a change in a messaging provider's rules, or a change in the law on consent to messages. This is the design's reading. <!-- change drivers: communication layer -->

**Why it stays separate from the situation worker.** The part that decides the next step never sends. A message goes out only with a saved decision to send, an Allow from the permission check, and the channel's rules met. <!-- method: decide and send are separate; IB-5 -->

**When it is down.** Nothing is sent. What should be said, and each decision to tell, stay saved. When it is back, each waiting message passes the send check again, against the newest version, rules, and consent; a message its situation has moved past is not sent, and the update decision is made again. <!-- settled 2026-10-22: part outages -->

## 5. The tool layer

**What it is.** The only way Tend calls an outside system: a payment provider, a shipping system, or a messaging channel. <!-- Section 7: the parts table; M4 -->

**What it does.** Making sure each call is allowed, as the place where the permission check runs before every call. Working through the business's own systems. Retrying a short failure. Making the status-check service's asks. <!-- Section 7: tool layer; decided 2026-10-22: the service calls through the tool layer -->

**What it owns.** <!-- Section 7: tool layer; Section 7: tool layer writes; Section 7 additions: connection codes -->
- The state of its tries for each call.
- The note of what it is about to do, written before a step that cannot be undone — before any money moves.
- The record of each important call it makes.
- Each business's connection codes, the password-like codes that open the business's systems. The AI never sees them.
- The approval step: when a person must approve first, the request goes through it. The AI never calls it. <!-- T7 -->
- Each tool's list of places it may reach. A place not on the list is refused. <!-- Section 7 additions: destinations -->

It writes no version of a situation. <!-- Section 8: the save protocol -->

**What it may decide.** <!-- Section 7: tool layer -->
- Whether a call may run, by the fixed permission check, reading the trusted permission store at that moment.
- Whether a short failure is retried, within a set limit.
- Whether a step that cannot be undone was already started, by checking the situation's saved starts and its own notes for an earlier attempt, before the new note is written. That check is not a permission check: a refund needs both. <!-- IB-8 -->

**What lies outside it.** <!-- Section 7: tool layer; Section 8: resend or new start -->
- It never decides the next step.
- It never writes the situation record. What it returns is evidence; the situation worker decides what it means.
- It never repeats a step that cannot be undone on an unknown result. It first asks the other side for the result. Only if the result is still unknown, and the other side recognises the same reference, may it send the same request again with that reference. No other repeat is made.
- It asks an outside system for news at most five times for one wait, and only where it knows how fast that system usually answers. A business may set its own number. Then it hands the waiting to the status-check service, and its result declares the wait. <!-- M5; settled 2026-10-22: the five per wait; decided 2026-10-22: the wait a tool declares -->

**What would make it change.** A new outside system or capability, or an outside system that changes how it works. This is the design's reading. <!-- change drivers: tool layer -->

**Why it stays separate.** Every call to the outside world must pass one permission check, and one note of intent before money moves. Keeping all calls in one part keeps those checks in one place. This is the design's reading. <!-- closed item: tool layer reason -->

**Rejected:** a tool writing its result into the situation as truth. <!-- Section 7 archive: rejected alternatives -->

For example, Tend's refund for order 9912 goes to the payment provider. The tool layer checks permission, checks that no earlier refund was started, writes a note that the refund is about to go, and makes one call. The provider gives no final answer. The tool layer does not send it again. The refund tool asks for news a few times, then hands the waiting to the status-check service; its result declares the wait. The worker saves "refund started, result unknown" and the wait in one version, and only then is the AI told. <!-- IB-8; IB-10; IB-8: the record check; IB-11; decided 2026-10-22: the wait a tool declares -->

**When it is down.** If the tool layer is down, the situation worker does not save any change that depends on it. <!-- Section 7: failure and unavailability -->

## 6. The status-check service

**What it is.** The one place that waits on an outside system while the work goes on. <!-- decided by the owner, 2026-10-17 -->

**What it does.** It keeps work alive over time while an outside system is slow. It listens for news the outside system sends on its own. It also asks for news itself: a limited number of times, with a gap between asks, for a limited total time. <!-- decided by the owner, 2026-10-17 -->

It decides **when** to ask. The tool layer makes each ask, as the same tool's read-only status check, so every call out of Tend still passes one permission check and is recorded once. News an outside system sends on its own comes straight to the service; no call goes out. <!-- decided 2026-10-22: the service calls through the tool layer -->

**What it owns.** Nothing in any situation. When the answer comes, it sends it as an event, naming the wait it answers and the outside system's own reference. The intake step saves it as an arrival; the arrival's notice wakes the situation worker. The service's asking never wakes a situation; only its answer does. <!-- decided 2026-10-22: the status-check answer; construction record, entry 21: asking does not wake -->

It learns of each wait it must serve from that wait's notice, and reads the wait from the book of waits. It keeps its own **record of asks**: for each wait it serves, how many asks it has made and when it may ask next — like the tool layer's record of its tries. It is not a list of what situations wait for: it is never used to match an arrival, it is rebuilt from the book of waits after a restart, and it decides nothing about any situation. <!-- settled 2026-10-22: the service's own list -->

**What it may decide.** Nothing about any situation. It decides only when to ask, within its limits. <!-- Section 11 §5: the parts table; decided 2026-10-22: the service calls through the tool layer -->

**What lies outside it.** It never decides what an answer means; the situation worker does, using the fixed code of the tool that declared the wait. It never creates a wait; the tool declares it, and the worker saves it. When its asking runs out with no answer, the wait's own time signal wakes the worker, which declares the outcome as the failure rules say; the business's escalation path then runs. <!-- decided by the owner, 2026-10-17; decided 2026-10-22: the status-check answer; closed item: recheck timer -->

Its limits — how many asks, how far apart, for how long — are set for each outside system when its tool is added, within that system's published limits. A business may tighten them. <!-- settled 2026-10-22: the service's limits -->

**What would make it change.** How long outside systems take to give a final answer, and how they report it. This is the design's reading. <!-- change drivers: status-check service -->

**Why it stays separate.** It serves many situations at once, so the situation worker never has to stop and wait. <!-- decided 2026-10-09: the status-check service; decided by the owner, 2026-10-17 -->

For example, Tend's refund for order 9912 is waiting for the payment provider. The status-check service asks the provider for news through the tool layer, and listens for its notice. Two days later the provider says "refund 9912 paid". The service sends that as an event for the refund's wait. The intake step saves it; the worker wakes, reads it through the refund tool's code, records the refund as paid, and ends the wait.

**When it is down.** Waits stay in place inside their limits. Past a wait's limit, its time signal wakes the situation worker, which records a failure. <!-- Section 7: failure and unavailability; decided 2026-10-22: the book of waits -->

## 7. Memory

**What it is.** The part that remembers useful context, keeps the business's knowledge ready, learns lessons, and suggests links and settings. <!-- Section 7: memory -->

**What it does.** Remembering and learning. <!-- Section 7: memory -->

**What it owns.** <!-- Section 7: memory owns -->
- Its own record of experience: what it proposed, what it used, and what it learned.
- The business's knowledge, kept ready for use. The business owns that knowledge.
- Lessons, and the candidates for settings it proposes.
- The lists it searches to find what each step needs.
- The templates that put together Tend's instructions for each step. Improvement may edit these, within set limits.

It writes no truth about a situation. <!-- Section 7 writer table: who writes what -->

**What it may decide.** Which small, relevant set of memory each step gets. Its items are advice only. <!-- N1; N16 -->

**What lies outside it.** <!-- Section 7: memory -->
- It never changes a business rule, a grant, an approval, a permission, an owner, a legal limit, or the line around a step that cannot be undone.
- It never sends a message.
- It never applies a setting. It proposes; the configurator checks; only the configuration tools apply it.

**What would make it change.** A new kind of knowledge to keep, or a new way to check a lesson before it is kept. This is the design's reading. <!-- change drivers: memory -->

**Why it stays separate from the situation worker.** The worker saves every situation many times. Memory changes when the business's knowledge changes. If they were one part, learning would be tied to every save. <!-- Section 7 archive: memory record -->

**Rejected:** memory inside the situation worker. <!-- Section 7 archive: memory record -->

**Rejected:** one part that serves memory and another that learns, because both would own the same knowledge. <!-- Section 7 archive: memory record -->

**When it is down.** Missing memory never stops the whole decision. The worker treats the gap as something to gather, or as "Tend cannot know this here". <!-- Section 7: memory, missing memory --> If a step is safe only with what memory holds, that step is not taken: the worker records the gap, and either waits for memory, with a due time, or gives the step to a person, as for any missing source. <!-- settled 2026-10-22: memory unreachable -->

## 8. Configuration

**What it is.** The business's settings, permissions, and members, written only by the configurator's fixed tools. <!-- Section 7: configuration; decided 2026-10-22: identity and permission -->

**What it does.** Holding the business's settings, and handling change. It is the only writer of the trusted permission store. <!-- Section 7: configuration; AC-4 -->

**What it owns.** <!-- Section 7: configuration -->
- Grants, written only by the configurator's fixed tools.
- **Membership:** which proved people are members of this business, with which roles. A person who works for two businesses has two memberships, one in each. <!-- decided 2026-10-22: identity and permission -->
- **Channel bindings:** a member's WhatsApp, Telegram, or email, tied to their membership. A binding is made only while the member is signed in, through a one-time link sent to that handle. It keeps its evidence and a date to review it. A changed WhatsApp identifier suspends it until it is proved again; moving it to another person needs the configurator. <!-- decided 2026-10-22: identity and permission; settled 2026-10-22: changed bindings -->
- The business's settings, each with a fixed shape and its own check, not free text.
- The rules that check each setting.
- The life of each new capability, in order: requested; evaluated; written; given its contract (its limits, failure behaviour, and whether it can be undone); checked; tested; switched on; watched; retired.
- The life of each business policy, in order: drafted; checked; switched on; versioned; replaced or expired; retired.
- The business's compliance settings, for each market. <!-- Section 7 additions: compliance settings -->

**What it may decide.** Whether a proposed setting passes its check, before it is applied. When a change reaches open situations: <!-- Section 7: configuration; Q3 -->
- a business policy is fixed when a situation opens; a change reaches an open situation only when the business owner chooses to move that situation to the new version;
- when an outside platform, such as WhatsApp, changes its rules, every open situation meets the new rule before it next acts; the conversation manager, not configuration, wakes the affected ones (see the conversation manager above); <!-- decided 2026-10-22: platform rule wake -->
- a change to a business setting does not wake open situations.

**What lies outside it.** No AI, no background program, and no memory may change a grant or a membership. The configurator may not hand its power to another person, until the business's own written answers settle whether it can. <!-- Section 7: configuration -->

The configurator is a member whose role is configurator. Every configurator action needs a fresh sign-in through the sign-in provider: within the last 15 minutes, unless the business has set less. <!-- decided 2026-10-22: identity and permission; settled 2026-10-22: fresh sign-in -->

A missing or unsupported setting is shown as a gap, never refused silently. <!-- Q4 -->

A second person approves each change to compliance settings. <!-- accepted call: compliance settings -->

**What would make it change.** A new kind of setting, a new country's legal rules, or a new way of versioning a policy. This is the design's reading. <!-- change drivers: configuration -->

**Why it stays separate.** If the AI could change a grant, it could give itself permission to send a refund. One writer, through fixed tools, keeps the permission store trusted. <!-- AC-4; Section 7: configuration -->

**When it is down.** A copy kept for speed can never allow a step. The safe result is to refuse or hold the step, with the reason, until the trusted store is back. The settings already in force stay safe. When the store is back, each held step is checked again from the start, against the live store; nothing held during the outage runs on an earlier answer. <!-- scratch: configuration unavailable; AC-4; settled 2026-10-22: access after the store returns -->

## 9. The owner view

**What it is.** The screens people open — for the business owner, the administrator, and the product team — built from the saved records when asked. <!-- Section 7: the parts table -->

**What it does.** Showing the work to the people who need it, and explaining a step at each person's depth. It reads the book of waits to show what each situation is waiting for. <!-- O1; O4; decided 2026-10-22: the book of waits -->

**What it owns.** Nothing. It writes nothing. <!-- Section 8: the save protocol -->

**What it may decide.** Nothing about the business's work. Each person's role decides what they see. <!-- T11 -->

**What it shows without being opened.** Four kinds of news reach the business owner without waiting to be found: a decision only the business owner can make; a deadline or notice that puts the business at risk; an escalation that has gone past everyone assigned; and a change that alters the business's next decision. <!-- O3 -->

On the product team's screens, personal details are hidden. <!-- recorded earlier: masked prompts -->

**What lies outside it.** It never writes to a situation. It never sends a message to a customer. <!-- Section 8: the save protocol; Section 7 archive: owner view record -->

**What would make it change.** The business owner asks for a screen that does not exist yet, such as a list of every refund waiting on a payment provider. This is the design's reading. <!-- change drivers: owner view -->

**Why it stays separate from the conversation manager.** Showing the work and carrying messages are different jobs. <!-- Section 7 archive: owner view record -->

**Rejected:** the owner view inside the conversation manager. <!-- Section 7 archive: owner view record -->

**When it is down.** The records are not affected. The business owner's attention may be delayed. Each business sets how long a delay it accepts. <!-- Section 7: failure and unavailability; Section 7: owner view lag -->

## 10. Improvement

**What it is.** How the product team makes Tend behave better for every business, from checked records of past runs. <!-- Section 7: improvement -->

**What it does.** Improving the product. <!-- Section 7: improvement -->

**What it owns.** Proposed changes to the instruction templates that memory keeps, within the limits memory sets. The records of past runs it learns from are kept apart from business memory. <!-- Section 7: improvement -->

**What it may decide.** Nothing about any one business's work. A change is accepted only after fixed checks, reference cases, and a review. <!-- Section 7: improvement; Level 2 prompt constitution: the optimiser gates -->

**What lies outside it.** It never writes one business's rule into the instructions used for every business. It never changes a business rule. It never changes a tool's description or Tend's core rules; people change those, through the product team. <!-- Section 7: improvement; Section 7 additions: optimiser limits -->

**What would make it change.** A pattern across many past runs shows Tend making the same mistake at one step, and the product team changes how it learns from that. This is the design's reading. <!-- change drivers: improvement -->

**Why it stays separate from memory.** Both read the same records of past runs, but they produce different things. Memory keeps one business's knowledge. Improvement changes the product's behaviour for every business. A lesson from one business's refunds, applied to every business, would change how every business is treated. <!-- Section 7 archive: improvement record; N15 -->

**When it is down.** It cannot change how Tend behaves now, any business's memory, any situation, or any permission. The records of past runs stay available, so it can catch up later. <!-- scratch: improvement unavailable -->

## Two things that are not parts

### The observer

The observer watches Tend itself. Its checks:
- the AI and channel providers are working;
- a fixed reference case still runs without its steps drifting or a check being skipped;
- a sample of closed situations shows none closed with a question that has no ending, and no claim told to a customer without evidence;
- how often Tend had to answer "Tend cannot know this here";
- no wait has passed its due time with no wake reaching its worker;
- alerts on spikes in refusals, messages sent, or cost; on any access across businesses; and on outgoing traffic to any outside service not on the approved list.

The full list, with the rules each guards, is in [the rules that always hold](../constraint_view/the_rules_that_always_hold.md). It reports what it finds as a notice, like everything else, and never acts on it. <!-- Section 7: the observer; IA-19; decided 2026-10-22: the book of waits -->

It is a regular check that runs alongside the parts. It is not a part of its own, and it does not sit inside the situation worker: it must notice a situation whose worker never wakes, such as a forgotten wait, and a check inside the worker runs only when the worker does. <!-- Section 7: the observer; changed call: the observer's seat -->

### The fixed code around the AI

The fixed code that runs every step and checks every suggestion is not a separate part. Each part is built with it. The permission check runs in the tool layer and the communication layer. The trusted permission store it reads is written only by configuration. The full rules are in [the file on the rules that check every step](../responsibility_view/harness_and_compliance.md). <!-- Section 9: no new boundary for dimensions; Section 7: tool layer; AC-4 -->

Time, failure, and security are not parts either. Each one touches every part, so none gets a part of its own. For example, a refund must pass the permission check whichever part starts it. Watching Tend is the observer, described above. <!-- Section 9: no new boundary for dimensions -->

## Which part owns each responsibility

| Responsibility | Owning part |
|---|---|
| 1. One record per problem | Situation record; the conversation manager sets completed |
| 2. Routing | Conversation manager, at its intake step |
| 3. Understanding | Conversation manager records what came in; situation worker writes what it adds |
| 4. Gathering | Situation worker, through the tool layer |
| 5. Weighing evidence | Situation worker, with fixed code treating conflicts by the business's rules |
| 6. Choosing the next step | Situation worker |
| 7. Permission | The fixed check in the tool layer and the communication layer; configuration writes its store, its memberships, and its channel bindings |
| 8. Time and waiting | Situation worker writes every wait, including those a tool declares, and sets each time signal; the book of waits is kept with the situation records; the status-check service waits on outside systems |
| 9. People | Situation worker creates the work; the communication layer sends it; the conversation manager records the answer |
| 10. Meetings and partners | Situation worker; the communication layer contacts the partner |
| 11. Communicating | Conversation manager decides whether to tell; communication layer sends |
| 12. Channels | Communication layer, including the consent records; the conversation manager wakes the affected situations after a platform rule change |
| 13. Failure and recovery | Situation worker declares it; tool layer retries transient failures |
| 14. Memory | Memory |
| 15. Settings and change | Configuration |
| 16. Improving the product | Improvement |
| 17. The business view | Owner view |
| 18. Recording and explaining each step | The part that takes a step writes its record; the owner view explains it at each person's depth |
| 19. Watching Tend | The observer, which runs alongside the parts |
| 20. The business's systems | Tool layer |
| 21. The fixed code around the AI | Every part's fixed code |
| 22. Keeping each business's data apart, and the law | Every part's fixed code; configuration holds the compliance settings |

<!-- Section 7: the parts table; Section 7 writer table: who writes what; O7; O4; decided by the owner, 2026-10-22 -->

## What Tend as a whole does not own

Tend does not: <!-- Level 1: what Tend does not own -->
- define how a business operates, or create its policies;
- decide the business's strategy: who the ideal customer is, which market to target, what to offer, or at what price;
- decide who owns the business;
- replace the business's existing systems, or become the record of another system's facts — it may read and use that information, but the business's system stays its source;
- need to find sales leads as a core job; a business may use an outside service for that;
- invent missing information, or ignore conflicting information;
- override the business's approvals, or replace a judgment the business requires a person to make;
- check who a person is; the business's sign-in provider does that;
- own a person's lasting identity; it uses the identities the business and its identity systems provide;
- carry messages itself; it sends and receives through the communication platforms;
- control outside services, or treat an outside agent's output as truth, permission, or an instruction;
- decide how an outside partner does its work;
- give a partner the full record of a customer or the business.

Who is in charge of each of these instead, and how Tend works with them, is in [the non-responsibilities register](../checking/non_responsibilities_register.md). <!-- settled 2026-10-22: the full refusal list -->

## What was considered and turned down

Each of these was weighed and turned down on purpose: <!-- Section 7 archive: rejected alternatives -->
- **Rejected:** the AI's conversation as the truth of a situation. A later run could not read it safely, and it could not be audited.
- **Rejected:** a timer that sends a message directly. It would skip understanding, the permission check, and the channel rules.
- **Rejected:** the intake step as the only writer of a situation. It would join reading messages with deciding the next step.
- **Rejected:** a tool writing its result into the situation as truth. A tool returns evidence; the situation worker decides what it means.
- **Rejected:** one part for each group of responsibilities. That would make many small parts that must constantly coordinate.
- **Rejected:** a second writer of a situation's conclusions. A reply and the cancelling of the wait it answers must be saved together, in one version, by one writer.
- **Rejected:** a separate timekeeper part to hold the book of waits, or the status-check service holding it. The book is data kept with the situation records. <!-- decided 2026-10-22: the book of waits -->
- **Rejected:** a separate part for consent. The communication layer keeps the consent records; a part of its own becomes the path only if Tend connects to a registered consent manager. <!-- decided 2026-10-22: consent records -->
- **Rejected:** a second way out of Tend for the status-check service. Its asks go through the tool layer. <!-- decided 2026-10-22: the service calls through the tool layer -->

Nothing about time, failure, growth, or security was found that needs a new part, or a split of an existing one. <!-- Section 9: no new boundary for dimensions -->

## Open questions, and what is set later

Nothing in this file is open. The values each business sets — such as the owner view's accepted delay, and the status-check service's limits for each outside system — are listed in [the gap register](../checking/gap_register.md). <!-- Section 7: owner view lag; settled 2026-10-22: the service's limits -->
