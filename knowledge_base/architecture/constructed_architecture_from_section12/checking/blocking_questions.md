# The seven blocking questions — analysis, recommendations, and answers

This file works through the seven questions that stopped the design from being called complete. It was written on 2026-10-21 so the project owner could answer each one from this file alone. <!-- construction record line 786: the full picture with every question -->

**Answered on 2026-10-22.** The project owner accepted all seven recommendations, and asked for the smaller questions inside them to be settled in the way that best fits. Each answer is written below its question, and each became a decision: questions 1 to 7 are decisions 19 to 25 in [the decisions file](../decision_view/the_decisions.md). The rest of this file is kept as it was written, so the reasoning behind each decision stays readable. <!-- decided by the owner, 2026-10-22 -->

**About the line numbers in the hidden notes.** They point to the files as they stood on 2026-10-21. Applying the answers changed several lines in this folder — in the deciding file, the communicating file, the records file, the rules file, and the decisions file — so a line number into this folder may now land on different text. Line numbers into files outside this folder are unchanged.

Each question follows the design process the framework sets for this stage: <!-- 3_level_framework.md lines 278–356 -->
- the story;
- what is already written, with its status and where it is written;
- your answer so far, where you gave one;
- the limits any answer must respect;
- the options, and how they compare;
- a recommendation;
- how we will know it stays right;
- when not to use it;
- what changes in the written design.

Each section ends with the exact questions, and now with the answer given. Each answer changed the design first, then every file that repeats the point. Then the design's completion record — the page that says whether the design is complete — was written again. <!-- method: change after completion -->

## Words used here

- **Situation:** one business problem, such as Meera's late parcel, or the refund on order 9912.
- **Version:** one saved state of a situation. Every change is a new version; none is ever rewritten.
- **Notice:** the short internal signal a new version sends. It wakes the part that must react.
- **Arrival:** anything that comes into Tend from outside — a customer's message, a provider's answer, a platform's news. The intake step saves each one as a new version.
- **Event:** the word you used on 2026-10-17 for the status-check service's answer. In this file, an event becomes an arrival once it is saved.
- **Wait:** a pause until one named thing happens.
- **Book of waits:** the list of every open wait, across all situations, and what will end each one.
- **Time signal:** an alarm set for one wait's due time. When it fires, it wakes only the worker for that situation.
- **Situation worker,** or **the worker:** the part that decides the next step for one situation. A **run** is one pass of the worker over one situation.
- **Fixed code:** code that always makes the same checks and saves. **The AI** only suggests.
- **Structured evidence:** the facts a tool returns, in fixed fields, with no conclusion attached.
- **Claim:** one statement from one source, with a time, weighed like any other evidence.
- **Conversation manager:** the part that reacts when something happens. Its **intake step** puts each arrival on the right situation.
- **Communication layer:** the part that holds each channel's rules, checks every message, and sends it.
- **Send check:** the check made just before each message goes out.
- **Tool layer:** the only way Tend calls an outside system.
- **Status-check service:** the part that waits on a slow outside system while the work goes on.
- **Configuration:** the part that holds the business's settings and permissions. Only the **configurator** — the person who sets the business up — can change them, through fixed tools.
- **Grant:** a range of steps a business allows a person, or Tend, to take.
- **Writer table:** the list of which part may save each kind of change.
- **Declare:** a tool states, in its result, that a wait now exists, and what will end it.
- **The technology stage:** the later stage, where the software and the services that run it are chosen.

**The files this one cites, in plain words:**
- **the earlier design files:** the boundary design, the interaction design, the reconciliation, and the decision records, written before this folder;
- **the construction record:** the running log of what you decided, and when;
- **the business's answers:** the written answers to the engineering questions — coordination, time, growth, channels, authority, security, compliance;
- **the harness study:** the research into how the code around the AI should work, done before the design began;
- **the problem statement:** the first description of what Tend is for.

## Status words

- **Decided:** you said yes, or a source you accepted says it. Platform facts, such as WhatsApp's own rules, are marked **Fact**.
- **To confirm:** written down, but you have not said yes.
- **Provisional:** a working choice that carries a condition for reopening it.
- **Open:** no answer yet.

Every status is written out, next to the rule it belongs to.

## The criteria every answer is judged against

The comparison tables use these:
- **correctness** and **simplicity**, from the framework's list, with maintainability and ease of running folded into simplicity;
- **scalability**, and the **effect on people**, from the same list;
- the four you named on 2026-10-21:
  - **flexibility**;
  - **traceability** — can we show what happened, and why;
  - **observability** — can we see what is happening now;
  - **improving systematically** — can we learn from what happened, and change one thing at a time.

Some tables add a row that tests the question at hand, such as "Leavers" or "Rate limits". <!-- 3_level_framework.md lines 318–333; the 2026-10-21 conversation -->

Three rules already decided shape every answer:
- **One writer for each kind of change.** Decided. *Where:* the earlier boundary design's writer table. <!-- Section 7 line 76 onward -->
- **Write and announce together.** Whoever saves a change sends its notice in the same run; a save without its notice is unfinished, and is tried again. Decided. *Where:* the harness study, and the business's time answers. <!-- harness study Part 14, decision 1; Level 2 time conversation line 108 -->
- **The more fixed code does, the better.** If a step can be done by a fixed rule, the AI does not do it. Decided. *Where:* your picture of 2026-10-17, and the Product Vision. <!-- construction record line 775; Product Vision lines 539–545 -->

## Where each question stands before this file

| # | Question | Reused from what is written | Your answer so far | Still needs your decision |
|---|---|---|---|---|
| 1 | Who writes a wait a tool hands off | Waits are written by fixed code, never the AI | "Usually the tool writes it" | Which code saves it; one smaller question |
| 2 | Who writes the status-check answer | The answer is an event that wakes the worker | "A combination of the worker's loop and the tool's code" | Which code saves the arrival |
| 3 | How the status-check service calls out | The tool layer is the only way out | "Through the tool layer, or as built" | Whether the rule keeps no exception; two smaller questions |
| 4 | Who holds the book of waits | Every wait is in the book; time wakes only the worker | Not discussed yet | All of it; one smaller question |
| 5 | Who writes consent records | What a consent record holds | Not discussed yet | The writer; three smaller questions |
| 6 | What wakes situations after a platform rule changes | Platform rules apply now; the send check is the gate | Not discussed yet | Which situations are woken, and by which part; one smaller question |
| 7 | How a person is matched to their permissions | The sign-in provider says who; settings say what | Not discussed yet | The records that join them; two smaller questions |

<!-- level2_method.md section 4: the readiness map -->

## One idea behind all seven

Most of the seven ask the same thing in a different place: when something happens, who **declares** it, who **saves** it, and what **wakes** the next step? The recommendations answer it the same way each time:
1. **The part closest to the event declares it.** The tool knows what it is waiting for; the payment provider knows the refund was paid.
2. **One fixed writer saves it** — the one the writer table names for that kind of change.
3. **The save's notice wakes the next step.** No part calls another directly.

