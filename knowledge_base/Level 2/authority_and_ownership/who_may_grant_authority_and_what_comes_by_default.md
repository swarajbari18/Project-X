# Who may grant authority, and what does Tend come with by default?

## Why this question exists

The Level 1 list asks "When is Tend allowed to perform an action?" and "When must Tend ask for approval?" underneath those, there are two hidden questions that only became visible once we defined the delegated-range boundary model:

- **Who is allowed to create or change an authority grant at all?**
- **What authority does Tend have before anyone configures anything?**

These were not in the Level 1 list as explicit questions. They are load-bearing. If an employee could grant authority, the whole boundary collapses. If Tend had no default, a fresh business could not use it until a human configured everything.

## Our answer

### Only one person can grant authority

An authority grant is created or changed by only the person who sets Tend up: the business owner who signs up, or whoever that owner explicitly assigns as the person who can configure the business.

An employee cannot grant Tend a capability, even by saying "I give you permission." A customer cannot. Only the configurator can, and that power is never shared down the chain automatically.

The reason is the principle that also holds in real systems: **no-self-grant.** A person cannot grant themselves (or a tool that serves them) an elevated capability they were not given. Only a designated, verified authority can change the grants. This is the same decision described by NIST SP 800-53 and by separation-of-duties / least-privilege practice: the person who is allowed to grant is separate from the person who acts, and no actor expands its own access.

This is not a directive Tend enforces through the LLM. It is structural. The configurator holds a distinct capability that no other agent has; only that capability can change the authorization configuration.

### Tend comes with a default set of authorizations

Tend is not a blank slate. For a fresh, small business it ships with a **sensible default authorization range** so the owner does not have to configure everything before first use.

The default is not "everything is allowed" and not "nothing is allowed." It is a careful default for a small business that matches how real small businesses actually operate:

- **Read and understand** what is already in the connected business systems (in a small business the owner already sees everything). The read is capped by what the business itself can read, and it never on its own sends anything outward.
- **Reply inside an open, non-committal conversation** within the channels the business connected, following the channel rules (for example, inside WhatsApp's customer-service window). Tend sends these replies; this is exactly the "don't miss / reply fast" job the product exists for.
- **Maintain its own situation and understanding model** — create, update and link its own records of what is happening. That is Tend's own domain and needs no external grant.
- **Ask for per-call approval** for anything that changes a record a business system owns, starts a new conversation or a nurture step, makes a promise or commitment, spends money, or reveals protected information outward.

The default does **not** include (by default): writing to a system that owns business records without an explicit grant, creating records that other people can see, launching a new conversation with a customer who has not written, making a commitment or spending money, or accessing records that the business rule marks as confidential.

This default is a **configuration default**, not a product invariant. It is meant to be changed by the configurator.

### The configurator grants by tying a capability to an approver

When the configurator wants to let a tool act, they do it by pointing at the tool and naming the person who can approve. They are not "allowing it forever." Two moves:

- The configurator creates the grant in the business configuration (a step that only the configurator can do, through their own configuration capability).
- That grant says which capability is involved and **which person (or role) is the approver** for that capability.

The important part: **a grant is approval of the action at the time it happens.** Granting is not "always allow, never ask." It is "when this capability is needed, route the needed approval to this person." So there is no silent drift from "with an approver in the loop" to "run it freely."

## What this resolves

This closes the earlier "autonomy vs approval" contradiction with a concrete mechanism:

- Reached inside the default set → the default grant is the approval.
- Reached inside a configured grant → the configurator's grant (naming an approver) is the approval.
- Outside the granted set → not a grant of that range, so Tend asks or escalates.

## How the default grows (compositional, not a redesign)

The default set above is the decision for a fresh small business. The same grant, enforcement
and end-of-grant machinery carries a larger business — the shape does not change. What changes
with size is captured by one rule plus the dimensional extensions recorded in `research/smb_vs_corporate_scaling.md`:

> The default read range is as wide as the widest single credible reader the business can grant.
> A solo owner sees the whole business, so Tend's read default is as wide as that owner. The
> moment a second role exists, each role's default narrows and visibility becomes per-role.

Everything else extends compositionally: writes go from per-call approval to multi-level
approval gates; the same channel and consent rules accumulate more tiers; visibility of
records becomes role-scoped. The default always narrows as distinct roles and readers grow.
A larger business narrows the default and assigns roles; it does not get a different product.

The grounded evidence, the resolved default table, and the traceable sources for each row
live in [`default_authorization_range_research.md`](default_authorization_range_research.md).
That document is the research companion; this one is the decision.
