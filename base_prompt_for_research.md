# BASE PROMPT FOR RESEARCH — Tend Harness, Loop, and Small-Model Study

> **This is the base prompt for research.** It carries the complete state of the harness/loop/fine-tuning study into every fresh chat Swaraj spins up for a dedicated research angle. It is NOT a handoff — Swaraj writes his own handoffs manually for each dedicated research angle. This file is the standing base context: read this whole file first, then read `conversation with swaraj.md` (the constitution — how we talk), then begin the specific task Swaraj gives. Do not make Swaraj repeat himself. Do not write files without explicit permission.

---

## 0. HOW TO USE THIS FILE (read this before anything else)

1. This file is **the memory of the study**. It exists because Swaraj has already forgotten what is written here — that is why the knowledge base exists. Treat it as an external record, not as something living in your head.
2. In a fresh chat, the standing order is:
   - First: read this file end to end.
   - Then: read `conversation with swaraj.md` — the constitution that governs how we work. Non-negotiable.
   - Then: read `status_quo.md` and the knowledge-base categories it points to, if the chat is about a Level 2 category.
   - Then: begin the task **as reasoning in conversation** — not by writing files.
3. **Never write files without Swaraj's explicit permission.** This rule was violated twice early in the study; Swaraj was explicit and angry both times. `file_writing_instruction.md` governs when writing is allowed.
4. Every section that records a **Swaraj correction** is marked `[HIGH ATTENTION]`. These are moments where the study direction was wrong and got corrected. Read each as a standing rule, not as history.
5. "Do not jump to solutions" is the meta-rule of this entire study. Level 1 (problem framing) → Level 2 (concepts) → Level 3 (technology). Framework in `knowledge_base/three_level_framework/3_level_framework.md`.

---

## 1. THE CONVERSATION AT A GLANCE

**Subject:** Tend (Project-X) is an AI-driven business agency layer — it carries a business's communication and operational responsibility across people, systems, channels, time, and other agents. It is driven by language models inside a *harness* (the deterministic software around the models). The study's goal: how to build that harness and its loops correctly, and how to move from frontier models to fine-tuned small models (3B–7B) using data from production traces.

**What happened across the sessions, in order:**

1. **Session 1 (research scope):** Swaraj asked to research, in depth, the latest harnesses, product development, fine-tuning, and how people get amazing results from 3B-parameter models. Started by mapping the knowledge base and defining primitives.
2. **Wrong turn:** I proposed a premature solution — loop decomposition with "strategic loops," "conversation manager loop," "situation agent loop" — before defining the problem. **Swaraj rejected it**: "This is not the way you will ever do things with me." Start at Level 1 — problem framing — not solutions.
3. **Second wrong turn:** I wrote two knowledge-base research files without permission. **Swaraj was angry** — "do not fucking write any documents... just tell me everything in chat."
4. **Third wrong turn:** I focused only on the GitHub repos in `Things to look at/` and ignored the eight research papers beside them. **Swaraj called this out** — "this is frankly disgusting."
5. **Recovery:** Read all eight papers. Built Level 1 problem framing (in conversation). Read the Memory & Knowledge, Communication, and Explainability & Observation Level 2 categories when asked.
6. **Persisted study (with permission):** Swaraj explicitly asked me to write `knowledge_base/agent_harness_study.md` — every repo, every paper, align/invalid, diagrams.
7. **Loop drafting:** Drafted the conversation-manager loop. Swaraj corrected and enriched it: the conversation manager is **two parts** — the NLM understanding agent that writes the first situation model (with templates + automated metadata), and the **communication layer** (grounded in the Communication category).
8. **Model problem:** Swaraj clarified the frontier → fine-tuned small-model path, why small models (7B Gemma) are the target, why fine-tuning is needed (3+5=10: deterministic but confidently wrong), what data to collect, and how to align the internal thought process.
9. **Prompt optimization:** Swaraj installed TinyFish (web search/fetch CLI) and pointed at DSPy + GEPA and the `hermes-agent-self-evolution` repo. Researched DSPy state, the optimizer zoo, GEPA deeply.
10. **Now:** The study file holds Parts 1–9. **Next step is the memory section** (grounded in the Memory & Knowledge category already read). The framing fork is open (Section 14).
11. **Memory session (done):** Studied Utopia from code + 18 decision records; re-verified supermemory (engine still closed source). Swaraj corrected a false fork I invented (situations-in-shared-ledger vs separate-layer — the knowledge base already answers it: graph data, not graph structure; situations link later as discovered). Swaraj RULED the Section 11 fork: memory is an **independent component with its own loop** (software engineering framing, not AI engineering). New standing rules: no model-generated numbers in control paths; provisional items parked to Level 3. Part 10 written into the study file. **Next step is the situation-worker loop.**

---
## 2. SWARAJ'S CORRECTIONS (HIGH ATTENTION)

### 2.1 The meta-correction: no solutions before the problem is defined

Swaraj's words:

> "Okay, let's not get ahead of ourselves. Okay, let's not directly propose decomposition V1 strategic loops, conversation manager loops, situation agent loops. That's why I propose solutions... Let's not start and propose proposing solutions at this point... This is also software engineering problem design let us first find out the problem statement... We are trying to do more than any of the particular agents that I have mentioned... They are trying to solve a much better bigger problem that we need to first understand... You are skipping the three-level framework that we have... Let's just apply the level one at this particular part. This is not the way we do things, this is not the way you will ever do things with me."

**Standing rule:** Start from the problem. Who is involved, what responsibilities exist, what constraints define it. Use the three-level framework. Technology is intentionally ignored at Level 1. "Every decision made in a lower level must be justified by decisions made in the level above it."

### 2.2 No writing files without permission

Swaraj's words:

> "Why if I gave you the instructions not to write something in conversation with Swaraj.md, why the fuck are you writing something without my permission? Just tell me everything in chat."

**Standing rule:** During conversation (understanding/exploration/brainstorming), do not create files, modify files, or turn discussion into implementation. Swaraj decides when a discussion has reached the point where an artifact should be created. The only exceptions so far where Swaraj explicitly asked: the `agent_harness_study.md` file, and this handoff file.

### 2.3 Read the code, not the README

Swaraj's words:

> "Do not just rely on the readme.md. Readme.md is not the thing. When I say you have to reverse engineer a GitHub repo, it means you have to read the code, find out how the loops are done. When you want to see the harness, you have to read the code and find out how the harness is built. Readme.md is not your thing. Is that why you are here? I cannot just read readme.md myself."

**Standing rule:** Reverse-engineering means reading code. The loop is in the code. The harness is in the code. Docs describe intent; code is truth. The `hermes-agent-self-evolution` library and `supermemory` were both studied by reading their source this way.

### 2.4 All research material must be read

Swaraj's words:

> "We have only focused on the GitHub repos. I mean, this is frankly disgusting... There's a research paper called JIT compiler. There are other research papers... we haven't even touched [them]."

**Standing rule:** The `Things to look at/` folder contains papers AND repos AND skills. Everything is material. Do not cherry-pick.

### 2.5 Ground in the knowledge base — always

Swaraj's words (when I proposed a memory design without reading the category):

> "This is incorrect. Not in sense of your research was incorrect but you do not ground it in memory and knowledge section of our level 2 with the knowledge base. Go to the knowledge base folder, there's a level 2 folder. In that there is a folder called memory and knowledge. Read all the files there."

**Standing rule:** Before proposing any design, read the relevant Level 2 category files in full. The knowledge base already holds the answers to most questions; re-inventing around it is waste and error.

### 2.6 The loops-within-loops correction

Swaraj's words:

> "If you see the [Kirana] telechat... there is nothing like we can only check the artifact of an LLM, not the reasoning... The thing is, you are skipping the three-level framework... if you see our primary loop, each and every part of the loop in itself is a loop... So when you talk about tend's primary loop, let's talk about tend's capabilities, and in that, we have multiple loops that address each capability properly... The job of an LLM [is] to figure out the interaction between multiple independent components based on if it is dynamic. If it is fixed, then it will just be a simple pre-made code-based workflow."

**Standing rule:**
- Every component has its own custom-tailored loop. No generic loop.
- An LLM is used for exactly **two** things: (a) figuring out the interaction between components when that interaction is **dynamic**, and (b) **generating something**. If the interaction is fixed, it is a pre-made code workflow — no LLM needed.
- Hermes, Herdr, Pi are "more of a ReAct agent itself with more of their harness evolved" — the loop itself is the same ReAct loop; the harness differs. The study's job is mapping each evolved harness's strengths onto Tend's sub-capabilities.

### 2.7 The artifact-not-chat correction

Swaraj's words:

> "If you have ever used a chat application, what a user does is he creates multiple chats, and each chat handles something. What we are doing is we are just removing the chat bar altogether... there is just one single chat agent, and it will handle that multiple chats for you, multiple processes for you, and this is a part of design, but I am telling you, we will have a more artifact-based interaction rather than a chat-based interaction. Chat will still be the main entry point of the interaction, but we will surface artifacts."

