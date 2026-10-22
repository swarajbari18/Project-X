# Section 9 scratch — Dimension 13: Human Behaviour

**Status:** Section 9 discovery record only. This does not amend canonical architecture or Level 2 answers. Parent corrections are recorded for a later pass.

**Scope:** Human participation and responsibility when people act, delay, misunderstand, provide incomplete information, reject work, become unavailable, change roles, delegate, accept a handoff, or fail to respond. This dimension stresses U1–U5 without defining a routing algorithm, business escalation ladder, status enum, or universal timer.

## 1. Construction question

How does Tend keep human work visible and safely moving across silence, delay, unavailability, handoff, and changing authority—without treating delivery as receipt, acknowledgement as acceptance, acceptance as completion, or a person’s availability as permission?

## 2. Force and conversation carried forward

Human behaviour is not an exception to Tend’s operating model. Tend carries a situation across people, systems, channels, and time, but people may not respond on the system’s schedule. They may misunderstand a request, provide only part of what is needed, decline it, become unavailable, change roles, or leave responsibility ambiguous. Silence does not tell Tend which of those happened.

The earlier Human Collaboration framing leaned too heavily toward an employee receiving a task. Swaraj corrected that: customers, prospects, partners, investors, and other interested parties may each need to participate, and partner work is not a small edge case. The work therefore belongs to the journey and the specific responsibility—not to an employee-only task queue.

Other decisions carried forward:

- The person who owns a fact or system is not automatically the person who owns the next work item.
- A responsibility target can be a named person, role, team, queue, schedule, partner representative, or another relevant actor. The routing policy remains business-specific.
- Acknowledgement, authorization, approval, and legal consent are not interchangeable labels. The business and applicable rules determine what a particular response permits.
- Sending or notifying a proposed new owner does not transfer responsibility. A handoff remains pending until accepted, except where an explicit queue or on-call rule defines acceptance differently.
- Acknowledgement may change a notification clock, but it does not complete the work. Meetings also create follow-up work; they are not just messages on a calendar.

The force is **accountable continuity without false progress**: no human dependency disappears into an unowned “waiting” state, and no substitute or automated action is allowed to claim a result or authority it does not have.

## 3. Evidence-derived behaviour

The following is a semantic lifecycle, not a prescribed implementation sequence or enum:

1. **Decide why a person is needed.** Human involvement is required when the next safe step depends on information, confirmation, authority, approval, judgement, performance, representation, or accepted responsibility that Tend cannot safely replace or bypass. Low model confidence is not the only reason.
2. **Create the work at the right grain.** One situation may contain separate work for investigation, customer confirmation, partner action, approval, and communication. Each item has a clear responsibility target and its own authority, data scope, deadline or wait, and expected result. Do not collapse distinct responsibilities into one owner merely because they share a situation.
3. **Use the configured responsibility target.** Role, authority, expertise, relationship, availability, workload, urgency, information access, and business rules may matter. The architecture establishes these inputs, not their precedence or a general-purpose routing algorithm. If no safe target is evident, expose the unassigned responsibility and use configured fallback; do not guess.
4. **Commit the work before communicating it.** Human work and any notify intent are operational truth owned by B-Story and committed to the situation model. B-Membrane transports the request under the current channel, visibility, and authorization rules. A transport delivery result is evidence about delivery, not proof the person saw or accepted the request.
5. **Record what the person actually did.** A reply may acknowledge receipt, accept responsibility, report progress, provide evidence, reject the work, explain unavailability, or report completion. These meanings must remain distinguishable. The response returns through B-Membrane and is recorded by B-Story before the next decision. Do not infer a human response from a timer.
6. **Keep handoff ownership explicit.** The handoff carries the reason, current situation, known/missing/conflicting information, prior actions and commitments, expected next action, deadlines/waits, required authority, and permitted context. Until acceptance—or an explicit configured auto-accept rule—the prior owner, fallback, or escalation responsibility remains visible. A handoff and an escalation may overlap, but they are not the same event.
7. **Treat unavailability separately from non-response.** Known leave, outside-hours, a failed channel, a failed business system, workload, role change, expired authority, and unknown availability are different evidence. Apply the configured coverage, delegation, fallback, wait, or escalation path. An available substitute is not necessarily authorized to access, approve, or perform the same action.
8. **Keep time and escalation honest.** Human waits use the shared Coordination/Time wait model: subject, reason, timing class, resume trigger, release policy, escalation path, and visibility. A response deadline and a resolution deadline are distinct. A timer wakes the situation; B-Story re-reads current state and policy before acting. If the configured escalation path is exhausted, surface a blocked situation or stop safely rather than looping invisibly.
9. **Close only the thing that is actually complete.** Delivery of a request, acknowledgement, acceptance of ownership, completion of one work item, ending of one ask, and closure of the whole situation are separate claims. Partial fulfilment can be communicated while other asks remain open. A completed human item does not by itself establish the business outcome or close every related ask.

