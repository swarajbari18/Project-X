# Software Factory with Coding Agents — Section 16 research pillar

## Status

Study record for the software-factory research pillar (base prompt §16, §4A scope item 15). First conversation recorded: 2026-09-13, in parallel with the product-design pillar (Section 15).

This file preserves the shared walkthrough — Swaraj's raw thoughts, the reading of the old Kirana workflow, the challenges, and the working direction — as **material for examination, not decided architecture**. Open questions and provisional conclusions are marked as open at the end. Nothing in this file is adopted policy until Swaraj says so.

**Location note:** this is a provisional home, written next to `agent_harness_study.md`. The handoff said "location TBD with my OK." Move it wherever Swaraj directs.

**Sources used:** the base prompt §16 + `handoff_software_factory_with_coding_agents.md`; the actual Kirana TeleChat plans (`.cursor/plans/`), test files, and `system_Architecture.md` Chapter 15; four research sub-agents run in parallel for this conversation (test-case design method; anti-cheat; what-a-plan-must-lock; external practice); two research units on the human practice of review (practitioner voices from X and developer communities; the literature and corporate guidelines); and the `knowledge_base/Level 2/compliance_and_security/` documents read in full.

## Why this file exists

Tend will be built by coding agents. The engineering study (Parts 1–14 of `agent_harness_study.md`) settled **what Tend does** and how we know it is correct. This pillar is the other half: **how we actually build the thing with coding agents**, when the reviewer is Swaraj and the target languages are ones he does not read fluently.

The framing that governs everything here: the agent's job is **translation** of an approved natural-language plan into code — never engineering. The deterministic system authorises and verifies. This is the same discipline Tend applies to business actions, applied to Tend's own construction.

The working model the pillar assumes:

```text
PLAN (natural language) ── done by Swaraj with the agent as peer:
      business goal, design patterns, module boundaries, logic layout,
      WHICH file holds which logic, and the n test cases that define done
      ↓
CODE (translation) ── done by the agent: the implementation plan → code
      ↓
REVIEW (the hard part) ── done by Swaraj, with structure
```

## Where the conversation started (Swaraj's raw thoughts)

Swaraj's own account of the previous attempt, in his words:

- The old engineering philosophy (Kirana Telechat) worked only about **40%** of the time.
- **Reason one:** "It would generate the test itself in the runtime. The agent would after I made the plan, and due to that to actually see the test, I had to stop the agent every time it made a test." The tests were invented at implementation time, and he had to interrupt the run to even see them.
- **Reason two:** he did not know how to evaluate a test, or what a good test even looks like.
- **Reason three:** the project was in TypeScript, a language he did not know how to code in. "I was completely let's say overwhelmed."

What he wants instead:

- A way to **translate the implementation plan into test cases**, and to **think about the test cases himself, at plan time**.
- The plan contains **no code** — which files to make, what logic lives in each, what SQL to write, the whole design in natural language — so he can understand and own it.
- The planning itself is a **conversation with the agent, sub-module by sub-module**, deciding scope. The old project was organised into components, each with its own tests; the same shape carries over.
- In that planning conversation, he also wants to settle **design patterns and low-level design**: the agent asks him about patterns, they do trade-off and analysis, and they apply the three-level framework so that design patterns, abstractions, and interfaces are identified in the logic itself. This part is **engineering, and it belongs to Swaraj.**
- The implementation agent's only job is translating the plan to code. "Translation, not engineering."
- The first part of implementation is writing **all the test cases**, then writing the code with the test cases as a **verification gate at every step**. Simple gates (import gates, etc.) can stay simple; logic verification with tests is the difficult part.

*Note on one phrase:* when Swaraj said "we apply one of the three frameworks that we have," the working interpretation here is **the three levels of the three-level framework** (L1 problem framing, L2 concept/pattern, L3 technology) — applied depending on the decision at hand instead of letting the agent decide silently. This is recorded as an assumption to correct, not a ruling.

## What the old engineering philosophy actually did

Ground truth, from reading the Kirana files directly (not from memory):

**The engineering loop** (system_Architecture.md, Chapter 15): Architecture → Goal Document → Acceptance Criteria → Test Design → AI Implementation → Self-Verification → Cloudflare Deployment → Production Validation → Human Review → Accepted.

**Plans as goal documents.** Each `.cursor/plans/*.plan.md` was a locked Goal Document. Component 1's plan says it explicitly: "The implementing agent implements this document only — not chat history." Plans were large (roughly 600–1,500 lines each) and carried: an engineering-philosophy section (locked vs free decisions, non-goals), a module/schema section, tool contracts, a test-design section, a self-verification protocol, a deployment section, a production-validation script, and a human review checklist. Much of this discipline was genuinely good, and it carried over the deep-module structure (each component owns its code, its colocated tests, its docs; no central `tests/` folder).

**The test-design section existed but was thin.** Part 8 ("Test Design — Test-First Engineering") wrote tests as two-column tables:

| Test case | Expected |
|---|---|
| sendMessage success | POST to correct URL with JSON body |
| sendMessage API error | Throws TelegramApiError |
| userId 12345 | storeId "12345" |

These are *labels and wishes*, not contracts. No concrete URL, no JSON body, no setup data, no exact expected values, no locked strings in most cells. The plan said *that* a behavior should be tested, not *what* the test must assert.

**The self-verification loop** (Part 9): read Goal → implement one file at a time with its colocated test → run typecheck / lint / test → collect diagnostics → compare against acceptance criteria → revise → deploy → production-validate. Its own words: "The coding agent proposes; tests and production behavior decide. Never self-accept without independent evidence." Good principle; it had no mechanism to check that the *tests themselves* were faithful to the plan, because the plan had nothing concrete to check against.

