<script>
  import { push } from 'svelte-spa-router';
  import { state, getCurator, getCuratorFeed, refreshPals } from '@root/state';
  import {
    subscribeToCurator,
    subscribeToContactProfile,
    addPal,
    getContact,
    removePal,
    me,
  } from '@root/api';
  import { getMeta } from '@root/util';
  import {
    CollectionsGrid,
    Feed,
    ItemDetail,
    ItemVerticalListPreview,
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

  $: {
    ({ patp } = params);
    gettingProfile = false;
    subscribingToCurator = false;
    subscribingToCuratorFeed = false;
    loadCurator($state);
  }

  let curator, featuredCollection;
  let feed = [];

  // svelte is so nice episode #167
  let activeTab = 'Activity';
  let tabs = ['Activity', 'Collections'];

  const subscribeTo = (patp) => {
    subscribeToCurator(patp);
    subscribeToContactProfile(patp);
  };

  let title,
    cover,
    image,
    description,
    color,
    isMyPal,
    pals,
    profile,
    noProfile,
    gettingProfile;
  let subscribingToCuratorFeed;
  const loadCurator = async (s) => {
    profile = {};
    try {
      if (!noProfile && !gettingProfile) {
        gettingProfile = true;
        profile = await getContact(patp);
      }
    } catch (e) {
      noProfile = true;
    }
    curator = {
      ...getCurator(patp),
      bespoke: profile,
      keyObj: { struc: 'ship', ship: patp },
    };
    ({ title, cover, image, description, color } = getMeta(curator));
    // featuredCollection = getCuratorFeaturedCollection(patp);
    feed = getCuratorFeed(patp);
    isMyPal = !!s.pals?.[patp.slice(1)];
    if (!feed && s.isLoaded && !subscribingToCuratorFeed) {
      subscribingToCuratorFeed = true;
      return subscribeTo(patp);
    }
  };

  state.subscribe((s) => {
    if (!s) return;
    loadCurator(s);
  });

  // TODO
  // Don't really like this being here but not really sure how to factor this
  // out - might make sense to go back to using a modal for the items
  export const togglePal = () => {
    let ship = patp.slice(1);
    if (isMyPal) return removePal(ship).then(refreshPals);
    addPal(ship).then(refreshPals);
  };

  let subscribingToCurator = false;
  $: if (
    $state.isLoaded &&
    !subscribingToCurator &&
    (!curator || Object.values(curator).length === 0)
  ) {
    subscribingToCurator = true;
    subscribeTo(patp);
  }
</script>

{#if curator}
  <div class="grid grid-cols-12 gap-x-8">
    <ItemDetail
      {cover}
      avatar={image}
      title={title || patp}
      {description}
      {color}
      {patp}
      type="ship"
    >
      <div class="col-span-12 lg:col-span-9">
        <Tabs {tabs} bind:activeTab />
        <div class="pt-4 flex flex-col gap-4">
          {#if activeTab === 'Activity'}
            {#if me === patp}
              <FeedPostForm />
            {/if}
            {#if !feed || feed.length === 0}
              <div class="col-span-12">
                {patp} hasn't made any posts on Portal yet.
              </div>
            {:else}
              <div class="grid gap-y-4">
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
            <IconButton icon={EditIcon} on:click={() => push(`/${patp}/edit`)}
              >Edit Profile</IconButton
            >
            <CollectionsAdd on:add={() => (activeTab = 'Collections')} />
          </div>
        {:else if isMyPal}
          <IconButton icon={RemovePalIcon} on:click={togglePal} async
            >Remove Pal</IconButton
          >
        {:else}
          <IconButton icon={AddPalIcon} on:click={togglePal} async
            >Add Pal</IconButton
          >
        {/if}
        {#if me !== patp}
          <IconButton
            icon={ChatIcon}
            on:click={() =>
              window.open(`${window.location.origin}/apps/talk/dm/${patp}`)}
            >Message</IconButton
          >
        {/if}
      </SidebarGroup>
      {#if curator?.bespoke?.groups?.length > 0}
        <SidebarGroup>
          <div class="grid gap-y-4">
            <div>{patp} recommends</div>
            {#each curator.bespoke.groups as key}
              <div class="border shadow rounded-lg">
                <ItemVerticalListPreview
                  small
                  key={{
                    struc: 'group',
                    ship: key.split('/')[0],
                    cord: key.split('/')[1],
                    time: '',
                  }}
                />
              </div>
            {/each}
          </div>
        </SidebarGroup>
      {/if}
    </RightSidebar>
  </div>
{:else}
  Loading...
{/if}
