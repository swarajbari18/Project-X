# Research insights

This file holds what the research says about two things: how to keep databases from becoming Tend's bottleneck, and how to evaluate and simulate Tend. Swaraj asked for it on 4 November 2026.

**How to read the labels.** Nothing here is a decision.
- **Fact:** a source says it, and the source is named. Cloudflare facts come from its documentation, read on 4 November 2026.
- **My arithmetic:** I worked it out from a fact and an assumption, and the assumption is stated. It is an estimate until the simulation measures it.
- **My read:** my reasoning. Challenge it.

**Words used here.**
- **Tend** is the product. A **situation** is one business problem it is handling, such as Meera's late parcel. A **version** is one saved state of a situation.
- **D1** is Cloudflare's SQL database. A **query** is one read or write sent to it.
- A **Durable Object** is a small Cloudflare program with its own private SQLite database. It handles one thing at a time.
- **Single-threaded** means doing one thing at a time, so everything else waits in line. A **thread** is that one line of work.
- A **transaction** is a group of saves that all happen, or none do.
- A **binding** is how a piece of Cloudflare code gets access to a database.
- A **shard** is one piece of a database that was split up.
- **R2** is Cloudflare's file storage. **Queues** is its message service.
- A **trace** is the saved record of one run of work.
- **The harness study** is the knowledge base's study of the fixed code around Tend's AI.

**A correction.** An earlier message said Meera's reply "waits in line" during a campaign's 8 minutes. That overstated it. The table in Part 1 now gives the correct version. Lesson 1, in `knowledge_base/product design and engineering learning/`, teaches this from the ground up, with the arithmetic shown.

**What I could not find.**
- **Swaraj's database scaling research.** He remembered it being in the research folder. I searched the research folder, the whole knowledge base, the git history, and file names in his other projects. Nothing covers sharding or database scaling. `smb_vs_corporate_scaling.md` is about businesses, not databases. If it lives somewhere else, the assistant needs to be told where. Part 1 below is built from primary sources instead.
- **The token-saving research technique.** I found no passage that names it. The closest thing is the Prime Agent paper saved in `Things to look at/`. It describes processing context with code instead of reading everything into the model. So I fetched Cloudflare's docs as plain markdown with `curl`, saved them, and searched them with `grep`. Cloudflare's "Docs for agents" page recommends the same markdown format for using fewer tokens.
- **OpenAI's own post on Postgres.** The site refused my request, so that one point rests on news coverage, and says so.

---

# Part 1. Databases

## The one fact that changes the conversation

**Fact.** Each D1 database runs one query at a time. Behind each D1 database sits one Durable Object. Cloudflare's storage guide says plainly: "D1 and Queues are built on Durable Objects".

So D1 and Durable Objects are not two different kinds of machine. They are the same machine at two sizes. The real question is how much of Tend one single thread should carry.

## What each option can and cannot do

| | D1 | Durable Object with SQLite |
|---|---|---|
| Runs | One query at a time | One thing at a time |
| Throughput | At most 1,000 queries a second if each takes 1 ms; 10 a second if each takes 100 ms | About 200 to 500 requests a second when writing to storage |
| Size of one | 10 GB. Cloudflare: this "cannot be further increased" | 10 GB |
| How many | 1,000,000 per account; the first 100,000 included; $0.10 a month each after that | Unlimited |
| Total storage | 1 TB per account, raised on request | Unlimited on the paid plan |
| Where it runs | Apart from your code: "application code and SQL database queries are not colocated" | Inside your code's own object |
| Saving several things together | `batch()`, which is a transaction | `ctx.storage.transaction()` |
| When overloaded | Queues requests, then returns an "overloaded" error | The same: queues, then "overloaded". Cloudflare says not to retry it |
| Going back in time | 30 days | 30 days |
| Rows written | $1.00 per million | $1.00 per million |
| Rows read | $0.001 per million | $0.001 per million |
| Storage | $0.75 per GB a month | $0.20 per GB a month |
| Other charges | None | $0.15 per million requests, and $12.50 per million GB-seconds while active |

