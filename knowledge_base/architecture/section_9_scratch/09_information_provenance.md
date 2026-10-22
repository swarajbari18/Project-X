# Section 9 Scratch — Dimension 9: Information Ownership and Provenance

## Status

**Working dimension record.** The core semantics are established across Product Vision, Level 1, Sections 6–8 and Level 2: source/owner/authority/permission are distinct; Tend owns operational coordination truth, not other systems’ canonical facts; claims and changes remain traceable; memory is scoped and advisory; business views are derived. Cross-boundary retention, deletion and reconstruction details remain open. This scratch record does not amend canonical architecture or method files.

**Construction units:** U1–U5, using the settled Section 8 walkthroughs (§8.16.1–§8.16.5); U5 also tests the T-A/T-B security cases mapped in §8.16.3.

## Dimension

### Force

Information needed to move one business situation safely is distributed across systems, people, messages, documents and time. Each source has a different relationship to each claim: it may own a record or operation, report a claim, witness an experience, or merely hold a copy. Tend must bring enough of that information into one operational storyline to coordinate the next step without converting its working account into the canonical truth of an external system.

The force is not simply “store provenance.” Provenance, ownership, authority, currentness, permission, memory influence and retention determine whether a claim may support a particular decision, who can correct it, what Tend may communicate, what later readers can reconstruct, and whether any derived copy may continue to exist. A source can be authoritative for one claim and not another; a correct claim can become stale; a useful memory can remain non-authoritative; and a business view can look current while being a lagging projection.

The architectural question is:

> How can Tend maintain one current, inspectable coordination truth for each operational situation while preserving the distinct ownership, provenance, authority, currentness, access and lifecycle of every underlying information source and derivative?

This is a separation-and-linkage requirement, not a new universal source hierarchy, a “single source of truth” service, or a physical data model.

## Affected responsibilities

- **D — Gathering (D1–D8):** determine what can change the next safe step; identify claim owners and source locations; retrieve by authority, currentness, consequence and access; record gathered results without replacing the source; distinguish a missing capability from an unavailable source.
- **E — Trust and evidence (E1–E9):** preserve claims with provenance; compare them under deterministic, claim-specific rules; distinguish observation, claim, experience, interpretation, derived situation state, proposal, decision and action; retain uncertainty and conflict instead of silently flattening them.
- **A/B/C/F/G/H/I/J/L/M:** keep the situation graph and versioned operational story coherent as events arrive; route information to the right situation; re-evaluate affected decisions; enforce grants, communication scope and waits; preserve accountability, action history and honest failure/unknown states.
- **N — Memory and knowledge (N1–N17):** separate experience from learned knowledge and context projections; scope, reconcile, version, retire and evaluate learning; keep memory advisory; keep candidate configuration separate from authoritative applied settings; prevent secrets and business-specific policy from entering reusable memory or product behaviour.
- **O — Business view and explainability (O1–O10):** derive inspectable per-situation and aggregate views; preserve traces for explain-on-demand; show business work rather than operational telemetry; keep derived views read-only and access-scoped.
- **Q/R/S/T/U:** preserve authoritative configuration and grant state, separate business knowledge from product improvement, redact and attribute traces, check identity/tenant/access at use time, and enforce privacy/security controls over every copy and destination.

## Affected boundaries and state ownership

| Boundary or state | Information ownership consequence | Status / limit |
|---|---|---|
| **B-Story / situation model** | Owns Tend’s versioned operational coordination truth: what Tend has received and understood, claims and evidence references, asks, waits, human work, committed decisions/intents, outcomes and what must block an unsafe next action. It is not the canonical order, payment, inventory, carrier, policy or channel-message record. | One authoritative B-Story writer and versioned commits are established. Exact evidence materialization is not.
| **B-Membrane / channel** | Routes inbound events and owns in-flight routing/delivery state. Channel platforms remain canonical owners of their messages; Tend keeps the ingest, reference, routing and delivery information needed to coordinate and explain the situation. The membrane does not decide business facts or write story outcomes. | Boundary and write restrictions are established. Exact message-copy and retention treatment is open.
| **Adjacent-Tool** | A capability returns structured evidence to B-Story; transient invocation state and raw I/O traces are not operational story truth. Fetch authorization and tool permission remain separate from factual authority. | Structured evidence return and fetch-time authorization are established. Exact source snapshot/reference policy is open.
| **B-Memory** | Owns Tend’s experience and derived, scoped business-memory artifacts, not the business’s official knowledge or source-owned facts. Memory may guide interpretation, gathering or communication but cannot override current evidence, policy, grants, ownership, approval or irreversible-action boundaries. Structured configuration candidates become authoritative only through deterministic configuration apply. | Memory serve and its must-not rules are established. Learning/promotion beyond those rules is provisional; memory fields and physical storage are not set here.
| **B-Visibility** | Owns derived projections, owner snapshots and reconstruction renderings. It reads the situation graph and, for explanation, relevant traces; it cannot write operational truth. The per-situation baseline remains the drill-down target. | Read-only derivation and acceptable lag are established semantically; the projection/refresh contract and exact freshness presentation remain provisional.
| **Business configuration / Q** | Owns applied policy, grants and structured configuration. Business-defined authority is not inferred from a source record, a memory item, an old situation or model output. | Authoritative apply path is established; exact schemas and some apply semantics remain open elsewhere.
| **Adjacent-Improvement / R** | Receives only eligible, redacted trace material for product-behaviour improvement; it is not business memory and cannot make business-specific source claims authoritative. | Separation is established; eligibility and implementation details are not specified by this dimension.

