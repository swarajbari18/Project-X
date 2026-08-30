# Security and Compliance research record

## Status

This is a research record, not a decision record. It preserves the evidence
the Compliance and Security batch was built on: what was verified directly
from primary sources, what was reported as figures or practitioner chatter,
and what remains uncertain. The decisions live in
`knowledge_base/Level 2/compliance_and_security/`.
This record exists so the evidence can be re-checked rather than believed.

The raw transcripts are:
- [`security_taxonomy_grok_breadth_transcript.md`](security_taxonomy_grok_breadth_transcript.md)
- [`security_tenant_isolation_and_llm_deep_dive_transcript.md`](security_tenant_isolation_and_llm_deep_dive_transcript.md)
- [`security_social_chatter_grok_transcript.md`](security_social_chatter_grok_transcript.md)

## How the research was done

Two channels, correlated:

1. **Grok** as the breadth-generator and social-chatter signal. Grok can
   read what practitioners post on X and can search. Three passes:
   breadth taxonomy, depth on tenant isolation + LLM security,
   social chatter on the four questions.
2. **My own web search and fetch** as the verification channel.
   Direct fetches of the primary sources (OWASP, NIST, MITRE, NCSC/CISA,
   the DPDP Act, AICPA).

The correlation rule we used: when the two channels agree, the decision is
solid; when they disagree or the primary source is weak, we say so.

## Verified facts (fetched directly from the primary source)

### OWASP Top 10:2025
A01 Broken Access Control · A02 Security Misconfiguration · A03 Software
Supply Chain Failures · A04 Cryptographic Failures · A05 Injection ·
A06 Insecure Design · A07 Authentication Failures ·
A08 Software or Data Integrity Failures · A09 Security Logging and Alerting
Failures · A10 Mishandling of Exceptional Conditions.

### OWASP API Security Top 10:2023
API1 Broken Object Level Authorization (BOLA) · API2 Broken Authentication ·
API3 Broken Object Property Level Authorization · API4 Unrestricted Resource
Consumption · API5 Broken Function Level Authorization · API6 Unrestricted
Access to Sensitive Business Flows · API7 Server Side Request Forgery ·
API8 Security Misconfiguration · API9 Improper Inventory Management ·
API10 Unsafe Consumption of APIs.
The BOLA entry is explicit: "the user is allowed to call the endpoint;
the bug is the object id", and comparing `jwt.sub` to an id parameter is
not enough. This is the highest-severity class for multi-tenant SaaS.

### OWASP Top 10 for LLM Applications 2025
### OWASP Agentic Top 10 for 2026 (Grok-reported; existence verified on genai.owasp.org)
ASI01 Goal Hijack · ASI02 Tool Misuse · ASI03 Identity/Privilege Abuse ·
ASI04 Supply Chain · ASI05 Unexpected Execution · ASI06 Memory Poisoning ·
ASI08 Cascading Failures · ASI09 Human-Agent Trust · ASI10 (exact entry to
be verified at write-up).
Also Grok-reported: an MCP Security Top 10 (MCP01 Token Exposure, MCP02
Scope Creep, MCP03 Tool Poisoning, MCP05 Command/API Injection, MCP06
Intent-flow Subversion, MCP07 Insufficient Authorization, MCP08 No
Telemetry, MCP09/MCP10 to be verified).
These lists are marked *Grok-reported* because the transcripts came from
Grok; the project existence is verified, the exact entries need a direct
fetch at Level 3.

