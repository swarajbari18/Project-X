# Scratch — the assistant's correlation notepad

> Private working notebook for the assistant. Records the correlation threads between books, repos, modules, and knowledge-base categories as they are discovered, so the threads survive across chats and Swaraj never has to hold a cross-reference in his head. Plain words, one thread per entry, dated. Empty of essays. The curriculum lives in `curriculum.md`; this file feeds the teaching, it is not taught.

## 2026-09-05 — threads carried in from the first sessions

- **Norman's five failures ↔ Universal Principles:** every one of the five canon layers maps to a named entry in Universal Principles — Signifier/Affordance↔"Affordance" p.20; Mapping↔"Mapping" p.128; Feedback↔"Feedback Loop" p.76; Constraint↔"Constraint" p.50; Conceptual model↔"Mental Model" p.130. Universal Principles is the pre-built cross-reference graph for Module 1. (See also "Visibility" p.202 → Norman's Design of Everyday Things, cited in the book itself.)
- **False signifier ↔ anti-slop blacklist:** slop = decoration that advertises interactivity/significance then delivers neither → corrupts the user's conceptual model → trust cascade. The blacklist (item 9) is not taste; it is signifier honesty.
- **Refactoring UI p.20 "Choose a personality" ↔ p.249 "Leveling Up":** the same thought at both ends of the book — a design with a deliberate character beats a pile of correct defaults. Likely a book-wide spine; verify while reading.
- **Refactoring UI p.46 "Emphasize by de-emphasizing" ↔ Tufte signal-to-noise ↔ Universal Principles "Signal-to-Noise Ratio" p.182 ↔ "Highlighting" p.108:** exception-based owner view is the Tend instance of this cluster.
- **Refactoring UI "You need more colors than you think" p.143 ↔ design-token systems (shadcn tokens, Linear):** small palettes are fictional; real UIs need full value ranges per hue. Bourne out by repo studies when we clone them.
- **Universal Principles categorical contents:** the five question columns (influence perception / help learn / enhance usability / increase appeal / make better decisions) are a second door into the book, and map roughly onto our modules (perceive→Module 4, learn→Module 1, usability→Module 1/2, appeal→Module 4, decide→Module 8).
- **Kathy Sierra "Badass" (users as experts) ↔ Tend onboarding (item 7):** the outcome of good onboarding is a business owner who is *better at running their business* because Tend exists — the product makes the user awesome, not just happy. Thread to revisit in Module 5 and 8.
- **Ira Glass "the Gap" ↔ the teaching contract:** the whole pillar rides on production volume closing the gap; the curriculum's exercise format (10 screens, articulate why) is the production loop for taste.

## 2026-09-13 — Module 2 opens: Refactoring UI §1 "Starting from Scratch" (pp.7–34)

- **p.8 "Start with a feature, not a layout" ↔ "don't jump to solutions" (the constitution):** deciding the shell (nav, sidebar, logo, container) before a single feature is designed = asking a question you don't have the answer to — the same disease as proposing architecture before Level 1. Feature-first is Level 1 thinking on a design timescale.
- **p.12 grayscale-first / Sharpie trick ↔ Tufte ↔ UP Signal-to-Noise p.182 ↔ Rams restraint:** banning color is a *method* that forces hierarchy via spacing/contrast/size — the "arrange, don't decorate" lesson made mechanical. Colour later is enhancement, not decoration.
- **p.16 "Be a pessimist" (the attachments example) ↔ false-signifier honesty ↔ H8:** implying functionality you're not ready to build advertises an action that doesn't exist — recruiting a lie into the design. Smallest-shippable version = never owe a promise the interface can't keep. (Also: the engineering study's staged frontier-first thread.)
- **p.20 "Choose a personality" ↔ Norman's visceral level (taught just before) ↔ UP Aesthetic-Usability p.18 ↔ H4 consistency:** a design with no deliberate character still has one — "nobody decided." Mixing square + rounded corners = instant H4 break. Confirms the existing p.20 ↔ p.249 spine.
- **p.28 "Limit your choices" ↔ Hick's Law p.102, turned on the designer:** the person designing also satisces and freezes under infinite choices — systems (type scale, colour set, shadow set) shrink the *designer's* choice count. Feeds Module 7 design tokens.
- Module 2 = the delivery answer to "how do I make it pretty": structure → scope → personality → limits FIRST; pixels and pretty LAST.

