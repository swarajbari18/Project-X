# Section 11: the decisions the design rests on

**Date:** 2026-10-12. This file goes with `section_11_stabilization.md`.

**Updated 2026-10-28.** Decision 9 is rewritten for memory and knowledge, and decisions 15 to 19 are added, from Swaraj's answers of 28 October 2026 and the Level 2 page "how memory and knowledge works with the loops".

**Updated 2026-10-29.** Decisions 20 and 21 are added: understanding comes first, and using knowledge is separate from showing records. Swaraj found that routing decided before "the Diwali sale" was understood. Decision 15's cost is updated.

For each decision, this file says:
- what was decided,
- why,
- what it costs,
- and when we would reopen it.

The last two parts list the rules the design must keep, and what could force a change.

---

## 1. The twenty-one decisions

### 1. One container, three parts inside

- **Decided:** The conversation manager is one container. Inside it are three parts: the intake step (routing), the situation worker (decides the next step), and the communication layer (sends). Tools sit outside it.
- **Why:** Routing, deciding, and sending all act on the same problem history. They need one shared history.
- **Cost:** The container is large. Each part writes only its own kind of change, which limits the damage.
- **Reopen if:** a part needs its own scaling, or its own owner. There is no evidence of this yet.

### 2. Only the worker decides the next step. Time wakes only the worker. The worker never sends.

- **Decided:** The situation worker decides the next step and writes what Tend concludes. A timer wakes only the worker. The worker never sends a message. This follows the 2026-10-09 ruling.
- **Why:** Time decides nothing. A worker that sent would duplicate the decision to speak.
- **Cost:** A timer must read the latest record before it acts.
- **Reopen if:** a case appears where a timer must send and there is no record to read. None found.

### 3. Only the conversation manager sets "completed"

- **Decided:** The conversation manager sets a situation to "completed". It does this only when no wait is open and the last message has gone out. The worker records "resolved", but it cannot set "completed".
- **Why:** "Completed" should mean the customer has heard the end.
- **Cost:** One more step before "completed".
- **Reopen if:** a business needs an end with no message at all. No evidence of this yet.

### 4. Every write is a new version, and its change is announced in the same run

- **Decided:** Every change to a situation is a new version. A version is never rewritten, except by a confirmed erasure (decision 19, added 2026-10-28). A write and its announcement happen together. A write without its announcement is retried.
- **Why:** The history stays explainable.
- **Cost:** Storage grows with each version.
- **Reopen if:** storage becomes a measured problem. No budget is set yet.

### 5. Actions outside Tend go through the tool layer, in a fixed order

- **Decided:** For any action that changes something outside Tend, the steps run in this order:
  1. Check that the outside source can answer.
  2. Check permission.
  3. Check for a duplicate.
  4. Record what is about to happen.
  5. Make one call.

  If the result is unknown, it is checked before anything is repeated. An action that cannot be undone is never repeated automatically.
- **Why:** A rule in fixed code cannot be talked around by the AI.
- **Cost:** An unknown result can stay unknown for a long time, then reach a person. A customer may wait.
- **Reopen if:** an outside system gives a clear result for sends. That is a detail for Level 3, and it does not change this decision.

### 6. Permissions belong to verified people. Only the configurator writes grants. An approval is asked again after any change.

- **Decided:** A person is verified by the identity provider. A name or a phone number alone grants nothing. Only the configurator's fixed tools can write a grant. Permission is checked at each action, against the live store. An approval covers one request. If the situation changes, the approval is asked again.
- **Why:** A name or number is not proof. A stored copy can be out of date. An approval given before a change may no longer fit the situation.
- **Cost:** More asks, and more work for approvers.
- **Reopen if:** the number of approvals becomes unworkable.

### 7. The refund setting is read when a refund is tried. It starts at zero.

