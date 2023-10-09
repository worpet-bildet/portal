<script lang="ts">
  import { Item, ItemKey } from '$types/portal/item';

  import { link } from 'svelte-spa-router';
  import { state, getItem, keyStrFromObj } from '@root/state';
  import { api } from '@root/api';
  import { getMeta, checkIfInstalled } from '@root/util';
  import { DownloadIcon, ItemImage } from '@fragments';

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
  {@const { title, blurb, description, image, color, ship, distShip } =
    getMeta(item)}
  <a
    use:link
    href={item.keyStr}
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
            event.preventDefault();
            window.open(
              `${window.location.origin}/apps/grid/search/${
                distShip || ship
              }/apps`
            );
          }}
          class="bg-black rounded-md text-xs font-bold px-2 py-1 text-white flex items-center gap-2 min-w-fit"
          ><div class="w-4 h-4 text-white"><DownloadIcon /></div>
          <div>Install</div>
        </button>
      {/if}
    </div>
  </a>
{:else}
  <div class="p-4 hover:bg-hover rounded-lg">Contacting {key.ship}...</div>
{/if}