## 4. Affected responsibilities, boundaries, and interactions

- **Decision Making (F) selects; Human Collaboration (J) manages.** Decision Making chooses to ask, create work, wait, request approval, arrange a meeting, escalate, or stop. Human Collaboration manages the resulting responsibility and response. It does not choose business policy or replace the decision owner.
- **B-Story owns operational truth.** It records human work, ownership and handoff changes, waits, results, and the next decision on the situation model. Human Collaboration is not a new standalone architecture boundary. B-Story must use the latest situation version when a response, timer, or handoff races with new information.
- **B-Membrane owns transport, not human outcome.** It sends a committed work request subject to the current egress gates; it records delivery failure evidence and routes human or partner responses. It does not declare that work was accepted, completed, or that the situation succeeded.
- **Coordination and Time (H) own the durable wait spine and wake.** They keep the human dependency, timing, resume condition, release policy, and escalation path visible. The wake returns to the decision loop; time itself does not select a replacement or close the work.
- **Authority and Ownership (G/T) constrain every actor.** Identity does not confer authority. A transfer of work is not a transfer of a grant. Role- and person-based grants have different turnover behavior; current authority must be resolved at the relevant action boundary. A human request, acknowledgement, or escalation cannot bypass a denial or product invariant.
- **B-Visibility (O) projects the work.** The business needs to see who or what is responsible, what is waiting, why, until when, what has changed, and what escalation or decision is needed. The projection is not a writer of operational truth. External actors receive only business-approved information.
- **Business and external actors retain their own accountabilities.** The business owns its goals, policies, and decisions. A partner owns its operation and its answer. Tend coordinates, records, and communicates; it does not become the business, employee, customer, or partner.
- **Meetings reuse the wait spine.** A meeting is a wait whose subject includes people and a date. Cancellation, miss, or reschedule is a recorded meeting event, not a deleted appointment. Its outcome creates the next human work or wait with a responsible target.

## 5. U1–U5 stress tests

The U5 label is already inconsistent between parent sections; both meanings are tested here and neither is silently renamed.

### U1 — Priya, business-directed outreach

The owner’s instruction creates separate person situations. A prospect’s silence is not rejection, interest, or completion. The configured nurture/wait path may continue without repeatedly interrupting the employee; if a reply needs employee information, that is a distinct human work item. When Priya’s reply arrives before the nurture timer, the latest situation version supersedes the stale wait and the timer becomes a no-op.

**Pass condition:** No inferred human response or false closure; no stale follow-up; work for an employee is created only when that person’s participation changes the next safe step, then remains visible through the configured path.

### U2 — Refund gateway silent after initiation

The gateway’s unknown refund result remains an operational unknown through the configured settle window. It does not create an immediate human escalation or justify a second new refund post. If it remains unknown when that configured window expires, B-Story records the handoff to a person. A sent or delivered handoff is not acceptance; acknowledgement or investigation is not proof the refund settled. The next step must use the current evidence and authority.

**Pass condition:** The configured wait is honored; no automatic duplicate effect or premature handoff; a human investigation does not overwrite the payment provider’s canonical result; the unresolved ask and situation stay open until an honest ending exists.

