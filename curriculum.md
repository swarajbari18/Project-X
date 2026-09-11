# Curriculum — Product Design & User Interaction (pillar teaching plan)

> This file is the **teaching constitution** for the product-design pillar. It says *how we teach* (methodology), *what we teach* (curriculum), and *in what order*. It does not carry the lesson content — the lessons live in the conversation. The correlation threads accumulate in `scratch.md`, which the assistant uses as its working notepad. This file is a working document and evolves as lessons teach us how to teach.
>
> Companion files: `conversation with swaraj.md` (the constitution that governs how we talk — this plan is a bolt-on, never a replacement), `handoff_product_design_and_user_interaction.md` (the pillar's nine items), `Things to look at/refactoring_ui_book.md` and `Things to look at/universal_principles_of_design_book.md` (book sources, converted).

---

## Part A — The methodology (how we teach)

### A1. The contract

Swaraj does not read books. The assistant does. The assistant reads the whole book, holds the entire graph in its head — a concept on page 200 that echoes a concept on page 30, a principle that reappears in another book, a move that shows up in a repo we studied — and teaches from that complete picture as if **we are inventing the field from scratch, against Tend's actual problems**.

The writer's prose is raw material. The meat is the thought underneath. The assistant distills; Swaraj never consumes padding. If a 200-page book reduces to 50 pages of thought, the assistant teaches the 50 pages across slow turns — each turn one small unit.

### A2. The teaching rules (non-negotiable)

1. **One unit at a time.** Never a flood. Each turn teaches one small piece: the problem, why someone would invent this fix, how it lands on Tend. No "here is the whole canon" turns.
2. **First principles, not abstractions.** Every concept is taught from the problem that gives birth to it. If a sentence needs decoding, it is wrong. One sentence, one idea.
3. **The correlation map is the assistant's job.** Swaraj does not hold cross-references — he does not read 200 pages, he does not carry 50 lessons in his head. When a new concept echoes an earlier one, the assistant brings the echo back *in the same message*, plainly, and shows the connection. Correlations are logged in `scratch.md` so nothing survives on memory.
4. **Tend is the grounding example.** Every concept lands on our product. The theorist's toy examples are replaced by Tend situations: the owner at 9am, a customer waiting on an invoice, the blocked-decision queue. This is how theory becomes usable.
5. **Open the book side by side.** The books are visual. Every lesson cites page numbers and tells Swaraj which figure or diagram to look at in the physical book while the lesson runs. Swaraj reads the diagram; the assistant reads the thought behind it.
6. **Every turn ends with work for Swaraj.** A question, a prediction, a judgement on a screen. No passive consumption. The lesson is only done when Swaraj has reasoned, not just nodded.
7. **Slow and boring is the pace.** Understanding beats coverage. If a unit needs two turns, it gets two turns. The curriculum below is a map, not a sprint schedule.
8. **Nothing is written to the knowledge base without Swaraj's explicit OK** (constitution + `file_writing_instruction.md`). Exception: this file and `scratch.md`, which Swaraj explicitly asked for as the pillar's scaffolding.

### A3. The reading pipeline (for any future book)

1. Swaraj obtains the book (legitimate source; any gray-area copy is his explicit call, flagged once).
2. Assistant converts to markdown (`pdftotext -layout`, same as the engineering-study papers).
3. Assistant reads the **whole** book once. Builds the chapter map and the correlation map (concept↔concept, book↔book, book↔repo, book↔Level 2 category).
4. Assistant teaches in turns, front-to-back re-arranged into the order understanding needs — with page/diagram references so Swaraj follows along in the book.
5. Correlations accumulate in `scratch.md` as the notepad.

### A4. The pause-and-state rule

---

## Part B — The curriculum (what we teach, in order)

### Module 0 — Orientation (DONE)
Breadth research completed: four-discipline split (product / interaction / information / visual design), concept canon survey, taste mechanism, premium-feel mechanics, people + verified repos + filtered books, anti-slop vocabulary, signal map. Result lives in the conversation record of the first sessions.

### Module 1 — The concept canon (IN PROGRESS)
The five interaction failures, from the ground (memorized into the conversation record):
- 1. **Signifier / affordance** — the artifact must say what it can do.
- 2. **Mapping** — control must connect to its effect.
- 3. **Feedback** — every action must confirm itself.
- 4. **Constraint** — prevent, don't explain.
- 5. **Conceptual model** — the user's story must stay true.

Remaining canon units, each taught first-principles the same way:
- Nielsen's 10 usability heuristics — the five failures re-cut as a grading checklist.
- Krug ("don't make me think") — users scan; the 3-second answer.
- Tufte — more info is fine, badly arranged info is evil (our aggregation problem).
- Gestalt principles, Hick's law, Fitts's law, aesthetic-usability effect — the perceiver's machinery.
- Rams' 10 principles — the industrial-design spine of restraint.
- Emotional design (Norman) — the three planes of feeling; where "the user's feeling" is actually engineered.

### Module 2 — Refactoring UI (Schoger & Wathan) — the taste manual in code
**Source:** `Things to look at/refactoring_ui_book.md` (252pp) — Swaraj keeps the printed book open side by side.
**Section map (actual book pages):**
- Starting from Scratch p.7 — Start with a feature, not a layout; detail comes later; don't design too much; choose a personality; limit your choices.
- Hierarchy is Everything p.35 — Not all elements are equal; size isn't everything; no grey text on colored backgrounds; emphasize by *de*-emphasizing; labels are a last resort; separate visual from document hierarchy; balance weight and contrast; semantics are secondary.
- Layout and Spacing p.65 — Start with too much white space; a spacing/sizing system; don't fill the screen; grids are overrated; relative sizing doesn't scale; avoid ambiguous spacing.
- Designing Text p.101 — Type scale; good fonts; line length; baseline not center; proportional line-height; not every link needs a color; readability alignment; letter-spacing.
- Working with Color p.137 — You need more colors than you think; greys; accent colors; brightness via hue rotation; color temperature.
- Creating Depth p.171 — Emulate a light source; shadows as an elevation system; overlap for layers; consistent contrast; overlays; text shadows; intended size; background bleed.
- Finishing Touches p.219 — Borders vs shadows vs background color; extra spacing; simple shapes.
- Leveling Up p.249 — The whole thing as one process.
**Why first:** it's the taste manual that teaches *moves*, not vibes — directly the premium-feel and anti-slop mechanics, taught in code, our eventual language.
Every session ends with the current module, lesson, and open threads stated plainly in the reply (never "as we discussed"; the state is brought into the message). `scratch.md` carries the correlation state so a fresh chat resumes without Swaraj remembering anything.
### Module 3 — Universal Principles of Design (Lidwell, Holden, Butler) — the reference spine
**Source:** `Things to look at/universal_principles_of_design_book.md` — this copy is the 2003 first edition (~125 entries; the 2023 third edition adds more). Swaraj keeps it open as the encyclopedia.
**How we use it:** not read front-to-back. Mined **on demand** by Tend design problem — when a question appears (urgency cue? trust? error state? density?), we pull the principle cluster, get the named mechanism, and use the book's built-in "See also" cross-reference graph as a pre-made correlation map. Its alphabetical + five-question categorical contents (influence perception / help people learn / enhance usability / increase appeal / make better decisions) are the two doors into it.

### Module 4 — Why minimal reads as premium (the feel mechanics)
Built on Module 2 + 3, from the ground: processing fluency, consistency-as-one-author, motion-with-purpose (Emil Kowalski), restraint-as-confidence. Answers Swaraj's exact question: why does calm feel luxurious and animated-cute feel cheap.

### Module 5 — Taste as a mechanism (not a mystery)
- The Gap (Ira Glass): taste runs ahead of skill; production closes it.
- Taste = discrimination + reason: curated exposure, articulation, production.
- The van Schneider hedge: taste is protected by private reference + making, not the feed.
- Two taste styles that must not be conflated: clarity/shipping (Levels, Lou) vs auteur (van Schneider, Semplice).
- A taste-training exercise format: assistant feeds 10 screens (good / slop / ambiguous); Swaraj articulates why each works or fails; assistant holds the mechanics beside his judgements.

### Module 6 — The design ideation loop (how we actually do the work)
Rapid prototyping spectrum; design-in-code as high-fidelity mode for a solo builder; formal design critique (present → question → discuss → decide); AI design-review skills as first-pass critique; user research lean (interviews, JTBD, 5-user think-aloud); proxies for "feeling." Feeds handoff item 8 (meta: decides how this pillar's output gets produced).

**Update (2026-09-14, Swaraj's ruling): the loop runs on TWO surfaces.** Product design fundamentals bind the human UI *and* the model's interface to machine components (tools, memory, validators) — the LLM is treated as a perceiver: schemas/signifiers, projections over recall, gates with what/why/how-to-recover, commit-point exits, stage text that omits needless words. The machine-side loop runs the same rungs (walk scenario → fix artifact shape → encode validator → golden re-run → read traces); AI review covers both halves mechanically, judgment stays human. The runnable form is `skills/product-design-loop/SKILL.md` (TEACH/PLAN modes). Grounds Modules 7–8 dual-surface: every Module 8 item gets human-screen + model-interface treatment together; state words must survive both perceivers.

### Module 7 — A design language for Tend
Synthesis of Modules 2–5 into tokens: hierarchy, type scale, color semantics, spacing, elevation, motion, state language — grounded in the Level 2 categories (Communication's per-viewer depth, Explainability's honest endings, Business View's exception-not-narration).
### Module 8 — Tend's nine product-design items (the delivery)
Each grounded in the Level 2 category that already owns its content, per the handoff:
1. Artifact-first information architecture
2. Cross-situation views (aggregation / filter / search / triage)
3. Per-role surfaces (owner, employee, customer/prospect, partner)
4. Proactive vs pull — notification discipline
5. The situation/journey narrative view
6. Design language spec (result of Module 7)
7. Landing page, setup, onboarding — installs the conceptual model
8. The design ideation loop (result of Module 6)
9. The anti-"AI-slop" blacklist — every item a decision we made, not a default we accepted

### Module 9 — Same app, phone and desktop (web, one runtime)
Responsive thinking beyond resizing: what actually changes when the screen shrinks (density, thumb reach, glanceability, notification vs dashboard roles). Grounded in our specific constraint: one web app, browser runtime on both.

### Final — grounding, not decisions
Every learned idea gets grounded against the Product Vision, invariants, and knowledge base. Then — only with Swaraj's OK — design direction land in a dedicated design document.

---

## Part C — The correlation protocol (what `scratch.md` holds)

The assistant logs, continuously:
- concept↔concept (Norman's feedback ↔ Universal Principles "Feedback Loop" ↔ Tend's recently-changed view)
- book↔book (Refactoring UI's "emphasize by de-emphasizing" ↔ Tufte's signal-to-noise ↔ Universal Principles "Signal-to-Noise Ratio")
- book↔repo (Refactoring UI shadows ↔ Linear's depth system ↔ shadcn elevation tokens)
- book↔Level 2 category (Universal Principles "Mental Model" ↔ our conceptual-model decision ↔ Business View's artifact-first rule)
- chapter-echo (Refactoring UI p.20 "Choose a personality" ↔ p.249 "Leveling Up" — the same thought at both ends)
- any thread that will save Swaraj from holding a cross-reference in his head

Format: dated entries, one thread per entry, plain words, no essays.

---

## Current state (2026-09-08)
- Module 0: done. Module 1: five interaction layers + all ten heuristics taught in conversation; canon remaining units (Krug → Tufte → perceiver's machinery → Rams → emotional design) queued next, one at a time.
- Learning record written: `product design and engineering learning/module_1_the_concept_canon.md` (2026-09-08, Swaraj's OK) — the memory of everything taught so far, with the Universal Principles page references and the correlation map.
- Books converted and accessible. Refactoring UI queued as the first book, side-by-side, visual.
- Updates to this file require only a word from Swaraj.