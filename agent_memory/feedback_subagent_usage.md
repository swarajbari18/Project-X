---
name: feedback-subagent-usage
description: "How to use subagents in Project-X architecture work — default model/effort only, gathering not synthesis, Claude orchestrates"
metadata:
  node_type: memory
  type: feedback
  originSessionId: f33b43c6-25be-43bb-90b7-01f2e00c7d4f
  modified: 2026-10-16T11:08:58.140Z
---

When running architecture work (e.g. Section 12), Claude is the orchestrator; the user is the owner consulted at decision points.
Subagents: never override model or effort (default is Haiku 5.5, default effort). Use them for gathering, locating sources, checking, classifying, and pressure-testing — never for synthesizing the architecture. Give few agents large, bounded jobs; ask for structured output with file:line citations; Claude spot-checks citations and does the synthesis itself.

**Why:** The user's main reason for subagents is keeping Claude's context free of raw tool calls; the method file (§2.3–2.4) says delegated synthesis is lossy extraction.
**How to apply:** Omit `model`/`effort` on Agent calls; write prompts as gather/verify tasks with return formats; keep judgement in the main thread. Related: [[work-env-execution-preference]]
