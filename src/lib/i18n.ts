export type Lang = 'ko' | 'en';

export const dict: Record<Lang, Record<string, string>> = {
  ko: {
    'nav.writing': '글',
    'nav.study': '스터디',
    'nav.projects': '프로젝트',
    'nav.career': '경력',
    'nav.resume': '이력서',
    'nav.notes': '노트',
    'nav.about': '소개',
    footer: '© jinrudals',
    theme: '테마 전환'
  },
  en: {
    'nav.writing': 'Writing',
    'nav.study': 'Study',
    'nav.projects': 'Projects',
    'nav.career': 'Career',
    'nav.resume': 'Résumé',
    'nav.notes': 'Notes',
    'nav.about': 'About',
    footer: '© jinrudals',
    theme: 'Toggle theme'
  }
};

export function t(lang: Lang, key: string): string {
  return dict[lang][key] ?? dict.ko[key] ?? key;
}

export function localePath(lang: Lang, path: string): string {
  if (lang === 'ko') return path;
  return path === '/' ? '/en' : `/en${path}`;
}

export function switchPath(pathname: string, to: Lang): string {
  const bare = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  return localePath(to, bare);
}

export function detectRedirect(args: { pathname: string; stored: string | null; browser: string }): string | null {
  const { pathname, stored, browser } = args;
  const wanted: Lang =
    stored === 'ko' || stored === 'en' ? stored : browser.toLowerCase().startsWith('en') ? 'en' : 'ko';
  const target = switchPath(pathname, wanted);
  return target === pathname ? null : target;
}
