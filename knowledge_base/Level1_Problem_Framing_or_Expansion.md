# Level 1 – Problem Framing

## 1. Business Objective

Before we design any system, we need to understand the problem the system exists to solve.

Tend exists to help a business understand what is happening in a customer interaction, decide the correct next step, and coordinate the people and systems needed to act.

Tend is a communication layer. It is responsible for the work behind the message: gathering information, checking it, deciding what should happen, and communicating the result through the appropriate channel.

Customer communication is the most visible part of the problem, but it is rarely the real problem.

A customer usually contacts a business because they need an answer, an update or an action.

Providing the correct response often requires information from multiple places.

That information may exist in business software.

It may exist with different employees.

It may exist in previous conversations.

Sometimes it does not exist yet.

Before the business can respond, it must first understand the situation.

Today, that understanding is often created manually.

Employees search through different systems.

They ask other employees for information.

They compare conflicting information.

They decide whether they have enough information to act.

Only then do they communicate with the customer.

This process is slow.

It is difficult to keep consistent.

It becomes harder as the business grows.

Tend exists to support this process.

Its primary responsibility is not to generate replies.

Its primary responsibility is to help the business understand the current situation well enough to make the correct next decision.

Sometimes that decision is to reply to the customer.

Sometimes it is to ask another employee for information.

Sometimes it is to update a business system.

Sometimes it is to wait until more information becomes available.

The objective is always the same.

Help the business reach the correct decision with the information available at that moment.

Everything else in the system exists to support that objective.

**The hardest problem Tend will face and try to solve is this: when the right next step requires a person to act, and that person does not act. Tend must make the inaction visible and keep the situation moving until someone safe takes responsibility.**

## 2. Assumptions

This section lists the assumptions that currently shape our understanding of the problem.

These assumptions are based on what we know today.

They are not permanent facts.

As we learn more from customers and real-world usage, some of these assumptions may change.

The architecture should be flexible enough to adapt when they do.

---



### Businesses want correct decisions more than fast decisions

We assume businesses value making the correct decision over making the fastest possible decision.

A delayed but correct response is usually better than a fast response based on incorrect information.

---



### Information is distributed

We assume the information needed to solve a customer problem is rarely stored in one place.

It is often spread across multiple business systems, employees and previous conversations.

---



### No single source always has the complete picture

We assume no single system or person always knows everything needed to make a decision.

Understanding usually requires combining information from multiple sources.

---



### Business knowledge changes over time

We assume customer information, business policies and operational processes change continuously.

A decision that is correct today may not be correct tomorrow.

The system must work with changing information instead of assuming that knowledge is static.

---



### Some situations require human judgement

We assume not every customer interaction can be handled automatically.

Some situations require business experience, policy decisions or approvals.

The system should recognise these situations instead of trying to automate everything.

---



### Information may be incomplete

We assume that important information will sometimes be missing.

The system should continue working even when it cannot immediately reach a final decision.

---



### Information may conflict

We assume different systems or different people may provide different answers.

The existence of conflicting information is normal.

The system should identify conflicts instead of hiding them.

---



### Businesses already have existing software

We assume businesses already use software to manage different parts of their operations.

Tend should work alongside these systems instead of assuming it owns every business process.

---



### Customer conversations are part of larger business operations

We assume a customer conversation is rarely an isolated event.

A single message may involve sales, operations, finance, logistics, customer support or other parts of the business.

The system should treat conversations as entry points into business operations rather than as isolated chat sessions.

---



### People move through different stages of a business relationship

We assume a person who asks about a product is not automatically a customer.

They may be a prospect, a customer waiting for an order, or a returning customer with a new need.

The correct next step depends on which stage they are in.

---



### Communication channels have different rules

We assume a business cannot start a message in the same way on every channel.

Some channels allow a business to reply but limit when it may start a new conversation.

The business must also respect the customer's consent and the rules that apply in the market where it operates.

Tend must treat these rules as part of the business situation.

---



### AI is a tool, not the decision maker

We assume artificial intelligence helps the business understand situations.

The business remains responsible for its own policies and decisions.

The system should assist people rather than replace their responsibility.

Tend is not just an AI product. It uses AI as one tool at runtime.

Tend may make operational decisions.

The business defines the policies within which those decisions are made.

Whenever those policies cannot be applied confidently, Tend involves the appropriate person.

---

These assumptions define how we currently understand the problem.

They should be reviewed regularly.

If an assumption changes, we should first ask whether the architecture should also change.

## 3. Unknowns

This section lists the important questions that we do not yet have confident answers to.

These are not implementation problems.

They are gaps in our understanding of the business problem.

As we learn more from customers and real-world usage, these unknowns should gradually become assumptions, decisions or requirements.

---



### How do businesses decide that they have enough information?

Different businesses may require different levels of confidence before taking action.

Some may act quickly with limited information.

Others may require multiple approvals or additional verification.

We do not yet know how these decisions vary across businesses.

---



### Which business decisions can be standardised?

Some operational decisions follow clear business rules.

Others depend on experience and judgement.

We do not yet know where that boundary exists across different industries.

---



### How much variation exists between businesses?

Businesses in different industries may handle similar customer situations in completely different ways.

We do not yet know which parts of Tend should be universal and which parts should be configurable.

---



### Which sources of information do businesses trust most?

When multiple systems provide different answers, businesses need a way to decide which information should be trusted.

We do not yet understand how businesses establish that trust today.

