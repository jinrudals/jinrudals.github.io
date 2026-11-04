<script lang="ts">
  import type { Entry } from '$lib/content';
  let { entries, empty = '아직 글이 없습니다.' }: { entries: Entry[]; empty?: string } = $props();
</script>

{#if entries.length === 0}
  <p class="muted">{empty}</p>
{:else}
  <ul class="entries">
    {#each entries as e (e.slug)}
      <li>
        <a href="/{e.section}/{e.slug}">
          <strong>{e.title}</strong>
          <time>{e.date}</time>
          {#if e.summary}<span class="muted">{e.summary}</span>{/if}
        </a>
      </li>
    {/each}
  </ul>
{/if}
