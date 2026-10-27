# Which responsibilities must Tend carry?

<!-- Plain-language layer. Every rule carries its code in a hidden comment, for agents to link and trace. Meanings and sources for every code are in code_index_section_6.md. Original Section 6 text is preserved in the construction record. -->

## Status

Working. Rewritten in plain language on 2026-10-08. Each rule was checked against Level 2, the research folder, the agent harness study, the Product Vision, and Level 1.

**Source tags:** each rule carries its source in a tag at its end. A rule from Level 2, Level 1, the Product Vision, the research folder, the harness study, the product design folder, or the software factory takes its status from that source. A rule tagged **architecture rule** is the architecture's own construction, and Section 10 records its status. A rule marked **Open** or **Provisional** is not decided.

**Open:** the knowledge base does not yet settle these. They are listed at the end.

**Provisional:** the rule is in use, but it may change.

**Level 2** means the answers in the Level 2 folder, which Swaraj wrote.

**Updated 2026-10-28.** Swaraj rejected the earlier picture of memory and knowledge, and the Level 2 folder now holds its new design ("how memory and knowledge works with the loops"). This section carries it through. The part is always called **memory and knowledge**, never just "memory". New rules cover: who a person is; how links are made; routing one message at a time per address; deciding on the newest version, by checking the work; memory and knowledge's own rules; and erasure. Changed rules cover: routing's inputs, the outreach's central situation, the owner's view of an outreach, memory and knowledge's older rules, how an MCP server joins, and the outreach walkthrough.

**Updated 2026-10-29: understanding comes first.** Swaraj: "The first thing should have been understanding where it would understand what the Diwali sale was about, and so in routing, when there is the retrieval thing, the retrieval would have been much simpler this time." The conversation manager now understands each arrival, and writes its **reading**, before it routes. Routing's candidates come from the reading, by exact values. The worker understands new content before it plans or decides. Memory and knowledge uses the business's own knowledge to help any step understand, and shows a step only the records inside its boundary. The routing queue is per person.
- New rules: C7 to C10, N36, N37.
- Changed rules: B5, B10, N19 to N23, N29 to N31, N34, N35.
- The Level 2 pages are the source: "how memory and knowledge works with the loops", corrected 29 October, and the understanding pages.

**Scope:** outreach, inquiry, order, logistics, refund, stakeholder, and unreliable external APIs.

---

## What this section decides

This section answers one question: what must Tend reliably do across operational problems?

It names outcomes, not software parts. Software parts are decided later, in Section 7.

From Level 1, word for word:

> When a relevant event changes a business situation, Tend should understand the change, choose the correct next behaviour and keep the work moving until a safe outcome or a visible handoff is reached.

The rules below turn this into specific duties. Some of them (such as the granted range) come from other Level 2 files, not from this sentence.

Terms used in this section:

- **The AI:** the AI that proposes the next step. It never makes a final decision alone.
- **The owner:** the business owner, the person who signed up for Tend.
- **Fixed code:** code that always makes the same check. It is not an AI's judgment.
- **A situation:** the record shown to the owner for one situation.
- **History:** the recorded history of one situation.
- **Completed:** the situation's word for a closed situation.
- **A run:** one pass of the loop on one situation.
- **Coverage:** another person temporarily does the work while the responsible person is away.
- **Assignment:** a person hands some of their power to someone else. Whether the configurator may assign is still open .
- **Tenant:** one business that uses Tend. Its data is kept apart from every other business's data.
- **Harness:** the fixed code around the AI. It runs the steps, checks each proposal, and saves each version.
- **Registry:** the list of a business's settings: its sources, channels, and values.

---

## How situations are linked

### One situation is one operational problem

A situation is one operational problem: one order delay, one refund, one outreach. Tend keeps one versioned record for each situation. <!-- A1 -->

Tend does not keep one record per customer. A customer can take part in many situations, and each one keeps its own history.

### Four layers

Read these four together. Each one alone is easy to misread.

- **Situation links.** Situations link to each other through operational context: the same order, the same incident, or a follow-on problem. <!-- A3 -->
- **Person link.** Each person is linked to every situation they take part in. This is a link. It is not a merged record. <!-- A3 -->
- **The person.** Each person is one anchor with its own person ID. Their WhatsApp number, email addresses and other channels point to that ID; a channel address is never the person. A new contact starts unknown. Who they are is deduced or asked as evidence gathers. No AI decides that two records are one person: an AI may suggest it, and fixed rules or a person decide. <!-- A14 -->
- **Person's journey.** A person's journey is a view of their situations over time. Tend works it out when someone asks. It is never stored as a separate truth. <!-- A10 -->

**Example.** Priya took part in an outreach situation, an order situation, and a refund situation. Tend links all three to Priya. It does not join them into one record. Each keeps its own history.

### Link by context, not by person alone

Tend does not link two situations only because the same person is involved. <!-- A3 -->

The person link still matters. Tend uses it to:
- route incoming messages to the right person's open situations;
- answer "what is Priya's journey?";
- find earlier closed situations, when they are linked explicitly.

- **Memory and knowledge creates and maintains the links.** A link is made when there is a signal. Three things count as a signal: the same number or incident code (the code an outside system gives one event, such as a hold at one hub) in typed fields of both situations, taken from an outside system's record or from a person's confirmed answer; an employee's word that the two are related; or a finding while gathering that ties them. A shared meaning alone ("these customers all describe the same flood") is not a signal: it is only proposed, and stays unresolved until a signal appears. An employee who may see both situations may remove a link, and the removal is recorded. This replaces the rule of 2026-10-09 that the situation worker accepts or denies each link. <!-- A15 -->

**Example of the right pattern.** An outreach led to order 9912. The order links to a delivery-delay situation and to a wrong-item situation, because both are about that order. The owner finds both through the order.

### Split, link, or merge

- One operational problem is one situation. Messages about it attach to that situation, from any channel. <!-- A2 -->
- Two different problems are two situations, linked for context. A delivery delay and a wrong item on the same order are two situations. <!-- A2, A5 -->
- A message with two different asks becomes two situations. <!-- A4 -->
- When it is unclear whether two messages belong together, Tend creates a separate situation and links it. It does not merge them silently. <!-- B8 -->
- Linking never merges the records. Context travels; each decision stays separate. <!-- A5 -->

| Case | What Tend does |
|------|----------------|
| An outreach was declined, and months later the owner starts a new outreach to the same person | A new situation, linked to the closed outreach. <!-- A7 --> |
| Priya replies to an outreach that is still unresolved | The same outreach situation. The reply is added to it. <!-- A7 --> |
| A delivery delay and a wrong item on the same order | Two situations, linked through the order. <!-- A2 --> |
| Campaign 4 led to order 9912 | A typed link, such as "converted from campaign 4." <!-- A3 --> |

### What Tend does not do

- Tend does not set prices, hire people, make financial decisions, or set company policy. Level 1 places these outside Tend's scope. <!-- Level 1, out of scope -->

### Closing and reopening

- A situation closes when its operational problem is finished. It can reopen only under the reopen rule below. <!-- A6 -->
- Closing records the outcome: for example declined, converted, handed to the owner, or stopped by the owner. The full list of outcomes is **Open**. <!-- A9, Q1 -->
- A new problem after a closed situation is a new situation, linked to the closed one. <!-- A7 -->
- **Reopen rule (decided, and Level 2).** A closed situation stays closed. It is reopened only when its closure was wrong: the same operational problem was resolved too early, or it has come back. The original is reopened, and the reason is recorded. Any other new problem is a new situation, linked to the closed one. <!-- A8 -->
- There is no time limit on a reopen. Level 2's example is a return after six months. <!-- A8 -->
- A closed situation is looked at only when the message refers to it explicitly. Tend does not use a closed situation as a general bucket for "this customer wrote again." <!-- A8 -->

Examples of reopening:
- The customer says a refund was marked done, but never arrived.
- The same delivery is still missing after it was marked resolved.

Example of a new situation: the customer replies on an old thread about a different problem. Tend creates a new situation and links it to the old one.

**Decided:** "reopened" is a mark on the same record. It is not a new record. Level 2 leaves the exact form open, and this choice does not change the rule above. <!-- A8 -->

**Settled:** the intake step decides whether a message reopens a situation, using the signals Level 2 lists. Before any important next step, the situation is read again. This includes a reopen. Level 2 does not say this for reopens, but the same rule covers them. <!-- A8; Section 9, D1 and D6 -->

### Facts about the history

- Tend records how the situation went. It does not decide whether the customer buys, or keeps the refund. <!-- A9 -->
- Tend keeps the customer's stated ask apart from the operational problem Tend infers. Both stay visible. <!-- A12 -->

### Contacts

- A new contact starts with the relationship unknown. Tend refines it with evidence. An investor is not guessed from the first message. <!-- A11 -->
- A **prospect** is a person who may buy. The stage begins when the business opens a sales situation for the person, or when the evidence shows a possible buying relationship. <!-- A13 -->
- A **customer** has a paid order, as the business rule defines it. A **returning customer** is a customer who buys again later. <!-- A13 -->
- A **lead** is an entry point, not a stage. <!-- A13 -->
- The three stages (prospect, customer, returning customer) are the same for every business. A paid order marks a customer (settled by Level 2). The rule for supplied leads is business configuration. <!-- A13, Q2 -->

### Business documents from outside

- A business document can arrive without being asked for, such as a supplier's bill of materials, an invoice, or a balance sheet request.
- The intake step matches it to the situation for that sender, or to the sender's record, and files it there. The document is linked to the business memory, so it can be found later.
- If nothing matches, a person sees it. No action is taken on the document alone. <!-- decided by you, 2026-10-10 -->

### What the owner sees

The owner sees each situation in one of these states:
not started, preparing, message sent, waiting for reply, engaged, needs employee information, meeting requested, ready for owner, paused, closed, or unable to proceed. <!-- A1 -->

Behind the scenes, a situation is running, waiting, blocked, or completed. <!-- H1 -->

---

## Routing incoming changes

<!-- Group B -->

