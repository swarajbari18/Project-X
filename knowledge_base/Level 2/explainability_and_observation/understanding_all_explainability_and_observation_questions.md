# Understanding all the Explainability and Observation questions

## Status

Decided — working decisions recorded after the walkthrough. The conceptual spine is settled; thresholds, canary suites, sampling rates and trace formats are business configuration / Level 3 mechanics, deliberately left open like every earlier category left its knobs.

This document is the map for the Explainability and Observation category. The conversation record preserving the corrections is [`explainability_and_observation_conversation_and_discoveries.md`](explainability_and_observation_conversation_and_discoveries.md); the research behind it is [`research/observability_explainability_and_finetuning_research.md`](../../research/observability_explainability_and_finetuning_research.md).

## The spine, in plain words

> **One durable record already exists — claims with provenance, versioned situation models, event records, wait records, declared outcomes in the audit, run-ID-linked traces. This category decides who can see that record, at what depth, and how the system watches itself through it. It also makes the record usable as business artifacts rather than leaving it as a wall of chats.**

Two responsibilities live here, and they are different:

- **Explainability** turns a recorded reason into something a decision-maker can use — the emitted reason plus evidence references, delivered at each audience's depth.
- **Observability** is the builder's complete view of system behaviour (execution evidence, both dev and production), plus the health signals that say behaviour is still sane.

They share one record but have different consumers and different policies over it.

The second thread this batch contributed to the whole knowledge base: every ask in a situation model must reach an honest ending — answered, deferred-with-wait, or answered-with-capability-absent (told honestly, recorded deterministically). Capability-absent conclusions double as product signal: aggregated, they show what users want that the business cannot yet serve.

## The eight questions and where their answers live

- [How do we explain every recommendation?](how_do_we_explain_every_recommendation.md) — trace always, explain on demand.
- [How do we explain every action?](how_do_we_explain_every_action.md) — same rule; shares D1.
- [How do we explain every failure?](how_do_we_explain_every_failure.md) — Failure's audit, reused; capability-absent joins as a non-failure declaration.
- [What information should always be visible to the business?](what_information_should_always_be_visible_to_the_business.md) — event-aware situation baseline, artifacts, + business-value view.
- [What information should only be visible to administrators?](what_information_should_only_be_visible_to_administrators.md) — the configurator's set: configuration, grants/approvals, audit, masked traces without chain-of-thought.
- [How do we reconstruct an entire business situation after it has finished?](how_do_we_reconstruct_an_entire_business_situation_after_it_has_finished.md) — same data, viewer-dependent rendering.
- [How do we observe the health of the overall system?](how_do_we_observe_the_health_of_the_overall_system.md) — the observer as first-class responsibility; two hulls.
- [How do we recognise that the system is behaving unexpectedly?](how_do_we_recognise_that_the_system_is_behaving_unexpectedly.md) — five anomaly classes, scope-routed.

## What the earlier categories contributed

- **Understanding the Situation**: the situation model holds both sides — what is asked and what is true; versioned with immutable reasons; run IDs link reasons to full reasoning traces. This batch observes that record; it does not define it.
- **Gathering**: ask→source matching (where information lives, which actor owns it) — the step where capability-absent conclusions are produced, before any retrieval call.
- **Trust and Evidence**: every claim keeps provenance — the reason coherence checks are nearly free.
- **Decision Making**: LLM proposal + deterministic decision, both recorded; decision intentions vs operational states.
- **Failure**: declared outcomes into the audit with evidence, reason and next step; no silent state. This category reuses that audit as its backbone.
- **Time and events**: a situation can wake because an external actor, system, agent, or deadline changed something; the visible artifact must show that trigger and the resulting next responsibility.
- **Communication**: who gets how much explanation, when — this category preserves what Communication expresses.
- **Authority and Ownership**: the configurator role, grants tied to approvers, no-self-grant, per-role visibility narrowing — reused directly for the administrator question.
- **Coordination / Time**: the wait spine's visibility field, deadlines, check-ins — the ancestors of health observation.
- **Memory and Knowledge**: trace recording and learning are separate responsibilities; traces feed learning downstream.

## What this category does not decide

- The definition of situation models, asks or their states (Understanding).
- Which behaviour to select when an anomaly appears (Decision Making) — though high-consequence anomalies enter Failure's triage.
- Retry/recovery mechanics for anything observed (Failure).
- Who may grant authority or configure the business (Authority and Ownership).
- Channel-level access control mechanics and masking implementation (Level 3).
- Dashboards, metrics pipelines, probe infrastructure (Level 3).
- The visual product design of the owner's journey snapshot (Business View and Observation — later batch); this category sets the information and artifact baseline, not the final screen layout.

## Related

- Conversation record: [explainability_and_observation_conversation_and_discoveries.md](explainability_and_observation_conversation_and_discoveries.md)
- Research: [`../../research/observability_explainability_and_finetuning_research.md`](../../research/observability_explainability_and_finetuning_research.md)
