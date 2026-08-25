# How do we recognise that the system is behaving unexpectedly?

## The short answer

"Expected" is defined by what we already settled: the product invariants, the situation model's discipline, and the recorded baseline of past behaviour. Unexpected behaviour is detected in five classes — deterministic checks first, statistical and judged checks sampled — and routed by scope: situation-scoped anomalies land on that situation's model, high-consequence ones enter Failure's triage, everything lands in traces.

## The five classes

1. **Invariant violations** (deterministic). A guess shipped. A silent failure was attempted. An action ran outside its grant. A provisional interpretation reached a customer as fact. These are never-events; the invariant list is the baseline of "expected."
2. **Completion-discipline violations** (deterministic). A story resolved with an open ask. A capability-absent conclusion where a source existed. A wait ended without its release policy being honoured. The ask-endings vocabulary makes these mechanically checkable.
3. **Coherence failures over threshold** (deterministic + judged). Subject mismatch between ask and answer; grounding misses; relevance judges failing above a configured rate.
4. **Drift signals** (statistical). Provider hull and harness hull shifts — tool-call distributions, schema conformance, latency/cost, output content moving week over week beyond configured tolerance.
5. **Operational anomalies** (statistical + judged). Loops, repeated escalations on similar situations, trajectory shapes far from successful peers.

The layering rule from the research holds here too: classes 1–2 run always and cheaply; 3 runs per interaction at low cost with judges sampled; 4–5 run on schedules against samples. And validators themselves need calibration — human-graded golden sets stay alive, because criteria drift is real.

## Where anomalies go

- **Situation-scoped** anomalies update that situation's model — they are facts about the story — and surface to whoever owns it.
- **High-consequence** anomalies enter Failure's triage path (responsibility → consequence → severity → promise).
- **All** anomalies land in traces: feeding golden sets, drift baselines, and eventually fine-tuning data — an anomaly is also a lesson waiting to be learned, which Memory's learning machinery consumes under its own rules.

## Boundary

- Deciding what to *do* about an anomaly (Decision Making / Failure).
- Thresholds, tolerances, sampling rates (business configuration).
- Detection infrastructure (Level 3).

## Related

- [How do we observe the health of the overall system?](how_do_we_observe_the_health_of_the_overall_system.md) — the observer that raises these events.
- [How do we explain every failure?](how_do_we_explain_every_failure.md) — the audit these anomalies land near.
