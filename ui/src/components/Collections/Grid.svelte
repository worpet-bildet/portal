<script>
  import {
    getCuratorCollections,
    state,
    keyStrFromObj,
    getItem,
  } from '@root/state';
  import { subscribeToItem } from '@root/api';
  import SquarePreview from './SquarePreview.svelte';
  import { link } from 'svelte-spa-router';
  import { fade } from 'svelte/transition';
  export let patp;

  let collections;
  const loadCollections = (patp) => {
    (getCuratorCollections(patp) || []).forEach((c) => {
      if ($state.isLoaded && !getItem(keyStrFromObj(c))) {
        subscribeToItem(c);
      }
    });
    collections = (getCuratorCollections(patp) || [])
      .map((c) => getItem(keyStrFromObj(c)))
      .filter((c) => !!c);
    console.log({ collections });
  };

  state.subscribe(() => {
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
      <a use:link href={`${collection.keyStr}`} class="col-span-4" in:fade>
        <SquarePreview key={collection.keyObj} />
      </a>
    {/each}
  {/if}
</div>
