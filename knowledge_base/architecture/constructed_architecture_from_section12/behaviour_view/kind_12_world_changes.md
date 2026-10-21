# Kind 12: The world changes while work is open

This file answers one question: how does Tend behave when a rule, a setting, a permission, or a person's role changes while a situation is still open?

In plain words: a rule, a setting, a permission, or a person's role changes while a situation is open.

## Words in this file

- **Tend** is the software that keeps a business's operational problems moving. Each problem is one **situation**, such as Meera's late parcel. <!-- A1 -->
- The **conversation manager** takes in each arrival — a person's message, or an outside system's answer — puts it on the right situation, decides whether a person should hear an update, and alone sets a situation to completed. Its **intake step** reads each new arrival first, and saves it as a new version. <!-- Section 7: the parts table; decided 2026-10-22: the status-check answer -->
- The **situation worker** reasons about one situation: it gathers, decides the next step, and writes what Tend concludes. <!-- Section 7: the parts table -->
- The **communication layer** checks and sends each message, through the tool layer, and keeps the **sent record** of what went out. <!-- Section 7: the parts table; M4 -->
- The **tool layer** is the only way Tend calls an outside system: a payment provider, a carrier, or a messaging channel. <!-- Section 7: tool layer -->
- The **status-check service** waits on an outside system while the work goes on; its asks go out through the tool layer. **Memory** keeps what Tend learned. **Configuration** holds the business's settings, permissions, and members. <!-- Section 7: the parts table; decided 2026-10-22: the service calls through the tool layer -->
- A **version** is one saved state of a situation. A **notice** is the short internal signal a new version sends; people never see it. A **wake** is a signal that sends the worker back to a situation: a saved version's notice, a time signal, or the check-in. <!-- HC-1 -->
- A **wait** is a pause until one named thing happens. <!-- HC-3 -->
- The **book of waits** lists every wait that may outlast its run, and what will end it; it is data kept with the situation records. A timer in a diagram is the **time signal** the worker set for one of its waits; it wakes only the worker. <!-- HC-3; decided 2026-10-22: the book of waits -->
- A **check-in** is the one regular wake each waiting situation gets.
- A **held note** records that a message may belong to a situation. It changes nothing there. <!-- B9 -->
- **Evidence** is what a source said, with its time. A **claim** is one such statement. <!-- E1 -->
- **The AI** suggests a step; **fixed code** — code that always makes the same check — checks it. The **permission check** answers Allow, Deny, or "a person must approve first". <!-- Level 2 security: the spine; T2 -->
- A **grant** is a range of steps a business allows Tend to take without asking. The **configurator** is the person who sets the business up: the business owner, or someone the business owner names. Only the configurator's fixed tools write grants. <!-- T3; G7 -->
- A **member** is a person who works for the business, proved by the sign-in provider the business uses (the outside service that checks who a person is when they sign in); customers and partners are not members. A **fresh sign-in** is one made within the last 15 minutes. A channel **bound** to a member shows only which channel a message came through, and names that member; it does not prove who is typing. <!-- decided 2026-10-22: identity and permission -->
- An **arrival** is anything that comes in from outside — a person's message, or an outside system's answer — saved as a new version. A tool **declares** a wait when its result states, in a fixed form, what is awaited, from whom, and what ends it. <!-- decided 2026-10-22: the status-check answer; decided 2026-10-22: the wait a tool declares -->
- The **consent records** are the communication layer's saved record of each person's consent, for each contact point and kind of message. <!-- decided 2026-10-22: consent records -->
- The **update decision** is the conversation manager's choice: is this change worth telling this person now? The **send check** is the communication layer's check before any message goes out: a saved decision to send, an Allow, the channel's rules and the consent records met, and only allowed details in the message. <!-- decided: the update decision; Section 8: the send check -->
- The **owner view** builds the screens the business owner opens. The **product team** is the people who build Tend. <!-- Section 7: the parts table -->
- A **work item** is a task for one named person. The **escalation path** is the business's own list of who to turn to next. <!-- IA-14; J5 -->
- The **completion check** runs before a situation is resolved. Every question must have one of six endings: answered; waiting, with a reason; passed to a person; "Tend cannot know this here", with the customer still answered; waived; or replaced by a newer question. No person's task may be pending, an approval request included; a "Tend cannot know this here" answer may not be shown as a success; and every claim told to a customer must be backed by evidence. <!-- IA-23 -->
- **Resolved** means the worker has recorded the work as done. **Completed** is the state only the conversation manager sets: when the work is resolved, no wait is still running, and the last message has gone out. <!-- decided by the owner, 2026-10-12: completed -->
- A **walk** is one case traced step by step. The names, times, and amounts in it are illustrations, not rules.