---



### How should conflicting information be resolved?

Identifying a conflict is only the first step.

Different businesses may resolve conflicts using different policies, different people or different approval processes.

We do not yet know what approaches are most common.

---



### When should a person become involved?

Some situations can continue automatically.

Others should immediately involve a human.

We do not yet know what signals businesses use to make that decision.

---



### What information should be remembered?

Not every conversation creates knowledge that is useful in the future.

We do not yet know which information businesses expect to retain and which information should simply remain part of the conversation history.

---



### How do businesses explain their own decisions?

Businesses often need to explain decisions to customers, employees or regulators.

We do not yet know what level of explanation businesses expect from a system like Tend.

---



### How should success be measured?

Different businesses may define success differently.

Some may value faster resolution.

Others may value fewer mistakes or greater consistency.

We do not yet know which outcomes matter most across different types of businesses.

---



### How will these needs change as businesses grow?

The way a business operates today may not be the way it operates in two years.

We do not yet understand how customer communication and operational decision-making evolve as organisations become larger and more complex.

---



### How does a business decide when to follow up with a prospect?

A prospect may not be ready to decide for a long time.

Some conversations need a follow-up. Others should be left alone.

Tend should follow up when following up adds value, and stay silent when silence is the better service.

We do not yet understand what signals businesses use to tell these two apart.

---



### Who is allowed to represent the business in a meeting with a customer?

Not every employee should take every kind of call.

An employee may take sales calls but not support calls, or work only certain hours.

Tend must use these preferences to choose the right person.

We do not yet understand how a business wants to express and override these rules as situations change.

---



### When is the right time to ask a customer for feedback?

Feedback is only useful after the customer has had time to use the product.

But the right amount of time is different for every product.

We do not yet understand how businesses want to set this, and how they want to route a bad review back into support.

---

These unknowns represent areas where further research is needed.

They should guide customer interviews, product discovery and architectural exploration.

As these questions are answered, this document should be updated to reflect our improved understanding of the problem.

## 4. Actors

An actor is any person, system or environment that has responsibilities, exchanges information with Tend or influences how Tend behaves.

Some actors exist outside Tend.

Some exist as part of Tend itself.

Together they define the environment in which the product operates.

---



### Tend

Tend is the system being designed.

Its responsibility is to help businesses make correct operational decisions during customer interactions.

It gathers information.

It identifies missing or conflicting information.

It determines whether enough information exists to proceed.

It recommends or performs the appropriate next action.

It communicates with people and systems.

It records what happened.

Tend is the central actor that coordinates the interaction between all other actors.

It does not do all of that work alone. One part of Tend is a reasoning model, described separately below, that Tend uses when a decision has to be figured out at runtime rather than read from a fixed rule.

---



### The Reasoning Model

The Reasoning Model is a part of Tend that runs at runtime.

It helps Tend decide how its independent parts should work together when a situation cannot be handled by a fixed procedure.

It does not own the business decision, override business rules, or remove the need for human approval.

---



## Business Actors



### Business

The business owns the customer relationship.

It defines policies, processes and operational goals.

It decides how the business should operate.

Tend supports those decisions.

The responsibility always remains with the business.

---



### Employees

Employees perform the work of the business.

They provide information.

They approve decisions.

They perform operational tasks.

They resolve situations that require human judgement.

Tend assists employees.

It does not replace them.

---



### Customers

Customers contact the business to request products, services, support or information.

They provide information about their situation.

They expect accurate and timely responses.

Customers interact with the business through Tend.

---

### Prospects

A prospect is a person who has contacted the business but has not yet bought from it.

They may want information about a product or service.

They may be deciding whether the business is right for them.

They may want to speak to a person before they decide.

They expect an accurate and timely answer, the same as a customer does.

But they are not yet a customer, and Tend must not treat them as if they were.

Each prospect is at some point in the journey toward a decision, and the correct next step depends on where they are.

Some prospects will become customers. Most will not.

Tend keeps track of where each prospect is so that it responds correctly to where they are, not where the business wishes they were.

---

### Business Owners / Administrators

The Business Owner is the person, or the group of people, who runs the business and carries final responsibility for it.

They may not use Tend every day.

They may delegate the setup to an assistant, an employee, or a family member who knows the business.

Even when they do not touch the system often, they decide who is allowed to configure Tend, who is allowed to approve actions, and what the business rules are.

The Owner does not care how many messages Tend handled or how reliably the service stayed online.

What the Owner cares about is the state of the journey: how many prospects are waiting, how many are close to buying, which orders are stuck, which customers are at risk.

When something needs a decision only the Owner can make, they want to step into that one situation, see what happened, decide, and let Tend continue.

The Owner can delegate their authority, and Tend must respect who holds which part of that authority at any moment.

---

---



## External System Actors



### Business Systems

Businesses already use software to manage different parts of their operations.

Examples include CRM systems, ERP systems, inventory systems, accounting systems and scheduling systems.

These systems provide information.

They may also receive updates from Tend.

---



### Communication Platforms

Communication platforms transport messages.

Examples include email, WhatsApp, SMS, web chat and phone systems.

They deliver messages between customers, employees and Tend.

---



### Identity Providers

Identity providers verify identities.

They authenticate users.

They authorise access to business resources.

Tend relies on them to establish trust.

---



### External Services

Businesses often depend on external organisations.

Examples include payment providers, shipping companies, government services and third-party APIs.

These services provide information or perform actions outside the business.

