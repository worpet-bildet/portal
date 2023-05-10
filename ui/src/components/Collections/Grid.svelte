<script>
  import { getCuratorCollections, state } from '@root/state';
  import SquarePreview from './SquarePreview.svelte';
  import { link } from 'svelte-spa-router';
  export let patp;

  let collections;
  const loadCollections = (patp) => {
    collections = (getCuratorCollections(patp) || []).filter(
      (c) => c?.bespoke?.['key-list']?.length > 0
    );
  };

  state.subscribe((s) => {
    loadCollections(patp);
  });

  $: loadCollections(patp);
</script>

<div class="grid grid-cols-12 gap-4 items-start">
  {#if collections.length === 0}
    <div class="col-span-12">
      {patp} hasn't created any collections on Portal yet.
    </div>
  {:else}
    {#each collections as collection}
      <a use:link href={`${collection.keyStr}`} class="col-span-4">
        <SquarePreview {collection} />
      </a>
    {/each}
  {/if}
</div>
