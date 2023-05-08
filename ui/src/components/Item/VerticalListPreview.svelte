<script>
  import { link } from 'svelte-spa-router';
  import { getMeta } from '@root/util';
  import { ItemImage } from '@fragments';
  export let item;
  export let clickable = true;
</script>

{#if item}
  {@const {
    keyObj: { struc },
    keyStr,
  } = item}
  {@const { title, description, image, color } = getMeta(item)}
  <a
    use:link
    href={`${keyStr}`}
    class:pointer-events-none={!clickable}
    class="grid grid-cols-12 items-center gap-4 p-1 hover:bg-gray-500 cursor-pointer"
  >
    <div
      class="border rounded-md overflow-hidden col-span-3 md:col-span-3 h-full"
    >
      <ItemImage {image} {title} {color} />
    </div>
    <div class="col-span-9 flex flex-col gap-2">
      <div class="flex items-center gap-2">
        <div class="text-xl font-bold">{title}</div>
        <div>·</div>
        <div>{struc}</div>
      </div>
      <div class="line-clamp-2">{description}</div>
    </div>
  </a>
{/if}
