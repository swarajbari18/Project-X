# Explainability and Observation — conversation and discoveries

## Why this folder exists

The Level 1 category asks how we explain recommendations, actions and failures, what is visible to whom, how we reconstruct a finished situation, and how we watch system health. When we opened the batch, the status-quo pass found that most of the *recording* machinery already existed elsewhere: claims carry provenance, the situation record is versioned with immutable reasons and run-ID-linked traces, Failure puts declared outcomes into an audit, Communication already decided who gets how much explanation. What had no home was the *viewing* side (who sees what, at what depth) and the *noticing* side (is the system itself behaving).

## The two redirects that shaped this batch

**Redirect one — observability is not explainability, and the builder is a viewer too.** Swaraj split my initial "one spine, two readings" frame open: explainability gives a decision-maker a reason; observability is the product builder's complete view of how the system works in dev and production — including hidden reasoning, kept for tuning prompts, tools and fine-tuning adapters. The product team is a first-class interactor with deeper access than anyone. Health watching splits into two hulls: the provider hull (did the model regress or drift?) and the harness hull (did our own orchestration start misbehaving?). And he named the concrete case this batch must answer: user asks for package status, no shipping source exists, the loop gathers something adjacent and answers about payment instead — and nothing catches it.

That redirect produced a research pass (two Grok expert sessions plus direct source reading), recorded in [`research/observability_explainability_and_finetuning_research.md`](../../research/observability_explainability_and_finetuning_research.md). Load-bearing findings: trace = deterministic evidence + structured emitted reason + chain-of-thought treated as a gift (logged when exposed, never relied upon); layered coherence checks sharing ONE artifact; validators need human-calibrated golden sets because criteria drift; health = probe canaries + golden tests + drift crons, deterministic checks before judged ones.

**Redirect two — Project-X is a swarm, not TeleChat's pipeline.** To ground the coherence case I read the Kirana-Management-TeleChat codebase and proposed gates bolted in front of planning. Swaraj corrected me hard, twice:

1. A situation model is **a story, not an intent** — it can hold several asks on one resolution path, linked across situations by the graph. Understanding already decided "the model is the determination"; there is no separate intent-extraction step to gate.
2. There is no central planner to stand in front of. Conversation Manager creates models → event queue → background agents pick them up, work, update the model → updates flow back out. Loosely-coupled agents, one agent type. And the harness philosophy moved: **the harness is the whole system; the LLM is one component inside it.**

TeleChat's actual defect — its plan verifier checked shape but never fidelity to intent, so a missing logistics capability silently degraded into reading the shop profile — cannot happen here, because writing down the asks is Tend's first-class act.

## The final correction — capability-absent, not "unanswerable"

I proposed a third fact-state called `unanswerable`. Swaraj rejected the framing, and the rejection matters:

> The customer still gets an answer. "We do not have the capability for this" IS an answer — we know the root cause. It is not unanswerable, and it is not a failure: how can the system fail if the capability was never there?

Settled language: when gathering's ask→source matching finds no capable source anywhere (systems **and** people), the deterministic conclusion is **capability-absent**, recorded with evidence, and the customer is told honestly. Human-servable asks become human work instead. Nothing silent, nothing failed, nothing pending.

And these conclusions are not just honesty — they are **product signal**: log them, aggregate them, monitor them, trigger notifications. Users keep asking for things the business cannot serve yet; that aggregate is the build roadmap. (His example: users asking science questions of a kirana assistant.)

## The seven decisions

1. **D1 — explaining "every" (Q1+Q2).** Trace always, explain on demand. Every important action preserves a full reason record; delivery follows Communication's audience rules. "Important" = consequential enough to enter the audit per Failure's declaration rules — one classification system, not two.
2. **D2 — capability-absent is not a failure.** A deterministic conclusion recorded on the model and audit, outside Failure's triage entirely. Failure keeps its four declared outcomes untouched.
3. **D3 — always visible to the business (Q4).** Situation-level baseline: every open situation with state, ask-statuses, waits, deadlines, declarations; drill into any one. Alerts ride on top. On top sits a **business-value view** — stories solved, impact, money saved — never operational metrics (uptime, message counts); those belong to the builder.
4. **D4 — administrator visibility (Q5).** The administrator is the **configurator** (owner delegates setup — father→son). Default set: business configuration, grants and approval history, audit trail, declarations — plus on demand, minimal masked traces of how a situation was resolved (model → sources → response) including raw reasoning summaries but never internal chain-of-thought (proprietary). Transparency without handing over internals — his ChatGPT analogy.
5. **D5 — reconstruction (Q6).** Same data, viewer-dependent rendering: linear timeline for non-technical viewers, graph view for builders, toggleable. Reconstruction exposes nothing live viewing wouldn't.
6. **D6 — observer (Q7).** The observer is a first-class responsibility and a well-behaved citizen of the harness: it emits observation events (probe results, drift results, completion-discipline violations) onto the same fabric everything else uses.
7. **D7 — unexpected behaviour (Q8).** Five-class taxonomy: invariant violations; completion-discipline violations; coherence failures over threshold; drift signals (both hulls); operational anomalies. Deterministic classes first, statistical/judged sampled. Situation-scoped anomalies land on the model; high-consequence ones enter Failure triage; everything lands in traces.

## What deliberately stays open

- Where ask-endings and the capability-absent conclusion get written formally (Understanding's model definition vs Gathering's matching step) — a boundary to draw together.
- Anomaly thresholds, canary suites, drift windows, sampling rates — business configuration and Level 3 mechanics, same as every earlier category left theirs.
- The seam with Business View and Observation: owner journey snapshot stays there; this category sets the visibility baseline.
- Trace format details and dataset formats live in the research record until fine-tuning/learning work picks them up.

## Related

- The research record behind this batch: [`research/observability_explainability_and_finetuning_research.md`](../../research/observability_explainability_and_finetuning_research.md)
- The map: [`understanding_all_explainability_and_observation_questions.md`](understanding_all_explainability_and_observation_questions.md)


