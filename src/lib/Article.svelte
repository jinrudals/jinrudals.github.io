<script lang="ts">
  import type { Component } from 'svelte';
  import type { Entry } from '$lib/content';
  let { meta, component: Body }: { meta: Entry; component: Component } = $props();
</script>

<article class="prose">
  <a class="muted" href="/{meta.section}">← 목록</a>
  <h1>{meta.title}</h1>
  <time class="muted">{meta.date}</time>
  <Body />
</article>
