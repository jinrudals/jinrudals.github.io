<script lang="ts">
  import type { Entry } from '$lib/content';
  let { entries, empty = '아직 글이 없음' }: { entries: Entry[]; empty?: string } = $props();
</script>

{#if entries.length === 0}
  <p class="muted">{empty}</p>
{:else}
  <ul class="entries">
    {#each entries as e (e.slug)}
      <li>
        <a href="/{e.section}/{e.slug}">
          <time>{e.date} · {e.readMinutes}분 읽기</time>
          <strong>{e.title}</strong>
          {#if e.summary}<span class="muted">{e.summary}</span>{/if}
          {#if e.tags?.length}<span class="tags">{#each e.tags as t}<span class="tag">#{t}</span>{/each}</span>{/if}
        </a>
      </li>
    {/each}
  </ul>
{/if}
