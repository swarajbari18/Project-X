# The non-responsibilities register

This register lists what Tend as a whole does not own. It is for the moment a builder, or a coding agent, sees a convenient chance to take over someone else's job — for example, keeping Tend's own copy of an order and updating it. The answer it gives is: "No. That is intentionally outside the system." <!-- method: the non-responsibilities register -->

What each part must never do lives in that part's file, under "What does it never do?", in [the build view](../build_view/overview.md). This register holds the system's list only. <!-- method: part lists live in part files -->

Each entry gives seven things: what is not owned; why it is excluded; who owns it; how Tend works with that owner; who may say yes, and who may not; the evidence; and what future change could move the line.

The list of what Tend does not own is **Decided**: it comes from the problem statement written before the design began. <!-- Level 1: what Tend does not own --> Most reasons, and most future changes that could move a line, were never written down before this design. Where this register gives one, it is the design's reading; the project owner (the person designing Tend) accepted these readings on 2026-10-22, and asked for the missing ones to be settled in the way that best fits. They are written below. <!-- closed item: refusal register; decided by the owner, 2026-10-22 -->

This list is the full list: it is the problem statement's own. The problem statement's section "What does not belong to Tend" has seventeen sentences; this register groups them into thirteen entries. Entry 1 joins how a business operates and its policies; entry 4 joins replacing the business's systems and becoming the record of their facts; entry 6 joins inventing missing information and ignoring conflicting information; entry 7 joins overriding approvals and replacing a judgment the business requires a person to make. Each other entry is one sentence. A new entry is added only if the problem statement changes. <!-- settled 2026-10-22: the full refusal list -->

## 1. How the business operates, and its policies

- **Not owned:** how the business works, and the policies it runs by — such as its refund policy.
- **Why excluded:** a policy is the business's own decision; Tend runs inside it. The design's reading.
- **Who owns it:** the business.
- **How Tend works with it:** the configurator writes the business's policies into its settings, through fixed tools; Tend reads them, and never learns them from old situations. <!-- decided 2026-10-03: settings are settings; G7 -->
- **Who may say yes:** the business owner, or the configurator they name. Not Tend, not the AI, not memory and knowledge. <!-- G7; N13 -->
- **The evidence:** the problem statement; the business's growth answers.
- **What could move the line:** nothing in Tend's purpose. Tend may suggest a setting the business could adopt — memory and knowledge proposes, the configurator checks — but the business decides, and only the configuration tools write it. Tend never creates a policy on its own. The design's reading. <!-- N13; G7 -->

## 2. The business's strategy

- **Not owned:** who the ideal customer is, which market to target, what to offer, at what price, and whether a campaign is worth it commercially.
- **Why excluded:** these are commercial judgments, and they belong to the business. Tend carries out the business's operations; it does not set their direction. The design's reading.
- **Who owns it:** the business.
- **How Tend works with it:** the business supplies the purpose of each outreach; Tend carries it out. <!-- Level 1: business-directed communication -->
- **Who may say yes:** the business. Not Tend.
- **The evidence:** the problem statement.
- **What could move the line:** a future capability could show the business owner analysis to inform a choice — as advice, like any other report. The choice would still be the business's. The design's reading.

## 3. Who owns the business

- **Not owned:** the decision of who owns the business.
- **Why excluded:** who owns a business is a legal fact, decided outside Tend. The design's reading.
- **Who owns it:** the business.
- **How Tend works with it:** the person who signs up is the business owner, and holds the configurator role unless they name someone. <!-- Q7 -->
- **Who may say yes:** the business. Not Tend.
- **The evidence:** the problem statement; the business's authority answers.
- **What could move the line:** nothing. Who owns a business is a legal fact outside any software. Tend records only who signed up, and who the configurator is. The design's reading.

## 4. The business's existing systems, and their records

- **Not owned:** the business's own systems — its shop, its payment provider, its carrier — and the facts they hold, such as an order's address or a parcel's tracking.
- **Why excluded:** each system stays the source of its own facts. <!-- P1; Level 1: does not own other systems' facts --> That a copy kept and updated by Tend would drift from it is the design's reading.
- **Who owns it:** each system, and the business that runs it.
- **How Tend works with it:** Tend reaches each system only through a capability — a connection the product team builds on that system's own tools. Every call goes through the tool layer. Tend keeps the reference, and what it was told, with the source and time. <!-- P1; E1; Section 7: tool layer -->
- **Who may say yes:** the business, to switch each capability on. The system's own rules decide who may change its records. Tend changes such a record only with a person's approval. <!-- Section 10: default permissions -->
- **The evidence:** the problem statement; the business's growth and authority answers.
- **What could move the line:** a business with no system at all for a kind of record could ask Tend to keep it. That would be a new capability, written by the product team and switched on by the business, with Tend named as that record's owner — never taken on silently. The design's reading.

For example, Tend never keeps its own copy of Meera's order and updates it. It reads the order from the shop's system, and records what it read, with when.

## 5. Finding sales leads

- **Not owned as a core job:** finding or collecting leads.
- **Why excluded:** a business may use an outside service for it. <!-- Level 1: lead discovery -->
- **Who owns it:** that outside service, and the business that uses it.
- **How Tend works with it:** it joins as a capability; its results are claims from outside, never truth or instructions. The business decides whether its results may open situations by themselves, or need a review first. <!-- Level 2 growth: an outside agent joins -->
- **Who may say yes:** the business, subject to source, privacy, permission, and its own rules.
- **The evidence:** the problem statement; the business's growth answers.
- **What could move the line:** a business may switch on a lead-finding capability, through the tool layer; its results still arrive as claims from outside, and the business decides whether they may open situations by themselves. The line itself does not move. The design's reading. <!-- Level 2 growth: an outside agent joins -->

