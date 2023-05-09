<script>
  import { getCuratorCollections, state } from '@root/state';
  import SquarePreview from './SquarePreview.svelte';
  import { link } from 'svelte-spa-router';
  export let patp;

  let collections;
  state.subscribe((s) => {
    collections = (getCuratorCollections(patp) || []).filter(
      (c) => c?.bespoke?.['key-list']?.length > 0
    );
    console.log(collections)
  });

  // we need to find out here whether the collection is empty because if it
  // is then we don't want to do the col-span-4 down there
  // collections = collections?.filter((c) => {
  //   return getItem(c?.keyStr).data?.bespoke?.payload?.length > 0;
  // });
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
