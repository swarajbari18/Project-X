# Configuration

This file is for whoever builds configuration. It can be built from this file alone. It says what the part must do, not what technology builds it.

**Statuses.** A rule is **Decided** unless one of these words sits beside it: **Provisional** (a working choice with a condition for reopening it), or **deferred to configuration**, **deferred to Level 3**, or **deferred to implementation** (a value or a detail left, on purpose, to each business or market, to the stage that chooses the technology, or to whoever builds it; the rule around it is Decided). The project owner is the person designing Tend. On 2026-10-22 the project owner accepted every recommendation this design had made, and asked for the smaller questions inside them to be settled in the way that best fits; those points are Decided. A rule marked as "the design's reading" was worked out from its sources rather than found written down; it is Decided too. The earlier words **To confirm** and **Open** are no longer used. "The business owner" means the person who runs the business Tend serves. <!-- decided by the owner, 2026-10-22 -->

**Words used here.** A **setting** is a fixed-form entry Tend keeps for the business, such as the refund setting — the largest refund that goes through without a person. A **policy** says when a step is allowed or required. A **grant** is a range of steps a business allows Tend to take without asking. The **configurator** is the person who sets the business up: the business owner, or someone the business owner names. The **trusted permission store** is the one saved list of what the business allows; the permission check reads it. A **capability** is one action Tend can take, such as checking where a delivery is. The **product team** is the people who build Tend. A **hard rule** is a limit no setting may cross; only the product team writes them. A setting's **shape** is the fixed form it must take. A **clash** is two settings that cannot both apply. **Compliance settings** are the legal requirements for one market. A **waiver** is a recorded exception to a meeting limit. <!-- Q1; Level 2 growth: three things that sound the same; T3; G7; AC-4; Level 2 growth: what a capability is -->

**More words.** An **arrival** is anything that comes in from outside — a person's message, or an outside system's answer — saved as a new version. A channel **bound** to a member shows only which channel a message came through, and names that member. A **fresh sign-in** is one made within the last 15 minutes. The **refund setting** is the largest refund that goes through without a person; it starts at zero. <!-- decided 2026-10-22: the status-check answer; decided 2026-10-22: identity and permission; decided by the owner, 2026-10-12: refund setting -->

<!-- Every rule below carries its code in a hidden note. Its meaning, source, and status sit in code_index.md in this folder. -->

**Updated 2026-10-28.** A business may connect any MCP server; configuration captures its tool list. A business's skills and procedures live in memory and knowledge's versioned object storage; a procedure's parameters stay here. <!-- N27; N26 -->

**1. What is this part for?**

It holds the business's settings and permissions, written only by the configurator's fixed tools. It is the only writer of the trusted permission store. <!-- Section 7: configuration; AC-4 -->

**2. Why is it a separate part?**

If the AI could change a grant, it could give itself permission to send a refund. One writer, through fixed tools, keeps the permission store trusted. The boundary decision is in [the parts file](../boundary_view/the_parts.md). <!-- AC-4; Section 7: configuration -->

**3. What does it do?**
- Stores each setting with its fixed shape, and checks each value before it is applied: its shape, the hard rules, and whether it clashes with another setting. <!-- Q1; Level 2 growth: what a setting is -->
- Writes grants, through the configurator's fixed tools only. <!-- G7 -->
- Keeps **membership** — which proved people are members of this business, with which roles — and **channel bindings**, a member's WhatsApp, Telegram, or email tied to their membership. Both are written only by its fixed tools: membership when the configurator invites or removes someone; a binding only while the member is signed in, through a one-time link sent to that handle. A changed WhatsApp identifier suspends the binding until it is proved again; moving a binding to another person needs the configurator. <!-- decided 2026-10-22: identity and permission; settled 2026-10-22: changed bindings -->
- Carries each new capability through nine stages, in order: <!-- Q2 -->
  1. requested;
  2. evaluated;
  3. written;
  4. given its contract: its limits, how it fails, and whether its step can be undone;
  5. checked;
  6. tested;
  7. switched on;
  8. watched;
  9. retired.

  For example, "check where a delivery is" passes through the first seven stages before a business can use it; it is then watched, and retired at the end of its life.