### External Business Partners

An External Business Partner is a separate organisation the business depends on, such as a delivery company the business uses to ship orders.

The partner does not belong to the business.

It has its own employees, its own people to contact, and its own rules about what it can see and do.

When a customer's problem depends on a partner paying, delivering, or investigating, the partner is a real actor in the situation.

Tend may have to pass information to that partner so the partner can act.

But the partner should only ever see the information it needs to do its job, never the full record of the customer or the business.

What the partner is allowed to see is a decision the business controls, and Tend enforces it.

The partner also owns its part of the work and is responsible for it.

Tend does not pretend to have the answers the partner is responsible for. It facilitates the communication that gets the partner to act.

---



### Time

Time continuously changes the business environment.

Deadlines pass.

Orders become overdue.

Appointments begin.

Policies expire.

Scheduled work starts.

Time does not make decisions.

It changes the state of the world.

Tend observes those changes and responds when necessary.

---



## Product Lifecycle Actors



### Product Builder

The Product Builder configures Tend for a business.

They connect external systems.

They define workflows.

They configure business policies.

They decide how Tend should behave for that organisation.

They do not participate in day-to-day customer interactions.

Instead, they shape how Tend operates before those interactions occur.

---



### Test & Simulation Environment

The Test & Simulation Environment validates how Tend behaves before changes reach production.

It simulates customers, employees, business systems and external events.

It verifies that Tend behaves as expected under both normal and unusual situations.

It helps ensure that changes do not introduce unexpected behaviour into real business operations.

---

These actors define the complete operating environment of Tend.

Every responsibility described in the next sections should belong to one or more of these actors.

If a responsibility cannot be assigned to an actor, then either the responsibility is unclear or an important actor is missing.

## 5. Responsibilities

This section describes what each actor is expected to do.

Responsibilities describe the work that belongs to each actor.

Some responsibilities involve other actors.

Those interactions are included here so that the responsibility is easy to understand.

The goal is not to describe how Tend is implemented.

The goal is to describe how work is divided between the actors.

---



## Tend

Tend receives information from customers, employees, business systems and external services.

Tend understands what the business is trying to achieve.

Tend determines what information is needed before a decision can be made.

Tend requests information from the appropriate actor when that information is missing.

Tend compares information received from different sources.

Tend identifies when different sources disagree.

Tend determines whether enough information is available to continue.

Tend decides whether it can continue automatically or whether a person needs to become involved.

Tend communicates with business systems when information needs to be retrieved or updated.

Tend sends and receives messages through communication platforms.

Tend asks the Identity Provider to verify a person's identity before allowing access.

Tend records important events, decisions and actions.

Tend explains why it reached a particular recommendation or decision.

---

## Reasoning Model

The reasoning model helps Tend decide how its independent parts should work together when a situation cannot be handled by a fixed procedure.

Tend is not a single large model. It is made of several independent parts, grouped around responsibilities that change together.

When the way those parts should work together is known ahead of time, Tend follows a fixed procedure.

When the correct interaction has to be worked out at runtime because the situation is changing, Tend uses the reasoning model to figure it out.

The reasoning model is a statistical model, commonly called a language model.

It is probabilistic, so its answer is not guaranteed like a fixed rule. It is useful for reasoning about an open situation, but it must not be used where a fixed rule is enough.

Tend uses the reasoning model where judgement is genuinely needed and keeps predictable decisions on rules that can be relied on.

The reasoning model proposes how Tend should proceed. Tend still checks the result against the information available, the business rules, permissions, and the need for human approval.

---



## Business

The business defines how it operates.

The business decides which actions require approval.

The business decides which actions Tend may perform automatically.

The business decides who can access different parts of the system.

The business connects Tend to its existing software.

The business decides which business systems Tend may use.

The business remains responsible for every business decision, even when Tend assists with that decision.

---



## Employees

Employees sign in before using Tend.

Employees identify themselves when requested.

Employees provide information that Tend cannot obtain elsewhere.

Employees answer questions that require business knowledge.

Employees approve or reject actions when approval is required.

Employees perform work that cannot or should not be automated.

Employees correct incorrect information when they discover it.

Employees use the information provided by Tend to make business decisions.

---



## Customers

Customers contact the business.

Customers ask questions.

Customers request products or services.

Customers provide information that only they know.

Customers confirm or correct information about themselves when requested.

Customers receive updates, questions and responses through the communication channels supported by the business.


---

## Prospects

Prospects contact the business to get information about products or services.

Prospects ask questions and make decisions about whether to buy.

Prospects provide information about themselves that only they know.

Prospects may ask to speak to a person before they decide.

Prospects expect an accurate and timely response, the same as customers do.

Tend tracks where each prospect is in the journey and responds to where they are.

A prospect is not the same as a customer, and the correct next step is different for each.

When a prospect becomes a customer, Tend records that change and treats them as a customer from then on.


## Business Owners / Administrators

Business Owners carry final responsibility for the business and its decisions.

They decide who may configure Tend, who may approve actions, and what the business rules are.

They may delegate setup and daily work to an assistant, employee, or trusted family member.

They decide how much authority each person holds, and Tend respects that.

Owners do not need to watch message counts or system uptime.

Owners need to see the state of the journey: prospects waiting, buyers close to deciding, deliveries stuck, customers at risk.

When an Owner makes a decision, they step into the one situation that needs them, see what happened, decide, and let Tend continue.

