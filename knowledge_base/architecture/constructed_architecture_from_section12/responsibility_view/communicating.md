# Communicating — what Tend is responsible for

This file answers one question: what must Tend be responsible for when it speaks to a person?

Two duties sit here. First, say what is worth saying, honestly, to the right person, with only what that person may see. Second, send each message on a channel whose rules allow it, with the consent it needs.

Tend is the software that keeps a business's operational problems moving. Each problem is one **situation**: one late parcel, one refund, one outreach. <!-- A1 -->

Three stories run through this file.

**Meera's parcel.** Meera wrote on WhatsApp on Sunday at 09:00, asking where her parcel is. Tend replied that morning. The carrier's tracking has not changed since. Arjun, an employee, handles deliveries. Tend owes Meera an update by Monday at 10:00. <!-- written for this file: Meera's messages -->

**The investor.** An investor asks the business for two things: its pitch deck, and its revenue figure. The deck is ready. The revenue figure is still being checked. <!-- Level 2 communication: the investor ruling -->

**Priya's outreach.** The owner gave Tend thirty people to contact about a product. Priya is one of them. Nobody on the list has written to the business first. <!-- Level 2 authority: thirty addresses -->

Who is who here:
- The **situation worker** is the part that reasons about one situation. It decides the next step, and writes what should be said. It never sends.
- The **conversation manager** is the part that reacts when something happens. It records each incoming message. It reads each new version of a situation, and decides whether the change is worth telling a person. That choice is called the **update decision**.
- The **communication layer** shapes each message, checks it, sends it, and records what it sent.
- **Fixed code** is code that always makes the same check. It is not the AI's judgment.
- **The AI** is the language model that suggests words and steps. It never decides alone.
- An **intent** is the worker's written note of what should be said, and to whom.
- A **channel** is a route to a person: WhatsApp, Telegram, email, or the chat on the business's website.
- A **reply** is Tend's answer to a person's latest message, on the channel the person used, while that channel still allows it. Any other message from Tend is a **start**.
- A channel's **window** is the time after a person's message in which Tend may send freely. On WhatsApp it is 24 hours. One case lasts 72 hours, explained below.
- A **template** is a message WhatsApp has approved in advance, for a kind of message such as an update or a promotion. **Opt-in** is a person's agreement to receive that kind of message. An **unsubscribe route** is a way for the person to stop future messages.
- The **business contact** is the person the business names to decide when no channel can be used.
- **Partner** means an outside business with its own job in the situation, such as the carrier.
- **The decision** is the situation worker's choice of the next step. A **run** is one pass of the situation worker over one situation.
- A **wait** is Tend's pause on a situation until one named thing happens. The full rules for waits are in [the time and people file](time_people_and_meetings.md).
- **Authority** is the right to let a step happen. A **grant** is a range of steps the business allows Tend to take.
- To **escalate** is to hand the work to the next person who can act on it, or to raise how urgent it is.
- A **claim** is a statement from a source, such as the carrier's record of where a parcel is.
- A **tool result** is the answer a connected system gives Tend.
- The **tool layer** is the part through which Tend calls every outside system.
- A **working reading** is Tend's best current understanding of something, not yet confirmed.
- **Consent** is a person's yes to a kind of message from the business.
- A **legal ground** is a legal reason, other than that yes, which lets a business send a message. Which grounds count is set for each market.
- A **fallback** is a backup used when the usual source, route, or rule fails, is missing, or is unclear: one the business allows, or, where the business has none, a safe default the product sets.
- A **delivery receipt** is a channel's report that a message arrived.

Each rule here has one of these statuses:
- **Decided:** the project owner — the person designing Tend, not the business owner — said yes. On 2026-10-22 the project owner accepted every recommendation this design had made, and asked for the smaller questions inside them to be settled in the way that best fits; those points are Decided, and points settled that day say so. A rule marked as "the design's reading" was worked out from its sources rather than found written down; it is Decided too. <!-- decided by the owner, 2026-10-22 -->
- **Provisional:** a working choice that carries a condition for reopening it.
- **Rejected:** turned down on purpose, with the reason kept.
- **Deferred:** a value or a detail left, on purpose, to a later stage — **deferred to configuration** (each business or market sets it), **deferred to Level 3** (the stage that chooses the technology), or **deferred to implementation** (whoever builds it). The rule around it is Decided.

Two earlier status words, **To confirm** (written down, but not yet agreed by the project owner) and **Open** (no answer yet), are no longer used: since 2026-10-22, no rule here carries either.

A rule with no status word next to it is **Decided**: it has a source the project owner accepted. Every rule that is not Decided carries its word where it appears. In the rest of this file, "the owner" means the business owner.

<!-- Every rule below carries its code in a hidden note. Its meaning, source, and status sit in code_index.md in this folder. -->

## Three parts, three jobs

Saying something to a person takes three separate acts. Three different parts own them. <!-- I7; Section 8: communicate -->

1. The situation worker writes the intent: what should be said, and to whom. It never sends. <!-- I7; INV-2 -->
2. The conversation manager reads that new version, and makes the update decision: is this change worth telling the person now? <!-- Section 8: update decision -->
3. If yes, the communication layer shapes the message, checks it, sends it, and records what it sent. <!-- I7; Section 7 parts: communication layer -->

The next step is chosen in the decision. Whether to tell the person is a different choice, made by the conversation manager. <!-- Level 2 communication: who decides what -->

The worker and the conversation manager never call each other. The worker saves a new version of the situation. That save sends a short notice that a new version exists. The conversation manager reads the new version. <!-- Level 2 communication: the ticket picture -->

Think of the situation as a work ticket. The worker updates the ticket with its work: done, waiting, and so on. The conversation manager watches the ticket. When the ticket changes, it reads the change, and tells the person. <!-- Level 2 communication: the ticket picture -->

There is one way out, and only one. Every message Tend sends goes through the communication layer. No part has a private way to send. <!-- Level 2 communication: one way out -->

A timer never reaches the conversation manager or the communication layer. A timer wakes only the situation worker. <!-- IB-1 -->

