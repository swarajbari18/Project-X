# How Tend finds the right situation

**Note added 2026-10-29.** Since 29 October the conversation manager understands each message first: before it chooses, it writes a reading of what the message asks and refers to, with the business's meanings of its words (a sale's dates, a word's meaning) in front of it, and the situations that could match are found from that reading. The short situations below still go in front of it; they now serve its reading too. See the Level 2 page "how memory and knowledge works with the loops", corrected that day.

**Note added 2026-10-28.** This page is the agreed picture of 3 October. Since 28 October, memory and knowledge places the short situations before routing reasons, and checks again before routing's choice is checked; it creates the links between situations; and the note that a step is told "a foreign reference was seen and not opened" is removed. See the Level 2 page "how memory and knowledge works with the loops".

A message comes in. A proved binding of the phone, mailbox, or login says which channel this is. A human is verified by an identity provider before Tend treats them as that person. The words in the message do not rename them. It shows that person a few short summaries. It chooses one situation, or asks, or waits. It opens that one situation. It does the work. Someone hears something only if the situation is written that way.

This file is that picture. Sitting one is the picture, then how the parts work together, then what we decided. Sitting two is the nine situations, which keep every path that was tried.

A few words, once:

- A **short situation** is a small description of one open problem. Enough to choose. Not the whole history.
- The **chooser** is the part that, looking only at those situations, attaches the message, asks, starts a new problem, or waits.
- A **full situation record** is the situation itself, opened only after that choice.
- A **later message** starts the lookup again. It does not keep the previous pile of situations.

---

## Where this came from

Earlier pictures of memory were too small. They talked about lessons and preferences, and left out the real problem: millions of situations, and a need to hand over a few of them before anyone interprets the message.

You asked for that picture before the later work on time, failure, and nobody answering. The practice situations were the test. This file keeps their results in ordinary language.

These corrections from the conversation stay in force.

- Nothing goes out because an AI feels ready. A person hears something when the situation itself has changed in a way they should hear.
- There is no default “we received your message.”
- If the investor’s deck is cleared while the revenue number is still being gathered, the investor can receive the deck. The revenue part stays unfinished.
- When Tend fetches a file or moves money, the permission check lives inside that action. It is not a separate chat where the AI approves itself.
- A sentence in a chat is not a business rule. A rule is saved in settings, by someone allowed to save it.
- Loading the wrong person’s situations, and calling the permission check “later,” is already the mistake.

Where a practice situation left two paths open, this file says so, then says which path was taken. Swaraj agreed with those choices on 3 October 2026. Where a sentence here is narrower than Level 2, Level 2 is the source of truth. The corrections below are that pass.

## Agreed on 3 October 2026

Swaraj agreed with the choices in this file, including the recommendations that had been written as the safer reading. Those are rules now.

- When Meera is attached to one open problem, only that full situation record opens. The other open problems were already shown as short summaries. They are not opened in full on that start just so they can be compared.
- If she types "this is Priya" on her own phone, she stays Meera. The claimed name is noted beside the message. It is not a situation, and it is not a second person.
- Her three open situations are the set before the choice. A link to another problem is followed after one problem is chosen, inside that full situation record. It is not used to add situations beforehand. Finished problems linked to the order stay out unless she is pointing at a finished case.
- A new number may start one situation, or hold and ask who the person is. Both are allowed. Which one happens depends on whether Tend can already act on the ask.
- Vikram's past is a small set of his own finished situations that could be that purchase. There is no fixed count in this rule. A later implementation chooses how many, and it must stay a small set of his situations, not all of them and not anyone else's.
- Lara's sentence does not load Meera's refund. If she is already the employee on that problem, the fetch can show her the refund on the employee channel. If she is not, Tend asks for the order number. She does not message Meera because she asked.
- The refund threshold is not one of the situations. It is read and written by the settings action.

---

## The picture, before any situation

Think of one business.

It knows on the order of fifty thousand people. It holds on the order of two million situations. Most of those situations are finished. A person who buys often might have three problems still open and dozens already closed. A person who only said hello once might have nothing open and a long closed past. A brand-new number has nothing.

Five kinds of record stay separate. Mixing them is how the bad paths in the practice situations went wrong.

**The person.** A channel binding ties a WhatsApp number, an email address, or a login to a record. The words inside a message do not rename that binding. A human who acts as the owner, or as an employee, is verified by an identity provider. The binding alone does not make the speaker the owner.

**The situation.** One operational problem. An order. A delivery on that order. A refund on a different order. An investor asking for a deck. One person on an owner's contact list. These are not one blob called “Meera” or “the business.”

**The link.** A thin connection when two situations are actually about the same order, or one problem led to the next. Not “everything this person ever did.”

**The short situation.** A small description of an open situation: what kind of problem it is, the last movement, any order or tracking number already on it. Enough to choose. Not the full situation record.

**The business settings.** Who may do what. The refund amount that needs a person. The list of things the owner can configure. These are not situations, and they are not things Tend “learns” from a chat.

When a message arrives, Tend does the following, in this order, and does not skip.

1. A proved channel binding says which phone, mailbox, or login this is. The text does not rename that channel. Treating the speaker as a particular human, including the owner, goes through an identity provider. The exact join between that verified person and what they may do is still open in Level 2.
2. It looks up a small set of short summaries for that speaker, plus a lookup by a real reference number if the message actually contains one.
3. It puts only those situations in front of the part that chooses: attach this message to one of them, ask which one, start a new situation, or hold.
4. Only after that choice does it open the full situation record, and only for the situation that was chosen.
5. The situation worker then gathers, checks the settings, and writes the situation.
6. A person outside hears something only if that write says they should.
7. A later message starts again at step 1. It does not keep yesterday’s pile of situations.
8. In the background, Tend may keep notes that help the next time. A note must not change a business rule, a formal policy, a legal or compliance constraint, who may act, a permission, who owns a fact, a required approval, who is answerable, or the line around an irreversible action. The situations later in this file are examples of that ban. They are not the whole ban.

