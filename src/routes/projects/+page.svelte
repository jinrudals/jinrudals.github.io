<script lang="ts">
  import EntryList from '$lib/EntryList.svelte';
  import { listEntries } from '$lib/content';
  const entries = listEntries('projects');
</script>

<svelte:head><title>프로젝트 · 진경민</title></svelte:head>
<h1>프로젝트</h1>
<p class="muted">진행한 프로젝트.</p>
<EntryList {entries} />