### Coordination truth is not source truth

“Tend’s coordination truth” means the latest committed B-Story account needed to safely continue one operational problem: which asks remain open, what claims were received and how they were evaluated, what is unknown or conflicted, what was initiated, what is waiting, who is responsible, what Tend communicated, and what may happen next. That account is authoritative for Tend’s coordination and history of decisions at that version.

It does **not** assert that Tend owns the underlying business fact. For example, “refund outcome unknown” can be the correct Tend coordination state while the payment provider owns the transaction record; “carrier reports delivered” can be a provenance-bearing claim while the customer’s non-receipt report remains a separate experience claim. A source record, a Tend story version, memory, conversation history and a business projection are not interchangeable copies of one truth.

For any claim used in a decision or external assertion, the preserved semantics must let a reviewer recover what was claimed and about which subject/scope, who or what reported it, when it was observed, any source revision/event available, how source authority and access applied, whether it was verified/current/stale/conflicting, and which story decision or action relied on it. These are questions the record must be able to answer, not a prescribed field list, storage layout or demand to copy the entire source payload. Exact representation remains open.

## Affected interactions

1. **Gather → evaluate → commit:** identify the ask and responsible source before retrieval; check authority, access and decision-relative currentness; return a claim/evidence result; commit only the interpretation and coordination change justified by that result. A pointer and timestamp help preserve source linkage but do not alone establish truth or sufficient currentness.
2. **New information → new story version:** preserve the earlier claim and situation version; add the new observation with provenance; mark affected claims confirmed, corrected, stale, superseded or conflicting; re-evaluate only the affected conclusions and work. Correction updates current understanding; it does not rewrite what was known or communicated before.
3. **Story → external communication:** customer- and partner-facing factual claims come from committed situation state and evidence references, are qualified when stale/uncertain, and are filtered by recipient permissions. External actors receive situation-level updates, not raw tool traces or every internal source detail.
4. **Story trace → memory / product improvement:** async observation does not block story commit. Business-memory candidates remain scoped and advisory; configuration candidates use the deterministic apply path; product-improvement traces remain separate. Redaction, tenant scope and consumer-specific allowlists apply before fan-out.
5. **Story → business view / reconstruction:** owner views derive from the situation graph and can lag; the view does not become the record that future decisions trust. Explain-on-demand can join the relevant story version and preserved trace, subject to role access.
6. **Information lifecycle → correction / deletion:** any data copied or derived into memory, projections, indexes, caches, logs, traces, queues or provider calls remains within the relevant access, minimization and deletion obligations. Existing sources do not settle retention periods or the exact reconciliation between trace preservation and recursive deletion.

## U1–U5 stress test

### U1 — Priya reply before nurture timer; business-directed outreach

- The owner’s list/instruction is the source of a bounded work assignment, not a standing policy. Contact/profile details retain their business-source ownership; a reply is a new channel-originated observation/claim. Each person has a separate situation; the assignment aggregate is derived and does not replace those situations.
- The inbound reply and nurture-wait supersession commit together in the new B-Story version. The timer later re-reads that version and no-ops. A reply is not flattened into a profile fact, nor is an owner aggregate treated as a competing “current state.”
- Prior situations can inform the selected person’s context only through relevance, scope and access. Memory cannot turn this one list instruction, an individual response or a past draft into general permission or business policy.
- **Failure signal:** stale nurture is sent, two contacts are merged into one operational truth, a derived assignment board becomes authoritative, or a prior conversation is used without a relevant link/need.

### U2 — Refund gateway silent

- The business/order system owns the order and policy; the payment provider owns its transaction status. Tend’s committed initiation identifier, “outcome unknown” state and recheck wait are coordination truth, not proof that money moved or settled.
- A later provider result is a new sourced observation and a new story version. It does not erase the initiation or unknown interval. The story blocks a second new refund initiation while the first outcome is unknown; a same-key resend is distinct from a new initiation.
- A customer-facing answer may state only the committed, evidence-supported state. The action, provider response and situation history support reconstruction, but this scenario does not settle financial-data retention duration or which evidence must survive deletion.
- **Failure signal:** unknown becomes success/failure by inference; repeated initiation occurs; a memory item or cache substitutes for the current provider state; or a business view closes the refund before the ask has an evidence-backed ending.

### U3 — Investor asks for deck and revenue

