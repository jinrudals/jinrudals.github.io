<script>
  import { projectItems } from '$lib/content.js';
</script>

<svelte:head>
  <title>Portfolio | jinrudals</title>
  <meta name="description" content="Portfolio summary for jinrudals." />
</svelte:head>

<main class="page document">
  <a class="text-link" href="/career">← Career</a>
  <section>
    <p class="eyebrow">Portfolio</p>
    <h1>포트폴리오</h1>
    <p class="lede">제출용 포트폴리오 목차입니다. 상세 내용은 프로젝트별 페이지로 연결합니다.</p>
  </section>

  <section class="section">
    <div class="grid two">
      {#each projectItems as project}
        <a class="card project" href={`/projects/${project.slug}`}>
          <p>{project.period} · {project.role}</p>
          <h2>{project.title}</h2>
          <span>{project.summary}</span>
        </a>
      {:else}
        <p class="empty">아직 포트폴리오에 연결할 프로젝트가 없습니다.</p>
      {/each}
    </div>
  </section>
</main>

<style>
  .document {
    max-width: 1040px;
  }

  section:first-of-type {
    margin-top: 36px;
  }

  h1 {
    margin: 0;
    color: var(--ink);
    font-size: clamp(3rem, 8vw, 5.8rem);
    line-height: 1;
    letter-spacing: 0;
  }

  .project {
    color: inherit;
    text-decoration: none;
  }

  .project p {
    margin-top: 0;
    color: var(--warm);
    font-size: 0.88rem;
    font-weight: 800;
  }

  .project span {
    display: block;
    color: var(--muted);
    line-height: 1.7;
  }

  .empty {
    color: var(--muted);
    line-height: 1.7;
  }
</style>