- Tend receives changes from messages, instructions, systems, agents, and time. <!-- B1 -->
- Before it gathers any business information, Tend routes each change to the right situation, or creates a new one. <!-- B2 -->
- Routing has tiers. A clear match attaches or creates. A weak match means Tend asks the customer or the sender a question. Tend never guesses. For example, "any update?" from a customer with three open orders gets a question, not a guess. <!-- B3 -->
- When later evidence shows a routing was wrong, Tend splits, merges, or reroutes the situations. <!-- B4 -->
- The conversation manager understands each change before it routes it: it writes a reading of what the change asks, what it refers to, and which time it means (see Understanding the change). Routing then works from that reading. It uses short summaries of open situations, made of typed fields only. The full update of a situation, from its full record, comes after routing, for the situations routed to. Memory and knowledge gives the conversation manager a package at three moments: before the reading, after it, and before the routing check when the AI made the choice (see Memory and knowledge below). <!-- B5 -->
- A list of 30 people creates 30 situations, one per person, and one central situation linked to all of them. The central situation tracks the progress. Every update from a person's situation goes to it. The owner hears only what is significant. There is no separate board screen; the central situation is the one place that shows the progress. <!-- B6 -->
- The conversation manager records each incoming message with its platform reference. The platform keeps the original message. <!-- B7 -->
- When it is unclear whether two messages belong together, Tend prefers separate situations with a link, over a silent merge. <!-- B8 -->
- On a weak match, Tend records that a message may belong to a situation. It does not change that situation. <!-- B9 -->
- Messages from one person are routed one at a time, in order, whichever channel they come on. The channel address is first turned into the person ID, and the queue is keyed by that ID. If two messages from one person arrive one second apart, on one channel or on two, they are placed in order, and the second sees the situation the first created. <!-- B10 -->

Routing happens at two moments. On arrival, Tend identifies the person and understands the change. From what it understood, it finds the situations that could match, then attaches, creates, holds, or records the arrival as not work. Later, after new evidence, Tend splits, merges, or reroutes. <!-- B4; C7 -->

---

## Understanding the change

<!-- Group C -->

- Tend understands each change before it acts on it, routing included. Product Vision: "Tend should never take an action before understanding the situation." Level 2's order: preserve what arrived, build its candidate readings, then route, then update the model. <!-- C7 -->
- The conversation manager writes a **reading** of each arrival that carries words. It records:
  - what is asked, one problem or several;
  - what the arrival refers to, with each time word turned into a date or a range in the business's time zone, or kept as a small set;
  - what is only the sender's claim;
  - what is unknown;
  - whether it refers to earlier work;
  - its kind, if new;
  - whether it is work at all.

  The reading is an interpretation, never a fact or a conclusion. It is saved with the arrival in the situation's new version, so no later step reads the arrival again from scratch. <!-- C8 -->
- An arrival that is not work, such as a greeting or a thank-you with nothing asked, creates no situation. It is kept in the person's message history with its reading. <!-- C9 -->
- The situation worker understands new content before it plans or decides. That covers three cases: an arrival into a situation that already has content; a document; a free-text result. It places the new content in the full record: the asks it answers, what is now known, unknown or in conflict, and whether routing looks wrong. For a new situation, the conversation manager's reading is the first understanding. <!-- C10 -->
- Tend updates the routed situation with what the change adds, before it decides what to do. <!-- C1 -->
- Uncertainty and ambiguity are recorded. A guess is never stored as a fact. <!-- C2 -->
- Tend selects only the information that matters for this situation, and ignores the rest. <!-- C3 -->
- Tend keeps four things apart: what was observed, what was claimed, what Tend inferred, and what was decided. <!-- C4 -->
- Tend classes an unresolved point by what it blocks: which situation it belongs to, what the person wants, what information is needed, or who is responsible, which policy applies, whether the action is allowed, or the consequence. It does not ask anyone. Gathering asks for the smallest unresolved part. <!-- C5; Level 2: understanding does not ask the customer or an employee -->
- A reply sent is not an operational result. "Reply sent" does not mean "refund completed." <!-- C6 -->

---

## Gathering information

<!-- Group D -->

- Tend first identifies which information could change the next safe step. Gathering is purposeful, not exhaustive. <!-- D1 -->
- Tend knows which source holds each piece of information. A source can be a system or a person. <!-- D2 -->
- Tend keeps a map of where information lives. It does not assume one database has everything. <!-- D3 -->
- Retrieval follows the context. First Tend works out what the question means in this business. Then it chooses the sources that matter for this kind of claim. Then it puts the sources in priority order. The order weighs five things: how trusted the source is, how current it is, what the consequence is, what human involvement costs, and what unblocks the next safe decision. <!-- D4 -->
- Information can arrive gradually, and can change in the middle of an analysis. Tend updates its analysis when it does. <!-- D5 -->
- Tend calls a business capability when it is the right source, such as the carrier's tracking API or the ERP system. <!-- D6 -->
- Each gathered result is saved with its source pointer and time. Tend does not replace the ERP as the master record. <!-- D7 -->
- Before retrieval, Tend matches the question to a source. A source can be a system or a person. If no system and no person can answer, the answer is **capability-absent**: recorded honestly, not a failure, and not a guess. If a person can answer, Tend opens human work. <!-- D8 -->

**Example: the refund question.** The customer asks, "Where is my refund?" Could change the next step: whether the refund was started, the gateway status, the amount, the policy window. Does not matter yet: the full order history from 2022, marketing preferences.

**Example: a package with no source.** The customer asks for a package's status, but no shipping tool is connected and no person can answer. Tend does not answer from payment data. It records that the answer is capability-absent.

---

## Trust and evidence

<!-- Group E -->

- Each claim is a structured statement, with its source and its time. "The carrier says delivered" is not the same as "the customer received it." <!-- E1 -->
- Fixed code evaluates evidence by source and rules. The AI does not decide what is true. <!-- E2 -->
- Uncertainty is shown as evidence states, reasons, and unknowns. It is never a made-up number from the AI. <!-- E3 -->
- Conflicting information is detected and kept visible. <!-- E4 -->
- A conflict is resolved in this order:
  1. a fixed business or domain rule;
  2. a correction from the party that holds that record. A later valid observation counts only as a correction, as the next paragraph says;
  3. more evidence, when it could change the next step;
  4. a person, when no rule or evidence settles a material conflict.

  Tend never silently picks a side because a claim arrived last, came from a system, or looks plausible. A newer claim counts only when it is valid, as a correction. The business can set its own order for each claim type, or require a named person, a human approval, more evidence, or a bounded action. Until it does, the order above is the product default, and the owner confirms it. <!-- Level 2 conflict resolution --> A conflict stops only the action it affects. Other work continues. When it can, Tend takes a safe bounded step that the business policy allows. This applies to all conflicts, not only high-consequence ones. <!-- E5 -->
- Facts and assumptions are kept apart. An assumption is updated when evidence arrives. <!-- E6 -->
- Evidence from a fallback, or from a stale substitute, is marked stale or partial, with the reason. Irreversible steps fail closed. <!-- E7 -->
- What Tend may do depends on the evidence state and the consequence. The same conflict can block a refund while still allowing a status message. <!-- E8 -->
- A round counts as progress only when the situation's recorded state changed in one of five ways:
  - a claim's evidence changed;
  - a needed claim came from a source not yet asked in this start;
  - a wait was written, refreshed, or finished;
  - an outcome was declared;
  - a permission changed.

  The AI's own report of progress never counts. <!-- E9 -->

**Example: conflicting delivery claims.** The carrier says "delivered 14:05." The customer says "I don't have it." Tend records two claims and the conflict. Fixed rules weigh the sources and the consequence. Tend then investigates, asks the carrier, escalates, or sends an interim message, as the policy allows. The situation does not close as "delivered" while the conflict stands on a high-consequence path.

---

## Deciding the next step

<!-- Group F -->

- Tend selects the next step for the current situation. <!-- F1 -->
- The AI proposes intentions. Fixed code runs the timers and writes the state. <!-- F2 -->
- Tend keeps going inside its granted range, without asking the user at each step. <!-- F3 -->
- When there is no safe path, Tend stops safely. <!-- F4 -->
- Tend decides when there is enough information, relative to the policy and the consequence. It does not wait for perfect information. <!-- F5 -->
- Before any step with an effect, the permission checks below run on the AI's proposal. The AI cannot approve its own proposal. <!-- F6 -->
- Every decision is made on the newest version of the situation. If a newer version exists when the decision is checked, the decision is thrown away and made again. Just before any action that cannot be undone, the version is checked once more. <!-- F7 -->
- Deciding is checking the work. The decision is made with the work as first asked, word for word, the procedure, the plan, every result with its source, each claim's state, and new arrivals in front of it. It says, for each thing asked, whether it is answered, partly answered, or not yet, and points to saved evidence for each answer. Fixed code rejects an "answered" that points to no evidence from a source other than the AI. <!-- F8 -->

---

## Permission to act

<!-- Group G -->

- Tend acts only inside the range the business has granted. <!-- G1 -->
- Tend asks for approval when the action is outside the grant, or when the grant requires an approver. <!-- G2 -->
- Tend never widens a permission past what the business and the owning systems allow. It can only reduce access. <!-- G3 -->
- When Tend refuses, it refuses honestly, and says what the escalation path is. <!-- G4 -->
- The person who granted the range remains answerable for actions taken under it. <!-- G5 -->
- Rules that must always hold are enforced in code, below the business configuration. The business cannot switch them off. <!-- G6 -->
- Grants and registry writes are made only by the configurator's fixed tools. An AI agent at runtime cannot give itself more power than it was given. <!-- G7 -->
- The effective permission is the grant, intersected with the owning system's permission and the product rules. Tend never goes past the person who gave it the range. <!-- G8 -->
- Each request is linked to a verified person, through the link from that person to what they may do. It is never linked through channel text or AI extraction alone. **Decided:** a permission belongs to a verified person. A name or a phone number alone grants no permission. <!-- G9 -->
- A new business starts with a default set. Reading connected systems is allowed, and reading never sends anything outside on its own. Replies inside an open conversation are allowed. A person approves each time a record that a business system owns is changed, a conversation is started outside an existing grant, a promise or commitment is made, money is spent, or protected information is shown to someone outside the business. <!-- Decided -->
- An owner's clear instruction to use a list of people under stated rules can create a one-time grant for that instruction only. <!-- G7 -->
- A permission has a start and an end. It is valid only when it is used, and any past holder can be traced. <!-- G7 -->
- Who may see what follows the person's role and the partner's scope. The business may narrow a scope, and may widen it only within the legal limit. Anything outside the limit is refused. <!-- Level 2 channels -->

