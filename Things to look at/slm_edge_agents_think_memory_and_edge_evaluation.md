# Enhancing Virtual Agents through SLMs and Edge-Computing: Think and Memory Evaluation

> Source PDF: `2608.13420v1.pdf`
> Research purpose: Evaluating small language models for think and memory processes in an edge-hosted agent.
> Conversion: `pdftotext -layout`, orchestrated by Python

---

## Extracted text

Enhancing Virtual Agents through SLMs and Edge-Computing: An
                                                    Exploratory Evaluation of Think and Memory Processes
                                                                                       Aimilios Hadjiliasi*              Louis Nisiotis†

                                                                                    Department of Computing, Engineering and Mathematics
                                                                                           University of Central Lancashire, Cyprus
arXiv:2608.13420v1 [cs.AI] 13 Aug 2026


                                                         Figure 1: High-level overview of the CEAA architecture (left) and the edge-hosted agent implementation (right).

                                         A BSTRACT                                                                 1    I NTRODUCTION
                                         Embodied intelligent virtual agents are expected to operate as per-       Recent advancements in Artificial Intelligence (AI), eXtended Re-
                                         sistent, adaptive, and context-aware entities within complex virtual      ality (XR), and Metaverse technologies are reshaping how users
                                         and Metaverse worlds. However, implementing cognitively capable           interact with complex interactive virtual environments and with
                                         agents in such environments is conceptually and technologically           each other. Users are no longer limited to static content and pre-
                                         challenging. Among a range of blueprints and development ap-              defined scenarios, but share interactive virtual worlds and spaces
                                         proaches, the Cognitive Embodied Agent Architecture (CEAA) has            with other users through avatars, digital twins, and smart interac-
                                         been developed as an implementation-oriented framework for ar-            tive objects [3]. In such worlds, virtual agents are intelligent entities
                                         chitecting components of perception, memory, reasoning, planning,         situated in virtual environments and represented through embodied
                                         and embodied action. Considering the recent advances in edge              forms, and can support communication, guidance, assistance, train-
                                         computing and generative AI language models, this paper explores          ing, education, and social interaction, operating as persistent, adap-
                                         the use of Small Language Models (SLMs) to support edge-based             tive, and context-aware entities capable of responding to users and
                                         operation of selected CEAA components, focusing on Think and              environmental changes in real-time [5]. However, implementing
                                         Memory as processes central to cognitive orchestration and persis-        cognitively capable embodied agents in real-time virtual environ-
                                         tence of virtual agents in interactive virtual worlds. An edge-based      ments remains challenging, as many still rely on scripted behaviors,
                                         virtual agent gateway system was developed and evaluated on an            rule-based flows, and symbolic game AI techniques. Although ef-
                                         NVIDIA Jetson Orin NX using Qwen2.5 models of different sizes,            fective for predefined behaviors, these approaches often limit the
                                         exploring the system’s capability to process service requests and         agent’s ability to adapt to dynamic user input and maintain continu-
                                         handle memory-driven conversations. A series of simulation exper-         ity across interactions. As a result, agents may appear embodied
                                         iments evaluated routing accuracy, memory-read performance, and           in the visual sense, but remain limited in cognitive and interac-
                                         latency, demonstrating an SLM-driven prototype agent system that          tive capabilities. To support the development of intelligent inter-
                                         partially implements selected CEAA processes to support the de-           active agents, the Cognitive Embodied Agent Architecture (CEAA)
                                         velopment of embodied agents whose cognitive “brain” can operate          has been proposed as an implementation-oriented framework (see
                                         efficiently and contextually for interactive experiences in immersive     Figure 1 (left)) [6], to support the development of intelligent inter-
                                         virtual worlds.                                                           active agents. CEAA builds on existing frameworks and defines the
                                         Index Terms: Embodied Agents, Virtual Agents, Small Language              architectural components required for perception, memory, reason-
                                         Models, Agent Memory, Agent Orchestration, Edge Computing                 ing, planning, behavior mapping, and embodied action, providing a
                                                                                                                   modular foundation for moving towards cognitively capable virtual
                                            * e-mail: AHadjiliasi1@uclan.ac.uk                                     agents. Building on that, this paper explores some of the recent ad-
                                            † e-mail:LNisiotis@uclan.ac.uk                                         vancements in generative AI, particularly Small Language Models
                                                                                                                   (SLMs), as a cognition mechanism to support the edge-based oper-
                                                                                                                   ation of selected CEAA components for intelligent virtual agents.
                                                                                                                   Edge-based processing is essential for responsive in-world inter-
                                                                                                                   action, enabling embodied agents to interpret input, access mem-

<!-- page break -->

