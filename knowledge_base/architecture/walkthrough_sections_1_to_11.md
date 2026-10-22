# Walkthrough: how Sections 1 to 11 build the logical architecture

**What this is.** The construction method has twelve sections. Sections 1 to 11 build the logical architecture of Tend: which parts exist, who decides and who acts for each piece of work, how the parts interact, and whether the design holds up under change. Section 12 checks the result against Level 2 and hands it to Level 3, where the technology is chosen. This page says what each section asks for, what this project has produced for it, and what is still missing.

**The short version.** Level 1 says what problem Tend solves. Level 2 says how the logical solution works. Sections 1 to 11 turn that into a design that can be checked: first the inputs and conflicts, then the responsibilities, the boundaries, and the interactions, then the stress tests, then the reconciliation with every source, and last the test of whether the design is stable.

## Section by section

**Sections 1 and 2: the logical model, and the architecture as memory.** The method starts with a logical model made of concepts, not software. Every later decision must trace back to a source, so the architecture works as the team's memory.
- In this project: the model is spread across Sections 6 to 8. It is not yet one loadable file. Each rule carries a source tag, which does the traceability job.

**Section 3: the inputs and the conflicts.** The sources are read: Level 1 (the problem), Level 2 (the standard answers), the research, and the failure modes. Open questions and conflicts are recorded.
- In this project: the concluding audit read every source. The register lists each finding. The conflict and gap registers are in Section 10.

**Section 4: evidence and authority.** Each claim has an evidence record and a status. Assumptions are marked as assumptions. The method asks who may decide what, and on what evidence.
- In this project: the trust and evidence rules are in Section 6. They keep facts apart from assumptions and readings, and they forbid numeric confidence. Evidence records are not yet in the method's record form.

**Section 5: the construction frontier.** Each part of the model is marked established, provisional, or unknown, and the next work is chosen from the frontier.
- In this project: the frontier table is in the README. Section 11 is marked unconstructed.

**Section 6: the responsibility model.** For each piece of work: who decides, who acts, who approves, and who answers. It also says what Tend must never do.
- In this project: the rule groups cover grants and approvals, customer data, security, money, memory and learning, the owner view, and the customer relationship.

**Section 7: the boundary model.** The parts of Tend and the reason for each boundary. Each part has a job, what it writes, what it owns, and what it must not do.
- In this project: the parts table holds the situation worker, the conversation manager, the communication layer, the tool layer, the status-check service, memory, the owner view, configuration, and improvement.

**Section 8: the interaction model.** How the parts work together, one run at a time: the steps, the flows, and worked cases.
- In this project: a run goes TRIGGER, a repeat check, RECOVER, PROPOSE (only when fixed rules leave the step open), VALIDATE, EXECUTE, UPDATE, and REST. CASE-1 to CASE-6 are the worked cases.

**Section 9: the architectural dimensions.** The design is stressed against the dimensions the method names, such as growth, markets, evaluation, and security.
- In this project: seventeen dimension records, and the interactions between them.

**Section 10: reconciliation.** Every source is checked against the design. Conflicts are settled or handed to the owner. Gaps are recorded. Each item gets a severity and a status.
- In this project: the registers, the concluding audit, and the owner items. The register file holds the full list.

**Section 11: stabilization.** The design is tested against change and checked for false stability. Its revisit conditions are stated. Then the fifteen stabilization checks run, a stabilization record is written, and the agent declares the architecture "Stabilized" or "Not Stabilized".
- In this project: not started. The inputs it needs are listed below.

**Section 12: Level 2 completion and handoff.** The logical design is checked for technology. The logical rules are handed to Level 3.
- In this project: not started. The technology-leakage test is not started either.

## What Section 11 needs before it can start

1. **One current model that can be loaded.** Sections 6 to 10 are prose. The method's source-of-truth file is not written yet.
2. **Evidence and decision records** in the method's form, with IDs.
3. **A status for each element:** provisional, conflicting, or unknown.
4. **Conflict and gap registers** with IDs and fields.
5. **The Level 2 wording items** resolved, or accepted as blockers.
6. **The invariant and constraint reconciliation.** The constraint record is not started.
7. **A revisit condition for each decision.**

The owner items that block Section 11 are listed in Section 10 under "Owner items needed before Section 11".

## What happens in Section 11 when it starts

The agent tests the design against change, looks for false stability, runs the fifteen checks, writes the stabilization record, and declares the state. A critical item stops stabilization. The method names no owner declaration. The owner's decisions are the inputs the agent cannot make on its own, so the agent waits for them before it runs the checks.
