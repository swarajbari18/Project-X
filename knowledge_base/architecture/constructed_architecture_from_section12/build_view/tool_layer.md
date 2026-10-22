# The tool layer

This file is for whoever builds the tool layer. It can be built from this file alone. It says what the part must do, not what technology builds it.

**Statuses.** A rule is **Decided** unless one of these words sits beside it: **Provisional** (a working choice with a condition for reopening it), or **deferred to configuration**, **deferred to Level 3**, or **deferred to implementation** (a value or a detail left, on purpose, to each business or market, to the stage that chooses the technology, or to whoever builds it; the rule around it is Decided). The project owner is the person designing Tend. On 2026-10-22 the project owner accepted every recommendation this design had made, and asked for the smaller questions inside them to be settled in the way that best fits; those points are Decided. A rule marked as "the design's reading" was worked out from its sources rather than found written down; it is Decided too. The earlier words **To confirm** and **Open** are no longer used. "The business owner" means the person who runs the business Tend serves. <!-- decided by the owner, 2026-10-22 -->

**Words used here.** An **outside system** is any system Tend does not own: a payment provider, a carrier, a calendar, or a messaging channel. A **tool** is one fixed path for one kind of call. The **permission check** answers Allow, Deny, or "a person must approve first"; it reads the **trusted permission store**, the one saved list of what the business allows. A **grant** is a range of steps a business allows Tend to take without asking. **Connection codes** are the password-like codes that open the business's systems. A **step that cannot be undone** is one such as a refund or a sent message. The **approval step** is the fixed step where a named person says yes before a call runs. The **check for an earlier attempt** looks in the situation for a step already started. **Evidence** is what a call returns; it is not a decision. Each tool has a **list of places** it may reach. The **note** is what the tool layer writes just before a step that cannot be undone. <!-- Section 7: tool layer; T2; AC-4; T3; Section 7 additions: connection codes; T7; IB-8; Section 7 additions: destinations -->

**More words.** A tool **declares** a wait when its result states, in a fixed form, what is awaited, from whom, and what ends it. An **arrival** is anything that comes in from outside — a person's message, or an outside system's answer — saved as a new version. A **member** is a person who works for the business, proved by the sign-in provider the business uses (the outside service that checks who a person is when they sign in). A **capability** is one action Tend can take, such as checking where a delivery is; each business switches on the ones it wants. The **refund setting** is the largest refund that goes through without a person; it starts at zero. <!-- decided 2026-10-22: the wait a tool declares; decided 2026-10-22: the status-check answer; decided 2026-10-22: identity and permission; accepted call: capabilities; decided by the owner, 2026-10-12: refund setting -->

<!-- Every rule below carries its code in a hidden note. Its meaning, source, and status sit in code_index.md in this folder. -->

**1. What is this part for?**

It is the only way Tend calls an outside system. Every call passes the permission check here, before it runs. <!-- Section 7: the parts table; Section 7: tool layer -->

**2. Why is it a separate part?**

Every call to the outside world must pass one permission check, and one note of what is about to happen before money moves. Keeping all calls in one part keeps those checks in one place. This is the design's reading. The boundary decision is in [the parts file](../boundary_view/the_parts.md). <!-- closed item: tool layer reason -->

**3. What does it do?**
- Runs the permission check before every call, reading the trusted permission store at that moment. <!-- Section 7: tool layer -->
- For any call that changes something outside Tend, runs these steps in order: <!-- decision record 5 -->
  1. check that a source can answer;
  2. check permission;
  3. check for an earlier attempt;
  4. write the note of what is about to happen;
  5. make one call.
- Retries a call that fails briefly, within a set limit. A service that stays down is not called again and again. <!-- M4 -->
- Asks an outside system for news up to five times for one wait, and only where it knows how fast that system usually answers; a business may set its own number. Then its result declares the wait — what is awaited, from whom, and what ends it — and the situation worker's fixed code saves it. <!-- M5; settled 2026-10-22: the five per wait; decided 2026-10-22: the wait a tool declares -->
- Makes the status-check service's asks, as the same tool's read-only status check, with the same permission check and call record as any call. <!-- decided 2026-10-22: the service calls through the tool layer -->
- Runs the approval step: when a person must approve first, the request goes through it. An approval covers one request and is used once. It lapses if the situation changes, or when the business's deadline for that kind of approval passes. It passes to another person only where a grant allows it. With no response, the request goes to the escalation path. A situation cannot close while an approval request is open. The approver must be a member, freshly signed in. <!-- T7; accepted call: one approval, one request; decided 2026-10-22: identity and permission -->
- Makes the sends the communication layer passes to it. <!-- M4 -->

