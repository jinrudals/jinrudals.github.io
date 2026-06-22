# SQLite Content Source Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Use a repo-managed SQLite database as the source for study posts and project pages during static SvelteKit builds.

**Architecture:** Store source content in `content/site.sqlite`. A Node build script shells out to the local `sqlite3` CLI, reads normalized tables as JSON, and writes `src/lib/generated/content.js`. Existing route `entries()` and `load()` functions keep consuming `src/lib/content.js`, so GitHub Pages still receives only prerendered static files.

**Tech Stack:** SvelteKit adapter-static, Node.js ESM scripts, SQLite CLI JSON output, Node test runner.

---

### Task 1: Generated Content Contract

**Files:**
- Modify: `tests/content.test.mjs`
- Create: `src/lib/generated/content.js`

- [ ] Add tests that assert study posts, labels, and project items are populated from generated content.
- [ ] Run `npm test` and confirm the tests fail because generated content is missing.
- [ ] Add the generated content file only through the generator in Task 2.

### Task 2: SQLite Generator

**Files:**
- Create: `content/schema.sql`
- Create: `content/seed.sql`
- Create: `content/site.sqlite`
- Create: `scripts/generate-content.mjs`
- Modify: `package.json`

- [ ] Define normalized tables for study posts, study tags, projects, project stack, and project highlights.
- [ ] Seed one study post and one project so dynamic routes prerender real examples.
- [ ] Implement `scripts/generate-content.mjs` using `sqlite3 -json`.
- [ ] Add `generate:content` and run it before `build`, `check`, and `test`.

### Task 3: Wire Existing Content Module

**Files:**
- Modify: `src/lib/content.js`

- [ ] Import `studyPosts` and `projectItems` from `src/lib/generated/content.js`.
- [ ] Keep existing helpers and static navigation/category metadata unchanged.
- [ ] Run `npm test`, `npm run check`, and `npm run build`.
