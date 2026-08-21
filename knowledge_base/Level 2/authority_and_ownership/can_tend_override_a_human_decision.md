# Can Tend override a human decision, and can a human override Tend?

## The short answer

No — and the "override"? framing is wrong. Override does not exist as a concept inside Tend, because Tend never holds authority of its own.

## Our answer

The two Level 1 questions assume there is a thing called "override." We decided this whole idea does not belong in the category.

**Can Tend override a human decision?** Tend does not have a decision of its own to override anyone with. It holds no authority as a principal. It proposes behaviour and enforces the grants and invariants the business set. So there is nothing for it to "override."

**Can a human override Tend?** A person who calls for an otherwise-forbidden action is not overriding Tend. Either:

- the person holds the authority for that call (so the action is inside the range — it was always allowed), or
- the person does not hold that authority (so Tend refuses and escalates to someone who does).

So the "override" is really a **re-scope of the grant by a higher authority**, which is just delegation, not override. And no one — not even the configurator — can override the product invariants. If new behaviour is genuinely needed, it is a product feature built inside the invariants.

## Invariants are not overridable

This is the hard line we chose. An invariant is a rule no one authorizes. The configurator can change business rules (content) freely, but cannot configure around a behavioural invariant. The only way to change an invariant is to change the product.

## What this means for the question list

These two Level 1 questions are not answered so much as **translated**: they become "Who holds the authority for this call, and is it inside a grant?" which is answered by the grant model, not by an override mechanism.

## Why this is the right design

The whole product depends on a living person at the end of the chain being accountable, and on the business remaining in control of its own decisions. If "override" held real meaning, it would let someone (Tend or a human) step outside the grants and invariants, which would break both. Removing the concept keeps the boundary honest.