**Who configures.** The configurator is a role. A person holds it: the signup owner, or a person the owner assigns. That person works through the configurator's agent, which holds the fixed tools that write grants. <!-- G7, Q7 -->

**Decided:** the configurator may not pass its own configuration power to another person. Until that is decided, it may not. <!-- Q7 -->

---

## Coordination and time

<!-- Group H -->

- Tend keeps each situation alive through durable, versioned records. A restart does not lose Priya's history. <!-- H1 -->
- Each wait records seven things: the subject, the reason, the timing class (bounded, open, or date-based), the resume trigger, the release policy, the escalation path, and who can see it. <!-- H2 -->
- Waiting and blocked are different. Inside the configured bound, a stale carrier API is still a wait. Past the bound, Tend declares a failure. Blocked means no one is left to escalate to, and no safe next step is left. <!-- H3 -->
- A re-check can be triggered by a message, a system change, a human answer, an agent result, or time. <!-- H4 -->
- Tend prevents duplicated work by its structure. Two people do not both refund the same order. <!-- H5 -->
- After an interruption, Tend recovers work from the latest durable state. A worker crash continues the work. It does not restart it. <!-- H6 -->
- Nurture and follow-up continue the same situation when the rules allow. Follow-up is useful contact, not repeated outreach. <!-- H7 -->
- The **book of waits** lists every waiting situation and the change that will re-check it. No part of Tend checks on a fixed interval. A separate status-check service repeats a status check when a tool's own checks have not answered, and sends each result back to the situation. This is **Decided**. The working bound is five (decided 2026-10-10). The final number is configuration. <!-- H8 -->
- A situation version and its change are saved as one unit. Consumers never miss a save. <!-- H9 -->
- When a timer fires, Tend re-reads the latest version before any outgoing decision. A superseded wait sends nothing. <!-- H10 -->
- There are two clocks. The customer-facing clock pauses while the customer is released. The internal clock on the responsible person keeps running, with its own escalation. A customer is never left waiting because of an internal delay. <!-- H11 -->
- After the customer has the product, Tend waits the time the business chooses before it asks for feedback. The default wait is set by the business. The design sets no figure. <!-- H12 -->

---

## Communication

<!-- Group I -->

- Tend tells a person about a material change in the situation. It does not send "we received your message." A business may configure its own acknowledgement wording. <!-- I1 -->
- Tend sends only what the recipient may see. For example, an investor sees the business result, not internal operations detail. <!-- I2 -->
- Tend waits instead of messaging when a message would be unsupported, duplicative, unnecessary, misleading, outside the recipient's responsibility, or outside the business's authority. Premature and unsafe are the architecture's own additions. <!-- I3; Level 2 communication -->
- Tend asks when a reference or some information is missing. <!-- I4 -->
- Tend gathers only the information that could change the next safe step. It asks a person for information only when the answer could change that step. <!-- Level 2, gathering notes -->
- The depth of an explanation fits the person's role. An owner may see more than a customer. <!-- I5 -->
- When uncertainty or conflict exists, Tend says so honestly. <!-- I6 -->
- Tend records each communication intent on the situation. The communication layer shapes, checks, and sends it. The situation worker does not send. <!-- I7 -->

---

## Human collaboration

<!-- Group J -->

- When the next safe step needs a person, Tend makes that need explicit. <!-- J1 -->
- Tend decides what kind of involvement is needed. There are nine kinds: the person is the subject; the person provides information; the person confirms or acknowledges; the person authorises access or an action; the person approves a business decision; the person performs work; the person is answerable for the work; the person is consulted; the person is only informed. <!-- J2 -->
- Tend routes the work to the right person, role, queue, or partner. For example, stale tracking goes to the carrier's contact. <!-- J3 -->
- Each piece of human work has one responsible party at a time. That party can be a person, a role, a team, or a queue. <!-- J4 -->
- When a person does not act, Tend names the kind of silence before it takes the next step. There are seven kinds: not delivered; delivered but not acknowledged; acknowledged but no progress; rejected; unavailable; completed but not recorded; unnecessary because the situation changed. Silence is never treated as completion. The business's path may remind, wait, reassign, or escalate. <!-- J5 -->
- When a person answers, Tend records the result and returns to the decision loop. <!-- J6 -->
- An unavailable person is not the same as a person who does not respond. Coverage or assignment applies before Tend escalates. <!-- J7 -->
- Work is transferred with its full context. A notification is pending until the other person accepts it. <!-- J8 -->
- Before any irreversible action on transferred or covered work, Tend checks that the substitute has the permission. Coverage does not mean unlimited permission. <!-- J9 -->

---

## Meetings and outside partners

<!-- Group K -->

- A meeting is an invitation and a wait on people and a date. <!-- K1 -->
- Tend books a meeting only within eligible times, the calendar, and the intent that was actually expressed. <!-- K2 -->
- A cancellation, a missed meeting, and a reschedule are recorded as meeting changes. A no-show has a next step. <!-- K3 -->
- Failed meetings are counted for each situation and for each person. The person-level count escalates to a senior person, with the full history of that person's missed or moved meetings. <!-- Level 2, meetings notes -->
- Tend contacts an outside partner when escalation requires it, and only when the business policy allows partner contact. The partner receives only the scoped information the task needs. <!-- K4 -->

---

## Channels and visibility

<!-- Group L -->

- Tend knows each channel's rules: when it may start a message, when it may reply, the window, and the templates. <!-- L1 -->
- Consent and the preferred channel are recorded apart from the active conversation. Starting a new message is not replying in an open thread. <!-- L2 -->
- Tend replies in the current channel. Starting a message in another channel goes through the gated sequence. The communication layer owns the channel choice. <!-- L3 -->
- Visibility is narrow by default for each role. <!-- L4 -->

---

## Failure and recovery

<!-- Group M -->

- A failure is recorded as an audited change. It is never a fifth state of the situation. The situation stays running, waiting, blocked, or completed. <!-- M1 -->
- Tend declares a failure when a wait's bound is reached and the wait has not fired. The length of the bound is business configuration. No fixed number of days is the rule. <!-- M2 -->
- Failures are triaged in a fixed order. First, who is responsible. Then the consequence: a bad consequence is not handled casually, even when the severity is low. Then the severity tier. Then the promise at risk: how close Tend is to breaking an outward promise decides when the matter goes to a person. Not every small problem reaches the owner. <!-- M3 -->
- Retries happen in the tool layer, with bounded backoff. The AI never retries. <!-- M4 -->
- A service that stays down for a long time is not called again at once. The tool stops calling it and checks again later. <!-- M4 -->
- **Unknown outcome on an irreversible action:**
  - If the other side honours the same key, Tend may reuse that key, sparingly.
  - If not, the status-check service checks the status a bounded number of times: five, the working bound (decision 7), set in configuration. Tend itself never checks on a timer. It only receives the results. Then the case goes to waiting, tells the customer honestly, and keeps the rest of the situation moving.
  - Once the promised settle window has passed and the outcome is still unknown, Tend does not redo the action. It hands the case to a person with the full timeline.

  Level 2 gives this rule. Level 2 calls the outside party's promise the promised settle window. For Tend's own waits, the internal settle window is the business's service level for that wait, with a default the configurator can change. <!-- M5 -->
- When the automated path is used up, Tend escalates to a person. <!-- M6 -->

---

## Memory and knowledge

<!-- Group N -->

**Updated 2026-10-28.** Memory and knowledge is an agency within Tend: it sees the whole of one business, and its job is context engineering, not decision making. Swaraj: knowledge is situations, skill files and business rules linked together, with intelligent reasoning over them. The rules N18 to N35 come from the Level 2 design "how memory and knowledge works with the loops"; the older rules below them still hold.

- Memory and knowledge runs beside the loops of the conversation manager, the situation worker and the communication layer, on its own thread. It observes every part of every loop. Slow jobs, such as making links, updating indexes and learning, run behind and never block a loop. <!-- N18 -->
- Before each part of a loop runs, the loop waits for memory and knowledge's package: knowledge to use, or an explicit empty answer. The points are:
  - before the conversation manager's reading;
  - after the reading, with the candidates found from it;
  - before the routing check, when the AI made the choice;
  - before the worker understands new content;
  - before the worker plans;
  - before the worker's fixed checks of a plan or a decision, which lead to acting;
  - before every decision;
  - before a message is written.

   Memory and knowledge's AI part runs before every one of them. When a decision ends the run, no part follows, and nothing is awaited. <!-- N19 -->
