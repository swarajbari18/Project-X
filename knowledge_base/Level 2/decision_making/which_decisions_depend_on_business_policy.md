# Which decisions depend on business policy?

## Where this question comes from

The business owns its policies. Project X applies them while helping the business operate.

This question asks which Project X behaviours cannot be selected from observed facts alone.

## Our current answer

Facts may describe what happened. Policy determines how the business wants Project X to respond.

For example, facts may show that a delivery is late. Policy may determine whether Project X should:

- tell the customer immediately;
- wait longer;
- contact the delivery partner;
- create an employee task;
- offer compensation;
- or request owner approval.

The policy is not the same as the delivery fact.

## Different kinds of rules

We should keep these separate:

- Product invariants, such as never guessing;
- Capability rules, such as what a tool can do;
- Security authorization, such as who may invoke a capability;
- Communication and channel rules;
- Business policy, such as what the business wants to happen;
- and workflow or coordination state.

Decision Making uses all of these boundaries. It should not silently treat them as one type of rule.

## Missing and conflicting policy

Project X must not invent a business preference when policy is unclear.

The working fallback order is:

1. Apply an active business policy.
2. Apply an explicit business fallback.
3. Apply a safe product capability default when one exists.
4. Create human work, escalate or stop safely.

If Project X uses a fallback because a policy was unclear, contradictory or expired, it should tell the business what happened and why.

“Most logical” is not a sufficient runtime rule for resolving a business policy conflict.

## Working decision

Business policy constrains the set of Project X behaviours and determines when different behaviours are appropriate.

Project X applies policy. It does not define the business’s goals or invent policy at runtime.

Fallbacks are themselves explicit behaviour rules and must be traceable.

## Later research

We need research into:

- how businesses express exceptions;
- how policies are delegated and changed;
- how policy expiry is handled;
- how conflicting policies are resolved;
- and which product defaults are safe for each capability.

