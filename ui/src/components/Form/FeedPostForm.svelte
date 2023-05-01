<script>
  import { createEventDispatcher } from 'svelte';
  import { ProfileIcon, TextArea } from '@fragments';
  const dispatch = createEventDispatcher();
  let postContent;
</script>

<div class="grid grid-cols-12 gap-y-3 border p-3">
  <div class="col-span-1 w-10 h-10">
    <ProfileIcon />
  </div>
  <div class="col-span-11">
    <TextArea
      class="bg-transparent"
      placeholder="You can share urbit-native content here by pasting its link"
      bind:value={postContent}
      minRows={2}
      maxRows={40}
    />
  </div>
  <button
    class="col-span-12 justify-self-end border px-3 py-1"
    on:click={dispatch('post', postContent)}>Post</button
  >
</div>
