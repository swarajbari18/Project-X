# The communication layer

This file is for whoever builds the communication layer. It can be built from this file alone. It says what the part must do, not what technology builds it.

**Statuses.** A rule is **Decided** unless one of these words sits beside it: **Provisional** (a working choice with a condition for reopening it), or **deferred to configuration**, **deferred to Level 3**, or **deferred to implementation** (a value or a detail left, on purpose, to each business or market, to the stage that chooses the technology, or to whoever builds it; the rule around it is Decided). The project owner is the person designing Tend. On 2026-10-22 the project owner accepted every recommendation this design had made, and asked for the smaller questions inside them to be settled in the way that best fits; those points are Decided. A rule marked as "the design's reading" was worked out from its sources rather than found written down; it is Decided too. The earlier words **To confirm** and **Open** are no longer used. "The business owner" means the person who runs the business Tend serves. <!-- decided by the owner, 2026-10-22 -->

**Words used here.** A **channel** is one way of reaching a person: WhatsApp, email, Telegram, or the website chat. A **template** is a message WhatsApp has approved in advance; **opt-in** means the person agreed in advance to receive such messages. The **permission check** answers Allow, Deny, or "a person must approve first". The **update decision** is the conversation manager's choice: is this change worth telling this person now? The **tool layer** is the only way Tend calls an outside system. A channel's **window** is the time after a person's last message when a business may reply freely; on WhatsApp it is 24 hours. **Consent** is a person's recorded agreement to receive messages. A **delivery receipt** is a channel's report that a message arrived. A **first-contact rule** is a channel's rule for the first message to a person. The **send check** is the four tests in question 6 that every message passes before it goes out. <!-- L1; T2; decided: the update decision; Section 7: tool layer; Section 7 additions: channels; Section 8: the send check -->

**More words.** An **arrival** is anything that comes in from outside — a person's message, or an outside system's answer — saved as a new version. <!-- decided 2026-10-22: the status-check answer -->

<!-- Every rule below carries its code in a hidden note. Its meaning, source, and status sit in code_index.md in this folder. -->

**Updated 2026-10-28.** Before a message is written, the communication layer waits for memory and knowledge's package: the recipient's preferences and the business's own words. <!-- N19 -->

