<script>
  export let data;
</script>

<svelte:head>
  <title>#{data.label.label} Study | jinrudals</title>
  <meta name="description" content={`Study notes labeled ${data.label.label}.`} />
</svelte:head>

<main class="page">
  <a class="text-link" href="/study">← Study</a>
  <section class="label-header">
    <p class="eyebrow">Study Label</p>
    <h1>#{data.label.label}</h1>
    <p class="lede">이 라벨이 붙은 공부 글입니다.</p>
  </section>

  <section class="section" aria-label={`Posts labeled ${data.label.label}`}>
    <div class="posts">
      {#each data.posts as post}
        <a class="post" href={`/study/${post.category}/${post.slug}`}>
          <span>{post.date} · {post.category}</span>
          <strong>{post.title}</strong>
          <p>{post.summary}</p>
        </a>
      {/each}
    </div>
  </section>
</main>

<style>
  .label-header {
    margin-top: 36px;
  }

  h1 {
    margin: 0;
    color: var(--ink);
    font-size: clamp(3rem, 8vw, 5.4rem);
    line-height: 1;
    letter-spacing: 0;
  }

  .posts {
    display: grid;
    gap: 14px;
  }

  .post {
    display: block;
    border-bottom: 1px solid var(--line);
    padding: 18px 0;
    text-decoration: none;
  }

  .post span {
    color: var(--warm);
    font-size: 0.86rem;
    font-weight: 800;
  }

  .post strong {
    display: block;
    margin-top: 6px;
    color: var(--ink);
    font-size: 1.25rem;
  }

  .post p {
    max-width: 760px;
    color: var(--muted);
    line-height: 1.7;
  }
</style>