### MITRE CWE Top 25 (2024)
Ranked: XSS, Out-of-bounds Write, SQL Injection, CSRF, Path Traversal,
Out-of-bounds Read, OS Command Injection, Use After Free, Missing
Authorization, Unrestricted Upload, Code Injection, Improper Input
Validation, Command Injection, Improper Authentication, Improper Privilege
Management, Deserialization of Untrusted Data, Exposure of Sensitive
Information, Incorrect Authorization, SSRF, Buffer bounds, NULL Deref,
Hard-coded Credentials, Integer Overflow, Uncontrolled Resource Consumption,
Missing Authentication for Critical Function.
Security-relevant for us especially: Missing Authorization (#9) and
Incorrect Authorization (#18) — the "authz bugs are the real killers" signal.

### NIST SSDF and the GenAI profile
NIST SP 800-218 (SSDF 1.1) defines four practice groups (PO Prepare,
PS Protect, PW Produce, PV Protect Vulnerabilities) and is the language for
integrated secure development. NIST SP 800-218A is the Generative AI /
dual-use foundation model community profile that augments SSDF for AI
development.

### NCSC / CISA "Guidelines for secure AI system development"
Co-published by NCSC, CISA and an international coalition. Four phases:
secure design, secure development, secure deployment, secure operation and
maintenance. The 2026 NCSC posts on agentic AI urge "safeguards, sandboxing
and active oversight" — the same direction as OWASP's agentic list.

### Indian DPDP Act 2023
First Indian data-protection law. Consent-based; creates the Data Protection
Board; recognises the data fiduciary. Commencement staggered:
partial from November 2025, then November 2026, full remaining provisions
May 2027. Mandatory audit and DPIA obligations apply to Significant Data
Fiduciaries designated by the government — a high threshold, not the
default. (Sourced via Wikipedia's cited summary of the Act; the Act text
itself is the primary authority.)

### SOC 2 (AICPA) definition
SOC 2 is an AICPA-defined attestation report for service organizations.
Only licensed CPA firms can issue it. Five Trust Service Criteria:
Security, Availability, Processing Integrity, Confidentiality, Privacy.
Type I = design of controls at a point in time.
Type II = operating effectiveness over ~9–12 months.
The report is for a limited audience (customers, stakeholders).
LLM01 Prompt Injection · LLM02 Sensitive Information Disclosure ·
LLM03 Supply Chain · LLM04 Data and Model Poisoning · LLM05 Improper Output
Handling · LLM06 Excessive Agency · LLM07 System Prompt Leakage ·
LLM08 Vector and Embedding Weaknesses · LLM09 Misinformation ·
LLM10 Unbounded Consumption.
The 2026 edition (Grok-reported, released August 2026) reorders and adds
agentic framing; the 2025 list above is the verified baseline.

## Reported figures (practitioner/vendor-reported ranges — directional, not gospel)

- SOC 2 year-one all-in: ~$23k–50k lean, $50k–82k comfortable.
- Audit fees: $7k–30k lean, $20k–50k comfortable.
- GRC platform: $5k–25k.
- Pentest: $4k–12k typical SaaS web+API; India-priced ~$800–2,200;
  auditor-mapped $10k–15k.
- ISO 27001 year-one: often $35k–70k.
- "72% of enterprise SaaS startups have SOC 2 before Series A"
  (Bessemer-cited figure, vendor-amplified — treat as directional).
- Agent-written code: "Bad Vibes" benchmark (Tenzai) found 69 vulnerabilities
  across 15 apps and four coding agents, none implementing CSRF; which agent
  picked barely mattered. A circulating claim (~2.7x more authz/RLS mistakes
  in AI-written PRs) is researcher-carried, not gospel.

## Named incidents (real, cited by practitioners; verify at write-up)

- **ForcedLeak** — Salesforce Agentforce, September 2025 (Noma, CVSS 9.4).
  An attacker submitted a Web-to-Lead form; the description field carried
  ~42k characters of instructions. Later, a rep asked the agent about the
  lead; the agent exfiltrated data via an `<img>` to an expired
  Salesforce-allowlisted domain the researchers had bought. Salesforce
  patched with Trusted URL enforcement. This is the canonical
  "CRM note as payload" case and maps 1:1 onto Tend's data flow.
- **EchoLeak** — Microsoft 365 Copilot, CVE-2025-32711, CVSS 9.3.
  One crafted email could make Copilot exfiltrate internal data,
  bypassing the injection classifier.
- **Slack AI (2024)** — a public-channel post could steer the assistant
  toward private content.
- **Replit / PocketOS-class incidents** — excessive agency: an agent holding
  a production token performed destructive actions. The repeated lesson:
  never give an agent a production API token.
- Claimed catalogues (Permission Protocol tracking 128 sourced agent
  incidents by mid-2026, AgentAdmit's database) are vendor-colored;
  use them as catalogs, not rankings.

## Practitioner consensus vs disagreement vs hype (Grok's social-chatter read)

### Q1 — SOC 2 / ISO / pentest timing
- Consensus: pre-seed / SMB-only, skip the audit; answer questionnaires
  honestly, MFA/SSO on, 8–12 real policies, cheap pentest if a buyer asks.
  First enterprise logo or an unanswerable questionnaire -> start Type I.
  ISO 27001 first if EU/UK/APAC dominate; SOC 2 first if US enterprise.
- Disagreement: "build it before you need it" (compliance-vendor world)
  vs "get PMF first, then buy the cheapest real audit" (practitioner voice).
- Hype: "SOC 2 in a weekend"; identical cheap PDFs are now a reputation risk
  after the Delve-affiliated allegations.

### Q2 — AI coding agents
- Consensus: agents are a velocity win and not a security boundary;
  review agent PRs with a different checklist (authz, tenancy, secrets,
  CSRF/headers); never give the agent a production token; approval dialogs
  fatigue humans (~93% approval observed).
- Disagreement: which agent is "safer" flips every quarter — do not pick a
  vendor as the control.
- Hype: "just add a security subagent" (lint, not control); any
  "0.00% injection in Auto mode" claim.

### Q3 — Cloudflare multi-tenant
- Consensus: Cloudflare is a good multi-tenant substrate if bindings and
  cache keys are the boundary; "Workers isolates everything" is hype —
  isolates isolate compute, not your KV keyspace, cache, or shared D1.
- The silent cross-tenant bugs: shared cache not keyed by tenant
  (ctx.props exists for this); Durable Object names without a tenant prefix;
  a shared D1 binding handed to tenant code; KV used for authorization
  decisions (stale-allow). Untrusted dispatch namespace + only the tenant's
  own bindings for any tenant-run code.

### Q4 — production prompt injection
- Consensus: prompt filters fail; authorization in the tool layer is the
  control; retrieved data is hostile; "the model gets blamed; the standing
  key sets the blast radius".
- Disagreement: whether classifiers can get good enough — labs publish
  ~0.1% single-shot then 5–6% after adaptive tries; nobody ships
  classifier-only.
- Hype: "we fine-tuned away injection".

## What the research did NOT settle

- The exact per-market legal values (consent durations, deletion windows,
  white-list ceilings) — needs market-specific legal work per market entry.
- Whether the 2026 and MCP agentic lists' exact entries match the final
  official texts (Grok-reported; verify at Level 3).
- The specific auditor, GRC tool, pentest vendor, scanner, and their real
  quotes — Level 3 decisions when triggered.

## Related

- Decisions: [`../Level 2/compliance_and_security/understanding_all_compliance_and_security_questions.md`](../Level%202/compliance_and_security/understanding_all_compliance_and_security_questions.md)
- Grok breadth: [`security_taxonomy_grok_breadth_transcript.md`](security_taxonomy_grok_breadth_transcript.md)
- Grok depth: [`security_tenant_isolation_and_llm_deep_dive_transcript.md`](security_tenant_isolation_and_llm_deep_dive_transcript.md)
- Grok chatter: [`security_social_chatter_grok_transcript.md`](security_social_chatter_grok_transcript.md)
