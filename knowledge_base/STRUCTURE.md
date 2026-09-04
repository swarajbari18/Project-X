# Knowledge Base Structure

This folder contains the product knowledge and system-design thinking for Project X (currently referred to as **tend**). The material is organised from broad product context to problem framing, conceptual solutions, and supporting research.

## Directory tree

```text
knowledge_base/
├── README_FIRST.md
├── Product_Vision.md
├── three_level_framework/
│   ├── 3_level_framework.md
│   └── level2_method.md
├── Level1_Problem_Framing_or_Expansion.md
├── STRUCTURE.md
├── Level 2/
│   ├── communication/
│   │   ├── communication_conversation_and_discoveries.md
│   │   ├── understanding_all_communication_questions.md
│   │   ├── when_should_tend_communicate.md
│   │   ├── when_should_tend_wait.md
│   │   ├── when_should_tend_ask_a_question_instead_of_performing_an_action.md
│   │   ├── when_should_tend_explain_its_reasoning.md
│   │   ├── how_much_explanation_should_different_users_receive.md
│   │   ├── how_should_communication_differ_between_customers_and_employees.md
│   │   ├── how_should_tend_communicate_uncertainty.md
│   │   └── how_should_tend_communicate_conflicting_information.md
│   ├── authority_and_ownership/
│   │   ├── authority_and_ownership_conversation_and_discoveries.md
│   │   ├── understanding_all_authority_and_ownership_questions.md
│   │   ├── who_may_grant_authority_and_what_comes_by_default.md
│   │   ├── default_authorization_range_research.md
│   │   ├── the_business_configuration_capability.md
│   │   ├── which_actor_owns_each_type_of_information.md
│   │   ├── which_actor_owns_each_decision.md
│   │   ├── which_actor_owns_each_action.md
│   │   ├── when_is_tend_allowed_to_perform_an_action.md
│   │   ├── when_must_tend_ask_for_approval.md
│   │   ├── can_tend_override_a_human_decision.md
│   │   ├── who_remains_accountable_after_an_automated_action.md
│   │   ├── how_does_a_grant_end_and_how_does_role_change_affect_authority.md
│   │   ├── how_do_identity_and_authority_join.md
│   │   └── how_should_tend_communicate_a_refusal_and_offer_escalation.md
│   ├── business_view_and_observation/
│   │   ├── business_view_and_observation_conversation_and_discoveries.md
│   │   ├── understanding_all_business_view_and_observation_questions.md
│   │   ├── what_should_the_business_owner_see_in_a_snapshot_of_the_business_journey.md
│   │   ├── which_events_should_require_the_owners_attention.md
│   │   └── what_information_should_the_business_always_be_able_to_see.md
│   ├── journey_and_lifecycle/
│   │   ├── journey_and_lifecycle_conversation_and_discoveries.md
│   │   ├── understanding_all_journey_and_lifecycle_questions.md
│   │   ├── how_should_tend_represent_the_difference_between_a_prospect_a_customer_and_a_returning_customer.md
│   │   ├── how_should_one_customer_have_several_open_situations_at_the_same_time.md
│   │   ├── how_should_a_conversation_that_contains_several_problems_be_split_into_separate_situations.md
│   │   ├── how_should_waiting_for_a_meeting_a_delivery_a_payment_a_repair_or_a_feedback_date_be_represented.md
│   │   ├── how_should_tend_know_when_a_waiting_period_has_ended.md
│   │   ├── how_is_the_person_level_journey_derived_from_the_situation_graph.md
│   │   ├── how_should_tend_hold_the_stakeholders_who_want_to_know_how_the_business_is_doing.md
│   │   └── how_should_tend_think_about_followup_and_nurture_versus_outreach.md
│   ├── meetings_and_human_work/
│   │   ├── meetings_and_human_work_conversation_and_discoveries.md
│   │   ├── understanding_all_meetings_and_human_work_questions.md
│   │   ├── the_meeting_as_a_wait_spine_bridge.md
│   │   ├── how_should_tend_decide_which_person_is_suitable_for_a_meeting.md
│   │   ├── how_should_employee_availability_preferences_meeting_type_and_business_rules_work_together.md
│   │   ├── how_should_tend_handle_a_meeting_that_is_cancelled_missed_or_rescheduled.md
│   │   ├── how_does_tend_represent_who_is_responsible_for_the_next_step_after_a_meeting.md
│   │   ├── how_should_tend_escalate_work_when_a_person_does_not_act.md
│   │   └── how_should_an_external_partner_be_contacted_when_the_business_has_not_acted.md
│   ├── channels_and_permissions/
│   │   ├── channels_and_permissions_conversation_and_discoveries.md
│   │   ├── understanding_all_channels_and_permissions_questions.md
│   │   ├── how_should_tend_represent_what_each_communication_channel_allows_a_business_to_send.md
│   │   ├── how_should_tend_record_consent_and_the_customers_preferred_channel.md
│   │   ├── how_should_tend_choose_between_replying_in_the_current_channel_and_starting_a_message_in_another_channel.md
│   │   └── how_should_tend_decide_what_information_each_employee_customer_or_external_partner_may_see.md
│   ├── growth_and_evolution/
│   │   ├── growth_and_evolution_conversation_and_discoveries.md
│   │   ├── understanding_all_growth_and_evolution_questions.md
│   │   ├── how_do_new_business_systems_become_part_of_tend.md
│   │   ├── how_do_new_communication_channels_become_part_of_tend.md
│   │   ├── how_do_new_business_policies_become_part_of_tend.md
│   │   ├── how_do_new_workflows_become_part_of_tend.md
│   │   ├── how_do_businesses_customise_tend_without_changing_its_core_behaviour.md
│   │   ├── how_do_we_support_businesses_that_operate_differently_from_one_another.md
│   │   └── how_do_we_evolve_tend_without_breaking_existing_businesses.md
│   ├── compliance_and_security/
│   │   ├── compliance_and_security_conversation_and_discoveries.md
│   │   ├── understanding_all_compliance_and_security_questions.md
│   │   ├── what_are_the_compliances_of_each_actor_and_tech_stack.md
│   │   ├── how_do_we_make_a_software_product_secure.md
│   │   ├── the_security_audit_framework.md
│   │   ├── when_do_we_need_a_formal_audit_soc2_iso27001_or_pentest.md
│   │   └── how_do_we_apply_security_while_coding_with_agentic_tools.md
│   ├── gathering_information/
│   ├── gathering_information/
│   │   ├── how_do_we_determine_what_information_is_required_before_making_a_decision.md
│   │   ├── how_do_we_know_which_actor_owns_each_piece_of_information.md
│   │   ├── how_do_we_discover_where_information_lives.md
│   │   ├── how_do_we_prioritise_which_information_to_retrieve_first.md
│   │   ├── how_do_we_avoid_retrieving_unnecessary_information.md
│   │   ├── how_do_we_know_when_information_is_sufficiently_current.md
│   │   ├── how_do_we_handle_information_that_arrives_gradually.md
│   │   ├── how_do_we_handle_information_that_changes_while_a_situation_is_being_analysed.md
│   │   ├── relationship_between_understanding_and_gathering_information.md
│   │   └── understanding_all_gathering_information_questions.md
│   ├── trust_and_evidence/
│   │   ├── understanding_all_trust_and_evidence_questions.md
│   │   ├── how_do_we_determine_whether_information_should_be_trusted.md
│   │   ├── how_do_we_represent_confidence_without_pretending_certainty.md
│   │   ├── how_do_we_compare_information_from_different_sources.md
│   │   ├── how_do_we_identify_conflicting_information.md
│   │   ├── how_do_we_resolve_conflicts.md
│   │   ├── when_should_conflicts_automatically_stop_the_workflow.md
│   │   ├── when_should_conflicts_simply_be_presented_to_a_person.md
│   │   ├── what_makes_one_source_more_authoritative_than_another.md
│   │   └── how_do_we_distinguish_facts_from_assumptions.md
│   ├── decision_making/
│   │   ├── understanding_all_decision_making_questions.md
│   │   ├── decision_making_conversation_and_discoveries.md
│   │   ├── what_does_enough_information_mean.md
│   │   ├── how_do_we_determine_whether_project_x_can_make_the_next_decision.md
│   │   ├── which_decisions_can_always_be_automated.md
│   │   ├── which_decisions_must_always_involve_a_person.md
│   │   ├── which_decisions_depend_on_business_policy.md
│   │   ├── how_should_uncertainty_influence_project_xs_next_behavior.md
│   │   ├── how_do_we_represent_business_policies.md
│   │   ├── how_do_businesses_define_approval_rules.md
│   │   └── how_do_we_ensure_consistent_next_behaviour.md
│   ├── human_collaboration/
│   │   ├── understanding_all_human_collaboration_questions.md
│   │   ├── human_collaboration_conversation_and_discoveries.md
│   │   ├── when_should_tend_involve_a_person.md
│   │   ├── how_do_we_determine_the_correct_person.md
│   │   ├── how_do_we_handle_multiple_people_working_on_the_same_situation.md
│   │   ├── how_do_we_avoid_interrupting_people_unnecessarily.md
│   │   ├── how_do_we_transfer_work_between_employees.md
│   │   ├── how_do_we_represent_ownership_of_ongoing_work.md
│   │   ├── what_happens_when_nobody_responds.md
│   │   └── what_happens_when_the_responsible_person_is_unavailable.md
│   ├── memory_and_knowledge/
│   │   ├── memory_and_knowledge_conversation_and_discoveries.md
│   │   ├── understanding_all_memory_and_knowledge_questions.md
│   │   ├── what_should_tend_remember.md
│   │   ├── what_should_never_become_memory.md
│   │   ├── what_belongs_in_conversation_history.md
│   │   ├── what_belongs_in_long_term_business_knowledge.md
│   │   ├── how_should_previous_conversations_influence_future_decisions.md
│   │   ├── how_do_we_prevent_outdated_knowledge_from_influencing_new_decisions.md
│   │   ├── how_do_we_update_knowledge_when_reality_changes.md
│   │   ├── who_owns_business_knowledge.md
│   │   ├── can_tend_learn_automatically.md
│   │   ├── what_kind_of_learning_is_acceptable.md
│   │   ├── how_should_memory_be_stored_conceptually.md
│   │   ├── how_should_new_learning_be_reconciled_and_versioned.md
│   │   ├── how_should_memory_be_retrieved.md
│   │   ├── how_do_we_assemble_context_for_each_situation_phase.md
│   │   ├── how_should_memory_be_scoped_between_businesses.md
│   │   ├── how_should_tend_learn_from_its_own_mistakes.md
│   │   └── how_do_we_evaluate_automatic_learning.md
│   ├── coordination/
│   │   ├── coordination_conversation_and_discoveries.md
│   │   ├── understanding_all_coordination_questions.md
│   │   ├── how_do_independent_actors_work_together.md
│   │   ├── how_do_we_coordinate_long_running_work.md
│   │   ├── how_do_we_know_a_piece_of_work_is_still_active.md
│   │   ├── how_do_we_represent_work_that_is_waiting.md
│   │   ├── how_do_we_represent_work_that_is_blocked.md
│   │   ├── how_do_multiple_business_processes_interact.md
│   │   ├── how_do_we_prevent_duplicated_work.md
│   │   └── how_do_we_recover_interrupted_work.md
│   ├── prompt_constitution/
│   │   ├── prompt_constitution_conversation_and_discoveries.md
│   │   └── understanding_the_prompt_constitution.md
│   ├── time/
│   │   ├── time_conversation_and_discoveries.md
│   │   ├── understanding_all_time_questions.md
│   │   ├── how_should_tend_react_when_time_changes_the_situation.md
│   │   ├── how_should_deadlines_influence_decisions.md
│   │   ├── how_should_scheduled_work_begin.md
│   │   ├── how_should_waiting_be_represented.md
│   │   ├── when_should_waiting_end_automatically.md
│   │   └── how_should_forgotten_work_be_rediscovered.md
│   ├── failure/
│   │   ├── failure_conversation_and_discoveries.md
│   │   ├── understanding_all_failure_questions.md
│   │   ├── how_do_we_recognise_failure.md
│   │   ├── how_do_we_distinguish_failure_from_uncertainty.md
│   │   ├── how_do_we_recover_after_failures.md
│   │   ├── which_failures_require_immediate_attention.md
│   │   ├── which_failures_can_safely_wait.md
│   │   ├── how_do_we_continue_working_when_only_part_of_the_system_is_unavailable.md
│   │   ├── how_do_we_avoid_repeating_the_same_failed_action_forever.md
│   │   └── how_do_we_keep_the_business_safe_while_recovering.md
│   ├── explainability_and_observation/
│   │   ├── explainability_and_observation_conversation_and_discoveries.md
│   │   ├── understanding_all_explainability_and_observation_questions.md
│   │   ├── how_do_we_explain_every_recommendation.md
│   │   ├── how_do_we_explain_every_action.md
│   │   ├── how_do_we_explain_every_failure.md
│   │   ├── what_information_should_always_be_visible_to_the_business.md
│   │   ├── what_information_should_only_be_visible_to_administrators.md
│   │   ├── how_do_we_reconstruct_an_entire_business_situation_after_it_has_finished.md
│   │   ├── how_do_we_observe_the_health_of_the_overall_system.md
│   │   └── how_do_we_recognise_that_the_system_is_behaving_unexpectedly.md
│   └── understanding_the_situation/
│       ├── how_do_we_recognise_ambiguity_and_uncertainty.md
│       ├── what_does_it_mean_to_understand_what_a_customer_is_actually_asking.md
│       ├── how_do_we_determine_which_information_is_relevant_to_the_current_situation_and_which_information_should_be_ignored.md
│       └── how_do_we_determine_whether_multiple_messages_belong_to_the_same_situation_and_whether_two_seemingly_different_conversations_are_actually_related.md
└── research/
    ├── decision_making_research_agenda.md
    ├── RESEARCH_BRIEF.md
    ├── business_journeys_map.md
    ├── channel_compliance_matrix.md
    ├── escalation_sla.md
    ├── findings_facebook.md
    ├── findings_grok_x.md
    ├── findings_logistics_wismo.md
    ├── findings_reddit.md
    ├── findings_scheduling_feedback.md
    ├── gaps_beyond_rant.md
    ├── global_market_readiness.md
    ├── public_signal_source_map.md
    ├── research_owner_stakeholder_journeys.md
    ├── smb_vs_corporate_scaling.md
    ├── wa_compliance.md
    └── why_situation_model_holds_both_commercial_and_non_commercial_relationships.md
```

