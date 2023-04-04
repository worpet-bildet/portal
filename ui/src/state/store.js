import produce from "immer";
import keyBy from "lodash/keyBy";
import { createStore } from "./middleware";
import { getState, getFeed as getFeedItems } from "./usePortal";

export const mergeStateUpdate = state => state.mergeStateUpdate;
export const getCurators = state => state.curators;
export const getFeed = state => state.feed;
export const onUpdate = state => state.onUpdate;
export const refreshAppState = state => state.refreshAppState;

export const useStore = createStore((set, get) => ({
  curators: {},
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
        console.log("mergoooor");
        draft.curators = { ...draft.curators, ...update };
      })
    );
  },
  indexAll: pages =>
    set(
      produce(draft => {
        const index = Object.values(pages);
        const curators = keyBy(index, "item.keyObj.ship");
        console.log("indexooooor");
        draft.curators = { ...draft.curators, ...curators };
      })
    ),
}));
