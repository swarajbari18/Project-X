---
name: project-memory-loop-redesign
description: "Memory and knowledge redesign, then the product loop (29 Oct 2026): loops built from product stages; harness study rewritten; Section 12 reworked; Sections 6–11 untouched; drafts 40–53; nothing committed yet"
metadata:
  node_type: memory
  type: project
  originSessionId: 26ac75ff-2e59-43b9-8042-d540cba1698c
  modified: 2026-10-29T09:58:39.679Z
---

On 28 Oct 2026 Swaraj had memory and knowledge redone through the three levels and carried through Sections 6–12. On 29 Oct (morning) he found routing decided before "the Diwali sale" was understood; the whole conversation was audited (drafts 40–47: registers, 24 defects, break tests). Later on 29 Oct he rejected the loops' shape itself ("the loops do not look natural to me … I am first and foremost a product engineer"; "Routing, I don't think would be much of a LLM thing") and asked, in one run, for: the product loop designed from stages with tests at three levels of difficulty, the harness study rewritten (or scrapped), Section 12 reworked in every view, Sections 6–11 NOT touched.

Done 29 Oct (later), all uncommitted:
- `knowledge_base/Level 2/the_product_loop/` (design, 37 tests, conversation record); memory and knowledge design + 52 tests re-walked under stage headings; STRUCTURE.md;
- `knowledge_base/agent_harness_study.md` rewritten (2134 → 391 lines): catalogue of kinds of LLM interaction, sources, rulings, improvement, compute; map of old parts;
- Section 12 every view; decisions 34–37; PL-1…PL-19 codes in every code index; conflicts 28–34; decisions register part 7; construction record entry 24;
- drafts 48–53 hold the working (records touched, human walk, v1, tests and levels F1–F20, progress, PL block).

Key design: four loops (arrival, situation, update, message) of stages; any stage passed or ending the loop, chosen by code from facts; understanding the arrival = the conversation manager's one AI stage writing the **understanding artifact** (formerly "reading"), with a **wider look**; endings: reply (not about the business, no situation, never learned) / nothing to do / answered from what Tend holds (restored 5 Sept ruling) / hold and ask / routed; routing is fixed code; situation loop: understanding the situation, gathering (information plan, explore steps, reads only), weighing evidence, deciding, acting; packages only before stages that reason.

Awaiting Swaraj: five calls (general answers by default; no reply to thanks; greeting rules; planning in gathering; packages only before reasoning stages); one option not applied (answer "any update?" for all open situations — changes rule B3); three 28 Oct calls; whether drafts folder goes into the commit.

**Why:** he judges by fidelity to his words, Level 2, and the product view; loops drawn from technical patterns failed him twice.

**How to apply:** design from product stages first (see [[feedback-loops-from-product-stages]]); list decided records before changing any; test at simple/harder/very-hard levels by process. Related: [[feedback-understanding-before-action]], [[feedback-working-files-location]], [[feedback-subagent-usage]]
