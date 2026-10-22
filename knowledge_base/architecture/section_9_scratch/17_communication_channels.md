# Section 9 scratch — Dimension 17: Communication and Channel Constraints

**Status:** Section 9 discovery record only, as of 2026-10-06. This file does not amend canonical architecture, Product Vision, Level 1, or Level 2 answers. It records the dimension pressure and source tensions for parent audit; it does not define channel schemas or provider mechanics.

## 1. Construction question

How can Tend communicate the right, situation-true change to each actor who needs it, while keeping business intent and message meaning separate from the permission to disclose, the channel's right to carry it, and the platform's ability to deliver it—and while preserving honest waits, partial progress, recipient boundaries, and recoverability when delivery is rejected or unknown?

## 2. Force

Tend's work is not complete when it has reasoned about a situation or produced a draft. A business may need to contact someone, satisfy a response promise, ask for missing information, transfer human work, or report a material change. Yet a useful message is not automatically authorized, consented to, allowed by the channel, safe for the intended recipient, or delivered.

The force is **safe, accountable expression across changing channel conditions**, not maximizing outbound volume or hiding every workflow behind a chat transcript. Tend must carry the business's purpose and situation forward without letting channel convenience invent a purpose, widen authority, bypass consent, disclose another actor's information, or turn an unconfirmed send into a false claim of success.

The challenge is especially sharp when:

- a business instruction starts an external conversation rather than replying to one;
- a reply window, consent, recipient preference, or permission has changed since the previous decision;
- several recipients need different views of the same situation;
- a situation changes materially while only some asks are complete;
- an external party needs an honest update during a wait or failure;
- a platform rejects a send or gives no reliable result; or
- the business adds, removes, or changes a channel while situations are active.

## 3. Evidence-derived model

### 3.1 Business intent and message meaning are not channel permission or transport

- **Decision Making** selects whether the next behaviour is to communicate, ask, wait, perform another action, or stop. Communication expresses the selected interaction: its useful content, intended actor, appropriate explanation, and relation to the situation. The same communication responsibility can be triggered by a customer message, an owner instruction, a system event, an employee answer, an external-agent result, or time; it is not limited to replies.
- **B-Story** owns the current, versioned operational truth and the decision/send intent associated with it. The worker does not call a channel API. A committed situation-model version and its express intent are the basis on which egress may proceed.
- **B-Membrane** owns ingress routing and delivery of permitted egress across the business boundary. It applies channel and recipient gates and interacts with communication platforms; it does not decide business strategy, create authority, own operational truth, or cancel a story wait.
- The platform owns canonical channel messages and actual transport. Tend coordinates through it; Tend does not become the channel's system of record or claim that a message arrived merely because it attempted a send.
- Communication may shape expression for the actor and channel, but it cannot change the underlying evidence, selected business purpose, recipient entitlement, or permission result. The exact division between message composition, channel adaptation/encoding, and provider operation is not a field or component contract in this record.

This split preserves both sides of the product promise: Tend can continue work without a new prompt, and neither a draft nor a model proposal can authorize its own effect.

### 3.2 A send is a conjunction of gates, not a channel preference

Section 8 establishes a send gate requiring the referenced situation-model version to be current (or intentionally historical under resend semantics), a send decision on that version, an authorization result that allows the send, applicable channel rules, and the outbound field allowlist. Authorization is checked before the effect and at each action boundary against authoritative policy, not inferred from the model, a message draft, a cached permission, a channel name, or text supplied by the requester.

For this dimension, the conceptual checks remain distinct:

- **Business purpose and authority:** what the business instructed or configured, who may act for it, and whether the intended communication is inside the delegated range.
- **Disclosure permission:** whether this actor may receive this information for this purpose; the information may be usable internally but not disclosable to this recipient.
- **Consent or other applicable contact basis:** where required for the actor, purpose, direction, market, and channel.
- **Channel eligibility:** whether this channel permits the kind of reply or initiation at this moment, including any applicable window or message-category restriction.
- **Content and evidence safety:** whether the proposed claims are supported, uncertainty/conflict is represented honestly, and untrusted carryover or excess data is removed.
- **Delivery result:** what the platform actually confirms, rejects, or leaves unknown.

Passing one gate does not satisfy another. In particular, a valid business purpose does not prove consent; consent does not make a channel accept a free-form message; a channel window does not prove the business may contact the recipient; and successful transport does not make the underlying claim true.

### 3.3 Replying and initiating are different permission cases

The Level 2 channel decision distinguishes an active conversation from starting a new one. A reply remains on the current channel; it is not an invitation to switch channels simply because another route is convenient. The current channel's rules still apply: a prior inbound message alone does not establish that a later reply is permitted, current, or within a valid window.