The AI never searches the two million situations to decide where a message goes. If the small set is empty or unclear, Tend asks or holds. It does not “search harder.”

---

## How the parts work together

One message comes in. These eight steps run in this order. They do not skip.

The part that writes the situation does not see the two million situations. The part that sends a message does not invent one while the situation is still being worked.

### 1. The message arrives

A WhatsApp message, an email, an employee chat, or a partner email hits the business. Tend does not answer yet. It does not search yet. It records that something arrived, on which channel, with which text.

Meera’s “Any update on my delivery?” is only a message at this moment. It is not yet attached to her delivery.

### 2. Who is speaking, and which business

Her phone is already bound to her, so the channel is Meera's. The words “this is Priya” do not change that. A phone Tend has never seen is not yet a known person. An investor email and a shop WhatsApp with the same first name are two channels. An employee login is the employee only after an identity provider verifies that human. The owner's channel is not, by itself, proof that the speaker is the owner. A customer phone that says “set the refund rule” is still the customer.

The business is already fixed by the channel. Text cannot move the message into another business.

### 3. The short summaries are gathered

Only now does Tend look anything up. It looks up this speaker’s open problems, as short summaries. If the message contains a real order number, tracking number, or invoice number, it also looks up the situations that carry that number. It does not look up the person’s whole life. It does not look up another person’s open problems because their name appeared.

What comes back is the only set the next step may choose from.

The first two lines are the normal customer case. The rest are the other people this file already walked. Skip them until you need that person.

- Meera, no order number: her three open situations. The word “delivery” may mark one as likely. It may not remove the others.
- Meera, and she typed 8821: the open problems on that order. The refund on the other order stays out.
- Vikram says “Hi”: no situations from his past.
- Vikram says the jacket from last time has a hole: a small set of his own finished situations that could be that purchase. Not all hundred and twenty. Not anyone else’s.
- A stranger types 8821: the number is noticed and held back. Meera’s situations are not shown.
- Lara types “Meera’s refund”: Lara’s own work, plus the name. None of Meera’s situations.
- The owner names ten people: during lookup, the names are words. They are not ten existing situations. If the request is unclear, Tend asks or holds. Once the instruction is understood, Tend creates one situation per person, and an aggregate the owner can open. Those rows are not created inside the situation lookup, before the instruction is understood.
- The owner asks what they can configure: the list of settings. Not the situations.
- Neha names Meera and an invoice: Neha’s situations, plus that invoice if it is in her business. Not Meera’s orders.
- The investor’s own open work may include a short situation for a situation already linked to his work. It may not include Meera’s.

### 4. The choice, from those situations only

The chooser may attach the message to one situation, ask which situation, start a new situation, or hold. It cannot attach to a situation that was not in the set.

If Meera’s three situations could all fit “any update,” Tend asks which one. It does not silently pick the delivery. If none of the three is what she is asking, it may start a fourth. If it attaches to one, only that one continues.

If the set is empty, as with a new number or a bare hello, Tend starts a situation or holds and asks. It does not search harder.

### 5. The full situation record opens

Only the chosen situation is opened in full. The other short summaries stay short. They are not opened so they can be compared. A link to another problem is followed inside this full situation record, after the choice. It is not a reason to have added situations in step 3.

If the choice was ask or hold, and nothing has been attached, no full situation record has to open yet.

### 6. The situation is worked

The worker receives that one full situation record, the message, and who is speaking.

It gathers what it needs from the business’s systems. A file fetch carries its own permission check. A refund carries its own permission check. The worker does not approve itself in a side conversation.

The refund threshold is a setting. It is read when a refund is attempted. It is not one of the short summaries. It is not remembered from an old chat. It is written through the settings action by the owner who set the business up, or by a person that owner assigns to configure the business. An employee who says the owner agreed cannot write it. The owner is told the rule is saved only after that write succeeds.

If a carrier the business uses is stale or down, Tend does not invent a location. Inside the time the business configured, the situation waits. Past that time, the situation records a failure. The length is configuration. If no system and no person can answer where the package is, that is a missing capability, and the customer is told honestly. If a person can answer, a person is brought in with the order details. A missing tool in the registry is not, by itself, “this business cannot ship.”

### 7. The situation is written, and only then might someone hear

The worker writes the situation when there is something true to record. A person outside hears that change, not a log of what was looked up.

If nothing was written that should be sent, nothing is sent. There is no “we received your message.”

If the investor’s deck is cleared while the revenue figure is still being gathered, the investor can receive the deck. The revenue part stays unfinished until a later start writes it.

Meera hears about her delivery when her delivery situation changes. She does not hear that Lara asked. The partner hears the scoped shipment, not her other orders. An employee who is working her problem hears on the employee channel. That start does not text her unless her own situation was written in a way that says she should hear it.

If Priya still has an open outreach, her “stop” attaches to that open situation. If the old outreach is already finished, Tend starts a new stop linked to it. She does not get a receipt.

### 8. A later message, and what may be remembered

The next message starts again at step 2. Yesterday’s pile of situations is not kept.

After the write, Tend may keep a note that helps next time. The ban is the Level 2 list: a note must not change a business rule, a formal policy, a legal or compliance constraint, who may act, a permission, who owns a fact, a required approval, source-of-truth responsibility, who is answerable, or an irreversible-action boundary. Decision 10 is examples of that ban. It is not a shorter ban.

---

## What we decided, and the product line each decision stands on

These are decisions, not leftover guesses. Each one names the practice situation that forced it and the product line that closed it.

### 1. Open problems stay visible. A word in the message may point, but it may not hide.

