---
name: feedback-kb-write-audit-sequence
description: "When writing a knowledge-base file 'completely': readability audits by subagents + own full reread, own technical audit, re-audit, then a fidelity audit against the whole conversation"
metadata:
  node_type: memory
  type: feedback
  originSessionId: e9c6a5a4-94f2-498b-9e8c-8abde551dc93
  modified: 2026-11-01T11:57:11.427Z
---

On 2026-11-01 Swaraj set this order for writing a knowledge-base file: write it completely; audit readability with subagents (default model, read-only, split by section, against `conversation with swaraj.md` and `file_writing_instruction.md`) while rereading the whole file yourself; do the technical audit yourself (verify outside facts against sources); apply fixes, then re-audit with the same agents; only then check the file against the whole conversation, which "should either expose thing or expose that you have done a great job", and handle the result completely.

**Why:** he wants the written record to be readable by him, technically right, and faithful to what was actually said. The fidelity check on 1 Nov exposed real omissions (his own statements, dropped first-pass items, an over-claimed "Decided"), so it is not a formality.

**How to apply:** follow the order; report each audit's findings honestly, including what the final check exposed; mark statuses (Decided only for his own words or yes); keep his quotes word for word. Related: [[feedback-subagent-usage]], [[feedback-section12-output-shape]], [[project-factory-learning-first]].
