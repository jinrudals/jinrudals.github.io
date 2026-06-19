<script lang="ts">
  import { careerLinks, featuredProjects, recentStudyPosts } from '$lib/content.js';
</script>

<svelte:head>
  <title>jinrudals</title>
  <meta
    name="description"
    content="Personal site for jinrudals, built with SvelteKit and GitHub Pages."
  />
</svelte:head>

<main class="page">
  <section class="hero" aria-labelledby="site-title">
    <div class="hero-copy">
      <p class="eyebrow">jinrudals.github.io</p>
      <h1 id="site-title">개인 기록과 프로젝트를 정리하는 공간입니다.</h1>
      <p class="lede">
        소개, 공부 기록, 프로젝트, 커리어 문서를 차근차근 채워갈 예정입니다.
      </p>
      <div class="actions" aria-label="Primary links">
        <a class="primary" href="/projects">Projects</a>
        <a href="/study">Study</a>
        <a href="/career">Career</a>
      </div>
    </div>
    <div class="signal" aria-label="Site sections">
      <span>Study</span>
      <span>Projects</span>
      <span>Career</span>
      <strong>jinrudals</strong>
    </div>
  </section>

  <section class="section" aria-labelledby="featured-projects">
    <div class="section-heading">
      <p class="eyebrow">Featured</p>
      <h2 id="featured-projects">Projects</h2>
    </div>
    <div class="grid two">
      {#each featuredProjects as project}
        <article class="card">
          <p class="meta">{project.period} · {project.role}</p>
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
          <div class="pill-row">
            {#each project.stack as item}
              <span class="pill">{item}</span>
            {/each}
          </div>
          <a class="text-link" href={`/projects/${project.slug}`}>프로젝트 보기</a>
        </article>
      {:else}
        <p class="empty">아직 등록된 프로젝트가 없습니다.</p>
      {/each}
    </div>
  </section>

  <section class="section split" aria-labelledby="recent-study">
    <div>
      <p class="eyebrow">Recent</p>
      <h2 id="recent-study">Study Notes</h2>
      <p class="lede">최근에 정리한 공부 글입니다. 전체 목록은 블로그처럼 `/study`에서 볼 수 있습니다.</p>
    </div>
    <div class="list">
      {#each recentStudyPosts as post}
        <a class="list-item" href={`/study/${post.category}/${post.slug}`}>
          <span>{post.date} · {post.category}</span>
          <strong>{post.title}</strong>
          <p>{post.summary}</p>
        </a>
      {:else}
        <p class="empty">아직 등록된 공부 글이 없습니다.</p>
      {/each}
    </div>
  </section>

  <section class="section" aria-labelledby="career-title">
    <p class="eyebrow">Career</p>
    <h2 id="career-title">Resume, Cover Letter, Portfolio</h2>
    <div class="grid three">
      {#each careerLinks as item}
        <a class="card link-card" href={item.href}>
          <h3>{item.label}</h3>
          <p>{item.description}</p>
        </a>
      {/each}
    </div>
  </section>
</main>

<style>
  .hero {
    display: grid;
    align-items: center;
    gap: 36px;
    grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.65fr);
    min-height: calc(100vh - 180px);
  }

  .hero-copy {
    max-width: 820px;
  }

  h1 {
    margin: 0;
    color: var(--ink);
    font-size: clamp(3.2rem, 8vw, 6.8rem);
    line-height: 1;
    letter-spacing: 0;
  }

  h2 {
    margin: 0 0 24px;
    color: var(--ink);
    font-size: 2rem;
    letter-spacing: 0;
  }

  .section-heading {
    margin-bottom: 24px;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 32px;
  }

  .actions a {
    display: inline-flex;
    min-height: 44px;
    align-items: center;
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 0 18px;
    background: var(--surface);
    font-weight: 700;
    text-decoration: none;
  }

  .actions .primary {
    border-color: var(--accent-strong);
    background: var(--accent-strong);
    color: white;
  }

  .actions a:hover {
    border-color: var(--accent);
  }

  .signal {
    display: grid;
    min-height: 360px;
    align-content: end;
    gap: 12px;
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 24px;
    background:
      linear-gradient(135deg, rgb(66 107 95 / 0.16), transparent 45%),
      var(--surface);
  }

  .signal span,
  .signal strong {
    display: block;
    border-left: 4px solid var(--accent);
    padding-left: 14px;
  }

  .signal span {
    color: var(--muted);
    font-weight: 800;
  }

  .signal strong {
    color: var(--ink);
    font-size: 2.4rem;
  }

  .meta {
    margin-top: 0;
    color: var(--warm);
    font-size: 0.9rem;
    font-weight: 800;
  }

  .card .text-link {
    display: inline-flex;
    margin-top: 12px;
  }

  .split {
    display: grid;
    gap: 36px;
    grid-template-columns: minmax(260px, 0.75fr) minmax(0, 1.25fr);
  }

  .list {
    display: grid;
    gap: 12px;
  }

  .list-item {
    display: block;
    border-bottom: 1px solid var(--line);
    padding: 0 0 18px;
    text-decoration: none;
  }

  .list-item span {
    color: var(--warm);
    font-size: 0.86rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  .list-item strong {
    display: block;
    margin-top: 6px;
    color: var(--ink);
    font-size: 1.15rem;
  }

  .list-item p {
    margin: 8px 0 0;
    color: var(--muted);
    line-height: 1.6;
  }

  .link-card {
    color: inherit;
    text-decoration: none;
  }

  .empty {
    margin: 0;
    color: var(--muted);
    line-height: 1.7;
  }

  @media (max-width: 880px) {
    .hero,
    .split {
      grid-template-columns: 1fr;
    }

    .hero {
      min-height: auto;
    }
  }
</style>
