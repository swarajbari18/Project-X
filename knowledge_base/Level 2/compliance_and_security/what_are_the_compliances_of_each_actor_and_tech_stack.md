# What are the compliances of each actor and each tech stack we will use?

## Where this question came from

Level 1 asks it directly. The category handoff pushed it further:
compliance must walk actor-by-actor, because each actor has a different
relationship to the same piece of data. A customer's chat message is
one thing to the customer, another to the shop, another to the
communication platform, and another to Tend.

## The decision that shapes the whole answer

**Compliance is one folder.** It holds every rule kind we found and any rule
kind we discover later:

- the **government's rules** — law. In India today that is the DPDP Act 2023;
  in Europe the GDPR; in the US CAN-SPAM and TCPA; in other markets their own.
- the **platforms' rules** — what WhatsApp/Meta, Telegram, email and the chat
  widget allow a business to send, and on what conditions.
- the **buyers' rules** — what the businesses that buy Tend demand before they
  sign (SOC 2, ISO 27001, a pentest, a filled questionnaire).
- **any future kind** — wherever it appears, it joins the same folder.

The engineering consequence is one sentence:
every rule gets a home in a per-market configuration record that the product
pre-writes and the business fills. That is the typed configuration registry
from Growth and Evolution, and the legal floor from Channels and Permissions.
Rules are configuration, not core logic. The invariants are the hard line
that no rule may cross.

## The concrete picture we use through this category

Sharma Electronics, a small shop in India, runs Tend.
It has connected its CRM, its payment system and its delivery partner.
Its customer Priya writes "where is my order?"

Three rule-makers exist in this one moment:

- **The government** (India) made a rule: the shop may store and use Priya's
  data only with consent, must let her delete it, and must secure it.
- **Meta** made a rule: outside the customer-service window, the shop may only
  start a WhatsApp conversation with an approved template and with consent,
  or the number gets banned.
- **A larger customer** of the shop's (a business buying from Sharma) made a
  rule: "prove you are trustworthy — who audits you?" before signing.

Three different people made three different rules.
All three live in the same folder: Compliance and Security.

## The compliances of each actor

### The customer / prospect

What flows: their name, phone, messages, order history, payment references.

- **Government rule**: the customer's data belongs to them. Consent is required
  for what the business does with it; deletion and export must be possible
  (DPDP, GDPR-style rights).
- **Platform rule**: they are the recipient on channels — WhatsApp's window and
  template rules, Telegram's no-cold-initiate rule.
- **What Tend must guarantee**: a chat message is never treated as an
  instruction to do anything outside the granted scope; deletion is recursive
  across every place the data lives (stores, logs, caches, model traces).
- Our earlier decision: an active conversation is not a consent problem;
  consent matters for starting a new customer conversation (Channels).

### The prospect (not yet a customer)

What flows: their enquiries, their journey stage.

- Same government and platform rules as a customer.
- **Specific Tend rule**: Tend must never confuse a prospect with a customer
  (a product invariant). The compliance consequence: outreach to a prospect is
  initiation, gated by consent and channel window, never a free-for-all.

### The employee

What flows: their identity, what they may see and do.

- **Government rule**: minimal scope and need-to-know. The white-list ceiling
  (GDPR Article 25, DPDP fiduciary) means the default is narrow.
- **What Tend must guarantee**: visibility follows the role scopes the product
  pre-writes; the business may only widen inside the legal white-list; an
  employee leaving the business loses access the same minute.

### The business owner / configurator

What flows: configuration, grants, policies.

- **Who owns what**: the business owns its customers, its data, its policies
  and its decisions (Level 1). The law makes the business the fiduciary.
- **What Tend must guarantee**: the configurator is the only one who writes
  grants (Authority); the configurator cannot cross the invariants; Tend
  records what was configured but the business answers for it.

### The business itself (the shop)

What flows: everything, because Tend is the shop's communication layer.

- **Government rule**: the shop is the data fiduciary / controller for its
  customers' data. Tend is the processor helping the shop.
- **Buyer rule**: the shop's own customers may ask "who audits you?" — which
  is why the shop cares about Tend's security posture.
- **What Tend must guarantee**: one shop can never see another shop's data.
  This is our new invariant. It is the isolation line.

### Tend's own team (the product builder)

What flows: operational access to run and improve the product.

- **Buyer rule**: businesses ask Tend to prove its own trustworthiness.
- **Government rule**: if Tend processes personal data on behalf of shops,
  Tend has processor duties: data-processing agreement, documented
  subprocessors, deletion support, breach notification timing.
- **What Tend must guarantee**: the deepest viewer (the product builder, from
  Observability) is governed — time-boxed, ticket-linked, audited access; the
  product builder never uses tenant data to train models by default.

### Business systems (CRM, payments, logistics)

What flows: order data, contact data, payment references, tracking data.

- **Ownership rule**: each system owns its data. Tend never becomes the source
  of truth for information another system owns (a product invariant).
