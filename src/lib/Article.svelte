<script lang="ts">
  import type { Component } from 'svelte';
  import type { Entry } from '$lib/content';
  import { localePath, t, type Lang } from '$lib/i18n';
  let { meta, component: Body, lang, fellBack = false, nav }: { meta: Entry; component: Component; lang: Lang; fellBack?: boolean; nav?: { items: Entry[]; index: number; total: number; prev?: Entry; next?: Entry } } = $props();
</script>

<article class="prose">
  {#if fellBack}<p class="muted notice">{t(lang, 'article.koOriginal')}</p>{/if}
  <a class="muted" href={localePath(lang, `/${meta.section}`)}>{t(lang, 'article.back')}</a>
  {#if nav && meta.series}
    <p class="series-badge">{t(lang, `series.${meta.series}`)}{#if meta.part} · {t(lang, `section.${meta.part}`)}{/if} · {nav.index + 1}/{nav.total}</p>
  {/if}
  <h1>{meta.title}</h1>
  <time class="muted">{meta.date} · {t(lang, 'entry.read').replace('{n}', String(meta.readMinutes))}</time>
  <Body />
  {#if nav && meta.series}
    <nav class="series-nav">
      {#if nav.prev}<a href={localePath(lang, `/${nav.prev.section}/${nav.prev.slug}`)}>{t(lang, 'series.prev')}<br /><small>{nav.prev.title}</small></a>{:else}<span></span>{/if}
      {#if nav.next}<a href={localePath(lang, `/${nav.next.section}/${nav.next.slug}`)}>{t(lang, 'series.next')}<br /><small>{nav.next.title}</small></a>{/if}
    </nav>
    <details class="series-toc">
      <summary>{t(lang, 'series.toc')}</summary>
      <ol>
        {#each nav.items as e, i (e.slug)}
          <li class:current={i === nav.index}><a href={localePath(lang, `/${e.section}/${e.slug}`)}>{e.title}</a></li>
        {/each}
      </ol>
    </details>
  {/if}
</article>
