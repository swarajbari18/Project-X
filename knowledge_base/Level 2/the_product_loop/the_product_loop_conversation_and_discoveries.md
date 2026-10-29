# The product loop — conversation and discoveries

Written 29 October 2026. What Swaraj said, what the work found, and what changed. The design is [how Tend's product loop works](how_does_the_product_loop_work.md); its tests are [the product loop's tests](the_product_loop_design_tests.md).

## What Swaraj said

He read the memory and knowledge tests and saw no understanding before routing:
- "understanding an routing are two differetn compont un the conversation manger loop is it not, or are thensame skelton as lets say the situation worker. we do not want that king of loop our loop is the philosophy with which we are working , noit echnical berst loop wrt the research parer"

He then said what the loop should be:
- "the loops do not look natural to me. The natural would be the way we have designed it, understanding, routing, gathering information, etc., etc. … I am first and foremost a product engineer."
- "just think you are the conversation manager, a human. A message comes to you. It says, look bro, I want to know the status of my refund on that Diwali sale product at airport. What happens there? First, you don't know what a Diwali sale is. How are you even going to route it?"
- "Each step had a option to whether go to the next step of the loop or whether to exit right there and there."
- "Routing, I don't think would be much of a LLM thing." "once it has understood, it generates a reasoning artifact that we can use as a JSON to route."
- "Clarity of language is of utmost importance … I need to be in charge, I need to understand as well."

He corrected the purpose of the harness study:
- "The purpose of architecture, the agent harness study, was not to create the conversation manager and situation worker. It was to find out what are the types of LLM interaction architectures that can help us make understanding, that can help us make routing, etc."

He named the problem the study was meant to solve:
- "Even the one I made with Kirana telechat did not give me enough flexibility to answer basic questions like I and to answer tougher, more intricate questions, both with varying levels of effort. It would always go with the level of effort that has been coded or programmed into the harness that we did not want."
- ("like I" is speech-to-text for "like hi".)

And the first understanding every message needs:
- "If I just say hi to my agent, it should obviously first not create a situation. … I just ask it for the capital of the capital of India. Or I ask it for a simple mathematics question. … no situation model even needs to be created for this … This message will only be a noise in our knowledge framework."

He set the method:
- "start with basics, then think one level up, then basically do your design test, and then think one level up. The design testing itself will reveal these layers of questions to you that you have to think through."

## What the work found

1. **The loops came from the harness study's first drafts, not from the product.**
   - Its Part 6 and Part 11 drew the conversation manager and the worker as one technical shape (code step, the AI proposes, code checks, act, go round).
   - The study called them "a candidate to be challenged, not a decision". Sections 7 to 12, and the memory and knowledge design, still built on them.
2. **The study already said what Swaraj said today.** It said every component loop should be "an instance" of the per-step contract, and each loop should be classed as strategic, bounded-artifact, supervision or one-shot. Those are kinds of LLM interaction for the inside of a component. They were never defined, and never applied stage by stage.
3. **A ruling of Swaraj's was lost.**
   - On 5 September he ruled: "If the conversation manager feels that the situation model itself has enough information to answer the user back, it just does that."
   - No file in Sections 6 to 12 carries it. The design restores it, with strict conditions.
4. **The research folder named the deeper problem** (14 September, "quality versus determinism"):
   - a harness can execute perfectly and still answer badly;
   - quality comes from each step reasoning from live evidence with a lean context, against a clear shape for its output.

   Its resolution: "the harness owns what may happen and what counts as done, the loop owns how to get there". The product loop is built on that line.
5. **Effort can follow the message without the prompt or a model's score.** Code chooses which stages run, and where the loop ends, from facts the stages wrote. A greeting costs 2 AI calls; the morning's design took 10 to 23 for every business message.
6. **The design tests changed the design twenty times.** The largest changes:
   - each ask is classified, not each message;
   - a reply to a message that is not about the business may say nothing about the business;
   - planning lives in gathering;
   - the ReAct shape is an explore step inside gathering;
   - a stage with nothing to do is passed, and its package carries over.
7. **Acknowledgement.** Level 2 already holds the analysis: "Tend should not communicate merely because it can produce words", no "message received" replies (25 September), and the ten useful purposes. A reply to "hi" or to a question is not a receipt: it answers the person. The design adds a reply decision for messages that are not about the business, which have no situation behind them.

## What changed

- **Level 2:** this folder; the memory and knowledge design and its tests (points named by stage; routing without AI; the reading renamed the understanding artifact); notes on the understanding pages.
- **The harness study:** rewritten as the catalogue of kinds of LLM interaction, the findings, the improvement machinery and the compute decisions. Its drafted loops are removed.
- **Section 12:** every view.
- **Sections 6 to 11:** not touched, on Swaraj's instruction.
