import { SvelteNodeViewRenderer } from 'svelte-tiptap';
import { mergeAttributes, Node } from '@tiptap/core';
import ItemReference from './ItemReference.svelte';

export type ReferenceOptions = {
  HTMLAttributes: Record<string, any>;
};

export default Node.create<ReferenceOptions>({
  name: 'item-reference',

  group: 'inline',
  content: 'inline*',
  editable: false,
  selectable: false,
  inline: true,

  parseHTML() {
    return [{ tag: 'item-reference' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'item-reference',
      mergeAttributes(HTMLAttributes, { contenteditable: false }),
      0,
    ];
  },

  renderText({ node }) {
    return `{"ref":"${node.attrs.keyStr}"}`;
  },

  addNodeView() {
    return SvelteNodeViewRenderer(ItemReference);
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
