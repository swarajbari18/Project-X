# Status quo: what the knowledge base already decides about memory (28 Oct 2026)

## Reusable as is (Level 2 working decisions, consistent with architecture)
1. Learning boundary: Tend learns to perform better for a business; never redefines what the business may do.
2. Memory is typed: experience, learned memory, context projection kept apart.
3. Retrieval order: hard filters → candidates → conflicts and ranking → projection for the step.
4. Similarity proposes candidates; it never decides identity, supersession, truth.
5. Updates append or version; nothing silently overwritten.
6. Currentness is decision-relative; no universal expiry score.
7. Never-memory list; untrusted text never becomes instruction.
8. Business isolation: separate store per business; never cross.
9. Learning modes: off / automatic (default) / each lesson checked; integrity checks always.
10. Memory suggests settings; the configurator decides; tools apply.
11. Settings are not lessons.
12. Business owns official knowledge; Tend owns its experience.
13. Traces separate from learning; learning-off keeps traces.
14. Four text layers; memory owns step instructions, skill text, slice scaffolding; places preferences; optimizer edits memory text only.
15. Routing uses summaries of open situations; closed only on explicit reference; understanding uses the routed situation in full.
16. Learning evaluated by replay and counts, reversible.
17. Tenant isolation invariant with release tests (a planted similar record from another business must never return).

## Gaps (nothing decided at Level 2)
- G1 who may correct or retire learned items (architecture only: owner and configurator).
- G2 operations allowed per memory type.
- G3 promoting a lesson beyond advice.
- G4 who assembles the routing bundle; whether memory acts unasked.
- G5 whether learned procedures are pinned at situation open.
- G6 memory unavailable (architecture only, 22 Oct).
- G7 business documents as memory content.
- G8 memory observing setup sessions.
- G9 whether memory reads across the business, and for whom.
- G10 cross-business lesson transfer governance.
- G11 training from traces.
- G12 "vocabulary" name collision.
- Plus (engineering facts): no Tend-internal person ID or customer contact record defined.

## Tensions
- T1 proactive (Swaraj, harness 11.2.1) vs on request (Section 8, Section 12 build view). Core of this work.
- T2 who writes a link (worker accepts, 9 Oct) vs memory handles linking (Swaraj 26 Oct).
- T3 similarity in ranking vs no model scores in control.
- T4 policy pinning vs the refund-setting exception (Level 2 out of date).
- T5 status: 18 memory files "pending review" vs Section 12 treats them as Decided.
- T8 cached context slices (minutes to hours) vs "always the latest known state".
- T9 cross-business training data contradictions.
- T10 self-correction: Swaraj "easy by audit" vs Level 2 "needs external signal".
- T11 memory owns person identity facts (journey) vs learning must not touch identity (architecture).
- T12 documents linked to business memory vs Tend never owns other systems' information.
- T13 six dangling pointers to the discarded 26/27 Oct page.
- T14 Level 1 unknown "what should be remembered" is stale.

## The ten Level 1 memory questions (already answered by Level 2 working decisions, pending review)
What should Tend remember? What should never become memory? What belongs in conversation history? What belongs in long-term business knowledge? How should previous conversations influence future decisions? How do we prevent outdated knowledge from influencing new decisions? How do we update knowledge when reality changes? Who owns business knowledge? Can Tend learn automatically? What kind of learning is acceptable?

Observation: all ten are about WHAT memory holds. None is about HOW memory takes part in Tend's work: when it acts, what it presents, to whom, by what mechanism. That is the missing half, and it is what Swaraj has been describing since September.
