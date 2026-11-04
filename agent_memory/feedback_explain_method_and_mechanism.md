---
name: feedback-explain-method-and-mechanism
description: "Tell him what was done and how, with the real mechanism tied to what he knows; results alone or metaphors alone stop him learning"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 546557b3-1f11-48e4-931e-7e7667d4f104
  modified: 2026-11-04T16:44:38.560Z
---

When teaching or reporting a finding, say what was done, how it was done, and what the real mechanism is. Do not hand over results alone, and do not let a metaphor stand in for the technical explanation.

**Why:** Swaraj, 4 November 2026, after lesson 7 described a WebSocket as "a phone call" and said the object sleeps: "Do not just tell me the results. Tell me what you did, how you did it, how am I able to understand and grasp, how I am able to evolve when you just sort of give me these things which I cannot even understand and I cannot make connections to." He also said the explanation was "highly metaphorical, no technical description".

His doubt was right on every fact, and testing it exposed a real bug: the lesson's page had no heartbeat.

**How to apply:**
- Give the steps of the experiment: what ran, what was measured, and how that shows the claim.
- Give the mechanism in real terms: which process, which connection, which line of code.
- Connect new things to what he already knows: Python, Kubernetes, pods, and Pydantic.
- When his experience clashes with a claim, test the clash. Do not defend the claim.
- A metaphor may be added after the mechanism, and never instead of it. Better still, leave it out, and show the real bytes or the real output. Swaraj, the same day: "What are you explaining about one-way radio and two-way radio? Explain me how, why, exactly. This is not how you teach me stuff."
- Say plainly what could not be tested.

Related: [[feedback-product-names]], [[project-factory-learning-first]].
