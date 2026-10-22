# The audit record

This record says which files passed their audits, how many rounds each took, and what the audits found. Every file in this folder gets two audits: a technical audit of its reasoning against the whole knowledge base, and a readability audit against the conversation constitution. Each is done by an agent that did not write the file. <!-- method: two audits per file -->

The writer checks every finding against its source. A finding that holds is fixed. A finding that is wrong is rejected, and the reason is written down. When a fix changes meaning, a narrower round checks the changes. <!-- method: two audits per file -->

"The project owner" is the person designing Tend.

## 1. The audits of 2026-10-21

The folder was first finished on 2026-10-21. Every file then passed two rounds of both audits; the deciding file had a third, narrow round. What each of those rounds accepted and rejected is written in the notes of each view's code index — the file `code_index.md` in each view's folder. Those notes describe the folder as it stood that day: the points they call "To confirm" or "Open" were all settled on 2026-10-22.

## 2. The full audit of 2026-10-22

On 2026-10-22 the project owner answered the seven blocking questions, accepted every other recommendation, and asked for the smaller questions to be settled in the way that best fits. Every file was changed to match. Then every file in this folder was audited again, in full, against the knowledge base and against each other. <!-- decided by the owner, 2026-10-22 -->

### How it was run

| Round | What was audited | By |
|---|---|---|
| 1, technical | Every file, in eight sets: the responsibility view (three sets); the behaviour view; the build view; the core views (the parts, the records, the rules, the interactions); the decisions file; and the checking folder with the traceability view | Eight agents, one per set |
| 1, readability | Every file, in three sets: the behaviour and build views; the core views and the map; the responsibility view and the checking folder | Three agents |
| 2, verification | Every file whose meaning a round-1 fix changed: all of the responsibility, behaviour, build, and core views, and the checking folder | Three agents, against a list of the points changed in round 1 |

### Round 1: what it found, and what was done

Round 1 reported several hundred findings. Every one was checked against its source. The findings that held were fixed, file by file. The main ones:

- **A second list of waits.** The status-check service's "working list" read as a second list of what situations wait for, against the decision that the book of waits is the only one. It is now the service's **record of asks**: a record of its own asks for each wait, like the tool layer's record of tries, rebuilt from the book after a restart, and never matched against arrivals.
- **Who reads the book of waits** was listed differently in different files. One list now holds everywhere: the conversation manager (at intake, and after a platform rule change), the status-check service, the owner view, and the situation worker after a restart.
- **The observer's checks** were listed three ways. One list now holds everywhere, mapped in [the rules that always hold](../constraint_view/the_rules_that_always_hold.md) to the five kinds of unexpected behaviour the business's observation answers name.
- **"The parts never call each other"** read as if a part could not ask another for anything. It now says: a change reaches another part only as a saved version and its notice; a part may still ask another for a read or a step.
- **The conflict order** still let any newer claim win in two files. Step 2 is now a correction from the source that holds the record, as accepted.
- **The completion check** listed four endings for a question. It now lists the six that Section 8 names, and the two further conditions.
- **An unknown result** could be sent again before its status was checked. The check now always comes first; and when a system can neither be asked nor sends news, the result is declared unknown at once and a person gets the full record.
- **Held notes** were drawn as writes into a situation. They go to the conversation manager's own record of held notes.
- **The approver's answer** is an arrival saved by the conversation manager, handed by the worker to the waiting tool step; this replaces an older routing line, and is now in the decisions file.
- **A reopen** was given to the wrong writer in one draft: the intake step decides, and the worker marks the record reopened.
- **A grant while its holder is away.** The business's authority answers end a grant when its holder "becomes unavailable", but leave "unavailable but not left" open. The settled reading — the grant does not end, but Tend does not treat the away holder as the active holder; cover and the escalation path apply — now says so in every file, and its index rows explain the difference.
- **Missing pieces were added:** five entries of the problem statement's own list of what Tend does not own; the problem statement's thirteen unknowns, as section 1b of the question backlog; each kind of silence with its next step; the handoff deadline and forced handoffs; meeting-event grading; where a low feedback rating goes; the "person first" conditions in gathering; the full blocking list for conflicts; the success branch of kind 1; a second full walk in kind 7; the handoff walk in kind 15 starting from Arjun's own message; a work item's full path in kind 2; consent and "STOP" in kind 4.
- **Status words.** Every legend now uses the same words: Decided, Provisional, Rejected, and the three deferral labels. The words To confirm and Open are retired; deferral labels were added wherever a value or detail is left to a later stage.
- **Readability.** New terms are defined where they are first used in each file: arrival, declaring a wait, time signal, member, bound channel, fresh sign-in, consent records, run, settle window, and others. Dense lists were split. Pointers to file names and decision numbers became links. Sentences pointing to earlier versions of the design were moved into hidden notes. Headings that said "What is still open" over sections with nothing open now read "Open questions, and what is set later".
- **The indexes.** Every hidden note has its row. Duplicate rows were removed, stale meanings were brought up to date, and each index gained a note dated 2026-10-22 saying that this record governs over its older notes.

### Round 1: findings rejected, with their reasons

