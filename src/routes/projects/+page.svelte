<script>
  import { projectItems } from '$lib/content.js';
</script>

<svelte:head>
  <title>Projects | jinrudals</title>
  <meta name="description" content="Project portfolio for jinrudals." />
</svelte:head>

<main class="page">
  <section>
    <p class="eyebrow">Projects</p>
    <h1>프로젝트</h1>
    <p class="lede">만든 것들을 문제, 역할, 기술, 결과 중심으로 정리합니다.</p>
  </section>

  <section class="section">
    <div class="grid two">
      {#each projectItems as project}
        <article class="card">
          <p class="meta">{project.period} · {project.role}</p>
          <h2>{project.title}</h2>
          <p>{project.summary}</p>
          <div class="pill-row">
            {#each project.stack as item}
              <span class="pill">{item}</span>
            {/each}
          </div>
          <a class="text-link" href={`/projects/${project.slug}`}>상세 보기</a>
        </article>
      {:else}
        <p class="empty">아직 등록된 프로젝트가 없습니다.</p>
      {/each}
    </div>
  </section>
</main>

<style>
  h1 {
    margin: 0;
    color: var(--ink);
    font-size: clamp(3rem, 8vw, 5.8rem);
    line-height: 1;
    letter-spacing: 0;
  }

  h2 {
    font-size: 1.5rem;
  }

  .meta {
    margin-top: 0;
    color: var(--warm);
    font-size: 0.88rem;
    font-weight: 800;
  }

  .text-link {
    display: inline-flex;
    margin-top: 16px;
  }

  .empty {
    color: var(--muted);
    line-height: 1.7;
  }
</style>
