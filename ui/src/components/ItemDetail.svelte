<script>
  import { isUrl } from '@root/util';
  import { Sigil, ItemImage } from '@fragments';
  export let cover, avatar, title, description, patp, color, type;

  // Make sure that the avatar does not cover any elements which are supposed to
  // be below it by ensuring that the height of the row is at least equal to the
  // height of the avatar image - this does add a tiny bit of padding to the
  // bottom of the element (equal to whatever the -top is set to) but it is
  // workable
  let avatarPad, avatarContainer;
  $: {
    if (avatarPad && avatarContainer) {
      redrawAvatar();
    }
  }
  const redrawAvatar = () => {
    avatarPad.style.height = `${avatarContainer.clientHeight}px`;
  };
</script>

<div class="col-span-12 w-full h-48">
  {#if isUrl(cover)}
    <img
      src={cover}
      class="absolute top-0 left-0 object-cover h-80 w-full z-0"
      alt="Profile banner"
    />
  {:else}
    <div
      class="absolute top-0 left-0 h-80 w-full z-0 bg-black flex items-center justify-center text-8xl font-bold"
    >
      {title}
    </div>
  {/if}
</div>
<div class="col-span-12 md:col-span-9">
  <div class="inline-grid grid-cols-12 gap-4 w-full">
    <div class="relative col-span-2">
      <div bind:this={avatarPad} />
      <div class="absolute -top-6 w-full" bind:this={avatarContainer}>
        {#if avatar}
          <img
            src={avatar}
            class="rounded-md border w-full h-full"
            alt="Group"
          />
        {:else if type === 'app'}
          <div class="border rounded-md overflow-hidden w-full">
            <ItemImage {title} {color} on:load={redrawAvatar} />
          </div>
        {:else}
          <div class="border rounded-md overflow-hidden w-full">
            <Sigil {patp} {color} />
          </div>
        {/if}
      </div>
    </div>
    <div class="flex flex-col w-full col-span-9 gap-2">
      <div class="flex items-center gap-8">
        <div class="text-lg md:text-2xl font-bold">
          {title || ''}
        </div>
      </div>
      <div class="gap-4 text-xs">
        <!-- TODO: get any links in here to print nicely -->
        {#if description}<div>{description}</div>{/if}
        {#if type === 'collection' || type === 'app'}<div>by {patp}</div>{/if}
      </div>
    </div>
  </div>
  <slot />
</div>
