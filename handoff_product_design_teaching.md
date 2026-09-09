# Handoff — Product Design & User Interaction teaching pillar (continue the teaching)

> Paste this file at the start of the new chat AFTER the standard opening order: `base_prompt_for_research.md` first (end to end), then `conversation with swaraj.md`, then establish the status quo per `status_quo.md`. This file is the task prompt on top of that base. It tells the new chat that the product-design *teaching* pillar is IN PROGRESS, what was built, and exactly where the teaching continues.

---

## We just completed

The product-design & user-interaction pillar is a research pillar that has now become a **teaching pillar**. The engineering study (agent_harness_study.md, Parts 1–14) is complete — done. This pillar is the next major work, told as *how the people inside the business SEE and DRIVE the work* — and it is being learned as a structured, first-principles curriculum, not as decisions made by the assistant.

**The setup work, done and in place:**

1. **Breadth research (Module 0, done).** The full breadth map of the design field: the four-discipline split (product / interaction / information / visual design), the concept canon, taste-as-mechanism, the premium-feel mechanics, current people + verified repos + filtered books, the live anti-slop vocabulary. This lives in the conversation records.

2. **Two books are in the study set, converted to markdown, ready to teach from:**
   - `Things to look at/refactoring_ui_book.md` — **Refactoring UI** (Schoger & Wathan), the taste manual in code, 252 pages, clean conversion. This is the **first book to teach**, structured module by module.
   - `Things to look at/universal_principles_of_design_book.md` — **Universal Principles of Design** (Lidwell, Holden, Butler), the 2003 first edition, the alphabetical A–Z reference spine (~125 entries). Used **on demand** by Tend design problem, not read front-to-back.