- A package holds candidates (situations, orders, people) and context (lessons, tool forms, skills, business events, word meanings, advice). Each item carries its source, its time, its standing (established, someone's claim, in conflict, a guess, advice, the business's instruction, or past), whether the step needs it or it only helps, who may be told it, and a flag on text written outside the business. For candidates it says how many matched in all. It says what was looked for and not found. <!-- N20 -->
- Memory and knowledge presents; the step decides. It never chooses between candidates, chooses the next action, or says a claim is true. It may give advice, marked as advice, such as "this subject is unknown in this business". <!-- N20 -->
- Each step's written reasoning has sections fixed code can check: what it is considering (IDs, each presented in this run); what it still needs to know; its questions for memory and knowledge; and its references, each quoted exactly from its input. The conversation manager's reading adds its own sections (rule C8), each resolution citing the item that resolved it; its choice, when code cannot decide, names a presented candidate or none. The worker's understanding says what new content adds. Memory and knowledge reads these, and a step's questions are answered in the next package. <!-- N21 -->
- Memory and knowledge has two fixed parts, one for routing and one for the worker. Each fetches only by exact keys:
  - the sender's open situations;
  - a number in a typed field;
  - a listed word (one of the business's own words with a set meaning, such as "dispatch ready");
  - a business event or other named thing whose name or alias appears in the arrival (added 2026-10-29);
  - earlier readings of the sender's words, and what memory and knowledge presented earlier in this situation (added 2026-10-29);
  - the sender's situations holding a value the reading resolved (added 2026-10-29);
  - the procedure pinned to the situation; tools named in the plan; the situation's links;
  - the present time.

  Matching a stored name against the arrival's words is ordinary code; telling which meaning applies is not. Everything that needs judgment is done by its AI part. <!-- N22 -->
- Finding knowledge follows one pattern. The step says what it needs; memory and knowledge's retrieval capability decides how. Fixed code first limits the search. It keeps only this business. It keeps only records inside the step's boundary, while the business's own knowledge may come from anywhere in the business. It keeps the right kind, status, validity and version. And it uses the values the step understood (IDs, date ranges, kinds) as exact filters. Inside that, exact, keyword, meaning and link searches run in parallel, and each returns its own ranked list. Fixed code combines the lists by each item's position, removes duplicates, and sorts the rest again by how well each fits the need. Then a fixed final check removes anything replaced, out of date, retired, or outside the step's boundary, and keeps conflicts visible. Neighbouring context is added where it matters. The AI part may search again, up to a set number of rounds. What comes back is evidence, each item with its source. Ranks only order candidates; no threshold accepts or rejects anything. <!-- N23 -->
- Memory and knowledge does not store a business's orders. An order is kept only as a gathered result, in the situation that read it. An order no situation has read is not in memory and knowledge. Then memory and knowledge presents the tool that reads it, and the worker reads it. <!-- N24 -->
- A change reaches another situation in only three ways. One event that touches several situations is saved once and written into each. A worker may decide to send a claim to another situation: its code hands the claim to intake as an arrival for that situation, keyed so a repeat is dropped, and a count per pair of situations stops two workers sending to each other forever. A person's situation in an outreach sends each new version to its central situation automatically. A link itself never carries a change. <!-- N25 -->
- Skills, the product's and the business's, live in object storage, versioned, not in the code, so that no worker runs a different version from another. Procedures are kept with them. A run reads a skill's current version when the skill is first presented, and records the version in its trace. A procedure is pinned to each situation at the version current when the situation got its kind. <!-- N26 -->
- A business may write its own skills and procedures, fill product templates, and connect any MCP server. The configurator connects a server through a fixed configuration tool, never the AI. Its tool list is captured, versioned and hashed when connected, and a later change to it waits for the configurator's approval. Memory and knowledge presents the subset of tools each part needs. A step may use only a tool presented to it in this run, and every call passes the permission check. A business skill is guidance text: it cannot grant a permission or change a rule. <!-- N27 -->
- Memory and knowledge never calls outside. For a subject the business does not know, it says the subject is unknown, and presents the deep-research skill and the web tools. The worker establishes the subject. Memory and knowledge then keeps what was learned, with its sources, so the web is not searched again. <!-- N28 -->
- The present time, in the business's time zone, is in every package. A business event, such as a sale, is learned knowledge: its name and aliases, its dates, its sources, who may be told it, and when it is valid. An event mentioned in an arrival is presented before the conversation manager's reading, found by its name or alias; the first time it is mentioned, memory and knowledge's AI part searches the business's side of the whole business for it. Which year is meant is presented as advice, with reasons. Its dates may help any step understand and filter; they are told only to those who may be told them. <!-- N29 -->
- The conversation manager establishes, first, what an arrival means: its reading, an interpretation. Code establishes who sent it; the routing check establishes which situation it belongs to; everything the sender states stays the sender's claim. Swaraj: "whatever we get, the conversation manager gets, establishing it is first." The situation worker understands what new content changes, and establishes claims, by its evidence rules. Memory and knowledge establishes nothing. It keeps what was established, with its sources. <!-- N30 -->
- If no package arrives, the step waits a set time, then the work goes to a person. If the fixed part answers and the AI part does not, the package carries the fixed items and says so, and the step goes on. If that happens before the reading, any word the reading cannot resolve is marked unknown. If routing's choice could differ depending on that word, the arrival is put on hold with a held note, the sender is asked, and the meaning is never guessed. <!-- N31 -->
- Each package is recorded in the run's trace as references only: the filters used, the record IDs and versions presented, the skill versions, and why. Real runs can be replayed from these references. <!-- N32 -->
- Memory and knowledge's background parts are a link keeper, an indexer, a link finder, a learner, and a cleaner. None writes a situation record, except the cleaner carrying out a confirmed erasure. A cache may make reads faster, but never guards a decision: anything cached is checked against the newest version before it is presented. <!-- N33 -->
- Memory and knowledge reads the whole business. **Using is not showing.** To help a step understand, it may present the business's own knowledge from anywhere in the business (events and dates, words and aliases, products, procedures, lessons, business-level incidents), each item marked with who may be told it. Business knowledge comes from the business's side; a customer's words stay that customer's claim. As records to act on, it shows a step only those inside the step's boundary: every search for records starts there, set by fixed code, so nothing outside can rank, show, or hint. Level 2: "Tend may use a confidential source internally while sending only a limited description externally." Routing's boundary is the sender's own records. Another person's record is never used to shape a step's understanding. A worker sees its own situation in full. It sees another situation's typed fields, never its free text, only when the two share a person, or share a number that an outside system's record or the person's confirmed answer tied to this situation. A number outside the step's boundary is never presented, and nothing hints to the step that it exists. <!-- N34 -->
- Memory and knowledge revisits its own work at every point. It reads what it presented earlier, in this situation or for this sender's recent arrivals, against what has happened since. It says plainly when earlier advice was contradicted or has gone stale, and notes it for learning. Swaraj: "The memory has to revisit what it has done till now… and audit." <!-- N36 -->
- Routing's candidates come from the reading, by exact values: the sender's open situations holding what the reading resolved. When the reading says the arrival refers to a past purchase or to earlier work, routing also gets a small set of the sender's own closed situations that could be it (agreed on 2026-10-03): found first by the reading's exact values (an order number, a date range such as a sale's dates, a kind, the most recent first for "last time"), with description matched only inside what those values leave. Never anyone else's, and never a search across the business. A closed situation holding an object the reading identified is Level 2's reopen case. Routing never searches a person's past on the message's raw words, before the message is understood. Code decides when it can: not work, no candidate, several asks, or one candidate that holds a number the sender wrote, or that is the sender's only open situation of the reading's kind holding what the reading resolved (Level 2's "hard signal"). The AI makes the choice only when code cannot. An ambiguous result means ask, not a bigger search. <!-- N37 -->
- Memory and knowledge's AI part adds an AI call at each point, so one new customer message costs between 10 and 23 AI calls before the first reply (10 to 20 before the conversation manager's reading was added on 2026-10-29). The background jobs never add to a customer's wait. Every limit (results kept per search, search rounds, sends per pair, the incident window, how long a loop waits) is configuration, with a product default. <!-- N35 -->
- Tend gives each decision step only the knowledge it needs, not everything memory and knowledge holds. <!-- N1 -->
- Closed situations inform new ones only through explicit links and relevance. An earlier decline informs the next outreach through a link. It is never merged. <!-- N2 -->
- Earlier conversations can give eight kinds of influence: a direct current claim, a reference to an earlier situation, a local vocabulary meaning, an unresolved question, a previous failed attempt, a reusable procedural lesson, a human preference or communication convention, and evidence that a current reading may be wrong. They are not all placed in context in the same way. <!-- Level 2 prior conversations -->
- Tend learns how to operate better in one business. It never changes rules: tool arguments may change, a refund policy may not. <!-- N3 -->
- Tend keeps the experience of what happened, so that it can be recovered later. <!-- N4 -->
- Learned knowledge is linked to situations as a graph of references. <!-- N5 -->
- Traces from work runs and configurator sessions are recorded for memory and knowledge, asynchronously. Recording a trace does not switch learning on. <!-- N6 -->
- The business can switch automatic learning off, or require a person to validate each lesson. <!-- N6 -->
- Candidate lessons come from external failure signals, not from self-reflection alone. <!-- N7 -->
- Before a lesson is proposed, the failure is diagnosed into one of eleven categories: misunderstanding; vocabulary or entity resolution failure; missing information; wrong source selection; wrong tool selection; invalid tool arguments; policy interpretation failure; authority confusion; reasoning failure; communication failure; and handoff or coordination failure. The learning loop runs: experience, observed outcome or correction, failure diagnosis, candidate lesson, activation or manual check (set by configuration), then retrieval and monitoring. <!-- Level 2 learning from mistakes -->
- A new lesson is matched against existing claims. Level 2 lists ten kinds of update: added, merged, refined, superseded, narrowed, appended as an exception, kept as a conflict, rejected, marked stale, and no-op. The same meaning in different words does not create a duplicate. Level 2 gives three rules: an event is appended; a current procedural lesson may get a new version; an exception may sit beside the general lesson it qualifies. The full list of which operations each memory type allows is **Open**. An ambiguous match never overwrites silently. <!-- N8 -->
- A new claim is matched by its structure, not by its wording: business scope, subject, relation type, object or value type, process or capability, applicable conditions, and qualifiers. Similar wording alone never makes a match. Whether the identity matches, whether the observation supports the claim, whether the claim is current, whether it applies to the scope, and whether it is safe to activate are judged separately. <!-- Level 2 reconciliation -->
- Each learned item has a lifecycle: active, stale, superseded, conflicting, retired, or unresolved. <!-- N9 -->
- Each memory item records its identity, memory type, business and process scope, claim or content, conditions it applies under, source and evidence references, when it was observed, when it is valid (if known), lifecycle status, version relationships, how far it may influence decisions, and why it was created or changed. <!-- Level 2 memory store -->
- Automatic learning is on by default. The business can turn it off, or require a person to check each lesson. With learning off, traces are kept for product evaluation, but learned memory does not affect future behaviour. In automatic mode, evaluation observes and reports the effect after the lesson is in use. In manual mode, evaluation can be part of the approval before the lesson is used. <!-- N10; Level 2 learning -->
- Evaluation looks for fewer repeated tool errors, fewer repeated misunderstandings, fewer unnecessary questions, better source selection, fewer stale-memory uses, fewer policy or authority conflicts, correct use of current information, less human correction, and no rise in unsafe or irreversible mistakes. Replay covers the failed situation, similar situations, situations where the lesson should not apply, and situations where a formal rule conflicts with the lesson. A lesson that prevents one failure by blocking valid work is not an improvement. <!-- Level 2 learning -->
- A lesson that causes regressions can be reversed. Tend stops retrieving it, marks it stale or rejected, restores the previous version, identifies the situations it influenced, and explains the change. <!-- Level 2 learning -->
- A lesson that blocks valid work is not an improvement. <!-- architecture rule -->
- Semantic similarity only proposes candidates. It never decides identity, supersession, or truth. <!-- Level 2, memory notes -->
- Hard filters come first. Memory with the wrong business, role, process, capability version, validity period, permission scope, status, or version is excluded before any similarity ranking. Similarity, recency, and usefulness only rank what is left. <!-- Level 2 retrieval -->
- There is no universal expiry time. Whether a memory is current is decided for each decision. Memory carries its observation time, its validity conditions, its process, and its version. When currentness cannot be shown, the memory is treated as provisional, stale, or unresolved, and current information is gathered when the decision needs it. <!-- Level 2 currentness -->
- Knowledge is served from a context need. The router never scans all situations; every search is limited first by fixed code. <!-- N11 -->
- The context need has ten parts: the current phase, the objective, the possible next behaviours, what is known, unknown, and conflicting, the relevant entities, the tools and capabilities under consideration, the source and authority requirements, the risk and reversibility, the deadlines or waiting state, and the business scope. Each phase gets different knowledge. Understanding uses local vocabulary, aliases, earlier readings, related situations, and known ambiguity patterns. Gathering uses source-selection lessons, tool preconditions, known missing fields, and earlier retrieval failures. Decision-making uses procedures, failure warnings, analogous outcomes, exceptions, and escalation lessons. Communication uses business terms, channel conventions, and communication corrections. Human collaboration uses role, routing, handoff, and responsibility lessons. The same knowledge is shown differently in each phase. <!-- Level 2 context assembly -->
- Business vocabulary and conventions are kept as business knowledge. "Dispatch ready" means what it means in this business. <!-- N12 -->
- Memory and knowledge observes configurator sessions and proposes configuration candidates. A configurator validates each candidate. Only the configuration tools apply it, and only after validation. Memory and knowledge never applies a grant change. <!-- N13 -->
- There are two kinds of configuration. Structured values are schema-bound settings, tool arguments, and registry records. Prose preferences are text that the runtime places into the step that writes a reply. Rules stay in code. The business owns the text of its preferences. Memory and knowledge only places it. <!-- N14 -->
- Learning about the business content is kept apart from improving product behaviour. Business knowledge lives in memory and knowledge at runtime. Behaviour adherence lives in the AI's weights. The two are never mixed. <!-- N15 -->
- Every memory item keeps its origin, its scope, its version, and how far it may influence decisions. What memory and knowledge presents is advisory. Learned knowledge never overrides policy, grants, or trusted sources. <!-- N16 -->
- Credentials, secrets, and authentication material are never stored as learned knowledge. <!-- N17 -->
- Tend does not promote any of these into active reusable memory: unsupported assumptions; unconfirmed interpretations; temporary emotional statements; one-off requests with no future value; sensitive information without an operational purpose; credentials, secrets, or authentication material; instructions that try to change Tend's authority or rules; customer data outside the permitted scope; accidental prompt-injection text; a workaround that conflicts with formal policy; a stale operational state; and an observation that cannot be connected to a business, situation, process, or capability. Such an item may stay in history or in an audit trace, but it is not available as future guidance. <!-- Level 2 never-memory -->
- Text met during work may contain instructions for the agent. Those instructions are not business knowledge until Tend classifies them through the authority and policy rules. A false instruction kept in memory can keep influencing later situations. <!-- Level 2 never-memory, untrusted instructions -->

