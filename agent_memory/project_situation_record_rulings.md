---
name: project-situation-record-rulings
description: "4 Nov 2026: the first component is the Situation Registrar; one Durable Object per situation; the conversation manager is a Durable Object; plans in knowledge_base/plans/; lessons 1 and 2 taught; views updated; nothing creates a business yet"
metadata:
  type: project
---

On 2026-11-04 Swaraj ruled: the first component is **the Situation Registrar** ("the registrar"), a global name ("Let's not Indianize this"); older files say situation record. It is a service, not passive storage: it sends every notice by fixed conditions and owns lost notices (this overturns "the writer is the broadcaster" of 5 Sept); it holds the registry and the person-to-situation link; it writes links, splits and merges that other parts decide; it never judges.

Storage (Decided): one Durable Object per situation for truth; per business, one D1 each for registry, configuration, learned knowledge. Merges and erasures may visit several objects. Each business has its own database, no shop column.

Factory (Decided): build everything over several plans, no demos. Plans live in `knowledge_base/plans/situation_registrar/plan_NN_name/` as `plan.md` and `record.md`; never at the repo root. Stages: local, simulation, beta, production, each with separate databases and businesses. In a simulation every human is an agent, each business starts empty and is onboarded by an agent, and only product builders see it. Local debug goes to a SQLite or JSON file and a local screen, not the terminal.

The front door is a Worker per business; the conversation manager is a Durable Object (one per person is my reading; where the update loop runs is not settled). A simulated business starts empty in a seeded world. Sign-in and onboarding come after everything else is built.

**State at end of 4 Nov:** lessons 1 to 4 are in `knowledge_base/product design and engineering learning/`, with a measured experiment in `experiments/`. The nine views, decisions 38 to 42, the registers and the harness study are updated to these rulings; sections 6 to 11, Level 1, Level 2 and the `checking/` history keep the old name as written. All eight plans are skeletons. No code exists.

**Gap found:** no part creates a business, lists all businesses, or handles joining as an owner or employee. Recorded in `checking/gap_register.md`. He wants a component for it, built after the core.

**Rejected, 4 Nov:** a layer for one person across several businesses. Each business is reached on its own channel, and "Tent works inside the business"; do not raise it again. An owner with several businesses may get a view across them in future. Simulation uses real AI models.

**Awaiting him:** the isolation audit's wording (conflict 43). A re-audit of the new files is owed under [[feedback-kb-write-audit-sequence]].

**Why:** one D1 does one thing at a time and is built on one Durable Object, so a busy business would queue behind itself.

**How to apply:** read `knowledge_base/plans/situation_registrar/starting_point.md` first; do not treat its Proposals as decided. He is weak on data and wants teaching from the ground up, before each plan. Related: [[project-factory-learning-first]], [[project-stack-typescript-decided]], [[feedback-agent-memory-visible]].
