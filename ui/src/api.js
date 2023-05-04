import Urbit from '@urbit/http-api';

export const api = new Urbit('', '', 'portal');
api.ship = window.ship;

export const poke = (p) => api.poke(p);
export const scry = (s) => api.scry(s);
export const me = `~${api.ship}`;

export const getPortalItems = () => {
  return scry({
    app: 'portal-store',
    path: '/items',
  });
};

export const getContacts = () => {
  return scry({
    app: 'contacts',
    path: '/all',
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
    mark: 'json',
  });
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

export const subscribeToCurator = (patp) => {
  console.log('SUBSCRIBING TO ', patp);
  return poke({
    app: 'portal-manager',
    mark: 'portal-action',
    json: {
      sub: {
        key: {
          struc: 'collection',
          ship: patp,
          cord: '~2000.1.1',
          time: '',
        },
      },
    },
  });
};

export const subscribeToGroup = (key) => {
  let parts = key.split('/');
  poke({
    app: 'portal-manager',
    mark: 'portal-action',
    json: {
      sub: {
        key: {
          struc: 'group',
          ship: parts[0],
          cord: parts[1],
          time: '',
        },
      },
    },
  });
};

export const subscribeToItem = (keyObj) => {
  poke({
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

export const usePortalSubscription = (onEvent) => {
  const portalSub = api.subscribe({
    app: 'portal-store',
    path: '/updates',
    ship: api.ship,
    verbose: true,
    event: onEvent,
    err: console.error,
    quit: console.error,
  });

  return () => api?.unsubscribe(portalSub);
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
