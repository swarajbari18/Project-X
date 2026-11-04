# Engineering lesson 2: primary keys and indexes

**Taught on:** 4 November 2026, for the Situation Registrar.

**Why this is on the list now.** Swaraj asked: "What is the difference between a primary key and an index?" Every lookup the registry makes depends on the answer, and every arrival makes several lookups. It decides how much of Tend's one thread gets wasted.

**How to read the labels.**
- **Measured:** I ran this. The script was deleted on 4 November 2026, at Swaraj's request, and its output is copied here. It used SQLite, the engine inside D1 and Durable Objects, on this laptop, with 1,000,000 made-up situations. Treat the numbers as a sense of scale. Cloudflare's own speed will differ.
- **Fact:** a source says it, and the source is named at the end.
- **From memory:** general knowledge I did not re-check today.
- **Proposal:** a suggestion nobody has approved yet.

---

## 1. The names, first

Lesson 1 used the column name `state`, and Swaraj asked what that means. That name was bad.

**The state is not the situation.** It is one fact about the situation: where the work stands right now. It is one of four words: running, waiting, blocked, or completed.

So from now on, names say what things are, even if they are long:

```sql
CREATE TABLE situations_in_this_business (
  situation_id          TEXT PRIMARY KEY,
  person_id             TEXT NOT NULL,
  kind_of_problem       TEXT NOT NULL,
  where_the_work_stands TEXT NOT NULL,   -- running, waiting, blocked, completed
  order_number          TEXT
);
```

---

## 2. How a database really stores things

**A database is a file.** In SQLite, it is literally one file.

**The file is cut into pages,** which are fixed-size blocks. **Fact:** SQLite's default is 4,096 bytes, and Postgres usually uses 8 kB.

**A database reads whole pages, never one row.** So the true cost of a query is how many pages it must touch.

**Measured:** my 1,000,000 situations took a 77 MB file, or 18,693 pages.

Rows are stored roughly in the order they arrived. Here is a small piece of that table:

| situation_id | person_id | where_the_work_stands |
|---|---|---|
| s-1 | priya | completed |
| s-2 | arjun | completed |
| s-3 | meera | waiting |
| s-4 | priya | running |
| s-5 | meera | completed |

Meera's rows are scattered among everyone else's.

---

## 3. Without an index: the scan

Ask: "Which of Meera's situations are still open?"

```sql
SELECT situation_id, kind_of_problem FROM situations_in_this_business
WHERE person_id = 'meera'
  AND where_the_work_stands IN ('running', 'waiting', 'blocked');
```

Nothing tells the database where Meera's rows are. So it reads **every row in the table**, and checks each one. This is called a **scan**.

**Measured:** it took **37 ms**, and read all 1,000,000 rows.

You can ask SQLite what it plans to do, by putting `EXPLAIN QUERY PLAN` in front of a query. For this one, it answered:

```text
SCAN situations_in_this_business
```

---

## 4. Primary key versus index

They do different jobs.

| | Primary key | Index |
|---|---|---|
| What it is | A **rule**: every row has a value here, and no two rows share it | A **speed tool**: a sorted copy of some columns, pointing back at the rows |
| Why it exists | So a row can always be named exactly | So rows can be found without reading everything |
| How many per table | One | As many as you create |
| Can values repeat? | Never | Yes, unless you say otherwise |
| In our table | `situation_id` | `person_id` and `where_the_work_stands` |

You worked out the key point yourself: **`situation_id` is unique, and `person_id` repeats.** Meera can have many situations. So `person_id` can never be the primary key, but it can be indexed.

**So why the confusion?** Because a primary key secretly brings an index with it. To refuse a duplicate on every save, the database must find out quickly whether that value already exists. So it builds a sorted list.

**Fact.** SQLite says: "UNIQUE and PRIMARY KEY constraints are implemented by creating a unique index in the database."

**Measured:** finding one situation by its ID took **0.004 ms**. The plan says:

