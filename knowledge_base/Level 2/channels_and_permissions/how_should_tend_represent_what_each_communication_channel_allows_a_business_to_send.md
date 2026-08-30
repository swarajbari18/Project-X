# How should Tend represent what each communication channel allows a business to send?

## Where this question came from

Level 1 asks how Tend represents what each channel allows a business to send. Product Vision says the same thing in normal language: "what the rules allow a business to send on its own" differs from market to market and is configuration. And the research files already hold the concrete facts — WhatsApp CSW/FEP windows and templates, Telegram no-initiate, email initiate-with-consent.

The twist this category added: channel is **transport, not business logic**. The core of Tend never decides based on "which channel." So this question is really asking *where* a channel's rules live and *what shape they take*, not how they change decisions.

## The answer: a per-channel rule record, held by the adapter layer

Each channel is described by a small, fixed set of things a business needs to know before it sends anything:

- **Can we initiate?** (WhatsApp: not freely; Telegram: no; email: yes with consent.)
- **Can we reply, and under what window?** (WhatsApp: free non-template inside the 24h CSW; template outside.)
- **Which message categories exist and which are permitted?** (WhatsApp utility vs marketing templates have different rules and cost.)
- **What consent or opt-in is required?** (WhatsApp template needs opt-in; email needs lawful basis + unsubscribe.)
- **What cost applies?** (WhatsApp is per-message and category-dependent; email is not.)

These live in the **communication-manager adapter layer**, not in the core. The core emits "a message to this actor with this intent." The adapter layer checks the channel record and decides whether the carrier channel can legally carry it. The core never knows or cares that it was WhatsApp vs email.

## A channel window is a wait on the shared spine

A channel's "can we send now" isn't a static flag — it opens and closes. WhatsApp's 24h CSW opens on a customer message and fires when it closes. Telegram has no initiate at all. So the representation reuses the wait spine from Coordination/Time:

- a window is a wait that **opens on an event** (customer message, ad click);
- it has a **timing class** (a wall-clock window);
- it **fires when it ends**, and the firing re-enters the decision loop.

This is the same shape Journey already used for nurture windows. We did not build a new concept; we consumed the spine.

## The always-fallback and the visible-gap rule

"All channels" is not "every adapter ships on day one." Two rules make the promise true:

- **A fallback lane always exists** (email). Even when the preferred lane has no adapter, a message can still reach the actor, so work never dead-ends.
- **An absent channel is a visible, first-class gap, not a refusal.** When the business connects a channel without an adapter yet, the system surfaces it as a gap (a build signal for Growth and Evolution) and uses the fallback. It never tells the owner "this channel is not supported."

## The boundary

We own "what a channel permits" at Level 2. Level 3 owns "how a message is transported" — the concrete provider, delivery, and adapter mechanics. Communication's earlier "channel rules live at Level 3" phrasing referred to the transport meaning; this document reconciles it.

## What this question does not settle

- Exact window lengths and per-market consent durations (business config / Compliance & Security).
- Which concrete adapters exist and their build priority (Growth and Evolution / Level 3).
- The transport and delivery mechanics themselves (Level 3).

## Working decision

Each channel is represented by a per-channel rule record (initiate / reply-window / message categories / consent / cost) that lives in the communication-manager adapter layer. The core stays channel-agnostic. A channel window is a wait on the shared Coordination/Time spine. A fallback lane always exists, and an absent channel is a visible, first-class gap — never a refusal.

## Related

- Consent and preferred channel: [`how_should_tend_record_consent_and_the_customers_preferred_channel.md`](how_should_tend_record_consent_and_the_customers_preferred_channel.md)
- Reply vs start elsewhere: [`how_should_tend_choose_between_replying_in_the_current_channel_and_starting_a_message_in_another_channel.md`](how_should_tend_choose_between_replying_in_the_current_channel_and_starting_a_message_in_another_channel.md)
- Channel facts: [`../../research/wa_compliance.md`](../../research/wa_compliance.md), [`../../research/channel_compliance_matrix.md`](../../research/channel_compliance_matrix.md)
- Wait spine: [`../coordination/how_do_we_represent_work_that_is_waiting.md`](../coordination/how_do_we_represent_work_that_is_waiting.md)