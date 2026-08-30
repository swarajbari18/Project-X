# Compliance and Security — handoff prompt

Paste this at the start of a new chat, together with `conversation with swaraj.md` and `status_quo.md`.

---

We just completed **Growth and Evolution** — the Level 2 category for how new things become part of Tend and how Tend evolves without breaking existing businesses.

What we decided (the short version):

- **A capability** is one purposeful action the business switches on from a pre-built catalogue (a connectors menu: a HubSpot capability, a Salesforce capability, a Shiprocket capability...). Capability authoring is **product-team work** over the connector's tool definitions (their docs / MCP-style catalogues). **No LLM-led auto-integration** — the LLM never decides what a connector may do or whether it activates.
- **One join lifecycle** for systems, channels, policies and workflows: request → evaluate → author → contract → validate → test → enable → monitor → retire. Absent capabilities are visible, first-class gaps (build signals) with a fallback lane, never a refusal.
- **A typed configuration registry** is what a "knob" is: the product pre-writes schemas, the catalogue and the legal bounds; the business fills values and assignment inside validated structures; the invariants are a hard line no configuration crosses. The core/config test: *if a knob needs core change, it was mis-categorised*. The chosen design is the *phasing* version: pre-written templates + parameters first.
- **The change-semantics spine has four planes** (canonical: `how_do_we_evolve_tend_without_breaking_existing_businesses.md`): facts are **live**; platform/external rules (WhatsApp windows, consent, availability) are **live + interrupt** with the fallback absorbing; grants/authority are **live** (a grant must be currently valid — Authority already decided this); business policies and workflows are **pinned at situation open** with a notice wait on the spine and **deliberate human migration** toward the new version. The two "latest state" invariants are *facts* invariants — they say "information", not "rules".
- Policies and workflows are now cleanly separated from grants: grant = who may; policy = under what conditions; workflow = the ordered steps.

The full depth lives in `knowledge_base/Level 2/growth_and_evolution/`, with a new conversation record, the `understanding_all_growth_and_evolution_questions.md` map, and one doc per question. Two strands were explicitly handed to us: **the per-market legal bounds on policy structures and grant scopes** (Growth → Compliance & Security) and **the white-list legal floor** (Channels → Compliance & Security).

Now I want to continue with **Compliance and Security** — the next Level 2 category.

## Ritual for the new chat

1. **First use `conversation with swaraj.md`** — it is a basic necessity and establishes the gravity of our conversation. Read it first.
2. **Then apply `status_quo.md` to establish the status quo.** Read it, understand what establishing the status quo means, then read the knowledge base files relevant to where we are — the growth_and_evolution folder plus the categories Compliance builds on (Channels on the white-list and consent-as-law, Authority on the grant scopes and the configurator line, Growth on the legal bounds of configuration, plus the research files on channel compliance and market readiness). Stand in the current state, not repeating a summary.
3. **Then apply the Level 2 framework and the Level 2 method** on the Compliance and Security questions (`level2_method.md`).
4. **Do not write knowledge base files yet.** Establish the status quo and reason together first. Only when I give the go do you write.

## Starting pointers for this batch

- **Level 1** "Complaince and Security" section in `Level1_Problem_Framing_or_Expansion.md` is the question source: what are the compliances of each actor and each tech stack we will use; how to make the product secure and the best security practices; and a security-audit framework I can apply at each point to find gaps in compliance and security.
- **Channels and Permissions** planted the legal floor: consent-as-law, the exact minimal scope per market, and the white-list legal ceiling (GDPR Article 25, DPDP fiduciary) — now our job to make real.
- **Authority and Ownership** planted the grant scopes, the default range, and the "configurator cannot cross the invariants" line — the security side of who can configure what.
- **Growth and Evolution** planted the legal bounds on policy structures and grant scopes, the connector/capability lifecycle, and per-market configuration — each of those has a compliance leg.
- **Research already present**: `wa_compliance.md`, `channel_compliance_matrix.md`, `global_market_readiness.md` (data residency, PIPL, GDPR, CAN-SPAM/TCPA, PDPL), `escalation_sla.md`, `observability_explainability_and_finetuning_research.md`.
- **Actors matter for compliance**: customer, prospect, employee, owner, business systems, partners, communication platforms, identity providers, external services — each has a different compliance relationship. The audit framework will need to walk actor-by-actor, capability-by-capability.

## Method reminders

- Apply the `level2_method.md` (status quo first, mine the knowledge base, work with my raw thought, keep business-configuration knobs out of the core).
- When writing, follow `file_writing_instruction.md` and the YAML/`.md` folder conventions (conversation-record + `understanding_all_..._questions.md` map + one doc per question).
- Keep it conceptual and technology-neutral; concrete audit tooling, providers and compliance controls belong to Level 3.
- End the batch by updating the root handoff so the next chat (Architecture, which needs the reserved agent-memory and prompt-engineering research threads first) starts from the truth.