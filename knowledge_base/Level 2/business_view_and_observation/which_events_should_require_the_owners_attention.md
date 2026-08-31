# Which events should require the owner's attention?

## The short answer

The owner's attention is for a material change or inaction that nobody else safely owns. Three classes reach the owner: decisions only the owner can make, owner-risking deadlines or notices, and escalations that drifted past the delegated people. Everything else stays with the delegated employee or role, while remaining visible in the appropriate situation or assignment artifact.

## Why this needs an explicit answer

Product Vision names the hardest problem: when the right next step requires a person to act and that person does not act, Tend must make the inaction visible and keep the situation moving until a safe person takes responsibility. But agency also means noticing important events: a prospect replied, a payment arrived, an external agent returned a lead, or a deadline moved. An event does not reach the owner merely because it happened; it reaches them when it changes a decision, creates owner-level risk, or crosses delegated responsibility. Most situations have a delegated employee or an authorized Tend behaviour that is the right next owner — the owner should not see every one of those. The research adds: the owner fears the *unknown miss*, not the visible workflow. So the filter must be: what reaches the owner is exactly what nobody else safely owns or what materially changes the business.

## The three classes that reach the owner

1. **Decisions only the owner can make.** These come from the grant and authority model (Authority and Ownership): the approval, exception, or preference that is outside any delegated range and has no one else who holds it.
2. **Owner-risking deadlines or notices.** A tax or compliance deadline, an open chargeback window, a formal complaint, an at-risk customer about to leave — the events where inaction risks the business itself, not just one conversation.
3. **Journey-level escalations that drifted past the delegated people.** An employee was asked, then reminded, then escalated, and the work is still stuck — now it surfaces to the owner as "this has drifted past everyone assigned."

## What does not reach the owner

Routine progress, healthy waits, a normal reply that Tend can handle under an existing grant, hand-offs that moved correctly, delegated approvals inside someone's grant, and operational metrics do not interrupt the owner. They remain available through situation, assignment, or search artifacts. These are the delegated layer's business.

## The "alerts on top" rule

This joins Explainability D3 ("nothing waits to be discovered"): the owner's snapshot never requires the owner to go hunting. Alerts ride on top of the situation baseline. But alerts are filtered by the three classes above, so the owner is not flooded with delegated work.

## Risk flags that land on the owner

The layered risk computation feeds this filter:

- **Deterministic base**: stale tracking, deadline passed, open chargeback window, no response past SLA — these are computable and always true.
- **LLM suggestions**: "quietly at risk" flags (customer going quiet, review risk, dispute forming) — but a suggestion only takes effect when it lands on a deterministic rule. An LLM's self-assessed confidence is never a safety authorization.

So a "customer went quiet" suggestion becomes owner-visible only when a rule (e.g. no response in N days with a pending commitment) supports it. Conversely, a meaningful event such as a prospect accepting a meeting, an employee changing ownership, or an external agent returning a materially relevant lead can surface immediately when it changes the business's next decision.

## Configuration, not concept

- Which deadlines are owner-risking, how long before a drifted escalation surfaces, and the risk-tier thresholds are business configuration.
- The intervention actions (step in, chat to Tend, ask to elaborate, then resume) are conceptually clear from Product Vision; their exact shape is a later design decision.

## Related

- [what_should_the_business_owner_see_in_a_snapshot_of_the_business_journey.md](what_should_the_business_owner_see_in_a_snapshot_of_the_business_journey.md)
- Owner-attention and grants: [../authority_and_ownership/understanding_all_authority_and_ownership_questions.md](../authority_and_ownership/understanding_all_authority_and_ownership_questions.md)
- Alerts on top: [../explainability_and_observation/what_information_should_always_be_visible_to_the_business.md](../explainability_and_observation/what_information_should_always_be_visible_to_the_business.md)
