import produce from "immer";
import keyBy from "lodash/keyBy";
import { createStore } from "./middleware";
import { getState, getFeed as getFeedItems } from "./usePortal";

export const mergeStateUpdate = state => state.mergeStateUpdate;
export const getDefaultCurators = state => state.defaultCurators;
export const getFeed = state => state.feed;
export const onUpdate = state => state.onUpdate;
export const refreshAppState = state => state.refreshAppState;

export const useStore = createStore((set, get) => ({
  defaultCurators: {},
  feed: [],
  refreshAppState: async () => {
    get().indexAll(await getState());
    get().onFeed(await getFeedItems());
  },
  onFeed: async feed => {
    set(
      produce(draft => {
        draft.feed = feed;
      })
    );
  },
  mergeStateUpdate: update => {
    set(
      produce(draft => {
        draft.defaultCurators = { ...draft.defaultCurators, ...update };
      })
    );
  },
  indexAll: pages =>
    set(
      produce(draft => {
        const index = Object.values(pages);
        const curators = keyBy(index, "item.keyObj.ship");
        draft.defaultCurators = { ...draft.defaultCurators, ...curators };
      })
    ),
}));
