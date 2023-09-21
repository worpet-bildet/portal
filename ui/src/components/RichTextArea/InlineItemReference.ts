import { SvelteNodeViewRenderer } from 'svelte-tiptap';
import { mergeAttributes, Node } from '@tiptap/core';
import InlineItemReference from './InlineItemReference.svelte';

export type ReferenceOptions = {
  HTMLAttributes: Record<string, any>;
};

export default Node.create<ReferenceOptions>({
  name: 'inline-item-reference',

  group: 'inline',
  content: 'inline*',
  editable: false,
  selectable: false,
  inline: true,

  parseHTML() {
    return [{ tag: 'inline-item-reference' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'inline-item-reference',
      mergeAttributes(HTMLAttributes, { contenteditable: false }),
      0,
    ];
  },

  renderText({ node }) {
    return `{"ref":"${node.attrs.keyStr}"}`;
  },

  addNodeView() {
    return SvelteNodeViewRenderer(InlineItemReference);
  },

  addAttributes() {
    return {
      title: { default: '' },
      image: { default: null },
      keyStr: { default: null },
      color: { default: null },
    };
  },
});
