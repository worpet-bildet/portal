<script lang="ts">
  import { ItemKey, Review } from '$types/portal/item';

  import { link } from 'svelte-spa-router';
  import { me, api } from '@root/api';
  import { getItem, keyStrFromObj, refreshGroups } from '@root/state';
  import { isUrl } from '@root/util';
  import { Sigil, TipModal } from '@components';
  import {
    ItemImage,
    StarRating,
    IconButton,
    EthereumIcon,
    PlusIcon,
    InstallIcon,
  } from '@fragments';

  export let cover = '';
  export let avatar = '';
  export let title = '';
  export let description = '';
  export let patp = '';
  export let color = '#000000';
  export let type = '';
  export let reviews: ItemKey[] = [];
  export let key: ItemKey;
  export let isInstalledOrJoined = false;

  let handleTipRequest: (key: ItemKey) => void;

  let reviewCount: number;
  let reviewAverageRating: number;
  $: {
    if (reviews.length > 0) {
      // if we have reviews, let's count them, and get the average score!
      reviewCount = reviews.length;
      reviewAverageRating = Number(
        (
          reviews.reduce((rating = 0, r) => {
            rating += Number(getItem(keyStrFromObj(r))?.bespoke?.rating);
            return rating;
          }, 0) / reviewCount
        ).toFixed(1)
      );
    }
  }

  const handleJoinGroup = async (event: MouseEvent) => {
    (event.currentTarget as HTMLElement).innerHTML = 'Joining';
    await api.urbit.do.joinGroup(`${key.ship}/${key.cord}`).then(refreshGroups);
  };

  let avatarPad, avatarContainer, innerWidth;
  $: if (avatarPad && avatarContainer) {
    redrawAvatar();
  }
  $: {
    if (innerWidth) {
      redrawAvatar();
    }
  }
  const redrawAvatar = () => {
    if (avatarPad && avatarContainer) {
      avatarPad.style.height = `${avatarContainer.clientHeight}px`;
    }
  };
  $: if (!cover || !isUrl(cover)) {
    cover = 'https://toptyr-bilder.nyc3.cdn.digitaloceanspaces.com/hills.jpg';
  }
</script>

<svelte:window bind:innerWidth />
<div class="col-span-12 w-full h-56">
  {#if isUrl(cover)}
    <img
      src={cover}
      class="absolute top-0 left-0 object-cover cover h-80 w-full z-0"
      alt="Profile banner"
    />
    <div
      class="absolute top-0 left-0 object-cover cover h-80 w-full z-0 bg-gradient-to-t from-coverPhotoBottom to-coverPhotoTop"
    />
  {:else}
    <div
      class="absolute cover top-0 left-0 h-80 w-full z-0 bg-grey flex items-center justify-center text-8xl font-bold overflow-hidden text-white"
    />
  {/if}
</div>
<div class="col-span-12 md:col-span-9 flex flex-col">
  <div class="grid grid-cols-12 gap-4 w-full">
    <div class="relative col-span-3 md:col-span-2">
      <div bind:this={avatarPad} />
      <div
        class="absolute -top-12 w-full rounded-md"
        bind:this={avatarContainer}
      >
        {#if avatar}
          <div class="rounded-md overflow-hidden w-full">
            <ItemImage {title} {color} image={avatar} on:load={redrawAvatar} />
          </div>
        {:else if type === 'app'}
          <div class="rounded-md overflow-hidden w-full">
            <ItemImage {title} {color} on:load={redrawAvatar} />
          </div>
        {:else}
          <div class="rounded-md overflow-hidden w-full">
            <Sigil {patp} />
          </div>
        {/if}
      </div>
    </div>
    <div
      class="flex flex-col justify-start gap-2 col-span-9 relative break-words mb-4"
    >
      <div class="text-lg md:text-2xl font-bold">
        {title || ''}
      </div>
      <div class="gap-4">
        <!-- TODO: get any links in here to print nicely -->
        {#if description}<div>{description}</div>{/if}
        {#if type === 'collection' || type === 'app' || type === 'group'}<a
            use:link
            class="text-sm hover:text-grey hover:duration-500"
            href={`/${patp}`}
          >
            by {patp}
          </a>{/if}
      </div>
      <div class="flex gap-3">
        {#if window.ethereum && me !== patp}
          <IconButton
            icon={EthereumIcon}
            class="bg-panels dark:bg-transparent hover:bg-panels-hover dark:hover:border-white dark:border border"
            on:click={() => handleTipRequest(key)}>Tip</IconButton
          >
        {/if}
        {#if !isInstalledOrJoined}
          {#if type === 'group'}
            <div class="flex md:hidden">
              <IconButton
                icon={PlusIcon}
                on:click={handleJoinGroup}
                class="bg-panels dark:bg-transparent hover:bg-panels-hover dark:hover:border-white dark:border border"
                >Join Group</IconButton
              >
            </div>
          {/if}
          {#if type === 'app'}
            <div class="flex md:hidden">
              <IconButton
                icon={InstallIcon}
                on:click={() => {
                  window.open(
                    `${window.location.origin}/apps/grid/search/${patp}/apps`
                  );
                }}
                class="bg-panels dark:bg-transparent hover:bg-panels-hover dark:hover:border-white dark:border border"
                >Install</IconButton
              >
            </div>
          {/if}
        {/if}
      </div>
    </div>
    {#if reviews && reviewAverageRating}
      <div class="col-span-12 flex justify-end gap-8">
        <div class="flex items-center gap-4">
          <span>
            <StarRating
              config={{
                readOnly: true,
                countStars: 1,
                range: {
                  min: 0,
                  max: 5,
                  step: 1,
                },
                score: 5,
              }}
            />
          </span>
          <span>
            {reviewCount ? reviewAverageRating.toFixed(2) : 'Loading...'}
          </span>
        </div>
        <div class="border border-spacer" />
        <div class="flex items-center gap-4">
          {reviewCount} reviews
        </div>
      </div>
    {/if}
  </div>
  <slot />
  <TipModal bind:handleTipRequest />
</div>
