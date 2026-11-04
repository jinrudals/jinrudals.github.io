import { error } from '@sveltejs/kit';
import { getEntry, listEntries } from '$lib/content';

export const entries = () => listEntries('notes').map(({ slug }) => ({ slug }));

export function load({ params }) {
  const entry = getEntry('notes', params.slug);
  if (!entry) error(404, 'Not found');
  return entry;
}
