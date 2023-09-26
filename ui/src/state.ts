import {
  ItemKey,
  Item,
  ItemCollection,
  FeedItem,
  ItemStruc,
} from '$types/portal/item';
import { HarkNotificationDestination } from '$types/portal/notification';
import { SocialGraph } from '$types/portal/graph';
import { DocketApps } from '$types/apps/app';
import { OutgoingPals } from '$types/apps/pals';
import { Contact, ContactRolodex } from '$types/landscape/contact';
import { Group, Groups } from '$types/landscape/groups';
import { State } from '$types/state';

import { uniqBy } from 'lodash';
import { get, writable } from 'svelte/store';

import config from '@root/config';
import { save, load } from '@root/storage';
import { api } from '@root/api';
import { scoreItems } from '@root/ai';
import { fromUrbitTime } from '@root/util';

export const state = writable<State>({ ...load() });

export const items = (): ItemCollection => get(state).items || {};
export const social = (): SocialGraph => get(state).social || {};
export const groups = (): Groups => get(state).groups || {};
export const apps = (): DocketApps => get(state).apps || {};
export const contacts = (): ContactRolodex => get(state).contacts || {};
export const pals = (): OutgoingPals => get(state).pals || {};

export const updateNotificationsLastChecked = (): void => {
  state.update((s) => {
    let currentTime = new Date();
    s.notificationsLastChecked = currentTime.toString();
    save({ notificationsLastChecked: currentTime });
    return s;
  });
};

export const toggleMuteNotifications = (): void => {
  state.update((s) => {
    s.muteNotifications = !s.muteNotifications;
    save({ muteNotifications: s.muteNotifications });
    return s;
  });
};

export const toggleDarkmode = (): void => {
  state.update((s) => {
    s.darkmode = !s.darkmode;
    save({ darkmode: s.darkmode });
    return s;
  });
};

// In theory this could return the scored version of the feed so that we can do
// the filtering inside the ai file -- this whole system is a bit of a mess
export const reScoreItems = (
  positivePrompt: string,
  negativePrompt: string
): Promise<void> => {
  return new Promise<void>((resolve) => {
    api.portal.get.items().then(({ items }) => {
      const feed = (getGlobalFeed() || []).slice(0, 200);
      // only score items which are in the feed
      items = items.filter((i) =>
        feed.find((f) => keyStrFromObj(f.key) === keyStrFromObj(i.keyObj))
      );
      scoreItems(items, positivePrompt, negativePrompt, pals()).then(
        (items) => {
          state.update((s) => {
            items.forEach((i) => {
              s.items[i.keyStr] = i;
            });
            return s;
          });
          resolve();
        }
      );
    });
  });
};

export const refreshPortalItems = (): void => {
  api.portal.get.items().then(({ items }) => {
    state.update((s) => {
      if (!s.items) s.items = {} as ItemCollection;
      items.forEach((i) => {
        s.items[i.keyStr] = i;
      });
      s.isLoaded = true;
      return s;
    });
  });
};

export const refreshPortalAppDevs = (): void => {
  api.portal.get.appDevs().then((appDevs) => {
    state.update((s) => ({ ...s, appDevs: appDevs?.['portal-devs'] }));
  });
};

export const refreshSocialItems = (): void => {
  api.portal.get.socialItems().then((items) => {
    state.update((s) => ({ ...s, social: items.app }));
  });
};

export const refreshBoughtApps = (): void => {
  api.portal.get.boughtApps().then((items) => {
    state.update((s) => ({ ...s, ...items }));
  });
};

export const refreshContacts = (): void => {
  api.urbit.get.contacts().then((contacts) => {
    state.update((s) => ({ ...s, contacts: contacts }));
  });
};

export const refreshGroups = (): void => {
  api.urbit.get.joinedGroups().then((groups: Groups) => {
    let _groups = {} as Groups;
    state.update((s) => {
      Object.entries(groups || {}).forEach(([key, data]) => {
        let {
          meta: { title },
        } = data;
        // weirdly, groups that we're joining are in our state without a title
        _groups[key] = data;
        // if you want to be really picky, this could set in some other object
        // which is a supertype of Group but it's not worth it
        if (!title) {
          _groups[key].joining = true;
        }
      });
      s.groups = _groups;
      return s;
    });
  });
};

