# Section 11: is the design stable enough to build on?

**Date:** 2026-10-12.
**Verdict:** Stabilized. Section 11 is closed.
**Why:** The two Level 2 sentences that conflicted with your decisions were changed on 2026-10-12, with your approval. Nothing else blocks.

---

## 1. The short answer

Stabilized, as of 2026-10-12.

Two things changed in Level 2, with your approval:

- **The refund sentences.** Money above the refund setting needs a person. The setting starts at zero, so every refund needs a person until the business raises it.
- **The store sentence.** Each business has its own store. A shared store is not used. There is no free plan. Every customer pays. The only trial is 14 days on the paid plan.

"Stabilized" does not mean final. It means enough reasons are written down to build on the design. Changes can still happen. Each one needs a reason.

Section 11 is closed. Section 12 has not started. Level 3 has not started.

---

## 2. The refund sentences (changed 2026-10-12)

**What you decided.** The business has a refund setting. It starts at zero. A refund at or below the setting can go through without a person. A refund above the setting needs a person to approve it. The business owner, or the configurator the owner names, sets it.

**Examples.**
- At zero, every refund needs a person.
- At 2,000, a refund of 1,500 goes through without a person. A refund of 2,500 needs one.
- Every refund that goes through without a person is recorded in the audit trail.

**What Level 2 says now.** Four places were changed:
- The secure-product file, line 117: money above the business's refund setting, export, and channel rebinding always need a human. The refund setting starts at zero, so every refund needs a person until the business raises it.
- The same file, lines 179 and 180 (a test case): a refund named in a comment does not run. A refund runs only from a verified request, under the refund rule. Above the refund setting, a person approves it.
- The same file, line 267: money above the refund setting, export, and channel rebinding always route to a human.
- The security audit file, line 135: a tool that moves money above the refund setting without a person fails the audit. So does a tool that exports data without a person, or sends outside the fixed rules.

---

## 3. The store and the free plan (changed 2026-10-12)

**A store** is where one business's records are kept. Think of a filing cabinet.

**What you decided.** Each business has its own separate store. A shared store, with a label on each record, is not used. There is no free plan. Every customer pays. The only trial is 14 days on the paid plan.

**Why a shared store is not used.** In a shared store, every search must use the right business label. One missed label would show one business's records to another business. Level 1 says the same thing: Tend never lets one business see another business's data.

**Cost.** Separate stores cost more to run. The record accepted that cost.

**What Level 2 says now.** The discovery notes, lines 221 to 223: each business has its own separate store. A shared store is not used. There is no free plan. Every customer pays. The only trial is 14 days on the paid plan.

**Consequence.** A shared store for free accounts is no longer a question. If the company ever offers a free plan, that would be a new decision, with its own record.

---

## 4. Steps 20 to 23, run again (2026-10-12)

- **Step 20, repeat the checks.** I checked each Level 2 sentence I changed. I searched Level 2 for any other sentence that treats money as always needing a person, and for any shared store or free plan. No conflicting sentence is left. I also checked the architecture's wording about refunds, stores, and free accounts, and updated it. No contradiction is left.
- **Step 21, do the rounds get smaller?** This round changed wording only. No part, rule, or decision changed. The last several rounds did the same. The rounds are getting smaller.
- **Step 22, the record.** This file, rewritten with the new verdict and the checks. Entry 20 in the construction record.
- **Step 23, the verdict.** Stabilized.

---

## 5. What the design is

The design is a set of parts. Each part has one job.

| Part | Its job | What it must never do |
|---|---|---|
| Situation record | The saved history of one problem, kept as a list of versions | Rewrite an old version |
| Situation worker | Decides the next step for one problem. Writes what Tend concludes. | Send a message. Set a situation to "completed". |
| Conversation manager | Takes each message, puts it on the right problem, decides whether a person should hear an update, and sets "completed" | Decide the next step for the problem |
| Communication layer | Shapes, checks, sends, and records each message | Decide what to say |
| Tool layer | The only way Tend calls an outside system, such as a payment provider or a shipping system | Repeat an action whose result is unknown |
| Status-check service | Repeats a check on an outside system when a wait is due | Decide anything. It sends each result back as a message. |
| Memory | Remembers useful context and suggests links or lessons | Change a rule, a permission, or a setting |
| Owner view | The owner's summary, built from the records when asked | Write anything |
| Configuration | Settings and permissions, written only by the configurator, through fixed tools | Be written by anyone else |
| Improvement | Learns from saved traces to improve the product | Change a business rule on its own |

The conversation manager holds three smaller parts: the intake step, the situation worker, and the communication layer. So nine parts act on their own. The situation record only holds the history.

"Trace" means a saved record of what happened and why.

Parts never call each other directly. They talk through the situation record. One part writes a version. The other part reads it.

---

