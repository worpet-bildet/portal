<script>
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

  export let key;
  export let clickable = true;
  export let removable = false;
  export let editable = false;
  export let selectable = false;
  export let selected = false;
  export let small = false;

  let item, isInstalled, joinedDetails, groupKey;

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

  const loadItem = (key) => {
    if (typeof key === 'string') {
      key = keyStrToObj(key);
      item = getItem(key);
    } else {
      item = getItem(keyStrFromObj(key));
    }
    if ($state.isLoaded && !item) {
      return api.portal.do.subscribe(key);
    }
    if (groupsStrucs.includes(item.keyObj.struc)) clickable = false;

    if (item.keyObj.struc === 'group') {
      groupKey = `${item.keyObj.ship}/${item.keyObj.cord}`;
      joinedDetails = getJoinedGroupDetails(groupKey);
    }
    if (item.keyObj.struc === 'app')
      isInstalled = checkIfInstalled(
        state,
        item?.keyObj?.ship,
        item?.keyObj?.cord
      );
  };

  state.subscribe(() => {
    loadItem(key);
  });

  const dispatch = createEventDispatcher();
  const remove = () => dispatch('remove', item.keyStr);
  const edit = () => dispatch('edit', item.keyStr);
</script>

{#if item}
  {@const {
    keyObj: { struc, ship },
    keyStr,
  } = item}
  {@const { title, blurb, description, image, color, link, createdAt } =
    getMeta(item)}
  <button
    on:click
    on:click={() => {
      if (clickable) {
        if (struc === 'ship') {
          push(`/${ship}`);
        } else if ((struc === 'other' || struc === 'blog') && link) {
          window.open(link);
        } else if (struc === 'retweet') {
          window.location.href = `#${createdAt}`;
        } else {
          push(item.keyStr);
        }
      } else if (selectable) {
        selected = !selected;
        dispatch('selected', { key, selected });
      }
    }}
    class="grid grid-cols-6 w-full items-start gap-2 p-2 border dark:hover:bg-transparent hover:duration-500 rounded-lg text-sm text-left"
    class:cursor-default={!clickable}
    class:hover:bg-panels-hover={clickable}
    class:dark:hover:border-white={clickable}
    class:bg-panels-hover={selected}
    class:dark:border-white={selected}
  >
    {#if struc === 'groups-chat-msg'}
      {@const {
        bespoke: { content, id, group },
      } = item}
      {@const author = id.split('/')[0]}
      <GroupsChatMessage {author} {group} {content} />
    {:else if struc === 'groups-heap-curio'}
      {@const {
        bespoke: { heart, group },
      } = item}
      <GroupsHeapCurio {heart} {group} />
    {:else if struc === 'groups-diary-note'}
      {@const {
        bespoke: { essay, group },
      } = item}
      <GroupsDiaryNote {essay} {group} />
    {:else}
      <div
        class="border overflow-hidden rounded-md self-center"
        class:col-span-1={!small}
        class:col-span-2={small}
      >
        {#if (struc === 'ship' || struc === 'retweet') && !image}
          <Sigil patp={ship} />
        {:else if struc === 'collection' && !image}
          <CollectionsSquarePreview {key} withTitle={false} />
        {:else if !image && link && struc !== 'app'}
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
        class="flex flex-col items-start gap-2 self-center"
        class:col-span-5={!small}
        class:col-span-4={small}
      >
        <div class="flex items-center gap-2">
          <div
            class="font-bold line-clamp-1 hover:line-clamp-none"
            class:text-sm={small}
            class:text-xl={!small}
          >
            {title || ship}
          </div>
          <div class="text-grey">·</div>
          <div class="text-grey">{struc}</div>
          {#if (struc === 'other' && link) || struc === 'blog'}
            <div class="w-5">
              <ExternalDestinationIcon />
            </div>
          {/if}
        </div>
        <div
          class:line-clamp-1={small}
          class="line-clamp-2 hover:line-clamp-none"
        >
          {blurb || description || ''}
        </div>
        {#if struc === 'app' && !isInstalled}
          <button
            on:click={() =>
              window.open(
                `${window.location.origin}/apps/grid/search/${ship}/apps`
              )}
            class="bg-black rounded-md text-xs font-bold px-2 mr-2 dark:bg-white text-white dark:text-black hover:bg-grey dark:hover:bg-offwhite w-14 h-6"
            >Install
          </button>
        {/if}
        {#if struc === 'group' && !joinedDetails}
          <button
            on:click|stopPropagation={async (event) => {
              event.stopPropagation();
              event.target.innerHTML = 'Joining';
              await api.urbit.do.joinGroup(groupKey).then(refreshGroups);
            }}
            class="bg-black rounded-md text-xs font-bold px-2 mr-2 dark:bg-white text-white dark:text-black hover:bg-grey dark:hover:bg-offwhite w-14 h-6"
            >Join
          </button>
        {/if}
      </div>
      {#if editable || removable || struc === 'app' || struc === 'group'}
        <div class="col-span-1 col-start-7 flex flex-col gap-2 self-center">
          {#if editable}
            <button
              class="w-8 h-8 hover:text-blue-500 cursor-pointer"
              on:click|stopPropagation
              on:click={() => edit(keyStr)}
            >
              <EditIcon />
            </button>
          {/if}
          {#if removable}
            <button
              class="w-8 h-8 hover:bg-red-500 cursor-pointer"
              on:click|stopPropagation
              on:click={() => remove(keyStr)}
            >
              <TrashIcon />
            </button>
          {/if}
        </div>
      {/if}
    {/if}
  </button>
{:else}
  <div class="p-4 hover:bg-hover rounded-lg">Loading...</div>
{/if}