## Areas and responsibilities

### Orientation and product context

- `README_FIRST.md` explains the overall approach, the current product placeholder name, and the Cloudflare-first way of thinking.
- `Product_Vision.md` records the intended product direction and business context.
- `three_level_framework/` defines the design process and how we work through it:
  - `3_level_framework.md` — the framework itself:
    - **Level 1:** frame and expand the problem.
    - **Level 2:** develop conceptual solutions without choosing technologies.
    - **Level 3:** select the technology stack to implement the chosen concepts.
  - `level2_method.md` — the method we apply when working through a Level 2 category: establish the status quo first, mine the knowledge base before re-deriving, work with Swaraj's raw thought, and get an explicit readiness go before writing files.
  - A Level 3 method file will be added when we reach Level 3. Its contents are not yet known.
- At the project root there are two **constitution files** alongside `conversation with swaraj.md`:
  - `status_quo.md` — the method for establishing the standing state at the start of a chat (read the current knowledge base and reconstruct where things stand; it is a method, not a running snapshot).
  - `handoff_prompt.md` — the method/template for writing handoffs at the end of a chat so continuity survives a new chat (it is a constitution, not a single handoff). Per-batch handoffs are written by applying it.
- `STRUCTURE.md` describes how this knowledge base is organised.

### Level 1 — Problem framing

