<script lang="ts">
  import { ItemPreview, Sigil } from '@components';
  import { Modal, TextArea } from '@fragments';
  import { api, me } from '@root/api';
  import { getItem, keyStrFromObj } from '@root/state';
  import { getMeta } from '@root/util';
  export let open;
  export let key;

  let title = '';
  let item;
  $: item = getItem(keyStrFromObj(key || {}));
  $: ({ title } = getMeta(item));

  let blurb;

  const recommend = () => {
    api.portal.do.create({
      'prepend-to-feed': [
        { ship: me, struc: 'feed', time: '~2000.1.1', cord: '' },
      ],
      bespoke: { retweet: { blurb, ref: key } },
    });
    open = false;
    blurb = '';
  };
</script>

<Modal bind:open>
  <div class="flex flex-col justify-center gap-4 p-4">
    <div class="text-xl">Say something about {title || 'this'}</div>
    <div class="grid grid-cols-12 gap-4 p-4 dark:border">
      <div class="col-span-1">
        <Sigil patp={me} />
      </div>
      <div class="col-span-11">
        <TextArea bind:content={blurb} placeholder="Why do you like {title}?" />
      </div>
      <div class="col-span-11 col-start-2">
        <ItemPreview {key} clickable={false} />
      </div>
      <button
        class="bg-black text-white border font-bold rounded-lg py-2 px-3 col-start-11 col-span-2 lg:col-start-12 lg:col-span-1"
        on:click={recommend}>Post</button
      >
    </div>
  </div>
</Modal>
