<script lang="ts">
  import { link } from 'svelte-spa-router';
  import { api, me } from '@root/api';
  import { state, getCuratorCollections, getItem } from '@root/state';
  import { getMeta } from '@root/util';
  import { RepostIcon } from '@fragments';
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

<div class="flex flex-col gap-4 items-start">
  {#if loading || subbingTo.size > 0}
    <div class="col-span-12">Loading...</div>
  {:else if collections.length === 0}
    <div class="col-span-12">
      {patp} hasn't created any collections on Portal yet.
    </div>
  {:else}
    {#each collections as collection, i (collection.keyStr)}
      {@const { title, blurb } = getMeta(collection)}
      <a
        use:link
        href={collection.keyStr}
        class="flex justify-between items-start w-full"
      >
        <div class="flex gap-4">
          <div class="w-24 h-24">
            <SquarePreview key={collection.keyObj} />
          </div>
          <div class="flex flex-col">
            <div class="font-bold">{title}</div>
            <div class="text-tertiary">{blurb}</div>
          </div>
        </div>
        <div class="bg-strucpill text-tertiary text-xs rounded-full px-2 py-1">
          COLLECTION
        </div>
      </a>
      {#if i < collections.length - 1}
        <div class="border-b w-full" />
      {/if}
    {/each}
  {/if}
  {#if me === patp && hasBlog && !hasBlogCollection && !subbingToBlogs}
    <button
      on:click={subToBlog}
      class="flex flex-col items-center justify-center gap-4 bg-purple text-white border dark:hover:border-white rounded-lg w-24 h-24"
    >
      <div class="w-5 h-5">
        <RepostIcon />
      </div>
      <div>Sync my %blogs</div>
    </button>
  {:else if subbingToBlogs && !hasBlogCollection}
    <div
      class="flex items-center justify-center bg-purple text-white border dark:hover:border-white rounded-lg w-24 h-24"
    >
      Syncing...
    </div>
  {/if}
</div>
