import test from 'node:test';
import assert from 'node:assert/strict';

import { markdownToHtml } from '../src/lib/markdown.js';

test('markdownToHtml renders headings, paragraphs, code blocks, lists, and tables', () => {
  const html = markdownToHtml(`# Title

Intro paragraph with \`inline code\`.

## Section

- first
- second

| Name | Meaning |
| --- | --- |
| Lean | Flow |

\`\`\`text
small batch
fast feedback
\`\`\`
`);

  assert.match(html, /<h1>Title<\/h1>/);
  assert.match(html, /<h2>Section<\/h2>/);
  assert.match(html, /<p>Intro paragraph with <code>inline code<\/code>\.<\/p>/);
  assert.match(html, /<ul><li>first<\/li><li>second<\/li><\/ul>/);
  assert.match(html, /<table><thead><tr><th>Name<\/th><th>Meaning<\/th><\/tr><\/thead><tbody><tr><td>Lean<\/td><td>Flow<\/td><\/tr><\/tbody><\/table>/);
  assert.match(html, /<pre><code>small batch\nfast feedback<\/code><\/pre>/);
});

test('markdownToHtml escapes raw HTML from trusted markdown text', () => {
  const html = markdownToHtml('Use <script>alert("x")</script> safely.');

  assert.equal(html, '<p>Use &lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; safely.</p>');
});
