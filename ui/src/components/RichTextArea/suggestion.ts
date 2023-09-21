import { getCollectedItemLeaderboard, getItem } from '@root/state';
import { getMeta } from '@root/util';

import { sigVisible, sigItems, sigLocation, sigProps } from './stores';

export default {
  items: ({ query }) => {
    const items = Object.values(getCollectedItemLeaderboard())
      .map((i) => getItem(i[0]))
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

    return items
      .filter((i) => i.title.toLowerCase().startsWith(query.toLowerCase()))
      .slice(0, 10);
  },

  render: () => {
    return {
      onStart: (props) => {
        let editor = props.editor;
        let range = props.range;
        let location = props.clientRect();
        sigProps.set({ editor, range });
        sigVisible.set(true);
        sigLocation.set({
          x: location.x,
          y: location.y,
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