- **Platform/contract rule**: the system's API terms and OAuth scopes apply.
  Minimum scope: Tend connects with the least power needed.
- **Payment-specific rule**: Tend never stores card data; it uses the payment
  processor's tokens (PCI-style discipline, even if we are never PCI-certified).

### Communication platforms (WhatsApp/Meta, Telegram, email, live chat)

What flows: the messages themselves, on the platforms' infrastructure.

- **Platform rule**: each channel's rule record decides what may be sent
  (the channel rule record from Channels). WhatsApp requires templates +
  consent outside the window; Telegram cannot cold-initiate; email allows
  initiation with spam-law compliance.
- **What Tend must guarantee**: the platform can ban a number or a domain if
  the rules are violated. So the per-channel rule record is a first-class
  config, and sending outside it is prevented, not warned.

### Identity providers

What flows: authentication results, not customer data.

- **Ownership rule**: the identity provider owns its authentication result
  (Trust and Evidence). Tend does not authenticate users (Level 1); it asks
  the IdP.
- **What Tend must guarantee**: the boundary itself — token verification,
  issuer and audience checks, revocation, session handling — is inside Tend's
  perimeter. Outsourcing the function does not outsource the security of
  accepting its result.

### External partners (e.g. the delivery partner)

What flows: only what they need — a tracking number, an order reference.

- **Level 1 rule**: Tend does not give an external partner the full record of a
  customer or the business; it coordinates with the information the business
  allowed them to receive.
- **What Tend must guarantee**: partner scopes are pre-written, narrow by
  default (the Channels white-list zone), and assignment of which partner is
  engaged is the business's call.
## And the tech stack?

The question says "each tech stack we will be using". In this category we keep
the Level 2 discipline: we talk about what each *kind of component* must
guarantee, not which product we buy. The concrete products, providers and
configurations are Level 3.

For every component we use, the compliance question is the same:
*what data does it see, and who made the rule about it?*

- **A store** (a database, an object store, a cache): must isolate per shop,
  encrypt at rest, and carry the tenant's identity in every key or partition.
- **A message queue or background job**: must carry a signed envelope with the
  tenant's identity, so a job cannot reach across shops.
- **The LLM provider**: is a subprocessor. The shop's data leaves our hands
  when it enters a prompt. So: field allowlists decide what ever goes in, the
  provider's contract (no training on our data, data residency) is on the
  subprocessor list, and cross-border rules (SCC/DPA-like) apply.
- **The identity provider**: verifies humans; we verify we accept only its
  correct result (issuer, audience, revocation).
- **The cloud platform (Cloudflare-first)**: provides the isolation
  primitives — but isolation is mechanical, not conventional. Cache keys,
  Durable Object names and service bindings must carry the tenant's identity,
  or two shops can see each other's data.
- **Email sending**: a shop's sending domain must be authenticated (SPF/DKIM/
  DMARC) so no one can impersonate the shop, and sending must obey spam rules.
- **Anything that fetches a URL** (a webhook, a sync, a tool): must only reach
  allowlisted hosts, so the server can never be turned into a weapon against
  the internal network (SSRF).

The subprocessor rule in one line:
every external party that can see shop data must be on a living, versioned
list with a data-processing agreement, and nothing may call a hostname outside
that list. That list is updated continuously, never static.

## Working decision

Compliance is one folder. For every actor, the answer to "what is the
compliance" is: who made the rule (government, platform, buyer, or the owning
system), what the rule requires, and what Tend must mechanically guarantee so
the rule cannot be broken. For every component, the same three-part question
is asked at configuration time. The concrete providers and the per-market
legal values are the knobs; the guarantees are the invariant line no knob
may cross.

## Boundary

- We own the actor-by-actor and component-by-component compliance map and the
  "one folder" structure.
- The concrete providers, auditor engagement and per-market values are Level 3
  and market configuration.
- The security mechanisms the map relies on (isolation, encryption, egress
  allowlist) are designed in
  [`how_do_we_make_a_software_product_secure.md`](how_do_we_make_a_software_product_secure.md).

## Related

- Consent and channel rules: [`../channels_and_permissions/understanding_all_channels_and_permissions_questions.md`](../channels_and_permissions/understanding_all_channels_and_permissions_questions.md)
- Grants and the configurator: [`../authority_and_ownership/understanding_all_authority_and_ownership_questions.md`](../authority_and_ownership/understanding_all_authority_and_ownership_questions.md)
- Configuration registry: [`../growth_and_evolution/how_do_businesses_customise_tend_without_changing_its_core_behaviour.md`](../growth_and_evolution/how_do_businesses_customise_tend_without_changing_its_core_behaviour.md)
- Market data: [`../../research/global_market_readiness.md`](../../research/global_market_readiness.md)
- Verification record: [`../../research/security_and_compliance_research_record.md`](../../research/security_and_compliance_research_record.md)
