/* eslint-disable no-param-reassign */
import { applyPatches, produceWithPatches, setAutoFreeze, enablePatches } from "immer";
import { compose } from "lodash/fp";
import _ from "lodash";
import { FatalError } from "@urbit/http-api";

import api from "../api";
import { clearStorageMigration, createStorageKey, storageVersion } from "../logic/utils";
import { createStoreWithPersist } from "./middleware";

setAutoFreeze(false);
enablePatches();

export const stateSetter = (fn, set, get) => {
  const old = get();
  const [state] = produceWithPatches(old, fn);
  // console.log(patches);
  set(state);
};
export const optStateSetter = (fn, set, get) => {
  const old = get();
  const id = _.uniqueId();
  const [state, , patches] = produceWithPatches(old, fn);
  set({ ...state, patches: { ...state.patches, [id]: patches } });
  return id;
};
export const reduceState = (state, data, reducers) => {
  const reducer = compose(reducers.map(r => sta => r(data, sta)));
  state.getState().set(s => {
    reducer(s);
  });
};
export const reduceStateN = (state, data, reducers) => {
  const reducer = compose(reducers.map(r => sta => r(data, sta)));
  state.set(reducer);
};
export const optReduceState = (state, data, reducers) => {
  const reducer = compose(reducers.map(r => sta => r(data, sta)));
  return state.getState().optSet(s => {
    reducer(s);
  });
};
/* eslint-disable-next-line import/no-mutable-exports */
export let stateStorageKeys = [];
export const stateStorageKey = stateName => {
  const key = createStorageKey(`${stateName}State`);
  stateStorageKeys = [...new Set([...stateStorageKeys, key])];
  return key;
};
window.clearStates = () => {
  stateStorageKeys.forEach(key => {
    localStorage.removeItem(key);
  });
};
export function createSubscription(app, path, e) {
  const request = {
    app,
    path,
    event: e,
    err: () => null,
    quit: () => {
      throw new FatalError("subscription clogged");
    },
  };
  // TODO: err, quit handling (resubscribe?)
  return request;
}
export const createState = (name, properties, whitelist = [], subscriptions = []) =>
  createStoreWithPersist(
    // create(
    // devtools(
    // persist(
    (set, get) => ({
      initialize: async airlock => {
        await Promise.all(subscriptions.map(sub => airlock.subscribe(sub(set, get))));
      },
      set: fn => stateSetter(fn, set, get),
      optSet: fn => optStateSetter(fn, set, get),
      patches: {},
      addPatch: (id, patch) => {
        set(s => ({ ...s, patches: { ...s.patches, [id]: patch } }));
      },
      removePatch: id => {
        set(s => ({ ...s, patches: _.omit(s.patches, id) }));
      },
      rollback: id => {
        set(state => {
          const applying = state.patches[id];
          return {
            ...applyPatches(state, applying),
            patches: _.omit(state.patches, id),
          };
        });
      },
      ...(typeof properties === "function" ? properties(set, get) : properties),
    }),
    {
      whitelist,
      name: stateStorageKey(name),
      version: storageVersion,
      migrate: clearStorageMigration,
    }
    // )
  );
export async function doOptimistically(state, action, call, reduce) {
  let num;
  try {
    num = optReduceState(state, action, reduce);
    await call(action);
    state.getState().removePatch(num);
  } catch (e) {
    console.error(e);
    if (num) {
      state.getState().rollback(num);
    }
  }
}
export async function pokeOptimisticallyN(state, poke, reduce, desk = "groups") {
  let num;
  try {
    num = optReduceState(state, poke.json, reduce);
    await api.poke(poke, desk);
    state.getState().removePatch(num);
  } catch (e) {
    console.error(e);
    if (num) {
      state.getState().rollback(num);
    }
  }
}