`Level1_Problem_Framing_or_Expansion.md` contains the broad questions and analysis needed to understand the problem before designing a solution. It covers the problem domain, actors, interactions, boundaries, responsibilities, constraints, failure modes, and scaling dimensions.

### Level 2 — Conceptual solution questions

`Level 2/` contains solution-oriented questions organised by problem area. The `gathering_information/` subfolder focuses on how the system builds the current, traceable information context needed for a decision. Its eight questions cover:

- required information;
- ownership;
- information locations;
- retrieval priority;
- unnecessary information;
- currentness;
- gradual arrival;
- and information that changes during analysis.

The `communication/` subfolder focuses on how Tend expresses a selected next behaviour to an actor. It covers:

- when communication creates useful progress;
- when Tend should wait instead of communicating;
- when Tend should ask for information instead of acting;
- when and how Tend should explain its reasoning;
- how explanations should vary by recipient;
- how communication should differ according to the actor's responsibility;
- how uncertainty should be communicated; and
- how conflicting information should be communicated.

This category remains technology-neutral. Channel-specific rules, transport mechanisms, channel delivery behaviour, and other implementation details belong to Level 3.

The `understanding_the_situation/` subfolder focuses on how the system understands a customer’s situation, including:

- ambiguity and uncertainty;
- what the customer is actually asking;
- which information is relevant;
- whether messages and conversations belong to the same situation.

