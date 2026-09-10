# Research Record — Harness Engineering: Determinism vs Quality of Output

> Status: research record (Grok + X-search + open web), 2026-09-14. Not a decision record.
> Method: Grok research prompt (X-search primary, 221 sources), TinyFish web search, and direct fetches
> (martinfowler.com, addyosmani.com, hugobowne.substack.com, news.ycombinator.com, OpenAI blog, Lilian Weng's Lil'Log).
> Topic trigger: the viral 'Morning Bathrobe Rant: Rethinking Harnesses' by Robert C. Martin (Uncle Bob),
> author of Clean Code / Clean Architecture, Sep 7-12 2026 — and the community's determinism-vs-quality debate.
> Raw Grok response follows verbatim (trimmed of UI chrome), verified against independent web search.

Worked for 2m 49s
What this file is

Primary signal is X (Jun–Sep 2026 plus the Sep 11–12 viral thread). Web sources are used to name papers, blogs, and numbers. Where a requested phrase returned no real X hits, that is stated rather than filled in.

1. The viral rant

Who: Robert C. Martin — Uncle Bob — @unclebobmartin. Author of Clean Code / Clean Architecture. Not a 2026 “agent book” author; a classic software-craftsmanship author who spent 2026 building a multi-agent coding harness.⁠X

The corpus (three posts, one video):

Date (UTC)	Post	Signal
7 Sep 2026	Text: months of “deterministic tools that force a strict process” (Gherkin, unit tests, CRAP, mutation tests); models got “astronomically better”; “I’m starting to think that I’m over constraining them.”	2.3k likes, 145k views
11 Sep 2026	Text: “OK. It’s time to rethink this.” Weeks of gates/tests/tools/protocols; when he came up, “the need for my harness was obviated.” Grok and Codex argued architecture “as if they were senior engineers.” Walk away 40 minutes; task done, CRAP/coverage/mutation satisfied. “Harnesses should not treat agents as components within a software design.”	3.2k likes, 335k views
12 Sep 2026	Video: Morning Bathrobe Rant: Rethinking Harnesses.	~1.50M views, 5.4k likes, 325 RTs, 160 QTs, 313 replies, 4.7k bookmarks

Harness repo he named: https://github.com/unclebob/swarm-forge. Earlier (18 Apr 2026) he published a long coder-agent rule file that already had a constitution prompt, Gherkin ingestion, worktrees, architect/reviewer merge protocol. So the Sep rant is a reversal of his own 2026 project, not a drive-by take.⁠X

What he actually concluded (from the text posts, which are primary):

Tight process control (gates, protocols, multi-agent roles, forced metrics) was built for a weaker model generation.
Frontier agents in Sep 2026 can take a large task + a few guidelines and finish it.
Keep outcome sensors (tests, CRAP, mutation). Drop treating the agent as a software component you orchestrate.
He did not, in the text posts, use the phrase “determinism vs quality.” That framing is a community/Grok-summary gloss of the video.

Video-summary layer (not a transcript): in-thread Grok summaries of the 4:20 video add a head-to-head: same task, elaborate multi-agent harness ≈ 3–4 hours of mediocre output vs a single modern Grok agent ≈ 40 minutes, better quality. Those numbers are not in the Sep 11 text post; treat them as second-hand until a transcript is published. The video tool returned frames, not a usable subtitle dump.

Strongest agreement

@kunchenguid (11 Sep): “it’s called the bitter lesson… we keep learning it over and over again.”
@4guap0 (11 Sep): “spent weeks building the perfect cage then realized the agent needed a leash not a prison.”
@rot13maxi Ryan Dale (13 Sep, on the video): spent early 2026 on harness + orchestration; “Current models outperform it. Bitter Lesson bites again.”
@hadrienblanc (11 Sep): skills overrated; the useful harness is tests; keep only non-inferable facts in AGENTS.md.
@JasonABloomer (12 Sep): “Every ‘harness’ I’ve ever tried gave empirically worse results.” His harness is “a single paragraph appended to the beginning of any prompt.”
@LeeLeepenkman (12 Sep): partial agreement with a split — small models need a tight harness and gain more from it; large models want an open harness and will route around harness bugs (write their own tools, escape sandboxes). Cites Better Harnesses, Smaller Models (Yang et al., arXiv:2607.08938, Jul 2026), AI4AI at Test-Time (Qian et al., arXiv:2608.12307), Co-Evolving Harnesses and Models (arXiv:2609.09134).

