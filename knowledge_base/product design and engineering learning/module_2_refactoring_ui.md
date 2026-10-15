# Module 2 — Refactoring UI, the taste manual in code (learning record)

> First book, taught side by side, section by section, from the assistant's full reading. Swaraj keeps the printed book open; every lesson cites its pages and figures. Same contract: Tend the example, never the decision; correlations brought back in-message (logged in `scratch.md`). Source: Schoger & Wathan, *Refactoring UI*.

**The book in one breath:** decide what the thing is → make the important look important → give it room → set the words → choose the colors → stack the layers → add one garnish → keep practicing.

---

## §1 Starting from Scratch (pp.7–34) — decisions before pixels; pretty comes last

- **Start with a feature, not a layout (p.8):** designing "the app" (nav? sidebar? logo?) first is deciding with no information. One real functionality (flight search: cities, dates, button). "It worked for Google." = Level-1 thinking on a design timescale; shell-first is "don't jump to solutions" disease.
- **Detail comes later (p.12):** Sharpie-on-paper (a fat pen can't obsess); hold the color — grayscale forces spacing/contrast/size to carry hierarchy. Grayscale = Tufte signal-to-noise made mechanical.
- **Don't design too much (p.16):** cycles — simple version → make real → fix in the working thing → next. **Be a pessimist:** don't draw functionality you won't build (the attachments trap) — implying it = recruiting a lie = false signifier.
- **Choose a personality (p.20):** no deliberate character still *is* one ("nobody decided"). Signals: typeface, color feel (blue safe / gold expensive / pink fun), radius (round playful / square serious — mixing breaks H4), language (formal vs friendly). Never clone competitors ("second-rate version").
- **Limit your choices (p.28):** infinite options paralyze (12px or 13px?). Pre-pick systems — 8–10 greys, type scale, margin/shadow sets — then choose by elimination. Hick's Law turned on the *designer*. Feeds Module 7 tokens.

## §2 Hierarchy is Everything (pp.35–63) — make the important look important, mostly by making the rest look less

- Not all elements are equal (p.36): deliberate difference, or everything is noise.
- Size isn't everything (p.38): weight + color beat size; 2 weights, 2–3 colors.
- Grey only on white (p.42): on color, go *toward* the background.
- **Emphasize by de-emphasizing (p.46):** the master move — soften the competition, don't shout louder. (The queued thread from the pillar's first sessions; closes the Tufte ↔ UP-p.182 ↔ Highlighting ↔ exception-view cluster.)
- Labels last resort (p.48): format/context tells (email, phone, price) — recognition, zero reading (H6).
- Semantic tags ≠ style (p.54); balance weight/contrast (p.56); **semantics secondary (p.60):** one primary (solid), secondaries (outline), tertiaries (link-like); destructive goes severe *at the confirmation step* — wall only at the heavy door (H3/H5; the commit-point thread).

## §3 Layout and Spacing (pp.65–99) — room is not empty; space tells the eye what belongs together (Gestalt Proximity, UP p.160, as practice)

- Whitespace: remove, don't add (p.66): start with too much, take away till happy. Dense = deliberate dashboard decision, never default. (Rams restraint, as method.)
- Spacing/sizing system (p.70): 16px base, adjacent values ≥~25% apart (12→16 is 33%, 500→520 is 4%).
- Don't fill the screen (p.76): 600px if 600px is right; design the ~400px mobile layout first.
- Grids are overrated (p.84): decision-simplifier, not religion — fixed widths where content needs them; max-width + shrink-only-when-needed.
- Relative sizing doesn't scale (p.92): large shrinks *faster* than small; gaps close on small screens.
- Avoid ambiguous spacing (p.96): **more space around the group than within it** — equal gaps collapse the group. Tend instance: the state chip glued to its situation by the spacing, not by luck.

---


## §4 Designing Text (pp.101–135) — most of a screen *is* words; scannable words = usable screen (H6 + Krug on words; UP "Legibility" pp.124–125)