- The deck/file layer and finance source or responsible person own different claims. A retrieved deck does not establish revenue; a missing revenue source does not invalidate the deck. The asks retain independent evidence, authority and completion states.
- Fetch-time approval gates the file bytes; approval is not evidence that the file’s contents are true or permission to disclose every related record. Revenue remains open/human work until its own acceptable evidence arrives. A partial response can send the approved deck and a bounded, situation-true line about revenue still being gathered.
- The reconstruction must explain which artifact was fetched, which claim it supported, what approval was required, and what remained open, without turning raw tool traces into investor-facing content. The owner snapshot is a derived view of this work.
- **Failure signal:** source/provenance collapses across asks; an unapproved or unrelated finance record is disclosed; a draft or mere fetch is reported as sent; or the aggregate marks the situation complete while revenue is unresolved.

### U4 — Stale or unavailable carrier tracking

- The carrier owns its tracking record and delivery operation; the customer is authoritative about their own report/experience; the business owns its customer relationship and promise; Tend owns the coordination of their unresolved delivery situation. None owns the whole meaning of “where is the parcel?”
- A carrier status is represented as a claim from that source at an observation time, not as unqualified present physical reality. Currentness depends on the question, expected progress, source behaviour, deadlines/commitments and consequence—not on record age alone or source authority alone.
- Keep three states distinct: a registered source that is down/unusable (wait or failure according to the configured bound); a source that responds with an answer too stale for the decision (degraded/stale claim and possibly investigation); and no system or person that can serve the ask (U5 capability-absent). Do not turn one into another.
- A newer partner, carrier or customer report adds evidence and may correct or conflict with an earlier claim; it does not silently delete the history. The owner view shows the wait, deadline, risk and next responsibility, not retry narration; partner payload is limited to the shipment and ask.
- **Failure signal:** location is guessed, stale data is emitted in present tense, “carrier down” is reported as “no shipping capability,” or the board’s lagging copy drives a customer promise.

### U5 — No shipping source; tenant isolation and poisoned source content

- If no system **and** no person can serve package location, capability-absent is recorded with evidence of the source/person check; if a person can serve it, create human work. A missing registry entry alone is not proof that nobody can answer. A down registered carrier is U4, not capability absence.
- A payment/refund result cannot answer package location. An empty-source outcome is not a failure, success, or adjacent-topic answer. The completion checker requires an explicit ending for each ask; a customer gets an honest limitation only after that state is committed.
- T-A denies a cross-tenant object read before a provider call or prompt exposure. T-B treats CRM/logistics text as untrusted data, not as instructions that can alter policy, grants or export behaviour. Provenance identifies where hostile or unverified text came from; it does not confer authority.
- Security evidence, memory and derived indexes remain tenant-scoped; secret material never enters prompt/log/trace. Tenant deletion is expected to leave no tenant files, keys, vectors or prompt logs, but exact propagation, exceptions and retention treatment for legally required audit material remain unresolved.
- **Failure signal:** cross-tenant data is retrieved or disclosed, source text changes control behaviour, capability absence is asserted without checking people, or deleted tenant information remains in a derived store or trace.

## Invariants

1. **Keep the dimensions of a claim separate.** Source (where a claim came from), owner (who maintains the record/operation), authority (who is trusted for this claim type), claimant/experience, permission (who may see or disclose), truth, currentness and Tend’s interpretation are distinct. Naming an owner does not prove a claim; being authoritative for one claim does not make a source universally authoritative.
2. **The source remains the canonical owner of its domain record.** Tend may retrieve, reference and represent evidence for coordination. It must not silently become a mirror/system of record for facts another system or actor owns. Any retained copy remains a derivative with its own provenance and lifecycle, not a new canonical fact.
3. **B-Story is the sole authority for Tend’s operational coordination truth.** Story truth is versioned and committed by B-Story; tools, membrane, memory and visibility do not directly write it. A story version can faithfully say “unknown,” “stale” or “conflicting” without resolving the underlying external reality.
4. **Do not flatten evidence layers.** Receipt/observation is not source correctness; a source claim is not a universal fact; an actor’s experience is a claim about that experience; interpretation is not a source assertion; derived situation state is Tend’s; model output is a proposal; decision/action are separate and traceable.
5. **Currentness is decision-relative.** Age is one signal among observation time, expected change/progress, source behaviour, deadlines, promises, conflict and decision consequence. Do not adopt one global TTL or treat a fresh response as necessarily sufficient for every action.
6. **Preserve conflict and correction history.** Never choose by arrival order, “system-ness,” plausibility or model confidence alone. Apply an explicit business/domain rule, obtain a correction/new evidence or ask an authorised person; otherwise preserve conflict and take only a policy-permitted bounded step. Later information creates a new complete situation version rather than rewriting what was previously known or said.
7. **Memory remains distinct, scoped and advisory.** A memory item carries enough provenance, scope, version/currentness, status and allowed-influence meaning to prevent it being mistaken for official knowledge. Memory may not rewrite source claims, situation history, business policy, grants, ownership, permissions, required approvals or source-of-truth responsibility. Semantic similarity proposes candidates; it does not establish identity or truth.
8. **History, learning, configuration, traces and projections are different information classes.** A message can be history without becoming reusable knowledge; an experience is not the lesson derived from it; a context projection is not the memory record; a configuration candidate is not an applied rule; a business projection is not a story write; a product-improvement trace is not business memory.
9. **Visibility and retrieval are purpose- and role-scoped.** Relevance does not grant authority to retrieve or disclose. A business/employee/partner/customer sees only the information required for its role and current purpose; per-tenant isolation and destination allowlists apply even when a claim exists in a source or memory store.
10. **Preserve explainability without assuming indefinite retention.** Important actions and claims must remain explainable/reconstructable under the applicable lifecycle and access rules. Customer-data deletion must reach Tend-controlled stores, logs, caches and model traces. No source here authorizes a universal retention period or resolves every audit/deletion exception.

