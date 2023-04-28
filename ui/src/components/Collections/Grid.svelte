<script>
  import { getCurator, getItem } from '@root/state';
  import SquarePreview from './SquarePreview.svelte';
  export let patp;

  const curator = getCurator(patp);

  let collections = curator?.item?.data?.bespoke?.payload;

  // we need to find out here whether the collection is empty because if it
  // is then we don't want to do the col-span-4 down there
  collections = collections.filter((c) => {
    return getItem(c?.keyStr).data?.bespoke?.payload?.length > 0;
  });
</script>

<div class="grid grid-cols-12 gap-4 items-start">
  {#each collections as collection}
    <div class="col-span-4">
      <SquarePreview {collection} />
    </div>
  {/each}
</div>