**Other facts that matter:**
- **There is no compute dial.** Nothing in D1 or Durable Objects lets you buy a bigger one. Cloudflare says D1 "is designed for horizontal scale out across multiple, smaller (10 GB) databases, such as per-user, per-tenant or per-entity databases".
- **Read replicas help reads only.** A read replica is a copy of a database that answers reads. "All write queries are still forwarded to the primary database instance." A replica may be out of date. Replicas are switched on one database at a time, so a busy business could have them while others do not. This is the nearest thing to scaling one business on its own.
- **A single Worker can hold about 5,000 bindings.** A binding is how a Worker reaches a database. I found no way for a running Worker to attach a newly created D1 database. The sources are undated community threads, and one says a new database did not appear until a redeploy.
- **Workers for Platforms gives each customer their own Worker.** It has no limit on scripts or on Durable Object namespaces. It costs $25 a month, with 1,000 scripts included, and $0.02 for each extra script. Cloudflare: "For complete isolation, you can create and attach a unique resource (like a D1 database or KV namespace) to every User Worker."
- **Where data lives.** D1 and Durable Objects can be restricted to the EU, FedRAMP data centres, or the US. **India is not on the list.**
- **Cloudflare does not host Postgres itself.** Hyperdrive makes your Worker faster at reaching a Postgres or MySQL database hosted elsewhere, such as Neon, Supabase or PlanetScale. Cloudflare points people there if they need one database of 1 TB or more.
- **Durable Object alarms.** Each object has one alarm at a time. It fires at least once, and it retries up to six times if your code throws. Cloudflare's advice is to keep a schedule in storage and re-arm the alarm yourself.
- **Cloudflare's own design rule.** "Model your Durable Objects around your 'atom' of coordination." An atom is Cloudflare's word for the smallest unit that must stay consistent. For Tend, that is one situation. Cloudflare warns against one object carrying everything. To track millions of objects, one parent keeps the full list. A search asks only the parent, and the other objects stay asleep and cost no compute.
- **Events.**
  - Queues deliver at least once, at up to 5,000 messages a second per queue.
  - K2 is a durable log, in public beta, keeping records up to 30 days.
  - Basin Pipelines and Basin Catalog (generally available) load events into R2 as tables that can be queried for reports. Iceberg is the format of those tables.
  - Workers Analytics Engine handles high-volume counters.

## How databases are scaled, and what Cloudflare offers for each

This is the standard ladder, cheapest rung first.

