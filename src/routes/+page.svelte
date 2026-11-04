<script lang="ts">
  import EntryList from '$lib/EntryList.svelte';
  import { listEntries } from '$lib/content';
  const recent = listEntries('writing').slice(0, 5);
</script>

<svelte:head><title>진경민 (Gyeongmin Jin)</title></svelte:head>

<section class="hero">
  <p class="eyebrow">Gyeongmin Jin · Benjamin</p>
  <h1>제조업 현장에서,<br />DevOps를 다시 생각합니다.</h1>
  <p class="lead">현장(OT)과 IT 사이의 피드백 루프를 짧게 만드는 일에 대해 쓰고 만듭니다.</p>
  <div class="cta">
    <a class="btn primary" href="/writing">글 읽기</a>
    <a class="btn" href="/projects">프로젝트 보기</a>
    <a class="btn" href="/about">소개</a>
  </div>
</section>

<div class="section-head">
  <h2>최근 글</h2>
  <a href="/writing">전체 보기 →</a>
</div>
<EntryList entries={recent} />

<section class="about-teaser">
  <strong>진경민</strong>
  <p>제조업 DevOps를 고민하는 엔지니어입니다. 스터디 노트, 프로젝트, 경력도 이곳에 모읍니다.</p>
  <a href="/about">더 알아보기 →</a>
</section>