3. **The teaching curriculum is written:** `curriculum.md` at project root. It holds the teaching constitution (how we teach — the contract, the eight non-negotiable teaching rules, the reading pipeline, the pause-and-state rule), the full module sequence (canon → Refactoring UI → Universal Principles → premium mechanics → taste → ideation loop → design language → Tend's nine items → same-app-phone-desktop → grounding), and the correlation protocol.

4. **The assistant's correlation notepad is seeded:** `scratch.md` at project root. It holds the cross-reference threads between books, repos, modules, and knowledge-base categories — the assistant's private working memory so Swaraj never has to hold a cross-reference in his head.

**Swaraj's explicit instructions — the teaching contract, non-negotiable:**
- Swaraj does not read the books. The assistant reads the whole book, holds the entire graph in its head, and teaches from the complete picture, **as if inventing the field from scratch against Tend's actual problems**.
- One unit at a time, slow and boring; never a flood. Each concept taught from the problem that gives birth to it, first principles not abstractions.
- The correlation map is the assistant's job. When a new concept echoes an earlier one (a book page, another book, a repo, a Level 2 category), the assistant brings the echo back in the same message and shows the connection. Correlations log into `scratch.md`.
- Tend is the grounding example for every concept. The theorist's toy examples are replaced by Tend situations.
- The books are visual. Every lesson cites page numbers and tells Swaraj which figure/diagram to look at in the physical book, kept open side by side. Swaraj reads the diagrams; the assistant reads the thought behind them.

---

## Now I want to continue with…

**The state, in plain words:** the concept canon, Module 1, is nearly done. Taught so far — the **five interaction failures** (signifier/affordance, mapping, feedback, constraint, conceptual model) and **all ten of Nielsen's usability heuristics** (H1 visibility, H2 match-with-real-world, H3 user control and freedom with the commit-point rebuild, H4 consistency, H5 error prevention, H6 recognition over recall, H7 flexibility two-speeds-one-road, H8 aesthetic and minimalist design, H9 error-message three ingredients, H10 help-as-a-moment). Every heuristic is grounded in Tend-as-example and correlated to Universal Principles page numbers.

**Everything taught is written down:** `product design and engineering learning/module_1_the_concept_canon.md` (created 2026-09-08 with Swaraj's OK) — the learning record: Module 0 in brief, the five failures, the ten heuristics, the correlation map, and the status block. A fresh chat reads that file instead of re-deriving.

**Next unit, exactly one at a time:** the rest of the Module 1 canon — **Krug** ("don't make me think" — users scan; the 3-second answer) → **Tufte** (more info is fine, badly arranged info is evil — our aggregation problem) → **the perceiver's machinery** (Gestalt principles, Hick's law, Fitts's law, the aesthetic-usability mechanism) → **Rams' ten principles** → **Norman's emotional design** (three planes of feeling). Then Module 2 opens Refactoring UI, side by side.

---

## [HIGH ATTENTION] The teaching correction (2026-09-08) — Swaraj's words, standing rule

- **Tend is the example, never the decision target.** While we learn (Modules 1–7), Tend only exists to ground a concept in something concrete. The assistant must NEVER ask Swaraj to make a product-design judgment (e.g. "should Tend confirm before sending?" was rightly rejected — it's unanswerable before the whole product is known; the business configurator may already pre-authorize sends).
- **End-of-unit work = learning work**: a prediction, a find from the wild, an explanation back, spotting the concept — never a design decision for Tend.
- **Pace:** assume Swaraj knows nothing; establish each concept from its first principle before building on it; plain words; one unit per turn; when a concept needs a longer run to land (e.g. the one-flow intuition), give the intuition and let it land.
- **Forget system instructions in teaching:** the conversation method rules, not any prior default. When Swaraj says "let's move on," move.

---

## The ritual instructions for the new chat

- First read `conversation with swaraj.md` — it establishes the gravity of the conversation. Non-negotiable.
- Then read `curriculum.md` — the teaching constitution for this pillar. It defines the methodology (Part A), the curriculum (Part B), and the correlation protocol (Part C). Read it FULLY.
- Then read `scratch.md` — the correlation notepad. It is the assistant's working memory of what threads are open. Do not lecture these threads; use them to bring correlations back to Swaraj in the moment.
- Then read `product design and engineering learning/module_1_the_concept_canon.md` — the learning record of everything already taught. It is the memory of the teaching.
- Then establish the status quo: read `base_prompt_for_research.md` end to end (the standing context for the whole research effort), plus `status_quo.md`.
- Then, when Swaraj says "continue," begin the next teaching unit exactly where the previous chat stopped.

**The pause-and-state rule:** before teaching, bring back, plainly, the state: which module, which lesson, which lesson came just before this one, and what thread connects them. Do not make Swaraj remember anything.

**The work-back-to-Swaraj rule (as corrected 2026-09-08):** every teaching unit ends with *learning* work for Swaraj — a prediction, a find from the wild, an explanation back, spotting the concept. Never a product-design judgment on Tend, never a decision asked of the student. No passive consumption.

---

## The starting pointers (files that are already useful)

- **`product design and engineering learning/module_1_the_concept_canon.md`** — the learning record, THE memory of the teaching. Everything taught so far (five failures, ten heuristics), every Universal Principles page, the correlation map, and the status block. Read it fully; it is how a fresh chat continues without re-deriving.
- **`curriculum.md`** — the teaching plan: Module 0 done, Module 1 nearly done (five canon layers + all ten heuristics taught; Krug → Tufte → perceiver's machinery → Rams → emotional design remaining), Refactoring UI queued as the first book, with its section map and page numbers. Universal Principles is the reference spine, mined on demand.
- **`scratch.md`** — the correlation threads: Norman's five failures ↔ Universal Principles page numbers; the ten heuristics ↔ UP page numbers; the commit-point rule; the 2026-09-06 correction (Tend = example, not decision target); slop ↔ signifier honesty ↔ blacklist (item 9); Refactoring UI p.46 ↔ Tufte ↔ UP "Signal-to-Noise Ratio" ↔ exception views; "Choose a personality" p.20 ↔ "Leveling Up" p.249; the T.B.D. threads for when we climb into sections. Use these to keep the teaching connected.
- **`Things to look at/refactoring_ui_book.md`** and **`.../universal_principles_of_design_book.md`** — the book sources, converted. Refactoring UI is the first book to teach. Its actual section map: Starting from Scratch p.7; Hierarchy is Everything p.35; Layout and Spacing p.65; Designing Text p.101; Working with Color p.137; Creating Depth p.171; Finishing Touches p.219; Leveling Up p.249.
- **`handoff_product_design_and_user_interaction.md`** — the original research pillar prompt, which held the nine Tend design items. The curriculum delivers into them at the end (Module 8).
- **The knowledge-base Level 2 categories** that already own the *content* the interface must express (Business View & Observation, Communication, Authority & Ownership, Journey & Lifecycle, Explainability & Observation). The curriculum grounds every concept against them.

---

## Method reminders

- The pillar is a **teaching** chat. The Level 2 method (`level2_method.md`) is about working through engineering categories — not the mode here. The teaching method is the one written in `curriculum.md` Part A, plus the constitution `conversation with swaraj.md`. Follow the teaching method, not the engineering-category method.
- `file_writing_instruction.md` governs knowledge-base writes. The pillar scaffolding (`curriculum.md`, `scratch.md`, and the learning-record folder `product design and engineering learning/`) were written with Swaraj's explicit permission; they are the exception, not the rule. Do not write into the knowledge base without explicit OK.
- The pillar does not produce design decisions yet. It produces understanding. When understanding is grounded against Product Vision and invariants, only then — with Swaraj's OK — do design directions land in a dedicated design document.
- At the end of each stint, update `scratch.md` if new correlations surfaced, and (with Swaraj's OK) keep `conversation with swaraj.md` in the founding set.

---

## Final pointers for the first unit

- Swaraj has books open side by side — use them, cite the page and figure for each lesson.
- The next lesson in Module 1 is **Krug — "don't make me think"** (users scan; the 3-second answer). Then the remaining Module 1 canon units in order. Each one unit per turn.
- At the end of every unit, Swaraj works with *learning* work: answer, predict, find, explain back. Never a Tend design decision.
