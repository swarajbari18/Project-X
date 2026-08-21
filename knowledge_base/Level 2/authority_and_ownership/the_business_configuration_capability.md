# The business configuration capability

## Why this question exists

While defining who grants authority, we realised that the person who configures the business uses a different agent than everyone else.

Every agent (Tend's helper for an owner, an employee's helper, etc.) shares the common capabilities: understanding, gathering, memory and knowledge, communication, and so on. But only the **business owner's or configurator's agent** has an *additional* capability: the ability to change the business configuration, including the authorization grants.

This question asks: what exactly does that business configuration capability contain? And is the design right?

## Our provisional answer

The business configuration capability is a distinct set of tools that only the configurator's agent can use. It is the only place where the authorization configuration is written.

The capability must be able to:

- **Read** the current business configuration (roles, grants, approvers, caps).
- **Create**, **update** and **revoke** grants.
- **Assign** the approver (a person or role) that a capability is tied to.
- **Change** the default authorization range.
- **Deal with role changes** — who holds a role now, and what happens when someone leaves.
- **Hold the full trace** of every configuration change (who changed what, when, why) so the business can do root-cause later.

None of these can be done by any other agent, and none of them go through the LLM as "authorization by prompt." They are deterministic tools backed by the business configuration datastore.

## How it connects to the runtime

This is the important part. The runtime Tend agent does *not* carry authorization config into its reasoning. When it runs a capability, the tool itself consults the config and decides:

- Is this action in the default range? → proceed.
- Is it inside a configured grant? → proceed, or route to the named approver.
- Is it outside any grant? → return the constraint to the agent, which tells the requester and offers to escalate.

The runtime agent is not the one that makes these checks; the configuration and the enforcement layer do.

## What remains open

- The exact tool set and how the configurator's agent exposes it (still to be brainstormed and researched).
- How the capability interacts with the identity of the configurator (must verify the person is actually the configurator).
- Whether the configurator's agent can *delegate* its own configuration power to another person explicitly (the owner may assign someone to configure).

## Why this capability belongs in this category

Authority and Ownership is about the grant, the enforcement, and the end of the grant. The business configuration capability is the **grant side** — the only way grants are written. Because it is structural and held by exactly the right person, it fits here and not in a general "tool library."

A product with one configurable-power agent and many normal agents is a natural way to keep the grant capability away from everyone who should not have it. Whether it must be one separate agent, or one capability in a larger toolchain, is not yet decided at the conceptual level.
