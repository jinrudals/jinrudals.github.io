<script>
  export let data;
</script>

<svelte:head>
  <title>{data.post.title} | jinrudals</title>
  <meta name="description" content={data.post.summary} />
</svelte:head>

<main class="page article-page">
  <a class="text-link" href={`/study/${data.category.id}`}>← {data.category.label}</a>
  <article>
    <header>
      <p class="eyebrow">{data.category.label} · {data.post.date}</p>
      <h1>{data.post.title}</h1>
      <p class="lede">{data.post.summary}</p>
      <div class="pill-row">
        {#each data.post.tags as tag}
          <span class="pill">#{tag}</span>
        {/each}
      </div>
    </header>

    <div class="body">
      {#each data.post.body as paragraph}
        <p>{paragraph}</p>
      {/each}
    </div>
  </article>
</main>

<style>
  .article-page {
    max-width: 900px;
  }

  article {
    margin-top: 36px;
  }

  h1 {
    margin: 0;
    color: var(--ink);
    font-size: clamp(2.8rem, 8vw, 5.4rem);
    line-height: 1;
    letter-spacing: 0;
  }

  .body {
    margin-top: 56px;
  }

  .body p {
    color: #343941;
    font-size: 1.08rem;
    line-height: 1.9;
  }
</style>