ory, infer intent, and coordinate responses with minimal latency.         2.2   Memory and Persistence in Virtual Agents
SLMs are well suited for this role because they offer efficient in-       Memory and information persistence have become important re-
ference with lower computational demands and can operate closer           search areas in agent systems, where memory is often divided into
to the user. Specifically, this exploratory study examines the use        distinct types. From a cognitive science perspective, this includes
of SLMs to implement two key CEAA processes driving intelligent           working memory, which supports immediate reasoning, and long-
agent behaviour: Think and Memory, which are central to cognitive         term memory, which stores information beyond the current interac-
orchestration and persistence. To explore this, an edge-based vir-        tion [1, 20]. Within the scope of language model driven agents,
tual agent gateway was developed to process user prompts through          MIRIX memory system for instance extends this distinction by
locally deployed SLMs. The system supports memory handling                proposing six specialized memory components: Core Memory that
and service routing, allowing agents to store and retrieve context        stores persistent high-priority information about the agent and user;
and select suitable backend services for conversational support and       Episodic Memory that stores time-stamped events and interactions;
generative tasks, such as handling user requests for 3D models, tex-      Semantic Memory that stores concepts, entities, and relationships;
tures, motion, sound, and text-to-speech services during conversa-        Procedural Memory that stores task procedures and workflows; Re-
tion. Accordingly, this exploratory study is guided by the following      source Memory that stores documents, files, and media, and last;
research question: RQ: To what extent can SLMs partially oper-            Knowledge Vault that preserves sensitive information such as cre-
ationalize selected aspects of CEAA’s Think and Memory com-               dentials, addresses, or contact details [21]. This distinction is im-
ponents through service routing and structured memory han-                portant because persistent virtual agents require more than conver-
dling for an edge-based virtual-world agent? To ascertain this,           sation history. To operate, they require structured mechanisms for
the study evaluates Qwen2.5 small models of different sizes in an         storing, retrieving, updating, and protecting different kinds of user,
edge-computing setup, examining the relationship between model            task, and environment knowledge [21]. Agent memory also en-
size, routing accuracy, memory performance, and latency under             ables agents to encode, store, retrieve, and use information from
resource-constrained conditions. As such, this paper contributes          previous interactions, supporting continuity, identity, user prefer-
by: i) partially implementing and evaluating selected aspects of          ences, task history, and persistence across sessions [21, 17, 13]. In
CEAA’s Think and Memory components through service routing                virtual worlds, this allows agents to remember users, objects, loca-
and structured factual memory handling; ii) examining the feasi-          tions, actions, relationships, and ongoing tasks. Generative-agent
bility of these mechanisms under edge-computing conditions; and           research shows that memory, reflection, and planning can improve
iii) providing early evidence on how selected backend processes of        behavioral believability in simulated social environments. How-
embodied agents can operate locally and contextually.                     ever, long-term conversational evaluations reveal persistent limita-
                                                                          tions in temporal reasoning, causal consistency, and multi-session
2     BACKGROUND AND C ONTEXT                                             recall [17, 13]. Virtual agents therefore require robust memory
2.1    Virtual Agents                                                     mechanisms to reliably store, retrieve, update, and reason over con-
                                                                          textual information across interactions.
Virtual agents are computer-controlled entities in virtual environ-
ments that interact with users, other agents, and the surrounding
                                                                          2.3   SLMs and Edge-Based Agentic AI
space. Based on agent theory, they are considered intelligent when
they act autonomously, perceive their environment, pursue goals,          SLMs are lightweight transformer-based models, typically con-
and demonstrate reactive, proactive, and social behavior [22]. In         taining hundreds of millions to several billion parameters. Com-
virtual worlds, this definition is extended through visual, embod-        pared with larger LLMs, they support language understanding
ied, and behavioural representation [8]. Accordingly, embodied            and generation with lower computational, memory, latency, and
agents should communicate through speech, gaze, gestures, facial          power requirements [12]. These characteristics make them suit-
expressions, locomotion, and other multimodal behaviours. To sup-         able for efficient agentic tasks, including structured output gener-
port this, agent behaviour should be driven by perception, reason-        ation, memory-operation detection, summarisation, dialogue han-
ing, memory, dialogue, planning, and intelligent decision-making          dling, information extraction, task decomposition, intent recogni-
[22, 4]. Early attempts on virtual agents focused on animated enti-       tion, request classification, and service routing [12, 2, 15].
ties to guide users, demonstrate tasks and content, and support face-        In agent systems, particularly virtual worlds, SLMs can operate
to-face interaction, a role that remains relevant in Metaverse-type       beyond conversational response generation as lightweight cognitive
virtual world environments [8]. Over time, agents have evolved            controllers. They can interpret user input, classify intent, determine
from scripted and rule-based characters toward more cognitively           whether memory should be accessed or updated, and select the ap-
capable systems, supported by architectures such as the BDI [18]          propriate processing route. This is especially relevant in complex
and SOAR [11] multimodal frameworks [10, 9], and, more recently,          virtual environments, where requests may require different back-
Large Language Models (LLMs) [17]. Embodiment is key in vir-              end capabilities, such as conversation, memory retrieval, 3D gener-
tual environments because it changes how users perceive and inter-        ation, or other specialized functions. In such cases, the agent must
act with agents, as it can make interaction feel closer to commu-         orchestrate tools, services, and specialized models rather than only
nication with a social partner, and empirical work has shown that         generate dialogue [15].
well-designed agents can enhance user engagement [23]. There-                However, SLMs remain limited in deep contextual reasoning,
fore, agent development and evaluation should consider user expe-         long-term planning, broad factual coverage, complex abstraction,
rience as well as functionalities. In this paper, we are focusing on      and the robust handling of ambiguous or open-ended requests.
their functionalities. Technically, agents can be evaluated through       Their smaller size may also reduce consistency across extended
task success, conversational ability, dialogue accuracy, memory re-       interactions, knowledge integration, and creative output quality.
call, latency, robustness, and error rates. Despite progress, key chal-   Larger LLMs are therefore more appropriate for complex open-
lenges remain, including real-time integration of perception, mem-        ended reasoning, multi-step planning, broad knowledge synthe-
ory, reasoning, and embodied action, natural behavior, reliable con-      sis, high-quality creative generation, and multimodal understanding
text handling, reduced hallucinations, safe outputs, and user pri-        [2, 24].
vacy. These challenges motivate further research into architectures          On the other hand, edge-based agentic AI refers to agent sys-
and implementation mechanisms to enable the development of per-           tems where inference, memory handling, decision logic, tool use,
sistent, adaptive, context-aware, and robust virtual agents, safe to      or orchestration are close to the user and environment rather than
deploy in virtual worlds and complex computing systems.                   on the cloud [25]. In virtual environments, this supports respon-

