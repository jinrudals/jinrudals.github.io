<script lang="ts">
  import EntryList from '$lib/EntryList.svelte';
  import { listEntries } from '$lib/content';
  const recent = listEntries('writing').slice(0, 5);
</script>

<svelte:head><title>진경민 (Gyeongmin Jin)</title></svelte:head>
<h1>진경민</h1>
<p class="muted">Gyeongmin Jin · Benjamin</p>
<p class="muted">제조업 현장에서 DevOps를 고민하며 기록합니다.</p>
<h2>최근 글</h2>
<EntryList entries={recent} />