Initiation is the decision point where a preferred work/contact channel matters. The Level 2 working rule uses an ordered, gated route—preferred permitted channel, then a qualifying template route where available, then email, then a human decision, wait, or escalation. Every attempted rung remains subject to purpose, recipient permission, any required consent/lawful basis, and the channel's own current rules. If no rung is permissible, Tend does not silently refuse the work or switch channels to evade the block; it records a visible routing outcome and continues only through a safe permitted path.

Consent is directional and actor-dependent, not one universal “consented” flag. A customer/prospect initiation has a real purpose- and channel-specific gate. An employee's expected work lane is a business reachability/role question, not customer-style opt-in. A partner request is bounded by the business's engagement and the partner's responsibility/rules. A reply, initiation, approval request, internal human-work notification, and external partner request must not be conflated just because each is rendered as a message.

### 3.4 The same story does not imply the same view for every recipient

An internal employee or owner may need evidence, unresolved claims, deadlines, prior attempts, authority needed, and the responsibility being requested. A customer or prospect generally needs the current situation, what is known or uncertain, the next useful step, and a realistic expectation—not internal blame, tool traces, or unrelated private data. An external partner receives only the operational context needed for its own work, such as the shipment/problem/request, not the full customer or business record.

The Level 2 visibility decision is a **narrow governed range**, not unrestricted business-authored access control: product-defined role and partner scopes set a narrow floor; the business assigns people to roles and partners to tasks and may widen only within a permitted whitelist. The business remains responsible for its assignments, while Tend enforces the effective intersection of grant, owning-system/connector permission, and product invariants. This refines broader Product Vision and Level 1 wording that the business decides what a partner may see.

Per-recipient expression is therefore a derived, entitled view over the same situation, not a second truth record. The complete audience-to-view projection, verified identity-to-role join, and B-Visibility rendering remain less settled than the send gate itself.

### 3.5 Outbound expression follows material situation change, not execution chatter

An inbound message is recorded and routed internally; there is no default external receipt-only “we got your message” message. A communication worker does not stream tools, retries, intermediate model reasoning, or an unchanged work state to a customer or investor. B-Membrane reacts to a committed situation version carrying express intent; it does not invent outbound text while B-Story is running or from a timer alone.

When a situation changes in a way that matters to an entitled interactor, the communication expresses that **situation delta**—for example a partial answer, an honest wait, a correction, or a new next step. Partial fulfilment is valid: an approved deck may be sent while revenue remains open, with a bounded and truthful update about the remainder. The individual asks still need honest endings before the whole situation resolves. Employee work items may expose operational detail internally; external parties hear the situation-level change, not the work machinery.

This does not mean every situation-model write should notify every actor. The communication decision must still determine which interactor needs the change and whether it is material to that interactor. The default surface is artifact-first; a message is not a substitute for business visibility or a substitute for recording the state.

### 3.6 Failed delivery and unknown delivery are different from an unsuccessful business outcome

Level 1 treats messages that do not reach their destination, customer non-response, employee non-acknowledgement, and platform rejection as communication failures; Tend must not assume communication succeeded. Section 8 gives B-Membrane a delivery-ack ingress, records undeliverable evidence, retries rate limits/platform errors only under bounded channel rules, and returns a policy denial without sending. B-Membrane reports delivery evidence; B-Story owns any resulting story update, wait, failure declaration, or escalation.

The broader failure model supplies the safe pattern for uncertainty: distinguish a confirmed rejection from an unknown outcome; keep a visible wait inside its bound; use a supported status/idempotency contract where one exists; do not repeat a potentially consequential effect on a guess; then hand off when the bound is spent. U2 proves this for an irreversible refund. It is not yet an explicit message-delivery protocol: sending may itself be externally visible, while channel providers may differ in whether a retry is deduplicated or whether delivery is observable.

Accordingly, this dimension does **not** prescribe a send-retry count, delivery-state enum, provider receipt semantics, or universal message idempotency. It requires that a future design distinguish “rejected/not delivered,” “confirmed delivered,” “still pending,” and “outcome unknown” semantically, without claiming more than the evidence establishes. The exact representation and recovery choice stay open.

### 3.7 Channel evolution must not become business-logic evolution

The established boundary rationale places channel adapters and their policy variation at B-Membrane: adding or changing a channel should not rewrite nurture, refund, delivery, or stakeholder situation logic. A channel window is a wait on the shared Coordination/Time spine; its closure wakes B-Story, which re-reads the latest story and decides whether any permitted communication remains useful. An event or new adapter does not directly send, widen a grant, create consent, or rewrite a situation.

Channel lifecycle, policy refresh, compatibility with active intents, and what happens when the actor's preferred adapter is absent remain open. “Visible gap” is safer than a silent dead end, but a fallback is only a candidate route: it must never be treated as permission to bypass the intended purpose, consent, recipient scope, or law.

## 4. Affected responsibilities, boundaries, and interactions

