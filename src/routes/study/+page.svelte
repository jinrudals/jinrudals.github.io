<script lang="ts">
  import EntryList from '$lib/EntryList.svelte';
  import { listEntries } from '$lib/content';
  const entries = listEntries('study');
</script>

<svelte:head><title>스터디 · jinrudals</title></svelte:head>
<h1>스터디</h1>
<p class="muted">짧은 학습 노트.</p>
<EntryList {entries} />