That keeps the writer table close to what it is, and makes every new path look like an old one. Outside practice agrees. Systems built to run long business processes reliably keep each wait in the process's own saved history, never in the code that made the outside call. They also save an outside answer, under a stable reference, before anything acts on it. <!-- web research: Temporal timers and asynchronous activity completion; AWS Step Functions task tokens; Restate; Azure durable timers; transactional outbox and idempotent consumer patterns -->

---

## Question 1. Who writes a wait that a tool hands to the status-check service?

**The story.** The worker asks the tool layer to refund order 9912 for Meera. The payment provider takes the request, but gives no final answer. The tool asks for news a few times. Still nothing. It hands the waiting to the status-check service. At that moment, Meera's refund must become "waiting on the payment provider", so it can never be forgotten. Some fixed code must save that wait.

**What is already written.**
- **Decided:** the situation worker writes the waits it creates. *Where:* the earlier boundary design's writer table. <!-- Section 7 line 85; Section 8 lines 86, 470 -->
- **Decided:** the tool layer never writes the situation record. *Where:* the earlier boundary and interaction designs. <!-- Section 7 line 158; Section 8 line 191 -->
- **Decided:** your picture of 2026-10-17. "When a tool launches a status check, the code writes the wait itself, and tells the AI afterwards… The more the code does, the better." *Where:* the construction record. <!-- construction record line 775 -->
- **Open:** whether "the code" is the tool's own, or the worker's fixed code acting on the tool's result. The construction record noted that the second keeps one writer for each kind of change. <!-- construction record line 780 -->

**Your answer, 2026-10-21.** Usually the tool writes the wait. When it is built, the worker's fixed code can also write it.

- **What holds:** the tool is the one that knows what is being waited for — the payment reference, the provider, how long it may take, what ends the wait. So the tool should author the wait. The AI should not invent it. And the wait must exist before the AI is told.
- **One change:** the tool runs *inside* the worker's run for that situation, and only one run may change a situation at a time. If the tool saved a version in the middle of that run, the run would go on working from an out-of-date version, and its own save would collide with the tool's. So "the tool writes the wait" becomes: **the tool declares the wait, and the worker's fixed code saves it at once, before the AI sees anything.** That is still code, not the AI, exactly as your picture says. <!-- S1: one run per situation at a time; Section 8 lines 54, 82 -->

**Limits any answer must respect.**
- Saved before the AI sees the tool's result.
- Traceable to the tool that declared it.
- Only one run changes a situation at a time.
- Saved in the same version as the record that the refund was started, so a crash can never leave one without the other. **To confirm** — you have not confirmed this rule yet. <!-- IB-11 -->

**The options.**
- **A. The tool saves the wait itself,** straight into the situation record.
- **B. The tool declares; the worker's fixed code saves.**
  1. The tool's result says: "waiting on the payment provider for refund 9912; ends when the provider answers, or when the limits set for this provider run out".
  2. The worker's fixed code saves that wait in the same version as "refund started, result unknown".
  3. Only then is the AI told.
- **C. The AI proposes the wait; fixed code creates it.** This is the normal path for waits the AI chooses, such as waiting for a customer's reply.

**How they compare.**

| | A. The tool saves | B. The tool declares, fixed code saves | C. The AI proposes |
|---|---|---|---|
| Correctness | Risky: two savers inside one run can collide | Safe: one saver, in the same version as the started refund | Risky: the AI could forget or delay the wait |
| Simplicity | Needs a second way to save into the record | Uses the one saving path every wait already uses | Adds an AI step that is not needed |
| Traceability | Waits saved two different ways | Each wait says who declared it: "declared by the refund tool" | The wait depends on what the AI chose |
| Observability | Waits appear from two places | All waits appear from one place | One place, but later |
| Flexibility | Each new tool needs permission to write the record | A new tool only returns a well-formed declaration | Works for any wait, but slower and less sure |
| Improving | Hard to see which tool's waits go wrong | Waits counted tool by tool show which provider is slow | Mixed in with the AI's other choices |
| Effect on people | None directly | Meera is told sooner, because the wait exists at once | A forgotten wait means a customer not told |

**Recommendation: B.** The tool declares; the worker's fixed code saves; the AI is told afterwards. Path C stays for waits the AI chooses. Both end with the same saver, so the writer table keeps "the situation worker" as the writer of waits. Each wait gains one field: who declared it.

**How we will know it stays right.**
- Every wait in the book shows who declared it.
- No started step that should have a wait is ever saved without one.
- Waits counted by tool show which outside systems are slow.

**When not to use it.** A part that runs outside any worker run — the status-check service itself, for example — never creates a wait. It only passes on the provider's answer (question 2).

**What changes if you accept.**
- The writer table's row for waits reads: "the situation worker, including waits a tool declares".
- The rule that the tool layer never writes the situation record stays true.

> **Do you accept B?** A tool that hands off to the status-check service declares the wait; the worker's fixed code saves it, before the AI is told.
> **Answer, 2026-10-22:** yes — the project owner accepted the recommendation.
>
> **Is the started refund and its wait saved in one version?** Settled 2026-10-22: **yes**.

---

## Question 2. Which code writes the status-check service's answer into the situation?

**The story.** Two days later, the payment provider tells the status-check service: "refund 9912 paid". That fact must reach Meera's refund situation. The worker must then wake, record the refund as paid, end the wait, and tell Meera.

**What is already written.**
- **Decided:** your picture of 2026-10-17. "The service writes back by event. The answer updates the situation model; the update emits an event; the situation worker wakes and reads the newest version. No part calls another directly." *Where:* the construction record. Some earlier files call the answer a "message"; your picture replaced that word with "event". <!-- construction record lines 776, 782 -->
- **Decided:** what comes in from outside is written by the conversation manager. "The conversation manager works out what an incoming message means, and routes it. Only the situation worker writes conclusions." *Where:* the earlier boundary design. <!-- Section 7 lines 70, 304 (HC-2) -->
- **Decided:** an arriving event finds its situation through the list of situations and the intake step. *Where:* the business's coordination answers. <!-- Level 2 coordination conversation line 164 -->
- **Decided:** a tool returns its result as structured evidence to the worker. It never writes claims into the situation. *Where:* the earlier boundary and interaction designs. <!-- Section 7 line 295 (IB-7); Section 8 line 82 -->
- **Open:** which code saves the answer.

**Your answer, 2026-10-21.** When the answer comes, an event goes to the situation, which wakes the worker. The worker then builds its context, sees which tool was called, and works from there. It is a combination of the worker's main loop and the tool's code.

- **What holds:** all of it. The answer is an event. It wakes the worker through the situation, not by a direct call. The worker rebuilds its context from the record. The tool's own code is what understands the provider's answer.
- **One addition:** naming the code that *saves* the arrival, so the record shows it before anything acts.

**Limits any answer must respect.**
- The answer appears in the situation's history, with its source and time, before anything acts on it.
- A repeated answer must be harmless. Payment providers resend their notices for days, in no guaranteed order. <!-- web research: Stripe webhooks documentation, primary — automatic retries for up to three days; ordering not guaranteed -->
- Nothing calls the worker directly.
- One writer for each kind of change.

