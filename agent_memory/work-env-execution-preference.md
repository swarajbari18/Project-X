---
name: work-env-execution-preference
description: "User wants end-to-end execution with rigorous testing on the Zorin work environment; do not gate on the spec's baseline period"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 3fc6f859-fe47-46d6-a9fb-a5708760a31c
  modified: 2026-10-08T09:51:45.330Z
---

When the user asks to do the work environment ("go and do those things", "take agency"), execute it end to end and verify it live. Do not stop at a plan or defer rollout to satisfy the spec's 7-day baseline.

**Why:** On 2026-10-08 the user said they wanted Phase A active immediately, that activity data does not matter, and that ActivityWatch should populate on its own over 7 days. I had held back the visual changes citing the spec's baseline rule, and the user rejected that as a blocker. They also said they are not unhappy with the work, but want it delivered completely.

**How to apply:**
- Make the changes live, then prove them with `verify.sh` (exit code), pixel checks on a portal screenshot, and control tests. Settings alone are not proof.
- Keep the spec's Phase A design (no hard blocking). Skip only what the spec defers as "eventual" (work shell, guardian layer).
- Report what cannot be verified (e.g. the black wallpaper while windows cover the desktop) and say so plainly.

See [[work-env-phase-a-state]] for the current state.
