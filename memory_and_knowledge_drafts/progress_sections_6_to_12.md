# Carrying memory and knowledge through Sections 6 to 12 — progress

Swaraj's instruction, 28 October 2026: write Sections 6 to 12 iteratively, each building on the one before. Claude does the technical audits itself. Subagents do only readability audits, checked against `conversation with swaraj.md` and his own words. Every Section 12 view, the build view included, must be thought through. Finish today.

Source of truth: `knowledge_base/Level 2/memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops.md` (the Level 2 design), its Level 1 framing, and its tests, in the same folder.

## The changes that must reach every section

1. Always "memory and knowledge", never bare "memory" for the part. Knowledge = situations, skill files and business rules linked, with reasoning over them.
2. It runs in parallel with the loops, on its own thread, observes every part, fires lagging jobs; before each part of a loop, the loop waits for its package (knowledge, or an explicit empty answer). Points: R1 (before routing reasoning), R2 (before the routing check), W1 (before planning), W2 (before acting / plan check), W3 (before every decision), C1 (before writing a message). Its AI part runs at every point; none after a run-ending decision.
3. Two fixed parts (routing, worker): exact-key lookups only. The AI part chooses what to look for and arranges; never decides.
4. Retrieval capability (Swaraj's pattern): the step states what; retrieval decides how; fixed filter first (business, view, kind, status, validity, pinned version); exact + keyword + meaning + link searches in parallel; rank fusion; de-duplicate; rerank; fixed governance gate; neighbouring context; inspect and search again (round limit); evidence with sources. No thresholds.
5. Links created and maintained by memory and knowledge (replaces 9 October: the worker accepts or denies). Shared number or incident code from records = link. Meaning only = proposed, unresolved until a signal. Removal by memory and knowledge or an employee who may see both.
6. Changes between situations: (a) one event, several situations: saved once, one version into each (decided 23); (b) send to another situation: worker decision, worker code hands claim to intake as an arrival, keyed, send budget per pair; (c) person situation to central situation, automatic.
7. Outreach: one central situation + one per person, linked; every update goes up as an arrival; the conversation manager tells the owner only material changes. Replaces "one board".
8. Skills (product and business) in object storage, versioned; procedures kept with them; a run reads a skill's current version when first presented and records it; procedure pinned per situation. Business may write skills and connect any MCP server (configurator, via fixed configuration tool; tool list captured, versioned, hashed; changes need re-approval). Memory and knowledge presents the subset of tools; a step may use only presented tools; tool layer permission check always.
9. Outside knowledge: the worker searches the web (deep-research skill); memory and knowledge reports "unknown subject", presents skill and tools; learns the established subject afterwards.
10. Erasure: only through the erasure tool's confirmation rule (owner or configurator); recursive everywhere, including situation records (the one exception to never rewriting); otherwise nothing erased (retire, supersede, stale).
11. Person: identity-bearing anchor with a person ID; channels point to it; unknown first; no AI decides two records are one person.
12. Visibility: each search starts with the step's view (fixed code); routing uses the sender's view; the worker view rule; the 3 October "foreign reference seen and not opened" note is removed.
13. The worker decides on the newest version before every action, and re-checks just before an irreversible act.
14. Written reasoning has checkable sections: considering, still need to know, questions for memory and knowledge, references (exact quotes); routing adds "refers to something that happened" and "possible situations".
15. Deciding is checking the work: W3 holds the work as first asked, procedure, plan, results with sources, claim states, new arrivals, other situations' waits.
16. Business events are learned knowledge items (dates, aliases, sources, visibility, validity); time in every package.
17. Learning modes (off, automatic default, manual); who corrects = the business by roles; learning never changes rules or authority.
18. Who establishes which fact: the conversation manager (sender, situation), the worker (claims), memory and knowledge nothing.
19. Failure: no package: wait, then a person; AI part fails: fixed items only, the step goes on.
20. Cost (10 to 20 AI calls before first reply) and starting values (configuration with product defaults).
21. Packages recorded in the trace as references only.
22. Documents: saved by intake, claim of sender, indexed with the situation's view.
23. A new kind of arrival: a claim sent from another situation.
24. One routing run per sender (channel address) at a time.

## Status per file

(Updated as work proceeds.)

- Level 2 memory and knowledge folder: written 28 Oct. Readability audit done; its 9 false "quote not found" claims rejected (quotes are in the session record); 31 real fixes applied.
- Section 6: written 28 Oct (A14, A15, B10, F7, F8, N18–N35, U7 added; B5, B6, O1, N1, N11, N13, N14, N16, U5, walkthrough 1 changed; code index updated). Technical self-audit: done. Readability audit: pending.
- Section 7: written 28 Oct (parts table, writers table, links, configuration MCP, memory and knowledge section rewritten, IB-12–IB-14 renamed, IB-15–IB-20 added; code index updated). Technical self-audit: done. Readability audit: pending.
- Section 8: written 28 Oct (packages in the run, newest version, routing table rows, save protocol, memory and knowledge section, CASE-1 central situation, CASE-6, new CASE-7, anti-patterns, decisions; code index updated). Technical self-audit: done. Readability audit: pending.
- Section 9: written 28 Oct (status note, B-Memory finding, dimension table for memory and knowledge, R9-11 resolved, R9-18–R9-24 added). Technical self-audit: done. Readability audit: pending.
- Section 10: written 28 Oct (reconciliation: result line, "Decided by you on 2026-10-28" block, Section 9 items 11 resolved and 18–24 added, trade-offs; audit register part P, MK-1 to MK-11). Readability audit: pending.
- Section 11: written 28 Oct (decision 9 rewritten, decisions 15–19 added, rule 28, change table; stabilization re-check, verdict Stabilized 2026-10-28). Readability audit: pending.
- Section 12: build view done 28 Oct (new memory_and_knowledge.md replacing memory.md; overview; situation_worker; conversation_manager; communication_layer; tool_layer; configuration; situation_record; owner_view; improvement; code index). Boundary, interaction, state, constraint, decision (decisions 11 rewritten, 26–31 added), traceability, behaviour (kinds word lists, kind 4 central situation, kind 5), responsibility (all files; memory file Part 1 rewritten, Provisional marks lifted) views done; code-index block in every view. Checking folder: pending. Readability audits of Sections 6–12: pending.
- construction record entry, what_is_already_settled, README: not started.

## Finished 28 Oct

All readability audit findings checked and applied (or rejected with reason, see checking/audit_record.md). Final sweep clean. Nothing committed.