**Situation.** Meera’s phone is already hers. She has three open problems: the order, the delivery of that order, and a refund on a different order. She writes, “Any update on my delivery?” She does not type an order number.

**What died.** Putting all forty of her closed situations in front of the chooser. Treating the message as Meera-the-person rather than three problems. Switching her to a different customer because the text says “this is Priya.” Dropping the order situation and the refund situation just because the word “delivery” appeared, so the chooser never sees them.

**What lives.** All three open situations are in front of the chooser. The word “delivery” may mark the delivery situation as the likely one. It may not remove the other two. If more than one open problem could be what she means, Tend asks which one. It does not silently attach.

**Why.** The product vision says the situation is one situation history, not one chat, and that a delivery problem and a “they say it arrived, I never got it” problem are different situations. It also says Tend should not invent the relationship, and should ask when the distinction changes what it may do. Hiding the refund would make Tend invent that she only meant the delivery.

**What the practice still had open, and what this file chooses.** The practice kept more than one lawful way to build her situations. This file chooses: her open situations stay, the word may point, and it may not hide. Those open situations are the set before the choice. A link is followed after one problem is chosen, inside that full situation record. It does not add situations beforehand. Finished problems linked to that order stay out unless she is pointing at a finished case. After she is attached to one problem, only that full situation record opens. The other open problems were already short summaries. They are not all opened in full on that start.

### 2. A returning customer is not sent back to zero, but their whole life is not loaded either.

**Situation.** Vikram’s phone is his. He has nothing open and about one hundred and twenty finished situations. He writes “Hi.” Later he writes that the jacket from last time has a hole. There is no order number.

**What died.** Loading all one hundred and twenty full situations because he has history. Searching every jacket in the business. Treating “Hi” as a reason to open his past. Pretending “jacket” or “last time” is an order number. An employee asking “show Vikram’s journey” and Tend texting Vikram because of that ask. Background learning reopening the jacket by itself.

**What lives.** “Hi” sees no open situations and does not pull the past. Tend may create a light situation, ask what he needs, or hold. If nothing is written that should be sent, nothing is sent.

The jacket line is different. It points at something he already bought. Before the AI interprets it, Tend may place a small handful of his own recent finished situations in front of the chooser, as short summaries, not as full situations. The rest of his hundred and twenty stay out. Other people’s jackets stay out. From those few situations the chooser may reopen one, start a new problem linked to the old purchase, or ask which past order he means. It may not reach into the situations that were left out and reopen one it was not shown.

**Why.** The product vision says a returning customer should not have to repeat their situation from the beginning. It also says the goal of learning is not simply to remember conversations, and that Tend starts from the situation, not from a chat box that treats every message as new. Loading nothing closed would make him repeat the purchase. Loading everything would turn memory into a dump.

**What the practice still had open, and what this file chooses.** The practice carried four policies all the way through, on purpose. Load nothing finished. Load a few of his newest finished situations. Search for similar situations only inside his own finished situations. Or combine the newest few with that private search. This file rejects “load nothing,” because a returning customer would have to start from zero. It does not pretend the practice had already picked a winner. It chooses this: a small set of his own finished situations that could actually be the past purchase, not a hello, not other people’s jackets, not all one hundred and twenty. “Newest few” alone can miss the jacket if his latest purchases were something else. A search inside only his finished situations may be how the few are chosen. That search is not a search of the business, and it does not open full situations before the choice. There is no fixed count. A later implementation chooses how many of his own situations to show. It must stay a small set. The practice used small stand-in counts only so the paths could be walked. Those counts are not the rule.

### 3. A number in the message is a lookup. A name is not.

**Situations.** An unknown WhatsApp later mentions order 8821. An investor’s email mentions Meera’s order number. Lara, an employee on the internal chat, says “Meera’s refund” and does not give an order number. Neha asks about an invoice in her own business and also about Meera’s orders.

**What died.** Treating the order number as proof that the unknown sender is Meera. Loading all of Meera’s open problems because her order number appeared in someone else’s email. Loading Meera’s refund because Lara typed her name. Letting Neha’s text switch the business, or answer with another customer’s orders. Letting a made-up customer id from another business pull that other business’s rows.

**What lives.**

If the message contains a real order number, tracking number, or invoice number, Tend looks up the situations that carry that number. It does not also open every other problem that person has.

Whether those looked-up situations may be shown depends on who is speaking.

- The customer on their own known phone may see their own open problems, and the number narrows which of those it is.
- An investor, a stranger, or a partner does not receive the customer’s private situation just because the number was in their message. Tend notices the number and holds it back. Their own work situations are what they see. Tend does not attach their message to the customer’s delivery and does not tell them the customer’s status.
- An employee who types a customer’s name, without an order number and without already being on that problem, sees their own work plus the name as a name. Zero of the customer’s situations come with the name. Tend asks for the order number or waits until the employee is actually on that problem.
- Once an employee is the person working that problem, the product rule is that they see the whole picture of that problem. The partner outside does not. That permission is checked when the information is fetched. It is not created by the sentence “Meera’s refund.”

**Why.** The product vision says the employee who is working the problem sees the whole picture, the delivery partner sees only what they need, such as the tracking number, and how much each person receives is a rule the business controls. It also says Tend should not invent who someone is. A number identifies a situation. It does not identify the speaker. A name identifies a person to ask about. It does not open their file.

**What the practice still had open, and what this file chooses.** For the investor and for the stranger, the practice kept two readings side by side and refused to merge them. One reading put the bare situation ids for that order number in front of the chooser and then forbade sending the customer’s status unless a real permission existed. The other reading withheld the ids so attaching was impossible. This file chooses the second reading as the product behaviour. It does not claim the practice had already closed it. The first reading was followed far enough to see the damage, and the send dies. For Lara, the name loads nothing. If she is already the employee on that refund, a later fetch can show it to her on the employee channel. If she is not, Tend asks for the order number. The sentence does not create the permission. An outsider does not get the private situation by mentioning the number.

