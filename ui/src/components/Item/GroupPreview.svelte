<script lang="ts">
  import { Item, ItemKey } from '$types/portal/item';

  import { link } from 'svelte-spa-router';
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
  $: groupKey = item && `${item.keyObj.ship}/${item.keyObj.cord}`;
  $: joinedDetails = getJoinedGroupDetails(groupKey);
</script>

{#if item}
  {@const { title, blurb, description, image, color } = getMeta(item)}
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
      {#if !joinedDetails}
        <button
          on:click|stopPropagation={async (event) => {
            event.preventDefault();
            event.currentTarget.innerHTML = 'Joining...';
            await api.urbit.do.joinGroup(groupKey).then(refreshGroups);
          }}
          class="bg-black dark:bg-white rounded-md text-xs font-bold px-2 py-1 text-white flex items-center gap-2 min-w-fit"
          ><div class="w-4 h-4 text-white dark:text-black"><LogOutIcon /></div>
          <div class="dark:text-black">Join</div>
        </button>
      {/if}
    </div>
  </a>
{:else}
  <div class="p-4 hover:bg-hover rounded-lg">Contacting {key.ship}...</div>
{/if}
