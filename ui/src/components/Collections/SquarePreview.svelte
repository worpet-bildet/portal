<script>
  import { getItem } from '@root/state';
  import { getMeta } from '@root/util';
  import { ItemImage, LikeIcon, CommentIcon } from '@fragments';

  export let collection;
  const item = getItem(collection?.keyStr);
  const { title } = getMeta(item);
  const payload = item?.data?.bespoke?.payload.slice(0, 4);

  // how do we display these items in a conditionally laid-out grid?
  // eg if we only have two items, we want them both to span two rows, but if we
  // have three items, we want the first two to span a row together, and the
  // last one to span two columns (or something similar)
</script>

{#if payload.length > 0}
  <div class="grid grid-cols-2">
    {#each payload as p}
      <div class="border col-span-1 h-16 sm:h-24 lg:h-36 xl:h-44">
        <ItemImage item={getItem(p?.keyStr)} />
      </div>
    {/each}
  </div>
  <div class="bg-gray-500 p-2">
    <div>{title}</div>
    <div class="flex gap-4">
      <div class="flex items-center gap-2">
        <div class="h-5 w-5"><LikeIcon /></div>
        6
      </div>
      <div class="flex items-center gap-2">
        <div class="h-5 w-5"><CommentIcon /></div>
        6
      </div>
    </div>
  </div>
{:else}
  <div />
{/if}
