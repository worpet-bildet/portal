<script>
  import { createEventDispatcher } from 'svelte';
  import { ProfileIcon, TextArea } from '@fragments';
  const dispatch = createEventDispatcher();
  let postContent;

  // /1/chan/chat/~dister-dozzod-lapdeg/userspace-8167/msg/~litlep-nibbyt/170.141.184.506.188.941.247.375.715.656.408.923.897
  // /1/chan/chat/~dister-dozzod-lapdeg/userspace-8167/msg/~lagrev-nocfep/170.141.184.506.187.980.102.797.291.624.211.492.634

  // https://foddur-hodler.one/~/scry/chat/~dister-dozzod-lapdeg/userspace-8167/msg/~lagrev-nocfep/170.141.184.506.187.980.102.797.291.624.211.492.634

  // https://foddur-hodler.one/~/scry/chat/~nibset-napwyn/writs/writ/id/~foddur-hodler/170.141.184.506.190.429.521.353.530.041.736.269.660.json

  // https://foddur-hodler.one/~/scry/club/~dister-dozzod-lapdeg/writs/writ/id/~lagrev-nocfep/170141184506187980102797291624211492634

  // https://foddur-hodler.one/~/scry/writ/id/~lagrev-nocfep/170141184506187980102797291624211492634

  // /1/chan/chat/~nibset-napwyn/developers/msg/~foddur-hodler/170.141.184.506.190.429.521.353.530.041.736.269.660

  // - `x/{chat|club}/{whom}/writs/writ/id/{ship}/{time}` grabs the message at `id`
</script>

<div class="grid grid-cols-12 gap-y-3 border p-3">
  <div class="col-span-1 w-10 h-10">
    <ProfileIcon />
  </div>
  <div class="col-span-11">
    <TextArea
      class="bg-transparent"
      placeholder="You can share urbit-native content here by pasting its link"
      on:change={(e) => (postContent = e.detail)}
      value={postContent}
      minRows={2}
      maxRows={40}
    />
  </div>
  <button
    class="col-span-12 justify-self-end border px-3 py-1"
    on:click={dispatch('post', postContent)}>Post</button
  >
</div>
