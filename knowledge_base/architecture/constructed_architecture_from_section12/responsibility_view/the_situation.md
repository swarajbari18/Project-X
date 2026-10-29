# The situation — what Tend is responsible for

This file answers one question: what must Tend be responsible for when it keeps track of operational problems?

Tend's job, as the project's first statement of the problem puts it, word for word:

> When a relevant event changes a business situation, Tend should understand the change, choose the correct next behaviour and keep the work moving until a safe outcome or a visible handoff is reached.

The job assumes one thing first: there is a problem already in motion — a situation — to keep moving.

Each rule here has one of these statuses:
- **Decided:** the project owner — the person designing Tend, not the business owner — said yes. On 2026-10-22 the project owner accepted every recommendation this design had made, and asked for the smaller questions inside them to be settled in the way that best fits; those points are Decided, and points settled that day say so. A rule marked as "the design's reading" was worked out from its sources rather than found written down; it is Decided too. <!-- decided by the owner, 2026-10-22 -->
- **Provisional:** a working choice that carries a condition for reopening it.
- **Rejected:** turned down on purpose, with the reason kept.
- **Deferred:** a value or a detail left, on purpose, to a later stage — **deferred to configuration** (each business or market sets it), **deferred to Level 3** (the stage that chooses the technology), or **deferred to implementation** (whoever builds it). The rule around it is Decided.

Two earlier status words, **To confirm** (written down, but not yet agreed by the project owner) and **Open** (no answer yet), are no longer used: since 2026-10-22, no rule here carries either.

A rule with no status word next to it is **Decided**: it has a source the project owner accepted. Every rule that is not Decided carries its word where it appears. In the rest of this file, "the owner" means the business owner.

<!-- Every rule below carries its code in a hidden note. The code's plain meaning, source, and status sit in code_index.md in this folder. -->

## One problem, one record

A situation is one operational problem: one order delay, one refund, one outreach. <!-- A1 -->

Tend keeps one versioned record for each situation. <!-- A1 --> Every change is a new version. The earlier versions stay as history; they are not current truth. Each version can be read on its own, without the ones before it. <!-- A1; Level 2 trust -->

Tend does not keep one record per customer. A customer can take part in many situations, and each keeps its own history. <!-- A1 -->

One situation is one problem, on one line of work toward one outcome. A delivery delay and a wrong item on the same order are two situations, not one. <!-- A2 -->

## The states behind the work

The owner sees each situation in one of eleven named states: <!-- states: display -->
- not started;
- preparing;
- message sent;
- waiting for reply;
- engaged;
- needs employee information;
- meeting requested;
- ready for owner;
- paused;
- closed;
- unable to proceed.

Behind those, a situation is running, waiting, blocked, or completed. <!-- states: liveness -->

Who moves a situation between the four is settled. The situation worker sets waiting or blocked. Only the conversation manager sets completed, and only when it concludes the conversation is over: no wait — a pause until one named thing happens — is open, and the last message has gone out. <!-- decided by the owner, 2026-10-12 -->

A tool can also hand a wait to the status-check service, the part that waits on an outside system while other work goes on. The tool states the wait in its result; this is called declaring it. The situation worker's fixed code saves the wait before the AI is told. <!-- construction record, entry 21: writer question; decided 2026-10-22: the wait a tool declares -->

## How situations relate

Three things link here. Each one alone is easy to misread.

- Situations link to each other through operational context: the same order, the same incident, or a follow-on problem. <!-- A3 -->
- Each person is linked to every situation they take part in, by who the person is, not by what the situations seem to be about. The link does not build a profile of the customer. <!-- A3; Level 2 understanding: identity, not context -->
- A person's journey is a view of their situations over time. Tend works it out when someone asks. It is never stored as a second truth. <!-- A10 -->

Tend never links two situations only because the same person is involved. <!-- A3 -->

The person link still matters. It lets Tend route a new message to the right one of that person's open situations. It answers "what is Priya's journey?". It finds earlier closed situations when they are linked explicitly. <!-- A3; A10 -->

When a person has only one open situation, an update attaches to it, unless the message names a different problem; then it is routed like any other. <!-- Level 2 understanding -->

