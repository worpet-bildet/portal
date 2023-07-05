import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import Urbit from '@urbit/http-api';
import { writable, get } from 'svelte/store';
import { toUrbitTime } from '@root/util';

export const urbit = new Urbit('', '', 'portal');
urbit.ship = window.ship;

export const poke = (s) => urbit.poke(s);
export const scry = (s) => urbit.scry(s);

export const me = `~${urbit.ship}`;

// we use this a lot
export const pmPoke = (json) => {
  return poke({
    app: 'portal-manager',
    mark: 'portal-action',
    json,
  });
};

let subqueue = writable([]);
let subscribingTo = {};

export const subscribeToItem = (keyObj) => {
  if (keyObj.time === 'all') return; // FIXME a bit hacky
  if (subscribingTo[JSON.stringify(keyObj)]) return;
  subscribingTo[JSON.stringify(keyObj)] = true;
  subqueue.update((q) => [...q, keyObj]);
};

export const api = {
  urbit: {
    get: {
      installedApps: () =>
        Promise.all([
          scry({ app: 'docket', path: '/charges' }),
          scry({ app: 'hood', path: '/kiln/pikes' }),
        ]),
      contacts: () => scry({ app: 'contacts', path: '/all' }),
      joinedGroups: () => scry({ app: 'groups', path: '/groups' }),
      storageConfig: () =>
        Promise.all([
          scry({ app: 'storage', path: '/configuration' }),
          scry({ app: 'storage', path: '/credentials' }),
        ]),
    },
    do: {
      installApp: (ship, desk) =>
        Promise.all([
          poke({
            app: 'docket',
            mark: 'docket-install',
            json: `${ship}/${desk}`,
          }),
          poke({ app: 'hood', mark: 'kiln-install', json: desk }),
          poke({ app: 'hood', mark: 'kiln-revive', json: desk }),
        ]),
      uninstallApp: (desk) =>
        Promise.all([
          poke({ app: 'docket', mark: 'docket-uninstall', json: desk }),
          poke({ app: 'hood', mark: 'kiln-uninstall', json: { desk } }),
        ]),
      joinGroup: (path) =>
        poke({
          app: 'groups',
          mark: 'group-join',
          json: { flag: path, 'join-all': true },
        }),
      leaveGroup: (path) =>
        poke({ app: 'groups', mark: 'group-leave', json: path }),
      meetContact: (ship) =>
        poke({
          app: 'contacts',
          mark: 'contact-action',
          json: { heed: [ship] },
        }),
      editProfile: (fields) =>
        poke({
          app: 'contacts',
          mark: 'contact-action',
          json: {
            edit: fields,
          },
        }),
    },
  },
  pals: {
    get: {
      all: () => scry({ app: 'pals', path: '/json' }),
    },
    do: {
      add: (ship) =>
        poke({
          app: 'pals',
          mark: 'pals-command',
          json: { meet: { ship, in: [] } },
        }),
      remove: (ship) =>
        poke({
          app: 'pals',
          mark: 'pals-command',
          json: { part: { ship, in: [] } },
        }),
    },
  },
  blog: {
    get: {
      all: () => scry({ app: 'blog', path: '/pages' }),
    },
  },
  radio: {
    do: {
      requestChannels: () =>
        poke({ app: 'tower', mark: 'greg-event', json: { request: null } }),
    },
  },
  portal: {
    get: {
      items: () => scry({ app: 'portal-store', path: '/items' }),
      appDevs: () => scry({ app: 'portal-manager', path: '/portal-devs' }),
      socialItems: () =>
        scry({ app: 'portal-graph', path: '/app/portal-store' }),
      boughtApps: () => scry({ app: 'portal-manager', path: '/bought-apps' }),
    },
    do: {
      create: (json) => pmPoke({ create: json }),
      edit: (json) => pmPoke({ edit: json }),
      addTag: (json) => pmPoke({ 'add-tag-request': json }),
      trackSocialGraph: (json) =>
        poke({
          app: 'portal-graph',
          mark: 'social-graph-track',
          json: { start: json },
        }),
      subscribe: (keyObj) => subscribeToItem(keyObj),
      subscribeToMany: (keys) =>
        pmPoke({ 'sub-to-many': { 'key-list': keys } }),
      subscribeToBlog: () => pmPoke({ 'blog-sub': null }),
      requestPayment: (seller, desk) =>
        pmPoke({ 'payment-request': { seller, desk } }),
      confirmPayment: (seller, txHash) =>
        pmPoke({ 'payment-tx-hash': { seller, 'tx-hash': txHash } }),
    },
  },
  s3: {
    do: {
      uploadImage: async (file, s3) => {
        const fileParts = file.name.split('.');
        const fileName = fileParts.slice(0, -1);
        const fileExtension = fileParts.pop();
        const timestamp = toUrbitTime(new Date()).slice(1);

        const params = {
          Bucket: s3.configuration.currentBucket,
          Key: `${me}/${timestamp}-${fileName}.${fileExtension}`,
          Body: file,
          ACL: 'public-read',
          ContentType: file.type,
        };

        let client = new S3Client({
          credentials: s3.credentials,
          endpoint: s3.credentials.endpoint,
          region: s3.configuration.region,
        });
        const command = new PutObjectCommand(params);
        await client.send(command);

        return `${s3.credentials.endpoint}/${params.Bucket}/${params.Key}`;
      },
    },
  },
  link: {
    get: {
      metadata: async (url) => {
        const proxyUrl = 'https://preview.foddur-hodler.one/v2';
        const data = await fetch(`${proxyUrl}?url=${url}`)
          .then((res) => res.json())
          .then((r) => r.metadata);
        return data;
      },
    },
  },
};

