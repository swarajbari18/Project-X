# Concluding audit register (2026-10-12)

This file is the full record of the concluding audit. Section 10 ("Concluding audit") summarises it. Each row is one finding, or a group of findings with the same fix. The IDs are the auditors' labels, so each row can be traced to its source report.

**Status:** Covered (already in the architecture), Partial, Missing, Contradicted (the two sources disagree), Technical (Level 3), or Rejected (not adopted, with the reason).

**Disposition:** Fixed (text changed in the file named), Added (new rule, in the file named), Owner item N (see Section B), Level 3 (handoff), Covered, or Rejected.

**Scope of the audit:** every Level 2 folder, the Level 1 framing, the 25 research files, the harness study, the Product Vision and framework files, the product design folder and skill, the software factory file, the construction method, the architecture (Sections 6 to 10, the construction record, the README, and the settled-items page), and the "Things to look at" folder (inventory only). Archive and code-index files were excluded, as the brief says.

---

## A. Sources and coverage

| Source | Read by | Result |
|---|---|---|
| Level 2, all 19 folders (the standard) | 11 auditors (authority; business view, explainability and time; channels and communication; compliance and security, and coordination; decision making and failure; gathering information; human collaboration and meetings; journey, growth and prompt constitution; memory and knowledge; trust and evidence; understanding the situation) | Every file read to its last line. Findings in Section C. |
| Level 1 framing (2,691 lines) | 1 auditor | Read in full. Findings in Section E. |
| Research folder (25 files) | 4 auditors (market, SMB and brief; security and compliance; journeys and harness research; customer segments) | Read in full. Findings in Section F. |
| Agent harness study (2,134 lines) | 2 auditors (first and second halves) | Read in full. Findings in Section G. |
| Product Vision, STRUCTURE, README_FIRST, the three-level framework, the Level 2 method, the file-writing instruction, the handoff prompt, the conversation constitution | 1 auditor | Read in full. Findings in Section H. |
| Product design folder (11 files) and the product design skill | 1 auditor | Read in full. Findings in Section I. |
| Software factory file (431 lines) | 1 auditor (earlier pass), checked again in this pass | Read in full. Findings in Section J. |
| Construction method (14,023 lines, 28 chunks) | 1 auditor | Read in full. Output table in Section K. |
| "Things to look at" folder (1.6 GB, 19 entries) | 1 auditor | Inventory only. Findings in Section L. |
| Architecture Sections 6 to 8 | Internal audit, then re-checks after edits | Read in full at 10:07. Edits after that checked by line and by search. |
| Architecture Sections 9 and 10 | Internal audit | Read in full. |
| Construction record, README, settled-items page | Internal audit | Read in full. |
| Not read | Archive and code-index files (not current content). Section 9 scratch files were checked by keyword only. The "Things to look at" folder was inventoried, not read. | |

---

## B. Owner items (85)

**Withdrawn:** every recommendation in this section is withdrawn, except items 14, 15, 26 and 46. Those four are agreed as stated in Section 10 ("Agreed in this round"). The rest are open questions for the owner.

These are new items. They are numbered separately from the existing decisions in Section 10, which keep their numbers. **B** means the item blocks Section 11. **N** means it can wait for configuration, market entry, Level 3, or product design.

**Logical rules (B)**

1. **B.** Where Level 1 sits in the source order. Recommended: Level 2 governs the logical design. Level 1 sets the problem and applies where Level 2 is silent.
2. **B.** The AI call is skipped when a fixed rule settles the step. Recommended: yes.
3. **B.** A solo owner who also configures: may they see the audit trail? Recommended: yes, as administrator. Level 2 treats the administrator as the configurator. Section 6 says "not decided" today.
4. **B.** The owner snapshot (Level 2 list, now in Section 6). Confirm it.
5. **B.** The conflict order when the business has set none. Recommended: a bounded action and a person, which Level 2 allows.
6. **B.** Is a later valid observation an update, or only a correction? Recommended: correction only, until decided.
7. **B.** Platform-rule changes re-check open situations (recorded 2026-10-09). Level 2 leaves that wake open. Recommended: confirm.
8. **B.** What happens when the owner's keep-or-migrate deadline passes with no answer. Recommended: the situation stays on the old version and the owner is escalated.
9. **B.** The simulation environment: seeded test data only. Recommended: yes.
10. **B.** The builder's view of production: masked for personal data (the architecture), or complete (Level 2). Recommended: masked for personal data, and the Level 2 wording changes.
11. **B.** Who enables a capability, who changes compliance settings, and who authors capabilities. Recommended: the product team authors, the business enables, and compliance changes need the owner and a second person.
12. **B.** Tend staff acting as tenants. Recommended: ticketed, time-limited, a second approver, and a banner for the business.
13. **B.** Confidential records: readable by default? Recommended: no, unless the owner grants it.
14. **B.** The proactive channel order. Level 2's channel-choice file puts an approved WhatsApp template with consent before email. Level 2's research file says email first. Recommended: the channel-choice file.
15. **B.** Telegram and live chat in the first version. Recommended: Telegram for replies only, with no cold start; live chat later.
16. **B.** Approval validity, delegation, and what happens when no approver responds. Recommended: decided per capability, and no response escalates.
17. **B.** The escalation ladder: order, timeouts, and whether a third rung exists.
18. **B.** Group approvals: one response, or every response? Recommended: one response by default.
19. **B.** Small refunds without a person. The refund setting (default zero) allows them; the Level 2 security lines say no money moves without a human step-up. Level 2's wording must settle which governs. Recommended: keep the setting, change the security wording.
20. **B.** The Level 2 summary lines that say a closed situation is never reopened. Recommended: change them to state the one exception.
21. **B.** Recurring checks besides the check-in, and whether a watch is its own record. Recommended: the check-in only. A watch is a wait record.
22. **B.** The permission table per capability, claim type, and target, and the join from a verified person to what that person may do.
23. **B.** Which source is authoritative for each claim type, and which wins on disagreement.
24. **B.** The named list of invariants. Level 2 says they are hard, and the list is not written.
25. **B.** The tie-break for two versions of one policy: version first, or activation time first?
26. **B.** The first version at intake: the conversation manager (the architecture) or the situation worker (the harness study). Recommended: the conversation manager.
27. **B.** The learning measures for automatic mode, and whether replay runs before keeping a lesson in manual mode only.
28. **B.** Cross-business generalisation: who approves it, and which scope dimensions apply.
29. **B.** Training on business data: written permission first. Recorded earlier; to confirm.
30. **B.** Where channel rules live: the communication layer (the architecture) or Level 3 transport (the Level 2 channel files). Recommended: the communication layer holds the permission rules, and transport is Level 3.
31. **B.** Who may see a source's identity. Helpers and family visibility. Who may correct, retire, or restrict learned items.
32. **B.** The observer: a part of its own, or a function of the situation worker? Recommended: a function.
33. **B.** Level 2 disagreements in the gathering and understanding files: "fetch again" versus the ingest copy; "not captured anywhere" versus the ingest record; example order numbers that do not match. The owner settles these in Level 2.
34. **B.** An unexpected situation with no known workflow: does it create human work? Recommended: yes.
35. **B.** Can the owner stop a decided, unsent action before its effect? Recommended: yes.
36. **B.** Customer acknowledgement before a record is retrieved; investor and regulator disclosure; meeting and booking rules (types, floors, waivers, expiry, preference expiry, representatives by role).
46. **B.** Which part cancels a nurture wait when a reply arrives. Recommended: the situation worker, in its next version.

**Product, configuration, and market items (N)**

37. Media and public-narrative statements: owner approval before a reply? Recommended: yes.
38. Voice calls: in scope?
39. Owner notice batching windows and quiet hours; who sets them.
40. The owner view: one voice or per-role dialects; the default view; Tend's own voice.
41. Owner states: eleven, or the four-word set? What BLOCKED means (an owner decision, or no safe escalation).
42. Owner ranking of situations (Blocked, Changed, Waiting, Quiet) and the first-read test.
43. The owner's acknowledgement of the owner's own instruction; confirmation walls only at irreversible gates. Recommended: yes to both.
44. Minimum setup before Tend acts; the first-contact promise.
45. Stakeholder defaults (automatic or owner split by type); whether a reopened situation changes the person's relationship.
47. Onboarding and continued purchase: inside Tend's scope?
48. Business success measures; consistency measures; the automation-share ceiling.
49. The bound on approval volume.
50. Which memory measures become replay checks (repeated-mistake rate, stale-memory use, policy conflicts).
51. Study items: whether a remembered fact waits for a person's confirmation; links now, or after a signal; the expected-behaviour baseline; the intent-fidelity check and its threshold.
52. Research items not yet registered (capability defaults, approval patterns, policy expiry): when they come into force.
53. Status words: the meaning of "completed" for each source; who defines the status vocabulary.
54. Freshness thresholds for each information type; whether dwell time, stalled progress, or a breached deadline makes a claim insufficient.
55. Must a system be tried before a person when a system can answer?
56. Which conclusions depend on which claims (the re-evaluation scope).
57. Missing process files (status_quo.md, base_prompt_for_research.md, curriculum.md) and the deleted root copies of the product design folder and the skill.
58. Architecture document style: conversational or formal; where the glossary sits; references to old names (file-writing instruction).
59. Product Vision line 413 says a new person starts as a prospect. It should say unknown first.
60. Feedback routing: a low rating goes to staff, and the customer is told what was done. Partner contact before escalation.
61. Retention: which market is first; audit, trace, and prompt-log retention; deletion versus history.
62. Legal values per market: breach-notice clocks, export and erasure windows, residency, consent durations, which regimes apply. Set when each market is entered.
63. Configuration numbers: rate and cost caps, hop and call limits, the status-check count (five is the working bound), timeouts, check-in lengths, settle windows, feedback wait, reminder timing, access-review cadence.
64. The "recorded earlier" decisions: confirm them. Before the stabilization record, the owner confirms each one.
65. Corporate scope: ticket interface, SLA formality, the SMB-to-corporate boundary, account tiers, multi-level approval gates, routing rules.
66. Growth: the first catalogue of capabilities, notice timing for changes, owner aggregation.
67. Evaluation design: judges, calibration, golden cadence, the two-cell test, holdout sets, and who scores answers.
68. Module 8, item 1: situations primary, with journeys derived. This is structural; the owner records a ruling.
69. The root-cause loop: business-level and blame-free. Who runs it?
70. A draft-for-owner-review reply mode (a new option).
71. Which alternatives count as material ambiguity, per business.
72. The limit on clarifying questions.
73. Severity tiers, permitted substitutes, and irreversible steps, per business.
74. Auditor or regulator access to audit records.
75. Level B logging in production: ever?
76. Disclosure of AI identity to customers, and where, where the law requires it.
77. Tenant or agent code running inside Tend. Recommended: no.
78. Who sees drift and probe material. Recommended: the builder only, as Level 2 says.
79. Owner default access to declarations and the audit trail (the same question as item 3).
80. A safe default per capability when policy is missing or expired.
81. The list of high-risk complaint kinds (chargeback, negative review, legal threat). The business sets it.
82. Which follow-up types are in the first version (abandoned purchase, referral, loyalty, testimonials).
83. A read that discloses information needs a StepUp approval. Section 6 says yes. Recommended: yes.
84. Reuse of feedback and testimonials: consent first?
85. Whether Level 2 may cite code repositories and unread books as concept evidence, and whether AI Agents in Depth is added to the harness study. Recommended: papers and books only, with the source named.