### U3 — Investor asks for deck and revenue

The investor is an interested party, not automatically a customer. The deck can be cleared and communicated while revenue remains unknown and assigned to the appropriate finance responsibility target. Fetch approval, human work, and investor disclosure remain distinct. Acknowledgement of the finance request, or delivery of the deck, cannot close the revenue ask or the whole situation. The business decides what the investor may receive; the membrane enforces that scope.

**Pass condition:** Partial fulfilment is visible and truthful; the finance item retains its own owner, authority, data scope, and deadline; the external message does not expose internal work traces or imply completion of the unanswered ask.

### U4 — Carrier source exists but tracking is stale or unavailable

An unavailable or stale carrier path is not the same as no capability. The situation waits and re-enters through its configured trigger. If a response promise is at risk, an interim customer update may be due while the internal resolution clock and escalation remain active. The configured business path may involve an internal logistics role, a partner, or another permitted route; “internal then partner” is an example, not a universal order. If a person is unavailable, coverage is checked separately from authority. A partner owns its investigation and receives only the approved shipment context.

**Pass condition:** No invented delivery fact, no tool-retry narration as a customer update, no hard-coded escalation order, no unaccepted transfer represented as accepted, and no partner disclosure beyond the configured scope.

### U5 — two parent meanings; preserve both

- **Section 8 capability-absent meaning:** If a shipping source is absent but a business person can answer package location, create human work with the order context. Only when neither a system nor a person can answer is capability absence the honest result. Do not misreport a human-answer path as “no capability.” If the person is silent or unavailable, apply the human wait/fallback rules; do not guess.
- **Section 6 security meaning (T-A/T-B):** A cross-tenant request or poisoned connected content cannot be made safe by a human’s request, acknowledgement, or convenience. Deny before the provider effect; do not leak restricted evidence. If the needed next step is an authorized human review, route it through the configured authority and visibility rules. Only the designated configurator may change grants; a normal work owner cannot self-grant.

**Pass condition:** Both cases remain in coverage under separate descriptive labels until the parent U index is reconciled. Capability absence, technical failure, policy denial, and a human who has not responded remain different conditions.

## 6. Architectural consequence

Human behaviour requires durable, versioned work and evidence on the situation model, plus explicit interactions with transport, waits, authority, and visibility. It does **not** justify a new Human Collaboration boundary or one universal human-work state machine.

The minimum architecture contract is semantic: B-Story commits the work and responsibility changes; B-Membrane reports transport outcomes and routes responses; Coordination/Time wakes and tracks waits; Authority checks the current actor and action; B-Visibility shows the current responsibility and risk. The business’s configured rules choose the target, deadlines, fallback, escalation effects, and any queue auto-accept convention. The implementation must not turn those inputs into an invented algorithm or enum here.

## 7. Invariants

1. **Silence is not an outcome.** No response, no acknowledgement, or no progress cannot be treated as rejection, approval, acceptance, or completion.
2. **Delivery is not receipt.** A channel/platform delivery result is not proof that a person saw, understood, or took responsibility for the request.
3. **Acknowledgement is not acceptance or completion.** Acknowledgement may affect a notification path under policy; it does not close the work item. Acceptance changes handoff responsibility only under an explicit acceptance or configured auto-accept rule.
4. **Work completion is not situation closure.** One item or ask may finish while other asks, waits, or conflicts remain open.
5. **Every live work item has a visible, unambiguous responsibility target.** That target may be a configured group or role, not necessarily a single named employee. Performer, work owner, approver, contributor, information owner, and accountable party are not interchangeable.
6. **Availability does not grant authority.** A substitute must be valid for the access, approval, or action required. Work, identity, and authority are checked separately.
7. **A pending handoff cannot orphan the work.** Preserve the prior owner, fallback, or configured queue responsibility until the transfer’s effective rule is met; preserve the history either way.
8. **Changed work uses current state.** New information, role changes, expired grants, or superseding instructions require re-evaluation before further action. Earlier assignments and decisions remain traceable.
9. **Escalation is a configured policy, not one universal action.** It may change notification, urgency, visibility, ownership, target, or authority. No default rung order, timer, or partner-first rule is invented here.
10. **Waiting and blocked are not synonyms.** A wait has a reason and a resume trigger; when no safe route remains, surface the block or stop safely rather than waking forever or disappearing.
11. **Human responsibility and business accountability remain distinct.** Tend can coordinate delegated work, but cannot become the principal or replace the business’s responsibility for its goals, policies, and decisions.
12. **Human participation does not override privacy or channel rules.** Escalation and handoff carry only the context permitted for that recipient.