## Failure and uncertainty model

| Condition | Required representation/handling | Unsafe collapse to reject |
|---|---|---|
| Source is available and authoritative for this claim, but its response may be old | Sourced claim plus decision-relative currentness assessment; refresh or qualify as required | “Authoritative” means always current |
| Source is stale, stuck or has stopped progressing | Mark stale/degraded or unknown with reason; use configured wait/investigation/failure path | A stale claim becomes current because it is the latest stored copy |
| Source path is down/unavailable | Distinguish provider/path failure from the claim’s truth; preserve prior claims and wait/retry/escalate within configured policy | Capability-absent or “no system can answer” |
| No system/person can serve the ask | Capability-absent with registry and people-check evidence; close that ask honestly without substituting another domain’s data | Tool registry empty, payment status, or model prior treated as proof |
| Two claims disagree | Preserve both, scope the conflict and affected actions; resolve under rule/evidence/human authority | Last-write-wins, system-wins or model-vote |
| Claim identity or scope is uncertain | Keep interpretation provisional/unresolved; avoid applying it to another person, object, tenant or process | Similar wording/embedding establishes identity |
| Memory conflicts with current source, rule or grant | Mark stale/conflicting/irrelevant for this decision; current authoritative source/configuration controls | Learned “usual practice” becomes policy or permission |
| Derived view lags B-Story | Treat it as a stale projection and refresh/drill into the situation baseline before acting | A dashboard/snapshot becomes a second truth or authorizes a send |
| Data is corrected, superseded or subject to deletion | Preserve the distinction between past understanding and current state; apply the relevant deletion obligations through derived copies | Rewrite history invisibly or keep every copy indefinitely |

Unknown, provisional, ambiguous, stale and conflicting are meaningful evidence states with reasons, not empty values and not a single numerical trust score. Their effect is action-specific: the same conflict may allow a bounded status message while blocking an irreversible refund or closure.

## Tensions and unresolved seams

1. **Source reference vs retained evidence.** A pointer to a mutable or deleted source reduces duplicate data but may no longer reconstruct what was relied on. A retained snapshot improves replay and explainability but creates a Tend-controlled derivative, access surface and deletion burden. The semantics require provenance and traceability; pointer-versus-snapshot policy is open.
2. **Trace/reconstruction vs recursive deletion.** Section 6 calls the security audit log append-only and Section 8 requires trace preservation for audit-classified runs; Compliance/Security requires deletion across stores, logs, caches and model traces and tests tenant deletion. The record classes, retention schedule, deletion propagation, lawful exceptions and any permitted non-identifying residue are not reconciled. Neither “keep everything forever” nor “erase every audit fact immediately” is established here.
3. **One operational story vs multiple source clocks.** B-Story must present a complete current coordination state while source systems, human reports and channels update independently. The story needs versioned claims and explicit uncertainty; it cannot promise an atomic global truth across those owners.
4. **Useful memory vs business ownership.** Tend can maintain and even automatically activate useful descriptive guidance, but the business owns official rules and may correct/reject/restrict learned knowledge. Promotion and review protocols beyond the must-not boundary remain provisional.
5. **Helpful owner snapshot vs projection freshness.** A derived aggregate reduces fragmented views and supports early attention, but asynchronous lag can show old state. It must remain inspectable and subordinate to the situation baseline; exact freshness cues and use restrictions need a contract.
6. **Minimization vs explanation/reuse.** Gathering should retrieve only information that can change the next safe step, and prompts/traces are allowlisted; audit, replay, future learning and correction may need links or evidence. The minimum retained content by purpose is not decided.
7. **Source authority vs accountability.** A provider can own its record while the business remains accountable for customer promises and response. Tend coordinates and records, but does not transfer accountability merely by citing the provider.

## Architectural consequence

Keep distinct, linked information lifecycles rather than centralizing them:

