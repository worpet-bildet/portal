import Urbit from '@urbit/http-api';

export const api = new Urbit('', '', 'portal');
api.ship = window.ship;

export const poke = (p) => api.poke(p);
export const scry = (s) => api.scry(s);
export const me = `~${api.ship}`;
let subqueue = [];
setInterval(() => {
  if (subqueue.length > 0) {
    poke(subqueue.shift());
  }
}, 1000);

export const getPortalItems = () => {
  return scry({
    app: 'portal-store',
    path: '/items',
  });
};

export const getSocialItems = () => {
  return scry({
    app: 'portal-graph',
    path: '/app/portal-store',
  });
};

export const getContacts = () => {
  return scry({
    app: 'contacts',
    path: '/all',
  });
};

export const getContact = (patp) => {
  return scry({
    app: 'contacts',
    path: `/contact/${patp}`,
  });
};

export const getInstalledApps = () => {
  return Promise.all([
    scry({
      app: 'docket',
      path: '/charges',
    }),
    scry({
      app: 'hood',
      path: '/kiln/pikes',
    }),
  ]);
};

export const getJoinedGroups = () => {
  return scry({
    app: 'groups',
    path: '/groups',
  });
};

export const getFeed = () => {
  return scry({
    app: 'portal-manager',
    path: '/feed',
  });
};

export const getPals = () => {
  return scry({
    app: 'pals',
    path: '/json',
  });
};

export const getHeapItems = (heap) => {
  return scry({
    app: 'heap',
    path: `/heap/${heap}/curios/newest/10`,
  });
};

export const getStorageConfiguration = () => {
  return Promise.all([
    scry({
      app: 'storage',
      path: '/configuration',
    }),
    scry({
      app: 'storage',
      path: '/credentials',
    }),
  ]);
};

export const addPal = (patp) => {
  return poke({
    app: 'pals',
    mark: 'pals-command',
    json: { meet: { ship: patp, in: [] } },
  });
};

export const removePal = (patp) => {
  return poke({
    app: 'pals',
    mark: 'pals-command',
    json: { part: { ship: patp, in: [] } },
  });
};

export const joinGroup = (group) => {
  return poke({
    app: 'groups',
    mark: 'group-join',
    json: { flag: group, 'join-all': true },
  });
};

export const leaveGroup = (group) => {
  return poke({
    app: 'groups',
    mark: 'group-leave',
    json: group,
  });
};

export const requestRadioChannels = () => {
  return poke({
    app: 'tower',
    mark: 'greg-event',
    json: { request: null },
  });
};

export const subscribeToFeed = (patp) => {
  return subscribeToItem({
    struc: 'feed',
    ship: patp,
    time: '~2000.1.1',
    cord: '',
  });
};

export const subscribeToMainCollection = (patp) => {
  return subscribeToItem({
    struc: 'collection',
    ship: patp,
    time: '~2000.1.1',
    cord: '',
  });
};

export const subscribeToCurator = (patp) => {
  subscribeToContactProfile(patp);
  subscribeToFeed(patp);
  subscribeToMainCollection(patp);
};

export const subscribeToGroup = (key) => {
  let parts = key.split('/');
  return subscribeToItem({
    struc: 'group',
    ship: parts[0],
    cord: parts[1],
    time: '',
  });
};

export const subscribeToItem = (keyObj) => {
  subqueue.push({
    app: 'portal-manager',
    mark: 'portal-action',
    json: {
      sub: {
        key: keyObj,
      },
    },
  });
};

export const subscribeToContactProfile = (patp) => {
  poke({
    app: 'contacts',
    mark: 'contact-action',
    json: {
      heed: [patp],
    },
  });
};

export const usePortalStoreSubscription = (onEvent) => {
  const portalStoreSub = api.subscribe({
    app: 'portal-store',
    path: '/updates',
    ship: api.ship,
    verbose: true,
    event: onEvent,
    err: console.error,
    quit: console.error,
  });

  return () => api?.unsubscribe(portalStoreSub);
};

export const usePortalManagerSubscription = (onEvent) => {
  const portalManagerSub = api.subscribe({
    app: 'portal-manager',
    path: '/updates',
    ship: api.ship,
    verbose: true,
    event: onEvent,
    err: console.error,
    quit: console.error,
  });

  return () => api?.unsubscribe(portalManagerSub);
};

export const useSocialSubscription = (onEvent) => {
  const socialSub = api.subscribe({
    app: 'portal-graph',
    path: '/updates',
    ship: api.ship,
    verbose: true,
    event: onEvent,
    err: console.error,
    quit: console.error,
  });

  return () => api?.unsubscribe(socialSub);
};

export const useContactsSubscription = (onEvent) => {
  const contactsSub = api.subscribe({
    app: 'contacts',
    path: '/news',
    ship: api.ship,
    verbose: true,
    event: onEvent,
    err: console.error,
    quit: console.error,
  });

  return () => api?.unsubscribe(contactsSub);
};

export const useGroupsSubscription = (onEvent) => {
  const groupsSub = api.subscribe({
    app: 'groups',
    path: '/groups',
    ship: api.ship,
    verbose: true,
    event: onEvent,
    err: console.error,
    quit: console.error,
  });

  return () => api?.unsubscribe(groupsSub);
};

export const useDocketSubscription = (onEvent) => {
  const docketSub = api.subscribe({
    app: 'docket',
    path: '/charges',
    ship: api.ship,
    verbose: true,
    event: onEvent,
    err: console.error,
    quit: console.error,
  });

  return () => api?.unsubscribe(docketSub);
};

export const useRadioSubscription = (onEvent) => {
  const radioSub = api.subscribe({
    app: 'tower',
    path: '/greg/local',
    ship: api.ship,
    verbose: true,
    event: onEvent,
    err: console.error,
    quit: console.error,
  });

  return () => api?.unsubscribe(radioSub);
};

export const useStorageSubscription = (onEvent) => {
  const storageSub = api.subscribe({
    app: 'storage',
    path: '/all',
    ship: api.ship,
    verbose: true,
    event: onEvent,
    err: console.error,
    quit: console.error,
  });

  return () => api?.unsubscribe(storageSub);
};
