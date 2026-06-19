# SvelteKit GitHub Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a SvelteKit static site deployable to `https://jinrudals.github.io/`.

**Architecture:** SvelteKit renders the site statically with `@sveltejs/adapter-static`. GitHub Actions builds the app and publishes the generated output through GitHub Pages.

**Tech Stack:** SvelteKit, Vite, TypeScript, adapter-static, GitHub Actions.

---

## File Structure

- `package.json`: npm scripts and dependencies.
- `svelte.config.js`: SvelteKit static adapter configuration.
- `vite.config.ts`: Vite SvelteKit plugin configuration.
- `tsconfig.json`: TypeScript configuration extending SvelteKit generated config.
- `src/routes/+layout.ts`: enables prerendering for all routes.
- `src/routes/+page.svelte`: initial homepage.
- `src/app.html`: SvelteKit HTML shell.
- `src/app.css`: global styles.
- `.github/workflows/deploy.yml`: GitHub Pages build and deploy workflow.
- `.gitignore`: local dependency and build output exclusions.

### Task 1: Scaffold SvelteKit Static App

**Files:**
- Create: `package.json`
- Create: `svelte.config.js`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `src/app.html`
- Create: `src/app.css`
- Create: `src/routes/+layout.ts`
- Create: `src/routes/+page.svelte`
- Create: `.gitignore`

- [ ] **Step 1: Add project files**

Create the listed files with a minimal SvelteKit app using `@sveltejs/adapter-static`.

- [ ] **Step 2: Install dependencies**

Run: `npm install`
Expected: dependencies install and `package-lock.json` is created.

- [ ] **Step 3: Build locally**

Run: `npm run build`
Expected: SvelteKit generates a static build successfully.

### Task 2: Add GitHub Pages Deployment

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Add workflow**

Create a GitHub Actions workflow that installs dependencies, builds the SvelteKit app, uploads `build`, and deploys to GitHub Pages.

- [ ] **Step 2: Verify workflow syntax is present**

Run: `sed -n '1,220p' .github/workflows/deploy.yml`
Expected: workflow includes `configure-pages`, `upload-pages-artifact`, and `deploy-pages`.

### Task 3: Verify Repository State

**Files:**
- Read: all created files

- [ ] **Step 1: Check git status**

Run: `git status --short --branch`
Expected: created project files are visible and no unexpected generated build output is tracked.
