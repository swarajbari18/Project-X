# Handoff — Software Factory with Coding Agents (major research pillar)

> Paste this at the start of a fresh chat AFTER the standard opening order: `base_prompt_for_research.md` first (end to end), then `conversation with swaraj.md`, then establish the status quo per `status_quo.md`. This file is the task prompt on top of that base. The engineering study (`agent_harness_study.md`, Parts 1–12) is now COMPLETE — this is the next major research pillar, a dedicated chat of its own.

## We just completed

The engineering study stands complete at twelve parts in `knowledge_base/agent_harness_study.md`. The base prompt §12 engineering items are all closed and synced. That study tells us **WHAT Tend does and how we know it's correct**.

This pillar tells us **how we actually BUILD all of Tend using coding agents** — and the framing matters. The agent's job is TRANSLATION of a natural-language implementation plan into code, NOT autonomous software engineering. The agent proposes; our deterministic system authorises and verifies. That is the same discipline Tend applies to business actions, now applied to its own construction.

The hard problem is REVIEW, not planning. How do we review large volumes of code in languages Swaraj may not be fluent in? How do we guarantee agent-written tests are exactly the plan's test cases and the agent isn't cheating (weakened assertions, mocked-away behavior, fake passes)? How do we test end-to-end without fluency?

## Now I want to research the software factory with coding agents — in this order

Work them in conversation first, exactly like the engineering study sessions. Do not write files without my explicit OK at the natural checkpoints — when I say "write it", the decisions land in a dedicated software-factory document (location TBD with my OK) with a changelog. This pillar is the "software factory with coding agents" section of the original breadth-first scope (base prompt §4A scope item 15, base prompt §16). Start every item from the problem, Level 2 first.

### 1. The review problem (test integrity, anti-cheat, review without fluency, e2e testing)

The central research question: **how do we know agent-written code is correct when the reviewer may not be fluent in the language?** Ground this in the Explainability & Observation category's "reconstruction" discipline and the engineering study's no-model-numbers rule — the review cannot rely on the agent's own assurance. Decide: what makes a review trustworthy? Research the failure modes the engineering study identified: tests that over-broad or tautologically pass; deleted cases; tests that pass for the wrong reason (mock everything away, hard-code the expected answer, ignore the real code path); tests added to look thorough but testing nothing. Each must have a named countermeasure.

### 2. No cheating on results

How do we stop an agent from manipulating test cases or CI output to "show green"? Decide the countermeasures: named test IDs traceable to plan items; immutable expected values committed in the plan; running the tests in an environment the agent doesn't control; mutation of the expectation to prove the test would catch a real bug; coverage of the named cases; and treating "all tests pass" as evidence *for review*, never as truth. Connect to the engineering study's evaluation ladder (all-green is one rung, not the ceiling).

### 3. Review without language fluency

Can Swaraj review code even slowly, with basic intuition and an understanding of the plan? Yes — research the method: (a) traceability — every plan item and test case maps to a code location; (b) read tests first, they encode the contract; (c) run the tests and inspect failures; (d) spot-check the logic of the critical modules against the plan; (e) trust the deep-module structure so each module can be read alone; (f) use the agent as an explainer for specific sections, but never as the sole judge. This item produces the concrete review protocol.

### 4. End-to-end testing without fluency

How to verify the whole thing works together — staging environment, seed data, a runnable demo against the real stack, smoke scripts, and Cloudflare's local dev/edge tooling. Decide: what does "end-to-end" mean per feature, and how does a non-expert run it and read the result? This is where the "honest ending" discipline from the situation-worker loop meets the codebase: a feature isn't done until a named script demonstrates it against real (or real-seeming) data.

### 5. Separation of reviewer vs. implementer

### 6. Codebase structure: deep modules / sub-modules (Swaraj's preferred architecture)

- A **sub-module** is an independent subsystem that groups a particular set of responsibilities that change together. Sub-modules interact in multiple ways to create capabilities.
- **No central test repository.** Each sub-module owns everything itself: its own code, its own test folder, its own guidance on how to test it, and its own documentation / markdown files specific to it. A sub-module should be readable and testable as an independent thing.

Decide the research questions: how to define module boundaries and public contracts between modules (what is exported, what is private); dependency rules (which modules may depend on which; no circular deps); how independent testability is enforced; how integration between modules is tested; how module documentation is kept truthful alongside code; how this maps to Cloudflare (Workers, Durable Objects, shared packages); and how a module-based repo scales to many modules without a monolith.

### 7. Implementation, deployment, and operation best practices

- **Generic practices:** version control workflow, branch/PR discipline, review gates, commit hygiene, migrations, secrets handling, error handling, logging, CI/CD, and why each matters when the implementer is an agent.
- **Cloudflare-specific (Level 3, but the practices are researchable now):** Workers, Durable Objects, D1/KV/R2, per-tenant isolation, local dev (`wrangler`), edge deployment, canary/rollback, secret management, rate limits, cost control, and the Cloudflare "philosophy" (collection of pre-solved problems; per-tenant one-Worker isolation; decide which primitive fits each data kind).
- **Testing stack practices:** unit, integration, e2e; what belongs where; how tests run in CI; what "green" means and doesn't mean.
- **The product implementation workflow:** plan → task breakdown → agent implementation → review gate → integrate → deploy → observe. How the review gates actually block bad code.

## Ritual and rules (non-negotiable)

- Start every item from the problem, Level 2 first. Factory decisions are product decisions — they belong in the conversation first, then a software-factory document.
- Ground in the knowledge base before proposing anything — re-read the relevant category files IN FULL (Explainability & Observation, Compliance & Security, the engineering study Parts 6–11 for the loop/validator/trace discipline that the factory must preserve). Our first-principles answers outrank any external CI/CD or module template.
- Research external coding-agent workflows, review tooling, and module-based repos for *inspiration only* — same align/invalid discipline as every engineering-study source. Our Level 2 decisions outrank everything.
- Web work goes through TinyFish (base prompt §13) for current tooling docs, Cloudflare best practices, and coding-agent research.
- No model-generated numbers in control paths; states and structured matches decide (carries over from the engineering study) — this applies doubly to the factory, where the agent must never be the judge of its own output.
- At the end of the stint: update the base prompt §16 and §18 sync so the next chat starts correct — with my OK.
The same agent that wrote the code should not be the one asserting it is correct. Decide: should a second agent (fresh context, given only the plan + code) or human judgment be the review authority? What does the second agent see, what does it do, and what does it NOT see (so it can't rationalize the first agent's choices)? Research whether this separation is a real safeguard or theater.