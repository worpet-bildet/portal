import shallow from "zustand/shallow";
import produce from "immer";
import { createStore } from "./middleware";
import sortedUniqBy from "lodash/sortedUniqBy";
import { indexPages } from "./util";

export const getCurators = state => state.curators;
export const setCurators = state => state.setCurators;
export const onInitialLoad = state => state.onInitialLoad;

export const useStore = createStore((set, get) => ({
  // ...initialState,
  apps: [],
  groups: [],
  curators: {},
  defaultCurators: {},
  onInitialLoad: curators => {
    get().setCurators(curators);
    get().setDefaultCurators(curators);
  },
  setCurators: curators =>
    set(
      produce(draft => {
        draft.curators = curators;
      })
    ),
  setDefaultCurators: pages =>
    set(
      produce(draft => {
        const defaultCuratorPages = Object.entries(pages);
        const key = defaultCuratorPages[0][0];
        const ship = key.split("/")[2];
        // item.data.bespoke.list.list.type === "curator-page"
        // item.data.bespoke.list.list.type === "app"
        // item.data.bespoke.list.list.type === "other"
        // map[key].
        // item["meta-data"].id.type === "list"
        // item.key
        const index = indexPages(defaultCuratorPages);
        draft.defaultCurators[ship] = index;
      })
    ),
}));