Communicating does not decide what is true. It does not decide what the business wants, who has authority, or whether a step is allowed. Those were settled before the message was written. <!-- Level 2 communication: what it does not decide -->

## When Tend speaks

Tend speaks when a message is permitted and useful, when Tend can say why it is sending it, and when it moves the situation forward safely. <!-- Level 2 communication: when to speak -->

A message must do at least one of these: <!-- Level 2 communication: ten purposes -->
1. answer a request Tend can support;
2. tell a change that matters;
3. name a step that someone must take next;
4. ask for missing information, or for a person to take on work;
5. prevent a harmful surprise;
6. correct something said earlier;
7. make a wait, or a lack of action, visible;
8. keep a promise the business has set up;
9. carry out the business's instruction to contact a named or chosen person;
10. tell the result of a decision, where sending it is safe.

Tend never speaks merely because it can produce words. <!-- Level 2 communication: ten purposes -->

A change that would surprise the person is told before it happens. <!-- Section 8 additions: no surprise -->

### No receipt-only replies

When a message arrives, Tend records it, and finds or creates its situation. That record is Tend's own proof, for the business, that the message came in. <!-- I1; Level 2 communication: recording is internal -->

By default, Tend does not send a reply only to confirm receipt, such as "we received your message". A reply carries something real about the situation, or an honest promise tied to it. <!-- I1 -->

A business may set up its own acknowledgement, with its own wording. <!-- I1 -->

A business may also set up an update for a kind of message. For example, when a tax notice arrives, its deadline can be sent on as a real update. That is the business's choice. <!-- settled page: configured update -->

The ticks a chat app shows when a message is read come from the app. They are not messages from Tend. <!-- Level 2 communication: recording is internal -->

### Tell the change, not the work

A person hears about a change that matters to them. A routine step that changes nothing they care about stays on the record, and is not sent. <!-- Level 2 communication: tell the situation -->

When the situation worker runs and saves no change, nothing is sent outside. <!-- Level 2 communication: the investor ruling -->

A person outside the business hears what the situation is. They never hear about internal steps, such as "checked the carrier, then the order system". <!-- Level 2 communication: tell the situation -->

People inside the business may see work items and operational detail. People outside see the situation, at the level their role allows. <!-- Level 2 communication: tell the situation -->

### A partial answer can go out

A partial answer is allowed. It is said plainly, as a partial answer. <!-- Level 2 communication: the investor ruling; Section 8: partial answer -->

The investor gets the deck now, with a plain line: the revenue figure is still being checked. The investor does not wait until every request is finished. When the revenue figure is confirmed, the conversation manager decides whether to tell the investor. <!-- Level 2 communication: the investor ruling -->

Before the deck goes out, a named person approves it, because each disclosure to an investor needs that approval. The full rule is in [the deciding file](deciding_and_permission.md). <!-- accepted call: investor and regulator -->

### A message can start a situation

A message is not always a reply. It can be the first thing that happens in a situation. <!-- Level 2 communication: starting a situation -->

The thirty people show how a message can start a situation. Tend opens one situation for each person. For each one, it checks the business's purpose, where the contact came from, what Tend knows, its authority, and the channel rules. Then it decides when the message is permitted and useful, and writes it. <!-- Level 2 communication: starting a situation -->

The same holds for a delivery-delay update, a request for feedback after a purchase, a reminder about a meeting, or a handoff to an employee. <!-- Level 2 communication: starting a situation -->

So the test is not whether a message is incoming or outgoing. Two questions decide it. Has the business given a clear purpose and a clear target? Do the facts, Tend's authority, privacy, and the channel rules support the message? <!-- Level 2 communication: starting a situation -->

A later event can lead to a message with no new prompt from anyone. The event is a new version of the situation. <!-- Level 2 communication: a later event -->

Tend does not send messages in bulk to people it has no reason to contact. It does not get around a channel's rules, ignore consent, or hide why it is writing. <!-- Level 1: no bulk messages -->

Tend does not choose on its own whom to contact, beyond the list or the limits the business gave. A message with no situation behind it is also outside Tend. <!-- Level 2 communication: outside Tend -->

## When Tend holds back

Tend waits, instead of writing, when a message now would be less safe or less useful than waiting. <!-- I3 -->

That is the case when a message would be: <!-- I3 -->
- too early;
- misleading;
- unnecessary;
- unsafe;
- not backed by what Tend knows;
- a repeat of something already said;
- outside the person's responsibility;
- outside what the business may say;
- forbidden.

Some examples of when this happens: <!-- Level 2 communication: when to wait -->
- a fact that matters is missing;
- a doubt that matters is not settled;
- two sources disagree in a way that changes the answer;
- an approval, or a person's part of the work, is still pending;
- the next event that matters has not happened;
- nothing has changed since the last message;
- the business has not decided yet what it wants to say.

Waiting is never forgetting. The situation keeps why it waits, what it waits for, who is expected to answer, and what happens when the wait ends. The full rules for a wait live in [the time and people file](time_people_and_meetings.md). <!-- Level 2 communication: waiting is not forgetting -->

Waiting can mean different things, and they are kept apart: <!-- Level 2 communication: kinds of waiting -->
- waiting in silence, because no message would help;
- waiting the person is told about, so they know work is going on;
- waiting for information;
- waiting for a person to take on work;
- waiting for a business decision;
- waiting for a change in the situation.

Each wait says whether the person is told about it, or whether it stays silent. <!-- Section 8 additions: silent or told -->

The decision chooses to wait. Whether the person hears about the wait is the conversation manager's update decision. It decides by whether the wait matters to that person. <!-- Level 2 communication: who decides the wait is told; decided by the owner, 2026-10-12: a wait is told by relevance -->

Meera's wait is told. The update before the promised time is how she learns of it. <!-- written for this file: Meera's messages -->

## Asking instead of acting

Tend asks when a missing answer could change: <!-- I4 -->
- which situation this is;
- what the person wants;
- which information is needed;
- who is responsible;
- which policy applies;
- whether the step is allowed;
- what the step would cause.

Tend acts without asking when four things hold: the situation is understood well enough, the information is usable, the policy allows the step, and no open doubt could make the step unsafe. <!-- Level 2 communication: when to act -->