**The production-validation spine actually worked.** Deploy to Cloudflare → run `queries-5.5.csv` rows through the deployed webhook (`scripts/eval/run-queries-5.5.ts`) → export agent traces → human Pass/Fail per row. These parts of the loop functioned as designed and should be treated as a keeper.

**The tests the agent actually produced were decent** — which is the crucial observation. Reading `src/khata/khata.test.ts`: named IDs traceable to plan areas (`KHATA-PLAN-01`, `KHATA-F-01`, `KHATA-GROUND-01`, `KHATA-PARAM-01`), concrete values (balance `20000` paise), refusal substrings (`expect(result.reason).toContain(...)`). The machinery of good tests was present in the agent's output. What was absent was any of it being **locked in the plan beforehand** — see the diagnosis next.

## The diagnosis — three failures, one counter-evidence

**Failure 1 — The plan named tests but did not write them.** At the exact seam that matters — the test's input and expected output — the plan went silent. Part 8 gave a label and a wish; everything concrete (the URL, the JSON, the exact expected value) was left for the agent to invent at implementation time. That is precisely what Swaraj experienced as "the agent would generate the test itself in the runtime" and why he had to stop the agent to see any test at all. **The plan carried the bulk, but at the seams that matter it carried nothing.**

**Failure 2 — There was no standard for "a good test."** With no definition of good, there was nothing to evaluate against. Swaraj could not tell a meaningful assertion from a hollow one, and no structure existed to help him. (Section on the standard: see "The core principle" and "How to think of test cases.")

**Failure 3 — Language.** TypeScript. Even a perfect test was born as an unreadable object, so the review gate — the human checklist in Part 10 — could only check presence, never substance. The checklist items like "Contracts complete including attachment types" could be ticked by looking at a file existing, not by verifying its content.

**The counter-evidence that points at the real fix:** the agent's khata tests were, on inspection, reasonably good — named IDs, concrete values, refusal substrings. So the machinery of good tests was already within reach. What was missing was that **none of those values lived in the plan before implementation**, meaning: (a) Swaraj approved nothing specific, (b) the agent had freedom to invent both sides of every comparison, and (c) nothing could check the agent's tests against the plan because the plan had no contract values to check against. The 40% is not a mystery — it is a plan-completeness problem at the contract seams, layered on a missing "good test" standard, layered on a language barrier.

## The core principle

> **A test is not something the agent writes. A test is a contract in the plan, restated in code.**

If the plan is concrete enough that a test can be written at all, then writing the test is *translation* — the same act as writing the code it verifies. Both are restatements of the same natural language. This one principle reshapes all three of Swaraj's original questions:

- **"How do I think of test cases in the first place?"** — You don't invent test cases; you **extract** them from the plan's own sentences (method in the next section). A plan that cannot yield its test cases is an incomplete plan, not a mystery.
- **"How do I evaluate a test?"** — Against the plan's locked value, without reading code: does the test assert exactly `₹-100.00`? And the flip test: change it to `₹100.00` — does the test fail? Two yeses and the test is doing its job.
- **"The logic verification with tests is the difficult part."** — The genuinely hard part moves to planning: making rules concrete enough to be tested. That work happens in conversation with the planning agent, where Swaraj is present — not in the implementation run, where he is watching code he cannot read.

**The plan's lie detector.** If you cannot write down the expected value for a rule — e.g. "the confirmation shows `Resulting balance: ₹-100.00`" — the plan is incomplete, and that incompleteness is a **planning finding to fix in conversation**, not an implementation detail for the agent to guess. The test suite thus becomes the instrument that audits the plan's own quality. Every planning session should end in a state where this instrument is full.

*This is a working hypothesis drawn from the evidence above (the Khata tests were good when the agent had the values) plus standard test literature (TDD: the test suite is the red state that exists before code). It has not yet been stress-tested on a real Tend module — that is the next experiment.*

## How to think of test cases at plan time — the extraction method

The method below is the correlation of research unit 1 (test-design method). It is a repeatable procedure, not a talent.

**Step 1 — Number the rules.** Read the plan one sentence at a time. Anything containing *must, cannot, if, unless, only, when, always, never, before, after, at least, at most, above, below, max, min*, a number, a price, or a date is a rule. Number them R1, R2, R3, … A plan that cannot be split into numbered rules is not yet a plan — it is a vibe.

**Step 2 — Each rule gets a family of tests, not one test:**

| Family member | What it does |
|---|---|
| Happy path | The thing the rule allows, with real numbers |
| Violation | The thing the rule forbids, with real numbers |
| Boundaries | For every comparison word: the edge itself, one step below, one step above — and the plan must *decide* what each shows |
| Refusal verbatim | Every refusal message the plan names, asserted word-for-word (punctuation included) |
| Round-trip | Write, then read back — "the payment saves" is untestable; "fetch khata afterwards and it returns balance ₹-100.00" is a test |
| Wrong order | Every "must happen before" rule gets a test that does it in the wrong order and asserts what the plan says happens |

**Step 3 — Sweep for what the plan forgot.** This is where **the plan gets fixed, not the tests**: doing the same operation twice (double-click / duplicate submit); empty input; zero and negative amounts in money flows; uniqueness (two customers, one alias); rounding across many small decimals; timezone/date boundaries; and "what happens when the thing downstream fails." If the plan is silent on any of these, that silence is a **plan gap** to fix in the planning conversation — and each fix spawns its own test family.

**Step 4 — Traceability.** Every test carries the ID of the rule it attacks. If a test cannot point at a rule sentence, either the test is invented or the rule is missing — no third option.

**Worked example** (the shared khata case): rule — "A payment larger than the outstanding balance is allowed; the confirmation shows the resulting negative balance."

