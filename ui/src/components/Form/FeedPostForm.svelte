<script>
  import { createEventDispatcher } from 'svelte';
  import { me, poke } from '@root/api';
  import { TextArea, Sigil } from '@fragments';
  let dispatch = createEventDispatcher();
  let content;
  const post = () => {
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
    content = '';
    dispatch('post');
  };
</script>

<div class="grid grid-cols-12 gap-y-3 border p-3">
  <div class="col-span-1 w-10 h-10 rounded-md overflow-hidden">
    <Sigil patp={me} />
  </div>
  <div class="col-span-11">
    <TextArea
      class="bg-transparent"
      placeholder="You can share urbit-native content here by pasting its link"
      bind:value={content}
      minRows={2}
      maxRows={40}
    />
  </div>
  <div class="col-span-12 justify-self-end self-end">
    <button class="border px-3 py-1" on:click={post}>Post</button>
  </div>
</div>
