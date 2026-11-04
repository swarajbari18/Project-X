---
name: feedback-no-force-push
description: Never rewrite commits already on GitHub and never suggest a force push; if history must change, build it on a new branch
metadata:
  type: feedback
---

Never rewrite a commit that is already on GitHub, and never suggest a force push. If history has to change, build it on a new branch, which pushes normally.

**Why:** Swaraj, 4 November 2026: "I will not do git push force with lease. This is not what we do. This is a bad practice." He had asked for commits to be spread across days. The assistant moved the existing branch back to main and rebuilt it, which left GitHub's copy and the laptop's copy with different histories. It mentioned the force push in one line, and never asked. A new branch would have done the same job with no force.

**How to apply:**
- Before any `git reset`, rebase or amend, check whether the commit is already on GitHub. If it is, make a new branch instead.
- If a change would make a force push necessary, say so before doing it, and offer the option that avoids it.
- Commits that exist only on this laptop are not on GitHub. Say so before anyone deletes a branch.

**What happened next:** on 4 November 2026, the work was pushed normally to a new branch, `situation-registrar-plan-1`, with no force. Swaraj told the assistant to run those commands that one time, so "I push myself" still stands unless he says otherwise. Claude Code's safety check blocked the assistant from deleting the old branches, so that is left for him.

Related: [[feedback-ask-before-acting]].