A question goes to the person who can answer it: <!-- Level 2 communication: who to ask -->
- the customer or prospect, about what they want, who they are, or what happened to them;
- an employee, about the business's knowledge or its work;
- the owner, about a decision the business keeps for the owner;
- a partner, about information or work that belongs to the partner;
- another person the situation names.

Tend does not ask a person for what a source already provides. It never asks a customer to settle a disagreement inside the business. <!-- Level 2 communication: who to ask -->

Tend asks for a person's attention only when that person's part can change the next safe step. How Tend weighs that is written in [the time and people file](time_people_and_meetings.md). <!-- Level 2 people: interruption -->

A question is about the smallest part that is still unclear. It never asks the person to repeat the whole problem. <!-- Level 2 understanding: focused question -->

Asking has a cost. Tend asks only about doubt that can change the situation, not about every possible meaning of the words. <!-- Level 2 understanding: asking has a cost -->

How many questions Tend may ask in one situation is a number each business sets, with a product default. <!-- closed item: question limit -->

### "Ask" is not one thing

Several different things look like questions: <!-- Level 2 communication: ask is not one meaning -->
- making something clear;
- gathering information;
- asking a person to acknowledge something;
- asking for consent;
- asking someone to authorise access or a step;
- asking for approval.

They are different responsibilities. Communicating only puts the question into words. The part that needs the answer decides why it is asked, and what the answer means. <!-- Level 2 communication: ask is not one meaning -->

An approval is the clearest case. The approval request travels through the communication layer, but the approval is handled by the tool that needs it. The full rule is in [the deciding file](deciding_and_permission.md). <!-- Level 2 authority: approval through the communication layer -->

## How much to explain

Tend gives the smallest explanation that lets the person understand the situation and do their part. <!-- I5 -->

How much that is depends on: <!-- Level 2 communication: depth depends on -->
- the person's role;
- the responsibility they hold;
- their authority;
- what the decision will cause;
- how sensitive the information is;
- the question they asked;
- what they are expected to do.

A customer or a prospect usually needs five things: <!-- Level 2 communication: what a customer needs -->
- what happened;
- what is known;
- what is still uncertain;
- what Tend or the business is doing;
- what they should do next.

An employee or the owner may also need the evidence, the disagreement, what is missing, the deadline, who is responsible, and the authority the step needs. <!-- Level 2 communication: what a customer needs -->

A partner gets only the operational detail its own part of the work needs. <!-- Level 2 communication: what a customer needs -->

More explanation is not always better. An explanation can be accurate and still wrong to send. It may expose confidential information, private data, a disagreement inside the business, or another person's responsibility. <!-- Level 2 communication: need to know -->

The person gets enough to act safely. They do not get every internal detail. <!-- Level 2 communication: need to know -->

### When Tend explains why

Tend explains its reasons when the reason matters for trust, responsibility, safety, or the person's next step. <!-- Level 2 communication: when to explain -->

It matters most when Tend: <!-- Level 2 communication: when to explain -->
- refuses or delays a request;
- tells of something uncertain or in dispute;
- changes an earlier answer;
- recommends that a person get involved;
- escalates work;
- uses a fallback, because a policy was missing or unclear;
- takes a step with real consequences;
- is asked why it did, or did not, do something.

A routine message with little at stake may need only where things stand, and what comes next. <!-- Level 2 communication: when to explain -->

An explanation gives useful reasons and the evidence behind them: <!-- Level 2 communication: what an explanation holds -->
- what information was used;
- what is still unknown or disputed;
- which rule or responsibility shaped the next step;
- what will happen next.

It never shows the AI's inner reasoning. It never shows information the person does not need. <!-- Level 2 communication: what an explanation holds -->

Tend's messages say what happened, why, and what happens next. <!-- Section 8 additions: what, why, next -->

Keeping the reasons is a different job. The record keeps the reason and the evidence behind each important step. Communicating decides how much of that each person hears. The record's rules are written in [the business view file](business_view_and_capabilities.md). <!-- Level 2 communication: explaining is not recording; O7 -->

A refusal has its own shape: what was refused, why, and the path that is left. The full rule is in [the deciding file](deciding_and_permission.md). <!-- G4 -->

## Different people, different messages

Messages differ by the person's role, not only by their tone. The same situation can need different messages to different people, because each holds a different responsibility, and may see different things. <!-- Level 2 communication: role, not audience -->

A message to a customer or a prospect puts first: <!-- Level 2 communication: to a customer -->
- clear language;
- the answer, or where things stand;
- the next useful step;
- honest uncertainty;
- what they can realistically expect;
- continuity with what the business said before.

It never shows blame inside the business, private information, guesses, or operational detail the customer does not need. <!-- Level 2 communication: to a customer -->

A message to an employee or the owner puts first: <!-- Level 2 communication: to an employee -->
- the situation that matters;
- the evidence, and the claims still open;
- what is missing;
- the responsibility being asked of them;
- how urgent it is, and the deadline;
- the authority the step needs;
- what has already been tried.

A message to a partner explains the part of the problem the partner owns, what it is asked to do or look into, and the information it needs for that. It never shows the full record of the customer or the business. <!-- Level 2 communication: to a partner -->

Meera's parcel shows the difference. Meera hears that the parcel is delayed, that the business is checking with the carrier, and when she will hear next. Arjun hears that the carrier's tracking has not moved since Sunday, that Meera was promised an update by Monday at 10:00, and what he is asked to do. <!-- written for this file: Meera's messages -->

Tend does not tell a customer they are wrong. It shows what the record says. <!-- Section 8 additions: not wrong -->

A message never blames the customer. It never promises a result, or compensation, that Tend cannot give. <!-- Section 8 additions: no blame, no promise -->

## Saying what is uncertain

Tend tells the kind of doubt and what it means for the person. It never gives a confidence score; Tend has none of its own. The full rule is in [the gathering file](gathering_and_trust.md). <!-- I6; E3 -->

