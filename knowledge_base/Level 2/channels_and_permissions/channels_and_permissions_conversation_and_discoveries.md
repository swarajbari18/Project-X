# Channels and Permissions — conversation and discoveries

## Why this document exists

This is a conversation record, not a formal specification. It preserves how we understood Channels and Permissions together: the raw thought that started it, the corrections we made (and a couple I had to make about my own earlier framing), the research that grounded the visibility question, and the working decisions. The map of the four Level 1 questions is in `understanding_all_channels_and_permissions_questions.md`.

## The four level 1 questions

Level 1 lists four things under "Channels and Permissions":

1. How should Tend represent what each communication channel allows a business to send?
2. How should Tend record consent and the customer's preferred channel?
3. How should Tend choose between replying in the current channel and starting a message in another window?
4. How should Tend decide what information each employee, customer, or external partner may see?

The first three are genuinely about channels. The fourth is only half about channels — it is really about permissions. That split matters, and it shaped this whole batch.

## What the earlier categories already decided (reuse)

We did not start cold. Several earlier categories already drew boundaries that point here, and we reused them:

- **Communication** explicitly said channel transport, initiate/reply mechanics, and legal consent are NOT its job. It listed them in *what this category does not decide*, pointing at Channels and Permissions and Level 3. Its status also says channel-specific rules live at Level 3 — a phrasing it wrote before this category existed, which we re-scoped (below).
- **Meetings and Human Availability** used "inform / absolute" messaging and multi-participant contact, but deliberately did not pull in channel. It says this category owns the channel.
- **Journey** already used the concept of a channel *window* for nurture and pointed here to formalize it. Its earlier rule that outreach was automatically out of scope was corrected: the source of a contact does not define Tend's boundary. Bounded business-directed communication may be in scope; channel permission and compliance still govern it.
- **Authority** gave us the grant frame: effective permission = what the grant allows ∩ what the owned system allows. Fewer only reduce access, never expand.
- **Communication** ruled the LLM is not the authority for whether a message is permitted, whether a recipient sees information, or whether consent exists. Those are deterministic checks.
- The research files (`wa_compliance.md`, `channel_compliance_matrix.md`) already hold verified channel facts: WhatsApp CSW/FEP window, template-only outside a window, no-initiate on Telegram, email initiate-with-consent. **`global_market_readiness.md`** already said the core must be channel-free adapters with compliance as a per-tenant matrix.

## The first misstep I had to correct: I over-framed "reaching an employee"

My first instinct was to treat "how do we reach an employee?" as a *choice*: pick one lane — workspace-native, or Slack, or WhatsApp. Swaraj corrected this hard, and the correction was right.

It is not a pick-one. Tend is the layer that owns communication. That means it connects to **whatever the business already uses** — Slack, Teams, Google Chat, email, WhatsApp, Telegram — and delivers the message there. There is a communication-manager part inside Tend that holds the channel adapters. It picks which adapter carries a message; it never refuses work because a channel is missing. The core decides *what* message and *to whom*; the communication manager decides *which adapter*. And the rule from the owner's side: we never tell an owner "this channel is not supported."

The research already supported this: `global_market_readiness.md` says the core must be channel-agnostic adapters so the same core serves India, Gulf, US, Japan. So this category plants: **channel is a configurable adapter (transport), not business logic.**

## The second correction: "all channels" needs a fallback and a visible gap

"All channels" cannot mean we ship every adapter on day one. No team ships WhatsApp, Slack, Teams, Google Chat, LINE, WeChat, email, SMS, live-chat all at once, and future channels appear anyway. So "all options" is made true by two rules:

1. **A fallback lane always exists.** Even when the actor's preferred lane has no adapter yet, there is a universal lane (email) the message can pass through, so work never dead-ends.
2. **An absent channel is a visible, first-class gap, not a refusal.** When the business connects a channel we have not built, we do not say "we don't support Slack." We say "this channel is not yet connected — here is the fallback, and here is a signal that we should integrate it." The missing adapter becomes a surfaced gap (a build/backlog signal for the Growth category), never a wall.

We considered the bare "the catalogue is best-effort and the core is channel-less" posture and rejected it: it is simpler, but it misses the owner who runs their whole business in one tool and turns an email-only round-trip into a silent objection. The chosen posture is the fallback plus gap-as-a-visible-item. That is what "we cannot say this channel is not supported" actually needs.

## The consent simplification — Swaraj's correction to my heavy framing

I had framed Q2 as "what is the consent record?" as if it were one heavy thing. Swaraj corrected it with a grammatical distinction.

The word "consent" does not mean one thing. What it means depends on *who is on the other side* and *which direction the message goes*:

