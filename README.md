# jinrudals.github.io

Personal site built with SvelteKit (static adapter) and mdsvex, deployed to GitHub Pages.

## Development

```bash
npm ci
npx playwright install chromium   # Mermaid diagrams are rendered at build time
npm run dev      # local dev server
npm run check    # type check (run before committing)
npm test         # unit tests for src/lib/*.test.ts
npm run build    # static build into build/
```

## Content

Posts are Markdown files under `src/content/<section>/`:

- `<slug>.md` — Korean (default)
- `<slug>.en.md` — optional English translation

Frontmatter: `title`, `date`, `summary`, `tags`, `draft`.
Untranslated posts are shown in Korean under `/en/` with a notice.

## Workflow

- `main` is protected: changes go through a pull request and must pass the `verify` CI check.
- Merging to `main` deploys automatically via `.github/workflows/deploy.yml`.
- Commits follow Angular-style conventional commits (`feat:`, `fix(scope):`, `docs:` ...).

See [AGENTS.md](AGENTS.md) for routing, i18n, and repository conventions.
