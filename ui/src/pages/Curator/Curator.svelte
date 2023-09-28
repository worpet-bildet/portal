<script lang="ts">
  import { link, push } from 'svelte-spa-router';
  import {
    state,
    getCurator,
    getCuratorFeed,
    refreshPals,
    keyStrToObj,
    groupKeyToItemKey,
  } from '@root/state';
  import { api, me } from '@root/api';
  import { getMeta } from '@root/util';
  import {
    CollectionsList,
    Feed,
    ItemDetail,
    ItemPreview,
    GroupPreview,
    CollectionsAdd,
    FeedPostForm,
    Sigil,
    MoreFrom,
    ProfileCard,
  } from '@components';
  import {
    Tabs,
    ProfileIcon,
    GroupsIcon,
    PostIcon,
    CommentIcon,
    RightSidebar,
    SidebarGroup,
    IconButton,
    SendIcon,
    FeedIcon,
    CollectionIcon,
  } from '@fragments';
  import gradient from '@assets/gradient.svg';

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

  state.subscribe((s) => {
    if (!s) return;
    loadCurator();
  });

  let activeTab = 'Activity';
  let tabs = [
    { tab: 'Activity', icon: FeedIcon },
    { tab: 'Collections', icon: CollectionIcon },
  ];
</script>

{#if curator}
  {@const { title, nickname, cover, image, description, color } =
    getMeta(curator)}
  <div class="grid grid-cols-12 gap-8">
    <div class="col-span-12 w-full sm:h-48">
      {#if cover}
        <img
          src={cover}
          alt="profile banner"
          class="relative sm:absolute sm:top-0 left-0 w-full h-48 sm:h-72 object-cover"
        />
      {:else}
        <!-- <div
          class="absolute top-0 left-0 w-full h-72 bg-gradient-to-t from-coverDefaultGradientBottom to-coverDefaultGradientTop"
        /> -->
        <img
          src={gradient}
          alt="default profile banner"
          class="relative sm:absolute sm:top-0 left-0 w-full h-48 sm:h-72 object-cover"
        />
      {/if}
      <div
        class="hidden sm:absolute sm:top-0 left-0 w-full h-48 sm:h-72 bg-gradient-to-t from-coverPhotoBottom to-coverPhotoTop"
      />
    </div>

    <ProfileCard {patp} />

    <div class="col-span-12 sm:col-span-7 gap-x-8">
      <Tabs {tabs} bind:activeTab />
      <div class="pt-4">
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
            <CollectionsList {patp} />
          {/if}
        </div>
      </div>
    </div>

    <!-- <div class="col-span-5 flex items-start justify-end gap-2">
      {#if me === patp}
        <div class="flex flex-col gap-4">
          <CollectionsAdd on:add={() => (activeTab = 'Collections')} />
        </div>
      {:else if isMyPal}
        <button
          on:click={togglePal}
          class="bg-panels hover:bg-panels-hover dark:fill-white dark:bg-transparent dark:border dark:hover:border-white dark:hover:bg-transparent"
          >Remove Pal</button
        >
      {:else}
        <IconButton
          icon={ProfileIcon}
          on:click={togglePal}
          async
          class="bg-panels hover:bg-panels-hover dark:fill-white dark:bg-transparent dark:border dark:hover:border-white dark:hover:bg-transparent"
          >Add Pal</IconButton
        >
      {/if}
      {#if me !== patp}
        <IconButton
          icon={CommentIcon}
          on:click={() =>
            window.open(`${window.location.origin}/apps/talk/dm/${patp}`)}
          class="bg-panels hover:bg-panels-hover dark:fill-white dark:bg-transparent dark:border dark:hover:border-white dark:hover:bg-transparent"
          >Message</IconButton
        >
      {/if}
    </div> -->
  </div>
{:else}
  Loading...
{/if}
