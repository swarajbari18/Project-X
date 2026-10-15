# Module 1 — The Concept Canon (learning record)

> This is the first file of the **Product Design & Engineering learning** folder. It records everything the assistant has taught so far, in order, with the book references open beside it. It is a *learning record*, not a design document: Tend appears only as the concrete example a concept lands on — never as a decision target.
>
> **The teaching contract (three lines):** Tend is the example, not something we decide on while we learn. Swaraj is the student; the assistant is the teacher who carries the reasoning. One unit at a time, first principles, plain words, Tend grounded in every concept.
>
> **The two teaching sources:** Donald Norman's *The Design of Everyday Things* (the five interaction failures) and Jakob Nielsen's ten usability heuristics. The **reference spine** woven through both is *Universal Principles of Design* (Lidwell, Holden & Butler), the 2003 first edition — its A–Z entries are the pre-built cross-reference graph we mine on demand, always cited by page.

---

## Module 0 — Orientation (the breadth map, first sessions)

- The design field splits into four disciplines: **product** (what to build), **interaction** (what the user does), **information** (how meaning is laid out), **visual** (how it looks).
- **Taste is a mechanism, not a mystery** — it is discrimination + reason, trained by curated exposure and articulation, closed by production (the Gap: taste runs ahead of skill).
- The premium-feel mechanics and the anti-slop vocabulary were surveyed; the blacklist lives as Tend handoff item 9 (never a default, always a decision).
- People + verified repos + filtered books were shortlisted. Two books entered the study set: **Refactoring UI** (first to teach, Module 2) and **Universal Principles of Design** (the reference spine, mined on demand).

---

## Module 1, Part A — The five interaction failures (Norman)

The five mechanisms a designer controls. Each taught from the problem that gives birth to it.

### A1. Signifier / Affordance — the artifact must say what it can do

- **Problem:** an object can be capable of something and still not *say* so. If the surface is silent about what it can do, the user guesses — and guessing is where friction and mistakes begin.
- **Rule:** affordance is what the object physically allows; signifier is what *tells* the user it allows it. The signifier (a button-look, a label, a chevron) is what bridges the gap. A handle-shaped door *affords* pulling; the flat push-plate *signifies* pushing — the design is improved when the signifier matches the affordance (UP, **"Affordance" pp.20–21**).
- **Tend (example only):** an artifact that looks actionable — "resolve," "nudge," "assign" — must actually perform it. A chat bubble that advertises a reply where none is needed is a *false signifier*.

### A2. Mapping — the control must connect to its effect

- **Problem:** controls and their effects can be arranged so the connection is guesswork. The user must think, *which switch does which light?* — that thinking is a tax.
- **Rule:** the relationship between a control and what it changes should be natural, so the user doesn't have to hold an arbitrary rule in their head (UP, **"Mapping" p.128** — stimulus–response compatibility).
- **Tend (example only):** an action offered on an artifact should affect *that* artifact — "resolve this" resolves the situation it sits on, never a look-alike one.

### A3. Feedback — every action must confirm itself

- **Problem:** an action with no confirmation leaves the user uncertain: did it land? Should I click again? Uncertainty multiplies into rework and mistrust.
- **Rule:** every action must produce a visible change — ideally within ~0.1s, certainly within the second — so the user always knows the state (UP, **"Feedback Loop" p.76**).
- **Tend (example only):** an instruction typed into Tend's entry ("chase the Sharma invoice") is confirmed by the honest acknowledgment — which is itself the exit ("say *no* to stop me"). Feedback and exit, one artifact, two jobs.

### A4. Constraint — prevent, don't explain

- **Problem:** explaining a mistake only helps after the mistake. Every prevention that costs zero is better than every explanation that costs attention.
- **Rule:** make the wrong action *impossible* instead of letting it happen and then warning. Grey is not allowed; it cannot be clicked (UP, **"Constraint" p.50**).
- **Tend (example only):** Tend's deterministic gates are constraint inside the machine — an action that violates a business rule simply is not in a state where it can happen.

### A5. Conceptual model — the user's story must stay true

