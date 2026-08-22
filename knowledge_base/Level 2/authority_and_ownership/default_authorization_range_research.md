# Research — Tend's default authorization range for a fresh small business

## What this document is

This document records the evidence and the reasoning that settle Tend's default
authorization range for a fresh small business. It is the research companion to
`who_may_grant_authority_and_what_comes_by_default.md`, which is where the decision lives.

It continues the handoff in `knowledge_base/research/default_authorization_research_handoff.md`.
The conversation record (`authority_and_ownership_conversation_and_discoveries.md`) keeps the
walkthrough.

What this document is not:

- It is not a technology decision. No stack, no permission-engine names. The default is a
  business-configuration default, concept-level, driven by consequence and by how a small
  business actually behaves.
- It does not carry undecided threads. Where a question belongs to another document or later
  category, this file points to where it is settled rather than leaving it open here.

## The product frame the default comes from

The default is not picked out of a safety gate. It comes from what Tend is, stated in the
product vision:

> Tend is a communication layer that understands the business, decides the next correct
> step, and when something can be answered it responds or performs the required action —
> and when something cannot be answered safely, it asks a person instead of guessing.

So the default range is the least authority Tend needs to do that job for a fresh small
business. The product decides the direction of every boundary below; the range states it.

## The two traps the default must not fall into

Two traps were named during the research, and they shape every default below.

1. **Read is not silently safe.** In a coding agent, reading your own files is safe because
   nothing is disclosed to a third party. In Tend, a read is not harmless, because trying
   to *understand* a situation can leak outward later. So the default is not built on
   read-vs-write. It is built on consequence and disclosure: what Tend may see is one
   line, and what Tend may *reveal* outward is a different line that stays blocked.
2. **No prompt-magic.** Tend's enforcement is structural. A deterministic configuration and
   control layer sits between the proposed action and any real effect, and the default is
   not a system prompt that begs Tend to be careful. It is what the business grants.

## The job a small business wants on day one

The demand side is proven in `research/smb_vs_corporate_scaling.md`,
`RESEARCH_BRIEF.md` and `escalation_sla.md`. A fresh small business does not want a ticket
desk. It wants three jobs the owner cannot cover alone:

- **Do not miss a message.**
- **Reply fast.**
- **Find the context (the order number, the history) without being asked twice.**

The small-business reality that grounds these: the owner is the bottleneck, personal
WhatsApp is the business channel, volume is low but fragmented across channels, escalation
is informal (no SLA, "whenever the owner gets to it"), and after-hours DMs arrive because
customers message when they have a minute. Response-time is money: first response under
five minutes is roughly an 8x conversion edge, and a large share of companies never reply at
all (sourced below).

So the out-of-the-box range is built around one pair: **an inbound message has one owner
(the business owner), and the cost of a wrong move is usually that a customer feels ignored
or gets a wrong promise.**

## The channel wall is part of the default range

A default that "communicates" is not one rule. The channel decides it, and the channel's
rules are already the default range — Tend cannot invent a freer channel than the connected
channel allows. From `research/wa_compliance.md` and `research/channel_compliance_matrix.md`:

- **WhatsApp.** Reply freely (non-template) only inside a 24-hour Customer Service Window
  opened by a customer message. Outside that, a business cannot initiate; it must use an
  approved template (usually with opt-in), and marketing templates are charged.
- **Telegram.** A bot cannot start a conversation. A user must message or add the bot first.
  No cold initiating.
- **Email.** A business may initiate with consent and an unsubscribe. That is why
  *proactive* work (nurture, feedback, follow-up) lands on email by default, not WhatsApp.
- **Web chat / widget.** User-initiated sessions; no cold outbound.

The consequence: an allowed-by-default Tend can **reply inside a live conversation** (within
the window, after the user wrote, in an existing thread), but **cannot launch a new
conversation on WhatsApp or Telegram**. That split is not a business preference; the platform
holds the door closed. So the default's "communicate" is already two authorisations, and the
two of them land differently in the final table.

## What real small-business tools default roles to

I looked at how actual support tools a small business adopts start a new workspace. The
pattern is consistent (sources at the end):

