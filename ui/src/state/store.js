import { shallow } from "zustand/shallow";
import produce from "immer";
import unionBy from "lodash/unionBy";
import keyBy from "lodash/keyBy";
import { createStore } from "./middleware";
import {
  indexPages,
  getBP,
  getListFromDCMap,
  getListAtDCType,
  getListAtType,
  mergeTypesTransform,
  isNewSub,
} from "./util";
import { scries } from "../urbit/scries";
import isEqual from "lodash/isEqual";
import transform from "lodash/transform";

export const initalTypeState = { app: [], group: [], list: [], other: [], ship: [] };

export const useStore = createStore((set, get) => ({
  // ...initialState,
  // apps: [],
  // groups: [],
  selectedItem: { name: "", type: "", key: "" },
  selectedSection: "all",
  curators: {},
  defaultCurators: {},
  types: { app: [], group: [], list: [], other: [], ship: [] },
  alertIsOpen: false,
  alertText: "",
  onInitialLoad: initialState => {
    get().setInitialState(initialState);
    get().indexAll(initialState);
  },
  onUpdate: update => {
    if (isNewSub(update)) get().scryBeforeIndex(update);
    else get().indexOnUpdate(update);
  },
  scryBeforeIndex: update => {
    // If we literally just subbed to this person, wait a couple seconds and
    // then get everything again, this is gross but it works for now
    const doUpdate = async () => {
      try {
        const res = await scries.curatorDefaults(update.urbit, update.evt);
        get().indexAll(res);
      } catch (err) {
        console.error(err);
      }
    };
    doUpdate();
    setTimeout(doUpdate, 500);
    setTimeout(doUpdate, 1000);
    setTimeout(doUpdate, 2000);
    setTimeout(doUpdate, 4000);
    setTimeout(doUpdate, 8000);
    setTimeout(doUpdate, 12000);
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
        const [index, types] = indexPages(Object.entries(pages));
        const curators = keyBy(index, "keys.keyObj.ship");
        draft.defaultCurators = { ...draft.defaultCurators, ...curators };
        draft.types = isEqual(draft.types, initalTypeState)
          ? types
          : transform(types, mergeTypesTransform(get), {});
      })
    ),
  indexOnUpdate: async update =>
    set(
      produce(async draft => {
        try {
          const res = await scries.item(update.urbit, update.evt);
          const ship = res?.keyObj?.ship;
          const type = res?.keyObj?.type?.slice().split("/");
          if (type && type.length && type[1] === "list") {
            get().reduceListInIndex(res, ship, type);
          } else {
            get().addItemToIndex(res, ship, type);
          }
        } catch (e) {
          // console.log("error in indexOnUpdate");
          console.log(e);
        }
      })
    ),
  // On update of list, reduce bespoke 'payload'
  reduceListInIndex: (item, ship, type) =>
    set(
      produce(draft => {
        if (!draft.defaultCurators[ship] || !draft.defaultCurators[ship][0]) {
          return;
        } else {
          const listFromDCMap = getListFromDCMap(draft, ship, item);
          const listAtType = getListAtType(draft, type);

          const prevList = getBP(listAtType[0].item);
          const nextList = getBP(item);
          const prevListAtDC = getBP(listFromDCMap.item);

          listAtType[0].item.data.bespoke.payload = unionBy(prevList, nextList, "key");
          listFromDCMap.item.data.bespoke.payload = unionBy(
            prevListAtDC,
            nextList,
            "key"
          );
        }
      })
    ),
  // On update with new item, add item to defaultCuratorMap and type map
  addItemToIndex: (item, ship, type) =>
    set(
      produce(draft => {
        if (!draft.defaultCurators[ship] || !draft.defaultCurators[ship][0]) {
          return;
        } else {
          const listAtDCType = getListAtDCType(draft, ship, type, item);
          const listAtTypes = getListAtType(draft, type);
          const itemIndex = listAtDCType.map[0].findIndex(
            el => el.keyStr === item.keyStr
          );

          if (itemIndex === -1) {
            listAtDCType.map[0].push(item);
          } else {
            listAtDCType.map[0][itemIndex] = item;
          }
          listAtTypes[0].map[item.keyStr] = item;
        }
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
  setAlertIsOpen: isOpen =>
    set(
      produce(draft => {
        draft.alertIsOpen = isOpen;
      })
    ),
  setAlertText: text =>
    set(
      produce(draft => {
        draft.alertText = text;
      })
    ),
}));
