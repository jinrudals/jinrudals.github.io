import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { createMermaidRenderer } from 'mermaid-isomorphic';
import { createHighlighter, bundledLanguages } from 'shiki';

const renderMermaid = createMermaidRenderer();
const shiki = await createHighlighter({ themes: ['github-light', 'github-dark'], langs: [] });
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
      const known = lang && lang in bundledLanguages;
      if (known) await shiki.loadLanguage(lang);
      const html = shiki.codeToHtml(code, {
        lang: known ? lang : 'text',
        themes: { light: 'github-light', dark: 'github-dark' },
        defaultColor: false
      });
      const label = lang ? `<span class="code-lang">${escape(lang)}</span>` : '';
      // braces must be escaped so Svelte does not parse them as expressions
      return `<div class="codeblock">${label}<button type="button" class="code-copy">Copy</button>${html.replace(/[{}]/g, (c) => `&#${c.charCodeAt(0)};`)}</div>`;
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
