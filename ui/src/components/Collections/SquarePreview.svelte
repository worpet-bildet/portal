<script lang="ts">
  import placeholder from '@assets/placeholder.svg';
  import { Sigil } from '@components';
  import { ItemImage, LoadingIcon } from '@fragments';
  import { api } from '@root/api';
  import { getItem, state } from '@root/state';
  import { getMeta } from '@root/util';

  export let key;
  export let withTitle = true;

  let collection, title, image, previewItems;
  $: {
    collection = getItem(key);
    ({ title, image } = getMeta(collection));

    // we only want at most four items here
    previewItems = collection?.bespoke?.['key-list']
      ?.map((keyObj) => {
        let i = getItem(keyObj);
        if ($state.isLoaded && !i) {
          api.portal.do.subscribe(keyObj);
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
    container.style.height = `${container.clientWidth}px`;
  };
</script>

{#if previewItems && previewItems.length > 0}
  <div class="rounded-lg overflow-hidden hover:duration-500 flex flex-col">
    <div class="grid grid-cols-2 grid-rows-2" bind:this={container}>
      {#if image}
        <div class="row-span-2 col-span-2">
          <ItemImage {image} {title} on:load={resetHeight} />
        </div>
      {:else}
        {#each previewItems as { struc, image, title, color }, i}
          <div
            class="overflow-hidden"
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
  </div>
{:else}
  <div class="flex justify-center items-center w-full h-full">
    <div class="w-8 h-8 dark:stroke-white">
      <LoadingIcon />
    </div>
  </div>
{/if}
