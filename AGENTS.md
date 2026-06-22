# AGENTS.md

## Repository

This repository contains the SvelteKit source for `jinrudals.github.io`.

## Development

- Use `npm run dev` for local development.
- Use `npm run check` before committing.
- Use `npm run build` to verify the static GitHub Pages build.
- The content source is the repo-managed SQLite database at `content/site.sqlite`.
- `npm run dev`, `npm run check`, `npm run test`, and `npm run build` run `npm run generate:content` first.
- Do not hand-edit `src/lib/generated/content.js`; update `content/site.sqlite` and regenerate it.
- The local and CI environments must have the `sqlite3` CLI available.

## Content

Study posts and project items are read from SQLite at build time, then prerendered into static pages for GitHub Pages.

- Keep schema changes in `content/schema.sql`.
- Keep seed or example content in `content/seed.sql` when it is useful for rebuilding the local database.
- Run `npm run generate:content` after changing `content/site.sqlite` if you need to inspect generated content before starting the dev server.
- Commit `content/site.sqlite` together with any generated content changes that affect pages.

## Routing

The site is organized as a personal GitHub Pages hub. Keep the first version intentionally light on personal details until real content is provided.

- `/`: Landing page. Explains that the site will collect personal records, study notes, projects, and career documents.
- `/study`: Blog-style study index. Shows study categories, labels, and an empty state when no posts exist.
- `/study/[category]`: Category page for study notes, such as `backend`, `frontend`, `cs`, `infra`, `ai`, and `til`.
- `/study/[category]/[slug]`: Individual study note page. This route is generated only when study posts exist.
- `/study/labels/[label]`: Label-filtered study page. This route is generated only when labels exist.
- `/projects`: Project index. Shows an empty state until real projects are added.
- `/projects/[slug]`: Individual project detail page. This route is generated only when project items exist.
- `/career`: Career document hub.
- `/career/resume`: Resume page.
- `/career/cover-letter`: Cover letter page.
- `/career/portfolio`: Portfolio summary page that can later link to project detail pages.

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