**How to read the diagram.** Read it top to bottom; the number is the order. Each line says: the part on the left passes the thing after the colon to the part on the right. "(no answer)" means nothing came back. A line in brackets with no arrow is a note about time or an event. When a part appears on both sides, it is checking or acting by itself. Text after a dash says how the message travels, for example "sent through the tool layer". Lines marked "a" and "b" are two branches; only one happens.

**Statuses.** A rule is **Decided** unless one of these words sits beside it: **Provisional** (a working choice with a condition for reopening it), or **deferred to configuration**, **deferred to Level 3**, or **deferred to implementation** (a value or a detail left, on purpose, to each business or market, to the stage that chooses the technology, or to whoever builds it; the rule around it is Decided). The project owner is the person designing Tend. On 2026-10-22 the project owner accepted every recommendation this design had made, and asked for the smaller questions inside them to be settled in the way that best fits; those points are Decided. A rule marked as "the design's reading" was worked out from its sources rather than found written down; it is Decided too. The earlier words **To confirm** and **Open** are no longer used. <!-- decided by the owner, 2026-10-22 --> "The business owner" means the person who runs the business Tend serves. The full word list is in [how a situation moves](how_a_situation_moves.md).

<!-- Every rule below carries its code in a hidden note. Its meaning, source, and status sit in code_index.md in this folder. -->

## What is different here

In the common case, the rules stay the same while a situation runs. Here something changes underneath it. What reaches an open situation depends on what changed: <!-- Q3; decided 2026-10-09: platform-rule split -->

| What changed | What happens to open situations |
|---|---|
| A platform's rule, such as how long WhatsApp lets a business reply | Every open situation meets the new rule before it next acts; the situations with a step pending on that channel are woken at once |
| The refund setting | Read the next time a refund is tried; nothing is checked again |
| Another business setting | Read the next time it is used; open situations are not checked again |
| A business policy | Each open situation keeps the version it started with; the business owner chooses to keep it or move the same situation to the new one |
| A grant, or a membership | A removed grant, or a removed member, stops the next step at once |

<!-- Q3; decided 2026-10-22: platform rule wake; decided by the owner, 2026-10-10: refund setting read at attempt; Section 11 decision 8; my call: a policy change moves the same situation; T6; decided 2026-10-22: identity and permission -->

A rule change should not silently change a promise already made. A platform rule must apply now; otherwise a message may break the platform's rules. <!-- Section 11 decision 8 -->

Three parts behave differently:
- **Configuration** records a change to the business's own settings and policies, and fixed code decides how far it reaches. <!-- Section 7: configuration -->
- **The communication layer** holds each channel's rule record, which the product team updates when a platform changes its rules. The update announces itself. <!-- L1; Section 11 decision records: what could force a change -->
- **The conversation manager** reacts to that update. It reads the book of waits, finds the situations with a step pending on that channel, and writes one version into each. Each notice wakes its worker. When many are affected, their wakes are released at a steady pace. <!-- closed item: who wakes situations after a platform change; decided 2026-10-22: platform rule wake; settled 2026-10-22: steady pace -->

The business's own rule changes still wake nothing: each situation reads them fresh at its next wake, and the check at each step is the gate. <!-- Level 2 coordination: rule changes need no event -->

## Example walk: WhatsApp changes how long a business may reply

Meera wrote on WhatsApp at 18:00 yesterday, so the old 24-hour reply window closes at 18:00 today. Her parcel situation is waiting on the carrier, and Tend planned to send her the carrier's answer at 17:00 today, inside the old reply window. WhatsApp then shortens the window: it now closes at 15:00. <!-- Level 2 growth: a platform rule changes -->

```text
1.  product team         -> communication layer  : the channel's rule record updated to version 7, through its fixed tool; the update announces itself
2.  conversation manager -> book of waits        : reads: which situations have a step pending on WhatsApp?
3.  conversation manager -> situation record     : new version in Meera's situation: "WhatsApp's rule changed to version 7" (and one in each other affected situation, at a steady pace)
4.  situation record     -> situation worker     : notice
5.  situation worker     -> situation worker     : reads the newest version and the new rule; the planned 17:00 reply would fall outside the window
6.  situation worker     -> tool layer           : asks the carrier now
7.  tool layer           -> situation worker     : evidence: "out for delivery, due Tuesday"
8.  situation worker     -> situation record     : new version: what should be said, now, while the window is open
9.  situation record     -> conversation manager : notice
10. conversation manager -> communication layer  : worth telling Meera now (the update decision)
11. communication layer  -> communication layer  : send check under the new rule
12. communication layer  -> Meera                : the update, at 14:10, inside the new window — sent through the tool layer
```

