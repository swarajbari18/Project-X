# How do we reconstruct an entire business situation after it has finished?

## The short answer

The raw material already exists — versioned situation models, immutable reasons, run-ID-linked traces, wait history, declared outcomes, graph edges to related situations. Reconstruction is a *view* over that record. The decision taken: same data, viewer-dependent rendering — a linear timeline for non-technical viewers, a graph view for builders, toggleable.

## Our answer

Nothing new needs recording at reconstruction time; everything was recorded as it happened:

1. **The story spine** — the situation model's versions, each holding the complete accumulated state, each with its immutable reason and claims.
2. **The actions** — trace records: what ran, on which evidence, under whose authority, with the emitted reason-key.
3. **The waits and declarations** — every wait opened and how it ended; failures declared; capability-absent conclusions.
4. **The context** — journey and context edges to linked situations (the earlier refunded order behind today's tracking question), traversable when the viewer follows them.

Reconstruction exposes nothing that live viewing wouldn't: the same entitlements apply per role.

The rendering rule came from Swaraj's own framing during the walkthrough: "it just depends on who is looking." A business owner reads their customer's story as a straight line — message, what we found, what we did, what we told them. The product builder sees the same finished story as a graph — nodes, edges, waits, branches — because that is the shape they reason in. Same record, two renderings, one toggle.

A derived capability worth naming (not yet designed): question-driven reconstruction — "why did Tend tell this customer X?" answered by extracting the causal chain rather than showing everything. The audit trail supports it; the design waits for need.

## Boundary

- What gets recorded in the first place (Understanding, Decision Making, Failure).
- Who may see which parts (the visibility documents in this folder).
- Storage, indexing, rendering technology (Level 3).

## Related

- [How do we explain every action?](how_do_we_explain_every_action.md) — the records being replayed.
- [`../coordination/how_do_multiple_business_processes_interact.md`](../coordination/how_do_multiple_business_processes_interact.md) — the graph edges that cross-situation reconstruction follows.
