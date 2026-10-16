# The constructed architecture

This folder holds Tend's written design. Tend is the product this project designs: software that runs a business's operational work — outreach, orders, deliveries, refunds — with a person in charge of every important decision.

The design here is built from the whole knowledge base during Sections 6 to 11, with Level 2 governing. Level 2 is the folder of engineering answers the owner wrote. Where sources disagree, Level 2 wins. Level 3 is the next stage, where technology is chosen part by part. This folder is written to become the model Level 3 builds from. It earns that role when the work here is complete.

The sections 6 to 11 files sit in the parent folder. While this folder is written, they are the foundation it is checked against. When this folder is done, they become the history it links to. Nothing here is copied from them.

## The folders

Each folder holds one or more files. This map lists every folder and every file. Each new file is added here when it is written.

| Folder | The question it answers | Files |
|---|---|---|
| `responsibility_view/` | What must the system be responsible for? | none yet |
| `boundary_view/` | What belongs together, and what does not? | none yet |
| `interaction_view/` | How do the parts cooperate? | none yet |
| `behaviour_view/` | How does the system behave over time, in each kind of situation? | none yet |
| `state_view/` | What is remembered, who writes it, and how does it change? | none yet |
| `constraint_view/` | What must the architecture always preserve? | none yet |
| `decision_view/` | Why was it built this way? | none yet |
| `traceability_view/` | Where did each structure come from? | none yet |
| `build_view/` | What do I build, part by part, and how do I know each part is right? | none yet |
| `checking/` | Is it complete, traceable, and justified? | none yet |
| (root) | What is in this folder, and where does each thing live? | `map.md` |

In the table above, "the system" means Tend. "A kind of situation" means one class of case from a fixed list of fifteen, where at least one part behaves differently than in the common case.

Nine of the folders are views. Each answers exactly one question. All nine describe one model seen from different sides, so they must agree. When two views disagree, the disagreement goes to the checking folder as a finding and gets fixed. It is never settled by taste.

The build view holds the overview file and one file per part. A part is one of the ten big pieces the design is made of. The boundary view names them: the situation record, the situation worker, the conversation manager, the communication layer, memory, the owner view, the tool layer, the status-check service, configuration, and improvement. Two of them sit inside the conversation manager. Its file covers the manager's own acts — intake, routing, the update decision, and setting completed — and names the parts it contains.

Every part file uses the same headings, in the same order. That set of headings, the method's seventeen, is **Provisional** until the owner says yes.

The kinds of situation are shown in the build view's overview table and in each part file. The walks — the named stories beneath each kind — live with the behaviour view.

The `checking/` folder holds the lists and logs that keep the work honest: what is missing (gaps), what contradicts (conflicts), what Tend must not do (non-responsibilities), what was decided and when (decisions), how this folder was built (construction history), whether the source material still contradicts itself (stabilization), the audit reports, and what is still unfinished (completion).

## How to read a file here

Each file has two layers. The visible text is for people. Inside the file there are also hidden notes — comments a person never sees — for AI agents. Each rule in the visible text carries a short label in a hidden note, for example A1. The label points to a row in that folder's code index. The row gives the rule's plain meaning, where it came from, and its status.

There is one code index per view folder. Two things work differently. The build order is a recommendation, so it carries its own small series of labels. The checking folder records findings, and findings use finding labels, not rule labels.

Each fact has one authoritative place — the one file that says it in full. Every other place links to it, or repeats it word for word with a link back.

The writing follows the conversation constitution: `conversation with swaraj.md` at the root of the repository. One sentence carries one idea. The reader never needs an earlier conversation.

## The five status words

Every rule and every open item carries one of these words. Where a rule came from is a separate question. That lives in the source column of its index row, and it may say "no source found yet". A rule whose source says that is written as **To confirm**.

| Word | Means |
|---|---|
| **Decided** | The owner of this project said yes, and the construction record names the decision. |
| **To confirm** | Written down earlier. The owner has not said yes. |
| **Provisional** | A working choice we use for now. One named event would make us reopen it. |
| **Open** | No answer yet. The question sits on the open-questions list. |
| **Rejected** | Turned down on purpose. The reason is written down. |

## Every write gets two audits

A file is finished when it has passed two audits. Each audit is done by an AI agent that did not write the file and has not seen the work that produced it.

The technical audit checks the reasoning against the whole knowledge base. Every claim carries a reference. A missing reference is reported by the auditor and added by the writer, because the auditor never edits the file. The insights drawn during the work are written down clearly, then checked for gaps, conflicts, missing pieces, and misunderstandings.

The readability audit checks the writing against the conversation constitution. Understanding these files should be hard only when the subject is hard, never because the sentences are.

The agent that wrote the file checks every finding against its source. It fixes the findings that hold. For each finding it rejects, it writes down which one and why. It runs the audit again if a fix changed meaning, not only wording. It records the result in the audit record.

## What is settled and what is not

The decisions live in `../construction_record.md`, entry 21. If the construction record marks a point To confirm or Open, this folder does not treat it as settled either. No file here presents an open item as decided.