| | Customer or prospect | Employee | External partner |
|---|---|---|---|
| **Replying** (the conversation is already there) | Implied. Stay on the current channel. No consent record needed. | Implied by the job. Use their chosen work lane. | Implied by the arrangement. |
| **Initiating** (reaching out) | Real gate: consent **and** channel window (WhatsApp template, email opt-in). | Not consent — the business's own authority over its people. | Business-controlled, scoped to what the task needs. |

Two simplifications fell out:

- **An active conversation is not the same as a new initiation.** A reply stays on the current channel and follows that channel's current rules. It does not become safe merely because the actor once sent a message.
- **An employee is not a consent problem.** Someone the business employs and expects to use Tend is reachable because of the job, not because they opted in. The employee channel question is a *logistics* question, not a permission question.

But two gates remain real, and we did not blur them away: **consent** and **what the channel lets you send** are separate gates, and the channel gate bites even when consent is clean. WhatsApp can say "template only" for a customer who would love to hear from us. Simplifying consent does not remove that gate; it removes one of the two.

So "consent record" from Level 1 was mis-framed as one thing. It is actually: who is on the other side, and which direction the message goes.
## The employee reachability shape

When Tend must start a conversation with an employee (needs a decision, an answer, an action), the lane is not a consent check — but it does need a shape. We decided:

- Each employee has a stored **reachability preference** (which lane they use) — same shape as Meetings' intent: stored, expiring, override-able.
- Tend always has a **guaranteed fallback lane** (email) that never gets blocked, so reaching an employee never dead-ends.
- Email is the always-anchor because it binds to a verified identity and is also how Meetings reaches them anyway (Google Meet / Zoom / any call needs an email). A workspace chat (Google Chat, or Slack/Teams if the business uses it) is the real-time action lane. WhatsApp may already carry an external conversation, but it remains subject to the channel's initiation rules whenever Tend starts a new interaction.
- Which lane is the default stays business configuration, per `global_market_readiness` (channels are adapters, not core logic).

## The business-initiated sequence

When the message must *start* a new conversation with an external actor (a customer update, nurture, feedback request, partner ask or business-directed prospect contact), the choose-channel rule is an ordered list, each rung gated:

1. The channel the actor has an open, permitted relationship on.
2. WhatsApp only if a template category matches (utility for operational updates) **and** consent exists.
3. Email — the safest initiate default (consent + unsubscribe).
4. If none can fire → that's a routing decision, not a failure: a human decides, or Tend waits.

Key consequence: **the preferred channel matters only for initiating, not for replying.** Replying stays where the conversation is. This is the Q3 answer, and it reuses the wait spine: an initiate window is itself a wait — it opens on an event (customer message / ad click), has a window length, and fires when it closes. Journey already used a channel window for nurture; we formalised it as a wait on the shared Coordination/Time spine.
## Q4 — the visibility question, grounded by corporate research

The fourth question (what each actor may see) had no prior answer. It required real research: how corporate workflow scopes visibility, and how to scale it down to SMBs and solopreneurs. Your raw thought was that the product builders should fix the visibility, not let businesses configure it, because open configurability is a compliance risk.

The corporate research gives a clear spine:

- **Corporate practice separates "what a person may do" from "what a person may see."** RBAC and helpdesk scope do different things: a Freshdesk agent has a role (permissions — actions) and a visibility scope (which tickets — data). Two knobs, both pointing at the person's job seat.
- **Privacy law makes default-scope mandatory, and it lines up exactly with keeping settings minimal.** GDPR Article 25 (data protection by design and by default) requires that "by default personal data are not made accessible without the individual's intervention to an indefinite number of natural persons." That is a legal demand that *default visibility be narrow*, not a wide-open settings surface.
- **India's DPDP (2023/25)** makes the **brand the Data Fiduciary**, liable for how processors and partners handle data. So the *minimum* is a legal line, and the *assignment* that decides who is let in belongs to the business, not to us.

### The distinction we had to separate

There are two different claims folded into "we configure the visibility, no configurability":

- **Fixed inside Tend (product builders): the scope model** — the roles, partner scopes, and the default "nobody sees more than the task needs." We write this. The business never builds a visibility matrix from scratch. (Your instinct.)
- **Chosen by the business, only as assignment:** which employee sits in which role, and which partner is engaged for which purpose. This cannot be removed. The law puts it on the fiduciary/controller. If we also picked the people and the partner engagements, we'd be taking away the very responsibility the law assigns to the business.
### The Path we chose: Path 2 — a narrow, governed white-list zone

We explicitly chose Path 2 (the middle option). It is worth being precise about the shape:

