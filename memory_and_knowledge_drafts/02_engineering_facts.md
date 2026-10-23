# Engineering facts the redesign must stand on (from the record, 28 Oct 2026)

## Compute
- Conversation manager: stateless, concurrent; one per business (harness 13, :1603-1607).
- Situation worker: one single-threaded instance per situation, addressed by situation id; FIFO; one run at a time (:1611, :1635, :1905).
- Timers: the situation worker's own alarms (wait due times, check-ins) (:1613).
- The CM never calls the worker; a saved version + its notice triggers it (:1652). Write and announce are one unit of work (:2034).
- Stale writes: Part 13 says compare-and-swap on version, rejected write re-reads (:1917); latest design says "checked against the newest version first" (situation_record.md:80). CONFLICT.

## Events that exist (nothing else exists)
| Event | Carries | Emitted by | Consumed by |
|---|---|---|---|
| Message arrival | channel reference, sender's channel address, content | channel | CM intake (dedup by message id + sender + content) |
| Version notice | situation id, new version | whoever saved | worker, communication layer, memory, owner view |
| Time signal / check-in | due time | worker's alarm | that worker only |
| Tool result | structured evidence; maybe a declared wait | tool layer | worker (returned to the running step) |
| Approval answer | member, sign-in identity, time, what was approved | approver | arrival via CM → waiting tool |
| Platform rule change | the rule | product team's fixed tool | CM → one version into each affected situation |
| Status-check answer | the wait, outside reference, answer | status-check service | CM intake |
| Trace | run identity, version read, trigger, proposal, check results, evidence, outcome (no personal data) | each run, asynchronously via queue | memory's writer, improvement, observer |

Implication: there is NO event for "the AI is thinking about X". Memory can only see a step's reasoning artifact in time to help if the loop's own fixed code hands it to memory at a fixed point (a synchronous call with the artifact as data). The trace arrives too late for that step.

## Records and stores
- Situation versions: append-only, strong consistency (D1 situation_models).
- Book of waits: one shared table; it IS the subscription registry; nothing polls.
- Knowledge items table; semantic index stores only ids + vectors, record stays the source of truth (13.2).
- Traces in object storage via queue; index in D1.
- KV cache: compiled context slices, summaries; never guards a decision.
- Identity: sign-in identity (provider id), membership, channel binding (constructed decisions :404-434). Customers are not members; a customer's channel identifies the contact. NO Tend-internal person ID or customer contact record is defined. GAP (Swaraj, 28 Oct: a unique ID with channels pointing to it).
- Scale per business: ~50,000 people, ~2,000,000 situations, mostly finished.

## Proposal artifacts
- Routing (MEANING): {interpretation, referenced_thing?, candidate_situations, purpose_template, ask_list, new_or_join} (Part 12; confidence dropped). Check: 0 / 1 / many.
- Worker PROPOSE: one behaviour + structured reasoning; check: schema, references exist, authority, ask coverage, evidence state, communication purpose, per-viewer depth.

## Memory loaders today
- Context need (not a query): phase, objective, missing info, entities, authority, risk, deadlines (:1024).
- Routing slice: actor's open situations, explicit references, situations linked to those, local vocabulary; never a similarity scan (:1094).
- Output checked against schema and a per-consumer field allowlist; default nothing (S7:237; S8:387, :404).
- Loader request/response shape: Level 3.

## Code evidence (TeleChat, the only one)
- Code-owned orchestrator calls per-step slice builders (planning slice, decision slice with no conversation history, ask-user slice, respond slice); verifiedFactRegistry written as the loop works and read selectively. That is: the harness code calls context builders at fixed points. No magic observer.

## Not defined anywhere
- Round bounds, dedup window, notice field list, final trace field names, latency targets, cost per message, message volume per business.
