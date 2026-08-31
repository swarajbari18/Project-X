# Agent Seer: Synthesizing Scenarios from Specification Understanding

> Source PDF: `2608.26133v1.pdf`
> Research purpose: Generating realistic, graded agent scenarios from tool specifications.
> Conversion: `pdftotext -layout`, orchestrated by Python

---

## Extracted text

Agent Seer: Synthesizing Scenarios from Specification Understanding


                                                Harish Karumuri                         Mahesh Vemula                 David Lopes Pegna
                                                     Apple                                 Apple                            Apple


                                                               Abstract                         dar APIs, project management systems, commu-
                                                                                                nications platforms, and internal databases are be-
                                             Evaluating AI agents that use external tools
arXiv:2608.26133v1 [cs.CL] 24 Jun 2026


                                                                                                ing used to automate workflows that previously re-
                                             requires realistic test scenarios that capture
                                                                                                quired human intervention. Despite rapid progress
                                             how practitioners compose tools and iterate
                                             across conversation turns. Constructing such
                                                                                                in agent capabilities, the evaluation of such systems
                                             scenarios by hand demands deep domain ex-          remains laborious and fragile.
                                             pertise, does not scale across tool ecosys-           Three problems limit the current state of agent
                                             tems, and produces static benchmarks that can-     evaluation:
                                             not track evolving APIs. We observe that
                                             tool specifications—function names, natural-       The curation bottleneck. Realistic evaluation
                                             language descriptions, and typed parameter         scenarios must connect user intent to specific tool
                                             schemas—already encode sufficient semantic         calls, fill parameters with plausible values, and cap-
                                             information to synthesize realistic evaluation     ture how tools chain across turns. Hand-authored
                                             scenarios without manual curation or live tool     benchmarks (Froger et al., 2026; Liu et al., 2023a;
                                             execution. Agent Seer builds off this latent in-   Yao et al., 2025) produce high-fidelity scenarios
                                             formation: from a single Model Context Proto-
                                                                                                but their coverage is bounded by curation effort;
                                             col (MCP) specification, with no examples, no
                                             live tool access, and no domain-specific tuning.   scaling such efforts across the combinatorial space
                                             This pipeline enriches raw schemas, generates      of tool pathways is impractical by hand.
                                             graded scenarios with synthetic tool outputs,
                                                                                                The static benchmark problem. A fixed bench-
                                             and expands them into mock-data-grounded
                                             multi-turn dialogues that exhibit strong tool-     mark ceases to reflect reality as tool APIs evolve.
                                             calling correctness and conversational coher-      An agent that scores highly on a snapshot bench-
                                             ence. Evaluation quality is measured by ap-        mark may be evaluated against tool descriptions
                                             plying this pipeline on seven MCP specifica-       that no longer match the production environment.
                                             tions spanning diverse domains and tool-suite
                                             sizes and measuring the tool-calling correctness   The multi-turn evaluation gap. Conversational
                                             and conversational coherence. The pipeline         agents require evaluation across interaction se-
                                             achieves strong quality across all domains, with   quences, not just single-turn prompts. Generating
                                             complete tool coverage on small and medium         multi-turn scenarios where follow-up turns react to
                                             specifications. Two findings emerge within this    specific tool outputs—rather than repeating generic
                                             analysis: parameter schema complexity is the
                                                                                                instructions—is particularly difficult without ac-
                                             strongest correlate of quality variation—tool-
                                             suite size plays a smaller, orthogonal role—and
                                                                                                cess to real tool responses.
                                             argument value accuracy is the dominant fail-         Together these define the cold-start evaluation
                                             ure mode among imperfect scenarios, a sub-         problem: producing realistic evaluation data for a
                                             dimension invisible to coarse-grained name-
                                                                                                tool suite that has none. The shortage is sharpest for
                                             match metrics.
                                                                                                new, private, or rapidly evolving APIs, and persists
                                         1   Introduction                                       across the long tail of enterprise tool suites that
                                                                                                wrap or extend publicly described systems. We
                                         The deployment of large language model (LLM)-          address it by observing that tool specifications—
                                         based agents capable of autonomously calling ex-       function names, natural-language descriptions, and
                                         ternal tools is increasingly common in enterprise      typed parameter schemas—already encode much
                                         software environments. Agents backed by calen-         of the semantic information needed to synthesize

<!-- page break -->

evaluation data: enough for an LLM to infer plausi-     logs, but for new, private, or rapidly evolving tool
ble workflows, fill parameters with realistic values,   suites no such data exists, and what does may not
synthesize what tool responses would look like,         cover niche or challenging use cases. Even when
and construct multi-turn dialogues grounded in that     curation is feasible, identifying the user goals that
synthetic data. The bottleneck shifts from human        matter and connecting them to tool sequences that
curation to structured extraction.                      reflect how practitioners compose tools, handle par-
   Agent Seer realizes this as a four-stage pipeline—   tial results, and iterate across turns requires deep
semantic interpretation, scenario generation, mock      domain expertise. Agent Seer addresses this cold-
output synthesis, and multi-turn expansion—that         start gap through execution-free harness synthesis
converts raw MCP tool specifications into self-         from a structured tool specification.
contained evaluation harnesses. Each stage con-
sumes validated structured outputs from the previ-      2.1   Agent Benchmarks
ous, so schema violations are caught at boundaries      Agent evaluation has progressed from single-
rather than propagating. The resulting harnesses        function prediction (Qin et al., 2024; Patil et al.,
are decoupled from any execution backend: any           2024) through multi-step tool use over curated API
MCP-compatible framework can consume them to            corpora (Qin et al., 2024; Lu et al., 2025; Chen
run and grade agents.                                   et al., 2024) to multi-turn, policy-grounded evalua-
   The primary contributions are:                       tion with simulated users (Yao et al., 2025; Barres
1. A spec-to-harness generation pipeline that           et al., 2025; Wang et al., 2024). General bench-
   produces complete evaluation scenarios—              marks such as GAIA (Froger et al., 2026), Agent-
   expected tool sequences, calibrated mock             Bench (Liu et al., 2023a), and WorkArena (Drouin
   tool outputs, and data-grounded multi-turn           et al., 2024) provide rich evaluation environments,
   dialogues—from MCP tool specifications               while recent MCP-centric suites—MCPVerse (Lei
   alone, without live tool execution or manual         et al., 2025), MCP-AgentBench (Guo et al., 2026),
   annotation.                                          Toolathlon (Li et al., 2026)—reflect the growing
2. A structured harness artifact format (Sec-           adoption of MCP (Anthropic, 2024) as a standard
   tion 3.5) with held-out oracles and mock out-        tool integration layer. All of these benchmarks
   puts, enabling any MCP-compatible evaluation         are constructed through manual curation or require
   framework to run agents against the generated        live tool access, and remain static once released,
   scenarios as self-contained artifacts.               leaving the cold-start problem unaddressed.
3. Empirical characterization of generation qual-
   ity and tool coverage across seven MCP speci-        2.2   Synthetic Data Generation
   fications spanning diverse enterprise domains,       Prior work on generating synthetic data falls into
   showing that quality variation is more strongly      three clusters, distinguished by their reliance on
   correlated with parameter schema complexity          live tool execution.
   than with tool-suite size, and that complete cov-
   erage is achievable on small and medium speci-       Training trajectories from live execution. The
   fications.                                           largest cluster generates fine-tuning trajectories via
4. A failure-mode characterization identifying          real tool execution: APIGen (Liu et al., 2024; Prab-
   argument sub-dimension cascading as the dom-         hakar et al., 2025) uses execution-based verifica-
   inant generation failure mechanism—a failure         tion, TOUCAN (Xu et al., 2025) scales to 1.5M
   class invisible to coarse-grained name-match         trajectories from live MCP servers, GEM (Xu et al.,
   metrics—with domain-specific signatures char-        2026) mines trajectories from text corpora, and
   acterizing where and why the pipeline falls          Agent World Model (Wang et al., 2026) synthesizes
   short.                                               RL environments. Most require live tool invoca-
                                                        tion.
2   Background and Related Work
                                                        Simulated tool environments. A second cluster
Evaluating tool-calling agents requires evaluation      replaces live tools with simulated environments—
data—scenarios, expected tool sequences, and rep-       for training: Simia (Li et al., 2025), Gecko (Zhang
resentative tool outputs. For established public        et al., 2026), LOGIGEN (Zeng et al., 2026);
APIs this can be hand-curated or mined from usage       for evaluation: τ -bench (Yao et al., 2025), τ 2 -

<!-- page break -->

bench (Barres et al., 2025), and ToolSandbox (Lu          boundaries rather than propagating downstream.
et al., 2025).
                                                          3.1   Tool Interpretation
Spec-only generation. An emerging cluster gen-
                                                          The first stage converts raw MCP tool specifica-
erates synthetic data purely from specifications.
                                                          tions into semantically-enriched descriptions. For
DiGiT-TC (Crouse et al., 2026) back-translates
                                                          each tool, the module issues a structured prompt
tool-call sequences into user requests for fine-
                                                          to an LLM requesting four semantic fields: a func-
tuning data; FuncBenchGen (Maekawa et al., 2026)
                                                          tional description, required parameters with se-
defines contamination-free task benchmarks via
                                                          mantic roles, primary use case, and organizational
DAG-modelled call dependencies.
                                                          context (prompt templates in Appendix D; output
2.3    Evaluation Methodology                             schemas in Appendix F). This connects terse API
                                                          documentation to richer scenarios.
The LLM-as-judge paradigm is well estab-
lished (Liu et al., 2023b; Kim et al., 2024; Es et al.,   3.2   Scenario Generation
2024). For tool-use evaluation, prior work uses           The scenario generation module produces realistic
exact match (Qin et al., 2024), execution success         enterprise workflow scenarios at two complexity
rate (Qin et al., 2024), and single-call binary AST       tiers. Simple scenarios target everyday operational
matching (Patil et al., 2025a). Agent GPA (Jia            tasks: single-domain, short tool call chains. Com-
et al., 2026) decomposes traces into Goal-Plan-           plex scenarios target novel, multi-domain work-
Action stages but evaluates on live task environ-         flows combining tools in sophisticated ways. Both
ments. FuncBenchGen (Maekawa et al., 2026)                tiers are implemented through prompt engineering
finds that models systematically propagate stale          rather than structural constraints.
or incorrect arguments across chained calls despite          Each generated scenario includes a title, user-
syntactic validity—a multi-step failure mode that         facing instruction, ordered list of expected tool
coarse-grained name-match metrics miss entirely,          calls with parameter values, novelty explanation,
motivating the per-argument sub-dimension decom-          and a natural follow-up question. The output
position we apply here. We draw on this methodol-         schema embeds structured reasoning trace fields:
ogy to assess generation quality along two comple-        each tool call carries a quick_explanation justifying
mentary dimensions (tool-calling correctness and          why the call is made, and each scenario includes
conversational coherence), applying LLM-as-judge          a novelty_reason explaining its evaluation value.
scoring with structured multi-dimensional prompts         These fields force the LLM to reason about tool
at each turn.                                             selection and workflow composition during genera-
2.4    Positioning                                        tion.

