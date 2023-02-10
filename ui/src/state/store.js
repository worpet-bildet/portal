import shallow from "zustand/shallow";
import produce from "immer";
// import sortedUniqBy from "lodash/sortedUniqBy";
import { createStore } from "./middleware";
import { indexPages } from "./util";

export const getCurators = state => state.curators;
export const setCurators = state => state.setCurators;
export const onInitialLoad = state => state.onInitialLoad;
export const getApps = state => state.types.app;
export const getGroups = state => state.types.group;
export const getLists = state => state.types.list;
export const getOthers = state => state.types.other;
export const getShips = state => state.types.ship;
export const getCurator = state => state.curators;
export const getTypes = state => state.types;
export const useStore = createStore((set, get) => ({
  // ...initialState,
  // apps: [],
  // groups: [],
  selectedItem: { name: "", type: "", key: "" },
  curators: {},
  defaultCurators: {},
  types: { app: [], group: [], list: [], other: [], ship: [] },
  onInitialLoad: initialState => {
    get().setInitialState(initialState);
    get().indexAll(initialState);
  },
  setInitialState: state =>
    set(
      produce(draft => {
        draft.initialState = state;
      })
    ),
  setCurators: curators =>
    set(
      produce(draft => {
        draft.curators = curators;
      })
    ),
  indexAll: pages =>
    set(
      produce(draft => {
        const defaultCuratorPages = Object.entries(pages);
        const key = defaultCuratorPages[0][0];
        const ship = key.slice().split("/")[1];

        const [index, types] = indexPages(defaultCuratorPages);
        draft.defaultCurators[ship] = index;
        draft.types = types;
      })
    ),
  setSelectedItem: item =>
    set(
      produce(draft => {
        draft.selectedItem = item;
      })
    ),
}));