### 4. Settings are settings. Old situations are not the rule book.

**Situation.** The owner, on the owner’s own channel, says refunds over two thousand need a person’s approval. An employee says the owner agreed in the corridor and Tend should set it. The owner also asks what they can configure.

**What died.** Searching past refund situations to discover the rule. Saving the rule as a memory of the chat. Letting the employee’s channel write the setting. Treating “what can I configure?” as a search across two million situations.

**What lives.** The routing summaries on the owner’s message are the owner’s own open work, if any. The refund rule is read and written in the business settings, through a settings action, by the owner who set the business up, or by a person that owner assigns to configure the business, and only after that write succeeds does Tend tell that person it is saved. Refunds already in flight do not all reopen. The next refund over two thousand hits the setting at the moment Tend tries to refund, inside that action, not because someone retrieved the old chat.

“What can I configure?” reads the list of settings the product actually has. That list changes when the product changes. It is not a pile of old situations.

The employee path records a request, asks the owner or the person the owner assigned to configure the business, or refuses. It sends nothing to customers. It does not write the two-thousand rule.

**Why.** The product vision says what differs between businesses is configuration, not something written into the core, and that the business still owns its policies. Some situations require approval. Tend recognises that and stops the unsafe action. A corridor sentence is not the owner.

The current threshold is not sitting in the situations. It is read by the settings action. The rule is never stored as a situation.

### 5. A list of people is not one situation, and it is not created by the router before anyone has understood the message.

**Situation.** The owner asks Tend to reach ten people. Meera pastes that same instruction into her own WhatsApp. Priya emails “stop.”

**What died.** Loading every customer in the business because the owner said “reach people.” Creating the ten situations before the message has been understood. Meera’s paste loading the owner’s settings or creating ten outreach situations on her start. Reopening Priya’s old outreach just because she wrote “stop.” Sending Priya a receipt email. Learning “Priya does not want email” as a change to who is allowed to send.

**What lives.** On the owner's channel, the lookup sees the owner's own open work. The ten names are words in the message, not ten existing situations. Once the instruction is understood, Tend creates one situation per person, and an aggregate artifact of that assignment. The aggregate does not replace the individual situations. Nothing is emailed because a name was read. A person is emailed only when that person's situation is written in a way that says send. Some of those situations may still be not started.

Meera’s paste stays on Meera’s three open problems. The pasted list is text inside her message. It does not make her the owner.

Priya’s “stop” does not reopen the old outreach by default. Her open situations may be empty. A short situation that an earlier approach was declined can be visible. If several old contacts match, Tend asks which one. Otherwise it starts a new stop situation linked to the old one. A stop is a change to her situation and to the consent record. It is not a quiet edit of the permission settings. No receipt email. Learning must not turn the stop into a send permission.

**Why.** The product vision’s own sales example says Tend creates a separate situation for each person, because each person has a different history and next step, and the owner sees an artifact of those situations rather than thirty chats. It also says Tend should not invent the relationship.

### 6. A new number is a new person until evidence says otherwise. The shop catalogue is not part of finding the situation.

**Situation.** A WhatsApp number Tend has never seen asks about offers. There is no product code. Later the same number says “I am Rahul now.”

**What died.** Searching every situation that mentions offers. Searching every person named Arjun. Dumping the product catalogue into the set of situations used to choose a situation. Treating “Rahul” as a reason to retarget the person or to search all Rahuls.

**What lives.** The set of situations is empty. Tend can start one new situation, or hold and ask who they are. It does not attach the message to a situation that is not there. The relationship stays unknown until evidence or a real answer. “Rahul” is a claim on the same number, on a later message. It does not mint a second person and does not search the business for that name.

The catalogue can be used later, inside the new situation, when Tend is actually answering what the business sells. It is a different store from the situations.

**Why.** The product vision says at first Tend may know only that a person is connected to a possible situation, and it should not invent whether they are a prospect, a customer, or a partner. It answers commercial questions from the business’s knowledge, which is not the same as searching every past situation for the word “offers.”

### 7. The same first name on two channels is two people.

**Situation.** An investor named Ankit emails from the investor address and asks for the quarterly revenue and the pitch deck. A customer named Ankit messages on WhatsApp about an order. They are not the same speaker.

**What died.** Merging them because the name matches. Letting the shop message see the investor’s situations. Searching every situation that contains the word “revenue.” Loading a finished intro call in full just because this might be a continuation. Sending “we got your email.”

**What lives.** The investor email sees only that investor’s open situations. If there are none, Tend starts a diligence situation or asks. It does not attach to a situation that is not there. The deck is fetched as a file action, and the approval check sits inside that action. If the situation is written so that the deck is cleared while revenue is still being gathered, the investor receives the deck and an honest line that revenue is still in progress. If nothing is written, nothing is sent. When the revenue later arrives, that is a later start of the same situation. Learning may remember that this diligence happened. It may not store the revenue figure as a new permission.

The shop WhatsApp sees only the customer Ankit’s situations. Never the investor’s.

**Why.** The product vision says Tend keeps pieces connected without flattening them into one conversation, and that some situations require approval. Your earlier ruling on the deck is the send rule: the unit of what an outside person hears is a change in the situation, not a log of tools.

### 8. One shipment, two speakers. A stale carrier is a wait, not a guess, and not “we have no shipping.”

**Situation.** Meera asks about her delivery on her phone. Separately, the partner’s desk emails about the tracking number on that same shipment.

**What died.** Putting the partner’s mailbox into Meera’s situations, or Meera’s other orders and her refund into the partner’s email. Inventing a tracking status when the carrier’s information is stale or the connection is down. Treating “the carrier is down” as “this business has no way to ship.” Telling the partner everything Tend knows about Meera. Overwriting the tracking truth later from a background note.

