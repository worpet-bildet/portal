<script>
  import { poke, scry, me } from '@root/api';
  import { feed } from '@root/state';
  import { FeedPost } from '@components';
  import { FeedPostForm } from '@components/Form';

  // TODO: would be nice to put this in teh FeedPostForm component, but we
  // would need to be able to handle saving comments if we did that, and i'm
  // not sure exactly how the referencing will work yet
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
            '/other': {
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

  // poke({
  //   app: 'contacts',
  //   mark: 'contact-action',
  //   json: {
  //     heed: ['~rovnys-ricfer', '~rilfun-lidlen', '~ravmel-ropdyl'],
  //   },
  // }).then((result) => {
  //   console.log({ result });
  // });
</script>

<div class="grid grid-cols-6">
  <div class="grid gap-y-5 col-span-6 md:col-span-4">
    <div>Feed</div>
    <FeedPostForm on:post={({ detail }) => post(detail)} />
    {#if Object.values($feed).length > 0}
      {#each Object.values($feed) as item}
        <FeedPost {item} />
      {/each}
    {:else}
      <div>Loading...</div>
    {/if}
  </div>
</div>
