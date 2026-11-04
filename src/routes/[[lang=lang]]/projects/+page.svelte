<script lang="ts">
  import EntryList from '$lib/EntryList.svelte';
  import { listEntries } from '$lib/content';
  import { t, type Lang } from '$lib/i18n';
  let { data } = $props();
  const lang = $derived(data.lang as Lang);
  const entries = $derived(listEntries('projects', lang));
</script>

<svelte:head><title>{t(lang, 'projects.title')} · jinrudals</title></svelte:head>
<h1>{t(lang, 'projects.title')}</h1>
<p class="muted">{t(lang, 'projects.blurb')}</p>
<EntryList {entries} {lang} />