**What lives.** Meera’s message uses her open situations and can attach to the delivery situation. If the carrier data is stale or down, Tend does not fabricate a location. Inside the time the business configured, the situation waits. Past that time, the situation records a failure. She is not left in silence with no situation, and she is not spammed with internal chatter. When the situation is written with something she should hear, she hears that. The configured path runs from that recorded failure. That path might include the partner. It is not hard-coded as “always the partner first.” When the situation says the partner should be told, the partner receives a scoped note about the shipment, not Meera’s other problems.

The partner’s own email is a different start. The speaker is the partner. The lookup is the tracking number, which finds that shipment and not Meera’s other situations. The partner can be answered with the scoped shipment state. Copying her refund or her other orders into that email dies.

If no system and no person can say where the package is, Tend records that the capability is absent and tells her honestly. If a person can answer, that person is brought in with the order details. A registered carrier that is merely down is not either of those.

**Why.** The product vision says Tend answers a “where is my order?” from live delivery information, does not call a pause a delay too early, treats “they say delivered, I never got it” as its own situation, and gives the partner only what they need. When nothing happens, Tend follows the configured next step rather than forgetting the situation.

### 9. One business’s text cannot open another business.

**Situation.** Neha speaks for a supplier, on that business’s own channel. She is not Meera, and she is not switching businesses by what she types. She asks about an invoice in that business and also about Meera’s orders. Another message arrives on that business’s mailbox from someone the mailbox does not already know, and the text names a customer id that belongs to a different business. That id is not the sender.

**What died.** Switching business because the text said so. Loading Meera’s orders because Neha named her. Scanning every business for that invoice. Sending the other customer’s orders. Storing the foreign id as a link that later skips the business boundary.

**What lives.** The business is fixed before any lookup. If the invoice exists in Neha’s business, Tend can attach, ask, or start an inquiry about that invoice. The sentence about Meera does not attach to Meera and does not get answered with Meera’s orders. If the invoice is missing, that is a separate path: ask or start an inquiry. It is not merged with “we found it.”

The foreign id is quarantined. Nothing from the other business is loaded or sent. A later message from the same mailbox is judged again. Learning may note that this mailbox sometimes contains foreign ids. It may not store that id as a real customer link inside Neha’s business.

**Why.** The product vision treats each business’s rules, channels, and grants as that business’s configuration. Tend is not the owner of the business, and the business still owns its data. Another business’s customer id in the text is not evidence that the wall should move.

### 10. Background notes help the next time. They do not become permission.

Across every situation, the same limit held.

Learning may store that a kind of request happened, that an opt-out happened on that person’s situation, that a foreign id was quarantined, or that an employee who names a customer should be asked for an order number first.

The ban is Level 2. A note must not change a business rule, a formal policy, a legal or compliance constraint, who may act, a permission, who owns a fact, a required approval, source-of-truth responsibility, who is answerable, or an irreversible-action boundary.

The situations already walked are examples of that ban. They are not a shorter list. In those situations, learning must not:

- change who a channel belongs to
- let an investor or a stranger see a customer’s situation
- raise, lower, or delete the refund threshold
- turn an employee’s “the owner agreed” into that threshold
- reopen a closed jacket by itself
- turn a customer’s “stop” into a global permission to email them
- skip the wall between two businesses
- treat a customer’s name as an instruction to load their orders
- rewrite a tracking status
- decide that a carrier outage means the business has no shipping

The product vision says every interaction should help the next one start with a better understanding, and that the goal is not simply to remember conversations. It also says the business still owns its policies. A better understanding is not a change of permission.

---

## The nine situations in full

Read this sitting only if you want the record. The decisions above are the outcome. What follows is each message, including paths we walked and then refused, so those paths are not only in the practice folder.

You do not need the other situations in your head to read one of them.

### Meera — three open problems, and a name that is not a person

Meera is a returning customer. This WhatsApp number is already hers.

She has three open problems at once.

- The order itself, number 8821.
- The delivery of that same order.
- A refund on a different order, number 7701.

She also has about forty finished problems. Those are not in play yet.

**Message one.** “Any update on my delivery?” No order number.

We tried several ways of choosing what she is allowed to see before anyone interprets the sentence.

Keeping only her three open situations survives. That is the path we took.

Adding the forty finished situations dies. Finished history is not a menu of things to attach a new message to, unless the message is actually pointing at a finished case. This message is not. It is a question about something still open.

Keeping only the delivery situation, because the word “delivery” matched, was tested and rejected. It would hide the order and the refund. She said “any update,” not “ignore my refund.” The delivery situation can be marked as likely. The other two stay visible. If it is not obvious which problem she means, Tend asks.

Pulling every situation ever linked to 8821, including finished ones, just because delivery was mentioned, dies as a default. The two open problems that are actually about 8821 are already in the three situations. The finished cousins of that order wait until a message names them.

An empty set, on the theory that there is no order number so there are no candidates, dies for her. She is a known person with open problems. The open situations do not require the number to be typed again. The number is how you look up a specific reference. It is not the only way a known customer finds their open work.

If none of the three open problems is actually what she is asking, Tend may start a fourth. That is not the same as hiding two of the three and pretending only delivery exists.

We also tried refusing to treat the phone as hers whenever the text disagreed with the binding. On her own phone, that refusal dies. The disagreement is noted. It does not un-know her.

**Message two.** The same phone, but the text says “this is Priya.”

She is still the person that phone is bound to. The phone is the proof of the channel. The typed name is a claim. Tend may record that a different name was asserted. That record is not a situation and it does not create a second customer. It does not hide her three situations. The claimed name is noted beside the message. It is not placed among the situations. Tend does not treat the claim as a verified rename. An identity provider is what verifies a human before Tend treats them as the owner or as an employee. This WhatsApp binding does not do that job.

