<script lang="ts">
  import '../app.css';
  import { page } from '$app/state';
  import { localePath, switchPath, t, type Lang } from '$lib/i18n';
  let { children, data } = $props();
  const lang = $derived(data.lang as Lang);
  const origin = 'https://jinrudals.github.io';
  const keys = ['writing', 'study', 'projects', 'career', 'resume', 'notes', 'about'];
  const barePath = $derived(switchPath(page.url.pathname, 'ko'));
  // an English-only post has no Korean page to switch to
  const koMissing = $derived(Array.isArray(page.data.langs) && !page.data.langs.includes('ko'));
  function toggleTheme() {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
  }
  $effect(() => {
    document.documentElement.lang = lang;
  });
  async function copyCode(e: MouseEvent) {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.code-copy');
    if (!btn) return;
    await navigator.clipboard.writeText(btn.parentElement?.querySelector('pre')?.textContent ?? '');
    btn.textContent = 'Copied';
    setTimeout(() => (btn.textContent = 'Copy'), 1500);
  }
</script>

<svelte:document onclick={copyCode} />

<svelte:head>
  {#if !koMissing}
    <link rel="alternate" hreflang="ko" href={origin + switchPath(page.url.pathname, 'ko')} />
    <link rel="alternate" hreflang="x-default" href={origin + switchPath(page.url.pathname, 'ko')} />
  {/if}
  <link rel="alternate" hreflang="en" href={origin + switchPath(page.url.pathname, 'en')} />
</svelte:head>

<header class="site-header"><div class="site-header-inner">
  <a class="brand" href={localePath(lang, '/')}>jinrudals</a>
  <nav>
    {#each keys as k}
      {@const href = `/${k}`}
      <a href={localePath(lang, href)} aria-current={barePath.startsWith(href) ? 'page' : undefined}>{t(lang, `nav.${k}`)}</a>
    {/each}
  </nav>
  <span class="lang-switch">
    {#each ['ko', 'en'] as const as l}
      {#if l === 'ko' && koMissing}
        <span aria-disabled="true">KO</span>
      {:else}
        <a
          href={switchPath(page.url.pathname, l)}
          aria-current={lang === l ? 'true' : undefined}
          data-sveltekit-reload
          onclick={() => localStorage.setItem('lang', l)}>{l.toUpperCase()}</a>
      {/if}
    {/each}
  </span>
  <button class="theme" onclick={toggleTheme} aria-label={t(lang, 'theme')}>◐</button>
</div></header>
<main class="page">{@render children()}</main>
<footer class="site-footer">{t(lang, 'footer')}</footer>
