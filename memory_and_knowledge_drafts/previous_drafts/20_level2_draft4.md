# Level 2 – System Design: Memory and Knowledge

Draft 4, 28 October 2026. Not yet reviewed by Swaraj.

## How to read this document

**Tend** is the product: an AI that works for one business, on WhatsApp, email and other channels, and keeps that business's operational problems moving until each is resolved or handed to a person.

The project designs Tend in three levels. **Level 1** says what the problem is. **Level 2** decides how the problem is solved, in concepts, without technology. **Level 3** chooses technology.

This document is Level 2 for one part of Tend: **memory**. Swaraj calls it "an agency within the agency": a part with its own jobs, inside Tend. Its job, in his words: "create a subset of the vast knowledge sea and create a subject and present that in that context. Its main purpose is context engineering, not decision making." Its Level 1 is the file `10_level1_memory_agency.md`. Its tests are the file `30_level2_tests.md`.

**Labels**, used before a statement:

- **[Swaraj]** Swaraj's direction. It governs everything else.
- **[Decided]** decided before this document and accepted by Swaraj.
- **[Working]** a working decision made before this document, not yet reviewed by Swaraj.
- **[Fact of Tend]** how the rest of Tend is already designed.
- **[Proposed]** new in this document.
- **[Change]** a proposal that changes something decided. It says what it changes.
- **[Swaraj to decide]** a choice this document cannot make.
- **[Open]** not known yet.

Nothing proposed here is decided until Swaraj says so.

---

## Words used

**Tend's parts**

- **Situation**: one operational problem, with its own saved record. Each change saves a new **version**. A situation has a **kind**, such as "late delivery", which decides which of the business's procedures applies.
- **Arrival**: anything new that reaches Tend: a message, a reply, an answer from a business system, a document, an approver's answer.
- **Intake**: the conversation manager's fixed code that saves each arrival. [Decided] Only intake saves arrivals.
- **Conversation manager**: the part that takes each arrival and decides which situation it belongs to. That decision is **routing**.
- **Situation worker**: the part that works one situation. A **run** is one time the worker works on a situation, from waking to resting. A run has **rounds**: each round is one decision, and the step it chooses. [Decided] Only one run per situation at a time.
- **Wake**: what starts a run: an arrival saved in the situation, a timer the worker set, a tool's result, or a platform rule change on a channel it is about to use.
- **Rest**: the end of a run; the situation waits for its next wake.
- **Harness**: the fixed code that runs each loop. It calls the AI, checks what the AI wrote, runs tools, saves results, and decides whether to go round again.
- **Fixed code**: ordinary code that always does the same thing in the same case. It is not an AI. It can compare exact values. It cannot understand meaning. When the search runner (fixed code) runs a search by meaning, the meaning work is done by the AI model inside the meaning index, not by the fixed code.
- **Tool**: one fixed path for one kind of call to a business system or outside service. A tool's **form** is the list of what it needs, which the AI fills in. Tend's code runs it. Tools are never bound to the AI model.
- **Tool layer**: the only way Tend calls outside. It checks permission before each call.
- **Communication layer**: writes messages to people and sends them. Its **send check** tests every message before it goes.
- **Wait**: a saved note that a situation cannot go on until something named happens. It has a due time. When it is due, a timer wakes the worker. [Decided] Only the situation's own worker ends its wait. The **book of waits** lists every open wait.
- **Held note**: [Decided] a note the conversation manager keeps when it cannot place an arrival yet. It changes no situation. When the sender writes again, routing tries again; if nothing places it within the held-note limit, the arrival goes to a person.
- **Work item**: a task for one named person.
- **Trace**: the saved record of one run. [Decided] It holds no personal data.
- **Configurator**: the person who sets the business up in Tend: its rules, procedures and preferences. **The person the business named** for a job is whoever the configurator set to receive that kind of work.

**Memory's parts**

- **Memory** (also "the agency", "the memory and knowledge layer"): the part described here.
- **Point**: a fixed place in a loop where the harness calls memory.
- **Request**: what the harness hands memory at a point.
- **Package**: what memory hands back.
- **Present**: put something in a package, so the AI call at that point reads it.
- **Memory's fixed code** comes in three pieces:
  - the **routing fixed part** and the **worker fixed part**. Each matches exact field values only: find records whose field equals a value, filter, count, sort by date;
  - the **search runner** (below), which runs the AI part's searches. Its exact filters are exact; its searches by meaning are not.
- **AI part**: an AI inside memory. It decides what to search for, and arranges what comes back. It never decides what the step does.
- **Search runner**: the third piece of memory's fixed code. It runs the searches the AI part writes: it sets the view, applies the exact filters, then asks the words index or the meaning index (B3), and returns results up to the cap.
- **Search**: one look into one of memory's stores, run by the search runner, with a **cap**: the most results it may return.
- **View**: which records a search may return. Fixed code sets it before any search runs, from the sender (routing), the situation (worker) or the recipient (communication layer). The AI part cannot change it.
- **Tell**: one situation sends one claim to another situation, as an arrival (D6). Messages to people are "sent", never "told".
- **Action**: what a round chooses to do next. **Plan step**: one line of a plan.
- **Outreach**: one situation for each person on a list the business gives Tend to contact.

**Kinds of knowledge**

- **Claim**: one statement from one source at one time, with its type, such as "delivery address" or "order number". [Decided] Claims are typed.
- **Typed field**: a value saved in a named place in a record, such as the order-number field of a carrier's report. Fixed code reads typed fields exactly.
- **Establish**: [Decided] a claim is established when the situation worker's evidence rules (which source is trusted for which type of claim) accept it.
- **Person record**: Tend's record of one person, for one business, with a unique **person ID**.
- **Refers to something that already happened**: a message that points back to an earlier order, purchase or message, such as "the one I ordered in the sale". Routing's AI says yes or no and quotes the words. Code cannot judge whether a message does this. It only checks that the quoted words are really in the message.