<!-- page break -->

sive, privacy-sensitive, and network-resilient interaction. Architec-   algorithm, it orchestrates the flow of information between percep-
turally, SLM-based edge agents often combine a local language           tion, memory, reasoning, planning, and action selection. Building
model, memory or retrieval module, tool-calling interface, task         on this foundation, this paper aims to explore and enhance the prac-
router, and optional cloud fallback [25, 15]. Through tool use and      tical operation of these components through edge-based computing
function calling, the model can move beyond text generation by          and SLMs to support persistent, adaptive, and context-aware be-
producing structured API calls, invoking external services, receiv-     haviour under real-time and resource-constrained conditions.
ing observations, and using returned results in subsequent reasoning
and decision-making. This allows agentic systems to delegate spe-       3 M ETHODOLOGY
cialised tasks to appropriate tools, services, or models rather than    This paper investigates the use of SLMs to support the edge-based
attempting to compute all functions internally. To explore this di-     operation of CEAA’s Think and Memory components, for the de-
rection, this paper develops an edge-based virtual agent system,        velopment of interactive conversational virtual agents capable of
focusing on service routing and memory capabilities to examines         holding memory-based conversations and identifying user requests
whether SLMs can support these backend cognitive processes lo-          for external services. Our previous work introduced an SLM-based
cally, enabling virtual agents to interpret user requests, preserve     Agent Orchestration Gateway for routing virtual-world requests to
context, and coordinate access to generative services for responsive    heterogeneous AI services [15]. The present study extends this
in-world interaction.                                                   architecture by integrating contextual memory and systematically
                                                                        comparing three general-purpose SLM sizes across broader rout-
2.4   CEAA: Cognitive Embodied Agent Architecture                       ing and memory tasks. The Think component is partially imple-
                                                                        mented through service routing as a form of cognitive orchestration,
Developing intelligent virtual agents requires architectures that can
                                                                        and Memory is examined through structured write–read interaction
organize perception, memory, reasoning, decision-making, and em-
                                                                        handling. The evaluation focuses on these components as practical
bodied action. Several approaches have been proposed for this pur-
                                                                        mechanisms through which an embodied virtual agent can inter-
pose, including rational agent architectures such as BDI [18], cog-
                                                                        pret user input, determine the appropriate processing pathway, and
nitive architectures such as SOAR [11], embodied conversational-
                                                                        store, retrieve, or update contextual information across interactions.
agent frameworks such as SAIBA and Greta [10, 14], and virtual-
                                                                        To support this, an edge-based agent gateway was developed, which
human development toolkits such as the ICT Virtual Human Toolkit
                                                                        receives user prompts, processes them using Qwen2.5 models, and
[9]. These approaches provide important foundations for agent
                                                                        returns either a structured routing decision or a memory-oriented re-
reasoning, multimodal behaviour, and interactive virtual humans.
                                                                        sponse. Three model sizes (0.5B, 1.5B, and 3.0B parameters) were
However, integrating cognitive processes with real-time embodied
                                                                        evaluated to analyse the relationship between model size, routing
execution in interactive virtual worlds remains challenging, espe-
                                                                        accuracy, memory performance, structured-output reliability, and
cially when agents must operate persistently, respond to dynamic
                                                                        interaction latency under resource-constrained conditions. To ex-
user input, access memory, and coordinate actions or services dur-
                                                                        plore this, an edge-based agent system is integrated with a 3D vir-
ing runtime.
                                                                        tual avatar, where the SLM acts as the agent’s cognitive “brain”,
    CEAA [6] is an implementation-oriented architecture proposed        with regard to CEAA’s ”think” and ”memory” processes. The sys-
