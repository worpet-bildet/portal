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

  let item, isSubscribing;

  state.subscribe(() => {
    item = getItem(keyStrFromObj(key));
    if (!item && !isSubscribing) {
      isSubscribing = true;
      return subscribeToItem(key);
    }
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
    class="grid grid-cols-12 items-center gap-4 p-1 hover:bg-gray-500 cursor-pointer"
    class:bg-gray-500={selected}
  >
    <div
      class="border rounded-md overflow-hidden col-span-2 md:col-span-2 h-full"
    >
      {#if struc === 'ship' && !image}
        <Sigil patp={ship} {color} />
      {:else}
        <ItemImage {image} {title} {color} />
      {/if}
    </div>
    <div class="col-span-8 flex flex-col gap-2">
      <div class="flex items-center gap-2">
        <div class="text-xl font-bold">{title}</div>
        <div>·</div>
        <div>{struc}</div>
      </div>
      <div class="line-clamp-2">{blurb || description || ''}</div>
    </div>
    <div class="col-span-1 flex gap-2 justify-center items-center">
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
  </div>
{:else}
  <div>Loading...</div>
{/if}