**Who may see what**

- [Fact of Tend] A customer or prospect may see the situations where their person ID is a party, and their own orders.
- [Fact of Tend] An employee may see the situations they are assigned to.
- [Fact of Tend] An owner who runs the business alone may see the whole business. With more roles, each role sees what the configurator grants it.
- [Fact of Tend] A partner (an outside business, such as a carrier) may see only what its task needs. An investor (a person who has put money into the business and asks how it is doing) may see their own situations, not customers' orders.
- [Proposed] **The worker view rule.** A situation worker works for Tend, on one situation. It sees that situation in full. It sees another situation in two cases only, and then only its typed fields (kind, status, numbers, and the typed subject of its waits, such as "delivery address for order 8840"), never its free text:
  - (a) both situations have the same person as a party;
  - (b) this situation holds a number that a business system's record ties to this situation's own person, or that this person **confirmed**; and the other situation holds that same number in a typed field. **Confirmed** means: the person answered yes, from a channel already tied to them, to a question from Tend that named the number. An unverified sender cannot confirm anything.

  A number someone only typed opens nothing. So a stranger who types Arjun's order number sees nothing of Arjun's situations.

---

## The design on one page

**[Proposed]**

1. **Memory acts at fixed points, called by the harness.** In routing: before the AI reasons (R1), and after (R2). In the worker: before planning (W1), before each decision (W3), and after any written reasoning, before it is acted on (W2). Before a message is written: C1.
2. **The fixed parts look things up by exact keys only; the search runner runs the AI part's searches.** There is one for routing and one for the worker.
3. **The AI part runs by these triggers**, which code checks:

   | Point | The AI part runs when |
   |---|---|
   | W1 | on a situation's first round, and whenever a decision asks for a new plan; never skipped then |
   | W2 | the reasoning wrote a question for memory, or named a tool not presented in this run |
   | R2 | (a) the reasoning wrote a question for memory; or (b) all three hold: it says the message refers to something that already happened; the quoted words are in the message; it chose no open situation |
   | W3 | not by default; question 4 asks whether it should |
   | R1, C1 | never |

   The worker's wake is the harness starting a run; it is not a reasoning part. W1 comes before the worker's first reasoning, as Swaraj asked: "even before the first component of that situation worker wakes up".

4. **Code sets the person and the visibility of every search.** The AI part cannot change them.
5. **Memory presents; the step decides.** Situations, orders and people are presented as candidates: all that a search returned, up to its cap, with the total that matched. Memory may give advice. It never chooses for the step.
6. **The worker decides on the newest version before every action**, and checks the version again just before any action that cannot be undone. Plan when needed; then each round: decide, check, act.
7. **A person has one person ID.** Channels point to it.
8. **A change reaches another situation as an arrival**, sent by the worker that holds it, saved by intake, and accepted by the receiving situation's own worker.
9. **Memory writes nothing the loop waits for.** It may drop a learning note into a queue nobody waits on. Its stores are kept in the background.

---

## Part A. Where and how memory acts

### A1. What makes memory act

**The problem.** Swaraj, 28 October: "What is the signal it is getting? What is the parameter it is observing… What is the event like? How is the event structure? Is it even possible in software?"

**Constraints.**

- [Fact of Tend] The events that exist are: an arrival; a notice that a situation has a new version; a worker's timer; a tool's result; an approver's answer; a platform rule change; a status-check answer; and the trace of a run, written after the run. Nothing announces what an AI is thinking.
- [Swaraj] Memory is "a part of the harness itself", acts "before that reasoning part is activated", and must not depend on the AI asking.

**Options.**

1. Memory as a tool the AI calls. The AI may not call it.
2. Memory as a listener to events. It cannot see a step's written reasoning while the run is going on; the trace comes after.
3. Memory called by the harness at fixed points.
4. Memory started beside the step, at the same moment. It sees what the step was given, never what it wrote.

**Decision.** [Proposed] Option 3 for presenting. Option 2 for memory's background work.

**Why it is possible in software.** At each point, the harness makes an ordinary call, inside the same run, the way it already calls the AI and the tool layer. The request is built from data the harness already holds at that moment. There is no signal to detect. The earlier project studied in Tend's research built context this way: the fixed code that ran its loop called a separate context-building function before each AI call.

**Asking still works.** [Swaraj] "The situation worker, the conversation manager can itself choose to use a tool to interact with the memory and knowledge layer." A step writes a question for memory in its written reasoning. Code sees the question, and the harness hands it to memory at that point (W2 or R2).

**"Runs parallel to the loop."** [Swaraj] Memory's background parts (Part F) run beside the loops all the time. Its presenting runs inside the loops, at the points. Both hold.

### A2. The points

**[Proposed]**

| Point | Where | What the harness holds at that moment |
|---|---|---|
| R1 | routing, before routing's AI reasons | the arrival; the sender's person ID |
| R2 | routing, after routing's AI writes, before the routing check | the same, plus the written reasoning |
| W1 | worker, on a situation's first round, and whenever a decision asks for a new plan; before any planning | the situation's newest version |
| W2 | worker, after any written reasoning (a reasoning turn, a plan, or a decision), before it is acted on | the same, plus the written reasoning |
| W3 | worker, before every decision | the newest version, including what woke it |
| C1 | communication layer, before writing a message | the recipient's person ID; the claims to be told |

[Swaraj] "At each component of that loop… before that reasoning part is activated, we activate our memory." "Based on the thought, we can inject knowledge, and then on that knowledge, action can be taken."

