<script lang="ts">
  import { link } from 'svelte-spa-router';

  import { me, api } from '@root/api';
  import {
    state,
    contacts,
    getCurator,
    refreshPals,
    groupKeyToItemKey,
    keyStrToObj,
  } from '@root/state';
  import { getMeta } from '@root/util';

  import { Sigil, GroupPreview, MoreFrom } from '@components';
  import { IconButton, SendIcon, ProfileIcon, GroupsIcon } from '@fragments';

  export let patp;

  let isMyPal;
  const togglePal = () => {
    let ship = patp.slice(1);
    isMyPal = !!$state.pals?.[patp.slice(1)];
    if (isMyPal) return api.pals.do.remove(ship).then(refreshPals);
    api.pals.do.add(ship).then(refreshPals);
  };

  $: curator = $state && getCurator(patp);
  $: curator?.keyObj?.ship && patp && !contacts()[patp]
    ? api.urbit.do.meetContact(patp)
    : null;
</script>

{#if curator?.keyObj?.ship}
  {@const { title, nickname, cover, image, description, color } =
    getMeta(curator)}
  <div class="col-span-12 sm:col-span-5">
    <div class="flex flex-col gap-3 p-6 border rounded-xl sticky top-4">
      <div class="flex flex-col gap-2">
        <div class="w-24 overflow-hidden rounded-xl">
          <Sigil {patp} />
        </div>
        <div class="flex flex-col">
          <div class="font-bold text-xl">{nickname ? nickname : patp}</div>
          {#if nickname}
            <div class="text-sm text-grey">{patp}</div>
          {/if}
        </div>
        <div>
          {description || 'A Portal user'}
        </div>
      </div>

      {#if me !== patp}
        <IconButton
          icon={SendIcon}
          on:click={() =>
            window.open(`${window.location.origin}/apps/talk/dm/${patp}`)}
          class="bg-black text-white w-fit">Message</IconButton
        >
      {/if}
      {#if me === patp}
        <a
          use:link
          href={`/${me}/edit`}
          class="w-full py-2 border rounded-lg text-center text-tertiary hover:text-black hover:underline"
          >Edit Profile</a
        >
      {:else if isMyPal}
        <IconButton
          icon={ProfileIcon}
          on:click={togglePal}
          async
          class="text-xs text-tertiary bg-panel w-fit">Remove Pal</IconButton
        >
      {:else}
        <IconButton
          icon={ProfileIcon}
          on:click={togglePal}
          async
          class="bg-panelhover text-secondary w-fit">Add Pal</IconButton
        >
      {/if}

      {#if curator?.bespoke?.groups?.length > 0}
        <div class="border-b w-full" />
        <div class="flex flex-col gap-3">
          <div class="text-lg flex items-center gap-2">
            <div class="w-5 h-5"><GroupsIcon /></div>
            <div>Favourite Groups</div>
          </div>
          <div class="flex flex-col gap-2">
            {#each curator.bespoke.groups as group}
              {@const key = groupKeyToItemKey(group)}
              <GroupPreview key={keyStrToObj(key)} />
            {/each}
          </div>
        </div>
      {/if}
      <MoreFrom {patp} />
    </div>
  </div>
{/if}