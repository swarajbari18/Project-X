---
name: feedback-agent-memory-visible
description: "Agent memory lives where Swaraj can read it: agent_memory/ at the repo root, on GitHub on purpose; write every note in both places; never put a secret in one"
metadata:
  type: feedback
---

On 2026-11-04 Swaraj said: "Do not store it in your Claude memory file. Store it in somewhere I can see in this project itself." He then decided it stays on GitHub, in the public repo: "No, just keep it on GitHub. Do not ignore it. We'll just save everything to GitHub", because the laptop can be compromised, and "No one is going to steal anything." Insights and research go in visible files, never only in the hidden memory folder.

**Why:** "I always have to find it in some hidden folder. I don't want that." He wants to check what is correct and incorrect, and he wants a copy off this machine.

**How to apply:** write each new or changed note to `agent_memory/` in the project, and to the hidden memory folder, which is the only one Claude Code loads by itself. If he edits `agent_memory/`, treat his version as right. Do not add it to `.gitignore`. The repo is public, so never write a secret, password or key into a note. Related: [[feedback-working-files-location]], [[project-situation-record-rulings]].
