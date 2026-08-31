# Journey and Lifecycle — conversation and discoveries

## Why this document exists

This is a conversation record, not a formal specification.

It preserves how we understood Journey and Lifecycle together, the discoveries about who a "person" is against a situation, why the person-level journey is derived rather than stored, and which parts are still open.

This is the first read of the category. The knowledge base already carried the biggest parts of the answer (situation splitting, waiting, deadlines) in earlier categories. The genuine work in this batch turned out to be one thing: *where the person lives against the situation graph.*

## What the earlier categories already decided (reuse)

Before this category, most of the heavy lifting was already done. These are settled in the knowledge base and we reuse them rather than re-derive them:

- **A situation is one operational problem.** It is a decision workspace, not a chat thread, not a customer, not an order.
- **Splitting** — one conversation containing several problems becomes separate situations — is already fully decided: route, split early, merge, re-open, link (Understanding the Situation).
- **Waiting** — for a delivery, a payment, a repair, a meeting, a feedback date — is already modeled as the wait spine (Coordination and Time): a named wait record with subject, reason, timing class, resume trigger, release policy, escalation path, and visibility.
- **When a wait ends** — only by a resume trigger (actor returns, state changes, a date arrives, or the check-in fires), never silently.

So the Level 1 questions "how should a conversation that contains several problems be split" and "how should waiting be represented / how should Tend know when a waiting period has ended" are already answered. This category does not re-write them.

## The raw thought that started this

Swaraj's starting frame was: a person is not a single fixed label at the moment they first contact a business.

The Product Vision already says the journey is: a person who has never done business with the company may become a prospect; a prospect becomes a customer; a customer who comes back is a returning customer. And Tend must "hold the journey" — the owner cares about prospects waiting, buyers close to a decision, deliveries stuck, customers at risk.

But when we examined the knowledge base, the situation graph and the situation record already decided:

- a situation is **not** the customer master record;
- links in the situation graph connect situations by **operational context, not by identity** — "Do not link everything about a customer because it is the same person."

So there was a visible gap. The graph holds the story of each operational problem, but nothing yet said how the *person* who has many situations is known, carried, or derived.

## The discovery: identity is carried by the actor, not by the links

The correction came from the existing rule plus Swaraj's next thought: *"whenever someone comes, we cannot actually classify them as stakeholder or prospect at the start ... we can keep the identity as empty and slowly either ask for a clarification after a while, or slowly deduce through the conversation which of these they are, and change the identity."* The same uncertainty applies when the situation starts from an owner instruction, a list, a system event or another agent rather than from an incoming message.

That aligned exactly with what Understanding the Situation already records: a situation model is state about a problem, not about a person; the actor who interacts carries identity (and can be "identify customer or create identity"). So:

- The **situation graph** connects situations by *operational context* — same order, same incident — never by identity alone.
- The **person** is a *separate, identity-bearing anchor* that sits next to the graph, and the person's relationship is *derived* by looking at the situations that person is part of.

We resolved the apparent contradiction ("should the person have a record?") by settling it as: no separate relationship record, no stored "customer master," no lifecycle database. The person's journey is a **projection** — an on-demand view over the situation graph using identity. We keep the situations as the source of truth for the agent, the conversation, and the story; the journey is derived, not stored.

## The correction to my earlier framing: derive, don't store

Earlier in the conversation I proposed an explicit "thin person-level record" object independent from the situation graph. Swaraj's answer corrected me:

> "We derive it from the situation graph ourselves, no separate record, this can always be derived. As per if the order is placed or not, obviously the data has to be read from the business source, but it's no issue, since the situation model should explain the story completely."

So the working model is:

- The **situation model** is the source of truth for execution, the conversation, and the story.
- The **person** is derived — a stable identity anchor exists, but the *relationship* is a projection over that person's situations.
## Another correction: every new contact is "unknown", then tagged later

When someone first contacts the business, Tend cannot yet say whether they are a prospect, a customer, a returning customer, or a stakeholder who just wants to know how the business is doing.

So the default first-class relationship is **unknown**, and it becomes something through the conversation:

- Tend may **ask for a clarification** if it is genuinely needed;
- or Tend may **gradually deduce** from the conversation which relationship this is;
- and it **changes the identity of the concept** as evidence accumulates.

This fits the existing "tiered assignment" in Understanding: hard signals attach or create with confidence; soft signals ask the customer. Figuring out *who* someone is to the business is the same shape as figuring out *which problem* they are raising. Both use evidence, confidence, and honest questioning rather than guessing.

