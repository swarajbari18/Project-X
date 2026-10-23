# Swaraj's requirements for memory and knowledge (compiled 28 Oct 2026)

Governing order: 28 Oct corrections (00_swaraj_28_oct.md) > every other Swaraj statement > the knowledge base > audits.

Sources: Cursor transcript (Downloads/cursor_memory_and_knowledge_layer_gap.md, "CUR"), this Claude session (27 Oct message, full text in conversation), agent_harness_study.md ("HS"), memory conversation record ("MR"), construction_record.md ("CR"), prompt constitution record ("PC").

## What memory is
- R1. An independent component with its own loop(s), interacting with the other components; "the LLM is responsible to figure the interaction out" (HS:927). Fixed interactions are code, dynamic ones the LLM (HS 10.5).
- R2. Not a tool the loops call; "an active proactive sort of a component... part of the harness itself that runs parallel to the loop... part of the working of the loop itself" (CUR:8). The loops may still call it as a tool for more (CUR:80).
- R3. "a LLM-based AI-based component that may have multiple types of loop, multiple types of component that only activate a certain set of components for a certain set of jobs" (CUR:80).
- R4. An agency within the agency Tend; the one part that sees the whole business; workers and the conversation manager are bounded and must not be given the whole business (27 Oct).
- R5. Its main purpose is context engineering: "create a subset of the vast knowledge sea and create a subject and present that in that context." Not decision making (28 Oct).

## What it does
- R6. Observes the loops; keeps updating the situation links; loads each stage with its own subset of context (HS:1083, Sept).
- R7. Conversation manager gets the same loader pattern; routing must not scan millions of situations (HS:1091).
- R8. Before routing, injects the person's open situations, no tool call (CUR:80). (His phrase "all the open situation" means that person's.)
- R9. When the model's reasoning names an order number, memory checks it and injects the related situations (CUR:80).
- R10. When the worker knows the situation type, injects the business's configured strategy before gathering (CUR:80).
- R11. At each step: learn, propose, or stay neutral; event-based (CUR:8).
- R12. Reads the written reasoning of each step (the reasoning artifact, structured JSON), never hidden chain-of-thought (27 Oct; CUR:80).
- R13. Proactively feeds context before each component of each loop, including before the worker's first reasoning, "even before the first component of that situation worker wakes up" (27 Oct).
- R14. Establishes the subject matter of a task from business knowledge, or proposes establishing it from outside sources (27 Oct, dark AMM).
- R15. Proposes the subset of tools (possibly by category) a step needs; the agent can ask memory for more tools while planning (27 Oct). Tools are never bound; Tend runs the tool JSON itself.
- R16. Surfaces skills and business rules where they exist. Skills exist only for particular processes (deep research) or where a business wants a non-default way; there is a default agent behaviour (28 Oct; 27 Oct).
- R17. Injects behaviour preferences (e.g. "speak Hindi") at the generating step (HS 14.3).
- R18. Step instructions belong to memory, not the constitution (HS:2011).
- R19. Owns linking: "it should be complete responsibility of memory and knowledge itself"; the yes/no may go to the conversation manager (CUR:80).
- R20. Establishes time-dependent facts (e.g. when the Diwali sale was) from business-wide records; knows the current time (27 Oct).
- R21. Revisits its own work before proposing (27 Oct).
- R22. Uses multiple retrieval mechanisms (keyword, semantic, graph data, etc.) and compares, specific to what Level 2 already decided, "not do everything" (27 Oct).
- R23. Retrieval must happen before anything is compared; a person may have 10,000 finished situations (28 Oct).

## What it must not do
- R24. Not decide (routing decisions belong to the conversation manager; next-step decisions to the worker) (28 Oct).
- R25. Learning is about Tend's own mistakes and business vocabulary; never changes business rules, authority, invariants (MR:36; AU:70,79).
- R26. No model-generated numbers in control paths (HS:936).
- R27. Every input is a claim, not a fact, until established; "delivered" is a claim (27 Oct).
- R28. Writes run apart from the main loop so it stays fast; reads stay current (HS:1101).
- R29. Never poll; event-driven, subscription-style (HS:2021).

## Identity and data
- R30. A person has a unique ID; channel addresses (WhatsApp, email, logins) point to it (28 Oct).
- R31. The model must not decide memory identity or supersession (MR:166-186).
- R32. Graph data, not graph structure (HS:916).
- R33. Learning per business; off / automatic (default) / manual validation; integrity checks always (MR).

## Loops
- R34. Thought and action separated: think, memory injects, act, think, memory injects (CUR:80). Reasoning is multi-step until done; then action (27 Oct).
- R35. The loop is multi-component, not a ReAct while-loop (27 Oct). Code decides whether to loop (HS:1101).
- R36. The decide step is self-reflection against the task and the work so far; "when the decide step has what context to engineer at that point is the key" (27 Oct).
- R37. Prompt constitution describes behaviour; instructions live in skill files; prompts can be optimised (27 Oct; PC).
- R38. Methodical, lean at every part, smart when it clicks together (27 Oct).

## Fixed code vs AI
- R39. Fixed code is not a hero; hard limits; name the event, its structure and the parameter; CM's memory fixed code and worker's memory fixed code are different components doing very limited jobs; the rest is AI (28 Oct).
- R40. Code decides when to invoke the AI step; the split must be explicit (27 Oct).

## Method
- R41. Three-level framework; memory as a product within Tend; Level 1 then Level 2; engineering questions answered with feasibility; scenarios are test cases (28 Oct).
- R42. Many stories, multiple hypotheses, stress tests (CUR:245, 299).
- R43. Readability per conversation with swaraj.md (CUR:720).

## Tensions in his own words (to resolve in Level 2, not by assumption)
- T1 tool vs part of loop (R2): both — memory acts unasked, and can also be asked.
- T2 learn at each step vs writes off the main loop (R11 vs R28).
- T3 memory owns linking vs "decision of yes/no to the CM" vs 9 Oct "worker accepts" vs 28 Oct "memory does not decide".
- T4 "thought" = model thinking (26 Oct) vs written loop reasoning (27 Oct) — 27 Oct governs.
- T5 code vs AI: "why is this code-based" (26 Oct) vs "code decides when to invoke AI" (27 Oct) vs "fixed code is not a hero" (28 Oct).
- T6 claims first vs guess-and-confirm.
- T7 whole business vs bounded routing.