| Test ID | Attacks | Given (locked input) | When | Then (locked expected) |
|---|---|---|---|---|
| KHATA-BAL-01 | R4 happy path | balance ₹250.00 | pay ₹350.00 | Confirmation contains `Resulting balance: ₹-100.00` |
| KHATA-BAL-EDGE-01 | R4 boundary | balance ₹250.00 | pay ₹250.00 | `Resulting balance: ₹0.00` (zero never shows a minus) |
| KHATA-BAL-ROUNDTRIP-01 | R4 + save rule | balance ₹250.00 | pay ₹350.00, then query khata | Stored balance displays `Resulting balance: ₹-100.00` |
| KHATA-BAL-PROP-01 | formatting invariant | balance ₹5,000.00 | pay ₹8,750.00 | `₹-3,750.00` (separators locked; invariant: output = payment − balance) |

The method's second output is the **findings**: R4 does not say what happens for a ₹0 payment, nor for an overpayment large enough to look like an error. Those are new rules to write *before* implementation. The test-design pass **is** the plan-completion pass.

**The one hard kind — LLM-generated output.** Where the system generates natural language, exact-value tests are impossible. The plan states an **invariant** instead ("the refund message always shows charge, fee, and refund; refund = charge − fee") and a **frame** (shape, allowed set, and the exact refusal logic *around* the generation). Tests check the invariant and the frame, never the picture — otherwise the suite either fails randomly or passes meaninglessly.

**What the literature contributes (short):** TDD — the plan's suite is the red state that exists before code, and "done" is those exact tests being green. BDD — the given/when/then table itself is the plain-language spec both sides read. Example mapping — every prose rule must carry a concrete example, because rules hide ambiguity and examples expose it; the example **is** the first test case. Equivalence partitioning + boundary value analysis — the engine behind "boundary word → boundary tests." Property-based testing — where exact values are impossible, assert the invariant. Parameterized/table-driven tests — the plan's tables transcribe directly into the framework, pure translation.

## What the plan must lock beyond the logic — the decision inventory

The tests can't exist until the surrounding decisions are locked. This table (correlation of research unit 3) answers "what are all the things I need to decide on first, apart from just the logic?" For each row: what is locked, and what an unlocked version costs.

