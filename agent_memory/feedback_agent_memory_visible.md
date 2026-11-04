---
name: feedback-agent-memory-visible
description: "Agent memory lives only in agent_memory/ at the repo root, on GitHub on purpose; never write memory under ~/.claude; never put a secret in a note"
metadata:
  type: feedback
---

All agent memory lives in `agent_memory/`, at the root of this repository, and nowhere else. Never write memory under `~/.claude`.

**Why:** Swaraj said on 2026-11-04: "Do not store it in your Claude memory file. Store it in somewhere I can see in this project itself." And: "I always have to find it in some hidden folder. I don't want that." The assistant created this folder, but kept writing to the hidden folder as well, so later that day he had to say it again: "I told you to write all the memories in the fucking root folder. Why are you still writing it in the Claude folder, .Claude folder? I cannot access that all the time."

He also decided it stays on GitHub, in the public repo: "No, just keep it on GitHub. Do not ignore it. We'll just save everything to GitHub", because the laptop can be compromised, and "No one is going to steal anything."

**How to apply:**
- Write each new or changed note here, and only here.
- `.claude/settings.local.json` sets `autoMemoryDirectory` to this folder, so Claude Code itself loads it. A fresh session was tested on 4 November 2026, and reported this path. That settings file is local to this machine, so on another machine, set it again.
- If he edits a note here, treat his version as right.
- Do not add this folder to `.gitignore`. The repo is public, so never write a secret, password or key into a note.

Related: [[feedback-working-files-location]], [[project-situation-record-rulings]].