## 6. Duties from Level 1

Level 1 gives Tend 16 duties. Examples: receive events from every source; understand what the business is trying to do; ask a person when information is missing; check sources against each other; decide whether a person must step in; explain its decisions. Each duty has a place in Sections 6 to 8.

Level 1 also says what Tend does not own. Tend does not set business policy. It does not decide strategy. It does not replace existing systems. It does not become the record of another system's facts. It does not replace a human judgment that the business requires.

---

## 7. The 16 rules that must always hold

Level 1 lists 16 rules that must always hold. The design keeps each one like this:

| Rule | How the design keeps it |
|---|---|
| Tend never guesses | A missing answer becomes a question, a wait, or a person. A fact in a message must come from a tool result from the same turn. |
| Every decision uses the information available at that moment | The situation is read again before any important step. |
| Every important decision can be explained | Each step is saved with its reason and its evidence. |
| Every important action can be traced | Every change is saved as a version. Every action has its own record. |
| Tend never owns information that belongs to another system | Facts stay in the business's systems. Tend keeps references and its own notes. |
| Human responsibility always stays with humans | A person approves what the business says needs a person. The owner answers for the refund setting. |
| Tend never confuses a prospect with a customer | A paid order marks a customer. |
| Tend never shares more information than an actor needs | Each reader sees only the fields on its own list. The default is nothing. |
| Tend never leaves waiting work without a reason | Every wait is written down, with what it is waiting for. |
| Tend always works with the latest known state | The situation is read again before an important step. |
| Every interaction moves the situation forward | Every run ends in a named wait, a stated outcome, a visible block, or work still in progress. It never ends silently. |
| Tend coordinates work | One situation keeps the work of one problem together. Related situations are linked, not merged. |
| The business remains in control | The business sets the rules, the limits, and who may do what. |
| Tend never lets one business see another business's data | Each business has its own store. |
| What the AI proposes is never authorised by the AI | The AI suggests. Fixed code checks permission. A person approves where the rules require it. |
| AI output and tool output are data, never instructions | Text from the AI or from a tool is checked before it is used. |

---

## 8. Ten situations, walked through

Each walk-through shows who does what, in order. Then the result.

**1. A refund, and no answer from the payment provider.**
A customer asks for a refund. The tool layer checks permission. It records what it is about to do, then calls the payment provider once. The provider does not answer. The situation waits. The customer asks where the refund is, and the reply comes from the record, not a guess. The AI proposes a second refund. The duplicate check blocks it. When the wait ends with no answer, a person gets the full timeline. The refund is not repeated.
*Result:* explained.

**2. Who may see what.**
A customer's phone sends "any update." The phone is linked to a verified person, so Tend offers that person's open situations. A stranger types the same order number. Tend holds the number and shows the stranger nothing. An investor types a customer's number. The investor sees nothing from that customer.
*Result:* explained. The full list of what each person may do is a setting for each business.

**3. The carrier is down, and there is no shipping system.**
A customer asks where the package is. The carrier does not answer within its time limit. The situation waits. Before the promised reply time, the customer gets a short update. Past the time limit, the failure is recorded. If no system and no person can answer, the answer is "not available." It is not recorded as a failure. A partner is contacted only after escalation, only if the business allows it, and only with the tracking number and the problem.
*Result:* explained.

**4. An investor asks for revenue and a deck.**
The deck passes the permission check. Sending it needs approval inside the tool, and the approver says yes. The deck goes out with a line saying revenue is still being confirmed. No "we received your message" email is sent. A finance person gets the revenue question. If nobody acts, the escalation runs.
*Result:* explained.

**5. A list of people to contact, then a reply before the timer.**
The business gives thirty names. Each name gets its own situation. Each waits three days for a nurture message. One customer replies by email before the timer. The reply is recorded. The situation worker writes the answer and cancels the waiting message in the same version. When the timer fires, it reads the record, finds nothing waiting, and sends nothing.
*Result:* explained.

**6. A supplier sends a bill of materials without being asked.**
The message is matched to the supplier's situation. The document is filed there with its date and sender. No reply is sent. Nothing is ordered. If no match is found, a person sees the document.
*Result:* explained.

**7. A platform changes its rules, or a business changes its refund setting.**
- *Platform rule change.* The product team updates the rule record. Each open situation is checked again for what is allowed now. A message that is no longer allowed is stopped at the send check.
- *Refund setting change.* The new value is read the next time a refund is tried. Open situations are not checked again.
- *Business policy change.* Each open situation keeps the version it started with. The owner gets a notice for each one. The owner chooses to keep the old version or move to the new one. If the owner does not answer, the situation stays on the old version, and the owner is asked again.

*Result:* explained.