```text
SEARCH situations_in_this_business USING INDEX sqlite_autoindex_situations_in_this_business_1 (situation_id=?)
```

Nobody wrote that index. SQLite built it because of `PRIMARY KEY`.

**This is why you rarely see `CREATE INDEX` in the SQL you have written.** There are three reasons:
- Primary keys and unique columns already get an index automatically.
- Tools that write SQL for you often add them without showing you.
- On a small table you never feel the difference. A scan of 1,000 rows takes about 0.04 ms, so everything looks fine. Then the business grows.

That last one is how many database horror stories begin.

---

## 5. What an index really is

An index is a second, separate structure in the same file: a sorted copy of the columns you chose, with a pointer back to each row.

Here is the index on `person_id` and `where_the_work_stands`, for the small table above:

| person_id | where_the_work_stands | points to row |
|---|---|---|
| arjun | completed | s-2 |
| meera | completed | s-5 |
| meera | waiting | s-3 |
| priya | completed | s-1 |
| priya | running | s-4 |

**It works like a phone book.** It is sorted by surname, then by first name inside each surname. Because it is sorted, you can jump straight to the right place.

**How it jumps: the tree.** The sorted entries are kept in a tree of pages, called a **B-tree**.
- The top page says which page to go to next.
- That page says the same, and so on, until you reach the page holding your entry.
- Each page can point to a few hundred others, so the tree stays very shallow.

Here is the arithmetic. If each page points to 200 others (my round number): two levels reach 40,000 entries, three reach 8,000,000, and four reach 1,600,000,000.

**So finding anything takes about three or four page reads,** however big the table gets. A scan of the same table takes 18,693 pages.

**Fact.** SQLite puts it this way: with an index, the time is "proportional to logN rather than being proportional to N as in a full table scan".

**Measured,** the same question as section 3, with the index:

```sql
CREATE INDEX find_a_persons_situations_by_where_the_work_stands
ON situations_in_this_business (person_id, where_the_work_stands);
```

```text
SEARCH situations_in_this_business USING INDEX
find_a_persons_situations_by_where_the_work_stands (person_id=? AND where_the_work_stands=?)
```

It took **0.006 ms instead of 37 ms: about 6,200 times faster.** I ran it twice, and these numbers held.

---

## 6. Why two columns, and in what order

Your question: "if we create an index, can we not query it by the state?"

**Mostly no, and the phone book shows why.** It is sorted by surname first. Finding every "Sharma" is easy. Finding everyone with the first name "Meera" means reading the whole book, because the Meeras are scattered under every surname.

Our index is sorted by person first, then by where the work stands. **Measured:**

| The question | What SQLite did | Time |
|---|---|---|
| This person, and where the work stands | SEARCH: jumped to it | 0.006 ms |
| This person, wherever the work stands | SEARCH: jumped to it, because person comes first | 0.0035 ms |
| Everyone who is blocked | **SCAN of the whole index** | 29 ms |

**The rule:** an index helps from its leftmost column onward. It cannot skip the first column. So if you often need "every blocked situation in this business", you need another index that starts with `where_the_work_stands`.

**Fact.** SQLite's advice follows from this: "your database schema should never contain two indices where one index is a prefix of the other". A prefix is the start of something. So an index on `(person_id, where_the_work_stands)` already answers questions on `person_id` alone, and you need no second index for that.

**A correction to my first example.** I first wrote the question with "not completed": `where_the_work_stands != 'completed'`. A "not equal" cannot jump to a place in the sorted list. So it jumps to the person, then reads through all that person's rows. For one person that is fine, but listing the three open words with `IN (...)` is more exact.

### A better index for this exact question

Most situations in a long-running business are finished. I assumed 93% in my script. That is a guess, not a measurement. The question that runs on every arrival only ever wants the open ones. So why index the finished ones at all?

```sql
CREATE INDEX find_a_persons_open_situations
ON situations_in_this_business (person_id)
WHERE where_the_work_stands != 'completed';
```

This is called a **partial index**. **Measured:**