## 8. Tensions

- **Keep moving vs stop safely:** Product Vision asks Tend to keep the situation moving until someone safe takes responsibility. If no authorized substitute or escalation remains, movement cannot be manufactured; the honest result is visible blocked work or a safe stop.
- **No silence vs fewer interruptions:** Suppressing every reminder hides risk; escalating every quiet interval pesters people. Business urgency, consequence, working hours, response promises, and configured notification preferences govern the trade-off.
- **Continuity vs authority:** A role or queue can preserve continuity through absence, while a named-person grant may not survive that absence. A replacement can own coordination without inheriting approval authority.
- **Clear ownership vs shared work:** One situation can have many distinct work items and contributors. The responsibility target for each item must be clear, while the rule for one accountable individual versus a group/queue remains open.
- **Acknowledgement vs progress:** Acknowledgement can stop or change notification escalation without reducing the work still owed. The response clock and resolution clock must not collapse into one.
- **Context vs disclosure:** A new owner needs enough history to act; an investor, customer, or partner must not receive the internal trail unless policy allows it. The handoff package and external rendering are not the same payload.
- **Meeting anti-pester guard vs accountability:** The meeting-specific person-level route may terminate at a senior; the senior’s own inaction is still surfaced through owner-attention/Failure machinery. This is not a general human-work ladder and must not be converted into one.
- **Fast queueing vs meaningful acceptance:** Auto-accept can prevent orphaned queue work, but an implicit rule must be explicit and distinguishable from a notification. Requiring explicit acceptance universally can add delay and unnecessary interruption.

## 9. Established, provisional, and open

### Established at the responsibility/behaviour level

- People may be required for information, confirmation, permission, approval, judgement, performance, representation, or ownership—not merely because model confidence is low.
- Silence categories that matter include not delivered, delivered but not acknowledged, acknowledged but no progress, rejected, unavailable, completion not recorded, and work made unnecessary by changed circumstances. These are distinctions, not a proposed enum.
- A handoff preserves context, history, authority, deadlines, and commitments; notification alone does not transfer responsibility.
- Work and authority are separate. Known unavailability invokes configured coverage/delegation/fallback; a substitute may perform work without being allowed to approve the same action.
- Escalation can change different things and its ladder, thresholds, and business-hour behavior are configured. If the path is exhausted, blocked work is surfaced.
- Multiple work items can exist in one situation; their owners, authorities, data scopes, dependencies, and outcomes stay distinguishable.
- Meetings reuse the wait model. Their no-show/cancel/reschedule path has a meeting-specific attention guard and a terminal senior route; the senior’s inaction remains visible through existing owner/Failure machinery.
- Business accountability for policy and decisions does not disappear when Tend performs an authorized action. For an automated action, performer, grantor/approver, and accountable person remain traceable.

### Provisional or configuration-bounded

- Section 8’s human-work field names and state examples are conceptual and expressly provisional. This scratch record adds no field schema or enum.
- Whether every handoff needs explicit acceptance, versus a business-defined queue/on-call auto-accept rule, depends on the kind of work and configuration.
- Notification stop/restart behavior after acknowledgement, the form of progress evidence, and completion verification depend on the work and policy.
- Availability signals, meeting intent/preferences, business hours, response/resolution deadlines, check-in intervals, reminder counts, escalation thresholds, and fallback order are not universal constants.
- Meeting floor numbers, exception waivers, and preference expiration are configuration/research items. The terminal-to-senior meeting rule is specific to that meeting path, not a generic human escalation template.

