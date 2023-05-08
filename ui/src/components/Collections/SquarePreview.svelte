<script>
  import { subscribeToItem } from '@root/api';
  import { getItem, keyStrFromObj } from '@root/state';
  import { getMeta } from '@root/util';
  import { ItemImage, LikeIcon, CommentIcon } from '@fragments';

  export let collection;

  let item, title, image, previewItems;

  $: {
    item = getItem(collection?.keyStr);
    ({ title, image } = getMeta(item));

    // we only want at most four items here
    previewItems = item?.bespoke?.['key-list']
      ?.map((keyObj) => {
        let i = getItem(keyStrFromObj(keyObj));
        if (!i) {
          subscribeToItem(keyObj);
          return;
        }
        return getMeta(i);
      })
      .filter((i) => !!i)
      .slice(0, 4);
  }

  // this is quite janky, but i am happy enough with it for now
  let container, containerHeight, reset;
  const resetHeight = () => {
    containerHeight = container && container.clientHeight;
    if (
      (previewItems.length === 3 || previewItems.length === 2) &&
      !image &&
      !reset
    ) {
      container.style.height = `${containerHeight / 2}px`;
      reset = true;
    }
  };
</script>

{#if previewItems.length > 0}
  <div class="grid grid-cols-2 grid-rows-2" bind:this={container}>
    {#if image}
      <div class="border row-span-2 col-span-2">
        <ItemImage {image} {title} on:load={resetHeight} />
      </div>
    {:else}
      {#each previewItems as { image, title, color }, i}
        <div
          class="border"
          class:col-span-2={previewItems.length === 1 ||
            (previewItems.length === 3 && i === 2) ||
            previewItems.length === 2}
          class:row-span-2={previewItems.length === 1}
        >
          <ItemImage {image} {title} {color} on:load={resetHeight} />
        </div>
      {/each}
    {/if}
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
