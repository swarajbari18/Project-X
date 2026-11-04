---
name: feedback-no-playwright
description: "Never use or install Playwright; any browser automation runs only in a sandbox, after asking; what was removed on 4 Nov 2026"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 546557b3-1f11-48e4-931e-7e7667d4f104
  modified: 2026-11-04T16:44:38.471Z
---

Never use or install Playwright, on this laptop or for this project. Any browser automation must run in a sandbox, and only after asking Swaraj first.

**Why:** Swaraj, 4 November 2026: "Playwright is highly unsecure. There are multiple CVEs that are active with Playwright." He asked for it to be completely removed from the laptop. The CVE claim was not checked separately, because it is his laptop and his call.

**How to apply:**
- If a real browser check seems needed, ask first, and offer a by-hand check in two windows instead.
- `lesson_07_real_browser_check.mjs` is not Playwright, but it is also not sandboxed. It runs the installed Chrome with its debug port open on 127.0.0.1. Do not run it outside a sandbox.
- Do not add a dependency that pulls Playwright in. Look before installing.

**Removed on 4 November 2026:**
- Codex's runtime copy (`playwright`, `playwright-core`), which may return when Codex updates
- `~/.cache/ms-playwright-go`
- the installed packages in the Assignment project's `node_modules`
- Codex's two curated Playwright skills, and three plugin templates
- `[mcp_servers.playwright]` in `~/.codex/config.toml`
- npm's cached listings for `playwright` and `@vitest/browser-playwright`

**Still there on purpose, or needing Swaraj:**
- `/usr/lib/chatgpt/resources/cua_node/lib/node_modules/` holds a real copy inside the ChatGPT app. It is root-owned, so it needs Swaraj's admin rights. A guard on this laptop stops agents using them.
- The Assignment project's `package.json` and `playwright.config.js` still name it. They are his source files, so a reinstall there would bring it back.
- These are not Playwright: cytoscape's test files inside Antigravity, an empty report folder in GENEAI_POC, a config file in the `hermes-agent` clone, an icon inside Cursor, and vitest's optional-dependency entry in lesson 6's lock file.
- Claude's synced `artifact-emulator` skill mentions it, and is for cloud sessions only.

The search was by file name, so a copy bundled inside another app's single file would not show up.

Related: [[feedback-ask-before-acting]], [[feedback-agent-memory-visible]].
