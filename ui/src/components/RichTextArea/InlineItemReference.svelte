<script lang="ts">
  import type { NodeViewProps } from '@tiptap/core';
  import cx from 'clsx';
  import { NodeViewWrapper } from 'svelte-tiptap';

  import { InlineItem } from '@components';

  export let node: NodeViewProps['node'];
</script>

<NodeViewWrapper
  class={cx('svelte-component', 'inline-flex')}
  contenteditable="false"
>
  <InlineItem keyStr={node.attrs.keyStr} />
</NodeViewWrapper>

<style>
  :global(.node-inline-item-reference) {
    display: inline-flex;
    align-items: center;
  }
</style>