### Responsibilities

- **Communication (I1–I7):** material situation-change expression; recipient-limited content; wait/ask/uncertainty/conflict wording; role-appropriate explanation; communication intent on the story, with the membrane shaping/gating/delivering rather than the worker transporting.
- **Channels and Permissions (L1–L4):** channel initiation/reply/window constraints; actor- and direction-sensitive consent/preference; gated initiate routing; narrow recipient visibility.
- **Authority (G1–G9) and Authorization (T1–T9):** delegated purpose/range, verified actor, effective permission, approval/StepUp, authoritative live checks before effect, and auditable decisions.
- **Trust and Evidence (E1–E9):** claims/provenance, conflict/currentness, uncertainty, and action-specific blocks that constrain what may be said or done.
- **Coordination and Time (H1–H10):** durable waits, channel-window resume events, response deadlines, current-version re-read, and escalation.
- **Human Collaboration / Partners (J1–J9, K1–K4):** routing blocked or needed communication to a responsible person/partner, distinguishing acknowledgement from completed work, and scoped handoffs.
- **Failure and Resilience (M1–M6), Compliance (U1–U6), and Harness (S1–S12):** recorded failure and recovery, tenant/privacy controls, outbound allowlists, deduplication, atomic write-and-announce, and separated structural versus authorization diagnostics.

### Boundaries

- **B-Story:** owns one current operational story, relevant evidence, wait/outcome, and communication/send intent; sole writer of operational truth.
- **B-Membrane:** owns event/message routing, channel policy checks, recipient-safe expression/egress, delivery jobs, and adapter-facing delivery evidence; it cannot author business truth, approve an action, or advance/cancel story waits.
- **Communication platforms:** own canonical messages and their delivery/receipt behavior; transport is outside Tend.
- **Adjacent-Tool / business systems:** may supply structured evidence or execute a separate capability; they do not decide what external communication should say or who may see it.
- **B-Visibility:** derives views from the story; the derive and exact audience projection remain provisional. Access control at egress remains a required authorization/visibility gate, not something a derived view can authorize.
- **Configuration and compliance:** own applicable business rules, permissions, contact bases, and jurisdiction/platform requirements within the product's fixed safety boundaries; exact configuration scope and market-specific policy remain open.

### Interaction edges

- Platform inbound message → B-Membrane routes → B-Story wake and versioned record; there is no automatic external receipt.
- B-Story commit with explicit communication intent → B-Membrane checks version, authority, content class, recipient visibility, channel permission, and outbound data bounds → platform delivery.
- Platform delivery acknowledgement/failure → B-Membrane records evidence; relevant B-Story may wake and decide the next safe behaviour.
- Timer/window → B-Story only; it reads the latest situation, and only a new permitted decision can create a send intent.
- Human/approver response → B-Membrane routes the response/artifact to B-Story; acknowledgement is not completion and approval is not a separate model-authorized send path.
- Partner contact → human/partner responsibility path with scoped payload and internal trail; the partner's result returns as evidence for the story.

### U1–U5 scenario stress

- **U1 — Priya business-directed outreach and reply-before-nurture:** an owner-supplied list creates one situation per person. The initial initiate must be purposeful, informed, authorized, and channel-permitted; it is not automatically allowed merely because the owner supplied addresses. Priya's reply commits inbound plus wait supersession atomically. When the old nurture timer fires, B-Story reads the newest version and does nothing; later egress still requires the send and channel gates. This stresses purpose vs channel eligibility, stale work cancellation, and initiation vs reply.
- **U2 — commercial chain/refund with silent gateway:** unknown refund outcome is not reported as completed and does not authorize a second post. Initiation, unknown outcome, and wait are committed together; the situation stays waiting through its configured settle window, and a customer asking “where is my refund?” receives an honest response from the latest story. The refund-specific idempotency rule is not automatically a message-provider retry rule.
- **U3 — investor requests deck and revenue:** first inbound is recorded internally with no receipt email. A cleared deck can be sent while the revenue ask remains open, accompanied by a truthful situation-level update; the investor sees neither finance/tool traces nor unrelated internal context. A later commit can communicate the revenue result. This is the strongest direct proof of situation-delta egress, partial fulfilment, and recipient-scoped visibility.
- **U4 — registered but stale/unavailable carrier:** a broken or stale source is not the same as an absent capability. Inside the configured bound, the story waits; when the response promise is at risk, a commit may produce an honest interim customer update. A partner request includes only the shipment problem, relevant reference, and ask; the order of internal/partner escalation is business configuration. Tool retries and story waits are distinct.
- **U5 — no shipping source:** if a person can answer, Tend creates human work with the order context and does not tell the customer there is “no capability.” If neither a system nor a person can answer, the story makes an evidenced capability-absent declaration and may send an honest limitation; this is not a platform failure. Separately, T-A/T-B security validation denies cross-tenant access and poisoned-data exfiltration before effect. **The U5 label conflicts with Section 6's U5 security-validation label; see parent audit.**

