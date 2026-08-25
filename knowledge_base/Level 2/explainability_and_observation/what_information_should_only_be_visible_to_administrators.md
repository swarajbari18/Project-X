# What information should only be visible to administrators?

## The short answer

The administrator is the configurator — the person the owner delegated setup to. Their default set: business configuration itself, grants and approval history, the audit trail, system-level declarations — plus, on demand, minimal masked traces of how a situation was resolved, including raw reasoning summaries but never the model's internal chain-of-thought.

## Who the administrator is

This was already decided; this batch only applies it. Level 1's actors section: the owner "may delegate the setup to an assistant, an employee, or a family member who knows the business." Authority and Ownership: only that configurator can create or change grants, through a configuration capability no other agent holds, under no-self-grant (separation of duties). The journeys map names it exactly: "assistant who knows the business sets up channels, KB, rules, integrations" — Swaraj's father→son case.

In a small business one person often wears both hats (owner and configurator). That is fine; the roles stay conceptually distinct and split naturally as businesses grow.

## The default admin-visible set

1. **Business configuration** — policies, rules, sources, channels: their own setup.
2. **Grants and approval history** — which capability was tied to which approver, who approved what, when.
3. **The audit trail** — declared outcomes, escalations, capability-absent conclusions.
4. **Minimal masked traces, on demand** — how one situation was resolved: situation model → sources gathered from → response given. User data masked. Reasoning summaries included.

Explicitly excluded:

- **Internal chain-of-thought** — proprietary to the product builder; also needed unmasked for fine-tuning data. Admin sees reasoning *summaries*, not the raw thinking.
- **Anything beyond need-to-know for other actors' private context**, per Communication's rule.

Swaraj's reasoning during the walkthrough, kept because it is the principle: giving administrators the audit trace with masked data is transparency — they can see how things work without receiving the internals. Like ChatGPT showing it gathered from sources without exposing its internal deliberation.

As businesses grow, Authority's scaling rule narrows what each role sees — the configurator's own visibility is no exception to per-role narrowing once distinct roles exist.

## Boundary

- Enforcing these boundaries technically — masking, access control (Level 3).
- Who may grant authority at all (Authority and Ownership).
- Builder-only material: function-level traces, prompts, gift-CoT, drift signals — never in an admin viewer.

## Related

- [What information should always be visible to the business?](what_information_should_always_be_visible_to_the_business.md)
- [`../authority_and_ownership/who_may_grant_authority_and_what_comes_by_default.md`](../authority_and_ownership/who_may_grant_authority_and_what_comes_by_default.md) — the configurator role this builds on.
