<script>
  import { link } from 'svelte-spa-router';
  import { state, getCurator, getCuratorFeed, refreshPals } from '@root/state';
  import {
    subscribeToCurator,
    subscribeToContactProfile,
    addPal,
    removePal,
    me,
  } from '@root/api';
  import { fromUrbitTime } from '@root/util';
  import {
    CollectionsGrid,
    FeedPost,
    SidebarGroup,
    SidebarPal,
    ItemDetail,
    CollectionsAdd,
  } from '@components';
  import {
    Tabs,
    AddPalIcon,
    RemovePalIcon,
    EditIcon,
    AsyncButton,
    RightSidebar,
  } from '@fragments';

  export let params;
  const { patp } = params;

  let curator;
  let feed = [];

  // svelte is so nice episode #167
  let activeTab = 'home';
  let tabs = ['home', 'collections'];

  let cover, avatar, nickname, bio, color, isLoaded, isMyPal;
  state.subscribe((s) => {
    curator = getCurator(patp);
    isLoaded = s.isLoaded;
    ({ cover, avatar, nickname, bio, color } = curator);
    feed = (getCuratorFeed(patp) || []).sort((a, b) => {
      return fromUrbitTime(b.meta.createdAt) - fromUrbitTime(a.meta.createdAt);
    });
    isMyPal = !!s.pals?.[patp.slice(1)];
  });

  $: console.log({ isMyPal });

  // TODO
  // Don't really like this being here but not really sure how to factor this
  // out - might make sense to go back to using a modal for the items
  export const togglePal = () => {
    let ship = patp.slice(1);
    if (isMyPal) return removePal(ship).then(refreshPals);
    addPal(ship).then(refreshPals);
  };

  let subbing = false;
  $: if (
    !subbing &&
    isLoaded &&
    (!curator || Object.values(curator).length === 0)
  ) {
    // TODO: this doesn't really work - it should be smarter than this about
    // when it subscribes to the user
    subbing = true;
    // TODO we should be checking the conditions here individually
    subscribeToCurator(patp);
    subscribeToContactProfile(patp);
  }
</script>

{#if isLoaded && curator}
  <div class="grid grid-cols-12 gap-8">
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
    <RightSidebar>
      {#if me === patp}
        <div class="flex flex-col gap-4">
          <a use:link href={`/${patp}/edit`} class="border px-2 py-1">
            <div class="w-full flex gap-4 items-center">
              <span class="w-5">
                <EditIcon />
              </span>
              <span>Edit Profile</span>
            </div>
          </a>
          <CollectionsAdd />
        </div>
      {:else if isMyPal}
        <AsyncButton on:click={togglePal}>
          <div class="w-full flex gap-4 items-center">
            <span class="w-5">
              <RemovePalIcon />
            </span>
            <span>Remove Pal</span>
          </div>
        </AsyncButton>
      {:else}
        <AsyncButton on:click={togglePal}>
          <div class="w-full flex gap-4 items-center">
            <span class="w-5"> <AddPalIcon /></span>
            <span>Add Pal</span>
          </div>
        </AsyncButton>
      {/if}
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
    </RightSidebar>
  </div>
{:else}
  Loading...
{/if}
