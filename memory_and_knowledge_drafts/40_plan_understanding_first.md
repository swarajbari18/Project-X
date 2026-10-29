# Understanding comes first — the plan (29 October 2026)

Swaraj approved this plan with "go." on 29 October 2026. It answers his message: "Audit this complete conversation… make a complete plan… how you will find your own mistakes that I have not found yet and then correct them. I do not want any more babysitting."

## What went wrong

On 27 October Swaraj said: "First, it has to figure out the aspect of time", and memory and knowledge "should search the whole business land, not just the particular graph related to that person itself". Claude put the sale lookup in the worker (W1), after routing, and kept routing away from it with "routing uses the sender's view".

Why it happened:
- Claude designed around the loops' steps as Sections 6–12 had them (routing reasoning, routing check, plan, act, decide, write). Claude never rebuilt them from Level 1 and Level 2, where the order is understand, gather, decide, act, communicate. Understanding got no point, no package, no written output.
- One filter did two jobs: what a step may use to understand, and what may be shown to it as a possible match or told to a person. That brought back Swaraj's rejected point 5 under a new name.
- Claude's technical audits checked Sections 6–12 against Claude's own memory and knowledge page, never that page against the rest of Level 2 or against Swaraj's words.
- A test was marked PASS on a lucky result.

## Confirmed defects (from text already read on 29 October)

1. Nothing helps routing understand. R1 gives the sender's open situations, numbers in the message, listed words, the time. Level 2's context page says understanding needs "local vocabulary, entity aliases, previous interpretations, relevant related situations and known ambiguity patterns".
2. The design contradicts itself. E1 is headed "Seeing everything, presenting little" but applies the step's view before any search. D5 says "the first time an event is mentioned, memory and knowledge's AI searches the business's records"; routing never does.
3. The routing view rule contradicts Level 2 authority: Tend may use a confidential source internally while telling outsiders only a limited description.
4. Routing's written output lost the harness study's MEANING fields (interpretation, referenced thing, purpose, ask list, new or join). It keeps only "refers to something that already happened" and "possible situations".
5. The meaning is never saved. Claude's notes: the conversation manager establishes only "sender, situation". Swaraj: "whatever we get, the conversation manager gets, establishing it is first." Section 7: the first version holds only "what came in".
6. Section 12's routing file: "Get it to the right problem. Then understand what it adds." Probably older than this week.
7. Section 6 B10 queues messages "from one channel address". Swaraj: a person is a unique ID, not a WhatsApp number.
8. Test 1 step 18 invents "the pin code did not match the city"; the worker was shown only "failed, reason address".
9. E1 tags the removal of the 3 October investor note as Swaraj's decision. His words: "if you think it should be removed, then remove it."
10. Test 30 skips routing entirely.

## Suspected, to check

- Planning in one go; a question asked mid-plan waits until the plan is finished.
- A thin self-audit: "has to revisit what it has done till now" reduced to citation checks.
- Understanding without the business when memory and knowledge's AI fails.
- The worker view rule may block business knowledge (a strike, a flood, a sale) from another situation.
- Past situations searched on any reference to the past; Level 2 says only on explicit reference; change maybe never put to Swaraj.
- The Level 1 framing may never say "help each step understand before it acts".
- A carrier's "delivered" treated as close to fact somewhere.

## Step 3 — finding the mistakes (no edits)

1. Register of Swaraj's words (since 26 October, plus his messages in the Cursor transcript). Each quoted exactly, turned into a yes-or-no question a design can fail. → `41_register_swaraj_words.md`
2. Level 2 register: settled rules from every folder memory and knowledge touches. Each a yes-or-no question. → `42_register_level2.md`
3. The loops rebuilt from Level 1 and Level 2; for each step, what Level 2 says it needs; compare with the current points. → `43_loops_rebuilt.md`
4. Trace both registers against the design, line by line: kept, broken, partly kept, missing; each break to the defect list with the level where it started. → `44_trace_and_defects.md`
5. Mistake classes; search every file for each class. → in `44`
6. Tests that try to break the design: re-walk all 35; add tests at the weak spots. → `45_break_tests.md`

## Step 4 — thinking the fix through (drafts only) → `46_design_thinking.md`

Understanding first; reading in checkable parts; routing from the reading with exact filters; the reading saved in the version; using separate from showing; options with reasons; re-walk with AI calls counted.

## Step 5 — writing and checking

1. This plan and the registers in this folder.
2. Record Swaraj's 28 and 29 October words exactly.
3. Fix at the level where each defect started (Level 1 framing if needed; Level 2 design and tests; dated note in the understanding folder).
4. Sections 6 to 12 in order; each section's technical audit against both registers and the defect list. Every Section 12 view, build view included, with the older defects.
5. Registers run again on the finished text; search for each class's typical phrases.
6. Subagents for readability only, judged against Swaraj's words.
7. Final list: each defect, its kind, where it started, where it was fixed.

## Step 6 — what goes back to Swaraj

No question that his words, Level 2 or the product vision already answers. Real decisions in one batch after step 4, each with a recommendation. Still waiting from 28 October: pending-review rules made Decided; how MCP servers are connected; when the central situation ends.

## Progress

- 29 Oct: plan saved.
- 29 Oct: step 3 done. Registers `41` (Swaraj's words, 70 items) and `42` (Level 1, Level 2, harness: 48 rules); loops rebuilt `43`; trace and 24 defects in 12 kinds `44`; break tests `45` (current design: 12 of 35 pass the rubric; 15 new tests).
- 29 Oct: step 4 done, `46`. Ten choices, each with alternatives and reasons. No new decision is Swaraj's; the three from 28 October still wait and block nothing.
- 29 Oct: step 5, Level 2 written:
  - conversation record ("Understanding comes first", 29 Oct; investor-note attribution fixed);
  - Level 1 framing (dated note; word list; hardest problem; how we know; 2b; responsibilities 2, 10, 11; interaction; invariant; Q33, new Q41; T7);
  - design (status; words; one page 10–11; A2 points R1–R3, W0; A4 the reading; B1 fixed parts; B2 revisiting; C2 filters and the routing-candidates rule; D5; D6 step instruction row; D8; E1 using vs showing; E4; E5; F1 W0; F2; Part H; changes 8–14);
  - tests (rubric; 24 corrected walks; test 1 rewritten; 36–50 added; honest summary);
  - dated notes on the same-situation page, the understanding page, and three pointer pages.
- 29 Oct: Sections 6 to 11 written (codes, decisions 20–21, rules 35–37, stabilization reopened and re-given); Section 12 every view, code indexes, checking folder; construction record entry 23; what_is_already_settled; README. Two missed 28 Oct defects fixed (a board; "whether a link is accepted").
- 29 Oct: checks run (`47_verification.md`): kind-phrase sweep clean; new codes indexed; 20 codes from 28 Oct indexed; links resolve.
- 29 Oct: three readability audits applied (rejections recorded in the audit record). Found through them: Arjun as both customer and employee (the employee is now Kabir); "reading" colliding with the status label "the design's reading"; the old search rule left in the memory responsibility file; and Claude's own over-strict correction of the past-situation rule, which overturned the 3 October agreed picture. Withdrawn and corrected the same day.
- 29 Oct: final checks clean. Audit record entry written. Nothing committed.