| Decision | Locked as | If NOT locked, the agent silently decides… |
|---|---|---|
| **Public contracts** — every function/tool a module exposes | name, inputs, outputs, side effects, errors it may raise — all in natural language | names you can never search for; return shapes that contradict the plan; raise-vs-return by whim. Renames are invisible to you |
| **Data shapes** | every field: name, type, required/optional, default, unique; which entity references which | the schema itself. **Worst compounding drift** — every later module, test, and plan presupposes the schema, so one unexamined choice radiates through the whole build |
| **Error semantics** | what counts as error vs refusal vs clarification; what the system does on each; the exact user-facing strings | a collapsed "something went wrong" that ships to real users and can never be re-reviewed |
| **State transitions** | the full table: legal edges, guards, who may trigger each | real business policy (can you cancel after finalize?) decided by a translator, discovered only in a production edge case |
| **Dependency direction** | who may call whom; what a module may NOT touch | your Level 2 architecture decays one convenient shortcut at a time |
| **Design patterns** | chosen in the planning conversation via trade-offs | the "pattern-as-contract" trick below becomes impossible |
| **Locked user-facing strings** | every string a user sees, word for word | the agent writes your microcopy, and the later i18n pass becomes an archaeological dig |
| **Idempotency and uniqueness** | the keys and duplicate-write rules | double charges. This one fails *loudly* (which is why it's not on the invisible list), but it still ships to production first |

**The invisible-drift ranking** (what fails silently, which a non-fluent reviewer can never catch): (1) data shapes, (2) public contracts, (3) state transitions and guards, (4) error taxonomy + user-facing strings, (5) dependency direction and module boundaries. Idempotency is the loudest single-incident damage but it fails loudly; the five above fail softly and compound.

**Pattern-as-contract.** When a plan names a design pattern, it converts a stylistic preference into a mechanical test:

- **Repository over table Y** — the repository exposes exactly the locked method names; no file outside the module imports the table driver; every write to table Y routes through the repository.
- **Strategy** — each registered strategy satisfies the locked interface; the dispatcher selects by the locked key; adding a strategy requires no edit to the dispatcher beyond registration.
- **Event-driven / publish-subscribe** — publishers emit exactly the locked named events with the locked payload shapes; every subscriber named in the plan is actually wired; no module invokes another's handler directly.
- **State machine + table** — for every (state, event) pair the outcome is exactly one of {transition to X, no-op, error} per the locked table; no code outside the module mutates the status column directly.

These are the same style of check as the "architectural invariant checks" Kirana already had (e.g. "no central `tests/` folder", "`src/index.ts` contains no business logic") — which existed and worked.

**The unlocked surface — defined deliberately.** The implementer is explicitly free to choose: internal helper names and decomposition; file layout *within* a module; variable names; small refactors that don't change locked contracts; *extra* tests beyond the named n (permitted, never replacing the named ones); comments and style. Defining this explicitly matters as much as the locked list because: (1) the reviewer gets a triage rule (on-list = skip, off-list = review); (2) the agent gets a stop rule (proceed vs ask); (3) drift masquerading as "refactor" is now a detectable deviation; (4) it is how Swaraj keeps authorship — deciding what matters and explicitly delegating what doesn't.

## Frameworks and libraries — the Level 3 question

Swaraj's direct question: **decide the framework beforehand, or let the agent figure it out?**

**The working answer: decide beforehand — at the project level, once — but keep the plan's contract layer written so it survives a stack change.** The reasoning:

- **You cannot re-decide a stack later.** A stack chosen by the agent is a stack you can never audit, because you can't read the code to verify a replacement.
- **The stack shapes the mechanical layer of every contract.** Chosen after the plan, it can invalidate the plan's contracts.
- **A translator needs a fixed target language.** Letting the translator pick its own target defeats the entire premise.

**The nuance that keeps this workable:** the plan's contract layer is written at the **concept level** — "a customer record has a canonical name and aliases; query by normalized name; not found → `exactMatchCount 0`." Those sentences, and the test values derived from them, survive any stack. The stack is a pinned **appendix** — "D1 table `khata_customers`; columns …" — and only the appendix churns when the stack moves. This is the same discipline the study already established for Tend: concepts live above technology; the technology is pinned, not woven into the concepts. (The same relationship as "graph data, not graph structure" — content survives, structure is chosen.)

**The result is a three-way division, not a two-way one:**

| Decision | Who | When |
|---|---|---|
| **Stack** — language, runtime, DBs, eventing, test runner | Swaraj + planning conversation, Level 3 | Once, project level, before any plan |
| **Patterns, contracts, data shapes, rules, test cases** | Swaraj + planning conversation, Level 2 | Inside each module's plan |
| **Mechanics inside the stack** — "how to express this repository in this framework's idiom" | Implementing agent | Translating, never deciding |

**The one caution (my own pushback on this design):** the plan must get *denser in values, not bigger in prose*. The old ratio was upside-down (1,000 lines of prose, ~130 lines of thin test tables per component). The new plan flips it: thin prose at the seams, thick locked tables at the contracts. If planning starts to feel like writing a book, the boundary between locked and unlocked has drifted.

## The implementation phase — gates and anti-cheat

The order of operations, correlation of research units 2 and 4. The reviewer never touches code.

**1. Tests-only pass.** The agent writes *only* the test files, translating the plan's test tables verbatim. Review via a one-line manifest per test — `<ID> | input | expected` — which is the plan table itself, regenerated. Swaraj never reads the test code; he compares the manifest to the plan. Any value that differs from the plan is a failure, not a negotiation.

**2. Code pass.** The agent implements each module with the named tests as the running gate at every step — the imports-first simple gates Swaraj mentioned ("does the module exist, do the locked exports exist, does the dependency direction hold") are cheap and mechanical, and the logic gates are real tests. Simple gates get cheaper, logic gates stay real.

**3. Anti-cheat probes**, run in an environment the agent does not control (CI):

| Probe | What it kills | Cost |
|---|---|---|
| **Expectation-flip** — flip a locked expected value in a controlled copy; the test MUST fail | tautological asserts, over-broad asserts (not-null instead of 5), asserted-the-wrong-field | Near-zero; should be a default |
| **Test-ID audit** — every plan test ID exists verbatim; no renames, no deletions, no unplanned additions | deleted/replaced cases, tests added to look thorough | Near-zero; should be a default |
| **Forbidden-import / invariant scan** — the dependency-direction and pattern-as-contract rules from the plan | architecture decay, pattern violation | Cheap |
| **Sampled mutation testing** (Stryker-style — inject a deliberate bug, the tests must catch it) | whatever slipped through — the backstop | Higher; run as a targeted diagnostic on the named cases, not a global gate |

**The core anti-cheat principle, stated once:** the plan locks **both sides** of the comparison — input and expected output. The agent authors neither. A test is a comparison between code behavior and plan-locked values; the agent therefore cannot cheat by being self-consistent. If the agent picks its own input *and* its own expected output, it can always make them agree — that is the entire failure mode.

**4. Golden end-to-end run.** A seeded walkthrough against the real stack — deploy, run the query/CSV spine, export traces, human Pass/Fail. This is exactly the eval spine that already worked in Kirana; it is the keeper. Two hulls, as the study already decided: the unit hull and the e2e golden hull. **Green means both.** A result green on one hull and red on the other is broken, not "mostly passing."

**What "green" means:** all tests pass is *evidence for review, never truth*. Green under adversarial conditions — locked expectations, flips, an uncontrolled runner — is evidence. On its own, green is the cheapest sentence an unverified author can produce.

**Reviewer/implementer separation.** The research is decisive here: a second agent asked to review "the plan + code" is **theater** — a fresh context can't see semantics it can't run, and is prone to plausible endorsements. It becomes a real adversary only when given un-fakeable inputs (raw test-run logs with per-test results, the manifest diff, the flip-probe results, mutation-survivor lists) and **the ability to run code**. The honest version of separation is: the probes are **harness-computed, never agent-judged** — the factory applies the study's rule that the agent is never the judge of its own output, now extended to the tests.

## External research — dispositions

Correlation of research unit 4 (web research, 2026-09-13). Every source judged with the study's disposition labels. Research is inspiration only — the knowledge base's first-principles answers outrank everything external.

**Adopt as a principle:**
- **Spec-first with pre-implementation gates** (GitHub Spec Kit) — "contract tests mandatory before implementation" is exactly the test-first-from-plan idea, already codified by someone else.
- **Plan-before-edit with human approval** (Anthropic's Claude Code guidance, Cursor's plan mode) — both name the "trust-then-verify gap" (plausible-looking code that misses edge cases) as the central failure pattern. That gap is precisely the old 40%.
- **The implementer never the sole verifier** — of the code *or* of its own tests (convergent evidence from TDD-agent experiments and test-oracle research).
- **Contract testing at API boundaries** (Pact) — each side tests independently against a shared contract; `can-i-deploy` style gates. Strong fit for module boundaries.
- **Golden-file approval is a human action always** — never let the agent generate the expected output file in the same pass that generates the code, or the suite goes green for the wrong reason.
- **Vibe coding vs agentic programming** (Martin Fowler) — vibe code is disposable software you don't review; agentic programming is review-gated and structure-caring. The software factory is the second one by definition.

**Try experimentally:**
- **Mutation testing** (StrykerMutator, PIT) as a delta signal on agent-written tests — but the research (Hamidi et al.) is blunt that oracle quality (the plan's locked expected values) outranks mutation score. Locked values beat bug-injection; bug-injection backstops the leftovers.

**Useful inspiration:**
- **Aider's architect/editor split** — long-lived open-source devloop where planning and editing are separate roles.
- **Plan file as instruction source** (Cursor plan mode, Spec Kit) — the plan lives in the repo, editable inline, approval-gated.

**Rejected as marketing (no independent evidence):**
- "Significantly improved code" claims (Cursor, CodeRabbit) — vendor anecdote, no numbers.
- **Amazon Q plan-first workflow** — could not verify primary sources; treat as marketing until docs confirm.

**Unverified:**
- Several direct fetches (Amazon Q docs, Copilot code-review docs, Fowler's characterization-test page) failed during research; those claims are marked unverified rather than guessed.

**The recurring empirical truth across sources:** LLM-written tests pass for the wrong reasons — weak assertions and missing oracles dominate. Any test gate must therefore audit *assertion strength and coverage of the named cases*, never pass/fail alone. This is independent confirmation of the plan-locked-contract principle from outside the study.

## How this connects to the rest of the study

- **Deep modules / sub-modules.** Already the working architecture (Kirana carried it correctly). Each sub-module owns its code, its colocated tests, its own testing guidance, and its docs. No central test repository. The review method here depends on this: each module must be readable and testable alone.
- **The agent proposes; deterministic verification authorises.** The factory is Tend's own discipline applied to Tend's construction. The anti-cheat probes are the authorization layer.
- **No model-generated numbers in control paths.** Carries over doubly: the agent never grades its own output, and no "confidence" numbers ever gate anything. Expected values come from the plan (a human-authored external record), never from the agent's memory. States and structured matches decide.
- **The two-hull evaluation ladder** (engineering study Part 12): unit hull + e2e golden hull. Green means both.
- **Golden scenarios and the eval spine** (study Part 12.5; Kirana's working eval): the e2e walkthroughs are the outer hull every module must eventually pass.
- **Cloudflare stack** (data-architecture work, Part 13): the Level 3 appendix for Tend is already substantially decided at the project level — Workers, Durable Objects, D1/KV/R2, Queues. That is the pinned target the plans translate into.
- **The prompt constitution** (Part 14): the constitution text and the factory plans are different artifacts but share a discipline — human-authored content is the locked source; anything derived is regulated by checks, not by the author's self-assurance.
- **The product-design-loop skill** (`skills/product-design-loop/SKILL.md`, 2026-09-14): the design ideation loop as a runnable agent file — TEACH mode (the product-design canon, one unit at a time, Tend as example only) and PLAN mode (Module-8 grounding per item). Two surfaces bound by the same laws: the human UI and the model's interface to machine components (schemas, projections, gates, stage text). The factory's planning and review phases should reference it whenever a plan touches a UI surface, model-facing text, or signifier-bearing artifacts: its mechanical-half checklist (hierarchy, contrast, labels, color-alone, spacing, signifier honesty, gates, exits) runs as the AI first pass before human review, and its critique ritual ("I like it" banned until "it works because") mirrors this pillar's review method — machines hold rails, humans hold judgment.

## How review really works — the human practice (researched)

Before designing how Swaraj reviews, we studied how senior and staff engineers actually review code written below them (a junior engineer's work). Two research units ran in parallel: one collected practitioner voices from X (Twitter) and developer communities; the other read the literature and the corporate guidelines. The result in one sentence:

> Senior engineers do not review code line by line. That is the myth. The valuable part of a review was never line-reading — it is comprehension, judgment, and trust.

What the research shows they actually do:

**1. They review in layers, with attention budgeted by risk, not by line count.**
- Google's official reviewer checklist orders attention: **Design → Functionality → Complexity → Tests → Naming → Comments → Style.** Style is deliberately last.
- The SmartBear/Cisco study (the source of the famous "200–400 LOC" numbers; a vendor whitepaper treated as directionally useful, not gospel): review in chunks under 200–400 lines, at under 300–500 LOC/hour, for no more than about 60 minutes of concentration, and spot-check roughly 20–33% of code — the "Ego Effect" (even partial scrutiny makes authors write more carefully).

**2. They automate the mechanical layer first.** Linters, type-checkers, and CI run before the human looks (r/ExperiencedDevs: "I will always ensure there's an appropriate linter and build process in place so that I don't need to spend time looking for incorrect whitespace"). They read the commit message, skim the shape, and zoom in only where a mistake causes long-term pain.

**3. They verify by running it and watching state, not by reading.** An HN engineer: "If I can't [understand it], I pull it down and interact with it." When reading is weak, reviewers inspect logs, database state, and before/after snapshots. This is the "review logs / state changes" Swaraj intuited — and it is the part that transfers to a non-fluent reviewer perfectly, because it never required reading code.

**4. Comprehension is the deliverable of review.** Bacchelli & Bird's study at Microsoft found the #1 challenge and #2 outcome of code review is understanding; most review comments are comprehension notes, not bug finds. Google's corollary: "If you can't understand the code, it's very likely other developers won't either" — a change that cannot be understood is a defect in the change, not in the reader.

**5. Review is a teaching loop, not a verdict.** HN, quoting a mentor: "Code review is not about catching bugs but spreading context. Catching bugs is a side effect." Google's guide says to tell the developer what they did right. The honest ceiling: "Senior review is valuable, but it does not make bad code good."

**6. The one-line vs four-lines question (Swaraj's direct ask).** With identical time/space complexity, seniors do not gate on one-liners vs readable multi-line versions. Google: "a purely style point not in the style guide is a matter of personal preference" — and the style guide is enforced by machines now (formatters). Ousterhout adds the two edges: "the best code is no code" (fewer lines ARE better when they cost nothing) and "complexity is incremental" (readability for the next maintainer is the goal). The actual test: can the next person change this safely, and does it improve overall code health?

**7. The practitioner voice from X (2026, verified quotes).**
- Addy Osmani: "The hard part of engineering moved from writing code to deciding whether to trust it." And: "Never confuse 'the tests passed' with 'a person understands what this does and why'."
- David @dzhng: "When supply massively exceeds inspection capacity, inspection stops being a filter and becomes a formality. You skim. You approve. LGTM becomes the default."
- Adam Rackis: "Smashing the magic button and tossing the result to a senior engineer for review does not make you a senior."
- Context that is literally Swaraj's situation (Reid Southen on Amazon): AI code is breaking systems at an increasing rate, so junior and mid-level engineers now are not allowed to commit AI-assisted code without a senior engineer reviewing it.

## Review for a non-fluent reviewer — the method that follows

The senior's human test cycle, pulled apart, is four acts in order:
1. **Intent** — what is this change for?
2. **Behavior verification** — run it: tests, the repro, watching logs and state move.
3. **Triage / spot-check** — zoom attention to the seams: interfaces, error paths, data changes, invariants.
4. **Judgment** — approve-with-nits, or block.

Line-reading is simply how fluent people implement acts 1–3. It is not the point. So every senior tool has a non-fluent translation:

| Senior practice | Non-fluent translation |
|---|---|
| Read the diff / description of intent | Re-read the plan's rule list against the change's claim |
| Read tests first — they encode the contract | Read the test manifest: `<ID \| locked input \| locked expected>`. That IS reading a test, in Swaraj's language |
| Run it and watch state change | Run the golden scenario + trace export + before/after state diff |
| Spot-check the seams | Spot-check only contracts and invariants, machine-checked |
| Judge on comprehension | The comprehension test is the gate: if you can't follow the state from plan to trace, that's a defect in the change, not in you |
| Approve-with-nits | Approve a module when it improves plan-conformance; block only on real deviation |

**Review by prediction (the method's core).** A fluent senior forms an internal prediction while reading. Swaraj can form the same prediction without reading:
1. Before the run, write the state transition in natural language: "customer Ramesh, balance ₹250, pay ₹350 → balance ₹-100, confirmation shows `Resulting balance: ₹-100.00`".
2. Run the golden scenario.
3. Compare the actual trace and state to the prediction.
4. A discrepancy means the change is lying to you — investigate with the agent as explainer, or mark defect.

This is the human test cycle in its true form: the reviewer makes the prediction first. It never touches code.

**Reviewing the test cases — the direct answer.** Review tests at the manifest level, before any code exists: is the input locked? Is the expected value exact? Does the ID trace to a plan rule? Is the family complete (happy / violation / boundary / refusal / round-trip)? The probes (expectation-flip, ID audit) then mechanize the senior's question "would this test actually catch a bug?"

**Reviewing huge code.** Never review the whole. Review slices of state transitions, not lines: each golden scenario moves the system along a plan-named path, and the review examines that path's trace. A thousand-file diff becomes five runs of five paths.

**What must NOT be reviewed — the language-idiom layer.** "Is this Pythonic / the Laravel way / idiomatic TypeScript?" — it is last on the senior checklist anyway, mostly enforced by formatters and linters now, and judging it is how overwhelm returns. The stack that replaces it: (1) deterministic gates (linter, formatter, type-checker, the plan's invariant scans); (2) a one-time, per-language "language constitution" defining what good looks like — deferred, because senior engineers themselves do not gate heavily on it; (3) consistency wins over idiom. What stays: the comprehension test, which works at the state/contract level forever, with no fluency needed.

**The trap to avoid.** If review becomes only mechanical gates, Swaraj becomes the LGTM button — the exact formality the practitioners warn about. The prediction ritual is what keeps the human inside the test cycle. Review is a teaching dialogue (the agent is the junior), and "senior review does not make bad code good" — the plan is where quality is born; review catches what the plan's own lie detector missed.

## Two-level logging — the harness trace and the developer review log

Swaraj's framing (his words): the harness logs are very specific to the harness and to what we want to version; but there are other logs we cannot store all the time — too many reads and writes to the database, unnecessary, or just noise. For reviewing code we want detailed logs, turnable-off in a config file, that tell a human story: this object was created at this line, this data came from here, then this function was used, then this data changed to this. Two levels, one contrast — the harness trace for the product builder observing the harness, the developer review log for the senior engineer reviewing the code that was written.

| | **Level A — the harness trace** | **Level B — the developer review log** |
|---|---|---|
| Purpose | Observing the product being built — measuring the harness working | Reviewing the code that was written — the senior's "run it and watch" |
| Audience | The product builder + audit/evidence | The reviewer of a module, during development |
| Records | Situation-model versions per wake, tool calls, verification outcomes, the structured reason, control-plane decisions | The execution story in prose: object created, data origin, function used, data changed from A to B |
| Language | Structured machine events | Natural-language sentences, generated deterministically |
| Storage | Durable per tenant (D1/R2, per the data-architecture design) | Per-run JSONL in dev/CI; **never the tenant database** |
| Volume | Bounded by design | Can be huge — that is why it is toggled |
| Toggle | Always on — it IS the product's evidence | Config flag, **off by default in production** |
| PII/secret rule | No secrets in traces, no PII (already decided) | Same rule, and it runs on seeded fixtures (Bloom/Bob), never real data |

The sentence that anchors the contrast: **Level A tells you whether the product is behaving; Level B tells you whether the code you are reviewing is faithful to the plan.** Different channels, different lifetimes — A is the product's memory, B is the reviewer's microscope.

Two properties make Level B easy, not burdensome:
- **Level B is the implementation of review-by-prediction.** The "state-diff review surface" from the review method is exactly what the Level B narrative produces. The review log IS the state diff, as prose.
- **Level B is derivable, not invented.** The review-log points are the plan's own locked contracts (public functions, data mutations, refusals) enumerated as a list. A list is cheap; prose is not needed.

**The different kinds of logs.**

Level A (durable product evidence — the factory uses them, it does not redesign them):
- A1 — situation-model versions / per-wake events (the product's ledger)
- A2 — verification outcomes + the structured reason (the why, not just the verdict)
- A3 — tool-call records: name, schema-validated args, result, status
- A4 — control-plane decisions: `Policy.decide` outcomes, denials, step-ups (the append-only audit)
- A5 — communication events: what was sent to whom, when; bytes shown = bytes sent
- A6 — golden / eval runs (the harness developing itself)

Level B (ephemeral, per-run, toggled, per module):
- B1 — object creation (identity + key fields + `file:line` + where the data came from); data mutations (`entity.field`: old → new, by which function); refusals/errors (exact string + the plan rule it violated)
- B2 — function entry/exit at the module boundary (locked args in, locked result out)
- B3 — flow detail (branch taken, intermediate values — very verbose, rarely used)

**The config toggle** (per environment):

```text
reviewLog:
  enabled: false   # default OFF in production
  level: B1        # B0 off, B1 objects+mutations+refusals, B2 +functions, B3 +flow
  scope: [khata]   # module scope — review one module's story at a time
```

Hard contract: when `enabled: false`, the Level B logger is a compiled no-op — zero database writes, zero lines, zero cost. This settles the storage worry in one stroke: the worry only applies to Level B, and Level B's default is completely off. Level A is bounded by design and lives in the tenant stores on purpose.

**What the plan contains (Swaraj writes this while planning) — the "Logging & review observability" section:**
1. Level A events this module emits — usually none new; the harness records at contract points mechanically. The factory rule: *Level A logging is harness-owned; modules only return structured results.* Only a genuinely new event kind gets named in the plan (name + payload shape, natural language).
2. Level B points, enumerated from the module's own contracts — one line each: each public function entry/exit, each data mutation (naming `entity.field`), each refusal point (naming the plan rule). A table, not prose.
3. The golden narrative fixture — one named test whose expected value IS the Level B narrative for the golden scenario. Two things at once: a test that pins the logging, and the review surface for the prediction ritual.

**How the agent implements it:**
- Level A: nothing in most modules — the harness writes it. (If the agent were free to write Level A events, the product's evidence would be agent-designed.)
- Level B: one deep sub-module, the **review logger** — a deterministic recorder: `reviewLog.record({ event, entity, field, from, to, at, rule })`. In dev/CI it appends per-run JSONL and renders the prose; in production it is the no-op. Rule: the agent must not invent review-log points beyond the plan's section — same as tests, it translates, it does not author.

**Working decisions (agreed):**
- Level B defaults: **dev = B1, CI = B2, production = off.**
- The golden narrative fixture is a **hard named test** (part of the n cases) — it is the review surface.

## Security in the factory

Swaraj's framing: security has not been touched in the factory; the knowledge base has a compliance and security folder with documents about how security is handled while a product is developed; can we design it into planning, agent implementation, review cycles, deployment cycles, and how we choose infrastructure, so the factory itself is robust. All seven documents in `knowledge_base/Level 2/compliance_and_security/` were read one by one. Most of the answer already exists there — the factory's job is wiring those decisions into its machines.

The spine (already decided): > **The model proposes. The deterministic control layer decides.** For the factory: the implementation agent is the model; the gates (tests, probes, secret scans, release gates) are the deterministic layer. The audit framework's five moments (design / implement / review / release / operate) map onto the factory lifecycle one-to-one.

**1. Planning (Moment 1 → the plan's security section).** Every module plan carries a six-question security block, in plain words, before any code: which parts of the 17-branch security taxonomy does this touch; who are the actors and whose data moves; the cross-shop failure case (what happens if the wrong shop's data leaks or is changed); the model-as-attacker case (what could a poisoned CRM note make this module do); where the kill switch is; does any new tool, destination, or field become reachable (default-deny until reviewed). A plan that cannot answer its block is not done — the same plan-completion rule as the test families.

**2. Implementation (Moment 2 → inherited standing clauses).** Every module plan includes these by default; the agent translates them, it does not weigh them:
1. Tenant is a typed parameter on every store call; a call without it does not compile.
2. Model output goes through a schema before it becomes an argument, header, URL, or render.
3. Untrusted text (CRM notes, messages, webhook payloads) is labeled and never enters the instruction channel.
4. New tools default-deny; a capability exists only after enablement and review of its schema, scope, and destinations.
5. Allowlists, not denylists (destinations, egress hosts, model providers).
6. No production secrets anywhere the agent can read; the agent's environment holds only disposable preview tokens.
7. Every authorization branch carries a two-shop test.
8. No security fix without the failing test that proves the hole.

**3. The named test cases gain security families** whenever a module touches isolation, the model surface, or secrets. Suite **T-A (isolation)** — two seeded shops Bloom and Bob: a cross-shop read is denied; a cross-shop edit changes nothing; a phone search returns only the caller's own rows; the tenant context cannot be set from a client body, header, or tool argument; a deleted tenant leaves nothing anywhere. Suite **T-B (injection)** — direct jailbreaks and indirect injection through CRM notes; an SSRF target is denied; the schema rejects extra keys and wrong types; a tampered tool-catalogue hash is refused; cost caps and the kill switch hold; no secrets appear in a prompt-dump response. These are the easiest tests to lock, because the expected values are booleans: denied/allowed, nothing/row. Green-with-a-skipped-test = failed suite.

**4. Review (Moment 3 → the factory's review table).** The review's security surface is a table: path → control → test → PASS/FAIL, no praise. Two things the factory adds because the misses in agent code are different from human code:
- **The regression question** — "did the previous version have an authorization check this version dropped?" Agents silently regress while looking clean; the question is asked on every review.
- **Security mutations as anti-cheat probes** — drop a tenant predicate and T-A must turn red; loosen a schema and T-B must turn red. A missing control is silent by nature; these probes are the whole point.

**5. Deployment (Moment 4 → release gates).** The factory ships nothing until: T-A green with no skipped tests; T-B green; secret scan clean (no key-shaped strings, no `.dev.vars`, no env dump); dependency scan clean and SBOM current; tool-catalogue hash verified; the kill switch documented for this release; and the deployment is reproducible from the reviewed commit — **what is running equals what was reviewed.** That last one matters beyond security: a deploy that differs from the reviewed artifact reopens every review done.

**6. Infrastructure (Level 3 constraints the factory chooses against).** The documents set requirements, not vendors: isolation is mechanical — Durable Object names, cache keys, and service bindings carry the shop's identity (no "remember to filter by tenant"); the control plane is a first-class set of sub-modules (TenantContext, `Policy.decide`, append-only audit, connector-token vault), each with its own tests, and no module imports the store driver directly; egress is a single allowlist gate; the agent's environment never holds production tokens; and if any tenant or agent can ever deploy code, it runs in an untrusted dispatch namespace with its own bindings only — no shared keyspace or data binding. This matches the per-tenant isolation that is already the architecture's spine.

**7. The factory itself is a target.** The agent is an untrusted intern, not a security boundary — the evidence is blunt (the "Bad Vibes" benchmark found 69 vulnerabilities across 15 agent-built apps, none implementing CSRF). So the factory applies the spine to itself: the plan is human-authored; the codebase is never trusted without the gates; and no code the agent writes can change the plan, the gates, or the secrets. TypeScript-specific: the type system is the first line of defense (a typed tenant context turns a missing-tenant bug into a compile error); the agent will sometimes "fix" a type error with `as` or `any`, and review must call that out; runtime schema checks still guard every boundary (types disappear at runtime); the dependency tree must be pinned and scanned.

**Compliance (already decided; recorded here so the factory keeps it visible).** Compliance is one folder — the government's rules, the platforms' rules, the buyers' rules, and any future kind; rules are configuration, not core logic, and the invariants are the hard line no rule may cross. No formal audit now: annual pentest + a written security packet + CSA STAR; SOC 2 Type I begins when a named buyer or an unanswered questionnaire demands it.

**Working decisions (agreed):**
- Start with the full six-question security block on the first real module, then slim it once calibrated.
- The two natural-language audit prompts already in the knowledge base (isolation audit and agent-security audit, both ending "Output PASS/FAIL per item. No style commentary.") become the factory's security review manifests as-is.

## Open points and the next decision

Nothing below is settled unless marked **closed**. Working decisions live in their own sections; this list keeps the thread visible.

**Closed (agreed with Swaraj, 2026-09-13):**
- **Level B logging defaults** — dev = B1, CI = B2, production = off.
- **The golden narrative fixture** is a hard named test (part of the n cases) — it is the review surface.
- **The security block** — the full six-question block on the first real module, then slim once calibrated.
- **The security audit prompts** — the knowledge base's two natural-language audit prompts become the factory's security review manifests as-is.

**Carried as working recommendations (used in the design above; not separately re-ruled):**
- The review slice — the plan table *is* the manifest; a harness verifies the test files match it numerically.
- Probe automation pace — start with expectation-flip + test-ID audit + forbidden-import scan, add sampled mutation testing after the first module.
- The main-risk counter — the unlocked surface bounds the plan; test tables are extracted, never authored.

**Still open:**
1. **The "three frameworks" phrase** — recorded as the three levels of the three-level framework; still pending Swaraj's confirmation or correction.
2. **The boundary question** (which locked item feels like the agent's job, which unlocked item feels dangerous) — largely settled by the review research, but the exact locked/unlocked split still awaits Swaraj's judgment.
3. **Next experiment** — stress-test the method on one real, small Tend sub-module: rules + contracts + test tables in conversation, tests-only pass, then measure whether the manifest review removes the 40% failure.
4. **Location and syncing** — this file lives provisionally at `knowledge_base/software_factory_with_coding_agents.md`; base prompt §16/§18 and `status_quo.md` are not yet updated — that sync waits for Swaraj's OK.

## Changelog

- **2026-09-13 (second pass)** — Review research recorded: the senior human practice (from X/communities + literature) and the non-fluent reviewer method built on it (review-by-prediction, the manifest as reading tests, the language-idiom layer deferred to gates + a language constitution). Two-level logging designed (Level A harness trace vs Level B developer review log) with the config toggle. Security woven into the factory from the compliance_and_security knowledge base documents (five moments mapped onto planning / implementation / named tests / review / deployment / infrastructure). Working decisions agreed: Level B defaults (dev B1 / CI B2 / prod off), golden narrative fixture as a hard test, security block sizing, audit prompts as manifests. This file now covers the whole Section 16 conversation to date.
- **2026-09-13** — First conversation recorded. Four research sub-agents correlated (test-design method; anti-cheat; what-a-plan-must-lock; external practice). No decisions ruled; working hypotheses marked as such. The original open points became the agenda carried into the second pass.