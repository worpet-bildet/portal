<script>
  import { link } from 'svelte-spa-router';
  import { poke, me } from '@root/api';
  import { feed, state, getItem } from '@root/state';
  import {
    Feed,
    ItemVerticalListPreview,
    SidebarPal,
    FeedPostForm,
  } from '@components';
  import { RightSidebar } from '@fragments';

  let pals;
  state.subscribe((s) => {
    ({ pals } = s);
  });
</script>

<div class="grid grid-cols-9 gap-8">
  <div class="grid gap-4 col-span-12 md:col-span-6">
    <FeedPostForm />
    <Feed feed={$feed} />
  </div>
  <RightSidebar>
    {#if !pals}
      <div>
        <div>Portal is better with Pals!</div>
        <ItemVerticalListPreview item={getItem('/app/~paldev/pals/')} />
      </div>
    {:else}
      <div>
        <div class="text-xl font-bold">Your pals</div>
        <div class="flex flex-col gap-4">
          {#each Object.keys(pals) as pal}
            <SidebarPal pal={`~${pal}`} />
          {/each}
        </div>
      </div>
    {/if}
  </RightSidebar>
</div>
