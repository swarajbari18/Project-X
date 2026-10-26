# Step 4 (plan): thinking the fix through, before writing

Written 29 October 2026. Follows the three-level framework's Level 2 steps: problem; constraints; alternatives; trade-offs; decision, with why the others lose; evaluation criteria; when not to use. Register IDs from `41` and `42`; defects from `44`; tests from `45`.

---

## 1. The problem

Every arrival must be understood before Tend acts on it, routing included (L1, L2, L5, C5–C7). Understanding needs what the arrival's words mean in **this** business: its events, its words and aliases, its products, time words resolved to dates (L22, C1, C2). Only memory and knowledge can bring that, because no loop part may see the whole business (A7, A8).

Today:
- routing acts before understanding (D1);
- the conversation manager is defined as a router that never reasons (D2);
- nothing is saved of what an arrival means (D3, D4);
- the worker folds understanding into planning and deciding (D11);
- a person's visibility stops the business's own knowledge from helping a step understand (D5).

## 2. Constraints (each from a register)

- Understanding uses only what is already available. It never calls a business system (L14).
- Memory and knowledge presents and never decides (A10). Its fixed parts do exact lookups only (B13, B14). Its AI part runs at every point, and not after a decision that ends the run (B11). The loop waits for its package (B12).
- Routing's candidates come from structured scope only: the person, status, explicit references, links. Never similarity across history. An ambiguous result means ask, not search harder (L21). Finished situations are candidates only on an explicit reference (L12).
- Tend may use a confidential source internally, and discloses by the rules (L17, L18). Another person's records are never candidates and never hinted at (L19; tests 8, 9, 10, 28).
- A reading is an interpretation, never a fact or a conclusion (L30).
- One situation is one story. The queue is per person (L36, K1). Not work means no situation (L43).
- If a source is missing, hold what depends on it (L35).
- Lean at every part (N13).

---

## 3. Choice 1: where understanding sits in the conversation manager