export const refreshApps = (): void => {
  const EXCLUDE_APPS = [
    'base',
    'garden', // TODO: remove in 412
    'groups',
    'kids',
    'landscape',
    'webterm',
  ];
  api.urbit.get.installedApps().then(([{ initial }, kiln]) => {
    state.update((s) => {
      let apps = {};
      Object.entries(initial).forEach(([key, data]) => {
        if (EXCLUDE_APPS.includes(key)) return;
        data.ship = kiln[key]?.sync?.ship;
        apps[key] = data;
      });
      s.apps = apps;
      return s;
    });
  });
};

export const refreshPals = (): void => {
  api.pals.get
    .all()
    .then(({ outgoing }) => {
      state.update((s) => ({ ...s, pals: outgoing, palsLoaded: true }));
    })
    .catch(() => {
      state.update((s) => ({ ...s, palsLoaded: true }));
    });
};

export const refreshRadioChannels = (): void => {
  api.radio.do.requestChannels();
};

export const refreshBlogs = (): void => {
  api.blog.get.all().then((blogs) => {
    state.update((s) => ({ ...s, blogs }));
  });
};

export const setReferredTo = (key: HarkNotificationDestination): void => {
  state.update((s) => ({ ...s, referredTo: key }));
};

export const itemInState = (item: ItemKey): Promise<void> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = state.subscribe((s) => {
      if (s.items[keyStrFromObj(item)]) {
        unsubscribe();
        clearTimeout(rejectTimeout);
        resolve();
      }
    });
    // the timeout here could trigger if we've lost the subscription to the
    // backend, which happens from time to time. it's not ideal if someone has
    // crafted a long post, because it looks like their post gets nuked
    const rejectTimeout = setTimeout(() => {
      unsubscribe();
      reject();
    }, 10000);
  });
};

// TODO: add a type for this return
export const getCurator = (patp: string) => {
  return {
    keyObj: { ship: patp, struc: 'ship', cord: '', time: '' },
    bespoke: { ...contacts()[patp] },
  };
};

export const getProfile = (patp: string): Contact => {
  return contacts()[patp];
};

export const sortFeedItemsByTime = (items: FeedItem[]) => {
  return items?.sort(
    (a: FeedItem, b: FeedItem) => fromUrbitTime(b.time) - fromUrbitTime(a.time)
  );
};

export const getCuratorFeed = (patp: string): FeedItem[] => {
  return items()[feedKey(patp)]?.bespoke?.feed;
};

export const getGlobalFeed = (): FeedItem[] => {
  return items()[globalFeedKey(config.indexer)]?.bespoke?.feed;
};

export const getCuratorCollections = (patp: string): ItemKey[] => {
  return items()
    [mainCollectionKey(patp)]?.bespoke?.['key-list']?.filter((k) => {
      return k.struc === 'collection';
    })
    ?.filter((k: ItemKey) => k.time !== '~2000.1.1')
    ?.filter((k: ItemKey) => k.time !== 'index')
    ?.filter((k: ItemKey) => k.time !== 'all');
};

export const getCuratorAllCollectionItems = (patp: string): ItemKey[] => {
  return getAllCollectionsAndItems(allCollectionKey(patp));
};

export const getCuratorItemsByStruc = (
  patp: string,
  struc: ItemStruc
): Item[] => {
  return Object.keys(items())
    .filter((k) => k.includes(`${struc}/${patp}`))
    .map((k) => items()[k]);
};

export const getGroup = (groupKey: string): Item => {
  return items()[`/group/${groupKey}/`];
};

export const getApp = (appKey: string): Item => {
  return items()[`/app/${appKey}/`];
};

export const getItem = (listKey: string | ItemKey): Item => {
  if (typeof listKey === 'object') return items()[keyStrFromObj(listKey)];
  return items()[listKey];
};

