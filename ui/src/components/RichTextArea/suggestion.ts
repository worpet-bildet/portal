import {
  getCollectedItemLeaderboard,
  getItem,
  items as getItems,
} from '@root/state';
import { getMeta, matchItem } from '@root/util';

import { sigVisible, sigItems, sigLocation, sigProps } from './stores';

export default {
  items: ({ query }) => {
    const items = Object.values(getItems())
      .filter((i) => ['app', 'group', 'collection'].includes(i?.keyObj?.struc))
      .map(getMeta)
      .filter((i) => !!i.title)
      .map((i) => ({
        ...i,
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .insertContentAt(
              {
                from: range.from,
                to: range.to + query.length,
              },
              [
                { type: 'inline-item-reference', attrs: { ...i } },
                { type: 'text', text: ' ' },
              ]
            )
            .run();
        },
      }));

    // seems dumb that we go back and forth between item and meta
    return items
      .filter((i) => {
        return matchItem(getItem(i.keyStr), query);
      })
      .slice(0, 10);
  },

  render: () => {
    return {
      onStart: (props) => {
        let editor = props.editor;
        let range = props.range;
        let location = props.clientRect();

        const parent = document.getElementById('main');
        const parentPos = parent.getBoundingClientRect();
        const relativePos = { y: 0, x: 0 };

        relativePos.y = location.top + parent.scrollTop;
        relativePos.x = location.left - parentPos.left + 15;

        sigProps.set({ editor, range });
        sigVisible.set(true);
        sigLocation.set({
          x: relativePos.x,
          y: relativePos.y,
          height: location.height,
        });
        sigItems.set(props.items);
      },

      onUpdate(props) {
        sigItems.set(props.items);
      },

      onKeyDown(props) {
        if (props.event.key === 'Escape') {
          sigVisible.set(false);
          return true;
        }
      },

      onExit() {
        sigVisible.set(false);
      },
    };
  },
};