Priya took part in an outreach situation, an order situation, and a refund situation. Tend links all three to Priya. It does not join them into one record. Each keeps its own history.

An outreach led to order 9912. The order links to a delivery-delay situation and to a wrong-item situation, because both are about that order. The owner finds both through the order. <!-- A3 -->

A link carries a type, such as "converted from campaign 4". <!-- A3 --> A wrong link can be removed, and the removal is recorded. <!-- Level 2 understanding: unlink -->

## One message, the right number of situations

- Messages about one problem attach to that situation, from any channel. <!-- A2 -->
- One message with two different asks becomes two situations. <!-- A4 -->
- The test for "the same problem": a message belongs to the same situation when one pass of gathering and deciding can handle it. Otherwise it is a different situation: linked when the two problems share something, such as an order; standing alone when they share nothing. <!-- Level 2 understanding: same-or-related test -->
- When it is unclear whether two messages belong together, Tend creates a separate situation and links it. It never merges them silently. <!-- B8 -->
- Linking never merges the records. What Tend knows about one situation is available when it works on the other. Each keeps its own decisions. <!-- A5 -->

| Case | What Tend does |
|------|----------------|
| An outreach was declined, and months later the owner starts a new outreach to the same person | A new situation, linked to the closed one. <!-- A7 --> |
| Priya replies to an outreach that is still unresolved | The same outreach situation. The reply is added to it. <!-- A7 --> |
| A delivery delay and a wrong item on the same order | Two situations, linked through the order. <!-- A2 --> |
| Campaign 4 led to order 9912 | A typed link: "converted from campaign 4". <!-- A3 --> |

## Closing, and reopening

A situation closes when its operational problem is finished. <!-- A6 -->

Closing records the outcome. A situation closes with one of these: <!-- A9; closed item: the closure outcomes list -->
- **resolved:** the problem was solved — the answer was given, or the step was done;
- **declined:** the person said no;
- **converted:** a possible customer bought;
- **handed to the owner:** the business owner took it over;
- **stopped by the owner:** the business stopped it;
- **cannot be done here:** no system and no person could answer;
- **withdrawn:** the person withdrew consent, and nothing more may be started;
- **no longer needed:** the situation changed, so the work was not needed.

Each business may name finer outcomes beneath these, in its settings.

A genuinely new problem is a new situation, linked to the closed one. <!-- A7 --> A customer replying on an old thread about a different problem gets a new situation, and it is linked to the old one.

A closed situation stays closed. <!-- A8 --> It is reopened only when its closure was wrong: the same problem was resolved too early, or it has come back. The original is reopened, and the reason is recorded.

There is no time limit on a reopen. For example, a customer can come back six months later because the same problem has returned. <!-- A8 -->

A closed situation is looked at only when a message refers to it explicitly. Tend does not use a closed situation as a bucket for "this customer wrote again". <!-- A8 -->

A closed situation informs a new one only through explicit links and relevance. An earlier decline informs the next outreach through a link. It is never merged. <!-- N2 -->

"Reopened" is a mark on the same record. It is not a new record. Its exact form is left to whoever builds the record (deferred to implementation); the rule above does not depend on it. <!-- A8 -->

