# Understanding all the Authority and Ownership questions

## Status

The delegated-range boundary model is decided. The category has working answers to the core questions. Remaining items are configuration defaults (the default range for a fresh small business) and research (corporate scaling, identity-role joining), not conceptual gaps.

This is the map for the Authority and Ownership category. Individual question documents preserve the reasoning.

## Why this category exists

Authority and Ownership answers one question that everything else keeps touching:

> When is a proposed action allowed, by whom, under what grant, with whom accountable, and how does that authority grow and end?

Every earlier category pointed its leftover threads here. Gathering separated ownership from permission. Trust and Evidence separated source authority from approvals. Decision Making said it does not enforce authorization. Human Collaboration said it does not grant access. This category reconciles all of those.

## The central model: the delegated-range boundary

The whole category runs on one idea:

**Tend does not own anything. The business grants Tend a range of delegated authority. Tend acts freely inside the range, never above the delegator. Outside the range it asks or escalates. The product invariants sit as a hard line that even the configurator cannot cross.**

Effective Tend permission = what the grant allows ∩ what the owning system/data-sharing rules allow. Tend can only reduce access, never expand it. This matches the delegation-not-impersonation research.
## The questions and where the answers live

### Ownership

- [Which actor owns each type of information?](which_actor_owns_each_type_of_information.md)
  Ownership is claim-specific; separate from source, truth and permission.
- [Which actor owns each decision?](which_actor_owns_each_decision.md)
  Split business-outcome decisions from Tend's-next-behaviour, and separate who decides / approves / acts / answers.
- [Which actor owns each action?](which_actor_owns_each_action.md)
  Separate performer / authorizer / accountable. Every action traces to a person who approved the grant.

### Granting

- [Who may grant authority, and what does Tend come with by default?](who_may_grant_authority_and_what_comes_by_default.md)
  Only the signup owner or an explicitly assigned configurator may grant. Tend ships with a default range for small businesses.
- [The business configuration capability](the_business_configuration_capability.md)
  Only the configurator's agent has the power to write grants; it is a distinct set of deterministic tools.

### Acting

- [When is Tend allowed to perform an action?](when_is_tend_allowed_to_perform_an_action.md)
  Inside the grant and inside the invariant line. Checked before the action runs, not by trusting the LLM.
- [When must Tend ask for approval?](when_must_tend_ask_for_approval.md)
  When the grant requires an approver, or when the action is outside the range. Approval is grant-time or execution-time.
- [How should Tend communicate a refusal and offer escalation?](how_should_tend_communicate_a_refusal_and_offer_escalation.md)
  Refuse honestly, say why, offer the path, escalate when possible. An invariant break has no approval path.

### Override and accountability

- [Can Tend override a human decision, and can a human override Tend?](can_tend_override_a_human_decision.md)
  Override does not exist. It is a re-scope of the grant by a higher authority. Invariants are unbreakable.
- [Who remains accountable after an automated action, and how do we prevent responsibility from becoming unclear?](who_remains_accountable_after_an_automated_action.md)
  The grantor answers for the moving work; the institution answers for root cause in a no-blame loop.

### End of authority

- [How does a grant end, and how does role change affect authority?](how_does_a_grant_end_and_how_does_role_change_affect_authority.md)
  A created/active/changed/ended lifecycle. A grant always resolves to a verified, currently-valid holder.

### Identity

- [How do identity and authority join?](how_do_identity_and_authority_join.md)
  Authentication = identity provider. Authorization = business config. Every action carries a verified identity.
## What the earlier categories contributed

- **Gathering**: ownership (responsible for record) is separate from source, truth and permission.
- **Trust and Evidence**: authority is claim-specific; the check does not bypass permissions or approvals.
- **Decision Making**: authorization is enforced by the control layer, not selected by the LLM.
- **Human Collaboration**: the accountable owner of a work item, and the rule that the owner may be a role/queue.

## What this category does not decide

Authority and Ownership does not:

- decide business policy;
- authenticate anyone (that is the identity provider);
- define the phrasing of every channel message (that is Communication);
- create the overall coordination/time model (that is Coordination/Time);
- or own the owner's business-journey snapshot (that is Observation/Explainability).

## The scaling question (provisional)

The Level 1 list asks whether the same shape scales from a small business to a corporate. Our working answer: yes, because the whole model is one grant lifecycle. A small business uses the default range and a small config; a large business narrows the default, assigns roles, and uses the same grant/enforce/end machinery. Corporate scaling will need research (roles at scale, delegated configurators, per-department grants), but the concept does not change.

## Remaining open

- The exact content of the default range for a fresh small business (needs research, and it differs by connector/domain).
- How corporate permission structures map onto a role-grant model.
- The exact identity↔authority join at runtime.
- How the refusal wording and escalation routing vary by channel and actor.
- How "wait when there is no approver" ties into the Coordination/Time categories.

These are the working map for Authority and Ownership. The concept is decided; the defaults and the corporate mapping are the next research.