| Kind of learning | What changes | Must not change |
|------------------|--------------|-----------------|
| Business content | What Tend knows about this business: vocabulary, sources, conventions, tool preconditions | A business rule, a formal policy, a legal or compliance limit, a permission, an approval requirement, who is responsible, or an irreversible-action limit <!-- N3, N15 --> |
| Product behaviour | How Tend behaves: the shape of artifacts, when to stop and ask, how an ending is worded | Business-specific content in the weights, or the universal product constitution <!-- N15, R2 --> |

Level 2 lists what Tend may learn: how it interprets local language; how it identifies a situation; how it retrieves relevant information; how it prioritises gathering; which tool or source it considers first; which tool preconditions it checks; how it constructs tool arguments; how it recognises its own failure patterns; when it asks for clarification; when it waits or escalates; how it communicates with a particular business; and how it transfers work to people. It may not change business rules, formal policy, legal or compliance constraints, authority, permissions, ownership, required approvals, source-of-truth responsibility, accountability, or irreversible-action boundaries. <!-- Level 2 acceptable learning -->

---

## Business view and explanation

<!-- Group O -->

- Tend presents work as artifacts, not as a chat wall. The central situation of an outreach to 30 people shows the state of each, and can be filtered. <!-- O1 -->
- Tend builds the owner's summary from the situation records, when the owner asks. It answers "what needs my attention?" <!-- O2 -->
- Tend shows the owner what needs them, in three classes: decisions only they can make, deadlines or notices that put the business at risk, and escalations that have drifted past everyone assigned. For example, a chargeback window that is about to close. A change that changes the business's next decision can also reach the owner at once. <!-- O3 -->
- Tend explains a recommendation, an action, or a failure when the reason affects trust, responsibility, safety, or the next action (Section 8). Otherwise it explains when someone asks. For example, "why did Tend escalate Priya?" must have an answer. <!-- O4 -->
- Tend can rebuild a finished situation for audit and replay. <!-- O5 -->
- Tend shows system health separately from business work. The builder's view and the owner's view are different. <!-- O6 -->
- Tend records every consequential action: what was done, the evidence used, the grant it ran under, why it ran, and the outcome. The person or part that performs an action writes its record. A step is not finished until its record is written. Each record gets three tags: a run number, a situation number, and a version number. Where the audit is stored is a later technical decision. <!-- O7 -->
- **Decided on 2026-10-09 (recorded; to confirm).** No separate checker checks the records. If a record write fails, the write is retried. Level 2 names no checker. <!-- O7 -->
- Tend's observer emits observation changes on the same channel as everything else: probe results, drift signals, and breaks of the completion rules. <!-- O8 -->
- The owner sees the snapshot of the business in business terms: prospects (how many are waiting, engaged, and close to buying); customers (how many, and how many are new this period); order and delivery state (stuck orders, late deliveries); risk (at-risk customers, from a fixed rule base, with AI suggestions that land on a fixed rule); deadlines and obligations; and what needs the owner. The business-value view shows situations solved, the impact of the work, and money saved. The owner never sees uptime or message counts. Every figure drills down to the situation it came from. <!-- O9; Level 2 snapshot and business-value view -->
- Tend records a "capability-absent" conclusion only when no system and no person can serve the request. Otherwise the request is human work. The honest answer to the customer, and the product signal, sit outside failure handling. <!-- O10 -->

## Business capabilities

<!-- Group P -->

- Tend coordinates through business capabilities, without owning the external records. Tend keeps a reference to each contact. The business owns its contact data. A contact provider holds the copy it manages. <!-- P1 -->
- When a capability is missing, Tend says so honestly and shows what would fix it. For example: "connect the contact provider, or provide an email." <!-- P2 -->
- Tend invokes a capability only when the grant and the rules allow it. For example, no refund API call without the grant. <!-- P3 -->

---

## Configuration and change

<!-- Group Q -->

- Business settings are kept in a typed registry: product schemas, business values, and validation. A setting is a record, not free text. <!-- Q1 -->
- A new system or channel enters through a catalogue lifecycle: request, evaluate, author, contract, validate, test, enable, monitor, retire. A business policy follows its own lifecycle: draft, validate, activate, version, replace or expire, retire. An MCP server the business connects itself joins through the configurator's fixed tool instead, as the memory and knowledge rules below say. <!-- Q2 -->
- When two business policies conflict, or one expires, the order is: the active policy; then the business's fallback; then the product's safe default; then a person or a stop. Any use of a fallback is shown to the business. When two versions of the same policy would both apply, the version the business activated most recently applies, and the conflict is shown to the business. Call (not yet confirmed). A policy that expires is a time event that wakes the situation. <!-- architecture rule, approved; Level 2 growth and policies -->
- Tend follows four kinds of change:
  - Facts are live. They update the situations that use them.
  - Platform rules are live. When they change, the situation re-checks what is allowed now. Only a platform-rule change re-checks open situations. A business-setting change does not. Both points were decided on 2026-10-09 and applied on 2026-10-10. Level 2 does not say what wakes a situation after a rule change, so this is the design's answer.
  - Grants are live. A grant must be valid at the moment it is used. A revoked grant stops every open situation at once, even one that keeps its old policy version. <!-- Level 2 growth and policies -->
  - Business policies and workflows are fixed when a situation opens. Each situation records the version of each one that governs it. A change applies from now on, and the owner is told about it. Each open situation on the old version gets a notice and a re-check wait with a deadline. The owner is asked whether to keep the old version or migrate it. If the deadline passes with no answer, the situation stays on the old version, and the owner is asked again. Call (not yet confirmed): nothing is forced. Nothing is retroactive, silent, or forced. <!-- Q3; Level 2 growth and policies -->
- Missing or unsupported configuration is shown as a visible gap. It is never refused silently. <!-- Q4 -->
- If a setting needs a change to the core product, the setting was put in the wrong place. <!-- Q5 -->

---

## Product improvement

<!-- Group R -->

- Traces kept for product improvement are separate from memory and knowledge. <!-- R1 -->
- Prompt optimisation is limited to the memory-owned assembly templates. The product constitution stays human-edited. <!-- R2 -->
- Behaviour adherence improves from verified traces. Business rules are never placed in AI weights. <!-- R3 -->

---

## Harness control

<!-- Group S -->

These rules are the architecture's own construction, drawn from the harness study. Where a rule is not stated word for word in the knowledge base, the code index says so. These obligations are enforced at several parts, not in one place. Each run of a situation runs these steps in order:

Each run runs these steps in order:

- **TRIGGER:** a change or a timer starts the run.
- **RECOVER:** an earlier run that was cut short is finished first.
- **PROPOSE:** the AI suggests the next step.
- **VALIDATE:** fixed code checks the suggestion before anything runs.
- **EXECUTE:** fixed code runs one path for that kind of step.
- **UPDATE:** the new version of the situation is written.
- **REST:** fixed code decides whether the run stops or needs another round.