- **Decided:** Each business has one refund setting. It starts at zero. A refund at or below the setting can go through without a person. A refund above the setting needs a person to approve it. The business owner, or the configurator the owner names, sets the setting. The setting is read when a refund is tried.
- **Why:** The business sets its own limit. Zero keeps a person on every refund until the business chooses otherwise.
- **Cost:** This is the one exception to the pinning rule (decision 8). A business that sets a high value lets small refunds run with no person.
- **Conflict:** resolved on 2026-10-12. Level 2 now says money above the refund setting needs a person, in four places.
- **Reopen if:** the Level 2 wording is changed back. That would undo this decision.

### 8. Business rules are pinned to each open situation. Platform rules are checked again. Business settings are not.

- **Decided:** Each open situation keeps the version of each business policy it started with. When a policy changes, each open situation gets a notice and a check with a deadline. The owner chooses to keep the old version or move to the new one. When a platform rule changes, each open situation is checked again. When a business setting changes, open situations are not checked again.
- **Why:** A rule change should not silently change a promise already made. A platform rule must apply now, or a message may become illegal.
- **Cost:** Old versions stay in use until they are moved.
- **Reopen if:** the default at a deadline turns out to be unsafe.

### 9. Memory and knowledge presents. It never decides.

- **Decided:** Memory and knowledge presents knowledge, candidates and advice to each step. It never chooses between candidates, chooses the next action, or says a claim is true. It can learn lessons and propose settings. It cannot change a rule, a permission, an approval, an owner, a legal limit, or the line around an action that cannot be undone. The configurator checks each suggested setting. Only the configuration tools apply it. (Rewritten 2026-10-28; it was "Memory suggests. It never decides.")
- **Why:** Swaraj: its "main purpose is context engineering, not decision making". A lesson can be wrong. A change of authority needs a person behind it.
- **Cost:** Slower learning. Each step still has to decide with what it was given.
- **Reopen if:** a way to promote lessons is decided. It is provisional now.

### 10. A closed situation reopens only when its closure was wrong

- **Decided:** A closed situation reopens only if it was closed wrongly: the same problem was resolved too early, or the problem came back. The reopen marks the same record. A new problem gets a new situation, linked to the old one.
- **Why:** It keeps the history. It catches wrong closures.
- **Cost:** A reopen needs a clear reason.
- **Conflict:** four Level 2 summary lines say a closed situation is never reopened. Those lines must change.
- **Reopen if:** wrong closures turn up often.

### 11. Channels and consent

- **Decided:** A reply goes on the channel the person used, while that channel's window is open. A new start uses the first channel that is available and allowed. Templates need opt-in. A person who writes in has consented to replies on that channel. Withdrawing consent stops every future message.
- **Why:** Each platform has its own rules. Consent is given per channel.
- **Cost:** Some people cannot be reached first on some channels. A business contact, or a wait, may be the only path.
- **Reopen if:** a platform changes its rules. The product team updates the rule record, and open situations are checked again.

### 12. Identity, and what each reader may see

- **Decided:** The identity provider identifies a person. A channel proves the channel, not the person. Each reader sees only the fields on its own list, and the default is nothing. Each business has its own store. There is no free plan. Every customer pays. The only trial is 14 days on the paid plan.
- **Why:** In a shared store, one missed search condition exposes another business.
- **Cost:** The cost of separate stores.
- **Conflict:** resolved on 2026-10-12. Level 2 now says there is no free plan, and each business has its own store.
- **Reopen if:** the company ever offers a free plan. That would be a new decision, with its own record.

### 13. Status checks: five calls inside one tool, repeats by a service, no fixed clock

- **Decided:** A tool makes at most five status calls inside one wait. Repeat checks run when that wait's own check is due. No part checks on a fixed clock. The business sets its check-in interval, which is the only regular trigger.
- **Why:** Unlimited checks waste calls and hide failures. A fixed clock checks for no reason.
- **Cost:** A slow outside system may take longer to answer.
- **Reopen if:** a kind of carrier cannot answer within five calls.

### 14. The owner view is built from the records and writes nothing

- **Decided:** The owner view is built from saved records when the owner asks. It writes nothing. The owner hears about three kinds of things, plus any change that alters the next business decision.
- **Why:** There is one truth. A second record would drift away from the first.
- **Cost:** The view may lag when a system is down. The business sets how much lag it accepts.
- **Reopen if:** the owner finds the view out of date.