**Standing rule:** The conversation manager is a single entry point that concurrently serves many situations/processes. It must never thread-lock on one situation. The business's primary view is artifacts (active situations, waits, evidence, decisions, outcomes); chat is the entry point for searching, inspecting, instructing.

### 2.8 The model-transition correction (small models + thought-process alignment)

Swaraj's words:

> "Let's say I am asking it the answer of 3 plus 5, and it is deterministically giving me the same answer called 10. So it is deterministic, but it is inherently incorrect because LLM itself is incapable of doing this. So we also need to fine-tune our LLM for our product dynamics... but how does the LLM fit into our system? We have to do that via fine-tuning... I think there are research papers on that also... we need small models, 7 billion parameters... All we need is for it to understand what it is trying to do, right? Once that is done, it is just all the business learning, everything, the scale-based memory and knowledge, everything will be done. But first, we need to understand that how the LLM should behave its product knowledge."

**Standing rule:** 
- Frontier model first to engineer the loops and make it work.
- Collect data from production traces, then shift to a fine-tuned small model (Gemma-class 7B) so it "thinks as I am thinking in my product" — internalizes Tend's thought process, not the business.
- Business learning happens via **skills and memory at runtime**, never in the weights. The weights carry only how to operate inside this product.

### 2.9 The communication-layer correction

Swaraj's words:

> "Conversation manager is two part, one is NLM based agent, second is the communication part... communication is one thing that you did not handle here. So in the knowledge base there's a folder called communication... look at all the questions that we have answered and find out which question might be a relevant question for this loop and go and read all the files there."

**Standing rule:** The conversation manager has two parts — (a) the understanding agent that writes the first situation model (with templates + automated metadata), and (b) the communication layer governed by the Communication category files (when to communicate/wait, ask-vs-act, explanation depth per viewer, uncertainty, conflicts).

### 2.10 The ablation-related correction: small-model error classes

Swaraj's words (on why fine-tuning data must target product behavior):

> "We need small models... They have a good level of intelligence. All we need is for it to understand what it is trying to do... then it is just all the business learning, everything, the scale-based memory and knowledge."

**Standing rule:** Verified by SKILL.state's paper: small-model failures are mostly adherence-class (state overwrite 68%, schema 20%, syntax 12%) — not reasoning. So deterministic validators + targeted fine-tunes on adherence, not "buy a bigger model."

### 2.11 The false-fork correction: graph data, not graph structure [HIGH ATTENTION]

Swaraj's words (after I proposed a "situations in shared claim substrate vs separate layer" fork and leaned on Utopia's model):

> "we just want to know what utopia did and maybe take inspiration, we do not want to use utopia if it does not meet us... our answers were much well thought off and completely different use case built from first principles thinking for our product, not a general thing, whereas utopia wants to build something general... situation models are not fixed, but situation models can be linked later as we discover multiple situations, because unlike documents the conversations are dynamic and free flowing. also the graph query is something we can totally avoid as we can ourselves have very product specific relationships we can just figure out in the code... at the end of it what i remember what we have is graph data and not a graph structure."

**Standing rules:**
- Research sources are inspiration only; the knowledge base's first-principles answers outrank them. Re-read the relevant category IN FULL before proposing anything (strengthens 2.5).
- Situation models are dynamic: attach/create/split/merge/link/unlink/re-route are first-class; links are discovered later, on signals, by operational context (never identity).
- Graph-shaped DATA, not graph STRUCTURE: no graph storage, no graph query engine, no ontology; product-specific relationships live in code.

### 2.12 The memory-component and no-thresholds rulings [HIGH ATTENTION]

Swaraj's words:

> "other systems keep memory data operations as part of the same loop, but we have fundamentally approached the problem as a software engineering problem and not an AI engineering problem... the responsibilities of memory create one unique and independent capability, so then we need memory as another independent component which interacts with other components of the agent to make one core agent capability, and the LLM is responsible to figure the interaction out."

> "i do not think thresholds and numbers work well enough in production, especially the way to generate them is LLM or any other ML/DL model working on the natural language etc generated by an LLM. we will do away with it."

**Standing rules:**
- Memory is its own component with its own loop (the Section 11 fork is RULED — my earlier "mostly data operations" reading was overruled). LLM handles dynamic interactions and generation; fixed interactions are code.
- **No model-generated numbers in control paths** (no embedding-cosine, no confidence floats deciding attachment/supersession/ranking/activation). States and structured matches decide; hard signal → act, soft signal → ask/hold, uncertain → unresolved. Event counts (discrete, reproducible) are the only admissible numbers.
- Provisional Level 2 items (context-projection format, claim-family identity rules, acknowledgment policy) are parked as Level 3 implementation discussions.
## 3. THE PURPOSE OF THIS STUDY (why we are doing this)

Swaraj's original request (Session 1):

> "We need to research in depth about the latest harness, product development, fine-tuning, how are people getting amazing results from 3b parameter models, etc... we figure out the journey, the graph of research, what happened before, what has happened after the research for the research paper, new paper for fine-tuning, our fine-tuning purpose is different, given in the knowledge base, etc. First we need our research scope and primitives, why are we doing the research."

**The purpose, restated in plain words:**

1. Tend is a business agency layer driven by language models inside a harness. The study exists to learn how to build that harness and its loops well.
2. It researches: latest agent harnesses, product development practice, fine-tuning, and how people get amazing results from small (3B–7B) models.
3. It connects research to our specific fine-tuning purpose — which is DIFFERENT from generic fine-tuning (recorded in the knowledge base): we fine-tune the model to internalize Tend's product dynamics and thought process, not the business. Business knowledge lives in skills and memory at runtime.
4. It produces the primitives and scope for the whole effort: what to research, in what order, against what problem.

**The research method (how we work, per the corrections):**
- Start from the problem (Level 1), not solutions.
- Reverse-engineer code, not READMEs.
- Read ALL material (repos AND papers AND products).
- Judge each source against Tend's goal: what is aligned, what is invalid for us.
- Build the "journey/graph of research" — what came before, what came after, where each paper sits.
- Ground everything in the knowledge base's recorded Level 2 decisions.

## 4. THE THREE-LEVEL FRAMEWORK (the methodology, non-negotiable)

From `knowledge_base/three_level_framework/3_level_framework.md`:

- **Level 1 — Problem Framing.** Understand the business problem completely before discussing architecture. What problem exists, who is involved, what responsibilities, what constraints. Technology/infrastructure/implementation intentionally ignored. Output: problem framing + Level 1 questions that become the Level 2 agenda.
- **Level 2 — System Design (concepts, not tech).** Transform the problem into a logical architecture: what responsibilities naturally belong together, how the system should be organized. Technology still ignored. Subsystems are discovered, not invented. Output: logical architecture (Conversation Management, Knowledge Management, Decision Engine, etc.).
- **Level 3 — Technical Design.** Choose technologies that implement the architecture. Technology must never create responsibilities; it only implements existing ones.

**The relationship:** Business → Architecture → Technology. Never move upward. Technology must never define architecture; architecture must never redefine the business problem. Every decision in a lower level is justified by the level above it.

**For this study specifically:** the loops and harness are Level 2 concepts. The model stack, TinyFish, DSPy, Cloudflare, queues, vector stores are Level 3. The study file (Parts 1–9) is mostly Level 1/2 evidence and concept; technology choices stay open.

## 4A. THE FULL RESEARCH SCOPE & PRIMITIVES (restored from the first session)

> This block restores the breadth-first research plan we built at the very start of the study (in the first session, before any reverse engineering). Every dedicated research chat must be positioned against this scope: which of these topics it is serving, and how it advances the map. Sections 6–15 of this file are the progress so far against this scope.

### The core primitives (every paper, product, and experiment must be described in these terms)

**Product primitives:**
- **Situation** — one real business problem being worked on.
- **Ask** — one distinct thing that needs to be answered or acted upon.
- **Behaviour** — Tend's next intended step: gather, ask, wait, communicate, invoke a capability, create human work, escalate, resolve, or stop safely.
- **Capability** — a purposeful action exposed by a system or person.
- **Actor/source** — the person or system that owns information, action, or responsibility.
- **Evidence/claim** — what Tend believes, where it came from, and how current it is.
- **Policy/authority** — rules and permissions that the model cannot redefine.
- **Outcome** — what happened to the situation and whether each ask reached an honest ending.

**Agent primitives:**
- **Model** — the probabilistic component that proposes interpretations or behaviours.
- **Harness** — the external system that gives the model state and tools and controls what happens.
- **Context projection** — the exact information shown to the model for one decision.
- **Memory** — durable, scoped operational guidance derived from experience.
- **Trace/trajectory** — the complete record of one run.
- **Failure mode** — the specific type of mistake (wrong source, wrong tool, invalid argument, missed ask).
- **Verifier/evaluator** — the mechanism that checks whether behaviour was correct.
- **Intervention** — a change to prompt, context, harness, data, model weights, adapter, or routing.
- **Variant** — a particular combination of model, prompt, harness, memory, tools, adapter.
- **Release** — a versioned variant deployed to users.

