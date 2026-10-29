# Step 3: design, first version — the stages as components

29 October 2026. Built from Step 1 (records), Step 2 (the capable person) and the harness study read in full, with the two research gems (`research/quality_vs_determinism_conversation_and_discoveries.md`; `research/observability_explainability_and_finetuning_research.md`). This is version 1. `51_design_tests_and_levels.md` attacks it; the Level 2 page carries the version that survived.

## 1. The problem the design must solve (from the study and the research)

- **TeleChat ran one fixed pipeline for every message**: plan → verify → execute → verify → decide → respond, with bounded rounds. "hi" and an intricate question got the same machinery. Swaraj: "It would always go with the level of effort that has been coded or programmed into the harness."
- **Precise execution is not quality** (14 Sept research). TeleChat's three verifiers all passed while the answer was wrong; a colleague's prompt changes moved quality from 40 to 95 by loosening the corridor. The research's resolution: **the harness owns what may happen and what counts as done; the loop owns how to get there.** Quality comes from each step reasoning from live evidence, with a lean context, against a clear specification of its output.
- **The model must not set its own effort through the prompt** (Swaraj, O11), and no model-made number may steer control (study 10.2.3).
- **Tend is not an orchestrator pipeline** (Swaraj, observability research): "the harness is the whole system; the LLM is one component inside it"; the conversation manager is "itself a multi-component loop".

## 2. The principle

**The product loop is made of stages a capable person would recognise. The harness fixes what each stage may do and what its output must look like. The effort a message gets follows what it needs: stages with nothing to do are passed, any stage may end the loop when its finding makes the rest pointless, and inside a stage the AI reasons for as many turns as its job needs, within a code limit. Code chooses the path from the facts the stages wrote; the AI never chooses to continue, and no model-made score steers anything.**

## 3. How the AI is used inside a stage (from the harness study's sources)

| Kind | What happens | Study class | Sources |
|---|---|---|---|
| **Fixed code** | No AI. | — | Product Vision "Let the system make predictable decisions"; TeleChat's verify and execute in code |
| **One structured answer** | One AI call writes an artifact of a fixed shape; code checks it; a failed check returns once with its reasons; then a person | bounded artifact; one-shot | SKILL.state's step contract; TeleChat's planner JSON checked in code; Pi's argument checks, errors as data |
| **Choosing among what was shown** | The AI picks among items it was given; code checks the pick was shown; "cannot tell" goes to a person who can say | bounded artifact | TeleChat's draft resolver: classify, verify, resolve, clarify |
| **Plan, do and check, in rounds** | The AI writes steps with what each depends on; code checks and runs what can run; results return as claims; the AI writes the next steps; rounds continue only on progress, within a limit | strategic | TeleChat's orchestrator; Hermes' guards (repeats, no progress); Fork C |
| **Tool by tool** | The AI calls a read, sees its result, calls the next, until it stops or code's limit or the progress rule stops it | (the minimal loop; not classed by the study) | Pi; Hermes; the 14 Sept research: simple loops win because they reason from execution evidence at the moment of deciding |
| **Watching from outside** | No reasoning; keeps a named wait alive and wakes the work when something answers | supervision | Herdr; Prime Agent |

## 4. The loops (version 1)

The conversation manager contains the intake step, the situation worker and the communication layer (decided 10 Oct). Loops are named by what starts them.

### The arrival loop (run by the conversation manager, for each arrival)

1. **Intake** — fixed code. Saves; drops repeats; finds the person; one run per person at a time. A typed arrival with an exact reference (an outside answer to a wait, a claim sent from another situation) is placed by code and skips 2 and 3.
2. **Understanding** — one structured answer, then choosing among what was shown when needed. Package before it. Writes the **understanding artifact**: about the business or not; the asks; what each refers to, time words resolved; claims; unknowns; where it fits. Endings:
   - not about the business → reply, no situation;
   - nothing to do → kept in the person's message history;
   - can't tell → hold and ask;
   - otherwise → routing.
3. **Routing** — fixed code. Checks the artifact; attaches, creates, splits, or holds and asks.

### The situation loop (run by the situation worker)

1. **Waking** — fixed code.
2. **Understanding** — one structured answer, when there is free text to place.
3. **Gathering** — plan, do and check (or tool by tool for open research); one bounded pass.
4. **Weighing evidence** — fixed code.
5. **Deciding** — one structured answer.
6. **Acting** — fixed code (tool layer, wait writer, communication intent). Then go round or rest.

### The update loop (run by the conversation manager, for each new version)

Understanding the change → deciding whether to tell → hand to the communication layer.

### The message loop (run by the communication layer)

Writing → send check → sending and recording.

## 5. Memory and knowledge

A package before each stage that reasons. Code stages are observed, not served.

## 6. Open questions for the tests

1. Does the arrival loop need the 5 September "answer from what the situation holds" ending?
2. A message that mixes a general question with a business ask?
3. Does understanding always need two AI passes (meaning, then fit)?
4. When can gathering be passed? When can weighing be passed?
5. Where does the "plan" go?
6. Who writes the reply to a message that is not about the business, and what may it contain?
7. "hi" sent a second before "where is my parcel?"
8. Does the update loop need the AI?
9. What does memory and knowledge's AI part cost "hi"?