---

## C. Level 2 findings

| ID | Finding | Source | Status | Disposition |
|---|---|---|---|---|
| MEM-1 | Hard filters (business, role, process, capability version, validity, permissions) come before similarity ranking | Memory F1 | Missing | Added: Section 6 (Further additions) |
| MEM-2 | The business owns its official knowledge; Tend owns its own experience | Memory F2 | Contradicted | Fixed: Section 7 ("Owns"); Section 9 ("Tend owns nothing") |
| MEM-3 | The never-memory list and the rule for untrusted instructions | Memory F3 | Partial | Added: Section 6 (memory group) |
| MEM-4 | Learning measures, and monitoring after activation | Memory F4 | Partial | Added: Section 6 (learning) |
| MEM-5 | Automatic mode observes after activation; manual mode checks before | Memory F5 | Contradicted | Fixed: Section 6 (learning modes) |
| MEM-6 | Reversal: stop retrieving, mark, restore the previous version, find influenced situations | Memory F6 | Partial | Added: Section 6 |
| MEM-7 | Integrity checks in every learning mode | Memory F7 | Partial | Added: Section 6 (Further additions) |
| MEM-8 | The business can inspect, correct, reject, approve, retire, and restrict learned items | Memory F8 | Partial | Added: Section 6; owner item 31 |
| MEM-9 | Memory by phase, and the context a step needs | Memory F9 | Partial | Added: Section 6 (context need) |
| MEM-10 | Context projection per phase, keeping source and reason | Memory F10 | Missing | Added: Section 6 (projection differs by phase); format open (Level 2 question) |
| MEM-11 | Currentness is decided per decision; observation and validity time | Memory F11 | Partial | Added: Section 6 |
| MEM-12 | The core fields of a memory item | Memory F12 | Partial | Added: Section 6 |
| MEM-13 | Governed generalisation before a lesson moves between businesses | Memory F13 | Missing | Added: Section 6; owner item 28 |
| MEM-14 | Scope dimensions, and narrowing | Memory F14 | Partial | Added: Section 6 |
| MEM-15 | Update operations per memory type | Memory F15 | Partial | Added: Section 6 (three rules); full table open |
| MEM-16 | Claim-family identity components | Memory F16 | Partial | Added: Section 6 |
| MEM-17 | Failure diagnosis into eleven error categories | Memory F17 | Missing | Added: Section 6 |
| MEM-18 | Per-step training-trace gate and signal taxonomy | Memory F18 | Missing | Owner item 27 |
| MEM-19 | Experience, memory, and projection as separate objects | Memory F19 | Partial | Added: Section 6 |
| MEM-20 | Eight kinds of prior-conversation influence | Memory F20 | Partial | Added: Section 6 |
| MEM-21 | Acceptable learning (12 kinds) and unacceptable learning (10 kinds) | Memory F21 | Partial | Added: Section 6 |
| MEM-22 | Storage, graph, weights, fine-tuning | Memory F22 | Technical | Level 3. The graph-database sentence removed from Section 7 |
| MEM-23 | The must-not list, in one place | Memory F23 | Partial | Added: Section 6 |
| AUTH-1 | Invariants are hard, with no named set | Authority B1 | Partial | Added: Section 6; owner item 24 |
| AUTH-2 | Tend owns nothing; it acts within what is granted | Authority B2 | Contradicted | Fixed: Section 9, Section 7 |
| AUTH-3 | Permission levels per capability, claim type, and target | Authority B3 | Partial | Owner item 22 |
| AUTH-4 | A blame-free root-cause loop owned by the business | Authority B4 | Missing | Owner item 69 |
| AUTH-5 | No "override" concept inside Tend | Authority B5 | Partial | Added: Section 6 |
| AUTH-6 | A grant names a person or a role, and has a lifecycle | Authority B6, B7 | Partial | Added: Section 6 |
| AUTH-7 | A role change lapses the old grants; a mid-action change | Authority B8 | Partial | Added: Section 6; owner item 22 |
| AUTH-8 | Approver per capability; a trace of grant and configuration changes | Authority B9 | Partial | Owner item 16; Section 6 (a second person for grant changes) |
| AUTH-9 | The default range is a configuration default | Authority B10 | Partial | Section 10 (already recorded) |
| AUTH-10 | No self-grant, for people as well as the AI | Authority B11 | Partial | Added: Section 6 |
| AUTH-11 | A default that excludes records others can see | Authority B12 | Partial | Owner item 13 |
| AUTH-12 | Purpose and message-volume limits per effect | Authority B13 | Partial | Owner item 63 (configuration) |
| AUTH-13 | Why each actor may hear; refusal wording; the escalation target | Authority B14 | Partial | Added: Section 6 |
| AUTH-14 | An escalation offer per channel | Authority B15 | Missing | Level 3 |
| AUTH-15 | No authorised approver: wait and escalate | Authority B16 | Partial | Added: Section 6 |
| AUTH-16 | Configurator tool set; agent packaging | Authority B17 | Technical | Level 3 |
| AUTH-17 | Behaviour shaped in model weights | Authority B18 | Technical | Level 3 |
| AUTH-18 | Per-channel rules | Authority B19 | Technical | Section 7 channels; Level 2 channel files |
| AUTH-19 | Small-business jobs: no missed message, a fast reply | Authority B20 | Partial | Section 6 and Product Vision |
| AUTH-20 | Reply-time statistics | Authority B21 | Out of scope | Evidence only |
| AUTH-21 | A draft-for-owner-review reply mode | Authority B22 | Missing | Owner item 70 |
| AUTH-22 | The quoted "product vision" sentence | Authority B23 | Rejected | The sentence is not in Product_Vision.md. The research brief needs correcting. |
| AUTH-23 | Approval depth grows into multi-level gates | Authority B24 | Missing | Owner item 65 |
| AUTH-24 | Corporate roles, departments, delegated configurators | Authority B25 | Partial | Owner item 65 |
| AUTH-25 | The join from a verified person to permitted actions | Authority B26 | Partial | Owner item 22 |
| AUTH-26 | A human is verified only by the identity provider | Authority B27 | Contradicted | Fixed: Section 8 (identity) |
| AUTH-27 | The business can always trace an action to its grant and setter | Authority B28 | Partial | Owner item 3 |
| AUTH-28 | The four parts of a decision: who decides, approves, acts, answers | Authority B29 | Partial | Section 6 (decision parts) |
| AUTH-29 | "Approval is asked only when the grant says so" (summary line) | Authority AI1 | Partial | Section 6 covers both paths; the Section 10 summary corrected |
| COMM-1 | An absent channel: a visible gap, a fallback, a build signal | Channels P1 | Partial | Added: Section 7 (channels) |
| COMM-2 | Starting contact by email needs consent and an unsubscribe route | Channels P2 | Contradicted | Fixed: Section 8; Section 10 row 15 |
| COMM-3 | Purpose, consent, and channel window are separate gates | Channels P3 | Partial | Added: Section 8 |
| COMM-4 | A channel window is a wait, with open and close events | Channels P4 | Partial | Added: Section 8 |
| COMM-5 | The legal basis for the narrow default | Channels P5 | Partial | Owner item 62 |
| COMM-6 | Rule records: message categories and cost | Channels P6 | Partial | Owner item 62 |
| COMM-7 | The AI is not authority for consent, delivery, or completion | Channels P7 | Partial | Added: Section 7 |
| COMM-8 | Minimum sufficient explanation | Channels P8 | Partial | Owner item 63 |
| COMM-9 | A customer's message keeps continuity and expectations, and assigns no blame | Channels P9 | Partial | Added: Section 8 |
| COMM-10 | An employee's message gives the deadline, the authority, and the attempts made | Channels P10 | Partial | Added: Section 8 |
| COMM-11 | A provisional reading is never presented as confirmed | Channels P11 | Partial | Added: Section 8 |
| COMM-12 | Asking differs from consent and from approval | Channels P12 | Partial | Covered by the consent and approval gates (Section 8) |
| COMM-13 | Correcting an earlier message; preventing surprise | Channels P13 | Partial | Added: Section 8 |
| COMM-14 | Unbounded, bulk, and prohibited outreach is excluded | Channels P14 | Partial | Added: Section 6 (Level 1 rule) |
| COMM-15 | The naming of the communication manager | Channels P15 | Partial | Accepted; naming unchanged |
| COMM-16 | Explanation contents; no hidden reasoning | Channels P16 | Partial | Added: Section 8 |
| COMM-17 | Waiting is silent or acknowledged | Channels P17 | Partial | Added: Section 8 |
| COMM-18 | Bounded projection for communication | Channels P18 | Partial | Level 2 open question |
| COMM-19 | The latest usable version | Channels P19 | Partial | Covered: Section 8 (UPDATE) |
| COMM-20 | Consent record fields | Channels M1 | Missing | Added: Section 8 |
| COMM-21 | Employee contact is by job, not consent | Channels M2 | Missing | Added: Section 8 |
| COMM-22 | Employee reachability preference and default lane | Channels M3 | Missing | Owner item 35 |
| COMM-23 | A conflict message is neutral, with no accusation | Channels M4 | Missing | Added: Section 8 |
| COMM-24 | Ask the source before the person | Channels M5 | Missing | Added: Section 8 |
| COMM-25 | Localisation; performance evaluation | Channels M6 | Missing | Owner item 62; Level 3 |
| COMM-26 | The solo owner's view: "what the operator needs" (channels) versus "the whole business" (authority) | Channels X1 | Contradicted | Level 2 wording (your file); owner item 3 |
| COMM-27 | Channel rules: Level 2 permission, Level 3 transport | Channels X2 | Contradicted | Owner item 30 |
| COMM-28 | The sent record, and "the worker never sends": Level 2 states both | Channels X3 | Contradicted | Fixed: Section 7 (sent record); Section 10 row 50 |
| COMM-29 | Explain without being asked when the reason affects trust or the next step | Channels X4 | Contradicted | Fixed: Section 6 and Section 8 |
| COMM-30 | Delivery and acknowledgement meaning per channel | Channels T3 | Technical | Level 3 (open) |
| COMM-31 | Adapters, providers, transport, masking | Channels T1 | Technical | Level 3 |
| COMM-32 | Channel facts and window values | Channels T2 | Technical | Market entry and configuration |
| COMM-33 | Telegram: no cold initiation | Research CCM vs Level 2 | Contradicted | Level 2 governs. Section 7 (channels) |
| TRUST-1 | Gathering records revision, currentness, and owner | Trust U-c, R-c | Partial | Added: Section 6 |
| TRUST-2 | Observation, interpretation, and derived layers; provisional marking | Trust U-f, F-a | Partial | Added: Section 6 |
| TRUST-3 | Evaluator rules; the AI's role in conflicts | Trust U-g, I-d, C-c | Partial | Added: Section 6 |
| TRUST-4 | "Known", "ambiguous", and "believed" are not defined | Trust U-h | Partial | Owner item 54 (freshness); definitions open |
| TRUST-5 | Evidence context for the reasoning model | Trust U-i, R-d | Partial | Added: Section 6 |
| TRUST-6 | Claim-specific source authority | Trust U-j | Missing | Owner item 23 |
| TRUST-7 | Canonical claim fields and normalisation | Trust U-l, C-a | Partial | Added: Section 6 |
| TRUST-8 | No reasoning fallback for unresolved comparisons | Trust U-m | Partial | Owner item 23 (Level 2 open) |
| TRUST-9 | No rule against telling a customer they are wrong; compensation unnamed | Trust U-o | Partial | Added: Section 8 |
| TRUST-10 | Every version carries claims, sources, and time; an empty shell | Trust U-r | Contradicted (minor) | Section 7 defines a version; the placeholder is noted |
| TRUST-11 | Stale and fallback claims: no silent upgrade; return to source | Trust Q3 | Partial | Added: Section 6 |
| TRUST-12 | Freshness thresholds | Trust Q6 | Partial | Owner item 54 |
| TRUST-13 | A needed but unauthorised claim: a visible requirement and a wait | Trust Q5 | Partial | Added: Section 6 |
| TRUST-14 | Re-evaluation scope: which conclusions depend on which claims | Trust Q8 | Partial | Owner item 56 |
| TRUST-15 | Each version is complete on its own | Trust R218–228 | Partial | Added: Section 6 |
| TRUST-16 | A duty to correct a sent message | Trust F-e, RC-i | Partial | Added: Section 8 |
| TRUST-17 | Earlier messages and versions are history, not truth | Trust R234–251 | Partial | Added: Section 6 |
| TRUST-18 | A gathered claim lacks its source version, request, and affected situation | Trust Q2 | Partial | Added: Section 6 |
| TRUST-19 | An "actor believes" claim type | Trust R54–80 | Partial | Level 2 open; noted |
| TRUST-20 | Status words with different meanings ("completed") | Trust R194–199 | Missing | Owner item 53 |
| TRUST-21 | A partner keeps its own responsibility; an employee question can open a separate situation | Trust R257–279 | Partial | Added: Section 6 |
| TRUST-22 | Limited or interim message trigger conflicts | Trust Q7 | Contradicted | Fixed: Section 6 and Section 8 (interim) |
| TRUST-23 | Understanding must not ask customers | Trust R84–85 | Contradicted | Fixed: Section 6 (understanding asks nobody) |
| TRUST-24 | Open items not registered (source authority, ranking, dependency, workflow claims) | Trust, understanding | Partial | Owner items 23 and 56; Section 10 open list |
| TRUST-25 | The decision trail for the Fork A ruling | Trust R8 | Partial | Construction record entry 17 |
| TRUST-26 | Level 3 items: claim representation, monitoring, access enforcement, versioning format | Trust Q3, Q5, Q7, Q8 | Technical | Level 3 |
| TRUST-27 | The intended-outcome layer, apart from the ask and the facts | Trust U88–106 | Partial | Added: Section 6 |
| TRUST-28 | Candidate readings: typed, bounded, with an ambiguity record | Trust A436–466 | Missing | Added: Section 6 |
| TRUST-29 | A provisional reading may be used, never confirmed | Trust A33–34 | Missing | Added: Section 6 |
| TRUST-30 | Readings have a lifecycle and can be retired | Trust A461 | Missing | Added: Section 6 |
| TRUST-31 | The materiality test for ambiguity | Trust A537–554 | Missing | Owner item 71 |
| TRUST-32 | Clarification volume and focused questions | Trust A325–327 | Missing | Added: Section 6 (one thing at a time); limit owner item 72 |
| TRUST-33 | Ambiguity evaluation criteria | Trust A683–750 | Missing | Owner item 67 |
| TRUST-34 | Seven open questions (thresholds, calibration, tolerance) | Trust A794–802 | Missing | Owner items 54 and 67 |
| TRUST-35 | Temporal and actor ambiguity types | Trust A73–84 | Partial | Added: Section 6 |
| TRUST-36 | Interpretations keep their sources, time, and reason | Trust A32, A443 | Partial | Added: Section 6 |
| TRUST-37 | The employee's view of readings considered and why one was held | Trust A329–339 | Partial | Added: Section 6 (owner view) |
| TRUST-38 | "Calibrated uncertainty as a detector" | Trust A281–283 | Rejected | Level 2 forbids made-up numbers (Section 6) |
| TRUST-39 | Proposal, then a deterministic resolution of zero, one, or many matches | Trust U5–6 | Partial | Added: Section 6 |
| TRUST-40 | Gathering priority factors | Trust Q4 | Partial | Added: Section 6 |
| TRUST-41 | Source-map profile fields | Trust Q3 | Partial | Owner item 23; Level 3 (fields) |
| TRUST-42 | A source's identity may be hidden from a recipient | Trust U56 | Missing | Owner item 31 |
| GATH-1 | Routing signal classes | Understanding S1 | Partial | Added: Section 6 |
| GATH-2 | The same-or-related test | Understanding S2 | Partial | Added: Section 6 |
| GATH-3 | An unlink operation | Understanding S3 | Missing | Added: Section 6 (Further additions: "A wrong link can be removed") |
| GATH-4 | The ingest working copy; dispute; outage fallback | Understanding S4 | Partial | Owner item 33 |
| GATH-5 | The context window is disposable | Understanding S5 | Partial | Level 3 |
| GATH-6 | The contents of the routing pool | Understanding S6 | Partial | Level 3 |
| GATH-7 | A status set that includes waiting on an external party | Understanding S7 | Partial | Owner item 53 |
| GATH-8 | An update attaches to the one open situation | Understanding S8 | Partial | Added: Section 6 |
| GATH-9 | A person's link to situations is by identity, not by context | Understanding S9 | Partial | Added: Section 6 |
| GATH-10 | Link types; a link is not a model | Understanding S10 | Partial | Added: Section 6 |
| GATH-11 | The reply record belongs on the ingest record or the decision log | Understanding S1007 | Contradicted | Fixed: Section 7 (sent record) |
| GATH-12 | Direct and indirect relevance | Understanding I15–21 | Partial | Added: Section 6 |
| GATH-13 | An ignored input keeps a pointer and the reason | Understanding I68–70 | Partial | Added: Section 6 |
| GATH-14 | Journey edges are directional | Understanding I252–266 | Partial | Owner item 33 |
| GATH-15 | Reason and run ID on each version | Understanding I346–362 | Partial | Section 8 trace tags (run, situation, version); reason per version is open |
| GATH-16 | Three states: conversation, agent, context | Understanding I547–559 | Partial | Level 3 |
| GATH-17 | The routing component adds edges directly | Understanding I290–294 | Partial | Owner item 33 |
| GATH-18 | "Not captured anywhere" versus the ingest record (Level 2 internal) | Understanding I23, I163, I296 | Contradicted | Owner item 33 (Level 2 wording) |
| GATH-19 | "Fetch again" versus the ingest copy (Level 2 internal) | Understanding I119–125, S548–560 | Contradicted | Owner item 33 (Level 2 wording) |
| GATH-20 | Example order numbers 8821 and 8828 do not match | Understanding I566, I582, I602–604 | Contradicted | Owner item 33 (Level 2 wording) |
| GATH-21 | Claims and confidence on each version; no numeric confidence | Understanding I84–86, I364–392 | Contradicted | Fixed: Section 6 |
| UND-1 | Understanding does not ask; gathering asks | Gathering R84–85 | Contradicted | Fixed: Section 6 |
| DEC-1 | "Blocked" means a missing prerequisite (decision making) or no safe escalation (failure) | Decision making DM1; Failure F1 | Contradicted | Owner item 41 |
| DEC-2 | The same situation, evidence, policy, and authority give the same behaviour | Decision making M1 | Missing | Added: Section 6 (consistency); measure open (owner item 48) |
| DEC-3 | Consistency measures: repeats, drift, variation | Decision making M2 | Missing | Owner item 48 |
| DEC-4 | Approval may depend on whether delegation is allowed | Decision making M3 | Missing | Owner item 16 |
| DEC-5 | An unknown outcome with neither a repeat key nor a status check | Decision making M4; Failure F2, F7 | Missing | Added: Section 8 (no check path: waits for a person); rule open |
| DEC-6 | Accountability that cannot be delegated stays with a person | Decision making M5 | Missing | Added: Section 6 |
| DEC-7 | Automation is for predictable, bounded, reversible behaviour | Decision making M6 | Missing | Added: Section 6 |
| DEC-8 | LLM variation control, calibration, response format | Decision making T1 | Technical | Level 3 |
| DEC-9 | Jitter in retry backoff | Decision making T2 | Technical | Level 3 |
| DEC-10 | Retry counts, backoff, poll counts, breaker, check-in values | Decision making T3 | Technical | Owner item 63 (configuration) |
| DEC-11 | Escalation and human work are not distinct | Decision making P1; Human HC M6 | Partial | Added: Section 8 |
| DEC-12 | Triggers for human work | Decision making P2 | Partial | Added: Section 8; owner item 34 |
| DEC-13 | Policy content: conditions, evidence, scope, exceptions | Decision making P4 | Partial | Added: Section 6 |
| DEC-14 | The fallback order exists; no common-sense decisions at run time | Decision making P3 | Partial | Added: Section 6 |
| DEC-15 | The active policy is ambiguous; policies pinned at opening | Decision making P5 | Partial | Fixed: Section 6; owner item 25 |
| DEC-16 | Approval with no response, and validity | Decision making P6 | Partial | Owner item 16 |
| DEC-17 | Triggers for unsafe automation | Decision making P7 | Partial | Added: Section 6 |
| DEC-18 | Research items not registered | Decision making P8 | Partial | Owner item 52 |
| DEC-19 | Human discretion: reason and authority visible; a differing choice is kept | Decision making P9 | Partial | Added: Section 6 |
| DEC-20 | LLM proposal fields and consequence categories | Decision making P10 | Partial | Section 8 trace fields |
| DEC-21 | Triage severity tiers; the LLM argues the step | Failure P11 | Partial | Owner item 73 |
| DEC-22 | Own failures kept as warnings | Failure P13 | Partial | Covered: Section 6 learning loop |
| DEC-23 | Permitted substitute sources; irreversible steps per business | Failure P14 | Partial | Owner item 73 |
| DEC-24 | The content of a declared failure | Failure P15 | Partial | Added: Section 8 |
| DEC-25 | A credential or sign-in failure is a named class | Failure P16 | Partial | Added: Section 8 |
| DEC-26 | Polling job versus status-check service (naming) | Failure P17 | Partial | Accepted: Section 6 names the status-check service |
| DEC-27 | An SLA ladder with a warning band | Failure F12 | Partial | Owner item 17 |
| MEET-1 | A meeting's outcome: who is responsible for the next step | Meetings MH1 | Partial | Added: Section 8 |
| MEET-2 | An intent once; a slot that fits all participants | Meetings MH3, MH4 | Partial | Owner item 36 |
| MEET-3 | Eligibility rules are undefined | Meetings MH4 | Partial | Owner item 36 |
| MEET-4 | A terminal chain: one senior, no third rung | Meetings MH5 | Partial | Owner item 17 |
| MEET-5 | Fresh intent before rebooking | Meetings MH6 | Partial | Owner item 36 |
| MEET-6 | Cancellation and miss grading | Meetings MH6 | Partial | Owner item 36 |
| MEET-7 | A grant to book inside an intent | Meetings MH7 | Partial | Owner item 36 |
| MEET-8 | Counters are derived, not stored | Meetings M16 | Missing | Added: Section 8 |
| MEET-9 | Floors, waivers, emergency waivers | Meetings M14, M15 | Missing | Owner item 36 |
| MEET-10 | Preference expiry | Meetings M10 | Missing | Added: Section 6 |
| MEET-11 | Absolute-inform versus check-first posture | Meetings M11 | Missing | Owner item 36 |
| MEET-12 | Several eligible people: choose or rank | Meetings M12 | Missing | Owner item 36 |
| MEET-13 | Self-booking lost at the limit | Meetings M13 | Missing | Owner item 36 |
| HUMAN-1 | Work-item roles, approver, deadline, scope | Human HC4 | Partial | Added: Section 8 |
| HUMAN-2 | Work done in parallel: a second person sees existing work | Human HC3 | Missing | Added: Section 8 (Further additions) |
| HUMAN-3 | A departure or a role change | Human HC4, HC5 | Partial | Added: Section 6 |
| HUMAN-4 | Handoff content: reason, deadline, authority, scope | Human HC5 | Partial | Added: Section 8 |
| HUMAN-5 | A partner's own duties; no partner answers | Human HC6 | Partial | Added: Section 6 |
| HUMAN-6 | Stakeholder types need routing and disclosure | Human HC6 | Partial | Owner item 45 |
| HUMAN-7 | Escalation effects beyond remind and reassign | Human HC6, HC8 | Partial | Owner item 17 |
| HUMAN-8 | Kinds of involvement: judgement, representative | Human HC7 | Partial | Owner item 17 |
| HUMAN-9 | Triggers: confidence is not a trigger | Human HC10 | Partial | Added: Section 8 |
| HUMAN-10 | Escalation factors; the customer is told of inaction | Human HC8 | Partial | Covered: Section 8 (customer clock) |
| HUMAN-11 | Eight meanings of "unavailable" | Human HC9 | Partial | Owner item 17 |
| HUMAN-12 | A "wants time" follow-up cadence | Human MH1 | Partial | Owner item 36 |
| HUMAN-13 | Hours, on-call, and a no-suppression rule | Human HC1 | Missing | Added: Section 8 (hours); on-call owner item 36 |
| HUMAN-14 | The information owner and the work owner are different | Human HC2 | Missing | Owner item 31 |
| HUMAN-15 | Group or queue approval: one response or every response | Human HC2, HC6 | Missing | Owner item 18 |
| HUMAN-16 | Handoff and escalation are distinct events | Human HC5 | Missing | Added: Section 8 |
| HUMAN-17 | The customer acknowledges before retrieval | Human HC6 | Missing | Owner item 36 |
| HUMAN-18 | Investor and regulator disclosure; an authorised representative | Human HC6 | Missing | Owner item 36 |
| HUMAN-19 | A meeting outcome creates the next work | Human MH1 | Missing | Added: Section 8 |
| HUMAN-20 | A stored preference with an expiry | Human M10 | Missing | Added: Section 6 |
| HUMAN-21 | A policy that is missing or expired may need a person before a default | Human HC10 | Contradicted | Owner item 5 |
| HUMAN-22 | Routing rule changes: who authorises; hours and on-call inputs | Human OR | Missing | Owner items 17 and 36 |
| JGP-1 | A business event missing from the story gives the wrong stage | Journey J1 | Partial | Owner item 45 |
| JGP-2 | Hard and soft signals for the relationship | Journey J1 | Partial | Owner item 45 |
| JGP-3 | A relationship-type tag on each contact | Journey J4 | Partial | Owner item 45 |
| JGP-4 | Stakeholder defaults: automatic or owner, by type | Journey J4 | Partial | Owner item 45 |
| JGP-5 | First-contact direction must not decide the relationship | Journey J6 | Partial | Added: Section 6 |
| JGP-6 | A supplied lead is not automatically a prospect or customer | Journey J6 | Partial | Added: Section 6 |
| JGP-7 | A follow-up needs a purpose and a target; Tend does not invent them | Journey J7 | Missing | Added: Section 6 |
| JGP-8 | Nurture cadence comes from configuration | Journey J7 | Partial | Added: Section 6, Section 8 |
| JGP-9 | Three wait levels and three kinds of wait subject | Journey J8 | Partial | Section 8 (waits record level and subject) |
| JGP-10 | Tend is a coordinator, not a CRM | Journey J9 | Missing | Added: Section 6 |
| JGP-11 | A reopened situation may change the person's relationship | Journey J9 | Missing | Owner item 45 |
| JGP-12 | The LLM never leads an integration; the product team authors capabilities | Growth G1 | Missing | Added: Section 7; owner item 11 |
| JGP-13 | Rejected options and their reasons | Growth G1 | Missing | Rejected here: alternatives belong to the technical architecture (the owner's ruling). Level 3. |
| JGP-14 | Configuration that breaks an invariant is refused and shown | Growth G2 | Missing | Added: Section 6 |
| JGP-15 | Registry versioning and rule-context assembly | Growth G2 | Partial | Added: Section 6 |
| JGP-16 | Registry storage; rollout and rollback | Growth G2, G7 | Technical | Level 3 |
| JGP-17 | An in-flight policy change: a notice and re-check wait with a deadline | Growth G3 | Contradicted | Fixed: Section 6 and Section 8 |
| JGP-18 | Two policy versions: precedence by version and activation time | Growth G3 | Partial | Fixed: Section 6; owner item 25 |
| JGP-19 | A policy that expires is a time event that wakes the situation | Growth G3 | Partial | Added: Section 6 |
| JGP-20 | A capability is a purposeful action, not a raw interface | Growth G4 | Partial | Added: Section 6 |
| JGP-21 | A capability contract: bounds, failure, reversibility, monitoring | Growth G4 | Partial | Added: Section 6 |
| JGP-22 | A new system is a source of claims only once enrolled | Growth G4 | Partial | Owner item 23 |
| JGP-23 | Workflow templates with bounded parameters | Growth G6 | Missing | Added: Section 6 |
| JGP-24 | A workflow is a constrained procedure for a known kind of work | Growth G6 | Missing | Added: Section 6 |
| JGP-25 | Sub-procedures are isolated; pinned and live steps | Growth G6 | Missing | Added: Section 6 |
| JGP-26 | Retirement by version lifetime, or a deliberate cutover | Growth G7 | Missing | Added: Section 6 |
| JGP-27 | Provider deprecation is an outside event | Growth G7 | Missing | Added: Section 6 (degraded service) |
| JGP-28 | Variation axes | Growth G8 | Partial | Fixed: Section 9 (seven axes) |
| JGP-29 | Open items: first catalogue, notice timing, owner aggregation | Growth G9 | Missing | Owner item 66 |
| JGP-30 | A draft is checked for language and tone before it is sent | Prompt P1 | Missing | Added: Section 8 |
| JGP-31 | Optimiser changes gated by the validator, golden scenarios, and review | Prompt P1 | Partial | Added: Section 8 |
| JGP-32 | Four layers of prompt text, each with an owner | Prompt P2 | Partial | Added: Section 8 |
| JGP-33 | Golden scenarios with expected refusals | Prompt P2 | Partial | Added: Section 8 |
| JGP-34 | The rule-change wake is configurable per business | Prompt P2 | Missing | Owner item 7 |
| JGP-35 | Optimiser tool class; release and rollback; validator placement; template formats | Prompt P2 | Technical | Level 3 |
| JGP-36 | The owner snapshot: prospects, customers, and their counts | Business view B13 | Partial | Added: Section 6 (owner view) |
| JGP-37 | Six artifact views | Business view B14 | Partial | Added: Section 8 (Further additions) |
| JGP-38 | Topic search of owner views | Business view B15 | Partial | Added: Section 8 |
| JGP-39 | A structured reason key on each recommendation | Explainability E18 | Partial | Added: Section 8 |
| JGP-40 | Alerts reach the owner at once | Explainability E19 | Partial | Added: Section 8 |
| JGP-41 | The owner can see what woke a situation | Explainability E20 | Partial | Added: Section 8 |
| JGP-42 | Provider drift and harness golden checks | Explainability E21 | Partial | Covered: Section 8 (two watch lines) |
| JGP-43 | Validators are calibrated by humans | Explainability E22 | Partial | Owner item 67 |
| JGP-44 | Five classes of unexpected behaviour; a coherence threshold; triage routing | Explainability E23 | Partial | Owner item 67; Section 9 |
| JGP-45 | No model-generated numbers in any control path | Explainability E24 | Partial | Added: Section 6 |
| JGP-46 | Drill-down follows the same permissions | Explainability E25 | Partial | Added: Section 8 |
| JGP-47 | A watch as a named wait-for-change record | Time T18 | Partial | Owner item 21 |
| JGP-48 | A check-in is longer than the event waits, and is removed when the situation completes | Time T19 | Partial | Added: Section 8 |
| JGP-49 | A wait resumes on enough of the result, not on every call | Time T20 | Partial | Added: Section 8 |
| JGP-50 | The release policy for waits is configurable; a promise to revert | Time T21 | Partial | Owner item 63 |
| JGP-51 | A response promise and a resolution promise | Time T22 | Partial | Added: Section 8 |
| JGP-52 | A blocked situation is not re-opened by a check-in | Time T23 | Partial | Added: Section 8 |
| JGP-53 | A wait as an intention, separate from its state | Time T24 | Partial | Owner item 21 |
| JGP-54 | An attribution ladder for changes | Explainability E26 | Missing | Level 3 (evaluation protocol) |
| JGP-55 | The builder's complete development and production view | Explainability E27 | Contradicted | Owner item 10 |
| JGP-56 | Drift and probe material is for the builder only | Explainability E28 | Contradicted | Section 7 and Section 8 (builder only); owner item 78 |
| JGP-57 | Declarations are visible to the business | Explainability E29 | Contradicted | Owner item 3 |
| JGP-58 | Ask endings; "unanswerable" is rejected | Explainability E30 | Contradicted | Fixed: Section 8 |
| JGP-59 | Timeline and graph text in Level 2 | Explainability E31 | Partial | Section 10 row corrected |
| JGP-60 | The conversation manager contains the worker | Explainability E32 | Contradicted | Settled by the owner (Section 10); the queue model is the open detail |
| JGP-61 | The check-in is the only periodic wake, against ticks and batches | Time T25 | Contradicted | Owner item 21 |
| JGP-62 | A business policy follows a nine-step feature lifecycle | Section 7 | Contradicted | Fixed: Section 7 |

---

## D. Architecture consistency (Sections 6 to 10, and the construction record)

| ID | Finding | Status | Disposition |
|---|---|---|---|
| ARCH-1 | "Harness never checks on a timer" versus the check-in and timed re-check | Contradicted | Fixed: Sections 6 and 8 (status checks bounded, never on a fixed interval) |
| ARCH-2 | The status-call owner and count (tool or service; one, small, five) | Contradicted | Fixed: Sections 6 to 8 (service; five, decision 7) |
| ARCH-3 | Interim message: after the deadline, or before a promised time is missed | Contradicted | Fixed: Sections 6 and 8 (before) |
| ARCH-4 | "The owner hears about a change in three cases only" | Contradicted | Fixed: Section 6 (Level 2 adds a fourth route) |
| ARCH-5 | Record checks: "decided: no separate checker" versus "provisional" | Contradicted | Fixed: Section 7 (recorded earlier, to confirm); owner item 64 |
| ARCH-6 | The owner's Level 2 edits "not confirmed" | Contradicted | Fixed: Section 8; the owner's words confirm them (construction record entry 17) |
| ARCH-7 | The builder's prompt view: "Level 2 is silent" versus Level 2's complete view | Contradicted | Fixed: Section 7 (conflict stated); owner item 10 |
| ARCH-8 | Admin and configurator as separate holders | Contradicted | Fixed: Section 7 (administrator is the configurator, per Level 2) |
| ARCH-9 | A business policy taking the nine-step lifecycle | Contradicted | Fixed: Section 7 (two lifecycles) |
| ARCH-10 | A soft match "splits the message if the policy allows" | Contradicted | Fixed: Section 8 (decision 10: two situations at once) |
| ARCH-11 | Claimed edits absent: many clear matches "hold"; no source "run stops" | Contradicted | Fixed: Section 8 (decisions 10 and 11) |
| ARCH-12 | A fetch approval "distinct from StepUp" | Contradicted | Fixed: Section 8 (the StepUp check); owner item 83 |
| ARCH-13 | An auto-accept rule for transfers | Contradicted | Fixed: Section 8 (business sets it) |
| ARCH-14 | Nurture-wait cancellation: open, versus the atomic rule | Contradicted | Fixed: Section 8 (which part cancels is open); owner item 46 |
| ARCH-15 | Proactive channel order: stated in Section 8, open in Section 7 | Contradicted | Fixed: Sections 7 and 8; owner item 14 |
| ARCH-16 | Explanation: unprompted in Section 8, when asked in Section 6 | Contradicted | Fixed: Section 6 |
| ARCH-17 | PROPOSE skipped versus "always runs" | Contradicted | Fixed: Section 6 and Section 8; owner item 2 |
| ARCH-18 | Training permission: recorded earlier versus open | Contradicted | Fixed: Section 6 (recorded earlier; to confirm); owner item 29 |
| ARCH-19 | Solo-owner audit access: open versus decided | Contradicted | Fixed: Section 10 (open); owner item 3 |
| ARCH-20 | "Reopened" form and proposal limits: open versus decided | Contradicted | Fixed: Section 8 (reopen decided; limits decided, numbers open) |
| ARCH-21 | "Two writers, one record" versus the communication layer | Contradicted | Fixed: Section 8 (two writers, one situation record; the layer keeps its own record) |
| ARCH-22 | Who writes the version: fixed code or the worker | Partial | Architecture rule; the write is fixed code. Recorded here. |
| ARCH-23 | The first-version writer: Section 7 says Section 8 is silent; Section 8 names one | Partial | Fixed: Section 7 (open, listed in Section 10); owner item 26 |
| ARCH-24 | The trusted permission store has no owning part | Partial | Fixed: Section 7 (the configuration part is its only writer) |
| ARCH-25 | A cited folder name that does not match Level 2 | Partial | Fixed: Section 7 (authority and ownership folder) |
| ARCH-26 | Legacy codes that do not state the rule | Partial | Accepted: the Section 9 old-name map lists them |
| ARCH-27 | Consent withdrawal stops every future message | Missing | Fixed: Section 8 (architecture rule) |
| ARCH-28 | A trace redaction rule | Missing | Fixed: Section 6 (Traces) |
| ARCH-29 | No part owns the harness steps | Missing | Fixed: Section 7 (run steps and observer) |
| ARCH-30 | "No personal data goes into a trace" (not in Level 2) | Missing | Fixed: Section 8 (marked as an architecture rule; you confirm) |
| ARCH-31 | The fallback order: "architecture rule, approved" cites Level 2 | Missing | Section 10 row corrected; the order is an architecture rule |
| ARCH-32 | The observer consumes saved traces | Missing | Fixed: Section 7 |
| ARCH-33 | Level 3 detail in the logical layer: a vendor name, a hashing method, a hostname | Technical | Fixed: Sections 6 and 7 (vendor name generalised; hashing replaced) |
| ARCH-34 | The repeat-check order differs from the step list | Minor | Fixed: Section 8 |
| ARCH-35 | "Final" denial versus rerouting | Minor | Fixed: Section 8 |
| ARCH-36 | Section 10's open list omits five items | Minor | Added: Section 10 (open items in the concluding section) |
| ARCH-37 | The phrase "How Tend finds the right situation" has doubled words ("situation situations") | Minor | Fixed: that file and the settled-items page |
| ARCH-38 | Section 9: "each rule has a source and a check" overstated | Contradicted | Fixed: Section 9 (new rules carry a source tag; older rules are sourced in Section 10) |
| ARCH-39 | Section 10: "no Level 2 line on export" | Contradicted | Fixed: Section 10 row (Level 2 says export must be possible) |
| ARCH-40 | Section 10: "Level 2 marks it provisional" for a new kind of lesson | Unsupported | Fixed: Section 10 (no Level 2 rule) |
| ARCH-41 | Section 10: "Settled by Level 2" on items not checked | Contradicted | Fixed: Section 10 (items 39 and 40 relabelled) |
| ARCH-42 | Section 10: the final check says "each record has one writer" | Contradicted | Fixed: Section 10 (two writers) |
| ARCH-43 | Section 10: "Decided: yes" for the solo owner | Contradicted | Fixed: Section 10 (open) |
| ARCH-44 | Section 10: "confirmed in your reply" for the recorded-earlier group | Contradicted | Fixed: heading now reads "to confirm" |
| ARCH-45 | Section 10: "Thirty" Level 2 files | Minor | Fixed: Section 10 (thirty with the label, 26 with the exact marker) |
| ARCH-46 | Section 10: "the rule codes are no longer used in visible text" | Contradicted | Fixed: Section 10 (names resolved; some codes still in tables, open) |
| ARCH-47 | Construction record: the Section 16 header says no architecture rule was written | Contradicted | Fixed: construction record (Section 16 header) |
| ARCH-48 | Construction record: the date order (Section 10 after Sections 12 and 13) | Minor | Noted in construction record entry 17 (dates as written) |
| ARCH-49 | README: stale CASE count; "Section 7 first tranche"; "Kanban"; "IA-8" | Contradicted | Fixed: README |
| ARCH-50 | The "Two conflicts with Level 2" list the README points to | Missing | Fixed: README now points to Section 10 |
| ARCH-51 | "Situation situation" artefacts in the settled-items page | Minor | Fixed |
| ARCH-52 | The settled-items page: the "Leave these open" fragment | Partial | Fixed: rewritten as a pointer to Sections 6, 8 and 10 |

---

## E. Level 1 findings

| ID | Finding | Status | Disposition |
|---|---|---|---|
| L1-1 | The objective is quoted as "change" in Section 6; Level 1 says "event" | Partial | Fixed: Section 6 quotation |
| L1-2 | Level 1's place in the source order is never stated | Missing | Owner item 1 |
| L1-3 | WhatsApp and Telegram restrict business-first contact; email does not | Missing | Covered: Section 7 and Section 8 (channel rules) |
| L1-4 | A partner is contacted when the situation needs it | Partial | Owner item 60 |
| L1-5 | A low rating is routed to an employee, and the customer is told what was done | Missing | Added: Section 6 (Level 1 rule); owner item 60 |
| L1-6 | Continue into purchase or onboarding when capabilities exist | Partial | Owner item 47 |
| L1-7 | Artifacts are searchable | Partial | Added: Section 8 |
| L1-8 | Replacing existing business software is out of scope | Partial | Added: Section 6 |
| L1-9 | Tend does not invent a policy for an unclear case | Partial | Added: Section 6 |
| L1-10 | No data purchase and no invented campaign without authority | Partial | Added: Section 6 |
| L1-11 | No indiscriminate bulk messages; no bypass of channel rules | Partial | Added: Section 6 |
| L1-12 | Not every operational problem belongs to Tend | Partial | Added: Section 6 |
| L1-13 | Recognise when the stated problem is not the real problem | Partial | Added: Section 6 |
| L1-14 | A test for information being "sufficiently current" | Partial | Owner item 54 |
| L1-15 | A correct decision is valued over a fast one | Partial | Added: Section 6 |
| L1-16 | What makes one source more authoritative | Partial | Owner item 23 |
| L1-17 | Consistent decisions across employees; how consistency is measured | Missing | Owner item 48 |
| L1-18 | How success is measured | Missing | Owner item 48 |
| L1-19 | Forgotten work is rediscovered | Rejected as missing | Covered: the check-in (Section 8, "One check-in per situation") |
| L1-20 | Avoid interrupting people unnecessarily | Partial | Added: Section 6 (Further additions) |
| L1-21 | The identity and authority join | Partial | Owner item 22 |
| L1-22 | A grant ends on departure, unavailability, or role change | Partial | Added: Section 6; owner item 22 |
| L1-23 | A refusal comes with an escalation offer; no override, only a narrower request | Partial | Added: Section 6 |
| L1-24 | Output from an external agent is never authority or instruction | Partial | Added: Section 6 and Section 7 |
| L1-25 | Working hours can differ by location | Partial | Added: Section 6 and Section 8 |
| L1-26 | Growth must not change Tend's purpose | Missing | Added: Section 9 (Further additions) |
| L1-27 | Stateless and ephemeral classes of state; sync and async | Partial | Level 3 |
| L1-28 | Safe defaults for each capability | Partial | Owner item 80 |
| L1-29 | The actor names "Reasoning Model" and "Product Builder" | Partial | Added: Section 7 (actors) |
| L1-30 | A test environment with simulated actors and unusual cases | Partial | Owner item 9 |
| L1-31 | The reasoning model is not used where a fixed rule suffices | Contradicted | Fixed: Section 8 (PROPOSE); owner item 2 |
| L1-32 | No silent conflict choice unless the business has defined one | Contradicted | Fixed: Section 6 (product default labelled); owner item 5 |
| L1-33 | Owners see prospects waiting and buyers close to deciding | Contradicted | Resolved: Level 2's snapshot counts prospects and buyers; owner item 4 to confirm |
| L1-34 | Technology choices belong to later stages | Technical | Level 3 |
| L1-35 | Compliance per tech stack; secure product practice | Technical | Level 3 |

---

## F. Research, market, SMB, and journeys

| ID | Finding | Status | Disposition |
|---|---|---|---|
| RES-1 | A purchase can have several roles: buyer, gatekeeper, payer | Missing | Added: Section 6 (Further additions) |
| RES-2 | Severity tiers and SLA values | Partial | Owner item 73; configuration |
| RES-3 | Routing and account tiers | Partial | Owner item 65 |
| RES-4 | Owner for each decision; cross-team handoff chain | Partial | Covered: four parts of a decision (Section 6) |
| RES-5 | Extension points: approval depth, SLA granularity, audit | Partial | Owner item 65; Level 3 |
| RES-6 | A corporate ticket interface | Partial | Owner item 65 |
| RES-7 | Default reads of connected systems; a confidential carve-out | Contradicted | Owner item 13 |
| RES-8 | A default not-allowed list | Missing | Owner item 13 |
| RES-9 | Channel, consent, and legal regimes as default inputs | Partial | Owner item 62 |
| RES-10 | Identity and authority join; a wait when no approver exists | Partial | Owner item 22; Section 6 (no approver: wait) |
| RES-11 | Safe default per capability when policy is missing or expired | Partial | Owner item 80 |
| RES-12 | Approval validity, roles, delegation | Partial | Owner item 16 |
| RES-13 | A consistency measure (drift, fallback use, variation) | Partial | Owner item 48 |
| RES-14 | Solo-owner audit access: "not decided" versus "decided" | Contradicted | Owner item 3; Section 10 corrected |
| RES-15 | Escalation triggers beyond no response | Partial | Owner item 17 |
| RES-16 | An escalation packet; roles at each level | Partial | Owner item 17 |
| RES-17 | No-movement bounds of five and ten business days | Partial | Configuration example; owner item 63 |
| RES-18 | A scan gap versus a real delay | Partial | Owner item 63 |
| RES-19 | A proactive delay notice before a complaint | Partial | Added: Section 8 |
| RES-20 | Notification tiers and evidence steps | Partial | Owner item 39 |
| RES-21 | The calendar as the source of truth; double booking | Partial | Added: Section 8 |
| RES-22 | Bookings and messages outside business hours | Partial | Added: Section 8 |
| RES-23 | Reminders at 24 hours and 2 hours; a booking link | Partial | Owner items 36 and 63 |
| RES-24 | A feedback wait of 7 to 60 days | Partial | Added: Section 8 (the business sets it; the research values are examples) |
| RES-25 | Closed-loop feedback: a low score is routed and acted on | Missing | Added: Section 6 (Level 1 rule); owner item 60 |
| RES-26 | Email as the default for proactive nurture and feedback | Partial | Owner item 14 |
| RES-27 | Lead as a lifecycle stage | Contradicted | Rejected: Level 2 says a lead is an entry point, not a stage. Section 6 states it. |
| RES-28 | Events that change a relationship | Partial | Owner item 45 |
| RES-29 | Qualification and re-qualification before nurture | Partial | Added: Section 6 (purpose and target) |
| RES-30 | Meeting representation; role approvability | Partial | Owner item 36; Section 6 (representatives by role) |
| RES-31 | Complaint risk grade (chargeback, negative review, legal) | Partial | Added: Section 6; owner item 81 |
| RES-32 | Dormant high-value reactivation | Missing | Rejected as a rule: a follow-up type for the product backlog (owner item 82) |
| RES-33 | Partner data sharing; personal-data limits; audit | Partial | Added: Section 6 |
| RES-34 | Data residency per market | Partial | Added: Section 6 |
| RES-35 | Locale, tone, and keigo per market | Missing | Added: Section 6 (per market and per business) |
| RES-36 | A per-tenant compliance matrix; a shared core from day one | Partial | Added: Section 7 (compliance settings) |
| RES-37 | Simulation for other business types; external agents as actors | Partial | Owner item 9; Section 7 (actors) |
| RES-38 | A response-time target; owner margin metrics | Partial | Owner items 4 and 48 |
| RES-39 | Platform windows, LINE, WeChat, UPI, COD, carriers, SOC 2 | Technical | Level 3 and market entry |
| RES-40 | An abandoned-purchase follow-up | Missing | Owner item 82 |
| RES-41 | Referral and loyalty journeys | Missing | Owner item 82 |
| RES-42 | Feedback stored for testimonials | Missing | Owner item 84 |
| RES-43 | Who cancels a nurture wait on a reply (Section 7 and Section 8 differ) | Contradicted | Fixed: Section 8; owner item 46 |
| RES-44 | The escalation ladder's order and timeouts | Partial | Owner item 17 |
| RES-45 | Partner data sharing, and audit | Partial | Owner item 31; Section 6 |
| RES-46 | Channel and market regimes (CAN-SPAM, DPDP, Telegram) | Partial | Owner item 62 |
| RES-47 | Meeting types, preferences, and availability merge | Partial | Owner item 36 |
| RES-48 | Employee consent, onboarding, outreach, and fallback | Partial | Owner item 9 and item 36 (employee reach) |
| RES-49 | Owner search, filter, and intervention | Partial | Added: Section 8 (search); intervention owner item 35 |
| RES-50 | Carrier polling; note-taking integration | Technical | Level 3 |
| RES-51 | Corporate SLA and multi-team routing | Partial | Owner item 65 |
| RES-52 | Owner-notification timing overnight | Partial | Owner item 39 |
| RES-53 | Routine certificate sends | Partial | Configuration per business; no rule needed |
| RES-54 | Media statements escalate to the owner | Missing | Owner item 37 |
| RES-55 | Helper and family visibility | Partial | Owner item 31 |
| RES-56 | Investor as a version-one escalation only | Contradicted | Owner item 36 |
| RES-57 | An automation-share ceiling; a satisfaction drop | Missing | Owner item 48 |
| RES-58 | Voice calls | Partial | Owner item 38 |
| RES-59 | Research claims about never-reply rates and reply statistics | Out of scope | Evidence only. The two research files disagree (47 percent and 23 percent); not used. |

---

## G. Agent harness study (subordinate to Level 2)

The study is not Level 2. Where it disagrees with Level 2, Level 2 governs, and the study's claim is recorded here.

| ID | Study claim | Status | Disposition |
|---|---|---|---|
| HAR-1 | Situations read business rules fresh on each wake | Contradicted | Rejected: Level 2 pins policies (Section 6); owner item 8 |
| HAR-2 | Training data kept forever, aggregated across businesses | Contradicted | Rejected: Section 10 conflict 24; owner item 29 |
| HAR-3 | Analytics and the tenant registry are global by design | Contradicted | Rejected: Section 6 isolation; owner item 28 |
| HAR-4 | Audit records kept seven years | Contradicted | Rejected: retention is per market (Level 2); owner item 61 |
| HAR-5 | No component ever polls | Contradicted | Rejected: Level 2 allows bounded checks |
| HAR-6 | The only scheduled wake is a per-wait check-in | Contradicted | Rejected: Level 2 uses one check-in per situation; owner item 21 |
| HAR-7 | The "expected" behaviour is a recorded baseline | Missing | Owner item 67 |
| HAR-8 | Holdout scores, and rollback for learned or harness changes | Missing | Owner item 67; rollback added to Section 6 |
| HAR-9 | Memory measures (repeated mistakes, stale-memory use, policy conflicts) | Missing | Added: Section 6; owner item 50 |
| HAR-10 | Remembered facts wait for a person's confirmation | Missing | Owner item 51 |
| HAR-11 | Intent fidelity: the answer addresses what the person meant | Partial | Owner item 51 |
| HAR-12 | Coherence checks with sampled judges | Partial | Owner item 67 |
| HAR-13 | Drift measures (tool-call mix, schema, latency, cost) | Partial | Covered: Section 8 probes; owner item 67 |
| HAR-14 | Hard filters before semantic ranking | Partial | Added: Section 6 |
| HAR-15 | Typed memory: kinds, episodes, decay | Partial | Covered: Level 2 memory categories (Section 6 refers to them) |
| HAR-16 | One interface contract for each component loop | Partial | Level 3 |
| HAR-17 | Traces feed harness patches, not only model adaptation | Partial | Covered: Section 6 (improvement path) |
| HAR-18 | Targeted patches and held-out selection | Partial | Owner item 67; Section 8 (review gate) |
| HAR-19 | Train, validation, and holdout split | Partial | Owner item 67 |
| HAR-20 | Golden scenarios with expected refusals | Partial | Added: Section 8 |
| HAR-21 | Claim-family identity components; integrity checks always run | Partial | Added: Section 6 |
| HAR-22 | No numeric confidence | Partial | Added: Section 6 |
| HAR-23 | Excess-search guard; compression; profile-first; trace recoverability | Partial | Level 3; trace recoverability covered (Section 6 reconstruction) |
| HAR-24 | Learning signals; owner batching; open items | Partial | Owner item 39; the rest Level 3 or Section 8 |
| HAR-25 | Prompt versioning; per-objective feedback; validator reasons | Partial | Level 3 |
| HAR-26 | Memory's own loop; merge rollback; link fields; problem type; reversibility | Partial | Reversibility: Section 6; the rest Level 3 |
| HAR-27 | Anomaly class 5; reconstruction views; response versus resolution; safety floor; wait levels; observer naming | Partial | Section 8 (promises); observer naming owner item 32 |
| HAR-28 | Provider role contracts; code-enforced transitions; single-flight | Technical | Level 3 |
| HAR-29 | Model tiers; fine-tuning recipe; error taxonomy; adapters | Technical | Level 3 |
| HAR-30 | Optimiser tools, fitness weights, costs | Technical | Level 3 |
| HAR-31 | Closed engine; FSM analysis; scenario generation; external systems | Technical | Level 3 |
| HAR-32 | A fifth worker state, "dead" | Contradicted | Rejected: not in Level 2; Section 6 keeps the Level 2 status set |
| HAR-33 | Ending "declared unanswerable" | Contradicted | Fixed: Section 8 (capability absent) |
| HAR-34 | The worker commits the truth by create or attach | Contradicted | Owner item 26 |
| HAR-35 | The LLM artefact carries a numeric confidence | Contradicted | Rejected: Level 2 forbids it |
| HAR-36 | The optimiser may touch tool descriptions and the system-prompt policy | Contradicted (critical in the study) | Rejected: Section 7 (no change to tool descriptions or constitution policy text); owner item 11 |
| HAR-37 | "History never vanishes"; retire, never delete | Contradicted | Rejected: deletion must be possible (Level 2 compliance); owner item 61 |
| HAR-38 | Online-stream learning: updates as feedback arrives | Contradicted | Rejected: Level 2 runs learning in the background; owner item 27 |
| HAR-39 | A closed situation is never reopened | Contradicted | Rejected: the owner's reopen rule; owner item 20 |
| HAR-40 | An unsure relation gets no link until a signal | Contradicted | Owner item 51 |
| HAR-41 | Claim-family rules, projection, and acknowledgement policy parked as Level 3 | Partial | Added: Section 6; acknowledgement policy owner item 36 |
| HAR-42 | "Agents should not be components"; "the harness is the whole system including the LLM" | Contradicted | Rejected: Level 2 governs (the AI proposes; fixed code decides) |

---

## H. Product Vision, framework, structure, handoff, and conversation constitution

| ID | Finding | Status | Disposition |
|---|---|---|---|
| PV-1 | The AI is used only where rules cannot decide | Contradicted | Fixed: Section 8; owner item 2 |
| PV-2 | The observer as a first-class responsibility | Contradicted | Owner item 32 |
| PV-3 | The handoff written into handoff_prompt.md | Contradicted | Process; owner item 58 |
| PV-4 | No pointing back to files or old names | Contradicted (style) | Owner item 58 |
| PV-5 | One sentence, one idea | Contradicted (style) | Owner item 58 |
| PV-6 | Buzzwords and abstract labels in Sections 9 and 10 | Contradicted (style) | Owner item 58 |
| PV-7 | Formal architecture language unless asked | Contradicted (style) | Owner item 58 |
| PV-8 | Walkthrough kept; glossary only after the distinctions | Contradicted (style) | Owner item 58 |
| PV-9 | The blanket "Decided" label on Section 6 | Contradicted | Fixed: Section 6 (source tags) |
| PV-10 | A pause that becomes a delay | Missing | Owner item 60 |
| PV-11 | Tend holds no override capability | Missing | Fixed: Section 6 |
| PV-12 | Layered risk: a fixed base and LLM suggestions | Missing | Added: Section 6 (consistency, risk, and measures) |
| PV-13 | Performance expectations; when not to use the AI | Missing | Level 3 (performance); "when not to use" covered by Section 8 |
| PV-14 | Rejected options explained per decision | Missing | Rejected here: alternatives belong to the technical architecture (the owner's ruling). Level 3. |
| PV-15 | status_quo.md is required at the start of a chat | Missing | Owner item 57 |
| PV-16 | The architecture folder is missing from STRUCTURE.md | Missing | Owner item 57 (a documentation update) |
| PV-17 | External agents never become hidden authority | Partial | Added: Sections 6 and 7 |
| PV-18 | Representatives chosen by role; expiring preferences | Partial | Added: Section 6 |
| PV-19 | Identity providers as actors | Partial | Added: Section 7 (actors) |
| PV-20 | Growth dimensions (locations, integrations, employees) | Partial | Added: Section 9 |
| PV-21 | Boundary test: the smallest complete problem owned on its own | Partial | Added: Section 7 (Further additions) |
| PV-22 | Evaluation criteria and revisit signals | Partial | Added: Section 9 |
| PV-23 | Level 2 output names (Policy Engine, Observability) | Partial | Naming recorded; unchanged |
| PV-24 | Observation, claim, interpretation, and decision kept apart | Partial | Added: Section 6 |
| PV-25 | Role change, delegation, and end of grant | Partial | Added: Section 6; owner item 22 |
| PV-26 | A response promise versus a resolution promise | Partial | Added: Section 8 |
| PV-27 | Policies pinned at opening; migration | Partial | Added: Section 6 and Section 8 |
| PV-28 | Four text layers of the prompt constitution | Partial | Added: Section 8 |
| PV-29 | Situations rendered per viewer (linear, graph) | Partial | Owner item 40 |
| PV-30 | Immutable context; append-only audit | Partial | Added: Section 6 (tamper-evident audit) |
| PV-31 | "Recorded earlier" decisions not found in this session | Partial | Owner item 64 |
| PV-32 | The Cloudflare-first stack | Technical | Level 3; not in the architecture |
| PV-33 | Schemas, trace field names, and an idempotency key in Sections 6 to 9 | Technical | Level 3 handoff (listed in Section N) |
| PV-34 | WhatsApp and email named as channels | Rejected | Level 2 names them, so they stay |
| PV-35 | Level 3 items not yet written | Technical | Level 3 |
| CONST-1 | The conversation constitution: one sentence, one idea; no abstract labels unless the owner can see them in a case | Partial | Owner item 58 (architecture document style) |

---

## I. Product design folder and skill

| ID | Finding | Status | Disposition |
|---|---|---|---|
| PD-1 | The owner can stop a decided, unsent action | Partial | Owner item 35 |
| PD-2 | Tool names must not promise more than they deliver | Missing | Level 3 |
| PD-3 | Gate and refusal messages say what, why, and how to recover | Partial | Added: Section 8 |
| PD-4 | A summary must not bury the decisive context | Partial | Added: Section 8 |
| PD-5 | The first-read test for the owner's views | Missing | Owner item 42 |
| PD-6 | The same clarity rules apply to machine-facing surfaces | Partial | Added: Section 9 |
| PD-7 | First contact: an honest promise; minimum setup | Missing | Owner item 44 |
| PD-8 | The owner's own instruction is acknowledged | Partial | Owner item 43 |
| PD-9 | Confirmation walls only at irreversible gates | Partial | Owner item 43 |
| PD-10 | One state vocabulary for the owner view and the gate (four words, one meaning each) | Contradicted | Owner item 41 |
| PD-11 | Owner ranking: Blocked, Changed, Waiting, Quiet | Partial | Owner item 42 |
| PD-12 | Cross-situation views: default view, grouping, search | Partial | Owner item 40; Section 8 (search) |
| PD-13 | Per-role surfaces | Partial | Owner item 40 |
| PD-14 | Push timing; quiet hours | Partial | Owner item 39 |
| PD-15 | A narrative view | Partial | Owner item 40 |
| PD-16 | A count of live options for machine-facing steps | Partial | Level 3 |
| PD-17 | Tend's own voice and personality | Missing | Owner item 40 |
| PD-18 | An outcome: the owner gets better at running the business | Missing | Level 1 outcome; not a testable rule. Recorded. |
| PD-19 | Visual system, perception theory, and design language | Technical | Level 3 |
| PD-20 | Module 8, item 1: situations primary, journeys derived | Partial | Owner item 68 |
| PD-21 | Missing files and deleted root copies | Missing | Owner item 57 |

---

## J. Software factory file

| ID | Finding | Status | Disposition |
|---|---|---|---|
| SF-1 | The builder is the audience for per-tenant records (masking not stated) | Contradicted | Owner item 10 (major, not critical) |
| SF-2 | The production toggle "contradicts" itself | Rejected | The file says it is off by default in production in three places. Not a contradiction. |
| SF-3 | Terminology | Minor | Accepted |
| SF-4 | No numeric gating | Partial | Added: Section 6 |
| SF-5 | AI output sinks: argument, header, URL, render | Partial | Added: Section 6 |
| SF-6 | Destination allowlist, default deny | Missing | Added: Sections 6 and 7 |
| SF-7 | Two-shop test for each authorisation branch | Partial | Added: Section 8 (builder obligation); Level 3 |
| SF-8 | Named test suites | Partial | Level 3 |
| SF-9 | Release gates: catalogue hash; kill switch per release | Partial | Added: Section 8 |
| SF-10 | A pre-release golden run | Partial | Added: Section 8 |
| SF-11 | Retention per market | Known | Owner item 61 |
| SF-12 | Seeded fixtures only, against "the simulation shows everything" | Contradicted | Fixed: Section 7 (seeded test data only); owner item 9 |
| SF-13 | Product-owned strings are fixed; business wording is configurable | Partial | Added: Section 8 |
| SF-14 | A state-transition table | Technical | Level 3 |
| SF-15 | Outbound resend idempotency | Known | Section 10 open item; Level 3 |
| SF-16 | The construction path lacks monitoring and retirement (a note for the factory document) | Missing | Note for the software factory document |
| SF-17 | Who enables a capability; who approves a release | Open | Owner item 11 |
| SF-18 | Connector credentials never in the agent's reach | Missing | Added: Section 6 (Security) |
| SF-19 | An SSRF denial | Technical | Level 3; the logical allowlist is covered |
| SF-20 | A reproducible build | Technical | Level 3 release obligation |
| SF-21 | Auditor or regulator access | Open | Owner item 74 |
| SF-22 | Technology choices T1 to T4 | Technical | Level 3 |
| SF-23 | Level B logging enabled in production? | Open | Owner item 75 |

---

## K. Construction method: outputs and status

Source: the method audit of the full construction method (14,023 lines). Status: DONE, PARTIAL, NOT STARTED, or NOT APPLICABLE.

| Method section | Required outputs | Status |
|---|---|---|
| 1 | Logical model; intermediate artefacts | PARTIAL: prose in Sections 6 to 8; no single model |
| 2 | Traceability; decision classes; open questions | PARTIAL: source tags; open lists in Sections 6, 7 and 10 |
| 3 | Constraint record | NOT STARTED |
| 3 | Conflict register | PARTIAL: numbered in Section 10; no source or impact fields |
| 3 | Evidence record (eleven fields) | PARTIAL: source and status; no evidence IDs |
| 4 | Assumption record; classes | PARTIAL: assumptions listed; no critical or low-impact classes |
| 4 | Open-question record; seven evidence states | PARTIAL: four states used |
| 4 | Forward and backward traceability | PARTIAL: backward only |
| 5 | Construction context (eight parts) | NOT STARTED |
| 5 | Construction frontier | DONE |
| 5 | Change and revision records | PARTIAL: construction record; no invalidation or revisit fields |
| 5 | Status set; construction ledger | PARTIAL: narrative; no construction IDs |
| 5 | Per-step gate | PARTIAL |
| 6 | Relations; clusters; negative relations | PARTIAL: prose |
| 6 | Change drivers | NOT STARTED |
| 6 | Responsibility record (sixteen fields) | PARTIAL: prose; no IDs |
| 6 | Responsibility gate | PARTIAL: Pass 4 only |
| 7 | Boundary hypothesis; decision record; alternatives | PARTIAL |
| 7 | Boundary tests; criteria; review; gate | PARTIAL |
| 8 | Interaction contract (twenty fields) | PARTIAL: flows, no IDs |
| 8 | Interaction graph | NOT STARTED |
| 8 | Variations; gate; output | PARTIAL: CASE-1 to CASE-6 |
| 9 | Seventeen dimension records | DONE |
| 9 | Dimension matrix; conflict record | PARTIAL |
| 9 | Dimension interaction graph | NOT APPLICABLE |
| 9 | Dimension gate | PARTIAL: self-check only |
| 10 | Source list (fourteen) | PARTIAL |
| 10 | Gap types | PARTIAL |
| 10 | Negative, duplicate, hidden, and orphan checks | PARTIAL: no orphan check |
| 10 | Authority and invariant map | PARTIAL |
| 10 | Behaviour replay | DONE |
| 10 | Research classification (ten classes) | NOT STARTED |
| 10 | Gap register (ten types) | PARTIAL |
| 10 | Reconciliation matrix | NOT STARTED |
| 10 | Severity; the thirteen checks; uncertainty classes | DONE (self-declared) |
| 10 | Reconciliation output | PARTIAL |
| 11 | Element status; explanations | PARTIAL |
| 11 | Materiality table | NOT STARTED |
| 11 | Decision record (seventeen fields) | PARTIAL |
| 11 | Stress pass; explanation and replay | PARTIAL: CASE-1 to CASE-6 and the dimension study |
| 11 | Stabilization gate; stabilization record; versions; procedure; package | NOT STARTED |
| 11 | Agent behaviour rules | NOT APPLICABLE |
| 12 | Model objects (twenty-five); seven views | PARTIAL: three views covered |
| 12 | Source-of-truth file | NOT STARTED |
| 12 | Question backlog (six classes) | PARTIAL |
| 12 | Completion matrix (twenty-eight items) | NOT STARTED |
| 12 | Technology-leakage test | NOT STARTED |
| 12 | History links (nine) | PARTIAL |
| 12 | Level 2 package (twenty-six items) | PARTIAL: about twenty in prose |
| 12 | Handoff; completion procedure and record | NOT STARTED |

**The contrast in one paragraph.** Done: the seventeen dimension records, the behaviour replay, the severity classes, and the construction frontier. Not started: the constraint record, the change-driver records, the interaction graph, the research classification, the reconciliation matrix, the materiality table, the stabilization record, the source-of-truth file, the completion matrix, the technology-leakage test, and the handoff and completion records. Partial: most of the rest. The method blocks stabilization on any critical item (10.25), on the fifteen checks (11.17), and on the handoff items (12.23).

---

## L. "Things to look at" folder (inventory only)

| Item | Type | Relevance to the architecture |
|---|---|---|
| Agent Seer, scenario synthesis | Paper | Evaluation method (Level 3) |
| AI Agents in Depth (book) | Book | Evidence only; not in the study's list (owner item 85) |
| Automata: failure and next-step prediction | Paper | Relevant: failure recognition (Level 2 failure) |
| AutoSaddler | Paper | Relevant: validated self-changes touch authority (growth file) |
| EvoHarness-RL | Paper | Relevant: external state and memory placement |
| herdr | Code repository | Relevant: liveness and blocked work. Software-factory tooling. |
| Hermes Agent | Code repository | Relevant: gateway, scheduled runs. Software-factory tooling. |
| Hermes Agent Self-Evolution | Code repository | Level 3 optimiser method |
| JIT-Agent | Paper | Level 3 method |
| Pi Agent Harness | Code repository | Relevant: permissions and containment. Software-factory tooling. |
| Prime Agent | Paper | Relevant: recovery and verification |
| Refactoring UI (extract and PDF) | Book | Visual design only; Level 3 |
| SKILL.state | Paper | Relevant: explicit execution state (waits) |
| Small language models at the edge | Paper | Level 3 |
| Supermemory | Code repository | Relevant: memory and context |
| Universal Principles of Design (extract and PDF) | Book | Design principles only; Level 3 |
| Utopia | Code repository | Relevant: knowledge governance and trust |

Open questions from the inventory: whether Level 2 may cite code repositories as concept evidence (owner item 85); whether AI Agents in Depth is added to the harness study; and whether the three repositories count as software-factory tooling. Read in the inventory only: headings, README openings, and file types.

---

## M. Rejected findings, with reasons

- **Harness study claims that conflict with Level 2** (section G): not adopted, because Level 2 governs.
- **Research claim: a lead is a stage** (RES-27): not adopted. Level 2 says a lead is an entry point.
- **Software factory: the production toggle contradicts itself** (SF-2): false. The file is consistent.
- **Quoted Product Vision sentence** (AUTH-22): not found in Product_Vision.md. The research brief needs correcting.
- **Rejected options per decision** (PV-14, JGP-13): the owner ruled that alternatives belong to the technical architecture (Level 3).
- **Calibrated uncertainty as a detector** (TRUST-38): Level 2 forbids made-up numbers.
- **Dormant reactivation as a rule** (RES-32): a follow-up type for the backlog, not a rule.
- **OWASP and MCP identifiers; agent counts** (SEC-29 in the research): not verified, and not used in the architecture.

---

## N. Level 3 handoff items

The logical design leaves these to Level 3. Each one is named so it is not lost.

- The storage products, queues, and providers (PV-32; HAR-28 to HAR-31).
- The field-to-store map and the data classification (security F32).
- Idempotency keys and trace field names: they appear in Sections 6 to 9 and should move to Level 3 (PV-33). The logical rule stays: a repeated action is recognised as the same action.
- The test suites: the full test matrices, named suites, the two-shop test per branch, and the pre-release golden run (SF-7, SF-8, SF-10; security F23).
- Release obligations: the reproducible build, the catalogue hash, and the kill switch per release (SF-9, SF-20).
- The escalation channel details and the delivery and acknowledgement meaning per channel (AUTH-14, COMM-30).
- Performance expectations (PV-13).
- The attribution ladder for change (JGP-54).
- The visual, perception, and design-language items (PD-19).
- Level 2 mechanisms: state-transition tables, the optimiser tool class, the template formats, and the validator placement (JGP-35).

---

## O. Corrections made in this pass (file level)

- **Section 6:** the Level 1 quotation (event); "understanding asks nobody"; the conflict order (product default labelled); the deferral reasons (Level 2's six); the explanation rule; the interim message (before a promised time is missed); the policy change (a notice and re-check wait; a revoked grant at once); the owner snapshot; the PROPOSE step; the status-check bound; the learning group; the memory group; the never-memory and acceptable-learning lists; the customer relationship rules; the Level 1 rules; the security group; the money group; the degraded-service group; the invariants and workflow group; the traces group; the source-tag wording at the top; the training rule (recorded earlier, to confirm).
- **Section 7:** the simulation environment; the owner's view (Section 6 list); the parts' writes; the "Owns" entry for memory; the graph-database sentence removed; the sent-record entry (Level 2 states the need); the admin is the configurator; the record checks (recorded earlier); the first-version writer (open); the trusted-store writer; the policy lifecycle; the channel order (owner item 14); the source order; the run steps and the observer; the Product Vision wording.
- **Section 8:** the run order; the identity sources; the two writers and the communication layer's record; the sends and announces wording; the match rules (two situations at once); the no-source rule (only that request stops); the denial wording; the fetch approval (the StepUp check); the nurture-wait cancellation (open); the explanation rule; the interim message; the consent and transfers group; the communication, waits, and records group; the reopen and proposal-limit lines; the status-check wording; the "no personal data in a trace" rule (marked as architecture rule); the source order.
- **Section 9:** the intake and communication-layer boundary; the seven variation axes; the source-tag wording; the configuration-change wording; the product design and growth group.
- **Section 10:** the concluding audit section; the rewritten Result; the status corrections (rows 15, 20, 50, 91, 111, 177, 183, 198, 200, 220, 237, 308, 325, 336, 354, 365, 388, 394, 441, 474, 533, the recorded-earlier heading, and rule 52); the "Result in brief" bullets; "Still to finish".
- **Construction record:** the Section 16 header; entry 17 (this pass, with the owner's words, and the Level 2 provenance).
- **README:** stale rows (CASE count, Section 7 tranche, "Kanban", IA-8, "Two conflicts"); a new section listing this register and the walkthrough.
- **Settled-items page and the how-Tend file:** doubled words, and a fragment rewritten as a pointer.
- **Level 2:** not edited. The owner's files are listed in Section 10 under "Level 2 wording to change".