### Open

- What evidence proves request delivery, human acknowledgement, transfer acceptance, work progress, and completion in each channel/work type—and which are merely reported claims?
- Which classes of handoff require explicit acceptance, and which configured queue/on-call rules may accept automatically?
- Must every human work item name one accountable individual, or can a role/group/queue be sufficient if its response and accountability rule is explicit?
- How are parallel approvals combined, and when is one qualified group member enough versus every required person/group?
- How is availability authoritatively detected, and how are unavailable-but-not-departed actors covered without silently extending a person-specific grant?
- How are role or grant changes during an in-flight handoff/action applied and audited? Which already-authorized in-flight operations, if any, may finish?
- Which work-specific evidence or independent confirmation is needed before a reported human completion ends an ask?
- What is the configuration surface for escalation ladders, contact channels, thresholds, response/resolution promises, and notification preferences? The behavior model depends on them but does not define their route-selection algorithm.
- When a meeting chain reaches its senior terminal, what owner-attention/Failure signal and safe-stop behavior apply if the senior does not act? Do not add another meeting rung without a parent decision.
- Which stakeholder-specific acknowledgement is operational confirmation, authorization, approval, or legal consent? Keep the law/policy meaning with the responsible domain.

## 10. Alternatives and trade-offs

- **Treat “sent” or “delivered” as accepted:** fewer states and faster apparent transfer, but risks false ownership and silent orphaning. Rejected except for a business-defined auto-accept rule with explicit scope.
- **Treat acknowledgement as completion:** simplifies notification handling, but loses the open work and resolution promise. Rejected.
- **Transfer work immediately to whoever is available:** reduces delay, but availability neither proves suitability nor grants access/approval authority. Rejected as a general rule.
- **Require explicit acceptance from every target:** strongest evidence of transfer, but can create needless interruption and block queue workflows. Not a universal default; the business may define acceptance for a queue or on-call target.
- **Use one fixed escalation ladder or always contact the partner:** easy to implement and explain, but contradicts business-specific roles, urgency, authority, partner rules, and customer context. Rejected.
- **Keep one owner for the whole situation:** makes a board look simple, but hides genuinely separate customer, finance, employee, approval, and partner work. Prefer one clear target per work item; leave group accountability mechanics open.
- **Model every distinction as a new global enum:** makes examples look concrete but hardens unvalidated business choices. Preserve distinct evidence and meanings first; decide representations only with parent/Level 3 work.
- **Leave all human work in chat:** avoids a work model, but violates the artifact-first and durable-wait requirements. Work must be reconstructable from the situation, not dependent on a live conversation.

## 11. Signals for evaluation

These are observable review signals, not thresholds or automatic routing rules:

- A trace can separately reconstruct the request’s transport result, a person’s acknowledgement, a handoff’s acceptance rule, subsequent progress, reported/verified completion, and the ask/situation outcome.
- Every waiting human item exposes its reason, next trigger or deadline, current responsibility target, fallback/escalation path, and what the recipient is permitted to see.
- Non-response is never silently represented as acceptance, completion, or a negative customer decision; delayed or rejected work remains visible.
- A pending handoff retains a responsible prior owner or explicit queue rule; no work item becomes ownerless because an employee left, changed role, or failed to respond.
- A substitute’s relevant authority is checked independently from availability and work assignment; denials cause no protected side effect.
- Acknowledged-but-no-progress work remains discoverable after any notification clock changes; response-promise and resolution-promise behavior can be reviewed separately.
- U3 can show honest partial progress; U2 does not duplicate an unknown refund; U4 does not hard-code escalation order; both U5 meanings remain distinguishable.
- A sampled situation can be reconstructed without inventing who accepted, who authorized, what was completed, or why escalation selected its next configured step.

## 12. Parent corrections and clarifications to carry forward