**Research-evidence primitives** (reduce every source to): claim; task and environment; base model and size; harness components; training data and method; baseline; ablations; evaluation metrics; code/checkpoint/reproducibility; limitations; relevance to Tend; disposition. Each source is then classified: **adopt as a principle / test experimentally / useful inspiration / relevant but incompatible / unverified / reject.**

### Separate the five meanings of "harness"

| Type | What it does |
|---|---|
| Runtime harness | Gives the model context, memory, tools, state, execution, verification, recovery, and stopping behaviour |
| Evaluation harness | Runs repeatable tasks and trajectories, then scores them |
| Improvement harness | Converts traces and failures into corrections, datasets, fine-tunes, adapters, and new variants |
| Operations harness | Monitoring, drift detection, rollout, canaries, rollback, production observation |
| Tend harness | The complete product made from all of the above |

A paper about an evaluation harness is NOT evidence about runtime intelligence. A paper about automated prompt editing is NOT automatically evidence for safe self-improvement.

### The original research scope (the nine sections)

**1. Define Tend's workload.** Situation and ask understanding; message routing; ambiguity detection; source selection; information gathering; tool selection; tool-argument construction; conflict handling; next-behaviour selection; waiting and follow-up; human handoff; communication; failure recovery; explanation and trace production. → produces the task and failure taxonomy.

**2. Runtime harness design.** How different harnesses improve model behaviour: ReAct loops; state machines; explicit mutable execution state; event-driven agents; planners and executors; tool filtering; capability registries; verifiers; retries and recovery; subagents; persistent workspaces; memory systems; model routing; adaptive/self-evolving harnesses. Question is not which pattern is fashionable but which supports Tend's situation model and swarm.

**3. Prompt and context engineering.** System-instruction structure; role and responsibility boundaries; dynamic context assembly; tool descriptions and schemas; structured output protocols; instruction hierarchy; failure and refusal instructions; prompt versioning; context compression; explicit state vs transcript history; and how small models respond to each.

**4. Memory and operational learning.** Working memory; episodic experience; semantic business knowledge; procedural lessons; failure memory; skills; just-in-time retrieval; memory consolidation; supersession; scoped memory. Key Tend question: *what should be retrieved for the current situation, and what should instead become a model or harness improvement?*

**5. Fine-tuning and weight adaptation.** Fine-tuning target is NOT generic conversational fluency. Candidate targets: interpreting local business language; identifying the correct situation; recognising all asks; choosing the right source; selecting the right capability; constructing valid arguments; asking useful clarifying questions; recognising failure; choosing when to wait or escalate; communicating clearly. Must stay OUTSIDE the model: current business facts; source-of-truth status; permissions; authority; approvals; legal and channel rules; tenant isolation; irreversible-action boundaries; operational state transitions. Methods to compare: SFT; preference optimisation; DPO/KTO-style; verifier-based RL; distillation; rejection sampling; LoRA and QLoRA; adapter composition; adapter routing; continual learning; rollback/versioning.

**6. Data and feedback.** How successful systems create training data from: production traces; human corrections; tool results; validation failures; customer outcomes; replay; synthetic trajectories; hard negatives; near-misses; paired successful/failed runs. Which signals are trustworthy — "the tool call completed" is useful but does NOT prove Tend answered the customer's actual ask.

**7. Evaluation and attribution.** Evaluation levels: model response; tool call; single interaction; complete trajectory; situation completion; business outcome; safety and policy compliance; cost and latency; human workload; regression and drift. Tools: deterministic checks; trajectory-level checks; calibrated model judges; human-labelled samples; replay; golden situations; provider-hull monitoring; harness-hull monitoring; ablations. Baseline ladder:

```text
Base model
→ + prompt
→ + tools
→ + harness
→ + memory
→ + fine-tuning
→ + routing
```

Without this ladder we cannot know where the gain came from.

**8. Product-development lifecycle.** Problem definition → baseline prototype → trace collection → failure diagnosis → harness or data change → offline evaluation → shadow deployment → canary release → production monitoring → rollback or promotion. Includes annotation operations, release gates, model updates, prompt changes, adapter deployment, regression handling, cost control.

**9. Historical and research lineage.** For every important paper/product: earlier problem → proposed method → paper or prototype → implementation → measured result → ablation → criticism or failure → follow-up work → current practice → relevance to Tend. A paper is not an isolated truth.

### Additional threads from Swaraj's first message (beyond the nine)

**10. Database / storage handling.** Classify the data kinds first: situation models; business state; waiting and scheduling records; audit records; analytical data; logs and telemetry; search indexes; vector data; files and generated artifacts; cache data. For each: source of truth; consistency requirement; read/write pattern; retention; tenant boundary; indexing; backup and recovery; shape (relational / document / key-value / object / analytical / vector). "PostgreSQL versus Cloudflare" is the WRONG first question — Cloudflare is a platform of storage/execution primitives, not one database; decide which primitive fits each kind of data.

**11. Time.** Immediate execution; durable waiting; scheduled work; deadlines; timeouts; retry windows; human-response periods; expired information; stale workers; wake-up events; interrupted and resumed work.

**12. Concurrency.** What happens when several things happen at once — collision handling, locking, lost updates.

**13. Level 1's reserved pre-architecture threads** (from `Level1_Problem_Framing_or_Expansion.md`): (a) event-driven agency, memory, and agent-behaviour research — Hermes, Supermemory, Bodhi.ai and similar products, event-driven systems that react without a user in chat, artifact-oriented products; (b) prompt engineering — where the agent's constitution lives, what it is allowed to do, where the deterministic system overrides it. — **DONE (2026-09-05)**: study Part 14 + `Level 2/prompt_constitution/` + notes in `coordination/` and `time/`.

**14. Product design and user interaction (a major research pillar — added later, untouched).** How the product is DESIGNED, not just engineered. Chat is only one interface; we cannot give every interactor a chat box. Business users, owners, employees, partners need to SEE across multiple situation models and journeys through artifacts. Research covers: artifact-first visualization (situation views, journey views, wait states, drill-down, owner dashboards); per-role surfaces; the design language (colors, fonts, interaction); the landing page and setup/onboarding; the design ideation loop (brainstorm → prototype → analyze → expert critique → iterate); and an anti-"AI-slop" design blacklist (hash gradients, sparkle icons, fake testimonials, neon gradients, rainbow colors, heavy drop shadows, no privacy policy, etc.). See the full detail section below.

**15. Software factory with coding agents (a major research pillar — added later, untouched).** How we build all of Tend using coding agents. The agent's job is TRANSLATION of a natural-language implementation plan into code — not autonomous software engineering. The hard problem is REVIEW, not planning: how to review large volumes of code in languages Swaraj may not be fluent in; how to guarantee agent-written tests are exactly the plan's test cases and the agent isn't cheating (weakened assertions, mocked-away behavior, fake passes); how to test end-to-end without fluency; how to review code slowly-but-really with basic intuition; how to structure the codebase as independent deep modules / sub-modules (each owning its code, tests, and documentation); best practices for implementation, deployment, and operation on Cloudflare. See the full detail section below.

### Progress status against this scope

- **DONE (evidence gathered):** runtime harness design (2) via repos+papers; prompt/context engineering (3) via DSPy/GEPA; memory & operational learning (4) via Part 10; fine-tuning data/methods (5–6) via Part 12 §12.7; evaluation and attribution (7) via Part 12 §12.9; research lineage (9) via Part 12 §12.10; internet-products column (Part 12 §12.3).
- **DONE (Level 2 decided):** time (11) via the `time/` category; concurrency-adjacent bookkeeping via the `coordination/` category; **data architecture (10) + concurrency (12) via study Part 13** (2026-09-05) — hybrid D1/R2/DO-SQLite/KV/Queues storage map, Conversation Manager (per-business Worker) + Situation Worker (per-situation DO) compute architecture, conversations-vs-situations separation, situation model as the shared coordination point, CAS on the situation version, the six concurrency mechanics, backup/recovery per store, semantic-index placement, and the per-kind attribute table.
- **HANDED OFF (dedicated research chats):** product design & user interaction (14) → `handoff_product_design_and_user_interaction.md`; software factory with coding agents (15) → `handoff_software_factory_with_coding_agents.md`; pre-architecture threads (13) → `handoff_prearchitecture_research.md` (**DONE 2026-09-05 via study Part 14**).
- **Engineering study file (`agent_harness_study.md`) stands at Parts 1–14.** Part 13 = data architecture & compute (items 10 + 12 closed). Part 14 = pre-architecture (item 13 closed): the event fabric decisions (wait book = subscription registry; write-and-announce-together; the cache never guards a decision; rule changes need no event) and the prompt constitution (four text layers with owners; deterministic rules never enter text; writing discipline; optimizer edits memory-owned assembly text only).

