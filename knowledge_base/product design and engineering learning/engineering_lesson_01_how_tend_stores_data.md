# Engineering lesson 1: how Tend stores its data

**Taught on:** 4 November 2026, for the first component, the Situation Registrar.

**Corrected on 4 November 2026.** The example query used `state != 'completed'`; lesson 2, section 6, explains why `IN (...)` is more exact.

**Why this is on the list now.** Swaraj asked: "I am extremely weak at it, so you have to explain to me like a recent or a first year college student, right, who wants in 15 minutes read and directly reach to a senior software engineering." Every plan for this component rests on this lesson.

**How to read the labels.**
- **Fact:** a source says it, and the source is named at the end.
- **My guess:** a number I assumed. The simulation will measure it.
- **My read:** my reasoning. Challenge it.

**The SQL here is an illustration.** The plans decide the real columns. Names were changed on 4 November to say what things are, at Swaraj's request.

---

## 1. Three things are called "worker"

This word causes more confusion than anything else here.

| The word | What it is |
|---|---|
| **Cloudflare Worker** | A small program Cloudflare runs on demand. It handles many requests at once. Tend's front door is one |
| **Situation worker** | A part of Tend. It reasons about one problem. It runs inside a Durable Object |
| **Postgres worker** | One process inside a Postgres server, doing one connection's work |

From here on, **thread** means one line of work that does one thing at a time. Everything else waits in line behind it.

---

## 2. A table, a key, and an index

A **table** is a spreadsheet with strict rules. Each column has a name and a type. Each row is one thing.

Here is the registry of one business:

| situation_id | person_id | kind_of_problem | where_the_work_stands | order_number |
|---|---|---|---|---|
| s-42 | meera | late delivery | waiting | 8830 |
| s-43 | meera | refund | completed | 9912 |
| s-77 | priya | outreach | waiting | |

In SQL, the language databases speak, that table is written like this:

```sql
CREATE TABLE situations_in_this_business (
  situation_id          TEXT PRIMARY KEY,   -- unique: no two rows may share it
  person_id             TEXT NOT NULL,      -- who it is about; must be filled in
  kind_of_problem       TEXT NOT NULL,
  where_the_work_stands TEXT NOT NULL,      -- running, waiting, blocked, completed
  order_number          TEXT                -- may be empty
);
```

A **primary key** is the column that names a row uniquely. No two rows may have the same one.

To ask a question, you write a query:

```sql
SELECT situation_id, kind_of_problem FROM situations_in_this_business
WHERE person_id = 'meera'
  AND where_the_work_stands IN ('running', 'waiting', 'blocked');
```

With a million rows, the database would have to read all of them to answer this. That is called a **scan**. An **index** fixes it. It is like the index at the back of a book: a sorted list that says where to look.

```sql
CREATE INDEX find_a_persons_situations_by_where_the_work_stands
ON situations_in_this_business (person_id, where_the_work_stands);
```

Now the database jumps straight to Meera. Cloudflare says a read with a good index takes under a millisecond. This matters more on D1 than anywhere else, as you will see. Lesson 2 teaches primary keys and indexes properly.

---

## 3. A transaction

A **transaction** is a group of saves that all happen, or none do.

Priya replies, and Tend must save two things: its answer, and the cancelling of her follow-up wait. Suppose the power cuts out between the two. If only the answer was saved, Priya later gets a follow-up to a question she already answered. A transaction makes that impossible. After a crash, either both are saved or neither is.

Tend's "saved together in one version" rule is a transaction.

---

## 4. Why D1 queues, and why Postgres does too

### Postgres

**Fact.** "PostgreSQL implements a 'process per user' client/server model." Each connection gets its own process on the server. That process can run on its own CPU core.

So yes, Postgres really does several things at the same moment. Sixteen cores can run sixteen queries at once.

**Fact.** Reading and writing do not hold each other up: "reading never blocks writing and writing never blocks reading."

### Why you struggled with connections

