"""
Lesson 2 experiment: what does an index save, and what does it cost?

Run it yourself:  python3 lesson_02_what_an_index_costs.py

It builds a made-up business with 1,000,000 situations in a throwaway SQLite
database, then measures the same question with and without an index.
SQLite is the engine inside D1 and Durable Objects, but these numbers come from
this machine, so treat them as a sense of scale, not as Cloudflare's speed.
"""
import os, random, sqlite3, tempfile, time

ROWS = 1_000_000
PEOPLE = 200_000
random.seed(7)
folder = tempfile.mkdtemp()
path = os.path.join(folder, "bloom.db")
db = sqlite3.connect(path)

# Product-minded names. The state is where the work stands.
db.execute("""
CREATE TABLE situations_in_this_business (
  situation_id          TEXT PRIMARY KEY,
  person_id             TEXT NOT NULL,
  kind_of_problem       TEXT NOT NULL,
  where_the_work_stands TEXT NOT NULL,
  order_number          TEXT
)""")

def rows(n, start=0):
    kinds = ["late delivery", "refund", "outreach", "wrong item"]
    for i in range(start, start + n):
        # An assumption, not a measurement: most situations in a long-running business are finished.
        state = random.choices(["completed", "waiting", "running", "blocked"], [93, 5, 1.5, 0.5])[0]
        yield (f"s-{i}", f"person-{random.randrange(PEOPLE)}", random.choice(kinds), state, f"{random.randrange(10**7)}")

db.executemany("INSERT INTO situations_in_this_business VALUES (?,?,?,?,?)", rows(ROWS))
db.commit()

QUESTION = """SELECT situation_id, kind_of_problem FROM situations_in_this_business
              WHERE person_id = ? AND where_the_work_stands IN ('running','waiting','blocked')"""

def plan(sql, *args):
    return " | ".join(r[3] for r in db.execute("EXPLAIN QUERY PLAN " + sql, args))

def timed(sql, repeat, *args):
    t = time.perf_counter()
    for _ in range(repeat):
        out = db.execute(sql, args).fetchall()
    return (time.perf_counter() - t) / repeat * 1000, len(out)

def size_mb():
    db.commit()
    return os.path.getsize(path) / 1_000_000

def pages():
    return db.execute("PRAGMA page_count").fetchone()[0], db.execute("PRAGMA page_size").fetchone()[0]

print(f"{ROWS:,} situations; file {size_mb():.0f} MB; {pages()[0]:,} pages of {pages()[1]} bytes\n")

print("--- 1. Find one situation by its primary key")
sql = "SELECT * FROM situations_in_this_business WHERE situation_id = ?"
print("plan:", plan(sql, "s-500000")); ms, _ = timed(sql, 5000, "s-500000"); print(f"time: {ms:.4f} ms\n")

# Pick a person who really has an open situation, so each query returns something.
someone = db.execute("SELECT person_id FROM situations_in_this_business WHERE where_the_work_stands = 'waiting' LIMIT 1").fetchone()[0]

print("--- 2. 'Which of this person's situations are still open?' with NO index")
print("plan:", plan(QUESTION, someone)); ms_scan, n = timed(QUESTION, 5, someone)
print(f"time: {ms_scan:.1f} ms; rows returned: {n}\n")

size_before = size_mb()
t = time.perf_counter()
db.execute("CREATE INDEX find_a_persons_situations_by_where_the_work_stands ON situations_in_this_business (person_id, where_the_work_stands)")
db.commit()
print(f"--- 3. Build the index: {time.perf_counter()-t:.1f} s; file grew from {size_before:.0f} to {size_mb():.0f} MB\n")

print("--- 4. The same question WITH the index")
print("plan:", plan(QUESTION, someone)); ms_index, n = timed(QUESTION, 5000, someone)
print(f"time: {ms_index:.4f} ms; rows returned: {n}; about {ms_scan/ms_index:,.0f} times faster\n")

print("--- 5. Can the index answer by where the work stands alone? (It is sorted by person first.)")
sql = "SELECT count(*) FROM situations_in_this_business WHERE where_the_work_stands = 'blocked'"
print("plan:", plan(sql)); ms, _ = timed(sql, 3); print(f"time: {ms:.1f} ms\n")

print("--- 6. Can it answer by person alone?")
sql = "SELECT count(*) FROM situations_in_this_business WHERE person_id = ?"
print("plan:", plan(sql, someone)); ms, _ = timed(sql, 5000, someone); print(f"time: {ms:.4f} ms\n")

print("--- 7. A smaller index that holds only open situations (a partial index)")
db.execute("DROP INDEX find_a_persons_situations_by_where_the_work_stands"); db.commit(); db.execute("VACUUM")
s0 = size_mb()
db.execute("CREATE INDEX find_a_persons_open_situations ON situations_in_this_business (person_id) WHERE where_the_work_stands != 'completed'")
print(f"file grew from {s0:.0f} to {size_mb():.0f} MB")
sql = "SELECT situation_id, kind_of_problem FROM situations_in_this_business WHERE person_id = ? AND where_the_work_stands != 'completed'"
print("plan:", plan(sql, someone)); ms, n = timed(sql, 5000, someone); print(f"time: {ms:.4f} ms; rows returned: {n}\n")
db.execute("DROP INDEX find_a_persons_open_situations"); db.commit()

print("--- 8. What an index costs on every save: 50,000 new situations, three tries each, the middle one reported")
next_id = [ROWS]
def insert_test(label):
    tries = []
    for _ in range(3):
        batch = list(rows(50_000, next_id[0])); next_id[0] += 50_000
        t = time.perf_counter()
        db.executemany("INSERT INTO situations_in_this_business VALUES (?,?,?,?,?)", batch)
        db.commit()
        tries.append((time.perf_counter() - t) / 50_000 * 1_000_000)
    tries.sort()
    print(f"{label}: {tries[1]:.1f} microseconds per save (tries ranged {tries[0]:.1f} to {tries[2]:.1f})")
insert_test("primary key only ")
db.execute("CREATE INDEX i1 ON situations_in_this_business (person_id, where_the_work_stands)")
insert_test("plus 1 index      ")
db.execute("CREATE INDEX i2 ON situations_in_this_business (order_number)")
db.execute("CREATE INDEX i3 ON situations_in_this_business (kind_of_problem, where_the_work_stands)")
insert_test("plus 3 indexes    ")

db.close(); os.remove(path); os.rmdir(folder)
