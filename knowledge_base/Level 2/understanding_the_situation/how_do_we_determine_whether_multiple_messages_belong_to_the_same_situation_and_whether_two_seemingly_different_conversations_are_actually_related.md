# How do we determine whether multiple messages belong to the same situation, and whether two seemingly different conversations are actually related?

## Answer

A message belongs to a situation when it is about the **same operational problem** as that situation.

An operational problem is one thing the business must understand, gather for, and decide on — with one resolution path.

A message can belong to **more than one** situation when it mentions more than one problem.

A situation is **not** the same thing as a conversation thread.

One WhatsApp chat can touch three situations.

Three channels can touch one situation.

Two conversations can be **related** without being the **same** situation.

Related means they share context that may matter — same customer, same order, same incident — but they still need **separate** situation models and **separate** resolution paths.

When a message arrives, Tend does two jobs before gathering from business systems.

**First — route.** Decide which situation model or models this message updates. Create a new situation when the message starts a new problem.

**Second — understand.** Update each affected situation model with what the message adds — known, unknown, conflicting.

If routing is uncertain, Tend does not guess.

Hard signals produce a confident attach or create.

Soft signals trigger a question to the customer or a hold until the reference is clear.

Gathering may later prove routing was wrong.

Tend corrects by re-routing, splitting, or merging.

That correction is normal.

---

## Decisions already made

These are settled for Tend unless you reopen them later.

**One situation = one operational problem.**

Not one chat thread.

Not one order regardless of how many problems exist on that order.

**Persist situation state.**

Tend keeps an explicit situation model for each open problem.

Tend does not rely on re-reading chat history alone each time.

**Split early.**

If one message clearly contains two distinct asks (two orders, two issue types), Tend creates two situation models immediately.

**Tiered assignment.**

Hard signals → attach to an existing situation or create a new one, with confidence.

Soft signals → ask the customer which problem they mean.

Asking the customer is gathering from a valid source.

It is not a failure mode.

**Route before gather.**

Assignment uses what is already available.

Gathering fills unknowns and may correct assignment.

**Correction is expected.**

Split, merge, and re-route are first-class operations.

Not rare error recovery.

**Related is not the same as same.**

When two situations share context but need separate resolution paths, Tend **links** them.

Tend does not merge their models into one.

**Tend is not a CRM.**

The situation record is a decision workspace for one open problem.

Not the customer master record.

---

## What happens when a message arrives

Step by step. No steps skipped.

**1. Tend receives an event from a communication platform.**

The platform (Gmail, WhatsApp, etc.) delivered a message.

Tend records that it received something.

What exactly Tend records is defined in the section “What Tend stores” below.

**2. Tend routes the message to one or more situations.**

Tend looks at signals.

Hard signals examples:

- Reply to a prior Tend-sent message on the same channel (transport link).
- Explicit reference in text: order number, ticket reference, “about my call yesterday regarding the refund.”
- Unambiguous match to exactly one open situation for this customer (only one open delivery delay, message says “any update on my delivery?”).

If hard signals match one open situation → attach and update that model.

If hard signals describe a new problem → create a new situation.

If the message names two problems → create or update two situations (split early).

**3. If signals are soft, Tend does not attach with confidence.**

Soft signals examples:

- “Any update?” with no reference and multiple open situations.
- “My order” when the customer has three recent orders and Tend has no other pointer.
- Topic shift that might be a new problem or a follow-up — unclear which.

Tend updates a situation model only after the reference is clear enough to route.

Until then, the model may hold: “customer sent a follow-up; which situation is unknown.”

Tend asks the customer which order or which issue they mean.

That question is a valid next step.

The customer is a source of truth for what they are asking about.

**4. Tend understands — updates each routed situation model.**

For each situation the message touches, Tend updates:

- What the customer is asking.
- What the customer said and believes.
- What is known, unknown, conflicting from material already available.

Understanding does not fetch new data from business systems at this step.

**5. Gathering runs.**

Tend fills unknowns from business systems, employees, or the customer.

Gathering may show routing was wrong.

Example: message attached to order A; ERP shows customer only has an open issue on order B → re-route or split.

**6. Decide and act.**

