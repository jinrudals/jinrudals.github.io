<script>
  import { careerLinks } from '$lib/content.js';
</script>

<svelte:head>
  <title>Career | jinrudals</title>
  <meta name="description" content="Resume, cover letter, and portfolio hub." />
</svelte:head>

<main class="page">
  <section>
    <p class="eyebrow">Career</p>
    <h1>커리어 문서</h1>
    <p class="lede">이력서, 자기소개서, 제출용 포트폴리오를 분리해서 관리합니다.</p>
  </section>

  <section class="section">
    <div class="grid three">
      {#each careerLinks as item}
        <a class="card link-card" href={item.href}>
          <h2>{item.label}</h2>
          <p>{item.description}</p>
        </a>
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
    font-size: 1.35rem;
  }

  .link-card {
    color: inherit;
    text-decoration: none;
  }
</style>
