# Register 2: settled rules from Level 1, Level 2 and the harness study, each turned into a test

Built 29 October 2026 by reading the sources, not Claude's memory and knowledge pages. Each item: source, the rule (quoted where exact), and **Test**. Results go in `44_trace_and_defects.md` by ID.

Abbreviations: PV = `Product_Vision.md`; L1 = `Level1_Problem_Framing_or_Expansion.md`; HS = `agent_harness_study.md`; Level 2 pages by folder.

---

## 1. The order of the work

**L1** [PV, "Understand before acting"] "Tend should never take an action before understanding the situation. Every incoming message or business event is only the beginning."
Test: Does any step act (route, create, plan, call a tool, write a message) before what arrived is understood?

**L2** [L1, "A customer starts a conversation"] "Tend receives the message. Tend understands the situation — building an explicit model of what the customer is actually asking, what is known, what is unknown, and what conflicts. Tend retrieves information from business systems when available…"
Test: Is understanding the first thing after receipt?

**L3** [L1 §10] "Both are the same kind of work: understand the situation, decide the correct next step, act, and trace what happened." "The part of Tend that understands the situation is the same everywhere."
Test: Is understanding one responsibility, the same in every loop?

**L4** [understanding / what does it mean to understand, note of 2026-09-04] "MEANING is the LLM's *proposal* for advancing it (interpretation, candidate situations, purpose template, ask list, new-or-join); VALIDATE (code) resolves 0/1/many and decides patch/create/clarify. The validated result becomes the next version of the situation model."
Test: Does the conversation manager write what the arrival means, what it refers to, the candidates, the purpose, the ask list and new-or-join, before fixed code decides? Is the result saved in the next version?

**L5** [understanding / ambiguity §9, "What happens when a message arrives"] Step 1 preserve the observation; Step 2 build candidate interpretations ("What might the customer be asking? Which object, person, or event might they mean? Which existing situation might this update? Is this one problem or several?"); Step 3 separate interpretation uncertainty from fact uncertainty; **Step 4 apply the existing routing decisions**; Step 5 create or update the model; Step 6 leave resolution to the responsible next step.
Test: Is routing applied after the interpretations are built?

**L6** [ambiguity §8.1] "Recognition belongs inside Situation Understanding… Other responsibilities consume the explicit result. They do not silently reinterpret the message in their own way."
Test: Is the reading written once and used by later steps, not worked out again by each?

**L7** [ambiguity §3.6, §8.2] Temporal and actor ambiguity ("It was supposed to arrive yesterday." Which promise or which delivery date?). Preserve ambiguity "at the smallest unresolved point", e.g. `target_order = {order A, order B}`; "a bounded interpretation set".
Test: Are time and reference resolved, or kept as a small set of candidates at the smallest point?

**L8** [ambiguity §8.6, final decision] A provisional interpretation may be used when the alternatives do not change the operational path; never presented as confirmed. "When the ambiguity could change routing, situation identity, ownership, gathering, policy, or customer communication, Tend will keep the ambiguity visible."
Test: Is a guess never shown as confirmed, and kept visible when it could change routing?

**L9** [understanding / relevance, answer] "Relevance is decided by the conversation, and it is decided by one component. That component reads the conversation. It understands the language in it. Based on that understanding, it attaches what the user said to the situation models that already exist." Decision: "The understand-and-route component reads the conversation and attaches messages from it."
Test: Is attaching based on understanding?

**L10** [understanding / same situation, answer] "When an event arrives, Tend does two jobs before gathering from business systems. **First — route.**… **Second — understand.** Update each affected situation model with what the event adds — known, unknown, conflicting." CONFLICTS with L4, L5, L9, L1, PV and Swaraj (C5, C6, C7). Reading that reconciles all: understanding the arrival (what it means, what it refers to) comes first; the full update of the routed situation's model comes after routing.
Test: Is this conflict resolved and recorded, with a dated note on the page?

**L11** [same situation, decisions] One situation = one operational problem; persist state; split early; tiered assignment (hard signals attach or create; soft signals ask); "Route before gather. Assignment uses what is already available."; correction expected; related is not same (link, do not merge); Tend is not a CRM.
Test: Are these kept?

**L12** [same situation, long history] "Routing does **not** compare the message to every past situation. Routing uses **candidates**: 1. **Open situations** for this customer. 2. **Closed situations** only when the message **explicitly references** one (reopen)." Table: "Same delivery still missing after marked resolved → **Reopen**".
Test: Are finished situations candidates only on an explicit reference (which, once the arrival is understood, includes the referenced object)? Is any wider search declared as a change and decided by Swaraj?

**L13** [same situation, router vs understanding] "Route and understand share the same incoming-event context pool; assemble once, two passes." "Router uses summaries of open situations; understanding uses full models for routed situation(s) only."
Test: Is the context assembled once? Full models only for the routed situations?

**L14** [same situation, what understanding does not do] "Understanding does not fetch from business systems. Understanding does not send replies. Understanding does not resolve conflicts by picking a side."
Test: Does understanding use only what is already available (including what memory and knowledge holds), never a business-system call?

