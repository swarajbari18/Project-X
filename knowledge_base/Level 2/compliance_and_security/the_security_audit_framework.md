# The security audit framework — how do I think and audit at each point?

## Where this question came from

Level 1 asks it as the third Compliance and Security question:

> "How do I think and audit whatever I have implemented at each point with a
> particular security framework that I can apply to find gaps? This kind of a
> framework should be made."

Swaraj is not a security expert and reads code with an AI coding agent.
So the framework must let him audit in natural language at every stage:
while designing, while the agent writes code, before merging, before
releasing, and while running.

## What the framework is

It is two things used together:

1. **Five moments** where an audit happens, each with concrete questions.
2. **Two test suites** (isolation T-A, injection T-B) that are the release
   gate — the machine part of the audit.

Plus the durable index: the 17-branch security taxonomy. Every check maps
to one or more leaves of that tree. When a change touches a leaf,
the change carries the audit for that leaf.

## Moment 1 — Design (before any code)

For every new feature or capability, answer these questions in plain words.
Put the answers in the design note. If any answer is missing, the design is
not ready.

- What does the feature touch in the 17-branch tree? (name the leaves)
- Who are the actors, and which shop's data moves?
- What is the cross-shop failure case? (what would happen if the wrong shop's
  data leaked or was mutated)
- What is the model-as-attacker case? (what could a poisoned CRM note make
  the feature do)
- Where is the kill switch? (what lets us stop this feature fast)
- Does any new tool, destination or field become reachable? If so, it is
  default-deny until reviewed.

The agent's job: raise any of these as FAIL in the design before writing code.

## Moment 2 — Implement (while the agent writes code)

Standing rules the coding agent must follow on every change. These come from
the evidence (NCSC secure development practices, SSDF, and the practitioner
consensus from Grok's chatter pass):

1. Tenant is a typed parameter on every store call; there is no default.
2. Model output never becomes a tool argument without schema + policy.
3. Untrusted text (CRM notes, messages, emails, tickets) is labeled
   untrusted and never concatenated into the system prompt's instruction
## Moment 3 — Review (before merge)

The diff is mapped to the taxonomy. Then a standing review rule applies:

> If the change touches the isolation leaves (branch 8 + BOLA 1.3),
> the model surface (branch 2), or secrets (branch 5), it FAILS without
> the associated tests (T-A / T-B) present and green.

A review checklist the agent runs on every PR:

- List every place an object id enters the process (path, query, body,
  webhook, queue, tool args, search, file key, cache key).
- For each, show the exact function that creates the shop context and the
  exact store call that loads the object; quote the tenant predicate.
- Confirm the shop identity cannot be set from a client body, a header,
  a tool argument, or the model.
- Confirm connector tokens are loaded only after the object-level Allow.
- Output a table: path → control → test → PASS/FAIL. No praise.

## Moment 4 — Release (before going live)

Release is blocked until:

- The isolation suite T-A is green (with no skipped tests).
- The injection corpus T-B is green.
- A secret scan is clean (no key-shaped strings in the repo).
- The dependency list (SBOM) is current and reviewed.
- The tool catalogue hash is verified.
- The kill switch is documented for this release's features.

One running rule from the evidence: isolation, authorization and send-path
bugs block release; copy and UI bugs do not.

## Moment 5 — Operate (while the product runs)

Two things run continuously:

- **Alerts** that fire on anomaly, not on noise:
  - a spike in tool denials,
  - a spike in outbound send volume,
  - a burst of cross-shop 403s (those are almost always someone probing),
  - a cost spike (model spend),
  - a provider egress pattern outside the subprocessor list.
- **Quarterly tabletop**: a short scripted exercise, e.g.
  "a Meta token was stolen", "a CRM note is injecting instructions",
  "cost ran away overnight", "an IdP mis-bound a user to the wrong shop".
  The point is muscle memory before the real incident.

Plus the incident-response spine from `escalation_sla.md`:
a severity model (Sev 1 = security/outage, etc.), a chronological trail
that travels with an escalation, and a named incident owner.
   channel.
4. No production tokens in the repo or in the agent's local environment;
   any token the agent can read is disposable/scoped per preview.
5. New tools default-deny; no free-text destinations; egress is allowlisted.
6. Every authorization branch has a two-shop test.
7. Secrets never enter a prompt, a log, or a trace.

## The two audit prompts Swaraj can paste into the agent

### Isolation audit (Branch A)

> Tend isolation audit. Fixtures: two shops Bloom and Bob with distinct
> contacts, conversations, OAuth connections, files, and vector chunks.
> List every place an id enters the process. For each, show the exact
> function that mints the shop context and the exact store call that loads
> the object; quote the tenant predicate. If a path has no predicate, mark
> FAIL. Confirm the shop context cannot come from a client body, tool
> argument, or X-Tenant header. Run the isolation suite; any test not
> present is FAIL. List repository functions that do not take the shop
> context as their first argument. Output a table: path → control → test
> → PASS/FAIL. No style commentary.

### Agent-security audit (Branch B)

> Tend agent-security audit. Assume the model is hostile and every CRM note
> is an attacker. Draw the path from an inbound WhatsApp text to a side
> effect; name the module that can say No after the model says Yes. List
> every tool enabled for a default shop; for each: side-effect class,
> destination constraints, step-up rule, connector identity. Tools that can
> send, move money, or export without a human are FAIL. Show the JSON schema
> for each tool; a loose schema is FAIL. Quote where untrusted retrieved
> text is labeled; if CRM notes share the system prompt's channel, FAIL.
> Prove tokens never enter prompts or traces. Run the injection corpus.
> For the approval screen, show the bytes sent equal the bytes shown.
> Output PASS/FAIL per item. No style commentary.

## When the audit says FAIL

A FAIL is not a rebuke; it is a finding. The rule from the evidence:
every incident or failed test adds a regression test mapped to the leaf it
touched, so the same hole cannot ship twice. And when the audit finds a gap
in the *framework itself*, the framework is updated — this document is
meant to grow as we learn.

## Working decision

The audit framework is: five moments (design, implement, review, release,
operate) + two test suites (T-A isolation, T-B injection) + the 17-branch
taxonomy as the index + the two natural-language audit prompts Swaraj runs
with his agent. The machine part (the test suites) is the real gate;
the natural-language part is the founder's eyes.

## Boundary

- The framework is for Tend's own build (the product + the product team's
  internal security). It is not the external audit program — that is
  [`when_do_we_need_a_formal_audit_soc2_iso27001_or_pentest.md`](when_do_we_need_a_formal_audit_soc2_iso27001_or_pentest.md).
- The concrete tooling (which static scanners, which CI gates) is Level 3.
- How the rules are enforced while coding with the agent is the next document.

## Related

- Security spine and test suites: [`how_do_we_make_a_software_product_secure.md`](how_do_we_make_a_software_product_secure.md)
- Build-time enforcement: [`how_do_we_apply_security_while_coding_with_agentic_tools.md`](how_do_we_apply_security_while_coding_with_agentic_tools.md)
- Severity model: [`../../research/escalation_sla.md`](../../research/escalation_sla.md)
- Trace design: [`../../research/observability_explainability_and_finetuning_research.md`](../../research/observability_explainability_and_finetuning_research.md)
