# Agent & Harness Study — Every Repo, Every Paper, and What Tend Takes From It

## Status

Study record for the harness/loop/fine-tuning research. Everything in here was read from code and papers directly (not READMEs) across the study sessions. Decisions recorded elsewhere in the knowledge base are cited, not repeated. Nothing in this file is adopted architecture — it is the evidence base and the alignment map for the loop drafting that follows.

## Why this file exists

Tend will be carried by language models inside a harness — the software around the model that decides what the model sees, checks what it produces, executes what it proposes, and records everything. Building that harness well is the difference between a demo and a product, so before designing our own loops we studied everything we could get our hands on: five repositories and eight research papers.

This file is the complete record of that study. For each source it answers four questions in plain language:

1. **What is it, and how is it built?** — with a diagram of how the pieces connect.
2. **What is it trying to solve?**
3. **Which parts align with Tend?** — mechanisms we can learn from or take.
4. **Which parts are invalid for us?** — where its problem is fundamentally different from ours, so we do not copy by accident.

## The problem we are solving (so every judgement below has an anchor)

Tend carries a business's communication and operational responsibility. When a situation changes — a customer message, a payment, a deadline, a delivery stop — the right next step must happen without a person watching. Every situation must reach an honest ending: answered, waiting with a visible reason, escalated to the right person, or declared unanswerable. Correctness must never depend on trusting a probabilistic model.

The studied systems each solve a *restricted version* of this: one request, one user, one session, no waiting, no business rules. The study's job is to identify what each one learned the hard way, and what only Tend has to figure out.


# Part 1 — The GitHub Repositories

Five repositories were reverse-engineered by reading the actual code paths — the main loops, the failure handlers, the state machines — not the documentation. Code is the fossil record of problems: every guard, retry counter, and error class in a codebase marks a failure somebody hit in production.

Two reading rules produced the findings:

- **Read the failure paths first.** The happy path teaches you nothing; the error handlers teach you everything.
- **Never trust a README or an architecture doc over the code.** One repo in this list documents components that do not exist in its source — noted explicitly below.


## 1. Hermes — a coding agent hardened by production reality

**What it is.** An open-source, production-hardened coding agent written in Python. Its main loop (`agent/conversation_loop.py`, ~8,800 lines) is one of the most battle-scarred agent loops available for study. It talks to many model providers, runs terminal and file tools, and serves users over chat platforms.

**What it is trying to solve.** Keep one model doing useful, tool-driven work across many unreliable providers, long sessions, and hostile inputs — and never lose the user's work when something breaks.

**Architecture (from code):**

```text
user message
   ↓
context build ──── restore system prompt, load conversation history,
   ↓               select/compress context (separate responsibilities)
LLM call (with provider failover, auth-pool handling, retry caps)
   ↓
response normalization ──── fix truncation, empty output, refusal,
   ↓                          content-policy blocks, billing blocks
tool calls present?
   ├─ yes → validate names + JSON args, deduplicate, cap the batch
   │         → PERSIST the tool-call intent (before any side effect)
   │         → execute tools → persist results
   │         → guardrails: repeat detection, no-progress detection,
   │           category counters → back to LLM call
   └─ no  → final-response checks (empty/repetitive/incomplete) → finish
```

**The fossil record (what its guards prove went wrong):** per-turn state leaking between turns; authentication refresh loops that spin forever on a persistent 401; responses lost at verification gates; outer-loop error storms; context overflow hitting three different compression sites; truncated tool calls; models that emit empty tool-call structures; content-policy and billing refusals mid-task.

**Aligned with Tend:**
- **Persist the intent before the side effect.** Hermes writes the tool-call message durably *before* executing the tool. A crash then never loses "what we were about to do" — directly reusable for our situation work.
- **The guardrail taxonomy**: repeated identical calls, repeated failures, no-progress loops, excessive searches, invalid arguments — a ready-made checklist for our capability-invocation guards.
- **Context selection and context compression are separate responsibilities** — the same separation our context-assembly decision records.
- **Provider failure handling with bounded retries** and exit-reason diagnostics — every loop ends with a recorded *why*.

**Invalid for us:**
- **Request scope.** One conversation, one user, one turn horizon. No situations that outlive the session, no waiting, no time, no business actors.
- **Silent self-repair.** It sometimes repairs invalid tool names or salvages mixed tool batches. Acceptable for a coding assistant; for Tend, a corrected invalid business action is still an unauthorized action. We fail closed instead.
- No authority model, no business truth, no multi-actor coordination.


## 2. Pi — the minimal agent loop, stated cleanly

**What it is.** A small TypeScript library implementing the cleanest minimal agent loop we found. Where Hermes shows what production brutality adds, Pi shows the *irreducible* loop — and proves that even the minimal version cannot trust the model.

**What it is trying to solve.** Provide a correct, inspectable core loop that others can build harnesses on: model streams a response, tools run, results go back, repeat until done.

**Architecture (from code):**

```text
prompts → AgentContext
   ↓
agentLoop:
   for each turn:
      LLM stream call (AbortSignal threads through everything)
      ↓
      tool calls in response?
         ├─ yes → validateToolArguments (before execution!)
         │         → beforeToolCall hooks (can mutate or terminate)
         │         → execute (sequential or parallel)
         │         → afterToolCall hooks (can mutate results)
         │         → errors become ERROR-RESULT DATA fed back to the
         │           model — never an exception that kills the loop
         │         → next turn
         └─ no  → stop conditions / early termination → final response
```

**Aligned with Tend:**
- **Tool errors are data, not exceptions.** A failed tool result goes back to the model as input so it can react — the same shape as our "verification diagnostics feed the retry."
- **Arguments validated before execution**, hooks before and after every tool — the insertion points our capability gates need.
- **Normalization at the provider boundary**: null content is replaced so malformed entries never enter session history or provider payloads. Even the minimal loop treats provider contracts as fragile.
- **Role contracts on continuation**: you cannot continue a loop from an assistant message because providers reject it — small, sharp evidence that loop state transitions must be enforced by code.

**Invalid for us:**
- Session-level persistence only; no durable cross-restart story (that is Herdr's and TeleChat's territory).
- No verification layer beyond argument validation — trust the model, check the envelope. Tend must check the substance too.
- Request scope, single actor, no time.


## 3. Herdr — supervising long-running agents from the outside

**What it is.** A Rust application that keeps AI coding agents running inside terminal panes — detached, resumable, observable. It is not a reasoning loop at all; it is the *supervision layer* around other agents' loops.

**What it is trying to solve.** Long-running agents die, disconnect, block on questions, and outlive the human's attention. Herdr keeps their processes alive, lets humans reattach, and shows each agent's state without the agent's cooperation.

**Architecture (from code):**

```text
terminal panes (each runs an agent or shell, via PTY)
   ↓
detect module: periodically reads bottom-of-terminal text,
   pattern-matches known agent output
   ↓
AgentState per pane:  Idle | Working | Blocked | Unknown
   (with confidence metadata: visible blocker? visible working?
    PTY activity as the authority — arbitration when sources disagree)
   ↓
server / client split: server owns processes and state;
   clients (UI, CLI, remote) attach and detach freely
   ↓
persistence: sessions survive restarts; reattachment restores view;
   agent-to-agent prompting; blocked agents wait for human input
```

**Aligned with Tend:**
- **The worker-lifecycle vocabulary**: running / blocked / waiting / resumed / dead. Tend's background situation workers live exactly this lifecycle; Herdr proves the states and the transitions are a manageable, small set.
- **Supervision is a separate concern from reasoning.** Nothing in Herdr understands *what* the agent is doing — only whether it is alive and whether it needs a human. That separation is a template for Tend's queue and monitoring layer.
- **Reattachment**: a human can take over a session mid-flight and hand it back. Tend's "human work" handoffs are the business version of this.

**Invalid for us:**
- **State must be inferred, because the agents don't report it.** Tend's own agents run inside our harness and can *self-report* state transitions into their traces. We should never need to guess from output text.
- Heavy terminal-UI machinery is irrelevant.
- No notion of business situations, truth, or authority — deliberately: it supervises *processes*, not *work*.


## 4. Kirana-Management-TeleChat — the harness-first business agent

**What it is.** Swaraj's own previous project: a Telegram assistant for a kirana store, built on Cloudflare, whose full architecture is documented in a 9,780-line `system_Architecture.md` and partially implemented in TypeScript. It is the closest relative to Tend and the richest source of both patterns and warnings.

**What it is trying to solve.** Turn an ambiguous natural-language owner message into deterministic, correct business operations (inventory, billing, credit ledger) without ever letting the language model become the source of business truth.

**Architecture (from code):**

```text
Telegram webhook → Worker → Store Durable Object (one per shop)
   ↓                                   (single-flight per message)
Execution Manager
   ↓
GLOBAL ORCHESTRATOR  (a code-owned control loop, not a model)
   plan (LLM → capability-assignment JSON)
     → VERIFY plan in code ─ invalid? → bounded retry w/ diagnostics
     → EXECUTE capabilities (deterministic, dependency-ordered)
     → VERIFY business results (pre/post-conditions, invariants)
     → DECIDE (LLM → replan | ask_user | respond)
     → grounded response (generate + faithfulness check, one component)
   bounded strategic rounds; fail-closed on cap or crash
   ↓
agent state: append-only versioned trace of every transition
   (plan versions, verifications, tool I/O, decisions, reasoning
    captured trace-only, never fed to the next step)
```

Three engineering disciplines are named and kept separate: **context engineering** (what each single LLM call sees), **harness engineering** (all deterministic code around the model), **loop engineering** (who owns which loop — the strategic loop exists only at the orchestrator; capabilities are single-shot subroutines returning evidence).

**The known defect (found in a previous session, confirmed by code):** three verification layers verify three different things — plan validity, business correctness, response grounding — and **none asks "did we answer what the human actually meant?"** With no shipping capability registered, the planner legally assigns the user-profile capability to a shipment question; execution succeeds; grounding passes. Structural validity ≠ intent fidelity.

**The doc-vs-code gap:** the architecture document describes a Conversation Manager with a Reference Resolver and a Clarification Manager. **The code contains none of these.** The real conversation manager is ~45 lines: session rotation, command stripping, persist turn, load turns. Reference resolution for billing drafts actually lives in the *planner prompt* (classify `draftTarget: implicit_latest | new | by_customer | ambiguous`) plus a deterministic resolver in the billing capability that forces clarification on ambiguity. Warning for us: our knowledge base must never describe components that do not exist.

**Aligned with Tend:**
- **The whole shape**: LLM proposes bounded artifacts; deterministic code verifies and executes; bounded rounds; fail-closed everywhere; every transition traced; reasoning captured but never fed forward.
- **Harness retry vs strategic replan, never conflated** — fix the artifact with diagnostics, versus re-decide the objective mapping after evidence.
- **Classify → verify → resolve → clarify**: the draft-focus resolver is a working pattern for "which existing thing does this message act on?" — LLM classifies from conversation, code validates the choice and forces a clarifying question when ambiguous.
- Per-step minimal constitutional system prompts; stateless LLM calls; conversation state kept separate from agent state.

**Invalid for us:**
- **One message = one run, then done.** No waiting, no timers, no resumed work, no multi-actor situations, no parallel situations, no cross-run continuity beyond conversation turns. Tend's situations outlive requests.
- Understanding responsibility leaked into the planner as a side-artifact (the draftTarget classification) — our architecture dissolves intent-extraction into the situation model instead.
- Single conversation session per store; one interactor.


## 5. Supermemory — a memory engine, studied through its surface

