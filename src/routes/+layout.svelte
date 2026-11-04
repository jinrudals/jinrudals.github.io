<script lang="ts">
  import '../app.css';
  import { page } from '$app/state';
  let { children } = $props();
  function toggleTheme() {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
  }
  const nav = [
    ['/writing', '글'],
    ['/study', '스터디'],
    ['/projects', '프로젝트'],
    ['/career', '경력'],
    ['/resume', '이력서'],
    ['/notes', '노트'],
    ['/about', '소개']
  ];
</script>

<header class="site-header"><div class="site-header-inner">
  <a class="brand" href="/">진경민</a>
  <nav>
    {#each nav as [href, label]}
      <a {href} aria-current={page.url.pathname.startsWith(href) ? 'page' : undefined}>{label}</a>
    {/each}
  </nav>
  <button class="theme" onclick={toggleTheme} aria-label="테마 전환">◐</button>
</div></header>
<main class="page">{@render children()}</main>
<footer class="site-footer">© 진경민 (Gyeongmin Jin)</footer>
