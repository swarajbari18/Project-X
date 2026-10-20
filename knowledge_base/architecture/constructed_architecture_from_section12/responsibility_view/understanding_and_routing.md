# Routing and understanding — what Tend is responsible for

This file answers one question: what must Tend be responsible for when a change arrives?

A change arrives from a message, an instruction, a system report, an agent's result, or time passing. <!-- B1 --> Two duties follow. Get it to the right problem. Then understand what it adds.

Who is who here: the **conversation manager** is the part that reacts when something happens and sends messages to people. Its **intake step** is the fixed step that reads each new message as it arrives. The **situation worker** is the part that reasons about one situation and decides its next step.

Each rule here has one of these statuses:
- **Decided:** the project owner — the person designing Tend, not the business owner — said yes. On 2026-10-22 the project owner accepted every recommendation this design had made, and asked for the smaller questions inside them to be settled in the way that best fits; those points are Decided, and points settled that day say so. A rule marked as "the design's reading" was worked out from its sources rather than found written down; it is Decided too. <!-- decided by the owner, 2026-10-22 -->
- **Provisional:** a working choice that carries a condition for reopening it.
- **Rejected:** turned down on purpose, with the reason kept.
- **Deferred:** a value or a detail left, on purpose, to a later stage — **deferred to configuration** (each business or market sets it), **deferred to Level 3** (the stage that chooses the technology), or **deferred to implementation** (whoever builds it). The rule around it is Decided.

Two earlier status words, **To confirm** (written down, but not yet agreed by the project owner) and **Open** (no answer yet), are no longer used: since 2026-10-22, no rule here carries either.

A rule with no status word next to it is **Decided**: it has a source the project owner accepted. Every rule that is not Decided carries its word where it appears. In the rest of this file, "the owner" means the business owner.

Every rule in this file is Decided.

<!-- Every rule below carries its code in a hidden note. Its meaning, source, and status sit in code_index.md in this folder. -->

## Route before gather

Before it gathers any business information, Tend routes each change to the right situation, or creates a new one. <!-- B2 -->

Tend assembles the context of an incoming change once. Routing uses short summaries of the open situations. Understanding uses the full records of the situations that were routed. <!-- B5 --> To match one message, Tend reads short summaries. It reads a full record only after the message is routed.

The conversation manager records each incoming message with its platform reference. The platform keeps the original message. <!-- B7 --> Tend keeps the reference and what it needs to work. The message itself stays where it came from.

A message is routed by the kind of signal it carries: the channel or address it came through, a reference like an order number, the surrounding context, or the meaning of the words. <!-- Level 2 understanding: signals -->

## Two tiers of matching

Routing has tiers. A clear match attaches or creates. A weak match means Tend asks the customer or the sender a question. Tend never guesses. <!-- B3 -->

"Any update?" from a customer with three open orders gets a question, not a guess. <!-- B3 -->

On a weak match, Tend records that the message may belong to a situation. It does not change that situation. <!-- B9 --> The record is a **held note**: a note that says "this may belong here". It is kept in the conversation manager's own record of held notes, not in any situation. It carries no confident update, which means the situation is not changed by it. If the sender never answers, the held note stays as it is, and goes to a person to place when the business's wait limit ends. <!-- closed item: unanswered routing question -->

## Routing happens in two places

On arrival, the conversation manager's intake step identifies the person, matches the open situations, and then attaches, creates, or holds. <!-- B4 -->

After new evidence, Tend splits, merges, or reroutes the situations. <!-- B4 --> A wrong routing is corrected when later evidence shows it. A merge is only that correction: two situations that are one problem. Related situations are linked, never merged. The situation worker writes each split, merge, or reroute as a new version, with its reason; the intake step only places arrivals. <!-- Level 2 gathering: gathering corrects understanding -->

When it is unclear whether two messages belong together, Tend prefers separate situations with a link, over a silent merge. <!-- B8 -->

A list of 30 leads creates 30 situations, and one screen in the owner view that shows them together. <!-- B6 --> One instruction does not become one problem. Each item is its own situation. <!-- B6 -->

