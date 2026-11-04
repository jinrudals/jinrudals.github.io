import type { Component } from 'svelte';
import { langsOf, listFor, parseName, pick, type Kind } from './content-select';
import type { Lang } from './i18n';

export type Section = 'writing' | 'study' | 'notes' | 'projects';

export interface Meta {
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
  draft?: boolean;
  kind?: Kind;
  role?: string;
  links?: { label: string; url: string }[];
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

function published(section: Section) {
  return Object.entries(modules[section])
    .filter(([, m]) => !m.metadata.draft)
    .map(([path, m]) => ({ ...parseName(path), value: { path, mod: m } }));
}

function toEntry(section: Section, slug: string, path: string, m: Mod): Entry {
  return { ...m.metadata, date: toDate(m.metadata.date), readMinutes: readMinutes(path), slug, section };
}

export function listEntries(section: Section, lang: Lang = 'ko'): Entry[] {
  return published(section)
    .filter((i) => i.lang === lang)
    .map((i) => toEntry(section, i.slug, i.value.path, i.value.mod))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getEntry(section: Section, slug: string, lang: Lang = 'ko') {
  const items = published(section);
  const hit = pick(items, slug, lang);
  if (!hit) return undefined;
  const { path, mod } = hit.value;
  return { component: mod.default, meta: toEntry(section, slug, path, mod), fellBack: hit.fellBack, langs: langsOf(items, slug) };
}

// route params for prerendering `[[lang=lang]]/<section>/[slug]`
export function slugEntries(section: Section) {
  const ko = listFor(published(section), 'ko').map((v) => parseName(v.path).slug);
  const en = listFor(published(section), 'en').map((v) => parseName(v.path).slug);
  return [
    ...ko.map((slug) => ({ lang: '', slug })),
    ...[...new Set([...ko, ...en])].map((slug) => ({ lang: 'en', slug }))
  ];
}
