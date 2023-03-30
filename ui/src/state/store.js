import produce from "immer";
import keyBy from "lodash/keyBy";
import { createStore } from "./middleware";
import { getState } from "./usePortal";

export const mergeStateUpdate = state => state.mergeStateUpdate;
export const getDefaultCurators = state => state.defaultCurators;
export const onInitialLoad = state => state.onInitialLoad;
export const onUpdate = state => state.onUpdate;
export const refreshAppState = state => state.refreshAppState;

export const useStore = createStore((set, get) => ({
  defaultCurators: {},
  refreshAppState: async () => {
    get().onInitialLoad(getState);
  },
  onInitialLoad: async initialState => {
    get().indexAll(await initialState());
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
