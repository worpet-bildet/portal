<script>
  import { link } from 'svelte-spa-router';
  import { isUrl } from '@root/util';
  import { Sigil } from '@components';
  import { ItemImage } from '@fragments';
  export let cover, avatar, title, description, patp, color, type;

  let avatarPad, avatarContainer;
  $: {
    if (avatarPad && avatarContainer) {
      redrawAvatar();
    }
  }
  const redrawAvatar = () => {
    if (avatarPad && avatarContainer) {
      avatarPad.style.height = `${avatarContainer.clientHeight}px`;
    }
  };
</script>

<div class="col-span-12 w-full h-56">
  {#if isUrl(cover)}
    <img
      src={cover}
      class="absolute top-0 left-0 object-cover h-80 w-full z-0 shadow"
      alt="Profile banner"
    />
  {:else}
    <div
      class="absolute top-0 left-0 h-80 w-full z-0 bg-black flex items-center justify-center text-8xl font-bold overflow-hidden text-white shadow"
    />
  {/if}
</div>
<div class="col-span-12 md:col-span-9 flex flex-col gap-4">
  <div class="grid grid-cols-12 gap-4 w-full">
    <div class="relative col-span-3 md:col-span-2">
      <div bind:this={avatarPad} />
      <div class="absolute -top-8 w-full" bind:this={avatarContainer}>
        {#if avatar}
          <!-- <img
            src={avatar}
            class="rounded-md border w-full h-full object-cover"
            alt="Group"
          /> -->
          <div class="border rounded-md overflow-hidden w-full shadow">
            <ItemImage {title} {color} image={avatar} on:load={redrawAvatar} />
          </div>
        {:else if type === 'app'}
          <div class="border rounded-md overflow-hidden w-full shadow">
            <ItemImage {title} {color} on:load={redrawAvatar} />
          </div>
        {:else}
          <div class="border rounded-md overflow-hidden w-full shadow">
            <Sigil {patp} {color} />
          </div>
        {/if}
      </div>
    </div>
    <div class="flex flex-col justify-start gap-2 col-span-9">
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
