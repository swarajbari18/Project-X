# Research Record — Observability, Explainability, Coherence, and the Fine-Tuning Flywheel

## Status

This is a research record, not a decision record. It feeds the **Explainability and Observation** Level 2 batch. It preserves what we researched, where it came from, what I (the assistant) got wrong along the way, what Swaraj corrected, and the working conclusions that survived. Provisional conclusions are marked as such. Nothing here is adopted until the readiness gate for the batch is passed and Swaraj says write.

---

## Why this research exists

We entered the Explainability and Observation batch after finishing Failure. The initial status-quo pass found that most "explaining" machinery already existed (claims with provenance, versioned situation records, the audit from Failure, Communication's explanation-depth rules) and flagged the genuinely new territory: observing system health and recognising unexpected behaviour.

Swaraj then redirected the batch twice, and both redirects changed its shape:

1. **Observability and explainability are different responsibilities**, and the **product builder is a first-class observer** — with deeper access than anyone, including the hidden reasoning of the model, for tuning and fine-tuning. Health monitoring splits into two hulls: the LLM half (provider regression/drift) and the harness half (our orchestration misbehaving). And the concrete case was named: user asks for package status, system has no shipping source, loop gathers something adjacent (payment) and answers that instead — and nothing catches it.

2. **Project-X is not an orchestrator pipeline.** After a detour through the Kirana-Management-TeleChat codebase, Swaraj corrected my transplant of TeleChat's plan-execute shape onto Project-X. Project-X is a loosely-coupled swarm: a Conversation Manager (itself a multi-component loop) talks to users and creates situation models; models land on an event queue; background agents (one agent type, many instances) pick them up, run their loop, and update the model; updates flow back out through the Conversation Manager. The harness philosophy also moved: **the harness is the whole system; the LLM is one component inside it.**

Both redirects are recorded below with their consequences, because the wrong turns taught as much as the findings.

## The correction record

### My first frame, and what it missed

I first proposed the batch was "one durable record, two readings": explaining (turning the retained record back into *what happened and why*, only as far as the viewer needs) and noticing (checking the record and the system's liveness). Swaraj accepted the shared-record spine but showed the frame had four holes:

- **Observability ≠ explainability.** Explainability gives a reason to a decision-maker (a reason-key, a summary of why a decision happened). Observability is the builder's view of how the system actually works — every step, in dev and production, logs and traces through classes and functions, including hidden reasoning. Different consumers, different depths, different policies over the same underlying record.
- **The product builder is an interactor.** The viewer hierarchy is not just customer/employee/owner/administrator — the product team is a viewer with its own dashboards, seeing deeper than anyone.
- **The hidden reasoning has two lives.** For explainability we peel off a structured summary (the emitted reason). For improvement — tuning prompts, tools, fine-tuning smaller adapters — we want the full internal reasoning. Swaraj had already written this separation under Memory: trace recording and learning are separate responsibilities.
- **AI agent = LLM + harness**, so health monitoring must watch both halves separately: did the provider regress/drift the model, or did our own orchestration start misbehaving?

### Decisions taken during this pass

- **Trace format (Fork 1) = Option B.** The durable trace is built on deterministic evidence (tool calls, claims with provenance, state transitions, chosen behaviour) plus the structured reason emitted in output; **the model's full chain-of-thought is treated as a gift** — logged whenever the provider exposes it, kept as explicitly "not provided" when it does not. It is never relied upon architecturally.

### The TeleChat detour, and the second correction

To ground the coherence problem, I read the Kirana-Management-TeleChat codebase (`system_Architecture.md`, `planning-mode.ts`, `plan-verification.ts`, `decision-mode.ts`, `faithfulness/index.ts`, capability registry). Findings that stood: a genuinely good harness (phases enforced in code, plan verified before execution, DAG executed by code, tools invisible to the orchestrator, faithfulness bindings with safe fallback, LLM reasoning captured in traces). And one precise defect class: **the plan verifier validates the plan's internal structure but never its fidelity to intent.** With no logistics capability, the planner legally picks `user_profile`; execution succeeds; Decision Mode judges on vibes; faithfulness confirms the profile dump is grounded. Nobody ever asks whether the subject changed.

My fix proposal inserted an "intent constraint extraction" stage and coverage gates in front of planning. **This was wrong for Project-X**, and Swaraj corrected it:

- A situation model is **a story, not an intent**. One story can hold multiple asks (did payment succeed? where is my parcel? — one order, one resolution path, one model). The earlier failed-delivery-and-refund story is a different, completed model, linked by a journey edge.
- Understanding already decided this: *"There is no separate step after modeling where Tend 'determines the ask.' The model is the determination."* Intent is the customer-side half of the situation model — the asks, the said, the believed — recorded before any agent acts. My extraction stage re-created, as a pipeline step, something the architecture deliberately dissolved.
- There is no planner to stand in front of. The swarm has no central planning stage; gates bolted in front of planning have nothing to gate.

### Where things actually landed

- The ask-list is already explicit in the model. What was missing is the **other end**: each ask reaching an honest ending. Accepted working direction: a third fact-state, **`unanswerable`**, distinct from `unknown` (unknown = fillable later; unanswerable = no capable source exists), plus per-ask endings: **answered / deferred-with-wait / unanswerable-declared**. A story may resolve only when every ask reached an ending.
- The early stop happens at **gathering's first step** — matching each open ask to sources — *before* any retrieval call. Empty match → deterministic declaration → continue remaining asks. No fake capability, no empty-plan trick: those patch implicit understanding, which Project-X does not have.
- Unanswerable means no capable source anywhere — systems **and** people. If a human could serve the ask, the ending is human work (deferred/escalated), not unanswerable.
- The completion check belongs at decision time (every open ask classified before "respond" may be selected), verified cheaply at expression time, and observed continuously by this batch.

## Sources

### Fetched and read directly

| Source | What it gave |
|---|---|
| Anthropic — "Demystifying evals for AI agents" | Vocabulary: task/trial/grader/transcript/eval-harness; multi-turn grading; agent mistakes compound across turns; framework landscape (Harbor, Braintrust, LangSmith, Langfuse, Arize Phoenix) |
| LangChain/LangSmith — "Production monitoring" | Why agents can't be monitored like software: infinite input space, non-determinism, quality lives in conversations; traces → annotation queues → online evals → data reviews |
| Arize — "What is an agent observability platform" + LLM-as-a-Judge guide | What gets traced (tool calls, retrieval, state changes, outputs); **observability shows execution evidence, not guaranteed hidden chain-of-thought**; judge failure modes; "use code when the check is deterministic"; evaluate trajectories not just final answers |
| AWS Bedrock Guardrails — contextual grounding check | Two separable scores: *grounding* (answer backed by source) and *relevance* (answer matches the query) — relevance is a primitive for wrong-subject detection |
| arXiv 2506.06539 — Intent Hallucination (FaithQA) | The package-vs-payment failure has a name: models **omit** or **misinterpret** parts of intent; fix pattern = decompose query into explicit constraints, score each (Constraint Score) |
| Guardrails AI — Responsiveness Check | Simplest shipped validator: cheap LLM call — "does this output respond to this prompt?" — fails loudly |
| VertRule Provider Sentinel | Provider-drift canaries: fixed probe suites (exact canaries, arithmetic, schema conformance, instruction hierarchy, refusal boundary, multi-turn) under sealed settings; rerun on schedule; evidence packs; separates alias movement from behavioural drift |
| LatentMesh — "Building an eval harness that survives production" | Five structural decisions: declarative contracts with rationale; separated runner/scorer; version everything; scannable summaries; two tiers — deterministic invariants every commit, behavioural/policy judges nightly. **Never let a fast gate block on an external model call** |
| Motomtech — golden tests + drift detection | Concrete numbers: 5–10 golden cases per capability; weekly cron re-running ~200 sampled prod traces; track tool-call/schema/cost-latency/output drift; alert ≈3% week-over-week; median-of-3 runs to separate regression from flake |
| Stanford TRACE (Scaling Intelligence Lab) | Mine capability deficits by contrasting failed vs successful trajectories → synthesise targeted environments → train one LoRA adapter per deficit via GRPO → route at inference. Beats direct RL; scales with number of capabilities |

### Grok expert sessions (X/social-chatter-first, then web)

- **Session 1 (134 sources)** — harness philosophy: Agent = Model + Harness; loop/graph/harness engineering layers; ReAct vs plan-then-execute vs deterministic control; layered verification for intent coherence; full fine-tuning recipe (dataset creation from traces, curation, correction, SFT→DPO/KTO/GRPO progression, LoRA practice, evaluation).
- **Session 2 (83 sources)** — who generates constraints (hybrid: deterministic structure, LLM-assisted filling); validating validators (Shankar's EvalGen, criteria drift); capability gating patterns shipped in production (registry + early gate, tool filtering at schema time, deny-by-default pre-call hooks); correction pipelines at scale (annotation queues, rewrite-then-verify, realistic human throughput); LoRA hot-swap serving; GRPO verifiers without unit tests.

## Findings A — Observability and explainability are different responsibilities

**Explainability** turns a recorded reason into something a decision-maker can use: the structured reason emitted with a decision (what information was used, what rule applied, what happens next), delivered at the depth each audience needs. **Observability** is the builder's complete view of system behaviour — execution evidence, step-by-step, dev and production — plus the health signals that say whether behaviour is still sane.

The viewer hierarchy over one shared record (depths differ, artifact is the same):

| Viewer | Sees | Retention class |
|---|---|---|
| Customer | need-to-know answer + honest uncertainty | never raw internals |
| Employee/Owner | explanation + evidence references + responsibilities/deadlines; business observability (journey state) | reason summaries, never hidden reasoning |
| Administrator | governance: configuration, audit trail, approvals | deeper than owner, shallower than builder |
| Product Builder | everything: function-level traces, tool calls, prompts, gift-CoT, drift signals | tuning_only for CoT |

Trace record sketch (per run / per trajectory): identity (situation id, card state, business, channel, prompt/tool-manifest versions); intent-ask context (the open asks this run served); execution evidence (steps with tools, arguments, result refs, claim provenance); decision record (LLM proposal + reasoned consequence AND deterministic decision — Failure's pairing); emitted reason-key (what explainability reads); model_reasoning (gift CoT, nullable, `tuning_only`); outcome (declared outcome + coherence-check results); training_eligibility flags.

Key design consequence: **the trace is designed backwards from the fine-tuning dataset format** — every field is either SFT material or a verifier signal. Nothing collected only "for training."

## Findings B — Coherence: catching "answered the wrong question"

The package-vs-payment case decomposes into three holes, and TeleChat proved all three must be plugged independently:

1. **Before acting:** does a capable source exist for this subject? (TeleChat: asked too late and implicitly. Project-X: ask→source matching at gathering's first step.)
2. **During:** does the actor see only sources that exist? (Tool/capability visibility control — largely Level 3 mechanics; principle: absence is visible to the system, not left to model improvisation.)
3. **After:** did the output satisfy the story's asks? Layered, cheapest first: deterministic subject-overlap → grounding check (every claim traces to real evidence — nearly free given provenance) → relevance/responsiveness judge → sampled trajectory judge.

Constraint generation ships as hybrid everywhere: the *structure* deterministic (subject enum from the registry, required slots, schema fail-closed), the *filling* LLM-assisted within schema, humans calibrating via golden subsets. Shankar ("Who Validates the Validators?"): LLM evaluators inherit LLM problems; **criteria drift** is real (you only learn criteria by grading outputs); mixed-initiative alignment (LLM proposes assertions, humans grade subsets, feedback selects) beats up-front rubrics; fewer well-aligned assertions beat many weak ones; re-validate continuously. Implication for us: coherence checks share ONE artifact — the situation model's ask-list — otherwise three verification layers verify three different things and none verifies "did we answer the human."

## Findings C — Watching both hulls

**Provider hull (did the model regress/drift?):** fixed probe-canary suites run under sealed settings on a schedule; compare outputs against baseline; classify drift vs alias movement vs context mismatch; produce evidence packs. Surfaces: exact canaries, arithmetic/constrained reasoning, schema conformance, extraction, classification, refusal boundary, instruction hierarchy, multi-turn.

**Harness hull (did our orchestration change behaviour?):** golden-test suites (5–10 realistic trajectories per capability, including adversarial cases) run on every prompt/tool/policy change; production drift cron sampling recent traces and re-running them in sandbox; watch tool-call distribution drift, schema-conformance drift, cost/latency drift, output-content drift; alert on distribution-level shifts (≈3% week-over-week), never single-run failures (median-of-3 in CI).

**Evaluation discipline:** two tiers — deterministic structural invariants on every change (seconds); behavioural/policy judges nightly (minutes). Judges calibrated against human labels before trusted; judge explanations are not truth; an eval can agree with humans and still measure the wrong thing. Golden sets are living artifacts: high-disagreement cases get promoted into them.

For Project-X specifically: "the system is behaving unexpectedly" now has a concrete first definition — **a story that ended dishonestly**: a situation resolved with an open ask; an unanswerable declared where a source existed; a wait that fired without its release policy; coherence checks failing above threshold. The invariant list and the settled model provide the baseline of "expected."

## Findings D — The fine-tuning flywheel

Pipeline: **production traces → filter (verified success + coherence results) → correct failures (cluster by failure mode; automated rewrite-then-verify for the bulk; human queue 50–200 traces/week sustainable for a 2–3 person team; keep a deliberate fraction of hard negatives/near-misses so adapters learn recovery) → format (SFT pairs from full trajectories; preference pairs chosen/rejected for DPO-family; unpaired good/bad for KTO; grouped rollouts for GRPO) → train LoRA/QLoRA → evaluate against base on held-out prod-like prompts → hot-swap serve.**

Method trade-offs: SFT first always (format, domain language, tool style; works with hundreds–thousands of examples). DPO when good pairs exist; sensitive to pair quality and length bias. KTO when only unpaired good/bad exists (easy from logs). GRPO when a reliable verifier exists — which Project-X largely has (tool-match, grounding, subject-match are machine-checkable). PPO/full RLHF probably overkill initially. Distillation/rejection sampling from teacher or production system; amplifies teacher failures unless filtered.

LoRA practice: rank 8–64 (often 16–32), alpha ≈ 2× rank, attention q/k/v/o plus often MLP; module choice matters more than rank; QLoRA for larger bases; serve many adapters on one base with hot-swap (vLLM/TGI/NIM, tens-of-ms swaps).

Deterministic outcomes as labels: strongly positive for verifiable parts (right tool called, output validated, claims grounded — SFT targets or binary rewards); harmful as sole label for open-ended replies ("harness finished without error" ≠ "answered what the human meant"). Necessary-but-not-sufficient filter.

TRACE pattern worth keeping: instead of one monolithic fine-tune, contrast failed/successful trajectories to find *which capability* fails, train one small adapter per deficit, route at inference. Maps naturally onto ask-kind mining: which kinds of asks most often end unanswerable = build roadmap.

## Provisional working conclusions (pending the batch readiness gate)

1. Observability and explainability are separate responsibilities over one shared record; the product builder, administrator, owner/employee, and customer are distinct viewers with distinct depths. *(working direction)*
2. Trace = deterministic evidence + structured emitted reason + gift-CoT (`tuning_only`, nullable). CoT is never architecturally load-bearing. *(decided in conversation)*
3. The situation model's ask-list is THE shared artifact for coherence; every ask must reach an ending: answered / deferred-with-wait / unanswerable-declared. A story resolves only when all asks reached endings. *(proposed, Swaraj accepted direction)*
4. New fact-state `unanswerable` beside known/unknown/conflicting: no capable source exists anywhere (systems and people). Human-servable asks become human work instead. Early stop = ask→source matching at gathering's first step, before retrieval. *(accepted; placement inside Understanding/Gathering documents still to be written properly)*
5. Completion check at decision time; cheap deterministic verification at expression time; coherence results recorded per run into traces. *(proposed)*
6. This batch (Explainability and Observation) owns: observing completion discipline, reconstruction/replay views across the situation graph, viewer hierarchy, both health hulls, and the trace that feeds learning. It does NOT own ask-state definitions (Understanding) or behaviour selection (Decision Making).
7. Golden tests should be situation-level scenarios — including expected-refusal cases (package question with no shipping source must produce an honest declaration, not adjacent content).
8. Fine-tuning flywheel is a downstream consumer of the trace; dataset format constraints flow backwards into trace design.

## Open for the batch

- Which Level 1 questions of this category are answerable by reuse vs need fresh Level 2 framework work (analysed next, with Swaraj).
- Where exactly the `unanswerable` state and ask-endings get written (Understanding's model definition vs Gathering's matching step) — a boundary to draw together.
- ~~Administrator role definition~~ **Resolved:** the administrator IS defined — the **configurator** (Level 1 actors: owner may delegate setup to an assistant/family member; Authority and Ownership: only the configurator creates/changes grants, via a distinct configuration capability, no-self-grant; journeys map: "assistant who knows the business sets up channels, KB, rules, integrations").
- Seam with Business View and Observation (owner journey snapshot is a later batch; visibility baseline is here).

<!-- END OF RESEARCH RECORD -->





