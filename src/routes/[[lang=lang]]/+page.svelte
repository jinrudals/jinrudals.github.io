<script lang="ts">
  import EntryList from '$lib/EntryList.svelte';
  import { listEntries } from '$lib/content';
  import { localePath, t, type Lang } from '$lib/i18n';
  let { data } = $props();
  const lang = $derived(data.lang as Lang);
  const recent = $derived(listEntries('writing', lang).slice(0, 5));
  const focus = [1, 2, 3];
</script>

<svelte:head><title>{t(lang, 'site.title')}</title></svelte:head>

<section class="hero">
  <p class="eyebrow">{t(lang, 'home.eyebrow')}</p>
  <h1>{t(lang, 'home.h1a')}<br />{t(lang, 'home.h1b')}</h1>
  <p class="lead">{t(lang, 'home.lead')}</p>
  <div class="cta">
    <a class="btn primary" href={localePath(lang, '/writing')}>{t(lang, 'home.cta.writing')}</a>
    <a class="btn" href={localePath(lang, '/career')}>{t(lang, 'home.cta.career')}</a>
    <a class="btn" href={localePath(lang, '/about')}>{t(lang, 'home.cta.about')}</a>
  </div>
</section>

<div class="section-head"><h2>{t(lang, 'home.work')}</h2></div>
<section class="cards">
  {#each focus as n}
    <div class="card"><strong>{t(lang, `home.focus${n}.title`)}</strong><span>{t(lang, `home.focus${n}.desc`)}</span></div>
  {/each}
</section>

<div class="section-head">
  <h2>{t(lang, 'home.recent')}</h2>
  <a href={localePath(lang, '/writing')}>{t(lang, 'home.all')}</a>
</div>
<EntryList entries={recent} {lang} />