**4. What does it never do?**
- It never decides the next step. <!-- Section 7: tool layer -->
- It never writes the situation record. What it returns is evidence; the situation worker decides what it means. A wait it hands to the status-check service is declared in its result, and saved by the worker's fixed code. <!-- Section 8: the save protocol; construction record, entry 21: writer question; decided 2026-10-22: the wait a tool declares -->
- It never repeats a step that cannot be undone when its result is unknown. The one exception: after asking the other side for the result and finding it still unknown, it may send the same request again, with the same reference, when the other side can recognise it as a repeat and will not act twice. <!-- Section 8: resend or new start -->
- It never shows connection codes to the AI. <!-- Section 7 additions: connection codes -->
- It never reaches a place that is not on the tool's list. <!-- Section 7 additions: destinations -->
- The AI never calls the approval step, and holds no approval state. <!-- T7 -->

**5. What does it own and write?** <!-- Section 7: tool layer writes -->
- the state of its tries for each call;
- the note of what it is about to do, written before a step that cannot be undone — before any money moves;
- the record of each important call it makes;
- each business's connection codes;
- the approval step;
- each tool's list of places it may reach.

**6. What does it decide, and what may it not decide?**

| Decision | Who decides | Who acts | Who approves |
|---|---|---|---|
| Whether a call may run | The fixed permission check, against the trusted permission store at that moment | The tool layer | A named person, where the check says one must approve first |
| Whether a brief failure is retried | A set limit | The tool layer | — |
| Whether a step that cannot be undone was already started | The check for an earlier attempt, against the situation. This is not a permission check; a refund needs both | The tool layer | — |
| What a result means | Not the tool layer: the situation worker | The situation worker | — |

<!-- Section 7: tool layer; IB-8 -->

The check for an earlier attempt reads the situation record before the note of intent is written, so it never finds its own note. <!-- IB-8: the record check -->

**7. What makes it change, and what makes it grow?**

It changes when a new outside system or capability joins, or when an outside system changes how it works. This is the design's reading. <!-- change drivers: tool layer -->

**8. What starts it, what does it read, and what does it hand on?**
- **Starts it:** a call from the situation worker; a send from the communication layer; an ask from the status-check service. <!-- Section 7: tool layer; decided 2026-10-22: the service calls through the tool layer -->
- **Reads:** the trusted permission store; the situation, for an earlier attempt; the connection codes. <!-- AC-4; IB-8 -->
- **Hands on:** evidence back to the worker, including a declared wait in its result, which the worker saves, and which the status-check service then serves; an approval request, through the communication layer. <!-- Section 7: tool layer; M5; T7 -->

**9. How does it work inside?**

For a refund, for example: <!-- decision record 5; IB-8; IB-10 -->
1. Check that a source can do refunds: the payment provider is connected.
2. Check permission. Above the refund setting, a named person must approve first.
3. Check that no earlier refund was started.
4. Write the note: "refund 9912 about to go", with its reference.
5. Make one call.
6. If no final answer comes, ask for news up to five times for this wait; then return the evidence and declare the wait, which the worker saves before the AI is told, and the status-check service takes over.
7. Return the evidence to the worker: started, result unknown — or paid.

```text
call ─▶ a source can answer? ─▶ permission? ─▶ earlier attempt? ─▶ write the note ─▶ one call
            │ no                  │               │ yes                                  │
            ▼                     │               ▼                                      ▼
       nothing to call            │          not sent again               answer ─▶ evidence to the worker
                                  │          (the worker records          no answer ─▶ ask up to five times
                                  │           it as unknown)                         ─▶ status-check service
                                  ├─ Deny ─▶ refused, with its reason; not retried unless something changes
                                  └─ a person must approve first ─▶ wait for that person's yes; then check again
```

<!-- Section 8: failure shapes -->

**10. How does it behave in each kind of situation?**

