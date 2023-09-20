<script lang="ts">
  import { sigVisible, sigItems, sigLocation, sigProps } from './stores';
  import { ItemImage } from '@fragments';

  export let selectedIndex = 0;

  let height;

  let elements = [];
</script>

<svelte:window bind:innerHeight={height} />

{#if $sigVisible}
  <div
    class="absolute flex flex-col bg-white drop-shadow-search w-96 max-w-full rounded-lg overflow-y-auto"
    style="left: {$sigLocation.x}px; top: {$sigLocation.y +
      $sigLocation.height +
      384 >
    height
      ? $sigLocation.y - $sigLocation.height - 384
      : $sigLocation.y + $sigLocation.height}px;"
  >
    <div class="p-2 text-sm text-slate-500">Items</div>
    {#each $sigItems as { title, struc, image, color, command }, i}
      <button
        class="flex items-center p-3 w-full text-left"
        class:bg-slate-100={i == selectedIndex}
        on:mouseenter={() => (selectedIndex = i)}
        on:click={() => {
          $sigVisible = false;
          command($sigProps);
        }}
        bind:this={elements[i]}
      >
        <div class="flex items-center gap-4 w-full">
          <div class="w-7 h-7 overflow-hidden rounded-md">
            <ItemImage {image} {title} {color} />
          </div>
          <div class="text-left line-clamp-1 overflow-ellipsis">
            {title}
          </div>
        </div>
        <div
          class="text-xs text-strucpilltext bg-strucpill rounded-full px-3 py-1"
        >
          {struc.toUpperCase()}
        </div>
      </button>
    {/each}
  </div>
{/if}