Owners can delegate their authority, and Tend must respect who holds each part of it.

---

---



## Business Systems

Business systems store the information that they own.

Business systems provide information when Tend requests it.

Business systems receive updates from Tend when the business allows those updates.

Business systems remain responsible for the accuracy of the information that they own.

---



## Communication Platforms

Communication platforms deliver messages between Tend, customers and employees.

Communication platforms notify Tend when new messages arrive.

Communication platforms deliver messages that Tend chooses to send.

Communication platforms are responsible for transporting messages, not understanding them.

---



## Identity Providers

Identity Providers receive authentication requests from Tend.

They verify the identity of users.

They inform Tend whether authentication was successful.

They provide identity information that Tend uses to decide whether access should be granted.

---



## External Services

External services receive requests from Tend.

They return information or perform actions that belong to their own systems.

They remain responsible for the information and operations that they own.


## External Business Partners

External Business Partners receive requests from Tend and act on them within their own organisation.

They include delivery companies, payment providers and other third parties the business depends on.

They have their own staff, their own people to contact, and their own rules.

They receive only the information they need to do their job, never the full record of the customer or the business.

What a partner may see is controlled by the business, and Tend enforces it.

The partner remains responsible for its part of the work.

Tend facilitates the communication that lets the partner act; it does not do the partner's job.

---



## Time

Time causes deadlines to pass.

Time causes appointments to begin.

Time causes scheduled work to start.

Time causes business information to become outdated.

Tend observes these changes and decides whether any action is required.

---



## Product Builder

The Product Builder creates and configures a Tend workspace for a business.

The Product Builder connects Tend to business systems and communication platforms.

The Product Builder defines workflows, policies and business rules.

The Product Builder decides what Tend is allowed to do automatically.

The Product Builder tests the configuration before it is used by the business.

The Product Builder updates the configuration as the business changes.

---



## Test & Simulation Environment

The Test & Simulation Environment simulates customers, employees, business systems and external services.

It sends realistic events to Tend.

It verifies that Tend behaves as expected.

It verifies that changes do not break existing behaviour.

It reports unexpected behaviour before the system is deployed.

## 6. Interactions

This section describes how the actors work together.

Each interaction begins with an event.

The actors then exchange information until the business reaches the correct next step.

The purpose of these interactions is to understand how work flows through Tend.

---



## A customer starts a conversation

A customer sends a message through one of the supported communication platforms.

The communication platform delivers the message to Tend.

Tend receives the message.

Tend understands the situation — building an explicit model of what the customer is actually asking, what is known, what is unknown, and what conflicts.

Tend retrieves information from business systems when available.

If information is missing, Tend asks the appropriate employee.

If information from different sources conflicts, Tend identifies the conflict.

Tend determines whether enough information exists to continue.

If more information is required, Tend waits or asks for it.

When enough information is available, Tend determines the correct next step.

If a response should be sent, Tend sends the response through the communication platform.

If another action should occur first, Tend performs or requests that action before responding.

---



## An employee signs in

An employee opens Tend.

The employee requests access.

Tend asks the Identity Provider to verify the employee's identity.

The Identity Provider returns the authentication result.

If authentication succeeds, Tend grants access according to the employee's permissions.

If authentication fails, Tend denies access.

---



## An employee provides information

Tend determines that information is missing.

Tend identifies the employee who is most likely to provide that information.

Tend requests the information.

The employee reviews the request.

The employee provides the required information.

Tend records the information.

Tend re-evaluates whether enough information now exists to continue.

---



## Tend retrieves information from a business system

Tend determines that information is required from a business system.

Tend sends a request to the appropriate system.

The business system returns the requested information.

Tend evaluates the returned information.

If additional information is required, Tend continues gathering it.

---



## Tend updates a business system

Tend determines that a business action requires a system update.

Tend verifies that the business allows this action.

Tend sends the update to the business system.

The business system confirms whether the update succeeded.

Tend records the outcome.

If the update fails, Tend determines the next appropriate action.

---



## A business rule requires approval

Tend determines that the next action requires human approval.

Tend identifies the appropriate employee.

Tend sends the approval request.

The employee reviews the available information.

The employee approves or rejects the action.

Tend records the decision.

If approved, Tend continues.

If rejected, Tend follows the business policy for that situation.

If there is inaction, Tend escalates as per business rules

---



## Time changes the situation

Time passes.

A scheduled event occurs.

A deadline expires.

A reminder becomes due.

Tend detects the change.

Tend determines whether any business action is now required.

If action is required, Tend begins gathering the information needed for that situation.

---



## A prospect inquires about a product or service

A prospect sends a message through one of the supported communication platforms.

Tend receives the message.

Tend understands what the prospect is actually asking.

If the answer already exists in the knowledge the business has built up, Tend gives it directly.

If no answer exists, Tend does not guess.

Tend asks the employee most likely to know, gets the answer, and passes it on to the prospect.

Tend records where this prospect is in the journey.

Tend does not treat this prospect as a customer yet, because they have not bought.

The correct next step depends on where the prospect is, and Tend uses that to decide what to do.

---



## A prospect wants to speak to a person

A prospect decides they want to talk to a real person before they decide to buy.

Tend finds the right employee for this kind of conversation.

An employee may have a free calendar yet still be genuinely busy, so Tend does not rely on the calendar alone.

Tend uses the employee's preferences, the type of call, and the rules the business has set to choose who is right for this prospect and this situation.

