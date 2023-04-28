<script>
  import { poke, me } from '@root/api';
  import { feed } from '@root/state';
  import { FeedItem } from '@components';
  import { FeedPostForm } from '@components/Form';
  import { toUrbitTime, defaultGeneral } from '@root/util';

  // TODO: would be nice to put this in teh FeedPostForm component, but we
  // would need to be able to handle saving comments if we did that, and i'm
  // not sure exactly how the referencing will work yet
  const post = (content) => {
    poke({
      app: 'portal-manager',
      mark: 'portal-action',

      // ship=(unit ship)
      // cord=(unit cord)
      // time=(unit cord)
      // lens=(unit lens)
      // bespoke=(unit bespoke)
      // append-to=(unit [struc=[%collection ~] =ship =cord time=_'~2000.1.1'])
      json: {
        create: {
          bespoke: {
            other: {
              title: '',
              blurb: 'content',
              link: '',
              image: '',
            },
          },
        },
      },

      // json: {
      //   'add-item-to-list': {
      //     'list-key': {
      //       ship: me,
      //       type: '/list/enditem/other',
      //       cord: '~2000.1.2', // the default list key
      //     },
      //     ship: me,
      //     type: '/enditem/other',
      //     text: toUrbitTime(Date.now()),
      //     general: { ...defaultGeneral, description: content },
      //     'bespoke-input': { 'enditem-other': '' },
      //   },
      // },
    });
  };
</script>

<div class="grid grid-cols-6">
  <div class="grid gap-y-5 col-span-6 md:col-span-4">
    <div>Feed</div>
    <FeedPostForm on:post={({ detail }) => post(detail)} />
    {#if Object.values($feed).length > 0}
      {#each Object.values($feed) as item}
        <FeedItem {item} />
      {/each}
    {:else}
      <div>Loading...</div>
    {/if}
  </div>
</div>
