<script lang="ts">
  import { Item, ItemKey } from '$types/portal/item';

  import { createEventDispatcher } from 'svelte';
  import { push } from 'svelte-spa-router';
  import {
    state,
    keyStrFromObj,
    keyStrToObj,
    getItem,
    getJoinedGroupDetails,
    refreshGroups,
  } from '@root/state';
  import { api } from '@root/api';
  import { getMeta, checkIfInstalled } from '@root/util';
  import {
    CollectionsSquarePreview,
    Sigil,
    GroupsChatMessage,
    GroupsHeapCurio,
    GroupsDiaryNote,
  } from '@components';
  import {
    ItemImage,
    TrashIcon,
    EditIcon,
    ExternalDestinationIcon,
  } from '@fragments';

  export let key: ItemKey;

  let item: Item;
  let joinedDetails;
  let groupKey: string;

  const loadItem = (key: ItemKey) => {
    item = getItem(key);
    if (!item) return api.portal.do.subscribe(key);

    groupKey = `${item.keyObj.ship}/${item.keyObj.cord}`;
    joinedDetails = getJoinedGroupDetails(groupKey);
  };

  $: $state && loadItem(key);
</script>

{#if item}
  {@const { title, blurb, description, image, color } = getMeta(item)}
  <button
    on:click
    on:click={() => push(item.keyStr)}
    class="grid grid-cols-6 w-full items-start gap-2 p-2 border hover:duration-500 rounded-lg text-sm text-left"
  >
    <div class="col-span-1 border overflow-hidden rounded-md self-center">
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
          class="bg-black rounded-md text-xs font-bold px-2 py-1 text-white"
          >Join
        </button>
      {/if}
    </div>
  </button>
{:else}
  <div class="p-4 hover:bg-hover rounded-lg">Contacting {key.ship}...</div>
{/if}
