<script>
  import { link } from 'svelte-spa-router';
  import { fade } from 'svelte/transition';
  import { format } from 'timeago.js';
  import { subscribeToItem } from '@root/api';
  import { state, getItem, keyStrFromObj, getCurator } from '@root/state';
  import { getMeta } from '@root/util';
  import { ItemVerticalListPreview, Sigil } from '@components';

  export let key;

  // try to get the item, and if we don't have it, subscribe to it
  let item;
  state.subscribe((s) => {
    item = getItem(keyStrFromObj(key));
    if (s.isLoaded && !item) {
      return subscribeToItem(key);
    }
  });
</script>

<!-- <Sigil config={{ point: ship }} /> -->
{#if item}
  {@const { blurb, ship, createdAt, ref } = getMeta(item)}
  {@const {
    bespoke: { nickname },
  } = getCurator(ship)}
  <div
    class="grid grid-cols-12 rounded-lg shadow p-5 border gap-2 lg:gap-4"
    in:fade
  >
    <div class="col-span-1">
      <div class="rounded-md overflow-hidden">
        <a href={`/${ship}`} use:link>
          <Sigil patp={ship} />
        </a>
      </div>
    </div>
    <div class="col-span-11 flex flex-col gap-2">
      <div class="flex gap-2 text-sm">
        <a href={`/${ship}`} use:link>{nickname || ship}</a>
        <span>·</span>
        <span>{format(createdAt)}</span>
      </div>
      <div class="whitespace-pre-wrap line-clamp-50">
        {blurb}
      </div>
      {#if ref}
        <div class="rounded-lg">
          <ItemVerticalListPreview key={ref} />
        </div>
      {/if}
    </div>
  </div>
{:else}
  <div class="rounded-lg shadow p-5" in:fade>Loading...</div>
{/if}
