<script>
  import { state, isLoaded, getCurator, getCuratorFeed } from '@root/state';
  import { subscribeToContactProfile, me } from '@root/api';
  import { fromUrbitTime } from '@root/util';
  import {
    CollectionsGrid,
    FeedPost,
    SidebarGroup,
    SidebarPal,
    ItemDetail,
  } from '@components';
  import { Tabs } from '@fragments';

  export let params;
  const { patp } = params;

  let curator;
  let feed = [];

  // svelte is so nice episode #167
  let activeTab = 'home';
  let tabs = ['home', 'collections'];

  let cover, avatar, nickname, bio, color;
  state.subscribe(() => {
    curator = getCurator(patp);
    ({ cover, avatar, nickname, bio, color } = curator);
    feed = (getCuratorFeed(patp) || []).sort((a, b) => {
      return fromUrbitTime(b.meta.createdAt) - fromUrbitTime(a.meta.createdAt);
    });
  });

  $: if (isLoaded && !curator) subscribeToContactProfile(patp);
</script>

{#if isLoaded && curator}
  <div class="grid grid-cols-12 gap-4">
    <ItemDetail
      {cover}
      {avatar}
      title={nickname ? `${nickname} (${patp})` : patp}
      description={bio}
      {color}
      {patp}
      type="ship"
    >
      <div class="col-span-12 lg:col-span-9">
        <Tabs {tabs} bind:activeTab />
        <div class="pt-4">
          {#if activeTab === 'home'}
            <div class="grid gap-y-4">
              {#each feed as f}
                <FeedPost item={f} />
              {/each}
            </div>
          {:else if activeTab === 'collections'}
            <CollectionsGrid {patp} />
          {/if}
        </div>
      </div>
    </ItemDetail>
    <div class="hidden lg:flex lg:col-span-3 flex-col gap-8">
      {#if curator && curator.groups && curator.groups.length > 0}
        <div class="grid gap-y-4">
          <div class="text-xl">{patp} recommends</div>
          {#each curator.groups as key}
            <SidebarGroup {key} />
          {/each}
        </div>
      {/if}
      <div class="grid gap-y-4">
        <div class="text-xl">{patp}'s top 5</div>
        <SidebarPal />
        <SidebarPal />
        <SidebarPal />
        <SidebarPal />
        <SidebarPal />
      </div>
    </div>
  </div>
{:else}
  Loading...
{/if}
