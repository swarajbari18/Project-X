# Handoff — Default Authorization Range Research

## What this is

A handoff instruction for the next research run on **Tend's default authorization range**. Start here in a fresh context; do not assume the conversation state. Everything you need to continue is in this project, and the key files are listed below.

## The settled context (do not re-litigate)

Tend is a communication layer that helps a business understand a customer situation, gather and verify information, decide the correct next step, and escalate when a person must act. It is built through a three-level framework: Level 1 frames the problem, Level 2 decides concepts without choosing technology, Level 3 picks the tech.

The product is not a fixed static set of flows. It is a **decision layer** that must scale from a solo founder to a corporate by **composition**: the same core engine, more roles, deeper approval ladders, more routing, more compliance weight. Small business is the simplified case of corporate, not a different product.

There are two kinds of rule, and we worked them apart:

- **Business rules** are fully configurable. Which steps are required, who sees what, refund policy, etc.
- **Product invariants** are the behavioural hard line of Tend. "Tend never guesses." "Tend never presents its interpretation as a sourced fact." "Tend does not push confidential data outside the business boundary." Invariants are **hard and unbreakable** — even the configurator cannot configure around one. New behaviour comes only as a product feature built inside the invariants.

And two decisions that are **settled**:

1. **The delegated-range boundary model.** Tend owns nothing. The business grants Tend a range of authority. Tend acts freely inside the range, never above the delegator. Outside the range it asks / escalates. The effective permission is *intersection* of (what the configurator granted) × (what each owning system allows) — Tend can only ever reduce access, never expand it. This maps to the "delegation not impersonation" pattern in zero-trust agent practice.
2. **Only the configurator grants.** The person who signs up (business owner) or an explicitly-assigned configurator is the only one who can change grants. Employees and customers cannot self-grant. This is separation-of-duties / least-privilege practice. The configurator's agent has a distinct *business configuration capability* that every other agent lacks.

## The question you are researching

Tend **ships with a default authorization range** so a fresh small business can use it without configuring everything. That default is what you are researching.

The default is not "everything allowed" and not "nothing allowed." It is a careful default for a solo-founder-size business, built to match how small businesses actually operate.

Your job: **make this default concrete and evidence-grounded**, and define how it changes (compositionally) as a business grows. This is a **research task**, not an implementation task — do not decide the tech stack.

## What is already provisionally recorded

In `knowledge_base/Level 2/authority_and_ownership/who_may_grant_authority_and_what_comes_by_default.md`, the provisional default is:

- **allowed by default**: read and understand what is already in the connected business systems; communicate within connected channels following channel rules; maintain Tend's own situation model (no external grant needed).
- **per-call approval by default**: anything that writes to a system that owns business records, sends a message on behalf of the business, spends money, commits, or discloses protected/confidential data.
- **not allowed by default**: writing to systems that own business records without explicit grant; creating cross-visible external records (tickets others see); sending on the business's behalf; accessing records marked confidential.

These provisional items need to be made concrete and grounded... not invented.

## The trap to avoid (spoken explicitly by Swaraj)

**"Read-only is not silently safe."** In real products (Claude Code, Cursor) reads of non-sensitive files are auto-allowed, but in Tend **a read can BE a disclosure.** Reading confidential data to evaluate a situation is not harmless just because nothing is modified. So the research default must NOT copy coding-agent "read = safe." The default must be driven by *consequence and disclosure*, not by read vs write.

## The trap to avoid (my last turn)

Do **not** copy prompt-magic / system prompt ens. Tend's loop engineering is its own.

## What to research

**1. What does a small business actually want Tend to do out of the box?**
The existing `RESEARCH_BRIEF.md` and `smb_vs_corporate_scaling.md` (both in `knowledge_base/research/`) already contain the SMB reality: owner is bottleneck, personal WhatsApp as business channel, low volume but high fragmentation, informal escalation, no SLA, few staff. Use this as the *demand-side* grounding for what Tend should handle by default (the "don't miss a message / reply fast / find context" jobs).

**2. Default-permission patterns in real small-business software.**
Study how actual SMB/CRM/support tools define default roles. What a new user gets vs what requires a click. For a small business, "owner/admin sees everything, others get role-based limits." Where is the line Tend should default to?

**3. Sensitive-vs-allowable disclosure defaulting.**
Ground the "needs per-call approval" list in compliance/channel reality. Use `channel_compliance_matrix.md` and `wa_compliance.md` — e.g. WhatsApp 24-hour window, proactive template rules, Telegram no-cold-initiate, email consent for nurture. These **compliance constraints are hard or business-config barriers, and they must be part of the default range**.

**4. How the default composes as the business grows.**
Use `smb_vs_corporate_scaling.md`: the core does not change, only the dimensional extensions (roles, approval-depth, SLA/severity, routing topology, audit weight). Your answer must say the default range *narrows* as roles multiply (the "read everything" default is only safe while one owner is everything). Same shape, fewer knobs; a large business narrows the default and assigns roles.

**5. The identity-strongest coupling (provisional).**
Downstream, what the default range leaks into the identity join: a fresh SMB reads everything *because* one owner sees everything; a corporate cannot guarantee a single owner/reader. Note this seam for later but do not force it now (grant-end / identity-join are separate open docs).

## The assembly that would settle the default range

At the end of the research, the default range should be stated as a **set of defaults at authorization decision boundaries**, each with an evidence-based default, and a note on when each default changes (small vs corporate). Format should look like a draft for `who_may_grant_authority_and_what_comes_by_default.md` but with sources.

| Decision | Default for fresh SMB | Scales to corporate by | Evidence / source |
|---|---|---|---|
| read & understand connected data | allowed | narrows / per-role scoping | SMB single-owner reality; disclosure-risk note |
| communicate within channel rules | allowed (channel-constrained) | same, more channel tiers | channel_compliance_matrix, wa_compliance |
| write to a record-owning system | per-call approval | multi-level approval gates | approval/authority depth from smb_vs_corporate |
| reveal confidential/protected data | blocked per-call | higher approval + role | privacy + least privilege |

This table is a live deliverable, not a fixed one.

## Make your work traceable

Do research with links and sources. Keep findings that change the default as **research** first. When you have a proposed default set, update `who_may_grant_authority_and_what_comes_by_default.md` (and any scaling notes), and link back to this research file. Do not overwrite the conversation record (`authority_and_ownership_conversation_and_discoveries.md`) — that stays as the walkthrough.

## Do not put technology decisions in the default

The default is a business-configuration default, not a product invariant. It is "what does the system allow before anyone configures." It can include which capabilities exist and how tools gate actions, but it is NOT a stack choice (no naming databases, no picking a permission-engine name). Keep it concept-level.

## Do not decide the following (leave them visible, not settled)

- Whether every business work item needs a single accountable owner (still open).
- The exact identity↔authority runtime join (still open, separate).
- The "delegated configurators in large orgs" pattern (research only, not assumed).
- How "wait when no approver" ties to Coordination/Time (still a later category).

## What you should return

1. An evidence-grounded recommended defaults set (the live table above, resolved).
2. Which provisional defaults got confirmed, and which had to change, and why.
3. The scaling path from SMB default to corporate (compositional, not a redesign).
4. A flag of the research still genuinely open / the riskiest assumption.

## First move

Open `knowledge_base/research/smb_vs_corporate_scaling.md` and `RESEARCH_BRIEF.md`, plus the authority docs under `knowledge_base/Level 2/authority_and_ownership/`. You are continuing a shared body of work — do not restart from zero. State the gaps you found and your proposed answer for the SMB's default Tend outset, then identify the 2-3 research questions that would most change the default.
