# Conversation with Swaraj about Authority and Ownership

## Why this document exists

This is a conversation record, not a formal specification.

The purpose is to preserve how we understood Authority and Ownership, where the earlier sections kept leaving threads for it, which definitions were wrong on first read, what the raw thought taught us, and which parts are still provisional.

This document follows the writing instruction for the Knowledge Base: the shared walkthrough is part of the knowledge.

## Where we started

The Level 1 backlog puts Authority and Ownership right after Communication. Its questions are:

- Which actor owns each type of information?
- Which actor owns each decision?
- Which actor owns each action?
- When is Tend allowed to perform an action?
- When must Tend ask for approval?
- Can Tend ever override a human decision?
- Can a human override Tend?
- Who remains accountable after an automated action?
- How do we prevent responsibility from becoming unclear?

On the surface this looked like a fresh category with clear questions. The first reading made it look like a question about "who owns what."

## What the earlier categories quietly left behind

Before we could read the questions, a pattern became visible in the older Level 2 work.

Every earlier category, when it met something it did not own, pointed away:

- Gathering separated *ownership* and *permission*, and said permission to see is a separate question.
- Trust and Evidence said source authority is one thing, and that it does not bypass permissions and approvals.
- Decision Making said it does not enforce authorization or permission, and that the control system enforces capability, permission and authorization rules.
- Human Collaboration said it does not grant access or enforce authorization, and does not define business policy.

Each of those sentences was leaving a thread on the table for a later turn. That later turn is this category. So Authority and Ownership is not a clean fresh start. It is where the stranded threads of *authorization, permission, approval, override and accountability* finally have to be reconciled.

One of the first findings was that the title is already mismatched. We had worked hard to separate *ownership*, *authority* and *permission* as different things, yet the section bundles them under "Authority and Ownership," and the nine questions also pull in *authorization* and *accountability*. So the first honest question was whether this is one category or several wearing a shared name.

## The scope was split without our agreeing to it

Reading the rest of the Level 1 document exposed a scope problem.

The question list has *Authority and Ownership* in one place. But a separate section called *Business View and Authority* asks how an owner delegates setup, approval and configuration, and how authority changes when an employee leaves, becomes unavailable or changes role. Those are authority and ownership questions sitting in another section.

Earlier in the document, *Channels and Permission* asked what information each actor may see, which brushes against the question "who owns each type of information."

Swaraj's call was that this did not matter. The scope was poorly defined in the earlier work, and the pieces were too wound together. He chose to pull the delegation and role-change parts into this category rather than keep repeating the same confusion across sections.

The one thing we kept out is the *snapshot of the business journey* — "what the owner sees." That is observation and explanation, not authority. So the category has a spine: the **grant, the enforcement, and the end** of authority. Anything else that was misgrouped should be brought in and given that spine.

## Swaraj's raw thought revealed the fixing idea

What unlocked the category was a decision Swaraj reached himself. Before the conversation moved on, he said a claim that should be held up straight:

> "Tend does not own anything. The business configures it, the owner or configurator grants the range, and Tend only acts within what was granted."

That is the core of the whole model.

So the category is not really "who owns each thing." It is:

> The business grants Tend a **range of delegated authority**. Tend may act freely *within* that range. It may never act *above* the delegator. When an action falls *outside* the granted range, Tend does not guess or pretend; it escalates so a person who holds the authority can decide.

This turns the whole category into one coherent motion: the grant, the enforcement, and the end of the grant. And it dissolves four of the nine confused questions.

## The correction about invariants — knowledge vs behaviour

While thinking about whether a rule is configurable, Swaraj said: "remind me what invariants are, I might be speaking out of my hand, everything is configurable." That sentence carried the deepest distinction of the conversation.

There are two different kinds of rule, and he was right about one and wrong about the other.

- **Business rules** are entirely configurable. How to refund. Which steps are required. Who may see which record. The business decides these; Tend must not invent them. No contest.
- **Product invariants** are how Tend behaves so that it stays this product. "Tend never guesses." "Tend never presents its interpretation as if it came from the source." "Tend does not push confidential data past the boundary the business stored." These are not the business choosing what to do; these are what make Tend a trustworthy tool instead of an inventive one.

So the claim "everything is configurable" is exactly wrong once it reaches the behavioural line. The business has discretion over the rules. The **behaviour of Tend** does not. An invariant is a rule that no one authorizes — not the employee, not the owner, not the Product Builder, not the model.

In a later message Swaraj confirmed it hard: *invariants are hard and unbreakable.* A Product Builder cannot configure their way out of one, and a business that genuinely needs new behaviour gets it as a product feature built inside the invariants.

## Knowledge vs behaviour: the contrast that corrects Memory and Knowledge

Swaraj could feel a contrast but could not name it. We found it.

