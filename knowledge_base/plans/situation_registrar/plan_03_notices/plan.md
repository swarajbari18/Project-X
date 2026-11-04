# Plan 3: Notices

**Component:** the Situation Registrar.
**Status:** not written. The lessons come first, and then Swaraj and the planning agent write this together. Nothing below is decided unless it says so.

## What this plan is for

Save each notice with its version, in one transaction. Decide who gets it from a fixed table. Deliver it, try again until delivered, and make a second delivery harmless.

## What Swaraj learns first

Each of these gets taught before this plan is written. The list is a **Proposal**.

- The dual-write problem and the outbox pattern
- At-least-once delivery, and doing things only once
- Durable Object alarms, and their retry limit
- Queues

## Questions to settle in the planning conversation

- Can a nudge overtake its save? Cloudflare says outgoing messages are paused until writes are confirmed, but that sentence sits under `put()`, and the Registrar uses SQL. This needs confirming on real Cloudflare (lesson 7).
- What is the full routing table, for every kind of change?
- What does the receiver do with a second copy?
- Which notices go directly, and which through a queue?

## How we will know it works

SR-06, the common path, the lost notice, and the duplicate notice.
The story IDs are in `story_registry.md`, at the root of the repository.

## What it adds to the simulation and the whiteboard

Each notice as a line from one block to another, with its delivery tries.

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
