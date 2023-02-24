const DEFAULT_WAIT = 10 * 60 * 1000;

export function getPreviewTracker(wait = DEFAULT_WAIT) {
  const tracked = {};
  const getPreviewTracking = k =>
    tracked[k] || {
      inProgress: false,
      attempted: 0,
    };
  const isPastWaiting = attempted => Date.now() - attempted >= wait;
  return {
    tracked,
    shouldLoad: k => {
      const { attempted, inProgress } = getPreviewTracking(k);
      return isPastWaiting(attempted) && !inProgress;
    },
    newAttempt: k => {
      tracked[k] = {
        inProgress: true,
        attempted: Date.now(),
      };
    },
    finished: k => {
      tracked[k].inProgress = false;
    },
  };
}
