# Understanding and routing — what Tend is responsible for

This file answers one question: what must Tend be responsible for when a change arrives?

A change arrives from a message, an instruction, a system report, an agent's result, or time passing. <!-- B1 --> Three duties follow, in this order:
1. **Understand** what the change says.
2. **End there, or place it.** Answer it when no situation is needed, or get it to the right problem, from that understanding.
3. **Update** that problem with what the change adds.

(Corrected 2026-10-29: this said "Get it to the right problem. Then understand what it adds." Swaraj: "before routing you have to understand the situations first and then route".) <!-- C7; C8; PL-5 -->

**Rebuilt later on 2026-10-29: understanding is a stage of its own, and routing is code.** The project owner: "So routing is more code based"; "instead of having that heading in design as routing, the heading as understanding would have been much better". The conversation manager's work is now the arrival loop of [Tend's product loop](../../../Level%202/the_product_loop/how_does_the_product_loop_work.md). <!-- PL-1; PL-3; PL-6 -->

Who is who here:
- The **conversation manager** is the part that reacts when something happens and sends messages to people. Its **arrival loop** has three stages:
  - the **intake step**, fixed code that saves each arrival and finds who sent it;
  - **understanding the arrival**, its one AI stage;
  - **routing**, fixed code.
- The **understanding artifact** (until later on 2026-10-29, the **reading**) is what understanding the arrival writes before anything acts on an arrival:
  - each ask, and whether it is about the business;
  - what each refers to, with time words turned into dates;
  - the sender's claims;
  - what is unknown;
  - what Tend already holds that answers it;
  - where each ask fits.

  It is an interpretation, saved with the arrival, never a conclusion. (The status label "the design's reading" is a different thing: a rule worked out from its sources.)
- The **situation worker** is the part that works one situation through the situation loop.

Each rule here has one of these statuses:
- **Decided:** the project owner, the person designing Tend (not the business owner), said yes. On 2026-10-22 the project owner accepted every recommendation this design had made, and asked for the smaller questions inside them to be settled in the way that best fits; those points are Decided, and points settled that day say so. A rule marked as "the design's reading" was worked out from its sources rather than found written down; it is Decided too. <!-- decided by the owner, 2026-10-22 -->
- **Provisional:** a working choice that carries a condition for reopening it.
- **Rejected:** turned down on purpose, with the reason kept.
- **Deferred:** a value or a detail left, on purpose, to a later stage: **deferred to configuration** (each business or market sets it), **deferred to Level 3** (the stage that chooses the technology), or **deferred to implementation** (whoever builds it). The rule around it is Decided.
- **Call:** a choice this design made, not yet confirmed by the project owner.

Two earlier status words, **To confirm** (written down, but not yet agreed by the project owner) and **Open** (no answer yet), are no longer used: since 2026-10-22, no rule here carries either.

A rule with no status word next to it is **Decided**: it has a source the project owner accepted. Every rule that is not Decided carries its word where it appears. In the rest of this file, "the owner" means the business owner.

<!-- Every rule below carries its code in a hidden note. Its meaning, source, and status sit in code_index.md in this folder. -->

## Understand before anything else

Tend understands each change before it acts on it, routing included. <!-- C7 --> Product Vision: "Tend should never take an action before understanding the situation." The business's written answers on understanding the situation give the order: preserve what arrived, build its candidate readings, then apply routing, then update the situation.

**Understanding the arrival is the conversation manager's one AI stage.** <!-- PL-3 -->
- **Before it runs,** memory and knowledge hands it what the arrival's words mean in this business:
  - the business's events and their dates, its words, places and products and their other names;
  - facts the business configured;
  - the sender's open situations, as short summaries made of typed fields, with the waits and questions each holds on this person;
  - the sender's recent messages and earlier understanding artifacts;
  - the time.

  <!-- N19; N29 -->
- **It uses only what Tend holds.** It never calls a business system and never asks a person; reading a business system is gathering's work. <!-- PL-3 -->
- **It writes the understanding artifact** (one structured answer), with fixed sections:
  - each ask, quoted, and whether it is about the business;
  - what each business ask refers to, with each time word turned into a date or a range, or kept as a small set, each resolved value naming the item that resolved it;
  - what is only the sender's claim;
  - what is unknown;
  - whether the arrival answers a question Tend asked;
  - whether it refers to earlier work or a past purchase;
  - the item Tend holds that answers each business ask, if one does;
  - where each business ask fits: a presented open situation, a new situation of a named kind, "needs the wider look", or "cannot tell between" named situations.

  <!-- C8; PL-3 -->
- **The wider look.** When an ask needs it, memory and knowledge narrows the sender's own situations, open and closed, by the values understanding resolved: exact values first, description only inside what those leave, with the total (agreed on 2026-10-03). An empty set means new work, with no second pass. Otherwise, understanding chooses among the set. <!-- N37; PL-4 -->
- **The artifact is an interpretation,** never a fact. It is saved with the arrival, so no later step reads the arrival again from scratch. <!-- C8 -->

## Where the arrival ends

