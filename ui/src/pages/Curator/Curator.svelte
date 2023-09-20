<script lang="ts">
  import { push } from 'svelte-spa-router';
  import {
    state,
    getCurator,
    getCuratorFeed,
    refreshPals,
    keyStrToObj,
    getMoreFromThisShip,
  } from '@root/state';
  import { api, me } from '@root/api';
  import { getMeta } from '@root/util';
  import {
    CollectionsGrid,
    Feed,
    ItemDetail,
    ItemPreview,
    GroupPreview,
    CollectionsAdd,
    FeedPostForm,
    Sigil,
  } from '@components';
  import {
    Tabs,
    AddPalIcon,
    RemovePalIcon,
    EditIcon,
    ChatIcon,
    RightSidebar,
    SidebarGroup,
    IconButton,
  } from '@fragments';

  export let params;
  let { patp } = params;

  let feed = [];
  let curator, isMyPal;
  const loadCurator = async () => {
    curator = getCurator(patp);
    feed = getCuratorFeed(patp);
    isMyPal = !!$state.pals?.[patp.slice(1)];
    if (!feed && $state.isLoaded) {
      api.portal.do.subscribe({
        struc: 'feed',
        ship: patp,
        time: '~2000.1.1',
        cord: '',
      });
      api.portal.do.subscribe({
        struc: 'collection',
        ship: patp,
        time: '~2000.1.1',
        cord: '',
      });
    }
  };

  $: {
    ({ patp } = params);
    loadCurator();
  }

  let sortedRecommendations = [];
  state.subscribe((s) => {
    if (!s) return;
    loadCurator();
    sortedRecommendations = getMoreFromThisShip(patp).slice(0, 4);
  });

  const togglePal = () => {
    let ship = patp.slice(1);
    if (isMyPal) return api.pals.do.remove(ship).then(refreshPals);
    api.pals.do.add(ship).then(refreshPals);
  };

  let activeTab = 'Activity';
  let tabs = ['Activity', 'Collections'];
</script>

{#if curator}
  {@const { title, nickname, cover, image, description, color } =
    getMeta(curator)}
  <div class="grid grid-cols-12 gap-x-8 gap-y-8">
    <div class="col-span-12 w-full h-40">
      {#if cover}
        <img
          src={cover}
          alt="profile banner"
          class="absolute top-0 left-0 w-full h-72 object-cover"
        />
      {:else}
        <div
          class="absolute top-0 left-0 w-full h-72 bg-gradient-to-t from-coverDefaultGradientBottom to-coverDefaultGradientTop"
        />
      {/if}
      <div
        class="absolute top-0 left-0 w-full h-72 bg-gradient-to-t from-coverPhotoBottom to-coverPhotoTop"
      />
    </div>
    <div class="col-span-7 grid grid-cols-6 gap-4">
      <div class="col-span-1">
        <div class="overflow-hidden rounded-xl">
          <Sigil {patp} />
        </div>
      </div>
      <div class="col-span-5 flex flex-col gap-2">
        <div class="font-bold text-xl">{nickname ? nickname : patp}</div>
        {#if nickname}
          <div class="text-sm text-grey">{patp}</div>
        {/if}
        <div class="bg-panel rounded-xl w-auto p-2">
          {description || 'A Portal user'}
        </div>
      </div>
    </div>
    <div class="col-span-5 flex items-start justify-end gap-2">
      {#if me === patp}
        <div class="flex flex-col gap-4">
          <CollectionsAdd on:add={() => (activeTab = 'Collections')} />
          <IconButton
            icon={EditIcon}
            on:click={() => push(`/${patp}/edit`)}
            class="bg-panels hover:bg-panels-hover dark:fill-white dark:bg-transparent dark:border dark:hover:border-white dark:hover:bg-transparent"
            >Edit Profile</IconButton
          >
        </div>
      {:else if isMyPal}
        <IconButton
          icon={RemovePalIcon}
          on:click={togglePal}
          async
          class="bg-panels hover:bg-panels-hover dark:fill-white dark:bg-transparent dark:border dark:hover:border-white dark:hover:bg-transparent"
          >Remove Pal</IconButton
        >
      {:else}
        <IconButton
          icon={AddPalIcon}
          on:click={togglePal}
          async
          class="bg-panels hover:bg-panels-hover dark:fill-white dark:bg-transparent dark:border dark:hover:border-white dark:hover:bg-transparent"
          >Add Pal</IconButton
        >
      {/if}
      {#if me !== patp}
        <IconButton
          icon={ChatIcon}
          on:click={() =>
            window.open(`${window.location.origin}/apps/talk/dm/${patp}`)}
          class="bg-panels hover:bg-panels-hover dark:fill-white dark:bg-transparent dark:border dark:hover:border-white dark:hover:bg-transparent"
          >Message</IconButton
        >
      {/if}
    </div>
    <div class="col-span-12 grid grid-cols-12 gap-x-8">
      <div class="col-span-12">
        <Tabs {tabs} bind:activeTab />
      </div>
      <div class="col-span-8 pt-4">
        <div class="flex flex-col gap-8">
          {#if activeTab === 'Activity'}
            {#if me === patp}
              <FeedPostForm placeholder="Share a limerick, maybe..." />
            {/if}
            {#if !feed || feed.length === 0}
              <div class="col-span-12">
                {patp} hasn't made any posts on Portal yet.
              </div>
            {:else}
              <Feed feed={feed || []} />
            {/if}
          {:else if activeTab === 'Collections'}
            <CollectionsGrid {patp} />
          {/if}
        </div>
      </div>
      <div class="col-span-4 flex flex-col gap-8">
        {#if curator?.bespoke?.groups?.length > 0}
          <div class="grid gap-y-4">
            <div class="text-lg font-bold">Favourite Groups</div>
            {#each curator.bespoke.groups as key}
              <GroupPreview
                key={{
                  struc: 'group',
                  ship: key.split('/')[0],
                  cord: key.split('/')[1],
                  time: '',
                }}
              />
            {/each}
          </div>
        {/if}
      </div>
    </div>
    <RightSidebar>
      {#if sortedRecommendations.length > 0}
        <SidebarGroup>
          <div class="text-lg mx-1">More from {nickname || patp}</div>
          {#each sortedRecommendations as [recommendation]}
            <ItemPreview key={keyStrToObj(recommendation)} small />
          {/each}
        </SidebarGroup>
      {/if}
    </RightSidebar>
  </div>
{:else}
  Loading...
{/if}
