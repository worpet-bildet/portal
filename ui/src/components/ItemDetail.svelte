<script>
  import { link } from 'svelte-spa-router';
  import { getItem, keyStrFromObj } from '@root/state';
  import { isUrl } from '@root/util';
  import { Sigil } from '@components';
  import { ItemImage, StarRating } from '@fragments';
  export let cover, avatar, title, description, patp, color, type, reviews;

  let reviewCount, reviewAverageRating;
  $: {
    if (reviews && reviews.length > 0) {
      // if we have reviews, let's count them, and get the average score!
      reviewCount = reviews.length;
      reviewAverageRating = (
        reviews.reduce((rating = 0, r) => {
          rating += Number(getItem(keyStrFromObj(r))?.bespoke?.rating);
          return rating;
        }, 0) / reviewCount
      ).toFixed(1);
    }
  }

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
    cover =
      'https://images.unsplash.com/photo-1554921027-b91f0beeb07d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80';
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
      class="absolute top-0 left-0 object-cover cover h-80 w-full z-0 bg-gradient-to-t from-[#00000000] to-[#000000aa]"
    />
  {:else}
    <div
      class="absolute cover top-0 left-0 h-80 w-full z-0 bg-grey flex items-center justify-center text-8xl font-bold overflow-hidden text-white"
    />
  {/if}
</div>
<div class="col-span-12 md:col-span-9 flex flex-col gap-4">
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
      class="flex flex-col justify-start gap-2 col-span-9 relative break-words"
    >
      <div class="text-lg md:text-2xl font-bold">
        {title || ''}
      </div>
      <div class="gap-4">
        <!-- TODO: get any links in here to print nicely -->
        {#if description}<div>{description}</div>{/if}
        {#if type === 'collection' || type === 'app'}<a
            use:link
            class="text-sm hover:text-grey hover:duration-500"
            href={`/${patp}`}
          >
            by {patp}
          </a>{/if}
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
            {reviewAverageRating === 'NaN' ? 'Loading...' : reviewAverageRating}
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
</div>

<style>
  .cover {
    /* mask-image: linear-gradient(to top, transparent 2%, black 30%); */
  }
</style>