These are audit findings only; no canonical file is changed here.

1. **Reconcile U5 numbering.** Section 6 §6.6 calls security validation U5; Section 8 §8.16.3 calls the no-shipping-source capability-absent walkthrough U5. Preserve both tests under separate descriptive labels until the parent index is corrected. This collision was already recorded in `knowledge_base/architecture/section_9_scratch/08_authority_security.md` and remains unresolved in the canonical sections.
2. **Separate the human evidence meanings in Section 8 §8.11.2.** Its conceptual state examples and acknowledgement timestamp are marked provisional. Make the future parent contract distinguish membrane/platform delivery evidence from a human acknowledgement, transfer acceptance, progress/no-progress, rejection/unavailability, work completion, and ask/situation closure. Do not turn this list into an enum in this scratch pass.
3. **Reconcile J9’s scope across Sections 6 and 8.** Section 6 J9 requires substitute-authority verification before irreversible action on transferred/covered work; Section 8 §8.11.2 places its parenthetical validation at “approval class.” Ensure the later wording does not imply that only approval-class work needs a fresh authority check where the substitute would access or perform another protected action.
4. **Clarify ownership language without changing the Level 2 open question.** J4’s “one responsible owner per human work item” must allow the configured target to be a role/team/queue and keep performer, accountable person, and approver distinct. The question of whether every item needs one individually named accountable human remains open; do not resolve it by silently making the queue an accountable person.
5. **Carry the Meetings category’s specific behavior into the parent when that path is integrated.** Section 6 K3 currently says record cancel/miss/reschedule; Section 8’s general human protocol does not yet express the Level 2 two-counter meeting guard, terminal senior route, and owner/Failure surfacing of senior inaction. Preserve the distinctions, keep the floor/waivers configured, and do not generalize this meeting rule to every human-work escalation.
6. **Keep the configured path open.** Section 8 §8.16.5 and the settled page correctly reject a hard-coded internal-to-partner order. Preserve those statements; D13 does not add route precedence, a timer, or status values.

## 13. Revisit conditions

Revisit this dimension or the parent Sections 6–8 if a trace cannot tell whether a human request was delivered, acknowledged, accepted, progressed, completed, or superseded; if business configuration cannot express a safe fallback or queue acceptance rule; if a transfer can orphan work or let an unverified substitute act; if an acknowledgement hides overdue work; if a meeting’s terminal path becomes silent; if external actors need a different disclosure/authority boundary; or if a proposed schema or routing algorithm turns the open business choices above into product-wide defaults.

Also revisit the U5 stress result after the canonical test index is reconciled, and re-run these tests if J4/J5/J7/J8/J9, the wait spine, the authority/grant model, or the ownership of B-Story/B-Membrane changes.

## 14. Evidence paths

### Product and Level 1

- `knowledge_base/Product_Vision.md`
- `knowledge_base/Level1_Problem_Framing_or_Expansion.md`

### Architecture parent and prior Section 9 findings

- `knowledge_base/architecture/section_6_responsibility_model.md`
- `knowledge_base/architecture/section_7_boundary_model.md`
- `knowledge_base/architecture/section_8_interaction_model.md`
- `knowledge_base/architecture/what_is_already_settled.md`
- `knowledge_base/architecture/section_9_scratch/01_time.md`
- `knowledge_base/architecture/section_9_scratch/06_state_lifecycle.md`
- `knowledge_base/architecture/section_9_scratch/08_authority_security.md`
- `knowledge_base/architecture/section_9_scratch/12_observability.md`

### Level 2 — Human Collaboration

