import shallow from "zustand/shallow";
import produce from "immer";
import unionBy from "lodash/unionBy";
// import sortedUniqBy from "lodash/sortedUniqBy";
import { createStore } from "./middleware";
import {
  indexPages,
  getBP,
  getListFromDCMap,
  getListAtDCType,
  getListAtType,
} from "./util";
import { scries } from "../urbit/scries";

export const getCurators = state => state.curators;
export const getDefaultCurators = state => state.defaultCurators;
export const setCurators = state => state.setCurators;
export const onInitialLoad = state => state.onInitialLoad;
export const onUpdate = state => state.onUpdate;
export const getApps = state => state.types.app;
export const getGroups = state => state.types.group;
export const getLists = state => state.types.list;
export const getOthers = state => state.types.other;
export const getShips = state => state.types.ship;
export const getCurator = state => state.curators;
export const getTypes = state => state.types;
export const getSelectedSection = state => state.selectedSection;
export const useStore = createStore((set, get) => ({
  // ...initialState,
  // apps: [],
  // groups: [],
  selectedItem: { name: "", type: "", key: "" },
  selectedSection: "all",
  curators: {},
  defaultCurators: {},
  types: { app: [], group: [], list: [], other: [], ship: [] },
  onInitialLoad: initialState => {
    get().setInitialState(initialState);
    get().indexAll(initialState);
  },
  onUpdate: update => {
    get().indexOnUpdate(update);
  },
  // onValidityChange: () => {},
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

        const [index, types] = indexPages(defaultCuratorPages);
        draft.defaultCurators = defaultCuratorPages;
        draft.types = Array.isArray(types) ? types[0] : types;
      })
    ),
  indexOnUpdate: async update =>
    set(
      produce(async draft => {
        const res = await scries.item(update.urbit, update.evt);
        const ship = res.keyObj.ship;
        const type = res.keyObj.type.slice().split("/");

        // TODO: Update all the things for list overwrite
        if (type[1] === "list") {
          get().reduceListInIndex(res, ship, type);
        } else {
          get().addItemToIndex(res, ship, type);
        }
      })
    ),
  // On update of list, reduce bespoke 'payload'
  reduceListInIndex: (item, ship, type) =>
    set(
      produce(draft => {
        const listFromDCMap = getListFromDCMap(draft, ship, item);
        const listAtType = getListAtType(draft, type);

        const prevList = getBP(listAtType[0].item);
        const nextList = getBP(item);
        const prevListAtDC = getBP(listFromDCMap.item);

        listAtType[0].item.data.bespoke.payload = unionBy(prevList, nextList, "key");
        listFromDCMap.item.data.bespoke.payload = unionBy(prevListAtDC, nextList, "key");
      })
    ),
  // On update with new item, add item to defaultCuratorMap and type map
  addItemToIndex: (item, ship, type) =>
    set(
      produce(draft => {
        const listAtDCType = getListAtDCType(draft, ship, type);
        const listAtTypes = getListAtType(draft, type);
        const itemIndex = listAtDCType.map[0].findIndex(el => el.keyStr === item.keyStr);

        if (itemIndex === -1) {
          listAtDCType.map[0].push(item);
        } else {
          listAtDCType.map[0][itemIndex] = item;
        }
        listAtTypes[0].map[item.keyStr] = item;
      })
    ),
  setSelectedItem: item =>
    set(
      produce(draft => {
        draft.selectedItem = item;
      })
    ),
  setSelectedSection: section =>
    set(
      produce(draft => {
        draft.selectedSection = section;
      })
    ),
}));
