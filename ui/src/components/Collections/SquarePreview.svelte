<script>
  import { subscribeToItem } from '@root/api';
  import { getItem, keyStrFromObj } from '@root/state';
  import { getMeta } from '@root/util';
  import { ItemImage, LikeIcon, CommentIcon } from '@fragments';

  export let collection;

  let item, title, previewItems;

  $: {
    item = getItem(collection?.keyStr);
    ({ title } = getMeta(item));
    // we only want at most four items here
    previewItems = (item?.bespoke?.['key-list']?.slice(0, 4) || [])
      .map((keyObj) => {
        console.log({ keyObj });
        // probably here we want to ensure that we get the meta of the item
        let i = getItem(keyStrFromObj(keyObj));
        if (!i) {
          subscribeToItem(keyObj);
          return;
        }
        return getMeta(i);
      })
      .filter((i) => !!i);
  }

  /*
    if previewItems.length === 1
      colspan = 2 = length x 2
      rowspan = 2 = length x 2

    if previewItems.length === 2
      colspan = 2 = length x 2
      rowspan = 1 = length / 2

    if previewItems.length === 3
      colspan = i < 2 ? 1 : 2
      rowspan = 1

  */
</script>

{#if previewItems.length > 0}
  <div class="grid grid-cols-2 grid-rows-2">
    {#each previewItems as { image, title, color }, i}
      <div class="border row-span-1 col-span-1">
        <ItemImage {image} {title} {color} />
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
{/if}
