<script>
  import { link } from 'svelte-spa-router';
  import { ItemImage } from '@fragments';
  import { formatStruc } from '@root/util';
  export let item;
  let {
    bespoke: { title, description, image },
    keyObj: { struc },
    keyStr,
  } = item;
  console.log({ keyStr });
</script>

<a
  use:link
  href={`${keyStr}`}
  class="grid grid-cols-12 items-center gap-4 p-1 hover:bg-gray-500 cursor-pointer"
>
  <div class="border rounded-md overflow-hidden col-span-3 md:col-span-2">
    <ItemImage {image} {title} />
  </div>
  <div class="col-span-9 flex flex-col gap-2">
    <div class="flex items-center gap-2">
      <div class="text-xl font-bold">{title}</div>
      <div>·</div>
      <div>{formatStruc(struc)}</div>
    </div>
    <div>{description}</div>
  </div>
</a>
