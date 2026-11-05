# AGENTS.md

## Repository

This repository contains the SvelteKit source for `jinrudals.github.io`.

## Development

- `npm run dev` for local development, `npm run check` before committing, `npm run build` for the static GitHub Pages build.
- Mermaid diagrams are rendered at build time, so Playwright Chromium is required: `npx playwright install chromium`.

## Content

Posts are Markdown (mdsvex) files with frontmatter (`title`, `date`, `summary`, `tags`, `draft`) under `src/content/<section>/<slug>.md` (Korean, default) and optionally `<slug>.en.md` (English). Untranslated posts are shown in Korean under `/en/` with a notice; the English list only shows posts that have an English file. Svelte components can be used inside them, and ```` ```mermaid ```` blocks render to inline SVG.

Study posts can belong to a series via frontmatter: `series` (id, e.g. `terraform`), `part` (e.g. `concepts`, `practice`; order set by `SECTION_ORDER` in `src/lib/content-select.ts`) and `order` (number within the part). Display names live in `src/lib/i18n.ts` as `series.<id>` and `section.<part>`.

## i18n

- Languages: `ko` (default, `/...`) and `en` (`/en/...`) via the optional route param `[[lang=lang]]`.
- UI strings live in `src/lib/i18n.ts` (`t`, `localePath`, `switchPath`); localized data (e.g. `src/lib/career.ts`) uses `{ ko, en }` values.
- First visit with an English browser redirects to `/en/...` (inline script in `src/app.html`); the header `KO | EN` toggle stores the choice in `localStorage.lang`.
- `npm test` runs the pure-function tests (`src/lib/*.test.ts`) with the Node test runner.

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
