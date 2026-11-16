<script lang="ts">
  import { FEED_URL } from '$lib/events-feed';
  import { t, type Lang } from '$lib/i18n';
  let { data } = $props();
  const lang = $derived(data.lang as Lang);
  const latest = $derived(data.items[0]);
  const past = $derived(data.items.slice(1));
  const day = (iso: string) => iso.slice(0, 10);
</script>

<svelte:head><title>{t(lang, 'events.title')} · jinrudals</title></svelte:head>
<h1>{t(lang, 'events.title')}</h1>
<p class="muted">{t(lang, 'events.blurb')}</p>
{#if lang === 'en'}<p class="muted">{t(lang, 'events.koOnly')}</p>{/if}
<p><a href={FEED_URL}>{t(lang, 'events.subscribe')}</a></p>

{#if !latest}
  <p>{t(lang, 'events.empty')}</p>
{:else}
  <h2>{latest.title}</h2>
  <p class="muted">{day(latest.date)} · <a href={latest.link}>{t(lang, 'events.source')}</a></p>
  <div class="digest-body">{@html latest.html}</div>
  {#if past.length}
    <h2>{t(lang, 'events.past')}</h2>
    <ul>
      {#each past as item (item.link)}
        <li><span class="muted">{day(item.date)}</span> · <a href={item.link}>{item.title}</a></li>
      {/each}
    </ul>
  {/if}
{/if}

<style>
  .digest-body :global(img) { max-width: 100%; height: auto; }
  .digest-body :global(ul) { padding-left: 1.25rem; }
</style>