- Carries each policy through its life: drafted; checked; switched on; versioned; replaced or expired; retired. No version quietly overwrites another. <!-- Q2 -->
- Holds the business's compliance settings for each market. <!-- Section 7 additions: compliance settings -->
- Shows a missing or unsupported setting as a gap, never refusing it silently. <!-- Q4 -->
- Connects an MCP server the business chooses, through the configurator's fixed tool. It captures the server's tool list, versions it, and records its hash; the tools join the business's tool list under the business's grants. When the server later changes its tool list, the new version waits for the configurator's approval; until then, the old list stands. <!-- N27; U5 -->
- Holds a procedure's parameters. The procedure's text, like every skill, lives in memory and knowledge's object storage. <!-- N26 -->
- Holds the business's learning mode: automatic (the default), off, or each lesson checked by a person. <!-- N6 -->
- Holds the product loop's business settings (added 2026-10-29), each with a product default:
  - the **currentness rule** for each kind of claim: how old a claim may be and still be told as current, when the conversation manager answers from what Tend holds. With no rule for a kind, that kind is never answered that way. Deferred to configuration;
  - whether a **general question** from a customer (not about the business) gets a short answer, or the business's polite line instead. Product default: a short answer (a call, not yet confirmed by the project owner);
  - a **courtesy reply** to a thank-you that answers nothing. Product default: none (a call, not yet confirmed);
  - the stage limits: AI passes of understanding the arrival, turns per gathering pass, reads per explore step, rounds per run. Starting values are in the memory and knowledge design; final values deferred to Level 3.

  The configuration's own store is what the conversation manager reads when it answers from a configured fact, such as the business's hours; a cache never stands in for it. <!-- PL-8; PL-10; PL-2 -->

**4. What does it never do?**
- No AI, no background program, and no part of memory and knowledge may change a grant, a membership, or a binding. <!-- Section 7: configuration; decided 2026-10-22: identity and permission -->
- It never takes a bound channel, a name, a phone number, or an email address as proof of a person; only a sign-in through the sign-in provider proves one. <!-- decided 2026-10-22: identity and permission -->
- It never takes free text or free code as a setting. <!-- Q1 -->
- It never lets a setting cross a hard rule; such a request is refused, and the refusal shown. <!-- Level 2 growth: the hard line -->
- The configurator may not pass the power to set grants and settings to anyone else, until the business's own written answers settle whether it can. A clerk who says "the owner agreed, set it" cannot do it. <!-- Section 10: configurator's power -->
- It never learns a setting from old situations; settings are the business's own decisions. <!-- decided 2026-10-03: settings are settings -->

**5. What does it own and write?** <!-- Section 7: configuration -->
- grants;
- membership, and channel bindings, each with its evidence and a date to review it; <!-- decided 2026-10-22: identity and permission -->
- the business's settings, each with its fixed shape;
- the shapes the product team wrote, and the checks for each setting;
- each capability's and each policy's place in its life;
- the compliance settings for each market;
- each connected MCP server's captured tool list, with its version and hash. <!-- N27 -->

The product team writes the shapes, the list of capabilities, and the hard rules. The business fills in values, chooses what to switch on, and decides who holds which role and grant. Neither can do the other's part. <!-- Level 2 growth: who decides what -->

**6. What does it decide, and what may it not decide?**

| Decision | Who decides | Who acts | Who approves |
|---|---|---|---|
| Whether a proposed setting passes its check | Fixed code in configuration | The configuration tools | — |
| Which version a situation follows after a policy change | The business owner | Configuration records it | The business owner |
| Who is a member, with which roles | The configurator, freshly signed in | Configuration's fixed tools | — |
| A change to the compliance settings | The configurator, freshly signed in | Configuration's fixed tools | A second person |

How a change reaches open work: <!-- Section 7: configuration; Q3; decided 2026-10-09: platform-rule split -->

| What changed | What happens to open situations |
|---|---|
| A business policy or workflow | Each open situation keeps the version it started with. The business owner chooses whether to move it to the new version; the same situation moves, and no linked one opens |
| The refund setting | Read each time a refund is tried; nothing is checked again |
| Another business setting | Read the next time it is used; open situations are not woken |
| A grant, or a membership | Live: a removed grant or member stops working at once |
| A platform's rule | Every open situation meets the new rule before it next acts; the conversation manager wakes the situations with a step pending on that channel, released at a steady pace. The rule is held in the channel's rule record, which the communication layer holds |