Tend schedules the call only in a time that is actually open for that employee.

When the call is scheduled, Tend records what was agreed and what should happen next.

If the prospect buys after the call, Tend follows up with what comes next.

If the prospect wants time to think, Tend gives them that time and does not forget them.

---



## A delivery problem reaches an external partner

A customer's order is stuck and the business has not been able to move it.

Tend prepares the full trail of what happened, in order, so the people acting can see exactly what led to this point.

An employee inside the business who is working on the problem sees the whole picture.

If the employee does not act, Tend escalates.

When the situation needs the delivery partner, Tend contacts the partner's named person on the business's behalf.

The partner only receives the information it needs to do its job, such as the tracking number.

The partner does not receive the customer's private details or the full record of the situation.

What the partner is allowed to see is decided by the business, and Tend enforces it.

The partner acts, and Tend passes the result back to the business and the customer.

Tend did not perform the partner's work. It made the communication that let the partner act.

---



## Tend asks a returned customer for feedback

The customer has received the product, and the business wants a real answer about whether it met the promise.

Tend waits until the customer has had time to actually use the product.

How long to wait is a rule the business sets.

When the time comes, Tend chooses a channel the business is allowed to start a message on.

Not every channel allows a business to contact a customer first. WhatsApp and Telegram place strict limits on that, while email does not.

Tend uses the channel the customer has agreed to.

When the customer gives feedback, a low rating is not left to sit.

Tend routes it to the right employee so the problem can be fixed, and the customer is told that the business acted on it.

---



## The Product Builder configures Tend

The Product Builder creates or updates the business configuration.

The Product Builder connects business systems.

The Product Builder defines workflows, permissions and business rules.

The Product Builder validates the configuration.

The configuration becomes available for the business to use.

---



## The Test & Simulation Environment validates Tend

The Test & Simulation Environment creates simulated business scenarios.

It sends events to Tend.

It simulates responses from customers, employees and external systems.

Tend processes those events.

The Test & Simulation Environment verifies that Tend behaves as expected.

Any unexpected behaviour is reported before deployment.

## 7. System Boundaries

This section defines the responsibilities that belong to Tend and the responsibilities that belong to other actors.

A clear boundary helps prevent confusion.

It also helps ensure that Tend does not take ownership of problems that belong somewhere else.

---



## What belongs to Tend

Tend is responsible for understanding customer situations.

Tend is responsible for gathering information from the appropriate sources.

Tend is responsible for identifying missing information.

Tend is responsible for identifying conflicting information.

Tend is responsible for determining whether enough information exists to continue.

Tend is responsible for recommending or performing the next business action when permitted.

Tend is responsible for involving people when human judgement is required.

Tend is responsible for communicating with business systems and communication platforms.

Tend is responsible for recording important business events, decisions and outcomes.

Tend is responsible for explaining how it reached a recommendation or decision.

Tend is responsible for deciding which channel it may use to start a message on its own.

Not every channel allows a business to contact a customer first.

Tend is responsible for knowing those rules and choosing the channel the customer has agreed to.

Tend is responsible for watching the journey of each person, so that a prospect is not treated as a customer and a returned customer is not treated as new.

---



## What does not belong to Tend

Tend does not define how a business operates.

Tend does not create business policies.

Tend does not decide who owns the business.

Tend does not replace existing business systems.

Tend does not become the system of record for information owned by another system.

Tend does not invent missing information.

Tend does not ignore conflicting information.

Tend does not override business approvals.

Tend does not replace human judgement when the business requires a person to make the decision.

Tend does not authenticate users.

It requests authentication from an Identity Provider.

Tend does not transport messages.

It sends and receives messages through communication platforms.

Tend does not own customer identities.

It uses the identities provided by the business and its identity systems.

Tend does not control external services.

It requests information or actions from them.

Tend does not decide how an external partner performs its work.

Tend does not give an external partner the full record of a customer or the business.

It coordinates the partner through the information the business has allowed that partner to receive.

---



## Shared responsibilities

Some responsibilities require Tend and another actor to work together.

The responsibility is shared.

The ownership is not.

For example, signing in requires both Tend and the Identity Provider.

Tend requests authentication.

The Identity Provider verifies identity.

Tend grants or denies access based on the result.

Neither actor owns the entire process.

Each actor owns its own part.

The same principle applies throughout the system.

Tend coordinates work.

Other actors perform the responsibilities that belong to them.

---



## When the boundary is unclear

Whenever a new feature is proposed, we should ask four questions.

Does this responsibility already belong to another actor?

Does Tend need to own this responsibility?

Can Tend coordinate the work instead of owning it?

Will taking this responsibility make Tend responsible for something outside its purpose?

If the answer to the last question is yes, the feature should be reconsidered before moving into design.

## 8. Product Invariants

This section defines the rules that must always remain true.

They apply to every feature, every workflow and every future version of Tend.

A new capability may be added.

An existing implementation may change.

These rules should not.

If an invariant is violated, Tend is behaving incorrectly.

---



### Tend never guesses.

If Tend does not have enough information, it does not invent an answer.

It identifies what is missing.

It asks for more information or stops until enough information is available.

---



### Every decision is based on the information available at that moment.

Tend makes decisions using the information it has.

It does not assume information that has not been received.

If new information arrives later, Tend may reach a different decision.

---



### Every important decision can be explained.

If Tend recommends an action, it should be able to explain why.

The explanation should identify the information that influenced the recommendation.

