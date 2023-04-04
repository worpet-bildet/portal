import produce from "immer";
import keyBy from "lodash/keyBy";
import { createStore } from "./middleware";
import { getState } from "./usePortal";

export const mergeStateUpdate = state => state.mergeStateUpdate;
export const getCurators = state => state.curators;
export const onUpdate = state => state.onUpdate;
export const refreshAppState = state => state.refreshAppState;

export const useStore = createStore((set, get) => ({
  curators: {},
  refreshAppState: async () => {
    get().indexAll(await getState());
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
