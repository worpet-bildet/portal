<script>
  import { link } from 'svelte-spa-router';
  import { poke, me } from '@root/api';
  import { feed, state, getItem } from '@root/state';
  import { FeedPost, ItemVerticalListPreview, SidebarPal } from '@components';
  import { FeedPostForm } from '@components/Form';
  import { RightSidebar } from '@fragments';

  let pals;
  state.subscribe((s) => {
    ({ pals } = s);
  });

  // TODO: this should not go in the main collection, it should go in the feed
  // collection that jurij is going to make
  const post = (content) => {
    poke({
      app: 'portal-manager',
      mark: 'portal-action',
      json: {
        create: {
          'append-to': [
            {
              ship: me,
              struc: 'collection',
              time: '~2000.1.1',
              cord: '',
            },
          ],
          bespoke: {
            other: {
              title: '',
              blurb: content,
              link: '',
              image: '',
            },
          },
        },
      },
    });
  };
</script>

<div class="grid grid-cols-9 gap-8">
  <div class="grid gap-4 col-span-12 md:col-span-6">
    <FeedPostForm on:post={({ detail }) => post(detail)} />
    {#if Object.values($feed).length > 0}
      {#each Object.values($feed) as item}
        <FeedPost {item} />
      {/each}
    {:else}
      <div>Loading...</div>
    {/if}
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
