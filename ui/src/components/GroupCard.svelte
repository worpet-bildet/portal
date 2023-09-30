<script lang="ts">
  import { api } from '@root/api';
  import { refreshGroups } from '@root/state';
  import { getMeta } from '@root/util';

  import { MoreFrom, RecommendModal } from '@components';
  import {
    CancelIcon,
    IconButton,
    ItemImage,
    PlusIcon,
    ProfileIcon,
    RepostIcon,
  } from '@fragments';
  import { link } from 'svelte-spa-router';

  export let group;
  export let joinedDetails;

  const join = () => api.urbit.do.joinGroup(groupKey).then(refreshGroups);
  const leave = () => api.urbit.do.leaveGroup(groupKey).then(refreshGroups);

  let recommendModalOpen;

  $: groupKey = group && `${group?.keyObj?.ship}/${group?.keyObj?.cord}`;
</script>

{#if group}
  {@const { title, nickname, ship, image, description, color } = getMeta(group)}
  <div class="col-span-12 md:col-span-5">
    <div class="flex flex-col gap-3 p-6 border rounded-xl sticky top-4">
      <div class="flex flex-col gap-2">
        <div class="w-24 overflow-hidden rounded-xl">
          <ItemImage {image} {color} {title} />
        </div>
        <div class="flex flex-col">
          <div class="font-bold text-xl">{nickname ? nickname : title}</div>
          <div class="text-sm text-grey">
            Hosted by <a use:link href={`/${ship}`} class="hover:underline"
              >{ship}</a
            >
          </div>
        </div>
        <div>
          {description}
        </div>
      </div>

      {#if !joinedDetails}
        <IconButton
          icon={PlusIcon}
          on:click={join}
          async
          class="bg-black text-white w-fit">Join Group</IconButton
        >
      {:else if joinedDetails.joining}
        <IconButton loading async class="bg-black text-white w-fit"
          >Joining...</IconButton
        >
      {:else}
        <div class="flex flex-col gap-1">
          <div class="font-bold">Members</div>
          <div class="flex items-center gap-2">
            <div class="w-5 h-5 mb-1 dark:fill-white">
              <ProfileIcon />
            </div>
            {Object.keys(joinedDetails.fleet).length}
          </div>
        </div>
      {/if}
      <IconButton
        icon={RepostIcon}
        on:click={() => (recommendModalOpen = true)}
        class="bg-panelhover text-secondary w-fit">Recommend</IconButton
      >
      {#if joinedDetails}
        <IconButton
          icon={CancelIcon}
          on:click={leave}
          async
          class="text-xs text-tertiary bg-panel w-fit">Leave</IconButton
        >
      {/if}
      <MoreFrom patp={ship} exclude={[group.keyStr]} />
    </div>
  </div>
  <RecommendModal bind:open={recommendModalOpen} key={group.keyObj} />
{/if}