- Source systems and actors continue to own their canonical records, operational claims and experiences. Tend’s gathered representation remains a provenance-bearing claim/evidence reference, not a competing source record.
- B-Story remains the one versioned coordination spine. It records enough to say what Tend relied on and did, including unknowns, waits and changes, and is re-read before actions that depend on current story state.
- Business memory remains a separately scoped, versioned and advisory derivative. Its evidence, age, lifecycle and allowed influence must travel with it conceptually; exact representation remains open.
- B-Visibility remains a read-only, re-derivable projection. It may lag but must not be used as the authority for a decision, external communication or story completion.
- Communication history, raw traces, security audit, business memory, configuration registry and product-improvement data keep distinct purposes, access rules and lifecycle obligations. A content item may be referenced across them without making them the same record.
- Gathering, prompt assembly, explanation, export and fan-out apply least-necessary fields and tenant/role/destination controls at the point of use, not only at storage time.
- Retention and deletion policy must be expressed by information class and purpose and must reach derived copies. This dimension does not choose periods, prescribe a schema, or decide a legal exception.

No additional “provenance service,” universal hierarchy, global freshness score or all-purpose data lake is implied. The architectural consequence is explicit ownership, linkage, versioning, access and lifecycle across existing boundaries.

## Decisions and constraints by status

### Established / settled semantics

- Source, owner, authority, truth, experience and permission are separate concepts; authority is claim-specific and does not itself prove currentness.
- Canonical business facts remain with the relevant business systems/actors; canonical channel messages remain with platforms; Tend coordinates, records its own operation and preserves references/evidence.
- B-Story owns the versioned operational story. Raw tool I/O, chain-of-thought and unsent drafts are not story truth. B-Story commits are the sole operational-truth write path.
- Claims, assumptions, interpretations, derived state, proposals, decisions and actions remain distinguishable and traceable. Conflicts/corrections create new situation versions; they are not erased by a later value.
- Currentness is decision-relative, not a universal age cutoff. A source’s ownership or authority does not guarantee that its response is current enough.
- Memory is not conversation history, official policy, source-of-truth data, current situation state or a permission system. Learning cannot change policy, authority, source ownership, grants, approvals or irreversible-action boundaries.
- Business views are derived from the situation graph and drill down to the per-situation baseline; they do not replace it. Important trace is preserved for explain-on-demand; explanation need not be an always-visible chat wall.
- Retrieval and disclosure are distinct from ownership and relevance; tenant, role, source and destination restrictions apply. Secrets do not belong in prompts, logs, traces or memory.
- U1–U5 retain the established distinctions: one situation per list contact and timer re-read (U1); unknown refund blocks a new initiation (U2); independent evidence and partial fulfilment (U3); stale/unavailable carrier differs from absent capability (U4/U5); security gates deny cross-tenant reads and treat source text as untrusted input.

### Provisional cross-boundary constraints

- B-Memory’s observe/learn/promotion protocol beyond the established serve path and must-not rules; exact mechanics for claim-family reconciliation and automatic activation.
- B-Visibility’s refresh, freshness signalling, projection lineage and rules preventing a stale aggregate from being mistaken for current story state.
- The exact selection/representation of evidence retained in a story version and the trace fields/consumer allowlists. Preservation is required; field names and implementations are provisional.
- The operational contract joining provenance, currentness, memory status and decision-specific evidence sufficiency at every downstream consumer.
- The way audit reconstruction works when a source record is unavailable, corrected or deleted, without retaining excess personal data.

### Open questions

- Which exact claim/provenance/currentness fields or references are persisted for each class of source result? This record states semantic obligations only and does not prescribe a schema.
- What is the retention and deletion rule for channel history, gathered claims/evidence, situation versions, human-work artifacts, raw traces, security audit logs, memory items, embeddings/indexes, projections, caches, backups, queues and subprocessors? How do tenant deletion, subject deletion and legally required audit/replay interact?
- When a source changes or deletes a record, which evidence is kept as a reference, immutable snapshot, redacted derivative or deletion marker, and how is that choice explained? No pointer/snapshot rule is selected.
- What is the source-specific freshness/currentness rule for each decision class, and how are source revision, expected dwell, service promise and business deadline combined? No universal TTL is selected.
- What is the final claim-family identity and reconciliation contract when two similar items differ in subject, process, condition or time? Section 6 Q8 leaves the exact schema open.
- What role-scoped aggregate joins and freshness cues are needed for the owner’s person/journey view? Section 6 Q6 and the Business View material leave implementation/presentation details open.
- What records may be used for automatic learning or product improvement after data-subject or tenant deletion, and what eligibility/retention evidence is required from downstream providers? Existing rules establish separation and redaction, not the complete lifecycle contract.

## Rejected alternatives