There are two axes in the same LLM. One is **knowledge** — what the model knows about this business, this customer, this situation. It is content. It is stored and retrieved. It changes over time. *Understanding a situation* in the sense of its history and facts is knowledge. It can be learned, and it should not be baked into the model's weights.

The other is **behaviour** — how the model comports itself, whatever it happens to know. Not "what does it think about this customer" but "does it treat itself as part of Tend, or as an outside party following instructions." A denied action stays a denied action. A blocked tool call does not get unblocked because someone important asked. The interpretation is not truth. That is behaviour.

This is the contrast Swaraj was reaching for:

> Memory learning = changing content. Behaviour = changing character.

Both use the same tool, but at opposite ends and for opposite reasons. Learning does not belong in the weights because it would bake temporary content into the engine. Behaviour *does* belong in the weights, so the shape of Tend survives every context. This resolves the earlier "fine-tuning is off the table in Memory and Knowledge" decision and preserves the later path of shaping a small model so the invariants become a behavioural default. Those were never truly at war.

This is recorded as a correction to the Memory and Knowledge work, and as the reason we must do justice to invariants.

## The LLM is a part of the product, not the centre

Swaraj drew a correct line: asking "is Tend a principal or an agent?" was the wrong question. Tend is not an agent that a harness wraps around an LLM.

Tend is the whole software product. The LLM is one component in it, used when the way parts should work together has to be figured out at runtime. The model does not hold authority of its own; it proposes a next behaviour, and the deterministic software enforces the grant and the invariant boundary before the action happens.

So "Tend overrides a human, human overrides Tend" is a poorly framed question. Tend does not have an *override* at all; it never owns the stake it would be overriding. "Override" in this system is really a newer grant by a higher authority — the owner re-scopes the grant. That is delegation, not override. And no human can override the behavioural invariant, because the boundary is written in code, not in the model's compliance.

## When is Tend allowed to act — and autonomy

Swaraj rejected the "read-only is safe by default" claim. Read is not harmless in this system. A read can be a disclosure. Health records can be confidential even if nothing is changed. The risk is reveal, not modify, so "read vs write" is the wrong measure. We carry forward the prior decision that authority is per-capability and per-claim, never a blanket universal default.

The useful question is not "which category of action is safe" but "what level of permission exists for each action" — mapped per capability, per claim type, per target, like the way coding agents use allow / deny / ask once / always allow / ask. One added principle: **deny at any level beats even allow at a higher level.** A denied action stays denied, and the model never sees a path around it.

Swaraj described this through a concrete flow: if an employee asks Tend to send something confidential, Tend refuses, because the tool itself fails its pre-validation and returns the constraint back to the model. The model then tells the employee that this is not allowed and offers to create an escalation for the person who does hold that authority. The refusal is not the LLM being brave; it is the deterministic check refusing first.

## Autonomy — the thing we corrected

We fixed an apparent conflict between two statements:

- "a person is always at least an approver and accountable"; and
- "Tend may act autonomously inside its granted range."

These conflict only if approval is one moment. The fix is that approval happens at two different moments:

- **Grant-time approval.** When a configurator grants Tend a range ("Tend may mark a ticket complete when the workflow says so"), that grant *is* the approval. Every autonomous action inside the range is approved *by the grant*. The person who configured the range is the approver, and therefore accountable for the autonomous actions taken inside it.
- **Execution-time approval.** A live person is only needed when the action falls *outside* a pre-granted range. That is the escalate / ask path.

So the principle is not "a human clicks yes on every action." The corrected line is: every action traces to a person who approved the underlying grant. In-range, the grant-holder is the approver. Out-of-range, the person who approves that one case is the approver. Swaraj said it in the tight phrase "the person who has configured it is the person accountable for the automatic action," and that is how the autonomy loop closes.

## Even a grant is capped by each system's own wall

The granted range is capped from above. Tend's effective permission for a record is the *intersection* of what the configurator granted to Tend and what the owning system, partner, or data-sharing rule allows. A configurator may grant "Tend may read the partner's record," but the partner's system and the business's data-sharing rule are the outer wall. Effective permission reduces access; it can never expand it. This matches the research on delegation.

This is also why the business stays in control even at the "highest" configuration. The business may give Tend a range as wide as its own authority, but the maximum is *the widest range a delegator can grant* — never a range that puts Tend above the only living delegator. The moment Tend is above the delegator, the chain breaks: the business could no longer be in control, and the "hardest problem" (a person must take responsibility) would end with Tend itself, which is a tool, not a person.

## Accountability vs answerable-for-now

Swaraj said: "We do not blame a single person. The institution finds the root cause and improves, so accountability belongs to the business, the institution." Agreed — but two meanings of "accountability" must not be blended.

- **The moving work item** still needs a concrete target — a person, a role, a queue — that the situation keeps being pushed toward. Without one, work floats. This is Human Collaboration's "accountable owner of a work item."
- **The root-cause and learning loop** belongs to the whole business, no blame, correct. Tend records what changed, who changed it, why, and feeds that into improvement.

