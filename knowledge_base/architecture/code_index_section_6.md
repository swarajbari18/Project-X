# Code index for Section 6 (agent-only)

This file is for agents. It is not meant to be read in the rendered view. Every code used in `section_6_responsibility_model.md` appears here, with its plain meaning, its source in the knowledge base, and its status.

**Status values**
- **Decided:** the knowledge base settles it. The source is named.
- **Provisional:** the source leans one way, but it is not final.
- **Open:** the knowledge base does not settle it. The file lists it under Open questions.
- **Architecture-only:** the rule was written during construction, and no Level 2 source has been found.

Level 2 governs. Where Level 2 disagrees with another source, Level 2 wins. The agent harness study is absolute unless Level 2 disagrees with it. The Product Vision applies where Level 2 is silent. The research folder and Level 1 are inputs. Disagreements that remain are written down and sent to Swaraj; they are not chosen silently. The architecture files are not sources.

---

## Situations and links (A)

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| A1 | One operational problem is one versioned situation record. | Product Vision (line 367); Understanding; Coordination | Decided |
| A2 | One situation is one operational problem with one resolution path. | Understanding (split early) | Decided |
| A3 | Situations link by operational context, causal follow-on, and typed references. Never by shared identity alone. | Understanding; Journey graph | Decided |
| A4 | One message with distinct asks becomes distinct situations. | Understanding | Decided |
| A5 | Related situations link without merging their models. | Understanding | Decided |
| A6 | A situation closes for good when its problem is done. | Coordination | Decided |
| A7 | A genuinely new problem is a new situation, linked to closed ones. | Coordination; how_do_we_recover_interrupted_work | Decided |
| A8 | Reopen only when the same operational problem is not actually finished. A new problem is always a new situation. Closed situations are looked at only when the message explicitly refers to them. The exact form of the "reopened" flag is open. | Level 2: how_do_we_determine_whether_multiple_messages_belong_to_the_same_situation (lines 1019–1046, 1090–1094). Harness line 1073 ("never reopened") conflicts; Level 2 governs, as Swaraj directed. | Decided (rule); Open (flag form) |
| A9 | Closure records the outcome on the situation. Tend records how the situation went; it does not decide whether the customer buys or keeps a refund. | Product Vision; Coordination | Decided |
| A10 | The person's journey is a projection (worked out on demand) over the identity link, the situations, and time. Not stored. | Journey: how_is_the_person_level_journey_derived_from_the_situation_graph | Decided |
| A11 | A new contact starts as "relationship unknown" and is refined with evidence. | Journey conversation record | Decided |
| A12 | The customer's stated ask is kept separate from the inferred operational problem. | Understanding (stated versus real problem) | Decided |
| A13 | Lead, prospect, and customer are kept apart. A prospect has never done business. A customer has a paid order, per the business rule. The paid-order rule is configuration. | Level 2: how_should_tend_represent_the_difference_between_a_prospect_a_customer_and_a_returning_customer (lines 11–13) | Decided (stages); Open (configuration) |
| A14 | Each person is an identity-bearing anchor with a person ID; channels point to it; new contacts start unknown; no AI decides two records are one person. | Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops D1; Journey conversation (identity-bearing anchor); Swaraj 2026-10-28 ("some sort of a unique ID, not a WhatsApp number") | Decided (Swaraj, 2026-10-28) |
| A15 | Memory and knowledge creates and maintains links. Shared number or incident code from records = link; meaning only = proposed and unresolved until a signal; an employee may remove a link. Replaces 2026-10-09 (worker accepts or denies). | Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops D2; Swaraj 2026-10-28; Level 2 reconciliation (LLM proposes, system reconciles); Understanding (no link until a signal) | Decided (Swaraj, 2026-10-28) |

## Routing (B)

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| B1 | Events arrive from messages, instructions, systems, agents, and time. | Level 1; Product Vision | Decided |
| B2 | Each event is routed to the right situation, or creates one, before any business gathering. | Understanding (route before gather) | Decided |
| B3 | Tiered routing: a hard match attaches or creates; a soft match asks, never guesses. | Understanding | Decided |
| B4 | Routing is corrected by split, merge, or reroute when later evidence shows it wrong. Two phases: on arrival (identify, match, attach/create/hold) and after evidence (split/merge/reroute). | Understanding; Level 2 routing ownership | Decided |
| B5 | The conversation manager understands each change (its reading) before it routes; routing works from the reading and uses typed-field summaries of open situations; the full update of a routed situation comes after routing; memory and knowledge's packages arrive before the reading (R1), after it (R2), and before the check when the AI chose (R3). | Swaraj 2026-10-29; Understanding (ambiguity §9; relevance; 2026-09-04 MEANING note); Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops A2, F2 | Decided (Swaraj, 2026-10-29: understanding first; working decision in Level 2) |
| B6 | One list instruction creates one situation per person and one central situation linked to all of them; every update goes to the central situation; the owner hears only what is significant. No board. | Swaraj 2026-10-28; Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops D4; Journey (one situation per person) | Decided (Swaraj, 2026-10-28) |
| B7 | Ingest records carry platform references. Platforms keep canonical messages. | Understanding (data categories) | Decided |
| B8 | When unclear, prefer separate situations with a link over a silent merge. | Understanding (routing) | Decided |
| B9 | A soft routing records a held attachment without a confident model update. | Understanding (routing) | Decided |
| B10 | One routing run per person at a time, keyed by the person ID found from the channel address; two channels of one person share one queue. (Was: per channel address, 2026-10-28.) | Swaraj 2026-10-28 ("some sort of a unique ID, not a WhatsApp number"); Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops F2 | Decided (Swaraj, 2026-10-29: understanding first; working decision in Level 2) |