Fixed code chooses the ending from the understanding artifact. An arrival may take more than one: a general question gets the reply while its business ask is routed. <!-- PL-5 -->

| Ending | When | What happens |
|---|---|---|
| **Reply** | No ask is about the business: a greeting, small talk, a general question, a sum | No situation. The conversation manager's reply decision answers; the reply says nothing about the business. The arrival is kept in the person's message history, marked, and memory and knowledge never learns from it. <!-- PL-7; PL-8; PL-9 --> |
| **Nothing to do** | About the business, but nothing is asked, no question is answered, no claim is brought: a thank-you after a closed refund | No situation, and no version of the situation it refers to. It is kept in the person's message history, naming that situation. The reply decision: no reply by default (a call). <!-- C9; PL-8 --> |
| **Answered from what Tend holds** | Every business ask is answered by an item that counts as evidence: a current claim in the sender's own situation, with no open conflict on its field, or a fact the business configured, read from its own store. The sender may be told each item, and the arrival brings no new claim | Routing places the arrival, marked; the reply decision tells the person at once; the worker records the asks as answered afterwards. The project owner, 2026-09-05: "If the conversation manager feels that the situation model itself has enough information to answer the user back, it just does that." Answering from a configured fact extends that ruling: a call, not yet confirmed. <!-- PL-10 --> |
| **Hold and ask** | Understanding cannot tell which situation is meant, or a fit depends on a word it could not resolve | A held note; the reply decision asks the sender. <!-- B3; B9; N31 --> |
| **Routed** | Otherwise | Routing (below). <!-- PL-6 --> |

"Any update?" from a customer with three open orders gets a question, not a guess. <!-- B3 -->

On "hold and ask", Tend records that the message may belong to a situation. It does not change that situation. <!-- B9 -->
- The record is a **held note**: a note that says "this may belong here".
- It is kept in the conversation manager's own record of held notes, not in any situation.
- It carries no confident update, so the situation is not changed by it.
- If the sender never answers, the held note stays as it is, and goes to a person to place when the business's wait limit ends.

<!-- closed item: unanswered routing question -->

## Routing is code

Routing carries out the understanding artifact, and nothing else. It interprets no words. <!-- PL-6 -->
- **It checks the artifact:**
  - every quote is in the arrival;
  - every situation it names was presented to understanding;
  - every resolved value names a presented item;
  - the ending's condition holds.

  A failed check goes back to understanding once, with its reasons. A second failure goes to the person the business named for arrivals Tend could not place. <!-- N20; settled 2026-10-22: memory unreachable -->
- **It acts:** it attaches each ask to the situation it fits, starts one situation per distinct new fit, keeps a held note, or marks an "answered from what Tend holds" placement. It saves the arrival and its artifact in each routed situation's new version. <!-- PL-6 -->
- **One arrival loop per person** runs at a time, keyed by the person ID. <!-- B10 -->

Before it gathers any business information, Tend places each change on the right situation, or creates a new one. <!-- B2 --> To match one message, Tend reads short summaries. It reads a full record only after the message is placed.

The conversation manager records each incoming message with its platform reference. The platform keeps the original message. <!-- B7 --> Tend keeps the reference and what it needs to work. The message itself stays where it came from.

A message is placed by the kind of signal understanding finds in it: the channel or address it came through, a reference like an order number, the surrounding context, or the meaning of the words. <!-- Level 2 understanding: signals -->

## Routing happens in two places

**On arrival:**
- fixed code identifies the person;
- understanding the arrival writes its artifact;
- fixed code chooses the ending;
- routing places the arrival, or the conversation manager answers it.

<!-- B4; C7; C8; C9; N37; PL-5 -->

**After new evidence,** Tend splits, merges, or reroutes the situations. <!-- B4 -->
- A wrong placement is corrected when later evidence shows it.
- A merge is only that correction: two situations that are one problem. Related situations are linked, never merged.
- The situation worker writes each split, merge, or reroute as a new version, with its reason; routing only places arrivals.

<!-- Level 2 gathering: gathering corrects understanding -->

When it is unclear whether two messages belong together, Tend prefers separate situations with a link, over a silent merge. <!-- B8 -->

A list of 30 leads creates 30 situations, one per person, and one central situation linked to all of them, which tracks the progress. There is no board: Swaraj, 28 October 2026, "There is no such thing as a board." <!-- B6 --> One instruction does not become one problem. Each item is its own situation. <!-- B6 -->

The rules for splitting one message into situations, and for linking situations, are in [the situation file](the_situation.md). The routing decision (when to prefer separate situations over a silent merge) is written here. <!-- A4; B8 -->

## Understanding in the situation