A connection is a whole process, and a process is expensive. **Fact:** the default limit "is typically 100 connections". Your code may want thousands.

So a **pooler** such as PgBouncer sits in front. Under **transaction pooling**, "a server connection is assigned to a client only during a transaction". Then it goes back to the pool for the next client.

Five thousand clients can share fifty connections this way.

Now the important question: **what does the fifty-first client do, at the moment when fifty are busy? It waits in line.**

**So Postgres queues too.** It queues in three places:
- at the pool, when every connection is busy;
- at a row, when two writers want the same row;
- at the CPU, when there is more work than cores.

"Things do not queue up in Postgres" is not true. The queue is just hidden, and it is spread across three places.

### D1

**Fact.** "Each individual D1 database is inherently single-threaded, and processes queries one at a time." That includes reads.

**Fact.** There is a direct formula: "If your average query takes 1 ms, you can run at most 1,000 queries per second."

**There are no connections in D1.** Your code reaches it through a binding, Cloudflare's built-in way for code to reach a database. So there is nothing to pool, and you can never run out of connections. That whole class of problem is gone. A different limit replaces it: total time on one thread.

**Fact.** If too many requests arrive, D1 queues them. If the queue fills, it returns an "overloaded" error.

### Durable Object

It works the same way as D1: one thread and no connections. Each object has its own private SQLite database, inside the same program as your code, so a read takes no network trip.

**Fact.** "Each individual D1 database is backed by a single Durable Object." They are the same machine at two sizes.

### Side by side

| | Postgres | One D1 | One Durable Object |
|---|---|---|---|
| Things running at the same moment | Many, up to the CPU cores | One | One |
| Network trip for each query | Yes | Yes | No |
| Connections to manage | Yes, and a pooler | None | None |
| The limit you hit first | Connections, locks, CPU | Time on its one thread | Time on its one thread |
| How to get more | A bigger machine, read copies, then split | More databases | More objects |
| Most data in one | Terabytes | 10 GB, cannot be raised | 10 GB |

**Be fair to Postgres.** One big Postgres is far stronger than one D1. Cloudflare is not claiming otherwise. Its bet is different: many small units, one for each business or each problem, so no single unit ever needs to be strong.

---

## 5. Front door and lines: Worker versus Durable Object

Swaraj's reasoning, checked against the record:

- **A Worker is the front door.** It has no line, and it handles many requests at once. The study of 5 September says: "10,000 simultaneous messages can be handled by one Worker without queuing." That is why the front door is a Worker.
- **A Durable Object is a line.** The same study: a Durable Object "would serialize all 10,000 messages". So it would be wrong as the front door.
- **A line is right for one situation,** because only that situation waits. Meera's parcel never waits behind Priya's outreach.

**That reasoning is right. One correction.** The record says one front-door Worker per business, not one per contact.

**A gap this revealed, now closed.** The design says a business runs "one arrival loop per person at a time". A Worker cannot do that by itself, because it has no memory and no line. Swaraj then said: "The worker is the front door, and the conversation manager would be a durable object." The assistant reads this as one per person, since one person's messages must stay in order. Where the update loop runs is still to settle.

**One trap.** A Durable Object's line is not frozen while it waits on something slow.
- **Fact:** while it waits on something like a call to an AI model, other requests may slip in.
- So the situation worker's code must enforce "one run at a time" itself.
- The Registrar never calls an AI, so it is never slow. That is the reason it is a separate kind of object from the situation worker. Saving Priya's reply is never held up by a 20-second AI call.

---

## 6. Class and object

A **class** is a blueprint. An **object** is one thing built from it.

| | Limit | Tend needs |
|---|---|---|
| Classes per account | 500 | A handful: the Situation Registrar, the situation worker, the run store |
| Objects per class | **Unlimited** | Two per situation: one Registrar, one situation worker |
| Size of one object | 10 GB | Far more than one situation holds |

A sleeping object costs only the storage it uses. So a million closed situations are only data at rest.

---

## 7. How I got the numbers