- **Problem:** every user runs a private story of how the machine works. When the machine contradicts the story, the user either rebuilds the story (costly) or calls the machine broken (fatal).
- **Rule:** design so the user's story *stays true* — the visible states, words, and behaviors must line up with the real mechanics underneath (UP, **"Mental Model" p.130**).
- **Tend (example only):** the owner's story is "waiting means a reply is owed; blocked means something needs me." The interface must render exactly that — never a state word that means something else in another screen.

---
## Module 1, Part B — The ten usability heuristics (Nielsen)

The five mechanisms, re-cut as a **grading checklist**: yes/no inspection questions an expert runs a screen through. Mechanism = physics; heuristic = inspection question.

### H1. Visibility of system status
- **Problem:** a system that hides what's happening forces the user to guess the state — and guesswork breeds rework and mistrust.
- **Rule:** the system must always tell the user what is going on, through appropriate feedback within reasonable time (UP, **"Feedback Loop" p.76**, **"Visibility" p.202**).
- **Tend (example only):** the owner's morning — every situation must visibly say *waiting / active / blocked / resolved*, plus what changed recently.

### H2. Match between system and the real world
- **Problem:** an interface that speaks machine-language forces the user to translate before they can think.
- **Rule:** speak the user's language — business words, not system words; ordering that follows the user's world, not the data model (UP, **"Mapping" p.128** — the natural mapping family).
- **Tend (example only):** "waiting for Sharma to reply," not "situation S-4932, state: awaiting."