**Message three.** A phone Tend has never seen, with the same “this is Priya” text.

This is not Meera. Her three situations are not loaded. The new number gets an empty set, an unknown relationship, and a hold or a question. Attaching it to Meera’s delivery is impossible, because her situations are not there to attach to.

**After the situations are chosen.** If Tend asks which of the three she means, or holds, no full situation record has to open yet, and nothing is sent. If it attaches to one, that one full situation record opens. The worker then gathers from the business’s systems. If the carrier or the file needs a permission check, the check is inside that action. A reply goes out only if the situation is written with something she should hear. A second “any update?” later rebuilds the situations from scratch. It does not reuse a pile that included the forty finished situations.

An employee asking about Meera on an employee channel is not this WhatsApp message. They do not become Meera. If a real assignment already says this employee is acting for her, her three open situations can be in front of them, and the answer still follows the employee rules, not a customer chat that pretends to be her. If they only typed her name and are not on the work, they do not receive her three situations. That case is Lara’s situation, below.

### The owner, Meera’s paste, and Priya’s stop

Three different speakers. They stayed separate the whole way. Merging them was the failure mode.

**The owner, on the owner’s channel,** names about ten people and wants them contacted. Most of those names may not even be people Tend already knows. A name in the list is not a speaker and not a lookup key.

We do not load every customer situation in the business. We do not create the ten situations inside the lookup, before the message has been understood. Creation is not a lookup. The names are text. The owner's own open work may be there as situations. A short marker that one of these people previously declined can be there, as a marker, not as that person's full situation record. Reopening an old outreach just because that person's name is on a new list dies.

Once the instruction is understood, Tend creates one situation per person. The owner can also open an aggregate of that assignment. The aggregate is not a substitute for the ten situations, and it is not one blob of ten people. Nobody is emailed because their name was read. They are emailed only if their own situation is written in a way that says send. A situation may exist before the first email, in a not-started state.

**Meera pastes the same instruction** into her WhatsApp.

The speaker is still Meera. Her three open situations may be there. The owner’s settings are not. Ten new outreach situations are not created on her message. The paste can be held as someone else’s instruction that arrived on the wrong channel. Or, if she is actually asking about one of her own open problems, it can attach to that problem. It cannot make her the owner.

**Priya emails “stop.”**

Priya is the speaker, on her own email. Her open situations might be empty. A short pointer to the old outreach can exist so Tend knows there was a previous approach. The full old situation is not dumped in as the thing to attach to by default, and the old outreach is not reopened just because she said stop.

Tend can ask which contact she means if several old ones exist. Or it can start a new situation whose point is the stop, linked to the old one. That write is the stop. She does not get an email that only says “we received your stop.” Learning can record that this stop happened on her situation. It cannot rewrite the business’s send permissions.

### Arjun — a number nobody has seen

The first message is from a number Tend has never seen. The text says he is Arjun, and asks what the business offers. There is no product code. No history.

Searching every person named Arjun dies. Searching every situation that mentions offers dies. Putting the product catalogue into the choosing step dies. A little of the business’s ordinary vocabulary may sit with the message so Tend can read the words. The catalogue is how Tend answers a commercial question later. It is not how Tend finds which situation the message belongs to. On the first message there is no situation yet.

The situation set is empty. Tend may start one new situation for this unknown person and this commercial ask. Or it may hold and ask who they are, and attach to nothing. Both are allowed. The second message then sees either that one new open situation, or still none, depending on which path the first message took.

A discount invented from “memory” dies. A price or an offer comes from the business’s actual commercial knowledge, inside the situation, under the rules the business set.

Later the same number says he is Rahul now. Same person, same channel, extra claim. Tend does not search every Rahul. It does not silently retarget the number onto a different customer record. If one open situation already exists from the first message, Tend does not have to attach the rename onto it blindly. The name claim can make Tend ask before it treats the rename as nothing. If the business has a real correction path for a wrong binding, that path is a verified change, not a sentence on the second message.

If a business system already knows this phone, that can be a hint while gathering: this might already be a customer. The hint does not fill the first message’s empty situation set with old closed situations, and it does not skip the question of who is speaking.

### Ankit — investor in the morning, customer on WhatsApp

Same hour, two channels, same first name. Two speakers. Two separate lookups. No shared pile.

**The investor email** asks for the quarter’s revenue and the pitch deck. No order number.

His open situations only. If he has none, the set is empty plus the fact that this email is his and the text is a diligence ask. Tend does not invent a fake situation. It can start a diligence situation, ask, or attach only if he already has an open diligence situation that matches. Searching the business for the word “revenue” dies. Pulling every investor’s open work dies. Opening a finished intro call in full, before any choice, dies.

The deck is a file the business holds. Fetching it runs the approval check inside the fetch. There is no separate moment where the AI grants itself permission and then fetches. While the revenue is still being gathered, the situation can still be written so the deck is cleared. Then the investor receives the deck, and the revenue stays visibly unfinished. While nothing has been written, he receives nothing. He does not receive “we got your email” as a substitute for content.

When the revenue arrives later, that is the same situation starting again. Learning can keep the episode. It cannot turn the revenue number into a new right to see things.

**The shop WhatsApp** is the other Ankit. His situations only. The investor’s situations are not in his world. If he has two open orders, Tend asks which one. It does not guess.

**The investor email that also contains Meera’s order number** is the sharp case.

Looking up “every open problem Meera has” dies. That was the leak.

The lookup may find the situation ids that carry that exact order number, and only those. Her refund on a different order stays out. The practice kept two readings here and did not merge them. One put those bare ids in his set and then killed any send of her status. This file chooses the other reading: those ids do not become situations in the investor’s set. They are withheld. The investor still has only his own open work, plus a note that a foreign reference was seen and not opened. He cannot be attached to Meera’s delivery, because her delivery is not in front of the chooser.