for developing cognitive embodied intelligent virtual agents that       tem enables real-time input interpretation, service routing, memory
operate in real-time interactive virtual environments (see Figure       access and updates, and coordination with backend generative ser-
1 (left)). It was introduced to bridge the gap between low-             vices. This setup allows the evaluation of SLM-driven Think and
level reactive implementations, such as finite-state machines and       Memory processes within a situated and embodied context, where
symbolic/game-AI techniques, and high-level cognitive architec-         decisions made by the model directly influence in-world agent be-
tures that provide rich reasoning models but are often difficult to     haviour and interaction flow.
integrate into real-time 3D environments. As such, CEAA con-
nects cognitive reasoning with embodied execution by providing a        3.1 System Configuration and Apparatus
reusable framework for implementing the “brain” of virtual agents       The experimental apparatus extended the CEAA-based Interwo-
in complex interactive systems and Metaverse applications.              venXR virtual-world testbed developed through the authors’ ongo-
    CEAA consists of three main layers: the User and Environment        ing work on intelligent virtual environments. The testbed has sup-
layer, the Knowledge layer, and the Agent layer. The User and           ported virtual museums, robotic digital twins, and other embodied-
Environment layer represents the virtual world, including users,        agent scenarios, providing a reusable Unity-based environment
agents, objects, and system-level events. The Knowledge layer           where agents interact with users, virtual objects, and system events
maintains a structured representation of the environment through a      [16, 7]. Considering the system used for experimentation, Unity
shared blackboard-oriented knowledge base, where events and state       provided the embodied-agent interface through which users sub-
changes are recorded and made available to the agent. The Agent         mitted natural-language requests and received responses. Language
layer contains the cognitive and behavioural components that allow      processing, memory management, route selection, and service dis-
the agent to sense events, access memory, think, reason, plan, map      patch were handled externally by an edge-hosted gateway, keep-
decisions to embodied behaviour, and act within the virtual envi-       ing the virtual-world client lightweight. The gateway and local
ronment. In this way, CEAA separates environmental dynamics,            model server ran on an NVIDIA Jetson Orin NX 8GB, representing
shared knowledge, cognitive processing, and embodied action into        resource-constrained edge hardware for virtual-world agents.
modular components that can be implemented in development en-               Each HTTP request contained a user prompt and session iden-
vironments.                                                             tifier. Qwen2.5 first classified the interaction as conversation,
    Within CEAA, the Memory and Think components are central            memory-read, memory-write, service request, or ambiguous. This
to persistent and adaptive agent behaviour. Memory stores and or-       classification determined whether the gateway generated a conver-
ganises past experiences, including episodic information, seman-        sational response, accessed stored context, or selected a configured
tic knowledge, user-related information, and prior actions, enabling    service route. For service requests, the SLM returned a structured
the agent to retrieve relevant events and adapt its behaviour based     JSON decision containing the selected route, interpreted intent,
on previous interactions. Think acts as the agent’s central cognitive   confidence estimate, and rationale.
coordinator by integrating information from memory and coordi-              The memory subsystem integrated Qwen2.5, LangMem1 , and
nating with modules such as the Reasoner and Planner to determine
the most appropriate action. Instead of relying on a single reasoning      1 https://langchain-ai.github.io/langmem/

<!-- page break -->

SQLite. Regardless of the predicted interaction label, every session      Performance was measured using overall accuracy and macro-
turn was recorded in SQLite and observed by LangMem, which             averaged precision, recall, and F1-score, with macro-averaging en-
used the same Qwen2.5 model to extract concise, durable facts.         suring equal treatment of frequent and infrequent routes. Robust-
These facts were stored as content-keyed items with session identi-    ness was assessed through invalid-output and timeout rates. La-
fiers, timestamps, and metadata. Exact duplicates updated the exist-   tency was measured in milliseconds and summarised using mean,
ing item, whereas non-identical corrections were retained as newer     median, and P95 values. Routing latency included request sub-
records without automatically deleting earlier information.            mission, prompt processing, model inference and decoding, out-
   For memory-read requests, the gateway deterministically             put parsing, and return of the routing decision, while exclud-
retrieved relevant facts and recent session turns based on token       ing downstream service execution. For memory interactions, the
relevance and recency. These records were supplied directly to         aggregate latency additionally included the applicable extraction,
Qwen2.5 for response generation without additional LangMem fil-        persistence, retrieval, database-access, context-construction, and
tering. The evaluated memory accuracy therefore reflects the com-      response-generation operations.
plete     classification–extraction–persistence–retrieval–generation
pipeline.                                                              3.3    Memory Evaluation
   For the controlled routing evaluation, ten configured routes rep-   The memory evaluation assessed each SLM’s ability to support the
