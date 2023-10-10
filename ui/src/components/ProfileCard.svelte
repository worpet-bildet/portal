<script lang="ts">
  import { link } from 'svelte-spa-router';

  import { api, me } from '@root/api';
  import {
    contacts,
    getCurator,
    groupKeyToItemKey,
    keyStrToObj,
    refreshPals,
    state,
  } from '@root/state';
  import { getMeta } from '@root/util';

  import { GroupPreview, MoreFrom, Sigil } from '@components';
  import { GroupsIcon, IconButton, ProfileIcon, SendIcon } from '@fragments';

  export let patp;

  const togglePal = () => {
    let ship = patp.slice(1);
    if (isMyPal) return api.pals.do.remove(ship).then(refreshPals);
    api.pals.do.add(ship).then(refreshPals);
  };

  $: curator = $state && getCurator(patp);
  $: isMyPal = $state && !!$state.pals?.[patp.slice(1)];
  $: curator?.keyObj?.ship && patp && !contacts()[patp]
    ? api.urbit.do.meetContact(patp)
    : null;
</script>

{#if curator?.keyObj?.ship}
  {@const { title, nickname, cover, image, description, color } =
    getMeta(curator)}
  <div class="col-span-12 sm:col-span-5">
    <div
      class="flex flex-col gap-3 p-6 border dark:border-glass rounded-xl sticky top-4"
    >
      <div class="flex flex-col gap-2">
        <div class="w-24 overflow-hidden rounded-xl">
          <Sigil {patp} />
        </div>
        <div class="flex flex-col">
          <a use:link href={`/${patp}`} class="font-bold text-xl"
            >{nickname ? nickname : patp}</a
          >
          {#if nickname}
            <a use:link href={`/${patp}`} class="text-sm text-grey">{patp}</a>
          {/if}
        </div>
        <div>
          {description || 'A Portal user'}
        </div>
      </div>

      <div class="flex flex-wrap gap-4">
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
            class="w-full py-2 border dark:border-glass rounded-lg text-center text-tertiary hover:text-black hover:underline"
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
      </div>
      {#if curator?.bespoke?.groups?.length > 0}
        <div class="border-b dark:border-glass w-full" />
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
