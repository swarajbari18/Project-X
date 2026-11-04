---
name: feedback-ai-scope-set-by-code
description: "The AI reasons inside a scope that code sets; it never engineers its own context, and never sees database or store IDs"
metadata:
  type: feedback
---

On 2026-11-04 Swaraj said: "AI can reason over, but AI cannot engineer the context … the permission to engineer context itself, if AI has to do it, should come from the code itself." And: "AI should never read or know the database IDs or any store ID or anything, right? It should always be out of its context." He said this while discussing a cross-business idea he then scrapped, but the rule stands alone.

**Why:** a model that can name a store can be talked into asking for the wrong one.

**How to apply:** in every plan, code chooses what a stage may see, and any handle the AI uses is a short label for this run, which fixed code maps back. **Worth checking in the conversation manager's plan:** the design's understanding artifact names situations by ID ("what it is considering (IDs, each presented in this run)"). Those should become per-run labels. Related: [[feedback-understanding-before-action]], [[project-situation-record-rulings]].