| | File size added | Time |
|---|---|---|
| Index on every row | 31 MB | 0.006 ms |
| Partial index, open situations only | 1 MB | 0.004 ms |

It is about thirty times smaller, and about as fast. This is what choosing an index from the product's actual question looks like. Whether to use it is a decision for the registry's plan, in `knowledge_base/plans/situation_registrar/plan_05_registry_and_people/`.

---

## 7. What an index costs

Nothing here is free. **An index is a second copy that must be kept in step.**

**Measured:**

| Cost | Primary key only | With more indexes | Effect |
|---|---|---|---|
| File size | 77 MB | 108 MB | 40% bigger, for one index |
| Time per save | 1.5 microseconds | 8.5 with one index; 25 to 30 with three | Each index adds work to every save |
| Building it | — | 0.5 seconds for 1,000,000 rows | Grows with the table |

**Fact.** Cloudflare charges for it: "Indexes will add an additional written row when writes include the indexed column", and it says the benefit "will, in nearly all cases, offset this additional write".

**Be careful with the save numbers.** They were measured on a laptop, with no network and no durable storage across several machines, and the three-index figure varied between tries. So treat them as a direction, not an exact figure. The real gap will look smaller. On Cloudflare, a save takes milliseconds, mostly from making it durable. The index's own cost is small beside that. The storage cost still counts.

### Cause and effect

| If you... | Then... |
|---|---|
| Skip an index a frequent question needs | Every run of it scans, the thread is busy, and everything behind it waits |
| Add an index nobody's question uses | Every save pays, and you get nothing |
| Index only `where_the_work_stands` | It barely helps. Four possible words cannot narrow a million rows much. In my assumed data, "completed" alone covers about 930,000 rows. An index helps when it narrows a lot |
| Put the columns in the wrong order | The index exists, but your question still scans |
| Index a table with very few rows | No gain. A scan of a few rows is already instant |

### How much compute a missing index wastes on Tend

Tend looks up "this person's open situations" on every arrival. Using the measured 37 ms, on the 1,000,000-situation business, with this as the only query:

| Messages a second | Thread busy, with no index | Thread busy, with the index |
|---|---|---|
| 1 | 3.7% | 0.0006% |
| 10 | **37%** | 0.006% |
| 27 | **100%: this one query fills the thread** | 0.016% |

**Without the index, this one lookup can run about 27 times a second before the thread is full. With it, about 167,000 times.** Waiting explodes as a line gets near full, so in practice you would be in trouble well before 27.

**The money.** **Fact:** Cloudflare counts every row a query scans, at $0.001 per million after the first 25 billion a month. At 1,000 messages a day, each scanning 1,000,000 rows, that is 30 billion rows a month, or about $5 over the free amount. So the money is small. **The cost that hurts is time on the one thread.**

### If there were no indexes, what would you do instead?

You would have to build one yourself, worse:

| What you might try | What goes wrong |
|---|---|
| Keep a separate table of person-to-situation pairs | That is an index you maintain by hand. If a save updates one and not the other, they disagree |
| Keep Meera's list in a cache | The same problem, and "the cache never guards a decision" is already a Tend rule |
| Keep a list per person in their own Durable Object | A fair idea for some things, but it is another copy to keep in step |

An index gives you this for free, and **the database updates it in the same transaction as the row, so they can never disagree.** That is what you are really buying.

---

## 8. How to choose indexes

Start from the product's questions, never from the table.

| The product's question | What it needs |
|---|---|
| What is this situation? | Nothing extra: the primary key |
| Which of this person's situations are open? | An index on person, perhaps partial |
| Which situation holds order 8830? | An index on the order number |
| What is due soonest? | An index on due time |
| Every blocked situation in this business | An index starting with where the work stands, if asked often |

**This can become a check (Proposal).** Each plan has a section called "how data is found", listing the questions it asks. A test can run `EXPLAIN QUERY PLAN` on each, and fail if the answer says `SCAN`. Then a machine catches a missing index before it ever reaches production.

---

## 9. How other databases handle this

