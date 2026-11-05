import { error } from '@sveltejs/kit';
import { getEntry, seriesNavFor, slugEntries } from '$lib/content';

export const entries = () => slugEntries('study');

export function load({ params }) {
  const entry = getEntry('study', params.slug, params.lang === 'en' ? 'en' : 'ko');
  if (!entry) error(404, 'Not found');
  const lang = params.lang === 'en' ? 'en' : 'ko';
  return { ...entry, nav: seriesNavFor('study', entry.meta, lang) };
}
