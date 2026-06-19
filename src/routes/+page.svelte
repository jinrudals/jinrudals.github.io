<script lang="ts">
  import {
    careerLinks,
    focusItems,
    landingProjectGroups,
    recentStudyPosts,
    studyCategories
  } from '$lib/content.js';
</script>

<svelte:head>
  <title>jinrudals | DevOps study hub</title>
  <meta
    name="description"
    content="Study hub for DevOps, automation, reliability, infrastructure, and related project notes."
  />
</svelte:head>

<main class="page">
  <section class="hero" aria-labelledby="site-title">
    <div class="hero-copy">
      <p class="eyebrow">DevOps-oriented study hub</p>
      <h1 id="site-title">Building toward DevOps through study and automation.</h1>
      <p class="lede">
        반도체 개발 환경에서 CI, 자동화, 검증 인프라를 다뤄왔고, 그 경험을 바탕으로
        DevOps/SRE 영역을 공부하고 기록합니다.
      </p>
      <div class="actions" aria-label="Primary links">
        <a class="primary" href="/study">Study</a>
        <a href="/projects">Projects</a>
        <a href="/career">Career</a>
      </div>
    </div>
    <div class="signal" aria-label="Current direction">
      <span>Reliability</span>
      <span>Automation</span>
      <span>Infrastructure</span>
      <strong>DevOps</strong>
    </div>
  </section>

  <section class="section" aria-labelledby="focus-title">
    <div class="section-heading">
      <p class="eyebrow">Current Focus</p>
      <h2 id="focus-title">공부하고 기록할 기술 축</h2>
    </div>
    <div class="grid three focus-grid">
      {#each focusItems as item}
        <article class="card compact-card">
          <h3>{item.label}</h3>
          <p>{item.description}</p>
        </article>
      {/each}
    </div>
  </section>

  <section class="section split" aria-labelledby="study-title">
    <div>
      <p class="eyebrow">Study Notes</p>
      <h2 id="study-title">학습 기록</h2>
      <p class="lede">
        DevOps, 인프라, 백엔드, AI 자동화로 이어지는 공부를 카테고리별로 쌓아갑니다.
      </p>
      <a class="text-link" href="/study">전체 Study 보기</a>
    </div>
    <div class="list">
      {#each recentStudyPosts as post}
        <a class="list-item" href={`/study/${post.category}/${post.slug}`}>
          <span>{post.date} · {post.category}</span>
          <strong>{post.title}</strong>
          <p>{post.summary}</p>
        </a>
      {:else}
        <div class="empty-panel">
          <strong>아직 등록된 공부 글이 없습니다.</strong>
          <p>먼저 채울 카테고리부터 정리해두었습니다.</p>
          <div class="pill-row">
            {#each studyCategories as category}
              <a class="pill-link" href={`/study/${category.id}`}>{category.label}</a>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </section>

  <section class="section" aria-labelledby="project-preview-title">
    <div class="section-heading">
      <p class="eyebrow">Projects</p>
      <h2 id="project-preview-title">경험과 실험의 기록</h2>
      <p class="lede">
        홈에서는 방향만 보여주고, 시스템별 상세 내용은 프로젝트 페이지에 따로 정리합니다.
      </p>
    </div>
    <div class="grid two">
      {#each landingProjectGroups as group}
        <a class="card link-card project-preview" href={group.href}>
          <h3>{group.label}</h3>
          <p>{group.description}</p>
          <div class="pill-row">
            {#each group.items as item}
              <span class="pill">{item}</span>
            {/each}
          </div>
        </a>
      {/each}
    </div>
  </section>

  <section class="section" aria-labelledby="career-title">
    <p class="eyebrow">Career</p>
    <h2 id="career-title">Career Documents</h2>
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
