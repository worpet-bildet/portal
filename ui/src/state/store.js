import produce from "immer";
import keyBy from "lodash/keyBy";
import { createStore } from "./middleware";
import { indexPages, isNewSub } from "./util";
import { scries } from "@utils/urbit/scries";

export const getCurators = state => state.curators;
export const getDefaultCurators = state => state.defaultCurators;
export const setCurators = state => state.setCurators;
export const onInitialLoad = state => state.onInitialLoad;
export const onUpdate = state => state.onUpdate;

export const useStore = createStore((set, get) => ({
  defaultCurators: {},
  onInitialLoad: initialState => {
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
  indexAll: pages =>
    set(
      produce(draft => {
        const index = indexPages(Object.entries(pages));
        const curators = keyBy(index, "keys.keyObj.ship");
        draft.defaultCurators = { ...draft.defaultCurators, ...curators };
      })
    ),
}));