resented common virtual-world services (Table 2). Each route was       CEAA Memory process through structured write–read interactions.
defined by a name, description, examples, and routing constraints.     It simulated a collaborative virtual-world game-development ses-
The routes acted as service stubs: the experiment assessed whether     sion in which users progressively introduced information for the
the SLM selected the intended target without executing the down-       agent to store, retrieve, and update.
stream generative service. Figure 2 illustrates the complete deploy-       End-to-end recall was evaluated using 250 prompts: 125 fact-
ment flow, including service invocation and presentation of the re-    introduction turns and 125 paired memory questions. End-to-end
turned output, whereas the reported routing experiment ended after     read accuracy measured the proportion of questions answered cor-
route selection.                                                       rectly using retrieved memories and session context, with correct
                                                                       reads also reported as a raw count out of 125. Memory-write la-
                                                                       bel recall measured the proportion of fact-introduction prompts as-
                                                                       signed the memory-write action label. Content persistence was
                                                                       not evaluated because all turns were recorded and independently
                                                                       observed for fact extraction. Service leakage counted memory
                                                                       prompts incorrectly routed to external services. Memory latency
                                                                       was reported using mean, median, and P95 end-to-end response
                                                                       times, covering the applicable extraction, persistence, retrieval,
                                                                       database access, context construction, and response generation.
                                                                           Each write prompt introduced one fact concerning design de-
                                                                       cisions, responsibilities, preferences, character identities and be-
                                                                       haviours, system behaviours, associative links, task updates, or cor-
                                                                       rections. The paired read prompt queried the same fact using dif-
Figure 2: Illustrative gateway flow from user request to coding-
service response presented by the embodied agent.
                                                                       ferent wording, testing retrieval rather than surface repetition.
                                                                           Prompt pairs were grouped into design facts, ownership and re-
                                                                       sponsibilities, team interests, task updates, character identity, char-
  All experiments used the instruction-tuned Qwen / Qwen2.5            acter behaviour, associative links, state behaviour, and corrections
- 0.5B, 1.5B, 3B - Instruct - GGUF checkpoints with                    or overrides. These categories covered both basic recall and more
Q4 K M quantisation. The models were served locally through            demanding behaviours, including updating outdated information,
llama.cpp with a 4,096-token context. All calls were limited to        distinguishing related memories, and preserving entity–attribute re-
420 generated tokens. Top-p and top-k followed the server defaults,    lationships.
and generation terminated at the model end token or token limit.           Each pair included a predefined expected fact and was reviewed
Complete system and routing prompts, service descriptions, and         for ambiguity, scenario relevance, and alignment with the intended
memory instructions are provided as supplementary materials2 .         memory behaviour. In June 2026, ChatGPT 5.5 High Reasoning
                                                                       evaluated all 250 memory-read responses using a fixed prompt that
3.2   Routing Evaluation                                               checked for the expected fact, contradictions, outdated information,
The routing evaluation assessed each SLM’s ability to support the      and unsupported content. The authors then manually reviewed all
CEAA Think process by selecting the appropriate route for user re-     outputs using a model-blinded approach.
quests. An automated script submitted a balanced dataset of 1,000          Responses were correct when they retrieved the requested in-
prompts to the gateway in route-only mode, with 100 prompts for        formation without substituting stale, adjacent, or unrelated content.
each of ten predefined routes. Prompt creation was LLM-assisted,       They were incorrect when they omitted the expected fact, returned
followed by author review and revision to ensure relevance to the      outdated information, confused related entities, acknowledged a
collaborative game-development scenario and assignment of one          memory action instead of recalling information, or introduced un-
ground-truth route per prompt. Downstream services were not in-        supported claims. Ambiguous cases, including incorrect related re-
voked, isolating routing behaviour from service execution.             trievals, unapplied corrections, and recall requests misclassified as
                                                                       write actions, were manually inspected by the authoring team.
   The routes represented general conversation, coding support,
gameplay mechanics, game AI guidance, 3D generation, image-to-         4     R ESULTS
3D generation, motion generation, texture generation, sound gener-
ation, and text-to-speech. For each prompt, the script recorded the    4.1    Routing Evaluation
predicted and expected routes, correctness, confidence score, JSON     The routing results (Table 1) show a clear performance in-
validity, and end-to-end routing latency.                              crease with model size. The 0.5B model achieved 29.4% ac-
                                                                       curacy and 28.9% macro-F1, indicating unreliable routing de-
   2 https://github.com/AimiliosHadjiliasis/CEAA/tree/main/XRAG2026    spite producing valid structured outputs. Its errors were dom-

<!-- page break -->

                                                                                                   Table 3: Comparative memory evaluation results.
inated by route collapse, frequently misclassifying prompts
as image to 3d generation or conversational generator,


                                                                                                                             Memory-write
                                                                                                   read accuracy
suggesting limited capability in separating closely related ser-


                                                                                                   End-to-end


                                                                                                                             label recall
vices. The 1.5B model significantly improved performance, reach-


                                                                                                                                            leakage


                                                                                                                                                                Median
                                                                                                                   Correct


                                                                                                                                            Service


                                                                                                                                                      latency


                                                                                                                                                                latency


                                                                                                                                                                          latency
                                                                                           Model
ing 85.4% accuracy and 84.3% macro-F1, and was able to sep-


                                                                                                                                                      Mean
                                                                                                                   reads


                                                                                                                                                      (ms)


                                                                                                                                                                (ms)


                                                                                                                                                                          (ms)
                                                                                                                                                                          P95