Both statements are true, and neither erases the other. Removing the first because the second sounds better would break the goal of keeping work moving.

For Tend's autonomous actions, the accountability target sits at the grant: whoever configured the range is the person who answers for what ran inside it. Traceability is what makes this possible — which grant was used, when, who set it, and why.

## Overrides: there is no such thing, and that is the design

"Override" should not exist as a routine concept inside Tend.

Tend never holds authority, so there is no "Tend's own decision" to override. And a person who calls for an otherwise-forbidden act is not performing an override: either that person holds the authority (so the act is inside the range), or that person does not (and Tend escalates to someone who does). The escalation path runs up to the configurator of the affected business.

An invariant is also not overridable. If the business genuinely needs behaviour that breaks one, the answer is a product feature built inside the invariants — never a temporary bypass, for any person. This is the hard line Swaraj chose.

## Research that changed or confirmed the picture

We gathered with the goal of comparing, not copying. We deliberately did not study prompt-magic or huge system prompts, because Swaraj's loop engineering is different. We studied the mechanisms of how coding agents gate tools.

- **Claude Code permission modes:** a tiered system from "ask me for most changes" to "ask for edits" to "auto-review" to **deny-by-default** (only pre-approved tools run) to a fully-open mode reserved for isolated sandboxes. Not one lever; a ladder.
- **Allow / ask / deny / allow-and-don't-ask-again** is a real per-action mechanic, and maps directly to the "allow once / always allow / never" button Swaraj described.
- **At every scope, deny beats allow.** If a tool is denied, no other rule can allow it. That is how the boundary stays hard.
- **Hooks fire before the action** and can block it deterministically. This is stronger than trusting the model to comply: the enforcement lives in code, between the model and the capability.
- **Cursor** confirms: read and search of internal files are allowed by default, but terminal commands need approval, config files need approval, network requests are restricted, and third-party tools need per-call approval unless pre-granted.
- **Red Hat's "zero trust for AI agents" — delegation not impersonation:** effective permissions equal the person's permissions intersected with the agent's capabilities; the agent can only *reduce* access, never expand it; each hop stays restricted; and with no person in the chain, there is no access at all. This is almost Swaraj's own framing, now grounded in established practice.

The research does not decide Tend's defaults. It shows the mechanisms exist and confirms our chosen shape: deterministic enforcement of a delegated range, with deny beating allow.

## What became clear

The category is about the **grant, the enforcement, and the end of authority.** It is not a maze of "who owns what" but:

```text
 The business configures who may act, how, and at what level.
       ↓
 Tend inherits a range of power — never above the delegator.
       ↓
 Every action runs against the granted range and the invariant line.
       ↓
 In-range: the grant is the permission. Out-of-range: ask / escalate.
       ↓
 Accountability resolves to the grantor; the business stays answerable for root cause.
       ↓
 When someone leaves, changes role, or a grant expires, Tend stops treating them as owner.
```

We resolved the scoping: Authority and Ownership absorbs delegation and role-change, while the "snapshot / business journey" stays with observation and explanation. Responsibility for a decision is split into "who decides, who approves, who acts, who answers." An identity provider verifies who is speaking; authority is what that identity may do.

## Remaining provisional

We have not decided, and should not yet assume as settled:

- the exact format for configuring roles, scopes per capability, and scopes per claim type;
- whether every business work item needs a single accountable owner, or whether a concrete target is enough;
- which actions sit in a sensible "default range" for a fresh, small business — these are configuration defaults and still need research, not product invariants;
- how "wait when there is no authorized approver" and the escalation of inaction connect to Coordination and Time, which are still later categories;
- how a refusal is worded and communicated to each actor ("not allowed; here is the person who could allow it; want me to create the escalation?");
- how identity, roles, and delegated authority are joined so that the authority a role grants always matches a verified person.

These are questions for later, not reasons to delay the concept.

## What we agreed now, to carry forward

- **The delegated-range boundary model.** Tend proposes; the software enforces the grant and the invariant line before the action runs. Configuration and code, not prompt strength.
- **Invariants are hard and unbreakable.** No runtime escape; the configurator cannot configure around one. New behaviour is a product feature, built inside the invariants.
- **Every action traces to a person who approved the grant.** Autonomous = grant-approved by the configurator. Out-of-range = a person approves that case.
- **Tend is a system, not an LLM.** The model is a component inside it and holds no authority of its own.
- **Tend never sits above the delegator.** The business remains the authority.
- **Read-only is not silently safe.** Consequence and disclosure matter more than the read/write distinction.

These are the working decisions from this conversation. The boundary is now clear: the grant, the enforcement, and the end of the grant, inside a hard invariant line that even the configurator does not touch.
