export const FEED_URL = 'https://jinrudals.github.io/dev-events-digest/feed.xml';

export type FeedItem = { title: string; link: string; date: string; html: string };

const ENTITIES: Record<string, string> = { '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&amp;': '&' };

const decode = (s: string) => s.replace(/&(?:lt|gt|quot|#39|amp);/g, (m) => ENTITIES[m]);

function field(block: string, tag: string): string | undefined {
  const m = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`));
  if (!m) return undefined;
  const cdata = m[1].match(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/);
  return cdata ? cdata[1] : decode(m[1]).trim();
}

export function parseFeed(xml: string): FeedItem[] {
  const items: FeedItem[] = [];
  for (const [, block] of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    const title = field(block, 'title');
    const link = field(block, 'link');
    const pubDate = field(block, 'pubDate');
    if (!title || !link || !pubDate) continue;
    const time = new Date(pubDate).getTime();
    if (Number.isNaN(time)) continue;
    items.push({ title, link, date: new Date(time).toISOString(), html: field(block, 'description') ?? '' });
  }
  return items.sort((a, b) => b.date.localeCompare(a.date));
}

export async function loadFeed(fetchFn: typeof fetch = fetch, url: string = FEED_URL): Promise<FeedItem[]> {
  try {
    const res = await fetchFn(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return parseFeed(await res.text());
  } catch (err) {
    console.warn('events feed unavailable:', err instanceof Error ? err.message : err);
    return [];
  }
}
