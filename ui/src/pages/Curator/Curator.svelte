<script>
  import { link } from 'svelte-spa-router';
  import { sigil, stringRenderer } from '@tlon/sigil-js';
  import { state, isLoaded, getCurator, getCuratorFeed } from '@root/state';
  import { subscribeToCurator, me } from '@root/api';
  import { getPayload } from '@root/util';
  import {
    HorizontalItemList,
    CollectionsGrid,
    FeedItem,
    SidebarGroup,
    SidebarPal,
  } from '@components';
  import { ItemImage, AddPalIcon, Tabs, Sigil } from '@fragments';

  export let params;
  const { patp } = params;

  let curator;
  let feed = [];

  // svelte is so nice episode #167
  let activeTab = 'collections';
  let tabs = ['home', 'collections'];

  state.subscribe((s) => {
    curator = getCurator(patp);
    feed = getCuratorFeed(patp) || [];
  });

  $: console.log({ feed, curator });

  const DEFAULT_PROFILE_IMAGE =
    'https://images.unsplash.com/photo-1617200349808-3e60ffb441ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YW5ncnklMjBtb25rZXl8ZW58MHx8MHx8&auto=format&fit=crop&w=1400&q=60';

  const DEFAULT_COVER_IMAGE =
    'https://images.unsplash.com/photo-1579380231498-e45d45213373?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80';

  const addPal = () => {};

  $: if (isLoaded && !curator) subscribeToCurator(patp);
</script>

{#if isLoaded && curator}
  <div class="grid grid-cols-12 gap-4">
    <div class="col-span-12 w-full h-36 overflow-hidden">
      <img
        src={curator.cover || DEFAULT_COVER_IMAGE}
        class="object-cover h-36 w-full"
        alt="Profile banner"
      />
    </div>
    <div class="col-span-12 lg:col-span-9">
      <div>
        <div class="relative">
          <div class="absolute -top-6">
            {#if curator.avatar}
              <img
                src={curator.avatar}
                class="rounded-full w-20 h-20 object-cover border"
                alt="User avatar"
              />
            {:else}
              <div class="border w-20 h-20 rounded-md overflow-hidden">
                <Sigil {patp} color={curator.color} />
              </div>
            {/if}
          </div>
        </div>
        <div class="flex flex-row w-full">
          <!-- spacer -->
          <div class="h-20 w-28" />
          <div class="flex w-full flex-col gap-2">
            <div class="flex items-center gap-4">
              <div class="text-2xl font-bold">
                {patp}{#if curator.nickname}&nbsp;({curator.nickname}){/if}
              </div>
              {#if patp === me}
                <a use:link href={`/${patp}/edit`}>edit</a>
              {:else}
                <button class="h-5 w-5 cursor-pointer" on:click={addPal}>
                  <AddPalIcon />
                </button>
              {/if}
            </div>
            <div class="flex gap-4 text-xs">
              <span>{curator.bio}</span>
              <a href="https://twitter.com/tomnashflex">@tomnashflex</a>
            </div>
          </div>
        </div>
        <Tabs {tabs} bind:activeTab />
        <div class="pt-4">
          {#if activeTab === 'home'}
            <div class="grid gap-y-4">
              {#each feed as f}
                <FeedItem item={f} />
              {/each}
            </div>
          {:else if activeTab === 'collections'}
            <CollectionsGrid {patp} />
          {/if}
        </div>
      </div>
    </div>
    <div class="hidden lg:block lg:col-span-3">
      <div class="grid gap-y-4">
        <div class="text-xl">{patp}'s top 5</div>
        <SidebarPal />
        <SidebarPal />
        <SidebarPal />
        <SidebarPal />
        <SidebarPal />
      </div>
      {#if curator && curator.groups && curator.groups.length > 0}
        <div class="grid gap-y-4 pt-8">
          <div class="text-xl">{patp} recommends</div>
          {#each curator.groups as key}
            <SidebarGroup {key} />
          {/each}
        </div>
      {/if}
    </div>
  </div>
{:else}
  Loading...
{/if}
