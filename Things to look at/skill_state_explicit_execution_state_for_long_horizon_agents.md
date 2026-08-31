# SKILL.state: Scalable Long-Horizon Agent Skills

> Source PDF: `2608.26263v2.pdf`
> Research purpose: Replacing unbounded transcript growth with explicit mutable execution state.
> Conversion: `pdftotext -layout`, orchestrated by Python

---

## Extracted text

SKILL.state: Scalable Long-Horizon Agent Skills


                                                                Sanket Badhe1 , Priyanka Tiwari2 , Jonghyun Chung1 ,
                                                 1
                                                     Google LLC, 2 Purdue University Correspondence: sanketbadhe@google.com


                                                              Abstract                             Modern agent runtimes almost universally adopt
                                                                                                a conversational execution model. At every execu-
arXiv:2608.26263v2 [cs.AI] 28 Aug 2026


                                             Large Language Models (LLMs) increasingly          tion step, the language model receives the original
                                             act as autonomous agents executing complex,        skill specification together with an ever-growing
                                             long-running procedural skills. Existing agent     transcript of previous reasoning, actions, observa-
                                             runtimes maintain execution by continually ap-
                                                                                                tions, and tool outputs (Yao et al., 2022; Mialon
                                             pending observations, actions, and intermediate
                                             reasoning traces to an ever-growing conversa-      et al., 2023). Although memory systems alleviate
                                             tion history, causing latency degradation and      context growth through summarization or retrieval
                                             context-poisoning failures over long horizons.     (Packer et al., 2023; Wang et al., 2023; Zhong et al.,
                                             We present SKILL.state, a runtime architecture     2023), they preserve the same execution semantics:
                                             that replaces append-only conversational his-      future decisions are conditioned on textual recon-
                                             tory with an explicit, mutable execution state.    structions of past execution rather than an explicit
                                             At each execution step, the model receives only
                                                                                                representation of the current execution state.
                                             the immutable skill specification, the current
                                             structured execution state, and the latest ob-
                                                                                                   This design introduces fundamental limitations
                                             servation. Intermediate reasoning is discarded     for long-horizon procedural skills. Prompt size
                                             immediately after producing a validated state      grows with execution length, increasing token con-
                                             update, preventing prompt growth with execu-       sumption and inference cost (Liu et al., 2024; Xiao
                                             tion history. Across diverse datasets, models,     et al., 2024a). Historical observations and obsolete
                                             and execution environments, SKILL.state im-        reasoning remain embedded in the context long af-
                                             proves task accuracy while substantially reduc-    ter they cease to be relevant, requiring the model
                                             ing cumulative token consumption. Our results
                                                                                                to continually distinguish current facts from histor-
                                             demonstrate that explicit execution state is an
                                             effective and architecture-agnostic abstraction    ical artifacts. Consequently, execution correctness
                                             for scalable long-horizon agent skills.            increasingly depends on reconstructing state from
                                                                                                accumulated textual history.
                                         1   Introduction                                          In this paper, we introduce SKILL.state, a run-
                                                                                                time architecture that reformulates procedural skill
                                         Large Language Models (LLMs) have rapidly              execution as explicit state transitions rather than
                                         evolved from passive language interfaces into au-      conversational history accumulation. Figure 1 pro-
                                         tonomous systems capable of iterative reasoning,       vides an overview of the proposed runtime. At
                                         tool use, and interaction with external environ-       execution step t, the language model receives only
                                         ments (Yao et al., 2022; Schick et al., 2023; Qin      three inputs:
                                         et al., 2024; Wu et al., 2023). Recent work fur-
                                                                                                                 At = (P, Σt , Ot ),              (1)
                                         ther demonstrates that these capabilities can be en-
                                         capsulated as reusable procedural skills, enabling     where P denotes the immutable procedural spec-
                                         agents to perform software engineering, workflow       ification, Σt is the structured execution state, and
                                         automation, web interaction, and scientific discov-    Ot is the latest environment observation. After pro-
                                         ery through modular compositions of specialized        ducing a validated state update, the intermediate
                                         behaviors (Badhe et al., 2026). As agents increas-     reasoning trace is discarded while only the updated
                                         ingly execute long-running procedures, execution       execution state is retained. Consequently, execu-
                                         itself becomes a systems problem rather than purely    tion depends strictly on the current world state in-
                                         a reasoning problem.                                   stead of replaying historical trajectories.

<!-- page break -->

   To evaluate this hypothesis, we evaluate              2.2    Memory Architectures for Long-Horizon
SKILL.state across both synthetic and real-world                Agents
benchmarks: SkillExecBench, a controlled bench-          Long-horizon agent architectures typically pre-
mark designed for long-horizon procedural skill          serve conversational semantics through episodic
execution under scaling, noise, and state recovery;      retrieval (Park et al., 2023) or persistent storage
InterCode CTF (Yang et al., 2023), featuring in-         (Chhikara et al., 2025; Zhong et al., 2024). These
teractive Linux terminal exploitation; and Sierra        methods leave execution state implicitly distributed
τ -Bench (Yao et al., 2024), evaluating multi-turn       across accumulated logs. SKILL.state instead iso-
customer-service workflows over complex database         lates execution into an explicit, mutable runtime
APIs.                                                    state, eliminating the need to repeatedly reconstruct
   Experimental results demonstrate that explicit        world models from textual history. Frameworks
execution state substantially improves the scala-        like LangGraph use auxiliary structured state to or-
bility of long-horizon procedural skills by main-        chestrate workflows across agent nodes. However,
taining bounded prompt sizes while cutting to-           these systems still rely on conversational transcripts
ken consumption and outperforming history-based          as the primary reasoning substrate. SKILL.state
and compression-based baselines across multiple          replaces this substrate by discarding intermediate
model families.                                          reasoning traces immediately after producing vali-
   Our contributions are summarized as follows:          dated state transitions.

                                                         2.3    Dialogue State Tracking
    • We propose SKILL.state, a runtime architec-
      ture that executes procedural skills through       Dialogue State Tracking (DST) maintains user slot
      explicit structured execution state where inter-   values across conversational turns in task-oriented
      mediate reasoning is discarded after each step,    dialogue (Williams et al., 2013; Henderson et al.,
      proving a strictly bounded O(1) prompt foot-       2014; Rastogi et al., 2020; Wu et al., 2019; Heck
      print and O(T ) cumulative token complexity.       et al., 2020; Hosseini-Asl et al., 2020). While both
                                                         DST and SKILL.state maintain structured represen-
                                                         tations, they differ fundamentally in execution me-
    • We present SkillExecBench, alongside evalua-
                                                         chanics: DST tracks auxiliary state alongside full
      tions on public benchmarks (InterCode CTF
                                                         conversational transcripts in quasi-static dialogues,
      and Sierra τ -Bench), for evaluating long-
                                                         whereas SKILL.state treats the structured state as
      horizon procedural skill execution in sequen-
                                                         a sufficient statistic, discarding conversational his-
      tial, stateful environments.
                                                         tory to execute autonomous skills in dynamic envi-
                                                         ronments with bounded prompt footprints.
    • Across multiple execution horizons and run-
      time baselines, we demonstrate that state-         2.4    Context Management and Long-Context
      centric execution maintains competitive task              Reasoning
      performance while substantially reducing           Language models exhibit degraded retrieval over
      prompt growth and cumulative token con-            long contexts (Liu et al., 2024; Zhang et al., 2024),
      sumption across both proprietary and open-         motivating streaming attention (Xiao et al., 2024b)
      weight models.                                     and prompt compression techniques (Jiang et al.,
                                                         2023; Li et al., 2023). Rather than attempting to