Only after the model is as complete as policy allows.

---

## Signals — what Tend uses to route

Signals are grouped by how reliable they are and where they come from.

**Transport signals (hard when present).**

Reply chain on email.

Message ID threading.

Quoted prior message.

Channel-native “this is a reply to message X.”

These say: this message continues **that** exchange.

They do not always say it is the **same problem** — a customer can reply to an old email with a new issue.

But they are strong attachment hints.

**Explicit reference signals (usually hard).**

Order number, invoice ID, booking reference, case number, “the red sofa order.”

**Context signals (medium — can be hard or soft).**

This customer’s open situations.

What Tend already told them on another channel.

Time proximity combined with topic match.

Only one open situation of this type → “any update?” may hard-attach.

Three open situations → soft; ask.

**Semantic signals (soft).**

Intent, topic change, tone.

Used when transport and references are missing.

Never silently override a conflict with hard signals.

**Ground-truth signals (gathering — not routing).**

Order status in ERP.

Payment state.

Dispatch record.

These confirm or correct routing after the first pass.

They do not block the first model update when routing used only soft signals — but they may trigger split or re-route.

---

## Same order, two problems — why split early

Same order does not mean same situation.

Order #1234 can have:

- A delivery delay (situation A).
- A wrong item received (situation B).

One message can mention both.

Split early means Tend creates A and B when both asks are named.

Tend links both messages to the same conversation with the customer.

Tend does not force one model to hold two unrelated resolution paths.

If the customer only says “my order” and has one obvious open problem, Tend does not invent a second situation.

Split early applies when **two distinct asks are present**, not on every ambiguous reference.

When A and B are both about order #1234, Tend also **links** the two situations as related.

They share context.

They remain separate models.

---

## When two conversations are related but not the same situation

This section answers the second part of the Level 1 question.

Two conversations look different when:

- They are on different channels (email thread and WhatsApp chat).
- They are different platform threads (two email chains, two WhatsApp numbers).
- They started at different times with no reply chain between them.
- They involve different customers reporting the same underlying incident.

“Different-looking” does not tell you whether they are the same situation, related situations, or unrelated.

Tend must distinguish three relationships.

---

### Same situation

**Meaning:** One operational problem. One situation model. One resolution path.

**What Tend does:** Attach messages from all matching conversations to **one** situation. Update **one** model.

**Typical cases:**

- Customer continues the same delivery complaint on WhatsApp after emailing yesterday — same problem, different channel.
- Customer sends a follow-up “any news?” on the same problem Tend is already tracking.
- Transport threading on one channel points to an open situation about that problem.

**Test:** Would **one** gather-and-decide cycle resolve every message in both conversations? If yes → same situation.

---

### Related situations

**Meaning:** Separate operational problems, but shared context that an employee or Tend should see when working either one.

**What Tend does:** Keep **separate** situation models. Create a **link** between them. Do not merge models.

**Typical cases:**

- Same customer, same order, delivery delay (situation A) and wrong item (situation B).
- Refund pending on order A while customer opens a new complaint about order B — separate problems, same customer history matters.
- Two customers report delivery failures from the same warehouse outage — separate situations per customer, linked to a shared incident context.
- Employee resolves a billing error on situation A that was causing confusion in situation B — link so B’s model can reference A’s outcome.

**Test:** Do these need **different** resolution paths? If yes → separate situations. Does context from one **inform** the other without merging them? If yes → link as related.

**Link is not merge.**

Merge collapses into one model and one decision path.

Link says: “when you work situation A, you should know situation B exists and here is why.”

Each situation still has its own known / unknown / conflicting slots.

Each situation still gathers and decides on its own.

---

### Unrelated

**Meaning:** No meaningful shared context for coordination. Separate customer, separate problem, separate time — nothing one situation needs from the other.

**What Tend does:** No link. Route and model independently.

**Typical cases:**

- Customer’s delivery complaint today and the same customer’s unrelated product question from two years ago on a resolved situation.
- Two customers with similar wording but different orders and no shared incident.

**Test:** Would an employee working one situation ever need the other **only** because both exist? If no → unrelated.

Do not link everything about a customer “because it is the same person.”

That is CRM thinking.