The `trust_and_evidence/` subfolder focuses on how Project X evaluates and structures claims before exposing them as evidence to the reasoning model or using them in a business decision. It covers:

- deterministic evidence evaluation;
- confidence and explanation without quantitative scores;
- comparison and conflict detection;
- conflict resolution and workflow blocking;
- human presentation and approval;
- source authority; and
- the distinction between observations, claims, interpretations and decisions.

The `decision_making/` subfolder focuses on how Project X selects its own next behaviour for the current situation. It does not decide the business’s final outcome and it does not enforce authorization. It covers:

- what information is sufficient for a Project X behaviour;
- whether Project X can select the next behaviour;
- which behaviours may be automated;
- when human involvement is needed;
- how business policy constrains behaviour;
- how uncertainty influences behaviour without a universal confidence score;
- how policies and approval rules are represented conceptually;
- and how Project X behaviour remains consistent.

The folder also contains a conversational record of the brainstorming that clarified this boundary and identified later research.

The `authority_and_ownership/` subfolder focuses on how the business grants, enforces and ends delegated authority for Tend, and on who answers for an action. It covers:

- ownership of information, decisions and actions, kept separate from source, truth and permission;
- the delegated-range boundary model: Tend acts freely inside its granted range, never above the delegator;
- when Tend may act and when it must ask or escalate;
- approval at grant time versus approval at execution time;
- why Tend does not hold an "override" capability;
- accountability after automated actions, resolved through the grant;
- role change, delegation and the end of a grant; and
- the hard, unbreakable product invariant line that even configuration cannot cross.