**The options.**
- **A. The service saves a version** straight into the situation.
- **B. The service sends the event straight to the worker,** and the worker's fixed code saves it.
- **C. The event is saved as an arrival, the way any outside message is.**
  1. The status-check service sends the answer, naming the wait it answers, and the provider's own reference for it. It writes nothing into the situation.
  2. The intake step works out what the arrival is and where it belongs — here, simply "the payment provider's answer to Meera's refund wait" — and saves it as an arrival, a new version. It draws no conclusion.
  3. Saving the arrival sends a notice, which wakes the worker.
  4. The worker finds the wait, sees which tool declared it, and passes the provider's answer to that tool's fixed code, which returns it as structured evidence.
  5. The worker writes the conclusion: the refund is paid, the wait has ended, and the next step.

**How they compare.**

| | A. The service saves | B. Straight to the worker | C. Saved as an arrival |
|---|---|---|---|
| Correctness | A second writer of versions, which can collide with a running worker | A wake that skips the record | No new writer; a collision is caught by the existing check against the newest version |
| Simplicity | The service must learn the record's rules | A path only this service uses | The path every message already takes |
| Traceability | In the history, but saved by an extra part | Reaches the history only when the worker saves it; a crash in between loses it | In the history the moment it arrives |
| Observability | One more writer to watch | A hidden hop | Every arrival looks the same, whatever its source |
| Repeated answers | Each part needs its own repeat check | Each part needs its own repeat check | The intake step's repeat check, keyed by the wait and the provider's reference |
| Flexibility | Each new kind of outside answer needs work in the service | Same as A | A carrier, a bank, or a calendar all arrive the same way |
| Improving | Answers scattered | Answers scattered | Every outside answer can be counted and replayed from one place |

**Recommendation: C.** Each piece has one job:
- the conversation manager saves what came in, and where it belongs;
- the tool's code reads it, as evidence;
- the worker concludes.

This is your "combination", with each piece named. It keeps the decided rule exactly as written: the conversation manager works out what an arrival is and routes it; only the worker writes conclusions. It also settles the old "message or event" wording: it is an event, saved as an arrival.

**How we will know it stays right.**
- Every outside answer appears as an arrival before any step that uses it.
- A duplicate answer produces no second effect.
- The time from an answer arriving to the worker acting can be measured for each provider.

**When not to use it.** If one service ever answers thousands of waits a second, the extra hop may need its own fast lane. That is a choice for the technology stage, and changes nothing here.

**What changes if you accept.**
- The return path is written as: event → the intake step saves the arrival → notice → worker.
- The intake step's repeat check gains a key for outside answers: the wait, plus the provider's own reference. <!-- Section 8 line 135 -->
- The earlier lines that say "as a message" are corrected. <!-- Section 7 lines 180, 327; Section 8 line 161; Section 10 line 31 -->
- One earlier glossary line, which says tool results "come back to the conversation manager", is corrected to "come back to the worker, as evidence". <!-- Section 10 line 28, against Section 8 line 82 -->

> **Do you accept C?** The status-check service's answer is an event addressed to its wait; the intake step saves it as an arrival; the worker, using the declaring tool's code, writes what it means.
> **Answer, 2026-10-22:** yes — the project owner accepted the recommendation.

---

## Question 3. Does the status-check service call outside systems through the tool layer, or directly?

**The story.** While waiting on the payment provider, the status-check service asks it from time to time: "is refund 9912 done yet?". Each ask is a call to an outside system, made with the shop's own connection codes — the password-like codes that open the shop's account with the provider.

**What is already written.**
- **Decided:** the tool layer is the only way Tend calls an outside system. *Where:* the earlier boundary design, and the tool layer's part file. It: <!-- Section 7 line 154 -->
  - runs the permission check;
  - holds each business's connection codes, which the AI never sees;
  - keeps each tool's list of places it may reach;
  - retries a failed call within a limit;
  - records each call.
- **Decided:** every outgoing request passes one checkpoint, which allows only listed destinations. *Where:* the business's security answer on building Tend. <!-- Level 2 security: applying security while coding with agentic tools, line 49 -->
- **Decided:** your picture of 2026-10-17. The status-check service "asks the third party for news… a bounded number of times, at a set interval, for a set duration". *Where:* the construction record. <!-- construction record lines 774, 781 -->
  - This replaced an older rule that nothing asks an outside system on a fixed clock. That rule is still written in the decision records (decision 13, and rule 21), the earlier boundary and interaction designs, and the business's time answers. Those lines are listed in the conflict register, to be corrected.

  <!-- Section 11 lines 111–113, 156; Section 7 line 305; Section 8 lines 159, 610; Level 2 time conversation line 106 -->
- **Provisional:** before handing off, a tool asks up to five times. The decision records write the five as "inside one wait"; one earlier line says "inside one tool". **To confirm:** which. <!-- Section 11 decision 13, rule 20; Section 7 line 342; conflict register rows 2–3 -->
- **Open:** the status-check service's own limits — how many asks, how far apart, for how long. These numbers are not set. <!-- Level 2 failure: the numbers -->
- **Open:** whether the service's asks go through the tool layer. You withdrew an earlier answer on 2026-10-17, because it was asked before the service itself was explained. <!-- construction record line 784 -->

**Your answer, 2026-10-21.** The service can call through the tool layer. Otherwise it depends on the situation when it is built.

- **What holds:** where the code physically runs is a choice for the technology stage. The service and the tool layer may well run side by side.
- **One change:** a direct path would need its own copy of the shop's connection codes, its own permission check, its own list of allowed places, and its own call record — a second door out of Tend. (The worker never calls outside itself; every call it makes already goes through the tool layer. So only the service's asks are in question.)

**Limits any answer must respect.**
- Connection codes live in one place.
- Every outside call passes one permission check, and is recorded once.
- A slow provider must not be asked too often. One owner of the ask budget stops retries multiplying across layers. <!-- web research: Azure scheduler-agent-supervisor pattern, retry amplification; Stripe and AWS Step Functions: polling uses up rate limits -->

**The options.**
- **A. Directly:** the service holds its own connection codes, and calls the provider.
- **B. Through the tool layer:** the service decides *when* to ask, within its limits. The tool layer makes each ask, as the same tool's read-only status check.
- **C. Through the worker:** the service wakes the worker for each ask, and the worker calls the tool layer.

**How they compare.**

| | A. Directly | B. Through the tool layer | C. Through the worker |
|---|---|---|---|
| Correctness | Two holders of connection codes; two permission checks to keep identical | One holder, one check | One holder, one check |
| Simplicity | A second way out to build and guard | Reuses the one way out | Simple, but wasteful |
| Traceability | Calls recorded in two places | Every outside call recorded in one place | One place, plus an empty run for each ask |
| Observability | One provider's calls split across two places | One provider's slowness and errors show in one view | Many empty runs hide the real ones |
| Scalability | Asks are cheap, but counted twice | Asks are cheap read-only calls | Poor: every ask wakes a situation, and spends the AI and compute |
| Rate limits | Two parts spend one provider's limit without knowing it | One part spends it, and can pace it | One part, at the worker's pace |
| Flexibility | A new provider added twice | Added once, as a tool | Added once |
| Improving | Failures split across two records | One place to tune how each provider is asked | Real failures lost among empty runs |

