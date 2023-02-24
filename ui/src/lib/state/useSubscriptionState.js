import uniqueId from "lodash/uniqueId";
import { create } from "zustand";

const useSubscriptionState = create((set, get) => ({
  watchers: {},
  track: (path, hook) =>
    new Promise((resolve, reject) => {
      set(draft => {
        draft.watchers[path] = [
          ...(draft.watchers[path] || []),
          {
            id: uniqueId(),
            hook,
            resolve,
            reject,
          },
        ];
      });
    }),
  remove: (path, id) => {
    set(draft => {
      draft.watchers[path] = (draft.watchers[path] || []).filter(w => w.id === id);
    });
  },
}));
export default useSubscriptionState;
