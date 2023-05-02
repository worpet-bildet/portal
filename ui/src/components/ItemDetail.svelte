<script>
  import { link } from 'svelte-spa-router';
  import { state, refreshPals } from '@root/state';
  import { addPal, removePal, me } from '@root/api';
  import { isUrl } from '@root/util';
  import { Sigil, AddPalIcon, RemovePalIcon } from '@fragments';
  export let cover, avatar, title, description, patp, color, type;
  const DEFAULT_COVER_IMAGE =
    'https://images.unsplash.com/photo-1579380231498-e45d45213373?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80';

  // TODO
  // Don't really like this being here but not really sure how to factor this
  // out - might make sense to go back to using a modal for the items
  let isMyPal = false;
  export const togglePal = () => {
    let ship = patp.slice(1);
    if (isMyPal) return removePal(ship).then(refreshPals);
    addPal(ship).then(refreshPals);
  };

  state.subscribe((s) => {
    if (type === 'ship') isMyPal = !!s.pals?.[patp.slice(1)];
  });
</script>

<div class="col-span-12 w-full h-44 overflow-hidden">
  <img
    src={isUrl(cover) ? cover : DEFAULT_COVER_IMAGE}
    class="absolute top-0 left-0 object-cover h-56 w-full"
    alt="Profile banner"
  />
</div>
<div class="col-span-9">
  <div class="relative">
    <div class="absolute -top-6">
      {#if avatar}
        <img
          src={avatar}
          class="rounded-md w-20 h-20 object-cover border"
          alt="Group"
        />
      {:else}
        <div class="border w-20 h-20 rounded-md overflow-hidden">
          <Sigil {patp} {color} />
        </div>
      {/if}
    </div>
  </div>
  <div class="flex flex-row w-full">
    <!-- spacer -->
    <div class="h-20 w-28" />
    <div class="flex flex-col gap-2">
      <div class="flex items-center gap-8">
        <div class="text-2xl font-bold">
          {title || ''}
        </div>
        {#if type === 'ship'}
          {#if me === patp}
            <a use:link href={`/${patp}/edit`}>edit</a>
          {:else}
            <button
              class="flex items-center gap-2 px-2 py-1 border cursor-pointer text-sm"
              on:click={togglePal}
            >
              {#if isMyPal}
                <span class="w-5">
                  <RemovePalIcon />
                </span>
                Remove
              {:else}
                <span class="w-5"> <AddPalIcon /></span> Add
              {/if}
            </button>
          {/if}
        {:else if type === 'group'}
          <button class="px-2 border py-1">Join Group</button>
        {/if}
      </div>
      <div class="flex gap-4 text-xs">
        <!-- TODO: get any links in here to print nicely -->
        {description || ''}
      </div>
    </div>
  </div>
  <slot />
</div>
