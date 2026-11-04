<script lang="ts">
  import { career, education } from '$lib/career';
  import { t, type Lang } from '$lib/i18n';
  let { data } = $props();
  const lang = $derived(data.lang as Lang);
</script>

<svelte:head><title>{t(lang, 'career.title')} · jinrudals</title></svelte:head>
<div class="prose">
  <h1>{t(lang, 'career.title')}</h1>

  <ol class="career">
    {#each career as c (c.company.ko)}
      <li>
        <div class="career-head">
          <strong>{c.company[lang]}</strong>
          <span class="muted">{c.start} – {c.end ?? t(lang, 'career.present')}</span>
        </div>
        <div class="muted">{c.team[lang].join(' → ')}</div>
        <p class="career-summary">{c.summary[lang]}</p>
        <ul>
          {#each c.highlights[lang] as h}<li>{h}</li>{/each}
        </ul>
        <div class="tags">
          {#each c.stack as s}<span class="chip">{s}</span>{/each}
        </div>
      </li>
    {/each}
  </ol>

  <h2>{t(lang, 'career.education')}</h2>
  <ul class="plain">
    {#each education as e (e.school.ko)}
      <li><strong>{e.school[lang]}</strong> · {e.major[lang]} <span class="muted">{e.start} – {e.end}</span></li>
    {/each}
  </ul>
</div>
