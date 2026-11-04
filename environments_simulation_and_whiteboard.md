# Environments, simulation and the whiteboard

This file says where Tend runs on its way to customers, how it is tested before it gets there, and how Swaraj sees what it is doing. Swaraj asked for it on 4 November 2026, because these ideas were "scattered around".

**Status.** Each point carries one word:
- **Decided:** Swaraj said it. His words are quoted, with obvious dictation slips fixed in square brackets.
- **Proposal:** the assistant's addition. It waits for his yes.

The factory file carries a short version of this. This file holds the detail.

**Words used here.**
- **Tend** is the product. **The factory** is how Tend gets built: learn, plan, translate, review, record, for one component at a time.
- A **component** or **part** is one piece of Tend. The first one being built is the Situation Registrar, which saves each business problem's history. Older files call it the situation record.
- **Meera** and **Priya** are made-up customers used in Tend's stories. A **story** is one worked example Tend must handle correctly.
- **Level A** is Tend's permanent record of what it did. **Level B** is a temporary, detailed record of what the code did, kept only for review.
- A **Durable Object** is a small Cloudflare program with its own private SQLite database. **SQLite** is a small database kept in one file. **D1** is Cloudflare's SQL database.

---

## Why this exists

Swaraj's reason (**Decided**): "Stories and simulations are the only thing that will save us from creating slop of a product that no one will use."

He also cannot follow this work in a terminal: "If I do this in the terminal, it would be extremely impossible for me to track how the states are changing." And: "scrolling endlessly at the terminal itself has some character limits. It is just useless."

So testing and seeing are one job. A test Swaraj cannot watch does not teach him anything, and the factory exists to make him an engineer.

---

## The road to customers (Decided)

```text
 1. LOCAL ──────▶ 2. SIMULATION ──────▶ 3. BETA ──────▶ 4. PRODUCTION
 Cloudflare's      Real Cloudflare,      Real Cloudflare,   Real customers
 tools on this     simulated people      a few real people
 machine           and businesses
```

| Stage | Swaraj's words | Who is in it | Moves on when |
|---|---|---|---|
| Local | "we will use all the Cloudflare local development technologies, whether it be Cloudflare Tunnel, Cloudflare Workers, whatever it is, we'll try to run it locally" | Scripted actors | The component's tests pass |
| Simulation | "it is just the beta environment with our simulation agents and our simulation environment on top of it, with our simulation observability and traceability stack on top of it" | Agents playing everyone | "first evaluate, to measure, to gain evidence, and then to show that this is how I know this will perform good" |
| Beta | "we check everything of how the consumer will see it … What the consumer will see, what the consumer will experience" | A few real people | Swaraj is satisfied with what they experience |
| Production | "after those points will we push that to production" | Customers | — |

**Each stage is separate (Decided).** "the environments themselves will be different. So databases etc. will be different. So in production the businesses that we have, those businesses will not exist in beta, and those will not exist in simulation."

**Branches (Decided).** "main branch should carry the simulation. On top of that, we'll have to have some beta and a production branch or whatever, but this is something to be done later."

---

## How much gets built (Decided)

"We are not building some sort of a demo or something. We have to build everything, right? So it might not be complete in like one plan, but one component might have different multiple plans that build on top of it."

So a component is finished when all of it works, however many plans that takes. The first thin slice is still the first end-to-end check. It is no longer a limit on how much of a component gets built.

---

## The simulation (Decided)

**Everyone is played by an agent.** "Simulation will have an agent as Priya, an agent as Meera, an agent as 50,000 different agents, let's say, right? And we have an agent for the owner, we have agent for the employees, etc., everything."

**Different kinds of everyone.** "We'll test for 2-3 different types of businesses. In that, we'll test for different types of customers, different types of employees. Some employee might be grumpy, some might be nice and good, some might cause their owners a lot of troubles. We'll test with multiple personalities of owners."

**Built piece by piece.** "Every component will build its own part of the simulation layer."

**What it is free to do.** It is "not bound by any compliance", because "It is our environment, it is my environment, where everything is done is being done by our agents."

**What it gives back.** "high quality of traces of agent runs, from which we can use to tune our LLM's reasoning for product learning, right? Not business learning." It shows "how the memory and knowledge layer is learning, how each component is interacting with each other, how the LLMs are performing, how our prompts are performing."

