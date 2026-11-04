<script lang="ts">
  import EntryList from '$lib/EntryList.svelte';
  import { listEntries } from '$lib/content';
  import { filterByKind, type Kind } from '$lib/content-select';
  import { t, type Lang } from '$lib/i18n';
  let { data } = $props();
  const lang = $derived(data.lang as Lang);
  let filter = $state<Kind | 'all'>('all');
  const all = $derived(listEntries('projects', lang));
  const entries = $derived(filterByKind(all, filter));
</script>

<svelte:head><title>{t(lang, 'projects.title')} · jinrudals</title></svelte:head>
<h1>{t(lang, 'projects.title')}</h1>
<p class="muted">{t(lang, 'projects.blurb')}</p>
<div class="chips" role="group">
  {#each ['all', 'work', 'personal'] as k}
    <button type="button" class:active={filter === k} aria-pressed={filter === k} onclick={() => (filter = k as Kind | 'all')}>
      {t(lang, k === 'all' ? 'projects.filter.all' : `kind.${k}`)}
    </button>
  {/each}
</div>
<EntryList {entries} {lang} />
