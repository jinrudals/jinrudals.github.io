<script lang="ts">
  import { career } from '$lib/career';
</script>

<svelte:head><title>경력 · 진경민</title></svelte:head>
<h1>경력</h1>

<section id="career">
  {#if career.length === 0}
    <p class="muted">준비 중입니다.</p>
  {:else}
    <ol class="career">
      {#each career as c (c.company + c.start)}
        <li>
          <strong>{c.company}</strong> · {c.role}
          <div class="muted">{c.start} – {c.end ?? '현재'}</div>
          {#if c.summary}<p>{c.summary}</p>{/if}
          {#if c.highlights?.length}
            <ul>
              {#each c.highlights as h}<li>{h}</li>{/each}
            </ul>
          {/if}
        </li>
      {/each}
    </ol>
  {/if}
</section>