- One type scale, pre-picked; px/rem only — em nesting silently breaks the system (pp.102–107).
- Good fonts (p.108): neutral sans is fine; fast filter — ignore typefaces with <5 weights; wisdom of the crowd + steal from people who care (= taste's exposure half, one module early).
- Line length 45–75 chars (p.114); baseline-not-center (p.118 — ride the machinery); line-height proportional to length+size (p.122); align for reading — left for English, right-align numbers (decimals lined up = Tufte comparison one notch down, p.130); letter-spacing at edges only (p.132).

## §5 Working with Color (pp.137–169) — a system, never the only carrier ("support what the design already says," p.166)

- HSL over hex (p.138): hue/saturation/lightness is the eye's language (H2, aimed at the designer's own tool).
- More colors than you think (p.142): greys 8–10 · primary 1–2 × 5–10 shades · accents for meaning (red confirm / yellow warn / green positive) — up to ~10 colors × 5–10 shades. (Book side CONFIRMS the "small palettes are fictional" thread; repo side queued for the clones.)
- Shades up front (p.148): base (button-worthy) → edges by use → fill; eyes over math; protect the scale. Fourth application of the system-mindset (→ Module 7 tokens).
- Saturation at extremes (p.152); hue-rotation ≤20–30° for brightness (p.155); temperature-consistent greys (p.158 — cool blue / warm yellow; believability = consistency).
- Accessible≠ugly (p.162): 4.5:1 / 3:1 — flip contrast (dark-on-light-tint); rotate hue for colored-on-colored.
- **State words survive greyscale:** word carries (waiting/blocked/active/resolved), color supports — the Level 2 state-language spec in one rule. Red spent at the confirm door only (→ commit-point).

## §6 Creating Depth (pp.171–218) — the flat page still answers front-vs-back (figure-ground UP pp.80–81; top-down light UP p.196)

- Light from above (p.172): light edge top, shadow below — invisible unless broken.
- Shadows = elevation system (p.180): five shadows like five type sizes — "think z-position, not shadow"; modal = biggest shadow = captures ALL attention (the confirm door's visibility half); two-part shadows (p.186).
- Flat-but-deep (p.190): lighter=closer (same brightness law as p.153, as elevation).
- Overlap (p.194): cheapest depth cue; guard image edges with invisible gaps.
- Images (pp.199–218): bad photos ruin good designs (p.200); text must *win* vs the image — overlay / lower-contrast / colorize / glow-shadow (p.202 — "the problem is the image, not the text," same fight as grey-on-colour); intended sizes — redraw tiny, frame small, crop/partial/simplify screenshots (p.208); contain uploads — fixed containers + inner shadow, never clashing borders (p.214). Tend instance: logos/receipts/photos the world uploads.

## §7 Finishing Touches (pp.219–247) — garnish last; never outranks the meal (Rams 8 + 10 agree; the cake question's final answer)

- Supercharge defaults (p.220): bullets→icons, promoted quotes, brand-color checkbox states — more care on the stuff, not more stuff.
- Accent borders (p.224): one colored rectangle — severity at the edge, words stay quiet (Highlighting p.108).
- Backgrounds (p.228–233): gradients ≤30° apart, low-contrast patterns, single corner shapes — "turn it DOWN till content wins."
- Empty states first, not last (p.234): image + sentence + the one filling action; HIDE dead chrome (tabs/filters that do nothing = false signifiers). First contact installs the model (Advance Organizer pp.52–53). Tend instance: empty Tend teaches where you are + one real action, no pretending filters.
- Fewer borders (p.238): shadow / background-shift / space — the wall without the wall.
- Think outside the box (p.242): one component rebuilt toward its own hierarchy (selectable cards > radio stacks) — courage budgeted, one component. (Bridge to §8.)

## §8 Leveling Up (pp.249–252) — the education continues without the book

- The p.20↔p.249 spine confirmed: choose-don't-default at the start, collect-surprises at the end — one thought, seven sections.
- "Decisions you wouldn't have made" (p.250) = taste's exposure half; "rebuild favorites" (p.252) = production closes the Gap — Modules 5 and 6's engines, named one page early.

---

## Status

Module 2 **complete** — all eight sections taught side by side. Next: Module 4 (Module 3, Universal Principles, stays the mined-on-demand spine). End-of-unit learning work from these sections still open in conversation.