**Recommendation: B.**
- The status-check service owns *when* to ask, within the limits set for each provider.
- The tool layer owns *how*: the permission check, the connection codes, the allowed places, the call record.

"The tool layer is the only way Tend calls an outside system" stays true, with no exception.

**Listening is different.** Some providers send news on their own: "refund paid". That news arrives into Tend; no call goes out. It reaches the service directly, and continues as in question 2.

Option B also settles a point that is **To confirm** today: "the service's asking never wakes a situation; only its answer does". Under B, the asks never pass through the worker, so the point becomes simply true.

**How we will know it stays right.**
- Every outside call appears in the tool layer's record, and nowhere else.
- Each provider is asked within its limits.
- The connection codes exist in exactly one place.

**When not to use it.** A provider with no way to ask about status can only be listened to. Then the service only listens, and the business's escalation path takes over when the wait's time runs out.

**What changes if you accept.**
- The parked question is closed.
- "The service's asking never wakes a situation" moves from To confirm to Decided.
- The status-check service's file says it calls out only through the tool layer.
- The older "nothing asks on a fixed clock" lines are corrected to your 2026-10-17 picture.

> **Do you accept B?** The status-check service decides when to ask; every ask goes out through the tool layer; news a provider sends on its own comes straight to the service.
> **Answer, 2026-10-22:** yes — the project owner accepted the recommendation.
>
> **The five asks before handing off count:** settled 2026-10-22: **per wait**, as the decision records' own text says; a business may set its own number.
>
> **The service's own limits for each provider:** settled 2026-10-22: set for each outside system when its tool is added, within that system's published limits; a business may tighten them.

---

## Question 4. Which part holds the book of waits?

**The story.** Right now:
- Meera's refund is waiting on the payment provider.
- Priya, a possible customer, has a follow-up due on Thursday at 10:00.
- The finance person's revenue check is due on Wednesday.
- Every waiting situation also has a regular check-in.

Something must hold all of these safely. It must make each due time wake the right situation, and let an arriving event find the situation waiting for it.

**What is already written.**
- **Decided:** every wait is written to the book of waits, with what will wake it. *Where:* the earlier boundary design. <!-- Section 7 line 305 (HC-3) -->
- **Decided:** "The book of waits IS the subscription registry; no separate subscription system should ever be built." *Where:* the business's coordination answers. <!-- Level 2 coordination conversation line 163 -->
- **Decided:** waits are kept in the system's saved data, never in what the AI holds while it thinks. Whether one service or several small ones hold them was left to the technology stage. *Where:* the business's coordination answers. <!-- how_do_we_represent_work_that_is_waiting lines 82–84 -->
- **Decided:** a situation record is one situation's saved history. It is "the shared place where the parts write, and it is not a part that acts". *Where:* the earlier boundary design. <!-- Section 7 line 33; Section 10 line 29 -->
- **Decided:** a time signal goes straight to the situation worker, and wakes only the worker. A timer that reaches another part is a break. *Where:* the earlier boundary design, and the decision records. <!-- Section 7 lines 37, 289 (IB-1); Section 11 decision 2 and rule 5 -->
- **Decided:** saved data never announces itself. The part that writes a change is the one that announces it. *Where:* the business's coordination answers, and the harness study. <!-- Level 2 coordination conversation line 168; harness study line 2032 -->
- The harness study kept waits inside each situation's saved versions. It used each situation's own running alarms for check-ins, timeouts, and deadlines. <!-- harness study lines 1613, 1976 -->
- **Open:** which part holds the book.

**Limits any answer must respect.**
- The book must never disagree with the situations; a second list that can drift is ruled out.
- It must survive any crash.
- Time wakes only the worker; saved data does not act.
- It must answer two questions fast: what is this situation waiting for, and which situations are waiting for this event?
- No new part was found necessary for time. <!-- Section 9: no new boundary for dimensions -->

**The options.**
- **A. The worker holds the book itself,** in its own memory.
- **B. A new timekeeper part** holds every wait, and fires each one when it is due.
- **C. The status-check service holds the book,** since it is already "the place that waits".
- **D. The book is data kept with the situation records, and the worker sets each time signal.**
  1. The worker saves a wait, with its due time, in that situation's version — as it already does.
  2. In the same save, the worker adds the wait to the book: one shared table of every open wait, kept with the situation records. When a wait ends, the same save removes it. So the book cannot drift.
  3. The worker also sets that wait's time signal. When the due time comes, the signal goes straight to the worker for that situation, as decided. At the technology stage this may be the situation's own running alarm, as in the harness study.
  4. After a crash, every time signal can be set again from the book, because the book is the truth.
  5. The intake step reads the book to match an arriving event to the wait it ends. The screen the business owner sees reads it to show what each situation is waiting for.
  6. Nothing in the book acts. It is data.

**How they compare.**

| | A. The worker's memory | B. New timekeeper | C. Status-check service | D. Data kept with the situations |
|---|---|---|---|---|
| Correctness | Lost when a run ends | A second store, which can drift from the situations | Mixes waits on people and dates with waits on outside systems | Saved with each version, so it cannot drift |
| Fits the decided rules | Breaks "waits live in saved data" | Adds a part, where none was needed | Widens a part you limited to outside systems | Keeps "saved data does not act" and "time wakes only the worker" |
| Simplicity | Simple, but unsafe | One more part to build and run | One part with two different jobs | No new part |
| Traceability | Waits tied to runs, not to history | Two histories to join | Two meanings of "the book" | Every wait is in its situation's own history |
| Observability | No view across situations | One view, in a separate part | Only the outside-system waits are visible | One read shows everything that is waiting |
| Improving | Nothing to check: a lost wait cannot be counted | A second place to check | A second place to check | One place to find forgotten waits |

**Recommendation: D.** No part "holds" the book in the sense of acting on it:
- **the book is data,** kept with the situation records, and written in the same save as each wait;
- **the worker writes each wait, and sets its time signal;**
- **the time signal comes straight back to the worker;**
- **the intake step and the business owner's screen only read the book.**

No new part, no second list, and nothing acts where the rules say it must not.

**How we will know it stays right.**
- The book can always be rebuilt from the situations' versions, and the rebuilt list matches the live one.
- No wait passes its due time without its signal reaching the worker.
- The check that watches Tend itself finds no forgotten waits in its samples.

**When not to use it.** If one business has so many open waits that reading the book becomes slow, the table can be split at the technology stage — by business, or by due time. The rule "one book, kept with the situations" does not change.

**What changes if you accept.**
- The book of waits is written as data kept with the situation records.
- The worker's file gains "sets each wait's time signal".
- The build order places the book with the situation record, which is built first.

