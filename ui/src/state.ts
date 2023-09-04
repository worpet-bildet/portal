import { Groups } from '$types/landscape/groups';
import { State } from '$types/state';
import { ItemKey } from '$types/portal/item';

import { uniqBy } from 'lodash';
import { get, writable } from 'svelte/store';

import config from '@root/config';
import { save, load } from '@root/storage';
import { api } from '@root/api';
import { scoreItems } from '@root/ai';
import { fromUrbitTime } from '@root/util';

// Specify defaultState first to overwrite it with anything in localStorage
export const state = writable<State>({ ...load() });

export const items = () => get(state).items || {};
export const social = () => get(state).social || {};
export const groups = () => get(state).groups || {};
export const apps = () => get(state).apps || {};
export const contacts = () => get(state).contacts || {};

export const updateNotificationsLastChecked = () => {
  state.update((s) => {
    let currentTime = new Date();
    s.notificationsLastChecked = currentTime.toString();
    save({ notificationsLastChecked: currentTime });
    return s;
  });
};

export const toggleMuteNotifications = () => {
  state.update((s) => {
    s.muteNotifications = !s.muteNotifications;
    save({ muteNotifications: s.muteNotifications });
    return s;
  });
};

export const toggleDarkmode = () => {
  state.update((s) => {
    s.darkmode = !s.darkmode;
    save({ darkmode: s.darkmode });
    return s;
  });
};

export const reScoreItems = async (positivePrompt, negativePrompt) => {
  return new Promise<void>((resolve) => {
    api.portal.get.items().then(({ items }) => {
      const feed = (getGlobalFeed() || []).slice(0, 200);
      // only score items which are in the feed
      items = items.filter((i) =>
        feed.find((f) => keyStrFromObj(f.key) === keyStrFromObj(i.keyObj))
      );
      scoreItems(items, positivePrompt, negativePrompt).then((items) => {
        state.update((s) => {
          items.forEach((i) => {
            s.items[i.keyStr] = i;
          });
          return s;
        });
        resolve();
      });
    });
  });
};

export const refreshPortalItems = () => {
  api.portal.get.items().then(({ items }) => {
    state.update((s) => {
      if (!s.items) s.items = {};
      items.forEach((i) => {
        s.items[i.keyStr] = i;
      });
      s.isLoaded = true;
      return s;
    });
  });
};

export const refreshPortalAppDevs = () => {
  api.portal.get.appDevs().then((appDevs) => {
    state.update((s) => ({ ...s, appDevs: appDevs?.['portal-devs'] }));
  });
};

export const refreshSocialItems = () => {
  api.portal.get.socialItems().then((items) => {
    state.update((s) => ({ ...s, social: items.app }));
  });
};

export const refreshBoughtApps = () => {
  api.portal.get.boughtApps().then((items) => {
    state.update((s) => ({ ...s, ...items }));
  });
};

export const refreshContacts = () => {
  api.urbit.get.contacts().then((contacts) => {
    state.update((s) => ({ ...s, contacts: contacts }));
  });
};

export const refreshGroups = () => {
  api.urbit.get.joinedGroups().then((groups: Groups) => {
    let _groups = {};
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

export const refreshApps = () => {
  const EXCLUDE_APPS = [
    'base',
    'garden',
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

export const refreshPals = async () => {
  api.pals.get
    .all()
    .then(({ outgoing }) => {
      state.update((s) => ({ ...s, pals: outgoing, palsLoaded: true }));
    })
    .catch(() => {
      state.update((s) => ({ ...s, palsLoaded: true }));
    });
};

export const refreshRadioChannels = () => {
  api.radio.do.requestChannels();
};

export const refreshBlogs = () => {
  api.blog.get.all().then((blogs) => {
    state.update((s) => ({ ...s, blogs }));
  });
};

export const setReferredTo = (key) => {
  state.update((s) => ({ ...s, referredTo: key }));
};

export const itemInState = async (item) => {
  // this is super, super dumb.
  return new Promise((resolve, reject) => {
    const unsubscribe = state.subscribe((s) => {
      if (s[keyStrFromObj(item)]) {
        unsubscribe();
        clearTimeout(rejectTimeout);
        resolve(true);
      }
    });
    const rejectTimeout = setTimeout(() => {
      unsubscribe();
      reject();
    }, 10000);
  });
};

export const getCurator = (patp) => {
  return {
    keyObj: { ship: patp, struc: 'ship', cord: '', time: '' },
    bespoke: { ...contacts()[patp] },
  };
};

export const getProfile = (patp) => {
  return contacts()[patp];
};

export const getCuratorFeed = (patp) => {
  return items()[feedKey(patp)]?.bespoke?.feed?.sort(
    (a, b) => fromUrbitTime(b.time) - fromUrbitTime(a.time)
  );
};

export const getGlobalFeed = () => {
  return items()[globalFeedKey(config.indexer)]?.bespoke?.feed?.sort(
    (a, b) => fromUrbitTime(b.time) - fromUrbitTime(a.time)
  );
};

export const getCuratorCollections = (patp) => {
  return items()
    [mainCollectionKey(patp)]?.bespoke?.['key-list']?.filter((k) => {
      return k.struc === 'collection';
    })
    ?.filter((k) => k.time !== '~2000.1.1')
    ?.filter((k) => k.time !== 'index')
    ?.filter((k) => k.time !== 'all');
};

export const getCuratorAllCollectionItems = (patp) => {
  return getAllCollectionsAndItems(allCollectionKey(patp));
};

export const getCuratorFeaturedCollection = (patp) => {
  return getCuratorCollections(patp).slice(0, 1);
};

export const getCuratorItemsByStruc = (patp, struc) => {
  return Object.keys(items())
    .filter((k) => k.includes(`${struc}/${patp}`))
    .map((k) => items()[k]);
};

export const getGroup = (groupKey) => {
  return items()[`/group/${groupKey}/`];
};

export const getApp = (appKey) => {
  return items()[`/app/${appKey}/`];
};

export const getItem = (listKey) => {
  if (typeof listKey === 'object') return items()[keyStrFromObj(listKey)];
  return items()[listKey];
};

export const getCollectedItemLeaderboard = (excludePatp) => {
  return Object.entries(
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
            (k) =>
              k?.struc !== 'collection' &&
              !(
                k?.cord === 'portal' &&
                k?.ship === '~worpet-bildet' &&
                (k?.struc === 'app' || k?.struc === 'group')
              )
          )
          .forEach((k) => {
            if (!a[keyStrFromObj(k)]) return (a[keyStrFromObj(k)] = 1);
            a[keyStrFromObj(k)]++;
          });
        return a;
      }, {})
  ).sort((a, b) => Number(b[1]) - Number(a[1]));
};

export const getMoreFromThisShip = (patp, cord = '') => {
  return Object.entries(
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
            (k) =>
              !['collection', 'ship'].includes(k?.struc) &&
              k?.ship === patp &&
              k?.cord !== cord &&
              !(
                k?.cord === 'portal' &&
                k?.ship === '~worpet-bildet' &&
                (k?.struc === 'app' || k?.struc === 'group')
              )
          )
          .forEach((k) => {
            if (!a[keyStrFromObj(k)]) return (a[keyStrFromObj(k)] = 1);
            a[keyStrFromObj(k)]++;
          });
        return a;
      }, {})
  ).sort((a, b) => Number(b[1]) - Number(a[1]));
};