| Way to scale | What it means | On D1 and Durable Objects |
|---|---|---|
| Better queries and indexes | Each query reads fewer rows | Yes. This comes first, because query time is your throughput |
| Fewer requests | Send many statements in one trip | Yes: `batch()` |
| Cache reads | Keep a copy for reads | Yes, with KV. A cache may never guard a decision (Tend's existing rule) |
| Connection pooling | Share connections | Not needed; Hyperdrive does this for outside databases |
| Read replicas | Copies that serve reads | D1 only |
| A bigger machine | Pay for more power | **Not offered** |
| Move derived writes out of the way | Write what can wait later, in batches | Yes: Queues, then `batch()` |
| Split by job | Separate databases for separate kinds of data | Yes, and cheap |
| Split by row (sharding) | One table's rows across many databases | Yes. One database per business is this, and so is one Durable Object per situation |
| Age out old data | Hot, warm, cold | Yes: R2 |
| Separate analytics | Reports never touch live tables | Yes: Basin, Analytics Engine |

**What real companies did. These results are real, but none of them is Tend.**
- **Figma** split by job first. Its team called this "a relatively easy and very impactful scaling lever". It hit a wall when one table grew too big, so it then split rows.
- **Notion** split by workspace ID into 480 logical shards across 32 physical databases, and later moved to 96. A workspace at Notion is close to a business at Tend.
- **OpenAI** runs ChatGPT with one Postgres writer and about 50 read replicas, by news coverage of its January 2026 post. It did this by removing write spikes from that writer. Coverage says it uses other stores alongside it. So "you must always shard" is too strong. It holds when writes are the load, and Tend is write-heavy on purpose.

## My arithmetic: one D1 for one business

Assumptions: a read takes 1 ms, and a save takes 5 ms. Cloudflare says reads are under a millisecond with a good index, and writes take "several milliseconds". The common path, Meera's parcel, makes about 30 exact lookups and 3 saves.

| Question | Answer |
|---|---|
| Time on that one thread, per customer message | About 45 ms: 30 reads × 1 ms, plus 3 saves × 5 ms |
| Messages per second, if nothing else runs | About 22 |
| The same, keeping half spare as a safety margin | About 10 a second, or 36,000 an hour |
| A shop with 1,000 messages a day (my example) | About 0.01 a second. One D1 is plenty |
| An owner's campaign to 50,000 people: 50,000 first versions plus 50,000 versions with a wait | 100,000 saves, about 8 minutes of that one thread. Fired all at once, customers meet waits and "overloaded" errors. Slowed to half the thread, it takes about 17 minutes, and customers barely notice |
| Time to reach 10 GB at the harness study's 200 MB a month | 50 months |
| The same for a business ten times bigger | 5 months, and then a hard wall |

**My read.** One D1 per business is plenty for a quiet shop. It breaks when one business gets very busy. Giving each business its own database protects businesses from each other. It does nothing to protect a business from itself.

## The options

**Option A: all truth in one D1 per business.** This is what the harness study says today.
- **Good:** simple. One save can hold the version and the book entry together. Any question across situations is one SQL query.
- **Bad:** every situation in a business shares one thread. Every read of the newest version is a trip across the network. There is a hard wall at 10 GB.

**Option B: each situation's truth in its own Durable Object; one D1 per business for the list.** (**Decided by Swaraj, 4 November 2026.**)
- **Good:**
  - A situation is Tend's atom, so a campaign's saves run in parallel and never queue behind Meera.
  - Reading the newest version is local, inside the object. That is the read Tend makes most often.
  - The save, its waits and its pending notices commit together in one transaction.
  - No wall: 10 GB per situation, and unlimited objects.
- **Bad:**
  - A question across situations cannot go to the objects. It goes to the business's D1, and that copy is a moment behind.
  - A merge touches two objects, so it cannot be one transaction. It needs careful steps that can be repeated safely.
  - An erasure must visit each situation, using the list to find them.
  - Exporting one business's data needs a job we write ourselves.
  - The book of waits changes from "saved in the same save" to "a moment behind". The design's decision 22 says the book and the version are saved together. This softens that, so it needs Swaraj's ruling.

**Option C: truth in D1 and also in the Durable Object, written eventually.** This is what "loosely coupled writes" would mean if applied to truth. **My read: reject it.** Two stores would both claim to be the truth, and they could disagree after a crash. The design already rejected a record and a log that can disagree (decision 6). Also, Tend saves a started refund "before the AI is told". If that save were only eventual, a crash could cause a second refund.

**Option D: Postgres through Hyperdrive.** A real option for one giant database, but it adds an outside vendor and a network trip on every save. **My read:** it solves a problem Option B removes.

## The principle that settles the "loosely coupled" question

> **One truth for each fact. The save to the truth waits. Everything derived from it does not.**

- **Truth must be saved before anything continues.** A saved step, an ended wait or a decision can never be "eventually written". Under Option B this is cheap, because the truth is local to the object.
- **Everything derived is loosely coupled.** That means the list of situations, the book's shared copy, indexes, links found in the background, traces and analytics. They catch up in the background, in batches, and can be rebuilt.
- **Nothing decides on a derived copy alone.** This is Tend's existing rule: "The cache never guards a decision."

## Where each thing would live under Option B

| Data | Home | Why |
|---|---|---|
| Versions, state, outcome, reopened mark, the situation's waits, pending notices | One Durable Object per situation | The truth; saved together |
| The registry of situations, people and their channel addresses, person-to-situation links, typed fields and numbers, the book's shared list, links between situations | One D1 per business | Questions across situations; one query; rebuildable, except people and links, which are their own truth |
| Configuration: grants, settings, members | A second D1 per business | Small; a permission check must never queue behind a heavy read |
| Learned knowledge, its indexes | A third D1 per business, plus a vector index | Heavy reads; memory and knowledge mines here without slowing the loops |
| Skills, documents, message content | R2 | Large, written rarely |
| Traces, analytics | Pipelines into R2, then Basin SQL; Analytics Engine | Never touches live tables |

**Can the databases be separated?** Yes. This is "split by job". Because each D1 is one thread, separate databases really do run in parallel. The rule for where to cut: no transaction may be needed across the cut. At three D1 databases per business, the 100,000 included would cover about 33,000 businesses.

**Does a graph database help?** **My read: no.**
- The memory and knowledge design already says: "[Decided] Graph data, not graph structure. All of these are records that point to each other by ID."
- Links are rows in a table, with an index on each side. D1 is SQLite, so a query can follow links in one go, including a depth-limited `WITH RECURSIVE` (standard SQLite; I did not find this named on D1's page, so a test will confirm it).
- A graph database earns its place when questions travel many steps across shapes nobody can predict. Tend's links are of known kinds, set in advance.

**How do we track all those objects?** The D1 per business does it. It is the parent in Cloudflare's own pattern. Listing or searching touches only that list, while the situations stay asleep and cost no compute.

**How does each business get its own D1?** The limit of about 5,000 bindings rules out one Worker holding every business's database. (A Worker is a small program Cloudflare runs on demand.) The harness study already says one Worker per business, and Workers for Platforms makes that possible and cheap. One open cost: a code release must reach every business's Worker. How long that takes is unchecked. A fallback exists: keep the business's list in a Durable Object too, reached by name, which has no binding limit.

## Cloudflare's philosophy, and how it differs

Swaraj said he admires it and wants to learn it. The research folder touches it only through security, in the practitioner notes. So this is **my read**, built on the facts above.

**On AWS or GCP, you choose a size.** You pick a machine, watch it, and buy a bigger one. Scaling is a dial, and someone turns it. Wanting to raise the compute on one busy database comes from this habit.

**On Cloudflare, the unit has a fixed size, and you choose how many.** One Durable Object is one thread, always. One D1 is 10 GB, always. You scale by having more units, so you must decide up front what one unit is. That is why Cloudflare's most important rule is about choosing your "atom".

What follows from that:
- **The unit should be a product idea.** One situation, one business, one chat room. Product thinking fits best here, because Cloudflare asks a product question first.
- **Idle costs almost nothing.** A sleeping Durable Object is not billed for compute, and D1 scales to zero. So a million closed situations are only data at rest.
- **The code goes to the data.** A Durable Object's storage sits inside its own process.
- **Limits are physics, not pricing.** Some rise on request, such as total storage. A single thread does not. Paying more does not make one unit bigger.

**One caution about "we don't have to worry about compute".** That is mostly true, and memory is the exception. The research quotes a practitioner: "a DO is not a tiny private process. It shares a runtime with neighbors; one blow-up can restart others." An agent loop that buffers a large tool output could do this. Memory leaks do not disappear on Cloudflare. They take a different shape.

## Measure before believing

The arithmetic above rests on two guessed numbers. **Proposal:** before the versions plan locks, run one small test on real Cloudflare: both shapes, with a scripted campaign of 50,000 situations, while a second script plays Meera writing. Measure how long her reply waits, and what it costs. Local testing cannot answer this, because the local runtime has no real network or real load.

---

# Part 2. Evaluation and simulation

These come from the research folder and the saved papers. Each ends with what it means for the simulation, which is a deployed copy of Tend where agents play everyone. The research records were gathered partly from X through Grok, and they say so. Treat the practitioner quotes as signal, not proof.

**1. Check the cheap, certain things first.** The research names two tiers: fixed checks on every change (seconds), and AI judges nightly (minutes). One source's rule: "Never let a fast gate block on an external model call."
*For us:* this component has no AI in it at all, so all its tests are in the first tier. That is why it can be tested completely, long before any other part exists.

**2. Traces tell the truth about the machinery, not about the outcome.** The harness study: "only a confirmed customer outcome says an ask was answered. 'The tool call completed' never does."
*For us:* a simulated Meera saying "thanks" is not a confirmed customer outcome. Simulation traces are trustworthy for how the parts behaved. They are weak evidence about whether real customers are served. This is a limit on your plan to tune Tend from simulation.

**3. Check the world, not the words.** The research records an Oracle case: an agent closed 140 refund tickets, and 41 "never reached the payments API. The model wrote 'refund issued' because that is what the end of a refund conversation looks like."
*For us:* the simulated payment provider must keep its own ledger. A test compares that ledger with what Tend claimed.

**4. Someone must own the check that says a run failed.** One practitioner asked: "did you write the fail condition before the tools, or after the first demo looked good?"
*For us:* in coding, compilers and tests catch errors automatically. Tend has nothing like them, so the simulated outside systems and the locked rules must do that job.

**5. Keep some stories away from tuning.** AutoSaddler, a tool that improves agents from their traces, gained 9 to 10 points. It credits three things: deep debugging, targeted changes, and picking changes that work beyond one run. GEPA, a tool that improves prompts, sets some test cases aside and never tunes on them. Those are "held-out" cases.
*For us:* this backs the rule that stories test and do not inspire. Stories used to tune prompts cannot also be the proof. **Proposal:** mark each story in the registry as tuning or held out, before the first tuning run.

**6. A fixed story set goes stale.** Agent Seer's paper names "the static benchmark problem", and it generates graded multi-turn scenarios from a tool's specification alone, with no examples.
*For us:* this answers "we need more stories". When a business connects an MCP server, its specification can seed new scenarios. It is one route, and it would still need your check.

**7. Behaviour has a shape, and it can be recovered from traces.** The Automata paper turned agents' traces into small flow charts of 7 to 43 steps. Three results:
- The charts fit runs they were not built from, almost perfectly (a score of 0.997 out of 1).
- They could often tell a failing run from a passing one. The best score was 0.94 on a measure called AUROC, where 0.5 is guessing and 1 is perfect.
- A run's shape came more from the code around the AI than from the AI model itself.

*For us:* the whiteboard could later show the real paths runs take, drawn from traces. A run leaving the usual shape is a signal to look.

**8. AI judges have the same problems as the AI they judge.** A paper called "Who Validates the Validators?" found that people only learn what they want to check by grading real outputs, so their criteria keep changing. A few checks that match what people really want beat many weak ones.
*For us:* a person grades a sample by hand before any AI judge is trusted.

**9. Change one thing at a time.** The harness study: measure the base model, then add one rung at a time: prompt, tools, harness, memory and knowledge, fine-tuning, which model serves which stage. Credit a gain only when the fixed measures move.
*For us:* each simulation run records the version of every rung, or its numbers mean nothing.

**10. Passing tests is evidence, not truth.** PatchDiff: 7.8% of "passing" SWE-bench patches failed the developer's full test suite.
*For us:* the flip check, the mutation check, and the full replay stay in the factory.

**11. Design the trace for what will use it.** The observability research: "the trace is designed backwards from the fine-tuning dataset format". Also, the model's private reasoning is a gift, logged when offered and never relied on.
*For us:* the whiteboard's store and the training traces should be one record with two readers, and not two logging systems.

**12. Give the model the current state, not the whole history.** A paper called SKILL.state replaces an ever-growing conversation with three things: the instructions, the current state, and the latest result. It reports better accuracy and lower cost.
*For us:* this supports "each version can be read on its own". The newest version is that state.

**13. An experiment nobody has run.** The research: "Small-model + thick harness vs frontier-model + thin harness is the un-run experiment." The harness study lists it as worth running.
*For us:* the simulation is where it can run, on the same stories, scoring predictability and quality separately.

**14. What the research does not cover. My read:** I found nothing in the research folder on how far LLM personas differ from real people. They tend to be more cooperative and more articulate than a real grumpy customer, though I have not checked this against a source. Beta exists to catch that gap, so simulation cannot replace it.

---

# Sources

**Cloudflare documentation** (read 4 November 2026):
- [D1 limits](https://developers.cloudflare.com/d1/platform/limits/), [D1 pricing](https://developers.cloudflare.com/d1/platform/pricing/), [D1 database API](https://developers.cloudflare.com/d1/worker-api/d1-database/), [read replication](https://developers.cloudflare.com/d1/best-practices/read-replication/), [data location](https://developers.cloudflare.com/d1/configuration/data-location/)
- [Durable Object limits](https://developers.cloudflare.com/durable-objects/platform/limits/), [pricing](https://developers.cloudflare.com/durable-objects/platform/pricing/), [alarms](https://developers.cloudflare.com/durable-objects/api/alarms/), [SQLite storage](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/), [rules of Durable Objects](https://developers.cloudflare.com/durable-objects/best-practices/rules-of-durable-objects/), [data location](https://developers.cloudflare.com/durable-objects/reference/data-location/)
- [Control and data plane pattern](https://developers.cloudflare.com/reference-architecture/diagrams/storage/durable-object-control-data-plane-pattern/), [choosing a storage product](https://developers.cloudflare.com/workers/platform/storage-options/)
- [Workers for Platforms](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/), its [limits](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/platform/limits/), [pricing](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/platform/pricing/) and [bindings](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/bindings/)
- [Queues limits](https://developers.cloudflare.com/queues/platform/limits/), [delivery guarantees](https://developers.cloudflare.com/queues/reference/delivery-guarantees/), [K2](https://developers.cloudflare.com/k2/), [Basin Pipelines](https://developers.cloudflare.com/basin-pipelines/), [Basin Catalog](https://developers.cloudflare.com/basin-catalog/), [Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/), [Hyperdrive](https://developers.cloudflare.com/hyperdrive/concepts/how-hyperdrive-works/), [Vitest integration](https://developers.cloudflare.com/workers/testing/vitest-integration/), [local D1 development](https://developers.cloudflare.com/d1/best-practices/local-development/), [Docs for agents](https://developers.cloudflare.com/docs-for-agents/)

**Binding limits, community sources, undated:** [workerd discussion 3564](https://github.com/cloudflare/workerd/discussions/3564), [Cloudflare community thread](https://community.cloudflare.com/t/dynamically-create-d1-instance/515284).

**Companies:** [Figma, "How Figma's databases team lived to tell the scale"](https://www.figma.com/blog/how-figmas-databases-team-lived-to-tell-the-scale/); [Notion, "Herding elephants"](https://notion.com/blog/sharding-postgres-at-notion); OpenAI's [post](https://openai.com/index/scaling-postgresql/) could not be opened, so the point rests on [VentureBeat's coverage](https://venturebeat.com/data/how-openai-is-scaling-the-postgresql-database-to-800-million-users) and [ByteByteGo's](https://blog.bytebytego.com/p/how-openai-scaled-to-800-million).

**Project material:**
- `knowledge_base/research/observability_explainability_and_finetuning_research.md`
- `knowledge_base/research/harness_engineering_quality_vs_determinism_research.md`
- `knowledge_base/research/security_social_chatter_grok_transcript.md`
- `knowledge_base/agent_harness_study.md`, parts 6 to 9
- `knowledge_base/Level 2/memory_and_knowledge/how_does_memory_and_knowledge_work_with_the_loops.md`
- `Things to look at/`: `agent_seer_…`, `autosaddler_…`, `automata_…`, `prime_agent_…`, `skill_state_…`
- Not yet read in depth: chapter 7 of `Things to look at/ai_agents_in_depth_harness_engineering_practice.md`, on evaluating agents and simulation environments. It is the next place to read when the simulation plan is written.
