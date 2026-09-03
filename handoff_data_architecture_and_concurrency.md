# Handoff — Data Architecture & Concurrency (remaining §4A items 10 + 12)

> Paste this at the start of a fresh chat AFTER the standard opening order: `base_prompt_for_research.md` first (end to end), then `conversation with swaraj.md`, then establish the status quo per `status_quo.md`. This file is the task prompt on top of that base. The engineering study (`agent_harness_study.md`, Parts 1–12) and the two major pillars (product design, software factory) are now COMPLETE — these are the remaining platform-level research items from the original breadth-first scope (base prompt §4A), a dedicated chat of its own.

## We just completed

The engineering study stands complete at twelve parts in `knowledge_base/agent_harness_study.md`, and handoffs exist for the two major pillars (product design & user interaction; software factory with coding agents). The base prompt §4A's original research scope had nine sections plus later additions. Most are now covered. What remains in THIS handoff are two platform-level items that were never part of the engineering study and don't belong to product design or the software factory:

- **Item 10 — Data architecture (database/storage/compute):** how Tend's data lives. Not decided anywhere yet.
- **Item 12 — Concurrency:** what happens when several things hit one situation at once. Partially touched by the Coordination category (single-flight, dedup, recovery) but the concurrency-control mechanics — collision handling, locking, lost updates — are undecided.

The sibling category `time/` (item 11) is already decided at Level 2, so it is NOT in this handoff.

## Now I want to research data architecture & concurrency — in this order

Work them in conversation first, exactly like the engineering study sessions. Do not write files without my explicit OK at the natural checkpoints — when I say "write it", the decisions land in the knowledge base (new Level 2 category files, location TBD with my OK) with a changelog. Start every item from the problem, Level 2 first. Technology choices stay Level 3 unless the item is explicitly about them.

### 1. Data architecture — storage/compute primitive mapping (§4A item 10)

For each kind of data Tend holds, decide its storage shape and the Cloudflare primitive that fits. The data kinds: relational data (situations, actors, journeys, waits); document data (situation models, claims, evidence, audit records); event logs and telemetry (the trace stream, observation events); search indexes (situation routing, memory retrieval); vector data (memory candidate generation — if retained); files and generated artifacts (communication attachments, exports); cache data (session slices, compiled context). For each: source of truth; consistency requirement; read/write pattern; retention; tenant boundary; indexing; backup and recovery; shape (relational / document / key-value / object / analytical / vector).

### 2. Concurrency control — collision handling, locking, lost updates (§4A item 12)

What happens when several things happen at once. Ground in what Coordination already decided (four states; single-flight — one worker per situation; dedup; interrupted-work recovery) and decide the remaining mechanics:

- **Collision handling:** multiple events (message + payment + deadline) arrive for the same situation simultaneously. How are they serialized — queue or merge? What's the ordering guarantee?
- **Locking:** what locks exist (per-situation, per-business, per-wait)? Optimistic vs pessimistic? How does single-flight interact with locking? How do we avoid deadlocks between situations that reference each other?
- **Lost updates:** two reads of the same situation model, two concurrent writes — how is clobbering prevented? Version vectors? Compare-and-swap on the situation version? How is the "version-forward, never rewrite" rule from Memory & Knowledge enforced under concurrency?
- **The natural concurrency boundary:** Cloudflare Durable Objects are single-threaded per object — how does that map to situations/waits? Is one situation one Durable Object? How does the concurrency model align with the storage model from item 1?

Connect to Coordination (the book of waits stays consistent), Time (wait-firing under concurrency), Failure (retry/compensate when a concurrent action fails), and the situation-worker loop (the WAKE/RECOVER/REST cycle assumes coherent event sequencing — this item guarantees it).

## Ritual and rules (non-negotiable)

- Start every item from the problem, Level 2 first. Technology choices stay Level 3 unless the item is explicitly about them.
- Ground in the knowledge base before proposing anything — re-read the relevant category files IN FULL (Coordination, Time, Memory & Knowledge, Compliance & Security, the engineering study Parts 6/10/11 for the loop/memory/situation model whose data this is). Our first-principles answers outrank any external system.
- Research external data architectures, Cloudflare primitive docs, and concurrency patterns for *inspiration only* — same align/invalid discipline as every engineering-study source. Our Level 2 decisions outrank everything.
- Web work goes through TinyFish (base prompt §13) for current Cloudflare primitive docs, data-architecture patterns, and concurrency research.
- No model-generated numbers in control paths; states and structured matches decide (carries over from the engineering study).
- At the end of the stint: update the base prompt §4A progress status and §18 sync so the next chat starts correct — with my OK.
The key rule from the scope: **"PostgreSQL versus Cloudflare" is the WRONG first question.** Cloudflare is a platform of storage/execution primitives (D1, KV, R2, Durable Objects, Workers), not one database. Decide which primitive fits each kind of data. Ground in Product Vision (per-tenant isolation — one-Worker-per-tenant philosophy, Cloudflare-first), the situation model's data needs (versioned, referenced, scoped by business), Memory & Knowledge (graph-shaped data, not graph structure), Coordination/Time (durable wait records), and Compliance & Security (tenant boundaries, data residency, deletion/retention). Decide at Level 2 (shapes, boundaries, consistency); the specific primitive mapping is Level 3, but research should name candidate primitives so the decision is informed.