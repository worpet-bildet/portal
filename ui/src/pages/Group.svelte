<script lang="ts">
  import {
    state,
    getGroup,
    getJoinedGroupDetails,
    refreshGroups,
    keyStrToObj,
    getMoreFromThisShip,
  } from '@root/state';
  import { api } from '@root/api';
  import { getMeta } from '@root/util';
  import { ItemDetail, RecommendModal, ItemPreview } from '@components';
  import {
    ChatIcon,
    DiaryIcon,
    HeapIcon,
    PersonIcon,
    ShareIcon,
    RightSidebar,
    SidebarGroup,
    PlusIcon,
    CancelIcon,
    IconButton,
  } from '@fragments';

  export let params;

  const loadGroup = () => {
    if (!groupKey) return;
    group = getGroup(groupKey);
    if ($state.isLoaded && !group) {
      return api.portal.do.subscribe(keyStrToObj(`/group/${groupKey}/`));
    }
    joinedDetails = getJoinedGroupDetails(groupKey);
  };

  let host, cord, groupKey;
  $: {
    ({ host, cord } = params);
    groupKey = `${host}/${cord}`;
    loadGroup();
  }

  let group, joinedDetails;
  let sortedRecommendations = [];
  state.subscribe((s) => {
    if (!s.isLoaded) return;
    loadGroup();
    sortedRecommendations = getMoreFromThisShip(host, cord).slice(0, 4);
  });

  const join = () => api.urbit.do.joinGroup(groupKey).then(refreshGroups);
  const leave = () => api.urbit.do.leaveGroup(groupKey).then(refreshGroups);

  const channelLink = (channelKey) => {
    return `${window.location.origin}/apps/groups/groups/${groupKey}/channels/${channelKey}`;
  };

  let recommendModalOpen;
</script>

{#if group}
  {@const { cover, image, description, title } = getMeta(group)}
  <div class="grid grid-cols-12 gap-x-8 mb-4">
    <ItemDetail
      {cover}
      avatar={image}
      {title}
      {description}
      patp={host}
      key={group.keyObj}
      type="group"
      isInstalledOrJoined={joinedDetails}
    >
      <div
        class="col-span-12 md:col-span-9 bg-panels dark:bg-darkgrey border p-6 rounded-lg"
      >
        {#if !joinedDetails}
          <div>Join the group to see more information</div>
        {:else if !joinedDetails.joining}
          <div class="grid gap-4">
            <div class="text-2xl font-bold border-b pb-2">
              Channels in {title}
            </div>
            <div class="grid gap-8">
              {#each joinedDetails['zone-ord'] as zoneKey}
                {@const {
                  idx,
                  meta: { title },
                } = joinedDetails.zones[zoneKey]}
                <div class="grid gap-2">
                  {#if idx.length > 0}
                    {#if Object.keys(joinedDetails.zones).length > 1}
                      <div class="text-xl font-bold">{title}</div>
                    {/if}
                    {#each idx as channelKey}
                      {@const type = channelKey.split('/')[0]}
                      {@const {
                        meta: { title, description },
                      } = joinedDetails.channels[channelKey]}
                      <div
                        class="rounded-lg p-2 hover:bg-panels-hover dark:border dark:border-transparent dark:hover:border-white hover:duration-500"
                      >
                        <a
                          href={channelLink(channelKey)}
                          target="_blank"
                          class="grid grid-cols-12 gap-4 items-center"
                        >
                          <div class="col-span-1 dark:fill-white">
                            {#if type === 'chat'}
                              <ChatIcon />
                            {:else if type === 'diary'}
                              <DiaryIcon />
                            {:else if type === 'heap'}
                              <HeapIcon />
                            {/if}
                          </div>
                          <div class="col-span-11">
                            <div>{title}</div>
                            <div class="text-sm">{description}</div>
                          </div>
                        </a>
                      </div>
                    {/each}
                  {/if}
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </ItemDetail>
    <RightSidebar>
      <SidebarGroup>
        {#if !joinedDetails}
          <IconButton
            icon={PlusIcon}
            on:click={join}
            async
            class="bg-panels dark:bg-transparent hover:bg-panels-hover dark:hover:border-white dark:border"
            >Join Group</IconButton
          >
        {:else if joinedDetails.joining}
          <IconButton
            loading
            async
            class="bg-panels dark:bg-transparent hover:bg-panels-hover dark:hover:border-white dark:border"
            >Joining...</IconButton
          >
        {:else}
          <div class="flex flex-col gap-1">
            <div class="font-bold">Members</div>
            <div class="flex items-center gap-2">
              <div class="w-5 h-5 mb-1 dark:fill-white">
                <PersonIcon />
              </div>
              {Object.keys(joinedDetails.fleet).length}
            </div>
          </div>
          <IconButton
            icon={CancelIcon}
            on:click={leave}
            async
            class="bg-panels dark:bg-transparent hover:bg-panels-hover dark:hover:border-white dark:border"
            >Leave</IconButton
          >
        {/if}
        <IconButton
          icon={ShareIcon}
          on:click={() => (recommendModalOpen = true)}
          class="bg-panels dark:bg-transparent hover:bg-panels-hover dark:hover:border-white dark:border"
          >Recommend</IconButton
        >
      </SidebarGroup>
      {#if sortedRecommendations.length > 0}
        <SidebarGroup>
          <div class="text-lg mx-1">More from {host}</div>
          {#each sortedRecommendations as [recommendation]}
            <ItemPreview key={keyStrToObj(recommendation)} small />
          {/each}
        </SidebarGroup>
      {/if}
    </RightSidebar>
  </div>
  <RecommendModal bind:open={recommendModalOpen} key={group.keyObj} />
{:else}
  Loading...
{/if}
