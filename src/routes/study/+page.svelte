<script>
  import { studyCategories, studyLabels, studyPosts } from '$lib/content.js';
</script>

<svelte:head>
  <title>Study | jinrudals</title>
  <meta name="description" content="Study notes by category." />
</svelte:head>

<main class="page">
  <section>
    <p class="eyebrow">Study</p>
    <h1>공부 기록</h1>
    <p class="lede">카테고리별로 정리한 공부 글입니다. 블로그처럼 최근 글부터 훑어볼 수 있습니다.</p>
  </section>

  <section class="section" aria-labelledby="categories">
    <h2 id="categories">Categories</h2>
    <div class="grid three">
      {#each studyCategories as category}
        <a class="card category" href={`/study/${category.id}`}>
          <h3>{category.label}</h3>
          <p>{category.description}</p>
        </a>
      {/each}
    </div>
  </section>

  <section class="section" aria-labelledby="all-posts">
    <h2 id="all-posts">All Notes</h2>
    <div class="label-filter" aria-label="Study labels">
      <a class="active" href="/study">All</a>
      {#each studyLabels as label}
        <a href={`/study/labels/${label.id}`}>
          #{label.label}
        </a>
      {:else}
        <span>라벨 없음</span>
      {/each}
    </div>
    <div class="posts">
      {#each studyPosts as post}
        <a class="post" href={`/study/${post.category}/${post.slug}`}>
          <span>{post.date} · {post.category}</span>
          <strong>{post.title}</strong>
          <p>{post.summary}</p>
          <div class="pill-row">
            {#each post.tags as tag}
              <span class="pill">#{tag}</span>
            {/each}
          </div>
        </a>
      {:else}
        <p class="empty">아직 등록된 공부 글이 없습니다.</p>
      {/each}
    </div>
  </section>
</main>

<style>
  h1 {
    max-width: 760px;
    margin: 0;
    color: var(--ink);
    font-size: clamp(3rem, 8vw, 5.8rem);
    line-height: 1;
    letter-spacing: 0;
  }

  h2 {
    margin: 0 0 22px;
  }

  .category {
    color: inherit;
    text-decoration: none;
  }

  .posts {
    display: grid;
    gap: 14px;
  }

  .label-filter {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 24px;
  }

  .label-filter a {
    border: 1px solid var(--line);
    border-radius: 999px;
    padding: 8px 12px;
    color: var(--muted);
    background: var(--surface);
    font-size: 0.9rem;
    font-weight: 800;
    text-decoration: none;
  }

  .label-filter span,
  .empty {
    color: var(--muted);
    line-height: 1.7;
  }

  .label-filter a.active {
    border-color: var(--accent-strong);
    background: var(--accent-strong);
    color: white;
  }

  .post {
    display: grid;
    gap: 8px;
    border-bottom: 1px solid var(--line);
    padding: 18px 0;
    text-decoration: none;
  }

  .post span {
    color: var(--warm);
    font-size: 0.86rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  .post strong {
    color: var(--ink);
    font-size: 1.3rem;
  }

  .post p {
    max-width: 760px;
    margin: 0;
    color: var(--muted);
    line-height: 1.7;
  }
</style>
