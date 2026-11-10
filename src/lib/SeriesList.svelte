<script lang="ts">
  import EntryList from '$lib/EntryList.svelte';
  import type { Entry } from '$lib/content';
  import { t, type Lang } from '$lib/i18n';
  let { groups, lang }: { groups: { series: string; items: Entry[] }[]; lang: Lang } = $props();

  // consecutive entries sharing a part render under one sub-heading

  const bySection = (items: Entry[]) =>
    items.reduce<{ part?: string; items: Entry[] }[]>((acc, e) => {
      const last = acc.at(-1);
      if (last && last.part === e.part) last.items.push(e);
      else acc.push({ part: e.part, items: [e] });
      return acc;
    }, []);
</script>

{#each groups as g (g.series)}
  <section class="series-group">
    <h2>{t(lang, `series.${g.series}`)}</h2>
    {#each bySection(g.items) as s (s.part)}
      {#if s.part}<h3>{t(lang, `section.${s.part}`)}</h3>{/if}
      <EntryList entries={s.items} {lang} row />
    {/each}
  </section>
{/each}