A repeated change is dropped before PROPOSE. <!-- S1, S12 -->

- Every start ends in an honest rest. <!-- S1 -->
- VALIDATE checks the AI's proposal before anything runs. It checks the shape and the allowed behaviour. It also checks the completion rules: a situation cannot close with an open question, and a wait cannot end without its release rule being honoured. Invalid output never runs. <!-- S2 -->
- EXECUTE runs one fixed code path for each kind of step. There is no ad hoc tool loop. <!-- S3 -->
- A save either happens completely or not at all. A save that would leave the situation unsafe is blocked by the structure. <!-- S4 -->
- A situation change and its change are saved together. <!-- S5 -->
- REST or another round is decided by the five progress reasons only. The AI does not decide to continue. <!-- S6 -->
- Before an irreversible side effect, Tend writes its intent first. The audit record comes before money moves. <!-- S7 -->
- Tools return structured evidence only. The worker interprets the evidence. <!-- S8 -->
- Before an irreversible action, Tend checks the situation for an earlier attempt. This check complements the permission check. It does not replace it. <!-- S9 -->
- Timer triggers go to the situation only. <!-- S10 -->
- AI output is data. It is checked against a schema and is never treated as instructions. Injected text cannot change the rules. <!-- S11 -->
- Repeated changes are dropped by version or change ID, so duplicated delivery is harmless. <!-- S12 -->

---

## Permission checks

<!-- Group T. T10 is not used. The group runs T1 to T9, then T11. -->

- Before any effect, Tend runs a policy check. The answer is **Allow**, **Deny**, or **StepUp**. StepUp means a person must approve. A read that discloses information is checked the same way, because a read can be a disclosure. <!-- T2 -->
- A run's identity is set once, from verified identity. It is never taken from message text, links, headers, or tool arguments. <!-- T1 -->
- At decision time, Tend checks the effective permission: the grant, the system's permission, and the product rules together. <!-- T3 -->
- A tool never starts before its permission is confirmed. <!-- T4 -->
- The trusted permission store is read at the moment of the check. A cached copy never decides. <!-- T5 -->
- Permission is checked again at each action within a run, so a revoked grant stops the next send or call. <!-- T6 -->
- A StepUp goes through a fixed approval tool and the communication layer. The AI does not hold approval state. <!-- T7 -->
- Grant and registry writes are made only by the configurator's fixed tools. <!-- T8 -->
- Every decision and action is written to an append-only audit record. The record never contains secrets. <!-- T9 -->
- **Who may see each field.** The product sets the range of fields each role may see. A solo owner sees the whole business. Once a second role exists, each role's default narrows, as the law requires. The business decides which person holds which role. The business may narrow a range, or widen it only inside the legal white-list. Anything outside the white-list is refused and shown as a product signal, never silently granted. An employee who leaves the business loses access the same minute. <!-- T11 -->

**Example: the fetch file tool.** A business has a file that only some people may see, such as the current year's balance sheet. A customer asks Tend about it. The AI calls one tool, `fetch_file`. The AI has no separate approval tool. Inside the tool, fixed code checks whether the file needs approval, and runs the approval if it does. The tool then returns one of three results: the file, with a summary; a denial, saying the request is behind authorisation; or a failed approval, because it timed out. The AI then decides what to say next. It never decides whether the file is released. <!-- T2, T4 -->

Why this shape: if the AI were only told "do not release this file without approval," a mistake or a prompt injected by a customer could make it ignore that instruction. A rule that must always hold belongs in the code of the tool.

---

## Compliance and security

<!-- Group U -->

- Tenant data is kept mechanically separate in every store, cache, key, index, log, and AI call. One business never sees another business's data. Every business gets its own store. There is no free plan. When a tenant is deleted, no files, keys, vectors or prompt logs for it remain anywhere. <!-- U1 -->
- Where data is stored differs by market. The per-market legal values, such as consent durations, deletion windows, and the audit retention period, are enumerated when a market is entered, as Level 2 says. Audit records keep a reference, not personal data. A market is not entered until its values are set. <!-- Level 2 compliance notes; architecture rule for the entry step -->
- Fields from connected systems are untrusted input. Only allowed fields enter the AI's prompt. <!-- U2 -->
- Compliance rules from law, platform, and buyer are checked at configured checkpoints. <!-- U3 -->
- Kill switches stop a tool, a send, or a provider, per shop or globally. They work without a code change. <!-- U4 -->
- The tool catalogue is versioned and checked for unexpected change before a version is used. No tool is registered at runtime. A business's MCP server joins only through the configurator's fixed tool, as the memory and knowledge rules say. <!-- U5 -->
- Nothing is erased in normal work: knowledge is retired, superseded or marked stale. When a customer asks to be erased, or the law otherwise requires it, only the erasure tool erases. The AI may propose it; the tool's confirmation rule asks the owner or the configurator, and erases only after their yes. The erasure then reaches every place the data lives, situation records included, which are otherwise never rewritten. A record that an erasure happened is kept, without the erased data. <!-- U7 -->
- The T-A and T-B release checks must pass before release. A skipped test counts as a failed suite. <!-- U6 -->

---

## What Tend does not decide

| Not Tend's job | Who decides or holds it |
|----------------|-------------------------|
| Business goals, strategy, and unlimited prospecting | The business, and external agents |
| Canonical orders, payments, and inventory | The business's systems |
| Canonical messages on channels | The communication platforms |
| Whether the customer buys, likes the product, or keeps a refund | The customer and the market |
| Refund policy thresholds | The business configuration |
| The carrier's internal investigation result | The carrier |
| User authentication | The identity provider |
| What counts as legal consent in each market | Compliance and the law |
| A silent grant or policy change from memory and knowledge's observation alone | The configurator and the registry |
| Business-specific rules placed into AI weights | Business content stays in memory and knowledge |
| Universal or stage prompt constitution edits by an optimiser | A person, and the assembly templates only |
| The cache as a permission source at enforcement | The trusted permission store only |
| A single control module that owns both the loop and the grants | The loop and the permission checks, each at its own checks |

---

## Walkthroughs

### Walkthrough 1: Priya's business-directed outreach <!-- CASE-1 -->

- The owner gives a list of leads. Tend creates one situation per person, and one central situation linked to all of them. <!-- B1, B6, A1, G1 -->
- Tend builds a profile and a draft. <!-- D1–D6, C1, F1, N1 -->
- There is no email address. Tend says so honestly, asks for it, and waits. <!-- D6, P2, I4, H2, O1 -->
- Tend sends the message and nurtures the contact. <!-- I1, L1–L3, H2, H7 -->
- Priya replies or declines. Tend updates the situation and closes it when it is finished. Each update also reaches the central situation; the owner hears it only if it is significant, such as Priya asking for a meeting. <!-- B2, C1, F1, H7, J1, A6, A9, B6, N25 -->
- A second outreach comes later. It is a new situation, linked to the first. <!-- A7, A3, N2, N5 -->

### Walkthrough 2: Inquiry, order, delay, and a refund with an unknown gateway outcome <!-- CASE-2 -->

Many situations, one person, one linked graph:

| Change | Situation |
|-------|-----------|
| A product inquiry | An inquiry situation | <!-- B2, A1, A10 -->
| An order is placed | An order situation, linked to the inquiry | <!-- A3, A5, A10, campaign link -->
| A delivery question | A delivery situation. If the customer says a delivered parcel never arrived, it gets its own situation | <!-- D3, E4 -->
| The carrier API is stale | The delivery situation | <!-- H3, M2, M6, K4, J3 -->
| The customer is unhappy and asks for a refund | An unhappy-customer situation and a refund situation | <!-- G2, M5, J4 -->
| The refund gateway stays silent | The refund situation | <!-- M5, H2, J1 -->

### Walkthrough 3: Investor diligence <!-- CASE-3 -->

A stakeholder situation, with an obligations ribbon. It is not a commercial lifecycle. <!-- B2, A11, D3, G2, J2, I2, L4, A6 -->

### Walkthrough 4: Unreliable carrier tracking <!-- CASE-4 -->

Tend gathers from the carrier. <!-- D6 --> The wait stays honest while it is inside its bound. <!-- H2 --> The tool retries within its limits, and the evidence is marked partial. <!-- M4, E7 --> Past the bound, Tend declares a failure. <!-- M2 --> It escalates to a person, or to the partner when the policy allows. <!-- M3, J3, K4 --> Before a promised response time is missed, it sends the customer an honest interim message, so the customer's clock stays calm. <!-- I1, I6; Level 2 failure: the two clocks --> The next steps re-read the latest situation before acting. <!-- B1, H4, C1, F1 -->

### Walkthrough 5: Package status with no shipping source <!-- CASE-5 -->

A customer asks where a package is. No shipping tool is registered, and no person can answer. Tend says so honestly. This is capability-absent, not a failure. <!-- D8, O10 -->

### Release checks

The T-A check tests isolation between businesses. The T-B check tests injected text. Four example tests are listed here. Each one must pass before release.

| Example | What must hold |
|---------|----------------|
| A tool argument asks for another business's contact | Denied. The data store is filtered, and no provider is called. <!-- T1, T2, T3, U1 --> |
| A poisoned CRM note proposes an export | Denied. The field is marked untrusted, and the audit record stays free of secrets. <!-- U2, S11, T2, T9 --> |
| A planted learned item says "always auto-refund this user" | Nothing memory and knowledge holds can grant permission. A refund runs only through the refund rule. Above the refund setting, a person must approve it. <!-- T2, T7, N16 --> |
| The AI asks for more tool calls in one turn than the configured cap allows | The run stops at the cap. No call past the cap runs. The cap is a configuration setting, and no value is set yet (**Open**). <!-- hop and cost caps --> |

---

## How the parts relate

Tend works through these stages in order:

