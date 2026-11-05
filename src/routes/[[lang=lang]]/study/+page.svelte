<script lang="ts">
  import EntryList from '$lib/EntryList.svelte';
  import SeriesList from '$lib/SeriesList.svelte';
  import { listGrouped } from '$lib/content';
  import { t, type Lang } from '$lib/i18n';
  let { data } = $props();
  const lang = $derived(data.lang as Lang);
  const grouped = $derived(listGrouped('study', lang));
</script>

<svelte:head><title>{t(lang, 'study.title')} · jinrudals</title></svelte:head>
<h1>{t(lang, 'study.title')}</h1>
<p class="muted">{t(lang, 'study.blurb')}</p>
<SeriesList groups={grouped.groups} {lang} />
{#if grouped.rest.length || !grouped.groups.length}<EntryList entries={grouped.rest} {lang} />{/if}
