<script>
  import { link } from 'svelte-spa-router';
  import {
    state,
    getCuratorCollections,
    keyStrFromObj,
    getItem,
  } from '@root/state';
  import { me, poke, subscribeToItem } from '@root/api';
  import SquarePreview from './SquarePreview.svelte';
  import { ArrowPathIcon } from '@fragments';
  export let patp;
  export let loading;

  let collections, curatorCollections;
  let subscribingTo = {};
  const loadCollections = (patp) => {
    curatorCollections = getCuratorCollections(patp) || [];
    curatorCollections.forEach((c) => {
      if (
        $state.isLoaded &&
        !getItem(keyStrFromObj(c)) &&
        !subscribingTo[keyStrFromObj(c)] &&
        c.time !== 'all'
      ) {
        subscribingTo[keyStrFromObj(c)] = true;
        subscribeToItem(c);
      }
    });
    collections = (getCuratorCollections(patp) || [])
      .map((c) => getItem(keyStrFromObj(c)))
      .filter((c) => !!c)
      .map((c) => {
        delete subscribingTo[keyStrFromObj(c.keyObj)];
        return c;
      })
      .filter((c) => !!c.keyStr)
      .filter((c) => c?.bespoke?.['key-list']?.length > 0)
      .filter((c) => c?.keyObj?.time !== 'all');

    if (collections.length > 0) loading = false;
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
    poke({
      app: 'portal-manager',
      mark: 'portal-action',
      json: {
        'blog-sub': null,
      },
    });
  };

  $: loadCollections(patp);
</script>

<div class="grid grid-cols-12 gap-4 items-start">
  {#if loading || (curatorCollections.length > 0 && collections.length === 0)}
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
      class="flex flex-col items-center justify-center gap-4 col-span-4 h-full bg-purple text-white border shadow rounded-lg"
    >
      <div class="w-5 h-5">
        <ArrowPathIcon />
      </div>
      <div>Sync my %blogs</div>
    </button>
  {:else if subbingToBlogs && !hasBlogCollection}
    <div
      class="flex items-center justify-center col-span-4 h-full bg-purple text-white border shadow rounded-lg"
    >
      Syncing...
    </div>
  {/if}
</div>