**8. A learned note asks to change a rule.**
Memory can suggest a note such as "always refund this customer." Memory cannot change a rule. A suggested setting goes to the configurator, who checks it. Only the configuration tools apply it.
*Result:* explained. Which kinds of lessons may be kept is still provisional.

**9. The owner's view and the owner's notices.**
The owner's view is built from the saved records when the owner asks. It writes nothing. The owner hears about three kinds of things: a decision only the owner can make; a deadline or notice that puts the business at risk; an escalation that has gone past everyone. A change that alters the next business decision reaches the owner at once.
*Result:* explained. The layout, and how long the view may lag when a system is down, are still open.

**10. A timer fires during a wait, and a status check is due.**
The timer wakes the situation worker only. The worker reads the latest record. If the wait has been replaced, nothing happens. Inside the time limit, the status check runs again, up to five calls inside one tool. Past the time limit, the result is recorded as a failure. For an action that cannot be undone, the result is recorded as unknown. No part checks an outside system on a fixed clock. The business sets its own check-in interval.
*Result:* explained.

**The fifteen situations in Level 1.** Each one has a place in the design. Four need detail that belongs to the business or to later technical work: how a meeting is booked; who receives a low feedback rating (by default, the owner, or the staff member the business names); the data used in the test environment; and how long each nurture wait lasts (the business sets it).

---

## 9. Who decides, acts, and approves

| Decision | Who decides | Who acts | Who approves | What checks it |
|---|---|---|---|---|
| Refund at or below the setting | The setting | The tool layer | Nobody | The permission check |
| Refund above the setting | The permission check | The tool layer | A named person | The duplicate check |
| Send a message | The conversation manager (whether to tell); the situation worker (what to say) | The communication layer | Nobody per message. The channel and consent rules apply. | The send check |
| Start a message outside a messaging window | The channel rules | The communication layer | Opt-in, for templates | The consent check |
| Set a situation to "completed" | The conversation manager | The conversation manager | Nobody | No wait is open, and the last message has gone out |
| Grant or change a permission | The configurator | The configuration tools | A second person, for compliance settings | The audit record |
| Share a file or deck | The grant | The tool layer | A named approver | The permission check |
| Contact a partner | The business's policy, after escalation | The communication layer | Nobody extra | The policy check |
| Memory suggests a change | Nobody | Nothing | The configurator | Nothing else |

---

## 10. What happens when things go wrong

| What goes wrong | What Tend does |
|---|---|
| Information is missing | Asks for what could change the next safe step. Waits. Never guesses. |
| Sources disagree | Keeps both claims. Applies the business's rules. If no rule settles it, a person decides. |
| Information is wrong | The holder corrects it. The record shows the correction. |
| A person or system is unavailable | Waits with a named trigger. Sends an update before the promised time. Stops when nothing safe is left. |
| A person may not do something | Says no, and says who can approve it. Does not work around the rule. |
| A business rule is broken | Follows the business's policy. Does not continue around it. |
| A message does not arrive | Records the failure. Checks before any resend. Never assumes success. |
| Nobody acts on a request | Makes the owner and the deadline visible. Escalates. Never hides it. |
| Something new happens | Says it does not know. Sends it to a person. Makes no unsupported decision. |

Every failure ends with one question: what is the safest correct next step? The answer is a wait, a question, a person, or a stop. Never a pretence that nothing happened.

---

## 11. What is left

Nothing here blocks the verdict. Each item is listed so you can review it before Section 12.

**Level 2 wording that still differs from your decisions.** The design follows your decision in each case. The Level 2 wording is yours to change when you choose.
1. The journey notes say three stages. The design adds an unknown first stage, as you decided.
2. Four summary lines, and one harness line, say a closed situation is never reopened. The detailed text allows one exception. The design uses that exception.
3. One Level 2 file says the check-in is the only periodic wake. Another says "ticks." The design follows the first.
4. Two Level 2 files disagree about re-fetching information, and about example order numbers.
5. The Product Vision says a new person starts as a prospect. Level 2 says the first state is unknown. The design follows Level 2.
6. Level 2 calls the reacting part the "communication manager." The design calls it the conversation manager. You accepted this naming difference.
7. Level 2's explainability files show the builder everything in production. The design masks personal data in production. You decided this on 2026-10-09.

**Numbers each business sets.** Check-in length, settle windows, limits (including the status-check limit and cost caps), reminder timing, and feedback waits.

**Market values, set when each market is entered.** Breach clocks, export and erasure windows, retention periods, consent durations, and auditor access.

**The sending wording.** The audit checklist now fails tools that send outside the fixed rules. If you want the strict version, which fails any tool that sends without a person, say so.

**The 14-day trial.** The design does not depend on its length. It is a commercial setting.

**Calls not yet confirmed by you.** Listed in section 13.

**Housekeeping.** Some older lists in Section 10 still use "owner item" numbers. The code index files still carry older status words. Neither changes the design.

