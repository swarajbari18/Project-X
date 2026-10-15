# How do new communication channels become part of Tend?

## Where this question came from

Level 1's Growth question asks how a new communication channel joins Tend. (Level 1 is the problem statement.) Channels already decided that each channel has a rule record, a window, and email as its next option. What Growth adds is this: a channel is a capability on the same list of capabilities, and a channel's rules are set outside Tend and change over time.

## The answer, in plain words

A channel joins through the same lifecycle as a business system: request, evaluate, author, write the rule record, validate, test, enable, monitor, and retire. A channel's rule record is defined in Channels. It says: can we start a chat, can we reply, which window applies, what consent is needed, and what it costs. Those rules are not set by the business. They are set by the platform (WhatsApp, Telegram, email providers) and by law. Tend never fixes a platform rule. It reads the current rule each time. A change to a rule record is a change of status. It wakes the situation worker, which re-checks the rule. Before a channel joins, its research file must state: whether a template is needed, whether a chat can start, what consent is needed, the window, and the cost.

## The walkthrough (a platform rule changes)

Suppose WhatsApp changes the length of its window. Tend does not decide whether to believe the new rule. The rule changed outside Tend. The channel rule record is updated. A waiting situation wakes. It re-checks what the channel now allows. The worker picks a route: inside the new window, an approved template, or email. The communication layer sends. It does not act as if the old window still applies. Decision: Tend never pins a platform rule. The product team updates the rule record when a platform changes its rules.

## The walkthrough (a new channel joins)

A business asks for Telegram.
1. Not on the list of channels: a visible gap. Email carries the work meanwhile, if the choice file allows it.
2. The product team evaluates the value and the limits. Telegram's bots page: bots cannot start a conversation; a user must first message the bot or add it to a group. Telegram's FAQ: bot messages cost nothing by default. Telegram states no template rule. Business bots can reply only to chats with an incoming message in the last 24 hours.
3. The team builds the capability for Telegram, with its rule record written first.
4. The team validates and tests it. The business enables it and chooses its scope. Email stays the next option when the channel cannot carry the message.
5. Monitor: Telegram may change its bot rules. That is a platform rule change, not a version to pin.

## The boundary

- Reuse from Channels: each channel has a rule record, a channel window is a wait, and email is the next option when a channel cannot carry the message.
- New here: a channel is a capability on the list of channels. Its rules come from outside Tend and change over time.
- Concrete connections to each provider: Level 3 (technology).

## Working decision

A channel is a capability. Its rule record defines what it allows. It joins through the same lifecycle as any other capability. Its rules come from outside Tend, and Tend reads them live. A change to a rule record wakes the affected situations. The situation worker chooses email when the channel cannot carry the message, following the choice order. Tend never pins a platform rule or hides a change.

## Related

- The channel foundation: [`../channels_and_permissions/understanding_all_channels_and_permissions_questions.md`](../channels_and_permissions/understanding_all_channels_and_permissions_questions.md)
- Platform rules change over time: [`how_do_we_evolve_tend_without_breaking_existing_businesses.md`](how_do_we_evolve_tend_without_breaking_existing_businesses.md)
- Join lifecycle: [`how_do_new_business_systems_become_part_of_tend.md`](how_do_new_business_systems_become_part_of_tend.md)
