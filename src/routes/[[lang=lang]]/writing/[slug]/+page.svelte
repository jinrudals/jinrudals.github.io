<script lang="ts">
  import Article from '$lib/Article.svelte';
  let { data } = $props();
</script>

<svelte:head><title>{data.meta.title} · jinrudals</title></svelte:head>
<Article meta={data.meta} component={data.component} lang={data.lang} fellBack={data.fellBack} />
