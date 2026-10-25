# Step 4 and 5: the trace, the defects, and the kinds of mistake

Written 29 October 2026. The registers (`41` Swaraj's words, `42` Level 2) were run against:
- the Level 2 design `how_does_memory_and_knowledge_work_with_the_loops.md` ("design"), read in full;
- the tests `memory_and_knowledge_design_tests.md` ("tests"), read in full;
- the Level 1 framing `memory_and_knowledge_level_1_framing.md` ("framing"), sections 1, 5, 6, 12;
- Sections 6–12, by searching for each kind of mistake (file and line lists below), plus the conversation manager's build file read directly.

Each defect: what is wrong; evidence; rules broken (register IDs); kind; where it started; status.

---

## The defects

**D1. The conversation manager routes before it understands.**
- Evidence: design A2 (R1 is "before routing reasoning"), B1 (routing fixed part), F2; tests 1 (steps 2–8: "the Diwali sale" is never given a meaning before routing decides), 30 (starts at W1); Section 6 B5 (line 158); build `conversation_manager.md` q3 "Routes with memory and knowledge's help"; `responsibility_view/understanding_and_routing.md` line 5 "Get it to the right problem. Then understand what it adds."
- Breaks: C1, C3, C5, C6, C7, B9; L1, L2, L4, L5, L9.
- Kind: acting before understanding. Started: Section 7's thin conversation manager (D2), then the Level 2 design of 28 October. Status: confirmed.

**D2. The conversation manager is defined as a router that never reasons.**
- Evidence: build `conversation_manager.md` q2 "It only records and routes, and leaves the reasoning to the worker" and q3 "It draws no conclusion from any of them"; `boundary_view/the_parts.md` lines 187, 206 ("Keeping it thin — it records and routes, and leaves the reasoning to the worker", source "Section 7 archive: conversation manager record"); `decision_view/the_decisions.md` line 318; `checking/blocking_questions.md` line 194; Section 7 writers table line 84 ("writes what came in as the first version"); `construction_record.md` line 504.
- Breaks: C5, L4 (MEANING is understanding at entry; "the validated result becomes the next version"), L42 ("the conversation manager patches on message entry"), L43, L44.
- What stays right: the conversation manager never writes what Tend **concludes** (facts, the next step); that is the worker's. A reading is an **interpretation**, a separate layer in Level 2 (L30).
- Kind: a Level 2 rule dropped. Started: Section 7 (architecture construction, before 28 October). Status: confirmed.

**D3. The reading is never saved, so the worker works the meaning out again.**
- Evidence: Section 7 line 84; design D8 ("The conversation manager establishes the two facts routing needs: who sent the arrival… and which situation it belongs to"); test 1 steps 10–11 (the sale's meaning appears first at W1).
- Breaks: L4, L6 ("Other responsibilities consume the explicit result. They do not silently reinterpret"), L42, L44, L27 (earlier readings cannot be kept or learned if never written), C5.
- Kind: a Level 2 rule dropped. Started: Section 7; repeated in the design. Status: confirmed.

**D4. Routing's written output lost the MEANING fields.**
- Evidence: design A4 (routing adds only "refers to something that already happened" and "possible situations"); build `conversation_manager.md` q3; test 12 relies on "ROUTING AI lists both asks", but no section holds asks.
- Missing: what it means; what it refers to, with what is resolved; the purpose or kind; the list of asks; new or join; not work.
- Breaks: L4, L43, L44, E2.
- Kind: a Level 2 or harness rule dropped. Started: the design (28 October), on top of D2. Status: confirmed.

**D5. One filter does two jobs: a person's visibility is applied to Tend's own steps, so the business's knowledge cannot help a step understand.**
- Evidence:
  - design line 59 (View: "Every search made for a step is limited to the view of the person the step works for, before it runs"), E1 lines 375–376 ("Routing uses the sender's view"), C2.3 line 251, D5 line 333 (the dates may narrow "that worker's own searches", worker only), test 1 step 4 ("outside Arjun's view and is not searched");
  - framing responsibility 11 (line 251), the "how we know it works" bullet (line 88), tension T7's settlement (line 561);
  - Section 6 lines 383, 394 (N34); Section 7 lines 247, 265; Section 9 line 120; Section 12: build `memory_and_knowledge.md` lines 136, 152, 189, 258; `constraint_view/the_rules_that_always_hold.md` line 119; `checking/stabilization.md` line 33; `responsibility_view/memory_configuration_and_improvement.md` lines 395, 409; every view's code index.
- Breaks:
  - A8, A9: Swaraj rejected point 5, which limited memory to the speaker's records;
  - C2;
  - L17, L18: "Tend may use a confidential source internally while sending only a limited description externally";
  - L20: visibility is what a person sees.
- What stays right: L19, and tests 8, 9, 10, 28. Another person's records are never candidates and are never hinted at.
- Kind: one filter doing two jobs, bringing back a rejected decision. Started: Level 1 framing (responsibility 11; T7 "settled" without Swaraj). Status: confirmed.

**D6. Routing searches finished situations by similar words whenever a message mentions the past.**
- Evidence: build `conversation_manager.md` q3 ("when memory and knowledge's AI part sees that the message refers to something that already happened, the sender's finished situations that could fit"); tests 1 (six candidates by "Diwali", "order", a meaning), 3 ("linen", "shirt"), 4 (70 situations, and the 10,000 case).
- Breaks:
  - L12: closed situations only on an explicit reference;
  - L21: candidates "never by similarity search… Empty or ambiguous slice → … ask, not a bigger search";
  - L25: "should not be retrieved just because their words look similar";
  - F6, C7.
- Swaraj, 28 October, on this exact step: "Why will it add it?"
- The change to Level 2 was declared in the 26 October proposal (its decision 5), which Swaraj rejected; the 28 October design kept the search without declaring the change.
- Kind: a Level 2 rule changed without declaring it; complication in place of understanding. Status: confirmed.

**Correction to D6, later on 29 October.** The readability audits led Claude back to `architecture/how_tend_finds_the_right_situation.md`, the agreed picture of 3 October. It decides that, for "the jacket from last time has a hole", routing loads "a small set of his own finished situations that could be that purchase", found by a search inside his own finished situations. It rejects loading none: "It is safe, and it is wrong for this product, because it makes him describe the purchase from scratch." Swaraj's own words agree:
- 28 October: "There should be some retrieval here at this point."
- 29 October: understanding makes it "much simpler… we could just make a filter about that".

So D6's fault is searching on the message's raw words before understanding, not the search itself. The first fix, which allowed finished situations only on an explicit reference to earlier work, overturned an agreed decision. It was replaced the same day: the 3 October rule stands, driven by the reading, with exact values first and description only inside them. This is a K7-type mistake by Claude: a decided rule overridden without checking the record. Memory note: "Open labels: check the record first."

**D7. The routing queue is keyed by channel address, not by person.**
- Evidence:
  - Section 6 B10 (line 163) and line 66;
  - build `conversation_manager.md` lines 13, 44;
  - `interaction_view/the_interactions.md` lines 140, 516, 538;
  - `boundary_view/the_parts.md` line 195;
  - `checking/decisions_register.md` lines 205, 210;
  - Section 9 line 119; Section 10 audit register line 875;
  - build `memory_and_knowledge.md` lines 11, 209;
  - test 16 and its variant;
  - the progress note "One routing run per sender (channel address)".
- The Level 2 design F2.3 says "per sender", after the person is found. That part is right.
- Breaks: K1, L36, L37. If Arjun writes on WhatsApp and email at the same moment, two runs go in parallel and can start twin situations.
- Kind: a channel treated as a person. Started: the cascade, 28 October. Status: confirmed.

**D8. Test 1 invents a detail.** Step 18 says "the carrier's reason was that the pin code did not match the city". The worker was shown only "delivery status failed, reason address" (step 17, typed fields only).
- Breaks: N2 (tests must be honest walks), E2.
- Kind: a test using data the design does not deliver. Started: tests. Status: confirmed.

**D9. Tests passed on outcome, not process.**
- Test 1 passes although routing never understood the message.
- Tests 3 and 4 pass with searches that Level 2 forbids.
- Test 30 skips routing.
- The summary says "35 tests. All pass."
- Breaks: N2, C7.
- Kind: a PASS given for the result alone. Status: confirmed.

**D10. Quotes and tags that say more than Swaraj said.**
- (a) Design E1 line 381 and "Changes" item 4 tag the removal of the 3 October note "[Swaraj, 28 October]". His words: "About the investor note, I don't understand what that is about, but if you think it should be removed, then remove it."
- (b) Design status line 5: "he also answered the questions of this design's previous draft with 'everything else is okay'". His "Everything else is okay" came inside his answer about where skill files live.
- (c) Framing T7 is "settled" by "Swaraj's answers". None of his 28 October answers addressed it.
- (d) Design D8 quotes "Whatever we get, the conversation manager gets, establishing it is first" and reads it as "sender and situation". His sentence was about establishing what a message means and claims versus facts, the Diwali point.
- Breaks: M1, N3.
- Kind: overstated attribution. Started: design and framing, 28 October. Status: confirmed.

**D11. The worker has no understanding part.** The business's strategy is presented by the routing label (the kind), not by the worker's own understanding. Understanding is folded into planning (first round) and deciding (later rounds).
- Evidence: design A2, F1; test 1 steps 9–12.
- Breaks:
  - B3: "the first thing it is doing is trying to understand… just based on the understanding… injected the appropriate strategy";
  - L3, L15, L16;
  - Level 2: "Understanding produces the model. Deciding uses the model. Those are different jobs."
- Kind: acting before understanding. Started: the design (28 October); the harness's worker contract had none, because it relied on the conversation manager's MEANING patch (lost in D2). Status: confirmed.

**D12. Memory and knowledge's revisiting of its own work became a citation check.**
- Evidence: design B2 step 5; framing responsibility 10.
- Swaraj: "The memory has to revisit what it has done till now. It has to look itself, the work it has done, and audit, like the audit you just did."
- Missing: reading what it presented earlier in this situation against what later evidence showed, and correcting its own earlier advice. Example: it advised 2026's sale; the order system shows the order was placed in 2025.
- Breaks: D2 (register). Kind: Swaraj's word narrowed. Status: confirmed.

**D13. When memory and knowledge's AI part fails, "the step goes on".**
- Evidence: design E4; test 17 step 3.
- At understanding, the step would go on without the business's meaning and could route wrongly.
- Breaks: L35 ("hold what depends on the dead source"), L8.
- Kind: failure rule too broad. Status: confirmed.

**D14. No "not work" outcome.** "None fits: start a new situation" turns "hi" or "thanks", with no open situation, into new work.
- Evidence: design F2.5; build `conversation_manager.md`; Sections 6 and 8 routing outcomes.
- Breaks: L43 ("not work → no situation (small talk; ack; stop)"); relevance page ("If it describes a real new problem, we create a new situation model"; "Ignored is not deleted").
- Kind: a harness or Level 2 rule dropped. Status: confirmed.

**D15. Level 2 contradicts itself, and the contradiction stands.** The same-situation page: "First — route… Second — understand". Ambiguity §9, the relevance page, the gathering page, Level 1 and the Product Vision say understanding comes first.
- Breaks: L10; the Level 2 method §6 ("go back and surface the correction rather than let the earlier document sit stale").
- Kind: Level 2 not reconciled. Status: confirmed.

**D16. The Level 2 design skips four of the framework's seven steps.** It has no alternatives, no trade-offs, no evaluation criteria and no "when not to use". It compares no protocols on speed or on how they fail.
- Evidence: design headings; no section matches.
- Breaks: N1, N5 ("compare at least two credible hybrid protocols, including their latency and degradation behavior"), the three-level framework, Level 2 process steps 3, 4, 6, 7.
- Kind: method skipped. Status: confirmed.

**D17. No test where memory and knowledge is wrong.** No wrong advice, no stale learned meaning, no wrong reading, no wrong candidate.
- Breaks: N5 ("test… incorrect memory outputs, not only correct behavior").
- Kind: tests that confirm instead of break. Status: confirmed.

**D18. Links moved from "written at discovery" to a background job, without declaring the change.**
- Evidence: design B4, Part G; the "Changes" list does not name it.
- Breaks: L39 (HS 11.2.3: "a newly discovered link is written synchronously at discovery (it is state)").
- Swaraj's 28 October words support the move: "when the something in the worker is running, it does not block the memory and knowledge layer to make links". It must be declared, with his quote.
- Kind: change not declared. Status: confirmed.

**D19. The package for each phase lacks what Level 2 says that phase needs.**
- Understanding: no package exists. Level 2 lists vocabulary, entity aliases, previous interpretations, related situations and ambiguity patterns. Events found by alias are missing from the fixed part, which looks up "listed words" only.
- Communication: C1 holds preferences and listed words. Level 2 adds channel conventions and communication corrections for the audience.
- Evidence: design B1, the C1 lookup.
- Breaks: L22, B9. Kind: Level 2 not carried through. Status: confirmed for understanding, partly for communication.

**D20. The Level 2 design leaves out the step instructions (the per-step templates).**
- Evidence: the design D6 table has no row for them, and A4's sections are not said to be its templates.
- The architecture already has them: Section 7 lines 256 and 305 and Section 6 line 485 say memory and knowledge owns the prompt assembly templates.
- Breaks: L45 (HS 14.1.3), L46.
- Kind: Level 2 design incomplete; the architecture is right. Status: confirmed, minor. The fix is one row in D6, plus A4's sections named as such a template.

**D21. Time words in an arrival are never turned into dates.** "Yesterday", "last time", "Friday", "the Diwali sale" stay "time clues" in retrieval's need (design C2.1), not ranges written by understanding and used as exact filters.
- Breaks: C1, L7, L24, F4, F6. Kind: acting before understanding. Status: confirmed.

**D22. The loops were not rethought.** Swaraj asked for the loops themselves to be redesigned. The design fitted points to the existing parts, and added no understanding part to either loop. The conversation manager stayed a thin router.
- Evidence: design A2, F1, F2.
- Breaks: B5, B6. Kind: scope narrowed. Umbrella over D1, D2, D11. Status: confirmed.

**D23. A carrier's "delivered" is nearly treated as fact.** Test 1 step 18: "8836 does not [fit], unless its 'delivered' claim is wrong". The question then names only 8840.
- Breaks: C4, L30. Kind: claim treated as fact. Status: minor; to re-walk under the rubric. Asking about the likelier order is allowed, if the reasoning keeps 8836 open.

**D24. The architecture was declared stable with these defects inside.**
- Evidence: Section 11 stabilization ("Stabilized 2026-10-28"); `checking/stabilization.md`; `checking/completion_record.md` part 3.
- Kind: a verdict given for the result alone. Status: confirmed. The verdict must be reopened, and given again after the fix.

---

## The kinds of mistake, and the phrases that find them

| Kind | Defects | Phrases to search for |
|---|---|---|
| K1 Acting before understanding | D1, D11, D21, D22 | "routing reasoning", "before routing reasons", "R1", "Get it to the right problem", "First — route", "time clues", "W1" as first point |
| K2 One filter doing two jobs | D5 | "sender's view", "step's view", "the person the step works for may see", "may narrow that worker's own searches", "outside … view" |
| K3 A claim treated as a fact | D23 | "delivered" in walks; "established" without a source |
| K4 A channel treated as a person | D7 | "channel address", "per sender (channel", "WhatsApp number" |
| K5 A test using data the design cannot deliver | D8 | in walks: details not in the presented items |
| K6 A Level 2 or harness rule dropped or changed silently | D2, D3, D4, D6, D14, D18, D19, D20 | "draws no conclusion", "only records and routes", "what came in as the first version", "finished situations that could fit", "start a new situation" |
| K7 A quote or tag that says more than Swaraj said | D10 | "[Swaraj", "Settled:", "everything else is okay" |
| K8 A single step where Swaraj said several | D22 (routing has no second turn) | "routing reasoning (1)" |
| K9 Fixed code doing the AI's job | none found so far | "fixed code decides", "code judges" |
| K10 A PASS given for the result alone | D9, D24 | "PASS", "Stabilized", "All pass" |
| K11 Method steps skipped | D16, D17 | missing "Alternatives", "Trade-offs", "When not to use"; no wrong-output tests |
| K12 Swaraj's word narrowed | D12, D10(d) | "revisit", "establishing it is first" |

---

## Register results (current design)

**Swaraj's words (41).**
- **Kept:** A1–A7, A10, A11, B1, B2, B7, B8 (W1 sees the subject), B10–B14, C8, C9 (worker side), D1, D3, D4, E1, E2, E3 (planning), E4 (planning), F1, F3, F5, G1–G4, H1, I1–I7, J1, J2, L1, N3, N16.
- **Broken:**
  - A8, A9 (D5); B3 (D11); B5, B6 (D22); B9 (D1, D19);
  - C1–C7 (D1, D5, D21); D2 (D12);
  - F4, F6 (D1, D6, D21); K1 (D7, in the cascade); M1 (D10);
  - N1, N5 (D16, D17); N2 (D8, D9); N8 (D1, D2, D15).
- **Partly kept:** F2 (Level 2's four retrieval stages are inside the pattern, but the need carries no understood values); N4 (one path per test); N13 (10 to 20 AI calls before a first reply, with no lean option weighed).

**Level 2 (42).**
- **Kept:** L11 (mostly), L13, L14, L19, L26, L28–L34, L38, L40, L47, L48.
- **Broken:**
  - L1–L6, L9 (D1–D4); L10 (D15); L12 (D6); L17, L18, L20 (D5); L21 (D6, D19);
  - L22 (D19); L25 (D6); L27 (D3); L35 (D13); L36, L37 (D7, cascade);
  - L39 (D18, undeclared); L42–L44 (D2–D4, D14); L45 (D20, suspected).
- **Partly kept:** L7, L8 (no explicit resolution of time references); L15, L16, L41 (D11); L23, L24 (the query to memory and knowledge is not built from a written understanding); L46 (preferences at C1 are right, templates missing).

---

## What this means for the fix

The defects share two roots:
1. **Understanding has no place in the loops** (D1, D2, D3, D4, D11, D14, D19, D21, D22). It started in Section 7's "thin" conversation manager and was carried into the memory and knowledge design.
2. **A person's visibility was applied to Tend's own reasoning** (D5, and D6's search). It started in the Level 1 framing.

The rest are honesty and method defects in Claude's own work (D8, D9, D10, D12, D16, D17, D18, D24) and one cascade defect (D7).

Fix order, by where each started: the framing (D5's origin, responsibility 11, T7) → the Level 2 design and tests → a dated note in the understanding folder (D15) → Section 6 → 7 (D2's origin) → 8 → 9 → 10 → 11 → 12 (all views, the build view included) → the checking folder (D24).