## Understanding (C)

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| C1 | Routed situations are updated with what the event adds, before acting. | Understanding | Decided |
| C2 | Ambiguity and uncertainty are represented explicitly. | Understanding (ambiguity) | Decided |
| C3 | Only information relevant to the situation is selected. | Understanding (relevance) | Decided |
| C4 | Observations, claims, interpretations, and decisions are kept apart. | Trust and Evidence; Understanding | Decided |
| C5 | Unresolved points are classed by what they block: which situation, what is wanted, what information is needed, or who is responsible. Ask about the smallest unresolved field. | Harness: ask when the answer could change the situation, the want, the required information, or the responsible person (line 600). Replaces the earlier ambiguity list. | Decided |
| C6 | "Communication answered" is separate from "operationally resolved." | Understanding (routing) | Decided |
| C7 | Tend understands each change before it acts on it, routing included. | Product Vision ("Understand before acting"); Level 1 (a customer starts a conversation); Understanding (ambiguity §9; relevance); Swaraj 2026-10-27, 2026-10-29 | Decided (Swaraj, 2026-10-29: understanding first; working decision in Level 2) |
| C8 | The conversation manager writes a reading of each arrival with words: asks, what it refers to (time words resolved), claims, unknown, earlier work, kind, not work; an interpretation, saved with the arrival. | Understanding (2026-09-04 MEANING note); harness Part 6 and 12.4; Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops A4 | Decided (Swaraj, 2026-10-29: understanding first; working decision in Level 2) |
| C9 | An arrival that is not work creates no situation; it is kept on the person's timeline with its reading. | Understanding (relevance: "a real new problem becomes a new independent model"; "ignored is not deleted"); harness Part 6 ("not work → no situation") | Decided (Swaraj, 2026-10-29: understanding first; working decision in Level 2) |
| C10 | The worker understands new content (an arrival into a situation with content, a document, a free-text result) before it plans or decides; a new situation's reading is its first understanding. | Swaraj (Cursor transcript: "the first thing it is doing is trying to understand the situation"); Understanding and Gathering ("Understanding then incorporates that result"); Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops F1 | Decided (Swaraj, 2026-10-29: understanding first; working decision in Level 2) |

## Gathering (D)

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| D1 | Identify what information could change the next safe step. | Gathering Q1 | Decided |
| D2 | Know which actor (system or person) holds each piece of information. | Gathering Q2 | Decided |
| D3 | Keep a map of where information lives. | how_do_we_discover_where_information_lives | Decided |
| D4 | Retrieval follows context: domain meaning, source selection, then priority order (authority, currency, consequence, human cost, unblocking). | Gathering Q4; how_do_we_prioritise_which_information_to_retrieve_first | Decided |
| D5 | Gradual arrival and mid-analysis change update the model. | Gathering Q7–8 | Decided |
| D6 | Business capabilities are invoked when they are the right source. | Product Vision; harness | Decided |
| D7 | Gather results are saved with pointer and time. Tend does not replace the ERP as master. | Understanding (data categories) | Decided |
| D8 | Before retrieval, match the ask to a source (system or person). If neither can serve it, record capability-absent: not failure, not guess. If a person can serve it, open human work. | Gathering map; Explainability D2 | Decided |

## Trust and evidence (E)

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| E1 | Claims are structured propositions with provenance. | Trust and Evidence | Decided |
| E2 | Evidence is evaluated by fixed code, by source authority and rules. The model does not decide truth. | Trust and Evidence | Decided |
| E3 | Uncertainty is structural (evidence states, reasons, unknowns). No fake numeric model confidence. | how_do_we_represent_confidence_without_pretending_certainty | Decided |
| E4 | Conflicting information is identified and kept visible. | Trust and Evidence | Decided |
| E5 | Conflict order: (1) fixed business or domain rule; (2) newer valid claim or source correction; (3) more evidence; (4) a person. Keep open; take only bounded steps the policy allows. | how_do_we_resolve_conflicts, resolution order (lines 75–85) | Decided |
| E6 | Facts and assumptions are distinguished; assumptions update on new evidence. | Trust and Evidence | Decided |
| E7 | Evidence from fallback or a stale substitute is marked stale or partial, with reason. Irreversible paths fail closed. Replaces "degraded" (not in the harness state list). | Failure partial-unavailability; harness state list (line 1361) | Decided |
| E8 | Action-specific blocks, from evidence state and consequence. | Trust stop-workflow | Decided |
| E9 | Progress counts only when the recorded state changed for one of five reasons: evidence changed; a needed claim came from a source not yet asked in this wake; a wait was written, refreshed, or finished; an outcome was declared; a permission changed. The model's own report never counts. | Confidence Fork C; harness line 1262 ("in this wake") | Decided |

