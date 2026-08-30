# How do we apply security while designing for Level 3, coding with an agent, and deploying?

## Where this question came from

Swaraj asked it during this batch. In his own words, the worry behind it:

> "This would be an active process. This would be something that I would
> have to do while also sort of developing this application, testing this
> application, even reading the code itself. When reading the code, I am
> myself familiar in Python, but we are planning to write the code in
> TypeScript. So that is another few standards that we have to understand.
> So how do I check security? I can only check things in natural language.
> The AI agent will help me with that."

So the answer is: a process, not a checklist. It must survive daily work
with Claude Code / Cursor-class tools, on a TypeScript + Cloudflare stack,
where most of the code is written by an agent and reviewed in natural
language.

## The core posture: the agent is an untrusted intern, not a security boundary

The evidence from practitioners (Grok's social-chatter pass) is blunt:
the agent is a fast, confident writer that, unless prompted, often omits
security controls altogether (the Tenzai "Bad Vibes" benchmark found
69 vulnerabilities across 15 apps, and none of the apps implemented CSRF).
Separately, the agent environment itself is an attack surface — repo
config files, hooks and MCP servers can carry instructions.

So the rules below treat the agent as capable and well-meaning but not
authoritative about security. Authoritative means: the rules, the schemas,
and the tests. The agent executes; the gates decide.

## Design for Level 3 — what security constraints Level 3 must satisfy

Before any technology decision, the design must carry these requirements
from the earlier documents:

- **Isolation is mechanical.** Every store, cache key, queue envelope,
  Durable Object name, and service binding carries the shop's identity.
  There is no "remember to filter by tenant"; the structure makes it
  impossible to skip.
- **The control plane is a subsystem, not a helper.** The shop context,
  the policy decision, the append-only audit, and the connector-token vault
  are first-class pieces of the architecture (this is what Architecture,
  the next batch, must build).
- **Model output is data.** The model's proposals flow through a schema
  before they can become a tool call; the tools live in a versioned,
  hashed catalogue.
- **Egress is mechanical.** Any fetch goes through a single allowlist gate.
- **Secrets are isolated.** No secret can reach the prompt, the logs, or the
  repo. The TypeScript codebase adds one more rule: `.dev.vars` and env
  shapes are never committed, and the agent's local environment never holds
  production tokens.

Level 3 picks the concrete pieces to satisfy these constraints:
which store product, which schema library, which policy module, which
secrets store, which CI gates. The constraints are already decided here.

## While coding with the agent — the standing rules

These are the rules the coding agent follows on every change. They are the
implementation side of the audit framework's Moment 2.

1. **Tenant is typed and always present.** Every store call takes the shop
   context as its first parameter; a call without it does not compile.
2. **Model output goes through schema before action.** The agent never
   writes a path where a model string becomes an argument, a header, a URL,
   or a render without a schema check in between.
3. **Untrusted text is labeled.** CRM notes, messages, emails, tickets,
   webhook payloads are marked untrusted and never enter the system
   prompt's instruction channel.
4. **New tools default-deny.** A capability does not exist for a shop until
   the shop enables it and a reviewer passes the tool's schema, scope and
   destination rules.
5. **Allowlists, not denylists.** Destinations (phone, email, chat), egress
   hosts, and model-provider list are allowlists.
6. **No production secrets anywhere the agent can read.**
7. **Every authorization branch carries a two-shop test.**
8. **The agent must not invent a security fix without a test.** "I added
   input validation" is not done; the failing test that would have caught
   the hole is the proof.

Swaraj's natural-language review loop with the agent, on every PR:

> Map this diff to the security taxonomy. For each touched leaf, show the
> control, the test that proves it, and the residual risk, in plain words.
> If it touches isolation, the model surface, or secrets, fail the review
> unless the T-A / T-B tests are present and green.

## While reviewing — one more rule specific to agent-written code

Agent code needs a different review prompt than human code, because the
misses are different. Human reviewers catch logic errors; agent code tends
to miss the security control entirely while looking perfect. So the review
prompt asks explicitly:

- "Did the previous version of this function have an authorization check
  that this version dropped?" (agents silently regress)
- "Show the store query; is the shop predicate present?"
- "Show the external call; is the destination on the allowlist?"
- "Show every place a model-produced value is used; is there a schema in
  between?"
- "Are there hardcoded credentials, keys, or tokens anywhere in this diff?"

## While deploying — the release gates

Release is blocked until the deployment pipeline itself is trusted:

- Build runs the isolation suite T-A and the injection corpus T-B.
- Secret scan is clean (no key-shaped strings, no `.dev.vars`, no env dump).
- Dependency scan is clean and the SBOM is current.
- The tool catalogue hash is verified before the build ships.
- The kill switch is documented for this release.
- The deployment is reproducible from the reviewed commit, so "what is
  running" is always equal to "what was reviewed".

Evidence for these gates: NIST SSDF's release and vulnerability practices,
and the practitioner consensus that build-time gates (what may merge) beat
prompt-time wishes.

## While running — the operate loop

Already decided in the audit framework's Moment 5, but the TypeScript /
Cloudflare shape adds specifics:

- Alerts on tool-deny spikes, outbound volume spikes, cross-shop 403s,
  cost spikes, and egress outside the subprocessor list.
- Durable Object names and cache keys carry the shop identity, so a
  cross-shop anomaly is impossible by construction, not by habit.
- Workers for Platforms: if any tenant (or an agent) can ever deploy code,
  it runs in an untrusted dispatch namespace with that tenant's own
  bindings only, and no shared cache keyspace or shared data binding.

## The TypeScript-specific consideration

The switch from Python to TypeScript is not just syntax; it changes where
common mistakes hide:

- Types are the first line of defense: the shop context as a typed parameter
  turns a missing-tenant bug into a compile error. This is the strongest
  reason the type system must be used deliberately, not defeated with `any`.
- The agent will sometimes "fix" a type error with `as` casts or `any`.
  The review prompt must call that out.
- Runtime validation (schema checks) is still needed at every boundary;
  TypeScript types disappear at runtime.
- Import/supply chain is a bigger surface than in Python in practice:
  the dependency tree must be scanned and pinned.

## Working decision

Security while designing, coding and deploying is a process with five
moments (design / implement / review / release / operate) and one posture:
the agent is fast and helpful, but the rules, schemas and tests decide.
TypeScript's type system is used as a defense (typed tenant context),
runtime schema checks still guard every boundary, nothing the agent can
read holds a production secret, and deployment only ships what the review
and the test suites accept.

## Boundary

- The concrete tools (which scanner, which schema library, which CI) are
  Level 3.
- This document is the product-team process; the external audit program is
  [`when_do_we_need_a_formal_audit_soc2_iso27001_or_pentest.md`](when_do_we_need_a_formal_audit_soc2_iso27001_or_pentest.md).

## Related

- The audit moments: [`the_security_audit_framework.md`](the_security_audit_framework.md)
- Security spine and suites: [`how_do_we_make_a_software_product_secure.md`](how_do_we_make_a_software_product_secure.md)
- Social chatter (agent risk evidence): [`../../research/security_social_chatter_grok_transcript.md`](../../research/security_social_chatter_grok_transcript.md)
- NIST SSDF: [`../../research/security_and_compliance_research_record.md`](../../research/security_and_compliance_research_record.md)
