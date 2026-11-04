<script lang="ts">
  import EntryList from '$lib/EntryList.svelte';
  import { listEntries } from '$lib/content';
  const recent = listEntries('writing').slice(0, 5);
  const focus = [
    ['자동화와 CI/CD', 'Jenkins 파이프라인, shared library, 정식 jenkinsci plugin으로 발전한 도구'],
    ['플랫폼과 인프라', 'SLURM, Kubernetes, Rook-Ceph, AWS, Terraform 기반의 개발 환경'],
    ['개발자 도구', 'Django, Kafka 기반 내부 시스템부터 MCP gateway, LLM proxy 같은 AI 도구까지']
  ];
</script>

<svelte:head><title>jinrudals · 진경민</title></svelte:head>

<section class="hero">
  <p class="eyebrow">jinrudals · 진경민 (Gyeongmin Jin, Benjamin)</p>
  <h1>개발자가 만드는 일에 집중하도록,<br />플랫폼을 만드는 엔지니어</h1>
  <p class="lead">
    플랫폼·DevOps 엔지니어. 자동화, 인프라, 개발자 도구를 만들고 그 과정에서 배운 것을 글로 기록
  </p>
  <div class="cta">
    <a class="btn primary" href="/writing">글 읽기</a>
    <a class="btn" href="/career">경력 보기</a>
    <a class="btn" href="/about">소개</a>
  </div>
</section>

<div class="section-head"><h2>하는 일</h2></div>
<section class="cards">
  {#each focus as [title, desc]}
    <div class="card"><strong>{title}</strong><span>{desc}</span></div>
  {/each}
</section>

<div class="section-head">
  <h2>최근 글</h2>
  <a href="/writing">전체 보기 →</a>
</div>
<EntryList entries={recent} />
