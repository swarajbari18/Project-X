"""
Lesson 3 experiment: what makes a test worth having?

Run it yourself:  python3 lesson_03_what_a_test_is.py

It builds a tiny version of the Situation Registrar's save, in real SQLite, then
runs three tests against it, and then deliberately breaks things to see which
tests notice. Nothing here is Tend's real code; it exists to teach.
"""
import sqlite3


class RefusedBecauseANewerVersionExists(Exception):
    pass


# Pretend somebody "tidied" the code. When this is True, the version check is gone.
THE_BUG_IS_IN = False


def new_store():
    db = sqlite3.connect(":memory:")
    db.execute("""
        CREATE TABLE versions_of_this_situation (
            version_number INTEGER PRIMARY KEY,
            built_on       INTEGER,
            written_by     TEXT NOT NULL
        )""")
    return db


def newest_version(db):
    return db.execute("SELECT MAX(version_number) FROM versions_of_this_situation").fetchone()[0] or 0


def save_new_version(db, built_on, written_by):
    newest = newest_version(db)
    if not THE_BUG_IS_IN and built_on != newest:
        raise RefusedBecauseANewerVersionExists(f"newest is {newest}")
    new_number = newest + 1
    db.execute("INSERT INTO versions_of_this_situation VALUES (?,?,?)", (new_number, built_on, written_by))
    return new_number


def a_situation_at_version(n):
    db = new_store()
    for i in range(1, n + 1):
        save_new_version(db, i - 1, "conversation manager")
    return db


# ---------- the tests ----------

def test_SR_01_a_save_on_the_newest_version_is_accepted():
    # Given: Meera's situation is at version 5
    db = a_situation_at_version(5)
    # When: the worker saves a step built on version 5
    number = save_new_version(db, built_on=5, written_by="situation worker")
    # Then: version 6 exists, built on 5, written by the worker
    assert number == EXPECTED_NEW_VERSION
    row = db.execute("SELECT built_on, written_by FROM versions_of_this_situation WHERE version_number = 6").fetchone()
    assert row == (5, "situation worker")


def test_SR_02_a_save_on_an_old_version_is_refused():
    # Given: the worker read version 5, then the conversation manager saved version 6
    db = a_situation_at_version(6)
    # When: the worker saves its step, built on version 5
    refused = False
    try:
        save_new_version(db, built_on=5, written_by="situation worker")
    except RefusedBecauseANewerVersionExists:
        refused = True
    # Then: it is refused, and the situation is still at version 6
    assert refused
    assert newest_version(db) == 6


def test_WEAK_saving_works():
    # This looks like a test. It runs the same scenario as SR-02. Read what it checks.
    db = a_situation_at_version(6)
    try:
        save_new_version(db, built_on=5, written_by="situation worker")
    except RefusedBecauseANewerVersionExists:
        pass
    assert newest_version(db) > 0


EXPECTED_NEW_VERSION = 6
ALL_TESTS = [test_SR_01_a_save_on_the_newest_version_is_accepted,
             test_SR_02_a_save_on_an_old_version_is_refused,
             test_WEAK_saving_works]


def run(title):
    print(f"--- {title}")
    for test in ALL_TESTS:
        try:
            test()
            print(f"  passed  {test.__name__}")
        except AssertionError:
            print(f"  FAILED  {test.__name__}")
    print()


run("Round 1: the code is correct")

THE_BUG_IS_IN = True
run("Round 2: the bug is in. The version check is gone")
THE_BUG_IS_IN = False

EXPECTED_NEW_VERSION = 7
run("Round 3: the code is correct again, but SR-01's expected value is deliberately wrong")
EXPECTED_NEW_VERSION = 6
