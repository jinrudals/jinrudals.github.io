<script lang="ts">
  import { localePath, t, type Lang } from '$lib/i18n';
  let { data } = $props();
  const lang = $derived(data.lang as Lang);
</script>

<svelte:head><title>{t(lang, 'about.title')} · jinrudals</title></svelte:head>
<div class="prose">
  <h1>{t(lang, 'about.name')}</h1>
  <p class="lead">{t(lang, 'about.lead')}</p>
  <p>{t(lang, 'about.p1')}</p>
  <p>{t(lang, 'about.p2')}</p>
  <p>{t(lang, 'about.p3')}</p>
  <p class="muted"><a href={localePath(lang, '/career')}>{t(lang, 'about.more')}</a></p>
</div>