> **Do you accept D?** The book of waits is data kept with the situation records, written in the same save as each wait; the worker sets each wait's time signal, which comes straight back to the worker; the intake step reads the book to match arrivals.
> **Answer, 2026-10-22:** yes — the project owner accepted the recommendation.
>
> **A wait that begins and ends inside one run — is it written in the book?** Settled 2026-10-22: **no**; any wait that may outlast the run is written.

---

## Question 5. Who writes consent records?

**The story.**
- Kavya, a customer, ticked "send me updates on WhatsApp" on the shop's website. A month later she replies "STOP" to one of those updates.
- Another customer clicks "unsubscribe" in an email.
- A third writes to the shop on WhatsApp for the first time.

Each changes what Tend may send to that person. Each must be recorded, with proof, before the next message goes out.

**What is already written.**
- **Decided:** a consent record is small. It is a yes-or-no record, not a legal file. *Where:* the business's channel answers. It holds: <!-- Level 2 channels: recording consent, lines 33–35 -->
  - the person;
  - the channel;
  - the kind of message, or its purpose;
  - how and when permission was given;
  - what it covers;
  - any withdrawal or end date.
- **Decided:** a person who writes in has agreed to replies on that channel; no consent record is needed for replies. *Where:* the business's channel answers. <!-- same file, lines 11, 41 -->
- **Decided:** Tend requires an opt-in for every WhatsApp template — a message WhatsApp approved in advance, used outside the reply window. *Where:* this folder's communicating file. <!-- communicating.md line 609 -->
- **The withdrawal rule.** Several earlier texts say "withdrawing consent stops every future message", and record it as decided:
  - the decision records, in decision 11 and in rule 14 of the rules the design must keep;
  - the earlier boundary design;
  - the interaction design, which adds "…that the consent covers".

  On 2026-10-21 this was set back to **To confirm**, both what it stops and whether you ever confirmed it, because the construction record still tags it that way. <!-- Section 11 lines 98, 147; Section 7 line 329; Section 8 line 729; Section 10 lines 213, 682; construction record line 983 -->
- **Open:** who writes consent records. One summary file says the part that follows each channel's rules "keeps consent"; that part is the communication layer. <!-- the_records.md line 72; responsibilities_at_a_glance.md line 211 -->

**What the law and the platforms require.** *Primary* means the law or platform text itself; *secondary* means someone's summary of it.
- **The business must be able to prove consent,** and what the person was told at the time. *Primary:* GDPR article 7(1); India's DPDP Act, section 6(10); the UK regulator's consent guidance. <!-- gdpr-info.eu; dpdpa.com statutory text; ico.org.uk -->
- **Withdrawing must be as easy as giving,** and must stop processing within a reasonable time. *Primary:* GDPR 7(3); DPDP Act 6(4) and 6(6).
- **WhatsApp requires honouring opt-out requests made "either on or off WhatsApp".** *Fact, primary:* WhatsApp Business Messaging Policy.
- **Opt-out deadlines vary:**
  - 2 days, for bulk email to Yahoo — secondary;
  - 10 business days, for US email under CAN-SPAM, and for US text messages under the TCPA — primary.
- **Consent is kept per channel, and per purpose.** *Primary:* Meta's guidance. *Secondary:* the ISO consent-record standard, as described in a review paper.
- **A phone number is no longer a stable key on WhatsApp.** Meta now gives each user an identifier scoped to each business, regenerated when the user changes number. *Fact, primary:* Meta's developer documentation. Its rollout dates should be checked before launch.
- **India's consent rules are arriving now.** Registered "consent managers" are expected around November 2026, and most of the remaining rules around May 2027. *Secondary:* both dates. Read the official text before any Indian launch.

**Limits any answer must respect.**
- Recorded before the next send.
- Provable: the evidence is kept.
- Never written by the AI.
- Tied to the contact point — the WhatsApp identifier, email address, or Telegram user — not to a whole customer record.
- Read by the send check at the moment of every send.
- Kept in each business's own storage.

**The options.**
- **A. The communication layer writes them,** through fixed consent code. It already holds every channel's rules, and checks consent before every send.
- **B. The conversation manager writes them.** It already records every incoming message, including "STOP".
- **C. Configuration writes them,** as a business setting.
- **D. A new consent part writes them.**

**How they compare.**

| | A. Communication layer | B. Conversation manager | C. Configuration | D. New consent part |
|---|---|---|---|---|
| Correctness | The writer and the reader are the same part, so the rule and its check cannot drift apart | Sees "STOP", but not a website opt-in or an unsubscribe click | Wrong owner: consent is the customer's, not the business's to set | The writer and the reader are separate, but both check one list |
| Simplicity | No new part | No new part, but a new kind of record outside situations | No new part, but the wrong one | One more part to build |
| Traceability | Every entry keeps its evidence | Evidence for messages only | The configurator would appear to grant a customer's consent | Every entry keeps its evidence |
| Observability | Consent and refused sends in one place | Split across two parts | Mixed in with settings | One place |
| Flexibility | A new channel's consent rules live with the channel | Every channel's rules leak into intake | No room for per-channel rules | Could connect to a registered consent manager later |
| Effect on people | A withdrawal stops the very next send | Same, for messages only | A business could appear to "set" a customer's consent | A withdrawal stops the very next send |

**Recommendation: A.** The communication layer's fixed consent code is the one writer of consent records.

**What a consent record looks like.** Consent records become their own list, kept per business. Each entry is tied to one contact point and one kind of message, and says one of: given, withdrawn, expired, or refreshed.

Each entry keeps its evidence:
- what the person did;
- what they were shown, and its version;
- when;
- through which channel.

These entry types and evidence fields go a little beyond the six fields written so far, because the law puts the burden of proof on the business. **To confirm.**

**Where entries come from.** Three sources, all through the same writer:
1. **An arrival that is an opt-in or an opt-out** — "STOP" on WhatsApp, an unsubscribe click, an email saying "please stop". The intake step saves the arrival as usual. Its notice wakes the consent code, which adds the entry. A fixed keyword, such as STOP, is read by fixed code.
2. **An opt-in collected by the business's own systems,** such as a checkbox at checkout. It arrives through a tool, with its evidence.
3. **A platform's own signal,** such as a person blocking the business on WhatsApp. It arrives as an event, and is handled like 1.

The send check reads the list at the moment of every send, so a withdrawal stops the very next message — sooner than any legal deadline above. If Tend ever connects to a registered consent manager, consent can move to a part of its own (option D) by changing one part's file, because the records already have one writer.

**Three smaller questions inside this one, each To confirm.**
- The extra entry types and evidence fields above.
- When a sentence is unclear, such as "please don't message me so much", Tend treats it as a withdrawal until the person says otherwise. The AI may notice it; fixed code adds the entry. Recommended: yes — stopping is the safe side.
- **What a withdrawal stops.** The two readings:
  - **(a)** "STOP" on WhatsApp stops every message the business starts on WhatsApp.
  - **(b)** "Stop contacting me", on any channel, stops every message the business starts, on every channel.

  Recommended: both, depending on the words the person used. The record stores exactly what was withdrawn. If the person writes in again later, that is a new conversation, and Tend may reply.

  Reading (a) narrows the earlier wording "stops every future message". WhatsApp's own rule says only that an opt-out must be honoured whether it was made on WhatsApp or elsewhere; reading (b) for "stop contacting me" is this file's own reading. It is the point most likely to change what a customer experiences.

