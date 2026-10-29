# Deciding and permission — what Tend is responsible for

This file answers one question: when Tend chooses its next step and carries it out, what must it be responsible for?

Two duties sit here. First, choose the next step for one situation. Second, make sure that step is allowed before anything happens in the world.

Tend is the software that keeps a business's operational problems moving. Each problem is one **situation**: one late order, one refund, one outreach. <!-- A1 -->

The refund story runs through this file. A customer asks for a refund of 1,500 on order 9912. The business has a **refund setting**: the largest refund that may go through without a person. Its own section below explains how it works. <!-- decided by the owner, 2026-10-12: refund setting -->

Who is who here:
- The **situation worker** is the part that reasons about one situation. It decides the next step and writes what Tend concludes.
- **The AI** proposes the next step. It never decides alone, and it never approves its own proposal.
- **Fixed code** is code that always makes the same check. It is not the AI's judgment.
- The **tool layer** is the only way Tend calls an outside system, such as the payment provider. It checks permission before every call. <!-- Section 7 tool layer: job -->
- The **communication layer** checks, sends, and records each message. <!-- Section 7 parts: communication layer -->
- The **conversation manager** is the part that reacts when something happens. Among other things, it decides whether an update is worth telling a person. <!-- Section 8: communicate -->
- An **effect** is anything that changes the world outside Tend: a message sent, a payment made, a file released. <!-- Section 8 terms: effect -->
- A **grant** is a range of steps the business allows Tend to take. The default range a new business starts with counts as a grant too. "Inside the range" means inside a grant.
- **Authority** means the right to let a step happen. For the refund of 1,500, the business gives that right through its refund setting.
- The **configurator** is the role of setting the business up. The owner who signed up holds it, or a person the owner names. Only the configurator writes grants. <!-- G7; Q7 -->
- **Configuration** is the part of Tend that holds the business's settings and grants. The configurator changes it through fixed tools.
- To **escalate** is to hand the work to the next person who can act on it, or to raise how urgent it is. For example, a refund nobody has approved goes to the owner.
- A **hard rule** is a rule no setting can switch off, such as "Tend never guesses".

Each rule here has one of these statuses:
- **Decided:** the project owner — the person designing Tend, not the business owner — said yes. On 2026-10-22 the project owner accepted every recommendation this design had made, and asked for the smaller questions inside them to be settled in the way that best fits; those points are Decided, and points settled that day say so. A rule marked as "the design's reading" was worked out from its sources rather than found written down; it is Decided too. <!-- decided by the owner, 2026-10-22 -->
- **Provisional:** a working choice that carries a condition for reopening it.
- **Rejected:** turned down on purpose, with the reason kept.
- **Deferred:** a value or a detail left, on purpose, to a later stage — **deferred to configuration** (each business or market sets it), **deferred to Level 3** (the stage that chooses the technology), or **deferred to implementation** (whoever builds it). The rule around it is Decided.

Two earlier status words, **To confirm** (written down, but not yet agreed by the project owner) and **Open** (no answer yet), are no longer used: since 2026-10-22, no rule here carries either.

A rule with no status word next to it is **Decided**: it has a source the project owner accepted. Every rule that is not Decided carries its word where it appears. In the rest of this file, "the owner" means the business owner.

<!-- Every rule below carries its code in a hidden note. Its meaning, source, and status sit in code_index.md in this folder. -->

## Tend decides its own next step, not the business's outcome

The decision in this file is about Tend's own next step. <!-- F1 -->

That step is one of these: <!-- Level 2 decision: behaviours -->
- gather more information, for a named need (gathering is also a stage the loop passes through before deciding; deciding may send it back);
- ask someone;
- wait, or watch for a change;
- tell someone;
- create work for a person, or escalate;
- arrange a meeting;
- call an outside system;
- resolve the situation;
- stop safely.

The business decides its own goals, its policies, and its final outcomes. <!-- Level 2 decision: not the outcome -->

So Tend does not decide whether the customer gets the refund in the end. It decides what to do next to move the refund along.

## The AI proposes; fixed code decides what happens

The AI proposes a next step. <!-- F2 --> When it proposes, the AI also says which facts it relied on, what is still uncertain, and why the step fits. <!-- Level 2 decision: what the AI proposes -->

A proposal is data. It does not run by itself. <!-- Section 8 terms: proposal -->

Fixed code checks the proposal, runs it, writes the state, and keeps track of the waits and deadlines. <!-- F2 -->

The AI never approves its own proposal. <!-- F6 -->

Fixed code checks every proposal in two separate ways. <!-- S2 -->

The first check asks whether the proposal is well formed: <!-- S2 -->
- it has the right shape;
- it stays inside its limits;
- it was made from the current version of the record.

The second is the permission check. It asks whether this step is allowed, now. It runs before any step that has an effect. <!-- F6 -->

The two checks fail with different messages, so a reader can tell "badly formed" from "not allowed". Keeping them apart is the architecture's own rule. <!-- INV-6 -->

Where fixed rules already settle a step, the AI is not asked. The AI proposes only where fixed rules leave the step undecided. <!-- accepted call: AI only where open -->

### A choice is not a state

"Wait" is something Tend chooses. "Waiting" is the state fixed code records once it has written down what Tend is waiting for. <!-- Level 2 decision: intention is not state -->

"Create work for a person" is a choice too. The state that follows is recorded separately: the situation waits until that person answers. <!-- Level 2 decision: intention is not state; Section 8 states -->

Escalating is not the same as creating work. When a refund waits too long for approval, it is escalated to the owner: that changes who must act. How long is too long is a business setting. <!-- Level 2 decision: intention is not state; Section 8 additions: escalation set by the business -->

The situation worker sets waiting or blocked. Only the conversation manager sets completed. <!-- decided by the owner, 2026-10-12 -->