## 5. Invariants that bound this dimension

1. **Business intent is not channel authority.** A request, draft, preferred channel, successful authentication, or model proposal cannot alone authorize an outbound effect.
2. **One operational truth owner.** B-Story commits truth and express intent; B-Membrane and platforms do not write business outcome or story state.
3. **No send from a draft or a timer alone.** Egress refers to an eligible situation version carrying a send decision; a timer wakes B-Story and the current state is re-read.
4. **Every independent gate remains independent.** Grant/Policy, recipient visibility, applicable consent/contact basis, channel window/rules, evidence/content controls, and delivery evidence cannot substitute for one another.
5. **Check before effect and at the action boundary.** The authoritative grant/policy is consulted at send time; cached context, memory, message text, or old authorization cannot widen permission.
6. **External expression is situation-level and material.** No default receipt-only message, tool-trace narration, or update on an unchanged story; express a material change to an actor who needs and may receive it.
7. **Partial does not mean complete.** Send a safe, cleared portion when the committed story supports it; preserve the remaining ask and do not resolve the whole situation prematurely.
8. **Minimum sufficient disclosure.** Each actor receives only information required for their responsibility and permitted scope; the same situation may render differently to customer, employee/owner, investor, and partner.
9. **Reply is not blanket permission to initiate.** Stay in the current channel for a reply, subject to its current rules. Initiation requires the full gated route; preference and availability are not consent.
10. **Unknown delivery remains unknown.** Do not claim success without evidence, and do not blindly repeat a message whose first delivery may have occurred. The exact provider-specific recovery remains unconstructed.
11. **Failure and waiting are visible.** A denied route, undelivered message, unknown send outcome, or unavailable recipient changes the wait/escalation path honestly; no silent loss or false completion.
12. **Channel evolution cannot widen access.** New or changed adapters remain behind current purpose, identity, consent, visibility, compliance, and authorization gates; an integration gap is not a reason to bypass them.

## 6. Observed tensions and architectural consequence

### 6.1 Useful proactive updates vs noise and unsolicited contact

Tend must carry a response promise and sometimes prevent a harmful surprise, but it should not send a receipt-only message or a “still looking” message whenever a tool runs. Therefore the trigger is a material, committed change plus a communication decision—not merely a platform event, timer, or draft. A configured response deadline may make an honest interim update useful; the exact point at which it becomes due is not universal.

### 6.2 Preferred channel vs permission to use it

Preference is a routing hint for initiation, not a grant. A permitted channel can still be unavailable, outside its window, disallowed for the purpose, or unsafe for the content. Conversely, a valid channel window does not establish the lawful/contact basis. The operational consequence is a visible wait, human route, or escalation—not a silent alternate send.

### 6.3 One situation vs many recipient views

The story must retain enough evidence for the business to explain and act, while an external party must not see the whole internal record. This cannot be solved by splitting the story or by letting a message writer choose access ad hoc. It requires an entitled projection at each recipient boundary; exact projection schema and verified identity-to-role joins remain open.

### 6.4 Situation delta vs incomplete fulfilment

Waiting for all requested items avoids premature claims but may delay a result already safe to provide. Sending a partial answer can serve the recipient but must state honestly what remains open and must not imply the larger ask is complete. U3 establishes partial delivery when the story records it; the audience, purpose, and channel gates still apply to each send.

### 6.5 Retry liveness vs duplicate external messages

A definite platform rejection is different from a timeout after which the message might have been delivered. Retrying the latter can duplicate a promise, disclosure, or request; not retrying can leave the recipient unaware. The Section 8 membrane failure table and delivery-ack wake identify the path, but do not define unknown-send idempotency or recovery. This is a material gap, not a reason to borrow refund mechanics without testing provider contracts.

### 6.6 Stable business logic vs evolving channel rules

An adapter may be added, disabled, or have its rules change while an intent is waiting. Routing based on stale eligibility could violate permission; embedding each provider's rule in B-Story would couple business behavior to the platform. Re-evaluate at egress against current authoritative rules, while preserving the original situation intent and recording why a route became blocked. Policy-version capture and in-flight migration semantics remain open.

### 6.7 Explanation vs privacy

Recipients need enough truth to understand the situation and their next step; more detail can expose private information, internal disagreement, or unneeded operational traces. “Explainable” does not mean “same evidence for every recipient.” Communication depth follows role, responsibility, authority, consequence, sensitivity, and need-to-know, while the business retains the fuller evidence trail subject to its own entitlement.

### Architectural consequence

