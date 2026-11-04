# Plan 1: The bench and the first whiteboard

**Component:** the Situation Registrar.
**Status:** not written. The lessons come first, and then Swaraj and the planning agent write this together. Nothing below is decided unless it says so.

## What this plan is for

Set up everything every later plan stands on: the project, Cloudflare's local tools, tests that run inside Cloudflare's real runtime, the two test shops Bloom and Bob, one clock the tests control, the run store, and the whiteboard's first screen.

## What Swaraj learns first

Each of these gets taught before this plan is written. The list is a **Proposal**.

- What a test is, and how one runs inside Cloudflare's runtime
- Reading TypeScript, taught as differences from Python
- How a local Cloudflare project is laid out
- How a browser page gets live updates

## Questions to settle in the planning conversation

- Can a Durable Object's alarm be fired early in a deployed environment?
- Which test runner and framework choices, if any, does this plan need? (Frameworks are chosen when implementation starts.)
- Does the run store write a SQLite file, or JSON, on your machine? (Locally, a Durable Object is already a real SQLite file, in `.wrangler/state/`.)
- One Worker for all the parts, or one per part? The assistant leans towards one, and splitting when there is a reason. Everything inside one Worker holds the same bindings (lesson 6, measured), so a part that must hold fewer needs its own Worker.
- A Worker with no bindings can still call the public internet (lesson 6, measured). Do Outbound Workers, in Workers for Platforms, belong in Tend's design?
- How does one Worker per business, through Workers for Platforms, behave locally? Untested.
- Where does the code live? Perhaps `tend/components/situation_registrar/`, with tests beside the code.
- Which exact tool versions do we lock? Lesson 6's project uses `wrangler`, `vitest` and `@cloudflare/vitest-plugin`.

## How we will know it works

It shows one scripted event on a block, and you can step through it with next and previous.
The story IDs are in `story_registry.md`, at the root of the repository.

## What it adds to the simulation and the whiteboard

The first block, a list of runs, a timeline with next and previous, and what came in and went out. Scripted actors start here.

## What this plan will not do

*Not written yet. The non-goals. Build nothing that no rule asks for.*

## Rules

*Not written yet. Each must, must-not, condition, limit and number, numbered R1, R2 and so on. A plan that cannot be split into numbered rules is not yet a plan.*

## Test tables

*Not written yet. Locked input and locked expected result for each rule: the allowed case, the forbidden case, the edges, the exact refusal, the round trip, the wrong order. Then a sweep for what the plan forgot.*

## Public contracts

*Not written yet. Each function other modules may call: its name, what goes in, what comes out, what it changes, and its errors.*

## Data shapes

*Not written yet. Every table and field: name, type, whether it must be filled in, its default, whether it must be unique, and which record points at which.*

## Error meanings

*Not written yet. What counts as an error, a refusal, or a question back; what happens in each case; the exact words.*

## State changes

*Not written yet. The full table of allowed moves, when each is allowed, and who may trigger it.*

## Who may call whom

*Not written yet. Which module may use which, and what each must never touch.*

## Patterns chosen

*Not written yet. Each pattern, the problem it solves, and the alternative rejected.*

## Doing things only once

*Not written yet. What makes a repeat harmless, and what happens to duplicates.*

## Structure: files, types, functions

*Not written yet. The files, what each holds, and why each piece is a function or a type.*

## How data is found

*Not written yet. Written only when the choice changes behaviour or cost.*

## Security: the six questions

*Not written yet. 1. Which of the 17 security branches does this touch? 2. Who are the actors, and whose shop's data moves? 3. What happens if the wrong shop's data leaks or is changed? 4. What could the AI be tricked into doing through this? 5. What stops this fast? 6. Does this let Tend reach anything new?*

## Logging and review

*Not written yet. The Level A events; the Level B points, one line each; and the golden narrative test.*

## Stack appendix

*Not written yet. Only this section changes if the technology changes.*