## 5. THE STUDY FILE — `knowledge_base/agent_harness_study.md`

This is the persisted, permission-granted consolidation of the entire study. Read it in a fresh chat as the live source of truth. It has grown Part by Part. Current structure:

- **Part 1 — The GitHub Repositories (5):** Hermes, Pi, Herdr, TeleChat, Supermemory — each with what it is, what it's solving, an ASCII diagram from the code, the fossil record of problems its guards prove, what aligns with Tend, what is invalid for us.
- **Part 2 — The Research Papers (8):** JIT-Agent, SKILL.state, Automata, AutoSaddler, EvoHarness-RL, Prime Agent, SLM-edge, Agent Seer — same four-question treatment.
- **Part 3 — What All of It Says Together:** eight cross-cutting findings, each with sources.
- **Part 4 — What Tend Is Trying to Do Differently:** six deltas.
- **Part 5 — Decisions This Study Feeds:** numbered, cross-referenced to the knowledge base.
- **Part 6 — The Conversation-Manager Loop** (first draft, grounded in the Communication category).
- **Part 7 — Where the System Goes Wrong** (Observability & Explainability: five anomaly classes, two hulls).
- **Part 8 — How We Find, Fix, and Improve** (improvement surfaces, self-evolution library, AutoSaddler, Automata, language call, unified architecture).
- **Part 9 — The Prompt-Optimization Landscape** (DSPy current state, optimizer zoo, GEPA in depth).

### 5.1 The eight cross-cutting findings (Part 3), condensed

1. **State-first execution beats transcript growth** — three independent confirmations (SKILL.state structured-state 0.94 vs truncation 0.18 / compression 0.22 / summarization 0.52 at equal budgets; EvoHarness BPE; our own Level 1 artifacts-not-chats). The situation model is the execution substrate, not a memory bolt-on.
2. **The per-step contract repeats everywhere:** (P constitution, Σ state, O observation) → (reasoning, patch, action) → deterministic validation → apply → discard reasoning. Every loop should be an instance of this contract.
3. **The harness, not the model, shapes agent behavior** (Automata: same FSM fits four models; JIT-Agent, AutoSaddler built on it).
4. **Verify artifacts, never reasoning** — no runtime LLM-critique of reasoning; reasoning quality fixed offline from traces.
5. **Traces are the metabolism of improvement** — one trace stream feeds harness patches (AutoSaddler), model adapters (flywheel), and behavioral monitoring (Automata). Trace format is a training-data contract, not an observability detail.
6. **Small models fail at adherence, not reasoning** (SKILL.state taxonomy) → deterministic validators + targeted fine-tunes, never bigger models first.
7. **The frontier→small transition has a proven recipe:** teacher-generated protocol-compliant examples → SFT → preference/RL on cost-aware signals → repair from failures. All consume verified traces.
8. **Nobody solves Tend's problem** — every studied system is request/session-scoped; Tend's situations outlive requests.

### 5.2 The six deltas (Part 4) — what Tend does that none of the sources do

1. Unit of work is a **situation** (one storyline, many asks, many people, lives across days, interrupted/waiting/resumed, honest endings), not a task/request.
2. Events arrive from many directions *while work is in flight* — no lock on the conversation surface; concurrent situations per human; versioned shared state serializes collisions.
3. Business policy and authority are runtime constraints on every action — the model proposes, deterministic code authorizes against the business's own configured rules.
4. Memory is **seven typed things** with an ownership boundary.
5. The model layer is a **replaceable curriculum** — frontier first, training-grade traces, per-deficit small adapters, strategic components last; acceptable-learning boundary keeps policy/authority out of weights.
6. The business sees **artifacts, not chats**.

## SECTION MAP — what Swaraj asked the study file to contain

"explain the architecture of each and every GitHub repo, each and everything, and that what we are trying to solve, what part of it is invalid for us, what part of it is aligned to us, what we are trying to do, and everything. Architecture with visual diagrams are good."

That is exactly what Part 1 and Part 2 deliver.

## 6. THE FIVE REPOSITORIES — WHERE THEY LIVE AND KEY TAKEAWAYS

All are in `/home/swarajbari/Projects/Project-X/Things to look at/` except TeleChat (`/home/swarajbari/Projects/Kirana-Management-TeleChat`).