A path that put the bare ids in his set and then attached to them was followed on purpose, to see the damage. The damage is sending Meera’s delivery status to an investor. That send dies. The product does not grant investors the customer’s order text. If a particular business later writes an explicit rule that this outsider may see this order, that rule would be a setting, checked at fetch time. It is not the default, and this file does not invent that rule.

### Vikram — hello, then the jacket, then an employee

His phone is his. Nothing is open. One hundred and twenty situations are finished.

**“Hi.”** No finished situations. No jacket situations. The chooser can start something small, ask what he needs, or hold. Hold, with nothing written, sends nothing. This message never opens his past.

**“The jacket from last time has a hole.”** No order number. This is the returning-customer case the product cares about.

The practice carried more than one policy all the way through, so we would not collapse them too early.

One policy loads no finished situations unless a real id is present. The chooser cannot reopen the jacket, because the jacket is not in front of it. It can only start a new problem, ask, or hold. That path was walked. It is safe, and it is wrong for this product, because it makes him describe the purchase from scratch.

The choice this file makes loads a small set of his own finished situations that could be that past purchase, as short summaries only. Not one hundred and twenty. Not the full situations. A search that stays inside his finished situations may be how those few are chosen, so we do not show him five unrelated recent purchases and miss the jacket. That search is not a search of the business, and it does not open full situations before the choice. If it finds nothing useful, Tend starts a new problem, asks, or holds. From the few he is shown, Tend may reopen one, start a new problem linked to the old purchase, or ask which order he means. Reopening loads that one old full situation record. Starting new, or asking, loads none of the old ones. The choice is made from the situations in front of him, not postponed.

**An employee on the internal chat says “show Vikram’s journey.”** The speaker is the employee. Vikram is the subject, not the speaker. The employee sees their own open work, and may see a projection that this question is about Vikram’s journey. They do not receive one hundred and twenty situations in the choosing set. What they are shown, if they are allowed to see it, is an internal answer. It is not a WhatsApp to Vikram. A path that texted him because an employee asked dies.

Learning afterwards must not reopen the jacket on its own.

### A stranger, then order 8821, then Lara

**First message, unknown number, no order number.** No Meera situations. No silent lookup of 8821. Tend does not guess that a customer WhatsApp is Meera. It can start a situation under the unknown person, ask what they need, and hold. It must not become Meera. An acknowledgement that only says “received” without a real question or a real situation change is not the product.

**Same thread, later, the message contains 8821.** The speaker is still the unknown person. The lookup returns only the situations that own that number, not Meera’s refund on 7701, and not “all of Meera.”

Two readings were kept until the product rule could choose.

Reading one put those situation ids in front of the chooser as bare ids, with the stranger still the speaker. Attaching then opens the customer’s delivery or refund and would send that status to an unbound phone. That send dies unless a real rule says this phone may hear it. We do not have that rule. A stranger quoting an order number is not the customer.

The product choice, which the practice left open, withholds the ids. The situations say only that a reference was seen. Attaching to 8821 is then impossible, because the id is not there. Tend creates or continues the unknown person’s own situation and asks them to prove they are the customer, or asks what they need, without reading Meera’s situation out loud. A path that “hydrates the ids afterwards because we know the number” dies. That is the same leak, one step later. The other reading, where the ids are shown and someone might answer with Meera’s status, was walked so we could see it. That answer to an unbound phone dies.

**Lara, on the employee chat: “Meera’s refund.”** No order number in the text.

Lara’s own open work, plus the word Meera, plus zero of Meera’s situations. That is the path. An earlier draft let the name fetch Meera’s rows and called the permission check a later step. That draft is withdrawn. The fetch is the leak.

From that thin set, Lara cannot attach to a refund she was not shown. Tend can start an employee situation that mentions the name, ask her for the order number, or hold. A path that opens the refund at the next step “because now we know the name” dies.

The product does say that an employee who is working the problem sees the whole picture, and a partner does not. So the permission is real, and it is later, and it is conditional. When Lara is actually on that refund, a fetch for the employee on that problem returns it, and the answer stays on the employee channel. When she is not, the fetch is refused and Tend asks for the order number. That is the rule. The sentence was not enough.

What never happens: WhatsApp to Meera saying Lara is asking. That died on every path. Meera hears about her own situation when her own situation changes, not because an employee looked her up.

If Lara later replies with the order number 8821, the number can be looked up then, still with Lara as the speaker, still without opening every problem Meera has, and still with the employee permission checked at fetch time. The reply to Lara stays on the employee channel.

### The carrier and the partner desk

Meera on her phone, and the partner desk by email, are two runs. They can be about the same delivery. They are not the same speaker and they do not share one pile of situations.

**Meera.** If she names the order, 8821, the situations in front of her are the open problems on that order, such as the delivery. The refund on a different order stays out. That is different from “Any update on my delivery?” with no number, where all of her open situations stay visible. The partner’s mailbox is not one of her situations.

If the carrier information is fresh, the situation can be written with a real status, and she can be told that status.

If the carrier information is stale, or the connection is down, Tend does not invent a location. Inside the time the business configured, the situation waits. The wait records what it is waiting for. Past that time, the situation records a failure, and the next step is the path the business configured. It does not tell her a tool failed in tool language. It may notify someone inside, then the partner, with a scoped note, when the situation says so. She is updated when the situation has something true to say, including that the business is still finding out. She is not updated on every internal retry.

If she is asking about a different order, and no system and no person can say where it is, that is not this wait. Tend records that the capability is absent and tells her honestly. If a person can answer, that person is brought in with the order details. A registered carrier that is merely down is not that problem.

