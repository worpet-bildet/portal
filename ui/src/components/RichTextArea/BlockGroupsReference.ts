import { SvelteNodeViewRenderer } from 'svelte-tiptap';
import { mergeAttributes, Node, nodeInputRule } from '@tiptap/core';

import { api, me } from '@root/api';
import {
  getChatDetails,
  getCurioDetails,
  getNoteDetails,
  isChatPath,
  isCurioPath,
  isNotePath,
  toUrbitTime,
} from '@root/util';

import BlockGroupsReference from './BlockGroupsReference.svelte';

export default Node.create({
  name: 'block-groups-reference',

  group: 'block',
  content: 'block*',
  editable: false,
  selectable: false,
  inline: false,

  parseHTML() {
    return [{ tag: 'block-groups-reference' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'block-groups-reference',
      mergeAttributes(HTMLAttributes, { contenteditable: false }),
      0,
    ];
  },

  renderText({ node }) {
    return `{"ref":"${node.attrs.keyStr}"}`;
  },

  addNodeView() {
    return SvelteNodeViewRenderer(BlockGroupsReference);
  },

  addAttributes() {
    return {
      host: { default: '' },
      channel: { default: null },
      poster: { default: null },
      id: { default: null },
      type: { default: null },
      keyStr: { default: null },
    };
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: /\/1\/[A-Za-z]+\/[A-Za-z]+\/~[A-Za-z-]+\/[A-Za-z]+\/[A-Za-z]+\/~[A-Za-z-]+\/[0-9\.]+/i,
        type: this.type,
        getAttributes([match]) {
          if (isChatPath(match)) {
            return { ...getChatDetails(match), type: 'chat' };
          } else if (isCurioPath(match)) {
            return { ...getCurioDetails(match), type: 'curio' };
          } else if (isNotePath(match)) {
            return { ...getNoteDetails(match), type: 'note' };
          }
        },
      }),
    ];
  },

  addCommands() {
    return {
      saveReference: (attrs) => () => {
        const time = toUrbitTime(Date.now());
        api.portal.do.createGroupsChatMsg(
          attrs.host,
          attrs.channel,
          attrs.poster,
          attrs.id,
          time
        );
        const keyStr = `/groups-chat-msg/${me}//${time}`;
        this.editor.commands.updateAttributes('block-groups-reference', {
          keyStr,
        });
        return;
      },
    };
  },
});