The situation worker's first stage, understanding the situation, places new content in the full record before it gathers or decides. <!-- C10; PL-11 -->
- **It runs** when there is something to place: an arrival that brings claims, new asks, a correction or a document; a free-text result; a document.
- **It is passed** for a new situation (the arrival's understanding artifact is its first understanding), for typed results, and for an arrival with nothing to place.

Tend updates the routed situation with what the change adds, before it decides what to do. <!-- C1 --> The conversation manager records what came in, with its understanding artifact. The update comes first; the decision reads the update.

Uncertainty and ambiguity are recorded. A guess is never stored as a fact. <!-- C2 -->

Tend selects only the information that matters for this situation and ignores the rest. <!-- C3 --> Relevance is direct (a fact this decision needs) or indirect (a reference only). <!-- Level 2 understanding: relevance --> An ignored input is still kept, with a note of where it is and why it was ignored. <!-- Level 2 understanding: relevance --> Ignored does not mean lost.

Tend keeps four things apart: what was observed, what was claimed, what Tend inferred, and what was decided. <!-- C4 --> They are never written as one kind of entry. "The carrier says delivered" is not the same as "the customer received it."

An unresolved point is sorted by what it blocks: <!-- C5 -->
- which situation it belongs to;
- what the person wants;
- what information is needed;
- who is responsible;
- which policy applies;
- whether the action is allowed;
- what the consequence would be.

Understanding does not ask anyone. Gathering asks for the smallest unresolved part. <!-- C5; PL-12 -->

A reply sent is not an operational result. "Reply sent" does not mean "refund completed." <!-- C6 --> What Tend said and what actually happened are two different facts, and the record keeps them apart.

## What this area writes

- **The understanding artifact,** with each arrival that carries words: an interpretation, written before anything acts on the arrival. <!-- C8; PL-3 -->
- **The held note,** on "hold and ask": a note that a message may belong to a situation. <!-- B9 -->
- **The incoming record:** what arrived, with its platform reference. Either as a new version of a situation, or in the person's message history when it is not about the business or has nothing to do. <!-- B7; C1; PL-7 -->
- **The reply decision,** saved with its arrival. <!-- PL-8 -->
- **The recorded uncertainty:** what is ambiguous or unknown, never a guess. <!-- C2 -->
- **Four separate kinds of entry,** for what was observed, claimed, inferred, and decided. <!-- C4 -->

## At a glance

| What Tend is responsible for here | Takes in, hands on | Who decides | What happens when it fails |
|---|---|---|---|
| Understanding every change before acting on it, routing included <!-- C7; C8; PL-3 --> | In: the arrival, and memory and knowledge's package of what its words mean in this business. Out: the understanding artifact, saved with the arrival | Understanding the arrival, the conversation manager's one AI stage | A word it cannot resolve stays unknown; if a fit depends on it, the arrival is held and the sender asked <!-- N31 --> |
| Ending the arrival where it should end <!-- PL-5; PL-7; PL-10 --> | In: the artifact. Out: a reply, a kept arrival, an answer from what Tend holds, a held note, or a placement | Fixed code, from the artifact's sections | An ending whose condition fails goes back to understanding once, then to a person <!-- PL-6 --> |
| Placing every change before any gathering <!-- B2; PL-6 --> | In: the artifact. Out: attached, created, or held | Routing, fixed code | A wrong placement is split, linked, or rerouted once the evidence shows it. A merge joins two situations that are one problem, and is recorded <!-- B4 --> |
| Never guessing where an arrival fits <!-- B3; B9; N37; PL-4 --> | In: the artifact, and the situations presented to understanding: short summaries of open situations, and the small set from the wider look | A clear match decides itself; "cannot tell" asks the person | "Cannot tell" changes nothing: it records a held note and stops there |
| Answering what needs no situation <!-- PL-8; PL-9; PL-10 --> | In: the artifact. Out: a reply decision, saved with the arrival | The reply decision, fixed code | A reply that carries a claim about the business is stopped by the send check |
| One list, many situations and one central situation <!-- B6 --> | In: a list instruction. Out: one situation per person, plus one central situation linked to all of them, which every person's update reaches (no board, since 2026-10-28) | Understanding finds the fits; routing creates them | A wrongly created situation is corrected later: split, linked, or rerouted. Two situations that are one problem are merged, and the merge is recorded <!-- B4 --> |
| Recording the message with its platform reference <!-- B7 --> | In: the message. Out: the reference and what Tend needs | The conversation manager records it | Tend's copy is never the master; a lost copy is replaced from the platform <!-- B7 --> |
| Updating the situation with what the change adds <!-- C1; PL-11 --> | In: the routed change. Out: a new version | The conversation manager records what came in; the situation worker's understanding writes what it adds | A decision made before the update reads stale facts; the update comes first <!-- C1 --> |
| Keeping observed, claimed, inferred, and decided apart <!-- C2; C4 --> | Out: four separate kinds of entry | The situation worker writes what Tend concludes | A guess stored as a fact is corrected as a new version; the earlier one stays as history <!-- Level 2 trust --> |
| Classing what is unresolved by what it blocks <!-- C5 --> | In: an open question. Out: its class and the smallest ask | Tend classes it; gathering asks | The unresolved point stays visible; nothing is assumed in its place <!-- C2 --> |
| Keeping "answered" apart from "resolved" <!-- C6 --> | In: the send record. Out: two separate facts | The communication layer records what was sent; the situation worker records the outcome | The completion check catches it: a reply is never an ending <!-- C6 --> |