## 6. Inventing missing information, or ignoring conflicting information

- **Not owned:** filling a gap with a guess, or choosing one side of a conflict silently.
- **Why excluded:** Tend never guesses; what it does not know, it records as not known. <!-- C2 -->
- **Who owns it:** nobody: it is never done.
- **How Tend works with it:** what is not known is recorded as not known; both sides of a conflict are kept, and fixed code decides what the conflict blocks. <!-- C2; E5 -->
- **Who may say yes:** nobody. No setting can switch this off. <!-- G6 -->
- **The evidence:** the problem statement's promises.
- **What could move the line:** nothing; it is one of the promises. <!-- Level 1: the invariants preface; C2 -->

## 7. Overriding the business's approvals, or a judgment the business requires a person to make

- **Not owned:** approving in the business's place, or replacing a person the business requires.
- **Why excluded:** Tend holds no authority of its own; it acts only inside the range the business granted. <!-- G1 -->
- **Who owns it:** the named approvers and people the business chooses.
- **How Tend works with them:** the permission check asks a person first; Tend waits for the answer, and never offers a way around a rule. <!-- T2; G4 -->
- **Who may say yes:** the named person, for that exact request. Not Tend, not the AI.
- **The evidence:** the problem statement; the business's authority answers.
- **What could move the line:** the business widening a grant, within the hard rules. <!-- G6 -->

## 8. Checking who a person is

- **Not owned:** proving a person's identity.
- **Why excluded:** a name, a phone number, or a channel is not proof. <!-- decision record 6 -->
- **Who owns it:** the sign-in provider the business uses.
- **How Tend works with it:** a permission belongs to a person the sign-in provider has checked, matched to the business's membership; a channel bound to a member shows only which channel a message came through, and names the member. Any step that needs a person's permission needs a fresh sign-in through the provider. <!-- decision record 12; decided 2026-10-22: identity and permission -->
- **Who may say yes:** the sign-in provider confirms who a person is; the business decides what that person may do.
- **The evidence:** the problem statement; the business's identity answers.
- **What could move the line:** nothing. Checking who a person is stays with the sign-in provider. Tend keeps only who may do what in which business: membership and channel bindings ([decision 25](../decision_view/the_decisions.md)). <!-- decided 2026-10-22: identity and permission -->

## 9. Owning who a person is

- **Not owned:** the record of who each person really is — a person's lasting identity.
- **Why excluded:** the business and its identity systems already hold it; a second copy kept by Tend would drift. <!-- Level 1: what Tend does not own -->
- **Who owns it:** the business, and its identity systems.
- **How Tend works with it:** Tend uses the identities those systems provide. It keeps only who may do what in each business: membership, and channel bindings. <!-- decided 2026-10-22: identity and permission -->
- **Who may say yes:** the business's identity systems say who a person is; the configurator decides who is a member.
- **The evidence:** the problem statement; the business's identity answers.
- **What could move the line:** nothing. The design's reading.

## 10. Carrying messages

- **Not owned:** transporting messages from one place to another.
- **Why excluded:** the communication platforms carry them; Tend sends and receives through those platforms. <!-- Level 1: what Tend does not own -->
- **Who owns it:** each communication platform: WhatsApp, Telegram, email providers, and the website chat.
- **How Tend works with it:** through the communication layer, which follows each channel's rule record, and the tool layer, which makes every call. <!-- L1; M4 -->
- **Who may say yes:** each platform's own rules decide what it carries; the business decides which channels it connects.
- **The evidence:** the problem statement; the business's channel answers.
- **What could move the line:** nothing. The design's reading.

## 11. Controlling outside services and agents

- **Not owned:** how an outside service or agent works, and what its output means.
- **Why excluded:** each service runs itself; Tend only asks it for information or for an action. An outside agent's output is not truth, permission, or an instruction just because the agent produced it. <!-- Level 1: what Tend does not own -->
- **Who owns it:** the service, or the agent, and whoever runs it.
- **How Tend works with it:** through the tool layer, with the permission check before each call. What comes back is evidence, weighed as claims; it never carries an instruction Tend obeys. <!-- Section 7: tool layer; Level 2 growth: an outside agent joins -->
- **Who may say yes:** the business, to switch each capability on; the service's own rules for what it will do.
- **The evidence:** the problem statement; the business's growth and security answers.
- **What could move the line:** nothing. The design's reading.

## 12. How an outside partner does its work

- **Not owned:** how a partner, such as the carrier's own team, performs its work.
- **Why excluded:** the partner owns its part of the job. <!-- Level 1: what Tend does not own; K4 -->
- **Who owns it:** the partner.
- **How Tend works with it:** Tend contacts a partner only when the escalation path calls for it and the business's policy allows it, and asks only for what the task needs. <!-- K4 -->
- **Who may say yes:** the business, through its policy for partner contact.
- **The evidence:** the problem statement; the business's answers on meetings and human work.
- **What could move the line:** nothing. The design's reading.

## 13. Giving a partner the full record

- **Not owned:** sharing a customer's, or the business's, full record with a partner.
- **Why excluded:** a partner needs only what its task needs. <!-- Level 1: what Tend does not own -->
- **Who owns it:** the business, which decides what each partner may receive.
- **How Tend works with it:** a partner sees only the fields on its list; the default is nothing. <!-- T11 -->
- **Who may say yes:** the business, for each kind of partner. Not Tend, not the AI.
- **The evidence:** the problem statement; the business's channel answers.
- **What could move the line:** the business widening a partner's list of fields, within the legal limit.

## Open questions, and what is set later

Nothing in this register is open. Each reason and each moving line above is either written in a source, or is the design's reading, accepted on 2026-10-22. <!-- decided by the owner, 2026-10-22 -->
