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
  export let loading;

  let collections, curatorCollections;
  let subscribingTo = {};
  const loadCollections = (patp) => {
    curatorCollections = getCuratorCollections(patp) || [];
    curatorCollections.forEach((c) => {
      if (
        $state.isLoaded &&
        !getItem(keyStrFromObj(c)) &&
        !subscribingTo[keyStrFromObj(c)] &&
        c.time !== 'all'
      ) {
        subscribingTo[keyStrFromObj(c)] = true;
        subscribeToItem(c);
      }
    });
    collections = (getCuratorCollections(patp) || [])
      .map((c) => getItem(keyStrFromObj(c)))
      .filter((c) => !!c)
      .map((c) => {
        delete subscribingTo[keyStrFromObj(c.keyObj)];
        return c;
      })
      .filter((c) => c?.bespoke?.['key-list']?.length > 0)
      .filter((c) => c?.keyObj?.time !== 'all');

    if (collections.length > 0) loading = false;
  };

  state.subscribe(() => {
    loadCollections(patp);
  });

  $: loadCollections(patp);
</script>

<div class="grid grid-cols-12 gap-4 items-start">
  {#if loading || (curatorCollections.length > 0 && collections.length === 0)}
    <div class="col-span-12">Loading...</div>
  {:else if collections.length === 0}
    <div class="col-span-12">
      {patp} hasn't created any collections on Portal yet.
    </div>
  {:else}
    {#each collections as collection}
      <a
        use:link
        href={`${collection.keyStr}`}
        class="col-span-4 h-full"
        in:fade
      >
        <SquarePreview key={collection.keyObj} />
      </a>
    {/each}
  {/if}
</div>
