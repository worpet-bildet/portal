import { derived, get, writable } from 'svelte/store';
import { getItems, getFeed, getPals, scry } from '@root/api';

export const INDEX_KEY = '/~worpet-bildet/list/nonitem/ship/index';

export let isLoaded = false;
export const state = writable({});
export const feed = writable({});

getItems().then((items) => {
  console.log({ items });
});

// When we load the app we want to get the feed, this probably isn't the right
// place to do that though
// getFeed().then((feedList) => {
//   feedList.forEach((feedKey) => {
//     scry({
//       app: 'portal-store',
//       path: `/item${feedKey.keyStr}`,
//     }).then((res) => {
//       feed.update((items) => {
//         items[feedKey.keyStr] = { ...feedKey, ...res };
//         return items;
//       });
//     });
//   });
// });

// getPals().then((pals) => {
//   state.update((s) => {
//     s['pals'] = pals.outgoing;
//     return s;
//   });
// });

export const curatorNames = derived(
  state,
  (s, set) =>
    set(
      s[INDEX_KEY]?.item?.data?.bespoke?.payload?.map((p) => p?.keyObj?.ship) ||
        []
    ),
  []
);

export const getCurator = (patp) => {
  return get(state)[patp];
};

export const getItem = (listKey) => {
  return get(state)[listKey].item;
};

export const handleSubscriptionEvent = (event, type) => {
  console.log({ event, type });
  // switch (type) {
  //   case 'portal-nested-all-items':
  //     // we're going to flatten this to make our life easier
  //     state.set({ ...get(state), ...flattenMaps(event) });
  //     isLoaded = true;
  //     break;
  //   case 'portal-front-end-update':
  //     state.set({
  //       ...get(state),
  //       [event.keyStr]: { item: event.item, map: event.map },
  //     });
  //     if (event.keyStr.includes('list/list')) {
  //       state.set({
  //         ...get(state),
  //         [event.keyObj.ship]: { item: event.item, map: event.map },
  //       });
  //     }
  //     break;
  // }
  // console.log({ event });
};

const flattenMaps = (all) => {
  const new_all = {};
  /*
  The structure we have looks like this
  {
    [list_list]: {
      map: {
        [list_item]: {
          map: {
            [item]
          }
        }
      }
    }
  }
  And we want to flatten everything so that it looks like
  {
    [patp]: {...list_list},
    [list_item]: {},
    [item]: {}
  }

  We could probably do this recursively but it's not really necessary
  */
  for (let list_list in all) {
    new_all[all[list_list].item.keyObj.ship] = all[list_list];
    for (let list_item in all[list_list].map) {
      new_all[list_item] = all[list_list].map[list_item];
      for (let item in all[list_list].map[list_item].map) {
        new_all[item] = { item: all[list_list].map[list_item].map[item] };
      }
    }
  }
  return new_all;
};
