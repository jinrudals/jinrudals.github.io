import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadFeed, parseFeed } from './events-feed.ts';

const item = (title: string, link: string, pubDate: string, desc = 'body') =>
  `<item><title>${title}</title><link>${link}</link><guid>${link}</guid><pubDate>${pubDate}</pubDate><description>${desc}</description></item>`;
const rss = (...items: string[]) => `<?xml version="1.0"?><rss version="2.0"><channel><title>t</title>${items.join('')}</channel></rss>`;

const older = item('Older', 'https://x/archive/2026-11-02.html', 'Mon, 02 Nov 2026 10:00:00 +0900');
const newer = item('Newer', 'https://x/archive/2026-11-09.html', 'Mon, 09 Nov 2026 10:00:00 +0900');

test('parseFeed parses items newest first', () => {
  const items = parseFeed(rss(older, newer));
  assert.equal(items.length, 2);
  assert.equal(items[0].title, 'Newer');
  assert.equal(items[0].link, 'https://x/archive/2026-11-09.html');
  assert.equal(items[0].date, '2026-11-09T01:00:00.000Z');
  assert.equal(items[1].title, 'Older');
});

test('parseFeed decodes entities and keeps CDATA html', () => {
  const [a] = parseFeed(rss(item('A &amp; B', 'https://x/1', 'Mon, 09 Nov 2026 10:00:00 +0900', '<![CDATA[<h2>x &amp; y</h2>]]>')));
  assert.equal(a.title, 'A & B');
  assert.equal(a.html, '<h2>x &amp; y</h2>');
  const [b] = parseFeed(rss(item('t', 'https://x/2', 'Mon, 09 Nov 2026 10:00:00 +0900', '&lt;h2&gt;&quot;q&quot; &#39;s&#39; &amp;&lt;/h2&gt;')));
  assert.equal(b.html, '<h2>"q" \'s\' &</h2>');
});

test('parseFeed skips items missing required fields or with a bad date', () => {
  const noLink = '<item><title>x</title><pubDate>Mon, 09 Nov 2026 10:00:00 +0900</pubDate></item>';
  const badDate = item('bad', 'https://x/3', 'not a date');
  const items = parseFeed(rss(noLink, badDate, newer));
  assert.deepEqual(items.map((i) => i.title), ['Newer']);
});

test('parseFeed returns [] for empty or non-xml input', () => {
  assert.deepEqual(parseFeed(''), []);
  assert.deepEqual(parseFeed('<html>Site not found</html>'), []);
});

test('loadFeed returns [] on non-2xx', async () => {
  const f = (async () => ({ ok: false, status: 404 })) as unknown as typeof fetch;
  assert.deepEqual(await loadFeed(f), []);
});

test('loadFeed returns [] when fetch throws', async () => {
  const f = (async () => {
    throw new Error('network');
  }) as unknown as typeof fetch;
  assert.deepEqual(await loadFeed(f), []);
});

test('loadFeed parses a successful response', async () => {
  const f = (async () => ({ ok: true, status: 200, text: async () => rss(newer) })) as unknown as typeof fetch;
  const items = await loadFeed(f);
  assert.equal(items.length, 1);
  assert.equal(items[0].title, 'Newer');
});
