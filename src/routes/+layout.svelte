<script lang="ts">
  import '../app.css';
  import { page } from '$app/state';
  let { children } = $props();
  const nav = [
    ['/writing', '글'],
    ['/study', '스터디'],
    ['/projects', '프로젝트'],
    ['/career', '경력'],
    ['/resume', '이력서'],
    ['/notes', '노트']
  ];
</script>

<header class="site-header"><div class="site-header-inner">
  <a class="brand" href="/">진경민</a>
  <nav>
    {#each nav as [href, label]}
      <a {href} aria-current={page.url.pathname.startsWith(href) ? 'page' : undefined}>{label}</a>
    {/each}
  </nav>
</div></header>
<main class="page">{@render children()}</main>
<footer class="site-footer">© 진경민 (Gyeongmin Jin)</footer>
