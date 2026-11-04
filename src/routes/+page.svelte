<script lang="ts">
  import EntryList from '$lib/EntryList.svelte';
  import { listEntries } from '$lib/content';
  const recent = listEntries('writing').slice(0, 5);
  const sections = [
    ['/writing', '글', '제조업 속 DevOps에 대한 고찰'],
    ['/study', '스터디', '짧은 학습 노트'],
    ['/projects', '프로젝트', '만들어 온 것들'],
    ['/career', '경력', '일해 온 길']
  ];
</script>

<svelte:head><title>진경민 (Gyeongmin Jin)</title></svelte:head>

<section class="hero">
  <p class="eyebrow">Gyeongmin Jin · Benjamin</p>
  <h1>진경민</h1>
  <p class="lead">제조업 현장에서 DevOps가 무엇인지 고민하고 기록합니다.</p>
</section>

<section class="cards">
  {#each sections as [href, title, desc]}
    <a class="card" {href}><strong>{title}</strong><span>{desc}</span></a>
  {/each}
</section>

<h2>최근 글</h2>
<EntryList entries={recent} />
