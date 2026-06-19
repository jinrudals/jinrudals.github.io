# SvelteKit GitHub Pages Setup

## Goal

Set up this repository as the source for `https://github.com/jinrudals/jinrudals.github.io`, served at `https://jinrudals.github.io/`.

## Architecture

The site will use SvelteKit with static prerendering. The app builds into plain HTML, CSS, and JavaScript that GitHub Pages can serve without a Node runtime.

The public information architecture has four top-level sections:

- `/`: landing page with a short introduction, featured projects, recent study notes, and career links.
- `/study`: blog-style study index with category pages and individual note pages.
- `/projects`: project portfolio index with individual project pages.
- `/career`: hub for resume, cover letter, and portfolio documents.

There is intentionally no `/about` page in the first version. Short introduction content belongs on the landing page; detailed career-oriented material belongs under `/career`.

## Deployment

GitHub Actions will build the SvelteKit app and publish the generated output to GitHub Pages. The repository keeps source files on `main`; deployment artifacts are handled by GitHub Pages.

## Routing

This is a user Pages site at the domain root, so no custom SvelteKit `base` path is needed.

## Verification

Local verification should run `npm run build`. During development, `npm run dev` starts the SvelteKit dev server.