Understanding the arrival (the conversation manager's one AI stage, which reads each new message before anything acts on it) decides whether a message reopens a situation. It reopens one only when the message refers to that closed situation explicitly, and continues the same unfinished problem. <!-- A8 -->

Understanding the arrival decides, and routing carries it out; the situation worker then marks the record reopened, with the reason, and sets it running. <!-- A8; Section 8: the states table -->

Before any important next step, Tend reads the latest record. A reopened run — a pass of the situation worker over a reopened situation — checks again every fact it relies on that may have changed, as any run does. <!-- A8; closed item: reopen check -->

Two examples of reopening: the customer says a refund was marked done but never arrived; the same delivery is still missing after it was marked resolved.

## What the record does not decide

Tend records how the situation went. It does not decide whether the customer buys, or keeps the refund. The customer and the market decide those. <!-- A9 -->

The customer's stated ask stays apart from the operational problem Tend infers. Both stay visible. For example, a customer asks "Where is my refund?" The stated ask is about the refund. The problem Tend infers is that the refund was marked done, but the money never arrived. <!-- A12 -->

The intended outcome is kept apart from the question asked and from the facts. <!-- Level 2 understanding -->

## Contacts

Every new contact starts with the relationship unknown. Tend refines it with evidence. An investor is not guessed from the first message. <!-- A11 -->

A supplied lead — a contact someone else gave the business — is not automatically a prospect or a customer (both defined below). Whether the first message came from the business or from the person does not decide the relationship. <!-- Level 2 journey -->

A lead is an entry point, not a stage. <!-- A13 --> A prospect is a person who may buy, who has never done business with the business. That stage begins when the business opens a sales situation for the person, or when the evidence shows a possible buying relationship. A customer has a paid order, as the business rule defines it. A returning customer is a customer who buys again later. <!-- A13 -->

The three stages — prospect, customer, and returning customer — are the same for every business. A paid order marks a customer. How a supplied lead is treated — whether it may open a situation by itself, or needs a review first — is set by each business (deferred to configuration). <!-- A13 -->

A follow-up needs a clear purpose and a clear target. Tend invents neither. The wait before a follow-up is set by the business, not by a universal timer. <!-- Level 2 journey: J7 -->

Tend is a coordinator, not a customer database. It may write entries into a business's own system when the business's rules allow it. Its own situation record is what it works from. <!-- Level 2 journey: J9 -->

A reopen does not, by itself, change the person's relationship. Their stage is set from evidence, as always. <!-- Level 2 journey: J9; closed item: reopen check -->

## A document nobody asked for

A business document can arrive without being asked for: a supplier's bill of materials, an invoice, a balance sheet request.

Understanding the arrival matches it to the open situation involving that sender, or to that person's record, and routing files it there. It is filed away so it can be found later. If nothing matches, a person sees it. No action is taken on the document alone. <!-- decided by the owner, 2026-10-10 -->

## What this responsibility refuses

Tend does not set prices, hire people, make financial decisions, or set company policy. These are outside Tend's scope. <!-- Level 1, out of scope -->

This file lists only the refusals of this area. The full list of what Tend refuses to own, with who owns each thing instead, is in [the non-responsibilities register](../checking/non_responsibilities_register.md). <!-- closed item: refusal register; settled 2026-10-22: the full refusal list -->

## At a glance

| What Tend is responsible for here | Takes in, hands on | Who decides | What happens when it fails |
|---|---|---|---|
| One versioned record per problem <!-- A1 --> | In: what arrives from any channel. Out: a new version per change | Tend writes it. The conversation manager sets completed | A wrong routing is split, linked, or rerouted once later evidence shows it. A merge joins two situations that are one problem; related situations stay linked <!-- B4 --> |
| Linking without merging <!-- A3; A5 --> | In: a shared order, incident, or follow-on. Out: a typed link | Tend, on evidence | A wrong link can be removed, and the removal is recorded <!-- Level 2 understanding: unlink --> |
| Closing a finished problem <!-- A6; A9 --> | Out: the recorded outcome | The conversation manager sets completed | A wrongly closed problem reopens with its reason <!-- A8 --> |
| Reopening only a wrongly closed problem <!-- A8 --> | In: a message that refers to the closed situation | Understanding the arrival decides, on a fixed list of signals; routing carries it out | A genuinely new problem is a new situation, linked to the old one <!-- A7 --> |
| Keeping the stated ask apart from the inferred problem <!-- A12 --> | In: what the person asked. Out: both, side by side | Tend writes both; the person may correct either | A correction is written as a new version; the old one stays in history |
| Knowing a contact from evidence <!-- A11; A13 --> | In: evidence about the person | The business sets how a supplied lead is treated | An unknown relationship stays unknown until evidence settles it |
| Filing an unsolicited document <!-- decided by the owner, 2026-10-10 --> | In: a document from outside | A person sees anything unmatched | Nothing is done on the document alone |
| Working out a person's journey on demand <!-- A10 --> | In: a request. Out: the view, worked out fresh | Tend works it out when asked | It is never stored as a second truth |
| Keeping each situation in a visible state <!-- states: liveness --> | Out: the owner's eleven states and the four behind them | The worker sets waiting or blocked. The conversation manager sets completed | A state no part may set is refused by the writer rules; a wait a tool declares is saved by the worker's fixed code |