**Updated 2026-10-29: the message loop.** The communication layer's work is the **message loop** of [Tend's product loop](../../../Level%202/the_product_loop/how_does_the_product_loop_work.md): writing (its one AI stage, after memory and knowledge's package), the send check, sending and recording (fixed code). It now also writes the conversation manager's **replies** to arrivals that ended at understanding: a greeting, a general question, a question Tend can already answer. A reply to an arrival that is not about the business says nothing about the business; the send check enforces it. <!-- PL-8; PL-9; PL-17 -->

**1. What is this part for?**

It shapes, checks, sends, and records each message to a person. <!-- Section 7: the parts table -->

It sends only after a saved decision to send:
- the situation worker has written what should be said, and the conversation manager's update decision has decided to tell; or
- the conversation manager's reply decision, saved with an arrival, has decided to reply.

<!-- IB-5; PL-8 -->

**2. Why is it a separate part?**

The part that decides the next step never sends. A message goes out only with a saved decision to send, an Allow from the permission check, and the channel's rules met. The boundary decision is in [the parts file](../boundary_view/the_parts.md). <!-- method: decide and send are separate; IB-5 -->

**3. What does it do?**
- Chooses the channel for a reply: the channel the person used, while that channel's window is open. <!-- L3 -->
- Chooses the channel for a new message: the first channel that is both available and allowed. <!-- L3 -->
- Runs the send check before every message. <!-- Section 8: the send check -->
- Sends through the tool layer, which makes every outside call and retries a failed send. <!-- M4 -->
- Records what was sent, and any delivery receipt. <!-- Section 7 writer table: who writes what -->
- Holds each channel's rule record, which the product team updates when a platform changes its rules; the update announces itself. <!-- L1; decided 2026-10-22: platform rule wake -->
- Keeps each business's **consent records**, through its fixed consent code, and reads them at every send. <!-- decided 2026-10-22: consent records -->

**4. What does it never do?**
- It never decides what Tend tells a person about the business; the situation worker writes that, or the conversation manager's answer from what Tend holds names the items. For a reply to an arrival that is not about the business, it writes the reply itself, and says nothing about the business. <!-- Section 11 §5: the parts table; PL-9 -->
- It never decides whether to tell; the conversation manager does. <!-- decided: the update decision -->
- It never sends a draft, or the AI's raw words; only a saved decision to send. <!-- Section 8 anti-patterns -->
- It never sends a "we received your message" reply by default. <!-- Section 8: what a message looks like -->
- It never retries a send itself; the tool layer does. <!-- M4 -->
- It never lets the AI write a consent record. <!-- decided 2026-10-22: consent records -->
- It never wakes situations after a platform rule change; the conversation manager does, reading the book of waits. <!-- decided 2026-10-22: platform rule wake -->

**5. What does it own and write?**
- Its own sent record: each message, the reason, the evidence used, the next responsibility, the wait, and the result. <!-- Section 7 writer table: who writes what -->
- Delivery receipts, added to that record.
- The **consent records**, written only by its fixed consent code: one list per business; each entry tied to one contact point — a WhatsApp identifier, an email address, a Telegram user — and one kind of message; each saying given, withdrawn, expired, or refreshed, with its evidence: what the person did, what they were shown and its version, when, and through which channel. Only added to. <!-- decided 2026-10-22: consent records; settled 2026-10-22: consent fields -->

It holds each channel's rule record, but does not write it; the product team does. <!-- L1 -->

The sent record is not a version of the situation. Its save is announced like any other, naming the situation, so the situation's history can be read with it, and the conversation manager knows when the last message has gone out. <!-- Section 7: the sent record, two readings -->

**6. What does it decide, and what may it not decide?**

It decides which channel to use, by the channel's rules, and whether a message passes the send check: <!-- L3; Section 8: the send check; Level 2 prompt constitution: language check -->
1. the decision to send is saved;
2. the permission check says Allow for this channel, this person, and this kind of message;
3. the channel's rules are met, read fresh, with the consent records;
4. only the details the person may see stay in the message, in the business's language.

If no channel is allowed, the person the business names for this decides how to reach the customer, or Tend waits for the customer to write. <!-- Level 2 channels: a routing outcome -->

| Decision | Who decides | Who acts | Who approves |
|---|---|---|---|
| Which channel to use | The communication layer, by the channel's rules | The communication layer | — |
| Whether a message passes the send check | Fixed code in the communication layer | The communication layer; the tool layer sends | A named person, where the permission check asks for one |
| What to say, and whether to tell | Not this part: the worker, then the conversation manager | — | — |
| What a withdrawal stops | The consent code, from the words used: "STOP" on WhatsApp stops what the business starts on WhatsApp; "stop contacting me" stops what it starts on every channel; an unclear sentence counts as a withdrawal until the person says otherwise | The consent code adds the entry | — |

**7. What makes it change, and what makes it grow?**

It changes when a new channel appears, when a platform changes its rules, or when the law on consent to messages changes. This is the design's reading. <!-- change drivers: communication layer -->

It grows with the number of messages and channels. This is the design's reading. <!-- Level 1: more situations -->

**8. What starts it, what does it read, and what does it hand on?**
- **Starts it:** a "worth telling" or a reply decision from the conversation manager; a delivery receipt from a channel; the notice of an arrival that is an opt-in or an opt-out, which wakes the consent code. <!-- Section 8: which change starts which part; Section 8: delivery acknowledgement; decided 2026-10-22: consent records -->
- **Reads:** memory and knowledge's package before writing; the version with what should be said; the channel's rule record; consent records; the trusted permission store, through the permission check. <!-- IB-5; L2 -->
- **Hands on:** the send, to the tool layer; the sent record, whose save is announced; consent entries; a receipt saved in the sent record, whose announced save wakes the worker only when a send is pending. <!-- M4; Section 8: delivery acknowledgement; decided 2026-10-22: consent records -->

**9. How does it work inside?**
1. Receive the "worth telling" and the version, or the reply decision and its arrival.
2. Memory and knowledge's package arrives: the recipient's preferences; the business's listed words; the channel's conventions; and lessons filed for communication with this kind of recipient (updated 2026-10-29, from Level 2's context assembly: "business terminology, channel conventions and communication corrections relevant to the current audience"). The message is written only from the claims the decision lists. A reply to an arrival that is not about the business is written from the arrival's understanding artifact, answers what was asked, and carries no claim about the business. Writing is one structured answer: the message, each business claim pointing to its source. <!-- N19; N14; PL-9; PL-18 -->
3. Choose the channel by the rules.
4. Run the send check. Besides its four checks, a reply to an arrival that is not about the business is stopped if it carries any claim about the business. A refused message goes back to writing once, with the reasons, then to the worker or a person. <!-- PL-9 -->
5. Pass the send to the tool layer.
6. Record what was sent, and later any receipt.

The consent code runs on its own trigger: <!-- decided 2026-10-22: consent records -->
1. The notice of an arrival wakes it: "STOP", an unsubscribe click, "please stop", a platform's own signal such as a block, or an opt-in the business collected, which arrives through a tool with its evidence.
2. A fixed keyword is read by fixed code. An unclear sentence counts as a withdrawal until the person says otherwise; the AI may notice it, and the consent code adds the entry.
3. It adds one entry to the business's consent list, with its evidence.
4. The next send check reads it.

```text
worth telling + version, or a reply decision ─▶ [package] writing ─▶ choose channel ─▶ send check: decision saved? Allow? channel rules met? only allowed details? no business claim in a reply to a message not about the business?
                                                   │ any "no" ─▶ stopped, with its reason
                                                   ▼ all "yes"
                                           tool layer sends ─▶ sent record ─▶ (later) delivery receipt

opt-in or opt-out arrives (saved by the intake step) ─▶ notice ─▶ consent code ─▶ one consent entry, with evidence ─▶ read at the next send check
```

**10. How does it behave in each kind of situation?**

| Kind of situation | What the communication layer does |
|---|---|
| [1. An irreversible action's outcome stays unknown](../behaviour_view/kind_01_unknown_result.md) | Sends the honest "we are waiting" update |
| [2. An outside system is down, slow, or too stale](../behaviour_view/kind_02_outside_system_down.md) | Sends the interim update before the promised time |
| [3. A partial answer arrives](../behaviour_view/kind_03_partial_answer.md) | Sends the known part, said plainly as partial |
| [4. One instruction fans out to many people](../behaviour_view/kind_04_one_to_many.md) | Sends each first message under the channel's first-contact rules, with consent checked for each person |
| [5. No source and no person can answer](../behaviour_view/kind_05_no_source.md) | Sends the honest answer |
| [6. A timer and a reply race](../behaviour_view/kind_06_timer_and_reply.md) | Sends the answer; never a follow-up for a cancelled wait |
| [7. An unrequested document or unknown event arrives](../behaviour_view/kind_07_unrequested_arrival.md) | Sends nothing for the document |
| [8. A message cannot be pinned to one situation](../behaviour_view/kind_08_unclear_message.md) | Sends the question to the sender |
| [9. Two sources disagree](../behaviour_view/kind_09_sources_disagree.md) | Sends an honest interim message that never blames the customer <!-- Section 8 additions: no blame, no promise --> |
| [10. A person does not act, or is unavailable](../behaviour_view/kind_10_person_silent.md) | Sends reminders and escalations |
| [11. An action needs approval, or must be refused](../behaviour_view/kind_11_approval_or_refusal.md) | Sends the request to the approver; sends the honest refusal |
| [12. The world changes while work is open](../behaviour_view/kind_12_world_changes.md) | Holds the updated rule record, whose update announces itself; applies the new rule at the send; a message no longer allowed is stopped |
| [13. Who is speaking is unknown or unverified](../behaviour_view/kind_13_unknown_speaker.md) | Sends a reply that reveals nothing |
| [14. Work is blocked, interrupted, or wrongly closed](../behaviour_view/kind_14_blocked_or_reopened.md) | Not involved beyond the common path |
| [15. A human commitment changes shape](../behaviour_view/kind_15_human_commitment.md) | Sends the new meeting time, and handoffs |

The walks are in [how a situation moves](../behaviour_view/how_a_situation_moves.md). <!-- decided: the fifteen kinds -->

**11. What are its key moments?**
- Meera's reply on WhatsApp after the carrier answers (the common case).
- For example, WhatsApp shortens its reply window while Meera's situation is open (kind 12).
- Kavya replies "STOP" to an update on WhatsApp. The consent code adds a withdrawal for WhatsApp messages the business starts; the next update to her is refused at the send check.

**12. What happens when things go wrong?**
- A send that is refused returns its reason; the worker suggests again or escalates. <!-- AC-2 -->
- A message that cannot be delivered is recorded as evidence, and the worker wakes and decides. <!-- IA-10 -->
- A receipt that never comes leaves the delivery unknown; Tend checks before any resend, and never resends just to be sure. <!-- Section 8: resend or new start -->
- If no channel is allowed, the business's named contact decides, or Tend waits. <!-- Level 2 channels: a routing outcome -->
- While this part is down, nothing is sent; what should be said, and each decision to tell, stay saved. When it is back, each waiting message passes the send check again, against the newest version, rules, and consent; a message its situation has moved past is not sent, and the update decision is made again. The consent code adds any entries from opt-ins and opt-outs saved meanwhile. <!-- closed item: part outage not written; settled 2026-10-22: part outages -->

**13. Which rules must always hold here?**

| Rule | How a break would show |
|---|---|
| A message goes out only with a saved decision to send, an Allow, and the channel's rules met | A message with no decision behind it |
| A message the business starts follows the channel's rules: on WhatsApp, outside 24 hours, an approved template to a person who opted in | A message 30 hours after Meera's last reply, with no template |
| Email needs consent and an unsubscribe link. Any other lawful ground for email is written down for each market when Tend enters it | An email with no unsubscribe link |
| Withdrawing consent stops what the person withdrew, from the very next send | A message to Priya after she asked Tend to stop; an update on WhatsApp to Kavya after her "STOP" |
| Only the communication layer's consent code writes consent records, each with its evidence | A consent entry with no evidence, or one written by the AI |
| Only the fields the person may see stay in the message | A partner sees more than the fields on its list |

<!-- IB-5; Section 7 additions: channels; Section 7 additions: email lawful bases; consent withdrawal; decided 2026-10-22: consent records; T11 -->

**14. What must be visible afterwards?**

Each message sent, its reason, its evidence, its channel, and its delivery state. Each consent entry, with what the person did, what they were shown, when, and through which channel. <!-- Section 7 writer table: who writes what; settled 2026-10-22: consent fields -->

**15. How do we know it is built correctly?**
- A version with no "worth telling" produces no message. A failure looks like: a message with no update decision behind it.
- A message outside a channel's window, with no template or no opt-in, is stopped at the send check. A failure looks like: a free-text WhatsApp message to Meera 30 hours after her last reply.
- After a person withdraws consent, nothing they withdrew reaches them, from the very next send. A failure looks like: Priya receives a message after asking Tend to stop.
- "STOP" on WhatsApp stops only what the business starts on WhatsApp; "stop contacting me" stops what it starts on every channel. A failure looks like: a WhatsApp "STOP" blocking a reply the person later asks for by email, or "stop contacting me" still letting an email through.
- Every template sent has a matching opt-in, with its evidence. A failure looks like: a template to a person with no opt-in entry.
- A failed send is retried only by the tool layer; this part never repeats it. A failure looks like: the same message sent twice by this part.

<!-- IB-5; Section 7 additions: channels; consent withdrawal; decided 2026-10-22: consent records; M4 -->

**16. What is still open?**

Nothing in this part is open. Two details are left to whoever builds them (deferred to implementation): the form of each reader's field list, and what a delivery receipt means on each channel, written in its rule record. On no channel does a receipt mean the person read or understood the message; where a channel reports reading, that is recorded as its own state, and a receipt that never comes leaves the delivery unknown. Each market's consent rules are written down when Tend enters it (deferred to configuration). <!-- T11; Level 2 communication: still to research; Level 2 channels: consent law -->

**17. Where did this come from?**

[The parts file](../boundary_view/the_parts.md) (the boundary decision), [the interactions file](../interaction_view/the_interactions.md) (interactions 8, telling a person; 9, a delivery receipt; 18, consent withdrawn), [the rules that always hold](../constraint_view/the_rules_that_always_hold.md), [the decisions file](../decision_view/the_decisions.md) (decisions 3, the worker never sends; 4, deciding whether to tell; 14, channels and consent; 23, consent records), and [the communicating file](../responsibility_view/communicating.md).
