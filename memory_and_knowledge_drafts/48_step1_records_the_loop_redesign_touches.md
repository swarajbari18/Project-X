# Step 1: the decided records the loop redesign touches

29 October 2026. Written before any design, so nothing decided is overturned by accident (the mistake of the morning, when the 3 October rule was overturned and caught only later).

Each row: the record, what it says, and whether it **stays**, **changes** (with whose words change it), or is a **conflict** only Swaraj can settle.

## From the harness study

| Record | What it says | Outcome |
|---|---|---|
| Purpose (Status, "Why this file exists") | "Nothing in this file is adopted architecture — it is the evidence base and the alignment map for the loop drafting that follows." | **Stays**, sharpened by Swaraj (O10): the study catalogues kinds of LLM interaction for each stage's inside. |
| Part 3 finding 2; Part 5 item 6 | Every component loop is an instance of the per-step contract (state, observation, AI proposes, code validates, apply); each loop is classed strategic, bounded-artifact, supervision or one-shot. | **Stays**, applied inside each stage. The four classes are defined in the new design (they were never defined beyond one line). |
| Part 3 finding 3, corrected by the 14 Sept research | "The harness is the highest-leverage act for determinism and adherence-shaping; the model + context + output-spec are the highest-leverage acts for quality." | **Stays.** It is why the harness fixes what may happen and what counts as done, and each stage's inside is left to reason from live evidence. |
| Part 6 (the conversation manager's loop) and Part 11.3 (the worker's per-wake contract) | First drafts: WHO → MEANING → VALIDATE; WAKE → PROPOSE → VALIDATE → EXECUTE → UPDATE. "A candidate to be challenged, not a decision." | **Changes** (O1, O2, O10): replaced by the product loop's stages. The study is rewritten without them. |
| 11.2.1 memory as observer and loader | Memory observes the loop and loads each stage its own context. | **Stays** (now memory and knowledge; packages before stages). |
| 11.2.2 routing slice | The router never scans all situations; candidates by structured scope. | **Stays**, inside understanding's wider look. |
| 11.2.3 two classes of writes; links written at discovery | State writes synchronous; learning async. | **Stays**, with the 28 October change (links in the background) already declared. |
| 11.2.4 the loop decides to loop, code first | "The LLM never decides to continue." | **Stays**, extended: code picks every pass, skip and exit from the stages' structured artifacts. |
| Fork A (4 Sept) | Gather is a behaviour; one bounded pass; returns to the decision; sufficiency never judged inside gathering. | **Partly changes** (O2, Level 1's order "understanding, gathering, deciding and acting"): gathering becomes a stage the loop passes through, before deciding, and deciding can send it back for a named need. **Stays:** one bounded pass; sufficiency only in deciding. |
| Fork B (4 Sept) | The worker never sends; it writes the situation; the conversation manager decides whether to tell; the communication layer expresses. | **Stays.** New: the arrival loop's reply ending also goes through the communication layer. |
| Fork C (4 Sept) | Progress = the structured evidence-state predicate; the AI's own claim of progress never counts. | **Stays**; it bounds every stage's inner loop. |
| 10.2.2 memory is an independent component | "we need memory as another independent component which interacts with other components of the agent" | **Stays.** |
| 10.2.3 no model-generated numbers in control | Scores over language never decide. | **Stays.** Effort may never be set by a model's rating of difficulty. |
| 12.4 the acknowledgment policy | "the Communication category's ten purposes + seven deferral conditions … applied to acknowledgments". | **Stays.** |
| **Part 13, 5 Sept: the conversation manager answers directly** | "If the conversation manager feels that the situation model itself has enough information to answer the user back, it just does that." | **Restored.** It never reached Sections 6 to 12 (no file carries it). It becomes understanding's "answered from what the situation holds" ending. |
| Part 13 compute | Conversation manager = per-business Worker; situation worker = per-situation Durable Object; one shared versioned record; compare-and-swap on the version. | **Stays** (Level 3 facts the build agents need). Kept in the rewritten study. |
| Part 14 constitution layers | Universal core; **stage constitution per loop stage**; runtime preferences; assembly templates owned by memory and knowledge. | **Stays.** The new stages are the stages these layers name. |
| 14.1.3 step instructions | Belong to memory and knowledge, not the constitution. | **Stays.** |

## From Level 2

| Record | What it says | Outcome |
|---|---|---|
| Level 1, "Tend must continue work…" | "re-enter the normal process of understanding, gathering, deciding and acting" | **Stays.** It is the product loop's order. |
| Product Vision, "Understand before acting"; "Let the system make predictable decisions" | Never act before understanding; code decides what rules can. | **Stays.** |
| Understanding page | "Understanding works with what is already available. It does not fetch new information … does not ask business systems … does not ask an actor." | **Stays.** Understanding may use only what Tend holds (memory and knowledge); reading an outside system is gathering. |
| Gathering page | "Understanding is not Gathering … Gathering is not Trust and Evidence … Gathering is not Decision Making." | **Stays.** Each is its own stage. |
| Communication, "When should Tend communicate?" | Ten purposes; "Tend should not communicate merely because it can produce words"; no receipt-only reply; 25 Sept: no receipt on a first inbound; a material committed change is told. | **Stays.** A reply to a greeting or a general question is not a receipt: it answers what the person asked. **Changes** (O5, O12): today every outward message comes from a saved change to a situation; a message that is not about the business has no situation, so a new path is added: the conversation manager's reply decision, saved with the arrival. |
| Communication, the update decision (9 Oct) | "The conversation manager decides whether an update is worth telling the person." | **Stays.** It is the update loop's deciding stage, and it decides the reply to a message that ends at understanding. |
| Same-situation page; ambiguity page; relevance page | Interpretations, then routing; tiered assignment; "Ignored is not deleted". | **Stays.** |
| Memory and knowledge design (28 Oct, Swaraj's words) | A package before each part of each loop; memory AI "should run at every part of the loop. If not for injecting something, at least for observing it"; "if in decision it has said that now the loop ends, then obviously the memory will not run, because it would just be a wasteful run". | **Stays**, applied to the new stages: a package before each stage that reasons; stages that are fixed code are observed, not served (a package nobody can use would be "a wasteful run"). |
| Memory and knowledge design (29 Oct) | Points R1, R2, R3; W0 to W3; C1; "ROUTING AI (reading)" and "(choice)". | **Changes** (O6, O7, O8): the choice is understanding's; routing has no AI; R3 goes; W2 goes (acting is code); points are named by the stage they precede, without codes. |
| Decision 32 (29 Oct, Section 12) | The conversation manager writes a reading before it routes; candidates from it; code or the AI chooses. | **Changes:** the "reading" becomes the understanding artifact; the choice moves into understanding; routing is code. |
| Decision 33 (29 Oct) | Using knowledge is separate from showing records. | **Stays.** |
| 3 Oct agreed rule | A past purchase lets routing see a small set of the sender's own finished situations. | **Stays**, inside understanding's wider look. |
| Test 46 (29 Oct) | "thanks!" with nothing open: "No reply is sent by default." | **Changes:** the when-to-communicate test decides; a greeting gets a reply (O5, O12). |

## From Section 12 (to be reworked, not overturned)

| Record | What it says | Outcome |
|---|---|---|
| Decided 10 Oct: what the conversation manager contains | It contains the intake step, the situation worker and the communication layer. | **Stays.** To avoid "the conversation manager's loop" meaning two things, the loops are named by what starts them: the arrival loop and the update loop (run by the conversation manager), the situation loop (the worker), the message loop (the communication layer). |
| Section 7 rejection | "one part for each group of responsibilities" | **Stays.** Stages are components of a loop, not parts that own records. |
| Interaction 8's send check, rule 1 | "Tend has a saved decision to send this message" | **Changes:** the saved decision may also be the conversation manager's reply decision, saved with an arrival that is not about the business. |
| Decided 22 Oct | An arrival Tend cannot place goes to the person the business named for it. | **Stays.** It is where routing's failed check goes. |

## Conflicts only Swaraj can settle

None found that his words, Level 2 or the Product Vision do not settle. Two calls are made in the design and marked as calls:
1. How far Tend answers a general question for a customer (a short answer by default; the business may narrow it). Source: his "capital of India" and "simple mathematics" examples, and Level 2's "unrelated, unbounded or prohibited communication remains outside Tend's permitted behaviour".
2. A thank-you or an "ok" that answers nothing: whether to reply is left to the when-to-communicate test, not set by default.
