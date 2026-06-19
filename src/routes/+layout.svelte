<script>
  import { navItems } from '$lib/content.js';
</script>

<div class="shell">
  <header class="site-header">
    <a class="brand" href="/">jinrudals</a>
    <nav aria-label="Primary navigation">
      {#each navItems as item}
        <a href={item.href}>{item.label}</a>
      {/each}
    </nav>
  </header>

  <slot />

  <footer class="site-footer">
    <span>jinrudals.github.io</span>
    <a href="https://github.com/jinrudals" target="_blank" rel="noreferrer">GitHub</a>
  </footer>
</div>

<style>
  .shell {
    min-height: 100vh;
  }

  .site-header {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    border-bottom: 1px solid var(--line);
    padding: 18px clamp(20px, 5vw, 64px);
    background: color-mix(in srgb, var(--bg) 88%, white);
    backdrop-filter: blur(14px);
  }

  .brand {
    color: var(--ink);
    font-weight: 800;
    text-decoration: none;
  }

  nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 8px 18px;
  }

  nav a,
  .site-footer a {
    color: var(--muted);
    font-size: 0.95rem;
    font-weight: 700;
    text-decoration: none;
  }

  nav a:hover,
  .site-footer a:hover {
    color: var(--ink);
  }

  .site-footer {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    border-top: 1px solid var(--line);
    padding: 28px clamp(20px, 5vw, 64px);
    color: var(--muted);
  }

  @media (max-width: 620px) {
    .site-header,
    .site-footer {
      align-items: flex-start;
      flex-direction: column;
    }

    nav {
      justify-content: flex-start;
    }
  }
</style>
