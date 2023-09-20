<script lang="ts">
  import { link } from 'svelte-spa-router';
  import { api, me } from '@root/api';
  import { state, getCuratorCollections, getItem } from '@root/state';
  import { ArrowPathIcon } from '@fragments';
  import SquarePreview from './SquarePreview.svelte';

  export let patp;

  let loading = true;
  let collections, curatorCollections;
  let subbingTo = new Set();
  const loadCollections = (patp) => {
    curatorCollections = getCuratorCollections(patp) || [];
    curatorCollections.forEach((c) => {
      if ($state.isLoaded && !getItem(c) && c.time !== 'all') {
        subbingTo.add(c);
        api.portal.do.subscribe(c);
      }
    });
    collections = (getCuratorCollections(patp) || [])
      .map(getItem)
      .filter((c) => !!c)
      .filter((c) => !!c.keyStr)
      .filter((c) => c?.bespoke?.['key-list']?.length > 0)
      .filter((c) => c?.keyObj?.time !== 'all')
      .map((c) => {
        subbingTo.delete(c.keyStr);
        return c;
      });

    console.log({ subbingTo, curatorCollections, collections });

    if (collections.length > 0 || subbingTo.size === 0) {
      loading = false;
    }
  };

  let hasBlog, hasBlogCollection, subbingToBlogs;
  state.subscribe((s) => {
    loadCollections(patp);
    hasBlog = s?.blogs?.length > 0;

    if (
      hasBlog &&
      !collections.find((c) => c?.keyObj.time === 'published-blogs')
    ) {
      hasBlogCollection = false;
    } else {
      hasBlogCollection = true;
    }
  });

  const subToBlog = () => {
    subbingToBlogs = true;
    api.portal.do.subscribeToBlog();
  };

  $: $state && loadCollections(patp);
</script>

<div class="grid grid-cols-12 gap-4 items-start">
  {#if loading || subbingTo.size > 0}
    <div class="col-span-12">Loading...</div>
  {:else if collections.length === 0}
    <div class="col-span-12">
      {patp} hasn't created any collections on Portal yet.
    </div>
  {:else}
    {#each collections as collection (collection.keyStr)}
      <a use:link href={collection.keyStr} class="col-span-4 h-full">
        <SquarePreview key={collection.keyObj} />
      </a>
    {/each}
  {/if}
  {#if me === patp && hasBlog && !hasBlogCollection && !subbingToBlogs}
    <button
      on:click={subToBlog}
      class="flex flex-col items-center justify-center gap-4 col-span-4 h-full bg-purple text-white border dark:hover:border-white rounded-lg"
    >
      <div class="w-5 h-5">
        <ArrowPathIcon />
      </div>
      <div>Sync my %blogs</div>
    </button>
  {:else if subbingToBlogs && !hasBlogCollection}
    <div
      class="flex items-center justify-center col-span-4 h-full bg-purple text-white border dark:hover:border-white rounded-lg"
    >
      Syncing...
    </div>
  {/if}
</div>
