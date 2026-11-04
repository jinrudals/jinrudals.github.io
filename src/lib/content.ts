import type { Component } from 'svelte';

export type Section = 'writing' | 'study' | 'notes' | 'projects';

export interface Meta {
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
  draft?: boolean;
}

export interface Entry extends Meta {
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

const slugOf = (path: string) => path.split('/').pop()!.replace(/\.md$/, '');

export function listEntries(section: Section): Entry[] {
  return Object.entries(modules[section])
    .map(([path, m]) => ({ ...m.metadata, slug: slugOf(path), section }))
    .filter((e) => !e.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getEntry(section: Section, slug: string) {
  const hit = Object.entries(modules[section]).find(([p]) => slugOf(p) === slug);
  if (!hit) return undefined;
  return { component: hit[1].default, meta: { ...hit[1].metadata, slug, section } as Entry };
}