<!-- my call: a policy change moves the same situation; decided by the owner, 2026-10-10: refund setting read at attempt; T6; decided 2026-10-22: identity and permission; L1; decided 2026-10-22: platform rule wake -->

If the business owner does not answer by a policy's deadline, the situation stays on the old version, and they are asked again. <!-- accepted call: policy deadline -->

If two versions of one policy clash, the version switched on most recently applies, and the clash is shown to the business. <!-- accepted call: policy tie-break -->

**7. What makes it change, and what makes it grow?**

It changes when a new kind of setting appears, a new country's legal rules apply, or a new way of versioning a policy is needed. This is the design's reading. <!-- change drivers: configuration -->

It grows as a business adds roles, narrows grants, switches on capabilities, and fills in policy values; the core stays the same. <!-- Level 2 growth: one person or a team -->

**8. What starts it, what does it read, and what does it hand on?**
- **Starts it:** the configurator, through the fixed tools, after a fresh sign-in through the sign-in provider — within the last 15 minutes, unless the business has set less; a setting memory and knowledge proposes, which the configurator checks. <!-- G7; N13; decided 2026-10-22: identity and permission; settled 2026-10-22: fresh sign-in -->
- **Reads:** the shapes and checks for each setting; the hard rules.
- **Hands on:** the trusted permission store, membership, and channel bindings, read by the permission check and the intake step; the settings, read when they are used; the version of each policy, recorded when a situation opens. <!-- AC-4; Level 2 growth: the rule context -->

**9. How does it work inside?**
1. The configurator, freshly signed in, asks for a change, through the fixed tools.
2. The change is checked: its shape, the hard rules, and clashes.
3. If it passes, it is saved as a new version. Only then is the configurator told it is saved. <!-- decided 2026-10-03: settings are settings -->
4. The change reaches open work as the table in question 6 says.

```text
configurator ─▶ fixed tools ─▶ check: shape? hard rules? clash? ─┬─ fails ─▶ refused, with the reason shown
                                                                 └─ passes ─▶ new version saved ─▶ "saved" told to the configurator
                                                                                 └─▶ reaches open work by its kind (question 6)
```

For example, the business owner says refunds above 2,000 need their approval. The rule is written into the settings by the configurator. The next refund above 2,000 meets the setting at the moment it is tried. A clerk who says "the owner agreed, set it" is not the configurator; Tend records the request and asks the business owner, or refuses. <!-- decided 2026-10-03: settings are settings -->

**10. How does it behave in each kind of situation?**

