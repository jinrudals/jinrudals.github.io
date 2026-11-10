import type { Lang } from './i18n';

interface Item<T> {
  slug: string;
  lang: Lang;
  value: T;
}

export function parseName(path: string): { slug: string; lang: Lang } {
  const base = path.split('/').pop()!.replace(/\.md$/, '');
  return base.endsWith('.en') ? { slug: base.slice(0, -3), lang: 'en' } : { slug: base, lang: 'ko' };
}

export function pick<T>(items: Item<T>[], slug: string, lang: Lang): { value: T; fellBack: boolean } | undefined {
  const exact = items.find((i) => i.slug === slug && i.lang === lang);
  if (exact) return { value: exact.value, fellBack: false };
  const ko = items.find((i) => i.slug === slug && i.lang === 'ko');
  return ko ? { value: ko.value, fellBack: true } : undefined;
}

export function listFor<T>(items: Item<T>[], lang: Lang): T[] {
  return items.filter((i) => i.lang === lang).map((i) => i.value);
}

export function langsOf<T>(items: Item<T>[], slug: string): Lang[] {
  return items.filter((i) => i.slug === slug).map((i) => i.lang);
}

export type Kind = 'work' | 'personal';

export function filterByKind<T extends { kind?: Kind }>(list: T[], kind: Kind | 'all'): T[] {
  return kind === 'all' ? list : list.filter((i) => i.kind === kind);
}

export interface SeriesFields {
  slug: string;
  series?: string;
  part?: string;
  order?: number;
}

// reading order inside a series: part order first, then `order`
export const SECTION_ORDER = ['concepts', 'practice', 'basics', 'core', 'pipeline', 'release', 'ops', 'case', 'appendix'];

const sectionRank = (s?: string) => {
  const i = SECTION_ORDER.indexOf(s ?? '');
  return i === -1 ? SECTION_ORDER.length : i;
};

export function seriesItems<T extends SeriesFields>(list: T[], series: string): T[] {
  return list
    .filter((e) => e.series === series)
    .sort((a, b) => sectionRank(a.part) - sectionRank(b.part) || (a.order ?? 0) - (b.order ?? 0));
}

export function seriesNav<T extends SeriesFields>(list: T[], series: string, slug: string) {
  const items = seriesItems(list, series);
  const i = items.findIndex((e) => e.slug === slug);
  if (i === -1) return undefined;
  return { items, index: i, total: items.length, prev: items[i - 1], next: items[i + 1] };
}

export function groupBySeries<T extends SeriesFields>(list: T[]) {
  const ids = [...new Set(list.flatMap((e) => (e.series ? [e.series] : [])))].sort();
  return {
    groups: ids.map((id) => ({ series: id, items: seriesItems(list, id) })),
    rest: list.filter((e) => !e.series)
  };
}
