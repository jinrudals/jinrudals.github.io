<script lang="ts">
  import Article from '$lib/Article.svelte';
  let { data } = $props();
</script>

<svelte:head><title>{data.meta.title} · 진경민</title></svelte:head>
<Article meta={data.meta} component={data.component} />
