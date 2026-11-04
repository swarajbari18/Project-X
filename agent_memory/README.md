# Agent memory

This folder holds what the assistant has remembered about working with Swaraj on Project-X, the repository for Tend, his product. It is here so that Swaraj can read it and correct it. Any agent working in this project may read it.

Swaraj asked for this on 4 November 2026: "Do not store it in your Claude memory file. Store it in somewhere I can see in this project itself."

## What is here

- `MEMORY.md` is the index: one line per note.
- Each other file is one note. It has a name, a one-line description, a type, and the fact, usually with why it matters and how to use it.

The four types of note:
- **feedback:** how Swaraj wants the work done, including corrections.
- **project:** what is going on, and what was decided.
- **user:** who Swaraj is.
- **reference:** where to find things.

## How it stays current

Claude Code loads its memory from a hidden folder outside this project. These files started as a copy of that folder, on 4 November 2026. From now on, each new or changed note is written in both places. This folder is the one to read and correct.

If a note here is wrong, change it or delete it, and tell the assistant. The two copies can drift if only one is edited.

## This folder is on GitHub, on purpose

Swaraj decided on 4 November 2026 that this folder stays in the repository, which is public: "We'll just save everything to GitHub", because the laptop could be lost or damaged, and "No one is going to steal anything."

So never write a secret, a password or a key into a note here.

## Other notes kept in the open

The longer records are not in this folder:
- `knowledge_base/plans/situation_registrar/`: the first component's scope, rulings and plans.
- `knowledge_base/product design and engineering learning/`: the engineering lessons, and the learning record.
- `environments_simulation_and_whiteboard.md`: how Tend is tested and watched.
- `story_registry.md`: every story we test against.
- `research_insights.md`: what the research says about databases, evaluation and simulation.
