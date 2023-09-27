<script lang="ts">
  import { Item, ItemKey } from '$types/portal/item';

  import { push } from 'svelte-spa-router';
  import {
    state,
    getItem,
    getJoinedGroupDetails,
    refreshGroups,
  } from '@root/state';
  import { api } from '@root/api';
  import { getMeta } from '@root/util';
  import { ItemImage, LogOutIcon } from '@fragments';

  export let key: ItemKey;

  let item: Item;

  const loadItem = (key: ItemKey) => {
    item = getItem(key);
    if (!item) return api.portal.do.subscribe(key);
  };

  $: $state && loadItem(key);
  $: groupKey = `${item.keyObj.ship}/${item.keyObj.cord}`;
  $: joinedDetails = getJoinedGroupDetails(groupKey);
</script>

{#if item}
  {@const { title, blurb, description, image, color } = getMeta(item)}
  <div
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
      {#if !joinedDetails}
        <button
          on:click|stopPropagation={async (event) => {
            event.stopPropagation();
            event.currentTarget.innerHTML = 'Joining...';
            await api.urbit.do.joinGroup(groupKey).then(refreshGroups);
          }}
          class="bg-black rounded-md text-xs font-bold px-2 py-1 text-white flex items-center gap-2"
          ><div class="w-4 h-4 text-white"><LogOutIcon /></div>
          <div>Join</div>
        </button>
      {/if}
    </div>
  </div>
{:else}
  <div class="p-4 hover:bg-hover rounded-lg">Contacting {key.ship}...</div>
{/if}
