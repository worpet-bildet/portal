<script lang="ts">
  import type { NodeViewProps } from '@tiptap/core';
  import cx from 'clsx';
  import { NodeViewWrapper } from 'svelte-tiptap';

  export let node: NodeViewProps['node'];
  export let editor: NodeViewProps['editor'];

  // can we save the reference from here?
  let saved = false;
  $: {
    if (!saved) {
      console.log('saving reference');
      saved = true;
      editor.commands.saveReference(node.attrs);
    }
  }
</script>

<NodeViewWrapper class={cx('svelte-component')} contenteditable="false">
  {node.attrs.keyStr}
</NodeViewWrapper>