A message keeps these apart: <!-- Level 2 communication: kinds of doubt -->
- what is known;
- what someone has claimed;
- what is unknown;
- what may be out of date;
- what is only a working reading;
- what is in dispute;
- what Tend is doing next.

A customer hears, within limits, what is known, what is still being checked, and what happens next. Tend tells the customer this when it changes what they understand or expect. <!-- Level 2 communication: doubt for a customer -->

Tend never promises an outcome the evidence does not support. <!-- Level 2 communication: doubt for a customer -->

An employee or the owner may need the fuller picture: the other possible readings, the claims and their sources, the missing evidence, the deadlines, and why the doubt matters to the next decision. <!-- Level 2 communication: doubt inside the business -->

Tend may use a working reading inside the business when the other readings would not change what happens. <!-- Level 2 communication: working readings -->

It never presents a working reading as confirmed when that reading could change the situation, who is responsible, the policy, or what the customer is told. <!-- Level 2 communication: working readings -->

Tend tells of doubt when it changes what the person should understand, expect, decide, or do. It gives the reason and the next step. It never invents a number. <!-- Level 2 communication: working readings -->

## Saying what conflicts

When two sources disagree, Tend keeps both claims. It tells of the disagreement, neutrally, when it changes what the person understands or must do. <!-- I6; Level 2 communication: conflicts -->

Suppose, later, the carrier says Meera's parcel was delivered, and Meera says it never reached her. The message can say, at the right level of detail: <!-- Level 2 communication: conflicts; Level 2 trust: the delivery conflict -->
- what one source says;
- what the other person says;
- what is still unresolved;
- what that means for the person;
- what Tend or the business is doing next.

Tend never: <!-- Level 2 communication: conflict don'ts -->
- picks a source quietly, because its answer came last;
- accuses anyone of lying;
- turns one claim into the plain truth;
- reveals a confidential source when that is not needed;
- asks a customer to settle a disagreement inside the business;
- takes a step with real consequences while the disagreement blocks that step.

Different people need different amounts. Meera may need a short, neutral account, and the next step. Arjun or the owner may need all the evidence, and who is responsible. The carrier may need only the conflicting delivery details it is asked to look into. <!-- Level 2 communication: conflict for each person -->

Communicating does not settle the disagreement. Finding and weighing it belongs to [the gathering file](gathering_and_trust.md). Choosing what to do about it belongs to [the deciding file](deciding_and_permission.md). Communicating says the result, safely. <!-- Level 2 communication: conflict boundary -->

A disagreement is never hidden, and never settled by choice of words. <!-- Level 2 communication: conflicts -->

## Correcting what was said

Tend corrects an earlier message when new information makes it misleading. <!-- Section 8 additions: correction -->

Tend writes the correction as a new version. The earlier version stays in the history, with what Tend believed and said at the time. The new version carries the new claim, the reason for the change, and the correction that must be sent. <!-- Level 2 trust: corrections go forward -->

## Facts in a message come from a source

A fact in a sent message, such as an order number, a tracking number, or a price, comes from a tool result in the same run. It never comes from the AI's own memory. <!-- Level 2 security: grounding -->

A draft, or the AI's reasoning, is never sent unless a saved intent says it should be sent. <!-- Section 8: draft text -->

What goes out on a channel is checked and formatted by fixed code. It is never the AI's raw output. <!-- Level 2 security: outbound bytes -->

Data from a connected system is untrusted. Before sending, only the fields the person may see stay in the message. <!-- U2 -->

Every address Tend sends to — a phone number, an email address, a chat — must be on an allowed list. <!-- Level 2 security: destination allowlist -->

## What the AI may and may not do

The AI helps with words and with reading meaning. It may: <!-- Level 2 communication: what the AI may do -->
- suggest what a person means;
- suggest a question to make something clear;
- draft a reply, an update, a question, or an explanation;
- summarise the evidence a person may see;
- translate, or make the language simpler;
- fit the wording to the person's role.

The AI never has the final word on: <!-- Level 2 communication: what the AI may not decide -->
- whether a message is permitted;
- whether a person may see a piece of information;
- whether consent or authority exists;
- whether a source can be trusted;
- whether two claims conflict under a set rule;
- whether a policy applies;
- whether a step needs approval;
- whether a message was sent or delivered;
- whether a person accepted a piece of work;
- whether the work was done.

Fixed code decides consent, delivery, and whether work is done. <!-- Section 7 additions: fixed code decides -->

The AI sees only the information the other parts have already limited. It suggests. Fixed rules, the business's policy, authority, and the people responsible decide what actually happens. <!-- Level 2 communication: what the AI may not decide -->

Two other ways were turned down. **Rejected:** letting the AI run messages from end to end. It could invent facts, show restricted information, make promises nobody backs, get around policy, and treat words it wrote as a message sent. **Rejected:** fixed templates only. Tend must speak in situations nobody planned for, explain doubt, handle disagreements, and speak differently to different people. <!-- Level 2 communication: rejected ways -->

The chosen way: the parts outside the AI fix what is said, to whom, what they may see, and the limits. The AI helps say it naturally. <!-- Level 2 communication: the chosen way -->

### Language and tone

Each business sets its language and its tone. They can differ by market. <!-- Level 2 prompt constitution: language and tone; research: market facts -->

The business's wording is a setting. Tend's own fixed sentences are written by the product and do not change. <!-- Section 8 additions: wording -->

Before a draft is sent, fixed code checks that it is in the business's language. The check sits in the communication layer's send check, with the other checks on the message itself. <!-- Level 2 prompt constitution: language check -->

## The check before anything is sent

The communication layer sends a message only when all of these hold. When the message is a start, the five checks for a start, described below, must also pass. <!-- IB-5 -->
- the intent is on a saved version of the situation;
- the conversation manager decided it is worth telling;
- the permission check returns Allow for this channel, this person, and this kind of content;
- the channel's rules hold: the window, the template, and the consent;
- only the allowed fields remain in the message.

A resend of an earlier message may use an intent on an older version, on purpose. <!-- IB-5 -->

The permission check runs before every outgoing message. It answers Allow, Deny, or "a person must approve first". The full rule is in [the deciding file](deciding_and_permission.md). <!-- AC-2; T2 -->