export const getCollectedItemLeaderboard = (
  excludePatp: string
): [string, number][] => {
  return Object.entries<number>(
    Object.values(items())
      .filter(
        (i) =>
          i?.keyObj?.ship !== excludePatp &&
          i?.keyObj?.struc === 'collection' &&
          i?.keyObj?.time !== 'global' &&
          i?.keyObj?.time !== 'index'
      )
      .reduce((a, b) => {
        b?.bespoke?.['key-list']
          .filter(
            (k: ItemKey) =>
              k?.struc !== 'collection' &&
              !(
                k?.cord === 'portal' &&
                k?.ship === '~worpet-bildet' &&
                (k?.struc === 'app' || k?.struc === 'group')
              )
          )
          .forEach((k: ItemKey) => {
            if (!a[keyStrFromObj(k)]) return (a[keyStrFromObj(k)] = 1);
            a[keyStrFromObj(k)]++;
          });
        return a;
      }, {})
  ).sort((a, b) => Number(b[1]) - Number(a[1]));
};

export const getMoreFromThisShip = (
  patp: string,
  cord: string = ''
): [string, number][] => {
  return Object.entries<number>(
    Object.values(items())
      .filter(
        (k) =>
          k?.keyObj?.struc === 'collection' &&
          k?.keyObj?.time !== 'global' &&
          k?.keyObj?.time !== 'index'
      )
      .reduce((a, b) => {
        b?.bespoke?.['key-list']
          .filter(
            (k: ItemKey) =>
              !['collection', 'ship'].includes(k?.struc) &&
              k?.ship === patp &&
              k?.cord !== cord &&
              !(
                k?.cord === 'portal' &&
                k?.ship === '~worpet-bildet' &&
                (k?.struc === 'app' || k?.struc === 'group')
              )
          )
          .forEach((k: ItemKey) => {
            if (!a[keyStrFromObj(k)]) return (a[keyStrFromObj(k)] = 1);
            a[keyStrFromObj(k)]++;
          });
        return a;
      }, {})
  ).sort((a, b) => Number(b[1]) - Number(a[1]));
};

export const getAllCollectionsAndItems = (collectionKey: string): ItemKey[] => {
  return items()[collectionKey]?.bespoke?.['key-list'].concat(
    Object.values(
      Object.fromEntries(
        Object.entries(items())
          .filter(([key]) => key.includes('/collection/'))
          .filter(([key]) => !key.includes('published'))
          .filter(([key]) => !key.includes('all'))
      )
    ).map((item) => item.keyObj)
  );
};

export const getCollectionItems = (collectionKey: string): ItemKey[] => {
  return items()[collectionKey]?.bespoke?.['key-list'];
};

export const getJoinedGroupDetails = (groupKey: string): Group => {
  return groups()[groupKey];
};

export const getReplies = (ship: string, key: ItemKey): ItemKey[] => {
  return social()[`/${ship}/reply-from`]?.[keyStrFromObj(key)];
};

export const getRepliesByTo = (ship: string, key: ItemKey): ItemKey[] => {
  return Object.entries(social()[`/${ship}/reply-to`] || {})
    .filter(([_, item]) =>
      item.find((i) => keyStrFromObj(i) === keyStrFromObj(key))
    )
    .map(([replyKey, _]) => keyStrToObj(replyKey));
};

export const getLikes = (ship: string, key: ItemKey): ItemKey[] => {
  return social()[`/${ship}/like-from`]?.[keyStrFromObj(key)];
};

export const getReviews = (ship: string, key: ItemKey): ItemKey[] => {
  return social()[`/${ship}/review-from`]?.[keyStrFromObj(key)];
};

export const getReviewsByTo = (ship: string, key: ItemKey): ItemKey[] => {
  return Object.entries(social()[`/${ship}/review-to`] || {})
    .filter(([_, item]) =>
      item.find((i) => keyStrFromObj(i) === keyStrFromObj(key))
    )
    .map(([reviewKey, _]) => keyStrToObj(reviewKey));
};

export const resetTip = (): void => {
  state.update((s) => ({
    ...s,
    tip: null,
    payment: null,
  }));
};

// go through the social items, sort the replies by time, and ensure that they
// are alongside a reference to the original item
export const getNotifications = (ship: string): [ItemKey, ItemKey][] => {
  let q = [];
  let feed = getGlobalFeed() || [];
  Object.entries(social()[`/${ship}/reply-from`] || {})?.forEach(
    ([op, replies]) => {
      // don't show notifications for items which are no longer in the feed
      if (!feed?.find((f) => keyStrFromObj(f.key) === op)) return;
      replies.forEach((reply) => {
        q.push([reply, keyStrToObj(op)]);
      });
    }
  );
  Object.entries(social()[`/${ship}/review-from`] || {})?.forEach(
    ([op, reviews]) => {
      // reviews are permanent so we don't care about the feed
      reviews.forEach((review) => {
        q.push([review, keyStrToObj(op)]);
      });
    }
  );
  return q.sort((a, b) => fromUrbitTime(b[0].time) - fromUrbitTime(a[0].time));
};

