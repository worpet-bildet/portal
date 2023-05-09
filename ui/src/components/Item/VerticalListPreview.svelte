<script>
  import { createEventDispatcher } from 'svelte';
  import { push } from 'svelte-spa-router';
  import { getMeta } from '@root/util';
  import { ItemImage, TrashIcon } from '@fragments';
  export let item;
  export let clickable = true;
  export let removable = false;

  console.log(item);

  const dispatch = createEventDispatcher();
  const remove = () => dispatch('remove', item.keyStr);
  const navigate = () => push(item.keyStr);
</script>

{#if item}
  {@const {
    keyObj: { struc },
    keyStr,
  } = item}
  {@const { title, blurb, description, image, color } = getMeta(item)}
  <div
    on:click={() => (clickable ? navigate() : null)}
    class="grid grid-cols-12 items-center gap-4 p-1 hover:bg-gray-500 cursor-pointer"
  >
    <div
      class="border rounded-md overflow-hidden col-span-3 md:col-span-3 h-full"
    >
      <ItemImage {image} {title} {color} />
    </div>
    <div class="col-span-8 flex flex-col gap-2">
      <div class="flex items-center gap-2">
        <div class="text-xl font-bold">{title}</div>
        <div>·</div>
        <div>{struc}</div>
      </div>
      <div class="line-clamp-2">{blurb || description}</div>
    </div>
    {#if removable}
      <div class="col-span-1 flex justify-center items-center">
        <div
          class="w-8 h-8 hover:text-red-500 cursor-pointer"
          on:click|stopPropagation
          on:click={() => remove(keyStr)}
        >
          <TrashIcon />
        </div>
      </div>
    {/if}
  </div>
{/if}