The rules for splitting one message into situations, and for linking situations, are in [the situation file](the_situation.md). The routing decision — when to prefer separate situations over a silent merge — is written here. <!-- A4; B8 -->

## Understanding the change

Tend updates the routed situation with what the change adds, before it decides what to do. <!-- C1 --> The conversation manager records what came in. The update comes first; the decision reads the update.

Uncertainty and ambiguity are recorded. A guess is never stored as a fact. <!-- C2 -->

Tend selects only the information that matters for this situation and ignores the rest. <!-- C3 --> Relevance is direct — a fact this decision needs — or indirect, a reference only. <!-- Level 2 understanding: relevance --> An ignored input is still kept, with a note of where it is and why it was ignored. <!-- Level 2 understanding: relevance --> Ignored does not mean lost.

Tend keeps four things apart: what was observed, what was claimed, what Tend inferred, and what was decided. <!-- C4 --> They are never written as one kind of entry. "The carrier says delivered" is not the same as "the customer received it."

An unresolved point is sorted by what it blocks: <!-- C5 -->
- which situation it belongs to;
- what the person wants;
- what information is needed;
- who is responsible;
- which policy applies;
- whether the action is allowed;
- what the consequence would be.

 Understanding does not ask anyone at this stage. Gathering asks for the smallest unresolved part. <!-- C5 -->

A reply sent is not an operational result. "Reply sent" does not mean "refund completed." <!-- C6 --> What Tend said and what actually happened are two different facts, and the record keeps them apart.

## What this area writes

Routing and understanding write these things. The held note, on a weak match: a note that a message may belong to a situation. <!-- B9 --> The incoming record: what arrived, with its platform reference, as a new version. <!-- B7; C1 --> The recorded uncertainty: what is ambiguous or unknown, never a guess. <!-- C2 --> And four separate kinds of entry for what was observed, claimed, inferred, and decided. <!-- C4 -->

## At a glance

| What Tend is responsible for here | Takes in, hands on | Who decides | What happens when it fails |
|---|---|---|---|
| Routing every change before any gathering <!-- B2 --> | In: a message, instruction, system report, agent result, or time. Out: attached, created, or held | The conversation manager, at its intake step | A wrong routing is split, linked, or rerouted once the evidence shows it. A merge joins two situations that are one problem, and is recorded <!-- B4 --> |
| Matching in two tiers, never guessing <!-- B3; B9 --> | In: the message and short summaries of open situations | A clear match decides itself. A weak match asks the person | A weak match changes nothing: it records a held note and stops there |
| One list, many situations and one board <!-- B6 --> | In: a list instruction. Out: one situation per item, plus the board | The conversation manager's intake step creates them | A wrongly created situation is corrected later: split, linked, or rerouted. Two situations that are one problem are merged, and the merge is recorded <!-- B4 --> |
| Recording the message with its platform reference <!-- B7 --> | In: the message. Out: the reference and what Tend needs | The conversation manager records it | Tend's copy is never the master; a lost copy is replaced from the platform <!-- B7 --> |
| Updating the situation with what the change adds <!-- C1 --> | In: the routed change. Out: a new version | The conversation manager records what came in; the situation worker writes what Tend concludes | A decision made before the update reads stale facts; the update comes first <!-- C1 --> |
| Keeping observed, claimed, inferred, and decided apart <!-- C2; C4 --> | Out: four separate kinds of entry | The situation worker writes what Tend concludes | A guess stored as a fact is corrected as a new version; the earlier one stays as history <!-- Level 2 trust --> |
| Classing what is unresolved by what it blocks <!-- C5 --> | In: an open question. Out: its class and the smallest ask | Tend classes it; gathering asks | The unresolved point stays visible; nothing is assumed in its place <!-- C2 --> |
| Keeping "answered" apart from "resolved" <!-- C6 --> | In: the send record. Out: two separate facts | The communication layer records what was sent; the situation worker records the outcome | The completion check catches it: a reply is never an ending <!-- C6 --> |
