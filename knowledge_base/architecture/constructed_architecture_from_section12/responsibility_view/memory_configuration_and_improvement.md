# Memory and knowledge, configuration, and improvement — what Tend is responsible for

This file answers one question: what must Tend be responsible for when it carries anything from one situation into the next?

Three things can carry over, and each has its own rules. **Memory and knowledge** carries what Tend knows and learned while working for one business, and hands each part of the work what it needs. The project owner: "It is always memory and knowledge, never just memory or knowledge." In his description, knowledge is situations, skill files and business rules linked together, with intelligent reasoning over them. **Configuration** carries what the business decided: its settings, its policies, and who may do what. **Improvement** carries what the product team learns about how Tend behaves, across the product.

The line between them is the heart of this file. Tend learns how to do its work better for a business. It never learns to change what the business is allowed, or required, to do. <!-- Level 2 memory: the central line -->

Tend is the software that keeps a business's operational problems moving. Each problem is one **situation**: one late parcel, one refund, one outreach. <!-- A1 -->

Three stories run through this file.

**Kabir's word.** Kabir, an employee, writes: "Meera's order is dispatch ready." Tend does not know what "dispatch ready" means in this business, so it cannot tell whether the order can go out. <!-- Level 2 memory: the dispatch-ready example -->

**The missing warehouse identifier.** Tend asked the business's dispatch system to send a parcel, without the warehouse identifier. The system refused the request. That refusal is something Tend can learn from. <!-- Level 2 memory: the warehouse example -->

**Tuesday's two changes.** On Tuesday, the owner changes two things. First, the refund setting changes: any refund above 2,000 now needs the owner's approval. Second, the steps for investigating a late delivery change. Before, Tend checked the tracking, told the customer, and offered a refund after 48 hours. Now it contacts the carrier first, and waits 24 hours more before deciding. Some refunds and some late deliveries are already in progress. Do the changes reach them? <!-- written for this file: Tuesday's two changes; Level 2 growth: the workflow change -->

Who is who here:
- The **situation worker** is the part that reasons about one situation. It decides the next step, and writes what Tend concludes.
- The **conversation manager** is the part that reacts when something happens. It records each incoming message.
- **Memory and knowledge** is the part that runs beside every loop. Before each part of a loop, it hands that part a **package** of what it needs to know, or an explicit empty answer. It keeps the links between situations, skills and procedures, and what Tend learned. It decides nothing.
- **Configuration** is the part that holds the business's settings, policies, and grants. Only the configuration tools, which always make the same checks, write to it.
- The **configurator** is the role of setting the business up. It is held by the owner who signed up, or by a person the owner names.
- **Improvement** is the part through which the product team makes Tend behave better, for every business.
- **Fixed code** is code that always makes the same check. It is not the AI's judgment.
- **The AI** is the language model that suggests steps and words. It never decides alone.
- A **lesson** is something Tend learned that may help next time, such as "check the warehouse identifier first".
- A **trace** is the saved record of what happened during one run of work.
- A **grant** is a range of steps the business allows Tend to take.
- A **policy** is a business rule about when a step is allowed or required, such as "refunds above 2,000 need the owner". A **workflow** is the ordered steps for one kind of work, such as investigating a late delivery.
- A **capability** is one purposeful action the business can switch on, such as checking where a delivery is.
- A **channel** is a route to a person, such as WhatsApp or email. A **carrier** is the outside company that delivers parcels.
- A **claim** is a statement made by someone or something outside Tend, such as the carrier's record of where a parcel is.
- A **candidate** is a lesson or a setting that has been proposed but not yet switched on.
- The **understanding artifact** (until later on 2026-10-29, the **reading**) is what understanding the arrival, the conversation manager's one AI stage, writes before anything acts on an arrival: each ask and whether it is about the business; what each refers to, with time words turned into dates; the sender's claims; what is unknown; what Tend already holds that answers it; and where each ask fits. It is an interpretation, saved with the arrival, never a conclusion. (The status label "the design's reading" is a different thing: a rule worked out from its sources.) (Added 2026-10-29.)
- A step's **boundary** is the set of records it may be shown to act on, set by fixed code: for understanding the arrival (and so routing), the sender's own records; for the worker, its own situation in full, and other situations' typed fields where the worker view rule allows. The business's own knowledge (events, words, procedures, lessons) is not limited by it. A person's **view** is what that person may see, and so what they may be told. (Added 2026-10-29.)
- A **package** is what memory and knowledge hands a stage before it runs: knowledge to use, or an explicit empty answer. Packages come before the stages that reason, and are named by the stage: "the package before deciding". (The codes R1 to R3, W0 to W3 and C1 used earlier on 2026-10-29 are replaced.) (Added 2026-10-29.)
- A **replay** runs an old case again, with a new lesson in place, to see what changes.

Each rule here has one of these statuses:
- **Decided:** the project owner — the person designing Tend, not the business owner — said yes. On 2026-10-22 the project owner accepted every recommendation this design had made, and asked for the smaller questions inside them to be settled in the way that best fits; those points are Decided, and points settled that day say so. A rule marked as "the design's reading" was worked out from its sources rather than found written down; it is Decided too. <!-- decided by the owner, 2026-10-22 -->
- **Provisional:** a working choice that carries a condition for reopening it.
- **Rejected:** turned down on purpose, with the reason kept.
- **Deferred:** a value or a detail left, on purpose, to a later stage — **deferred to configuration** (each business or market sets it), **deferred to Level 3** (the stage that chooses the technology), or **deferred to implementation** (whoever builds it). The rule around it is Decided.

Two earlier status words, **To confirm** (written down, but not yet agreed by the project owner) and **Open** (no answer yet), are no longer used: since 2026-10-22, no rule here carries either.

A rule with no status word next to it is **Decided**: it has a source the project owner accepted. Every rule that is not Decided carries its word where it appears. In the rest of this file, "the owner" means the business owner.

One status note covers the memory and knowledge part of this file. On 2026-10-28 the project owner replaced the earlier picture of this part, and pointed to the business's written answers on memory and knowledge as the answers. So the rules here are **Decided**, including the detailed lists (the fields, the matching rules, the update steps, the measures). One thing stays **Provisional**: how a lesson could ever become more than advice. The design is in the Level 2 page "how memory and knowledge works with the loops". <!-- decided by the owner, 2026-10-28: memory and knowledge; construction record, entry 21 -->

<!-- Every rule below carries its code in a hidden note. Its meaning, source, and status sit in code_index.md in this folder. -->

## Part 1: Memory and knowledge

## What memory and knowledge is for

The project owner: memory and knowledge is "an agency within the agency". It sees the whole of one business; its "main purpose is context engineering, not decision making". <!-- decided by the owner, 2026-10-28: memory and knowledge -->

**Updated 2026-10-29.** Its first job serves understanding first: before the conversation manager understands an arrival, it hands over what the arrival's words mean in this business, and the business's own knowledge may help any step understand, while records shown stay inside each step's boundary. It revisits its own earlier advice at every point. <!-- C7; N34; N36 -->

