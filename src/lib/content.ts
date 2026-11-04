import type { Component } from 'svelte';

export type Section = 'writing' | 'study' | 'notes' | 'projects';

export interface Meta {
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
  draft?: boolean;
}

export interface Timed { readMinutes: number }

export interface Entry extends Meta, Timed {
  slug: string;
  section: Section;
}

type Mod = { default: Component; metadata: Meta };

const modules = {
  writing: import.meta.glob<Mod>('/src/content/writing/*.md', { eager: true }),
  study: import.meta.glob<Mod>('/src/content/study/*.md', { eager: true }),
  notes: import.meta.glob<Mod>('/src/content/notes/*.md', { eager: true }),
  projects: import.meta.glob<Mod>('/src/content/projects/*.md', { eager: true })
};

// frontmatter dates may be parsed into Date objects
const toDate = (d: unknown) => (d instanceof Date ? d.toISOString() : String(d)).slice(0, 10);

const raws = import.meta.glob<string>('/src/content/*/*.md', { eager: true, query: '?raw', import: 'default' });
const readMinutes = (path: string) => {
  const text = (raws[path] ?? '').replace(/^---[\s\S]*?---/, '').replace(/```[\s\S]*?```/g, '');
  return Math.max(1, Math.round(text.replace(/\s+/g, '').length / 500));
};

const slugOf = (path: string) => path.split('/').pop()!.replace(/\.md$/, '');

export function listEntries(section: Section): Entry[] {
  return Object.entries(modules[section])
    .map(([path, m]) => ({ ...m.metadata, date: toDate(m.metadata.date), readMinutes: readMinutes(path), slug: slugOf(path), section }))
    .filter((e) => !e.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getEntry(section: Section, slug: string) {
  const hit = Object.entries(modules[section]).find(([p]) => slugOf(p) === slug);
  if (!hit) return undefined;
  return { component: hit[1].default, meta: { ...hit[1].metadata, date: toDate(hit[1].metadata.date), readMinutes: readMinutes(hit[0]), slug, section } as Entry };
}