- `knowledge_base/Level 2/human_collaboration/when_should_tend_involve_a_person.md`
- `knowledge_base/Level 2/human_collaboration/how_do_we_determine_the_correct_person.md`
- `knowledge_base/Level 2/human_collaboration/how_do_we_represent_ownership_of_ongoing_work.md`
- `knowledge_base/Level 2/human_collaboration/how_do_we_handle_multiple_people_working_on_the_same_situation.md`
- `knowledge_base/Level 2/human_collaboration/how_do_we_transfer_work_between_employees.md`
- `knowledge_base/Level 2/human_collaboration/what_happens_when_nobody_responds.md`
- `knowledge_base/Level 2/human_collaboration/what_happens_when_the_responsible_person_is_unavailable.md`
- `knowledge_base/Level 2/human_collaboration/how_do_we_avoid_interrupting_people_unnecessarily.md`
- `knowledge_base/Level 2/human_collaboration/human_collaboration_conversation_and_discoveries.md`

### Level 2 — Meetings and Human Work

- `knowledge_base/Level 2/meetings_and_human_work/the_meeting_as_a_wait_spine_bridge.md`
- `knowledge_base/Level 2/meetings_and_human_work/how_should_tend_decide_which_person_is_suitable_for_a_meeting.md`
- `knowledge_base/Level 2/meetings_and_human_work/how_should_employee_availability_preferences_meeting_type_and_business_rules_work_together.md`
- `knowledge_base/Level 2/meetings_and_human_work/how_should_tend_handle_a_meeting_that_is_cancelled_missed_or_rescheduled.md`
- `knowledge_base/Level 2/meetings_and_human_work/how_does_tend_represent_who_is_responsible_for_the_next_step_after_a_meeting.md`
- `knowledge_base/Level 2/meetings_and_human_work/how_should_tend_escalate_work_when_a_person_does_not_act.md`
- `knowledge_base/Level 2/meetings_and_human_work/how_should_an_external_partner_be_contacted_when_the_business_has_not_acted.md`
- `knowledge_base/Level 2/meetings_and_human_work/meetings_and_human_work_conversation_and_discoveries.md`

### Level 2 — Coordination and Time

- `knowledge_base/Level 2/coordination/how_do_independent_actors_work_together.md`
- `knowledge_base/Level 2/coordination/how_do_we_represent_work_that_is_waiting.md`
- `knowledge_base/Level 2/coordination/how_do_we_represent_work_that_is_blocked.md`
- `knowledge_base/Level 2/coordination/how_do_we_know_a_piece_of_work_is_still_active.md`
- `knowledge_base/Level 2/coordination/how_do_we_coordinate_long_running_work.md`
- `knowledge_base/Level 2/coordination/how_do_we_recover_interrupted_work.md`
- `knowledge_base/Level 2/coordination/how_do_we_prevent_duplicated_work.md`
- `knowledge_base/Level 2/time/how_should_deadlines_influence_decisions.md`
- `knowledge_base/Level 2/time/how_should_tend_react_when_time_changes_the_situation.md`
- `knowledge_base/Level 2/time/how_should_waiting_be_represented.md`
- `knowledge_base/Level 2/time/when_should_waiting_end_automatically.md`
- `knowledge_base/Level 2/time/how_should_forgotten_work_be_rediscovered.md`

### Level 2 — Authority and Ownership

- `knowledge_base/Level 2/authority_and_ownership/which_actor_owns_each_action.md`
- `knowledge_base/Level 2/authority_and_ownership/which_actor_owns_each_decision.md`
- `knowledge_base/Level 2/authority_and_ownership/who_remains_accountable_after_an_automated_action.md`
- `knowledge_base/Level 2/authority_and_ownership/how_does_a_grant_end_and_how_does_role_change_affect_authority.md`
- `knowledge_base/Level 2/authority_and_ownership/who_may_grant_authority_and_what_comes_by_default.md`
- `knowledge_base/Level 2/authority_and_ownership/when_must_tend_ask_for_approval.md`
- `knowledge_base/Level 2/authority_and_ownership/can_tend_override_a_human_decision.md`
- `knowledge_base/Level 2/authority_and_ownership/how_should_tend_communicate_a_refusal_and_offer_escalation.md`
- `knowledge_base/Level 2/authority_and_ownership/authority_and_ownership_conversation_and_discoveries.md`
- `knowledge_base/Level 2/authority_and_ownership/default_authorization_range_research.md`
