# Step 6: tests that try to break the design

Written 29 October 2026. Swaraj: stories are tests; "If that is failing, then you go back to the drawing board" (N2); "test competing event orderings and incorrect memory outputs, not only correct behavior" (N5).

## The rubric: a walk passes only if every step passes every line

| Line | Question for each step | Kind it catches |
|---|---|---|
| R-a | What does this step know, and which item, record or arrival gave it? Anything else is invented. | K5 |
| R-b | Was what arrived understood (its meaning, its references, its time words) before this step routed, created, planned, called a tool or wrote? | K1 |
| R-c | Is every report kept as a claim, every reading as an interpretation? | K3 |
| R-d | Did memory and knowledge decide anything? | A10 |
| R-e | Was another person's record shown or hinted? Was the business's own knowledge kept from understanding for no reason? | K2 |
| R-f | Did retrieval use what was understood as exact filters first? Was any history searched only because its words look alike? | L21, L25 |
| R-g | Is anything keyed by a channel where it should be by the person? | K4 |
| R-h | Does every quote or tag of Swaraj's say exactly what he said? | K7 |
| R-i | How many AI calls? Was any avoidable? | N13 |

## The 35 tests, walked again against the current design

Strict result: every test that routes a message fails R-b, because the design has no understanding part. Listed with the defects behind each failure.

