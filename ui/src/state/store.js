import produce from "immer";
import keyBy from "lodash/keyBy";
import { createStore } from "./middleware";
import { getState, scry, getFeed } from "./usePortal";

export const mergeStateUpdate = state => state.mergeStateUpdate;
export const getCurators = state => state.curators;
export const getFeedItems = state => state.feedItems;
export const onUpdate = state => state.onUpdate;
export const refreshAppState = state => state.refreshAppState;

export const useStore = createStore((set, get) => ({
  curators: {},
  feed: [],
  feedItems: [],
  refreshAppState: async () => {
    get().indexAll(await getState());
    get().onFeed(await getFeed());
  },
  onFeed: async feed => {
    set(
      produce(draft => {
        draft.feed = feed;
        feed.forEach(f => {
          scry({
            app: "portal-store",
            path: `/item${f.keyStr}`,
          }).then(res => {
            get().mergeFeedItem({ ...res, ...f });
          });
        });
      })
    );
  },
  mergeFeedItem: item => {
    set(
      produce(draft => {
        draft.feedItems = draft.feedItems.concat(item);
      })
    );
  },
  mergeStateUpdate: update => {
    set(
      produce(draft => {
        draft.curators = { ...draft.curators, ...update };
      })
    );
  },
  indexAll: pages =>
    set(
      produce(draft => {
        const index = Object.values(pages);
        const curators = keyBy(index, "item.keyObj.ship");
        draft.curators = { ...draft.curators, ...curators };
      })
    ),
}));
