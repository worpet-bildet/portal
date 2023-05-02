import { derived, get, writable } from 'svelte/store';
import {
  getPortalItems,
  getContacts,
  getJoinedGroups,
  getInstalledApps,
  getFeed,
  getPals,
  scry,
  poke,
} from '@root/api';

export const INDEX_KEY = '/~worpet-bildet/list/nonitem/ship/index';

export let isLoaded = false;
export const state = writable({});
export const feed = writable({});

getPortalItems().then(({ items }) => {
  let s = {};
  items.forEach((i) => {
    s[i.keyStr] = i;
  });
  state.set(s);
  isLoaded = true;

  // TODO: group everything by a single curator maybe?
  // or add some filtering methods to get everything by a single curator
});

getContacts().then((contacts) => {
  state.update((s) => {
    s.profiles = contacts;
    return s;
  });
});

getJoinedGroups().then((groups) => {
  // for some reasons it's possible to get groups that don't have a title
  // so we filter them here to avoid showing useless info
  state.update((s) => {
    s.groups = Object.entries(groups || {}).filter(
      ([
        _,
        {
          meta: { title },
        },
      ]) => !!title
    );
    return s;
  });
});

getInstalledApps().then((apps) => {
  state.update((s) => {
    s.apps = apps;
    return s;
  });
});

getPals().then((pals) => {
  state.update((s) => {
    s.pals = pals.outgoing;
    return s;
  });
});

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
  return { ...mainCollection(patp), ...get(state)?.profiles?.[patp] };
};

// some janky keys here innit
export const getCuratorFeed = (patp) => {
  return getCuratorItemsByStruc(patp, '/other');
};

export const getCuratorCollections = (patp) => {
  return getCuratorItemsByStruc(patp, '/collection');
};

export const getCuratorItemsByStruc = (patp, struc) => {
  return mainCollection(patp)
    ?.bespoke?.['key-list']?.filter((k) => k.struc === struc)
    ?.map((k) => get(state)[keyStrFromObj(k)]);
};

export const getGroup = (groupkey) => {
  return get(state)[`/group/${groupkey}/`];
};

export const getItem = (listKey) => {
  return get(state)[listKey];
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
      state.update((s) => {
        if (!s.profiles) s.profiles = {};
        s.profiles[event.who] = event.con;
        return s;
      });
    default:
      break;
  }
};

const keyStrFromObj = ({ struc, ship, cord, time }) => {
  return `${struc}/${ship}/${cord}/${time}`;
};

const mainCollection = (patp) => get(state)[mainCollectionKey(patp)];
const mainCollectionKey = (patp) => `/collection/${patp}//~2000.1.1`;