The category absorbs the delegation and role-change questions that previously sat under "Business View and Authority", while the owner's snapshot of the business journey stays with observation and explanation. The folder contains a conversation record preserving the correction that separated business rules (configurable) from product invariants (behaviour, unbreakable), and the knowledge-versus-behaviour contrast that reconciles learning with fine-tuning. It also carries research on Tend's default authorization range for a fresh small business (`default_authorization_range_research.md`), which grounds the default set recorded in `who_may_grant_authority_and_what_comes_by_default.md`.

The `human_collaboration/` subfolder focuses on how Tend manages human participation and responsibility across business journeys. It covers:

- when human participation is needed;
- routing to the correct person, role, group, queue or partner;
- multiple people working on one situation;
- avoiding unnecessary interruption;
- handoff and transfer;
- ongoing ownership and accountability;
- non-response and escalation; and
- unavailability, coverage and delegation.

The category includes customers, prospects, employees, owners, partners, investors, regulators and other interested parties. It does not define business policy, legal consent, authorization enforcement or the business outcome.

The folder also contains a conversational record of the correction that broadened Human Collaboration beyond internal employee work and the research that clarified acknowledgement, stakeholder participation, handoff, escalation and corporate scaling.

The `memory_and_knowledge/` subfolder focuses on what Tend retains, what becomes reusable business knowledge, and how Tend learns to improve its own operation without changing business rules. It covers:

