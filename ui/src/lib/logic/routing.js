import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Returns an imperative method for navigating while preserving the navigation
 * state underneath the overlay
 */
export function useModalNavigate() {
  const navigate = useNavigate();
  const location = useLocation();
  return useCallback(
    (to, opts) => {
      if (location.state) {
        navigate(to, { ...(opts || {}), state: location.state });
        return;
      }
      navigate(to, opts);
    },
    [navigate, location.state]
  );
}
export function useDismissNavigate() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  return useCallback(() => {
    if (state?.backgroundLocation) {
      navigate(state.backgroundLocation);
    }
  }, [navigate, state]);
}