Permission is checked again at each step. If the business withdrew a grant a moment ago, the next send stops. <!-- T6 -->

If the check says Deny, nothing is sent. The communication layer records the refusal, with its reason; the notice of that save wakes the situation worker, which proposes another step, or escalates. <!-- AC-2 -->

## The rules of each channel

The core of Tend never depends on which channel is used. It asks for "a message to this person, with this intent". It does not need to know whether that is WhatsApp or email. <!-- L1 -->

Each channel has one **rule record**: the written list of what that channel allows. The communication layer holds it. <!-- L1 -->

A rule record holds the answers to five questions: <!-- L1 -->
- Can Tend start a message?
- Can Tend reply, and for how long?
- Which kinds of message exist?
- What consent is needed?
- What does it cost?

How a message actually travels — the provider, the delivery, the technical steps — is chosen later, when the technology is picked. <!-- Level 2 channels: what a channel permits, and how it travels -->

### The four channels

All four channels are in scope: WhatsApp, Telegram, email, and the business's website chat. <!-- decided by the owner, 2026-10-12: four channels -->

On some channels, a person's message opens a window, a period in which Tend may send freely. Outside the window, on WhatsApp, Tend may send only approved templates. <!-- Level 2 channels: a window is a wait -->

**WhatsApp.** "Charged" means the business pays WhatsApp for the message. "Free" means it pays nothing. <!-- Level 2 channels: WhatsApp -->
- Inside the 24-hour window, Tend may send any message, with no template.
- Outside it, Tend may send only an approved template, and only with the person's opt-in.
- Templates come in two kinds: utility templates, for operational updates, and marketing templates, for promotions.
- Utility templates are free inside the 24-hour window.
- Marketing templates are charged, even inside it.
- Outside the 24-hour window, both kinds are charged.
- The one exception is the 72-hour window below.

**The 72-hour window.** Some people open a WhatsApp chat by tapping an ad, or a button on the business's Facebook page, in the mobile app on their phone. That opens a 72-hour window. No message sent in those 72 hours is charged, templates included. For the first 24 hours, Tend may send any message. From hour 24 to hour 72, only approved templates. After the 72 hours, the ordinary WhatsApp rules above apply. <!-- Level 2 channels: the 72-hour window -->

**Telegram.** On Telegram, a business talks to people through a **bot**: an automated account. <!-- Level 2 channels: Telegram -->
- A bot cannot start a chat. The person must write to the bot first, or add it to a group.
- Once the person has started the chat, Tend may write in it, at no cost by default.
- Telegram states no template rule.
- Telegram has two kinds of bot. A business bot can reply only in a chat where the person wrote in the last 24 hours. An ordinary bot has no time limit.
- Which kind Tend uses is a technical choice, made at the technology stage. Either kind keeps the rules above. <!-- closed item: Telegram bot kind -->

**Email.** Tend may start an email when the person's address is on record, consent is in place, and the message has an unsubscribe route. Other legal grounds for an email are confirmed for each market when Tend enters it. <!-- Level 2 channels: email -->

**Website chat.** Tend may write only while the visitor's chat is still open. <!-- Level 2 channels: website chat -->

Email is sent only from a sender address the business has verified. <!-- research: verified sender -->

Slack is not in scope. Phone calls are not in scope yet. <!-- Section 7 additions: not in scope -->

The costs of Telegram and email messages are recorded in each channel's rule record when the channel is built. <!-- closed item: channel costs -->

### A window is a wait

A channel's "may Tend send now?" is not a fixed setting. It opens and closes. <!-- Level 2 channels: a window is a wait -->

A WhatsApp window opens when the person writes. It closes 24 hours after their last message. So a window is a wait: it starts when the person writes, and it ends 24 hours later. When it closes, the waiting situation is checked again: the window's end is the wait's time signal, the alarm for its due time. <!-- Level 2 channels: a window is a wait -->

So "start on another channel" often means "wait until the person writes on that channel". <!-- Level 2 channels: a window is a wait -->

### When a channel's rules change

When a platform changes its rules, the product team updates that channel's rule record. <!-- decided by the owner, 2026-10-12: rule record updated -->

The update announces itself. The conversation manager then reads the book of waits. It finds the situations with a step pending on that channel, and writes a new version into each, so each wakes and plans again. The change is saved once first, and each of those versions carries its reference; if the writing stops part-way, it starts again and skips the situations already written. Every other open situation meets the new rule at its next wake. A message that is no longer allowed is stopped at the check before sending. When many situations are affected, their wakes are released at a steady pace. <!-- decided by the owner, 2026-10-12: rule record updated; Section 11: platform rule change; decided 2026-10-22: platform rule wake; settled 2026-10-22: steady pace -->

A business's own policy stays as it was when the situation opened. A platform's rule is always the newest one. The full rule is in [the memory and configuration file](memory_configuration_and_improvement.md). <!-- Q3 -->

## Replying, or starting a message

**A reply stays on its channel.** Tend answers on the channel the person used for their latest message, while that channel still allows a reply. <!-- L3 -->

If the window has closed, any message from Tend on that channel is a start, even if it answers a question. <!-- L3 -->

Meera wrote on WhatsApp on Sunday at 09:00. Tend may reply on WhatsApp until Monday at 09:00. After that, any message is a start. <!-- Section 8: reply example -->

**A start chooses a channel.** Tend uses the first option that is available and allowed, in this order: <!-- L3; decided by the owner, 2026-10-12: channel order -->
1. **A window or chat that is open now, where no template is needed:**
   - WhatsApp, inside its 24-hour window;
   - Telegram, only in a chat the person began;
   - the website chat, while the visitor's chat is still open.
2. **Email,** when the address is on record, consent is in place, and the message has an unsubscribe route.
3. **A WhatsApp template,** only outside the 24-hour window, only for a message an approved template covers, and only with opt-in.
4. **No option is available and allowed.** The business contact decides, or Tend waits for the person to write first.

Email comes second, for two reasons. The project owner decided to use email when Telegram is not connected. And the research recommends email first for the follow-ups and feedback requests that Tend starts. <!-- decided by the owner, 2026-10-12: channel order -->

