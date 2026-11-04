import { error } from '@sveltejs/kit';
import { getEntry, listEntries } from '$lib/content';

export const entries = () => listEntries('projects').map(({ slug }) => ({ slug }));

export function load({ params }) {
  const entry = getEntry('projects', params.slug);
  if (!entry) error(404, 'Not found');
  return entry;
}
