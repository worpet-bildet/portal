<script>
  import { link } from 'svelte-spa-router';
  import { isUrl } from '@root/util';
  import { Sigil } from '@components';
  import { ItemImage } from '@fragments';
  export let cover, avatar, title, description, patp, color, type;

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
    cover = 'https://img.freepik.com/free-photo/retro-computer-desk-arrangement_23-2150118622.jpg?w=2000&t=st=1685337130~exp=1685337730~hmac=c5a76439f9ecabb9e7b818ce328ff674b67ad02df471c588c778ba824a028cb7';
  }
</script>

<svelte:window bind:innerWidth />
<div class="col-span-12 w-full h-64">
  {#if isUrl(cover)}
    <img
      src={cover}
      class="absolute top-0 left-0 object-cover cover h-80 w-full z-0 shadow"
      alt="Profile banner"
    />
    <div
      class="absolute top-0 left-0 object-cover cover h-80 w-full z-0 shadow bg-gradient-to-t from-[#00000000] to-[#000000aa]"
    />
  {:else}
    <div
      class="absolute cover top-0 left-0 h-80 w-full z-0 bg-grey flex items-center justify-center text-8xl font-bold overflow-hidden text-white shadow"
    />
  {/if}
</div>
<div class="col-span-12 md:col-span-9 flex flex-col gap-4">
  <div class="grid grid-cols-12 gap-4 w-full">
    <div class="relative col-span-3 md:col-span-2 -top-[225px]">
      <div bind:this={avatarPad} />
      <div class="absolute w-full rounded-md" bind:this={avatarContainer}>
        {#if avatar}
          <div class="border rounded-md overflow-hidden w-full shadow">
            <ItemImage {title} {color} image={avatar} on:load={redrawAvatar} />
          </div>
        {:else if type === 'app'}
          <div class="border rounded-md overflow-hidden w-full shadow">
            <ItemImage {title} {color} on:load={redrawAvatar} />
          </div>
        {:else}
          <div class="border rounded-md overflow-hidden w-full shadow">
            <Sigil {patp} />
          </div>
        {/if}
      </div>
    </div>
    <div class="flex flex-col justify-start gap-2 col-span-9 relative -top-8">
      <div class="text-lg md:text-2xl font-bold">
        {title || ''}
      </div>
      <div class="gap-4">
        <!-- TODO: get any links in here to print nicely -->
        {#if description}<div>{description}</div>{/if}
        {#if type === 'collection' || type === 'app'}<a
            use:link
            class="text-xs"
            href={`/${patp}`}
          >
            by {patp}
          </a>{/if}
      </div>
    </div>
  </div>
  <slot />
</div>

<style>
  .cover {
    /* mask-image: linear-gradient(to top, transparent 2%, black 30%); */
  }
</style>
