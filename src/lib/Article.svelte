<script lang="ts">
  import type { Component } from 'svelte';
  import type { Entry } from '$lib/content';
  let { meta, component: Body }: { meta: Entry; component: Component } = $props();
</script>

<article class="prose">
  <a class="muted" href="/{meta.section}">← 목록</a>
  <time class="muted">{meta.date} · {meta.readMinutes}분 읽기</time>
  <h1>{meta.title}</h1>
  <Body />
</article>
