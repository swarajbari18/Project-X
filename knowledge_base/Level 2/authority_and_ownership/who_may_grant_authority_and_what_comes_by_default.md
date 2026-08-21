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

- **Read and understand** what is already in the connected business systems (in a small business the owner already sees everything).
- **Communicate** within the channels the business has connected, following the channel rules.
- **Maintain its own situation and understanding model** — create, update and link its own records of what is happening. That is Tend's own domain and needs no external grant.
- **Use per-call approval** for anything that changes a business system's record, sends a message on behalf of the business, spends money, commits to something, or discloses protected information.

The default does **not** include (by default): writing to a system that owns business records without an explicit grant, creating tickets that appear to other people, sending messages on the business's behalf, or accessing records that the business rule marks as confidential.

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

## What still needs research

The default set above is a working default for small businesses. The next research question is what changes for a larger business or a corporate that is already big — same shape as used to scale, because the product is meant to scale to any corporate. The default range may be narrower for a large team than for a solo owner.
