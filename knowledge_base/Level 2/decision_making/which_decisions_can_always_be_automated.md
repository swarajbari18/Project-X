# Which decisions can always be automated?

## Where this question comes from

The Product Vision says that predictable decisions should use clear rules, while situations requiring judgement should involve people.

The question is not asking which business outcomes Project X should own.

It asks which Project X behaviours can be selected and carried out automatically.

## Our current answer

The word “always” is too absolute across different businesses and capabilities.

The useful question is:

> Which Project X behaviours may be automated by default when explicit conditions are satisfied?

Predictable, bounded and reversible behaviours are the strongest candidates for automation.

Examples may include:

- retrieving information from a configured source;
- recording an event;
- monitoring a known condition;
- sending an approved status message;
- waiting for a defined event;
- or creating a routine human-work request.

These are examples of behaviour classes, not universal product decisions.

## Selection and execution are different

Project X may automatically select a behaviour while the system still checks whether it may execute it.

For example, Decision Making may select “update the order system.” The capability layer may then reject the request, require authorization or report that the external system is unavailable.

The LLM must not bypass those checks.

## When automation becomes unsafe

Automatic behaviour becomes more sensitive when it is:

- irreversible;
- expensive;
- customer- or legally consequential;
- based on unresolved ambiguity or conflict;
- dependent on an unclear policy;
- or likely to create a commitment the business has not approved.

The correct response is not always to stop the entire situation. Project X may choose a safe limited behaviour, create human work or escalate.

## Working decision

Project X should automate predictable next behaviours through explicit rules and capability constraints.

No behaviour is universally automatic merely because it is technically possible.

Automation defaults must be defined, traceable and tested for the relevant capability and business context.

## Later research

We need research for:

- which behaviours businesses consider routine;
- which actions are reversible or consequential;
- safe defaults for each capability;
- capability-specific timeouts and failure behaviour;
- and which actions require approval in different business contexts.