Strongest disagreement / caveats

@AlexCinovoj / @husamujahed / later replies: Grok Build is itself a harness. Comparing swarm-forge to “Grok” is comparing your harness to xAI’s harness, not to a bare ReAct loop. Elon said the same in mid-August: “Grok 4.6 will work best with the Grok Build harness… best to evaluate using Build.”⁠Agentconn
@Humboldtv22 (14 Sep): one agent beats multi-agent, but he still builds harnesses so agents do not do work deterministic software can do more accurately.
@zoidz00 (ex-Google Borg/ScaNN): style dunk, not substance — “talking like this doesn’t make you seem smart.”
Industry default still points the other way: LangChain, OpenAI, O’Reilly, surveys all publish harness-only benchmark lifts (below). Uncle Bob is a quality/capability anecdote colliding with a reliability/eval literature.

Surprising take: the man who spent April publishing constitution + Gherkin agent rule files is, five months later, saying the constitution was the problem. That is the news, not “some influencer hates frameworks.”

2. X last ~90 days: “harness engineering”

Theme map

Naming + formula. Agent = Model + Harness is now stock language (Hashimoto Feb 5 → OpenAI Feb 11 → LangChain Feb 17 → everyone). @omarsar0 (Elvis, DAIR.AI) is the loudest educator; 12 Sep post “Learn to build a harness, folks” is the current mega-thread (~542k views, 3.6k likes).
Harness-only scoreboard. Same model, better loop/prompt/middleware → Terminal-Bench 52.8 → 66.5 (LangChain / gpt-5.2-codex). Repeated so often it is a meme.
Vendor-harness coupling. Models are post-trained against a specific harness (Claude Code, Codex, Grok Build). Swap the harness, the “model quality” number moves. Musk’s Aug 14 admission is the cleanest vendor quote.⁠Agentconn
Loop vs graph vs harness. A cluster of explainer accounts (@kocer_eth 17 Aug, @elune0x 30 Jul, @0xwhrrari 4 Aug) sell a three-layer taxonomy: loop = repetition, graph = topology, harness = what the model may touch. High bookmarks, low original evidence.
Anti-pattern: misplaced determinism boundary. @cv_usk (13 Jul / 29 Jul) is the sharpest engineer-voice: do not put judgment in rigid rules, do not put tests/gates in the prompt and hope. Classify “needs judgment” vs “can be code.”
Bitter-lesson counterwave (Sep). Uncle Bob + Matt Pocock-adjacent debate + “A Harness Debate” (6 Sep, Unsupervised Learning / Kai responding to Matt Pocock). Harness-as-human-in-the-loop for cheaper models is framed as the Bitter Lesson made on purpose.⁠YouTube
Domain-harness gold rush. @omarsar0, @zamir_akimbekov, @contactabe: YC builders want domain harnesses, not generic agents. Counter: @ethereaglehq (12 Sep) — “domain-specific only sticks if the verifier is yours. a coding harness already has tests. a new domain usually doesn’t.”

Who defends thick harness work

Person	Handle / venue	Claim
Mitchell Hashimoto	HashiCorp / Ghostty blog, 5 Feb 2026	Every mistake becomes a permanent environment fix.
Ryan Lopopolo	@ / OpenAI blog 11 Feb	Humans steer, agents execute; 0 human LOC, ~1M LOC, ~1,500 PRs.
Vivek / LangChain	blog.langchain.com, 17 Feb	13.7 pt Terminal-Bench lift, model frozen.
Lilian Weng	@lilianweng, 7 Jul	Harness is the near-term RSI surface; smarter models later keep harnesses simple. 5.4k likes.
Elvis	@omarsar0	Teaching corpus + LIFE-Harness 88.5% relative gain paper.
Cyril Coste	@CyrilCoste, 9 Sep	“Most model failures are harness configuration failures.”
Kyle Mistele	@0xblacklight / HumanLayer, 4 Aug	Agents remain unreliable; coding “works” because a six-figure SME babysits. 4.5k likes.