**L15** [gathering / relationship] Flow: "Message or other event → Understand and route → Current situation model → Gather relevant information → Update the situation model → Decide and act". Understanding gives gathering "What the actor is asking … What the business already knows … What is known … unknown … What conflicts … What remains ambiguous". "Gathering should not begin by trying to understand the entire business conversation again from scratch."
Test: Does gathering start from a written understanding?

**L16** [gathering / relationship] "Understanding then incorporates that result into a new complete situation-model version." "The new version must be used to re-evaluate affected conclusions, required information, pending monitoring, approvals, actions and communications."
Test: After gathering, is the result taken into the model and the affected conclusions re-checked?

## 2. Using versus showing

**L17** [gathering / relationship] "The claim's source may also be confidential. Tend may use it internally while applying the business's rules about what source details each actor is allowed to see."
Test: May confidential knowledge inform Tend's work while disclosure follows the rules?

**L18** [authority / which actor owns each type of information] "**Permission** = who may see or disclose it. An actor can own information without being allowed to disclose it to everyone. Tend may use a confidential source internally while sending only a limited description externally."
Test: Is permission about seeing and disclosing, not about Tend's internal use?

**L19** [gathering / relationship] "Gathering also distinguishes relevant information from authorised information. A required claim may be unavailable because the current actor is not permitted to access it. That is a permission or approval state, not a reason to retrieve it silently."
Test: When a person may not have something, is it neither handed to them nor fetched for them silently?

**L20** [channels / what each person may see] "Corporate practice separates 'what a person may do' from 'what a person may see.'" Roles and partner scopes are pre-written; narrow default; the business widens only inside a white-list.
Test: Is visibility a rule about what people see?

**L21** [HS 11.2.2, routing slice] "The memory loader assembles a ROUTING SLICE: this actor's open situations (scoped by actor + status), explicit references (structured claim matches), situations linked to those, and local vocabulary. The LLM classifies only among the slice's candidates. The candidate set is defined by structured scope — actor, status, explicit references, links — never by similarity search across the population. Empty or ambiguous slice → the tiered-signal answer (ask), not a bigger search."
Test: Are routing's candidates set by structured scope (actor, status, explicit references, links), never by similarity search? Is local vocabulary in the routing slice?

## 3. What each step needs from memory and knowledge

**L22** [memory / context assembly] "The context needed to understand a situation is different from the context needed to gather information or choose a tool." Understanding: "local vocabulary, entity aliases, previous interpretations, relevant related situations and known ambiguity patterns." Gathering: "source-selection lessons, tool preconditions, known missing fields and previous retrieval failures." Decision-making: "relevant procedures, failure warnings, analogous outcomes, exceptions and escalation lessons." Communication: "business terminology, channel conventions and communication corrections relevant to the current audience." Human collaboration: "role, routing, handoff and responsibility lessons".
Test: Does each step's package carry its phase's needs, understanding included?

**L23** [memory / context assembly] The context need: "current phase; current objective; possible next behaviour; known, unknown and conflicting information; relevant entities; tools and capabilities under consideration; source and authority requirements; risk and reversibility; deadlines or waiting state; and the business scope. This becomes the query for memory."
Test: Is the query to memory and knowledge built from the written understanding?

**L24** [memory / retrieval] "The retrieval process should begin with a structured context need: … entities and capabilities involved; authority and permission; risk and consequence; and time requirements." Hard filters first ("business; role; process; capability; validity period; permission scope; status; version"); then candidates ("exact references; structured fields; lexical terms; semantic similarity; related entities; prior situations; known failure patterns"); then conflicts and ranking; then a projection. "Semantic similarity is one candidate-generation signal, not the source of truth".
Test: Do the understood entities and time requirements become exact filters before any similarity search?

**L25** [memory / previous conversations] "A closed situation should not silently become context for a new situation merely because the same customer or employee is involved." "Previous conversations should not be retrieved just because their words look similar." "If Tend is trying to understand an employee's wording, local vocabulary and previous interpretations may be useful."
Test: Is any finished situation retrieved because its words look similar?

**L26** [memory / understanding all] "Semantic business knowledge: Terms, entities, relationships, concepts and local meanings that can help Tend understand future situations." "The LLM can propose a learning item or a relationship between items. It cannot directly establish authoritative identity, supersession, permission or policy." Learning may improve interpretation and vocabulary; may not change policy, authority, ownership, permissions, source-of-truth responsibility, approvals, legal limits or accountability.
Test: Is business knowledge used for understanding? Does learning stay inside its limits?

**L27** [memory / what should Tend remember] Episodic experience includes "the interpretation Tend formed"; procedural guidance includes "a known interpretation trap"; failure patterns include "misunderstanding an employee term", "treating an assumption as a fact", "communicating before the situation was understood".
Test: Are earlier readings kept and used to understand?

