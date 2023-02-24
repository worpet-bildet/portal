import { unstable_batchedUpdates as batchUpdates } from "react-dom";
import { create } from "zustand";
import produce from "immer";
import isEqual from "lodash/isEqual";
import { decToUd } from "@urbit/api";
import api from "../api";
import { asyncForEach } from "../lib";
import useSubscriptionState from "./useSubscriptionState";

export function emptyCarpet(seam) {
  return {
    seam,
    yarns: {},
    cable: [],
    stitch: 0,
  };
}
export function emptyBlanket(seam) {
  return {
    seam,
    yarns: {},
    quilt: {},
  };
}
function harkAction(action) {
  return {
    app: "hark",
    mark: "hark-action",
    json: action,
  };
}
const useHarkState = create((set, get) => ({
  set: fn => {
    set(produce(get(), fn));
  },
  batchSet: fn => {
    batchUpdates(() => {
      get().set(fn);
    });
  },
  loaded: false,
  carpet: emptyCarpet({ desk: window.desk }),
  blanket: emptyBlanket({ desk: window.desk }),
  textiles: {},
  groupSubs: [],
  start: async () => {
    await get().retrieve();
    await api.subscribe({
      app: "hark",
      path: "/ui",
      event: event => {
        if ("add-yarn" in event) {
          get().update(null);
        }
      },
    });
    set({ loaded: true });
  },
  update: async group => {
    const { groupSubs, retrieve, retrieveGroup } = get();
    await retrieve();
    await asyncForEach(
      groupSubs.filter(g => !group || group === g),
      retrieveGroup
    );
  },
  retrieve: async () => {
    const carpet = await api
      .scry({
        app: "hark",
        path: `/desk/${window.desk}/latest`,
      })
      .catch(() => emptyCarpet({ desk: window.desk }));
    const blanket = await api
      .scry({
        app: "hark",
        path: `/desk/${window.desk}/quilt/${decToUd(carpet.stitch.toString())}`,
      })
      .catch(() => emptyBlanket({ desk: window.desk }));
    get().batchSet(draft => {
      draft.carpet = carpet;
      draft.blanket = blanket;
    });
  },
  retrieveGroup: async flag => {
    const carpet = await api.scry({
      app: "hark",
      path: `/group/${flag}/latest`,
    });
    const blanket = await api.scry({
      app: "hark",
      path: `/group/${flag}/quilt/${decToUd(carpet.stitch.toString())}`,
    });
    get().batchSet(draft => {
      draft.textiles[flag] = {
        carpet,
        blanket,
      };
      if (!get().groupSubs.includes(flag)) {
        draft.groupSubs.push(flag);
      }
    });
  },
  releaseGroup: async flag => {
    get().batchSet(draft => {
      const index = draft.groupSubs.indexOf(flag);
      if (index !== -1) {
        draft.groupSubs.splice(index, 1);
      }
    });
  },
  sawRope: async (rope, update = true) =>
    new Promise((resolve, reject) => {
      api.poke({
        ...harkAction({
          "saw-rope": rope,
        }),
        onError: reject,
        onSuccess: async () => {
          if (!update) {
            resolve();
            return;
          }
          await useSubscriptionState.getState().track("hark/ui", event => {
            return "saw-rope" in event && event["saw-rope"].thread === rope.thread;
          });
          await get().update(rope.group);
          resolve();
        },
      });
    }),
  sawSeam: async seam =>
    new Promise((resolve, reject) => {
      api.poke({
        ...harkAction({
          "saw-seam": seam,
        }),
        onError: reject,
        onSuccess: async () => {
          await useSubscriptionState.getState().track("hark/ui", event => {
            return "saw-seam" in event && isEqual(event["saw-seam"], seam);
          });
          await get().update(("group" in seam && seam.group) || null);
          resolve();
        },
      });
    }),
}));
export default useHarkState;