- **The diagram shorthand "— sent through the tool layer"** was read as a part calling another directly. Rejected: each kind file's "How to read the diagram" defines it as shorthand for the communication layer's send going out through the tool layer.
- **An approval request without an update decision** was read as a send that skips the conversation manager. Rejected: the approval request is sent by the tool's own approval step through the communication layer (the interaction model; the reconciliation's item 32). It is not a message the worker asks for.
- **"Split by due time" in the situation record** was read as invented. Rejected: it comes from the analysis of the blocking questions, question 4.
- **Renaming "situation worker" and other part names** for brevity. Rejected: they are the names the boundary model and every file use.
- **Restating every rule of a linked file inside the file that links to it.** Rejected: each fact has one home, and other files link to it or repeat it word for word.
- **Converting every "Words used here" paragraph in the build view into a list.** Not done: the paragraph is the part files' agreed shape (decided 2026-10-17); new terms were added beside it instead.
- **Naming every responsibility in full in the chain's backward table.** Not done: the forward table, in the same file, names each one beside its number.

### Round 2: verification

Three agents read the folder again after the round-1 fixes, one set each: the responsibility view; the behaviour and build views; the core views and the checking folder. They reported 84 findings. Each was checked against its source. The ones that held were fixed. The ones that did not were rejected, and the reason is here.

What was fixed:

- **A carrier wait with no declaration.** Kind 2 had the situation worker write a wait on an outside system, and a line that said the tool would "check again later". The tool now asks up to five times, declares the wait, and the worker saves it with the started step before the AI is told. The status-check service asks within its limits. When those limits run out, the wait's time signal wakes the worker, which declares the outcome. The same wording is in the build overview and the status-check service's file.
- **Held notes and short waits.** A held note stays in the conversation manager's own record and makes no version. The book of waits holds every wait that may outlast its run, and the glossaries say so.
- **A repeat before a status check.** A step that cannot be undone is asked about first. The same request may be sent again, with the same reference, only when that check still shows the result unknown and the other side recognises the repeat.
- **Completion.** The completion check names the six endings for a question, in every file that states it. A blocked situation the business stops is completed by the conversation manager, with the reason shown; decision 5 and the decisions register say so.
- **Approvals.** An approval is used once. It lapses when the situation changes or when the business's deadline for that kind of approval passes. It passes to another person only where a grant allows it. A situation cannot close while an approval request is open.
- **Merges.** Related situations are linked, never merged. A merge is only the correction of a routing mistake: two situations later found to be one problem, recorded with its reason. Decision 12 says so, and the files that correct a routing say the same.
- **Memory.** Memory with no item that fits never blocks a decision. Memory that cannot be reached blocks only a step that is safe only with its context.
- **Identity.** A channel binding names a member. A number bound to a member proves the channel and names that member. When a membership ends, the binding no longer names an active member, and the next step fails. A grant does not end because its holder is away; Tend does not treat that holder as the active holder.
- **The owner view.** All four alerts reach the business owner without being asked. "Notice" is not redefined in that file. A blocked situation's deadline is not a wait; the owner view reads it and tells the business owner.
- **Words.** Instruction templates, which memory owns, are not WhatsApp templates. A receipt never means the person read or understood the message. A contact record is the channel identifier kept for a person's own situations. The problem statement's seventeen sentences about what Tend does not own are the same thirteen entries in the parts file and in the non-responsibilities register.
- **The indexes.** Every hidden note in the design files has a row. Notes that only said a sentence was repeated from another file were removed; the sentence keeps that file's code. The responsibility index's status legend is the folder's four words.

Findings rejected, with their reasons:

- **Redrawing the send as two saved versions.** The conversation manager asking the communication layer to send is a requested step. What to say is already saved by the worker, and the update decision is recorded. The interactions file says so. It is not a second writer of the situation.
- **Widening Provisional to any rule that touches a pending-review answer.** The test stays "rests only on" those answers. A rule that also rests on a source the project owner accepted stays Decided. Decision 11's memory rules are the Provisional set.
- **Treating the analysis of the seven questions as a file still to be rewritten.** It is kept as it was written on 2026-10-21. The decisions file is the current statement of those answers.

## 3. Results

| View | Files | Result |
|---|---|---|
| Responsibility | Ten topic files and the summary | Passed |
| Boundary | [the parts file](../boundary_view/the_parts.md) | Passed |
| Interaction | [the interactions file](../interaction_view/the_interactions.md) | Passed |
| Behaviour | [how a situation moves](../behaviour_view/how_a_situation_moves.md) and the fifteen kind files | Passed |
| State | [the records file](../state_view/the_records.md) | Passed |
| Constraint | [the rules that always hold](../constraint_view/the_rules_that_always_hold.md) | Passed |
| Decision | [the decisions file](../decision_view/the_decisions.md) | Passed |
| Traceability | [the chain](../traceability_view/the_chain.md) | Passed |
| Build | [the overview](../build_view/overview.md) and the ten part files | Passed |
| Checking | The files of this folder; the analysis of the blocking questions is kept as it was written on 2026-10-21, as its top note says | Passed |

"Passed" means every finding that held was fixed, and every rejected finding has its reason written down.

## 4. Mechanical checks, run after the last fix

- Every hidden note in every file has a row in its folder's code index.
- No index row's status still says To confirm or Open.
- Every link between files, and every link to a heading, resolves.
- No visible sentence outside the legends and the historical analysis uses To confirm or Open as a status.
