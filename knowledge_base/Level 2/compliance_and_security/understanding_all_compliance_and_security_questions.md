# Understanding all the Compliance and Security questions

## Status

Working decisions recorded. The conceptual spine is settled.
Remaining items are the per-market legal values, the concrete audit
providers and the exact incident-response automation — configuration and
Level 3, like every earlier category left its knobs.

This is the map for the Compliance and Security category.
The conversation record is
[`compliance_and_security_conversation_and_discoveries.md`](compliance_and_security_conversation_and_discoveries.md).

## Why this category exists

Level 1's three questions look like three separate problems.
We found they are really different kinds of rule over the same data,
plus one framework the founder needs:

- Compliance: which rules govern the data and messages that flow between
  Tend, the business, the customer, and the connected systems?
- Security: how do we make a product safe where an LLM proposes actions
  against business data?
- The audit framework: how does the founder check, at each stage of building,
  that nothing has broken?

Underneath all three sat one fact that everything hangs off:
the product runs an LLM over multi-tenant business data.
That is the hardest thing to keep safe, and every other decision in this
category exists to keep it safe.

## The spine, in plain words

> **The model proposes. The deterministic control layer decides.
> Compliance is one folder holding every rule source — the government's
> rules, the platforms' rules, the buyers' rules, and any rule kind we
> discover later. Security means one business can never see another
> business's data, anything the model proposes is checked before it runs,
> and what the model says is data, never instructions.**

## The Level 1 questions and where each answer lives

1. **What are the compliances of each actor and each tech stack we will use?**
   — Walk every actor and every component: what data flows, who made the rule,
   what Tend must guarantee. Compliance is one folder with three rule sources
   (law, platform, buyer) plus any future one. See
   [`what_are_the_compliances_of_each_actor_and_tech_stack.md`](what_are_the_compliances_of_each_actor_and_tech_stack.md).

2. **How do we make a software product secure? What are the best security practices?**
   — The security spine: the model proposes, a deterministic control layer decides.
   Three new product invariants. The list of what can never be left to the LLM.
   The two test suites that must stay red if a control breaks. See
   [`how_do_we_make_a_software_product_secure.md`](how_do_we_make_a_software_product_secure.md).

3. **How do I think and audit whatever I have implemented at each point, with a
   security framework I can apply to find gaps?** — The audit framework:
   five moments (design, implement, review, release, operate), each with
   concrete checks; the two test suites; the founder's natural-language audit
   prompts. See
   [`the_security_audit_framework.md`](the_security_audit_framework.md).

## The questions Swaraj added during the batch (and their answers)

4. **Do I have to get my app formally audited somewhere (SOC 2 / ISO / pentest)?**
   — The evidence-backed sequencing decision: no formal audit now; pentest +
   security packet now; SOC 2 Type I when a named buyer or an unanswered
   questionnaire demands it; Type II only when a repeatable ICP requires it. See
   [`when_do_we_need_a_formal_audit_soc2_iso27001_or_pentest.md`](when_do_we_need_a_formal_audit_soc2_iso27001_or_pentest.md).

5. **How do I apply security while designing for Level 3, while coding with an
   agent, and while deploying — the complete SDLC with agentic coding tools?**
   — The build-time rules the agent must follow, the review gates, the release
   gates, the operate alerts, and the Cloudflare platform rules. See
   [`how_do_we_apply_security_while_coding_with_agentic_tools.md`](how_do_we_apply_security_while_coding_with_agentic_tools.md).

## What the earlier categories contributed

- **Channels and Permissions** — consent-as-law, directional consent,
  the per-channel rule record, the white-list legal ceiling (GDPR Article 25,
  DPDP fiduciary), the fallback lane.
- **Authority and Ownership** — the delegated range, the configurator line,
  "checked before the action runs, not by trusting the LLM",
  effective permission = grant ∩ owning-system permission,
  authentication outsourced to the Identity Provider.
- **Growth and Evolution** — the typed configuration registry, the capability
  join lifecycle with validate and test stages, the legal bounds on policy
  structures and grant scopes, "the invariants are a hard line".
- **Memory and Knowledge** — credentials, secrets and authentication material
  never become memory.
- **Trust and Evidence** — identity providers are authoritative for their own
  authentication result.
- **Observability / Explainability** — the trace (deterministic evidence +
  structured emitted reason), the product builder as deepest viewer,
  golden tests including expected-refusal cases.

## What this category does not decide

Compliance and Security does not:

- pick the concrete technology (Cloudflare specifics, audit providers, pentest
  tooling — those are Level 3);
- decide who holds each grant (that is Authority and Ownership);
- decide which channel may send what (that is Channels and Permissions);
- write the exact consent wording per market (that is product + legal, per market);
- decide the LLM's drafting behaviour (that is Communication);
- define business policy (that is the business, per Decision Making and Growth).

## Remaining open

- The exact per-market legal values (consent durations, deletion windows,
  the white-list ceilings). Known by market research; to be enumerated when a
  market is entered.
- Concrete audit provider and the SOC 2 timeline (Level 3).
- Whether any tenant code will ever run inside Tend (Workers for Platforms).
  If it does, the untrusted dispatch namespace rules apply.
- The exact incident-response automation built into the product.

## Related

- Conversation record: [`compliance_and_security_conversation_and_discoveries.md`](compliance_and_security_conversation_and_discoveries.md)
- Research record: [`../../research/security_and_compliance_research_record.md`](../../research/security_and_compliance_research_record.md)
- Grok breadth: [`../../research/security_taxonomy_grok_breadth_transcript.md`](../../research/security_taxonomy_grok_breadth_transcript.md)
- Grok depth: [`../../research/security_tenant_isolation_and_llm_deep_dive_transcript.md`](../../research/security_tenant_isolation_and_llm_deep_dive_transcript.md)
- Grok social chatter: [`../../research/security_social_chatter_grok_transcript.md`](../../research/security_social_chatter_grok_transcript.md)
- Channel facts: [`../../research/wa_compliance.md`](../../research/wa_compliance.md),
  [`../../research/channel_compliance_matrix.md`](../../research/channel_compliance_matrix.md)
- Market readiness: [`../../research/global_market_readiness.md`](../../research/global_market_readiness.md)
- Escalation/severity: [`../../research/escalation_sla.md`](../../research/escalation_sla.md)
