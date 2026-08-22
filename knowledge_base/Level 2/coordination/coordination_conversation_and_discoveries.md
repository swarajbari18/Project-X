# Conversation with Swaraj about Coordination and Time

## Why this document exists

This is a conversation record, not a formal specification.

It preserves how we understood Coordination and Time together, why we treated them as one batch, where the earlier categories left strands for them, and which parts are still provisional.

The two categories share one spine: waiting. We worked them in one thread so the shared idea would not be written twice in two different ways. This file is the record of that thread.

## Why Coordination and Time were tackled together

The Level 1 backlog lists them as separate sections.

Coordination asks how independent actors work together, how long-running work stays alive, how waiting and blocked work are represented, how multiple business processes interact, how duplicated work is prevented, and how interrupted work recovers.

Time asks how Tend reacts when time changes the situation, how deadlines influence decisions, how scheduled work begins, how waiting is represented, when waiting ends automatically, and how forgotten work is rediscovered.

Reading them side by side exposed one shared question that both lists keep brushing against:

> What is a wait, concretely?

Both lists use the word waiting. The work loaded into one model:

- Coordination is the bookkeeping of work that is spread across actors and time.
- Time is how the world changes without any actor doing anything, and what Tend does about it.

They are the two faces of one spine: the situation that continues to exist after the current interaction ends.

## Swaraj's raw thought that started this

Swaraj described an example.

Tend contacts an external agent of a business partner. The partner processes for some time and returns a result. The response time is unpredictable: one second, ten minutes, two days. It is a factor of x, an unknown unknown.

While that call is pending, the tool that made the call is waiting. The surrounding system keeps doing its own thing if it wants. The thing we contacted may be an LLM agent, a human, or any third party.

For a call with a known bounded response — "we are sure this business operation answers within ten minutes or so" — the tool can poll or wait for an event to come back. For an open-ended wait, something has to decide how long is acceptable.

The customer cannot be held in that open window. After a cutoff — Swaraj used a five-minute example — Tend sends an interim message:

> This is what we found so far. We are still waiting on these people. When they come back, we will reach out with the latest information.

The situation is still active after that message. The tools are still waiting. When they return, the conversation re-creates, the loop re-runs, and the customer receives the complete result.

Swaraj also distinguished the bounded case. For tools where the response time is a fixed integer, "we just call and receive the answer then and there." He was not sure whether that is a different kind of waiting, and said waiting is really for things where we do not know the response time.

He hypothesised that we might have to separate the tool layer from the agent layer entirely, so that all this waiting is controlled in dedicated compute and storage rather than in the agent instance. When the target is third parties, "agents" exist as a standardized tool list for developer convenience. But when we build our own tools, each tool may need to be its own service with its own compute and time handling, because an agent is not just an LLM.

Our philosophy is the inverse of the usual agentic engineering. Most people build a harness around an LLM. We build the whole software system, and the LLM is one part of it.

## What I got wrong, and the corrections

### Correction 1: "fixed-time calls don't wait" is the wrong axis

Every call waits, even a fast one. A 200ms API call is a wait; it is just a wait you cannot see, that resolves inside the current interaction, and whose failure path is a plain "error."

The real boundary is not "does it wait." It is:

> Does the wait outlive the current interaction with the customer?

- Result within the interaction: the wait is invisible. The loop suspends, the answer comes back, the reply goes out. Timeout is an error.
- Result beyond the interaction: the wait becomes visible state. The customer is released with a message, the situation stays active, and something must later wake it.

So the question is not "does this tool need waiting." It is: when this operation outlives the conversation, what represents it, and what wakes it?

### Correction 2: "needing a wait" is not a property of the tool

Using the same logistics partner, two calls:

- a status lookup that answers in 200ms;
- and "investigate why this is stuck for seven days," which answers in three days or never.

Same tool, different invocation. Whether a real wait is required is decided per call, from the tool contract plus the current situation. We cannot pre-sort tools into "waits" and "doesn't wait."

### Correction 3: you do not resume when all tools respond; you resume when enough has arrived

Swaraj corrected my original example.

We do not call the logistics partner and the order DB in parallel. There is a hierarchy of the truth: if the logistics partner's API is closer to the source of truth and authority for this question, we call the logistics partner first and fall back to the DB only if that fails. This is the source-authority idea from Trust and Evidence applied to gathering. Where a better authority exists, we deprioritize the human in the loop.

The corrected rule: the loop resumes when enough has arrived — and "enough" is defined by the authority hierarchy. If the partner answers, we may stop waiting even if other calls are still open, because the result we were actually waiting for arrived.

### Correction 4: the three states

Swaraj corrected my initial draft of active, waiting, blocked.

- Running: the situation is doing something right now — reasoning, deciding, gathering. Alive.
- Waiting: active, but suspended. We told the customer we are waiting on a tool, a third party, or an escalation.
- Blocked: active, but the escalation framework is spent. There is no path to escalate, no way to solve, no safe next step.
- Completed: resolved and closed. Information sent to the customer, then closed.

So "blocked" is not a fourth wait kind. It is a state a situation can be in after escalation options are exhausted, and it must not sit silently — the system decides: block-and-surface, or stop safely within policy.