- **One universal “source of truth” hierarchy:** rejected because authority, ownership and source location are claim- and domain-specific; equally authoritative claims may conflict and require explicit policy or human resolution.
- **Tend mirrors every connected system and becomes canonical:** rejected by Level 1 and the responsibility/boundary model; it duplicates ownership, creates stale facts and obscures who corrects the underlying record.
- **Latest arrival wins / system beats person / model chooses the plausible claim:** rejected because arrival order, automation and plausibility do not establish source authority or truth.
- **Treat B-Story as a universal business database:** rejected. It is authoritative for Tend’s operational coordination state, not for external canonical order/payment/tracking/message facts.
- **Merge claims, message history, experience, memory, policy, traces and views into one undifferentiated record:** rejected because each has a different owner, purpose, authority, access and lifecycle; merging creates duplicate truth and permission confusion.
- **Allow memory or retrieved conversation to rewrite current facts, grants or policy:** rejected; memory is advisory and old situations are not the rule book.
- **Use an aggregate dashboard, cache or memory projection as the second operational truth:** rejected; derived views are read-only, and current decisions return to the committed situation and required source.
- **Use one numeric confidence/freshness score or a global TTL for all information:** rejected; uncertainty and currentness have reasons and depend on claim, process and decision consequence.
- **Assume “preserve all traces indefinitely” or “delete all history without regard to audit/reconstruction”:** neither is selected. Both erase one of the established constraints; the retention/deletion tension remains open for explicit governance and architecture.
- **Treat an empty tool catalogue as proof no person can answer, or treat a down source as capability absence:** rejected by U4/U5 and D8/O10.

## Trade-offs

| Choice / constraint | Benefit | Cost or risk retained |
|---|---|---|
| Keep source claims linked to the source and preserve Tend’s coordination story separately | Clear correction authority; less duplicate canonical truth; honest current state | Source access may later disappear; link-only evidence may weaken reconstruction |
| Preserve claim/version history instead of overwriting | Explainable past decisions and corrections; race-safe re-evaluation | More retained data and a harder deletion/minimization problem |
| Maintain separate memory and current evidence | Reuse without letting historical patterns masquerade as live facts or policy | Retrieval and reconciliation must reject stale or out-of-scope memory |
| Derive owner views asynchronously | Read-heavy views do not block story correctness; view model can evolve independently | Owner can see a lagging projection unless freshness and drill-down are clear |
| Keep useful trace for audits, replay and learning while minimizing/redacting fan-out | Accountability and safer improvement without exposing secrets or whole source rows | Redaction, per-consumer eligibility and deletion across downstream copies are harder |
| Apply decision-relative currentness rather than a global age rule | Fits payments, delivery, policy and vocabulary to their different change rates | Requires explicit process/decision context; “recent” cannot be a universal shortcut |

## Evaluation signals

- For every customer-facing factual assertion in U1–U5, a reviewer can trace the assertion to the committed claim/evidence and identify its source, scope, currentness and any qualification; the completion checker catches claims without evidence references.
- U1’s reply cancels/supersedes nurture from the current B-Story version; separate contacts and linked histories remain separate; the owner aggregate can be rebuilt without becoming a write source.
- U2 never creates a second new refund while outcome is unknown; a later gateway claim changes the next version without erasing initiation history or inferring settlement.
- U3 can send the approved deck while revenue remains open, and can reconstruct which source supports each ask; no unrelated file, row or finance claim leaks into the response.
- U4 distinguishes stale-but-available, unavailable/down, conflicting and current-enough states; stale evidence never becomes an unqualified present-tense fact, and no customer-facing assertion is based solely on a lagging projection.
- U5 denies cross-tenant reads before provider/prompt exposure; poisoned source text cannot alter grants or trigger export; capability absence requires both source and person checks; no secrets appear in prompts, logs, traces or memory.
- Memory retrieval filters tenant, role, process, status, scope and allowed influence before ranking; current source/policy wins; replay finds no increase in stale-memory use, authority conflict or unsafe action after learning.
- A projection can be traced back to its situation source and stale projections never authorize action or completion. Projection lag does not block B-Story writes.
- Tenant/subject deletion tests account for every Tend-controlled derivative named by Compliance/Security (including stores, logs, caches, model traces and vectors); residual audit/replay data, if any, is explicitly explained and authorized rather than accidental.
- Retrieval and prompt/fan-out checks demonstrate purpose limitation: unrelated history and whole source rows are not loaded merely because they are available or semantically similar.

## Revisit conditions

- A new integration, actor or legal/contractual role changes who owns a record, which claim is authoritative, or where the canonical record lives.
- A new business decision depends on a memory item, stale source, projection or retained trace in a way not covered by the current evidence/currentness gates.
- Any boundary begins writing or treating as authoritative a source copy, memory item, cache, projection, model proposal or trace.
- Business memory is shared across tenants, used to infer authority, or used to activate configuration without deterministic business apply.
- Trace preservation, audit obligations, data-subject rights, tenant deletion, subprocessors or model-provider retention requirements change or conflict in a concrete deployment.
- A source cannot be re-read after correction/deletion and replay tests show that pointer-only evidence is insufficient, or materialized evidence creates unacceptable privacy/deletion exposure.
- Owner views drive actions, conceal their lag, or cannot drill into a current per-situation baseline.
- U1–U5 reveal a factual communication without provenance, incorrect source-owner attribution, claim collapse, duplicate truth, cross-tenant exposure, or retention/deletion residue.

## Evidence paths and sections

### Method and product framing

