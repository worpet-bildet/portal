import Urbit from '@urbit/http-api';

export const api = new Urbit('', '', 'portal');
api.ship = window.ship;

export const poke = (p) => api.poke(p);
export const scry = (s) => api.scry(s);
export const me = `~${api.ship}`;

export const getItems = () => {
  return scry({
    app: 'portal-store',
    path: '/items',
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

export const subscribeToCurator = (patp) => {
  return poke({
    app: 'portal-manager',
    mark: 'portal-action',
    json: {
      sub: {
        key: {
          ship: patp,
          type: '/list/list',
          cord: '~2000.1.1',
        },
      },
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