- **Zendesk Support.** The account owner / administrator starts with broad access to all
  tickets and to the settings (business rules, automations, SLAs, apps). An agent is not
  like that by default: the agent sees only the tickets of their group or of their own, and
  access is set on the profile. An agent is promoted by an admin; an agent cannot elevate
  itself.
- **Intercom.** The guidance for a new team is the same shape: at least one "Super admin"
  with complete access, and individual contributors get a limited role (their conversations
  or assigned-only), not all conversations and not all settings. A teammate holds one role
  at a time.

The transferable finding is not the ticket UI; it is the **access shape**:

> In real small-business software, the account owner starts wide and every other person's
> access is carved down from there. Nobody broadly elevates themselves; only the account
> owner or an appointed admin changes anyone's access.

That matches Tend's settled model exactly: the signup owner / configurator is the only
granter, and "one wide account, everyone else narrower" is normal, not exotic. It does not
decide Tend's defaults; it confirms the shape is already the norm small businesses have seen.

## Least privilege: the agent can only reduce, never expand

The settled model already uses "delegation not impersonation." The source I checked makes
it precise:

- Effective agent permissions = the person's permissions **∩** the agent's capabilities.
- Each hop narrows; an agent only ever reduces access, never raises it.
- With no person in the chain, there is no access at all — the agent is not autonomous.

For the default this matters in one word: **intersection.** Tend's default can read what the
business itself can read, and only that. No default grant pushes Tend past what the
business's own access allows. A small business has one owner who sees everything, so Tend's
read default is as wide as that one owner — which is exactly why the read default is
*allowed* now and *narrows* the moment more roles exist.

## The default range, settled

Here is the handoff's live table, now resolved as a set of decisions. Each row says what the
default is for a fresh small business, the condition that keeps it safe, how it composes as
the business grows, and where the grounding lives.

| Decision boundary | Default for fresh SMB | The condition that keeps it safe | As the business grows | Grounding |
|---|---|---|---|---|
| Read existing data into understanding | **allowed**, capped by the business's own access | a read feeds no outward step; reveal stays blocked | narrows per role; intersection caps every reader | single-owner reality; disclosure trap; least-privilege |
| Reveal data outward (to customer, partner, group) | **not allowed by default** | disclosure is a gate separate from reading | role-gated; needs consent; more approval | `gaps_beyond_rant` sharing-contract point |
| Reply inside an open, non-committal conversation | **allowed — Tend sends it** | the SMB job: never miss / reply fast; the reply does not commit the business | same, more channel tiers + brand rules | WhatsApp window; reply-speed data; product line |
| Initiate / nurture / promote a new conversation | **not free; channel-bound** | must use the compliant channel (email first, with consent) | more lists and tiers, always consent | wa_compliance; channel_matrix |
| Write / mutate a record-owning system | **per-call approval** | mutating the business's own truth; a wrong write is audible | multi-level approval gates | order-status / WISMO playbook |
| Spend money or commit the business | **always a decision, never auto** | refunds/returns are high-stakes and policy-scoped | higher authority + role | `gaps_beyond_rant` refund point; product line: Tend does not commit |
| Create records that another role/party can see | **not allowed** | cross-visibility is a leak; nobody asked for it | visibility is set by role, never wider than deserved | default-role shape from tools |
| Maintain Tend's own situation model | **allowed**; its own domain | internal only — never the vehicle for an outward reveal | same | own-domain principle |
| Apply a channel's hard rule that blocks | **the channel rule wins** | platform law, not business preference | same | wa / telegram rules |

## What the product vision resolves, stated plainly

The conversation flagged three "open" spots. Reading the product vision settles all three,
and the settled default is recorded above. For the record:

1. **Does Tend auto-send or draft an in-conversation reply?** Tend is the reply layer. When
   it can answer without inventing, it sends the reply. It asks a person when the reply
   would commit the business, needs a guess, or pushes a decision a person owns. The draft
   mode is a configurable watch-affordance, not the default. **Decision: Tend sends, inside
   the range.**