2     Related Work                                       process or compress extended conversational his-
                                                         tories, SKILL.state prevents history accumulation
2.1    Procedural Skills for LLM Agents                  entirely by maintaining the canonical execution
                                                         state required for the next computation.
Existing research on reusable procedural skills
primarily addresses skill discovery, representa-         3     SKILL.state
tion, composition and and security threat modeling
(Badhe et al., 2026; Badhe and Tiwari, 2026). Our        Current LLM agent runtimes execute procedural
work instead focuses on the largely unexplored me-       skills by repeatedly appending reasoning traces, ac-
chanics of skill execution once a skill has been         tions, observations, and tool outputs to a growing
selected.                                                conversational history. Consequently, the execution

<!-- page break -->

state is represented implicitly within natural lan-      Algorithm 1 SKILL.state Runtime
guage and must be reconstructed by the language          Require: Procedural specification P , initial state
model at every interaction. As execution horizons            Σ0
increase, both prompt size and the volume of ob-          1: for t = 0, . . . , T do
solete information grow monotonically, making             2:     Receive latest observation Ot
execution increasingly dependent on interpreting          3:     Construct prompt (P, Σt , Ot )
historical text rather than maintaining the current       4:     Generate (Rt , ∆Σt , at ) using the LLM
world state.                                              5:     Validate ∆Σt
   SKILL.state reformulates procedural skill execu-       6:     Σt+1 ← Σt ⊕ ∆Σt
tion as an explicit state transition process. Instead     7:     Execute at
of representing execution as an append-only con-          8: end for
versation, every execution step is defined by:

                 At = (P, Σt , Ot ),              (2)    JSON dictionary of key mutations and deletions),
                                                         and at is the action to execute.
where P is the immutable procedural specification,          Crucially, within-step multi-step reasoning is
Σt is the structured execution state at step t, and Ot   fully intact during generation to support complex
is the latest observation received from the environ-     deductive planning. However, once the state transi-
ment. The language model never receives previous         tion has been validated and applied, the reasoning
observations, previous actions, or previous reason-      trace Rt is discarded permanently and never ap-
ing traces.                                              pears in subsequent prompts. The execution state
   Figure 1 illustrates the execution cycle. At          is updated according to:
each step, the runtime constructs a prompt from
                                                                        Σt+1 = Σt ⊕ ∆Σt ,                (4)
(P, Σt , Ot ), invokes the language model, determin-
istically validates the proposed state transition, up-   where ⊕ denotes the runtime’s dictionary merge
dates the execution state, executes the selected ac-     operator with null-deletion semantics. This model
tion, and repeats the process using the updated          projects transient reasoning into persistent struc-
state.                                                   tured state, allowing only information required for
                                                         future execution to survive across interactions.
3.1   Execution State and Schema Authoring                  Algorithm 1 summarizes the execution process.
Unlike conversational runtimes, SKILL.state
treats execution state as a first-class runtime          3.3   Complexity Analysis
abstraction. The state contains only information         Let T denote the execution horizon. For conver-
required for future execution and is represented         sational runtimes, prompt length grows with the
using a structured schema defined for the domain.        accumulated interaction history, |Ct | = O(t), lead-
Schemas are authored once per domain rather than         ing to cumulative token complexity:
per task; for example, across all 100 diverse chal-                      T
lenge instances in the InterCode CTF benchmark,
                                                                         X
                                                                               |Ct | = O(T 2 ).          (5)
the agent reuses a single static 5-field schema                          t=1
(discovered_flags,           tested_hypotheses,
active_files, working_dir, cmd_summary).                   In contrast, SKILL.state maintains only the pro-
                                                         cedural specification, structured execution state,
3.2   Reasoning and State Transitions                    and latest observation:
Reasoning is used strictly as an intermediate com-                  |Pt | = O(|P | + |Σ| + |O|),         (6)
putation for producing state transitions and select-
ing the next action. Given the current execution         which is asymptotically bounded and independent
context (P, Σt , Ot ), the language model generates:     of the number of previously executed turns t. Con-
                                                         sequently, cumulative prompt complexity grows
                   (Rt , ∆Σt , at ),              (3)    strictly linearly with the execution horizon:
                                                                         T
where Rt denotes the multi-step Chain-of-Thought                         X
                                                                               |Pt | = O(T ).            (7)
