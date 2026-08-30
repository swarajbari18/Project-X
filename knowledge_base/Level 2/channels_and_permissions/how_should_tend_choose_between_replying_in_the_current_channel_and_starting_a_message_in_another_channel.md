# How should Tend choose between replying in the current channel and starting a message in another channel?

## Where this question came from

Level 1 asks how Tend chooses between replying where the customer is and starting a message somewhere else. The concrete case from Product Vision: a delivery-delay update needs to go out the next morning, after the WhatsApp window has closed. Replying is not possible freely there — so does Tend use a template, switch to email, wait, or hand to a human?

## The answer has two halves

**Replying is not a choice.** If the customer is already in a conversation on a channel, the reply stays on that channel, inside the window. There is no "pick another channel for the reply." This handles most of the case.

**Starting a message is the only place a choice exists**, and it is an ordered, gated list:

1. **The channel the customer has an open, consented relationship on** — their preferred (consented) initiating channel.
2. **WhatsApp** — only if a template category matches (utility for operational updates) **and** consent exists.
3. **Email** — the safest initiate default (consent + unsubscribe).
4. **If none can fire** — that's a routing decision, not a failure: a human decides, or Tend waits, or Tend escalates the need.

The word "gated" matters: each rung passes only if the channel record (Q1) and consent (Q2) both allow it. The sequence does not skip a rung because it is convenient.

## A blocked initiate is a routing decision, not a refusal

The Level 1 wording ("choose between replying in the current channel and starting in another") can make a blocked initiate sound like "we cannot reach this customer." It is not. When every initiate rung fails, the need doesn't disappear — it becomes a routing outcome: a human chooses the channel, Tend waits for a window to open, or the need is escalated. This ties into the coordinated Failure and escalation machinery, and it protects the core principle that a message never merely fails silently because of a channel.

## The channel window as a wait

Starting a message is bound to a window, which we already modelled as a wait on the Coordination/Time spine (opens on an event, fires when it ends). So "start in another channel" often means "wait for that channel's window" — a resume-trigger on a wait, not a static switch.

## The boundary

- We own the rule that chooses the initiating channel (the gated sequence above).
- Whether to communicate at all — versus wait or escalate — is Decision Making / Failure, not this category.
- The concrete mechanics of starting a message on a given provider is Level 3.

## Working decision

Replying stays on the current channel; there is no channel choice for a reply. Starting a message follows a fixed, gated sequence — preferred consented channel → WhatsApp template+consent → email → human/wait. Each rung requires both consent and the channel window to allow it, and a blocked initiate is a routing outcome (human decides, wait, or escalate), never a silent refusal.

## Related

- What each channel allows: [`how_should_tend_represent_what_each_communication_channel_allows_a_business_to_send.md`](how_should_tend_represent_what_each_communication_channel_allows_a_business_to_send.md)
- Consent and preferred channel: [`how_should_tend_record_consent_and_the_customers_preferred_channel.md`](how_should_tend_record_consent_and_the_customers_preferred_channel.md)
- When to communicate vs wait: [`../communication/when_should_tend_communicate.md`](../communication/when_should_tend_communicate.md), [`../communication/when_should_tend_wait.md`](../communication/when_should_tend_wait.md)
- Wait spine: [`../coordination/how_do_we_represent_work_that_is_waiting.md`](../coordination/how_do_we_represent_work_that_is_waiting.md)