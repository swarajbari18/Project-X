# How do identity and authority join?

## Why this question exists

This question is not in the Level 1 list, but it has to be asked here. Authority means "who may act under what grant." None of that is real until we know the person speaking is actually the person the grant names.

Our earlier categories left identity at "Tend asks the Identity Provider." This category is where that decision actually bites, because authorization is the whole point.

## Our provisional answer

- **Authentication** (who is speaking) is handled by the Identity Provider. Tend asks an identity provider to verify a person before treating them as that person. Tend does not authenticate users itself.
- **Authorization** (what a verified identity may do) is handled by the business configuration. Tend stores which identity holds which role and which grants, and only the configurator can change it.
- **Joining the two**: every authorized action must carry a verified identity. The grant names a person or role; the runtime verifies that the person making the request (or the grantor of the range) really is who they claim to be, then applies the grant.

Because these two are separate, a person who is verified as an employee still has only the authority the business granted to employees — verification and authority are not the same.

## What this resolves

Identity and authority are two different layers:

- Identity Provider = proven who you are.
- Business config = what you may do.

The design keeps them separate, which prevents an "identity works" fact from becoming unlimited authority.

## What remains open

- The exact mapping of a verified identity to a role at runtime.
- How a verified identity is carried through the tool calls so the enforcement layer can confirm the actor for each grant.
- How roles survive an employee leaving or a role change (this connects to the end-of-grant work).

This area is more provisional than the grant model itself. It needs its own research once identity and role management are designed.