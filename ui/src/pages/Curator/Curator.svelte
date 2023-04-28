<script>
  import { link } from 'svelte-spa-router';
  import { state, getCurator, isLoaded, getItem } from '@root/state';
  import { subscribeToCurator, me } from '@root/api';
  import { getPayload, getCuratorFeed } from '@root/util';
  import { HorizontalItemList, CollectionsGrid, FeedItem } from '@components';
  import {
    SidebarPal,
    SidebarItem,
    ItemImage,
    AddPalIcon,
    Tabs,
  } from '@fragments';

  export let params;
  const { patp } = params;

  let curator;
  let lists = [];
  let feed = [];

  // svelte is so nice episode #167
  let activeTab = 'home';
  let tabs = ['home', 'collections'];

  $: console.log({ activeTab });

  state.subscribe((s) => {
    curator = getCurator(patp);
    lists = getPayload(curator) || [];
    feed = getCuratorFeed(curator, s) || [];
  });

  const addPal = () => {};

  $: if (isLoaded && !curator) subscribeToCurator(patp);
</script>

{#if curator}
  <div class="grid grid-cols-12 gap-4">
    <div class="col-span-12 w-full h-36 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1617200349808-3e60ffb441ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YW5ncnklMjBtb25rZXl8ZW58MHx8MHx8&auto=format&fit=crop&w=1400&q=60"
        class="object-cover h-36 w-full"
        alt="Profile banner"
      />
    </div>
    <div class="col-span-12 lg:col-span-9">
      <div class="relative">
        <div class="absolute -top-6">
          <img
            src="https://images.unsplash.com/photo-1617200349808-3e60ffb441ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YW5ncnklMjBtb25rZXl8ZW58MHx8MHx8&auto=format&fit=crop&w=1400&q=60"
            class="rounded-full w-20 h-20 object-cover border"
            alt="User avatar"
          />
        </div>
        <div class="flex flex-row w-full">
          <!-- spacer -->
          <div class="h-20 w-28" />
          <div class="flex w-full flex-col gap-2">
            <div class="flex items-center gap-4">
              <div class="text-2xl font-bold">{patp}</div>
              {#if patp === me}
                <a use:link href={`/${patp}/edit`}>edit</a>
              {:else}
                <button class="h-5 w-5 cursor-pointer" on:click={addPal}>
                  <AddPalIcon />
                </button>
              {/if}
            </div>
            <div class="flex gap-4 text-xs">
              <span>Martian for 2 months</span>
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
      <div class="grid gap-y-4 pt-8">
        <div class="text-xl">{patp} recommends</div>
        <SidebarItem />
        <SidebarItem />
        <SidebarItem />
        <SidebarItem />
        <SidebarItem />
      </div>
    </div>
  </div>
{:else}
  Loading...
{/if}