- `knowledge_base/three_level_framework/architecture_contruction.md` — §9.3 “The Dimension Model”; §9.4 “Dimension Construction Procedure”.
- `knowledge_base/Product_Vision.md` — §1 “What is Tend?”; §4 “What Tend does differently”; §6 “The principles behind Tend” (Understand before acting, Never guess, Use facts before opinions, Artifacts, explainability and traceability, Fail safely, Learn); §7, “Tend is not the owner of the business”.
- `knowledge_base/Level1_Problem_Framing_or_Expansion.md` — §2 assumptions (Information is distributed; No single source always has the complete picture; Business knowledge changes over time; incomplete/conflicting information); §5 responsibilities; §6 “Tend retrieves information from a business system” and “Tend updates a business system”; §7 “What belongs to Tend” / “What does not belong to Tend”; §8 “Product Invariants” (including no ownership of another system’s information, traceability, no guessing).

### Established architecture and settled page

- `knowledge_base/architecture/section_6_responsibility_model.md` — §6.4 Groups D, E, N and O; §6.5 “What Tend does not own”; §6.6 U1–U5; §6.9 “State ownership”; §6.10 Q6 (derived person-view join) and Q8 (claim-family schema).
- `knowledge_base/architecture/section_7_boundary_model.md` — §7.3 “Operational truth in the situation model”; §7.12.1 B-Story; §7.12.2 B-Membrane; §7.12.3 B-Memory; §7.12.4 B-Visibility; §7.12.6 Adjacent-Improvement; §7.12.8 IB contracts and artifact classes; §7.13.2 edge catalog.
- `knowledge_base/architecture/section_8_interaction_model.md` — §8.9 write ownership and atomic moves; §8.12 capability invoke/structured evidence/fetch approval; §8.14.1–§8.14.6 derive, memory serve/learn, configuration, improvement and redaction; §8.15.1 trace preservation; §8.15.4 completion evidence checks; §8.16.1–§8.16.5 U1–U5; §8.17 anti-patterns.
- `knowledge_base/architecture/what_is_already_settled.md` — “What learning may change”; “Permission”; “What a sentence can do”; “A carrier that is down, and a business that cannot ship”; “Leave these closed”; “Leave these open” (including exact memory-projection fields, screen layout and unset reminder/routing details).
- `knowledge_base/architecture/how_tend_finds_the_right_situation.md` — “Agreed on 3 October 2026”; “How the parts work together”; decisions 1–10 (especially settings vs situations, owner list fan-out, cross-tenant isolation and background notes); “What ‘memory and knowledge’ is”; “If you only remember one page”.

### Level 2 — Gathering Information

- `knowledge_base/Level 2/gathering_information/how_do_we_know_which_actor_owns_each_piece_of_information.md` — “Ownership is not the same as source or truth”; “A logistics example”; “Permission to see information is a separate question”; “How Gathering uses ownership”; “Our working decision”.
- `knowledge_base/Level 2/gathering_information/how_do_we_discover_where_information_lives.md` — “A source map is more useful than one universal hierarchy”; “Location is different from retrieval priority”; “Previous messages and situation versions”; “What happens when a preferred location is unavailable”; “Our working decision”.
- `knowledge_base/Level 2/gathering_information/how_do_we_know_when_information_is_sufficiently_current.md` — “A provisional currentness rule”; “Source responsibility does not remove uncertainty”; “Currentness is decision-relative”; “Our working decision”.
- `knowledge_base/Level 2/gathering_information/how_do_we_handle_information_that_changes_while_a_situation_is_being_analysed.md` — “Same situation, new version”; “Changes to source records and claims”; “Our working decision”.
- `knowledge_base/Level 2/gathering_information/how_do_we_handle_information_that_arrives_gradually.md` — “Partial progress and continued gathering happen together”; “The situation remains open”; “Our working decision”.
- `knowledge_base/Level 2/gathering_information/how_do_we_avoid_retrieving_unnecessary_information.md` — “Relevance and authorisation are different”; “Necessary but unauthorised information”; “What we deliberately reject”; “Our working decision”.

### Level 2 — Trust and Evidence

- `knowledge_base/Level 2/trust_and_evidence/how_do_we_distinguish_facts_from_assumptions.md` — “The layers of information”; “Known does not mean universal truth”; “Corrections and versioning”; “Working decision”.
- `knowledge_base/Level 2/trust_and_evidence/what_makes_one_source_more_authoritative_than_another.md` — “Working definition”; “Authority is not enough by itself”; “Authority and permission are separate”; “Authority and source are separate”; “Working decision”.
- `knowledge_base/Level 2/trust_and_evidence/how_do_we_compare_information_from_different_sources.md` — “Canonical claims”; “Comparison order”; comparison outcomes; “What comparison does not do”; “Working decision”.
- `knowledge_base/Level 2/trust_and_evidence/how_do_we_resolve_conflicts.md` — “Possible resolution paths”; “Resolution order”; “Conflicting authoritative sources”; “Versioning and correction”; “Working decision”.
- `knowledge_base/Level 2/trust_and_evidence/how_do_we_determine_whether_information_should_be_trusted.md` — “Evidence state and reason”; “What the reasoning model receives”; “Working decision”.

