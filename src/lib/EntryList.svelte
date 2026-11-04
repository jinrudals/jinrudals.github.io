<script lang="ts">
  import type { Entry } from '$lib/content';
  import { localePath, t, type Lang } from '$lib/i18n';
  let { entries, lang, empty }: { entries: Entry[]; lang: Lang; empty?: string } = $props();
</script>

{#if entries.length === 0}
  <p class="muted">{empty ?? t(lang, 'entry.empty')}</p>
{:else}
  <ul class="entries">
    {#each entries as e (e.slug)}
      <li>
        <a href={localePath(lang, `/${e.section}/${e.slug}`)}>
          <time>{e.date} · {t(lang, 'entry.read').replace('{n}', String(e.readMinutes))}</time>
          <strong>{e.title}{#if e.kind}<span class="kind kind-{e.kind}">{t(lang, `kind.${e.kind}`)}</span>{/if}</strong>
          {#if e.summary}<span class="muted">{e.summary}</span>{/if}
          {#if e.tags?.length}<span class="tags">{#each e.tags as t}<span class="tag">#{t}</span>{/each}</span>{/if}
        </a>
      </li>
    {/each}
  </ul>
{/if}