**What happens when you click start (Decided).**
- "Simulation is just for me where every single thing is simulated, all the businesses are simulated, all the data is seeded."
- A business starts as any real one does: "with empty data, which will we first go through our configurations cycle, the onboarding thing, how we log in, how we log out".
- "Once we start the simulation, I just click on start. Our agent comes up. It asks for the onboarding. I do not type anything. We have an owner who is a simulated agent. We gave it a personality. He goes and types everything in, and we just observe what is happening."
- "Every single thing will be an agent. Wherever a human input is required, that would be agent. Employee would be agent. Owner would be agent."
- Only product builders can see it and step in: "Only I, as the product builder, or the other engineers who are working on it, or you are also a product builder in that sense, will be able to see this and will be able to interact. Where interaction of product builder is necessary, the product builder will not be simulated."

**How "seeded" and "empty" fit (Decided, Swaraj confirmed).** The business starts empty. The world around it is seeded: the customers who will write in, their orders in the simulated order system, the simulated carrier and payment provider.

**Sign-in and onboarding come later (Decided).** "I don't think they have to worry about sign in and onboarding at this point. It will happen after everything is built, when we start to interact with this." So early simulations start with a business already set up. The click-to-start above is where this ends up.

**Simulation uses real AI models (Decided).** "simulation, I want AI models. I don't want an excuse that since test cannot have randomness and we put simulation in end to end." So a story never replaces Tend's AI with something fake to make the result repeat. It is checked on what must always be true, not on exact words. Lesson 3 explains how.

**Stories only check.** Stories "do not inspire build. They confirm whether our build is correct or not." They live in `story_registry.md`.

---

## The whiteboard (Decided)

This is the name used here for what Swaraj described. He has not named it.

**What he wants to see.**
- "I want to see my components on a whiteboard. I want to see them light up. I want to click on it. I want to see the states, how they went through, what was the data coming in, what did it process, what was the data going out, all the states."
- "when Meera says I want to track my refund, I see how the message is going. I see the conversation manager block lighting up, right? I see what is happening there. I see the situation record block lighting up. I see the memory knowledge layer block lighting up, what they are contributing to the context."
- "I should see a context window, whatever is happening. How is the processing going on? What is the reasoning that the agent is taking?"

**Walking through a finished run.** "Even if after the test has been completely run, I should be able to walk through it like part by part, like how in VS Code, if you want to run a program and you just click on a red dot, you can walk through it, right? Like by pressing the next button, you can walk through each of the states."

**Everywhere, not only in tests.** "even in the testing and even in the production environments, we need a observation UI UX, so that I can see the changes in the states."

**While developing locally (Decided).** "while I'm running something local, right, in that development process, instead of reading the logs from my terminal, I would rather have it on some sort of a local UI, right? So that might not be logged, it just might be stored in the SQLite file or a JSON file or whatever, and it can be just shown to me."

**Where the data sits.** Decided: state changes are not shown in the terminal. The SQLite file is his suggestion: "it might be storing into the second type of logs which are there to see the state changes, might be a SQLite file then, right? We do not show them on the terminal. Those logs are a SQLite file that we can just track and show on a proper UI/UX." The "second type of logs" means Level B.

---

## What the plan still needs (Proposals)

Swaraj asked for gaps to be found. These came from reading the plan against the design. The first has since been decided by Swaraj. The others are not decided.

**1. Same code, separate resources (now Decided).** "Simulation is just beta" cannot mean they share databases.
- If beta's real people and simulated agents shared storage, "not bound by any compliance" would be false for the real people's data.
- The security research records this exact failure: a test copy of the code was connected to the real customer database, so engineers ended up chatting with real customers.
- The architecture already has the rule: the simulation environment "runs on seeded test data only, never on real business data. The builder sees everything there, because none of it is real."
- So simulation runs the same code as beta, with its own databases, its own keys, and only made-up data.

**2. Simulated outside systems.** Swaraj's list covers people. Many stories turn on a system instead, so these need simulating too:
- a carrier that goes quiet (kind 2);
- a payment provider that never answers (kind 1);
- two sources that disagree (kind 9);
- WhatsApp changing its rules (kind 12);
- an MCP server that changes its tools.

Each keeps its own ledger, so a test can compare what Tend claimed with what really happened. This matters. In the research, an agent closed 140 refund tickets, and 41 of those refunds never reached the payment system.

**3. A clock the simulation controls.** Priya's follow-up is due Thursday at 10:00. A refund can take days to become final. A three-day wait cannot take three days to test. So no code reads the time directly. It asks one clock, and the simulation moves that clock forward.

