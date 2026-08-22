# How do we recognise ambiguity and uncertainty?

## Status

Answered — pending review.

This answer follows the Level 2 process in [`3_level_framework.md`](../../three_level_framework/3_level_framework.md) and the method in [`level2_method.md`](../../three_level_framework/level2_method.md). It defines a logical responsibility and makes a conceptual design decision. It does not choose technologies.

It builds on:

- [`what does it mean to understand what a customer is actually asking`](what_does_it_mean_to_understand_what_a_customer_is_actually_asking.md)
- [`which information is relevant`](how_do_we_determine_which_information_is_relevant_to_the_current_situation_and_which_information_should_be_ignored.md)
- [`whether messages belong to the same situation`](how_do_we_determine_whether_multiple_messages_belong_to_the_same_situation_and_whether_two_seemingly_different_conversations_are_actually_related.md)
- [`Level 1 problem framing`](../../Level1_Problem_Framing_or_Expansion.md)

## Answer

Tend should recognise ambiguity and uncertainty by keeping them as different, explicit parts of the situation model.

Ambiguity means that more than one interpretation of the available conversation and context is still plausible.

Uncertainty means that Tend has a possible interpretation or claim, but does not have enough support to treat it as reliable.

Tend should not reduce either one to a single confidence number.

Instead:

1. Tend records the original message as an observation.
2. Tend identifies the smallest part of the interpretation that is unresolved.
3. If there are multiple plausible interpretations, Tend keeps those alternatives visible.
4. If a claim is incomplete or disputed, Tend records it as unknown or conflicting.
5. Each interpretation and claim keeps its supporting sources, time, and stated reason.
6. Tend uses a provisional interpretation only when the alternatives do not change the operational situation or decision path.
7. Tend never presents a provisional interpretation as an established fact.

The responsibility being designed here is recognition and representation. Gathering, trust resolution, clarification, and deciding whether an action is safe remain separate responsibilities.

## 1. The problem this responsibility solves

Tend must build a situation model before it gathers information, decides, or communicates with a customer.

The first three Level 2 questions define what that model must contain and where messages belong:

- Understanding identifies what the customer is asking and what the business knows.
- Relevance determines which situation model a message reaches.
- Same versus related determines whether messages belong to one operational problem or to separate linked problems.

Those decisions cannot always be made cleanly from the information available at that moment.

For example:

> “Any update?”

If the customer has one open delivery situation, the message may be clear enough in context. If the customer has an open delivery situation and an open refund situation, the same words can refer to either one.

Or:

> “I am asking about order 8821 because it has not arrived.”

The customer’s ask and target order are clear. The actual delivery state is still unknown. The order may be dispatched, delayed, delivered to the wrong address, or recorded incorrectly by a business system.

Without a separate treatment of ambiguity and uncertainty, Tend is likely to do one of two things:

- commit to one interpretation and hide the alternatives; or
- treat every incomplete situation as unusable and stop making progress.

Both outcomes are wrong for Tend.

The Level 1 problem is not to make every situation complete. It is to help the business reach the correct next decision with the information available at that moment.

## 2. Working vocabulary

### 2.1 Ambiguity

Ambiguity exists when the available information supports two or more plausible interpretations.

The ambiguity may concern:

- what the customer wants;
- which object, order, person, or event they refer to;
- whether one message contains one problem or several;
- whether a message belongs to an existing situation or starts a new one;
- whether two situations are the same, related, or unrelated;
- which time, actor, or previous statement is being referenced.