**How we will know it stays right.**
- No message is sent after a matching withdrawal.
- Every template sent has a matching opt-in, with evidence.
- The time from a withdrawal to the last message is measured, and is never more than one send.

**When not to use it.** Employees and partners are not consent questions; their contact rules stay in the business's settings. Each market's legal values — how long consent lasts, how long proof is kept — are set when Tend enters that market.

**What changes if you accept.**
- The writer table gains "consent records — the communication layer".
- The consent-scope conflict is closed with the reading you choose.
- The earlier withdrawal texts are corrected to match.

> **Do you accept A?** The communication layer's fixed consent code is the only writer of consent records: one list per business, by contact point and kind of message, with evidence; the send check reads it before every send.
> **Answer, 2026-10-22:** yes — the project owner accepted the recommendation.
>
> **The extra entry types and evidence fields?** Settled 2026-10-22: **yes**.
>
> **Unclear sentences treated as a withdrawal?** Settled 2026-10-22: **yes**.
>
> **What a withdrawal stops:** settled 2026-10-22: **both, by the words used**.

---

## Question 6. After a platform rule changes, which part starts work again on the open situations?

**The story.** WhatsApp shortens the time a business may reply freely after a customer's last message. Meera wrote yesterday. Tend planned to send her the carrier's answer at 17:00 today, inside the old window. Under the new rule, the window closes at 15:00.

**What is already written.**
- **Decided:** platform rules are "live and interrupt" — when one changes, "the situation wakes on the wait spine", the book of waits, and re-checks what is now allowed. *Where:* the business's growth answers, accepted in the reconciliation. <!-- Level 2 growth: evolving Tend without breaking existing businesses, line 12; Section 10 line 96 -->
- **Decided:** "When a platform rule changes, each open situation is checked again." *Where:* the decision records (decision 8, decision 11, and their change table), the interaction design, the reconciliation, this folder's rules and decisions files, the communicating file, and the settled-items page. The earlier boundary design says "starts each open situation to re-check"; one of its lines tags the rule "to confirm", but the decision record governs. <!-- Section 11 lines 76, 101, 190; Section 11 stabilization line 153; Section 8 lines 394, 613; Section 10 lines 95–96; Section 6 line 435; constraint view line 158; communicating.md line 497; the_decisions.md lines 164, 220; what_is_already_settled.md line 330; Section 7 lines 200, 331 -->
- **To confirm:** the growth answers also say a platform change "wakes the affected situations" — not every one. They mark this as a working decision. <!-- Level 2 growth: adding channels, lines 30, 32 -->
- **Decided:** the send check reads the newest channel rule before every send, so no message ever goes out under an old platform rule. *Where:* this folder's rules file. <!-- constraint view line 157 -->
- **Decided:** the product team updates each channel's rule record, through a fixed tool; the communication layer holds the record. Like every save, the update announces itself. *Where:* this folder's records and communicating files. <!-- the_records.md line 73; communicating.md lines 440, 495 -->
- **Decided, in general words:** "Rule changes need no event: reads go fresh at each wake; the per-action check is the hard gate. Proactive 'wake dependent situations on rule change' is parked as a possible per-business configuration." *Where:* the business's coordination answers, which call it binding. The harness study made the same choice about the business's *own* rules — a narrowed grant, a changed policy, a withdrawn consent. <!-- Level 2 coordination conversation lines 166, 171; harness study lines 2046–2050 -->
- **Open:** which part does the waking.

**The tension.**
- The decision says *every* open situation is checked again.
- The growth answers say the *affected* ones are woken.
- The coordination answers say *none* need an event, because the send check catches everything — and they set waking at once aside, as a possible per-business setting.

**Limits any answer must respect.**
- No message goes out under an old platform rule. The send check already guarantees this.
- A situation whose plan depends on the changed rule must re-plan in time: Meera must hear before 15:00, not fail at 17:00.
- No second list of situations may be built. The book of waits is the only subscription list.
- Waking thousands of situations for nothing wastes compute. In the business's time answers: polling "pays compute to discover nothing happened". <!-- Level 2 time conversation line 106 -->
- Saved data does not act (question 4).
- To wake a situation, a part must write a version into it. A notice is, by definition, the signal that a version was saved. <!-- Section 7 line 35 -->

**The options.**
- **A. Every open situation.** On the rule record's change, the conversation manager writes a version into every open situation: "WhatsApp's rule changed". Each notice wakes its worker. This matches the decision's words.
- **B. None.** Each situation meets the new rule at its next natural wake; the send check stops anything no longer allowed. This matches the coordination answers' words.
- **C. Only the affected ones.**
  1. The rule record's update announces itself.
  2. The conversation manager reacts to it. It reads the book of waits to find the situations whose open wait ends with a step on that channel — such as Meera's 17:00 reply. The business's growth answers already treat a channel's window as a wait. <!-- Level 2 growth: adding channels, line 26 -->
  3. It writes a version in each of those: "WhatsApp's rule changed to version 7". Each notice wakes its worker, which re-plans.
  4. Every other situation meets the new rule at its next wake, and the send check stays the final gate.
- **D. The communication layer finds and wakes them itself.**

**How they compare.**

| | A. Every open situation | B. None | C. Only the affected ones | D. The communication layer |
|---|---|---|---|---|
| Correctness | Safe: every situation re-plans | Never sends wrongly, but Meera's 17:00 reply fails, and she hears late | Safe, and Meera hears before 15:00 | Safe |
| Scalability | Poor: one WhatsApp change wakes every situation, on every channel | Best: nothing is woken | Good: only situations with a step pending on that channel | Good |
| Simplicity | Simple to describe | Simplest | Reuses the book, and the conversation manager's reaction to changes | Needs a second list of situations, which is ruled out |
| Traceability | Many runs with no reason to act | The change shows only when a send is refused | Each woken situation's history shows "WhatsApp's rule changed to version 7" | Each woken situation records it |
| Observability | Noise: many situations wake that have nothing to do with the change | Quiet, but late | The number woken per change is visible | The number woken per change is visible |
| Effect on people | A burst of re-planned messages | A customer may hear late | Only the people affected, and in time | Only the people affected |
| Matches what is written | The decision's words | The coordination answers' words | The growth answers' words, and the decision's purpose | Breaks "no second list" |

**Recommendation: C.** The conversation manager, reading the book of waits, wakes only the situations with a step pending on the changed channel. Everyone else meets the new rule at their next wake, and the send check stops anything no longer allowed.