These rest on **my guesses**: a D1 read takes 1 ms, and a D1 save takes 5 ms. Cloudflare says reads are under a millisecond with a good index, and writes take "several milliseconds".

**Step 1: count one message.** Take Meera's "Where is my parcel?" and walk the design. This is my rough count, from the design's own lists of what each stage looks up.

| Stage | Reads | Saves |
|---|---|---|
| The package before understanding | 7 | |
| Routing | 2 | 1 |
| The worker wakes | 1 | |
| The package before gathering | 6 | |
| The permission check | 2 | |
| The package before deciding, and the check of the newest version | 9 | 1 |
| The update decision and the send check | 3 | 1 |
| **Total** | **30** | **3** |

**Step 2: time on the thread.** 30 × 1 ms + 3 × 5 ms = **45 ms**.

**Step 3: the ceiling.** 1,000 ms ÷ 45 ms is about **22 messages a second**, if nothing else runs.

**Step 4: why you never run at the ceiling.** As a line gets busy, waiting does not grow evenly. It explodes. Standard queueing maths says that with jobs of equal length, the average wait is:

| How busy the thread is | Average wait, counted in jobs (one job is one query) |
|---|---|
| 50% | 0.5 |
| 90% | 4.5 |
| 99% | About 50 |

Meera's message makes 33 trips (one trip is one read or one save), and **it joins the back of the line on every trip**. At 99% busy, with 5 ms jobs, each trip waits about 250 ms. 33 trips make about 8 extra seconds, for one message. That is why engineers keep half the capacity spare.

So the safe figure is about **10 messages a second**, or 36,000 an hour.

**Step 5: a normal shop.** My example of 1,000 messages a day is about 0.01 a second. The thread is busy 0.05% of the time. One D1 is more than enough.

**Step 6: a correction.** Last time I said a campaign to 50,000 people takes "about 8 minutes of the only thread while Meera's reply waits in line". The arithmetic holds: 50,000 people × 2 saves × 5 ms = 500 seconds. **The conclusion was overstated.** Meera does not wait 8 minutes. Two things could happen:
- Fired all at once, the line fills up, and customers get waits and "overloaded" errors.
- Slowed down to half the thread, the campaign takes about 17 minutes, and Meera's 33 trips each wait about 2.5 ms. She barely notices.

So one D1 can survive a campaign, if the campaign is slowed down.

**So why one object per situation, still?**
- The 10 GB wall cannot be raised, and a busy business reaches it in months.
- Every read of the newest version would be a network trip, and that is the read Tend makes most.
- One slow query from memory and knowledge would hold up every customer of that business.
- A safe ceiling of about 10 messages a second is too low for a large business.

---

## 8. The same day, under the new design

Now each kind of data has its own thread. Here is the same message, split up (my guesses again). A copied row is one situation's details, copied into the registry. I guess that takes 0.3 ms inside a batch of 100.

| Thread | What it does per message | Time | Ceiling | Safe figure |
|---|---|---|---|---|
| Registry D1 | 5 reads, 3 copied rows | 6 ms | About 165 a second | 80 a second |
| Configuration D1 | 5 reads | 5 ms | 200 a second | 100 a second |
| Learned-knowledge D1 | 10 reads | 10 ms | 100 a second | 50 a second |
| That situation's own objects | 10 reads, 3 saves | Local; no one else is in this line | Not shared | Not shared |

The business is now held back by its slowest thread, the learned-knowledge one: about 50 messages a second at the safe figure. That is five times the 10 a second that one D1 could safely do. The bigger gain is that slow work on one thread no longer holds up the others.

### Several stories at the same moment

Bloom is a made-up shop. It is 11:00:00 on a Diwali morning, and these all happen together.