Tend links when **operational context** is shared, not when **identity** is shared.

---

### How Tend decides: same vs related vs unrelated

Use the same signal layers as routing, but ask a different question.

Routing asks: **which situation model does this message update?**

Relatedness asks: **should situation A and situation B be linked for context?**

**Signals that two different-looking conversations are the SAME situation:**

- Same explicit problem reference across channels (order + same issue type + no closure in between).
- Open situation already exists for this problem; new conversation is clearly a continuation (even without transport threading).
- Gather shows the “new” conversation is about the same unresolved operational fact (same dispatch stuck, same refund not issued).

**Signals that they are RELATED but not the same:**

- Same business object (order, booking, invoice) but **different** problem types requiring different resolution paths.
- Same root-cause incident (outage, batch defect) affecting multiple situations.
- One situation’s resolution directly affects another (billing fix clears up a complaint on a separate thread).
- Customer mentions both problems but each needs its own model (split early + link).

**Signals that they are UNRELATED:**

- Different business objects and no shared incident.
- Prior situation is **resolved** and the new message describes a **new** problem (even on the same channel — do not reopen by default without signals; create new situation).
- Similar words, no shared reference, no gather connection.

When unsure between same and related → prefer **separate situations with a link** over **one merged model**.

Wrong merge poisons gather and decide.

Wrong link only adds context an employee can ignore.

When unsure between related and unrelated → **no link** until a signal appears.

Do not link all open situations for a customer by default.

---

### What a link stores

A link is a Tend artifact (Category 3 in “What Tend stores”).

It is not a message.

It is not a situation model.

A link typically records:

- **Situation A** and **Situation B** (or situation and incident reference).
- **Why** they are linked (same order, same incident, employee created, gather discovered).
- **Link type** (same customer context, same business object, same root cause, affects).
- **Created at** time.

Links are visible to employees.

Links may surface in the UI as “related situations” when working either side.

Links do not copy one model’s contents into the other.

They are pointers for coordination.

---

### Merge, split, link, re-route — when to use which

| Operation | When |
|-----------|------|
| **Attach** | Message belongs to an existing situation |
| **Create** | Message starts a new problem |
| **Split** | One situation was wrongly holding two problems |
| **Merge** | Two situations were wrongly treated as one problem |
| **Link** | Two situations are separate but share context |
| **Unlink** | Link was wrong or no longer relevant |
| **Re-route** | Message was attached to the wrong situation |

Merge and split change **how many models** exist.

Link and unlink change **what context is visible** between models that stay separate.

---

### Example — same situation across channels

Monday: customer emails about order #8821 not delivered. Tend creates situation S1 (delivery delay).

Wednesday: same customer WhatsApp: “Still waiting on my package from Monday’s email.”

Different conversation threads.

**Same situation** — same problem, same order, same unresolved path.

Attach WhatsApp ingest to S1.

Do not create S2.

Do not only “link” — there is nothing separate to link.

---

### Example — related situations, same order