It has six jobs: <!-- N18; N19; N23; A15; N26; N28 -->
1. **Hand each stage that reasons what it needs, before that stage runs.** It runs beside the four loops of [Tend's product loop](../../../Level%202/the_product_loop/how_does_the_product_loop_work.md), on its own thread. Before each stage that reasons, the loop hands it what the loop holds, and waits for its package:
   - before understanding the arrival;
   - before the wider look, when it runs;
   - before the worker understands new content, gathers, and decides, when each runs;
   - before a message is written.

   The stages that are fixed code (intake, routing, the reply and update decisions, weighing evidence, acting, the send check) it observes, and does not serve. When a stage is passed and the version did not change, its package carries to the next stage. Understanding comes first: what an arrival's words mean in this business reaches the conversation manager before anything acts on the arrival. (Updated 2026-10-29.) <!-- PL-17 -->
2. **Find things.** Its fixed parts fetch by exact keys. Its AI part works out what else a step needs, and asks its retrieval capability, which decides how to find it.
3. **Keep the lookups ready.** The situations stay the truth of each problem. It keeps the views that find them fast: open situations by person; lookups by order number, tracking number, or invoice number; keyword and meaning indexes. Nobody searches every situation.
4. **Link situations.** It creates and maintains the links between situations, as its own records.
5. **Keep skills and procedures**, the product's and the business's, in object storage, versioned; and present, from the business's tools, the ones each part needs.
6. **Learn, behind the loops.** From what happened, keep what helps the next situation start better. Never touch who someone is, what they may do, or the business's settings.

This replaces the three jobs agreed on 2026-10-03 (hand each step what it needs, keep the lookups ready, learn afterwards); those three are jobs 1, 3 and 6 here. <!-- decided 2026-10-03: memory's three jobs; decided by the owner, 2026-10-28: memory and knowledge -->

Memory and knowledge is never the truth of a situation. It writes no part of a situation's record, except when it carries out an erasure the erasure tool has confirmed. It presents; it does not decide: it never chooses between candidates, chooses the next step, or says a claim is true. <!-- N20; N33; U7 -->

## What Tend learns, and what it never learns

Tend learns how to work better for one business. It does not learn to change the business's rules. <!-- N3; decided 2026-10-03: the learning ban -->

Learning may improve how Tend does the following: <!-- Level 2 memory: acceptable learning -->
- reads the local language;
- finds which situation a message belongs to;
- finds the information it needs;
- decides what to gather first;
- chooses which tool or source to try first;
- checks what a tool needs before it is called;
- fills in what it passes to a tool;
- spots its own repeated mistakes;
- decides when to ask a question;
- decides when to wait or escalate;
- writes messages the way a particular business wants them written;
- hands work to people.

Learning may never change: <!-- decided 2026-10-03: the learning ban; Section 11: memory suggests -->
- a business rule, or a formal policy;
- a legal or compliance limit;
- who may act, or a permission;
- who owns a fact, or whose record is the truth;
- a required approval;
- who answers for a decision;
- a step that cannot be undone.

The test is one question. Does this lesson improve how Tend works, or does it change what the business is allowed or required to do? The first is learning. The second is not learning: it changes what the business may do, and only the business can decide that. <!-- Level 2 memory: the learning test -->

A lesson can describe how people work. It cannot turn that into a rule. "This business usually checks the warehouse system before contacting the carrier" is a lesson. "The warehouse system is always authoritative" is a decision about authority, and the business must make it. <!-- Level 2 memory: descriptive is not normative -->

An employee may say: "We usually bypass this step when the warehouse is busy." Tend may remember that this happens. It never concludes that bypassing it is allowed. <!-- Level 2 memory: descriptive is not normative -->

These examples show the ban. Learning must never: <!-- decided 2026-10-03: the learning ban -->
- change who a channel belongs to;
- let an investor or a stranger see a customer's situation;
- raise, lower, or delete the refund setting;
- turn an employee's "the owner agreed" into a setting;
- reopen a closed situation by itself;
- turn a customer's "stop" into a permission to email them everywhere;
- cross the wall between two businesses;
- treat a customer's name as an instruction to load their orders;
- rewrite a tracking status;
- decide that a carrier being down means the business has no shipping.

These are examples, not the whole list. The whole list is the one above.

## The kinds of knowledge memory and knowledge keeps

Memory and knowledge is not one store. Tend keeps several kinds, and keeps them apart. In the project owner's description, they become knowledge when they are linked together and reasoned over. The kinds: <!-- Level 2 memory: the kinds -->
- **Conversation history:** what was said, by whom, when, and on which channel. It is evidence. It is not reusable knowledge by itself.
- **The situation record:** the current state of one problem. It is not general business knowledge.
- **Experience:** what Tend tried, which information and tools it used, what happened, who corrected it, and how it ended. Lessons are made from this.
- **Business knowledge:** the terms, names, and local meanings that help Tend understand the next situation.
- **Procedures and skills:** reusable guidance on how to handle a kind of task, including what to check first and known traps; the business's own and the product's, kept in object storage, versioned.
- **Mistakes:** structured notes on where Tend went wrong.
- **Policy and authority:** the business's formal rules and who may decide. Tend can read them, but they are not ordinary learned knowledge, and learning cannot change them. Their home is configuration, described below.

Three things that sound alike stay separate: what happened (the experience), what Tend believes may be reusable from it (the lesson), and the part of that lesson shown to Tend right now. <!-- Level 2 memory: three objects -->

### What Tend keeps from experience

Tend keeps the experience of its work, so it can be checked and learned from later. What it keeps is, for now, this list. <!-- N4; Level 2 memory: what experience holds -->
- the version of the situation at the time;
- the information it had;
- how it read the situation;
- what it gathered;
- which tools it chose, and what it passed to them;
- what each tool returned;
- what people did, and any correction;
- how it ended.

Remembering something does not make it true, official, or true everywhere. <!-- Level 2 memory: remembering is not truth -->

### Conversation history

Conversation history records what was communicated. For now, it holds the following. <!-- Level 2 memory: conversation history -->
- incoming and outgoing messages;
- who took part, and in what role;
- the channel, and which way each message went;
- the times;
- references to attachments;
- which situation each message was attached to;
- how Tend read it, and any later correction.

The original message stays with the platform that carried it. Tend keeps references to it, and what it needs to coordinate the situation. <!-- B7; Level 2 memory: the platform keeps the message -->

History is never rewritten. If Tend misread a message, the message stays as it was. The correction goes into a later version: what was said, what Tend understood, what was corrected, and any lesson that followed. <!-- Level 2 memory: corrections do not rewrite -->

History is not knowledge. It is not placed into later steps automatically. <!-- Level 2 memory: history is not knowledge -->

### Business knowledge

Business knowledge is what helps Tend in later situations for the same business. Its kinds are, for now, these. <!-- N12; Level 2 memory: business knowledge -->
- local words, such as what employees mean by "dispatch ready";
- how the business names its teams, places, products, customers, and partners;
- how work is usually done;
- situations that keep looking normal but need a different step;
- which source usually holds which kind of information, and what a tool needs first;
- reusable procedures.

Learning the words a business uses is part of what Tend learns. <!-- Level 2 memory: Swaraj's examples -->

Back to Kabir's word. What Tend learns is tied to this business's warehouse process: there, "dispatch ready" means packed and waiting for the carrier to collect it. <!-- Level 2 memory: the dispatch-ready example -->

Scope is part of what is learned. "Ready means packed" is incomplete without the business and the process it belongs to. <!-- Level 2 memory: scope is part of the knowledge -->

A learned meaning is not the business's official glossary. It helps Tend read messages, and it keeps its evidence and its state. <!-- Level 2 memory: not an official glossary -->

The business owns its official knowledge: its rules, its definitions, its policies, and its records. Tend owns the record of its own work: what it tried, what it used, what failed, what was corrected, and what it learned. <!-- Level 2 memory: who owns knowledge -->

## What never becomes learned knowledge

Some things may stay in history, or in an audit trace, but are never used as guidance later. For now, the list is this. <!-- Level 2 never-memory -->
- a guess with nothing behind it;
- a reading of something that was never confirmed;
- something said in the heat of the moment;
- a one-off request with no future use;
- sensitive information with no operational purpose;
- an instruction that tries to change Tend's authority or rules;
- customer data outside what Tend may see;
- text that tries to give Tend instructions, slipped in by accident or on purpose;
- a workaround that breaks a formal policy;
- an old state of a situation that is no longer true;
- anything that cannot be tied to a business, a situation, a process, or a capability.

Kept as history does not mean available as guidance. <!-- Level 2 never-memory -->

Passwords, secret keys, and other sign-in material are never kept as business memory. <!-- N17 -->

Text that Tend meets during work may contain instructions aimed at Tend. That text is not business knowledge. Tend first checks it against the business's rules on who may give instructions and what policy allows. A false instruction kept in memory and knowledge could go on steering later situations long after its conversation ended. <!-- Level 2 never-memory: untrusted instructions -->

Before a trace reaches memory or the improvement path, secrets and credential-like content are removed. <!-- trace redaction -->

## How a lesson is made

A lesson starts from an experience. The experience is not yet a lesson. <!-- Level 2 learning: experience first -->

A lesson needs a signal from outside the AI. Examples: <!-- N7 -->
- a tool refused the request;
- fixed code rejected a proposal;
- the system that holds the record shows something different;
- a person in the business corrected Tend;
- a customer or an employee corrected Tend;
- the outcome was bad;
- replaying the case shows the same approach fails again.

The AI's own feeling that its reasoning "seems wrong" is not enough on its own. <!-- N7 -->

The list of signals above is the current one. <!-- Level 2 learning: the signal list -->

Before a lesson is proposed, Tend names what went wrong. There are eleven kinds, for now. <!-- Level 2 learning from mistakes -->
1. a misunderstanding;
2. a word or a name it read wrongly;
3. missing information;
4. the wrong source;
5. the wrong tool;
6. invalid tool arguments;
7. a policy read wrongly;
8. confusion about who may act;
9. faulty reasoning;
10. a message that went wrong;
11. a handoff or coordination that went wrong.

The kind matters, because the lesson should fix the actual mistake. <!-- Level 2 learning from mistakes -->

A lesson keeps the mistake and its correction, not just a note to "do better next time". <!-- Level 2 memory: keep the failure and the correction -->

A lesson is made in these steps. <!-- Level 2 learning from mistakes -->
1. the experience;
2. what happened, or the correction;
3. naming the mistake;
4. a candidate lesson;
5. switching it on, automatically or after a person checks it, as the business chose;
6. using it, and watching what happens.

Back to the missing warehouse identifier. The dispatch system refused the request. That refusal is the outside signal. The mistake is "invalid tool arguments". The lesson is: "Before using this capability in this business process, retrieve or confirm the warehouse identifier." <!-- Level 2 memory: the warehouse example -->

The lesson improves Tend's planning. It does not change what the dispatch system requires. It gives Tend no new permission to fetch the warehouse identifier. <!-- Level 2 memory: the warehouse example -->

## Three learning modes

Each business chooses one of three modes, through its configurator: <!-- N6; N10 -->
- **Learning off.** Tend makes and uses no lessons. Traces are still kept, for explanation, safety, the audit, and fixing faults.
- **Automatic learning.** Tend makes and uses lessons by itself, inside the checks below. This is the default.
- **Every lesson checked.** Lessons are saved as candidates. None affects Tend until a person, or a process, the business has allowed approves it.

Keeping traces is not the same as learning. Saving a trace never switches learning on. <!-- N6 -->

Automatic learning does not mean: <!-- Level 2 learning: what automatic does not mean -->
- the AI changes itself;
- Tend changes a business policy;
- Tend gives itself permissions;
- Tend trusts its own reflection without evidence;
- every conversation becomes knowledge.

Even with no person checking, fixed code always checks each lesson. For now, it checks: <!-- Level 2 learning: the checks always run -->
- its scope;
- who and what it is about, and how they relate;
- where it came from;
- a clash with a policy;
- privacy and how long it may be kept;
- versions, and what it replaces;
- broken or unsafe content;
- whether it may affect the current kind of work.

These checks protect the product. They are not a person's approval. The checks always run. <!-- Level 2 learning: the checks always run -->

Who may inspect, correct, reject, approve, retire, or limit lessons follows the business's settings and roles. By default, the owner and the configurator hold these rights. <!-- accepted call: who corrects lessons -->

## A new lesson meets old ones

Two lessons can say the same thing in different words. Two lessons that look alike can mean different things. So Tend never matches lessons by wording alone. <!-- Level 2 memory: the matching problem -->

"Dispatch needs warehouse_id" and "Before creating a dispatch, give the warehouse identifier" may be the same lesson. Fixed code decides that, not the AI. <!-- Level 2 memory: the matching problem -->

The AI may suggest that two items are related, and how. Fixed code then decides, by comparing their structure. For now, the structure is this. <!-- N8; Level 2 reconciliation -->
- the business;
- what the item is about;
- how it relates;
- what kind of value it holds;
- the process or capability;
- the conditions under which it applies;
- any further qualifiers.

Similar wording alone never makes a match. The AI's wording is not trusted metadata. <!-- Level 2 reconciliation -->

Five questions are judged separately, never as one score. <!-- Level 2 reconciliation -->
1. Are the two about the same thing?
2. Does the new evidence back up the claim?
3. Is it still true?
4. Does it apply to this case?
5. Is it safe to switch on?

A new lesson can do one of ten things to what memory and knowledge holds: <!-- N8 -->
1. be added;
2. be merged with an existing lesson;
3. refine it;
4. replace it with a newer version;
5. narrow when it applies;
6. sit beside it as an exception;
7. be kept as a conflict;
8. be rejected;
9. mark an old one as out of date;
10. change nothing.

Three rules guide which one: an event is normally appended, not merged; a current procedure may get a new version; an exception may sit beside the general lesson it qualifies. <!-- N8 -->

Each kind of learned knowledge follows those three rules. A kind that records events only gains new entries, or has old ones marked out of date. A kind that holds a current procedure, a meaning, or a preference may be refined, replaced, or narrowed, or get an exception beside it. Any kind may reject a new item, keep a conflict, or change nothing. <!-- Q8 -->

When the match is unclear, the new item stays separate, or marked unresolved. It never quietly replaces an old one. <!-- N8 -->

Nothing is overwritten. A change adds a version, with its reason. The earlier one stays in the history. <!-- Level 2 memory: updates never destroy -->

When a business changes its own policy, that is the business's change. Memory and knowledge may notice it and update what it hands to steps. It never pretends that Tend discovered or approved the change. <!-- Level 2 memory: reality and learning -->

## Each item knows where it came from

Each learned item records the following: <!-- Level 2 memory store -->
- what it is, and its kind;
- the business, and the process it belongs to;
- what it says;
- when it applies;
- where it came from, and the evidence;
- when it was seen;
- until when it holds, if known;
- its state;
- which versions it replaces, or is replaced by;
- how far it may affect a decision;
- why it was made or changed.

Each item points to the situation, the experience, the message, the claim, the tool, or the correction it came from. These links form a web of references. <!-- N5 -->

Tend needs those links. It does not need a special kind of database for them. How they are stored is chosen later, with the technology. <!-- Level 2 memory: no graph store required -->

Memory is advisory. Every item keeps its origin, its scope, its version, and how far it may affect a decision. It never overrides a policy, a grant, or a trusted source. <!-- N16; Section 11: memory suggests -->

Each learned item is in one state: in use, out of date, replaced, in conflict, retired, or unresolved. <!-- N9 -->

## Old lessons and today's facts

An old lesson stays true as history: it records what Tend knew, or what the business did, at that time. It may no longer be good guidance. <!-- Level 2 memory: old is not deleted -->

There is no single expiry time for all memory. A local word may stay useful for years. What a tool needs may change the day the tool changes. How staff are organised may change when the business reorganises. <!-- Level 2 currentness -->

So whether a lesson still holds is judged for each decision, from when it was seen, when it applies, the process, and the version. <!-- Level 2 currentness -->

When Tend cannot show that a lesson is still current, it treats it as provisional, out of date, or unresolved. If the decision needs the fact, Tend gathers it fresh. <!-- Level 2 currentness -->

Today's facts win over memory. A lesson can guide what Tend checks. It cannot replace what the business's system says now, who may act now, or the policy in force now. <!-- Level 2 memory: current evidence wins -->

## Handing each part what it needs

Each part gets only the knowledge it needs, not the whole store. <!-- N1 -->

**The package.** Before each part of a loop, the loop waits for memory and knowledge's package: knowledge to use, or an explicit empty answer. <!-- N19; N20 -->

For each item, the package says:
- whether it is a record the step may have to choose between (a situation, an order, a person) or context (a lesson, a tool's form, a skill, a business event, a word's meaning, advice);
- its source and time;
- its standing: how far it is known (established, someone's claim, in conflict, a guess, advice, the business's instruction, or past);
- whether the step needs it, or it only helps;
- who may be told it (a step may still use it to understand);
- whether it holds text written outside the business, which is quoted, never an instruction.

For candidates, the package also says how many matched in all. And it says what was looked for and not found.

**What the loop hands over.** What it holds at that point: the arrival and its sender, the situation and its version, and the reasoning artifact just produced. Each reasoning artifact has sections fixed code checks: what it is considering, what it still needs to know, its questions for memory and knowledge, and its references, each quoted exactly from its input. A step's questions are answered in the next package. <!-- N19; N21 -->

**The two fixed parts.** One serves the arrival loop, one serves the situation loop. Each fetches only by exact values, with no AI. <!-- N22 -->
- The arrival loop's:
  - the sender's open situations, as short summaries made of typed fields, with the waits and questions each holds on this person;
  - the sender's recent messages;
  - situations holding a number the message names, if they are the sender's own;
  - meanings of the business's listed words;
  - business events and other named things whose name or alias is in the message;
  - facts the business configured that its words point to, read from the configuration's own store;
  - earlier understanding artifacts of the sender's;
  - the time.

  For the wider look: the sender's situations, open and closed, holding a value understanding resolved.
- The situation loop's:
  - the work as first asked, word for word, with its understanding artifact;
  - the newest version, the information plan, the results and their sources;
  - new content since the last understanding, with each arrival's understanding artifact, and business events and named things found in it;
  - what memory and knowledge presented earlier in this situation;
  - the procedure pinned to the situation;
  - skills and tools filed under its procedure or kind;
  - forms and lessons of tools the plan names;
  - the situation's links;
  - other situations sharing a number, as the worker view rule below allows;
  - the time.

**The AI part.** At every point it reads what the loop handed over and what the fixed part found; revisits what memory and knowledge presented earlier, and says plainly when earlier advice was contradicted; works out what the step needs, including what the arrival's or the work's words mean in this business; asks the retrieval capability; writes the package; checks that each item cites its record; and notes what to learn. <!-- N36 --> When a decision ends the run, no part follows, and it does not run. <!-- N19; N20 -->

**Finding: the retrieval capability.** The step says what it needs; retrieval decides how. This is the project owner's retrieval pattern: retrieval "is a combination of all techniques known to us, that basically the job of which is to remove ambiguity". <!-- N23; decided by the owner, 2026-10-28: memory and knowledge -->
1. **Rule out first, in fixed code.** Anything for the wrong business; any record outside the step's boundary (the business's own knowledge may come from anywhere in the business, marked with who may be told it); anything of the wrong kind, status or validity, or (for procedures) at the wrong version, is dropped before anything is searched. The values the step understood (IDs, date ranges, kinds) are exact filters too. <!-- Level 2 memory: filters first; N34; N23 -->
2. **Search in parallel**, inside what is left: by exact references and fields, by words, by meaning, and by links and shared numbers. A need across several people or situations is split into one search each.
3. **Combine and sort.** Each search returns its own ranked list. The lists are combined by each item's position in each list, never by comparing their scores. Duplicates are removed, and the rest are sorted again by how well each fits the need.
4. **The final check, in fixed code** (the governance gate). What was replaced, is stale, retired, out of date, or not visible is dropped. Conflicts are kept, as conflicts.
5. **Add neighbouring context** where it matters, such as the version around a matched claim.
6. **Search again if needed**, up to a set number of rounds.
7. **Hand over evidence**, each item with its source, never a generated answer.