Agent Seer takes only tool specifications as input        3.3   Mock Output Generation
(like spec-only systems) but uses an LLM to synthe-       For each function call in the sequence, the mod-
size plausible tool responses rather than requiring a     ule produces a synthetic tool output. The pipeline
runtime environment (like simulated environments          accepts an optional example outputs field, mak-
for evaluation). The contribution is not the prompt-      ing it a spectrum: fully unsupervised from spec-
driven generation mechanism—shared with API-              ifications alone, but able to incorporate available
Gen, TOUCAN, and others—but the structure im-             traces to improve fidelity. When examples are pro-
posed on it: a four-stage pipeline with validated         vided, the generator matches their structure; when
structured outputs at each boundary, producing har-       absent, generation relies on the tool description
nesses decoupled from any execution backend. Ta-          alone. Each mock output carries a grounding tier
ble 17 in Appendix C situates these contributions         (high/medium/low) recording the availability of ref-
against prior literature.                                 erence material.
3     Pipeline Stages                                     3.4   Multi-Turn Scenario Expansion
The pipeline has four stages (schema flow in Fig-         The multi-turn expansion stage takes a scenario
ure 2, Appendix F). Each consumes validated struc-        and its mock outputs and emits a list of conver-
tured outputs from the previous stage; schema con-        sational turns (prompt template in Appendix D;
straints ensure malformed artifacts are caught at         output schema in Figure 2); the output is a list, but

<!-- page break -->

the prompt does not prescribe how many turns to              4.1    Tool-Calling Scoring
produce.                                                     The tool-calling evaluator independently scores
   Splits target natural phase boundaries so the re-         four dimensions, decomposing the coarse-grained
sulting turns exercise two multi-turn tool-calling           pass/fail signal used by most prior work (Qin et al.,
patterns formalized by BFCL v3 (Patil et al.,                2024) into orthogonal axes. An LLM judge scores
2025b): multi-step sequences, where each call de-            each sub-dimension on 0–10; scores are normal-
pends on the output of the previous one, and multi-          ized to 0–1 before aggregation.
hop patterns, where independent calls gather in-                Tool usage correctness captures neces-
formation that must be synthesized. Splitting at             sity (Huang et al., 2023)—whether a tool was
phase boundaries (rather than at arbitrary points)           warranted at all—with overuse recorded as
preserves these dependency structures across turns.          diagnostic but excluded from the aggregate, since
When the expansion yields only a single turn, it             necessity dominates appropriateness.
is discarded under the heuristic that the scenario              Tool selection correctness averages correctness,
lacked enough substance to split.                            specificity, and completeness of the chosen tools.
   When the expansion succeeds, follow-up                       Tool ordering correctness averages sequence
prompts reference concrete values from synthetic             logic, dependency handling, and execution effi-
outputs—entity names, counts, status codes—                  ciency. It is marked not applicable when only one
rather than abstract task descriptions, producing            tool is called, and is then excluded from the turn-
data-grounded multi-turn dialogues.                          level aggregate.
                                                                Tool argument correctness averages six sub-
3.5    Harness Artifact Format                               dimensions (completeness, name, value, type, for-
The four stages produce a self-contained evalu-              mat, relevancy). Cascading penalties are enforced
ation harness (Table 1). A downstream frame-                 through prompt instructions to the judge (Table 18,
work presents the prompt, feeds mock outputs                 footnote): a wrong parameter name or missing re-
as tool responses, and scores the agent’s emitted            quired parameter zeros out value, type, and format;
calls against the scenario workflow as the held-out          a wrong value cascades to type, format, and rele-
oracle—enabling evaluation on a previously unseen            vancy. A single critical error therefore collapses
tool suite without live access.                              the argument mean.
                                                                The four dimensions combine via arithmetic
 Field               Stage    Content                        mean per turn; conversation scores are the arith-
 prompt              2        Natural-language task goal     metic mean of turn scores. Per-MCP rankings and
 expected_tools      2        Ordered AgentCall objects      the schema-complexity correlation are robust to
                              (name + typed args)
 mock_outputs        3        Synthetic JSON response
                                                             harmonic-mean and minimum aggregation (Ap-
                              per call with grounding tier   pendix B); the full prompt is in Appendix E.
 conversation        4        Multi-turn dialogue; each
                              turn references mock output    4.2    Coherence Scoring
                              values
 oracle              2        expected_tools, held out       The coherence evaluator assesses five sub-aspects—
                              from the agent for scoring     logical flow, completeness, conciseness, topic rel-
                                                             evance, and context retention—scored on a 1–3
    Table 1: Fields of a generated evaluation harness.
                                                             scale, normalized to 0–1, and aggregated via arith-
                                                             metic mean (full prompt in Appendix E).

4     Generation Quality Assessment                          5     Experimental Evaluation
We assess generation quality using LLM-as-judge              We evaluate Agent Seer on seven publicly available
scoring (Liu et al., 2023b) along two complemen-             MCP specifications, analyzing the quality, cover-
tary quality dimensions: tool-calling correctness            age, and failure modes of generated evaluation sce-
(TC) and conversational coherence (Coh). The                 narios.
framework also supports oracle-grounded evalua-
tion when reference data is available; we use the            5.1    Experimental Setup
unsupervised path exclusively here, as the gener-            MCP specifications. Seven open-source MCP
ated scenarios serve as both output and oracle.              server specifications span diverse domains, tool

<!-- page break -->

counts, and schema complexity (Table 2).                     MCP                   n    TC [95% CI]        σ      Coh [95% CI]      Simp.    w̄
                                                             Illustrator (64t)     36   0.898 [.85,.94]   0.131   0.855 [.80,.91]   0.934   3.3
Sources: the official MCP reference server reposi-           Selenium (56t)        47   0.935 [.90,.96]   0.095   0.850 [.80,.90]   0.932   9.7
                                                             Redis (47t)           98   0.966 [.95,.98]   0.089   0.902 [.87,.93]   0.986   1.3
tory (Model Context Protocol, 2024) and the MCP              Git (33t)             85   0.857 [.82,.90]   0.186   0.757 [.71,.80]   0.910   2.2
                                                             Elasticsearch (20t)   49   0.930 [.90,.96]   0.108   0.902 [.86,.94]   0.987   1.9
server registry (Model Context Protocol, 2025).              Slack (16t)           35   0.886 [.84,.93]   0.135   0.938 [.91,.97]   0.934   1.4
                                                             Filesystem (14t)      41   0.876 [.82,.92]   0.163   0.825 [.77,.87]   0.925   2.0

MCP             Domain          Tools    p̄    Schema
                                                             Table 3: Unsupervised scores by MCP. TC = tool call-
Illustrator     Creative          64    3.6    Nested obj
Selenium        Browser auto.     56     1.8   Flat state    ing, Coh = coherence, Simp. = simple scenario TC, w̄ =
Redis           Data store        47     2.1   Flat k-v      mean workflow length (tools per scenario). 95% inter-
Git             Version ctrl.     33    11.2   Deep opt.     vals are percentile bootstrap (B = 10,000). All seven
Elasticsearch   Search            20     1.8   Nested DSL
Slack           Communication     16     2.2   Mixed         MCPs exceed 0.85 overall; all exceed 0.91 on simple
Filesystem      File ops.         14     1.8   Flat          scenarios.

Table 2: MCP specifications used for evaluation.
p̄ = mean parameters per tool. Schema characterizes the      5.2      Quality Results
dominant parameter structure: Flat = simple key-value        Overall quality. The pipeline achieves a mean
or primitive parameters; Nested obj/DSL = parameters
                                                             unsupervised tool-calling score of 0.911 (95% boot-
containing nested objects or domain-specific query lan-
guages; Deep opt. = deeply nested schemas with many          strap CI [0.897, 0.925]; median 0.979) and mean
optional fields; Flat state = flat parameters but stateful   coherence of 0.855 (95% CI [0.838, 0.872]; me-
sequential semantics; Mixed = combination of flat and        dian 0.933). 31.7% of records achieve a perfect
structured parameters across tools.                          tool-calling score, while only 2.3% score below
                                                             0.5. The distribution is concentrated in the up-
Generation model. All scenarios were generated               per range, reflecting consistent generation quality
using Gemini 2.5 Flash Lite with structured output           across specifications (see Figure 3 in Appendix G).
mode enabled for schema-constrained generation               Cross-family co-evaluation. To check that these
at each pipeline stage. Pipeline stages used tem-            scores reflect the generated data rather than a sin-
perature 0.7. Structured-output validation failures          gle judge family, the corpus was re-scored with
triggered up to three retries before the record was          an out-of-family judge (Qwen3.5-122B-A10B-FP8,
discarded.                                                   Alibaba; the primary judge is Google’s Gemini
Evaluation method. Generated scenarios were                  2.5 Flash). Tool-calling agrees at every grain: no
scored using Gemini 2.5 Flash at temperature                 mean shift (∆µTC ≈0, 95% CI [−0.009, +0.008]),
0 (for deterministic scoring) as the LLM judge,              record-level paired r=0.79 over n=384 paired
following the procedure described in Section 4:              records, per-MCP CIs overlap for all seven MCPs,
(1) Tool Calling: LLM-as-judge scoring across                and the MCP ranking is preserved (ρ=0.86). The
four dimensions combined via arithmetic mean,                failure-mode taxonomy replicates bilaterally: argu-
with cascading penalties on argument sub-scores              ment value-accuracy is the dominant sub-failure
enforced through prompt instructions to the judge            under both judges by a 4–5× margin (Gem-
(scale 0–1); (2) Coherence: five sub-dimensions              ini 240 records, Qwen35 252; Table 14). The
on a 1–3 raw scale, normalized to 0–1 and ag-                judges diverge on the absolute level of coherence
gregated via arithmetic mean. The full cor-                  (∆µCoh ≈ − 0.16, paired r=0.42). Coherence
pus was additionally re-scored with an out-of-               levels are therefore reported as judge-dependent;
family judge (Qwen3.5-122B-A10B-FP8, Alibaba)                MCP-level coherence rank-preservation is partial
to probe judge robustness; diagnostics appear in             (ρ=0.46), and the worst-coherence MCP differs
Appendix A.8.                                                across judges (Git under Gemini, Illustrator un-
                                                             der Qwen 3.5). Full diagnostics appear in Ap-
