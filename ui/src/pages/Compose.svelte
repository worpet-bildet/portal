<script lang="ts">
  import { Editor } from '@tiptap/core';
  import { onMount } from 'svelte';
  import { FeedPostForm } from '@components';

  let editor: Editor = undefined;

  onMount(() => {
    setTimeout(() => {
      editor.commands.focus();
    }, 500);
  });
</script>

<FeedPostForm bind:editor class="md:pb-0 pb-4"/>