Similar meaning is one way of finding candidates. It never decides what is the same, what replaces what, or what is true. Ranks only order candidates; no threshold accepts or rejects anything. <!-- Level 2, memory notes; N23 -->

Finding a lesson does not make it authoritative. The closest match never overrides a source or a policy. <!-- N16 -->

Tend keeps no standing copy of a business's orders. An order no situation has read is not in memory and knowledge; it presents the tool that reads it, and the worker reads it. <!-- N24 -->

**Who may be shown what.** Memory and knowledge reads the whole business. **Using is not showing.** The business's own knowledge may help any step understand, wherever it came from, each item marked with who may be told it. As records to act on, a step is shown only those inside its boundary: for understanding the arrival (and so routing), the sender's own records. Another person's record never shapes a step's understanding. What a person is told is held by the send check. (Changed 2026-10-29: this said every search starts with the step's view, and routing uses the sender's view.) <!-- N34 -->

The **worker view rule**: a worker sees its own situation in full. It sees another situation's typed fields, never its free text, only if one of these is true:
1. the two situations share a person;
2. a number in this situation is tied to its own person by an outside system's record, and the other situation holds the same number;
3. this situation's person confirmed the number, and the other situation holds the same number.

A number outside the step's boundary is never presented, and the step is not told it exists.