Scale. The pipeline generated 337 scenarios                  pendix A.8.
across the seven MCPs (Table 6 in Appendix A),
yielding 391 evaluation records. Multi-turn expan-           Quality by MCP specification. Table 3 reports
sion succeeded for 54 scenarios (16.0% overall),             per-MCP scores.
heavily skewed toward complex scenarios (30.8%                  Tool count and parameter schema complex-
expansion rate vs. 2.8% for simple), as the expan-           ity play distinct, orthogonal roles in quality
sion stage requires sufficient workflow substance            variation across this sample. At the per-MCP
to generate meaningful follow-up turns.                      grain (n = 7), tool count correlates positively

<!-- page break -->

but modestly with mean unsupervised tool-calling                Dimension    Perfect   Partial   Zero
(r = +0.40), while parameter schema complex-                    Usage         98%        1%      1%
ity correlates negatively—average parameters per                Selection     77%       19%      4%
tool (r = −0.60) and optional parameter fraction                Ordering†     71%       19%      10%
                                                                Arguments     42%       57%      1%
(r = −0.66). The two effects operate on differ-
ent axes of an MCP and do not cancel: Selenium         Table 4: Tool-calling dimension failure rates. †Ordering
(56 tools) scores 0.935 while Filesystem (14 tools)    is evaluated only when multiple tools are called (n =
scores 0.876, but Git (33 tools, 11.2 average param-   181).
eters) is the lowest at 0.857.
   To strengthen the inferential basis of these per-
                                                       5.3   Failure Mode Analysis
MCP observations, we additionally disaggregate
to the tool level. Across the 222 unique in-spec       Tool-calling dimension failures. Table 4 reports
tools appearing in any generated scenario, parame-     per-dimension failure rates. Usage is near-perfect;
ter count and optional-fraction both correlate neg-    selection is correct on 77% of records (4% zeros,
atively with mean unsupervised TC (r = −0.29           reflecting the cost of choosing among semantically
and −0.30, both p < 0.001), confirming the per-        similar tools); ordering fails on 10% of multi-tool
MCP direction at a substantially larger sample. The    scenarios. Argument correctness is the dominant
same schema features also correlate negatively with    challenge: only 42% of records score perfectly and
mean coherence at the tool level (r = −0.41 and        57% score partial, driven by value-accuracy errors
−0.34, both p < 0.001). This second finding—not        that degrade scores without collapsing them.
detectable at the per-MCP grain—suggests com-
                                                       Argument failure patterns. Value accuracy
plex parameters degrade not only tool-calling cor-
                                                       dominates argument failures (223 records), fol-
rectness but also the agent’s ability to communicate
                                                       lowed by relevancy (44), format (35), type (31),
cleanly around those tools.
                                                       completeness (16), and name accuracy (11).
   Coherence tells a different story: Slack achieves
                                                       Counts attribute each failing record to its lowest-
the highest coherence (0.938) because its scenar-
                                                       scored sub-dimension (single assignment); the
ios follow structured messaging patterns that pro-
                                                       judge-comparison appendix (Table 14) uses the
duce natural conversational flow, while Git has the
                                                       looser criterion of any sub-dimension scoring be-
lowest (0.757) because version control workflows
                                                       low 1.0, which yields larger per-sub-dimension to-
involve complex multi-step operations with tech-
                                                       tals. The pipeline reliably generates correct param-
nical context. The two dimensions remain weakly
                                                       eter names and types but struggles with precise
correlated at the unit of evaluation: record-level
                                                       values, particularly for optional parameters with
r = +0.23 (n = 381) and tool-level r = +0.16
                                                       ambiguous semantics.
(n = 222, p = 0.016). The cross-MCP correla-
tion between MCP means is higher (r = +0.57,           Failure concentration by MCP. Failures are
n = 7) but reflects aggregation effects rather than    sparse and unevenly distributed: Git shows the
a stronger underlying relationship. TC and coher-      highest record-level failure rate, followed by
ence therefore provide largely independent diag-       Filesystem and Redis; the other four MCPs
nostic signals across grains.                          are near-zero.    Per-domain breakdowns and
                                                       aggregation-rule sensitivity appear in Appen-
Complexity breakdown. Complex scenarios de-            dices A.6 and B.
grade by −7.3pp relative to simple ones in tool
calling (0.949 [95% CI 0.932, 0.965] → 0.877           Illustrative failure: Redis argument ambiguity.
[0.855, 0.897]) and −5.3pp in coherence (0.883         A representative pattern occurs in Redis, where sev-
[0.857, 0.908] → 0.830 [0.807, 0.853]); the sim-       eral commands carry optional parameters that the
ple/complex CIs are non-overlapping in both di-        pipeline omits when context implies them. The set
mensions. The effect varies by domain (Table 7 in      tool, for example, accepts an optional expiration
Appendix A): Elasticsearch shows the largest degra-    field that is frequently skipped when the scenario
dation (−12.2pp), followed by Git (−11.1pp, from       implies time-bounded storage. The pipeline consis-
0.910 to 0.799). Selenium is stable (0.932→0.935),     tently generates the correct function name, key, and
suggesting that its long sequential workflows are      value arguments but omits this expiry parameter,
no harder to compose at higher complexity.             which the argument scoring framework flags as a

<!-- page break -->

completeness sub-dimension failure; a coarse name-            MCP             Spec   Used   Cov.    Gini
match metric would score these records as fully               Illustrator      64      36    56%    0.331
correct. This pattern—correct tool selection with             Selenium         56      56   100%    0.676
                                                              Redis            47      47   100%    0.146
subtly incomplete argument specification—is the               Git              33      33   100%    0.340
primary driver of Redis failures and illustrates why          Elasticsearch    20      20   100%    0.198
argument correctness must be decomposed below                 Slack            16      16   100%    0.177
                                                              Filesystem       14      14   100%    0.294
the function-call level: without the sub-dimension
breakdown, the dominant failure mode in this do-        Table 5: Tool coverage and usage uniformity. Gini
main is invisible.                                      coefficient measures inequality (lower = more uniform).
Illustrative failures: Git’s two mechanisms.
Git failures decompose into two distinct mech-          5.4   Domain Cluster Analysis
anisms operating at different scenario complexi-
ties. The first, observable on simple scenarios,        Grouping MCPs by target system type lets struc-
is tool-name hallucination: in three Git scenar-        tural differences within each cluster act as a natural
ios the pipeline emits real Git CLI commands that       experiment. Data Store (Redis, Elasticsearch) pairs
are not in the MCP specification (fetch, revert,        near-identical profiles and yields near-identical
filter-repo), a pretraining-knowledge leak past         quality (∆0.036 TC). Developer/File (Filesystem,
the spec. These three records account for half of       Git) spans a 6× parameter-density gap (1.8 vs.
Git’s six records with TC<0.5 and for the gap be-       11.2) but only ∆0.019 in TC, with the cost local-
tween Git’s simple-scenario TC (0.910) and the          ized to argument correctness (Git 0.780, Filesystem
other six MCPs (0.93–0.99 simple). Across the full      0.894) while strong selection and ordering compen-
corpus, hallucinated calls are 0.336% of all tool       sate. Application/UI (Illustrator, Selenium) is the
invocations (3 of 893), entirely concentrated in Git.   most semantically distant pair: Selenium (0.935
   The second mechanism, observable on complex          TC, 56 tools) outperforms Illustrator (0.898 TC, 64
scenarios, is parameter overload—localized to spe-      tools) because its low parameter density enables
cific high-parameter tools rather than the full MCP.    reliable argument generation in long sequential
Git tools average 11.2 parameters (3× the next          chains.
highest), 95% optional, and the ref parameter ap-
                                                        5.5   Coverage and Diversity
pears in seven tools with different semantics (“com-
mits starting from” in log, “compare against” in        Tool coverage. Table 5 reports the fraction of
diff, “show object at” in show). The pipeline           available tools exercised. Within the small-to-
selects the right tool (selection score 0.802) but      medium range (14–56 tools), every tool in Redis,
generates incorrect parameter values, producing a       Selenium, Git, Elasticsearch, Slack, and Filesys-
mean argument score of 0.780—the lowest of any          tem appears in at least one generated scenario. The
MCP. The bottom-fifteen tools by unsupervised TC        only specification beyond that range, Illustrator (64
across the corpus include five Git tools (blame, add,   tools), reaches 56%—the only evidence of a cover-
commit, log, show), all high in parameter density.      age ceiling in this experiment.
Complex Git scenarios degrade further (arguments
                                                        Usage uniformity. The Gini coefficient over
0.726) as multi-tool workflows compound per-call
                                                        each MCP’s tool-usage frequency distribution
parameter errors.
                                                        ranges from 0.146 (Redis) to 0.340 (Git)—near-
Coherence taxonomy and cross-dimension pat-             uniform sampling. Selenium is the outlier (0.676),
tern. The most frequent coherence issues are            with long sequential workflows (mean 9.7 calls)
missing information or shallow response (373            concentrating usage on core navigation and inter-
records), off-topic (130), non-sequitur (86), and       action tools. Across all MCPs, the pipeline yields
self-contradiction or hallucination (85); the full      781 unique co-occurrence pairs from 138 multi-
taxonomy is in Table 10. Record-level TC and            tool scenarios and 108 unique scenario categories
Coh remain weakly correlated (r=0.23), and the          (Appendix A.5).
“correct tools, poor coherence” quadrant (23% of
records at a 0.75 threshold) spans all MCPs rather      5.6   Summary of Findings
than concentrating in one domain—coherence              Across 337 scenarios on seven MCPs, the pipeline
shortfalls are a general pipeline property.             achieves mean TC 0.911 and mean coherence 0.855

<!-- page break -->