This holds when a tool hands a wait to the status-check service — the part that keeps checking an outside source while other work goes on. The tool declares the wait in its result, and the worker's fixed code saves it, before the AI is told. The AI never writes a wait. <!-- construction record, entry 21: writer question; decided 2026-10-22: the wait a tool declares -->

### Three kinds of ending

"Stop" can mean three different things. Tend keeps them apart. <!-- Level 2 decision: three endings -->
- The problem is finished, and the situation can close.
- This round is over, because Tend is waiting for something.
- Tend stopped safely, because no safe step was left. The situation is then blocked.

A **run** is one pass of the situation worker over one situation. A run always ends in a named state: a wait, a declared outcome, a visible block with its reason, or work still in progress. It never ends silently. <!-- S6 -->

## What the decision reads

"The decision" here means the situation worker choosing the next step. It is not a separate part. It is a stage of the situation loop, **deciding**, which runs in every round that reaches it, after understanding the situation, gathering and weighing evidence have each run or been passed. It is one structured answer: the AI checks the work against what was first asked and proposes one next step; fixed code checks it. ([Tend's product loop](../../../Level%202/the_product_loop/how_does_the_product_loop_work.md), part D5; added 2026-10-29.) <!-- Section 7 writer table: decision; PL-14 -->

The decision starts from the latest version of the situation. <!-- Level 2 decision: decision context -->

It also reads: <!-- Level 2 decision: decision context -->
- what the customer, an employee, a system, or a partner said;
- what is known, unknown, conflicting, ambiguous, provisional, or stale, and why;
- the business's active policy, and its fallback (the business's rule for when the policy cannot be applied);
- the outside systems Tend can call;
- the deadlines, and what Tend is waiting for;
- who is available;
- how much is at stake, and whether each possible step can be undone;
- what Tend has already said or tried.

The decision uses these. It does not own them. <!-- Level 2 decision: decision context -->

A check can say no, ask for approval, run out of time, or fail. Each of those results goes back into the next decision. <!-- Level 2 decision: results come back -->

A "no" does not end the situation. It is one more thing for Tend to decide on. <!-- Level 2 decision: results come back -->

## Enough information for this step

Enough information means enough to choose this particular step safely. <!-- F5 -->

It does not mean enough to settle the business's final outcome. <!-- F5 -->

Different steps need different amounts. Asking the customer which order they mean needs little. Calling the payment provider needs more. Closing the situation needs more again. <!-- Level 2 decision: enough is relative -->

When there is not enough for the step Tend would prefer, there may still be enough for a safer one: asking, waiting, gathering, escalating, or stopping. <!-- Level 2 decision: enough is relative -->

Later in the refund story, the refund has been paid out, and the customer says the money never arrived. <!-- Level 2 decision: refund example -->

Tend knows which refund the customer means. The business's record marks the refund as paid out. The payment provider's current status is unknown. The customer says the money has not arrived.

That is not enough to tell the customer the money has definitely arrived. It is enough to ask the payment provider for the current status. It is also enough to tell the customer that the business is looking into it.

Three questions stay apart: <!-- Level 2 decision: three questions -->
- Is the situation understood well enough to know what the problem is? The understanding step answers this: it works out what the problem is, from the situation and its new message.
- Is the evidence enough for this particular step? The decision answers this.
- Is the step allowed, and can it run? The permission check and the outside system answer this.

The situation worker judges "enough", at the decision. Gathering — the step that fetches information from sources — never judges it. <!-- F5; Section 8 gather rule -->

Tend does not collect every possible fact before it acts. <!-- F5 -->

## Uncertainty narrows the choices

Uncertainty limits which steps are still allowed. It does not stop all work. <!-- Level 2 decision: uncertainty narrows -->

Some examples: <!-- Level 2 decision: uncertainty narrows -->
- An unknown delivery status may call for gathering.
- An unclear order number may call for a question.
- Two records that disagree may call for more evidence, or for a person.
- Information that is out of date may call for a fresh read.
- A low-stakes uncertainty may still allow a limited message.
- A high-stakes uncertainty may call for approval, or a safe stop.

The same uncertainty can allow one step and rule out another. <!-- Level 2 decision: uncertainty narrows -->

The AI may say how sure it feels. That is never a permission, and never a safety check. <!-- Level 2 decision: AI confidence is not a gate -->

Tend produces no confidence score of its own. <!-- E3 -->

## Keeping going inside the range

Tend keeps going inside its granted range without asking anyone at each step. <!-- F3 -->

A situation starts again whenever something changes: <!-- Level 2 decision: agency -->
- a reply arrives;
- an employee answers;
- a payment comes in;
- a delivery is updated;
- another software agent returns a result;
- a deadline arrives;
- a scheduled check-in comes round.

The owner does not have to steer each step through a chat. <!-- Level 2 decision: agency -->

The owner gives Tend thirty email addresses and says: "Introduce our product, answer questions from our approved knowledge, follow up after three days if there is no reply, and bring me anyone who wants a meeting." <!-- Level 2 authority: thirty addresses -->

Tend opens thirty situations, one for each person. <!-- B6 --> Each one wakes on its own reply or its own follow-up date. Tend does not wait for a new instruction in between. <!-- Level 2 authority: thirty addresses -->

If the instruction leaves out something Tend needs to send safely, Tend asks for it. It does not turn a vague instruction into a broad, permanent campaign. <!-- Level 2 authority: thirty addresses -->

The owner may stop a step that Tend has decided but not yet carried out. <!-- accepted call: owner may stop -->

## When there is no safe step

When no safe step is left, Tend stops safely. <!-- F4 -->

The situation then shows as blocked, with a visible reason. <!-- Section 8: stop safely -->

Blocked means no one is left to escalate to, and no safe step is left. The situation does not move on its own. It stays visible until the cause goes, or a person answers. <!-- Section 8 states -->

The owner sees the blocked situation in the list of decisions only the owner makes. <!-- Section 8 states -->

If the owner stops it, the conversation manager sets it to completed, and the reason stays visible. <!-- Section 8 states -->

## What may run without a person

No step runs on its own just because it is technically possible. <!-- Level 2 decision: automation -->

Steps that are predictable, limited, and reversible are the best fit for running on their own. <!-- Level 2 decision: automation -->

Examples: <!-- Level 2 decision: automation -->
- sending an approved status message;
- reading from a source the business has set up;
- recording an event;
- watching for a known change;
- waiting for a defined event;
- creating a routine request for a person.

These are kinds of step. They are not rules for every business.

Choosing a step and being allowed to run it are separate. <!-- Level 2 decision: automation --> Tend may choose "update the order system". The permission check may still refuse it, or ask for approval. The order system may be down.

Running a step on its own carries more risk when it: <!-- Level 2 decision: automation -->
- cannot be undone;
- costs money;
- has consequences for the customer, or under the law;
- rests on an unresolved ambiguity or conflict;
- depends on an unclear policy;
- would commit the business to something it has not approved.

Even then, the whole situation need not stop. Tend may choose a smaller safe step, create work for a person, or escalate. <!-- Level 2 decision: automation -->

The safe product default for each outside system is part of that capability's contract, written by the product team when it builds the capability, and checked before the capability is switched on. <!-- closed item: capability defaults; Section 7: configuration -->

## When a person must take part

A person takes part when Tend cannot safely choose or continue the next step from the facts, the policy, and the rules of the outside systems. <!-- Level 2 decision: person involved -->

That happens when: <!-- Level 2 decision: person involved -->
- an important ambiguity is unresolved;
- important sources disagree, and no rule settles it;
- the policy is missing, contradictory, or invalid;
- the business keeps that kind of step for a person;
- the situation is unusual, or the business has not set up a way to handle it;
- a person holds information that exists nowhere else;
- a person must approve the step;
- the business must keep a person answerable for the result.

Taking part can mean different things. Tend keeps them apart: <!-- Level 2 decision: kinds of involvement -->
- an employee gives information;
- an employee looks into the situation;
- an authorised person approves a call to an outside system;
- the owner decides an exception;
- an employee takes over ongoing work;
- an escalation changes who must act.

Tend chooses "create work for a person". The situation worker writes the work item. <!-- Section 7 writer table: human work --> The business's own rules say which person receives the work. Those rules are not part of this file. <!-- Level 2 decision: routing to a person -->

Where the business must keep a person answerable, that stays with a person. Tend can send the work to a person. It cannot take the answering over. <!-- Level 2 decision: answerable stays with a person -->

Involving a person is a step Tend takes. The business decision that person makes stays theirs. <!-- Level 2 decision: person involved -->

## Tend applies policy; it never invents it

Facts say what happened. Policy says how the business wants Tend to respond. <!-- Level 2 decision: policy and fact -->

A delivery is late: that is a fact. Whether Tend tells the customer now, waits longer, contacts the carrier, creates a task for an employee, offers compensation, or asks the owner: that is policy. <!-- Level 2 decision: policy and fact -->

Tend keeps six kinds of rule apart: <!-- Level 2 decision: kinds of rule -->
- the product's own hard rules, such as "never guess";
- what each outside system can do;
- who may call which outside system;
- the rules of each channel, such as WhatsApp's;
- the business's policy;
- the state of the work: what the situation is doing now.

When a policy is unclear, Tend follows this order: <!-- Level 2 decision: fallback order -->
1. Apply the active business policy.
2. Apply a fallback: a rule the business has set for when its policy cannot be applied.
3. Apply a safe product default, when one exists.
4. Otherwise, create work for a person, escalate, or stop safely.

When Tend uses a fallback because a policy was unclear, contradictory, or expired, it tells the business what happened and why. <!-- Level 2 decision: fallback order -->

"The most logical choice" is never how Tend settles a policy conflict. <!-- Level 2 decision: fallback order -->

A product default is a decision too. When Tend uses one, the business can see that it did. <!-- Level 2 decision: defaults are visible -->

A policy can say: <!-- Level 2 decision: policy content -->
- which situation or event it applies to;
- what must be true;
- what evidence it needs;
- which step Tend may take;
- which outside system or person is involved;
- whether a person must do the work or approve it;
- its scope;
- when it is in force;
- its exceptions;
- what wins when another policy also applies;
- what to do when it is missing, unclear, contradictory, or expired.

That list describes what a policy means. It is not a final format. <!-- Level 2 decision: policy content -->

Policy lives in the business's settings, not only in the AI's instructions. The AI may reason about a situation. It never quietly writes or rewrites a policy. <!-- Level 2 decision: policy is not a prompt -->

The policy in force is the version that applied when the situation opened. <!-- Q3 -->

Grants work differently. Tend always uses a grant as it stands now. The four kinds of change are written in [the memory and knowledge, configuration and improvement file](memory_configuration_and_improvement.md). <!-- Q3 -->

The refund setting is the one exception among policies: Tend reads it at the moment a refund is attempted. <!-- decided by the owner, 2026-10-10: refund setting read at attempt -->

If two versions of one policy clash, the version the business turned on most recently applies, and the business is shown the clash. <!-- accepted call: policy tie-break -->

## Same facts, same behaviour

The same situation, with the same evidence, policy, and authority, gets the same next step from Tend. <!-- Level 2 decision: consistency -->

An employee looking at it gets the same context as any other employee would. <!-- Level 2 decision: consistency -->

Same facts does not mean every person makes the same business decision. Where the business leaves room for judgment, a person may choose differently. <!-- Level 2 decision: consistency -->

When a person chooses differently from what Tend proposed, Tend records the choice, the reason, and the authority the person used. <!-- Level 2 decision: human choice recorded -->

Consistency is measured by the observer. It samples situations decided under the same policy version, with the same facts, and reports to the business owner any that ended differently. <!-- closed item: consistency measure -->

## Tend owns nothing; the business grants a range

Tend holds no authority of its own. <!-- G1 -->

The business grants Tend a range of steps. Inside the range, Tend acts freely. Outside it, Tend asks or escalates. <!-- G1 -->

There are three cases: <!-- Level 2 authority: three cases -->
1. **Inside the default range** that a new business starts with: allowed. The default needs no further approval.
2. **Inside a grant the configurator set:** allowed. If the grant names an approver, the step goes to that person first.
3. **Outside every grant:** not allowed. Tend tells the person who asked, and offers to raise it with whoever can allow it. A step against one of the product's hard rules is outside every grant too, but nobody can allow it: Tend says so, and offers no approval path.

The AI does not carry the grants into its reasoning. When the AI calls a tool, the tool reads the grants and decides. <!-- Level 2 authority: the tool reads the grants -->

A broad instruction does not cover things the owner did not name. <!-- Level 2 authority: outside the instruction -->

Back to the thirty addresses. Suppose Tend proposes a different product, a new audience, or a promise the owner did not approve. That proposal is outside the grant, even though the instruction was broad. Tend asks, escalates, or stops. It does not stretch its own range. <!-- Level 2 authority: outside the instruction -->

The owner's instruction creates a grant for that instruction only. <!-- Level 2 authority: one-time grant --> It does not become a standing rule for future instructions of the same kind. <!-- settled items: one instruction -->

## What a new business starts with

A new business starts with a default range, so the owner does not have to set everything up first. The default range works like a grant: the permission check reads it the same way. <!-- decided by the owner, 2026-10-10: default range; Level 2 authority: the tool reads the grants -->

Allowed by default: <!-- decided by the owner, 2026-10-10: default range -->
- **Reading the connected business systems.** The read reaches only what the business itself can read. A read never sends anything outside on its own.
- **Replying inside an open conversation,** when the reply promises nothing for the business, and within that channel's rules. Tend sends these replies itself.
- **Keeping Tend's own record of each situation.** <!-- Level 2 authority: own records -->

A person approves each time, by default: <!-- decided by the owner, 2026-10-10: default range -->
- a change to a record that a business system owns;
- starting a conversation outside an existing grant;
- a promise or a commitment;
- spending money;
- showing protected information to someone outside the business.

Two more things are not in the default: creating records that other people can see, and reading records the business marks as confidential. <!-- Level 2 authority: not in the default -->

The default is a setting, not a hard rule. The configurator can change it. <!-- decided by the owner, 2026-10-10: default range -->

The channel's rules also apply. On WhatsApp, Tend may reply freely only inside the window the customer's message opened. Outside that window, it needs an approved template and the person's opt-in. The channel rules have their home in [the communicating file](communicating.md). <!-- Level 2 authority: channel wall -->

## A grant never reaches past its giver

What Tend may actually do is the overlap of three things: what the grant allows, what the owning system allows, and the product's hard rules. <!-- G8 -->

Tend can only narrow access. It never widens a permission past what the business and the owning systems allow. <!-- G3 -->

The configurator may grant "Tend may read the delivery partner's record". The partner's own system, and the rule for sharing its data, still set the limit. <!-- Level 2 authority: outer wall -->

The widest grant possible is as wide as the giver's own authority. Tend can never do more than the person who made the grant. <!-- G8; Level 2 authority: outer wall -->

If any rule denies a step, no other rule can allow it. A denied step stays denied. <!-- Level 2 authority: deny beats allow -->

Reading is not automatically safe. A read can reveal confidential information, such as a health record. <!-- Level 2 authority: a read can disclose -->

So the grant says which records may be read. Whether a step counts as a read or a write does not change which records the grant covers. <!-- Level 2 authority: a read can disclose -->

A grant names three things: the kind of step (one capability); its target (which outside system, which kind of record or information); and its limits, such as an amount. A business narrows grants further only where it needs to; Tend adds no finer level of its own. <!-- closed item: permission levels -->

## Who may grant

Only the configurator creates or changes a grant. <!-- G7 -->

The configurator works through its own AI assistant inside Tend, which only the configurator uses. Only that assistant holds the fixed tools that write grants and the business's settings. <!-- G7; Q7 -->

No one may grant a permission to themselves, or to a tool that serves them. <!-- Level 2 authority: no self-grant -->

An employee who tells Tend "I give you permission" grants nothing. A customer cannot grant anything either. <!-- Level 2 authority: an employee cannot grant -->

No AI at work inside Tend can give itself more power than it was given. <!-- G7 -->

Something Tend learns never widens a grant. Memory and knowledge may suggest a change to the settings. Only the configurator's tools apply it, after it has been checked. <!-- IB-13; T8 -->

**Decided:** the configurator may not hand its own power to another person, until the business's own written answers settle whether it can. <!-- decided by the owner: configurator's power -->

## A grant has a life

A grant names a person or a role. <!-- Level 2 authority: grant lifecycle -->

A promise that obligates the business is never inside a grant. It always needs a person's approval. <!-- closed item: commitments in a grant; Level 2 authority: a commitment is never in range -->

A change to a grant needs the configurator alone. A business may require a second person for grant changes, in its settings. A change to the compliance settings always needs a second person. <!-- closed item: second person for grant changes; accepted call: compliance settings -->

A grant is created, then active, then changed or revoked, and finally ended. Each change is recorded. <!-- Level 2 authority: grant lifecycle -->

A grant ends when it is revoked, when it expires, or when its holder leaves. It does not end because its holder is away, but while they are away Tend does not treat them as the active holder: a step that needs them follows the business's cover rule and its escalation path, and a substitute acts only within the substitute's own grants. <!-- Level 2 authority: grant lifecycle; Level 2 authority: grant end open; J9 -->

When a grant names a role, whoever holds the role now holds the grant. That person answers for the result of what they do with it. <!-- Level 2 authority: grant lifecycle -->

When an employee changes role, the old role's grants do not quietly stay with them. <!-- Level 2 authority: grant lifecycle -->

A grant always points to a verified person who holds it now. It never points to a name that has lost that authority. The business's answers call this a rule of the product that no setting can change. <!-- Level 2 authority: valid holder -->

A permission must be valid at the moment it is used. <!-- Section 10 decision 27: valid at use -->

For a step taken at a given time, what matters is who held the authority at that time, not who holds it now. <!-- Level 2 authority: authority at the time -->

When a person leaves, the approvals still waiting for them go back to the owner, until the business gives them to someone else. <!-- accepted call: open approvals -->

A role that changes in the middle of a step takes effect at the next permission check, which runs again just before the step acts. A step already taken stands: it is judged by who held the authority at that time. <!-- Level 2 authority: grant end open; T6; Level 2 authority: authority at the time -->

## A permission belongs to a verified person

A permission belongs to a verified person. A name or a phone number alone grants nothing. <!-- G9 -->

An identity provider — an outside service that checks who a person is — says who is speaking. Tend does not check identities itself. <!-- Level 2 identity: two layers -->

The business's settings say what that person may do. <!-- Level 2 identity: two layers --> Being verified as an employee gives only what the business granted to employees.

Each run gets its identity once, when it starts, from what can be checked: a sign-in through the identity provider, which proves the person; a channel bound to a member, which proves only the channel and names the member; or a signed job, for Tend's own internal work. <!-- T1; AC-1; decided 2026-10-22: identity and permission -->

The identity never comes from the words of a message, a link, the hidden details of a web request, or what the AI passes to a tool. <!-- T1; AC-1 -->

A WhatsApp number bound to a member proves which channel a message came through, and names that member. It does not prove who is typing. <!-- Level 2 identity: channel binding; decided 2026-10-22: identity and permission -->

A verified person is matched to their permissions through three records, each with one writer: <!-- Level 2 identity: runtime join; decided 2026-10-22: identity and permission -->
1. **the sign-in identity:** the identity provider, and that provider's own id for the person. The provider keeps it. An email address is never the key;
2. **membership:** this sign-in identity is a member of this business, with these roles. It is kept in the business's own storage, and written by configuration's fixed tools when the configurator invites or removes someone. A person who works for two businesses has two memberships;
3. **channel bindings:** a member's WhatsApp, Telegram, or email, tied to their membership. A binding is made only while the member is signed in, through a one-time link that configuration's fixed tool sends to that handle. It keeps its evidence and a date to review it.

Routine words from a bound channel — a reply, a piece of information, an answer to a work item — are recorded as claims: "came through the WhatsApp bound to this member; person not verified". <!-- decided 2026-10-22: identity and permission -->

Any step that needs a person's permission needs a fresh sign-in through the identity provider: approving; any step the permission check sends to a person; exports; changing grants or settings; moving a binding; and anything the configurator does. "Fresh" means the sign-in happened within the last 15 minutes, as the identity provider records it; a business may shorten it. A link sent to a bound channel only opens the provider's own check. <!-- decided 2026-10-22: identity and permission; settled 2026-10-22: fresh sign-in -->

At every step, the permission check reads the live membership, roles, and grants. A member who leaves loses their membership that minute, so their very next step fails. When a bound WhatsApp identifier changes, the binding is suspended until it is proved again; moving a binding to another person needs the configurator. <!-- decided 2026-10-22: identity and permission; Level 2 compliance: leavers; settled 2026-10-22: changed bindings -->

Customers and partners are not members. A customer's channel identifies the contact for their own situations, and never grants a permission. <!-- decided 2026-10-22: identity and permission -->

## The check before every effect

Before any effect, fixed code runs a permission check. The check answers **Allow**, **Deny**, or **StepUp**. StepUp means a person must approve first. <!-- T2 -->

A read that discloses information gets the same check, because a read can be a disclosure. <!-- T2 -->

The check inside the tool is settled, as in the balance-sheet example below. Every read that discloses information passes it: where no grant covers that disclosure, a person must approve first. <!-- owner item 83: disclosing read -->

The check runs at every point where an effect can happen: when a proposal is checked, before each call to an outside system, before each read that reveals information, before each outgoing message, and before each change to the settings. <!-- T4; Section 8 permission check: where it runs; T2 -->

The check comes before the effect. "Start the tool" can only mean "prepare it". Nothing real happens until the check allows it. <!-- T4; Level 2 authority: before the effect -->

At decision time, the check looks at three things together: the grant, the owning system's permission, and the product's rules. <!-- T3 -->

The check reads the trusted permission store, which holds the current permissions, at that moment. A saved copy may speed up reading context. It never decides. <!-- T5; AC-4 -->

Permission is checked again before each step within a run. So a grant revoked mid-run stops the next send or call. <!-- T6 -->

If the permission store cannot be read, the step is denied. The work is shown as on hold, with the reason visible. When the store is back, each held step is checked again from the start. This is the architecture's own rule. <!-- architecture rule: store unreadable; settled 2026-10-22: access after the store returns -->

No single service both decides the next step and runs the permission checks. Each check sits where its effect can happen. This is the architecture's own rule. <!-- Section 6: no single control module -->

The permission check answers Allow, Deny, or StepUp. The record keeps each result that is not an Allow under its own name — from the shape check, from the permission check, and from the steps after it: <!-- Section 8: failure shapes -->
- **Badly formed** (from the shape check). The proposal goes back for repair. For example, a tool argument in the wrong shape.
- **Denied.** A refusal, with its policy reason. It is not retried unless something changes. For example, a request for another business's data.
- **StepUp.** The step waits for a person's approval. For example, a refund above the refund setting.
- **Already started.** The same effect is already under way, or its outcome is unknown. This is not a denial.
- **No source.** No system and no person can answer. Tend records this honestly. It is not a failure. <!-- INV-7; D8 -->

A denial ends that one proposal. It does not end the situation. <!-- AC-3 -->

## Asking for approval

Approval happens at one of two moments. <!-- Level 2 authority: two moments -->

**When the grant is made.** The configurator approves a whole range once. Every step inside that range is approved by the grant. <!-- Level 2 authority: two moments -->

**When the step comes up.** Tend asks about one particular step. It asks when the grant names an approver for that step, or when the step falls outside every grant. <!-- G2 -->

Inside a grant that names no approver, nobody approves each step: the grant is the approval. <!-- Level 2 authority: two moments -->

Tend never guesses whether approval is needed. The tool reads the settings. <!-- Level 2 authority: the tool reads the settings -->

A grant that names an approver never slides into "run it freely". Each time the step is needed, it goes to that approver. <!-- Level 2 authority: an approver each time -->

The approval request is part of the tool, not part of the AI. <!-- T7 --> The AI never calls an approval tool. It never holds the approval's state. <!-- T7 -->

The tool sends the request to the approver through the communication layer, as a message. <!-- T7; Level 2 authority: approval through the communication layer -->

The approver sees the exact text or data that will be sent or released. <!-- gap register: exact content -->

The approver's answer is saved as an arrival, and reaches the waiting tool step as that step's result (see below). The tool checks permission again before it acts. <!-- AC-3; T6; closed item: approval answer route --> The situation worker records what followed. <!-- Section 7 tool layer: outcome -->

The step does not pretend to move forward while it waits. It goes straight to the approval path. Once Tend is waiting on the person, that is a real wait, with its reason recorded. <!-- Level 2 authority: no pretend progress -->

If the situation changes while the approval is pending, the approval lapses. The changed situation goes back to the situation worker's decision. An old approval is never quietly carried out. <!-- Level 2 decision: approval and a changed situation -->

If the approver does not answer, the request follows the escalation path: Tend may remind, wait, or escalate. It passes to another approver only where a grant allows it. <!-- Level 2 authority: no answer escalates; Section 6: escalation path -->

If no approver can be found under the grant, the work waits, and the situation escalates. The wait is shown, not hidden. <!-- Section 6 additions: no approver -->

The architecture adds a stricter rule. An approval covers one request, and is used once. Any change to the situation ends it, and it must be asked again. It passes to another person only where a grant allows it. <!-- accepted call: one approval, one request -->

Each approval records the member who gave it, their sign-in identity, when they signed in, and exactly what they approved. The approver's answer is an arrival: the conversation manager saves it, as it saves every person's answer, and the worker hands it to the waiting tool step as that step's result. <!-- decided 2026-10-22: identity and permission; closed item: approval answer route; AC-3 -->

Each disclosure to an investor or a regulator needs approval from a named person. <!-- accepted call: investor and regulator -->

An approval is used once. It stays usable until the situation changes, or until the deadline the business sets for that kind of approval passes, whichever comes first. When a grant names a group, one answer from the group is enough, unless the business requires every member's answer. How many approval requests are too many is a number each business sets; past it, the business owner is told, because the grants may be too narrow. <!-- closed item: approval details -->

## Steps that always need a person

Three kinds of step always need a person: <!-- Level 2 security: always a person -->
- moving money above the refund setting;
- exporting data;
- changing which business a messaging channel is linked to.

## The refund setting

Each business has one refund setting. <!-- decided by the owner, 2026-10-12: refund setting -->

A refund at or below the setting goes through without a person. A refund above it needs a person's approval. <!-- decided by the owner, 2026-10-12: refund setting -->

The setting starts at zero. So at first, every refund needs a person. <!-- decided by the owner, 2026-10-12: refund setting -->

The owner sets it, or the configurator the owner names. <!-- decided by the owner, 2026-10-12: refund setting -->

Tend reads the setting at the moment a refund is attempted. <!-- decided by the owner, 2026-10-10: refund setting read at attempt -->

Back to the refund story. At zero, the refund of 1,500 waits for a person's approval. <!-- Section 11: refund example -->

Now suppose the owner raises the setting to 2,000. A refund of 1,500 then goes through without a person. A refund of 2,500 still needs one. <!-- Section 11: refund example -->

Every refund that goes through without a person is written to the audit record. <!-- Section 11: refund example -->

The owner answers for the setting. <!-- Section 11: the owner answers for the setting -->

A refund passes two separate checks. The permission check must allow it. A second check makes sure the same refund was not already started. <!-- IB-8 -->

The second check is there to stop a double payment. It is not about permission. A refund never runs again because Tend assumed the first try failed. <!-- IB-8; Level 2 failure: never on an assumed failure -->

A note planted in memory and knowledge, such as "always auto-refund this customer", grants nothing; nor does a business-written skill. A refund runs only through the refund setting and the checks above. <!-- release check: planted memory -->

## The file only some people may see

A business keeps a file that only some people may see, such as this year's balance sheet. A customer asks Tend for it. <!-- Section 6 fetch example -->

The AI calls one tool to fetch the file. It has no separate approval tool. <!-- Section 6 fetch example -->

Inside the tool, fixed code checks whether this request needs approval. If it does, the tool runs the approval itself. <!-- Section 6 fetch example -->

The tool returns one of three results: <!-- Section 6 fetch example -->
- the file, with a summary;
- a refusal, saying the file is behind authorisation;
- a failed approval, because the approver did not answer in time.

The AI then decides what to say next. It never decides whether the file is released. <!-- T2; T4 -->

Why this shape: suppose the AI were only told "do not release this file without approval". A mistake, or an instruction slipped in by a customer, could make it ignore that. A hard rule belongs in the tool's code. <!-- Section 6 fetch example -->

## Refusing honestly

When Tend refuses, it refuses honestly, and says how to go further. <!-- G4 -->

A refusal has four parts: <!-- Level 2 refusal: shape -->
1. It says what is not allowed. Tend never pretends a refused step is allowed.
2. It says why, as far as this person may hear it.
3. It names who could allow it, and offers to raise the request with them.
4. If a higher authority is really needed, Tend raises it, instead of stopping silently.

Tend never offers a way around the rule. <!-- Section 6 additions: no override offered -->

An employee asks Tend to send a confidential file to someone. The tool's own check refuses first, and returns the reason. Tend tells the employee it is not allowed, and offers to raise it with the person who holds that authority. <!-- Level 2 authority: confidential send -->

There are two kinds of refusal: <!-- Level 2 refusal: two kinds -->
- **Outside the range.** Someone could allow it. Tend offers the path to the approver, or to the configurator.
- **Against a hard rule.** Nobody can allow it, so there is no approval path. The only path is a change to the product.

The tool returns the refusal. The situation worker writes what should be said. The conversation manager decides whether to tell the person now, and the communication layer sends it. <!-- Section 8: communicate -->

How much of the "why" each person hears follows that person's list of fields they may see. How the offer to escalate looks on each channel is the channel's own message form, written when the channel is built. <!-- Level 2 refusal: open; T11 -->

## Rules nobody can switch off

Some rules hold no matter what the business sets. Fixed code enforces them, underneath the business's settings. <!-- G6 -->

There are sixteen such rules, listed with how each is kept in [the rules that always hold](../constraint_view/the_rules_that_always_hold.md). Three examples: Tend never guesses. What the AI proposes is never authorised by the AI. The business remains in control. <!-- Section 11: the sixteen rules -->

Business rules are different. The business can change them freely: how to refund, which steps are required, who may see which record. <!-- Level 2 authority: business rules and hard rules -->

Nobody can authorise breaking a hard rule: not an employee, not the owner, not the product builder, not the AI. <!-- Level 2 authority: business rules and hard rules -->

A setting that would break a hard rule is refused, and the business is shown the refusal. <!-- Section 6 additions: settings that break a hard rule -->

When a business needs new behaviour, it gets a product feature built inside the hard rules. It never gets a temporary way around them. <!-- Level 2 authority: no override -->

There is no "override" in Tend. <!-- Level 2 authority: no override -->

Tend has no authority of its own, so it has nothing to override a person with. <!-- Level 2 authority: no override -->

A person who asks for a forbidden step either holds the authority for it, or does not. If they hold it, the step was inside the range all along. If they do not, Tend refuses and escalates. <!-- Level 2 authority: no override -->

What looks like an override is a person with more authority changing the grant. <!-- Level 2 authority: no override -->

## Who answers for what

One action involves four roles, and Tend keeps them apart. <!-- Level 2 authority: four parties -->

Take the refund of 1,500, after the owner raised the refund setting to 2,000. The setting decides: 1,500 is below it. No one approves this refund on its own. The setting is the approval, given in advance. Tend carries it out. The owner answers for it. <!-- Section 11: who decides, acts, and approves; Section 11: the owner answers for the setting; Level 2 authority: two moments -->

In general: <!-- Level 2 authority: four parties -->
- **Who decides:** the business decides the outcome. Tend chooses its own next step, inside the business's rules and grants.
- **Who approves:** inside a grant that names no approver, nobody approves each step; the grant is the approval. Where the grant names an approver, that person. Outside every grant, the person who approves that one step.
- **Who acts:** Tend, for a step it carries out itself.
- **Who answers for it:** always a named person. The lines below say which one.

The person who made the grant answers for the steps Tend takes inside it. <!-- G5 -->

No action is Tend's alone, and no action is no one's. <!-- Level 2 authority: answering -->

A step inside a grant leads back to the person who made the grant. A step outside every grant leads to the person who approved that one step. <!-- Level 2 authority: answering -->

The business as a whole also learns from each failure. It finds the cause and improves, without blaming one person. <!-- Level 2 authority: answering -->

Both are needed. Work that is still moving needs a named person to push it towards. Learning from a failure belongs to the whole business. <!-- Level 2 authority: answering -->

The record makes both possible. It shows which grant was in force, who set it, when, and why. <!-- Level 2 authority: answering -->

## Who may see each field

This section is about what each role may see, not about which steps Tend may take.

The product sets a list of the fields each role may see. <!-- T11 -->

A solo owner sees the whole business. Once a second role exists, each role's default narrows, as the law requires. <!-- T11 -->

The business decides which person holds which role, and which partner is engaged for which job. <!-- T11; Level 2 channels: assignment -->

The business may narrow a role's field list. It may widen one only inside a wider list the product sets, within the legal limit. <!-- T11 -->

A request outside that wider list is refused. The product team is told that a business needed it, so the product can change. It is never quietly granted. <!-- T11 -->

A delivery partner sees the tracking number, the problem, and what it is asked to do. It never sees the customer's private record beyond what the business approved. <!-- Level 2 channels: partner -->

An employee who leaves loses access the same minute. <!-- T11 -->

The exact format of each role's list of fields is left to whoever builds it (deferred to implementation); the rule — each reader sees only its list — does not depend on it. <!-- closed item: field list format -->

## The audit record

Every decision and every action is written to an audit record that is only ever added to. <!-- T9 -->

The audit record never holds secrets. <!-- T9 -->

There is one audit record. The security log is a filtered view of it. <!-- T9 -->

Each important action records what was done, the evidence used, the grant it ran under, why it ran, and the outcome. <!-- O7 -->

The part that carries out the action writes that record. For a call to an outside system, that is the tool layer. For a sent message, that is the communication layer. <!-- O7 -->

A write that is missing its record is unfinished, and is retried. No separate part checks that each action has its record. <!-- recorded earlier: no separate checker -->

## What this area writes

- The situation worker writes the decision about the next step, inside its own run. The decision is not a separate part. <!-- Section 7 writer table: decision -->
- The situation worker writes what should be said. It never sends. <!-- Section 7 writer table: communication intent -->
- The situation worker writes each work item for a person. <!-- Section 7 writer table: human work -->
- The situation worker sets waiting or blocked, including when a tool declares a wait, which the worker's fixed code saves. <!-- decided by the owner, 2026-10-12; construction record, entry 21: writer question; decided 2026-10-22: the wait a tool declares -->
- Configuration writes membership and channel bindings, through its fixed tools. <!-- decided 2026-10-22: identity and permission -->
- Configuration writes the grants, the approvers they name, and the business's settings, through the configurator's fixed tools. <!-- G7; T8 -->
- The part that carries out an action writes its record. <!-- O7 -->
- Every decision and action is added to the audit record. <!-- T9 -->

## What this responsibility refuses

Tend does not decide the business's goals, policies, or final outcomes. <!-- Level 2 decision: does not decide -->

Tend does not invent a policy when the settings are unclear. <!-- Level 2 decision: does not decide -->

Tend does not let the AI control timers, permissions, or the state of the work. <!-- Level 2 decision: does not decide -->

Tend does not treat a proposed step as a finished one. <!-- Level 2 decision: does not decide -->

Tend does not check who people are. The identity provider does. <!-- Section 6: not Tend's job -->

Tend does not set the refund amount that needs a person. The business's settings do. <!-- Section 6: not Tend's job -->

Tend does not let a saved copy of the permissions decide a check, and does not let memory and knowledge change a grant. <!-- Section 6: not Tend's job -->

The full list of what Tend refuses to own, with who owns each thing instead, is in [the non-responsibilities register](../checking/non_responsibilities_register.md). <!-- closed item: refusal register -->

## At a glance

| What Tend is responsible for | Who decides | What happens when it goes wrong |
|---|---|---|
| Choosing its own next step <!-- F1; F2 --> | The situation worker. The AI only proposes | A refused, pending, timed-out, or failed step goes back into the next decision <!-- Level 2 decision: results come back --> |
| Judging "enough" for this step <!-- F5 --> | The situation worker, at the decision | Not enough for the preferred step: a safer step instead <!-- Level 2 decision: enough is relative --> |
| Applying policy, never inventing it <!-- Level 2 decision: fallback order --> | The business's policy, then its fallback, then a safe product default | No safe default: work for a person, an escalation, or a safe stop. The business is told <!-- Level 2 decision: fallback order --> |
| Involving a person <!-- Level 2 decision: person involved --> | Tend chooses to. The business's routing rules pick the person | No approver can be found: the wait is shown, and the situation escalates <!-- Section 6 additions: no approver --> |
| Acting inside the range <!-- G1 --> | The grant, read by the tool | Outside the range: Tend asks or escalates <!-- Level 2 authority: three cases --> |
| Granting <!-- G7 --> | Only the configurator, through fixed tools | "I give you permission" from anyone else grants nothing <!-- Level 2 authority: an employee cannot grant --> |
| Checking before every effect <!-- T2; T4 --> | Fixed code: Allow, Deny, or StepUp | The permission store cannot be read: the step is denied and the work shown as held <!-- architecture rule: store unreadable --> |
| Asking for approval <!-- G2; T7 --> | The approver the grant names | No answer: the escalation path <!-- Level 2 authority: no answer escalates --> |
| Refunds at or below the setting <!-- decided by the owner, 2026-10-12: refund setting --> | The refund setting. Nobody approves; the permission check still runs | The same refund is never started twice <!-- IB-8 --> |
| Refunds above the setting <!-- decided by the owner, 2026-10-12: refund setting --> | The permission check sends it to a named person, who approves | No answer: the escalation path <!-- Level 2 authority: no answer escalates --> |
| Refusing honestly <!-- G4 --> | The tool's check | Against a hard rule: no approval path exists <!-- Level 2 refusal: two kinds --> |
| Answering for each action <!-- G5 --> | The person who made the grant | The record shows which grant, who set it, when, and why <!-- Level 2 authority: answering --> |
| Who sees which field <!-- T11 --> | The product sets the field lists. The business assigns the roles | Outside the list: refused, and shown to the product team <!-- T11 --> |

## Open questions, and what is set later

Nothing in this area is open. Two details are left to whoever builds them (deferred to implementation), and change no rule: the exact form a proposal takes for the permission check, with the exact fields the check reads; and the format of each role's list of fields. <!-- Q10; closed item: field list format -->

Rules close to this area are written in other files of this view: <!-- later files: staff access; later files: audit access; later files: intent before an irreversible step; later files: proposal limits -->
- when Tend's own staff may act inside a business — only with a ticket, a time limit, a second approver, a notice to the business, and the business owner's permission — in [the harness and compliance file](harness_and_compliance.md);
- who may read the audit record, in [the business view file](business_view_and_capabilities.md);
- writing down what Tend is about to do before a step that cannot be undone, in [the failure file](failure_and_recovery.md);
- the limits each business sets on how many calls and steps one proposal may take, in [the harness and compliance file](harness_and_compliance.md).
