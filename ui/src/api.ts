import { DocketAppResponse, KilnApps } from '$types/apps/app';
import { IncomingPals, OutgoingPals } from '$types/apps/pals';
import { ItemKey, Item } from '$types/portal/item';
import { SocialGraph } from '$types/portal/graph';
import { ContactRolodex } from '$types/landscape/contact';
import { Groups } from '$types/landscape/groups';
import { ChatMessage } from '$types/landscape/chat';
import { DiaryNote } from '$types/landscape/diary';
import { HeapCurio } from '$types/landscape/heap';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import Urbit from '@urbit/http-api';
import { writable } from 'svelte/store';
import { toUrbitTime } from '@root/util';

export const urbit = new Urbit('', '', 'portal');
urbit.ship = window.ship;

export const poke = (s) => urbit.poke(s);
export const scry = (s) => urbit.scry(s);

export const me = `~${urbit.ship}`;

// we use this a lot
export const pmPoke = (json) =>
  poke({
    app: 'portal-manager',
    mark: 'portal-action',
    json,
  });

let subqueue = writable<ItemKey[]>([]);
let subscribingTo = {};
export const subscribeToItem = (keyObj: ItemKey) => {
  if (keyObj.time === 'all') return; // FIXME a bit hacky
  if (subscribingTo[JSON.stringify(keyObj)]) return;
  subscribingTo[JSON.stringify(keyObj)] = true;
  subqueue.update((q) => [...q, keyObj]);
};

export const api = {
  urbit: {
    get: {
      installedApps: (): Promise<[DocketAppResponse, KilnApps]> =>
        Promise.all([
          scry({ app: 'docket', path: '/charges' }),
          scry({ app: 'hood', path: '/kiln/pikes' }),
        ]),
      contacts: (): Promise<ContactRolodex> =>
        scry({ app: 'contacts', path: '/all' }),
      joinedGroups: (): Promise<Groups> =>
        scry({ app: 'groups', path: '/groups' }),
      storageConfig: () =>
        Promise.all([
          scry({ app: 'storage', path: '/configuration' }),
          scry({ app: 'storage', path: '/credentials' }),
        ]),
    },
    do: {
      installApp: (desk) =>
        Promise.all([
          poke({
            app: 'docket',
            mark: 'docket-install',
            json: `${me}/${desk}`,
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
      all: (): Promise<{
        incoming: IncomingPals;
        outgoing: OutgoingPals;
      }> => scry({ app: 'pals', path: '/json' }),
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
      all: (): Promise<string[]> => scry({ app: 'blog', path: '/pages' }),
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
      items: (): Promise<{ items: Item[] }> =>
        scry({ app: 'portal-store', path: '/items' }),
      appDevs: () => scry({ app: 'portal-manager', path: '/portal-devs' }),
      socialItems: (): Promise<{ app: SocialGraph }> =>
        scry({ app: 'portal-graph', path: '/app/portal-store' }),
      boughtApps: () => scry({ app: 'portal-manager', path: '/bought-apps' }),
      receivingAddress: (): Promise<string> =>
        scry({ app: 'portal-manager', path: '/receiving-address' }),
      processingPayments: () =>
        scry({ app: 'portal-manager', path: '/processing-payments' }),
      processedPayments: () =>
        scry({ app: 'portal-manager', path: '/processed-payments' }),
      chatMessage: (path): Promise<ChatMessage> =>
        scry({ app: 'portal-manager', path }),
      //  link from groups we are scrying for:
      // /heap/~toptyr-bilder/links/curios/curio/id/170.141.184.506.270.899.144.208.463.636.562.182.144
      heapCurio: (path): Promise<HeapCurio> => scry({ app: 'heap', path }),
      //  /1/chan/diary/~worpet-bildet/announcements/note/170141184506311745994155289567817629696
      diaryNote: (path): Promise<DiaryNote> => scry({ app: 'diary', path }),
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
      subscribe: (keyObj: ItemKey) => subscribeToItem(keyObj),
      subscribeToMany: (keys: ItemKey[]) =>
        pmPoke({ 'sub-to-many': { 'key-list': keys } }),
      subscribeToBlog: () => pmPoke({ 'blog-sub': null }),
      requestPayment: (seller, desk) =>
        pmPoke({ 'payment-request': { seller, desk } }),
      confirmPayment: (seller, txHash) =>
        pmPoke({ 'payment-tx-hash': { seller, 'tx-hash': txHash } }),
      setReceivingAddress: (addr) =>
        pmPoke({ 'set-receiving-address': { 'receiving-address': addr } }),
      tipRequest: (keyObj) =>
        pmPoke({
          'tip-request': {
            key: keyObj,
          },
        }),
      tipTxHash: (beneficiary, txHash, note) =>
        pmPoke({
          'tip-tx-hash': {
            beneficiary: beneficiary,
            'tx-hash': txHash,
            note,
          },
        }),
      //  here use 'create' in the following way:
      //  bespoke should specify channel and id, and other args should be empty
      //  everything else can be done as usual with create
      //  this example creates the message which is scried for in the `chatMessage` scry
      createGroupsChatMsg: (host, channel, poster, id, time) =>
        pmPoke({
          create: {
            bespoke: {
              'groups-chat-msg': {
                group: '',
                channel: { p: host, q: channel },
                id: { p: poster, q: id },
                content: '',
                feels: 0,
                replies: 0,
              },
            },
            time,
          },
        }),
      // /1/chan/heap/~toptyr-bilder/links/curio/170141184506270899144208463636562182144
      createGroupsHeapCurio: (host, channel, id, time) =>
        pmPoke({
          create: {
            bespoke: {
              'groups-heap-curio': {
                group: '',
                channel: { p: host, q: channel },
                time: id,
                heart: '',
                feels: 0,
                replies: 0,
              },
            },
            time,
          },
        }),
      //  /1/chan/diary/~worpet-bildet/announcements/note/170141184506311745994155289567817629696
      createGroupsDiaryNote: (host, channel, id, time) =>
        pmPoke({
          create: {
            bespoke: {
              'groups-diary-note': {
                group: '',
                channel: { p: host, q: channel },
                time: id,
                essay: '',
                feels: 0,
                replies: 0,
              },
            },
            time,
          },
        }),
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
          region: s3.configuration.region || 'a',
        });
        const command = new PutObjectCommand(params);
        await client.send(command);
        if (s3.credentials.endpoint.slice(-1) === '/') {
          return `${s3.credentials.endpoint}${params.Bucket}/${params.Key}`;
        }
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

export const useSubscription = (app, path, onEvent) => {
  const sub = urbit.subscribe({
    app,
    path,
    event: onEvent,
    err: console.error,
    quit: console.error,
  });
  return async () => urbit.unsubscribe(await sub);
};

export const usePortalStoreSubscription = (onEvent) =>
  useSubscription('portal-store', '/updates', onEvent);

export const usePortalManagerSubscription = (onEvent) =>
  useSubscription('portal-manager', '/updates', onEvent);

export const useSocialSubscription = (onEvent) =>
  useSubscription('portal-graph', '/updates', onEvent);

export const useContactsSubscription = (onEvent) =>
  useSubscription('contacts', '/news', onEvent);

export const useGroupsSubscription = (onEvent) =>
  useSubscription('groups', '/groups', onEvent);

export const useDocketSubscription = (onEvent) =>
  useSubscription('docket', '/charges', onEvent);

export const useRadioSubscription = (onEvent) =>
  useSubscription('tower', '/greg/local', onEvent);

export const useStorageSubscription = (onEvent) =>
  useSubscription('storage', '/all', onEvent);