| Kind of situation | What configuration does |
|---|---|
| [1. An irreversible action's outcome stays unknown](../behaviour_view/kind_01_unknown_result.md) | Holds the refund setting the refund was checked against |
| [2. An outside system is down, slow, or too stale](../behaviour_view/kind_02_outside_system_down.md) | Holds the business's wait limits and escalation path |
| [3. A partial answer arrives](../behaviour_view/kind_03_partial_answer.md) | Not involved beyond the common path |
| [4. One instruction fans out to many people](../behaviour_view/kind_04_one_to_many.md) | Not involved beyond the common path |
| [5. No source and no person can answer](../behaviour_view/kind_05_no_source.md) | Shows a missing capability as a gap |
| [6. A timer and a reply race](../behaviour_view/kind_06_timer_and_reply.md) | Not involved beyond the common path |
| [7. An unrequested document or unknown event arrives](../behaviour_view/kind_07_unrequested_arrival.md) | Not involved beyond the common path |
| [8. A message cannot be pinned to one situation](../behaviour_view/kind_08_unclear_message.md) | Not involved beyond the common path |
| [9. Two sources disagree](../behaviour_view/kind_09_sources_disagree.md) | Holds the business's own order of sources, where it set one |
| [10. A person does not act, or is unavailable](../behaviour_view/kind_10_person_silent.md) | Holds the business's cover rules and escalation path |
| [11. An action needs approval, or must be refused](../behaviour_view/kind_11_approval_or_refusal.md) | Holds the grants, the refund setting, and membership the permission check reads; refuses a clerk's change to what the business allows |
| [12. The world changes while work is open](../behaviour_view/kind_12_world_changes.md) | Records the change: a policy stays at each open situation's version; another setting is not re-checked; a removed grant or member stops at once |
| [13. Who is speaking is unknown or unverified](../behaviour_view/kind_13_unknown_speaker.md) | Holds membership and channel bindings, which the intake step reads to fix who sent a message; a number bound to no member names no one |
| [14. Work is blocked, interrupted, or wrongly closed](../behaviour_view/kind_14_blocked_or_reopened.md) | Not involved beyond the common path |
| [15. A human commitment changes shape](../behaviour_view/kind_15_human_commitment.md) | Holds the meeting limits, waivers, and expiry rules |

<!-- decided: the fifteen kinds; Section 8 additions: escalation set by the business; Section 8 additions: meeting values; Level 2 conflict resolution -->

The walks are in [how a situation moves](../behaviour_view/how_a_situation_moves.md).

**11. What are its key moments?**
- The business changes its returns policy while situations are open (kind 12).
- A clerk tries to change what the business allows (kind 11).

**12. What happens when things go wrong?**
- A copy kept for speed can never allow a step. <!-- AC-4 -->
- A member who leaves: the configurator removes the membership, and it fails at the person's very next step. A channel binding names a member; once the membership is gone, that binding no longer names an active member. <!-- decided 2026-10-22: identity and permission; Level 2 compliance: leavers -->
- While the trusted store cannot be reached, the step is refused or held, with the reason, and the settings already in force stay safe. <!-- scratch: configuration unavailable -->
- When the store is back, each held step is checked again from the start, against the live store; nothing held during the outage runs on an earlier answer. <!-- settled 2026-10-22: access after the store returns -->
- A change that is unclear about what it means for an open situation becomes work for a person: the business owner decides. <!-- Level 2 growth: an unclear change -->

**13. Which rules must always hold here?**

| Rule | How a break would show |
|---|---|
| Only the configurator's fixed tools write grants | A grant changed by the AI, or by memory and knowledge |
| Every setting has a fixed shape and passes its check | A setting saved as free text |
| A business policy never changes silently under an open situation | Meera's return handled under rules she was never told about |
| A removed grant, or a removed membership, stops working at once | An employee who left still approving refunds |
| A binding is made only while the member is signed in | A WhatsApp number tied to a member with no sign-in behind it |
| A missing setting is shown, never refused silently | A business that cannot tell why a capability does nothing |

<!-- G7; Q1; Q3; T6; decided 2026-10-22: identity and permission; Q4 -->

**14. What must be visible afterwards?**

Every change: who changed what, when, and why, with the configurator's sign-in identity and sign-in time; each binding's evidence; and which version of which rule governed each step of each situation. <!-- Level 2 authority: the configuration tools; Level 2 growth: the rule context -->

**15. How do we know it is built correctly?**
- A grant change attempted by any path other than the configurator's fixed tools fails. A failure looks like: a grant whose record shows the AI or memory and knowledge as its writer.
- A connected MCP server that adds a tool does not make it usable until the configurator approves the new list. A failure looks like: a call to a tool that is not in an approved list.
- A setting with the wrong shape is refused before it is applied. A failure looks like: a refund setting saved as free text.
- A policy change leaves open situations on their version until the business owner moves them. A failure looks like: Meera's open return handled under the new policy with no choice recorded.
- The refund setting changed mid-situation is the value met at the next refund attempt. A failure looks like: a refund checked against the old value after the change.
- A member removed at 10:00 cannot approve at 10:01. A failure looks like: Kabir's approval accepted after the configurator removed him.

<!-- G7; Q1; Q3; decided by the owner, 2026-10-10: refund setting read at attempt -->

**16. What is still open?**

Nothing in this part is open. The exact set of tools is designed when they are built (deferred to implementation); they must do at least the list in question 3, which stays **Provisional** until then, as the business's authority answers mark it. How long the business owner has to answer a policy notice is a value each business sets (deferred to configuration). <!-- Level 2 authority: the configuration tools; Level 2 growth: open -->

**17. Where did this come from?**

[The parts file](../boundary_view/the_parts.md) (the boundary decision), [the interactions file](../interaction_view/the_interactions.md) (interactions 20, memory and knowledge proposes; 21, a setting or rule changes), [the decisions file](../decision_view/the_decisions.md) (decision 25, membership and channel bindings; decisions 8, checked people and grants; 9, the refund setting; 10, policies fixed per situation), and [the memory and knowledge, configuration and improvement file](../responsibility_view/memory_configuration_and_improvement.md).
