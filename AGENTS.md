# AGENTS.md

## Repository

This repository contains the SvelteKit source for `jinrudals.github.io`.

## Development

- `npm run dev` for local development, `npm run check` before committing, `npm run build` for the static GitHub Pages build.
- Mermaid diagrams are rendered at build time, so Playwright Chromium is required: `npx playwright install chromium`.

## Content

Posts are Markdown (mdsvex) files with frontmatter (`title`, `date`, `summary`, `tags`, `draft`) under `src/content/<section>/<slug>.md`. Svelte components can be used inside them, and ```` ```mermaid ```` blocks render to inline SVG.

## Routing

- `/`: landing with recent writing
- `/writing`, `/writing/[slug]`: essays and reflections (e.g. DevOps in manufacturing)
- `/study`, `/study/[slug]`: short study notes
- `/projects`, `/projects/[slug]`: projects
- `/resume`: resume
- `/notes`, `/notes/[slug]`: personal notes

## Commit Convention

Use Angular-style conventional commits:

```text
<type>(<scope>): <subject>
```

Use a scope when it adds useful context. Omit it when the change is repository-wide.

Common types:

- `feat`: new user-facing functionality
- `fix`: bug fixes
- `docs`: documentation-only changes
- `style`: formatting changes that do not affect behavior
- `refactor`: code changes that do not add features or fix bugs
- `test`: tests only
- `chore`: build, tooling, dependency, or maintenance work

Examples:

```text
feat: initialize personal site
fix(study): support empty post lists
docs: document repository workflow
```
