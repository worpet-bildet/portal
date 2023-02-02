import { create } from "zustand";
import { devtools, subscribeWithSelector, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import pipe from "ramda/es/pipe";

const logger = config => (set, get, api) =>
  config(
    args => {
      console.log("====================================");
      // console.log('  applying', args);
      set(args);
      const { apps, groups, curators, defaultCurators } = get();
      console.log("state", { apps, groups, curators, defaultCurators });
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
  // logger,
  devtools,
  immer,
  create
);

// const poke = {
//   "add": {
//     "p": "~zod",
//     "r": "other",
//     "general": {
//       "title": "Some Title",
//       "link": "https://yourmomisgay.com",
//       "description": "Some description.",
//       "tags": [
//         "tag1",
//         "tag2"
//       ],
//       "properties-N/A": {},
//       "pictures": [
//         "https://pic1.com",
//         "https://pic2.com"
//       ],
//       "image": "https://square-image.com",
//       "color": "#e8e8e8"
//     },
//     "bespoke-input": {
//       "other": "null"
//     }
//   }
// }