## Decisions (F)

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| F1 | Select the next behaviour for the current situation. | Decision Making map | Decided |
| F2 | The model proposes; the system owns timers and state. | Decision Making | Decided |
| F3 | Continue within the granted range without per-step user prompts. | Decision Making; Product Vision | Decided |
| F4 | Stop safely when there is no safe path. | Failure; Decision Making | Decided |
| F5 | Decide "enough information" relative to policy and consequence. | what_does_enough_information_mean | Decided |
| F6 | After the model proposes, invoke the permission control (Group T, especially T2). The model cannot authorise itself. | Authority; Decision Making; Compliance | Decided |
| F7 | Decide on the newest version; re-check the version just before an irreversible action. | Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops F1 | Decided (working decision in Level 2, written 2026-10-28 on Swaraj's instruction) |
| F8 | Deciding is checking the work against what was first asked, with evidence pointers; fixed code rejects an unsupported "answered". | Swaraj 2026-10-27 ("the process of decision… is self reflection itself"); Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops F3 | Decided (Swaraj, 2026-10-28) |

## Permission to act (G)

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| G1 | Act only inside the delegated grant range. Tend is an agent, not the principal. | Authority | Decided |
| G2 | Ask for approval when outside the grant, or when the grant requires an approver. | when_must_tend_ask_for_approval | Decided |
| G3 | Never widen permissions past the delegator and owning systems. Tend only reduces access. | Authority research | Decided |
| G4 | Refuse honestly, with an escalation path. | Refusal doc | Decided |
| G5 | The grantor stays answerable for actions taken under the grant. | Authority | Decided |
| G6 | Product invariants (rules that must always hold) are enforced below the configurator. | Authority conversation | Decided |
| G7 | Grants and registry writes only through the configurator's deterministic tools. | the_business_configuration_capability | Decided |
| G8 | Effective permission = grant ∩ owning-system permission ∩ invariants. | Authority research; Compliance | Decided |
| G9 | Bind each wake or request to a verified person through the identity-to-permission join. | how_do_identity_and_authority_join | Open (the join is still open in the authority research) |

## Coordination and time (H)

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| H1 | Situations stay alive through durable, versioned records. Running, waiting, blocked, or completed. | Coordination | Decided |
| H2 | Each wait records seven things: subject, reason, timing class, resume trigger, release policy, escalation path, visibility. | how_do_we_represent_work_that_is_waiting (lines 46–54). The earlier four-field list is replaced. | Decided |
| H3 | Waiting and blocked are different. Inside the bound, a stale API is a wait; past it, failure is declared. Blocked means no safe escalation remains. | Coordination; Failure; how_do_we_represent_work_that_is_blocked (lines 5, 11–12) | Decided |
| H4 | Wakes come from messages, system change, human answer, agent result, or time. | Coordination; Time | Decided |
| H5 | Duplicated work is prevented by structure. Two people do not both refund. | Coordination; Human Collaboration | Decided |
| H6 | Interrupted work is recovered from the latest durable state. | how_do_we_recover_interrupted_work | Decided |
| H7 | Nurture continues the same situation when the rules allow. | Journey (follow-up versus outreach) | Decided |
| H8 | The book of waits is the subscription registry. No situation-level polling. Checks inside a tool are bounded. | Coordination; harness Part 14. Polling is never done in the harness. A separate polling service runs polling jobs (Swaraj's direction, recorded in Section 7 on 2026-10-09). | Decided (harness never polls; separate polling service); Open (number of status calls) |
| H9 | Situation version and announcement are saved as one unit. | Harness Part 14, Decision 1; time conversation line 108 | Decided |
| H10 | On a timer wake, re-read the latest version before any outgoing decision. | Time; Section 7 IB-1, IB-4 | Decided |
| H11 | Two clocks: the customer-facing clock pauses while the customer is released; the internal clock keeps running with its own escalation. | time/understanding_all_time_questions.md (lines 54–57); time_conversation_and_discoveries (Zoho versus our decision) | Decided |
| H12 | After use, Tend waits the business-chosen time before asking for feedback. | Product Vision (business decides how long to wait after receipt). The "2 weeks" default in the research is not adopted. | Decided (rule); Open (default) |

## Communication (I)

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| I1 | Express a material change to the person who should hear it. No default receipt-style message. A business may configure its own acknowledgement wording. | Communication map; 2026-09-25 ruling; harness line 1251 | Decided |
| I2 | Send only what the recipient may see. | Communication; Channels | Decided |
| I3 | Wait when a message would be premature, misleading, unnecessary, or unsafe. The harness list has more reasons (unsupported, duplicative, recipient responsibility, business authority); those are recorded as additional reasons, not the core rule. | when_should_tend_wait (line 5); harness line 1355 | Decided (core); Provisional (extra reasons) |
| I4 | Ask when a reference or information is missing. | Communication; Understanding | Decided |
| I5 | Explanation depth fits the role. | Explainability | Decided |
| I6 | Communicate uncertainty and conflict honestly. | Uncertainty and conflict communication docs | Decided |
| I7 | Record communication intent on the situation. The communication layer shapes, checks, and sends. The worker does not send. (Architecture term "membrane" = the communication layer.) | Communication map; harness lines 520–525 | Decided |

## Human collaboration (J)

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| J1 | Make the need for a person explicit when the next safe step needs one. | Human Collaboration | Decided |
| J2 | Nine kinds of involvement: subject; provides information; confirms or acknowledges; authorises access or action; approves a business decision; performs work; accountable for work; consulted; only informed. | when_should_tend_involve_a_person (lines 44–54) | Decided |
| J3 | Route to the right person, role, queue, or partner. | Human Collaboration; Meetings Q6 | Decided |
| J4 | One responsible party per work item at a time. The party can be a person, role, team, or queue. | how_do_we_represent_ownership_of_ongoing_work (line 28) | Decided |
| J5 | Name the kind of silence before the next step. Seven kinds: not delivered; delivered not acknowledged; acknowledged no progress; rejected; unavailable; completed not recorded; unnecessary. Silence is never completion. | what_happens_when_nobody_responds (lines 15–23) | Decided |
| J6 | Record the human result and re-enter the decision loop. | Human Collaboration lifecycle | Decided |
| J7 | Unavailable is not non-responsive. Coverage or delegation applies before blind escalation. | Human Collaboration Q8; what_happens_when_the_responsible_person_is_unavailable | Decided |
| J8 | Transfer work with full context; notification is pending until acceptance. | how_do_we_transfer_work_between_employees (lines 31–35) | Decided |
| J9 | Verify substitute permission before any irreversible action on transferred or covered work. Coverage does not imply unlimited permission. | what_happens_when_the_responsible_person_is_unavailable (line 49: authority is never transferred with work); default authorisation research | Decided |

## Meetings and partners (K)

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| K1 | A meeting is an invitation plus a wait on people and a date. | Meetings spine | Decided |
| K2 | Book inside eligibility, calendar, and expressed intent. | Meetings Q2 | Decided |
| K3 | Record cancel, miss, and reschedule as meeting events. | Meetings Q3 | Decided |
| K4 | Partner contact only when escalation requires it, and only when the business policy allows it. Scoped payload only. | how_should_an_external_partner_be_contacted_when_the_business_has_not_acted (lines 13, 17–19) | Decided |

## Channels and visibility (L)

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| L1 | Per-channel rules: initiate, reply, window, template. | Channels Q1 | Decided |
| L2 | Record consent and preferred channel apart from the active thread. | Channels Q2 | Decided |
| L3 | Reply in the current channel; initiate through the gated sequence. The communication layer owns channel choice. | Channels Q3; how_should_tend_choose_between_replying_in_the_current_channel (line 20, 30) | Decided |
| L4 | Narrow default visibility per role. | Channels Q4 | Decided |

## Failure and recovery (M)

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| M1 | Failure is an audited event, never a fifth card state. | Failure spine (harness line 1075; understanding_all_failure_questions line 19) | Decided |
| M2 | Failure is declared when the wait's bound is crossed and the path is unusable. The length is business configuration. | Failure decision 1; how_do_we_recognise_failure (line 11) | Decided |
| M3 | Triage by consequence, severity, and promise clock. | Failure decision 2 | Decided |
| M4 | Retries at the tool layer, with bounded backoff. Never in the model. | Failure decision 3 | Decided |
| M5 | Unknown outcome on an irreversible action: reuse the same key only if the other side honours idempotency, sparingly; otherwise a bounded status check, then a separate polling service runs the bounded checks, card waiting, honest customer message; after the settle window, no auto-redo, hand to a person with the timeline. | failure_conversation_and_discoveries (line 52); how_do_we_recover_after_failures (lines 18–19). Replaces the earlier "same key may be resent if the other side deduplicates" wording, which was unsourced. | Decided (rule); Decided (separate polling service); Open (number of status checks) |
| M6 | Escalate to a human when the automated path is exhausted. | Failure + J3 + K4 | Decided |

## Memory and knowledge (N)

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| N1 | Phase-specific context, not everything memory and knowledge holds. | how_do_we_assemble_context_for_each_situation_phase | Decided |
| N2 | Closed situations inform new ones only through links and relevance. | how_should_previous_conversations_influence_future_decisions | Decided |
| N3 | Learn operational self-improvement per business. Never change rules. | what_kind_of_learning_is_acceptable (pending review in the file); Authority conversation | Decided (pending review) |
| N4 | Episodic experience is kept for audit and learning. | what_should_tend_remember | Decided |
| N5 | Graph-shaped references between memories and situations. | Memory conversation; how_should_memory_be_stored_conceptually | Decided |
| N6 | Traces from work runs and configurator sessions are recorded asynchronously. Recording is not learning activation. The business can switch learning off or require manual validation. | can_tend_learn_automatically (line 16); harness line 1022 | Decided |
| N7 | Candidate lessons come from external failure signals, not self-reflection alone. | how_should_tend_learn_from_its_own_mistakes | Decided |
| N8 | A new lesson is matched by claim family, then added, merged, refined, superseded, kept as conflict, or no-op. Level 2 lists ten operations, and the visible text names the six that apply by default. Which of the ten apply to each memory type is Open. | how_should_new_learning_be_reconciled_and_versioned (lines 43–57); harness line 1022 | Decided (matching a new lesson against existing claims); Open (which of the ten apply per memory type) |
| N9 | Learned items have a lifecycle: active, stale, superseded, conflicting, retired, unresolved. | how_do_we_prevent_outdated_knowledge... | Decided |
| N10 | Automatic learning is checked by replay and regression; harmful lessons are reversed. | how_do_we_evaluate_automatic_learning | Decided |
| N11 | Knowledge served from a context need. The router never scans all situations; fixed code limits every search first. | how_should_memory_be_retrieved; Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops C2 | Decided |
| N12 | Business vocabulary and conventions are business knowledge. | what_belongs_in_long_term_business_knowledge | Decided |
| N13 | Memory and knowledge observes configurator sessions and proposes configuration candidates. A configurator validates. Only the configuration tools apply, after validation. Memory and knowledge never applies a grant change. | the_business_configuration_capability; Growth registry | Decided |
| N14 | Two configuration classes: structured values (schema-bound) and prose preferences (text placed by the runtime at the generating step). The business owns the text; memory and knowledge only places it. | understanding_the_prompt_constitution; harness lines 2092–2099. The harness places preferences under business configuration; this file follows that. | Decided |
| N15 | Business content learning is separate from product behaviour improvement. | Authority conversation (knowledge versus behaviour); observability research | Decided |
| N16 | Provenance, scope, version, and allowed influence on every learned item. What memory and knowledge presents is advisory. | Memory map; Trust and Evidence | Decided |
| N17 | Never store credentials, secrets, or authentication material as business memory. | what_should_never_become_memory; Compliance | Decided |
| N18 | Memory and knowledge runs beside the loops on its own thread, observes every part, and runs slow jobs behind. | Swaraj 2026-10-28 ("two different threads… it will shoot its lagging job"); Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops A1 | Decided (Swaraj, 2026-10-28) |
| N19 | Before each part of a loop, the loop waits for memory and knowledge's package (knowledge or explicit empty); its AI part runs at every point; nothing after a run-ending decision. Points: R1 before the conversation manager's reading; R2 after it, with the candidates; R3 before the check when the AI chose; W0 before the worker understands new content; W1 before planning; W2 before acting; W3 before every decision; C1 before writing a message (C1 here names the communication layer's point, not rule C1). | Swaraj 2026-10-28, 2026-10-29; Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops A1, A2 | Decided (Swaraj, 2026-10-29: understanding first; working decision in Level 2) |
| N20 | Package contents (candidates, context, standing, needed or help, visibility, outside-text flag, totals, not-found); memory and knowledge presents, the step decides. | Swaraj 2026-10-28 ("context engineering, not decision making"); Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops A3 | Decided (working decision in Level 2, written 2026-10-28 on Swaraj's instruction) |
| N21 | Written reasoning has checkable sections: considering, still need to know, questions for memory and knowledge, exact-quote references; the conversation manager's reading adds asks, refers-to (with resolutions cited), time, claims, unknown, earlier work, kind, not work; its choice names a presented candidate or none; the worker's understanding says what new content adds. | Swaraj 2026-10-27 ("JSON structures… check the shape"); Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops A4 | Decided (Swaraj, 2026-10-29: understanding first; working decision in Level 2) |
| N22 | Two fixed parts (routing, worker), exact-key lookups only, including business events and named things by exact name or alias, earlier readings, what was presented earlier, and the sender's situations holding the reading's resolved values; judgment is the AI part's. | Swaraj 2026-10-28 ("different fixed code components… very limiting jobs"); Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops B1 | Decided (Swaraj, 2026-10-29: understanding first; working decision in Level 2) |
| N23 | Retrieval pattern: the step says what, the retrieval capability decides how; fixed filter first (records to the step's boundary; business knowledge from the business's side; the step's understood values as exact filters); exact, keyword, meaning and link searches in parallel; rank fusion; de-duplicate; rerank; fixed governance gate; neighbouring context; search again within a round limit; evidence with sources; no thresholds. | Swaraj 2026-10-28, 2026-10-29 ("we could just make a filter about that"); Creator-joy and J&F research; Level 2 retrieval; Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops C1, C2 | Decided (Swaraj, 2026-10-29: understanding first; working decision in Level 2) |
| N24 | No standing copy of business orders; memory and knowledge presents the tool that reads them. | Decided earlier (no standing copy); Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops C2 | Decided |
| N25 | Three paths for a change between situations: one event written into each (decision 23); a worker's send through intake, keyed, with a per-pair count; a person situation's automatic send to its central situation. Links never carry changes. | Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops D3; Section 12 decision 23 | Decided (working decision in Level 2, written 2026-10-28 on Swaraj's instruction) |
| N26 | Skills (product and business) and procedures in object storage, versioned; skill version read per run and recorded; procedure pinned per situation. | Swaraj 2026-10-28 (object storage, versioned, not shipped with code); Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops B3, D6 | Decided (Swaraj, 2026-10-28) |
| N27 | A business may write skills and procedures and connect any MCP server; configurator connects through a fixed tool; tool list captured, versioned, hashed, changes re-approved; only presented tools usable; permission check always; skill text grants nothing. | Swaraj 2026-10-28; Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops D6; Compliance catalogue integrity | Decided (Swaraj, 2026-10-28) (connection mechanism: Decided (working decision in Level 2, written 2026-10-28 on Swaraj's instruction)) |
| N28 | Memory and knowledge never calls outside; the worker establishes an unknown subject (deep-research skill); memory and knowledge learns it. | Swaraj 2026-10-28; Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops D6 | Decided (Swaraj, 2026-10-28) |
| N29 | Present time in every package; business events are learned knowledge items with aliases, dates, sources, who may be told, validity; an event in an arrival is presented before the reading, by name or alias, and searched across the business's side on first mention; its dates may help any step understand and filter, and are told only to those who may be told them. | Swaraj 2026-10-27, 2026-10-29; Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops D5 | Decided (Swaraj, 2026-10-29: understanding first; working decision in Level 2) |
| N30 | The conversation manager establishes first what an arrival means (its reading, an interpretation); code establishes the sender, the routing check the situation; the worker understands new content and establishes claims; memory and knowledge establishes nothing. (Was: the conversation manager establishes sender and situation only.) | Swaraj 2026-10-27 ("whatever we get, the conversation manager gets, establishing it is first"); Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops D8 | Decided (Swaraj, 2026-10-29: understanding first; working decision in Level 2) |
| N31 | No package: wait a set time, then a person; AI part fails: fixed items only, the step goes on; before the reading, an unresolved word is marked unknown, and if routing's choice depends on it the arrival is held and the sender asked. | Decided 2026-10-22; Level 2 failure ("hold what depends on the dead source"); Level 2 ambiguity; Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops E4 | Decided (Swaraj, 2026-10-29: understanding first; working decision in Level 2) |
| N32 | Packages recorded in the trace as references only. | Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops E6; trace rules | Decided (working decision in Level 2, written 2026-10-28 on Swaraj's instruction) |
| N33 | Background parts: link keeper, indexer, link finder, learner, cleaner; none writes a situation record except a confirmed erasure; a cache never guards a decision. | Swaraj ("multiple types of loop"); Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops B4, Part G | Decided (working decision in Level 2, written 2026-10-28 on Swaraj's instruction) |
| N34 | Using is not showing: memory and knowledge may use the business's own knowledge from anywhere to help a step understand, each item marked with who may be told it; records to act on are limited to the step's boundary (routing: the sender's own records; the worker view rule), set by fixed code before any search; another person's record never shapes a step's understanding, and is never presented or hinted (the 2026-10-03 foreign-reference note is removed, Claude's recommendation that Swaraj allowed). (Was: every search starts with the step's view; routing uses the sender's view.) | Swaraj 2026-10-27 ("some component that can see the whole thing and that can aid him"); Level 2 authority ("Tend may use a confidential source internally"); Channels and Permissions; Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops E1 | Decided (Swaraj, 2026-10-29: understanding first; working decision in Level 2) |
| N35 | Cost: 10 to 23 AI calls before the first reply (10 to 20 before understanding was added); every limit is configuration with a product default. | Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops E5, starting values | Decided (Swaraj, 2026-10-29: understanding first; working decision in Level 2) |
| N36 | Memory and knowledge revisits its own earlier advice at every point, says plainly when it was contradicted or went stale, and notes it for learning. | Swaraj 2026-10-27 ("The memory has to revisit what it has done till now… and audit"); Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops B2 | Decided (Swaraj, 2026-10-29: understanding first; working decision in Level 2) |
| N37 | Routing's candidates come from the reading: its exact values first, description only inside what they leave; when the reading says the arrival refers to a past purchase or earlier work, a small set of the sender's own closed situations (agreed 2026-10-03), never anyone else's; never a search on raw words before the reading; code decides when it can; ambiguous means ask. | Understanding ("closed only when the message explicitly references one"; reopen table); Level 2 previous conversations ("should not be retrieved just because their words look similar"); harness 11.2.2; Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops C2, F2; the 2026-10-03 agreed picture (how_tend_finds_the_right_situation.md: "a small set of his own finished situations") | Decided (Swaraj, 2026-10-29: understanding first; working decision in Level 2) |

## Configuration and change (Q)

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| Q1 | Typed configuration registry: schemas, business values, validation. | how_do_businesses_customise_tend_without_changing_its_core_behaviour | Decided |
| Q2 | Catalogue lifecycle for new capabilities: request, evaluate, author, contract, validate, test, enable, monitor, retire. | understanding_all_growth_and_evolution_questions | Decided |
| Q3 | Four kinds of change: facts live; platform rules live (a platform-rule change wakes open situations; a business-setting change does not; decided 2026-10-09); grants live at point of use; business policies and workflows pinned at situation open, with notice and deliberate migration. | how_do_we_evolve_tend_without_breaking_existing_businesses (lines 9–18, 37, 59). Replaces the harness "read rules fresh at each wake" statement (harness line 2048), which conflicts; Level 2 governs as Swaraj directed. | Decided |
| Q4 | Missing or unsupported configuration is a visible gap, never a silent refusal. | Growth; Channels visible-gap rule | Decided |
| Q5 | Core versus configuration test: a knob that needs a core change was mis-categorised. | Growth Q5 | Decided |
| Q6 | How the person's view joins their situations. | Journey and business view | Open |
| Q7 | The configurator is a role held by the signup owner or an assigned person, working through the configurator's agent, which holds the fixed tools that write grants. Whether that power can be passed to another person is Open. | the_business_configuration_capability (lines 7, 13, 40); who_may_grant_authority (line 16) | Decided (role); Open (delegation) |
| Q8 | Exact schema for matching and merging learned claims. | how_should_new_learning_be_reconciled_and_versioned (line 84 onwards) | Open |
| Q9 | Whether assembly templates and the stage constitution are versioned separately. | Prompt constitution | Open |
| Q10 | Action grammar for the policy check; tenant-context field schema. | Security research (Policy.decide) | Open |
| Q11 | The contracts connecting wait and call rules are not yet listed in one place. | Section 8 walkthroughs and release gates | Open |

## Product improvement (R)

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| R1 | Training-grade traces for product improvement, separate from business memory. | can_tend_learn_automatically (note); harness Part 12 | Decided |
| R2 | Prompt optimisation limited to memory-owned assembly templates. | understanding_the_prompt_constitution | Decided |
| R3 | Behaviour adherence improves from verified traces. Business rules are never in weights. | Authority conversation; observability research | Decided |

## Harness control (S)

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| S1 | Per-wake contract: WAKE, RECOVER, PROPOSE, VALIDATE, EXECUTE, UPDATE, REST. Every wake ends in honest rest. | Harness lines 1136–1179; Section 8 wake table | Decided (principle); Architecture-only (labels) |
| S2 | VALIDATE checks the proposal's shape, its permitted behaviour, and the completion rules (Class 1 and Class 2). Two diagnostic channels: structure and permission. | Harness lines 636–638 (classes); Section 8 §8.4 | Architecture-only (use in VALIDATE) |
| S3 | EXECUTE dispatches one fixed path per behaviour (Fork A and Fork B). | Harness lines 1236–1244, 1150–1175 | Decided (principle) |
| S4 | Atomic truth commit (IB-3, IB-11 pattern). | Section 8 IB rows | Architecture-only |
| S5 | Write-and-announce: a situation change and its event are saved together (H9). | Harness Part 14 | Decided |
| S6 | REST or next round is decided only by the five Fork C reasons. | Harness lines 1256–1266 | Decided |
| S7 | Persist intent before an irreversible side effect. | Adjacent-Tool (Section 8) | Architecture-only |
| S8 | Tools return structured evidence only (IB-7). | Section 8 IB rows; harness line 1270 | Architecture-only (principle decided) |
| S9 | Read the situation record for an earlier attempt before an irreversible post (IB-8). Complements the permission check; does not replace it. | Section 8 IB rows | Architecture-only |
| S10 | Timer wakes go to the situation only (IB-1, IB-4, IB-9). | Section 8 IB rows; time conversation | Architecture-only (principle decided) |
| S11 | Model output is data: schema-validated, never instructions. | Security research | Decided |
| S12 | Dedup repeated events by version or event ID. A repeated event is dropped before PROPOSE. | Section 8 §8.3; Section 6 original | Architecture-only |

## Permission checks (T)

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| T1 | Mint the tenant context once per wake or ingress, from verified identity only. | how_do_we_make_a_software_product_secure (lines 51–53) | Decided |
| T2 | Policy check before every effect: Allow, Deny, or StepUp (a person must approve). Also before any disclosing read. | how_do_we_make_a_software_product_secure (lines 55–57); Authority (a read can be a disclosure, authority file line 41) | Decided |
| T3 | Effective permission checked at decision time (G8). | Authority research | Decided |
| T4 | Enforce before the effect. Never start a tool and then discover a denial. | Compliance (line 38: checked before it runs) | Decided |
| T5 | Read the authoritative grant or policy store at enforcement. A cache never decides. | Compliance; harness Part 14 | Decided |
| T6 | Re-check authorisation at each action boundary within a run. | Compliance | Decided |
| T7 | StepUp routes through the deterministic approval tool and the communication layer. | how_do_we_make_a_software_product_secure (line 57); harness line 1244 | Decided |
| T8 | Grant and registry writes only through the configurator's tools (G7, IB-13). | the_business_configuration_capability | Decided |
| T9 | Append-only audit of context, decision, and action. Secret-free. One audit trail; the security log is a filtered view. | Accountability; Swaraj's answer (C): one audit trail, the security log as a filtered view | Decided |
| T10 | Not used. Group T runs T1 to T9, then T11. | Construction record | Not used |
| T11 | Field-level visibility. Product sets the range each role may see; default narrow per role; a solo owner sees the whole business; each role narrows as roles are added; the business assigns roles and may narrow, or widen only inside the legal white-list; anything outside is refused and shown as a product signal; an employee who leaves loses access the same minute. | Level 2: who_may_grant (lines 72–78); channels Q4; compliance (line 84); channels line 30 (refusal) | Decided (rule); Open (exact role configuration format) |

## Compliance and security (U)

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| U1 | Mechanical tenant isolation on every store, cache, key, index, log, and model call. | Level 1 §8; compliance T-A | Decided |
| U2 | Connected-system fields are untrusted; only allowed fields enter the prompt. | Compliance secure doc | Decided |
| U3 | Compliance rules (law, platform, buyer) checked at configured checkpoints. | Compliance actor map | Decided |
| U4 | Kill switches per shop (tool, send, provider) and global, without a code deploy. | Compliance | Decided |
| U5 | Tool catalogue is versioned and hashed. No runtime registration. A business's MCP server joins only through the configurator's fixed tool (N27). | Compliance: how_do_we_make_a_software_product_secure (catalogue integrity); Swaraj 2026-10-28 | Decided |
| U6 | T-A and T-B release gates pass before release. Full suites in the Level 2 security file. A skipped test is a failed suite. | how_do_we_make_a_software_product_secure (lines 146–147; suites at lines 149 and 173) | Decided |
| U7 | Nothing erased in normal work; legal erasure only through the erasure tool's confirmation rule (owner or configurator); recursive, situation records included; a record of the erasure kept without the data. | Swaraj 2026-10-28; Compliance (deletion recursive); Level 2 memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops E3 | Decided (Swaraj, 2026-10-28) |

## Business view and explanation (O)

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| O1 | Present work as artifacts, not a chat wall. | Product Vision; Business View | Decided |
| O2 | Owner summary built from the situation records, on demand. | Business View (snapshot) | Decided |
| O3 | Surface owner attention: owner-only decisions, compliance, drifted escalations. | Business View Q2 | Decided |
| O4 | Explain recommendations, actions, and failures on demand. | Explainability | Decided |
| O5 | Reconstruct finished situations for audit and replay. | Explainability | Decided |
| O6 | System health separate from business artifacts. | Explainability | Decided |
| O7 | Every consequential action records: what was done, evidence used, grant it ran under, why, and outcome. The performer writes the record. A step is not finished until that record is written (provisional check). Joined by run ID, situation version, and situation ID. Storage is a later technical decision. | how_do_we_explain_every_action (lines 5–21); Explainability D1 | Decided (record and join); Provisional (who checks) |
| O8 | The observer emits observation events on the event channel (probes, drift, completion-rule breaks). | Explainability D6 (observer is first-class; emits events) | Decided |
| O9 | Owner sees business value only (revenue at risk, stuck orders, at-risk customers, deadlines, items needing the owner), never uptime or message counts. Owned by the business view (B-Visibility). | Explainability D3; research_owner_stakeholder_journeys (B4); RESEARCH_BRIEF item 6 | Decided |
| O10 | Capability-absent only when no system and no person can serve. Otherwise human work. The customer answer and product signal sit outside failure triage. Recorded on the situation and in the audit. | Explainability D2 | Decided |

## Business capabilities (P)

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| P1 | Coordinate through capabilities without owning external canonical records. Tend keeps a reference; the business owns its contact data. | Level 1 (Tend never owns information that belongs to another system); Product Vision (the business owns its customers) | Decided |
| P2 | Missing capability is recognised and surfaced honestly. | Explainability capability-absent | Decided |
| P3 | Invoke capabilities only when the grant and the rules allow it. | Authority; F6 | Decided |

---

## Items removed from the visible text (for the record)

- §6.8 candidate clusters (Section 7 input). The cluster-to-rule map is kept in the construction record.
- §6.11 completion checklist and §6.12 category coverage. Kept in the construction record.
- §6.13 cross-cutting control disciplines. Its content is in the group notes above.
- Old §6.7 relationship diagram. Replaced by a plain ordered list.
- The group-level "provisional runtime hints" (Conversation Manager, Situation Worker). These are architecture-only and belong to Section 7.

## Known conflicts in the knowledge base, and how this file resolves them

| Topic | Conflict | Resolution |
|-------|----------|-----------|
| Reopening (A8) | Harness line 1073: "never reopened". Level 2: reopen when not finished. | Level 2 governs (Swaraj). |
| Pinned rules (Q3) | Harness line 2048: rules read fresh at each wake. Level 2 growth file: pinned at situation open. | Level 2 governs (Swaraj). |
| Resend after failure (M5) | Old Section 6 text: resend if the other side deduplicates. Harness: no resend of an unconfirmed irreversible action. Level 2: same key only if the other side honours idempotency. | Level 2 (the more specific rule). |
| Who sees what by default (T11) | Earlier Section 6 text said "the default is narrow." Level 2: a solo owner sees the whole business; the default narrows as roles grow. | Level 2. |
| Acknowledgement (I1) | Harness line 1355 says acknowledgement is business-configurable. Level 2 ruling: no receipt-only messages. | Both held: no default receipt message; the business may configure wording. |
| Owner push (Section 8) | Subscription could add more owner notifications. Level 2: three classes reach the owner. | Provisional: subscription changes the delivery channel only. |
| Polling (H8, M5) | Harness: no component polls. Level 2 failure file: a bounded status check, then a polling job. Level 2 time file: no fixed-interval polling anywhere. | Decided (Swaraj's direction, recorded in Section 7 on 2026-10-09): the harness only consumes events; a separate polling service runs polling jobs, and short polls only where the outside system's behaviour is known. |

## Walkthrough codes (added 2026-10-09)

Each walkthrough code names a walkthrough in `section_6_responsibility_model.md`. The walkthroughs are summaries of real cases. The full step-by-step cases are in `section_8_interaction_model.md`.

| Code | Plain meaning | Source | Status |
|------|---------------|--------|--------|
| CASE-1 | Walkthrough 1: Priya's business-directed outreach. | Section 6 walkthrough 1 | Decided (scenario) |
| CASE-2 | Walkthrough 2: inquiry, order, delay, and a refund with an unknown gateway outcome. | Section 6 walkthrough 2 | Decided (scenario) |
| CASE-3 | Walkthrough 3: investor diligence. | Section 6 walkthrough 3 | Decided (scenario) |
| CASE-4 | Walkthrough 4: unreliable carrier tracking. | Section 6 walkthrough 4 | Decided (scenario) |
| CASE-5 | Walkthrough 5: package status with no shipping source. | Section 6 walkthrough 5 | Decided (scenario) |

## Changes of 2026-10-28 (memory and knowledge redesign)

Swaraj rejected the earlier memory picture and the Level 2 folder now holds its new design: `Level 2/memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops.md`, with its Level 1 framing and tests in the same folder. Added: A14, A15, B10, F7, F8, N18–N35, U7. Changed: B5, B6 (central situation replaces the board), N1, N11, N13, N14, N16, U5, O1 (visible text), and walkthrough 1. Superseded: the 2026-10-09 rule that the situation worker accepts or denies each link (now A15); the 2026-10-03 note that a step is told "a foreign reference was seen and not opened" (now N34). The part is always called "memory and knowledge".

## Changes of 2026-10-29 (understanding comes first)

Swaraj found that the memory and knowledge tests let routing decide before "the Diwali sale" was understood: "The first thing should have been understanding." An audit of the whole conversation found two roots: understanding had no place in the loops, and a person's visibility was applied to Tend's own reasoning. Added: C7, C8, C9, C10, N36, N37. Changed: B5, B10, N19, N21, N22, N23, N29, N30, N31, N34, N35. The audit's registers and defect list are in `memory_and_knowledge_drafts/` (files 40 to 46).