Keep the established **B-Story → committed communication intent → B-Membrane → platform** path. Keep business purpose and recipient selection logically distinct from channel eligibility, recipient visibility, and transport. Recheck the live gates immediately before send; let B-Membrane report transport evidence without claiming story truth; let B-Story decide whether to wait, communicate, re-route, ask, escalate, or stop. Do not add a second outbound path, a channel-specific business workflow, a universal consent shortcut, or an assumed delivery-success state to close the open provider question.

## 7. Status ledger

### Established by current evidence

- Communication is an expression of a selected behaviour and may be triggered by any relevant situation event, not only an inbound prompt. The worker writes situation intent; the membrane delivers it.
- B-Story is the sole writer of operational truth; B-Membrane owns the ingress/egress membrane and delivery jobs; canonical messages and transport remain with platforms.
- Egress requires a situation version and send decision, current authorization Allow, applicable channel gates, and outbound field allowlisting. Policy denial returns a distinct diagnostic and is not retried without change.
- Timers wake B-Story, not B-Membrane; stale nurture is a no-op after the latest state is read. A committed situation delta—not raw tool execution—is the external update unit.
- No default external receipt-only response and no external tool-trace narration. Partial fulfillment and honest material waits/corrections are valid situation-level updates.
- Reply and new initiation are different cases; preference is primarily relevant when starting contact. For initiation, purpose/contact permission and channel eligibility are separate and both must pass.
- Recipient communication is role- and responsibility-specific, with a narrow need-to-know default. Partner payload is limited to partner responsibility.
- Channel constraints belong at the membrane/policy edge, not in situation-specific business logic. An absent or blocked channel is a visible routing gap, not silent refusal.
- Failure must not be hidden; a bounded wait differs from failure, and an irreversible unknown business effect is not automatically redone.

### Provisional or established only at the Level 2 policy level

- The conceptual gated initiating sequence and a fallback candidate are Level 2 working decisions; Section 8 establishes the L1–L3 gate but does not walk the entire sequence under changing consent, market, and provider conditions.
- B-Visibility derive and exact recipient projections are provisional; Section 6 still lists the derived person-view join as open. The access gate must not be treated as provisional merely because the view design is.
- Owner notification significance beyond artifact-first defaults is provisional. External-interactor materiality is established in the U3 ruling, but the exact recipient/event matrix is not.
- Human work lifecycle principles are established in Level 2; the Section 8 human-work field enum is provisional.
- The correspondence between an externally visible send intent and channel-specific composition/encoding is conceptually split but not a settled interface.

### Open

- The channel-policy, consent/contact-basis, message-intent, recipient-scope, delivery-job, platform receipt, and failure evidence schemas; no field names or enums are established here.
- Concrete adapters/providers, transport APIs, channel-specific windows/templates/costs, and their market-specific implementation; do not infer these from Level 2 examples.
- The exact lawful basis/consent rules by market and the product-defined visibility floor/whitelist by market.
- The meaning of “fallback always exists” when the fallback lacks an adapter, consent, lawful basis, permitted purpose, or usable recipient address; no route may bypass those gates.
- Unknown delivery outcome handling, provider dedup/idempotency support, safe retry policy, delivery acknowledgment semantics, and the boundary between pending, timed-out, rejected, delivered, and undeliverable.
- Which committed deltas each customer, investor, employee, owner, or partner must receive; whether an interim message is mandatory on wait entry, only when a promise/deadline requires it, or on request; and how changed preferences or contact permission affect in-flight work.
- Verified identity-to-role/authority join, complete partner/customer disclosure projection, and how recipient access is revalidated and audited at each send.
- Channel-add/remove/change lifecycle, policy refresh/versioning, current-intent revalidation, and handling of queued sends when an adapter or permission is revoked.
- Exact routing and escalation when every initiation route is blocked, no human recipient is known, or a recipient cannot be reached.

## 8. Alternatives and trade-offs

- **Worker sends directly vs Fork B through the membrane:** direct sends collapse decision, story, authorization, and transport and bypass the committed-version gates; rejected. The membrane split costs an extra boundary and requires reliable write-and-announce, but preserves a single story owner and one egress control point.
- **Channel-specific workflows in B-Story vs channel-neutral intent plus adapter policy:** embedding provider rules in sales, refund, or delivery logic makes platform evolution rewrite business logic; rejected. The adapter boundary costs configuration and revalidation work but isolates change.
- **One generic consent/preference bit vs actor/direction/purpose-specific gates:** a single flag confuses an existing reply with a new initiation and makes employee/partner work unlike customer outreach; rejected. The safer model is more complex and has market-specific open questions.
- **Always acknowledge / narrate every step vs situation-delta communication:** receipts and tool-trace updates create noise and expose internal process; rejected by the U3 ruling. The trade-off is that the durable situation/artifact and useful material updates must be reliable.
- **Wait for every ask vs send a cleared partial result:** bundling can delay useful information; default withholding is rejected in U3 when the commit supports safe partial fulfilment. The trade-off is stricter per-ask state and wording so the recipient does not mistake partial for complete.
- **Use any reachable channel automatically vs a gated initiate path:** automatic fallback can evade consent, recipient expectation, or legal/channel rules; rejected. A gated route may wait or require a person even when another adapter exists.
- **Retry every send timeout vs assume delivery failure:** either choice can cause duplicates or lost communication when outcome is unknown. Neither is established; provider evidence, idempotency, consequence, and bounded waits must decide later.
- **Full story to every recipient vs scoped views:** full disclosure simplifies rendering but violates need-to-know and privacy; rejected. Minimum sufficient disclosure takes more authorization and projection work.
- **Separate ingress and egress services vs one logical membrane:** Section 7 rejects the split because it duplicates channel expertise and raises interaction cost. The membrane remains a logical ownership boundary, not a required deployment shape.

