<script lang="ts">
  import EntryList from '$lib/EntryList.svelte';
  import { listEntries } from '$lib/content';
  const entries = listEntries('notes');
</script>

<svelte:head><title>노트 · 진경민</title></svelte:head>
<h1>노트</h1>
<p class="muted">개인적인 기록.</p>
<EntryList {entries} />