arate most routes reliably. The 3.0B model achieved the high-
est performance (87.7% accuracy, 87.8% macro-F1) with no in-
valid outputs, improving particularly on challenging generation-                           0.5B 72.8% 91/125 1.6% 1/250                                  2025      1845     2385
related routes. This improvement comes at a latency cost,                                  1.5B 78.4% 98/125 5.6% 7/250                                  3794      3582     5416
                                                                                           3.0B 93.6% 117/125 63.2% 8/250                                9693      9175    14531
however, with mean latency increasing from 3349 ms (1.5B)
to 5067 ms (3.0B). Table 2 shows the results of the differ-
ent SLM variants to achieve per-route identification and re-
veals substantial variation across routes. The 0.5B model per-                         achieving the highest accuracy but with substantial latency (mean
formed poorly on most categories, particularly generation 3d                           9693 ms, P95 14531 ms). The 0.5B model was significantly faster
and gameplay mechanics, although it performed comparatively                            but unsuitable due to poor correction handling and low write-action
better on text to speech and sound generation. The 1.5B                                recognition. The 1.5B model provided a latency compromise but
model produced strong improvements across nearly all routes, but                       showed the weakest action consistency, with many memory inter-
image to 3d generation remained challenging. The 3.0B model                            actions treated as generic responses rather than explicit memory
achieved the highest score on the majority of the, particularly im-                    operations.
proving generation-related services, although the 1.5B model re-
mained stronger for game ai guidance, gameplay mechanics,                              5   D ISCUSSION
and conversational generator.
                                                                                       The results show that SLMs possess inference capabilities that can
      Table 1: Routing-only evaluation results across model sizes.                     support selected CEAA Think and Memory processes. For Think,
                                                                                       the 1.5B and 3.0B models effectively supported intent classification
                                                                                       and routing across conversational, memory-related, and external
                 Accuracy


                            precision


                                                                   Median
                                                         latency


                                                                   latency


                                                                             latency


                                                                                       generative services hosted on different servers or hardware. This
      Model


                            Macro


                                        Macro


                                                 Macro

                                                         Mean
                                        recall


                                                         (ms)


                                                                   (ms)


                                                                             (ms)
                                                                             P95


                                                                                       aligns with agentic AI and tool-use research, in which language
                                                 F1


                                                                                       models select actions within structured action spaces [24, 19].
      0.5B 29.4% 58.4% 29.4% 28.9%                          1504      1623      1810   However, ambiguities remained between semantically similar ser-
      1.5B 85.4% 88.9% 85.4% 84.3%                          3349      3519      3923   vices, indicating that model suitability depends on the target func-
      3.0B 87.7% 90.8% 87.7% 87.8%                          5067      5367      6159   tion, model size, and latency requirements.
                                                                                          For Memory, Qwen2.5-3.0B achieved the highest read accuracy
                                                                                       and reliably handled factual recall, state behaviour, and corrections,
Table 2: Per-route success comparison across Qwen2.5 model sizes.                      consistent with prior research on memory, reflection, and planning
                                                                                       in believable agents [17, 13]. Nevertheless, some recall requests
              Route                                  0.5B      1.5B      3.0B          were misclassified as memory-write actions, showing that mem-
                                                                                       ory fidelity and memory-action classification remain distinct chal-
              coding support                        13.5%     90.4%     96.4%          lenges.
              game ai guidance                      47.3%     78.6%      76.5%
                                                                                          The findings also reveal a clear accuracy–responsiveness trade-
              gameplay mechanics                    5.8%      85.7%     78.6%
              generation 3d                         0.0%      75.5%     80.9%
                                                                                       off. The 0.5B model was the fastest but unreliable for routing and
              image to 3d generation                27.0%     45.0%      74.1%         correction handling; the 1.5B model provided the best routing bal-
              motion generation                     24.6%     97.6%      99.5%         ance; and the 3.0B model achieved the strongest memory perfor-
              conversational generator              10.2%     85.6%      72.9%         mance but incurred substantial latency. CEAA-based agents may
              sound generation                      65.5%     93.4%     100.0%         therefore benefit from modular or hybrid configurations that use
              text to speech                        78.8%     95.3%     99.5%          smaller models for low-latency orchestration and larger models for
              texture generation                    16.5%     95.7%      99.0%         memory-intensive or semantically complex tasks.
                                                                                          Building on these findings, the study addresses the research
                                                                                       question by demonstrating how SLMs can support selected CEAA
                                                                                       processes and locally implement aspects of an agent’s cognitive