---

## 12. The fifteen checks (final, 2026-10-12)

| # | Check | Result |
|---|---|---|
| 1 | Every Level 1 duty has a place | Pass |
| 2 | Every part has an owner, a state, a change driver, and a failure note | Pass |
| 3 | Walk-throughs explain what happens | Pass: ten, plus Level 1's fifteen |
| 4 | The 16 rules that must always hold are kept | Pass |
| 5 | For each key decision, it is clear who decides, acts, and approves | Pass |
| 6 | Each decision traces back to a source | Pass. A few rest on recorded decisions tagged "to confirm." |
| 7 | Known contradictions are resolved, or listed as not blocking | Pass. The two blocking ones are resolved. The rest are listed in section 11. |
| 8 | Other options were considered for the main choices | Pass |
| 9 | The design was tested against the dimensions | Pass |
| 10 | Provisional items are marked | Pass |
| 11 | Each decision says when to reopen it | Pass |
| 12 | Technology is kept out of the logical design | Pass. Channel names and one example tool name remain, for Section 12 to check. |
| 13 | Each change has a known place to go | Pass |
| 14 | Situations can be explained step by step | Pass |
| 15 | Each round changes less than the last | Pass. This round changed wording only. |

Fifteen pass.

---

## 13. Decisions, calls, and open points

**Decided by you (the record says so).**
- **2026-10-09:** who decides whether to speak; the platform-rule split; the production view for the builder (masked); consent withdrawal stops every future message; no separate checker for record writes.
- **2026-10-10:** a permission belongs to a verified person; each business has its own store; five status calls; the refund setting is read when a refund is tried; business documents from outside go to the matching record or to a person.
- **2026-10-12:** the channel order; the nurture rule; only the conversation manager sets "completed"; the first version is written at intake; partners are contacted only after escalation. You approved the two Level 2 wordings. You also described the refund setting: it starts at zero, and the owner or the configurator sets it. You said there is no free plan.

I could not find your messages for the 2026-10-09 and 2026-10-10 decisions. The record says you made them. They are used as decided. Where the record tags a decision "to confirm," the tag stays.

**Calls I made, not yet confirmed by you.** Each call can be changed. A change affects only that call.
- The AI runs only where fixed rules leave a step open.
- Level 1 applies where Level 2 is silent.
- A newer valid claim counts only as a correction.
- If two versions of one policy clash, the version the business activated most recently applies. The conflict is shown to the business.
- If a policy deadline passes with no answer, the situation stays on the old version, and the owner is asked again.
- An approval covers one request. It lapses if the situation changes. It can pass to another person only where a grant allows it. If nobody responds, the request goes to the escalation path.
- Open approvals go back to the business owner until the business gives them to someone else.
- A second person approves each compliance-settings change.
- Tend staff act for a business only with a ticket, a time limit, a second approver, and a notice shown to the business.
- Customers are not asked to confirm before a record is shown, unless the business adds that step.
- Each disclosure to an investor or a regulator needs approval from a named person.
- The owner may stop an action that has not taken effect.
- Moving something learned in one business to another needs the business owner's approval.
- The product team writes the capabilities. The business turns them on.
- The observer is part of the situation worker, not a separate part.
- Onboarding is inside scope when a capability exists. Without one, the answer is "not available."

---

## 14. Before Section 12

- You proofread the architecture files first. A reading order is in the chat message that goes with this file.
- If you find a problem, only that part is reopened. The verdict stays Stabilized for everything else.
- Section 12 starts only when you say so.

---

## 15. Sources for the checks

- **Ford, Parsons, and Kua, *Building Evolutionary Architectures*.** The idea: an automated check that a design property still holds. The publisher page refused access, so I used a search summary only.
- **Michael Nygard, on architecture decision records (2011).** Each decision has a title, a context, a decision, a status, and its consequences. List every consequence, not only the good ones.
- **OWASP, Top 10 for LLM Applications, entry LLM06 (2025 edition).** Keep a tool's permissions to the minimum. A person approves high-impact actions. The permission check happens in the system, not in the AI. A later edition may renumber this entry. I did not check it.
- **Microservices.io, transactional outbox.** A change and its outgoing message are saved together. A message can be sent twice, so the receiver must recognise repeats.
- **Martin Fowler, strangler fig application.** Change moves in small pieces. The temporary code that lets old and new run side by side is removed later.
- **ArchUnit, freezing rule.** A stored list of known violations. Later checks report only new ones. Here, the stored list is the list of known contradictions.
- **OpenTelemetry, traces.** One identifier follows a request across its steps. The design needs the same: one identifier per run, linking intake to send.
- **The SEI architecture tradeoff analysis method (read through Wikipedia).** Its outputs are trade-off points, sensitivity points, risks, and non-risks. Used for the options table.