export const getAllCollectionsAndItems = (collectionKey) => {
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

export const getCollectionItems = (collectionKey) => {
  return items()[collectionKey]?.bespoke?.['key-list'];
};

export const getJoinedGroupDetails = (groupKey) => {
  return groups()[groupKey];
};

export const getReplies = (ship, key) => {
  return social()[`/${ship}/reply-from`]?.[keyStrFromObj(key)];
};

export const getRepliesByTo = (ship, key) => {
  return Object.entries(social()[`/${ship}/reply-to`] || {})
    .filter(([_, item]) =>
      item.find((i) => keyStrFromObj(i) === keyStrFromObj(key))
    )
    .map(([replyKey, _]) => keyStrToObj(replyKey));
};

export const getLikes = (ship, key) => {
  return social()[`/${ship}/like-from`]?.[keyStrFromObj(key)];
};

export const getReviews = (ship, key) => {
  return social()[`/${ship}/review-from`]?.[keyStrFromObj(key)];
};

export const getReviewsByTo = (ship, key) => {
  return Object.entries(social()[`/${ship}/review-to`] || {})
    .filter(([_, item]) =>
      item.find((i) => keyStrFromObj(i) === keyStrFromObj(key))
    )
    .map(([reviewKey, _]) => keyStrToObj(reviewKey));
};

export const resetTip = () => {
  state.update((s) => ({
    ...s,
    tip: null,
    payment: null,
  }));
};

// go through the social items, sort the replies by time, and ensure that they
// are alongside a reference to the original item
export const getNotifications = (ship) => {
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

export const handleSubscriptionEvent = (event, type) => {
  console.log({ event, type });
  switch (type) {
    case 'portal-update':
      state.update((s) => ({ ...s, [event.keyStr]: event }));
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
    case 'group-action-0' || 'group-leave':
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

export const groupKeyToItemKey = (groupKey) => {
  const parts = groupKey.split('/');
  return `/group/${parts[0]}/${parts[1]}/`;
};

export const deskKeyToItemKey = (deskKey) => {
  const parts = deskKey.split('/');
  return `/app/${parts[0]}/${parts[1]}/`;
};

export const contactKeyToItemKey = (contactKey) => {
  return `/${contactKey}/`;
};

export const collectionKeyToItemKey = (collectionKey) => {
  return `${collectionKey}`;
};

export const keyStrFromObj = ({ struc, ship, cord, time }: ItemKey) => {
  return `/${struc}/${ship}/${cord}/${time}`;
};

export const keyStrToObj = (str): ItemKey => {
  const parts = str.split('/');
  let time = parts[1] === 'blog' ? parts.slice(4).join('/') : parts[4];
  return {
    struc: parts[1],
    ship: parts[2],
    cord: parts[3],
    time: time,
  };
};

export const contactStrToObj = (str): ItemKey => {
  const parts = str.split('/');
  return {
    struc: 'ship',
    ship: parts[1],
    cord: '',
    time: '',
  };
};

const mainCollectionKey = (patp) => `/collection/${patp}//~2000.1.1`;
const allCollectionKey = (patp) => `/collection/${patp}//all`;
const feedKey = (patp) => `/feed/${patp}//~2000.1.1`;
const globalFeedKey = (indexer) => `/feed/${indexer}//global`;

export const refreshAll = () => {
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