**What it is.** A hosted memory-and-context engine for AI products (#1 on the LongMemEval / LoCoMo / ConvoMem memory benchmarks). **The engine itself is closed-source** — the repository contains SDKs, an MCP server, docs, and a graph visualization UI. We therefore reverse-engineered it through its API surface and documentation, which honestly reveal the architecture: an API surface is a design confession.

**What it is trying to solve.** AI products forget everything between conversations. Supermemory turns raw input into durable, searchable, *connected* memory — automatically.

**Architecture (from docs and API surface):**

```text
add(content, containerTag, metadata)
   ↓
ingest pipeline: extract (OCR/transcribe) → contextual chunking
   → index (vector + full-text + graph, one engine)
   ↓
"dreaming" phase (async, batched — continues AFTER status: done)
   a learning model decides what is important, merges related
   documents into coherent units, extracts FACTS, links them
   ↓
three outputs per input:
   1. CHUNKS   — raw source pieces (grounding / quoting)
   2. MEMORIES — atomic facts in a temporal graph:
        updates  → new fact REPLACES old as current (isLatest flag),
                   history kept for audit
        extends  → new fact ADDS detail, both stay valid
        derives  → system INFERS facts never stated in one place
        types:   facts persist | preferences strengthen on repetition |
                 episodes decay unless significant
        forgetting: time-based expiry, contradiction resolution, noise filter
   3. PROFILE  — per-person always-on summary (stable facts + recent
                 activity), loadable in ~50ms without searching
   ↓
search(q, containerTag, filters) — semantic + full-text + metadata
   inside a HARD isolation wall (container tag); metadata = soft
   dimensions inside the wall
```

**Aligned with Tend:**
- **Two layers — grounding and understanding.** Keep the raw record *and* the extracted meaning, separately. This matches our recorded separation of conversation history (evidence) from learned knowledge (guidance).
- **Updates win, history remains** — their `isLatest` mechanism is the same rule as our "corrections happen forward; a logged reason is never rewritten."
- **The profile pattern** — a continuously-maintained per-person summary loaded before any search. Directly relevant to the owner asking about a customer a year later: resolve *who* cheaply before searching *what*.
- **Learning is asynchronous and batched**, not inline with the conversation — matches our decision that trace recording and learning are separate responsibilities.
- **Hard-wall / soft-dimension isolation** (container tags vs metadata) is exactly our cross-business isolation invariant expressed as storage design.
- Their memory types (facts / preferences / episodes with decay) anticipate our typed memory records.

**Invalid for us — three deliberate strictness gaps:**
- **Their model establishes identity and supersession** (the engine decides "this fact updates that one"). Our recorded decision: the LLM may only *propose* a relation; structured claim families and typed update operations decide, and ambiguous matches stay unresolved. Silent merging is how memory poisoning happens.
- **One graph of truth.** We separate descriptive from normative: learned memory can never override policy, authority, or a current authoritative source — their design has no such boundary.
- **Their forgetting deletes.** Ours retires: lifecycle states (active/stale/superseded/conflicting/retired/unresolved) restrict retrieval eligibility; history never vanishes because audit demands it.
- Closed engine + tenant data leaving our boundary conflicts with compliance requirements; and their unit is the *fact*, ours is the *situation* (a story with asks and endings) — a shape mismatch at the most important place.


# Part 2 — The Research Papers

Eight papers, all converted from PDF and read in full or in their operative sections. They come from 2026 and describe the current frontier of harness research. None of them solves Tend's problem, but four of them supply load-bearing evidence for decisions we had already recorded independently — which is the best kind of confirmation: *convergent, from outside*.

One note on the model problem (frontier model first, small fine-tuned models later): these papers contain direct precedents for every stage of that path — JIT-Agent's teacher-generated training data, EvoHarness-RL's SFT-then-RL on a small model, SKILL.state's error taxonomy for what small models actually get wrong, and AutoSaddler's automatic harness repair. They are cited inline in the paper sections below.


## 6. JIT-Agent — harnesses synthesized just in time

**What it is.** A trained 27B model whose *job* is to build agent harnesses: given a task, it synthesizes a task-specific harness for an off-the-shelf LLM, repairs broken ones, and improves its own archive from execution feedback. Its headline: with JIT-Agent as the harness builder, mid-tier models beat much larger ones on agent benchmarks.

**The formalization.** A harness is factored into **four modules with fixed interfaces**: **h = (M, P, A, F)** — Memory (constructs the memory view), Planning (forms the next directive), Action (advances the action loop), Capability orchestration (orchestrates tools/skills). The protocol constrains *interfaces, not behavior* — their central qualitative result maps one task to a DAG executor with an artifact store, and a different task to bounded recursive delegation with a fact store, same protocol.

**The training recipe (this is the model-problem precedent):**

```text
Stage I   CUSTOMIZATION — learn from teacher-generated, protocol-
          compliant harness examples (adaptivity)
Stage II  REPAIR — failed generations (compile errors, interface
          mismatches, runtime failures) become bounded repair
          trajectories (reliability)
Stage III Evo-GDPO — optimize the generator to propose harnesses
          that overtake its own archive frontier, with reward,
          latency, and cost normalized separately (evolvability)
```

**Aligned with Tend:**
- **"Each loop is custom-tailored" becomes a researched position, with a discipline attached**: variation happens *inside a fixed module protocol*. Our loops should likewise differ per component but share one interface contract — otherwise the variation becomes unmaintainable.
- **(M, P, A, F) is a candidate abstract vocabulary for "loop"**: every component loop, whatever its purpose, constructs a memory view, forms a directive, advances actions, and orchestrates capabilities. A testable frame for our loop drafting.
- **Repair-from-failure and archive evolution** are the training-side twins of our trace flywheel: traces must be able to feed *both* harness patches and model adaptation.

**Invalid for us:**
- **Per-task synthesis for short-lived tasks.** Tend's unit is a *situation* — long-lived, multi-actor, interrupted and resumed. Per-situation harness synthesis is a design point no paper covers; naively copying JIT synthesis would mean regenerating machinery mid-story.
- Their tasks are benchmark-clean; ours carry business authority and policy.


## 7. SKILL.state — execution state instead of conversation history

**What it is.** A runtime that replaces the ever-growing conversation transcript with **explicit, mutable execution state**. The single most load-bearing paper for our situation-model design.

**The execution contract (their Algorithm 1):**

```text
each step t:
   inputs:  Aₜ = (P, Σₜ, Oₜ)
            P  = immutable procedural specification (the constitution)
            Σₜ = current structured execution state (the state, not history)
            Oₜ = latest observation only
   model generates: (Rₜ, ΔΣₜ, aₜ)
            Rₜ  = full reasoning — EPHEMERAL
            ΔΣₜ = structured state patch (JSON dict, null = delete)
            aₜ  = action
   runtime:  deterministically VALIDATE ΔΣₜ
             apply:  Σₜ₊₁ = Σₜ ⊕ ΔΣₜ
             execute aₜ
             DISCARD Rₜ permanently
```

The model never sees previous observations, actions, or reasoning. Prompts stay **O(1)** per step; cumulative cost grows linearly, not quadratically.

**The result that matters most** (budget-matched controls — same token budget for every method): sliding-window truncation scores **0.18**, LLMLingua compression **0.22**, summarization **0.52**, structured state **0.94**. It is *not* about shorter prompts — statistical compression destroys relational dependencies ("seemingly redundant slot identifiers that are semantically vital"); explicit state preserves them. External, convergent evidence for our recorded Level 1 assumption: *the business needs artifacts, not only conversations.*

**The error taxonomy for small models (their §5.7 — the fine-tuning target list):**

| Share | Error class |
|---|---|
| 68% | **Premature state overwrite/deletion** — model omits existing keys instead of merging |
| 20% | Schema comprehension / type coercion |
| 12% | JSON syntax slips |

Their conclusion: *small-model degradation stems from structured-output adherence, not reasoning capacity* — which is exactly why our plan is deterministic validators plus targeted fine-tunes, not bigger models.

**Aligned with Tend:**
- **The situation model IS Σₜ**: per-component constitution = P, the situation model = the state, the latest event = Oₜ, the bounded artifact = the patch, the validator = their ΔΣₜ check, and reasoning-discard matches our "chain-of-thought is a gift, trace-only, never load-bearing."
- Schemas authored **per domain, not per task** (one 5-field schema served 100 different challenges) — matches our typed memory records with structured claim families.
- The error taxonomy is a concrete per-deficit adapter curriculum for the flywheel.

**Invalid for us:**
- **The sufficient-statistic assumption** (their own §7): everything in the past bearing on the future must fit in Σₜ. Tend's state must carry *provenance, conflicts, trust levels, per-viewer views, and waits* — a multi-actor shared artifact, not a sufficient statistic. This is precisely where we must go beyond the paper.
- **Null-deletion merge is dangerous for business truth** — business facts need append/soft-delete/version semantics, never destructive merge. Their 68% error class is also a design warning: destructive merges fail even when intended.


## 8. Automata — recovering behavior structure from traces

**What it is.** A study that takes large corpora of agent execution traces and collapses each corpus into **one compact finite-state machine (FSM)** — typically 7–43 states — that summarizes the *behavioral topology* of the system. That FSM then does two jobs: predicting the next step, and predicting failure early.

**Core findings:**
- Agent traces have a tiny "activity alphabet" (6–42 symbols), so the FSMs build in milliseconds and replay held-out traces at ≥0.997 fitness.
- **"Behavioral topology appears shaped more by the deployment harness than by the LLM"** — across four different chat models on the same benchmark, a single FSM fit them all. The harness, not the model, gives an agent its shape.
- An online monitor using FSM-state features ranks failing runs above passing ones **from a partial trace** — enabling early stopping before the run finishes and burns budget.

**Aligned with Tend:**
- A candidate **monitoring primitive** for the "is the system behaving unexpectedly?" problem in our Explainability and Observation batch: recover the FSM from Tend's own traces, then watch live situations against it. A situation wandering into a never-before-seen state is a concrete, computable definition of "unexpected."
- Their harness-shapes-behavior finding *supports our entire thesis*: if the topology comes from the harness, then building the harness deliberately — rather than hoping the frontier model behaves — is the highest-leverage engineering act available to us.
- Failure prediction from partial traces is relevant to our honest-endings discipline: catching a drifting situation *before* it declares a false ending.

**Invalid for us:**
- It is an analysis technique, not a runtime architecture — nothing here tells us how to build a loop.
- Derived from benchmark traces (coding, web, customer-service chats); Tend's traces will include business state transitions and human interactions, which their alphabet model doesn't anticipate. Reusable method, not reusable results.


## 9. AutoSaddler — fixing the harness automatically from failure traces

> **Status update (Part 12 §12.2):** AutoSaddler is now a **released, MIT-licensed tool** (microsoft/AutoSaddler, arXiv 2608.23041, 2026-08-24), not paper-only. Its V2 engine is a durable, resumable, plugin-based optimization system (append-only events, content-addressed candidates, evolution DAG, `--fork-from-run-id`). The findings below were read from the paper; the tool now makes them a testable reference implementation.

**What it is.** Microsoft research that treats **harness improvement as an offline learning problem**: diagnose failure traces, generate targeted patches to the harness (prompts, tool configs, control logic — "the harness as code"), and select updates by validation rather than hope. Gains of 9–10 points on GAIA2, SWE-Bench Pro, and Terminal-Bench over the base harnesses.

**The three ingredients their ablations identified:**
1. **Deep debugging rather than shallow reflection** — find the actual cause in the trace, don't ask the model to "try harder."
2. **Targeted modifications rather than unconstrained editing** — patch the failing mechanism, don't regenerate.
3. **Generalization-aware selection** — keep only patches that fix the failure class *without breaking other cases* (validated against held-out scenarios).

**Aligned with Tend:**
- **This is the harness-side twin of our fine-tuning flywheel.** One trace stream, two consumers: AutoSaddler-style diagnosis patches *the harness* (prompts, validators, guardrail thresholds); our flywheel trains *per-deficit model adapters*. The paper proves the harness half can be substantially automated.
- Their three ingredients read as a direct specification for our trace-based improvement loop, and mirror the replay/regression discipline our automatic-learning evaluation already requires ("a lesson that prevents one failure by blocking valid work is not automatically an improvement").
- Deep-debugging-not-reflection is the same rule as our "a mistake needs an external signal — the model's private feeling is not enough."

**Invalid for us:**
- Assumes the harness is a freely-editable code artifact and benchmarks are the judge. Tend's harness contains business authority boundaries that no automatic patcher may cross — patches must be scoped to behavior, never to policy (our acceptable-learning boundary, applied to harness changes).
- Validated on generic agent benchmarks; our validation sets are business situations with expected refusals, which is *better* — but means their selection method transfers only with our eval discipline in place.


## 10. EvoHarness-RL — a small model trained to use external state

**What it is.** UIUC + Meta research training a small model (Qwen3-8B) to *use its own harness deliberately*: the harness exposes external state — **Belief, Progress, Experience (BPE)** — as a policy-facing workspace, and the model learns *when* to read it, update it, and consolidate it. Result: 96.9% success on ALFWorld.

**The training recipe (the second model-problem precedent):**

```text
Step 1  SUPERVISED HARNESS FINE-TUNING (SFT)
        teach the base agent the harness action space and how to
        construct useful external state
Step 2  COST-AWARE GRPO (reinforcement learning)
        learn coordination policies: selectively read, update,
        consolidate state during long horizons — because every
        harness call costs tokens
```

**Two discovered dynamics worth knowing:**
- **Harness annealing** — as training internalizes recurring harness-use patterns into the model, the agent *stops calling the harness so often* and touches external state selectively. Behavior migrates from harness into weights.
- **Harness evolution** — progress updates and experience consolidation refine the external state into a compact, task-adaptive substrate.

**Aligned with Tend:**
- **SFT-first-then-RL on a small model is exactly our Stage C path**, and the SFT target — "teach the model the harness's action space" — is exactly our "fine-tune the model to think in Tend's thought process," not to know the business.
- **BPE is a third independent convergence on state-first execution** (with SKILL.state's Σₜ and our situation model). Belief ≈ our known/unknown/conflicting claim states; Progress ≈ our asks and their endings; Experience ≈ our episodic memory.
- The annealing dynamic predicts something we should expect and plan for: as adapters mature, the model needs less scaffold — the harness should be built to *measure* that, not fight it.

**Invalid for us:**
- Single-agent game domains (ALFWorld) with a clean reward signal. Tend's "reward" is business outcomes + human corrections — noisier, delayed, and partially unobservable.
- Their state is a private workspace for one agent; ours is a shared, auditable, multi-actor artifact with authority rules.


## 11. Prime Agent — persistent workspaces and supervised sessions

**What it is.** An open-source harness from Prime Intellect for long-horizon evaluation and coding workflows. Its principle sentence could almost be ours: *"This low-friction, expressive membrane prevents harness failures from becoming model failures and pushes measurement toward the model's true maximal underlying capability."*

**What it provides (architecture from the paper):**

```text
persistent IPython REPL  ← Recursive Language Model abstraction:
                            programmatic context processing and
                            test-time compute OUTSIDE the model
Continual Harness        ← histories, memories, skills, prompts, and
                            subagent specs persist ACROSS trajectories
recursive subagents      ← agent-to-agent communication; dedicated
                            subagents parallelize work
Agents View              ← humans inspect and manage daemon-backed
                            sessions (supervision UI)
standardized: execution, recovery, verification, resource accounting
```

**Aligned with Tend:**
- **The membrane principle.** Isolate the model so that harness problems (a crashed tool, a lost file, a bad parse) surface *as harness failures* — diagnosable and fixable — instead of polluting the model's behavior. Our bounded-artifact validation is the same idea at a finer grain.
- **Persistence across trajectories** (memories, skills, procedures that survive the session) anticipates our situation models and business knowledge outliving individual runs.
- **Recovery, verification, and resource accounting as standard harness duties** — matches our failure classes and trace requirements.

**Invalid for us:**
- REPL/code-workspace-centric: the model's main tool is a Python shell. Tend's capabilities are business operations with preconditions and authority — not a general compute membrane.
- No business actors, no policy, no waiting; evaluation-first design rather than production coordination.


## 12. SLM Edge Agents — small models carrying cognition

**What it is.** An exploratory study (University of Central Lancashire) running small language models — Qwen2.5 variants — on an edge device (NVIDIA Jetson) to power the "think" and "memory" processes of an embodied virtual agent. It evaluates routing accuracy, memory-read performance, and latency rather than task success.

**Aligned with Tend:**
- **Evidence that small models can carry product cognition** when the job is bounded: routing decisions, memory reads, structured responses — measured with latency budgets, not just accuracy. This is the feasibility side of our 3B–7B-per-component plan.
- Its architecture separates *perception, memory, reasoning, planning, action* as distinct processes with distinct models — the same componentized-cognition shape we intend.

**Invalid for us:**
- Exploratory quality, metaverse/embodied domain, no verification harness, no business semantics. Useful as a feasibility signal; useless as a design source.


## 13. Agent Seer — evaluation scenarios synthesized from tool specs

**What it is.** Apple research that generates realistic **multi-turn evaluation scenarios for tool-using agents directly from tool specifications** (e.g., an MCP description) — no hand curation, no live tools. It enriches raw schemas, generates graded scenarios with synthetic tool outputs, and expands them into multi-turn dialogues.

**Aligned with Tend:**
- A candidate **scenario-generation method for our golden test sets**. Our Explainability batch requires situation-level golden scenarios — including expected-refusal cases. Generating candidate scenarios from *capability specifications* (our equivalent of tool specs) could bootstrap that corpus, with humans curating rather than authoring.
- Their three named evaluation problems map to ours: curation bottleneck (our golden sets are expensive by hand), static-benchmark drift (our capabilities will evolve), and the multi-turn gap (situations are inherently multi-turn).

**Invalid for us:**
- Scenarios from tool specs cover *tool-interaction* cases; Tend's hardest scenarios are business ones — missing sources, conflicting actors, waits, authority boundaries — which no tool spec encodes. Use it for breadth; the depth cases still come from our Level 1 failure classes and journeys.


# Part 3 — What All of It Says Together

Read together, the five repos and eight papers converge on eight findings. Each is stated with its sources, because a finding with one source is an opinion.

**1. State-first execution beats transcript growth — three independent confirmations.**
SKILL.state (structured state 0.94 vs truncation 0.18 / compression 0.22 / summarization 0.52 at equal token budgets), EvoHarness-RL (Belief/Progress/Experience as policy-facing state), and our own Level 1 ("the business needs artifacts, not only conversations"). The situation model is not a memory bolt-on; it is the execution substrate.

**2. The per-step contract repeats across every serious system.**
(P, Σₜ, Oₜ) → (reasoning, patch, action) → deterministic validation → apply → discard reasoning. TeleChat: constitution slice + plan artifact + code verifier. Pi: spec + args + validators. SKILL.state: explicit. Hermes: intent persist + guardrails. When we draft Tend's loops, every component loop should be an instance of this contract with different P, Σ, O and different validators — one protocol, many instantiations (JIT-Agent's lesson: fixed interfaces, conditioned behavior).

**3. The harness, not the model, shapes agent behavior.**
Automata measured it (same FSM fits four different models); JIT-Agent and AutoSaddler built products on it. Building the harness deliberately is the highest-leverage act; model quality is the second-order term.

**4. Verify artifacts, never reasoning.**
TeleChat verifies plan/result/grounding and still misses intent — proof that artifact verification is necessary but needs an ask-coverage layer. Your J&F rule and our recorded decision agree: no runtime LLM-critique of reasoning; it loops. Reasoning quality is fixed offline from traces.

**5. Traces are the metabolism of improvement.**
One trace stream, three consumers: harness patches (AutoSaddler), per-deficit model adapters (our flywheel; JIT-Agent Stage II repair data), and behavioral monitoring (Automata). Trace format is not an observability detail — it is a training-data contract.

**6. Small models fail at adherence, not reasoning.**
SKILL.state: 68% overwrite / 20% schema / 12% syntax. EvoHarness: 8B reaches 96.9% *when the harness teaches it*. Implication: deterministic validators + targeted fine-tunes on adherence-class deficits — never "buy a bigger model" as the first response.

**7. The frontier→small transition has a proven recipe.**
Teacher-generated protocol-compliant examples → SFT (JIT-Agent Stage I; EvoHarness step 1) → preference/RL on cost-aware signals (EvoHarness GRPO; JIT-Agent Evo-GDPO) → repair trajectories from failures (JIT-Agent Stage II; AutoSaddler). All four stages consume the same artifact: verified traces.

**8. Nobody solves Tend's problem.**
Every system is request- or session-scoped: one user, no waiting, no business policy, no authority gates, no multi-actor stories, no honest endings per ask. This is the white space — and the risk — of Tend.


# Part 4 — What Tend Is Trying to Do Differently

What Tend attempts that none of the studied sources does, stated as deltas so the loop drafting can be checked against them:

**1. The unit of work is a situation, not a task or request.**
A situation is one storyline with multiple asks, multiple people, multiple systems, that lives across days, gets interrupted, waits, resumes, and must reach an honest ending: answered / deferred-with-wait / escalated / unanswerable-declared. Every studied system terminates when the model stops calling tools or the plan finishes.

**2. Events arrive from many directions while work is in flight.**
Customer messages, payments, deadlines, employee answers, external agents, business-system changes — colliding with in-progress work on the same situation. No lock on the conversation surface; concurrent situations per human; a versioned shared state that serializes the collisions.

**3. Business policy and authority are runtime constraints on every action.**
The model proposes; deterministic code authorizes — against the *business's own* configured rules, per actor and per action. Studied systems have at most a capability registry, never a granted-range model.

**4. Memory is seven typed things with an ownership boundary.**
Conversation history, situation memory, episodic experience, semantic business knowledge, procedural memory, error memory, policy — each scoped, versioned, retirement-not-deletion, with the LLM proposing but never establishing identity or supersession. Closest studied analog (supermemory) deliberately lacks these strictnesses.

**5. The model layer is a replaceable curriculum.**
Frontier model first; every loop emits training-grade traces from day one (experience + outcome + external failure signal + error category); per-deficit adapters shift components to small fine-tuned models one bounded artifact at a time, with the strategic decision components last. The acceptable-learning boundary (behavior yes, policy/authority never) bounds what weights may ever carry.

**6. The business sees artifacts, not chats.**
Chat is an entry point for search, instruction, and explanation; the primary representation is the situation graph with its waits, evidence, decisions, and responsibilities.


# Part 5 — Decisions This Study Feeds

Decisions already recorded elsewhere that this study's evidence supports or constrains — cited, not restated:

1. **Situation model as execution substrate** (Understanding; SKILL.state + EvoHarness converge from outside). Open extension: the state must carry provenance/conflicts/waits beyond SKILL.state's sufficient-statistic limit.
2. **Retrieval pipeline: hard scope filters before semantic ranking; semantic similarity never establishes identity or truth** (Memory & Knowledge). The J&F benchmark plan (strategies A–G, governing-evidence recall, supersession error rate) is the Level 3 evaluation design.
3. **Trace format = training-data contract** (Observability/Explainability record). AutoSaddler + Automata add two consumer requirements: traces must be deep-debuggable and structurally recoverable.
4. **The model problem, staged:** frontier-first engineering; rejection-sampled SFT from machine-verified trajectories; preference pairs from externally-signalled failures; per-deficit adapters; strategic components last. Curriculum bounded by the acceptable-learning list; business knowledge stays in skills/memory, never in weights.
5. **Golden scenarios** (Explainability batch): situation-level, including expected refusals; Agent Seer offers breadth-generation from capability specs; depth cases come from Level 1 failure classes.
6. **Loop drafting requirement:** every loop is an instance of the per-step contract, emits its own trace segment, and classifies as strategic / bounded-artifact / supervision / one-shot — now evidence-backed.
7. **Observability is a first-class loop responsibility** (not a dashboard): two hulls watched via the same event fabric; anomalies feed both Failure triage and the improvement machinery.

# Part 6 — The Conversation-Manager Loop (first draft, grounded in the Communication category)

This is the first loop design, built directly on Parts 1–5 and the Communication & Explainability knowledge-base categories. It is a draft — a candidate to be challenged, not a decision.

## What this component is, in two parts

The conversation manager is the single surface every interactor touches: customers, prospects, owners, employees, partners, external agents. It has two jobs:

1. **The understanding agent (NLM)** — takes a message or event, figures out what it means, decides which situation it joins (or whether it starts a new one), and **writes the first version of the situation model** — with templates and automated metadata so ownership and lineage are recoverable.
2. **Requesting expression** — when a situation must be communicated, the conversation manager does not send. It requests the communication layer — the shared expression component that it and the situation worker both trigger (Fork B ruling, §11.6). The layer expresses the permitted interaction to the right actor, at the right depth, on the right channel: replies, acknowledgments, updates, status answers, clarifications, and communications that *start* situations (e.g. the owner's CSV outreach).

A critical boundary, drawn from the Communication category: **this component does not decide the business behaviour.** Decision Making selects the behaviour (gather / wait / ask / communicate / escalate). The conversation manager owns *understanding* (placement into situations) and *requesting expression* — it never sends directly. It owns exactly one standing rule in code, not in the model: every inbound human message to an active or new situation gets an honest acknowledgment unless a business rule defers it — requested through the communication layer like every other outbound act (Fork B ruling, §11.6). That is policy, not judgment.

Communication can *start* a situation, not only respond to one — the owner's CSV instruction is simultaneously the first event of thirty new situations and the first communication about them.

## The Fork B ruling, applied here (Swaraj, 2026-09-04)

Full ruling text in §11.6. In one breath: **the worker never communicates directly — it updates the situation model, and the communication manager reacts to the change and communicates.** Swaraj's picture: think of a Kanban ticket. The worker (human or Tend) updates the ticket with its work — done / waiting / etc. The communication manager is watching the ticket, gets the notification that the watched issue changed, reads the new state, and communicates the update to the human (or asks, escalates, confirms). Expression lives on the read side of a state change, never on the write side.

Consequences for this component:
- The conversation manager and the situation worker share **one** expression path — the communication layer. There is no second, private sending path here.
- The inbound-acknowledgment standing rule is a request to that layer, not a send.
- **Tool confirmations never touch the agent loop:** a tool that needs specific confirmation (a yes/no approval button, Cursor-style approval) runs its pre-configured confirmation flow through the communication layer from the deterministic tool side — the loop only learns the authorised outcome.
- The owner-CSV, Apollo-leads and background-update scenarios below still read the same: the component that decides writes state; the layer reads and expresses.

## Templates and automated metadata

Every new situation model is stamped at creation:
- **author** — which actor/event/message created it;
- **lineage** — which messages and prior situations fed it (journey edges, recorded once);
- **purpose template** — the journey shape: customer inquiry / delivery failure / owner outreach / employee handoff / external-agent result / scheduled responsibility;
- **ask list** — the concrete asks the situation holds;
- **viewer set** — which actors may see it and at what depth.

This is what makes the "owner asks about a customer a year later" question answerable without reconstruction: resolve *who* from the author/lineage metadata, then rank by the purpose template and ask list.

## The loop, as an instance of the per-step contract

```text
event arrives  (human message, situation update, or background event)
   ↓
WHO?               code: identity, actor, channel, viewer permissions
   ↓
MEANING            P = conversation constitution slice,
   |                Σ = person profile + this actor's open situations,
   v                O = the event
   LLM → bounded artifact:
        { interpretation, referenced_thing?, candidate_situations,
          purpose_template, ask_list, new_or_join, confidence }
   ↓
VALIDATE           code: schema, references exist,
   |                0 / 1 / many candidate matches
   v                (TeleChat's draft-resolver pattern — never silent
                    pick, never confident guess)
   ├─ 0 or many → clarify to this actor with options; trace; stop
   ├─ 1 match   → patch that situation: append version, new ask
   ├─ none/new  → CREATE situation model WITH templates + lineage
   └─ not work   → no situation (small talk; ack; stop)
   ↓
BEHAVIOUR CHOICE   NOT here. The situation worker decides
   |                (gather / wait / ask / communicate / escalate).
   v                The conversation manager learns it later via the
                    trace and the updated situation model.
   ↓
COMMUNICATE        when behaviour == "communicate":
   |                - target actor + depth + channel
   v                - grounded in current situation state ONLY
                    - uncertainty as states + reasons, not a score
                    - conflicts preserved neutrally, per recipient role
                    - explanation = minimum sufficient for THIS
                      viewer's responsibility and authority
                    - NEVER an ungrounded claim or a future-tense
                      promise the situation has not earned
   ↓
TRACE + LISTEN     every LLM proposal and decision emitted as
                   its own trace segment; no lock held; next event
                   processed independently
```

**The trace requirement is satisfied by design:** steps "MEANING" and "COMMUNICATE" emit an artifact plus reasoning-as-gift; step "VALIDATE" emits the decision and candidate count. Training-grade data from day one, produced even while the frontier model does the thinking.

## Communication rules, applied as validators (from the Communication category)

These validate every outbound message, not suggest:
- **When to communicate:** only when it answers a supported request, communicates a material change, identifies a required next step, requests missing info or human responsibility, prevents a harmful surprise, corrects an earlier message, makes waiting visible, satisfies a commitment, carries out a business instruction to a named contact, or communicates a safe decision result. Not merely because words can be produced.
- **When to wait:** when a material fact or ambiguity is missing, conflicting info affects the response, approval is pending, the next event hasn't happened, nothing has changed since the last message. The wait stays visible (reason + what's waited for + who responds + what happens when it ends) — never forgotten silence.
- **Ask vs act:** ask when the unresolved answer could change which situation, what's wanted, which info is required, who's responsible, which policy applies, whether the action is allowed, or the consequence. The question goes to the *right* actor — never ask a customer to resolve an internal business conflict.
- **Explanation depth:** minimum sufficient for this viewer's responsibility, authority, consequence, sensitivity. Customers get what happened / known / uncertain / next. Employees/owners additionally get evidence, missing info, deadlines, authority required. Partners get only the operational context they own.
- **Uncertainty:** as states and reasons, not a universal confidence score — communicated when it changes what the recipient should understand, expect, decide, or do.
- **Conflicts:** preserved neutrally; never silently pick the latest source, never accuse, never convert one claim into truth, never perform a consequential action the conflict blocks.

## Scenarios walked through the loop

*Customer parcel question.* WHO: customer, limited depth. MEANING: question, matches one open delivery situation. UPDATE: append a follow-up ask. BEHAVIOUR (situation worker): gather from carrier — cannot yet communicate. Later, a second communication event flows out grounded and honest — or a no-source declaration if no shipping source exists, preventing the TeleChat adjacent-answer failure.

*Owner CSV campaign.* WHO: owner, full authority. MEANING: instruction to contact named people about a product; matches nothing. CREATE: one parent situation ("owner outreach campaign") + thirty child situations ("individual introduction"), linked by lineage, each with ask list and viewer set. COMMUNICATE: artifact tracker to the owner; introductory message to each contact (no internal evidence). The manager returns to listening while the thirty children run — no lock.

*Apollo returns leads.* WHO: the connected external agent within owner-granted scope. MEANING: lead data, references existing children or starts new ones, source tagged external (provenance, not authoritative by default). Situation worker decides next behaviour; manager expresses.

*Background situation update.* O is an update, not a message. DECIDE: policy says who watches which situation; judgment says whether this change clears the bar for interrupting a human. COMMUNICATE: per-viewer depth, batched or immediate by rule (owner gets "3 replied, 1 wants a meeting" — not thirty notifications).

*"What happened with that customer?"* WHO: owner. MEANING: search-like need. Memory machinery resolves *who* from profile/lineage metadata, hard-filters by business and permission, semantically ranks by story, disambiguates with a short list on many matches, loads the situation graph, answers honestly — including waits that never ended.

## What this draft still needs

The communication layer above is the 20% that was missing. Still open:
- exactly which steps produce *training* traces vs *audit-only* traces (the boundary between Memory/Knowledge's trace-recording and learning responsibilities);
- how the conversation manager's "meaning" artifact relates to the Understanding category's situation model (it writes the first version — does Understanding own later versions, or does every loop own its own?);
- the concrete acknowledgment policy (when defer, when silence, when a full reply) as a business-configurable rule set.


# Part 7 — Where the System Goes Wrong (Observability & Explainability)

The Explainability and Observation category draws a clean line: **one durable record already exists** (claims with provenance, versioned situation models, event records, wait records, declared outcomes, run-ID-linked traces). This category decides *who sees that record at what depth* and *how the system watches itself through it*. Two responsibilities, different consumers:

- **Explainability** turns a recorded reason into something a decision-maker can use — the emitted reason plus evidence references, at each audience's depth.
- **Observability** is the builder's complete view of system behaviour (execution evidence, dev and production) plus the health signals that say behaviour is still sane.

## The five ways things go wrong (anomaly classes)

"Expected" is defined by what we already settled: the product invariants, the situation model's discipline, and the recorded baseline of past behaviour. Unexpected behaviour falls into five classes, layered by how cheaply they can be checked:

**Class 1 — Invariant violations (deterministic, always on).** A guess shipped. A silent failure was attempted. An action ran outside its grant. A provisional interpretation reached a customer as fact. These are never-events; the invariant list is the baseline of "expected."

**Class 2 — Completion-discipline violations (deterministic, always on).** A story resolved with an open ask. A capability-absent conclusion where a source actually existed. A wait that ended without its release policy being honoured. The ask-endings vocabulary makes these mechanically checkable — and they are the conversation manager's and situation worker's core correctness signal.

**Class 3 — Coherence failures over threshold (deterministic + judged, sampled).** Subject mismatch between ask and answer; grounding misses; relevance judges failing above a configured rate. This is the TeleChat defect class (valid plan, wrong subject) made measurable.

**Class 4 — Drift signals (statistical, scheduled).** Provider hull and harness hull shifts — tool-call distributions, schema conformance, latency/cost, output content moving week over week beyond tolerance.

**Class 5 — Operational anomalies (statistical + judged, sampled).** Loops, repeated escalations on similar situations, trajectory shapes far from successful peers.

The layering rule: classes 1–2 run always and cheaply; 3 runs per interaction with judges sampled; 4–5 run on schedules against samples. And validators themselves need calibration — human-graded golden sets stay alive, because criteria drift is real.

## Where anomalies go

- **Situation-scoped** anomalies update that situation's model — they are facts about the story — and surface to whoever owns it.
- **High-consequence** anomalies enter Failure's triage path (responsibility → consequence → severity → promise).
- **All** anomalies land in traces: feeding golden sets, drift baselines, and eventually fine-tuning data — an anomaly is also a lesson waiting to be learned.

## Two hulls, watched separately

Health observation is a first-class responsibility — the observer — and a well-behaved citizen of the harness: it emits *observation events* onto the same event fabric everything else uses. It watches two hulls because an AI agent is LLM + harness, and the failure modes differ:

- **Provider hull** — fixed probe suites (small deterministic canary prompts) run under sealed settings on a schedule; outputs compared against baselines; classified as drift, alias change, or context mismatch. This catches "the LLM itself has regressed or the provider is serving something worse" without waiting for a user complaint.
- **Harness hull** — golden-test suites over realistic trajectories run whenever prompts, tools, or policies change; sampled production traces re-run and compared for drift in tool-call distribution, schema conformance, latency/cost, output content; completion-discipline checks (classes 1–2 above).

Everything the observer produces lands as an observation event on the queue — no special channel, no side door, full traceability of the observer itself. Businesses see business value, never uptime dashboards.

## Reconstruction after the fact

Nothing new is recorded at reconstruction time; everything was recorded as it happened: the story spine (versioned situation models, each with its immutable reason and claims), the actions (what ran, on which evidence, under whose authority, with the emitted reason-key), the waits and declarations, and the journey edges to linked situations. Reconstruction is a *view* over that record — same data, viewer-dependent rendering: a linear timeline for non-technical viewers, a graph view for builders, toggleable. A derived capability waiting to be designed: question-driven reconstruction ("why did Tend tell this customer X?") answered by extracting the causal chain rather than showing everything.

# Part 8 — How We Find, Fix, and Improve the System

Parts 6 and 7 tell us *what the loops are* and *how we know they're sick*. This part tells us *how we get them well and keep them well* — the improvement machinery, grounded in AutoSaddler (harness repair), Automata (structural baselines), and a real self-evolution library we reverse-engineered from code.

## The improvement surface: what we are allowed to touch

Three distinct surfaces, each with its own mechanism:

| Surface | What changes | Mechanism | Risk |
|---|---|---|---|
| **Prompts / instructions / skill text** | The words the model sees | Search/optimization over text (no weight training) | Low — versioned, reversible |
| **Harness code / validators / guardrails** | The deterministic checks around the model | Patch from failure traces, validated | Medium — gated by tests |
| **Model behaviour (weights)** | How the model reasons inside bounded shapes | SFT → preference/RL on verified traces | Highest — must stay within the acceptable-learning boundary |

Prompts and harness code are "prompt optimization" (first half of this part). Model weights are the Part 5 model problem, covered briefly as the consumer of the others.

## Source: a real self-evolution library, read from code

`hermes-agent-self-evolution` (Python, NousResearch) is a standalone optimization pipeline operating *on* an agent. Three engines, one workflow:

| Engine | Optimizes | License | Role |
|---|---|---|---|
| **DSPy + GEPA** | Skills, prompts, instructions, tool descriptions | MIT | **Primary engine** |
| **Darwinian Evolver** | Code files, algorithms, tool implementations | AGPL v3 | External CLI only |
| **DSPy MIPROv2** | Few-shot examples, instruction text | MIT | Native Python fallback |

### Why GEPA is the star

GEPA is integrated into DSPy. Verified against the library's code and surrounding literature:
- It reads **execution traces** to understand *why* things fail — not just that they fail (matches AutoSaddler's "deep debugging rather than shallow reflection").
- Works with **as few as 3 examples** — no large dataset needed to start.
- **Outperforms both RL and previous DSPy optimizers** on tested tasks.
- **No GPU training.** Everything via API calls. GEPA optimizes *text* — mutates and evaluates strings, not model weights. The library explicitly excludes `BootstrapFinetune` (the one DSPy component that trains weights). Prompt optimization is cheap, reversible, carries no weight-training risk.

### The four tiers of what to improve (from PLAN.md)

1. **Skill files (highest value, lowest risk)** — `SKILL.md` procedural instructions. Pure text, easily mutated, directly measurable. Wrapped as a DSPy module, evaluated via `batch_runner`, evolved with GEPA.
2. **Tool descriptions (medium value, low risk)** — the `description` field in tool schemas. Tool selection is a classification problem, perfect for DSPy.
3. **System prompt components (high value, higher risk)** — persona, policies, formatting. Optimized offline only, deployed as new versions, with care not to break prompt caching.
4. **Code evolution (high value, highest risk)** — tool implementation code. Requires strong test suites (100% pass, zero tolerance).

For Tend, tiers 1–3 map onto our skill-text and instruction-text; tier 4 is harness code, better handled by AutoSaddler.

### The evaluation dataset builder (from code)

`evolution/core/dataset_builder.py` builds evaluation sets from three sources — a design template for our golden sets:
- **A) Synthetic generation** — a strong LLM reads a skill/tool/prompt and generates `(task_input, expected_behavior)` pairs. Fast, scalable, needs curation.
- **B) SessionDB mining** — extract real usage patterns from production traces, score with LLM-as-judge. Our verified-trace stream, repurposed as evaluation data.
- **C) Golden sets** — hand-curated JSONL files. Small, high-truth, held out.

