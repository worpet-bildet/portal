<script>
  import { subscribeToItem } from '@root/api';
  import { state, getItem, keyStrFromObj } from '@root/state';
  import { getMeta } from '@root/util';
  import { Sigil } from '@components';
  import { ItemImage, LoadingIcon } from '@fragments';
  import placeholder from '@assets/placeholder.svg';

  export let key;
  export let withTitle = true;

  let collection, title, image, previewItems;

  $: {
    collection = getItem(keyStrFromObj(key));
    ({ title, image } = getMeta(collection));

    // we only want at most four items here
    previewItems = collection?.bespoke?.['key-list']
      ?.map((keyObj) => {
        let i = getItem(keyStrFromObj(keyObj));
        if ($state.isLoaded && !i) {
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
      previewItems &&
      (previewItems.length === 3 || previewItems.length === 2) &&
      !image &&
      !reset
    ) {
      container.style.height = `${containerHeight / 2}px`;
      reset = true;
    }
  };
</script>

{#if previewItems && previewItems.length > 0}
  <div class="border shadow rounded-lg overflow-hidden">
    <div class="grid grid-cols-2 grid-rows-2" bind:this={container}>
      {#if image}
        <div class="border row-span-2 col-span-2">
          <ItemImage {image} {title} on:load={resetHeight} />
        </div>
      {:else}
        {#each previewItems as { struc, image, title, color }, i}
          <div
            class="border overflow-hidden"
            class:col-span-2={previewItems.length === 1 ||
              (previewItems.length === 3 && i === 2) ||
              previewItems.length === 2}
            class:row-span-2={previewItems.length === 1}
          >
            {#if struc === 'ship'}
              <Sigil patp={title} />
              <!-- Ok this is super dumb but I'm not 100% sure how else to do it -->
              <img src={placeholder} class="hidden" on:load={resetHeight} />
            {:else}
              <ItemImage {image} {title} {color} on:load={resetHeight} />
            {/if}
          </div>
        {/each}
      {/if}
    </div>
    {#if withTitle}
      <div class="bg-gray-500 p-2">
        <div>{title}</div>
      </div>
    {/if}
  </div>
{:else}
  <div class="flex justify-center items-center p-10 w-full h-full">
    <LoadingIcon class="w-16 h-16" />
  </div>
{/if}