| Test | Rubric result | Defects |
|---|---|---|
| 1 Arjun, the Diwali sale | FAIL R-b, R-e, R-f, R-a (step 18) | D1, D5, D6, D8, D21 |
| 2 Race while deciding | PASS (worker only, typed) | — |
| 3 The white linen shirt | FAIL R-b, R-f (finished situations by similar words) | D1, D6 |
| 4 Vikram's jacket; 10,000 | FAIL R-b, R-f; routing asks "which jacket", which is gathering's question | D1, D6 |
| 5 Meera's late parcel | FAIL R-b (outcome right; no reading; "yesterday" unresolved) | D1, D21 |
| 6 Priya replies | FAIL R-b (worker reads her reply inside its decision) | D1, D11 |
| 7 The flood | PASS (typed claims) | — |
| 8 Lara asks | FAIL R-b; R-e passes (candidates inside Lara's view, correctly) | D1 |
| 9 Investor types a number | FAIL R-b; R-e passes | D1 |
| 10 Stranger types a number | FAIL R-b; R-e passes | D1 |
| 11 "dispatch ready" | FAIL R-b (the listed meaning is shown, but no reading is written) | D1, D3 |
| 12 Sana's two asks | FAIL R-b, R-a (asks listed with no place to list them) | D4 |
| 13 Dark AMMs | FAIL R-b at routing (harmless here); worker side passes | D1 |
| 14 New email address | FAIL R-b | D1 |
| 15 Planted instruction | FAIL R-b | D1 |
| 16 Two messages a second apart | FAIL R-g (queue keyed by channel address) | D7 |
| 17 Memory and knowledge does not answer | FAIL at step 3 ("the step goes on") | D13 |
| 18 Procedure changes midway | PASS | — |
| 19 Priya asks to be erased | FAIL R-b (her request is read inside the decision) | D1, D11 |
| 20 Kind changes midway | PASS | — |
| 21 A document arrives | FAIL R-b (the document is read inside the decision) | D11 |
| 22 Employee removes a link | PASS | — |
| 23 Two workers sending | PASS | — |
| 24 Meaning-only relationship | PASS | — |
| 25 Send into a completed situation | FAIL R-b | D1 |
| 26 Typo matches own order | FAIL R-b | D1 |
| 27 H17 reused at another hub | PASS | — |
| 28 Message tries to change the person | FAIL R-b; R-e passes | D1 |
| 29 Delivered versus not received | PASS | — |
| 30 A past sale | FAIL R-b (skips routing) | D1, D9 |
| 31 Channel rule changes | PASS | — |
| 32 MCP server | FAIL R-b at routing; worker side passes | D1 |
| 33 Business skill | FAIL R-b at routing | D1 |
| 34 Thirty contacts | FAIL R-b (the instruction's asks are not written as a reading) | D1, D4 |
| 35 A decision ends the run | PASS | — |

**12 pass, 23 fail.** The summary's "35 tests. All pass." was a verdict on results, not on process (D9).

## New tests, aimed at the weak spots

Each says what it probes, and what the current design does.

**N1. Arjun has an open situation about order 8840.** Setup as test 1, except that his own open situation "late delivery, order 8840, placed 22 October" already exists. He writes "the one I ordered in the Diwali sale still hasn't come". Probes: understanding before routing (C7). Current design: the open summaries carry the order number, not what "the Diwali sale" means. Routing cannot tie the message to 8840, so it starts a twin situation or asks a needless question. **FAIL.**

**N2. The first mention of the event.** The owner spoke of the sale's dates only inside a situation, on 12 October; the learner has not yet kept an event item. Arjun writes about "the Diwali sale". Probes: "search the whole business land" (C2). Current design: routing searches only Arjun's own records, so the owner's situation is never searched. **FAIL.**

**N3. "The Diwali sale last year".** Probes: time words resolved against the present date (C1). Current design: there is no reading to resolve "last year" into 2 to 6 November 2025. **FAIL.**

**N4. "The delivery man came yesterday", sent at 00:20 on 29 October.** Probes: "yesterday" in the business's time zone, at the arrival's own time; near midnight, "yesterday" may mean 28 or 27 October, a small candidate set. Current design: no reading. **FAIL.**

**N5. One word, two meanings.** The business ran an online "Mega Sale" and an in-store "Mega Sale" on different dates. Probes: a bounded set of candidates at the smallest point (L7). The reading keeps both ranges; routing filters with both; if the candidates differ, Tend asks. Current design: no reading. **FAIL.**

**N6. A customer asks "do you support dark AMMs?"** Probes: an unknown term arriving through routing. The reading marks it "unknown in this business", and routing does not guess. Current design: passes by luck (a new situation). **FAIL R-b.**

**N7. Dates known only from a confidential memo.** The sale's dates are in an internal pricing memo that only managers may see. Probes: using versus showing (D5). Understanding uses the dates; routing filters with them; the reply never contains them; the send check stops a draft that does. Current design: the dates are not used at routing. **FAIL.**

**N8. Memory and knowledge's advice is wrong.** It advised "2026's sale". The order system shows Arjun's order was placed on 4 November 2025. Probes: wrong output (N5), and memory and knowledge revisiting its own work (D2, D12). The worker's decision sees the conflict; memory and knowledge's next package names its earlier advice as wrong and corrects it; the learner keeps an interpretation trap. Current design: no revisiting. **FAIL.**

**N9. A learned meaning has gone stale.** Probes: a stale item presented with its date and standing. Current design: test 13's variant covers it. **PASS.**

**N10. Arjun writes on WhatsApp and email within one second.** Probes: queue by person (K1, L36). Current cascade: two parallel runs, twin situations possible. **FAIL.** (The Level 2 design itself says "per sender".)

**N11. "thanks!" from a person with no open situation.** Probes: the not-work outcome (L43). Current design: a new situation. **FAIL.**

**N12. The AI part fails while the message is being understood.** Arjun writes "the Deepawali sale order hasn't come". Probes: L35.
- "Deepawali" is not a stored alias, so the fixed part finds no event.
- The reading must mark the term unknown.
- Routing must not commit on it: with no candidate that could match anyway, a new situation; with candidates whose match depends on the meaning, ask or hold.

Current design: "the step goes on". **FAIL.**

**N13. The owner's sale instruction is saved one second after Arjun's message.** Probes: competing orderings (N5). Arjun's understanding package lacks it, so the reading marks the term unknown. At the worker's next point, memory and knowledge presents the newly kept dates. No stale reading is treated as settled. Current design: no reading exists to go stale. **FAIL R-b.**

**N14. The investor types "8821" under the new rule.** Probes that the fix does not leak. Understanding may use the business's knowledge, but not another person's records: 8821 is Meera's order, a person-bound record, so it is not used and not hinted at. The reading says "a number unknown to this sender". This must **PASS** after the fix.

**N15. A customer redefines a business word.** "For me the Diwali sale means 50% off on everything." Probes: claims (C4) and learning limits (L26, L28). The reading records it as his claim; business knowledge keeps its dates; the learner learns nothing from a customer's words. Current design: no reading. **FAIL R-b.**