All three are split train/val/holdout. The holdout catches overfitting (a prompt gaming training but failing unseen cases).

### The fitness function (from code)

`evolution/core/fitness.py` scores agent outputs on a multi-dimensional rubric, feeding textual feedback to GEPA for reflective mutation:

| Dimension | Weight | Measures |
|---|---|---|
| Correctness | 0.5 | Did the response correctly address the task? |
| Procedure following | 0.3 | Did it follow the skill's procedure? |
| Conciseness | 0.2 | Appropriately concise without omitting key info? |
| Length penalty | subtracted | Ramps in if artifact exceeds 90% of its size budget |

The LLM-as-judge provides specific, actionable *feedback* — not just a number — so GEPA reasons about *what to change*, not just *that something is wrong*.

### The constraint system (from code)

`evolution/core/constraints.py` enforces hard rules every variant must pass or be rejected immediately:
- **Size limits** per artifact type (skill / tool description / parameter description).
- **Growth limit** — evolved prompt cannot exceed a configurable % of original length (prevents evolutionary bloat).
- **Non-empty** and **structural integrity** (e.g. a skill file needs valid YAML frontmatter with `name` + `description`).
- **Full test suite gate** — for code evolution, 100% pass, zero tolerance.
- **Semantic similarity checks** — evolved text is compared against the original to ensure it drifts in *effectiveness*, not in *meaning*.

### Deployment safety and costs

All evolved changes go through a **pull request** — never a direct commit. The PR body includes before/after scores on train, validation, AND holdout; the full diff; the optimization cost; and any constraint violations caught and rejected. Every evolution step is a git commit; rollback is trivial.

Practical costs: GEPA optimization ~$2–10 per run; Darwinian Evolver ~$2–9 per task. Start with 10–20 examples, scale up for important skills.

### What the library does NOT do (gaps we must fill)

Reading the code honestly surfaces what it leaves out:
1. **No business-authority constraint.** A prompt that improves correctness but causes the agent to exceed its grant would pass the fitness function. Tend must add authority-compliance checking the library lacks.
2. **No live-production loop.** It optimizes offline on datasets; Tend needs the Online-Stream pattern — updating from execution feedback as it arrives.
3. **No harness-hull watching.** It optimizes prompts but does not detect that the harness itself is drifting. That is AutoSaddler + Automata's role.
4. **Python-only** — relevant to the language choice below.

## The harness-repair half: AutoSaddler + Automata

Prompt optimization (the library above) improves the *words*. AutoSaddler and Automata improve the *code and structure around the words* — and they are the diagnosis engine that tells us *where* things go wrong.

