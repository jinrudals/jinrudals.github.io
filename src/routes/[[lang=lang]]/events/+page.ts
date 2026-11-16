import { loadFeed } from '$lib/events-feed';

export const prerender = true;

export async function load() {
  return { items: await loadFeed() };
}