| Story | Its own lines | Shared threads it touches |
|---|---|---|
| **Meera:** "Where is my parcel?" | Her parcel's Registrar saves version 6; her situation worker wakes | Registry: 5 reads. Configuration: 5. Knowledge: 10 |
| **Priya:** replies to her outreach | Her outreach's Registrar saves the reply | The same three |
| **Arjun:** "the one I ordered in the Diwali sale" | His situation's Registrar and worker | Knowledge: finds the sale's dates. Registry: his situations in those dates |
| **Refund 9912:** the payment provider finally answers | That refund's Registrar saves the answer | Registry: one copied row |
| **The owner's campaign** to 50,000 people | **50,000 separate lines**, each doing two saves. They run in parallel | Registry: 100,000 copied rows, in batches of 100 |

Look at what does not happen. No save in any story waits for a save in any other story. They are in different lines.

The only shared queue is the registry. The campaign's 100,000 copied rows take about 30 seconds of its thread in total, in 1,000 batches of 30 ms each. So one of Meera's reads waits at most about 30 ms.

### Inside one line: Priya's race

Within one situation, the line still matters. A version is one saved state of a situation, numbered in order (v12, v13). A notice is a short internal message that a new version exists.

```text
09:58:00.000  Conversation manager → Priya's Registrar: save her reply, built on v12
              Registrar: v13 saved. Notice to her situation worker.
09:58:00.010  Situation worker reads v13. Starts an AI call, which takes 8 seconds.
09:58:03.000  Priya writes again: "also, what's the price?"
              Conversation manager → Registrar: save it, built on v13
              Registrar: v14 saved. It was not blocked, because the worker is the
              one waiting on the AI, and the worker lives in a different object.
09:58:08.010  Situation worker → Registrar: save my answer, built on v13
              Registrar: REFUSED. The newest version is v14.
09:58:08.012  Situation worker reads v14, and decides again with both messages.
```

This is why a save must name the version it was built on, even with one thread per situation. One thread stops two saves landing at the same instant. It does nothing about a decision made on old facts.

---

## 9. The registry and the shared list of waits

**The registry** answers "which situation?" questions, and a situation's own object cannot answer those.

You cannot ask a million objects "are you Meera's?". There is no such thing as a query across Durable Objects. So the business's D1 keeps a list with one row per situation: its ID, who is in it, its kind, its state, and its numbers. That is the table in section 2.

Memory and knowledge finds situations there. The answer is a situation ID, and the ID is enough to reach the object:

```typescript
const line = env.REGISTRAR.get(env.REGISTRAR.idFromName("bloom:s-42"));
```

**The shared list of waits** answers "what is this business waiting on?".

Each situation's object holds its own waits, and those are the truth. The list in the D1 is one row per open wait, across the business, copied there a moment after the save: which situation, waiting on what, due when. It is what the design calls the book of waits, as seen across the whole business. Because it is a moment behind, anything that must be exact asks the situation itself. The list is for finding and showing.

---

## 10. Four kinds of data, not two

You asked where the analytical data is, assuming debugging needs it. **Debugging one conversation is not analytics.** Senior engineers separate four things here.

| Kind | Example question | How much it reads | Where it lives | May it be late? |
|---|---|---|---|---|
| **Truth** (transactional) | What is the newest version of s-42? | One row, by key | The situation's own object | Never |
| **Lookup** (a derived copy) | Which situations are Meera's? | A few rows, by index | The business's D1 | A moment |
| **Trace** (debugging) | What happened to this one message? | All the rows with one ID | The run store, or R2 | Seconds |
| **Analytical** | How many refunds were late this month? | Millions of rows, added up | Basin | Minutes |

**Why analytics gets its own store.** It reads millions of rows, and on a one-thread database that would stop every customer. So analytics stores arrange data column by column: adding up one column across a million rows is cheap, while changing one row is not. Tend sends each version's event into R2 through Pipelines, and queries it with Basin SQL. Nothing personal goes in.

---

## 11. How debugging works: one ID, followed everywhere

**The tracking number.** When Meera's message arrives, intake gives it one ID, say `t-771`. It works like a courier's tracking number. That ID travels with everything the message causes: every version, notice, AI call and send. Each part writes one row, carrying that ID.

