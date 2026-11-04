---
name: project-stack-typescript-decided
description: "1 Nov 2026: Swaraj decided TypeScript for Tend's backend; frameworks chosen at implementation time; front end starts from HTML/CSS/TS, a framework only if basics can't; usetend.in landing page is Astro"
metadata:
  node_type: memory
  type: project
  originSessionId: 11524993-5a85-4e54-9d50-b957a4ff67bc
  modified: 2026-11-01T15:29:08.002Z
---

On 2026-11-01, after a Level 3 analysis of languages on Cloudflare (Workers/Durable Objects run V8: JavaScript or WebAssembly only; Python Workers GA 21 Sept 2026 runs Pyodide inside Wasm), Swaraj said: "Yes, I'm okay with TypeScript" and "for backend, I think you should definitely go with TypeScript."

Decided (his words):
- TypeScript for the backend.
- "We'll decide about the frameworks later when we start implementing stuff." So the assistant's calls (Hono for HTTP, plain Durable Object class instead of the Agents SDK) are NOT decided.
- Front end: "HTML, CSS plus TypeScript ... if we can build something from basics, the best, otherwise we can use whatever framework we can." He wants React-style data/screen sync without React if possible.
- His landing page usetend.in already uses Astro (Cloudflare-friendly). He found Astro slow and clunky locally.
- He corrected the assistant's claim that the owner view barely needs reactivity: some UI parts are pre-built, and "the memory and the graph layer will be built on time using tools". He then clarified: for example, the owner asks "what happened to Priya, show me her journey tree". Some part of Tend compiles graph data on demand (something like a graph query), and predefined, templated UI elements draw it.
  - The assistant's reading: this fits the design. The journey is recomputed on demand, the owner view is built from the records, there is a straight-line/map switch, and "the way to ask" is a capability the design left for later.
  - The assistant's call: the AI picks a view from a fixed menu and fixed code runs a pre-written query. The AI never writes the query.
  - Question put to him: should the journey template be a tree or a graph?
- His device premise: Indian users have mid-range phones with good processors and fast 4G/5G. Bloat and constant animation are the enemy.

Recorded: `programming_language_decisions.md` at the repo root, and the factory file since 4 Nov 2026.

**Why:** the decisive reasons were tests inside the real Workers runtime (the factory's gate), Chrome DevTools debugging on V8, and no interpreter in the shared 128 MB isolate. Python's reading advantage was the accepted cost.

**How to apply:** treat TypeScript as decided. Don't reopen it unless Python gains official in-runtime testing and debugging. Keep framework choices for implementation time. Related: [[project-factory-learning-first]], [[feedback-ask-before-acting]].
