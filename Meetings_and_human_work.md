# Meetings and Human Work — handoff prompt

Paste this at the start of a new chat, together with `conversation with swaraj.md` and `status_quo.md`.

---

We just completed **Journey and Lifecycle** and **Business View and Observation** — the two Level 2 categories that answer "who a person is against the situation graph" and "what the owner sees."

What we decided (the short version):

- The situation graph is our source of truth for the agent, the conversation, and the story — not a CRM, and not a customer-master record. We may write to an external CRM by business rules, but our situation graph stays ours.
- A person's **relationship** (prospect → customer → returning, or a stakeholder type) is **derived from the situation graph**, not stored in any separate record. Every new contact is **unknown first**, then asked-for or deduced, then tagged.
- Stakeholders (supplier, landlord, regulator, investor, journalist, helper) are held as ordinary **situations** with a relationship-type tag, shown to the owner as an obligations/asks ribbon — not a fourth lifecycle.
- Follow-up/nurture is in scope only for people who came to the business (value about what they asked, at a business-configured cadence); cold outreach is out of scope. Wait/CSW-FEP windows gate where nurture can happen.
- The **owner view** is a derived, cross-situation aggregate over the situation graph (business value, never operational metrics), with an owner-attention filter (owner-only decisions, owner-risking deadlines, drift escalations) and a layered risk model (deterministic base + LLM suggestions that land on a deterministic rule).

The full depth lives in the knowledge base: `Level 2/journey_and_lifecycle/`, `Level 2/business_view_and_observation/`, and `research/research_owner_stakeholder_journeys.md`.

Now I want to continue with **Meetings and Human Work** — the next Level 2 category.

## Ritual for the new chat

1. **First use `conversation with swaraj.md`** — it is a basic necessity and establishes the gravity of our conversation. Read it first.
2. **Then use `status_quo.md` to establish the status quo.** Read it, understand what establishing the status quo means, then read the knowledge base files relevant to where we are — especially the newly written Journey and Business View folders, plus the earlier categories these build on (Human Collaboration, Unknown/Situation, Coordination/Time, Authority and Ownership, Communication, Explainability/Observation). Get truly standing in the current state, not repeating a summary.
3. **Then apply the Level 2 framework and the Level 2 method** on the Meetings and Human Work questions (level2_method.md).
4. **Do not write knowledge base files yet.** Establish the status quo and reason together first. Only when I give the go do you write.

## Starting pointers for this batch

- **Level 1** "Meetings and Human Work" section in `Level1_Problem_Framing_or_Expansion.md` is the question source.
- **Human Collaboration** (earlier category) carries the human-participation lifecycle and the routing-to-role/group/queue/partner machinery; Meetings extends it into scheduling and meetings as work. Read its map and conversation-discoveries record.
- **Journey and Lifecycle** (just written) hands this category off; its docs already point at "Meetings and Human Work" as the natural next stop. Scheduling and meetings are flagged as a gap in `research/business_journeys_map.md` (availability> meeting-type taxonomy, no-shows/reschedules/cancellations, who owns the next step after a meeting).
- **Unknown/Time** (the shared wait spine) is what a scheduled meeting's wait must reuse — availability and the meeting itself are cases of the same wait/decision-machine.
- **Authority and Ownership** and **Human Collaboration** own who may book / who is accountable; meetings create work and follow-up.
- **Channels and Permissions** and **Compliance & Security** are separate later categories; don't pull them in here.

## Method reminders

- Apply `level2_method.md` (status quo first, reuse-and-mine the KB, work with my raw thought, readiness-gate before writing).
- When writing, follow `file_writing_instruction.md` and the folder conventions (conversation/discoveries record + "understanding_all_*_questions.md" map + one doc per question).
- Keep it conceptual and technologic-neutral; leave Level 3 (scheduling providers, calendar APIs) out.
- End the batch by updating `status_quo.md` and writing the next `handoff` at the root.