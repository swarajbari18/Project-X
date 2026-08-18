# Knowledge Base Structure

This folder contains the product knowledge and system-design thinking for Project X (currently referred to as **tend**). The material is organised from broad product context to problem framing, conceptual solutions, and supporting research.

## Directory tree

```text
knowledge_base/
├── README_FIRST.md
├── Product_Vision.md
├── 3_level_framework.md
├── Level1_Problem_Framing_or_Expansion.md
├── STRUCTURE.md
├── Level 2/
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
│   └── understanding_the_situation/
│       ├── how_do_we_recognise_ambiguity_and_uncertainty.md
│       ├── what_does_it_mean_to_understand_what_a_customer_is_actually_asking.md
│       ├── how_do_we_determine_which_information_is_relevant_to_the_current_situation_and_which_information_should_be_ignored.md
│       └── how_do_we_determine_whether_multiple_messages_belong_to_the_same_situation_and_whether_two_seemingly_different_conversations_are_actually_related.md
└── research/
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
    ├── smb_vs_corporate_scaling.md
    └── wa_compliance.md
```

## Areas and responsibilities

### Orientation and product context

- `README_FIRST.md` explains the overall approach, the current product placeholder name, and the Cloudflare-first way of thinking.
- `Product_Vision.md` records the intended product direction and business context.
- `3_level_framework.md` defines the design process:
  - **Level 1:** frame and expand the problem.
  - **Level 2:** develop conceptual solutions without choosing technologies.
  - **Level 3:** select the technology stack to implement the chosen concepts.
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

The `understanding_the_situation/` subfolder focuses on how the system understands a customer’s situation, including:

- ambiguity and uncertainty;
- what the customer is actually asking;
- which information is relevant;
- whether messages and conversations belong to the same situation.

These documents should remain technology-neutral. Technology choices belong to Level 3, which is not yet represented as a dedicated folder here.

### Research

`research/` contains evidence, findings, maps, and analyses that inform product decisions. It includes research briefs, customer and business journeys, channel and compliance considerations, escalation expectations, market readiness, scaling comparisons, and findings from public sources and specific channels.

Research supports the framework but does not replace the problem-framing or solution documents. When research changes an assumption or exposes a new problem, update the relevant framework document as well.

## Recommended reading order

1. `README_FIRST.md`
2. `Product_Vision.md`
3. `3_level_framework.md`
4. `Level1_Problem_Framing_or_Expansion.md`
5. Relevant documents under `Level 2/`
6. Relevant supporting material under `research/`

## Organisation guidelines

- Keep top-level documents focused on orientation, product context, and the design framework.
- Add new Level 2 documents under the most specific problem-area folder available.
- Add evidence and exploratory findings under `research/`.
- Keep Level 2 documents conceptual and technology-neutral.
- Use descriptive lowercase filenames with underscores for question- or topic-based documents.
- Update this file when a new top-level area or a meaningful subfolder is added.
