Okay, so we are building **Project X**. For now, just to refer to it, I am giving it a placeholder name called **tend** — this name is not final yet.

Before jumping in and implementing anything, I want to think through the software engineering aspect first. To that end, I have come up with a **three-level framework** of software engineering that I basically derived from first principles.

---

## Level 1 — Problem Framing

Level one is about **problem framing**: what problem are we solving?

At this level, we are **not** solving the problem. We are expanding on it and trying to figure out:

- What we are actually trying to solve
- Who the actors are and their responsibilities
- Their interactions
- System boundaries
- What needs to scale
- What can fail
- What is intentionally out of scope

The goal is to get an overall understanding. From this understanding, we create **Level 1 questions** — these are the problems we have expanded upon, and these are the problems we need to solve.

---

## Level 2 — Solution (Concepts, Not Tech)

To solve each problem, we use a **Level 2 framework**. For each problem, we:

- Find out the constraints
- Evaluate the trade-offs of the options and concepts that are there
- Make our decision
- Evaluate, etc.

We do **not** talk about technologies or tech stack here. We talk about **concepts**.

Level 2 is all about solution — it is never about tech stack. So instead of Redis, we will say **queue**. Instead of Celery, we will say **background worker**. Things like that.

---

## Level 3 — Tech Stack

Tech stack only comes at **Level 3**, where we decide which technologies to use to implement the solution we came up with at Level 2.


P.S. explined in detail at @three_level_framework/3_level_framework.md.
---

## Cloudflare-First Thinking

My current thought process is: we will use **Cloudflare for everything**. This is a Cloudflare-specific product, so our tech stack is going to be Cloudflare-specific as well.

The wisdom I am going to use here — if you know **Laravel and PHP**, what Laravel is is basically a collection of solutions to problems that devs used to face when developing applications using PHP. **Cloudflare** is also that: a collection of solutions to problems that already exist in the AWS, GCP, etc. ecosystem.

But they are **philosophically different** from what we are used to. We cannot simply go and say, "oh, we will use a SQL database" or "we will use a NoSQL database." The way Cloudflare philosophically works is different — tenant management, and everything else, is different. It already solves particular problems in its own way. We have to take advantage of that, and that is the main crux of it.

---

## Reading the Knowledge Base

Whenever you are understanding or looking at any piece of content from the documents in the **Knowledge Base** folder, keep this personal though process of mine in mind.