**AutoSaddler** formulates harness improvement as offline learning from failure traces. Its three ingredients, validated by ablation, are a direct specification for our harness-repair loop:
1. **Deep debugging, not shallow reflection** — find the actual cause in the trace (matches GEPA reading traces for *why*).
2. **Targeted modifications, not unconstrained editing** — patch the failing mechanism (a validator, a guardrail threshold, a retry rule), don't regenerate.
3. **Generalization-aware selection** — keep only patches that fix the failure class without breaking held-out scenarios (mirrors the library's holdout discipline).

AutoSaddler's three ingredients map onto Tend's anomaly classes: a Class-2 completion-discipline violation or a Class-3 coherence failure is precisely the trace-level signal that should trigger a *targeted harness patch*, not a prompt rewrite. This is the "diagnosis → targeted patch → validation + reset" you named.

**Automata** provides the structural baseline: collapse Tend's own traces into a finite-state machine (7–43 states, built in milliseconds, replaying held-out data at ≥0.997 fitness). Two uses:
- **The "expected" baseline.** Automata found behavioral topology is "shaped more by the harness than by the LLM" — so the FSM derived from our golden trajectories *is* the definition of expected behaviour. A live situation wandering into a never-before-seen state is a computable anomaly.
- **Early failure prediction.** Per-state features rank failing runs above passing ones from a *partial* trace — enabling early stopping before budget is burned.

Together, the three tools divide the improvement labour cleanly:

| Tool | Watches / improves | Trigger |
|---|---|---|
| **Automata** | Structural FSM baseline + early failure detection | Scheduled + per-run |
| **AutoSaddler** | Harness code / validators / guardrails | Class-2 / Class-3 anomaly clusters |
| **DSPy + GEPA** | Prompts / instructions / skill text | Fitness plateaus, new task types |

## The language question: TypeScript vs Python

You noted DSPy ties us to Python while Cloudflare is TypeScript-native. The honest trade-off:

- **Python** is the language of every tool above (DSPy, GEPA, the self-evolution library, AutoSaddler's likely implementation, most LLM evaluation tooling). The optimization ecosystem is Python-first by a wide margin.
- **TypeScript** is the language of the harness itself (Cloudflare Workers, Durable Objects, the loops from Part 6).

The cleanest resolution the evidence supports: **the loops and harness run in TypeScript; the optimization pipeline runs in Python as a separate service.** They share only the trace format (already defined) and the artifact repository (git). The Python optimizer reads traces, proposes prompt/harness changes, validates them against golden sets in a sandbox, and opens a PR. The TypeScript harness merges and deploys.

## The unified improvement architecture

```text
Tend runs (TypeScript harness)
   ↓ emits
TRACE STREAM  (deterministic evidence + emitted reason + gift CoT)
   ↓ feeds three consumers
   ├── Automata ──────── structural FSM baseline + early-failure signal
   │                      (anomaly classes 4–5, "expected" definition)
   ├── AutoSaddler ───── diagnose failure clusters → targeted harness
   │                      patch → validate on holdout → PR (classes 2–3)
   └── DSPy + GEPA ───── optimize prompts/instructions/skills against
                          golden sets → validate → PR (fitness plateaus)
   ↓ all three produce
PULL REQUESTS ─── before/after on train+val+holdout, diff, cost,
                   authority-compliance check, constraint results
   ↓ human or policy gate
MERGE → redeploy → next trace stream validates the change
```

The observer (Part 7) sits above all three, emitting observation events when any of them shifts behaviour — so the improvement machinery is itself observed.

## The model problem, re-stated as the consumer

All three improvement surfaces feed the Part 5 staged model transition:
- **Verified traces** (the stream above) → rejection-sampled SFT data for the frontier model's good behaviour.
- **Per-deficit adapters** → trained on the failure clusters AutoSaddler and Automata identify, bounded by the acceptable-learning list (behaviour yes; policy/authority never).
- **Prompt/harness improvements** → reduce the deficit rate at the source, so the fine-tuned models inherit a cleaner harness.

The fine-tuned model is not taught the business (that lives in skills/memory at runtime). It is taught *Tend's thought process* — the bounded artifact shapes, the "stop and ask," the "defer to code," the honest endings — by learning from frontier runs that already did all that. The improvement machinery above is what makes those frontier runs worth learning from.

# Part 9 — The Prompt-Optimization Landscape (web research, 2026)

Part 8 grounded the improvement machinery in code we hold locally. Part 9 adds the *current, external* state of the field — gathered with TinyFish (search + fetch) and the GitHub repos behind DSPy and GEPA. This is the research follow-through on your prompt-optimization direction.

## Why prompt optimization exists (the problem with manual iteration)

Manual prompt iteration was our baseline and it fails the observability test: prompts are not versioned, not evaluated, not measurable, not observable. You can't answer "which change caused that regression" because there is no experiment. The paper *"Is It Time To Treat Prompts As Code?"* (arXiv 2507.03620) makes the case empirically with a multi-use-case study positioning declarative, self-improving programs against manual prompt engineering. Today prompts are *programs*: structured signatures, evaluable modules, and **optimizers that improve their own instructions** from execution feedback.

## DSPy, current state (2026)

- **Version/family:** DSPy 3.x (3.3.0b1 current beta; the 2.5 → 3.0 rewrite landed at Databricks "DAIS 2025"). ~35k GitHub stars; Stanford + Databricks + community.
- **Core idea:** "programming—rather than prompting". You declare *signatures* (`input -> output` with descriptions), compose them into modules, and let an *optimizer* improve the module's prompts/few-shots.
- **Notable recent capabilities:**
  - **ReActV2** — native tool calling with structured `dspy.History` (user/assistant/tool message groups, parallel tool calls by ID, multi-turn replays). Providers with prompt caching can reuse stable prefixes — up to 50% cost reduction on some tasks.
  - **Typed, provider-neutral LM boundary** — `LMRequest -> LMResponse` contract instead of provider-shaped kwargs; LiteLLM becomes an optional fallback rather than the core requirement.
  - **BetterTogether** — chain arbitrary named optimizers (e.g. `bootstrap -> gepa`) with an explicit `strategy=`; the valset picks the best intermediate program.
  - SIMBA — a lighter reflective optimizer for cheap exploration.

## The optimizer zoo: which tool for which job

| Optimizer | Mechanism | Best when |
|---|---|---|
| **BootstrapFewShot** | Samples correct outputs from *your own* program to build few-shot examples | Pure demonstrations; no instruction mutation |
| **MIPROv2** | Bootstrap demos + propose instruction candidates (dataset summary + program summary + reference demos + random "tip") then **Bayesian Optimization** over combinations via minibatch trials | Scalar-only metric; pure few-shot bootstrapping; very large trainset (500+) |
| **GEPA** | Reflective **Genetic-Pareto**: reads execution traces, gets scalar score + textual feedback, reflects per-predictor, proposes mutations, keeps a **Pareto frontier** of candidates, merges lineages | Rich, teachable feedback; multiple predictors needing targeted fixes; small rollout budget |
| **SIMBA** | Lighter reflective pass | Cheap exploration before a full GEPA run |

## GEPA in depth (the 2026 gold standard)

**Origin:** *"GEPA: Reflective Prompt Evolution Can Outperform Reinforcement Learning"* (Agrawal et al., 2025, arXiv 2507.19457). The name is **Genetic-Pareto** — a community skill doc correctly warns that "Genetic-Evolutionary Prompt Adaptation" is an LLM-hallucinated backronym; the *Pareto* is load-bearing.

**Why it's the reference:** it reads execution traces to understand *why* a score happened, not just that it happened — exactly AutoSaddler's "deep debugging rather than shallow reflection," applied to prompt text. Reported headline numbers (treat as vendor-parroted until we read the paper): beats GRPO by ~10% (up to 20%) with **35× fewer rollouts**; beats MIPROv2 by ~14% aggregate with prompts **9.2× shorter**.

**The algorithm, from the official DSPy docs:**

```text
init: candidate pool = unoptimized program
loop until rollout/budget exhausted:
  sample candidate from the Pareto FRONTIER (coverage-weighted)
  sample a minibatch from train
  roll out candidate on minibatch → collect execution TRACES + feedback
  select one module (predictor) of the candidate to improve
  LLM reflection: propose a new instruction for that module,
     guided by the traces/feedback (per-predictor feedback)
  roll out the mutated candidate on minibatch
  if improved → evaluate on the Pareto validation set
update candidate pool / Pareto frontier
  optionally MERGE best modules from distinct lineages, continue
return best candidate by aggregate validation score
```

### The metric contract is the whole game

GEPA needs `dspy.Prediction(score, feedback)` — a scalar plus a textual critique. A float-only metric makes GEPA no better than random search (a named anti-pattern). The official "recipe for GEPA-friendly feedback": leverage existing artifacts (logs, tests, schemas, errors); decompose outcomes into per-objective components (correctness / latency / cost / safety); expose trajectories with stage labels; and ground in automatic validators (unit tests, schemas, simulators) — LLM-as-judge only for what cannot be verified.

### Operational details that matter for us

- The `reflection_lm` must be strong (often the same or stronger model than the task model, `temperature=1.0`, large output budget). A small reflection model can't critique.
- `reflection_minibatch_size` (default 3), `candidate_selection_strategy` (`pareto` | `current_best`), `use_merge` (crossover), `skip_perfect_score`.
- **`log_dir` gives checkpointing and resume** — a long run survives a disconnect, and `/candidates/` exposes every proposed program for inspection (fits our observability discipline).
- **`track_best_outputs`** records the best prediction per task across candidates for inference-time best-of.
- **Anti-patterns:** float-only metric; same set for train and val (Pareto selection overfits); small reflection LM; `auto="heavy"` on an untested metric; ignoring `log_dir`.

## What this means for Tend's improvement pipeline (mapping to Part 8)

- **GEPA IS the "DSPy + GEPA" block in Part 8** — and its precondition is a rich-feedback metric. Ours is nearly free: the deterministic validator stack (schema, references-exist, authority, ask-coverage, grounding, communication-rule checks) returns both a pass/fail score AND machine-readable failure reasons — exactly the `(score, feedback)` contract, with no LLM-judge needed for the verifiable parts.
- **Per-predictor feedback = per-component loop optimization.** Each bounded artifact in Part 6 (meaning artifact, situation patch, communication message) becomes its own predictor with its own feedback stream — matching "every loop emits its own trace segment."
- **Pareto frontier parallels AutoSaddler's generalization-aware selection**: keep candidates that win on at least one evaluation instance without regressing others; holdout stays separate.
- **MIPROv2 as fallback** when a metric is scalar-only; SIMBA for cheap exploration; BetterTogether (`bootstrap -> gepa`) to seed examples first.
- **Cost profile confirmed:** ~$2–10 per GEPA run with 10–20 examples (the library's own estimate) — prompt optimization is the cheap lever compared with fine-tuning.
- **Python stands confirmed:** optimizer service in Python (DSPy/GEPA), harness in TypeScript, sharing trace format + git/PR — the standalone-pipeline shape.

## The GitHub repo as a source

The practical reference implementation of "GEPA on a real agent" is the `hermes-agent-self-evolution` repo (NousResearch), reverse-engineered in Part 8. Its PLAN and core modules translate generic DSPy/GEPA machinery into a concrete, test-gated, PR-deployed pipeline — the exact pattern Tend's optimizer service should follow. The DSPy repo (stanfordnlp/dspy) is the framework source; GEPA's engine is the separate `gepa` package (github.com/gepa-ai/gepa).

## Remaining questions / things to verify

- ~~**GEPA headline numbers**~~ — **VERIFIED in Part 12 §12.1** (read arXiv 2507.19457 directly). All three survive with precision corrections: "up to 35× fewer rollouts" (vs GRPO-with-LoRA at 24k rollouts, on Qwen3-8B); "+14% aggregate gain vs MIPROv2's +7%" (NOT "+14% over MIPROv2" — it roughly doubles MIPROv2's gain); "up to 9.2× shorter prompts." Tasks: HotpotQA, IFBench, PUPA, HoVer on Qwen3-8B + GPT-4.1-mini. "As few as 3 examples" confirmed by GEPA's FAQ.
- DSPy is officially Python-only; any TS tooling is third-party — a Level 3 decision, not a blocker, given the separate-service architecture.

# Part 10 — The Memory & Knowledge Capability (drafted in conversation)

> This part was built in a dedicated research chat. Swaraj's opening framing: knowledge is the situation map of our situation models. His running example: a customer chases a delayed order for weeks; a year later a new employee starts a fresh situation asking "tell me all incidents where our logistics were delayed" — the new situation model must find and reference the old ones. Two problems named at the start: (1) managing knowledge, situation models and their graphs; (2) how the background agent learns the business's processes and how it gathers the relevant subset of what it has learned, at the moment it is needed, with high accuracy — explicitly not with "low accuracy indeterministic technologies." Two repos assigned: supermemory (memory, self-improvement — already studied in Part 1 §5) and utopia (knowledge representation in graphical format, new to the study).

## 10.1 What was studied, and how

- **Utopia** (`Things to look at/utopia/`) — reverse-engineered from source and its 18 architecture decision records (`docs/decisions/`), not from the README. The decision records turned out to be the most valuable part: they are working-decision documents in the same genre as our knowledge-base question files, except each one carries measurements, dead ends, and dated revisions from re-checking the code.
- **Supermemory** — re-verified that the repo still contains only SDKs, MCP servers, apps and docs; the memory engine itself is closed source. Part 1 §5 (surface-level reverse engineering) stands; nothing new to read.
- **The full Memory & Knowledge Level 2 category** — all 19 files re-read after Swaraj challenged whether I had read it thoroughly. He was right to: the second read changed the conclusions below.
- **The Understanding the Situation and Journey and Lifecycle categories** — read for the situation-linking decisions that Memory & Knowledge reuses rather than re-derives.

## 10.2 Swaraj's corrections in this session [HIGH ATTENTION]

### 10.2.1 The false-fork correction

After my first pass on Utopia I closed with a fork: "should situation models live in the same claim substrate as business knowledge, or in a separate layer linked by reference?" Swaraj rejected the question itself:

> "no, i think the things about utopia maybe correct, but we derived completely different answers and model... we just want to know what utopia did and maybe take inspiration, we do not want to use utopia if it does not meet us... after reading the memory and knowledge part that knowledge representation (situation model representation) our answers were much well thought off and completely different use case built from first principles thinking for our product, not a general thing, whereas utopia wants to build something general. i think you have not thoroughly read the memory and knowledge... you would understand how we are linking multiple situation models and they are not fixed, but situation models can be linked later as we discover multiple situations, because unlike documents the conversations are dynamic and free flowing. also the graph query is something we can totally avoid as we can ourselves have very product specific relationships we can just figure out in the code... at the end of it what i remember what we have is graph data and not a graph structure."

**Standing rules:**
- Research sources are inspiration only. Our knowledge-base answers were derived first-principles for this product and outrank anything a general-purpose system does.
- The situation model is NOT fixed. Attach, create, split, merge, link, unlink, re-route are first-class operations; links between situations are discovered later, when a signal appears, because conversations are dynamic and free-flowing — unlike documents, which arrive static and complete.
- We have graph-shaped DATA, not a graph STRUCTURE. No graph storage, no graph query engine, no ontology to traverse. The handful of relationships Tend needs are product-specific and known in advance; they are figured out in code.

### 10.2.2 The framing ruling: memory is an independent component with its own loop

The base prompt's Section 11 fork ("component with its own loop" vs "set of data operations other loops call") is now ruled:

> "other systems keep memory data operations as part of the same loop, but we have fundamentally approached the problem as a software engineering problem and not an AI engineering problem. in my wisdom the responsibilities of memory create one unique and independent capability, so then we need memory as another independent component which interacts with other components of the agent to make one core agent capability, and the LLM is responsible to figure the interaction out. situation and memory both."

**Standing rules:**
- Memory is its own component with its own loop — one capability among others, not infrastructure folded inside everyone else's loop.
- The LLM figures out the interaction between memory and the other components when that interaction is dynamic; when it is fixed, it is pre-made code (the two-job rule, correction 2.6, applied to memory).
- My earlier reading in the base prompt ("mostly data operations, no strategic memory actor") was offered and overruled.

### 10.2.3 The no-thresholds ruling: no model-generated numbers in control paths

> "i do not think thresholds and numbers work well enough in production, especially the way to generate them is LLM or any other ML/DL model working on the natural language etc generated by an LLM. we will do away with it."

**Standing rule — the two classes of numbers:**
- **Scores produced by a model over natural language** (embedding cosine values, confidence floats, relevance scores) are OUT of every control path. They are opinions about text generated by another text generator: they do not replay, they do not survive a model swap, they cannot be explained to a business ("why did you attach this?" — "the vector said 0.58"), and a threshold built on them moves. This is a design invariant, not a tuning preference.
- **Counts of discrete events** ("this phrasing appeared in two independent documents", "this capability rejected this argument twice") are admissible if ever needed — facts about the world, reproducible and explainable. The distinction matters; do not flatten it.
- What replaces scores in control decisions: **states and structured matches.** Hard signal → act; soft signal → ask or hold; uncertain → separate/unresolved. The same tiered-signal discipline the routing decisions already use — routing and memory turn out to be one discipline.

### 10.2.4 Provisional items are Level 3 discussions

The items the Memory & Knowledge category itself marks provisional — the exact context-projection format per phase, the exact claim-family identity rules, the concrete acknowledgment policy — are parked as **Level 3 implementation discussions**. Level 2 stays conceptual.

### 10.2.5 The defense requirement

Swaraj asked for a defensible account of why Tend does not use supermemory/utopia (or their class): "my product demanded X and they were designed for Y, which could generally give me the whole thing but I wanted Z way of working." The defense is recorded in §10.7. The template sentence: **a memory system's control decisions are the product's decisions** — whoever decides identity, supersession, relevance and allowed influence owns the product's judgment.

## 10.3 Utopia — what it actually is (from code and decision records, not the README)

Utopia is a Rust + Postgres system that turns document corpora into a governed knowledge graph. Its self-description: "the enterprise world model" — a knowledge substrate with time awareness and ontology in the base layer, deployable offline, with a compliance audit trail. Built by DeepLethe, v0.1, Apache-2.0.

**The pipeline** (`docs/pipeline.md`, confirmed in `crates/`):

```text
document → parse → chunk (1200 chars) → embed        ← document searchable HERE (two-phase split)
                    ↓
        extract (one LLM call per chunk, using the ontology)
                    ↓
   ┌────────────────┴────────────────┐
entity resolution                 facts land in a BITEMPORAL LEDGER
(same name ≠ same thing;          (append-only; valid_from/valid_to = when true
prefer apart over merged;         in the world; invalidated_at = when we stopped
gray zone → review queue)         believing it; supersedes pointer; evidence chain
        ↓                          back to the exact chunk; confidence float)
adjudication (batched LLM         ontology growth (unmatched wording becomes a
with verdict cache, human         proposal; COUNTING decides adoption — MIN_DOCS=2)
final say)                              ↓
        └──────────── consistency check (pure logic — R0, writes nothing)
                      materialized inference (opt-in — R1, derived facts in a
                      SEPARATE table, asserted strictly overrides derived)
```

**The data model** (`migrations/0003_graph.sql`): `entity_types`, `relation_types` (each carries temporal semantics — state/event/eternal — plus axioms: functional, transitive, symmetric, inverseOf, subPropertyOf), `entities`, and `facts`. Everything else — conflicts, merges, retypes, adoptions, drops, violations — is a separate append-only table recording THAT the event happened. Nothing deletes.

**The reasoning engine** (decision 0002): built checker-first after transitive closure on real corpora exploded (185 `part_of` facts → 828 derived at depth 10, with real cycles from extraction errors). R0 checks and writes no facts; the ontology checks itself first (a self-contradictory ontology makes every fact-level conclusion suspect); derived facts live in their own table so a forgotten query change makes derivations INVISIBLE rather than MIXED IN as truth ("of the forty-odd queries that read `facts`, only one recognized a marker"). Proof chains run derivation → assertions → evidence → chunk → document.

### 10.3.1 The decision records — measured lessons, each mapped to our decisions

| Utopia decision | What they measured / learned | Status for Tend |
|---|---|---|
| **0015 — recording a sentence is not asserting a fact** | "Remember Acme moved HQ" put a live meaningless edge (confidence 0.9) into the graph; what the assistant SAID differed from what the graph GOT with no way to notice. Fix: facts from interactive `remember` wait in `pending_facts`, participate in nothing until the person nods; the card shows the ORIGINAL SENTENCE above the extracted triples ("triples alone ask for a judgment from nothing"). Gate applies per-item when a person is present and the material was said on purpose; bulk ingest skips it. | Confirms our "conversation history ≠ knowledge". The show-the-source-beside-the-proposal detail is worth borrowing for learning validation. The nuance (confirmation depends on who is present and how material arrived) is one we had not captured. |
| **0007 — counting decides what becomes a relation** | Asking an LLM which phrasings should become ontology relations failed (skipped `runs_on` with 8 documents of evidence; adopted a single-document `pledged_capital`). Replaced with deterministic steps: group by inflectional base, union of documents per group, MIN_DOCS=2. Fallback-relation share 55.5% → 25.8%. Same corpus now produces the same ontology (benchmakable). Explicit reason: the ontology feeds back into the extraction prompt, so one document's accidental wording would become a standing instruction — a memory-poisoning argument. | Validates "LLM proposes, deterministic system decides" with numbers. Note against 10.2.3: document COUNTS are event counts, not model scores — admissible in principle. The mechanism itself (ontology adoption) is not ours; we don't grow an ontology. |
| **0012 — the ontology is a contract** | THE evidence for our no-thresholds instinct: three rounds of prompt rewording moved violations 57% → 35% (all type errors) while true reversals stayed flat ~17–18%, within noise. A deterministic write-time signature guard (swap subject/object when the declared domain/range says so; drop the predicate when neither fits, keeping subject, object, time, evidence and the model's wording) took it to 57% → 4%, reversals 39 → 0. Split: WHICH types may participate is guidance; the DIRECTION of a relation is enforced ("not a claim about the world, it is the encoding convention of the key"). | The indeterministic layer generates candidates; the deterministic layer decides. Direct support for 10.2.3 and for our "LLM proposes, system reconciles" decision. |

| **0009 / 0010 — honest silence** | A built-in `related_to` fallback relation was meant as "honest vagueness" but became a lie: 5,934 of 14,706 facts on one corpus displayed as "related" while the real wording (`placed_pressure_on`, `countersued`) sat in the database. Fix: nullable type/predicate; the reader sees the source's actual wording, gray, marked "not in the ontology". Their revision note: staying at "I don't know" is more honest than guessing — but implementing that honesty as a word in the ontology turned it into an assertion. The honest expression is empty. | Confirms our "ambiguous matches never silently supersede / stay unresolved". For us: an unresolved situation reference renders as "we don't know what this connects to", never a fake "related situation" link. |
| **0011 — a mapping is configuration, not a fact** | Control flow must not be written as vocabulary (third time they learned this in a different place). And a binary state (proposed/confirmed) must not be encoded as a confidence float — it lands in the wrong queue and asks the wrong question. | Guards our "LLM-generated metadata is a proposal" decision: never encode candidate-vs-active as a score. |
| **Entity resolution** (`resolution.rs`) | 宁分勿合 — prefer apart over wrongly together. Deterministic recall by name keys only; type compatibility as a three-way deterministic classification (same → candidates, confusable → review, disjoint → never merge); cosine tiers 0.55 attach / 0.35 silent-new / **in between → review queue**; batched LLM adjudication with verdict cache; every merge logged with full rollback data. | The PRINCIPLE matches ours ("wrong merge poisons gather and decide; wrong link only adds context an employee can ignore"). The MECHANISM does not — it exists because documents accumulate ambiguous mentions with nobody present; our events arrive with someone addressable, so we use tiered signals at event time (hard → act, soft → ask, unsure → separate-and-wait). |
| **0017 — a contradiction points upstream** | When a derivation contradicts an assertion, the interface does not ask "which is right" abstractly — it lays out the four places the error can be (stale knowledge, misread extraction, wrong merge, over-strict ontology) and every button is a REPAIR. | A better shape for our reflective-error memory than free-text failure notes. |
| **extraction_drops** | Blocked facts left no trace; users just saw the graph missing things. Fix: every drop lands with a machine-readable reason code and an example. | Confirms our observability discipline: silence is treated as a bug. |

### 10.3.2 Where Utopia does not meet us

- **No situations, no behavior.** Its unit is a fact about the world. No actor with a pending ask, no waiting, no next-behaviour, no honest ending. Its own roadmap item "agent memory over MCP: episode writes, the retrieve endpoint" is UNBUILT — the part we need most is the part it hasn't done.
- **Documents in, not conversations.** Its ingest is bulk extraction, which is exactly why it could justify "nobody confirms ten thousand facts one by one." Our writes come from a live loop with a validation contract (SKILL.state shape). We need the 0015 gate semantics per situation, which they only have for interactive `remember`.
- **Confidence floats everywhere** (0.75 gates, 0.55/0.35 tiers) — ruled out for us by 10.2.3, and their own decision 0011 shows they agree in principle.
- **No normative layer.** Nothing in Utopia can ever be "not allowed to be learned," because everything derives from documents a person chose to put there. Our descriptive/normative split (learned memory advisory, policy untouchable) has no equivalent and must be added by us.
- **Graph structure** — ontology, graph queries, SPO triples. We decided graph data, not graph structure.

**Disposition: relevant but incompatible as a system; useful inspiration at the technique level.** Swaraj's own verdict: "we just want to know what utopia did and maybe take inspiration, we do not want to use utopia if it does not meet us."

## 10.4 What the knowledge base already decided — the answer my false fork was missing

The second, thorough read of the category files (plus Understanding the Situation and Journey and Lifecycle) settled everything my "situation substrate" fork was groping at:

- **One situation = one operational problem** with one resolution path. A decision workspace, not a chat thread, not an order, not a customer record. Tend is not a CRM.
- **The model is not fixed.** Attach, create, split, merge, link, unlink, re-route are first-class operations, and correction is normal operation, not error recovery. Split early when one message holds two asks; merge when two models were wrongly one problem; re-route when gathering proves routing wrong.
- **Links are discovered later.** A link is its own Tend artifact recording situation A, situation B, WHY (same order, same incident, employee created, gather discovered), link type, created-at. Created whenever a signal appears — at message arrival, when gathering reveals the "new" conversation is the same stuck dispatch, or when fifty customers report the same warehouse flood (each gets their own situation, grouped under one incident link). Links connect by OPERATIONAL CONTEXT, never by identity ("do not link everything about a customer because it is the same person" is written down, with CRM thinking named as the thing it avoids). Links are pointers for coordination; they never copy one model into another. Unsure between related and unrelated → no link until a signal appears.
- **The person-level journey is derived, not stored.** The person is an identity anchor beside the situation graph; prospect/customer/returning and stakeholder obligations are computed on demand as projections over their situations. No second truth that can drift. Every new contact starts unknown; identity is deduced or asked.
- **The priority rule:** unsure between same and related → prefer separate situations with a link over one merged model. "Wrong merge poisons gather and decide. Wrong link only adds context an employee can ignore."

**The new-employee scenario, answered by the model we already have:** "tell me all incidents where logistics were delayed" creates a new situation. The retrieval need is scoped (this business, logistics-delay problem type, situation memory). Past situations are found through structured references — problem type, business object, the links recorded when each delay was worked — which is a filtered query over graph-shaped data, not a traversal. The old situation models stand as references to the new one. No ontology was needed, because "logistics delay" is a product-level problem type plus business-scoped learned vocabulary, not something that must be discovered from a corpus.

## 10.5 The memory capability — the full picture as ruled

Tend approaches memory as a **software engineering problem**: memory's responsibilities form one unique, independent capability, so memory is its own component with its own loop, interacting with the other components (conversation manager, situation workers, decision making, communication) to produce one core agent capability. Fixed interactions are code; dynamic interactions are figured out by the LLM.

**Inputs (push).** Other components hand memory completed experience: what was attempted, what information was used, what failed, what correction landed, what outcome followed. Writing an experience is not learning — trace recording and learning stay separate responsibilities, which is exactly what makes memory an independent component rather than a side effect of the loop.

**The learning pipeline (background, asynchronous).** Experience → candidate lesson. The LLM PROPOSES the lesson, its type, its scope, and any relation to existing memory. The system then reconciles deterministically: structured claim-family identity (business scope, subject, relation type, process, conditions) and one of the typed update operations — add, merge, refine, supersede, narrow, append-exception, keep-conflict, reject, mark-stale, no-op. Uncertain identity → the item stays separate or unresolved; never silently overwritten. Automatic by default; the business can switch learning off or demand manual validation — but system integrity checks (scope, identity shape, provenance, policy conflict, privacy, supersession rules) run either way.

**The retrieval loop (bounded — the loop inside the component).** A situation worker hands over a CONTEXT NEED, not a query string: current phase, objective, missing information, entities involved, authority requirements, risk, deadlines. The loop runs multi-stage: hard filters first (business, role, process, validity, permission, status, version — all structured, all deterministic), then candidate generation (exact references, structured fields, lexical, and semantic similarity as ONE signal among several), then conflict and currentness resolution, then a context projection. It iterates — deciding HOW to search and whether the evidence is good enough (the J&F retrieve loop). "Good enough" is answered structurally: did we find active, in-scope, non-superseded items matching the typed need — not "did the score exceed 0.55".

**Outputs (serve).** Phase-specific context projections: the same prior tool-failure appears as "check the warehouse identifier first" during gathering and as "the dispatch cannot proceed because the identifier is missing" during explanation. Memory is advisory everywhere; it can never override policy, authority, a current source of truth, or a deterministic control.

**Maintenance.** Supersession, staleness, conflicts, retirement (not deletion), reversibility, and evaluation by replay: did this lesson improve the next behaviour without blocking valid work? Learning must be reversible — stop retrieving, mark stale, restore — with the situations it influenced identifiable.

**The interactions with the other components** (the core agent capability): the conversation manager's understanding agent reads memory for local vocabulary, aliases and prior interpretations when writing the first situation model; situation workers request phase-specific context; decision making consults procedures and failure warnings; communication uses terminology and channel conventions per audience; the background learner writes into memory from traces. Each interaction is either a fixed code path or a dynamic one the LLM orchestrates — decided per interaction, not globally.

**How the no-thresholds ruling lands here:** similarity may generate candidates, but nothing model-scored decides attachment, supersession, ranking-of-truth, or activation. States and structured matches decide. Event counts are the only admissible numbers.

## 10.6 Supermemory — what survives after this session

Part 1 §5 stands (engine closed source; three deliberate strictness gaps: engine-decides identity/supersession, one graph of truth, forgetting deletes). What we still take, re-expressed under this session's rulings: the two-layer pattern (keep the raw record and the extracted meaning separately — our conversation-history vs learned-knowledge split), asynchronous batched learning, hard-wall isolation (container tag = our business scope), and the profile idea — resolve WHO cheaply before searching WHAT — implemented as a scoped structured query, not an embedding lookup. Its cosine/confidence machinery is now additionally ruled out by 10.2.3.

## 10.7 The defense — "my product demanded X, they were designed for Y, I wanted Z"

**The template (say this first):**

> A memory system's control decisions are the product's decisions. Whoever decides what counts as the same fact, when a fact is outdated, what is relevant right now, and what memory is allowed to influence — that party owns the product's judgment. In supermemory and Utopia those decisions belong to the engine, tuned by embedding similarities or batch heuristics for THEIR workload. In Tend every one of those decisions is a recorded Level 2 decision — identity by structured claim families, supersession only through typed operations, ambiguous matches stay unresolved, learned memory advisory, scope-first retrieval. Adopting their engine would hand my product's hardest, most differentiating judgments to a black box optimized for someone else's assumptions, and make them unexplainable to the business that has to stay in control. So I took the techniques that survive my decisions and built the capability to my spec.

**Instance — supermemory (and Mem0/Letta class).** Y: a hosted recall engine for chat products; unit is a conversation; job is remembering user facts and preferences; the engine decides merging and supersession; relevance is embedding similarity; forgetting is deletion. X: Tend's unit is a situation — long-lived, multi-actor, interrupted and resumed, with authority and policy attached; memory serves phase-specific decisions, carries business scope isolation, keeps descriptive learning strictly below normative rules, and stays auditable because a business answers for what Tend did. Where "generally covers it" breaks: their engine deciding "this fact updates that one" IS my supersession decision, and my decisions say the LLM may only propose that relation; silent merging is the memory-poisoning path. Their one graph of truth has no boundary between what was learned and what the business is allowed to require — in my product that boundary is the difference between a coordinator and a liability. Z: memory as an independent component; typed, versioned, scope-first, scoreless control path; retirement not deletion; learning as a separate asynchronous pipeline.

**Instance — Utopia.** Y: general enterprise knowledge engineering over document corpora — static, complete, batch-ingested; ontology at the center; graph queries; background similarity adjudication; thresholds everywhere in the control path. X: conversations — dynamic, incomplete, free-flowing, arriving one event at a time across channels, with a person present who can be asked; situation models are not fixed (attach/create/split/merge/link/unlink/re-route); links discovered later on signals; relationships product-specific and known in advance. Where "generally covers it" breaks: their machinery exists because documents arrive with nobody present; my events arrive with someone addressable, so my answer is tiered signals at event time. Their SPO ledger and ontology would force my situation stories into triples and my known relationships into a queryable graph structure — I decided graph data, not graph structure. Z: the same component model, scoreless control, situations as their own layer above memory.

**Counter-arguments and answers:**
- "You're rebuilding worse versions of existing systems." — No: building LESS than them, deliberately. No universal fact extraction, no ontology import, no embedding-everything, no similarity adjudication queues. What I build instead is the control path they don't expose: identity, supersession, scope, authority, reversibility. That is the part my product sells.
- "Similarity search is proven, why reject it?" — I don't. It stays as one candidate-generation signal inside retrieval. What I reject is any model-generated number making a CONTROL decision. Candidates are cheap to get wrong; control decisions are not.
- "You lose their benchmark numbers." — Those benchmarks (LongMemEval, LoCoMo) measure recall of user facts from chat transcripts. My memory's job is scoped operational guidance with authority boundaries — measured instead by repeated-mistake rate, stale-memory use, policy conflicts, replay regressions. The benchmarks don't test the thing I'm building.
- "Isn't this NIH?" — The test is falsifiable: name one control decision in my memory design and ask who makes it. In theirs: the engine, invisibly. In mine: a recorded, reviewable decision, executed deterministically. That's not preference; that's where the accountability lives.

**The honest cost, stated before someone else states it:** building the capability ourselves means we own its correctness. The 15 Memory & Knowledge decisions are what make that ownership tractable — they shrink the build to exactly the strictness our product needs and nothing more.

## 10.8 What remains open after this part

1. **The situation-worker loop** — the next loop draft (advances the situation: gather/wait/ask/escalate/honest-endings; owns Decision Making-selected behaviour). Memory's retrieval loop is one of its called capabilities.
2. **Level 3 parked items** (Swaraj's ruling): exact context-projection format per phase; exact claim-family identity rules; the concrete acknowledgment policy; storage/indexing; any event-count thresholds if ever introduced (each would need a replay-backed justification).
3. **Evaluation measures for the memory capability itself** — repeated-mistake rate, stale-memory use, policy conflicts, replay regressions (from the category's evaluation decision) — to be turned into the golden-scenario and replay harness later.
4. **Untouched threads still open elsewhere:** Mem0/Letta breadth comparison (pending-research item 5), the situation-worker loop, GEPA verification.

# Part 11 — The Situation-Worker Loop, and Where Memory Attaches (drafted in conversation)

> This part continues from Part 10 in the same research chat. Swaraj's instruction: "let's research and find out the situation worker loop. as I discussed in this conversation, what is true for others will not work for us, and we have deduced our solution from first principles in the Level 2 folder. and I think we need the brainstorming, Level 2 research, not Level 3 research here." Everything below is Level 2 concept; technology choices stay open.

## 11.1 What was read to ground the draft

The situation-worker loop was drafted only after loading the categories that define what "advancing a situation" means:

- **Gathering Information** (all 8 questions + the Understanding↔Gathering relationship document) — required information is decision-relative (missing, unverified, stale or conflicting AND able to change the next safe step); leave uncollected what cannot change the decision; gathering records structured claims with provenance, never unquestionable truth; gathering is not Decision Making ("Gathering makes the information state visible; Decision Making determines whether it is sufficient").
- **Decision Making** (all questions + working decisions) — Decision Making selects Tend's next behaviour (gather, wait, monitor, ask, communicate, create human work, escalate, invoke a capability, resolve, stop safely); decision INTENTION ≠ operational STATE; the LLM proposes behaviour and explains reasoning, deterministic system behaviour validates and manages state; Tend continues autonomously within the granted range; LLM self-assessed confidence is not a safety authorization; no safe fallback → human work, escalate, or stop safely.
- **Coordination** — the four states (Running / Waiting / Blocked / Completed); one situation = one operational problem, one story, one card; context edges and journey edges; the wait spine; once resolved and closed, never reopened; recovery of interrupted work; dedup.
- **Time** — time events wake situations and re-enter the SAME decision loop; the situation-level check-in as the backstop against forgotten work; response promise vs resolution promise; the customer-facing clock pauses, the internal clock never does.
- **Failure** — failure is an EVENT, never a card state; every wait carries a bound; when the bound passes, the system records a declared outcome (success / terminal failure / transient failure / unknown-outcome) into the audit; the unknown-outcome-on-a-side-effect protocol (watch to settle window, never guess, never re-issue); circuit breaker; the safety floor.
- **Trust and Evidence** — evaluation is deterministic (source authority, domain rules, business configuration); claims are not accepted facts; observation / source claim / interpretation / evaluated evidence state / decision remain separate objects; conflicts preserved, never silently resolved; no numeric confidence.
- **The wait spine** (`how_do_we_represent_work_that_is_waiting.md`) — subject, reason, timing class, resume trigger, release policy, escalation path, visibility; three levels of waiting (tool / situation / time); wait bookkeeping lives in the durable system layer, outside the model's context.

## 11.2 Swaraj's rulings in this session [HIGH ATTENTION]

### 11.2.1 The memory subcomponent observes the loop and engineers the context — verified against TeleChat

Swaraj's raw statement: "the memory subcomponent needs to fit in somewhere where it observes the loop and its working and then keeps on updating the situation model linking — update the context of the loop with the new discovered situation models links; it sees the working of the loop and then updates the memory of working and other files and then loads them appropriately at each stage of the loop (for context creation, each step of the loop will take its own subset of context)." He then asked me to verify the claim against the Kirana TeleChat code before accepting it.

**Verified in code** (full evidence in §11.5). Every LLM step in the Global Orchestrator has its own minimal system prompt plus its own context-slice method on RunContext; the slices are genuinely different subsets (the decision slice contains NO conversation history at all — it judges purely on execution evidence); each business capability carries its own planner prompt and draws context from agent-state slices, never from the conversation; and the loop's working is observed and re-fed selectively (`verifiedFactRegistry`, `replanHistory`, `priorDecisions`, tool execution evidence, open-drafts summary injected into planning).

**Standing rule:** memory is not a store consulted once at the start of a wake. It is attached ALONGSIDE the loop with two roles: **observer** (consumes the loop's working as it happens; updates situation-model links when the loop discovers connections; maintains working memory) and **loader** (produces each stage's context slice — the propose stage, each behaviour execution, the validate support — each taking its own subset, engineered per step). TeleChat's RunContext + verified-facts registry is the small-scale proof of the pattern.

### 11.2.2 The conversation manager gets the same loader pattern — scale forces it

Swaraj's raw statement: "a similar thing should also be in conversation manager, especially for the situation model and loading relevant ones; only then can we get the relevant situation model to route or create, as we will have millions of situation models as the business conversation grows and scales."

**Standing rules:**
- The router never scans the population of situation models. The memory loader assembles a ROUTING SLICE: this actor's open situations (scoped by actor + status), explicit references (structured claim matches), situations linked to those, and local vocabulary. The LLM classifies only among the slice's candidates.
- The candidate set is defined by structured scope — actor, status, explicit references, links — never by similarity search across the population. Empty or ambiguous slice → the tiered-signal answer (ask), not a bigger search.
- The knowledge base already assumed this: "Router uses summaries of open situations" (Understanding the Situation) — at scale that sentence hides this loader.
- Cross-situation questions ("show all logistics delays") are not routing; they are worker-side retrieval needs scoped by problem type, also served by the loader.

### 11.2.3 The write side is a separate process; two classes of writes; the trace is the interface

Swaraj's raw statement: "memory write part should be in a different process/thread so the main loop is fast and quick and the read is still updated and the latest; and the loop decides to loop (code first, LLM second)."

**Standing rules:**
- **The trace stream is the interface.** The memory writer is not called by the loop. It runs as a separate process consuming the append-only trace (which the loop writes anyway for explainability). From the trace it derives experience records, candidate lessons, proposed situation-model links, and the derived views the loaders serve (open-situation summaries, vocabulary, link indexes). This unifies three recorded decisions: trace recording and learning are separate responsibilities; learning is asynchronous and batched; the observer emits onto the same event fabric.
- **Two classes of writes, only one goes async:**
  - STATE writes (situation model version updates, link artifacts, wait records, declared outcomes) stay SYNCHRONOUS in the loop — they ARE the coordination record; routing, workers and owner artifacts read them, and a decision against a stale model is a wrong decision. They are cheap; they do not slow the loop.
  - LEARNING writes (experience → lesson → reconciliation → activation; consolidation; index maintenance) go ASYNC, entirely off the critical path.
- **Ordering rule:** a newly discovered link is written synchronously at discovery (it is state); the lesson extracted from that discovery is async. Discovery and learning are different events.
- Reads are always current where it matters because the loader serves from the same durable store the loop wrote synchronously. Only advisory learning can lag — and a lesson arriving late costs nothing because it can never be the thing that decides.

### 11.2.4 The loop decides to loop — code first, LLM second

The decision to take another round is CODE, made from structured evidence state (did the behaviour produce its expected effect; are required claims still missing; was a declared outcome recorded). The LLM never decides to continue; it proposes what the next round's behaviour is, inside a code-owned bound, with the code-owned fail-closed rest (refresh a wait, or surface) when the bound hits. Same discipline as every gate in this study: the LLM proposes the artefact; code owns the control flow.

### 11.2.5 The loader's contract is Level 3

The exact request/response shape of the memory loader (request: component, stage, situation/actor, entities involved → slice) is a **Level 3 problem**. Swaraj: "right now we are more focused on the engineering solution and not the technicalities yet." Parked with the other Level 3 items.

## 11.3 The situation worker — boundary and the per-wake contract (first draft, for attack)

**One sentence:** the situation worker is the component that advances one situation from wake to its next honest resting point.

**It owns:** running the decision loop for its situation; executing the selected behaviour through capabilities; updating the situation model forward; creating wait records; handling failure moves; reaching honest endings.

**It does NOT own:** routing inbound messages (conversation manager); deciding what the business should want (business/policy); deciding permissions (authority/control layer); expressing communication (the communication layer — it TRIGGERS it); remembering (memory capability); the waits of other situations.

**Standing rules inherited from the categories:**
- A wake always ends in one of the four states (Running / Waiting / Blocked / Completed). An interrupted run is recovered per the Coordination recovery decision; the situation stays alive because its check-in exists.
- "Wait" is proposed by the LLM; the WAITING state and the wait record are created by code.
- Failure is an event, never a card state; declared outcomes go into the audit.
- Persist intent before side effect (Hermes); bounded artefact per step, validated in code (SKILL.state); reasoning trace-only.

**The per-wake contract:**

```text
WAKE (event: message routed / tool result / answer / watcher fired /
      date arrived / check-in / human work done / external agent result)
   ↓
RECOVER (code: interrupted run? recover or discard per the interruption
         rules; single-flight — one worker per situation)
   ↓
PROPOSE (LLM: next-behaviour proposal — one of the decision intentions,
         structured reasoning, trace-only, no confidence numbers;
         context = the stage slice from the memory loader)
   ↓
VALIDATE (code: is this behaviour permitted here? authority, policy,
          required evidence present, reversibility, ask-coverage.
          Invalid → bounded repair with diagnostics → re-propose)
   ↓
EXECUTE (per behaviour type — each a fixed code path:
   gather      → one bounded, priority-ordered pass over the required-
                 information set (source selection + read capabilities +
                 evidence eval); sufficiency is NEVER evaluated inside
                 the pass; returns to PROPOSE — no internal loop
                 (Fork A ruling, §11.6)
   ask         → append the clarification request to the situation model;
                 the update event triggers the communication manager,
                 which delivers it (Fork B ruling, §11.6)
   invoke      → persist intent BEFORE side effect → execute → verify;
                 if the tool requires confirmation (a yes/no approval,
                 Cursor-style), the TOOL — the deterministic side, not
                 the agent loop — runs the pre-configured confirmation
                 flow through the communication layer and proceeds only
                 once approved (Fork B ruling, §11.6)
   communicate → append the communication intent to the situation model;
                 the update event triggers the communication manager —
                 it shapes, gates and sends; the worker never does
                 (Fork B ruling, §11.6)
   human work / escalate → work item with one responsible owner
   wait        → LLM proposes the wait; CODE creates the wait record
                (subject, reason, timing class, resume trigger, release
                 policy, escalation path, visibility) → rest
   resolve     → declared outcome + final communication
   stop safe   → blocked/safe-hold with visible reason and deadline)
   ↓
UPDATE (situation model moves forward — new version, corrections forward,
        unknowns/conflicts stay visible; state write is synchronous)
   ↓
REST or NEXT ROUND (code decides, from structured evidence state, whether
        this wake produced enough to rest safely; bounded rounds per wake
        as a code limit with the fail-closed rest; "progress" = the
        evidence-state predicate in §11.6 Fork C — never LLM self-assessment)
```

**The honesty guarantee:** every rest is a named wait with a resume trigger, a declared outcome, or a blocked/safe-hold with a visible reason. Nothing silent.

**Scenarios walked (all grounded in the category decisions):**
- *Delivery delay:* gather → carrier says delivered, customer says not received → evidence eval keeps BOTH claims (conflict preserved, not resolved by wording) → communicate interim (response promise) + wait record with internal escalation clock → rest; wakes on carrier state change or check-in.
- *Partner agent, five-minute cutoff:* wait outlives the interaction → release policy fires (code) → interim message → wait record, open timing class, situation-level check-in → rest. Resume is "enough, not all" — the authoritative answer alone can end the wait.
- *Refund posted, gateway silent:* unknown-outcome declared → watch to settle window → on settle or bound: escalate to a person with the full evidence chain. Never guessed, never re-issued.
- *Check-in backstop:* every wait's escalation path ends in something that surfaces; a perfectly quiet situation still wakes at its check-in and either refreshes its wait honestly or moves. Forgotten work cannot exist.

## 11.4 The TeleChat verification — context engineered per step and per capability

Swaraj's claim ("each part of the loop takes its own subset of context — see the context being assembled in each part of the loop in Kirana TeleChat, go and business capability") was verified in the code before being accepted. The evidence:

| Step | System prompt | Context slice (`run-context.ts`) | Gets / deliberately excluded |
|---|---|---|---|
| Plan | `planning-mode.ts` — "You do NOT call tools... ONLY output the plan JSON" | `planningContextSlice()`: store init, owner profile, latest message, conversation history, mode-specific evidence (replan history with plans+results+decisions, verified facts, collaboration feedback, harness-retry diagnostics) + open-drafts summary injected separately | The ONLY step that sees conversation history |
| Decide | `decision-mode.ts` — "reason only from provided execution evidence" | `decisionContextSlice()`: capability registry summary, business intent, current plan, sanitized per-objective results, verified facts, prior decisions | **No conversation history at all** — judges purely on execution evidence |
| Ask user | — | `askUserContextSlice()`: clarification needs extracted from results, intent, verified facts, user message | Only the clarifications, not the whole phase |
| Respond | `response-generation.ts` / grounded-response | `respondContextSlice()`: decision, intent, execution summary, verified facts, denied outcomes, user message, owner instructions | Owner instructions appear here and nowhere else |

**Capability layer repeats the discipline:** billing, inventory, khata and user-profile each carry their own `TOOL_SYSTEM_PROMPT` (billing's: "You are the Planning component of the Billing capability... Never plan inventory or khata tools") and draw context from `buildBcPlanningPriorSlices()` — prior tool plans and prior results from agent state, plus `PriorBcQueryState` (prior read results from earlier capability invocations in the same run). A capability never sees the conversation.

**The observant pieces present in embryo:** `verifiedFactRegistry` (a cross-step store the loop writes as it works and each slice selectively reads via `factsForDecision`); `replanHistory`, `priorDecisions`, `BcToolExecutionRecord` (the loop observing its own working); `formatOpenDraftsSummaryForContext()` (live business state pulled into context at the moment the step needs it); `sanitizePhaseResultForContext()` (the striping rule: artifact metadata, never file bytes).

**Reading of the evidence:** TeleChat is the small-scale proof of the observer/loader pattern. Its observer and registry were in-process only because it was one Durable Object; at Tend's scale the observer becomes the trace-fed writer process (§11.2.3) and the registry becomes the durable store the loaders serve from.

## 11.5 The two-loop picture with memory attached

```text
                    TRACE STREAM (append-only, written by both loops)
                          ↓ (async consumer — separate process)
                    MEMORY WRITER → experience records, candidate lessons,
                                    proposed situation-model links,
                                    derived views (open-situation summaries,
                                    vocabulary, link indexes)

CONVERSATION MANAGER                           SITUATION WORKER
  WHO (code)                                     WAKE / RECOVER (code, single-flight)
  ROUTING SLICE ←─ memory loader (sync)          stage slices ←─ memory loader (sync)
  MEANING (LLM over the slice's candidates)      PROPOSE (LLM) → VALIDATE (code)
  VALIDATE (code: 0/1/many)                      EXECUTE per behaviour (code paths)
  acknowledge / route / create                   UPDATE state (sync) → TRACE
      ↓ routes the event                             ↓ rest: named wait / outcome / blocked
      └─────────────── wakes the worker ─────────────┘
```

Both loops: synchronous state writes, synchronous structured loaders, zero model-generated numbers in control, one async trace-fed writer feeding the read side. The loop decides to loop (code first); the LLM proposes inside the rounds.

## 11.6 The three forks — RULED by Swaraj (2026-09-04)

The three forks raised during the draft were settled together in one ruling session. A Level 2 trade-off analysis was presented first: Level 1 constraints extracted from Product Vision and the Level 1 framing, full mines of the relevent categories, and external evidence fetched via TinyFish (Anthropic's long-running-agent harness, the "When Agents Do Not Stop" loop paper, Sierra's architecture, and the loop-engineering "convergence is not correctness" critique). Swaraj ruled each fork. The rulings:

**Fork A — where gathering's iteration lives: RULED as the lean, hardened with a bounded pass.**

Swaraj: *"for fork A i agree with your recommended a3 rule. nice work."* The rule in force:

> Gather is a behaviour. Each execution of gather is one bounded, priority-ordered pass over the required-information set, executed by deterministic code. The pass classifies the needed claims, queries sources in priority order (one pass may touch several sources — that is deterministic source pursuit, not a loop), records structured claims, versions the situation model, exposes the remaining gaps, and returns to PROPOSE. "Sufficient" is never evaluated inside the pass.

Why the alternative lost: a gather sub-loop iterating "until sufficient" would make a sufficiency judgement inside gathering — the exact responsibility three category documents reserve for Decision Making ("Gathering is not Decision Making. Gathering makes the current information state visible. Decision Making determines whether it is sufficient for a particular action"). Rejected as a category-boundary violation, not a style preference.

**Fork B — does the worker communicate directly: RULED as always through the communication layer, with the mechanism sharpened.**

Swaraj agreed with the "always through the layer" rule and refined it. His words (lightly cleaned): *"the worker updates the situation model, that update event triggers the communication manager (multi-thread) to reply back to the user. worker only updates the situation model. think of it as a kanban issue/ticket: the worker human updates the ticket with its work (done / waiting / etc); the communication manager reads this when he gets a notification that the issue you were watching has changed, reads it, and then communicates the update to the human / etc."*

So the worker never hands the layer a message. It **writes state** — the situation model moves forward — and the communication manager, watching for the change, reads the new state and expresses it. Expression lives on the read side of a state change, never on the write side.

Two consequences Swaraj named in the same ruling:
1. **The inbound-acknowledgment rule has no private path.** The conversation manager's standing acknowledgment (Part 6) is requested through the same communication layer — one expression path for both loops.
2. **Tool confirmations bypass the loop entirely.** For a tool that needs specific confirmation (a yes/no approval button, Cursor-style): *"the tool not the agent loop, the tool uses the communication layer (the deterministic side, not the loop/agent side) to get the confirmation flow to the appropriate party, codefully configured beforehand, and then have it done."* The approval flow is pre-configured and deterministic; the loop only learns the authorised outcome. This matches the Authority & Ownership decision that the approval path is part of the tool, not the LLM.

The analysis that preceded the ruling: the Communication category already abolished the inbound/outbound boundary ("The boundary is not inbound versus outbound"), already said "Decision Making selects, Communication expresses", and the Channels & Permissions category already named the communication-manager adapter layer. Fork B confirmed that direction and gave the Level 2 expression rules (purposes, wait-when, ask-vs-act, depth per viewer) a single home.

**Fork C — what counts as "progress" for the bounded-rounds limit: RULED as the structured evidence-state predicate.**

Swaraj: *"for fork c i agree with the rule c1 which you made precise for our solution."* The rule in force:

> A round counts as progress if, and only if, the wake's situation-model version advanced on at least one of:
> (a) a claim subject's evidence state transitioned (e.g. unknown→known, known→conflicting) with a reason;
> (b) a required claim became available from a source not previously queried for it in this wake;
> (c) a wait or watch record was created, refreshed honestly, or resolved;
> (d) a declared outcome was recorded;
> (e) a permission/authority state changed.
> It is NOT progress to: repeat an identical tool call producing the same value for the same claim subject; restate a claim with no state change; or report the model's own claim of progress. When the bound is reached without recent progress, the wake ends in its honest rest (ask / wait with visible reason / escalate / stop safely) — never silence, never an assumption.

This is grounded in the Trust & Evidence category (evidence states with reasons, never scores), the Failure category (bound-crossing, declared outcomes to the audit, the "same action" identity), and the standing no-model-generated-numbers rule. LLM self-assessment is enumerated out of the predicate, matching the external evidence (Anthropic's structured `passes` fields as the only progress signal; the loop-paper finding that model-controlled continuation is the fragile part; the "convergence is not correctness" warning against LLM-judge progress checks).

**The combined picture after the three rulings:** the conversation manager and the situation worker both write state through their loops; memory observes both (async, trace-fed) and loads stage slices (sync); the communication manager watches situation-model updates and expresses; the deterministic tool layer owns retries and confirmation flows. The loader's request/response contract stays parked at Level 3 per 11.2.5.


# Part 12 — The Completed Study (web verification, products, scenarios, optimizer wiring, fine-tuning, signals, evaluation, lineage)

> Part 12 closes the engineering study scope from the handoff: items 2 to 11. The three product forks (item 1) were ruled in §11.6. Everything below was produced in one completion stint — web verification via TinyFish (items 2, 3), the internet-products column (item 4), the conversation-manager questions (item 5), the golden scenarios + memory evaluation (item 6), the prompt-optimization wiring (item 7), the fine-tuning and data-signal deep dives (items 8, 9), the evaluation & attribution ladder (item 10), and the historical lineage map (item 11). This part is the record of that work.

## 12.1 GEPA verified against the paper (item 2)

The Part 9 headline numbers were verified by reading the paper itself (arXiv 2507.19457, fetched via TinyWeb and read as text). All three survive, with two precision corrections and added provenance.

1. **"35× fewer rollouts"** — confirmed, with the qualifier "up to". The abstract: *"GEPA outperforms GRPO by 10% on average and by up to 20%, while using up to 35× fewer rollouts."* The results section sharpens it: *"on Qwen3-8B, GEPA outperforms GRPO (24,000 rollouts with LoRA) by up to 19% while requiring up to 35× fewer rollouts."* The comparison is against GRPO-with-LoRA at 24,000 rollouts, on the open model.
2. **"+14% over MIPROv2"** — survives in substance, but the wording in Part 9 was too compressed and is corrected. The paper does NOT say "beats MIPROv2 by 14 points". It says: *"GEPA surpasses the previous SOTA prompt optimizer, MIPROv2, on every benchmark and model, obtaining aggregate optimization gains of +14%, more than doubling the gains achieved by MIPROv2 (+7%)."* The abstract frames it as "outperforms MIPROv2 by over 10% across two LLMs." Correct phrasing: **GEPA's aggregate optimization gain is +14%, vs MIPROv2's +7% — it roughly doubles MIPROv2's gain.**
3. **"9.2× shorter prompts"** — confirmed, with "up to": *"prompts produced by GEPA and GEPA+Merge are up to 9.2× shorter than those from MIPROv2."* The aggregate picture in their Figure 15 is "GEPA's prompts are around less than 33% of the size of MIPROv2's prompts, while getting higher performance."

Two additional facts recorded for provenance (both primary-sourced):

- **Tasks and models.** Evaluation ran on HotpotQA (multi-hop reasoning), IFBench (instruction following), PUPA (privacy-aware delegation), and HoVer (retrieval-augmented verification), on Qwen3-8B and GPT-4.1-mini.
- **"As few as 3 examples"** (Part 8's claim) — confirmed by the GEPA project's own FAQ: *"GEPA can show improvements with as few as 3 examples; +9% on held-out data with 3 examples in one iteration."*

**What this changes in Part 9:** nothing structural — the parts of Part 9 that came from the DSPy/GEPA code and ecosystem survive the paper read. The mapping to Tend (bounded-artifact predictors, the deterministic-validator (score, feedback) contract, Pareto selection) stays. Only the numbers' wording is corrected here, and task/model provenance is added.

## 12.2 AutoSaddler status (item 3)

AutoSaddler is **released and usable — not paper-only.** Microsoft shipped it as an MIT-licensed GitHub repo (`microsoft/AutoSaddler`) alongside arXiv 2608.23041 on 2026-08-24, with a project site and short video. It installs with `uv` (Python 3.12–3.14) and its **V2 engine is a durable, resumable, plugin-based optimization system**: an authoritative append-only `events.jsonl`, manifest + snapshot, content-addressed candidates, an evolution DAG, metrics, and `--fork-from-run-id` to branch a validated checkpoint into a new run (only the iteration budget may differ when forking). Harnesses/benchmarks attach through a scenario-plugin entry point, with a reference Git-harness integration (Meta-ARE on GAIA2 `autosaddler.scenarios` plugin) and a deterministic fake for smoke tests. Published preliminary Pass@1 results: QGAIA2 53.0→62.0 (+9.0pp), SWE-Bench Pro 37.3→46.9 (+9.6pp), Terminal-Bench 2.0 40.0→50.0 (+10.0pp).

**For Tend:** the harness-repair half of Part 8 — diagnose execution traces, apply structured patches to prompts/tools/middleware, select changes that generalize — is now a real, testable reference implementation, not a paper aspiration. Its diagnosis-is-deeper-than-reflection stance and its durable, candidate-versioned run model match our trace-format and git-lineage discipline. Adoption (which harness it would even optimize, our scenario-plugin integration, what it is allowed to touch) stays Level 3; Level 2 decisions outrank it.## 12.3 The internet products column (item 4)

Each entry: what it does → what aligns → what is invalid for us. Inspiration only; our Level 2 decisions outrank every product. The handoff judged each: Fin/Sierra/Decagon (intent→routing→handoff), Temporal/Inngest/Trigger.dev (durable wait/resume/wake), Mem0/Letta (memory breadth), Linear/GitHub (notification discipline).

### Commercial agent platforms — Fin, Sierra, Decagon

- **Fin (Intercom)** — autonomous customer-service agent that resolves questions end-to-end across chat/email/WhatsApp/SMS, routes by the business's criteria, and counts a "resolution" only when an outcome is reached (a procedure ending in a human handoff counts as resolution only if resolved end-to-end). **Aligns:** an outcome-defined resolution — not "the tool completed" — is exactly the discipline behind Part 12 §12.8 and our declared outcomes. **Invalid for us:** resolution lives inside one ticket/helpdesk conversation; no cross-conversation situation graph, no waits that outlive the interaction, no authority/ownership model. We take the outcome discipline; not the shape.
- **Sierra** — the "constellation of models" agent platform: 15+ frontier/open/proprietary models per task; modular task abstractions (retrieval, classification, tools, policies, tone) with "supervisors" enforcing guardrails, policies, and quality checks; orchestration and routing handled under the hood. **Aligns:** separating orchestration/routing from task abstraction matches Fork B's direction of travel; per-task model selection matches our componentized-cognition, frontier-first plan (Part 5). **Invalid for us:** the guardrails are *enforced by model supervisors* ("supervisors to enforce guardrails, policies, and quality checks") — a model supervising a model is exactly the "model output never authorized by the model" position we reject in the security spine. Our guardrails are deterministic code.
- **Decagon** — enterprise support platform with "built-in and customizable guardrails" and "automatic checks" for predictable, compliant production behavior. **Aligns:** guardrail-first stance; layered automatic checks are the same instinct as our validator stack. **Invalid for us:** the guardrails are platform-internal and opaque; ours are our own deterministic code with versioned, auditable reasons (Compliance batch). We cannot audit inside someone else's box.

### Durable execution — Temporal, Inngest, Trigger.dev

- **Temporal** — durable workflow execution: the workflow captures state at every step, resumes in a new process after crash, and timers reliably wake the workflow after a duration even across restarts. **Aligns strongly with our wait spine (Part 11):** a wait is a durable system-layer record with a resume trigger; "wake on timer even across restarts" is exactly our wait-record + escalation-clock mechanics. **Invalid:** Temporal's unit is a code-defined procedure; Tend's unit is a situation whose next step is model-proposed and code-validated each wake. The wait/resume *mechanism* transfers; the "who decides the next step" does not. Any specific engine is Level 3.
- **Inngest / Trigger.dev** — durable step functions / background jobs on the same resume-and-wake idea. **Aligns:** the resume/wake primitive, especially for the async trace-fed memory writer. **Invalid:** they provide "resume," not "decide"; our resume always re-enters PROPOSE with a fresh context slice. A step-function slot cannot model that.

### Memory breadth — Mem0, Letta

- **Mem0** — a memory layer that extracts candidate facts from message pairs and reconciles them against what it holds. **Aligned-with-caveat only:** the extract-and-reconcile shape is the generic version of our memory learning pipeline (Part 10.5), but not our candidate-lesson types, claim-family identity, typed update operations, authority scoping, or system-integrity checks that run whether learning is on or off. Judge against Part 10's rulings — never adopt wholesale, and especially never adopt its control decisions (per Part 10.7 X/Y/Z).
- **Letta (MemGPT)** — an agent runtime that treats LLM context as virtual memory, with tiered memory and agent-style inference. **Invalid as a model:** Letta is a full agent runtime that makes control decisions for the agent. That is precisely the "memory system makes the product's decisions" shape Part 10.7 rejects. We keep memory as one independent component with its own loop, advisory, never the controller.

### Notification discipline — Linear, GitHub

- **Linear / GitHub** — issue-tracker notification discipline: who gets told, what, when, in what shape; batched and deduplicated; status derived from PR activity; labels as state; routing by team. **Aligns with the Business View category:** the owner sees "3 replied, 1 wants a meeting" as one artifact, not 30 notifications. Which events require the owner's attention is a configured rule, not a model mood. **Invalid:** none — this is the cleanest align in the column. The discipline transfers as-is to who gets told what when, inside and across situations.## 12.4 The conversation-manager open questions, resolved (item 5)

Part 6 ended with three open items. All three resolve once the fork rulings are in place — per Swaraj they were "easy… you've just confused the wordings; they are not as big a question."

### Which steps produce training traces vs audit-only traces

The split was already ruled in the memory session: trace recording and learning stay separate responsibilities. Applied step by step:

- **Every** step records to the audit: identity, permissions, VALIDATE verdicts, wait records, communication sent, rounds used, declared outcomes. Audit is universal.
- A step **additionally** becomes a training trace when all three hold: (1) the LLM proposed something in that step (a bounded artifact existed); (2) the proposal was validated by code; (3) an externally-observable outcome followed that can be matched against the proposal — a declared outcome, a wait created, a claim later confirmed or contradicted.

Applied to the steps:

| Step | LLM proposed? | Externally matchable? | Training trace? |
|---|---|---|---|
| WHO (routing gate) | no — code | — | audit-only |
| MEANING (artifact) | yes | yes — routing decision, ask-list outcome | training |
| PROPOSE (behaviour) | yes | yes — did the validated behaviour succeed | training |
| gather source-selection | yes (Fork A: source choice) | yes — did that source yield a verified claim | training |
| VALIDATE (code) | no | — | audit-only |
| EXECUTE / tool call | no | — | audit-only |
| Communicate (layer) | no — expression (Fork B) | — | audit-only |
| REST / next-round (code) | no | — | audit-only |

A training trace alone is not yet learning data: it becomes fine-tuning or memory material only after the signal taxonomy (Part 12 §12.8) says what the segment proves.

### How the MEANING artifact relates to the Understanding category's situation model

The Part 6 wording ("writes the first version of the situation model") made it sound like MEANING maintained a *second* model to reconcile. It does not.

- There is **one** situation model. Understanding is the responsibility that owns it; MEANING is that responsibility acting at message-entry time.
- MEANING is the LLM's **proposal** for advancing the model: interpretation, referenced_thing, candidate_situations, purpose_template, ask_list, new_or_join. VALIDATE (code) resolves 0/1/many and decides patch / create / clarify / ack-and-stop. The validated result becomes the next version of the model. The artifact is never itself the model.
- Later versions are owned by Understanding-as-responsibility, authored through whichever loop touches it: the conversation manager patches on message entry; the situation worker advances operational facets (evidence, waits, outcomes) during a wake. One model, many writers, versioned forward — which is also exactly what Fork B says ("the worker only updates the situation model").
- The false fork "does Understanding own later versions or does every loop own its own?" is therefore dissolved: neither loop owns the model; Understanding owns it; every loop is an authorized writer through it.

### The acknowledgment policy (the third Part 6 open item)

Not a separate design question once Fork B is in place. The acknowledgment is a communication request to the layer, and its policy is the Communication category's ten purposes + seven deferral conditions (unsupported, duplicative, unnecessary, premature, misleading, outside the recipient's responsibility, outside the business's authority) applied to acknowledgments specifically. Business-configurable; enforced by code. The concrete rule set (when defer vs. silence vs. full reply) stays Level 3.## 12.5 Golden scenarios + memory evaluation measures (item 6)

Structure only — no tooling choices. This is the seed of the replay harness. Grounded in the Level 1 failure classes and the Agent Seer spec (`Things to look at/agent_seer_tool_specification_scenario_synthesis.md`), with expected-refusal cases and the memory evaluation measures folded in.

### Scenario families from the Level 1 failure classes

The Level 1 framing's failure world becomes nine scenario families. Each pins: what breaks, which situation shapes it appears in (delivery / prospect / refund / employee-work), the expected evidence-state path (known/unknown/conflicting/ambiguous/provisional/stale/blocked, each with a reason — Trust & Evidence grammar), and where the loop must rest honestly (wait / ask / escalate / blocked / safe-hold).

1. **Missing information** — a decision cannot be made because a required claim does not exist, is uncollected, or is held only by another actor. Notation: unknown → (gather, one bounded pass, Fork A) → still unknown → wait with a reason / ask → honest rest. Example: package question with no shipping source.
2. **Conflicting information** — two claims affect the same operational problem and are both preserved. Notation: known (both, as evaluated claims) → conflicting (with reason) → never resolved by wording → wait for an authoritative update or escalate. Example: carrier says delivered, customer says not received.
3. **Incorrect information** — a claim within authority but wrong/stale. Notation: known → currentness check → stale → re-gather or ask → correction forward (version, not rewrite). Example: tracking number wrong in an earlier message, corrected later.
4. **Unavailable actors** — the needed person/system/agent is absent. Notation: waiting (inside bound) → bound crossed → declared outcome (temporary failure / unknown-outcome) → wait, alternate source, or escalate. Example: the only source API is down; approval required but person is on leave.
5. **Authentication / authorization failures** — identity or permission fails. Notation: blocked state → refusal communicated + escalation path offered; never silent, never "pretend." Example: employee lacks scope; claim is confidential for this actor.
6. **Business-rule violations** — a proposed action breaks a configured rule. Notation: VALIDATE rejects with the rule's reason → bounded repair re-proposes OR request/reject → honest. Example: refund outside policy window; channel send outside permitted window.
7. **Communication failures** — send fails, lost, partial. Notation: tool-layer bounded retry → backoff/jitter; if unconfirmed and irreversible, no re-send, hand to escalation. Example: message to a customer never confirmed delivered.
8. **Business inaction** — the business itself does not act (no owner answer, no decision). Notation: wait ends without the needed response → escalation → check-in backstop. Example: asked for approval, nobody answers.
9. **Unexpected situations** — a shape the system has never seen. Notation: system "have-I-seen-this" fails (harness hull, Part 7) → could go into a wait/escalate or stop-safe; never guess forward. Example: a never-before-seen event type.

### Scenario instance template

Each scenario instance pins: the family; the initial situation snapshot (business, situation-type, current model version, actors present); the trigger event(s); the required decidable behaviour or refusal; the expected honest ending (declared outcome number from the four: success / terminal failure / transient failure / unknown-outcome); and which assertions must hold in the trace (evidence-state transitions, communication provenance, wait records, bounded-rounds progress predicate, communication layer's ask-vs-act and depth rules, refusal + escalation path, and the memory metrics below).

### Expected-refusal cases

A deliberate subset of the golden scenarios asserts that Tend **refuses** rather than guesses or silently fails. Examples (the explicit one from the handoff being the first):

- **Package question with no shipping source** → honest declaration is the answer ("I don't have a shipping carrier configured to check"), ask/offer the alternative, never invent a tracking state.
- **Unauthorized request** → refusal + escalation / correct-path offered (Authority category's communication-of-refusal).
- **Conflicting authoritative sources with no resolution rule** → conflict presented neutrally, no forced settlement.
- **Information-free formation** → "stop safely with visible reason" rather than guess.
- **Side-effect unknown outcome** → watch to settle window, hand to a person, never re-issue (the refund example).

### Memory evaluation measures folded in

The memory&knowledge category evaluation (four measures) becomes replay assertions:

- **Repeated-mistake rate** — after a lesson, does the same failure pattern reappear? Asserted per scenario type.
- **Stale-memory use** — did retrieval surface stale claims? Asserted via the stale-supersede tracking decision.
- **Policy conflicts** — did learned guidance collide with policy? Asserted by policy-conflict reconstruction.
- **Replay regressions** — the same scenario re-run after a memory change must not regress; this IS the replay harness's core loop.

Each measure is a structured assertion over the trace (which memory was retrieved, which was superseded, which decided), never a model-generated number. This satisfies the no-model-numbers-in-control-paths rule and the memory capability's own evaluation decision.## 12.6 Prompt-optimization practical wiring (item 7)

How DSPy+GEPA actually wires against our trace format — conceptually; hosting/vendor stays Level 3.

### Which bounded artifacts become predictors

A predictor exists wherever the LLM is allowed to propose a bounded artifact (the DSPy signature), paired with a deterministic VALIDATE. From Parts 6 and 11:

- **P1 — MEANING artifact** (conversation manager): input = routing slice (person profile, open situations, event); output = the bounded `{interpretation, referenced_thing?, candidate_situations, purpose_template, ask_list, new_or_join}` artifact. VALIDATE (code: 0/1/many) decides patch / create / clarify / ack.
- **P2 — behaviour proposal** (worker PROPOSE): input = stage slice (evidence state, gaplist, context slice from memory loader); output = next-behaviour decision intention + structured reasoning; VALIDATE (code) accepts or returns to bounded repair/re-propose.
- **P3 — gather source selection** (worker, Fork A): input = required-information set + remaining gaps; output = ordered source list per gap. Only the *source choice* is a predictor — not the sufficiency question (never inside the pass).
- **P4 — communication content** (via the layer, Fork B): input = the situation-model update the communication manager read; output = the message draft. Expression shape is a predictor; whether and when to send are layer rules, not the model's.

### What the deterministic validator stack supplies

GEPA needs `(score, feedback)` — a scalar plus textual critique — else it degenerates into random search. Our deterministic stack already emits exactly this:

- validators (schema, references-exist, authority, ask-coverage, grounding/evidence-state, communication-purpose, per-viewer-depth) return pass/fail **and** a machine-readable failure reason for each failure — (score, feedback) without an LLM judge.
- The refusal/honest-declaration case is *also* a validatable output (did the model declare honesty instead of guessing), giving GEPA a correctness signal on the hardest cases.
- The only place an LLM judge is even considered is the non-verifiable class (Part 7 Class 3) — sampled, human-verified, never a control signal.

### Where the optimizer sits

Per Part 8's separate-service shape: an optimizer service (Python, DSPy+GEPA) reads trace segments + deterministic verdicts, proposes prompt/skill-text changes for specific bounded artifacts, validates candidates via the harness hull + golden scenarios, and commits only PRs — keeping the *runtime* harness truthful. Vendor/hosting stays Level 3. The optimizer improves text, never the runtime control path; no model-generated numbers enter control logic.

### The (score, feedback) contract explicitly

For each predictor, the metric is a bundle of deterministic verdicts and the feedback text is the machine-readable reason list from validators — so a GEPA run on Tend costs its normal ~$2–10 per run (library's estimate at 10–20 examples) and never needs a judge model to grade instruction-following. The concrete LM choices, DSPy version pinning, and queue/storage for trace read are Level 3.## 12.7 Fine-tuning deep dive (item 8)

Our purpose is different from generic fine-tuning: the small model must internalize Tend's product dynamics and thought process — the bounded-artifact shapes, "stop and ask", "defer to code", honest endings — never the business (business knowledge lives in skills and memory at runtime, per the Part 5 decision). Judged against that purpose, and against the SKILL.state error taxonomy (what small models get wrong is adherence, not raw reasoning: premature overwrite/delete 68%, schema/type coercion 20%, JSON syntax 12%).

### Methods compared

- **SFT** — the anchor. Data: verified trajectories of Tend's own thought process and honest endings, scrubbed of business data. Fits the purpose exactly; the risk (imitating business rules or guessing) is controlled by the de-businessing and by only training on deterministic-validated artifacts.
- **Preference optimization (DPO/KTO)** — pairs from external signal (the verdict: different result, human correction) rather than from the model's self-confidence. Fits once we have a graded dataset of good/failed bounded artifacts.
- **Verifier-based RL (RLVR/GRPO)** — the reward is our deterministic verifier and declared outcomes only. GEPA beat 24k GRPO rollouts; RLVR on our loops is only viable where the verifier is the true signal and rollouts are cheap — for the bounded artifact, at the per-stage small model. It stays later in the sequence than SFT+adapters, and only with a verifier.
- **Distillation** — frontier → small, but only of the *process* (how Tend decides within bounded shapes). Never distills business facts; those live in skills/memory at runtime.
- **Rejection sampling** — generate many candidates, keep the ones the validator accepted (including honest refusals). This is the practical shape of "verified traces as training data" and the core of our BFS for the model.
- **LoRA/QLoRA** — per-stage/per-adapter lightweight fine-tunes; compose with routing.
- **Adapter composition and routing** — many small adapters, each owned by a stage/artifact class, selected by the routing slice. This matches the per-step architecture: the *step's* model is a routing decision.
- **Continual fine-tuning & rollback** — new good data comes continuously; each adapter is versioned like a skill; rollback = switching the adapter to the previous version. No single monolithic weight to manage, and every model-teaching step is reversible (ties to the memory category's reversibility ruling).
- **DPO/KTO vs. SFT vs. RL** — the honest comparison: each of these wants different data from our traces (SFT: positive artifacts; DPO/KTO: pairs; RL: reward events), all of it filtered by the validator + audit before it is allowed to touch weights.

### The data each needs from our traces

- **SFT:** validated positive artifacts (bounded shapes, honest endings) sampled from correct walks.
- **Preference (DPO/KTO):** pairs from diagnostics (failed-vs-correct on identical step/situation), built only from award/critique that is deterministically grounded.
- **RLVR:** reward events = the verifier's outcome over many rollouts of the same bounded artifact.
- **Distillation:** frontier outputs + deterministic validation filter, for the *process* only.
- **Rejection sampling:** the pool of validator-admitted candidates (positive) and rejected (negative) for hard negatives.

All training data respects the acceptable-learning boundary (behavior yes, business/policy/authority never) from Part 5 — and every training run is a delta on an adapter, reverseable by switching versions, per the memory category's reversibility rule.## 12.8 Data & feedback — the trustworthy-signal taxonomy (item 9)

Central question stays: "the tool call completed" does NOT prove "the ask was answered". The source taxonomy classes each feed: fine-tuning vs harness repair vs memory learning vs evaluation.

### Signal classes

- **Production traces** — the loop's own audit (bounded artifacts + validator verdicts + state changes). High trust for *machinery*; low trust for *resolution*. Feeds fine-tuning (as validated traces), evaluation (baseline), and memory (events). Never claims resolution by itself.
- **Human corrections** — a person corrected Tend's output. Trust for "this was wrong"; ambiguous about the cause. Feeds memory learning (lessons), fine-tuning (preference pairs), and harness repair (recurrent correction patterns).
- **Tool results** — what a tool actually returned. Trusts the returned *claim as a claim*, never as proof the ask was answered (the tool can complete with wrong/stale data). Feeds harness repair (tool-layer errors: the tool failed vs returned nonsense) and memory (event-state). The distinction — tool finished vs ask answered — is drawn from Trust & Evidence (source claim vs evaluated evidence state).
- **Validation failures** — a deterministic validator rejected the artifact. Trust for "this violates a rule" is the highest-quality, machine-exact signal. Feeds harness repair (did the artifact or the rule leak?) and fine-tuning (negatives). They also detect adherence-class failures directly (SKILL.state alignment).
- **Customer outcomes** — declared + confirmed by follow-up. This is the rare, gold-level resolution signal. Feeds evaluation (ground truth), memory learning (outcome events), and eventually preference pairs. Only confirmed outcomes count, per the no-guess rule — never a model's self-report.
- **Replay** — deterministic re-runs. Feeds evaluation only; its trust is about the harness (state determinism), not the world. No model decides a replay verdict.
- **Synthetic trajectories** — generated. Trust lowest; used only to seed coverage/breadth for the harness (Agent Seer-style), never as truth for the model or memory.
- **Hard negatives & near-misses** — adjacent-to-correct and just-wrong artifacts. Trust: high for the *boundary*; feeds fine-tuning negatives/preference and harness repair (captioning the boundary).

### The two-sided trust rule

- **Machinery side** (what happened inside): traces, validators, tool results, replay — internally trustworthy.
- **Outcome side** (did the ask get answered): the customer/public outcome — externally trustworthy when confirmed.

A "tool call completed" is a machinery fact. To know whether the ask was answered you bind declared outcome + later confirmation (the situation's follow-up). When no confirmation exists, the honest state is *answered-unknown* — exactly as Failure category treats an unknown outcome; never guess.

### Where each signal feeds

- **Fine-tuning:** validated traces (SFT positives), validation failures + near-misses (negatives), human-correction pairs (DPO), confirmed outcomes (RL reward).
- **Harness repair:** tool-result classification, validation failures, near-misses, recurrent corrections.
- **Memory learning:** verified event-outcome pairs from the audit; corrections with their context; only claims with external grounding — matching Part 10's reconciliation and the no-uncertain-learn rule.
- **Evaluation:** all of the above, but only as assertions — replay baselines, golden sets, the Part 7 hulls; and customer outcome as the resolution ground truth. Never a model-generated number in a control path.

One sentence tying item 8—9 together: trace + validator gives us machinery truth cheaply; declared + confirmed outcome gives resolution truth expensively; fine-tuning consumes the first, evaluation and memory consume both, and harness repair bridges the gap where the machinery itself was wrong.## 12.9 Evaluation & attribution — the baseline ladder (item 10)

Applied to our actual loops, connecting to the two hulls (Part 7).

### The ladder, concretely for Tend

- **Base model** — a raw pre-trained model, no Tend context. The starting point; every rung is measured as a delta over it.
- **+prompt** — the constitution slice, template, skill text. Measured: bounded-artifact conformance, rule-following (adherence), refusal quality. This is what GEPA optimizes.
- **+tools / capability registry** — tools + their schemas + tool-system-prompts. Measured: tool-selection correctness, tool-call schema conformance, tool-attribution in the audit.
- **+harness** — the per-step contract, validators, routing slice, the state discipline (bounded artifacts, cite-before-act, honest stops). Measured: adherence-class failures falling, no-model-numbers rule held, honest-refusal rate, trace completeness.
- **+memory** — the loader + observer + retrieval loop. Measured: are context slices more relevant per step (measured structurally: supersession, staleness, policy conflicts — the Part 12.5 four measures); did the right past lesson surface at the right stage.
- **+fine-tuning** — the model internalizes the thought process (Part 12.7). Measured: same attributes but cost/latency down (small model replacing frontier per stage while the deterministic validator keeps the floor).
- **+routing** — which model handles which stage (frontier vs small). Measured: cost, latency, and non-degraded conformance.

### What is measured at each rung

- **Model response** — bounded-artifact conformance (shape, schema, honesty) via the validator verdict (deterministic, machine-exact).
- **Tool call** — tool-selection, schema, authorization check result.
- **Interaction** — did the ask get an honest answer (or honest refusal-offer-escalation).
- **Trajectory** — the run of artifact→verdict→state; golden-set trajectories are the replay seed.
- **Situation completion** — situation reaches a resolved/blocked/closed state exactly per the situation worker's declared-outcome at the end.
- **Business outcome** — the external, confirmed resolution (customer outcome, Part 12.8), collected post-hoc and offline.
- **Safety** — no rule violation, no policy conflict, refusals present when warranted (all structured counts).
- **Cost/latency** — per stage per model-rung, as event counts.

### How a gain is attributed to a rung (not guessed)

The discipline: change exactly one rung at a time, replay the golden sets (Part 12.5) + regression sets + a held-out production slice, and require the deterministic metrics to move before crediting anything. Because the validators are deterministic, a gain is *observed*, not inferred. Two-hull check (Part 7): when a rung changes, the provider hull and harness hull audits confirm the change is only in the intended surface (e.g., provider drift would implicate the provider, not the prompt). Memory rung: the four Part 12.5 measures isolate memory's contribution. The rule that keeps attribution honest: **no model-generated number ever decides whether a change worked** — the deterministic metrics and the audit decide.

### Where this binds to the study

This ladder is the same frame behind Part 8's three-part separation (prompts text / harness code / model weights), and it grounds the Part 12.5 replay assertions as the actual "did this change help" measurement device.## 12.10 The historical lineage map (item 11)

One map closing the whole study: for every studied source, the earlier problem → method → measured result → criticism/failure → follow-up → current practice → where Tend takes/strips it. It answers the "journey of research" Swaraj asked for in session one.

### The through-lines that connect all sources

1. **Loop is the product, not the model.** Starting from Hermes (one conversation loop) to Part 8's evolution library to Part 11's loops — the field converged on "harness shapes behaviour"; the model is a replaceable component inside the harness.
2. **Persist state; don't hold it in context.** Hermes persists intent before side-effect; TeleChat writes state per step; supermemory/utopia keep durable record; our situation model + audit is the same line.
3. **Fail-closed outward, keep talking.** From Hermes' failover, Pi's exit reasons, SKILL.state's adherence failure, to our "never guess, honest stop".
4. **Auto repair of the harness itself.** AutoSaddler / GEPA (paper and now tool) make the prompt/harness-text repair itself a first-class job of the system — this is Part 8's promise, now proven.
5. **The small (fine-tuned) model is a servant of determinism, not the lord.** GEPA + fine-tuning research both say the small model is more trustworthy when its bounded artifact is checked by code than when it judges itself.

### The map (by source)

- **Hermes:** loop hardens through failures; take: intent-before-side-effect, not silent self-repair.
- **Pi:** clean minimal loop (rest, no wait-model); take its clarity; leave its single-chat scale limits.
- **Herdr:** supervisor for long-running agents; take: separating supervisor from runner is viable; leave: repo-run notion as primary unit.
- **Supermemory / Utopia:** memory engines with own-loop (utopia graph + decision records); take: own-loop/isolation + recovery-peers; leave: adopting their memory engine wholesale — Part 10 rejected supermemory's remote-memory data/authority leak; we designed our own capability.
- **TeleChat:** per-step context slices (verified in Part 11 against code); take: stage-slice loading model.
- **Papers:** JIT-Agent (per-task harness), SKILL.state (explicit state + adherence taxonomy), Automata (FSM from traces), AutoSaddler (harness repair from traces), EvoHarness-RL, PrimeAgent, SLM-edge (small models at edge), Agent Seer (scenario synthesis). Take: SKILL.state error taxonomy, Automata behavioural FSM/trace recovery, JIT's harness synthesis / teacher-data, EvoHarness small-model loop training, Agent Seer's scenario generation; reject: JIT-Agent's per-global-route of generated harness for our per-situation actor needs, Agent Seer's tool-spec-only coverage (business situations needed => Part 12.5).
- **Internet products (Part 12.3):** Fin/Sierra/Decagon — intent→routing→handoff; Temporal/Inngest (durable waits), Mem0/Letta (memory breadth), Linear/GitHub (notification discipline). Take: the router/isolation idea, the durable-wait idea; reject/ignore model-supervisor guardrails; absorb their notification/attention discipline into Business View.

### Where Tend takes vs rejects (summary)

- **Take:** every source's lesson that the *harness* (bounded artifacts, deterministic validation, honest stops, state discipline) is where reliability lives; the trace-format-as-training-data contract; the durability/state discipline; the notify-discipline.
- **Reject:** anything that lets the model authorize itself (model supervisors, self-assessed confidence in control), anything that turns memory into the product's brain (mem0/letta engine-in-control), anything that treats a single conversation/ticket as the unit of truth (fin/decagon), and anything that learns the business into weights (Part 5 acceptable-learning boundary).

The map is complete: it closes the study's scope and positions Tend as the same lineage's *strictness* branch — every lesson taken, every control kept in deterministic code, every number out of the model's hands.

## 12.11 What the completed study means

The finished items 2–11 close the study as planned in the handoff. The three rulings (item 1) landed in Parts 6/11; the verification (12.1–12.2) corrected the numbers and confirmed the tools; the products column (12.3), the conversation questions (12.4), golden scenarios + memory measures (12.5), prompt-optimization wiring (12.6), fine-tuning (12.7), signal taxonomy (12.8), evaluation ladder (12.9), and the lineage map (12.10) complete the journey of research. What remains open sits in Level 3 (hosting, queue/storage, optimizer deployment, adapter-offination) and in the other two pillars (product design, software factory) which are separate chats, as the handoff specified.

## Changelog — Part 12 added

- Part 12 added 2026-09-04 (completion stint, after the fork-ruling session): the study's remaining items 2–11 — GEPA verification from the paper (numbers corrected to "up to 35×", "+14% vs +7% for MIPROv2", "9.2× shorter"), AutoSaddler status (released, MIT, V2 durable engine), the internet-products column (4 families × align/invalid), the conversation-manager questions (training/audit trace split; MEANING as Understanding's proposal, not a second model; acknowledgment = Communication rules at the ack), golden scenarios + memory evaluation measures (structure only), prompt-optimization wiring (predictors P1–P4, validator stack as (score, feedback), optimizer as separate service), fine-tuning deep-dive (methods+data, de-business rule), trustworthy-signal taxonomy (machinery vs outcome trust; tool-completed ≠ ask-answered), the evaluation/attribution ladder with the two-hull guard, and the historical lineage map closing the study. Changelog entry updated accordingly; base prompt §11/§12/§18 synced in the same stint.
## What this file does not contain (deliberately)

- Level 3 technology choices — queues, vector stores, providers, and the prompt-optimization engine's hosting remain open.
- No adoption claims — every "aligned" item is a candidate until a design uses it and survives review.

## Changelog

- Created from the study sessions; replaces two earlier research records (loop decomposition draft — withdrawn as premature — and an unreviewed Level 1 framing draft), both deleted.
- Part 6 added (conversation-manager loop, grounding in the Communication category).
- Part 7 added (observability & explainability — five anomaly classes, two hulls).
- Part 8 added (improvement machinery — DSPy+GEPA self-evolution library read from code, AutoSaddler, Automata, language call, unified architecture).
- Part 9 added (prompt-optimization landscape — DSPy current state, optimizer zoo, GEPA in depth, mapping to Tend, GitHub repos as sources; gathered with TinyFish).
- Part 10 added (memory & knowledge capability — Utopia reverse-engineered from code and decision records, supermemory re-verified, the false-fork correction, the framing ruling (memory = independent component with its own loop), the no-thresholds ruling (no model-generated numbers in control paths), the situation-linking model from the knowledge base, the X/Y/Z defense, provisional items parked to Level 3).
- Part 11 added (situation-worker loop, first draft + the memory attachment rulings — memory as observer and context engineer verified against TeleChat's per-step context slices; the conversation manager's routing slice for scale; the async trace-fed memory writer with the state-write/learning-write split; code-first loop control; the loader contract parked to Level 3; three forks explicitly left open in §11.6).
- Parts 6 & 11 updated (2026-09-04, fork ruling session): the three open forks in §11.6 RULED by Swaraj after a Level 2 trade-off analysis (Level 1 constraints + full category mines + external evidence via TinyFish). Fork A = gather is a bounded, priority-ordered pass over the required-information set that returns to PROPOSE; sufficiency is never evaluated inside gathering. Fork B = the worker never communicates directly — it updates the situation model and the communication manager reacts to the change (Kanban-ticket model); the inbound acknowledgment routes through the same layer; tools needing yes/no confirmation run their pre-configured flow from the deterministic tool layer through the communication layer. Fork C = progress for the bounded-rounds limit is the enumerated structured evidence-state predicate (claim-state transition; new-source claim; wait/watch record; declared outcome; permission change) — identical repeats and LLM self-assessment are enumerated as no-progress. Propagated into the Part 6 expression model and the Part 11 per-wake contract.
- Part 13 added (2026-09-05, data architecture & compute session): database and storage architecture (hybrid D1 + R2 + DO SQLite + KV + Queues), compute architecture (Conversation Manager = per-business stateless Worker; Situation Worker = per-situation Durable Object), the conversation-vs-situation separation, the situation model as the shared coordination point in D1, the preemption pattern via DO queuing, trace storage via Queue→R2, tiered archival strategy, and concurrency resolution. Researched via three parallel sub-agents plus two targeted follow-ups. Level 2 decisions recorded; Level 3 boundaries named and left open.
- Part 13 completed same day (sections 13.1 + 13.2): the six concurrency mechanics resolved (FIFO event ordering, no cross-situation deadlocks, CAS on the situation version, dedup placement, no cross-situation ordering, the six-guarantee WAKE/RECOVER/REST contract) closing handoff item 12; backup/recovery per store, the semantic-index placement decision (scoped, tenant-isolated, never the source of truth; Vectorize named as the Level 3 candidate), and the per-kind attribute table closing handoff item 10 completely. Items 10 and 12 are now DONE.
- Pre-architecture stint (2026-09-05): closed §4A item 13 as study Part 14. Session corrections recorded in §14.1 [HIGH ATTENTION]: externals are inspiration only, never a decision menu; plain language, no product-name shorthand; step instructions belong to memory & knowledge, not the constitution (moved the optimizer's scope). Event-driven decisions: the wait book IS the subscription registry and the situation registry the reverse address book (subscription-consumer model, never polling — Swaraj's clarification); write-and-announce-together (whoever updates the situation model emits the change-event in the same execution; unannounced write = incomplete job, retried — closes Part 13's open DO-trigger mechanism); the cache never guards a decision (enforcement always reads the source of truth; invalidation is speed-only); rule changes need no event (reads go fresh at each wake; the per-action check is the hard gate; proactive waking parked as possible per-business configuration); duplicate delivery harmless via version dedup; lost events heal via the check-in. Constitution decisions: four text layers with owners (universal core + stage constitutions = human-authored, release-versioned; runtime preferences injected by the memory loader; assembly templates = memory & knowledge); deterministic rules never enter text; writing discipline (case-general principles, positive alternatives over prohibitions, short per stage); the optimizer edits memory-owned assembly text only, gated by validator verdicts + golden scenarios + PR review, adoption per-predictor and deferred until traces exist. New Level 2 folder: `Level 2/prompt_constitution/`. Notes added to `coordination/` and `time/` conversation-and-discoveries files. §4A progress status, §12, §18 synced. **Architecture category unblocked.**

---

# Part 13 — Data Architecture & Compute (items 10 + 12)

## Why this part exists

Two platform-level questions the engineering study never covered:

1. **Where does Tend's data live?** (handoff item 10)
2. **What compute runs Tend's loops?** (handoff item 12 — largely answered here)

The handoff explicitly said: "PostgreSQL versus Cloudflare is the WRONG first question. Cloudflare is a platform of storage/execution primitives (D1, KV, R2, Durable Objects, Workers), not one database. Decide which primitive fits each kind of data."

## The conversation that led to this part

Swaraj opened by describing his database dilemma. He had used PostgreSQL and appreciated the debugging advantage — one database, one SQL editor, all data queryable with JOINs. But he also built Kirana TeleManagement on Cloudflare Durable Objects with embedded SQLite, where compute and storage live together, and saw the speed advantage (zero network latency, no connection limits). He wanted to understand the trade-offs, the sharding story, and whether a hybrid approach was needed.

Three parallel research sub-agents were dispatched (database fundamentals, Cloudflare data primitives, developer social signals). The initial analysis proposed a database-per-tenant model. Swaraj challenged it: "I don't think either a central postmaster like PostgreSQL, or a D1, or a distributed thing like SQLite with Durable Objects — both in themselves will not cut it. We need a hybrid architecture."

The analysis was rewritten to extract every data type from the knowledge base and map each to the right primitive. Swaraj then raised a critical objection about the compute architecture: "Situation models are not only per-actor. They represent the whole journey of a business. Multiple interactors might access the same situation model."

## The critical correction: conversations vs situations

My first analysis treated conversations and situations as the same thing. Swaraj corrected this.

**A conversation** is a 1:1 thread between Tend and ONE interactor on ONE channel. Each conversation is unique. A customer's WhatsApp message and an employee's Slack message about the same order are two different conversations.

**A situation** is an operational thread that spans multiple conversations. One situation ("Order #123 delivery issue") can be referenced by the customer's WhatsApp conversation, the employee's Slack conversation, and the partner's email conversation — all at the same time.

**The situation model is the coordination point.** Both the conversation manager and the situation worker read and write to it. The situation model holds references to all conversations and messages linked to it.

Swaraj: "An employee talking about the same situation model and a customer talking about the same situation model will have the situation model common, but the conversation threads will still be different."

Swaraj also noted: "It wouldn't be a bad idea for the situation model to append all the conversation IDs or conversation references the situation model is depending on. It will help us in creating a complete picture while the situation worker is running. Since we have all the conversation and message references, the IDs — when we are building context, it will be a more fuller context."

The knowledge base already held that the situation model references messages, but did not explicitly account for multiple conversations per situation. That gap is now closed.

## The compute architecture: Worker + DO

### Why Conversation Manager is a Worker (not a DO)

Workers are stateless and concurrent. A single Worker instance processes multiple requests via its V8 event loop. While one request awaits an async task, the event loop picks up the next request. 10,000 simultaneous messages can be handled by one Worker without queuing.

The conversation manager holds no mutable state. It reads config from D1, writes to D1, and routes. A DO would be single-threaded and would serialize all 10,000 messages.

The conversation manager is per business. Each business gets its own Worker. This follows the per-tenant isolation philosophy from the Product Vision.

### Why Situation Worker is a DO (not a Worker)

Each situation needs single-threaded processing. No two workers can update the same situation model simultaneously. DOs guarantee this: `env.SituationWorker.idFromName(situation_id)` always routes to the same DO instance for a given situation_id.

DOs have built-in alarms — used for situation-level check-ins, tool timeouts, and deadline monitoring.

DOs have their own SQLite — usable for ephemeral working state. Swaraj: "Even in cases where something fails, since the DO has SQLite itself, we can use it as a temporal replacement and have resumability. We can also store logs and other things that help us in debugging."

If the DO crashes mid-processing, it can be re-created and resume from the last situation model version in D1.

### The DO class question

Swaraj asked: "Will all situation DOs for a customer have the same DO class?"

Yes. All situation DOs use the same class (e.g., `SituationWorker`). Each situation is an instance with a unique ID. The differentiation is by DO ID, not by class. One DO class serves all situations across all businesses.

### How preemption works (the DO's own queuing)

1. Situation worker is in the middle of its loop (say, gathering)
2. The conversation manager updates the situation model in D1
3. The situation DO is triggered by the version change
4. The update queues up inside the DO (DOs process one request at a time)
5. When the worker finishes its current step, it picks up the update
6. The worker reads the latest version from D1, sees the diff, reassesses
7. If the new message changed the situation, the worker adjusts and continues

No polling needed. No complex locking. The DO's natural single-threaded queuing handles it.

Swaraj: "We have to engineer into the loop that there is an update that has come, and we definitely continue and reassess whether our decisions, gathering, etc., whatever stage we were on has catered to the new update."

### The corrected flow

1. Message arrives → Conversation Manager (Worker, per business)
2. Conversation Manager: WHO → MEANING → VALIDATE
3. Conversation Manager **updates the situation model in D1** (new version)
4. If the situation model now has enough info to answer directly → the conversation manager answers. No DO triggered.
5. If the situation model needs more work → the situation model update triggers the situation DO
6. Situation DO reads the latest version from D1 (sees the diff), runs its loop
7. Situation DO does its work → updates the situation model in D1 (new version)
8. When the DO updates the model → emits event to Queue
9. Conversations linked to the situation get notified
10. Communication layer generates viewer-appropriate responses for each

Swaraj's correction: "The conversation manager only updates the situation model. If the conversation manager feels that the situation model itself has enough information to answer the user back, it just does that. Only when it updates the situation model with something [that needs the situation worker], only then the situation DO will be triggered based on the update of the situation model. The conversation manager does not send anything to the DO."

The DO also sees the version diff: "Since the situation model is also versioned, you will get the versioning of what happened before and what I did then and what I have to do now."

### The architecture diagram

```
PER BUSINESS:

  ┌──────────────────────────────────────────────────────────┐
  │     CONVERSATION MANAGER (Worker)                  │
  │ - Per business, stateless, concurrent              │
  │ - Receives ALL messages from ALL channels          │
  │ - WHO → MEANING → VALIDATE                        │
  │ - Updates situation model in D1                    │
  │ - Does NOT call situation DOs directly             │
  │ - Does NOT decide business behaviour               │
  └──────────────────────────────────────────────────────────┘
                         │
                         │ writes to D1
                         ▼
  ┌──────────────────────────────────────────────────────────┐
  │           D1 (per business)                        │
  │ situation_models (versioned, append-only)          │
  │ situation_registry (index)                         │
  │ conversations (per-interactor threads)             │
  │ messages (linked to conversations AND situations)  │
  │ config (grants, policies, channels, roles)         │
  │ knowledge_items (typed, versioned)                 │
  └──────────────────────────────────────────────────────────┘
                         │
                         │ version change triggers
                         ▼
  ┌──────────────────────────────────────────────────────────┐
  │     SITUATION WORKER (Durable Object)              │
  │ - One DO instance per situation, same class        │
  │ - Single-threaded per situation                    │
  │ - Reads model from D1, sees the version diff       │
  │ - Runs loop: gather → propose → execute → update  │
  │ - Alarms for check-ins, timeouts, deadlines        │
  │ - Own SQLite for ephemeral state, logs             │
  │ - Writes new model version to D1                   │
  │ - Emits event to Queue when model updates          │
  └──────────────────────────────────────────────────────────┘
                         │
                         │ emits "situation_updated"
                         ▼
  ┌──────────────────────────────────────────────────────────┐
  │          EVENT FABRIC (Cloudflare Queues)           │
  └──────────────────────────────────────────────────────────┘
                         │
            ┌────────────┼────────────┐
            ▼            ▼            ▼
  ┌────────────┐  ┌────────┐  ┌────────────────────┐
  │ QUEUE        │  │ MEMORY/  │  │ COMMUNICATION      │
  │ CONSUMER     │  │ KNOWLEDGE│  │ LAYER              │
  │ Finds linked │  │ OBSERVER │  │ Generates viewer-  │
  │ conversations│  │ Updates  │  │ appropriate        │
  │ in D1        │  │ knowledge│  │ responses per      │
  │              │  │ in D1    │  │ conversation       │
  └────────────┘  └────────┘  └────────────────────┘
```

## The data architecture: what goes where

### The data types extracted from the knowledge base

**Category A: Per-Business Configuration** — small, read-heavy, strongly consistent. Grants, policies, approval rules, channel configurations, employee/role definitions, partner scopes. Mutated by the configurator only. Lives in D1.

**Category B: Per-Business Learned Knowledge** — small-medium, versioned, scope-first retrieval. Semantic business knowledge, procedural memory, error/reflective memory, local vocabulary. LLM proposes, system reconciles. Lives in D1.

**Category C: Per-Situation Transactional Data** — high volume, write-heavy, versioned. Situation models (versioned), situation state, claims with provenance, wait records, decision records, communication records, human work items, gathering records, declared outcomes, capability-absent conclusions. Situation models live in D1; the DO holds only ephemeral working state.

**Category D: Conversation & Communication Data** — high volume, immutable, append-only. Conversation history, message interpretations, attachments. D1 holds metadata; R2 holds large content.

**Category E: Trace & Observability Data** — very high volume, immutable, write-once. Execution traces, observation events, invariant violations, audit records. Lives in R2 (via Queue).

**Category F: Training & Evaluation Data** — medium volume, derived, immutable. Training traces (SFT examples), golden scenarios, evaluation results, preference pairs. Lives in R2.

**Category G: Cross-Business / Platform Data** — tenant registry, system health aggregates, analytics aggregates. Lives in a separate analytics D1.

### Why D1 for the shared situation model

The situation model must be accessible by both the conversation manager (Worker) and the situation DO. DO SQLite is private to the DO instance — the conversation manager cannot write to it directly. Therefore the authoritative situation model lives in D1, where both compute units can read and write.

The DO reads the latest version from D1 when triggered, caches it in its own SQLite for fast access during processing, and writes new versions back to D1. If the DO crashes, it re-creates and reads the latest version from D1 — resumability is preserved.

### Why R2 for traces and large content

Traces are generated on every loop iteration (~10-100KB each). A business with 1000 active situations generates ~200MB of trace data per month. This would fill the 10GB D1 limit in months.

R2 has no per-database size limit and zero egress cost. Traces are written to R2 via Cloudflare Queues (batched writes reduce PUT operations).

### Why KV for cache

Compiled context slices, session data, and dashboard summaries are small, frequently accessed, and ephemeral. KV provides sub-millisecond global reads with TTL-based expiration.

### The D1 schema (conceptual)

```sql
CREATE TABLE situation_models (
  situation_id TEXT NOT NULL,
  version INTEGER NOT NULL,
  model_json TEXT NOT NULL,
  reason TEXT NOT NULL,
  author TEXT NOT NULL,
  created_at TEXT NOT NULL,
  PRIMARY KEY (situation_id, version)
);

CREATE TABLE situation_registry (
  id TEXT PRIMARY KEY,
  do_id TEXT NOT NULL,
  state TEXT NOT NULL,
  current_version INTEGER,
  involved_interactors TEXT,
  conversation_ids TEXT,
  created_at TEXT,
  updated_at TEXT
);

CREATE TABLE conversations (
  id TEXT PRIMARY KEY,
  interactor_id TEXT NOT NULL,
  channel TEXT NOT NULL,
  situation_ids TEXT,
  state TEXT NOT NULL,
  created_at TEXT,
  last_message_at TEXT
);

CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL,
  direction TEXT NOT NULL,
  channel TEXT NOT NULL,
  content_ref TEXT,
  situation_ids TEXT,
  interpretation TEXT,
  created_at TEXT
);

CREATE TABLE config_grants (id, grantor, grantee, range_json, conditions, status, version, ...);
CREATE TABLE config_policies (id, name, conditions, permitted_behaviour, required_evidence, approval_required, scope, version, ...);
CREATE TABLE config_channels (id, channel, can_initiate, reply_window, template_category, consent_required, ...);
CREATE TABLE config_roles (id, name, permissions, visibility_scope, ...);

CREATE TABLE knowledge_items (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  scope TEXT NOT NULL,
  content TEXT NOT NULL,
  conditions TEXT,
  source_refs TEXT,
  status TEXT NOT NULL,
  version INTEGER,
  created_at TEXT,
  updated_at TEXT
);

CREATE TABLE trace_index (
  trace_id TEXT PRIMARY KEY,
  run_id TEXT NOT NULL,
  situation_id TEXT NOT NULL,
  phase TEXT,
  timestamp TEXT,
  r2_location TEXT,
  outcome TEXT
);
```

### Data volume estimates and the 10GB problem

Per situation: ~192KB. Per business (SMB, ~1000 active situations/month): ~200MB/month. After 3 years: ~7.1GB, approaching the 10GB D1 limit.

**Solution: tiered storage with automatic archival.**

1. **Hot (0-90 days)**: In D1 — fully queryable.
2. **Warm (90-365 days)**: In D1 with situation model content moved to R2. D1 keeps the index and summary.
3. **Cold (365+ days)**: In R2 only. D1 entry is a stub pointing to R2.

A scheduled Worker (cron trigger) runs daily per business. Identifies situations completed > 90 days ago. Exports to R2. Replaces the model_json in D1 with a stub.

Swaraj noted: "What we have to archive is basically the SQLite file at the end of it. We can definitely just store it in R2 and bring it up and open it whenever we want." Research confirmed: DO SQLite cannot be directly exported as a .db file, but the data can be exported via SQL dump or row-by-row JSON and stored in R2. For rehydration, a new DO is created and the data is imported back.

For businesses that generate faster: shard D1 by time period, or move to Hyperdrive (PostgreSQL).

### Trace storage pattern

Traces are written to R2 via Cloudflare Queues (batched writes). The Situation DO emits trace events to Queue (non-blocking). A Consumer Worker batch-reads events and writes them as a single R2 object. For debugging: query D1 trace_index → fetch batch R2 object → extract relevant traces.

## The full data placement map

| Data Type | Storage | Why |
|-----------|---------|-----|
| Business configuration (grants, policies, roles) | Per-business D1 | Strong consistency, SQL queries, small volume |
| Learned knowledge | Per-business D1 | Typed, versioned, scope-first retrieval |
| Situation models (versioned) | Per-business D1 | Shared coordination point, accessible by both Worker and DO |
| Situation registry | Per-business D1 | Routing and lookup |
| Conversations | Per-business D1 | Indexed by interactor, by situation |
| Messages (metadata) | Per-business D1 | Indexed, linked to conversations AND situations |
| Message content (large) | R2 | Cheap storage, zero egress |
| DO ephemeral state / logs | DO SQLite | Optional working state during processing |
| Execution traces | R2 (via Queue) | High volume, append-only, batch writes |
| Trace metadata index | Per-business D1 | Fast lookup by situation, by run |
| Training data | R2 | Immutable, aggregated, exportable |
| Cross-business analytics | Analytics D1 (separate) | Centralized, fed by event stream |
| Cache/session data | KV | Sub-millisecond reads, TTL expiration |
| Archived situations | R2 | JSON export from DO |
| Tenant registry | Analytics D1 | Cross-business lookup |

## What was resolved vs what remains open

### Resolved at Level 2

- Situation model is a shared, versioned record in D1 (not exclusively in DO SQLite)
- Conversation manager is a per-business stateless Worker (concurrent)
- Situation worker is a per-situation Durable Object (single-threaded)
- Both the conversation manager and the situation DO read/write the situation model in D1
- The DO is triggered by situation model version change, not by direct messages from the conversation manager
- The DO's own queuing handles preemption (updates queue up, processed after current step)
- The DO's own SQLite is for ephemeral working state, logs, and debug information
- Traces go to R2 via Queue (batched writes)
- Conversations are per-interactor message threads (no own compute)
- Situations span multiple conversations (one situation, multiple linked conversations)
- The situation model holds references to all linked conversations and messages
- Archival strategy: tiered storage, automatic export to R2 after 90 days

### Named as Level 3 (left open)

- The exact mechanism for triggering the DO when the situation model version changes in D1
- Whether the DO caches the situation model in its own SQLite during processing, and how it handles staleness
- The exact trace format and Queue batching strategy
- How the communication layer generates viewer-appropriate responses
- The exact analytics D1 schema and how it's fed
- Hyperdrive migration criteria for large tenants
- KV TTL values for each cache type

### Concurrency (handoff item 12) — resolved by this part

- **Collision handling**: The situation DO is single-threaded. All updates to one situation's model queue up and process one at a time.
- **Locking**: No explicit locks needed. The DO's single-threaded nature IS the lock. Only one worker per situation (guaranteed by idFromName routing).
- **Lost updates**: The situation model is versioned. Each write creates a new version. No overwriting. The DO reads the latest version before each step and sees the diff.
- **The natural concurrency boundary**: One situation = one DO. Multiple situations = multiple DOs running concurrently. This maps directly to the storage model.

## 13.1 Concurrency control — the six open mechanics resolved (item 12 closed)

The handoff asked four concurrency questions: collision handling, locking, lost updates, and the natural concurrency boundary. The natural boundary was answered with the compute architecture (one situation = one DO). The remaining six mechanics were worked through in conversation on 2026-09-05 and resolved as follows.

### 1. Event ordering within a situation

Question: when a deadline fires and a customer message arrives at the same time, which does the DO process first?

Decision: FIFO arrival order. No priority ordering at Level 2. The loop's reassessment contract makes ordering safe: each wake reads the latest situation model version and effects accumulate (version-forward). If a deadline fires an escalation and the next message would have prevented it, the DO processes the message after the deadline, sees the escalation in the model, and can reverse course — Trust and Evidence detects the conflict, Decision Making decides the next behaviour from the current evidence state. If a business needs deadline-before-message priority, that is business configuration (Level 3).

### 2. Cross-situation deadlocks

Question: situations reference each other via the situation graph. Can two situations deadlock?

Decision: No. A deadlock requires Situation A blocked waiting for Situation B's completion AND B blocked waiting for A. In our model situations never wait on each other's completion — they wait on external events (actor returns, state changes, dates, check-ins). When Situation A needs information from Situation B's model, it READS B's model from D1 — a non-blocking read, not a wait. Context edges mean "when working on A, also look at B for context", not "A cannot proceed until B is done". This is grounded in Coordination's ruling: processes "interact through the situation, not with each other. Each lands an update on the record." No deadlock detection mechanism is needed.

### 3. Stale reads and lost updates — compare-and-swap on the situation version

Question: the DO reads version 5, processes, meanwhile the conversation manager writes version 6. The DO then tries to write its own result as version 6. What happens?

Decision: compare-and-swap (CAS) on the situation version number. Every writer specifies the base version it read; the write succeeds only if D1's latest version still equals that base version. A rejected write forces a re-read and reassess.

The flow: DO reads v5 -> processes -> conversation manager writes v6 (base 5, succeeds) -> DO tries to write v6 (base 5) -> REJECTED -> DO re-reads v6, sees the new message reference, reassesses whether its current stage still holds, writes v7 (base 6) -> succeeds.

This is the mechanism that enforces "version-forward, never rewrite" (Memory and Knowledge) under two concurrent writers (conversation manager + situation DO). It is also the write-time implementation of the preemption contract from the compute architecture: the DO does not just queue the conversation manager's update, it detects the conflict at write time and reassesses. Level 2 rule: every situation-model write is a conditional write on the base version. Level 3: how D1 implements the conditional write.

### 4. Dedup and the DO queue

Question: how does Coordination's dedup interact with the DO's message queue?

Decision: dedup lives at the conversation manager (routing layer) for inbound events — a duplicate (same channel message ID / sender / content hash within a dedup window) is dropped before it can touch the situation model. Wait-registry dedup ("identical wait already open -> attach to it") lives inside the DO where waits are created. Residual duplicates that slip through (double-delivered webhooks, a crash between receive and dedup) are made idempotent by the model itself: adding a message reference that already exists is a no-op. Grounded in Coordination: "A re-entered message attaches to the existing node; it does not create a twin record."

### 5. Cross-situation ordering

Question: the conversation manager fans out to multiple situation DOs in parallel. Is there any ordering guarantee across situations?

Decision: No, and that is correct. Each situation is an independent operational thread ("one situation = one operational problem, one story, one card"). No situation depends on another's processing order. Where sequencing across situations genuinely matters (this journey step followed that one), it is recorded as a journey edge in the situation graph — data, not a concurrency constraint.

### 6. The WAKE / RECOVER / REST sequencing contract

What "coherent event sequencing" means for the situation-worker loop — six guarantees:

1. Serialized per situation: the DO processes one event at a time; no two events for one situation process simultaneously.
2. Latest-version read: every WAKE reads the latest situation model version from D1.
3. Version-forward write with CAS: every UPDATE is a conditional write on the base version; rejection means the model changed mid-processing -> re-read and reassess.
4. Reassessment between events: picking up the next queued event always starts from the latest version (previous event's effects plus any conversation-manager writes that landed in between).
5. Recovery from D1: after a crash, the DO re-creates, reads the latest version, re-enters the loop; whatever was durably written before the crash is preserved.
6. Bounded rounds per wake (Fork C ruling): the loop rests after the bound — named wait, declared outcome, or blocked. No infinite loop within one wake.

The concurrency model (single-threaded DO + versioned model in D1 + CAS) provides the mechanism; the per-wake contract provides the discipline.

Level 3 residue: the D1 conditional-write implementation; dedup window values.

## 13.2 The remaining item 10 attributes — backup, recovery, semantic index, per-kind table

The handoff asked, for each data kind: source of truth; consistency requirement; read/write pattern; retention; tenant boundary; indexing; backup and recovery; shape. The placement map covered storage choice and why. The attributes below close the rest so item 10 is fully answered.

### Backup and recovery, per store

- D1 (per business): Time Travel gives point-in-time recovery (30 days paid / 7 days free). Long-term protection: scheduled export to R2 alongside the archival job. situation_models is append-only, so recovery to any point inside the window is exact.
- DO SQLite (ephemeral state, logs): built-in PITR via Cloudflare snapshotting (30 days). Nothing in it is authoritative — the authoritative state lives in D1 — so DO recovery is "re-create and read latest from D1".
- R2: objects in our design are immutable and append-only (trace batches, message content, archives). Recovery = retention policy plus optional R2 versioning for accidental-write protection (Level 3 knob).
- KV: ephemeral cache by design. Nothing to back up; every cached value is recomputable from D1. TTL loss is harmless.
- Analytics D1 (cross-business): derived data. Recovery = replay the event stream that fed it, or re-run aggregation. The event stream is the durable input; the aggregates are rebuildable.

### The semantic index for memory retrieval (the vector question)

The Memory and Knowledge category decided retrieval = hard scope filters first, then candidate generation (which may include semantic similarity), then conflict resolution and ranking — and that the semantic index "must not be the source of truth for identity, authority or versioning." The engineering study added: hard filters before semantic ranking; semantic similarity never establishes identity or truth.

Level 2 decision: a scoped semantic candidate-generation index exists alongside D1. It is per-tenant isolated — namespace per business, or a mandatory tenant filter enforced in the query engine plus an app-level assert that every returned item's tenant matches the context. The security transcripts require exactly this and require a two-tenant retrieval test that stays red if isolation breaks. The index stores only references (memory item IDs) and vectors; the record itself stays in D1 as the source of truth. A retrieval hit is a candidate, never an authority.

Candidate primitive (named per the handoff instruction, decided at Level 3): Cloudflare Vectorize — Workers-native vector index, supports namespaces and metadata filtering, pairs with Workers AI embeddings. Alternatives considered: storing embeddings as JSON in D1 and computing similarity in the Worker (fine for tiny volumes, defeats the purpose at scale); an external vector database (adds a second platform, breaks the Cloudflare-first posture).

Open at Level 3: embedding model choice, index dimensions and metric, namespace-per-business vs metadata-filter-per-business, and whether situation-model embeddings are needed at all in v1 (structured retrieval may satisfy first needs — that is a Memory category evaluation, not a storage decision).

### The per-kind attribute table

| Data kind | Source of truth | Consistency | Read/write pattern | Retention | Tenant boundary | Indexing | Backup/recovery | Shape |
|---|---|---|---|---|---|---|---|---|
| Situation models, claims, waits, decisions | D1 situation_models (append-only versions) | Strong; CAS on version | Read: DO + conversation manager per wake; Write: both, via CAS | Hot 90d, warm 365d, cold R2 | Per-business D1 | situation_registry + PK (situation_id, version) | Time Travel + R2 export | Relational + document (model_json) |
| Conversations + messages (metadata) | D1 | Strong | Write: every message; Read: routing, reconstruction | Hot 1y, then archive | Per-business D1 | interactor_id, situation_ids, conversation_id | Time Travel + R2 export | Relational |
| Message content, attachments | R2 | Immutable | Write once; Read on reconstruction | Per compliance retention | R2 prefix per business | content_ref in D1 | R2 retention | Object |
| Config: grants, policies, channels, roles | D1 | Strong; versioned | Read: every action check; Write: configurator only | Life of business + audit | Per-business D1 | PK + role/channel lookups | Time Travel + R2 export | Relational |
| Learned knowledge | D1 knowledge_items | Strong; versioned, supersession | Write: memory observer (append/version); Read: context assembly per phase | Versioned; retirement not deletion | Per-business D1 | type/scope/status + semantic index | Time Travel + R2 export | Relational + document |
| Execution traces | R2 via Queue | Immutable batches | Write: every loop iteration (batched); Read: debugging, training | Hot 90d, then per policy | R2 prefix per business | trace_index in D1 (situation_id, run_id) | R2 retention | Object (JSON batches) |
| Audit records | R2 via Queue | Immutable | Write: on significant actions; Read: audit and review | 7 years (compliance) | R2 prefix per business | via analytics D1 if needed | R2 retention | Object |
| Training data (SFT, golden, preference pairs) | R2 | Immutable once validated | Write: pipeline; Read: optimizer runs | Forever | Cross-business (aggregated) | by date/type in object keys | R2 retention | Object |
| Analytics aggregates | Analytics D1 | Eventual (derived) | Write: event consumer; Read: dashboards, cross-business queries | Rebuildable from events | Global (cross-business by design) | per-metric tables | Replay event stream | Relational/analytical |
| Tenant registry | Analytics D1 | Strong | Write: onboarding; Read: routing (business name to D1 binding) | Life of platform | Global | business name/ID | Export; rebuildable from onboarding records | Relational |
| Cache (context slices, sessions, dashboards) | KV | Eventual; TTL | Write: per assembly; Read: hot path | TTL (minutes to hours) | Key prefix per business | key design | None needed (recomputable) | Key-value |
| DO ephemeral state and logs | DO SQLite | Strong within the DO | Write: during processing; Read: resume and debug | Life of active situation (+30d PITR) | One DO per situation | DO-internal | PITR; authoritative state is in D1 | Embedded SQL |

With this table, handoff item 10 (data architecture) is fully answered: every data kind has a storage shape, a primitive, and all eight requested attributes.

---

# Part 14 — Pre-architecture: How Event-Driven the Architecture Is, and the Prompt Constitution (item 13)

> This part closes the last open §4A item (13), worked in one session on 2026-09-05: (a) how event-driven Tend's architecture actually is, and what mechanics the event fabric needs; (b) the prompt constitution — what the model's standing text is, who owns each layer of it, and where the deterministic system overrides it. Swaraj opened the session with the study complete at Parts 1–13.

## 14.1 The session's corrections [HIGH ATTENTION]

Three corrections shaped this part; each is a standing rule.

### 14.1.1 Externals are inspiration — we are not building them

The first pass presented external products as a menu to "take or reject" and asked Swaraj to choose between them. His correction: "we are not making bodhi, we are making our own project x so this is not relevant just an inspiration." Research sources inform our own first-principles answers; they are never the framing of a decision. (This sharpens correction 2.11 for research conversations specifically.)

### 14.1.2 Plain language, no product-name shorthand

Mid-session: "don't give me product names... tell me what are the different concepts and ideas... this is absolutely belittling me in the sense that you are expecting me to be an expert and that's why I am using you to help me through it." Every explanation must stand alone in plain words — one sentence, one idea, terms explained the first time. This is the conversation constitution applied to research; recorded here because it changed how the whole session ran.

### 14.1.3 Step instructions belong to memory & knowledge, not the constitution

When the constitution layers were first drawn, the optimizer was described as optimizing "step instructions" as if they stood beside the constitution. Swaraj corrected: "step instructions are a responsibility of memory and knowledge not ecosystem constitution. The system constitution does not have step instructions." This moved the optimizer's entire scope: it edits memory-owned assembly text, never constitution text. See §14.4.

## 14.2 Event-driven: what was already ours, what this session added

### What was already decided (re-confirmed, not re-derived)

The knowledge base already ruled the direction (Level 1: Tend continues without a new prompt; Coordination: a situation is Running, Waiting/Blocked with a named reason and resume trigger, or its check-in wakes it; Time: every relevant moment is a trigger in the durable wait infrastructure; Part 11: the per-wake contract with honest rests; Part 13: the situation DO is triggered by situation-model version change, preemption via the DO's own queuing, CAS on the version). The session did not reopen any of it.

### The subscription clarification (Swaraj)

His raw words: "when our situation worker updates the situation model obviously it creates an event that is consumed by our conversation manager and to and fro so obviously we have a consumer that basically knows what situation model is waiting for which event to be completed so it's like a subscription consumer sort of a thing not a polling sort of a thing."

Made precise: the event fabric needs two address books, and both already exist in the knowledge base:

- **Situation → what it waits for**: the book of waits (the Coordination wait spine). Every waiting situation carries a named resume trigger. The book of waits IS the subscription registry — no separate subscription system should ever be built.
- **Event → which situation it belongs to**: the situation registry (interactor references, external refs) plus the conversation manager's routing step.

No component ever polls. Work moves because events are delivered to the components waiting for them. The only scheduled wake in the entire system is the per-wait check-in, which exists to make forgotten work impossible — not to substitute for delivery.

### Decision 1 — write and announce together

D1 (our shared database) does not broadcast changes: storage records, it does not publish. The rule that closes Part 13's open item ("the exact mechanism for triggering the DO when the situation model version changes"):

> Whoever updates the situation model emits the change-event in the same execution. An update whose event was not announced is an incomplete job and is retried.

The write and the announcement are one unit of work. Swaraj: "after updating the database... we will make sure that we have created an event in a queue and that... will be a part of the execution itself... otherwise you would consider that job itself as incomplete and we will retry."

### Decision 2 — the cache never guards a decision

Swaraj proposed caching business rules for speed, with invalidation on change ("every time reading the DB will be taxing so we will just cache it... when the business changes its rules it invalidates that cache... again no need of an event it's just invalidation of cache"). Accepted, with one hard line added:

> The cache may make reads faster; it may never decide, allow, or forbid anything. Anything that gates an action reads the authoritative store directly.

Two different jobs hide in "reading the business rules": **context reads** (understanding, expressing — a few seconds of staleness is harmless) and **enforcement** (the control layer's per-action authority check — a stale value there is a permission check answering from the wrong rulebook). Invalidation is therefore purely a speed concern, never a safety one.

### Decision 3 — rule changes need no event; reads go fresh

The session's one genuinely new thread: the business changing its own rules mid-flight (grant narrowed, policy changed, consent withdrawn) is not a wake class in the wait book. Swaraj's resolution: no rule-change events. Active situations read rules fresh at each wake anyway, and the per-action enforcement check is the hard gate — a situation acting on revoked authority is stopped honestly at its next action boundary (refusal + escalation, per the Authority category). What is given up is only earliness: the situation discovers the change at its next natural wake rather than being told immediately. Proactive reassessment ("on rule change, wake dependent situations and reassess now") is parked as a possible **per-business configuration**, not architecture.

### The failure math of the event fabric

- **Duplicate delivery is harmless**: the platform guarantees at-least-once delivery (never zero); the worker reads the situation version, sees it has already processed that version, and does nothing. The Part 13 dedup decision IS the duplicate defense.
- **A lost event heals itself**: the worst case of an exhausted publish retry is a late wake via the situation-level check-in, never a dead situation. The no-forgotten-work guarantee doubles as the safety net for the event fabric itself.

### Counter-patterns kept as cautions

- **Fixed-interval polling** ("ambient" by heartbeat): pays compute to discover nothing happened. In an event-shaped platform, code never runs to ask a question — it runs because something answered. Our check-in is per-wait with an escalation path, not a heartbeat.
- **Always-observing surveillance**: in our language a watch is a named record (wait-for-state-change) with a subject and resume trigger; the health observer emits observation events on the same fabric as everything else. Even the watcher is event-disciplined.

### Evidence notes (inspiration only, per 14.1.1)

- A durable-execution vendor's "ambient agents" write-up (schedules / signals / queries / durable tools): confirms the mechanics we already ruled; its fixed-interval polling nudge and its runtime self-rewriting of agent prompts are the two patterns we reject.
- A durable-steps platform's reliability write-up: independently reinvented our per-step contract (memoized steps, no silent failures). The strongest external confirmation in this session.
- An event-streaming vendor's agentic architecture reference: layer decomposition nearly identical to ours; its "agents detect, reason, and self-correct autonomously" framing is invalid against our accountability invariants (declared outcomes, visible escalation, business in control).
- Two "always-observing" products (an enterprise agent platform; a building-automation agent): no published wake/situation mechanics; the enterprise platform's shared "context graph" substrate is the shape ruled out by correction 2.11 (graph data, not graph structure).

## 14.3 The prompt constitution — Swaraj's opinion, made precise

His raw position, from experience: traditional instruction-style system messages will not work for Tend. Instructions are case-specific; the constitution is case-general — "principles... something that it can follow and apply to any number of cases and it will... solve the particular job given to him." He ruled out the thousand-line "constitution" prompts seen in the wild ("highly bloated system prompts with rules etc") — those are **rule-dumps in prose, a misplacement, not a style**: rules that belong in a database and validators got stuffed into text. And he gave the two-part example that fixes the boundary:

- "Refund period is seven days" → business configuration in the database; the refund tool reads it when it runs; the harness enforces it; no LLM is involved.
- "Speak to me in Hindi" → a behavior preference; the model must behave differently at the generating step; the memory and knowledge layer injects it at that step.

"So that is the synergy of a harness plus a model."

### The four-way separation

| Kind | What it is | Where it lives | Who enforces |
|---|---|---|---|
| Rule | a decided business fact/number ("refund = 7 days") | business configuration in the database | the tool/control layer, deterministically |
| Preference | a business choice about behavior ("speak Hindi") | business configuration; injected at the generating step by the memory loader | the model shapes it; a validator can verify it |
| Instruction | case-specific direction for one step ("output this bounded artifact, nothing else") | the step's assembly template (memory & knowledge) | the validator for that artifact |
| Constitution | case-general principle ("never guess; say what's missing") | fixed standing text, layered per stage | the model's own behavior; tested by golden scenarios incl. expected refusals |

### What the knowledge base already held

- **Compliance & Security's deterministic list** (what can never be left to the LLM) = the rule layer, already written. Carrying rules in text would imply the model could decide them.
- **Communication's may-propose / must-not-decide lists** = constitution text, already written, case-general by construction.
- **The TeleChat verification (11.4)** = the layered shape proven in code: per-step prompts plus per-step context slices, no master prompt anywhere.
- **The memory loader's job** ("loads them appropriately at each stage of the loop") = the injection mechanism for preferences — exactly the Hindi example.

### The four text layers and their owners

| Layer | What it is | Owner | Lifetime |
|---|---|---|---|
| Universal core | the invariants, true at every step and case: never guess; honest rests; uncertainty as states + reasons; may-propose/never-decide | humans, release-versioned | fixed per release |
| Stage constitution | per loop stage: the behavior of THIS stage and its positive alternatives (e.g. the decide stage reasons only from execution evidence) | humans, release-versioned | fixed per release |
| Runtime-injected preferences | business behavior config (language, tone) | business config; the memory loader places it at the generating step | runtime |
| Assembly templates | per-step artifact instructions, skill text, slice scaffolding | memory & knowledge | versioned like skills |

Each layer is short because everything deterministic has already left the text. That is the direct opposite of the thousand-line prompt — and also the opposite of "no system prompt at all": the constitution exists precisely so the model does not need a rule for every case.

### The writing discipline (evidence-grounded)

1. **Case-general principles only.** The test: it applies to cases it was never written for.
2. **Positive alternatives over prohibitions.** Production evidence: a prohibition loads the prohibited pattern into the model's working context ("attention pull") — "do NOT use X" makes X more salient at exactly the wrong moment. State the right behavior so well the wrong one loses its place. The safest instruction contains only the concepts the model needs.
3. **Short per stage.** Documented degradation mechanics for long standing prompts: mid-context information is underweighted ("lost in the middle"); instructions interfere ("be concise" near "explain fully" resolves differently per input — bloated agents behave inconsistently); every standing token is paid on every call.
4. **Rules never enter text.** If it can be checked by code, it is code.

One refinement from the evidence, adopted: **principles still need step-scoping.** "Never guess" is universal; "reason only from the execution evidence in front of you" is a stage principle and would be interference at other stages. Hence the stage-constitution layer rather than one flat text.

Note that even the Hindi preference has a harness half: a validator can mechanically check the draft's language before it is sent. The model shapes the behavior; the validator verifies it. (Exact validator placement: Level 3.)

## 14.4 The optimizer boundary

The GEPA/DSPy question Swaraj raised — "will prompt optimization create a system constitution or a system instruction... can we give the optimizer how to create prompts so it does not mess up... what exactly creates a prompt, is it an LLM?" — answered from the mechanics already verified in Parts 9 and 12.6:

- **What creates the prompt:** an ordinary LLM — the optimizer's own model, which can be a different, cheaper one. It reads execution traces plus the deterministic validators' failure feedback, reflects on why candidates failed, writes new candidate text, and candidates are tested against golden scenarios with winners kept on a frontier. There is no separate NLP technology. It is our own discipline applied to text: **a model proposes text; deterministic evaluation decides.**
- **Its scope (corrected per 14.1.3):** memory-owned assembly text only — the per-stage templates, artifact instructions, skill text. The constitution is permanently human territory: a principle that needs rewriting means we misunderstood the behavior, not that the words need polishing. The optimizer also cannot fix wrong context-slicing decisions, wrong validators, or wrong stage design — those are code and human design.
- **The gates:** deterministic validator verdicts + golden scenarios (including the expected-refusal cases) + PR review. Style constraints (case-general only, positive alternatives, no procedures for what validators enforce) can be supplied to the reflection step itself.
- **Adoption:** per-predictor, deferred until production traces exist — there is nothing to optimize before traces. If GEPA, scoped and styled, still cannot respect the discipline for a predictor (most likely P4, communication content), drop it for that predictor. The product does not change; only the improvement tooling does.

Swaraj's closing position, recorded: "yes, it's fine" — optimizer as a someday-tool for the memory layer's text, constitution as permanently human territory.

## 14.5 What remains open

- **Constitution versioning/testing wiring**: mostly exists (golden scenarios incl. expected refusals — Part 12.5; replay assertions; the five-moment audit framework). Remaining: the concrete release/rollback flow for constitution text. Parked, Level 3-adjacent.
- **"Wake on rule change" as per-business configuration**: parked, not designed. If a business ever wants proactive reassessment on rule change, it is configuration on top of the event fabric, not new architecture.
- **Preference validator placement** (language/tone checks at the communication layer): Level 3.
- **Assembly-template formats per stage**: already parked to Level 3 (10.2.4).

## 14.6 What this closes

§4A item 13 is done. With it, the entire original breadth-first research scope is closed except the two major pillars that already have dedicated handoffs (product design & user interaction; software factory with coding agents). The Level 1 file's "Research needed before Architecture" reservation is discharged — **the Architecture category is unblocked** and is the natural next Level 2 work.
