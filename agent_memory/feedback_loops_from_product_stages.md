---
name: feedback-loops-from-product-stages
description: "Design Tend's loops from the product stages (understanding, routing, gathering, deciding…), each an independent component with its own exits; not the harness/research-paper pattern. Name things by what they are."
metadata:
  node_type: memory
  type: feedback
  originSessionId: 26ac75ff-2e59-43b9-8042-d540cba1698c
  modified: 2026-10-29T08:59:47.098Z
---

Swaraj is "first and foremost a product engineer". Tend's loops must be built from the product stages of Level 1 and Level 2 (understanding, routing, gathering information, weighing evidence, deciding, acting or communicating, waiting). Each stage is an independent component of the loop and can either pass to the next stage or end the loop there; inside, a component may run any loop it needs (even ReAct). The harness study's pattern (code → AI proposes → code checks → act → go round), with packages placed before AI turns, is "a technical solution a software engineer would come with" and is rejected as the loop's shape.

In the conversation manager, understanding is the main component: memory and knowledge first establishes what the words mean (e.g. the Diwali sale's dates), understanding reads the message (a greeting gets an immediate reply and the loop ends), memory and knowledge then filters the sender's situations by what was understood, and understanding decides where the message fits and writes a reasoning artifact. Routing is code that carries that artifact out.

The harness study (`knowledge_base/agent_harness_study.md`) is not the design of the conversation manager and situation worker loops. Its purpose is to discover the kinds of LLM interaction loops (e.g. one-shot bounded artifact; classify → verify → resolve → clarify; strategic plan → verify → execute → decide; supervision) so each product stage's inside can use the right one, and the custom product loop orchestrates the LLM calls. Only its Parts 6 and 11 drafted whole loops ("a candidate to be challenged, not a decision"), and those drafts are what went wrong.

**Why:** On 29 Oct 2026 he said the loops "do not look natural to me", that he has said so in every message, and that calling the conversation manager's work "routing" when it was mostly understanding left him unable to follow. "Clarity of language is of utmost importance… I need to be in charge, I need to understand as well."

**How to apply:** Before any loop design, first walk each stage as a capable human employee would do it, then engineer it. Name every heading, step and term after what it actually does; one name per thing; no codes (R1, W0) in visible text. Related: [[feedback-understanding-before-action]], [[project-memory-loop-redesign]].
