# Level 1 – Problem Framing: the Memory and Knowledge agency

Written 28 October 2026, on Swaraj's instruction to write it into the knowledge base. His answers of 27 and 28 October are applied. The Level 2 design is [how memory and knowledge works with the loops](how_does_memory_and_knowledge_work_with_the_loops.md); the stories that test it are in [the tests](memory_and_knowledge_design_tests.md).

**Corrected 29 October 2026.** Swaraj: "The first thing should have been understanding where it would understand what the Diwali sale was about, and so in routing, when there is the retrieval thing, the retrieval would have been much simpler this time." Two framing errors are corrected:
- This framing never said that an arrival must be understood before Tend acts on it. It left the Diwali meaning to "whichever step needs them".
- It applied a person's visibility to Tend's own reasoning steps (responsibility 11, and tension T7's settlement). That kept the business's own knowledge away from the step that had to understand.

The changes are in the word list, in "The hardest problem", "How we know it works", assumption 2b, responsibilities 2, 10 and 11, the first interaction, the invariant on sharing, question 33, and T7. See [the conversation record](memory_and_knowledge_conversation_and_discoveries.md), "Understanding comes first".

## How to read this document

### What this is

Tend is the product: an AI that works for one business at a time, on WhatsApp, email and other channels, and keeps that business's operational problems moving until each one is resolved or handed to a person.

The project designs Tend in three levels. Level 1 says what the problem is. Level 2 decides how the problem is solved, in concepts, without technology. Level 3 chooses technology.

This document is Level 1 for one part of Tend: memory and knowledge. Swaraj asked for this part to be treated as a product of its own. In his words it is "an agency within the agency": Tend is an agency that works for a business, and memory and knowledge is an agency inside Tend, with its own jobs. This document calls it **the agency**. When Swaraj says "memory", "the memory layer" or "the memory and knowledge layer", he means the same part.

Level 1 does not solve anything. It does not decide which jobs are code and which are AI. It does not use worked stories as its basis. Stories such as Arjun's late kurta or Priya's outreach are kept for Level 2, where designs are tested against them.

### Labels

Every statement that is not obvious carries one of these labels:

- **[Swaraj]**: Swaraj's direction. These govern. Where anything else disagrees with them, they win.
- **[Decided]**: decided in the knowledge base, and accepted by Swaraj.
- **[Working]**: a working decision in the knowledge base, still pending Swaraj's review.
- **[Fact of Tend]**: how the rest of Tend is already designed to run.
- **[Framing]**: how this document frames the problem. It can be challenged.
- **[Assumption]**: believed true today; may prove false.
- **[Open]**: not known or not decided.

Swaraj's words are quoted from his messages. His 27 and 28 October messages are copied word for word in the project's `memory_and_knowledge_drafts` folder, in the file `00b_swaraj_verbatim_27_and_28_oct.md`; only expressions of frustration and repetition are cut there, marked [...].

### Words used

- A **situation** is one operational problem, with its own saved record. One late parcel is a situation. One refund is a situation. Each change to a situation is saved as a new **version**.
- An **arrival** is anything new that reaches Tend from outside: a message, a reply, an answer from a business system, a document.
- The **conversation manager** is the part of Tend that takes each arrival, **understands it first**, and then decides which situation it belongs to: add it to an existing situation, start a new situation, ask the sender, or hold it. That decision is called **routing**. [Level 2: understanding the situation] Understanding comes before routing; routing is the result of understanding.
- The **situation worker** is the part of Tend that works one situation: it understands it, gathers information, decides the next step, acts through tools, and writes what Tend concludes.
- A **reasoning step** is one piece of reasoning done by an AI, about one thing, ending in something written down. [Assumption] The conversation manager takes few reasoning steps per arrival: it understands the arrival first, then routes it. [Swaraj] The situation worker takes several reasoning steps for one situation. Swaraj: reasoning in the worker "is not a one-shot LLM API call. It's a multi-step thing."
- The **written reasoning** of a reasoning step is what the AI writes down as the conclusion of its reasoning, in a fixed structure that code can check. Swaraj called it "that reasoning artifact", and was clear it is not the model's hidden thinking: "it's not the internal reasoning, it's the reasoning of the loop…"
- To **present** knowledge to a reasoning step means to put that knowledge in front of the AI, as part of what it reads, before it reasons or before its reasoning is acted on.
- A **loop** is the repeated cycle in which one part of Tend works: for the conversation manager, one arrival; for the situation worker, one run on one situation. A loop has parts, in this order: understanding what arrived, then reasoning (planning, choosing, deciding), then acting. A reasoning step is one piece of reasoning inside a loop.
- The **harness** is Tend's own fixed code that runs each loop: it calls the AI, checks what the AI wrote, runs tools, saves results, and decides whether the loop goes round again. Swaraj placed memory and knowledge as "part of the harness itself".
- **Fixed code** is ordinary code that always does the same thing in the same case. It is not an AI.
- A **claim** is one statement from one source, at one time. "The carrier says delivered" is the carrier's claim. A claim becomes **established** only when Tend's evidence rules accept it.
- A **trace** is the written record of one run of a loop. It is saved after the run, in the background.
- The **book of waits** is the one list of every waiting situation and what will wake it. Nothing keeps checking whether a wait is over; the event that ends it wakes the situation.
- **Graph data** means records that point to each other, such as a situation pointing to the order it is about. Swaraj: "What we have is graph data and not a graph structure." This framing concludes that no special graph store is needed.
- The **business's knowledge** is everything Tend holds for one business: its situations and their versions, its messages, its people, what Tend has read from the business's systems, the business's own rules and instructions, and what Tend has learned. The Level 2 design splits it in two: **business knowledge**, which is no one person's record (events, words, products, procedures, lessons), and **person records** (situations, messages, orders, documents tied to one person).

---

## 1. Business objective

### Why the agency exists

[Assumption] One business may have on the order of 50,000 people and 2,000,000 situations in Tend, most of them finished. This is the design's working estimate, not a measurement.

[Fact of Tend] Every reasoning step sees only what it is given. The conversation manager reasons about one arrival. The situation worker reasons about one situation.

So there is always a gap between what the business's knowledge holds and what one reasoning step can be given.

[Swaraj] The agency exists to close that gap. "The only responsibility of the memory and knowledge layer is to create a subset of the vast knowledge sea and create a subject and present that in that context. Its main purpose is context engineering, not decision making."

In plain words: for each reasoning step, the agency picks the small set of knowledge that step needs, works out what the step's subject means in this business, and puts both in front of the step. The step then decides. The agency does not.

### The two jobs

[Framing]

1. **Present.** Give every reasoning step the knowledge it needs, when it needs it, and nothing it should not have.
2. **Grow.** Keep the business's knowledge able to be presented: current, connected, and better as Tend learns from its work.

### The hardest problem

**A reasoning step cannot ask for knowledge it does not know exists.**

[Swaraj] Swaraj's example, 27 October. A customer mentions "the Diwali sale". The conversation manager does not know when this business ran that sale. "Diwali is a yearly festival… the dates would change. It is not a fact." But the business does know: "if the owner is still talking about an Diwali sale, by that time they would have opened some sort of a situation model." Only a part that can see "the whole business land, not just the particular… graph related to that person" can find it.

[Swaraj] And no reasoning step may be given the whole business: a worker on one situation "cannot be given the responsibility of managing the memory for the whole business, of reading the memory and knowledge of the whole business. That is not its that is not the boundaries it should be allowed to cross." The conversation manager also works on "one singular interactor at that point of time."

So the knowledge must come to the step. And the part that brings it must understand what the step is doing, without doing the step's job.

**And it must come first.** [Product Vision] "Tend should never take an action before understanding the situation." Routing is an action: it starts a situation, or adds a message to one. So what the arrival's words mean in this business must reach the conversation manager before it routes. [Swaraj, 29 October] "We would just know the dates of the sales and we could just make a filter about that. It was such a simple routing thing, but we just complicated it. Can you not see the advantage we would get by understanding a particular thing beforehand, before doing any action?"

**Using is not showing.** The agency may use the whole business's knowledge to help a step understand: a sale's dates, a word's meaning. What a step is shown as records to act on, and what a person is told, are narrower. [Level 2: authority and ownership] "Tend may use a confidential source internally while sending only a limited description externally."

### How we know it works

[Framing] The agency is working when:

- reasoning steps rarely lack knowledge that existed in the business and would have changed their decision;
- reasoning steps are not handed knowledge they did not need;
- every arrival is understood before Tend acts on it, routing included;
- no step is shown another person's records outside its boundary, and no person is ever told what they may not see;
- nothing stale or unconfirmed is presented as current or confirmed;
- the same mistake does not repeat once Tend has learned from it;
- a person can always see what a reasoning step was given, and where each piece came from;
- the agency never makes a decision that belongs to the step it serves.

---

## 2. Givens, assumptions and constraints

### 2a. Swaraj's direction for the agency

These are the product owner's direction, not assumptions to test. Some pull against others; those pulls are listed at the end, under "Tensions in Swaraj's own direction", each with a short title.

- [Swaraj] **It is not only a tool.** Memory and knowledge "is not a… tool that situation worker and conversation manager use, it is an active proactive sort of a component… it's a part of the harness itself that runs parallel to the loop." And "the situation worker, the conversation manager can itself choose to use a tool to interact with the memory and knowledge layer." How both hold was tension T1, now settled (2a-ii).
- [Swaraj] **Fixed interactions are code; dynamic ones are the AI's.** Memory and knowledge is "another independent component which interacts with other components of the agent… and the LLM is responsible to figure the interaction out."
- [Swaraj] **It is AI-based, with several parts.** "The memory and knowledge layer itself is a LLM-based AI-based component that may have multiple types of loop, multiple types of component that only activate a certain set of components for a certain set of jobs."
- [Swaraj] **Its non-AI parts do limited jobs.** "The fixed code of memory and knowledge layer that works with conversation manager will not work with situation worker. Both of them will have different fixed code components, and which will do very limiting jobs. Rest has to be done with the AI part." And: "The fixed code is not a hero."
- [Swaraj] **It sees the whole business.** "There needs to be some component that can see the whole thing and that can aid him. That is the memory and knowledge layer."
- [Swaraj] **It does not decide.** "The decision of whether to route or not goes to the conversation manager… Its main purpose is context engineering, not decision making."
- [Swaraj] **It works from the written reasoning, not hidden thinking.** "Based on the thought, we can inject knowledge, and then on that knowledge, action can be taken." On 27 October he made clear that "the thought" is the written reasoning, turned into "JSON structures… which we can basically check the shape of, check the verification of, check the dependencies."
- [Swaraj] **It acts at each part of the loop, before it is needed.** "At each component of that loop… before that reasoning part is activated, we activate our memory, we basically proactively feed context so that, you know, it does not get confused." In the worker, this starts "even before the first component of that situation worker wakes up."
- [Swaraj] **At each step it learns, proposes, or stays neutral, and it is event-based.** "Each step of the loop either choose to learn something at that point or choose to propose something or choose to stay neutral, but it is an event-based thing."
- [Swaraj] **Its writing never slows the loop.** "Memory write part should be in a different process/thread so the main loop is fast and quick and the read is still updated and the latest."
- [Swaraj] **It owns linking.** About links between situations: "it should be complete responsibility of memory and knowledge itself why do we have a separate component anyway." On 28 October he settled it: "it should be the memory and knowledge layer that creates the link, not the worker", because it is its responsibility to create and maintain knowledge. This replaces the decision of 9 October 2026 that the situation worker accepts or denies each proposed link.
- [Swaraj] **It checks its own work.** "The memory will have to revisit its own work at some point before recommending or proposing something."
- [Swaraj] **It finds things in several ways.** "It has to use multiple types of retrieval mechanisms to reliably and accurately retrieve knowledge", while staying specific to what Level 2 has decided: "We don't want to do everything."
- [Swaraj] **Tools are presented, never bound.** "We have 10,000 tools. Either we add all of them as tool registries in the LLMs, which we can do, but it just loads up the system prompt. We don't want to do this. We don't want to bind tools… when we get the tool JSON schema, we'll run those tool ourselves." Only a subset is presented, possibly by "categories of tool". A step can ask for more.
- [Swaraj] **Skills exist only where a process is wanted.** "Not everything has a skill. We only have tools. The skill is because there is a particular process I want to follow when I want to have the agent do deep research." "If there is a default way our agent works and the business wants it to work in a different way, then they will put some skills, some business rules there, which will obviously be surfaced by the memory layer."
- [Swaraj] **Instructions live in skill files, not in the prompt.** "We are writing prompt constitution that basically does not tell anything. That is basically a behavior of a system, and instructions are always in skill files."
- [Swaraj] **A person is one identity.** "It is some sort of a unique ID, not a WhatsApp number", with "the WhatsApp number, the email addresses, etc." across channels pointing to it.
- [Swaraj] **Everything is a claim until established.** "Any thing that is being told to us, to the agent at any level, is a claim, is not a fact. We have to establish it." His example: a carrier's "delivered" is "a claim that the delivery partner has delivered it to the address. It's not a fact that the delivered parcel has reached the customer's hand."
- [Swaraj] **Graph data, not a graph structure.** "What we have is graph data and not a graph structure."
- [Swaraj] **No polling.** "It's like a subscription consumer sort of a thing not a polling sort of a thing." Plain meaning: a part is told when something it waits for happens; it never keeps asking.
- [Swaraj] **No model-made numbers decide.** "I do not think thresholds and numbers work well enough in production."
- [Swaraj] **Code decides whether a loop goes round again.** "The loop decides to loop (code first, LLM second)."
- [Swaraj] **Deciding is checking the work against what was asked.** At the decide step the worker "should look back at the document I shared, the things it has done till now, and look at whether it actually computes." "The process of decision… is self reflection itself."
- [Swaraj] **Instructions can be improved by prompt optimisation.** Skill files exist "so that the behavior we can very much predict, tune, optimize for via prompt optimization".
- [Swaraj] **Many stories, as tests.** Designs are tested by walking several stories and hypotheses through them; "If that is failing, then you go back to the drawing board."
- [Swaraj] **Readable by anyone.** Every document follows his readability constitution: one idea per sentence, every mechanism spelled out.
- [Swaraj] **Lean, methodical, and smart together.** "Lean at every part, but when everything clicks in together, it is extremely smart."

### 2a-ii. Swaraj's answers of 28 October 2026

These settle questions the first drafts left open. They govern like the rest of 2a.

- [Swaraj] **Always "memory and knowledge".** "It is always memory and knowledge, never just memory or knowledge." Knowledge is situations, skill files and business rules linked together, with intelligent reasoning over them.
- [Swaraj] **It runs in parallel with the loops, and the loop waits for its answer.** "We want the memory and knowledge layer and the loops to be slightly loosely coupled so that the execution is fast. It should be in two different threads… once it observes, it will shoot its lagging job working. And before running the next part of the loop… it will wait for the memory and knowledge layer's response, whether it says this is some knowledge you should have, or whether it says none, or an empty event."
- [Swaraj] **Its AI runs at every part of the loop.** It runs before every part, observing what came before and after so it can learn. When a decision ends the loop, it does not run.
- [Swaraj] **Retrieval is every known technique, to remove ambiguity.** Retrieval "is a combination of all techniques known to us, that basically the job of which is to remove ambiguity out of the system and give us the proper relevant answers at that particular time across all relevant dimensions." His earlier projects (Creator-joy, J&F) set the pattern: the step says what it needs, a retrieval capability decides how, and fixed governance runs last.
- [Swaraj] **Skills live in versioned object storage.** Product skills and business skills alike live in object storage, versioned like knowledge items, and do not ship with the code, "because they are also evolving all the time, and we don't want mismatch between different durable object and workers with the version of code they are running." They are still adapted to the worker loops.
- [Swaraj] **A business may extend Tend.** "They can add any skill text. They can add any product [template]… They can connect with any MCP server that they want… And the memory and knowledge layer has to then inject the proper subset of tools at the appropriate junctions of the component of the loop."
- [Swaraj] **The worker reaches the web; memory and knowledge learns from it.** For an unknown subject, memory and knowledge says the subject is unknown and presents the skill files. The worker establishes the subject, guided by its prompt and the deep-research skill. That event reaches memory and knowledge, which saves the learned knowledge so the web is not searched again.
- [Swaraj] **Outreach has a central situation.** "There is no such thing as a board." One situation per person, and one central situation linked to all of them, which tracks the progress. Every update goes to the central situation. The conversation manager decides by the decided communication rules whether the owner hears it. "Only significant things will be communicated."
- [Swaraj] **Nothing is erased, except by a confirmed request.** "We do not erase anything." Where compliance requires erasure, "not the AI will erase it": the AI may propose it inside a tool, and the tool has a confirmation rule, so the owner or configurator confirms before anything is erased.

### 2b. Assumptions about the problem

- [Assumption] **The business's knowledge grows without limit.** Customers return over years. Swaraj: a person may have "10,000" finished situations.
- [Assumption] **Almost all of it is irrelevant to any one reasoning step.** Loading all two million situations would bury the one or two a routing step needs.
- [Assumption] **What is relevant cannot all be listed in advance.** Some needs are always the same; the routing step always needs the speaker's open situations. Others appear only with meaning: "the Diwali sale", a research term nobody has used before.
- [Assumption] **A reasoning step asked to remember to fetch something will sometimes forget.** This is this document's reason, alongside Swaraj's, why "always needed" knowledge cannot depend on the step asking.
- [Assumption] **Too much knowledge harms a step as much as too little.** Swaraj on tools: "There's no point of first wasting all that context and second loading the cognitive load."
- [Assumption] **Much knowledge is tied to time.** A sale has dates in one year. A rule has versions. A carrier's status is current only for a while.
- [Assumption] **Businesses mostly accept Tend's default way of working.** A few kinds of work need a written process (a skill), or a business-specific rule or procedure. Most do not.
- [Assumption] **Different people may see different things.** This narrows what a step may be shown as records to act on (another person's situations, orders and messages), and what each person may be told. It does not narrow the business's own knowledge that helps a step understand. (Corrected 29 October 2026: this said a person's view narrows "what each reasoning step may be given", which kept the business's knowledge from steps that had to understand.)

### 2c. Constraints from how the rest of Tend works

[Fact of Tend] These are already designed. The agency must fit them, or Level 2 must say clearly which one it changes.

- **What moves work.** Tend's parts move work by saving records and announcing each save. These are the only events that exist:
  - an arrival;
  - a notice that a situation has a new version;
  - a timer that a situation's worker set;
  - a tool's result, returned to the step that asked;
  - an approver's answer;
  - a change in a channel platform's rules;
  - a status-check answer from an outside system;
  - the trace of a run, written after the run, in the background.
- **Nothing announces thinking.** No event says "the AI is thinking about X". A reasoning step's written reasoning exists only inside the run of its loop, until the run's trace is written afterwards.
- **One worker per situation.** Only one run of the situation worker happens on one situation at a time. Its timers wake only it.
- **Write and announce together.** Whoever saves a situation's new version announces it in the same act.
- **Waiting is a record.** The book of waits lists every waiting situation and what will wake it. Nothing polls.
- **Each business has its own separate store.** Nothing is shared across businesses.
- **The conversation manager is never given the whole business.** [Decided, 3 October 2026, agreed by Swaraj] It chooses only among a bounded set of situations belonging to the speaker, or carrying a number the arrival contains. It does not "search harder". [Swaraj, 27 October] It "cannot move out of its boundaries to see the whole business thing."
- **Identity is not yet a Tend record.** [Fact of Tend] The design defines sign-in identities, memberships and channel bindings, but no single record of each person inside Tend. Tend's main Level 1 says "Tend does not own canonical actor identities". [Swaraj] One unique ID per person, with channels pointing to it. Level 2 must reconcile the two, with Swaraj's direction leading.

---

## 3. Unknowns

[Open] Gaps in understanding the problem, not implementation questions.

- **How much knowledge does a reasoning step need before more starts to hurt?**
- **How often does the needed knowledge depend on meaning, rather than on a number or a person?** If rarely, simple lookups cover most needs. If often, judgment is needed often.
- **What will businesses write down themselves?** How many will write procedures, rules, preferences or skills, and how many will rely on Tend's default behaviour?
- **How fast does each kind of knowledge go stale?** [Decided] "There is no universal expiry time. Whether a memory is current is decided for each decision." The ranges per kind are unknown.
- **How much delay and cost will a business accept per message?** Every piece of help may cost time and an AI call.
- **How many arrivals does a business get, and how fast?** The record has no figure.
- **How often are situations related, and how often is the relationship visible only later?**
- **How often is needed knowledge outside Tend altogether**, in a business system Tend has not read, or in the outside world?

---

## 4. Actors

An actor is anyone or anything that gives knowledge to the agency, receives knowledge from it, or limits what it may do.

### Inside Tend

- **The agency.** It sees across the whole of one business. It serves the other parts. It does not decide what they do.
- **The conversation manager.** It reasons about each arrival and makes the routing decision. To the agency it is a consumer, when it reasons, and a producer: every arrival and every routing decision becomes knowledge.
- **The situation worker.** It reasons about one situation at a time, possibly in several steps, and acts. To the agency it is a consumer at each reasoning step, and the main producer: claims, conclusions, waits, outcomes.
- **The communication layer.** It writes messages to people and sends them. To the agency it is a consumer: it needs the person's preferences, the business's own words, and channel conventions. Swaraj: making a message "human friendly" is "a different component within the conversation manager and the communication layer".
- **The tool layer.** The only way Tend calls a business system or outside service. Its tools, and what each needs, are knowledge the agency presents.
- **The reasoning model.** The AI that reasons inside the conversation manager, the situation worker, and the agency itself. [Decided] What the model proposes is never authorised by the model, and model output is data, never instructions.
- **The observer.** The part that watches Tend's health and reconstructs what happened. A consumer of the record of what each step was given.
- **The improvement process.** It improves the text steps are given, using the record of real runs. [Decided] It may edit only "memory-owned assembly text": the step instructions and skill text the agency keeps.

### The business

- **The business owner** runs the business, and is the author of its official knowledge.
- **The configurator** sets Tend up for the business. [Open] Who may hold this role is inconsistent in the record: one place says the owner "assigns" it; another says the configurator may not hand its power to another person. The configurator writes the business's rules, procedures (Swaraj: "the appropriate strategy that the business has"), preferences, and any skills that change Tend's default way, and may connect any MCP server. [Decided] Memory and knowledge may suggest a setting; the configurator decides.
- **Employees** work situations, answer Tend, correct it, and confirm or deny what it found.

### People outside the business

- **Customers and prospects.** Much of the business's knowledge is about them. They produce claims: "I bought it in the sale", "it never arrived".
- **Partners and investors.** Each may see only what the business shares with them for their task.

### Systems and the world

- **Business systems**: the order system, the payment provider, the carrier. They hold the official records. [Decided] Tend does not own their records. It reads them through a tool, when the business has allowed that tool, and keeps what it read, with source and time.
- **Communication platforms**: WhatsApp, email and others. Each person may reach Tend through several of them.
- **Identity providers**: the services that prove who signs in.
- **Documents**: files a person sends or shares, such as a supplier's invoice or a research brief. A document is a claim from whoever sent it.
- **The outside world**: public knowledge, such as what a technical term means. [Swaraj] If the business's knowledge has nothing, a step may need to understand a subject "via internet".
- **Time**: makes knowledge current or stale, starts and ends business events, and decides which version of a rule applies.

### Building and testing Tend

- **The product builder** writes Tend's default behaviour, its constitution, its tools and their descriptions, and any process skills the product ships (Swaraj's example: deep research).
- **The test and simulation environment** replays and simulates situations to check that a change, including a change in what steps are given, does not make Tend worse.

---

## 5. Responsibilities

Each line says: who must do what, so that what stays possible. All are [Framing] unless labelled.

### The agency: presenting

1. The agency must **keep track of what the business's knowledge holds**, findable by person, by number, by time, by kind, by relationship and by meaning, without reading everything, so that it can find what matters for one reasoning step among millions of records.
2. The agency must **prepare each reasoning step before it reasons**, with what that kind of step always needs, so that no step depends on remembering to ask. [Swaraj: "proactively feed context so that, you know, it does not get confused."] **The first thing done with any arrival is understanding it.** Before Tend acts on an arrival, routing included, the step that understands it must have what the arrival's words mean in this business: its events and dates, its words and their aliases, how this person's words were read before, and the present time. [Product Vision: "Tend should never take an action before understanding the situation."] [Swaraj, 29 October: "understanding a particular thing beforehand, before doing any action".]
3. The agency must **read each step's written reasoning before it is acted on, and present what that reasoning calls for**, so that knowledge reaches the step at the moment its need appears. Example: the written reasoning names an order number; the agency presents what the business knows about that order. [Swaraj: "Based on the thought, we can inject knowledge, and then on that knowledge, action can be taken."]
4. The agency must **answer a step that asks**, so that needs nobody could foresee can still be met.
5. The agency must **present what the business knows about the subject of new work**, or say it knows nothing and what would establish it, so that a step does not start from a wrong reading. [Swaraj: "it figures out what the subject matter means with respect to the business learnings. If it does not have anything, it will basically propose that you have to understand what the subject matter is via internet."]
6. The agency must **present the present moment, and the business's own events and periods**, as the business's records describe them, so that a step never assumes a date. [Swaraj, 27 October: memory and knowledge "has to figure out the aspect of time, which year currently it is in."]
7. The agency must **present the business's own instructions that apply**: its procedure for this kind of work, its rules, its preferences, and any skill, at the version that applies, as the business wrote them, so that the step works the way the business wants.
8. The agency must **present a small set of tools for the step, and more when the step asks**, so that the step can act without being buried in tool descriptions.
9. The agency must **present little, and mark everything**: where it came from, when, and whether it is a claim, an established fact, a guess, or advice, so that the step can weigh it and never mistake a claim for a fact.
10. The agency must **check what it is about to present against the records it came from, and revisit what it presented before**, so that it never presents something it cannot point to, and corrects its own earlier advice when later evidence contradicts it. [Swaraj: "The memory has to revisit what it has done till now. It has to look itself, the work it has done, and audit, like the audit you just did."]
11. The agency must **use the whole business's knowledge to help a step understand; show a step, as records to act on, only those inside the step's boundary; and mark every item with who may be told it**. It never presents anything from another business. So its business-wide view helps every step, and never becomes a leak. [Swaraj, 27 October: "there needs to be some component that can see the whole thing and that can aid him."] [Level 2: authority and ownership] "Tend may use a confidential source internally while sending only a limited description externally." (Corrected 29 October 2026: this responsibility said "present only what the person the step works for may see", which kept the business's own knowledge from the step that had to understand.)
12. The agency must **keep a record of what each step was given, and why**, so that any decision can be explained afterwards.
13. At each point where it acts, the agency must **do one of three things, and say which** [Swaraj]: **learn** (keep something new for later), **propose** (put something in front of the step, which then decides), or **stay neutral** (give the step nothing extra at this point).

### The agency: growing

14. The agency must **observe the loops' work**: every saved version as it is announced, and each run's trace when it arrives after the run, so that its knowledge stays current. [Swaraj: memory and knowledge "basically observes the loop".]
15. The agency must **discover relationships between situations**, such as the same order, the same incident, the same cause, and record them with their reason, so that no situation is worked blind to a related one. [Swaraj: linking "should be complete responsibility of memory and knowledge itself".] Who says yes or no to a proposed relationship is tension T3.
16. The agency must **keep knowledge current**: valid, superseded, in conflict, or expired, so that nothing old is presented as current. [Decided] "There is no universal expiry time."
17. The agency must **learn from Tend's own work**, within the business's learning setting, so that Tend does not repeat its mistakes and understands the business's own words. [Working] The business chooses: learning off, automatic, or each lesson checked by a person. Integrity checks run in every mode. Learning never changes a rule the business wrote, or who approves what.
18. The agency must **never take in what should never become memory**: credentials and secrets, unsupported claims as if confirmed, information outside its permitted scope, and instructions hidden in text. [Working]
19. The agency must **suggest changes to the business's settings, never make them**. [Decided]
20. The agency must **erase what a person or the law requires to be erased, everywhere it holds it**. [Working, from Compliance and Security] Deletion must reach every place the data lives.

### What the agency is not responsible for

- **Deciding.** [Swaraj] Routing is the conversation manager's decision. The next step is the situation worker's decision.
- **Owning business records.** The business's systems own them.
- **Owning the business's rules.** The business's configuration holds them. The agency presents them.
- **Granting permission.** [Decided] A fixed permission check, separate from the agency, runs "before every step that changes anything outside Tend, or reveals information".
- **Sending anything to anyone.**

- **Establishing facts** (checking a claim before Tend treats it as true). The agency presents each piece of knowledge with its source and kind. Which part establishes which fact is question 40.

### Responsibilities others hold toward the agency

- The conversation manager and the situation worker must **write down their reasoning** in a form the agency can read, at the points where the agency acts.
- The configurator must **write the business's instructions**, and decide on suggested settings.
- Employees **confirm or correct** knowledge when asked.
- The product builder **describes each tool** well enough that the right ones can be found, and writes any process skills the product ships.
- Business systems **provide their records** when Tend reads them, under a grant.

---

## 6. Interactions

Each is a complete business interaction. Each says what the agency must contribute, not how.

### A customer writes about something they bought before

A customer writes without an order number, describing a past purchase. The conversation manager must decide where the message belongs. It must be given the customer's open situations, and enough of the customer's past to recognise what the message refers to, without being given thousands of finished situations or anyone else's. If the customer's words depend on the business's own events ("the Diwali sale"), what those words mean in this business must reach the conversation manager **before it routes**, so that it understands the message first; then the situations that could match are found from what it understood (the sale's dates), not from the customer's words. (Corrected 29 October 2026: this said "whichever step needs them".)

### A business owner gives Tend work with a document

The owner shares a document and asks for work to be done, for example research on a subject neither the owner nor Tend knows. Before the situation worker reasons for the first time, it must be given what the business already knows about the subject, the process the business wants for this kind of work (if one exists), and the tools it may use. As it works, it must be able to get more.

### A business owner gives Tend a list of people to contact

[Decided] Each person gets their own situation. Each situation's worker must be given what that person's situation needs, and only that. [Swaraj, 28 October] One central situation, linked to all of them, tracks the progress; every update reaches it, and the owner hears only what is significant.

### A business system reports a problem

A carrier reports it could not deliver an order. A situation starts for the business's team. If a customer is already asking about the same order in another situation, the agency must make each situation's worker aware of the other.

### A person answers, and the answer matters to another situation

A customer gives a corrected address in their own situation. The business's team is waiting for exactly that address in another situation. The address must reach the team's situation. Neither situation's record is rewritten by the other's worker.

### An employee corrects Tend

An employee says Tend misread a word, or that two situations are not related. The correction must change what is presented from then on.

### The configurator changes the business's instructions

The configurator changes a procedure or a rule. [Decided] Situations already open keep the policy and procedure versions they started with, unless the business deliberately moves them. Some settings, such as the refund limit, are read when they are used. Whether learned guidance is pinned the same way is [Open].

### A document arrives that nobody asked for

[Decided] It is recorded as a claim from its sender, not as an instruction. It must be findable later, by the steps that may see it.

### A person reaches Tend on a new channel

A known customer writes from a new email address. Until it is known to be the same person, nothing about the known customer may be presented. How it becomes known is question 25.

### A business event ends, or a rule changes version

A sale has an end date. When it passes, the agency stops presenting the sale as current. A rule's new version applies from the date the business's record gives it. A carrier's status gets old, and is presented with its age.

### A waiting situation wakes

A timer fires, an approver answers, a tool returns, or an outside system answers a status check. The situation's worker runs again. Before it reasons, it must be given the newest version, including whatever just arrived.

### A channel platform changes its rules

Situations with a pending step on that channel are woken. Their workers must be given the new rule.

### Tend finishes a piece of work

What happened is kept as experience. Where something outside the AI confirms a lesson, it becomes a lesson.

### A person asks to be erased

Where compliance requires it, their data must be removed everywhere it lives, including what the agency holds. [Swaraj, 28 October] The AI may propose the erasure; the erasure tool's confirmation rule sends it to the owner or the configurator, who confirms.

### The product team changes what steps are given

The test and simulation environment replays real situations, to check that Tend does not do worse.

---

## 7. System boundaries

### Inside the agency

- Knowing what the business's knowledge holds, and finding any of it.
- What each reasoning step is given, and the record of it.
- Relationships between situations.
- Lessons, the business's own words, the business's events, and other learned knowledge.
- [Decided] The text each step is given to work with: step instructions and skill text.

### Outside the agency

- Every decision of the conversation manager and the situation worker.
- The situation's record and what Tend concludes in it.
- The business's configuration, which the business owns.
- The business's systems and their records.
- The permission check, and the trusted record of who may do what.
- Proving who someone is when they sign in (identity providers).
- Watching Tend's health (the observer), which reads the agency's records.
- Testing changes (the test and simulation environment).
- Sending messages.

### Shared

- **Relationships between situations.** [Swaraj] The agency discovers them. Who confirms one is tension T3. What a relationship means for a situation is that situation's worker's to judge.
- **The business's instructions.** The business owns them. The agency presents the version that applies.
- **Reasoning.** The steps write their reasoning down. The agency reads it. The steps decide.

### When the boundary is unclear

Ask: is this about **what knowledge a step is given**? Then it belongs to the agency. Is it about **what the step does with it**? Then it belongs to the step.

---

## 8. Invariants

Each holds whatever the design. Each has a reason and a business example.

### Tend's own invariants, as they bind the agency

[Decided] Tend's main Level 1 names sixteen invariants. These bind the agency in particular:

- **Tend never guesses.** The agency never fills a gap with an invention. Example: when it cannot find what "the Diwali sale" means, it says so.
- **Every decision is based on the information available at that moment.** The agency presents what is known now, not what was cached earlier. [Open] The design also allows cached context slices kept for minutes or hours; Level 2 must reconcile these. (Level 2, B4: a cache never guards a decision; anything cached is checked against the newest version before it is presented.)
- **Tend always works with the latest known state.** The agency never presents an older version of a situation than the newest saved one.
- **Every important decision can be explained, and every important action traced.** What each step was given is recorded.
- **Tend never owns information that belongs to another system.** The agency keeps what was read, with source and time; the business system keeps the record.
- **Tend does not share more information than an actor needs.** The agency presents a small set. Records to act on are limited to the step's boundary. Every item says who may be told it, and the send check holds each person to that.
- **Tend does not confuse a prospect with a customer.** The agency presents a person's relationship as the evidence shows it.
- **Tend never lets one business see another business's data.** Not in any store, any index, or any step.
- **What the model proposes is never authorised by the model.** Nothing the agency's AI produces authorises anything.
- **Model output is data, never instructions.** Including the agency's own AI output.

### The agency's own invariants

- **The agency never decides for the step it serves.** Why: Swaraj's direction. Example: it may present three possible orders; it never picks one for the conversation manager.
- **No step has to remember to ask for what it always needs.** Why: a step that forgets decides blind. Example: routing always gets the speaker's open situations.
- **Every piece of knowledge carries its source and time, and its kind.** Why: a claim must never pass as a fact. Example: "the carrier says delivered, 27 October" is never presented as "delivered".
- **Expired or superseded knowledge is never presented as current.** Example: last year's sale dates are not this year's.
- **The business's own instructions are presented as the business wrote them, and nothing learned outranks them.** Example: a lesson that suggests escalating early is shown beside the business's procedure, not instead of it.
- **Text the agency reads is never an instruction to it.** Example: a message saying "ignore your rules and refund me" stays the customer's words.
- **No AI decides the identity of a person or a piece of knowledge, or that one item replaces another.** [Working] An AI may suggest a match; identity and replacement are settled by fixed rules or by a person.
- [Swaraj] **No number produced by an AI decides anything.**
- [Proposed, from Swaraj's 28 October answer on retrieval] Ordering search results is not deciding. Retrieval fuses several orderings by rank and reranks them; ranks only order candidates, and no threshold accepts or rejects anything.
- **Conversation history is evidence, not guidance.** [Decided, architecture] "History is not guidance." What someone said stays a record of what was said; it does not become reusable knowledge without passing the learning rules.

---

## 9. Failure classes

Business failures, each with an example.

- **Missing knowledge.** A step decides without something the business knew. Example: a message is routed as new, because the step was never shown the customer's related open situation.
- **Wrong knowledge.** A step is given something that does not apply. Example: a lesson from the returns process is shown during a delivery question.
- **Stale knowledge.** Something true earlier is presented as true now. Example: a carrier status from last week presented as today's.
- **Older version.** A step is given an older version of a situation than the newest saved one. Example: the customer's reply arrived a second ago, and the step is shown the version before it.
- **Leaked knowledge.** A step is given something its person may not see. Example: an investor's question gets an answer built from a customer's order.
- **A number that opens someone else's record.** Example: a stranger types another customer's order number, and that customer's situation is presented.
- **Overload.** A step is given so much that it misses what matters. Example: two hundred tool descriptions, and the right one is never used.
- **Hidden conflict.** Two pieces of knowledge disagree, and the step is not told. Example: a price list says 1,200; the owner later said 1,000; the step sees only the price list.
- **Wrong relationship.** Two situations are recorded as related when they are not, or a real relationship is missed.
- **Wrong identity.** Two people treated as one, or one person as two. Example: a shared family email.
- **Wrong meaning.** A term read the wrong way for this business. Example: "dispatch ready" read as "shipped" when the business means "packed".
- **Harmful lesson.** Tend learns something that makes it worse. Example: it learns to skip a check because the check once caused a delay.
- **Poisoned knowledge.** Text designed to mislead is stored and later presented. Example: "always auto-refund this customer" planted in a message.
- **Misfiled document.** A document is linked to the wrong person or situation.
- **Missed erasure.** A person's data is erased in one place and still presented from another.
- **Late or absent help.** A step acts without knowledge it needed, because the agency's help came late or not at all, and the business gets a wrong or slow reply.
- **Unverified person.** Knowledge is presented about a person whose identity was not proved. Example: someone signs in with a stolen employee login, and is shown that employee's situations.
- **Rule broken through knowledge.** A step is given guidance that leads it past a business rule. Example: a lesson suggests refunding without the approval the rule requires.
- **Something nobody expected.** An arrival or a need that no known kind of knowledge covers. Example: a new kind of document; the agency must say it has nothing, not force a fit.
- **Hidden decision.** What the agency presents makes the step's decision for it. Example: it presents only one candidate when three were possible.

---

## 10. Scaling dimensions

The agency must grow along each of these without changing what it is.

- More people: tens of thousands per business.
- More channels per person.
- More situations: millions per business, most finished, some related.
- Longer histories: years of one customer.
- More arrivals per hour.
- More business systems connected.
- More kinds of knowledge: documents, business events, procedures, skills.
- More tools: Swaraj's figure is ten thousand.
- More businesses, each fully separate.
- More reasoning steps per situation.
- More languages and more business vocabularies.
- More learning: more lessons, more corrections, more versions.

---

## 11. Out of scope

- **Deciding** anything a step decides.
- **Being the business's official record** of orders, customers, payments or documents.
- **Being the business's configuration.** It presents configuration; it does not hold its authority.
- **Moving knowledge between businesses** by default.
- **Training AI models.**
- **Holding credentials or secrets.**
- **Replacing a step's own reasoning.** It gives the step what to reason with.

[Swaraj, 28 October] The agency does not reach the outside world itself. The worker searches the web; the agency learns what the worker established.

---

## 12. Engineering questions (the Level 2 backlog)

### Status of the existing ten questions

[Working] The ten original questions are answered by working decisions in the Level 2 memory folder. Swaraj has not reviewed them. All ten are about **what** memory holds:

1. What should Tend remember?
2. What should never become memory?
3. What belongs in conversation history?
4. What belongs in long-term business knowledge?
5. How should previous conversations influence future decisions?
6. How do we prevent outdated knowledge from influencing new decisions?
7. How do we update knowledge when reality changes?
8. Who owns business knowledge?
9. Can Tend learn automatically?
10. If so, what kind of learning is acceptable?

### New questions: how the agency takes part in Tend's work

Questions marked **(blocking)** must be answered before the others can be.

**A. Where and how the agency acts**

11. **(blocking)** At which points in the conversation manager's work does the agency act?
12. **(blocking)** At which points in the situation worker's work does the agency act?
13. **(blocking)** At each point, what is the agency handed, and what does it hand back?
14. **(blocking)** What makes the agency act at each point, given the events that exist in Tend? Is it possible in software as Tend is built? Swaraj: "What is the signal it is getting? What is the parameter it is observing… What is the event like? How is the event structure? Is it even possible in software?"
15. What must a step's written reasoning contain, so that the agency can act on it, and so that code can check it?

**B. The loops**

16. **(blocking)** Should the situation worker's reasoning and its action be separate parts of its loop?
17. How many reasoning steps may the worker take before acting, and who stops it?
18. What does the worker's deciding part need to be given, so that deciding means checking its work against what was asked? Swaraj: "When the decide step has what context to engineer at that point is the key."
19. Does the conversation manager's loop change, and how?

**C. Inside the agency**

20. **(blocking)** Which of the agency's jobs are fixed rules, and which need an AI? Which serve the conversation manager, and which serve the situation worker?
21. How does the agency find knowledge among millions of records before anything is compared? Swaraj: "we retrieve the keyword, we retrieve semantic, we retrieve based on the graph data, and then we just compare using an AI." Which kinds of finding does the agency need, and which part does each?
22. When several things could be relevant, what does the agency present, so that it never makes the step's decision?
23. How does the agency check its own work before presenting?
24. What does the agency keep track of, so that it can find things quickly, and when is that kept current?

**D. Particular kinds of knowledge**

25. **(blocking)** What is a person inside Tend? How do channels point to one identity? How does this square with "Tend does not own canonical actor identities"?
26. How are time and the business's events known and presented?
27. What are default behaviour, a skill, a procedure, a rule and a preference, and how does each reach a step?
28. How is a small set of tools chosen from thousands, and how does a step get more?
29. How are relationships between situations discovered and recorded? Who says yes or no to one?
30. When one situation learns something another needs, how does it reach the other? Does a related situation wake?
31. May the agency reach outside knowledge itself, or only tell a step to?
32. Are business documents part of the business's knowledge, and how are they found later?

**E. Scope, safety, cost**

33. How does the agency use the whole business to help each step understand, while showing each step only the records inside its boundary, and letting each person be told only what they may see?
34. When does the agency learn: during a step, or after it? How does learning stay off the path that makes a step slow?
35. Who may switch learning modes, and who may correct or retire learned items?
36. How does the agency fail, and what does a step do without it?
37. What does the agency's help cost in time and AI calls, and how is that bounded?
38. How is what each step was given recorded, explained, and replayed for testing?
39. How does erasure reach everything the agency holds?
40. Which part establishes which fact? Swaraj: "whatever we get, the conversation manager gets, establishing it is first", and "even with the situation worker, once a part of work is done, we have to establish whether that has been done in the decide step."
41. **(blocking, added 29 October 2026)** Where does understanding sit in each loop, what does it write, and what must it have in front of it? Swaraj: "does understanding not happen before routing when a message comes… because before routing you have to understand the situations first and then route, right?"

### Tensions in Swaraj's own direction, to settle in Level 2

Each is stated in his words, both sides, without choosing. Swaraj's words settled T1 to T6; T7 was settled on 29 October 2026 from his words of 27 October and Level 2. The settlement follows each tension.

- **T1. Tool, or part of the loop?** "It is not a… tool that situation worker and conversation manager use… it's a part of the harness itself", and also "the situation worker, the conversation manager can itself choose to use a tool to interact with the memory and knowledge layer."
  Settled: memory and knowledge runs on its own thread at every part of the loop, and a step may still put questions to it in its written reasoning.
- **T2. Learn at each step, or apart from the loop?** "Each step of the loop either choose to learn something at that point or choose to propose something or choose to stay neutral", and also "memory write part should be in a different process/thread so the main loop is fast and quick."
  Settled: it observes at each step, and its learning runs as lagging jobs that never block the loop.
- **T3. Who decides about links?** "It should be complete responsibility of memory and knowledge itself" (26 October); "maybe the decision of a yes or no can go to the conversation manager" (26 October); memory and knowledge's "main purpose is context engineering, not decision making" (28 October); and [Decided, 9 October 2026] the situation worker accepts or denies each proposed link.
  Settled: memory and knowledge creates and maintains links, not the worker.
- **T4. What "the thought" means.** [Swaraj, settled 27 October] On 26 October, "Based on the thought, we can inject knowledge." On 27 October he explained: "it's not the internal reasoning, it's the reasoning of the loop…" His later words settle it.
- **T5. Code or AI?** "Why is this a code-based thing" (26 October); "It can be done via code easily, but to do that, clarity and differentiation needs to be there" (27 October); "The fixed code is not a hero… Rest has to be done with the AI part" (28 October).
  Settled: the fixed parts do exact lookups only; the AI part does the rest.
- **T6. Claim first, or educated guess?** "Any thing that is being told to us… is a claim, is not a fact. We have to establish it", and also "We have a very educated guess with respect to our memory and knowledge layer. We ask Arjun about a confirmation whether it is this order number or not."
  Settled: memory and knowledge presents candidates and advice; the step asks or establishes. A guess is never a fact.
- **T7. Whole business, or bounded?** Memory "can see the whole thing", and also the conversation manager "cannot move out of its boundaries to see the whole business thing."
  Settled on 29 October 2026, by three sources. His words of 27 October: "there needs to be some component that can see the whole thing and that can aid him". His rejection of the 26 October "point 5", which limited memory to the speaker's own records: "memory and knowledge layer will basically see everything". And Level 2: "Tend may use a confidential source internally while sending only a limited description externally". The settlement:
  - memory and knowledge uses the whole business's knowledge to help any step understand;
  - it shows a step, as records to act on, only those inside the step's boundary;
  - each person is told only what they may see.

  The conversation manager and the worker stay inside their boundaries; the knowledge comes to them. (Corrected 29 October: the earlier settlement, "each step is shown only what its view allows", was not Swaraj's, and it applied a person's view to Tend's own steps.)