export const mockData = {};

let timeout;
subqueue.subscribe((q) => {
  const sub = (_q) => {
    if (!_q.length) return;
    api.portal.do.subscribeToMany(_q);
    subqueue.set([]);
  };
  if (q.length >= 50) {
    sub(q);
  } else {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => sub(q), 3 * 1000);
  }
});

export const usePortalStoreSubscription = (onEvent) => {
  const portalStoreSub = urbit.subscribe({
    app: 'portal-store',
    path: '/updates',
    event: onEvent,
    err: console.error,
    quit: console.error,
  });

  return () => api?.unsubscribe(portalStoreSub);
};

export const usePortalManagerSubscription = (onEvent) => {
  const portalManagerSub = urbit.subscribe({
    app: 'portal-manager',
    path: '/updates',
    event: onEvent,
    err: console.error,
    quit: console.error,
  });

  return () => api?.unsubscribe(portalManagerSub);
};

export const useSocialSubscription = (onEvent) => {
  const socialSub = urbit.subscribe({
    app: 'portal-graph',
    path: '/updates',
    event: onEvent,
    err: console.error,
    quit: console.error,
  });

  return () => api?.unsubscribe(socialSub);
};

export const useContactsSubscription = (onEvent) => {
  const contactsSub = urbit.subscribe({
    app: 'contacts',
    path: '/news',
    event: onEvent,
    err: console.error,
    quit: console.error,
  });

  return () => api?.unsubscribe(contactsSub);
};

export const useGroupsSubscription = (onEvent) => {
  const groupsSub = urbit.subscribe({
    app: 'groups',
    path: '/groups',
    event: onEvent,
    err: console.error,
    quit: console.error,
  });

  return () => api?.unsubscribe(groupsSub);
};

export const useDocketSubscription = (onEvent) => {
  const docketSub = urbit.subscribe({
    app: 'docket',
    path: '/charges',
    event: onEvent,
    err: console.error,
    quit: console.error,
  });

  return () => api?.unsubscribe(docketSub);
};

export const useRadioSubscription = (onEvent) => {
  const radioSub = urbit.subscribe({
    app: 'tower',
    path: '/greg/local',
    event: onEvent,
    err: console.error,
    quit: console.error,
  });

  return () => api?.unsubscribe(radioSub);
};

export const useStorageSubscription = (onEvent) => {
  const storageSub = urbit.subscribe({
    app: 'storage',
    path: '/all',
    event: onEvent,
    err: console.error,
    quit: console.error,
  });

  return () => api?.unsubscribe(storageSub);
};
