import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { createMermaidRenderer } from 'mermaid-isomorphic';

const renderMermaid = createMermaidRenderer();
const escape = (s) => s.replace(/[&<>{}`\\]/g, (c) => `&#${c.charCodeAt(0)};`);

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
  extensions: ['.md'],
  highlight: {
    async highlighter(code, lang) {
      if (lang === 'mermaid') {
        const [result] = await renderMermaid([code], { prefix: 'mmd' + Math.random().toString(36).slice(2, 8) });
        if (result.status === 'rejected') throw result.reason;
        return `<div class="mermaid">{@html ${JSON.stringify(result.value.svg)}}</div>`;
      }
      return `<pre><code class="language-${lang ?? ''}">${escape(code)}</code></pre>`;
    }
  }
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [mdsvex(mdsvexOptions), vitePreprocess()],
  kit: {
    prerender: { handleUnseenRoutes: 'ignore' },
    adapter: adapter({ pages: 'build', assets: 'build', strict: true })
  }
};

export default config;