| Kind of situation | What the tool layer does |
|---|---|
| [1. An irreversible action's outcome stays unknown](../behaviour_view/kind_01_unknown_result.md) | Checks for an earlier attempt; writes its note before the call; makes one call; asks up to five times for the wait; declares the wait in its result, which the worker saves, and the status-check service serves; never repeats |
| [2. An outside system is down, slow, or too stale](../behaviour_view/kind_02_outside_system_down.md) | Retries a brief failure within its limit; does not keep calling a service that stays down |
| [3. A partial answer arrives](../behaviour_view/kind_03_partial_answer.md) | Returns what each source answered, as evidence; runs the approval for a disclosure |
| [4. One instruction fans out to many people](../behaviour_view/kind_04_one_to_many.md) | Makes each person's send as its own call, each checked |
| [5. No source and no person can answer](../behaviour_view/kind_05_no_source.md) | Finds no connected source that can answer |
| [6. A timer and a reply race](../behaviour_view/kind_06_timer_and_reply.md) | Not involved beyond the common path |
| [7. An unrequested document or unknown event arrives](../behaviour_view/kind_07_unrequested_arrival.md) | Not involved beyond the common path |
| [8. A message cannot be pinned to one situation](../behaviour_view/kind_08_unclear_message.md) | Not involved beyond the common path |
| [9. Two sources disagree](../behaviour_view/kind_09_sources_disagree.md) | Returns each source's answer as evidence; never decides which is right |
| [10. A person does not act, or is unavailable](../behaviour_view/kind_10_person_silent.md) | Makes the sends for reminders and escalations |
| [11. An action needs approval, or must be refused](../behaviour_view/kind_11_approval_or_refusal.md) | Runs the permission check and the approval step; checks permission again just before acting; returns a refusal with its reason |
| [12. The world changes while work is open](../behaviour_view/kind_12_world_changes.md) | Reads the trusted permission store at each call, so a removed grant stops the next call |
| [13. Who is speaking is unknown or unverified](../behaviour_view/kind_13_unknown_speaker.md) | A read that would reveal information passes the permission check; nothing is revealed to an unchecked sender |
| [14. Work is blocked, interrupted, or wrongly closed](../behaviour_view/kind_14_blocked_or_reopened.md) | After a restart, its note of what it was about to do stops a step that cannot be undone from running twice |
| [15. A human commitment changes shape](../behaviour_view/kind_15_human_commitment.md) | Makes the calendar calls to book again |

The walks are in [how a situation moves](../behaviour_view/how_a_situation_moves.md). <!-- decided: the fifteen kinds -->

**11. What are its key moments?**
- The refund on order 9912 that the payment provider never confirms (kind 1).
- The refund of 1,500 above the refund setting, which waits for a named person's yes (kind 11).

**12. What happens when things go wrong?**
- A brief failure is retried within its limit; a service that stays down is not called again and again. <!-- M4 -->
- An unknown result is checked before anything is repeated. When the outside system can neither be asked nor sends news, the result is declared unknown at once, and a person gets the full record; the step is never repeated automatically. <!-- decision record 5; Section 8 additions: no check path -->
- A Deny ends that call, not the situation; the reason goes back to the worker as the call's result. <!-- AC-2 -->
- If the tool layer is down, the situation worker saves no change that depends on it. <!-- Section 7: failure and unavailability -->

**13. Which rules must always hold here?**

| Rule | How a break would show |
|---|---|
| Every outside call passes the permission check first | A refund in the payment provider's records with no permission check before it |
| A step that cannot be undone is never repeated on an unknown result | The refund on order 9912 paid twice |
| The note of what is about to happen is written before money moves | A refund with no note before its call |
| A copy of permissions kept for speed never allows a step | A step allowed after its grant was removed |
| The AI never sees connection codes | A connection code inside a trace |

<!-- T2; IB-10; Section 7: tool layer writes; AC-4; Section 7 additions: connection codes -->

**14. What must be visible afterwards?**

Each important call: what was asked, the permission check's answer, the earlier-attempt check, the note written before the call, and the result. Each approval: the member, their sign-in identity, when they signed in, and exactly what they approved. Each decision and action also goes to the audit, which is only ever added to, and holds no secrets. <!-- O7; T9 -->

**15. How do we know it is built correctly?**
- A refund proposed while an earlier one is unknown is stopped by the check for an earlier attempt. A failure looks like: two refund calls for order 9912.
- A refund above the refund setting does not run until a named person says yes, and permission is checked again just before it runs. A failure looks like: the refund of 1,500 paid with no approval in the record.
- A call to a place not on the tool's list is refused. A failure looks like: a call that reached an address no tool lists.
- After a grant is removed, the next call it covered is refused. A failure looks like: a call allowed by a grant that no longer exists.

<!-- IB-8; AC-3; Section 7 additions: destinations; T6 -->

**16. What is still open?**

Nothing in this part is open. Each outside system's retry limits, and its own number of short asks if a business sets one, come with its capability and the business's settings (deferred to configuration). <!-- M5; Level 2 failure: the numbers -->

**17. Where did this come from?**

[The parts file](../boundary_view/the_parts.md) (the boundary decision), [the interactions file](../interaction_view/the_interactions.md) (interactions 4, calling an outside system; 5, a step that cannot be undone; 7, approval first), [the rules that always hold](../constraint_view/the_rules_that_always_hold.md), [the decisions file](../decision_view/the_decisions.md) (decisions 7, through the tool layer; 8, checked people and grants; 9, the refund setting), and the responsibility view's [deciding and permission](../responsibility_view/deciding_and_permission.md) and [failure](../responsibility_view/failure_and_recovery.md) files.
