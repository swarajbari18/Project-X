# Conversation with Swaraj about Memory and Knowledge

## Why this document exists

This is a conversation record, not a formal specification.

The purpose is to preserve how we reached the Memory and Knowledge boundary, including the places where the first interpretation was incomplete, the research that changed the shape of the problem, and the working decisions that now guide the individual question documents.

The shared walkthrough matters here because “memory,” “knowledge” and “learning” sound like one thing when they are actually several different responsibilities.

## Where we started

The Level 1 questions were:

- What should Tend remember?
- What should never become memory?
- What belongs in conversation history?
- What belongs in long-term business knowledge?
- How should previous conversations influence future decisions?
- How do we prevent outdated knowledge from influencing new decisions?
- How do we update knowledge when reality changes?
- Who owns business knowledge?
- Can Tend learn automatically?
- If so, what kind of learning is acceptable?

At first this looked like a normal long-term memory problem.

That reading was too small for Tend.

Tend does not only need to remember what a customer said. It needs to remember what happened while it was trying to help, what information it used, where it made a mistake, what a business’s employees mean when they use local language, and what Tend should do differently the next time a similar situation appears.

## Swaraj’s clarification about learning

Swaraj clarified the most important boundary:

> When I say Tend is learning, it is learning about its own mistakes. It is not changing business rules.

The examples were concrete:

- Tend used the wrong tool.
- Tend used a tool incorrectly even though rules existed for its use.
- Tend misunderstood something internally.
- Tend did not grasp what an employee or customer meant.
- Tend learned the words employees use and what those words mean in that business.

The learning is specific to the business.

What Tend learns in a logistics business should not automatically become useful knowledge for a service business.

This gave us the central definition:

> Tend learns how to perform better for a particular business. Tend does not learn to redefine what that business is allowed to do.

## The distinction between rules and learning

Business rules are normative.

They say what must happen, what may happen, what must not happen, who can approve something, and which source or actor owns a decision.

Learned memory is descriptive or procedural.

It says things such as:

> Employees in this business use “dispatch ready” to mean that a package is packed but has not yet been collected by the carrier.

Or:

> Tend previously omitted the warehouse identifier when calling this capability, and the capability rejected the request.

The second kind of knowledge may guide interpretation or planning.

It cannot grant permission, override a policy, change authority or turn an observed workaround into an official rule.

If learned memory conflicts with a formal rule or authoritative current information, the rule or authoritative source wins. The learned memory becomes a conflict, warning or candidate for correction.

## The first research pass

Research showed that there is no single settled meaning of agent memory.

The useful distinction is between several kinds of memory:

- working context for the current step;
- conversation and situation history;
- episodic experience of what happened;
- semantic business knowledge;
- procedural memory about how to act;
- reflective or error memory about what Tend did wrong; and
- policy and authority, which should not be treated as ordinary learned memory.

