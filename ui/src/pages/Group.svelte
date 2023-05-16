<script>
  import {
    state,
    getGroup,
    getJoinedGroupDetails,
    refreshGroups,
    keyStrToObj,
  } from '@root/state';
  import { joinGroup, leaveGroup, subscribeToItem } from '@root/api';
  import { getMeta } from '@root/util';
  import { ItemDetail, RecommendModal } from '@components';
  import {
    ChatIcon,
    DiaryIcon,
    HeapIcon,
    PersonIcon,
    ShareIcon,
    RightSidebar,
    SidebarGroup,
    CrossIcon,
    IconButton,
  } from '@fragments';

  export let params;

  const loadGroup = () => {
    if (!groupKey) return;
    group = getGroup(groupKey);
    if ($state.isLoaded && !group)
      return subscribeToItem(keyStrToObj(`/group/${groupKey}/`));
    ({ cover, image, description, title } = getMeta(group));
    joinedDetails = getJoinedGroupDetails(groupKey);
  };

  let host, cord, groupKey;
  $: {
    ({ host, cord } = params);
    groupKey = `${host}/${cord}`;
    loadGroup();
  }

  let group, joinedDetails;
  // let feed = [];

  let cover, image, description, title;

  state.subscribe((s) => {
    if (!s.isLoaded) return;
    loadGroup();
  });

  const join = () => {
    joinGroup(groupKey).then(refreshGroups);
  };
  const leave = () => {
    leaveGroup(groupKey).then(refreshGroups);
  };

  const channelLink = (channelKey) => {
    return `${window.location.origin}/apps/groups/groups/${groupKey}/channels/${channelKey}`;
  };

  let recommendModalOpen;
</script>

{#if group}
  <div class="grid grid-cols-12 gap-x-8">
    <ItemDetail {cover} avatar={image} {title} {description} type="group">
      <div class="col-span-12 md:col-span-9">
        {#if !joinedDetails}
          <div>Join the group to see more information</div>
        {:else if !joinedDetails.joining}
          <div class="grid gap-4">
            <div class="text-2xl font-bold">
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
                        class="border shadow rounded-lg p-2 hover:bg-black hover:text-white"
                      >
                        <a
                          href={channelLink(channelKey)}
                          target="_blank"
                          class="grid grid-cols-12 gap-4 items-center"
                        >
                          <div class="col-span-1">
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
          <IconButton icon={ChatIcon} on:click={join} async
            >Join Group</IconButton
          >
        {:else if joinedDetails.joining}
          <IconButton loading async>Joining...</IconButton>
        {:else}
          <div class="flex flex-col gap-1">
            <div class="font-bold">Members</div>
            <div class="flex items-center gap-2">
              <div class="w-5 h-5">
                <PersonIcon />
              </div>
              {Object.keys(joinedDetails.fleet).length}
            </div>
          </div>
          <IconButton icon={CrossIcon} on:click={leave} async>Leave</IconButton>
        {/if}
        <IconButton
          icon={ShareIcon}
          on:click={() => (recommendModalOpen = true)}>Recommend</IconButton
        >
      </SidebarGroup>
    </RightSidebar>
    <!-- <div class="hidden lg:flex lg:col-span-3 flex-col gap-8">
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
    </div> -->
  </div>
  <RecommendModal bind:open={recommendModalOpen} key={group.keyObj} />
{:else}
  Loading...
{/if}
