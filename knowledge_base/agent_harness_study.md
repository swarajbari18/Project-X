# The harness study: kinds of LLM interaction, and what Tend takes from them

## Status

**Rewritten 29 October 2026**, on Swaraj's instruction: "Agent harness study and .md has to be thoroughly rewritten, or if it would be too expensive, just scrap that altogether. We do not want noise for later stages of our build process to basically affect our building agents."

**What this file is for.** In Swaraj's words, the study's purpose "was not to create the conversation manager and situation worker. It was to find out what are the types of LLM interaction architectures that can help us make understanding, that can help us make routing, etc., etc., all the other components in the loop". The aim was to "discover what all kind of LLM loops are there, so we can create a harness and we can create a custom product loop that basically orchestrates the LLM call in such a way that it basically performs as a product all the time."

**What changed in the rewrite.**
- **Removed:** the earlier version's two drafted loops, the conversation manager's (old Part 6) and the situation worker's (old Part 11.3). Tend's loops are now [the product loop](Level%202/the_product_loop/how_does_the_product_loop_work.md), built from the product's own stages.
- **Kept**, rewritten in plain words:
  - what was learned from each source;
  - the rulings Swaraj made during the study;
  - the improvement machinery;
  - the data and compute decisions;
  - the event-driven mechanics;
  - the prompt constitution.
- **New:** the catalogue of kinds of LLM interaction (Part 1). The earlier version named four classes but never defined them.
- **Old part numbers:** where each old part went is listed at the end, for pages that still cite them.

Nothing here is a design decision unless it says it is a ruling. The sources are inspiration only (Swaraj: "we are not making bodhi, we are making our own project x so this is not relevant just an inspiration").

## The problem this study serves

**Tend's problem.** Tend carries a business's communication and operational responsibility.
- When a situation changes (a customer message, a payment, a deadline, a delivery stop), the right next step must happen without a person watching.
- Every situation must reach an honest ending: answered, waiting with a visible reason, passed to the right person, or declared unanswerable.
- Correctness must never depend on trusting a probabilistic model.

**The harness problem.** Swaraj built a harness-first agent before Tend: Kirana TeleChat, a Telegram assistant for a shop. It ran one code-owned pipeline for every message: plan, check the plan, execute, check results, decide, respond, in bounded rounds.
- **Its effort was fixed.** Swaraj: "Even the one I made with Kirana telechat did not give me enough flexibility to answer basic questions like I and to answer tougher, more intricate questions, both with varying levels of effort. It would always go with the level of effort that has been coded or programmed into the harness that we did not want. We did not want it to be controlled with the prompt, but with the harness should be flexible enough that the effort auto adjusts." ("like I" is speech-to-text for "like hi".)
- **Its quality was low despite precise execution.** Given a query, Swaraj could predict exactly which tool would fire, and it did. The output was correct and still scored about 40 out of 100. A colleague's prompt changes lifted it to 95, and the system also became less predictable, more like a plain ReAct agent ([research record of 14 September](research/quality_vs_determinism_conversation_and_discoveries.md)).

**What the research concluded** (14 September):
- Correct execution and good output are different things.
- A harness can carry out every step perfectly and still answer badly, because a fixed corridor suppresses what the model could reason from the evidence in front of it.
- Its resolution: "the harness owns what may happen and what counts as done, the loop owns how to get there."
- Quality comes from each step reasoning from live evidence, with a lean context, against a clear shape for its output.
- The value of a thick harness is greatest on small models.

**What follows for Tend.**
- The product loop is built from the product's stages.
- The harness fixes what each stage may do, what its output must look like, and its ways to end.
- Inside each stage, the AI uses the kind of interaction its job needs, for as many turns as it needs, within a code limit.
- The effort a message gets follows facts the stages wrote, never the prompt and never a model's score.

## Part 1. The kinds of LLM interaction

### 1.1 The step every kind repeats

Every serious system studied repeats one step contract:
- **Inputs:** the standing text (the constitution), the current state, and the latest observation.
- **What the AI writes:** its reasoning, a structured change to the state, and an action.
- **What code does:** it checks the change, applies it, carries out the action, and discards the reasoning.