// TODO: define SubscriptionEvent type
export const handleSubscriptionEvent = (event, type: string) => {
  console.log({ event, type });
  switch (type) {
    case 'portal-update':
      state.update((s) => ({
        ...s,
        items: { ...s.items, [event.keyStr]: event },
      }));
      break;
    case 'social-graph-result':
      state.update((s) => {
        for (let socialKey in event.app) {
          for (let socialUpdate in event.app[socialKey]) {
            if (!s.social[socialKey]) s.social[socialKey] = {};
            if (!s.social[socialKey][socialUpdate]) {
              s.social[socialKey][socialUpdate] = [];
            }
            s.social[socialKey][socialUpdate] = uniqBy(
              [
                ...s.social[socialKey][socialUpdate],
                ...event.app[socialKey][socialUpdate],
              ],
              keyStrFromObj
            );
          }
        }
        return s;
      });
      break;
    case 'portal-message':
      if (event?.['tip-reference']) {
        state.update((s) => ({
          ...s,
          tip: { ...event?.['tip-reference'] },
        }));
      } else {
        state.update((s) => ({
          ...s,
          payment: {
            ...event?.['payment-reference'],
            'payment-confirmed': event?.['payment-confirmed'],
          },
        }));
        refreshBoughtApps();
      }
      break;
    case 'portal-manager-result':
      state.update((s) => ({ ...s, ...event }));
      break;
    case 'contact-news':
      state.update((s) => ({
        ...s,
        contacts: { ...s.contacts, [event.who]: event.con },
      }));
      break;
    case 'charge-update':
      refreshApps();
      break;
    case 'group-action-0' || 'group-leave' || 'group-action-2':
      refreshGroups();
      break;
    case 'greg-event':
      state.update((s) => ({ ...s, radioStations: event.response }));
      break;
    case 'storage-update':
      state.update((s) => ({
        ...s,
        s3: { ...s.s3, ...event['storage-update'] },
      }));
      break;
    default:
      break;
  }
};

export const groupKeyToItemKey = (groupKey: string): string => {
  const parts = groupKey.split('/');
  return `/group/${parts[0]}/${parts[1]}/`;
};

export const deskKeyToItemKey = (deskKey: string): string => {
  const parts = deskKey.split('/');
  return `/app/${parts[0]}/${parts[1]}/`;
};

export const contactKeyToItemKey = (contactKey: string): string => {
  return `/${contactKey}/`;
};

export const collectionKeyToItemKey = (collectionKey: string): string => {
  return `${collectionKey}`;
};

export const keyStrFromObj = ({ struc, ship, cord, time }: ItemKey): string => {
  return `/${struc}/${ship}/${cord}/${time}`;
};

export const keyStrToObj = (str: string): ItemKey => {
  const parts = str.split('/');
  let time = parts[1] === 'blog' ? parts.slice(4).join('/') : parts[4];
  return {
    struc: parts[1] as ItemStruc,
    ship: parts[2],
    cord: parts[3],
    time: time,
  };
};

export const contactStrToObj = (str: string): ItemKey => {
  const parts = str.split('/');
  return {
    struc: 'ship',
    ship: parts[1],
    cord: '',
    time: '',
  };
};

const mainCollectionKey = (patp: string): string =>
  `/collection/${patp}//~2000.1.1`;
const allCollectionKey = (patp: string): string => `/collection/${patp}//all`;
const feedKey = (patp: string): string => `/feed/${patp}//~2000.1.1`;
const globalFeedKey = (indexer: string): string => `/feed/${indexer}//global`;

export const refreshAll = (): void => {
  refreshPortalItems();
  refreshPortalAppDevs();
  refreshSocialItems();
  refreshBoughtApps();
  refreshContacts();
  refreshApps();
  refreshGroups();
  refreshPals();
  refreshRadioChannels();
  refreshBlogs();
};
refreshAll();
