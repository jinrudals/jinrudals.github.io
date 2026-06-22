PRAGMA foreign_keys = ON;

DELETE FROM project_highlights;
DELETE FROM project_stack;
DELETE FROM projects;
DELETE FROM study_post_tags;
DELETE FROM study_posts;

INSERT INTO study_posts (slug, category, title, date, summary, body)
VALUES (
  'sqlite-content-source',
  'frontend',
  'SQLite content source for static SvelteKit',
  '2026-06-22',
  'GitHub Pages can serve prerendered SvelteKit pages generated from a repo-managed SQLite database.',
  'SQLite is used only during build time.
The generated JavaScript module becomes the content source for SvelteKit routes.
GitHub Pages still receives static HTML, CSS, JavaScript, and assets.'
);

INSERT INTO study_post_tags (category, post_slug, tag, position)
VALUES
  ('frontend', 'sqlite-content-source', 'sqlite', 1),
  ('frontend', 'sqlite-content-source', 'sveltekit', 2);

INSERT INTO projects (slug, title, period, role, summary)
VALUES (
  'github-pages-content-db',
  'GitHub Pages Content DB',
  '2026',
  'Personal site architecture',
  'A static SvelteKit site whose study and project pages are generated from a repo-managed SQLite database.'
);

INSERT INTO project_stack (project_slug, item, position)
VALUES
  ('github-pages-content-db', 'SvelteKit', 1),
  ('github-pages-content-db', 'SQLite', 2),
  ('github-pages-content-db', 'GitHub Pages', 3);

INSERT INTO project_highlights (project_slug, item, position)
VALUES
  ('github-pages-content-db', 'Keeps content in a portable SQLite file committed with the repository.', 1),
  ('github-pages-content-db', 'Generates static routes at build time without a runtime server.', 2),
  ('github-pages-content-db', 'Preserves the existing study and project route structure.', 3);