### Level 2 — Memory, Authority, Business View, Compliance/Security

- `knowledge_base/Level 2/memory_and_knowledge/who_owns_business_knowledge.md` — “The business owns official knowledge”; “Tend owns its experience of operating”; “Who may correct learned memory”; “Working decision”.
- `knowledge_base/Level 2/memory_and_knowledge/what_belongs_in_long_term_business_knowledge.md` — reusable knowledge classes; “Descriptive is not normative”; “Scope is part of the knowledge”; “Working decision”.
- `knowledge_base/Level 2/memory_and_knowledge/what_belongs_in_conversation_history.md` — conversation as communication record; platform remains message owner; message history vs reusable knowledge; corrections do not rewrite history.
- `knowledge_base/Level 2/memory_and_knowledge/what_should_never_become_memory.md` — “History and reusable memory are different”; “Untrusted instructions”; “Working decision”.
- `knowledge_base/Level 2/memory_and_knowledge/what_should_tend_remember.md` — future operational value; traceable evidence, scope, time, status and allowed influence.
- `knowledge_base/Level 2/memory_and_knowledge/how_should_memory_be_stored_conceptually.md` — “This is not a Level 3 database decision”; structured core; experience vs derived memory vs context projection; working decision.
- `knowledge_base/Level 2/memory_and_knowledge/how_should_memory_be_scoped_between_businesses.md` — default tenant boundary and narrower scopes.
- `knowledge_base/Level 2/memory_and_knowledge/how_should_memory_be_retrieved.md` — hard filters before candidate ranking; retrieval and authority; working decision.
- `knowledge_base/Level 2/memory_and_knowledge/how_should_previous_conversations_influence_future_decisions.md` — explicit relevance/scope/currentness; current evidence over historical memory.
- `knowledge_base/Level 2/memory_and_knowledge/how_do_we_update_knowledge_when_reality_changes.md` — updating does not mean rewriting; reality vs Tend’s learning.
- `knowledge_base/Level 2/memory_and_knowledge/how_do_we_prevent_outdated_knowledge_from_influencing_new_decisions.md` — outdated memory vs deleted history; decision-relative currentness; no universal memory expiry.
- `knowledge_base/Level 2/memory_and_knowledge/how_should_new_learning_be_reconciled_and_versioned.md` — structured claim-family identity; finite update operations; evidence/currentness separation.
- `knowledge_base/Level 2/memory_and_knowledge/how_do_we_evaluate_automatic_learning.md` — replay/regression and reversible learning.
- `knowledge_base/Level 2/authority_and_ownership/which_actor_owns_each_type_of_information.md` — owner/source/authority/permission distinction; no universal source ranking.
- `knowledge_base/Level 2/authority_and_ownership/who_may_grant_authority_and_what_comes_by_default.md` — direct owner instruction and grant scope; source material does not itself grant authority.
- `knowledge_base/Level 2/authority_and_ownership/how_does_a_grant_end_and_how_does_role_change_affect_authority.md` — traceable grant lifecycle and authority at action time.
- `knowledge_base/Level 2/business_view_and_observation/what_information_should_the_business_always_be_able_to_see.md` — per-situation visibility baseline reused by Business View.
- `knowledge_base/Level 2/business_view_and_observation/what_should_the_business_owner_see_in_a_snapshot_of_the_business_journey.md` — graph-derived aggregate, drill-down and “never a second source of truth.”
- `knowledge_base/Level 2/business_view_and_observation/which_events_should_require_the_owners_attention.md` — owner-risking deadlines, delegated work, and deterministic risk conditions.
- `knowledge_base/Level 2/compliance_and_security/what_are_the_compliances_of_each_actor_and_tech_stack.md` — customer deletion/export; recursive deletion across stores/logs/caches/model traces; source-system ownership; least scope and data minimization.
- `knowledge_base/Level 2/compliance_and_security/how_do_we_make_a_software_product_secure.md` — deterministic data/tenant/prompt/memory controls; field allowlists; T-A/T-B cases; tenant deletion test for files, keys, vectors and prompt logs.
- `knowledge_base/Level 2/compliance_and_security/the_security_audit_framework.md` — secret-free trace/log invariant and audit obligations.

## Subagent conclusion

**Dimension 9 passes at the semantic boundary level, with a material retention/deletion seam still open.** Sections 6–8 already establish the crucial separation: source-owned facts remain external; B-Story owns Tend’s coordination truth; B-Memory owns advisory derivatives; B-Visibility owns read-only projections; traces and channel history serve distinct purposes. The stress test does not require a new canonical boundary or a data schema. It does require Section 9/10 synthesis to preserve those distinctions and explicitly carry forward the unresolved reconciliation of trace/reconstruction, data minimization and recursive deletion. No generic TTL, indefinite-retention rule, or pointer-versus-snapshot policy is justified by the inspected evidence.