- conversation history and situation history;
- long-term business knowledge;
- Tend's own experiences, mistakes and corrective lessons;
- automatic learning and optional manual validation;
- memory scope and business isolation;
- semantic identity, references, reconciliation and versioning;
- conceptual storage responsibilities;
- retrieval and situation-phase-specific context assembly;
- outdated knowledge, correction and retirement; and
- evaluation of whether learning actually improves behaviour.

This category deliberately separates the logical shape of memory from the technology used to store it. Project X may have graph-shaped references without requiring a graph database. Level 3 will decide how the conceptual responsibilities are implemented.

The category also contains a conversation record preserving the correction that learning means Tend improving its own interpretation, tool use, reasoning and operational understanding, while business rules, authority, permissions and source ownership remain outside learning.

The `coordination/` subfolder focuses on how a situation that involves several actors, systems and pieces of work stays coherent and alive over time. It covers:

- how independent actors work together through the shared situation record;
- long-running work and how a situation keeps re-entering the decision loop;
- the states running / waiting / blocked / completed and what "still active" means;
- how waiting is represented (the shared wait spine with Time);
- how blocked work is represented after escalation is spent;
- how multiple business processes interact through the situation graph;
- why duplicated work is prevented structurally; and
- how interrupted work is recovered from durable records.

The `time/` subfolder focuses on how Tend reacts when time changes the situation without any actor acting. It covers deadlines, the response promise versus resolution promise, scheduled work, the representation of waiting, automatic ends of waiting, and the situation-level check-in that makes forgotten work impossible. It deliberately shares the wait spine, its definitions and the three wait levels (tool/operation, situation, time/scheduled) with the Coordination category, so the two categories do not maintain two different models of waiting.

The `prompt_constitution/` subfolder holds the pre-architecture decision on the model's standing text (§4A item 13b; full reasoning in study Part 14). It covers the four text layers (universal core, stage constitutions, runtime-injected business preferences, memory-owned assembly templates), their owners and lifetimes, the rule that deterministic rules never enter text, the writing discipline (case-general principles, positive alternatives over prohibitions, short per stage), and the prompt-optimizer boundary (memory-owned assembly text only, constitution permanently human territory).

The `failure/` subfolder focuses on how Tend recognises when a wait can no longer resolve, sorts a recognised failure (rush versus can-wait), and recovers without repeating the same action forever or bending the safety invariants. It covers:

- how a wait becomes a declared, recorded failure (the bound) and how failure differs from uncertainty;
- the recovery moves: tool-layer retry, idempotency or polling for unconfirmed effects, handoff to a person, and the safe-hold;
- triage by responsibility, then consequence, then severity tier, then promise;
- how Tend keeps working honestly when only part of the system is unavailable; and
- the safety floor that stays true while recovering.

The `explainability_and_observation/` subfolder focuses on who can see the durable record, at what depth, and how the system watches itself through it. It covers:

- trace always, explain on demand — every important action preserves a reason record; delivery stays audience-dependent (Communication's rules);
- capability-absent as a declared, non-failure conclusion that also doubles as product signal;
- the always-visible business baseline (event-aware situation-level artifacts, plus a business-value view; never operational metrics);
- the administrator/configurator's default set: configuration, grants and approvals, audit trail, masked traces with reasoning summaries but no internal chain-of-thought;
- reconstruction of finished situations as viewer-dependent rendering (linear for business viewers, graph for builders) of records that already exist;
- the observer as a first-class responsibility emitting observation events onto the shared event fabric, watching both hulls — provider model drift and harness behaviour;
- five anomaly classes with scope-based routing into situation models, Failure triage and traces.

The `journey_and_lifecycle/` subfolder focuses on how Tend represents the person against the situation graph. It covers:

- the commercial lifecycle (lead → prospect → customer → returning customer), while preserving Product Vision's three user-facing stages after classification;
- the person-level journey as a derived projection, not a stored record;
- the "unknown first, tag later" rule for every new actor or event, whether it comes from a contact, business instruction, system, partner, or external agent;
- stakeholders (non-commercial relationships) held as situations with an obligation/ask ribbon, not as a lifecycle;
- bounded follow-up / nurture / business-directed outreach versus unbounded prospecting (the former can be in scope when purpose, authority, privacy, and channel rules allow it; the latter is not Tend's default responsibility);
- and pointer documents that reuse Understanding-the-Situation (splitting) and Coordination/Time (waiting) instead of re-writing them.

The `meetings_and_human_work/` subfolder focuses on choosing a person to meet and keeping a reserved human time honest. It covers:

- the meeting as a wait on the shared Coordination/Time spine — a decision, then a wait whose subject is people and a date, then the outcome as human work — via `the_meeting_as_a_wait_spine_bridge.md`;
- eligibility, calendared availability and each participant's expressed intent intersecting into a real slot ("free on the calendar is not genuinely available");
- intent gathered once and booked inside, with stored, expiring, override-able employee preferences (absolute-and-inform for routine, check-first for decision points);
- the two counter-floors (story = re-express intent before re-booking; person = the repeat-booker guard that escalates to a senior), both derived from recorded meeting events, never a silent rejection;
- a terminal meeting escalation to the senior, with the senior's own inaction still surfaced through the owner/Failure machinery;
- and reuse of Human Collaboration (responsibility target, ownership, escalation) and the external-partner case.

The `business_view_and_observation/` subfolder focuses on the aggregate owner snapshot and the owner-attention filter. It covers:

- the derived cross-situation owner view (active assignments and situations, prospects, buyers close to deciding, stuck orders, at-risk relationships, deadlines, what needs the owner);
- artifacts that let the owner search and drill into autonomous work without opening each situation as a chat;
- the owner-attention filter (decisions only the owner can make, owner-risking deadlines/notices, escalations that drifted past delegated people);
- the layered risk computation (deterministic base + LLM suggestions that land on a deterministic rule);
- and a pointer that reserves the per-situation visibility baseline in Explainability and Observation.

The `channels_and_permissions/` subfolder focuses on what a business may send on each channel and what each person may see. It covers:

- a channel-agnostic core with a communication-manager adapter layer (channel is transport, not business logic); a fallback lane always exists and an absent channel is a visible, first-class gap, never a refusal;
- consent and initiation are directional — an active conversation and an employee may have different gates from a business-initiated contact; every initiated external message is checked against purpose, authority, consent/lawful basis, privacy, and the channel window;
- reply stays in the current channel; starting a message follows an ordered, gated sequence (preferred → template+consent → email → human/wait); a channel window is a wait on the shared Coordination/Time spine;
- employee reachability = a reachability preference + a guaranteed fallback lane;
- and actor visibility as Path 2 — pre-written role/partner scopes with a narrow default, a governed "widen within legal limits" white-list zone, and business assignment of seats and partners (default narrow by law; legal floor carries to Compliance & Security).

The `growth_and_evolution/` subfolder focuses on how new things become part of Tend and how Tend changes without breaking existing businesses. It covers:

- a capability as one purposeful action a business switches on from a pre-built catalogue (a connectors menu), with one join lifecycle for systems, channels, policies and workflows — request → evaluate → author → contract → validate → test → enable → monitor → retire;
- capability authoring as product-team work over connector tool definitions, with no LLM-led auto-integration;
- a typed configuration registry — the business fills values and assignment, the product pre-writes schemas and legal bounds, and the core/config boundary test is "if a knob needs core change, it was mis-categorised";
- the change-semantics spine: facts live; platform rules live + interrupt (fallback absorbs); grants live; business policies and workflows pinned at situation open with notice and deliberate human migration;
- and an absent capability as a visible, first-class gap (a build signal), never a refusal.

The exact legal values carry to Compliance & Security; connector transport carries to Level 3.

The `compliance_and_security/` subfolder holds the Level 2 category for every rule Tend must obey and every way the product must stay safe. It covers:

- compliance as one folder holding every rule source — the government's rules (DPDP, GDPR, CAN-SPAM), the platforms' rules (WhatsApp windows/templates, Telegram, email spam laws), the buyers' rules (SOC 2, ISO 27001, questionnaires), and any future rule kind;
- the actor-by-actor and component-by-component compliance map (what data flows, who made the rule, what Tend must mechanically guarantee);
- the security spine — the model proposes, a deterministic control layer decides — with the control plane (verified identity → immutable shop context → policy decision → execute → append-only audit);
- three new product invariants added to Level 1 §8: no cross-business data visibility, model proposals never authorised by the model, model output is data never instructions;
- the list of what can never be left to the LLM (the deterministic list), and two test suites (T-A isolation, T-B injection) that must stay red if a control breaks;
- the security audit framework: five moments (design, implement, review, release, operate) plus the two natural-language audit prompts the founder runs with an agent;
- the formal-audit sequencing decision: pentest + security packet now; SOC 2 Type I only when a named buyer or an unanswered questionnaire demands it; Type II only when a repeatable ICP requires it;
- the SDLC process for building with agentic coding tools (standing rules, review gates, release gates, TypeScript-specific defences).

The evidence base lives in `research/`: `security_and_compliance_research_record.md` (verified facts, reported figures, named incidents, practitioner consensus vs hype) and the three raw Grok transcripts (breadth taxonomy, tenant-isolation/LLM deep dive, social chatter).

These documents should remain technology-neutral. Technology choices belong to Level 3, which is not yet represented as a dedicated folder here.

### Research

`research/` contains evidence, findings, maps, and analyses that inform product decisions. It includes research briefs, customer and business journeys, channel and compliance considerations, escalation expectations, market readiness, scaling comparisons, and findings from public sources and specific channels. Newer files also include the business-owner/stakeholder research run for the Journey and Business View categories (`research_owner_stakeholder_journeys.md`), which separates the breadth pass (Grok social mining) from the depth pass (published figures), plus a concept document on why the situation model holds both commercial and non-commercial relationships. The Compliance and Security batch added `security_and_compliance_research_record.md` — the verified-facts / reported-figures / named-incidents evidence record — plus three raw Grok research transcripts (`security_taxonomy_grok_breadth_transcript.md`, `security_tenant_isolation_and_llm_deep_dive_transcript.md`, `security_social_chatter_grok_transcript.md`).

Research supports the framework but does not replace the problem-framing or solution documents. When research changes an assumption or exposes a new problem, update the relevant framework document as well.

## Recommended reading order

1. `README_FIRST.md`
2. `Product_Vision.md`
3. `three_level_framework/3_level_framework.md`
4. `Level1_Problem_Framing_or_Expansion.md`
5. Relevant documents under `Level 2/`, including the category overview before its individual questions.
6. Relevant supporting material under `research/`

## Organisation guidelines

- Keep top-level documents focused on orientation, product context, and the design framework.
- Add new Level 2 documents under the most specific problem-area folder available.
- Add evidence and exploratory findings under `research/`.
- Keep Level 2 documents conceptual and technology-neutral.
- Use descriptive lowercase filenames with underscores for question- or topic-based documents.
- Update this file when a new top-level area or a meaningful subfolder is added.