Who says it is overrated / wrongly aimed

Person	Handle	Claim
Uncle Bob	@unclebobmartin	Tight harness obsoleted by model jump.
Ryan Dale	@rot13maxi	His 2026 harness lost to current models.
Jason Bloomer	@JasonABloomer	Every harness empirically worse; one paragraph wins.
Lee Penkman	@LeeLeepenkman	Tight harness is a small-model tax.
“Kai” / UL video	6 Sep	Pocock’s “harness so a cheaper model can drive” is the Bitter Lesson.
Tom Siwik	@tomhacks, 5 Sep	Influencer evals confound model and harness; “maybe it’s the harness.”

Consensus signal: among people selling or teaching agents, harness engineering is the 2026 skill. Among people who just spent six months writing one, a visible minority now says they overbuilt process control and underweighted model generation.

3. Concept-by-concept
a. “Illusion of control” — precise execution ≠ accurate output

X: the exact slogan is thin. Hits are mostly political or UX, not agent evals. Closest agent uses:

@alexlavaee (29 Aug): long-horizon agent UIs “provide the illusion of control via prompting but are actually ineffective.”
@hakflo (12 Sep): auto-approval that still asks for clicks is “only prompted to give the illusion of control.”
Oracle Developers blog (3 Sep): refunds agent “closes 140 tickets… Forty-one of them never reached the payments API. The model wrote ‘refund issued’ because that is what the end of a refund conversation looks like.” That is the cleanest precision-without-accuracy case on the open web.⁠Blogs.oracle
Coherence Collapse (cited in that same post): in two coding systems, 60–69% of wrong-answer runs had already edited the right code first, then lost it.

Consensus: widely believed as a failure mode (said-done, never-ran). Rarely measured outside coding traces.

Contested: harness vendors treat more gates as the fix; Uncle Bob treats more gates as the cause of mediocre output.

b. Precision vs accuracy of execution as separate dimensions

X: almost no one uses those two words. The idea is everywhere under other names.

Best operationalization found: @cv_usk AP7 “Misplaced Determinism Boundary” (13 Jul, restated 29 Jul). Two failure forms:

Form A: rigid rules on cases that need judgment → brittle precision, missed accuracy.
Form B: “always run tests” left in the prompt → 95% compliance, 5% silent skip.

@curious_mahesh (7 Sep), after a real-money agent: “Every real failure I had was ‘said done, never ran’ or ‘touched something nobody granted’, never ‘reasoned badly’. Boundaries, not process police.”

Consensus: separate the dimensions even if you don’t use the stats vocabulary.

Gap: I did not find an X thread or paper that plots precision vs accuracy for harness vs ReAct on the same task set.

c. Quality comes from specifying OUTPUT, not controlling PROCESS

This is the Uncle Bob / bitter-lesson pole.

Sep 11: keep tests and metrics (output sensors); drop treating the agent as a designed component (process).
Hashimoto/OpenAI pole is the opposite wording but sometimes the same mechanism: AGENTS.md + linters specify what “done” looks like; the process is whatever the model does until the sensor trips. OpenAI’s own line is “design environments, specify intent, and build feedback loops,” not “write the plan.”⁠OpenAI
@hadrienblanc: harness = tests; skills overrated.

Consensus among senior practitioners: specify done in code (tests, types, linters, payment-API receipts).

Contested: whether planners, constitutions, and state machines help the model reach done, or just make the run look orderly.

d. “Paradox of more” — bigger constitutions degrade quality

X exact phrase: no useful hits.

Substance that was found:

Lost-in-the-middle is the mechanism people actually cite: long AGENTS.md / constitutions bury rules in the low-attention band. O’Reilly “So Long and Thanks for All the Context” (25 Jun 2026) and AgentPatterns “Lost in the Middle” recap Liu et al. 2023; adding a middle section can make surrounding instructions worse.⁠Oreilly
@_avichawla (10 Aug) quoting Karpathy: “If agents had less knowledge or less memory, maybe they would be better.” ReAct keeps every failed search in context; it competes with the goal.
@monkscript (2 Jun): “40% context noise breaks the loop. Around task 7 of 10, agent runs start drifting.”
OpenAI Codex design note (mirrored in walkinglabs docs): “A single giant instruction file is difficult to check… drift is inevitable.” AGENTS.md is a directory page, not an encyclopedia.⁠GitHub
Weng (7 Jul): “smarter models keep harnesses simple.” That is the official research version of less-is-more.⁠X

