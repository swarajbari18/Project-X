# How do new workflows become part of Tend?

## Where this question came from

Level 1 asks how a new workflow becomes part of Tend. The Product Builder actor already "defines workflows" (Level 1). But nothing defined what a workflow *is*, and nothing said what happens when a workflow changes while situations are running on it.

## What a workflow is

A workflow is a constrained procedure for a known class of situation: an ordered set of steps over the shared spine — gather, decide, ask, wait, escalate, invoke a capability, communicate — where each step is bound to *capabilities*, not to specific channels or connectors. When the class is known in advance, Tend follows the procedure; when a situation is unexpected, Tend involves a person. This is the Level 1 split between fixed procedure and reasoning-model behaviour. It is also why Tend is not a general workflow automation tool: a workflow here is a known-class procedure, not a place to automate anything the business dreams up.

## How a workflow joins

The same lifecycle as any capability. The product team authors workflow templates for a class of situation (for example "delayed delivery investigation", "refund request"). The chosen design is the *phasing* version of the configuration plan: a business activates a pre-written template and fills its parameters inside defined bounds. If a business needs a procedure the catalogue cannot express, that is a visible gap — a product request or human work, never a scripting surface.

## The walkthrough (a workflow version changes)

"Delayed delivery investigation" v2 has three steps: check tracking, tell the customer, offer refund after 48 hours.
The business wants v3: check tracking, contact the delivery partner first, wait 24 more hours, then decide.
- New situations run v3.
- In-flight situations keep running v2. This is the industry default (Camunda documents exactly this): running instances continue on the version they started with. Changing steps mid-flight can break a procedure's internal consistency — a v2 situation was not set up to do a partner check.
- The owner is offered the migration choice for in-flight situations (the notice wait). If the business considers the change urgent, it says so: a deliberate migration of those situations, recorded and traceable.

## The sub-procedure trick (why it matters to us)

Process-engine guidance (Camunda) says: steps that may change often should be their own small procedure ("call activity"), so they can update without migrating the whole workflow. We reuse this idea: a workflow step that changes often is described as its own piece the workflow calls. Two behaviours then become possible. A step that must follow what the customer was promised is pinned (Camunda's billing example). A step that may follow the latest practice is live (their shipping example). Both are deliberate choices the business makes, not one product-wide switch.

## The boundary

- The wait spine a workflow steps over: Coordination / Time.
- Whether a specific action is allowed: Authority.
- How a situation that matches no workflow is handled: Failure / Understanding.
- The concrete workflow runtime: Level 3.

## Working decision

A workflow is a constrained procedure for a known class of situation, stepping over the shared spine and bound to capabilities, never to channels or connectors. Workflows are versioned; in-flight situations run the version they started with; new situations run the latest; migration is deliberate and owner-decided; steps that change often are isolated as their own piece so they do not force whole-workflow migration.

## Related

- Change spine: [`how_do_we_evolve_tend_without_breaking_existing_businesses.md`](how_do_we_evolve_tend_without_breaking_existing_businesses.md)
- Fixed procedure vs reasoning model: [`../../Level1_Problem_Framing_or_Expansion.md`](../../Level1_Problem_Framing_or_Expansion.md) (the Reasoning Model responsibility)
- Wait spine: [`../coordination/how_do_we_represent_work_that_is_waiting.md`](../coordination/how_do_we_represent_work_that_is_waiting.md)