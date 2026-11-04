We just completed the Learn stage for the first component of Tend, the Situation Registrar. In the last conversation, I renamed and widened the component, decided where its data lives, wrote down how Tend gets tested and watched, updated the software factory and the design, created the plan folders, and was taught eight engineering lessons. The experiment code from those lessons was then deleted, on my instruction, because it would only confuse an agent. Nothing of Tend is built yet. There is no plan, no locked test, and no line of Tend's code.

Now I want to continue with plan 1: the bench and the first whiteboard. We will write it together, using the factory's Stage 2.

Do these steps in this order.

## Step 1: rebuild the context by reading

Read every file below in full, from the first line to the last, in this order.

- Do not read parts, headings, or sections.
- Do not use search, `head`, or `sed` instead of reading.
- Do not ask a subagent to read or summarise for you. You must hold this yourself.
- If a read is cut short or refused for size, keep going with an offset, or the large-file option, until you have seen the last line.

**A. How to work with me**
1. `conversation with swaraj.md`: how we talk. This comes first, and it governs everything else.
2. `file_writing_instruction.md`: how documents should sound.
3. `agent_memory/README.md`, `agent_memory/MEMORY.md`, and every other note in `agent_memory/`: my corrections and rulings so far.

**B. The factory, and how Tend gets tested and watched**
4. `knowledge_base/software_factory_with_coding_agents.md`: the method. Stage 2 says what a plan must lock. Its "Decisions, proposals, and open points" section separates what I decided from what is only proposed.
5. `environments_simulation_and_whiteboard.md`: the road from local to production, the simulation, and the whiteboard, with my words quoted.
6. `programming_language_decisions.md`: TypeScript, and why.
7. `research_insights.md`: the research on databases and evaluation, and the reasoning behind the storage design.
8. `story_registry.md`: every story. Stories confirm the build. They do not inspire it.

**C. The component**
9. `knowledge_base/plans/README.md`: how the plan folders work.
10. `knowledge_base/plans/situation_registrar/README.md`: the list of plans.
11. `knowledge_base/plans/situation_registrar/starting_point.md`: the most important file here. It holds the scope, my rulings word for word, each of my claims checked, the storage decision, and the eight plans.
12. Every `plan.md` and `record.md` in the eight `plan_0*` folders inside `knowledge_base/plans/situation_registrar/`. Start with plan 1. Its questions are where we begin.
13. `knowledge_base/architecture/constructed_architecture_from_section12/build_view/overview.md`: the build order, and how the parts fit.
14. `knowledge_base/architecture/constructed_architecture_from_section12/build_view/situation_registrar.md`: the component's design.
15. `knowledge_base/architecture/constructed_architecture_from_section12/checking/conflict_register.md`: where older records disagree. Rows 36 to 43 came from the last conversation.
16. `knowledge_base/architecture/constructed_architecture_from_section12/checking/gap_register.md`: known gaps, including that nothing creates a business yet.

**D. What I was taught, and what I have actually shown**

All of these are in `knowledge_base/product design and engineering learning/`.

17. `engineering_lessons_how_they_connect_and_where_we_are.md`: how the lessons connect, and the full status.
18. `engineering_lesson_01_how_tend_stores_data.md`: where data lives, and why everything queues.
19. `engineering_lesson_02_primary_keys_and_indexes.md`: keys, indexes, and the cost of each.
20. `engineering_lesson_03_what_a_test_is.md`: what a test is, and how to tell a real one from an empty one.
21. `engineering_lesson_04_reading_typescript.md`: TypeScript taught as differences from Python.
22. `engineering_lesson_05_runtimes.md`: my challenge to TypeScript versus Python, tested.
23. `engineering_lesson_06_a_cloudflare_project.md`: how a Cloudflare project is laid out, and what a binding is.
24. `engineering_lesson_07_live_updates.md`: live pages, and who really holds a WebSocket.
25. `engineering_lesson_08_websockets_from_the_bytes_up.md`: what a WebSocket is, byte by byte.
26. `engineering_learning_record.md`: what I have shown, what I got wrong, and what the teacher got wrong. Being taught does not count as understanding. Use this to know where to slow down.

That is about 64 files, and about 160,000 tokens.

**E. Read in full only when the plan touches them, and read the whole file when you do**

The whole design is about 700,000 tokens, which is too much to hold at once. So open these when we need them, and never quote them from memory. All but the last two are in `knowledge_base/architecture/constructed_architecture_from_section12/`.
- `decision_view/the_decisions.md`: every design decision. Decisions 38 to 42 are the Registrar's.
- `state_view/the_records.md`: every record, and who writes it.
- `interaction_view/the_interactions.md`: who calls whom.
- `boundary_view/the_parts.md`: what each part may and may not do.
- `constraint_view/the_rules_that_always_hold.md`: the rules that always hold.
- `checking/decisions_register.md`: where each decision came from.
- `build_view/owner_view.md`: the owner's screens.
- `map.md`: a map of those views.
- `knowledge_base/agent_harness_study.md`: parts 8 and 9 show the storage.
- `knowledge_base/STRUCTURE.md`: a map of the whole knowledge base.