4.2      Memory Evaluation                                                             “brain” through service selection and contextual memory handling
The memory evaluation followed the same comparative structure                          at the edge. Challenges remain in routing ambiguity, memory-
across the three model sizes (see Table 3). The 0.5B model achieved                    action classification, latency optimisation, and deployment within
72.8% memory-read accuracy (91/125), but while it performed well                       live interaction loops. The results provide early evidence that edge-
on simple facts, it struggled with correction handling, often re-                      based SLMs can support persistent, adaptive, and context-aware
trieving the correct entity but the wrong memory facet, indicat-                       virtual agents, while emphasising the importance of careful model
ing limited fine-grained memory selection. The 1.5B model im-                          selection and task-specific design.
proved to 78.4% accuracy (98/125), showing better performance                             As such, the study makes three main contributions. First, it
on factual recall, associative links, and corrections. However, it                     empirically demonstrates how service routing can partially imple-
remained weak on task updates and state behaviour, suggesting                          ment the CEAA Think process and how structured write–read in-
difficulty in replacing or disambiguating closely related informa-                     teractions can partially implement Memory under edge-computing
tion. The 3.0B model achieved the highest performance at 93.6%                         constraints. This does not constitute a complete demonstration
(117/125), handling facts, state behaviour, and corrections reliably.                  of embodied-agent behaviour, as perception, behaviour mapping,
Some errors were mainly due to misclassification of recall prompts                     embodied action, and live 3D interaction were outside the eval-
as memory-write actions, indicating that improved memory fidelity                      uation scope. Second, it compares Qwen2.5 models of different
address mostly several issues of classification. This performance                      sizes for local routing and memory handling, showing through ac-
gain comes with a latency trade-off however, with the 3.0B model                       curacy, memory, and latency results that model selection should de-

<!-- page break -->

pend on the target function. Third, it contributes to the broader vi-        [6] A. Hadjiliasi and L. Nisiotis. CEAA: A cognitive embodied agents
sion of complex virtual worlds and Metaverse systems by showing                  architecture for interactive computing systems. In Proceedings of
how backend cognitive processes for embodied agents can begin                    the 2026 IEEE 3rd International Symposium on Emerging Metaverse
to operate locally, responsively, and contextually under real-time,              (ISEMV), Cyprus, Oct. 2026. In press. 1, 3
resource-constrained conditions.                                             [7] A. Hadjiliasi, L. Nisiotis, and I. Polycarpou. A comparative assess-
                                                                                 ment of technology acceptance and learning outcomes in computer-
                                                                                 based versus vr-based pedagogical agents. In 2024 IEEE Interna-
6   C ONCLUSIONS , L IMITATIONS AND F UTURE D IRECTIONS                          tional Symposium on Mixed and Augmented Reality Adjunct (ISMAR-
This study provides empirical evidence that locally deployed SLMs                Adjunct), pages 513–516, 2024. 3
can support selected aspects of CEAA’s Think and Memory compo-               [8] A. Hadjiliasi, L. Nisiotis, and I. Polycarpou. On the use of virtual
nents within an edge-hosted embodied-agent backend. The results                  agents in eduverse: A survey of embodied virtual agent types and fu-
demonstrate the feasibility of local service routing and contextual              ture research directions in Edu-verse applications. In 2025 IEEE In-
memory handling, while showing that larger models improve relia-                 ternational Symposium on Emerging Metaverse (ISEMV), pages 129–
bility at the cost of increased latency, requiring careful task alloca-          138. IEEE, 2025. 2
                                                                             [9] A. Hartholt, D. Traum, S. C. Marsella, A. Shapiro, G. Stratou,
tion and further optimisation for interactive use.
                                                                                 A. Leuski, L.-P. Morency, and J. Gratch. All together now: Introduc-
    However, several limitations remain. The evaluation was con-                 ing the virtual human toolkit. In Int Workshop on Intelligent Virtual
ducted in a controlled test-bed and therefore did not capture com-               Agents, pages 368–381. Springer, 2013. 2, 3
plete embodied user–agent interaction. It examined only selected            [10] S. Kopp, B. Krenn, S. Marsella, A. N. Marshall, C. Pelachaud,
CEAA processes, while the controlled prompt sets may not fully                   H. Pirker, K. R. Thórisson, and H. Vilhjálmsson. Towards a com-
represent unpredictable user behaviour. Although the LLM-as-a-                   mon framework for multimodal generation: The behavior markup lan-
judge protocol used predefined expected answers and human verifi-                guage. In International workshop on intelligent virtual agents, pages
cation, evaluation bias may remain. The findings are also limited to             205–217. Springer, 2006. 2, 3
three Qwen2.5 variants and a single Jetson edge configuration, re-          [11] J. E. Laird, A. Newell, and P. S. Rosenbloom. Soar: An architecture
stricting their generalisability to other SLM families and hardware              for general intelligence. Artificial intelligence, 33(1):1–64, 1987. 2, 3
platforms.                                                                  [12] Z. Lu, X. Li, D. Cai, R. Yi, F. Liu, X. Zhang, N. D. Lane, and M. Xu.
    The aggregate latency measurements did not isolate prompt                    Small language models: Survey, measurements, and insights, 2024. 2
preparation, decoding, fact extraction, SQLite access, retrieval, re-       [13] A. Maharana, D.-H. Lee, S. Tulyakov, M. Bansal, F. Barbieri, and
sponse generation, serialisation, or communication overhead. Fu-                 Y. Fang. Evaluating very long-term conversational memory of llm
ture profiling should measure each stage separately, report time to              agents. In Proc. of the 62nd Annual Meeting of the Association for
                                                                                 Computational Linguistics, pages 13851–13870, 2024. 2, 5
first token and generation throughput, and establish acceptable la-
                                                                            [14] R. Niewiadomski, E. Bevacqua, M. Mancini, and C. Pelachaud. Greta:
