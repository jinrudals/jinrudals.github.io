<script>
  export let data;
</script>

<svelte:head>
  <title>{data.project.title} | jinrudals</title>
  <meta name="description" content={data.project.summary} />
</svelte:head>

<main class="page project-page">
  <a class="text-link" href="/projects">← Projects</a>
  <article>
    <p class="eyebrow">{data.project.period} · {data.project.role}</p>
    <h1>{data.project.title}</h1>
    <p class="lede">{data.project.summary}</p>

    <section class="section" aria-labelledby="stack">
      <h2 id="stack">Stack</h2>
      <div class="pill-row">
        {#each data.project.stack as item}
          <span class="pill">{item}</span>
        {/each}
      </div>
    </section>

    <section class="section" aria-labelledby="highlights">
      <h2 id="highlights">Highlights</h2>
      <ul>
        {#each data.project.highlights as highlight}
          <li>{highlight}</li>
        {/each}
      </ul>
    </section>
  </article>
</main>

<style>
  .project-page {
    max-width: 920px;
  }

  article {
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
    margin: 0 0 16px;
  }

  ul {
    display: grid;
    gap: 14px;
    margin: 0;
    padding-left: 22px;
    color: #343941;
    line-height: 1.8;
  }
</style>
