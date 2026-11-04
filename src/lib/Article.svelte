<script lang="ts">
  import type { Component } from 'svelte';
  import type { Entry } from '$lib/content';
  import { localePath, t, type Lang } from '$lib/i18n';
  let { meta, component: Body, lang }: { meta: Entry; component: Component; lang: Lang } = $props();
</script>

<article class="prose">
  <a class="muted" href={localePath(lang, `/${meta.section}`)}>{t(lang, 'article.back')}</a>
  <time class="muted">{meta.date} · {t(lang, 'entry.read').replace('{n}', String(meta.readMinutes))}</time>
  <h1>{meta.title}</h1>
  <Body />
</article>