with complete tool coverage on small and medium         in n = 7 specifications and should be read as obser-
specifications. The principal observations:             vations within the experiment rather than universal
1. Parameter schema complexity is the                   claims; the durable contribution is the methodol-
   strongest correlate of quality variation in          ogy, which produces harnesses as reusable artifacts
   this sample; tool-suite size plays a smaller,        that feed live tool environments (Yao et al., 2025)
   orthogonal role. Schema correlations are nega-       or simulated agents (Li et al., 2025)—closing the
   tive at both grains (per-MCP r = −0.60/−0.66         cold-start evaluation gap for MCP-compatible tool
   on TC; tool-level r = −0.29/−0.30 on TC              suites.
   and −0.41/−0.34 on coherence, p < 0.001
   throughout); tool count correlates positively but    Limitations
   modestly with TC (r = +0.40 per-MCP).
                                                        Ground truth reliability. The most significant lim-
2. All seven MCPs exceed 0.91 on simple
                                                        itation is reliance on LLM-generated ground truth,
   scenarios—including Git despite 11.2 avg
                                                        which introduces systematic biases from the gener-
   params per tool—and complex scenarios de-
                                                        ating model. The framework is best understood as
   grade by 7.3pp on average. Domain clusters con-
                                                        a proxy evaluation tool that identifies broad capa-
   firm the pattern: same-profile pairs yield similar
                                                        bility gaps and relative performance differences.
   TC; differing-profile pairs stay close when pa-
   rameter density dominates.                              Cross-call referential integrity. Mock outputs
3. TC and coherence provide largely independent         for sequential calls are currently generated indepen-
   diagnostic signals (record-level r = +0.23,          dently, meaning IDs or values may not align across
   tool-level r = +0.16), with characteristic inver-    dependent calls. A shared state dictionary across a
   sions (Slack high coherence, low TC; Selenium        workflow would address this.
   best ordering).                                         Coverage ceiling.         At 64 tools (Illustra-
4. Argument correctness is the primary chal-            tor), coverage drops to 56%. Targeted genera-
   lenge: 57% of records score partial on ar-           tion strategies—such as iterative generation with
   guments, value-accuracy dominant; on Git,            coverage-aware tool sampling—would be needed
   failures decompose into pretraining-leak tool-       for larger specifications.
   name hallucination on simple scenarios and              Specification scope. Cross-domain harness
   parameter-overload localized to a handful of         generation and analysis spanning multiple MCP
   high-parameter tools on complex scenarios.           specifications in a single workflow is structurally
5. Headline tool-calling and the dominant               straightforward within the existing pipeline as
   argument-value-accuracy failure mode are             well, but is outside the scope of this evalu-
   robust to an out-of-family judge swap (paired        ation and remains a rich direction for future
   r≈0.79 on TC, MCP rank ρ=0.86); absolute             work. Extension to other spec formats (OpenAPI,
   coherence levels and MCP-level coher-                gRPC, function-calling schemas) is similarly struc-
   ence rank-preservation are judge-dependent           turally straightforward—the same name + typed-
   (Appendix A.8).                                      parameter scaffolding is present—and is a natural
                                                        next step for evaluating the framework’s generality.
6   Conclusion                                             Complexity stratification. The simple/complex
                                                        distinction uses prompt framing rather than struc-
We have presented Agent Seer, a four-stage              tural enforcement. Post-generation filters based
pipeline that converts MCP tool specifications          on structural complexity metrics would improve
into complete evaluation harnesses—graded scenar-       stratification.
ios, mock tool outputs, and multi-turn dialogues—          Experimental scope. Seven MCP specifications
without live tool execution or manual annotation.       and a single generation model (Gemini 2.5 Flash
Across seven structurally diverse specifications, the   Lite) cannot establish universal claims. Multi-turn
pipeline reaches full tool coverage on small and        evaluation records are limited (n = 54), with ex-
medium MCPs and surfaces consistent diagnos-            pansion heavily skewed toward complex scenarios
tic patterns: parameter schema complexity is the        (30.8% expansion rate) versus simple scenarios
strongest correlate of quality variation in this sam-   (2.8%), reflecting the stage’s dependence on suffi-
ple, and argument value accuracy is the dominant        cient workflow substance to generate meaningful
remaining sub-failure. These findings are grounded      follow-up turns. This constrains statistical power

<!-- page break -->

for multi-turn findings.                                 Maxwell Crouse, Ibrahim Abdelaziz, Kshitij Fad-
   LLM-as-judge circularity. Both generation              nis, Siva Sankalp Patel, Kinjal Basu, Chulaka Gu-
                                                          nasekara, Sadhana Kumaravel, Asim Munawar, and
and quality verification rely on LLMs, raising
                                                          Pavan Kapanipathi. 2026. Simulating complex multi-
the concern that scenarios that “look good to an          turn tool calling interactions in stateless execution
LLM” score well regardless of actual quality. We          environments. Preprint, arXiv:2601.19914.
address this in two ways. First, an evaluator–
                                                         Alexandre Drouin, Maxime Gasse, Massimo Caccia,
generator capability gap: the judge (Gemini 2.5            Issam H. Laradji, Manuel Del Verme, Tom Marty,
Flash) has surplus capacity over the weaker gen-           David Vazquez, Nicolas Chapados, and Alexandre
erator (Gemini 2.5 Flash Lite), consistent with            Lacoste. 2024. WorkArena: How capable are web
teacher–student evaluation paradigms; empirically,         agents at solving common knowledge work tasks?
                                                           In Proceedings of the 41st International Conference
Section 5 shows the judge discriminates mean-
                                                           on Machine Learning, volume 235 of Proceedings
ingful, domain-specific failure patterns (argument         of Machine Learning Research, pages 11642–11662.
cascading, semantic ambiguity in Redis) rather             PMLR.
than producing uniformly high scores. Second,
                                                         Shahul Es, Jithin James, Luis Espinosa-Anke, and
an out-of-family replication: re-scoring the full          Steven Schockaert. 2024. RAGAS: Automated evalu-
391-record corpus with Qwen3.5-122B-A10B-FP8               ation of retrieval augmented generation. In Proceed-
(Alibaba family) yields paired Pearson r≈0.79 on           ings of the 18th European Chapter of the Association
tool-calling (n=384) with no mean shift, preserves         for Computational Linguistics (System Demonstra-
                                                           tions). ArXiv:2309.15217.
the MCP ranking (ρ=0.86), and reproduces the
dominant argument value-accuracy failure mode bi-        Romain Froger, Pierre Andrews, Matteo Bettini, Amar
laterally (Gemini 240 records, Qwen 3.5 252; 4–5×          Budhiraja, Ricardo Silveira Cabral, Virginie Do,
margin over the next sub-dim under both judges).           Emilien Garreau, Jean-Baptiste Gaya, Hugo Lau-
                                                           rençon, Maxime Lecanu, Kunal Malkan, Dheeraj
Coherence shows a systematic stricter-judge shift          Mekala, Pierre Ménard, Gerard Moreno-Torres
(∆µ≈ − 0.16) with moderate record-level correla-           Bertran, Ulyana Piterbarg, Mikhail Plekhanov, Math-
tion (r=0.42); absolute coherence levels and MCP-          ieu Rita, Andrey Rusakov, Vladislav Vorotilov, and
level coherence rank-preservation should therefore         5 others. 2026. Gaia2: Benchmarking LLM agents
                                                           on dynamic and asynchronous environments. In Pro-
be read as judge-dependent. Full agreement tables,         ceedings of the Fourteenth International Conference
per-MCP bootstrap CIs under both judges, and the           on Learning Representations.
Bland–Altman analysis appear in Appendix A.8.
A systematic human evaluation study correlating          Zikang Guo, Benfeng Xu, Chiwei Zhu, Wentao Hong,
                                                           Xiaorui Wang, and Zhendong Mao. 2026. MCP-
framework scores with human quality judgments              AgentBench: Evaluating real-world language agent
remains an important direction for future work.            performance with MCP-mediated tools. In Proceed-
                                                           ings of the AAAI Conference on Artificial Intelligence,
                                                           volume 40, pages 30888–30896.
References
                                                         Yue Huang, Jiawen Shi, Yuan Li, Chenrui Fan, Siyuan
Anthropic. 2024. Model context protocol. https://          Wu, Qihui Zhang, Yixin Liu, Pan Zhou, Yao Wan,
  modelcontextprotocol.io.                                 Neil Zhenqiang Gong, and Lichao Sun. 2023. Meta-
Victor Barres, Honghua Dong, Soham Ray, Xujie Si,          Tool benchmark for large language models: Deciding
  and Karthik Narasimhan. 2025. τ 2 -bench: Evaluat-       whether to use tools and which to use. Preprint,
  ing conversational agents in a dual-control environ-     arXiv:2310.03128.
  ment. Preprint, arXiv:2506.07982.                      Allison Sihan Jia, Daniel Huang, Nikhil Vytla, Seung
Tommaso Castellani, Naimeng Ye, Daksh Mittal, Thom-        Won Wilson Yoo, Nirvika Choudhury, Shayak Sen,
  son Yen, and Hongseok Namkoong. 2025. Synth-             John C. Mitchell, and Anupam Datta. 2026. What is
  Tools: A framework for scaling synthetic tools for       your agent’s gpa? a framework for evaluating agent
  agent development. Preprint, arXiv:2511.09572.           goal-plan-action alignment. arXiv:2510.08847.

Zehui Chen, Weihua Du, Wenwei Zhang, Kuikun              Seungone Kim, Juyoung Suk, Shayne Longpre,
  Liu, Jiangning Liu, Miao Zheng, Jingming Zhuo,           Bill Yuchen Lin, Jamin Shin, Sean Welleck, Graham
  Songyang Zhang, Dahua Lin, Kai Chen, and Feng            Neubig, Moontae Lee, Kyungjae Lee, and Minjoon
  Zhao. 2024. T-eval: Evaluating the tool utilization      Seo. 2024. Prometheus 2: An open source language
  capability of large language models step by step. In     model specialized in evaluating other language mod-
  Proceedings of the 62nd Annual Meeting of the As-        els. In Proceedings of the 2024 Conference on Empir-
  sociation for Computational Linguistics (Volume 1:       ical Methods in Natural Language Processing, pages
  Long Papers), pages 9510–9529, Bangkok, Thailand.        4334–4353, Miami, Florida, USA. Association for
  Association for Computational Linguistics.               Computational Linguistics.

<!-- page break -->

