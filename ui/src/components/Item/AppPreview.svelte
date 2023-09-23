<script lang="ts">
  import { Item, ItemKey } from '$types/portal/item';

  import { push } from 'svelte-spa-router';
  import { state, getItem } from '@root/state';
  import { api } from '@root/api';
  import { getMeta, checkIfInstalled } from '@root/util';
  import { ItemImage } from '@fragments';

  export let key: ItemKey;

  let item: Item;
  let isInstalled: boolean;

  const loadItem = (key: ItemKey) => {
    item = getItem(key);
    if (!item) return api.portal.do.subscribe(key);
    isInstalled = checkIfInstalled(
      state,
      item?.keyObj?.ship,
      item?.keyObj?.cord
    );
  };

  $: $state && loadItem(key);
</script>

{#if item}
  {@const { title, blurb, description, image, color, ship } = getMeta(item)}
  <button
    on:click
    on:click={() => push(item.keyStr)}
    class="grid grid-cols-6 w-full items-start gap-2 hover:duration-500 rounded-lg text-sm text-left"
  >
    <div class="col-span-1 overflow-hidden rounded-md self-center">
      <ItemImage {image} {title} {color} />
    </div>
    <div
      class="col-span-5 flex items-center justify-between gap-2 overflow-hidden self-center"
    >
      <div class="flex flex-col items-start">
        <div class="font-bold line-clamp-1">
          {title}
        </div>
        <div class="line-clamp-2">
          {blurb || description || ''}
        </div>
      </div>
      {#if !isInstalled}
        <button
          on:click|stopPropagation={(event) => {
            event.stopPropagation();
            window.open(
              `${window.location.origin}/apps/grid/search/${ship}/apps`
            );
          }}
          class="bg-black rounded-md text-xs font-bold px-2 py-1 text-white"
          >Install
        </button>
      {/if}
    </div>
  </button>
{:else}
  <div class="p-4 hover:bg-hover rounded-lg">Contacting {key.ship}...</div>
{/if}