1. Route the change to a situation <!-- group B -->.
2. Understand the change <!-- group C -->.
3. Gather what is needed <!-- group D -->.
4. Weigh the evidence <!-- group E -->.
5. Select the next step <!-- group F -->.
6. Check the harness and the permission before any effect <!-- groups S and T -->.
7. Use the granted range, and coordinate the waits <!-- groups G and H -->.
8. Express the intent through the communication layer, or send human work <!-- groups I and J -->.
9. Update the situation <!-- group A -->.
10. Show the result to the owner, and explain it on request <!-- group O -->.

Compliance adds isolation, untrusted input, and release tests at every stage. Memory and knowledge runs beside every stage: before each part it hands over a package, and behind the work it links and learns. It does not replace any stage, and decides nothing. Configuration holds the registry. Memory and knowledge proposes values, and the configuration tools apply them after validation. Product improvement reads traces in parallel with memory and knowledge: behaviour in weights, content in memory and knowledge.

---

## Who holds each kind of state

| State | Who holds it |
|-------|--------------|
| The record of each situation | Tend |
| The links between situations | Memory and knowledge, which creates and maintains them |
| The link to a person | Tend. The person's journey is worked out from it. |
| Canonical business facts | The business systems |
| Canonical channel messages | The platforms |
| Grants and business rules | The business configuration |
| Waits and timers | Tend, by fixed code |
| Failure declarations | Tend's audit record |
| Incoming message records | Tend |
| The reading of each arrival (what it asks, refers to, and means) | Tend: the conversation manager writes it with the arrival, as an interpretation |
| Learned business knowledge | Memory and knowledge, as advisory knowledge |
| Structured configuration values | The business configuration, once applied |
| Configuration candidates from observation | Memory and knowledge, until the configuration tools apply them |
| Traces for product improvement | Product improvement, separate from memory and knowledge |
| Skills and procedures | Object storage, versioned; the business writes its own, the product team writes the product's |
| The business's connected MCP servers and their tool lists | The business configuration, captured and versioned when connected |
| The identity of a run | Set at the moment the request arrives, and not stored in the situation record |
| Human work items and handoffs | Tend |
| The security audit record | Tend. Append-only, scoped to each tenant, free of secrets. |

---

## Open questions

- The full list of closing outcomes. Examples so far: declined, converted, handed to the owner, stopped by the owner. <!-- Q1 -->
- The exact configuration for turning a prospect into a customer. <!-- Q2 -->
- Decided: the owner hears about a change in three classes. Level 2's note adds a fourth route: an immediate notice for a change that alters the business's next decision. <!-- Q3 -->
- Decided in Section 7: who writes each kind of situation record. <!-- Q4 -->
- Whether quantitative option AI systems are needed. This is a later technical question. <!-- Q5 -->
- How the person's view joins their situations in the business view. <!-- Q6 -->
- Whether the configurator may pass its configuration power to another person. <!-- Q7 -->
- The exact schema for matching and merging learned claims. <!-- Q8 -->
- Whether assembly templates and the stage constitution are versioned separately. <!-- Q9 -->
- The action grammar for the policy check, and the field schema for the tenant context. <!-- Q10 -->
- The contracts that connect the wait and call rules are not yet listed in one place. <!-- Q11 -->
- The learning rule for when a lesson counts as a new kind of lesson (vocabulary drift, a repeated tool error). No Level 2 rule for this was found. <!-- Level 2 learn-path note -->
- The configuration of owner push alerts. The three classes the owner is told about are listed in the owner rules above. <!-- Open: owner push -->
- The promised settle window numbers, per partner or per capability. Business configuration sets them. The internal settle window default is the business's service level for each wait. <!-- Open: settle window -->
- The fresh-data check before each decision, and how old a claim may be before it must be re-checked. <!-- Open: currency -->
- Before any important action, the facts are read again. This includes a reopen. Level 2 does not say this for reopens, but the same rule covers them. <!-- reopen check -->
- Decided: a permission belongs to a verified person (see the permission rules above). <!-- Decided: G9 -->
- The limit is five (decided 2026-10-10). A short check is allowed only where the outside system's behaviour is known. This rule is provisional. <!-- M5 -->
- An owner who also sets up the business is the administrator, and the administrator sees the audit trail. Level 2 says one person often wears both hats. An owner who does not set up the business has no access to the audit trail by default (recorded 2026-10-09). <!-- audit access -->
- Tenant data is not used to train AI systems without the business owner's written permission. This was recorded earlier and is tagged to confirm. Level 2's default is no. Level 2 does not mention written permission. <!-- training -->

The exact configuration format for each role's list of fields. <!-- Open: T11 detail -->

---

## Related

- `[construction_record.md](construction_record.md)` — how this AI was reached, and what changed
- `[code_index_section_6.md](code_index_section_6.md)` — agent-only index: every code, its meaning, and its source
- `[section_7_boundary_model.md](section_7_boundary_model.md)` — the next section, where the parts are drawn
- `[README.md](README.md)` — how to use this folder

## Concluding audit additions (2026-10-12)

These rules come from the concluding audit. They cover Level 2, the Level 1 framing, the product vision, the research folder, the harness study, the product design folder and the software factory file. Each rule names its source in the tag at its end. Where a source leaves the choice to the owner, the rule says **Open**, and the choice is listed in Section 10.

### Access, grants and approvals

- A grant names a person or a role, and goes through created, active, changed, revoked, and ended. Each change is recorded. <!-- Level 2 authority: how_does_a_grant_end -->
- No one may grant themselves a permission, whether a person or a tool that serves them. Only a designated, verified authority changes grants. <!-- Level 2 authority: who_may_grant_authority_and_what_comes_by_default (no-self-grant) -->
- Tend holds no authority of its own, so there is no override inside Tend. It proposes behaviour and enforces the grants and invariants the business has set. A person who asks for an action outside Tend's range either holds the authority for that call or does not. <!-- Level 2 authority: can_tend_override_a_human_decision -->
- When a person leaves, or changes role, the grants that belonged to the old role end. Call (not yet confirmed): open approvals go back to the business owner until the business gives them to someone else. <!-- Level 2 authority: how_does_a_grant_end; Section 9 -->
- A stored preference, such as a standing meeting time, has an end date. <!-- Product Vision; Section 6 representatives -->
- When no approver can be found under the grant, the work waits and the situation escalates. The wait is shown, not hidden. <!-- Level 2 authority: when_must_tend_ask_for_approval -->
- An approval is asked for when the grant requires one, or when the action is outside the grant. Permission levels for each capability, claim type, and target are **Open**. <!-- Level 2 authority: when_must_tend_ask_for_approval; Level 2 open question -->
- An approval covers one request, and it is used once. It lapses if the situation changes. Only where a grant allows it can the approval pass to another person. If nobody responds, the request goes to the escalation path. Calls (not yet confirmed). <!-- Level 2 decision making: approval rules -->
- Accountability that the business must hold stays with a person. Tend can route work to a person, but cannot hand over that accountability. <!-- Level 2 decision making: which_decisions_must_always_involve_a_person -->

### Customer data and privacy

- A customer's data can be exported when the customer asks, and erased from every copy within the window set for the market, through the confirmed erasure tool (see the erasure rule under Compliance and security). The window is **Open**. <!-- Level 2 compliance: what_are_the_compliances_of_each_actor_and_tech_stack (customer data rights) -->
- Tend acts as a processor for each business. It supports the business's deletion and breach duties. The clocks come from each market's legal values, which are set when the market is entered. <!-- Level 2 compliance: what_are_the_compliances_of_each_actor_and_tech_stack (processor duties) -->
- Tend keeps a list of the providers that touch customer data, the subprocessors. The AI provider is one of them. Data goes only to providers on the list. <!-- Level 2 compliance: what_are_the_compliances_of_each_actor_and_tech_stack (subprocessor rule) -->
- Tend never stores card data. Payment is handled by the payment processor's tokens. <!-- Level 2 compliance: what_are_the_compliances_of_each_actor_and_tech_stack (payment rule) -->
- Audit records are kept for the period that each market's legal values set. The period is fixed at market entry. <!-- Level 2 compliance: understanding_all_compliance (per-market list); Section 10 -->
- Backup copies follow the same deletion rule as live copies. <!-- research: security and compliance (backups) -->
- Customer data stays in the markets where the law requires it. <!-- Section 6 existing rule; Level 2 compliance -->
- Tend does not train on one business's data unless the business gives written permission. The owner confirms this rule (recorded earlier; see Section 10). <!-- recorded earlier; Level 2 default: no training -->

### Security

- The AI never holds production credentials. Connector tokens are kept in the tool layer's secure store, one set per shop, limited to the actions needed. <!-- Level 2 security: how_do_we_apply_security_while_coding_with_agentic_tools (credential rules) -->
- Secrets never enter a prompt, a log, or a trace. <!-- Level 2 security: the_security_audit_framework (line 112) -->
- Protection never depends on hiding the system prompt or the tool descriptions. <!-- research: security and compliance (system prompt) -->
- Text returned by a tool is cleaned before it goes back to the AI. <!-- Section 8 existing rule; research: security and compliance -->
- A new tool is denied until it is approved. Destinations are an allowlist: no free-text destinations, and outbound traffic goes only to listed hosts. <!-- Level 2 security: the_security_audit_framework (lines 98, 110) -->
- AI output is data, checked before any use. It may reach only named places: an argument, a header, a URL, or a rendered page. Each place has its own check. <!-- Section 6 existing rule (AI output is data); software factory -->
- No number from the AI is used in any control path. Numeric gating is fixed code. <!-- Level 2 explainability: understanding_all (no model-generated numbers in control paths) -->
- Staff access to a business is ticketed, time-limited, and approved by a second person. The business sees a banner while staff have access. Support impersonation is refused without a ticket. Call (not yet confirmed): Tend staff act for a business only with a ticket, a time limit, a second approver, and a notice shown to the business. <!-- research: security and compliance; Level 2 security -->
- A change to a permission grant needs a second person. Emergency access expires on its own. <!-- research: security and compliance (dual control) -->
- When a staff member leaves, their membership and sessions end at once. <!-- research: security and compliance (offboarding) -->
- Audit records are tamper-evident. They are written under an identity separate from the application, and their times come from the server clock. <!-- research: security and compliance (audit) -->
- Security alerts cover denied tool calls, unusual send volume, cost spikes, probing of forbidden paths, and cross-business access errors. <!-- research: security and compliance; Section 8 existing -->
- An incident has a severity, is contained, and has a named owner. Breach notices follow the clocks of each market. The clocks are **Open** until the market is entered. <!-- Level 2 compliance: understanding_all_compliance (incident and breach); research -->
- A channel binding proves the channel, not the person. Rebinding a channel to a business needs a person's approval. <!-- Level 2 identity: how_do_identity_and_authority_join; research: security and compliance -->
- Email is sent only from a sender address the business has verified. <!-- research: security and compliance; Level 2 compliance -->
- Each business has rate and cost caps. The caps are configured. Their values are **Open**. <!-- research: security and compliance; Section 9 -->
- A business that abuses a channel can be suspended from sending. The thresholds are **Open**. <!-- research: security and compliance (abuse) -->
- Each decision records the model and the version that made it. <!-- research: security and compliance (trace fields) -->