Fei Lei, Yibo Yang, Wenxiu Sun, and Dahua Lin. 2025.         reference and example MCP server implementations.
  MCPVerse: An expansive, real-world benchmark for           Accessed: 2026-03-27.
  agentic tool use. Preprint, arXiv:2508.16260.
                                                           Model Context Protocol. 2025. MCP server registry.
Junlong Li, Wenshuo Zhao, Jian Zhao, Weihao Zeng,           https://registry.modelcontextprotocol.io.
  Haoze Wu, Xiaochen Wang, Rui Ge, Yuxuan Cao,              Official registry of MCP servers. Accessed:
  Yuzhen Huang, Wei Liu, Junteng Liu, Zhaochen Su,          2026-03-27.
  Yiyang Guo, Fan Zhou, Lueyang Zhang, Juan Miche-
                                                           Shishir G. Patil, Huanzhi Mao, Charlie Cheng-Jie Ji,
  lini, Xingyao Wang, Xiang Yue, Shuyan Zhou, and 2
                                                             Fanjia Yan, Vishnu Suresh, Ion Stoica, and Joseph
  others. 2026. The tool decathlon: Benchmarking lan-
                                                             E. Gonzalez. 2025a. The Berkeley Function Calling
  guage agents for diverse, realistic, and long-horizon
                                                             Leaderboard (BFCL): From tool use to agentic eval-
  task execution. arXiv:2510.25726.
                                                             uation of large language models. In Forty-second
Yuetai Li, Huseyin A Inan, Xiang Yue, Wei-Ning Chen,         International Conference on Machine Learning.
  Lukas Wutschitz, Janardhan Kulkarni, Radha Pooven-       Shishir G. Patil, Huanzhi Mao, Charlie Cheng-Jie Ji,
  dran, Robert Sim, and Saravan Rajmohan. 2025. Sim-         Fanjia Yan, Vishnu Suresh, Ion Stoica, and Joseph
  ulating environments with reasoning models for agent       E. Gonzalez. 2025b. The berkeley function calling
  training. Preprint, arXiv:2511.01824.                      leaderboard (BFCL): From tool use to agentic eval-
                                                             uation of large language models. In Forty-second
Xiao Liu, Hao Yu, Hanchen Zhang, Yifan Xu, Xuanyu
                                                             International Conference on Machine Learning.
  Lei, Hanyu Lai, Yu Gu, Hangliang Ding, Kaiwen
  Men, Kejuan Yang, Shudan Zhang, Xiang Deng, Ao-          Shishir G. Patil, Tianjun Zhang, Xin Wang, and
  han Zeng, Zhengxiao Du, Chenhui Zhang, Sheng               Joseph E. Gonzalez. 2024. Gorilla: Large language
  Shen, Tianjun Zhang, Yu Su, Huan Sun, and 3 others.        model connected with massive apis. In Advances in
  2023a. AgentBench: Evaluating LLMs as agents.              Neural Information Processing Systems.
  Preprint, arXiv:2308.03688.
                                                           Akshara Prabhakar, Zuxin Liu, Weiran Yao, Jianguo
Yang Liu, Dan Iter, Yichong Xu, Shuohang Wang,               Zhang, Ming Zhu, Shiyu Wang, Zhiwei Liu, Tulika
  Ruochen Xu, and Chenguang Zhu. 2023b. G-eval:              Awalgaonkar, Haolin Chen, Thai Hoang, Juan Car-
  NLG evaluation using gpt-4 with better human align-        los Niebles, Shelby Heinecke, Huan Wang, Silvio
  ment. In Proceedings of the 2023 Conference on             Savarese, and Caiming Xiong. 2025. APIGen-MT:
  Empirical Methods in Natural Language Processing,          Agentic pipeline for multi-turn data generation via
  pages 2511–2522, Singapore. Association for Com-           simulated agent-human interplay. In Advances in
  putational Linguistics.                                    Neural Information Processing Systems.

Zuxin Liu, Thai Hoang, Jianguo Zhang, Ming Zhu,            Yujia Qin, Shihao Liang, Yining Ye, Kunlun Zhu, Lan
  Tian Lan, Shirley Kokane, Juntao Tan, Weiran Yao,          Yan, Yaxi Lu, Yankai Lin, Xin Cong, Xiangru Tang,
  Zhiwei Liu, Yihao Feng, Rithesh Murthy, Liangwei           Bill Qian, Sihan Zhao, Lauren Hong, Runchu Tian,
  Yang, Silvio Savarese, Juan Carlos Niebles, Huan           Ruobing Xie, Jie Zhou, Mark Gerstein, Dahai Li,
  Wang, Shelby Heinecke, and Caiming Xiong. 2024.            Zhiyuan Liu, and Maosong Sun. 2024. ToolLLM:
  APIGen: Automated pipeline for generating verifi-          Facilitating large language models to master 16000+
  able and diverse function-calling datasets. In Ad-         real-world APIs. In The Twelfth International Con-
  vances in Neural Information Processing Systems,           ference on Learning Representations.
  volume 37, pages 54463–54482.
                                                           Zhenzhen Ren, Xinpeng Zhang, Zhenxing Qian, Yan
Jiarui Lu, Thomas Holleis, Yizhe Zhang, Bernhard Au-         Gao, Yu Shi, Shuxin Zheng, and Jiyan He. 2025.
   mayer, Feng Nan, Haoping Bai, Shuang Ma, Shen             GTM: Simulating the world of tools for AI agents.
   Ma, Mengyu Li, Guoli Yin, Zirui Wang, and Ruom-           arXiv:2512.04535.
   ing Pang. 2025. ToolSandbox: A stateful, conver-        Abhigya Verma, Seganrasan Subramanian, Nandhaku-
   sational, interactive evaluation benchmark for LLM        mar Kandasamy, and Naman Gupta. 2025. FABRIC:
   tool use capabilities. In Findings of the Association     Framework for agent-based realistic intelligence cre-
   for Computational Linguistics: NAACL 2025, pages          ation. Preprint, arXiv:2510.17995.
   1160–1183, Albuquerque, New Mexico. Association
   for Computational Linguistics.                          Xingyao Wang, Zihan Wang, Jiateng Liu, Yangyi Chen,
                                                             Lifan Yuan, Hao Peng, and Heng Ji. 2024. Mint:
Seiji Maekawa, Jackson Hassell, Pouya Pezeshkpour,           Evaluating llms in multi-turn interaction with tools
  Tom Mitchell, and Estevam Hruschka. 2026. To-              and language feedback. In Proceedings of the Twelfth
  wards reliable benchmarking: A contamination free,         International Conference on Learning Representa-
  controllable evaluation framework for multi-step           tions.
  LLM function calling. In The Fourteenth Interna-
  tional Conference on Learning Representations.           Zhaoyang Wang, Canwen Xu, Boyi Liu, Yite Wang, Si-
                                                             wei Han, Zhewei Yao, Huaxiu Yao, and Yuxiong He.
Model Context Protocol. 2024. Reference MCP                  2026. Agent world model: Infinity synthetic environ-
 servers.      GitHub, https://github.com/                   ments for agentic reinforcement learning. Preprint,
 modelcontextprotocol/servers.        Official               arXiv:2602.10090.

<!-- page break -->

Zhangchen Xu, Adriana Meza Soria, Shawn Tan,                    MCP             Simple    Complex          ∆
  Anurag Roy, Ashish Sunil Agrawal, Radha Pooven-               Illustrator     0.934      0.865       −0.069
  dran, and Rameswar Panda. 2025. Toucan: Synthe-               Selenium        0.932      0.935       +0.003
  sizing 1.5m tool-agentic data from real-world mcp             Redis           0.986      0.943       −0.043
  environments. Preprint, arXiv:2510.01179.                     Git             0.910      0.799       −0.111
                                                                Elasticsearch   0.987      0.865       −0.122
Zhihao Xu, Rumei Li, Jiahuan Li, Rongxiang Weng,                Slack           0.934      0.840       −0.094
  Jingang Wang, Xunliang Cai, and Xiting Wang. 2026.            Filesystem      0.925      0.834       −0.091
  Unlocking implicit experience: Synthesizing tool-use
  trajectories from text. arXiv:2601.10355.               Table 7: Tool-calling scores by complexity tier and
                                                          MCP.
Shunyu Yao, Noah Shinn, Pedram Razavi, and Karthik
  Narasimhan. 2025. τ -bench: A benchmark for tool-
  agent-user interaction in real-world domains. In Pro-
  ceedings of the Thirteenth International Conference
                                                          A.3   Coherence Sub-Dimensions
  on Learning Representations.

Yucheng Zeng, Weipeng Lu, Linyun Liu, Shupeng Li,         Table 8 reports mean scores for each of the five co-
  Zitian Qu, Chenghao Zhu, Shaofei Li, Zhengdong          herence sub-dimensions on the raw 1–3 scale used
  Tan, Mengyue Liu, Haotian Zhao, Zhe Zhou, and
  Jianmin Wu. 2026. Logigen: Logic-driven genera-         by the judge. Conciseness is near-ceiling across
  tion of verifiable agentic tasks. arXiv:2603.00540.     all domains (mean 2.90, std 0.33), indicating the
                                                          pipeline reliably produces appropriately scoped re-
Zeyu Zhang, Guohao Li, Zhenchang Xing, Alexandros         sponses without unnecessary elaboration. Com-
  Apostolopoulos, Yu Lin Lee, and Liang Zheng. 2026.
  Gecko: A simulation environment with stateful feed-     pleteness is the primary bottleneck (mean 2.04),
  back for refining agent tool calls. arXiv:2602.19218.   driven by responses that address the user’s re-
                                                          quest but omit contextual detail that a practitioner
A     Extended Experimental Results                       would expect—the most actionable target for future
                                                          pipeline improvements.
A.1    Evaluation Scale
Table 6 breaks down the 337 generated scenarios
and 391 evaluation records by MCP specification.                      Sub-dimension       Mean      Std.
Records exceed scenarios because multi-turn sce-                      Conciseness         2.90     0.33
                                                                      Context retention   2.78     0.59