Each kind of step gets different knowledge: <!-- Level 2 context assembly -->
- **understanding a message:** local words, other names for things, earlier understanding artifacts, related situations, and known traps;
- **gathering information:** which source to try, what a tool needs first, fields often missing, and earlier failed lookups;
- **deciding:** the work as first asked, procedures, the plan, the results with their sources, warnings from past mistakes, similar outcomes, exceptions, and escalation lessons;
- **writing a message:** the business's terms, the recipient's preferences, the channel's habits, and corrections to earlier messages;
- **working with people:** lessons about roles, routing, handoffs, and responsibility, without changing who may decide.

The same lesson can be shown differently in each step. Before calling the dispatch system, it reads: "Check the warehouse identifier before using the dispatch capability." When Tend explains a hold-up, it reads: "The dispatch request cannot proceed because the warehouse identifier is missing." <!-- Level 2 context assembly -->

An earlier exchange with the business or a customer can help in eight ways:
- a claim still current;
- a pointer to an earlier situation;
- the meaning of a local word;
- a question still open;
- an attempt that failed;
- a reusable procedure;
- a person's preference or habit;
- a sign that a current reading may be wrong.

These are not all placed into a step the same way. <!-- Level 2 prior conversations -->

A closed situation helps a new one only through an explicit link, or when the understanding artifact says the message refers to a past purchase or earlier work; then, for the wider look, a small set of the sender's own closed situations is looked at, by the values understanding resolved, never on the message's raw words. It is never merged. Its home is [the situation file](the_situation.md). <!-- N2 -->

A closed situation never becomes context just because the same customer or employee is involved. <!-- decided 2026-10-03: a returning customer -->

