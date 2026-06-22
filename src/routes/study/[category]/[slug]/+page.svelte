<script>
  import { markdownToHtml } from '$lib/markdown.js';

  export let data;

  $: bodyHtml = markdownToHtml(data.post.body);
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
      {@html bodyHtml}
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

  .body :global(h1),
  .body :global(h2),
  .body :global(h3) {
    color: var(--ink);
    line-height: 1.25;
    letter-spacing: 0;
  }

  .body :global(h1) {
    margin: 0 0 28px;
    font-size: 2.2rem;
  }

  .body :global(h2) {
    margin: 48px 0 16px;
    font-size: 1.5rem;
  }

  .body :global(h3) {
    margin: 34px 0 12px;
    font-size: 1.18rem;
  }

  .body :global(p),
  .body :global(li),
  .body :global(td),
  .body :global(th) {
    color: #343941;
    font-size: 1.08rem;
    line-height: 1.9;
  }

  .body :global(ul) {
    margin: 14px 0 26px;
    padding-left: 1.35rem;
  }

  .body :global(pre) {
    overflow-x: auto;
    border: 1px solid var(--line);
    border-radius: 8px;
    margin: 18px 0 28px;
    padding: 18px;
    background: #111827;
    color: #f8fafc;
  }

  .body :global(code) {
    border-radius: 5px;
    padding: 0.14em 0.34em;
    background: #eef2f7;
    color: #1f2937;
    font-size: 0.92em;
  }

  .body :global(pre code) {
    padding: 0;
    background: transparent;
    color: inherit;
    font-size: 0.96rem;
    line-height: 1.8;
  }

  .body :global(table) {
    display: block;
    overflow-x: auto;
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0 32px;
  }

  .body :global(th),
  .body :global(td) {
    border: 1px solid var(--line);
    padding: 10px 12px;
    text-align: left;
    vertical-align: top;
  }

  .body :global(th) {
    background: var(--surface);
    color: var(--ink);
    font-weight: 800;
  }
</style>
