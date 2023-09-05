<script>
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
    CollectionsAdd,
    FeedPostForm,
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
  <div class="grid grid-cols-12 gap-x-8">
    <ItemDetail
      {cover}
      avatar={image}
      title={title || patp}
      {description}
      {color}
      {patp}
      key={curator.keyObj}
      type="ship"
    >
      <div class="col-span-12 lg:col-span-9">
        <Tabs {tabs} bind:activeTab />
        <div class="pt-4 flex flex-col">
          {#if activeTab === 'Activity'}
            {#if me === patp}
              <FeedPostForm placeholder="Share a limerick, maybe..." class="rounded-tl-lg rounded-tr-lg border-t"/>
            {/if}
            {#if !feed || feed.length === 0}
              <div class="col-span-12">
                {patp} hasn't made any posts on Portal yet.
              </div>
            {:else}
              <div class="grid border-t rounded-lg">
                <Feed feed={feed || []} />
              </div>
            {/if}
          {:else if activeTab === 'Collections'}
            <CollectionsGrid {patp} />
          {/if}
        </div>
      </div>
    </ItemDetail>
    <RightSidebar>
      <SidebarGroup>
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
      </SidebarGroup>
      {#if curator?.bespoke?.groups?.length > 0}
        <SidebarGroup>
          <div class="grid gap-y-4">
            <div class="text-lg mx-1">{nickname || patp} recommends</div>
            {#each curator.bespoke.groups as key}
              <ItemPreview
                small
                key={{
                  struc: 'group',
                  ship: key.split('/')[0],
                  cord: key.split('/')[1],
                  time: '',
                }}
              />
            {/each}
          </div>
        </SidebarGroup>
      {/if}
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
