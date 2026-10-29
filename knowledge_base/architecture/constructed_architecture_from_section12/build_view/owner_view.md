# The owner view

This file is for whoever builds the owner view. It can be built from this file alone. It says what the part must do, not what technology builds it.

**Statuses.** A rule is **Decided** unless one of these words sits beside it: **Provisional** (a working choice with a condition for reopening it), or **deferred to configuration**, **deferred to Level 3**, or **deferred to implementation** (a value or a detail left, on purpose, to each business or market, to the stage that chooses the technology, or to whoever builds it; the rule around it is Decided). The project owner is the person designing Tend. On 2026-10-22 the project owner accepted every recommendation this design had made, and asked for the smaller questions inside them to be settled in the way that best fits; those points are Decided. A rule marked as "the design's reading" was worked out from its sources rather than found written down; it is Decided too. The earlier words **To confirm** and **Open** are no longer used. "The business owner" means the person who runs the business Tend serves. <!-- decided by the owner, 2026-10-22 -->

**Words used here.** A **situation** is one operational problem, such as Meera's late parcel. Its record is a list of saved **versions**. An **alert** is news that reaches the business owner without them opening a screen. The **product team** is the people who build Tend. A **role** is what one person may see, such as the business owner, an administrator, or a clerk. **Blocked** means a situation with no safe step left and no one left to escalate to, its reason shown. The **escalation path** is the business's own list of who to turn to next. A **platform notice** is news from a channel's platform. <!-- A1; HC-1; O3; T11; Section 8: the states table; J5 -->

**More words.** An **arrival** is anything that comes in from outside — a person's message, or an outside system's answer — saved as a new version. A **capability** is one action Tend can take, such as checking where a delivery is; each business switches on the ones it wants. <!-- decided 2026-10-22: the status-check answer; accepted call: capabilities -->

<!-- Every rule below carries its code in a hidden note. Its meaning, source, and status sit in code_index.md in this folder. -->

**1. What is this part for?**

It builds the screens people open — for the business owner, the administrator, and the product team — from the saved records, when someone asks. It writes nothing. <!-- Section 7: the parts table; O2 -->

**2. Why is it a separate part?**

Showing the work and carrying messages to customers are different jobs. That reason comes from an earlier form of the design. The boundary decision is in [the parts file](../boundary_view/the_parts.md). <!-- Section 7 archive: owner view record -->

**3. What does it do?**
- Shows the work as things the business owner can open, search, and filter — not as a long chat. <!-- O1 -->
- Builds each screen from the situation records when asked, and shows when it was last updated. It is never a second copy of the facts: if a screen and the record disagree, the record is right. <!-- O2 -->
- Explains a step at each person's depth, from the record. <!-- O4 -->
- Shows the business owner the business's results, such as refunds waiting on a payment provider. It never shows uptime or message counts. Every figure opens to its detail. <!-- O9 -->
- Shows system health apart from the business's work; the product team's view and the business owner's view differ. <!-- O6 -->
- Sends an alert, without waiting to be opened, for four kinds of news: <!-- O3 -->
  - a decision only the business owner can make;
  - a deadline or platform notice that puts the business at risk;
  - an escalation that has gone past everyone assigned;
  - a change that alters the business's next decision, such as a prospect accepting a meeting. <!-- Level 2 business view: meaningful change -->

  Other notices to the business owner can be grouped, or sent at once, as the business owner chooses. The business owner sets how long a group lasts, and the quiet hours, in their own update settings; a decision with a deadline still reaches them in time. <!-- Section 8 additions: owner notices -->

**4. What does it never do?**
- It never writes to a situation. <!-- Section 8: the save protocol -->
- It never sends a message to a customer. <!-- Section 7 archive: owner view record -->
- It never shows a person more than their role allows. <!-- T11 -->

**5. What does it own and write?**

Nothing. Counts it shows, such as a person's missed meetings, are worked out from the records, never stored on their own. <!-- Section 8: the save protocol; Level 2 meetings: two counts -->

**6. What does it decide, and what may it not decide?**

Nothing about the business's work. Each person's role decides what they see: a solo business owner sees the whole business; each role narrows as roles are added. <!-- T11 -->

| Decision | Who decides | Who acts | Who approves |
|---|---|---|---|
| What a person sees | Their role, set by the business | The owner view | — |
| Whether a change is one of the four kinds of alert | Fixed rules | The owner view | — |

<!-- T11; O3 -->

**7. What makes it change, and what makes it grow?**

It changes when the business owner asks for a screen that does not exist yet, such as a list of every refund waiting on a payment provider. This is the design's reading. <!-- change drivers: owner view -->

**8. What starts it, what does it read, and what does it hand on?**
- **Starts it:** a person opening a screen; a change that is one of the four kinds of alert. <!-- O2; O3 -->
- **Reads:** the saved records of situations, only the fields each role may see. <!-- O2; T11 -->
- **Hands on:** screens and alerts, to people. Nothing goes back into the records.

