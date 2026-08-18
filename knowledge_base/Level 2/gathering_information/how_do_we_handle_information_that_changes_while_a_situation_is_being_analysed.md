# How do we handle information that changes while a situation is being analysed?

## Where this document comes from

This document records our conversation about the eighth Gathering Information question.

The question asks what happens when information gathered earlier becomes outdated, corrected, replaced or contradicted while the situation is still open.

This is connected to Question 7. Question 7 deals with information that has not arrived yet. Question 8 deals with information that has arrived but changes before the situation is finished.

## The initial confusion

The question was initially phrased as though Tend had to choose between:

- filling in a missing field; or
- creating a new situation model and re-evaluating everything.

That framing was not clear enough.

The important answer was already present in the earlier work:

> A meaningful change creates a new complete version of the existing situation model. It does not normally create a completely new situation.

## Same situation, new version

The situation model is a record of one operational problem and the current understanding of that problem.

When a new claim changes that understanding, Tend should:

- preserve the earlier claim and earlier situation version;
- add the new observation with its provenance;
- create a new complete situation-model version;
- mark which earlier claims are stale, corrected, confirmed or in conflict;
- re-evaluate the conclusions and remaining requirements;
- update pending work, watches or escalation;
- and determine whether communication or action is now needed.

The earlier version remains important because it tells us what was understood and communicated at that time. The new version tells us what is understood now.

## The GitHub issue and Kanban analogy

The conversation compared this to a feature being implemented in a GitHub issue or Kanban card.

If a bug is found while implementing that feature, it may still belong to the same story and be solved within the same work. The new discovery changes the current state of the story, but it does not automatically create an unrelated story.

This analogy is useful because it shows why a new observation does not automatically mean a new situation.

The stronger boundary is not simply whether the events are part of the same narrative. A change remains in the same situation when it concerns the same operational problem and resolution path.

A linked situation may be needed when the new event creates:

- a different operational problem;
- a different owner or responsible team;
- a different policy or approval path;
- or a separate resolution process that must be tracked independently.

Relatedness alone is not enough to decide that two problems are one situation.

## The refund example

Suppose:

1. The customer asks for a refund.
2. The payment provider says the refund was initiated.
3. Tend tells the customer that settlement is still pending.
4. Tend creates a monitoring responsibility.
5. The provider later reports that the refund failed.

The failure is not inserted by overwriting “initiated.” The new claim is added and a new complete situation-model version is created.

The new version should show:

- the original customer request;
- the earlier initiation claim;
- the previous customer communication;
- the later failure claim;
- the conflict or state transition between them;
- and the current information and action requirements.

Tend then re-evaluates the situation. It may need to:

- cancel or change the monitoring responsibility;
- ask an employee or payment partner to investigate;
- require approval for a corrective action;
- determine whether the customer’s previous message is now incomplete or misleading;
- and send an accurate update to the customer.

Versioning preserves the history. Re-evaluation makes the new state useful for the next decision.

## Re-evaluation does not mean starting from zero

Re-evaluating the situation does not mean throwing away all earlier work and gathering the entire business history again.

The new version remains connected to the previous versions, claims, messages and pending work. Tend examines what changed and which conclusions or responsibilities depend on that change.

Some information may remain valid. Some may need refreshing. Some pending work may be cancelled because it is no longer relevant. Other work may become urgent because the new claim changes the consequence.

The complete version should still describe the whole current situation, even though the Gathering work can focus on the changed or affected parts.

## Active communication after a change

The conversation identified an active communication loop as an important consequence of changing information.

If a new claim changes what the customer was told, Tend should not leave the old communication as the customer’s last understanding. It should decide whether a correction, update, explanation or acknowledgement is needed.

Other actors may also need communication:

- an employee may need to approve or perform the next action;
- an external partner may need to investigate or correct its part;
- a business owner may need to make a decision;
- and the customer may need to know the current state and next step.

This should not become a broadcast of the complete situation to every actor. Each actor should receive the information needed for its responsibility, subject to business policy, confidentiality and channel rules.

Tend should also avoid promising that it has contacted someone before the request has actually been sent or accepted. The communication state should distinguish a planned request, a sent request, an acknowledgement and a completed response.

## Changes to source records and claims

A source may:

- confirm the earlier claim;
- provide a newer state;
- correct an earlier state;
- use the same status word with a different meaning;
- or contradict another source.

Gathering should preserve each observation and record how the current version interprets the relationship between them.

It should not simply trust the newest claim because it arrived last. The new claim still has a source, observation time, authority and scope. Trust and Evidence may be needed when the conflict matters.

## What this question does not settle

This question does not fully settle:

- the exact versioning representation;
- how dependencies between claims and actions are tracked;
- how a business defines a separate operational problem;
- when a corrective message is mandatory;
- how channel reply windows affect later notification;
- or how different actors’ permissions are enforced.

Those matters connect to Memory and Knowledge, Coordination and Time, Communication, Human Collaboration, Trust and Evidence and later implementation work.

## Our working decision

When information changes while a situation is being analysed, Tend should preserve the earlier state, record the new claim and create a new complete version of the same situation when the underlying operational problem and resolution path remain the same.

The new version must trigger re-evaluation of affected conclusions, required information, pending monitoring, approvals, actions and communications. The earlier version and earlier messages remain historical records.

A separate linked situation is created only when the new event represents a genuinely different operational problem or resolution path, not merely because a new claim arrived or a contradiction appeared.

Communication should remain active and targeted across the affected parties, while respecting confidentiality, authority, channel rules and the difference between planned, sent and completed communication.

This is the current working answer for Question 8.