Customer has situation S1 (order #8821 delivery delay) open.

Customer WhatsApp: “Also the blue lamp from that order arrived broken.”

**Related, not same.**

Create S2 (damaged item on order #8821).

Link S1 and S2: same order, shared customer context.

Gather for delivery status (S1) and damage/return path (S2) run separately.

One reply to the customer may cover both — but two decision paths internally.

---

### Example — related situations, shared incident

Fifty customers message about late deliveries after a warehouse flood.

Each customer gets their **own** situation (their order, their resolution).

Tend may create an **incident** link grouping those situations under one root cause.

Employees see: “part of warehouse flood incident.”

That is related at incident level.

It is not one situation for fifty customers.

---

### Example — unrelated

Customer resolved a warranty claim on a kettle six months ago (situation closed).

Customer emails today about a new order’s shipping.

**Unrelated** to the closed situation.

Create new situation.

No link to the old warranty situation unless the customer explicitly ties them together.

---

## What Tend stores

This section answers: when we said “store messages,” what exactly do we mean?

Are we copying every Gmail and WhatsApp message into Tend and becoming the source of truth?

**No.**

Level 1 is explicit.

Communication platforms transport messages.

Business systems own their data.

Tend does not become the system of record for information that belongs elsewhere.

Tend may temporarily hold or process information.

Permanent ownership stays with the platform or system that owns it.

Product Vision says the same: Tend is not a CRM.

Tend uses customer information.

It does not replace where that information lives.

So “store messages” does **not** mean “Tend replaces Gmail/WhatsApp as the place email and chat live.”

It means Tend keeps **what Tend needs** to do its job — and that is a different category of data.

---

### Three categories of data — keep them separate

**Category 1 — Canonical messages (owned by communication platforms).**

The actual email in Gmail.

The actual WhatsApp message in Meta’s systems.

The platform owns delivery, thread structure on that platform, and platform-specific metadata.

Tend can always ask the platform again via its connection.

Tend is not the source of truth for “what was sent on WhatsApp.”

**Category 2 — Ingest records (owned by Tend for coordination).**

When a message arrives, Tend creates an **ingest record**.

An ingest record is not a philosophical copy of “the message.”

It is the minimum Tend needs to:

- Know that something arrived, when, from whom, on which channel.
- Point back to the canonical message on the platform (platform message ID, thread ID, etc.).
- Attach that arrival to one or more situations.
- Trace what Tend did in response to that arrival.
- Work when the platform API is temporarily unavailable (optional working copy — see below).

An ingest record typically holds:

- **Reference** to the platform message (required).
- **Normalized content** for Tend’s use: text body, attachments metadata, sender identity as Tend knows it — often copied at ingest time.
- **Timestamps** as Tend received them.
- **Channel** and **direction** (inbound from customer, outbound from business via Tend, internal note from employee).

If Tend copies the text body at ingest, that copy is a **working copy for operations**.

Gmail/WhatsApp remain canonical for the message-as-sent-on-that-channel.

If Gmail deletes or edits thread history, Tend’s copy may diverge.

Tend should treat the platform as authoritative for disputes about “what the channel shows.”

Tend’s copy exists so Tend can route, model, search, and audit **without re-fetching every line on every turn**.

That is processing convenience, not a claim of ownership.

**Category 3 — Tend artifacts (owned by Tend — this is Tend’s actual source of truth).**

These are things only Tend creates.

They are what Tend **is** the source of truth for:

- **Situation models** — known / unknown / conflicting per open problem.
- **Situation lifecycle** — open, waiting on customer, waiting on employee, resolved.
- **Links** — which ingest records touch which situation(s).
- **Situation-to-situation links** — related but separate problems (see above).
- **Routing decisions** — attached to situation X because order # cited; confidence: high.
- **Routing corrections** — split situation A from B at time T because gather showed two problems.
- **Gather requests and results** — asked ERP for order status; result at time T (with pointer to ERP, not replacing ERP).
- **Decisions and actions** — escalated, replied, approved, waited.
- **Explanations** — why Tend routed, gathered, or decided (for traceability).

**LLM reasoning is not stored as a “message.”**

If Tend stores model output, it is labeled as a **Tend artifact**: routing rationale, model update summary, draft reply before send.

It is never mixed with customer words as if the customer said it.

Employees and auditors must be able to tell: “customer said X” vs “Tend inferred Y.”

---

### What we are not storing

- Tend is not trying to become the permanent archive of all business email.
- Tend is not replacing WhatsApp’s chat history for the business.
- Tend is not storing LLM chain-of-thought as customer communication.
- Tend is not storing ERP order data as master data — only snapshots or pointers used for a situation at a point in time.

---

### Why keep ingest records at all if APIs can re-fetch?

Because Tend’s product job is not “display Gmail.”

Tend’s job is:

- Attach this arrival to the right situation(s).
- Show any employee the same picture of an open problem.
- Explain what happened when a decision was made.
- Continue when the customer switches channel tomorrow.

Re-fetching from Gmail API on every step is possible in theory.

In practice it creates problems Product Vision cares about:

- **Latency and availability** — decision blocked when API is down.
- **Cross-channel** — no single API gives “everything this customer said everywhere.”
- **Links** — “message M updated situation S at time T” must be durable even if you re-fetch content later.
- **Traceability** — “what did Tend know when it escalated?” needs the situation model and links at that moment, not a re-inference from chat today.

So Tend stores **ingest records + situation artifacts**.

Platforms store **canonical messages**.

Business systems store **canonical business facts**.

---

### Fetch vs store — the rule

| Data | Who owns truth | What Tend keeps |
|------|----------------|-----------------|
| Email/WhatsApp message as sent | Communication platform | Ingest record with platform reference; often a working copy of content |
| Order/payment/dispatch status | Business system (ERP, etc.) | Gather result + pointer + timestamp; not master data |
| What problem we are solving | Tend | Situation model + lifecycle |
| Which message touched which problem | Tend | Links |
| Related separate situations | Tend | Situation-to-situation link + reason |
| Why Tend attached or split | Tend | Routing decision + explanation |

Tend becomes source of truth only for **coordination state**: situations, links, decisions, explanations.

Tend does not become source of truth for **messages** or **business facts**.

---

## What “store messages” meant in earlier discussion

When we said Tend must store messages, we meant **Category 2 — ingest records** — not “clone Gmail.”

Minimum viable meaning:

Every customer or employee communication that Tend processes leaves an ingest record.

That record can be tied to situation(s).

The conversation history Tend shows is built from ingest records across channels, not from re-scraping Gmail each morning.

The situation model sits on top of those records.

The LLM context window for a turn is assembled from: relevant ingest records + current situation model(s) + fresh gather results.

The context window is disposable.

The ingest record and situation model are what survive between turns.

---

## How this fits Product Vision

Vision says Tend helps the business make correct operational decisions.

That requires a durable picture of each **open problem**, not a disposable chat summary.

Vision says the customer should not repeat the same problem every time.

That requires situations and links to persist across channels and time.

Vision says different employees should reach the same conclusion on the same situation.

That requires an explicit shared model, not each person re-reading WhatsApp differently.

Vision says every important action should be traceable and explainable.

That requires Tend artifacts — routing, models, decisions — stored with timestamps.

Vision says Tend is not a CRM and not a chatbot.

Situation records are problem workspaces.

Ingest records are operational copies/references, not a replacement inbox.

Linking related situations gives context without collapsing into one inbox thread.

Vision says never guess.

Tiered routing + asking the customer on soft signals follows that.

When same vs related is unclear, separate + link beats silent merge.

Vision says understand before acting.

Route and model before ERP fetch; gather corrects routing when needed.

---

## What understanding does not do (unchanged)

Understanding does not fetch from business systems.

Understanding does not send replies.

Understanding does not resolve conflicts by picking a side.

Assignment on soft signals may **wait** for customer clarification before fully updating a situation model.

That wait is valid.

The model can record: “follow-up received; situation reference unknown.”

Understanding records that two situations are related.

It does not merge their models without evidence they are the same problem.

---

## Example — one message, two situations

Customer on WhatsApp:

> “Order A still hasn’t arrived. Also order B came in the wrong colour.”

**Route (split early):**

- Situation A: order A, delivery delay.
- Situation B: order B, wrong item.

Both created or updated.

Same ingest record linked to A and B.

**Link:** A and B related (same customer; may share conversation context).

**Understand:**

- A: known — customer reports non-delivery. Unknown — dispatch status, etc.
- B: known — wrong colour. Unknown — return/replace policy path, etc.

**Gather:**

- ERP for order A status.
- ERP for order B line items.

**Decide:**

- Possibly one reply covering both, but two decision paths internally.

---

## Example — soft signal

Customer:

> “Any update?”

Customer has two open situations: delivery delay on order A, refund pending on order C.

**Route:**

- No hard signal.
- Do not attach with confidence to A or C.

**Understand (limited):**

- Record ingest + “customer follow-up; target situation unknown.”

**Gather (customer as source):**

- Ask: “Are you asking about the delivery for order A or the refund for order C?”

**After customer answers:**

- Route hard-attaches to chosen situation.
- Full model update runs.

---

## Status

Answered — pending your review.

Decisions locked in this answer:

- Split early when distinct asks are present.
- Tiered assignment: hard → confident attach/create; soft → ask customer.
- Persist situation models and ingest records; platforms and business systems remain canonical for their data.
- Same situation vs related vs unrelated — three distinct relationships.
- Related situations stay separate models; link for shared context; do not merge by default.
- When unsure between same and related → separate + link over silent merge.
- Route and understand share the same inbound context pool; assemble once, two passes.
- Router uses open-situation summaries; understanding uses full models for routed situation(s) only.
- Default routing candidates are open situations; closed only on explicit reference.
- Answered is not a situation status; new problem → new situation; same unfinished problem → reopen.

---

## Does the router receive the same context as understanding?

### Short answer

Mostly the same **pool** of material. Not the same **job**. Not the same **depth** on every open situation.

Route and understand both run at the same inbound moment.

They draw from the same available context.

They must not each build a separate world.

If the router saw less than understanding, Tend could route on a thin picture and understand on a fat picture.

They would disagree.

That is incorrect behaviour.

---

### What is available at the moment a message arrives

Before gathering from business systems this turn, Tend already has (or can load):

- The new message.
- Prior messages for this customer across channels, as ingest records.
- Customer profile and identity (who this is).
- What the business already holds about this customer (cached facts if Tend has them).
- What the business has already told this customer.
- **Open** situation models for this customer.

Route and understand both draw from this pool.

Route before gather still applies.

Neither step waits for a fresh ERP fetch this turn.

---

### What is different between router and understanding

Same inputs available.

Different question.

Different slice used.

| | Router | Understanding |
|---|---|---|
| **Question** | Which situation(s) does this message touch? Create, attach, reopen, or ask? | For each chosen situation, what does this message add to the model? |
| **Uses new message** | Yes — for signals. | Yes — for content. |
| **Uses prior chat** | Yes — threading, references, continuation. | Yes — full model update on attached situation(s). |
| **Uses customer profile** | Yes — identity, how many open problems. | Yes — customer context slots. |
| **Uses open situations** | Yes — **candidates to match against**. | Yes — **models to update**. |
| **Uses closed situations** | Only if **explicitly referenced** (reopen). | Same — not all closed history by default. |
| **Uses fresh gather** | **No.** | **No** at the understand step. |
| **Depth on each open situation** | **Summary** is often enough. | **Full** model for situation(s) routed to. |

The router does not need every unknown slot on all open situations to decide “this message mentions order #8821.”

It needs enough to match: problem type, key references, status, last activity, channel links.

Understanding needs the **full** model for the situation(s) the router picked.

---

### How inbound context is assembled

**Recommended approach: assemble once, two passes.**

**1. Assemble inbound context once.**

Message + customer + available history + open situation summaries.

Add targeted closed-situation lookup only if the message references something that might be a reopen.

**2. Router reads that bundle.**

Picks situation(s): attach, create, reopen, or ask customer.

**3. Understanding reads the same bundle.**

Plus the **full** models for the situation(s) the router chose.

Updates those models.

Do not build two independent context assemblies.

They will drift.

---

### First-time customer

Same principle.

Smaller pool.

- New message.
- Profile maybe empty or from ERP only.
- No open situations.
- Prior chat maybe empty.

Router: **create new situation.**

Understanding: build the **first** model from the message plus whatever profile exists.

---

### Customer with many open situations and long history

Example: 3 open situations, 190 closed.

Message: “Any update on order 8821?”

**Router gets:**

- New message.
- Customer profile.
- Prior messages if needed for threading.
- **Summaries of the 3 open situations** — not all 193.
- Targeted check against closed situations only if the message references a past case (e.g. “that refund from last month”).

**Router output:** attach to situation S2 (order 8821, delivery delay).

**Understanding gets:**

- Everything the router used for matching.
- **Full** situation model for S2 (all known / unknown / conflicting).
- Prior messages linked to S2 and cross-channel context that matters.

Understanding does not fully re-model every open situation — only the one(s) routed to.

If the message touches two situations (split early), understanding gets **both** full models.

---

### What the router does not get

These belong to gathering, deciding, or memory — not default routing:

- Fresh gather from business systems this turn.
- Full LLM reasoning from a previous turn treated as fact.
- All closed situation models scanned on every message.
- Every message this customer ever sent at full length when only recent or linked history matters for signals.

Closed history: **search on reference**, not **load all**.

---

### Routing when the customer has no history

No customer record, or zero open situations.

**Steps:**

1. Record ingest.
2. **Create** new situation — nothing to attach to.
3. **Understand** — build first model.

There is no separate “skip routing” path.

Routing’s answer is: **create new.**

---

### Routing when the customer has long history

Routing does **not** compare the message to every past situation.

Routing uses **candidates**:

1. **Open situations** for this customer (usually a small set).
2. **Closed situations** only when the message **explicitly references** one (reopen).

Closed situations are **history**, not default attach targets.

They matter for:

- Employee review.
- Linking a new situation to old context.
- **Reopen** when the customer continues the same unresolved problem.

They do not load into every routing decision.

---

### Situation status — “answered” is not enough

**Answered** means Tend or the business **sent a reply**.

That is a **communication** event.

It does not mean the **operational problem** is finished.

Examples:

- Tend replied “we’re looking into it” — problem still open.
- Tend gave a delivery date — customer may reply tomorrow “it didn’t arrive.”
- Tend said “refund in 5 days” — refund may still be pending.

Situation status must separate **what happened to the customer** from **whether the business problem is done**.

**Answered** belongs on the ingest record or decision log (“we replied at 14:32”), not as the situation’s only status.

**Conceptual situation statuses:**

| Status | Meaning |
|--------|---------|
| **Open** | Active problem. Gather or decide still needed. |
| **Waiting on customer** | Ball in customer’s court. |
| **Waiting on employee** | Ball inside the business. |
| **Waiting on external** | Ball outside (carrier, payment processor, etc.). |
| **Resolved** | Operational problem finished. No further action expected. |

**Reopened** may be a flag on a resolved record when the same problem is not actually done — exact form is still open.

---

### Reuse a resolved situation or create a new one?

**Default: new problem → new situation.**

Even if the customer has many closed situations.

Even if it is the same order but a **different** problem type.

**Same problem not actually finished → reopen** the existing situation.

Do not create a second parallel model for the same unresolved operational fact.

| Customer message | Action |
|------------------|--------|
| New topic, new order, new issue type | **Create** new situation. |
| “Any update?” and exactly **one** open situation matches | **Attach** to that open situation. |
| “Any update?” and **multiple** open | **Ask** customer (soft signal). |
| “You said refund was done but I don’t have it” referencing a **resolved** refund | **Reopen** that situation. |
| Reply on old **closed** thread but **new** issue | **Create** new (+ link if related). |
| Same delivery still missing after marked resolved | **Reopen** (or correct if wrongly resolved). |

Do not reuse a closed situation as a generic bucket for “this customer messaged again.”

When reuse (reopen) is correct: the customer continues **the same operational problem** that was resolved too early or regressed.

When create is correct: it is genuinely a **new** problem — optionally **link** to an old closed situation for context.

---

### Routing flow (full)

```
Message arrives
    │
    ▼
Identify customer (or create identity)
    │
    ▼
Assemble inbound context (message, profile, history, open situation summaries)
    │
    ▼
Load OPEN situations as candidates — not full closed history
    │
    ▼
Any explicit reference to a CLOSED situation? ──yes──► reopen candidate
    │ no
    ▼
Router: evaluate signals vs open situations
    │
    ├─ hard match to one open ──────────────► attach
    ├─ hard match to two (split early) ─────► attach to both / create both
    ├─ hard signals new problem ────────────► create new
    ├─ soft signals ────────────────────────► ask customer / hold
    └─ no open + no reopen signal ──────────► create new
    │
    ▼
Understand: full model update for each routed situation
    │
    ▼
Gather → may correct route / split / merge / link
```

---

### Decisions locked in this section

- Route and understand share the same **inbound context pool** at ingest time.
- **Assemble once, two passes** — router then understanding on routed situation(s).
- Router uses **summaries** of open situations; understanding uses **full models** for routed situation(s) only.
- Default routing candidates: **open situations** only; closed only on explicit reference.
- **Answered** is not a situation status; **resolved** is operational closure.
- **New problem → new situation.** **Same unfinished problem → reopen.** Do not attach blindly to closed situations.