When a returning customer's message points at a past purchase, retrieval searches only that person's own closed situations, and presents every one that could fit, with the total. Never anyone else's. Since 2026-10-29 the search starts from the conversation manager's reading: its exact values (dates, kinds, the most recent first) narrow the situations before any description is matched. <!-- decided 2026-10-03: the small set; N23; N37 -->

**Time.** The present time, in the business's time zone, is in every package. A business event, such as "the Diwali sale", is a learned item: its name and other names, its dates, its sources, who may be told it, and when it is valid. An event named in an arrival is presented before the conversation manager's reading. Which year is meant is presented as advice, with reasons. Its dates may help any step understand and filter, routing included; they are told only to those who may be told them. (Changed 2026-10-29: the dates used to narrow only the worker's own searches.) <!-- N29 -->

**When it goes wrong.** Knowledge with nothing that fits never blocks a decision; the package says what was not found. If no package arrives, the loop waits a set time, then the step goes to a person. If only the AI part fails, the fixed items still arrive, and the step goes on. A package built for an older version is not used: the decision is made again on the newest one. A cache never guards a decision. <!-- N31; F7; N33 -->

Handing over knowledge runs no permission check of its own. The permission check runs before each step that has an effect. <!-- Section 7 memory: no own permission check -->

What memory and knowledge hands over is checked against a list of allowed fields. A whole record is never passed on. Each package is recorded in the run's trace as references only. <!-- U2; N32 -->

## Links between situations

Memory and knowledge creates and maintains the links between situations. The project owner decided this on 2026-10-28; it replaces the rule of 2026-10-09 that the situation worker accepts or denies each link. <!-- A15 -->

- A number or incident code in typed fields of two situations, taken from an outside system's record or a person's confirmed answer, makes a link, once per key.
- A shared meaning alone ("these customers all describe the same flood") is proposed by the link finder, and stays unresolved until a signal appears: a shared number, an employee's word, or a finding while gathering.
- Incident links group situations sharing an incident code at the same place within a set window. Fifty customers hit by one flood each keep their own situation, grouped under one incident.
- New work after a closed situation is linked to the closed one.
- A link whose signal turns out wrong is removed. An employee who may see both situations may remove any link. Each removal is recorded with its author.
- A link shares context. It never carries a change, and never copies one situation into another. What it means for a situation is that situation's worker's judgment.

A change reaches another situation in only three ways: one event that touches several situations is saved once and written into each; a worker sends a claim to another situation, through intake, keyed, within a count per pair of situations; or, in an outreach, each new version of a person's situation is sent to the central situation, automatically. <!-- N25; IB-16; IB-17 -->

## Skills, procedures, and tools

The project owner, 2026-10-28: skills, the product's and the business's, live in object storage, versioned, not shipped with the code, "because they are also evolving all the time, and we don't want mismatch between different durable object and workers with the version of code they are running". <!-- N26 -->

- A **skill** is a written method for a kind of work, such as deep research. Not everything has a skill.
- A **procedure** is the business's steps for a kind of situation. It is kept with the skills, versioned; its parameters stay in configuration.
- A run reads a skill at its current version when the skill is first presented, and records the version. A procedure is pinned to each situation at the version current when the situation got its kind.
- A business may write any skill, fill product templates, and connect any MCP server (a server that offers tools through the Model Context Protocol). The configurator connects a server through a fixed tool; its tool list is captured, versioned and hashed; a later change waits for the configurator's approval. <!-- N27 -->
- Memory and knowledge presents, from the business's tools, the ones each part needs. A step may use only a tool presented to it in this run. Every call passes the permission check.
- A skill is guidance text. It cannot grant a permission or change a rule.

**Outside knowledge.** Memory and knowledge never calls outside. For a subject the business does not know, it says the subject is unknown, and presents the deep-research skill and the web tools. The worker establishes the subject. Memory and knowledge then keeps it, with its sources, so the web is not searched again. <!-- N28 -->

## Nothing is erased, except through a confirmed tool

The project owner, 2026-10-28: "We do not erase anything." In normal work, knowledge is retired, superseded or marked stale, never deleted. Where the law requires erasure, "not the AI will erase it": the AI may propose it inside the erasure tool; the tool's confirmation rule asks the business owner or the configurator; after their yes, memory and knowledge's cleaner erases the person's data everywhere it lives, situation records included, and keeps a record that an erasure happened, without the data. <!-- U7; IB-19 -->

## One business's knowledge stays with that business

What Tend learns in one business stays with that business. Each business has its own store, and one business's text can never open another's. <!-- Section 11: separate stores; decided 2026-10-03: the business wall -->

This includes local words, ways of working, staff shorthand, exception patterns, how tools are used there, which sources it checks, customer preferences, and corrections tied to its processes. <!-- Level 2 memory: scope between businesses -->

Only product mechanisms move between businesses. Examples: recording tool errors, keeping where a lesson came from, versioning lessons, filtering by scope, and testing a procedure on replayed cases. These are product features, not business knowledge. <!-- Level 2 memory: what may move -->

A lesson may move to another business only after it has been made general on purpose, and shown to hold no business-specific meaning. By default, the owner must approve each such move. <!-- accepted call: generalisation -->

Scope can be narrower than a business: a unit, a location, a process, a role, a capability, a tool version, a partner, a customer, a region, or a time period. The narrower the scope, the fewer situations find it. <!-- Level 2 memory: narrower scope -->

## Checking that learning helps

Automatic does not mean unwatched. The question is not whether a lesson sounds sensible. It is whether the next step got better without new failures. <!-- Level 2 learning: evaluation -->

Tend looks for the following. The measures: <!-- Level 2 learning -->
- fewer repeated tool errors;
- fewer repeated misunderstandings;
- fewer needless questions;
- better choice of sources;
- fewer uses of out-of-date memory;
- fewer clashes with policy or authority;
- correct use of current information;
- less correction by people;
- no rise in unsafe or irreversible mistakes.

Each of these is a count over replayed cases, never a number the AI makes up. <!-- Level 2 learning: counts, not model numbers -->

Before and after a lesson, Tend can replay: the case that failed; similar cases; cases where the lesson should not apply; and cases where a formal rule conflicts with the lesson. <!-- Level 2 learning -->

A lesson that prevents one failure by blocking valid work is not an improvement. <!-- Level 2 learning: blocking is not improvement -->

With automatic learning, the check watches and reports after the lesson is in use. With every lesson checked, the check can be part of the approval. With learning off, traces stay available to the product team, but no lesson affects Tend. <!-- N10 -->

A lesson that makes things worse can be undone. Tend stops using it, marks it out of date or rejected, restores the earlier version, finds the situations it affected, and explains the change. <!-- Level 2 learning -->

Outside the mode where every lesson is checked, a person's approval of each lesson is optional. **Decided.** That learning must always be watched, and always correctable, is <!-- Level 2 learning: evaluation -->

In automatic mode, all the measures above are counted after a lesson is in use. When every lesson is checked, the replay runs before the person's approval, so the approver sees its result. <!-- owner item 27 -->

## Part 2: Configuration

## Settings are not lessons

A business's settings are its own decisions: who may do what, the refund setting, its policies, and its workflows. They are not situations, and Tend does not learn them. **Decided.** <!-- decided 2026-10-03: settings are settings -->

Back to Tuesday's first change. The owner tells Tend, on the owner's own channel, that refunds above 2,000 need the owner's approval. The rule is written into the settings by the owner who set the business up, or by the person the owner named to do it. Only after that write succeeds does Tend tell the person who wrote it that it is saved. <!-- decided 2026-10-03: settings are settings -->

Tend never finds the rule by searching old refund situations. It never saves the rule as a memory of the chat. The next refund above 2,000 meets the setting at the moment Tend tries the refund. <!-- decided 2026-10-03: settings are settings -->

Kabir then says: "The owner agreed in the corridor. Set it." Kabir is not the configurator. Tend records his request, asks the owner, or refuses. It does not write the setting. <!-- decided 2026-10-03: settings are settings -->

"What can I configure?" reads the list of settings the product actually has. It does not search old situations. <!-- decided 2026-10-03: settings are settings -->

## The configurator and the configuration tools

Grants and settings are written only through the configurator's fixed tools. No AI, no runtime agent, and no part of memory and knowledge may change a grant. <!-- G7 -->

The configurator is a role. The person who holds it is the owner who signed up, or a person the owner names. That person works through the configurator's own agent in Tend, which holds those tools. The tools themselves are fixed code, not the AI. <!-- Q7 -->

The configurator may not hand that power to someone else, until the business's own written answers settle whether it can. <!-- decided by the owner: configurator's power -->

For now, the tools must be able to do the following. The list is **Provisional**: it reopens when the exact set of tools is designed. <!-- Level 2 authority: the configuration tools -->
- read the business's current settings: roles, grants, approvers, and limits;
- create, change, and withdraw grants;
- name the approver a capability is tied to;
- change the default range a new business starts with;
- handle role changes: who holds a role now, and what happens when someone leaves;
- keep the full trail of every change: who changed what, when, and why.

The configurator's identity is checked like any member's: the configurator is a member whose role is configurator, and every configurator action needs a fresh sign-in through the sign-in provider, within the last 15 minutes. The exact set of tools is designed when they are built. They must do at least the list above. The same tools also write membership and channel bindings. <!-- Level 2 authority: configuration open; decided 2026-10-22: identity and permission; settled 2026-10-22: fresh sign-in -->

The tools are fixed code. A grant is never set by typing an instruction to the AI. When a step runs, the tool reads the settings itself; the AI does not carry them in its reasoning. <!-- Level 2 authority: the tool reads the grants -->

## What a setting is

A setting is a typed, versioned record: a fixed-form entry Tend keeps for the business. It is never free text, and never free code. <!-- Q1 -->

Each setting has: <!-- Level 2 growth: what a setting is -->
- a shape written in advance: the fields it must have, such as an amount and a time limit;
- the values the business fills in;
- a check before it is used: its shape, the hard rules, and whether it clashes with another setting;
- the moment it starts to apply: when a situation opens, the setting becomes one of the rules that situation follows. The refund setting is the exception: it is read at each refund attempt.

The product team writes the shapes, the list of capabilities, the legal room each setting has, and the hard rules. The business decides which capabilities to switch on, the values (amounts, times, fallbacks), and who holds which role and grant. Neither can do the other's part. <!-- Level 2 growth: who decides what -->

The configuration tools store the shapes the product team wrote, together with the values, check each value against its shape, and apply it. <!-- Section 7 parts: configuration writes -->

There are two kinds of configuration. **Structured values** are settings with a fixed shape, such as amounts, tool details, and registry records. **Preferences** are text the business writes, such as a sign-off style, placed by memory and knowledge into the step that writes a message. The business owns the text. Memory and knowledge only places it. Rules stay in code. <!-- N14 -->

Settings, preferences, and what Tend knows reach a step in three places: structured values at the checks and in tool details; preferences at the step that writes a message; and short summaries before Tend chooses which situation a message belongs to. <!-- Section 8: three entry points -->

A rule that fixed code can check never goes into any text the AI reads. If code can check it, it is code. <!-- Level 2 prompt constitution: rules are code -->

## The core and the settings

The core is the same for every business: receive what happens, understand the situation, gather, check, decide the next step, coordinate, communicate, wait, wake, and keep the trail. <!-- Level 2 growth: the core -->

Everything that differs between businesses and markets is configuration: which capabilities are on, which channels, the policy values, the workflow templates, and who holds which grant. <!-- Level 2 growth: the core -->

The test is one sentence. If a setting needs a change to the core, the setting was put in the wrong place. <!-- Q5 -->

A one-person business has one person, the owner, and runs on the default grants a new business starts with. A team of twelve adds roles, narrows grants, switches on what each person needs, and fills in policy values. The core is the same. Only the configuration grows. <!-- Level 2 growth: one person or a team -->

No setting may cross a hard rule. A business that asks Tend to "silently tell the customer it is on time" when a delivery is late is refused. That is not a missing setting: it would break the hard rule that Tend never guesses, and the trail. The refusal is shown. The full rule is in [the deciding file](deciding_and_permission.md). <!-- Level 2 growth: the hard line -->

Wanting more than the settings allow gets a visible answer: a request for the product team to build it, or, when it would change the core, a refusal with its reason. Customising never means writing your own logic. <!-- Level 2 growth: the invitation and the gap -->

A setting, a capability, or a channel that is missing or not supported is shown as a gap. It is never refused silently. <!-- Q4 -->

## How something new joins Tend

A new business system, an outside agent, or a new channel joins as a **capability**: one purposeful action, built by the product team on top of that system's own tools. It is not every raw function the system offers. <!-- Level 2 growth: what a capability is -->

Everything that joins follows one path: <!-- Q2 -->
1. **request:** the business asks for it;
2. **evaluate:** the product team weighs what it would solve, and its limits;
3. **build:** the team writes the capability;
4. **contract:** its written limits: what it can answer or do, how long a call may take, what happens when it fails, whether its effect can be undone, and its default scope;
5. **validate:** the product team checks it against the hard rules;
6. **test:** in the test environment, in normal and unusual cases;
7. **switch on:** the business enables it, chooses its scope, and accepts the fallback if it is ever down;
8. **watch:** Tend checks it for slow changes in behaviour, and for new errors;
9. **retire.**

The product team builds and checks each capability. The AI may help draft and evaluate. It never decides what a capability may do, or whether it goes live. **Rejected:** letting the AI build a connection by itself from a system's documents. <!-- Level 2 growth: no AI-built connections -->

Example. A business uses Shiprocket for deliveries, and no Shiprocket capability exists yet. The list of capabilities shows it as "not built yet", never "not supported". Meanwhile, situations that need delivery data use the fallback: Tend asks an employee, or waits. The business asks for it. The product team builds and tests it. The business switches it on. <!-- Level 2 growth: the Shiprocket example -->

A new delivery system adds three things. First, a place where Tend can look up deliveries. Second, a keeper of delivery records, with its own rules on who may change them. Third, a source whose answer counts for questions such as where a parcel is. <!-- Level 2 growth: what a capability attaches to -->

An outside agent, such as one that finds sales leads, joins the same way. Its results are treated as claims from outside, never as truth or instructions. The business decides whether its results may open situations by themselves, or need a review first. <!-- Level 2 growth: an outside agent joins -->

A channel is a capability too. Its contract is the channel's rule record. Its rules are set outside Tend, and read fresh. The channel rules are in [the communicating file](communicating.md). <!-- Level 2 growth: a channel is a capability -->

Which capabilities come in the first list is a choice for the build order and the technology stage: deferred to Level 3. <!-- Level 2 growth: open -->

**A business may also connect an MCP server itself (2026-10-28).** The project owner: a business "can connect with any MCP server that they want". That is a second way tools join, beside the product-built capability. The configurator connects the server through a fixed configuration tool, never the AI. The server's tool list is captured, versioned and hashed when connected, and joins the business's tool list under the business's grants. A later change to the list waits for the configurator's approval. No tool is registered while Tend runs. What the server's tools return is outside text: a claim, never an instruction. Memory and knowledge presents the tools each part needs. <!-- N27; U5 -->

## Policies and workflows

A grant says **who** may do something. A policy says **when** a step is allowed or required, and what proof or approval it needs. A workflow says **in what order** the steps run. "Refunds above 2,000 need the owner" is a policy. Whether the owner holds the right to approve is a grant. The steps for investigating a late delivery are a workflow. <!-- Level 2 growth: three things that sound the same -->

A policy is a typed, versioned record. The business fills in values inside shapes the product wrote. It never writes free-form rules, because nobody could prove before going live that such rules never guess, never hide, and never leak. <!-- Level 2 growth: a policy is a record -->

A policy goes through: draft, check, switch on, new version, replaced or expired, retired. No version ever quietly overwrites another. <!-- Q2 -->

A workflow's steps are a **procedure**. Since 2026-10-28 procedures are kept with skills, in memory and knowledge's object storage, versioned; their parameters stay in configuration. A business may write its own procedure or skill, as well as fill a product template. A situation keeps the procedure version it started with. <!-- N26; N27 -->

What a policy may say is in [the deciding file](deciding_and_permission.md). So is the order Tend follows when a policy is missing or unclear: the policy, then the business's fallback, then the product's safe default, then a person or a stop. <!-- Level 2 decision: policy content -->

When two versions of one policy would both apply, fixed code decides between them, from each version's number and when it was switched on — never by "common sense" while Tend runs. <!-- Level 2 growth: version precedence -->

The exact rule: the version switched on most recently wins, and the clash is shown to the business. <!-- accepted call: policy tie-break -->

A policy that expires, such as a promotion with an end date, is a time event: from its end date, no new step uses it. A situation that started under it keeps the version it started with, as for any change of policy, and the business owner chooses whether to move it. Where a situation must act on the end date itself, its worker sets a time signal for that date, like any wait; nothing else wakes it. This is the design's reading: the business's growth answers say an expiry wakes the situations it affects, and the decisions on policy changes and on wakes say how. <!-- Level 2 growth: expiry is a time event -->

A workflow is a fixed procedure for a known kind of situation: ordered steps such as gather, decide, ask, wait, escalate, use a capability, and communicate. Each step is tied to a capability, never to a particular channel or connection. <!-- Level 2 growth: what a workflow is -->

When the kind of situation is known, Tend follows the workflow. When a situation is unexpected, a person is involved. <!-- Level 2 growth: what a workflow is -->

The product team writes workflow templates. A business switches one on and fills in its values, within set limits. A procedure the list cannot express is a visible gap: a request to the product team, or work for a person. <!-- Level 2 growth: how a workflow joins -->

A step that changes often can be its own small procedure, called by the workflow. Then it can change without moving the whole workflow. For each such step, the business chooses whether it follows the version a customer was promised, or always the latest. <!-- Level 2 growth: the sub-procedure -->

## When something changes

What happens to situations already in progress depends on what changed. There are four kinds of change: <!-- Q3 -->

| What changed | Where it comes from | What happens to situations already in progress |
|---|---|---|
| **Facts** | Outside the business: customers, carriers, other systems | Always live. A situation always reads the newest information. |
| **Platform rules** — how long a channel lets a business reply, consent (whether a person agreed to be contacted), whether a connection works | Outside the business: the platforms and the law | Live. Every situation in progress meets the new rule before it next acts; those with a step pending on the changed channel are woken at once. |
| **Grants** — who may do what | The business | Live. A grant must be valid at the moment it is used. A withdrawn grant stops working at once. |
| **Policies and workflows** | The business | Fixed when the situation opens, except the refund setting, which Tend reads when it tries a refund. A change applies from now on, is told to the owner, and reaches a situation in progress only if the owner moves it on purpose. |

<!-- Q3 -->

Each situation records, when it opens, the version of each policy and workflow that governs it, except the refund setting. So every step can answer: which version of which rule governed this? <!-- Level 2 growth: the rule context -->

Changing a business setting does not re-check situations in progress. A platform rule change does: the affected situations are woken at once, and every other one meets the rule at its next wake. A step that reads a setting when it runs, such as a refund, sees the current value. Grants are their own kind: a withdrawn grant stops working at once. **Decided.** <!-- decided by the owner, 2026-10-09: platform-rule split; decided 2026-10-22: platform rule wake -->

Back to Tuesday's two changes: <!-- written for this file: Tuesday's two changes -->
- **The refund setting** — the largest refund that may go through without a person — is the one policy that is not fixed when a situation opens. Tend reads it at the moment it tries a refund. So a refund already in progress meets the new amount when Tend tries it: above 2,000, it waits for the owner. No notice is needed. <!-- decided by the owner, 2026-10-10: refund setting read at attempt -->
- **The late-delivery steps** are a workflow, fixed when a situation opens. New late deliveries follow the new steps at once. Late deliveries already in progress keep the old steps, because they were not set up for a carrier check part-way. Each gets a notice, and a wait with a deadline. The owner chooses: keep the old steps, or move them to the new ones. <!-- Level 2 growth: the workflow change -->
- **Grants are live.** A grant that is withdrawn stops working at once, even for a situation still on the old steps. <!-- Level 2 growth: the refund change -->
- **Every step is traceable:** which version governed which step, and who chose to move a situation. <!-- Level 2 growth: the rule context -->

If the deadline passes with no answer, the situation stays on the old version, and the owner is asked again. Nothing is forced. <!-- accepted call: no answer at the deadline -->

If a change is unclear about what it means for an open situation, that becomes work for a person: the owner decides. <!-- Level 2 growth: an unclear change -->

When a platform changes a rule, such as how long WhatsApp lets a business reply after a customer writes, the product team updates the channel's rule record, and the update announces itself. The conversation manager reads the book of waits, and wakes each situation with a step pending on that channel. Each woken situation checks what is allowed now, and picks a route. The rest meet the new rule at their next wake. None ever acts as if the old rule still holds. <!-- Level 2 growth: a platform rule changes; decided 2026-10-22: platform rule wake -->

Two other ways were turned down. **Rejected:** applying every business rule change at once to open situations. A reply drafted under one version and sent under the next would leave no stable story to trace. **Rejected:** fixing everything when a situation opens, grants included. A withdrawn approver would keep approving. <!-- Level 2 growth: the two rejected ways -->

An old version stays in use until its open situations finish, or the business chooses to move them. **Decided.** <!-- Level 2 growth: version lifetime -->

When a provider retires a connection, that is an outside event. The fallback takes the work, the gap is shown, and the business decides. Open situations move to a replacement only on purpose. The full rule is in [the failure file](failure_and_recovery.md). <!-- Level 2 growth: a retired connection -->

When the product adds a capability, it is tested in the test environment first. A business that does not switch it on is not affected; for it, the capability is a visible gap with a fallback. How the product team rolls a change out, or back, is the product team's own operation, never a business setting. <!-- Level 2 growth: the product adds a capability -->

How long the owner has to answer a notice is a value each business sets: deferred to configuration. The owner may answer for one situation at a time, or for all open situations on the old version at once. <!-- Level 2 growth: open -->

## Memory and knowledge proposes, the configurator decides

Memory and knowledge may notice that a setting could help. It proposes a candidate. It never applies it. <!-- N13 -->

The configurator checks each candidate. Only the configuration tools apply it, and only after the check. **Decided.** <!-- N13; Section 11: memory suggests -->

A note in memory and knowledge such as "always refund this customer" cannot change a rule; nor can a business-written skill. A refund runs only through the refund setting. **Decided.** <!-- Section 11: a learned note asks to change a rule -->

Memory and knowledge watches the configurator's setup sessions, and only proposes candidates from them. <!-- recorded earlier: memory observes setup sessions -->

Memory and knowledge only presents and suggests. It never applies a change. <!-- Section 11: memory suggests -->

How a lesson could ever become more than advice is not settled. Until then, it stays advice. **Provisional.** <!-- Section 11: lesson promotion -->

## Part 3: Improvement

## Two kinds of learning

There are two kinds of learning, and they never mix. Tend learns for one business. The product team learns for every business. <!-- N15 -->

| Kind | What changes | What it must never change |
|---|---|---|
| **About the business** | What Tend knows about this business: its words, its sources, its habits, what its tools need. It lives in memory and knowledge, for that business only. | A business rule, a policy, a legal limit, a permission, an approval, who is responsible, or a step that cannot be undone. |
| **About the product** | How Tend behaves everywhere: how it shapes its work, when it stops to ask, how it words the end of a message. It is made by the product team. | Anything specific to one business, and the product's own rules for Tend. |

<!-- N15; R2 -->

Business rules are never built into the AI itself. <!-- R3 -->

## Improving the product

Traces kept for product improvement are kept apart from business memory. <!-- R1 -->

Tend's behaviour improves only from traces that a person or a fixed check has verified. <!-- R3 -->

Every step of a run is recorded in the audit. A step's trace can be considered for training only when three things hold: the AI proposed a bounded piece of work; fixed code checked it; and an outcome that anyone can see followed. Even then, it is not training material until someone can say what the trace proves. **Provisional.** <!-- Level 2 learning: training traces -->

By default, the product team never uses a business's data to train AI models. **Decided.** <!-- Level 2 compliance: no training by default -->

A business's data is used for training only with that business's written permission. <!-- recorded earlier: training permission -->

## The text the AI reads

The text the AI is given comes in four layers, each with its own owner: <!-- Level 2 prompt constitution: four layers -->
1. **The core rules,** true at every step: never guess; end each run honestly; state doubt with its reason; the AI may suggest but never decide. People write them. They change only with a product release.
2. **The rules for each stage of a run,** written in the same style as the core rules, by people.
3. **The business's preferences,** such as language and tone. They come from the business's settings, and memory and knowledge places them at the step that writes. Fixed code checks that a draft is in the business's language before it is sent. The check sits in the communication layer's send check, with the other checks on the message itself; see [the communicating file](communicating.md). <!-- Level 2 prompt constitution: language check -->
4. **The step instructions** for each piece of work. Memory and knowledge owns them, and versions them.

The two layers of rules that people write — the core rules and the stage rules — are broad principles that hold in cases nobody planned for. They say the right thing to do rather than list bans, and they stay short. <!-- Level 2 prompt constitution: writing discipline -->

A tool for improving the text automatically may edit only the step instructions that memory and knowledge owns. It never touches the core rules, the stage rules, what each step is shown, or the checks. People keep the core rules. **Decided.** <!-- R2; Level 2 prompt constitution: the optimiser boundary -->

Before such an edit is used, it must pass fixed checks, a set of reference cases — including cases where Tend should refuse — and a review by people. It is not used until real traces exist. <!-- Level 2 prompt constitution: the optimiser gates -->

A change to the text, a tool, or the list of capabilities re-runs the tests before it is released. <!-- Section 8 additions: tests before release -->

The step instructions and the stage rules are versioned separately, because they have different writers: memory and knowledge keeps the step instructions, which improvement may edit; the stage rules are the product's. Each trace records the version of both. <!-- Q9 -->

## What this area writes

- Memory and knowledge writes its own items: links between situations, lessons, business knowledge, candidates, skills and procedures, its lookup views and indexes. It writes nothing in a situation's record, except a confirmed erasure. <!-- Section 7 parts: memory writes; Section 7 writer table: links -->
- Memory and knowledge also owns the step instructions, which it versions. <!-- Section 7 parts: memory owns -->
- Memory and knowledge creates and maintains the links between situations. Each situation's worker decides only what a link means for its own work. <!-- A15 -->
- The configuration tools write grants, settings, membership, channel bindings, and the stored shapes that check them. Nothing else writes these. <!-- Section 7 parts: configuration writes; decided 2026-10-22: identity and permission -->
- The product team authors those shapes; the configuration tools store them. <!-- Level 2 growth: who decides what -->
- The product team writes capabilities, workflow templates, the core text, and the stage text. <!-- Level 2 growth: no AI-built connections; Level 2 prompt constitution: four layers -->
- The business writes its values, its choices of what to switch on, its preferences, and who holds which role. <!-- Level 2 growth: who decides what -->

## What this responsibility refuses

Memory never changes a rule, a permission, an approval, an owner, a legal limit, or a step that cannot be undone. <!-- Section 11: memory suggests -->

Memory never sends a message, and never writes the truth of a situation. <!-- Section 7 parts: memory does not -->

Configuration is never written by the AI, by a runtime agent, or by memory. <!-- G7 -->

No setting crosses a hard rule. <!-- Level 2 growth: the hard line -->

Customising never means writing your own logic. <!-- Level 2 growth: the invitation and the gap -->

The full list of what Tend refuses to own, with who owns each thing instead, is in [the non-responsibilities register](../checking/non_responsibilities_register.md). <!-- closed item: refusal register -->

## At a glance

| What Tend is responsible for | Who decides | What happens instead, or when it goes wrong |
|---|---|---|
| Learning how to work better <!-- N3 --> | Fixed code checks each lesson; the business picks the mode, through its configurator | A lesson that would change a rule is not a lesson <!-- decided 2026-10-03: the learning ban --> |
| Keeping memory and knowledge apart from the truth <!-- Section 7 parts: memory does not --> | — | Memory and knowledge presents; it never writes a situation, except a confirmed erasure <!-- Section 11: memory suggests; U7 --> |
| Matching a new lesson to old ones <!-- N8 --> | Fixed code, on structure | An unclear match stays separate, never overwrites <!-- N8 --> |
| Handing each part what it needs <!-- N1; N19 --> | Memory and knowledge, before each part of each loop | Nothing fits: gather, or say Tend cannot know; no package: wait, then a person <!-- N31 --> |
| Checking that learning helps <!-- N10 --> | Replayed cases, counted | A harmful lesson is undone and explained <!-- Level 2 learning --> |
| Keeping each business's memory apart <!-- Section 11: separate stores --> | — | Moving a lesson needs the owner <!-- accepted call: generalisation --> |
| Settings, policies, grants <!-- Q1 --> | The configurator, through fixed tools | Anyone else asking: recorded, the owner asked, or refused <!-- decided 2026-10-03: settings are settings --> |
| A change while situations are open <!-- Q3 --> | The four kinds of change | A policy change: the owner chooses keep or move <!-- Q3 --> |
| A new capability <!-- Q2 --> | The product team builds; the business switches on | Not built yet: a visible gap with a fallback <!-- Q4 --> |
| Improving the product <!-- R1 --> | The product team, from checked traces | Never a business rule inside the AI <!-- R3 --> |

## What is still provisional

**About memory and knowledge** — since 2026-10-28 the business's memory and knowledge answers are the answers, so these are Decided: that learning must always be watched, and always correctable; and when a trace becomes training material, as the business's learning answers say. <!-- decided by the owner, 2026-10-28: memory and knowledge; Level 2 learning: evaluation; Level 2 learning: training traces -->

How a lesson could become more than advice stays **Provisional** until a way to promote lessons is decided. <!-- Section 11: lesson promotion -->

**Values set later** — not open questions: how long the owner has to answer a notice; the legal limits on policies in each market; which capabilities come first. <!-- Level 2 growth: open -->