TeleChat has a constitution slice, a plan artifact and a code verifier. Pi has a specification, arguments and validators. SKILL.state states the contract outright. Hermes saves the intent before acting, and guards every call.

**Ruling (study, September 2026):** every AI step in Tend is an instance of this contract: it writes a reasoning artifact that code checks. Each kind below is one way of arranging such steps inside a stage.

### 1.2 The catalogue

| Kind | How it runs | Use it when | What the harness adds | Sources |
|---|---|---|---|---|
| **Fixed code** | No AI. | A rule can decide. | — | Product Vision: "If a decision can be made using clear rules, Tend should make that decision using the system itself." TeleChat's checks and execution in code. |
| **One structured answer** | One AI call writes a reasoning artifact of a fixed shape; code checks it; a failed check goes back once with its reasons; a second failure goes to a person. | The stage's output is one artifact: an understanding, a decision, a message. | The shape, the check, the repair limit, the fail-closed ending. | SKILL.state; TeleChat's plan JSON checked in code; Pi's argument checks, with errors returned as data. |
| **Choosing among what was shown** | The AI chooses among items it was given; code checks the choice was among them; "cannot tell" asks someone who can say. | The answer is a pick from a known set: which situation, which order. | The closed set; the check; the question when the choice cannot be made. | TeleChat's draft resolver: classify, verify, resolve, clarify. |
| **Plan, do and check, in rounds** | The AI writes steps with what each depends on; code checks the plan and runs what can run; results return as claims; the AI writes the next steps. | Steps depend on earlier results: read the orders, then compare, then ask the carrier about the matching one. | The plan's check; running steps in code; the round limit; the progress rule. | TeleChat's orchestrator; Hermes' guards against repeats and no progress. |
| **Explore step** (inside a plan) | The AI reads one source, sees the result, chooses the next read, until the step's target is met, its read limit is reached, or the progress rule stops it. This is the ReAct shape. | Open research, where the next read depends on what the last one found. Reads only. | The read limit; the progress rule; every result saved as a claim. | Pi's minimal loop; Hermes; the 14 September research. |
| **Watching from outside** | No reasoning; a named wait is kept alive, and the work wakes when something answers. | Waiting on a person, a system or a date. | The wait's record, its resume trigger, its check-in. | Herdr; Prime Agent. |

**The study's four classes**, now defined:
- **strategic**: plan, do and check, in rounds;
- **bounded artifact**: one structured answer, and choosing among what was shown;
- **one-shot**: a single structured answer used as a helper inside another part, such as memory and knowledge's AI part;
- **supervision**: watching from outside.

### 1.3 How a stage's kind is chosen

1. If a rule can decide, use fixed code.
2. If the output is one artifact, use one structured answer.
3. If the answer is a pick from a known set, choose among what was shown.
4. If steps depend on earlier results, plan, do and check, in rounds.
5. If the next read depends on what the last one found, use an explore step inside the plan.
6. If the work is waiting, watch from outside.

**The kind is fixed per stage by the design.** The AI never chooses its own kind, and never decides to continue. Within the kind, the number of turns follows the work, within code's limits and the progress rule.

### 1.4 Where each kind is used in Tend's product loop

| Stage | Kind |
|---|---|
| Intake; routing; the reply decision; the update decision; weighing evidence; acting; the send check | Fixed code |
| Understanding the arrival | One structured answer; its wider look chooses among what was shown |
| Understanding the situation | One structured answer |
| Gathering | Plan, do and check, in rounds, with explore steps |
| Deciding | One structured answer |
| Writing a message | One structured answer |
| Memory and knowledge's AI part | One-shot, beside each stage that reasons |
| The book of waits; the status-check service | Watching from outside |

