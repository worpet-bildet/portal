<script>
  import { createEventDispatcher } from 'svelte';
  import { push } from 'svelte-spa-router';
  import { state, keyStrFromObj, getItem } from '@root/state';
  import { api } from '@root/api';
  import { getMeta } from '@root/util';
  import { CollectionsSquarePreview, Sigil } from '@components';
  import {
    ItemImage,
    TrashIcon,
    EditIcon,
    ExternalDestinationIcon,
    InlineChat,
  } from '@fragments';

  export let key;
  export let clickable = true;
  export let removable = false;
  export let editable = false;
  export let selectable = false;
  export let selected = false;
  export let small = false;

  let item;

  $: loadItem(key);

  /**
   * TODO: This whole file needs a refactor. We need to ensure that there is not
   * this huge jumbled if statement in the middle of the template. We should
   * instead have a component for each type of item.
   */

  const loadItem = (key) => {
    item = getItem(keyStrFromObj(key));
    if ($state.isLoaded && !item) {
      return api.portal.do.subscribe(key);
    }
    if (item.keyObj.struc === 'groups-chat-msg') clickable = false;
    if (item.keyObj.struc === 'groups-chat-msg') console.log({ item });
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
    class="grid grid-cols-6 w-full items-start gap-4 p-1 border border-transparent dark:hover:bg-transparent hover:duration-500 rounded-lg text-sm text-left"
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
      <div
        class="col-span-6 p-2 border rounded-lg grid grid-cols-12 gap-2 break-words"
      >
        <div class="col-span-1">
          <div class="rounded-md overflow-hidden">
            <Sigil patp={`${author}`} />
          </div>
        </div>
        <div class="col-span-11 flex flex-col">
          <div class="flex gap-1 text-grey">
            <a class="text-sm hover:underline" href={`#/${author}`}>{author}</a
            ><span>in</span><a
              href={`#/group/${group}/`}
              class="hover:underline">{group}</a
            >
          </div>
          <div class="text-base">
            {#if content?.story?.inline}
              {#each content.story.inline as chat}
                <InlineChat {chat} />
              {/each}
            {/if}
          </div>
        </div>
      </div>
    {:else}
      <div
        class="border overflow-hidden rounded-md"
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
        class="flex flex-col items-start gap-2 overflow-hidden"
        class:col-span-5={!small}
        class:col-span-4={small}
      >
        <div class="flex items-center gap-2">
          <div
            class="font-bold line-clamp-1"
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
      </div>
      {#if editable || removable}
        <div
          class="col-span-1 col-start-12 flex gap-2 justify-center items-center"
        >
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
