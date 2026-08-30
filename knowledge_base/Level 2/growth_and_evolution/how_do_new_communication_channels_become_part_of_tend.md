# How do new communication channels become part of Tend?

## Where this question came from

Level 1's Growth question asks how a new communication channel joins Tend. The Channels and Permissions category already decided most of it: the adapter layer, the per-channel rule record, the fallback lane, the visible-gap rule, the window as a wait. What Growth adds is (a) a channel is a capability in the same catalogue, and (b) a channel's rules are external and change over time — that is the "platform rules live + interrupt" plane.

## The answer, in plain words

A channel joins through the same lifecycle as a business system: request → evaluate → author → contract → validate → test → enable → monitor → retire. Its contract is the per-channel rule record already defined in Channels — can we initiate, can we reply, what window applies, which message categories exist, what consent is required, what cost applies. Its difference: those rules are not set by the business. They are set by the platform (WhatsApp, Telegram, email providers) and by law. So a channel is never pinned; it is always read live, and when it changes, the world interrupts the situation.

## The walkthrough (WhatsApp changes a window)

Meta changed its pricing and window rules (per-message pricing, July 2025 — verified in our research). Tend never "decides" whether to believe the new rule. The rule changed in the world. The per-channel rule record updates as a business-situation fact. A situation that was waiting on that window wakes on the wait spine, re-checks what the channel now allows, and either carries the message inside the new window, uses a template, or uses the fallback lane (email). It does not pretend the old window still exists. Pinning a platform rule would be guessing that the world did not change, which the invariants forbid.

## The walkthrough (a new channel joins)

A business asks for Telegram.
1. Not in the catalogue → visible gap; the fallback lane carries the work meanwhile.
2. The product team evaluates: value, and constraints. Verified constraint: Telegram bots cannot start conversations with users — a user must message first. The contract reflects this (no cold initiate).
3. The team authors the capability over Telegram's tool definitions; the contract is the per-channel rule record.
4. Validate + test; the business enables it and chooses its scope and fallback.
5. Monitor: Telegram may change bot policies → external-live event, not a version pin.

## The boundary

- Reuse from Channels: adapter layer, rule record, window-as-wait, fallback + gap.
- New here: a channel = a capability in the catalogue; channel rules are external and live (part of the change spine's "platform rules" plane).
- Concrete adapters and providers: Level 3.

## Working decision

A channel is a capability whose contract is the per-channel rule record, joining through the same lifecycle as any other capability. Its rules are external facts: always read live, changes interrupt and wake the situation, the fallback lane absorbs, and a change is never pinned or hidden.

## Related

- The channel foundation: [`../channels_and_permissions/understanding_all_channels_and_permissions_questions.md`](../channels_and_permissions/understanding_all_channels_and_permissions_questions.md)
- The "platform rules live" plane: [`how_do_we_evolve_tend_without_breaking_existing_businesses.md`](how_do_we_evolve_tend_without_breaking_existing_businesses.md)
- Join lifecycle: [`how_do_new_business_systems_become_part_of_tend.md`](how_do_new_business_systems_become_part_of_tend.md)