## 9. Evaluation signals

These are observations for future tests and operating evidence, not numeric thresholds or finalized acceptance criteria.

- For each outbound attempt, can an auditor trace the committed story version, communication decision, intended actor/purpose, live policy verdict, channel eligibility and content filtering—without making a provider implementation or schema part of this dimension?
- Are there any sends from draft-only state, stale timers, superseded situations, revoked grants, missing required contact basis, ineligible windows, or recipients outside their scope? The target behavior is no unauthorized send.
- Does U1 prove that a reply cancels nurture before a stale follow-up is sent, while a later permitted continuation still uses the story and send gates?
- Does U3 prove internal-only receipt, no tool-trace exposure, safe partial deck delivery while revenue remains open, and a second situation delta only when the later commit warrants it?
- Does U4 distinguish fresh, stale, unavailable, and conflicting carrier evidence; maintain a visible wait; provide an honest update when the applicable promise requires it; and send the partner only task-scoped context?
- Does U5 keep capability absence distinct from a broken channel/source and distinguish a human who can answer from no available answer? Do the separate T-A/T-B checks deny cross-tenant and poisoned-data disclosure before any provider call?
- Can delivery tests distinguish a confirmed rejection from a pending or unknown outcome, prevent unsupported claims of delivery, and avoid duplicate external communication when delivery may already have happened?
- Do recipient-specific views preserve enough information for the next responsibility without leaking full-story detail, private data, internal blame, or tool traces?
- Do blocked or missing adapters become visible work with a safe alternative or wait/escalation, rather than a silent refusal or a consent-bypassing fallback?
- When channel or policy configuration changes, do queued sends revalidate without rewriting the historical decision or silently broadening access?
- Are platform failures, permission denials, recipient non-response, and business inaction distinguishable in the trace and followed by the correct owner and escalation path?

## 10. Revisit conditions

Revisit this record when:

- a U1–U5 or production trace shows a wrong, duplicate, missing, stale, unauthorized, misrouted, or over-disclosing communication;
- a confirmed delivery failure or unknown send outcome cannot be represented and safely recovered without assuming refund-tool behavior applies to messaging;
- customers or stakeholders miss a material update, receive repeated/noisy updates, or are told that an ask is complete while it remains open;
- testing shows a fallback lane is unavailable or unlawful for a material class of intended contact, or a preferred-channel rule conflicts with a current platform permission;
- a new market or adapter changes permission, consent, visibility, window, or delivery semantics and existing situations cannot be safely revalidated;
- role/identity changes or partner engagement changes leave a queued message with stale recipient authority or information scope;
- the B-Story/B-Membrane boundary duplicates policy decisions, loses delivery evidence, bypasses current authorization, or makes channel evolution change business logic;
- Level 2 Communication, Channels, Authority, Trust/Evidence, or Failure revisions change who should be told, what may be said, or when a wait requires an interim message; or
- the Section 6/8 U5 naming collision or the other parent-audit contradictions below are formally resolved.

Do not revisit merely to choose a provider, invent a schema, or optimize message counts. Require evidence that safety, responsibility, useful progress, explainability, or independent channel evolution is not being preserved.

## 11. Contradictions and clarifications for parent audit

