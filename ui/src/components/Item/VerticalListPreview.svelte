<script>
  import { createEventDispatcher } from 'svelte';
  import { push } from 'svelte-spa-router';
  import { state, keyStrFromObj, getItem } from '@root/state';
  import { subscribeToItem, getLinkMetadata } from '@root/api';
  import { getMeta } from '@root/util';
  import { CollectionsSquarePreview, Sigil } from '@components';
  import {
    ItemImage,
    TrashIcon,
    EditIcon,
    ExternalDestinationIcon,
    LinkPreview,
  } from '@fragments';

  export let key;
  export let clickable = true;
  export let removable = false;
  export let editable = false;
  export let selectable = false;
  export let selected = false;
  export let small = false;

  let item, isSubscribing;

  $: loadItem(key);

  const loadItem = (key) => {
    item = getItem(keyStrFromObj(key));
    if ($state.isLoaded && !item && !isSubscribing) {
      isSubscribing = true;
      return subscribeToItem(key);
    }
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
  {@const { title, blurb, description, image, color, link } = getMeta(item)}
  <button
    on:click={() => {
      if (clickable) {
        if (struc === 'ship') {
          push(`/${ship}`);
        } else if ((struc === 'other' || struc === 'blog') && link) {
          window.open(link);
        } else {
          push(item.keyStr);
        }
      } else if (selectable) {
        selected = !selected;
        dispatch('selected', { key, selected });
      }
    }}
    class="grid grid-cols-6 w-full items-center gap-4 p-1 hover:bg-hover dark:border dark:hover:border-white hover:duration-500 cursor-pointer rounded-lg text-sm text-left"
    class:bg-mdark={selected}
  >
    <div
      class="border overflow-hidden rounded-md"
      class:col-span-1={!small}
      class:col-span-2={small}
    >
      {#if struc === 'ship' && !image}
        <Sigil patp={ship} />
      {:else if struc === 'collection' && !image}
        <CollectionsSquarePreview {key} withTitle={false} />
      {:else if !image && link && struc !== 'app'}
        {#await getLinkMetadata(link)}
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
          {title}
        </div>
        <div>·</div>
        <div>{struc}</div>
        {#if (struc === 'other' && link) || struc === 'blog'}
          <div class="w-5">
            <ExternalDestinationIcon />
          </div>
        {/if}
      </div>
      <div class="line-clamp-2" class:line-clamp-1={small}>
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
  </button>
{:else}
  <div class="p-4 hover:bg-hover rounded-lg">Loading...</div>
{/if}
