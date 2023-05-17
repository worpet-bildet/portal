import { get, writable } from 'svelte/store';
import {
  getPortalItems,
  getContacts,
  getContact,
  getJoinedGroups,
  getInstalledApps,
  getPals,
  subscribeToGroup,
} from '@root/api';
import config from '@root/config';
import { fromUrbitTime } from '@root/util';

export const state = writable({});
export const feed = writable({});

export const refreshPortalItems = () => {
  getPortalItems().then(({ items }) => {
    state.update((s) => {
      items.forEach((i) => {
        s[i.keyStr] = i;
      });
      s.isLoaded = true;
      return s;
    });
  });
};

export const refreshContacts = () => {
  getContacts().then((contacts) => {
    state.update((s) => {
      s.profiles = contacts;
      // also mush this into the state because it's easier when dealing with
      // multiple struc types at other places in the app
      Object.entries(contacts).forEach(([key, data]) => {
        const keyStr = `/ship/${key}//`;
        s[keyStr] = {
          ...s[keyStr],
          bespoke: { ...data },
          keyObj: keyStrToObj(keyStr),
        };
      });
      return s;
    });
  });
};

export const refreshGroups = () => {
  getJoinedGroups().then((groups) => {
    // for some reasons it's possible to get groups that don't have a title
    // so we filter them here to avoid showing useless info
    let _groups = {};
    state.update((s) => {
      Object.entries(groups || {})
        .map((g) => {
          let [
            key,
            {
              meta: { title },
            },
          ] = g;
          if (!title) {
            g[1].joining = true;
          }
          return g;
        })
        .forEach(([key, data]) => {
          // we should subscribe to the group here
          if (!s[`/group/${key}/`]) subscribeToGroup(key);
          _groups[key] = data;
        });
      s.groups = _groups;
      return s;
    });
  });
};

export const refreshApps = () => {
  const EXCLUDE_APPS = [
    'base',
    'garden',
    'groups',
    'kids',
    'landscape',
    'webterm',
  ];
  getInstalledApps().then(([{ initial }, kiln]) => {
    let apps = {};
    state.update((s) => {
      Object.entries(initial).forEach(([key, data]) => {
        if (EXCLUDE_APPS.includes(key)) return;
        data.ship = kiln[key]?.sync?.ship;
        if (!data.ship) return;
        apps[key] = data;
        // TODO: subscribe to the app here
      });
      s.apps = apps;
      return s;
    });
  });
};

export const refreshPals = async () => {
  try {
    const pals = await getPals();
    Object.keys(pals.outgoing).forEach((p) => {
      const shipKey = `/ship/~${p}//`;
      if (get(state[shipKey])?.bespoke) return; // don't bother if we already know you
      getContact(`~${p}`)
        .then((profile) => {
          state.update((s) => {
            s[shipKey] = { ...s[shipKey], bespoke: profile };
            return s;
          });
        })
        .catch((e) => {
          // we can safely ignore this error, they are likely to just be offline
        });
    });
    state.update((s) => {
      s.pals = pals.outgoing;
      s.palsLoaded = true;
      return s;
    });
  } catch (e) {
    state.update((s) => {
      s.palsLoaded = true;
      return s;
    });
  }
};

export const getCurator = (patp) => {
  return { ...get(state)?.[`/ship/${patp}//`] };
};

export const getCuratorFeed = (patp) => {
  return get(state)[feedKey(patp)]?.bespoke?.feed?.sort(
    (a, b) => fromUrbitTime(b.time) - fromUrbitTime(a.time)
  );
};

export const getGlobalFeed = () => {
  return get(state)[globalFeedKey(config.indexer)]?.bespoke?.feed?.sort(
    (a, b) => fromUrbitTime(b.time) - fromUrbitTime(a.time)
  );
};

export const getCuratorCollections = (patp) => {
  return get(state)
    [mainCollectionKey(patp)]?.bespoke?.['key-list']?.filter((k) => {
      return k.struc === 'collection';
    })
    ?.filter((k) => k.time !== '~2000.1.1')
    ?.filter((k) => k.time !== 'index');
};

export const getCuratorFeaturedCollection = (patp) => {
  return getCuratorCollections(patp).slice(0, 1);
};

export const getCuratorItemsByStruc = (patp, struc) => {
  return Object.keys(get(state))
    .filter((k) => k.includes(`${struc}/${patp}`))
    .map((k) => get(state)[k]);
};

export const getGroup = (groupKey) => {
  return get(state)[`/group/${groupKey}/`];
};

export const getItem = (listKey) => {
  return get(state)[listKey];
};

// export const getProfile = (ship) => {
//   return get(state).profiles?.[ship];
// };

export const getCollectionItems = (collectionKey) => {
  return get(state)[collectionKey]?.bespoke?.['key-list'];
};

export const getJoinedGroupDetails = (groupKey) => {
  return get(state).groups?.[groupKey];
};

export const handleSubscriptionEvent = (event, type) => {
  console.log({ event, type });
  switch (type) {
    case 'portal-update':
      state.update((s) => {
        s[event.keyStr] = event;
        return s;
      });
    case 'contact-news':
    // refreshContacts();
    case 'charge-update':
      refreshApps();
    case 'group-action-0' || 'group-leave':
      refreshGroups();
    default:
      break;
  }
};

export const keyStrFromObj = ({ struc, ship, cord, time }) => {
  return `/${struc}/${ship}/${cord}/${time}`;
};

export const keyStrToObj = (str) => {
  const parts = str.split('/');
  return {
    struc: parts[1],
    ship: parts[2],
    cord: parts[3],
    time: parts[4],
  };
};

const mainCollection = (patp) => get(state)[mainCollectionKey(patp)];
const mainCollectionKey = (patp) => `/collection/${patp}//~2000.1.1`;
const feedKey = (patp) => `/feed/${patp}//~2000.1.1`;
const globalFeedKey = (indexer) => `/feed/${indexer}//global`;

export const refreshAll = () => {
  refreshPortalItems();
  // refreshContacts();
  refreshApps();
  refreshGroups();
  refreshPals();
};
refreshAll();