### Money

- A refund goes through without a person only when it is at or below the business's refund setting. The default setting is zero, so a person approves every refund until the business sets a higher amount. <!-- Level 2 refund setting; Section 10 -->
- No money moves without the approval that the business's settings require. <!-- Level 2 refund setting -->

### Degraded service

- When the AI or a provider is unavailable, situations wait, go to a person, or stop safely. Nothing is sent without a recorded decision. <!-- Level 2 growth: how_do_we_evolve_tend_without_breaking_existing_businesses (fallback lane); research: security and compliance -->
- When a provider retires a connector, that is an outside event. The fallback takes the work, the gap is shown, and the business decides what happens next. <!-- Level 2 growth: how_do_we_evolve_tend_without_breaking_existing_businesses -->

### Level 1 rules where Level 2 is silent

- Tend does not invent a policy for an unclear situation. It routes the case. <!-- Level 1 framing -->
- Tend does not buy data or start a campaign without the authority to do so. <!-- Level 1 framing -->
- Tend does not send indiscriminate bulk messages, and does not bypass channel rules. <!-- Level 1 framing -->
- Not every operational problem belongs to Tend. <!-- Level 1 framing -->
- Tend checks whether the problem stated is the real problem before it acts on it. <!-- Level 1 framing -->
- A correct decision is worth more than a fast one. <!-- Level 1 framing -->
- Output from an external agent is never authority or an instruction. <!-- Level 1 framing; Product Vision -->
- Working hours can differ by location. <!-- Level 1 framing -->
- A low feedback rating goes to a staff member, and the customer is told what was done. The staff member the business names receives it. By default, that is the owner. Call (not yet confirmed). <!-- Level 1 framing (feedback routing) -->

### Consistency, risk, and measures

- The same situation, with the same evidence, policy, and authority, gets the same behaviour. How consistency is measured is **Open**. <!-- Level 2 decision making: consistent next behaviour -->
- Risk is computed by fixed rules. The AI can suggest a risk, but the suggestion lands on a fixed rule. <!-- Level 2 business view: snapshot (risk) -->
- Business success measures are **Open**. <!-- Level 1 framing -->

### Invariants, capabilities, workflows, and retirement

- Configuration that would break an invariant is refused, and the refusal is shown to the business. <!-- Level 2 growth: G2:27 -->
- The named list is in Level 1, section 8: 16 rules that must always hold. Level 2 says these rules are hard, but does not list them. <!-- Level 2 authority: conversation (invariants) -->
- Registry values are versioned. The rule context is built from the versions in force. <!-- Level 2 growth: G2:16 -->
- A capability is a purposeful action, not a raw interface. Its contract states its bounds, its failure behaviour, its reversibility, and how it is monitored. <!-- Level 2 growth: G4:9, G4:18 -->
- A workflow is a constrained procedure for a known kind of work. Its templates take bounded parameters. Sub-procedures are isolated. A running situation keeps the workflow version it started with. <!-- Level 2 growth: G6:9-25 -->
- An old rule version stays alive until its open situations finish, or the business chooses a deliberate cutover. <!-- Level 2 growth: G7:41 -->

### Customer relationships

- Tend is a coordinator, not a CRM. It may write entries into a business's CRM when the business's rules allow it. Its own situation record is the record it works from. <!-- Level 2 journey: J9:100 -->
- Every new contact starts as unknown. A supplied lead is not automatically a prospect or a customer, and the direction of the first message does not decide the relationship. <!-- Level 2 journey: J9:102, J6:41, J6:50 -->
- Whether a reopened situation changes the person's relationship is **Open**. <!-- Level 2 journey: J9:111 -->
- A follow-up needs a clear purpose and target. Tend does not invent either. <!-- Level 2 journey: J7:16 -->
- The wait before a follow-up is set by the business, not by a universal timer. <!-- Level 2 journey: J7:18 -->

### Further additions: understanding, memory, and governance

- A message is routed by the kind of signal it carries: transport, reference, context, or meaning. <!-- Level 2 understanding -->
- A message belongs to the same situation when one gather-and-decide cycle can handle it. Otherwise it is a related situation. <!-- Level 2 understanding: same-or-related test -->
- When a person has only one open situation, an update attaches to it. <!-- Level 2 understanding -->
- Relevance is direct (a fact this decision needs) or indirect (a reference only). <!-- Level 2 understanding -->
- An ignored input keeps a pointer to itself and the reason it was ignored. <!-- Level 2 understanding -->
- A person is linked to their situations by identity, not by context. A link has a type, and it is not a model of the customer. <!-- Level 2 understanding: identity, not context -->
- A wrong link can be removed, and the removal is recorded. <!-- Level 2 understanding: unlink -->
- Each gathered claim records its revision, when it was current, its owner, the request that asked for it, and the situation it affects. <!-- Level 2 trust and gathering -->
- Each gathered item is marked current, stale, unavailable, conflicting, or ambiguous. <!-- Level 2 gathering -->
- A claim is a statement with a subject, a relation, a value, a source, and a time. <!-- Level 2 trust: claim fields -->
- Gathering priority weighs the deadline, the customer's commitments, urgency, and how long each source takes. <!-- Level 2 gathering -->
- A fallback answer is never silently upgraded to a confirmed one. When its source is back, Tend returns to that source. <!-- Level 2 gathering -->
- A needed claim that is not allowed yet is a visible requirement and a wait, not a refusal. <!-- Level 2 gathering -->
- Earlier messages and versions are history. They are not current truth. <!-- Level 2 trust -->
- A partner keeps the responsibility for its own operation. An employee's question can open a separate situation. <!-- Level 2 gathering -->
- The AI may point out a conflict. Fixed code decides how the conflict is treated. <!-- Level 2 trust -->
- The reasoning model receives an evidence context that lists the facts, the assumptions, the conflicts, and the unknowns. <!-- Level 2 trust -->
- Each version of a situation record is complete on its own, and can be read without the earlier versions. <!-- Level 2 trust -->
- The intended outcome is kept apart from the question asked and from the facts. <!-- Level 2 understanding -->
- Where meaning is unclear, Tend keeps a short list of candidate readings. Each reading is typed and bounded, and the source, time, and reason of each are kept. Ambiguity can be about meaning, time, or the actor. <!-- Level 2 understanding: ambiguity -->
- A provisional reading may be used for a step that commits nothing. It is never presented as confirmed. Readings have a lifecycle and can be retired. <!-- Level 2 understanding -->
- When more than one candidate reading matches, fixed code resolves the result as zero, one, or many. <!-- Level 2 understanding -->
- A question asks for one thing at a time. Clarification has a cost, so the number of questions is limited. The limit is **Open**. <!-- Level 2 understanding -->
- An unknown business term is declared unknown and investigated before it is used. <!-- harness study; research -->
- Each business policy states its conditions, the evidence it needs, its scope, and its exceptions. <!-- Level 2 decision making: policy content -->
- A policy is not decided by common sense at run time. Only the order in the policy rules applies. <!-- Level 2 growth: policy precedence -->
- Automation is kept for behaviours that are predictable, bounded, and reversible. <!-- Level 2 decision making; Product Vision -->
- A person's choice that differs from Tend's proposal is recorded with its reason and the authority it used. <!-- Level 2 decision making -->
- Tend does not interrupt a person unless the step needs that person. <!-- Level 1 framing -->
- A refusal says what was refused, why, and how to recover. It offers an escalation or a narrower request where one exists. It never offers an override. <!-- Level 1 framing; Level 2 authority -->
- Tend does not replace the business's existing software. <!-- Level 1 framing: scope -->
- A business representative is chosen by role and by the current preference, not by old records. <!-- Product Vision; Section 6 -->
- A complaint of a high-risk kind (a chargeback, a negative review, a legal threat) goes to a person. The business sets the list of kinds. <!-- Level 1 framing; research -->
- A customer can have several roles in one purchase: buyer, gatekeeper, and payer. Each role is recorded. <!-- research: customer segments -->
- A partner receives only the data its contract allows. <!-- research: partner data rules -->
- Language, currency, time zone, and tone are set per market and per business. <!-- research: market facts -->
- Memory and knowledge's checks run even when manual checks are off: scope, identity and relation shape, provenance, policy conflict, privacy and retention, version and supersession, malformed or unsafe content, and whether a memory may influence the current process. These checks are not a human approval step. <!-- Level 2 memory: can_tend_learn_automatically -->
- The business can inspect, correct, reject, approve, retire, or restrict learned items, according to its configuration and roles. By default, the business owner and the configurator hold these roles. Call (not yet confirmed). <!-- Level 2 memory: who_owns_business_knowledge -->
- A learned item can be used in another business only after a deliberate generalisation step. Only product mechanisms move freely, such as recording tool errors, keeping provenance, versioned memory, scope filters, and replay tests. By default, the business owner must approve any generalisation, which means moving something learned in one business to another. Call (not yet confirmed). <!-- Level 2 memory: how_should_memory_be_scoped_between_businesses -->
- A learned item can be scoped more narrowly than a business: by unit, location, process, role, capability, tool version, partner, customer, geography, or time period. The narrower the scope, the fewer situations retrieve it. <!-- Level 2 memory: scope -->
- Learning is never used to change a business policy, a grant, or an approval. Only the configuration tools change those, after validation. <!-- Level 2 memory: must-not list -->

### Traces

- Traces keep references to records. Secrets, and personal data that the trace does not need, are redacted before a trace is stored. <!-- Level 2 security; architecture rule -->
