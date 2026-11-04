<script lang="ts">
  import EntryList from '$lib/EntryList.svelte';
  import { listEntries } from '$lib/content';
  const entries = listEntries('writing');
</script>

<svelte:head><title>글 · 진경민</title></svelte:head>
<h1>글</h1>
<p class="muted">엔지니어링과 DevOps에 대한 고찰과 에세이.</p>
<EntryList {entries} />
