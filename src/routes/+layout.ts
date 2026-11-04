import type { Lang } from '$lib/i18n';

export const prerender = true;

export const load = ({ params }: { params: { lang?: string } }) => ({
  lang: (params.lang === 'en' ? 'en' : 'ko') as Lang
});
