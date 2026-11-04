---
name: feedback-section12-output-shape
description: "Section 12 must add a build view (one file per component) on top of all method views, with human + agent file layers and two audits after every write"
metadata:
  node_type: memory
  type: feedback
  originSessionId: f33b43c6-25be-43bb-90b7-01f2e00c7d4f
  modified: 2026-10-16T11:26:18.346Z
---

Section 12 of the architecture construction method is to be evolved, not reshaped: keep every view 12.4/12.21 asks for, and add a build view. The build view is one overview file plus one dedicated file per component (not one big file like Kirana-Management-TeleChat/docs/system_Architecture.md, whose per-component clarity is the model to match).
Each output has two layers like sections 6–11: a plain human-facing file following `conversation with swaraj.md`, and agent-facing hidden-comment codes/references (code index style).
After writing anything in Section 12, run two Haiku (default model) subagent audits: (1) against `conversation with swaraj.md`; (2) against the architecture folder (the constructed foundation), cross-checking the wider knowledge base when needed.

**Why:** Tend has many storylines and must adhere to that flexibility; a single-flow Kirana-style plan would throw away the reasoning of sections 6–11. Every view gives a different kind of clarity (how to build vs how parts interact).
**How to apply:** Component files must show the part's behaviour across all storyline types, not one happy path. Related: [[feedback-subagent-usage]]
