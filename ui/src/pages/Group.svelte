<script lang="ts">
  import coverPhoto from '@assets/coverPhoto.jpg'; // todo: make this work
  import { GroupCard, ItemPreview } from '@components';
  import { CommentIcon, RightSidebar, SidebarGroup } from '@fragments';
  import { api } from '@root/api';
  import {
    getGroup,
    getJoinedGroupDetails,
    getMoreFromThisShip,
    keyStrToObj,
    state,
  } from '@root/state';
  import { getMeta, isImage } from '@root/util';

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

  const channelLink = (channelKey) => {
    return `${window.location.origin}/apps/groups/groups/${groupKey}/channels/${channelKey}`;
  };
</script>

{#if group}
  {@const { cover, image, description, title } = getMeta(group)}
  <div class="grid grid-cols-12 gap-4 sm:gap-8 pb-20">
    <div class="col-span-12 w-full sm:h-48">
      {#if isImage(cover)}
        <img
          src={cover}
          alt="profile banner"
          class="relative sm:absolute sm:top-0 left-0 w-full h-48 sm:h-72 object-cover"
        />
      {:else}
        <img
          src=https://nyc3.digitaloceanspaces.com/toptyr-bilder/746f3d88a414b8633cbb807a1b6dc4d8%20(1).jpg
          alt="default profile banner"
          class="relative sm:absolute sm:top-0 left-0 w-full h-48 sm:h-72 object-cover"
        />
      {/if}
      <div
        class="hidden sm:absolute sm:top-0 left-0 w-full h-48 sm:h-72 bg-gradient-to-t from-coverPhotoBottom to-coverPhotoTop"
      />
    </div>

    <GroupCard {group} {joinedDetails} />

    <div
      class="col-span-12 md:col-span-7 bg-panels dark:bg-darkgrey border p-6 rounded-lg"
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
                            <CommentIcon />
                          {:else if type === 'diary'}
                            <!-- <DiaryIcon /> -->
                          {:else if type === 'heap'}
                            <!-- <HeapIcon /> -->
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
    <RightSidebar>
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
{:else}
  Loading...
{/if}