Before any start option is used, the five checks for a start must pass: <!-- Level 2 channels: the five checks -->
1. The channel's rule record allows it.
2. The purpose is allowed.
3. The person's contact permission allows it.
4. Consent is in place, or another legal ground where the law requires one. For email, an unsubscribe route is also needed.
5. The channel allows this message now. For WhatsApp: an open window, or an approved template outside it. For Telegram: a chat the person began. For email: an address on record.

Checks 2 and 3 together ask one question: may the business message this person, for this purpose? <!-- Level 2 channels: the five checks -->

A closed WhatsApp window does not block email. Each channel has its own rules. <!-- Level 2 channels: the five checks -->

The communication layer, which is part of Tend, makes the channel choice. It follows the order and the checks above. The AI does not choose. <!-- L3 -->

The same order applies to customers and to prospects. An employee is reached on the work channel they chose. <!-- Level 2 channels: who the order covers -->

A partner is contacted only after escalation, and only when the business's policy allows it. The partner's own arrangement with the business applies as well. The full rule is in [the time and people file](time_people_and_meetings.md). <!-- K4 -->

**Meera's update.** Meera last wrote on Sunday at 09:00. Her WhatsApp window closed on Monday at 09:00. The update is due at 10:00, so it is a start. <!-- written for this file: Meera's messages -->
- If Meera's email address is on record, with consent and an unsubscribe route, Tend sends the update by email.
- If not, and she has opted in to WhatsApp templates, Tend sends an approved utility template that covers this kind of update.
- If neither works, the business contact decides, or Tend waits for Meera to write.

**Priya's first message.** Priya has never written, so no window is open, and Tend's first message to her is a start. Tend writes to her only if the business may contact her for this purpose, and one option in the order passes the five checks for a start. The story does not say whether her email address is on record with consent, or whether she has opted in to WhatsApp templates. If no option passes, the business contact decides, or Tend waits for her to write. <!-- written for this file: Priya's start -->

### Finding no channel is not a refusal

When no channel can be used, that is a routing outcome, not a refusal. It does not mean "we cannot reach this person". The business contact decides, or Tend waits for the person to write. <!-- Level 2 channels: a routing outcome -->

What happens if the wait goes on too long follows the failure rules, written in [the failure file](failure_and_recovery.md). <!-- Level 2 channels: a routing outcome -->

A message never fails silently because of a channel. <!-- Level 2 channels: a routing outcome -->

### One situation, many channels

When a person moves from one channel to another, it is still the same situation. Meera may be reached first on WhatsApp, and then by email. <!-- Level 2 channels: one situation, many channels -->

### When sending fails

The tool layer is the part through which Tend calls every outside system. A send is such a call. <!-- M4 -->

Only the tool layer retries a send. It retries within the channel's rules, with a growing pause between tries, and a limit. The communication layer never repeats a send on its own. <!-- M4; Section 11: retries in the tool layer -->

If a send's result is unknown, the tool layer checks the result first. It does not send again unless the other side can tell the message is a repeat, and ignore it. <!-- M4 -->

When a channel keeps failing, the situation worker waits, or proposes another channel the rules allow. <!-- Section 8: a failing channel -->

When a message cannot be delivered, the communication layer records the failure as evidence. The situation worker then wakes, updates what it knows, and decides what kind of case this is. It may escalate. <!-- IA-10 -->

The communication layer never declares a failure in the situation, and never writes the outcome. The situation worker does. <!-- Section 7 writer table: waits -->

## Consent and the preferred channel

Consent is not one thing. It depends on who is on the other side, and on whether Tend replies or starts. <!-- L2 -->

| | Customer or prospect | Employee | Partner |
|---|---|---|---|
| **Replying** | Given by writing in. Stay on the current channel. No consent record is needed. | No consent is needed for work contact. Use the work channel Arjun chose. | Given by the arrangement with the business. |
| **Starting** | The purpose must be allowed. The person must have agreed, or another legal ground must apply. The channel must allow this message now. | Not a consent question. The business contacts its staff about their job. | Set by the business, limited to what the task needs, and subject to the partner's own rules. |

<!-- L2; Level 2 channels: consent table -->

A person who writes to the business on a channel has consented to replies on that channel. That consent comes from writing in. <!-- decided by the owner, 2026-10-12: consent by writing in -->

Writing in opens a window. It does not, by itself, allow a message the business starts. The channel's own rules decide that. <!-- decided by the owner, 2026-10-12: consent by writing in -->

An earlier message allows replies on that channel. It does not allow new starts. <!-- L2 -->

Three gates stay separate, and each is checked on its own: the purpose and its legal ground, the consent needed, and the channel window. <!-- Section 8 additions: three gates -->

Even a customer who has agreed, and would be glad to hear from the business, gets only approved templates while the WhatsApp window is closed. <!-- Level 2 channels: two gates stay real -->

An employee is not a consent question. The business may reach the people it employs about their work. Which channel to use is a practical question, not a permission question. <!-- Level 2 channels: an employee is not a consent question -->

### What a consent record holds

When consent is needed, its record is small. It is tied to one contact point — a WhatsApp identifier, an email address, or a Telegram user — not to a whole customer record. On WhatsApp the identifier may be the one WhatsApp gives each user for this business, which changes when the user changes number; a phone number alone is not a safe key. <!-- Level 2 channels: the consent record; decided 2026-10-22: consent records -->

It holds: <!-- Level 2 channels: the consent record -->
- the person;
- the channel;
- the kind of message, or its purpose;
- how and when the permission was given;
- what it covers;
- any withdrawal, or end date.

The send check reads one answer from it: may this message go to this person, yes or no. <!-- Level 2 channels: the consent record -->

Because the law puts the burden of proof on the business, each entry also says whether consent was given, withdrawn, expired, or refreshed, and keeps its evidence: what the person did; what they were shown, and its version; when; and through which channel. <!-- settled 2026-10-22: consent fields -->

**Who writes it.** The communication layer's fixed consent code is the only writer of consent records. The AI never writes one. Each business keeps its own list. The send check reads the list at the moment of every send. <!-- closed item: consent record writer; decided 2026-10-22: consent records -->

