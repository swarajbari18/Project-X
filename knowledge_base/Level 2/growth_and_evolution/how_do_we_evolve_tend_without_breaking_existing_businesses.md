# How do we evolve Tend without breaking existing businesses?

## Where this question came from

Level 1's final Growth question: how does Tend itself change — new systems, channels, policies, workflows, capabilities — without breaking the businesses already running on it. This document is the canonical home of change semantics for the whole category. Every other document in this folder points here for "what happens when something changes".

## The decision, in plain words

What happens to a situation already in flight when something changes depends on *what* changed. There are four kinds of change, and they behave differently.

1. **Facts and evidence — always live.** A situation always re-reads the latest information. "Tend always works with the latest known state" is a *facts* invariant: its own text says "latest information available". We do not version reality.
2. **Platform and external rules** (channel windows, consent, connector availability) — **live and interrupt**. These are set by the world: WhatsApp, Telegram, providers, the law. When they change, the situation wakes on the wait spine, re-checks what is now allowed, and uses the fallback lane if needed. Pinning a platform rule would be pretending the world did not change — and pretending is guessing.
3. **Grants / authority** (who may do what) — **live**. A granted right must be currently valid at the moment it is used. This was decided in the Authority category: the grant lifecycle resolves a grant to a currently-valid holder. A revoked grant stops working immediately; in-flight work that needed it escalates or waits. It is never exercised on stale authority.
4. **Business policies and workflows** — **pinned at situation open, with deliberate migration**. A situation opens with the version of each policy and workflow that governs it — its **rule context**. When the business changes one, the change is prospective and noticed: in-flight situations under the old version are found by a notice wait (a wait on the spine with a reason and a deadline) and shown to the owner, who decides keep or migrate. Nothing is retroactive, nothing is silent, nothing is forced.

## The rule context

Every situation records, at its start, the versions of the policies and workflows that govern it. That context is part of the situation record, so every decision can be traced: "this refund was handled under policy v2, step 3 of workflow v4, and its approval was checked against the grants valid at that time". The rule context only changes through a deliberate migration, which is itself recorded and attributed to the person who decided it.

## Three walkthroughs

### The refund change (policies and grants)
Monday: a situation opens under policy v2 (auto-approve under ₹5000); the grant allows it.
Tuesday: the business activates v3 (owner approval above ₹2000) and revokes the auto-approve grant.
- New situations: v3 straight away.
- In-flight situations: the notice wait fires; the owner sees "3 refunds run under v2 — keep or migrate?" The grant plane is live, so no in-flight refund can auto-approve ₹5000 even under v2. The owner migrates those situations to v3 or re-approves them individually. Every step traceable.

### The WhatsApp change (platform rules)
Meta changes a window. The per-channel rule record updates as a fact; the wait wakes the situation; the situation re-checks and either sends inside the new window, uses a template, or uses email. It never pretends the old window exists.

### The product adds a capability (product evolution)
Tend ships a new capability (say, a partner-investigation flow) and validates it in the Simulation environment before it reaches production. Existing businesses are not forced to reconfigure: until a business enables it, it is a visible gap with a fallback. A business that never enables it is unaffected. Product rollout and rollback of behaviour is the product's operational concern — a feature-flag-like plane inside the product's own operations, never a tenant configuration.

## Why not the other two options

- **Always-live for business rules**: the "reply drafted under v7, sent under v8" case — one situation, one step, two different outcomes, and no stable traceable story. Breaks explainability, and breaks the Decision Making goal that equivalent situations reach consistent decisions.
- **Pin everything**: a revoked approver keeps approving. That is a security hole, and it contradicts the Authority category's grant lifecycle.

## When a capability is retired or a system replaced

Retirement follows version lifetime: a rule version stays alive until its in-flight situations resolve or the business chooses a deliberate cutover. Camunda and Stripe both work this way — old versions stay alive while pinned instances and clients drain. If a provider deprecates the connector itself, that is an external-live event: the fallback lane absorbs, the gap becomes visible, and the business decides whether to migrate to a new system. A replacement system joins as a new capability; in-flight situations migrate deliberately, never silently.

## Evaluation criteria (how we know it stays good)

- Every situation can answer "which version of which rule governed this step".
- A business config change never silently alters an in-flight situation's course.
- A platform change never silently breaks a situation — it wakes, falls back, re-evaluates.
- A revoked grant is never used.
- New capabilities need no core change and no tenant reconfiguration.

## The boundary

- The legal values that bound the white-list and policy scopes: Compliance & Security.
- Rollout and rollback mechanics: Level 3 product operations.
- Who decides migration in a given situation: the business, surfaced through Business View and Observation.

## Working decision

Tend evolves without breaking businesses by separating four change planes: facts are live, platform rules are live and interrupt, grants are live, and business policies and workflows are pinned at situation open with prospective, noticed change and deliberate human migration. The situation's rule context makes every governed step traceable. Retirement drains old versions; provider deprecation is an external-live event absorbed by the fallback lane.

## Related

- The four planes as a table: [`understanding_all_growth_and_evolution_questions.md`](understanding_all_growth_and_evolution_questions.md)
- Join lifecycle: [`how_do_new_business_systems_become_part_of_tend.md`](how_do_new_business_systems_become_part_of_tend.md)
- Grants that drive plane 3: [`../authority_and_ownership/understanding_all_authority_and_ownership_questions.md`](../authority_and_ownership/understanding_all_authority_and_ownership_questions.md)
- The wait spine a notice wait lives on: [`../coordination/how_do_we_represent_work_that_is_waiting.md`](../coordination/how_do_we_represent_work_that_is_waiting.md)