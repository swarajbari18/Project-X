# Handoff — Product Design & User Interaction (major research pillar)

> Paste this at the start of a fresh chat AFTER the standard opening order: `base_prompt_for_research.md` first (end to end), then `conversation with swaraj.md`, then establish the status quo per `status_quo.md`. This file is the task prompt on top of that base. The engineering study (`agent_harness_study.md`, Parts 1–12) is now COMPLETE — this is the next major research pillar, a dedicated chat of its own.

## We just completed

The engineering study stands complete at twelve parts in `knowledge_base/agent_harness_study.md`: repos, papers, memory & knowledge, the two loops, the three fork rulings, verification, products column, golden scenarios, optimizer wiring, fine-tuning, signal taxonomy, evaluation ladder, and the historical lineage map. The base prompt §12 engineering items are all closed and synced. That study tells us **WHAT Tend does**.

This pillar tells us **how the people inside the business SEE and DRIVE that work** — which is not cosmetic. Tend's own vision says the business's primary view is **artifacts** — active situations, waits, changes needing attention, engaged people, blocked decisions, outcomes — not chat transcripts. So product design is the delivery mechanism for everything the situation model holds.

The concrete problem that forces it: the owner gives Tend a journey ("here are 10 people to reach out to"), one replies, one asks a question, one wants a meeting, two go quiet. Tend creates 10 situation models. **How does the owner see what is happening in each, at a glance, without opening 10 conversations?** Same question for employees, partners, and prospects who want to know where their thing stands.

## Now I want to research product design & user interaction — in this order

Work them in conversation first, exactly like the engineering study sessions. Do not write files without my explicit OK at the natural checkpoints — when I say "write it", the design decisions land in a dedicated design document (location TBD with my OK) with a changelog. This pillar is the "product design & user interaction" section of the original breadth-first scope (base prompt §4A scope item 14, base prompt §15). Start every item from the problem, Level 2 first.

### 1. Artifact-first information architecture

The hierarchy that the interface must express: business → journeys → situations → asks → evidence/reason. Decide: what are the primary artifact objects, their states, and their lifecycles on screen? Ground in the Business View & Observation category and the Journey & Lifecycle category — they already own the *content* of these artifacts; this item owns how they are *seen*. The situation model is the substrate — how does a "situation" render as a card, a row, a detail panel, a timeline?

### 2. Cross-situation views

How a list of situations, journeys, waits, and decisions is aggregated, filtered, searched, grouped, and triaged. The owner wants exceptions and decisions, not narration. Decide: what are the default views (active, waiting, blocked, needs-attention, recently-changed)? How does filtering/grouping work (by actor, by journey, by urgency, by staleness)? How does search across situations behave? Connect to the Memory & Knowledge retrieval decisions (hard filters before semantic ranking) and the Journey & Lifecycle linking model.

### 3. Per-role surfaces

Different actors need different *cuts* of the same situation model:
- **Owner dashboard** — active situations, changes, waits, blocked/at-risk, prospects engaged/ready, decisions needed.
- **Employee operational views** — their responsibilities, deadlines, handoffs.
- **Customer/prospect status views** — "where my thing stands", plain language, no internal jargon.
- **Partner views** — only the operational context they own (the Communication category's per-viewer depth discipline).

Decide: what is each role's primary surface, what can they see at what depth, and what is deliberately hidden? Ground in the Authority & Ownership category (who may see what) and the Communication category (per-viewer explanation depth).

### 4. Proactive vs. pull — notification discipline

When does Tend push a notification/update vs. the user pulling from an artifact? This is the Linear/GitHub notification-discipline lesson from the engineering study applied to Tend's roles. Decide: which events warrant a push (a wait ending, a decision needed, a change requiring attention) vs. which stay pull-only? How is alert fatigue prevented? How does the "owner should have known" failure get avoided without drowning them? Ground in the Business View & Observation category's "which events require the owner's attention" decision.

### 5. The situation/journey narrative view

### 6. The design language

The visual system: color, typography, spacing, iconography, motion. Decide: what is the design vocabulary that signals state (waiting, blocked, active, resolved), urgency, and actor? How does it stay legible across roles (owner sees richness, customer sees simplicity)? How do we avoid "dashboard fatigue" (too many numbers, too much chrome)? This item produces the design language specification — not the anti-slop list (that's item 9), but the positive vocabulary.

### 7. Landing page and setup / onboarding

How a new business first encounters Tend: the landing page, the value explanation, the setup/onboarding flow. Decide: what does the landing page promise (and not promise)? What does setup look like — what must the business configure before Tend can act (channels, authority ranges, journey shapes)? How does onboarding teach the artifact-first mental model? Ground in the Product Vision's "configuration, not core" principle.

### 8. The design ideation loop

How we actually *do* design work on Tend: brainstorm → prototype → analyze → expert critique → iterate. Decide: what is our design process — do we sketch, wireframe, prototype in code? How do we get feedback (user testing, expert review, founder critique)? How does a design decision become a spec the software factory can implement? This item is meta: it decides how this pillar's work *gets produced*.

### 9. The anti-"AI-slop" design blacklist

The explicit "never do this" list, grounded in the genuine patterns that make AI products look untrustworthy. Decide what is forbidden and why. Candidate items (to rule on, not adopt blindly): hash gradients, sparkle icons, fake testimonials, neon gradients, rainbow colors, heavy drop shadows, no privacy policy, stock-photo hero sections, vague "AI-powered" claims, chat-everywhere-as-default. The goal: a design language that signals *operational seriousness* (this business's money and reputation are on the line), not "we added a chatbot."

## Ritual and rules (non-negotiable)

- Start every item from the problem, Level 2 first. Design decisions are product decisions — they belong in the conversation first, then a design document.
- Ground in the knowledge base before proposing anything — re-read the relevant category files IN FULL (Business View & Observation, Communication, Authority & Ownership, Journey & Lifecycle, Explainability & Observation, Understanding the Situation). Our first-principles answers outrank any external design system.
- Research external design systems, SaaS dashboards, and artifact-oriented products for *inspiration only* — same align/invalid discipline as every engineering-study source. Our Level 2 decisions outrank everything.
- Web work goes through TinyFish (base prompt §13) for current product screenshots, design-system docs, and competitor research.
- No model-generated numbers in control paths; states and structured matches decide (carries over from the engineering study).
- At the end of the stint: update the base prompt §15 and §18 sync so the next chat starts correct — with my OK.
The human-readable storyline of one situation: message → what we found → what we did → what we told them → what's next. This is the Explainability category's "same data, viewer-dependent rendering" applied to design: timeline for non-technical viewers, graph/detail for builders. Decide: what is the narrative shape, how does evidence attach to each step, and how does the honest-ending vocabulary (answered / deferred / escalated / unanswerable-declared) render? Connect to the Explainability & Observation category's reconstruction decision.