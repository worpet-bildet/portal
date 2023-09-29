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
  import { CollectionsSquarePreview, Sigil, GroupsItem } from '@components';
  import { BinIcon, ItemImage, LinkIcon, PostIcon } from '@fragments';

  import GroupPreview from './GroupPreview.svelte';
  import AppPreview from './AppPreview.svelte';
  import SidebarPreview from './SidebarPreview.svelte';

  export let key: ItemKey | string;

  export let clickable = false;
  export let removable = false;
  export let editable = false;
  export let selectable = false;
  export let selected = false;
  export let expandPreview = false;

  let item: Item;
  let isInstalled: boolean;
  let joinedDetails;
  let groupKey: string;
  let isGroupsItem: boolean = false;

  // TODO: something like this instead of the ugly if statements
  let previews = {
    app: {
      component: SidebarPreview,
      action: () => {},
      actionText: ['Install', 'Installing...'],
      isActionEnabled: (item) => {
        return !checkIfInstalled(state, item?.keyObj?.ship, item?.keyObj?.cord);
      },
    },
    group: {
      component: SidebarPreview,
      action: () => {},
      actionText: ['Join', 'Joining'],
      isActionEnabled: (item) => {
        return !getJoinedGroupDetails(
          `${item?.keyObj?.ship}/${item?.keyObj?.cord}`
        );
      },
    },
  };

  let groupsStrucs = [
    'groups-chat-msg',
    'groups-heap-curio',
    'groups-diary-note',
  ];

  $: loadItem(key);

  /**
   * TODO: This whole file needs a refactor. We need to ensure that there is not
   * this huge jumbled if statement in the middle of the template. We should
   * instead have a component for each type of item.
   */

  const loadItem = (key: ItemKey | string) => {
    if (typeof key === 'string') {
      key = keyStrToObj(key);
      item = getItem(key);
    } else {
      item = getItem(keyStrFromObj(key));
    }
    if ($state.isLoaded && !item) {
      return api.portal.do.subscribe(key);
    }
    if (groupsStrucs.includes(item.keyObj.struc)) isGroupsItem = true;
    if (isGroupsItem) clickable = false;

    if (item.keyObj.struc === 'group') {
      groupKey = `${item.keyObj.ship}/${item.keyObj.cord}`;
      joinedDetails = getJoinedGroupDetails(groupKey);
    }
    if (item.keyObj.struc === 'app')
      isInstalled = checkIfInstalled(
        $state,
        item?.keyObj?.ship,
        item?.keyObj?.cord
      );
    console.log({ item });
  };

  $: $state && loadItem(key);

  const dispatch = createEventDispatcher();
  const remove = () => dispatch('remove', item.keyStr);
  const edit = () => dispatch('edit', item.keyStr);
</script>

{#if item}
  {@const {
    keyObj: { struc, ship },
  } = item}
  {@const { title, blurb, description, image, color, link, createdAt } =
    getMeta(item)}
  <button
    on:click
    on:click={() => {
      // if (clickable) {
      if (selectable) {
        selected = !selected;
        dispatch('selected', { key, selected });
      } else if (struc === 'ship') {
        push(`/${ship}`);
      } else if ((struc === 'other' || struc === 'blog') && link) {
        window.open(link);
      }
      // } else if (struc === 'retweet') {
      // window.location.href = `#${createdAt}`;
      // } else {
      // push(item.keyStr);
      // }
    }}
    class={`flex w-full items-start gap-2 p-2 dark:hover:bg-transparent hover:duration-500 rounded-lg text-sm text-left hover:bg-white ${$$props.class}`}
    class:cursor-default={!clickable}
    class:hover:bg-panels-hover={clickable}
    class:dark:hover:border-white={clickable}
    class:bg-dark={selected}
    class:text-white={selected}
    class:dark:border-white={selected}
    class:bg-white={isGroupsItem}
  >
    {#if isGroupsItem}
      <GroupsItem {item} isExpanded={expandPreview} />
    {:else if struc === 'app'}
      <AppPreview key={item.keyObj} />
    {:else if struc === 'group'}
      <GroupPreview key={item.keyObj} />
    {:else}
      <div class="flex justify-between items-center w-full">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 overflow-hidden rounded-md self-center">
            {#if (struc === 'ship' || struc === 'retweet') && !image}
              <Sigil patp={ship} />
            {:else if struc === 'collection' && !image}
              <CollectionsSquarePreview {key} withTitle={false} />
            {:else if !image && link}
              {#await api.link.get.metadata(link)}
                <ItemImage {image} {title} {color} />
              {:then data}
                {#if !data}
                  <ItemImage {image} {title} {color} />
                {:else}
                  <ItemImage image={data.image} title={data.title} />
                {/if}
              {/await}
            {:else}
              <ItemImage {image} {title} {color} />
            {/if}
          </div>
          <div
            class="flex flex-col grow break-words [word-break:break-word] w-fit"
          >
            <div class="flex items-center gap-2">
              <div class="font-bold line-clamp-1 w-fit">
                {title || ship}
              </div>
              {#if (struc === 'other' && link) || struc === 'blog'}
                <div class="w-5">
                  <LinkIcon />
                </div>
              {/if}
            </div>
            <div class="line-clamp-2">
              {blurb || description || ''}
            </div>
          </div>
        </div>
      </div>
      {#if editable || removable}
        <div class="col-span-1 col-start-7 flex flex-col gap-2 self-center">
          {#if editable}
            <button
              class="w-8 h-8 hover:text-blue-500 cursor-pointer"
              on:click|stopPropagation
              on:click={edit}
            >
              <PostIcon />
            </button>
          {/if}
          {#if removable}
            <button
              class="w-8 h-8 hover:bg-red-500 cursor-pointer"
              on:click|stopPropagation
              on:click={remove}
            >
              <BinIcon />
            </button>
          {/if}
        </div>
      {/if}
    {/if}
  </button>
{:else}
  <div class="p-4 hover:bg-hover rounded-lg">Loading...</div>
{/if}