**A. Inside one routing call.**
- How: R1 brings meanings and candidates; one AI call writes both the reading and the choice.
- For: fewest calls.
- Against:
  - which candidates to present depends on the reading (the sale's dates), so memory and knowledge would have to settle the meaning to filter, which is close to deciding (A10);
  - the reading is written after the candidates are in view, so it can be bent to fit them;
  - Level 2 orders it the other way: interpretations first, then routing (L5).

**B. Understanding first, then the choice, as two turns of one reasoning part.**
- How:
  - R1 comes before the reasoning, and brings what understanding needs.
  - The first turn writes **the reading**.
  - Between turns, memory and knowledge presents candidates found **from the reading**, by exact filters.
  - A second turn chooses, **only when code cannot resolve the choice**.
  - R2 comes before the routing check.
- For:
  - matches Level 2's order (L5), the harness's MEANING then VALIDATE (L4, L43), and Swaraj's thought, then knowledge, then action (B4);
  - retrieval becomes a filter (F6, C7);
  - turns are already how planning works (design F1.4; E3, E4);
  - code chooses whenever it can (L40).
- Against: one more call when the AI must choose; the reading must be written and checked.

**C. Memory and knowledge writes the reading.**
- Against: the reading is the step's own interpretation. Memory and knowledge would be deciding what an arrival means (A10). Swaraj: the conversation manager establishes first (C5).
- Rejected.

**D. Route on hard signals only; let the worker sort everything else out.**
- Against: creates twin situations (test N1); acts before understanding (L1, C7).
- Rejected.

**Decision: B.** A loses because it bends understanding to the candidates and blurs who decides. C and D break Swaraj's words and Level 2.

When code resolves the choice without the second turn (Level 2's tiered assignment, L11):
- not work → no situation;
- no candidate under any of the reading's alternatives → a new situation of the reading's kind;
- several asks → one situation each (split early);
- exactly one candidate, matched by a number the sender wrote, or by Level 2's hard signal (the only open situation of the reading's kind that holds the reading's resolved values), **and no alternative in the reading points to a different candidate** (L8: a provisional reading may be used only when its alternatives do not change the path) → attach;
- otherwise the second turn runs.
- If, after the second turn, several situations still fit → ask, with a held note.

The points around routing:
- **R1**: before the reading.
- **R2**: after the reading; candidates from the reading. The next part is the choice turn, or the check when code resolves.
- **R3**: before the check, only when the AI chose.

## 4. Choice 2: what the reading holds, and where it is saved

The reading has checkable sections (E2; L4; ambiguity §8.2, §9):

1. **Asks**: what the sender wants, each with exact words; one problem or several.
2. **Refers to**: each thing referred to (an order, an item, an event, a person, earlier work), with:
   - the exact words;
   - what it resolves to, citing the presented item that resolved it;
   - anything unresolved, kept as a small set of candidates at the smallest point (L7).
3. **Time**: the arrival's time; each time word resolved to a date or range in the business's time zone, or kept as a small set.
4. **Claims**: what the sender states. These stay the sender's claims.
5. **Unknown**: what is not known yet.
6. **Earlier work**: whether it explicitly refers to an earlier piece of work, with the exact words. This replaces "refers to something that already happened".
7. **Kind and purpose**, for new work.
8. **Not work**: yes or no.

It also has the standard sections: considering, still need to know, questions for memory and knowledge, references.

Code checks four things:
- every quote is in the arrival;
- every resolution cites an item presented in this run;
- every ID was presented;
- the sections exist.

**Saved**: with the arrival, in each routed situation's new version, marked as the conversation manager's interpretation. It is never a fact and never a conclusion (L30). A held note carries it too. Not work: the arrival is kept on the person's timeline with its reading, and no situation is created. "Ignored is not deleted" (relevance page).

**What changes in Section 7.** The conversation manager writes the arrival and its reading. It still never writes what Tend concludes: facts, conflicts, the next step, waits, outcomes. Those stay the worker's (D2's "what stays right").

## 5. Choice 3: the worker's understanding

**W-A. A separate understanding part, before the business's strategy is presented.**
- For: matches Swaraj's "the first thing it is doing is trying to understand… based on the understanding… injected the appropriate strategy" (B3), L15, L16, and Level 2's "Understanding produces the model. Deciding uses the model."
- Against: one more call when it runs.

**W-B. Folded into the decision, as fixed sections.**
- For: lean.
- Against:
  - memory and knowledge cannot act on the understanding before the decision (B4);
  - it blends two jobs Level 2 keeps apart;
  - the strategy would follow the routing label, not the worker's understanding (B3).

**W-C. Use the conversation manager's reading only.**
- Against: the reading was made against summaries. The update of the full record needs the full record (L13). Free text that reaches the worker (documents, web pages, partners' emails) is never read.

**Decision: W-A, run only when it adds something.**
- **New point W0**, before understanding.
- The worker's understanding part runs when the version holds content not yet placed in the full model:
  - an arrival into a situation that already had content. The reading is placed in the full model: which asks are answered; what is now known, unknown, or in conflict; whether routing looks wrong.
  - a document, attached or sent;
  - a free-text result: a web page, a partner's free-text answer.
- It does **not** run:
  - for a new situation whose only content is an arrival the conversation manager's reading already covers. That reading, saved in the first version, is the worker's first understanding (B3 holds: W1 presents the strategy for an understood situation).
  - for typed tool results, which code saves as claims and fixed rules compare (Fork A, L31).

This keeps "assemble once, two passes" (L13) in the right order: the reading first, then the full update.

## 6. Choice 4: using knowledge versus showing records

**V-A (today). One view filter before every search.**
- Against:
  - breaks A8, A9, C2, L17, L18;
  - is Swaraj's rejected point 5;
  - fails tests N1, N2, N7.

**V-B. Use the business's knowledge everywhere; show records only within the step's boundary.**
- **Business knowledge**: what the business knows that is no one person's record. That is its events and periods, its words and aliases, its products, procedures, skills, rules and preferences, lessons, learned subjects, and business-level incidents.
- **Person records**: situations, messages, orders read into situations, documents, and anything tied to one person.

The rule:
1. Memory and knowledge reads the whole business (A6–A8, C2).
2. To help any step understand, it may present business knowledge from anywhere in the business. Each item is marked with who may be told it (the package already carries "who may see it", design A3). This is Tend's internal use (L17, L18).
3. As candidates, it presents only records inside the step's boundary:
   - for routing, the sender's own situations;
   - for the worker, its own situation in full, and others' typed fields under the worker view rule.
4. Another person's record is never presented, never used to shape a step's understanding, and never hinted at. In test N14, 8821 is Meera's order: not used, not hinted.
5. Business knowledge comes from the business's side: the owner, employees, configuration, business systems. A customer's words stay that customer's claim (L26, L28; test N15). On the first mention of a term, memory and knowledge's AI part searches the business's side of the whole business for its meaning (C2; test N2). It presents the meaning with a reference to its source, not the source situation's contents.
6. What a person is told is decided by the send check, against the recipient's view. That rule is unchanged.

**V-C. No limit.**
- Against: the law and Level 2's visibility rules (L20). Rejected.

**Decision: V-B.** It is what Swaraj said ("search the whole business land… aid him") and what Level 2 already decided (L17, L18). It keeps every protection test (8, 9, 10, 28, N14).

## 7. Choice 5: finding candidates from the reading

- The need carries the reading's resolved values: the person, kinds, IDs, date ranges, item attributes (L23, L24).
- The candidates are:
  - the sender's open situations, filtered by the resolved values;
  - the sender's finished situations only in two cases, both by the same exact filters (L12, HS 11.2.2 "explicit references (structured claim matches)"):
    - the reading refers explicitly to earlier work;
    - a referenced object, resolved by the reading, sits in one: Level 2's reopen case, "Same delivery still missing after marked resolved".
  - The second case is labelled **the design's reading** of L12 together with Level 2's own reopen table. It is not a change: the reopen table cannot be applied unless finished situations holding the referenced object are found.
- Keyword and meaning search run only on what is still only description, inside the filtered set (L24: "Semantic similarity is one candidate-generation signal").
- The sender's history is never searched because its words look alike (L25).
- An empty or ambiguous result means ask, not a bigger search (L21).
- Tests 3 and 4 change: routing creates the situation, and the worker gathers and asks which item. The "10,000 finished situations" problem disappears: routing never searches them without an explicit reference, and with one, the reading's values narrow them first.

**Choice 5, corrected later on 29 October.** The bullet "the sender's finished situations only in two cases" is replaced. The 3 October agreed picture gives routing a small set of the sender's own finished situations whenever a message refers to a past purchase. That set is now found by the reading's exact values first, with description only inside them. See the correction to D6 in `44`.

## 8. Choice 6: memory and knowledge revisiting its own work (D12)

- At every point, the AI part first reads what memory and knowledge presented earlier in this situation, and what has happened since.
- If earlier advice was contradicted, or an item went stale, the package says so plainly. Example: "my advice at W1 in run 3, 'the 2026 sale', is contradicted by the order system's claim 'placed 4 November 2025'". The learner gets a note: an interpretation trap.
- New fixed lookups: what memory and knowledge presented in this situation (by situation ID), and, for routing, earlier readings of this person's words (by person ID; Level 2's "previous interpretations").
- No extra call: this is inside the AI part's existing work at the point. Fixed code still checks every citation.

## 9. Choice 7: when memory and knowledge fails during understanding (D13)

- **No package at R1**: wait (10 seconds), then the arrival goes to the person named for arrivals Tend could not place. This is unchanged.
- **The AI part fails at R1**: the package carries the fixed items: open summaries, numbers, listed words, events found by exact alias, time.
  - The reading marks any word it cannot resolve as **unknown**.
  - Code decides from the reading as usual, with one limit: if the choice could differ depending on an unknown meaning (there are candidates whose match depends on it), the arrival is held with a held note and the sender is asked. It is never guessed (L8, L35).
  - If no candidate depends on it, routing goes on, for example to a new situation. The worker's W0 retries memory and knowledge later (test N12).

## 10. Choice 8: the queue (D7)

- The queue is keyed by the **person ID**, found by code from the channel address before the queue (design F2 already says "per sender").
- Creating the person record for a new address is atomic per address, so two messages from a new number at once share one person and one queue (tests 16, N10).

## 11. Choice 9: links written in the background (D18)

Keep it, and declare it. It changes HS 11.2.3 ("a newly discovered link is written synchronously at discovery").
- Swaraj, 28 October: "when the something in the worker is running, it does not block the memory and knowledge layer to make links".
- Safety: W3's fixed lookup already finds other situations sharing a number, so a link written a moment later loses no information (test 1 steps 15–17).

## 12. Choice 10: how packages are timed (the two-protocol comparison Swaraj asked for, N5)

**P1. Wait at every point.**
- How: the loop waits for the full package (fixed part plus AI part), up to a time limit, then degrades: routing goes to a person, a worker step goes to a person (Decided, 22 October).
- Speed: AI-part calls sit on the critical path; about 4 to 8 per first reply, if the AI part runs on a small model.
- Degradation: predictable. A step never runs without knowledge it should have had. A slow AI part makes Tend slow, not wrong.

**P2. Wait for the fixed part only.**
- How: the AI part's help is added if it arrives within a short budget; otherwise the step runs without it.
- Speed: faster.
- Degradation: silent. Understanding may run without the business's meaning (the Diwali case), the very defect being fixed.

**Decision: P1**, which is Swaraj's direction (B12). P2 is recorded as the rejected option. The time limits are Level 3 values.

---

## 13. The loops after the fix

**The conversation manager.**
1. Intake.
2. Who sent it (code).
3. The person's queue (code).
4. **R1**: what understanding needs.
5. **Reasoning, turn 1: the reading.**
6. **R2**: candidates from the reading.
7. **Turn 2: the choice**, only when code cannot resolve it; then **R3**.
8. The routing check (code): attach, create, split, ask with a held note, or no situation.
9. Save the arrival **and the reading**, and announce.

Typed arrivals that carry an exact wait reference, such as an outside system's answer, are placed by code, as decided. They need no reading.

**The situation worker.**
1. Wake.
2. Recovery.
3. **W0 and understand**, when the wake brings content not yet placed in the full model.
4. W1, when a plan is needed: the business's strategy for the understood work.
5. Plan (turns).
6. W2; check the plan.
7. W3; decide.
8. W2; check; act.
9. Go round, or rest.

**The communication layer.** C1 holds:
- the recipient's preferences;
- listed words;
- **channel conventions, and communication corrections for this audience** (D19).

Then the message is written, then the send check.

## 14. Cost, counted again (one new customer message that starts work)

| Stage | Calls |
|---|---|
| R1 AI part | 1–2 |
| Reading (turn 1) | 1 |
| R2 AI part | 1–2 |
| Choice (turn 2), only when needed | 0–1 |
| R3 AI part, only after an AI choice | 0–2 |
| W1 AI part | 1–2 |
| Plan turns | 0–3 |
| W2 AI part | 1–2 |
| W3 AI part | 1–2 |
| Decision | 1 |
| W2 AI part | 1–2 |
| C1 AI part | 1–2 |
| Writing the reply | 1 |

**10 to 23** before the first reply, against 10 to 20 before the fix.
- No W0 for a new situation; the reading is its first understanding.
- For a reply into an existing situation: plus W0 (1–2) and its understanding (1); minus W1 when no new plan is needed.
- Test 1 gets cheaper in retrieval: one date filter, instead of a hybrid search over 40 finished situations.

## 15. Evaluation criteria (how we know this stays right)

- Routing errors traced to a misread arrival: should be rare. Each one is diagnosed (the "misunderstanding" and "vocabulary" failure kinds).
- A worker's W0 often contradicts the conversation manager's reading: a sign the reading's package lacks something.
- How often the second turn runs; how often code resolves the choice.
- Twin situations for one person: should be zero.
- Any customer-facing message that carries knowledge the recipient may not be told: should be zero, by the send check.
- Earlier advice found wrong at a later point: counted. It feeds learning.

## 16. When not to use this design

- Typed arrivals with an exact reference: placed by code; no reading.
- A business with one person and no history: the reading is short; do not add steps.
- Not as a replacement for gathering: understanding never calls a business system. If the meaning needs a system, the worker gathers it.
- Not to decide trust: the reading records claims. Trust and evidence rules weigh them.

---

## 17. Re-walks under the new design (summary; full walks go in the tests file)

| Test | Result | Note |
|---|---|---|
| 1 | PASS | R1 shows both sale events by alias. The reading resolves "the Diwali sale" to 20–24 Oct 2026 (2025 kept as the alternative). Candidates by date filter: none. Code: new situation, saved with the reading. The worker reads orders by that range. Step 18 uses only the typed reason. About 4 to 6 routing calls. |
| N1 | PASS | One open late-delivery situation holds an order dated 22 October. Hard signal by Level 2's rule; code attaches. No twin. |
| N2 | PASS | The AI part searches the business's side and finds the owner's 12 October instruction. It presents the dates with a source reference. |
| N3, N4, N5 | PASS | Time words resolved to ranges or small sets in the reading. |
| N6 | PASS | The reading marks the term unknown; new situation; the worker establishes it. |
| N7 | PASS | The confidential dates are used for the filter; the send check keeps them out of the reply. |
| N8 | PASS | The next package names the earlier advice as wrong; the learner keeps an interpretation trap. |
| N10 | PASS | Queue by person. |
| N11 | PASS | Not work; no situation; kept on the timeline. |
| N12 | PASS | Unknown term; no candidate depends on it; new situation; W0 retries. |
| N13 | PASS | Unknown at first; the next point brings the dates; nothing unknown is treated as settled. |
| N14 | PASS | Another person's record is never used to understand. |
| N15 | PASS | The customer's claim; nothing learned. |
| 3, 4 | PASS | Routing creates; the worker gathers and asks which item; no history search. |
| 12 | PASS | Asks in the reading; split by code. |
| 16 | PASS | Queue by person. |
| 17 | PASS | Failure rule of Choice 7. |
| 30 | PASS | Routes through R1 and the reading. |
| others | PASS | Every routing walk adds R1, the reading and the between-turns candidates. Worker walks that bring free text add W0. |

---

## 18. Decisions that are Swaraj's

Nothing new needs Swaraj's decision. Every choice above is settled by his words or by Level 2:
- Choice 1: C5–C7, L4, L5.
- Choice 3: B3, L15, L16.
- Choice 4: A8, A9, C2, L17, L18.
- Choice 5: F6, L12, L21, L25.
- Choice 6: D2.
- Choice 7: L35.
- Choice 8: K1.
- Choice 9: his 28 October words.
- Choice 10: B12.

Still waiting from 28 October (none blocks this work):
1. The "pending review" memory rules marked Decided.
2. How an MCP server is connected: a fixed configuration tool; the tool list captured, versioned and hashed; re-approval on change.
3. When a central situation ends: when every person's situation has ended, or the owner stops the task.

---

## 19. The writing order (plan step 5)

1. Swaraj's 28 and 29 October words → `memory_and_knowledge_conversation_and_discoveries.md`.
2. The Level 1 framing:
   - responsibility 11 and the "how we know" bullet: using versus showing;
   - a responsibility for understanding before acting;
   - T7's settlement, attributed correctly;
   - question 33 reworded;
   - the Diwali interaction: "the conversation manager, before it routes".
3. The Level 2 design:
   - parts A2, A4, B1, B2, C2, D5, D6 (step instructions row), D8, E1, E4, E5, F1, F2;
   - new sections: the reading; using versus showing; alternatives and trade-offs; evaluation criteria; when not to use;
   - the "Changes" list: the conversation manager writes its reading; worker W0; links in the background; finished situations only on explicit reference; not work;
   - attributions fixed (D10).
4. The tests: the rubric; all 35 re-walked; N1–N15 added; step 18 fixed; the summary made honest.
5. Dated notes:
   - the same-situation page (D15);
   - the pointer pages, if their wording changes.
6. Sections 6 → 7 → 8 → 9 → 10 → 11, then Section 12, every view, the build view included. Then the checking folder:
   - stabilization reopened, then given again (D24);
   - decisions register, conflict register, audit record.
7. Records: the construction record entry; `what_is_already_settled.md`; `how_tend_finds_the_right_situation.md` note.
8. Checks:
   - both registers re-run on the finished text;
   - searches for each kind's phrases (the K-table in `44`);
   - readability audits by subagents only, judged against Swaraj's words.
