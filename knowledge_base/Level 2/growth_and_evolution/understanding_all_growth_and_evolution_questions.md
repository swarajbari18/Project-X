# Understanding all the Growth and Evolution questions

## Status

Working decisions recorded. The conceptual spine is settled. Remaining items are the first catalogue's contents, migration-notice defaults and per-market legal bounds — business configuration and later research, like every earlier category left its knobs.

This is the map for the Growth and Evolution category. The conversation record is [`growth_and_evolution_conversation_and_discoveries.md`](growth_and_evolution_conversation_and_discoveries.md).

## Why this category exists

Level 1's seven Growth questions look like seven separate problems. We found they are really two questions repeated over four kinds of thing:

- **How does something new become part of Tend?** (systems, channels, policies, workflows)
- **What happens when something that is already part of Tend changes?**

Underneath both sat one undefined word: "configuration". Every earlier category said "that's a knob" but nobody said what a knob is. This category does.

## The spine, in plain words

> **A capability is one purposeful action the business can switch on, chosen from a pre-built catalogue. New capabilities join through one lifecycle: request, evaluate, author, contract, validate, test, enable, monitor, retire. A situation runs the rule versions it opened under; facts, platform rules and who-may-act are always read live; a rule change is prospective and noticed, and its migration is a human decision.**

## The four planes of change

The change semantics live canonically in [`how_do_we_evolve_tend_without_breaking_existing_businesses.md`](how_do_we_evolve_tend_without_breaking_existing_businesses.md). In short:

| Plane | Who owns it | Behaviour |
|---|---|---|
| Facts and evidence | The world | Always live — the "latest known state" invariant is a *facts* invariant |
| Platform / external rules (channel windows, consent, availability) | The world | Live + interrupt; the fallback lane absorbs |
| Grants / authority (who may do what) | The business | Always live — a grant must be currently valid at the moment it is used |
| Business policies and workflows | The business | Pinned at situation open; change is prospective + noticed; migration is a human decision |

## The seven Level 1 questions and where each answer lives

1. **How do new business systems become part of Tend?** — As capabilities in a pre-built catalogue, through one join lifecycle (request → evaluate → author → contract → validate → test → enable → monitor → retire). Canonical for all joining: [`how_do_new_business_systems_become_part_of_tend.md`](how_do_new_business_systems_become_part_of_tend.md).
2. **How do new communication channels become part of Tend?** — A channel is a capability whose contract is the per-channel rule record from Channels; its rules are external and live. [`how_do_new_communication_channels_become_part_of_tend.md`](how_do_new_communication_channels_become_part_of_tend.md).
3. **How do new business policies become part of Tend?** — Typed, versioned records the business fills inside product-defined structures; pinned at situation open. [`how_do_new_business_policies_become_part_of_tend.md`](how_do_new_business_policies_become_part_of_tend.md).
4. **How do new workflows become part of Tend?** — Constrained procedures over the shared spine, versioned like process engines; an unbuilt workflow a business needs is a visible gap. [`how_do_new_workflows_become_part_of_tend.md`](how_do_new_workflows_become_part_of_tend.md).
5. **How do businesses customise without changing the core?** — The core/config boundary test; a typed configuration registry; the business fills values and assignment, the product pre-writes schemas and legal bounds. [`how_do_businesses_customise_tend_without_changing_its_core_behaviour.md`](how_do_businesses_customise_tend_without_changing_its_core_behaviour.md).
6. **How do we support businesses that operate differently?** — The variation axes are known and are all configuration, never core; the invariants are un-crossable by any configuration. [`how_do_we_support_businesses_that_operate_differently_from_one_another.md`](how_do_we_support_businesses_that_operate_differently_from_one_another.md).
7. **How do we evolve Tend without breaking existing businesses?** — The change-semantics spine (four planes) plus version lifetime, deliberate migration and additive product evolution. Canonical: [`how_do_we_evolve_tend_without_breaking_existing_businesses.md`](how_do_we_evolve_tend_without_breaking_existing_businesses.md).

## What the earlier categories contributed

- **Channels and Permissions** — the adapter layer, the per-channel rule record, the fallback lane, the visible-gap rule (an absent thing is a build signal, never a refusal).
- **Authority and Ownership** — the delegated range, the default range for small businesses, "the configurator cannot cross the invariants", the grant lifecycle (authority is live).
- **Decision Making** — what a policy must express; fallbacks explicit, versioned, traceable, safe.
- **Coordination / Time** — the wait spine, onto which the notice-and-migrate event is a wait.
- **Memory and Knowledge** — versions never silently overwrite; policy is not learned memory.
- **Gathering / Trust** — a new system is a new source and a new source of authority for claims.
- **Journey / Scaling (Level 1 §10)** — the same core for one person and a large team; differences are configuration.

## What this category does not decide

- The per-market legal values that bound policy structures and grant scopes (Compliance & Security).
- Connector transport, providers and concrete adapter mechanics (Level 3).
- Who holds each grant (Authority and Ownership).
- Whether a specific in-flight situation migrates to a new rule (the business decides; surfaced via Business View).
- Product rollout and rollback mechanics (Level 3, product operations).

## Remaining open

- Which capabilities ship in the first catalogue.
- Migration-notice default timing and how in-flight situations are aggregated for the owner's decision.
- The per-market legal bounds on policy structure and scope (Compliance & Security).

## Related

- Conversation record: [`growth_and_evolution_conversation_and_discoveries.md`](growth_and_evolution_conversation_and_discoveries.md)
- The join world: [`how_do_new_business_systems_become_part_of_tend.md`](how_do_new_business_systems_become_part_of_tend.md)
- The change world: [`how_do_we_evolve_tend_without_breaking_existing_businesses.md`](how_do_we_evolve_tend_without_breaking_existing_businesses.md)