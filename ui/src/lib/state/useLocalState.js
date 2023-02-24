import { create } from "zustand";
import { persist } from "zustand/middleware";
import produce from "immer";

import { clearStorageMigration, createStorageKey, storageVersion } from "../logic/utils";

export const useLocalState = create(
  persist(
    (set, get) => ({
      set: f => set(produce(get(), f)),
      currentTheme: "light",
      browserId: "",
      subscription: "connected",
      errorCount: 0,
      airLockErrorCount: 0,
    }),
    {
      name: createStorageKey("local"),
      version: storageVersion,
      migrate: clearStorageMigration,
      partialize: ({ currentTheme, browserId }) => ({
        currentTheme,
        browserId,
      }),
    }
  )
);

const selBrowserId = s => s.browserId;
export function useBrowserId() {
  return useLocalState(selBrowserId);
}

const selCurrentTheme = s => s.currentTheme;
export function useCurrentTheme() {
  return useLocalState(selCurrentTheme);
}

export const setLocalState = f => useLocalState.getState().set(f);

const selSubscription = s => s.subscription;
export function useSubscriptionStatus() {
  return useLocalState(selSubscription);
}

const selErrorCount = s => s.errorCount;
export function useErrorCount() {
  return useLocalState(selErrorCount);
}

const selAirLockErrorCount = s => s.airLockErrorCount;
export function useAirLockErrorCount() {
  return useLocalState(selAirLockErrorCount);
}