### Correction 5: completion is closure, and closure is permanent

Swaraj used a Kanban board. A situation is one card, one story. Once closed, we do not reopen that card.

If something sits on top of a closed card, six months later, we reference the closed card and open a new situation. When we engineer context, we build that graph and make that connection.

The knowledge base already contains this. A new problem creates a new situation, optionally linked to the old one. The same unfinished problem that was resolved too early or regressed is reopened, which is really a correction of a wrongful closure. "Answered is not a situation status; resolved is operational closure." We recorded this reconciliation in [how_do_we_recover_interrupted_work.md](how_do_we_recover_interrupted_work.md) so the two readings cannot drift apart.

### Correction 6: the "duplicated work" question was largely a misunderstanding

I wanted to make the question "How do we prevent duplicated work?" real. Swaraj pushed back: situation models are already separate stories, linked in a graph, so why would duplication of work even happen while coordinating?

Thinking it through showed:

- Two employees both taking the same work item is already prevented by Human Collaboration (one responsible owner per work item).
- A retry of the same call is answered by Failure's retry, dedupe and backoff rules.
- "Which source do we ask" is the authority hierarchy, not duplication.

The structural guards are: one situation = one story; authority-first ordering; one owner; and the wait-registry check — before creating a wait, see whether an identical wait (same subject + kind + purpose) is already open, and attach to it.

So the question is answered as: structure prevents duplication; the registry guard handles the identical-wait and re-entry edge. The full reasoning is in [how_do_we_prevent_duplicated_work.md](how_do_we_prevent_duplicated_work.md).

## What the earlier categories quietly left for this one

- The situation model is Tend's coordination record for one operational problem ([relationship_between_understanding_and_gathering_information.md](../gathering_information/relationship_between_understanding_and_gathering_information.md)).
- The journey is a graph of situation models, with context edges and journey edges ([how_do_we_determine_which_information_is_relevant_to_the_current_situation_and_which_information_should_be_ignored.md](../understanding_the_situation/how_do_we_determine_which_information_is_relevant_to_the_current_situation_and_which_information_should_be_ignored.md)).
- Decision Making separates the decision intention ("wait") from the operational state ("waiting"), and gives deterministic system behaviour the job of timers, watchers, timeouts and state management ([understanding_all_decision_making_questions.md](../decision_making/understanding_all_decision_making_questions.md)).
- Human Collaboration owns escalation, routing, and ownership of ongoing work ([understanding_all_human_collaboration_questions.md](../human_collaboration/understanding_all_human_collaboration_questions.md)).
- Trust and Evidence supplies source authority, which made the corrected hierarchy-of-truth example possible ([understanding_all_trust_and_evidence_questions.md](../trust_and_evidence/understanding_all_trust_and_evidence_questions.md)).

## What the external product research showed

Three product sources describe the same wait-and-SLA pattern:

- Zendesk SLA targets can be active, paused, breached, or closed; a pending ticket pauses the requester-wait-time target. Zendesk distinguishes response SLA (when you first reply) from resolution SLA (when the thing is fully solved). This gave us the response-promise versus resolution-promise separation.
- Zoho's On Hold state is built explicitly for "waiting on a third party" — timers freeze and escalations stop while on hold.
- Raiseaticket describes the same pause-on-pending pattern.

Research references:
- Zendesk: https://support.zendesk.com/hc/en-us/articles/4408832852122-Viewing-and-understanding-SLA-targets
- Zoho On Hold: https://help.zoho.com/portal/en/kb/desk/ticket-management/ticket-status/articles/understanding-the-onhold-ticket-state
- Raiseaticket: https://help.raiseaticket.com/faq/how-do-i-pause-or-stop-the-sla-timer-on-a-ticket
- Our own escalation research: [escalation_sla.md](../../research/escalation_sla.md)
- Our own business-journey waits: [business_journeys_map.md](../../research/business_journeys_map.md)

### The caution we drew from that research

These tools pause the escalation machine entirely while waiting. For us, that is wrong when the wait is internal. If the customer is already released with a note and the partner never answers, we do not want to wait silently forever. The escalation stays alive on the internal clock with its own deadlines and reminders. The customer-facing clock pauses; the internal clock does not.

## Working decisions (detailed in the question documents)

- A wait is a decision to suspend a situation because the next safe step needs something we do not yet have.
- There are three levels: the tool/operation wait, the situation wait, and the time/scheduled wait.
- There are three kinds of wait subject: wait-for-actor, wait-for-state-change (watch), and wait-for-context (time). We found no fourth kind.
- The canonical spine lives in [how_do_we_represent_work_that_is_waiting.md](how_do_we_represent_work_that_is_waiting.md). The Time category references it from [how_should_waiting_be_represented.md](../time/how_should_waiting_be_represented.md).
- Coordination is the bookkeeping of the book of waits. Time is the computation of when those waits fire.

## What remains provisional

- The default check-in values for the situation-level loop are business configuration, not universal constants.
- The default timeout for each tool connector is Level 3 / later research.
- Whether "watch" needs its own durable watcher records or reuses the wait record is still open.
- The release policy is configurable per business, with product defaults.