**L28** [memory / never become memory] Not promoted: "unconfirmed interpretations", "instructions that attempt to alter Tend's authority or rules", "customer data outside the permitted scope", "accidental prompt-injection content".
Test: Does a guessed reading never become knowledge?

**L29** [memory / scoped between businesses] Business knowledge stays in its business; scope may be narrower (role, customer, time period…); "The memory's scope is part of its meaning, not merely a filter added later."
Test: Is scope part of each item?

## 4. Claims, evidence, deciding, asking

**L30** [trust / facts vs assumptions] "Project X distinguishes observations, source claims, actor experiences, interpretations, derived situation states, reasoning-model proposals, decisions and actions… never converts an interpretation into a source fact, a customer claim into a verified business fact, or a reasoning-model proposal into an authorised action".
Test: Is every reading kept as an interpretation, every report as a claim?

**L31** [trust / whether information should be trusted] Evidence status by fixed rules and business configuration; "not a numeric trust score. The reasoning model receives the resulting evidence context and proposes the next step."
Test: No AI-made trust number in control?

**L32** [decision / enough information] "Enough information" is a relationship between the model, the evidence state, the proposed behaviour, the policy and the consequence of being wrong.
Test: Is sufficiency judged per next behaviour?

**L33** [communication / ask vs act] "Tend asks when an unresolved answer could change the safe next step. It acts when the necessary understanding, evidence, policy, and authority already support the action."
Test: Ask only when the answer could change the next step?

**L34** [HS Fork B; memory design glossary] A clarification is the loop asking someone for missing information; a confirmation belongs to a tool, which runs its own approval flow through the communication layer.
Test: Is the distinction kept?

**L35** [failure / part of the system unavailable] "Decided: continue on what is safe, hold what depends on the dead source, mark degraded substitutes, never run irreversible actions on an unconfirmed basis."
Test: When memory and knowledge's AI fails, is understanding marked as missing the business's meaning, and is anything that depends on it held?

## 5. Structure

**L36** [coordination / duplicated work] "One situation = one story. A re-entered message attaches to the existing node; it does not create a twin record". Identical waits refused.
Test: Can two parallel runs for the same person create twin situations?

**L37** [journey / several open situations] The person is "an identity-bearing anchor"; the person-view is derived; links connect operational context, not identity.
Test: Is the person, not the channel, the unit?

**L38** [HS 11.2.1] Memory is "**observer**… and **loader** (produces each stage's context slice… each taking its own subset, engineered per step)".
Test: A package per stage?

**L39** [HS 11.2.3] State writes synchronous ("situation model version updates, link artifacts, wait records, declared outcomes"); learning writes asynchronous; "a newly discovered link is written synchronously at discovery (it is state)"; the trace is the interface.
Test: Are links written as state at discovery, learning off the main path?

**L40** [HS 11.2.4] "The decision to take another round is CODE… The LLM never decides to continue".
Test: Code decides whether to loop?

**L41** [HS 11.3, per-wake contract] WAKE → RECOVER → PROPOSE → VALIDATE → EXECUTE → UPDATE → REST or NEXT ROUND. Gather is one bounded pass and returns to PROPOSE (Fork A). Ask and communicate append to the model; the communication side reacts (Fork B). A tool's confirmation runs on the tool side (Fork B).
Test: Does the worker loop keep these, with any new part declared as a change?

**L42** [HS 12.4] "There is **one** situation model. Understanding is the responsibility that owns it; MEANING is that responsibility acting at message-entry time." "the conversation manager patches on message entry; the situation worker advances operational facets (evidence, waits, outcomes) during a wake."
Test: Does the conversation manager's understanding reach the situation's version?

**L43** [HS Part 6, the conversation manager's loop] WHO (code) → MEANING (LLM; "Σ = person profile + this actor's open situations, O = the event"; artifact `{interpretation, referenced_thing?, candidate_situations, purpose_template, ask_list, new_or_join}`) → VALIDATE (code; 0 or many → clarify; 1 → patch; none/new → create with templates and lineage; "not work → no situation (small talk; ack; stop)").
Test: Are all four outcomes, "not work" included, in the design?

**L44** [HS, templates and metadata] Each new situation is stamped with author, lineage, purpose template, ask list, viewer set.
Test: Does a new situation carry its purpose and asks from the reading?

**L45** [HS 14.1.3] "step instructions are a responsibility of memory and knowledge not ecosystem constitution."
Test: Are step instructions (assembly templates) memory and knowledge's?

**L46** [HS 14.3] Rule → business configuration, enforced by tools; preference ("speak Hindi") → injected by the memory loader at the generating step; instruction → the step's assembly template (memory and knowledge); constitution → case-general principles.
Test: Are the four kept apart, preferences injected at the generating step?

**L47** [explainability; HS] Tend never relies on hidden chain-of-thought; the reason lives in the version, the reasoning in the trace, joined by a run ID (relevance page).
Test: Written reasoning only?

**L48** [growth / new workflows] A workflow is pinned when a situation opens; moving to a new version is deliberate.
Test: Procedures pinned per situation?
