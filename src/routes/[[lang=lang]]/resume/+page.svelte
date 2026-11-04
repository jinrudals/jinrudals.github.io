<script lang="ts">
  import { localePath, t, type Lang } from '$lib/i18n';
  let { data } = $props();
  const lang = $derived(data.lang as Lang);
  const [before, after] = $derived(t(lang, 'resume.body').split('{link}'));
</script>

<svelte:head><title>{t(lang, 'resume.title')} · jinrudals</title></svelte:head>
<h1>{t(lang, 'resume.title')}</h1>
<p class="muted">{before}<a href={localePath(lang, '/career')}>{t(lang, 'career.title')}</a>{after}</p>