1. **U5 has two meanings.** `section_6_responsibility_model.md` §6.6 labels U5 as security validation (T-A/T-B); `section_8_interaction_model.md` §8.16.3 labels U5 as “Package status, no shipping source.” Section 8 describes T-A/T-B separately. Parent should reconcile the scenario index and cross-references; this record uses the Section 8 capability-absent case for the communication walkthrough and notes T-A/T-B separately.
2. **Communication vs Channels ownership wording is not normalized.** `communication_conversation_and_discoveries.md` records the correction that channel rules/implementation concerns belong to Level 3, while `channels_and_permissions_conversation_and_discoveries.md` and the four Channels answers assign conceptual permission/eligibility rules to Level 2 and only concrete transport/adapters to Level 3. The intended distinction appears to be policy vs mechanics, but the older sentence can be read as moving all channel constraints out of Level 2.
3. **“Fallback always exists” can be read too broadly.** The channel-rule answer calls email a universal fallback, while the initiate sequence makes every rung conditional on purpose, recipient permission, applicable consent/lawful basis, and channel window, and allows human/wait/escalation when none can fire. Parent should state clearly that fallback means a candidate path, never guaranteed lawful delivery or an instruction to use email without its gates.
4. **Level 1 email shorthand needs qualification.** The feedback interaction says WhatsApp and Telegram place strict limits “while email does not”; Channels Level 2 still requires email's applicable lawful basis/consent and unsubscribe conditions. The likely intended contrast is channel initiation/window restrictions, not permission-free email. Preserve that distinction.
5. **Failure-driven customer updates are not aligned across examples.** Failure recovery says that when bounded polling becomes a wait, the customer is told honestly; the U2 Section 8 refund walkthrough records initiation + unknown + wait and only explicitly shows an external response if the customer asks. U4 does show a deadline-triggered interim update, while Communication makes material situation change and applicable send gates controlling. Parent should reconcile whether U2 requires a proactive interim send at wait entry or only at a response promise/deadline, without weakening the no-receipt/no-noise rule.
6. **Product/Level 1 business-controlled visibility is narrowed by Channels Level 2.** Product Vision and Level 1 can sound as if the business freely sets the partner's scope; Channels Q4 instead puts role/partner scopes and legal floor/whitelist inside product-defined limits, with the business assigning role/partner and widening only within that range. The Q4 answer appears to refine the broad wording; parent should carry that hierarchy explicitly.
7. **Message delivery unknown is under-specified.** Section 8 records delivery acknowledgements and confirmed undeliverable/platform failures, while generic Failure unknown-outcome recovery is concretely grounded in irreversible tool effects such as refunds. There is no explicit cross-provider message idempotency/retry rule. Keep the gap open rather than silently treating unknown send as known failure or importing a provider mechanic.

## 12. Evidence register

Paths below are the exact load-bearing sources. Section/heading names identify the relevant evidence; Level 2 files remain the source for category answers.

### Product intent and Level 1 framing

- `knowledge_base/Product_Vision.md` — §1 “What is Tend?” (agency across actors, systems, channels, and time); §4 “What Tend does differently”; §5 “A day in the life of Tend” (business-directed outreach and multi-interaction journey); §6 “The principles behind Tend” (understand, never guess, facts, communication as one decision-cycle step, human responsibility, artifacts, explainability, traceability, fail safely); §8 “What success looks like” and “What the owner sees.”
- `knowledge_base/Level1_Problem_Framing_or_Expansion.md` — §2 assumptions “Communication is part of larger business situations,” “Tend must continue work without a new prompt,” “The business needs artifacts,” and “Communication channels have different rules”; §4 external actors; §6 interactions (customer, prospect, partner, feedback); §7 boundaries; §8 invariants (traceability, no excess disclosure, human responsibility, latest state); §9 “Communication failures” and “Business inaction”; §11 “Unbounded or prohibited communication”; §12 “Channels and Permissions.”

### Canonical architecture and settled rulings

- `knowledge_base/architecture/section_6_responsibility_model.md` — §6.4 Groups E–H, I (I1–I7), J, K, L (L1–L4), M, S, T, U; §6.5 responsibilities outside Tend; §6.6 U1–U5; §6.7 responsibility relationships; §6.9 state ownership; §6.10 open questions.
- `knowledge_base/architecture/section_7_boundary_model.md` — §7.7 accepted boundaries; §7.10 U1; §7.11 U2; §7.12.1 B-Story, §7.12.2 B-Membrane, §7.12.4 B-Visibility, §7.12.5 adjacent tool, §7.12.9 distributed gates; §7.13 edge catalog and authority flow.
- `knowledge_base/architecture/section_8_interaction_model.md` — §8.2 invariants; §8.3 Fork B and per-wake contract; §8.4 separate structural/authorization diagnostics; §8.5 message and delivery-ack wake routes; §8.7 AC-1–AC-4; §8.8 IB-1–IB-11; §8.10.1–8.10.3 egress, failure propagation, and situation-delta rules; §8.11 human work; §8.16.1–8.16.5 U1–U5 walks; §8.17 anti-patterns.
- `knowledge_base/architecture/what_is_already_settled.md` — “The story and the message that leaves it”; “When someone outside hears from Tend”; “Permission”; “What a sentence can do”; “A carrier that is down, and a business that cannot ship”; “Leave these closed”; and “Leave these open.”

### Level 2 Communication