2. **When does "one owner reads everything" stop being safe?** It does not stop being safe
   because of a count of readers. The read default is as wide as the business owner's own
   access, and the *reveal* default is blocked regardless of how many readers there are.
   Reading narrows by role because roles are the way access narrows — not because a
   headcount alone makes a read dangerous. The earlier worry about a crossing point was a
   false scare; gone.
3. **Where does a reply stop being harmless talk and become a commitment?** The line is set
   in the invariant boundary, not left to Tend to judge: Tend does not commit the business.
   A reply that would obligate the business exits the default range at the gate.
   **Decision: set by the invariant; a commitment is never in-range.**

## Does the "still open" list stay open?

No. Each item that the handoff listed as still open belongs to a different document or later
category, where it is already answered or will be answered there — not unresolved inside
this default:

- **"Does every work item need a single accountable owner?"** — decided in the human
  collaboration and the accountability question: every work item resolves to a concrete
  target (a person, a role, a queue). It does not block the default. See
  `human_collaboration` and `who_remains_accountable_after_an_automated_action`.
- **"The identity↔authority runtime join"** — answered in `how_do_identity_and_authority_join.md`.
  The default's read width intersects a verified identity. Not this document's field; that
  one is its own.
- **"Delegated configurators in large orgs"** — a scaling question owned by the
  default-mapping / role-configuration work. The fresh-business default does not need a
  second granter; that is a later extension.

- **"Wait when there is no approver"** — owned by the Coordination/Time later category.
  It affects execution state, not what the default range is.
## Scaling path from the small-business default to a corporate

The default is one instance of the same grant machinery; it does not redesign. One rule plus
the dimensional extensions from `research/smb_vs_corporate_scaling.md` carry it:

> The default read range is as wide as the widest single credible reader the business can
> grant. A solo owner → the whole business. Add a role → that role's default is narrower, and
> the whole narrowing is set by how the configurator carves roles. At corporate size, no
> single reader sees everything, so every role's default narrows and visibility becomes
> per-role.

Everything else extends compositionally, never by a new core:

- **Approval depth.** Per-call approval for writes becomes multi-level gates for the same
  capability.
- **Channel tiers and brand rules.** Reply-in-conversation stays, with more channel-consent
  and brand-voice tiers.
- **Compliance weight.** The same channel rules accumulate consent records, audit and
  regulatory weight.
- **Visibility.** "no record visible to others" becomes "visibility is set by role," never
  wider than the reader deserves.

The default always **narrows** as distinct roles and readers grow. Same shape, fewer knobs
at the bottom; more knobs, narrower defaults at the top.

## The one honest limit — the configurable part

The product vision decides the direction and shape of every boundary. It does not decide
the value of one *configurable*: exactly which replies a particular business auto-sends.
That is the normal config part the model already established — a settled default with a knob
the configurator can turn. It is not an undecided decision; it is the difference between a
product default and a business override.

## Traceability and sources

Repo grounding (read, not re-litigated): `research/smb_vs_corporate_scaling.md`,
`RESEARCH_BRIEF.md`, `research/escalation_sla.md`, `research/gaps_beyond_rant.md`,
`research/wa_compliance.md`, `research/channel_compliance_matrix.md`, and the authority
documents under `authority_and_ownership/`.

External sources fetched during this run:

- **Zendesk Support — standard user roles.** Account owner/admin: all tickets + settings.
  Agent: group- or self-scoped by default; promoted by an admin, never self-elevates.
- **Intercom — custom roles with recommended permissions.** At least one "Super admin" with
  complete access; individual contributors get a limited role (their conversations /
  assigned-only); one role per teammate.
- **Red Hat — Zero trust for AI agents: why delegation beats impersonation.** Effective
  permissions = user permissions ∩ agent capabilities; agents only reduce access; no user
  in chain = no access.
- **Reply-time data** (already in repo, re-cited): first response <5 min ≈ 8x conversion
  (XANT/HBR figures in `RESEARCH_BRIEF.md`); a lasting share of companies never reply. The
  launchable "5-min beat" claim comes from Drift (2017) in `channel_compliance_matrix.md`.

This research grounds the decision. The decision itself is recorded in
`who_may_grant_authority_and_what_comes_by_default.md`, which links back here.