**This changes two things that are written, so it needs your explicit yes.**
- **Decision 8's wording,** everywhere it appears, becomes: *each open situation is checked against the new rule before it next acts; the situations with a step pending on the changed channel are woken at once.*
- **The coordination answers' "rule changes need no event"** keeps its meaning for the business's own rules. It gains one exception: a platform rule change wakes the affected situations. That takes the item they set aside — waking affected situations at once — and makes it the default for platform rules.

**A new writer-table row.** The conversation manager today writes arrivals, each placed on one situation. Here it writes one version into each affected situation. That is a new row, not an addition to an existing one: "a platform rule change, written into each open situation with a step pending on that channel — the conversation manager, one version per situation". <!-- Section 7 lines 70, 76–77, 87 -->

**A smaller question inside this one. To confirm,** new in this file: when one change affects many situations, are their wakes released at a steady pace, so a large change does not send a burst of messages at once? Recommended: yes.

**How we will know it stays right.**
- No send is refused for a rule change that could have woken the situation in time.
- The number of situations woken per change stays small, and each one acts.

**When not to use it.** If a platform makes every pending message illegal at once — a channel shut down by law, for example — that is a failure of the channel, not a rule change. It follows the failure path: the channel is marked unavailable, and each affected situation moves to its next allowed channel.

**What changes if you accept.**
- The waker is named: the conversation manager, reading the book.
- The writer table gains the new row above.
- Decision 8's wording and the coordination answers' line change as above.

> **Do you accept C?** After a platform rule changes, the conversation manager wakes only the situations with a step pending on that channel; everyone else meets the rule at their next wake; the send check stays the final gate. This narrows the decided "each open situation is checked again".
> **Answer, 2026-10-22:** yes — the project owner accepted the recommendation.
>
> **Steady pace for large changes?** Settled 2026-10-22: **yes**.

---

## Question 7. How is a checked person matched to their permissions while Tend runs?

**The story.** Arjun works for the shop. He writes on WhatsApp: "approve the refund of 1,500 on order 9912" — Meera's refund, which is above the shop's refund setting, so it needs a person's yes. Tend must know three things, and record a fourth:
1. Is this really Arjun?
2. Is Arjun still a member of this shop?
3. May he approve a refund of that size?
4. Exactly who approved, and how Tend knew it was him.

**What is already written.**
- **Decided:** "Tend does not check identities itself. An identity provider — an outside service that checks who a person is — says who is speaking." *Where:* this folder's deciding file. <!-- deciding_and_permission.md line 422; Section 8 line 175; Level 2 authority: identity and authority join, line 11 -->
- **Decided:** a person is verified by the identity provider, and a name or a phone number alone grants nothing. *Where:* the decision records. <!-- Section 11 decision 6, line 61 -->
- **Decided:** checking who a person is, and checking what they may do, are two different checks. Tend stores which identity holds which role and which grants; only the configurator can change them. *Where:* the business's authority answers. <!-- Level 2 authority: identity and authority join, line 12; deciding_and_permission.md line 424 -->
- **Decided:** a channel proves the channel, not the person. In this folder's words: "A WhatsApp number linked to the business proves which channel a message came through. It does not prove who is typing." *Where:* the decision records, and this folder's deciding file. <!-- Section 11 decision 12, line 105; deciding_and_permission.md line 430; Section 7 line 369; Section 8 line 175 -->
- **Decided:** "The identity of a run is set once, from verified identity, and never from message text, links, or tool arguments." Identity is set once, at intake. *Where:* the earlier boundary and interaction designs. <!-- Section 7 line 306 (AC-1); Section 8 line 123 -->
- **A conflict inside this folder.** One sentence says each run gets its identity "from a proven channel link for a phone number or mailbox". That can be read as a channel identifying a person, which the rule above forbids. It needs correcting either way. <!-- deciding_and_permission.md line 426, against line 430 -->
- **Decided:** an employee who leaves the business loses access the same minute. *Where:* the business's compliance answers. <!-- Level 2 compliance: actors and tech stack, lines 83–84 -->
- **Decided:** the permission check reads the live permission store at every step. *Where:* this folder's deciding file. <!-- deciding_and_permission.md line 448 -->
- **Decided:** "Tend does not own canonical actor identities. It uses the identities provided by the business and its identity systems." In plain words: Tend does not decide who a person really is; it uses what the business's sign-in systems say. *Where:* the problem statement. <!-- Level 1 lines 1428–1430 -->
- **Open,** and blocking:
  - how a proved person is matched to a role while Tend runs;
  - how one person in two businesses is resolved;
  - how a staff member's WhatsApp or Telegram is tied to them;
  - how an approver's "yes" is tied to a proved person.

**What outside practice says.** All of these are primary sources.
- **The only safe way to name a signed-in person** is the pair: the sign-in provider, plus that provider's id for the person. An email address must never be the key; it can change. *Source:* OpenID Connect Core, section 5.7.
- **Linking two identities is safe only when the person proves both at the time of linking.** *Sources:* Auth0's account-linking documentation; NIST's guidance on digital identity.
- **Codes sent by text message are a weaker way to prove a person,** because numbers are swapped and recycled. *Source:* NIST.
- **Sensitive steps need a recent sign-in.** For the highest-security sign-ins, NIST sets a sign-in to last at most 12 hours, and to end after 15 minutes without activity.
- **A removal must take effect at the very next check.** An answer remembered from before can let a removed person act. *Sources:* Google's Zanzibar paper; OpenFGA's documentation.

**Limits any answer must respect.**
- The sign-in provider keeps who a person is; Tend keeps only who may do what in each business. Neither moves.
- A channel never proves a person.
- A run's identity is set once, from what can be checked, and never from the words of a message.
- A removed member is stopped at their very next step.
- Approving money is tied to a proved person.
- Staff can still send routine messages from WhatsApp without friction.
- Each business's data stays in its own storage.

**The options.**
- **A. Email address as the key** that joins a person to their role.
- **B. The WhatsApp number is the person.** A known number counts as Arjun.
- **C. Membership, bound channels, and a fresh sign-in for any step that could move money or change settings.** Three records, each kept by one part and written by one:
  1. **The sign-in identity:** the provider and the provider's id for the person. The sign-in provider keeps it.
  2. **Membership:** this sign-in identity is a member of this business, with these roles. It is kept in each business's own storage. Configuration's fixed tools write it, when the configurator invites or removes someone. A person who works for two shops has two memberships, one in each.
  3. **Channel bindings:** Arjun's WhatsApp, Telegram, and email are tied to his membership. A binding is made only while Arjun is signed in: configuration's fixed tool sends a one-time link to the handle, and he opens it. The binding keeps its evidence, and a date to review it.

  **What each run trusts.** Each run's identity is set once, at intake, from what can be checked:
  - a **sign-in** proves the person;
  - a **bound channel** proves only the channel, and names the member it is bound to.

  So:
  - **Routine words from a bound channel** — a reply, information, an answer to a work item — are recorded as "came through the WhatsApp bound to Arjun's membership, person not verified", and weighed as claims.
  - **Any step that needs a person's permission** needs a fresh sign-in through the sign-in provider. That means: approving; any step the permission check sends to a person; exports; changing grants or settings; moving a channel; and anything the configurator does. Tend may send a link to Arjun's bound channel, but the link only opens the sign-in provider's own check. The channel carries the link; it proves nothing. The time of the sign-in comes from the provider.