### H3. User control and freedom — the emergency exit
- **Problem:** every user lands in a wrong state sometimes; a trapped design makes the mistake the end of the road.
- **Rule:** clearly marked "emergency exit" from any unwanted state + undo and redo. Nielsen's own words: leave "without having to go through an extended dialogue."
- **The commit-point rebuild for an acting system (Tend's real translation):** an agent has no universal back button — so the exit lives at the point of no return. Three moments: (1) **before** the gap — re-home a wrong placement; (2) **in the gap** (decided but not executed) — cancel, clearly marked; (3) **after** the gap — reopen / revert status / and where the world truly cannot be reversed, say so honestly.
- **Exit ≠ confirmation wall:** a wall before *every* action teaches deafness ("do you want to save changes?"); an exit after the action keeps repair cheap. Walls only at genuinely irreversible gates; exits everywhere else (UP, **"Errors" pp.66–67** — slips vs mistakes; **"Forgiveness" pp.88–89** — the five strategies and the Photoshop History palette figure).

### H4. Consistency and standards
- **Problem:** rules with exceptions cost a tax at every encounter — the pause of "is this the same thing?"
- **Rule:** the same thing must look and behave the same everywhere, and match what the world already agreed on (red = stop, an ✗ closes). UP, **"Consistency" p.46**, names four kinds: aesthetic, functional, internal, external — *internal* consistency is what makes a product feel "designed, not cobbled together"; *external* consistency pays off the user's existing knowledge. The book's own boundary: consistency is sameness *where the thing means the same* — not sameness for its own sake.
- **Tend (example only):** the state words (waiting / blocked / active / resolved) and honest-ending words (answered / deferred / escalated / unanswerable-declared) must look and mean the same on every screen.

### H5. Error prevention
- **Problem:** every error is a bill — time to notice it, time to fix it, and sometimes a real-world cost nothing can undo. Errors also cannot always be cured.
- **Rule:** prevent the error from being *possible*. Three tools: **remove** the error-prone thing; **constrain** so the wrong thing is impossible (constraint — the old friend from A4, "prevent, don't explain"); **confirm** at the door — but only at heavy doors (UP, **"Confirmation" p.44**: confirmations stop *slips*, slow task performance, must be reserved for critical/irreversible operations, and "people will learn to ignore them" if overused).
- **Tend (example only):** an owner cannot accidentally trigger an action that violates a business rule — the system's state simply doesn't allow it. Tend errs by construction, not by explanation.

### H6. Recognition rather than recall
- **Problem:** the user's head is finite. Every item the product makes the user *recall* (produce from memory) is a tax; a mind stuffed with memorized rules is where mistakes live.
- **Rule:** don't make the user hold anything the product can hold and show. Recognition ("yes, I've seen this — I pick from what's in front of me") always beats recall ("dig it out of my head, whole"). UP, **"Recognition Over Recall" pp.164–165**, with the history figure: early computers required recalling hundreds of command words; the graphical interface showed them in menus — that one change "leveraged the human capacity for recognition over recall" and is why ordinary humans could use computers.
- **Tend (example only):** the artifact view *is* this test — the owner sees the active situations and points, instead of remembering "what's the Sharma thing doing?" in a chat. The visible yellow "waiting" chip is recognition; remembering which situations wait is recall.

### H7. Flexibility and efficiency of use
- **Problem:** the newcomer and the expert are the *same person at two different times*. A design tuned for one punishes the other daily.
- **Rule:** one flow, never two. The beginner's path *is* the path; on top of it, an invisible layer of accelerators the novice never sees. Nielsen's words: "Accelerators — unseen by the novice user — may often speed up the interaction for the expert." The browser is the whole lesson: one flow — **Ctrl+T** vs the *+* button; **Ctrl+L** vs the click. Same screen, nothing hidden, no "expert mode" toggle. The expert is faster because their hands know doors that were always there.
- **The book-side caution — UP, "Flexibility-Usability Tradeoff," pp.86–87 (open the Swiss Army Knife figure):** "as the flexibility of a system increases, its usability decreases." Flexibility must be *earned* where the expert repeats — never general pile-on. The shortcut layer is how you get flexibility without paying the newcomer's usability cost.
- **Tend (example only):** the owner's morning is a repeated loop. Everything beginner-first; the fast lane is typed command at the entry, one-key resolve, saved filters for the waits list — invisible until the owner is ready.

### H8. Aesthetic and minimalist design
- **Problem:** attention is a fixed pot, and every element makes a withdrawal. Extra information actively *competes* with the relevant information and diminishes its visibility — Nielsen says it as physics: "Every extra unit of information in a dialogue competes with the relevant units of information and diminishes their relative visibility."
- **Rule:** everything on a screen must earn its place. If it isn't doing a job, it isn't decoration — it's a thief.
- **The book-side pair — UP, "Signal-to-Noise Ratio" p.182 (open the two graphs — the same information, one hidden):** "every unnecessary data item, graphic, line, or symbol steals attention away from relevant elements." And **"Aesthetic-Usability Effect" p.18:** beautiful things are *perceived* as easier to use — so polish is also a *trust* signal, not a snob's preference.
- **Tend (example only):** the owner's surface shows exceptions and decision points only. The one situation that just went wrong *shouts*; the forty quiet ones stay quiet.

### H9. Help users recognize, diagnose, and recover from errors
- **Problem:** failure without information is a double wound (lost the action *and* left in the dark); failure without honest explanation is quiet trust-poisoning at scale.
- **Rule:** error messages with three ingredients — **what** happened (plain language, no codes), **why** (cause, never blame), and **how to recover** (the path out). The least useful sentence a computer can say, at the moment the user most needs help: "An error occurred. Please try again later."
- **The book, wearing a second meaning — UP, "Errors" pp.66–67 (the same entry as H3, now the remedy):** "Make error messages clear, and include the consequences of the error, as well as corrective actions." That *is* Nielsen's three-part recipe already inside the book. Slips vs mistakes tells you which error needs which cure.
- **Tend (example only):** an acting system's errors are *worldly* (message already sent, invoice bounced, rule refused) — the honest artifact *is* the message: what was attempted, what actually happened, what the situation needs now. The honest-ending vocabulary is the third part made honest. Invisible failure in an agent is dangerous, not merely annoying.

### H10. Help and documentation
- **Problem:** the product says *nothing* at the moment of doubt; and the clumsy answer — the giant manual — is a disaster zone nobody opens.
- **Rule:** help must be *easy to search, focused on the user's task, list concrete steps, and not be too large*. The real first-principles version: **help is a moment, not a place** — the smallest answer, in the user's own words, at the point of doubt.
- **The book — UP, "Advance Organizer," pp.52–53 (open the forklift figure):** give the big picture *before* the details, in terms the user already knows — the one help that makes all the other help unnecessary. (This is the spine of landing page + onboarding, Module 7.)
- **Tend (example only):** each state word and honest ending is a moment of doubt — each gets one honest sentence at the hover, in place. "Explain every action" (the Explainability category) is the biggest help Tend has.

---
## The correlation map (threads that survive on paper, not in a head)

- **The five failures ↔ Universal Principles:** every one of the five canon layers maps to a named UP entry — Signifier/Affordance↔"Affordance" p.20; Mapping↔"Mapping" p.128; Feedback↔"Feedback Loop" p.76; Constraint↔"Constraint" p.50; Conceptual model↔"Mental Model" p.130. UP is the pre-built cross-reference graph for Module 1.
- **The heuristics ↔ UP:** H1↔"Visibility" p.202; H2↔"Mapping" p.128; H3↔"Errors" pp.66–67 + "Forgiveness" pp.88–89; H4↔"Consistency" p.46; H5↔"Confirmation" p.44; H6↔"Recognition Over Recall" pp.164–165; H7↔"Flexibility-Usability Tradeoff" pp.86–87; H8↔"Signal-to-Noise Ratio" p.182 + "Aesthetic-Usability Effect" p.18; H9↔"Errors" pp.66–67 (the remedy half); H10↔"Advance Organizer" pp.52–53.
- **The commit-point rule (for Module 8):** an acting system has no universal back button; "user control and freedom" lives at the point of no return. The engineering study's propose → authorize → execute *is* that boundary. Exits: re-home (before) / cancel (in the gap) / reopen and honest-declare (after).
- **Exit ≠ confirmation wall:** confirmations before every action teach deafness (habituation — "Do you want to save changes?"); exits after the action keep repair cheap. Walls only at irreversible gates.
- **False undo = false signifier:** an "undo available" affordance that cannot actually recall the world (a channel cannot unsend) advertises an exit it can't deliver — extends the slop ↔ signifier-honesty thread (handoff item 9).
- **Tend reuses:** the reopen lifecycle (Understanding the Situation) worn as undo on the artifact surface; re-homing a misplaced instruction = the before-the-gap exit; the honest acknowledgment doubles as the exit — feedback and exit, same artifact, two jobs.
- **The keys to the whole checklist (what links it into one discipline):** H5 prevention + H6 recognition + H8 minimalism together mean *the user never reaches for a thing that isn't there, and what's there is the right thing, and nothing else is there at all.*
- **Universal Principles' second door:** the five question-columns (influence perception / help learn / enhance usability / increase appeal / make better decisions) map roughly onto our modules — perceive→Module 4, learn→Module 1, usability→Module 1/2, appeal→Module 4, decide→Module 8.

---

## Status & where we continue

**Module 1 — in progress.** Five failures (done), ten heuristics (done). Remaining canon units, in order: **Krug** ("don't make me think" — users scan; the 3-second answer) → **Tufte** (more info is fine, badly arranged info is evil — our aggregation problem) → **the perceiver's machinery** (Gestalt principles, Hick's law, Fitts's law, the aesthetic-usability effect — note: the Aesthetic-Usability Effect already appeared as UP p.18; this unit examines the *mechanism* behind it) → **Rams' ten principles** (the industrial-design spine of restraint) → **Norman's emotional design** (the three planes of feeling — where "the user's feeling" is actually engineered).

**Module 2 — queued:** Refactoring UI (Schoger & Wathan), the first book, taught side by side, section by section. Actual section map: Starting from Scratch p.7; Hierarchy is Everything p.35; Layout and Spacing p.65; Designing Text p.101; Working with Color p.137; Creating Depth p.171; Finishing Touches p.219; Leveling Up p.249.

**Module 3–9:** Universal Principles, the premium mechanics, taste as a mechanism, the design ideation loop, a design language for Tend, Tend's nine items, and same-app-phone-desktop — per the curriculum, each in turn.

**The rule that governs this folder:** Tend is the *example*, never the decision target, until Module 8 grounds every learned idea against the Product Vision and the knowledge base — and only with Swaraj's OK do design directions land in a dedicated design document.
---