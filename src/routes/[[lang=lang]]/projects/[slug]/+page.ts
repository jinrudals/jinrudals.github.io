import { error } from '@sveltejs/kit';
import { getEntry, slugEntries } from '$lib/content';

export const entries = () => slugEntries('projects');

export function load({ params }) {
  const entry = getEntry('projects', params.slug, params.lang === 'en' ? 'en' : 'ko');
  if (!entry) error(404, 'Not found');
  return entry;
}
