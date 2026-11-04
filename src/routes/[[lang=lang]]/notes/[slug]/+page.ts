import { error } from '@sveltejs/kit';
import { getEntry, slugEntries } from '$lib/content';

export const entries = () => slugEntries('notes');

export function load({ params }) {
  const entry = getEntry('notes', params.slug, params.lang === 'en' ? 'en' : 'ko');
  if (!entry) error(404, 'Not found');
  return entry;
}