---
## 2026-09-13 — Module 2, Section 2 "Hierarchy is Everything" (pp.35–63)

- **p.46 "Emphasize by de-emphasizing" — the queued thread pays out:** the master move — when the main thing won't stand out, soften the competition instead of shouting louder. Full cluster now closed: RUI p.46 ↔ Tufte signal-to-noise ↔ UP "Signal-to-Noise Ratio" p.182 ↔ UP "Highlighting" p.108 ↔ exception-based owner view (the Tend instance).
- **Hierarchy = one mechanism, four canon names:** it IS H8 (every element earns its place), Krug (the scanner's first plausible grab lands where hierarchy points), Hick (the important thing made obvious = one meaningful option), Tufte (arrangement does the seeing). The same law under four flags.
- **p.36 "Not all elements are equal" ↔ the exception view:** forty quiet situations must look quiet so the one that needs the owner looks like it does.
- **p.48 "Labels are a last resort" ↔ H6 recognition over recall:** format (email, phone, price) or context tells — recognition beats a label, because a label is reading.
- **p.60 "Semantics are secondary" ↔ the commit-point thread:** a destructive action is styled by its place in the importance pyramid; the confirmation step is where it becomes the primary action — the wall only at the heavy door (H3/H5 echo).

---
## 2026-09-13 — Module 2, Section 3 "Layout and Spacing" (pp.65–99)

- **The whole section IS the Gestalt "Proximity" law (UP p.160) made mechanical:** the eye groups by nearness; spacing is the designer's handle on that grouping. Section 3 = the perceiver's-machinery lesson installed as a layout practice. Space is not empty — space *arranges* (Tufte's "arrangement does the seeing").
- **p.66 "White space should be removed, not added" ↔ Rams restraint-as-method ↔ "decision, not a default":** start with too much room, remove until happy — the discipline runs the same direction as Rams' "less but better." Dense UIs allowed when they're a deliberate choice (dashboard density), never when they're a default.
- **p.70 "spacing and sizing system" ↔ Section 1 "Limit your choices" (pp.28-34) ↔ Module 7 tokens:** the scale (base 16px, adjacent values ≥~25% apart) is the earlier choice-limit applied to layout. Same Hick's-application: shrink the designer's decision space.
- **p.84 "Grids are overrated" ↔ means-not-ends:** a grid is a decision-simplifier, not a religion; fixed widths beat fluid where content needs it; max-width + shrink-only-when-needed. The grid serves the component, not the reverse.
- **p.96 "Avoid ambiguous spacing" ↔ the exact failure the grouping law predicts:** when there's no border, equal margins collapse the group — "more space around the group than within it" is the hard rule. The Tend instance: the state chip glued to its situation by the spacing, not by luck.

---
## 2026-09-13 — Module 2, Section 4 "Designing Text" (pp.101–135)

- **The whole section = text made scannable ↔ Krug's scanning + UP "Legibility" pp.124-125 and "Readability" p.162:** every type setting (size, line length, line-height, alignment, case) is a scanning tool. H6 recognition and Krug's 3-second answer, installed on words instead of widgets.
- **Type scale (p.102) ↔ Section 1 "Limit your choices" + Section 3 spacing systems + Module 7 tokens:** same mechanism, third application — pre-pick the set, use px/rem only (em nesting silently breaks the system).
- **"Trust the typeface designer" ↔ "grids are overrated" ↔ means-not-ends:** leave the craftholder's decisions alone (letter-spacing, weights); adjust only at the edges (tighten headlines, space all-caps).
- **p.130 right-align numbers ↔ Tufte's comparison principle:** alignment makes comparison free — small multiples' insight, one notch down.
- **p.118 baseline-not-center ↔ the perceiver's machinery:** use the alignment reference the eye already perceives; don't fight the eye.
- **"Wisdom of the crowd" + "steal from people who care" (p.108-112) ↔ taste-as-mechanism (Module 5):** taste starts by borrowing vetted choices (popular fonts, inspected sites), then forms its own.

---
## 2026-09-13 — Module 2, Section 5 "Working with Color" (pp.137–169)

- **A T.B.D. thread from the first sessions pays out:** "You need more colors than you think" (p.142)—greys (8–10 shades), primary (5–10 shades), accents (semantic: red confirm, yellow warning, green positive); up to 10 colors × 5–10 shades. The book side of the "small palettes are fictional" thread is now CONFIRMED; the repo side (shadcn tokens, Linear) stays queued for when we clone them. Full value ranges per hue = real.
- **"Define your shades up front" (p.148) ↔ Section 1 "Limit your choices" + Section 3 spacing scale + Section 4 type scale:** the same system-mindset a fourth time — no `lighten()`/`darken()` on the fly, pre-pick the scale, trust eyes over math. All four feed Module 7 tokens.
- **"Don't rely on color alone" (p.166) ↔ H2 speak-the-user's-language ↔ the state words (waiting/blocked/active/resolved) ↔ honest endings:** a red chip with no word is machine-speak; the WORD carries the state, color only supports. State language survives greyscale. (UP "Color" p.38; "Accessibility" pp.14–15.)
- **Red earned only at the confirm door (p.146) ↔ Section 2 "semantics are secondary" (p.60) ↔ the commit-point rule:** destructive red is spent at the irreversible gate, not everywhere — colors follow the hierarchy, hierarchy follows the decision point.
- **HSL (p.138) ↔ H2 machinery for the designer:** hex is machine-speak; HSL (hue/saturation/lightness) is how the eye actually perceives — same "speak the perceiver's language" law, aimed at the designer's own tool.

---
## 2026-09-13 — Module 2, Section 6 "Creating Depth" (pp.171–218, incl. "Working with Images")

- **Depth = figure-ground (UP pp.80–81) made mechanical ↔ UP "Top-Down Lighting Bias" p.196:** the eye splits the world into front/back and expects light from above; shadows, overlap, and elevation are the levers on that machinery. Third dimension of hierarchy.
- **p.172 light-from-above ↔ invisible-unless-broken rules (baselines p.118):** conventions the machinery already knows; they only ever get noticed when violated. Ride the machinery, don't fight it.
- **p.180 elevation system ↔ "systematize everything" (Section 1) + Module 7 tokens:** five shadows like five type sizes — "don't think about the shadow, think about the z-position" = semantic first, mechanics second.
- **p.181 modal = biggest shadow ↔ the commit-point confirm door (H3/H5):** the irreversible-gate confirmation must capture ALL attention — elevation is the visibility half of "wall only at the heavy door."
- **p.190 flat-but-deep ↔ weight-contrast hierarchy (p.56) + perceived-brightness color (p.153):** lighter=closer, darker=farther — same brightness law, now as elevation. Text-on-image contrast ↔ p.42 grey-on-colour: text must win the contrast war against what sits behind it — "the problem is the image, not the text."
- **"Everything has an intended size" (p.208) ↔ form honesty (Rams thoroughness) ↔ anti-slop:** blurry/mushy advertises detail it can't deliver; control the compromises yourself (redraw at size, simplify, go partial).
- **"Beware user-uploaded content" (p.214) ↔ Norman's constraint + H5:** what you can't control, you contain — fixed containers + inner shadow that never clashes. The Tend instance: logos, receipts, photos the world uploads.

---
## 2026-09-13 — Module 2, Section 7 "Finishing Touches" (pp.219–247)

- **The whole section = the cake question's final answer:** decoration LAST, only after structure works — every garnish cheap, small, and supporting. Pretty is the end of the chain (feature → low-fi → shippable → personality → systems → hierarchy/space/type/color/depth → garnish). Rams' restraint-first + rule 8 (thorough to the last detail) finally agree.
- **"Supercharge the defaults" (p.220) ↔ Rams rule 8 (thorough) ↔ H8:** enliven what already exists (bullets→icons, testimonials promoted, custom checkbox states in brand color) instead of adding new elements. Thoroughness is not more stuff; it's more care on the stuff.
- **Accent borders (p.224) ↔ UP "Highlighting" pp.108-109:** the cheapest highlight — one colored rectangle on a card/nav/alert/headline. Severity speaks at the edge so the words can stay quiet.
- **Backgrounds (p.228-233) ↔ Signal-to-Noise:** gradient (≤30° apart, low contrast), patterns (low contrast), single shapes — every rule of the section is "turn it DOWN until content wins."
- **Empty states (p.234) ↔ UP "Advance Organizer" pp.52-53 (H10's twin) ↔ honest endings:** the empty state is often the *first* meeting; image + call-to-action; HIDE dead chrome (tabs/filters that do nothing = false signifiers). First contact installs the conceptual model honestly or not at all.
- **Fewer borders (p.238) ↔ separate-without-lines (p.56 weight-contrast, p.96 spacing):** shadows, background shifts, extra space — the wall without the wall. Borders-everywhere = the nesting-hell's lazy default.
- **"Think outside the box" (p.242) ↔ Leveling Up (p.249 lead-in):** dropdowns/tables/radio-stacks are inventory from elsewhere; modify toward the component's own hierarchy. Courage budgeted against the systems.

---
## 2026-09-13 — Module 2, Section 8 "Leveling Up" (pp.249–252) — the book CLOSES

- **The p.20 ↔ p.249 spine is confirmed.** "Choose a personality" (first section) and "Leveling Up" (last section) are the same thought at both ends: the whole book is about escaping "a pile of correct defaults" — first by deciding who the thing is, last by training the eye to keep finding decisions the designer wouldn't have made.
- **"Look for decisions you wouldn't have made" (p.250) ↔ taste-as-mechanism (Module 5):** the practice loop for taste itself — collect surprises (inverted datepicker, button inside the input, two headline colors), not rules. Exposure + articulation = the taste engine, one page early.
- **"Rebuild your favorite interfaces" (p.252) ↔ the Gap (Ira Glass) ↔ Module 6 (ideation loop):** discovery-by-production — the gap between your version and the original is where the tricks live ("reduce your line height for headings," "letter-spacing on uppercase"). Production closes the gap, not reading.
- **Module 2 COMPLETE.** All eight sections taught side by side. Handoff chain ends cleanly here: order-of-decisions → hierarchy → space → type → color → depth → garnish → practice.

---
## 2026-09-13 — Module 4 "Why minimal reads as premium" (the feel-mechanics)

- **Processing fluency = the engine:** things cheap to parse feel good, true, high-quality. Premium is not in the pixels — it is in how little work the pixels cost the eye. The pretty-form-vs-Win95-form puzzle: the pretty form does the parsing *for* the eye (hierarchy/grouping/contrast working), so it feels better before it does anything.
- **Consistency-as-one-author (UP "Consistency" p.46 ↔ H4):** everything agreeing (corners, weights, greys, words) reads as one careful hand; disagreement reads as many hands, nobody in charge. Must survive 500 screens → needs systems (Module 7 preview), not memory.
- **Attractiveness Bias (UP p.26) + Aesthetic-Usability (UP p.18), the halo family:** beautiful is assumed well-built — the trust tax paid at the first glance (emotional-design visceral).
- **Classical Conditioning (UP p.32) + Exposure Effect (UP p.70):** calm surface + good outcomes, repeated, pairs the cue with the competence. Onboarding (Module 8 item 7) will install the pairing; every later calm glance cashes it.
- **Restraint-as-confidence ↔ Rams rule 5 (quiet):** expensive things whisper, toys scream. Quiet = "we don't need to grab you"; shouting = desperation. Restraint is the *costliest* property to hold at scale — subtracting across 500 screens is harder than adding.
- **The calm-vs-cute ruling (Swaraj's exact question):** cuteness = personality shouting by default; premium = personality resting, speaking on invitation (the X-hover rule again). Motion: working motion (feedback, Section 6, H1) reads as polish; unemployed motion reads as decoration → slop. Motion-with-purpose (Kowalski) = motion that earns, timed once.
- Module 4 = the cake question's FEELING half (structure half closed at Section 7). Together: right structure + cheap processing + one voice + resting calm = reads premium.

---
## 2026-09-13 — Module 5 "Taste as a mechanism"

- **The Gap (Ira Glass):** taste runs ahead of skill — beginners already know good from bad; the work just doesn't match yet. Production volume closes it. Reading never closes it.
- **Taste = discrimination + reason:** discrimination (the fast good/bad/slop call) trained by curated exposure; reason (saying WHY, in mechanics words) trained by articulation. Exposure + articulation + production = the whole engine.
- **Leveling Up p.250 "decisions you wouldn't have made" = the exposure half, named one module early.** p.252 "rebuild favorites" = the production half. The book ended exactly where taste begins.
- **van Schneider hedge:** private references + making, not the feed. The feed trains whatever eye it wants; a private collection trains yours. Taste needs a protected diet.
- **Two styles, don't conflate (clarity/shipping vs auteur):** Levels/Lou vs van Schneider/Semplice — both taste, different personalities (p.20 echo). Judging one by the other's rules is the category error. Tend's personality choice (Module 8) picks from this menu deliberately.
- **The blacklist (item 9) = discrimination written down; tokens (Module 7) = taste made durable; the 10-screens exercise = articulation practice.** Taste leaves the head and enters the artifacts three ways.

---
## 2026-09-13 — Module 6 "The design ideation loop" (how the work gets done)

- **The loop = make → show → learn → change, and volume wins:** quality per draft is nearly fixed; what moves is drafts per week. The Gap's fuel half, installed as process. (Feeds handoff item 8 — this pillar's own output gets produced this way.)
- **Prototype cheap early ↔ RUI Section 1 "detail later / don't design too much":** paper → wire → clickable → code is a cost ladder; climb it only when the cheaper rung stops answering. Sharpie-trick and grayscale-trick are the loop's first two rungs.
- **Design-in-code = high fidelity for a solo builder:** the medium you ship in skips translation loss; the artifact in the browser IS the mock. Tend ships as code — so the loop's top rung is home ground.
- **Critique ritual (present → question → discuss → decide) ↔ discrimination-vs-reason split (Module 5):** presentation feeds the flash, questions feed the why, the decision is written — "I like it" is banned until it becomes "it works because." Reason happens in the room, discrimination happens alone.
- **AI review as first-pass lint ↔ the whole canon as a checklist:** hierarchy/contrast/labels/color-alone/spacing are *mechanically checkable* — the machine holds the rails, the human holds the judgment. Tend's design-review skills will be this, one module later (item 8).
- **5-user think-aloud (Krug's method) ↔ JTBD interviews:** watch a stranger narrate their thoughts for 20 minutes — the scan, the satisfice, the muddle happen live in front of you. Three to five strangers beat zero; the canon predicts, testing confirms (or embarrasses).
- **Proxies for feeling ↔ the 3-second test, squint test, greyscale test:** when scale-testing is impossible, the canon itself is the instrument — blur the screen (hierarchy?), drain the color (color-alone?), time the glance (billboard?). Every unit's work assignment was a proxy rehearsal.

---
## 2026-09-14 — Dual-surface model (Swaraj's ruling): the LLM is a user too

- **Design governs TWO surfaces with the same fundamentals:** the human UI (owner/employee/customer screens) AND the machine surface (tool schemas, memory projections, artifact shapes, validation gates, stage text, traces). Laws are perceiver-agnostic: signal-to-noise, signifier honesty, consistency, feedback, constraint, exits.
- **The bounded-artifact-recognition pattern:** H6 for the model — project (show) bounded context the model points at; never tax it with recall of what the harness can hold. Validators + typed versioned claims = deterministic backstops where the model's residue tax hits zero.
- **Tool names = signifiers on doors for the model;** gates must emit what/why/how-to-recover (H9's three ingredients); commit points = the model's emergency exits (H3) — cancel in the gap, honest declare after.
- **Model-facing text is also a screen:** stage constitution + runtime preferences + assembly templates must obey omission-of-needless-words (Krug's third law), hierarchy, no internal vocabulary (H2). Discipline lives in `prompt_constitution/`; deterministic rules never enter text.
- **Runnability:** the loop is now a SKILL file — `skills/product-design-loop/SKILL.md` (TEACH/PLAN modes, two surfaces, startup order, checklist-first critique, proxies for both sides). Feeds handoff item 8 (the pillar's own output method) and grounds Modules 7–8 dual-surface.
- **Noted this session:** fake "confirmations" from the model = forced confirm behavior — theater, costs nothing to lie through. Exit control lives in deterministic guards + honest acknowledge ("say no to stop me"), never in the promise.
- **Every state word we keep (waiting/blocked/active/resolved) must survive both surfaces:** word carries meaning for humans; same words are gate/enforcement values for the machine. One vocabulary, two perceivers.

---
## 2026-09-14 — Module 7 "A design language for Tend" (the synthesis)

- **Tokens = every scale the pillar has pre-picked, in one place:** type scale (px/rem, §4) · spacing/sizing scale (16px base, ≥25% apart, §3) · shade palettes (8–10 greys, 5–10 primaries, accents for meaning, §5) · five-shadow elevation (z-positions, §6) · letter-spacing at edges (§4) · temperature rule (§5). The system-mindset's fifth and final application — Modules 1–6 feed one artifact.
- **Hierarchy first, then tokens (Tend example):** story every surface tells from the owner's side: Blocked (needs decision, highest weight) → Changed (new facts, second) → Waiting (owed-a-reply, third) → Quiet (nothing needed, floor). One visual language across all four — elevation + weight + tint + motion-once say *which*, never different dialects per page.
- **State tokens (Tend example):** four words, one meaning each — WAITING (reply owed) / ACTIVE (work moving) / BLOCKED (decision owed by the owner) / RESOLVED (honest ending: answered/deferred/escalated/declared-unanswerable). Word carries, color supports (greyscale-survives by construction). Machine side: same four are gate/enforcement values (per 2026-09-14 dual-surface rule — one vocabulary, two perceivers).
- **Motion tokens (Tend example):** arrive (feedback lands, once) · state-change (transition narrates, once) · escalate (modal lifts to top, once) · breathing (waiting quietly pulses? — OPEN). Everything timed once, earning paid, silence after.
- **The Level 2 borrow (Tend example only):** Communication's per-viewer-depth minimum-sufficient rule, Explainability's honest endings (answered/deferred/escalated/declared), Business View's which_events_should_require_the_owners_attention + exception-first reading — tokens give each a visible form without deciding the forms today.
- **Tightest link in the pillar:** exceptions don't complain, don't narrate, don't decorate — they POINT (highlight-at-edge, §7 RUI; UP Highlighting p.108). The exception view is every unit in one screen.
- **Dated open threads for Module 8:** waiting-quietly motion? · per-role token dialects or one voice? · personality choice (clarity vs auteur) deliberately pending. All three reserved for Module 8 grounding with Swaraj — nothing decided here.

---
## T.B.D. — threads to open when the material arrives

- (open) Refactoring UI's full section map vs the anti-slop vocabulary: which blacklisted patterns are "defaults accepted without a decision" (e.g., Inter-everywhere, cardocalypse).
- (open) Which Universal Principles entries should become Tend's state-language spec (waiting, blocked, active, resolved) — candidates: Color p.38, Constancy p.48, Consistency p.46, Figure-Ground p.80, Proximity p.160.
- (open) Linear/GitHub notification discipline ↔ Universal Principles "Feedback Loop" + Hick's law — the push/pull item (handoff item 4).
- (open) Repos to mine once cloned (dub, cal.com, tremor, openstatus, sonner, vaul): document *why* they feel finished and derive the moves back to Module 2 rules.

## 2026-09-06 — Module 1, heuristic #3 (user control and freedom)

- **Heuristic #3 ↔ Universal Principles "Errors" pp.66–67 + "Forgiveness" pp.88–89:** the Errors entry splits slips (right intention, wrong execution) from mistakes (wrong intention) — different remedies; the Forgiveness entry's five strategies (affordances, reversibility of actions, safety nets, confirmation, warnings, help) are Nielsen's "emergency exit + undo/redo" unpacked. The Photoshop History palette figure (p.88) is the archetype of an exit: every action recorded, reversible.
- **The commit-point rule (for Module 8):** an acting system has no universal back button; "user control and freedom" must be placed at the point of no return. The engineering study's propose → authorize → execute is exactly that boundary. Exits live in the gap between decided and done: re-home (before), cancel (in the gap), reopen/reclaim/report-irreversible (after).
- **Exit vs confirmation wall:** confirmations before every action teach deafness (habituation — Errors p.66's "do you want to save changes?" figure); exits after the action make repair cheap. Walls only at truly irreversible gates; exits everywhere else.
- **Fake undo = false signifier:** an "undo available" affordance that cannot actually recall the world (channel can't unsend) advertises an exit it can't deliver — extends the slop ↔ signifier-honesty thread (item 9).
- **Tend instance:** reopen lifecycle (Understanding the Situation) worn as undo on the artifact surface; re-homing a misplaced chat instruction = the before-the-gap exit; the honest acknowledgment doubles as the exit ("say no to stop me") — feedback and exit, same artifact, two jobs.
## 2026-09-06 — teaching correction [HIGH ATTENTION]

- **Tend is the example, not the decision target.** While we learn Module 1–7, Tend only exists to ground a concept in something concrete. No product-design judgments asked of Swaraj. Design decisions are Module 8 work and need every aspect of the product first (e.g., A/B/C "should Tend confirm before sending?" is unanswerable at this level — the business configurator may already pre-authorize sends).
- **End-of-unit work = learning work** (predict, find in the wild, explain back, spot the concept), never a design decision for Tend. Swaraj is the student; the assistant is the teacher who carries the reasoning.
- **Pace:** assume Swaraj knows nothing; establish concepts from first principles, one at a time, plain words, then build on top. No abstraction, no untaught concepts, no "system instructions" above this conversation.