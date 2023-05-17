<script>
  import { link } from 'svelte-spa-router';
  import { fade } from 'svelte/transition';
  import { format } from 'timeago.js';
  import { subscribeToItem, getContact } from '@root/api';
  import { state, getItem, keyStrFromObj } from '@root/state';
  import { getMeta } from '@root/util';
  import { ItemVerticalListPreview, Sigil } from '@components';

  export let key;

  // try to get the item, and if we don't have it, subscribe to it
  let item, color;
  state.subscribe((s) => {
    item = getItem(keyStrFromObj(key));
    if (s.isLoaded && !item) {
      return subscribeToItem(key);
    }
    // in theory this should be cheaper but the state is abit fkd rn
    getContact(getMeta(item).ship)
      .then((profile) => ({ color } = profile))
      .catch((e) => {
        /*ignore*/
      });
  });
</script>

<!-- <Sigil config={{ point: ship }} /> -->
{#if item}
  {@const { blurb, ship, createdAt, ref } = getMeta(item)}
  <div class="grid grid-cols-12 rounded-lg shadow p-5 border gap-2" in:fade>
    <div class="col-span-1 w-10 h-10 rounded-md overflow-hidden">
      <a href={`/${ship}`} use:link>
        <Sigil patp={ship} {color} />
      </a>
    </div>
    <div class="col-span-11 flex flex-col gap-2">
      <div class="flex gap-2 text-sm">
        <a href={`/${ship}`} use:link>{ship}</a>
        <span>·</span>
        <span>{format(createdAt)}</span>
      </div>
      <p>
        {blurb}
      </p>
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
