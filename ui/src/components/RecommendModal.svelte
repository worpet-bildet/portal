<script>
  import { poke, me } from '@root/api';
  import { MySigil, ItemVerticalListPreview } from '@components';
  import { Modal, TextArea } from '@fragments';
  import SquarePreview from './Collections/SquarePreview.svelte';
  export let open;
  export let key;
  export let title;

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
  };
</script>

<Modal bind:open>
  <div class="flex flex-col justify-center gap-4">
    <div class="text-xl">Say something about {title}</div>
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-1">
        <MySigil />
      </div>
      <div class="col-span-11">
        <TextArea minRows={3} maxRows={10} bind:value={blurb} />
      </div>
      <div class="col-span-11 col-start-2 border">
        <ItemVerticalListPreview {key} clickable={false} />
      </div>
      <button
        class="rounded-lg bg-black text-white font-bold py-2 col-start-12"
        on:click={recommend}>Post</button
      >
    </div>
  </div>
</Modal>
