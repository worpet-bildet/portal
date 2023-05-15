<script>
  import { createEventDispatcher } from 'svelte';
  import { push } from 'svelte-spa-router';
  import { state, keyStrFromObj, getItem } from '@root/state';
  import { subscribeToItem } from '@root/api';
  import { getMeta } from '@root/util';
  import { ItemImage, Sigil, TrashIcon, EditIcon } from '@fragments';
  export let key;
  export let clickable = true;
  export let removable = false;
  export let editable = false;
  export let selectable = false;
  export let selected = false;
  export let small = false;

  let item, isSubscribing;

  state.subscribe((s) => {
    item = getItem(keyStrFromObj(key));
    if (s.isLoaded && !item && !isSubscribing) {
      isSubscribing = true;
      return subscribeToItem(key);
    }
    console.log({ item, key });
  });

  const dispatch = createEventDispatcher();
  const remove = () => dispatch('remove', item.keyStr);
  const edit = () => dispatch('edit', item.keyStr);
  const navigate = () => {
    if (item.keyObj.struc === 'ship') {
      push(`/${item.keyObj.ship}`);
    } else {
      push(item.keyStr);
    }
  };
</script>

{#if item}
  {@const {
    keyObj: { struc, ship },
    keyStr,
  } = item}
  {@const { title, blurb, description, image, color } = getMeta(item)}
  <div
    on:click={() => {
      if (clickable) {
        navigate();
      } else if (selectable) {
        selected = !selected;
        dispatch('selected', { key, selected });
      }
    }}
    class="grid grid-cols-12 w-full items-center gap-4 p-1 hover:bg-black hover:text-white cursor-pointer rounded-lg text-xs"
    class:bg-black={selected}
    class:text-white={selected}
  >
    <div
      class="border rounded-md overflow-hidden h-full"
      class:col-span-2={!small}
      class:col-span-4={small}
    >
      {#if struc === 'ship' && !image}
        <Sigil patp={ship} {color} />
      {:else}
        <ItemImage {image} {title} {color} />
      {/if}
    </div>
    <div class="col-span-8 flex flex-col gap-2">
      <div class="flex items-center gap-2 overflow-hidden">
        <div class="font-bold" class:text-sm={small} class:text-xl={!small}>
          {title}
        </div>
        <div>·</div>
        <div>{struc}</div>
      </div>
      <div class="line-clamp-2">{blurb || description || ''}</div>
    </div>
    {#if editable || removable}
      <div
        class="col-span-1 col-start-12 flex gap-2 justify-center items-center"
      >
        {#if editable}
          <div
            class="w-8 h-8 hover:text-blue-500 cursor-pointer"
            on:click|stopPropagation
            on:click={() => edit(keyStr)}
          >
            <EditIcon />
          </div>
        {/if}
        {#if removable}
          <div
            class="w-8 h-8 hover:text-red-500 cursor-pointer"
            on:click|stopPropagation
            on:click={() => remove(keyStr)}
          >
            <TrashIcon />
          </div>
        {/if}
      </div>
    {/if}
  </div>
{:else}
  <div>Loading...</div>
{/if}