**Open, not yet checked:** a Durable Object has an alarm that wakes it at a set time. Can that alarm be made to fire early in a deployed environment? The first plan must answer this.

**4. Breaking things on purpose.** The Situation Registrar's rules matter most when something fails. So the simulation must be able to do these on request:
- kill a part right after a save;
- drop a notice (the short internal message that a new version was saved);
- deliver a notice twice;
- slow a database down;
- deploy new code mid-run.

Without this, those rules are never tested, because a normal run never hits a failure.

**5. Two kinds of actors.**
- **Scripted actors** follow a fixed list of steps, with no AI. They are free, repeatable and fast. Use them for volume, and for this first component.
- **AI personas** are AIs playing the grumpy employee and the difficult owner. Use them for behaviour, in the tens.

Why not 50,000 AI personas? Tokens are the pieces of text an AI reads and writes, and each one costs money. Assume each person takes 5 turns, at about 2,000 tokens a turn. That is 50,000 × 5 × 2,000 = 500 million tokens for one run, before Tend's own AI calls. So, for a pure volume measurement, scripted actors can stand in for the people. Stories that check behaviour always run with real AI. The Situation Registrar has no AI in it, so its own load test needs none anyway. How to measure the whole system at 50,000 people is still open.

**6. Two ways of stepping.**
- **Walking a finished run** is always possible, because every event is saved in order. Each "next" shows the following event. This comes first.
- **Stepping a live run** means pausing real parts mid-flight. This only works if a scheduler in the simulation releases one event at a time. It is harder, and comes later.

To replay a run exactly, the store must also keep each AI answer, so a replay does not ask the model again.

**7. Production's whiteboard shows less.** Swaraj wants it in production too. The architecture limits what the builder, meaning Swaraj and the product team, may see there:
- "The builder sees only the masked and renamed views of what it built." So a real person appears as "Customer 1".
- "To see a live business's internals, the builder needs the business owner's permission."

So there is one whiteboard with two data sources. The simulation shows everything. Production shows only Level A, with names hidden, unless the owner has given permission.

**8. What simulation cannot prove.** The factory's study of Tend's AI says: "only a confirmed customer outcome says an ask was answered". A simulated Meera saying "thanks" is not that. So simulation traces are strong evidence about how the machinery behaved, and weak evidence about whether real customers are served. Tuning prompts only against simulated people risks a Tend that is very good at pleasing simulated people. Beta exists to catch this.

**9. Local cannot measure load.** Cloudflare's test tools run "fully-locally using Miniflare". That is right for logic, and wrong for throughput, because the real network and the real single thread under load are not there. So load is measured in the simulation environment only.

**10. Signing in, for an agent (later).** When sign-in is built, the simulation will need a test sign-in provider for its agents, which real people's accounts never touch. Swaraj moved this until after everything else is built.

---

## How the whiteboard could be built (Proposal)

The screen follows the language decision of 1 November:
- plain HTML, CSS and TypeScript, with no ready-made screen library;
- a small piece of code that updates the screen when values change (a signals module);
- a live connection from a Durable Object, which pushes new events to the screen.

**One store per run.** Each simulation run gets its own Durable Object, with its own SQLite file. A run is the unit here, just as a situation is in Tend. Nothing about a run ever enters a business's storage.

**One row per event.** The factory's review logger already records what happened, to what, which value changed from what to what, when, and under which rule. Each row would add the event's order number, which part did it, the situation and version it belongs to, and the data that went in and out. The research adds a reason to keep one record: a trace should be "designed backwards" from what will use it. So the whiteboard and later AI training read the same rows.

**The first version has five things:**
1. the parts drawn as blocks;
2. a list of runs to pick from;
3. a timeline, with next and previous;
4. the current block lit;
5. a click on a block shows what came in, what went out, and the state before and after.

The context window comes when the first AI step exists.

None of the five needs a live connection, because walking a finished run comes first, and it only reads saved rows. Lesson 7 tested a live connection for when you want to watch a run as it happens.

**Each component adds its own piece:**

| A component adds | Example, for this first component |
|---|---|
| Its block on the whiteboard, and what clicking shows | A situation's versions in order, its state, its waits, and each notice with where it went |
| Its scripted actors | Scripted writers that make the saves each story makes, with no AI |
| Its simulated failures | A crash after a save, a lost notice, a duplicate notice, a stale save |
| Its checks | A version reads the same forever; the book rebuilt from the versions matches the live one |

This component has no AI in it. So it can be built and watched completely before any other part exists.
