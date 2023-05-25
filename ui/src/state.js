import { get, writable } from 'svelte/store';
import {
  getPortalItems,
  getSocialItems,
  getContacts,
  getJoinedGroups,
  getInstalledApps,
  getPals,
  subscribeToGroup,
  requestRadioChannels,
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

export const refreshSocialItems = () => {
  getSocialItems().then((items) => {
    console.log({ social: items.app });
    state.update((s) => {
      s.social = items.app;
      return s;
    });
  });
};

export const refreshContacts = () => {
  getContacts().then((contacts) => {
    state.update((s) => {
      s.profiles = contacts;
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
      Object.entries(groups || {}).forEach((g) => {
        let [key, data] = g;
        let {
          meta: { title },
        } = data;
        if (!title) {
          g[1].joining = true;
        }
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

export const refreshRadioChannels = () => {
  // we receive the response to this in teh subscription handler below
  requestRadioChannels();
};

export const getCurator = (patp) => {
  return {
    keyObj: { ship: patp, struc: 'ship', cord: '', time: '' },
    bespoke: { ...get(state)?.profiles?.[patp] },
  };
};

export const getProfile = (patp) => {
  return get(state)?.profiles?.[patp];
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
    ?.filter((k) => k.time !== 'index')
    ?.filter((k) => k.time !== 'all');
};

export const getCuratorAllCollectionItems = (patp) => {
  return getCollectionItems(allCollectionKey(patp));
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

export const getReplies = (ship, key) => {
  return get(state).social?.[`/${ship}/reply-from`]?.[keyStrFromObj(key)];
};

export const handleSubscriptionEvent = (event, type) => {
  console.log({ event, type });
  switch (type) {
    case 'portal-update':
      state.update((s) => {
        s[event.keyStr] = event;
        return s;
      });
      break;
    case 'social-graph-result':
      state.update((s) => {
        for (let socialKey in event.app) {
          for (let socialUpdate in event.app[socialKey]) {
            if (!s.social[socialKey]) s.social[socialKey] = {};
            if (!s.social[socialKey][socialUpdate]) {
              s.social[socialKey][socialUpdate] = [];
            }
            s.social[socialKey][socialUpdate] = [
              ...s.social[socialKey][socialUpdate],
              ...event.app[socialKey][socialUpdate],
            ];
          }
        }
        console.log({ social: s.social });
        return s;
      });
      break;
    case 'contact-news':
      state.update((s) => {
        s.profiles[event.who] = event.con;
        return s;
      });
      break;
    case 'charge-update':
      refreshApps();
      break;
    case 'group-action-0' || 'group-leave':
      refreshGroups();
      break;
    case 'greg-event':
      state.update((s) => {
        s.radioStations = event.response;
        return s;
      });
      break;
    default:
      break;
  }
};

export const groupKeyToItemKey = (groupKey) => {
  const parts = groupKey.split('/');
  return `/group/${parts[0]}/${parts[1]}/`;
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
const allCollectionKey = (patp) => `/collection/${patp}//all`;
const feedKey = (patp) => `/feed/${patp}//~2000.1.1`;
const globalFeedKey = (indexer) => `/feed/${indexer}//global`;

export const refreshAll = () => {
  refreshPortalItems();
  refreshSocialItems();
  refreshContacts();
  // refreshProfile(me);
  refreshApps();
  refreshGroups();
  refreshPals();
  refreshRadioChannels();
};
refreshAll();
