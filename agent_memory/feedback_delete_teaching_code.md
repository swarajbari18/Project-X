---
name: feedback-delete-teaching-code
description: Code written only to teach Swaraj is deleted once the result is written down; it must not stay in the repo for agents to find
metadata:
  type: feedback
---

Code written only to teach Swaraj does not stay in the repository. Run it, copy the output into the lesson, and delete it.

**Why:** Swaraj, 4 November 2026: "Please remove all the experimentation code. There is no need of it, and it will only confuse the agent who will be working on it. And for the time it was for your learning to teach me, we don't need it anymore. Delete it completely."

**How to apply:**
- Lessons keep their measured output, and say plainly that the code was deleted.
- Never point a reader or an agent at a script that does not exist.
- The old `experiments/` folder was deleted on 4 November 2026. Do not recreate it. Its files are still in older git commits.

Related: [[feedback-explain-method-and-mechanism]], [[feedback-working-files-location]].
