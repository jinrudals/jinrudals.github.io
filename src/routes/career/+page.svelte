<script lang="ts">
  import { career, education } from '$lib/career';
</script>

<svelte:head><title>경력 · 진경민</title></svelte:head>
<div class="prose">
  <h1>경력</h1>

  <ol class="career">
    {#each career as c (c.company)}
      <li>
        <div class="career-head">
          <strong>{c.company}</strong>
          <span class="muted">{c.start} – {c.end ?? '현재'}</span>
        </div>
        <div class="muted">{c.team.join(' → ')}</div>
        <p class="career-summary">{c.summary}</p>
        <ul>
          {#each c.highlights as h}<li>{h}</li>{/each}
        </ul>
        <div class="tags">
          {#each c.stack as s}<span class="chip">{s}</span>{/each}
        </div>
      </li>
    {/each}
  </ol>

  <h2>학력</h2>
  <ul class="plain">
    {#each education as e (e.school)}
      <li><strong>{e.school}</strong> · {e.major} <span class="muted">{e.start} – {e.end}</span></li>
    {/each}
  </ul>
</div>
