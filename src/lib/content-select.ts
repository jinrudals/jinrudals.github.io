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