**The partner’s email about the tracking number.** The speaker is the partner. Their own open work, plus the situations that carry that tracking number, and not Meera’s other orders and not her refund. The same delivery can be open in both starts. She sees the customer view of it. The partner sees the scoped view. They are not given each other’s pile. The partner can be attached to that shipment or held. What they may be sent is the scoped shipment state. The partner’s message can also be written down with nothing sent back, if the situation does not say to reply. A path that pasted her refund or her other orders into the partner email dies.

**The contrast that must not be blurred.** A carrier the business actually uses, which is stale or down, waits inside the configured time and is a recorded failure past that time. A case where no system and no person can answer is a missing capability, told honestly. A case where a person can answer is human work, with the order details. Calling the down carrier either of those other two died in the practice.

Background learning may remember that this tracking number was queried and what was told. It may not overwrite the tracking truth with a note.

### The owner sets a refund rule

**The owner, on the owner’s own channel,** says refunds over two thousand need a person’s approval.

The same words on a customer’s WhatsApp do not set the rule. The speaker is the customer. Tend does not become the settings desk because the text sounds like policy.

The situations in front of the chooser are the owner’s work, not a scan of past refunds. A path that loaded past refund situations to “find the rule” dies. A path that treated the sentence itself as the saved rule dies. A path that attached this message to some customer’s refund dies.

Tend starts or attaches a situation whose point is “the owner is changing a setting.” The actual number is written by the settings action into the settings store. Only after that write succeeds does the owner hear that the rule is saved. Customer refunds already underway are not reopened in bulk.

The next time a customer refund is over two thousand, the refund action reads the setting and stops for approval. It does not retrieve this chat and hope the AI remembers. Learning cannot delete the threshold, raise it, or lower it.

**“What can I configure?”** on the owner channel reads the catalogue of settings. It does not read two million situations. It does not change the threshold. A later change still has to go through the write above.

**The employee: “the owner agreed, set it.”** The employee is not the owner. The settings write is absent on this channel. Tend can record the employee’s request, ask the owner, or refuse. It sends nothing to customers. A path that writes two thousand from the employee channel dies at the moment of the write. Learning must not promote that corridor sentence into the threshold later. If the owner later sends the same instruction on the owner channel, the owner path runs. The employee’s message does not count as that.

### Neha — her invoice, someone else’s orders, someone else’s business

Neha speaks on her business’s supplier channel. Meera is not the speaker. The business is fixed before any lookup. The text does not get to move it.

**She asks about invoice 900 and about Meera’s orders.**

Her own open situations, plus a lookup for invoice 900 inside her business only. Meera’s open problems are not in the set, even though Neha said the name. If the invoice is found, that part can attach, be asked about, or become an inquiry. The sentence about Meera stays a question with no situation behind it. Tend does not gather Meera’s orders and does not send them. If the invoice is missing, that is a different front: ask, or start an inquiry about a missing invoice. It is not the same choice as “we found it.”

**A mailbox of her business receives a customer id that belongs to another business.** The person who sent the mail is not that other customer. No rows from the other business. The foreign id can be marked on the way in and still not loaded. Tend holds or asks inside her business. It sends nothing from the other business. If the same poisoned id is sent again, the same hold happens again. Learning may remember the pattern “this mailbox sometimes pastes foreign ids.” It may not store that id as a customer in her business, and it may not remember “when Neha says Meera, load Meera’s orders” as a shortcut for next time.

---

## What “memory and knowledge” is, after these situations

It is one capability with three jobs. The practice situations were mostly about the first two, because that is the part that was missing from the early diagrams.

**Serve.** Given who is speaking and what phase this is, return a small set: short summaries for routing, the full situation record after a situation is chosen, and later the narrower material a worker needs to gather or decide. Vocabulary and commercial knowledge can be served too, but they are not a substitute for the situations, and they do not belong in the routing lookup.

**Hold the fleet.** The situations remain the truth of each problem. Memory keeps the views the lookup needs: open situations by person, lookup by order number or tracking number or invoice number, and thin links from those hits. Nobody scans the fleet.

**Learn afterwards.** From what happened, keep what helps the next situation start smarter. Do not touch identity, permission, or settings.

The conversation manager consumes the short summaries. The situation worker consumes the full situation record of the chosen situation, and can ask again for a later stage. Background learning consumes the trace after the write, and must not block the write.

---

## What this file is not

It is not the section on time, failure, and a person not acting. The carrier situation waits inside the configured time and records a failure past that time. The cross-dimension stress pass is recorded in [`section_9_architectural_dimensions.md`](section_9_architectural_dimensions.md). It sits on top of this picture. It does not reopen which situations are shown. Who a human is, and how that person is joined to what they may do, stays with Level 2.

It is not an instruction to delete the practice folder today. It is written so that the folder is no longer required in order to know the results.

It is not a technology design. It does not choose a database, an index engine, or a prompt.

It does not freeze a number for how many of Vikram’s past situations are shown. The rule is a small set of his own situations, only when the message points at the past, never the whole business, and never on a bare hello.

---

## If you only remember one page

A proved binding says which phone, mailbox, or login this is.

The text does not rename that channel.

A human, including the owner, is verified by an identity provider before Tend treats them as that person.

The exact join between that verified person and what they may do is still open in Level 2.

That person’s open problems are the situations, unless a real order number narrows them.

A word can point at a likely situation.

A word cannot hide the other open situations, rename the person, or cross into another customer or another business.

Finished history appears only as a few of that person’s own past situations, and only when the message is about the past and has no cleaner number.

A bare hello does not open the past.

Settings are written through a settings action by the owner who set the business up, or by a person that owner assigns to configure the business.

An outsider does not receive a customer’s situation because they mentioned it.

An employee receives it when they are on that problem, not because they typed a name.

Nothing is sent until the situation changes in a way someone should hear.

Learning makes the next time smarter.

A note must not change a business rule, a formal policy, a legal or compliance constraint, who may act, a permission, who owns a fact, a required approval, who is answerable, or the line around an irreversible action.