The last conversation's full transcript is at `/home/swarajbari/.claude/projects/-home-swarajbari-Projects-Project-X/e3613f62-3fe6-478b-8cc9-41c1620705ea.jsonl`. It is 10 MB, so only search it when you need my exact words.

## Step 2: what we did last time, why, and where it is

Do not re-derive any of this. It is settled, unless a file marks it as a Proposal or as Open.

| What we did | Why | Where it is |
|---|---|---|
| Renamed it the Situation Registrar, and widened it: it sends every notice, retries them, keeps the registry and people, writes links and merges others decide, and never judges | It must serve every part, and writers should not need to know who listens | `starting_point.md` part 2; `build_view/situation_registrar.md`; decisions 38 to 42; conflict rows 36 to 43 |
| Decided storage: one Durable Object per situation holds its truth; each business has separate D1s for the registry, configuration and learned knowledge | One save must not make another wait, and database load must stay small | `starting_point.md` part 6; `research_insights.md`; lesson 1 |
| Wrote down the road to customers, the simulation and the whiteboard | Stories and simulations stop us building slop, and I cannot follow state changes in a terminal | `environments_simulation_and_whiteboard.md` |
| Built the story registry | Stories are how we confirm the build | `story_registry.md` |
| Updated the factory | A component is built completely, over several plans. Simulation uses real AI. Plans live in the knowledge base | The factory, "What changed on 4 November 2026" |
| Created eight plan skeletons | One component takes several plans | `knowledge_base/plans/situation_registrar/` |
| Taught eight lessons | First sharpen the axe, then plan | Part D above |
| Deleted all the lessons' experiment code | It was only there to teach me, and it would confuse an agent. The results stay in the lessons. **Do not recreate it, and do not look for it** | `agent_memory/feedback_delete_teaching_code.md` |
| Moved all memory to `agent_memory/` | I cannot always reach `~/.claude` | `agent_memory/feedback_agent_memory_visible.md`; `CLAUDE.md`; `.claude/settings.local.json` |
| Tested my doubt about TypeScript. It stays, because of Cloudflare, and not fashion or speed | I will not follow fashion blindly | Lesson 5 |
| Ruled that we write our own run-time shape checks, and add a library only if needed | Stay lean | Lesson 6, section 10; the factory's Decided list, item 16 |
| Made agent memory visible, in the public repository | I want to see and correct it. So never write a secret in it | `agent_memory/` |
| Found that nothing creates a business, and left it for later | Sign-in and onboarding come after everything else | `gap_register.md` |
| Rejected a cross-business layer, and a "Reception" part | Each business's own channel already answers this. **Do not raise this again** | The learning record, "Mistakes the teacher made" |
| Removed Playwright from my laptop | See the rules below | `agent_memory/feedback_no_playwright.md` |

Our handoff constitution, `handoff_writing_instructions.md`, names a file called `status_quo.md`. That file does not exist anywhere in this repository. This prompt does its job.

## Step 3: tell me where we are

Before anything else, tell me in about ten short lines, as if I have forgotten everything, because I have:
- what this component is;
- what is decided;
- what plan 1 must produce.

Then list any file you could not read in full. Do not say you read something if you did not.

## Step 4: start plan 1

Then ask me the first question that plan 1 needs answered, and only that one.

We are planning, not teaching. If I get stuck on a concept, stop, go back to the lesson that taught it, and then return. Do not write `plan.md` until I say so.

## Rules for this conversation

**How to talk to me**
- Never make me remember anything. Bring the one needed fact into the message yourself.
- One sentence, one idea. Ask one question at a time. I got lost at bindings because too many new ideas came at once.
- Challenge me honestly. Do not agree too fast.
- Keep facts, assumptions, decisions and opinions visibly separate.
- Names must say what a thing is in product terms, even when they are long.

**How to explain anything**
- Tell me what you did, and how you did it. Do not only give me results.
- Give me the real mechanism. A metaphor may help, but it never replaces the technical explanation.
- Connect new things to what I already know: Python, Kubernetes, pods, and Pydantic.
- Do not teach me from memory. Run it or check the current docs, and say plainly what you could not test. Cloudflare's docs can be fetched by adding `/index.md` to a page's address.

**How plans work**
- A plan is in natural language, and has no code.
- The plan locks both sides of every test, so the implementing agent chooses neither.
- Mark something Decided only if I said it or said yes. Everything else stays a Proposal.
- The AI never sees store IDs. Code sets its scope.

**What you must not do**
- Never use or install Playwright. Any browser automation must run in a sandbox, and you must ask me first.
- Never run a command with admin rights. Ask me to do it.
- Do not push. I push myself.
- Do not spawn subagents unless I ask.
- Work files live in this project, and never only in a temporary folder.
- Never write a secret into this repository. It is public.
- Memory lives only in `agent_memory/`. Never write memory under `~/.claude`.
- If you write code only to teach me something, delete it once the result is written down.
- Commit messages end with the attribution line your instructions give you.

**Open items that are mine, in case they come up**
- how to read the isolation audit's "tenant predicate" (conflict 43);
- the factory's 16 proposals;
- my push. If the branch shows two incoming commits, they are old copies from before my commits were split across days. Never pull or merge them;
- removing the copy of Playwright inside the ChatGPT app, which needs my admin rights.