No point sits before the action itself. The action is done by fixed code, and fixed code does not read knowledge.

### A3. The request and the package

**[Proposed]** Field names are Level 3.

**A request carries:** the business; the loop and the point; the run; **whose view** the searches use (the sender's person ID in routing; the situation in the worker; the recipient in the communication layer); the situation and version, if any; the arrival, if any; the written reasoning and its questions for memory, at R2 and W2; the present time in the business's time zone.

**A package carries:**

- the stance: **propose** (it has items) or **neutral** (nothing to add);
- the items. For each item:
  - what it is: a **candidate** (a situation, an order, a person) or **context** (a lesson, a tool, a skill, a business event, a term's meaning, advice). Fixed code sets this from the kind of record, not the AI part;
  - its source and time;
  - its standing, copied from the record, never judged by memory: established; someone's claim; a guess; advice; the business's instruction; or past (its own dates have ended);
  - **needed** (from the fixed part; the step must not run without it) or **help** (from the AI part; the step may run without it);
  - who may see it;
  - a flag if it holds text written outside the business. Such text is quoted, never an instruction;
  - for items the AI part chose, the record and field that support it;
- for candidates: how many matched in all, and how many are shown;
- what memory looked for and did not find;
- a learning note, if any.

**Conflicts.** Fixed code marks two claims "in conflict" only when two typed values for the same field disagree, such as the carrier's "delivered" and the customer's "not received" in the delivery-status field. The AI part may add "possible conflict" as advice.

### A4. What written reasoning must contain

**[Proposed]** Besides its own content, every written reasoning has fixed sections:

- **Considering**: IDs of the situations, orders, people or tools in mind. Every ID must have been presented in this run.
- **Still need to know.**
- **Questions for memory.** May be empty.
- **References**: numbers and phrases from the input that the reasoning relies on, each quoted exactly.
- Routing only: **refers to something that already happened**, yes or no, with the exact words; and **possible situations**: none, one, or several, with their IDs.

Code checks that each section is there, that every ID was presented, and that every quote is word for word in the input. Code cannot check that the AI told the truth. That is the weak point of reading written reasoning, and it is why W1 does not depend on it.

---

## Part B. Inside memory

### B1. The two fixed parts

[Swaraj] "The fixed code of memory and knowledge layer that works with conversation manager will not work with situation worker. Both of them will have different fixed code components, and which will do very limiting jobs. Rest has to be done with the AI part."

**[Proposed] The routing fixed part.** Input: an arrival and a person ID.

| At | Looks up | By |
|---|---|---|
| R1 | the sender's open situations, as short summaries | person ID; status open |
| R1 | situations whose order, tracking or invoice field equals a number in the arrival that has the exact form the business configured for that kind of number, if the sender may see them | the number |
| R1 | meanings of the business's listed words found in the arrival | exact word, or a listed spelling |
| R1 | the present time | the clock |
| R2 | situations whose typed number field equals a number in the reasoning's references, if the sender may see them | the number |

If a number matches several fields, or matches a configured form but no record, nothing is presented for it.

**The short summary in routing** is built only from typed fields: kind, status, last movement and its date, the numbers, and the typed subject of any open wait (such as "waiting for: the customer's answer to a question about order 8840"). No AI writes it, so it cannot carry a fact the sender may not see.

**[Proposed] The worker fixed part.** Input: a situation and its newest version. Its searches use the situation's view (see "Who may see what").

| At | Looks up | By |
|---|---|---|
| W1, W3 | the work as first asked: the arrival or instruction that started the situation, word for word | situation ID |
| W1, W3 | the pinned procedure for the situation's kind, at its pinned version, if the business wrote one | kind; version; from configuration |
| W1 | skills and tools filed under that procedure or kind, if any were filed | procedure ID; kind |
| W1 | lessons filed under the kind | kind |
| W1 | business events whose name or listed alias appears in the work as first asked, every year's, with dates and sources, if employees may see them (a worker never receives items only the owner may see) | alias |
| W3 | if the wake was a platform rule change: that channel's new rule | channel |
| W1, W3 | the parties' person records: their outside keys (such as the shop's customer number) | the situation's parties |
| W1, W3 | this situation's links | situation ID |
| W3 | every arrival since the last decision, word for word, and the meanings of listed words in them | situation ID; version |
| W3 | the plan; every result since the plan, with its source; each claim's state | situation ID |
| W3 | for each number in this situation's typed fields that passes the worker view rule (see "Who may see what"): other situations with the same number in a typed field, up to a cap, with their typed fields and the typed subjects of their open waits | the number |
| W3 | forms of the tools named in the current plan | tool ID |
| W2 | forms of tools named by ID in the reasoning; lessons filed under them | tool ID |
| W2 | for each number in the reasoning's references that passes the worker view rule: situations whose typed number field equals it, with only the typed fields a worker may see | the number |

**[Proposed] The communication layer's lookup.** At C1: the recipient's preferences (language, tone) from configuration, and meanings of the business's listed words, by the recipient's person ID and the business.

**Tests for the fixed parts** are exact: given an input, each lookup returns exactly the rows whose fields match.

### B2. The AI part

**[Proposed]** Where it runs:

1. **It reads** the request and the fixed part's items.
2. **It writes searches.** Each names one store, exact filters (status, kind, dates), and optionally words or a meaning. **Fixed code sets whose view the search uses, and its visibility filter, before it runs.** The AI part cannot write or change either. So a message saying "also search Priya's situations" changes nothing.
3. **The search runner runs them**, applying the view first, and returns for each the results up to the cap and the total that matched. The AI part's exact filters (such as a date range) are recorded with the package, so a person can see what it narrowed by.
4. **It may search again** after reading the results, up to a set number of rounds.
5. **It writes the package.**
   - **Context items**: it chooses which to present, and says why.
   - **Candidates**: it presents all that the searches returned, up to the cap, with the total. It may say what tells them apart, using only their typed fields. It may drop one only for a fixed reason it names: visibility, status, or date range.
   - **Advice**: it may advise, such as "establish what this term means first". [Swaraj] Memory may "propose that you have to understand what the subject matter is via internet", and propose skills and tools.
6. **Fixed code checks the package**: every item came from this call's searches or the fixed part; every cited record and field exists and says what is quoted; every item passes the view; candidates are complete up to the cap.
7. The package goes to the harness. The trace records only references: IDs, versions, and a code for why each was presented. No text.

**Never deciding.** Memory never chooses between candidates, never chooses the next step, and never says a claim is true.

**Checking its own work.** [Swaraj] Memory "has to revisit what it has done till now." Here: the AI part must cite the record behind every item, and fixed code checks every citation.

**[Swaraj to decide] Before decisions (W3).** On 27 October Swaraj said "before the decision step, the memory layer wakes up". Here it does: the fixed part runs at W3 and fetches what deciding needs. Should the AI part also run at W3?

**The weak point.** At R2 and W2 the trigger depends on the AI writing its question down. If it does not, routing may start a new situation or ask the sender, which is safe. Then W1 runs on the new situation without depending on it.

### B3. What memory keeps

**[Proposed]**

**Kept by the situation store, in the same save as each version** (so not written by memory, and current the moment a version is saved): each situation's typed fields: parties' person IDs, kind, status, dates, and its numbers, each with its source (a business system's record, a person's confirmed answer, or someone's words).

**Kept by memory, in the background:**

- **Link records** (D5), each with its basis: a shared number, a shared incident code, or meaning.
- **Knowledge items**: the business's words, its events, lessons, skills, tool descriptions; each with its kind, scope, valid dates, sources, and who may see it.
- **A words index and a meaning index** over situation summaries, knowledge items and document text. A meaning index works like this: when a text is saved, an AI model turns it into a list of numbers; a meaning search turns the search phrase into the same kind of list, and returns the closest entries. [Change] [Swaraj to decide] It lags a little behind the saves. Swaraj asked that reads stay "updated and the latest". The exact lookups routing and the worker depend on are current at once; only searches by words or meaning may miss a save from the last few seconds.
- **Records of what each step was given**, as references only.

[Proposed] Person records and channel addresses are kept by the conversation manager's identity step (D1). Memory reads them. (Tend's design does not define person records yet.)

[Fact of Tend] The book of waits is written in the same save as each version, by the situation's worker. [Change] Memory becomes a new reader of it, and each wait gains a typed subject: the number it is about, and the kind of fact it waits for.

All of these are records that point to each other by ID. No special graph store. [Swaraj] "Graph data and not a graph structure."

### B4. Finding among many

**[Proposed]** Every search narrows by exact fields first, then by words or meaning only inside what is left.

For a customer with ten thousand finished situations, looking for a past shirt purchase:

1. Exact fields: this person; finished; kinds that involve a purchase. About a thousand left.
2. If the AI part knows a date range from a business event, add it. About forty left.
3. A words search and a meaning search inside those forty, each returning up to its cap.
4. The AI part reads what came back, with the total of forty, and arranges it.

**[Swaraj to decide] Ordering by closeness.** This is a conflict between two things Swaraj has said. [Swaraj] "We retrieve the keyword, we retrieve semantic, we retrieve based on the graph data, and then we just compare using an AI." And: "I do not think thresholds and numbers work well enough in production." A meaning search orders its results by a closeness number, and the cap then cuts the list. So the number does decide which candidates are read. The total is always shown, and nothing is accepted or rejected by the number alone; but a candidate below the cap is not seen. The options:

1. Allow it, with the total shown, and let the AI part search again with narrower words.
2. Do not allow it: the AI part reads the exact-filtered set in batches. Slower and costlier; fails for very large sets.

[Decided, agreed by Swaraj on 3 October 2026] When a message points at a past purchase, routing may be shown a small set of the sender's own finished situations, and "a search inside only his finished situations may be how the few are chosen." The rule does not say which kind of search.

**What memory does not hold.** [Decided] Tend keeps no standing copy of a business's orders. An order no situation has read is not in memory's stores. If a step needs one, memory presents the tool that reads the person's orders, and any date range it found. The worker reads them.

---

## Part C. The loops

### C1. The situation worker's run

[Swaraj] "One I just call reasoning and second I call is action." Reasoning is "a multi-step thing". The loop is not a ReAct loop that only checks for a tool call. "The loop decides to loop (code first, LLM second)."

**[Proposed]**

1. **Wake** (worker code).
2. **Repeat check and recovery** (worker code, as decided): drop a wake already handled; finish or discard interrupted work; one run at a time.
3. **Point W1** on a situation's first round, and whenever the last decision asked for a new plan. Memory's AI part always runs here. [Swaraj] Memory acts "even before the first component of that situation worker wakes up."
4. **Is a plan needed?** (worker code) If the business wrote a procedure for this kind, and its first step's tool form can be filled from saved typed fields, the procedure is the plan, and no AI plan is written. Otherwise the worker **reasons** (worker AI). Reasoning is a series of turns, up to a set number. Each turn writes either questions for memory, or the finished plan. Worker code sends the questions to memory at W2, and gives the answers to the next turn. It ends reasoning when the plan is written or the turn limit is reached. The plan says: what the work asks for; what is established, and from where; what is unknown; the steps, each with what it needs and what it depends on.
5. **Check the plan** (worker code): its shape; every step depends only on earlier steps or saved records; every tool named was presented in this run and is switched on. The plan is saved.
6. **Point W3, then decide** (worker AI), on the newest version. The decision says:
   - for each thing the work asks for: answered, partly, or not yet, with a pointer to saved evidence;
   - anything that goes against the plan;
   - the claims it would send a person, by their IDs;
   - the next action, with its tool form if it uses one. The next action is one of: do a plan step; ask for a new plan; ask someone; wait for something named; give the work to a named person; **tell another situation** (D6); **propose a split** (the existing split operation creates the second situation); **propose a correction** when the arrival was placed in the wrong situation (the existing re-route operation moves it; or the two are linked); record the work as resolved; stop safely (a visible stop, with its reason);
   - one plain sentence on where the situation stands, for employees.
7. **Point W2** on the decision. One rewrite of the decision if memory added anything.
8. **Check** (worker code):
   - the decision was made from the newest version; if a newer version was saved meanwhile, it is thrown away and the round starts again at step 6;
   - every "answered" points to a saved claim whose source is not the AI;
   - the next step is allowed; the permission check runs for any outside step;
   - before anything is recorded as resolved, the completion check: every question has an ending; no person's task is pending; every claim told to a customer has evidence.
9. **Act** (worker code, through the tool layer). Just before any action that cannot be undone (a payment, a message, a change in a business system), worker code checks once more that no newer version exists; if one does, the action is not taken and the round starts again at step 6. Every save also checks the version it read. [Fact of Tend, with a conflict in the record] One part of the design says a stale save is refused; another says the step is checked against the newest version first. Either way, this design never acts on an older version. The result is saved as typed claims, with source and time. A failed or refused call is saved as a claim of the failure, with its reason. A call with no answer within its time limit (see Starting values) counts as failed. The next decision sees the failure, and chooses what to do.
10. **Go round, or rest** (worker code). [Decided] A round counts as progress only if: a claim's state changed, with a reason; a needed claim came from a source not yet asked in this wake; a wait was written, refreshed or ended; an outcome was recorded; or a permission changed. The AI's own report of progress never counts. With progress, and the round limit not reached, go back to step 6. Otherwise rest.

**Every action follows a decision made on the newest version**, and an action that cannot be undone is checked again just before it runs. A timer that wakes the worker goes through W3 and a decision before anything is sent. When a wait is ended, its timer does nothing when it fires [Decided].

### C2. Deciding is checking the work

[Swaraj] At the decide step the worker "should look back at the document I shared, the things it has done till now, and look at whether it actually computes." "It's not that at the decide step it is doing both decision and reflection. The process of decision, the way we are deciding, is self reflection itself." "This self-correction by auditing the thing, it can be done very easily. We do not need anything else." "When the decide step has what context to engineer at that point is the key."

**[Proposed]** W3 builds that context: the work as first asked, word for word; the procedure; the plan; every result and its source; each claim's state; new arrivals; other situations' waits that this one might answer. Not the conversation. Making the decision is checking the work.

[Working, Level 2 memory] An AI that only asks itself whether it was wrong is not reliable; mistakes need a signal from outside the AI. Swaraj's example avoids that: his audit worked by reading the sources. W3 puts the sources in front of the decision; code requires every "answered" to point at one.

### C3. The conversation manager's run

**[Proposed]**

1. **Intake** saves the arrival; drops repeats.
2. **Who sent it** (routing code): look up the channel address among the person records. One match: that person ID. None: a new person record, marked unverified. More than one: treat as unverified, and ask.
3. **One routing run per sender at a time** (routing code). [Change] A second arrival from the same channel address, or the same person, waits in that queue until the first one's save is finished. The queue is keyed by the channel address, so it works even before a person record exists. Without this, two messages a second apart could both start new situations.
4. **Point R1.**
5. **Routing reasoning** (routing AI): what this is about; the separate asks in it, if more than one; considering; possible situations for each ask (none, one, several); for each new one, its kind; still need to know; questions for memory; references; refers to something that already happened.
6. **Point R2.** One rewrite if memory added anything.
7. **The routing check** (routing code):
   - only presented situations may be chosen;
   - one possible situation: attach the arrival to it;
   - none: start a new situation;
   - more than one separate ask: one situation per ask [Decided in Level 2: split early];
   - several: ask the sender which, and keep a held note until they answer. If they do not answer within the held-note limit (see Starting values), the arrival goes to a person [Decided];
   - a candidate memory found by a search, not from the sender's open situations or an exact number: ask the sender before attaching.
8. **Save and announce.**

[Swaraj] The routing decision is the conversation manager's.

---

## Part D. Kinds of knowledge

### D1. What a person is

**Constraints.** [Swaraj] "Some sort of a unique ID, not a WhatsApp number." [Fact of Tend] Tend's main Level 1: "Tend does not own canonical actor identities." [Decided] A channel binding shows the channel, not who is typing.

**[Proposed]**

- Each business has person records, kept by the conversation manager's identity step. Each has a person ID; the channel addresses that point to it, each marked with how it was tied; and outside keys, such as the shop's customer number.
- This is the business's contact record as Tend knows it. Tend does not own who someone is in the world. An employee is still proved by their sign-in.
- Routing finds the person ID by exact lookup of the address.
- [Change] **Tying a new address to an existing person.** A worker may propose it. The identity step makes the tie only when a verified sign-in ties them, or the person confirms it from a channel already tied to them (for example, Tend asks on Arjun's WhatsApp: "did you just email us from this address?"). A business system's record that lists the address may prompt the question, but is never proof on its own. [Decided] "A name or number is not proof." A shared family email may be tied to more than one person; then nothing about either is presented to it. This changes the decided rule that channel bindings are only for members.
- [Decided] The model proposes; fixed code or a person decides. [Proposed] So joining two existing person records needs a person's decision or a verified sign-in; an AI may only suggest it.

### D2. Time and the business's events

**[Proposed]**

- **The present** is in every request, in the business's time zone.
- **A business event** is a knowledge item: its name and listed aliases ("Diwali sale", "Diwali sale 2026"), its dates, its source, and who may see it.
- **Its source** must be the business owner, the configurator, or configuration. An employee's mention of an event stays their claim. A customer's mention stays the customer's claim.
- **Which year.** [Swaraj] "The memory AI component of the memory has to figure out the aspect of time, which year currently it is in." The fixed part returns every event with that alias, with dates and sources. The AI part says which one the work most likely means, and why, as help. If it cannot tell, it presents both.
- **Found the first time.** If no event matches, the AI part searches the owner's and configurator's instructions for the phrase, and presents what it finds, with its source.
- **Kept.** The learner keeps the event as a knowledge item from that source.
- **Hidden sources.** If the person the work is for may not see the source, the dates may still limit the worker's own searches. They are never among the claims told to that person; the send check rejects them.

### D3. Default behaviour, skills, procedures, rules, preferences

**[Proposed]**

| Kind | What it is | Who writes it | How it reaches a step |
|---|---|---|---|
| Default behaviour | How Tend's AI behaves everywhere | The product team | Always part of every step's fixed text |
| Skill | A written method for one kind of work, where a particular process is wanted | The product team, or a business that wants a different way | When filed under the situation's kind or procedure. The AI part may also propose a filed skill whose stated use fits. It never invents one. |
| Procedure | The business's own steps for one kind of situation | The configurator | Pinned when the situation gets its kind; presented at W1 and W3 |
| Rule | A decided business fact or limit ("refunds within 7 days") | The configurator | Enforced by tools and checks; presented if a step needs to know it |
| Preference | A choice about behaviour ("speak Hindi") | The configurator | Presented at C1 |

[Swaraj] "Not everything has a skill. We only have tools." Most kinds of work have no skill and no procedure; the step works by default behaviour. Swaraj wants a skill for deep research; it is not written yet.

**[Swaraj to decide]** Swaraj: the business "will put some skills, some business rules there", and "instructions are always in skill files". Should a business's procedure be kept as a business-written skill file, pinned per situation? This document thinks yes. It would sit in the decided text layer for skill text, owned by memory, so no new kind of text is added. The improvement process may refine Tend's own skills, but never a business's.

### D4. Tools

**[Proposed]**

- The business's tool list is the tools it switched on, each with its purpose group, a description, and its form.
- At W1 the fixed part presents tools named in the procedure, and any group filed under the kind. The AI part may add groups whose description fits.
- During reasoning, a step may ask memory "I need a tool that can…". The AI part searches the tool list.
- The check allows only a tool whose form was presented in this run.
- [Swaraj] "We have 10,000 tools… We don't want to bind tools… we'll run those tool ourselves."

### D5. Links between situations

**Constraints.**

- [Swaraj, 26 October] Linking "should be complete responsibility of memory and knowledge itself"; and, in the same message, "maybe the decision of a yes or no can go to the conversation manager".
- [Swaraj, 28 October] Memory's "main purpose is context engineering, not decision making."
- [Decided, 9 and 22 October] Memory proposes links; the situation worker accepts or denies each, on evidence, and writes it.

**[Swaraj to decide]** Should a link resting on a shared number be recorded without a worker accepting it?

- **No** (the decided rule). Memory proposes every link, with its basis. A worker accepts or denies, and writes an accepted link as a new version of its situation, recording both situations [Decided].
- **Yes** [Change]. Memory records a link when the same number sits in a typed field of both situations, and in both it came from a business system's record or a person's confirmed answer. A link resting on meaning stays a proposal. Argument for: recording that two records hold the same order number is not a judgment, and it fits "complete responsibility of memory". Argument against: the 28 October words keep memory out of decisions, and a worker may still judge that a shared number does not make two problems related.

**Either way:**

- Under "yes", the link record is memory's own, and changes no situation's record. [Change] That replaces the decided rule that the worker writes each link into its situation.
- An **incident link** groups situations sharing an incident code in a typed field, such as a carrier's hold code, at the same place, within a time window the business configures. The same code at another place, or outside the window, is another incident.
- Each link is written once per key (number, or code with place and window); two saves at the same moment cannot create two.
- Number matches are found at once by the fixed part's lookups, because typed fields are current the moment a version is saved. Link records are written in the background, seconds later. [Change] This changes the harness study's rule (September 2026) that link records are written at once, in the loop. That rule would put a memory write inside the loop, against Swaraj's "memory write part should be in a different process".
- Removing a link: under the decided rule, a worker denies it. Under "yes", [Change] a person who may see both situations may also remove memory's link record. Either way, the removal is recorded.

### D6. How a change reaches another situation

**The problem.** [Swaraj] "After Arjun gives the corrected pin code, what will happen since both of the situations are linked? Because just linking the situation, will both the situation wake up? … how would the pin code traverse from one situation to other?"

**Constraints.** [Decided] Only intake saves arrivals. Only a situation's own worker ends its waits. Links share context; they do not carry changes. [Decided] When one arrival or rule change touches several situations, the conversation manager saves it once and writes a version into each, carrying its reference.

**[Proposed]** Linking does not wake anyone. A change travels like this:

1. At W3, the worker fixed part shows other situations, with the same number in a typed field, whose waits name that number. Example: "a situation of kind address fix waits for a delivery address for order 8840."
2. The decision may choose **tell another situation**, naming it and the claim to send.
3. The check confirms:
   - the two situations share a number in typed fields, or a link;
   - the receiving situation's people may see the claim;
   - a claim about a person (an address, a phone number) travels only between situations sharing a number from a business system's record or a confirmed answer, or sharing that person; a link based on meaning carries only claims that are not about a person;
   - the **tell budget** for this pair of situations is not spent. The budget is a count of tells between the two in the last 24 hours (a starting value), kept with the tells themselves and counted across all runs, set in configuration. So two workers cannot tell each other forever.
4. Worker code hands the tell to intake: an arrival addressed to that situation, carrying the claim, its source, and a key made of the sending situation, the claim and its version. [Change] This is a new kind of arrival, coming from another situation rather than from outside, and a new path besides the decided one-to-many path above. The claim arrives as a claim, with its source; nothing in the receiver's record changes except by its own worker. Intake drops a second arrival with the same key.
5. Intake saves it in the receiving situation. If that situation is completed, the tell is routed like any arrival for a completed situation: routing's AI chooses the new situation's kind, routing code starts it, and intake saves the tell there. [Decided] New work after a situation has closed is a new situation, related to the closed one. The relationship follows the link rule in D5.
6. The receiving situation wakes. Its own worker reads the claim at W3, and decides whether its wait is answered.

A related situation that is not waiting is not told. It sees the change only when it next wakes for its own reason. [Change] [Swaraj to decide] Should a situation also check related situations on a regular timer? Today the only regular wake is the check-in [Decided].

**The outreach example.** [Decided] Each person on an owner's list gets their own situation, and one board shows them all. This is treated as settled in Tend's design. Swaraj remembered it differently: "one central situation, and there were 100 other situations", where "updating one situation… the update will go to the next one also". [Swaraj to decide] Is the decided design what he wants, or should outreach gain a central situation, which would be a change?

### D7. Outside knowledge

[Swaraj] "It can either use the web to find it, or the memory loop can use the web to before it starts anything."

**[Swaraj to decide]** This document recommends: memory does not call outside. When the business knows nothing about a subject, memory says so, advises establishing it, and presents the web tool if the business switched one on. The worker uses it, through the tool layer's permission check. What it finds is saved as claims. Reason: every outside call keeps one permission check and one record.

### D8. Documents

**[Proposed]** A document that arrives is saved by intake, routed like any arrival, and saved in its situation as a claim from its sender. Its text is indexed with that situation's view. It wakes the situation. It is never an instruction.

---

## Part E. Scope, safety and cost

### E1. Seeing everything, presenting little

**[Proposed]**

- Memory's background parts may read every record of one business. Never another business. [Decided] Each business has its own store.
- Every search for a step uses the view the request names, set by fixed code, applied before any ordering or cap.
- Routing uses the sender's view. A business event the sender may not see is never used in routing. [Swaraj to decide] Should the meaning of such an event (for example, the dates of a sale the business advertised to customers) be visible to customers, so routing can use it? That is a setting per event.
- The worker uses the situation's view (see "Who may see what").
- The communication layer writes a message only from the claims the decision listed by ID. The send check tests each claim's visibility for the recipient. Free text the AI writes around them is checked against the same list.
- **A number the view filters out** is not presented, and only its reference goes to the trace. [Change] [Swaraj to decide] The 3 October routing rules, which Swaraj agreed, and which the routing file records with "Those are rules now", give routing "a note that a foreign reference was seen and not opened". That note tells the AI the number exists, so its reply could differ from its reply to a number that does not exist. Should routing still get the note?

### E2. Writing never slows the loop

[Swaraj] "Memory write part should be in a different process/thread so the main loop is fast and quick and the read is still updated and the latest."

**[Proposed]**

- Inside the loop, memory writes nothing the loop waits for. The typed fields that routing and the worker look up are written by the situation's own save.
- [Decided] A cache may make reads faster, but never guards a decision. Memory keeps no cached context that a step relies on; anything cached is checked against the newest version before it is presented.
- At each point memory may add a learning note to a queue that does not wait.
- Link records, indexes, knowledge items and lessons are written by the background parts.
- [Swaraj] At each step memory "either choose to learn something… or choose to propose something or choose to stay neutral". Here: propose or neutral is the package's stance; learn is the learning note.

### E3. Who controls learning

[Working] The business chooses: learning off, automatic, or each lesson checked by a person. Integrity checks (scope, source, conflict with a rule, malformed items) run in every mode. Learning never changes a rule the business wrote. [Decided, architecture] The owner and the configurator may switch modes and retire learned items.

**[Change] [Swaraj to decide]**

- Should an employee be able to correct an item drawn only from situations they are assigned to?
- Should work the business owner accepted (such as research findings) become business knowledge? The decided rule is that the business owns official knowledge and Tend owns its own experience.

### E4. When memory fails

**[Proposed]**

- **The fixed part cannot answer.** Its items are needed.
  - [Decided, 22 October] A worker step that needs memory's items waits for memory, with a due time, or the step is given to a person.
  - [Proposed] Routing retries for 10 seconds within the run. If memory still does not answer, routing cannot see even the sender's open situations, so this is not an ordinary held note: a work item goes at once to the person the business named for arrivals Tend could not place, and that person places the arrival.
- **The AI part fails or is too slow.** Its items are help. The step goes on with the needed items; the package says the AI part did not answer.
- **A search finds nothing.** The package says so. Memory never fills a gap.

### E5. Cost

**[Proposed]** AI calls, in sequence, for one new customer message that starts work:

| Stage | Calls |
|---|---|
| Routing reasoning | 1 |
| R2 AI part, when triggered | 0 to 2 |
| Routing rewrite, if memory added anything | 0 to 1 |
| W1 AI part | 1 to 2 |
| Planning turns, if a plan is needed | 0 to 3 |
| First decision | 1 |
| W2 AI part and rewrite, when triggered | 0 to 2 |
| Writing the reply | 1 |

Between 4 and 13 calls before the first reply. [Open] No delay target exists yet. This is the number to measure.

**Background:** meaning-index updates per save; the link finder, which compares a new situation only with situations of the same kind from a set recent window, up to a set number; the learner. **Each tell** costs an intake save, a wake and a decision; the pair's tell budget caps it. W3's number lookup is capped per number.

### E6. What is recorded

**[Proposed]** Each package is recorded in the run's trace as references only: what was searched (the filters, not personal values), the record IDs and versions presented, and a code for why. Record IDs are the same kind of reference the decided trace already holds (the situation and version a run read). [Decided] No names, addresses or message text in a trace. The test and simulation environment replays real runs from those references.

### E7. Erasure

**[Proposed]** When a person must be erased, memory removes from its own stores: their rows in the words and meaning indexes; knowledge items whose only source is them; learning notes about them; cached context. Lessons and business words hold no personal data, by the learning integrity checks, so they need no change. Link records and records of what was presented hold only references. Traces hold no personal data.

[Open] The situation store keeps every version and arrival without rewriting them, by decided rule. Erasing a person from it needs a rule Tend does not have yet; this is already noted as unresolved in the architecture. It is outside memory, but memory's erasure is only complete once it is solved.

### E8. Who establishes which fact

**[Proposed]** [Swaraj] "Whatever we get, the conversation manager gets, establishing it is first." The conversation manager establishes the two facts routing needs: who sent the arrival (from the person record) and which situation it belongs to (the routing check). Everything else in an arrival is saved as the sender's claim. The situation worker establishes claims by its evidence rules, and checks at each decision whether the work was really done. Memory establishes nothing.

---

## Part F. The background parts

**[Proposed]** [Swaraj] Memory has "multiple types of loop, multiple types of component that only activate a certain set of components for a certain set of jobs."

| Part | Kind | Wakes on | Does |
|---|---|---|---|
| Link keeper | fixed code | version notices | writes link records once per key; proposes number links, or records them (D5) |
| Indexer | fixed code, using an AI model for meaning | version notices; documents | updates the words and meaning indexes |
| Link finder | AI | new situations | compares with a capped set of recent situations of the same kind; proposes links based on meaning |
| Learner | AI proposes, fixed code reconciles | traces; learning notes; outcomes | lessons, business words, business events, under the learning rules and integrity checks |
| Cleaner | fixed code | erasure requests; a daily timer | carries out erasures; marks items whose own dates have ended as "past" |

None writes a situation record. [Decided] Memory "writes no situation record".

---

## Starting values

**[Proposed] [Swaraj to decide]** Every limit needs a number for the tests to be checkable. These are starting values, to be measured and changed in each business's configuration.

| Limit | Starting value |
|---|---|
| Results per search (the cap) | 10 |
| Search rounds for the AI part, per point | 2 |
| Reasoning turns per plan | 3 |
| Plans per run | 2 |
| Rounds per run | 5 |
| Situations shown per number at W3 | 20 |
| Tells between one pair of situations | 3 per 24 hours [Swaraj to decide whether a budget should reset at all] |
| Link finder: recent situations compared | the last 30 days, at most 200 |
| Incident window | 7 days |
| Routing retry when memory does not answer | 10 seconds |
| A tool call with no answer counts as failed after | 60 seconds |
| A held note goes to a person after | 24 hours |
| A worker step waiting for memory goes to a person after | 5 minutes |

## What this asks Swaraj

Each is a yes-or-no question.

1. Should the harness call memory at fixed points: before and after routing's reasoning; before planning; before every decision; after every written reasoning; and before a message is written? (A1, A2)
2. Should memory's fixed code be three pieces: a routing part and a worker part that match exact values only, and a search runner that runs the AI part's searches, with everything else done by memory's AI part? (B1, B2)
3. Should memory's AI part run by the triggers in the one-page table? (Page 1, B2)
4. Should memory's AI part also run before every decision? (B2)
5. You asked for search by meaning ("we retrieve semantic"), and also said no AI-made number should decide anything. May a meaning search order the results the AI part reads, with the total always shown? (B4)
6. Should the worker plan when needed, then decide on the newest version before every action, with deciding as checking the work against what was asked? (C1, C2)
7. Should routing handle one arrival per person at a time? (C3)
8. Should each business have person records, with channel addresses and outside keys, and new addresses tied only by a business record with one match, a verified sign-in, or the person's own confirmation? (D1)
9. Should business events come only from the owner, the configurator or configuration? (D2)
10. Should a business's procedure be kept as a business-written skill file, pinned per situation? (D3)
11. Should a link resting on a shared number be recorded without a worker accepting it? (D5)
12. Should link records be written in the background, seconds after the save? (D5)
13. Should a change travel by "tell another situation", through intake, with a tell budget per pair? (D6)
14. Should a situation also check related situations on a regular timer, besides the check-in? (D6)
15. Is one situation per person on an outreach list, with one board, what you want? Your recollection was a central situation. (D6)
16. Should the worker, not memory, fetch outside knowledge? (D7)
17. Should routing still get the 3 October note when a number exists but the sender may not see it? (E1)
18. Should an employee be able to correct learned items from their own situations? (E3)
19. Should work the owner accepted become business knowledge? (E3)
20. Are the starting values acceptable to start with? (Starting values)
21. May the words and meaning indexes lag a few seconds behind the saves, while exact lookups stay current? (B3)
22. Should a business event's visibility be a setting per event, so a sale the business advertised can be used in routing? (E1)
23. Should a pair's tell budget reset, and how? (Starting values)