The [CoALA research](https://arxiv.org/abs/2309.02427) gave us a useful conceptual vocabulary for modular memory in language agents.

[Reflexion](https://arxiv.org/abs/2303.11366), [ExpeL](https://arxiv.org/abs/2308.10144) and [Voyager](https://arxiv.org/abs/2305.16291) showed different ways an agent can improve through external experience, textual lessons or reusable skills without necessarily changing model weights.

The research also gave us an important warning. Tend cannot simply ask itself whether its own reasoning was wrong and trust the answer. The [DeepMind self-correction study](https://deepmind.google/research/publications/48252/) found that intrinsic self-correction is unreliable without external feedback. Tool results, validators, human corrections, later outcomes and replay tests are stronger signals.

## The correction about validation

The first recommendation was that every learning item should pass through validation before becoming active.

Swaraj corrected that.

Validation may exist, but it should not be mandatory by default.

The business should be able to configure learning:

- learning off;
- automatic learning, which is the default; or
- manual validation of learning instances.

This does not remove system safeguards.

Human approval is optional. Scope checks, permission checks, provenance, policy conflict checks, malformed-memory checks and security checks remain necessary.

The distinction is:

> Human validation is a business configuration. System integrity checks are product responsibilities.

## The real problem became context assembly

The next important correction was that memory cannot be treated as one large store that is dumped into every prompt.

The context needed during understanding is different from the context needed during information gathering.

The context needed for tool selection is different from the context needed during communication.

The context needed for a business decision is a subset of the complete Tend and situation state.

The mechanism therefore has to ask:

> What does Tend need to know for the decision it is trying to make at this exact point in this situation?

It should use the current situation model, phase, objective, missing information, relevant entities, tools, authority, risk and time context to assemble a small context projection.

This is the same direction described by [Anthropic’s just-in-time memory tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool) and its [context-engineering work](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents): persistent information exists outside the active context and is selected when needed.

## The graph-memory discussion

Swaraj then questioned whether Project X needs graph memory.

The current conclusion is that it probably does not need a dedicated graph-memory technology at Level 2.

However, it does need graph-shaped relationships.

Typed records can reference:

- the situation they came from;
- the experience that produced them;
- the business and process they apply to;
- the claim or memory they support;
- the memory they contradict;
- the version they supersede;
- the tool or capability they concern;
- and the human correction that changed them.

Those references form a graph of meaning even if the physical implementation later uses structured records and ordinary indexes.

The important distinction is:

- graph-shaped data is a conceptual relationship model;
- a graph database is a Level 3 storage and query choice.

Project X should not choose graph storage merely because memory has relationships.

## The identity and versioning problem

Swaraj identified a deeper ambiguity.

Suppose one learning instance says:

> Dispatch requires warehouse_id.

Another says:

> Before creating a dispatch, provide the warehouse identifier.

The wording is different but the meaning may be the same.

If versioning depends on matching natural-language metadata, the update may fail operationally.

The conclusion is that the language model must not directly decide memory identity or supersession.

It may propose that two things are related.

The system must reconcile them through structured identity, relation types, scope, qualifiers, evidence and update rules.

If a safe identity match cannot be established, the new item remains separate or unresolved. It must not silently supersede the old item.

This is consistent with research on [record linkage and entity resolution](https://openresearch-repository.anu.edu.au/server/api/core/bitstreams/ec3af575-ab72-4282-a1b2-e3b078f35a3c/content) and with recent work showing that knowledge supersession remains a difficult, separate capability for long-running agents. [Supersede](https://arxiv.org/abs/2606.27472)

## Working decisions

The following decisions now guide the documents:

1. Tend’s learning is business-scoped operational self-improvement.
2. Learning cannot change business rules, authority, permissions, ownership or source-of-truth data.
3. Automatic learning is enabled by default.
4. A business may turn learning off or require manual validation.
5. Operational trace recording and learned-memory use are separate concerns.
6. Experience records, learned memories and context projections are different objects.
7. Memory is typed, versioned, referenceable and traceable.
8. References may create graph-shaped relationships without requiring graph storage.
9. LLM-generated metadata is a proposal, not authoritative control metadata.
10. Versioning uses structured claim families and typed update semantics, not wording similarity alone.
11. Ambiguous matches do not silently supersede existing memory.
12. Retrieval is controlled by the current situation phase and decision need.
13. Hard scope, authority, validity and permission filters come before semantic similarity.
14. Learned memory is advisory and cannot override deterministic controls.
15. Physical storage and indexing belong to Level 3.

## Swaraj's correction in October 2026: memory takes part in the loop

In October 2026, Swaraj read the finished architecture and found that memory had become a tool the other parts call. He said this was never what he meant.

His words, lightly cleaned:

> Memory and knowledge is not a tool that the situation worker and conversation manager use. It is an active, proactive component that injects, learns, and guides. It is part of the harness itself, and it runs parallel to the loop.

> The memory and knowledge layer observes the loop that the conversation manager and the situation worker follow. At each step of the loop it either chooses to learn something, chooses to propose something, or chooses to stay neutral. It is event-based.

He gave examples:

- When a message arrives from a person, memory places that person's open situations before the conversation manager has to route. The conversation manager does not have to spend a call fetching them.
- If the conversation manager is thinking about a particular order number, memory checks that order and places the situations related to it.
- When the situation worker understands what kind of situation it has, memory places the strategy the business configured for that kind, before gathering starts.
- Memory handles the linking between situations. The conversation manager and the situation worker each see too little at one moment to do it well.

> Thought and action have to be separated. Based on the thought, memory can inject knowledge. On that knowledge, action can be taken. The situation worker and the conversation manager can still use a tool to ask memory for more. But the memory and knowledge layer is itself an AI component, with several loops and parts that only wake for certain jobs.

Some phrases, exactly as he wrote them, because the proposal page quotes them:

- "the memory and knowledge layer takes the name of that person and injects all the open situation right before the step where the conversation manager has to route"
- "the memory and knowledge layer itself is a LLM-based AI-based component that may have multiple types of loop, multiple types of component that only activate a certain set of components for a certain set of jobs"
- "The memory and knowledge could inject by looking at the thought process of it, by looking at the output of a particular step and aiding in the next step. So, thought and action has to be separated. Based on the thought, we can inject knowledge"
- about linking: "it should be complete responsibility of memory and knowledge itself why do we have a separate component anyway"
- "the loop that we engineer in itself was a complete failure"

The investigation that followed found:

- His September words in the agent harness study already said memory watches the loop, keeps updating the links between situations, and loads each step. The study's summary drawing then showed memory only as loaders the loops call and a writer that reads finished work afterwards. The Section 12 architecture, written by Claude, copied that narrower picture.
- The per-step choice to learn, propose, or stay quiet was not written down before October 2026. Neither was placing the business's strategy, or memory reading the step's written thinking.

A design to answer this was proposed on 26 and 27 October, in a page called "how memory meets the conversation manager and the situation worker". Swaraj rejected it on 28 October; see the next section but one. The design that replaced it is [how memory and knowledge works with the loops](how_does_memory_and_knowledge_work_with_the_loops.md).

An earlier draft of that page, from 25 October, said memory must never look up an order number the AI only guessed. It also moved the open-situation summaries out of memory and into separate fixed code. The 26 October version reverses both.

- A guessed order may be looked up, but only among the speaker's own orders and finished situations. Since the 27 October revision, the situation worker reads the orders, and memory compares them. A message is attached to it only after the speaker confirms it, or after a shared order or tracking number ties the two.
- The open-situation summaries are placed by memory's own fixed part.

## Swaraj's reading of the proposal, 27 October 2026

Swaraj read the first story of the 26 October proposal, and its list of decisions. He wrote down what it made clear to him before reading further. His points, lightly cleaned:

**Time is not a fact.** "Diwali is a yearly festival… the dates would change." Tend cannot know when "the Diwali sale" was. Memory has to find out, from the business's own records: "if the owner is still talking about a Diwali sale, by that time they would have opened some sort of a situation". "Any thing that is being told to us, to the agent at any level, is a claim, is not a fact. We have to establish it." "So whatever we get, the conversation manager gets, establishing it is first." His example: a carrier saying "delivered" is a claim that it handed the parcel to the address, not that the customer has it.

**Correcting its own work.** Swaraj pointed at the audit Claude had just done of an earlier conversation: given the same conversation with no hint of what was wrong, an auditor would still find the mistakes and correct them. "This self-correction by auditing the thing, it can be done very easily. We do not need anything else."

**Deciding is reflecting.** At the decide step, the situation worker "should look back at the document I shared, the things it has done till now, and look at whether it actually computes". "It's not that at the decide step it is doing both decision and reflection. The process of decision, the way we are deciding, is self reflection itself." Memory, too, "has to revisit what it has done till now" before it proposes anything. "When the decide step has what context to engineer at that point is the key."

**The rest of Arjun's story is right.** Tend makes an educated guess from memory, and asks Arjun to confirm. The friendly wording of that question belongs to a separate part that writes messages for people.

**Retrieval must be specific.** If Arjun has bought ten shirts and says "a linen high quality white shirt", how does memory find it? "It has to use multiple types of retrieval mechanisms to reliably and accurately retrieve knowledge." It must fit what Level 2 has already decided, "not do everything".

**How does a change travel between linked situations?** After Arjun gives the corrected pin code, how does it reach the warehouse team's situation? Does linking two situations wake both? He recalled the outreach example as one central situation and many under it, where an update to one goes to the others.

**What he meant by "the thought".** Not the model's hidden reasoning. "Let's say I break the loop into two components… one I just call reasoning and second I call is action." The reasoning step writes its conclusion: "I will go with this particular plan because I think this, this, this." "So it's not the internal reasoning, it's the reasoning of the loop on which I said that that had to be there." That is turned into structured artifacts "which we can basically check the shape of, check the verification of, check the dependencies". He had watched one model's hidden reasoning repeat "the same 3-4 sentences again and again" for thirty minutes: "that is no benefit to us."

**The loop is not a ReAct loop, and it is incomplete.** "It's not a single React loop where while the loop equals to, we just check whether there is a tool call." Before each component of the loop, memory should "proactively feed context so that it does not get confused". He wants the work to be "processful, methodological… lean at every part, but when everything clicks in together, it is extremely smart."

**Research, skills and tools.** His example: the owner asks the worker to research "dark AMMs", a term nobody knows. First the subject must be established, from the business's own learning if it has any, otherwise from the web. Then a research method is needed, and "how to research is a skill". "Who will give him that skill file to read? It is the memory and knowledge layer." Instructions belong in skill files, not in the prompt: "We are writing prompt constitution that… is basically a behavior of a system, and instructions are always in skill files." Tools are not bound to the model; "when we get the tool JSON schema, we'll run those tool ourselves". With ten thousand tools, memory proposes the subset a step needs, perhaps by category. While planning, the worker can ask memory for more tools.

**The fixed part and the thinking part need clearer separation.** "How will it know that it has now got to invoke the AI step? It can be done via code easily, but to do that, clarity and differentiation needs to be there." A third person reading the page should be able to follow it.

**Memory sees the whole business.** Memory is "like an agency within Tend". "A worker that is working on one particular situation cannot be given the responsibility of… reading the memory and knowledge of the whole business. That is not the boundaries it should be allowed to cross." The conversation manager also handles one interactor at a time. "So there needs to be some component that can see the whole thing and that can aid him. That is the memory and knowledge layer." So he did not understand why decision 5 limited memory to the speaker's own records.

The proposal page was revised on 27 October to answer each point. On 28 October Swaraj rejected the revision too; the next section says why.

## Swaraj rejects the proposal, and the work restarts, 28 October 2026

Swaraj read the 27 October revision and rejected it. His reasons, in his words:

- It engineered from a story. "How will the memory's fixed part add small set of Arjun's own finished situation?… He might have 10,000 of those." Stories are tests: "You engineer the solution based on the fundamentals that are required, and then you use the urgent [Arjun] situation and other… situation… to test your concept and your architecture by walking through and hypothesize. If that is failing, then you go back to the drawing board."
- It made fixed code do what code cannot. "Stop making the fixed code a hero… the code cannot do the things that you are imagining." "The fixed code of memory and knowledge layer that works with conversation manager will not work with situation worker. Both of them will have different fixed code components, and which will do very limiting jobs. Rest has to be done with the AI part."
- It let memory and knowledge decide. Its "main purpose is context engineering, not decision making."
- It used a channel address as a person. A person has "some sort of a unique ID, not a WhatsApp number".
- It assumed skills everywhere. "Not everything has a skill. We only have tools."

He set the method. Treat memory and knowledge as "an agency within the agency". Take it through the three levels: Level 1, an audit, then Level 2 answering every engineering question with its feasibility. Keep everything he said; "if the technical audits, the readability audits contradict them, throw them out. I am the boss here."

## Swaraj's answers, 28 October 2026

After the new Level 1 and Level 2 drafts, Swaraj answered the questions they raised. His answers:

- **Always "memory and knowledge".** "It is always memory and knowledge, never just memory or knowledge." Knowledge is situations, skill files and business rules linked together, with intelligent reasoning over them.
- **Retrieval is every technique we know.** Meaning search is not the same as retrieval. Retrieval "is a combination of all techniques known to us, that basically the job of which is to remove ambiguity out of the system and give us the proper relevant answers at that particular time across all relevant dimensions." His earlier research in the Creator-joy and J&F projects sets the pattern.
- **Memory and knowledge creates links.** "It should be the memory and knowledge layer that creates the link, not the worker."
- **The worker reaches the web; memory and knowledge learns.** Memory and knowledge says a subject is unknown and presents the skill files. The worker establishes the subject, guided by its prompt and the deep-research skill. Memory and knowledge then keeps what was learned, so the web is not searched again.
- **Outreach has a central situation.** "There is no such thing as a board." One situation per person, and one central situation linked to all of them. Every update goes to the central situation. The conversation manager decides whether the owner hears it. "Only significant things will be communicated."
- **Its AI runs at every part of the loop.** It runs before every part, observing so it can learn. When a decision ends the loop, it does not run.
- **The two run in parallel.** "We want the memory and knowledge layer and the loops to be slightly loosely coupled so that the execution is fast. It should be in two different threads… once it observes, it will shoot its lagging job working. And before running the next part of the loop… it will wait for the memory and knowledge layer's response, whether it says this is some knowledge you should have, or whether it says none, or an empty event."
- **Skills live in object storage.** Product skills and business skills alike are kept in object storage, versioned, not shipped with the code: "because they are also evolving all the time, and we don't want mismatch between different durable object and workers with the version of code they are running." They are still adapted to the loops.
- **Nothing is erased, except by a confirmed request.** "We do not erase anything." Where the law requires erasure, "not the AI will erase it": the AI may propose it inside a tool, and the tool's confirmation rule sends it to the owner or the configurator.
- **A business may extend Tend.** "They can add any skill text… They can connect with any MCP server that they want… And the memory and knowledge layer has to then inject the proper subset of tools at the appropriate junctions of the component of the loop."
- **The note about a foreign reference.** Asked about the 3 October note that a step is told "a foreign reference was seen and not opened", Swaraj said: "About the investor note, I don't understand what that is about, but if you think it should be removed, then remove it." Claude recommended removing it, and it was removed. (Corrected 29 October 2026: an earlier version of this list counted the removal as his decision.)
- **Read the Level 2 folder.** Most of the questions asked were already answered there: how links are proposed and reconciled, the incident link, the person as an identity-bearing anchor, who may see what, the learning modes. "Go and read this folder thoroughly… do not ask me some stupid questions."

What was decided from these answers is in [how memory and knowledge works with the loops](how_does_memory_and_knowledge_work_with_the_loops.md). That page listed seven changes to earlier decisions on 28 October (seven more were added on 29 October; see "Understanding comes first" below). Five come from Swaraj's answers (item 4 as Claude's recommendation, which he allowed):

1. Links are created and maintained by memory and knowledge. The situation worker no longer accepts or denies each link.
2. Outreach has a central situation, replacing the list and the board.
3. A business may write skills and connect any MCP server; skills live in object storage.
4. The note about a foreign reference is removed (Claude's recommendation, which Swaraj allowed).
5. A confirmed erasure tool may remove a person's data from situation records, the one exception to never rewriting them.

The other two come from the design itself: a claim can be sent from one situation to another, as a new kind of arrival; and memory and knowledge takes part in every part of the loops, replacing "a step asks for what it needs".

## Understanding comes first, 29 October 2026

Swaraj proofread the tests, starting with Arjun's story. His words:

> "does understanding not happen before routing when a message comes, or does, because before routing you have to understand the situations first and then route, right? Can you just remind me based on the level 2 answers, and does understanding happen before routing? If that is the case, then you first have to understand what does a Diwali sale even mean. I mean, that was the whole point why I snapped to you the last time"

> "You just disregarded understanding in itself. Look at the file memory and knowledge design test. The first thing should have been understanding where it would understand what the Diwali sale was about, and so in routing, when there is the retrieval thing, the retrieval would have been much simpler this time. We would just know the dates of the sales and we could just make a filter about that. It was such a simple routing thing, but we just complicated it. Can you not see the advantage we would get by understanding a particular thing beforehand, before doing any action?"

Then he asked for the whole conversation to be audited, not just the files: "how you will find your own mistakes that I have not found yet and then correct them. I do not want any more babysitting to you." He approved the plan with "go."

**What Level 2 says.** Understanding comes first, and routing comes from it:
- the Product Vision: "Tend should never take an action before understanding the situation";
- Level 1's "A customer starts a conversation": receive, then "Tend understands the situation";
- the ambiguity page, "What happens when a message arrives": build candidate interpretations first, then "apply the existing routing decisions";
- the relevance page: the component "understands the language in it. Based on that understanding, it attaches";
- the 4 September note on the understanding page: the conversation manager's MEANING step (its step that works out what a message means, as the harness study names it) is understanding at message entry, and its validated result becomes the next version.

One sentence said the opposite: "First — route… Second — understand", on the page "how do we determine whether multiple messages belong to the same situation". It describes the full update of the routed situation, which does come after routing. A note dated 29 October, under that page's Answer heading, now says so.

**What the audit found.** The registers, the trace and the 24 defects are kept in `memory_and_knowledge_drafts/` (files 40 to 46). They share two roots:

1. **Understanding had no place in the loops.**
   - Section 7 made the conversation manager a router that "only records and routes, and leaves the reasoning to the worker".
   - The 28 October design kept that, and put the sale's meaning in the worker, after routing.
   - Swaraj had said on 27 October: "First, it has to figure out the aspect of time."
2. **A person's visibility was applied to Tend's own reasoning.**
   - "Routing uses the sender's view" kept the business's own knowledge (the sale's dates) away from the step that needed it.
   - That brought back the 26 October "point 5" Swaraj had rejected: "memory and knowledge layer will basically see everything".
   - Level 2 already allowed the opposite: "Tend may use a confidential source internally while sending only a limited description externally."

The audit also found:
- routing searched past situations on the message's raw words, before the message was understood;
- the routing queue was keyed by channel address, not by person;
- a test invented a detail;
- tests were passed on their result, not their process;
- three quotes said more than Swaraj said;
- the design skipped the framework's alternatives, trade-offs, evaluation criteria and "when not to use".

**What changed**, in [how memory and knowledge works with the loops](how_does_memory_and_knowledge_work_with_the_loops.md):
- **The conversation manager understands first.**
  - Before it reasons, memory and knowledge hands it what understanding needs: the business's events and words found in the message, time, and earlier readings.
  - Its first turn writes **the reading**: what is asked, what it refers to, time words resolved to dates, claims, unknowns.
  - Candidates are then found from the reading, by exact filters.
  - The reading is saved in the situation's version, as an interpretation.
- **The worker understands what is new** before the business's strategy is presented. It does this when a wake brings content that is not yet placed in the full record.
- **Memory and knowledge uses the whole business's knowledge to help any step understand.** It shows a step only the records inside that step's boundary. What a person is told is still decided by the send check.
- **Routing looks at a person's past only through the reading.** The 3 October rule stands: a small set of the person's own finished situations when a message refers to a past purchase. It is now found by the reading's exact values first, such as the sale's dates.
- **The queue is per person.**
- **An arrival that is not work** creates no situation.
- **Memory and knowledge revisits its own earlier advice** at every point.

## What remains provisional

The conceptual direction is clear enough to write the Level 2 documents.

The following remain working decisions rather than implementation commitments:

- the exact memory-item fields;
- the exact claim-family identity rules;
- the exact set of update operations;
- the detailed context projection format for each phase;
- the exact shape of each step's written proposal, and of what memory hands back after reading it;
- the evaluation measures for automatic learning;
- and the storage and indexing mechanisms.

These are intentionally left at the Level 2 concept level and will be expanded during Level 2 architecture and Level 3.

## The product loop, later on 29 October 2026

Swaraj read the tests again and still saw no understanding section before routing in the stories. He asked whether understanding and routing were two components or one technical skeleton shared with the worker, and said: "we do not want that king of loop our loop is the philosophy with which we are working". Then: "the loops do not look natural to me … I am first and foremost a product engineer"; "Routing, I don't think would be much of a LLM thing"; and the harness study's purpose was to find the kinds of LLM loop each component may use inside, not to draw Tend's loops.

What changed for memory and knowledge:
- the loops are now [Tend's product loop](../the_product_loop/how_does_the_product_loop_work.md), with its own record of the conversation;
- the reading is now the understanding artifact, and deciding where an arrival fits is part of understanding; routing is code;
- the packages are named by the stage they precede, and come only before stages that reason; stages that are code are observed;
- a message that is not about the business starts no situation, and memory and knowledge never learns from it;
- the tests were walked again, one heading per stage, and two were added.

