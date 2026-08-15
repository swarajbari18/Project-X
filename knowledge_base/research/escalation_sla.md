# Escalation + SLA model (verified) — informs Escalation, Corporate-scaling, and Owner journeys

## Standard B2B/enterprise severity model (P1–P4)
| Sev | Definition | First response | Resolution | Escalation |
|---|---|---|---|---|
| Sev 1 | Outage/security/violation | 15–30 min (24/7) | 1–4 hrs | notify exec team + on-call eng |
| Sev 2 | Core workflow broken / revenue impact / VIP | 30 min | 6–8 hrs → specialist within 1h | L1→L2 specialist in ~1h |
| Sev 3 | Partial/non-core | 4–8 hrs | 2–5 biz days | standard queue |
| Sev 4 | Minor/how-to/feature | next biz day | 5–10 biz days | none |

## Auto-escalation triggers (what makes a ticket jump a level)
- No response past SLA window.
- Customer sends 3+ follow-up messages without an agent reply.
- Ticket reassigned/transferred more than twice.
- CSAT/risk prediction drops below a threshold.
- Timed warning: at ~50% SLA elapsed → warn; at 100% → escalate to supervisor/queue lead.

## What travels WITH an escalation (the "chronological trail" the user wants)
- The severity + how much SLA time remains (e.g., "Sev 2, escalated at 45 min, 15 min left on L2 SLA").
- A plain-language one-line problem statement ("customer can't complete checkout since Tuesday … 40% errors"),
  NOT raw logs or jargon.
- Full timeline: first contact → first response → each touch → escalation events → resolution (audit).
- Assigned actor + fallback.

## Role topology (the gradient SMB → corporate)
- **L1 / frontline**: triage, reply, fast resolutions. Owns customer comms.
- **L2 / specialist**: deep domain fixes (ops, logistics, finance).
- **L3 / engineering or senior**: root cause, permanent fix.
- **Incident commander + comms lead + customer liaison** for high-severity (corporate).
- In SMB this compresses to: owner (all roles) + maybe one helper — same ladder, fewer rungs.

## Application to Tend
- The user's escalation example (logistics stuck for 7 days) maps to: detect (stale tracking/customer
  signal) → auto-escalate with a chronological audit trail → route to right employee →
  if no response → escalate up/bypass to external partner contact with scoped data.
- The audit trail requirement = "every important action traceable + explainable" invariant, made concrete.
- Corporate scaling = richer severity/account tiering + named escalation + RACI; SMB = simplified.
  This supports the "same core, compositional extensions" verdict.