<!-- Level 2 growth: a platform rule changes; decided 2026-10-22: platform rule wake; settled 2026-10-22: steady pace; L1; Section 8: the send check -->

Situations with nothing pending on WhatsApp are not woken. They meet the new rule at their next wake, and the send check stops anything no longer allowed. Tend never acts as if the old rule still holds. <!-- decided 2026-10-22: platform rule wake; Level 2 growth: a platform rule changes; Section 11: platform change walk -->

## The walk, step by step

- **Starts with:** WhatsApp's rule change. <!-- Level 2 growth: a platform rule changes -->
- **Started by:** the product team, which updates the channel's rule record.
- **The responsibility:** holding the business's settings, and handling change. <!-- Q1 -->
- **Part in charge:** the communication layer holds the channel's rule record and applies it at the send; the conversation manager wakes the affected situations. <!-- L1; L3; decided 2026-10-22: platform rule wake -->
- **The information:** the new rule; the book of waits; Meera's channel and consent. <!-- L2 -->
- **The current state:** waiting.
- **What is uncertain:** which route, and which time, is still allowed.
- **Who may decide:** the channel's rules decide; the communication layer applies them; the worker re-plans. <!-- L3 -->
- **The decision:** wake the situations with a step pending on WhatsApp; re-plan Meera's reply to fit the new window. <!-- decided 2026-10-22: platform rule wake -->
- **The change of state:** waiting to running, then waiting again on the parcel.
- **The success path:** Meera hears the news before 15:00.
- **The failure paths:**
  - No route is allowed. Tend does not refuse; the person the business names for this decides, or Tend waits for Meera to write. <!-- Level 2 channels: a routing outcome -->
  - A situation is not woken, and later tries to send under the old rule. The send check refuses it, and the worker re-plans. The observer counts such refusals. <!-- decided 2026-10-22: platform rule wake -->
  - WhatsApp shuts the channel altogether. That is not a rule change; it follows the failure path, and each affected situation moves to its next allowed channel. <!-- decided 2026-10-22: platform rule wake -->
- **A person stepping in:** only if no route is allowed.
- **The outside system:** WhatsApp.
- **What it changes next:** the channel's rule record; one version in each affected situation; every other situation meets the rule at its next wake. <!-- decided 2026-10-22: platform rule wake -->
- **The final state:** as before the change, with Meera told in time.
- **How it is checked:** the send check, under the new rule; the business's permission settings, read at the moment of each check. <!-- Section 8: the send check; AC-4 -->
- **Rebuilt afterwards from:** the rule record's versions, the version the conversation manager wrote in Meera's situation, and the send check's result. <!-- O7 -->

## Other walks beneath this kind

- **The business changes its returns policy.** Each open situation keeps the version it started with. The business owner gets an alert for each one, and chooses to keep the old version or move to the new one. A move changes the same situation; no linked situation opens. If the business owner does not answer, the situation stays on the old version, and the business owner is asked again. <!-- Section 11 decision 8; my call: a policy change moves the same situation; accepted call: policy deadline -->
- **The business lowers its refund setting from 500 to 300.** The next refund tried reads 300. A refund still in progress meets the new amount at its next try; a refund already paid is not affected. <!-- decided by the owner, 2026-10-10: refund setting read at attempt -->
- **An employee leaves mid-situation.** The configurator removes their membership. They lose access the same minute: the next step they would have taken is refused. A channel binding names a member; once the membership is gone, that binding no longer names an active member. <!-- T11; T6; decided 2026-10-22: identity and permission; Level 2 compliance: leavers -->
- **Their approvals still waiting.** The approvals still waiting for them go back to the business owner until the business gives them to someone else. <!-- accepted call: open approvals -->
- **A staff member changes phone.** Their WhatsApp identifier changes, so their binding is suspended until they prove it again, signed in. Messages from the new identifier are not taken as theirs meanwhile. <!-- settled 2026-10-22: changed bindings -->
- **A provider retires a connection Tend uses.** A backup connection takes the work, what it cannot do is shown, and the business decides whether to move to a new system. Open situations move over only on purpose. <!-- Section 6 additions: a retired connection -->

## Open questions, and what is set later

Nothing in this kind is open.