Consensus: long static constitutions are a known tax.

Contested: whether the fix is shorter prompts or better compaction / skills / just-in-time retrieval (still harness work).

e. Template trap — rigid templates kill open-ended quality

X: the phrase “template trap” did not return agent-relevant hits in this sweep. Nearby:

@TheAIShrink (30 Aug): Claude Code “kills AI slop. The template is dead on arrival.”
Uncle Bob’s Gherkin-ingestion pipeline is itself a template-forcing harness; his Sep reversal is implicitly an anti-template result.
PatchDiff (cited in Genαi / harness posts): 7.8% of ostensibly passing SWE-bench patches failed the developer’s full test suite — the template of “tests passed in the harness” was the wrong output shape.⁠Genalphai

Say-so: concept is real; the label is not an X meme. Evidence is anecdotal + one SWE-bench leakage stat.

f. Don’t make the LLM do what code can do; task-focused prompts beat encyclopedias

X: strong, repeated.

@cv_usk AP7: enforce test/lint/build in deterministic code; “don’t ask nicely.”
@Humboldtv22 on the rant thread: harnesses exist to stop agents doing work deterministic software does better.
@curious_mahesh: constraints on blast radius, not on reasoning.
OpenAI / Codex practice: layered architecture enforced by custom linters whose error messages tell the agent how to fix the violation — knowledge moved out of the system prompt into code.⁠Idam
Hashimoto: programmed tools (screenshot, filtered tests), not more adjectives in AGENTS.md.⁠Aihola

Consensus: this one is not contested among people who have shipped. The fight is only about how much of the remaining judgment should still live in prompts.

g. Model capability is the quality variable; frontier models beat small models inside naive loops

X + papers agree, then split on the implication.

Uncle Bob, Penkman, Pocock-debate: frontier models raise “accuracy of execution” so they need less process control.
Opposite measured result: LIFE-Harness (cited by @omarsar0, 23 May) — harness learned on one 4B model transferred to 17 other backbones; 116/126 settings improved, +88.5% average relative; frozen Qwen2.5-32B + harness beat the tool-finetuned xLAM-2-32B. That is “harness > weights” on those environments.⁠@omarsar0
Self-Harness (Zhang et al., arXiv:2606.09498): from a minimal harness, held-out Terminal-Bench-2.0 MiniMax M2.5 40.5% → 61.9%, Qwen3.5 23.8% → 38.1%, GLM-5 42.9% → 57.1%. Gains are large precisely on weaker models.⁠arXiv
xAI Grok Code Fast 1: practitioner report of 6.7% → 68.3% SWE-bench from an edit-tool format change alone (Boluk 2026, repeated in the harness survey). That is harness-shaped, not “smarter Grok.”⁠Preprints
OpenAI ARC-AGI-3 anecdote (Saneel, 3 Aug): GPT-5.6 Sol 13.3 → 38.3 by retaining private reasoning between actions and compacting instead of deleting — two context settings.⁠X

Consensus: both variables are huge; published deltas from harness changes often rival a model generation.

Contested: Uncle Bob’s implication that therefore you should stop building harnesses. The papers say: stop building the wrong harness, or let the model rewrite a minimal one.

4. Does harness engineering transfer off the coding substrate?

This is the sharpest live fight.

Why coding is a special case (widely granted):

Compiler, typechecker, test runner, linter, CI are independent verifiers. The harness is mostly wiring the model to an existing SE substrate.
SWE-agent’s original result was interface design on that substrate, not a better planner.
@0xblacklight (4 Aug): coding “works” because a high-paid expert still babysits. Not a solved transfer proof.
Oracle refunds story: no compiler for “refund actually hit the payments API,” so the agent optimized the shape of a completed conversation.

