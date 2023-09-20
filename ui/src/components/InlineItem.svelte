<script lang="ts">
  import { link } from 'svelte-spa-router';

  import { api } from '@root/api';
  import { state, getItem, keyStrToObj } from '@root/state';
  import { getMeta } from '@root/util';

  import { LoadingIcon, ItemImage } from '@fragments';

  export let keyStr;

  let item;
  let image;
  let title;
  let color;

  const loadItem = (_k) => {
    item = getItem(keyStr);
    if (!item) return api.portal.do.subscribe(keyStrToObj(keyStr));
    ({ image, title, color } = getMeta(item));
  };

  $: $state && loadItem(keyStr);
</script>

{#if item}
  <a
    use:link
    href={keyStr}
    class="inline-flex px-1 gap-1 items-center border rounded-md hover:border-black"
  >
    <span class="w-4 h-4 overflow-hidden rounded-sm">
      <ItemImage {image} {title} {color} />
    </span>
    <span class="text-sm">{title}</span>
  </a>
{:else}
  <div
    class="inline-flex px-1 gap-1 items-center border rounded-md hover:border-black"
  >
    <span class="w-7 h-7 p-1 overflow-hidden rounded-sm">
      <LoadingIcon />
    </span>
    <span class="text-sm">Loading...</span>
  </div>
{/if}