- `knowledge_base/Level 2/communication/communication_conversation_and_discoveries.md` — conceptual communication boundary, decision vs expression, event-driven communication, and the Level 3 scope correction.
- `knowledge_base/Level 2/communication/when_should_tend_communicate.md` — permitted/useful/explainable triggers; no receipt-only default; situation-delta ruling (2026-09-25); partial fulfilment; explicit non-settlement of channel/transport mechanics.
- `knowledge_base/Level 2/communication/when_should_tend_wait.md` — silent vs acknowledged waiting and the communication/coordination boundary.
- `knowledge_base/Level 2/communication/when_should_tend_ask_a_question_instead_of_performing_an_action.md` — ask when the answer could change situation, intent, actor, policy, permission, or consequence; clarification vs consent vs approval distinctions.
- `knowledge_base/Level 2/communication/how_should_tend_communicate_uncertainty.md` and `knowledge_base/Level 2/communication/how_should_tend_communicate_conflicting_information.md` — known/unknown/stale/conflict expression, neutral and recipient-proportionate.
- `knowledge_base/Level 2/communication/how_should_communication_differ_between_customers_and_employees.md`, `knowledge_base/Level 2/communication/how_much_explanation_should_different_users_receive.md`, and `knowledge_base/Level 2/communication/when_should_tend_explain_its_reasoning.md` — role, responsibility, authority, consequence, sensitivity, and minimum sufficient explanation.

### Level 2 Channels, Permissions, Authority, Trust/Evidence, and Failure

- `knowledge_base/Level 2/channels_and_permissions/channels_and_permissions_conversation_and_discoveries.md` and `knowledge_base/Level 2/channels_and_permissions/understanding_all_channels_and_permissions_questions.md` — four-question map; channel as configurable transport/adaptation; permission vs platform rule separation; visible gap and fallback tension; product/Level 3 division.
- `knowledge_base/Level 2/channels_and_permissions/how_should_tend_represent_what_each_communication_channel_allows_a_business_to_send.md`, `knowledge_base/Level 2/channels_and_permissions/how_should_tend_record_consent_and_the_customers_preferred_channel.md`, `knowledge_base/Level 2/channels_and_permissions/how_should_tend_choose_between_replying_in_the_current_channel_and_starting_a_message_in_another_channel.md`, and `knowledge_base/Level 2/channels_and_permissions/how_should_tend_decide_what_information_each_employee_customer_or_external_partner_may_see.md` — conceptual channel rules, directional consent/preference, gated initiate route, and narrow governed visibility.
- `knowledge_base/Level 2/authority_and_ownership/when_is_tend_allowed_to_perform_an_action.md`, `knowledge_base/Level 2/authority_and_ownership/when_must_tend_ask_for_approval.md`, `knowledge_base/Level 2/authority_and_ownership/how_should_tend_communicate_a_refusal_and_offer_escalation.md`, `knowledge_base/Level 2/authority_and_ownership/how_do_identity_and_authority_join.md`, `knowledge_base/Level 2/authority_and_ownership/who_may_grant_authority_and_what_comes_by_default.md`, and `knowledge_base/Level 2/authority_and_ownership/which_actor_owns_each_type_of_information.md` — delegated range, pre-effect approval/refusal, principal verification, permission intersection, and claim/record ownership distinct from disclosure permission.
- `knowledge_base/Level 2/trust_and_evidence/how_do_we_distinguish_facts_from_assumptions.md`, `knowledge_base/Level 2/trust_and_evidence/how_do_we_represent_confidence_without_pretending_certainty.md`, `knowledge_base/Level 2/trust_and_evidence/how_do_we_identify_conflicting_information.md`, `knowledge_base/Level 2/trust_and_evidence/when_should_conflicts_automatically_stop_the_workflow.md`, and `knowledge_base/Level 2/trust_and_evidence/when_should_conflicts_simply_be_presented_to_a_person.md` — claim/proposal/action separation; provenance and versioned correction; conflict and uncertainty; action-specific stopping; human review and recipient-scoped evidence.
- `knowledge_base/Level 2/failure/failure_conversation_and_discoveries.md`, `knowledge_base/Level 2/failure/how_do_we_distinguish_failure_from_uncertainty.md`, `knowledge_base/Level 2/failure/how_do_we_recognise_failure.md`, `knowledge_base/Level 2/failure/how_do_we_recover_after_failures.md`, `knowledge_base/Level 2/failure/how_do_we_continue_working_when_only_part_of_the_system_is_unavailable.md`, `knowledge_base/Level 2/failure/how_do_we_keep_the_business_safe_while_recovering.md`, `knowledge_base/Level 2/failure/how_do_we_avoid_repeating_the_same_failed_action_forever.md`, and `knowledge_base/Level 2/failure/which_failures_can_safely_wait.md` — no silent failure; bound-based wait/failure; partial work; two clocks/interim message; bounded retries; unknown side-effect outcome and human handoff.