reasoning trace, ∆Σt is a structured state update (a                     t=1

<!-- page break -->

               Traditional Skill Execution                                                          SKILL.State Runtime
                          Prompt Context O(T )

                                                                                                        Prompt Context O(1)
                           Procedural Instructions


                            Conversation History                                                         Procedural Instructions


                           Previous Observations                                                         Execution State Σt−1


                             Previous Reasoning
                                                                                                          Latest Observation ot
                                                                                                                                               State Update
                            Latest Observation ot                                                                                              JSON Patch ∆Σ


                            Large Language                           Ephemeral                            Large Language
                                Model                                Reasoning                                Model
                                                                     Discarded after
                                                                     state projection


                                 Execute Action                                                                Execute Action


                      Context Growth Profile                                                        Context Growth Profile
          Execution Steps (T )            Max Limit                                     Execution Steps (T )               Max Limit

             t=1                                                                           t=1

            t = 50                                                                        t = 50

                  .                                                                             .
                  .                                                                             .
                  .                                                                             .

           t = 500                                    Growing                           t = 500                  Bounded

                                                       Prompt Size                                                                     Prompt Size


                                            Figure 1: Overview of the SKILL.state architecture.


   The resulting runtime shifts execution from re-                                             commits, Pull Requests, and CI test statuses.
constructing history toward maintaining an explicit,                                           Actions include CherryPick, Merge, RunTests,
validated representation of the current execution                                              CreateRelease, and Rollback. Features dense
state.                                                                                         dependencies where a single action (e.g., merg-
                                                                                               ing a PR) fundamentally alters the state of the tar-
4     Evaluation Benchmarks                                                                    get branch and dependent PRs, testing complex
4.1    SkillExecBench (Controlled Diagnostic                                                   structural reasoning over an entangled graph.
       Testbed)
                                                                                           4.2         Public Interactive Benchmarks
SkillExecBench isolates execution mechanics from
open-ended heuristic search by providing sequen-                                           To evaluate SKILL.state on real-world, non-
tial procedural tasks with deterministic ground-                                           deterministic tasks with complex search, genera-
truth world transitions:                                                                   tion, and tool use, we evaluate on two public bench-
                                                                                           marks:
• Environment 1 (Warehouse Management): A
  discrete physical inventory domain tracking 500                                          • InterCode CTF (Yang et al., 2023): A suite
  independent shelves. Actions include Store,                                                of 100 Linux bash Capture-The-Flag challenges
  Ship, Move, and Wait. This environment tests                                               spanning reverse engineering, forensics, cryptog-
  the model’s ability to maintain independent, non-                                          raphy, and binary exploitation. Agents execute
  overlapping state variables over extended hori-                                            bash commands in Docker containers and itera-
  zons where early observations leave the context                                            tively test hypotheses to discover hidden flags.
  window.
                                                                                           • Sierra τ -Bench (Yao et al., 2024): A bench-
• Environment 2 (Software Repository): A                                                     mark for tool-agent-user interaction in enterprise
  deeply nested, relational graph of Git branches,                                           customer service (Retail and Airline domains).

<!-- page break -->

    Agents interact with simulated users, query rela-     3. ReAct + LLMLingua (Jiang et al., 2023):
    tional SQLite databases via tool calls, and exe-         Uses budget-aware small-model perplexity com-
    cute transactional actions (e.g., flight rebooking,      pression to prune tokens from the full history
    refunds) under business policy constraints.              down to the target budget.

4.3    Evaluation Metrics                                 Underlying Models: Evaluations are con-
We evaluate runtimes across three dimensions:             ducted across proprietary and open-weight models:
                                                          Gemini-3-Flash, Gemma-4-31B-it, and Qwen-3-
• Task Accuracy / Success Rate: In SkillEx-               8B-it. Decoding is controlled at temperature 0.0
  ecBench, accuracy is measured continuously as           and top-p 1.0 across all runs to ensure deterministic
  the ratio of valid, correct actions matching the        reproducibility.
  ground-truth deterministic simulation (Score =          Statistical Significance: All synthetic experiments
     Successful Actions
  Total Actionable Events ). In InterCode CTF, success    are evaluated across 5 distinct procedural generator
  is binary pass@1 (exact match on the binary-            seeds. Results are reported as mean ± sample stan-
  verified flag). In τ -Bench, success is scored by       dard deviation. Differences between SKILL.state
  the official programmatic evaluator, which ver-         and baselines at extended horizons (T ≥ 50) are
  ifies that the final database state satisfies user      statistically significant (paired t-test, p < 0.01).
  intent without policy violations.
                                                          5.2   Experiment 1: Long-Horizon Execution
• Average Prompt Size: The mean token footprint                 Scaling
  per LLM invocation.
                                                          We evaluate runtime accuracy and context expan-
• Total Token Cost: The cumulative token burn             sion across execution horizons scaling from T =
  across the entire execution horizon.                    10 to T = 200 steps.
                                                          Results: As shown in Table 1, SKILL.state
5     Experiments and Results                             matches or exceeds baseline accuracy across all
                                                          horizons while maintaining a flat prompt size
5.1    Experimental Setup                                 (∼1,736–1,905 tokens). In contrast, history-
We evaluate SKILL.state against two families of           appending baselines suffer quadratic token accumu-
baselines (see Appendix 7 for exact prompt tem-           lation O(T 2 ). At T = 100, the Stateful baseline
plates):                                                  consumes 1,062,387 tokens, whereas SKILL.state
Primary Runtime Paradigms:                                consumes only 65,408 tokens (a 16.2× token re-
                                                          duction). At T = 200, SKILL.state maintains 0.94
1. Prompt (ReAct-style): Appends every obser-             accuracy consuming 122k tokens, while the Mem-
   vation, intermediate reasoning trace, and action       ory baseline inflates to 6.1M tokens. Additional
   to a continually growing transcript (Yao et al.,       scaling results for the Software Repository and
   2022).                                                 open-weight models are detailed in Appendix 7.
2. Memory (Summarization-style): Maintains a              5.3 Experiment 2: Context Corruption (Noise
   rolling 3-step conversational window alongside             Robustness)
   a periodically updated natural language sum-
                                                          Real-world execution environments emit dense
   mary of past interactions (Packer et al., 2023).
                                                          background telemetry. We fix the horizon at T =
3. Stateful (LangGraph-style): Injects a struc-           50 and inject distractor events (system telemetry,
   tured state block into the context window along-       irrelevant git branch activities, and rule overrides)
   side the full rolling conversational transcript.       at rates of 5, 20, and 50 events per turn (see Ap-
                                                          pendix 7 for calibration details).
Budget-Matched and Compression Controls:                  Results: As shown in Table 2, the standard Prompt
1. Truncated (Sliding Window): Retains only the           runtime degrades sharply from 0.68 at low noise
   most recent interaction turns that fit within a        down to 0.53 at high noise. In contrast, SKILL.state
   fixed token budget.                                    maintains robust task completion (≥ 0.97) across
                                                          all noise levels because distractors are filtered out
2. Summary-capped: Strictly enforces a hard to-           during state patch generation and never enter sub-
   ken ceiling on the natural language summary.           sequent prompts.

<!-- page break -->

Table 1: Warehouse Management Long-Horizon Scaling using Gemini-3-Flash. Baseline runtimes suffer O(T 2 )
context accumulation, whereas SKILL.state maintains a bounded O(1) prompt footprint (Mean ± SD across 5
seeds).

 Horizon (T )      Runtime                 Score (Accuracy)             Avg Prompt (Tokens)                     Total Tokens
 10                Prompt (ReAct)               0.90 ±0.02                        3,249 ±94                       9,438 ±371
                   Memory (Summary)             1.00 ±0.00                        3,300 ±123                      9,972 ±204
                   Stateful (LangGraph)         1.00 ±0.00                        3,430 ±42                       10,337 ±299
                   SKILL.state                  1.00 ±0.00                        1,775 ±74                        5,870 ±131
 25                Prompt (ReAct)               0.92 ±0.02                        6,052 ±192                     42,689 ±2,238
                   Memory (Summary)             0.99 ±0.00                        6,357 ±203                     43,067 ±1,948
                   Stateful (LangGraph)         1.00 ±0.00                        5,858 ±301                     41,238 ±3,196
                   SKILL.state                  1.00 ±0.00                        1,736 ±49                      14,714 ±564
 50                Prompt (ReAct)               0.88 ±0.04                       11,931 ±346                     171,658 ±6,978
                   Memory (Summary)             0.93 ±0.03                        7,582 ±283                     131,455 ±6,841
                   Stateful (LangGraph)         0.94 ±0.00                       11,594 ±438                     170,992 ±7,918
                   SKILL.state                  0.96 ±0.01                        1,773 ±53                       30,151 ±1,231
 100               Prompt (ReAct)               0.84 ±0.07                       36,362 ±1,304                 1,245,413 ±53,241
                   Memory (Summary)             0.87 ±0.05                       29,607 ±978                   1,082,154 ±83,212
                   Stateful (LangGraph)         0.91 ±0.02                       31,354 ±831                   1,062,387 ±53,839
                   SKILL.state                  0.94 ±0.01                        1,905 ±93                      65,408 ±5,431
 200               Prompt (ReAct)               0.74 ±0.14                       48,007 ±2,092                 2,608,755 ±102,415
                   Memory (Summary)             0.84 ±0.09                       84,364 ±3,446                 6,175,509 ±294,089
                   Stateful (LangGraph)         0.88 ±0.03                       72,305 ±3,096                 5,041,164 ±346,925
                   SKILL.state                  0.94 ±0.02                        1,811 ±184                     122,384 ±4,522


Table 2: Warehouse Noise Robustness (T = 50,                 Table 3: Warehouse State Recovery (Gemini-3-Flash).
Gemini-3-Flash).
                                                             Scenario             Runtime                      Success   Recovery Steps

Noise Level                Runtime              Score        A: Secret Audit      Prompt / Memory / Stateful    Yes           5–8
                                                                                  SKILL.state                   Yes            0
5 Events (Low)             Prompt                0.68        B: Secret Barcode    Prompt / Memory / Stateful    Yes           6–8
                           Memory                1.00                             SKILL.state                   Yes            0
                           Stateful              1.00        C: Secret Move       Prompt / Memory / Stateful    Yes           5–8
                           SKILL.state           1.00                             SKILL.state                   Yes            0
                                                             D: Canceled Order    All Runtimes                   No           N/A
20 Events (Medium)         Prompt                0.61
                           Memory                1.00
                           Stateful              0.98
                           SKILL.state           0.97    power contradictory new observations. In sharp
50 Events (High)           Prompt                0.53    contrast, SKILL.state requires zero recovery steps:
                           Memory                0.96
                           Stateful              0.98
                                                         because its decisions depend on the current struc-
                           SKILL.state           0.98    tured state, the state is updated immediately upon
                                                         receiving the corrective alert.

5.4    Experiment 3: State Recovery                      5.5        Experiment 4: Public Interactive
                                                                    Benchmarks
We test runtime resilience to silent external environ-
ment drift where the true world state is modified        To test generalizability on open-ended tasks with
outside the agent’s action loop (e.g., an external       complex search, generation, and tool use, we eval-
actor moves an inventory item).                          uate SKILL.state on InterCode CTF and Sierra τ -
Results: As shown in Table 3, history-based base-        Bench.
lines hallucinate for 5 to 8 consecutive turns be-       Results: As shown in Table 4, SKILL.state
cause obsolete facts in their prompt history over-       achieves the highest task completion rates across all

<!-- page break -->

Table 4: Evaluation on Public Interactive Benchmarks using Gemini-3-Flash. SKILL.state achieves the highest task
success rates while significantly reducing prompt sizes and cumulative token consumption.

                              InterCode CTF (100 Tasks)             Sierra τ -Bench (Retail)       Sierra τ -Bench (Airline)
Runtime                    Pass@1       Prompt      Tokens       Pass Rate    Prompt    Tokens   Pass Rate   Prompt     Tokens
Prompt (ReAct)                43.2%      1,909       977k          48.2%       2,819    4.48M     21.8%       5,100      4.85M
Memory (Summary)              46.4%      1,797      1.03M          29.9%       2,737    4.24M     23.6%       4,700      4.65M
Stateful (LangGraph)          41.8%      1,946      1.13M          51.7%       3,065    3.92M     28.1%       5,400      5.28M
SKILL.state                   54.2%       813        387k          58.3%       3,325    3.47M     32.4%       2,800      2.88M


three benchmarks while substantially cutting cumu-                    SKILL.state achieves 0.94 score, demonstrating
lative token consumption. In InterCode CTF, main-                     that structured state maintenance preserves exact
taining explicit hypotheses and discovered flags in                   relational dependencies that statistical compressors
Σt prevents the model from repeating failed com-                      destroy.
mands, increasing pass@1 to 54.2% (+7.8 points
over the strongest baseline and +12.4 points over                     5.7 Error Taxonomy for Open-Weight Models
Stateful) while cutting total tokens by 60.4% vs.                     On open-weight models (Gemma-4-31B at T =
ReAct and 65.9% vs. Stateful. In τ -Bench Retail,                     100, score 0.42), we analyze failure logs and cate-
SKILL.state leads with 58.3% pass rate at the low-                    gorize errors into three distinct modes:
est total token cost. In τ -Bench Airline, where com-
plex database responses cause baseline prompts to                     1. Premature State Overwrite / Deletion (68%):
peak above 11,000 tokens/step, SKILL.state main-                         The model accidentally omits existing keys dur-
tains a flat footprint of ∼2,800 tokens/step and                         ing state update rather than merging in-place.
achieves a 32.4% pass rate, saving 40.5% tokens                       2. Schema Comprehension / Type Coercion
vs. ReAct and 45.4% vs. Stateful.                                        (20%): Inconsistencies between expected
Table 5: Budget-Matched Controls on Warehouse (T =                       nested lists and dictionaries.
100, Gemini-3-Flash, Budget ∼1,800 tokens).
                                                                      3. JSON Syntax / Formatting Slips (12%): Mal-
 Runtime / Configuration       Score   Avg Prompt   Total Tokens         formed JSON delimiters or trailing commas.
 Full ReAct (Unbounded)         0.84     36,362      1,245,413
 Truncated (Sliding Window)     0.18      1,800        62,100         This error distribution shows that small-model
 Summary-capped                 0.52      1,840        63,400         degradation stems from structured output adher-
 ReAct + LLMLingua              0.22      1,810        62,350
 SKILL.state (Structured)       0.94     1,905        65,408          ence rather than reasoning capacity, motivating
                                                                      constrained decoding in future runtime iterations.

                                                                      6      Conclusion
5.6    Experiment 5: Budget-Matched Controls
       and Statistical Compression                                    We presented SKILL.state, a runtime architecture
To determine whether SKILL.state’s performance                        that replaces append-only conversational history
gains stem merely from shorter prompts or from                        with explicit, structured execution state. By dis-
structured state representation, we evaluate budget-                  carding intermediate reasoning traces after each val-
matched baselines on Warehouse (T = 100,                              idated transition, SKILL.state maintains a bounded
Gemini-3-Flash) pinned to the token budget of                         O(1) prompt footprint and scales linearly O(T ) in
SKILL.state (∼1,800 tokens). Full multi-horizon                       cumulative tokens. Across controlled diagnostic
scaling across T ∈ {10, 25, 50, 100} is detailed in                   tasks and public interactive benchmarks, explicit
Appendix .2.                                                          execution state consistently improves task accuracy
Results: As shown in Table 5, all budget-matched                      while substantially reducing prompt growth and
compression baselines suffer catastrophic failure.                    token consumption.
Sliding-window truncation drops to 0.18 because
                                                                      7      Limitations
critical early inventory allocations are evicted.
LLMLingua drops to 0.22 because statistical en-                       SKILL.state assumes that the execution state can
tropy filtering removes seemingly redundant slot                      be made a sufficient statistic for future execution:
identifiers that are semantically vital. In contrast,                 that everything in the past bearing on future actions

<!-- page break -->

can be projected into the structured state as soon as        for value-independent neural dialog state tracking.
it becomes known. Where this holds, discarding in-           In Proceedings of the 21th Annual Meeting of the
                                                             Special Interest Group on Discourse and Dialogue,
termediate reasoning and conversational history is
                                                             pages 35–44.
lossless. However, this assumption fails in three dis-
tinct settings: (1) when no fixed schema is known          Matthew Henderson, Blaise Thomson, and Jason D
in advance and the relevant state structure must be         Williams. 2014. The second dialog state tracking
                                                            challenge. In Proceedings of the 15th Annual Meet-
discovered dynamically during execution; (2) when           ing of the Special Interest Group on Discourse and
a correct state update depends on an earlier obser-         Dialogue (SIGDIAL), pages 263–272.
vation whose relevance was not recognized when
                                                           Ehsan Hosseini-Asl, Bryan McCann, Chien-Sheng Wu,
first observed, and was therefore never committed            Semih Yavuz, and Richard Socher. 2020. A simple
to state; and (3) when the task objective is defined         language model for task-oriented dialogue. Advances
over the historical trajectory itself (e.g., auditing,       in Neural Information Processing Systems, 33:20179–
debugging provenance, or explaining past actions),           20191.
where interaction history is the target output rather      Huiqiang Jiang, Qianhui Wu, Chin-Yew Lin, Yuqing
than operational overhead.                                   Yang, and Lili Qiu. 2023. LLMLingua: Compressing
   Our current implementation focuses on single-             prompts for accelerated inference of large language
agent procedural execution. While the explicit state         models. In Proceedings of the 2023 Conference on
                                                             Empirical Methods in Natural Language Processing
abstraction extends naturally to multi-agent sys-            (EMNLP), pages 13358–13376.
tems—where a shared execution state acts as the
central coordination substrate instead of exchang-         Yucheng Li, Bo Dong, Frank Zhang, Dong Wang,
                                                             Yanzhao Xu, Xinyu Chen, and Xiang Ren. 2023.
ing quadratic conversational transcripts—multi-              Compressing context to enhance inference efficiency
agent environments introduce concurrent writes,              of large language models. In Proceedings of the
requiring deterministic conflict-resolution seman-           2023 Conference on Empirical Methods in Natural
tics in the merge operator ⊕ that our single-agent           Language Processing (EMNLP), pages 6342–6353.
setting does not exercise.                                 Nelson F. Liu, Kevin Lin, John Hewitt, Ashwin Paran-
   Finally, SKILL.state relies on the language               jape, Michele Bevilacqua, Fabio Petroni, and Percy
model to propose valid structured state patches.             Liang. 2024. Lost in the middle: How language mod-
Because schema ownership and validation reside               els use long contexts. Transactions of the Association
                                                             for Computational Linguistics, 12:157–173.
in the deterministic runtime rather than the model,
malformed outputs cannot corrupt persistent state          Grégoire Mialon, Roberto Dessi, Maria Lomeli, Christo-
Σt ; an invalid patch triggers a rollback-retry cy-          foros Nalmpantis, Ramakanth Pasunuru, Roberta
                                                             Raileanu, Baptiste Roziere, Timo Schick, Jane
cle. For smaller open-weight models, integrating             Dwivedi-Yu, Asli Celikyilmaz, Edouard Grave, Yann
grammar-constrained decoding can eliminate syn-              LeCun, and Thomas Scialom. 2023. Augmented lan-
tactic formatting errors, allowing the model to fo-          guage models: a survey. Transactions on Machine
cus entirely on semantic state transitions.                  Learning Research. Survey Certification.
                                                           Charles Packer, Vivian Fang, Shishir_G Patil, Kevin
                                                             Lin, Sarah Wooders, and Joseph_E Gonzalez. 2023.
References                                                   Memgpt: towards llms as operating systems.
Sanket Badhe, Deep Shah, Priyanka Tiwari, and Nehal        Joon Sung Park, Joseph C O’Brien, Carrie J Cai, Mered-
  Kathrotia. 2026. A systematic survey of agent skills:      ith Ringel Morris, Percy Liang, and Michael S Bern-
  Lifecycle, taxonomy, and security. Taxonomy, and           stein. 2023. Generative agents: Interactive simulacra
  Security (July 31, 2026).                                  of human behavior. In Proceedings of the 36th An-
                                                             nual ACM Symposium on User Interface Software
Sanket Badhe and Priyanka Tiwari. 2026. Agent skill          and Technology (UIST).
  security: Threat models, attacks, defenses, and evalu-
  ation. Preprint, arXiv:2607.13987.                       Yujia Qin, Shihao Liang, Yining Ye, Kunlun Zhu, Lan
                                                             Yan, Yaxi Lu, Yankai Lin, Xin Cong, Xiangru Tang,
Prateek Chhikara, Dev Khant, Saket Aryan, Taranjeet          Bill Qian, and 1 others. 2024. ToolLLM: Facilitating
  Singh, and Deshraj Yadav. 2025. Mem0: Building             large language models to master 16000+ real-world
  production-ready ai agents with scalable long-term         apis. In International Conference on Learning Rep-
  memory. arXiv preprint arXiv:2504.19413.                   resentations (ICLR).
Michael Heck, Carel van Niekerk, Nurul Lubis, Chris-       Abhinav Rastogi, Xiaoxue Zang, Srinivas Sunkara,
  tian Geishauser, Hsien-chin Lin, Marco Moresi, and         Raghav Gupta, and Pranav Khaitan. 2020. Towards
  Milica Gašić. 2020. Trippy: A triple copy strategy        scalable multi-domain conversational agents: The

<!-- page break -->

  schema-guided dialogue dataset. In Proceedings of        ∞Bench: Extending long context evaluation beyond
  the AAAI Conference on Artificial Intelligence, vol-     100K tokens. In Proceedings of the 62nd Annual
  ume 34, pages 8689–8696.                                 Meeting of the Association for Computational Lin-
                                                           guistics (Volume 1: Long Papers), pages 15262–
Timo Schick, Jane Dwivedi-Yu, Roberto Dessì, Roberta       15277, Bangkok, Thailand. Association for Compu-
  Raileanu, Maria Lomeli, Luke Zettlemoyer, Nicola         tational Linguistics.
  Cancedda, and Thomas Scialom. 2023. Toolformer:
  Language models can teach themselves to use tools.     Wanjun Zhong, Lianghong Guo, Qiqi Gao, He Ye
  In Advances in Neural Information Processing Sys-       Wang, and Yankai Lin. 2023. MemoryBank: Enhanc-
  tems (NeurIPS).                                         ing large language models with long-term memory.
                                                          arXiv preprint arXiv:2305.10250.
Weizhi Wang, Li Dong, Hao Cheng, Xiaodong Liu,
 Xifeng Yan, Jianfeng Gao, and Furu Wei. 2023. Aug-      Wanjun Zhong, Lianghong Guo, Qiqi Gao, He Ye, and
 menting language models with long-term memory.           Yanlin Wang. 2024. Memorybank: Enhancing large
 Advances in Neural Information Processing Systems         language models with long-term memory. In Pro-
 (NeurIPS).                                                ceedings of the AAAI conference on artificial intelli-
                                                           gence, volume 38, pages 19724–19731.
Jason Williams, Antoine Raux, Deepak Ramachandran,
   and Alan Black. 2013. The dialog state tracking
   challenge. In Proceedings of the SIGDIAL 2013
   Conference, pages 404–413.

Chien-Sheng Wu, Andrea Madotto, Ehsan Hosseini-Asl,
  Caiming Xiong, Richard Socher, and Pascale Fung.
  2019. Transferable multi-domain state generator for
  task-oriented dialogue systems. In Proceedings of
  the 57th Annual Meeting of the Association for Com-
  putational Linguistics, pages 808–819.

Qingyun Wu, Gagan Bansal, Jieyu Zhang, Yiran
  Wu, Beibin Li, Erkang Zhu, Li Jiang, Xiaoyun
  Zhang, Shaokun Zhang, Jiale Liu, and 1 others.
  2023. AutoGen: Enabling next-gen llm applica-
  tions via multi-agent conversation. arXiv preprint
  arXiv:2308.08155.

Guangxuan Xiao, Yuandong Tian, Beidi Chen, Song
  Han, and Mike Lewis. 2024a. Efficient streaming lan-
  guage models with attention sinks. In International
  Conference on Learning Representations (ICLR).

Guangxuan Xiao, Yuandong Tian, Beidi Chen, Song
  Han, and Mike Lewis. 2024b. Efficient streaming
  language models with attention sinks. In Interna-
  tional Conference on Learning Representations, vol-
  ume 2024, pages 21875–21895.

John Yang, Akshara Prabhakar, Karthik Narasimhan,
  and Shunyu Yao. 2023. InterCode: Standardizing
  and benchmarking interactive coding with execution
  feedback. In Advances in Neural Information Pro-
  cessing Systems (NeurIPS).

Shunyu Yao, Noah Shinn, Jeffrey Zhao, Qingyun Wu,
  and Karthik Narasimhan. 2024. τ -bench: A bench-
  mark for tool-agent-user interaction in real-world
  domains. arXiv preprint arXiv:2406.12045.

Shunyu Yao, Jeffrey Zhao, Dian Yu, Nan Du, Izhak
  Shafran, Karthik Narasimhan, and Yuan Cao. 2022.
  React: Synergizing reasoning and acting in language
  models. arXiv preprint arXiv:2210.03629.

Xinrong Zhang, Yingfa Chen, Shengding Hu, Zihang
  Xu, Junhao Chen, Moo Hao, Xu Han, Zhen Thai,
  Shuo Wang, Zhiyuan Liu, and Maosong Sun. 2024.

<!-- page break -->

Appendix A. Runtime Prompts
This appendix provides the exact system prompts used by the four evaluated runtimes. To ensure
reproducibility, all prompts are presented exactly as they were dynamically constructed and formatted in
the benchmark execution loop.
A.1 Prompt Runtime (ReAct-style)
Instructions:
{skill.instructions}

History:
Observation: {history[0].observation}
Reasoning & Action: {history[0].response}
[... Appends all previous observations and actions ...]

Latest Observation: {observation}
Generate your next reasoning and action (format ’Action: <cmd>’):

A.2 Memory-Augmented Runtime
Instructions:
{skill.instructions}

Summarized History:
{summary_string_of_past_steps}

Recent History:
Observation: {recent_observations[0]}
Response: {recent_responses[0]}
[... Appends the 3 most recent turns ...]

Latest Observation: {observation}
Generate your next reasoning and action (format ’Action: <cmd>’):

A.3 Stateful Runtime (LangGraph-style)
Instructions:
{skill.instructions}

Current State:
{json.dumps(state, indent=2)}

History:
Observation: {history[0].observation}
Response: {history[0].response}
[... Appends all previous observations and actions ...]

Latest Observation: {observation}
Update the state if necessary, provide reasoning, and output ’Action: <cmd>’.
To update state, use the format: StateUpdate: {"key": "value"}

A.4 SKILL.state Runtime
Instructions:
{skill.instructions}

Skill Execution State:
‘‘‘json
{json.dumps(state, separators=(’,’, ’:’))}
Latest Observation: {observation}

Provide your response with:

1. Step-by-step reasoning (will be discarded after execution)
2. A JSON block fenced with json ... containing both your State Patch and your Action. The JSON block
     MUST have exactly these two keys: { "state_patch": { <dict: your state updates, set keys to
    null to delete> }, "action": "<string: the exact command you want to execute>" }

<!-- page break -->

   Note: The skill.instructions placeholder dynamically injects the task-specific system prompt (e.g.,
the agent’s persona, the available action space, and the environment rules). This ensures that across all
runtime evaluations, the agent receives the exact same baseline instructions, isolating context management
as the only independent variable.

Appendix B. SkillExecBench Implementation Details
To maintain focus on the core experimental findings in Section 5, we provide the full implementation details
of the SkillExecBench environments, task generation logic, and episode trajectories in this appendix.

B.1 Environment Design
Environment 1: Warehouse Management
   • State Representation: A discrete inventory mapping of 500 independent shelves (e.g., shelf_0
     through shelf_499), where each shelf holds exactly one item string identifier or is null.

   • Action Space:

       – Store <item_id> <empty_shelf_id>
       – Ship <item_id> <shelf_id>
       – Move <item_id> <old_shelf_id> <new_shelf_id>
       – Wait

   • Observation Format: Textual alerts triggered by system events, including: Shipment arrived
     containing [item], Customer ordered [item], and Maintenance required on [shelf].

   • Transition Rules: If an agent calls Store, the environment validates the shelf is empty before
     placing the item. If Ship is called, the item is destroyed. Invalid actions (e.g., storing an item on an
     occupied shelf) return a local error observation and reject the state transition.

   • Success Criterion: The ratio of successfully executed valid actions matching the ground-truth
     deterministic simulation (Score = Successful Actions / Total Actionable Events).

Environment 2: Software Repository
   • State Representation: A simulated Git repository tracking branch histories, file contents, active
     Pull Requests (PRs), and Continuous Integration (CI) test statuses.

   • Action Space: Commit(branch, file), CreatePR(branch), Merge(pr_id), FixCI(branch),
     Wait.

   • Observation Format: CI/CD webhook notifications (e.g., CI Pipeline Failed for PR #3), code
     review comments, and issue assignments.

   • Transition Rules: Pushing a commit triggers a background CI evaluation transition. Merging a PR
     successfully transitions the master branch state and deletes the feature branch.

   • Success Criterion: The percentage of correctly resolved feature requests merged into master without
     breaking CI checks.

B.2 Task Generation
Tasks are procedurally generated using a deterministic random number generator. By seeding the generator,
we guarantee that all evaluated baseline runtimes experience the exact same sequence of events, ensuring
fair comparisons. The horizon length dictates the number of sequential events the agent must handle.

<!-- page break -->

Algorithm 2 Warehouse Task Generation Pseudo-code
 1: seed ← 42
 2: rng ← Random(seed)
 3: gt_shelves ← {shelf_0: Null, ..., shelf_499: Null}
 4: events ← []
 5: for i = 1 to Horizon do
 6:     available ← FindEmptyShelves(gt_shelves)
 7:     occupied ← FindOccupiedShelves(gt_shelves)
 8:     possible_events ← [Receive]
 9:     if occupied is not empty then
10:         possible_events.append(Order, Maintenance)
11:     end if
12:     event_type ← rng.choice(possible_events)
13:     events.append(ConstructObservation(event_type))
14:     UpdateGroundTruth(gt_shelves, event_type)
15: end for
16: return events


B.3 Example Episode Trajectory
To illustrate the execution flow, below is a concrete, single-turn trajectory for the SKILL.state runtime
operating in the Warehouse environment.
1. Observation Received (Environment → LLM)
Latest Observation:
Customer ordered item_12.

2. LLM Processing (LLM Internal)
Reasoning:
The customer ordered item_12. I need to ship it.
I will check my Skill Execution State to locate it.
Looking at the state schema, item_12 is located on shelf_42.
I must generate a Ship action and update my state to remove it from shelf_42.

3. State Update and Action Generation (LLM → Runtime)
{
    "state_patch": {
      "inventory": {
        "shelf_42": null
      }
    },
    "action": "Ship item_12 shelf_42"
}

4. Next Observation (Environment → LLM)
Latest Observation:
Success: Shipped item_12 from shelf_42.


Appendix C. Noise Construction (Experiment 2)
In Experiment 2, we evaluate the runtimes’ resilience to dense, irrelevant contextual noise. Real-world
systems rarely provide clean, perfectly isolated observation spaces; agents must constantly filter out
background telemetry, sensor logs, and system chatter to execute their instructions.
   To isolate the problem of Attention Drag, the experiments in this paper exclusively focus on Condition
1: Irrelevant Context.

<!-- page break -->

C.1 Noise Properties
For Condition 1 evaluations across both environments, the injected noise strings are defined by three strict
properties:

  1. Randomly Generated: Values such as battery percentages, temperatures, server IDs, and CPU loads
     are sampled uniformly at random during each execution step.

  2. Strictly Irrelevant: The semantic meaning of the noise has absolutely no bearing on the agent’s
     primary task (e.g., fulfilling warehouse orders or fixing CI pipelines).

  3. Non-State-Altering: The noise events never actually change the underlying ground-truth world state.
     They are purely observational distractors appended to the environment’s response payload under a —
     BACKGROUND TELEMETRY — header.

C.2 Environment 1 (Warehouse) Distractors
To simulate a realistic noisy warehouse, the generator randomly selects from the following categories to
inject irrelevant strings into the agent’s observation space:

1. Robot Telemetry Logs
Simulates continuous pinging from automated warehouse robots navigating the floor.
Battery: 85%, Temperature: 45C, CPU Load: 72%,
Speed: 1.2 m/s, Nav Confidence: 95.4%


2. Environmental Sensor Logs
Simulates passive HVAC and ambient sensor readings.
[Sensor] Humidity: 45%, Temp: 22.3C, Light: 310 lux, CO2: 450 ppm


3. Camera OCR / Vision Logs
Simulates background security camera or computer-vision object detection events.
[Camera OCR] Forklift parked.
[Camera OCR] Worker entered Zone A.
[Camera OCR] Safety Vest Detected.


C.3 Environment 2 (Software Repository) Distractors
To simulate a noisy, enterprise-scale software engineering environment, the generator continuously injects
irrelevant cloud infrastructure syslog telemetry into the agent’s terminal observations.

Syslog Telemetry
Simulates passive health-checks and CPU load warnings from disconnected remote servers running in the
background.
[Syslog] Server-42 CPU load: 88%, RAM usage: 71%
[Syslog] Server-17 CPU load: 12%, RAM usage: 45%
[Syslog] Server-91 CPU load: 99%, RAM usage: 89%


Example Corrupted Observation (Software, 3 Events):
Latest Observation:
CI Pipeline Failed for PR #3. Linter error on line 42.

--- BACKGROUND TELEMETRY ---
[Syslog] Server-42 CPU load: 88%, RAM usage: 71%
[Syslog] Server-17 CPU load: 12%, RAM usage: 45%
[Syslog] Server-91 CPU load: 99%, RAM usage: 89%

<!-- page break -->

Table 6: Software Repository Long-Horizon Execution Scaling using using Gemini-3-Flash. Baseline runtimes
suffer catastrophic O(N 2 ) context collapse, whereas SKILL.state maintains an O(1) prompt footprint.

Horizon          Runtime                Score          Avg Prompt Size           Total Tokens Consumed
10               Prompt               0.89 ±0.11           3,411 ±197                    11,670 ±841
                 Memory               0.93 ±0.09           4,379 ±234                    15,732 ±562
                 Stateful             1.00 ±0.00           4,200 ±321                    14,120 ±318
                 SKILL.state          1.00 ±0.00           2,298 ±134                     7,608 ±149
25               Prompt               0.84 ±0.05           11,754 ±608                  111,970 ±3,314
                 Memory               0.89 ±0.07            9,399 ±317                   94,629 ±2,839
                 Stateful             0.94 ±0.03           14,016 ±586                  128,702 ±3,863
                 SKILL.state          0.88 ±0.08            2,545 ±556                   21,920 ±431
50               Prompt               0.71 ±0.14          23,136 ±911                  462,118 ±13,764
                 Memory               0.65 ±0.12          35,550 ±2,412                688,182 ±23,539
                 Stateful             0.74 ±0.08          31,166 ±3,231                577,027 ±27,293
                 SKILL.state          0.86 ±0.04           2,545 ±63                    45,100 ±894
100              Prompt               0.53 ±0.16          46,270 ±1,847               1,848,500 ±55,391
                 Memory               0.57 ±0.05          71,100 ±5,836               2,752,700 ±82,467
                 Stateful             0.63 ±0.10          62,330 ±2,488               2,308,000 ±35,183
                 SKILL.state          0.78 ±0.08           2,545 ±471                   90,200 ±2,792


Appendix D. Additional Results
.1    Software Repository State Recovery Experiment 3 using Gemini-3-Flash.
.2    Extended Budget-Matched Scaling across Horizons
Table 11 presents the full multi-horizon scaling results for the budget-matched control configurations on the
Warehouse environment (T ∈ {10, 25, 50, 100}, Gemini-3-Flash), evaluated across 5 environmental seeds.
While all budget-matched runtimes perform comparably at short horizons (T = 10), sliding-window
truncation and statistical perplexity compression (LLMLingua) experience catastrophic accuracy collapse
as horizon length increases, whereas SKILL.state maintains robust performance across all horizons.

<!-- page break -->

                   Table 7: Gemma-4-31b-it Warehouse Scaling.

Horizon     Runtime       Score ± SD      Avg Prompt ± SD        Total Tokens ± SD
10 Steps    Prompt        0.90 ± 3.1%         3,145 ± 242          9,092 ± 1,231
            Memory        0.85 ± 4.2%         2,611 ± 138           7,330 ± 838
            Stateful      0.90 ± 2.8%         3,191 ± 149           9,144 ± 518
            SKILL.state   0.98 ± 1.5%         2,116 ± 212           6,814 ± 875
25 Steps    Prompt        0.64 ± 5.4%         5,720 ± 182         41,697 ± 1,610
            Memory        0.72 ± 4.8%         3,990 ± 362          28,933 ± 412
            Stateful      0.76 ± 4.1%         5,714 ± 282          39,314 ± 585
            SKILL.state   0.84 ± 3.6%         2,080 ± 114         16,302 ± 2,190
50 Steps    Prompt        0.31 ± 6.2%        10,809 ± 352         151,845 ± 2,150
            Memory        0.41 ± 5.8%         7,217 ± 316         114,113 ± 1,620
            Stateful      0.55 ± 5.1%        11,083 ± 262         155,164 ± 2,210
            SKILL.state   0.68 ± 3.9%        2,113 ± 176           33,762 ± 1,385
100 Steps   Prompt        0.21 ± 4.7%        27,686 ± 412        923,164 ± 12,400
            Memory        0.24 ± 4.2%        18,537 ± 229         701,954 ± 9,850
            Stateful      0.42 ± 4.5%        20,210 ± 822         557,968 ± 8,100
            SKILL.state   0.42 ± 4.1%        2,105 ± 216          65,480 ± 1,258


                      Table 8: Qwen 3-8b-it Warehouse Scaling.

Horizon     Runtime       Score ± SD      Avg Prompt ± SD        Total Tokens ± SD
10 Steps    Prompt        0.84 ± 3.8%         3,150 ± 245          9,150 ± 1,250
            Memory        0.80 ± 4.5%         2,640 ± 145           7,420 ± 860
            Stateful      0.84 ± 3.4%         3,210 ± 155           9,210 ± 540
            SKILL.state   0.94 ± 2.1%         2,120 ± 215           6,920 ± 890
25 Steps    Prompt        0.54 ± 6.1%         5,790 ± 195         42,450 ± 1,680
            Memory        0.62 ± 5.4%         4,050 ± 375          29,640 ± 440
            Stateful      0.66 ± 4.8%         5,780 ± 295          39,950 ± 610
            SKILL.state   0.76 ± 4.2%         2,088 ± 120         16,680 ± 2,240
50 Steps    Prompt        0.24 ± 6.5%        10,950 ± 365         154,200 ± 2,280
            Memory        0.33 ± 6.1%         7,320 ± 330         116,400 ± 1,710
            Stateful      0.44 ± 5.7%        11,210 ± 280         158,300 ± 2,340
            SKILL.state   0.58 ± 4.5%        2,118 ± 185           34,510 ± 1,420
100 Steps   Prompt        0.15 ± 5.1%        28,150 ± 430        941,500 ± 12,800
            Memory        0.18 ± 4.6%        18,840 ± 245        718,200 ± 10,200
            Stateful      0.31 ± 4.9%        20,580 ± 850         569,400 ± 8,450
            SKILL.state   0.34 ± 4.6%        2,110 ± 220          66,850 ± 1,310

<!-- page break -->

Table 9: Software Repository Experiment 2 i.e. Noise Robustness. Evaluation of runtime resilience to irrelevant
syslog telemetry (Condition 1) during a 50-step horizon using Gemini-3-Flash.

                                    Noise Level     Runtime            Score
                                    0 Events        Prompt             0.76
                                    (Baseline)      Memory             0.85
                                                    Stateful           0.88
                                                    SKILL.state        0.90
                                    5 Events        Prompt             0.62
                                    (Low)           Memory             0.85
                                                    Stateful           0.86
                                                    SKILL.state        0.88
                                    20 Events       Prompt             0.48
                                    (Medium)        Memory             0.83
                                                    Stateful           0.85
                                                    SKILL.state        0.86
                                    50 Events       Prompt             0.11
                                    (High)          Memory             0.74
                                                    Stateful           0.78
                                                    SKILL.state        0.80


Table 10: Software Repository State Recovery (Env 2, Exp 3). Comparison of hallucination lag (recovery steps)
when the repository state is altered via unstructured alerts.

                      Scenario              Runtime          Success     Recovery Steps
                      A: Force Push         Prompt              Yes              12
                                            Memory              Yes               8
                                            Stateful            Yes              10
                                            SKILL.state         Yes               0
                      B: Flaky CI Test      Prompt              Yes              14
                                            Memory              Yes               9
                                            Stateful            Yes              11
                                            SKILL.state         Yes               0
                      C: PR Closed          All Runtimes        No               N/A


Table 11: Extended Budget-Matched Scaling on Warehouse across Horizons (Gemini-3-Flash, Target Budget
∼1,800 tokens, Score ± SD across 5 seeds).

 Horizon (T )   SKILL.state   Summary-capped      Truncated (Window)          ReAct + LLMLingua   ReAct (Full)
 10              1.00 ±0.00        0.92 ±0.03             0.90 ±0.04               0.88 ±0.04       0.90 ±0.02
 25              1.00 ±0.00        0.76 ±0.04             0.62 ±0.05               0.60 ±0.05       0.92 ±0.02
 50              0.96 ±0.01        0.64 ±0.05             0.35 ±0.06               0.38 ±0.06       0.88 ±0.04
 100             0.94 ±0.01        0.52 ±0.05             0.18 ±0.05               0.22 ±0.05       0.84 ±0.07

<!-- page break -->