narios contribute one record per turn (single-turn                    Logical flow        2.64     0.75
entry plus one multi-turn entry per additional turn).                 Topic relevance     2.47     0.85
                                                                      Completeness        2.04     0.93
                          Scenarios   Records
                                                          Table 8: Coherence sub-dimension scores (raw 1–3
          Illustrator           27        36
                                                          scale).
          Selenium              34        47
          Redis                 96        98
          Git                   72        85
          Elasticsearch         42        49
          Slack                 33        35              A.4   Grounding Tiers
          Filesystem            33        41
          Total                337       391
                                                          Table 9 defines the grounding tiers assigned to each
    Table 6: Evaluation scale by MCP specification.
                                                          mock output at Stage 3. The tier records how much
                                                          reference material was available to the LLM when
                                                          generating the synthetic tool response: high when
A.2    Complexity Breakdown                               concrete example outputs were present in the tool
Table 7 reports mean tool-calling scores split by         specification, medium when similar tools provided
complexity tier (simple vs. complex) for each MCP.        transferable examples, and low when generation
The ∆ column shows the score change from sim-             relied on the parameter schema alone. In the cur-
ple to complex; a negative value indicates quality        rent experiments, all seven MCP specifications lack
degradation under higher complexity. Elasticsearch        example outputs, so all 871 mock calls are anno-
shows the largest degradation (−12.2pp), followed         tated as low. The annotation is carried through to
by Git (−11.1pp). Selenium is notably stable, scor-       the harness artifact for downstream filtering when
ing slightly higher on complex scenarios.                 specs with richer documentation are used.

<!-- page break -->

        Tier        Condition                               A.7     Per-MCP Dimension Scores
        high        Concrete example outputs exist
        medium      Examples from similar functions
        low         No examples available

Table 9: Grounding tiers for mock output generation.
                                                                  MCP             Usage   Select   Order   Args
                                                                  Illustrator     0.996   0.835    0.800   0.872
                                                                  Selenium        0.965   0.891    0.989   0.890
A.5     Workflow Composition and Category                         Redis           1.000   0.954    0.823   0.952
        Diversity                                                 Git             0.988   0.802    0.761   0.780
                                                                  Elasticsearch   1.000   0.868    0.790   0.907
                                                                  Slack           1.000   0.867    0.576   0.865
                                                                  Filesystem      1.000   0.791    0.659   0.894
Selenium generates the longest workflows (mean
9.71 calls, max 17) reflecting the sequential nature        Table 11: Mean TC dimension scores by MCP (overall).
of browser automation tasks. Illustrator workflows          Selenium’s ordering (0.989) is the highest of any MCP,
are also long (mean 3.33, max 12), while Redis              despite having the longest workflows. Git’s arguments
(mean 1.27) and Slack (mean 1.39) tend toward               (0.780) are weakest, consistent with its high parameter
atomic single-tool scenarios. Category count (108           density.
unique categories across 337 scenarios; 3.1 scenar-
ios per category) scales with scenario count rather
than tool count.


                                                            A.8     Out-of-Family Judge Replication
A.6     Failure Details


Failure concentration by MCP. Git exhibits the              To assess whether reported scores are artifacts
highest failure rate: 7% of records score below 0.5,        of within-family judge circularity, the full 391-
followed by Filesystem (5%) and Redis (1%); four            record evaluation corpus was re-scored with an
MCPs have zero failures. Git’s failures are driven          out-of-family judge: Qwen3.5-122B-A10B-FP8
by argument correctness for tools with complex              (Alibaba family; vLLM-hosted, FP8 quantization).
parameter schemas.                                          Each record’s existing chat transcript was replayed
                                                            against the alternate judge with only the evaluator
                                                            model swapped; the generation pipeline and rubric
                                                            are unchanged. After joining on the composite
Argument failure patterns. Among argument
                                                            key (MCP, conversation_id), 384 records have
failures, value accuracy is the dominant sub-
                                                            paired tool-calling scores and 380 have paired co-
dimension (223 records), followed by relevancy
                                                            herence scores under both judges; all paired statis-
(44), format compliance (35), type compliance (31),
                                                            tics below are computed on these sets.
completeness (16), and name accuracy (11).


      Issue Group                                Count
      Missing info / shallow response                 373
      Off-topic or wrong focus                        130
      Non-sequitur or topic shift                      86
                                                            Per-MCP means with bootstrap CIs. Table 12
      Self-contradiction / hallucination               85   reports per-MCP means and 95% percentile boot-
      Ignores user constraints                         54   strap CIs (B=2,000) under both judges. Tool-
      No shared context (eval artifact)                44
      Unnecessary elaboration                          35
                                                            calling CIs overlap for every MCP. Coherence CIs
      Lost thread / forgot prior info                  13   are disjoint for all seven MCPs (the Qwen 3.5 judge
                                                            is systematically lower), and the identity of the
Table 10: Coherence issue taxonomy grouped from             worst-coherence MCP differs across judges (Git
evaluator notes.                                            under Gemini, Illustrator under Qwen 3.5).

<!-- page break -->

MCP             n    TC Gem.        TC Qwen         Coh Gem.   Coh Qwen      dimension scored below 1.0 under each judge.
Redis           98       0.966           0.964       0.902       0.766       Both judges identify value_accuracy as the dom-
Elasticsearch   49       0.930           0.935       0.902       0.744
Illustrator     36       0.898           0.821       0.855       0.604       inant argument failure mode by a 4–5× margin
Slack           35       0.886           0.884       0.938       0.707
Filesystem      41       0.876           0.871       0.825       0.701       over the next-highest sub-dimension, replicating
Git             85       0.857           0.858       0.757       0.647       the central qualitative finding of Section 5; counts
Selenium        47       0.935           0.919       0.850       0.655
                                                                             are within 5% across judges.
Table 12: Per-MCP means under the Gemini judge
(gemini-2.5-flash-lite) and the Qwen 3.5 judge                                                                               Sub-dimension                                                       Gemini                                        Qwen 3.5
(Qwen3.5-122B-A10B-FP8). n counts come from the                                                                              value_accuracy                                                                                 240                                252
(MCP, conversation_id) join, which preserves all                                                                             relevancy                                                                                       53                                 54
records; Gemini means match those reported in Table 3.                                                                       format_compliance                                                                               46                                 58
95% bootstrap CIs (omitted for space) overlap for every                                                                      type_compliance                                                                                 46                                 42
MCP on TC; coherence CIs are disjoint for all 7 MCPs.                                                                        completeness                                                                                    23                                 33
                                                                                                                             name_accuracy                                                                                   16                                 21
The bottom-coherence MCP differs across judges (Git
under Gemini, Illustrator under Qwen 3.5).
                                                                             Table 14: Argument sub-dimension failure counts
                                                                             (records with score < 1.0) under each judge. Value-
   MCP-level Spearman rank correlations across                               accuracy dominance is preserved bilaterally; counts
the seven MCPs are ρ=0.86 for tool-calling and                               agree within 5% across judges.
ρ=0.46 for coherence. The top tool-calling MCP
(Redis) is preserved under both judges; the bottom-
                                                                             Visual diagnostics. Figure 1 shows scatter (top
coherence MCP differs (Git under Gemini, Illustra-
                                                                             row) and Bland–Altman (bottom row) plots for
tor under Qwen 3.5).
                                                                             tool-calling and coherence. The TC scatter clusters
Record-level agreement. Table 13 re-                                         tightly along y=x and the TC Bland–Altman limits-
ports paired-record agreement on the ag-                                     of-agreement bracket zero symmetrically; the co-
gregate    per-aspect     unsupervised      score                            herence scatter shows a visible offset below y=x
(agg_unsupervised_score, the metric re-                                      and the coherence Bland–Altman LoA is shifted
ported throughout the paper).       Tool-calling                             ≈−0.14 below zero with wider spread.
agreement is strong; coherence is moderate.
                                                                                                                                   tool_calling: scatter (n=233)                                                                            coherence: scatter (n=300)
                                                                                                           1.0                                                                                                      1.0

Aspect               n     Pearson r             Spearman ρ    MAE        ±0.1 0.8                                                                                                                                  0.8
                                                                                       qwen35-122b score


                                                                                                                                                                                                qwen35-122b score


Tool-calling     384             0.790             0.844       0.046      84%                              0.6                                                                                                      0.6

Coherence        380             0.420             0.438       0.180      34%                              0.4                                                                                                      0.4


                                                                                                           0.2                                                                                                      0.2
Table 13: Record-level agreement between judges, com-
                                                                                                                                                                                   y=x                                                                                                      y=x
puted on records keyed by (MCP, conversation_id)                                                           0.0
                                                                                                                 0.0         0.2           0.4          0.6
                                                                                                                                          gemini-flash score
                                                                                                                                                                        0.8          1.0
                                                                                                                                                                                                                    0.0
                                                                                                                                                                                                                          0.0         0.2           0.4          0.6
                                                                                                                                                                                                                                                   gemini-flash score
                                                                                                                                                                                                                                                                               0.8            1.0

to avoid scenario-id collisions across MCPs. Bootstrap                                              0.20
                                                                                                                                    tool_calling: Bland-Altman
                                                                                                                                                                                                                    0.2
                                                                                                                                                                                                                                             coherence: Bland-Altman

95% CIs (B=2,000) omitted for space. MAE and the                                                    0.15
                                                                                                    0.10                                                                                                            0.1
±0.1 agreement rate reproduce the within-tolerance                                                  0.05
                                                                             qwen35 gemini


                                                                                                                                                                                           qwen35 gemini


                                                                                                                                                                                                                    0.0
qualitative pattern of the original analysis.                                                       0.00
                                                                                                    0.05                                                                                                            0.1

                                                                                                    0.10
                                                                                                                                                                                                                    0.2
Systematic shift. The mean signed differ-                                                           0.15
                                                                                                                                                               mean = -0.002                                                                                            mean = -0.074
                                                                                                    0.20                                                       95% LoA [-0.089, +0.085]
                                                                                                                                                                                                                    0.3                                                 95% LoA [-0.268, +0.120]
ence (Qwen 3.5 − Gemini) is ∆µTC ≈0 (95%                                                                               0.2          0.4            0.6
                                                                                                                                          mean of two judges
                                                                                                                                                                  0.8              1.0                                          0.5          0.6       0.7        0.8
                                                                                                                                                                                                                                                   mean of two judges
                                                                                                                                                                                                                                                                               0.9          1.0

CI [−0.009, +0.008]; balanced sign-test) and
∆µCoh ≈ − 0.16 (95% CI [−0.173, −0.138]; the                                 Figure 1: Record-level agreement between the Gem-
majority of non-tied records score lower under the                           ini judge (gemini-2.5-flash-lite) and the Qwen 3.5
                                                                             judge (Qwen3.5-122B-A10B-FP8). Top: scatter (Qwen
Qwen 3.5 judge). Tool-calling shows no system-
                                                                             3.5 vs. Gemini); the TC cloud (left) lies on y=x, the