The situation model therefore has to hold **both** commercial and non-commercial relationships, because it cannot know at the start which one a new contact is. The journey derivation and the owner's Business View must both work for the unknown state, the commercial lifecycle, and the non-commercial stakeholder relationships.

## The commercial lifecycle (corrected)

Product Vision fixes the stages and we deliberately keep them minimal:

- **Lead** — a possible contact or opportunity supplied by the business, a system, an event, a partner or an external agent.
- **Prospect** — a person or organisation in a possible commercial relationship who has never done business with it. They do not need to have contacted the business first.
- **Customer** — a person who has done business with the business (e.g. a paid order exists, per business rule).
- **Returning customer** — a customer who comes back after having bought before.

Inbound and business-initiated are properties of how a situation began. They matter to communication permission and policy, but they do not define the relationship.

We do not add finer stages (cold / engaged / considering / hot) because the knowledge base research flags "what defines a prospect stage?" as an open question and Product Vision does not need it. If a real business later needs finer stages, that is a business-configuration extension, not a change to this model.

The list or source that introduced a person remains visible. A lead is not automatically a prospect, and a prospect is not automatically interested. Tend must distinguish what the business wants from what the person has actually said or done.

## The stakeholder relationships (non-commercial journey)

A supplier, a landlord, a regulator, a tax authority, an investor, a journalist, a helper, or a partner also interacts with the business. They do **not** become "customers"; there is no lifecycle to be on. There is a *relationship type* and a set of *obligations or asks* (respond by the deadline, provide the certificate, confirm payment, give a status update).

So the person-view must hold two shapes at once:

- **a lifecycle** for people who might buy (prospect → customer → returning); and
- **an obligations/asks ribbon** for everyone else (the relationship type + the open asks with their deadlines).

## Decisions made (working, pending review)

- The situation graph and situation model remain the source of truth for agent execution, the conversation manager, and the story of the situation.
- A situation can begin from an incoming interaction, a business instruction, a system event, an external-agent result or Time. It does not require a customer message.
- Tend's agency is the event-driven continuation of the situation: when relevant state changes, the situation wakes, the decision loop runs and Tend triggers the next permitted behaviour without requiring a new user prompt.
- A business instruction to work a list creates separate situation models for the individual people, plus an aggregate artifact for the assignment.
- Tend is a coordinator, not a CRM; it may create entries in an external CRM *per business rules*, but our situation graph stays ours and stays the truth for the agent.
- The person-level journey is **derived**, not stored. No separate relationship record.
- Every new contact is **unknown** first; relationship (commercial stage or stakeholder type) is deduced or asked, and the identity changes as evidence gathers.
- The situation model explains the story completely, including which business-source events (order placed, paid, delivered, feedback given) mark a stage change.
- The commercial lifecycle is three stages only: prospect, customer, returning customer.
- A supplied lead is not automatically a customer or a prospect. Tend uses identity, purpose, source and business evidence to determine whether a commercial situation exists.
- Non-commercial stakeholders are held as **situations** with a relationship-type tag, not as lifecycle stages.

## What remains open (configuration and research, not conceptual gaps)

- The exact rule for "paid order exists" (the prospect→customer marker) is business configuration, and the source of truth for that event lives in the business system.
- Whether the "reopen" of a situation should also change the person's relationship (e.g. a customer who comes back for support) is partly answered by the graph but not fully locked.
- The shape of the derived person-view (how the identity anchor and the graph join) is still to be defined in the Business View category.

## Boundaries with other categories

- **Understanding the Situation** owns routing, splitting, linking by operational context, and "the situation is not the customer master record."
- **Coordination / Time** own the wait spine and deadlines — reused here as-is.
- **Memory and Knowledge** owns what Tend remembers (including person identity facts) and the scope rules.
- **Business View and Observation** owns the aggregate owner snapshot, which is derived from this same situation graph.
- **Meetings and Human Work**, **Channels and Permissions**, and **Compliance & Security** are separate later categories.

## Related

- Level 1: "Journey and Lifecycle" section in `Level 1_Problem_Framing_or_Expansion.md`.
- Reuse: Understanding the Situation (situation = one operational problem; route, split, link).
- Reuse: Coordination / Time (wait spine, deadlines, check-ins).
- Research: `research/business_journeys_map.md` (prospect journey; order/logistics; meeting; owner; gaps).
- Research: `research/research_owner_stakeholder_journeys.md` (the social-signal research we ran — see the research document).
