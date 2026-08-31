# Growth and Evolution — conversation and discoveries

## Why this document exists

This is a conversation record, not a formal specification. It preserves how we understood Growth and Evolution together: what the earlier categories had already decided, the research that grounded the answering, the corrections (including one of mine the user pushed back on hard), and the working decisions. The map is [`understanding_all_growth_and_evolution_questions.md`](understanding_all_growth_and_evolution_questions.md).

## Where we started

The seven Level 1 questions. The status-quo survey showed most of the material existed in pieces: Channels had decided adapters, fallback and gap; Authority had decided grants and the configurator line; Decision Making had defined the policy shape; the wait spine existed. What was missing: the word "configuration" was undefined, and no category had defined the lifecycles of *joining* and *changing*.

## The shape we found

The seven questions are two questions repeated over four kinds of thing (systems, channels, policies, workflows): how does it join, and what happens when it changes. Everything sits on the undefined word "knob".

## What the user decided (raw thought, preserved)

The direction for connectors, in his own shape:
- businesses select from a pre-developed set of capabilities (a connectors menu: a HubSpot capability, a Salesforce capability, a Shiprocket capability, and so on);
- Tend has its own logic on top — tool orchestration, human-in-the-loop, communication, memory — built over the tools the connectors expose (from their documentation or MCP-style definitions);
- a capability is a tool grouped with a *purposeful action* (the way software engineering builds APIs), not "programmatic excellence" — we do not expose every raw API method;
- when a new connector is requested, the product builder evaluates the value, the tradeoffs and the constraints, authors the tools for Project X from that connector's tools, and then allows the business to enable them.

## The correction I had to take

I had floated "LLM-led auto-integration" — the LLM reads a connector's docs and self-builds the capability. The user rejected it plainly: no LLM-led auto-integration for now. The correction survives scrutiny: the LLM is never the authority for what a connector may do, whether it passes the invariants, or whether it activates. Building and validating capabilities is the product team's work. The reasoning model may help with drafting and evaluation; it never decides.

## The heart of the batch: how changes behave (sub-decision C)

The question: when a rule (policy, workflow, channel rule, grant) changes, what happens to situations already in flight? Options: always-live, pin-at-start, hybrid. The user's instinct was hybrid (C3) but he hesitated openly, and the hesitation was right. The case that worried him: the refund-fraud case, where pinning an old, harmful rule to in-flight situations seems to let the harm continue.

The sharpening that resolved it: a "rule" is not one thing. Split into four planes.
- **Facts** — live.
- **Platform rules** (channel windows, consent, availability) — live + interrupt.
- **Grants / authority** — live. This is where the fraud worry dies: the "who may approve ₹5000" authority stops at revocation no matter what policy version the situation is pinned under, because the Authority category already made grants resolve to a currently-valid holder.
- **Business policies and workflows** — pinned at situation open, with notice and deliberate migration. This protects the customer promise: a promise made under v2 is honoured under v2 unless the owner deliberately migrates.

Both relevant invariants were checked and they are *facts* invariants: "Every decision is based on the information available at that moment" and "Tend always works with the latest known state" / "latest information available". They say "information", not "rules". That is the textual ground for the hybrid.

## Research that grounded the answer (evidence, not decisions)

- **Camunda**: running instances continue on the version they started with; new instances use the latest; running versions in parallel is supported; migration is advised only when the change matters, is deliberate, and has legal reasons; long processes should be cut into pieces. Its billing-vs-shipping example shows pinning promises while allowing live steps.
- **Temporal**: in-flight executions are preserved; new executions run new code; patching or cutover are the only ways to move in-flight work; determinism forces this.
- **AWS Step Functions**: an execution is pinned to the version/alias it started with; per-version metrics exist so a bad release can be detected and rolled back.
- **Stripe**: each account pins an API version; upgrades are opt-in and test-first; old versions stay alive while pinned accounts drain.
- **OPA** as the counterexample: a powerful policy engine whose versioning, validation, distribution and trust are *not* built in. It proves free-form business-authored rules cannot be verified for never-guess / no-leak before they reach production. Constrained configuration or nothing.
- **Salesforce flows**: steers users to declarative customisation instead of code for the same safety reason.

## Options we rejected (and why)

- Free-form business-authored rules (OPA-style): cannot be proven safe under the invariants before production. Bogus as-is.
- Hard-coding per market (enumerate every channel/system): exactly the trap `global_market_readiness.md` warns about. Bogus.
- Forking the product per business: contradicts "the difference is how much is configured". Bogus.
- Third-party marketplace for integrations: changes what Tend is and drags in scope Level 1 excludes. Bogus at this level.
- Always-live for business rules: the drafted-under-v7-sent-under-v8 case breaks traceability. Rejected.
- Pin everything: a revoked approver keeps approving — a security hole that contradicts Authority. Rejected.
- LLM-led auto-integration: rejected by the user, and correct.

## Working decisions

- A capability is one purposeful action the business can switch on, from a pre-built catalogue. It may belong to a business system, communication platform or external agent.
- New capabilities join through one lifecycle: request → evaluate → author → contract → validate → test → enable → monitor → retire.
- Capability authoring is product-team work over connector tool definitions. No LLM-led auto-integration.
- The chosen design is the *phasing* version of the configuration plan: pre-written templates and parameters first; the governed zone grows as we learn from real businesses.
- A new business system or external agent enters the catalogue as a capability: a source + a grant scope + an authority contract, gathered into Tend's situation model.
- When an external lead-finding agent returns a list, Tend does not need to own the finding operation. Tend evaluates the returned claims, creates the relevant individual situations and carries the communication and operational work that follows.
- Business policies are typed, versioned records; the business fills values inside product-defined structures; pinned at situation open with notice and deliberate migration.
- Workflows are constrained procedures over the shared spine; versioned like process engines; in-flight situations run the version they started with.
- Change semantics is the four planes: facts live; platform rules live + interrupt; grants live; policies/workflows pinned with notice and human migration.
- The core/config test: if adding a knob requires changing core logic, the knob was mis-categorised.
- The invariants are a hard line: no configuration may cross them (a business cannot configure silence, fake replies or hidden inaction).
- An absent capability or connector is a visible, first-class gap — a build signal — never a refusal.

## What we handed explicitly to later categories

- **Compliance & Security**: the legal bounds on policy structures and grant scopes; consent values; the exact per-market limits.
- **Level 3**: connector transport, concrete adapters, capability runtime mechanics, product rollout and rollback operations.
- **Business View**: the migration notice and decision surfaced to the owner.

## Related

- Map: [`understanding_all_growth_and_evolution_questions.md`](understanding_all_growth_and_evolution_questions.md)
- The join world: [`how_do_new_business_systems_become_part_of_tend.md`](how_do_new_business_systems_become_part_of_tend.md)
- The change spine: [`how_do_we_evolve_tend_without_breaking_existing_businesses.md`](how_do_we_evolve_tend_without_breaking_existing_businesses.md)
- Channel foundation: [`../channels_and_permissions/understanding_all_channels_and_permissions_questions.md`](../channels_and_permissions/understanding_all_channels_and_permissions_questions.md)
- Grants: [`../authority_and_ownership/understanding_all_authority_and_ownership_questions.md`](../authority_and_ownership/understanding_all_authority_and_ownership_questions.md)
- Wait spine: [`../coordination/how_do_we_represent_work_that_is_waiting.md`](../coordination/how_do_we_represent_work_that_is_waiting.md)