atic bias; coherence is systematically stricter under                        coherence cloud (right) is offset below. Bottom: Bland–
the out-of-family judge. Without a third judge or                            Altman; TC differences are centered on zero, coherence
a human anchor, neither judge can be designated                              differences are shifted ≈−0.138.
“correct” on coherence; absolute coherence levels
are therefore reported as judge-dependent.
                                                                             Interpretation. Per-MCP TC means, the MCP
Failure-mode taxonomy replication. Table 14                                  TC ranking, and the dominant argument-value-
reports record counts where each argument sub-                               accuracy failure mode are robust to the judge

<!-- page break -->

swap. Absolute coherence levels and MCP-                                MCP             |T |   Arith.   Harm.   Min.
level coherence rank-preservation (ρCoh =0.46) are                      Redis           47     0.966    0.942   0.905
judge-dependent. The worst-coherence MCP dif-                           Selenium        56     0.935    0.909   0.814
                                                                        Elasticsearch   20     0.930    0.890   0.821
fers across judges (Git under Gemini, Illustrator                       Illustrator     64     0.898    0.839   0.745
under Qwen 3.5), reflecting the broader judge-                          Slack           16     0.886    0.813   0.737
dependence of coherence scoring rather than a con-                      Filesystem      14     0.876    0.746   0.680
                                                                        Git             33     0.857    0.763   0.677
tradiction in the underlying data.
                                                                        Corpus                 0.911    0.851   0.781
MCP             |T |     p̄   pmax   Opt%    w̄   TC      Coh
Illustrator     64      3.6     12     74   3.3   0.898   0.855   Table 16: Per-MCP TC means under arithmetic, har-
Selenium        56      1.8      5     26   9.7   0.935   0.850   monic, and minimum aggregation across the four di-
Redis           47      2.1      6     34   1.3   0.966   0.902   mensions (n = 385).
Git             33     11.2     19     95   2.2   0.857   0.757
Elasticsearch   20      1.8      8     33   1.9   0.930   0.902
Slack           16      2.2      6     51   1.4   0.886   0.938
Filesystem      14      1.8      3     32   2.0   0.876   0.825   (rows 1–3) and the metric decomposition gap (rows
                                                                  4–6).
Table 15: Schema complexity profile. |T | = tools, p̄
= mean params/tool, pmax = max params, Opt% =                     D     Pipeline Prompts
optional parameter ratio, w̄ = mean workflow length.
Per-MCP correlations with mean TC: average param-                 This section reproduces the instructional content
eters per tool r = −0.60, optional ratio r = −0.66,               of the LLM prompts used at each pipeline stage.
tool count r = +0.40 (positive but smaller). Tool-                JSON output templates and tool-spec payloads are
level disaggregation (n = 222) confirms the schema-
                                                                  abbreviated for space.
complexity direction with p < 0.001: average parame-
ters r = −0.29, optional ratio r = −0.30, both relative           D.1    Stage 1: Tool Interpretation
to mean unsupervised TC.
                                                                  The tool interpreter receives a single MCP tool
B     Aggregation Sensitivity                                     specification and produces a structured semantic
                                                                  explanation, requested as a JSON object with five
The reported tool-calling scores combine the four                 named fields.
top-level dimensions via arithmetic mean. Ta-                     I have a tool that can be called by an agent,
ble 16 re-aggregates the same per-turn dimension                  and I could use help understanding what it
                                                                  does and what it is helpful for.
scores under harmonic mean and minimum-across-
dimensions (n = 385; six coherence-only records                   Tool info:
omitted). Corpus-wide means shift substantially                   ```json
                                                                  {tool_info}
(0.911 / 0.851 / 0.781), but per-MCP rankings are                 ```
highly stable: Spearman ρ = 0.964 (Arith. vs
Harm.), 0.964 (Arith. vs Min.), 0.929 (Harm. vs                   I need a json in the following format that
                                                                  can help me thoroughly understand what the
Min.). The only swap is Filesystem ↔ Git near                     tool is capable of, especially in an
the bottom; the top-3 ordering is identical under                 enterprise context. Keep the explanations
all three rules. The schema-complexity correlation                grounded within the tool info.
(Section 5) holds in direction throughout: Pearson                {
r = −0.60 (Arith.), −0.48 (Harm.), −0.50 (Min.)                       "tool_name": <Tool name here, as given>,
                                                                      "what_it_does": <Complete explanation of
across the seven MCPs, and localizes to the argu-                         the tool's functionality and what it
ment sub-dimension (r = −0.86 versus |r| ≤ 0.46                           aims to do>,
for the other three). Argument correctness is also                    "what_it_needs": <What parameters the tool
                                                                          needs and how they should be formatted>,
the dominant failure mode at the input level (60.5%                   "why_its_used": <Reasons an agent would
of 448 turns score below 1.0, vs. 29.1% for or-                           call this tool; potential use cases>,
dering, 28.6% for selection, 1.3% for usage)—a                        "enterprise_context": <Tags for what aspect
                                                                          of an enterprise this could help with>
turn-level fact unaffected by the outer aggregation               }
choice.
                                                                  D.2    Stage 2: Scenario Generation
C     Novelty Summary
                                                                  Two prompts generate scenarios at different com-
Table 17 situates the contributions against prior                 plexity levels from the enriched tool summaries.
literature across two gaps: the data generation gap               Both target an “agentic chatbot for enterprise use

<!-- page break -->

Contribution                            Prior Literature                                     This Work

Benchmark construction                  Manual curation; or LLM synthesis for training       Automated evaluation harnesses from
                                        data (Verma et al., 2025; Castellani et al., 2025;   MCP specs, with held-out oracles and
                                        Liu et al., 2024)                                    mock outputs
Mock output generation                  Live API execution (Qin et al., 2024); or neural     LLM-prompted generation from spec
                                        simulator trained on large corpora (Ren et al.,      alone; no live API or trained simulator
                                        2025; Castellani et al., 2025)
Multi-turn grounding                    Context-free follow-ups                              Mock-data-conditioned turn generation

Tool-calling granularity                Name + parameter match; argument-flow via            4-dimension decomposition (usage/selec-
                                        DAG (Maekawa et al., 2026)                           tion/ordering/arguments)
Argument scoring strategy               Arithmetic mean of parameter scores                  Arithmetic mean with judge-enforced cas-
                                                                                             cading penalties on critical errors
Failure taxonomy                        Pass/fail                                            6-category failure type classification

                           Table 17: Contributions vs. prior literature, organized by thematic gap.


cases” and request scenarios organized by category,                   demonstrates complex, multi-step processes and
each containing an exact agent_workflow of func-                      creative combinations of tools that unlock new ca-
tion calls with parameters.                                           pabilities.
Simple scenarios.                                                     Coverage hint and follow-up. A coverage suffix
I'm building an agentic chatbot for enterprise                        appended to the initial prompt instructs: “IMPOR-
use cases. Based on the available tool
capabilities below, generate realistic,                               TANT: Ensure broad coverage across ALL avail-
straightforward, and commonplace scenarios                            able tools. Every tool listed above should appear
organized by category that showcase how                               in at least one scenario’s agent_workflow. There
employees would use this chatbot for everyday
tasks. These examples would not require too                           are {N} tools total — design scenarios that col-
many tool calls -- they'll be smaller and                             lectively exercise all of them.” If tools remain un-
more precise.
                                                                      covered after the first round, a follow-up prompt
Available Tool Capabilities:                                          requests additional scenarios for the named uncov-
{tool_summary}                                                        ered tools, allowing combination with previously
For each scenario, include the exact function                         covered tools in multi-step workflows.
calls the agent would make using the available
tools.                                                                D.3     Stage 3: Mock Output Generation
[JSON format omitted: categories[].scenarios[]                        You are a Mock Tool Output Generator for
 with title, prompt, agent_workflow[], novelty                        synthetic agent workflow data. Your task is
 _reason, agent_followup]                                             to generate realistic mock tool outputs that
                                                                      complete synthetic scenarios.
Make sure:
 1. Use actual tool names from the available                          You will be given an initial prompt (and
    capabilities                                                      maybe a description of what the aim of the
 2. Function names and parameters are                                 prompt is & why the scenario is of interest).
    structured separately with realistic                              Then, you will be given an agent workflow.
    values adhering to the parameter schema                           This will detail:
 3. Workflows show logical progression                                  (1) A function call w/ parameters and
 4. Scenarios are practical and commonly                                (2) A quick explanation of what the tool
    encountered                                                             does.
 5. Agent workflows do the necessary context
    management & tool calls to identify how                           Finally, you will have some example function
    parameters are selected                                           calls with their respective outputs OR a JSON
 6. Provide meaningful agent_followup content                         schema object describing the output
    that makes sense within the context of                            structure. Use this to guide formatting for
    the scenario.                                                     the final mock tool output.

                                                                      [JSON output: mock_workflow[] with function
Complex scenarios. The complex prompt mir-                             _name, parameters, quick_explanation,
rors the simple prompt but replaces “straightfor-                      mock_output, confidence; plus expected
ward, and commonplace” with “novel, and com-                           _response that references specific mock data]
plex”, asks for advanced and creative tool usage,                     ### CONFIDENCE LEVEL GUIDELINES
and adds two “Make sure” items: each scenario                         "high":   concrete example for THIS specific

<!-- page break -->

          function was provided                         with title, prompt, agent_workflow[]
"medium": no example for this function, but             including mock_output and confidence,
          similar functions have examples               novelty_reason, agent_followup]
"low":    no example output provided for
          this function                                  In standard mode (no mock outputs available),
                                                       the principles drop the data-driven breakpoint and
### CRITICAL INSTRUCTIONS
 1. Concrete Data: replace placeholders (e.g.          tool-result references, and the JSON template omits
    "{user_id}" or "XYZ") with realistic,              the mock_output and confidence fields. The
    specific values.                                   phase-boundary, batching, self-contained-turn, and
 2. Realism & Diversity: reflect how a real
    system would respond; incorporate diverse          function-reuse constraints are preserved across
    names, global locations, and varied data           both modes.
    points.
 3. Formatting: strictly adhere to provided
    reference examples or JSON schema.                 E     Evaluation Prompts
 4. Expected response references concrete
    mock data (names, IDs, counts, statuses,           The quality assessment framework (Section 4) uses
    dates) and reflects the full workflow,             two LLM-as-judge prompts: one for tool-calling
    not just the last call.
                                                       correctness and one for conversational coherence.
                                                       Both operate in unsupervised mode (no reference
D.4   Stage 4: Multi-Turn Expansion
                                                       answer). Tables 18 and 19 detail the aspects mea-