tency thresholds through user studies with embodied agents.
                                                                                 An interactive expressive ECA system. In Proceedings of the 8th In-
    The study was also limited to general-purpose generative SLMs                ternational Conference on Autonomous Agents and Multiagent Sys-
and did not compare keyword routing, embedding similarity, or                    tems (AAMAS 2009), volume 2, pages 1399–1400. International Foun-
task-specific fine-tuned SLMs, which showed potential for service                dation for Autonomous Agents and Multiagent Systems, 2009. 3
routing in our previous work [15]. The results therefore demon-             [15] L. Nisiotis and A. Hadjiliasi. From prompt to service: An slm-based
strate feasibility and model-size trade-offs rather than the superior-           agent orchestration gateway for ai-driven virtual worlds. In Proceed-
ity of generative SLMs.                                                          ings of the 2026 IEEE 3rd International Symposium on Emerging
    As such, future work should benchmark these alternatives for                 Metaverse (ISEMV), Cyprus, Oct. 2026. In press. 2, 3, 6
service selection and memory-action classification, while indepen-          [16] L. Nisiotis, A. Hadjiliasi, F. Alexandrou, and L. Alboul. Interwoven
dently measuring classification accuracy, extraction fidelity, re-               spaces with xr, ai, and robots: Merging realities in space and time. In
trieval recall, correction resolution, and answer accuracy. Memory               Museums and Technologies of Presence, pages 243–261. Routledge,
evaluation should also extend beyond paired write–read prompts                   2023. 3
to richer long-term structures, including episodic, semantic, pro-          [17] J. S. Park, J. O’Brien, C. J. Cai, M. R. Morris, P. Liang, and M. S.
cedural, spatial, and user-preference memory. Finally, human-                    Bernstein. Generative agents: Interactive simulacra of human behav-
participant evaluations should assess whether edge-based SLMs                    ior. In Proceedings of the 36th annual ACM symposium on user inter-
                                                                                 face software and technology, pages 1–22, 2023. 2, 5
can support adaptive, persistent, and context-aware embodied
                                                                            [18] A. S. Rao, M. P. Georgeff, et al. Bdi agents: From theory to practice.
agents in realistic virtual-world scenarios.
                                                                                 In Icmas, volume 95, pages 312–319, 1995. 2, 3
                                                                            [19] T. Schick, J. Dwivedi-Yu, R. Dessı̀, R. Raileanu, M. Lomeli, E. Ham-
R EFERENCES                                                                      bro, L. Zettlemoyer, N. Cancedda, and T. Scialom. Toolformer: lan-
 [1] A. Baddeley. Working memory. Science, 255(5044):556–559, 1992.              guage models can teach themselves to use tools. Advances in neural
     2                                                                           information processing systems, 36:68539–68551, 2023. 5
 [2] P. Belcak, G. Heinrich, S. Diao, Y. Fu, X. Dong, S. Muralidharan,      [20] E. Tulving. Episodic and semantic memory, 1972. 2
     Y. C. Lin, and P. Molchanov. Small language models are the future of   [21] Y. Wang and X. Chen. Mirix: Multi-agent memory system for llm-
     agentic ai, 2025. 2                                                         based agents, 2025. 2
 [3] Y. K. Dwivedi, L. Hughes, A. M. Baabdullah, S. Ribeiro-Navarrete,      [22] M. Wooldridge and N. R. Jennings. Intelligent agents: Theory and
     M. Giannakis, M. M. Al-Debei, D. Dennehy, B. Metri, D. Buhalis,             practice. The Knowledge Engineering Review, 10(2):115–152, 1995.
     C. M. Cheung, et al. Metaverse beyond the hype: Multidisciplinary           2
     perspectives on emerging challenges, opportunities, and agenda for     [23] F.-C. Yang, P. Acevedo, S. Guo, M. Choi, and C. Mousas. Embodied
     research, practice and policy. International journal of information         conversational agents in extended reality: A systematic review. IEEE
     management, 66:102542, 2022. 1                                              Access, 2025. 2
 [4] J. Funge, X. Tu, and D. Terzopoulos. Cognitive modeling: Knowl-        [24] S. Yao, J. Zhao, D. Yu, N. Du, I. Shafran, K. Narasimhan, and Y. Cao.
     edge, reasoning and planning for intelligent characters. In Proceed-        React: Synergizing reasoning and acting in language models, 2022. 2,
     ings of the 26th annual conference on Computer graphics and inter-          5
     active techniques, pages 29–38, 1999. 2                                [25] Z. Zhou, X. Chen, E. Li, L. Zeng, K. Luo, and J. Zhang. Edge intel-
 [5] D. Griol, A. Sanchis, J. M. Molina, and Z. Callejas. Developing en-         ligence: Paving the last mile of artificial intelligence with edge com-
     hanced conversational agents for social virtual worlds. Neurocomput-        puting. Proceedings of the IEEE, 107(8):1738–1762, 2019. 2, 3
     ing, 354:27–40, 2019. 1

<!-- page break -->