People should never be expected to blindly trust the system.

---



### Every important action can be traced.

The business should be able to understand what happened.

It should be possible to see:

- what triggered the action,
- what information was used,
- what decision was made,
- what action followed.

---



### Tend never owns information that belongs to another system.

Business systems remain responsible for the information that they own.

Tend may retrieve that information.

Tend may use that information.

Tend does not become the source of truth for that information.

---



### Human responsibility always remains with humans.

Tend may recommend actions.

Tend may perform actions that the business has authorised.

The business remains responsible for its own decisions.

When human approval is required, Tend waits for that approval.

---



### Tend does not confuse a prospect with a customer.

Tend records whether a person is still deciding, has bought, is receiving support, or has returned with a new need.

It uses that stage when deciding what should happen next.

---



### Tend does not share more information than an actor needs.

An employee may need the full history of a situation.

An external partner may need only a tracking number or another limited piece of information.

Tend follows the business's permission and data-sharing rules for each actor.

---



### Tend does not leave waiting work without a reason.

When work is waiting for a person, a system, a time, or a response, the reason for waiting remains visible.

The business can see what is being waited for and what should happen when waiting ends.

---



### Tend always works with the latest known state.

Business situations change.

Customers send new messages.

Employees update information.

Business systems change.

Tend should always base its next decision on the latest information available.

---



### Every interaction moves the situation forward.

Every interaction should have a purpose.

It should collect information.

Resolve uncertainty.

Perform an action.

Or communicate a decision.

Tend should never perform work that does not help move the business towards the correct next step.

---



### Tend coordinates work.

Other actors own their own responsibilities.

Tend brings those responsibilities together.

It does not replace them.

It does not compete with them.

It coordinates them.

---



### The business remains in control.

The business decides how Tend is configured.

The business decides what Tend is allowed to do.

The business decides its own policies.

Tend adapts to the business.

The business should never be forced to adapt to Tend.

## 9. Failure Classes

No business operates perfectly.

Information may be missing.

People may make mistakes.

Systems may become unavailable.

Customers may provide incorrect information.

Tend cannot prevent every failure.

Its responsibility is to recognise failures, respond appropriately and help the business continue operating safely.

This section describes the types of failures that Tend must expect.

---



## Missing information

A decision cannot always be made immediately.

Required information may not exist.

It may not have been collected yet.

It may only be known by another person.

When information is missing, Tend should identify what is missing.

It should request that information or wait until it becomes available.

It should never guess.

---



## Conflicting information

Different sources may provide different answers.

An employee may disagree with a business system.

Two business systems may disagree with each other.

Two employees may provide different information.

Tend should identify the conflict.

It should not silently choose one answer unless the business has explicitly defined how conflicts should be resolved.

---



## Incorrect information

Information may exist but still be wrong.

A customer may provide an incorrect order number.

An employee may accidentally update the wrong record.

A business system may contain outdated information.

Tend should work with the information it receives, but it should also make it possible for incorrect information to be corrected.

---



## Unavailable actors

Sometimes an actor cannot participate.

An employee may be unavailable.

A business system may not respond.

An external service may be temporarily unavailable.

A communication platform may fail to deliver messages.

Tend should recognise that the actor is unavailable.

It should determine whether work can continue without that actor.

If not, it should pause safely until the actor becomes available again.

---



## Authentication and authorisation failures

A person may not be able to prove their identity.

A person may not have permission to perform an action.

Tend should deny access or prevent the action.

It should not bypass business security rules.

---



## Business rule violations

A requested action may violate the business's own policies.

An approval may be required.

A required document may be missing.

A customer may not satisfy the conditions for the requested action.

Tend should recognise the violation.

It should follow the business policy instead of attempting to continue.

---



## Communication failures

Messages may not reach their destination.

A customer may not respond.

An employee may not acknowledge a request.

An external platform may reject a message.

Tend should recognise that communication did not complete successfully.

It should determine the appropriate next step instead of assuming the communication succeeded.

---



## Business inaction

Tend may ask an employee or an external partner to provide information or perform an action.

The person may not respond.

The request may be ignored because nobody knows who owns it.

The assigned person may be unavailable, or may believe that somebody else is responsible.

Tend should make the responsibility and the deadline visible.

If the person does not act, Tend should follow the business's escalation rules.

It may remind the person, send the request to somebody else, notify the owner, or pause safely until a person takes responsibility.

Tend should never hide inaction or act as if the requested work was completed.

---



## Unexpected situations

A customer may ask something the business has never encountered before.

A business process may change.

A new external system may behave differently.

A situation may not match any existing workflow.

Tend should recognise that it does not know how to proceed.

It should involve the appropriate person instead of making unsupported decisions.

---

Every failure should lead to one question.

**"What is the safest correct next step?"**

The answer may be to continue.

It may be to wait.

It may be to ask for more information.

It may be to involve a person.

It should never be to pretend that the failure did not occur.

## 10. Scaling Dimensions

Businesses do not grow in a single direction.

One business may gain more customers.

Another may hire more employees.

Another may expand into new locations.

Another may connect more software systems.

Each type of growth creates different challenges.

This section identifies the ways the business itself may grow.

These dimensions help us understand where future complexity will come from.

---



## More customers

The business may serve more customers.

More customers create more conversations.

More conversations create more decisions.

Tend should continue helping the business understand each situation without allowing one customer's work to affect another customer's work.

---



## More employees

The business may hire more employees.