Entries come from three places, all through that one writer: <!-- decided 2026-10-22: consent records -->
1. an arrival that is an opt-in or an opt-out — "STOP" on WhatsApp, an unsubscribe click, an email saying "please stop". The intake step saves the arrival (an arrival is anything that comes in from outside — a message, an outside system's answer — saved as a new version) as usual; its notice wakes the consent code, which adds the entry. A fixed keyword, such as STOP, is read by fixed code;
2. an opt-in the business collected in its own systems, such as a checkbox at checkout. It arrives through a tool, with its evidence;
3. a platform's own signal, such as a person blocking the business. It arrives as an event, and is handled like the first.

What counts as valid consent in each market, how long it lasts, and the right to withdraw it, are legal rules. They are written down for each market when Tend enters it. <!-- Level 2 channels: consent law -->

Tend requires opt-in for every template it sends. <!-- decided by the owner, 2026-10-12: opt-in for templates -->

Withdrawing consent stops what the person withdrew, from the very next send. <!-- consent withdrawal; settled 2026-10-22: the open conflicts -->
- "STOP" on WhatsApp stops every message the business starts on WhatsApp.
- "Stop contacting me", on any channel, stops every message the business starts, on every channel.
- A sentence that may be a withdrawal but is unclear, such as "please don't message me so much", is treated as a withdrawal until the person says otherwise. The AI may notice it; fixed code adds the entry. <!-- settled 2026-10-22: unclear withdrawal -->
- If the person writes in again later, that is a new conversation, and Tend may reply.

For example, Kavya ticked "send me updates on WhatsApp" at checkout. A month later she replies "STOP". Her "STOP" is saved as an arrival; the consent code adds a withdrawal for WhatsApp messages the business starts; the next update to her is refused at the send check.

### The preferred channel

The preferred channel matters only when Tend starts a message. For a reply, there is nothing to choose: the reply stays where the conversation is. <!-- L2 -->

For a customer or a prospect, the preferred channel is a channel the business may start on. For an employee, it is the work channel they chose. <!-- Level 2 channels: the preferred channel -->

It can be recorded and changed. A law or a channel's rule can override it. <!-- Level 2 channels: the preferred channel -->

When a person names their preferred channel in a message, the conversation manager records it. <!-- Level 2 channels: the preferred channel -->

The preferred channel is recorded separately from any conversation already going on. <!-- L2 -->

The preferred channel never moves a channel ahead of the start order above. Where more than one channel is available and allowed at the same step of the order, the preferred one is used first. <!-- closed item: preferred channel in the order -->

### Reaching an employee

Each employee has a stored preference for how they are reached. It ends after a set time, and it can be overridden. <!-- Level 2 channels: employee reachability -->

Email is the backup that is always there. It is tied to the employee's checked identity, and meeting invitations use it anyway. So reaching an employee never comes to a dead end. <!-- Level 2 channels: employee reachability -->

Which channel is each business's default for its staff is a setting. <!-- Level 2 channels: employee reachability -->

## A channel that is not connected

"All channels" does not mean every channel is built on day one. Two rules make up for that. <!-- Level 2 channels: missing channels -->

**Email is the usual route** when no other channel is available. It needs consent and an unsubscribe route. Without them, the business contact decides, or Tend waits. <!-- Level 2 channels: missing channels -->

**A channel with no connection yet is a gap, not a refusal.** The gap is shown, and recorded as a request to build that channel. Until then, email carries the message. <!-- Level 2 channels: missing channels; Section 7 additions: the gap -->

Tend never tells a business that a channel is "not supported". <!-- Level 2 channels: missing channels -->

## Who sees what

Tend sends only what the person may see. An investor sees the business result, not the operational detail inside it. <!-- I2 -->

Each role sees little by default. <!-- L4 -->

The full rule is in [the deciding file](deciding_and_permission.md). In short: <!-- T11 -->
- the product sets the fields each role and each kind of partner may see, narrow by default, because the law requires it;
- the business decides who holds each role, and which partner is engaged;
- the business may always narrow a range, and may widen it only inside a legal limit set by the product;
- anything outside that limit is refused, and the product team is told that a business needed it;
- a person who leaves loses access the same minute.

The partner sees only what its task needs: for Meera's parcel, the tracking number, the problem, and what the carrier is asked to do. It never sees Meera's private details beyond that. <!-- Level 2 channels: partner -->

The check before sending is where this is enforced. Only the fields the person may see stay in the message. <!-- IB-5; AC-2 -->

## Keeping sending safe

Changing which business a channel belongs to always needs a person. Moving a channel binding to another member needs the configurator, with a fresh sign-in, and a changed WhatsApp identifier suspends the binding until it is proved again. A channel connection proves the channel, not the person who is typing. <!-- Level 2 security: channel rebinding; Level 2 identity: channel binding -->

Each business has limits on how many messages it may send, and on cost. The values are set with each business's settings, with product defaults. <!-- Level 2 security: send caps -->

Sending can be switched off, for one business or for all, in an emergency. <!-- Level 2 security: kill switch -->

A business that abuses a channel can be stopped from sending. The thresholds are product settings, set at the technology stage from each channel's own limits. <!-- research: channel abuse -->

These limits are written in full in [the harness and compliance file](harness_and_compliance.md). The harness is the fixed code around the AI. <!-- Level 2 security: send caps -->

## What is recorded when Tend speaks

The communication layer keeps its own record of every message it sends. <!-- Section 7 writer table: what was sent -->

Each entry holds: <!-- Level 2 communication: the sent record -->
- the message;
- the reason;
- the evidence used;
- the next responsibility;
- the wait;
- the result.

The business does not have to read a chat history to know what Tend did. It sees the message, the reason, the evidence, who acts next, the wait, and the result. <!-- Level 2 communication: the sent record -->

A delivery receipt from a channel is recorded in the same record of what was sent. It is not a new version of the situation. <!-- decided by the owner, 2026-10-12: delivery receipt -->

A delivery receipt is saved in the sent record; that save is announced like any other save, and its notice wakes the situation worker. <!-- Section 8: delivery receipt; decided 2026-10-22: consent records -->

Three things are easy to confuse, and they stay apart: <!-- Level 2 communication: three distinctions -->
- a person saying "seen" does not mean the work is done;
- a message being delivered does not mean the person read or understood it;
- an answer is not always finished work.

What Tend does when a person does not act — and the seven kinds of silence — is written in [the time and people file](time_people_and_meetings.md). <!-- J5 -->

What a delivery receipt means on each channel is written in that channel's rule record when the channel is built. A delivery receipt shows delivery only, and never proves that the person understood the message; where a channel reports that a message was read, that is recorded as its own state. <!-- Level 2 communication: still to research -->

## What this area writes

- The situation worker writes each intent: what should be said, and to whom. It never sends. <!-- Section 7 writer table: communication intent -->
- The conversation manager makes each update decision. <!-- Section 7 writer table: update decision -->
- The conversation manager records each incoming message, and a preferred channel when a person names one. <!-- Section 7 writer table: incoming message; Level 2 channels: the preferred channel -->
- The communication layer records each message it sent, each delivery receipt, and each failure to deliver. <!-- Section 7 writer table: what was sent; IA-10 -->
- The product team writes and updates each channel's rule record. <!-- decided by the owner, 2026-10-12: rule record updated -->
- The business sets its language, its tone, its own wording, and any acknowledgement it wants. <!-- I1; Section 8 additions: wording -->
- The communication layer's fixed consent code writes the consent records. <!-- closed item: consent record writer; decided 2026-10-22: consent records -->

## What this responsibility refuses

Communicating does not: <!-- Level 2 communication: what it does not decide -->
- decide what is true;
- decide which source can be trusted;
- set the business's policy;
- grant authority or permission;
- decide the business's outcome;
- choose who owns a piece of human work;
- run timers or escalation;
- choose the technology that carries messages.

Tend never sends a tool log, or a fact with no source behind it. It sends no receipt-only reply, unless the business set one up. <!-- I1; Level 2 communication: tell the situation; Level 2 security: grounding -->

Tend never tells a business that a channel is "not supported". <!-- Level 2 channels: missing channels -->

The full list of what Tend refuses to own, with who owns each thing instead, is in [the non-responsibilities register](../checking/non_responsibilities_register.md). <!-- closed item: refusal register -->

## At a glance

| What Tend is responsible for | Who decides | What happens instead, or when it goes wrong |
|---|---|---|
| What should be said <!-- I7 --> | The situation worker writes the intent | The worker never sends <!-- INV-2 --> |
| Whether to tell the person now <!-- Section 8: update decision --> | The conversation manager | A run that saves no change sends nothing <!-- Level 2 communication: the investor ruling --> |
| Speaking only when it helps <!-- Level 2 communication: ten purposes --> | The ten purposes | No receipt-only reply, no tool log <!-- I1 --> |
| Holding back <!-- I3 --> | The decision chooses to wait; the conversation manager decides if the wait is told | Waiting is never forgetting <!-- Level 2 communication: waiting is not forgetting --> |
| Asking instead of acting <!-- I4 --> | The parts that need the answer | Never ask a customer to settle a dispute inside the business <!-- Level 2 communication: who to ask --> |
| Explaining enough, and no more <!-- I5 --> | The person's role, responsibility, and need | Never the AI's inner reasoning <!-- Level 2 communication: what an explanation holds --> |
| Honest doubt and disagreement <!-- I6 --> | The gathering and deciding parts settle them; communicating says them | No confidence score. No quiet choice of a source <!-- E3; Level 2 communication: conflict don'ts --> |
| Facts in a message <!-- Level 2 security: grounding --> | A tool result in the same run | No result: the fact is not sent <!-- Level 2 security: grounding --> |
| Sending <!-- IB-5 --> | The check before sending, and the permission check | Deny: nothing is sent; the worker proposes again or escalates <!-- AC-2 --> |
| Each channel's rules <!-- L1 --> | The rule record, kept by the product team | A rule change: the situations with a step pending on that channel are woken at once; the rest meet it at their next wake <!-- decided by the owner, 2026-10-12: rule record updated; decided 2026-10-22: platform rule wake --> |
| Reply or start <!-- L3 --> | The channel rules, applied by the communication layer in the decided order | No option: the business contact decides, or Tend waits <!-- Level 2 channels: a routing outcome --> |
| Consent <!-- L2 --> | Writing in, for replies; the channel's rules and the law, for starts; the consent records, written only by the communication layer's consent code | No consent, or a withdrawal: that channel is not used for a start <!-- Level 2 channels: the five checks; decided 2026-10-22: consent records --> |
| A missing channel <!-- Level 2 channels: missing channels --> | — | Email carries it; the gap is shown <!-- Level 2 channels: missing channels --> |
| Who sees what <!-- I2; L4 --> | The product's ranges; the business assigns roles | Outside the legal limit: refused and shown <!-- T11 --> |
| A failed send <!-- M4 --> | The tool layer retries; the worker decides what comes next | Undeliverable: recorded as evidence, then the worker decides <!-- IA-10 --> |

## Open questions, and what is set later

Nothing in this area is open.

**Values set later** — not open questions; the design holds whatever they are:
- each business's question limit, send limits, and cost limits; <!-- closed item: question limit; Level 2 security: send caps -->
- each market's rules, written down when Tend enters it:
  - what valid consent is, and how long it lasts;
  - how long each channel's window lasts, and what a start may use by default;
  - the legal minimum each role may see, and the widest a business may set;
  - what the market expects of a business's messages, their timing, and their languages; <!-- Level 2 channels: consent law; Level 2 channels: still open; Level 2 communication: still to research -->
- each channel's costs and the meaning of its receipts, written in its rule record when it is built; <!-- closed item: channel costs; Level 2 communication: still to research -->
- which channels are built, and in what order, and which kind of Telegram bot Tend uses — choices for the technology stage; <!-- Level 2 channels: still open; closed item: Telegram bot kind -->
- the thresholds for stopping a business that abuses a channel. <!-- research: channel abuse -->
