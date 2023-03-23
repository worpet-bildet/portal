import produce from "immer";
import keyBy from "lodash/keyBy";
import { createStore } from "./middleware";
import { indexPages, getListAtDCType, getListAtType, isNewSub } from "./util";
import { scries } from "../urbit/scries";

export const initalTypeState = { app: [], group: [], list: [], other: [], ship: [] };

export const getCurators = state => state.curators;
export const getDefaultCurators = state => state.defaultCurators;
export const setCurators = state => state.setCurators;
export const onInitialLoad = state => state.onInitialLoad;
export const onUpdate = state => state.onUpdate;
export const getApps = state => state.types.app;
export const getGroups = state => state.types.group;
export const getOthers = state => state.types.other;
export const getShips = state => state.types.ship;
export const getCurator = state => state.curators;
export const getTypes = state => state.types;
export const getSelectedSection = state => state.selectedSection;
export const getAlertIsOpen = state => state.alertIsOpen;
export const setAlertIsOpen = state => state.setAlertIsOpen;
export const getAlertText = state => state.alertText;
export const setAlertText = state => state.setAlertText;

export const useStore = createStore((set, get) => ({
  selectedItem: { name: "", type: "", key: "" },
  selectedSection: "all",
  curators: {},
  defaultCurators: {},
  types: { app: [], group: [], list: [], other: [], ship: [] },
  alertIsOpen: false,
  alertText: "",
  onInitialLoad: initialState => {
    console.log({ initialState });
    get().setInitialState(initialState);
    get().indexAll(initialState);
  },
  onUpdate: update => {
    if (isNewSub(update)) get().scryBeforeIndex(update);
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
        const index = indexPages(Object.entries(pages));
        const curators = keyBy(index, "keys.keyObj.ship");
        draft.defaultCurators = { ...draft.defaultCurators, ...curators };
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