- **Roles and partner scopes are pre-written by Tend.** By default nobody sees more than the task needs.
- **The business gets a narrow, governed "widen within legal limits" zone.** They may choose a scope inside a white-list we define. They can always go *narrower*; cannot go *broader* than the legal floor.
- **Assignment (which employee, which partner for which purpose) is the business's call.** We define the range of what a seat may see; the business decides who holds the seat and which partner is engaged.
- Anything outside the white-list is **refused, and the need becomes a visible product signal** — not a silent grant, never a widening beyond the legal floor.

This is the answer to Q4. It lands on the existing core invariants: "business remains accountable" and "Tend only acts inside a granted range." The exact legal values hand over to Compliance & Security.

## The solopreneur seat — answered by a prior decision

In a one-person business there is exactly one seat, and the owner occupies it. Nothing to assign, no config screen to show. This is the same shape Authority already decided: a small business ships with a default range, and roles narrow it as the team grows. So the solopreneur default is simply "the operator sees what the operator needs to run the business" — determined, not configured. No open fork here.

## The boundary we re-scoped

Communication's documents (written before this category) said channel rules live at Level 3. That phrasing conflicts a little with our handoff, which says this category owns the channel. The reconciliation: there are two meanings of "channel rule."

- **What a channel permits** (can we initiate? reply? which window? which template category?) — a business-situation fact, and *belongs here*, at Level 2.
- **How a message is transported** (providers, delivery mechanics, the concrete adapters) — that's Level 3.

We own the permission leg; Level 3 owns the mechanical transport legs.

## Working decisions (short list)

- Tend's core never favours or picks a channel; the communication-manager adapter layer carries channels. Channel is transport, not business judgement.
- Every reply stays in the current channel.
- Initiating is the only gated case; it follows the ordered sequence (preferred → template+consent → email → human/wait). A blocked initiate is routing, not refusal.
- A fallback lane always exists + an absent channel is a visible gap. We never tell an owner a channel is unsupported.
- Active conversations and active business contacts are not all the same permission case. A new business-initiated external message must satisfy the applicable consent, purpose, source and channel rules.
- A channel window is a wait on the wait spine. Each channel's initiate window opens on an event and fires at a deadline.
- Employee reachability = reachability preference + a required fallback lane; which lane is a config.
- Actor visibility = "pre-written scopes + a narrow, governed widen zone + business assignment" (Path 2). Default is narrow by law.
- The exact legal floor carries to Compliance & Security; channel transport carries to Level 3.

## What we handed explicitly to later categories

- **Compliance & Security:** consent-as-law, the exact minimal scope for each market, the white-list legal ceiling, the DPDP/GDPR responses. We only planted the permission boundary here.
- **Level 3:** channel adapters, providers, Google Meet/Cal APIs, all mechanical delivery and transport.
- **Growth and Evolution:** the absent-channel/gap backlog signals, new adapters as they become available.

## A note on my own corrections

I corrected two over-framings of my own in this batch: the "pick a lane to reach an employee" framing, and the "consent is one heavy record" framing. Both were caught by Swaraj, and both corrections survive scrutiny. They are preserved here so they don't get lost in later reuse.

## Related

- Map of this category: [`understanding_all_channels_and_permissions_questions.md`](understanding_all_channels_and_permissions_questions.md)
- Channel facts: [`../../research/wa_compliance.md`](../../research/wa_compliance.md), [`../../research/channel_compliance_matrix.md`](../../research/channel_compliance_matrix.md)
- Market/channel adapters: [`../../research/global_market_readiness.md`](../../research/global_market_readiness.md)
- Authority default range: [`../authority_and_ownership/understanding_all_authority_and_ownership_questions.md`](../authority_and_ownership/understanding_all_authority_and_ownership_questions.md)
- Wait spine: [`../coordination/how_do_we_represent_work_that_is_waiting.md`](../coordination/how_do_we_represent_work_that_is_waiting.md)
- Visibility baseline: [`../explainability_and_observation/understanding_all_explainability_and_observation_questions.md`](../explainability_and_observation/understanding_all_explainability_and_observation_questions.md)
- External partner scoping precedent: [`../meetings_and_human_work/how_should_an_external_partner_be_contacted_when_the_business_has_not_acted.md`](../meetings_and_human_work/how_should_an_external_partner_be_contacted_when_the_business_has_not_acted.md)
So the first pass was mostly reuse. The genuinely new work was threefold: formalizing the channel window onto the wait spine, deciding what "consent" means in our product (much simpler than a heavy record), and building the visibility model from corporate practice down to the solopreneur.
