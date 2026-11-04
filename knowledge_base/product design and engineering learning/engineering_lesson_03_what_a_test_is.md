# Engineering lesson 3: what a test is

**Taught on:** 4 November 2026, before plan 1 of the Situation Registrar.

**Why this is on the list now.** Plan 1 sets up the bench that every test will run on, and each plan locks its tests before any code exists. On your earlier project, tests were invented while the code was being written, and you could not tell a real check from an empty one. This lesson is how you tell.

**Corrected on 4 November 2026.** This lesson first said a trustworthy test uses "no AI model", while also naming a story in the simulation as an end-to-end test. Swaraj caught the contradiction: the simulation uses real AI. Section 5 now separates the two, and section 6 is new.

**How to read the labels.**
- **Measured:** I ran it. The script is `experiments/lesson_03_what_a_test_is.py`, beside this file, and you can run it yourself.
- **Fact:** a source says it, and the source is named at the end.
- **Proposal:** a suggestion nobody has approved yet.

---

## 1. What a test is

A test is a small program that runs your code with a fixed input, and checks the result against a value written down in advance.

It has three steps, and every test in the world has them:

| Step | Question | For the Registrar |
|---|---|---|
| **Given** | What is true before? | Meera's situation is at version 6 |
| **When** | What happens? | The worker saves a step built on version 5 |
| **Then** | What must be true after? | The save is refused, and the situation is still at version 6 |

A person could check this by hand once. A test checks it on every change, forever, and it takes milliseconds. That is the whole value: **it remembers a rule, so nobody has to.**

---

## 2. A test you can read

Here is that test, in Python, which you know. It is real, and it runs:

```python
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
```

`assert` means: if this is not true, stop, and fail the test.

Here is the same test in TypeScript, as you will read it in Tend. This is an illustration. It has not been run:

```typescript
it("SR-02: a save on an old version is refused", async () => {
  // Given
  const meeraSituation = await aSituationAtVersion(6);
  // When
  const attempt = meeraSituation.saveNewVersion({ builtOn: 5, writtenBy: "situation worker" });
  // Then
  await expect(attempt).rejects.toThrow("a newer version exists");
  expect(await meeraSituation.newestVersion()).toBe(6);
});
```

The shape is identical, and only the spelling differs. `expect(x).toBe(6)` is `assert x == 6`. The word `await` means "wait for this slow thing to finish". That gets its own lesson, as you decided: "When async comes, we will deal with that at that point."

---

## 3. A green test can be worthless

This is the most important part of the lesson.

I wrote a small save, in real SQLite, and three tests. The third looks reasonable. It runs the same scenario as SR-02, but it only checks this:

```python
def test_WEAK_saving_works():
    db = a_situation_at_version(6)
    try:
        save_new_version(db, built_on=5, written_by="situation worker")
    except RefusedBecauseANewerVersionExists:
        pass
    assert newest_version(db) > 0
```

Then I broke things on purpose. **Measured:**

```text
--- Round 1: the code is correct
  passed  test_SR_01_a_save_on_the_newest_version_is_accepted
  passed  test_SR_02_a_save_on_an_old_version_is_refused
  passed  test_WEAK_saving_works

--- Round 2: the bug is in. The version check is gone
  passed  test_SR_01_a_save_on_the_newest_version_is_accepted
  FAILED  test_SR_02_a_save_on_an_old_version_is_refused
  passed  test_WEAK_saving_works

--- Round 3: the code is correct again, but SR-01's expected value is deliberately wrong
  FAILED  test_SR_01_a_save_on_the_newest_version_is_accepted
  passed  test_SR_02_a_save_on_an_old_version_is_refused
  passed  test_WEAK_saving_works
```

**Round 2 teaches two things.**

**First, the weak test stayed green with the bug in.** "Greater than zero" is true whether the check exists or not. This test cannot fail in any way that matters. It only makes the run look thorough.

**Second, SR-01 also stayed green, and it is a good test.** It checks that a good save is accepted, and it never tries a bad one. **A test only catches what it checks.** A rule needs a test for what it forbids, as well as for what it allows. This is why the factory gives each rule a family of tests.

**Round 3 is the flip check.** Change the expected value on purpose, and the test must fail. SR-01 failed, so it really does check that value. If a test still passes when its expected value is wrong, it is checking nothing. A machine can do this to every test automatically, and the factory's gate does.

---

## 4. A family of tests for one rule

The rule: "A save must be built on the newest version."

| Member of the family | Given | When | Then |
|---|---|---|---|
| **Allowed** | At version 5 | Save built on 5 | Version 6 exists, built on 5 |
| **Forbidden** | At version 6 | Save built on 5 | Refused; still at 6 |
| **Edge: one step above** | At version 6 | Save built on 7 | The plan must decide this. Refusing is the obvious choice |
| **Exact refusal** | At version 6 | Save built on 5 | The refusal says exactly what the plan says |
| **Round trip** | Version 3 holds "12 MG Road" | A correction makes version 4 | Version 4 reads "14 MG Road"; version 3 still reads "12 MG Road" |
| **Wrong order** | Refused, as above | Re-read, then save on 6 | Version 7 exists; both changes are kept |

Notice the third row. **You cannot write the expected value, because the design never said.** That is a finding, not a problem. The factory calls this the plan's lie detector: if you cannot write the expected value, the plan is incomplete. You find this out in a conversation, not in production.

---

## 5. What makes a test trustworthy