```sql
CREATE TABLE events (
  seq          INTEGER PRIMARY KEY,   -- the order things happened
  trace_id     TEXT,                  -- t-771
  part         TEXT,                  -- which part of Tend did this
  event        TEXT,                  -- what happened
  situation_id TEXT,
  version      INTEGER,
  data_in      TEXT,
  data_out     TEXT,
  at           TEXT
);
```

**The query that debugs a conversation** is one line:

```sql
SELECT * FROM events WHERE trace_id = 't-771' ORDER BY seq;
```

**What comes back:**

```text
 1  intake                 message saved; sender is Meera
 2  memory and knowledge   package: her parcel situation; carrier claim 3 days old
 3  conversation manager   understood: asks where her parcel is; fits s-42
 4  registrar              version 6 saved, built on 5
 5  registrar              notice → situation worker, memory and knowledge
 6  situation worker       woke; read version 6
 7  tool layer             asked the carrier: "out for delivery, due Tuesday"
 8  situation worker       decided: tell Meera
 9  registrar              version 7 saved, built on 6
10  registrar              notice → conversation manager, memory and knowledge
11  conversation manager   update decision: worth telling
12  communication layer    wrote the message; send check passed
13  tool layer             sent on WhatsApp
```

**That list is the whiteboard, the screen you asked for.** Each row lights up the block for that part of Tend. "Next" moves to the following row. Clicking a block shows `data_in` and `data_out`.

**For a whole situation over several days,** ask for `situation_id = 's-42'` instead. The carrier's answer two days later gets its own tracking number, and they share the situation.

**Where the rows go:**

| Stage | What is written | Where | Who sees it |
|---|---|---|---|
| Local | Everything, including AI reasoning | A SQLite file (or JSON) on your machine. A local page shows it, and nothing goes to the terminal | You |
| Simulation | Everything | One Durable Object per run | Product builders |
| Beta and production | Tend's permanent record, with no personal data | R2, in batches through a queue | Builders, with names hidden. More needs the owner's permission |

**Writing these rows is loosely coupled in production.** The rows wait in a queue, so no one's message waits for them. If a trace row were lost, the truth would still be safe, because each version records who wrote it, why, and when.

---

## 12. What a senior would remember from this

1. Everything queues somewhere. The only question is where you can see it.
2. On one thread, your throughput is 1 divided by your query time. So a slow query is a capacity problem, not just a slow query.
3. Waiting explodes near full. Plan to run at half.
4. Choose your unit from the product. For Tend, that is a situation.
5. One truth per fact. The save to the truth waits. Everything derived does not.
6. Four questions, four stores: truth, lookup, trace, analytics.
7. Debugging needs one ID carried through everything, not a data warehouse.

---

## Learning work

**Explain it back.** Meera's message is being saved in her situation's own object. At the same moment, the registry D1 is busy with a 30 ms batch from the campaign. Does her save wait? Which of her other trips wait, and why?

**Spot it outside Tend.** A shop's billing counters work like threads. One counter is one line. Why does a supermarket add counters on Diwali instead of asking the cashier to scan faster? And what would be the supermarket's version of the 50% rule?

---

## Sources

- D1 limits, read replication and pricing: https://developers.cloudflare.com/d1/platform/limits/
- Rules of Durable Objects (the atom, input gates): https://developers.cloudflare.com/durable-objects/best-practices/rules-of-durable-objects/
- Durable Object limits (classes, objects): https://developers.cloudflare.com/durable-objects/platform/limits/
- PostgreSQL, how connections are established: https://www.postgresql.org/docs/current/connect-estab.html
- PostgreSQL, `max_connections`: https://www.postgresql.org/docs/current/runtime-config-connection.html
- PostgreSQL, concurrency control: https://www.postgresql.org/docs/current/mvcc-intro.html
- PgBouncer, pool modes: https://www.pgbouncer.org/features.html
- Basin SQL: https://developers.cloudflare.com/basin-sql/
- The study of 5 September: `knowledge_base/agent_harness_study.md`, in its version before the rewrite of 29 October (git history, commit 7851f98).