The loops themselves are in [how Tend's product loop works](Level%202/the_product_loop/how_does_the_product_loop_work.md).

## Part 2. The sources

Five repositories and eight papers were read from code and full text, not from READMEs. Two reading rules: read the failure paths first; never trust a document over the code. A product column and two memory systems were added later.

| Source | What it is | What Tend takes | Invalid for Tend |
|---|---|---|---|
| **Hermes** | A production-hardened coding agent; one long conversation loop | Save the intent of a tool call before running it; a guard list (repeated calls, repeated failures, no progress, bad arguments); selecting and compressing context are separate jobs; every loop ends with a recorded reason | One user, one session, no waiting; it silently repairs bad tool calls, where Tend fails closed |
| **Pi** | The cleanest minimal agent loop | Tool errors are data fed back to the model; arguments checked before execution; hooks before and after each tool | No durable state; checks the envelope, not the substance |
| **Herdr** | A supervisor that keeps long-running agents alive | Supervision is a separate job from reasoning; a small set of worker states (running, blocked, waiting, resumed, dead); a person can take over and hand back | It must infer state from screen text; Tend's own parts report their state |
| **Kirana TeleChat** | Swaraj's own harness-first business agent | Bounded artifacts checked in code; each AI step gets its own short prompt and its own slice of context (verified in its code: the decide step sees no conversation history at all); classify, verify, resolve, clarify for "which thing does this message act on" | One message is one run; effort fixed by the pipeline; three checks that never ask "did we answer what the person meant?"; its documented conversation manager does not exist in its code |
| **Supermemory** | A hosted memory engine (closed source) | Keep the raw record and the extracted meaning apart; updates win, history stays; a per-person profile before any search; learning in the background; a hard wall per tenant | Its engine decides identity and supersession; one graph of truth with no line between what was learned and what the business requires; its forgetting deletes |
| **Utopia** | A governed knowledge graph over documents | Recording a sentence is not asserting a fact; counting decides, not a model; a contradiction points to where the error can be; every dropped item leaves a reason | Built for static documents with nobody present; ontology and graph queries; confidence numbers in control |
| **JIT-Agent** | A model that writes task-specific harnesses | Variation happens inside a fixed interface: each component differs, the contract is shared; a teacher, then repair, then evolution as a training recipe | Per-task harnesses for short tasks; Tend's unit is a long-lived situation |
| **SKILL.state** | Execution state instead of conversation history | The situation record is the state; structured state scored 0.94 against 0.18 to 0.52 for truncation, compression and summaries at equal budget; small models fail at keeping structure (68% overwrite existing keys), not at reasoning | Its state must hold everything that matters; Tend's must also hold sources, conflicts, waits and who may see what; destructive merges are unsafe for business facts |
| **Automata** | Recovers a small state machine from agent traces | A definition of "expected" behaviour; early warning from a partial trace | An analysis method, not a way to build a loop |
| **AutoSaddler** | Repairs a harness from failure traces (released by Microsoft, MIT licence, 24 August 2026) | Deep debugging, not reflection; targeted patches; keep only patches that do not break held-out cases | Patches must never touch business authority |
| **EvoHarness-RL** | A small model trained to use external state | Teach the harness's action space first, then reinforce; as training matures the model needs less scaffold | One agent, clean rewards |
| **Prime Agent** | Persistent workspaces and supervised sessions | Harness failures must surface as harness failures, not as model failures; memories and skills persist across runs | A code workspace, not business operations |
| **SLM edge agents** | Small models carrying routing, memory reads and planning | Small models can carry bounded jobs | Exploratory; no verification |
| **Agent Seer** | Test scenarios generated from tool specifications | Breadth for golden scenarios | Business depth still comes from Level 1's failure classes |
| **Fin, Sierra, Decagon** | Commercial support agents | A resolution counts only when the outcome is reached; routing kept apart from the work | Guardrails enforced by supervising models, or hidden inside a vendor's box |
| **Temporal, Inngest, Trigger.dev** | Durable workflows | Wake reliably after a crash or a long wait | They resume a coded procedure; Tend's next step is decided afresh each wake |
| **Mem0, Letta** | Memory layers and agent runtimes | Extract, then reconcile | The memory system makes the product's decisions |
| **Linear, GitHub** | Issue-tracker notifications | Who is told what, when, batched: the owner sees "3 replied, 1 wants a meeting" | — |

## Part 3. What the sources say together

1. **State first, not a growing transcript.** SKILL.state, EvoHarness and Level 1 ("the business needs artifacts, not only conversations") agree. The situation record is the execution substrate.
2. **One step contract repeats everywhere** (Part 1.1). Each component differs; the contract is shared.
3. **The harness shapes behaviour; the model, its context and its output's shape decide quality.** Automata measured the first: one state machine fits four models. The 14 September research corrected the conclusion drawn from it. The harness is the strongest lever for predictable, rule-following behaviour. The model, its context and a clear shape for its output are the strongest levers for quality.
4. **Check artifacts, never reasoning.** No AI critique of AI reasoning at run time. Reasoning quality is improved offline, from traces.
5. **Traces feed every kind of improvement.** One stream, three consumers: harness patches, model training, behaviour monitoring.
6. **Small models fail at keeping structure, not at reasoning.** Deterministic checks, plus training aimed at each failure class, rather than a bigger model first.
7. **The path from a frontier model to small models is known:**
   - teacher-made examples, then supervised training;
   - preference training or reinforcement on signals from outside the model;
   - repair cases taken from failures.

   All of these come from checked traces.
8. **Nobody solves Tend's problem.** Every studied system is scoped to one request or one session: no waiting, no business policy, no authority, no multi-person stories, no honest endings per ask.

## Part 4. What Tend does differently

1. **The unit of work is a situation**: one storyline, many asks, people and systems, alive for days, interrupted and resumed, ending honestly.
2. **Events arrive from every direction while work is under way.** A versioned shared record takes the collisions.
3. **Business policy and authority are checked by code at every action.**
4. **Memory and knowledge is typed, scoped and versioned**, and the AI only proposes.
5. **Models are replaceable**: frontier first, with small models trained per stage later, always within the acceptable-learning boundary (behaviour may be learned; business rules and authority never).
6. **The business sees artifacts, not chats.**
7. **Effort follows the message** (29 October 2026). The same stages serve "hi" and a research brief. A stage with nothing to do is passed, and any stage may end the loop.

The research of 14 September put it in one line: "everyone is engineering the agent; Tend is engineering the responsibility the agent carries."

## Part 5. Rulings made during the study

Each ruling is Swaraj's unless marked otherwise. Where it now lives is in brackets.

**Memory and knowledge**
- **An independent component** (September). "we need memory as another independent component which interacts with other components of the agent to make one core agent capability, and the LLM is responsible to figure the interaction out." [memory and knowledge design]
- **No numbers made by a model in a control path.** "i do not think thresholds and numbers work well enough in production" Scores over language never decide; counts of real events may; states and exact matches decide. [memory and knowledge design]
- **Graph data, not graph structure.** Links are discovered later, when a signal appears; the relationships Tend needs are few and known in advance, and are worked out in code. [memory and knowledge design]
- **Research sources are inspiration only.** Tend's Level 2 answers outrank them.
- **Memory and knowledge observes the loop and prepares each stage's context.** It is verified against TeleChat's per-step context slices. [the product loop, part F]
- **Situations are found by structured scope** (the person, status, exact references, links), never by similarity over everything. [the product loop: the wider look]
- **Two kinds of writes.** State writes are synchronous; learning runs in the background. Links are now written in the background too (changed by Swaraj on 28 October). [memory and knowledge design, H5]
- **The defence.** "A memory system's control decisions are the product's decisions." Adopting an outside engine would hand Tend's hardest judgments (identity, supersession, relevance, allowed influence) to a box tuned for someone else.

**The loops**
- **The loop decides to loop, code first.** "The LLM never decides to continue" [the product loop, part A]
- **Gathering** (4 September). One bounded, priority-ordered pass, which never judges whether information is enough; deciding judges that. Changed on 29 October: gathering is a stage the loop passes through, and deciding may send it back for a named need. [the product loop, D3]
- **The worker never sends** (4 September). It writes the situation; the conversation manager decides whether to tell; the communication layer expresses. A tool that needs a yes or no runs its own pre-configured confirmation flow through the communication layer. [the product loop, part E]
- **What counts as progress** (4 September). A round counts only if the record moved in one of five ways:
  - a claim's evidence changed;
  - a needed claim came from a source not yet asked;
  - a wait was written, refreshed or finished;
  - an outcome was declared;
  - a permission changed.

  The AI's own report of progress never counts. [the product loop, D6]
- **The conversation manager answers from what a situation holds** (5 September). "If the conversation manager feels that the situation model itself has enough information to answer the user back, it just does that." This never reached Sections 6 to 12. Restored on 29 October, with strict conditions. [the product loop, C2]
- **One situation model** (September). Understanding at entry proposes; code validates; every loop writes forward through new versions. [the product loop: the understanding artifact]
- **Acknowledgement** (September). An acknowledgement is a communication like any other, under Level 2's ten purposes and its deferral conditions. No "message received" reply by default (25 September). [Level 2 communication; the product loop, C4]

**How the study was worked** (5 September)
- Externals are inspiration, not a menu.
- Plain language, never product-name shorthand.
- Step instructions belong to memory and knowledge, not to the constitution.

## Part 6. Watching the system

**Two responsibilities over one record.**
- **Explainability** turns a recorded reason into something a person can use, at that person's depth.
- **Observability** is the product team's full view: every step, in development and production, with the health signals that say behaviour is still sane.

**Five ways things go wrong**, checked from cheapest to dearest:
1. **A broken invariant**: a guess shipped, a silent failure, an action outside its grant. Checked always.
2. **A broken ending**: a story resolved with an open ask; "no source" declared where a source existed; a wait ended without its release rule. Checked always.
3. **An answer to the wrong question** (the TeleChat defect): subject mismatch, grounding misses. Checked per interaction, with judges sampled.
4. **Drift**, in the model provider or in Tend's own harness. Checked on a schedule.
5. **Odd operations**: loops, repeated escalations, unusual paths. Checked on a schedule.

**Two hulls watched separately.**
- **The model provider:** fixed probe prompts are run on a schedule, and the outputs are compared with a baseline.
- **Tend's harness:** golden trajectories run on every change, and sampled production traces are replayed.

The observer reports on the same event fabric as everything else.

**Where findings go.** A finding about one situation becomes a fact in that situation. A serious one enters the failure path. Every finding lands in the traces, and from there in the golden sets.

**Reconstruction** is a view over what was recorded as it happened; nothing new is recorded afterwards.

## Part 7. Improving the system

**Three surfaces.**

| Surface | What changes | How | Risk |
|---|---|---|---|
| Text: skill text, step instructions, tool descriptions | the words a stage sees | prompt optimization, checked against golden scenarios | low |
| Harness code: checks and guards | the fixed code around the model | targeted patches from failure traces | medium |
| Model weights | how a model reasons inside its shapes | supervised training, then preference training, from checked traces | highest; only within the acceptable-learning boundary |

**The tools.**
- **GEPA** (reflective prompt evolution, in DSPy) reads execution traces to see why a candidate failed, proposes new text for one AI step at a time, and keeps a Pareto frontier.
  - Verified against its paper: up to 35 times fewer rollouts than reinforcement learning with LoRA (24,000 rollouts, Qwen3-8B); an aggregate gain of +14%, against MIPROv2's +7%; prompts up to 9.2 times shorter; it can improve with as few as 3 examples.
  - It needs a score with written feedback. Tend's checks give both, without a judge model.
- **AutoSaddler** diagnoses failure traces and patches the harness, keeping only patches that generalize.
- **Automata** learns the shape of expected behaviour from traces.

**The pipeline.**
1. Tend's harness, in TypeScript, emits traces.
2. An optimizer service, in Python, reads them, proposes changes, and checks them against golden scenarios in a sandbox.
3. It opens a pull request carrying before-and-after scores on training, validation and held-out sets, the diff, the cost, and an authority check.
4. A person or a policy merges it, and the next traces confirm the change.

**What may be optimized** (Swaraj's correction, 5 September). Only memory and knowledge's step instructions, skill text and templates. The constitution is permanently human territory. The optimizer cannot fix a wrong stage design, a wrong check or a wrong context slice; those are code and design.

**The AI steps the optimizer works on, one at a time.** These are the reasoning artifacts of the product loop:
- the understanding artifact;
- the situation's understanding;
- the information plan;
- the decision;
- the message;
- memory and knowledge's package.

**Training a model.**
- **The goal.** It learns Tend's way of working (the artifact shapes, "stop and ask", "defer to code", honest endings), never the business, which lives in skills and memory and knowledge.
- **The order:**
  1. supervised training on checked artifacts, including honest refusals;
  2. preference pairs from signals outside the model;
  3. reinforcement only where a check is the true signal.
- **Adapters.** Small adapters, one per stage or per kind of failure, versioned like skills, rolled back by switching version.

**Which signals to trust.**
- **About the machinery:** traces, check failures, tool results and replays are trustworthy.
- **About the outcome:** only a confirmed customer outcome says an ask was answered. "The tool call completed" never does.

**Evaluation, one rung at a time.** Measure the base model first. Then add one rung at a time and measure again:
1. the prompt;
2. the tools;
3. the harness;
4. memory and knowledge;
5. fine-tuning;
6. which model serves which stage.

Change one rung, replay the golden sets, and credit a gain only when the deterministic measures move.

**Golden scenarios.**
- Nine families, from Level 1's failure classes: missing information; conflicting information; incorrect information; unavailable actors; authentication and authorization failures; business-rule violations; communication failures; business inaction; unexpected situations.
- A set of expected refusals.
- Memory and knowledge's four measures: repeated mistakes, stale-memory use, policy conflicts, replay regressions.

**Two more rules.**
- **Which steps become training traces:** an AI proposed something, code checked it, and an outcome followed that can be matched to it. Everything else is audit only.
- **An untested experiment worth running:** a small model with a thick harness against a frontier model with a thin loop, on the same golden set, scoring predictability and quality separately.

## Part 8. Data and compute

These are Level 3 choices, recorded in September because the build needs them. Tend is on Cloudflare.

**Conversations and situations are different things** (Swaraj's correction).
- A conversation is one thread between Tend and one person on one channel.
- A situation spans conversations, and holds references to every conversation and message it depends on.
- The situation record is the point where the parts meet.

**Compute.**
- **The conversation manager is a Worker, one per business.** It holds no state of its own and handles thousands of arrivals at once. It runs the arrival loop and the update loop.
- **The situation worker is a Durable Object, one per situation, all of one class.** It handles one event at a time, so no two runs touch one situation together. Its alarms serve check-ins, timeouts and deadlines. Its own small database holds only working state and logs. It runs the situation loop.
- **Arrivals during a run wait in line.** An arrival that lands while a run is working queues inside the Durable Object. The next step reads the newest version and reassesses.
- **No direct calls.** The conversation manager never calls the Durable Object; a new version of the situation wakes it.
- **The communication layer and memory and knowledge's background parts** consume events from the queue.

**Where data lives.**

| Data | Where | Why |
|---|---|---|
| Configuration: grants, policies, channels, roles | each business's D1 database | strongly consistent, small |
| Learned knowledge | each business's D1 | typed, versioned, found by scope first |
| Situation versions; the situation registry | each business's D1 | shared by the Worker and the Durable Objects |
| Conversations; message metadata | each business's D1 | indexed by person and by situation |
| Message content; attachments | R2 object storage | large, cheap to keep |
| Working state and logs of a run | the Durable Object's own database | not authoritative; rebuilt from D1 after a crash |
| Traces | R2, written in batches through a queue | very many, written once |
| Training data; golden scenarios | R2 | immutable once checked |
| Skills and procedures | object storage, versioned | they change often, independently of code (Swaraj, 28 October) |
| Cache: context slices, sessions, summaries | KV | fast, short-lived, rebuildable |
| Cross-business analytics; the tenant registry | a separate analytics D1 | fed by the event stream |
| Meaning index | a scoped, per-business vector index (Vectorize is the candidate) | holds references only; a hit is a candidate, never an authority |

**Growth.**
- **Volume.** About 200 MB a month for a small business, against D1's 10 GB limit.
- **Archival in tiers.** Hot for the first 90 days; warm from day 90 to day 365, with content moved to R2; after a year, cold in R2, with a pointer left in D1.
- **Backup.** D1 point-in-time recovery, plus exports to R2.

**Concurrency, settled in September.**
1. Events for one situation are handled in arrival order.
2. Situations never wait on each other's completion, so no deadlock is possible. They read each other; they never block on each other.
3. Every write to a situation is conditional on the version it read. A rejected write means re-read and reassess.
4. Repeated arrivals are dropped at intake. A repeat that slips through is harmless, because adding a reference that already exists changes nothing.
5. There is no ordering across situations; where a sequence matters, it is recorded as data.
6. Six guarantees per wake:
   - one event at a time;
   - read the newest version;
   - write on the version read;
   - reassess between events;
   - recover from D1;
   - a bounded number of rounds.

## Part 9. Event-driven mechanics and the prompt constitution

**No part polls.**
- The book of waits is the subscription list: each waiting situation names what will wake it.
- The situation registry, together with the arrival loop, finds which situation an event belongs to.
- The only scheduled wake is each wait's check-in, which makes forgotten work impossible.

**Write and announce together** (5 September). Whoever saves a new version of a situation emits its event in the same run. An unannounced write is an unfinished job, and is retried.

**The cache never guards a decision** (5 September). A cache may make reads faster. Anything that allows or forbids an action reads the authoritative store.

**A rule change needs no event.** Situations read rules fresh at every wake, and the permission check at each action is the hard gate. A business that wants situations woken on a rule change can have that as configuration later.

**When events go wrong.**
- A duplicate delivery is harmless: the worker sees the version was already handled.
- A lost event heals at the next check-in.

**The prompt constitution** ([Level 2](Level%202/prompt_constitution/understanding_the_prompt_constitution.md)):
- **Rules live in configuration and checks**, never in prompt text. Swaraj's example: "Refund period is seven days" is configuration that the refund tool reads; "Speak to me in Hindi" is a preference, placed at the writing step by memory and knowledge.
- **Four layers of text:**
  - a universal core, true at every step;
  - a stage constitution for each stage of the product loop;
  - preferences placed at runtime;
  - assembly templates, owned by memory and knowledge.

  The first two are human-written and versioned with releases.
- **Writing discipline:**
  - case-general principles only;
  - positive alternatives over prohibitions;
  - short, for each stage;
  - anything code can check is code.

## What this file does not contain

- Tend's loops: they are in [the product loop](Level%202/the_product_loop/how_does_the_product_loop_work.md).
- Level 3 choices not listed in Part 8: queue settings, model choices, field names.
- Any claim that an aligned idea is adopted. An idea is adopted only when a design uses it and survives review.

## Where the old parts went

Pages written before 29 October cite this study by its old part numbers.

| Old reference | Now |
|---|---|
| Parts 1 and 2 (the repositories and papers) | Part 2, condensed |
| Part 3 (findings), Part 4 (what Tend does differently), Part 5 (decisions fed) | Parts 3 and 4 |
| Part 6 (the conversation manager's loop: WHO, MEANING, VALIDATE) | Removed; replaced by [the product loop](Level%202/the_product_loop/how_does_the_product_loop_work.md), part C. Its communication rules live in Level 2 communication |
| Part 7 (observability) | Part 6 |
| Parts 8 and 9 (improvement; prompt optimization) | Part 7 |
| Part 10 (memory, now memory and knowledge: Utopia, Supermemory, the rulings, the defence) | Part 2 (the sources) and Part 5 (the rulings); the design is the [memory and knowledge design](Level%202/memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops.md) |
| Part 11.2 (memory, now memory and knowledge, as observer and loader; the routing slice; two kinds of writes; the loop decides to loop) | Part 5 |
| Part 11.3 (the situation worker's per-wake contract: WAKE, PROPOSE, VALIDATE, EXECUTE, UPDATE) | Removed; replaced by [the product loop](Level%202/the_product_loop/how_does_the_product_loop_work.md), part D |
| Part 11.4 (TeleChat's per-step context, verified) | Part 2, the TeleChat row |
| Part 11.6 (Forks A, B and C) | Part 5 |
| Part 12 (verification, products, the conversation manager's questions, golden scenarios, optimizer wiring, fine-tuning, signals, evaluation, lineage) | Parts 2, 5 and 7 |
| Part 13 (data and compute; concurrency) | Part 8 |
| Part 14 (event-driven mechanics; the prompt constitution; the optimizer boundary) | Parts 5, 7 and 9 |

## Changelog

- August and September 2026: the study, in fourteen parts, over several sessions.
- 29 October 2026: rewritten, on Swaraj's instruction. The drafted loops were removed, and the catalogue of kinds of LLM interaction was added.