**The word "NoSQL" hides more than it tells.** Nearly all databases are built from the same two ideas, and they choose differently. You do not need to memorise these tables. They are here so the names mean something when you meet them.

| Idea | How it works | Good at | Used by |
|---|---|---|---|
| **B-tree** | Keep data sorted in a tree of pages; change it where it sits | Reading | SQLite, Postgres, MySQL, MongoDB |
| **LSM tree** | Add every write to memory and a log; later, merge sorted files in the background | Writing | Cassandra, and others |

| Database | Where rows live | What the primary key does | Other indexes |
|---|---|---|---|
| **SQLite** (inside D1 and Durable Objects) | In a tree ordered by a hidden row number, which it calls the rowid. **Fact:** "logically stored in order of increasing rowid" | Gets its own unique index | Sorted copies, pointing to the row number |
| **Postgres** | In pages, in no order. **Fact:** "a particular item (row) can be stored in any page" | Gets its own unique index (from memory) | The same; it also offers other kinds of index, for text search and more (from memory) |
| **MySQL (InnoDB)** | **Inside the primary key's own tree,** so the table itself is kept sorted by primary key. MySQL calls this the clustered index. **Fact:** "the clustered index that stores row data" | It is the table | **Fact:** each holds "the primary key columns", and finds the row through them. So a long primary key makes every index bigger |
| **Cassandra** | Spread across many machines, in buckets called **partitions**. Part of the key, the **partition key**, picks the bucket. Rows are sorted inside it | It decides where data physically lives | Discouraged. Instead, you keep **one table per question**, and repeat the data |
| **MongoDB** | Documents, not rows | `_id`, indexed (from memory) | B-tree indexes, much like SQL (from memory) |
| **Redis** | Key to value, in memory | The key is the only way in (from memory) | None; you build them by hand |

**Cassandra is the interesting one.** **Fact:** "you model the queries and let the data be organized around them", and "You cannot perform joins in Cassandra". (A join is one query that combines rows from two tables.) You must know your questions before you design the table, because a question without the partition key is expensive.

**Tend has already made the same choice.**
- One Durable Object per situation is exactly a partition, one bucket per situation: the situation ID picks where the data lives.
- Inside it, data is sorted, and reading needs no network trip.
- A question across situations cannot go there, so we keep a copy organised for that question: the registry.

That is Cassandra's design, on SQLite. The same idea shows up under different names in different products. So this knowledge transfers.

---

## 10. What a senior would remember

1. A primary key is a rule. An index is a speed tool. The rule happens to bring a tool with it.
2. The real cost of a query is how many pages it touches.
3. An index turns "read everything" into "three or four jumps".
4. An index helps from its leftmost column. The column order is a decision.
5. Every index charges every save, so each one must answer a real question.
6. Choose indexes from the product's questions.
7. On one thread, a missing index is not a slow query. It is lost capacity for everyone.

---

## Learning work

**Predict, then check.** The registry has this index: `(person_id, where_the_work_stands)`. For each question below, will SQLite SEARCH or SCAN, and why?
1. All of Meera's situations.
2. Every situation waiting, across the business.
3. Meera's waiting situations.
4. The situation with ID s-42.

**Spot it outside Tend.** A hospital's patient files are sorted by file number. A nurse needs every patient of Dr Rao who is still admitted. What is the scan? What would the index be, and which column goes first?

---

## Sources

- SQLite, query planning: https://www.sqlite.org/queryplanner.html
- SQLite, CREATE TABLE: https://www.sqlite.org/lang_createtable.html
- PostgreSQL, page layout: https://www.postgresql.org/docs/current/storage-page-layout.html
- MySQL, clustered and secondary indexes: https://dev.mysql.com/doc/refman/8.4/en/innodb-index-types.html
- Cassandra, data modelling: https://cassandra.apache.org/doc/latest/cassandra/developing/data-modeling/data-modeling_rdbms.html
- D1 pricing: https://developers.cloudflare.com/d1/platform/pricing/
