# Channel Compliance Matrix — What Tend CAN proactively do per channel (verified)

Constraint: Tend must know the rules for INITIATING messages vs REPLYING, per channel.
This drives Feedback/Nurture/Retention design and which channels are safe by default.

## WhatsApp (verified via Meta/BSP + pricing docs, 2026)
- **User-initiated only by default**: within a 24-hour Customer Service Window (CSW) from the last
  customer message, business can send free non-template replies.
- Outside CSW: only **approved template messages** (with opt-in/consent required in most cases).
- **Free Entry Point (FEP)**: 72h of free ALL-message-type window after Click-to-WhatsApp ad or
  FB/IG Page CTA button (mobile app only).
- Pricing (Jul 2025): per-message. Marketing templates always charged; Utility templates free within CSW.
- → Tend default for proactive (nurture/feedback): **email or Telegram-with-consent**, WhatsApp only via
  template/opt-in or within CSW. User's instinct "email is safest default" is correct.

## Telegram
- **Bots cannot start conversations with users.** A user must first message the bot or add it to a group
  (verified: core.telegram.org/bots "Bots can't start conversations with users; a user must either add
  them to a group or send them a message first").
- Telegram **Business** (personal-account bots, Secretary Mode) can process incoming + reply; and in
  chats active in the last 24h; still no cold initiate.
- → Telegram is also **user-initiated-first**; treats as "reply window like WhatsApp" + less strict
  pricing. Useful as an async channel, but not for fully proactive cold outreach.

## Email
- **Allowed to initiate** (with legal caveats: CAN-SPAM/US, GDPR/DPDP consent, spam laws).
- Best default for proactive/marketing+nurture+feedback because initiation is lawful with consent+
  unsubscribe. User said "email is the best way" — verified statement.

## Web chat / website widget
- Fully business-controlled (initiated by user via widget; business can set proactive prompts,
  but requirements: user-initiated session; no cold outbound).

## Verified lead-response-time data (why "first responder wins" matters but is misquoted)
- Conversion rates ~8x higher when first response within 5 min vs 5min–24h (XANT/InsideSales 2021,
  5.7M inbound leads, 400+ companies). Only ~0.1% attempted within 5 min.
- 21x better qualification odds at 5 min vs 30 min (HBR 2011); 7x within hour vs next hour; 60x vs 24h+.
- 37% of 2,241 audited companies responded within an hour; 23% never responded (HBR 2011).
- "78% buy from first responder" / "35-50% sales to first vendor": **no traceable primary source — folklore
  (verified debunked by Expertise AI + aggregator blogs)**. Use the 8x/21x/23%-no-reply stats instead.
- Drift 2017: only 7% of 433 B2B SaaS responded within 5 min to a demo form → "5-min SLA beating
  93% of competitors" is a defensible Tend marketing claim.

## Implications for Tend
- Tend's "reply instantly" needs to be legally compliant, so the channel matrix is a first-class
  business rule ("proactive_channel: email | none") not an afterthought.
- For nurture/feedback journeys: email first; WhatsApp via templates/opt-in; Telegram via user-initiated.
- For "where is my order" replies (inbound): any channel is fine (within CSW/conversation).