| Property | What it means | What breaks it |
|---|---|---|
| **It can fail** | A real bug turns it red | Checks like "not empty" or "greater than zero" |
| **Its check fits what it tests** | Fixed code gives the exact same result every time. AI gives the same meaning, in different words (section 6) | The real clock and random numbers, where they are not controlled; checking an AI's exact words |
| **It stands alone** | It does not depend on another test running first | Tests sharing one database |
| **It says why** | Its name states the rule, and its ID traces to the plan | `test_save_2` |
| **It checks behaviour** | It checks what the rule says, not how the code does it | Checking which private function was called, so tidying the code breaks it |

This is why Tend needs one clock that tests control (plan 1). The real clock would make any test about a wait unreliable.

The Registrar has no AI in it, so all its tests can be exact.

---

## 6. Testing something that uses an AI

Swaraj's challenge: "it also depends on what same result means. So in AI, if I ask it for what is the capital of India, if it gives me Delhi the same time, just the writing style is different every time … Both answers are correct."

**He is right.** "The same" means two different things:
- For fixed code, it means the exact same result.
- For an AI, it means the same meaning, in different words.

So a story in the simulation runs with a real AI, and it gets checked at three levels:

| Level | What it checks | Capital of India | Meera's "hi" | If it fails |
|---|---|---|---|---|
| **The frame:** the fixed code around the AI | The exact same thing, every run | The question was saved, and the answer was sent | No situation is created; a reply goes out | A bug, every time |
| **What must always be true** of the AI's output | The meaning, never the words | The answer contains "Delhi" | Its understanding lists one ask, marked not about the business | Run it again. If it keeps failing, it is a real problem |
| **Quality:** is it actually good? | A judgment, by a person or a checked AI judge | The answer is clear | The reply suits the person | A rate across many runs, never one run |

**The frame must hold even when the AI is wrong.** Suppose the AI proposes refunding someone without permission. The AI's output failed, and the frame passes, because fixed code refused it. That is the factory's rule: the AI proposes, and fixed code decides.

**Because an AI varies, one run proves little.** Your research suggests running a story three times and taking the middle result, to separate a real regression from chance. It also suggests alerting on a change across many runs, and never on a single failure. So a story's result reads like "98 of 100 runs answered correctly", and someone decides what rate is good enough.

**Two places, two purposes:**

| | The gate | The simulation |
|---|---|---|
| When it runs | On every change | Before beta |
| AI in it | None. Your research: "Never let a fast gate block on an external model call" | **Real AI, always** |
| It tells you | The fixed code does what the plan says | Tend behaves properly, as a whole, with a real AI in it |

So nothing here makes the simulation less real. The AI stays. What changes is what we check.

## 7. Three sizes of test

| Size | What it runs | Example in Tend | Speed | How many |
|---|---|---|---|---|
| **Unit** | One piece, alone | The writer table refuses the worker writing "completed" | Instant | Many |
| **Integration** | Several pieces, with a real database | The Registrar saving a version in real SQLite | Fast | Many |
| **End to end** | The whole system | A story, in the simulation, watched on the whiteboard | Slow | Fewer |

Each catches what the others miss. A unit test cannot see two parts disagreeing. An end-to-end test cannot tell you which of a thousand lines is wrong.

**A trap: faking the database.** Many projects replace the database with a fake in tests, because it is faster. For the Registrar this would be a mistake (**Proposal**). The behaviour being tested, such as saving things together or refusing a duplicate, is the database's behaviour. A fake would only test our idea of it.

**Where Tend's tests run.**
- **Fact.** Cloudflare's test tool (a Vitest integration) "runs tests fully-locally", gives each test file isolated storage, and provides direct access to Durable Objects. That is the real Cloudflare runtime on your machine.
- **Fact.** It includes `runDurableObjectAlarm`, which fires an object's alarm on demand. So local tests never need to wait for real time. How to do this in the deployed simulation is still unchecked.

---

## 8. Who writes the tests

Here is the failure from your earlier project, in one line: **if the agent writes the code and also invents the expected values, it can always make them agree.**

So the factory splits it:

1. **You and the planning agent lock the values** in the plan, in plain words. This is a table like the one in section 4.
2. **The implementing agent translates them** into test files, before any code exists.
3. **Machines check the translation.** Every test ID in the plan exists, and no values differ.
4. **The tests fail first.** There is no code yet, so they must. This proves they can fail.
5. **The agent writes code until they pass.**
6. **Machines try to break them:** flip each expected value; remove a check on purpose (mutation testing).
7. **You read the tests,** to learn how each row of your table became code.

The principle: **the plan locks both sides of every comparison, so the agent writes neither of them.**

---

## 9. What a senior would remember

1. A test is given, when, then, with the expected value written in advance.
2. Green proves nothing until you know the test can go red.
3. A test only catches what it checks, so each rule needs its forbidden case.
4. If you cannot write the expected value, the plan is unfinished.
5. Whoever writes the code must not choose the expected values.
6. Fixed code must give the exact same result. An AI must give the same meaning. Keep AI out of the gate, and in the simulation.

---

## Learning work

**Lock a test yourself.** The design says: "A closure must be saved with its outcome." Write this in plain words as given, when, then, with exact values:
1. the allowed case;
2. the forbidden case.

Then say: is there anything you could not write an expected value for? If so, you have found a gap in the plan.

**Spot it outside Tend.** A bank tests its withdrawal rule with one test: "withdrawing 100 from an account holding 500 succeeds." What bug could ship, with this test green? Which member of the family is missing?

---

## Sources

- Workers Vitest integration: https://developers.cloudflare.com/workers/testing/vitest-integration/
- Its test APIs, including `runDurableObjectAlarm`: https://developers.cloudflare.com/workers/testing/vitest-integration/test-apis/
- Your research on evaluation: `knowledge_base/research/observability_explainability_and_finetuning_research.md`
- The factory's Stages 2 and 3: `knowledge_base/software_factory_with_coding_agents.md`