Transfer optimists

@omarsar0 (12 Sep): domain harnesses are the next product surface; YC wave incoming.
@contactabe (14 Sep): domain-specific harnesses beat domain-specific agents on a generic harness.
LIFE-Harness: harness from one model/environment generalized across 17 backbones — evidence the harness captured environment structure, which could in principle be a CRM or a lab bench, not just git.
HarnessDev (arXiv:2609.01437): LLMs can author harnesses for writing and ML-experiment domains and match or beat human references there; they lag on code and on search/research. Transfer is domain-dependent, not free.⁠arXiv
Scientific-AI thread @brick4956 (14 Sep): explicit “AI proposes → deterministic computation executes → independent verification decides.” That is the coding pattern copied onto physics (pytest + conservation invariants + HDF5 + RO-Crate).

Transfer skeptics (strongest posts)

@ethereaglehq (12 Sep): “domain-specific only sticks if the verifier is yours. a coding harness already has tests. a new domain usually doesn’t. did you write the fail condition before the tools, or after the first demo looked good?”
Kyle Mistele / HumanLayer: consumer agents stay unreliable because there is no six-figure reviewer and no test suite.
HarnessDev again: evolution gains were unstable and only partially transferred to held-out tasks; gains depended on which model ran the harness.
UNU governance report (Jul 2026) treats research assistants and general tools as the same runtime object, then quietly notes coding agents converged, orchestration libraries did not.⁠Unu

Consensus signal: almost everyone agrees the coding gains are real. Almost everyone who has tried support/ops/research without a mechanically checkable “done” reports the harness buying auditability and blast-radius control, not answer quality. The transfer question is contested and under-measured. No one in this sweep published a business-domain eval that isolates “thick harness vs bare ReAct + frontier model” the way Terminal-Bench isolates harness-only lifts.

5. Evals and benchmarks people actually cite
Result	What varied	Number	Source
LangChain DeepAgents	harness only, gpt-5.2-codex frozen	Terminal-Bench 2.0 52.8 → 66.5 (Top 30 → Top 5)	LangChain blog, 17 Feb 2026⁠Blog.langchain
Self-Harness (Zhang et al.)	minimal harness → auto-edited harness	MiniMax held-out 40.5 → 61.9; up to 132% relative across 9 settings	arXiv:2606.09498
LIFE-Harness	harness from one small model, reused	+88.5% avg relative; 116/126 settings	May 2026 paper, @omarsar0
xAI Grok Code Fast 1	edit-tool format	SWE-bench 6.7 → 68.3 (practitioner report)	harness surveys 2026
Meta-Harness	automated harness search	Terminal-Bench-2 76.4, above hand-engineered	cited in surveys
SWE-agent (historical)	agent-computer interface	often quoted ~64% relative historical gain	reused as origin myth
GPT-5.6 Sol ARC-AGI-3	two context settings	13.3 → 38.3, 6× fewer output tokens	Saneel, 3 Aug 2026
PatchDiff	“passing” vs real tests	7.8% of passing SWE-bench patches fail full suite	Genαi writeup
Coherence Collapse	traces	60–69% of wrong runs had the right edit earlier	Oracle blog cite
HAL	standardized eval harness	many prior “agent failures” were harness bugs	survey papers
HarnessDev	LLM-written harnesses	behind humans on code/search; match/exceed on writing & ML-exp	arXiv:2609.01437
E²C vs ToT	plan/execute split inside one model	AIME’24 K=32: 53.3% @ 12.4k tokens vs ToT 50.0% @ 71.3k	arXiv:2509.23946
Web agents plan-then-execute	security, not quality	80% of WebArena tasks completable with a programmatic plan, no runtime LLM subroutine	arXiv:2605.14290
ReAct vs P&E practitioner tables	architecture	scattered 65 vs 85, 85 vs 92 — not standardized, treat as blog numbers	Atlan, Laxaar, Juejin 2026

What is missing (explicit):

