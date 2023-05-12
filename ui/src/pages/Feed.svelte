<script>
  import { state, getItem, getGlobalFeed } from '@root/state';
  import {
    Feed,
    ItemVerticalListPreview,
    SidebarPal,
    FeedPostForm,
  } from '@components';
  import { RightSidebar, SidebarGroup } from '@fragments';

  let pals, feed;
  state.subscribe((s) => {
    ({ pals } = s);
    feed = getGlobalFeed();
  });
</script>

<div class="grid grid-cols-9 gap-8">
  <div class="grid gap-4 col-span-12 md:col-span-6">
    <FeedPostForm />
    <Feed {feed} />
  </div>
  <RightSidebar>
    <SidebarGroup>
      {#if !pals}
        <div>
          <div class="font-bold">Portal is better with Pals!</div>
          <ItemVerticalListPreview
            small
            key={{ struc: 'app', ship: '~paldev', cord: 'pals', time: '' }}
          />
        </div>
      {:else}
        <div class="flex flex-col gap-4">
          <div class="text-xl font-bold">Your pals</div>
          <div class="flex flex-col gap-2">
            {#each Object.keys(pals) as pal}
              <SidebarPal pal={`~${pal}`} />
            {/each}
          </div>
        </div>
      {/if}
    </SidebarGroup>
  </RightSidebar>
</div>
