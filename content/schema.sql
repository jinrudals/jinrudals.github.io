PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS study_posts (
  slug TEXT NOT NULL,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  summary TEXT NOT NULL,
  body TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (category, slug)
);

CREATE TABLE IF NOT EXISTS study_post_tags (
  category TEXT NOT NULL,
  post_slug TEXT NOT NULL,
  tag TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (category, post_slug, tag),
  FOREIGN KEY (category, post_slug) REFERENCES study_posts(category, slug) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS projects (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  period TEXT NOT NULL,
  role TEXT NOT NULL,
  summary TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS project_stack (
  project_slug TEXT NOT NULL,
  item TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (project_slug, item),
  FOREIGN KEY (project_slug) REFERENCES projects(slug) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS project_highlights (
  project_slug TEXT NOT NULL,
  item TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (project_slug, item),
  FOREIGN KEY (project_slug) REFERENCES projects(slug) ON DELETE CASCADE
);
