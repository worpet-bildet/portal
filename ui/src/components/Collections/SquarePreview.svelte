<script lang="ts">
  import { api } from '@root/api';
  import { state, getItem, keyStrFromObj } from '@root/state';
  import { getMeta } from '@root/util';
  import { Sigil } from '@components';
  import { ItemImage, SearchIcon } from '@fragments';
  import placeholder from '@assets/placeholder.svg';

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
    {#if withTitle}
      <div
        class="rounded-bl-lg rounded-br-lg bg-panels dark:bg-darkgrey border p-2"
      >
        <div>{title}</div>
      </div>
    {/if}
  </div>
{:else}
  <div class="flex justify-center items-center w-full h-full">
    <div class="w-8 h-8">
      <SearchIcon />
    </div>
  </div>
{/if}
