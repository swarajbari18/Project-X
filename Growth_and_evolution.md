# Growth and Evolution — handoff prompt

Paste this at the start of a new chat, together with `conversation with swaraj.md` and `status_quo.md`.

---

We just completed **Channels and Permissions** — the Level 2 category for what a business may send on each channel and what each person may see.

What we decided (the short version):

- The core is **channel-agnostic**: a communication-manager adapter layer carries every message on whatever the business already uses; channel is transport, not business logic. We never tell an owner a channel is unsupported — a **fallback lane always exists** (email) and an **absent channel is a visible, first-class gap** (a build/backlog signal), never a refusal.
- **Consent is directional, not one heavy record.** An active conversation and an employee are not consent problems. Consent genuinely matters only for *customer-initiated outbound* contact, where it must be combined with the channel window (two gates).
- **Reply stays in the current channel.** Starting a message follows an ordered, gated sequence: preferred consented channel → WhatsApp template+consent → email → human/wait. A channel window is a **wait on the shared Coordination/Time spine**.
- **Employee reachability** = a reachability preference (Meetings' stored-expiring-overrideable shape) + a guaranteed fallback lane.
- **Actor visibility (Q4) = Path 2.** The product pre-writes role and partner scopes with a *narrow default* (legally required by GDPR Article 25 / DPDP), the business gets a **narrow, governed "widen within legal limits" white-list zone**, and *assignment* (which person in which role, which partner engaged) is the business's call because the law makes the business the fiduciary. Anything outside the zone is refused and surfaced.

The full depth lives in `knowledge_base/Level 2/channels_and_permissions/`, with a new conversation record, the `understanding_all_channels_and_permissions_questions.md` map, and one doc per question. The channel facts were already in `research/wa_compliance.md` and `research/channel_compliance_matrix.md`.

Now I want to continue with **Growth and Evolution** — the next Level 2 category.

## Ritual for the new chat

1. **First use `conversation with swaraj.md`** — it is a basic necessity and establishes the gravity of our conversation. Read it first.
2. **Then apply `status_quo.md` to establish the status quo.** Read it, understand what establishing the status quo means, then read the knowledge base files relevant to where we are — the channels folder plus the categories Growth builds on (Journey/Lifecycle on markets, Channels on adapters, Authority on the default range, the wait spine). Stand in the current state, not repeating a summary.
3. **Then apply the Level 2 framework and the Level 2 method** on the Growth and Evolution questions (level2_method.md).
4. **Do not write knowledge base files yet.** Establish the status quo and reason together first. Only when I give the go do you write.

## Starting pointers for this batch

- **Level 1** "Growth and Evolution" section in `Level1_Problem_Framing_or_Expansion.md` is the question source: how new business systems, channels, policies, workflows and businesses become part of Tend, and how Tend evolves without breaking existing businesses.
- **Channels and Permissions** (just written) planted two strands Growth must carry: the **absent-channel/first-class-gap** signal (new adapters as a build backlog) and the **communication-manager adapter layer** that new channels plug into.
- **Journey and Lifecycle** already held the "small business → large team is the same shape, more configuration" decision, and **global_market_readiness.md** already named the universal-core / per-market-config idea that Growth must honour.
- **Coordination / Time and the wait spine**: Growth is partly "how do new capabilities attach to the existing spine without breaking it," so the wait spine and the Coordination map are prerequisites.
- **Compliance & Security** comes after Growth, feeding Architecture; Growth's "evolve without breaking existing businesses" decisions will constrain that batch.

## Method reminders

- Apply the `level2_method.md` (status quo first, mine the knowledge base, work with my raw thought, keep business-configuration knobs out of the core).
- When writing, follow `file_writing_instruction.md` and the YAML/`.md` folder conventions (conversation-record + `understanding_all_..._questions.md` map + one doc per question).
- Keep it conceptual and technology-neutral; concrete adapter/plugin mechanics belong to Level 3.
- End the batch by updating the root handoff so the next chat (Compliance & Security, then Architecture) starts from the truth.
