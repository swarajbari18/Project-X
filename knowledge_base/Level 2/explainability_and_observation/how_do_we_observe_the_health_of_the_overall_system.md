# How do we observe the health of the overall system?

## The short answer

Health observation is a first-class responsibility — the observer — and a well-behaved citizen of the harness: it emits *observation events* onto the same event fabric everything else uses. It watches two hulls separately, because AI agent = LLM + harness: did the provider's model regress or drift, and did our own orchestration start behaving differently than it did in development.

## Our answer

The observer is not a dashboard and not a pile of per-component self-reports. It is one conceptual responsibility whose output is events:

- **Provider hull** — fixed probe suites (small deterministic canary prompts) run under sealed settings on a schedule; outputs compared against baselines; results classified as drift, alias change, or context mismatch. This is how "the LLM itself has regressed or the provider is serving something worse" gets noticed without a user complaint arriving first.
- **Harness hull** — golden-test suites over realistic trajectories run whenever prompts, tools or policies change; sampled production traces re-run and compared for drift in tool-call distribution, schema conformance, latency/cost, output content; completion-discipline checks (see the sibling document on unexpected behaviour).
- **Completion discipline** — did stories end honestly? Situations resolved with open asks, waits that fired without their release policy, coherence failures above threshold: all health signals of the loop itself, not just of any single situation.

Everything the observer produces lands as an observation event on the queue, treated like other events — which fits the swarm architecture exactly: no special channel, no side door, full traceability of the observer itself.

What stays deliberately out of Level 2: probe contents, thresholds, sampling rates, dashboards, metric pipelines. Those are business configuration and Level 3 mechanics — the same way Coordination left check-in lengths and Failure left retry counts open.

One boundary worth repeating from the research: observability shows execution evidence — tool calls, claims used, states, outputs, reasoning summaries where exposed. It does not guarantee access to hidden chain-of-thought, and nothing here depends on it (the gift-CoT is captured when available, never relied upon).

## Boundary

- Reacting to an observed problem — triage, recovery (Failure), behaviour selection (Decision Making).
- Probe infrastructure and alerting mechanics (Level 3).
- Business-facing views of health: businesses see business value, never uptime dashboards (that line was drawn in the always-visible document).

## Related

- [How do we recognise that the system is behaving unexpectedly?](how_do_we_recognise_that_the_system_is_behaving_unexpectedly.md) — what the observer does with its events.
- [`../time/understanding_all_time_questions.md`](../time/understanding_all_time_questions.md) — the check-in ancestor of this responsibility.