The multi-turn expansion prompt is constructed in      sured, their definitions, and scoring scales.
parts: a preamble, scenario and tool-result context,
key principles, task instructions, worked examples     E.1    Tool-Calling Evaluation
of good vs. bad turn splitting, quality guidelines,    The tool-calling prompt evaluates across four di-
and a JSON output template. The principle set          mensions, each with scored sub-dimensions on a
differs between mock-data-grounded mode (when          0–10 scale. Sub-scores are normalized to 0–1; the
synthetic outputs exist) and standard mode.            selection, ordering, and argument dimension scores
You are a Natural Conversation Flow Analyzer           are the arithmetic mean of their sub-scores, while
for enterprise agent interactions. Your task           the usage dimension score is taken directly from
is to take a scenario and intelligently break
it into natural conversation turns that                its necessity sub-score. The four top-level dimen-
reflect how real employees would interact              sion scores are then combined via arithmetic mean.
with an agent.                                         Cascading penalties on argument sub-scores are
# Key Principles (mock-data-grounded mode)             enforced through prompt instructions to the judge
 1. Use Available Tool Results to inform               (Table 18, footnote).
    realistic follow-up questions and workflow
    decisions.
 2. Data-Driven Breakpoints from the actual            E.2    Coherence Evaluation
    data returned by tools.                            The coherence prompt evaluates across five dimen-
 3. Realistic User Reactions to the specific
    data shown.                                        sions on a 1–3 scale, normalized to 0–1 and aggre-
 4. Progressive Data Exploration: each turn            gated via arithmetic mean. Each dimension checks
    builds on prior tool outputs.
 5. Split at Phase Boundaries when distinct
                                                       for specific failure manifestations.
    phases exist (e.g., information-gathering
    then acting on it).                                F     Structured Output Schemas
 6. Group Related Operations Within a Phase:
    batch repeated operations (e.g., 3                 Each pipeline stage uses Pydantic models as struc-
    lookups) into a SINGLE turn.
 7. Self-Contained Turns: agent_followup               tured output schemas, constraining the LLM to
    reports concrete results, NOT narration of         produce well-formed JSON at every step.
    future actions.
 8. Complete the Full Workflow: every tool
    call from the initial workflow appears in
                                                       G     Score Distributions and Per-Domain
    exactly one turn.                                        Analysis
 9. CRITICAL CONSTRAINT - Use Only Existing
    Functions: same function names and                 G.1    Overall Score Distributions
    parameter structures as the initial
    workflow.                                          Figure 3 shows the distribution of tool-calling and
                                                       coherence scores across all 391 evaluation records.
[Worked examples follow: BAD over-granular
 splitting, BAD no-splitting, GOOD batched-            The tool-calling distribution is concentrated in the
 within-phases. JSON format omitted: turns[]           upper range (31.7% perfect scores, 2.3% below

<!-- page break -->

        Dimension    Sub-dimension          Definition                                                        Scale
                     Necessity              Was a tool actually needed, or could the assistant answer         0–10
        Usage
                                            directly?
                     Overuse detection      Are there redundant or unnecessary tool calls?                    0–10
                     Correctness            Do the selected tools match the task described by the user?       0–10
        Selection    Specificity            Was the most specific tool chosen when alternatives exist?        0–10
                     Completeness           Are all tools needed to fully address the query called?           0–10
                     Sequence logic         Is the execution order logical; do later calls build on earlier   0–10
        Ordering                            ones?
                     Dependency handling    Are inter-tool dependencies respected (output → input)?           0–10
                     Execution efficiency   Could reordering improve efficiency?                              0–10
                     Completeness           Are all required parameters provided?                             0–10
                     Name accuracy          Do parameter names match schemas exactly (case-                   0–10
                                            sensitive)?
        Arguments
                     Value accuracy         Are values correct and grounded in the user query or prior        0–10
                                            tool outputs?
                     Type compliance        Do parameter values match expected data types?                    0–10
                     Format compliance      Do values follow expected formats (dates, enums, patterns)?       0–10
                     Relevancy              Are there any extra or invalid parameters not in the schema?      0–10

Table 18: Tool-calling evaluation dimensions and sub-dimensions. Ordering is marked not applicable for single tool
calls and excluded from aggregation. Cascading rules (enforced via prompt instructions to the judge): when the
judge identifies a wrong parameter name (score ≤ 2), it is instructed to assign near-zero scores to the dependent
argument sub-dimensions (value, type, format); a missing required parameter triggers the same cascade; a wrong
value (score ≤ 3) cascades to type, format, and relevancy. Values from prior tool outputs in chained calls are not
penalized.


0.5). The coherence distribution is left-skewed
with a mode near 0.9.

G.2    Per-Domain Analysis
Figures 4–10 show the scenario category break-
down (simple vs. complex), workflow length dis-
tribution, tool co-occurrence graph, and sequential
adjacency graph for each MCP specification. Co-
occurrence graphs show which tools appear in the
same scenario (undirected); adjacency graphs show
tool A → tool B transition patterns within ordered
workflows (directed).

<!-- page break -->

   Dimension           Definition                                             Failure manifestations
   Context retention   How well the response maintains and uses informa-      asks_again,      forgets_preferences,
                       tion from conversation history                         pronoun_confusion, contradicts_self,
                                                                              loses_thread, ignores_corrections
   Logical flow        How well the response follows logically from previ-    topic_shift,          non_sequitur,
                       ous turns and maintains coherent progression           poor_transitions, breaks_causality,
                                                                              temporal_confusion
   Completeness        How thoroughly the response addresses all parts of     cuts_off,            partial_answer,
                       the user’s query                                       too_shallow,    ignores_constraints,
                                                                              missing_key_info,
                                                                              no_actionable_advice
   Conciseness         How efficiently the response communicates without      repeats_directly,
                       unnecessary repetition                                 rephrases_same_point,
                                                                              too_much_fluff,       over_explains,
                                                                              excessive_caution
   Topic relevance     How well the response stays focused on the user’s      complete_topic_shift,
                       query and conversation topic                           misses_main_point,       too_generic,
                                                                              hallucination, wrong_question

Table 19: Coherence evaluation dimensions. Each dimension is scored on a 1–3 scale: Good (3) = no manifestations
detected; Adequate (2) = 1–2 minor manifestations; Poor (1) = 3+ manifestations or critical failures. Context
retention is optional (excluded when no conversation history exists).

                                                                  Stage 2: Generate
       Stage 1: Interpret
               Input
                                                                   Scenario
                                     ToolExplanation
        ToolInfo                                                   title: str
                                     tool_name: str
        name: str                                                  prompt: str
                                     what_it_does: str
        description: str                                           agent_workflow:
                                     why_its_used: str
        input_schema: dict                                           list[AgentCall]
                                     what_it_needs: str
        annotations: dict                                          novelty_reason: str
                                     enterprise_context: str
                                                                   agent_followup: str          Stage 4: Expand
                                     Stage 3: Mock
                                                                                                MockMultiTurn-
                                                                                                Scenario
                                      MockOutput
      AgentCall                                                  MockWorkflow                   turns: list[Turn]
                                      extends AgentCall
      function_name: str                                         mock_workflow:                 each turn:
                                      mock_output: str|dict
      parameters: dict                                             list[MockOutput]               prompt: str
                                      confidence: Enum
      quick_explanation: str                                     expected_response: str           agent_workflow:
                                        high|medium|low
                                                                                                     list[MockOutput]
                                                                                                  agent_followup: str


Figure 2: Structured output schemas across the four pipeline stages. Solid arrows indicate data flow; dashed arrows
indicate schema inheritance (MockOutput extends AgentCall, which is referenced by Scenario).


       (a) Tool-calling score distribution with KDE.                   (b) Coherence score distribution with KDE.

                             Figure 3: Score distributions across all 391 evaluation records.

<!-- page break -->

               (a) Scenario categories.                                  (b) Workflow length distribution.


            (c) Tool co-occurrence graph.                                 (d) Sequential adjacency graph.

Figure 4: Elasticsearch (20 tools): scenario categories, workflow lengths (mean 1.9 calls), tool co-occurrence, and
sequential adjacency.

<!-- page break -->

                (a) Scenario categories.                                  (b) Workflow length distribution.


             (c) Tool co-occurrence graph.                                 (d) Sequential adjacency graph.

Figure 5: Illustrator (64 tools): scenario categories, workflow lengths (mean 3.3 calls, max 12), tool co-occurrence,
and sequential adjacency.

<!-- page break -->

                (a) Scenario categories.                                   (b) Workflow length distribution.


             (c) Tool co-occurrence graph.                                  (d) Sequential adjacency graph.

Figure 6: Redis (47 tools): scenario categories, workflow lengths (mean 1.3 calls), tool co-occurrence, and sequential
adjacency.

<!-- page break -->

                (a) Scenario categories.                                   (b) Workflow length distribution.


             (c) Tool co-occurrence graph.                                  (d) Sequential adjacency graph.

Figure 7: Slack (16 tools): scenario categories, workflow lengths (mean 1.4 calls), tool co-occurrence, and sequential
adjacency.

<!-- page break -->

               (a) Scenario categories.                                (b) Workflow length distribution.


            (c) Tool co-occurrence graph.                               (d) Sequential adjacency graph.

Figure 8: Filesystem (14 tools): scenario categories, workflow lengths (mean 2.0 calls), tool co-occurrence, and
sequential adjacency.

<!-- page break -->

                (a) Scenario categories.                                  (b) Workflow length distribution.


             (c) Tool co-occurrence graph.                                (d) Sequential adjacency graph.

Figure 9: Git (33 tools): scenario categories, workflow lengths (mean 2.2 calls), tool co-occurrence, and sequential
adjacency.

<!-- page break -->

               (a) Scenario categories.                                  (b) Workflow length distribution.


            (c) Tool co-occurrence graph.                                (d) Sequential adjacency graph.

Figure 10: Selenium (56 tools): scenario categories, workflow lengths (mean 9.7 calls, max 17), tool co-occurrence,
and sequential adjacency.

<!-- page break -->
