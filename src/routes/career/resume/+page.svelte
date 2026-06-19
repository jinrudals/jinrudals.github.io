<svelte:head>
  <title>Resume | jinrudals</title>
  <meta name="description" content="Resume for jinrudals." />
</svelte:head>

<main class="page document">
  <a class="text-link" href="/career">← Career</a>
  <section>
    <p class="eyebrow">Resume</p>
    <h1>이력서</h1>
    <p class="lede">이력서 내용을 채워 넣을 공간입니다.</p>
  </section>

  <section class="section card">
    <h2>Core Stack</h2>
    <div class="pill-row">
      <span class="pill">준비 중</span>
    </div>
  </section>

  <section class="section card">
    <h2>Summary</h2>
    <p>아직 작성된 내용이 없습니다.</p>
  </section>
</main>

<style>
  .document {
    max-width: 900px;
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

  h2 {
    margin-top: 0;
  }
</style>
