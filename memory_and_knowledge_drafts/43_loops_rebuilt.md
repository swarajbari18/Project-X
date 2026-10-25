# Step 3: the loops rebuilt from Level 1 and Level 2

Written 29 October 2026. Built from the registers (`41`, `42`), not from the current memory and knowledge design. For each part: where it comes from, what it must have in front of it (Level 2's context page, L22), and what it writes. Open choices are marked **Choice** and are settled in `46_design_thinking.md`.

The governing order, in Level 2's own words, from four places:
- Product Vision: "Tend should never take an action before understanding the situation." (L1)
- Level 1: receive, then "Tend understands the situation", then retrieve from business systems (L2).
- Ambiguity §9: preserve the message; build candidate interpretations; separate interpretation from fact; **then** apply routing; then create or update the model (L5).
- Gathering: "Message or other event → Understand and route → Current situation model → Gather → Update → Decide and act" (L15).
- Swaraj: "whatever we get, the conversation manager gets, establishing it is first" (C5); "the first thing it is doing is trying to understand the situation" (worker, B3); "understanding a particular thing beforehand, before doing any action" (C7).

The one Level 2 sentence against this ("First — route… Second — understand", L10) describes the full update of the routed situation's model, which does come after routing. It gets a dated note.

---

## The conversation manager (one arrival)

| # | Part | Who | Source | In front of it | Writes |
|---|---|---|---|---|---|
| 1 | Intake | code | Decided | the arrival | the arrival, saved; repeats dropped |
| 2 | Who sent it | code | L37, K1 | the channel address | the person ID (or a new person, marked unknown) |
| 3 | One run per person | code | L36, K1 | the person ID | a place in that person's queue |
| 4 | **Point U** | memory and knowledge | L22 (understanding), L21, B9, C1, C2 | see below | the understanding package |
| 5 | **Understand** | AI | L4, L5, L7, L8, L43, C5, C6 | the arrival; the package | **the reading** (see below) |
| 6 | **Point R** | memory and knowledge | L21, L12, L24, F6, C7 | the reading | candidates, found from the reading |
| 7 | Choose | AI, only when needed (**Choice 2**) | L9, L11, L13 | the reading; the candidates | which candidate this arrival updates, or none |
| 8 | Check | code | L4 (VALIDATE), L11, L43 | the reading; the choice | attach, create, split, ask with a held note, or no situation (not work) |
| 9 | Save and announce | code | L4, L42, L44 | — | the arrival **and the reading** in each routed situation's new version |

**What the understanding package holds (point U).**
- Fixed part, exact only: the person's open situations, as typed summaries; situations holding a number found in the arrival, if inside the person's boundary; meanings of listed words found in the arrival; **business events and other named things whose name or alias appears in the arrival** (an exact match on a stored name is ordinary code); the present time in the business's time zone, and the arrival's own time.
- AI part: which words need this business's meaning (events, products, places, people, time words such as "yesterday" or "last time"); asks retrieval, across the whole business's knowledge, what they mean; earlier readings of this person's words; known misreadings (lessons). Presents each meaning with its sources and dates, and advice where it is a judgment ("2026's sale, because 'still hasn't come' and 2025's ended a year ago"). Each item says who may be told it.

**What the reading holds (Ambiguity §8.2, §9; HS MEANING).**
- What is asked: the list of asks; one problem or several.
- What it refers to: each referenced thing, with what is resolved (a date range, an ID) and what is still a small set of candidates.
- What is the sender's claim; what is unknown.
- Whether it refers to earlier work (an explicit reference to a past situation) or to a business object (an order, an item).
- For new work: its kind and purpose.
- Not work: small talk, an acknowledgement.
- Exact quotes for everything it rests on, checkable by code.

**Candidates from the reading (point R).** Structured scope only (HS 11.2.2): the person's open situations filtered by the reading's resolved values (IDs, date range, kind); the person's finished situations only when the reading refers to earlier work, or when a referenced object sits in one (Level 2's reopen case), found by the same exact filters, never by similar words (L25). This is Swaraj's point: knowing the sale's dates makes routing a filter.

---

## The situation worker (one situation)

| # | Part | Who | Source | In front of it | Writes |
|---|---|---|---|---|---|
| 1 | Wake | code | L41 | a new version, a timer, a tool result, a rule change, a check-in | — |
| 2 | Recovery; one run per situation | code | L41 | — | — |
| 3 | **Point (before understanding)** | memory and knowledge | L22 (understanding) | the full record; what is new | the understanding package |
| 4 | **Understand** (**Choice 3**: when it runs) | AI | B3, B8, C9, L15, L16, L2, L3 | the full record; the conversation manager's reading; the package | the update to the model: what is asked, what is now known, unknown, in conflict; whether routing looks wrong |
| 5 | Point W1 | memory and knowledge | B3, L22 (gathering) | the understanding | the business's strategy for this understood work: pinned procedure, skills, tools, gathering lessons |
| 6 | Plan (several turns) | AI | E3, E4 | the package | the plan |
| 7 | Point W2; check the plan | m&k; code | — | — | — |
| 8 | Point W3; decide | m&k; AI | D1–D4, L22 (decision) | the work as first asked; plan; results; claims; new arrivals; other situations' waits | the decision |
| 9 | Point W2; check; act | m&k; code | L41 | — | typed results |
| 10 | Go round, or rest | code | L40 | — | — |

**Choice 3, when the worker's understanding part runs.** Level 2: "Understanding then incorporates that result into a new complete situation-model version" (L16). Swaraj: the worker's first thing is understanding (B3). Typed tool results are already structured claims, which code saves and fixed rules compare (L31, Fork A). Free text (a reply, a document, a web page, a partner's email) needs reading.

---

## The communication layer

Point C1 before writing: Level 2's communication needs (business terminology, channel conventions, communication corrections for this audience; L22) and the recipient's preferences, injected at the generating step (L46). Then the AI writes; then the send check (code).

---

## What this shows against the current design

- The conversation manager has no understanding part and no point before one; R1 is built for matching.
- The worker has no understanding part; understanding is folded into planning (first round) and deciding (later rounds). Level 2 calls these different jobs ("Understanding produces the model. Deciding uses the model.").
- The reading is never saved, so the worker works the meaning out again (against L6, L42).
- Routing's candidates come from similar words over finished situations, not from structured scope (against L12, L21, L25).
