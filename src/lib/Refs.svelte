<script lang="ts">
  // inline term; click opens a list of reference links, each in a new tab
  let { label, links }: { label: string; links: { title: string; url: string }[] } = $props();
  let open = $state(false);
  let root: HTMLElement;

  const onWindowClick = (e: MouseEvent) => {
    if (open && !root.contains(e.target as Node)) open = false;
  };
  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') open = false;
  };
</script>

<svelte:window onclick={onWindowClick} onkeydown={onKeydown} />

<span class="refs" bind:this={root}>
  <button type="button" class="refs-term" aria-expanded={open} onclick={() => (open = !open)}>{label}</button>
  {#if open}
    <span class="refs-pop" role="group" aria-label={label}>
      {#each links as l (l.url)}
        <a href={l.url} target="_blank" rel="noopener noreferrer">{l.title} ↗</a>
      {/each}
    </span>
  {/if}
</span>

<style>
  .refs { position: relative; display: inline-block; }
  .refs-term { font: inherit; color: var(--accent); background: none; border: 0; padding: 0; cursor: pointer; border-bottom: 1px dashed var(--accent); }
  .refs-pop { position: absolute; z-index: 10; top: 100%; left: 0; margin-top: .3rem; min-width: 16rem; display: flex; flex-direction: column; gap: .15rem; padding: .4rem; background: var(--surface); border: 1px solid var(--line); border-radius: 10px; box-shadow: 0 6px 24px rgba(0, 0, 0, .18); font-size: .9rem; }
  .refs-pop a { padding: .35rem .6rem; border-radius: 6px; text-decoration: none; white-space: nowrap; }
  .refs-pop a:hover { background: var(--accent-soft); }
</style>
