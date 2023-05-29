<script>
  import { poke, me } from '@root/api';
  import { getItem, keyStrFromObj } from '@root/state';
  import { getMeta } from '@root/util';
  import { MySigil, ItemVerticalListPreview } from '@components';
  import { Modal, TextArea } from '@fragments';
  export let open;
  export let key;

  let title = '';
  let item;
  $: item = getItem(keyStrFromObj(key || {}));
  $: ({ title } = getMeta(item));

  let blurb;

  const recommend = () => {
    poke({
      app: 'portal-manager',
      mark: 'portal-action',
      json: {
        create: {
          'prepend-to-feed': [
            {
              ship: me,
              struc: 'feed',
              time: '~2000.1.1',
              cord: '',
            },
          ],
          bespoke: {
            retweet: {
              blurb,
              ref: key,
            },
          },
        },
      },
    });
    open = false;
    blurb = '';
  };
</script>

<Modal bind:open>
  <div class="flex flex-col justify-center gap-4">
    <div class="text-xl">Say something about {title || 'this'}</div>
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-1">
        <MySigil />
      </div>
      <div class="col-span-11">
        <TextArea bind:value={blurb} />
      </div>
      <div class="col-span-11 col-start-2">
        <ItemVerticalListPreview {key} clickable={false} />
      </div>
      <button
        class="rounded-lg bg-grey text-white py-2 px-4 col-start-11 col-span-2 lg:col-start-12 lg:col-span-1"
        on:click={recommend}>Post</button
      >
    </div>
  </div>
</Modal>