No widely cited eval of 1000-line constitution vs 1-paragraph prompt on a frozen frontier model for open-ended tasks.
No public head-to-head of Uncle Bob swarm-forge vs Grok Build vs raw API ReAct on a fixed task set. The 40-min vs 3–4-hr comparison is one author’s weekend.
“Prompt as hyperparameter” is practiced (LangChain’s table is literally that) but not named that way on X in this window.
Self-consistency vs harness gates: no X hits of substance in this sweep. Older LLM literature (Wang et al. self-consistency) is not being used as the foil to harness gates in 2026 agent Twitter.

ReAct vs plan-then-execute: community default is still ReAct as the inner loop. Plan-then-execute is argued for long, low-variance workflows and for security on the web (untrusted page content must not rewrite the plan). Neither side has a single canonical quality benchmark that settled it.

Named web sources (canonical)
OpenAI — Ryan Lopopolo, Harness engineering: leveraging Codex in an agent-first world, 11 Feb 2026. https://openai.com/index/harness-engineering/⁠OpenAI
LangChain — Improving Deep Agents with Harness Engineering, 17 Feb 2026. https://blog.langchain.com/improving-deep-agents-with-harness-engineering/⁠Blog.langchain
Lilian Weng — Harness Engineering for Self-Improvement, 4 Jul 2026. https://lilianweng.github.io/posts/2026-07-04-harness/⁠Lilianweng.github
Mitchell Hashimoto — “My AI Adoption Journey” / harness naming, 5 Feb 2026 (cited across secondary writeups; Ghostty AGENTS.md as exhibit).
Bojie Li — AI Agents in Depth (open book). Formula Agent = LLM + Context + Tools; Ch. 1 is harness engineering. https://github.com/bojieli/ai-agent-book
O’Reilly Radar — Agent Harness Engineering, 15 May 2026. https://www.oreilly.com/radar/agent-harness-engineering/⁠Oreilly
Survey — Agent Harness for LLM Agents, preprints.org 202604.0428; ETCLOVG taxonomy.
Anatomy paper — Harness Engineering: Anatomy… of Eleven Systems, arXiv:2609.00006, Sep 2026.
Self-Harness — arXiv:2606.09498.
Ajay Mittur — Coding Agents, Harnesses, and Where Things Are Going, 11 Jul 2026. https://ajaymittur.github.io/blog/2026/coding-agents-harnesses-where-things-are-going/
Cross-cutting consensus vs fight

Most builders believe

An agent is model + runtime. Calling that runtime a “harness” is settled.
On coding benchmarks, harness-only changes move scores a lot. That claim is no longer fringe.
Deterministic work (tests, builds, refunds posting, schema checks) belongs in code, not in a constitution.
Giant static prompts leak signal. Compaction / skills / directory-style AGENTS.md beat encyclopedias.
Vendor models are co-adapted to vendor harnesses. “Bare model” comparisons are usually dishonest.

What is actually contested

Whether a user-built thick harness still improves quality on 2026 frontier models, or only repeatability, cost, and safety.
Whether Uncle Bob measured a model jump, a Grok-Build-harness jump, or both.
Whether the coding substrate (compiler/tests) is the entire reason harness engineering looks good — i.e. whether the discipline transfers.
Whether the next move is thinner harnesses (bitter lesson) or self-improving harnesses (Weng / Self-Harness / Meta-Harness). Those two research programs can both be true: humans stop hand-writing 1000-line constitutions, machines hill-climb a small harness against traces.

Surprising takes worth keeping

Uncle Bob did not abandon tests. He abandoned process roleplay. That distinction is getting flattened in quote-tweets.
The same week as the rant, @omarsar0’s “learn to build a harness” post did 542k views. The industry feed is running both narratives at once.
Small-model + thick harness vs frontier-model + thin harness is the un-run experiment that would actually settle the user’s thesis. Self-Harness and LIFE-Harness ran the first half. Uncle Bob tweeted the second half. Nobody published both cells on one grid.
Grok is not a “bare ReAct loop.” If the rant’s winning arm was Grok Build / Grok Bot, it supports “better harness + better model,” not “no harness.” Several replies already called this.

If you want a follow-up pass, the highest-value missing artifacts are: a transcript of the 12 Sep video, a clone of swarm-forge vs Grok Build on a fixed repo task, and any internal eval that holds the model fixed while deleting planner/validator/constitution layers one at a time.