---

### 15. Memory and knowledge runs beside every loop, and each loop waits for it

- **Decided (Swaraj, 2026-10-28):** Memory and knowledge runs on its own thread, beside the loops of the conversation manager, the situation worker and the communication layer. Before each part of a loop, the loop waits for its package: knowledge, or an explicit empty answer. Its AI part runs at every part, except after a decision that ends the run. Its slow jobs (links, indexes, learning) run behind and never block a loop.
- **Why:** A step reasons well only if the right context is in front of it before it starts. Swaraj: memory and knowledge is "a part of the harness itself that runs parallel to the loop".
- **Cost:** One more AI call and one more wait at every part: 10 to 23 AI calls before a first reply (10 to 20 before decision 20 added the reading). No delay target exists yet.
- **Reopen if:** measured delay or cost at Level 3 is more than businesses accept.

### 16. Memory and knowledge creates and maintains links

- **Decided (Swaraj, 2026-10-28):** memory and knowledge creates the links, not the worker. This replaces the 2026-10-09 rule that the worker accepts or denies each link.
- **How (from the business's Level 2 answers on links and reconciliation):** a shared number or incident code from records makes a link. A shared meaning alone is proposed, and stays unresolved until a signal appears. An employee who may see both situations may remove a link.
- **Why:** Creating and maintaining knowledge is memory and knowledge's job. A worker sees one situation and cannot see the whole business.
- **Cost:** A wrong number in records can make a wrong link; the link only shares context, and can be removed.
- **Reopen if:** links made from records prove wrong often enough to mislead workers.

### 17. An outreach has one central situation

- **Decided (Swaraj, 2026-10-28):** One situation per person, and one central situation linked to all of them. Every new version of a person's situation is sent to the central situation, as an arrival. The conversation manager tells the owner only what is material. There is no board.
- **Why:** The owner gave one task; its progress belongs in one situation that can be worked and explained.
- **Cost:** The central situation wakes on every person's update.
- **Reopen if:** outreach sizes grow until the central situation's wakes cost more than they help.

### 18. Skills live in versioned object storage, and a business may extend Tend

- **Decided (Swaraj, 2026-10-28):** product and business skills live in object storage, versioned, not shipped with the code. A business may write any skill, fill product templates, and connect any MCP server.
- **How (the design's reading, keeping the business's security answer that no tool is registered at runtime):** procedures are kept with skills; the configurator connects a server through a fixed tool; its tool list is captured, versioned and hashed, and a change waits for the configurator's approval. A step may use only tools presented to it. A skill grants nothing.
- **Why:** Skills change all the time; versioning them apart from the code keeps every worker on the same version. Businesses work differently.
- **Cost:** More text and more tools to search, and more outside text to treat as untrusted.
- **Reopen if:** a business skill or MCP tool is found to bypass a check.

### 19. Nothing is erased, except through a confirmed tool

- **Decided (Swaraj, 2026-10-28):** In normal work, nothing is erased: knowledge is retired, superseded or marked stale. Where the law requires erasure, the AI may propose it inside the erasure tool; the tool's confirmation rule asks the owner or configurator; then the erasure reaches every place the data lives, situation records included.
- **Why:** "We do not erase anything", and "not the AI will erase it". The law still gives customers the right to deletion.
- **Cost:** Situation records are no longer strictly never rewritten; one confirmed path can remove data from them.
- **Reopen if:** a market's law requires erasure without the business's confirmation.

### 20. Understanding comes first

- **Decided (Swaraj, 2026-10-29, and Level 2):** Tend understands each arrival before it acts on it, routing included.
  - The conversation manager writes a **reading**: what is asked, what the arrival refers to (time words turned into dates), the sender's claims, what is unknown, whether it refers to earlier work, its kind, and whether it is work at all.
  - Before the reading, memory and knowledge hands it the business's events and words found in the arrival, earlier readings, and the time.
  - Routing's candidates come from the reading by exact values. Code decides when it can; the AI chooses only when code cannot.
  - The reading is saved with the arrival, as an interpretation, never a conclusion.
  - The worker understands new content before it plans or decides.
  - An arrival that is not work creates no situation.
  - The routing queue is per person.
- **Why:**
  - Swaraj: "The first thing should have been understanding where it would understand what the Diwali sale was about, and so in routing, when there is the retrieval thing, the retrieval would have been much simpler this time. We would just know the dates of the sales and we could just make a filter about that."
  - The Product Vision: "Tend should never take an action before understanding the situation."
  - Level 2's ambiguity page builds candidate interpretations before it applies routing. Its 4 September note makes the conversation manager's MEANING step understanding at entry.
- **Cost:** one more AI turn per arrival that carries words, and a turn of understanding when a worker's wake brings new content. Routing's retrieval becomes a filter, not a search, which should cost less; this is expected, not yet measured.
- **Reopen if:** the reading is often contradicted by the worker's understanding, which would mean routing's package lacks what understanding needs.

### 21. Using knowledge is separate from showing records

- **Decided by Swaraj's words of 27 October and by Level 2's rule on who may see and disclose information, applied on 2026-10-29 without a new question to him:**
  - Memory and knowledge may use the business's own knowledge, from anywhere in the business, to help any step understand: events and dates, words, products, procedures, lessons. Each item is marked with who may be told it.
  - As records to act on, it shows a step only those inside the step's boundary. For routing, that is the sender's own records.
  - Another person's record never shapes a step's understanding, and is never hinted at.
  - What a person is told is held by the send check.
- **Why:**
  - Swaraj: "there needs to be some component that can see the whole thing and that can aid him. That is the memory and knowledge layer." He had rejected "point 5" of the 26 October proposal, which limited memory's searches to the speaker's own records.
  - Level 2: "Tend may use a confidential source internally while sending only a limited description externally."
  - The 28 October rule "routing uses the sender's view" kept the sale's dates from the step that had to understand.
- **Cost:** fixed code must keep the line between business knowledge and a person's records, by the kind of record.
- **Reopen if:** any message is found to carry knowledge its recipient may not be told, or a step's understanding is found shaped by another person's record.

## 2. The rules the design must keep

These are the design's own rules. Each one can be checked. The words after each rule say how a break would show.

**Writing and waiting**
1. Each change is a new version. A version is never rewritten, except by an erasure the erasure tool has confirmed (decision 19). (Any other rewritten version is a break.)
2. A write and its announcement happen in the same run. (A write with no announcement is a break.)
3. A repeated delivery of the same change is ignored. (A repeat that acts twice is a break.)
4. Every wait is written down, with what it waits for. (A wait with no record is a break.)
5. A timer wakes the worker only. (A timer that reaches another part is a break.)
6. A superseded wait does nothing. (A superseded wait that sends is a break.)
7. Only the conversation manager sets "completed." (A completed situation that changes without a reopen record is a break.)
8. A closed situation reopens only when its closure was wrong. (A reopen with no reason is a break.)

**Sending**
9. The worker never sends. (A send with no channel record is a break.)
10. The decision to tell a person is separate from the decision on the next step. (A send with no decision to tell is a break.)
11. A fact in a sent message comes from a tool result in the same turn. (A fact with no result behind it is a break.)
12. Reply on the channel the person used. Start on the first channel that is available and allowed. (A start on a channel with no window or consent is a break.)
13. Templates need opt-in. (A template with no opt-in record is a break.)
14. Withdrawing consent stops every future message. (A message after withdrawal is a break.)
15. Retries happen in the tool layer only. (A retry loop in the communication layer is a break.)

**Money and outside actions**
16. A tool checks permission before it calls anything. (A call with no permission record is a break.)
17. An unknown result is checked before anything is repeated. (A second action while the first result is unknown is a break.)
18. An action that cannot be undone is never repeated automatically. (A repeat of such an action is a break.)
19. The refund setting is read when a refund is tried. It starts at zero. (A refund above the setting with no approval is a break.)
20. A status check makes at most five calls inside one wait. (More than five calls is a break.)
21. No part checks an outside system on a fixed clock, except the business's check-in. (A check on a timer with no wait behind it is a break.)

**Permissions and people**
22. A permission belongs to a verified person. A name or a number grants nothing. (An access granted from a name or number is a break.)
23. Only the configurator's fixed tools write grants. No one grants themselves. (A grant written by the AI, or by its own holder, is a break.)
24. Permission is checked against the live store at each action. (A send after a grant was removed is a break.)
25. An approval is asked again after any change. (An action that uses an earlier approval is a break.)
26. An approval for a disclosure is checked like any other action. (A disclosure with no check is a break.)

**The AI, tools, memory and knowledge, and configuration**
27. Text from the AI, or from a tool, is data. It is never an instruction. (A plan that changes because of a text, without the worker's check, is a break.)
28. Memory and knowledge only presents and proposes. (A setting changed from its suggestion alone is a break. So is memory and knowledge choosing a candidate or the next step.)
29. A configuration suggestion is applied only after the configurator checks it. (A suggestion applied with no check is a break.)

**The owner view and data**
30. The owner view writes nothing. (A write from the owner view is a break.)
31. The owner hears about three kinds of things, plus a change that alters the next business decision. (A routine item sent as an owner alert is a break.)
32. Each business's data is kept apart in every store and every AI call. (A query that returns another business's rows is a break.)
33. Each reader sees only the fields on its own list. The default is nothing. (A field outside a reader's list is a break.)
34. No personal data goes into a trace. (A trace with personal data in it is a break.)

**Understanding (added 2026-10-29)**
35. An arrival is understood before Tend acts on it. (A routing decision with no reading saved beside it is a break. So is a plan or decision made on new content that no understanding has placed.)
36. Routing's candidates come from the reading: by its exact values first, by description only inside them. (A routing candidate found by searching a person's past on the message's raw words, before the reading, is a break.)
37. Using is not showing. (A record from outside a step's boundary shown or hinted to it is a break. So is a message carrying an item its recipient may not be told.)

---

## 3. The sixteen Level 1 rules

Level 1 lists 16 rules that must always hold. Section 7 of the stabilization file says how each one is kept. The short version is in that file's table.

---

## 4. What could force a change

| If this changes | What takes the change | What must not change |
|---|---|---|
| A channel's rules change | The communication layer's rule record | Routing, decisions, conclusions |
| A platform changes its rules | The rule record. Open situations are checked again. | Business policies; permissions |
| A new channel is added | The communication layer, through the normal approval steps | The worker; the situation record |
| A business policy changes | Its new version. A notice to the owner. A check with a deadline. | Open situations' current version, until the owner decides |
| A business setting changes, such as the refund setting | The setting, read the next time it is used | Open situations (not checked again) |
| An outside system changes how it behaves | The tool layer and its connector | The decision rules; the shape of the records |
| Memory and knowledge suggests a new kind of lesson | Memory and knowledge. Then the configurator checks it before anything changes. | Rules, permissions, approvals |
| A skill or procedure changes | Its new version in object storage. Runs read it from their next start; situations keep their pinned procedure. | Runs already using the old version; permissions |
| A business connects or changes an MCP server | Configuration: the captured, versioned tool list, after the configurator's approval | Permission checks; the first-party catalogue |
| A new retrieval method proves better | Memory and knowledge's retrieval capability, chosen by evaluation | The governance gate; the boundary each search for records starts with; understanding before routing |
| The AI gets a new ability | Its proposal step only | Permission checks, approvals, "completed" |
| A new law, or a new market | Configuration checks. Values are set when the market is entered. | The worker's logic; the owner view |
| Growth: more situations, or more businesses | Separate situations and separate stores | The boundaries. No new part without evidence. |
| A new kind of failure appears | The failure rules, with a source; the trace | Existing rules, unless evidence shows a contradiction |
| A new product feature | The product team's list of capabilities; the permission check | Permissions; configuration tools |
| The company offers a free plan | A new decision, with its own record | Every business has its own store, until that decision is made |