More employees create more knowledge.

They also create more coordination.

Different employees may work on the same customer.

Different employees may have different responsibilities.

Tend should help employees work together without creating confusion.

---



## More conversations

The number of active conversations may increase.

Many conversations may happen at the same time.

Each conversation should remain independent.

Work on one conversation should not interfere with another.

---



## More business systems

As businesses grow, they often adopt additional software.

New systems may become sources of information.

Existing systems may be replaced.

Tend should be able to work with changing business systems without changing its core purpose.

---



## More communication channels

Customers may contact the business through additional channels.

Email may be joined by WhatsApp.

WhatsApp may be joined by web chat.

Future channels may also be added.

The way customers contact the business may change.

The responsibility of understanding the customer should not.

---



## More business processes

Businesses often introduce new products, services and operational procedures.

New workflows may be required.

Existing workflows may change.

Tend should adapt to those changes without changing its fundamental behaviour.

---



## More locations

A business may expand into multiple cities or countries.

Different locations may operate differently.

Policies may vary.

Working hours may differ.

Local regulations may apply.

Tend should support these differences while maintaining a consistent approach.

---



## More integrations

Businesses may connect more external services over time.

New payment providers may be added.

New logistics partners may be introduced.

New internal software may be connected.

Tend should continue coordinating work regardless of which external systems participate.

---



## More knowledge

As the business operates, it learns.

Policies change.

Processes improve.

New exceptions are discovered.

Customer history grows.

Tend should help the business use that growing knowledge instead of forcing it to start from the beginning for every interaction.

---

Growth should increase the amount of work.

It should not require changing the purpose of Tend.

If supporting a new type of growth requires changing the fundamental responsibilities of the system, we should first question whether that growth belongs within Tend's scope.

---

## A business can grow from one person to a large team without Tend changing shape

The rules that make a one-person business work are the same rules that make a large team work.

What changes is how detailed the rules are, not what the rules are.

A one-person business may have one person who handles everything.

A large team may have separate people for sales, support, delivery and accounts, with someone approving each step.

Both are the same kind of work: understand the situation, decide the correct next step, act, and trace what happened.

Tend is built so that adding people and adding levels of approval does not change what Tend fundamentally is.

The same core serves a single founder and a large team. The difference is how much is configured, not different machinery.

The same is true across countries and languages.

The part of Tend that understands the customer is the same everywhere.

What changes from market to market is which channels are popular, what the rules allow a business to send on its own, and which systems the business already uses.

Those are configuration, not new product logic.

That is why Tend keeps the decision-making the same and treats everything that differs between businesses and markets as settings the business controls.

## 11. Out of Scope

This document defines the problem that Tend is trying to solve.

It also defines what is intentionally outside that problem.

Keeping these boundaries clear helps prevent unnecessary complexity.

If a future feature falls into one of these areas, we should first decide whether it belongs inside Tend before designing a solution.

---



## Running the business

Tend helps businesses operate.

It does not operate the business.

Business strategy, pricing, hiring, financial decisions and company policies remain outside the scope of Tend.

---



## Replacing existing business software

Businesses already use software for accounting, inventory, customer management, scheduling and many other functions.

Tend works alongside those systems.

Replacing them is outside the scope of Tend.

---



## Becoming the source of truth

Tend uses information from many systems.

It may temporarily hold or process that information.

It does not become the permanent owner of information that belongs somewhere else.

Ownership remains with the appropriate business system.

---



## Defining business policies

Every business operates differently.

Tend applies business policies.

It does not decide what those policies should be.

The business remains responsible for defining them.

---



## Replacing human judgement

Some business decisions require experience, accountability or legal responsibility.

Tend may assist those decisions.

It does not replace the people responsible for making them.

---



## Solving every business problem

Not every operational problem should be solved by Tend.

Some problems belong entirely within another system.

Some problems require changes to business processes instead of software.

Some problems require people rather than automation.

Tend should only take responsibility for problems that fall within its defined purpose.

---



## Technology decisions

This document does not choose technologies.

It does not decide programming languages.

It does not decide cloud providers.

It does not define databases, APIs or infrastructure.

Those decisions belong to later stages of the architecture.

---

Whenever a new feature is proposed, the first question should be:

**"Is this inside the problem that Tend exists to solve?"**

If the answer is no, the feature should not move forward until the scope of the product itself has been reconsidered.

## 12. Engineering Questions (Level 2 Questions)

This document defines the problem.

It intentionally does not define the solution.

Before Tend can be designed, the following questions must be answered.

Some questions may produce a single decision.

Others may require research, experimentation or customer interviews.

These questions form the starting point for Level 2.

---



# Understanding the Situation

What does it mean to understand what a customer is actually asking, and how do we recognise when the customer's stated problem is not the real problem?

How do we determine whether multiple messages belong to the same situation, and whether two seemingly different conversations are actually related?

How do we determine which information is relevant to the current situation, and which information should be ignored?

How do we recognise ambiguity and uncertainty?

---



# Gathering Information

How do we determine what information is required before making a decision?

How do we know which actor owns each piece of information?

How do we discover where information lives?

How do we prioritise which information to retrieve first?

How do we avoid retrieving unnecessary information?

How do we know when information is sufficiently current?

How do we handle information that arrives gradually?

How do we handle information that changes while a situation is being analysed?

---



# Trust and Evidence

How do we determine whether information should be trusted?

How do we represent confidence without pretending certainty?

