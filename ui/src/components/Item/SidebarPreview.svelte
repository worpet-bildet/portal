<script lang="ts">
  import { Item, ItemKey } from '$types/portal/item';

  import { push } from 'svelte-spa-router';
  import { state, getItem } from '@root/state';
  import { api } from '@root/api';
  import { getMeta } from '@root/util';
  import { ItemImage } from '@fragments';

  export let key: ItemKey;
  export let action: () => void;
  export let actionText: string[] = ['', ''];
  export let isActionEnabled: (item: Item) => boolean = () => true;

  let item: Item;
  let performingAction: boolean = false;

  const loadItem = (key: ItemKey) => {
    item = getItem(key);
    if (!item) return api.portal.do.subscribe(key);
  };

  $: $state && loadItem(key);
</script>

{#if item}
  {@const { title, blurb, description, image, color, ship } = getMeta(item)}
  <button
    on:click
    on:click={() => push(item.keyStr)}
    class="grid grid-cols-6 w-full items-start gap-2 hover:duration-500 rounded-lg text-sm text-left"
  >
    <div class="col-span-1 overflow-hidden rounded-md self-center">
      <ItemImage {image} {title} {color} />
    </div>
    <div
      class="col-span-5 flex items-center justify-between gap-2 overflow-hidden self-center"
    >
      <div class="flex flex-col items-start">
        <div class="font-bold line-clamp-1">
          {title}
        </div>
        <div class="line-clamp-2">
          {blurb || description || ''}
        </div>
      </div>
      {#if isActionEnabled(item)}
        <button
          on:click|stopPropagation={() => (performingAction = true)}
          on:click|stopPropagation={action}
          class="bg-black rounded-md text-xs font-bold px-2 py-1 text-white"
          >{#if performingAction}{actionText[1]}{:else}{actionText[0]}{/if}
        </button>
      {/if}
    </div>
  </button>
{:else}
  <div class="p-4 hover:bg-hover rounded-lg">Contacting {key.ship}...</div>
{/if}