**9. How does it work inside?**
1. A person opens a screen, or an alert is due.
2. The view reads the newest saved records, inside the person's role.
3. It builds the screen, and shows when it was last updated.

```text
a person opens a screen ─┐
                          ├─▶ read the newest records, inside the person's role ─▶ build the screen, with "last updated"
an alert is due ─────────┘                                                      ─▶ nothing is written back
```

**10. How does it behave in each kind of situation?**

| Kind of situation | What the owner view shows |
|---|---|
| [1. An irreversible action's outcome stays unknown](../behaviour_view/kind_01_unknown_result.md) | Shows the refund waiting, with its timeline once a person must decide |
| [2. An outside system is down, slow, or too stale](../behaviour_view/kind_02_outside_system_down.md) | The wait, and a deadline at risk, as an alert where it puts the business at risk |
| [3. A partial answer arrives](../behaviour_view/kind_03_partial_answer.md) | What is answered and what is still open |
| [4. One instruction fans out to many people](../behaviour_view/kind_04_one_to_many.md) | Shows the central situation: the state of each person, each one a step away; the business owner hears only what is material |
| [5. No source and no person can answer](../behaviour_view/kind_05_no_source.md) | The honest answer given |
| [6. A timer and a reply race](../behaviour_view/kind_06_timer_and_reply.md) | Not involved beyond the common path |
| [7. An unrequested document or unknown event arrives](../behaviour_view/kind_07_unrequested_arrival.md) | A document that matched nothing, for a person |
| [8. A message cannot be pinned to one situation](../behaviour_view/kind_08_unclear_message.md) | Not involved beyond the common path |
| [9. Two sources disagree](../behaviour_view/kind_09_sources_disagree.md) | Both claims and the conflict |
| [10. A person does not act, or is unavailable](../behaviour_view/kind_10_person_silent.md) | An escalation that has gone past everyone assigned, as an alert |
| [11. An action needs approval, or must be refused](../behaviour_view/kind_11_approval_or_refusal.md) | A decision only the business owner can make, as an alert |
| [12. The world changes while work is open](../behaviour_view/kind_12_world_changes.md) | The policy choice for each open situation, as an alert |
| [13. Who is speaking is unknown or unverified](../behaviour_view/kind_13_unknown_speaker.md) | Not involved beyond the common path |
| [14. Work is blocked, interrupted, or wrongly closed](../behaviour_view/kind_14_blocked_or_reopened.md) | A blocked situation, as a decision only the business owner can make |
| [15. A human commitment changes shape](../behaviour_view/kind_15_human_commitment.md) | A person's missed meetings, counted from the events |

<!-- O3; decided: the fifteen kinds -->

The walks are in [how a situation moves](../behaviour_view/how_a_situation_moves.md).

**11. What are its key moments?**

Meera's situation is blocked: the carrier stays down and no one on the escalation path answers. The business owner gets an alert, because it is a decision only they can make (kind 14).

**12. What happens when things go wrong?**

If the owner view is down, the records are not affected; the business owner's attention may be delayed. Each business sets how long a delay it accepts. <!-- Section 7: failure and unavailability; Section 7: owner view lag -->

**13. Which rules must always hold here?**

| Rule | How a break would show |
|---|---|
| It writes nothing | A situation changed from a screen, with no part's version behind it |
| It is never a second source of truth | A screen that disagrees with the record and is believed |
| Each person sees only what their role allows | A clerk seeing the business's revenue |
| The four kinds of news reach the business owner without being opened | A blocked situation the business owner finds days later |

<!-- O2; T11; O3 -->

**14. What must be visible afterwards?**

When each screen was built, and from which records; each alert sent, and why. <!-- O2; O7 -->

**15. How do we know it is built correctly?**
- No action on any screen changes a situation's record. A failure looks like: a version whose writer is the owner view.
- Each screen shows when it was last updated. A failure looks like: a screen with no time on it.
- A role sees only the fields on its list. A failure looks like: a clerk seeing the business's revenue.
- Each of the four kinds of news produces an alert. A failure looks like: a blocked situation the business owner finds days later.

<!-- O2; T11; O3 -->

**16. What is still open?**

Nothing in this part is open. How long the view may lag while a system is down is a value each business sets (deferred to configuration); the product sets no number. <!-- Section 7: owner view lag -->

**17. Where did this come from?**

[The parts file](../boundary_view/the_parts.md) (the boundary decision), [the interactions file](../interaction_view/the_interactions.md) (interaction 22, the business owner opens a screen), [the decisions file](../decision_view/the_decisions.md) (decision 17, the owner view writes nothing), and [the business view file](../responsibility_view/business_view_and_capabilities.md).