How do we compare information from different sources?

How do we identify conflicting information?

How do we resolve conflicts?

When should conflicts automatically stop the workflow?

When should conflicts simply be presented to a person?

What makes one source more authoritative than another?

How do we distinguish facts from assumptions?

---



# Decision Making

What does "enough information" mean?

How do we determine whether Tend can make the next decision?

Which decisions can always be automated?

Which decisions must always involve a person?

Which decisions depend on business policy?

Which decisions depend on confidence?

How do we represent business policies?

How do businesses define approval rules?

How do we ensure different employees reach consistent decisions?

---



# Human Collaboration

When should Tend involve a person?

How do we determine the correct person?

How do we handle multiple people working on the same situation?

How do we avoid interrupting people unnecessarily?

How do we transfer work between employees?

How do we represent ownership of ongoing work?

What happens when nobody responds?

What happens when the responsible person is unavailable?

---



# Memory and Knowledge

What should Tend remember?

What should never become memory?

What belongs in conversation history?

What belongs in long-term business knowledge?

How should previous conversations influence future decisions?

How do we prevent outdated knowledge from influencing new decisions?

How do we update knowledge when reality changes?

Who owns business knowledge?

Can Tend learn automatically?

If so, what kind of learning is acceptable?

---



# Communication

When should Tend communicate?

When should Tend wait?

When should Tend ask a question instead of performing an action?

When should Tend explain its reasoning?

How much explanation should different users receive?

How should communication differ between customers and employees?

How do we communicate uncertainty?

How do we communicate conflicting information?

---



# Authority and Ownership

Which actor owns each type of information?

Which actor owns each decision?

Which actor owns each action?

When is Tend allowed to perform an action?

When must Tend ask for approval?

Can Tend ever override a human decision?

Can a human override Tend?

Who remains accountable after an automated action?

How do we prevent responsibility from becoming unclear?

---



# Coordination

How do independent actors work together?

How do we coordinate long-running work?

How do we know that a piece of work is still active?

How do we represent work that is waiting?

How do we represent work that is blocked?

How do multiple business processes interact?

How do we prevent duplicated work?

How do we recover interrupted work?

---



# Time

How should Tend react when time changes the situation?

How should deadlines influence decisions?

How should scheduled work begin?

How should waiting be represented?

When should waiting end automatically?

How should forgotten work be rediscovered?

---



# Failure

How do we recognise failure?

How do we distinguish failure from uncertainty?

How do we recover after failures?

Which failures require immediate attention?

Which failures can safely wait?

How do we continue working when only part of the system is unavailable?

How do we avoid repeating the same failed action forever?

How do we keep the business safe while recovering?

---



# Explainability and Observation

How do we explain every recommendation?

How do we explain every action?

How do we explain every failure?

What information should always be visible to the business?

What information should only be visible to administrators?

How do we reconstruct an entire business situation after it has finished?

How do we observe the health of the overall system?

How do we recognise that the system is behaving unexpectedly?

---



# Growth and Evolution

How do new business systems become part of Tend?

How do new communication channels become part of Tend?

How do new business policies become part of Tend?

How do new workflows become part of Tend?

How do businesses customise Tend without changing its core behaviour?

How do we support businesses that operate differently from one another?

How do we evolve Tend without breaking existing businesses?

---



# Architecture

What are the major responsibilities that naturally belong together?

Where should the boundaries between subsystems exist?

Which responsibilities require independent lifecycles?

Which responsibilities require strong consistency?

Which responsibilities can operate independently?

Which responsibilities coordinate other responsibilities?

Which responsibilities are event-driven?

Which responsibilities are request-driven?

Where should state exist?

Where should decisions be made?

Where should coordination happen?

What should be stateless?

What should be stateful?

What should be synchronous?

What should be asynchronous?

What should be durable?

What should be ephemeral?

What should be observable?

Only after answering these questions should we ask:

"What is the best architecture to implement these responsibilities?"

Only after the architecture is understood should we ask:

"What technologies best implement that architecture?"

# Journey and Lifecycle

How should Tend represent the difference between a prospect, a customer, and a returning customer?

How should one customer have several open situations at the same time?

How should a conversation that contains several problems be split into separate situations?

How should waiting for a meeting, a delivery, a payment, a repair, or a feedback date be represented?

How should Tend know when a waiting period has ended?

---

# Meetings and Human Work

How should Tend decide which person is suitable for a meeting?

How should employee availability, preferences, meeting type, and business rules work together?

How should Tend handle a meeting that is cancelled, missed, or rescheduled?

How should Tend represent who is responsible for the next step after a meeting?

How should Tend escalate work when a person does not act?

How should an external partner be contacted when the business has not acted?

---

# Channels and Permissions

How should Tend represent what each communication channel allows a business to send?

How should Tend record consent and the customer's preferred channel?

How should Tend choose between replying in the current channel and starting a message in another channel?

How should Tend decide what information each employee, customer, or external partner may see?

---

# Business View and Authority

What should the business owner see in a snapshot of the business journey?

Which events should require the owner's attention?

How should an owner delegate setup, approval, and configuration responsibilities?

How should authority change when an employee leaves, becomes unavailable, or changes role?

# Complaince and Security

What are the compliances of each actors and each tech stack that we will be using

How to make a software product secure? What are the best security practices

How do I think and audit whatever I have implemented at each point with a particular security framework that I can apply to find gaps in compliances and security? This kind of a framework should be made
