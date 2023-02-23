import { create } from "zustand";
import { devtools, subscribeWithSelector, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import pipe from "ramda/es/pipe";

const logger = config => (set, get, api) =>
  config(
    args => {
      console.log("====================================");
      set(args);
      const { defaultCurators, types } = get();
      console.log("defaultCurators", defaultCurators);
      console.log("types", types);
      console.log("====================================");
    },
    get,
    api
  );

export const createStore = pipe(
  logger,
  devtools,
  subscribeWithSelector,
  // persist,
  immer,
  create
);

export const createFormStore = pipe(
  // logger
  devtools,
  immer,
  create
);