This is consistent with the ordinary linguistic meaning of ambiguity: an expression or utterance can have multiple legitimate interpretations. Linguistic research also distinguishes ambiguity from vagueness, context sensitivity, and simple under-specification. [`Ambiguity`](https://plato.stanford.edu/entries/ambiguity/index.html), Stanford Encyclopedia of Philosophy, explains these distinctions and why context can resolve an apparently ambiguous expression.

For Tend, ambiguity is not limited to word meanings. It also exists at the operational level. A message may be linguistically understandable but operationally ambiguous:

> “The replacement is also late.”

The words are understandable. Tend may still not know which order, replacement, or existing situation the customer means.

### 2.2 Uncertainty

Uncertainty exists when Tend has a possible interpretation or claim but cannot yet justify treating it as reliable.

Examples:

- Tend believes the customer means order 8821, but there are two plausible orders.
- The customer clearly means order 8821, but dispatch status is missing.
- The customer says an employee promised delivery on Friday, but the conversation containing that promise is unavailable.
- The business system says “delivered,” while the customer says the order never arrived.
- Tend believes two conversations describe the same unresolved incident, but the available context is weak.

In decision theory, uncertainty is sometimes distinguished from risk by whether a reliable probability distribution is available. That distinction is useful as a warning: Tend should not invent precise probabilities merely because it has to make progress. It is not, however, the definition Tend needs here. [`Risk versus Uncertainty`](https://www.rba.gov.au/publications/rdp/2000/2000-10/risk-versus-uncertainty.html), Reserve Bank of Australia, summarises this distinction.

### 2.3 The difference in one sentence

> Ambiguity asks, “What could this mean?” Uncertainty asks, “How strongly can we rely on the meaning or fact we currently have?”

They can occur together.

| Situation | Ambiguity | Uncertainty |
|---|---|---|
| “Any update?” with one open delivery issue | Possibly resolved by context | Delivery status may still be unknown |
| “Any update?” with delivery and refund issues | The target situation is ambiguous | The target cannot be assigned yet |
| “Order 8821 has not arrived” | The ask and order are clear | Dispatch and delivery facts may be unknown or conflicting |
| “The employee promised Friday” | The claim is understandable | The promise may not be verified |
| “The delivery was late and the item was damaged” | Not ambiguous; two asks are explicit | Facts about each problem may still be incomplete |

### 2.4 Unknown, conflicting, vague, and ambiguous are not synonyms

These terms should stay separate in Tend’s language.

| Term | Meaning in Tend |
|---|---|
| Unknown | Tend has no value for a relevant fact or slot yet |
| Conflicting | Two available sources make incompatible claims |
| Ambiguous | More than one interpretation of the message, reference, or relationship is plausible |
| Vague or underspecified | The message gives too little detail, but may still have one obvious interpretation in context |
| Uncertain | The current interpretation or claim does not have enough support to be treated as reliable |

“My order is late” may be underspecified if the customer has several orders. It may be clear enough if there is only one relevant open order. Tend must evaluate the message together with its context, not classify the sentence in isolation.

## 3. What exactly can be ambiguous?

The question should not be treated as one undifferentiated language problem. Ambiguity can occur at different points in the situation model.

### 3.1 Ask ambiguity

Tend cannot tell what outcome the customer wants.

Example:

> “Can someone handle this?”

The customer may want an update, a refund, a replacement, an explanation, or human contact.

### 3.2 Reference ambiguity

Tend cannot tell which business object or previous event the customer means.

Examples:

- “My order” when the customer has three recent orders.
- “It has not arrived” when there are two shipments.
- “The message from yesterday” when several employees contacted the customer.

### 3.3 Scope ambiguity

Tend cannot tell whether the message contains one operational problem or multiple problems.

Example:

> “The order is late and the wrong item was sent.”

This example is not ambiguous once both asks are explicit. It contains two situations and should be split. Scope ambiguity would occur when Tend cannot tell whether “the issue” refers to one combined resolution path or to multiple problems.

### 3.4 Situation-assignment ambiguity

Tend cannot tell which existing situation the message updates, or whether it starts a new situation.

Example:

> “I am still waiting.”

It may continue a delivery delay, a refund, or a replacement situation.

### 3.5 Relationship ambiguity

Tend cannot tell whether two conversations describe:

- the same operational problem;
- separate problems with shared context; or
- unrelated problems.

The prior Level 2 decision still applies: Tend must not silently merge situations when the relationship is unclear. A wrong merge contaminates the facts and resolution path of one model with another problem.

### 3.6 Temporal and actor ambiguity

Tend cannot tell which time or person a statement refers to.

Examples:

- “They said it would arrive tomorrow.” Who is “they”?
- “It was supposed to arrive yesterday.” Which promise or which delivery date?
- “After that conversation, I was told it was approved.” Which conversation and who approved it?

These ambiguities matter only when different interpretations would change the situation model or the next operational decision.

## 4. What exactly can be uncertain?

### 4.1 Interpretation uncertainty

Tend has a leading interpretation, but another interpretation remains plausible.

Example:

> “The replacement is late.”

Tend may believe this refers to the replacement for order 8821. The customer has also had a replacement for order 8840. The interpretation is provisional, not established.

### 4.2 Fact uncertainty

The intended situation is clear, but a relevant fact is missing.

Example:

> “Order 8821 has not arrived.”

The intended situation is clear. Tend does not yet know whether the order was dispatched.

This is represented as an unknown, not as an alternative interpretation.

### 4.3 Conflict uncertainty

Available sources disagree.

Example:

- Customer: “It was never delivered.”
- Delivery record: “Delivered at 14:05.”

Understanding records both claims and the conflict. Trust and evidence work later determine how the conflict is evaluated.

### 4.4 Temporal uncertainty

A claim may have been true earlier but may no longer describe the current situation.

Example:

> “It was dispatched yesterday.”

That claim may be useful, but it does not establish the current delivery location. Time belongs beside the claim.

### 4.5 Outcome uncertainty

The current state is understood, but the future result is not known.

Example:

> “The delivery partner has been contacted.”

The action is known. Whether the partner will resolve the delay is uncertain.

Outcome prediction is not the main responsibility of this question. It matters here only so Tend does not record an expected outcome as a current fact.

## 5. Research findings

The research does not give Tend a ready-made design. It gives us constraints and useful distinctions.

### 5.1 Ambiguity is about multiple interpretations, not merely missing detail

The Stanford Encyclopedia of Philosophy distinguishes ambiguity from vagueness, context sensitivity, and under-specification. It also explains that the object carrying ambiguity may be an utterance in context, not only an isolated sentence. This supports a Tend-specific rule:

> Tend should judge operational ambiguity against the available situation context, not against the message text alone.

[`Ambiguity`](https://plato.stanford.edu/entries/ambiguity/index.html), Stanford Encyclopedia of Philosophy.

### 5.2 Ambiguity does not automatically mean “ask a question”

Research on clarification in dialogue treats deciding whether to clarify as a separate problem. The useful question depends on the distribution of possible interpretations, whether one interpretation is dominant, the cost of asking, and the cost of acting on the wrong interpretation. [`Clarify When Necessary`](https://aclanthology.org/2025.findings-naacl.306/), Zhang and Choi, Findings of NAACL 2025.

Research comparing human and language-model behaviour also found that humans do not ask clarification questions for every referential ambiguity. They ask more often when the task itself is uncertain. This reinforces the need to recognise ambiguity first and decide how to resolve it separately. [`Referential ambiguity and clarification requests`](https://aclanthology.org/2025.crac-1.1/), Madge, Purver, and Poesio, 2025.

### 5.3 Candidate meanings are useful, but full-world branching is not required

Dialogue research has explored maintaining candidate meanings under-specified by the conversation and using later interaction to determine which meaning is correct. The important idea for Tend is not a particular model. It is that unresolved interpretation can be represented as a set of candidates instead of being forced into one answer. [`Learning to Interpret Utterances Using Dialogue History`](https://aclanthology.org/E09-1022.pdf), DeVault, Rich, and Sidner, 2009.

### 5.4 Confidence can help detect ambiguity, but it cannot replace the ambiguity itself

Research on grounded dialogue found that calibrated predictive uncertainty can help distinguish clear instructions from ambiguous ones. That supports using confidence as supporting information. It does not support storing only a score. A score cannot explain whether the weakness came from two competing references, missing facts, conflicting evidence, or an unfamiliar situation. [`Aligning Predictive Uncertainty with Clarification Questions in Grounded Dialog`](https://aclanthology.org/2023.findings-emnlp.999/), Naszadi, Manggala, and Monz, Findings of EMNLP 2023.

### 5.5 Provenance is part of useful uncertainty

The W3C PROV model treats provenance as information about the entities, activities, and agents involved in producing or changing information. It describes provenance as useful for judging trust, understanding origins, and reproducing how something was generated. This supports keeping the source and producing activity attached to Tend’s claims and interpretations. [`PROV Model Primer`](https://www.w3.org/TR/prov-primer/), W3C Recommendation family.

## 6. Constraints

The design must satisfy the following constraints from Level 1 and the previous Level 2 decisions.

### Correctness

Tend values a correct decision over a fast but incorrect decision.

A wrong situation assignment can cause Tend to gather from the wrong sources, ask the wrong employee, or send an incorrect response.

### No guessing

Tend must not turn an unverified interpretation into a fact merely because a downstream component wants a complete model.

### Incomplete information is normal

Tend must remain useful while relevant facts are still unknown.

Recognising uncertainty must not mean that every situation is blocked until every field is filled.

### Conflicts remain visible

When sources disagree, Tend must preserve the disagreement. This question recognises the conflict; the trust and evidence responsibility evaluates it.

### Context matters

A message cannot always be classified by itself. Previous messages, business context, prior statements, open situations, and channel relationships can change whether the same words are ambiguous.

### Situations are operational problems

Tend must not create or merge situations only because of linguistic similarity. The deciding question remains whether the messages share one operational problem and one resolution path.

### Correction is normal

A later message, clarification, or gathered fact may show that an earlier interpretation was wrong. Tend must correct forward without erasing the earlier state or reason.

### Human attention is limited

Asking for clarification has a cost. Surfacing every theoretical ambiguity would make Tend slow and frustrating. The design must identify ambiguity that can affect the operational situation, not every possible linguistic reading.

### Explainability

An employee must be able to see:

- what was ambiguous;
- which interpretations were considered;
- what evidence supported each one;
- what was unknown or conflicting;
- why Tend used a provisional interpretation or held the message;
- what later changed the situation model.

### Source ownership

Tend may record pointers and claims about information. It must not become the owner of the original message, order, payment, delivery, or employee record.

## 7. Alternatives

### Alternative A — Always choose the single best interpretation

Tend selects one ask, one situation, one relationship, and one set of facts at each step.

#### Advantages

- Simple for every downstream responsibility.
- Easy to present to an employee.
- No unresolved alternatives to manage.
- Fast to continue gathering and deciding.

#### Costs

- Hides ambiguity behind a clean-looking model.
- Confuses the most likely interpretation with a confirmed interpretation.
- A wrong route can contaminate the wrong situation model.
- Makes correction look like an exceptional failure.
- Violates Tend’s rule against guessing.

#### Decision

Rejected. This is the exact failure mode this question exists to prevent.

### Alternative B — Choose one interpretation and attach a confidence score

Tend still creates one model, but records a confidence value beside the assignment or claim.

#### Advantages

- More informative than silent commitment.
- Easy for downstream responsibilities to consume.
- Can support prioritisation and later evaluation.

#### Costs

- A score does not identify the competing interpretations.
- A score does not distinguish missing evidence from conflicting evidence.
- Different confidence values may not mean the same thing across businesses or situation types.
- A high score can still be wrong when the underlying alternatives were not considered.
- It encourages false precision.

#### Decision

Rejected as the complete design. Confidence may be retained as supporting metadata, but it cannot be the representation of ambiguity or uncertainty.

### Alternative C — Preserve every possible full situation as a separate branch

If Tend is unsure whether the message concerns order A or order B, it creates a complete version of the situation for order A and another complete version for order B. It continues each branch independently.

#### Advantages

- Preserves all known alternatives.
- Downstream work can explore each possible interpretation.
- Avoids committing to one branch prematurely.

#### Costs

- A small ambiguity can duplicate an entire situation model.
- Several independent ambiguities create a combinatorial number of branches.
- Employees cannot easily tell which facts are shared and which belong only to a branch.
- Gathering and decisions may run against the wrong branch.
- Branches become stale as new messages arrive.
- It turns normal incomplete understanding into a second workflow engine.

#### Decision

Rejected. Tend should preserve alternatives locally, at the smallest unresolved part of the model, instead of branching the whole situation.

### Alternative D — Keep only the original messages and reinterpret them later

Tend does not create an explicit interpretation while the situation is uncertain. It stores the messages and waits for a later component or later message to make sense of them.

#### Advantages

- Avoids recording an incorrect interpretation.
- Keeps the original source intact.
- Minimises early modelling decisions.

#### Costs

- Does not satisfy the need for a live situation model.
- Repeats interpretation work whenever an employee or component looks at the situation.
- Cannot explain what Tend currently believes is unresolved.
- Makes routing, gathering, and coordination less visible.
- Treats uncertainty as absence instead of as meaningful state.

#### Decision

Rejected. Original messages remain authoritative source material, but Tend also needs an explicit model of what is currently understood and unresolved.

### Alternative E — Typed, bounded interpretation and claim records

Tend keeps one situation model, but represents unresolved state at the smallest relevant level.

- Multiple possible meanings are represented as candidate interpretations.
- Missing facts are represented as unknowns.
- Disagreements are represented as conflicts.
- Claims and interpretations retain sources, time, and reasons.
- A provisional interpretation is allowed only when it does not change the operational path or create an unsafe commitment.

#### Advantages

- Preserves ambiguity without duplicating whole situations.
- Keeps unknowns and conflicts distinct from interpretation ambiguity.
- Supports the existing model of known, unknown, and conflicting information.
- Makes routing, split, link, and re-route decisions explainable.
- Allows progress when uncertainty is not material to the current step.
- Makes correction forward and reversible.
- Scales with the number of unresolved facts rather than the number of possible worlds.

#### Costs

- More complex than a single best answer.
- Employees and downstream responsibilities must understand unresolved state.
- The product needs rules for when an ambiguity is material.
- Candidate interpretations can become stale and need lifecycle management.
- It does not itself determine whether to ask the customer, gather from a business system, or involve an employee.

#### Decision

Chosen.

## 8. Architectural decision

### 8.1 Recognition belongs inside Situation Understanding

Ambiguity and uncertainty are not a separate generic feature that every part of Tend interprets independently.

They are recognised while Tend builds and updates the situation model.

This gives one responsibility a complete view of:

- the incoming message;
- prior conversation;
- existing situation models;
- the customer’s ask;
- business-side claims;
- known, unknown, and conflicting information;
- candidate relationships between messages and situations.

Other responsibilities consume the explicit result. They do not silently reinterpret the message in their own way.

### 8.2 Preserve ambiguity at the smallest unresolved point

Tend should not create a separate complete situation model for every possible interpretation.

It should identify the smallest unresolved part.

Examples:

- `target_situation = {delivery situation, refund situation}`
- `target_order = {order A, order B}`
- `relationship = {same situation, related situations}`
- `requested_outcome = {status update, refund, replacement}`

The rest of the situation model should not be duplicated merely because one field is unresolved.

This is a bounded interpretation set. It is not a list of every imaginable interpretation. It contains only alternatives supported by the available context and only when the distinction could affect the operational situation.

### 8.3 Keep interpretations separate from claims

An interpretation says what Tend thinks the customer means or how a message may relate to a situation.

A claim says something about the situation or the business world.

Examples:

| Type | Example |
|---|---|
| Interpretation | “The customer probably refers to order 8821.” |
| Customer claim | “The customer says order 8821 has not arrived.” |
| Business claim | “The order record says it was dispatched.” |
| Derived situation fact | “Delivery status is conflicting.” |

Tend must not convert an interpretation into a fact. It must not convert a customer claim into a verified business fact. It must not convert a business-system claim into a complete explanation of what happened.

### 8.4 Confidence is supporting metadata, not the state itself

The previous Level 2 answers already allow claims and confidence to accompany a situation-model version.

That decision remains useful, but confidence must sit beside the actual reason for uncertainty:

- candidate interpretations;
- missing evidence;
- conflicting evidence;
- stale evidence;
- source not yet evaluated;
- unusual or unsupported situation.

“Confidence: 0.61” is not enough for an employee to understand what is unresolved. “Order A and order B are both plausible because the customer used ‘my order’ and there are two open orders” is meaningful.

### 8.5 Material ambiguity is the boundary

Tend does not need to preserve every possible interpretation of every sentence.

An ambiguity is material when choosing between the interpretations could change one or more of these:

- which situation model receives the message;
- whether a new situation is created;
- whether one message is split into multiple situations;
- whether two situations are merged or linked;
- which facts must be gathered;
- which actor is responsible;
- which policy or resolution path applies;
- what the business would communicate to the customer.

If the alternatives do not change the operational situation or the next decision path, Tend may keep a normalised interpretation and record any meaningful qualification as a note.

This prevents the design from turning harmless linguistic underspecification into a workflow blockage.

### 8.6 Provisional interpretation is allowed, but provisional is not confirmed

Tend may use a provisional interpretation to organise context when:

- one interpretation is strongly supported by the available context;
- the alternatives would lead to the same operational situation;
- no irreversible or customer-facing commitment depends on the choice;
- the model keeps the interpretation marked as provisional.

Tend must not use a provisional interpretation as settled when the choice would change the situation, the gathered information, the responsible actor, or the customer-facing result.

This document does not define the policy threshold for an action. It defines the model boundary that prevents a provisional interpretation from being mistaken for a confirmed fact.

## 9. What happens when a message arrives

This is the conceptual flow. It does not choose implementation technology.

### Step 1 — Preserve the observation

Tend records that the communication platform delivered a message and keeps a pointer to the platform-owned message.

The original message is not replaced by Tend’s interpretation.

### Step 2 — Build candidate interpretations

The understanding responsibility reads the message together with relevant context and asks:

- What might the customer be asking?
- Which object, person, or event might they mean?
- Which existing situation might this update?
- Is this one problem or several?
- Are other conversations the same situation, related situations, or unrelated?

If one interpretation is supported and no material alternative exists, Tend can update the situation model.

If multiple material interpretations exist, Tend records the candidate set instead of silently choosing one.

### Step 3 — Separate interpretation uncertainty from fact uncertainty

Tend records the distinction explicitly.

Example:

> “I still have not received it.”

Possible model state:

- Interpretation ambiguity: “it” may refer to shipment A or shipment B.
- Fact uncertainty: the delivery state of the selected shipment is not yet known.
- Customer claim: the customer says the item has not been received.

These are different unresolved questions. Gathering or clarification may resolve them through different actors.

### Step 4 — Apply the existing routing decisions

The earlier routing decisions remain in force.

- A hard signal can justify attaching to an existing situation or creating a new one.
- A soft signal should not be treated as a confident attachment.
- A clearly multi-problem message should be split early.
- When same versus related is uncertain, Tend must not silently merge the situations.
- When related versus unrelated is uncertain and no meaningful relationship signal exists, Tend should not create a link merely because the customer is the same person.

The ambiguity record explains why the route was confident, provisional, held, split, linked, or corrected.

### Step 5 — Create or update the model

The situation model receives:

- customer statements and beliefs;
- supported situation claims;
- unknowns;
- conflicts;
- candidate interpretations where material ambiguity remains;
- message references;
- the reason for the update;
- the sources and time behind the update;
- confidence as supporting metadata, where useful.

### Step 6 — Leave resolution to the responsible next step

The model makes the missing work visible.

- A customer may resolve what they meant.
- A business system may provide a missing fact.
- An employee may resolve an internal-history question.
- A trust and evidence responsibility may evaluate conflicting claims.
- A decision responsibility may determine whether the available model is sufficient to act.

Recognition does not silently perform those other responsibilities.

## 10. How the design fits the previous three answers

### Understanding the customer’s ask

The model may contain:

- one clear ask;
- one ask with unknown supporting facts;
- several explicit asks that should be split;
- one ask with multiple plausible interpretations.

“I want a refund for order 8821” is a clear ask even if the refund eligibility is unknown.

“Can someone handle this?” is an ambiguous ask when the required outcome cannot be inferred safely from context.

### Relevance

Relevance remains attachment to a situation model.

Ambiguity describes when the attachment is not yet clear. It does not create a new situation automatically.

If a message may belong to situation A or B, Tend records that unresolved target rather than attaching it confidently to both or to one at random.

If the message clearly introduces a new problem, Tend creates a new situation even when some facts about that problem are unknown.

### Same, related, or unrelated

Ambiguity describes the unresolved relationship. The existing model relationship rules determine what can happen next:

- do not merge because two situations share an order or customer;
- link separate situations when meaningful shared context exists;
- do not link all situations for the same customer by default;
- correct the relationship forward when later evidence changes it.

## 11. Evaluation criteria

The decision should be evaluated against these criteria as Tend evolves.

### 11.1 Interpretation correctness

Does Tend correctly distinguish:

- one clear situation;
- a message with multiple problems;
- an ambiguous reference;
- a new problem;
- related but separate problems?

### 11.2 Uncertainty fidelity

Can an employee tell whether the problem is:

- missing information;
- conflicting information;
- ambiguous interpretation;
- weakly supported interpretation;
- stale information;
- an unknown future outcome?

The model should not make these look identical.

### 11.3 No hidden commitment

Does a provisional interpretation remain visibly provisional?

Can an employee identify which interpretation would have produced a different route or resolution path?

### 11.4 Safe progress

Can Tend continue organising and gathering useful context without waiting for every non-critical detail?

Does it stop or request clarification when the unresolved distinction could cause a wrong situation, wrong actor, wrong policy, or wrong customer communication?

### 11.5 Human effort

Does Tend avoid asking the customer to clarify information that context already makes clear?

When clarification is necessary, does the unresolved field produce a focused question rather than a broad request to repeat the entire problem?

### 11.6 Explainability and correction

Can Tend show:

- the original message;
- the interpretations considered;
- the evidence used;
- the reason for the selected or provisional interpretation;
- the later event that changed the model?

### 11.7 Operational scalability

Does unresolved state grow with the number of meaningful unknowns and alternatives, rather than duplicating complete situation models for every possible interpretation?

### 11.8 Boundary discipline

Does this responsibility avoid silently deciding:

- which source is authoritative;
- what information to retrieve;
- whether an action is allowed;
- what business policy means;
- which employee must act?

Those belong to other Level 2 responsibilities.

## 12. When not to use this design

This design should not be used as a general-purpose representation of every kind of uncertainty.

### Do not use candidate interpretations for a simple missing fact

If the situation is clear and one fact is absent, record an unknown.

Do not create alternatives merely because Tend does not yet know the delivery status.

### Do not use ambiguity to avoid creating a clear new situation

If the customer clearly reports a new operational problem, create the new situation even if its facts are incomplete.

### Do not use confidence as a substitute for evidence

A score cannot replace the alternatives, source claims, conflict, or reason behind the uncertainty.

### Do not use this design to resolve trust

Recognising that two sources conflict is inside this responsibility. Deciding which source should be trusted belongs to Trust and Evidence.

### Do not use this design to decide what to gather

Recognising that a delivery date is unknown is inside this responsibility. Choosing whether to query the delivery partner, ask an employee, or ask the customer belongs to Gathering Information.

### Do not use this design to decide whether to act

Recognising that the situation has unresolved ambiguity is inside this responsibility. Determining whether the business can safely reply, refund, escalate, or wait belongs to Decision Making and business policy.

### Do not create full branches for every possible world

Preserve alternatives only at the smallest material point. Full branching belongs nowhere in this responsibility.

### Do not treat all linguistic imprecision as operational ambiguity

If context makes the operational meaning clear and no resolution path changes, the wording does not need to block the situation.

## 13. Open questions left for later Level 2 work

This decision resolves the representation boundary. It intentionally leaves these questions open:

- How should Tend determine whether an interpretation is sufficiently supported?
- How should confidence be calibrated and evaluated?
- How should source trust be represented and resolved?
- How should Tend select the best clarification question?
- When should Tend ask the customer, an employee, or a business system?
- What is the business-specific cost of a wrong route versus a delayed route?
- How much uncertainty can each business tolerate before requiring human approval?
- How should stale interpretations be retired without hiding history?
- How should an ambiguity be measured over time for product evaluation?

Those questions belong to Trust and Evidence, Gathering Information, Decision Making, Human Collaboration, and Observability. They should not be solved by adding hidden behaviour to Situation Understanding.

## Final decision

Tend will recognise ambiguity and uncertainty as explicit, typed, evidence-linked state inside Situation Understanding.

It will preserve material competing interpretations locally, at the smallest unresolved part of the situation model. It will represent missing facts as unknown, disagreements as conflicts, and confidence as supporting metadata rather than as the whole state.

It may use a provisional interpretation when the alternatives do not change the operational path, but it will never present that interpretation as confirmed. When the ambiguity could change routing, situation identity, ownership, gathering, policy, or customer communication, Tend will keep the ambiguity visible and leave its resolution to the appropriate next responsibility.

## Sources

- [Ambiguity — Stanford Encyclopedia of Philosophy](https://plato.stanford.edu/entries/ambiguity/index.html)
- [Risk versus Uncertainty — Reserve Bank of Australia](https://www.rba.gov.au/publications/rdp/2000/2000-10/risk-versus-uncertainty.html)
- [Learning to Interpret Utterances Using Dialogue History — ACL Anthology](https://aclanthology.org/E09-1022.pdf)
- [Clarify When Necessary: Resolving Ambiguity Through Interaction with LMs — ACL Anthology](https://aclanthology.org/2025.findings-naacl.306/)
- [Referential ambiguity and clarification requests: comparing human and LLM behaviour — ACL Anthology](https://aclanthology.org/2025.crac-1.1/)
- [Aligning Predictive Uncertainty with Clarification Questions in Grounded Dialog — ACL Anthology](https://aclanthology.org/2023.findings-emnlp.999/)
- [PROV Model Primer — W3C](https://www.w3.org/TR/prov-primer/)