- **D. A sign-in for every message.** Even routine replies from staff need a sign-in.

**How they compare.**

| | A. Email | B. The number is the person | C. Membership, bindings, fresh sign-in | D. Sign-in for everything |
|---|---|---|---|---|
| Correctness | Breaks "never by email alone" | Breaks "a channel proves the channel, not the person" | Keeps both: the channel only routes and carries claims; permission needs a sign-in | Correct |
| Security | Weak: email changes, and can be spoofed | Weak: numbers are swapped, recycled, or borrowed | Strong where it matters: money and settings need the provider's own check | Strong everywhere |
| Effect on people | Easy | Easy | Routine work stays on WhatsApp; one sign-in for money and settings | Heavy: a sign-in for every reply |
| Traceability | "Someone with this email" | "Someone with this phone" | Who, how proved, and when, for every step needing permission | Who and how, for everything |
| Leavers | Hard to cut off | Hard to cut off | Membership ended, so every binding and grant fails at the next check | Cut off at sign-in |
| Two businesses | Unclear which shop | Unclear which shop | Separate memberships; the channel the person wrote to fixes which shop | Clear, after choosing a shop |
| Flexibility | No way to tighten | No way to tighten | Each business may add steps that need a sign-in | Rigid: a business cannot relax routine replies |

**Recommendation: C.**
- A sign-in proves the person; a bound channel proves only the channel, and names the member.
- At every step, the permission check reads the live membership, roles, and grants. When Arjun leaves, his membership ends that minute, so his very next step fails.

**Every approval records:**
- the member;
- their sign-in identity;
- when they signed in, as the provider reports it;
- exactly what they approved.

This answers the question no file had settled: how an approver's "yes" is tied to a proved person.

**Why this keeps the problem statement true.** The sign-in provider still decides who a person is. Membership and bindings are Tend's records of *who may do what in which business* — a job the business's authority answers already give Tend. The one-time link proves only that a signed-in person holds a handle; the person was proved by the sign-in.

**Customers and partners are not members.** A customer's channel identifies the contact for their own situations, and never grants permission. A partner sees only the fields on its list.

**Two smaller questions inside this one, each To confirm.**
- **How fresh is fresh?** How many minutes after signing in may Arjun approve money, or the configurator change a setting, before a new sign-in is needed? Recommended: 15 minutes; each business may shorten it. (NIST's 15 minutes is a different measure — time with no activity — so this number is your choice.)
- **Changed and moved bindings.** When a bound WhatsApp identifier changes — a new phone, for example — the binding is suspended until it is proved again. Moving a binding to another person needs the configurator. Recommended: yes to both.

**How we will know it stays right.**
- No step ever runs for a person whose membership has ended.
- Every approval of money shows a fresh sign-in.
- Every binding has its evidence.
- A message from a changed or recycled number finds its binding suspended.

**When not to use it.** In a business whose staff cannot use any sign-in provider, every step needing a person's permission goes to the business owner. A one-person business, where the owner is the only member, binds their own channels the same way.

**What changes if you accept.**
- Membership and channel bindings become named records, each written only by configuration's fixed tools — two new rows in the writer table.
- The approval record gains who approved, and how they were proved.
- The sentence about "a proven channel link" as a run's identity is corrected: it proves the channel and the business, not a person.
- The configurator's identity check is answered by the same rule: the configurator is a member whose role is configurator, and every configurator action needs a fresh sign-in.

> **Do you accept C?** Membership per business; channels bound only while signed in, used to route and to carry routine words as claims; a fresh sign-in, through the provider, for every step that needs a person's permission; each approval records who and how.
> **Answer, 2026-10-22:** yes — the project owner accepted the recommendation.
>
> **Minutes since sign-in before a new one is needed:** settled 2026-10-22: **15**; a business may shorten it.
>
> **A changed WhatsApp identifier suspends the binding; moving a binding needs the configurator?** Settled 2026-10-22: **yes** to both.

---

## Summary for decision

| # | Question | Recommendation | What it changes | Your answer |
|---|---|---|---|---|
| 1 | Who writes a wait a tool hands off | The tool declares it; the worker's fixed code saves it, before the AI is told | Waits record who declared them; one smaller question | Yes (decision 19) |
| 2 | Who writes the status-check answer | An event, saved as an arrival by the intake step; the worker, using the tool's code, writes what it means | The answer's route is written down; older "message" lines corrected | Yes (decision 20) |
| 3 | How the status-check service calls out | Through the tool layer: the service decides when, the tool layer makes the call; news sent to Tend comes straight in | The one way out keeps no exception; two smaller questions | Yes (decision 21) |
| 4 | Who holds the book of waits | Data kept with the situation records; the worker sets each time signal, which comes straight back to it | No new part; one smaller question | Yes (decision 22) |
| 5 | Who writes consent records | The communication layer: one list per business, with evidence, read before every send | A new writer-table row; three smaller questions | Yes (decision 23) |
| 6 | What wakes situations after a platform rule change | The conversation manager wakes only the affected situations; the send check stays the gate | Narrows a Decided rule; a new writer-table row; one smaller question | Yes (decision 24) |
| 7 | How a person is matched to permissions | Membership; channels bound while signed in, which carry claims only; a fresh sign-in for money and settings | Two new records; two smaller questions | Yes (decision 25) |

All seven were accepted on 2026-10-22, and every smaller question was settled. The same day:
- the open conflicts were settled, as [the conflict register](conflict_register.md) records;
- the calls made while writing the design were accepted, as [the decisions register](decisions_register.md) records;
- every affected file was changed, and audited. [The completion record](completion_record.md) gives the result.

## Team numbering

In the question backlog, these seven are Q1, Q2, Q3, Q6, Q9, Q17, and Q20, in this order.

<!-- Outside sources used: Temporal, AWS Step Functions, Azure Durable Functions, Restate, and Inngest documentation; microservices.io and Azure architecture patterns (transactional outbox, idempotent consumer, event sourcing, scheduler-agent-supervisor); Stripe webhook documentation; AWS backoff and jitter; LangGraph, OpenAI, Anthropic, and MCP documentation on long-running work; Istio egress gateway; GDPR (gdpr-info.eu); UK ICO consent guidance; DPDP Act section 6 (dpdpa.com) and secondary summaries of the DPDP Rules 2025; UK PECR; US TCPA (47 CFR 64.1200) and the FTC's CAN-SPAM guide; WhatsApp Business Messaging Policy; Meta developer documentation on opt-in, the reply window, messaging limits, and business-scoped user IDs; RFC 8058; Google and Yahoo sender requirements; Telegram bot documentation; OpenID Connect Core 1.0; RFC 7643 and 7644; NIST SP 800-63B-4; Microsoft Entra and Auth0 documentation; the Zanzibar paper's abstract; OpenFGA consistency documentation. Knowledge-base sources are cited in the hidden note beside each statement. -->