- **Hermes** (`hermes-agent/`, Python) — production-hardened coding agent. Key code: `agent/conversation_loop.py` (~8,800 lines). Fossil record of hard-won failures: per-turn state leakage; auth-refresh spinning; response loss at verification gates; outer-loop error storms; context overflow (3 sites); truncated tool calls; empty tool-call structures; content-policy/billing refusals. **Aligned:** persist tool-call intent BEFORE the side effect; the guardrail taxonomy (repeat, no-progress, invalid args); context selection separate from compression; bounded provider retries; exit-reason diagnostics. **Invalid:** request scope; silent self-repair (we fail closed); no authority/business truth.
- **Pi** (`pi/packages/agent`, TypeScript) — clean minimal loop. `agent-loop.ts`. Key lesson: even the minimal loop distrusts the model — tool errors are DATA not exceptions; args validated before execution; hooks before/after; null-content normalization; role contracts enforced by code.
- **Herdr** (`herdr/`, Rust) — supervision, not reasoning. `AgentState {Idle, Working, Blocked, Unknown}` inferred from outside via pattern-matching. **Aligned:** worker-lifecycle vocabulary (running/blocked/waiting/resumed); supervision separate from reasoning; reattachment. **Invalid:** Tend's agents self-report state into traces (no guessing); no business concept.
- **TeleChat** (`Kirana-Management-TeleChat/`, TypeScript, Cloudflare) — Swaraj's own prior project; closest relative. `system_Architecture.md` (9,780 lines) + code. Three engineering disciplines: context, harness, loop. Global Orchestrator is a code-owned harness (REASON→VERIFY→EXECUTE→DECIDE→RESPOND), bounded rounds, fail-closed, every transition traced, reasoning trace-only. Known defect: three verification layers, none asks "did we answer the human". Doc-vs-code gap: Reference/Clarification Managers documented but absent from code. **Aligned:** classify→verify→resolve→clarify; harness-retry vs strategic-replan never conflated; per-step minimal constitutional prompts; conversation state separate from agent state. **Invalid:** one message = one run; no waiting/time/multi-actor/parallel situations; intent leaked into planner.
- **Supermemory** (`supermemory/`, closed engine + repo) — memory engine, studied via API surface + docs. Two layers (chunks=grounding, memories=facts in graph); profiles; dreaming (async batched learning); updates/extends/derives; container-tag isolation. **Aligned:** two layers; updates-win-history-isLatest; profile pattern; async learning; hard-wall isolation; memory types. **Invalid (we're stricter):** their model establishes identity/supersession (we: LLM proposes, system reconciles); one graph of truth (we split descriptive/normative); their forgetting deletes (we retire); closed engine + tenant-data; unit is fact not situation.

## 7. THE EIGHT PAPERS — WHERE THEY ARE AND KEY TAKEAWAYS

All PDFs are in `Things to look at/` and were already converted to `.md` via pdftotext. Read the markdown, not the PDF.

- **JIT-Agent** (`jit_agent_just_in_time_harness_evolution.md`, arXiv 2608.25593) — harness synthesized just-in-time per task. Formalization: h=(M,P,A,F) with FIXED interfaces, conditioned behavior. Training: customization→repair→Evo-GDPO. **Gives us:** "each loop custom-tailored" as a researched position; fixed-protocol-conditioned-behavior; repair-from-failure; traces feed both harness and model.
- **SKILL.state** (`skill_state_explicit_execution_state...md`, 2608.26263) — explicit execution state replaces growing transcript. Contract (P, Σ, O) → (R, ΔΣ, a) → validate → apply → discard R. Budget-matched: structured 0.94 vs truncation 0.18. Small-model error taxonomy: overwrite 68% / schema 20% / syntax 12%. **Gives us:** situation model = Σ; per-domain schemas; error taxonomy for the flywheel. **Limit:** sufficient-statistic assumption; null-deletion dangerous for business truth.
- **Automata** (`automata_agent_traces...md`, 2608.23670) — collapses trace corpora into a compact FSM (7–43 states, ms build, ≥0.997 fitness); early failure prediction from partial traces. **Gives us:** monitoring primitive for "unexpected"; harness-shapes-behavior evidence; the "expected" baseline.
- **AutoSaddler** (`autosaddler_automatic_harness_optimization...md`, 2608.23041) — harness repair from failure traces, offline. Three ingredients: deep debugging, targeted modifications, generalization-aware selection. **Gives us:** the harness-side twin of the fine-tuning flywheel; diagnosis→target-patch→validate.
- **EvoHarness-RL** (`evoharness_rl_self_evolving_runtime_harness.md`, 2608.05446) — trains a small model (Qwen3-8B) to use external state (Belief/Progress/Experience). SFT-then-cost-aware-GRPO; harness annealing; harness evolution. **Gives us:** the model-problem recipe on a small model.
- **Prime Agent** (`prime_agent_self_improving_rlm_harness.md`, 2608.23552) — persistent REPL + Continual Harness + subagents + Agents View. **Gives us:** the membrane principle ("prevents harness failures from becoming model failures"); persistence across trajectories; recovery/verification/resource accounting as standard harness duties.
- **SLM edge** (`slm_edge_agents_think_memory_and_edge_evaluation.md`, 2608.13420) — small models on edge device for cognition. **Gives us:** feasibility signal that small models carry bounded cognition with latency budgets.
- **Agent Seer** (`agent_seer_tool_specification...md`, 2608.26133) — synthesizes evaluation scenarios from tool specs (MCP). **Gives us:** candidate for golden-test generation breadth; depth comes from our Level 1 failure classes.

## 8. THE MODEL PROBLEM — SWARAJ'S DIRECTION (settled, in conversation)

The exact reasoning Swaraj gave (condensed):

- A frontier LLM can be **deterministic and wrong** (3 + 5 = 10). Correctness must come from the harness, not the model.
- We need to fine-tune the LLM **for our product dynamics** — its behavior, thought process, the way it operates inside Tend — NOT for the business. Business learning happens via **skills and memory at runtime**, never in the weights.
- **Frontier model first** to engineer the loops and make them work; **collect data** from production traces as it runs; **then shift** to a fine-tuned small model (Gemma-class 7B) per component, so it needs little intelligence but the right thought process.
- Fine-tune data: how do we collect it, how do we construct it, how do we optimize prompts. There are research papers on this (GEPA, JIT-Agent, EvoHarness, SKILL.state).

**The staged path (grounded in papers):**
1. **Stage A** — engineer with frontier model; harness first; correctness from deterministic gates.
2. **Stage B** — collect data from day one. Trace format already decided: deterministic evidence + structured emitted reason + gift chain-of-thought (nullable, never load-bearing). Memory & Knowledge category defines what the dataset is (episodic experience, error categories, external signal). Rejection sampling is free — only validator-passing trajectories become SFT examples.
3. **Stage C** — distill to small fine-tuned models per component, one bounded artifact at a time, strategic decision components LAST. The model is taught Tend's thought process (artifact shapes, stop-and-ask, defer-to-code, honest endings), not the business.
- SKILL.state taxonomy: small models fail at adherence (overwrite/schema/syntax), so first fine-tunes target adherence, and deterministic validators catch them at runtime regardless.
- EvoHarness: SFT-then-GRPO on an 8B is the proven recipe shape.
- JIT-Agent Stage I: train on frontier-model examples that passed the protocol.
- **Harness annealing** (EvoHarness): as adapters mature, the model needs less scaffolding — build the harness to measure that, not fight it.

**On aligning the internal thought process:** the thought process we want is encoded in the loop's artifact shapes and validation gates. SFT data = frontier runs that already passed our validators. The alignment is to the *architecture*, not to the weights.

**Prompt optimization (Part 9):** manual iteration fails (unversioned, non-evaluable, non-observable). DSPy + GEPA is the 2026 gold standard; GEPA reads traces, uses (score + feedback) metric contract, Pareto frontier. Language: harness in TypeScript (Cloudflare), optimizer in Python (DSPy/GEPA) as a separate service sharing trace format + git/PR.

## 9. KNOWLEDGE-BASE CATEGORIES READ (and what they decided)

### 9.1 Memory & Knowledge (`knowledge_base/Level 2/memory_and_knowledge/` — all 19 files read)

The fifteen working decisions that anchor the memory section:
1. Tend's learning is **business-scoped operational self-improvement** — learning about its own mistakes, never changing business rules.
2. Learning may improve: interpretation, local vocabulary, retrieval, planning, tool selection/arguments, error prevention, communication, escalation suggestions, procedural guidance. It may NOT change: policy, authority, ownership, permissions, source-of-truth, approvals, compliance, accountability.
3. Automatic learning is enabled by default; business may turn it off or require manual validation.
4. Trace recording and learning are **separate responsibilities**.
5. Experience records, learned memories, and context projections are **three different objects**.
6. Memory is **typed, versioned, referenceable, traceable**.
7. References create **graph-shaped** relationships WITHOUT requiring graph storage.
8. LLM-generated metadata is a **proposal**, not authoritative control metadata.
9. Versioning uses **structured claim families and typed update semantics** (add/merge/refine/supersede/narrow/append-exception/keep-conflict/reject/mark-stale/no-op), not wording similarity.
10. Ambiguous matches **never silently supersede**.
11. Retrieval is **multi-stage, scope-first**: hard filters (business/role/validity/permission/status/version) BEFORE semantic ranking; semantic similarity is one candidate signal, never truth.
12. Learned memory is **advisory**, cannot override deterministic controls.
13. Storage/indexing is Level 3.
14. A mistake needs an **external signal** (tool rejection, validation failure, human correction, outcome) — the model's private feeling is not enough.
15. The LLM may propose a relationship; the **system reconciles** via claim-family identity; uncertain identity stays unresolved.

The seven memory categories (map): conversation history / situation memory / episodic experience / semantic business knowledge / procedural memory / reflective-error memory / policy-authority.

### 9.2 Communication (`knowledge_base/Level 2/communication/` — all 10 files read)

Working decisions: communication does NOT decide truth, policy, authority, or capability; it **expresses a permitted and useful interaction to the appropriate actor** using current situation state + only what that actor may receive. Key rules: communicate only when it serves one of ten listed purposes; wait when premature/misleading/unnecessary; ask when an unresolved answer could change the safe next step; explanation depth is audience- and consequence-dependent (minimum sufficient); uncertainty as states+reasons, not scores; conflicts preserved neutrally, never resolved by wording; **acknowledgement ≠ completion, delivery ≠ understanding**. Communication can START a situation. It receives a projection of the situation, not an unrestricted view.

### 9.3 Explainability & Observation (`knowledge_base/Level 2/explainability_and_observation/` — all 10 files read)

One durable record already exists (claims+provenance, versioned situations, events, waits, declared outcomes, traces). Explainability (turns recorded reason into a decision-maker-useful form, per audience) vs Observability (builder's full view of behavior + health). Five anomaly classes: invariant violations / completion-discipline violations / coherence failures / drift / operational anomalies — layered by cost. Two hulls: provider hull (canary probes) + harness hull (golden sets + sampled production re-runs). Observer emits observation events onto the same event fabric; nothing special. Reconstruction is a view over the record, viewer-dependent rendering.

## 10. THE CONVERSATION-MANAGER LOOP (first draft, persisted in Part 6)

**Two parts:** (a) understanding agent (NLM) that writes the first situation model with **templates + automated metadata** (author, lineage, purpose template, ask list, viewer set); (b) **communication layer** expressing permitted interactions.

**Boundary:** the conversation manager does NOT decide business behavior — Decision Making selects the behavior (gather/wait/ask/communicate/escalate). It owns understanding (placement into situations) and expression (communication). One standing rule in code: every inbound human message to an active or new situation gets an honest acknowledgment unless a business rule defers it.

**The loop (per-step contract):** event arrives → WHO (code: identity/channel/permissions) → MEANING (LLM → bounded artifact: interpretation, referenced_thing, candidate_situations, purpose_template, ask_list, new_or_join) → VALIDATE (code: schema, references, 0/1/many matches — clarify on 0-or-many, patch on 1, create on none/new) → BEHAVIOUR (NOT here — situation worker decides) → COMMUNICATE (grounded, uncertainty-as-states, conflicts-neutral, minimum-sufficient-depth, no unearned promises) → TRACE + LISTEN (no lock).

**Scenarios walked:** parcel question, owner CSV campaign (parent + 30 child situations), Apollo leads, background update (filtered/batched), "what happened with that customer?" (memory resolves who → disambiguate → load graph → answer honestly).

## 11. THE MEMORY SECTION — DONE (the framing fork is RULED)

The memory section is drafted and persisted as **Part 10** of the study file. The fork ("component with its own loop" vs "data operations other loops call") was RULED by Swaraj: **memory is an independent component with its own loop**, per correction 2.12. My earlier reading below is kept only as a record of what was offered and overruled.

What Part 10 holds: the Utopia reverse engineering (pipeline, bitemporal ledger, decision records with measured lessons — 0015 pending-gate, 0007 counting, 0012 contract 57%→4%, 0009/0010 honest silence, 0011 mapping-not-fact, entity resolution, 0017 contradiction-upstream) and where each confirms or fails to meet our decisions; the situation-linking model from the knowledge base (dynamic models, links discovered later by operational context, journey derived not stored); the full picture of the memory capability under the rulings (inputs → learning pipeline → bounded retrieval loop → phase projections → maintenance, all scoreless in the control path); and the X/Y/Z defense of not adopting supermemory/utopia ("a memory system's control decisions are the product's decisions").

**Next loop draft: the situation-worker loop** (advances the situation: gather/wait/ask/escalate/honest-endings; owns Decision Making-selected behaviour; calls memory's retrieval loop as one of its capabilities).

**UPDATE — the situation-worker loop is now DRAFTED as Part 11** of the study file, with the memory-attachment rulings: memory as observer + context engineer attached to both loops (verified against TeleChat's per-step context slices), the conversation manager's routing slice for scale (millions of situation models — structured scope, never similarity), the async trace-fed memory writer with the state-write/learning-write split, code-first loop control, and the loader contract parked to Level 3.

**UPDATE 2 — the three forks in Part 11 §11.6 are now RULED by Swaraj (2026-09-04)** after a Level 2 trade-off analysis (Level 1 constraints + full category mines + external evidence via TinyFish — Anthropic long-running harness, the infinite-agentic-loops paper, Sierra, loop-engineering critique). Fork A: gather is a bounded, priority-ordered pass over the required-information set that returns to PROPOSE — sufficiency is never evaluated inside gathering (a gather-sub-loop was rejected as duplicating Decision Making). Fork B: the worker never communicates directly — it updates the situation model and the communication manager reacts to the change (Kanban-ticket model); the inbound acknowledgment routes through the same layer; tools needing yes/no confirmation run their pre-configured flow from the deterministic tool layer through the communication layer. Fork C: progress for the bounded-rounds limit = the enumerated structured evidence-state predicate (claim-state transition; new-source claim; wait/watch record; declared outcome; permission change) — identical repeats and LLM self-assessment are enumerated as no-progress. Propagated into study Parts 6 and 11.

**Historical record (overruled, do not re-propose):** my earlier reading was "mostly the latter — a bounded retrieval loop inside it (the J&F `retrieve` capability) and an asynchronous learning pipeline, but no strategic memory actor." The bounded retrieval loop and the background learning pipeline both survive inside the ruled independent component; the framing changed, not the mechanics.

**Relevant prior work:** J&F Tech assessment (two loops: main agent decides WHAT evidence; retrieval capability decides HOW and iterates; benchmark metrics: governing-evidence recall, supersession error rate, scope error rate) — `/home/swarajbari/Projects/J&F Tech assesment/`. Supermemory study (study file Part 1 §5). Memory & Knowledge 15 decisions (Section 9.1). Utopia (study file Part 10).

## 12. PENDING RESEARCH / OPEN THREADS (explicitly not yet done)

1. ~~**Memory section draft** (Section 11)~~ — **DONE**: Part 10 written; fork ruled (correction 2.12).
2. ~~**Situation-worker loop** — the second loop draft, after memory.~~ — **DONE**: drafted as Part 11; the three forks it carried were RULED by Swaraj on 2026-09-04 (see §11 UPDATE 2 and study §11.6).
3. ~~**GEPA paper verification**~~ — **DONE**: read arXiv 2507.19457 in Part 12 §12.1. Numbers verified with precision corrections ("up to 35×", "+14% vs MIPROv2 +7%", "9.2× shorter"); "as few as 3 examples" confirmed by GEPA FAQ. See study Part 9 §"Remaining questions" for the corrected wording.
4. ~~**AutoSaddler current status**~~ — **DONE**: released, MIT-licensed tool (microsoft/AutoSaddler, arXiv 2608.23041, 2026-08-24), V2 durable/plugin engine. See study Part 12 §12.2 and Part 9 header note.
5. ~~**Internet products column**~~ — **DONE**: Fin/Sierra/Decagon; Temporal/Inngest/Trigger.dev; Mem0/Letta; Linear/GitHub — each with align/invalid. See study Part 12 §12.3.
6. ~~**Open questions from the conversation-manager draft** (Part 6)~~ — **DONE** (study Part 12 §12.4): training/audit trace split (table); MEANING is Understanding's *proposal*, not a second model (one situation model, many writers); acknowledgment = Communication rules applied to the ack.
7. ~~**Golden scenarios**~~ — **DONE** (study Part 12 §12.5): structure only — nine families from Level 1 failure classes, instance template, ≥5 expected-refusal cases, four memory-evaluation measures as replay assertions.
8. ~~**Prompt optimization practical setup**~~ — **DONE** (study Part 12 §12.6): predictors P1–P4, deterministic validator stack = the (score, feedback) contract, optimizer as separate service reading trace segments.
9. ~~**Fine-tuning deep dive**~~ — **DONE** (study Part 12 §12.7): methods compared against the purpose (internalize the thought process, never the business) + SKILL.state adherence taxonomy; per-method data needs from traces.
10. ~~**Data & feedback deep dive**~~ — **DONE** (study Part 12 §12.8): trustworthy-signal taxonomy; machinery-trust vs outcome-trust; "tool call completed" ≠ "ask answered"; per-signal consumer mapping.
11. ~~**Evaluation & attribution**~~ — **DONE** (study Part 12 §12.9): the baseline ladder (base→+prompt→+tools→+harness→+memory→+fine-tuning→+routing) made concrete for Tend's loops; attribution protocol with the two-hull guard.
12. ~~**Historical lineage map**~~ — **DONE** (study Part 12 §12.10): one map closing the whole study — every source's problem→method→result→criticism→follow-up→where Tend takes/strips it.

**Still pending (separate dedicated research chats, untouched):**
- **Product design & user interaction pillar** (Section 15) — artifact-first information architecture, per-role surfaces, the design system, the landing page, the design ideation loop, and the anti-"AI-slop" blacklist. → Load `handoff_product_design_and_user_interaction.md`.
- **Software factory with coding agents pillar** (Section 16) — the review problem (test integrity, anti-cheat, review without fluency, e2e testing), the deep-module codebase structure, and Cloudflare implementation/deployment practices. → Load `handoff_software_factory_with_coding_agents.md`.
- ~~**Data architecture & concurrency** (§4A items 10 + 12)~~ — **DONE (2026-09-05)**: study Part 13 (§13 base + §13.1 concurrency mechanics + §13.2 backup/recovery, semantic index, per-kind attribute table). Handoff fully closed.
- ~~**Pre-architecture research** (§4A item 13)~~ — **DONE (2026-09-05)**: study Part 14 (event-driven confirmation: wait book = subscription registry, write-and-announce-together, cache-never-guards-a-decision, rule changes need no event; the prompt constitution: four text layers, ownership map, writing discipline, optimizer boundary) + `Level 2/prompt_constitution/` + notes in `coordination/` and `time/`. Handoff fully closed. **Architecture category unblocked.**

**Study file stands at Parts 1–14 (engineering study + data architecture & compute + pre-architecture complete).** The only §4A items not closed here are the two major pillars with their own dedicated handoffs below. Time (item 11) is decided at Level 2 via the `time/` category.

## 13. TOOLING — TINYFISH (web search + fetch, working)

The built-in web_search/fetch tools are **broken** (credits exhausted). Swaraj installed **TinyFish** CLI instead.

- Binary: `tinyfish` (node, in PATH).
- API key: `~/.tinyfish/config.json` → `api_key`.
- TinyFish is an MCP server at `https://agent.tinyfish.ai/mcp`. It exposes MCP tools: `search`, `fetch_content`, `run_web_automation`, etc.
- **Working invocation:** a Python helper was built during the study at `/tmp/tfs.py` (search) and `/tmp/tff.py` (fetch). `/tmp` is **ephemeral** — a fresh chat must recreate the helper (the recipe is below and in the study file's research notes).
- **The pattern:**
  1. `POST https://agent.tinyfish.ai/mcp` with `Authorization: Bearer <key>`, JSON-RPC `initialize` (protocolVersion `2025-06-18`), capture `mcp-session-id` from the response header.
  2. Send `notifications/initialized` (no `id` field).
  3. `tools/call` with `{"name":"search","arguments":{"query":"...","domain_type":"web|research_paper","purpose":"..."}}` or `fetch_content` with `{"urls":[...],"purpose":"..."}`.
- `tinyfish` also has `auth`, `onboard`, `doctor`, `agent run` (browser automation), `config-claude`, `upgrade`.
- **Swaraj's instruction:** "you can use the tinyfish CLI to do search and fetches, it is very effective." Use it for current/latest questions, docs/API setup, product/tool explanations, comparisons, and source-backed factual questions.

## 15. PRODUCT DESIGN & USER INTERACTION (major research pillar)

> Swaraj's own framing: *"We cannot just give every single interactor a particular chat box. Chat is just one way of interface. How would we visually, by means of artifacts and stuff, convey multiple things to the business owners, to the employees, and multiple interactors? That is something we need to design also. Product design in itself, keeping users in mind, is an aspect that I haven't even touched, and something that we need to learn."*

### 15.1 Why this is a first-class research pillar

The engineering study (Parts 1–9) tells us WHAT Tend does. This pillar tells us how the people inside the business SEE and DRIVE that work. Tend's own vision says the business's primary view is **artifacts** — active situations, waits, changes needing attention, engaged people, blocked decisions, outcomes — not chat transcripts. So the interface research is not cosmetic; it is the delivery mechanism for everything the situation model holds.

Concrete problem that forces it: the owner gives Tend a journey — "here are 10 people to reach out to" — then only one of them replies, one asks a question, one wants a meeting, two go quiet. Tend creates 10 situation models. **How does the owner see what is happening in each, at a glance, without opening 10 conversations?** Same question for employees, partners, and prospects who want to know where their thing stands.

### 15.2 What must be researched and designed

1. **Artifact-first information architecture.** The hierarchy: business → journeys → situations → asks → evidence/reason. What are the primary artifact objects, their states, and their lifecycles on screen?
2. **Cross-situation views.** How a list of situations, journeys, waits, and decisions is aggregated, filtered, searched, grouped, and triaged. Owner wants exceptions and decisions, not narration.
3. **Per-role surfaces.** Owner dashboard (active situations, changes, waits, blocked/at-risk, prospects engaged/ready, decisions needed); employee operational views (their responsibilities, deadlines, handoffs); customer/prospect status views (where my thing stands, plain language); partner views (only the piece they own).
4. **Proactive vs pull.** When does Tend push a notification/update vs the user pulling from an artifact? Notification discipline (no alert fatigue, no "owner should have known" failures).
5. **The situation/journey narrative view.** Human-readable storyline: message → what we found → what we did → what we told them → what's next. (Explainability category: same data, viewer-dependent rendering — timeline for non-technical, graph for builders.)
6. **Chat as an entry point**, not the home: search, inspect, instruct — plus artifacts surfaced alongside.
7. **The landing page, setup, and onboarding/configuration experience.** How a new business turns Tend on and understands it.
8. **The design system.** Color, typography, spacing, iconography, motion, components, states (empty/loading/error/partial), accessibility, and a coherent visual identity — everything from colors and fonts to user interaction.
9. **The anti-pattern blacklist.** Things that instantly make a product look cheap/AI-generated and that we must NOT ship. Swaraj's list: hash gradients, lucid-icon-style generic icon sets, em-dashes used as fake decoration, colored left strikethrough accents, fake curved testimonials, checkmark-bullet hero sections, sparkle icons, animated arrows, no privacy policy, neon colors, generic pastel/gradient palettes, sterile pure-white backgrounds, rainbow coloring, heavy drop shadows. Research must keep this blacklist alive and growing, and derive a positive design direction that is an intentional alternative.
10. **Product-design craft itself.** UX research fundamentals, user journeys, information architecture, interaction design, visual hierarchy, affordances, feedback, and how real products (Linear, Notion, Intercom, Stripe, Merlin-style SMB tools) structure artifact-first and dashboard surfaces.

### 15.3 The design ideation loop (how we will actually design)

This is itself a process to research and formalize:

```text
brainstorm / sketch concepts
   → prototype (mocks, wireframes, interactive)
   → LOOK at it and ANALYZE  (Swaraj: "I should analyze it, see what feels
     right, what feels wrong")
   → expert opinion  (via an agent acting as a design critic, or a human
     expert)
   → iterate and refine
   → repeat
```

Research questions the process raises: What tools make prototyping fast (figma-style, code-first, AI-generated mocks)? What are the right review questions to ask at each look ("what is the primary action?", "what would a confused user do?", "what does this convey wrong?")? How do we capture design decisions so they feed back into the knowledge base (like every other category)? How do we get an honest design critic from an agent without it just agreeing?

### 15.4 How this connects to the rest of the study

- The **situation model** is the data behind every artifact; the artifact views are projections of it (same data, viewer-dependent rendering — already decided in Explainability).
- The **conversation manager** expresses communication; the artifact surfaces express state. Both serve the same interactors.
- The **software factory** pillar (next) is how any design gets built into real product.
- The anti-slop blacklist and the design system are the Level 2/3 of this pillar — concept first, then implementation.

> **Handoff:** when this pillar is picked up, load `handoff_product_design_and_user_interaction.md` (dedicated research chat).

## 16. THE SOFTWARE FACTORY WITH CODING AGENTS (major research pillar)

> Swaraj's frame: coding agents will build all of Tend. Planning happens in natural language (logic, design patterns, file layout — so Swaraj can actually understand and own the plan). **The agent's job is not software engineering; it is translation of the implementation plan into code.** The main problem is not plan-making — it is REVIEW. Plus how to structure the codebase (deep modules / sub-modules), and implementation/deployment best practices, especially on Cloudflare.

### 16.1 The working model (Swaraj's opinionated view)

```text
PLAN (natural language) ── done by Swaraj with the agent as peer:
      business goal, design patterns, module boundaries, logic layout,
      WHICH file holds which logic, and the n test cases that define done
      ↓
CODE (translation) ── done by the agent: the implementation plan → code
      ↓
REVIEW (the hard part) ── done by Swaraj, with structure
```

The agent is a translator of an approved plan, not an autonomous engineer. Engineering decisions live in the plan; the agent executes them.

### 16.2 The review problem (the core of this pillar)

The agent will emit a large volume of code across multiple languages (chosen by Swaraj), languages he may not be fluent in. The research must make review trustworthy despite that. Specific open problems:

1. **Test integrity.** The plan names n test cases. How do we guarantee the agent's tests are EXACTLY those cases and not subtly different? Threats: weakened assertions (`assert x != null` instead of `assert x == 5`); changed expected outcomes; asserting the wrong field; over-broad or tautological checks; deleted cases; tests that pass for the wrong reason (mock everything away, hard-code the expected answer, ignore the real code path); tests added to look thorough but testing nothing.
2. **No cheating on results.** How do we stop an agent from manipulating test cases or CI output to "show green"? Research: named test IDs traceable to plan items, immutable expected values committed in the plan, running the tests in an environment the agent doesn't control, mutation of the expectation to prove the test would catch a real bug, coverage of the named cases, and treat "all tests pass" as evidence for review, never as truth.
3. **Review without language fluency.** Can Swaraj review code even slowly, with basic intuition and an understanding of the plan? Yes — method: (a) traceability — every plan item and test case maps to a code location; (b) read tests first, they encode the contract; (c) run the tests and inspect failures; (d) spot-check the logic of the critical modules against the plan; (e) trust the deep-module structure so each module can be read alone; (f) use the agent as an explainer for specific sections, but never as the sole judge.
4. **End-to-end testing without fluency.** How to verify the whole thing works together — staging environment, seed data, a runnable demo against the real stack, smoke scripts, and Cloudflare's local dev/edge tooling. The research should define what "end-to-end" means per feature and how a non-expert runs it and reads the result.
5. **Separation of reviewer vs implementer.** The same agent that wrote the code should not be the one asserting it is correct. Research whether a second agent (fresh context, given only the plan + code) or human judgment should be the review authority.

### 16.3 Codebase structure: deep modules / sub-modules (Swaraj's preferred architecture)

- A **sub-module** is an independent subsystem that groups a particular set of responsibilities that change together. Sub-modules interact in multiple ways to create capabilities.
- **No central test repository.** Each sub-module owns everything itself: its own code, its own test folder, its own guidance on how to test it, and its own documentation / markdown files specific to it. A sub-module should be readable and testable as an independent thing.
- Research questions: how to define module boundaries and public contracts between modules (what is exported, what is private); dependency rules (which modules may depend on which; no circular deps); how independent testability is enforced; how integration between modules is tested (a small set of integration tests vs each module's own); how module documentation is kept truthful alongside code; how this maps to Cloudflare (Workers, Durable Objects, shared packages); and how a module-based repo scales to many modules without a monolith.

### 16.4 Implementation, deployment, and operation best practices

- **Generic practices:** version control workflow, branch/PR discipline, review gates, commit hygiene, migrations, secrets handling, error handling, logging, CI/CD, and why each matters when the implementer is an agent.
- **Cloudflare-specific (Level 3, but the practices are researchable now):** Workers, Durable Objects, D1/KV/R2, per-tenant isolation, local dev (`wrangler`), edge deployment, canary/rollback, secret management, rate limits, cost control, and the Cloudflare "philosophy" (collection of pre-solved problems; per-tenant one-Worker isolation; decide which primitive fits each data kind — see scope item 10).
- **Testing stack practices:** unit, integration, e2e; what belongs where; how tests run in CI; what "green" means and doesn't mean.
- **The product implementation workflow:** plan → task breakdown → agent implementation → review gate → integrate → deploy → observe. How the review gates actually block bad code.

### 16.5 Open research questions for this pillar (to be answered in dedicated chats)

1. How do we mechanically trace every test case from the plan to its implementation and verify it was not weakened?
2. What is the concrete anti-cheat protocol for agent-written tests and "green" results?
3. What does a review checklist for a non-fluent reviewer look like, per module and per PR?
4. How do we run and interpret end-to-end checks in a stack we don't fluently read?
5. What are the exact rules for deep-module boundaries, contracts, and dependency direction?
6. What is the Cloudflare-native build/deploy/test/rollback runbook for an agent-built product?
7. How do we keep module documentation truthful as the agent iterates?
8. What signals separate well-built code from "code slop" (the engineering analogue of the design blacklist) so the review has a target?

> **Handoff:** when this pillar is picked up, load `handoff_software_factory_with_coding_agents.md` (dedicated research chat).

## 17. FILE MAP — WHERE EVERYTHING LIVES

- `/home/swarajbari/Projects/Project-X/` — project root. Key files: `conversation with swaraj.md` (constitution — HOW we talk, read first in every chat), `constitution.md` (older), `handoff_prompt.md` (constitution for writing handoffs), `file_writing_instruction.md` (when writing is allowed), `status_quo.md`, `notes.md`, `Growth_and_evolution.md`, `Compliance_and_security.md`, `codex-session-*.md` (raw earlier transcripts, including the one this study was born from), and THIS file.
- `/home/swarajbari/Projects/Project-X/knowledge_base/` — the knowledge base. `README_FIRST.md`, `STRUCTURE.md`, `Level1_Problem_Framing_or_Expansion.md`, `Product_Vision.md`, `three_level_framework/3_level_framework.md` + `level2_method.md`, `Level 2/` (18 categories), `research/`.
- `/home/swarajbari/Projects/Project-X/knowledge_base/agent_harness_study.md` — **the study file (Parts 1–9)**, the live source of truth for this study.
- `/home/swarajbari/Projects/Project-X/Things to look at/` — the source material: 5 repos (`hermes-agent/`, `pi/`, `herdr/`, `supermemory/`, `hermes-agent-self-evolution/`) + 8 converted papers (`.md`).
- `/home/swarajbari/Projects/Kirana-Management-TeleChat/` — TeleChat (Swaraj's prior project).
- `/home/swarajbari/Projects/J&F Tech assesment/` — Swaraj's RAG pipeline approach (memory-adjacent).

## 18. CHANGELOG / HOW TO EXTEND THIS FILE

- Created at Swaraj's request as the base context for every fresh chat in this study (originally named `base_handoff_harness_study.md`, renamed to `base_prompt_for_research.md`).
- This is the **base prompt for research** — not a handoff. Swaraj writes his own handoffs manually per dedicated research chat; this file is the standing base context they all load.
- Keep it load-bearing, not padded. Every new section should be cross-referenced with the study file and the knowledge base.
- When a research angle is completed, move its "pending" entry under "done" and update the relevant section. When Swaraj adds a correction, add it to Section 2 with `[HIGH ATTENTION]`.
- Section 4A restores the original breadth-first research scope and primitives (from the first session) — position every dedicated research chat against it.
- Section 4A items 14 and 15, and the full Sections 15 and 16, add the two newest major research pillars: **product design & user interaction** and **the software factory with coding agents**. Both are untouched; they are candidate dedicated research chats on their own.
- Memory session: corrections 2.11 (false fork — graph data not graph structure) and 2.12 (memory = independent component; no model-generated numbers in control paths) added. Section 11 rewritten: fork RULED, Part 10 written into the study file, next step is the situation-worker loop. Section 12 item 1 closed.
- Fork session (2026-09-04): the three forks in the situation-worker loop RULED by Swaraj after a Level 2 trade-off analysis, and propagated into study Parts 6 & 11 (§11.6 rewritten from "open forks" to "ruled"; Part 6 expression model updated; Part 11 per-wake contract updated). Summary: gather = bounded pass returning to PROPOSE; worker never communicates directly — communication manager reacts to situation-model updates, tool confirmations run from the deterministic tool layer; progress = structured evidence-state predicate. Section 11 UPDATE 2 added, Section 12 item 2 closed.
- Completion stint (2026-09-04): finished handoff items 2–11 as study Part 12. GEPA numbers verified from the paper with precision corrections; AutoSaddler confirmed released; internet-products column; conversation-manager questions resolved (training/audit trace split, MEANING = Understanding's proposal, acknowledgment = Communication rules); golden scenarios + memory-evaluation structure; prompt-optimization wiring (predictors P1–P4, validator = (score, feedback), separate optimizer service); fine-tuning deep-dive (purpose = thought process not business; SKILL.state taxonomy); trustworthy-signal taxonomy (machinery vs outcome trust; tool-completed ≠ ask-answered); evaluation/attribution ladder with two-hull guard; historical lineage map closing the study. Study file now Parts 1–12 (engineering study complete). Section 12 items 3–12 closed; §11/§18 synced; status_quo.md updated; Level 2 notes added to relevant category files (golden scenarios/evaluation/trace-split/MEANING).
- Handoff creation (2026-09-04): created the two remaining major-pillar handoff prompts — `handoff_product_design_and_user_interaction.md` (9 items: artifact-first IA, cross-situation views, per-role surfaces, proactive-vs-pull, narrative view, design language, landing/onboarding, design ideation loop, anti-AI-slop blacklist) and `handoff_software_factory_with_coding_agents.md` (7 items: review problem, anti-cheat, review without fluency, e2e testing, reviewer/implementer separation, deep-module structure, implementation/deployment best practices). Base prompt §12, §15, §16, §18 synced to point at them.
- Handoff creation (2026-09-04): created the two remaining §4A handoff prompts — `handoff_data_architecture_and_concurrency.md` (2 items: storage/compute primitive mapping for each data kind; collision handling, locking, lost updates) and `handoff_prearchitecture_research.md` (2 items: event-driven agency product research like Bodhi.ai; the prompt constitution — where it lives, what it is allowed, where deterministic overrides it). Base prompt §4A progress status, §12, §18 synced. All §4A scope items now have dedicated handoffs; time (item 11) is decided at Level 2 via the `time/` category.
- Data architecture & compute stint (2026-09-05): closed §4A items 10 + 12 as study Part 13. Research: three parallel sub-agents (database fundamentals, Cloudflare data primitives, developer social signals) plus two targeted follow-ups (Cloudflare concurrency model, DO storage/archival). Key decisions after Swaraj's corrections: hybrid storage (per-business D1 for shared state + R2 for traces/content/archives + DO SQLite for ephemeral state/logs + KV cache + Queues event fabric + separate analytics D1); Conversation Manager = per-business stateless Worker (concurrent), Situation Worker = per-situation Durable Object (single-threaded, one DO class, alarms); conversations are per-interactor threads while situations span multiple conversations; the situation model lives in D1 as the shared versioned coordination point; the DO is triggered by situation-model version change (never by direct messages); preemption via the DO's own queuing; compare-and-swap on the situation version enforces version-forward under two writers; six concurrency mechanics resolved (FIFO ordering, no cross-situation deadlocks, CAS, dedup placement, no cross-situation ordering, six-guarantee WAKE/RECOVER/REST contract); backup/recovery per store; semantic index scoped per tenant, never the source of truth (Vectorize named as Level 3 candidate); per-kind attribute table closes the handoff. §4A progress status, §12, §18 synced. NEXT: pre-architecture threads (item 13) via `handoff_prearchitecture_research.md`.
- Pre-architecture stint (2026-09-05): closed §4A item 13 as study Part 14. Session corrections (§14.1 [HIGH ATTENTION]): externals are inspiration only, never a decision menu; plain language, no product-name shorthand; step instructions belong to memory & knowledge, not the constitution (moved the optimizer's scope). Event-driven decisions: the wait book IS the subscription registry and the situation registry the reverse address book (subscription-consumer model, never polling — Swaraj's clarification); write-and-announce-together (whoever updates the situation model emits the change-event in the same execution; unannounced write = incomplete job, retried — closes Part 13's open DO-trigger mechanism); the cache never guards a decision (enforcement always reads the source of truth; invalidation is speed-only); rule changes need no event (reads go fresh at each wake; the per-action check is the hard gate; proactive waking parked as possible per-business configuration); duplicate delivery harmless via version dedup; lost events heal via the check-in. Constitution decisions: four text layers with owners (universal core + stage constitutions = human-authored, release-versioned; runtime preferences injected by the memory loader; assembly templates = memory & knowledge); deterministic rules never enter text; writing discipline (case-general principles, positive alternatives over prohibitions, short per stage); the optimizer edits memory-owned assembly text only, gated by validator verdicts + golden scenarios + PR review, adoption per-predictor and deferred until traces exist. New Level 2 folder: `Level 2/prompt_constitution/`. Notes added to `coordination/` and `time/` conversation-and-discoveries files; Level 1 "Research needed before Architecture" marked done; STRUCTURE.md updated. §4A progress status, §12, §18 synced; status_quo.md updated. **Architecture category unblocked.**
- This file and `agent_harness_study.md` stay in sync: one is the living study (deep), one is the base research context (dense). Neither replaces the knowledge base.

---

*End of base research prompt. You may begin.*