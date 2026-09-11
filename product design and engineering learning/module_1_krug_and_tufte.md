# Module 1 (continued) — Krug and Tufte (learning record)

> Learning record, not a design document. Tend appears only as the concrete example a concept lands on — never as a decision target. Taught from the assistant's reading: Steve Krug's *Don't Make Me Think* (the user on the far side) and Edward Tufte's information-design work (the page itself). Reference spine stays *Universal Principles of Design* (2003 first edition), cited by page.
>
> Continues `module_1_the_concept_canon.md` (five failures + ten heuristics). Same contract: one unit at a time, first principles, plain words.

---

## Krug — the person on the far side of the screen

**The problem that births it.** Software was designed as if the user wants to *understand* it — read the page, compare options, choose the best. Krug watched real people. They do none of that. Three observed behaviors:

1. **They scan, they don't read.** Eye-tracking: about a quarter of the words get read. The rest is a blur passed over, hunting for what *looks* useful — headings, links, buttons, anything bold or different.
2. **They satisfice.** No hunting the best option — first *reasonable* one wins. Like taking the first parking spot that fits instead of circling for the perfect one.
3. **They muddle through.** Nobody learns how things work. Poke, try, backtrack — and keep going as long as the design *forgives* the fumbling.

**The rule.** *Don't make me think.* A screen should be **self-evident** — identity, purpose, and clickability obvious at a glance. Krug's instrument, the **billboard test**: design every page as if driven past at 60 mph. In ~3 seconds, no reading: **What is this? What can I do here? Why here?**

**Tend (example only):** the 9am landing view must pass the billboard test — "those need me, that one went wrong, those are waiting" — with no reading. One situation costing a sentence of reading = the tax paid forty times every morning. An owner who configures badly must still succeed: the surface forgives; honest state words make wrongness visible at a glance.

**Echoes:** scanning = recognition at speed (H6, UP "Recognition Over Recall" pp.164–165). Satisficing makes prevention a duty — the first plausible thing must be the right one (H5). "Make-me-think" moments are noise (H8, UP "Signal-to-Noise Ratio" p.182). Muddling = the rough private story (conceptual model, UP "Mental Model" p.130). Conventions = H4 consistency (UP p.46).

---

## Tufte — the page itself

**The problem that births it.** The 1986 Challenger explosion: engineers *had the numbers* proving cold would break the seals — but the presentation hid the temperature-vs-damage story from the deciders. Nobody lied. The information was true, complete, and useless. **Information that exists is not information that is seen.**

**The rule — and the misreading it kills.** NOT "less is more." **More information is fine; badly arranged information is the evil.** The goal is never an empty page — it is a page where the *arrangement* does the seeing. (UP "Signal-to-Noise Ratio" p.182, re-read with Tufte's eyes: every mark earns its place; emptiness is a side-effect, never the aim. This corrects the naive H8 reading.)

**The three moves:**
1. **Kill the noise, not the information.** *Chartjunk* — gridlines that don't help, fills that mean nothing — removed reveals what was underneath. The anti-slop blacklist's theoretical father.
2. **Arrange for comparison.** The Challenger chart hid the dimension that mattered. The instrument: **small multiples** — the same small chart repeated per category, same scale, same axes — differences jump out as pattern instead of hiding in one crowded display.
3. **Lead with the answer; layer the depth.** UP "Inverted Pyramid" pp.116–117 (conclusion first, elaboration after) + UP "Progressive Disclosure" pp.154–155 (hide the infrequent, reveal on request). Don't delete detail — *order* it and *park* it.

**Tend (example only):** the morning holds dozens of situations. Show-everything-each-row-labeled is the badly arranged display: forty rows read to find three that matter. The Tufte shape: arrangement lands the eye on the signal — the one that went wrong *shouts*, the forty quiet ones stay quiet (UP "Highlighting" pp.108–109 — by contrast, sparingly). Density is not the enemy; the answer hiding inside the cells is.

**Echoes:** Krug bills the *time* (three seconds), Tufte bills the *arrangement* (where the eye lands) — same tax, two invoices. H8 now reads "arrange," not "remove." Refactoring UI p.46 "emphasize by de-emphasizing" = Tufte's move as a design rule (meets Module 2). Module 8 item 2 (aggregation/filter/triage) stands on this unit: inverted pyramid + small multiples + progressive disclosure are its toolkit.

---

## Status

Krug and Tufte taught 2026-09-14. Module 1's remaining units (machinery, Rams, emotional design) live in `module_1_machinery_rams_emotional.md`. End-of-unit learning work from both units still open in conversation.
